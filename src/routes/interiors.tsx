import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import living from "@/assets/hero-living.jpg";
import kitchen from "@/assets/hero-kitchen.jpg";
import wardrobe from "@/assets/expertise-wardrobe.jpg";
import bedroom from "@/assets/expertise-bedroom.jpg";
import office from "@/assets/expertise-office.jpg";
import bath from "@/assets/gallery-bath.jpg";

export const Route = createFileRoute("/interiors")({
  head: () => ({
    meta: [
      { title: "Luxury Interior Designers in Bengaluru | RK Interiors" },
      { name: "description", content: "Modular kitchens, walk-in wardrobes, luxury bedrooms and office fit-outs by RK Interiors — spatial design, joinery and lighting for premium homes in Bengaluru." },
      { property: "og:title", content: "Luxury Interior Designers in Bengaluru | RK Interiors" },
      { property: "og:description", content: "Kitchens, wardrobes, bedrooms and offices — designed and executed in-house." },
      { property: "og:url", content: "https://www.rkinterio.com/interiors" },
      { property: "og:image", content: "/hero-living.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.rkinterio.com/interiors" }],
  }),
  component: InteriorsPage,
});

const services = [
  { image: living, title: "Living & Dining", body: "Layered navy-and-marble living rooms with custom media walls, panelled ceilings and layered lighting." },
  { image: kitchen, title: "Modular Kitchens", body: "Handleless matte cabinetry, waterfall islands, integrated appliances and warm oak tall units." },
  { image: wardrobe, title: "Walk-in Wardrobes", body: "Backlit glass shelving, marble islands, integrated jewellery drawers and lift-up shoe cases." },
  { image: bedroom, title: "Master Bedrooms", body: "Upholstered headboards, wood panelling, brass sconces and blackout drape systems." },
  { image: office, title: "Office Fit-outs", body: "Framed-glass cabins, acoustic ceilings, walnut paneling and executive workstations." },
  { image: bath, title: "Bath & Wet Areas", body: "Book-matched marble suites, backlit mirrors, brass fittings and freestanding tubs." },
];

function InteriorsPage() {
  return (
    <>
      <header className="navy-surface text-marble">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 lg:px-8 animate-fade-in">
          <p className="eyebrow text-gold-gradient">Interior Design Studio</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.98] md:text-7xl">
            Spatial design that lives with you, <span className="text-gold-gradient">not around you.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-marble/80 md:text-lg">
            We design and execute residential and commercial interiors in Bengaluru — from full
            home turnkeys and modular kitchens to workspaces that read as quiet luxury. Every
            project ships with in-house joinery, considered lighting and detailed handover.
          </p>
        </div>
      </header>

      <Section tone="marble">
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.title} className="hover-elevate overflow-hidden rounded-lg border border-border bg-card">
              <img src={s.image} alt={`${s.title} — RK Interiors, Bengaluru`} loading="lazy" width={1400} height={1000} className="aspect-[16/10] w-full object-cover" />
              <div className="p-7">
                <h2 className="font-serif text-2xl">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Button asChild size="lg" className="bg-gradient-gold text-navy-deep hover:opacity-90">
            <Link to="/contact">Start your interior brief <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>
    </>
  );
}