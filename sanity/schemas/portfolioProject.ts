import { defineField, defineType } from "sanity";

export const portfolioProject = defineType({
  name: "portfolioProject",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "mainImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] }),
    defineField({ name: "gallery", type: "array", of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] }] }),
    defineField({ name: "videoUrl", type: "url" }),
    defineField({ name: "category", type: "string", options: { list: ["Residential", "Commercial", "Kitchen", "Office"], layout: "radio" } }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "dateCompleted", type: "date" }),
    defineField({ name: "seo", type: "object", fields: [
      { name: "metaTitle", type: "string" },
      { name: "metaDescription", type: "text", rows: 3 },
      { name: "keywords", type: "array", of: [{ type: "string" }] },
    ] }),
  ],
});