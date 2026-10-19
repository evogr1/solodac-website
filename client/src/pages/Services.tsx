import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PrimaryButton, PublisherLayout, SectionTitle, Tag } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { servicePath, services } from "../lib/services";

const networkFormats = [
  { title: "Campaigns across our network", body: "One team runs it end to end: the idea, the creative, and the sequencing across pages people already follow.", tags: ["Strategy", "Creative", "Sequenced distribution"], line: "One brief. Every page." },
  { title: "Funding, launch & news distribution", body: "Raised a round, shipped a product, hit a milestone? We put it where India's business audience is already reading.", tags: ["Funding news", "Launches", "Milestones"], line: "The right rooms hear about it." },
  { title: "Native brand placements", body: "Brand-safe storytelling inside the formats our audience already watches, not ads they skip.", tags: ["Reels", "Carousels", "Repeat exposure"], line: "Trust, borrowed from the feed." },
];

export default function Services() {
  useScrollToTop();

  return (
    <PublisherLayout ctaTitle="Not sure which one you need? That's what the call is for.">
      <PageHero
        crumb="Studio"
        kicker="SoloDac Studio"
        title="The team behind a media company, working for you."
        deck="The people who build and run SoloDac's own media brands, available to founders and companies: YouTube channels, personal brands, rebrands, websites and more."
      >
        <PrimaryButton href="/marketing">Book a call</PrimaryButton>
      </PageHero>

      <div className="mt-8">
        <SectionTitle number="01">What the Studio does</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(index % 3) * 0.05}>
                <Link href={servicePath(service)} className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#e2365b]/10 text-[#e2365b]"><Icon size={20} /></span>
                    <span className="font-mono text-xs text-neutral-400">{service.number}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold group-hover:text-[#e2365b]">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{service.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{service.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
                  <span className="mt-5 flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#e2365b]">Read more <ArrowUpRight size={13} /></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Panel className="mt-8">
        <SectionTitle number="02" action={<Link href="/network" className="text-xs font-bold uppercase tracking-wide text-[#e2365b]">See the network</Link>}>Advertise on our network</SectionTitle>
        <div className="divide-y divide-neutral-200 border-t border-neutral-200">
          {networkFormats.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <div className="grid gap-4 py-6 md:grid-cols-[3rem_1.1fr_1fr] md:gap-8">
                <span className="font-mono text-sm text-[#e2365b]">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-extrabold sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
                  <p className="mt-3 font-[Georgia,serif] text-lg italic text-[#e2365b]">{item.line}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Panel>
    </PublisherLayout>
  );
}
