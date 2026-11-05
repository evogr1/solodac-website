// Runs after `vite build`. The site is a single-page app, so every route used to share
// index.html and its home-page title, description and preview image. This writes one
// HTML file per page (dist/public/katran.html and so on) with that page's own tags, plus
// sitemap.xml and robots.txt, all from the page list in shared/pages.ts.
// Cloudflare serves /katran from katran.html, so link previews and crawlers that do not
// run JavaScript see the right page.

import { readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { pages, siteUrl, type PageMeta } from "../shared/pages";
import { legacyPatterns } from "../shared/redirects";

const outDir = path.resolve(import.meta.dirname, "../dist/public");
const template = readFileSync(path.join(outDir, "index.html"), "utf8");

// The server build of the app (vite build --ssr). It draws each page as HTML text.
const serverEntry = path.resolve(import.meta.dirname, "../dist/server/entry-server.js");
const { render } = (await import(pathToFileURL(serverEntry).href)) as { render: (path: string) => string };

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setTag(html: string, pattern: RegExp, replacement: string | (() => string)) {
  if (!pattern.test(html)) throw new Error(`prerender-meta: tag not found in index.html: ${pattern}`);
  return html.replace(pattern, replacement as string);
}

/**
 * The pre-built HTML is for crawlers and for the first paint; the app redraws the page as soon as
 * its script runs. If the HTML named every image, the browser would start downloading about ninety
 * of them at once and the main script would queue behind them (measured: the script finished at
 * 2.9 s instead of 1.2 s on a slow phone). So the images keep their alt text but not their address
 * here, and the app puts the real ones in when it starts.
 */
function holdImages(markup: string) {
  // React also writes a preload hint for every image it draws; those would start the same downloads.
  return markup.replace(/<link rel="preload" as="image"[^>]*>/g, "").replace(/<img\b[^>]*>/g, (tag) => tag.replace(/\s(src|srcSet)=/g, " data-$1=")).replace(/<img\b(?![^>]*\bloading=)/g, '<img loading="lazy"');
}

function renderPage(page: PageMeta) {
  const url = `${siteUrl}${page.path}`;
  const image = `${siteUrl}${page.image}`;
  const title = escape(page.title);
  const description = escape(page.description);
  let html = template;
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = setTag(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`);
  html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  html = setTag(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`);
  html = setTag(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`);
  html = setTag(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`);
  html = setTag(html, /<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${title}" />`);
  html = setTag(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`);
  html = setTag(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`);
  html = setTag(html, /<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${image}" />`);
  html = setTag(html, /<div id="root"><\/div>/, () => `<div id="root">${holdImages(render(page.path))}</div>`);
  return html.replace("</head>", `  <link rel="canonical" href="${url}" />\n  </head>`);
}

for (const page of pages) {
  const file = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
  writeFileSync(path.join(outDir, file), renderPage(page));
}

// The Worker only sees the old addresses listed in wrangler.jsonc, so the two lists must agree.
const wrangler = JSON.parse(readFileSync(path.resolve(import.meta.dirname, "../wrangler.jsonc"), "utf8")) as { assets: { run_worker_first: string[]; not_found_handling: string } };
const missing = legacyPatterns.filter((pattern) => !wrangler.assets.run_worker_first.includes(pattern));
if (missing.length) throw new Error(`prerender-meta: add these to assets.run_worker_first in wrangler.jsonc: ${missing.join(", ")}`);
if (wrangler.assets.not_found_handling !== "404-page") throw new Error('prerender-meta: wrangler.jsonc must set assets.not_found_handling to "404-page"');

// 404.html is what Cloudflare serves, with a 404 status, for any address that is not a page or a file.
// The app inside it reads the address and draws the "not found" page.
let notFound = template;
notFound = setTag(notFound, /<title>[^<]*<\/title>/, "<title>Page not found | SoloDac</title>");
notFound = setTag(notFound, /<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="This page does not exist. Go back to the SoloDac home page." />');
notFound = setTag(notFound, /<div id="root"><\/div>/, () => `<div id="root">${holdImages(render("/404"))}</div>`);
notFound = notFound.replace("</head>", '  <meta name="robots" content="noindex" />\n  </head>');
writeFileSync(path.join(outDir, "404.html"), notFound);

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((page) => `  <url><loc>${siteUrl}${page.path}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

rmSync(path.resolve(import.meta.dirname, "../dist/server"), { recursive: true, force: true });

console.log(`prerender-meta: wrote ${pages.length} pages, 404.html, sitemap.xml and robots.txt`);
