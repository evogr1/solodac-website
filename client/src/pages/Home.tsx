import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  Clapperboard,
  Code2,
  Globe2,
  Instagram,
  Layers3,
  Menu,
  Megaphone,
  MoveRight,
  PenTool,
  Play,
  Search,
  Sparkles,
  Target,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

const services = [
  {
    number: "01",
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

const deliverables = [
  "A sharper point of view",
  "A repeatable content engine",
  "A brand people remember",
  "A digital home that converts",
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
    toast.success("Message staged — connect your form endpoint to receive it.");
  };

  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <header className="relative z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="group flex items-center gap-3" aria-label="SoloDac home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-ink transition-transform duration-200 group-hover:rotate-12">
              <span className="h-3 w-3 rounded-full bg-ink" />
            </span>
            <span className="font-display text-[1.7rem] font-black tracking-[-0.08em]">SoloDac</span>
          </a>

          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 md:flex">
            <button onClick={() => navigate("services")} className="transition-colors hover:text-lime">Services</button>
            <button onClick={() => navigate("approach")} className="transition-colors hover:text-lime">Approach</button>
            <button onClick={() => navigate("contact")} className="transition-colors hover:text-lime">Contact</button>
          </nav>

          <button
            onClick={() => navigate("contact")}
            className="hidden items-center gap-3 rounded-full border border-lime/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-lime transition-all hover:bg-lime hover:text-ink md:flex"
          >
            Start a project <ArrowUpRight size={14} />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-paper md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 px-5 py-6 md:hidden">
            <div className="flex flex-col gap-5 text-sm font-bold uppercase tracking-[0.14em]">
              <button onClick={() => navigate("services")} className="text-left text-white/70">Services</button>
              <button onClick={() => navigate("approach")} className="text-left text-white/70">Approach</button>
              <button onClick={() => navigate("contact")} className="text-left text-lime">Start a project <ArrowUpRight className="ml-1 inline" size={16} /></button>
            </div>
          </div>
        )}
      </header>

      <section id="top" className="relative z-10 mx-auto max-w-[1440px] px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="absolute right-[-10%] top-[-20%] h-[680px] w-[680px] rounded-full bg-lime/10 blur-[120px]" />
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-lime">
              <span className="h-px w-10 bg-lime" /> Independent digital media company
            </div>
            <h1 className="max-w-4xl font-display text-[clamp(4.6rem,11vw,10.5rem)] font-black leading-[0.82] tracking-[-0.095em] text-paper">
              Make your<br /><span className="text-lime">signal</span> louder.
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-white/62 sm:text-xl">
              SoloDac builds the content, channels, and digital experiences that turn good businesses into brands people notice, trust, and remember.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button onClick={() => navigate("contact")} className="group flex items-center gap-4 rounded-full bg-lime px-6 py-4 text-sm font-black text-ink transition-all duration-200 hover:-translate-y-1 hover:bg-[#d8ff2f]">
                Let&apos;s build something <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              <button onClick={() => navigate("services")} className="flex items-center gap-3 px-3 py-3 text-sm font-bold text-paper/70 transition-colors hover:text-paper">
                Explore capabilities <MoveRight size={17} />
              </button>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[520px]">
            <div className="absolute right-0 top-0 h-full w-full overflow-hidden rounded-[2rem] border border-white/15 bg-[#171a1a] shadow-2xl shadow-black/40">
              <img src="/manus-storage/solodac-signal_48bfeebc.jpg" alt="Abstract SoloDac signal artwork" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(204,255,42,0.85),transparent_23%),radial-gradient(circle_at_82%_76%,rgba(36,89,255,0.65),transparent_26%),linear-gradient(135deg,#171a1a_15%,#252a25_49%,#101d35_100%)]" />
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
              <div className="absolute -right-10 top-14 h-72 w-72 rounded-full border-[34px] border-lime/80 shadow-[0_0_100px_rgba(204,255,42,0.35)] sm:h-96 sm:w-96" />
              <div className="absolute -bottom-28 left-8 h-72 w-[150%] rotate-[-16deg] rounded-[50%] border-[24px] border-blue-500/70 blur-[1px] sm:h-96" />
              <div className="absolute left-7 top-8 max-w-[190px] font-display text-2xl font-black leading-[0.95] tracking-[-0.06em] text-paper/90 sm:left-10 sm:top-10 sm:text-3xl">
                The<br /><span className="text-lime">attention</span><br />economy.
              </div>
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between sm:bottom-10 sm:left-10 sm:right-10">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60"><span className="h-2 w-2 animate-pulse rounded-full bg-lime" /> Live signal</div>
                <div className="font-display text-5xl font-black leading-none tracking-[-0.08em] text-paper sm:text-7xl">∞</div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 z-10 flex max-w-[240px] items-center gap-3 rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-ink shadow-xl sm:-left-8">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-lime"><Zap size={18} fill="currentColor" /></div>
              <div><div className="text-[10px] font-black uppercase tracking-[0.16em] text-ink/50">Built for</div><div className="text-sm font-bold">Brands with something to say.</div></div>
            </div>
          </div>
        </div>
        <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          <span>Scroll to explore</span><ChevronDown size={16} className="animate-bounce text-lime" /><span>01 / 06</span>
        </div>
      </section>

      <section className="relative z-10 border-y border-ink/10 bg-paper text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12 lg:py-28">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/45"><span className="h-px w-10 bg-coral" /> What we believe</div>
            <h2 className="max-w-md font-display text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">Good work should move.</h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">We don&apos;t make content for the sake of having content. We build <span className="text-coral">momentum</span>—the kind that makes a brand easier to find, easier to choose, and harder to forget.</p>
            <div className="mt-10 grid gap-4 border-t border-ink/15 pt-6 sm:grid-cols-2">
              {deliverables.map((item) => <div key={item} className="flex items-center gap-3 text-sm font-bold"><Check size={17} className="text-coral" /> {item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative z-10 bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
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
              return <article key={service.number} className={`group relative min-h-[330px] overflow-hidden rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/20 ${isPaper ? "bg-paper text-ink" : "bg-white/[0.045]"}`}>
                <div className="flex items-start justify-between"><span className={`font-mono text-xs ${isPaper ? "text-ink/45" : "text-white/35"}`}>{service.number}</span><div className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-12 ${service.color === "lime" ? "bg-lime text-ink" : service.color === "blue" ? "bg-blue-400 text-ink" : service.color === "coral" ? "bg-coral text-ink" : isPaper ? "bg-ink text-paper" : service.color === "violet" ? "bg-violet-400 text-ink" : "bg-orange-300 text-ink"}`}><Icon size={18} /></div></div>
                <div className="absolute bottom-6 left-6 right-6"><h3 className="max-w-[280px] font-display text-3xl font-black leading-[0.95] tracking-[-0.06em]">{service.title}</h3><p className={`mt-4 max-w-[330px] text-sm leading-relaxed ${isPaper ? "text-ink/60" : "text-white/55"}`}>{service.description}</p><div className={`grid transition-all duration-300 ${isExpanded ? "mt-4 max-h-48 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}><p className={`text-sm leading-relaxed ${isPaper ? "text-ink/70" : "text-white/65"}`}>{service.more}</p><p className={`mt-3 text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] ${isPaper ? "text-ink/45" : "text-lime/80"}`}>{service.includes}</p></div><div className="mt-5 flex items-center justify-between gap-3"><div className={`flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-[0.14em] ${isPaper ? "text-ink/45" : "text-white/35"}`}>{service.tags.map((tag) => <span key={tag} className="rounded-full border border-current px-2 py-1">{tag}</span>)}</div><button type="button" onClick={() => setExpandedService(isExpanded ? null : service.number)} aria-expanded={isExpanded} className={`flex shrink-0 items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] transition-colors ${isPaper ? "text-ink hover:text-coral" : "text-lime hover:text-white"}`}>{isExpanded ? "Less" : "Read more"}<ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} /></button></div></div>
                <ArrowUpRight size={18} className="absolute right-6 top-[82px] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="approach" className="relative z-10 overflow-hidden bg-[#d9ff3f] text-ink">
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full border-[38px] border-ink/10 sm:h-96 sm:w-96" />
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-28">
          <div><div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/50"><span className="h-px w-10 bg-ink/45" /> How we work</div><h2 className="max-w-lg font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">Less noise.<br />More <span className="text-coral">signal.</span></h2></div>
          <div className="relative z-10 divide-y divide-ink/20">
            {["Find the real story", "Build the system", "Make it travel"].map((title, index) => <div key={title} className="group flex gap-6 py-6 first:pt-0 last:pb-0 sm:gap-10"><span className="font-mono text-xs text-ink/50">0{index + 1}</span><div className="flex-1"><h3 className="font-display text-3xl font-black tracking-[-0.06em] sm:text-4xl">{title}</h3><p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/65">{index === 0 ? "We start with the thing that makes your business different—not the trend everyone else is copying." : index === 1 ? "We turn the idea into a practical mix of content, channels, creative, and measurement your team can actually sustain." : "We publish, test, refine, and distribute until the work earns attention in the places your audience already spends time."}</p></div><ArrowDownRight className="mt-1 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1" /></div>)}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-paper px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div><div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/45"><span className="h-px w-10 bg-coral" /> Built for modern channels</div><h2 className="max-w-3xl font-display text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-8xl">Your audience is already <span className="text-coral">scrolling.</span></h2></div>
            <div className="rounded-3xl bg-ink p-6 text-paper sm:p-8"><div className="mb-10 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">The channel mix</span><Layers3 size={19} className="text-lime" /></div><div className="space-y-5"><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><Instagram size={18} className="text-pink-400" /> Instagram</span><span className="text-xs text-white/45">Stories · Reels · Community</span></div><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><Youtube size={18} className="text-red-400" /> YouTube</span><span className="text-xs text-white/45">Shorts · Long-form · Growth</span></div><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-3 font-bold"><X size={18} /> X / Twitter</span><span className="text-xs text-white/45">Threads · Launches · Voice</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-3 font-bold"><Globe2 size={18} className="text-blue-300" /> Web</span><span className="text-xs text-white/45">Search · UX · Conversion</span></div></div></div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 bg-coral px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div><div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/55"><span className="h-px w-10 bg-ink/60" /> Start a conversation</div><h2 className="max-w-xl font-display text-6xl font-black leading-[0.84] tracking-[-0.09em] sm:text-8xl">Have a good problem?</h2><p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">Tell us what you&apos;re building, where it&apos;s stuck, or where you want it to go. We&apos;ll come back with a point of view.</p><div className="mt-10 flex flex-wrap gap-3"><span className="rounded-full border border-ink/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em]">Social</span><span className="rounded-full border border-ink/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em]">Content</span><span className="rounded-full border border-ink/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em]">Digital</span></div></div>
          <form onSubmit={handleSubmit} className="rounded-3xl bg-ink p-6 text-paper sm:p-10">
            <div className="mb-8 flex items-center justify-between"><span className="font-display text-2xl font-black tracking-[-0.06em]">Project brief</span><PenTool size={20} className="text-lime" /></div>
            {formSent ? <div className="flex min-h-[320px] flex-col items-center justify-center text-center"><div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-lime text-ink"><Check size={28} /></div><h3 className="font-display text-4xl font-black tracking-[-0.06em]">Signal received.</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">This demo form is ready to connect to your inbox or CRM when you are.</p><button type="button" onClick={() => setFormSent(false)} className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-lime hover:underline">Send another brief</button></div> : <div className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Your name<input required name="name" placeholder="Jane Smith" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" /></label><label className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Company / brand<input required name="company" placeholder="Your company" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" /></label></div><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Email<input required type="email" name="email" placeholder="you@company.com" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" /></label><label className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Phone / WhatsApp<input name="phone" placeholder="Optional" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" /></label></div><label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">What can we help with?<select required name="service" defaultValue="" className="mt-2 w-full border-b border-white/20 bg-ink pb-3 text-base font-medium text-paper outline-none transition-colors focus:border-lime"><option value="" disabled>Select a direction</option><option>Social media management</option><option>Content production</option><option>AI content generation</option><option>Website / digital build</option><option>SEO or performance marketing</option><option>Not sure yet</option></select></label><label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">A little context<textarea required name="message" rows={4} placeholder="What are you trying to make happen?" className="mt-2 w-full resize-none border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" /></label><button type="submit" className="group flex w-full items-center justify-between rounded-full bg-lime px-5 py-4 text-sm font-black text-ink transition-colors hover:bg-[#d8ff2f]">Send project brief <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button></div>}
          </form>
        </div>
      </section>

      <footer className="relative z-10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span><span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span></div><p className="mt-3 text-xs text-white/40">Digital media, content & growth.</p></div><div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40"><a href="#services" className="hover:text-lime">Services</a><a href="#approach" className="hover:text-lime">Approach</a><a href="#contact" className="hover:text-lime">Contact</a><span>© 2026</span></div></div>
      </footer>
    </main>
  );
}
