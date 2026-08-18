import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import retail from "@/assets/gallery-retail.jpg";
import living from "@/assets/hero-living.jpg";
import { rkPageHead } from "@/lib/seo";

export const Route = createFileRoute("/renovations")({
  head: () => rkPageHead(
    "/renovations",
    "Home & Commercial Renovations in Bengaluru | RK Interiors",
    "Residential and commercial renovations in Bengaluru by RK Interiors, including structural retrofits, layout re-plans and complete modernisation.",
  ),
  component: Renovations,
});

function Renovations() {
  return (
    <>
      <header className="navy-surface text-marble">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-36 lg:px-8 animate-fade-in">
          <p className="eyebrow text-gold-gradient">Renovations & Retrofits</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl">
            Rework what you have. <span className="text-gold-gradient">Reveal what it can become.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-marble/80 md:text-lg">
            We renovate ageing homes, apartments, offices and retail spaces across Bengaluru —
            from single-room refreshes to full structural retrofits. Where possible we open plans,
            add light, and modernise services without disturbing what already works.
          </p>
        </div>
      </header>

      <Section tone="marble">
        <div className="grid gap-14 lg:grid-cols-2">
          <article className="overflow-hidden rounded-lg border border-border bg-card">
            <img src={living} alt="Residential renovation, Bengaluru — RK Interiors" width={1920} height={1152} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h2 className="font-serif text-3xl">Residential renovations</h2>
              <p className="mt-2 text-sm text-muted-foreground">Layout re-plans, kitchen and bath overhauls, joinery replacement, false ceilings, painting and services upgrade. We work in occupied homes with dust-controlled site protocols and staged handovers.</p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg border border-border bg-card">
            <img src={retail} alt="Commercial renovation, Bengaluru — RK Interiors" width={1920} height={1152} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h2 className="font-serif text-3xl">Commercial renovations</h2>
              <p className="mt-2 text-sm text-muted-foreground">Retail, F&B and office retrofits — fast-track site delivery, weekend cut-overs and coordinated MEP. We plan renovations around your operating hours so you never fully close.</p>
            </div>
          </article>
        </div>

        <div className="mt-14 flex justify-center">
          <Button asChild size="lg" className="bg-gradient-gold text-navy-deep hover:opacity-90">
            <Link to="/contact">Discuss your renovation <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>
    </>
  );
}