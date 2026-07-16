# Launch-readiness evals v23

Version 23 adds Margaret Morse and Warren Sack lenses to the portfolio's
explicit evaluation work. It retains every v22 factual, archival, citation,
public-safety, accessibility, deployment, approval, and blind-spot boundary.

The new layer covers:

- embodied, artistic, relational, spatial, and hospitable intelligence;
- recursive social-systems thinking, prototyping, and physical/digital context;
- deliberate public selection from a deeper knowledge bank;
- unprimed hiring-reader comprehension, trust, recall, and action;
- decisive visual proof rather than decorative or press-only imagery;
- archive and survivorship bias;
- bounded consequence without causal inflation;
- present-tense and future role relevance;
- collaborator review and social truth;
- holdout evaluation outside the known rubric; and
- maintenance burden as the bank and eval suite grow.

`blind-spots.json` maps each concern to criteria, required observers, failure
signals, evidence actions, and stop boundaries. A mapped blind spot is not a
resolved blind spot. `BLINDSPOT-001` validates only that the work cannot
silently disappear or be self-certified by an agent.

## Target

The objective remains lexicographic:

1. every hard gate passes;
2. no scored criterion is below `0.8`;
3. the weighted score is at least `0.9`;
4. required human approvals are explicit; and
5. the result repeats across two independent runs for one commit, with two
   independent semantic graders.

An agent must never trade public safety, factual accuracy, collective credit,
accessibility, citation coverage, or rights clearance for a higher score.

## Commands

Validate the suite and blind-spot map:

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

1. Run the current suite and all repository checks.
2. Select the lowest failing mutable criterion.
3. State one causal hypothesis and make one bounded change.
4. Re-run that criterion and every previously passing hard gate.
5. Keep the change only if the lexicographic objective improves without
   weakening a protected invariant.
6. Record the attempt in `hill-climb-log.md`.
7. Stop when the next unmet criterion requires a real reader, collaborator,
   rights holder, deployed runtime, or Jamie's approval.

An LLM may prepare materials for a human criterion. It may not generate the
human observation that passes it.

## Lens sources and boundaries

The criteria were informed by protected unofficial UCSC narrative evaluations,
a held recommendation screenshot, private correspondence, and a public 2006
Good Times Santa Cruz profile. Only the published article may support the
selected public lineage claim. The educational record, screenshot, and
correspondence remain protected and are not public endorsements.
