import { useEffect, useRef } from "react";

const interactive = "a, button, [role='button'], input, select, textarea, label";

/**
 * A soft ring that trails the mouse and swells over anything clickable.
 * The native cursor stays visible; this only adds feedback on desktop.
 */
export default function CursorFollower() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const position = { x: -100, y: -100 };
    const goal = { x: -100, y: -100 };
    // The ring is a fixed 56px circle scaled down to a dot, so only transform animates.
    const fullSize = 56;
    let size = 14;
    let goalSize = 14;
    let frame = 0;

    const tick = () => {
      position.x += (goal.x - position.x) * 0.22;
      position.y += (goal.y - position.y) * 0.22;
      size += (goalSize - size) * 0.2;
      ring.style.transform = `translate3d(${position.x - fullSize / 2}px, ${position.y - fullSize / 2}px, 0) scale(${size / fullSize})`;
      const settled =
        Math.abs(goal.x - position.x) < 0.2 && Math.abs(goal.y - position.y) < 0.2 && Math.abs(goalSize - size) < 0.2;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      goal.x = event.clientX;
      goal.y = event.clientY;
      const target = event.target instanceof Element ? event.target.closest(interactive) : null;
      goalSize = target ? 56 : 14;
      ring.style.opacity = "1";
      ring.dataset.active = target ? "true" : "false";
      wake();
    };
    // Fade out rather than shrinking to nothing when the mouse leaves the window.
    const onLeave = () => {
      ring.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ringRef} aria-hidden="true" className="cursor-follower" />;
}
