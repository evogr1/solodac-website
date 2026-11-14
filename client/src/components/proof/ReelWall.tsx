import { useEffect, useRef } from "react";
import { indianNumber, reelUrl } from "@/lib/format";
import { millionViewReels } from "@/lib/reels";

const COPIES = 3;
const SPEED = 72; // px per second while drifting
const IDLE_MS = 1800; // how long the row rests after a touch, wheel or drag before it drifts again

// Spread each page's reels evenly through the row, so one page never fills a whole screen.
const pageSizes = new Map<string, number>();
millionViewReels.forEach((reel) => pageSizes.set(reel.page, (pageSizes.get(reel.page) ?? 0) + 1));
const seen = new Map<string, number>();
const spread = millionViewReels
  .map((reel) => {
    const nth = seen.get(reel.page) ?? 0;
    seen.set(reel.page, nth + 1);
    return { reel, at: (nth + 0.5) / pageSizes.get(reel.page)! };
  })
  .sort((a, b) => a.at - b.at)
  .map((item) => item.reel);

/**
 * Our million-view reels in a row you can swipe or scroll by hand. Left alone it drifts on its own,
 * stops the moment someone touches it, and eases back in after a short rest. The set is drawn three
 * times so the loop has no seam. For people who ask for reduced motion it stays still and scrolls by hand.
 */
export default function ReelWall() {
  const count = spread.length;
  const items = Array.from({ length: COPIES }, () => spread).flat();
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const period = () => el.scrollWidth / COPIES;
    el.scrollLeft = period();

    let pos = el.scrollLeft;
    let written = pos; // the last position our drift set, to tell it apart from a hand
    let resumeAt = 0;
    let ease = 1;
    let frame = 0;
    let last = performance.now();
    let visible = false;
    let hovering = false;
    let settle = 0;

    const rest = () => {
      resumeAt = performance.now() + IDLE_MS;
      ease = 0;
    };
    // Keep the position inside the middle copy once the hand has let go, so there is no jump mid-swipe.
    const wrap = () => {
      const p = period();
      if (!p) return;
      let x = el.scrollLeft;
      if (x >= 2 * p) x -= p;
      else if (x < p) x += p;
      if (x !== el.scrollLeft) el.scrollLeft = x;
      pos = x;
      written = x;
    };
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - written) < 1.5) return; // our own drift, not a hand
      pos = el.scrollLeft;
      written = pos;
      rest();
      window.clearTimeout(settle);
      settle = window.setTimeout(wrap, 140);
    };
    const onTouch = () => rest();
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        hovering = false;
        rest();
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduced && !hovering && now >= resumeAt && !el.matches(":focus-within")) {
        // If something else moved the row since our last step, pick up from there instead.
        if (Math.abs(el.scrollLeft - written) >= 1.5) pos = el.scrollLeft;
        ease += (1 - ease) * Math.min(1, dt * 4); // glide back up to speed instead of lurching
        pos += SPEED * ease * dt;
        const p = period();
        if (p && pos >= 2 * p) pos -= p;
        written = pos;
        el.scrollLeft = pos;
      }
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", onTouch, { passive: true });
    el.addEventListener("wheel", onTouch, { passive: true });
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("wheel", onTouch);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={scroller} className="reel-wall overflow-x-auto overscroll-x-contain" role="region" aria-label="Reels from our own pages">
      <ul className="flex w-max gap-4 pr-4">
        {items.map((reel, index) => {
          const copy = index < count || index >= count * 2;
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
