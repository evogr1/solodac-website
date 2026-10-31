import { useState } from "react";

export type ReelData = {
  /** YouTube video id, or the Instagram shortcode when `platform` is "instagram". */
  id: string;
  platform?: "youtube" | "instagram";
  title: string;
  poster: string;
  page: string;
  views: number;
  seconds: number;
};

/** 3646045 → "3.6M views", 52979 → "52,979 views". */
function formatViews(views: number) {
  if (views >= 1_000_000) return `${(Math.floor(views / 100_000) / 10).toFixed(1)}M views`;
  return `${views.toLocaleString("en-IN")} views`;
}

/** A real reel from one of our pages. YouTube reels play in place; Instagram reels open on Instagram. */
export default function Reel({ reel, className }: { reel: ReelData; className?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={className}>
      {/* The cover trims the reel's black bands; the frame opens to full 9:16 once it plays. */}
      <div className={`relative overflow-hidden rounded-[14px] bg-ink-3 ${playing ? "aspect-[9/16]" : "aspect-[4/5]"}`}>
        {reel.platform === "instagram" ? (
          <a
            href={`https://www.instagram.com/reel/${reel.id}/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch on Instagram: ${reel.title}`}
            className="group absolute inset-0 block"
          >
            <img
              src={reel.poster}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[50%_46%] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full bg-paper text-ink transition-colors duration-200 group-hover:bg-signal"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4">
                <path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ) : playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${reel.id}?autoplay=1&playsinline=1&rel=0`}
            title={reel.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${reel.title}`}
            className="group absolute inset-0 block"
          >
            <img
              src={reel.poster}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[50%_46%] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full bg-paper text-ink transition-colors duration-200 group-hover:bg-signal"
            >
              <svg viewBox="0 0 16 16" className="ml-0.5 h-4 w-4">
                <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex flex-col text-[14px] leading-snug text-paper/60">
        <span className="text-paper">{reel.page}</span>
        <span>{formatViews(reel.views)}</span>
      </figcaption>
    </figure>
  );
}
