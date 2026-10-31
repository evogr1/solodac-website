import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import ParticleWord from "@/components/effects/ParticleWord";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero, SectionHead } from "@/components/site";
import { company } from "@/lib/site";

const beliefs = [
  { title: "Run it ourselves first", body: "We test every format on our own pages before we sell it. Clients get what already worked, not what might." },
  { title: "No slop", body: "AI helps us move fast. It never gets the final say on quality. If it looks machine-made, it doesn't go out." },
  { title: "Say it straight", body: "If your idea won't work, we'll tell you on the first call. It saves both of us a month." },
];

export default function About() {
  const details = [
    { label: "Trade name", value: company.tradeName },
    { label: "Proprietor", value: company.proprietor },
    { label: "Constitution", value: company.constitution },
    { label: "GSTIN", value: company.gstin },
    { label: "Registered in", value: "Indore, Madhya Pradesh" },
    { label: "Email", value: company.email },
  ];

  return (
    <Layout>
      <PageHero
        kicker="About SoloDac"
        title={<>A media company that also <span className="font-serif-i font-normal text-signal">does the work.</span></>}
        intro="SoloDac started with a few pages about business and founders. Today we run a network of pages and channels, a team of editors and writers, and the software that ties it together."
      />

      <section className="border-b border-paper/10" aria-label="SoloDac">
        <div className="container">
          <ParticleWord className="h-[220px] sm:h-[340px] lg:h-[420px]" />
        </div>
      </section>

      <section className="container grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHead
            kicker="The short version"
            title="We learned on our own pages. Now we do it for others."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="space-y-5 text-base leading-relaxed text-paper/65 sm:text-lg">
            <p>We started by building pages about business and founders for Indian audiences. Some of them grew into the hundreds of thousands. Along the way we built a team that could write, edit and design every day without dropping quality.</p>
            <p>Founders and brands started asking us to do the same for them. So we did. Then we got tired of slow editing and built our own tools. That became Katran.</p>
            <p>SoloDac is founded and run by {company.proprietor}.</p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-paper/10 bg-ink-2">
        <div className="container py-20 sm:py-28">
          <Reveal>
            <SectionHead kicker="What we believe" title="Three rules we don't bend." />
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {beliefs.map((belief, index) => (
              <Reveal key={belief.title} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-paper/10 bg-ink p-7">
                  <div className="font-mono text-sm text-signal">0{index + 1}</div>
                  <h3 className="font-display mt-8 text-3xl">{belief.title}</h3>
                  <p className="mt-3 leading-relaxed text-paper/60">{belief.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead kicker="Where we are" title="Three cities. One team." />
          <div className="mt-10 grid gap-3">
            {company.locations.map((place) => (
              <div key={place.city} className="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-4">
                <span className="font-display text-3xl">{place.city}</span>
                <span className="text-right text-sm text-paper/50">{place.role}</span>
              </div>
            ))}
          </div>
        </div>
        <div id="company">
          <SectionHead kicker="Business details" title="A registered business. Proper invoices." />
          <dl className="mt-10 overflow-hidden rounded-2xl border border-paper/10">
            {details.map((row) => (
              <div key={row.label} className="grid grid-cols-[130px_1fr] gap-4 border-b border-paper/10 px-5 py-4 last:border-0 sm:grid-cols-[160px_1fr]">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45">{row.label}</dt>
                <dd className="break-all font-medium text-paper/85">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-paper/45">All client work is invoiced with GST.</p>
        </div>
      </section>

      <section id="careers" className="border-t border-paper/10 bg-paper text-ink">
        <div className="container flex flex-col justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Careers
            </div>
            <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1]">Editors, writers and designers.</h2>
            <p className="mt-3 max-w-xl text-ink/65">We're always looking. Send us your best three pieces of work and a line about you.</p>
          </div>
          <a href={`mailto:${company.email}?subject=Work%20at%20SoloDac`} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-signal hover:text-ink">
            Send your work <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <CtaBand title="Want to work with us?" body="Book a call. We'll tell you if we're the right team for it." />
    </Layout>
  );
}
