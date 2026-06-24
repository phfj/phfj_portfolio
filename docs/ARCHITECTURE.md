# Architecture

## Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js v16.2.9 (App Router) | Already bootstrapped in Phase 0. App Router is the current paradigm. |
| Language | TypeScript (strict) | Type safety across the codebase. |
| Styling | Tailwind v4 + next-themes | Utility-first CSS. Manual dark/light/system toggle with localStorage persistence. |
| Linting | ESLint v9 (flat config) | Next.js default. Already configured. |
| Formatting | Prettier + prettier-plugin-tailwindcss | Consistent code style. Already configured. |

## Content (CMS)

**Sanity** — headless CMS with standalone cloud Studio at a Sanity-hosted URL (e.g., `yourproject.sanity.studio`).

Why Sanity:
- Excellent Next.js integration (`next-sanity`)
- Generous free tier for solo use
- Block content (rich text) with custom components for code blocks, images, embeds
- GROQ query language — expressive, well-documented
- Webhook support for triggering Cloudflare Pages rebuilds

Why standalone Studio (not embedded in Next.js):
- Keeps the static site build lightweight — no Sanity Studio React bundle
- Sanity's real-time API works better outside the static build pipeline
- Studio is always available regardless of site build state

## Content Model

### Project
Title (string, required), Slug (slug, auto), Category (enum: Software | OSS | Talk | Writing), Topics (ref → Topic[], optional), Summary (text), Body (block content), Cover Image (image), Live URL (url, optional), Repo URL (url, optional), Featured (boolean), Published Date (datetime), SEO metadata (object), Tech Stack (string[], optional), What I Learned (text, optional), Related Posts (ref → Post[], optional)

### Post
Title (string, required), Slug (slug, auto), Topics (ref → Topic[], optional), Summary (text), Body (block content), Cover Image (image), Published Date (datetime), Updated Date (datetime, auto), SEO metadata (object)

### Topic
Name (string), Slug (slug, auto)

## Deployment

**Cloudflare Pages** — static export via Next.js `output: "export"`.

Build pipeline:
1. `next build` fetches all Sanity content at build time
2. Static HTML/CSS/JS/XML output generated
3. Deployed to Cloudflare Pages global CDN
4. On content change: Sanity webhook → Cloudflare deploy hook → rebuild

See ADR-0001 for full rationale.

## Dynamic Behavior

**Cloudflare Worker** — handles the email subscribe form. Single endpoint:

```
POST /api/subscribe
Body: { email: string }
→ Worker validates email format
→ Forwards to Buttondown API (POST /subscribers)
→ Returns success/error to frontend
```

The Worker is a thin proxy — no database, no state. Buttondown handles double opt-in, email delivery, and subscriber management.

## Email Newsletter

**Buttondown** — email newsletter service. Chosen for:
- Solo-creator focused
- Clean REST API
- Generous free tier
- No branding on emails
- Markdown support for email content
- Built-in double opt-in and unsubscribe handling

## Auth

No site-level authentication. **Author** authenticates via Sanity Studio (Sanity handles admin login). Site visitors are unauthenticated. Subscribers authenticate via Buttondown's double opt-in flow.

## Routes

| Route | Content | Generation |
|---|---|---|
| `/` | Home — hero, featured Projects, latest Posts, subscribe CTA | Static |
| `/projects` | All Projects, filterable by Category and Topic | Static |
| `/projects/[slug]` | Individual Project detail | Static |
| `/posts` | Blog listing, filterable by Topic | Static |
| `/posts/[slug]` | Individual Post with subscribe CTA | Static |
| `/topics/[slug]` | All Projects and Posts for a Topic | Static |
| `/about` | Author bio and site purpose | Static |
| `/feed.xml` | RSS feed of Posts | Static |

All routes are statically generated at build time via `generateStaticParams`.

## Network Topology

```
[Sanity Cloud]  ←→  [Cloudflare CDN]
       |                   |
   webhook             /api/subscribe
       |                   |
       v                   v
[Cloudflare Pages]   [Cloudflare Worker]
       |                   |
       |                   v
       |            [Buttondown API]
       |
       v
  [Visitors]
```

- Unauthenticated visitors access static content directly from CDN
- Author manages content in Sanity Studio (Sanity cloud)
- Content publish triggers webhook → Cloudflare Pages rebuild
- Subscribe form POSTs to Cloudflare Worker → forwards to Buttondown
- No database owned by the site — Sanity is the content store, Buttondown is the subscriber store
