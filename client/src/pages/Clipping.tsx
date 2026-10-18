import { Check, Clapperboard, Network, Sparkles } from "lucide-react";
import { Link } from "wouter";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PrimaryButton, PublisherLayout, SectionTitle, StatStrip, Tag } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";

const tracks = [
  {
    icon: Clapperboard,
    label: "Repurposing",
    title: "Turn one long video into ten reasons to be found.",
    description: "Send us your podcast, stream, or long-form video. We find the moments that actually land, cut them for the platform they're going to, and hand back a batch of clips ready to post: captioned, paced, and shaped to earn the first three seconds.",
    bullets: ["Podcasts & YouTube long-form", "Livestream VODs", "Talking-head & interviews", "Captioned, hook-first edits"],
  },
  {
    icon: Network,
    label: "Clip network",
    title: "A network of clippers, posting your content everywhere at once.",
    description: "We run and pay a roster of clip accounts that post cuts of your content across TikTok, Reels, and Shorts. More accounts, more posts, more shots at the algorithm, tracked and reported so you can see exactly what reach it bought you.",
    bullets: ["Whitelisted clipper roster", "Multi-platform distribution", "Per-clip / per-view payout tracking", "Weekly reach reporting"],
  },
];

const pricing = [
  { name: "Starter", price: "$750", period: "/mo", tagline: "For testing whether clipping is worth your budget.", features: ["Up to 20 clips / month", "1 source (podcast, stream, or channel)", "Captioned, platform-ready edits", "Monthly performance recap"], highlight: false },
  { name: "Growth", price: "$1,800", period: "/mo", tagline: "Repurposing plus a small clip network running alongside it.", features: ["Up to 60 clips / month", "Up to 2 sources", "10-account clip network distribution", "Bi-weekly reporting", "Hook & thumbnail testing"], highlight: true },
  { name: "Scale", price: "Custom", period: "", tagline: "Full clip farm running at volume across your catalog.", features: ["Unlimited clips", "Unlimited sources", "30+ account clip network", "Dedicated editor + strategist", "Weekly reporting & payout tracking"], highlight: false },
];

const steps = [
  { title: "Send us the footage", body: "Drop a link to your podcast, stream, or channel, or give us access to pull from." },
  { title: "We cut the batch", body: "Editors find the moments, cut and caption them, and send a batch back for approval." },
  { title: "You approve, we post", body: "Approve the batch, and we schedule it across your channels or the clip network." },
  { title: "You get the numbers", body: "Views, reach, and payout tracking, reported on the cadence your plan includes." },
];

export default function Clipping() {
  useScrollToTop();

  return (
    <PublisherLayout ctaTitle="Stop leaving clips on the table.">
      <PageHero
        crumb="Clipping"
        kicker="SoloDac / Clipping"
        title="Your long-form, cut into everywhere."
        deck="We clip your podcasts, streams, and videos into short-form that gets watched. Want more than that? We run a network of clip accounts to post it everywhere at once."
      >
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryButton href="/marketing">Book a clipping call</PrimaryButton>
          <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="text-xs font-bold uppercase tracking-wide text-neutral-500 hover:text-[#e2365b]">See pricing</button>
        </div>
      </PageHero>

      <div className="mt-6">
        <StatStrip items={[{ value: "18B+", label: "Views a year across our IPs" }, { value: "300+", label: "Clips cut in an average month" }, { value: "48h", label: "Raw footage to first batch" }]} />
      </div>

      <div className="mt-8">
        <SectionTitle number="01">Two ways to run it</SectionTitle>
        <div className="grid gap-5 lg:grid-cols-2">
          {tracks.map((track, index) => (
            <Reveal key={track.label} delay={index * 0.05}>
              <Panel className="h-full">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#e2365b]/10 text-[#e2365b]"><track.icon size={20} /></span>
                <div className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">{track.label}</div>
                <h3 className="mt-1 text-2xl font-extrabold">{track.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{track.description}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {track.bullets.map((bullet) => <div key={bullet} className="flex items-start gap-2 text-sm text-neutral-700"><Check size={15} className="mt-0.5 shrink-0 text-[#e2365b]" />{bullet}</div>)}
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>

      <div id="pricing" className="mt-8 scroll-mt-20">
        <SectionTitle number="02">Pick your volume</SectionTitle>
        <div className="grid gap-5 lg:grid-cols-3">
          {pricing.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.05}>
              <div className={`flex h-full flex-col rounded-xl bg-white p-6 shadow-sm ${tier.highlight ? "ring-2 ring-[#e2365b]" : ""}`}>
                {tier.highlight && <div className="mb-3 inline-flex w-fit items-center gap-1 rounded bg-[#e2365b] px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white"><Sparkles size={11} /> Most popular</div>}
                <h3 className="text-xl font-extrabold">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1"><span className="text-4xl font-extrabold">{tier.price}</span>{tier.period && <span className="text-sm text-neutral-500">{tier.period}</span>}</div>
                <p className="mt-3 text-sm text-neutral-600">{tier.tagline}</p>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-neutral-200 pt-5">
                  {tier.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm"><Check size={15} className="mt-0.5 shrink-0 text-[#e2365b]" />{feature}</li>)}
                </ul>
                <Link href="/marketing" className={`mt-6 rounded py-3 text-center text-xs font-black uppercase tracking-wide ${tier.highlight ? "bg-[#e2365b] text-white" : "border border-neutral-300 hover:border-[#e2365b] hover:text-[#e2365b]"}`}>Get started</Link>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-xs text-neutral-500">Starting points. Every plan gets scoped to your footage and goals on the call.</p>
      </div>

      <Panel className="mt-8">
        <SectionTitle number="03">How it runs</SectionTitle>
        <ol className="grid gap-px overflow-hidden rounded-lg bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <li key={item.title} className="bg-white p-5">
              <div className="font-mono text-xs text-[#e2365b]">0{index + 1}</div>
              <div className="mt-2 text-lg font-extrabold">{item.title}</div>
              <p className="mt-1.5 text-sm text-neutral-600">{item.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap gap-2">{["TikTok", "Instagram Reels", "YouTube Shorts"].map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
      </Panel>
    </PublisherLayout>
  );
}
