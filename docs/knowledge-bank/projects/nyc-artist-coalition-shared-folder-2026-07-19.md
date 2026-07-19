---
id: project.nyc-artist-coalition-shared-folder-2026-07-19
title: NYC Artist Coalition shared-folder archival production
kind: project
status: maintained
visibility: public-safe
sensitivity: moderate
last_reviewed: 2026-07-19
review_by: 2026-10-19
relations:
  - type: demonstrates
    target: capability.technical-operations
---

# NYC Artist Coalition Shared-Folder Archival Production

This dossier records a read-only, authenticated archival-production pass over
the complete accessible snapshot of the NYC Artist Coalition shared folder. It
publishes aggregate method, findings, limitations, and claim decisions. Exact
Drive identifiers, item paths, owner displays, raw content, close-reading text,
participant information, and protected source coordinates remain outside Git.

## Coverage Contract

For this pass, 100 percent means that every item reachable beneath the shared
folder at snapshot time received inventory, classification, and one primary
disposition. It does not mean that every file was fully read, rights-cleared, or
approved for publication.

| Measure | Result |
| --- | ---: |
| Accessible population | 2,078 |
| Inventoried | 2,078 |
| Classified | 2,078 |
| Dispositioned | 2,078 |
| Folders | 253 |
| Non-folder records | 1,825 |
| Priority records close-read | 36 |
| Close-reading errors | 0 |
| Rights-reviewed records | 0 |
| Projection-selected source records | 2 |

The root population reconciled at 61 items: 47 folders and 14 loose files. All
253 folders reached a final traversal state. Twenty initial traversal
exceptions were adjudicated as 18 true empty folders and two recovered folders.
The recursive queue closed at zero.

An attempted whole-folder ZIP failed during Google Drive's archive preparation.
This was not a census gap because the item and folder populations had already
closed through per-folder traversal.

## Primary Dispositions

| Disposition | Records |
| --- | ---: |
| Pending rights, consent, attribution, or Jamie review | 1,221 |
| Public-safe summary of protected source | 409 |
| Protected metadata only | 253 |
| Duplicate or derivative | 106 |
| Unreadable or unsupported format | 89 |

Every source item remains protected. Access did not confer publication rights,
prove ownership or authorship, or turn coalition records into individual
accomplishments.

## Close-Reading Slate

Thirty-six priority Google Docs received close reading across six clusters:

- coalition formation and facilitation;
- Cabaret Law repeal and Let NYC Dance;
- MARCH and Talks Not Raids;
- Office of Nightlife and town-hall production;
- Fair Rent NYC and Commercial Rent Stabilization;
- civic data and web implementation.

The close-reading corpus contains 183,871 characters and remains in protected
custody. This public dossier records what the evidence affords, not the private
text itself.

## Claims Promoted

### Participation to action

`CLM-NYCAC-PARTICIPATION-TO-ACTION-SYSTEM` is approved for the civic case
study. A protected 2017 working guide identifies Jamie as a co-writer and
documents a repeatable collective method: recurring meetings and issue
prioritization developed into shared letters, pocket-size calls to action,
meetings with officials, public events, phone calls, and Council testimony.
Public City and Council records corroborate several of those channels.

This is evidence that Jamie helped articulate and operationalize the method. It
does not make him the sole designer, facilitator, author, or cause of outcomes.

### Machine-readable civic design

`CLM-NYCAC-MACHINE-READABLE-CIVIC-DESIGN` is approved for the civic case study
and technical-operations page. In official March 2019 Council testimony, Jamie
proposed machine-readable Open Data records covering permits, certificates,
requirements, cost, timing, and agency pathways so tools could help small
businesses navigate legality, safety, and compliance.

The record establishes the proposal and its product logic. It does not establish
Council adoption, dataset publication, tool delivery, or authorship of the
Council bills under discussion.

## Claims Held

- The 2017 Office of Nightlife town-hall records identify Jamie and Olympia
  Kazi as organizers and show a broad production system. A full public credit
  remains held pending public-event and collaborator corroboration.
- A FairRentNYC implementation checklist assigns Jamie specific completed web
  tasks while preserving a collaborator's separate section. Detailed public
  role wording remains held pending code and deployment lineage.
- Internal MARCH analysis records establish an evidence workflow but not
  independently reproducible figures. Metrics remain held pending data,
  denominator, transformation, and output review.
- Visual, audio, video, design, and identifiable participant records remain held
  for creator, rights, consent, attribution, sensitivity, caption, and editorial
  decisions.

## Custody And Reproducibility

The exact private manifest is stored outside Git. Its SHA-256 digest is:

`250de23a17cf990de9f87d5374bb3325265ed7321a5cfe9eb4b38aec71bf62ba`

The aggregate machine-readable census is stored at
`apps/www/src/data/knowledge-bank/fixtures/nycac-shared-folder-public-census.json`.
The digest binds that public summary to the protected item-level manifest
without exposing the manifest.

## Scope Limits

The defined population excludes deleted or no-longer-shared items, revision
histories, resolved comments, and records held only in external systems. Drive
ownership and modification displays are not conclusive creator evidence. No
raw Drive record, private locator, contact record, or unapproved media artifact
entered the repository. This work adds no public Knowledge Wiki route and no
`/proofs` page.
