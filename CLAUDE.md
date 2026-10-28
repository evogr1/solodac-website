# SoloDac website

Marketing site for SoloDac (solodac.com): React 19 + Vite + Tailwind v4 + wouter, with a small Express server in `server/`. Deployed on Cloudflare Workers (`wrangler.jsonc`).

## Deploying

- **A push to `main` deploys solodac.com live within about a minute.** Never push to `main` or merge into it without the owner's explicit OK in the current conversation. A hook in `.claude/settings.json` blocks it.
- Work on a branch. Every pushed branch gets a Cloudflare preview at `https://<branch>-solodac-website.purple-scene-0a24.workers.dev` (for example `design-effects`). Share that link for review.
- Before asking to merge: `pnpm check` and `pnpm build` pass, and the pages were looked at on desktop (1440px) and phone (390px).

## Copy rules

- No em-dashes. No comma-wrapped asides. No buzzwords.
- Write plainly, in short sentences.

## Business facts

- Trade name SOLODAC, a proprietorship of Harshil Rekhi. GSTIN 23FNWPR3444D1ZO.
- Locations: Chandigarh (main base), Noida (office), Indore (registered office, legal jurisdiction).
- Legal terms on /privacy, /terms and /refunds were approved by the owner.

## Design

- Palette: ink `#0b0b0c`, paper `#f4f1ea`, signal orange `#ff5a1f`. Type: Bricolage Grotesque (display), Inter (text), JetBrains Mono (labels), Instrument Serif italic (accent).
- Visual effects in `client/src/components/effects/` are adapted from Toolcraft examples (MIT, Pixel Point); the ported renderers live in `client/src/lib/effects/`. Every effect pauses off-screen and respects `prefers-reduced-motion`; cursor effects only run on fine pointers.
- Design skills live in `.claude/skills/` (taste skill, impeccable, Emil Kowalski's motion skills). The taste skill's house rules (no mono labels, eyebrows, gradients, hairlines) conflict with the current look; the owner has not yet chosen polish versus restyle.
