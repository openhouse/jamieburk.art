# Portfolio Readiness Evals

This suite turns application and production intentions into repeatable evidence
and stopping conditions. It does not replace human editorial judgment, public
safety review, collaborator consent, or Jamie's production approval.

## Profiles

- `application_ready` asks whether a hiring reader can understand Jamie's role,
  inspect defensible proof, reach the resume and contact path, and use the site
  across common viewport and access conditions.
- `production_ready` adds approved visual evidence, deployment provenance,
  production smoke and rollback evidence, indexing verification, and explicit
  approval of the exact candidate.

Application-ready deliberately permits production work to remain open. A
passing application score must never be described as production approval.

## Commands

```bash
npm run test:evals
npm run evals:application
npm run evals:production
```

The runner writes ignored machine-readable reports under `reports/generated/`.
The production profile fails closed unless deployment and approval evidence are
provided through the variables named by the runner.

Application-ready also fails closed unless the candidate content fingerprint
matches browser evidence and at least five passing judgments from unique judge
IDs using distinct review lenses. Three are dedicated: `chad-editorial`,
`margaret-morse`, and `warren-sack`. Each dedicated judgment must score its own
criterion at least 3. Every judgment binds both the candidate fingerprint and
the evaluation-contract fingerprint, so changing either the public surface or
the rules invalidates prior approvals. Judgment files live under
`evals/portfolio-readiness/judgments/<profile>/`; changing an evaluated public
surface invalidates them automatically.

For the production profile, provide deployment evidence explicitly:

```bash
EVAL_EXPECTED_SHA=<candidate-sha> \
EVAL_DEPLOYED_SHA=<deployed-sha> \
EVAL_PRODUCTION_SMOKE=pass \
EVAL_ROLLBACK_READY=true \
EVAL_PRODUCTION_INDEXING=pass \
EVAL_STAGING_NOINDEX=pass \
EVAL_HUMAN_APPROVAL=approved \
npm run evals:production
```

Set `EVAL_HUMAN_APPROVAL` only after Jamie approves the exact candidate and
deployment. Environment values are attestations; deployment review must retain
the underlying smoke, indexing, and rollback evidence.

## Recursive Protocol

1. Freeze the suite and baseline candidate.
2. Run deterministic gates and the required independent model judges.
3. Select the highest-weight failing criterion.
4. Make one bounded change and name the quality it must preserve.
5. Build and evaluate from a fresh environment.
6. Compare baseline and candidate without identifying which is newer.
7. Accept only when all hard gates pass, the target improves, and no protected
   dimension regresses.
8. Record evidence, score movement, unresolved limits, and the next action.
9. Require the configured number of consecutive passing runs.
10. Stop. Additional improvements begin a new optimization cycle.

## Chad Lens

The Chad criterion asks whether the portfolio practices courageous precision:
Jamie is visible, the actual work and useful outcome are legible in one pass,
specialized language is translated, collective credit is preserved, and strong
defensible results are neither apologized for nor inflated. Deterministic checks
locate known meta-narration and unexplained terminology. The dedicated judge
applies the broader editorial standard in `chad-lens-judge.md`.

## Margaret Morse Lens

The Morse criterion protects the continuity among Jamie's artistic, civic,
technical, and social practices. It recognizes embodied and performative
inquiry, material and spatial experimentation, participation, memory, place,
and the ways people inhabit structures. The public composition must make this
depth accessible without reducing it to organizational utility or disclosing
private educational records. The dedicated standard lives in
`margaret-morse-lens-judge.md`.

## Warren Sack Lens

The Sack criterion asks whether Jamie's recursive relational method is
legible: relationships become models; models become prototypes, interfaces, or
operating structures; and digital information reconnects with physical and
social situations. It also protects source rigor, collaborative architecture,
multimodal evidence, and right-sized individual credit. The dedicated standard
lives in `warren-sack-lens-judge.md`.

## Editorial Review

Use `evals/portfolio-readiness/model-judge.md` for rendered-site review. Model
judges must cite public routes and visible behavior. They may not use private
archives, hidden chain-of-thought, or unpublished source material as evidence.

The strongest optimization target is not the longest page or largest claim. It
is the smallest change that reduces the right reader's burden while preserving
truth, care, and the site's distinct voice.
