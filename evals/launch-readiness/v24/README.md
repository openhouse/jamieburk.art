# Launch-readiness evals v24

Version 24 integrates the strongest controls from the frozen
`feature/evals-*` branch family while preserving every v23 criterion and
protected boundary. The visible portfolio remains composed and focused; the
deeper change is a stricter operating contract for recursive optimization.

The new layer adds:

- one active-version pointer while historical contracts remain runnable;
- canonical SHA-256 contract fingerprints and exact-commit binding;
- typed observer policies and semantic grader identity checks;
- fail-closed rejection of stale, duplicate, threshold-inconsistent, or
  impersonated observations;
- criterion domains so coverage gaps are inspectable without duplicating
  criteria; and
- query, report, and projection-drift tools that read the canonical knowledge
  bank directly.

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
npm run check:knowledge-operations
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

## Observation integrity

Every observation must include the exact current full Git SHA and the
`sha256:` fingerprint printed by `npm run eval:launch-readiness`. Each result
names a qualified grader type, stable identity, and unique run ID. Semantic and
human observers must be independent of the optimizer; human observers must be
real non-agent people. Invalid evidence is reported and cannot raise a score.

Historical v23 remains runnable with:

```bash
npm run eval:launch-readiness:v23
```

## Lens sources and boundaries

The criteria were informed by protected unofficial UCSC narrative evaluations,
a held recommendation screenshot, private correspondence, and a public 2006
Good Times Santa Cruz profile. Only the published article may support the
selected public lineage claim. The educational record, screenshot, and
correspondence remain protected and are not public endorsements.
