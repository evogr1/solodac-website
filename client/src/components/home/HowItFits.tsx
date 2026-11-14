import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Mail, Youtube } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import Reveal from "@/components/Reveal";
import { millionViewReels, reelCountWord, totalReelViews } from "@/lib/reels";
import { networkPages, totalFollowersInThousands } from "@/lib/site";

/**
 * A small picture set into the line of type, sized in em so it scales with the headline.
 * It pops in after the sentence lands, like a pasted-in photo in a magazine headline.
 */
function Chip({ children, order }: { children: ReactNode; order: number }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.4, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.35 + order * 0.14 }}
      className="mx-[0.14em] inline-flex h-[0.82em] -translate-y-[0.06em] items-center rounded-full bg-ink-3 px-[0.1em] align-middle"
    >
      {children}
    </motion.span>
  );
}

const pagesChip = (
  <Chip order={0}>
    {networkPages.slice(0, 4).map((page, index) => (
      <img
        key={page.handle}
        src={page.logo}
        alt=""
        // The fourth logo only shows from tablet width up, so the first sentence stays on one line on phones.
        className={`-ml-[0.16em] h-[0.64em] w-[0.64em] rounded-full object-cover ring-[0.04em] ring-ink-3 first:ml-0 ${index === 3 ? "hidden sm:block" : ""}`}
      />
    ))}
  </Chip>
);

const agencyChip = (
  <Chip order={1}>
    {[Youtube, Instagram, Mail].map((Icon, index) => (
      <span key={index} className="-ml-[0.12em] grid h-[0.64em] w-[0.64em] place-items-center rounded-full bg-paper text-ink first:ml-0">
        <Icon className="h-[0.34em] w-[0.34em]" strokeWidth={2.4} />
      </span>
    ))}
  </Chip>
);

const katranChip = (
  <Chip order={2}>
    {millionViewReels.slice(0, 3).map((reel, index) => (
      <img
        key={reel.id}
        src={reel.poster}
        alt=""
        className={`-ml-[0.14em] h-[0.66em] w-[0.5em] rounded-[0.1em] object-cover first:ml-0 ${index === 1 ? "rotate-6" : "-rotate-6"}`}
      />
    ))}
  </Chip>
);

const parts = [
  { name: "SoloDac Network", line: `${totalFollowersInThousands}K people follow our six named pages.`, href: "/network", cta: "See the network" },
  { name: "SoloDac Agency", line: "YouTube, Instagram, newsletters, editing and founder brands, done for you.", href: "/services", cta: "See services" },
  { name: "Katran", line: `${totalReelViews} views on ${reelCountWord} reels made with it.`, href: "/katran", cta: "See Katran" },
];

/** How SoloDac's three arms feed each other: one sentence with a picture set beside each arm. */
export default function HowItFits() {
  return (
    <div>
      <Reveal>
        <h2 className="font-display max-w-5xl text-[min(2rem,calc((100vw-2rem)/15.4))] leading-[1.12] sm:text-[clamp(2rem,4.2vw,4rem)] tracking-[-0.03em]">
          {/* One sentence per line, so the three read as a pattern. */}
          <span className="block">Our pages{pagesChip} show us what works.</span>
          <span className="block">Our agency{agencyChip} does it for you.</span>
          <span className="block">Katran{katranChip} makes both faster.</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {parts.map((part, index) => (
          <Reveal key={part.name} delay={0.08 + index * 0.07}>
            <Link href={part.href} className="group block">
              <h3 className="text-[18px] font-semibold">{part.name}</h3>
              <p className="mt-1.5 max-w-xs text-[16px] leading-relaxed text-paper/65">{part.line}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-paper/85 transition-colors duration-200 group-hover:text-signal">
                {part.cta} <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
