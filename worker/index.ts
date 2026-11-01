import { getTicker } from "../shared/ticker";

type Env = { ASSETS: { fetch: (request: Request) => Promise<Response> } };

// Pages and files get their security headers from client/public/_headers. Only /api/* runs here.
export default {
  async fetch(request: Request, env: Env, ctx: { waitUntil: (promise: Promise<unknown>) => void }) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/ticker") return env.ASSETS.fetch(request);

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
