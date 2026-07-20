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
  // ---------- Apartments (Builder Projects) ----------
  { _id: "ap-01", title: "3 BHK Interiors — Sattva Apartment, Bengaluru", slug: "sattva-3bhk-interiors",
    description: "Full turnkey interior work for a 3 BHK inside a Sattva apartment tower — modular kitchen, wardrobes, TV unit, false ceiling and painting, delivered on schedule.",
    mainImage: hero, category: "Apartments", location: "Sattva Apartment, Bengaluru", dateCompleted: "2026-03-12" },
  { _id: "ap-02", title: "Apartment Interiors — Prestige, Bengaluru", slug: "prestige-apartment-interiors",
    description: "Home interiors for a Prestige apartment — handleless modular kitchen, walk-in wardrobes and complete living room design in navy and marble tones.",
    mainImage: bedroom, category: "Apartments", location: "Prestige Apartment, Bengaluru", dateCompleted: "2026-01-20" },
  { _id: "ap-03", title: "Home Interiors — Godrej Apartment, Bengaluru", slug: "godrej-apartment-interiors",
    description: "3 BHK Godrej apartment interior design — kitchen, wardrobes, crockery unit, foyer console and full ceiling and lighting work.",
    mainImage: kitchen, category: "Apartments", location: "Godrej Apartment, Bengaluru", dateCompleted: "2025-12-05" },
  { _id: "ap-04", title: "Interior Design — Sobha Apartment, Bengaluru", slug: "sobha-apartment-interior-design",
    description: "Sobha apartment interiors — quiet-luxury living room, master bedroom panelling and modular kitchen with soft-close hardware.",
    mainImage: dining, category: "Apartments", location: "Sobha Apartment, Bengaluru", dateCompleted: "2025-10-18" },
  { _id: "ap-05", title: "Turnkey Interiors — DX Max Apartment, Bengaluru", slug: "dx-max-turnkey-interiors",
    description: "Complete turnkey handover for a DX Max apartment — design, joinery, painting, false ceiling and civil corrections under one contract.",
    mainImage: wardrobe, category: "Apartments", location: "DX Max Apartment, Bengaluru", dateCompleted: "2025-08-22" },
  { _id: "ap-06", title: "BDA Apartment Interior Work, Bengaluru", slug: "bda-apartment-interior-work",
    description: "Government BDA apartment interior work — practical modular kitchen, wardrobes and living room refresh built to a clear budget.",
    mainImage: office, category: "Apartments", location: "BDA Apartment, Bengaluru", dateCompleted: "2025-06-14" },

  // ---------- Villas ----------
  { _id: "v-01", title: "4BHK Villa Interiors — Whitefield, Bengaluru", slug: "4bhk-villa-interiors-whitefield",
    description: "Complete turnkey interior work for a 4BHK villa in Whitefield — modular kitchen, false ceiling, wardrobes and full living room design, delivered on schedule.",
    mainImage: hero, category: "Villas", location: "Whitefield, Bengaluru", dateCompleted: "2026-05-02" },
  { _id: "v-02", title: "5BHK Villa Construction & Interiors — Kanakapura Road", slug: "5bhk-villa-kanakapura-road",
    description: "Ground-up 5BHK villa construction along Kanakapura Road, with structural work, MEP and full interior fit-out handled end-to-end.",
    mainImage: villa, category: "Villas", location: "Kanakapura Road, Bengaluru", dateCompleted: "2026-02-28" },
  { _id: "v-03", title: "Villa Interior Design — Bannerghatta Road", slug: "villa-interior-bannerghatta-road",
    description: "Villa interiors along Bannerghatta Road — kitchen, wardrobes, ceiling and painting, coordinated with the homeowner over weekly site reviews.",
    mainImage: bedroom, category: "Villas", location: "Bannerghatta Road, Bengaluru", dateCompleted: "2025-11-10" },
  { _id: "v-04", title: "Villa Interiors — Marathahalli, Bengaluru", slug: "villa-interiors-marathahalli",
    description: "Turnkey villa interior work in Marathahalli — modular kitchen, TV unit, wardrobes and complete false ceiling with lighting.",
    mainImage: dining, category: "Villas", location: "Marathahalli, Bengaluru", dateCompleted: "2025-09-30" },
  { _id: "v-05", title: "Villa Construction — KR Puram Road, Bengaluru", slug: "villa-construction-kr-puram",
    description: "Villa construction on KR Puram Road, including civil, plumbing, electrical and interior handover.",
    mainImage: villa, category: "Villas", location: "KR Puram Road, Bengaluru", dateCompleted: "2025-08-05" },
  { _id: "v-06", title: "Villa Interiors — Airport Road, Bengaluru", slug: "villa-interiors-airport-road",
    description: "Modern villa interiors along Airport Road — open kitchen, wardrobes and a marble-look living area with hidden LED lighting.",
    mainImage: hero, category: "Villas", location: "Airport Road, Bengaluru", dateCompleted: "2025-07-01" },
  { _id: "v-07", title: "Villa Project — Devanahalli, Bengaluru", slug: "villa-project-devanahalli",
    description: "Contemporary villa project in Devanahalli — structural design, stone cladding, joinery and landscape lighting handled turnkey.",
    mainImage: villa, category: "Villas", location: "Devanahalli, Bengaluru", dateCompleted: "2025-05-18" },
  { _id: "v-08", title: "Villa Interiors — Magadi Road, Bengaluru", slug: "villa-interiors-magadi-road",
    description: "Villa interiors along Magadi Road — practical, family-friendly layout with durable finishes and a full modular kitchen.",
    mainImage: bedroom, category: "Villas", location: "Magadi Road, Bengaluru", dateCompleted: "2025-04-22" },
  { _id: "v-09", title: "Villa Construction — Tumkur Road, Bengaluru", slug: "villa-construction-tumkur-road",
    description: "Villa construction on Tumkur Road, with a focus on tight budget control, timely handover and clean finishes.",
    mainImage: villa, category: "Villas", location: "Tumkur Road, Bengaluru", dateCompleted: "2025-03-15" },
  { _id: "v-10", title: "Villa Interiors — Mysore Road, Bengaluru", slug: "villa-interiors-mysore-road",
    description: "Villa interior design along Mysore Road — kitchen, wardrobes, false ceiling and painting delivered under one contract.",
    mainImage: dining, category: "Villas", location: "Mysore Road, Bengaluru", dateCompleted: "2025-02-08" },

  // ---------- Commercial & Retail ----------
  { _id: "c-01", title: "Just Bake Outlet Interiors — Bengaluru", slug: "just-bake-outlet-interiors",
    description: "Retail interior fit-out for a Just Bake outlet in Bengaluru — display counters, seating, branded ceiling and lighting.",
    mainImage: retail, category: "Commercial", location: "Bengaluru", dateCompleted: "2026-04-01" },
  { _id: "c-02", title: "Jewellery Showroom Interior Design — Rajajinagar", slug: "jewellery-showroom-rajajinagar",
    description: "Jewellery showroom interior design in Rajajinagar — display units with lockable glass, premium lighting and reception zone.",
    mainImage: retail, category: "Commercial", location: "Rajajinagar, Bengaluru", dateCompleted: "2025-12-18" },
  { _id: "c-03", title: "Jewellery Showroom Interior Design — Jayanagar", slug: "jewellery-showroom-jayanagar",
    description: "Jewellery showroom fit-out in Jayanagar with warm-teak millwork, spotlight-grade lighting and secure display cases.",
    mainImage: dining, category: "Commercial", location: "Jayanagar, Bengaluru", dateCompleted: "2025-10-05" },
  { _id: "c-04", title: "Jewellery Showroom Interior Design — Banashankari", slug: "jewellery-showroom-banashankari",
    description: "Complete jewellery showroom interior work in Banashankari — reception, seating, display and back office.",
    mainImage: retail, category: "Commercial", location: "Banashankari, Bengaluru", dateCompleted: "2025-07-20" },
  { _id: "c-05", title: "Mobile Showroom Interior Design — Jayanagar", slug: "mobile-showroom-jayanagar",
    description: "Mobile showroom interior fit-out in Jayanagar — branded wall units, cash counter and clean product display.",
    mainImage: office, category: "Commercial", location: "Jayanagar, Bengaluru", dateCompleted: "2025-05-11" },
  { _id: "c-06", title: "Mobile Showroom Interior Design — Rajajinagar", slug: "mobile-showroom-rajajinagar",
    description: "Mobile showroom interior design in Rajajinagar with a bright, product-first layout and easy-clean flooring.",
    mainImage: office, category: "Commercial", location: "Rajajinagar, Bengaluru", dateCompleted: "2025-03-04" },

  // ---------- Kitchens ----------
  { _id: "k-01", title: "Handleless Modular Kitchen — Sarjapur Road, Bengaluru", slug: "modular-kitchen-sarjapur-road",
    description: "Matte-navy handleless modular kitchen on Sarjapur Road with a quartz waterfall island, tall units and integrated appliances.",
    mainImage: kitchen, category: "Kitchens", location: "Sarjapur Road, Bengaluru", dateCompleted: "2026-02-22" },
  { _id: "k-02", title: "Modular Kitchen — 3 BHK Apartment, Whitefield", slug: "modular-kitchen-whitefield-3bhk",
    description: "Practical 3 BHK apartment modular kitchen in Whitefield — 710-grade ply carcass, soft-close hardware and warm laminate finish.",
    mainImage: kitchen, category: "Kitchens", location: "Whitefield, Bengaluru", dateCompleted: "2025-11-25" },
  { _id: "k-03", title: "Modular Kitchen — Villa, Kanakapura Road", slug: "modular-kitchen-villa-kanakapura",
    description: "Large villa modular kitchen along Kanakapura Road with tall pantry units, breakfast counter and quartz worktop.",
    mainImage: kitchen, category: "Kitchens", location: "Kanakapura Road, Bengaluru", dateCompleted: "2025-08-15" },
  { _id: "k-04", title: "Compact Modular Kitchen — 2 BHK Apartment, Bengaluru", slug: "modular-kitchen-2bhk-bengaluru",
    description: "Space-saving 2 BHK apartment modular kitchen — L-shape layout, wall cabinets and integrated chimney and hob.",
    mainImage: kitchen, category: "Kitchens", location: "Bengaluru", dateCompleted: "2025-06-02" },
];