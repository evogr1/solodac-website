import { ArrowUpRight, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";

export default function Testimonials() {
  useScrollToTop();
  const [, setLocation] = useLocation();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="testimonials" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
        <section className="signal-section relative z-10 border-b border-white/10 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[900px] text-center">
            <Reveal>
              <div className="mb-6 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Testimonials <span className="h-px w-10 bg-lime" /></div>
              <h1 className="font-display text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl">This page is embarrassingly empty.</h1>
              <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-white/60">We could invent some glowing quotes from &quot;Sarah K., Marketing Director.&quot; We&apos;re not going to. We&apos;re new enough that our best testimonials haven&apos;t happened yet.</p>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="mx-auto mt-14 max-w-md rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-8 text-left"
            >
              <Quote size={28} className="text-lime/50" />
              <p className="mt-4 font-display text-2xl font-black leading-tight tracking-[-0.02em] text-white/40">&quot;[Your name could go here. No pressure.]&quot;</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/30">A future client, probably</p>
            </motion.div>

            <Reveal delay={0.25}>
              <p className="mt-10 text-sm leading-relaxed text-white/45">Work with us, get a result you&apos;re happy about, and this page writes itself. Until then, check the <Link href="/case-studies" className="text-lime hover:underline">case studies</Link> for the honest, real-time version of &quot;coming soon.&quot;</p>
            </Reveal>
          </div>
        </section>

        <section className="relative z-10 bg-coral px-5 py-16 text-ink sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Be the first quote on this page.</h2>
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
