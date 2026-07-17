# Blind-Spot Readiness Evals

## Purpose

This suite turns seven consequential portfolio blind spots into a durable
objective function:

1. role-specific contribution and collaborator corroboration;
2. contribution-to-decision pathways and the causal middle;
3. cold-reader hiring and referral comprehension;
4. metric definitions, denominators, and uncertainty;
5. public argument selection and editorial proportion;
6. consent, contextual integrity, and archive trace bias; and
7. independent adversarial and live-use validation.

The machine-readable rubric lives at
`.agents/evals/blind-spot-readiness.json`.

## Two Thresholds

- **Development readiness** means the repository has represented each blind
  spot honestly, associated it with actionable evidence, and built a safe path
  for resolving it. It does not imply that external or human validation has
  occurred.
- **Release readiness** additionally requires two passing independent judgments
  on an unchanged candidate, completed cold-reader observations, live-use QA,
  and Jamie's approval of the exact candidate.

The distinction matters. A system can prepare a good cold-reader protocol, but
it cannot award itself a human observation. It can prepare a holdout packet, but
it cannot call its own review independent.

## Recursive Protocol

1. Freeze the rubric and candidate commits.
2. Run the suite validator and deterministic source contracts.
3. Score every criterion with a fresh judge that did not author the patch.
4. Select one failed blocker or largest weighted gap.
5. Make the smallest evidence, governance, or presentation change that addresses
   that failure.
6. Rerun all repository checks and use a new judge.
7. Stop at an explicit human, consent, access, or external-transfer boundary
   rather than fabricating evidence.
8. Require two passing judgments on the exact unchanged candidate before
   recording threshold completion.

## Commands

```text
npm run evals:blind-spots
npm run test:blind-spot-evals
npm run evals:blind-spots:score -- path/to/run.json
```

The standard `npm run check` command runs the validator and tests.
