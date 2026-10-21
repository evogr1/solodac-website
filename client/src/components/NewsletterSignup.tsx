import { Check, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitForm } from "../lib/web3forms";

export const NEWSLETTER_NAME = "The Daily Dac";

export default function NewsletterSignup({ source, compact = false }: { source: string; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const subscribe = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await submitForm(`${NEWSLETTER_NAME} signup`, { email, source });
      setStatus("done");
    } catch {
      setStatus("idle");
      toast.error("That didn't go through. Try again in a moment.");
    }
  };

  return (
    <section className={`overflow-hidden rounded-xl bg-green text-paper ${compact ? "p-6" : "p-6 sm:p-10"}`}>
      <div className={`grid gap-6 ${compact ? "" : "md:grid-cols-[1.2fr_1fr] md:items-center"}`}>
        <div>
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-paper/80"><Mail size={14} /> Newsletter</div>
          <h2 className={`mt-2 font-headline leading-[0.95] ${compact ? "text-2xl" : "text-3xl sm:text-4xl"}`}>{NEWSLETTER_NAME}</h2>
          <p className="mt-2 max-w-md text-paper/85">India&apos;s business, markets and founder stories that actually matter, in your inbox. Five minutes, no fluff.</p>
        </div>
        {status === "done" ? (
          <div className="flex items-center gap-3 rounded-lg bg-white/15 p-4 font-bold"><Check size={20} /> You&apos;re on the list. First issue lands soon.</div>
        ) : (
          <form onSubmit={subscribe} className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-full bg-paper px-5 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-white/60"
            />
            <button type="submit" disabled={status === "sending"} className="rounded-full bg-pink px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper transition-opacity disabled:opacity-60">
              {status === "sending" ? "Subscribing" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
