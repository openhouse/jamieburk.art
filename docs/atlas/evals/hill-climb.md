# Atlas eval hill climb

**Candidate branch:** `feature/atlas-o`

**Base:** `feature/evals-E` at
`fc32ae02b275f5e18e3abb5e6c541256849980ef`

**Atlas candidate:**
`764e0ae31967bf0d65cc2d890afaaa5d57510ff2a7dbb01a83db95b8336c663a`

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

- 13 semantic-wiki hard gates with no failures;
- 5 semantic-wiki quality targets with no gaps;
- 20 Atlas unit, mutation, service, source-integrity, and integration tests
  passing;
- 25 semantic pages, including all 21 canonical project keys;
- 108 typed reciprocal relations;
- 1,044 complete canonical Atlas records: all 38 entities, 151 intake records,
  274 sources, 274 source readings, 121 claims, 54 research tasks, 10 inquiries,
  97 projection decisions, 4 corrections, 6 citation pages, and 15 proof claims;
- exact round-trip parity with both deprecated legacy record stores;
- a full-fidelity catalog of 1,833 artifact mappings, 1,676 unique source blobs,
  5,695 semantic IDs, 5,723 selected public-safe record variants, 829 document
  abstracts, 16,691 public locators, and 1,520 hashed protected locators from all
  14 frozen source heads;
- all 14 source commits and all 1,676 unique blobs reachable from Atlas history
  without depending on the `feature/evals-*` refs;
- 25 executable named-stakeholder credit boundaries;
- one candidate fingerprint bound to Markdown, canonical bank, exact source
  manifest, federated catalog, stakeholder register, and Atlas implementation;
- deterministic canonical-record and source-catalog regeneration with identical
  file SHA-256 values `2c6f98e9bac4adf239aaf431a842e06f2453ede7f1977c440b6d1d18c934d6f2`
  and `e453fbe3eba5a4983f9b57eaf2168b257ed413501c6a6033c913a34f82986780`;
- two regression tests proving production preflight invokes the full browser,
  assessment, judge, and human-gate release contract and declares Playwright;
- a production-profile browser launch eval with 0 failures across 14 routes,
  4 viewports, and 56 route/viewport observations; and
- a production release command that fails closed when its browser report,
  assessment, judge floor, or human approvals are incomplete.

Across the deterministic launch, lifecycle, and Atlas evaluators, coverage
increases from 20 to 33 hard gates and from 6 to 11 quality targets while all
observed failures and gaps remain at zero. The combined test count increases
from 137 to 159.

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
8. `feature/evals-K` and `feature/evals-N` advanced again. Atlas refreshed to
   their exact heads, incorporated the DCLA/Council coalition bridge and the
   complete 40-record surviving KC Spaces Fund Facebook population, and raised
   the complete inventory to 1,833 artifacts.
9. A source catalog alone was rejected as insufficient for future operation.
   Atlas gained a 1,044-record canonical store, compatibility adapters, exact
   legacy parity, direct consumer migration, and an eval that rejects future
   imports from the deprecated banks.
10. The first full-fidelity history eval failed because the two newest source
    heads were not Atlas ancestors. A tree-preserving three-parent merge made
    both histories and their blobs reachable without changing Atlas files.
11. Review found that production preflight used the source-only gate and that
    Playwright was undeclared. The release contract and dependency were fixed,
    regression-tested, and rerun from a clean `npm ci` installation.

## Human gates

The launch assessment remains 93.5/100 with five pending human gates. The
lifecycle assessment remains 100/100 with three pending human gates. Production
release exits nonzero by design because an agent cannot authenticate Jamie's
approval, collaborator permission or corroboration, media rights, or blind
hiring-reader validation. Atlas does not convert those pending decisions into
machine passes.

## Evidence

- `evals/atlas/runs/feature-atlas-o.json`
- `docs/atlas/generated/atlas.graph.json`
- `docs/atlas/generated/feature-evals-knowledge.json`
- `docs/atlas/feature-evals-integration.json`
- `docs/atlas/stakeholder-credit.json`
- `evals/knowledge-lifecycle/assessment.latest.json`
- `evals/launch-readiness/assessment.latest.json`
