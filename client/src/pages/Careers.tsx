import { Coffee, Ghost, PartyPopper } from "lucide-react";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PrimaryButton, PublisherLayout, SectionTitle } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";

const perksWeHaventDecidedYet = [
  { icon: Coffee, text: "Unlimited coffee (once we get a coffee machine)" },
  { icon: PartyPopper, text: "A ping pong table, allegedly" },
  { icon: Ghost, text: "Zero meetings that could've been a DM" },
];

export default function Careers() {
  useScrollToTop();

  return (
    <PublisherLayout ctaTitle="Not hiring yet. Still happy to talk.">
      <PageHero
        crumb="Careers"
        kicker="Careers"
        title={<>Job posts: <span className="text-neutral-400">coming soon™.</span></>}
        deck="We're a small team that's currently too busy actually doing the work to write a careers page about it. Ironic, we know. We make content for a living."
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <Panel className="h-full">
            <SectionTitle>Open roles</SectionTitle>
            <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center">
              <div className="text-lg font-extrabold">0 open positions</div>
              <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-600">When we do open something up, it&apos;ll land here first. Not a job board, not LinkedIn, here.</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p className="text-sm text-neutral-600">Think you should be first in line anyway?</p>
              <PrimaryButton href="/marketing">Say hi anyway</PrimaryButton>
            </div>
          </Panel>
        </Reveal>
        <Reveal delay={0.05}>
          <Panel className="h-full">
            <SectionTitle>Perks we haven&apos;t officially decided on yet</SectionTitle>
            <ul className="space-y-4">
              {perksWeHaventDecidedYet.map((perk) => (
                <li key={perk.text} className="flex items-center gap-3 text-sm font-semibold text-neutral-700">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e2365b]/10 text-[#e2365b]"><perk.icon size={17} /></span>
                  {perk.text}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </PublisherLayout>
  );
}
