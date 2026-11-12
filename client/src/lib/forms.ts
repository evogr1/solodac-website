import { track } from "./track";

type LeadConfig = { turnstileSiteKey?: string };
let config: Promise<LeadConfig> | null = null;

/**
 * Asks the Worker for the Turnstile site key. The forms only work once the Turnstile and
 * Resend keys are set on the Worker; without them this returns {} and a submit fails with
 * the "email us" message. There is no other route for a form to take.
 */
export function getLeadConfig(): Promise<LeadConfig> {
  config ??= fetch("/api/lead-config")
    .then((response) => (response.ok ? (response.json() as Promise<LeadConfig>) : {}))
    .catch(() => ({}));
  return config;
}

/** Sends a form through our own Worker, which checks the Turnstile token and emails it. */
export async function submitForm(subject: string, fields: Record<string, string>, token?: string) {
  if (!token) throw new Error("No human-check token");
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, fields, token }),
  });
  if (!response.ok) throw new Error("Form submission failed");
  track("form_sent");
}
