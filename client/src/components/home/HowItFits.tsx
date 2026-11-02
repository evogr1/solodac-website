import { ArrowUpRight, Clapperboard, Instagram, Mail, UserRound, Youtube } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import Reveal from "@/components/Reveal";
import { millionViewReels, totalReelViews } from "@/lib/reels";
import { networkPages, totalFollowersInThousands } from "@/lib/site";

/** A named arm inside the sentence: underlined in signal, a link to its page. */
function Arm({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="underline decoration-signal decoration-[0.08em] underline-offset-[0.14em] transition-colors duration-200 hover:text-signal">
      {children}
    </Link>
  );
}

const agencyIcons = [Youtube, Instagram, Mail, Clapperboard, UserRound];

/** How SoloDac's three arms feed each other, told as one sentence with proof under each part. */
export default function HowItFits() {
  const parts = [
    {
      name: "SoloDac Network",
      line: `${totalFollowersInThousands}K people follow our five named pages.`,
      href: "/network",
      cta: "See the network",
      visual: (
        <div className="flex">
          {networkPages.map((page) => (
            <img key={page.handle} src={page.logo} alt="" className="-ml-3 h-12 w-12 rounded-full object-cover ring-[3px] ring-ink first:ml-0" />
          ))}
        </div>
      ),
    },
    {
      name: "SoloDac Agency",
      line: "YouTube, Instagram, newsletters, editing and founder brands, done for you.",
      href: "/services",
      cta: "See services",
      visual: (
        <div className="flex">
          {agencyIcons.map((Icon, index) => (
            <span key={index} className="-ml-3 grid h-12 w-12 place-items-center rounded-full bg-ink-3 text-paper/80 ring-[3px] ring-ink first:ml-0">
              <Icon size={19} aria-hidden="true" />
            </span>
          ))}
        </div>
      ),
    },
    {
      name: "Katran",
      line: `${totalReelViews} views on six reels made with it.`,
      href: "/katran",
      cta: "See Katran",
      visual: (
        <div className="flex">
          {millionViewReels.slice(0, 4).map((reel) => (
            <img key={reel.id} src={reel.poster} alt="" className="-ml-3 h-12 w-10 rounded-md object-cover ring-[3px] ring-ink first:ml-0" />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Reveal>
        <h2 className="font-display max-w-5xl text-[clamp(2rem,4.2vw,4rem)] leading-[1.06] tracking-[-0.03em]">
          Our <Arm href="/network">pages</Arm> show us what works. Our <Arm href="/services">agency</Arm> does it for you.{" "}
          <Arm href="/katran">Katran</Arm> makes both faster.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {parts.map((part, index) => (
          <Reveal key={part.name} delay={0.08 + index * 0.07}>
            <Link href={part.href} className="group block">
              {part.visual}
              <h3 className="mt-5 text-[18px] font-semibold">{part.name}</h3>
              <p className="mt-1.5 max-w-xs text-[16px] leading-relaxed text-paper/65">{part.line}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-paper/85 transition-colors duration-200 group-hover:text-signal">
                {part.cta} <ArrowUpRight size={16} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
