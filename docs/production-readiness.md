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
- A separate composite integration suite for agency, operator tooling,
  composition, archival survivorship, evaluator trust, and truthful human
  gates. The frozen 27-eval portfolio suite remains unchanged.

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
- [ ] `npm run check:knowledge-composite-evals`
- [ ] `npm run test:knowledge-composite-evals`
- [ ] `npm run check:compiled-lifecycle-leaks`
- [ ] `npm run preflight:staging`
- [ ] `npm run preflight:production`
- [ ] Docker build
- [ ] Docker run
- [ ] Route smoke tests
- [ ] Knowledge-bank review
- [ ] Chad-lens review
- [ ] Proof projection review
- [ ] Two independent read-only holdouts bind the same contract, candidate
  fingerprint, and implementation commit
- [ ] `PR-019` target-reader review on the exact candidate
- [ ] `PR-025` hands-on keyboard, screen-reader, mobile, PDF, metadata, and
  trusted-reader QA on the exact candidate
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
- [ ] Chad-lens review passes.

Production deploy remains blocked until Jamie explicitly approves the reviewed
content and release.

## Gate Profiles

Passing `.agents/evals/knowledge-composite-integration.json` means the
integration is ready for code review. It does not approve application sharing
or production.

- **Code review:** composite score and deterministic gates pass, existing
  suites do not regress, and two unchanged-candidate holdouts pass.
- **Application sharing:** code review passes and `PR-019` records independent
  target-reader response to the exact candidate.
- **Production:** application sharing passes, `PR-025` hands-on QA passes,
  rights and collaborator decisions are complete for published artifacts, and
  Jamie approves the exact commit and index policy.

Use `stop_human_blocked` when the machine work is complete and a remaining gate
belongs to a person. Do not convert a prepared checklist into completed review.
