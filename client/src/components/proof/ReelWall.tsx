import { indianNumber, reelUrl } from "@/lib/format";
import { millionViewReels } from "@/lib/reels";

/**
 * Our million-view reels drifting across the home hero. Each cover opens the real post.
 * The row is drawn twice so the loop has no seam; it pauses under the pointer or keyboard
 * focus, and stands still for people who ask for reduced motion.
 */
export default function ReelWall() {
  const count = millionViewReels.length;
  const items = [...millionViewReels, ...millionViewReels];

  return (
    <div className="reel-wall overflow-hidden" role="region" aria-label="Reels from our own pages">
      <ul className="reel-wall-track flex w-max gap-4 pr-4">
        {items.map((reel, index) => {
          const copy = index >= count;
          return (
            <li key={`${reel.id}-${index}`} aria-hidden={copy || undefined} className="w-[140px] shrink-0 sm:w-[196px]">
              <a
                href={reelUrl(reel)}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={copy ? -1 : undefined}
                aria-label={`${reel.title}, ${indianNumber(reel.views)} views. Opens the reel.`}
                className="group block"
              >
                <span className="block aspect-[4/5] overflow-hidden rounded-[14px] bg-ink-3">
                  <img
                    src={reel.poster}
                    alt=""
                    decoding="async"
                    className="h-full w-full object-cover object-[50%_46%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-3 block text-[14px] leading-snug">
                  <span className="font-semibold text-paper">{indianNumber(reel.views)} views</span>
                  <span className="block text-paper/55">{reel.page}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
