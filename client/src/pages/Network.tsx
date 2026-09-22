import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";

const ownedHandles = ["@millionairesformula", "@successfularcs", "@archiveofceos", "@businessedgex", "@bourseindia", "@virodhindia", "@lucreindia", "@howaitechworks", "@explorenow.ai"];
const extendedHandles = ["@archiveofoceans", "@ceosformula", "@krefion", "@motivation_hustling", "@themillionairemagnate", "@powerbymindset", "@bizknock"];
const demographicBreakdown = [
  { label: "Followers", value: "15.4M" },
  { label: "Newsletter subs", value: "101K" },
  { label: "Annual views", value: "18.2B+" },
  { label: "Accounts reached", value: "121M" },
  { label: "Interactions", value: "89.6M" },
];

export default function Network() {
  useScrollToTop();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="network" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
        <section className="signal-section relative z-10 overflow-hidden border-b border-white/10 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
          <div className="absolute -right-24 top-16 h-80 w-80 rounded-full border-[28px] border-lime/10" />
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-14 max-w-2xl">
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> The SoloDac network</div>
              <h1 className="font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">We don&apos;t rent the audience.<br /><span className="text-white/35">We own it.</span></h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/55">Sixteen pages, one network, no ad spend required to get in front of people across business, finance, motivation, and culture.</p>
            </Reveal>

            <Reveal delay={0.08} className="grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
              <div>
                <div className="font-display text-8xl font-black leading-none tracking-[-0.04em] text-lime">{ownedHandles.length + extendedHandles.length}</div>
                <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-white/55">Instagram pages we run directly or partner with. Every handle below is real and live. Click through, we dare you.</p>
              </div>
              <div className="flex flex-wrap content-start gap-2">
                {ownedHandles.map((handle) => <a key={handle} href={`https://www.instagram.com/${handle.slice(1)}/`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full border border-lime/40 bg-lime/[0.06] px-3 py-2 text-xs font-bold text-white/80 transition-all hover:-translate-y-0.5 hover:border-lime hover:text-lime">{handle}<ArrowUpRight size={12} /></a>)}
                {extendedHandles.map((handle) => <a key={handle} href={`https://www.instagram.com/${handle.slice(1)}/`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full border border-blue-300/30 bg-blue-300/[0.05] px-3 py-2 text-xs font-bold text-white/70 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-200">{handle}<ArrowUpRight size={12} /></a>)}
              </div>
            </Reveal>

            <Reveal delay={0.16} className="mt-16 border-y border-white/10 py-8">
              <div className="flex flex-wrap justify-between gap-x-10 gap-y-8">
                {demographicBreakdown.map((item) => <div key={item.label}><div className="font-display text-3xl font-black tracking-[-0.04em] sm:text-5xl">{item.value}</div><div className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45 sm:text-[11px]">{item.label}</div></div>)}
              </div>
              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/45">The extended network adds 45 more partner pages on top of that: another 17.1M followers and 15B+ annual views we can put a campaign in front of.</p>
            </Reveal>
          </div>
        </section>

        <section className="relative z-10 bg-coral px-5 py-16 text-ink sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Want your brand in front of 121M accounts? Yeah, thought so.</h2>
            <Link href="/eyeballs" className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1">Book a call <ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
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
              <Link href="/approach" className="hover:text-lime">Approach</Link>
              <Link href="/eyeballs" className="hover:text-lime">Contact</Link>
              <span>© 2026</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
