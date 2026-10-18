import { ArrowUpRight, BadgeCheck } from "lucide-react";
import Reveal from "../components/Reveal";
import { IpProfileCard, PageHero, Panel, PrimaryButton, PublisherLayout, SectionTitle, StatStrip, StoryCard } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { igUrl, ips } from "../lib/ips";
import { stories } from "../lib/stories";

const ownedHandles = ["millionairesformula", "successfularcs", "archiveofceos", "businessedgex", "bourseindiaa", "virodhindia", "lucreindia", "howaitechworks", "explorenow.ai"];
const extendedHandles = ["archiveofoceans", "ceosformula", "krefion", "motivation_hustling", "themillionairemagnate", "powerbymindset", "bizknock"];

const niches = [
  { name: "Business", ip: "Successful Arcs" },
  { name: "Leadership", ip: "Archive of CEOs" },
  { name: "Founders", ip: "Lucre" },
  { name: "News & events", ip: "Bourse India" },
  { name: "GenZ & culture", ip: "Virodh" },
  { name: "Markets & tech", ip: "Partner network" },
];

export default function Network() {
  useScrollToTop();
  const [flagship, ...rest] = ips;
  const flagshipStories = stories.filter((story) => story.ip === flagship.name).slice(0, 3);

  return (
    <PublisherLayout ctaTitle="Want your brand on the network?">
      <PageHero
        crumb="Our IPs"
        kicker="The SoloDac network"
        title="We don't rent the audience. We own it."
        deck="Media brands we built and run, plus a partner network on top. A focused audience when you want one niche, the whole network when you want scale."
      >
        <PrimaryButton href="/marketing">Advertise across our IPs</PrimaryButton>
      </PageHero>

      <div className="mt-6">
        <StatStrip
          items={[
            { value: "15.4M", label: "Followers" },
            { value: "18.2B+", label: "Annual views" },
            { value: "121M", label: "Accounts reached" },
            { value: "89.6M", label: "Interactions" },
            { value: "101K", label: "Newsletter subs" },
          ]}
        />
      </div>

      <Panel className="mt-8">
        <SectionTitle number="01">Niches we own</SectionTitle>
        <div className="grid gap-px overflow-hidden rounded-lg bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
          {niches.map((niche) => (
            <div key={niche.name} className="flex items-center justify-between bg-white p-5">
              <div>
                <div className="text-lg font-extrabold">{niche.name}</div>
                <div className="text-xs text-neutral-500">{niche.ip}</div>
              </div>
              <span className={`rounded px-2 py-1 text-[10px] font-black uppercase tracking-wider ${niche.ip === "Partner network" ? "bg-neutral-100 text-neutral-500" : "bg-[#e2365b]/10 text-[#e2365b]"}`}>
                {niche.ip === "Partner network" ? "Partner" : "Owned"}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <div className="mt-8">
        <SectionTitle number="02">Flagship IP</SectionTitle>
        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <Reveal>
            <a href={igUrl(flagship.handle)} target="_blank" rel="noreferrer" className="group flex h-full flex-col rounded-xl bg-gradient-to-br from-[#e2365b] to-coral p-6 text-white shadow-sm">
              <img src={flagship.logo} alt={`${flagship.name} logo`} className="h-20 w-20 rounded-full object-cover ring-4 ring-white/30" />
              <div className="mt-6 flex items-center gap-2 text-3xl font-extrabold">{flagship.name} <BadgeCheck size={22} /></div>
              <p className="mt-2 flex-1 text-white/85">{flagship.tagline}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/25 pt-4">
                <div><div className="text-2xl font-extrabold">{flagship.followers}</div><div className="text-[11px] uppercase tracking-wider text-white/75">Followers</div></div>
                <div><div className="text-2xl font-extrabold">794.8K</div><div className="text-[11px] uppercase tracking-wider text-white/75">Views, top reel</div></div>
              </div>
              <span className="mt-5 flex items-center gap-1 text-xs font-bold uppercase tracking-wide">Follow on Instagram <ArrowUpRight size={13} /></span>
            </a>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {flagshipStories.map((story) => <StoryCard key={story.href} story={story} />)}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <SectionTitle number="03">All our IPs</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((ip) => <IpProfileCard key={ip.handle} ip={ip} wide />)}
        </div>
      </div>

      <Panel className="mt-8">
        <SectionTitle number="04">Network directory</SectionTitle>
        <p className="-mt-2 mb-5 max-w-2xl text-sm text-neutral-600">Every handle here is real and live. The extended partner network adds 45 more pages on top: another 17.1M followers and 15B+ annual views.</p>
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">Owned</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {ownedHandles.map((handle) => (
            <a key={handle} href={igUrl(handle)} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full border border-[#e2365b]/30 bg-[#e2365b]/5 px-3 py-1.5 text-xs font-bold text-neutral-800 hover:border-[#e2365b] hover:text-[#e2365b]">@{handle}<ArrowUpRight size={11} /></a>
          ))}
        </div>
        <div className="mt-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500">Extended network</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {extendedHandles.map((handle) => (
            <a key={handle} href={igUrl(handle)} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-600 hover:border-neutral-400">@{handle}<ArrowUpRight size={11} /></a>
          ))}
        </div>
      </Panel>
    </PublisherLayout>
  );
}
