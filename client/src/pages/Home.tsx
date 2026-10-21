import { ArrowRight, ArrowUpRight, Sparkles, Youtube } from "lucide-react";
import { Link } from "wouter";
import NewsletterSignup from "../components/NewsletterSignup";
import Reveal from "../components/Reveal";
import { PublisherLayout, SectionTitle, StoryCard } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { igUrl, ips } from "../lib/ips";
import { servicePath, services } from "../lib/services";
import { stories } from "../lib/stories";

const heroStats = [
  { value: "15.4M+", label: "Followers across the network" },
  { value: "18.2B+", label: "Views a year" },
  { value: "121M", label: "Accounts reached" },
];

const studioPicks = services.slice(0, 5);
const newsroomPicks = [stories[0], stories[2], stories[3]];
const workTicker = stories.filter((story) => story.image).slice(0, 10);

export default function Home() {
  useScrollToTop();

  return (
    <PublisherLayout>
      {/* Hero */}
      <section className="pb-14 pt-10 sm:pb-20 sm:pt-16">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">
            SoloDac <span className="text-pink">◆</span> A digital media company
          </div>
          <h1 className="font-headline mt-6 text-[clamp(3.4rem,10vw,9rem)] leading-[0.9] text-green">
            India scrolls.
            <br />
            We make it <span className="font-accent text-pink">stop.</span>
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <p className="max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
              We run business media brands that millions of Indians watch every day, and we build the channels, brands and websites for the people who want that attention.
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-4">
              <Link href="/marketing" className="group flex items-center gap-2 rounded-full bg-green px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink">
                Book a call <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link href="/network" className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink/60 underline-offset-4 hover:text-pink hover:underline">
                See the network
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-paper px-6 py-7">
                <div className="font-headline text-5xl text-ink sm:text-6xl">{stat.value}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Work strip */}
      <Reveal>
        <div className="-mx-4 overflow-hidden border-y border-ink/10 bg-ink py-4 sm:-mx-6">
          <div className="marquee-track flex w-max items-center gap-3 px-4">
            {[...workTicker, ...workTicker].map((story, index) => (
              <img key={index} src={story.image} alt="" className="h-28 w-20 rounded-lg object-cover opacity-80 transition-opacity hover:opacity-100 sm:h-36 sm:w-24" />
            ))}
          </div>
        </div>
      </Reveal>

      {/* What we do */}
      <section className="py-14 sm:py-20">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-pink">01 / SoloDac Studio</div>
          <h2 className="font-headline mt-3 max-w-3xl text-4xl leading-[0.95] text-ink sm:text-6xl">
            What we <span className="font-accent text-pink">actually</span> do.
          </h2>
        </Reveal>
        <div className="mt-10 border-t border-ink/10">
          {studioPicks.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.04}>
              <Link href={servicePath(service)} className="group grid items-center gap-3 border-b border-ink/10 py-6 sm:grid-cols-[4rem_1fr_auto] sm:gap-8">
                <span className="font-mono text-sm text-ink/35">{service.number}</span>
                <div>
                  <h3 className="font-headline text-2xl text-ink transition-colors group-hover:text-green sm:text-4xl">{service.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/55">{service.description}</p>
                </div>
                <ArrowRight size={22} className="hidden shrink-0 text-ink/25 transition-all group-hover:translate-x-2 group-hover:text-pink sm:block" />
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <Link href="/services" className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-green hover:text-pink">
            Everything the Studio does <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </section>

      {/* Network / proof */}
      <section className="-mx-4 bg-ink px-4 py-14 text-paper sm:-mx-6 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-greenbright">02 / The network</div>
            <h2 className="font-headline mt-3 max-w-3xl text-4xl leading-[0.95] sm:text-6xl">
              Media brands we own, <span className="font-accent text-pink">not rent.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/60 sm:text-base">
              Business, leadership, founders, news and GenZ culture. Every campaign we run starts with an audience that already trusts these pages.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {ips.map((ip, index) => (
              <Reveal key={ip.handle} delay={index * 0.05}>
                <a href={igUrl(ip.handle)} target="_blank" rel="noreferrer" className="group flex h-full flex-col rounded-2xl border border-paper/10 bg-paper/5 p-5 transition-all hover:-translate-y-1 hover:border-greenbright/60">
                  <img src={ip.logo} alt={`${ip.name} logo`} className="h-12 w-12 rounded-full object-cover" />
                  <div className="mt-4 font-bold tracking-tight">{ip.name}</div>
                  <div className="mt-1 flex-1 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/40">{ip.category}</div>
                  <div className="mt-4 border-t border-paper/10 pt-3">
                    <span className="font-headline text-2xl text-greenbright">{ip.followers}</span>
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/40">followers</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <Link href="/network" className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-greenbright hover:text-pink">
              The whole network <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Newsroom strip */}
      <section className="py-14 sm:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-pink">03 / From the newsroom</div>
              <h2 className="font-headline mt-3 text-4xl leading-[0.95] text-ink sm:text-6xl">Fresh off the feed.</h2>
            </div>
            <Link href="/stories" className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-green hover:text-pink">All stories →</Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {newsroomPicks.map((story, index) => (
            <Reveal key={story.slug} delay={index * 0.06}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* YouTube + FireYourEditor */}
      <Reveal>
        <section className="-mx-4 bg-ink px-4 py-14 text-paper sm:-mx-6 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-greenbright"><Youtube size={14} /> 04 / The next front</div>
              <h2 className="font-headline mt-4 text-4xl leading-[0.95] sm:text-6xl">
                Everyone fights over Instagram. We&apos;re building <span className="font-accent text-pink">long-form.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/60 sm:text-base">
                YouTube channels for business owners: positioning, proper shoots, proper edits, and a funnel into the business.
              </p>
              <Link href="/youtube" className="group mt-7 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-pink hover:text-paper">
                Build my channel <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
            <Link href="/youtube#studio" className="group rounded-2xl border border-paper/15 bg-paper/5 p-7 transition-colors hover:border-greenbright/60">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-greenbright"><Sparkles size={13} /> In development</div>
              <div className="font-headline mt-3 text-3xl group-hover:text-pink">FireYourEditor</div>
              <p className="mt-2 text-sm text-paper/55">One prompt in, a properly edited 10-minute YouTube video out. <span className="font-accent text-pink">Sorry, editors.</span></p>
              <div className="mt-6 rounded-xl border border-paper/10 bg-ink p-4 font-mono text-xs text-paper/60">
                &gt; "10-min explainer, my style, b-roll, chapters"
                <div className="mt-2 text-greenbright">✓ 10:24 · ready to publish</div>
              </div>
            </Link>
          </div>
        </section>
      </Reveal>

      {/* Newsletter */}
      <section className="py-14 sm:py-20">
        <SectionTitle number="05">One email. Five minutes.</SectionTitle>
        <NewsletterSignup source="homepage" />
      </section>
    </PublisherLayout>
  );
}
