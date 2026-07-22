# Sanity content models

Four document schemas ship here for RK Interiors:

- `portfolioProject` — Title, Slug, Description, Main Image, Gallery, Video URL, Category, Location, Date Completed, SEO block.
- `blogPost` — Title, Slug, Author, Main Image, Published date, Excerpt, Portable Text body, Meta keywords. Not currently fetched by any route — schema exists but is unused in the app.
- `siteSettings` — brand name, contact details, social links, default SEO, analytics IDs. **Singleton** (one document only). Was previously queried by the app but had no schema, so it couldn't be edited in Studio — that's why brand name showed stale/placeholder data on the live site.
- `homePage` — hero slides, video band, expertise tiles, packages preview, turnkey steps, process steps, why-us values, partners band, CTA band, SEO. **Singleton** (one document only). Same gap as `siteSettings` — queried by the homepage but had no schema until now.

## Singleton setup (siteSettings, homePage)

By default Studio lets you create multiple documents of any type, which is wrong for these two. Pin each to a single, non-deletable entry via a custom desk structure (`sanity/deskStructure.ts` or wherever your Studio config lives):

```ts
import { CogIcon, HomeIcon } from "@sanity/icons";

export const singletonTypes = new Set(["siteSettings", "homePage"]);

// In your structure builder:
S.listItem()
  .title("Site Settings")
  .icon(CogIcon)
  .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
S.listItem()
  .title("Home Page")
  .icon(HomeIcon)
  .child(S.document().schemaType("homePage").documentId("homePage")),
```

And filter them out of the default document list so editors can't accidentally create duplicates. If a `siteSettings` or `homePage` document doesn't exist yet in the dataset, create the first one manually in Studio using the document ID `siteSettings` / `homePage` respectively — that keeps the singleton pattern consistent (Studio needs the ID to match what the structure above expects, or you'll end up with two documents of the same type).

## To connect / deploy schema changes

1. Ask Lovable to connect Sanity — the Sanity MCP connector installs the project ID and enables schema push.
2. Set two envs (Project Settings > Environment): `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET` (defaults to `production`).
3. **The hosted Studio (rk-interiors.sanity.studio) does not auto-update from this repo.** After editing files in `sanity/schemas/`, you need to run `sanity deploy` (or have Lovable's Sanity integration push it) from wherever the Studio project config lives, so the new `siteSettings` and `homePage` document types actually appear as editable forms at rk-interiors.sanity.studio.
4. Add the site origin as a CORS origin in `sanity.io/manage`.

Until connected, the site renders bundled seed data — every page still works.