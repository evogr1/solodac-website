import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { CaptionFrame, SlideFrame, Waveform } from "@/components/katran/frames";
import KatranHero from "@/components/katran/KatranHero";
import SceneBar from "@/components/katran/SceneBar";
import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import { networkPages } from "@/lib/site";
import { scrollToId } from "@/lib/smoothScroll";

// The Katran page is built from the taste skill's "sentence is the layout" direction:
// each section is a short statement with its proof beside it, on one dark ground.

const faqs = [
  { q: "Is it live?", a: "Yes, for us. Our editors and our pages use it every day. Creator access opens in batches, and the waitlist goes first." },
  { q: "Will my videos look AI-made?", a: "That's the one thing we built it to avoid. If an edit wouldn't pass on our own pages, it doesn't ship." },
  { q: "Who is it for?", a: "YouTube creators, Instagram page owners and small editing teams who post a lot and want to spend less time on the timeline." },
  { q: "What will it cost?", a: "We'll share pricing with the waitlist before anyone else." },
];

const ease = [0.16, 1, 0.3, 1] as const;

/** Rises once into place as it enters; static for reduced motion. */
function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** A picture-word: a small frame of the product sitting inline in a sentence. */
function Slot({ children, label }: { children: ReactNode; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="mx-[0.12em] inline-block h-[1em] w-[1.9em] translate-y-[0.12em] overflow-hidden rounded-[0.18em] align-baseline"
    >
      {children}
    </span>
  );
}

function NamesSentence() {
  const names = networkPages.map((page) => page.name);
  const [lit, setLit] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setLit((current) => (current + 1) % names.length), 2000);
    return () => window.clearInterval(timer);
  }, [names.length]);

  return (
    <section className="container pb-[120px] pt-16 sm:pb-[160px] sm:pt-20" aria-labelledby="pages">
      <h2 id="pages" className="sr-only">Pages Katran edits for</h2>
      <Rise>
        <p className="max-w-[62rem] text-[clamp(22px,2.4vw,34px)] font-medium leading-[1.25] tracking-[-0.01em]">
          <span className="text-paper">Katran already cuts for </span>
          {names.map((name, index) => (
            <span key={name} className={index === lit ? "text-paper transition-colors duration-[400ms]" : "text-paper/45 transition-colors duration-[400ms]"}>
              {name}
              {index < names.length - 2 ? ", " : index === names.length - 2 ? " and " : "."}
            </span>
          ))}
        </p>
      </Rise>
    </section>
  );
}

export default function Katran() {
  const joinWaitlist = () => scrollToId("waitlist");

  return (
    <Layout>
      <KatranHero onJoin={joinWaitlist} />

      <NamesSentence />

      <section className="bg-ink-2">
        <div className="container py-[120px] sm:py-[160px]">
          <Rise>
            <h2 className="font-display text-[clamp(44px,5vw,84px)] leading-[0.98] tracking-[-0.04em]">
              Your voiceover, cut into scenes.
            </h2>
          </Rise>
          <Rise delay={0.08}>
            <p className="mt-6 max-w-[40rem] text-[18px] leading-relaxed text-paper/75">
              A sample: an 11:38 founder story. Point at a scene to see which line of the voiceover became which caption.
            </p>
          </Rise>
          <div className="mt-16">
            <SceneBar />
          </div>
        </div>
      </section>

      <section className="container py-[120px] sm:py-[160px]" aria-labelledby="makes">
        <h2 id="makes" className="sr-only">What Katran makes</h2>
        <div className="max-w-[64rem] space-y-6 text-[clamp(24px,2.4vw,34px)] font-medium leading-[1.3] tracking-[-0.01em]">
          <Rise>
            <p>
              Give it a voiceover
              <Slot label="A voiceover waveform">
                <span className="flex h-full w-full items-center bg-paper px-[0.12em]">
                  <Waveform played={0.5} every={4} />
                </span>
              </Slot>
              and it hands back a finished YouTube video.
            </p>
          </Rise>
          <Rise delay={0.08}>
            <p>
              Point it at a reel
              <Slot label="A reel with synced captions">
                <CaptionFrame compact />
              </Slot>
              and it finds the source and cuts the best part.
            </p>
          </Rise>
          <Rise delay={0.16}>
            <p>
              Give it a topic
              <Slot label="The first slide of a carousel">
                <SlideFrame compact />
              </Slot>
              and it writes, designs and checks a carousel.
            </p>
          </Rise>
        </div>
        <Rise delay={0.2} className="mt-[72px] lg:ml-[50%]">
          <p className="max-w-[28rem] text-[18px] leading-relaxed text-paper/75">
            All three learn your page's style once and keep it on every video after.
          </p>
          <button
            type="button"
            onClick={joinWaitlist}
            className="mt-6 rounded-full bg-signal px-6 py-3.5 text-[15px] font-semibold text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-paper active:scale-[0.97]"
          >
            Join the waitlist
          </button>
        </Rise>
      </section>

      <section className="bg-ink-2">
        <div className="container grid items-start gap-12 py-[120px] sm:py-[160px] lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-6 lg:pt-16">
            <Rise>
              <h2 className="font-display text-[clamp(44px,5vw,84px)] leading-[0.98] tracking-[-0.04em]">
                Every channel <br className="hidden sm:block" />keeps its look.
              </h2>
            </Rise>
            <Rise delay={0.08}>
              <p className="mt-6 max-w-[30rem] text-[18px] leading-relaxed text-paper/75">
                Katran learns a style per channel and keeps it. When it gets something wrong, it remembers, so the same mistake doesn't come back.
              </p>
            </Rise>
          </div>
          <Rise delay={0.12} className="lg:col-span-6">
            <div data-ui="" className="rounded-[4px] bg-paper p-6 text-ink sm:p-8">
              <div className="flex items-baseline justify-between text-[15px]">
                <span className="font-semibold">Saved style</span>
                <span className="text-ink/60">Sample: a business page</span>
              </div>
              <dl className="mt-8 space-y-6">
                {[
                  ["Captions", "Bricolage ExtraBold, cream on black, one line at a time"],
                  ["Pace", "A new shot every three seconds"],
                  ["Music", "Low piano, pulled down under the voice"],
                  ["Never again", "Zooms on faces. Flagged once, not repeated."],
                ].map(([term, value]) => (
                  <div key={term} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="text-[15px] text-ink/60">{term}</dt>
                    <dd className="text-[18px] font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Rise>
        </div>
      </section>

      <section className="container py-[120px] sm:py-[160px]">
        <Rise>
          <h2 className="font-display text-[clamp(44px,5vw,84px)] leading-[0.98] tracking-[-0.04em]">Before you join.</h2>
        </Rise>
        <div className="mt-20 space-y-3 lg:ml-[33.333%]">
          {faqs.map((faq, index) => (
            <Rise key={faq.q} delay={index * 0.06}>
              <details className="group rounded-[4px] px-6 py-5 transition-colors duration-200 open:bg-ink-2 hover:bg-ink-2/60">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[clamp(19px,1.7vw,24px)]">
                  {faq.q}
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180">
                    <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-4 max-w-[48ch] text-[17px] leading-relaxed text-paper/75">{faq.a}</p>
              </details>
            </Rise>
          ))}
        </div>
      </section>

      <section className="flex min-h-svh flex-col justify-between bg-ink-2 px-4 py-8 text-center sm:py-10">
        <h2 aria-label="Want Katran on your channel?" className="font-display mx-auto text-[clamp(56px,10vw,160px)] leading-none tracking-[-0.045em]">
          Want Katran
        </h2>
        <div>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
            <button
              type="button"
              onClick={joinWaitlist}
              className="w-[72%] rounded-full bg-signal px-8 py-4 text-[18px] font-medium text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-paper active:scale-[0.97] sm:w-auto"
            >
              Join the waitlist
            </button>
            <span className="text-[18px] text-paper/60">or</span>
            <Link
              href="/contact"
              className="w-[72%] rounded-full bg-paper px-8 py-4 text-[18px] font-medium text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-paper-2 active:scale-[0.97] sm:w-auto"
            >
              Book a call
            </Link>
          </div>
          <p className="mt-4 text-[16px] text-paper/60">The waitlist opens in batches. A call gets you a walkthrough first.</p>
        </div>
        <p aria-hidden="true" className="font-display mx-auto text-[clamp(56px,10vw,160px)] leading-none tracking-[-0.045em]">
          on your channel?
        </p>
      </section>

      <section id="waitlist" className="container grid gap-12 py-[120px] sm:py-[160px] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[clamp(44px,5vw,84px)] leading-[0.98] tracking-[-0.04em]">Join the waitlist.</h2>
          <p className="mt-6 max-w-[26rem] text-[18px] leading-relaxed text-paper/75">
            Tell us what you make. We open access in batches and pick creators whose work fits each batch.
          </p>
        </div>
        <div className="lg:col-span-7">
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
        </div>
      </section>
    </Layout>
  );
}
