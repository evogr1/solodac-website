import { Check } from "lucide-react";
import Layout from "@/components/Layout";
import MeshGradient, { meshPresets } from "@/components/effects/MeshGradient";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero, PrimaryButton } from "@/components/site";
import { scrollToId } from "@/lib/smoothScroll";
import { alsoDo, services } from "@/lib/site";

export default function Services() {
  return (
    <Layout>
      <PageHero
        backdrop={<div className="pointer-events-none absolute -inset-x-[12%] -inset-y-[18%]"><MeshGradient preset={meshPresets.quiet} /></div>}
        title={<>We do three things. <span className="text-paper/40">Properly.</span></>}
        intro="Every service here is something we run on our own pages first. If it doesn't work for us, we don't sell it to you."
      >
        <div className="mt-10 flex flex-wrap gap-2">
          {services.map((service) => (
            <a key={service.id} href={`#${service.id}`} onClick={(event) => { event.preventDefault(); scrollToId(service.id); }} className="rounded-full bg-paper/10 px-4 py-2 text-[15px] text-paper/80 transition-colors hover:bg-paper hover:text-ink">
              {service.title}
            </a>
          ))}
        </div>
      </PageHero>

      {services.map((service, index) => (
        <section key={service.id} id={service.id} className={index % 2 === 1 ? "bg-paper text-ink" : ""}>
          <div className="container grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] tracking-[-0.03em]">{service.title}</h2>
              <p className={`mt-5 text-[22px] leading-snug sm:text-2xl ${index % 2 === 1 ? "text-ink/80" : "text-paper/80"}`}>{service.line}</p>
              <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${index % 2 === 1 ? "text-ink/65" : "text-paper/65"}`}>{service.body}</p>
              <div className="mt-9">
                <PrimaryButton href={`/contact?service=${encodeURIComponent(serviceOption(service.id))}`} className={index % 2 === 1 ? "hover:bg-ink hover:text-paper" : undefined}>Talk to us about this</PrimaryButton>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className={`rounded-2xl p-7 sm:p-9 ${index % 2 === 1 ? "bg-paper-2" : "bg-ink-2"}`}>
                <div className={`text-[15px] ${index % 2 === 1 ? "text-ink/55" : "text-paper/55"}`}>What's included</div>
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

      <section>
        <div className="container py-16 sm:py-20">
          <h2 className="text-[clamp(20px,2vw,26px)] font-medium text-paper">We also do</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {alsoDo.map((item) => (
              <span key={item} className="rounded-full bg-paper/10 px-5 py-2.5 text-paper/80">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Not sure which one you need?" body="Most people aren't. Book a call and we'll work it out together." />
    </Layout>
  );
}

function serviceOption(id: string) {
  if (id === "youtube") return "YouTube channel";
  if (id === "instagram") return "Instagram page";
  return "Editing";
}
