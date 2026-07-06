import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook } from "lucide-react";

const cols = [
  {
    title: "Explore",
    links: [
      { to: "/", label: "Home" },
      { to: "/construction", label: "Construction" },
      { to: "/interiors", label: "Interiors" },
      { to: "/packages", label: "Packages" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/renovations", label: "Renovations" },
      { to: "/portfolio", label: "Portfolio" },
      { to: "/gallery", label: "Gallery" },
      { to: "/testimonials", label: "Testimonials" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="navy-surface text-marble">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-sm border-gold-hairline">
                <span className="font-serif text-xl text-gold-gradient">RK</span>
              </span>
              <div>
                <p className="font-serif text-xl tracking-wide">
                  RK <span className="text-gold-gradient">INTERIORS</span>
                </p>
                <p className="eyebrow text-marble/60">Designing Dreams · Delivering Excellence</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-marble/70">
              Turnkey interior design and construction for homes, kitchens and workspaces across
              Bengaluru. Custom-designed, quality-assured, and delivered on time — every time.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/rkinterior_____?utm_source=qr&igsh=NWt1NjNtdmpmcXVi"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border-gold-hairline transition-colors hover:bg-gradient-gold hover:text-navy-deep"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1B7TZHJMbH/"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border-gold-hairline transition-colors hover:bg-gradient-gold hover:text-navy-deep"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/919538772060"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border-gold-hairline transition-colors hover:bg-gradient-gold hover:text-navy-deep"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-gold">{col.title}</h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-marble/75 transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="eyebrow text-gold">Reach Vedu</h4>
            <ul className="mt-4 space-y-3 text-sm text-marble/80">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <div className="min-w-0">
                  <a href="tel:+919538772060" className="block hover:text-gold">
                    +91 95387 72060
                  </a>
                  <a href="tel:+917892656285" className="block hover:text-gold">
                    +91 78926 56285
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href="mailto:vedaraj.vedu@gmail.com" className="hover:text-gold">
                  vedaraj.vedu@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-gold mt-14" />
        <div className="flex flex-col-reverse gap-4 pt-6 text-xs text-marble/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RK Interiors. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="hover:text-gold">Contact</Link>
            <a href="/sitemap.xml" className="hover:text-gold">Sitemap</a>
            <Link to="/portfolio" className="hover:text-gold">Portfolio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
