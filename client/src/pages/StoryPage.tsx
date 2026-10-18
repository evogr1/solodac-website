import { ChevronRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Link, useLocation, useRoute } from "wouter";
import Reveal from "../components/Reveal";
import { Cover, PublisherLayout, SectionTitle, StoryCard } from "../components/publisher";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { ips, igUrl } from "../lib/ips";
import { stories, storyPath } from "../lib/stories";

export default function StoryPage() {
  useScrollToTop();
  const [match, params] = useRoute("/stories/:slug");
  const [, setLocation] = useLocation();
  const story = stories.find((item) => item.slug === params?.slug);

  if (match && !story) {
    setLocation("/404");
    return null;
  }
  if (!story) return null;

  const ip = ips.find((item) => item.name === story.ip);
  const related = stories.filter((item) => item.slug !== story.slug && (item.category === story.category || item.ip === story.ip)).slice(0, 4);
  const mostViewed = stories.filter((item) => item.slug !== story.slug).slice(0, 5);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: story.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch {
      // user dismissed the share sheet
    }
  };

  return (
    <PublisherLayout activeSection={story.category}>
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <article className="rounded-xl bg-white p-6 shadow-sm sm:p-10">
            <nav className="flex flex-wrap items-center gap-1 text-xs text-neutral-500">
              <Link href="/" className="hover:text-[#e2365b]">Home</Link>
              <ChevronRight size={12} />
              <Link href={`/?section=${encodeURIComponent(story.category)}`} className="hover:text-[#e2365b]">{story.category}</Link>
            </nav>
            <div className="mt-6 text-[11px] font-bold uppercase tracking-wider text-[#e2365b]">{story.category}</div>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{story.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">{story.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-neutral-200 py-3">
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                {ip && <img src={ip.logo} alt="" className="h-9 w-9 rounded-full object-cover" />}
                <div>
                  <div className="font-bold text-neutral-800">By {story.ip}</div>
                  <div>{story.date} · {story.readTime}</div>
                </div>
              </div>
              <button onClick={share} className="flex items-center gap-1.5 rounded border border-neutral-300 px-3 py-1.5 text-xs font-bold hover:border-[#e2365b] hover:text-[#e2365b]">
                <Share2 size={13} /> Share
              </button>
            </div>

            <Cover story={story} className="mt-6 h-72 rounded-lg sm:h-[420px]" />

            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-neutral-800">
              {story.body.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-[Georgia,serif] first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-[#e2365b]" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            {ip && (
              <a href={igUrl(ip.handle)} target="_blank" rel="noreferrer" className="mt-8 flex items-center gap-4 rounded-xl border border-neutral-200 p-4 hover:border-[#e2365b]">
                <img src={ip.logo} alt="" className="h-14 w-14 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="font-extrabold">{ip.name}</div>
                  <div className="text-sm text-neutral-600">{ip.tagline} {ip.followers} followers.</div>
                </div>
                <span className="rounded bg-[#e2365b] px-3 py-2 text-xs font-black uppercase tracking-wide text-white">Follow</span>
              </a>
            )}
          </article>
        </Reveal>

        <aside className="h-fit rounded-xl bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-[Georgia,serif] text-2xl font-bold text-[#e2365b]">Most read</h2>
          <ol className="mt-3 divide-y divide-neutral-200">
            {mostViewed.map((item, index) => (
              <li key={item.slug}>
                <Link href={storyPath(item)} className="group flex gap-4 py-4">
                  <span className="w-5 shrink-0 font-[Georgia,serif] text-2xl font-bold leading-none text-[#e2365b]">{index + 1}</span>
                  <span className="border-l border-neutral-200 pl-4">
                    <span className="block text-sm font-bold leading-snug group-hover:text-[#e2365b]">{item.title}</span>
                    <span className="mt-1 block text-xs text-neutral-500">{item.ip} · {item.readTime}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <SectionTitle>More like this</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => <StoryCard key={item.slug} story={item} />)}
          </div>
        </div>
      )}
    </PublisherLayout>
  );
}
