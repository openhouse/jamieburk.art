# Release Checklist

Use this checklist before staging or production deployment.

## Architecture

- [ ] `apps/www` remains the canonical app.
- [ ] npm workspaces remain the package manager.
- [ ] Node 26 is used for final verification.
- [ ] No CMS, database, auth, search, analytics, AI chatbot, private archive
  browser, or major framework change was added.

## Knowledge Bank

- [ ] `docs/proofs-bank.md` is updated before website claims are strengthened.
- [ ] `docs/public-claims-inventory.md` tracks exact metrics, sensitive role
  claims, approval status, fallback wording, and owners.
- [ ] `docs/chad-lens.md` is used for final copy review.
- [ ] `apps/www/src/data/proofs.ts` matches the public-safe claims.
- [ ] Homepage and Technical Operations page draw from the same proof logic.
- [ ] Public metrics are softened unless explicitly approved.

## Public Safety

- [ ] `npm run public-safety` passes.
- [ ] No production-facing `TODO: Jamie approval required` appears.
- [ ] No placeholder resume appears.
- [ ] No private work items or draft work items appear in public data.
- [ ] Private paths, private transcript exports, credentials, env files, and
  private/proprietary font files are absent.
- [ ] Generic discussion of transcript workflows is not blocked.

## Routes And Indexing

- [ ] `npm run preflight:staging` passes.
- [ ] `npm run preflight:production` passes under Node 26.
- [ ] Production indexing is opt-in via `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- [ ] Canonical V1 routes appear in the sitemap.
- [ ] Temporary legacy redirects are in place.
- [ ] Resume PDF sends `X-Robots-Tag: noindex`.

## Review

- [ ] Jamie approves public contact path.
- [ ] Jamie approves resume PDF and phone-in-PDF behavior.
- [ ] Jamie approves exact metrics if any are promoted from the inventory.
- [ ] Screenshots, photos, quotes, collaborator names, and artifacts are
  approved before publication.
- [ ] Desktop, mobile 320px, keyboard/focus, and skip-link QA are complete.
- [ ] Staging smoke tests pass.
- [ ] Production smoke tests pass after Jamie approval.
