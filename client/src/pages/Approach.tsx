import { ArrowDownRight, ArrowUpRight, Bot, Code2, Globe2, Instagram, Layers3, X, Youtube } from "lucide-react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";

export default function Approach() {
  useScrollToTop();
  const [, setLocation] = useLocation();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="approach" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
        <section className="signal-section relative z-10 overflow-hidden bg-[#d9ff3f] pb-20 pt-32 text-ink sm:pt-40 lg:pb-28">
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full border-[38px] border-ink/10 sm:h-96 sm:w-96" />
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12">
            <Reveal><div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/50"><span className="h-px w-10 bg-ink/45" /> How we work</div><h1 className="max-w-lg font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">Less noise.<br />More <span className="text-coral">signal.</span></h1></Reveal>
            <div className="relative z-10 divide-y divide-ink/20">
              {["Find the real story", "Build the system", "Make it travel"].map((title, index) => <Reveal key={title} delay={index * 0.08}><div className="group flex gap-6 py-6 first:pt-0 last:pb-0 sm:gap-10"><span className="font-mono text-xs text-ink/50">0{index + 1}</span><div className="flex-1"><h3 className="font-display text-3xl font-black tracking-[-0.06em] sm:text-4xl">{title}</h3><p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/65">{index === 0 ? "Every business has one thing that's actually true and interesting about it. We find that — not whatever trend is working for everyone else this month." : index === 1 ? "Content, channels, creative, tracking, built as one system your team can keep running after we hand it off — not a pile of one-off posts." : "We publish, watch what happens, cut what isn't working, and push on what is — until the work shows up where your audience already spends time."}</p></div><ArrowDownRight className="mt-1 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1" /></div></Reveal>)}
            </div>
          </div>
        </section>

        <section id="case-studies" className="signal-section relative z-10 border-b border-white/10 bg-[#151a19] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Selected work</div><h2 className="font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">Proof,<br /><span className="text-white/35">not promises.</span></h2></div><p className="max-w-sm text-sm leading-relaxed text-white/50">This spot is for real client numbers, not filler. It fills in as soon as a project wraps — not before.</p></Reveal>
            <div className="grid gap-3 lg:grid-cols-2">
              <article className="signal-card group relative min-h-[360px] overflow-hidden rounded-3xl border border-lime/30 bg-lime/[0.08] p-7 transition-all hover:-translate-y-1 hover:border-lime/70 sm:p-10"><div className="absolute -right-14 -top-14 h-52 w-52 rounded-full border-[24px] border-lime/20 transition-transform duration-500 group-hover:scale-125" /><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Case study 01 / AI</span><Bot className="text-lime" size={22} /></div><div><div className="mb-4 font-mono text-xs text-white/35">CLIENT / COMING SOON™</div><h3 className="max-w-md font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">One idea.<br /><span className="text-lime">A dozen good uses.</span></h3><p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">Articles, captions, website copy, and repurposed content that all sound like the same brand wrote them — because one workflow did, with a real editor checking every piece.</p><button type="button" onClick={() => toast.info("This one's still marinating. Check back once we've got a client to brag about.")} className="mt-7 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-lime">Add case details <ArrowUpRight size={15} /></button></div></div></article>
              <article className="signal-card group relative min-h-[360px] overflow-hidden rounded-3xl border border-blue-300/30 bg-blue-300/[0.08] p-7 transition-all hover:-translate-y-1 hover:border-blue-200/70 sm:p-10"><div className="absolute -bottom-20 -right-10 h-64 w-64 rotate-12 border-[28px] border-blue-300/15 transition-transform duration-500 group-hover:rotate-45" /><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">Case study 02 / Web</span><Code2 className="text-blue-200" size={22} /></div><div><div className="mb-4 font-mono text-xs text-white/35">CLIENT / COMING SOON™</div><h3 className="max-w-md font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">A digital home<br /><span className="text-blue-200">built to move.</span></h3><p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">A site and landing pages built around one job: make the offer obvious and the next click impossible to miss.</p><button type="button" onClick={() => toast.info("Plot twist: we haven't built this one yet. It's coming.")} className="mt-7 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-blue-200">Add case details <ArrowUpRight size={15} /></button></div></div></article>
            </div>
          </div>
        </section>

        <section className="signal-section relative z-10 bg-paper px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <Reveal><div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/45"><span className="h-px w-10 bg-coral" /> Where we show up</div><h2 className="max-w-3xl font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-8xl">Your next customer is mid-scroll <span className="text-coral">right now.</span></h2></Reveal>
              <Reveal delay={0.1} className="signal-card rounded-3xl bg-ink p-6 text-paper sm:p-8"><div className="mb-10 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">The channel mix</span><Layers3 size={19} className="text-lime" /></div><div className="space-y-5"><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><Instagram size={18} className="text-pink-400" /> Instagram</span><span className="text-xs text-white/45">Stories · Reels · Community</span></div><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><Youtube size={18} className="text-red-400" /> YouTube</span><span className="text-xs text-white/45">Shorts · Long-form · Growth</span></div><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><X size={18} /> X / Twitter</span><span className="text-xs text-white/45">Threads · Launches · Voice</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-3 font-bold"><Globe2 size={18} className="text-blue-300" /> Web</span><span className="text-xs text-white/45">Search · UX · Conversion</span></div></div></Reveal>
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-coral px-5 py-16 text-ink sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Ready to build the system?</h2>
            <button onClick={() => setLocation("/eyeballs")} className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1">Book a call <ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
          </div>
        </section>

        <footer className="relative z-10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-end">
            <div>
              <Link href="/" className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span><span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span></Link>
              <p className="mt-3 text-xs text-white/40">Digital media, content & growth.</p>
            </div>
            <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              <Link href="/services" className="hover:text-lime">Services</Link>
              <Link href="/network" className="hover:text-lime">Network</Link>
              <Link href="/eyeballs" className="hover:text-lime">Contact</Link>
              <span>© 2026</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
