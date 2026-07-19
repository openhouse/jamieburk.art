# ADR: Knowledge Wiki Family Closure

**Status:** accepted for implementation and final human review

**Date:** 2026-07-19

**Decision owner:** Jamie Burkart

**Integration branch:** `feature/wiki-B`

**Pull request target:** `develop`

## Decision

Close the frozen `feature/knowledge-wiki-*` family by using
`feature/knowledge-wiki-B` as the architectural base and selectively adapting
distinct donor strengths. Do not merge or cherry-pick donor branches wholesale.

The authority model remains:

- `docs/knowledge-wiki/` owns Wiki-page identity, authored navigation, and the
  contextual reading layer;
- `docs/knowledge-bank/` and canonical typed application records retain source,
  claim, evidence, rights, correction, and publication authority;
- the portfolio remains a smaller selective projection; and
- protected source bodies and coordinates remain outside Git.

No public Knowledge Wiki route, second claim registry, database, CMS, or
automatic publication mechanism is introduced.

## Frozen Family

| Branch | Frozen head | Distinct strength | Closure disposition |
| --- | --- | --- | --- |
| `feature/knowledge-wiki-A` | `920f9024d7e058700f282e3e1e76188fe1c5294e` | Editorial story units, evidence-state ladder, scenes, public knowledge, visual queue | Adapt into B pages and practices |
| `feature/knowledge-wiki-B` | `268a92d794f5b604f4004fc9d6e5652f234fc61b` | Authority split, source return, candidate binding, human gates, public NYC Artist Coalition projection | Canonical base |
| `feature/knowledge-wiki-C` | `6a2af7396240381ce04aad9b9129ba402b83c134` | Jamie-at-work positioning and complete campaign narratives | Adapt selected reader pages |
| `feature/knowledge-wiki-D` | `e5a7ac607bfbd5a428bb18c2f7af5baad614132b` | Operational evidence semantics, maintenance, relational infrastructure, review packets | Adapt the evidence map and review structure |
| `feature/knowledge-wiki-E` | `9f1bbfacec3edbfbc47a5200f777d4f498da0ec4` | Pressure-first interpretation, decision records, cross-domain translation, accessibility | Adapt selected interpretive and decision patterns |

## Why B Is The Base

B already separates contextual Wiki prose from canonical claim and source
authority, validates that split, preserves human-only gates, and projects one
carefully composed NYC Artist Coalition case study without adding a public Wiki
surface. Choosing B is an architecture decision, not a judgment that B contains
all of the family's best pages.

## Donor Rules

1. Adapt a donor only when it answers a distinct reader or operator question.
2. Fold overlapping concepts into an existing B page.
3. Repoint authority references to records that actually resolve in B.
4. Preserve collective credit, anti-claims, protected absences, and source-return
   boundaries.
5. Record unselected donor material as deferred, not rejected or disproved.
6. Re-run all frozen portfolio and knowledge checks; do not rewrite their
   contracts merely to make the integration pass.

## Archive Reconciliation

The five archive censuses are retained as method- and snapshot-specific
observations. The B receipt becomes the current operational receipt because it
binds a 2,408-item accessible population to equal inventory, classification,
and disposition totals, a protected manifest digest, and explicit exclusions.
This selection does not assert that the other counts were false or that 2,408
is a timeless total.

See the [family closure research run](../knowledge-wiki/research-runs/knowledge-wiki-family-closure-2026.md).

## Review Packets

### Review packet 1: Architecture And Governance

Review this ADR, archive reconciliation, evaluation contract, candidate-bound
state, and human gates.

### Review packet 2: Reader And Application Paths

Review Jamie at Work, the pressure map, canonical story bank, operational
evidence map, cross-domain translation, and the two campaign pages.

### Review packet 3: Decisions, Continuity, And Care

Review the decision index and records, handoff evidence states, scene protocol,
media queue, and selective-projection boundary.

## Acceptance Boundary

Automated closure requires a 100/100 deterministic family evaluation, mutation
coverage, full repository checks, public-safety checks, and an exact content
fingerprint. It does not supply Jamie's final review, collaborator correction,
rights or consent, hiring-reader comprehension, production deployment, or
indexing approval.
