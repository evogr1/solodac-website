import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import Reel from "@/components/katran/Reel";
import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import { millionViewReels as reels } from "@/lib/reels";
import { scrollToId } from "@/lib/smoothScroll";

const ways = [
  {
    title: "Reels from long videos",
    body: "Send a podcast, interview or talk. Katran finds the moment worth posting, cuts it vertical, writes the hook and sets the captions.",
  },
  {
    title: "YouTube videos from a voiceover",
    body: "Send the voiceover. Katran cuts footage to the script and adds the titles and the music.",
  },
  {
    title: "Carousels from a topic",
    body: "Send a topic. Katran writes the slides, designs them and checks the facts.",
  },
];

const faqs = [
  { q: "Is it live?", a: "Yes, for us. Our editors and our pages use it every day. Creator access opens in batches, and the waitlist goes first." },
  { q: "Will my videos look AI-made?", a: "That's the one thing we built it to avoid. If an edit wouldn't pass on our own pages, it doesn't ship." },
  { q: "Who is it for?", a: "YouTube creators, Instagram page owners and small editing teams who post a lot and want to spend less time on the timeline." },
  { q: "What will it cost?", a: "Less than one full-time editor's monthly salary. Exact pricing goes to the waitlist first." },
];

const ease = [0.16, 1, 0.3, 1] as const;

/** Rises once into place as it enters; static for reduced motion. */
function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function JoinButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => scrollToId("waitlist")}
      className={`rounded-full bg-signal px-6 py-3.5 text-[15px] font-semibold text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-paper active:scale-[0.97] ${className}`}
    >
      Join the waitlist
    </button>
  );
}

export default function Katran() {
  return (
    <Layout>
      <section className="container pt-32 sm:pt-36 lg:pt-40">
        <Rise>
          <h1 className="font-display text-[clamp(44px,5.6vw,92px)] leading-[0.95] tracking-[-0.04em]">
            A full production house.
            <span className="block text-paper/45">For less than one editor's salary.</span>
          </h1>
        </Rise>
        <Rise delay={0.1} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[36rem] text-[18px] leading-relaxed text-paper/80">
            Katran writes, cuts, captions and designs for the SoloDac pages. Reels, YouTube videos and carousels, every day.
          </p>
          <JoinButton className="self-start sm:self-auto" />
        </Rise>
      </section>

      <section className="pb-24 pt-16 sm:pb-32 lg:pt-20" aria-labelledby="reels">
        <div className="container">
          <h2 id="reels" className="text-[15px] text-paper/60">
            Made by Katran. Each one passed a million views. Tap to watch.
          </h2>
        </div>
        <div className="container mt-5">
          <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {reels.map((reel, index) => (
              <Rise key={reel.id} delay={0.15 + index * 0.06} className="w-[62vw] max-w-[260px] shrink-0 snap-start sm:w-[34vw] lg:w-auto lg:max-w-none">
                <Reel reel={reel} />
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Rise className="lg:col-span-4">
            <h2 className="font-display text-[clamp(40px,4.4vw,68px)] leading-[0.98] tracking-[-0.04em]">What it makes.</h2>
          </Rise>
          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            {ways.map((way, index) => (
              <Rise key={way.title} delay={index * 0.06}>
                <h3 className="font-display text-[clamp(26px,2.4vw,36px)] leading-tight tracking-[-0.02em]">{way.title}</h3>
                <p className="mt-3 max-w-[34rem] text-[18px] leading-relaxed text-paper/75">{way.body}</p>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Rise className="lg:col-span-4">
            <h2 className="font-display text-[clamp(40px,4.4vw,68px)] leading-[0.98] tracking-[-0.04em]">Before you join.</h2>
          </Rise>
          <dl className="space-y-10 lg:col-span-7 lg:col-start-6">
            {faqs.map((faq, index) => (
              <Rise key={faq.q} delay={index * 0.05}>
                <dt className="text-[20px] font-semibold">{faq.q}</dt>
                <dd className="mt-2 max-w-[34rem] text-[18px] leading-relaxed text-paper/75">{faq.a}</dd>
              </Rise>
            ))}
          </dl>
        </div>
      </section>

      <section id="waitlist" className="bg-ink-2">
        <div className="container grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(40px,4.4vw,68px)] leading-[0.98] tracking-[-0.04em]">Join the waitlist.</h2>
            <p className="mt-6 max-w-[26rem] text-[18px] leading-relaxed text-paper/75">
              Tell us what you make. We open access in batches and pick creators whose work fits each batch.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
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
          </div>
        </div>
      </section>
    </Layout>
  );
}
