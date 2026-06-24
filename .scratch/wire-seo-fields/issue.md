# Wire Sanity SEO Fields into Metadata

## What to build

The Sanity schemas for both Post and Project define `seo` fields (`metaTitle`,
`metaDescription`, `socialImage`) but `generateMetadata` ignores them entirely.
Wire these fields into the metadata generation so content editors can control
how each page appears in search results and social shares.

Additionally, ensure dynamic detail pages populate `description` from the
content summary when no custom SEO description is set.

## Acceptance criteria

- [ ] Post `generateMetadata` reads `post.seo?.metaTitle` for title override, `post.seo?.metaDescription` for description, `post.seo?.socialImage` for OG image
- [ ] Project `generateMetadata` reads `project.seo?.metaTitle`, `project.seo?.metaDescription`, `project.seo?.socialImage`
- [ ] Falls back to `post.summary` / `project.summary` when no SEO description exists
- [ ] Falls back to `post.coverImage` / `project.coverImage` when no SEO social image exists
- [ ] Title template still applies when metaTitle is set
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately. Consider doing after `seo-foundation` so the
OpenGraph and Twitter metadata structures are already in place to receive these
values.
