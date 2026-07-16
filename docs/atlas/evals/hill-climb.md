# Atlas eval hill climb

**Candidate branch:** `feature/atlas-o`

**Base:** `feature/evals-E` at
`fc32ae02b275f5e18e3abb5e6c541256849980ef`

**Atlas candidate:**
`4dd3bfa6503291c4cd379fa1cc8dff21cb9a32774aa3f3b5a293e0fc37c91a23`

## Objective

Improve evaluation coverage lexicographically:

1. Do not increase inherited hard-gate failures.
2. Do not increase inherited quality-target gaps.
3. Add deterministic coverage for semantic Markdown, migration loss,
   cross-branch source completeness, named stakeholder credit, authority,
   public safety, package boundaries, and exact candidate identity.
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

- 11 semantic-wiki hard gates with no failures;
- 5 semantic-wiki quality targets with no gaps;
- 16 Atlas unit, mutation, service, source-integrity, and integration tests
  passing;
- 25 semantic pages, including all 21 canonical project keys;
- 108 typed reciprocal relations;
- complete deterministic project slices whose union retains all 38 entities,
  151 intake records, 274 sources, 274 source readings, 121 claims, 54 research
  tasks, 10 inquiries, 97 projection decisions, 4 corrections, and 6 citation
  pages;
- a federated catalog of 1,823 artifact mappings, 1,666 unique source blobs,
  5,685 semantic IDs, 5,709 selected public-safe record variants, 824 document
  abstracts, 16,687 public locators, and 1,520 hashed protected locators from all
  14 frozen branch heads;
- 20 executable named-stakeholder credit boundaries;
- one candidate fingerprint bound to Markdown, canonical bank, exact source
  manifest, federated catalog, stakeholder register, and Atlas implementation;
- deterministic catalog regeneration with identical file SHA-256
  `a1c63769a0c5159bdcf0e64eb3decb29008b71d55970eaa9c6135a4d3b5574c1`;
- a browser launch eval with 0 failures across 14 routes and 4 viewports; and
- staging and production preflights passing.

Across the deterministic launch, lifecycle, and Atlas evaluators, coverage
increases from 20 to 31 hard gates and from 6 to 11 quality targets while all
observed failures and gaps remain at zero. The combined test count increases
from 137 to 153.

## Iterations

1. The architecture-only A-N manifest was rejected as insufficient for the
   stricter knowledge-integration request.
2. An immutable source-artifact catalog and one Markdown page for every
   canonical project key were added. The migration gate exposed five entities
   linked only through inbound relationships.
3. Project slices changed to traverse the declared entity neighborhood in both
   directions. Canonical collection coverage reached 100 percent.
4. A named-credit register and mutation gate were added. The gate caught Tom
   Finkelpearl and Anne Dufy Burkart names broken across Markdown line wraps;
   the pages were corrected without weakening the check.
5. A privacy probe found six malformed Google-document locators whose embedded
   line breaks evaded host classification. Locator handling was hardened and
   the catalog regenerated; protected entries expose hashes only.
6. A second complete catalog build produced the identical byte-level SHA-256,
   and the frozen source trees matched all 1,819 committed artifact mappings.
7. `feature/evals-K` advanced while Atlas was being evaluated. The source cut
   was refreshed to its new exact head, the Call Script / WOW List / Sunday
   Dinner / NYC Artist Coalition bridge evidence was incorporated, and two
   subsequent complete catalog builds were byte-identical. The refreshed trees
   match all 1,823 committed artifact mappings.

## Human gates

The lifecycle assessment remains 100/100, with three pending human gates. Its
gate command exits nonzero by design because an agent cannot authenticate
Jamie's approval, collaborator permission, or media rights. Atlas does not
convert those pending decisions into machine passes.

## Evidence

- `evals/atlas/runs/feature-atlas-o.json`
- `docs/atlas/generated/atlas.graph.json`
- `docs/atlas/generated/feature-evals-knowledge.json`
- `docs/atlas/feature-evals-integration.json`
- `docs/atlas/stakeholder-credit.json`
- `evals/knowledge-lifecycle/assessment.latest.json`
- `evals/launch-readiness/assessment.latest.json`
