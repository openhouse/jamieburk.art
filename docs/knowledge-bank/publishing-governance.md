# Publishing Governance

## Claim Lifecycle

1. Add or revise a claim in `docs/knowledge-bank/claims.md`.
2. Record public sources or private-source posture in `sources.md`.
3. Add boundaries and anti-claims.
4. Project approved wording into `apps/www/src/data/proofs.ts`,
   `apps/www/src/data/work.ts`, or MDX pages.
5. Run public-safety and release checks.
6. Review staging before production.
7. Enable indexing only after Jamie approves the reviewed production surface.

## Staging And Production

Staging may carry noindex review state and warnings.

Production deploy and production indexing are separate gates. Production can be
deployed noindex for final review, then indexed after approval.

## Human Review

Automation checks for known hazards. Humans still review public tone, claim
strength, private boundaries, design, accessibility, and referral clarity.

## Repository Boundary

Private review materials may live locally outside git. They should not be
committed, copied into `apps/www/public`, or added to documentation as raw
evidence.

