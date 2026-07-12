# Portfolio Launch Readiness Evals

This suite turns the portfolio's launch intentions into a bounded optimization
target for implementation agents, browser agents, independent judge agents, and
human reviewers.

## Layers

1. **Source checks** detect public workflow language, employer-specific copy,
   missing application paths, unresolved launch state, media depth, and
   structured citation breadth.
2. **Browser checks** visit every canonical route at 320, 375, 768, and 1440
   pixels and verify status, headings, overflow, browser errors, the resume PDF,
   and environment-specific indexing behavior.
3. **Judge criteria** score hiring-reader clarity, agency, role fit, evidence,
   Chad's lens, collective credit, public safety, visual proof, and completion
   confidence.
4. **Human gates** reserve production approval, media rights/consent, and
   collaborator-sensitive credit for named people.

`chad-lens.md` defines the first-pass editorial criterion. It has a required
score of 4 and must cite evidence across the homepage, resume, role-fit page, and
flagship case studies.

## Commands

```bash
npm run check:evals
npm run test:evals
npm run eval:launch
npm run eval:launch:gate

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

## Interpreting Results

- `FAIL` is a release blocker.
- `GAP` is a quality target that should improve the judge score but does not by
  itself override a sound release decision.
- A passing source report is not a release decision without the browser report,
  independent judge assessment, and human gates.
- Follow `agent-loop.md` for recursive work and stop at its plateau, iteration,
  approval, or success conditions.
