# Launch Ledger

This is the canonical go / no-go ledger. Automated gates must pass on the exact
candidate commit; checked approval decisions are governed by
`approval-register.md`.

## Automated And Editorial Gates

- [x] Homepage, resume, Technical Operations, and work-item claims resolve to
  the knowledge bank.
- [x] Pending and private claims are excluded from public pages.
- [x] Careful claims retain contribution, collective-credit, and boundary
  language.
- [x] Metrics are approved or softened.
- [x] Source-Backed Team Memory omits private collaborator and client context.
- [x] Case studies use Known / Open / Protected where needed.
- [x] Citation, knowledge-bank, public-safety, route, build, staging, and
  production-mode checks pass on `develop` before this eval branch.
- [x] The same complete check suite passes on the final `feature/evals-H`
  candidate.

## Approved Public Decisions

- [x] Public email, LinkedIn, GitHub, resume PDF, and phone-in-PDF behavior are
  approved.
- [x] Current proof metrics and guarded claim wording are approved.
- [x] AI Evals completion certificate is approved as professional-development
  evidence.
- [x] Public-site screenshots added by `feature/evals-H` are approved for
  public PR review with their captions and source boundaries intact.
- [ ] Any additional collaborator-sensitive names, credits, screenshots,
  quotes, or photographs receive specific approval before publication.

## Candidate And Deployment Gates

- [x] Blind holdout review passes on the final candidate without a score
  regression.
- [ ] Jamie approves the exact final commit for production.
- [ ] Production Dokku configuration, domain cutover, TLS, smoke tests, and
  rollback plan are verified.
- [ ] Jamie explicitly approves production indexing.
