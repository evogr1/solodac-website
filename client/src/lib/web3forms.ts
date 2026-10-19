const ACCESS_KEY = "fa96ec00-da5f-49aa-89cf-6cd11dd05a95";

export async function submitForm(subject: string, fields: Record<string, string>) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: ACCESS_KEY, subject, from_name: "SoloDac website", ...fields }),
  });
  const result = (await response.json().catch(() => ({}))) as { success?: boolean };
  if (!response.ok || !result.success) throw new Error("Form submission failed");
}
