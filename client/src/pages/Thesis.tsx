import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import Reveal from "../components/Reveal";
import { PublisherLayout } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { stories, storyPath } from "../lib/stories";

const beliefs = [
  { title: "Attention is earned per second", text: "Not booked per quarter. If people can leave, assume they will. Every three seconds you keep them is a small win." },
  { title: "Consistency beats a viral hit", text: "One lucky post is a fluke. A system that works every week is a business. That's why we run IPs, not one-off campaigns." },
  { title: "If you can't measure it, you're guessing", text: "With a bigger budget. Vanity metrics are just guesses wearing a suit." },
];

export default function Thesis() {
  useScrollToTop();
  const mostViewed = stories.slice(0, 5);

  return (
    <PublisherLayout ctaTitle="Agree with this? Let's talk.">
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <article className="rounded-2xl border border-ink/10 bg-white/60 p-6 sm:p-10">
            <nav className="flex items-center gap-1 text-xs text-ink/50">
              <Link href="/" className="hover:text-green">Home</Link><ChevronRight size={12} /><span className="text-ink/75">Our thesis</span>
            </nav>
            <div className="mt-6 text-[11px] font-bold uppercase tracking-wider text-green">In-depth</div>
            <h1 className="font-headline mt-3 text-4xl leading-[0.95] text-green sm:text-6xl">Most content marketing fails for one boring reason: nobody wanted to watch it.</h1>
            <div className="mt-5 flex items-center gap-3 border-y border-ink/10 py-3 text-xs text-ink/50">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-green"><span className="h-2.5 w-2.5 rounded-full bg-white" /></span>
              <span><span className="font-bold text-ink/85">Team SoloDac</span> · 3 min read</span>
            </div>
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink/75">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:font-accent first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-green">
                Not a targeting problem. Not an algorithm problem. A &quot;we made something nobody asked for&quot; problem. Everything we build starts from the opposite question: would a stranger stop scrolling for this, with nothing riding on it?
              </p>
              <p>That question is why SoloDac runs its own media brands. When you publish every day to an audience that chose to follow you, you find out fast what people actually want. We bring what we learn there to every brand we work with.</p>
            </div>
            <div className="mt-8 space-y-4">
              {beliefs.map((belief, index) => (
                <div key={belief.title} className="flex gap-5 rounded-lg border-l-4 border-green bg-white/50 p-5">
                  <span className="font-accent text-3xl font-bold leading-none text-green">{index + 1}</span>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">{belief.title}</h2>
                    <p className="mt-1 text-ink/65">{belief.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <aside className="h-fit rounded-2xl border border-ink/10 bg-white/60 p-5 lg:sticky lg:top-24">
          <h2 className="font-accent text-2xl font-bold text-green">Most read</h2>
          <ol className="mt-3 divide-y divide-ink/10">
            {mostViewed.map((story, index) => (
              <li key={story.href}>
                <Link href={storyPath(story)} className="group flex gap-4 py-4">
                  <span className="w-5 shrink-0 font-accent text-2xl font-bold leading-none text-green">{index + 1}</span>
                  <span className="border-l border-ink/10 pl-4">
                    <span className="block text-sm font-bold leading-snug group-hover:text-green">{story.title}</span>
                    <span className="mt-1 block text-xs text-ink/50">{story.ip} · {story.readTime}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </PublisherLayout>
  );
}
