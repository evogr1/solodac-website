import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink px-5 text-paper selection:bg-lime selection:text-ink">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="mb-6 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-white/45"><span className="h-px w-10 bg-coral" /> Signal lost <span className="h-px w-10 bg-coral" /></div>
          <h1 className="font-display text-8xl font-black leading-none tracking-[-0.05em] text-lime sm:text-9xl">404</h1>
          <h2 className="mt-6 font-display text-3xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">This page ghosted us.</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">Wrong link, old bookmark, or you're just poking around. Either way, there's nothing here. Unlike everything else we make, this page did not earn your attention.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/" className="group flex items-center gap-3 rounded-full bg-lime px-6 py-4 text-sm font-black text-ink transition-all hover:-translate-y-1 hover:bg-[#d8ff2f]">Take me home <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
          <button onClick={() => setLocation("/eyeballs")} className="text-xs font-bold uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-lime">Or just book a call, we won't judge</button>
        </motion.div>
      </div>
    </main>
  );
}
