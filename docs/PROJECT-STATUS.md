# SoloDac website: project status

Last updated: 31 October 2026. This note is the source of truth for where the SoloDac site, logo and tooling work stands. Facts here were checked against the repo and the live preview, not recalled from chat.

## Where to see things

| What | Link | State |
| --- | --- | --- |
| Live site | https://solodac.com | Everything from `design-effects` went live on 29 October 2026 via PR #2 (merge commit 6eac0f2). |
| Preview | https://design-effects-solodac-website.purple-scene-0a24.workers.dev | Branch `design-effects`. Use it for the next changes before they go live. |
| Logo canvas (10 directions) | https://claude.ai/artifact/PybZcnxhPPjSc3G7a5ymYV | Waiting for the final pick. |
| Repo | https://github.com/evogr1/solodac-website | |

## Branches

- `main`: live. A push here deploys solodac.com in about a minute. Never push without the owner's OK. A hook in `.claude/settings.json` blocks it.
- `design-effects`: design and tooling work. Merged into `main` and live as of PR #2.
- `logo-tool`: the SoloDac logo builder (Toolcraft app), its own history, not part of the site.
- `logo-wip`: the Solo dot logo (s + orange dot + lodac) in header, footer and favicon, plus outlined SVGs in `client/public/brand/`. Not merged, not final.

## What is on `design-effects`

Effects adapted from Toolcraft examples (MIT, Pixel Point). Ported renderers in `client/src/lib/effects/`, React wrappers in `client/src/components/effects/`.

- **Home hero:** mesh gradient (Toolcraft mesh-gradient) with an orange glow that follows the mouse and rests bottom right. Headline animates in letter by letter. Letters near the cursor lift, grow and warm to orange; the orange "Ours first." flips to cream instead. Buttons are magnetic. A small orange dot follows the cursor on every page and becomes a ring over links.
- **Network hero:** dotted globe (Toolcraft neon-globe) with the sample brand logos swapped for SoloDac page names: Arcs, CEOs, Virodh, Bourse. Loads only on that page (22 KB gzipped).
- **Network page cards:** a procedural "web crawler" spider (two-bone IK legs, alternating gait) walks card to card; each card glows orange while it is read. With a mouse in that section it chases the cursor. Idea from the genai.works reel. `client/src/components/effects/CrawlerSpider.tsx`.
- **About:** band where "solodac" forms from orange and cream particles, holds, scatters, repeats (Toolcraft particle-typography). Loops on its own; not cursor driven.
- **Chop Shop hero:** same gradient as home. **Services and Contact:** a quieter gradient.
- All effects pause off-screen and respect reduced motion. Cursor effects only run with a mouse.
- Motion was reviewed with Emil Kowalski's review-animations standards and fixed (transform-only cursor ring, 650 ms headline entrance, reduced-motion fade, button press feedback, named transitions).

## Since the 29 October deploy (on the preview, not live yet)

- **Chop Shop renamed to "Katran by SoloDac"** (कतरन, clipping). Page moved to `/katran`; `/chop-shop`, `/tools` and `/fireyoureditor` redirect there. Hero headline is now "Katran edits for you." Legal pages renamed too.
- **Virodh renamed to Indian Pragati (@indianpragati).** Tagline, 35K followers, 194 posts and logo are still Virodh's: Instagram blocked reading the new profile without a login. Owner to send the new bio, follower count and profile picture.

## Decisions waiting on the owner

1. **Final logo:** pick from the 10 directions on the canvas (first pick was 04 Solo dot). Then: header, footer, favicon, brand files, and a liquid-metal version.
2. **Design direction after the taste-skill review:** home page scored 13 FAIL, 8 WARN. Options given: (1) polish and keep the current look, (2) full restyle by taste rules (drops mono labels, eyebrows, 01/02/03, hairlines, outlined cards, gradients, the "Ours first." accent), (3) mix: strict inner pages, home hero kept as an exception. No answer yet.
3. **Real pictures:** the site has no photos or footage. Needed for the taste skill's floor and for the Chop Shop dither effect. Ask: stills or thumbnails from the pages, team or office photos.
4. **Future merges to `main`:** only on an explicit OK from the owner, every time.

## Taste-skill findings that are fixes in any direction

- 3 headlines wrap past two lines at 1440 px, 4 at 390 px.
- A large empty block under the hero buttons (28% of the first screen).
- 28 text blocks under 13 px.
- Left and right margins differ (128 px vs 149 px).

## Tools installed for this project (in `.claude/` of the repo)

- **Skills:** taste skill (`design-taste-frontend`), impeccable, 12 of Emil Kowalski's skills (motion, review, apple-design and more), 9 Strix security skills, agent-reach.
- **Plugins (project scope):** claude-code-setup (Anthropic), claude-mem. claude-mem sends usage telemetry to PostHog by default with no off switch in its code; owner was told.
- **CLAUDE.md:** project rules, copy rules, business facts, design notes.
- **Hook:** `.claude/hooks/guard-main-push.sh` blocks `git push` to `main`.
- Not installable: awesome-free-llm-apis is a link list; its `agents/` folder is the list maintainer's own bots and was left out.

## Blocked, and why

- **Strix security test:** needs Docker plus an LLM API key, or a Strix Cloud account. Neither exists in the cloud container.
- **Agent Reach on Instagram:** profiles and posts need a login done by the owner on their own computer (`agent-reach login instagram`). Public YouTube, Reddit, GitHub and web reading works without login.
- **Obsidian sync from the cloud:** the sync script lives on the owner's Windows PC; cloud sessions can only attach to Mac or Linux folders. Run `/obsidian-sync` locally after pulling this branch.

## Side project: SoloDac logo builder (Toolcraft)

- A Toolcraft app with six logo directions, sliders, colours and PNG/JPG/SVG export. Real Bricolage Grotesque ExtraBold outlines, so SVGs need no font.
- Saved on branch `logo-tool` of this repo (its own separate history). Run it with `npm install` then `npm run dev`.
- Toolcraft's full delivery checks were not completed. Found a Toolcraft bug: its source checker rejects the SVG export code its own docs prescribe.

## Business facts and copy rules

- SOLODAC, proprietorship of Harshil Rekhi, GSTIN 23FNWPR3444D1ZO.
- Chandigarh (main base), Noida (office), Indore (registered office, legal jurisdiction).
- Legal terms on /privacy, /terms, /refunds: approved by the owner.
- Copy: no em-dashes, no comma-wrapped asides, no buzzwords.
