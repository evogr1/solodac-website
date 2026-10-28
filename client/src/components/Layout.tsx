import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { scrollToId } from "@/lib/smoothScroll";
import { company, nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[1.35rem] tracking-[-0.04em]", className)}>
      solodac<span className="text-signal">.</span>
    </span>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={cn("transition-colors duration-300", scrolled || open ? "border-b border-paper/10 bg-ink/85 backdrop-blur-xl" : "bg-transparent")}>
        <div className="container flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="SoloDac home">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  location === item.href ? "bg-paper/10 text-paper" : "text-paper/60 hover:text-paper",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="hidden items-center gap-1.5 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-signal sm:inline-flex">
              Book a call <ArrowUpRight size={15} />
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-paper/10 bg-ink md:hidden">
          <nav className="container flex flex-col py-4" aria-label="Mobile">
            {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn("font-display border-b border-paper/10 py-4 text-3xl last:border-0", location === item.href ? "text-signal" : "text-paper")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/10 bg-ink-2">
      <div className="container grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark className="text-3xl" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/55">
            We run pages and channels that millions of people watch. Then we build them for founders, creators and brands.
          </p>
          <a href={`mailto:${company.email}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-paper hover:text-signal">
            {company.email} <ArrowUpRight size={14} />
          </a>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40">Company</div>
          <ul className="mt-5 space-y-3 text-sm">
            {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/70 hover:text-paper">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40">Where we are</div>
          <ul className="mt-5 space-y-3 text-sm">
            {company.locations.map((place) => (
              <li key={place.city}>
                <div className="text-paper/85">{place.city}</div>
                <div className="text-xs text-paper/45">{place.role}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40">Legal</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/privacy" className="text-paper/70 hover:text-paper">Privacy policy</Link></li>
            <li><Link href="/terms" className="text-paper/70 hover:text-paper">Terms of service</Link></li>
            <li><Link href="/refunds" className="text-paper/70 hover:text-paper">Refunds and cancellation</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container flex flex-col gap-2 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {company.tradeName}. All rights reserved.</span>
          <span>GSTIN {company.gstin} · Indore, Madhya Pradesh</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  useScrollToTop();

  // Anchor links like /services#youtube land after the page transition finishes.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const timer = window.setTimeout(() => scrollToId(id, true), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
