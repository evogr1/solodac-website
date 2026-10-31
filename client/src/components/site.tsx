import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

/** A plain small label, for the few places a page needs one (the 404 code, legal pages). */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-[15px] text-paper/55", className)}>{children}</div>;
}

export function SectionHead({ title, intro, className }: { title: ReactNode; intro?: ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2 className="font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.98] tracking-[-0.03em]">{title}</h2>
      {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/60 sm:text-lg">{intro}</p>}
    </div>
  );
}

type ButtonProps = { href: string; children: ReactNode; className?: string; external?: boolean };

export function PrimaryButton({ href, children, className, external }: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-paper active:scale-[0.97]",
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
      className={cn("inline-flex items-center gap-2 rounded-full bg-paper/10 px-6 py-3.5 text-sm font-semibold text-paper transition-[background-color,color,transform] duration-150 ease-out hover:bg-paper hover:text-ink active:scale-[0.97]", className)}
    >
      {children}
    </Link>
  );
}

export function PageHero({
  title,
  intro,
  children,
  backdrop,
}: {
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  backdrop?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-44">
      {backdrop}
      <div className="container relative">
        <h1 className="font-display max-w-5xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.03em]">{title}</h1>
        {intro && <p className="mt-7 max-w-2xl text-base leading-relaxed text-paper/65 sm:text-lg">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function CtaBand({ title, body, href = "/contact", label = "Book a call" }: { title: ReactNode; body: ReactNode; href?: string; label?: string }) {
  return (
    <section className="container py-24 sm:py-32">
      <h2 className="font-display max-w-4xl text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">{title}</h2>
      <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-paper/70">{body}</p>
      <div className="mt-9">
        <PrimaryButton href={href}>{label}</PrimaryButton>
      </div>
    </section>
  );
}
