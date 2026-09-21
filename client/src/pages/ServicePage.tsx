import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Instagram, Sparkles } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import SiteHeader from "../components/SiteHeader";
import { services } from "../lib/services";

export default function ServicePage() {
  const [, params] = useRoute("/services/:slug");
  const [, setLocation] = useLocation();
  const service = services.find((item) => item.slug === params?.slug);

  if (!service) {
    setLocation("/404");
    return null;
  }

  const Icon = service.icon;
  const otherServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const isPaper = service.color === "paper";

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">

      <section className="relative z-10 border-b border-white/10 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="absolute right-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-lime/10 blur-[120px]" />
        <div className="mx-auto max-w-[1440px]">
          <Link href="/#services" className="mb-14 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 transition-colors hover:text-lime"><ArrowLeft size={14} /> All services</Link>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
            <div><div className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> SoloDac capability / {service.number}</div><div className={`mb-8 grid h-16 w-16 place-items-center rounded-2xl ${service.color === "lime" ? "bg-lime text-ink" : service.color === "blue" ? "bg-blue-400 text-ink" : service.color === "coral" ? "bg-coral text-ink" : isPaper ? "bg-paper text-ink" : service.color === "violet" ? "bg-violet-400 text-ink" : "bg-orange-300 text-ink"}`}><Icon size={28} /></div><h1 className="max-w-4xl font-display text-[clamp(4rem,9vw,8.5rem)] font-black leading-[0.84] tracking-[-0.09em]">{service.title}</h1><p className="mt-9 max-w-2xl text-xl leading-relaxed text-white/60 sm:text-2xl">{service.more}</p><button onClick={() => document.getElementById("service-brief")?.scrollIntoView({ behavior: "smooth" })} className="group mt-10 flex items-center gap-4 rounded-full bg-lime px-6 py-4 text-sm font-black text-ink transition-all hover:-translate-y-1 hover:bg-[#d8ff2f]">Talk to SoloDac <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button></div>
            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#171a1a] p-7 sm:p-10"><div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_30%,rgba(204,255,42,0.34),transparent_22%),radial-gradient(circle_at_25%_90%,rgba(255,118,95,0.3),transparent_28%)]" /><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:42px_42px]" /><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="font-mono text-xs text-white/45">SYSTEM / SOLODAC</span><Sparkles size={18} className="text-lime" /></div><div><div className="font-display text-6xl font-black leading-[0.85] tracking-[-0.08em] sm:text-8xl">Make<br /><span className="text-lime">it move.</span></div><p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">{service.description}</p></div><div className="mt-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45"><span className="h-2 w-2 rounded-full bg-lime" /> Strategy · Creation · Distribution</div></div></div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-paper px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><div><div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-ink/45"><span className="h-px w-10 bg-coral" /> What this includes</div><h2 className="font-display text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl">Built around<br /><span className="text-coral">your reality.</span></h2></div><div className="grid gap-4 sm:grid-cols-2">{service.includes.split(" · ").map((item) => <div key={item} className="rounded-2xl border border-ink/15 p-5"><Check size={18} className="mb-10 text-coral" /><h3 className="font-display text-2xl font-black tracking-[-0.06em]">{item}</h3></div>)}</div></div></div></section>

      <section className="relative z-10 bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto max-w-[1440px]"><div className="mb-10 flex items-end justify-between gap-6"><div><div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Keep exploring</div><h2 className="font-display text-4xl font-black tracking-[-0.07em] sm:text-6xl">More ways to grow.</h2></div><Link href="/#services" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/50 hover:text-lime sm:flex">View all <ChevronRight size={15} /></Link></div><div className="grid gap-3 md:grid-cols-3">{otherServices.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 transition-all hover:-translate-y-1 hover:border-lime/50 hover:bg-white/[0.08]"><div className="mb-12 flex items-start justify-between"><span className="font-mono text-xs text-white/35">{item.number}</span><ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><h3 className="font-display text-3xl font-black leading-[0.95] tracking-[-0.06em]">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-white/50">{item.description}</p></Link>)}</div></div></section>

      <section id="service-brief" className="relative z-10 bg-coral px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><div className="mb-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/55"><span className="h-px w-10 bg-ink/60" /> Ready when you are</div><h2 className="max-w-2xl font-display text-5xl font-black leading-[0.86] tracking-[-0.08em] sm:text-7xl">Let&apos;s make this<br />the good kind of busy.</h2></div><Link href="/eyeballs" className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1">Send a brief <ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div></section>

      <footer className="relative z-10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-white/10 pt-7"><Link href="/" className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span><span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span></Link><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Digital media, content & growth.</span></div></footer>
      </main>
    </>
  );
}
