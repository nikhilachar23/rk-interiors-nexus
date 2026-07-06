import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/construction", label: "Construction" },
  { to: "/interiors", label: "Interiors" },
  { to: "/packages", label: "Packages" },
  { to: "/renovations", label: "Renovations" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-navy-deep/90 backdrop-blur-md shadow-luxe"
          : "bg-navy-deep/40 backdrop-blur-sm",
      )}
      style={{ borderBottom: "1px solid oklch(0.78 0.13 82 / 0.25)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label="RK Interiors home">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border-gold-hairline bg-navy-deep">
            <img
            src="src/assets/rk-gold.png"
            alt="RK Interiors"
            className="h-full w-full object-contain p-1.5"
            />
          </span>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="font-serif text-lg font-semibold tracking-wide text-marble">
              RK <span className="text-gold-gradient">INTERIORS</span>
            </span>
            <span className="eyebrow text-marble/60">Redefining Spaces</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3 py-2 text-sm text-marble/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+919538772060"
            className="hidden items-center gap-2 rounded-full border-gold-hairline px-4 py-2 text-xs font-medium text-marble transition-colors hover:bg-gradient-gold hover:text-navy-deep md:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            +91 95387 72060
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border-gold-hairline text-marble lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-deep/95 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-marble/80 hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
