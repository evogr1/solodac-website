import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { services } from "../lib/services";

export default function Services() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="services" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
        <section className="signal-section relative z-10 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> What we do</div>
                <h1 className="max-w-3xl font-display text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">Pick one.<br /><span className="text-white/35">Or hand us all six.</span></h1>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-white/50">Some clients need one thing done well. Others want the whole engine running. Both work.</p>
            </Reveal>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isExpanded = expandedService === service.number;
                const isPaper = service.color === "paper";
                return <Reveal key={service.number} delay={(index % 3) * 0.08}><article role="link" tabIndex={0} onClick={() => setLocation(`/services/${service.slug}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setLocation(`/services/${service.slug}`); }} className={`signal-card group relative min-h-[330px] cursor-pointer overflow-hidden rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/20 ${isPaper ? "bg-paper text-ink" : "bg-white/[0.045]"}`}>
                  <div className="flex items-start justify-between"><span className={`font-mono text-xs ${isPaper ? "text-ink/45" : "text-white/35"}`}>{service.number}</span><div className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-12 ${service.color === "lime" ? "bg-lime text-ink" : service.color === "blue" ? "bg-blue-400 text-ink" : service.color === "coral" ? "bg-coral text-ink" : isPaper ? "bg-ink text-paper" : service.color === "violet" ? "bg-violet-400 text-ink" : "bg-orange-300 text-ink"}`}><Icon size={18} /></div></div>
                  <div className="absolute bottom-6 left-6 right-6"><h3 className="max-w-[280px] font-display text-3xl font-black leading-[0.95] tracking-[-0.06em]">{service.title}</h3><p className={`mt-4 max-w-[330px] text-sm leading-relaxed ${isPaper ? "text-ink/60" : "text-white/55"}`}>{service.description}</p><div className={`grid transition-all duration-300 ${isExpanded ? "mt-4 max-h-48 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}><p className={`text-sm leading-relaxed ${isPaper ? "text-ink/70" : "text-white/65"}`}>{service.more}</p><p className={`mt-3 text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] ${isPaper ? "text-ink/45" : "text-lime/80"}`}>{service.includes}</p></div><div className="mt-5 flex items-center justify-between gap-3"><div className={`flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-[0.14em] ${isPaper ? "text-ink/45" : "text-white/35"}`}>{service.tags.map((tag) => <span key={tag} className="rounded-full border border-current px-2 py-1">{tag}</span>)}</div><button type="button" onClick={(event) => { event.stopPropagation(); setExpandedService(isExpanded ? null : service.number); }} aria-expanded={isExpanded} className={`flex shrink-0 items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] transition-colors ${isPaper ? "text-ink hover:text-coral" : "text-lime hover:text-white"}`}>{isExpanded ? "Less" : "Read more"}<ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} /></button></div></div>
                  <ArrowUpRight size={18} className="absolute right-6 top-[82px] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                </article></Reveal>;
              })}
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-coral px-5 py-16 text-ink sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Not sure which one you need? That's what the call is for.</h2>
            <button onClick={() => setLocation("/eyeballs")} className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1">Book a call <ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
          </div>
        </section>

        <footer className="relative z-10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-end">
            <div>
              <button onClick={() => setLocation("/")} className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span><span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span></button>
              <p className="mt-3 text-xs text-white/40">Digital media, content & growth.</p>
            </div>
            <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              <button onClick={() => setLocation("/network")} className="hover:text-lime">Network</button>
              <button onClick={() => setLocation("/approach")} className="hover:text-lime">Approach</button>
              <button onClick={() => setLocation("/eyeballs")} className="hover:text-lime">Contact</button>
              <span>© 2026</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
