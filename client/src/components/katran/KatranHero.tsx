import { useEffect, useRef, useState } from "react";
import { heroFrames } from "./frames";

// The headline is cut in two, and a strip of Katran's own frames runs through the gap.
// The strip advances on its own, one frame every few seconds, and pauses when the tab is hidden.

const gap = 24;
const peek = 60;

export default function KatranHero({ onJoin }: { onJoin: () => void }) {
    const reelRef = useRef<HTMLDivElement>(null);
  const [frameHeight, setFrameHeight] = useState(0);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    let index = 0;

    const measure = () => {
      const first = reel.firstElementChild as HTMLElement | null;
      setFrameHeight(first?.offsetHeight ?? 0);
      setIsWide(wide.matches);
    };
    const place = (value: number) => {
      const first = reel.firstElementChild as HTMLElement | null;
      const step = (first?.offsetHeight ?? 0) + gap;
      reel.style.transform = `translate3d(0, ${-value * step}px, 0)`;
      // Frames more than one step away are out of the window: hide them outright.
      Array.from(reel.children).forEach((child, position) => {
        const away = Math.abs(position - value) > 1.05;
        (child as HTMLElement).style.visibility = away ? "hidden" : "";
        child.setAttribute("aria-hidden", away ? "true" : "false");
      });
    };
    // The strip advances one cut at a time, like a reel moving through a gate.
    const advance = () => {
      index = (index + 1) % heroFrames.length;
      reel.style.transition = "transform 900ms cubic-bezier(0.77, 0, 0.175, 1)";
      place(index);
    };
    const start = () => {
      window.clearInterval(timer);
      measure();
      place(index);
      if (!reduced) timer = window.setInterval(advance, 2800);
    };
    const onVisibility = () => {
      window.clearInterval(timer);
      if (!document.hidden && !reduced) timer = window.setInterval(advance, 2800);
    };

    start();
    wide.addEventListener("change", start);
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const windowHeight = frameHeight ? frameHeight + 2 * (gap + peek) : undefined;

  return (
    <section className="relative">
      <div className={isWide ? "relative h-[min(84svh,860px)] min-h-[600px] overflow-hidden pt-[72px]" : "relative overflow-hidden pb-16 pt-28"}>
        <div className="container h-full">
        <div className="relative flex h-full flex-col lg:block">
          <h1 className="font-display text-[clamp(44px,9vw,64px)] leading-[0.95] tracking-[-0.04em] lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-1/2 lg:flex lg:-translate-y-1/2 lg:justify-between lg:text-[clamp(56px,4.6vw,84px)]">
            <span className="block">Katran edits</span>
            <span className="block text-right">your videos.</span>
          </h1>

          <div
            className="relative order-none mx-auto my-6 w-full overflow-hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:w-[35vw] lg:-translate-x-1/2 lg:-translate-y-1/2"
            style={{ height: windowHeight }}
            aria-label="Frames from a Katran edit: the voiceover, the cut, the captions and a carousel from the same story"
            role="img"
          >
            <div
              ref={reelRef}
              className="absolute inset-x-0 flex flex-col will-change-transform"
              style={{ gap, top: frameHeight ? gap + peek : 0 }}
            >
              {heroFrames.map(({ id, Frame }) => (
                <div key={id} className="aspect-[4/3] w-full overflow-hidden rounded-[4px] md:aspect-video">
                  <Frame />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 max-w-[26rem] lg:absolute lg:left-0 lg:top-[calc(50%+4.5rem)] lg:mt-0 lg:max-w-[17rem]">
            <p className="text-[18px] leading-relaxed text-paper">
              The video editor behind the SoloDac pages. Voiceover in, finished video out.
            </p>
            <button
              type="button"
              onClick={onJoin}
              className="mt-6 rounded-full bg-signal px-6 py-3.5 text-[15px] font-semibold text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-paper active:scale-[0.97]"
            >
              Join the waitlist
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
