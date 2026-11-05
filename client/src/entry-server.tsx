// Used only at build time by scripts/prerender-meta.ts: renders a page to plain HTML so crawlers
// that do not run JavaScript (most AI tools, many link checkers) still read the real text.
import { renderToString } from "react-dom/server";
import { Router as SsrRouter } from "wouter";
import App from "./App";

export function render(path: string) {
  return renderToString(
    <SsrRouter ssrPath={path}>
      <App />
    </SsrRouter>,
  );
}
