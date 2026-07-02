import type { PortfolioProject } from "@/lib/sanity";
import hero from "@/assets/hero-living.jpg";
import kitchen from "@/assets/hero-kitchen.jpg";
import villa from "@/assets/hero-villa.jpg";
import bedroom from "@/assets/expertise-bedroom.jpg";
import office from "@/assets/expertise-office.jpg";
import wardrobe from "@/assets/expertise-wardrobe.jpg";
import dining from "@/assets/gallery-dining.jpg";
import bath from "@/assets/gallery-bath.jpg";
import retail from "@/assets/gallery-retail.jpg";

export const portfolioSeed: PortfolioProject[] = [
  { _id: "p-01", title: "The Velvet Sanctuary — 4BHK Duplex", slug: "velvet-sanctuary-duplex",
    description: "A layered navy-and-brass duplex in Whitefield with a marble-clad living core, custom joinery and a floating oak staircase.",
    mainImage: hero, category: "Residential", location: "Whitefield, Bengaluru", dateCompleted: "2026-04-10" },
  { _id: "p-02", title: "Calacatta Cook — Handleless Modular Kitchen", slug: "calacatta-cook-kitchen",
    description: "A matte-navy handleless kitchen with a Calacatta waterfall island, integrated appliances and warm oak tall units.",
    mainImage: kitchen, category: "Kitchen", location: "Sarjapur Road, Bengaluru", dateCompleted: "2026-02-22" },
  { _id: "p-03", title: "Ashwood Villa — Turnkey Construction", slug: "ashwood-villa-construction",
    description: "Ground-up construction of a contemporary villa with double-height glazing, warm stone cladding and landscape lighting.",
    mainImage: villa, category: "Residential", location: "Devanahalli, Bengaluru", dateCompleted: "2026-05-30" },
  { _id: "p-04", title: "Ledger & Loam — Boutique Retail Fit-out", slug: "ledger-loam-retail",
    description: "Warm-teak millwork and a Calacatta reception island for a premium multi-brand boutique in Indiranagar.",
    mainImage: retail, category: "Commercial", location: "Indiranagar, Bengaluru", dateCompleted: "2026-01-14" },
  { _id: "p-05", title: "Meridian Suite — Master Bedroom", slug: "meridian-master-bedroom",
    description: "A cocooned master retreat with a full-height upholstered headboard, walnut wood panelling and brass sconces.",
    mainImage: bedroom, category: "Residential", location: "Koramangala, Bengaluru", dateCompleted: "2025-11-18" },
  { _id: "p-06", title: "North & Nine — Corporate Office", slug: "north-nine-office",
    description: "A quiet-luxury office fit-out with framed-glass cabins, walnut paneling and acoustic ceiling detailing.",
    mainImage: office, category: "Office", location: "HSR Layout, Bengaluru", dateCompleted: "2025-10-04" },
  { _id: "p-07", title: "Atelier Closet — Walk-in Wardrobe", slug: "atelier-walk-in-wardrobe",
    description: "A dressing-room layout with backlit glass shelving, marble island and integrated jewellery drawers.",
    mainImage: wardrobe, category: "Residential", location: "Hebbal, Bengaluru", dateCompleted: "2025-09-02" },
  { _id: "p-08", title: "Onyx Dining — Formal Dining Room", slug: "onyx-formal-dining",
    description: "Deep-charcoal panelled dining room with a marble slab table under a hand-spun brass drum pendant.",
    mainImage: dining, category: "Residential", location: "Jayanagar, Bengaluru", dateCompleted: "2025-08-11" },
  { _id: "p-09", title: "Marble Rituals — Spa Bathroom", slug: "marble-rituals-bathroom",
    description: "Book-matched marble bath suite with backlit mirror, brass fittings and a freestanding soaker tub.",
    mainImage: bath, category: "Residential", location: "Yelahanka, Bengaluru", dateCompleted: "2025-07-04" },
];