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