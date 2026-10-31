import KatranMock from "@/components/KatranMock";
import Layout from "@/components/Layout";
import MeshGradient from "@/components/effects/MeshGradient";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import { Kicker, SectionHead } from "@/components/site";
import { katranTools } from "@/lib/site";
import { scrollToId } from "@/lib/smoothScroll";

const faqs = [
  { q: "Is it live?", a: "Yes, for us. Our editors and our pages use it every day. Creator access opens in batches, and the waitlist goes first." },
  { q: "Will my videos look AI-made?", a: "That's the one thing we built it to avoid. If an edit wouldn't pass on our own pages, it doesn't ship." },
  { q: "Who is it for?", a: "YouTube creators, Instagram page owners and small editing teams who post a lot and want to spend less time on the timeline." },
  { q: "What will it cost?", a: "We'll share pricing with the waitlist before anyone else." },
];

export default function Katran() {
  return (
    <Layout>
      <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-44">
        <div className="pointer-events-none absolute -inset-x-[12%] -inset-y-[18%]"><MeshGradient /></div>
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="container relative grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <Reveal>
            <Kicker>Katran by SoloDac · Waitlist open</Kicker>
            <h1 className="font-display mt-6 text-[clamp(3rem,8vw,6.5rem)] leading-[0.9]">
              Katran edits <br />for you.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-paper/65 sm:text-lg">
              Katran is the video editor behind the SoloDac network. Long-form videos, reels and carousels come out finished, in your style, without the hours on a timeline.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToId("waitlist")}
                className="rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper"
              >
                Join the waitlist
              </button>
              <span className="text-sm text-paper/45">Free to join. First batches open soon.</span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <KatranMock />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-paper/10 bg-ink-2">
        <div className="container py-24 sm:py-32">
          <Reveal>
            <SectionHead kicker="Three tools, one place" title="Something goes in. Something finished comes out." />
          </Reveal>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {katranTools.map((tool, index) => (
              <Reveal key={tool.name} delay={index * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-paper/10 bg-ink p-7">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
                    <span className="rounded-full bg-paper/10 px-3 py-1 text-paper/70">{tool.input}</span>
                    <span className="text-paper/30">→</span>
                    <span className="rounded-full bg-signal/15 px-3 py-1 text-signal">{tool.output}</span>
                  </div>
                  <h3 className="font-display mt-10 text-3xl">{tool.name}</h3>
                  <p className="mt-3 leading-relaxed text-paper/60">{tool.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-12 py-24 sm:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHead
            kicker="Why it's different"
            title={<>Your style is the <span className="font-serif-i font-normal text-signal">whole point.</span></>}
            intro="Every channel we run has its own look. So Katran learns a style per channel and keeps it. It also remembers its mistakes, so the same one doesn't show up twice."
          />
        </Reveal>
        <div className="divide-y divide-paper/10 border-y border-paper/10">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                {faq.q}
                <span className="text-2xl text-paper/40 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-xl leading-relaxed text-paper/60">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="waitlist" className="border-t border-paper/10 bg-ink-2">
        <div className="container grid gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Kicker>Waitlist</Kicker>
            <h2 className="font-display mt-5 text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[0.95]">Get in early.</h2>
            <p className="mt-5 max-w-md text-paper/60">Tell us what you make. We open access in batches and pick creators whose work fits each batch.</p>
          </div>
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
