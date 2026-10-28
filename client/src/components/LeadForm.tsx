import { Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { submitForm } from "@/lib/web3forms";
import { cn } from "@/lib/utils";

export type Field =
  | { name: string; label: string; type: "text" | "email" | "tel" | "url"; required?: boolean; placeholder?: string; half?: boolean }
  | { name: string; label: string; type: "select"; options: string[]; required?: boolean; half?: boolean }
  | { name: string; label: string; type: "textarea"; required?: boolean; placeholder?: string };

const inputClass =
  "w-full rounded-xl border border-paper/15 bg-ink px-4 py-3.5 text-paper placeholder:text-paper/30 transition-colors focus:border-signal focus:outline-none";

export default function LeadForm({
  subject,
  fields,
  submitLabel,
  successTitle,
  successBody,
  initial = {},
}: {
  subject: string;
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  initial?: Record<string, string>;
}) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }));

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    try {
      await submitForm(subject, values);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="success-panel rounded-2xl border border-paper/10 bg-ink-2 p-8 sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-signal text-ink">
          <Check size={22} />
        </div>
        <h3 className="font-display mt-6 text-3xl">{successTitle}</h3>
        <p className="mt-3 max-w-md text-paper/60">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-paper/10 bg-ink-2 p-5 sm:grid-cols-2 sm:p-8">
      {fields.map((field) => (
        <label key={field.name} className={cn("block", field.type === "textarea" || !("half" in field && field.half) ? "sm:col-span-2" : "")}>
          <span className="mb-2 block text-sm font-medium text-paper/75">
            {field.label}
            {field.required && <span className="text-signal"> *</span>}
          </span>
          {field.type === "select" ? (
            <select
              className={cn(inputClass, "appearance-none")}
              required={field.required}
              value={values[field.name] ?? ""}
              onChange={(event) => set(field.name, event.target.value)}
            >
              <option value="" disabled>Choose one</option>
              {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              className={cn(inputClass, "min-h-[140px] resize-y")}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(event) => set(field.name, event.target.value)}
            />
          ) : (
            <input
              className={inputClass}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(event) => set(field.name, event.target.value)}
            />
          )}
        </label>
      ))}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper disabled:opacity-60"
        >
          {status === "sending" && <Loader2 size={16} className="animate-spin" />}
          {submitLabel}
        </button>
        {status === "error" && (
          <p className="text-sm text-signal-soft">That didn't go through. Try again or email info@solodac.com.</p>
        )}
      </div>
    </form>
  );
}
