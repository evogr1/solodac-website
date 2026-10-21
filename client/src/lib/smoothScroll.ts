import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

export function scrollToTopNow() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  if (lenis) lenis.scrollTo(element, { offset: -80 });
  else element.scrollIntoView({ behavior: "smooth" });
}
