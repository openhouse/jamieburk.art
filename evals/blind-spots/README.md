# Portfolio blind-spot evals

Run:

```bash
npm run evals:blind-spots
```

The suite evaluates seven dimensions:

1. collaborator corroboration;
2. contemporary implementation proof;
3. unfamiliar-reader validation;
4. visual proof and rights;
5. claim-bearing source maturation;
6. outcome evidence;
7. audience-specific compositions.

## Two scores

The evaluator deliberately separates:

- **governance score:** whether every blind spot has an enforceable criterion,
  lifecycle task, evidence contract, protocol or inventory, and honest current
  status;
- **closure progress:** whether the missing external evidence or completed
  research actually exists.

The release gate requires governance `100/100` and zero false closures. Closure
progress is reported but cannot be made a release gate while real external
dependencies are still missing; doing so would either keep the repository
permanently failing or encourage fabricated evidence.

External-evidence tasks fail the governance gate if they are marked completed
before their closure definition is satisfied. Empty arrays in
`external-evidence.json` are intentional evidence of an unresolved state.

## Public-safety boundary

Do not store names, contact details, raw collaborator notes, raw audience-test
transcripts, authenticated exports, or protected media here. Store only an
approved public-safe evidence record after permission and source-position
review.
