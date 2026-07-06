# Staging QA

Run before production promotion:

- `npm ci`
- `npm run check`
- `npm run check:production` with production-like environment values
- Docker build/run if practical
- `/api/health`
- `/robots.txt`
- `/sitemap.xml`
- canonical URLs
- public routes
- mobile layout
- keyboard navigation
- focus states
- content-safety review

Expected staging behavior:

- `/api/health` reports staging values and `robotsIndexable: false`.
- `robots.txt` disallows `/`.
- HTML responses include `X-Robots-Tag: noindex, nofollow`.
- `sitemap.xml` returns valid XML with `https://staging.jamieburk.art` URLs.
- Public pages contain no visible approval TODOs.
- Public contact values render only when configured.
