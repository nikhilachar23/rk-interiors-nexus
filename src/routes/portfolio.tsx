import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Section, SectionHeading } from "@/components/site/section";
import { fetchPortfolio, type PortfolioProject } from "@/lib/sanity";
import { portfolioSeed } from "@/lib/portfolio-seed";
import { cn } from "@/lib/utils";

const portfolioQuery = queryOptions({
  queryKey: ["portfolio"],
  queryFn: async () => {
    const live = await fetchPortfolio();
    if (!live || live.length === 0) return portfolioSeed;
    // Until real photos are uploaded in the CMS, fall back to the bundled
    // image for a matching slug so no card renders without an image.
    const bySlug = new Map(portfolioSeed.map((p) => [p.slug, p]));
    return live.map((p) => ({
      ...p,
      mainImage: p.mainImage || bySlug.get(p.slug)?.mainImage || "",
    }));
  },
  staleTime: 60_000,
});

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Completed Projects | RK Interiors" },
      { name: "description", content: "A selection of completed residential, commercial, kitchen and office projects by RK Interiors — filterable by category." },
      { property: "og:title", content: "Portfolio — Completed Projects | RK Interiors" },
      { property: "og:description", content: "Filterable gallery of residential, commercial, kitchen and office projects." },
      { property: "og:url", content: "https://www.rkinterio.com/portfolio" },
    ],
    links: [{ rel: "canonical", href: "https://www.rkinterio.com/portfolio" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(portfolioQuery);
  },
  component: PortfolioPage,
});

const cats = ["All", "Apartments", "Villas", "Commercial", "Kitchens"] as const;

function PortfolioPage() {
  const { data } = useSuspenseQuery(portfolioQuery);
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const filtered = useMemo(
    () => (cat === "All" ? data : data.filter((p: PortfolioProject) => p.category === cat)),
    [cat, data],
  );

  return (
    <>
      <header className="navy-surface text-marble">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 lg:px-8 animate-fade-in">
          <p className="eyebrow text-gold-gradient">Portfolio</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl md:text-7xl">
            Handovers we're <span className="text-gold-gradient">proud to sign.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-marble/80 md:text-lg">
            Real projects completed by Vedu (Interiors by Vedu) — apartments inside Sattva, Prestige,
            Godrej, Sobha, DX Max and BDA, 4BHK &amp; 5BHK villas across Bengaluru, plus Just Bake
            outlets, jewellery showrooms and mobile showrooms. Filter by category to see the range.
          </p>
        </div>
      </header>

      <Section tone="marble">
        <div className="mb-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors",
                cat === c
                  ? "border-transparent bg-gradient-gold text-navy-deep"
                  : "border-border bg-card text-foreground hover:border-gold",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p._id}
              id={p.slug}
              className="hover-elevate group overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.mainImage}
                  alt={`${p.title} — ${p.category} project by RK Interiors, ${p.location ?? "Bengaluru"}`}
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="eyebrow text-gold-gradient">{p.category}{p.location ? ` · ${p.location}` : ""}</p>
                <h3 className="mt-2 font-serif text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}