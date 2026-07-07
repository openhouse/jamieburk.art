# Production Readiness

This site is staging-first and default-deny for indexing.

## Launch Gates

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run check
npm run knowledge-bank
npm run public-safety
npm run routes
npm run preflight:staging
npm run preflight:production
```

Also verify:

- Docker build.
- Docker run.
- Route smoke tests.
- Knowledge-bank review.
- Chad-lens review.
- Proof projection review.
- Manual accessibility/mobile QA.
- Jamie final approval.

## Quiet Production Review

Use production URLs with noindex before the final indexing flip:

```bash
APP_ENV=production \
SITE_ENV=production \
NEXT_PUBLIC_DEPLOY_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=noindex \
npm run preflight:production
```

Final indexing requires explicit approval and:

```text
NEXT_PUBLIC_ROBOTS_POLICY=index
```

## Rollback

If public-safety, routing, indexing, or content approval issues appear, revert
to the last known-good release and restore `NEXT_PUBLIC_ROBOTS_POLICY=noindex`
while investigating.
