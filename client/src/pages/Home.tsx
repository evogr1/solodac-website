import { ArrowUpRight, Eye, Flame, Sparkles, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { PrimaryButton, PublisherLayout, StoryCard } from "../components/publisher";
import NewsletterSignup from "../components/NewsletterSignup";
import Reveal from "../components/Reveal";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { founderOfTheWeek as pickFounderOfTheWeek, stories, storyPath, type Story } from "../lib/stories";

const byCode = (code: string) => stories.find((story) => story.code === code)!;
const lead = byCode("Dea8TEIBako");
const readThisWeek = [byCode("Def0SOMorWD"), byCode("DeXvJmrEt_n"), byCode("Deje6VcBmj-"), byCode("Dej9qb9sbWV"), byCode("DeoNDL6BOdg")];
const trending = stories.filter((story) => story.code !== lead.code).slice(0, 10);
const byDate = [...stories].sort((a, b) => parseInt(b.date) - parseInt(a.date));

function VerticalCard({ story }: { story: Story }) {
  return (
    <Link href={storyPath(story)} className="group relative block aspect-[9/16] w-[170px] shrink-0 snap-start overflow-hidden rounded-xl bg-[#111] sm:w-[190px]">
      <img src={story.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />
      <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
        <Eye size={11} /> {story.views}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="text-[10px] font-bold uppercase tracking-wider text-coral">{story.ip}</div>
        <div className="mt-1 line-clamp-3 text-sm font-extrabold leading-snug text-white">{story.title}</div>
      </div>
    </Link>
  );
}

export default function Home() {
  useScrollToTop();
  const [section, setSection] = useState(() => new URLSearchParams(window.location.search).get("section") ?? "Latest");
  const latestRef = useRef<HTMLElement>(null);
  const founderOfTheWeek = pickFounderOfTheWeek();
  const filtered = section === "Latest" ? byDate : byDate.filter((story) => story.category === section);

  const pickSection = (next: string) => {
    setSection(next);
    latestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (section !== "Latest") latestRef.current?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <PublisherLayout activeSection={section} onSection={pickSection}>
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <Link href={storyPath(lead)} className="group relative grid h-full overflow-hidden rounded-xl bg-[#111] text-white shadow-sm md:grid-cols-[minmax(0,300px)_1fr]">
            <img src={lead.image} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-30 blur-2xl" />
            <div className="relative aspect-[9/16] max-h-[420px] w-full md:max-h-none overflow-hidden md:aspect-auto md:h-full">
              <img src={lead.image} alt={lead.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#e2365b] px-3 py-1 text-[11px] font-black uppercase tracking-wider">
                <Flame size={12} /> Top story
              </span>
            </div>
            <div className="relative flex flex-col justify-end p-6 sm:p-8">
              <div className="text-[11px] font-bold uppercase tracking-wider text-coral">{lead.category} · {lead.ip}</div>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight xl:text-4xl">{lead.title}</h1>
              <p className="mt-4 max-w-lg text-white/70">{lead.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-white/55">
                <span>{lead.date} · {lead.readTime}</span>
                <span className="flex items-center gap-1"><Eye size={12} /> {lead.views} watched it</span>
              </div>
              <span className="mt-6 flex w-fit items-center gap-2 rounded bg-white px-4 py-2.5 text-xs font-black uppercase tracking-wide text-[#111] group-hover:bg-coral">
                Read the story <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <aside className="h-full rounded-xl bg-white p-5 shadow-sm">
            <h2 className="font-[Georgia,serif] text-2xl font-bold leading-tight text-[#e2365b]">What India&apos;s founders read this week</h2>
            <ol className="mt-3 divide-y divide-neutral-200">
              {readThisWeek.map((story, index) => (
                <li key={story.code}>
                  <Link href={storyPath(story)} className="group flex gap-4 py-3.5">
                    <span className="w-6 shrink-0 font-[Georgia,serif] text-3xl font-bold leading-none text-[#e2365b]">{index + 1}</span>
                    <span className="border-l border-neutral-200 pl-4">
                      <span className="block text-[15px] font-bold leading-snug group-hover:text-[#e2365b]">{story.title}</span>
                      <span className="mt-1.5 block text-xs text-neutral-500">{story.ip} · {story.readTime}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </Reveal>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold">Trending on our feeds</h2>
            <p className="text-sm text-neutral-500">The stories India&apos;s business audience is watching right now.</p>
          </div>
        </div>
        <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
          {trending.map((story) => <VerticalCard key={story.code} story={story} />)}
        </div>
      </section>

      <div className="mt-8">
        <NewsletterSignup source="homepage" />
      </div>

      <Reveal>
        <section className="mt-8 grid overflow-hidden rounded-xl bg-white shadow-sm md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#e2365b]">Founder of the week</div>
            <h2 className="mt-3 font-[Georgia,serif] text-5xl font-bold leading-none sm:text-7xl">{founderOfTheWeek.founder!.name}</h2>
            <p className="mt-4 max-w-md text-lg text-neutral-700">{founderOfTheWeek.founder!.line}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PrimaryButton href={storyPath(founderOfTheWeek)}>Read the story</PrimaryButton>
              <span className="text-xs text-neutral-500">From {founderOfTheWeek.ip} · {founderOfTheWeek.views} views</span>
            </div>
          </div>
          <Link href={storyPath(founderOfTheWeek)} className="relative min-h-[280px] overflow-hidden bg-[#111]">
            <img src={founderOfTheWeek.image} alt={founderOfTheWeek.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          </Link>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-8 overflow-hidden rounded-xl bg-[#111] text-white shadow-sm">
          <div className="grid gap-px bg-white/10 lg:grid-cols-[1.4fr_1fr]">
            <div className="bg-[#111] p-6 sm:p-10">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-coral"><Youtube size={14} /> SoloDac on YouTube</div>
              <h2 className="mt-3 font-[Georgia,serif] text-3xl font-bold leading-tight xl:text-4xl">Everyone&apos;s fighting over Instagram. Long-form is the next front, and we&apos;re already there.</h2>
              <p className="mt-4 max-w-xl text-white/65">We build long-form YouTube channels for business owners: proper shoots, proper edits, and a funnel into the business. Our own shows are next.</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <PrimaryButton href="/youtube">Build my channel</PrimaryButton>
                <a href="https://youtube.com/@lucreindia" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/60 hover:text-coral">
                  Watch Lucre on YouTube <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
            <Link href="/youtube#studio" className="group flex flex-col justify-between bg-[#1a1a1a] p-6 sm:p-10">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#3ddc84]"><Sparkles size={13} /> In development</div>
                <div className="mt-3 text-3xl font-extrabold group-hover:text-coral">FireYourEditor</div>
                <p className="mt-2 text-sm text-white/60">One prompt in, a properly edited 10-minute YouTube video out. Sorry, editors.</p>
              </div>
              <div className="mt-6 rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-xs text-white/70">
                &gt; &quot;10-min explainer, my style, b-roll, chapters&quot;
                <div className="mt-2 text-[#3ddc84]">✓ 10:24 · ready to publish</div>
              </div>
            </Link>
          </div>
        </section>
      </Reveal>

      <section ref={latestRef} className="mt-8 scroll-mt-20">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">{section === "Latest" ? "Fresh off the feed" : section}</h2>
          {section !== "Latest" && (
            <button onClick={() => setSection("Latest")} className="text-xs font-bold uppercase tracking-wide text-[#e2365b]">See all</button>
          )}
        </div>
        {filtered.length === 0 ? (
          <p className="rounded-xl bg-white p-8 text-center text-sm text-neutral-500">Nothing in {section} yet. Check back soon.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((story) => <StoryCard key={story.code} story={story} />)}
          </div>
        )}
      </section>

      <Reveal>
        <section className="mt-8 rounded-xl bg-[#111] p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-coral">SoloDac for brands</div>
              <h2 className="mt-2 max-w-2xl font-[Georgia,serif] text-3xl font-bold leading-tight">Put your story where India&apos;s business audience already is.</h2>
            </div>
            <Link href="/services" className="flex items-center gap-2 rounded bg-coral px-5 py-3 text-xs font-black uppercase tracking-wide text-ink">
              What we offer <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Campaigns across our network", line: "One brief. Every page.", href: "/services" },
              { title: "YouTube channels", line: "Long-form, built for you.", href: "/youtube" },
              { title: "Funding & launch news", line: "The right rooms hear about it.", href: "/services" },
              { title: "Native brand placements", line: "Trust, borrowed from the feed.", href: "/services" },
            ].map((item, index) => (
              <Link key={item.title} href={item.href} className="group bg-[#111] p-5 transition-colors hover:bg-white/5">
                <div className="font-mono text-xs text-coral">0{index + 1}</div>
                <div className="mt-2 font-extrabold group-hover:text-coral">{item.title}</div>
                <div className="mt-1 font-[Georgia,serif] text-sm italic text-white/60">{item.line}</div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
    </PublisherLayout>
  );
}
