import { useState } from "react";
import { ArrowUpRight, Check, PenTool } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Link } from "wouter";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";

const easeOut = [0.23, 1, 0.32, 1] as const;

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

const continentCountries: Record<string, string[]> = {
  "North America": ["United States", "Canada", "Mexico", "Guatemala", "Costa Rica", "Panama"],
  "South America": ["Brazil", "Argentina", "Chile", "Colombia", "Peru", "Ecuador", "Uruguay"],
  Europe: ["United Kingdom", "Germany", "France", "Spain", "Italy", "Netherlands", "Sweden", "Poland", "Ireland", "Switzerland"],
  Asia: ["India", "China", "Japan", "South Korea", "Singapore", "Indonesia", "Philippines", "Vietnam", "Thailand", "United Arab Emirates", "Saudi Arabia"],
  Africa: ["Nigeria", "South Africa", "Kenya", "Egypt", "Ghana", "Morocco"],
  Oceania: ["Australia", "New Zealand", "Fiji"],
};
const continents = Object.keys(continentCountries);

export default function StartProject() {
  useScrollToTop();
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]));
  };

  const toggleContinent = (continent: string) => {
    setSelectedContinents((prev) => {
      if (prev.includes(continent)) {
        setSelectedCountries((countries) => countries.filter((c) => !continentCountries[continent].includes(c)));
        return prev.filter((c) => c !== continent);
      }
      return [...prev, continent];
    });
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) => (prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service of interest.");
      return;
    }
    if (selectedContinents.length === 0) {
      toast.error("Please select at least one continent.");
      return;
    }
    if (selectedCountries.length === 0) {
      toast.error("Please select at least one country.");
      return;
    }

    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.set("services_of_interest", selectedServices.join(", "));
      formData.set("target_continents", selectedContinents.join(", "));
      formData.set("target_countries", selectedCountries.join(", "));
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

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">

      <section className="relative z-10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }}>
            <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-white/45"><span className="h-px w-10 bg-coral" /> Large-scale social marketing</div>
            <h1 className="max-w-md font-display text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">Book a call.</h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/60">Our owned and extended pages pull <span className="text-lime">18B+ views</span> a year. Put your brand, your founder, or your launch in front of that, run properly, not just boosted.</p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/45">Tell us what you&apos;re building, what you&apos;ve got to spend, and when it needs to happen. We&apos;ll tell you straight whether we&apos;re the right fit and what we&apos;d actually do.</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
            onSubmit={handleSubmit}
            className="signal-card rounded-3xl border border-lime/20 bg-[#151a19] p-6 sm:p-10"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-2xl font-black tracking-[-0.06em]">Marketing form</span>
              <PenTool size={20} className="text-lime" />
            </div>

            {formSent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-lime text-ink"><Check size={28} /></div>
                <h3 className="font-display text-4xl font-black tracking-[-0.06em]">Signal received.</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">Your brief just landed in our inbox and, statistically, someone is reading it right now. We&apos;ll come back with a real point of view, not a form-letter reply.</p>
                <button type="button" onClick={() => setFormSent(false)} className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-lime hover:underline">Got more to say? Send another</button>
              </div>
            ) : (
              <div className="space-y-5">
                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Name <span className="text-coral">*</span>
                  <input required name="name" placeholder="Your Name" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" />
                </label>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Email <span className="text-coral">*</span>
                  <input required type="email" name="email" placeholder="Your Email" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" />
                </label>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Phone <span className="text-coral">*</span>
                  <input required name="phone" placeholder="Your Phone Number" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" />
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

                <div className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Where do you want to be seen? <span className="text-coral">*</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {continents.map((continent) => {
                      const active = selectedContinents.includes(continent);
                      return (
                        <button
                          key={continent}
                          type="button"
                          onClick={() => toggleContinent(continent)}
                          className={`rounded-full border px-3 py-2 text-[11px] font-bold normal-case tracking-normal transition-colors ${
                            active ? "border-lime bg-lime text-ink" : "border-white/20 text-white/60 hover:border-lime hover:text-lime"
                          }`}
                        >
                          {continent}
                        </button>
                      );
                    })}
                  </div>

                  {selectedContinents.length > 0 && (
                    <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
                      {selectedContinents.map((continent) => (
                        <div key={continent}>
                          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">Countries in {continent} <span className="text-coral">*</span></div>
                          <div className="flex flex-wrap gap-2">
                            {continentCountries[continent].map((country) => {
                              const active = selectedCountries.includes(country);
                              return (
                                <button
                                  key={country}
                                  type="button"
                                  onClick={() => toggleCountry(country)}
                                  className={`rounded-full border px-3 py-2 text-[11px] font-bold normal-case tracking-normal transition-colors ${
                                    active ? "border-coral bg-coral text-ink" : "border-white/20 text-white/60 hover:border-coral hover:text-coral"
                                  }`}
                                >
                                  {country}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Budget <span className="text-coral">*</span>
                  <select required name="budget" defaultValue="" className="mt-2 w-full border-b border-white/20 bg-[#151a19] pb-3 text-base font-medium text-paper outline-none transition-colors focus:border-lime">
                    <option value="" disabled>Please select one</option>
                    {budgetOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Company <span className="text-coral">*</span>
                  <input required name="company" placeholder="Your Company" className="mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-base font-medium text-paper outline-none transition-colors placeholder:text-white/25 focus:border-lime" />
                </label>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Company stage <span className="text-coral">*</span>
                  <select required name="company_stage" defaultValue="" className="mt-2 w-full border-b border-white/20 bg-[#151a19] pb-3 text-base font-medium text-paper outline-none transition-colors focus:border-lime">
                    <option value="" disabled>Please select one</option>
                    {companyStageOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>

                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Message <span className="text-coral">*</span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="What are you trying to make happen, and by when? Drop your company name or a link so we can snoop around before we reply."
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
          </motion.form>
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
    </>
  );
}
