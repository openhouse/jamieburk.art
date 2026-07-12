# Portfolio Claim Evals

This suite turns the portfolio's editorial intentions into repeatable tests for
LLM agents. It is designed for recursive improvement without allowing stronger
rhetoric to outrun evidence.

The suite evaluates two things separately:

1. **Hard gates:** truth, attribution, uncertainty, collective credit,
   public safety, Knowledge Bank alignment, and non-pathologizing language.
2. **Scored criteria:** hiring-reader clarity, actor/action/outcome structure,
   specificity, calibration, reader burden, voice, and transferable value.

An agent may revise a candidate only after independent evidence and
hiring-reader judges return a bounded revision brief. A candidate that fails a
hard gate is blocked even if it is otherwise persuasive.

## Run the deterministic check

```bash
npm run evals:portfolio
```

This command validates the eval schema, criterion weights, stop policy, fixture
references, and public-safety posture. It does not call an external model.

## Recursive driver

An orchestration agent should follow this loop:

```text
accepted = current approved candidate or empty

for iteration in 1..8:
  candidate = generator(evidence, rubric, accepted, prior_revision_brief)
  deterministic_result = deterministic_checks(candidate)
  if deterministic_result fails: revise

  evidence_result = evidence_judge(candidate, evidence, rubric)
  reader_result = hiring_reader_judge(candidate, evidence, rubric)

  if any hard gate fails: revise
  if candidate regresses from accepted: reject candidate
  if candidate scores higher without regression: accepted = candidate

  stop after two consecutive independent passes only when:
    weighted score >= 92
    every criterion >= 4
    calibration == 5
    every hard gate passes

return accepted plus unresolved criteria when the threshold is not reached
```

The generator must not be the deciding judge. Compare candidate and incumbent
blind to author and iteration number. Keep the best passing candidate rather
than the latest candidate.

## Judge response

Each judge should return structured JSON shaped like:

```json
{
  "hardGates": {
    "evidence-entailment": {
      "pass": true,
      "evidence": "Each consequential clause maps to the fixture.",
      "correction": ""
    }
  },
  "scores": {
    "hiring-reader-clarity": {
      "score": 5,
      "rationale": "Role and value are clear in one pass."
    }
  },
  "weightedScore": 94,
  "regressions": [],
  "revisionBrief": "Shorten the boundary clause without removing it.",
  "verdict": "accept"
}
```

## Why the stopping rule is strict

Recursive revision can reward confident language, evaluator agreement, or
surface polish while making a claim less true. The suite therefore requires:

- all hard gates to pass;
- calibration to score 5;
- two independent judges;
- two consecutive passing rounds;
- regression comparison against the accepted candidate;
- an explicit incomplete result when the threshold is not reached.

The goal is not endless optimization. The goal is a bounded claim that is
useful, humane, and defensible.

## Photo-evidence fixtures

The suite includes a dedicated `photo-evidence-boundary` hard gate. It prevents
an agent from treating People associations, album membership, or visual
plausibility as identity confirmation, consent, role attribution, or proof of an
outcome.

Five fixtures exercise the July 2026 photo-review intentions:

- `photo-coalition-corroboration` tests sustained presence without converting it
  into leadership, authorship, ownership, or campaign outcomes.
- `photo-cultural-hosting-material-practice` tests whether rooms, documents,
  artworks, tables, and traces of use become legible as participation
  infrastructure without turning guests into evidence objects.
- `photo-source-backed-memory-vocabulary` tests a material visual vocabulary
  without implying product maturity or client deployment.
- `photo-unsupported-project-attribution` tests the difference between
  attribution not established in this run and evidence that work did not happen.
- `photo-asset-publication-gate` requires all eight identity, context, rights,
  consent, claim, caption, crop, and final-placement checks before site use.

An LLM driver should run these fixtures through the same generator, independent
evidence judge, independent hiring-reader judge, regression comparison, and
stop policy as the rest of the suite. Do not lower the threshold to make a photo
claim pass.
