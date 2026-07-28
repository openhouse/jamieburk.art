---
id: source.recollection.jamie.event-photo-select-workflow.2026-07
title: Jamie Burkart recollection of the event transcript and photo-select workflow
kind: source
status: maintained
visibility: public-safe
sensitivity: moderate
created: 2026-07-28
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/jamie-event-photo-select-workflow-recollection-2026-07.md
summary: Public-safe recollection and code-supported orientation to Jamie's recurring event-audio, Apple Photos, photo-filter, and recursive photo-select workflow.
source_kind: first-person-recollection-plus-code-review
projection_status: hold
projection:
  status: hold
  surfaces: []
relations:
  - type: related_to
    target: method.photographic-archive-fieldwork
    href: ../methods/photographic-archive-fieldwork.md
---

# Event transcript and photo-select workflow

Jamie recalls that public events he audio-recorded were often photographed at
the same time as stop-motion documentary sequences. Soon after an event, the
audio would enter an automated transcription workflow while the photographs
entered Apple Photos. He would then use his Photo Filter and Photo Select tools
to export and refine candidate photographs.

The public code supports the workflow's structural description:

- [Photo Filter](https://github.com/openhouse/photo-filter/tree/feature/big-album)
  browses macOS Photos albums, exposes recognized People associations for
  filtering, and supports bounded exports.
- [Photo Select](https://github.com/openhouse/photo-select/tree/feature/repair-large-context)
  creates `_keep` and `_aside` directories, then recursively re-runs selection
  inside `_keep`. A deeper `_keep` lineage therefore records survival through
  more prior selection rounds.

## Research affordance

For a recovered public-event transcript, a protected local research pass may
join:

1. event date and approximate recording window;
2. venue, project, and public event title;
3. attributed transcript speakers;
4. existing private Apple Photos People labels;
5. Photos album and import context;
6. exported filesystem cohorts; and
7. recursive `_keep` depth and accompanying selection artifacts.

This is a retrieval and prior-curation signal. It can efficiently surface
strong candidate images and related sequences, including photographs of a
speaker near the time of their recorded remarks.

## Evidence limits

- A timestamp near a speech does not prove the pictured person's identity.
- An existing People label is private navigation metadata, not public
  attribution, consent, or permission.
- `_keep` depth records prior selection survival; it does not prove why a
  photograph was selected or that it remains the best choice now.
- Album titles, imported-film dates, scans, and filesystem dates may be
  incomplete or misleading.
- Visual inspection and source comparison remain necessary.
- No private path, face identifier, coordinate, OCR text, or People label should
  enter the public repository.

## Publication boundary

This source record does not clear any photograph. A candidate must still pass
image-specific authorship, rights, represented-person, safety, caption, crop,
context, destination, deployment, and indexing review. The workflow should
create event-photo research leads and protected local selections, not automatic
public placements.
