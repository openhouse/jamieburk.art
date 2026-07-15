# Recursive Improvement Protocol

This protocol lets an implementation agent hill climb without turning the
portfolio into an unbounded rewrite.

## Objective Order

Compare candidate states lexicographically:

1. fewer hard-gate failures;
2. fewer public-safety or judge-floor violations;
3. higher weighted judge score;
4. fewer quality-target gaps;
5. smaller and more reversible diff.

Never trade a higher-ranked objective for a lower-ranked one.

## One Iteration

1. Run `npm run eval:launch` and the appropriate browser eval.
2. Obtain an independent judge assessment with `judge-prompt.md`.
3. Select the highest-ranked failing criterion. Work on one criterion unless a
   single root cause clearly explains several failures.
4. State the proposed change, expected score movement, evidence to verify, and
   guardrails that must remain true.
5. Apply the smallest coherent patch.
6. Run `npm run check`, `npm run eval:launch`, the browser eval, and a fresh
   independent judge pass.
7. Compare before and after with `npm run eval:launch:compare -- before.json after.json`.
8. Keep the patch only when the comparison accepts it and no human gate was
   self-certified.

## Stop Conditions

Stop successfully when all of these are true:

- zero source and browser hard-gate failures;
- weighted judge score is at least 90;
- every judge criterion meets its configured floor;
- `public-safety-and-boundaries` is 4;
- every required human gate is confirmed by its named owner;
- the primary production domain passes the current-portfolio fingerprint check;
- `npm run check` and `npm run preflight:production` pass;
- the last independent judge pass identifies no new release blocker.

Stop and request human input when:

- the next improvement requires rights, consent, collaborator approval, or a
  factual decision not present in public-safe records;
- the remaining gap is a named blind-reader or corroboration session that has
  not yet occurred;
- two consecutive iterations do not improve the objective vector;
- eight iterations have run without reaching the threshold;
- candidate improvements conflict on public safety, factual scope, or collective
  credit.

Do not stop merely because the prose feels polished. Do not continue merely
because another archival fact could be found.
