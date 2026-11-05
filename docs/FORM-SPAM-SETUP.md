# Turning on spam protection for the forms

The site's forms (Contact, Katran waitlist, and the quick email box) are ready for Cloudflare Turnstile, the free human check. The code is live but switched off. Today the forms post to Web3Forms with a hidden trap field. They switch to the protected route by themselves the moment the three settings below exist. If any of them is missing, nothing changes.

## What you do (about 15 minutes, all free)

Never paste any key into a chat. Put them only in the places below.

### 1. Turnstile (Cloudflare dashboard)

1. Cloudflare dashboard, then **Turnstile**, then **Add widget**.
2. Name it `solodac.com`. Add the hostname `solodac.com`. Choose **Managed**.
3. Copy the **Site Key** and the **Secret Key**.

### 2. Resend (sends the form emails)

1. Make a free account at resend.com (3,000 emails a month free).
2. **Domains**, then **Add domain**, then `solodac.com`. Resend shows a few DNS records. Add them in Cloudflare DNS exactly as shown. They use their own `send` name, so your Google Workspace email keeps working.
3. When the domain shows **Verified**, go to **API Keys**, then **Create API key** with **Sending access** only. Copy it.

### 3. Put the settings on the Worker

Cloudflare dashboard, then **Workers & Pages**, then **solodac-website**, then **Settings**, then **Variables and Secrets**. Add:

| Name | Type | Value |
| --- | --- | --- |
| `TURNSTILE_SITE_KEY` | Text | the Site Key from step 1 |
| `TURNSTILE_SECRET` | Secret | the Secret Key from step 1 |
| `RESEND_API_KEY` | Secret | the API key from step 2 |

Optional, only if you want something different:

| Name | Type | Default |
| --- | --- | --- |
| `MAIL_TO` | Text | `info@solodac.com` |
| `MAIL_FROM` | Text | `SoloDac website <forms@solodac.com>` (must be on the domain you verified in Resend) |

Save and deploy. No code change is needed.

## How to check it worked

1. Open https://solodac.com/api/lead-config. It should show `{"turnstileSiteKey":"..."}`. If it shows `{}`, one of the three settings is missing.
2. Send a test from the Contact page. It should reach `info@solodac.com`, and replying should go to the address you typed in the form.
3. Visitors see nothing extra. The check only shows a box if Cloudflare cannot tell they are a person.

## What it protects against

- A form post is refused unless Cloudflare confirms the visitor passed the check.
- Only pages on solodac.com can post to the route.
- Field names and lengths are capped, so a bot cannot send a huge message.

## If something goes wrong

- If the check cannot load for a visitor (an ad blocker, for example), the form falls back to the old route instead of locking them out.
- To switch protection off, delete `TURNSTILE_SITE_KEY` in the dashboard. The forms go back to Web3Forms at once.

## How it was tested

With Cloudflare's own test keys and a stand-in for Resend: a good post is verified and emailed with the right reply-to; a post without a token, with a bad body, from another site, or with a failed check is refused and sends nothing. The Contact form was submitted in a real browser on laptop and phone widths.
