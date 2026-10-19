import { Check, Mic2, UsersRound, UtensilsCrossed } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PrimaryButton, PublisherLayout, SectionTitle } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { submitForm } from "../lib/web3forms";

const formats = [
  { icon: UtensilsCrossed, name: "Founder Dinners", body: "Small, invite-only tables of founders and operators. No panels, no slides, just honest conversation." },
  { icon: UsersRound, name: "Creator × Founder Meetups", body: "The people building companies in a room with the people who build audiences. Both sides leave with something." },
  { icon: Mic2, name: "SoloDac Summit", body: "Our flagship: the stories we cover all year, live on stage, with the founders who lived them." },
];

const cities = ["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Other"];
const roles = ["Founder", "Operator", "Creator", "Investor", "Brand / marketer", "Student"];

const pill = (active: boolean) =>
  `rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${active ? "border-[#e2365b] bg-[#e2365b] text-white" : "border-neutral-300 text-neutral-600 hover:border-[#e2365b]"}`;

export default function Events() {
  useScrollToTop();
  const [chosenFormats, setChosenFormats] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const toggleFormat = (name: string) => setChosenFormats((current) => (current.includes(name) ? current.filter((item) => item !== name) : [...current, name]));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!city || !role || chosenFormats.length === 0) {
      toast.error("Pick a city, your role and at least one event.");
      return;
    }
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      await submitForm("Events: register interest", {
        name: String(data.get("name")),
        email: String(data.get("email")),
        city,
        role,
        events: chosenFormats.join(", "),
      });
      setStatus("done");
    } catch {
      setStatus("idle");
      toast.error("That didn't go through. Try again in a moment.");
    }
  };

  return (
    <PublisherLayout ctaTitle="Want to sponsor or host with us?">
      <PageHero
        crumb="Events"
        kicker="SoloDac Events"
        title="The stories we cover, in a room."
        deck="SoloDac Events is coming: founder dinners, creator meetups, and a flagship summit. Register your interest and you'll hear about dates, cities and invites before anyone else."
      >
        <PrimaryButton onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}>Register interest</PrimaryButton>
      </PageHero>

      <div className="mt-8">
        <SectionTitle number="01">What we&apos;re building</SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          {formats.map((format, index) => (
            <Reveal key={format.name} delay={index * 0.05}>
              <Panel className="h-full">
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#e2365b]/10 text-[#e2365b]"><format.icon size={20} /></span>
                  <span className="rounded bg-neutral-100 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-neutral-500">Dates soon</span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{format.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{format.body}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>

      <div id="register" className="mt-8 scroll-mt-20 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Panel>
          <SectionTitle number="02">Be first in the room</SectionTitle>
          <ul className="space-y-3 text-neutral-700">
            {["Early access to every event before public release", "First pick of cities and dates", "Invites to the small, invite-only formats"].map((item) => (
              <li key={item} className="flex items-start gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#e2365b]" />{item}</li>
            ))}
          </ul>
        </Panel>

        <Panel>
          {status === "done" ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#e2365b] text-white"><Check size={26} /></span>
              <h3 className="mt-4 text-2xl font-extrabold">You&apos;re on the list.</h3>
              <p className="mt-2 max-w-sm text-sm text-neutral-600">We&apos;ll reach out as soon as dates for your city are set.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Name
                  <input name="name" required className="mt-1.5 w-full rounded border border-neutral-300 px-3 py-2.5 text-sm font-medium normal-case tracking-normal text-neutral-900 outline-none focus:border-[#e2365b]" />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Email
                  <input name="email" type="email" required className="mt-1.5 w-full rounded border border-neutral-300 px-3 py-2.5 text-sm font-medium normal-case tracking-normal text-neutral-900 outline-none focus:border-[#e2365b]" />
                </label>
              </div>
              <fieldset>
                <legend className="text-xs font-bold uppercase tracking-wide text-neutral-500">Which events?</legend>
                <div className="mt-2 flex flex-wrap gap-2">{formats.map((format) => <button type="button" key={format.name} onClick={() => toggleFormat(format.name)} className={pill(chosenFormats.includes(format.name))}>{format.name}</button>)}</div>
              </fieldset>
              <fieldset>
                <legend className="text-xs font-bold uppercase tracking-wide text-neutral-500">Your city</legend>
                <div className="mt-2 flex flex-wrap gap-2">{cities.map((item) => <button type="button" key={item} onClick={() => setCity(item)} className={pill(city === item)}>{item}</button>)}</div>
              </fieldset>
              <fieldset>
                <legend className="text-xs font-bold uppercase tracking-wide text-neutral-500">You are a</legend>
                <div className="mt-2 flex flex-wrap gap-2">{roles.map((item) => <button type="button" key={item} onClick={() => setRole(item)} className={pill(role === item)}>{item}</button>)}</div>
              </fieldset>
              <button type="submit" disabled={status === "sending"} className="w-full rounded bg-[#e2365b] py-3 text-xs font-black uppercase tracking-wide text-white disabled:opacity-60">
                {status === "sending" ? "Sending" : "Register interest"}
              </button>
            </form>
          )}
        </Panel>
      </div>
    </PublisherLayout>
  );
}
