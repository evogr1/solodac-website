import { Bot, Code2 } from "lucide-react";
import { toast } from "sonner";
import Reveal from "../components/Reveal";
import { PageHero, Panel, PublisherLayout, SectionTitle, StoryCard } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { stories } from "../lib/stories";

const upcoming = [
  { icon: Bot, label: "Case study 01 / AI", title: "One idea. A dozen good uses.", body: "Articles, captions, website copy, and repurposed content that all sound like the same brand wrote them, because one workflow did, with a real editor checking every piece.", toast: "This one's still marinating. Check back once we've got a client to brag about." },
  { icon: Code2, label: "Case study 02 / Web", title: "A digital home built to move.", body: "A site and landing pages built around one job: make the offer obvious and the next click impossible to miss.", toast: "Plot twist: we haven't built this one yet. It's coming." },
];

export default function CaseStudies() {
  useScrollToTop();

  return (
    <PublisherLayout ctaTitle="Want to be the case study?">
      <PageHero crumb="Case studies" kicker="Selected work" title="Proof, not promises." deck="Client case studies go up as soon as a project wraps, not before. We'd rather show you nothing than make something up. Meanwhile, here's what our own IPs are doing." />

      <div className="mt-8">
        <SectionTitle number="01">From our IPs</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stories.slice(0, 4).map((story) => <StoryCard key={story.href} story={story} />)}
        </div>
      </div>

      <div className="mt-8">
        <SectionTitle number="02">Client work, coming soon</SectionTitle>
        <div className="grid gap-5 lg:grid-cols-2">
          {upcoming.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <Panel className="h-full border border-dashed border-neutral-300 shadow-none">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">{item.label}</span>
                  <item.icon size={20} className="text-neutral-400" />
                </div>
                <div className="mt-6 font-mono text-xs text-neutral-400">CLIENT / COMING SOON™</div>
                <h3 className="mt-2 text-2xl font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                <button type="button" onClick={() => toast.info(item.toast)} className="mt-5 text-xs font-bold uppercase tracking-wide text-[#e2365b]">Read the case study</button>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </PublisherLayout>
  );
}
