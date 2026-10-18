import { Link } from "wouter";
import { PrimaryButton, PublisherLayout, SectionTitle, StoryCard } from "../components/publisher";
import { stories } from "../lib/stories";

export default function NotFound() {
  return (
    <PublisherLayout>
      <section className="rounded-xl bg-white p-8 text-center shadow-sm sm:p-14">
        <div className="font-[Georgia,serif] text-7xl font-bold text-[#e2365b] sm:text-9xl">404</div>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">This page ghosted us.</h1>
        <p className="mx-auto mt-3 max-w-md text-neutral-600">Wrong link, old bookmark, or you&apos;re just poking around. Either way, there&apos;s nothing here. Unlike everything else we make, this page did not earn your attention.</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryButton href="/">Take me home</PrimaryButton>
          <Link href="/marketing" className="text-xs font-bold uppercase tracking-wide text-neutral-500 hover:text-[#e2365b]">Or just book a call, we won&apos;t judge</Link>
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
