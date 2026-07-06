# Release Checklist

## Local Checks

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] `npm run check:production`, only for production candidate

## Staging Behavior

- [ ] `staging.jamieburk.art` loads
- [ ] Robots disallows crawling
- [ ] Pages emit noindex/nofollow
- [ ] `X-Robots-Tag` is noindex/nofollow
- [ ] Sitemap, if present, uses staging URLs only
- [ ] Canonicals use staging URL
- [ ] `/api/health` reports staging

## Content Approval

- [ ] Public email approved
- [ ] Resume PDF approved
- [ ] LinkedIn approved or omitted
- [ ] GitHub approved or omitted
- [ ] Metrics approved or softened
- [ ] Collaborator names approved or omitted
- [ ] Screenshots approved or omitted
- [ ] Photos approved or omitted
- [ ] Quotes approved or omitted
- [ ] Artifacts approved or omitted

## Accessibility QA

- [ ] 320px layout
- [ ] 375px layout
- [ ] 768px layout
- [ ] Desktop layout
- [ ] Keyboard navigation
- [ ] Skip link
- [ ] Visible focus states
- [ ] One H1 per page
- [ ] Heading order
- [ ] Color contrast
- [ ] Reduced motion
- [ ] Clear link text
- [ ] Resume PDF accessibility

## Production Config

- [ ] `APP_ENV=production`
- [ ] `SITE_URL=https://jamieburk.art`
- [ ] `NEXT_PUBLIC_SITE_URL=https://jamieburk.art`
- [ ] `NEXT_PUBLIC_ROBOTS_POLICY=index`
- [ ] Production sitemap uses production URLs
- [ ] Production canonicals use production URLs
- [ ] Public pages are indexable
- [ ] Staging remains noindex

## Final Approval

- [ ] Jamie says in writing: "yes, promote this commit"
- [ ] Approved SHA recorded
- [ ] Same SHA deployed to production
