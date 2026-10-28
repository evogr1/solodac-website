import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import { Kicker } from "@/components/site";
import { company, serviceOptions } from "@/lib/site";

export default function Contact() {
  const requested = new URLSearchParams(window.location.search).get("service") ?? "";
  const initial: Record<string, string> = serviceOptions.includes(requested) ? { service: requested } : {};

  return (
    <Layout>
      <section className="relative overflow-hidden pb-24 pt-32 sm:pt-44">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="container relative grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div>
            <Kicker>Book a call</Kicker>
            <h1 className="font-display mt-6 text-[clamp(3rem,8vw,6rem)] leading-[0.9]">Let's talk.</h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/65 sm:text-lg">
              Tell us a bit about what you're building. We reply within one working day with a time for a call.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45">Email</div>
                <a href={`mailto:${company.email}`} className="mt-2 inline-flex items-center gap-1.5 text-xl font-semibold hover:text-signal">
                  {company.email} <ArrowUpRight size={16} />
                </a>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45">Offices</div>
                <ul className="mt-3 space-y-2">
                  {company.locations.map((place) => (
                    <li key={place.city} className="text-paper/80">
                      {place.city} <span className="text-paper/40">· {place.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/40">GSTIN {company.gstin}</div>
            </div>
          </div>

          <LeadForm
            subject="New enquiry from solodac.com"
            submitLabel="Send"
            successTitle="Got it. Talk soon."
            successBody="Someone from the team will reply within one working day. If it's urgent, email info@solodac.com."
            initial={initial}
            fields={[
              { name: "name", label: "Name", type: "text", required: true, half: true },
              { name: "email", label: "Email", type: "email", required: true, half: true },
              { name: "phone", label: "Phone or WhatsApp", type: "tel", half: true },
              { name: "company", label: "Brand or channel", type: "text", half: true },
              { name: "service", label: "What do you need?", type: "select", required: true, options: serviceOptions, half: true },
              { name: "budget", label: "Monthly budget", type: "select", options: ["Under ₹50K", "₹50K to ₹1.5L", "₹1.5L to ₹5L", "₹5L+", "Not sure yet"], half: true },
              { name: "message", label: "Tell us more", type: "textarea", placeholder: "Where are you today, and where do you want to be?" },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}
