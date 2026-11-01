import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import Reel from "@/components/katran/Reel";
import { PrimaryButton } from "@/components/site";
import { millionViewReels } from "@/lib/reels";
import { services, totalFollowersInThousands } from "@/lib/site";
import { cn } from "@/lib/utils";

const reel = (id: string) => millionViewReels.find((item) => item.id === id);
const service = (id: string) => services.find((item) => item.id === id)!;

type Proof = { kind: "reel"; id: string; note: string } | { kind: "number"; value: string; note: string };

type Track = {
  id: string;
  tab: string;
  title: string;
  line: string;
  includes: string[];
  proof: Proof;
  /** Matches an option in the contact form's "What do you need?" list. */
  enquiry: string;
};

const tracks: Track[] = [
  {
    id: "youtube",
    tab: "A YouTube channel",
    title: service("youtube").title,
    line: service("youtube").line,
    includes: service("youtube").includes,
    proof: { kind: "reel", id: "ksM-TrcSDvo", note: "Our Lucre channel on YouTube." },
    enquiry: "YouTube channel",
  },
  {
    id: "instagram",
    tab: "An Instagram page",
    title: service("instagram").title,
    line: service("instagram").line,
    includes: service("instagram").includes,
    proof: { kind: "reel", id: "DKGAuS3TKAe", note: "Our Successful Arcs page on Instagram." },
    enquiry: "Instagram page",
  },
  {
    id: "founder",
    tab: "A founder's name",
    title: service("personal-branding").title,
    line: service("personal-branding").line,
    includes: service("personal-branding").includes,
    proof: { kind: "reel", id: "DccTI1AhTDB", note: "We already turn CEO interviews into reels on Archive of CEOs." },
    enquiry: "Personal branding",
  },
  {
    id: "brand",
    tab: "A brand",
    title: "Brand partnerships, identity and websites",
    line: "Reach our audiences now. Build your own while you do.",
    includes: ["Sponsored posts on our pages", "Launch pushes across several pages", "Brand identity", "Websites like this one"],
    proof: { kind: "number", value: `${totalFollowersInThousands}K`, note: "people follow the five pages we put our name on." },
    enquiry: "Brand partnership",
  },
  {
    id: "editing",
    tab: "Just the editing",
    title: service("editing").title,
    line: service("editing").line,
    includes: service("editing").includes,
    proof: { kind: "number", value: "Katran", note: "Our editors work with Katran, the editing software we built for our own pages." },
    enquiry: "Editing",
  },
];

/** "What are you growing?" Pick one and see what we do for it, with proof from our own pages. */
export default function GrowthPicker() {
  const [active, setActive] = useState(tracks[0]!.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.max(0, tracks.findIndex((item) => item.id === active));
  const track = tracks[activeIndex]!;
  const proofReel = track.proof.kind === "reel" ? reel(track.proof.id) : undefined;

  // Standard tabs keyboard: arrows move between tabs and select them, Home and End jump to the ends.
  const onTabKey = (event: KeyboardEvent) => {
    const last = tracks.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? (activeIndex === last ? 0 : activeIndex + 1)
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (activeIndex === 0 ? last : activeIndex - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(tracks[next]!.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="min-w-0 lg:col-span-5">
        <h2 id="growing" className="font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95] tracking-[-0.03em]">
          What are you growing?
        </h2>
        <div role="tablist" aria-labelledby="growing" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-12 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
          {tracks.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={item.id === active}
              aria-controls="growing-panel"
              tabIndex={item.id === active ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={onTabKey}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-left text-[15px] transition-colors duration-200 lg:rounded-none lg:px-0 lg:py-1.5 lg:font-display lg:text-[clamp(26px,2.4vw,36px)] lg:tracking-[-0.02em]",
                item.id === active ? "bg-paper text-ink lg:bg-transparent lg:text-paper" : "bg-paper/10 text-paper/70 hover:text-paper lg:bg-transparent lg:text-paper/45",
              )}
            >
              {item.tab}
            </button>
          ))}
        </div>
      </div>

      <div id="growing-panel" role="tabpanel" aria-labelledby={`tab-${track.id}`} className="min-w-0 lg:col-span-7">
        {/* The new panel fades in straight away; the old one doesn't wait to leave, so fast clicks never queue. */}
        <motion.div
          key={track.id}
          className="grid gap-8 rounded-[20px] bg-ink-2 p-6 sm:grid-cols-[1fr_200px] sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className="flex flex-col">
            <h3 className="font-display text-[clamp(28px,2.6vw,40px)] leading-[1] tracking-[-0.02em]">{track.title}</h3>
            <p className="mt-3 text-[18px] leading-relaxed text-paper/75">{track.line}</p>
            <ul className="mt-7 space-y-3">
              {track.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] text-paper/85">
                  <Check size={17} className="mt-1 shrink-0 opacity-50" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-9">
              <PrimaryButton href={`/contact?service=${encodeURIComponent(track.enquiry)}`}>Talk to us about this</PrimaryButton>
            </div>
          </div>
          <div className="flex flex-col">
            {track.proof.kind === "reel" ? (
              proofReel && <Reel reel={proofReel} />
            ) : (
              <div className="flex aspect-[4/5] items-end rounded-[14px] bg-ink-3 p-5">
                <span className="font-display text-[clamp(44px,4vw,60px)] leading-none tracking-[-0.04em]">{track.proof.value}</span>
              </div>
            )}
            <p className="mt-3 text-[14px] leading-snug text-paper/55">{track.proof.note}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
