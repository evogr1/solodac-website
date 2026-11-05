// Old addresses from the previous site, still in bios, DMs and decks. The app follows them for
// in-site clicks (client/src/App.tsx) and the Worker (worker/index.ts) follows them for everyone
// else, with a permanent redirect. `:slug` stands for any single piece of path after it.
// Every source here must also appear in `assets.run_worker_first` in wrangler.jsonc;
// scripts/prerender-meta.ts fails the build if one is missing.
export const legacyRedirects: Array<[string, string]> = [
  ["/marketing", "/contact"],
  ["/eyeballs", "/contact"],
  ["/youtube", "/services#youtube"],
  ["/clipping", "/services#youtube"],
  ["/studio", "/services"],
  ["/services/:slug", "/services"],
  ["/approach", "/about"],
  ["/careers", "/about#careers"],
  ["/thesis", "/about"],
  ["/stories", "/work"],
  ["/stories/:slug", "/work"],
  ["/events", "/network"],
  ["/campaigns", "/network"],
  ["/case-studies", "/work"],
  ["/testimonials", "/network"],
  ["/portfolio", "/work"],
  ["/fireyoureditor", "/katran"],
  ["/tools", "/katran"],
  ["/chop-shop", "/katran"],
];

/** Where an old address now lives, or null when the path is not an old one. */
export function legacyTarget(pathname: string): string | null {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  for (const [from, to] of legacyRedirects) {
    if (from.endsWith("/:slug")) {
      const prefix = from.slice(0, -"/:slug".length) + "/";
      if (clean.startsWith(prefix) && clean.length > prefix.length) return to;
    } else if (clean === from) {
      return to;
    }
  }
  return null;
}

/** The `run_worker_first` patterns the Worker needs so these paths reach it. */
export const legacyPatterns = legacyRedirects.flatMap(([from]) => (from.endsWith("/:slug") ? [from.slice(0, -"/:slug".length) + "/*"] : [from]));
