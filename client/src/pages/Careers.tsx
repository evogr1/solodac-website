import { Clapperboard, Handshake, Newspaper, TrendingUp } from "lucide-react";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PrimaryButton, PublisherLayout, SectionTitle } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";

const teams = [
  { icon: Newspaper, name: "Editorial", body: "Writers and researchers who find the story behind India's founders, markets and companies." },
  { icon: Clapperboard, name: "Video & production", body: "Shooters and editors making short-form for our IPs and long-form YouTube for our partners." },
  { icon: TrendingUp, name: "Growth & distribution", body: "The people who decide what goes where, when, and why it travels." },
  { icon: Handshake, name: "Brand partnerships", body: "The team that brings brands onto the network and makes their campaigns work." },
];

export default function Careers() {
  useScrollToTop();

  return (
    <PublisherLayout ctaTitle="Want to work with SoloDac instead?">
      <PageHero
        crumb="Careers"
        kicker="Careers at SoloDac"
        title="Build India's next media company with us."
        deck="We publish to millions every day across business, markets, founders and culture. Roles open here first, before any job board."
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <Panel className="h-full">
            <SectionTitle>Open roles</SectionTitle>
            <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center">
              <div className="text-lg font-extrabold">No open roles right now</div>
              <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-600">New positions are posted here first. Exceptional people can reach out any time.</p>
            </div>
            <div className="mt-6"><PrimaryButton href="/marketing">Get in touch</PrimaryButton></div>
          </Panel>
        </Reveal>
        <Reveal delay={0.05}>
          <Panel className="h-full">
            <SectionTitle>Teams we hire for</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              {teams.map((team) => (
                <div key={team.name} className="rounded-lg border border-neutral-200 p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#e2365b]/10 text-[#e2365b]"><team.icon size={17} /></span>
                  <div className="mt-3 font-extrabold">{team.name}</div>
                  <p className="mt-1 text-sm text-neutral-600">{team.body}</p>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>
    </PublisherLayout>
  );
}
