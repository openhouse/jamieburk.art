---
id: evaluation.photo-notebook.local-photos-canary.2026-07-22
title: First local Apple Photos canary
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: moderate
last_reviewed: 2026-07-22
review_by: 2026-10-22
canonical_path: docs/knowledge-bank/notebooks/photography/field-notes/first-local-photos-canary.md
summary: Public-safe receipt note for the first one-image, membership-only test of the private photography residency workspace.
relations:
  - type: related_to
    target: index.knowledge-wiki.photo-notebook
    href: ../README.md
  - type: related_to
    target: index.photo-notebook.proposal.first-pass-196
    href: ../proposals/first-pass-at-196.md
  - type: uses_method
    target: method.photo-notebook.field-note
    href: ../field-note-template.md
projection:
  status: hold
  surfaces: []
---

# First local Apple Photos canary

On July 22, 2026, the photography residency completed its first bounded local
operation. This was an infrastructure and safety test, not a first portfolio
edit. The installed `curate-apple-photos` skill was verified against the
current checked-out `openhouse/photo-fieldwork` `origin/main` before the run.

## What happened

- A fresh, zero-image authorization check confirmed local PhotoKit access with
  network access disabled.
- A source of more than 600,000 visible still photographs was frozen by exact
  count and identifier digest for the run.
- Four candidates were retrieved through Jamie's existing People association.
  PhotoKit confirmed that all four belonged to the frozen source.
- All four generated previews were decoded and inspected locally. Three were
  held because background privacy or represented-person and collective-credit
  questions made them wrong for this small canary.
- One provisional image remained eligible. The helper created one private
  studio album and added one existing photograph by membership only.
- The same release-bound operation completed in two fresh production
  executions with distinct nonces and the same one-member result.
- An independent read-only verifier confirmed the exact folder parent chain,
  exact album membership, zero missing or unexpected members, zero members
  outside the frozen source, zero safety-HOLD overlap, and an unchanged source
  count and identifier digest.

No network access or external upload occurred. The operation did not change
originals, edits, metadata, dates, locations, faces, People associations,
favorites, source albums, or anything outside the owner-authorized private
workspace.

## Friction preserved

The run keeps its failures visible rather than polishing them away.

An authorization snapshot and the later run freeze differed by five source
items. The cause was not inferred. The candidate run therefore froze the later
source state and rechecked its exact count and identifier digest before every
PhotoKit operation.

Three initially exported preview copies retained source-bearing EXIF and failed
the privacy verifier. Only the generated local copies were sanitized; Apple
Photos originals were not touched. All four copies then passed decoding,
permissions, path-containment, and source-metadata checks before visual review.

One production attempt was interrupted without a completion receipt after an
album binding used the wrong collection-identifier form. It was not counted as
a pass. The binding was repaired from the independently verified write-test
receipt, and a new nonce-bound execution completed. The final operation was
then rerun and independently checked for idempotence.

## Public boundary

This repository contains no photograph, preview, contact sheet, asset
identifier, filename, local path, private folder or album title, face record,
coordinate, image-level metadata, or scene description from the run. The
private run retains the plan, receipts, review ledger, holds, and verification
reports.

This canary does not select or clear a photograph for the portfolio or
publication. It does not establish identity, authorship, date, place, project,
relationship, consent, rights, caption, or collective credit. Any later use
still requires Jamie's explicit approval for a named image, derivative, and
surface, alongside any rights-holder or represented-person authority that may
apply.

## What the canary establishes

The residency can now retrieve a bounded field through existing Apple Photos
People work, inspect local pixels, preserve uncertainty and relational holds,
and make an exact membership-only addition inside its private studio. It can
also prove what it did without turning the private photograph or catalog into
public evidence.

That is enough for arrival. It is not a theory of what the archive should
become.
