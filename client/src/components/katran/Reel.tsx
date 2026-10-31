import { useState } from "react";

export type ReelData = {
  id: string;
  title: string;
  poster: string;
  views: number;
  seconds: number;
};

/** A real reel from one of our pages. Shows its cover; plays the YouTube video in place on click. */
export default function Reel({ reel, className }: { reel: ReelData; className?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={className}>
      {/* The cover trims the reel's black bands; the frame opens to full 9:16 once it plays. */}
      <div className={`relative overflow-hidden rounded-[14px] bg-ink-3 ${playing ? "aspect-[9/16]" : "aspect-[4/5]"}`}>
        {playing ? (
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
      <figcaption className="mt-3 flex justify-between gap-3 text-[14px] text-paper/60">
        <span>{reel.views.toLocaleString("en-IN")} views</span>
        <span>{reel.seconds} sec</span>
      </figcaption>
    </figure>
  );
}
