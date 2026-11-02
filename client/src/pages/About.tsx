import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import Layout from "@/components/Layout";
import ParticleWord from "@/components/effects/ParticleWord";
import Reveal from "@/components/Reveal";
import { ReelFan } from "@/components/proof/ProofStack";
import { CtaBand, PrimaryButton } from "@/components/site";
import { company } from "@/lib/site";
import { scrollToId } from "@/lib/smoothScroll";

const roles = [
  { title: "Video editor", body: "Long-form YouTube edits and reels for our pages and our clients. Send three edits you're proud of." },
  { title: "Writer", body: "YouTube scripts, reel hooks and carousel copy. Send three pieces you wrote." },
  { title: "Designer", body: "Carousels, thumbnails and brand work. Send three designs." },
];

const rules = [
  { lead: "We run it on our own pages first.", body: "Every format we sell has already worked for us. Clients get what worked, not what might." },
  { lead: "Nothing goes out looking machine-made.", body: "Software helps us move fast. A person on the team decides what is good enough to post." },
  { lead: "We say it straight.", body: "If an idea won't work, you hear it on the first call. It saves both of us a month." },
];

/** One part of the page: a small plain title on the left, the content on the right. */
function Part({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="container grid gap-6 py-10 sm:py-14 lg:grid-cols-12 lg:gap-8">
      <h2 className="text-[clamp(20px,1.8vw,24px)] font-semibold lg:col-span-4">{title}</h2>
      <Reveal className="lg:col-span-7 lg:col-start-6">{children}</Reveal>
    </section>
  );
}

export default function About() {

  return (
    <Layout>
      <section className="container grid items-end gap-12 pb-10 pt-32 sm:pt-40 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-16">
        <div>
          <Reveal>
            <h1 className="font-display max-w-5xl text-[clamp(2.75rem,7vw,6rem)] leading-[0.92] tracking-[-0.03em]">
              We grow pages, channels and brands.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-paper/75">
              SoloDac is a media company. We run our own pages about business and founders. We grow the same kind of pages for founders, creators and brands. And we build the software that makes both faster.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButton href="/contact">Book a call</PrimaryButton>
              <button
                type="button"
                onClick={() => scrollToId("careers")}
                className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-6 py-3.5 text-sm font-semibold text-paper transition-[background-color,color,transform] duration-150 ease-out hover:bg-paper hover:text-ink active:scale-[0.97]"
              >
                We're hiring
              </button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} y={20}>
          <ReelFan order={[4, 1, 5]} className="mx-auto max-w-[460px] lg:mr-0" />
        </Reveal>
      </section>

      <section aria-label="SoloDac">
        <div className="container">
          <ParticleWord className="h-[200px] sm:h-[300px] lg:h-[360px]" />
        </div>
      </section>

      <Part title="How it started">
        <div className="max-w-[62ch] space-y-5 text-[18px] leading-relaxed text-paper/75">
          <p>We started by building pages about business and founders for Indian audiences. Some of them grew into the hundreds of thousands. Along the way we built a team that could write, edit and design every day without dropping quality.</p>
          <p>Founders and brands started asking us to do the same for them. So we did. Then we got tired of slow editing and built our own tools. That became Katran.</p>
          <p>SoloDac was founded by {company.proprietor}.</p>
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

      <Part id="company" title="Offices">
        <div className="max-w-[62ch] space-y-5 text-[18px] leading-relaxed text-paper/75">
          <p>
            Our corporate office is in Indore, Madhya Pradesh, with regional offices in Chandigarh and Noida.
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

      <section id="careers" aria-labelledby="careers-title">
        <div className="container grid gap-12 py-14 sm:py-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="careers-title" className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">Work with us.</h2>
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-paper/70">
              We're hiring for these roles. Send your three best pieces of work and a line about you.
            </p>
          </Reveal>
          <ul className="space-y-3 lg:col-span-7 lg:col-start-6">
            {roles.map((role, index) => (
              <li key={role.title}>
                <Reveal delay={index * 0.06}>
                  <a
                    href={`mailto:${company.email}?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                    className="group flex flex-col gap-4 rounded-2xl bg-ink-2 p-6 transition-colors duration-200 hover:bg-ink-3 sm:flex-row sm:items-center sm:justify-between sm:p-7"
                  >
                    <span>
                      <span className="font-display block text-[clamp(24px,2vw,30px)] leading-tight tracking-[-0.02em]">{role.title}</span>
                      <span className="mt-2 block max-w-md text-[16px] leading-relaxed text-paper/65">{role.body}</span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-paper transition-colors duration-200 group-hover:text-signal">
                      Apply <ArrowUpRight size={16} />
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Have a page or a brand to grow?" body="Book a call. We'll tell you if we're the right team for it." />
    </Layout>
  );
}
