import { ArrowUpRight, Boxes, BarChart2, BookOpen, Briefcase, ChevronDown, MessageCircle, Menu, PlayCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const sauceItems = [
  { icon: PlayCircle, label: "What we do", id: "services" },
  { icon: BarChart2, label: "Campaigns", id: "case-studies" },
  { icon: BookOpen, label: "Our thesis", id: "approach" },
  { icon: Briefcase, label: "Case studies", id: "case-studies" },
  { icon: MessageCircle, label: "Testimonials", id: "network" },
  { icon: Boxes, label: "Portfolio", id: "case-studies" },
];

const navItems = [
  { id: "approach", label: "About" },
  { id: "case-studies", label: "Careers" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function SiteHeader({ activeSection }: { activeSection?: string }) {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sauceOpen, setSauceOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isFormPage = location === "/eyeballs";

  useEffect(() => {
    if (isFormPage) return;
    const updateScrolled = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
      if (isScrolled) {
        setMenuOpen(false);
        setSauceOpen(false);
      }
    };
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [isFormPage]);

  const goToSection = (id: string) => {
    setMenuOpen(false);
    setSauceOpen(false);
    if (location !== "/") {
      setLocation("/");
      window.setTimeout(() => scrollToId(id), 60);
    } else {
      scrollToId(id);
    }
  };

  const goHome = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    setSauceOpen(false);
    if (location !== "/") {
      setLocation("/");
      window.setTimeout(() => scrollToId("top"), 60);
    } else {
      scrollToId("top");
    }
  };

  return (
    <header className={`z-50 bg-transparent px-2 pt-2 sm:px-4 sm:pt-3 ${isFormPage ? "relative" : "sticky top-2 sm:top-3"}`}>
      <div
        className={`mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 rounded-full border border-white/10 bg-black/40 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur-xl transition-all duration-300 md:w-fit md:justify-normal ${
          scrolled ? "min-h-[40px] px-2 py-1 md:gap-4 lg:gap-6 lg:px-3" : "min-h-[52px] px-3 py-1.5 sm:min-h-[56px] sm:px-4 md:gap-10 lg:gap-14 lg:px-6"
        }`}
      >
        <a href="/" onClick={goHome} className="group flex items-center gap-2" aria-label="SoloDac home">
          <span
            className={`grid place-items-center rounded-full bg-lime text-ink transition-all duration-300 group-hover:rotate-12 ${scrolled ? "h-6 w-6" : "h-7 w-7"}`}
          >
            <span className={`rounded-full bg-ink transition-all duration-300 ${scrolled ? "h-2 w-2" : "h-2.5 w-2.5"}`} />
          </span>
          <span className={`font-display font-black tracking-[-0.08em] transition-all duration-300 ${scrolled ? "text-[0.95rem]" : "text-[1.05rem] sm:text-[1.2rem]"}`}>
            SoloDac
          </span>
        </a>

        <nav
          className={`hidden items-center gap-1 rounded-full bg-white/[0.035] text-[11px] font-bold uppercase tracking-[0.14em] text-white/55 transition-all duration-300 md:flex ${
            scrolled ? "max-w-0 overflow-hidden p-0 opacity-0" : "max-w-[400px] overflow-visible p-1 opacity-100"
          }`}
        >
          <div className="relative" onMouseEnter={() => setSauceOpen(true)} onMouseLeave={() => setSauceOpen(false)}>
            <button
              className={`pill-nav-link flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 ${activeSection === "services" ? "is-active" : ""}`}
            >
              Sauce <ChevronDown size={12} className={`transition-transform duration-200 ${sauceOpen ? "rotate-180" : ""}`} />
            </button>
            {sauceOpen && (
              <div className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-2">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/90 py-2 normal-case shadow-[0_18px_60px_rgba(0,0,0,.4)] backdrop-blur-xl">
                  {sauceItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => goToSection(item.id)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs font-medium normal-case tracking-normal text-white/70 transition-colors hover:bg-white/[0.06] hover:text-paper"
                    >
                      <item.icon size={15} className="text-white/40" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goToSection(item.id)}
              className={`pill-nav-link whitespace-nowrap rounded-full px-3 py-2 ${activeSection === item.id ? "is-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setLocation("/eyeballs")}
          className={`items-center gap-2 rounded-full border border-white/30 bg-white/[0.08] text-[11px] font-bold uppercase tracking-[0.14em] text-paper shadow-inner shadow-white/10 transition-all duration-300 hover:border-lime hover:bg-lime hover:text-ink md:flex ${
            scrolled ? "flex px-3 py-1.5" : "hidden px-4 py-2"
          }`}
        >
          Get eyeballs <ArrowUpRight size={13} />
        </button>

        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
            setSauceOpen(false);
          }}
          className={`shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-paper transition-all duration-300 md:hidden ${
            scrolled ? "hidden" : "grid"
          } ${scrolled ? "h-7 w-7" : "h-8 w-8"}`}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mx-2 mt-2 overflow-hidden rounded-3xl border border-white/10 bg-black/80 shadow-[0_18px_60px_rgba(0,0,0,.4)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col divide-y divide-white/10 text-lg font-medium">
            <div>
              <button
                onClick={() => setSauceOpen(!sauceOpen)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-paper"
              >
                Sauce
                <ChevronDown size={18} className={`text-white/50 transition-transform duration-300 ${sauceOpen ? "rotate-180" : ""}`} />
              </button>
              {sauceOpen && (
                <div className="flex flex-col gap-1 px-5 pb-4 text-sm text-white/60">
                  {sauceItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => goToSection(item.id)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/[0.06] hover:text-paper"
                    >
                      <item.icon size={16} className="text-white/40" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {navItems.map((item) => (
              <button key={item.id} onClick={() => goToSection(item.id)} className="px-5 py-4 text-left text-paper">
                {item.label}
              </button>
            ))}
          </div>
          <div className="p-3">
            <button
              onClick={() => {
                setMenuOpen(false);
                setLocation("/eyeballs");
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:border-lime hover:text-lime"
            >
              Get eyeballs <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
