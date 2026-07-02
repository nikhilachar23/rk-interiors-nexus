# RK Interiors — Premium Website Build Plan

A full 9-page site for RK Interiors (Vedu) in the current Lovable stack (TanStack Start + Tailwind v4), styled around Midnight Navy + Metallic Gold + Marble, with Sanity-ready content models and complete on-page SEO.

## Stack reality check (important)

Your brief asks for Next.js + Vercel. This project already runs on Lovable's **TanStack Start** template (React 19, Vite, Tailwind v4, deployed on Lovable's edge — not Vercel). It gives you the same things you asked Next.js for: SSR, file-based routing, per-route metadata, dynamic sitemap, JSON-LD, image optimization patterns. I'll build on this stack rather than swap frameworks (a swap isn't supported here). Everything else — design, Sanity, SEO, content — lands as specified.

## Design system (built in `src/styles.css`)

- Tokens: `--navy` (deep midnight), `--navy-deep`, `--marble` (warm off-white), `--gold` / `--gold-soft` / `--gold-deep`, plus `--gradient-gold`, `--shadow-luxe`, `--shadow-gold-glow`.
- Typography: Serif display (Cormorant Garamond / Playfair) for H1–H3; geometric sans (Inter Tight) for body — loaded via `<link>` in `__root.tsx`.
- Custom utilities: `.text-gold-gradient`, `.border-gold-hairline`, `.marble-surface`, `.diamond-grid` (rotated-square image tiles), `.hover-elevate`.
- Shadcn variants extended: `Button` gets `luxe` and `outline-gold` variants; no ad-hoc color classes in components.

## Routes (file-based under `src/routes/`)

1. `/` Home — hero carousel, YouTube embed, expertise diamond grid, packages preview, end-to-end construction copy, process timeline, why-choose-us, partners marquee, CTA.
2. `/construction` — turnkey construction long-form.
3. `/interiors` — modular kitchens, wardrobes, lighting, fit-outs.
4. `/packages` — 3-tier matrix (Essential / Premium / Luxe) with feature checklists and quote CTA.
5. `/renovations` — before/after logic, residential + commercial.
6. `/portfolio` — Sanity-driven filterable grid (Residential / Commercial / Kitchen / Office). Falls back to seed data until Sanity is connected.
7. `/gallery` — masonry image grid + embedded walkthroughs, lazy loaded.
8. `/testimonials` — review wall with ratings + locations.
9. `/contact` — lead form (server function → email/DB later), Google Maps embed, WhatsApp deep links to +91 9538772060 & +91 7892656285.

Shared: sticky translucent nav with gold hairline, footer with sitemap + owner (Vedu) + contacts + social.

## Content

All copy written fresh — no lorem — targeting keywords like *interior designers in Bangalore*, *turnkey home construction*, *modular kitchen*, *villa construction*, *office interior fit-out*. Semantic H1/H2/H3, descriptive alt text on every image.

## Imagery

Generated with the image tool into `src/assets/`: hero carousel (3 shots), expertise tiles (4), process steps, portfolio seeds, gallery seeds, partner mono-marks. All alt text keyword-tuned.

## SEO

- Per-route `head()` with unique title, description, og:title/description/url, twitter card; leaf-only canonical + og:image.
- `LocalBusiness` JSON-LD in `__root.tsx` (name, phones, service types, area served).
- `Article` JSON-LD scaffold ready for blog posts.
- Dynamic `/sitemap.xml` server route enumerating all pages (+ Sanity portfolio slugs when connected).
- `public/robots.txt` allowing all.

## Sanity integration

Sanity requires the Sanity MCP connector for project ID + schema push. I'll:

- Install `@sanity/client` + `@sanity/image-url`.
- Add `src/lib/sanity.ts` client (project ID placeholder until MCP connect).
- Ship schema files in `sanity/schemas/`:
  - `portfolioProject`: title, slug, description, mainImage, gallery[], videoUrl, category, dateCompleted, seo{}.
  - `blogPost`: title, slug, author, mainImage, publishedAt, body (Portable Text), metaKeywords[], excerpt.
- Portfolio + (future) blog routes query Sanity via TanStack Query; graceful fallback to bundled seed data so the site is fully functional pre-connect.

When you're ready, say "connect Sanity" and I'll run the MCP connect flow, wire the real project ID, and add your preview URL to CORS.

## Deployment

Publish via Lovable's Publish button (top-right). If you truly need Vercel + GitHub CI/CD, that's a self-hosting path — say the word and I'll point you at the docs, but the Lovable-hosted flow gives you the same SSR/ISR characteristics with zero setup.

## Build order

1. Design tokens + fonts + shared layout (nav, footer, button variants).
2. Home page end-to-end with generated hero + tile imagery.
3. Remaining static pages (construction, interiors, packages, renovations, testimonials, contact).
4. Sanity client + seed-backed portfolio + gallery.
5. SEO: per-route heads, JSON-LD, sitemap route, robots.
6. Polish pass: responsive audit, hover states, motion.

Approve and I'll start building.
