import { ArrowUpRight, Target, TrendingUp, Zap } from "lucide-react";
import { Link, useLocation } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";

const principles = [
  { icon: Zap, title: "Creative first", text: "The ad has to earn the click before the targeting even matters. We treat the hook like it's the whole job, because it basically is." },
  { icon: Target, title: "Kill fast, scale faster", text: "We know within days if a campaign's working, not weeks. Losers get cut before they burn real budget. Winners get more fuel, immediately." },
  { icon: TrendingUp, title: "One team, one number", text: "The people making the creative also watch the dashboard. No handoff, no blame game between the 'creative team' and the 'media team'. Just us." },
];

export default function Campaigns() {
  useScrollToTop();
  const [, setLocation] = useLocation();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="campaigns" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
        <section className="signal-section relative z-10 border-b border-white/10 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="max-w-2xl">
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Campaigns</div>
              <h1 className="font-display text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">Ads that get judged on revenue. Not reach.</h1>
              <p className="mt-7 text-lg leading-relaxed text-white/60">A dashboard full of impressions doesn&apos;t pay rent. Here&apos;s the short version of how we run paid.</p>
            </Reveal>

            <div className="mt-16 grid gap-3 md:grid-cols-3">
              {principles.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.045] p-7">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-lime text-ink"><item.icon size={18} /></div>
                    <h3 className="mt-6 font-display text-2xl font-black tracking-[-0.05em]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-16 rounded-3xl border border-lime/20 bg-lime/[0.05] p-8 sm:p-10">
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Where we run</div>
              <div className="flex flex-wrap gap-3">
                {["Meta ads", "Google ads", "Creative testing", "Conversion tracking", "Landing-page optimization"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/70">{tag}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative z-10 bg-coral px-5 py-16 text-ink sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Got a budget that needs a plan?</h2>
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
              <Link href="/services/performance-marketing" className="hover:text-lime">Performance marketing</Link>
              <Link href="/eyeballs" className="hover:text-lime">Contact</Link>
              <span>© 2026</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
