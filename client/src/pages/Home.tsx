import { ArrowUpRight, Flame } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { Link, useLocation } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useEffect, useState } from "react";
import heroImage from "../assets/solodac-signal.jpg";

const exploreLinks = [
  { href: "/services", eyebrow: "01", title: "Services", description: "Six things we do. Pick one, or hand us the whole engine.", stat: "6", statLabel: "services" },
  { href: "/network", eyebrow: "02", title: "Network", description: "Sixteen pages we already own. No ad spend required to reach them.", stat: "16", statLabel: "pages" },
  { href: "/approach", eyebrow: "03", title: "Approach", description: "How we actually work, and the proof it holds up.", stat: "3", statLabel: "steps" },
];

export default function Home() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const parallaxX = useSpring(useMotionValue(0), { stiffness: 45, damping: 20, mass: 0.7 });
  const parallaxY = useSpring(useMotionValue(0), { stiffness: 45, damping: 20, mass: 0.7 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updatePointerCapability = () => setFinePointer(mediaQuery.matches);
    updatePointerCapability();
    mediaQuery.addEventListener("change", updatePointerCapability);
    return () => mediaQuery.removeEventListener("change", updatePointerCapability);
  }, []);

  const parallaxEnabled = finePointer && !prefersReducedMotion;

  const handleHeroPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!parallaxEnabled || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    parallaxX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 24);
    parallaxY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 16);
  };

  const resetHeroParallax = () => {
    if (!parallaxEnabled) return;
    parallaxX.set(0);
    parallaxY.set(0);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="top" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">

      <section id="top" onPointerMove={handleHeroPointerMove} onPointerLeave={resetHeroParallax} className="relative z-10 min-h-[85svh] w-full overflow-hidden bg-[#0d0f0f] sm:min-h-[92vh]">
        <motion.div style={{ x: parallaxX, y: parallaxY }} className="absolute -inset-[2%] will-change-transform">
          <motion.img
            initial={{ opacity: 0, scale: 1.04 }}
            animate={prefersReducedMotion ? { opacity: 1, scale: 1.04 } : { opacity: 1, scale: [1.04, 1.07, 1.04], y: [0, -7, 0] }}
            transition={prefersReducedMotion ? { duration: 0.01 } : { opacity: { duration: 0.9, ease: [0.23, 1, 0.32, 1] }, scale: { duration: 14, repeat: Infinity, ease: "easeInOut" }, y: { duration: 9, repeat: Infinity, ease: "easeInOut" } }}
            src={heroImage}
            alt="SoloDac signal artwork"
            className="hero-art h-full w-full object-cover object-[70%_center] sm:object-center"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/70 to-transparent sm:h-64" />

        <Reveal delay={0.25} className="absolute inset-x-0 top-[88px] px-5 sm:top-[108px] sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-4">
            <div className="flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-coral">
              <Flame size={12} className="animate-pulse" />
              Q4 booking is open, 3 campaign slots left
            </div>
            <p className="max-w-sm text-sm leading-snug text-white/70 sm:max-w-md sm:text-base">
              Every brand sitting on Q4 budget is about to spend it somewhere. Be the thing they see before the quarter closes, not after.
            </p>
            <button
              onClick={() => setLocation("/eyeballs")}
              className="group flex items-center gap-2 rounded-full bg-lime px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5 sm:text-sm"
            >
              Lock in your Q4 slot <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </Reveal>

      </section>

      <section className="relative z-10 border-y border-white/15 bg-ink px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <Reveal>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {[
              { value: "18.2B+", label: "Annual views" },
              { value: "121M", label: "Accounts reached" },
              { value: "89.6M", label: "Interactions" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`flex items-center gap-4 sm:flex-col sm:items-start sm:gap-2 ${index > 0 ? "sm:border-l sm:border-white/15 sm:pl-6" : ""}`}
              >
                <span className="font-display text-4xl font-black tracking-[-0.04em] text-paper sm:text-5xl lg:text-6xl">{stat.value}</span>
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45 sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="signal-section relative z-10 border-y border-ink/10 bg-paper text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12 lg:py-28">
          <Reveal>
            <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/45"><span className="h-px w-10 bg-coral" /> What we believe</div>
            <h1 className="max-w-md font-display text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">If it doesn&apos;t move, it doesn&apos;t count.</h1>
          </Reveal>
          <Reveal delay={0.1} className="max-w-3xl">
            <p className="text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">Most brands publish and hope. We&apos;d rather publish, watch what actually gets <span className="text-coral">watched</span>, and do more of that, until being easy to find turns into being hard to forget.</p>
          </Reveal>
        </div>
      </section>

      <section className="signal-section relative z-10 bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Where to next</div>
              <h2 className="max-w-2xl font-display text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">Nothing here is filler. Pick a page.</h2>
            </div>
            <p className="max-w-xs text-sm text-white/40">No fifteen-tab menu to dig through. Three things, and each one earns its own page.</p>
          </Reveal>
          <div className="mt-10 border-t border-white/10">
            {exploreLinks.map((item, index) => (
              <Reveal key={item.href} delay={index * 0.06}>
                <Link
                  href={item.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-white/10 py-8 transition-colors hover:bg-white/[0.03] sm:grid-cols-[auto_1fr_auto_auto] sm:gap-10 sm:px-4"
                >
                  <span className="font-mono text-xs text-white/30">{item.eyebrow}</span>
                  <div>
                    <h3 className="font-display text-3xl font-black tracking-[-0.05em] transition-colors group-hover:text-lime sm:text-5xl">{item.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/50">{item.description}</p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <div className="font-display text-3xl font-black tracking-[-0.04em] text-white/80">{item.stat}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">{item.statLabel}</div>
                  </div>
                  <ArrowUpRight size={22} className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-coral px-5 py-16 text-ink sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Have a good problem to solve?</h2>
          <button onClick={() => setLocation("/eyeballs")} className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1">Book a call <ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
        </div>
      </section>

      <footer className="relative z-10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span><span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span></div><p className="mt-3 text-xs text-white/40">Digital media, content & growth.</p></div><div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40"><Link href="/services" className="hover:text-lime">Services</Link><Link href="/network" className="hover:text-lime">Network</Link><Link href="/approach" className="hover:text-lime">Approach</Link><button onClick={() => setLocation("/eyeballs")} className="hover:text-lime">Contact</button><span>© 2026</span></div></div>
      </footer>
      </main>
    </>
  );
}
