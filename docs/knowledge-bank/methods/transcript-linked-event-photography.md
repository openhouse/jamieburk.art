---
id: method.transcript-linked-event-photography
title: Transcript-linked event photography
kind: method
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/methods/transcript-linked-event-photography.md
summary: Privacy-preserving method for returning from a public-event transcript to Jamie's simultaneous documentary photography and prior filesystem selection work.
relations:
  - type: related_to
    target: method.situated-source-rereading
    href: situated-source-rereading.md
  - type: related_to
    target: index.knowledge-wiki.photography
    href: ../indexes/photography.md
  - type: related_to
    target: index.knowledge-wiki.commercial-rent-stabilization-testimony
    href: ../indexes/commercial-rent-stabilization-testimony.md
---

# Transcript-linked event photography

Jamie often records public-event audio while making stop-motion documentary
photographs. Transcripts and photographs are therefore parallel observations
of the same public moment, not an arbitrary text-and-image pairing.

## Retrieval braid

An event-photo return may combine four independently useful signals:

1. **Transcript time:** event date, recording start, and speaker timestamps.
2. **Apple Photos time:** locally retained capture and import metadata, with
   known clock and scan-date uncertainty kept visible.
3. **People associations:** Jamie's existing Apple Photos People labels may
   narrow a speaker search. They are private retrieval metadata, not public
   identity proof.
4. **Selection depth:** exported photo-select trees use recursive `_keep`
   directories. A deeper `_keep` path records survival through more selection
   rounds and is useful evidence of prior curatorial attention.

Photo-filter exports and photo-select trees may also retain event naming,
neighboring frames, contact sheets, minutes, decisions, `_aside` alternatives,
and `_level-*` snapshots. These are prior editorial records, not automatic
publication decisions.

## Protocol

1. Start with one named public event and a hash-bound transcript.
2. Establish the public speaking interval and a bounded capture-time window.
3. Search the private Photos inventory by date and time before using People
   associations; preserve timezone and import uncertainty.
4. Search local and attached volumes for matching export roots and nested
   `_keep` chains. Do not expose private paths in Git.
5. Inspect pixels locally. Confirm that the visible scene and speaker context
   agree with the event hypothesis.
6. Record candidate relationships privately: transcript timestamp, asset ID,
   time delta, People-label match state, select-tree depth, visible rationale,
   and uncertainty.
7. Materialize only public-safe asset records. Keep Photos UUIDs, face data,
   exact private locations, private filesystem paths, and unselected pixels
   outside the public repository.
8. Treat rights, consent, safety, credit, crop, caption, and destination as
   separate human gates. A timestamp, People label, or deep `_keep` path does
   not clear an image for publication.

## Interpretation

Selection depth is ordinal process evidence, not a universal quality score.
An image may be deep in `_keep` because it served a different brief. An image
in `_aside` may become newly important when a transcript reveals a speaker,
gesture, relationship, or historical detail that earlier curation did not
need.

The return should therefore preserve both the earlier decision and the present
reading. The aim is not to make the archive agree with the transcript. It is
to let two situated records illuminate one another.
