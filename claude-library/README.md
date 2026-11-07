# Claude skill library

Skills downloaded on 2 November 2026 from the repos the owner sent. They live here, outside `.claude/`, so the website project does not load them all into every session. `install.sh` installs them for the whole Mac.

## Install for all of Claude Code and the Claude app

On the Mac, in the vault:

```
cd ~/Desktop/solodac/solodac-website && git pull origin main
bash claude-library/install.sh
```

- **Claude Code:** every skill here, plus the 24 in `.claude/skills` (taste skill, impeccable, Emil Kowalski's motion skills, Strix and the rest), goes into `~/.claude/skills`. Every project on the Mac can then use them. Restart Claude Code after.
- **Claude app and claude.ai:** these cannot read files from your Mac. The script makes one zip per skill in `~/Desktop/claude-skill-zips`. Upload the ones you want in Settings > Capabilities > Skills. Pick the ones you will really use: every installed skill's description is read in every chat.
- Run `bash claude-library/install.sh --update` after a later pull to refresh skills that are already installed.

## What came from each repo

| Repo | What it is | What was taken |
| --- | --- | --- |
| every-app/open-seo | An SEO app with a Claude plugin | 12 SEO skills, plus `deslop` and `simple-issue-description` |
| centminmod/my-claude-code-setup | One person's Claude Code setup | All 7 skills |
| rebelytics/one-skill-to-rule-them-all | One skill | `task-observer` |
| cheaper-inference/OmniRoute | An AI gateway app (routes requests across model providers) | `ponytail` only (originally from DietrichGebert/ponytail, MIT) |
| thedotmack/claude-mem | Memory plugin for Claude Code | Nothing new. It is already installed as a plugin in this repo. |
| headroomlabs-ai/headroom | A context compression proxy, not a skill | Nothing. See "Headroom" below. |
| opf/openproject | A full project management web app, not a skill | Nothing. It has no skills. Self-host it with Docker if you want it as an app. |
| vercel-labs/agent-skills (reel: "Vercel web design") | Vercel's skills | `web-design-guidelines`, `react-best-practices`, `composition-patterns`, `react-view-transitions`, `writing-guidelines` |
| VoltAgent/awesome-design-md (reel: "Awesome DESIGN.md") | 84 design write-ups of real sites | Wrapped as one skill, `design-md-library` |
| microsoft/playwright-cli (reel: "Playwright CLI") | A browser automation CLI with a skill | `playwright-cli`. The CLI itself installs with npm, see below. |
| abi/screenshot-to-code (reel: "Image to code") | A web app, not a skill | Nothing. See "Image to code" below. |
| guillaumemeyer/watermarks-remover | Tools that strip AI provenance marks from text and files | `clean-user-facing-text` only (text clean-up that keeps required disclosures). Left out: `remove-ai-marks` (needs the repo's Docker service) and the `stealer` module, which is built to attack text watermarks such as SynthID. |
| ai-job-search-dev/ai-job-search | A job search workflow on Claude Code | All 9 skills: `job-application-assistant`, `job-scraper`, `upskill` and six job-board searches (`linkedin-search`, `jobindex-search`, `jobnet-search`, `jobdanmark-search`, `jobbank-search`, `freehire-search`). Several are for the Danish and Canadian job markets. |
| AgricIDaniel/claude-seo | An SEO toolkit for Claude Code | 25 skills (`seo` plus `seo-page`, `seo-technical`, `seo-schema`, `seo-content`, `seo-geo`, `seo-local`, `seo-backlinks`, `seo-sitemap` and more) and 7 connector skills (`seo-ahrefs`, `seo-bing`, `seo-seranking`, `seo-matomo`, `seo-profound`, `seo-unlighthouse`, `seo-firecrawl`). Its `seo-audit` is installed as `seo-site-audit`, because the OpenSEO skill already has that name. The extension install scripts were not copied. |
| affaan-m/ECC | A huge Claude Code setup (314 skills) | 37 picked for this work in `skills/`: writing and brand voice, content, design and motion, frontend, accessibility, browser tests, security review, research, marketing and social. The other 277 are in `claude-library/more/ecc/`, installed only with `--all`. |
| Albert-Weasker/niubigeo | A self-hosted app that tracks brand mentions in AI answers (GEO) | Nothing. It is a web app with no skills. See "NiubiGEO" below. |
| Taste skill (reel) | | Already installed as `design-taste-frontend` |
| gooseworks-ai/goose-skills | Marketing playbooks for growth work | All 181 skills: the 86 marketing skills (14 playbooks and their steps), the 63 video-ad skills, the 26 shared helpers and the 6 entry skills (`gooseworks`, `goose-ads`, `goose-video`, `make-custom-video`, `goose-video-local`, `goose-product-photos`). |

The other 47 OmniRoute skills only drive a running OmniRoute server (its keys, routes, cache and tunnels). They do nothing without one, so they were left out. The other open-seo skills are for developing OpenSEO itself.

## The skills, and what each needs

**Work with no setup**

- `deslop`: removes AI writing patterns from prose. Good for site copy and posts.
- `simple-issue-description`: turns a rough bug report or request into a short, plain issue.
- `ponytail`: pushes Claude to the simplest solution that works.
- `task-breakdown`: splits a large task into steps.
- `claude-docs-consultant`: looks things up in the official Claude Code docs.
- `session-metrics` and `audit-session-metrics`: token use and cost reports from your Claude Code sessions. They need Python 3 (`uv` recommended).
- `task-observer`: watches your work for corrections and patterns, logs them, and suggests skill updates in a weekly review. It writes its log to a folder you choose (it suggests `~/.claude/skill-observations/`). Never fetches anything on its own.

- `web-design-guidelines`: reviews UI code against Vercel's Web Interface Guidelines. It downloads the latest rules from Vercel's GitHub each time it runs.
- `react-best-practices`, `composition-patterns`, `react-view-transitions`: Vercel's React guides for speed, component structure and View Transition animations.
- `writing-guidelines`: reviews docs and prose against Vercel's writing rules.
- `design-md-library`: design write-ups of 84 sites (Stripe, Linear, Apple, Notion, Raycast, Wise, Zapier and more). Ask for "a page in the style of Linear" and Claude reads that one file. It never copies logos, names or copy.

**Marketing playbooks (goose-skills)**

Start with `where-to-start` (it asks about your situation and picks a playbook) or `marketing-guide`. The 14 playbooks, each one marketer job from start to finish: `research-market`, `research-competitors`, `research-audience`, `plan-campaign`, `make-content`, `make-static-ads`, `run-organic-social`, `run-paid-campaigns`, `work-with-creators`, `write-outreach`, `email-lifecycle`, `improve-search-visibility`, `analyze-performance`, and `write-report`. The longer names (for example `make-static-ads-ad-copy`) are steps the playbooks load. Some steps can use the GooseWorks data service for lookups. Everything else works with Claude alone. 

**Video ads and the GooseWorks skills (goose-skills)**

These are the other 95 skills from goose-skills: 63 video-ad skills (`render-*`, `create-*`, `video-production-harness` and more), 26 shared helpers (Meta ad manager and analysers, brand research, scrapers, graphic ads) and 6 entry skills (`goose-ads`, `goose-video`, `gooseworks` and others). Most of the video ones need `ffmpeg`, Python 3 and paid keys (fal, ElevenLabs and similar), and the scraper and Meta ones need their own accounts or keys. Put any key in your shell environment, never in a chat. `goose-skills-shared-index.json` lists which shared skill is used by which. All 181 skills make Claude's skill list long. If that bothers you, delete the ones you don't use from `~/.claude/skills`.

**Text clean-up**

- `clean-user-facing-text`: strips hidden Unicode characters from prose and rewrites it in a more natural voice, keeping every fact. It scores the text first and only rewrites when needed. It keeps required disclosures and never claims the result is undetectable. Needs Python 3 for its small scripts, no network.

**Job search (ai-job-search)**

`job-application-assistant`, `job-scraper`, `upskill` and the job-board searches. The board searches drive public job sites and are tuned for Denmark and Canada, so they are of little use for India. They are in the library because you asked for them. The scrapers can break a site's terms, so check a site's rules before running them.

**SEO (claude-seo)**

Start with `seo`. It routes to the others. The connector skills (`seo-ahrefs`, `seo-seranking`, `seo-matomo` and so on) only work with an account or key for that service. `seo-site-audit` is a full-site audit. `seo-audit` (from OpenSEO) is the other one.

**The big optional set (ECC)**

`bash claude-library/install.sh --update --all` also installs 277 more skills from ECC (language and framework patterns, ops, finance, logistics, healthcare and more). They are mostly not relevant here and make Claude's skill list very long (about 590 skills in all), so they are off by default.

**Need a one-time install**

- `playwright-cli`: needs the CLI. On the Mac: `npm install -g @playwright/cli@latest`. Then Claude can open a browser, click, type and take screenshots from Claude Code.

**Need an account or key**

- The 12 OpenSEO skills (`seo-audit`, `keyword-research`, `keyword-clustering`, `competitor-analysis`, `competitive-landscape`, `link-prospecting`, `local-seo`, `ai-visibility-audit`, `ai-prompt-research`, `seo-project-setup`, `seo-report`, `seo-coach`): need the OpenSEO connector (openseo.so). They use its tools for search data and stop if it is not connected.
- `ai-image-creator`: needs an OpenRouter or Google AI key, or a Cloudflare AI Gateway. Put the key in your shell environment, never in a chat.
- `consult-codex`: needs the OpenAI Codex CLI installed and signed in.
- `consult-zai`: needs a z.ai account.

## Checked before adding

Every script was read for network calls, key handling and code execution:

- `ai-image-creator` only calls the image provider you configure. It refuses to send files like SSH keys.
- `session-metrics` runs test predicates that ship inside the skill. It only calls the Anthropic token-count API if you ask it to compare models with your own key.
- `task-observer` works offline.

No skill adds hooks or changes settings when installed.

## NiubiGEO

A self-hosted app (Next.js, Docker) that tracks whether AI answers mention a brand. It has no skills, so nothing was installed. To try it, clone `Albert-Weasker/niubigeo` and follow its Docker guide. Its keys go in its `.env`, never in a chat.

## Headroom

Headroom compresses what Claude Code sends to the model by running a local proxy, and adds hooks on every session start and every shell command. It changes how all of Claude Code talks to Anthropic, so it is not installed by the script. If you want it, on the Mac:

```
uv tool install headroom-ai
```

Then follow its quickstart at https://docs.headroomlabs.ai/docs/quickstart. Undo with `uv tool uninstall headroom-ai`.

## Image to code (screenshot-to-code)

A separate web app: drop in a screenshot or screen recording, get HTML, React or Vue code back. It needs its own OpenAI, Anthropic or Gemini API key. Claude Code can already do this directly: paste a screenshot and ask for the code. If you want the app anyway, on the Mac:

```
git clone https://github.com/abi/screenshot-to-code && cd screenshot-to-code
echo "ANTHROPIC_API_KEY=your-key" > .env
docker-compose up -d --build
```

Then open http://localhost:5173. Put the key in that `.env` file only, never in a chat.

## Licences

open-seo, my-claude-code-setup, OmniRoute, Vercel agent-skills and awesome-design-md are MIT. playwright-cli is Apache 2.0. goose-skills, watermarks-remover, ai-job-search, claude-seo and ECC are MIT. NiubiGEO is Apache 2.0 (licence copied, nothing else taken). one-skill-to-rule-them-all is CC BY 4.0 (author: Eoghan Henn). Copies are in `licenses/`.
