import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { renderDotsFrame } from "@/lib/effects/particle-type/dots-render-frame";
import { clearDotPlanCache } from "@/lib/effects/particle-type/dots-shape";
import { getDotsLoopTiming } from "@/lib/effects/particle-type/dots-timing";
import type { DotsSettings } from "@/lib/effects/particle-type/dots-types";

const fontFamily = "Bricolage Grotesque";
const fontWeight = "800";

function createSettings(text: string, width: number, height: number, compact: boolean): DotsSettings {
  return {
    appearance: {
      background: "#0B0B0C",
      glow: 0.35,
      palette: {
        angle: 20,
        gradientType: "linear",
        stops: [
          { color: "#FF5A1F", opacity: 1, position: 0 },
          { color: "#FFB08F", opacity: 1, position: 0.55 },
          { color: "#F4F1EA", opacity: 1, position: 1 },
        ],
      },
      sizeMotion: 0.7,
      trails: 0.5,
    },
    canvas: { height, width },
    // Form, hold, scatter, repeat: about eleven seconds per loop.
    motion: getDotsLoopTiming(5, 3, 11),
    particles: {
      count: compact ? 1400 : 2400,
      distribution: "fill",
      edgeSpill: 0.04,
      launch: "scatter",
      size: compact ? [1.5, 3.5] : [2, 5],
    },
    physics: { attraction: 0.9, damping: 0.7, mass: 0.8, turbulence: 0.14 },
    text,
    typography: {
      color: "#F4F1EA",
      family: fontFamily,
      fontId: "bricolage-grotesque",
      fontSize: Math.round(height * 0.9),
      fontWeight,
      letterSpacing: "normal",
      lineHeight: "none",
      opacity: 1,
      textCase: "lowercase",
    },
  };
}

export default function ParticleWord({ text = "solodac", className }: { text?: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let settings: DotsSettings | null = null;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    let cancelled = false;
    const start = performance.now();

    const draw = (now: number) => {
      if (!settings) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      // Reduced motion shows the formed word and holds it.
      const seconds = (now - start) / 1000;
      const progress = reduced ? (settings.motion.formationEnd + settings.motion.calmEnd) / 2 : (seconds / settings.motion.loopDurationSeconds) % 1;
      renderDotsFrame(context, width, height, settings, progress, { includeBackground: false });
    };
    const loop = (now: number) => {
      draw(now);
      frame = visible && !reduced && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const resume = () => {
      if (!frame && settings && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(box.width));
      height = Math.max(1, Math.round(box.height));
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      settings = createSettings(text, width, height, width < 640);
      draw(performance.now());
      resume();
    };

    // The particles sample the rendered word, so wait for the brand font first.
    const observer = new ResizeObserver(() => {
      if (!cancelled) resize();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      resume();
    });
    const onVisibility = () => resume();
    void document.fonts.load(`${fontWeight} 100px "${fontFamily}"`).finally(() => {
      if (cancelled) return;
      clearDotPlanCache();
      observer.observe(canvas);
      intersection.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [text]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("block h-full w-full", className)} />;
}
