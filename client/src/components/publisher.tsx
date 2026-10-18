import { ArrowUpRight, BadgeCheck, ChevronRight, Eye, Play } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import PublisherHeader from "./PublisherHeader";
import Reveal from "./Reveal";
import { igUrl, ips, type Ip } from "../lib/ips";
import type { Story } from "../lib/stories";

export const RED = "#e2365b";

export function PublisherLayout({
  children,
  activeSection,
  onSection,
  ctaTitle = "Have a good problem to solve?",
  hideCta = false,
}: {
  children: ReactNode;
  activeSection?: string;
  onSection?: (section: string) => void;
  ctaTitle?: string;
  hideCta?: boolean;
}) {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-[#f2f2f2] text-neutral-900">
      <PublisherHeader activeSection={activeSection} onSection={onSection} />
      <main className="mx-auto max-w-[1320px] px-4 py-6">{children}</main>

      {!hideCta && <section className="relative z-10 mt-10 bg-coral px-5 py-10 text-ink sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">{ctaTitle}</h2>
          <button onClick={() => setLocation("/marketing")} className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1">Book a call <ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
        </div>
      </section>}

      <footer className={`${hideCta ? "mt-10 " : ""}bg-[#111] px-4 py-10 text-white/70`}>
        <div className="mx-auto grid max-w-[1320px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white"><span className="grid h-7 w-7 place-items-center rounded-full bg-coral"><span className="h-2.5 w-2.5 rounded-full bg-[#111]" /></span><span className="font-display text-2xl font-black tracking-[-0.06em]">SoloDac</span></Link>
            <p className="mt-3 max-w-xs text-sm">SoloDac is a digital media company publishing India&apos;s business, markets, founder and culture stories to 15.4M+ followers.</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Our IPs</div>
            <ul className="mt-3 space-y-2 text-sm">{ips.map((ip) => <li key={ip.handle}><a href={igUrl(ip.handle)} target="_blank" rel="noreferrer" className="hover:text-coral">{ip.name}</a></li>)}</ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Company</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/approach" className="hover:text-coral">About</Link></li>
              <li><Link href="/network" className="hover:text-coral">Our IPs</Link></li>
              <li><Link href="/services" className="hover:text-coral">Services</Link></li>
              <li><Link href="/youtube" className="hover:text-coral">YouTube channels</Link></li>
              <li><Link href="/thesis" className="hover:text-coral">Our thesis</Link></li>
              <li><Link href="/careers" className="hover:text-coral">Careers</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Advertise</div>
            <p className="mt-3 text-sm">Reach our audience across every IP.</p>
            <a href="mailto:info@solodac.com" className="mt-2 inline-block text-sm font-bold text-coral">info@solodac.com</a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1320px] border-t border-white/10 pt-5 text-xs text-white/40">© 2026 SoloDac. All rights reserved.</div>
      </footer>
    </div>
  );
}

export function PageHero({ crumb, kicker, title, deck, children }: { crumb: string; kicker: string; title: ReactNode; deck?: ReactNode; children?: ReactNode }) {
  return (
    <Reveal>
      <section className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#e2365b]/15 to-coral/10 blur-2xl" />
        <nav className="relative flex items-center gap-1 text-xs text-neutral-500">
          <Link href="/" className="hover:text-[#e2365b]">Home</Link>
          <ChevronRight size={12} />
          <span className="text-neutral-700">{crumb}</span>
        </nav>
        <div className="relative mt-6 text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">{kicker}</div>
        <h1 className="relative mt-2 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">{title}</h1>
        {deck && <p className="relative mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">{deck}</p>}
        {children && <div className="relative mt-6">{children}</div>}
      </section>
    </Reveal>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-xl bg-white p-5 shadow-sm sm:p-7 ${className}`}>{children}</section>;
}

export function SectionTitle({ number, children, action }: { number?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="flex items-baseline gap-3 font-[Georgia,serif] text-2xl font-bold text-neutral-900 sm:text-3xl">
        {number && <span className="font-mono text-sm font-normal text-[#e2365b]">{number}</span>}
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-600">{children}</span>;
}

export function PrimaryButton({ children, href, onClick }: { children: ReactNode; href?: string; onClick?: () => void }) {
  const className = "inline-flex items-center gap-2 rounded bg-[#e2365b] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5";
  if (href) return <Link href={href} className={className}>{children} <ArrowUpRight size={14} /></Link>;
  return <button onClick={onClick} className={className}>{children} <ArrowUpRight size={14} /></button>;
}

export function Cover({ story, className = "", play = false }: { story: Story; className?: string; play?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-[#1a1a1a] ${className}`}>
      <img src={story.image} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-xl" />
      <img src={story.image} alt={story.title} className="relative mx-auto h-full object-contain transition-transform duration-500 group-hover:scale-105" />
      {play && (
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
          <Play size={11} fill="currentColor" /> {story.readTime}
        </span>
      )}
    </div>
  );
}

export function StoryMeta({ story }: { story: Story }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
      <span className="font-semibold text-neutral-700">{story.ip}</span>
      <span>·</span>
      <span>{story.date}</span>
      <span>·</span>
      <span className="flex items-center gap-1"><Eye size={12} /> {story.views}</span>
    </div>
  );
}

export function StoryCard({ story }: { story: Story }) {
  return (
    <a href={story.href} target="_blank" rel="noreferrer" className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
      <Cover story={story} className="h-44" play />
      <div className="flex flex-1 flex-col p-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">{story.category}</div>
        <h3 className="mt-1.5 flex-1 font-extrabold leading-snug group-hover:text-[#e2365b]">{story.title}</h3>
        <div className="mt-3"><StoryMeta story={story} /></div>
      </div>
    </a>
  );
}

export function IpProfileCard({ ip, wide = false }: { ip: Ip; wide?: boolean }) {
  return (
    <a href={igUrl(ip.handle)} target="_blank" rel="noreferrer" className={`group block shrink-0 snap-start rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-[#e2365b] ${wide ? "" : "w-[260px]"}`}>
      <div className="flex items-center gap-3">
        <img src={ip.logo} alt={`${ip.name} logo`} className="h-12 w-12 rounded-full object-cover" />
        <div className="min-w-0">
          <div className="flex items-center gap-1 truncate font-extrabold">{ip.name}{ip.verified && <BadgeCheck size={15} className="shrink-0 text-[#e2365b]" />}</div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#e2365b]">Full Profile <ArrowUpRight size={12} /></div>
        </div>
      </div>
      {wide && <p className="mt-3 text-sm text-neutral-600">{ip.tagline}</p>}
      <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-neutral-200 pt-3 text-xs">
        <div><dt className="text-neutral-500">Category</dt><dd className="mt-0.5 font-bold">{ip.category}</dd></div>
        <div><dt className="text-neutral-500">Followers</dt><dd className="mt-0.5 font-bold">{ip.followers}</dd></div>
        <div><dt className="text-neutral-500">Posts</dt><dd className="mt-0.5 font-bold">{ip.posts}</dd></div>
      </dl>
    </a>
  );
}

export function StatStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-neutral-200 shadow-sm sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <div key={item.label} className="bg-white p-5">
          <div className="text-2xl font-extrabold tracking-tight sm:text-3xl">{item.value}</div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
