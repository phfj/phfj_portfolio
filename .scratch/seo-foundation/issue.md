# SEO Foundation

## What to build

Add the missing SEO fundamentals across all routes: Open Graph and Twitter card
metadata for social sharing previews, a `sitemap.xml` route for search engine
discovery, a `robots.txt`, JSON-LD structured data (Article, Person, WebSite,
BreadcrumbList schemas), and canonical URL support.

## Acceptance criteria

- [ ] `openGraph` and `twitter` metadata added to every `generateMetadata`/`metadata` export (root layout defaults, post detail, project detail, topic detail, about, home)
- [ ] OG image uses post/project `coverImage` or site-wide fallback
- [ ] `sitemap.ts` route generates valid sitemap with all static routes, posts, projects, and topics
- [ ] `robots.ts` route generates valid robots.txt pointing to sitemap
- [ ] JSON-LD `WebSite` schema in root layout
- [ ] JSON-LD `Person` schema on About page
- [ ] JSON-LD `Article` schema on post detail pages
- [ ] JSON-LD `BreadcrumbList` schema on detail pages
- [ ] Canonical URLs set in metadata (via `metadataBase` or `alternates.canonical`)
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
