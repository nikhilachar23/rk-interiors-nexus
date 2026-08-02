import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Interior Packages & Pricing in Bengaluru | RK Interiors" },
      { name: "description", content: "Transparent interior design packages for 2 BHK, 3 BHK and villas — Essential, Premium and Luxe. Full-home interiors with material spec, warranty and timelines." },
      { property: "og:title", content: "Interior Packages & Pricing | RK Interiors" },
      { property: "og:description", content: "Essential, Premium and Luxe packages — with material spec, warranty and delivery timelines." },
      { property: "og:url", content: "https://www.rkinterio.com/packages" },
    ],
    links: [{ rel: "canonical", href: "https://www.rkinterio.com/packages" }],
  }),
  component: PackagesPage,
});

const packages = [
  { name: "Standard", price: "From ₹1,499 / sq ft", timeline: "45–60 working days", warranty: "5-year warranty",
    features: ["710-grade BWP ply carcasses, 1mm laminate finish", "Modular kitchen with soft-close hardware", "3 wardrobes, TV unit, foyer console, crockery unit", "False ceiling & profile lighting — living, dining, bedrooms", "Painting (Asian Paints Royale) — full home", "Sanitary & plumbing fixtures — Jaquar / Kohler"] },
  { name: "Premium", price: "From ₹1,999 / sq ft", timeline: "60–90 working days", warranty: "15-year warranty", highlighted: true,
    features: ["Everything in Essential", "Acrylic / PU shutters, edge-banded finishes", "Full-home lighting design + smart controls", "Marble-look quartz counters, brass hardware", "Wallpapers, curtains, drapes, blinds", "Designer sanitaryware + digital shower systems"] },
  { name: "Luxury", price: "Bespoke — on request", timeline: "90–150 working days", warranty: "Lifetime service partnership",
    features: ["Everything in Premium", "Imported veneers, natural stone, statement lighting", "Custom joinery, wall panelling, ceiling detailing", "3D visualisation + material library sessions", "Dedicated project lead + on-site supervisor", "White-glove handover with styling & art curation"] },
];

function PackagesPage() {
  return (
    <>
      <header className="navy-surface text-marble">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-36 lg:px-8">
          <p className="eyebrow text-gold-gradient">Our Packages</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl">
            Three tiers. <span className="text-gold-gradient">Zero surprises on site.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-marble/80 md:text-lg">
            Every package includes design, execution, project management and a written warranty.
            Choose the finish level — we own the timeline and the material spec.
          </p>
        </div>
      </header>

      <Section tone="marble">
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-lg p-8 ${p.highlighted ? "bg-gradient-gold text-navy-deep shadow-gold-glow scale-[1.02]" : "border border-border bg-card"}`}>
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-navy-deep px-3 py-1 text-xs uppercase tracking-widest text-gold">Most Popular</span>
              )}
              <h2 className="font-serif text-3xl">{p.name}</h2>
              <p className={`mt-1 text-sm ${p.highlighted ? "text-navy-deep/80" : "text-muted-foreground"}`}>{p.price}</p>
              <div className={`mt-4 flex flex-wrap gap-3 text-xs ${p.highlighted ? "text-navy-deep/80" : "text-muted-foreground"}`}>
                <span>⏱ {p.timeline}</span><span>· ✓ {p.warranty}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlighted ? "text-navy-deep" : "text-gold"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className={`mt-8 ${p.highlighted ? "bg-navy-deep text-marble hover:bg-navy" : "bg-gradient-gold text-navy-deep hover:opacity-90"}`}>
                <Link to="/contact">Get a personalised quote</Link>
              </Button>
            </div>
          ))}
        </div>

        <SectionHeading center eyebrow="Quote Calculator" title={<>Not sure which tier fits? <span className="text-gold-gradient">Ask Vedu.</span></>} lead="Share your floor plan and rooms — we'll respond in 24 hours with a room-by-room estimate and a walkthrough of what changes between tiers." />
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="bg-gradient-gold text-navy-deep hover:opacity-90">
            <Link to="/contact">Request an estimate</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
