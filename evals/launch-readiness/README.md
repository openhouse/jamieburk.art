# Portfolio Launch Readiness Evals

This suite turns the portfolio's launch intentions into a bounded optimization
target for implementation agents, browser agents, independent judge agents, and
human reviewers.

## Layers

1. **Source checks** detect public workflow language, employer-specific copy,
   missing application paths, unresolved launch state, media depth, structured
   citation breadth, proof/projection drift, missing outcome chains, unbounded
   platform-population language, and incomplete review or cutover protocols.
2. **Browser checks** visit every canonical route at 320, 375, 768, and 1440
   pixels and verify status, headings, overflow, browser errors, the resume PDF,
   and environment-specific indexing behavior.
3. **Judge criteria** score hiring-reader clarity, agency, role fit, evidence,
   Chad's lens, collective credit, public safety, visual proof, and completion
   confidence.
4. **Human gates** reserve production approval, media rights/consent,
   collaborator-sensitive credit, claim corroboration, and blind-reader
   validation for named people.

Committed semantic assessments are candidate-bound. The launch gate compares
the candidate commit, governed-content fingerprint, and suite fingerprint with
the current repository before accepting any score. Browser reports must refer
to the same candidate.

`blindSpotCoverage` in `suite.json` binds the eight current audit findings to
specific source, browser, judge, and human evaluations. Every ID must resolve;
the contract check rejects an omitted or invented criterion.

`chad-lens.md` defines the first-pass editorial criterion. It has a required
score of 4 and must cite evidence across the homepage, resume, role-fit page, and
flagship case studies.

## Commands

```bash
npm run check:evals
npm run test:evals
npm run eval:launch
npm run eval:launch:gate
npm run eval:candidate:snapshot

npm run eval:launch:browser -- \
  --url https://staging.jamieburk.art \
  --profile staging \
  --output reports/generated/launch-browser.json
```

Create an assessment from `assessment.template.json` using a fresh independent
judge and named human confirmations. Then run the complete release decision:

```bash
node scripts/evals/check-launch-readiness.mjs \
  --release \
  --assessment reports/generated/launch-assessment.json \
  --browser-report reports/generated/launch-browser.json \
  --output reports/generated/launch-readiness.json
```

All generated reports belong under `reports/generated/`, which is ignored. Do
not commit private prompts, private evidence, screenshots awaiting approval, or
human-review notes containing protected context.

The source contract also runs hostile semantic mutations. Unsupported
transformations such as silence to endorsement, appropriation to completed
funding, reaction counts to unique people, shared account to individual
authorship, or agent review to human validation fail closed.

## Interpreting Results

- `FAIL` is a release blocker.
- `GAP` is a quality target that should improve the judge score but does not by
  itself override a sound release decision.
- A passing source report is not a release decision without the browser report,
  independent judge assessment, and human gates.
- Follow `agent-loop.md` for recursive work and stop at its plateau, iteration,
  approval, or success conditions.
