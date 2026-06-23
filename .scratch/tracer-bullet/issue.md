# Tracer bullet: Sanity setup + Topic page

## What to build

Wire the full data pipeline end-to-end: create a Sanity project, configure the
next-sanity client in Next.js, define a Topic content type, seed one real Topic,
and render it on a `/topics/[slug]` page. This is the thinnest vertical slice
through every layer — it proves Sanity connectivity, schema authoring, build-time
data fetching, and static page generation all work before building the rest.

## Acceptance criteria

- [ ] Sanity project created with Topic document type
- [ ] `next-sanity` installed and configured with project ID and dataset
- [ ] GROQ query fetches all Topics at build time
- [ ] `generateStaticParams` produces a static path for each Topic slug
- [ ] `/topics/[slug]` renders the Topic name
- [ ] `npm run build` succeeds (static export compatible)
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
