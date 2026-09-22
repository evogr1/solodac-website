import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";

const beliefs = [
  { number: "01", text: "Attention is earned per second, not booked per quarter. If people can leave, assume they will. Every three seconds you keep them is a small win." },
  { number: "02", text: "Consistency beats a viral hit you can't repeat. One lucky post is a fluke. A system that works every week is a business." },
  { number: "03", text: "If you can't measure it, you're guessing with a bigger budget. Vanity metrics are just guesses wearing a suit." },
];

export default function Thesis() {
  useScrollToTop();
  const [, setLocation] = useLocation();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="thesis" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
        <section className="signal-section relative z-10 border-b border-white/10 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[900px]">
            <Reveal>
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Our thesis</div>
              <h1 className="font-display text-5xl font-black leading-[0.92] tracking-[-0.06em] sm:text-7xl">Most content marketing fails for one boring reason: nobody wanted to watch it in the first place.</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">Not a targeting problem. Not an algorithm problem. A "we made something nobody asked for" problem. Everything we build starts from the opposite question: would a stranger stop scrolling for this, with nothing riding on it?</p>
            </Reveal>

            <div className="mt-16 divide-y divide-white/10 border-t border-white/10">
              {beliefs.map((belief, index) => (
                <Reveal key={belief.number} delay={0.06 * index}>
                  <div className="flex gap-6 py-8 first:pt-8 sm:gap-10">
                    <span className="font-display text-3xl font-black text-lime/70">{belief.number}</span>
                    <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">{belief.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-coral px-5 py-16 text-ink sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Agree with this? Let&apos;s talk.</h2>
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
              <Link href="/approach" className="hover:text-lime">About</Link>
              <Link href="/eyeballs" className="hover:text-lime">Contact</Link>
              <span>© 2026</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
