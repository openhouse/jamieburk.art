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
- [ ] Chad-lens review passes.

Jamie authorized launch preparation on 2026-07-11 and confirmed the current
public email, LinkedIn profile, and phone-in-resume behavior. Production
promotion remains gated by review and verification of one exact release SHA as
recorded in `docs/knowledge-bank/launch-blockers.md`.

## Known Dependency Advisory

As of 2026-07-12, `npm audit --omit=dev` reports the moderate PostCSS advisory
[`GHSA-qx2v-qp2m-jg93`](https://github.com/advisories/GHSA-qx2v-qp2m-jg93)
through Next.js 16.2.10's pinned PostCSS 8.4.31. The
current portfolio compiles repository-controlled CSS and does not accept
attacker-supplied CSS for stringification. The current Next.js release has no
patched dependency pin. Do not downgrade Next.js or force an unverified
override; recheck the advisory at release and adopt the upstream patch when it
is available. Any high or critical production advisory remains a release
blocker.
