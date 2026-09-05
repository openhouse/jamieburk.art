# Audio-to-knowledge workflow RFC hill climb

## Decision

The exact public-safe RFC 0013 candidate is ready for Jamie Burkart's review.
It is not accepted and the runtime is not implemented. This change performed no
external upload and authorizes no graph promotion, publication, deployment,
indexing, merge, assignment, or deletion.

## Target

- RFC: `rfcs/0013-audio-to-knowledge-workflow.md`
- Contract: `rfcs/0013-audio-to-knowledge-workflow.contract.json`
- Provisional cases:
  `evals/knowledge-bank/audio-to-knowledge-workflow-rfc-evals.json`
- Evaluator: `scripts/rfcs/audio-to-knowledge-workflow-eval.mjs`
- Regression: `scripts/rfcs/audio-to-knowledge-workflow-eval.test.mjs`

The evaluated unit is the exact pairing of reader RFC, machine contract,
adversarial cases, and evaluator. Changed candidate bytes invalidate the
reported fingerprint.

## Observed failure

Before this change, no one contract proved the ordered transition from exact
audio custody through bounded context, provider return, diarization review,
source-loyal repair, private close reading, graph candidate, and human
disposition. Existing concepts could still be implemented as isolated scripts
without common resume, invalidation, completion, or authority semantics.

The first focused test was deliberately red because the evaluator did not
exist. The retained change adds the proposed RFC, a machine-readable contract,
38 provisional cases, and deterministic checks. It does not add the workflow
runtime.

## Rubric

The candidate must preserve:

1. ten exact, ordered, non-skippable, receipt-bearing stages;
2. eight distinct artifact layers;
3. preservation before transformation and no source deletion;
4. content-addressed, immutable, resumable, idempotent state;
5. minimum-necessary context with query, cutoff, and blind spots;
6. exact provider input and exact observed return;
7. evidence-bound speaker candidates with unknown-speaker support;
8. complete private repair, uncertainty, and bounded projection separation;
9. cited close reading with six evidence and action classes;
10. candidate-only graph output and separate public projection;
11. no raw bodies, protected locators, or private runtime dependency in the
    public surface; and
12. human gates for processing, upload, repair, interpretation, graph,
    quotation, attribution, and publication.

These are objective invariants, so no LLM judge is used. Narrative fairness,
usefulness, and adoption remain human questions.

## Development cases

The exact case file gives each example a failure-specific critique. The set has
two safe cases and 36 rejections covering stage order, receipts, invalidation,
artifact collapse, custody, provider completion, state mutation, context scope,
credential handling, speaker identity, inaudible reconstruction, repair
completeness, interpretive citations, action acceptance, graph promotion,
public leakage, private runtime dependence, and lost human gates.

Labels are provisional, were visible during development, and are pending
Jamie's review. There is no independent human holdout.

## Iteration record

### Baseline

The intentionally shallow baseline checked only ten stages, preservation before
transformation, and complete private repair. It retained both safe cases but
rejected only 2 of 36 unsafe cases.

- safe TPR: 100%
- unsafe TNR: 5.56%
- correct: 4 of 38

### Candidate

The evaluator was expanded across the full stage, artifact, custody, context,
provider, diarization, repair, interpretation, projection, public-boundary,
automation, and human-gate contract.

- safe TPR: 100%
- unsafe TNR: 100%
- correct: 38 of 38
- unexpected results: 0

The change is kept because unsafe-case rejection improved without losing a safe
case or weakening public safety, uncertainty, participant restrictions, human
authority, or the truthful proposal state.

## Open validation

This development score is not a production-quality estimate. Before the runtime
can be called reliable, add independently reviewed natural holdouts for dropped
calls, multiple segments, crosstalk, noise, speaker-count uncertainty,
multilingual speech, code-switching, provider interruption, partial exports,
chunk overlap, later context corrections, participant restrictions, source
recovery, and downstream invalidation.

Run:

```bash
npm run hillclimb:audio-to-knowledge-rfc
```

A green run approves only the exact proposal for human RFC review.
