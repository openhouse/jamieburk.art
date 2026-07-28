# Pre-Launch Evaluation Audit

Date: 2026-07-28

Candidate: `feature/pre-launch-C`

Status: launch-decision support; not production approval

## Method

This audit examined the repository's actual evaluation contracts, mutation
tests, candidate-bound receipts, generated reports, and public-safety checks.
It also used a static, read-only review of the complete `SKILL.md` documents in
Hamel Husain's `evals-skills` repository. No downloaded code was executed.

The audit applies the skills where they fit this portfolio and records where
they do not. It does not treat an LLM score, a passing build, or an automated
report as a substitute for Jamie's release decision.

## Observed Failure Taxonomy

| Failure mode observed in this repository | Current control | Remaining human gate |
| --- | --- | --- |
| Evidence survives after the candidate changes | Whole-candidate fingerprints, exact-file hashes, freshness tests, and holdout invalidation | Review must be repeated after any candidate-affecting change |
| A public evaluation receipt exposes a local path or private process identifier | Public-safety scan, mutation tests, v3 public review receipts, and judgment-payload digests | Private orchestration evidence remains private |
| A high aggregate score conceals a failed invariant | Blocking criteria, deterministic tests, and non-compensating hard gates | Jamie decides whether unresolved non-technical gates permit release |
| Raw testimony or private research material enters public Git | Corpus builders preserve event, speaker, provenance, and recovery metadata without publishing third-party transcript payloads | Rights, quotation, and context review remain open |
| A photograph is selected without complete occurrence, rights, credit, or visible-rendering evidence | Governed occurrence bindings, derivative checks, visible credit tests, and public-safety checks | Jamie approves use, crop, credit, and publication |
| Generated indexes and reports drift from canonical records | Currentness checks regenerate and compare derived artifacts | Material changes still require editorial review |
| Every edit triggers every expensive semantic review | Path-to-domain impact routing and candidate-bound carry-forward rules | Semantic review runs whenever its evidence or candidate actually changes |

## Audit Findings

### Error analysis

The suite contains repository-specific negative tests for failures already
encountered: stale fingerprints, semantic rubric drift, private locator
leakage, incomplete photo bindings, absent transcript provenance, and generated
artifact drift. These are stronger than a generic checklist because each test
reproduces a concrete failure.

The repository does not yet contain a sufficiently large set of real hiring
reader sessions or production incidents to claim that the taxonomy is
complete. Post-launch reader observations should be added as labeled cases,
not converted directly into new judge criteria.

### Evaluator design

Objective requirements are primarily checked in code. Independent semantic
reviews remain supporting evidence for composition, source integrity, and
hiring legibility. They are not allowed to override failed deterministic
checks.

The composite holdouts still span several related criteria. Splitting them into
one-failure-mode binary judges may improve diagnostic precision, but doing so
would alter a release control. That redesign is deferred until it can be
calibrated against human labels; it is not being used to lower the current
launch threshold.

### Judge validation

The independent LLM reviews have exact-candidate receipts and complete
judgments, but they have not been calibrated against a balanced human-labeled
dataset. The repository therefore does not report true-positive or
true-negative rates and does not call these judges validated evaluators.

They remain bounded review evidence. Jamie's approval, collaborator-sensitive
credit and consent review, photography rights approval, deployment, and
production indexing remain explicit human gates.

### Human review

The system distinguishes technical verification from approval. A green
candidate can be ready for Jamie's final review while still being unapproved
for production. Hiring-reader usability, collaborator correction, exact photo
credit and crop, and production indexing cannot be inferred from automated
success.

### Labeled and synthetic data

Mutation fixtures are used to prove that deterministic checks fail when
specific contracts are broken. They are regression tests, not substitutes for
real-world labels. Synthetic cases should continue to be derived from observed
failures and should not be presented as evidence of hiring effectiveness.

### Retrieval and review interfaces

This V1 portfolio has no production retrieval-augmented generation system, so a
RAG evaluation would measure an architecture that does not exist. The
Knowledge Wiki's static graph, source, claim, and citation checks remain the
appropriate retrieval controls.

A new review application is also out of scope for V1. Existing Markdown and
JSON reports are sufficient for the current human review without adding a
database, authentication system, dashboard, or private archive browser.

## Cost-Aware Run Policy

1. Run deterministic checks for every affected domain.
2. Reuse semantic evidence only when its complete candidate fingerprint,
   rubric digest, evidence bundle, and freshness contract remain unchanged.
3. Invalidate all candidate-bound semantic evidence after a candidate-affecting
   edit.
4. Run independent holdouts once, after deterministic stabilization and
   candidate freeze.
5. Keep private process identifiers and machine locators outside public Git.
   Public reviewer labels bind judgments for audit but do not authenticate
   process identity; separate commissioning remains an orchestration fact.
6. Stop when all hard gates pass twice on the same candidate; do not rerun
   semantic panels merely to accumulate confidence.

## Post-Launch Calibration Queue

1. Observe 20 to 50 unfamiliar hiring readers and collaborators using the
   portfolio, recording one decision-relevant outcome per session.
2. Label concrete pass and fail cases by failure mode, with human rationale.
3. Hold out an untouched test set before revising semantic judge prompts.
4. Report per-criterion false-positive and false-negative behavior rather than
   a single aggregate score.
5. Consider atomic binary judges only after the human-labeled examples are
   sufficient to validate them.

## Launch Interpretation

A complete run establishes that one exact candidate satisfies the repository's
technical and evidentiary contracts. It does not establish consent, production
approval, deployment, indexing, or hiring effectiveness. Those claims require
the named human and real-world gates.
