import { Check } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import ClientWall from "@/components/proof/ClientWall";
import { ReelFan } from "@/components/proof/ProofStack";
import { CtaBand, PageHero, PrimaryButton } from "@/components/site";
import { scrollToId } from "@/lib/smoothScroll";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <Layout>
      <PageHero
        title="Everything a page needs, from one team."
        intro="Every service here is something we run on our own pages first. If it doesn't work for us, we don't sell it to you."
        aside={<ReelFan className="mx-auto max-w-[460px] lg:mr-0" />}
      >
        <div className="mt-9">
          <PrimaryButton href="/contact">Book a call</PrimaryButton>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {services.map((service) => (
            <a key={service.id} href={`#${service.id}`} onClick={(event) => { event.preventDefault(); scrollToId(service.id); }} className="rounded-full bg-paper/10 px-4 py-2 text-[15px] text-paper/80 transition-colors hover:bg-paper hover:text-ink">
              {service.title}
            </a>
          ))}
        </div>
      </PageHero>

      {services.map((service) => (
        <section key={service.id} id={service.id}>
          <div className="container grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] tracking-[-0.03em]">{service.title}</h2>
              <p className="mt-5 text-[22px] leading-snug text-paper/80 sm:text-2xl">{service.line}</p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/65 sm:text-lg">{service.body}</p>
              <div className="mt-9">
                <PrimaryButton href={`/contact?service=${encodeURIComponent(service.enquiry)}`}>Talk to us about this</PrimaryButton>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-ink-2 p-7 sm:p-9">
                <div className="text-[15px] text-paper/55">What's included</div>
                <ul className="mt-6 space-y-4">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base sm:text-lg">
                      <Check size={18} className="mt-1 shrink-0 opacity-50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <ClientWall title="Clients we have worked with." />

      <CtaBand title="Not sure which one you need?" body="Most people aren't. Book a call and we'll work it out together." />
    </Layout>
  );
}
