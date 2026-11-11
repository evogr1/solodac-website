import { useEffect, useRef } from "react";
import abg from "@/assets/clients/colour/aditya-birla.webp";
import aelira from "@/assets/clients/colour/aelira.webp";
import beco from "@/assets/clients/colour/beco.webp";
import bonne from "@/assets/clients/colour/bonne-trinity.webp";
import chandigarh from "@/assets/clients/colour/chandigarh-university.webp";
import dyson from "@/assets/clients/colour/dyson.svg";
import hul from "@/assets/clients/colour/hindustan-unilever.svg";
import jio from "@/assets/clients/colour/jio.svg";
import lovable from "@/assets/clients/colour/lovable.svg";
import mastersUnion from "@/assets/clients/colour/masters-union.webp";
import orangeHealth from "@/assets/clients/colour/orange-health.webp";
import strawberry from "@/assets/clients/colour/strawberry.svg";
import tetr from "@/assets/clients/colour/tetr.webp";
import varahe from "@/assets/clients/colour/varahe.svg";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

type Client = {
  name: string;
  logo?: string;
  /** Optical size: wide logos sit lower so every mark weighs the same. */
  scale: number;
  /** Brightens a logo whose own colours are dark, so it reads on the ink page. */
  lift?: number;
};

// Each logo is the client's own, in its own colours, straight on the page with no backing.
// Varahe's mark is traced from its site header. Kaidra Media has no logo online yet, so it is set as a wordmark.
const clients: Client[] = [
  { name: "Hindustan Unilever", logo: hul, scale: 0.95, lift: 1.5 },
  { name: "Reliance Jio", logo: jio, scale: 1.2 },
  { name: "Dyson", logo: dyson, scale: 0.9 },
  { name: "Chandigarh University", logo: chandigarh, scale: 1.3 },
  { name: "Aditya Birla Group", logo: abg, scale: 1.45, lift: 1.35 },
  { name: "Masters' Union", logo: mastersUnion, scale: 0.95 },
  { name: "Tetr College of Business", logo: tetr, scale: 1.25, lift: 1.25 },
  { name: "Orange Health Labs", logo: orangeHealth, scale: 0.78 },
  { name: "Varahe Analytics", logo: varahe, scale: 0.95, lift: 1.2 },
  { name: "Bonne Trinity", logo: bonne, scale: 0.85 },
  { name: "Aelira Lung Care", logo: aelira, scale: 1.1, lift: 1.4 },
  { name: "Beco", logo: beco, scale: 0.8 },
  { name: "Strawberry", logo: strawberry, scale: 0.75 },
  { name: "Lovable", logo: lovable, scale: 0.6 },
  { name: "Kaidra Media", scale: 1 },
];

// Two rows, each with its own logos, so a logo is never on screen in both rows at once.
// Each row is drawn four times over, so even a very wide screen never shows the same logo twice in a row.
const COPIES = 4;
const rows = [
  ["Hindustan Unilever", "Masters' Union", "Strawberry", "Orange Health Labs", "Bonne Trinity", "Lovable", "Kaidra Media"],
  ["Aditya Birla Group", "Tetr College of Business", "Chandigarh University", "Reliance Jio", "Dyson", "Varahe Analytics", "Aelira Lung Care", "Beco"],
].map((names) => names.map((name) => clients.find((client) => client.name === name)!));

function Mark({ client, copy }: { client: Client; copy?: boolean }) {
  const filter = client.lift ? `brightness(${client.lift})` : undefined;
  return (
    <li aria-hidden={copy || undefined} className="group/logo flex shrink-0 items-center" title={client.name}>
      {client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          draggable={false}
          style={{ height: `calc(var(--logo-h) * ${client.scale})`, filter }}
          className="w-auto max-w-none select-none transition-transform duration-300 ease-out group-hover/logo:-translate-y-1.5"
        />
      ) : (
        <span
          style={{ fontSize: `calc(var(--logo-h) * 0.62 * ${client.scale})` }}
          className="font-display whitespace-nowrap font-bold leading-none tracking-[-0.035em] text-paper transition-transform duration-300 ease-out group-hover/logo:-translate-y-1.5"
        >
          {client.name}
        </span>
      )}
    </li>
  );
}

/**
 * Two rows of client logos drifting in opposite directions across the full width.
 * Scrolling speeds them up and leans them with the scroll; hovering a row brings it to rest.
 * Pauses off-screen; with reduced motion the rows stand still and scroll by hand.
 */
export default function ClientWall({ className, title = "Trusted by brands in India and beyond.", bare }: { className?: string; title?: string; /** Inside another section: no section padding. */ bare?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRefs = useRef<Array<HTMLUListElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = trackRefs.current.filter(Boolean) as HTMLUListElement[];
    const state = tracks.map((track) => ({ track, x: null as number | null, hover: 0, hovered: false }));
    const cleanups = state.map((row) => {
      const enter = () => (row.hovered = true);
      const leave = () => (row.hovered = false);
      row.track.addEventListener("pointerenter", enter);
      row.track.addEventListener("pointerleave", leave);
      return () => {
        row.track.removeEventListener("pointerenter", enter);
        row.track.removeEventListener("pointerleave", leave);
      };
    });

    let frame = 0;
    let last = performance.now();
    let lastScroll = window.scrollY;
    let velocity = 0;
    let visible = false;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // Scroll speed in px per second, eased so the rows surge and settle instead of jerking.
      const scrolled = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      velocity += ((dt > 0 ? scrolled / dt : 0) - velocity) * 0.12;
      const boost = Math.min(Math.abs(velocity) * 0.06, 120);
      const lean = Math.max(-3, Math.min(3, velocity * -0.0025));

      state.forEach((row, index) => {
        row.hover += ((row.hovered ? 1 : 0) - row.hover) * 0.08;
        const direction = index === 0 ? -1 : 1;
        const speed = (26 + boost) * (1 - row.hover);
        // One set of logos is a quarter of the track. The loop wraps after exactly one set.
        const period = row.track.scrollWidth / COPIES;
        if (!period) return;
        // The second row starts half a set along, so the rows never line up.
        if (row.x === null) row.x = index === 0 ? 0 : -period / 2;
        row.x += direction * speed * dt;
        while (row.x <= -period) row.x += period;
        while (row.x > 0) row.x -= period;
        row.track.style.transform = `translate3d(${row.x}px,0,0) skewX(${lean * (1 - row.hover)}deg)`;
      });
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !frame) {
        last = performance.now();
        lastScroll = window.scrollY;
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(section);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section ref={sectionRef} className={cn(!bare && "py-14 sm:py-20", className)} aria-labelledby="clients">
      <div className="container">
        <Reveal>
          <h2 id="clients" className="font-display max-w-3xl text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">
            {title}
          </h2>
        </Reveal>
      </div>
      <Reveal delay={0.1} y={20}>
        <div className="client-wall mt-12 space-y-8 overflow-hidden sm:mt-12 sm:space-y-12 [--logo-h:36px] sm:[--logo-h:48px] lg:[--logo-h:56px]">
          {rows.map((row, index) => (
            <ul
              key={index}
              ref={(element) => {
                trackRefs.current[index] = element;
              }}
              aria-hidden={index > 0 || undefined}
              className="flex w-max items-center gap-14 pr-14 will-change-transform sm:gap-24 sm:pr-24"
            >
              {/* Each row is drawn twice so the loop has no seam. */}
              {Array.from({ length: COPIES }, () => row).flat().map((client, i) => (
                <Mark key={`${client.name}-${i}`} client={client} copy={i >= row.length} />
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
