import { legacyTarget } from "../shared/redirects";
import { getTicker } from "../shared/ticker";

type Env = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  /** Daily counts of key actions (see handleTrack). Optional: without it, counting is skipped. */
  EVENTS?: {
    get: (key: string) => Promise<string | null>;
    put: (key: string, value: string, options?: { expirationTtl?: number; metadata?: unknown }) => Promise<void>;
    list: (options?: { cursor?: string }) => Promise<{ keys: Array<{ name: string; metadata?: unknown }>; list_complete: boolean; cursor?: string }>;
  };
  /** Secret. The password for /stats. Without it the stats page stays off. */
  STATS_KEY?: string;
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
    events.get(key).then((current) => {
      const count = (Number(current) || 0) + 1;
      return events.put(key, String(count), { expirationTtl: 60 * 60 * 24 * 400, metadata: { n: count } });
    }),
  );
  return done();
}

const sameKey = (a: string, b: string) => {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
};

/** The last 30 days of totals, for the private /stats page. Needs the STATS_KEY password. */
async function handleStats(request: Request, env: Env): Promise<Response> {
  if (!env.STATS_KEY || !env.EVENTS) return json({ ok: false, error: "off" }, 404);
  if (!sameKey(request.headers.get("X-Stats-Key") ?? "", env.STATS_KEY)) return json({ ok: false, error: "key" }, 401);

  const since = new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
  const days = new Map<string, Record<string, number>>();
  const pages = new Map<string, Record<string, number>>();
  let cursor: string | undefined;
  for (let round = 0; round < 10; round++) {
    const batch = await env.EVENTS.list({ cursor });
    for (const { name, metadata } of batch.keys) {
      const [date, event, page] = name.split("|");
      const n = (metadata as { n?: number } | null)?.n;
      if (!date || date < since || !EVENTS.has(event) || !n) continue;
      for (const [map, id] of [[days, date], [pages, page]] as const) {
        const row = map.get(id) ?? {};
        row[event] = (row[event] ?? 0) + n;
        map.set(id, row);
      }
    }
    if (batch.list_complete) break;
    cursor = batch.cursor;
  }
  const series = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(Date.now() - (29 - i) * 86400000).toISOString().slice(0, 10);
    return { date, contact_click: days.get(date)?.contact_click ?? 0, form_sent: days.get(date)?.form_sent ?? 0 };
  });
  const byPage = [...pages].map(([page, row]) => ({ page, contact_click: row.contact_click ?? 0, form_sent: row.form_sent ?? 0 })).sort((a, b) => b.contact_click + b.form_sent - (a.contact_click + a.form_sent));
  return json({ ok: true, series, byPage });
}

const STATS_PAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Stats</title><style>
:root{--ink:#0b0b0c;--card:#161618;--paper:#f4f1ea;--dim:rgba(244,241,234,.6);--sig:#ff5a1f}
*{box-sizing:border-box}body{margin:0;background:var(--ink);color:var(--paper);font:16px/1.5 Inter,system-ui,sans-serif;padding:24px 16px 64px}
main{max-width:960px;margin:0 auto}h1{font-size:clamp(28px,5vw,44px);letter-spacing:-.03em;margin:8px 0 24px}
.card{background:var(--card);border-radius:20px;padding:20px;margin-bottom:16px}.grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.big{font-size:40px;font-weight:700;letter-spacing:-.03em}.dim{color:var(--dim);font-size:14px}
form{display:flex;gap:8px;flex-wrap:wrap}input{flex:1;min-width:200px;padding:12px 16px;border-radius:999px;border:0;background:var(--card);color:var(--paper);font:inherit}
button{padding:12px 22px;border-radius:999px;border:0;background:var(--paper);color:var(--ink);font:inherit;font-weight:600;cursor:pointer}
.bars{display:flex;align-items:flex-end;gap:3px;height:140px}.bars div{flex:1;display:flex;flex-direction:column;justify-content:flex-end;min-width:0}
.bars i{display:block;background:var(--paper);opacity:.85;border-radius:3px 3px 0 0}.bars b{display:block;background:var(--sig);border-radius:3px 3px 0 0}
table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:8px 0}th{color:var(--dim);font-weight:500;font-size:14px}td:not(:first-child),th:not(:first-child){text-align:right}
.key{display:flex;gap:16px;margin-top:12px}.key span:before{content:"";display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px}.k1:before{background:var(--paper)}.k2:before{background:var(--sig)}
@media(prefers-color-scheme:light){}
</style></head><body><main><h1>Site stats</h1><div id="out"></div><script>
const out=document.getElementById('out');
function login(msg){out.innerHTML='<div class="card"><p class="dim">'+(msg||'Enter the stats password.')+'</p><form><input type="password" id="k" autocomplete="current-password" aria-label="Password"><button>Open</button></form></div>';
out.querySelector('form').onsubmit=function(e){e.preventDefault();try{sessionStorage.setItem('sk',document.getElementById('k').value)}catch(_){}load(document.getElementById('k').value)}}
async function load(key){const r=await fetch('/api/stats',{headers:{'X-Stats-Key':key}});
if(r.status===404)return out.innerHTML='<div class="card"><p>Stats are switched off. Add the STATS_KEY secret to turn them on.</p></div>';
if(r.status===401)return login('Wrong password.');
if(!r.ok)return login('Something went wrong. Try again.');
const d=await r.json();const sum=(a,k)=>a.reduce((t,x)=>t+x[k],0);
const w=d.series.slice(-7),c=sum(d.series,'contact_click'),f=sum(d.series,'form_sent');
const max=Math.max(1,...d.series.map(x=>x.contact_click));
const rate=c?Math.round(f/c*100)+'%':'none yet';
out.innerHTML='<div class="grid"><div class="card"><div class="big">'+c+'</div><div class="dim">Contact clicks, 30 days ('+sum(w,'contact_click')+' in the last 7)</div></div>'+
'<div class="card"><div class="big">'+f+'</div><div class="dim">Forms sent, 30 days ('+sum(w,'form_sent')+' in the last 7)</div></div>'+
'<div class="card"><div class="big">'+rate+'</div><div class="dim">Forms sent per contact click</div></div></div>'+
'<div class="card"><div class="bars" role="img" aria-label="Daily contact clicks and forms sent, last 30 days">'+d.series.map(x=>'<div title="'+x.date+': '+x.contact_click+' clicks, '+x.form_sent+' forms"><b style="height:'+Math.round(x.form_sent/max*140)+'px"></b><i style="height:'+Math.round(Math.max(0,x.contact_click-x.form_sent)/max*140)+'px"></i></div>').join('')+'</div><div class="key dim"><span class="k1">Contact clicks</span><span class="k2">Forms sent</span></div></div>'+
'<div class="card"><table><tr><th>Page</th><th>Clicks</th><th>Forms</th></tr>'+(d.byPage.map(p=>'<tr><td>'+p.page.replace(/[<>&]/g,'')+'</td><td>'+p.contact_click+'</td><td>'+p.form_sent+'</td></tr>').join('')||'<tr><td class="dim">Nothing yet.</td><td></td><td></td></tr>')+'</table></div>'}
let saved='';try{saved=sessionStorage.getItem('sk')||''}catch(_){}
saved?load(saved):login();
</script></main></body></html>`;

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
    if (url.pathname === "/api/stats") return handleStats(request, env);
    if (url.pathname === "/stats") {
      return new Response(STATS_PAGE, {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex", "X-Frame-Options": "DENY", "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'none'" },
      });
    }
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
