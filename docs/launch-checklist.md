# Launch Checklist

Use this as a template. Do not commit checked boxes as proof unless creating a dated release record.

## Content Approval

- [ ] Jamie approved the final resume PDF.
- [ ] Jamie approved the public contact path.
- [ ] Jamie approved proof metrics.
- [ ] Jamie approved collaborator names and credits.
- [ ] Jamie approved screenshots, representative artifacts, quotes, and photos.
- [ ] Active civic work received another human review where possible.

## Public-Safety Approval

- [ ] Known / Open / Protected appears on sensitive work pages.
- [ ] Public-safety notes or care notes are present on case studies.
- [ ] No private emails, raw transcripts, private coalition notes, legal-review materials, stakeholder lists, internal analytics, client-private materials, raw community records, or private source paths are published.
- [ ] `npm run check:public-safety` passes.
- [ ] `npm run check:production` passes with approved production-like env values.

## Technical Verification

- [ ] `npm ci`
- [ ] `npm run check`
- [ ] `npm run check:production`
- [ ] Docker build with staging args.
- [ ] Docker run with staging args.
- [ ] `/api/health`, `/robots.txt`, and `/sitemap.xml` checked.
- [ ] Resume PDF route emits `X-Robots-Tag: noindex, nofollow`.
- [ ] Canonical URLs and sitemap URLs use the intended environment URL.

## Accessibility and Usability

- [ ] 320px mobile width checked.
- [ ] One H1 per page checked.
- [ ] Heading order checked.
- [ ] Skip link visible on focus.
- [ ] Keyboard navigation through header, cards, buttons, and footer checked.
- [ ] Focus states visible on interactive elements.
- [ ] Broadway blue links and proof strip contrast checked.
- [ ] Cards and badges do not rely on color alone.
- [ ] Reduced-motion behavior exists.
- [ ] PDF links are clearly labeled.
- [ ] External links using `target="_blank"` include `rel="noreferrer"`.

## Deployment

- [ ] Deploy reviewed commit to `staging.jamieburk.art`.
- [ ] Confirm staging is noindex/nofollow.
- [ ] Confirm production deploy source is a tag or exact reviewed SHA.
- [ ] Confirm rollback SHA/tag and noindex fallback.
- [ ] Written Jamie go/no-go received before production indexing.

## Post-Launch Review

- [ ] Confirm production health, robots, sitemap, canonical, and PDF noindex.
- [ ] Confirm `www.jamieburk.art` redirects to apex.
- [ ] Review Search Console/Bing Webmaster setup when indexing is approved.
- [ ] Schedule a first-week content/public-safety review.
