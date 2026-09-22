import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";
import heroImage from "../assets/solodac-signal.jpg";

const exploreLinks = [
  { href: "/services", eyebrow: "01", title: "Services", description: "Six things we do. Pick one or hand us the whole engine." },
  { href: "/network", eyebrow: "02", title: "Network", description: "16 pages, real audiences, no ad spend required." },
  { href: "/approach", eyebrow: "03", title: "Approach", description: "How we work, and the proof it holds up." },
];

export default function Home() {
  useScrollToTop();
  const [, setLocation] = useLocation();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="top" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">

      <section id="top" className="relative z-10 w-full overflow-hidden bg-[#0d0f0f]">
        <motion.img
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          src={heroImage}
          alt="SoloDac signal artwork"
          className="hero-art block h-[58svh] min-h-[430px] w-full object-cover object-[70%_center] sm:h-auto sm:min-h-0 sm:object-center"
        />
        <Reveal delay={0.2} className="border-y border-dotted border-white/20 bg-[#0d0f0f] px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-x-10 gap-y-8">
            {[
              { value: "15.4M", label: "Followers" },
              { value: "101K", label: "Newsletter subs" },
              { value: "18.2B+", label: "Annual views" },
              { value: "121M", label: "Accounts reached" },
              { value: "89.6M", label: "Interactions" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-black tracking-[-0.04em] text-paper sm:text-5xl">{stat.value}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45 sm:text-[11px]">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-white/45">The extended network adds 45 more partner pages on top of that — another 17.1M followers and 15B+ annual views we can put a campaign in front of.</p>
        </Reveal>
      </section>

      <section className="signal-section relative z-10 border-y border-ink/10 bg-paper text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12 lg:py-28">
          <Reveal>
            <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/45"><span className="h-px w-10 bg-coral" /> What we believe</div>
            <h1 className="max-w-md font-display text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">If it doesn&apos;t move, it doesn&apos;t count.</h1>
          </Reveal>
          <Reveal delay={0.1} className="max-w-3xl">
            <p className="text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">Most brands publish and hope. We&apos;d rather publish, watch what actually gets <span className="text-coral">watched</span>, and do more of that — until being easy to find turns into being hard to forget.</p>
          </Reveal>
        </div>
      </section>

      <section className="signal-section relative z-10 bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-12">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Where to next</div>
            <h2 className="max-w-2xl font-display text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">Three pages. Everything you need to know.</h2>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-3">
            {exploreLinks.map((item, index) => (
              <Reveal key={item.href} delay={index * 0.08}>
                <Link href={item.href} className="group block min-h-[220px] rounded-3xl border border-white/10 bg-white/[0.045] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-lime/50 hover:bg-white/[0.08]">
                  <div className="flex items-start justify-between"><span className="font-mono text-xs text-white/35">{item.eyebrow}</span><ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                  <h3 className="mt-10 font-display text-3xl font-black tracking-[-0.06em]">{item.title}</h3>
                  <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-white/55">{item.description}</p>
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
