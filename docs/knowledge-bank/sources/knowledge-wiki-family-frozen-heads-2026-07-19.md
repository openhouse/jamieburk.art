---
id: source.knowledge-wiki.family-frozen-heads.2026-07-19
title: Frozen Knowledge Wiki A-E branch heads
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-07-19
review_by: 2027-01-19
canonical_path: docs/knowledge-bank/sources/knowledge-wiki-family-frozen-heads-2026-07-19.md
summary: Public Git branch snapshots used to close the five-branch Knowledge Wiki design family into one canonical implementation.
source_kind: public-code-branch-family
relations:
  - type: related_to
    target: decision.knowledge-wiki.family-closure
    href: ../decisions/knowledge-wiki-family-closure.md
---

# Frozen Knowledge Wiki A-E branch heads

The closure review treated these public Git objects as immutable donors:

| Branch | Frozen head |
| --- | --- |
| `feature/knowledge-wiki-A` | `920f9024d7e058700f282e3e1e76188fe1c5294e` |
| `feature/knowledge-wiki-B` | `268a92d794f5b604f4004fc9d6e5652f234fc61b` |
| `feature/knowledge-wiki-C` | `6a2af7396240381ce04aad9b9129ba402b83c134` |
| `feature/knowledge-wiki-D` | `e5a7ac607bfbd5a428bb18c2f7af5baad614132b` |
| `feature/knowledge-wiki-E` | `9f1bbfacec3edbfbc47a5200f777d4f498da0ec4` |

## What this source establishes

The branch snapshots establish implemented alternatives, exact file history,
and the wording each evaluator accepted at its own head. They are appropriate
sources for architecture and editorial comparison.

## Boundary

A passing branch-local test establishes internal consistency, not agreement
among branches, archival truth outside the branch's stated capture, human
approval, or permission to merge every implementation. Public Git history is
not independent corroboration of the underlying private source material.
