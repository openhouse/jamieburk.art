# Production Checklist

Use this checklist after staging review and before switching production to
indexable.

## Content Approval

- Resume PDF is the approved public version and contains only approved public
  contact details.
- Public email is approved and configured through `NEXT_PUBLIC_CONTACT_EMAIL`.
- Optional LinkedIn and GitHub links are approved before their env vars are set.
- Proof-strip language stays contribution-oriented unless exact metrics are
  approved.
- Case-study screenshots, artifacts, photos, quotes, and collaborator names are
  approved or omitted.
- Footer and metadata use the direct professional frame, not the V1.1 notebook
  frame.
- Metadata and OpenGraph title, description, URL, and image alt text have been
  reviewed for the production domain.
- Source-Backed Team Memory remains a lab / method unless Jamie approves it as
  an indexable V1 surface.

## Public Safety

- `npm run check:public-safety` passes.
- `npm run check:production` passes with production env values.
- No private source folders, raw transcripts, legal-review material, private
  emails, credentials, analytics dashboards, client-private material, or private
  fonts are committed.
- Resume PDF response remains noindex for V1 unless Jamie approves indexing it.

## Technical QA

- `npm ci` completes.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- `npm run check` passes.
- `npm run check:routes` passes.
- Docker build completes with staging build args.
- Docker run serves `/`, `/api/health`, `/robots.txt`, `/sitemap.xml`, and the
  resume PDF.
- Dokku staging deploy completes and points at the reviewed commit.
- Staging sends both `robots.txt` disallow and `X-Robots-Tag: noindex, nofollow`.
- Sitemap uses the expected domain and does not include staging URLs in
  production.
- Canonical redirects work, including FairRentNYC aliases, 196 Artists
  Residency, Source-Backed Team Memory, and `www.jamieburk.art` to apex.
- Production indexing is approved only after Jamie confirms
  `NEXT_PUBLIC_ROBOTS_POLICY=index`.

## Rollback

- Keep the previous reviewed staging/production commit SHA before deploy.
- If health, robots, sitemap, contact, or resume checks fail, redeploy the prior
  SHA and reset `NEXT_PUBLIC_ROBOTS_POLICY=noindex` until the issue is fixed.
- Do not leave production indexable while public-safety or content approval is
  uncertain.

## Accessibility QA

- Keyboard path reaches header navigation, work cards, resume, and contact.
- Visible focus states are present on links and buttons.
- Mobile views do not overlap or truncate important text.
- Body copy and headings preserve readable contrast.
- Reduced-motion preference does not leave essential information unavailable.
- Resume PDF has selectable text and should receive a human reading-order review
  before broad distribution.
