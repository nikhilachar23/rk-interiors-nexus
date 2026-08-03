import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials & Reviews | RK Interiors Bengaluru" },
      { name: "description", content: "Read what RK Interiors clients across Bengaluru say about their home, kitchen, office and villa handovers — verified reviews with locations and project types." },
      { property: "og:title", content: "Client Testimonials | RK Interiors" },
      { property: "og:description", content: "Verified reviews from clients across Bengaluru." },
      { property: "og:url", content: "https://www.rkinterio.com/testimonials" },
    ],
    links: [{ rel: "canonical", href: "https://www.rkinterio.com/testimonials" }],
  }),
  component: TestimonialsPage,
});

const reviews = [
  { name: "Ananya & Karthik R.", location: "Whitefield, Bengaluru", project: "4 BHK Duplex Interiors", quote: "Vedu and his team ran our duplex like a startup — weekly stand-ups, a live budget sheet, and site walk-throughs every Saturday. We moved in on the day they promised.", stars: 5 },
  { name: "Meera S.", location: "Sarjapur Road", project: "Modular Kitchen", quote: "We looked at three vendors. RK was the only one who redrew our kitchen instead of retro-fitting a template. Two years in and every drawer still glides.", stars: 5 },
  { name: "Dr. Prakash N.", location: "Devanahalli", project: "Villa Construction", quote: "They handled architecture, structure, MEP and interiors under one contract. We stopped chasing vendors and started planning the housewarming.", stars: 5 },
  { name: "Rohit & Simran", location: "HSR Layout", project: "Office Fit-out", quote: "Our team walked into the office on a Monday morning and it was ready — cabling, lighting, HVAC, signage. Weekend cutover, zero downtime.", stars: 5 },
  { name: "Sneha V.", location: "Jayanagar", project: "Home Renovation", quote: "They renovated our parents' 30-year-old home while we lived in it. Dust curtains, floor protection, evening cleanups — everyday.", stars: 5 },
  { name: "Aditya J.", location: "Hebbal", project: "Walk-in Wardrobe", quote: "The final wardrobe reveal actually made my wife tear up. Backlit glass, jewellery drawers, hidden LED — worth every rupee.", stars: 5 },
];

function TestimonialsPage() {
  return (
    <>
      <header className="navy-surface text-marble">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 lg:px-8 animate-fade-in">
          <p className="eyebrow text-gold-gradient">Testimonials</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl md:text-7xl">
            Trusted by families across <span className="text-gold-gradient">Bengaluru.</span>
          </h1>
        </div>
      </header>
      <Section tone="marble">
        <SectionHeading eyebrow="Verified reviews" title={<>Real projects. <span className="text-gold-gradient">Real handovers.</span></>} />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="hover-elevate flex h-full flex-col rounded-lg border border-border bg-card p-7">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 font-serif text-lg leading-snug">"{r.quote}"</blockquote>
              <figcaption className="mt-6 border-t pt-4 text-sm">
                <p className="font-medium">{r.name}</p>
                <p className="text-muted-foreground">{r.project} · {r.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}