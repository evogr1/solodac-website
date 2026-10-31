import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Frames from Katran's own output for one sample story, built in HTML at real size.
// The sample: a founder who started with ₹40,000 and one shop, and sold for ₹40 crore.
// Each root carries data-ui: it is a piece of the product, not decoration.

const wave = [
  6, 14, 22, 12, 30, 44, 26, 18, 38, 52, 34, 20, 12, 28, 46, 60, 40, 24, 16, 34, 50, 30, 14, 8, 20, 36, 48, 32, 18, 26,
  42, 56, 38, 22, 12, 24, 40, 28, 16, 10, 22, 34, 46, 30, 18, 12, 26, 38,
];

function useTicker(steps: number, ms: number) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % steps), ms);
    return () => window.clearInterval(timer);
  }, [steps, ms]);
  return step;
}

export function Waveform({ className, played = 0.38, every = 1 }: { className?: string; played?: number; every?: number }) {
  // Small slots take every nth bar so each bar keeps a visible width.
  const bars = wave.filter((_, index) => index % every === 0);
  return (
    <div className={cn("flex h-full w-full items-center gap-[2px]", className)} aria-hidden="true">
      {bars.map((height, index) => (
        <span
          key={index}
          className={cn("min-w-0 flex-1 rounded-full", index / bars.length < played ? "bg-ink" : "bg-ink/25")}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

/** Frame 1: the voiceover the creator drops in. */
export function VoiceoverFrame() {
  return (
    <div data-ui="" className="flex h-full w-full flex-col justify-between bg-paper p-[5%] text-ink">
      <div className="flex items-baseline justify-between text-[13px]">
        <span className="font-semibold">Your voiceover</span>
        <span className="text-ink/60">founder-story.wav · 11:38</span>
      </div>
      <div className="h-[34%]">
        <Waveform />
      </div>
      <p className="text-[clamp(15px,1.5vw,22px)] font-medium leading-snug">
        “In 2009 he had ₹40,000 and one shop in Indore.”
      </p>
    </div>
  );
}

/** Frame 2: the cut. A documentary title card, timed to the script. */
export function TitleCardFrame() {
  return (
    <div data-ui="" className="relative flex h-full w-full flex-col justify-end bg-ink-3 p-[5%] text-paper">
      <span className="absolute left-[5%] top-[7%] text-[13px] text-paper/60">Cut to the script · 00:42</span>
      <div className="font-display text-[clamp(44px,6vw,96px)] leading-none">₹40,000</div>
      <p className="mt-2 text-[clamp(14px,1.3vw,19px)] text-paper/75">One shop. One city. 2009.</p>
    </div>
  );
}

/** Frame 3: captions synced word by word. The highlight runs on its own. */
export function CaptionFrame({ compact = false }: { compact?: boolean }) {
  const words = compact ? ["₹40", "crore."] : ["He", "sold", "it", "for", "₹40", "crore."];
  const step = useTicker(words.length + 2, 420);
  return (
    <div data-ui="" className="relative flex h-full w-full items-end justify-center bg-[#2a1a12] p-[5%]">
      {!compact && <span className="absolute left-[5%] top-[7%] text-[13px] text-paper/60">Captions synced · 10:18</span>}
      <p
        className={cn(
          "font-display text-center leading-tight text-paper",
          compact ? "whitespace-nowrap text-[13px] leading-none" : "mb-[4%] text-[clamp(20px,2.6vw,40px)]",
        )}
      >
        {words.map((word, index) => (
          <span key={word} className={cn("transition-colors duration-150", index === step ? "text-signal" : "")}>
            {word}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}

/** Frame 4: the same story as the first slide of a carousel. */
export function SlideFrame({ compact = false }: { compact?: boolean }) {
  return (
    <div data-ui="" className="flex h-full w-full flex-col justify-between bg-paper-2 p-[6%] text-ink">
      {!compact && (
        <div className="flex items-baseline justify-between text-[13px]">
          <span className="font-semibold">Carousel from the same story</span>
          <span className="text-ink/60">1 of 8</span>
        </div>
      )}
      <p className={cn("font-display leading-[0.95]", compact ? "whitespace-nowrap text-[13px]" : "text-[clamp(26px,3.4vw,54px)]")}>
        {compact ? "1 of 8" : "How one shop became ₹40 crore."}
      </p>
      {!compact && <span className="text-[13px] text-ink/60">Sample story</span>}
    </div>
  );
}

export const heroFrames = [
  { id: "voiceover", Frame: VoiceoverFrame },
  { id: "title", Frame: TitleCardFrame },
  { id: "captions", Frame: CaptionFrame },
  { id: "slide", Frame: SlideFrame },
];
