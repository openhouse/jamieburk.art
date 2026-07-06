# Launch checklist

## Jamie approval

- [ ] Public email approved
- [ ] LinkedIn approved
- [ ] GitHub approved
- [ ] Resume PDF approved
- [ ] Metrics approved or softened
- [ ] Collaborator names/photos/quotes approved or omitted
- [ ] Public-safety review complete

## Content

- [ ] No visible TODOs in public pages
- [ ] Artifact Gallery renamed to Representative artifacts
- [ ] Known / Open / Protected explainer present
- [ ] Collective-work language reviewed
- [ ] Sensitive pages remain public-safe
- [ ] Phone is not shown on the website

## Technical

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] `npm run check:production-readiness`
- [ ] Docker build smoke test
- [ ] `/api/health` verified
- [ ] `/robots.txt` verified
- [ ] `/sitemap.xml` verified
- [ ] Resume PDF response headers verified

## Staging

- [ ] Staging is noindex
- [ ] Staging URLs appear in staging sitemap only
- [ ] Staging review complete

## Production

- [ ] `SITE_URL=https://jamieburk.art`
- [ ] `NEXT_PUBLIC_SITE_URL=https://jamieburk.art`
- [ ] `NEXT_PUBLIC_ROBOTS_POLICY=index`
- [ ] Production sitemap uses production URLs only
- [ ] Resume PDF is noindex
- [ ] Resume PDF is not listed in the sitemap
- [ ] TLS works
- [ ] `www.jamieburk.art` behavior verified
- [ ] Exact staging commit approved before production promotion
