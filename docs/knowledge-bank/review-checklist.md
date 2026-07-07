# Knowledge Bank Review Checklist

Use this before strengthening public claims, merging knowledge-bank changes, or promoting production.

## Branch And Scope

- [ ] Branch name matches the requested branch.
- [ ] `apps/www` remains canonical.
- [ ] No `apps/web`, `apps/site`, or app-path rename.
- [ ] No CMS, database, auth, search, analytics, contact form, AI chatbot, or private archive browser added for V1.
- [ ] No full `feature/knowledge-bank-*` branch was merged wholesale.

## Required Knowledge Files

- [ ] `docs/knowledge-bank/README.md`
- [ ] `docs/knowledge-bank/source-classes.md`
- [ ] `docs/knowledge-bank/approval-register.md`
- [ ] `docs/knowledge-bank/projection-guide.md`
- [ ] `docs/knowledge-bank/anti-claims.md`
- [ ] `docs/knowledge-bank/review-checklist.md`
- [ ] `docs/proofs-bank.md`
- [ ] `docs/public-claims-inventory.md`
- [ ] `docs/copy-guidelines.md`
- [ ] `docs/content-safety.md`
- [ ] `docs/launch-blockers.md`
- [ ] `docs/staging-qa.md`
- [ ] `docs/typefaces.md`
- [ ] `docs/production-readiness.md`

## Claims

- [ ] Every strengthened public claim has safe wording.
- [ ] Every claim has an approval state or review location.
- [ ] Every claim has a source class.
- [ ] Exact metrics are approved or softened.
- [ ] Claims marked `do-not-publish`, `protected`, or equivalent do not appear in public app content.
- [ ] Public site copy does not imply any anti-claim.
- [ ] Collective civic and community work uses collective-credit language.

## Public Safety

- [ ] Protected evidence is described by source class, not committed or path-linked.
- [ ] No private local paths are present.
- [ ] No private emails, private coalition notes, legal-review detail, stakeholder lists, raw community records, or private dashboards are committed.
- [ ] No unapproved names, photos, screenshots, or quotes are published.
- [ ] Phone remains PDF-only unless separately approved for HTML.
- [ ] Proprietary/private font files are not committed or served.

## Production

- [ ] Temporary redirects are intentional and verified.
- [ ] Sitemap contains canonical live routes only.
- [ ] Source-Backed Team Memory remains lab-only for V1.
- [ ] Default-deny indexing is preserved.
- [ ] `npm run public-safety` passes.
- [ ] `npm run check` passes.
- [ ] `npm run check:production` passes only in a production-safe env.
- [ ] Exact reviewed commit SHA is approved before production promotion.

## Human Question

Can future edits strengthen public claims only through a public-safe, reviewable Knowledge Bank rather than by improvising directly on the website?
