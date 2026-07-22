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
  Public-safe record of the residency's first two bounded Apple Photos encounters:
  two privately inspected photographs held together in one private working album, with publication held.
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
    context: A two-image systems proof, not the proposed thousand-image field.
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
      version_note: Live private library first reached through Apple Photos' documented scripting interface; the repaired PhotoKit helper later passed its live canary, inspected one image, and completed an exact two-member album plan.
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
    - After the helper repair, a second image could be inspected and added through the stable app identity with the source frozen and network access disabled.
    - The two images create a provisional relation between rest in daylight and playful encounter at night.
  changed_interpretations:
    - The first useful album can be a studio threshold rather than a portfolio category or project claim.
    - Tool readiness must distinguish current source, visible permission settings, successful API authorization, and verified operations.
  contradictions:
    - The initial helper reported denied authorization despite a visible Full Access setting; a later version passed live authorization after the helper integration was repaired.
  records_affected:
    - source.vault.apple-photos.metadata
    - research-inquiry.photography.field-set-001
    - research.photography.proof-of-life.2026-07-22
  limitations:
    - The encounter considered twelve private previews, not a representative archive sample.
    - The selected image's date, place, project, and photographer were not established.
    - The helper return inspected one proposed companion, not a representative archive sample.
    - The preferred read-only SQLite verifier remained blocked by macOS privacy; a separate read-only Photos scripting check passed, but is not equivalent to catalog-level verification.
  librarian_requests:
    - Preserve any future source context that can establish the selected image's date, place, project, or photographer without assuming those facts from appearance.
  publication_decision: hold
anti_claims:
  - Neither selected photograph is approved for the repository, portfolio, or any public surface.
  - Two successful membership operations do not establish that Field Set 001 has been assembled or evaluated.
  - Existing People associations support private retrieval; they do not establish public identity, consent, or permission.
  - A passing helper operation does not clear publication or replace independent catalog-level verification.
---

# Proof of Life

On July 22, 2026, the residency made its first bounded contact with Jamie's
Apple Photos archive. A small, distributed private sample was retrieved through
an existing People association for Jamie and inspected locally. Twelve private
previews were considered. One existing photograph was placed in a new private
album named `Proof of Life`, inside the already-existing
`Photo-Fieldwork > Residency-001 > Workspace-A` hierarchy.

Later that day, after Jamie repaired Photo Fieldwork's permissioned helper, one
proposed companion was inspected again through the helper itself and added to
the same album. `Proof of Life` now holds exactly two private photographs. This
remains a small systems proof and a first notebook encounter. It is not the
approximately 1,000-image Field Set 001, a portfolio selection, or a claim that
the archive has been comprehensively searched.

## What is visible

The first held photograph shows a younger Jamie at rest against weathered vertical
boards, eyes closed in direct sunlight. A broad hat sits behind his head. He
wears overalls and a red bandanna. The frame is close, horizontal, and quiet.

The image was selected because it felt like presence rather than professional
proof: a person inside weather, clothing, rest, and a lived material world.
That is an editorial response, not an established account of the image's date,
place, project, photographer, or original intention.

The second held photograph shows Jamie coming toward the camera at night in
paper 3-D glasses, a pale long-sleeved shirt, shorts, and a backpack. A bicycle
wheel appears behind him. Direct flash separates his moving figure from the
dark surroundings. The image feels less like a portrait than an encounter:
playful, provisional, and already inside some event or projection.

Held together, the photographs make a small interval between release and
arrival, rest and participation, sunlight and flash. This is a provisional
sequence reading. It does not establish that the images share a project,
location, photographer, period, or original purpose.

## Exact operation

- The existing source photograph and its metadata were not changed.
- No folder was created, renamed, moved, or deleted.
- Exactly one album was created inside the authorized `Workspace-A` folder.
- Exactly one existing photograph was added to that album.
- No album or folder outside `Workspace-A` was changed.
- No network access or external upload was used.
- A separate read-only hierarchical query verified one uniquely named album,
  the expected parent, and the exact one-item membership.

The exact first plan, source identifier, private preview, write receipt, and read-back
receipt remain outside public Git. Their SHA-256 bindings are recorded here so
the public-safe account cannot silently drift away from the private operation:

| Private artifact | SHA-256 |
| --- | --- |
| Membership plan | `f9de1736b153ad872c562c1e3914fd18962cd27a6b6e67aeb343552e63cddb5d` |
| Write receipt | `3586b9873f9ef6327cc85013563aa4b17368644278e0d5e4fc05639f02a58cee` |
| Read-back receipt | `e48a2078897cd418076e3706dc7618191b4445df07a51fafce76880127899f3e` |

The write receipt and read-back receipt both record `PASS` and an exact member
count of one. Their protected identifiers are not repeated here.

## Helper return

The repaired helper was exercised through its stable macOS app identity rather
than as a bare executable. Before selecting or writing anything, it passed a
zero-image, no-write live authorization canary against the frozen source. A
bounded one-record osxphotos probe also passed, and the private capability
report marked all fourteen declared insight families available.

The helper then inspected exactly one proposed companion. It exported one
private, metadata-minimized preview for local review; preview verification
reported one valid image and no invalid image. OCR, image classification, and
face detection were disabled for this pass. Network access and external upload
remained disabled.

The reviewed exact-membership plan then:

- resolved the existing `Photo-Fieldwork > Residency-001 > Workspace-A`
  hierarchy and existing `Proof of Life` album;
- preserved the first album member;
- added exactly one existing second photograph;
- rejected unexpected membership rather than deleting or replacing it;
- created no folder or album and changed no source image or metadata; and
- completed twice with distinct nonces and the same stable two-member result.

The helper-return plan, private previews, identifiers, receipts, and verification
records remain outside public Git. Their bindings are recorded without exposing
the protected contents:

| Private helper-return artifact | SHA-256 |
| --- | --- |
| Inspection plan | `5a814c1e6add055cf72e48906a614815bf699c6470c98975685e3933e212b033` |
| Inspection receipt | `ff28c746a9fab9ec9e5eccfec1425715fc9d109136fb9660f3c5cca4cd5e8620` |
| Exact two-member plan | `337dcd7cfad7ead155c7b01a921033506b33f83400cf2da624d2ce7414d921b8` |
| First helper write receipt | `4d05aaedf4ec850b804ab9e2bf1d4d8d931d4c2274e0b42d116d565b8f96d823` |
| Idempotence helper receipt | `0daa9292d240667a5716bbec971b123e003cb40e4621eb147af6a2d88ecc6e16` |
| Read-only Photos verification | `2a15de3a33b0541ce49cae7aa4287b2bc5dbe3aaa085070888fd44180cebe859` |
| Receipt-structure comparison | `dcbeba32396a756c953f8742c213a0a8288d5ded143ef13b18eb9040d753772d` |

Both helper receipts report an exact album count of two. The separate read-only
Photos scripting check verified the nested hierarchy, both expected members,
and zero unexpected members after the idempotence run.

## Tool readiness

The installed `curate-apple-photos` skill resolves to the current clean
Photo Fieldwork checkout. On this encounter, local `main` and refreshed
`origin/main` both resolved to public commit
[`33082a9f17e8d9d6b1b3947d14db7f4559af5e01`](https://github.com/openhouse/photo-fieldwork/tree/33082a9f17e8d9d6b1b3947d14db7f4559af5e01).
The installed skill now links to that durable canonical checkout rather than a
temporary proof directory. The repository's 86-test regression suite, helper
typecheck, and 138 eval expectations passed before the operation.

The earlier version-2 helper failure remains part of the history. The repaired
version-2.5 app later passed static and live authorization checks and performed
the bounded inspection and write described above. This confirms the operation,
not universal future tool readiness.

The preferred WAL-aware read-only SQLite verifier could not open the Photos
catalog because macOS denied both available Python process identities. That
failure was preserved. The separate Photos scripting verification and two
consistent helper receipts provide useful corroboration, but are not described
as equivalent to independent catalog-level verification.

## What this does not establish

The photograph does not by itself establish chronology, location, project
membership, authorship, relationship, or public meaning. The existing People
association was used only as Jamie authorized: a private retrieval aid created
through years of archive care. Neither the association nor album membership
grants rights, consent, attribution, caption approval, or publication permission.

No raw identifier, filename, source path, preview, contact sheet, location, or
private receipt is present in this repository.

## Decision and next action

Keep `Proof of Life` as a private working album and both photographs on
publication hold. Let the pair remain a first encounter rather than forcing it
to represent the residency. Continue exploratory retrieval inside `Workspace-A`.
Before any release claim, restore the preferred independent catalog verifier or
record an explicitly reviewed substitute. Allow later photographs to confirm,
complicate, or displace this first response.
