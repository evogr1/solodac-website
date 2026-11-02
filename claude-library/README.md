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

## Licences

open-seo, my-claude-code-setup and OmniRoute are MIT. one-skill-to-rule-them-all is CC BY 4.0 (author: Eoghan Henn). Copies are in `licenses/`.
