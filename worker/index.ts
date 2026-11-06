import { legacyTarget } from "../shared/redirects";
import { getTicker } from "../shared/ticker";

type Env = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  /** Daily counts of key actions (see handleTrack). Optional: without it, counting is skipped. */
  EVENTS?: { get: (key: string) => Promise<string | null>; put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void> };
  /** Public. The site key of the Turnstile widget. When absent, the forms use Web3Forms as before. */
  TURNSTILE_SITE_KEY?: string;
  /** Secret. Checks each form's Turnstile token with Cloudflare. */
  TURNSTILE_SECRET?: string;
  /** Secret. Sends the form by email through Resend. */
  RESEND_API_KEY?: string;
  /** Where form emails go. Defaults to the studio inbox. */
  MAIL_TO?: string;
  /** The sender on form emails. Must be an address on a domain verified in Resend. */
  MAIL_FROM?: string;
  /** For tests only: a stand-in for Resend's address. */
  MAIL_API_URL?: string;
  /** For tests only: a stand-in for Cloudflare's token check. */
  TURNSTILE_VERIFY_URL?: string;
};

const JSON_HEADERS = { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

// Long enough for any real answer, short enough that a bot can't fill the inbox.
const MAX_FIELDS = 20;
const MAX_VALUE = 3000;
const MAX_KEY = 40;

/** The forms are on, and spam-protected, only when all three settings exist. */
const protectedFormsOn = (env: Env) => Boolean(env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET && env.RESEND_API_KEY);

async function handleLead(request: Request, env: Env): Promise<Response> {
  if (!protectedFormsOn(env)) return json({ ok: false, error: "not_configured" }, 501);
  if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);

  // Only our own pages may post here.
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: "origin" }, 403);

  let body: { subject?: unknown; fields?: unknown; token?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const subject = typeof body.subject === "string" ? body.subject.slice(0, 120) : "";
  const token = typeof body.token === "string" ? body.token : "";
  const rawFields = body.fields && typeof body.fields === "object" && !Array.isArray(body.fields) ? (body.fields as Record<string, unknown>) : null;
  if (!subject || !token || !rawFields) return json({ ok: false, error: "bad_request" }, 400);

  const fields: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(rawFields).slice(0, MAX_FIELDS)) {
    if (typeof value !== "string" || !value.trim()) continue;
    fields.push([key.slice(0, MAX_KEY), value.slice(0, MAX_VALUE)]);
  }
  if (!fields.length) return json({ ok: false, error: "bad_request" }, 400);

  // 1. Ask Cloudflare whether this token is real, fresh and from a human.
  const verify = await fetch(env.TURNSTILE_VERIFY_URL ?? "https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET!, response: token, remoteip: request.headers.get("CF-Connecting-IP") ?? "" }),
  });
  const verdict = (await verify.json().catch(() => ({}))) as { success?: boolean };
  if (!verdict.success) return json({ ok: false, error: "turnstile" }, 403);

  // 2. Email it. The reply-to is the visitor's own address when they gave one.
  const email = fields.find(([key]) => key.toLowerCase() === "email")?.[1];
  const text = fields.map(([key, value]) => `${key}: ${value}`).join("\n\n");
  const mail = await fetch(env.MAIL_API_URL ?? "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.MAIL_FROM ?? "SoloDac website <forms@solodac.com>",
      to: [env.MAIL_TO ?? "info@solodac.com"],
      subject,
      text,
      ...(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? { reply_to: email } : {}),
    }),
  });
  if (!mail.ok) return json({ ok: false, error: "mail" }, 502);
  return json({ ok: true });
}

const EVENTS = new Set(["contact_click", "form_sent"]);

/**
 * Adds 1 to a daily total in KV, keyed "2026-11-06|contact_click|/services".
 * Nothing about the visitor is stored. Read the totals in the Cloudflare dashboard:
 * Workers & Pages, then KV, then solodac-events.
 */
async function handleTrack(request: Request, env: Env, ctx: { waitUntil: (promise: Promise<unknown>) => void }): Promise<Response> {
  const done = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  if (request.method !== "POST" || !env.EVENTS) return done();
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return done();

  const body = (await request.json().catch(() => null)) as { event?: unknown; page?: unknown } | null;
  const event = typeof body?.event === "string" ? body.event : "";
  const page = typeof body?.page === "string" && /^\/[a-z0-9\-/]{0,60}$/.test(body.page) ? body.page : "/other";
  if (!EVENTS.has(event)) return done();

  const key = `${new Date().toISOString().slice(0, 10)}|${event}|${page}`;
  const events = env.EVENTS;
  ctx.waitUntil(
    events.get(key).then((current) => events.put(key, String((Number(current) || 0) + 1), { expirationTtl: 60 * 60 * 24 * 400 })),
  );
  return done();
}

// Pages and files get their security headers from client/public/_headers. Only /api/* and the
// old addresses (see shared/redirects.ts) run here; everything else is served from the built files.
export default {
  async fetch(request: Request, env: Env, ctx: { waitUntil: (promise: Promise<unknown>) => void }) {
    const url = new URL(request.url);

    if (url.pathname === "/api/lead-config") {
      // Tells the page whether to show the human check. Public by design.
      return json(protectedFormsOn(env) ? { turnstileSiteKey: env.TURNSTILE_SITE_KEY } : {});
    }
    if (url.pathname === "/api/lead") return handleLead(request, env);
    if (url.pathname === "/api/track") return handleTrack(request, env, ctx);

    if (url.pathname !== "/api/ticker") {
      const target = legacyTarget(url.pathname);
      if (target && (request.method === "GET" || request.method === "HEAD")) {
        return new Response(null, { status: 301, headers: { Location: target, "Cache-Control": "public, max-age=3600" } });
      }
      return env.ASSETS.fetch(request);
    }

    const cache = (caches as unknown as { default: Cache }).default;
    const cacheKey = new Request(url.origin + "/api/ticker");
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const quotes = await getTicker();
    // An empty result is cached briefly too, so a Yahoo outage doesn't cost 15 requests per visit.
    const response = new Response(JSON.stringify(quotes), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${quotes.length ? 60 : 30}`,
        "X-Content-Type-Options": "nosniff",
      },
    });
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  },
};
