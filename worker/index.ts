import { getTicker } from "../shared/ticker";

type Env = { ASSETS: { fetch: (request: Request) => Promise<Response> } };

export default {
  async fetch(request: Request, env: Env, ctx: { waitUntil: (promise: Promise<unknown>) => void }) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/ticker") return env.ASSETS.fetch(request);

    const cache = (caches as unknown as { default: Cache }).default;
    const cacheKey = new Request(url.origin + "/api/ticker");
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const quotes = await getTicker();
    const response = new Response(JSON.stringify(quotes), {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" },
    });
    if (quotes.length) ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  },
};
