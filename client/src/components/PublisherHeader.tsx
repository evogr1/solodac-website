import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import type { TickerQuote } from "@shared/ticker";

const navLinks = [
  { label: "Stories", href: "/stories" },
  { label: "Network", href: "/network" },
  { label: "Studio", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "YouTube", href: "/youtube" },
  { label: "About", href: "/approach" },
];

export default function PublisherHeader() {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="font-headline text-2xl tracking-wide text-ink" aria-label="SoloDac home">
          SOLODAC<span className="text-pink">.</span>
        </Link>

        <nav className="hidden items-center gap-1 font-mono text-[12px] uppercase tracking-[0.14em] lg:flex">
          {navLinks.map((link) => {
            const active = location === link.href || (link.href !== "/" && location.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 transition-colors ${active ? "bg-ink text-paper" : "text-ink/60 hover:text-green"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLocation("/marketing")}
            className="hidden items-center gap-1.5 rounded-full bg-green px-5 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink sm:flex"
          >
            Book a call <ArrowUpRight size={14} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink lg:hidden">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-ink/10 bg-paper lg:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block border-b border-ink/5 px-6 py-4 font-mono text-sm uppercase tracking-[0.14em] text-ink">
              {link.label}
            </Link>
          ))}
          <div className="p-4">
            <button onClick={() => setLocation("/marketing")} className="flex w-full items-center justify-center gap-2 rounded-full bg-green py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper">
              Book a call <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export function StockTicker() {
  const [quotes, setQuotes] = useState<TickerQuote[]>([]);

  useEffect(() => {
    let active = true;
    const load = () =>
      fetch("/api/ticker")
        .then((response) => (response.ok ? response.json() : []))
        .then((data: TickerQuote[]) => active && Array.isArray(data) && data.length && setQuotes(data))
        .catch(() => {});
    load();
    const timer = window.setInterval(load, 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  if (!quotes.length) return null;

  return (
    <div className="h-9 overflow-hidden rounded-full border border-ink/10 bg-ink font-mono text-[12px] text-paper/80">
      <div className="marquee-track flex h-full w-max items-center gap-10 whitespace-nowrap px-4">
        {[...quotes, ...quotes].map((quote, index) => {
          const up = quote.change >= 0;
          return (
            <span key={index} className="flex items-center gap-2">
              {quote.name}
              <span className="text-paper">{quote.symbol.startsWith("^") ? "" : "₹"}{quote.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
              <span className={up ? "text-greenbright" : "text-pink"}>
                {up ? "+" : ""}{quote.changePct.toFixed(2)}% {up ? "▲" : "▼"}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
