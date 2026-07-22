---
id: research.photography.proof-of-life.2026-07-22
title: Proof of Life
kind: research-run
status: maintained
visibility: public-safe
sensitivity: moderate
last_reviewed: 2026-07-22
review_by: 2026-10-22
aliases:
  - Residency 001 first archive encounter
canonical_path: docs/knowledge-bank/photography/proof-of-life.md
summary: >
  Public-safe record of the residency's first bounded Apple Photos encounter:
  one privately inspected photograph placed in one private working album, with publication held.
relations:
  - type: related_to
    target: index.knowledge-wiki.photography-notebook
    href: README.md
    context: First situated entry in the photography working notebook.
  - type: part_of
    target: project.photography.field-set-001-residency
    href: field-set-001-residency-proposal.md
    context: Establishes contact with the archive inside the accepted residency.
  - type: related_to
    target: decision.photography.field-set-001-residency-acceptance
    href: field-set-001-residency-acceptance.md
    context: Begins after Jamie's welcome and acceptance.
  - type: uses_source
    target: source.vault.apple-photos.metadata
    href: ../sources/apple-photos-archive-metadata.md
    context: Governed public-safe boundary for the private source archive.
  - type: related_to
    target: research-inquiry.photography.field-set-001
    href: field-set-001.md
    context: A one-image systems proof, not the proposed thousand-image field.
  - type: uses_method
    target: method.photography.notebook-entry
    href: notebook-entry-template.md
    context: Separates visible observation, interpretation, limits, and next action.
  - type: related_to
    target: index.knowledge-wiki.visual-evidence
    href: ../indexes/visual-evidence.md
    context: Records a held private photograph without creating a public asset record.
projection:
  status: hold
  surfaces: []
human_review: governed-open
source_encounter:
  encounter_date: 2026-07-22
  reader: Codex, an AI assistant working with Jamie Burkart
  research_authority: authorized-by-jamie
  publication_authority: separate-human-review
  source_states:
    - target: source.vault.apple-photos.metadata
      access_state: reachable
      materialization_state: local-materialized
      version_note: Live private library reached through Apple Photos' documented scripting interface; current PhotoKit helper remained permission-blocked.
  questions:
    - Can the residency establish a bounded, reversible working relationship with the private archive before assembling Field Set 001?
    - What kind of image can mark first contact without being forced to represent the archive or the portfolio?
  prior_readings_consulted:
    - The accepted Field Set 001 residency proposal and photography working agreements.
    - The current Photo Fieldwork safety, Apple Photos integration, and recovery guidance.
  new_observations:
    - A distributed People-based sample quickly produced images spanning ordinary life, travel, self-presentation, documents, and unresolved contexts.
    - The selected frame felt valuable as presence and rest rather than as professional proof.
    - Exact one-item membership can be created and read back inside the authorized workspace through the documented scripting interface.
  changed_interpretations:
    - The first useful album can be a studio threshold rather than a portfolio category or project claim.
    - Tool readiness must distinguish current source, visible permission settings, successful API authorization, and verified operations.
  contradictions:
    - macOS displayed Full Access for the version-2 helper while PhotoKit continued to report denied authorization.
  records_affected:
    - source.vault.apple-photos.metadata
    - research-inquiry.photography.field-set-001
    - research.photography.proof-of-life.2026-07-22
  limitations:
    - The encounter considered twelve private previews, not a representative archive sample.
    - The selected image's date, place, project, and photographer were not established.
    - Independent PhotoKit corroboration could not be completed while the helper remained permission-blocked.
  librarian_requests:
    - Preserve any future source context that can establish the selected image's date, place, project, or photographer without assuming those facts from appearance.
  publication_decision: hold
anti_claims:
  - The selected photograph is not approved for the repository, portfolio, or any public surface.
  - One successful membership operation does not establish that Field Set 001 has been assembled or evaluated.
  - Existing People associations support private retrieval; they do not establish public identity, consent, or permission.
  - The current PhotoKit helper is not operational merely because its source and skill installation are current.
---

# Proof of Life

On July 22, 2026, the residency made its first bounded contact with Jamie's
Apple Photos archive. A small, distributed private sample was retrieved through
an existing People association for Jamie and inspected locally. Twelve private
previews were considered. One existing photograph was placed in a new private
album named `Proof of Life`, inside the already-existing
`Photo-Fieldwork > Residency-001 > Workspace-A` hierarchy.

This is a one-image systems proof and a first notebook encounter. It is not the
approximately 1,000-image Field Set 001, a portfolio selection, or a claim that
the archive has been comprehensively searched.

## What is visible

The held photograph shows a younger Jamie at rest against weathered vertical
boards, eyes closed in direct sunlight. A broad hat sits behind his head. He
wears overalls and a red bandanna. The frame is close, horizontal, and quiet.

The image was selected because it felt like presence rather than professional
proof: a person inside weather, clothing, rest, and a lived material world.
That is an editorial response, not an established account of the image's date,
place, project, photographer, or original intention.

## Exact operation

- The existing source photograph and its metadata were not changed.
- No folder was created, renamed, moved, or deleted.
- Exactly one album was created inside the authorized `Workspace-A` folder.
- Exactly one existing photograph was added to that album.
- No album or folder outside `Workspace-A` was changed.
- No network access or external upload was used.
- A separate read-only hierarchical query verified one uniquely named album,
  the expected parent, and the exact one-item membership.

The exact plan, source identifier, private preview, write receipt, and read-back
receipt remain outside public Git. Their SHA-256 bindings are recorded here so
the public-safe account cannot silently drift away from the private operation:

| Private artifact | SHA-256 |
| --- | --- |
| Membership plan | `f9de1736b153ad872c562c1e3914fd18962cd27a6b6e67aeb343552e63cddb5d` |
| Write receipt | `3586b9873f9ef6327cc85013563aa4b17368644278e0d5e4fc05639f02a58cee` |
| Read-back receipt | `e48a2078897cd418076e3706dc7618191b4445df07a51fafce76880127899f3e` |

The write receipt and read-back receipt both record `PASS` and an exact member
count of one. Their protected identifiers are not repeated here.

## Tool readiness

The installed `curate-apple-photos` skill resolves to the current clean
Photo Fieldwork checkout. On this encounter, local `main` and refreshed
`origin/main` both resolved to public commit
[`7278c6ef767c54a4d8cd46528d69ad63fc465464`](https://github.com/openhouse/photo-fieldwork/tree/7278c6ef767c54a4d8cd46528d69ad63fc465464).

That source check does not mean every adapter is operational. The current
version-2 PhotoKit helper continued to report denied access after its visible
macOS Full Access setting was refreshed. It did not inspect or write the
library. The successful membership operation instead used the documented
Apple Photos AppleScript adapter, followed by a separate read-only AppleScript
query. Independent PhotoKit corroboration remains pending authorization or
signing repair.

## What this does not establish

The photograph does not by itself establish chronology, location, project
membership, authorship, relationship, or public meaning. The existing People
association was used only as Jamie authorized: a private retrieval aid created
through years of archive care. Neither the association nor album membership
grants rights, consent, attribution, caption approval, or publication permission.

No raw identifier, filename, source path, preview, contact sheet, location, or
private receipt is present in this repository.

## Decision and next action

Keep `Proof of Life` as a private working album and its photograph on
publication hold. Let the image remain a first encounter rather than forcing it
to represent the residency. Continue exploratory retrieval inside `Workspace-A`,
repair the current PhotoKit helper before treating it as operational, and allow
later photographs to confirm, complicate, or displace this first response.
