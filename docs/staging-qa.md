# Staging QA

Use this checklist before production indexing or production promotion.

## Local Checks

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run public-safety
npm run check:production
```

## Docker Checks

```bash
docker build \
  --build-arg APP_ENV=staging \
  --build-arg SITE_ENV=staging \
  --build-arg NEXT_PUBLIC_DEPLOY_ENV=staging \
  --build-arg SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_ROBOTS_POLICY=noindex \
  -t jamieburk-art:production-readiness-plus-o .
```

## Staging HTTP Checks

- `/api/health` returns `ok: true` and staging URL state.
- `/robots.txt` disallows crawling on staging.
- Responses include `X-Robots-Tag: noindex, nofollow` outside production.
- `/sitemap.xml` uses staging URLs on staging and canonical production URLs only in production.
- Redirect variants resolve to canonical routes:
  - `/work/fairrentnyc-commercial-rent-stabilization`
  - `/work/fairrentnyc`
  - `/work/nyc-artist-coalition-fair-rent`
  - `/work/196-artists-residency`
  - `/work/source-backed-team-memory`

## Human QA

- Keyboard navigation and visible focus.
- Mobile layout at 320, 375, 768, and desktop widths.
- Contrast.
- Resume page and PDF download behavior.
- Contact flow.
- All internal and external links.
- OpenGraph title, image, and canonical metadata.
- 404 behavior.

Final review question:

> Can a thoughtful stranger understand what Jamie does, what roles he fits, and why he is credible without encountering anything private, overstated, broken, or confusing?
