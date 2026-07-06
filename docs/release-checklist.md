# Release Checklist

This is the canonical go/no-go checklist for `apps/www`.

## Local Checks

- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run public-safety`
- `npm run check`
- `npm run preflight:production`

## Local Docker

- Build the image with staging build args.
- Run the image on `PORT=3000`.
- Check `/api/health`.
- Check `/robots.txt`.
- Check `/sitemap.xml`.

## Staging Review

- Deploy the reviewed commit to `staging.jamieburk.art`.
- Confirm staging responses include `X-Robots-Tag: noindex, nofollow`.
- Confirm `robots.txt` disallows `/`.
- Confirm sitemap and canonical URLs use the staging host.
- Check keyboard navigation.
- Check mobile layout.
- Check visible focus states.
- Check heading order.
- Check key links.
- Review resume and contact paths.
- Review public-safety boundaries.

## Required Before Production Deploy

- Same reviewed commit passed staging.
- No visible approval TODOs in public pages.
- Resume PDF is the approved public file.
- Resume PDF sends `X-Robots-Tag: noindex, nofollow`.
- Contact strategy is resolved.
- No private source material, credentials, private paths, or private fonts are exposed.
- Sitemap and canonical URLs are correct for production.
- Known redirects work.
- `/api/health`, `/robots.txt`, and `/sitemap.xml` return expected production-noindex behavior unless indexing has been approved.
- `npm run public-safety` passes.
- `npm run preflight:production` passes.

## Required Before Production Indexing

- Jamie has approved the exact commit.
- Claims and metrics are approved.
- Optional public artifacts are approved or hidden.
- `NEXT_PUBLIC_ROBOTS_POLICY=index` is intentionally set.
- Sitemap is final.
- Production pages no longer emit noindex headers.
- The resume PDF remains noindex.
