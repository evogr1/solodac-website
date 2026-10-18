import { useEffect } from "react";
import { Camera, Check, Clapperboard, Compass, Film, Sparkles, Target, Wand2, Youtube } from "lucide-react";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PrimaryButton, PublisherLayout, SectionTitle, Tag } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";

const pillars = [
  { icon: Compass, title: "Positioning & value proposition", body: "Before a camera turns on: who the channel is for, what problem it solves, and why someone should watch you over everyone else on the topic." },
  { icon: Camera, title: "Proper shooting", body: "Planned episodes, real sets, good light and sound. Long-form people sit through, not phone footage stretched to ten minutes." },
  { icon: Film, title: "Proper editing", body: "Story structure, pacing, b-roll, graphics and retention edits. Edited to hold attention for the whole video, not just the first three seconds." },
  { icon: Clapperboard, title: "Packaging", body: "Titles, thumbnails and hooks tested like they matter, because on YouTube they decide whether the video gets watched at all." },
  { icon: Target, title: "The funnel", body: "Every video points somewhere: your coaching program, your product, your sales calls. Viewers become leads, leads become customers." },
];

const fits = [
  "Founders and business owners with expertise worth explaining",
  "Coaches and educators who want students, not just views",
  "Service businesses whose buyers research before they buy",
  "Brands ready to own a topic for the next five years",
];

const steps = [
  { title: "Strategy call", body: "Your business, your buyer, your offer. We map what the channel needs to do for the business." },
  { title: "Channel blueprint", body: "Positioning, content pillars, episode formats, and the funnel the videos feed into." },
  { title: "Shoot days", body: "Batch-shoot several episodes at once so you spend days on camera, not weeks." },
  { title: "Edit & publish", body: "We edit, package and publish on a steady schedule. You approve, we ship." },
  { title: "Grow & convert", body: "Monthly reviews of watch time, subscribers and leads, and what we change next." },
];

export default function YouTube() {
  useScrollToTop();
  useEffect(() => {
    if (window.location.hash === "#studio") {
      const timer = window.setTimeout(() => document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" }), 450);
      return () => window.clearTimeout(timer);
    }
  }, []);

  return (
    <PublisherLayout ctaTitle="Ready to build a channel that pays you back?">
      <PageHero
        crumb="YouTube channels"
        kicker="New at SoloDac"
        title={<>Everyone&apos;s chasing Instagram. <span className="text-[#e2365b]">We build YouTube channels.</span></>}
        deck="We help business owners launch and grow long-form YouTube channels: proper shooting, proper editing, a clear value proposition, and a funnel that turns viewers into clients, students or customers."
      >
        <div className="flex flex-wrap items-center gap-3">
          <PrimaryButton href="/marketing?service=YouTube%20Channel%20Building">Build my channel</PrimaryButton>
          {["Long-form", "Done for you", "Funnel built in"].map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </PageHero>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <Panel className="h-full">
            <SectionTitle>Why long-form, why now</SectionTitle>
            <div className="space-y-4 text-neutral-700">
              <p>Short-form gets you seen for 30 seconds. A 20-minute video gets you trusted. People who watch you explain something for twenty minutes are the people who book the call, join the program, and buy.</p>
              <p>Most of the market is busy cutting clips for Instagram. YouTube long-form is harder to do well, which is exactly why the people who do it now will own their category for years.</p>
            </div>
          </Panel>
        </Reveal>
        <Reveal delay={0.05}>
          <Panel className="h-full">
            <SectionTitle>Built for</SectionTitle>
            <ul className="space-y-3">
              {fits.map((fit) => <li key={fit} className="flex items-start gap-3 text-neutral-700"><Check size={18} className="mt-0.5 shrink-0 text-[#e2365b]" />{fit}</li>)}
            </ul>
          </Panel>
        </Reveal>
      </div>

      <div className="mt-8">
        <SectionTitle number="01">What we handle</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.04}>
              <Panel className="h-full">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#e2365b]/10 text-[#e2365b]"><pillar.icon size={20} /></span>
                <h3 className="mt-4 text-lg font-extrabold leading-snug">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{pillar.body}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>

      <Panel className="mt-8">
        <SectionTitle number="02">How it works</SectionTitle>
        <ol className="grid gap-px overflow-hidden rounded-lg bg-neutral-200 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((item, index) => (
            <li key={item.title} className="bg-white p-5">
              <div className="font-mono text-xs text-[#e2365b]">0{index + 1}</div>
              <div className="mt-2 text-lg font-extrabold">{item.title}</div>
              <p className="mt-1.5 text-sm text-neutral-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </Panel>

      <Reveal>
        <section id="studio" className="mt-8 scroll-mt-20 overflow-hidden rounded-xl bg-[#111] text-white shadow-sm">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-coral"><Sparkles size={13} /> FireYourEditor · In development</div>
              <h2 className="mt-3 font-[Georgia,serif] text-3xl font-bold leading-tight sm:text-4xl">One prompt in. A properly edited YouTube video out.</h2>
              <p className="mt-4 max-w-xl text-white/70">Meet FireYourEditor, the AI editor we&apos;re building for long-form YouTube. Yes, the name is on purpose. Sorry, editors. Give it a prompt and it returns a properly edited, properly synced 10-minute video. Teach it your style and it edits like your team would. No AI slop.</p>
              <p className="mt-3 max-w-xl text-sm text-white/50">It&apos;s our internal tool today and it powers our own production. A public launch is coming.</p>
              <div className="mt-6"><PrimaryButton href="/marketing?service=FireYourEditor%20Early%20Access">Get early access to FireYourEditor</PrimaryButton></div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 font-mono text-sm">
              <div className="flex items-center gap-2 text-white/40"><Wand2 size={14} /> fireyoureditor prompt</div>
              <p className="mt-2 text-white/85">&quot;10-minute explainer on why most D2C brands fail in year two. Founder talking head, b-roll, chapter cards, my usual style.&quot;</p>
              <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs">
                {["Script & structure", "Cuts & pacing", "B-roll & graphics", "Captions & sync", "Your house style"].map((step) => (
                  <div key={step} className="flex items-center justify-between"><span className="text-white/60">{step}</span><Check size={14} className="text-[#3ddc84]" /></div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 rounded bg-[#e2365b] px-3 py-2 text-xs font-bold"><Youtube size={14} /> 10:24 · ready to publish</div>
            </div>
          </div>
        </section>
      </Reveal>
    </PublisherLayout>
  );
}
