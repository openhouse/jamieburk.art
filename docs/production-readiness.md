# Production Readiness

This branch is a knowledge-bank production-readiness composition. The goal is
not to make the site bigger. The goal is to make the site easier to trust.

## Required Gates

Run these before production approval:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run public-safety
npm run preflight:staging
npm run preflight:production
docker build -t jamie-portfolio .
docker run --rm -p 3000:3000 jamie-portfolio
```

## Staging Smoke Tests

```bash
curl -i https://staging.jamieburk.art/api/health
curl -i https://staging.jamieburk.art/robots.txt
curl -i https://staging.jamieburk.art/sitemap.xml
curl -I https://staging.jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
curl -I https://staging.jamieburk.art/opengraph-image
```

Expected staging behavior:

- `APP_ENV=staging`.
- `NEXT_PUBLIC_ROBOTS_POLICY=noindex`.
- `robots.txt` disallows all.
- Sitemap and OpenGraph URLs use `https://staging.jamieburk.art`.
- Responses include noindex headers.
- Resume PDF sends `X-Robots-Tag: noindex`.

## Production Smoke Tests

Run only after Jamie approves production indexing:

```bash
curl -i https://jamieburk.art/api/health
curl -i https://jamieburk.art/robots.txt
curl -i https://jamieburk.art/sitemap.xml
curl -I https://jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
curl -I https://jamieburk.art/opengraph-image
curl -I https://www.jamieburk.art
```

Expected production behavior:

- `APP_ENV=production`.
- `SITE_URL=https://jamieburk.art`.
- `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- `robots.txt` allows indexing and includes the production sitemap.
- Sitemap and canonical URLs use `https://jamieburk.art`.
- Resume PDF remains noindexed unless Jamie explicitly changes that policy.

## Approval Ownership

- Jamie approves production deploy, public contact, resume artifact, phone in
  PDF, exact metrics, collaborator names, screenshots, quotes, and artifacts.
- Technical reviewer approves build, Docker, redirects, robots, sitemap,
  metadata, headers, and rollback readiness.
- Editorial reviewer approves professional-legibility clarity and claim
  discipline.

## Node Fallback

Node 26 is the V1 target and Dockerfile source of truth.

If Dokku cannot build Node 26, do not silently deploy another runtime. Create a
separate fallback branch for Node 24, update the Docker image and engines field
there, run full preflight and Docker smoke tests, and merge only after proven.

## Rollback

Record the last known-good production commit SHA in the deployment note. If
production smoke tests fail, redeploy the known-good commit and rerun smoke
tests before reopening traffic.
