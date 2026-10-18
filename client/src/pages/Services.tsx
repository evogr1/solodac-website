import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PrimaryButton, SectionTitle, Tag } from "../components/publisher";
import { PublisherLayout } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { services } from "../lib/services";

const formats = [
  { title: "Campaigns across our IPs", body: "One team runs it end to end: the idea, the creative, and the sequencing across pages people already follow.", tags: ["Strategy", "Creative", "Sequenced distribution"], line: "One brief. Every IP." },
  { title: "YouTube channels, built for you", body: "Long-form YouTube for business owners: positioning, proper shoots, proper edits, and a funnel into your business or program.", tags: ["Long-form", "Shoot & edit", "Funnel"], line: "Not another Instagram play." },
  { title: "Funding, launch & news distribution", body: "Raised a round, shipped a product, hit a milestone? We put it where India's business audience is already reading.", tags: ["Funding news", "Launches", "Milestones"], line: "The right rooms hear about it." },
  { title: "Native brand placements", body: "Brand-safe storytelling inside the formats our audience already watches, not ads they skip.", tags: ["Reels", "Carousels", "Repeat exposure"], line: "Trust, borrowed from the IP." },
];

export default function Services() {
  useScrollToTop();

  return (
    <PublisherLayout ctaTitle="Not sure which one you need? That's what the call is for.">
      <PageHero
        crumb="Services"
        kicker="SoloDac for brands"
        title="Everything we run for brands, in one place."
        deck="Two ways to work with us: put your story on our IPs, or have the team that runs them run your channels too."
      >
        <PrimaryButton href="/marketing">Book a call</PrimaryButton>
      </PageHero>

      <Panel className="mt-6">
        <SectionTitle number="01">On our IPs</SectionTitle>
        <div className="divide-y divide-neutral-200 border-t border-neutral-200">
          {formats.map((item, index) => (
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

      <div className="mt-8">
        <SectionTitle number="02" action={<Link href="/youtube" className="text-xs font-bold uppercase tracking-wide text-[#e2365b]">YouTube channels</Link>}>For your own channels</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(index % 3) * 0.05}>
                <Link href={`/services/${service.slug}`} className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
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
    </PublisherLayout>
  );
}
