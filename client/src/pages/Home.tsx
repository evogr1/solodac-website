import { ArrowUpRight, ChevronLeft, ChevronRight, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Cover, IpProfileCard, PublisherLayout, StoryCard, StoryMeta as Meta } from "../components/publisher";
import Reveal from "../components/Reveal";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { stories } from "../lib/stories";
import { ips } from "../lib/ips";
const byCode = (code: string) => stories.find((story) => story.href.includes(code))!;
const lead = byCode("Dea8TEIBako");
const secondary = [byCode("DeXvJmrEt_n"), byCode("Deje6VcBmj-")];
const editorsPick = [byCode("Del8wEsutna"), byCode("Dej9qb9sbWV"), byCode("Def0SOMorWD"), byCode("DeoNDL6BOdg"), byCode("DeZPGH0OLjm")];
const byDate = [...stories].sort((a, b) => parseInt(b.date) - parseInt(a.date));

export default function Home() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const [section, setSection] = useState(() => new URLSearchParams(window.location.search).get("section") ?? "Latest");
  const ipRail = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLElement>(null);

  const filtered = section === "Latest" ? byDate : byDate.filter((story) => story.category === section);

  const pickSection = (next: string) => {
    setSection(next);
    latestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (section !== "Latest") latestRef.current?.scrollIntoView({ block: "start" });
  }, []);

  const scrollRail = (direction: number) => ipRail.current?.scrollBy({ left: direction * 320, behavior: "smooth" });

  return (
    <PublisherLayout activeSection={section} onSection={pickSection}>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#e2365b] to-coral p-6 text-white sm:p-8">
            <div className="relative z-10 max-w-md">
              <h2 className="font-[Georgia,serif] text-3xl font-bold leading-tight sm:text-4xl">The feed never stops.<br />Our IPs never miss it.</h2>
              <p className="mt-3 text-sm text-white/85">India&apos;s business stories, every day, to 15.4M+ followers and 18.2B+ annual views across the SoloDac network.</p>
              <button onClick={() => setLocation("/marketing")} className="mt-5 rounded bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wide text-[#e2365b] transition-transform hover:-translate-y-0.5">
                Advertise with us
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] items-center justify-end gap-3 pr-6 xl:flex">
              {stories.slice(0, 4).map((story, index) => (
                <img key={story.href} src={story.image} alt="" className="h-[85%] rounded-lg object-cover shadow-xl" style={{ transform: `rotate(${(index - 1.5) * 3}deg)` }} />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-5 md:grid-cols-[1.35fr_1fr]">
            <Reveal>
              <a href={lead.href} target="_blank" rel="noreferrer" className="group block h-full overflow-hidden rounded-xl bg-white shadow-sm">
                <Cover story={lead} className="h-72 sm:h-96" play />
                <div className="p-5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">{lead.category}</div>
                  <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight group-hover:text-[#e2365b] sm:text-3xl">{lead.title}</h1>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{lead.excerpt}</p>
                  <div className="mt-4"><Meta story={lead} /></div>
                </div>
              </a>
            </Reveal>
            <div className="flex flex-col gap-5">
              {secondary.map((story, index) => (
                <Reveal key={story.href} delay={0.05 * (index + 1)}>
                  <a href={story.href} target="_blank" rel="noreferrer" className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
                    <Cover story={story} className="h-40" play />
                    <div className="flex-1 p-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">{story.category}</div>
                      <h2 className="mt-1.5 text-lg font-extrabold leading-snug group-hover:text-[#e2365b]">{story.title}</h2>
                      <div className="mt-3"><Meta story={story} /></div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <aside className="h-full rounded-xl bg-white p-5 shadow-sm">
              <h2 className="font-[Georgia,serif] text-3xl font-bold text-[#e2365b]">Editor&apos;s Pick</h2>
              <ol className="mt-4 divide-y divide-neutral-200">
                {editorsPick.map((story, index) => (
                  <li key={story.href}>
                    <a href={story.href} target="_blank" rel="noreferrer" className="group flex gap-4 py-4">
                      <span className="w-6 shrink-0 font-[Georgia,serif] text-3xl font-bold leading-none text-[#e2365b]">{index + 1}</span>
                      <span className="border-l border-neutral-200 pl-4">
                        <span className="block text-[15px] font-bold leading-snug group-hover:text-[#e2365b]">{story.title}</span>
                        <span className="mt-1.5 block text-xs text-neutral-500">By {story.ip} | {story.date} · {story.readTime}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          </Reveal>
        </div>

        <Reveal>
          <section className="mt-8 rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Our IPs</h2>
              <div className="flex gap-2">
                <button onClick={() => scrollRail(-1)} aria-label="Previous" className="grid h-8 w-8 place-items-center rounded-full border border-neutral-300 hover:border-[#e2365b] hover:text-[#e2365b]"><ChevronLeft size={16} /></button>
                <button onClick={() => scrollRail(1)} aria-label="Next" className="grid h-8 w-8 place-items-center rounded-full border border-neutral-300 hover:border-[#e2365b] hover:text-[#e2365b]"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div ref={ipRail} className="flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
              {ips.map((ip) => <IpProfileCard key={ip.handle} ip={ip} />)}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <Link href="/youtube" className="group mt-8 flex flex-col gap-5 rounded-xl border-2 border-[#e2365b] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#e2365b] text-white"><Youtube size={24} /></span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">New: YouTube channels</div>
                <h2 className="mt-1 text-2xl font-extrabold leading-tight group-hover:text-[#e2365b]">Everyone&apos;s chasing Instagram. We build long-form YouTube channels for business owners.</h2>
                <p className="mt-2 text-sm text-neutral-600">Proper shoots, proper edits, and a funnel into your business. Plus FireYourEditor, our one-prompt AI video editor, in development.</p>
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-2 rounded bg-[#e2365b] px-5 py-3 text-xs font-black uppercase tracking-wide text-white">Build my channel <ArrowUpRight size={14} /></span>
          </Link>
        </Reveal>

        <section ref={latestRef} className="mt-8 scroll-mt-20">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-extrabold">{section === "Latest" ? "Latest From SoloDac" : section}</h2>
            {section !== "Latest" && (
              <button onClick={() => setSection("Latest")} className="text-xs font-bold uppercase tracking-wide text-[#e2365b]">See all</button>
            )}
          </div>
          {filtered.length === 0 ? (
            <p className="rounded-xl bg-white p-8 text-center text-sm text-neutral-500">Nothing in {section} yet. Check back soon.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((story) => <StoryCard key={story.href} story={story} />)}
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
                { title: "Campaigns across our IPs", line: "One brief. Every IP.", href: undefined as string | undefined },
                { title: "YouTube channels", line: "Long-form, built for you.", href: "/youtube" },
                { title: "Funding & launch news", line: "The right rooms hear about it.", href: undefined as string | undefined },
                { title: "Native brand placements", line: "Trust, borrowed from the IP.", href: undefined as string | undefined },
              ].map((item, index) => (
                <Link key={item.title} href={item.href ?? "/services"} className="group bg-[#111] p-5 transition-colors hover:bg-white/5">
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
