# Issues

## Dependency graph

### Original build issues (complete)

```
001-tracer-bullet ──┬── 002-project-content ──┬── 005-homepage
                    │                         │
                    ├── 003-blog-content ─────┘
                    │
                    ├── 006-site-shell ──┬── 007-subscribe-form
                    │                   └── 008-deploy-cloudflare
004-about ──────────┘
```

### Audit backlog — Immediate

```
009-seo-foundation ──────┐
010-wire-seo-fields ─────┤
011-a11y-foundation ─────┤
012-shared-components ────┼── 023-contact-form
013-fix-topic-pages ─────┤      └── 024-about-redesign
                         │
(all parallel) ──────────┘
```

### Audit backlog — Short-term

```
014-code-syntax-highlight┐
015-loading-error-states ┤
016-pagination ──────────┼── 018-project-filtering
017-image-optimization ──┤
019-search ──────────────┤
020-test-coverage ───────┤ (after 012-shared-components)
021-github-api ──────────┤
022-reading-progress-bar ┤
023-contact-form ────────┤ (after 012-shared-components)
024-about-redesign ──────┘ (after 012-shared-components, 023-contact-form)
```

### Audit backlog — Medium-term

```
025-table-of-contents ───┐
026-project-card-images ─┤ (after 012-shared-components, 017-image-optimization)
027-view-counter ────────┤
028-interactive-demo ────┘
```

### Audit backlog — Nice-to-have

```
029-project-polish ──────┐
030-social-share ────────┤
031-newsletter-archive ──┤
032-interactive-resume ──┤ (after 024-about-redesign)
033-react-optimizations ─┤ (after 012-shared-components)
034-misc-polish ─────────┘
```

### Portfolio UI Refinement (complete ✓)

```
035-ui-tokens ──┬── 036-ui-header
                ├── 037-ui-hero
                └── 038-ui-cards

039-ui-projects-intro
```

## Issue list

### Original build (complete ✓)

| # | Slug | Description | Blocked by |
|---|---|---|---|
| 1 | `tracer-bullet` | Sanity setup + Topic schema + `/topics/[slug]` page | None |
| 2 | `project-content` | Project schema + `/projects` + `/projects/[slug]` | 1 |
| 3 | `blog-content` | Post schema + `/posts` + `/posts/[slug]` + `/feed.xml` | 1 |
| 4 | `about` | Static `/about` page | None |
| 5 | `homepage` | Hero, featured Projects, latest Posts, subscribe CTA | 2, 3 |
| 6 | `site-shell` | Global header, footer, navigation, responsive layout | 1, 2, 3, 4 |
| 7 | `subscribe-form` | Cloudflare Worker proxy to Buttondown, form UI | 6 |
| 8 | `deploy-cloudflare` | Static export config, Cloudflare Pages, webhook | 6 |

### Audit backlog — Immediate

| # | Slug | Description | Blocked by |
|---|---|---|---|
| 9 | `seo-foundation` | OG/Twitter cards, sitemap, robots.txt, JSON-LD, canonical URLs | None |
| 10 | `wire-seo-fields` | Consume Sanity SEO fields in generateMetadata, dynamic descriptions | None |
| 11 | `a11y-foundation` | Skip-to-content, form labels, aria-live, aria-hidden SVGs, reduced-motion | None |
| 12 | `shared-components` | Extract SectionDivider, social SVG icons, ProjectCard | None |
| 13 | `fix-topic-pages` | Query + display posts/projects on topic pages, fix heading hierarchy | 12 |

### Audit backlog — Short-term

| # | Slug | Description | Blocked by |
|---|---|---|---|
| 14 | `code-syntax-highlight` | Custom code block renderer with syntax highlighting in PortableText | None |
| 15 | `loading-error-states` | loading.tsx, error.tsx, not-found.tsx | None |
| 16 | `pagination` | Pagination for /posts and /projects | None |
| 17 | `image-optimization` | Lazy loading, sizes, blur placeholders, context-appropriate widths | None |
| 18 | `project-filtering` | Filter projects by category/topic with URL query params | 16 |
| 19 | `search` | Client-side fuzzy search (fuse.js) across posts and projects | None |
| 20 | `test-coverage` | Unit tests for reading-time, image, PostCard, SubscribeForm, ThemeToggle, Header | 12 |
| 21 | `github-api` | Live repo stats on project cards + homepage activity feed | None |
| 22 | `reading-progress-bar` | Scroll progress bar on blog post detail pages | None |
| 23 | `contact-form` | Dedicated contact form with name/email/subject/message + Worker | 12 |
| 24 | `about-redesign` | Professional photo, specialization, tech stack badges, CTA | 12, 23 |

### Audit backlog — Medium-term

| # | Slug | Description | Blocked by |
|---|---|---|---|
| 25 | `table-of-contents` | Sticky sidebar TOC with active heading highlighting | None |
| 26 | `project-card-images` | Cover images on ProjectCard with lazy loading | 12, 17 |
| 27 | `view-counter` | Per-post view counter via Cloudflare Worker + KV | None |
| 28 | `interactive-demo` | CodeSandbox embed or live API widget on homepage | None |

### Audit backlog — Nice-to-have

| # | Slug | Description | Blocked by |
|---|---|---|---|
| 29 | `project-polish` | Reading time + last-updated timestamp on project detail pages | None |
| 30 | `social-share` | X/Twitter share + copy-link buttons on blog posts | None |
| 31 | `newsletter-archive` | /newsletter page with past issues or archive link | None |
| 32 | `interactive-resume` | Interactive career timeline on About page | 24 |
| 33 | `react-optimizations` | React.memo on PostCard/ProjectCard, useCallback on handlers, ESLint comment | 12 |
| 34 | `misc-polish` | Cache-Control headers, font display swap, verify API token scope | None |

### Portfolio UI Refinement (complete ✓)

| # | Slug | Description | Blocked by |
|---|---|---|---|
| 35 | `ui-tokens` | Establish Design System Tokens & Accent Colors | None |
| 36 | `ui-header` | Header Visual Polish & Active Underline Marker | 35 |
| 37 | `ui-hero` | Homepage Layout Clean-up & Editorial Typographic Hero | 35 |
| 38 | `ui-cards` | Cards Left-Border Hover Accent & Shadow Treatment | 35 |
| 39 | `ui-projects-intro` | Projects Page Editorial Framing Component | None |

## Tracer bullet

Issue `001-tracer-bullet` is the thinnest vertical slice — it cuts through every layer:
Sanity project → next-sanity client → Topic schema → data fetch at build time → static page render.

## Stats

- **Total issues:** 39 (32 complete + 5 completed UI issues = 37 complete, 2 open)
- **Immediate:** 0 open
- **Short-term:** 0 open
- **Medium-term:** 1 open
- **Nice-to-have:** 1 open
- **Portfolio UI Refinement:** 0 open (5 complete)
