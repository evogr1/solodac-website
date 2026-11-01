import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const roles = [
  { job: "Scripts", who: "a writer" },
  { job: "Editing", who: "an editor" },
  { job: "Design", who: "a designer" },
  { job: "Posting", who: "a social manager" },
  { job: "Reports", who: "an analyst" },
];

const ease = [0.77, 0, 0.175, 1] as const;

/** Five separate hires drift together into one bar as the section comes into view. */
export default function FiveHires() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();
  const joined = seen || !!reduce;
  // The chips sit in a row from the sm breakpoint and stack below it; the joined bar rounds its outer corners to match.
  const [row, setRow] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const update = () => setRow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div ref={ref}>
      <motion.div
        className="flex flex-col sm:flex-row"
        initial={false}
        animate={{ gap: joined ? 0 : 16 }}
        transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.5, ease }}
      >
        {roles.map((role, index) => {
          const first = index === 0;
          const last = index === roles.length - 1;
          return (
            <motion.div
              key={role.job}
              className="flex flex-1 flex-col justify-between bg-ink-3 px-5 py-5 sm:min-h-[132px]"
              initial={false}
              animate={{
                borderRadius: !joined
                  ? "18px 18px 18px 18px"
                  : row
                    ? `${first ? 18 : 0}px ${last ? 18 : 0}px ${last ? 18 : 0}px ${first ? 18 : 0}px`
                    : `${first ? 18 : 0}px ${first ? 18 : 0}px ${last ? 18 : 0}px ${last ? 18 : 0}px`,
                backgroundColor: joined ? "#f4f1ea" : "#1d1d20",
                color: joined ? "#0b0b0c" : "#f4f1ea",
              }}
              transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.5 + index * 0.04, ease }}
            >
              <span className="font-display text-[clamp(24px,2.2vw,32px)] leading-none tracking-[-0.02em]">{role.job}</span>
              <span className="mt-3 text-[15px] opacity-60">{role.who}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
