# Atlas eval hill climb

**Candidate branch:** `feature/atlas-o`

**Base:** `feature/evals-E` at
`fc32ae02b275f5e18e3abb5e6c541256849980ef`

**Atlas candidate:**
`a60cc129948a4874b3b8c8484eccebfe8c795e69dd34244431be3471134de1b5`

## Objective

Improve evaluation coverage lexicographically:

1. Do not increase inherited hard-gate failures.
2. Do not increase inherited quality-target gaps.
3. Add deterministic coverage for semantic Markdown, migration loss,
   authority, public safety, package boundaries, and exact candidate identity.
4. Preserve human-only approval gates as human-only.

## Before

The unmodified E base established:

- 10 citation tests passing;
- 12 launch-readiness tests passing;
- 115 knowledge-lifecycle tests passing;
- 13 launch hard gates and 2 launch quality targets with no gaps;
- 7 lifecycle hard gates and 4 lifecycle quality targets with no gaps;
- application typecheck, lint, production build, knowledge-bank safety,
  public-safety, and route checks passing; and
- typed-bank fingerprint
  `1dccfd146219aed89f2a5afaaa97d8fb0fa969758dd377ef4512c4e419f8a544`.

## After

Atlas preserves the inherited floor and adds:

- 9 semantic-wiki hard gates with no failures;
- 3 semantic-wiki quality targets with no gaps;
- 10 Atlas unit, mutation, service, and integration tests passing;
- 10 semantic pages, including 6 complete project specimens;
- 48 typed reciprocal relations;
- complete deterministic project slices that retain every matching claim and
  linked evidence source;
- one candidate fingerprint bound to Markdown, canonical bank, eval-family
  integration manifest, and Atlas implementation code;
- a browser launch eval with 0 failures across 14 routes and 4 viewports; and
- staging and production preflights passing.

Across the deterministic launch, lifecycle, and Atlas evaluators, coverage
increases from 20 to 29 hard gates and from 6 to 9 quality targets while all
observed failures and gaps remain at zero. The combined test count increases
from 137 to 147.

## Human gates

The lifecycle assessment remains 100/100, with three pending human gates. Its
gate command exits nonzero by design because an agent cannot authenticate
Jamie's approval, collaborator permission, or media rights. Atlas does not
convert those pending decisions into machine passes.

## Evidence

- `evals/atlas/runs/feature-atlas-o.json`
- `docs/atlas/generated/atlas.graph.json`
- `evals/knowledge-lifecycle/assessment.latest.json`
- `evals/launch-readiness/assessment.latest.json`
