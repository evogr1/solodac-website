import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/55", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {children}
    </div>
  );
}

export function SectionHead({ kicker, title, intro, className }: { kicker: string; title: ReactNode; intro?: ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Kicker>{kicker}</Kicker>
      <h2 className="font-display mt-5 text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.98]">{title}</h2>
      {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/60 sm:text-lg">{intro}</p>}
    </div>
  );
}

type ButtonProps = { href: string; children: ReactNode; className?: string; external?: boolean };

export function PrimaryButton({ href, children, className, external }: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper",
    className,
  );
  const inner = (
    <>
      {children}
      <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  );
  if (external) return <a href={href} target="_blank" rel="noreferrer" className={classes}>{inner}</a>;
  return <Link href={href} className={classes}>{inner}</Link>;
}

export function GhostButton({ href, children, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink", className)}
    >
      {children}
    </Link>
  );
}

export function PageHero({ kicker, title, intro, children }: { kicker: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-paper/10 pb-16 pt-32 sm:pb-24 sm:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="container relative">
        <Kicker>{kicker}</Kicker>
        <h1 className="font-display mt-6 max-w-5xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92]">{title}</h1>
        {intro && <p className="mt-7 max-w-2xl text-base leading-relaxed text-paper/65 sm:text-lg">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function CtaBand({ title, body, href = "/contact", label = "Book a call" }: { title: ReactNode; body: ReactNode; href?: string; label?: string }) {
  return (
    <section className="container py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl bg-signal px-6 py-14 text-ink sm:px-14 sm:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-ink/10" />
        <h2 className="font-display relative max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95]">{title}</h2>
        <p className="relative mt-5 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">{body}</p>
        <Link href={href} className="relative mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-ink-3">
          {label} <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
