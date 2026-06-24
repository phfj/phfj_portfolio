# Image Optimization

## What to build

Since the site uses static export (`images.unoptimized: true`), images bypass
Next.js optimization. Add explicit lazy loading, responsive `sizes` attributes,
and low-quality image placeholders (blurhashes) to all images. Use
context-appropriate widths instead of hardcoded 1200px everywhere.

## Acceptance criteria

- [ ] All non-hero images have `loading="lazy"` (cover images keep `priority`)
- [ ] `sizes` attribute added to images: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw` for grid cards, `100vw` for detail page hero
- [ ] Cover images on detail pages use `width={1200}` (hero, full-width)
- [ ] Inline body images in `portable-text.tsx` use `width={800}` (content column)
- [ ] Project/page card images (when added) use `width={600}` (card size)
- [ ] Generate blur data URLs at build time — use `plaiceholder` or encode a tiny base64 thumbnail
- [ ] `placeholder="blur"` + `blurDataURL` on all images with a valid placeholder
- [ ] `next/image` `alt` text preserved on all existing images
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
