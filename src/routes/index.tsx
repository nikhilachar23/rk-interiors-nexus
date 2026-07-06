import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Check,
  Compass,
  Hammer,
  Home as HomeIcon,
  Layers,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Sparkles,
  Timer,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/section";
import heroLiving from "@/assets/hero-living.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroVilla from "@/assets/hero-villa.jpg";
import tileBedroom from "@/assets/expertise-bedroom.jpg";
import tileOffice from "@/assets/expertise-office.jpg";
import tileWardrobe from "@/assets/expertise-wardrobe.jpg";
import { fetchHomePage, type HomePage as HomePageDoc } from "@/lib/sanity";

const ICONS: Record<string, typeof Ruler> = {
  ruler: Ruler,
  shield: ShieldCheck,
  hammer: Hammer,
  sparkles: Sparkles,
  home: HomeIcon,
  compass: Compass,
  wrench: Wrench,
  timer: Timer,
  layers: Layers,
  message: MessageCircle,
};
function iconFor(name: string | undefined, fallback: typeof Ruler) {
  if (!name) return fallback;
  return ICONS[name.toLowerCase()] ?? fallback;
}

function useHomeDoc() {
  const { data } = useQuery({
    queryKey: ["homePage"],
    queryFn: fetchHomePage,
    staleTime: 60_000,
  });
  return data ?? null;
}

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["homePage"],
      queryFn: fetchHomePage,
      staleTime: 60_000,
    });
  },
  head: () => ({
    meta: [
      { title: "RK Interiors — Interior Design & Turnkey Construction in Bengaluru" },
      {
        name: "description",
        content:
          "Award-worthy interior design and turnkey home construction across Bengaluru — modular kitchens, luxury homes, office fit-outs and renovations by RK Interiors.",
      },
      { property: "og:title", content: "RK Interiors — Interior Design & Turnkey Construction" },
      {
        property: "og:description",
        content:
          "Custom designs, quality assured, on-time delivery. RK Interiors builds premium homes, kitchens and workspaces in Bengaluru.",
      },
      { property: "og:url", content: "/" },
    ],
  }),
  component: HomePage,
});

const heroSlides = [
  {
    image: heroLiving,
    eyebrow: "Interior Design",
    title: "Redefining Spaces,",
    accent: "Enriching Lives.",
    lead: "Turnkey interiors that layer navy calm, marble warmth and hand-detailed brasswork — designed around the way you actually live.",
  },
  {
    image: heroKitchen,
    eyebrow: "Modular Kitchens",
    title: "Kitchens Built",
    accent: "for Every Ritual.",
    lead: "Handleless cabinetry, waterfall islands and integrated appliances — engineered in-house, installed to millimetre precision.",
  },
  {
    image: heroVilla,
    eyebrow: "Turnkey Construction",
    title: "Designing Dreams.",
    accent: "Delivering Excellence.",
    lead: "From blueprint to key handover — structural design, MEP, finishes and landscape, all delivered under one accountable roof.",
  },
];

function HomePage() {
  return (
    <>
      <Hero />
      <VideoBand />
      <Expertise />
      <PackagesPreview />
      <TurnkeySection />
      <Process />
      <WhyUs />
      <Partners />
      <CtaBand />
    </>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden text-marble">
      {heroSlides.map((s, idx) => (
        <img
          key={s.image}
          src={s.image}
          alt={`${s.eyebrow} — ${s.title} ${s.accent}`}
          width={1920}
          height={1152}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms]"
          style={{ opacity: idx === i ? 1 : 0 }}
          {...(idx === 0 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.14 0.035 265 / 0.55) 0%, oklch(0.14 0.035 265 / 0.35) 45%, oklch(0.14 0.035 265 / 0.9) 100%)",
        }}
      />
      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 lg:px-8 lg:pb-28">
        <div className="max-w-3xl">
          <Eyebrow>{heroSlides[i].eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]">
            <span className="block">{heroSlides[i].title}</span>
            <span className="block text-gold-gradient">{heroSlides[i].accent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-marble/85 md:text-lg">
            {heroSlides[i].lead}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gradient-gold text-navy-deep hover:opacity-90 shadow-gold-glow"
            >
              <Link to="/contact">
                Book a Free Consultation <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold-hairline bg-transparent text-marble hover:bg-marble/10"
            >
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6 text-xs text-marble/60">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="flex items-center gap-2"
              >
                <span
                  className="h-px w-10 transition-all"
                  style={{
                    background: idx === i ? "var(--gradient-gold)" : "oklch(1 0 0 / 0.25)",
                    width: idx === i ? "3.5rem" : "1.75rem",
                  }}
                />
                <span className={idx === i ? "text-gold" : ""}>0{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoBand() {
  return (
    <Section tone="navy">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
        <SectionHeading
          eyebrow="Studio Walkthrough"
          title={
            <>
              A closer look at{" "}
              <span className="text-gold-gradient">how we build.</span>
            </>
          }
          lead="Step inside a recent handover — the materials, the millwork and the finishing details that separate a house from a home."
        />
        <div
          className="relative aspect-video overflow-hidden rounded-lg border-gold-hairline shadow-luxe"
          style={{ background: "var(--navy)" }}
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube-nocookie.com/embed/6stlCkUDG_s?rel=0"
            title="RK Interiors — Project Walkthrough"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </Section>
  );
}

const expertiseTiles = [
  { title: "Home Interiors", copy: "Turnkey homes with signature detailing.", image: heroLiving, to: "/interiors" },
  { title: "Modular Kitchens", copy: "Handleless, high-utility, timeless.", image: heroKitchen, to: "/interiors" },
  { title: "Office & Commercial", copy: "Fit-outs that read as quiet luxury.", image: tileOffice, to: "/interiors" },
  { title: "Villa Construction", copy: "Ground-up builds, end to end.", image: heroVilla, to: "/construction" },
  { title: "Bedrooms & Wardrobes", copy: "Cocooned suites, dressing-room storage.", image: tileBedroom, to: "/interiors" },
  { title: "Walk-in Closets", copy: "Backlit glass, marble islands, brass trim.", image: tileWardrobe, to: "/interiors" },
] as const;

function Expertise() {
  return (
    <Section tone="marble">
      <SectionHeading
        center
        eyebrow="Our Expertise"
        title={
          <>
            Six disciplines,{" "}
            <span className="text-gold-gradient">one accountable studio.</span>
          </>
        }
        lead="Design, engineering, procurement and site — coordinated by a single project lead so nothing falls between briefs."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {expertiseTiles.map((t) => (
          <Link
            key={t.title}
            to={t.to}
            className="group relative overflow-hidden rounded-lg border border-border bg-card hover-elevate"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={t.image}
                alt={`${t.title} by RK Interiors — Bengaluru`}
                loading="lazy"
                width={1200}
                height={1500}
                className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 45%, oklch(0.14 0.035 265 / 0.85) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 text-marble">
                <h3 className="font-serif text-2xl">{t.title}</h3>
                <p className="mt-1 text-sm text-marble/80">{t.copy}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-xs text-gold">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

const packages = [
  {
    name: "Essential",
    price: "From ₹1,499 / sq ft",
    tag: "For 2 & 3 BHK homes",
    features: [
      "710-grade BWP ply carcasses with 1mm laminate",
      "Modular kitchen with soft-close hardware",
      "3 wardrobes, TV unit, foyer console",
      "False ceiling & profile lighting (living + bedrooms)",
      "5-year written warranty",
    ],
  },
  {
    name: "Premium",
    price: "From ₹1,999 / sq ft",
    tag: "Most requested",
    highlighted: true,
    features: [
      "Everything in Essential",
      "Acrylic / PU shutters, edge-banded finishes",
      "Full home lighting design + smart controls",
      "Marble-look quartz counters, brass hardware",
      "Painting, wallpapers, curtains, drapes",
      "10-year written warranty",
    ],
  },
  {
    name: "Luxe",
    price: "Bespoke, on request",
    tag: "Villas & duplexes",
    features: [
      "Everything in Premium",
      "Imported veneers, natural stone, statement lighting",
      "Custom joinery, wall panelling, ceiling detailing",
      "3D visualisation + material library sessions",
      "Dedicated project lead + on-site supervisor",
      "Lifetime service partnership",
    ],
  },
];

function PackagesPreview() {
  return (
    <Section tone="navy">
      <SectionHeading
        center
        eyebrow="Our Packages"
        title={
          <>
            Transparent pricing.{" "}
            <span className="text-gold-gradient">No surprises on site.</span>
          </>
        }
        lead="Every package includes design, materials, execution and a written warranty. Choose the finish level — we own the timeline."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {packages.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-lg border p-8 transition-all ${
              p.highlighted
                ? "border-transparent bg-gradient-gold text-navy-deep shadow-gold-glow scale-[1.02]"
                : "border-white/10 bg-white/[0.04] text-marble"
            }`}
          >
            {p.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-navy-deep px-3 py-1 text-xs uppercase tracking-widest text-gold">
                Most Popular
              </span>
            )}
            <p className={p.highlighted ? "eyebrow text-navy-deep/70" : "eyebrow text-gold"}>
              {p.tag}
            </p>
            <h3 className="mt-3 font-serif text-3xl">{p.name}</h3>
            <p className={`mt-1 text-sm ${p.highlighted ? "text-navy-deep/80" : "text-marble/70"}`}>
              {p.price}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      p.highlighted ? "text-navy-deep" : "text-gold"
                    }`}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="lg"
              className={`mt-8 ${
                p.highlighted
                  ? "bg-navy-deep text-marble hover:bg-navy"
                  : "bg-gradient-gold text-navy-deep hover:opacity-90"
              }`}
            >
              <Link to="/packages">See details</Link>
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TurnkeySection() {
  return (
    <Section tone="marble">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-lg border-gold-hairline shadow-luxe">
          <img
            src={heroVilla}
            alt="RK Interiors turnkey home construction — contemporary villa in Bengaluru"
            loading="lazy"
            width={1920}
            height={1152}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="End-to-End Home Construction"
            title={
              <>
                From blueprints to{" "}
                <span className="text-gold-gradient">the day you receive the keys.</span>
              </>
            }
            lead="One contract, one project lead, one warranty. We handle architecture, structural design, statutory approvals, MEP, civil, interiors, landscape and handover — sequenced so the site keeps moving and the budget doesn't."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Ruler, title: "Design & Planning", body: "Site study, 3D concepts, working drawings and BOQ." },
              { icon: ShieldCheck, title: "Approvals", body: "BBMP, BDA, BWSSB, BESCOM — filed and tracked." },
              { icon: Hammer, title: "Civil & Structure", body: "RCC, masonry, plumbing, electrical, HVAC." },
              { icon: Sparkles, title: "Finishes & Handover", body: "Flooring, joinery, painting, snagging, keys." },
            ].map((s) => (
              <li key={s.title} className="flex gap-4 rounded-lg border border-border bg-card p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-gradient-gold text-navy-deep">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-serif text-lg">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

const steps = [
  { n: "01", title: "Consultation", body: "A relaxed conversation about how you live, what you love, and the budget you're planning for.", icon: MessageCircle },
  { n: "02", title: "Design & 3D Modelling", body: "Concept, mood, materials — walked through in photoreal 3D before a single nail is driven.", icon: Compass },
  { n: "03", title: "Execution", body: "In-house project lead, vetted trades, weekly site reviews and a live budget dashboard.", icon: Wrench },
  { n: "04", title: "Handover", body: "Snagging, deep-clean, keys — and a written warranty that keeps us on your speed dial.", icon: HomeIcon },
];

function Process() {
  return (
    <Section tone="navy">
      <SectionHeading
        center
        eyebrow="Our Process"
        title={
          <>
            A single, disciplined journey —{" "}
            <span className="text-gold-gradient">from first sketch to final key.</span>
          </>
        }
      />
      <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li
            key={s.n}
            className="relative rounded-lg border border-white/10 bg-white/[0.03] p-7 text-marble"
          >
            <span className="eyebrow text-gold-gradient">{s.n}</span>
            <s.icon className="mt-4 h-6 w-6 text-gold" />
            <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
            <p className="mt-2 text-sm text-marble/70">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const values = [
  { title: "Custom Designs", body: "Every drawing is drawn for you — no template floor plans, no recycled mood boards.", icon: Layers },
  { title: "Quality Assured", body: "710-grade cores, edge-banded joinery, and vendor QC checks documented at every stage.", icon: ShieldCheck },
  { title: "On-Time Delivery", body: "Gantt-driven scheduling, weekly reviews, and penalty-backed milestones.", icon: Timer },
  { title: "Professional Execution", body: "Directly employed project leads, not sub-contracted supervisors.", icon: Hammer },
];

function WhyUs() {
  return (
    <Section tone="marble">
      <SectionHeading
        eyebrow="Why RK Interiors"
        title={
          <>
            Four promises we{" "}
            <span className="text-gold-gradient">stake our name on.</span>
          </>
        }
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div key={v.title} className="hover-elevate rounded-lg border border-border bg-card p-7">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-gradient-gold text-navy-deep">
              <v.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-serif text-2xl">{v.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const partners = [
  "Hettich", "Blum", "Häfele", "Kohler", "Jaquar", "Asian Paints",
  "Greenlam", "Merino", "Century Ply", "Saint-Gobain", "Philips", "Legrand",
];

function Partners() {
  return (
    <section className="border-y border-white/10 bg-navy-deep py-14 text-marble">
      <p className="eyebrow text-center text-gold-gradient">Trusted Materials · Trusted Partners</p>
      <div className="mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee gap-14 px-8">
          {[...partners, ...partners].map((p, idx) => (
            <span
              key={`${p}-${idx}`}
              className="font-serif text-2xl tracking-wide text-marble/50 hover:text-gold"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <Section tone="marble" className="pt-24">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-navy p-10 text-marble shadow-luxe md:p-16">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Eyebrow>Ready when you are</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              Let's design a home that{" "}
              <span className="text-gold-gradient">feels unmistakably yours.</span>
            </h2>
            <p className="mt-4 max-w-xl text-marble/75">
              A 30-minute discovery call with Vedu — no obligation, no cost. Bring your floor plan
              or just an idea; we'll take it from there.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild size="lg" className="bg-gradient-gold text-navy-deep hover:opacity-90">
              <Link to="/contact">Book a call</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold-hairline bg-transparent text-marble hover:bg-marble/10"
            >
              <a href="tel:+919538772060">Call Vedu</a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
