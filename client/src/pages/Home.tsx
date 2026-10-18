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

const tickerItems = ["Owned media", "15.4M followers", "18.2B+ annual views", "121M accounts reached", "5 owned brands", "Business, markets & founders", "India to the world"];

const brands = [
  { name: "Successful Arcs", handle: "successfularcs", niche: "Entrepreneurs & leaders", followers: "280.6K", logo: saLogo, verified: true },
  { name: "Archive of CEOs", handle: "archiveofceos", niche: "CEO wisdom & business history", followers: "265.4K", logo: aocLogo, verified: true },
  { name: "Virodh", handle: "virodhindia", niche: "GenZ, made for Bharat", followers: "35K", logo: virodhLogo, verified: false },
  { name: "Bourse India", handle: "bourseindiaa", niche: "India's events, decoded", followers: "29.1K", logo: bourseLogo, verified: false },
  { name: "Lucre", handle: "lucreindia", niche: "Stories of India's founders", followers: "15.9K", logo: lucreLogo, verified: false },
];

const offerings = [
  { title: "Campaigns on our pages", body: "Your launch, product or story told natively on pages people already follow for business content.", tags: ["Native reels", "Carousels", "Multi-page runs"], href: "/campaigns" },
  { title: "Founder & podcast features", body: "One sit-down turned into weeks of clips that run across the network.", tags: ["Interviews", "Clips", "Cross-posting"], href: "/clipping" },
  { title: "Funding & launch announcements", body: "Raised a round or shipped something big? We put it in front of the people who care.", tags: ["Funding news", "Launches", "Milestones"], href: "/services" },
  { title: "Content for your own channels", body: "The same team that runs our pages, running yours: strategy, production and posting.", tags: ["Social", "Video", "Performance"], href: "/services" },
];

export default function Home() {
  useScrollToTop();
  const [, setLocation] = useLocation();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader activeSection="top" />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">

      <section id="top" className="relative z-10 min-h-[85svh] w-full overflow-hidden bg-[#0d0f0f] sm:min-h-[92vh]">
        <motion.img
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          src={heroImage}
          alt="SoloDac signal artwork"
          className="hero-art absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-center"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/70 to-transparent sm:h-64" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/85 via-black/40 to-transparent sm:w-3/4" />

        <Reveal delay={0.25} className="absolute inset-x-0 top-[88px] px-5 sm:top-[108px] sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-5">
            <div className="flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-coral">
              <Flame size={12} className="animate-pulse" />
              Q4 booking is open, 3 campaign slots left
            </div>
            <h1 className="max-w-lg font-display text-4xl font-black leading-[0.95] tracking-[-0.06em] text-paper sm:max-w-xl sm:text-6xl lg:text-7xl">
              Get your brand <span className="text-coral">seen at scale.</span>
            </h1>
            <p className="max-w-sm text-sm leading-snug text-white/70 sm:max-w-md sm:text-base">
              We build the content, channels, and campaigns that put you in front of people. That&apos;s the whole job, and every brand sitting on Q4 budget is about to give it to someone.
            </p>
            <button
              onClick={() => setLocation("/marketing")}
              className="group flex items-center gap-2 rounded-full bg-lime px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5 sm:text-sm"
            >
              Lock in your Q4 slot <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </Reveal>

      </section>

      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-ink py-4">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={index} className="flex items-center gap-8">{item}<span className="text-lime">◆</span></span>
          ))}
        </div>
      </div>

      <section className="signal-section relative z-10 bg-ink px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> The network</div>
              <h2 className="max-w-2xl font-display text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">Five brands. One audience that wants business stories.</h2>
            </div>
            <p className="max-w-xs text-sm text-white/45">626K+ followers on the pages below alone, before the extended partner network.</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {brands.map((brand, index) => (
              <Reveal key={brand.handle} delay={index * 0.05}>
                <a href={`https://www.instagram.com/${brand.handle}/`} target="_blank" rel="noreferrer" className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-lime/50">
                  <div className="flex items-start justify-between">
                    <img src={brand.logo} alt={`${brand.name} logo`} className="h-14 w-14 rounded-full object-cover" />
                    <ArrowUpRight size={16} className="text-white/30 transition-colors group-hover:text-lime" />
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 font-display text-xl font-black tracking-[-0.04em]">
                    {brand.name}
                    {brand.verified && <BadgeCheck size={16} className="text-lime" />}
                  </div>
                  <div className="mt-1 text-xs text-white/40">@{brand.handle}</div>
                  <p className="mt-3 flex-1 text-sm text-white/55">{brand.niche}</p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <div className="font-display text-2xl font-black tracking-[-0.04em]">{brand.followers}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">Followers</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="signal-section relative z-10 overflow-hidden bg-ink py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime"><span className="h-px w-10 bg-lime" /> Selected work</div>
              <h2 className="max-w-2xl font-display text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">Videos doing the actual work.</h2>
            </div>
            <p className="max-w-xs text-sm text-white/40">Real reels from pages we run. Tap any card to see the post.</p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <PartnershipsMarquee partners={partners} />
        </Reveal>
      </section>

      <section className="signal-section relative z-10 border-y border-ink/10 bg-paper px-5 py-12 text-ink sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-8">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/45"><span className="h-px w-10 bg-coral" /> What brands get</div>
            <h2 className="max-w-2xl font-display text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">Your story, on pages <span className="text-coral">people already trust.</span></h2>
          </Reveal>
          <div className="border-t border-ink/15">
            {offerings.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Link href={item.href} className="group grid gap-4 border-b border-ink/15 py-7 transition-colors hover:bg-ink/[0.03] sm:grid-cols-[3rem_1fr_1fr_auto] sm:items-center sm:gap-8 sm:px-3">
                  <span className="font-mono text-xs text-ink/40">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-black tracking-[-0.05em] sm:text-3xl">{item.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">{item.body}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => <span key={tag} className="rounded-full border border-ink/15 px-3 py-1 text-[11px] font-bold text-ink/60">{tag}</span>)}
                  </div>
                  <ArrowUpRight size={20} className="hidden text-ink/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-coral sm:block" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-coral px-5 py-10 text-ink sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Have a good problem to solve?</h2>
          <button onClick={() => setLocation("/marketing")} className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1">Book a call <ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
        </div>
      </section>

      <footer className="relative z-10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span><span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span></div><p className="mt-3 text-xs text-white/40">Digital media, content & growth.</p></div><div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40"><Link href="/services" className="hover:text-lime">Services</Link><Link href="/network" className="hover:text-lime">Network</Link><Link href="/approach" className="hover:text-lime">Approach</Link><button onClick={() => setLocation("/marketing")} className="hover:text-lime">Contact</button><span>© 2026</span></div></div>
      </footer>
      </main>
    </>
  );
}
