import { PageHero, PublisherLayout, SectionTitle, StatStrip, StoryCard } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { stories } from "../lib/stories";

export default function CaseStudies() {
  useScrollToTop();
  const top = [...stories].sort((a, b) => parseViews(b.views) - parseViews(a.views)).slice(0, 8);

  return (
    <PublisherLayout ctaTitle="Want your brand to be the next one?">
      <PageHero crumb="Selected work" kicker="Selected work" title="Proof, not promises." deck="What SoloDac content does when it lands: the top-performing stories across our network, with the numbers that came with them." />
      <div className="mt-6">
        <StatStrip items={[{ value: "15.4M", label: "Followers" }, { value: "18.2B+", label: "Annual views" }, { value: "121M", label: "Accounts reached" }, { value: "89.6M", label: "Interactions" }, { value: "794.8K", label: "Views, one reel" }]} />
      </div>
      <div className="mt-8">
        <SectionTitle number="01">Top-performing stories</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((story) => <StoryCard key={story.href} story={story} />)}
        </div>
      </div>
    </PublisherLayout>
  );
}

function parseViews(views: string) {
  const value = parseFloat(views);
  return views.toUpperCase().includes("K") ? value * 1_000 : views.toUpperCase().includes("M") ? value * 1_000_000 : value;
}
