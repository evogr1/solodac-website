import { ArrowUpRight, BadgeCheck, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import PublisherHeader from "./PublisherHeader";
import Reveal from "./Reveal";
import { igUrl, ips, type Ip } from "../lib/ips";
import { storyPath, type Story } from "../lib/stories";

export function PublisherLayout({
  children,
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
    <div className="min-h-screen bg-paper font-sans text-ink selection:bg-pink selection:text-paper">
      <PublisherHeader />
      <main className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6">{children}</main>

      {!hideCta && (
        <section className="relative z-10 bg-coral px-5 py-10 text-ink sm:px-8 lg:px-12 lg:py-14">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">{ctaTitle}</h2>
            <button onClick={() => setLocation("/marketing")} className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1">Book a call <ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
          </div>
        </section>
      )}

      <footer className="bg-ink px-4 pb-8 pt-14 text-paper/70 sm:px-6">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="font-headline text-3xl text-paper">SOLODAC<span className="text-pink">.</span></Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed">A digital media company. India&apos;s business stories, <span className="font-accent text-pink">told at scale.</span></p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-greenbright">Media</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/stories" className="hover:text-pink">Stories</Link></li>
                <li><Link href="/network" className="hover:text-pink">The network</Link></li>
                <li><Link href="/events" className="hover:text-pink">Events</Link></li>
                <li><Link href="/thesis" className="hover:text-pink">Our thesis</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-greenbright">Studio</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/services" className="hover:text-pink">What we do</Link></li>
                <li><Link href="/youtube" className="hover:text-pink">YouTube channels</Link></li>
                <li><Link href="/approach" className="hover:text-pink">About</Link></li>
                <li><Link href="/careers" className="hover:text-pink">Careers</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-greenbright">Work with us</div>
              <p className="mt-4 text-sm">Campaigns, channels, brands and websites.</p>
              <a href="mailto:info@solodac.com" className="mt-2 inline-block text-sm font-bold text-pink">info@solodac.com</a>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/40">
            <span>© 2026 SoloDac</span>
            <span>Made in India, watched everywhere</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({ crumb, kicker, title, deck, children }: { crumb: string; kicker: string; title: ReactNode; deck?: ReactNode; children?: ReactNode }) {
  return (
    <Reveal>
      <section className="border-b border-ink/10 pb-10 pt-6 sm:pb-14 sm:pt-10">
        <nav className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">
          <Link href="/" className="hover:text-green">Home</Link>
          <ChevronRight size={11} />
          <span className="text-ink/70">{crumb}</span>
        </nav>
        <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-pink">{kicker}</div>
        <h1 className="font-headline mt-3 max-w-5xl text-5xl leading-[0.95] text-green sm:text-7xl">{title}</h1>
        {deck && <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">{deck}</p>}
        {children && <div className="mt-8">{children}</div>}
      </section>
    </Reveal>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-ink/10 bg-white/60 p-5 sm:p-7 ${className}`}>{children}</section>;
}

export function SectionTitle({ number, children, action }: { number?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="flex items-baseline gap-3 font-headline text-3xl text-ink sm:text-4xl">
        {number && <span className="font-mono text-sm text-pink">{number}</span>}
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/60">{children}</span>;
}

export function PrimaryButton({ children, href, onClick }: { children: ReactNode; href?: string; onClick?: () => void }) {
  const className = "inline-flex items-center gap-2 rounded-full bg-green px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink";
  if (href) return <Link href={href} className={className}>{children} <ArrowUpRight size={14} /></Link>;
  return <button onClick={onClick} className={className}>{children} <ArrowUpRight size={14} /></button>;
}

export function Cover({ story, className = "" }: { story: Story; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      <img src={story.image} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-xl" />
      <img src={story.image} alt={story.title} className="relative mx-auto h-full object-contain transition-transform duration-500 group-hover:scale-105" />
    </div>
  );
}

export function StoryMeta({ story }: { story: Story }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink/45">
      <span className="font-bold text-green">{story.ip}</span>
      <span>·</span>
      <span>{story.date}</span>
      <span>·</span>
      <span>{story.readTime}</span>
    </div>
  );
}

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={storyPath(story)} className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/60 transition-all hover:-translate-y-1 hover:border-green/50">
      <Cover story={story} className="h-44" />
      <div className="flex flex-1 flex-col p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pink">{story.category}</div>
        <h3 className="mt-2 flex-1 text-lg font-bold leading-snug tracking-tight group-hover:text-green">{story.title}</h3>
        <div className="mt-4"><StoryMeta story={story} /></div>
      </div>
    </Link>
  );
}

export function IpProfileCard({ ip, wide = false }: { ip: Ip; wide?: boolean }) {
  return (
    <a href={igUrl(ip.handle)} target="_blank" rel="noreferrer" className={`group block shrink-0 snap-start rounded-2xl border border-ink/10 bg-white/60 p-5 transition-all hover:-translate-y-1 hover:border-green/50 ${wide ? "" : "w-[260px]"}`}>
      <div className="flex items-center gap-3">
        <img src={ip.logo} alt={`${ip.name} logo`} className="h-12 w-12 rounded-full object-cover" />
        <div className="min-w-0">
          <div className="flex items-center gap-1 truncate font-bold tracking-tight">{ip.name}{ip.verified && <BadgeCheck size={15} className="shrink-0 text-green" />}</div>
          <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-pink">Full profile <ArrowUpRight size={11} /></div>
        </div>
      </div>
      {wide && <p className="mt-3 text-sm text-ink/60">{ip.tagline}</p>}
      <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-ink/10 pt-3 text-xs">
        <div><dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink/40">Category</dt><dd className="mt-1 font-bold">{ip.category}</dd></div>
        <div><dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink/40">Followers</dt><dd className="mt-1 font-bold">{ip.followers}</dd></div>
        <div><dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink/40">Posts</dt><dd className="mt-1 font-bold">{ip.posts}</dd></div>
      </dl>
    </a>
  );
}

export function StatStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <div key={item.label} className="bg-paper p-5">
          <div className="font-headline text-3xl text-green sm:text-4xl">{item.value}</div>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export { ips };
