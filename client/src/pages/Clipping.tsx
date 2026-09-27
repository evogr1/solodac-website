import { ArrowUpRight, Check, Clapperboard, Network, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { useScrollToTop } from "../hooks/useScrollToTop";

const easeOut = [0.23, 1, 0.32, 1] as const;

const tracks = [
  {
    icon: Clapperboard,
    color: "lime",
    label: "Repurposing",
    title: "Turn one long video into ten reasons to be found.",
    description:
      "Send us your podcast, stream, or long-form video. We find the moments that actually land, cut them for the platform they're going to, and hand back a batch of clips ready to post — captioned, paced, and shaped to earn the first three seconds.",
    bullets: ["Podcasts & YouTube long-form", "Livestream VODs", "Talking-head & interviews", "Captioned, hook-first edits"],
  },
  {
    icon: Network,
    color: "coral",
    label: "Clip network",
    title: "A network of clippers, posting your content everywhere at once.",
    description:
      "We run and pay a roster of clip accounts that post cuts of your content across TikTok, Reels, and Shorts. More accounts, more posts, more shots at the algorithm — tracked and reported so you can see exactly what reach it bought you.",
    bullets: ["Whitelisted clipper roster", "Multi-platform distribution", "Per-clip / per-view payout tracking", "Weekly reach reporting"],
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$750",
    period: "/mo",
    tagline: "For testing whether clipping is worth your budget.",
    features: ["Up to 20 clips / month", "1 source (podcast, stream, or channel)", "Captioned, platform-ready edits", "Monthly performance recap"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$1,800",
    period: "/mo",
    tagline: "Repurposing plus a small clip network running alongside it.",
    features: ["Up to 60 clips / month", "Up to 2 sources", "10-account clip network distribution", "Bi-weekly reporting", "Hook & thumbnail testing"],
    highlight: true,
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    tagline: "Full clip farm running at volume across your catalog.",
    features: ["Unlimited clips", "Unlimited sources", "30+ account clip network", "Dedicated editor + strategist", "Weekly reporting & payout tracking"],
    highlight: false,
  },
];

const proof = [
  { stat: "18B+", label: "Views a year across our owned & extended pages" },
  { stat: "300+", label: "Clips cut and posted in an average month" },
  { stat: "48h", label: "Typical turnaround from raw footage to first batch" },
];

export default function Clipping() {
  useScrollToTop();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] noise" />
      <SiteHeader />
      <main className="min-h-screen overflow-hidden bg-ink text-paper selection:bg-lime selection:text-ink">
        <section className="relative z-10 border-b border-white/10 px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pb-28 lg:pt-40">
          <div className="absolute right-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-lime/10 blur-[120px]" />
          <div className="mx-auto max-w-[1440px]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }}>
              <div className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-lime">
                <span className="h-px w-10 bg-lime" /> SoloDac / Clipping
              </div>
              <h1 className="max-w-4xl font-display text-[clamp(3.2rem,9vw,7.5rem)] font-black leading-[0.86] tracking-[-0.08em]">
                Your long-form,<br />cut into everywhere.
              </h1>
              <p className="mt-9 max-w-2xl text-xl leading-relaxed text-white/60 sm:text-2xl">
                We clip your podcasts, streams, and videos into short-form that gets watched — then, if you want more than that, we run a network of clip accounts to post it everywhere at once.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/eyeballs" className="group flex items-center gap-4 rounded-full bg-lime px-6 py-4 text-sm font-black text-ink transition-all hover:-translate-y-1 hover:bg-[#d8ff2f]">
                  Book a clipping call <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
                <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="text-xs font-bold uppercase tracking-[0.16em] text-white/50 hover:text-lime">
                  See pricing
                </button>
              </div>
            </motion.div>

            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {proof.map((item, index) => (
                <Reveal key={item.label} delay={index * 0.08}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="font-display text-4xl font-black tracking-[-0.06em] text-lime">{item.stat}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-paper px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-14 max-w-2xl">
              <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-ink/45">
                <span className="h-px w-10 bg-coral" /> Two ways to run it
              </div>
              <h2 className="font-display text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl">
                Just cut it, or <span className="text-coral">put it everywhere.</span>
              </h2>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-2">
              {tracks.map((track, index) => {
                const Icon = track.icon;
                return (
                  <Reveal key={track.label} delay={index * 0.1}>
                    <div className="flex h-full flex-col rounded-3xl border border-ink/15 bg-ink p-8 text-paper sm:p-10">
                      <div className={`mb-8 grid h-14 w-14 place-items-center rounded-2xl ${track.color === "lime" ? "bg-lime text-ink" : "bg-coral text-ink"}`}>
                        <Icon size={26} />
                      </div>
                      <div className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-white/45">{track.label}</div>
                      <h3 className="font-display text-3xl font-black leading-[0.95] tracking-[-0.06em] sm:text-4xl">{track.title}</h3>
                      <p className="mt-5 text-base leading-relaxed text-white/60">{track.description}</p>
                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {track.bullets.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-2 text-sm text-white/70">
                            <Check size={16} className={`mt-0.5 shrink-0 ${track.color === "lime" ? "text-lime" : "text-coral"}`} />
                            {bullet}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pricing" className="relative z-10 bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-14 max-w-2xl">
              <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-lime">
                <span className="h-px w-10 bg-lime" /> Pricing
              </div>
              <h2 className="font-display text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl">Pick your volume.</h2>
              <p className="mt-5 text-base leading-relaxed text-white/50">Starting points — every plan gets scoped to your footage and goals on the call.</p>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              {pricing.map((tier, index) => (
                <Reveal key={tier.name} delay={index * 0.08}>
                  <div
                    className={`flex h-full flex-col rounded-3xl border p-8 ${
                      tier.highlight ? "border-lime bg-lime/[0.06]" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    {tier.highlight && (
                      <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-ink">
                        <Sparkles size={12} /> Most popular
                      </div>
                    )}
                    <h3 className="font-display text-2xl font-black tracking-[-0.05em]">{tier.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="font-display text-5xl font-black tracking-[-0.06em]">{tier.price}</span>
                      {tier.period && <span className="text-sm text-white/45">{tier.period}</span>}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/55">{tier.tagline}</p>
                    <div className="mt-7 flex-1 space-y-3 border-t border-white/10 pt-7">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2 text-sm text-white/70">
                          <Check size={16} className="mt-0.5 shrink-0 text-lime" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/eyeballs"
                      className={`mt-8 flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-black transition-all hover:-translate-y-1 ${
                        tier.highlight ? "bg-lime text-ink hover:bg-[#d8ff2f]" : "border border-white/20 text-paper hover:border-lime hover:text-lime"
                      }`}
                    >
                      Get started <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-paper px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <Reveal>
                <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-ink/45">
                  <span className="h-px w-10 bg-coral" /> How it runs
                </div>
                <h2 className="font-display text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-6xl">
                  Simple <span className="text-coral">to hand off.</span>
                </h2>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { step: "01", title: "Send us the footage", body: "Drop a link to your podcast, stream, or channel, or give us access to pull from." },
                  { step: "02", title: "We cut the batch", body: "Editors find the moments, cut and caption them, and send a batch back for approval." },
                  { step: "03", title: "You approve, we post", body: "Approve the batch, and we schedule it across your channels or the clip network." },
                  { step: "04", title: "You get the numbers", body: "Views, reach, and payout tracking, reported on the cadence your plan includes." },
                ].map((item, index) => (
                  <Reveal key={item.step} delay={(index % 4) * 0.06}>
                    <div className="rounded-2xl border border-ink/15 p-5">
                      <span className="mb-8 block font-mono text-xs text-ink/40">{item.step}</span>
                      <h3 className="font-display text-2xl font-black tracking-[-0.06em]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-coral px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-ink/55">
                <span className="h-px w-10 bg-ink/60" /> Ready when you are
              </div>
              <h2 className="max-w-2xl font-display text-5xl font-black leading-[0.86] tracking-[-0.08em] sm:text-7xl">
                Stop leaving clips<br />on the table.
              </h2>
            </div>
            <Link
              href="/eyeballs"
              className="group flex shrink-0 items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm font-black text-paper transition-transform hover:-translate-y-1"
            >
              Send a brief <TrendingUp size={18} className="text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </section>

        <footer className="relative z-10 bg-ink px-5 py-8 text-paper sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-white/10 pt-7">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink"><span className="h-2.5 w-2.5 rounded-full bg-ink" /></span>
              <span className="font-display text-2xl font-black tracking-[-0.08em]">SoloDac</span>
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Digital media, content & growth.</span>
          </div>
        </footer>
      </main>
    </>
  );
}
