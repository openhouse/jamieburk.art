# Production Readiness

This project deploys staging first. Production indexing is explicit opt-in.

## Required Commands

Run under Node 26:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run check
npm run knowledge-bank
npm run public-safety
npm run preflight:staging
npm run preflight:production
```

## Docker

Build and smoke-test the Docker image before production:

```bash
docker build -t jamie-portfolio .
docker run --rm -p 3000:3000 jamie-portfolio
curl -i http://localhost:3000/api/health
```

## Staging Expectations

- `robotsIndexable=false`.
- `robots.txt` disallows indexing.
- sitemap and OpenGraph URLs use `https://staging.jamieburk.art`.
- `X-Robots-Tag` is `noindex, nofollow`.
- resume PDF is served with `X-Robots-Tag: noindex`.

## Production Expectations

- `APP_ENV=production`.
- `SITE_URL=https://jamieburk.art`.
- `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- `robotsIndexable=true`.
- `robots.txt` allows indexing and includes the production sitemap.
- sitemap and canonical URLs use `https://jamieburk.art`.
- resume PDF remains noindexed unless Jamie explicitly approves indexing.

## Remaining Human Review

- Jamie approval of public contact path.
- Jamie approval of resume PDF and phone-in-PDF behavior.
- Jamie approval of exact metrics, if any are promoted from
  `needs-jamie-approval`.
- Staging smoke tests after deploy.
- Browser/mobile/accessibility review.
- Final proof-bank editorial review.
