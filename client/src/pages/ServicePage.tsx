import { Check } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PrimaryButton, PublisherLayout, SectionTitle, Tag } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { servicePath, services } from "../lib/services";

export default function ServicePage() {
  useScrollToTop();
  const [match, params] = useRoute("/services/:slug");
  const [, setLocation] = useLocation();
  const service = services.find((item) => item.slug === params?.slug);

  if (match && !service) {
    setLocation("/404");
    return null;
  }
  if (!service) {
    return null;
  }
  if (service.href) {
    setLocation(service.href);
    return null;
  }

  const Icon = service.icon;
  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <PublisherLayout ctaTitle="Let's make this the good kind of busy.">
      <PageHero crumb={service.title} kicker={`SoloDac Studio · ${service.number}`} title={service.title} deck={service.description}>
        <div className="flex flex-wrap items-center gap-3">
          <PrimaryButton href="/marketing">Talk to SoloDac</PrimaryButton>
          {service.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </PageHero>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
        <Panel>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-green/10 text-green"><Icon size={20} /></span>
            <SectionTitle>What you get</SectionTitle>
          </div>
          <p className="mt-2 text-lg leading-relaxed text-ink/75">{service.more}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.includes.split(" · ").map((item, index) => (
              <Reveal key={item} delay={(index % 4) * 0.04}>
                <div className="flex items-center gap-3 rounded-lg border border-ink/10 p-4 text-sm font-bold">
                  <Check size={16} className="shrink-0 text-green" /> {item}
                </div>
              </Reveal>
            ))}
          </div>
        </Panel>

        <aside className="rounded-2xl border border-ink/10 bg-white/60 p-5">
          <h2 className="font-accent text-2xl font-bold text-green">More services</h2>
          <ol className="mt-3 divide-y divide-ink/10">
            {otherServices.map((item, index) => (
              <li key={item.slug}>
                <Link href={servicePath(item)} className="group flex gap-4 py-4">
                  <span className="w-5 shrink-0 font-accent text-2xl font-bold leading-none text-green">{index + 1}</span>
                  <span className="border-l border-ink/10 pl-4">
                    <span className="block font-bold leading-snug group-hover:text-green">{item.title}</span>
                    <span className="mt-1 block text-xs text-ink/50">{item.tags.join(" · ")}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </PublisherLayout>
  );
}
