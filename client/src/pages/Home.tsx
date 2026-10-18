import { ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight, Eye, Play } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import PublisherHeader from "../components/PublisherHeader";
import Reveal from "../components/Reveal";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { stories, type Story } from "../lib/stories";
import saLogo from "../assets/partners/successfularcs.jpg";
import aocLogo from "../assets/partners/archiveofceos.jpg";
import virodhLogo from "../assets/partners/virodh.jpg";
import bourseLogo from "../assets/partners/bourse.jpg";
import lucreLogo from "../assets/partners/lucre.jpg";

const ips = [
  { name: "Successful Arcs", handle: "successfularcs", category: "Business", followers: "280.6K", posts: "380", logo: saLogo, verified: true },
  { name: "Archive of CEOs", handle: "archiveofceos", category: "Leadership", followers: "265.4K", posts: "283", logo: aocLogo, verified: true },
  { name: "Virodh", handle: "virodhindia", category: "GenZ & Culture", followers: "35K", posts: "194", logo: virodhLogo, verified: false },
  { name: "Bourse India", handle: "bourseindiaa", category: "News & Events", followers: "29.1K", posts: "766", logo: bourseLogo, verified: false },
  { name: "Lucre", handle: "lucreindia", category: "Founders", followers: "15.9K", posts: "92", logo: lucreLogo, verified: false },
];

const byViews = [...stories];
const lead = byViews[0];
const secondary = byViews.slice(1, 3);
const editorsPick = [byViews[3], byViews[4], byViews[8], byViews[9], byViews[13]];
const byDate = [...stories].sort((a, b) => parseInt(b.date) - parseInt(a.date));

function Cover({ story, className = "", play = false }: { story: Story; className?: string; play?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-[#1a1a1a] ${className}`}>
      <img src={story.image} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-xl" />
      <img src={story.image} alt={story.title} className="relative mx-auto h-full object-contain transition-transform duration-500 group-hover:scale-105" />
      {play && (
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
          <Play size={11} fill="currentColor" /> {story.readTime}
        </span>
      )}
    </div>
  );
}

function Meta({ story, light = false }: { story: Story; light?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${light ? "text-white/60" : "text-neutral-500"}`}>
      <span className={`font-semibold ${light ? "text-white/80" : "text-neutral-700"}`}>{story.ip}</span>
      <span>·</span>
      <span>{story.date}</span>
      <span>·</span>
      <span className="flex items-center gap-1"><Eye size={12} /> {story.views}</span>
    </div>
  );
}

export default function Home() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const [section, setSection] = useState("Latest");
  const ipRail = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLElement>(null);

  const filtered = section === "Latest" ? byDate : byDate.filter((story) => story.category === section);

  const pickSection = (next: string) => {
    setSection(next);
    latestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollRail = (direction: number) => ipRail.current?.scrollBy({ left: direction * 320, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-neutral-900">
      <PublisherHeader activeSection={section} onSection={pickSection} />

      <main className="mx-auto max-w-[1320px] px-4 py-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#e2365b] to-coral p-6 text-white sm:p-8">
            <div className="relative z-10 max-w-md">
              <h2 className="font-[Georgia,serif] text-3xl font-bold leading-tight sm:text-4xl">The feed never stops.<br />Our IPs never miss it.</h2>
              <p className="mt-3 text-sm text-white/85">India&apos;s business stories, told daily across five media brands with 626K+ followers.</p>
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
              {ips.map((ip) => (
                <a key={ip.handle} href={`https://www.instagram.com/${ip.handle}/`} target="_blank" rel="noreferrer" className="group w-[260px] shrink-0 snap-start rounded-lg border border-neutral-200 p-4 transition-colors hover:border-[#e2365b]">
                  <div className="flex items-center gap-3">
                    <img src={ip.logo} alt={`${ip.name} logo`} className="h-12 w-12 rounded-full object-cover" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 truncate font-extrabold">{ip.name}{ip.verified && <BadgeCheck size={15} className="shrink-0 text-[#e2365b]" />}</div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#e2365b]">Full Profile <ArrowUpRight size={12} /></div>
                    </div>
                  </div>
                  <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-neutral-200 pt-3 text-xs">
                    <div><dt className="text-neutral-500">Category</dt><dd className="mt-0.5 font-bold">{ip.category}</dd></div>
                    <div><dt className="text-neutral-500">Followers</dt><dd className="mt-0.5 font-bold">{ip.followers}</dd></div>
                    <div><dt className="text-neutral-500">Posts</dt><dd className="mt-0.5 font-bold">{ip.posts}</dd></div>
                  </dl>
                </a>
              ))}
            </div>
          </section>
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
              {filtered.map((story) => (
                <a key={story.href} href={story.href} target="_blank" rel="noreferrer" className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
                  <Cover story={story} className="h-44" play />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">{story.category}</div>
                    <h3 className="mt-1.5 flex-1 font-extrabold leading-snug group-hover:text-[#e2365b]">{story.title}</h3>
                    <div className="mt-3"><Meta story={story} /></div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <Reveal>
          <section className="mt-8 grid gap-6 rounded-xl bg-[#111] p-6 text-white sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-coral">SoloDac for brands</div>
              <h2 className="mt-2 font-[Georgia,serif] text-3xl font-bold leading-tight">Put your story where India&apos;s business audience already is.</h2>
              <p className="mt-2 max-w-xl text-sm text-white/65">Native campaigns, founder features, funding and launch news, run across our IPs.</p>
            </div>
            <Link href="/services" className="flex items-center gap-2 justify-self-start rounded bg-coral px-5 py-3 text-xs font-black uppercase tracking-wide text-ink">
              What we offer <ArrowUpRight size={14} />
            </Link>
          </section>
        </Reveal>
      </main>

      <section className="relative z-10 mt-10 bg-coral px-5 py-10 text-ink sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <h2 className="max-w-xl font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl">Have a good problem to solve?</h2>
          <button onClick={() => setLocation("/marketing")} className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1">Book a call <ArrowUpRight size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
        </div>
      </section>

      <footer className="bg-[#111] px-4 py-10 text-white/70">
        <div className="mx-auto grid max-w-[1320px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-white"><span className="grid h-7 w-7 place-items-center rounded-full bg-coral"><span className="h-2.5 w-2.5 rounded-full bg-[#111]" /></span><span className="font-display text-2xl font-black tracking-[-0.06em]">SoloDac</span></div>
            <p className="mt-3 max-w-xs text-sm">A digital media company telling India&apos;s business stories across five IPs.</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Our IPs</div>
            <ul className="mt-3 space-y-2 text-sm">{ips.map((ip) => <li key={ip.handle}><a href={`https://www.instagram.com/${ip.handle}/`} target="_blank" rel="noreferrer" className="hover:text-coral">{ip.name}</a></li>)}</ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Company</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/approach" className="hover:text-coral">About</Link></li>
              <li><Link href="/services" className="hover:text-coral">Services</Link></li>
              <li><Link href="/clipping" className="hover:text-coral">Clipping</Link></li>
              <li><Link href="/careers" className="hover:text-coral">Careers</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Advertise</div>
            <p className="mt-3 text-sm">Reach our audience across every IP.</p>
            <a href="mailto:info@solodac.com" className="mt-2 inline-block text-sm font-bold text-coral">info@solodac.com</a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1320px] border-t border-white/10 pt-5 text-xs text-white/40">© 2026 SoloDac. All rights reserved.</div>
      </footer>
    </div>
  );
}
