import { useState } from "react";
import { IpProfileCard, PageHero, PublisherLayout, SectionTitle, StoryCard } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { ips } from "../lib/ips";
import { stories } from "../lib/stories";

export default function Portfolio() {
  useScrollToTop();
  const [ip, setIp] = useState("All");
  const filtered = ip === "All" ? stories : stories.filter((story) => story.ip === ip);
  const filters = ["All", ...Array.from(new Set(stories.map((story) => story.ip)))];

  return (
    <PublisherLayout ctaTitle="Want on the network?">
      <PageHero crumb="Portfolio" kicker="Portfolio" title="Not a mockup. A live network." deck="We don't pitch from a deck. Our media brands are live, publishing daily to millions of followers." />

      <div className="mt-8">
        <SectionTitle number="01">The IPs</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ips.map((item) => <IpProfileCard key={item.handle} ip={item} wide />)}
        </div>
      </div>

      <div className="mt-8">
        <SectionTitle
          number="02"
          action={
            <div className="flex gap-1">
              {filters.map((name) => (
                <button key={name} onClick={() => setIp(name)} className={`rounded px-3 py-1.5 text-xs font-bold ${ip === name ? "bg-[#e2365b] text-white" : "bg-white text-neutral-600 hover:text-[#e2365b]"}`}>
                  {name}
                </button>
              ))}
            </div>
          }
        >
          Recent reels
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((story) => <StoryCard key={story.href} story={story} />)}
        </div>
      </div>
    </PublisherLayout>
  );
}
