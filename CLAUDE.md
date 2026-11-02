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
- Locations: Indore (corporate and registered office, legal jurisdiction), Chandigarh and Noida (regional offices).
- Do not show the GSTIN on marketing pages. It stays in the footer and the legal pages only.
- Legal terms on /privacy, /terms and /refunds were approved by the owner.

## Design

- Palette: ink `#0b0b0c` (with ink-2 and ink-3 for section tones), paper `#f4f1ea`, signal orange `#ff5a1f`. Type: Bricolage Grotesque (display) and Inter (text) only. Mono and serif fonts were removed.
- Art direction (chosen by the owner, November 2026): dark, plain and proof-led. Real work over mock-ups (the million-view reels in `client/src/lib/reels.ts`), real numbers, plain sentences.
  - No eyebrow or kicker labels, no mono labels, no 01/02/03 numbering, no outlined boxes or divider lines (except real tables and timelines), no serif italic accents.
  - One ink background runs through every page: no coloured section bands, so sections merge without seams. ink-2 and ink-3 are for cards and panels only. Cream is for buttons and small surfaces.
  - Keep vertical space tight: sections use `py-14 sm:py-20`, not more.
  - The white-then-grey two-part headline is kept only on the home and Katran heroes. Other headings are one plain sentence.
  - Orange is for actions and a few markers, not decoration. The orange mesh glow is on the home hero only.
  - Every page and section animates in (Reveal, page transition in `App.tsx`); keep the smooth scroll. Animations respect reduced motion.
- Design skills live in `.claude/skills/`: design-taste-frontend (taste skill, with `scripts/lint.mjs` and `scripts/inspect.mjs`), impeccable, and Emil Kowalski's motion skills. Use them for any design work. The taste skill's flag on the cream brand colour is known and accepted.
- Visual effects in `client/src/components/effects/` are adapted from Toolcraft examples (MIT, Pixel Point); the ported renderers live in `client/src/lib/effects/`. Every effect pauses off-screen and respects `prefers-reduced-motion`; cursor effects only run on fine pointers.
- The particle word that forms "solodac" under the About hero (`ParticleWord`) stays. The owner asked for it back after it was removed.
- Check every change at 1440px and 390px, including the phone menu. Also check iPad (768px portrait, 1194px landscape) with touch on: cursor effects get no mouse there.
