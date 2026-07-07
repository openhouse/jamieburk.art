# Release Checklist

## Before Staging

- [ ] Run `npm ci` with Node 26.
- [ ] Run `npm run check`.
- [ ] Run `npm run knowledge-bank`.
- [ ] Run `npm run public-safety`.
- [ ] Run `npm run preflight:staging`.
- [ ] Confirm no private source material is tracked.
- [ ] Confirm exact public claims are approved or softened.
- [ ] Confirm contact path is visible and clickable.
- [ ] Confirm resume PDF is not the non-final stub file.

## Staging Review

- [ ] Deploy to `https://staging.jamieburk.art`.
- [ ] Confirm health endpoint reports staging and noindex.
- [ ] Confirm robots disallows indexing.
- [ ] Confirm sitemap uses staging URLs.
- [ ] Confirm OpenGraph image responds.
- [ ] Confirm resume PDF responds with noindex headers.
- [ ] Review desktop and 320px mobile.
- [ ] Review keyboard focus and skip link.
- [ ] Review copy for overclaiming and underclaiming.

## Before Production

- [ ] Run `npm run preflight:production`.
- [ ] Build and run the Docker image locally.
- [ ] Confirm production health, robots, sitemap, OpenGraph, PDF, and redirects.
- [ ] Jamie approves the exact reviewed commit SHA.
- [ ] Jamie approves production indexing with `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- [ ] Record last known-good production commit before deploy.

## After Production

- [ ] Confirm `https://jamieburk.art/api/health`.
- [ ] Confirm `https://jamieburk.art/robots.txt`.
- [ ] Confirm `https://jamieburk.art/sitemap.xml`.
- [ ] Confirm resume PDF noindex header.
- [ ] Confirm `https://www.jamieburk.art` redirects to the apex domain.
- [ ] If smoke checks fail, redeploy the last known-good commit and investigate
  before reopening traffic.
