# Production Readiness

Production is opt-in and review-gated.

## Deployment Policy

Staging comes first:

```text
https://staging.jamieburk.art
```

Production follows only after Jamie approves the exact reviewed commit:

```text
https://jamieburk.art
```

Production indexing requires:

```text
APP_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
```

Production is not indexable merely because `APP_ENV=production`.

## Required Checks

Use Node 26.

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run check
npm run public-safety
npm run knowledge-bank
npm run preflight:staging
npm run preflight:production
```

## Smoke Checks

After staging deploy:

```bash
curl -i https://staging.jamieburk.art/api/health
curl -i https://staging.jamieburk.art/robots.txt
curl -i https://staging.jamieburk.art/sitemap.xml
curl -I https://staging.jamieburk.art/opengraph-image
curl -I https://staging.jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

After production approval and deploy:

```bash
curl -i https://jamieburk.art/api/health
curl -i https://jamieburk.art/robots.txt
curl -i https://jamieburk.art/sitemap.xml
curl -I https://jamieburk.art/opengraph-image
curl -I https://jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
curl -I https://www.jamieburk.art
```

## Browser QA

Do not claim accessibility or responsive QA until a real browser check happens.

Review at minimum:

- 320px width
- mobile header navigation
- keyboard navigation through top-level routes
- skip-link focus and movement
- visible focus states
- proof-strip readability
- contact email click
- resume download link
- case-study sidebars on mobile
- contrast across blue, green, ochre, pale cards, and proof strips
- reduced-motion behavior
- links not relying on color alone
