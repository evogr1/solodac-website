import { Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import Reel from "@/components/katran/Reel";
import FaqSchema from "@/components/FaqSchema";
import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import { millionViewReels as reels, totalReelViews } from "@/lib/reels";
import { katranTools } from "@/lib/site";
import { scrollToId } from "@/lib/smoothScroll";
import { useHumanCheck } from "@/components/useHumanCheck";
import { submitForm } from "@/lib/forms";

const steps = [
  { title: "Send something", body: "A podcast or interview link, a voiceover, or just a topic." },
  { title: "Katran makes the cut", body: "It picks the moment, cuts it, writes the hook, sets the captions and designs the frames in your page's style." },
  { title: "You check it and post", body: "Change anything you like. Katran remembers your style, so the next one needs fewer changes." },
];

const faqs = [
  { q: "Is it live?", a: "Yes, inside SoloDac. Our editors and our pages use it every day. Creators get access in batches, and the waitlist goes first." },
  { q: "Will my videos look AI-made?", a: "That is the one thing we built it to avoid. If an edit wouldn't pass on our own pages, it doesn't ship." },
  { q: "Who is it for?", a: "YouTube creators, Instagram page owners and small editing teams who post often and want to spend less time on the timeline." },
  { q: "What will it cost?", a: "Less than one full-time editor's monthly salary. The waitlist gets exact pricing first." },
];

/** Email only, right in the hero, for people who are already convinced. */
function QuickJoin() {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const check = useHumanCheck();
  const [blocked, setBlocked] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBlocked(false);
    if (trap) return setStatus("sent");
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
      await submitForm("Katran waitlist", { email }, token);
      setStatus("sent");
    } catch {
      setStatus("error");
      check.reset();
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="flex items-start gap-3 text-[17px] leading-relaxed text-paper/85">
        <Check size={20} className="mt-1 shrink-0 text-signal" />
        <span>
          You're on the list.{" "}
          <button type="button" onClick={() => scrollToId("waitlist")} className="underline decoration-paper/30 underline-offset-4 hover:decoration-signal">
            Tell us what you make
          </button>{" "}
          to get in sooner.
        </span>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[30rem]">
      <div className="flex flex-col gap-2 rounded-full sm:flex-row sm:bg-ink-2 sm:p-1.5">
        <label htmlFor="quick-email" className="sr-only">Email</label>
        <input
          id="quick-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={254}
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-w-0 flex-1 rounded-full border border-paper/15 bg-ink-2 px-5 py-3.5 text-[16px] text-paper placeholder:text-paper/50 focus:border-signal focus:outline-none sm:border-0 sm:bg-transparent"
        />
        <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={trap} onChange={(event) => setTrap(event.target.value)} />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-3.5 text-[15px] font-semibold text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-paper active:scale-[0.97] disabled:opacity-60"
        >
          {status === "sending" && <Loader2 size={16} className="animate-spin" />}
          Get early access
        </button>
      </div>
      {check.widget}
      <p role="alert" className="mt-3 px-2 text-[14px] text-signal-soft">
        {status === "error" && (blocked ? "We couldn't confirm you're a person. Please email info@solodac.com." : "That didn't go through. Try again or email info@solodac.com.")}
      </p>
    </form>
  );
}

export default function Katran() {
  return (
    <Layout>
      <FaqSchema faqs={faqs} />
      <section className="container pt-32 sm:pt-40">
        <Reveal>
          <h1 className="font-display max-w-5xl text-[clamp(44px,6.4vw,104px)] leading-[0.94] tracking-[-0.04em]">
            The editor behind {totalReelViews} views.
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-2xl text-[19px] leading-relaxed text-paper/80">
            Katran turns long videos, voiceovers and topics into reels, YouTube videos and carousels. Our own pages post with it every day. Creators get access next, for less than one editor's monthly salary.
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-9">
          <QuickJoin />
        </Reveal>
      </section>

      <section className="pb-14 pt-12 sm:pb-20 lg:pt-16" aria-labelledby="reels">
        <div className="container">
          <h2 id="reels" className="text-[15px] text-paper/60">
            Made with Katran on our own pages. Each one passed a million views.
          </h2>
        </div>
        <div className="container mt-5">
          <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {reels.map((reel, index) => (
              <Reveal key={reel.id} delay={0.1 + index * 0.05} className="w-[62vw] max-w-[260px] shrink-0 snap-start sm:w-[34vw] lg:w-auto lg:max-w-none">
                <Reel reel={reel} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how">
        <div className="container py-14 sm:py-20">
          <Reveal>
            <h2 id="how" className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">How it works.</h2>
          </Reveal>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[5px] hidden h-px bg-paper/15 md:block" />
            {steps.map((step, index) => (
              <li key={step.title} className="relative">
                <Reveal delay={index * 0.08} y={16}>
                  <span aria-hidden="true" className={`block h-[11px] w-[11px] rounded-full ${index === 0 ? "bg-signal" : "bg-paper"}`} />
                  <h3 className="font-display mt-6 text-[clamp(24px,2vw,30px)] leading-tight tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 max-w-[22rem] text-[17px] leading-relaxed text-paper/65">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container py-14 sm:py-20" aria-labelledby="makes">
        <Reveal>
          <h2 id="makes" className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">What goes in. What comes out.</h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {katranTools.map((tool, index) => (
            <Reveal key={tool.name} delay={index * 0.06}>
              <div className="flex h-full flex-col rounded-2xl bg-ink-2 p-7">
                <h3 className="font-display text-[clamp(26px,2.2vw,32px)] leading-tight tracking-[-0.02em]">
                  <span className="text-paper/55">{tool.input},</span> {tool.output.charAt(0).toLowerCase() + tool.output.slice(1)}.
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-paper/65">{tool.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pb-14 sm:pb-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">Before you join.</h2>
          </Reveal>
          <dl className="space-y-10 lg:col-span-7 lg:col-start-6">
            {faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={index * 0.05}>
                <dt className="text-[20px] font-semibold">{faq.q}</dt>
                <dd className="mt-2 max-w-[34rem] text-[18px] leading-relaxed text-paper/75">{faq.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section id="waitlist">
        <div className="container grid gap-12 py-14 sm:py-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">Get early access.</h2>
            <p className="mt-6 max-w-[26rem] text-[18px] leading-relaxed text-paper/75">
              Tell us what you make. We open access in batches and pick the creators whose work fits each one.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <LeadForm
              subject="Katran waitlist"
              submitLabel="Join the waitlist"
              successTitle="You're on the list."
              successBody="We'll email you when your batch opens. Keep posting till then."
              fields={[
                { name: "name", label: "Name", type: "text", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "makes", label: "What do you make?", type: "select", required: true, options: ["Long-form YouTube", "Reels and Shorts", "Carousels", "All of it"], half: true },
                { name: "volume", label: "Videos or posts a month", type: "select", options: ["Under 10", "10 to 30", "30 to 100", "100+"], half: true },
                { name: "link", label: "Channel or page link", type: "url", placeholder: "https://" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
