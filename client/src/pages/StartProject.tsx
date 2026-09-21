import { useState } from "react";
import { ArrowUpRight, Check, Menu, PenTool, X } from "lucide-react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

const serviceOptions = [
  "Instagram Marketing",
  "Newsletter Marketing",
  "Telegram Marketing",
  "TikTok Marketing",
  "X (Twitter) Marketing",
  "YouTube Marketing",
  "Digital PR",
  "Content Production",
  "Web Development",
];

const budgetOptions = [
  "Less than $500",
  "$501-1,000",
  "$1,000-2,500",
  "$2,500-5,000",
  "$5,000-10,000",
  "$10,000-20,000",
  "$20,000-50,000",
  "$50,000-100,000",
  "$100,000-250,000",
  "$250,000+",
];

const companyStageOptions = ["Stealth", "Pre-Seed", "Seed", "Series A", "Series B+", "Pre-IPO", "Public", "Private", "Other"];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function StartProject() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.set("services_of_interest", selectedServices.join(", "));
      formData.append("access_key", "fa96ec00-da5f-49aa-89cf-6cd11dd05a95");
      formData.append("subject", "New SoloDac project inquiry");
      formData.append("from_name", "SoloDac website");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send your project brief.");
      }

      setFormSent(true);
      toast.success("Project brief sent.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send your project brief.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = (id: string) => {
    setMenuOpen(false);
    if (window.location.pathname !== "/") {
      setLocation("/");
      window.setTimeout(() => scrollToId(id), 50);
    } else {
      scrollToId(id);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <header className="relative z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="group flex items-center gap-3" aria-label="SoloDac home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-ink transition-transform duration-200 group-hover:rotate-12">
              <span className="h-3 w-3 rounded-full bg-ink" />
            </span>
            <span className="font-display text-[1.7rem] font-black tracking-[-0.08em]">SoloDac</span>
          </Link>

          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 md:flex">
            <button onClick={() => navigate("services")} className="transition-colors hover:text-lime">Services</button>
            <button onClick={() => navigate("network")} className="transition-colors hover:text-lime">Network</button>
            <button onClick={() => navigate("approach")} className="transition-colors hover:text-lime">Approach</button>
          </nav>

          <Link
            href="/eyeballs"
            className="hidden items-center gap-3 rounded-full border border-lime/60 bg-lime px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-all md:flex"
          >
            Get eyeballs <ArrowUpRight size={14} />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-paper md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 px-5 py-6 md:hidden">
            <div className="flex flex-col gap-5 text-sm font-bold uppercase tracking-[0.14em]">
              <button onClick={() => navigate("services")} className="text-left text-white/70">Services</button>
              <button onClick={() => navigate("network")} className="text-left text-white/70">Network</button>
              <button onClick={() => navigate("approach")} className="text-left text-white/70">Approach</button>
            </div>
          </div>
        )}
      </header>

      <section className="relative z-10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-white/45"><span className="h-px w-10 bg-coral" /> Large-scale social marketing</div>
            <h1 className="max-w-md font-display text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">Get eyeballs.</h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/60">Our network of owned and extended pages generates <span className="text-lime">18B+ views</span> a year. Amplify your brand, founder, or product narrative with a managed SoloDac campaign.</p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/45">Tell us what you&apos;re building, your budget, and your timeline—we&apos;ll come back with a point of view and a plan to scale your reach.</p>
          </div>

          <form onSubmit={handleSubmit} className="signal-card rounded-3xl border border-lime/20 bg-[#151a19] p-6 sm:p-10">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-2xl font-black tracking-[-0.06em]">Marketing form</span>
              <PenTool size={20} className="text-lime" />
            </div>

            {formSent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-lime text-ink"><Check size={28} /></div>
                <h3 className="font-display text-4xl font-black tracking-[-0.06em]">Signal received.</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">Your project brief has been sent. We&apos;ll come back with a point of view.</p>
                <button type="button" onClick={() => setFormSent(false)} className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-lime hover:underline">Send another brief</button>
              </div>
            ) : (
              <div className="space-y-5">
                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Name
                  <input name="name" placeholder="Your Name" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" />
                </label>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Email <span className="text-coral">*</span>
                  <input required type="email" name="email" placeholder="Your Email" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" />
                </label>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Phone (optional)
                  <input name="phone" placeholder="Your Phone Number (Optional)" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" />
                </label>

                <div className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Services of interest <span className="text-coral">*</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {serviceOptions.map((service) => {
                      const active = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`rounded-full border px-3 py-2 text-[11px] font-bold normal-case tracking-normal transition-colors ${
                            active ? "border-lime bg-lime text-ink" : "border-white/20 text-white/60 hover:border-lime hover:text-lime"
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Budget <span className="text-coral">*</span>
                  <select required name="budget" defaultValue="" className="mt-2 w-full border-b border-white/20 bg-[#151a19] pb-3 text-base font-medium text-paper outline-none transition-colors focus:border-lime">
                    <option value="" disabled>Please select one</option>
                    {budgetOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Company
                  <input name="company" placeholder="Your Company" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" />
                </label>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Company stage
                  <select name="company_stage" defaultValue="" className="mt-2 w-full border-b border-white/20 bg-[#151a19] pb-3 text-base font-medium text-paper outline-none transition-colors focus:border-lime">
                    <option value="" disabled>Please select one</option>
                    {companyStageOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Please tell us more about your goals, and desired campaign start date. Include your company social profile and/or company name so that we can learn more prior to getting in touch. Thank you!"
                    className="mt-2 w-full resize-none border-b border-white/20 bg-transparent pb-3 text-sm font-medium leading-relaxed text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-between rounded-full bg-lime px-5 py-4 text-sm font-black text-ink transition-colors hover:bg-[#d8ff2f] disabled:cursor-wait disabled:opacity-60"
                >
                  {isSubmitting ? "Sending brief…" : "Submit"} <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            )}
          </form>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span>
              <span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span>
            </Link>
            <p className="mt-3 text-xs text-white/40">Digital media, content & growth.</p>
          </div>
          <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            <Link href="/" className="hover:text-lime">Home</Link>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
