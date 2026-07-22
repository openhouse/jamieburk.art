---
id: evaluation.photography-studio-connection.2026-07-22
title: Photography studio connection evaluation
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-22
review_by: 2026-10-22
canonical_path: docs/knowledge-bank/evaluations/photography-studio-connection.md
summary: Executable contract proving that the first private Apple Photos contact is real, workspace-bounded, locally inspected, fail-closed, independently verified, and still held from publication.
projection_status: hold
projection:
  status: hold
  surfaces: []
relations:
  - type: related_to
    target: research.photography-studio-connection.2026-07-22
    href: ../research-runs/photography-studio-connection-2026-07-22.md
  - type: related_to
    target: index.knowledge-wiki.photography-notebook
    href: ../indexes/photography-working-notebook.md
  - type: uses_method
    target: method.photographic-archive-fieldwork
    href: ../methods/photographic-archive-fieldwork.md
---

# Photography studio connection evaluation

This evaluation may verify the integrity of the first bounded private contact.
It cannot grade the photograph, decide its meaning, clear rights or consent, or
promote it to the portfolio.

## Blocking contracts

- The source record, studio entry, method, notebook, and this evaluation are
  materialized and mutually reachable.
- The installed skill was checked against its upstream repository before use;
  live authorization and the frozen source contract passed.
- A timed-out metadata provider remains explicitly unverified. No partial probe
  may become a claim that all archive capabilities are available.
- The workspace grant is narrow. The plan may create one album and one
  membership only beneath the verified workspace; prior folders, albums,
  source membership, originals, metadata, favorites, People data, dates, and
  locations remain unchanged.
- People names may support private navigation only. They may not become
  inferred identities, consent, public claims, or publication permission.
- Visual inspection must occur locally. External image or metadata upload is
  prohibited.
- Every automatic HOLD remains outside the selected membership. AI may not
  clear a hold.
- The proposal must pass exact-candidate evaluation and validation before any
  write plan executes.
- A receipt-less or crashed helper launch is failure until a read-only catalog
  check proves its state. Appearance in a UI or an optimistic log line is not
  completion evidence.
- The successful plan needs a fresh app receipt, a nonce-distinct rerun,
  receipt comparison, and independent WAL-aware read-only verification of
  parentage and exact membership.
- The one-image proof may not be converted into archive-scale, project-impact,
  professional-evidence, aesthetic-quality, or representative-sample claims.
- No image, identifier, exact count, digest, path, filename, preview, metadata,
  person label, safety detail, or receipt may enter public Git.
- Every version of the studio evaluator introduced on the pull-request branch
  must meet the same protected-fingerprint boundary. Later deletion does not
  repair a disclosure already carried by reachable branch history.
- Selection remains `publication-review-required`; exact-asset safety,
  authorship, rights, represented-person, caption, crop, context, and
  surface-specific Jamie approval remain separate human gates.
- The studio entry and evaluation remain held from portfolio projection.

## Mutation coverage

The tests remove the source record, break notebook reachability, claim all
capabilities passed, widen the writable scope, convert People labels into
identity proof, permit external upload, admit a HOLD, bypass evaluation,
declare the failed launch successful, remove rerun or independent verification,
turn one image into archive-scale evidence, leak a private locator or protected
fingerprint from either a governed record or the evaluator's own source, grant
publication, hide a protected fingerprint in an earlier branch commit, activate
projection, and detach this evaluator from the main Wiki suite. Every mutation
must fail the boundary it attacks.

## Commands

```sh
node scripts/knowledge-wiki/photography-studio-connection-eval.mjs
node --test scripts/knowledge-wiki/photography-studio-connection-eval.test.mjs
```

The evaluator is integrated into `npm run wiki:eval`, and its adversarial tests
run through `npm run wiki:test`.

A green result means the private proof operation is documented with sufficient
technical and ethical closure. It does not mean the photograph is good,
important, public-safe, rights-cleared, or ready for any portfolio surface.
