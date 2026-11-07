# SoloDac website: project status

Last updated: 5 November 2026. This note is the source of truth for where the SoloDac site, logo and tooling work stands. Facts here were checked against the repo and the live preview, not recalled from chat.

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
- **Network page cards:** a crawler spider walked the cards. Removed on 1 November (it covered text on phones).
- **About:** band where "solodac" forms from orange and cream particles, holds, scatters, repeats (Toolcraft particle-typography). Loops on its own; not cursor driven.
- **Chop Shop hero:** same gradient as home. **Services and Contact:** a quieter gradient.
- All effects pause off-screen and respect reduced motion. Cursor effects only run with a mouse.
- Motion was reviewed with Emil Kowalski's review-animations standards and fixed (transform-only cursor ring, 650 ms headline entrance, reduced-motion fade, button press feedback, named transitions).

## Live since 29 October (PRs #3 and #4)

- **Chop Shop renamed to "Katran by SoloDac"** (कतरन, clipping). Page moved to `/katran`; `/chop-shop`, `/tools` and `/fireyoureditor` redirect there. Legal pages renamed too.
- **Virodh renamed to Indian Pragati (@indianpragati).** Tagline, 35K followers, 194 posts and logo are still Virodh's: Instagram blocked reading the new profile without a login. Done on 31 October, see the home page cleanup notes.

## Katran page, second rebuild (live since 31 October, PR #6)

- PR #5 put a redesign live on 31 October. The owner called it AI slop: mock HTML "frames" in place of video, a hero strip that covered the headline at wide screens, empty scene slabs.
- Rebuilt around real reels from Lucre's YouTube channel (@LucreIndia): five in the hero row, one featured (Ashneer Grover, 52,979 views). Covers are YouTube's own vertical thumbnails saved in `client/src/assets/katran/`; a click plays the YouTube embed in place. View counts as of 31 October.
- Page: headline and line of copy, the reel row, "Three ways in" (reels, YouTube videos, carousels), the featured reel, FAQ as plain text, waitlist form. Mock components (frames, KatranHero, SceneBar) deleted.
- Owner to confirm: that these Lucre reels were made with Katran, and the "long stage talk" source line for the Ashneer reel.
- Found on Lucre's YouTube: two live titles end in leaked pipeline text ("Other options (YOUTUBE_RULES angles): ..."), on 7Tf8SBJ7-Bw and tI5j04Bv884. Left off the page.
- YouTube blocks the cloud server, so playback could not be tested from here.

## Katran page, third pass (live since 31 October, PR #7)

- Headline is now "A full production house. For less than one editor's salary." per the owner.
- Reel row: six reels over 1M views, in the owner's order. Archive of CEOs: AriZona Iced Tea 29.2M (DccTI1AhTDB), Chadwick Boseman 25.6M (DXkwIYQImSx). Successful Arcs: Huawei MateBook 40.9M (DKGAuS3TKAe), Shark Tank exposure 21.4M (DFQGZ_vPojE). Lucre on YouTube: 70-hour workweek ad 3.6M (ksM-TrcSDvo), Ashneer on BharatPe 3.0M (RL3VW4gj7_w).
- Instagram reels open on Instagram; YouTube reels play in place. Instagram play counts came from its public reels endpoint (clips/user), which works without a login; the profile lookup is rate-limited and needed retries.
- FAQ price answer: less than one full-time editor's monthly salary.

## Home page cleanup (live since 31 October, PR #8)

- Pages strip: "637,000 people follow the pages we run" with each page's follower count in large type. Counts refreshed from Instagram on 31 October for Successful Arcs (280.1K), Archive of CEOs (275.1K), Bourse India (29K) and Lucre (17.9K). Indian Pragati updated from the owner's screenshot on 31 October: 34.6K followers, 230 posts, category News, bio as tagline, new logo redrawn as `client/src/assets/partners/indianpragati.svg` (orange circle, navy chevron). Old virodh.jpg removed.
- Hero: no kicker label, no grid background, "Ours first." in muted cream on its own line instead of orange serif italic.
- New proof section: the six million-view reels (shared list in `client/src/lib/reels.ts`, also used on /katran), "12 crore views", with See the network and Advertise with us.
- Removed: three outlined cards, the four page cards, numbered service rows, KatranMock, numbered step boxes, the orange CTA box. Replaced with plain text sections.
- Footer on every page: no mono labels, no divider lines. Secondary button is filled, not outlined.

## Other pages cleanup (live since 31 October, PR #10)

- Shared pieces: Kicker is now a plain small label (only 404 and Legal use it); SectionHead and PageHero have no kicker; PageHero has no grid background or divider; CtaBand is plain text plus a button instead of the orange box.
- Services: no 01/02/03, no orange serif lines, filled pills, plain "What's included".
- Network: filled cards with no outlines, plain category labels, no dashed box; the crawler spider now warms the card background instead of its border.
- About: no serif accent, belief cards replaced with plain columns, locations and business details without lines or boxes.
- Contact, Legal, 404: plain labels. Header: no line on scroll, filled menu button, no lines in the phone menu. Lead form: no outline.
- Taste inspector on Services and About: remaining flags are no photos or video, the cream brand colour, and the smooth-scroll pin artifact.

## Home page, breadth pass (live since 1 November, PR #11)

- Owner: the home page looked like SoloDac does one thing. Reference given: kyre.solutions (story order: problem, interactive "pick yours", every function, comparison, story, FAQ, close). Took the order, not their mono labels.
- New order: rotating hero ("We grow YouTube channels / Instagram pages / personal brands / brands"), pages strip, "Growing one page usually takes five hires. We are all five." (five chips join into one bar), "What are you growing?" picker (YouTube channel, Instagram page, founder's name, brand, just editing; each with what's included, proof and its own contact link), "Everything we do, under one roof" word wall, the six reels, comparison table against freelancers / in-house / typical agency, Katran, How we work, FAQ, close.
- New components in `client/src/components/home/`. Follower total now comes from `totalFollowersInThousands` in `site.ts`.
- New copy to confirm: personal branding deliverables, the brand track ("Websites like this one"), the comparison table values for the other options.
- Fixed a site-wide bug: an unlayered `button { font: inherit }` overrode every size and weight class on buttons. Moved into `@layer base`.

## Services page: six services (live since 1 November, PR #12)

- Hero: "Everything a page needs. Under one roof." Personal branding, Brand partnerships and Brand identity and websites are now full services in `services` (site.ts) with their own sections. `alsoDo` removed. Each service carries its contact-form option (`enquiry`).
- New copy to confirm: the bodies and "what's included" lists for the three new services.

## Lucre YouTube titles with leaked pipeline text (found 1 November)

Seven live Lucre titles end with the title generator's alternatives ("Other options (YOUTUBE_RULES angles): ..."). Fix in YouTube Studio by cutting everything from "Other options". Clean titles:

| Video | Title to use |
| --- | --- |
| https://youtu.be/r7vHAKexATk | Delhi Eats ₹17,000 Caviar With Paratha, Says Nikhil Kamath |
| https://youtu.be/7Q-T6d4AvDk | PVR vs Producer: Who Really Gets Your ₹200 Ticket? |
| https://youtu.be/9ytWjs2SeW8 | Raamdeo Agrawal's Top Sector Bet in a Bear Market |
| https://youtu.be/98ABzFB2Sqo | Why Fast Food Beats Home Cooking in America, Not India |
| https://youtu.be/xYNT588MOS4 | Sam Altman Told Nikhil Kamath to Buy These 2 Stocks |
| https://youtu.be/tI5j04Bv884 | 1.3 Crore Indians Bet on Jio. Day One Paid 21% |
| https://youtu.be/7Tf8SBJ7-Bw | He Drove 1 Million Miles to Sell Indian Tractors in America |

The pipeline step that writes titles is pasting its alternatives into the title field. It needs fixing at the source, or new uploads will keep doing it.

## Home follow-ups (live since 1 November, PR #12)

- Hero rotates: YouTube channels, Instagram pages, communities, newsletters, personal brands, brands. Communities and newsletters are only in the hero; owner to say what each includes before they become services.
- Follower strip removed from the home page (owner: it made SoloDac read as Instagram-only). Hero line no longer quotes followers; comparison row is "Runs pages and channels of its own: Yes". The 636K figure stays in the picker's brand track and on the Network page.

## Live on solodac.com as of 1 November (PRs #19 to #24)

- Owner review pass: five-hires row, picker with a newsletter option and smooth switching, comparison on dark, rewritten steps and FAQ, Home in the nav, page and hero entrances, Services in two dark tones with Newsletter marketing (150,000+ readers, 43% average open rate), Network with real page descriptions and a dark brands section showing total reach, Katran rebuilt around "The editor behind 12 crore views" with an email signup in the hero.
- Indore is the corporate office; Chandigarh and Noida are regional offices. GSTIN only in the footer and legal pages.
- Page changes: the header stays outside the transition; the old page fades out, the new one rises in.
- CLAUDE.md records the chosen art direction. `docs/SKILLS.md` lists every installed skill and plugin.

## Live on solodac.com as of 2 November (PRs #25 to #34)

- **Seamless dark sections:** one ink background on every page, half the vertical spacing, "How it fits" (network, agency, Katran) replacing "One team. Three parts.".
- **Search and previews (PR #28):** robots.txt, sitemap.xml (10 pages), one HTML file per page with its own title, description, canonical link and preview image (`shared/pages.ts`, `scripts/prerender-meta.ts`). Katran has its own preview card (`og-katran.png`). Organization structured data in `index.html` (no GSTIN).
- **Audit (PR #29):** axe-core finds no accessibility issues. Speed on a slow phone over 4G: main content in about 2 to 2.6 seconds. The Katran headline no longer jumps when its font loads (size-adjusted fallback fonts). Katran input labels folded into the card headings.
- **Look bigger (PR #30):**
  - New `/work` page: the five named pages as case studies, with followers, posts and their million-view reels. "Work" is in the nav; /case-studies, /portfolio and /stories redirect there.
  - Home hero: three real numbers (12 crore views, 6.3 lakh followers, 1.5 lakh newsletter readers) and a reel wall that drifts across the hero.
  - The home reels section became a case-study teaser linking to /work.
  - Services, Network and About: a button and real covers or logos in the first screen.
  - About: headline "We grow pages, channels and brands." The proprietorship line is gone from About; it stays in the footer and legal pages.
- **PR #31:** the "3 offices" number removed from the home hero (owner).
- **Phones and iPads (PR #32):** the home glow drifts on its own when no mouse steers it, rests behind the headline and fades out before the numbers. The full nav shows from 1024 px; below that the menu button, so the header never wraps on iPads.
- **PR #33:** the About particle word ("solodac" from dots) is back. CLAUDE.md says it stays.
- **PR #34:** home hero numbers in one row with tops aligned on every screen. Network globe moved inwards on phone and iPad; iPad landscape has its own dimmed, fully visible position; laptops unchanged.
- Checks now include iPhone 13, iPad Mini and iPad Pro 11 (both orientations) with touch on, not just narrow desktop windows.

## Live on solodac.com as of 5 November (PRs #36 to #57)

- **Client wall:** 14 clients as real logos in their own colours, two rows drifting in opposite directions between the hero numbers and the reels. Each row has its own logos, so none shows in both at once. Heading: "Trusted by India's biggest names." Clients: Hindustan Unilever, Aditya Birla Group, Reliance Jio, Masters' Union, Tetr College of Business, Chandigarh University, Orange Health Labs, Varahe Analytics, Bonne Trinity, Aelira Lung Care, Beco, Strawberry, Lovable, Kaidra Media (set as text, no logo online yet). Logos live in `client/src/assets/clients/colour/`.
- **Home:** hero numbers in one row, reel wall, "How it fits" sentence with pictures set into it (no underlines), the glow drifts on its own on phones and iPads, header menu button below 1024px.
- **Search and speed:** every page is drawn to real HTML at build time (400 to 976 words per page for crawlers that skip JavaScript). Logos recompressed. Meta descriptions fixed. Phone reel fan centred.
- **404 and old links:** unknown addresses return a real 404; 19 old addresses redirect permanently (`shared/redirects.ts`).
- **Cloudflare settings (done by the owner's Chrome session, checked from here):** www redirects to the main address, http redirects to https. SPF, Google DKIM and DMARC (policy none) added, plus Resend's records.
- **Forms:** protected by Cloudflare Turnstile and sent by Resend through the Worker. A real test email passed SPF, DKIM and DMARC. No fallback to Web3Forms while protection is on. Setup and notes: `docs/FORM-SPAM-SETUP.md`.
- **Skills:** `claude-library/` holds 252 extra skills (plus 277 optional) with an installer (`bash claude-library/install.sh`). Details in `claude-library/README.md`.
- **Research:** `docs/CONTENT-PLAN.md` has keyword research (OpenSEO) and eight article ideas.

## Still open (5 November)

- **Owner, small:** send a real test from the Contact page, then delete or regenerate the old Web3Forms access key at web3forms.com (it is public in older copies of the page, so bots could bypass the new check through it).
- **Owner, to make the site look bigger:** showreel video, team and founder photos, client quotes with name and role, a case-study figure (for example how long Archive of CEOs took to reach 275K), a booking-calendar link, the WhatsApp number, a Kaidra Media logo, a better Varahe logo file (ours is traced and lacks the small "ANALYTICS" line).
- **Owner:** the Instagram reel they liked. No tool here can read Instagram; send 2 or 3 screenshots or a one-line description.
- **Later:** move DMARC from `none` to `quarantine` after two to four weeks of clean reports. Write the first articles from `docs/CONTENT-PLAN.md`. Logo pick from the canvas. Confirm the careers roles and the "How we run every one of them" steps on /work.
- **Obsidian:** the vault is the Mac folder `~/Desktop/solodac`. Cloud sessions cannot write to it. Pull the repo there: `cd ~/Desktop/solodac/solodac-website && git pull origin main`.

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
- **Obsidian sync from the cloud:** the vault folder on the Mac is not shared with cloud sessions (Remote Control lists no usable folder). Pull the repo in the vault instead: `cd ~/Desktop/solodac/solodac-website && git pull origin main`.

## Side project: SoloDac logo builder (Toolcraft)

- A Toolcraft app with six logo directions, sliders, colours and PNG/JPG/SVG export. Real Bricolage Grotesque ExtraBold outlines, so SVGs need no font.
- Saved on branch `logo-tool` of this repo (its own separate history). Run it with `npm install` then `npm run dev`.
- Toolcraft's full delivery checks were not completed. Found a Toolcraft bug: its source checker rejects the SVG export code its own docs prescribe.

## Business facts and copy rules

- SOLODAC, proprietorship of Harshil Rekhi, GSTIN 23FNWPR3444D1ZO.
- Indore (corporate and registered office, legal jurisdiction); Chandigarh and Noida (regional offices). GSTIN only in the footer and legal pages.
- Legal terms on /privacy, /terms, /refunds: approved by the owner.
- Copy: no em-dashes, no comma-wrapped asides, no buzzwords.
