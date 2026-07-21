# Portfolio Blind-Spot Evals

These evals turn eight known weaknesses into explicit evidence contracts. They
supplement the application, production, and knowledge-lifecycle suites; they do
not replace them.

## Two Different Results

The `diagnostic` profile passes when every blind spot has a valid current
disposition and supporting evidence. A diagnostic pass means the system is
looking honestly. It does not mean the blind spots are closed.

The `closure` profile passes only when all eight evaluations pass. Missing
visual rights review, human-reader research, production attestations, or
editorial decisions must fail or remain blocked rather than being inferred from
LLM judgment or repository structure.

```bash
npm run test:blind-spots -w @jamie-burkart/www
npm run evals:blind-spots -w @jamie-burkart/www
npm run evals:blind-spots:closure -w @jamie-burkart/www
```

The normal application check runs the tests and diagnostic. Closure is an
explicit command because known human and production work remains unfinished.
Reports are written to ignored files under `reports/generated/`.

## The Eight Evals

### Actual-work visual evidence

Closure requires at least twelve rights-approved, public-safe artifacts across
the six selected case studies. Each artifact must have context, useful alt text,
a public file, and associated claim IDs. Text that merely says "screenshot" or
"photo" is not visual evidence.

Optional evidence file: `evals/blind-spots/evidence/visual-evidence.json`.

### Decisive hiring narrative

The exact application candidate must pass role clarity, role fit, reader effort,
Chad's lens, the application path, and candidate-bound model review. This asks
whether the site itself communicates role, work, outcome, and fit. It is not a
substitute for human-reader testing.

### Individual-role attribution

Five high-value inquiries are tracked: Office of Nightlife contribution,
nightlife town-hall production, Talks Not Raids and M.A.R.C.H., Cabaret Law
causal allocation, and CallNYC Council-account engagement. Partial and
inconclusive inquiries must remain open and cannot lend immature role
inferences to active projections.

### Archive denominator integrity

Ten social corpus records must state what population was actually recovered and
what the capture cannot establish. Current authenticated views never silently
become immutable lifetime populations, audited impact, authorship, attendance,
or endorsement.

### External human-reader validation

Closure requires at least five target-role readers to inspect the exact
candidate and answer the same three comprehension tasks: Jamie's role, the work
he performed, and the useful outcome. The aggregate record also captures
interview interest. Store no names, contact details, or raw participant notes.

Optional evidence file: `evals/blind-spots/evidence/human-reader-validation.json`.

### Change reviewability

The default thresholds are fifty changed files, ten thousand added lines, and
two thousand added lines in any single file. A larger branch passes only with a
candidate-bound decomposition into independently reviewable units and explicit
human approval. The decomposition must account for every changed path and each
review unit must independently remain within the thresholds.

Optional evidence file: `evals/blind-spots/evidence/reviewability.json`.

### Production release evidence

Closure requires the exact reviewed and deployed Git SHA, production smoke,
rollback readiness, production indexing, staging noindex, and Jamie's approval.
It uses the same environment-variable names as the production-readiness suite.

### Strong-claim promotion discipline

Every mature, public-safe, editorially unused claim must receive a current
decision: `promote`, `defer`, or `not-for-current-purpose`, with a rationale.
This does not automatically publish claims. It prevents cautious omission from
becoming an invisible permanent default.

Optional evidence file: `evals/blind-spots/evidence/promotion-decisions.json`.

## Review Rule

Work one open criterion at a time. Never close a blind spot by weakening its
contract, inventing missing evidence, publishing protected material, or treating
a proxy as the thing it was meant to measure.
