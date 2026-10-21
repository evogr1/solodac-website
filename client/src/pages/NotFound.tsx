import { Link } from "wouter";
import { PrimaryButton, PublisherLayout, SectionTitle, StoryCard } from "../components/publisher";
import { stories } from "../lib/stories";

export default function NotFound() {
  return (
    <PublisherLayout>
      <section className="rounded-2xl border border-ink/10 bg-white/60 p-8 text-center sm:p-14">
        <div className="font-accent text-7xl font-bold text-green sm:text-9xl">404</div>
        <h1 className="font-headline mt-4 text-4xl text-green sm:text-5xl">This page ghosted us.</h1>
        <p className="mx-auto mt-3 max-w-md text-ink/65">Wrong link, old bookmark, or you&apos;re just poking around. Either way, there&apos;s nothing here. Unlike everything else we make, this page did not earn your attention.</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryButton href="/">Take me home</PrimaryButton>
          <Link href="/marketing" className="text-xs font-bold uppercase tracking-wide text-ink/50 hover:text-green">Or just book a call, we won&apos;t judge</Link>
        </div>
      </section>
      <div className="mt-8">
        <SectionTitle>Read this instead</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stories.slice(0, 4).map((story) => <StoryCard key={story.href} story={story} />)}
        </div>
      </div>
    </PublisherLayout>
  );
}
