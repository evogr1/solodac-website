import { ArrowUpRight, BadgeCheck, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import PartnershipsMarquee, { type Partner } from "../components/PartnershipsMarquee";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";
import heroImage from "../assets/solodac-signal.jpg";
import aocMadoff from "../assets/partners/aoc-madoff.jpg";
import aocSnapclips from "../assets/partners/aoc-snapclips.jpg";
import bourseLogo from "../assets/partners/bourse.jpg";
import lucreLogo from "../assets/partners/lucre.jpg";
import saRowling from "../assets/partners/sa-rowling.jpg";
import saSpacex from "../assets/partners/sa-spacex.jpg";
import virodhLogo from "../assets/partners/virodh.jpg";
import saLogo from "../assets/partners/successfularcs.jpg";
import aocLogo from "../assets/partners/archiveofceos.jpg";

const partners: Partner[] = [
  { name: "Successful Arcs", role: "Business", stat: "794.8K", statLabel: "Views on one reel", image: saSpacex, href: "https://www.instagram.com/reel/Dea8TEIBako/" },
  { name: "Archive of CEOs", role: "Business", stat: "57.7K", statLabel: "Views on one reel", image: aocMadoff, href: "https://www.instagram.com/reel/Deje6VcBmj-/" },
  { name: "Virodh", role: "GenZ Bharat", stat: "35K", statLabel: "Followers", image: virodhLogo, imageFit: "logo", href: "https://www.instagram.com/virodhindia/" },
  { name: "Successful Arcs", role: "Business", stat: "287.1K", statLabel: "Views on one reel", image: saRowling, href: "https://www.instagram.com/reel/DeXvJmrEt_n/" },
  { name: "Bourse India", role: "News", stat: "29.1K", statLabel: "Followers", image: bourseLogo, imageFit: "logo", href: "https://www.instagram.com/bourseindiaa/" },
  { name: "Archive of CEOs", role: "Business", stat: "51.3K", statLabel: "Views on one reel", image: aocSnapclips, href: "https://www.instagram.com/reel/DeoNDL6BOdg/" },
  { name: "Lucre", role: "Founder stories", stat: "15.9K", statLabel: "Followers", image: lucreLogo, imageFit: "logo", href: "https://www.instagram.com/lucreindia/" },
];

const tickerItems = ["Owned media", "5 IPs", "15.4M followers", "18.2B+ annual views", "121M accounts reached", "Business, markets & founders", "Made in India"];

const ips = [
  { name: "Successful Arcs", handle: "successfularcs", category: "Business", tagline: "Built for entrepreneurs and future leaders.", followers: "280.6K", logo: saLogo, verified: true },
  { name: "Archive of CEOs", handle: "archiveofceos", category: "Leadership", tagline: "Preserving the wisdom of great CEOs.", followers: "265.4K", logo: aocLogo, verified: true },
  { name: "Virodh", handle: "virodhindia", category: "GenZ & culture", tagline: "Run by GenZ, for GenZ. Made for Bharat.", followers: "35K", logo: virodhLogo, verified: false },
  { name: "Bourse India", handle: "bourseindiaa", category: "News & events", tagline: "India's events, decoded.", followers: "29.1K", logo: bourseLogo, verified: false },
  { name: "Lucre", handle: "lucreindia", category: "Founders", tagline: "Stories behind India's biggest founders.", followers: "15.9K", logo: lucreLogo, verified: false },
];

const offerings = [
  { title: "Campaigns across our IPs", body: "Your launch, product or story told natively on pages people already follow for business content.", tags: ["Native reels", "Carousels", "Multi-IP runs"], href: "/campaigns" },
  { title: "Founder & podcast features", body: "One sit-down turned into weeks of clips that run across the network.", tags: ["Interviews", "Clips", "Cross-posting"], href: "/clipping" },
  { title: "Funding & launch news", body: "Raised a round or shipped something big? We put it in front of the people who care.", tags: ["Funding news", "Launches", "Milestones"], href: "/services" },
  { title: "Content for your channels", body: "The team that runs our IPs, running yours: strategy, production and posting.", tags: ["Social", "Video", "Performance"], href: "/services" },
];

function SectionLabel({ number, label, dark = true }: { number: string; label: string; dark?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] ${dark ? "text-white/50" : "text-ink/50"}`}>
      <span className={dark ? "text-lime" : "text-coral"}>{number}</span>
      <span className={`h-px w-8 ${dark ? "bg-white/20" : "bg-ink/20"}`} />
      {label}
    </div>
  );
}

export default function Home() {
  useScrollToTop();
  const [, setLocation] = useLocation();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="top" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">

      <section id="top" className="relative z-10 min-h-[88svh] w-full overflow-hidden bg-[#0d0f0f] sm:min-h-[94vh]">
        <motion.img
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          src={heroImage}
          alt=""
          className="hero-art absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />

        <Reveal delay={0.2} className="absolute inset-x-0 top-[96px] px-5 sm:top-[120px] sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" /> A digital media company
            </div>
            <h1 className="font-headline max-w-4xl text-[clamp(3rem,9vw,8rem)] leading-[0.88] text-paper">
              India&apos;s business stories,
              <br />
              <span className="font-accent text-coral">told on pages we own.</span>
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              SoloDac builds and runs media brands for founders, markets and a new generation of India. Brands come to us to reach the audience those IPs have earned.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setLocation("/marketing")}
                className="group flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5 sm:text-sm"
              >
                Advertise with us <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              <span className="flex items-center gap-1.5 text-xs font-bold text-coral">
                <Flame size={13} className="animate-pulse" /> Q4 slots open, 3 left
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-ink py-4">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={index} className="flex items-center gap-8">{item}<span className="text-lime">◆</span></span>
          ))}
        </div>
      </div>

      <section className="signal-section relative z-10 bg-ink px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <SectionLabel number="01" label="Our IPs" />
              <h2 className="font-headline text-5xl leading-[0.9] sm:text-7xl">
                Media brands we <span className="font-accent text-lime">own and run.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/55 lg:justify-self-end">
              Each IP has its own voice and its own audience. Together they make SoloDac one of the places India's business-curious scroll to every day.
            </p>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-2">
            {ips.slice(0, 2).map((ip, index) => (
              <Reveal key={ip.handle} delay={index * 0.06}>
                <IpCard ip={ip} large />
              </Reveal>
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {ips.slice(2).map((ip, index) => (
              <Reveal key={ip.handle} delay={0.12 + index * 0.06}>
                <IpCard ip={ip} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-12 grid grid-cols-1 gap-8 border-t border-dotted border-white/20 pt-8 sm:grid-cols-3">
            {[
              { value: "5", label: "Owned IPs" },
              { value: "15.4M", label: "Followers across the network" },
              { value: "18.2B+", label: "Views a year" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-headline text-5xl text-paper sm:text-6xl">{stat.value}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">{stat.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="signal-section relative z-10 border-y border-ink/10 bg-paper px-5 py-14 text-ink sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-8">
            <SectionLabel number="02" label="For brands" dark={false} />
            <h2 className="font-headline max-w-3xl text-5xl leading-[0.9] sm:text-7xl">
              Your story, on IPs <span className="font-accent text-coral">people already trust.</span>
            </h2>
          </Reveal>
          <div className="border-t border-ink/15">
            {offerings.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Link href={item.href} className="group grid gap-4 border-b border-ink/15 py-7 transition-colors hover:bg-ink/[0.03] sm:grid-cols-[3rem_1fr_1fr_auto] sm:items-center sm:gap-8 sm:px-3">
                  <span className="font-mono text-xs text-ink/40">0{index + 1}</span>
                  <div>
                    <h3 className="font-headline text-3xl leading-none sm:text-4xl">{item.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">{item.body}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => <span key={tag} className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/60">{tag}</span>)}
                  </div>
                  <ArrowUpRight size={20} className="hidden text-ink/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-coral sm:block" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="signal-section relative z-10 overflow-hidden bg-ink py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <SectionLabel number="03" label="Selected work" />
              <h2 className="font-headline text-5xl leading-[0.9] sm:text-7xl">
                Real reach. <span className="font-accent text-lime">Real reels.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/55 lg:justify-self-end">Straight from our IPs. Tap any card to see the post.</p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <PartnershipsMarquee partners={partners} />
        </Reveal>
      </section>

      <section className="relative z-10 bg-coral px-5 py-10 text-ink sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Have a good problem to solve?</h2>
          <button onClick={() => setLocation("/marketing")} className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1">Book a call <ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
        </div>
      </section>

      <footer className="relative z-10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span><span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span></div><p className="mt-3 text-xs text-white/40">A digital media company.</p></div><div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40"><Link href="/services" className="hover:text-lime">Services</Link><Link href="/network" className="hover:text-lime">Network</Link><Link href="/approach" className="hover:text-lime">About</Link><button onClick={() => setLocation("/marketing")} className="hover:text-lime">Contact</button><span>© 2026</span></div></div>
      </footer>
      </main>
    </>
  );
}

function IpCard({ ip, large = false }: { ip: (typeof ips)[number]; large?: boolean }) {
  return (
    <a
      href={`https://www.instagram.com/${ip.handle}/`}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-lime/50 ${large ? "p-7 sm:p-9" : "p-6"}`}
    >
      <img src={ip.logo} alt="" aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full object-cover opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-20" />
      <div className="relative flex items-start justify-between">
        <img src={ip.logo} alt={`${ip.name} logo`} className={`rounded-full object-cover ring-1 ring-white/10 ${large ? "h-20 w-20" : "h-14 w-14"}`} />
        <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">{ip.category}</span>
      </div>
      <div className={`relative flex items-center gap-2 ${large ? "mt-10" : "mt-7"}`}>
        <h3 className={`font-headline leading-none ${large ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{ip.name}</h3>
        {ip.verified && <BadgeCheck size={large ? 22 : 18} className="shrink-0 text-lime" />}
      </div>
      <p className={`relative mt-3 flex-1 text-white/60 ${large ? "text-base" : "text-sm"}`}>{ip.tagline}</p>
      <div className="relative mt-7 flex items-end justify-between border-t border-white/10 pt-5">
        <div>
          <div className={`font-headline leading-none ${large ? "text-4xl" : "text-3xl"}`}>{ip.followers}</div>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Followers · @{ip.handle}</div>
        </div>
        <ArrowUpRight size={20} className="text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
      </div>
    </a>
  );
}
