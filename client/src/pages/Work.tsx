import { ArrowUpRight } from "lucide-react";
import Reel from "@/components/katran/Reel";
import Layout from "@/components/Layout";
import { LogoRow } from "@/components/proof/ProofStack";
import Reveal from "@/components/Reveal";
import { CtaBand, GhostButton, PageHero, PrimaryButton } from "@/components/site";
import { indianNumber } from "@/lib/format";
import { millionViewReels, totalReelViews } from "@/lib/reels";
import { igUrl, networkPages, totalFollowers } from "@/lib/site";

const totalPosts = networkPages.reduce((sum, page) => sum + Number(page.posts), 0);

// Pages with million-view reels first, then by followers (the list is already in that order).
const reelsFor = (name: string) => millionViewReels.filter((reel) => reel.page === name);
const ordered = [...networkPages].sort((a, b) => Number(reelsFor(b.name).length > 0) - Number(reelsFor(a.name).length > 0));

const method = [
  { title: "Find the story", body: "We read, watch and save what the page's audience will care about before anyone opens an editor." },
  { title: "Write the hook", body: "Every post opens with one line that gives people a reason to stay for the next one." },
  { title: "Cut it in Katran", body: "Our editors make every reel in Katran, then fix by hand whatever it gets wrong." },
  { title: "Keep one look", body: "Each page has its own fonts, colours and caption style, so people know the post before they see the name." },
  { title: "Post on schedule", body: "Every page posts on a fixed schedule. Growth comes from showing up, not from one lucky post." },
  { title: "Read the numbers", body: "We look at what held attention and what didn't, and change what we post next." },
];

export default function Work() {
  return (
    <Layout>
      <PageHero
        title="Pages we built and still run."
        intro="The same team and tools you would hire grew every page here. They are our case studies, and they are live today."
        aside={<LogoRow size="lg" className="lg:justify-end" />}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <PrimaryButton href="/contact">Grow yours with us</PrimaryButton>
          <GhostButton href="/network">Advertise on them</GhostButton>
        </div>
      </PageHero>

      <section className="container pb-4" aria-label="All five pages together">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
            {[
              { value: indianNumber(totalFollowers), label: "followers across five pages" },
              { value: totalReelViews, label: "views on six of our reels" },
              { value: totalPosts.toLocaleString("en-IN"), label: "posts published" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-[15px] text-paper/60">{stat.label}</dt>
                <dd className="font-display text-[clamp(36px,4.4vw,64px)] leading-none tracking-[-0.03em]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {ordered.map((page) => {
        const reels = reelsFor(page.name).slice(0, 2);
        return (
          <section key={page.slug} id={page.slug} className="container scroll-mt-24 py-14 sm:py-20" aria-labelledby={`${page.slug}-title`}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
              <Reveal className="lg:col-span-5">
                <div className="flex items-center gap-4">
                  <img src={page.logo} alt="" className="h-14 w-14 rounded-full object-cover" />
                  <span className="text-[15px] leading-snug text-paper/60">
                    {page.category}
                    <span className="block">On {page.platforms.join(" and ")}</span>
                  </span>
                </div>
                <h2 id={`${page.slug}-title`} className="font-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">
                  {page.name}
                </h2>
                <p className="mt-5 max-w-md text-[18px] leading-relaxed text-paper/70">{page.tagline}</p>
                <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-6">
                  {[
                    { value: page.followers, label: "followers" },
                    { value: page.posts, label: "posts" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse">
                      <dt className="mt-1 text-[14px] text-paper/55">{stat.label}</dt>
                      <dd className="font-display text-[clamp(28px,2.6vw,40px)] leading-none tracking-[-0.02em]">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={igUrl(page.handle)}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-paper transition-colors duration-200 hover:text-signal"
                >
                  See @{page.handle} on Instagram
                  <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>

              <div className="lg:col-span-6 lg:col-start-7">
                {reels.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {reels.map((reel, index) => (
                      <Reveal key={reel.id} delay={0.08 + index * 0.06}>
                        <Reel reel={reel} />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <Reveal delay={0.08}>
                    <a
                      href={igUrl(page.handle)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${page.name} on Instagram`}
                      className="group grid aspect-[16/9] place-items-center rounded-2xl bg-ink-2 transition-colors duration-200 hover:bg-ink-3"
                    >
                      <img src={page.logo} alt="" className="h-28 w-28 rounded-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:h-40 sm:w-40" />
                    </a>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="container py-14 sm:py-20" aria-labelledby="method">
        <Reveal>
          <h2 id="method" className="font-display max-w-3xl text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">
            How we run every one of them.
          </h2>
          <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-paper/70">It is the same work we do for clients.</p>
        </Reveal>
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {method.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={(index % 3) * 0.06}>
                <h3 className="font-display text-[clamp(24px,2vw,30px)] leading-tight tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 max-w-[22rem] text-[17px] leading-relaxed text-paper/65">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Want a page like these?" body="Book a call. We'll tell you what it would take to grow yours." />
    </Layout>
  );
}
