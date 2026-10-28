import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Brand pass over the Toolcraft landing preset: signal orange on ink.
const globeValues = {
  "appearance.background": "#0B0B0C",
  "effects.crtIntensity": 55,
  "globe.lineColor": "#FF5A1F",
  "globe.sphereColor": "#0B0B0C",
};

export default function NetworkGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let destroyed = false;
    let globe: { destroy(): void } | undefined;
    // Keep three.js and the globe out of the main bundle.
    void import("@/lib/effects/neon-globe/embed/neon-globe").then(({ createNeonGlobe }) => {
      if (destroyed) return;
      try {
        globe = createNeonGlobe(container, { renderScale: 1.5, values: globeValues });
      } catch {
        // No canvas support: the page reads fine without the globe.
      }
    });
    return () => {
      destroyed = true;
      globe?.destroy();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className={cn("relative", className)} />;
}
