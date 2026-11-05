import { useEffect, useRef } from "react";
import abg from "@/assets/clients/colour/aditya-birla.jpg";
import aelira from "@/assets/clients/colour/aelira.png";
import beco from "@/assets/clients/colour/beco.png";
import bonne from "@/assets/clients/colour/bonne-trinity.png";
import hul from "@/assets/clients/colour/hindustan-unilever.svg";
import mastersUnion from "@/assets/clients/colour/masters-union.png";
import orangeHealth from "@/assets/clients/colour/orange-health.webp";
import tetr from "@/assets/clients/colour/tetr.svg";
import varahe from "@/assets/clients/colour/varahe.svg";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

type Client = {
  name: string;
  logo?: string;
  /** The logo's height as a share of its tile, so wide and tall marks weigh the same. */
  fit: number;
  /** Logos that are white or neon on their own sit on an ink tile; the rest on cream. */
  tile?: "ink";
};

// Each logo is the client's own, in its own colours, on a tile so every one stays readable on the ink page.
// Varahe's mark is traced from its site header. Kaidra Media has no logo online yet, so it is set as a wordmark.
const clients: Client[] = [
  { name: "Hindustan Unilever", logo: hul, fit: 0.3 },
  { name: "Aditya Birla Group", logo: abg, fit: 0.78 },
  { name: "Masters' Union", logo: mastersUnion, fit: 0.42, tile: "ink" },
  { name: "Tetr College of Business", logo: tetr, fit: 0.62 },
  { name: "Orange Health Labs", logo: orangeHealth, fit: 0.32 },
  { name: "Varahe Analytics", logo: varahe, fit: 0.4 },
  { name: "Bonne Trinity", logo: bonne, fit: 0.42 },
  { name: "Aelira Lung Care", logo: aelira, fit: 0.5 },
  { name: "Beco", logo: beco, fit: 0.38, tile: "ink" },
  { name: "Kaidra Media", fit: 0.3 },
];

const rows = [clients, [...clients].reverse()];

function Mark({ client, copy }: { client: Client; copy?: boolean }) {
  const ink = client.tile === "ink";
  return (
    <li aria-hidden={copy || undefined} className="group/logo shrink-0" title={client.name}>
      <div
        className={cn(
          "grid h-[var(--tile-h)] place-items-center rounded-[1.1rem] px-[calc(var(--tile-h)*0.3)] transition-transform duration-300 ease-out group-hover/logo:-translate-y-1.5",
          ink ? "bg-ink-3" : "bg-paper",
        )}
      >
        {client.logo ? (
          <img
            src={client.logo}
            alt={client.name}
            draggable={false}
            style={{ height: `calc(var(--tile-h) * ${client.fit})` }}
            className={cn("w-auto max-w-none select-none", !ink && "mix-blend-multiply")}
          />
        ) : (
          <span
            style={{ fontSize: `calc(var(--tile-h) * ${client.fit})` }}
            className="font-display whitespace-nowrap font-bold leading-none tracking-[-0.035em] text-ink"
          >
            {client.name}
          </span>
        )}
      </div>
    </li>
  );
}

/**
 * Two rows of client logos drifting in opposite directions across the full width.
 * Scrolling speeds them up and leans them with the scroll; hovering a row brings it to rest.
 * Pauses off-screen; with reduced motion the rows stand still and scroll by hand.
 */
export default function ClientWall({ className, title = "Who hires us." }: { className?: string; title?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRefs = useRef<Array<HTMLUListElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = trackRefs.current.filter(Boolean) as HTMLUListElement[];
    const state = tracks.map((track, index) => ({ track, x: index === 0 ? 0 : -track.scrollWidth / 4, hover: 0, hovered: false }));
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
      const boost = Math.min(Math.abs(velocity) * 0.25, 900);
      const lean = Math.max(-7, Math.min(7, velocity * -0.006));

      state.forEach((row, index) => {
        row.hover += ((row.hovered ? 1 : 0) - row.hover) * 0.08;
        const direction = index === 0 ? -1 : 1;
        const speed = (36 + boost) * (1 - row.hover);
        const half = row.track.scrollWidth / 2;
        row.x += direction * speed * dt;
        if (row.x <= -half) row.x += half;
        if (row.x > 0) row.x -= half;
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
    <section ref={sectionRef} className={cn("py-14 sm:py-20", className)} aria-labelledby="clients">
      <div className="container">
        <Reveal>
          <h2 id="clients" className="font-display max-w-3xl text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.03em]">
            {title}
          </h2>
        </Reveal>
      </div>
      <Reveal delay={0.1} y={20}>
        <div className="client-wall mt-12 space-y-4 overflow-hidden sm:mt-14 sm:space-y-5 [--tile-h:64px] sm:[--tile-h:80px] lg:[--tile-h:96px]">
          {rows.map((row, index) => (
            <ul
              key={index}
              ref={(element) => {
                trackRefs.current[index] = element;
              }}
              aria-hidden={index > 0 || undefined}
              className="flex w-max items-center gap-4 pr-4 will-change-transform sm:gap-5 sm:pr-5"
            >
              {/* Each row is drawn twice so the loop has no seam. */}
              {[...row, ...row].map((client, i) => (
                <Mark key={`${client.name}-${i}`} client={client} copy={i >= row.length} />
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
