---
id: method.photography.transcript-linked-source-return
title: Transcript-linked photographic source return
kind: method
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-28
review_by: 2027-01-28
canonical_path: docs/knowledge-bank/methods/transcript-linked-photographic-source-return.md
summary: >
  A governed method for returning from a public-event transcript or recording
  to the associated photographic field without collapsing retrieval metadata,
  speaker attribution, identity, rights, or editorial selection.
relations:
  - type: related_to
    target: method.photography.oral-history-return
    href: photographic-oral-history-return.md
    context: A recovered event cluster can be returned for situated first-person memory.
  - type: related_to
    target: source.vault.apple-photos.metadata
    href: ../sources/apple-photos-archive-metadata.md
    context: Private archive and People-label boundary for candidate retrieval.
  - type: informed_by
    target: source.tooling.photo-filter.apple-photos-export
    href: ../sources/tooling/photo-filter-apple-photos-export.md
    context: Album, time, and People-label retrieval plus exported-filename lookup.
  - type: informed_by
    target: source.tooling.photo-select.curatorial-cascade
    href: ../sources/tooling/photo-select-curatorial-cascade.md
    context: Recoverable nested selection trees and their historical decision context.
  - type: related_to
    target: index.knowledge-wiki.public-testimony
    href: ../indexes/public-testimony.md
    context: Governed transcripts can identify candidate events, turns, and speakers.
---

# Transcript-linked photographic source return

Jamie often made an audio recording and stop-motion documentary photographs
during the same public event. Soon afterward, he commonly transcribed the
recording, exported photographs from Apple Photos through `photo-filter`, and
refined selections through `photo-select`. Those parallel traces make a
powerful source-return path: words can orient a photographic search, while
photographs can restore the room, sequence, relationships, labor, and material
conditions surrounding the words.

The join is never automatic. A transcript, recording, metadata row, People
label, exported filename, select-tree position, and visible photograph are
different sources with different authorities.

## Recover an event bundle

1. Begin with a governed public transcript, approved recording, or bounded
   event record. Preserve whether the text is official, automated, repaired,
   recollected, or unresolved.
2. Establish a private candidate window using available date, time, place,
   album, filename, visible signage, sequence, and project context. Metadata
   supports retrieval; it does not establish the event narrative.
3. Use Apple Photos People labels only to retrieve identity candidates. Compare
   them with visible evidence, transcript attribution, official programs,
   contemporary records, and human confirmation.
4. Search historical exports and `photo-select` trees for the same candidate
   files or scene families. Read each nested `_keep` with its `_aside`
   siblings, `_level-XXX` snapshots, notes, prompt, curators, model, and date
   when those records survive.
5. Preserve a broad sequence before selecting a hero. Jamie photographs in
   clusters; adjacent frames can show who entered, listened, spoke, worked,
   responded, or changed the room.
6. Return the bounded cluster for oral history and collaborator context.
   Decompose the response into observation, recollection, research lead,
   collective-credit question, protected detail, and claim candidate.

## Identity and speaker annotation

A People label and a transcript speaker label may point toward the same person,
but neither validates the other. Record the relationship as:

- **candidate:** a private retrieval association awaiting review;
- **corroborated:** multiple independent sources support the association;
- **confirmed for research:** a qualified human has reviewed the exact frame;
- **approved for public naming:** the exact occurrence, name, context, and
  dignity have passed separate editorial and represented-person review.

Do not infer that a visible person is speaking merely because their label and a
transcript turn occur near one another. Exact synchronization, visible speaking
evidence, an official record, or human confirmation is required. Preserve
uncertainty when the audio and camera clocks drift or film scans lack original
capture dates.

## Read the select tree as history

Deeper `_keep` membership means that a frame survived more rounds of a
particular recursive curation. It is a historical curatorial signal, not an
objective quality measure or a mandate for current use. Prompts, collaborators,
models, surrounding candidates, and the purpose of each run may differ.

Never discard the `_aside` population from interpretation. A current editor may
find that an earlier aside better carries collective agency, a quieter form of
work, a represented person's dignity, or the needs of a new public argument.
Record current choices as a new decision layer rather than rewriting the old
tree.

## Public/private boundary

Keep raw People labels, exact timestamps, coordinates, private album names,
filenames, source identifiers, local paths, contact sheets, transcripts,
recordings, and unapproved pixels outside public Git. Public records may
describe the method, bounded source classes, reviewed findings, and opaque
private bindings.

No association or selection grants photographer rights, represented-person
consent, identity approval, factual caption clearance, creator credit, crop,
destination, production, or indexing approval. Every public occurrence keeps
those decisions distinct and ends with Jamie's review of the unchanged
candidate.
