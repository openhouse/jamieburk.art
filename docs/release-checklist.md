# Release Checklist

Use this checklist before production indexing. Staging may be reviewable while
some approval items remain open, but production must not become indexable until
Jamie approves the exact public content.

## Local Checks

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run check
npm run public-safety
npm run preflight:staging
npm run preflight:production
```

## Staging Checks

- [ ] Deploy reviewed commit SHA to staging.
- [ ] `/api/health` reports staging values.
- [ ] `/robots.txt` disallows all.
- [ ] `/sitemap.xml` uses staging URLs only.
- [ ] Responses include `X-Robots-Tag: noindex, nofollow`.
- [ ] Contact page has no visible approval placeholder rows.
- [ ] Resume page links to approved public PDF or hides PDF if not approved.
- [ ] No placeholder resume copy remains.
- [ ] Core routes smoke-tested.
- [ ] Redirect routes smoke-tested.

## Trusted Referrer Review

- [ ] Homepage explains Jamie's role in 30 seconds.
- [ ] Work cards answer role fit, what was unclear, what became usable, and
  toward what end.
- [ ] Technical Operations page maps to delivery coordination, risk surfacing,
  onboarding, documentation, reporting, and durable handoffs.
- [ ] Source-Backed Team Memory is framed as method/prototype, not finished
  SaaS.
- [ ] Case-study claims use contribution and collective-work language.
- [ ] Claims match proofs bank / claim register.
- [ ] Screenshots, photos, metrics, collaborator names, and credits are approved
  or omitted.
- [ ] Known / Open / Protected blocks are readable on mobile.

## Human Approval

- [ ] Resume PDF approval, including any personal contact details in the PDF.
- [ ] Public email approval if displayed.
- [ ] LinkedIn approval if displayed.
- [ ] GitHub approval if displayed.
- [ ] Metrics approval and internal source notes.
- [ ] Screenshots/artifacts approval.
- [ ] Collaborator names/photos/quotes approval.
- [ ] Staging review.

## Production Release

- [ ] Deploy exact staging-reviewed commit.
- [ ] TLS works for `jamieburk.art` and `www.jamieburk.art`.
- [ ] `www` behavior is verified.
- [ ] Smoke-test core routes.
- [ ] `/robots.txt` allows `/` only after final approval.
- [ ] `/sitemap.xml` uses production canonical URLs.
- [ ] Resume PDF remains noindex/noarchive for V1 unless separately approved.
- [ ] Rollback SHA recorded.

## Rollback

- Keep the last good commit or image available.
- If production indexing is wrong, immediately restore noindex and redeploy if
  needed.
- If content is wrong, redeploy the previous reviewed commit and document the
  rollback reason.
