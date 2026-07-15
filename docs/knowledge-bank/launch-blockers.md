# Launch Blockers

The recursive launch evaluator in `scripts/run-launch-evals.mjs` enforces the
machine-checkable gates. Its generated report is local build evidence, not a
public portfolio surface.

## Automated gates

- [x] Public proof projections resolve to canonical claims and citations.
- [x] Pending/private claims remain off public surfaces.
- [x] Public-safety, route, build, environment, and resume artifact checks are
  wired into `npm run prelaunch:production`.
- [x] Known mobile overflow causes are repaired without global concealment.
- [x] Production cutover and rollback commands are documented.
- [x] Chad-lens legibility passes as an automated hard gate: actor, purpose,
  usable outputs, bounded proof, and reader path are explicit.
- [x] Knowledge lifecycle passes as an automated hard gate: intake has no
  silent loss, claims have publication decisions, and every public proof has a
  source-coverage disposition.
- [x] CallNYC full-population archival production passes as an automated hard
  gate: 107 recovered items plus three unresolved slots reconcile to the 110
  observed profile count, and stakeholder and outcome boundaries are
  item-level recomputed.
- [x] WOWList full-population archival production passes as an automated hard
  gate: all 38 items in the current live-profile control reconcile at item
  level, posted URLs resolve, and authorship, adoption, and impact boundaries
  remain explicit.
- [x] Eleven portfolio blind-spot controls pass as automated hard gates: each
  has an owner, evidence requirements, anti-gaming rule, stop rule, next action,
  and linked manual gate while preserving `required-not-run` human status.

## Human gates

- [ ] Jamie approves any replacement or visual reflow of the currently
  approved two-page resume PDF. The present PDF remains valid but has one
  visually orphaned continuation bullet on page two.
- [ ] A hiring reviewer passes the 30-second comprehension test across the
  homepage, Technical Operations, and Resume.
- [ ] Every open pull request targeting `develop` is active and owned, or is
  closed/labeled as superseded.
- [ ] Jamie explicitly approves the exact production candidate SHA and deploy.
- [ ] Postdeploy health, robots, sitemap, canonical-host, key-route, and resume
  checks pass.
- [ ] Five dated real job descriptions receive frozen-site role-fit scorecards.
- [ ] Three unfamiliar, unbriefed reviewers pass the public-site comprehension
  holdout.
- [ ] Priority contribution, outcome, technical, and collaboration matrices
  receive independent or collaborator review with publication permissions.
- [ ] Five leading visual packages receive evidence, rights, consent, alt-text,
  and caption review.
- [ ] The longitudinal thesis, application cadence, and agency language receive
  independent editorial review.
- [ ] Branch-family PR ownership and supersession are resolved before Jamie
  approves an exact production candidate SHA.

Names, credits, screenshots, quotes, photos, and collaborator-sensitive claims
remain omitted unless already public-safe or specifically approved.
