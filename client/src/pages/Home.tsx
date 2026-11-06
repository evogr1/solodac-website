import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import HeroHeadline from "@/components/effects/HeroHeadline";
import Magnetic from "@/components/effects/Magnetic";
import MeshGradient from "@/components/effects/MeshGradient";
import FiveHires from "@/components/home/FiveHires";
import GrowthPicker from "@/components/home/GrowthPicker";
import HowItFits from "@/components/home/HowItFits";
import RotatingWord from "@/components/home/RotatingWord";
import ClientWall from "@/components/proof/ClientWall";
import ReelWall from "@/components/proof/ReelWall";
import Reveal from "@/components/Reveal";
import { GhostButton, PrimaryButton } from "@/components/site";
import { indianNumber } from "@/lib/format";
import { totalReelViews } from "@/lib/reels";
import { networkPages, newsletterReaders, services, totalFollowers } from "@/lib/site";

const heroStats = [
  { value: totalReelViews, label: "views on six of our reels" },
  { value: indianNumber(totalFollowers), label: "people follow our named pages" },
  { value: indianNumber(newsletterReaders), label: "newsletter readers" },
];

const growing = ["YouTube channels.", "personal brands.", "Instagram pages.", "communities.", "brands.", "newsletters."];

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
  { title: "A 30-minute call", body: "We look at your page, channel or brand with you and tell you plainly whether we can help." },
  { title: "A plan in writing", body: "The niche, the formats, the posting schedule and the monthly price, agreed before any work starts." },
  { title: "Work goes out on schedule", body: "Our team scripts, edits, designs and posts. Nothing goes live without your sign-off." },
  { title: "A monthly review", body: "The numbers, what worked, what didn't and what we change next month." },
]

const faqs = [
  {
    q: "Is SoloDac only about reels?",
    a: "No. We run YouTube channels, Instagram pages and newsletters, edit for founders and creators, build personal brands, run brand partnerships on our pages, and design brand identities and websites. Reels are simply the part people see first.",
  },
  { q: "Can my brand advertise on your pages?", a: "Yes. We offer sponsored posts, story features and launch campaigns across several pages. The Network page lists the audiences." },
  { q: "Do you work with clients outside India?", a: "Yes. Alongside the pages on this site, we run unbranded pages and channels for audiences in the US, the UK and India." },
  { q: "How is the work priced?", a: "Most work runs on a monthly retainer. You get the price in writing, with what it covers, before anything starts." },
  { q: "What is Katran?", a: "The editing software we built for our own pages. Our editors use it every day, and creators can join the waitlist for early access." },
  { q: "How do we get started?", a: "Book a 30-minute call. We'll look at where your page, channel or brand is today and where you want it to be." },
]

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-32 sm:pb-14 sm:pt-40">
        {/* The glow covers the top of the hero and fades out before the numbers and reels. */}
        <div className="pointer-events-none absolute -inset-x-[12%] -top-[12%] h-[min(105svh,1040px)] [mask-image:linear-gradient(to_bottom,#000_45%,transparent_90%)]"><MeshGradient /></div>
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
                We run our own pages every day, so we know what works. Now we run yours.
              </p>
              <div className="flex flex-wrap gap-3">
                <Magnetic><PrimaryButton href="/contact">Book a call</PrimaryButton></Magnetic>
                <Magnetic><GhostButton href="/work">See our work</GhostButton></Magnetic>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            {/* One row on every screen, numbers lined up along the top. */}
            <dl className="mt-12 grid grid-cols-3 gap-x-4 sm:mt-16 sm:gap-x-8 lg:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="mt-2 text-[14px] leading-snug text-paper/60 sm:text-[15px]">{stat.label}</dt>
                  <dd className="font-display order-first text-[clamp(24px,6vw,44px)] leading-none tracking-[-0.03em] lg:text-[clamp(32px,3.6vw,52px)]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        {/* Who we have worked with: straight under the numbers, above the reels. */}
        <ClientWall bare className="relative mt-14 sm:mt-20" />
        <Reveal delay={0.26} className="relative mt-14 sm:mt-20">
          <ReelWall />
        </Reveal>
      </section>

      {/* How the three arms fit together */}
      <section className="container py-14 sm:py-20" aria-label="How SoloDac fits together">
        <HowItFits />
      </section>

      {/* The problem */}
      <section className="container py-14 sm:py-20">
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
      <section className="container pb-14 sm:pb-20" aria-labelledby="growing">
        <GrowthPicker />
      </section>

      {/* Every service */}
      <section aria-labelledby="everything">
        <div className="container py-14 sm:py-20">
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

      {/* Proof: our own pages, as case studies */}
      <section className="container py-14 sm:py-20" aria-labelledby="work">
        <Reveal>
          <h2 id="work" className="font-display max-w-4xl text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.03em]">
            Our case studies are our own pages.
          </h2>
          <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-paper/70">
            We built each of these and still run them every day. The reels above came from them.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {networkPages.map((page, index) => (
            <li key={page.slug}>
              <Reveal delay={index * 0.05} className="h-full">
                <Link href={`/work#${page.slug}`} className="group flex h-full flex-col rounded-2xl bg-ink-2 p-6 transition-colors duration-200 hover:bg-ink-3">
                  <div className="flex items-start justify-between">
                    <img src={page.logo} alt="" className="h-12 w-12 rounded-full object-cover" />
                    <ArrowUpRight aria-hidden="true" size={18} className="text-paper/40 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
                  </div>
                  <span className="font-display mt-8 text-[24px] leading-tight tracking-[-0.02em]">{page.name}</span>
                  <span className="mt-1 text-[14px] text-paper/55">{page.category}</span>
                  <span className="font-display mt-6 text-[32px] leading-none tracking-[-0.03em]">{page.followers}</span>
                  <span className="mt-1 text-[14px] text-paper/55">followers</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <PrimaryButton href="/work">See the case studies</PrimaryButton>
          <GhostButton href="/contact?service=Brand%20partnership">Advertise with us</GhostButton>
        </div>
      </section>

      {/* Comparison */}
      <section aria-labelledby="compare">
        <div className="container py-14 sm:py-20">
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
                  <dd className="mt-3 flex items-baseline justify-between gap-4 rounded-[12px] bg-paper/[0.07] px-4 py-3">
                    <span className="text-[15px] font-semibold text-signal">SoloDac</span>
                    <span className="text-[16px] font-semibold">{ours}</span>
                  </dd>
                  <dd className="mt-2 space-y-1 px-4 text-[15px] text-paper/65">
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
                  <th className="w-[34%] pb-5 text-[15px] font-normal text-paper/55" scope="col"><span className="sr-only">Compared on</span></th>
                  {comparison.columns.map((column, index) => (
                    <th
                      key={column}
                      scope="col"
                      className={`pb-5 pl-4 text-[16px] font-semibold ${index === comparison.columns.length - 1 ? "rounded-t-[14px] bg-paper/[0.07] pt-5 text-signal" : "text-paper/70"}`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, rowIndex) => (
                  <tr key={row.label} className="border-t border-paper/10">
                    <th scope="row" className="py-5 pr-6 text-[17px] font-medium">{row.label}</th>
                    {row.values.map((value, index) => {
                      const ours = index === row.values.length - 1;
                      const last = rowIndex === comparison.rows.length - 1;
                      return (
                        <td
                          key={index}
                          className={`py-5 pl-4 text-[16px] ${ours ? `bg-paper/[0.07] font-semibold text-paper ${last ? "rounded-b-[14px]" : ""}` : value === "No" ? "text-paper/55" : "text-paper/80"}`}
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
      <section className="container py-14 sm:py-20">
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
      <section>
        <div className="container py-14 sm:py-20">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">How we work with you.</h2>
          </Reveal>
          {/* A real sequence, so the steps sit on one line with a marker each, start to finish. */}
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[5px] hidden h-px bg-paper/15 lg:block" />
            {steps.map((step, index) => (
              <li key={step.title} className="relative">
                <Reveal delay={index * 0.08} y={16}>
                  <span aria-hidden="true" className={`block h-[11px] w-[11px] rounded-full ${index === 0 ? "bg-signal" : "bg-paper"}`} />
                  <h3 className="font-display mt-6 text-[clamp(24px,2vw,30px)] leading-tight tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 text-[17px] leading-relaxed text-paper/65">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions */}
      <section className="container py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">Common questions.</h2>
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
      <section>
        <div className="container py-14 sm:py-20">
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
