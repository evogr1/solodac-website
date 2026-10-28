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
    let size = 0;
    let goalSize = 0;
    let frame = 0;

    const tick = () => {
      position.x += (goal.x - position.x) * 0.22;
      position.y += (goal.y - position.y) * 0.22;
      size += (goalSize - size) * 0.2;
      ring.style.transform = `translate3d(${position.x - size / 2}px, ${position.y - size / 2}px, 0)`;
      ring.style.width = ring.style.height = `${size}px`;
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
      ring.dataset.active = target ? "true" : "false";
      wake();
    };
    const onLeave = () => {
      goalSize = 0;
      wake();
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
