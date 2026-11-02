// Runs after `vite build`. The site is a single-page app, so every route used to share
// index.html and its home-page title, description and preview image. This writes one
// HTML file per page (dist/public/katran.html and so on) with that page's own tags, plus
// sitemap.xml and robots.txt, all from the page list in shared/pages.ts.
// Cloudflare serves /katran from katran.html, so link previews and crawlers that do not
// run JavaScript see the right page.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pages, siteUrl, type PageMeta } from "../shared/pages";

const outDir = path.resolve(import.meta.dirname, "../dist/public");
const template = readFileSync(path.join(outDir, "index.html"), "utf8");

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setTag(html: string, pattern: RegExp, replacement: string) {
  if (!pattern.test(html)) throw new Error(`prerender-meta: tag not found in index.html: ${pattern}`);
  return html.replace(pattern, replacement);
}

function render(page: PageMeta) {
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
  return html.replace("</head>", `  <link rel="canonical" href="${url}" />\n  </head>`);
}

for (const page of pages) {
  const file = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
  writeFileSync(path.join(outDir, file), render(page));
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((page) => `  <url><loc>${siteUrl}${page.path}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`prerender-meta: wrote ${pages.length} pages, sitemap.xml and robots.txt`);
