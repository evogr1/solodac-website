import { useEffect, useRef, type ReactNode } from "react";

/** Pulls its child toward the mouse when the cursor comes near, then springs back. */
export default function Magnetic({ children, strength = 0.35, reach = 60 }: { children: ReactNode; strength?: number; reach?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const current = { x: 0, y: 0 };
    let goal = { x: 0, y: 0 };
    const tick = () => {
      current.x += (goal.x - current.x) * 0.2;
      current.y += (goal.y - current.y) * 0.2;
      const settled = Math.abs(goal.x - current.x) < 0.1 && Math.abs(goal.y - current.y) < 0.1;
      if (settled) Object.assign(current, goal);
      element.style.transform = current.x || current.y ? `translate(${current.x}px, ${current.y}px)` : "";
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const near = Math.abs(dx) < box.width / 2 + reach && Math.abs(dy) < box.height / 2 + reach;
      goal = near ? { x: dx * strength, y: dy * strength } : { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reach, strength]);

  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  );
}
