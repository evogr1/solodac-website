import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const navItems = [
  { id: "services", label: "Services" },
  { id: "network", label: "Network" },
  { id: "approach", label: "Approach" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function SiteHeader({ activeSection }: { activeSection?: string }) {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSection = (id: string) => {
    setMenuOpen(false);
    if (location !== "/") {
      setLocation("/");
      window.setTimeout(() => scrollToId(id), 60);
    } else {
      scrollToId(id);
    }
  };

  return (
    <header className="sticky top-2 z-50 bg-transparent px-2 pt-2 sm:top-3 sm:px-4 sm:pt-3">
      <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur-xl sm:min-h-[76px] sm:px-7 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label="SoloDac home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-ink transition-transform duration-200 group-hover:rotate-12 sm:h-10 sm:w-10">
            <span className="h-3 w-3 rounded-full bg-ink sm:h-3.5 sm:w-3.5" />
          </span>
          <span className="font-display text-[1.35rem] font-black tracking-[-0.08em] sm:text-[1.7rem]">SoloDac</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-white/[0.035] p-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goToSection(item.id)}
              className={`pill-nav-link rounded-full px-4 py-3 ${activeSection === item.id ? "is-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setLocation("/eyeballs")}
            className={`pill-nav-link rounded-full px-4 py-3 ${location === "/eyeballs" ? "is-active" : ""}`}
          >
            Contact
          </button>
        </nav>

        <button
          onClick={() => setLocation("/eyeballs")}
          className="hidden items-center gap-3 rounded-full border border-white/30 bg-white/[0.08] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-paper shadow-inner shadow-white/10 transition-all hover:border-lime hover:bg-lime hover:text-ink md:flex"
        >
          Get eyeballs <ArrowUpRight size={14} />
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-paper md:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mx-2 mt-2 rounded-3xl border border-white/10 bg-black/60 px-3 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5 text-sm font-bold uppercase tracking-[0.14em]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className={`text-left ${activeSection === item.id ? "text-lime" : "text-white/70"}`}
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => setLocation("/eyeballs")} className="text-left text-lime">
              Get eyeballs <ArrowUpRight className="ml-1 inline" size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
