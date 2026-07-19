# ADR: close the feature/knowledge-wiki family through one governed Wiki

**Status:** Accepted for implementation on `feature/wiki-A`
**Decision date:** 2026-07-19
**Decision owner:** Jamie Burkart
**Apply target:** `develop`

## Context

The frozen `feature/knowledge-wiki-A` through `feature/knowledge-wiki-E`
branches developed useful but incompatible versions of the same product. They
differ in directory structure, evaluation architecture, prose emphasis,
generated fixtures, and the reported population of one authenticated NYC
Artist Coalition shared-folder census.

Merging all five branches would create parallel authorities and obscure which
claims, pages, and checks reviewers should trust. Ignoring four branches would
discard valuable editorial and domain work. The closure branch therefore
treats the family as a set of researched donors, not as five patches to stack.

## Decision

1. `docs/knowledge-bank/` remains the only canonical Knowledge Wiki root. The
   product name is **Knowledge Wiki**; the path remains a compatibility name.
2. `feature/knowledge-wiki-A` supplies the structural foundation: governed
   Markdown, graph compilation, source-return queues, CI, hiring checks, and
   one-root enforcement.
3. The strongest compatible work from B through E is adapted into that model.
   No parallel `docs/knowledge-wiki/` tree, large synthetic fixture corpus, or
   branch-specific build assumption is imported merely because it exists.
4. The five NYC Artist Coalition census totals are preserved as observations
   from different retrieval and counting methods. None is silently promoted to
   the canonical population. Portfolio projection of a total remains held
   until the protected manifests and method receipts can be reconciled.
5. The exact pull-request diff is divided into review units. Machine checks may
   establish structural readiness; Jamie's content approval, rights clearance,
   production approval, and merge decision remain open human gates.
6. The frozen family branches remain available as research history. Once this
   PR merges, new Wiki work proceeds from `develop`, not from those branches.

## Frozen inputs

| Branch | Frozen head | Closure use |
| --- | --- | --- |
| `feature/knowledge-wiki-A` | `920f9024d7e058700f282e3e1e76188fe1c5294e` | Structural foundation and CI |
| `feature/knowledge-wiki-B` | `268a92d794f5b604f4004fc9d6e5652f234fc61b` | Editorial and adversarial criteria, adapted to the canonical root |
| `feature/knowledge-wiki-C` | `6a2af7396240381ce04aad9b9129ba402b83c134` | Hiring-facing outcome and practice language |
| `feature/knowledge-wiki-D` | `e5a7ac607bfbd5a428bb18c2f7af5baad614132b` | Relational synthesis and explicit reviewability controls |
| `feature/knowledge-wiki-E` | `9f1bbfacec3edbfbc47a5200f777d4f498da0ec4` | Project-lineage, interpretation, handoff, and decision pages |

The machine-readable disposition record is
[`docs/integration/wiki-family-closure.json`](../integration/wiki-family-closure.json).

## Consequences

- Editors get one place to add governed knowledge and one graph to validate.
- Divergent census results remain visible without becoming a misleading public
  metric.
- Review is larger than an ordinary feature PR, but it is bounded by named
  units and explicit human gates.
- Some branch-specific artifacts are intentionally not integrated. Their
  omission is a product decision, not evidence that the work lacked value.
- A future private sibling Wiki remains an RFP, not an implemented source store
  or permission shortcut.

## Reconsider when

Revisit this decision only if the canonical root changes through a new ADR, the
private sibling Wiki is separately authorized and implemented, or a protected
census reconciliation establishes a repeatable cross-capture counting method.
