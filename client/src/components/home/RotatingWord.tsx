import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** One word at a time, sliding up out of a masked line. Holds on the first word for reduced motion. */
export default function RotatingWord({ words, className, interval = 2200 }: { words: string[]; className?: string; interval?: number }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let timer = 0;
    // Start after the headline's letters have landed, and stop while the tab is hidden.
    const start = () => {
      window.clearInterval(timer);
      if (!document.hidden) timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), interval);
    };
    const delay = window.setTimeout(start, 1400);
    document.addEventListener("visibilitychange", start);
    return () => {
      window.clearTimeout(delay);
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", start);
    };
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
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
