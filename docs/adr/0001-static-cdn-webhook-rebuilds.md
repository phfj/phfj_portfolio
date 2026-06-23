# Static CDN deployment with webhook-triggered rebuilds

## Status
Accepted

## Context

The site is a Next.js portfolio and blog backed by Sanity headless CMS. Two deployment approaches were considered:

1. **Static CDN (Cloudflare Pages)** — content fetched at build time, deployed as static assets. Content changes trigger a full rebuild via Sanity webhook.
2. **Vercel with ISR** — pages revalidate on demand, content changes appear near-instantly. Requires a running Node.js server.

## Decision

Deploy to **Cloudflare Pages** as a static export. Content changes in Sanity fire a webhook to Cloudflare's deploy hook, triggering a full rebuild (~30-60 seconds).

The subscribe form runs as a **Cloudflare Worker** that validates email format and forwards to Buttondown's API.

## Rationale

- **Zero server maintenance.** No Node.js runtime to manage or monitor.
- **Zero cost at this scale.** Cloudflare Pages and Workers are free for personal sites.
- **Simpler mental model.** The entire site is a build-time snapshot of Sanity content. No cache invalidation, no stale pages, no revalidation logic.
- **Acceptable latency.** ~30-second delay on publish is irrelevant for a solo portfolio updated occasionally.

## Consequences

- Content changes are not instant; there is a build-and-deploy delay.
- Dynamic behavior (subscribe form) requires a Cloudflare Worker — additional infrastructure, though minimal.
- Moving to SSR/ISR later would require migrating deployment and re-architecting the subscribe form.
