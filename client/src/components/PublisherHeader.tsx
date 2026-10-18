import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const utilityLinks = [
  { label: "Media", href: "/" },
  { label: "Our IPs", href: "/network" },
  { label: "Advertise", href: "/marketing" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/approach" },
  { label: "Careers", href: "/careers" },
  { label: "YouTube", href: "/youtube", isNew: true },
];

export const sections = ["Latest", "Startups", "Founders", "Markets", "Leadership", "Space & Tech", "AI", "Auto"];

export const ipTicker = [
  { name: "Successful Arcs", value: "280.6K" },
  { name: "Archive of CEOs", value: "265.4K" },
  { name: "Virodh", value: "35K" },
  { name: "Bourse India", value: "29.1K" },
  { name: "Lucre", value: "15.9K" },
];

export default function PublisherHeader({ activeSection, onSection }: { activeSection?: string; onSection?: (section: string) => void }) {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="hidden bg-black text-[11px] font-semibold uppercase tracking-wide text-white/80 md:block">
        <div className="mx-auto flex max-w-[1320px] items-stretch px-4">
          {utilityLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-1.5 px-3 py-2 transition-colors hover:bg-white/10 hover:text-white ${location === link.href ? "bg-white/15 text-white" : ""}`}
            >
              {link.label}
              {link.isNew && <span className="rounded-sm bg-coral px-1 py-px text-[8px] leading-none text-white">NEW</span>}
            </Link>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#e2365b] via-[#f05a5a] to-coral text-white shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
        <div className="mx-auto flex h-14 max-w-[1320px] items-center gap-6 px-4">
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="SoloDac home">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white"><span className="h-2.5 w-2.5 rounded-full bg-[#e2365b]" /></span>
            <span className="font-display text-2xl font-black tracking-[-0.06em]">SoloDac</span>
          </Link>
          <nav className="hidden flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] text-[13px] font-bold uppercase tracking-wide lg:flex">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => (onSection ? onSection(section) : setLocation(`/?section=${encodeURIComponent(section)}`))}
                className={`whitespace-nowrap rounded px-3 py-1.5 transition-colors hover:bg-white/15 ${activeSection === section ? "bg-white/20" : ""}`}
              >
                {section}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button aria-label="Search" className="hidden h-9 w-9 place-items-center rounded-full hover:bg-white/15 sm:grid">
              <Search size={18} />
            </button>
            <button onClick={() => setLocation("/marketing")} className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#e2365b] transition-transform hover:-translate-y-0.5 sm:flex">
              Book a call <ArrowUpRight size={14} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15 lg:hidden">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto px-3 pb-2 text-[12px] font-bold uppercase tracking-wide lg:hidden [scrollbar-width:none]">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => (onSection ? onSection(section) : setLocation(`/?section=${encodeURIComponent(section)}`))}
              className={`whitespace-nowrap rounded px-2.5 py-1 ${activeSection === section ? "bg-white/25" : "bg-white/10"}`}
            >
              {section}
            </button>
          ))}
        </div>
        {menuOpen && (
          <div className="border-t border-white/20 bg-[#c92d4f] lg:hidden">
            {utilityLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="block border-b border-white/10 px-5 py-3 text-sm font-bold uppercase tracking-wide">
                {link.label}
              </Link>
            ))}
            <div className="p-4">
              <button onClick={() => setLocation("/marketing")} className="w-full rounded-full bg-white py-3 text-sm font-black uppercase tracking-wide text-[#e2365b]">Book a call</button>
            </div>
          </div>
        )}
      </header>

      <div className="relative z-10 overflow-hidden bg-[#111] py-2 text-[12px] font-semibold text-white/85">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...ipTicker, ...ipTicker, ...ipTicker, ...ipTicker].map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {item.name}
              <span className="text-white">{item.value}</span>
              <span className="text-[#3ddc84]">followers ▲</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
