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
| Taste skill (reel) | | Already installed as `design-taste-frontend` |

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

open-seo, my-claude-code-setup, OmniRoute, Vercel agent-skills and awesome-design-md are MIT. playwright-cli is Apache 2.0. one-skill-to-rule-them-all is CC BY 4.0 (author: Eoghan Henn). Copies are in `licenses/`.
