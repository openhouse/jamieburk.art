# Launch Blockers

Automated checks, human review, external research, and release authorization are
different states. Automated success can establish repository consistency; it
cannot provide consent, count as an external participant, settle a disputed
role, or authorize production. The machine-readable companion is
`docs/qa/release-status.json`.

## Automated regression gates

These checks are rerun for the exact candidate. Their results do not authorize
production.

- [x] `npm run check`
- [x] `npm run preflight:staging`
- [x] `npm run preflight:production`
- [x] `npm run evals:knowledge-lifecycle`
- [x] `npm run evals:chad`
- [x] `npm run evals:callnyc-x`
- [x] `npm run evals:wowlist-x`
- [x] `npm run check:nycartc-corpus`
- [x] `npm run evals:nycartc-x`
- [x] `npm run evals:urbanhermit-x`
- [x] `npm run evals:nycac-facebook-events`
- [x] `npm run evals:nycac-institutional-interface`
- [x] `npm run evals:blind-spots`
- [x] `npm run evals:recursive`

The aggregate blind-spot command independently hard-gates:

- [x] verified outcomes and sustained adoption;
- [x] exact-role corroboration posture;
- [x] external hiring-comprehension posture;
- [x] present-tense offer clarity;
- [x] visual and artifact proof posture;
- [x] archival survivorship posture;
- [x] release-governance and eval-overfitting controls.

## Human and external gates

- [ ] Five real no-coaching hiring-comprehension sessions meet the external
  criterion.
- [ ] Human Chad-lens editorial review passes.
- [ ] Jamie approves public email/contact and phone-in-PDF behavior.
- [ ] Jamie approves metric wording and the resume PDF.
- [ ] Collaborators approve any names, credits, screenshots, quotes, photos, or
  exact-role details that are not already public-safe.
- [ ] Jamie approves the exact final commit for production deployment.

## Current decision

Production remains blocked pending human approval. The website may still be
reviewed as a staging or job-application candidate when the relevant public
safety, resume, contact, and claim-projection checks pass.
