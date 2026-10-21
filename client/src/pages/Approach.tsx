import { Globe2, Instagram, X, Youtube } from "lucide-react";
import Reveal from "../components/Reveal";
import { IpProfileCard, PageHero, Panel, PrimaryButton, PublisherLayout, SectionTitle } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { ips } from "../lib/ips";

const steps = [
  { title: "Find the real story", body: "Every business has one thing that's actually true and interesting about it. We find that, not whatever trend is working for everyone else this month." },
  { title: "Build the system", body: "Content, channels, creative, tracking, built as one system your team can keep running after we hand it off. Not a pile of one-off posts." },
  { title: "Make it travel", body: "We publish, watch what happens, cut what isn't working, and push on what is, until the work shows up where your audience already spends time." },
];

const process = [
  { step: "Brief", body: "A 30-minute call. What you're launching, who needs to see it, and by when." },
  { step: "Plan", body: "Which IPs, which formats, how many posts, in what order. One page, signed off." },
  { step: "Produce", body: "Our team writes, shoots and edits in the voice each IP's audience already trusts." },
  { step: "Distribute", body: "Sequenced across our IPs and partners so people see it more than once." },
  { step: "Report", body: "Views, reach and engagement per post, with what we'd do differently next time." },
];

const channels = [
  { icon: Instagram, name: "Instagram", detail: "Reels, carousels, stories" },
  { icon: Youtube, name: "YouTube", detail: "Shorts, long-form" },
  { icon: X, name: "X / Twitter", detail: "Threads, launches" },
  { icon: Globe2, name: "Web", detail: "Search, landing pages" },
];

export default function Approach() {
  useScrollToTop();

  return (
    <PublisherLayout ctaTitle="Ready to build the system?">
      <PageHero
        crumb="About"
        kicker="About SoloDac"
        title={<>We&apos;d rather make one thing people <span className="text-green">share and engage with</span>, rather than ten things they scroll past.</>}
        deck="SoloDac is a digital media company. We build and run business media brands, and we put other brands in front of the audiences those IPs have earned."
      >
        <PrimaryButton href="/network">See our IPs</PrimaryButton>
      </PageHero>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {steps.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <Panel className="h-full">
              <span className="font-accent text-4xl font-bold text-green">{index + 1}</span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</p>
            </Panel>
          </Reveal>
        ))}
      </div>

      <Panel className="mt-8">
        <SectionTitle number="01">How a campaign runs</SectionTitle>
        <ol className="grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((item, index) => (
            <li key={item.step} className="bg-white p-5">
              <div className="font-mono text-xs text-green">0{index + 1}</div>
              <div className="mt-2 text-lg font-bold tracking-tight">{item.step}</div>
              <p className="mt-1.5 text-sm text-ink/65">{item.body}</p>
            </li>
          ))}
        </ol>
      </Panel>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Panel>
          <SectionTitle number="02">Where we show up</SectionTitle>
          <ul className="divide-y divide-ink/10">
            {channels.map((channel) => (
              <li key={channel.name} className="flex items-center justify-between py-3.5">
                <span className="flex items-center gap-3 font-bold"><channel.icon size={18} className="text-green" /> {channel.name}</span>
                <span className="text-xs text-ink/50">{channel.detail}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <SectionTitle number="03">The IPs behind it</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {ips.slice(0, 4).map((ip) => <IpProfileCard key={ip.handle} ip={ip} wide />)}
          </div>
        </Panel>
      </div>
    </PublisherLayout>
  );
}
