import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { createGridPoints, createMeshPointLayout } from "@/lib/effects/mesh-gradient/mesh-model";
import { createMeshGlResource, disposeMeshGlResource, renderMeshGlFrame } from "@/lib/effects/mesh-gradient/mesh-webgl";

export type MeshGradientPreset = {
  colors: readonly string[];
  columns: number;
  /** Seconds for one seamless loop of the drift. */
  loopSeconds: number;
  values?: Readonly<Record<string, unknown>>;
  /** An interior mesh point that chases the mouse, then settles back at rest. */
  follow?: { index: number; rest: { x: number; y: number } };
};

// Brand palettes: mostly ink, with signal orange glowing through.
export const meshPresets = {
  hero: {
    colors: [
      "#0B0B0C", "#0B0B0C", "#141416", "#3A1206",
      "#0B0B0C", "#141416", "#FF5A1F", "#7C2D12",
      "#0B0B0C", "#141416", "#3A1206", "#C2410C",
    ],
    columns: 4,
    follow: { index: 6, rest: { x: 0.8, y: 0.86 } },
    loopSeconds: 26,
    values: { "motion.positionDrift": 30, "motion.colorDrift": 3, "mix.warp": 12, "mix.swirl": 6, "mix.grain": 7 },
  },
  quiet: {
    colors: [
      "#0B0B0C", "#0B0B0C", "#141416", "#1D1D20",
      "#0B0B0C", "#141416", "#1D1D20", "#7C2D12",
      "#0B0B0C", "#0B0B0C", "#141416", "#2A0E05",
    ],
    columns: 4,
    loopSeconds: 34,
    values: { "motion.positionDrift": 26, "motion.colorDrift": 2, "mix.warp": 10, "mix.swirl": 4, "mix.grain": 6 },
  },
} satisfies Record<string, MeshGradientPreset>;

const baseValues = {
  "appearance.background": "#0B0B0C",
  "color.contrast": 100,
  "color.exposure": 0,
  "color.hue": 0,
  "color.lightness": 0,
  "color.saturation": 100,
  "mix.interpolation": "oklab",
  "mix.opacity": 100,
  "mix.spread": 100,
  "motion.cycles": 1,
  "motion.randomness": 42,
  "motion.scale": 100,
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function MeshGradient({
  preset = meshPresets.hero,
  className,
}: {
  preset?: MeshGradientPreset;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let resource: ReturnType<typeof createMeshGlResource>;
    try {
      resource = createMeshGlResource(canvas);
    } catch {
      setFailed(true);
      return;
    }

    const state: { canvas: { size: { height: number; width: number } }; values: Record<string, unknown> } = {
      canvas: { size: { height: 0, width: 0 } },
      values: { ...baseValues, ...preset.values, "mesh.colors": preset.colors, "mesh.columns": preset.columns },
    };
    const reduced = prefersReducedMotion();
    const basePoints = createGridPoints(preset.colors.length, preset.columns);
    const follow = preset.follow;
    const glow = { ...(follow?.rest ?? { x: 0.5, y: 0.5 }) };
    let target = follow ? { ...follow.rest } : null;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const draw = (now: number) => {
      if (!width || !height) return;
      const progress = reduced ? 0.15 : (now - start) / 1000 / preset.loopSeconds;
      if (follow && target) {
        // Ease toward the cursor so the glow trails it like liquid.
        glow.x += (target.x - glow.x) * 0.06;
        glow.y += (target.y - glow.y) * 0.06;
        const points = basePoints.map((point, index) => (index === follow.index ? { ...glow } : point));
        state.values = { ...state.values, "mesh.points": createMeshPointLayout(points, preset.columns) };
      }
      renderMeshGlFrame({ height, includeBackground: true, progress, resource, state, tessellation: 24, width });
    };
    const loop = (now: number) => {
      draw(now);
      frame = visible && !reduced ? requestAnimationFrame(loop) : 0;
    };
    const resume = () => {
      if (!frame && visible && !reduced && document.visibilityState === "visible") frame = requestAnimationFrame(loop);
    };

    // Cap the backing size: a soft gradient gains nothing from full retina pixels.
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.25);
      width = Math.max(1, Math.round(box.width * scale));
      height = Math.max(1, Math.round(box.height * scale));
      draw(performance.now());
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      resume();
    });
    intersection.observe(canvas);
    const onVisibility = () => resume();
    document.addEventListener("visibilitychange", onVisibility);
    // Mouse only: touch scrolling should not drag the glow around.
    const onPointerMove = (event: PointerEvent) => {
      if (!follow || event.pointerType !== "mouse") return;
      const box = canvas.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      const inside = x > 0 && x < 1 && y > 0 && y < 1;
      target = inside
        ? { x: Math.min(0.9, Math.max(0.1, x)), y: Math.min(0.9, Math.max(0.1, y)) }
        : { ...follow.rest };
    };
    const onPointerLeave = () => {
      if (follow) target = { ...follow.rest };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    resize();
    resume();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      disposeMeshGlResource(resource);
    };
  }, [preset]);

  if (failed) {
    return <div aria-hidden="true" className={cn("glow", className)} />;
  }
  return <canvas ref={canvasRef} aria-hidden="true" className={cn("block h-full w-full", className)} />;
}
