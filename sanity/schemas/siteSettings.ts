import { defineField, defineType } from "sanity";

// Singleton — only one Site Settings document should ever exist.
// The Studio desk structure should pin this to a single non-creatable entry
// (see sanity/README.md for the structure builder snippet).
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "brandName", title: "Brand Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    defineField({ name: "primaryPhone", title: "Primary Phone", type: "string" }),
    defineField({ name: "secondaryPhone", title: "Secondary Phone", type: "string" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
        defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3 }),
        defineField({ name: "ogImage", title: "OG Image", type: "image" }),
        defineField({ name: "keywords", title: "Keywords", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({
      name: "analytics",
      title: "Analytics",
      type: "object",
      fields: [
        defineField({ name: "googleAnalyticsId", title: "Google Analytics ID", type: "string" }),
        defineField({ name: "googleTagManagerId", title: "Google Tag Manager ID", type: "string" }),
        defineField({ name: "googleSiteVerification", title: "Google Site Verification", type: "string" }),
        defineField({ name: "customHeadHtml", title: "Custom Head HTML/Script", type: "text", rows: 4 }),
      ],
    }),
  ],
  preview: {
    select: { title: "brandName" },
    prepare: ({ title }) => ({ title: title || "Site Settings" }),
  },
});
