import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * One word at a time, sliding up out of a masked line. Each word holds for the same time on
 * every device. It runs through the list once and settles back on the first word, and holds
 * still for reduced motion, so the motion always ends.
 */
export default function RotatingWord({ words, className, interval = 2000 }: { words: string[]; className?: string; interval?: number }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let steps = 0;
    let timer = 0;
    // A fixed beat: every change is scheduled from the start time, so a busy frame never
    // pushes the next one later and the rhythm stays even.
    const start = performance.now();
    const schedule = () => {
      const due = start + (steps + 1) * interval;
      timer = window.setTimeout(() => {
        steps += 1;
        setIndex(steps % words.length);
        if (steps < words.length) schedule();
      }, Math.max(0, due - performance.now()));
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [reduce, words.length, interval]);

  return (
    <span aria-hidden="true" className={`relative block overflow-hidden pb-[0.08em] ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="block whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.77, 0, 0.175, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
