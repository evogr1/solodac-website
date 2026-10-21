import { ChevronRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Link, useLocation, useRoute } from "wouter";
import NewsletterSignup from "../components/NewsletterSignup";
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
    <PublisherLayout>
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <article className="rounded-2xl border border-ink/10 bg-white/60 p-6 sm:p-10">
            <nav className="flex flex-wrap items-center gap-1 text-xs text-ink/50">
              <Link href="/" className="hover:text-green">Home</Link>
              <ChevronRight size={12} />
              <Link href={`/stories?section=${encodeURIComponent(story.category)}`} className="hover:text-green">{story.category}</Link>
            </nav>
            <div className="mt-6 text-[11px] font-bold uppercase tracking-wider text-green">{story.category}</div>
            <h1 className="font-headline mt-3 text-4xl leading-[0.95] text-green sm:text-6xl">{story.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/65">{story.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-ink/10 py-3">
              <div className="flex items-center gap-3 text-xs text-ink/50">
                {ip && <img src={ip.logo} alt="" className="h-9 w-9 rounded-full object-cover" />}
                <div>
                  <div className="font-bold text-ink/85">By {story.ip}</div>
                  <div>{story.date} · {story.readTime}</div>
                </div>
              </div>
              <button onClick={share} className="flex items-center gap-1.5 rounded border border-ink/15 px-3 py-1.5 text-xs font-bold hover:border-green hover:text-green">
                <Share2 size={13} /> Share
              </button>
            </div>

            <Cover story={story} className="mt-6 h-72 rounded-lg sm:h-[420px]" />

            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink/85">
              {story.body.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-accent first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-green" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <NewsletterSignup source={`article: ${story.slug}`} compact />
            </div>

            {ip && (
              <a href={igUrl(ip.handle)} target="_blank" rel="noreferrer" className="mt-8 flex items-center gap-4 rounded-xl border border-ink/10 p-4 hover:border-green">
                <img src={ip.logo} alt="" className="h-14 w-14 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="font-bold tracking-tight">{ip.name}</div>
                  <div className="text-sm text-ink/65">{ip.tagline} {ip.followers} followers.</div>
                </div>
                <span className="rounded bg-green px-3 py-2 text-xs font-black uppercase tracking-wide text-paper">Follow</span>
              </a>
            )}
          </article>
        </Reveal>

        <aside className="h-fit rounded-2xl border border-ink/10 bg-white/60 p-5 lg:sticky lg:top-24">
          <h2 className="font-accent text-2xl font-bold text-green">Most read</h2>
          <ol className="mt-3 divide-y divide-ink/10">
            {mostViewed.map((item, index) => (
              <li key={item.slug}>
                <Link href={storyPath(item)} className="group flex gap-4 py-4">
                  <span className="w-5 shrink-0 font-accent text-2xl font-bold leading-none text-green">{index + 1}</span>
                  <span className="border-l border-ink/10 pl-4">
                    <span className="block text-sm font-bold leading-snug group-hover:text-green">{item.title}</span>
                    <span className="mt-1 block text-xs text-ink/50">{item.ip} · {item.readTime}</span>
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
