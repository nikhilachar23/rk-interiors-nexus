import { defineField, defineType } from "sanity";

// Singleton — only one Home Page document should ever exist.
// See sanity/README.md for the structure builder snippet that pins this.
export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      of: [
        {
          type: "object",
          name: "heroSlide",
          fields: [
            defineField({ name: "eyebrow", type: "string" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "accent", type: "string" }),
            defineField({ name: "lead", type: "text", rows: 2 }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string" }],
            }),
          ],
        },
      ],
    }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Hero Primary CTA Label", type: "string" }),
    defineField({ name: "heroPrimaryCtaHref", title: "Hero Primary CTA Link", type: "string" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Hero Secondary CTA Label", type: "string" }),
    defineField({ name: "heroSecondaryCtaHref", title: "Hero Secondary CTA Link", type: "string" }),

    defineField({
      name: "videoBand",
      title: "Video Band",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "accent", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 2 }),
        defineField({ name: "youtubeEmbedUrl", type: "url" }),
      ],
    }),

    defineField({
      name: "expertise",
      title: "Expertise Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "accent", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 2 }),
        defineField({
          name: "tiles",
          title: "Expertise Tiles",
          type: "array",
          of: [
            {
              type: "object",
              name: "expertiseTile",
              fields: [
                defineField({ name: "title", type: "string" }),
                defineField({ name: "copy", type: "text", rows: 2 }),
                defineField({ name: "image", type: "image", options: { hotspot: true } }),
                defineField({ name: "linkHref", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "packagesPreview",
      title: "Packages Preview",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "accent", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 2 }),
        defineField({
          name: "items",
          title: "Packages",
          type: "array",
          of: [
            {
              type: "object",
              name: "packageItem",
              fields: [
                defineField({ name: "name", type: "string" }),
                defineField({ name: "price", type: "string" }),
                defineField({ name: "tag", type: "string" }),
                defineField({ name: "highlighted", type: "boolean" }),
                defineField({ name: "features", type: "array", of: [{ type: "string" }] }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "turnkey",
      title: "Turnkey Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "accent", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 2 }),
        defineField({ name: "image", type: "image", options: { hotspot: true } }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              type: "object",
              name: "iconStep",
              fields: [
                defineField({ name: "icon", type: "string" }),
                defineField({ name: "title", type: "string" }),
                defineField({ name: "body", type: "text", rows: 2 }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "process",
      title: "Process Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "accent", type: "string" }),
        defineField({
          name: "steps",
          title: "Process Steps",
          type: "array",
          of: [
            {
              type: "object",
              name: "processStep",
              fields: [
                defineField({ name: "number", type: "string" }),
                defineField({ name: "title", type: "string" }),
                defineField({ name: "body", type: "text", rows: 2 }),
                defineField({ name: "icon", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "whyUs",
      title: "Why Us Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "accent", type: "string" }),
        defineField({
          name: "values",
          title: "Values",
          type: "array",
          of: [
            {
              type: "object",
              name: "iconStep",
              fields: [
                defineField({ name: "icon", type: "string" }),
                defineField({ name: "title", type: "string" }),
                defineField({ name: "body", type: "text", rows: 2 }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "partners",
      title: "Partners / Builders Band",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "names", title: "Partner Names", type: "array", of: [{ type: "string" }] }),
      ],
    }),

    defineField({
      name: "ctaBand",
      title: "CTA Band",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "accent", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 2 }),
        defineField({ name: "primaryCtaLabel", type: "string" }),
        defineField({ name: "primaryCtaHref", type: "string" }),
        defineField({ name: "secondaryCtaLabel", type: "string" }),
        defineField({ name: "secondaryCtaHref", type: "string" }),
      ],
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", type: "string" }),
        defineField({ name: "metaDescription", type: "text", rows: 3 }),
        defineField({ name: "ogImage", type: "image" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
