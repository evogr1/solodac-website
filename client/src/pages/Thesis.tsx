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
          <article className="rounded-xl bg-white p-6 shadow-sm sm:p-10">
            <nav className="flex items-center gap-1 text-xs text-neutral-500">
              <Link href="/" className="hover:text-[#e2365b]">Home</Link><ChevronRight size={12} /><span className="text-neutral-700">Our thesis</span>
            </nav>
            <div className="mt-6 text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">In-depth</div>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">Most content marketing fails for one boring reason: nobody wanted to watch it.</h1>
            <div className="mt-5 flex items-center gap-3 border-y border-neutral-200 py-3 text-xs text-neutral-500">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e2365b]"><span className="h-2.5 w-2.5 rounded-full bg-white" /></span>
              <span><span className="font-bold text-neutral-800">Team SoloDac</span> · 3 min read</span>
            </div>
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-neutral-700">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:font-[Georgia,serif] first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-[#e2365b]">
                Not a targeting problem. Not an algorithm problem. A &quot;we made something nobody asked for&quot; problem. Everything we build starts from the opposite question: would a stranger stop scrolling for this, with nothing riding on it?
              </p>
              <p>That question is why SoloDac runs its own media brands. When you publish every day to an audience that chose to follow you, you find out fast what people actually want. We bring what we learn there to every brand we work with.</p>
            </div>
            <div className="mt-8 space-y-4">
              {beliefs.map((belief, index) => (
                <div key={belief.title} className="flex gap-5 rounded-lg border-l-4 border-[#e2365b] bg-neutral-50 p-5">
                  <span className="font-[Georgia,serif] text-3xl font-bold leading-none text-[#e2365b]">{index + 1}</span>
                  <div>
                    <h2 className="text-lg font-extrabold">{belief.title}</h2>
                    <p className="mt-1 text-neutral-600">{belief.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <aside className="h-fit rounded-xl bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-[Georgia,serif] text-2xl font-bold text-[#e2365b]">Most read</h2>
          <ol className="mt-3 divide-y divide-neutral-200">
            {mostViewed.map((story, index) => (
              <li key={story.href}>
                <Link href={storyPath(story)} className="group flex gap-4 py-4">
                  <span className="w-5 shrink-0 font-[Georgia,serif] text-2xl font-bold leading-none text-[#e2365b]">{index + 1}</span>
                  <span className="border-l border-neutral-200 pl-4">
                    <span className="block text-sm font-bold leading-snug group-hover:text-[#e2365b]">{story.title}</span>
                    <span className="mt-1 block text-xs text-neutral-500">{story.ip} · {story.readTime}</span>
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
