import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Reel from "@/components/katran/Reel";
import Layout from "@/components/Layout";
import HeroHeadline from "@/components/effects/HeroHeadline";
import Magnetic from "@/components/effects/Magnetic";
import MeshGradient from "@/components/effects/MeshGradient";
import Reveal from "@/components/Reveal";
import { GhostButton, PrimaryButton } from "@/components/site";
import { millionViewReels } from "@/lib/reels";
import { igUrl, networkPages, services } from "@/lib/site";

const pillars = [
  {
    title: "We grow yours",
    body: "YouTube channels, Instagram pages and editing for founders, creators and brands.",
    href: "/services",
  },
  {
    title: "We run our own",
    body: "Business, leadership, founder, markets and news pages that people open every day.",
    href: "/network",
  },
  {
    title: "We built the tools",
    body: "Katran is the video editor our team uses. Creators get access next.",
    href: "/katran",
  },
];

// Sum of the pages' follower counts ("280.6K" → 280600), rounded down to the thousand.
const totalFollowers = `${Math.floor(
  networkPages.reduce((sum, page) => sum + parseFloat(page.followers) * (page.followers.endsWith("K") ? 1000 : 1), 0) / 1000,
).toLocaleString("en-US")},000`;

// 123.9 million across the six reels, said the way our readers count it.
const totalReelViews = `${Math.floor(millionViewReels.reduce((sum, reel) => sum + reel.views, 0) / 10_000_000)} crore`;

const steps = [
  { title: "Call", body: "Thirty minutes on what you have, what you want and what's in the way." },
  { title: "Plan", body: "We come back with a niche, a format and a posting schedule that we'd bet on." },
  { title: "Build", body: "Scripts, edits, designs and posts go out on schedule. You approve, we ship." },
  { title: "Report", body: "Every month you see what worked, what didn't and what we're changing." },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-44">
        <div className="pointer-events-none absolute -inset-x-[12%] -inset-y-[18%]"><MeshGradient /></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
        <div className="container relative">
          <Reveal>
            <HeroHeadline
              className="font-display max-w-6xl text-[clamp(3rem,10vw,8.5rem)] leading-[0.88]"
              lines={[
                { breakAfter: true, text: "We grow pages" },
                { breakAfter: true, text: "for a living." },
                { className: "block text-paper/45", text: "Ours first." },
              ]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-xl text-base leading-relaxed text-paper/65 sm:text-lg">
                SoloDac runs Instagram pages and YouTube channels with audiences in the hundreds of thousands. We use the same team, the same playbook and our own software to grow yours.
              </p>
              <div className="flex flex-wrap gap-3">
                <Magnetic><PrimaryButton href="/contact">Book a call</PrimaryButton></Magnetic>
                <Magnetic><GhostButton href="/katran">See Katran</GhostButton></Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Network strip */}
      <section className="bg-ink-2" aria-labelledby="our-pages">
        <div className="container py-16 sm:py-20">
          <h2 id="our-pages" className="text-[clamp(20px,2vw,26px)] font-medium leading-snug text-paper/60">
            <span className="text-paper">{totalFollowers} people</span> follow the pages we run.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {networkPages.map((page) => (
              <a key={page.handle} href={igUrl(page.handle)} target="_blank" rel="noreferrer" className="group block">
                <div className="font-display text-[clamp(40px,4.4vw,68px)] leading-none tracking-[-0.04em] transition-colors duration-200 group-hover:text-signal">
                  {page.followers}
                </div>
                <div className="mt-4 flex items-center gap-2.5">
                  <img src={page.logo} alt="" className="h-7 w-7 rounded-full object-cover" />
                  <span className="text-[15px] text-paper/75 transition-colors duration-200 group-hover:text-paper">{page.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Proof: the reels */}
      <section className="container py-24 sm:py-32" aria-labelledby="reels">
        <Reveal>
          <h2 id="reels" className="font-display max-w-4xl text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.03em]">
            Six reels from our pages. <span className="text-paper/45">{totalReelViews} views.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-paper/70">
            Each one passed a million views. All six were made with Katran, the editor we built for our own pages.
          </p>
        </Reveal>
        <div className="-mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {millionViewReels.map((reel, index) => (
            <Reveal key={reel.id} delay={index * 0.05} className="w-[62vw] max-w-[260px] shrink-0 snap-start sm:w-[34vw] lg:w-auto lg:max-w-none">
              <Reel reel={reel} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <PrimaryButton href="/network">See the network</PrimaryButton>
          <GhostButton href="/contact?service=Brand%20partnership">Advertise with us</GhostButton>
        </div>
      </section>

      {/* What SoloDac is */}
      <section className="bg-ink-2">
        <div className="container grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">One team. Three businesses.</h2>
          </Reveal>
          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.06}>
                <Link href={pillar.href} className="group block">
                  <h3 className="font-display flex items-center gap-3 text-[clamp(26px,2.4vw,36px)] leading-tight tracking-[-0.02em]">
                    {pillar.title}
                    <ArrowUpRight className="h-6 w-6 text-paper/40 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
                  </h3>
                  <p className="mt-3 max-w-[34rem] text-[18px] leading-relaxed text-paper/70">{pillar.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-paper text-ink">
        <div className="container py-24 sm:py-32">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="font-display max-w-3xl text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.98] tracking-[-0.03em]">
              The work we do for our pages, done for yours.
            </h2>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-[15px] font-semibold hover:text-signal">
              All services <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-16 space-y-10 sm:space-y-12">
            {services.map((service) => (
              <Link key={service.id} href={`/services#${service.id}`} className="group grid gap-2 sm:grid-cols-[1fr_1.2fr] sm:items-baseline sm:gap-10">
                <span className="font-display text-3xl tracking-[-0.02em] transition-colors duration-200 group-hover:text-signal sm:text-4xl">{service.title}</span>
                <span className="text-[17px] leading-relaxed text-ink/65">{service.line}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Katran */}
      <section className="container py-24 sm:py-32">
        <Reveal>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
            Katran. A full production house.
            <span className="block text-paper/45">For less than one editor's salary.</span>
          </h2>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-[18px] leading-relaxed text-paper/70">
              It writes, cuts, captions and designs for our pages every day. Creators get access next.
            </p>
            <PrimaryButton href="/katran" className="self-start sm:self-auto">See Katran</PrimaryButton>
          </div>
        </Reveal>
      </section>

      {/* How we work */}
      <section className="bg-ink-2">
        <div className="container py-24 sm:py-32">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">How we work.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <h3 className="font-display text-3xl tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-paper/65">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ask */}
      <section className="container py-24 sm:py-32">
        <Reveal>
          <h2 className="font-display max-w-4xl text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
            Got a page, a channel or a brand that should be bigger?
          </h2>
          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-paper/70">
            Tell us where it is today. We'll tell you honestly what we'd do with it.
          </p>
          <div className="mt-9">
            <Magnetic><PrimaryButton href="/contact">Book a call</PrimaryButton></Magnetic>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
