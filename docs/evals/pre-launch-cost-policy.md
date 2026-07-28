# Pre-launch Evaluation Cost Policy

The release process now separates iteration evidence from final-candidate
evidence. The purpose is not to run fewer meaningful checks. It is to stop
paying repeatedly for checks that cannot discriminate among the changes just
made.

## Tiers

1. **Deterministic source checks** run first on every relevant change:
   schemas, unit tests, mutation tests, citations, privacy, public safety,
   typecheck, lint, and diff integrity.
2. **Derived and rendered checks** run when generated knowledge, public routes,
   components, styles, or assets change: currentness, build, browser,
   accessibility, routes, and screenshots.
3. **Independent semantic review** runs after cheaper checks pass and the
   candidate is frozen, when claims, role framing, public composition,
   evaluator contracts, or release-candidate bytes changed.
4. **Human authority gates** remain attached to their actual decision:
   creator rights, represented-person consent, collective credit, editorial
   usefulness, Jamie approval, deployment observation, and indexing approval.

## Cache contract

Expensive evidence may be reused only when all four bindings are unchanged:

- candidate fingerprint;
- rubric digest;
- evaluator version; and
- environment contract.

A candidate-affecting change invalidates prior screenshot, browser,
accessibility, and independent-judge receipts. A documentation-only change does
not make a prior screenshot newly false, but release review still evaluates
the final commit.

## Commands

`npm run evals:plan` reports the required tiers for the diff against
`origin/develop`. It makes skipped work inspectable; it does not execute or
waive a gate.

`npm run check` remains the complete repository verification command. The
planner is an iteration aid, not a weaker definition of done. For a release
candidate, run the planner, satisfy every required machine tier, freeze the
commit, bind final evidence to that commit, then complete the named human
gates.

## Pre-launch rule

Do not recursively invoke independent model panels while files are still
changing. Resolve deterministic failures, generate one candidate, run the
minimum relevant rendered evidence, and then perform one composite independent
review against the sanitized, candidate-bound dossier.
