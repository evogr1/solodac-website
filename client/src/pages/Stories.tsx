import { useState } from "react";
import { Link } from "wouter";
import NewsletterSignup from "../components/NewsletterSignup";
import { StockTicker } from "../components/PublisherHeader";
import Reveal from "../components/Reveal";
import { Cover, PublisherLayout, StoryCard, StoryMeta } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { stories, storyPath } from "../lib/stories";

const byDate = [...stories].sort((a, b) => parseInt(b.date) - parseInt(a.date));

export default function Stories() {
  useScrollToTop();
  const categories = ["All", ...Array.from(new Set(stories.map((story) => story.category)))];
  const [category, setCategory] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get("section");
    return requested && categories.includes(requested) ? requested : "All";
  });
  const filtered = category === "All" ? byDate : byDate.filter((story) => story.category === category);
  const [lead, ...rest] = filtered;

  return (
    <PublisherLayout ctaTitle="Want your story told like this?">
      <section className="border-b border-ink/10 pb-10 pt-6 sm:pt-10">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-pink">The SoloDac newsroom</div>
          <h1 className="font-headline mt-3 text-5xl leading-[0.95] text-green sm:text-7xl">
            Stories worth <span className="font-accent text-pink">stopping</span> for.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">Founders, markets and the moments that move India&apos;s business conversation, from the pages we run.</p>
        </Reveal>
        <div className="mt-8"><StockTicker /></div>
      </section>

      <div className="flex gap-2 overflow-x-auto py-6 [scrollbar-width:none]">
        {categories.map((name) => (
          <button
            key={name}
            onClick={() => setCategory(name)}
            className={`shrink-0 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${category === name ? "bg-ink text-paper" : "border border-ink/15 text-ink/60 hover:border-green hover:text-green"}`}
          >
            {name}
          </button>
        ))}
      </div>

      {lead && (
        <Reveal>
          <Link href={storyPath(lead)} className="group grid overflow-hidden rounded-2xl border border-ink/10 bg-white/60 md:grid-cols-[1fr_1.1fr]">
            <Cover story={lead} className="h-72 md:h-full md:min-h-[380px]" />
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pink">{lead.category}</div>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight group-hover:text-green sm:text-4xl">{lead.title}</h2>
              <p className="mt-4 text-ink/60">{lead.excerpt}</p>
              <div className="mt-6"><StoryMeta story={lead} /></div>
            </div>
          </Link>
        </Reveal>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((story) => <StoryCard key={story.slug} story={story} />)}
      </div>

      <div className="mt-14">
        <NewsletterSignup source="stories" />
      </div>
    </PublisherLayout>
  );
}
