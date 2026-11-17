import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * One word at a time, sliding up out of a masked line, on a loop that never ends.
 * It pauses while the word is off screen or the tab is hidden, and picks up again from the
 * next word as soon as it is back in view, so scrolling away and back or leaving the page and
 * returning always finds it moving. It holds still for reduced motion.
 */
export default function RotatingWord({ words, className, interval = 1000 }: { words: string[]; className?: string; interval?: number }) {
  const reduce = useReducedMotion();
  // `step` only ever counts up. Keying each word by its step (not its text) means a word that
  // comes round again never collides with its own copy that is still sliding out.
  const [step, setStep] = useState(0);
  const index = step % Math.max(1, words.length);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const rootRef = useRef<HTMLSpanElement>(null);

  // Is the word on screen?
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Is the tab showing?
  useEffect(() => {
    const update = () => setTabVisible(document.visibilityState !== "hidden");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const running = !reduce && inView && tabVisible && words.length > 1;

  useEffect(() => {
    if (!running) return;
    let steps = 0;
    let timer = 0;
    // A fixed beat: every change is scheduled from the start time, so a busy frame never
    // pushes the next one later and the rhythm stays even.
    const start = performance.now();
    const schedule = () => {
      const due = start + (steps + 1) * interval;
      timer = window.setTimeout(() => {
        steps += 1;
        setStep((current) => current + 1);
        schedule();
      }, Math.max(0, due - performance.now()));
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [running, words.length, interval]);

  return (
    <span ref={rootRef} aria-hidden="true" className={`relative block overflow-hidden pb-[0.08em] ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={step}
          data-word=""
          className="block whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.77, 0, 0.175, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
