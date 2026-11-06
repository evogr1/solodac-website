import { track } from "./track";

const ACCESS_KEY = "fa96ec00-da5f-49aa-89cf-6cd11dd05a95";

type LeadConfig = { turnstileSiteKey?: string };
let config: Promise<LeadConfig> | null = null;

/**
 * Asks the Worker whether the spam-protected form route is switched on.
 * It is only on once the Turnstile and Resend keys are set on the Worker; until then this
 * returns {} and the forms post to Web3Forms exactly as they always did.
 */
export function getLeadConfig(): Promise<LeadConfig> {
  config ??= fetch("/api/lead-config")
    .then((response) => (response.ok ? (response.json() as Promise<LeadConfig>) : {}))
    .catch(() => ({}));
  return config;
}

/** Sends a form. With a Turnstile token it goes through our own Worker; without one, to Web3Forms. */
export async function submitForm(subject: string, fields: Record<string, string>, token?: string) {
  if (token) {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, fields, token }),
    });
    if (!response.ok) throw new Error("Form submission failed");
    track("form_sent");
    return;
  }
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: ACCESS_KEY, subject, from_name: "SoloDac website", ...fields }),
  });
  const result = (await response.json().catch(() => ({}))) as { success?: boolean };
  if (!response.ok || !result.success) throw new Error("Form submission failed");
  track("form_sent");
}
