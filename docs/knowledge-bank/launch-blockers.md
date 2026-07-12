# Launch Readiness

Last reviewed: 2026-07-11.

This file separates durable content approvals from actions that must be repeated
for one exact production candidate. A checked content gate may remain checked
while the underlying record is unchanged. Release actions are checked only in
the pull request or deployment record for the SHA being promoted.

## Cleared Content And Safety Gates

- [x] Homepage proof claims exist in the knowledge bank.
- [x] Resume-page proof claims exist in the knowledge bank.
- [x] Technical Operations proof rows exist in the knowledge bank.
- [x] Work items with strong claims use proof-bank IDs.
- [x] Pending, private, open, and protected claims are excluded from public
  projection.
- [x] Careful claims retain their guardrails.
- [x] Metrics are approved, approximate, or softened with contribution language.
- [x] Collaborator-sensitive claims are approved, collective, or omitted.
- [x] Source-Backed Team Memory exposes no private collaborator or client
  context.
- [x] Case studies use Known / Open / Protected boundaries where needed.
- [x] Public pages contain no unapproved photos, quotes, screenshots, private
  paths, or proprietary fonts.
- [x] Chad-lens review keeps Jamie visible while preserving collective credit.

## Jamie Approvals

- [x] Public email and contact path.
- [x] LinkedIn and GitHub profile links.
- [x] Exact resume PDF.
- [x] Phone number inside the resume PDF, but not in website HTML.
- [x] Public proof metrics under the guardrails in `approval-register.md`.
- [x] Launch preparation authorized on 2026-07-11.

## Exact-Commit Release Actions

- [ ] Merge the reviewed launch-ready pull request to `develop`.
- [ ] Record the exact `develop` SHA selected for production.
- [ ] Run `npm ci` with the repository-pinned Node version.
- [ ] Run `npm run check`.
- [ ] Generate and attach `npm run report:launch-evals` output.
- [ ] Run `npm audit --omit=dev --audit-level=high` and review lower-severity
  advisories rather than ignoring them.
- [ ] Run `npm run preflight:staging` and `npm run preflight:production`.
- [ ] Build and smoke-test the production Docker image.
- [ ] Review the exact SHA on staging at mobile, tablet, and desktop widths.
- [ ] Complete keyboard, focus, and screen-reader spot checks.
- [ ] Jamie approves the exact production SHA after staging review.
- [ ] Promote that same SHA to the production Dokku app.
- [ ] Verify `jamieburk.art` and `www.jamieburk.art` routing, TLS, health,
  canonical URLs, Open Graph metadata, resume delivery, `robots.txt`, and
  `sitemap.xml`.
- [ ] Confirm production alone uses `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- [ ] Submit the verified production sitemap after the indexable response is
  live.

Do not mark production ready because a nearby branch passed. Evidence belongs
to the exact SHA being released.
