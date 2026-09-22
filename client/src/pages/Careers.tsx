import { ArrowUpRight, Coffee, Ghost, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";

const perksWeHaventDecidedYet = [
  { icon: Coffee, text: "Unlimited coffee (once we get a coffee machine)" },
  { icon: PartyPopper, text: "A ping pong table, allegedly" },
  { icon: Ghost, text: "Zero meetings that could've been a DM" },
];

export default function Careers() {
  useScrollToTop();
  const [, setLocation] = useLocation();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="careers" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
        <section className="signal-section relative z-10 overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
            animate={{ opacity: 1, rotate: -6, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="absolute -right-16 top-28 hidden rounded-3xl border border-lime/30 bg-lime/10 px-6 py-4 sm:block"
          >
            <span className="font-display text-2xl font-black tracking-[-0.04em] text-lime">👀 hiring soon?</span>
          </motion.div>

          <div className="mx-auto max-w-[1000px]">
            <Reveal>
              <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Careers</div>
              <h1 className="max-w-2xl font-display text-6xl font-black leading-[0.9] tracking-[-0.07em] sm:text-8xl">Job posts:<br /><span className="text-white/35">coming soon™.</span></h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-white/60">We&apos;re a small team that&apos;s currently too busy actually doing the work to write a careers page about it. Ironic, we know — we make content for a living.</p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/45">When we do open something up, it&apos;ll land here first — not a job board, not LinkedIn, here. Bookmark this page if you&apos;re into that kind of commitment.</p>
            </Reveal>

            <Reveal delay={0.18} className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-10">
              <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Perks we haven&apos;t officially decided on yet</div>
              <div className="space-y-4">
                {perksWeHaventDecidedYet.map((perk) => (
                  <div key={perk.text} className="flex items-center gap-3 text-sm font-medium text-white/70">
                    <perk.icon size={18} className="shrink-0 text-lime" />
                    {perk.text}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.26} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-white/45">Think you should be first in line anyway?</p>
              <button onClick={() => setLocation("/eyeballs")} className="group flex shrink-0 items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-all hover:border-lime hover:text-lime">Say hi anyway <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
            </Reveal>
          </div>
        </section>

        <footer className="relative z-10 border-t border-white/10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-end">
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
