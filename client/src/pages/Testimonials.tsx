import { Quote } from "lucide-react";
import { Link } from "wouter";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PublisherLayout } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";

export default function Testimonials() {
  useScrollToTop();

  return (
    <PublisherLayout ctaTitle="Be the first quote on this page.">
      <PageHero
        crumb="Testimonials"
        kicker="Testimonials"
        title="This page is embarrassingly empty."
        deck={<>We could invent some glowing quotes from &quot;Sarah K., Marketing Director.&quot; We&apos;re not going to. We&apos;re new enough that our best testimonials haven&apos;t happened yet.</>}
      />
      <Reveal delay={0.1}>
        <Panel className="mx-auto mt-6 max-w-xl -rotate-1 border border-dashed border-neutral-300 shadow-none">
          <Quote size={28} className="text-[#e2365b]/40" />
          <p className="mt-4 text-2xl font-extrabold leading-tight text-neutral-400">&quot;[Your name could go here. No pressure.]&quot;</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400">A future client, probably</p>
        </Panel>
      </Reveal>
      <p className="mx-auto mt-8 max-w-lg text-center text-sm text-neutral-600">
        Until then, check the <Link href="/case-studies" className="font-bold text-[#e2365b] hover:underline">case studies</Link> for the honest, real-time version of &quot;coming soon.&quot;
      </p>
    </PublisherLayout>
  );
}
