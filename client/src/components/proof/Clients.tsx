import Reveal from "@/components/Reveal";
import { clients } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The brands and institutions we have worked with, set as plain names. */
export default function Clients({ className }: { className?: string }) {
  return (
    <section className={cn("container py-14 sm:py-20", className)} aria-labelledby="clients">
      <Reveal>
        <h2 id="clients" className="text-[17px] text-paper/60">Clients we have worked with</h2>
      </Reveal>
      <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4 sm:gap-x-14">
        {clients.map((name, index) => (
          <li key={name}>
            <Reveal delay={index * 0.05} y={14}>
              <span className="font-display text-[clamp(24px,2.6vw,38px)] leading-tight tracking-[-0.02em] text-paper/85">{name}</span>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
