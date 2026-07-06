# Release Checklist

Use this checklist before production indexing. Staging may be reviewable while
some approval items remain open, but production must not become indexable until
Jamie approves the exact public content.

## Local Checks

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] `npm run public-safety`
- [ ] `APP_ENV=production SITE_URL=https://jamieburk.art NEXT_PUBLIC_SITE_URL=https://jamieburk.art NEXT_PUBLIC_ROBOTS_POLICY=index npm run preflight:production`

## Docker / Route Checks

- [ ] Docker build with staging args.
- [ ] Docker run locally.
- [ ] `curl /`
- [ ] `curl /work`
- [ ] `curl /api/health`
- [ ] `curl /robots.txt`
- [ ] `curl /sitemap.xml`
- [ ] `npm run check:routes -- http://localhost:3000`
- [ ] Verify public assets, `.next/static`, resume PDF, OpenGraph image, sitemap,
  robots, and health endpoint from the standalone container.

## Human Approval

- [ ] Resume PDF approval, including any personal contact details in the PDF.
- [ ] Public email approval.
- [ ] LinkedIn approval.
- [ ] GitHub approval.
- [ ] Metrics approval and internal source notes.
- [ ] Screenshots/artifacts approval.
- [ ] Collaborator names/photos/quotes approval.
- [ ] Staging review.

## Manual QA

- [ ] 320px mobile width.
- [ ] Keyboard navigation.
- [ ] Visible focus states.
- [ ] Skip link.
- [ ] One H1 per page.
- [ ] Logical heading order.
- [ ] Sticky header does not obscure anchors.
- [ ] Known / Open / Protected readable on mobile.
- [ ] Resume PDF downloads on mobile.
- [ ] External links labeled clearly.
- [ ] Proof strip and Broadway blue links meet contrast expectations.
- [ ] `prefers-reduced-motion` respected.

## Launch Sequence

- [ ] Deploy reviewed commit to staging.
- [ ] Confirm staging `robots.txt` disallows `/`.
- [ ] Confirm staging HTML responses include `X-Robots-Tag: noindex, nofollow`.
- [ ] Quiet production noindex soft launch.
- [ ] Final review after soft launch.
- [ ] Flip indexing only after final approval with
  `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- [ ] Verify production sitemap and canonical URLs use `https://jamieburk.art`.

## Rollback

- Keep the last good commit or image available.
- If production indexing is wrong, immediately restore noindex, redeploy if
  required, and use Search Console removals if anything was indexed.
- If content is wrong, redeploy the previous reviewed commit and document the
  rollback reason.
