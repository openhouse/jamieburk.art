# Knowledge Bank Review Checklist

Use this before strengthening public claims, merging knowledge-bank changes, or
promoting production.

## Branch And Scope

- [ ] Branch is named `feature/knowledge-bank-composite-F`.
- [ ] `apps/www` remains canonical.
- [ ] No `apps/web` or `apps/site` rename.
- [ ] No CMS, database, auth, analytics, contact form, AI chatbot, or public
  archive browser added for V1.

## Required Knowledge Files

- [ ] `docs/knowledge-bank/README.md`
- [ ] `docs/knowledge-bank/chad-lens.md`
- [ ] `docs/knowledge-bank/claims.md`
- [ ] `docs/knowledge-bank/proofs.md`
- [ ] `docs/knowledge-bank/anti-claims.md`
- [ ] `docs/knowledge-bank/source-policy.md`
- [ ] `docs/knowledge-bank/publication-rules.md`
- [ ] `docs/knowledge-bank/opportunities/oti-technical-operations.md`
- [ ] `docs/knowledge-bank/opportunities/source-backed-team-memory.md`
- [ ] `docs/knowledge-bank/review-checklist.md`

## Claims

- [ ] Every strengthened public claim has a stable claim ID.
- [ ] Every claim has a status.
- [ ] Every claim has allowed pages.
- [ ] Every claim has a source class.
- [ ] Every claim has an approval owner.
- [ ] High-impact claims are present in `claims.md`: 14+ years, 2x HJE
  revenue wording as Pending, CRS campaign memory, WOWList aggregate adoption,
  300+ gatherings, 20+ resident-artist contexts, $490,539 recommendation
  language, Source-Backed Team Memory, and AI Evals.
- [ ] Claims marked `Do-not-publish`, `Protected`, or `Pending` do not appear in public app
  content.
- [ ] Public site copy does not imply any anti-claim.

## Public Safety

- [ ] Protected evidence is described by source class, not committed or
  path-linked.
- [ ] No private local paths are present.
- [ ] No private emails, private coalition notes, legal-review detail,
  stakeholder lists, raw community records, or private dashboards are committed.
- [ ] No unapproved names, photos, screenshots, or quotes are published.
- [ ] Phone remains PDF-only unless separately approved for HTML.

## Production

- [ ] O-style redirects are preserved.
- [ ] Sitemap contains canonical live routes only.
- [ ] Source-Backed Team Memory remains lab-only for V1.
- [ ] Default-deny indexing is preserved.
- [ ] Private file/font ignores are preserved.
- [ ] `npm run knowledge-bank` passes.
- [ ] `npm run public-safety` passes or reports only documented policy warnings.
- [ ] `npm run check:production` passes only in a production-safe environment.

## Human Question

Can future edits strengthen public claims only through a public-safe, reviewable
knowledge bank rather than by improvising directly on the website?
