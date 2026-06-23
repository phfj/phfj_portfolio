# Post content type, blog pages & RSS

## What to build

Define the Post document type in Sanity, seed example Posts, build the blog
listing and detail pages, and generate an RSS feed. Posts reference Topics for
shared taxonomy filtering. The detail page shows the full Post body with rich
text rendering and a subscribe CTA at the bottom.

## Acceptance criteria

- [ ] Post document type defined in Sanity with all fields per ARCHITECTURE.md
- [ ] At least 2 Posts created in Sanity covering different Topics
- [ ] `/posts` renders a filterable listing (by Topic)
- [ ] `/posts/[slug]` renders the full Post with rich text body
- [ ] Subscribe CTA present at bottom of each Post
- [ ] `/feed.xml` renders valid RSS with all Posts
- [ ] `generateStaticParams` produces paths for all Posts
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `tracer-bullet` (needs Sanity client configured and Topic document type for references)
