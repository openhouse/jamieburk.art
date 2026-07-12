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
- Recursive evals protocol for claim accuracy, boundary review, hiring clarity,
  web QA, and production cutover readiness.
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
- [ ] `npm run check:chad-lens` (10/10)
- [ ] `npm run check:evals`
- [ ] `npm run check:routes`
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
- [ ] Public pages contain no TODO, placeholder, pending approval,
  before-launch, or screenshot-pending language.
- [ ] Careful claims include their guardrails.
- [ ] Metrics are approved or softened.
- [ ] Collaborator-sensitive claims are approved or omitted.
- [ ] Source-Backed Team Memory does not expose private collaborator/client
  context.
- [ ] Case studies use Known / Open / Protected where needed.
- [ ] Public-safety scanner passes.
- [ ] Chad-lens deterministic eval passes at 10/10 and manual review confirms
  the wording remains accurate, natural, and collectively responsible.

Production deploy remains blocked until Jamie explicitly approves the reviewed
content and release.
