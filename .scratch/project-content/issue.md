# Project content type & portfolio pages

## What to build

Define the Project document type in Sanity, seed one example Project per Category
(Software, OSS, Talk, Writing), and build the portfolio listing and detail pages.
Projects reference Topics for shared taxonomy filtering. The listing page
supports filtering by Category and Topic. The detail page shows all Project
fields including Tech Stack, What I Learned, related Posts, and external links.

## Acceptance criteria

- [ ] Project document type defined in Sanity with all fields per ARCHITECTURE.md
- [ ] At least one Project created per Category in Sanity
- [ ] `/projects` renders a filterable listing (by Category, by Topic)
- [ ] `/projects/[slug]` renders the full Project detail (all fields)
- [ ] Project cards link to detail page
- [ ] `generateStaticParams` produces paths for all Projects
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `tracer-bullet` (needs Sanity client configured and Topic document type for references)
