import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  ChevronDown,
  Code2,
  Globe2,
  Instagram,
  Layers3,
  MoveRight,
  Play,
  Sparkles,
  Target,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLocation } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { services } from "../lib/services";
import heroImage from "../assets/solodac-signal.jpg";

const ownedHandles = ["@millionairesformula", "@successfularcs", "@archiveofceos", "@businessedgex", "@bourseindia", "@virodhindia", "@lucreindia", "@howaitechworks", "@explorenow.ai"];
const extendedHandles = ["@archiveofoceans", "@ceosformula", "@krefion", "@motivation_hustling", "@themillionairemagnate", "@powerbymindset", "@bizknock"];
const demographicBreakdown = [
  { label: "Followers", value: "15.4M", note: "Our Network — total followers across owned pages." },
  { label: "Newsletter subs", value: "101K", note: "Our Network — subscribed newsletter audience." },
  { label: "Annual views", value: "18.2B+", note: "Our Network — total annual content views." },
  { label: "Accounts reached", value: "121M", note: "Our Network — unique accounts reached." },
  { label: "Interactions", value: "89.6M", note: "Our Network — total audience interactions." },
  { label: "Top AI & tech pages", value: "45", note: "Extended Network — partner pages in the network." },
  { label: "Extended followers", value: "17.1M", note: "Extended Network — total followers across partner pages." },
  { label: "Extended newsletter subs", value: "2.3M", note: "Extended Network — subscribed newsletter audience." },
  { label: "Extended annual views", value: "15B+", note: "Extended Network — total annual content views." },
  { label: "Extended accounts reached", value: "100M", note: "Extended Network — unique accounts reached." },
];

export default function Home() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sectionIds = ["top", "services", "network", "approach"];
    const updateActiveSection = () => {
      const marker = window.scrollY + 150;
      let current = "top";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection={activeSection} />
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
      </section>

      <section className="signal-section relative z-10 border-y border-ink/10 bg-paper text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12 lg:py-28">
          <Reveal>
            <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/45"><span className="h-px w-10 bg-coral" /> What we believe</div>
            <h2 className="max-w-md font-display text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">If it doesn&apos;t move, it doesn&apos;t count.</h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-3xl">
            <p className="text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">Most brands publish and hope. We&apos;d rather publish, watch what actually gets <span className="text-coral">watched</span>, and do more of that — until being easy to find turns into being hard to forget.</p>
          </Reveal>
        </div>
      </section>

      <section id="network" className="signal-section relative z-10 overflow-hidden border-b border-white/10 bg-[#151a19] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute -right-24 top-16 h-80 w-80 rounded-full border-[28px] border-lime/10" />
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-14 max-w-2xl"><div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> The SoloDac network</div><h2 className="font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">We don&apos;t rent the audience.<br /><span className="text-white/35">We own it.</span></h2><p className="mt-7 max-w-xl text-base leading-relaxed text-white/55">Fifteen pages, one network, no ad spend required to get in front of people — across business, finance, motivation, and culture.</p></Reveal>
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="signal-card rounded-3xl border border-lime/35 bg-lime/[0.07] p-6 sm:p-8"><div className="mb-8 flex items-start justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">01 / Owned network</div><div className="mt-3 font-display text-4xl font-black tracking-[-0.07em]">{ownedHandles.length} owned pages.</div></div><Instagram size={22} className="text-lime" /></div><div className="grid gap-2 sm:grid-cols-2">{ownedHandles.map((handle) => <a key={handle} href={`https://www.instagram.com/${handle.slice(1)}/`} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-white/10 bg-ink/20 px-3 py-3 text-sm font-bold text-white/75 transition-all hover:-translate-y-0.5 hover:border-lime hover:text-lime"><span>{handle}</span><ArrowUpRight size={14} /></a>)}</div></div>
            <div className="signal-card rounded-3xl border border-blue-300/30 bg-blue-300/[0.07] p-6 sm:p-8"><div className="mb-8 flex items-start justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">02 / Extended network</div><div className="mt-3 font-display text-4xl font-black tracking-[-0.07em]">6 extended pages.</div></div><Globe2 size={22} className="text-blue-200" /></div><div className="grid gap-2 sm:grid-cols-2">{extendedHandles.map((handle) => <a key={handle} href={`https://www.instagram.com/${handle.slice(1)}/`} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-white/10 bg-ink/20 px-3 py-3 text-sm font-bold text-white/75 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-200"><span>{handle}</span><ArrowUpRight size={14} /></a>)}</div></div>
          </div>
          <div className="signal-card mt-3 rounded-3xl border border-coral/30 bg-coral/[0.07] p-6 sm:p-8"><div className="mb-8 flex items-start justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral">03 / Network reach</div><div className="mt-3 font-display text-4xl font-black tracking-[-0.07em]">Reach, at a glance.</div></div><Target size={22} className="text-coral" /></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{demographicBreakdown.map((item) => <div key={item.label} className="rounded-2xl border border-white/10 bg-ink/20 p-4"><div className="text-[10px] font-bold uppercase tracking-[0.16em] text-coral">{item.label}</div><div className="mt-3 font-display text-2xl font-black tracking-[-0.05em]">{item.value}</div><p className="mt-2 text-xs leading-relaxed text-white/45">{item.note}</p></div>)}</div></div>
        </div>
      </section>

      <section id="services" className="signal-section relative z-10 bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> What we do</div>
              <h2 className="max-w-3xl font-display text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">Pick one.<br /><span className="text-white/35">Or hand us all six.</span></h2>
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

      <section id="case-studies" className="signal-section relative z-10 border-t border-white/10 bg-[#151a19] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]"><Reveal className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Selected work</div><h2 className="font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">Proof,<br /><span className="text-white/35">not promises.</span></h2></div><p className="max-w-sm text-sm leading-relaxed text-white/50">This spot is for real client numbers, not filler. It fills in as soon as a project wraps — not before.</p></Reveal><div className="grid gap-3 lg:grid-cols-2"><article className="signal-card group relative min-h-[360px] overflow-hidden rounded-3xl border border-lime/30 bg-lime/[0.08] p-7 transition-all hover:-translate-y-1 hover:border-lime/70 sm:p-10"><div className="absolute -right-14 -top-14 h-52 w-52 rounded-full border-[24px] border-lime/20 transition-transform duration-500 group-hover:scale-125" /><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Case study 01 / AI</span><Bot className="text-lime" size={22} /></div><div><div className="mb-4 font-mono text-xs text-white/35">CLIENT / TO BE ADDED</div><h3 className="max-w-md font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">One idea.<br /><span className="text-lime">A dozen good uses.</span></h3><p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">Articles, captions, website copy, and repurposed content that all sound like the same brand wrote them — because one workflow did, with a real editor checking every piece.</p><button type="button" onClick={() => toast.info("Add this AI content case study when the client details are ready.")} className="mt-7 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-lime">Add case details <ArrowUpRight size={15} /></button></div></div></article><article className="signal-card group relative min-h-[360px] overflow-hidden rounded-3xl border border-blue-300/30 bg-blue-300/[0.08] p-7 transition-all hover:-translate-y-1 hover:border-blue-200/70 sm:p-10"><div className="absolute -bottom-20 -right-10 h-64 w-64 rotate-12 border-[28px] border-blue-300/15 transition-transform duration-500 group-hover:rotate-45" /><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">Case study 02 / Web</span><Code2 className="text-blue-200" size={22} /></div><div><div className="mb-4 font-mono text-xs text-white/35">CLIENT / TO BE ADDED</div><h3 className="max-w-md font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">A digital home<br /><span className="text-blue-200">built to move.</span></h3><p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">A site and landing pages built around one job: make the offer obvious and the next click impossible to miss.</p><button type="button" onClick={() => toast.info("Add this web development case study when the project details are ready.")} className="mt-7 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-blue-200">Add case details <ArrowUpRight size={15} /></button></div></div></article></div></div>
      </section>

      <section id="approach" className="signal-section relative z-10 overflow-hidden bg-[#d9ff3f] text-ink">
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full border-[38px] border-ink/10 sm:h-96 sm:w-96" />
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-28">
          <Reveal><div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/50"><span className="h-px w-10 bg-ink/45" /> How we work</div><h2 className="max-w-lg font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">Less noise.<br />More <span className="text-coral">signal.</span></h2></Reveal>
          <div className="relative z-10 divide-y divide-ink/20">
            {["Find the real story", "Build the system", "Make it travel"].map((title, index) => <Reveal key={title} delay={index * 0.08}><div className="group flex gap-6 py-6 first:pt-0 last:pb-0 sm:gap-10"><span className="font-mono text-xs text-ink/50">0{index + 1}</span><div className="flex-1"><h3 className="font-display text-3xl font-black tracking-[-0.06em] sm:text-4xl">{title}</h3><p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/65">{index === 0 ? "Every business has one thing that's actually true and interesting about it. We find that — not whatever trend is working for everyone else this month." : index === 1 ? "Content, channels, creative, tracking, built as one system your team can keep running after we hand it off — not a pile of one-off posts." : "We publish, watch what happens, cut what isn't working, and push on what is — until the work shows up where your audience already spends time."}</p></div><ArrowDownRight className="mt-1 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1" /></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="signal-section relative z-10 bg-paper px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal><div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/45"><span className="h-px w-10 bg-coral" /> Where we show up</div><h2 className="max-w-3xl font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-8xl">Your next customer is mid-scroll <span className="text-coral">right now.</span></h2></Reveal>
            <Reveal delay={0.1} className="signal-card rounded-3xl bg-ink p-6 text-paper sm:p-8"><div className="mb-10 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">The channel mix</span><Layers3 size={19} className="text-lime" /></div><div className="space-y-5"><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><Instagram size={18} className="text-pink-400" /> Instagram</span><span className="text-xs text-white/45">Stories · Reels · Community</span></div><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><Youtube size={18} className="text-red-400" /> YouTube</span><span className="text-xs text-white/45">Shorts · Long-form · Growth</span></div><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><X size={18} /> X / Twitter</span><span className="text-xs text-white/45">Threads · Launches · Voice</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-3 font-bold"><Globe2 size={18} className="text-blue-300" /> Web</span><span className="text-xs text-white/45">Search · UX · Conversion</span></div></div></Reveal>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span><span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span></div><p className="mt-3 text-xs text-white/40">Digital media, content & growth.</p></div><div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40"><a href="#services" className="hover:text-lime">Services</a><a href="#approach" className="hover:text-lime">Approach</a><button onClick={() => setLocation("/eyeballs")} className="hover:text-lime">Contact</button><span>© 2026</span></div></div>
      </footer>
      </main>
    </>
  );
}
