import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import { CtaBand } from "@/components/site";
import { company } from "@/lib/site";

const rules = [
  { lead: "We run it on our own pages first.", body: "Every format we sell has already worked for us. Clients get what worked, not what might." },
  { lead: "Nothing goes out looking machine-made.", body: "Software helps us move fast. A person on the team decides what is good enough to post." },
  { lead: "We say it straight.", body: "If an idea won't work, you hear it on the first call. It saves both of us a month." },
];

/** One part of the page: a small plain title on the left, the content on the right. */
function Part({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="container grid gap-6 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8">
      <h2 className="text-[clamp(20px,1.8vw,24px)] font-semibold lg:col-span-4">{title}</h2>
      <Reveal className="lg:col-span-7 lg:col-start-6">{children}</Reveal>
    </section>
  );
}

export default function About() {

  return (
    <Layout>
      <section className="container pb-10 pt-32 sm:pt-44">
        <Reveal>
          <h1 className="font-display max-w-5xl text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em]">
            SoloDac is a media company that grows pages, channels and brands.
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-paper/75">
            We run our own pages about business and founders. We grow the same kind of pages for founders, creators and brands. And we build the software that makes both faster.
          </p>
        </Reveal>
      </section>

      <Part title="How it started">
        <div className="max-w-[62ch] space-y-5 text-[18px] leading-relaxed text-paper/75">
          <p>We started by building pages about business and founders for Indian audiences. Some of them grew into the hundreds of thousands. Along the way we built a team that could write, edit and design every day without dropping quality.</p>
          <p>Founders and brands started asking us to do the same for them. So we did. Then we got tired of slow editing and built our own tools. That became Katran.</p>
          <p>SoloDac is founded and run by {company.proprietor}.</p>
        </div>
      </Part>

      <Part title="How we work">
        <ul className="max-w-[62ch] space-y-6 text-[18px] leading-relaxed">
          {rules.map((rule) => (
            <li key={rule.lead}>
              <span className="font-semibold text-paper">{rule.lead}</span> <span className="text-paper/75">{rule.body}</span>
            </li>
          ))}
        </ul>
      </Part>

      <Part id="company" title="Company details">
        <div className="max-w-[62ch] space-y-5 text-[18px] leading-relaxed text-paper/75">
          <p>
            Our corporate office is in Indore, Madhya Pradesh, with regional offices in Chandigarh and Noida. {company.tradeName} is a {company.constitution.toLowerCase()} of {company.proprietor}.
          </p>
          <p>
            All client work is invoiced with GST. Write to us at{" "}
            <a href={`mailto:${company.email}`} className="text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-signal">
              {company.email}
            </a>
            .
          </p>
        </div>
      </Part>

      <section id="careers" className="bg-paper text-ink">
        <div className="container flex flex-col justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.03em]">We're hiring editors, writers and designers.</h2>
            <p className="mt-3 max-w-xl text-[17px] text-ink/70">Send us your best three pieces of work and a line about you.</p>
          </div>
          <a href={`mailto:${company.email}?subject=Work%20at%20SoloDac`} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-signal hover:text-ink">
            Send your work <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <CtaBand title="Have a page or a brand to grow?" body="Book a call. We'll tell you if we're the right team for it." />
    </Layout>
  );
}
