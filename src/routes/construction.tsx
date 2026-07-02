import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, Building2, Ruler, ShieldCheck, HardHat } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import villa from "@/assets/hero-villa.jpg";

export const Route = createFileRoute("/construction")({
  head: () => ({
    meta: [
      { title: "Turnkey Home Construction in Bengaluru | RK Interiors" },
      { name: "description", content: "Ground-up villa construction, structural engineering and turnkey home building in Bengaluru — architecture, MEP, civil, finishes and handover, delivered under one contract." },
      { property: "og:title", content: "Turnkey Home Construction in Bengaluru | RK Interiors" },
      { property: "og:description", content: "Villa construction and turnkey building — one project lead, one warranty." },
      { property: "og:url", content: "/construction" },
      { property: "og:image", content: "/hero-villa.jpg" },
    ],
    links: [{ rel: "canonical", href: "/construction" }],
  }),
  component: ConstructionPage,
});

const scope = [
  "Site survey, soil testing & feasibility",
  "Architectural design + working drawings",
  "Structural design (RCC + steel)",
  "BBMP / BDA statutory approvals",
  "Excavation, foundation & PCC",
  "RCC frame, masonry, plastering",
  "Plumbing, sanitary & water proofing",
  "Electrical, HVAC, low-voltage",
  "Flooring, joinery, painting",
  "Landscape, gates, driveway",
  "Snag-fix, deep-clean, handover",
  "10-year structural warranty",
];

function ConstructionPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden">
        <img src={villa} alt="RK Interiors villa construction in Bengaluru" width={1920} height={1152} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.14 0.035 265 / 0.75), oklch(0.14 0.035 265 / 0.9))" }} />
        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-40 lg:px-8">
          <p className="eyebrow text-gold-gradient">Turnkey Construction</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.98] text-marble md:text-7xl">
            Villas and homes, <span className="text-gold-gradient">built ground-up.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-marble/80 md:text-lg">
            RK Interiors is a full-service design-build studio in Bengaluru. We take on ground-up
            villa construction and full home builds under a single contract — from soil report to
            key handover — so you never have to coordinate architects, contractors and vendors on
            your own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-gold text-navy-deep hover:opacity-90 shadow-gold-glow">
              <Link to="/contact">Request a site visit <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gold-hairline bg-transparent text-marble hover:bg-marble/10">
              <Link to="/packages">See packages</Link>
            </Button>
          </div>
        </div>
      </header>

      <Section tone="marble">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Scope of Work" title={<>Everything a home needs, <span className="text-gold-gradient">under one contract.</span></>} lead="A single project lead runs design, procurement, civil, MEP and finishes. You get one weekly review, one live budget, one point of accountability." />
          <ul className="grid gap-3 sm:grid-cols-2">
            {scope.map((s) => (
              <li key={s} className="flex items-start gap-2 rounded-md border border-border bg-card p-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="navy">
        <SectionHeading center eyebrow="What We Build" title={<>Bespoke residences, <span className="text-gold-gradient">engineered to last.</span></>} />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Building2, title: "Villas & Bungalows", body: "Contemporary and classical villas on 30x40 to 60x90 sites." },
            { icon: Ruler, title: "Custom Homes", body: "Independent homes designed around your family's routines." },
            { icon: HardHat, title: "Renovations & Extensions", body: "Structural additions, floor additions, façade retrofits." },
            { icon: ShieldCheck, title: "Turnkey Interiors", body: "Bundle interiors with construction for one accountable brief." },
          ].map((c) => (
            <div key={c.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-7 text-marble">
              <c.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-serif text-2xl">{c.title}</h3>
              <p className="mt-2 text-sm text-marble/70">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}