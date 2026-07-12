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

Names, credits, screenshots, quotes, photos, and collaborator-sensitive claims
remain omitted unless already public-safe or specifically approved.
