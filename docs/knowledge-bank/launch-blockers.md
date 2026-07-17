# Launch Blockers

**Current release state: held.** The machine-readable
[`readiness-ledger.json`](./readiness-ledger.json) is the canonical blind-spot
inventory. The latest eval output controls machine status; the approval
register controls permission; Jamie's explicit release decision controls
production publication.

## Machine Gate

- `KD-014`, `KD-016`, `KD-017`, `KD-019`, `KD-020`, `KD-021`, `KD-022`, and `KD-023`
  are locally executable controls for role-claim routing, readiness
  reconciliation, outcome distinctions, technical and commercial legibility,
  corpus safety, future-offer clarity, and the structural preflights for the
  Margaret Morse and Warren Sack lenses. `KD-015` and `KD-018` remain human
  gates below; `KD-022` and `KD-023` also retain independent judgments below.
- Run `npm run check:knowledge-development` for the maintained local evidence,
  governance, safety, and content contract.
- Run `npm run check` and the production preflight on the exact release
  candidate.
- Run `npm run check:composite-integration` and bind its candidate manifest to
  the exact build, preflight, Docker, route, and responsive evidence.
- The complete composite gate must remain held while `CI-007`, `CI-008`,
  `CI-009`, or `CI-012` lacks its fingerprint-bound independent or human
  judgment.
- Do not reinterpret a local-gate pass as completion of independent judgment,
  human research, visual rights, or release approval.

## Independent Judgment

- [ ] `KD-006`: a blind reviewer passes collective credit and calibrated
  causality on the current candidate fingerprint.
- [ ] `KD-012`: a blind hiring-oriented reviewer passes Chad's lens on the
  current candidate fingerprint.
- [ ] `KD-022`: an independent reviewer passes the Margaret Morse lens on the
  current candidate fingerprint; the local structural preflight cannot award
  the final qualitative score.
- [ ] `KD-023`: an independent reviewer passes the Warren Sack lens on the
  current candidate fingerprint; the local structural preflight cannot award
  the final qualitative score.

## Human Research And Approval

- [ ] `KD-015`: at least three independent hiring readers complete the
  comprehension protocol.
- [ ] `KD-018`: the five-project visual edit clears rights, consent, identity,
  sensitivity, claim fit, caption, and credit review.
- [ ] Jamie approves the exact resume PDF, phone-in-PDF behavior, public
  contact path, and final proof metrics for the release candidate.
- [ ] Collaborators approve any non-public names, credits, screenshots,
  quotations, or photographs selected for production.

## Release Decision

- [ ] The full release gate passes twice on an unchanged candidate.
- [ ] Jamie approves the exact production commit and indexing policy.
- [ ] Production smoke tests pass after deployment.
