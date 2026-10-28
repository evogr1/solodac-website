import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import NetworkGlobe from "@/components/effects/NetworkGlobe";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero, PrimaryButton } from "@/components/site";
import { igUrl, networkPages } from "@/lib/site";

const offers = [
  { title: "Sponsored posts", body: "A reel or carousel about your product, written in the page's own voice so it doesn't read like an ad." },
  { title: "Story features", body: "Founder and company stories for brands that have one worth telling." },
  { title: "Launch pushes", body: "One message across several pages in the same week, when a launch needs to land." },
];

export default function Network() {
  return (
    <Layout>
      <PageHero
        backdrop={
          <NetworkGlobe className="pointer-events-none absolute -right-48 top-[52%] h-[420px] w-[420px] opacity-25 sm:-right-32 sm:top-24 sm:h-[560px] sm:w-[560px] sm:opacity-60 lg:left-[calc(50%+290px)] lg:right-auto lg:top-14 lg:h-[620px] lg:w-[620px] lg:opacity-100" />
        }
        kicker="The network"
        title={<>The pages we run. <span className="text-paper/40">The ones we'll show you.</span></>}
        intro="These are the pages that carry the SoloDac name. We run more than this across Instagram and YouTube. The rest stay unbranded on purpose."
      />

      <section className="container py-20 sm:py-28">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {networkPages.map((page, index) => (
            <Reveal key={page.handle} delay={(index % 3) * 0.06}>
              <a
                href={igUrl(page.handle)}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-paper/10 bg-ink-2 p-7 transition-colors hover:border-signal/60"
              >
                <div className="flex items-start justify-between">
                  <img src={page.logo} alt={`${page.name} logo`} className="h-16 w-16 rounded-full object-cover" />
                  <span className="rounded-full border border-paper/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/55">{page.category}</span>
                </div>
                <h2 className="font-display mt-8 text-3xl">{page.name}</h2>
                <div className="text-sm text-paper/45">@{page.handle}</div>
                <p className="mt-4 flex-1 leading-relaxed text-paper/65">{page.tagline}</p>
                <div className="mt-8 flex items-end justify-between border-t border-paper/10 pt-6">
                  <div>
                    <div className="font-display text-4xl">{page.followers}</div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45">followers · {page.posts} posts</div>
                  </div>
                  <ArrowUpRight className="text-paper/40 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
                </div>
              </a>
            </Reveal>
          ))}

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-paper/20 p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">And the rest</div>
              <div>
                <h2 className="font-display mt-8 text-3xl">Pages and channels we don't name.</h2>
                <p className="mt-4 leading-relaxed text-paper/60">
                  Long-form YouTube channels and niche Instagram pages across the US, UK and India. Ask us on a call and we'll walk you through the ones that fit your brief.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-paper/10 bg-paper text-ink">
        <div className="container grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" /> For brands
            </div>
            <h2 className="font-display mt-5 text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.98]">Put your brand in front of these audiences.</h2>
            <p className="mt-5 max-w-md text-ink/65">We only take partnerships that fit the page. That's why people still trust what the pages post.</p>
            <div className="mt-9">
              <PrimaryButton href="/contact?service=Brand%20partnership" className="hover:bg-ink hover:text-paper">Advertise with us</PrimaryButton>
            </div>
          </div>
          <div className="grid gap-3">
            {offers.map((offer) => (
              <div key={offer.title} className="rounded-2xl border border-ink/10 bg-paper-2 p-6 sm:p-7">
                <div className="font-display text-2xl">{offer.title}</div>
                <p className="mt-2 text-ink/65">{offer.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want a page like these for your brand?" body="We build and run pages for founders and companies with the same team that runs ours." />
    </Layout>
  );
}
