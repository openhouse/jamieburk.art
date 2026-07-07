# Launch Checklist

## Local Checks

- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run check`
- `npm run public-safety`

## Route QA

Build and start the app, then run:

```bash
npm run check:routes -- http://127.0.0.1:3000
```

Check the homepage, Work index, Technical Operations page, one case-study page,
Contact page, Resume page, and Colophon.

## Staging

Staging uses `https://staging.jamieburk.art` and stays noindex. Confirm
`robots.txt`, `X-Robots-Tag`, sitemap URLs, canonical metadata, and redirects.

## Public-Safety Review

Review `docs/knowledge-bank/claims.md` before strengthening public copy. Keep
private source material outside the repo and outside the Docker context.

## Accessibility And QA

Manually check keyboard navigation, focus states, mobile layout, link labels,
PDF download behavior, and text contrast.

## Production Noindex Soft Launch

For quiet production review:

```bash
APP_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=noindex \
npm run preflight:production
```

When a production or local standalone server is running, add route checking to
the same command:

```bash
APP_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=noindex \
CHECK_ROUTES_BASE_URL=https://jamieburk.art \
npm run preflight:production
```

## Final Indexing Flip

Only after Jamie approval:

```bash
NEXT_PUBLIC_ROBOTS_POLICY=index
```

Production indexing is intentional, not a default.

## Rollback

Keep the previous Dokku release available. If public-safety, routing, indexing,
or content approval issues appear, revert to the last known-good release and
restore `NEXT_PUBLIC_ROBOTS_POLICY=noindex` while investigating.
