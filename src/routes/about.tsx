import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Hammer, Sparkles } from "lucide-react";
import heroLiving from "@/assets/hero-living.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vedu — The Name Behind RK Interiors | Bengaluru" },
      {
        name: "description",
        content:
          "RK Interiors is run by Vedu (Vedhachar), a Bengaluru interior designer and turnkey construction contractor. Also known as Interiors by Vedu — trusted for work inside Sattva, Prestige, Godrej, Sobha and DX Max apartments, BDA homes, 4BHK/5BHK villas and commercial showrooms across Bangalore.",
      },
      { property: "og:title", content: "About Vedu — The Name Behind RK Interiors" },
      {
        property: "og:description",
        content:
          "Meet Vedu — interior designer and turnkey construction contractor behind RK Interiors (also known as Interiors by Vedu). 150+ homes and spaces delivered across Bengaluru.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <header className="navy-surface text-marble">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 lg:px-8">
          <p className="eyebrow text-gold-gradient">About</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl md:text-7xl">
            Meet Vedu — the name{" "}
            <span className="text-gold-gradient">behind RK Interiors.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-marble/80 md:text-lg">
            If you've heard of <span className="text-gold">Interiors by Vedu</span> —
            that's this team. Same person, same standard of work, now under RK Interiors.
          </p>
        </div>
      </header>

      <Section tone="marble">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-lg border-gold-hairline shadow-luxe">
            <img
              src={heroLiving}
              alt="Vedu — interior designer and turnkey construction contractor at RK Interiors, Bengaluru"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1600}
              height={1200}
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Who is Vedu?"
              title={
                <>
                  A Bengaluru contractor who has{" "}
                  <span className="text-gold-gradient">actually done the work.</span>
                </>
              }
            />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                RK Interiors is run by <strong className="text-foreground">Vedu (Vedhachar)</strong>,
                an interior designer and turnkey construction contractor based in Bengaluru.
                Over the years, Vedu has personally delivered interior and construction projects
                inside some of Bengaluru's most trusted builder addresses —{" "}
                <strong className="text-foreground">Sattva, Prestige, Godrej, Sobha, DX Max</strong>,
                and Government <strong className="text-foreground">BDA apartments</strong> — along
                with popular commercial spaces like <strong className="text-foreground">Just Bake</strong>{" "}
                outlets, jewellery showrooms and mobile showrooms across Rajajinagar, Jayanagar
                and Banashankari.
              </p>
              <p>
                He's also built and designed <strong className="text-foreground">4BHK and 5BHK
                villas</strong> across Whitefield, Kanakapura Road, Bannerghatta Road,
                Marathahalli, KR Puram Road, Airport Road, Devanahalli, Magadi Road, Tumkur Road
                and Mysore Road — and taken on projects in other parts of Karnataka too.
              </p>
              <p>
                The way of working is simple: honest quotes, weekly site reviews, and finishes
                that hold up years after the keys are handed over.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat n="150+" label="Homes & spaces delivered" />
              <Stat n="10+" label="Years on Bengaluru sites" />
              <Stat n="1" label="Accountable project lead" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-gold text-navy-deep hover:opacity-90">
                <Link to="/portfolio">See Vedu's work <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Talk to Vedu</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="navy">
        <SectionHeading
          center
          eyebrow="How Vedu works"
          title={<>Three things we <span className="text-gold-gradient">stand by.</span></>}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Value icon={ShieldCheck} title="Honest quotes" body="Line-item BOQs, real material rates, no last-minute surprises on site." />
          <Value icon={Hammer} title="On-site accountability" body="Vedu leads every project personally — weekly reviews, direct WhatsApp updates." />
          <Value icon={Sparkles} title="Finishes that last" body="710-grade ply, edge-banded joinery, and a written warranty on the handover." />
        </div>
      </Section>
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="font-serif text-3xl text-gold-gradient">{n}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

function Value({ icon: Icon, title, body }: { icon: typeof ShieldCheck; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-7 text-marble">
      <span className="grid h-12 w-12 place-items-center rounded-md bg-gradient-gold text-navy-deep">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 font-serif text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-marble/70">{body}</p>
    </div>
  );
}
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/about"!</div>
}
