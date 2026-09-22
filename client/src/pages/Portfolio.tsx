import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";

const ownedHandles = ["@millionairesformula", "@successfularcs", "@archiveofceos", "@businessedgex", "@bourseindia", "@virodhindia", "@lucreindia", "@howaitechworks", "@explorenow.ai"];
const extendedHandles = ["@archiveofoceans", "@ceosformula", "@krefion", "@motivation_hustling", "@themillionairemagnate", "@powerbymindset", "@bizknock"];

export default function Portfolio() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const allHandles = [...ownedHandles, ...extendedHandles];

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="portfolio" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
        <section className="signal-section relative z-10 border-b border-white/10 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="max-w-2xl">
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Portfolio</div>
              <h1 className="font-display text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">Not a mockup. A live network.</h1>
              <p className="mt-7 text-lg leading-relaxed text-white/60">Most agencies show you a Figma file. We can show you {allHandles.length} channels that already exist, already post, and already have an audience. Tap any handle — it goes straight to the real profile.</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-14 flex flex-wrap gap-2">
              {allHandles.map((handle) => (
                <a key={handle} href={`https://www.instagram.com/${handle.slice(1)}/`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-white/80 transition-all hover:-translate-y-0.5 hover:border-lime hover:text-lime">
                  {handle}<ArrowUpRight size={13} />
                </a>
              ))}
            </Reveal>

            <Reveal delay={0.18} className="mt-14 max-w-xl text-sm leading-relaxed text-white/45">
              Prefer the numbers version? The <Link href="/network" className="text-lime hover:underline">network page</Link> has the follower counts, view totals, and everything else that turns "trust us" into "here's the receipts."
            </Reveal>
          </div>
        </section>

        <section className="relative z-10 bg-coral px-5 py-16 text-ink sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Want on the network?</h2>
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
