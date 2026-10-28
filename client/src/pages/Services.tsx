import { Check } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero, PrimaryButton } from "@/components/site";
import { scrollToId } from "@/lib/smoothScroll";
import { alsoDo, services } from "@/lib/site";

export default function Services() {
  return (
    <Layout>
      <PageHero
        kicker="Services"
        title={<>We do three things. <span className="text-paper/40">Properly.</span></>}
        intro="Every service here is something we run on our own pages first. If it doesn't work for us, we don't sell it to you."
      >
        <div className="mt-10 flex flex-wrap gap-2">
          {services.map((service) => (
            <a key={service.id} href={`#${service.id}`} onClick={(event) => { event.preventDefault(); scrollToId(service.id); }} className="rounded-full border border-paper/15 px-4 py-2 text-sm text-paper/70 transition-colors hover:border-paper hover:text-paper">
              {service.title}
            </a>
          ))}
        </div>
      </PageHero>

      {services.map((service, index) => (
        <section key={service.id} id={service.id} className={index % 2 === 1 ? "bg-paper text-ink" : ""}>
          <div className="container grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <Reveal>
              <div className={`font-mono text-sm ${index % 2 === 1 ? "text-ink/40" : "text-paper/40"}`}>{service.number}</div>
              <h2 className="font-display mt-4 text-[clamp(2.6rem,6vw,5rem)] leading-[0.92]">{service.title}</h2>
              <p className="font-serif-i mt-5 text-2xl text-signal sm:text-3xl">{service.line}</p>
              <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${index % 2 === 1 ? "text-ink/65" : "text-paper/65"}`}>{service.body}</p>
              <div className="mt-9">
                <PrimaryButton href={`/contact?service=${encodeURIComponent(serviceOption(service.id))}`} className={index % 2 === 1 ? "hover:bg-ink hover:text-paper" : undefined}>Talk to us about this</PrimaryButton>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className={`rounded-2xl border p-7 sm:p-9 ${index % 2 === 1 ? "border-ink/10 bg-paper-2" : "border-paper/10 bg-ink-2"}`}>
                <div className={`font-mono text-[11px] uppercase tracking-[0.18em] ${index % 2 === 1 ? "text-ink/50" : "text-paper/45"}`}>What's included</div>
                <ul className="mt-6 space-y-4">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base sm:text-lg">
                      <Check size={18} className="mt-1 shrink-0 text-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="border-t border-paper/10">
        <div className="container py-16 sm:py-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45">We also do</div>
          <div className="mt-6 flex flex-wrap gap-3">
            {alsoDo.map((item) => (
              <span key={item} className="rounded-full border border-paper/15 px-5 py-2.5 text-paper/80">{item}</span>
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
