import { useEffect, useRef } from "react";
import abg from "@/assets/clients/aditya-birla.png";
import aelira from "@/assets/clients/aelira.png";
import bonne from "@/assets/clients/bonne-trinity.png";
import mastersUnion from "@/assets/clients/masters-union.png";
import orangeHealth from "@/assets/clients/orange-health.png";
import tetr from "@/assets/clients/tetr.png";
import varahe from "@/assets/clients/varahe.svg";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

type Client = { name: string; logo?: string; /** Optical size: wide logos sit lower so every mark weighs the same. */ scale: number };

// Logos are each client's own, recoloured to one cream so eight brand palettes don't fight on ink.
// Varahe's mark is traced from its site header. Kaidra Media has no logo online yet, so it is set as a wordmark.
const clients: Client[] = [
  { name: "Aditya Birla Group", logo: abg, scale: 1.35 },
  { name: "Masters' Union", logo: mastersUnion, scale: 0.95 },
  { name: "Tetr College of Business", logo: tetr, scale: 1.2 },
  { name: "Orange Health Labs", logo: orangeHealth, scale: 0.6 },
  { name: "Varahe Analytics", logo: varahe, scale: 0.9 },
  { name: "Bonne Trinity", logo: bonne, scale: 0.85 },
  { name: "Aelira Lung Care", logo: aelira, scale: 1.05 },
  { name: "Kaidra Media", scale: 1 },
];

const rows = [clients, [...clients].reverse()];

function Mark({ client, copy }: { client: Client; copy?: boolean }) {
  const height = `calc(var(--logo-h) * ${client.scale})`;
  return (
    <li aria-hidden={copy || undefined} className="group/logo flex shrink-0 items-center" title={client.name}>
      {client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          draggable={false}
          style={{ height }}
          className="w-auto select-none opacity-75 transition-[opacity,transform] duration-300 ease-out group-hover/logo:-translate-y-1 group-hover/logo:opacity-100"
        />
      ) : (
        <span
          style={{ fontSize: `calc(var(--logo-h) * 0.62 * ${client.scale})` }}
          className="font-display whitespace-nowrap font-bold leading-none tracking-[-0.035em] text-paper opacity-75 transition-[opacity,transform] duration-300 ease-out group-hover/logo:-translate-y-1 group-hover/logo:opacity-100"
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
        <div className="client-wall mt-12 space-y-10 overflow-hidden sm:mt-16 sm:space-y-14 [--logo-h:36px] sm:[--logo-h:50px] lg:[--logo-h:60px]">
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
