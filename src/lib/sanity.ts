import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity project ID and dataset are publishable — safe in client code.
const projectId = (import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined) ?? "qo2a2fhg";
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? "production";

export const sanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;
export function urlFor(source: unknown) {
  if (!builder) return "";
  return builder.image(source as never).auto("format").url();
}

export interface PortfolioProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  mainImage: string;
  gallery?: string[];
  videoUrl?: string;
  category: "Residential" | "Commercial" | "Kitchen" | "Office";
  location?: string;
  dateCompleted?: string;
}

const PORTFOLIO_QUERY = `*[_type == "portfolioProject"] | order(dateCompleted desc){
  _id, title, "slug": slug.current, description,
  "mainImage": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  videoUrl, category, location, dateCompleted
}`;

export async function fetchPortfolio(): Promise<PortfolioProject[] | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<PortfolioProject[]>(PORTFOLIO_QUERY);
  } catch (err) {
    console.warn("Sanity fetch failed, falling back to seed data.", err);
    return null;
  }
}

// ---------- Site Settings (global) ----------

export interface SiteSettings {
  brandName?: string;
  tagline?: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
    keywords?: string[];
  };
  analytics?: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    googleSiteVerification?: string;
    customHeadHtml?: string;
  };
}

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  brandName, tagline,
  "logoUrl": logo.asset->url,
  "faviconUrl": favicon.asset->url,
  primaryPhone, secondaryPhone, whatsappNumber, email, address,
  instagramUrl, facebookUrl,
  seo{ metaTitle, metaDescription, "ogImageUrl": ogImage.asset->url, keywords },
  analytics
}`;

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  if (!sanityClient) return null;
  try {
    return (await sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY)) ?? null;
  } catch (err) {
    console.warn("Sanity siteSettings fetch failed.", err);
    return null;
  }
}

// ---------- Home Page ----------

export interface HomeHeroSlide {
  eyebrow?: string;
  title?: string;
  accent?: string;
  lead?: string;
  imageUrl?: string;
  alt?: string;
}

export interface HomeExpertiseTile {
  title?: string;
  copy?: string;
  imageUrl?: string;
  linkHref?: string;
}

export interface HomePackage {
  name?: string;
  price?: string;
  tag?: string;
  highlighted?: boolean;
  features?: string[];
}

export interface HomeIconStep {
  icon?: string;
  title?: string;
  body?: string;
}

export interface HomeProcessStep {
  number?: string;
  title?: string;
  body?: string;
  icon?: string;
}

export interface HomePage {
  heroSlides?: HomeHeroSlide[];
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  videoBand?: {
    eyebrow?: string;
    title?: string;
    accent?: string;
    lead?: string;
    youtubeEmbedUrl?: string;
  };
  expertise?: {
    eyebrow?: string;
    title?: string;
    accent?: string;
    lead?: string;
    tiles?: HomeExpertiseTile[];
  };
  packagesPreview?: {
    eyebrow?: string;
    title?: string;
    accent?: string;
    lead?: string;
    items?: HomePackage[];
  };
  turnkey?: {
    eyebrow?: string;
    title?: string;
    accent?: string;
    lead?: string;
    imageUrl?: string;
    steps?: HomeIconStep[];
  };
  process?: {
    eyebrow?: string;
    title?: string;
    accent?: string;
    steps?: HomeProcessStep[];
  };
  whyUs?: {
    eyebrow?: string;
    title?: string;
    accent?: string;
    values?: HomeIconStep[];
  };
  partners?: {
    label?: string;
    names?: string[];
  };
  ctaBand?: {
    eyebrow?: string;
    title?: string;
    accent?: string;
    lead?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
  };
}

const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  heroSlides[]{ eyebrow, title, accent, lead, "imageUrl": image.asset->url, "alt": image.alt },
  heroPrimaryCtaLabel, heroPrimaryCtaHref, heroSecondaryCtaLabel, heroSecondaryCtaHref,
  videoBand,
  expertise{ eyebrow, title, accent, lead, tiles[]{ title, copy, "imageUrl": image.asset->url, linkHref } },
  packagesPreview{ eyebrow, title, accent, lead, items[]{ name, price, tag, highlighted, features } },
  turnkey{ eyebrow, title, accent, lead, "imageUrl": image.asset->url, steps },
  process,
  whyUs,
  partners,
  ctaBand,
  seo{ metaTitle, metaDescription, "ogImageUrl": ogImage.asset->url }
}`;

export async function fetchHomePage(): Promise<HomePage | null> {
  if (!sanityClient) return null;
  try {
    return (await sanityClient.fetch<HomePage | null>(HOME_PAGE_QUERY)) ?? null;
  } catch (err) {
    console.warn("Sanity homePage fetch failed.", err);
    return null;
  }
}