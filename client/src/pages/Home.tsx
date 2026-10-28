import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import ChopShopMock from "@/components/ChopShopMock";
import Layout from "@/components/Layout";
import HeroHeadline from "@/components/effects/HeroHeadline";
import Magnetic from "@/components/effects/Magnetic";
import MeshGradient from "@/components/effects/MeshGradient";
import Reveal from "@/components/Reveal";
import { CtaBand, GhostButton, Kicker, PrimaryButton, SectionHead } from "@/components/site";
import { igUrl, networkPages, services } from "@/lib/site";

const pillars = [
  {
    tag: "Agency",
    title: "We grow yours",
    body: "YouTube channels, Instagram pages and editing for founders, creators and brands.",
    href: "/services",
  },
  {
    tag: "Network",
    title: "We run our own",
    body: "Business, founder, markets and culture pages that people open every day.",
    href: "/network",
  },
  {
    tag: "Software",
    title: "We built the tools",
    body: "Chop Shop is the editing software our team uses. Creators get access next.",
    href: "/chop-shop",
  },
];

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
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
        <div className="container relative">
          <Reveal>
            <Kicker>Media · Agency · Software</Kicker>
            <HeroHeadline
              className="font-display mt-7 max-w-6xl text-[clamp(3rem,10vw,8.5rem)] leading-[0.88]"
              lines={[
                { breakAfter: true, text: "We grow pages" },
                { text: "for a living." },
                { accent: true, className: "font-serif-i font-normal text-signal", text: "Ours first." },
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
                <Magnetic><GhostButton href="/chop-shop">See Chop Shop</GhostButton></Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Network strip */}
      <section className="border-y border-paper/10 bg-ink-2">
        <div className="container flex flex-col gap-6 py-8 xl:flex-row xl:items-center xl:gap-10">
          <div className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45">
            A few of the pages we run
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
            {networkPages.map((page) => (
              <a key={page.handle} href={igUrl(page.handle)} target="_blank" rel="noreferrer" className="group flex items-center gap-3">
                <img src={page.logo} alt="" className="h-10 w-10 rounded-full object-cover grayscale transition group-hover:grayscale-0" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-tight text-paper/85 group-hover:text-paper">{page.name}</div>
                  <div className="font-mono text-[11px] text-paper/45">{page.followers} followers</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Three businesses */}
      <section className="container py-24 sm:py-32">
        <Reveal>
          <SectionHead
            kicker="What SoloDac is"
            title={<>One team. Three businesses that feed each other.</>}
            intro="Our pages teach us what works. Our clients pay for what works. Our tools make it faster for both."
          />
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.tag} delay={index * 0.08}>
              <Link href={pillar.href} className="group flex h-full flex-col justify-between rounded-2xl border border-paper/10 bg-ink-2 p-7 transition-colors hover:border-signal/60">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">{pillar.tag}</div>
                  <h3 className="font-display mt-10 text-4xl">{pillar.title}</h3>
                  <p className="mt-3 leading-relaxed text-paper/60">{pillar.body}</p>
                </div>
                <ArrowUpRight className="mt-10 text-paper/40 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-paper/10 bg-paper text-ink">
        <div className="container py-24 sm:py-32">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Services
              </div>
              <h2 className="font-display mt-5 text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.98]">
                The work we do for our pages, done for yours.
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-signal">
              All services <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group grid gap-3 py-8 sm:grid-cols-[80px_1fr_1.2fr_40px] sm:items-center sm:gap-8"
              >
                <span className="font-mono text-sm text-ink/40">{service.number}</span>
                <span className="font-display text-3xl sm:text-4xl">{service.title}</span>
                <span className="text-ink/60">{service.line}</span>
                <ArrowUpRight className="hidden text-ink/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Network proof */}
      <section className="container py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHead
              kicker="The network"
              title={<>Five pages we put our name on. <span className="text-paper/40">Plenty we don't.</span></>}
              intro="Business, leadership, founders, markets and GenZ culture. We write, design and post every one of them in-house, every day. Brands come to us to reach these audiences."
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButton href="/network">See the network</PrimaryButton>
              <GhostButton href="/contact?service=Brand%20partnership">Advertise with us</GhostButton>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {networkPages.slice(0, 4).map((page, index) => (
              <Reveal key={page.handle} delay={index * 0.06}>
                <a href={igUrl(page.handle)} target="_blank" rel="noreferrer" className="group block h-full rounded-2xl border border-paper/10 bg-ink-2 p-6 transition-colors hover:border-paper/30">
                  <div className="flex items-center gap-3">
                    <img src={page.logo} alt="" className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold">{page.name}</div>
                      <div className="text-xs text-paper/45">@{page.handle}</div>
                    </div>
                  </div>
                  <div className="font-display mt-8 text-5xl">{page.followers}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45">followers · {page.category}</div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chop Shop */}
      <section className="relative overflow-hidden border-y border-paper/10 bg-ink-2">
        <div className="glow pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px]" />
        <div className="container relative grid gap-14 py-24 sm:py-32 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <Reveal>
            <Kicker>Chop Shop · Coming soon</Kicker>
            <h2 className="font-display mt-5 text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[0.95]">
              The editor our team uses. <span className="font-serif-i font-normal text-signal">Soon yours.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/65 sm:text-lg">
              Voiceover in, finished YouTube video out. Reference in, reel out. Topic in, carousel out. We built Chop Shop to run our own pages. Now we're opening it to creators.
            </p>
            <div className="mt-9">
              <PrimaryButton href="/chop-shop">Join the waitlist</PrimaryButton>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ChopShopMock />
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="container py-24 sm:py-32">
        <Reveal>
          <SectionHead kicker="How we work" title="Four steps. No decks full of buzzwords." />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="bg-ink p-7">
              <div className="font-mono text-sm text-signal">0{index + 1}</div>
              <div className="font-display mt-8 text-3xl">{step.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-paper/60">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Got a page, a channel or a brand that should be bigger?"
        body="Tell us where it is today. We'll tell you honestly what we'd do with it."
      />
    </Layout>
  );
}
