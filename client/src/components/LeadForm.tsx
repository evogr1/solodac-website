import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useHumanCheck } from "@/components/useHumanCheck";
import { submitForm } from "@/lib/forms";
import { cn } from "@/lib/utils";

export type Field =
  | { name: string; label: string; type: "text" | "email" | "tel" | "url"; required?: boolean; placeholder?: string; half?: boolean }
  | { name: string; label: string; type: "select"; options: string[]; required?: boolean; half?: boolean }
  | { name: string; label: string; type: "textarea"; required?: boolean; placeholder?: string };

// Long enough for any real answer, short enough that a bot can't paste a novel into the inbox.
const maxLengths = { text: 120, email: 254, tel: 30, url: 300, textarea: 3000 } as const;

// What each field tells the browser, so phones and password managers can fill it in.
const autoFill: Record<string, string> = { name: "name", email: "email", phone: "tel", company: "organization" };

const inputClass =
  "w-full rounded-xl border border-paper/15 bg-ink px-4 py-3.5 text-paper placeholder:text-paper/50 transition-colors focus:border-signal focus:outline-none";

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
  // A hidden field people never see. Bots fill every field, so a value here means a bot.
  const [trap, setTrap] = useState("");
  const check = useHumanCheck();
  const [blocked, setBlocked] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const set = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }));

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBlocked(false);
    if (trap) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      let token: string | undefined;
      if (check.enabled) {
        // The check usually finishes in a second or two. Give it up to 12 before giving up.
        token = await check.waitForToken(12000);
        if (!token) {
          setBlocked(true);
          setStatus("error");
          check.reset();
          return;
        }
      }
      await submitForm(subject, values, token);
      setStatus("sent");
    } catch {
      setStatus("error");
      check.reset();
    }
  }

  if (status === "sent") {
    return (
      <div className="success-panel rounded-2xl bg-ink-2 p-8 sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-signal text-ink">
          <Check size={22} />
        </div>
        <h3 ref={successRef} tabIndex={-1} className="font-display mt-6 text-3xl focus:outline-none">{successTitle}</h3>
        <p className="mt-3 max-w-md text-paper/60">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl bg-ink-2 p-5 sm:grid-cols-2 sm:p-8">
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={trap}
        onChange={(event) => setTrap(event.target.value)}
      />
      {fields.map((field) => (
        <label key={field.name} className={cn("block", field.type === "textarea" || !("half" in field && field.half) ? "sm:col-span-2" : "")}>
          <span className="mb-2 block text-sm font-medium text-paper/75">
            {field.label}
            {field.required && <span className="text-signal"> *</span>}
          </span>
          {field.type === "select" ? (
            <span className="relative block">
              <select
                className={cn(inputClass, "appearance-none pr-11")}
                name={field.name}
                required={field.required}
                value={values[field.name] ?? ""}
                onChange={(event) => set(field.name, event.target.value)}
              >
                <option value="" disabled>Choose one</option>
                {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              <ChevronDown aria-hidden="true" size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-paper/55" />
            </span>
          ) : field.type === "textarea" ? (
            <textarea
              className={cn(inputClass, "min-h-[140px] resize-y")}
              name={field.name}
              required={field.required}
              maxLength={maxLengths.textarea}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(event) => set(field.name, event.target.value)}
            />
          ) : (
            <input
              className={inputClass}
              name={field.name}
              type={field.type}
              autoComplete={autoFill[field.name] ?? "off"}
              required={field.required}
              maxLength={maxLengths[field.type]}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(event) => set(field.name, event.target.value)}
            />
          )}
        </label>
      ))}

      <div className="sm:col-span-2">{check.widget}</div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper disabled:opacity-60"
        >
          {status === "sending" && <Loader2 size={16} className="animate-spin" />}
          {submitLabel}
        </button>
        <p role="alert" className="text-sm text-signal-soft">
          {status === "error" && (blocked ? "We couldn't confirm you're a person. Please email info@solodac.com." : "That didn't go through. Try again or email info@solodac.com.")}
        </p>
      </div>
    </form>
  );
}
