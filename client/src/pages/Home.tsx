import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import HeroHeadline from "@/components/effects/HeroHeadline";
import Magnetic from "@/components/effects/Magnetic";
import MeshGradient from "@/components/effects/MeshGradient";
import FiveHires from "@/components/home/FiveHires";
import GrowthPicker from "@/components/home/GrowthPicker";
import RotatingWord from "@/components/home/RotatingWord";
import Reel from "@/components/katran/Reel";
import Reveal from "@/components/Reveal";
import { GhostButton, PrimaryButton } from "@/components/site";
import { millionViewReels } from "@/lib/reels";
import { services } from "@/lib/site";

const growing = ["YouTube channels.", "personal brands.", "Instagram pages.", "communities.", "brands.", "newsletters."];

// 123.9 million across the six reels, said the way our readers count it (lakh below a crore).
const reelViewSum = millionViewReels.reduce((sum, reel) => sum + reel.views, 0);
const totalReelViews = reelViewSum >= 10_000_000 ? `${Math.floor(reelViewSum / 10_000_000)} crore` : `${Math.floor(reelViewSum / 100_000)} lakh`;


const comparison = {
  columns: ["Freelancers", "An in-house team", "A typical agency", "SoloDac"],
  rows: [
    { label: "Scripts, edits, design and posting from one team", values: ["No", "Yes", "Some", "Yes"] },
    { label: "Runs pages and channels of its own", values: ["No", "No", "Rarely", "Yes"] },
    { label: "Brand deals on pages that already have an audience", values: ["No", "No", "Rarely", "Yes"] },
    { label: "Its own editing software", values: ["No", "No", "No", "Yes, Katran"] },
    { label: "You manage the people", values: ["Yes", "Yes", "No", "No"] },
  ],
};

const steps = [
  { title: "Call", body: "Thirty minutes on what you have, what you want and what's in the way." },
  { title: "Plan", body: "We come back with a niche, a format and a posting schedule that we'd bet on." },
  { title: "Build", body: "Scripts, edits, designs and posts go out on schedule. You approve, we ship." },
  { title: "Report", body: "Every month you see what worked, what didn't and what we're changing." },
];

const faqs = [
  {
    q: "Do you only make reels?",
    a: "No. We run YouTube channels and Instagram pages, edit for founders and creators, build personal brands, sell brand partnerships on our pages, and make brand identities and websites. Reels are the part people see most.",
  },
  { q: "Can I advertise on your pages?", a: "Yes. Sponsored posts, story features and launch pushes across several pages. The Network page has the details." },
  { q: "Do you work outside India?", a: "Yes. Beyond the pages on this site we run unbranded pages and channels for audiences in the US, UK and India." },
  { q: "What is Katran?", a: "The editing software we built for our own pages. Our editors use it every day, and creators can join the waitlist." },
  { q: "How do we start?", a: "Book a call. Thirty minutes on where your page, channel or brand is today and where you want it to be." },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-44">
        <div className="pointer-events-none absolute -inset-x-[12%] -inset-y-[18%]"><MeshGradient /></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
        <div className="container relative">
          <Reveal>
            <HeroHeadline
              className="font-display max-w-6xl text-[clamp(2.6rem,9vw,8.5rem)] leading-[0.92]"
              label={`We grow ${growing.join(" ")}`}
              lines={[{ breakAfter: true, text: "We grow" }]}
            >
              <RotatingWord words={growing} className="text-paper/45" />
            </HeroHeadline>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-xl text-[18px] leading-relaxed text-paper/70">
                We grew our own pages first. Now we grow yours.
              </p>
              <div className="flex flex-wrap gap-3">
                <Magnetic><PrimaryButton href="/contact">Book a call</PrimaryButton></Magnetic>
                <Magnetic><GhostButton href="/services">What we do</GhostButton></Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The problem */}
      <section className="container py-24 sm:py-32">
        <Reveal>
          <h2 className="font-display max-w-4xl text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95] tracking-[-0.03em]">
            Growing a page usually takes five hires. We are all five.
          </h2>
        </Reveal>
        <div className="mt-12">
          <FiveHires />
        </div>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-paper/65">
          One team that writes, edits, designs, posts and reads the numbers. The same team runs our own pages every day.
        </p>
      </section>

      {/* What are you growing */}
      <section className="container pb-24 sm:pb-32" aria-labelledby="growing">
        <GrowthPicker />
      </section>

      {/* Every service */}
      <section className="bg-ink-2" aria-labelledby="everything">
        <div className="container py-24 sm:py-32">
          <Reveal>
            <h2 id="everything" className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">
              What we do.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`/services#${service.id}`} className="group block">
                  <span className="font-display flex items-center gap-2 text-[clamp(24px,2vw,30px)] leading-tight tracking-[-0.02em] transition-colors duration-200 group-hover:text-signal">
                    {service.title}
                    <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-paper/45 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
                  </span>
                  <span className="mt-2 block text-[16px] leading-relaxed text-paper/65">{service.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof: the reels */}
      <section className="container py-24 sm:py-32" aria-labelledby="reels">
        <Reveal>
          <h2 id="reels" className="font-display max-w-4xl text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.03em]">
            Reels from our own pages.
          </h2>
          <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-paper/70">
            Each one passed a million views. Together they have {totalReelViews}. All six were made with Katran, the editor we built for our own pages.
          </p>
        </Reveal>
        <div className="-mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {millionViewReels.map((reel, index) => (
            <Reveal key={reel.id} delay={index * 0.05} className="w-[62vw] max-w-[260px] shrink-0 snap-start sm:w-[34vw] lg:w-auto lg:max-w-none">
              <Reel reel={reel} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <PrimaryButton href="/network">See the network</PrimaryButton>
          <GhostButton href="/contact?service=Brand%20partnership">Advertise with us</GhostButton>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-paper text-ink" aria-labelledby="compare">
        <div className="container py-24 sm:py-32">
          <Reveal>
            <h2 id="compare" className="font-display max-w-3xl text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.98] tracking-[-0.03em]">
              How we compare.
            </h2>
          </Reveal>
          {/* Phones: one block per row, our answer first, so nothing hides off-screen. */}
          <dl className="mt-12 space-y-8 md:hidden">
            {comparison.rows.map((row) => {
              const ours = row.values[row.values.length - 1]!;
              return (
                <div key={row.label}>
                  <dt className="text-[18px] font-semibold leading-snug">{row.label}</dt>
                  <dd className="mt-3 flex items-baseline justify-between gap-4 rounded-[12px] bg-ink px-4 py-3 text-paper">
                    <span className="text-[15px]">SoloDac</span>
                    <span className="text-[16px] font-semibold">{ours}</span>
                  </dd>
                  <dd className="mt-2 space-y-1 px-4 text-[15px] text-ink/65">
                    {comparison.columns.slice(0, -1).map((column, index) => (
                      <div key={column} className="flex justify-between gap-4">
                        <span>{column}</span>
                        <span>{row.values[index]}</span>
                      </div>
                    ))}
                  </dd>
                </div>
              );
            })}
          </dl>
          <div className="mt-14 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[34%] pb-5 text-[15px] font-normal text-ink/55" scope="col"><span className="sr-only">Compared on</span></th>
                  {comparison.columns.map((column, index) => (
                    <th
                      key={column}
                      scope="col"
                      className={`pb-5 pl-4 text-[16px] font-semibold ${index === comparison.columns.length - 1 ? "rounded-t-[14px] bg-ink pt-5 text-paper" : "text-ink/70"}`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, rowIndex) => (
                  <tr key={row.label} className="border-t border-ink/10">
                    <th scope="row" className="py-5 pr-6 text-[17px] font-medium">{row.label}</th>
                    {row.values.map((value, index) => {
                      const ours = index === row.values.length - 1;
                      const last = rowIndex === comparison.rows.length - 1;
                      return (
                        <td
                          key={index}
                          className={`py-5 pl-4 text-[16px] ${ours ? `bg-ink font-semibold text-paper ${last ? "rounded-b-[14px]" : ""}` : value === "No" ? "text-ink/55" : "text-ink/80"}`}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Katran */}
      <section className="container py-24 sm:py-32">
        <Reveal>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
            Katran, our own editing software.
          </h2>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-[18px] leading-relaxed text-paper/70">
              It writes, cuts, captions and designs for our pages every day. Creators get access next, for less than one editor's salary.
            </p>
            <PrimaryButton href="/katran" className="self-start sm:self-auto">See Katran</PrimaryButton>
          </div>
        </Reveal>
      </section>

      {/* How we work */}
      <section className="bg-ink-2">
        <div className="container py-24 sm:py-32">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">How we work.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <h3 className="font-display text-3xl tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-paper/65">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="container py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">Questions we get.</h2>
          </Reveal>
          <dl className="space-y-10 lg:col-span-7 lg:col-start-6">
            {faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={index * 0.05}>
                <dt className="text-[20px] font-semibold">{faq.q}</dt>
                <dd className="mt-2 max-w-[36rem] text-[18px] leading-relaxed text-paper/70">{faq.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Ask */}
      <section className="bg-ink-2">
        <div className="container py-24 sm:py-32">
          <Reveal>
            <h2 className="font-display max-w-4xl text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
              Got a page, a channel or a brand that should be bigger?
            </h2>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-paper/70">
              Tell us where it is today. We'll tell you honestly what we'd do with it.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Magnetic><PrimaryButton href="/contact">Book a call</PrimaryButton></Magnetic>
              <Link href="/services" className="text-[15px] font-semibold text-paper/80 hover:text-paper">Or see every service</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
