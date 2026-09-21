import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  ChevronDown,
  Clapperboard,
  Code2,
  Globe2,
  Instagram,
  Layers3,
  Menu,
  Megaphone,
  MoveRight,
  Play,
  Search,
  Sparkles,
  Target,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import heroImage from "../assets/solodac-signal.jpg";

export const services = [
  {
    number: "01",
    slug: "social-media-management",
    icon: Megaphone,
    title: "Social media systems",
    description:
      "Strategy, channel management, publishing, community care, and the operating rhythm that keeps a brand culturally present.",
    more:
      "Your brand should be present before your audience starts looking. SoloDac manages the complete social media engine—from strategy and content planning to publishing, community management, reporting, and ongoing optimization. We help brands build a recognizable presence across Instagram, YouTube, X, and other relevant channels.",
    includes: "Social strategy · Instagram management · YouTube channels · X / Twitter · Reels · Shorts · Community engagement · Reporting",
    tags: ["Instagram", "YouTube", "X / Twitter"],
    color: "lime",
  },
  {
    number: "02",
    slug: "content-production",
    icon: Clapperboard,
    title: "Content production",
    description:
      "Short-form, long-form, edits, shoots, and platform-native stories built to earn attention instead of filling a calendar.",
    more:
      "Ideas are only useful when they become something people want to watch. We produce platform-native content designed for attention, including short-form videos, long-form edits, social campaigns, branded stories, talking-head content, and creative formats built around your audience and channel.",
    includes: "Reels · Shorts · YouTube videos · Social campaigns · Video editing · Motion graphics · Scripts · Content repurposing",
    tags: ["Video", "Reels", "Campaigns"],
    color: "blue",
  },
  {
    number: "03",
    slug: "ai-content-generation",
    icon: Bot,
    title: "AI content studio",
    description:
      "Human-led AI workflows for articles, social captions, creative variations, research, and scalable content operations.",
    more:
      "Content that moves at the speed of your business. SoloDac uses human-led AI workflows to help brands create more content without losing their voice—from blog articles and website copy to social captions, campaign concepts, SEO content, and creative variations.",
    includes: "AI blog articles · Website copy · Social captions · SEO strategy · Campaign messaging · Brand voice · Repurposing",
    tags: ["AI workflows", "SEO content", "Brand voice"],
    color: "coral",
  },
  {
    number: "04",
    slug: "web-development",
    icon: Code2,
    title: "Web & digital builds",
    description:
      "Fast, responsive websites and landing pages that make your offer clearer, your brand sharper, and your next action obvious.",
    more:
      "A website should make your business easier to understand and easier to choose. SoloDac designs and builds responsive websites, landing pages, and digital experiences that combine clear messaging, strong visual identity, useful user experience, and conversion-focused structure.",
    includes: "Business websites · Landing pages · Campaign microsites · Portfolio sites · Redesigns · Mobile UX · SEO-ready structure",
    tags: ["Websites", "Landing pages", "UX"],
    color: "paper",
  },
  {
    number: "05",
    slug: "seo-search-visibility",
    icon: Search,
    title: "Search & visibility",
    description:
      "SEO, local search, Google Business Profile, and the content signals that help the right people find you at the right moment.",
    more:
      "Be easier to find when people are ready to act. We help businesses improve visibility across search engines, local search, Google Business Profile, and helpful content. The goal is not just more traffic—it is better-qualified attention.",
    includes: "SEO strategy · Keyword research · Local SEO · Google Business Profile · On-page SEO · SEO content · Reporting",
    tags: ["SEO", "Local search", "Google"],
    color: "violet",
  },
  {
    number: "06",
    slug: "performance-marketing",
    icon: Target,
    title: "Performance marketing",
    description:
      "Paid campaigns, creative testing, tracking, and iteration focused on useful outcomes—not vanity dashboards.",
    more:
      "Creative that earns attention. Campaigns that create action. SoloDac plans, launches, tracks, and improves paid campaigns across platforms such as Meta and Google, connecting creative production with measurement so campaigns improve over time.",
    includes: "Campaign strategy · Meta ads · Google ads · Creative testing · Conversion tracking · Targeting · Landing-page optimization",
    tags: ["Meta", "Google", "Reporting"],
    color: "orange",
  },
];

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

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
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

  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <header className="sticky top-2 z-50 bg-transparent px-2 pt-2 sm:top-3 sm:px-4 sm:pt-3">
        <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-3 rounded-full border border-white/10 bg-black/90 px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur-xl sm:min-h-[76px] sm:px-7 lg:px-10">
          <a href="#top" className="group flex items-center gap-3" aria-label="SoloDac home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-ink transition-transform duration-200 group-hover:rotate-12 sm:h-10 sm:w-10">
              <span className="h-3 w-3 rounded-full bg-ink sm:h-3.5 sm:w-3.5" />
            </span>
            <span className="font-display text-[1.35rem] font-black tracking-[-0.08em] sm:text-[1.7rem]">SoloDac</span>
          </a>

          <nav className="hidden items-center gap-1 rounded-full bg-white/[0.035] p-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 md:flex">
            <button onClick={() => navigate("services")} className={`pill-nav-link rounded-full px-4 py-3 ${activeSection === "services" ? "is-active" : ""}`}>Services</button>
            <button onClick={() => navigate("network")} className={`pill-nav-link rounded-full px-4 py-3 ${activeSection === "network" ? "is-active" : ""}`}>Network</button>
            <button onClick={() => navigate("approach")} className={`pill-nav-link rounded-full px-4 py-3 ${activeSection === "approach" ? "is-active" : ""}`}>Approach</button>
            <button onClick={() => setLocation("/eyeballs")} className="pill-nav-link rounded-full px-4 py-3">Contact</button>
          </nav>

          <button
            onClick={() => setLocation("/eyeballs")}
            className="hidden items-center gap-3 rounded-full border border-white/30 bg-white/[0.08] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-paper shadow-inner shadow-white/10 transition-all hover:border-lime hover:bg-lime hover:text-ink md:flex"
          >
            Get eyeballs <ArrowUpRight size={14} />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-paper md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mx-2 border-t border-white/10 px-3 py-5 md:hidden">
            <div className="flex flex-col gap-5 text-sm font-bold uppercase tracking-[0.14em]">
              <button onClick={() => navigate("services")} className={`text-left ${activeSection === "services" ? "text-lime" : "text-white/70"}`}>Services</button>
              <button onClick={() => navigate("network")} className={`text-left ${activeSection === "network" ? "text-lime" : "text-white/70"}`}>Network</button>
              <button onClick={() => navigate("approach")} className={`text-left ${activeSection === "approach" ? "text-lime" : "text-white/70"}`}>Approach</button>
              <button onClick={() => setLocation("/eyeballs")} className="text-left text-lime">Get eyeballs <ArrowUpRight className="ml-1 inline" size={16} /></button>
            </div>
          </div>
        )}
      </header>

      <section id="top" className="relative z-10 w-full overflow-hidden bg-[#0d0f0f]">
        <img src={heroImage} alt="SoloDac signal artwork" className="hero-art block h-[58svh] min-h-[430px] w-full object-cover object-[70%_center] sm:h-auto sm:min-h-0 sm:object-center" />
      </section>

      <section className="signal-section relative z-10 border-y border-ink/10 bg-paper text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12 lg:py-28">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/45"><span className="h-px w-10 bg-coral" /> What we believe</div>
            <h2 className="max-w-md font-display text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">Good work should move.</h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">We don&apos;t make content for the sake of having content. We build <span className="text-coral">momentum</span>—the kind that makes a brand easier to find, easier to choose, and harder to forget.</p>
          </div>
        </div>
      </section>

      <section id="network" className="signal-section relative z-10 overflow-hidden border-b border-white/10 bg-[#151a19] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute -right-24 top-16 h-80 w-80 rounded-full border-[28px] border-lime/10" />
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 max-w-2xl"><div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> The SoloDac network</div><h2 className="font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">Owned attention.<br /><span className="text-white/35">World in focus.</span></h2><p className="mt-7 max-w-xl text-base leading-relaxed text-white/55">A connected network of pages across business, finance, motivation, entrepreneurship, and culture.</p></div>
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="signal-card rounded-3xl border border-lime/35 bg-lime/[0.07] p-6 sm:p-8"><div className="mb-8 flex items-start justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">01 / Owned network</div><div className="mt-3 font-display text-4xl font-black tracking-[-0.07em]">{ownedHandles.length} owned pages.</div></div><Instagram size={22} className="text-lime" /></div><div className="grid gap-2 sm:grid-cols-2">{ownedHandles.map((handle) => <a key={handle} href={`https://www.instagram.com/${handle.slice(1)}/`} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-white/10 bg-ink/20 px-3 py-3 text-sm font-bold text-white/75 transition-all hover:-translate-y-0.5 hover:border-lime hover:text-lime"><span>{handle}</span><ArrowUpRight size={14} /></a>)}</div></div>
            <div className="signal-card rounded-3xl border border-blue-300/30 bg-blue-300/[0.07] p-6 sm:p-8"><div className="mb-8 flex items-start justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">02 / Extended network</div><div className="mt-3 font-display text-4xl font-black tracking-[-0.07em]">6 extended pages.</div></div><Globe2 size={22} className="text-blue-200" /></div><div className="grid gap-2 sm:grid-cols-2">{extendedHandles.map((handle) => <a key={handle} href={`https://www.instagram.com/${handle.slice(1)}/`} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-white/10 bg-ink/20 px-3 py-3 text-sm font-bold text-white/75 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-200"><span>{handle}</span><ArrowUpRight size={14} /></a>)}</div></div>
          </div>
          <div className="signal-card mt-3 rounded-3xl border border-coral/30 bg-coral/[0.07] p-6 sm:p-8"><div className="mb-8 flex items-start justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral">03 / Network reach</div><div className="mt-3 font-display text-4xl font-black tracking-[-0.07em]">Reach, at a glance.</div></div><Target size={22} className="text-coral" /></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{demographicBreakdown.map((item) => <div key={item.label} className="rounded-2xl border border-white/10 bg-ink/20 p-4"><div className="text-[10px] font-bold uppercase tracking-[0.16em] text-coral">{item.label}</div><div className="mt-3 font-display text-2xl font-black tracking-[-0.05em]">{item.value}</div><p className="mt-2 text-xs leading-relaxed text-white/45">{item.note}</p></div>)}</div></div>
        </div>
      </section>

      <section id="services" className="signal-section relative z-10 bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> What we do</div>
              <h2 className="max-w-3xl font-display text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">One partner.<br /><span className="text-white/35">Many ways to grow.</span></h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">From a single launch to a complete digital presence, we build the right mix for the stage you&apos;re in.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              const isExpanded = expandedService === service.number;
              const isPaper = service.color === "paper";
              return <article key={service.number} role="link" tabIndex={0} onClick={() => setLocation(`/services/${service.slug}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setLocation(`/services/${service.slug}`); }} className={`signal-card group relative min-h-[330px] cursor-pointer overflow-hidden rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/20 ${isPaper ? "bg-paper text-ink" : "bg-white/[0.045]"}`}>
                <div className="flex items-start justify-between"><span className={`font-mono text-xs ${isPaper ? "text-ink/45" : "text-white/35"}`}>{service.number}</span><div className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-12 ${service.color === "lime" ? "bg-lime text-ink" : service.color === "blue" ? "bg-blue-400 text-ink" : service.color === "coral" ? "bg-coral text-ink" : isPaper ? "bg-ink text-paper" : service.color === "violet" ? "bg-violet-400 text-ink" : "bg-orange-300 text-ink"}`}><Icon size={18} /></div></div>
                <div className="absolute bottom-6 left-6 right-6"><h3 className="max-w-[280px] font-display text-3xl font-black leading-[0.95] tracking-[-0.06em]">{service.title}</h3><p className={`mt-4 max-w-[330px] text-sm leading-relaxed ${isPaper ? "text-ink/60" : "text-white/55"}`}>{service.description}</p><div className={`grid transition-all duration-300 ${isExpanded ? "mt-4 max-h-48 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}><p className={`text-sm leading-relaxed ${isPaper ? "text-ink/70" : "text-white/65"}`}>{service.more}</p><p className={`mt-3 text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] ${isPaper ? "text-ink/45" : "text-lime/80"}`}>{service.includes}</p></div><div className="mt-5 flex items-center justify-between gap-3"><div className={`flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-[0.14em] ${isPaper ? "text-ink/45" : "text-white/35"}`}>{service.tags.map((tag) => <span key={tag} className="rounded-full border border-current px-2 py-1">{tag}</span>)}</div><button type="button" onClick={(event) => { event.stopPropagation(); setExpandedService(isExpanded ? null : service.number); }} aria-expanded={isExpanded} className={`flex shrink-0 items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] transition-colors ${isPaper ? "text-ink hover:text-coral" : "text-lime hover:text-white"}`}>{isExpanded ? "Less" : "Read more"}<ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} /></button></div></div>
                <ArrowUpRight size={18} className="absolute right-6 top-[82px] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="case-studies" className="signal-section relative z-10 border-t border-white/10 bg-[#151a19] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]"><div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Selected work</div><h2 className="font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">Work that makes<br /><span className="text-white/35">the system visible.</span></h2></div><p className="max-w-sm text-sm leading-relaxed text-white/50">A space for SoloDac projects in AI content generation and web development. Client details and outcomes can be added when you are ready.</p></div><div className="grid gap-3 lg:grid-cols-2"><article className="signal-card group relative min-h-[360px] overflow-hidden rounded-3xl border border-lime/30 bg-lime/[0.08] p-7 transition-all hover:-translate-y-1 hover:border-lime/70 sm:p-10"><div className="absolute -right-14 -top-14 h-52 w-52 rounded-full border-[24px] border-lime/20 transition-transform duration-500 group-hover:scale-125" /><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Case study 01 / AI</span><Bot className="text-lime" size={22} /></div><div><div className="mb-4 font-mono text-xs text-white/35">CLIENT / TO BE ADDED</div><h3 className="max-w-md font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">One idea.<br /><span className="text-lime">Many useful outputs.</span></h3><p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">AI-generated articles, social captions, website copy, and repurposed content shaped around a real brand voice. Add the client, platform, workflow, and outcome here.</p><button type="button" onClick={() => toast.info("Add this AI content case study when the client details are ready.")} className="mt-7 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-lime">Add case details <ArrowUpRight size={15} /></button></div></div></article><article className="signal-card group relative min-h-[360px] overflow-hidden rounded-3xl border border-blue-300/30 bg-blue-300/[0.08] p-7 transition-all hover:-translate-y-1 hover:border-blue-200/70 sm:p-10"><div className="absolute -bottom-20 -right-10 h-64 w-64 rotate-12 border-[28px] border-blue-300/15 transition-transform duration-500 group-hover:rotate-45" /><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">Case study 02 / Web</span><Code2 className="text-blue-200" size={22} /></div><div><div className="mb-4 font-mono text-xs text-white/35">CLIENT / TO BE ADDED</div><h3 className="max-w-md font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">A digital home<br /><span className="text-blue-200">built to move.</span></h3><p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">Responsive websites and landing pages designed around clarity, brand, experience, and conversion. Add the URL, scope, stack, and result here.</p><button type="button" onClick={() => toast.info("Add this web development case study when the project details are ready.")} className="mt-7 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-blue-200">Add case details <ArrowUpRight size={15} /></button></div></div></article></div></div>
      </section>

      <section id="approach" className="signal-section relative z-10 overflow-hidden bg-[#d9ff3f] text-ink">
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full border-[38px] border-ink/10 sm:h-96 sm:w-96" />
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-28">
          <div><div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/50"><span className="h-px w-10 bg-ink/45" /> How we work</div><h2 className="max-w-lg font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">Less noise.<br />More <span className="text-coral">signal.</span></h2></div>
          <div className="relative z-10 divide-y divide-ink/20">
            {["Find the real story", "Build the system", "Make it travel"].map((title, index) => <div key={title} className="group flex gap-6 py-6 first:pt-0 last:pb-0 sm:gap-10"><span className="font-mono text-xs text-ink/50">0{index + 1}</span><div className="flex-1"><h3 className="font-display text-3xl font-black tracking-[-0.06em] sm:text-4xl">{title}</h3><p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/65">{index === 0 ? "We start with the thing that makes your business different—not the trend everyone else is copying." : index === 1 ? "We turn the idea into a practical mix of content, channels, creative, and measurement your team can actually sustain." : "We publish, test, refine, and distribute until the work earns attention in the places your audience already spends time."}</p></div><ArrowDownRight className="mt-1 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1" /></div>)}
          </div>
        </div>
      </section>

      <section className="signal-section relative z-10 bg-paper px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div><div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/45"><span className="h-px w-10 bg-coral" /> Built for modern channels</div><h2 className="max-w-3xl font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-8xl">Your audience is already <span className="text-coral">scrolling.</span></h2></div>
            <div className="signal-card rounded-3xl bg-ink p-6 text-paper sm:p-8"><div className="mb-10 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">The channel mix</span><Layers3 size={19} className="text-lime" /></div><div className="space-y-5"><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><Instagram size={18} className="text-pink-400" /> Instagram</span><span className="text-xs text-white/45">Stories · Reels · Community</span></div><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><Youtube size={18} className="text-red-400" /> YouTube</span><span className="text-xs text-white/45">Shorts · Long-form · Growth</span></div><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><X size={18} /> X / Twitter</span><span className="text-xs text-white/45">Threads · Launches · Voice</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-3 font-bold"><Globe2 size={18} className="text-blue-300" /> Web</span><span className="text-xs text-white/45">Search · UX · Conversion</span></div></div></div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span><span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span></div><p className="mt-3 text-xs text-white/40">Digital media, content & growth.</p></div><div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40"><a href="#services" className="hover:text-lime">Services</a><a href="#approach" className="hover:text-lime">Approach</a><button onClick={() => setLocation("/eyeballs")} className="hover:text-lime">Contact</button><span>© 2026</span></div></div>
      </footer>
    </main>
  );
}
