import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * One word at a time, sliding up out of a masked line. It runs through the list once and
 * settles back on the first word, pauses while the pointer is over it, and holds still for
 * reduced motion, so the motion always ends.
 */
export default function RotatingWord({ words, className, interval = 2200 }: { words: string[]; className?: string; interval?: number }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (reduce) return;
    let timer = 0;
    let steps = 0;
    const tick = () => {
      if (paused.current || document.hidden) return;
      steps += 1;
      setIndex(steps % words.length);
      if (steps >= words.length) window.clearInterval(timer);
    };
    // Start after the headline's letters have landed.
    const delay = window.setTimeout(() => {
      timer = window.setInterval(tick, interval);
    }, 1400);
    return () => {
      window.clearTimeout(delay);
      window.clearInterval(timer);
    };
  }, [reduce, words.length, interval]);

  return (
    <span
      aria-hidden="true"
      className={`relative block overflow-hidden pb-[0.08em] ${className ?? ""}`}
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="block whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
