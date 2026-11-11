# solodac-website

The code behind [solodac.com](https://solodac.com), the site for SoloDac, a creator-marketing studio in India. It is a live production site, built in the open.

## Stack

- React 19, Vite, Tailwind v4, wouter
- Every page is drawn to real HTML at build time, so crawlers that skip JavaScript still read the text
- A Cloudflare Worker (`worker/index.ts`) handles the contact forms (Turnstile and Resend), click and form counting in Workers KV, old-address redirects and real 404s
- A small Express server in `server/` for running the built site on a plain Node host

## Run it

You need Node and pnpm.

```bash
pnpm install
pnpm dev
```

Before you open a pull request:

```bash
pnpm check
pnpm build
```

Form protection needs `TURNSTILE_SECRET` and `RESEND_API_KEY` set on the Worker. Steps are in [docs/FORM-SPAM-SETUP.md](docs/FORM-SPAM-SETUP.md). Never commit keys.

## Layout

| Path | What it holds |
| --- | --- |
| `client/` | The site: pages, components, styles |
| `worker/` | The Cloudflare Worker |
| `shared/` | Page list, redirects and constants used by both sides |
| `scripts/` | The build step that writes each page as HTML |
| `docs/` | Project status, content plan and setup notes |
| `claude-library/` | A library of agent skills with one installer |

## Skill library

`claude-library/` holds 291 agent skills collected from open-source repos, covering SEO, ads, video, design and web security. `install.sh` installs them for Claude Code on one machine. [claude-library/README.md](claude-library/README.md) lists where every skill came from and what each one needs. The licence for each source is in `claude-library/licenses/`.

## Licence

The original code is MIT, see [LICENSE](LICENSE). The brand, client logos, reel images and the third-party skills are not covered by it. The LICENSE file says exactly what is left out.
