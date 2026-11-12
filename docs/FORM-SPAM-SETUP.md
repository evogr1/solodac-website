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

## One more step: switch off the old Web3Forms key

The old form service key is visible in the page source, so a bot can post to Web3Forms directly and skip the new check. Once you have confirmed a real form reaches `info@solodac.com`, log in to web3forms.com and delete or regenerate that access key. The site no longer uses it while protection is on.

(Update, 12 November 2026: the Web3Forms code and its key were removed from the site. The old key still works at web3forms.com until you delete it there.)

## If something goes wrong

- While protection is on, a visitor whose check cannot finish (an ad blocker, an unusual browser) sees: "We couldn't confirm you're a person. Please email info@solodac.com." There is no fallback to the old route, on purpose.
- The form waits up to 12 seconds for the check before giving up.
- `TURNSTILE_SITE_KEY` is also set in `wrangler.jsonc` (it is public), so a deploy cannot erase it. If you change the key in the dashboard, change it there too.
- To switch protection off, remove `TURNSTILE_SITE_KEY` from `wrangler.jsonc` and the dashboard and deploy. The forms then stop sending and tell visitors to email instead. There is no Web3Forms route any more.

## Live checks (5 November 2026)

- The test form from the Contact page arrived from `forms@solodac.com` at `info@solodac.com` with SPF pass, DKIM pass and DMARC pass, and a reply goes to the address typed in the form.
- DNS now has SPF, Google DKIM, DMARC (policy `none`, reports to `info@solodac.com`), Resend DKIM, and the `send` and `rsend` records.
- Later: after two to four weeks of clean DMARC reports, move the DMARC policy from `none` to `quarantine`.

## How it was tested

With Cloudflare's own test keys and a stand-in for Resend: a good post is verified and emailed with the right reply-to; a post without a token, with a bad body, from another site, or with a failed check is refused and sends nothing. The Contact form was submitted in a real browser on laptop and phone widths.
