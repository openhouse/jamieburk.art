# Staging QA

Production should not index until Jamie and one trusted reviewer can answer:

> I understand what Jamie does, and nothing feels private, overstated, broken, or confusing.

## Local Checks

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run public-safety
npm run check:production
```

## Docker Check

```bash
docker build \
  --build-arg APP_ENV=staging \
  --build-arg SITE_ENV=staging \
  --build-arg NEXT_PUBLIC_DEPLOY_ENV=staging \
  --build-arg SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_ROBOTS_POLICY=noindex \
  -t jamieburk-art:staging-test .
```

## HTTP Checks

```bash
curl -i https://staging.jamieburk.art/api/health
curl -i https://staging.jamieburk.art/robots.txt
curl -i https://staging.jamieburk.art/sitemap.xml
curl -I https://staging.jamieburk.art/work/fairrentnyc-commercial-rent-stabilization
curl -I https://staging.jamieburk.art/work/196-artists-residency
curl -I https://staging.jamieburk.art/work/source-backed-team-memory
```

## Manual Review

- Keyboard navigation and visible focus.
- Mobile layout at 320, 375, 768, and desktop widths.
- Text contrast.
- Resume page and PDF behavior.
- Contact flow.
- 404 behavior.
- External links.
- Redirects.
- Sitemap canonical URLs only.
- Robots and `X-Robots-Tag`.
- OpenGraph image and metadata.
- Production/staging URL separation.
- No private, overstated, broken, or confusing content.
