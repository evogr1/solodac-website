import Reel from "@/components/katran/Reel";
import FaqSchema from "@/components/FaqSchema";
import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import { GhostButton, PrimaryButton } from "@/components/site";
import { millionViewReels as reels } from "@/lib/reels";
import { katranTools } from "@/lib/site";

// The pilot, in the same words as katran.solodac.com. Keep the two in step.
const pilot = { site: "https://katran.solodac.com/", signup: "https://katran.solodac.com/signup" };

const steps = [
  { title: "Connect your page", body: "Sign in with Facebook and pick your Instagram professional account. Add your YouTube channel to post Shorts too." },
  { title: "Katran makes the reels", body: "It picks ideas that are working in your niche and makes reels in your style, on your own Claude Code plan." },
  { title: "You approve, or autopilot does", body: "Every reel waits for your OK. After you approve 10 in a row you can switch on autopilot, and pause it any time." },
];

const faqs = [
  { q: "Is it live?", a: "Yes. Our own pages use it every day, and creators can join the pilot at katran.solodac.com." },
  { q: "Will my videos look AI-made?", a: "That is the one thing we built it to avoid. If an edit wouldn't pass on our own pages, it doesn't ship." },
  { q: "Who is it for?", a: "YouTube creators, Instagram page owners and small editing teams who post often and want to spend less time on the timeline." },
  { q: "What will it cost?", a: "Nothing. Reels are made on your own Claude Code plan, and Katran doesn't charge for them." },
  { q: "Can it post without asking me?", a: "Only if you switch on autopilot. It unlocks after you approve 10 reels in a row, and you can pause it or switch it off any time." },
];

export default function Katran() {
  return (
    <Layout>
      <FaqSchema faqs={faqs} />
      <section className="container pt-32 sm:pt-40">
        <Reveal>
          <h1 className="font-display max-w-5xl text-[clamp(44px,6.4vw,104px)] leading-[0.94] tracking-[-0.04em]">
            The editor our own pages use every day.
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-2xl text-[19px] leading-relaxed text-paper/80">
            Katran finds ideas that are working in your niche, makes reels in your style and posts them to Instagram and YouTube Shorts at your posting times. Our own pages post with it every day. Free to use. Reels are made on your own Claude Code plan.
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-9 flex flex-wrap gap-3">
          <PrimaryButton href={pilot.signup} external>Join the pilot</PrimaryButton>
          <GhostButton href={pilot.site} external>How the pilot works</GhostButton>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-paper/60">
            Katran is SoloDac's own editing tool. It is in private use and opening to creators in batches. The pilot runs at{" "}
            <a href={pilot.site} target="_blank" rel="noreferrer" className="underline decoration-paper/30 underline-offset-4 hover:text-paper hover:decoration-signal">katran.solodac.com</a>.
          </p>
        </Reveal>
      </section>

      <section className="pb-14 pt-12 sm:pb-20 lg:pt-16" aria-labelledby="reels">
        <div className="container">
          <h2 id="reels" className="text-[15px] text-paper/60">
            Made with Katran on our own pages. Each one passed a million views. Every count links to the public post.
          </h2>
        </div>
        <div className="container mt-5">
          <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-y-8 lg:overflow-visible lg:px-0 lg:pb-0">
            {reels.map((reel, index) => (
              <Reveal key={reel.id} delay={0.1 + index * 0.05} className="w-[62vw] max-w-[260px] shrink-0 snap-start sm:w-[34vw] lg:w-auto lg:max-w-none">
                <Reel reel={reel} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how">
        <div className="container py-14 sm:py-20">
          <Reveal>
            <h2 id="how" className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">How it works.</h2>
          </Reveal>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[5px] hidden h-px bg-paper/15 md:block" />
            {steps.map((step, index) => (
              <li key={step.title} className="relative">
                <Reveal delay={index * 0.08} y={16}>
                  <span aria-hidden="true" className={`block h-[11px] w-[11px] rounded-full ${index === 0 ? "bg-signal" : "bg-paper"}`} />
                  <h3 className="font-display mt-6 text-[clamp(24px,2vw,30px)] leading-tight tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 max-w-[22rem] text-[17px] leading-relaxed text-paper/65">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container py-14 sm:py-20" aria-labelledby="makes">
        <Reveal>
          <h2 id="makes" className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">What it does for our own pages.</h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {katranTools.map((tool, index) => (
            <Reveal key={tool.name} delay={index * 0.06}>
              <div className="flex h-full flex-col rounded-2xl bg-ink-2 p-7">
                <h3 className="font-display text-[clamp(26px,2.2vw,32px)] leading-tight tracking-[-0.02em]">
                  <span className="text-paper/55">{tool.input},</span> {tool.output.charAt(0).toLowerCase() + tool.output.slice(1)}.
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-paper/65">{tool.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pb-14 sm:pb-20" aria-labelledby="brains">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="brains" className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">It remembers every page.</h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[18px] leading-relaxed text-paper/75">
              Each page has its own brain. It holds that page's style, its instructions and what has worked before. A central brain connects them all and keeps every page on track, so instructions don't get lost between one video and the next.
            </p>
            <p className="mt-6 text-[18px] leading-relaxed text-paper/75">
              Coming next to the pilot: long-form YouTube videos and Instagram carousels.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container pb-14 sm:pb-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">Before you join.</h2>
          </Reveal>
          <dl className="space-y-10 lg:col-span-7 lg:col-start-6">
            {faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={index * 0.05}>
                <dt className="text-[20px] font-semibold">{faq.q}</dt>
                <dd className="mt-2 max-w-[34rem] text-[18px] leading-relaxed text-paper/75">{faq.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section id="waitlist">
        <div className="container grid gap-12 py-14 sm:py-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">Not ready to connect yet?</h2>
            <p className="mt-6 max-w-[26rem] text-[18px] leading-relaxed text-paper/75">
              Tell us what you make. We open the pilot in batches and reach out when a spot fits your page.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <LeadForm
              subject="Katran waitlist"
              submitLabel="Join the waitlist"
              successTitle="You're on the list."
              successBody="We'll email you when your batch opens. Keep posting till then."
              fields={[
                { name: "name", label: "Name", type: "text", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "makes", label: "What do you make?", type: "select", required: true, options: ["Long-form YouTube", "Reels and Shorts", "Carousels", "All of it"], half: true },
                { name: "volume", label: "Videos or posts a month", type: "select", options: ["Under 10", "10 to 30", "30 to 100", "100+"], half: true },
                { name: "link", label: "Channel or page link", type: "url", placeholder: "https://" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
