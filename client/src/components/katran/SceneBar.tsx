import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Sample: an 11:38 founder story, cut by Katran into five scenes. Widths follow
// each scene's real share of the running time (42 + 190 + 176 + 210 + 80 = 698 s).
const scenes = [
  {
    clause: "First, the cold open: the sale, before the story.",
    duration: "42 sec",
    seconds: 42,
    title: "Cold open",
    voiceover: "“Last year he sold his company for ₹40 crore.”",
    caption: "He sold it for ₹40 crore.",
  },
  {
    clause: "Then the first shop, cut to the street it stood on.",
    duration: "3 min 10",
    seconds: 190,
    title: "The first shop",
    voiceover: "“In 2009 he had ₹40,000 and one shop in Indore.”",
    caption: "₹40,000. One shop.",
  },
  {
    clause: "Then the bad year, slower, with the music pulled down.",
    duration: "2 min 56",
    seconds: 176,
    title: "The bad year",
    voiceover: "“In 2014 he nearly shut it down.”",
    caption: "2014. Nearly over.",
  },
  {
    clause: "Then the sale, with the numbers on screen.",
    duration: "3 min 30",
    seconds: 210,
    title: "The sale",
    voiceover: "“Three buyers came. He picked the smallest offer.”",
    caption: "He picked the smallest offer.",
  },
  {
    clause: "Last, the outro and the next video.",
    duration: "1 min 20",
    seconds: 80,
    title: "Outro",
    voiceover: "“Next week: the shop he couldn't save.”",
    caption: "Next: the shop he couldn't save.",
  },
];

export default function SceneBar() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const scene = scenes[active]!;

  return (
    <div>
      <div data-ui="" className="flex h-auto flex-col gap-[6px] lg:h-[22vh] lg:min-h-[180px] lg:flex-row" role="tablist" aria-label="Scenes in the sample video">
        {scenes.map((item, index) => (
          <motion.button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
            initial={reduce ? false : { opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ flexGrow: item.seconds, transformOrigin: "left center" }}
            className={cn(
              "group flex min-h-[72px] basis-0 flex-col justify-between rounded-[4px] p-5 text-left transition-colors duration-200 lg:min-w-[12%]",
              index === active ? "bg-paper text-ink" : "bg-ink-3 text-paper hover:bg-[#2a2a2e]",
            )}
          >
            <span className="text-[clamp(22px,2vw,30px)] font-semibold leading-none tracking-[-0.02em]">{item.duration}</span>
            <span className={cn("text-[15px] font-medium", index === active ? "text-ink/70" : "text-paper/70")}>{item.title}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-5 hidden gap-[6px] lg:flex">
        {scenes.map((item) => (
          <p key={item.title} className="min-w-[12%] basis-0 pr-4 text-[16px] leading-snug text-paper/70" style={{ flexGrow: item.seconds }}>
            {item.clause}
          </p>
        ))}
      </div>

      <div data-ui="" className="mt-14 grid gap-10 lg:grid-cols-2" aria-live="polite">
        <div>
          <p className="text-[15px] text-paper/60">What you said</p>
          <p className="mt-3 text-[clamp(24px,2.4vw,34px)] font-medium leading-snug">{scene.voiceover}</p>
        </div>
        <div>
          <p className="text-[15px] text-paper/60">What Katran put on screen</p>
          <div data-ui="" className="mt-3 flex aspect-video items-end justify-center rounded-[4px] bg-[#2a1a12] p-6">
            <p className="font-display text-center text-[clamp(22px,2.4vw,36px)] leading-tight text-paper">{scene.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
