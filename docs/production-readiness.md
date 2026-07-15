# Production Readiness

This branch adds the knowledge-bank layer from the M-family
production-readiness review.

It includes:

- Public-safe knowledge bank in `docs/knowledge-bank/`.
- Structured proof data in `apps/www/src/data/proofs.ts`.
- Proof projection guidance for homepage, resume, Technical Operations, work
  cards, case studies, and lab pages.
- Chad-lens editorial guidance.
- One public-safety scanner that calls the focused knowledge-bank checker.
- Route checks for canonical pages, legacy redirects, sitemap discipline, and
  the absence of a public proofs route.
- Launch blockers for contact, resume, metrics, collaborator consent,
  screenshots, and production deploy.

Do not merge donor branches wholesale. This branch hand-composes the strongest
ideas from the production-readiness-composite family.

## Launch Gates

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] `npm run knowledge-bank`
- [ ] `npm run public-safety`
- [ ] `npm run check:routes`
- [ ] `npm run evals:knowledge-lifecycle`
- [ ] `npm run evals:chad`
- [ ] `npm run evals:callnyc-x`
- [ ] `npm run evals:wowlist-x`
- [ ] `npm run evals:recursive`
- [ ] `npm run preflight:staging`
- [ ] `npm run preflight:production`
- [ ] Docker build
- [ ] Docker run
- [ ] Route smoke tests
- [ ] Knowledge-bank review
- [ ] Chad-lens review
- [ ] Proof projection review
- [ ] Jamie final approval

## Manual Review Checklist

- [ ] Every homepage proof claim exists in the knowledge bank.
- [ ] Every resume-page proof claim exists in the knowledge bank.
- [ ] Every Technical Operations proof row exists in the knowledge bank.
- [ ] Work items with strong claims have proofBankIds.
- [ ] Pending/private claims are not projected onto public pages.
- [ ] Careful claims include their guardrails.
- [ ] Metrics are approved or softened.
- [ ] Collaborator-sensitive claims are approved or omitted.
- [ ] Source-Backed Team Memory does not expose private collaborator/client
  context.
- [ ] Case studies use Known / Open / Protected where needed.
- [ ] Public-safety scanner passes.
- [ ] Knowledge-lifecycle eval scores at least 95/100 with no hard failures.
- [ ] CallNYC X corpus eval scores 100/100 with no hard failures.
- [ ] WOW List X corpus eval scores 100/100 with no hard failures.
- [ ] Recursive eval protocol passes.
- [ ] Chad-lens eval scores at least 90/100 with no hard failures.
- [ ] Human Chad-lens review passes; the automated score is a regression gate,
  not a substitute for editorial judgment.

Production deploy remains blocked until Jamie explicitly approves the reviewed
content and release.
