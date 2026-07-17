# Launch-readiness evals v20

This suite turns the portfolio's publication intentions into a recursive
optimization contract for human and LLM collaborators.

Version 20 adds `ARCHIVE-003`, a deterministic participation-lineage gate. It
requires the WOW List production snapshot and Sunday Dinner attendance-signals
workbook to remain protected, fingerprinted, aggregate-only, and explicit
about denominators and data quality. It also requires atomic public-source
edges for Call Script, `popular.vote`, the January 2017 DCA discussion, and the
first recovered NYC Artist Coalition general meeting. The synthesis must remain
a held inference, while Jamie's personal authorship and facilitation remain an
open collaborator-review question. It retains every v19 criterion and
protected invariant.

The target is lexicographic:

1. every hard gate passes;
2. no scored criterion is below `0.8`;
3. the weighted score is at least `0.9`;
4. required human approvals are explicit;
5. the result repeats across two consecutive runs with two independent
   semantic graders.

An agent must never trade public safety, factual accuracy, collective credit,
accessibility, or rights clearance for a higher readability or visual score.

## Commands

Validate the suite:

```bash
npm run check:launch-evals
```

Report deterministic findings and evidence still required:

```bash
npm run eval:launch-readiness
```

Evaluate two completed independent observation files as a release gate:

```bash
npm run eval:launch-readiness:strict -- \
  --observations evals/launch-readiness/runs/<run-a>.json,evals/launch-readiness/runs/<run-b>.json
```

## Recursive hill climb

1. Run the report and existing repository checks.
2. Select the lowest failing mutable criterion; an agent cannot satisfy a
   human approval gate.
3. State one causal hypothesis and make one bounded change.
4. Re-run the target and all previously passing hard gates.
5. Keep the change only when the lexicographic objective improves without
   weakening a protected invariant.
6. Continue until the target is reached or the next unmet criterion requires
   human approval, rights clearance, unavailable evidence, or three failed
   bounded attempts.
