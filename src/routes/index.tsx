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
      { title: "RK Interiors (Vedu) — Interior Design & Turnkey Construction in Bengaluru" },
      {
        name: "description",
        content:
          "RK Interiors — also known as Interiors by Vedu — is a Bengaluru-based interior design and turnkey construction firm trusted for work inside Sattva, Prestige, Godrej and Sobha apartments, 4BHK & 5BHK villas across Whitefield, Kanakapura Road and Devanahalli, and commercial fit-outs like Just Bake, jewellery and mobile showrooms.",
      },
      { property: "og:title", content: "RK Interiors (Vedu) — Interior Design & Turnkey Construction in Bangalore" },
      {
        property: "og:description",
        content:
          "Also known as Interiors by Vedu. Turnkey interiors and villa construction in Bangalore — Sattva, Prestige, Godrej, Sobha apartments, 4BHK/5BHK villas and commercial showrooms.",
      },
      { property: "og:url", content: "https://www.rkinterio.com/" },
    ],
    links: [{ rel: "canonical", href: "https://www.rkinterio.com/" }],
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
  const doc = useHomeDoc();
  return (
    <>
      <Hero doc={doc} />
      <VideoBand doc={doc} />
      <Expertise doc={doc} />
      <PackagesPreview doc={doc} />
      <TurnkeySection doc={doc} />
      <Process doc={doc} />
      <WhyUs doc={doc} />
      <Areas />
      <Partners doc={doc} />
      <CtaBand doc={doc} />
    </>
  );
}

function Hero({ doc }: { doc: HomePageDoc | null }) {
  const slides =
    doc?.heroSlides && doc.heroSlides.length > 0
      ? doc.heroSlides.map((s, i) => ({
          image: s.imageUrl ?? heroSlides[i % heroSlides.length].image,
          eyebrow: s.eyebrow ?? "",
          title: s.title ?? "",
          accent: s.accent ?? "",
          lead: s.lead ?? "",
          alt: s.alt ?? `${s.eyebrow} — ${s.title} ${s.accent}`,
        }))
      : heroSlides.map((s) => ({ ...s, alt: `${s.eyebrow} — ${s.title} ${s.accent}` }));
  const primaryLabel = doc?.heroPrimaryCtaLabel ?? "Book a Free Consultation";
  const primaryHref = doc?.heroPrimaryCtaHref ?? "/contact";
  const secondaryLabel = doc?.heroSecondaryCtaLabel ?? "View Portfolio";
  const secondaryHref = doc?.heroSecondaryCtaHref ?? "/portfolio";

  const [i, setI] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden text-marble">
      {slides.map((s, idx) => (
        <img
          key={`${s.image}-${idx}`}
          src={s.image}
          alt={s.alt}
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
          <Eyebrow>{slides[i].eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]">
            <span className="block">{slides[i].title}</span>
            <span className="block text-gold-gradient">{slides[i].accent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-marble/85 md:text-lg">
            {slides[i].lead}
          </p>
          <p className="mt-4 max-w-xl text-sm text-marble/70">
            Also known as <span className="text-gold">Interiors by Vedu</span> — trusted for
            work inside Sattva, Prestige, Godrej and Sobha apartments across Bengaluru.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gradient-gold text-navy-deep hover:opacity-90 shadow-gold-glow"
            >
              <a href={primaryHref}>
                {primaryLabel} <ArrowRight className="ml-1 h-4 w-4 inline" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold-hairline bg-transparent text-marble hover:bg-marble/10"
            >
              <a href={secondaryHref}>{secondaryLabel}</a>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6 text-xs text-marble/60">
            {slides.map((_, idx) => (
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

function VideoBand({ doc }: { doc: HomePageDoc | null }) {
  const v = doc?.videoBand;
  const eyebrow = v?.eyebrow ?? "Studio Walkthrough";
  const titleText = v?.title ?? "A closer look at";
  const accent = v?.accent ?? "how we build.";
  const lead =
    v?.lead ??
    "Step inside a recent handover — the materials, the millwork and the finishing details that separate a house from a home.";
  const embed = v?.youtubeEmbedUrl ?? "https://www.youtube-nocookie.com/embed/6stlCkUDG_s?rel=0";
  return (
    <Section tone="navy">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
        <SectionHeading
          eyebrow={eyebrow}
          title={
            <>
              {titleText}{" "}
              <span className="text-gold-gradient">{accent}</span>
            </>
          }
          lead={lead}
        />
        <div
          className="relative aspect-video overflow-hidden rounded-lg border-gold-hairline shadow-luxe"
          style={{ background: "var(--navy)" }}
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embed}
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

function Expertise({ doc }: { doc: HomePageDoc | null }) {
  const e = doc?.expertise;
  const tiles =
    e?.tiles && e.tiles.length > 0
      ? e.tiles.map((t, i) => ({
          title: t.title ?? expertiseTiles[i % expertiseTiles.length].title,
          copy: t.copy ?? "",
          image: t.imageUrl ?? expertiseTiles[i % expertiseTiles.length].image,
          to: t.linkHref ?? "/interiors",
        }))
      : expertiseTiles.map((t) => ({ ...t }));
  const eyebrow = e?.eyebrow ?? "Our Expertise";
  const titleText = e?.title ?? "Six disciplines,";
  const accent = e?.accent ?? "one accountable studio.";
  const lead =
    e?.lead ??
    "Design, engineering, procurement and site — coordinated by a single project lead so nothing falls between briefs.";
  return (
    <Section tone="marble">
      <SectionHeading
        center
        eyebrow={eyebrow}
        title={
          <>
            {titleText}{" "}
            <span className="text-gold-gradient">{accent}</span>
          </>
        }
        lead={lead}
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <a
            key={t.title}
            href={t.to}
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
          </a>
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

function PackagesPreview({ doc }: { doc: HomePageDoc | null }) {
  const p = doc?.packagesPreview;
  const items =
    p?.items && p.items.length > 0
      ? p.items.map((it, i) => ({
          name: it.name ?? packages[i % packages.length].name,
          price: it.price ?? "",
          tag: it.tag ?? "",
          highlighted: Boolean(it.highlighted),
          features: it.features ?? [],
        }))
      : packages;
  const eyebrow = p?.eyebrow ?? "Our Packages";
  const titleText = p?.title ?? "Transparent pricing.";
  const accent = p?.accent ?? "No surprises on site.";
  const lead =
    p?.lead ??
    "Every package includes design, materials, execution and a written warranty. Choose the finish level — we own the timeline.";
  return (
    <Section tone="navy">
      <SectionHeading
        center
        eyebrow={eyebrow}
        title={
          <>
            {titleText}{" "}
            <span className="text-gold-gradient">{accent}</span>
          </>
        }
        lead={lead}
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {items.map((p) => (
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

function TurnkeySection({ doc }: { doc: HomePageDoc | null }) {
  const t = doc?.turnkey;
  const eyebrow = t?.eyebrow ?? "End-to-End Home Construction";
  const titleText = t?.title ?? "From blueprints to";
  const accent = t?.accent ?? "the day you receive the keys.";
  const lead =
    t?.lead ??
    "One contract, one project lead, one warranty. We handle architecture, structural design, statutory approvals, MEP, civil, interiors, landscape and handover — sequenced so the site keeps moving and the budget doesn't.";
  const image = t?.imageUrl ?? heroVilla;
  const stepsList =
    t?.steps && t.steps.length > 0
      ? t.steps.map((s) => ({
          icon: iconFor(s.icon, Ruler),
          title: s.title ?? "",
          body: s.body ?? "",
        }))
      : [
          { icon: Ruler, title: "Design & Planning", body: "Site study, 3D concepts, working drawings and BOQ." },
          { icon: ShieldCheck, title: "Approvals", body: "BBMP, BDA, BWSSB, BESCOM — filed and tracked." },
          { icon: Hammer, title: "Civil & Structure", body: "RCC, masonry, plumbing, electrical, HVAC." },
          { icon: Sparkles, title: "Finishes & Handover", body: "Flooring, joinery, painting, snagging, keys." },
        ];
  return (
    <Section tone="marble">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-lg border-gold-hairline shadow-luxe">
          <img
            src={image}
            alt="RK Interiors turnkey home construction — contemporary villa in Bengaluru"
            loading="lazy"
            width={1920}
            height={1152}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={
              <>
                {titleText}{" "}
                <span className="text-gold-gradient">{accent}</span>
              </>
            }
            lead={lead}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {stepsList.map((s) => (
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

function Process({ doc }: { doc: HomePageDoc | null }) {
  const p = doc?.process;
  const eyebrow = p?.eyebrow ?? "Our Process";
  const titleText = p?.title ?? "A single, disciplined journey —";
  const accent = p?.accent ?? "from first sketch to final key.";
  const stepsList =
    p?.steps && p.steps.length > 0
      ? p.steps.map((s, i) => ({
          n: s.number ?? String(i + 1).padStart(2, "0"),
          title: s.title ?? "",
          body: s.body ?? "",
          icon: iconFor(s.icon, MessageCircle),
        }))
      : steps;
  return (
    <Section tone="navy">
      <SectionHeading
        center
        eyebrow={eyebrow}
        title={
          <>
            {titleText}{" "}
            <span className="text-gold-gradient">{accent}</span>
          </>
        }
      />
      <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stepsList.map((s) => (
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

function WhyUs({ doc }: { doc: HomePageDoc | null }) {
  const w = doc?.whyUs;
  const eyebrow = w?.eyebrow ?? "Why RK Interiors";
  const titleText = w?.title ?? "Four promises we";
  const accent = w?.accent ?? "stake our name on.";
  const items =
    w?.values && w.values.length > 0
      ? w.values.map((v) => ({
          title: v.title ?? "",
          body: v.body ?? "",
          icon: iconFor(v.icon, Layers),
        }))
      : values;
  return (
    <Section tone="marble">
      <SectionHeading
        eyebrow={eyebrow}
        title={
          <>
            {titleText}{" "}
            <span className="text-gold-gradient">{accent}</span>
          </>
        }
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((v) => (
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

const AREAS: Array<{ name: string; blurb: string }> = [
  { name: "Whitefield", blurb: "Multiple 4BHK and 5BHK villa interiors delivered in and around Whitefield — from modular kitchens to full turnkey builds." },
  { name: "Kanakapura Road", blurb: "Villa construction and interior design work completed for homeowners along Kanakapura Road, including a 5BHK ground-up build." },
  { name: "Bannerghatta Road", blurb: "Villa interiors along Bannerghatta Road — kitchens, wardrobes, ceilings and painting, coordinated over weekly site reviews." },
  { name: "Marathahalli", blurb: "Turnkey villa interior work in Marathahalli covering modular kitchens, wardrobes and full false ceiling with lighting." },
  { name: "KR Puram Road", blurb: "Villa construction on KR Puram Road, handled end-to-end from civil to interior handover." },
  { name: "Airport Road", blurb: "Modern villa interiors along Airport Road with open kitchens and marble-look living areas." },
  { name: "Devanahalli", blurb: "Contemporary villa projects near the airport — structural design, stone cladding and joinery delivered turnkey." },
  { name: "Magadi Road", blurb: "Family-friendly villa interiors along Magadi Road with durable finishes and practical modular kitchens." },
  { name: "Tumkur Road", blurb: "Villa construction on Tumkur Road with a focus on tight budget control and clean finishes." },
  { name: "Mysore Road", blurb: "Villa interior design along Mysore Road — kitchens, wardrobes, ceilings and painting under one contract." },
  { name: "Rajajinagar", blurb: "Commercial fit-outs in Rajajinagar including a jewellery showroom and a mobile showroom." },
  { name: "Jayanagar", blurb: "Jewellery and mobile showroom interior design in Jayanagar with premium lighting and display units." },
  { name: "Banashankari", blurb: "Complete jewellery showroom interior work in Banashankari — reception, seating, display and back office." },
];

function Areas() {
  return (
    <Section tone="marble">
      <SectionHeading
        center
        eyebrow="Areas We Work In"
        title={
          <>
            Interior designer and villa contractor{" "}
            <span className="text-gold-gradient">across Bangalore.</span>
          </>
        }
        lead="Vedu and the RK Interiors team have delivered real projects across Bengaluru and other parts of Karnataka. A few of the areas we work in most:"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {AREAS.map((a) => (
          <article key={a.name} className="rounded-lg border border-border bg-card p-6 hover-elevate">
            <h3 className="font-serif text-xl">{a.name}, Bengaluru</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.blurb}</p>
            <Link to="/portfolio" className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-gold">
              See projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}

const partners = [
  "Hettich", "Blum", "Häfele", "Kohler", "Jaquar", "Asian Paints",
  "Greenlam", "Merino", "Century Ply", "Saint-Gobain", "Philips", "Legrand",
];

function Partners({ doc }: { doc: HomePageDoc | null }) {
  const label = doc?.partners?.label ?? "Trusted Materials · Trusted Partners";
  const names =
    doc?.partners?.names && doc.partners.names.length > 0 ? doc.partners.names : partners;
  return (
    <section className="border-y border-white/10 bg-navy-deep py-14 text-marble">
      <p className="eyebrow text-center text-gold-gradient">{label}</p>
      <div className="mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee gap-14 px-8">
          {[...names, ...names].map((p, idx) => (
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

function CtaBand({ doc }: { doc: HomePageDoc | null }) {
  const c = doc?.ctaBand;
  const eyebrow = c?.eyebrow ?? "Ready when you are";
  const titleText = c?.title ?? "Let's design a home that";
  const accent = c?.accent ?? "feels unmistakably yours.";
  const lead =
    c?.lead ??
    "A 30-minute discovery call with Vedu — no obligation, no cost. Bring your floor plan or just an idea; we'll take it from there.";
  const primaryLabel = c?.primaryCtaLabel ?? "Book a call";
  const primaryHref = c?.primaryCtaHref ?? "/contact";
  const secondaryLabel = c?.secondaryCtaLabel ?? "Call Vedu";
  const secondaryHref = c?.secondaryCtaHref ?? "tel:+919538772060";
  return (
    <Section tone="marble" className="pt-24">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-navy p-10 text-marble shadow-luxe md:p-16">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              {titleText}{" "}
              <span className="text-gold-gradient">{accent}</span>
            </h2>
            <p className="mt-4 max-w-xl text-marble/75">
              {lead}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild size="lg" className="bg-gradient-gold text-navy-deep hover:opacity-90">
              <a href={primaryHref}>{primaryLabel}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold-hairline bg-transparent text-marble hover:bg-marble/10"
            >
              <a href={secondaryHref}>{secondaryLabel}</a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
