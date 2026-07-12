# feature/evals-J - Chad Lens Hill Climb

## Frozen inputs

- Rubric commit: `68565915b34cf8fadcb5f426005bc27f5ed0130b`
- Baseline candidate: `68565915b34cf8fadcb5f426005bc27f5ed0130b`
- Revised candidate: `b8dd2b35ad73ec756b3c92499193cebf9200e8d2`
- Criterion: `PR-015 - Courageous precision under Chad's lens`
- Judge: fresh, read-only Codex sessions with no optimization history
- Pass threshold: `3/4`

## Criterion

The public site should reduce the reader's burden without reducing Jamie's
record. A blind hiring reader should be able to identify Jamie's role and at
least three accurate accomplishments without decoding generic language.
Featured summaries should make Jamie the actor, name concrete actions and
outputs, and answer what the work made usable. Collective-credit, causality,
authority, current-status, and scale boundaries must remain intact.

## Baseline

The first blind judge scored the frozen candidate `2/4` with `0.94` confidence
and `minor` decoding burden.

Two material failures were selected for the next iteration:

- Five featured summaries began with subjectless verbs, leaving Jamie's role
  implicit at the exact point where a hiring reader needed it to be explicit.
- Some Technical Operations references to CallNYC did not carry its required
  archived, unofficial, and independent boundary.

## Change

- Make Jamie the grammatical actor in every featured work summary.
- State directly that Jamie hosts Sunday Dinner.
- Preserve collective-credit verbs including `helped`, `co-founded`,
  `co-built`, `contributed`, and `supported`.
- Carry CallNYC's archived, unofficial, and independent status across the work
  card, Technical Operations page, resume projection, and proof bank.
- Replace the vague adjective `lightweight` with the concrete term `practical`.
- Add deterministic source contracts for actor visibility, Sunday Dinner
  hosting, CallNYC boundaries, and banned vague wording.

## Result

- Revised blind judge run 1: `4/4`, pass, `0.96` confidence, decoding burden
  `none`.
- Revised blind judge run 2 on the unchanged candidate: `4/4`, pass, `0.98`
  confidence, decoding burden `none`.
- Both judges found all five featured cards clear on actor, action, useful end,
  and concrete output.
- Both judges found the strong metrics prominent while preserving approved
  causal and scale qualifiers.
- The second judge found no material inflation of ownership, causality,
  authority, current status, or scale against the public proof bank.
- `npm run evals:portfolio`: passed with 15 criteria, 10 blocking criteria, and
  weights totaling 100.
- `npm run test:portfolio-evals`: passed with 14 tests.
- Browser QA: the homepage rendered without horizontal overflow at 1440px and
  320px; the compact `Requirements` label was reduced at the narrow breakpoint
  so no inspected heading, paragraph, link, or button text was clipped.
- `npm run preflight:staging`: passed.
- `npm run preflight:production`: passed.
- Decision: `PR-015` is reached for candidate
  `b8dd2b35ad73ec756b3c92499193cebf9200e8d2`.

This result is intentionally bounded. It does not by itself establish complete
application-share or production-launch readiness, which still require the full
rubric, release evidence, and Jamie's approval of the exact candidate. No new
private source material or unsupported public claim was introduced.
