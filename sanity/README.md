# Sanity content models

Two document schemas ship here for RK Interiors:

- `portfolioProject` — Title, Slug, Description, Main Image, Gallery, Video URL, Category, Location, Date Completed, SEO block.
- `blogPost` — Title, Slug, Author, Main Image, Published date, Excerpt, Portable Text body, Meta keywords.

## To connect

1. Ask Lovable to connect Sanity — the Sanity MCP connector installs the project ID and enables schema push.
2. Set two envs (Project Settings > Environment): `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET` (defaults to `production`).
3. Push the schemas from your Sanity Studio and add the site origin as a CORS origin in `sanity.io/manage`.

Until connected, the site renders bundled seed data — every page still works.