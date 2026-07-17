# Launch-Readiness Evals

This suite turns the portfolio's launch intentions into repeatable evidence for
human reviewers and LLM agents.

It deliberately separates:

- **hard gates**, which may never be averaged away;
- **runtime cases**, which test real reader tasks and browser behavior;
- **judge criteria**, which score clarity, care, evidence, and professional
  legibility;
- **hill-climb rules**, which govern recursive improvement.

The weighted rubric includes an explicit **Chad lens**: a hiring reader should
see Jamie as the actor, understand what became usable and why it fits the target
role, and reach the supporting proof without carrying secondary archive or
publication-governance complexity. This criterion cannot pass by deleting
evidence, collective credit, or protected boundaries; those records must remain
available and accurate without dominating the primary path.

## Commands

```bash
npm run check:launch-evals
npm run test:launch-evals
npm run report:launch-evals
```

`npm run check` includes the first two commands. The report is generated at
`reports/generated/launch-readiness.md` and is not committed.

## Agent Loop

1. Begin from a clean branch and record the base SHA.
2. Run every hard gate.
3. Execute every runtime case against the candidate build.
4. Give a fresh judge the public observations, `evals.json`, and `judge.md`.
5. Pass the returned scores through the deterministic scorer.
6. Improve the lowest criterion with one bounded change.
7. Retain the change only when all invariants still pass and the objective
   improves.
8. Stop only at the criterion encoded in `hillClimb.stopWhen`.

An agent must not optimize through disclosure, inflated claims, erased
qualifiers, reduced accessibility, or a different deployment SHA. Those are
failed runs, regardless of the weighted score.
