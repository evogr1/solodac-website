import { Target, TrendingUp, Zap } from "lucide-react";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PrimaryButton, PublisherLayout, SectionTitle, Tag } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";

const principles = [
  { icon: Zap, title: "Creative first", text: "The ad has to earn the click before the targeting even matters. We treat the hook like it's the whole job, because it basically is." },
  { icon: Target, title: "Kill fast, scale faster", text: "We know within days if a campaign's working, not weeks. Losers get cut before they burn real budget. Winners get more fuel, immediately." },
  { icon: TrendingUp, title: "One team, one number", text: "The people making the creative also watch the dashboard. No handoff, no blame game between the 'creative team' and the 'media team'. Just us." },
];

export default function Campaigns() {
  useScrollToTop();

  return (
    <PublisherLayout ctaTitle="Got budget that needs to work harder?">
      <PageHero crumb="Campaigns" kicker="Paid campaigns" title="Ads that get judged on revenue. Not reach." deck="A dashboard full of impressions doesn't pay rent. Here's the short version of how we run paid, alongside what we run on our IPs.">
        <PrimaryButton href="/marketing">Book a call</PrimaryButton>
      </PageHero>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {principles.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <Panel className="h-full">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-green/10 text-green"><item.icon size={20} /></span>
              <h2 className="mt-5 text-xl font-bold tracking-tight">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.text}</p>
            </Panel>
          </Reveal>
        ))}
      </div>

      <Panel className="mt-8">
        <SectionTitle>Where we run</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {["Meta ads", "Google ads", "Our IPs", "Creative testing", "Conversion tracking", "Landing-page optimization"].map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </Panel>
    </PublisherLayout>
  );
}
