import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/section";
import living from "@/assets/hero-living.jpg";
import kitchen from "@/assets/hero-kitchen.jpg";
import villa from "@/assets/hero-villa.jpg";
import bedroom from "@/assets/expertise-bedroom.jpg";
import office from "@/assets/expertise-office.jpg";
import wardrobe from "@/assets/expertise-wardrobe.jpg";
import dining from "@/assets/gallery-dining.jpg";
import bath from "@/assets/gallery-bath.jpg";
import retail from "@/assets/gallery-retail.jpg";
import { rkPageHead } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => rkPageHead(
    "/gallery",
    "Gallery — Interior & Construction Projects | RK Interiors",
    "Explore RK Interiors projects across Bengaluru, including homes, modular kitchens, wardrobes, bathrooms, villas and workspaces.",
  ),
  component: GalleryPage,
});

const images = [
  { src: living, alt: "Luxury living room with navy walls, marble floors and gold accents — RK Interiors", w: 1920, h: 1152, span: "lg:col-span-2 lg:row-span-2" },
  { src: kitchen, alt: "Handleless modular kitchen with waterfall Calacatta island — RK Interiors", w: 1920, h: 1152, span: "" },
  { src: bedroom, alt: "Master bedroom with upholstered headboard and brass sconces — RK Interiors", w: 1200, h: 1200, span: "" },
  { src: wardrobe, alt: "Walk-in wardrobe with backlit glass shelving and marble island — RK Interiors", w: 1200, h: 1200, span: "" },
  { src: dining, alt: "Formal dining room with marble table and brass drum pendant — RK Interiors", w: 1400, h: 1000, span: "lg:col-span-2" },
  { src: bath, alt: "Marble spa bathroom with freestanding tub and brass fittings — RK Interiors", w: 1000, h: 1400, span: "lg:row-span-2" },
  { src: office, alt: "Executive office fit-out with walnut panelling and framed-glass cabins — RK Interiors", w: 1200, h: 1200, span: "" },
  { src: retail, alt: "Boutique retail interior with teak millwork and marble reception — RK Interiors", w: 1400, h: 1000, span: "" },
  { src: villa, alt: "Contemporary villa exterior at dusk — RK Interiors construction", w: 1920, h: 1152, span: "lg:col-span-2" },
];

function GalleryPage() {
  return (
    <>
      <header className="navy-surface text-marble">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 lg:px-8 animate-fade-in">
          <p className="eyebrow text-gold-gradient">Gallery</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl">
            Projects, up close — <span className="text-gold-gradient">and unfiltered.</span>
          </h1>
        </div>
      </header>

      <Section tone="marble">
        <div className="grid auto-rows-[240px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((im, i) => (
            <figure key={i} className={`hover-elevate relative overflow-hidden rounded-lg border-gold-hairline ${im.span}`}>
              <img src={im.src} alt={im.alt} loading="lazy" width={im.w} height={im.h} className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {[
            { src: "https://www.youtube-nocookie.com/embed/6stlCkUDG_s?rel=0", title: "Handover walkthrough — Whitefield duplex" },
            { src: "https://www.youtube-nocookie.com/embed/wKJ9KzGQq0w?rel=0", title: "Modular kitchen build — Sarjapur" },
          ].map((v) => (
            <div key={v.title} className="relative aspect-video overflow-hidden rounded-lg border-gold-hairline shadow-luxe">
              <iframe src={v.src} title={v.title} loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}