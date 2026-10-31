import { Fragment, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type HeadlineLine = { text: string; className?: string; breakAfter?: boolean; accent?: boolean };

// Letters near the cursor lift, swell and warm toward signal orange. Transforms
// only, so the line never reflows while the mouse moves.
const radius = 170;
const paper = [244, 241, 234];
const signal = [255, 122, 69];
const accent = [255, 90, 31];

export default function HeroHeadline({ lines, className }: { lines: HeadlineLine[]; className?: string }) {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-letter]"));
    const influence = letters.map(() => 0);
    let centers: { x: number; y: number }[] = [];
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const measure = () => {
      centers = letters.map((letter) => {
        const box = letter.getBoundingClientRect();
        return { x: box.left + box.width / 2 + window.scrollX, y: box.top + box.height / 2 + window.scrollY };
      });
    };
    const tick = () => {
      let moving = false;
      letters.forEach((letter, index) => {
        const center = centers[index];
        let goal = 0;
        if (pointer && center) {
          const distance = Math.hypot(pointer.x - center.x, pointer.y - center.y);
          goal = Math.max(0, 1 - distance / radius) ** 2;
        }
        const next = influence[index]! + (goal - influence[index]!) * 0.18;
        influence[index] = Math.abs(next - goal) < 0.002 ? goal : next;
        if (influence[index] !== goal) moving = true;
        const amount = influence[index]!;
        // Plain letters warm toward orange; the orange accent line flips to cream so it
        // stays readable when the glow sits behind it.
        const [from, to] = "accent" in letter.dataset ? [accent, paper] : [paper, signal];
        const color = from.map((channel, c) => Math.round(channel + (to[c]! - channel) * amount));
        letter.style.transform = amount ? `translateY(${-0.1 * amount}em) scale(${1 + 0.16 * amount})` : "";
        letter.style.color = amount ? `rgb(${color.join(",")})` : "";
      });
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.pageX, y: event.pageY };
      wake();
    };
    const onLeave = () => {
      pointer = null;
      wake();
    };

    // Measure after the intro animation lands, and whenever layout changes.
    const settle = window.setTimeout(measure, 1400);
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.fonts.ready.then(measure);
    measure();

    return () => {
      window.clearTimeout(settle);
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  let letterIndex = 0;
  return (
    <h1 ref={rootRef} className={cn("hero-headline", className)} aria-label={lines.map((line) => line.text).join(" ")}>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          <span aria-hidden="true" className={line.className}>
            {line.text.split(" ").map((word, wordIndex, words) => (
              <Fragment key={wordIndex}>
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((char) => {
                    const delay = letterIndex++ * 28;
                    return (
                      <span key={delay} data-letter="" data-accent={line.accent ? "" : undefined} className="hero-letter">
                        <span className="hero-letter-in" style={{ animationDelay: `${120 + delay}ms` }}>{char}</span>
                      </span>
                    );
                  })}
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
          {line.breakAfter ? <>{" "}<br className="hidden sm:block" /></> : lineIndex < lines.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}
