# Issues

## Dependency graph

```
001-tracer-bullet ──┬── 002-project-content ──┬── 005-homepage
                    │                         │
                    ├── 003-blog-content ─────┘
                    │
                    ├── 006-site-shell ──┬── 007-subscribe-form
                    │                   └── 008-deploy-cloudflare
004-about ──────────┘
```

## Issue list

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

## Tracer bullet

Issue `001-tracer-bullet` is the thinnest vertical slice — it cuts through every layer:
Sanity project → next-sanity client → Topic schema → data fetch at build time → static page render.
