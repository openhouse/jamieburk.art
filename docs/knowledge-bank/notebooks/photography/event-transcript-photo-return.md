---
id: notebook.photography.event-transcript-photo-return
title: Event transcript and photograph return
kind: notebook
status: draft
visibility: public-safe
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/notebooks/photography/event-transcript-photo-return.md
summary: A bounded method for returning event transcripts to related Apple Photos clusters and earlier photo-select trees without confusing retrieval signals with evidence or publication permission.
notebook_state: exploratory
projection:
  status: hold
  surfaces: []
relations:
  - type: part_of
    target: notebook.photography
    href: README.md
    context: The return protocol belongs to the held photography working notebook.
  - type: related_to
    target: index.knowledge-wiki.visual-evidence
    href: ../../indexes/visual-evidence.md
    context: The visual-evidence index keeps discovery, evidence, and public display separate.
  - type: related_to
    target: index.public-testimony-and-heteroglossia
    href: ../../indexes/public-testimony-and-heteroglossia.md
    context: Event transcripts can open a bounded search for contemporaneous photographic clusters.
---

# Event Transcript and Photograph Return

Jamie often recorded public events while making dense sequences of still
photographs. Soon afterward, he commonly generated an automated transcript,
imported the photographs into Apple Photos, exported a working set through
[photo-filter](https://github.com/openhouse/photo-filter/tree/feature/big-album),
and recursively edited that set with
[photo-select](https://github.com/openhouse/photo-select/tree/feature/repair-large-context).
This recurring practice creates several distinct traces of the same event.

The traces can help one another become findable. They do not collapse into one
source, and none silently supplies the authority missing from another.

## The Archive Signature

Photo-select creates `_keep` and `_aside` directories at each editorial pass
and normally recurses into the retained set. It also preserves level snapshots,
decision minutes, and other run state. A photograph found deeper in a nested
`_keep` chain has survived more recorded selection passes.

Keep depth is a prior editorial-survival signal, not an objective quality
score, factual endorsement, identity proof, rights decision, or publication
clearance. An `_aside` frame may be the better historical record, and an
unselected adjacent frame may reveal what a polished select excludes.

Photo-filter supplies another retrieval surface: albums, dates, filenames,
people associations, and exported working sets. Apple Photos Person labels may
guide private retrieval, but a Person label is a research lead, not public
identification, consent, role, attendance, or proof that the person is speaking
at a particular transcript timestamp.

## Bounded Return Protocol

Use this protocol for one event at a time.

1. **Establish the event envelope.** Begin with the best available public event
   record and the private recording metadata. Record the date, time zone,
   approximate start and end, venue at the appropriate privacy level, known
   recording gaps, and the source of each fact.
2. **Segment the audio before naming photographs.** Correct the automated
   transcript against audio, preserve time offsets, separate speakers, and mark
   uncertain words or identities. A transcript name does not identify a face.
3. **Retrieve a broad private photo window.** Query Apple Photos around the
   event envelope, allowing setup, arrival, breaks, conversations, and cleanup.
   Account for camera-clock error, time-zone conversion, delayed imports, film
   scans, and incomplete metadata.
4. **Use people associations as facets.** Existing Apple Photos Person labels
   may narrow a private candidate field. Do not identify unnamed faces or infer
   identity from resemblance.
5. **Locate earlier export and selection traces.** Search likely project and
   date folders for photo-filter exports, nested `_keep` and `_aside` trees,
   `_level-*` snapshots, decision minutes, and durable tool state. Record only
   opaque locator IDs in the public Wiki.
6. **Reconcile without flattening.** In a private crosswalk, connect Photos
   asset identity, exported filenames, selection depth, transcript intervals,
   and event records. Preserve uncertainty, filename collisions, edited
   variants, duplicates, bursts, and missing originals.
7. **Look at the full local cluster.** Inspect pixels locally. Compare the
   refined select with adjacent frames, rejected frames, room views, speaker
   transitions, audience response, apparatus, setup, and aftermath. The
   purpose is to understand the event, not merely recover a hero image.
8. **Propose associations, then verify them.** A timestamp overlap proposes
   that a frame may relate to a speech interval. Verify visible details,
   sequence continuity, photographer memory, public records, and, where
   appropriate, collaborator review before asserting who is shown or what is
   happening.
9. **Return separately governed outputs.** Create or amend photo-asset,
   photo-set, source, event, oral-history, inquiry, claim, caption, rights,
   credit, occurrence, and publication-decision records only where each is
   warranted. Do not promote the whole private crosswalk into public Git.

## Signal and Authority

| Trace | May help establish | Does not establish by itself |
| --- | --- | --- |
| Corrected audio transcript | Words audible in a bounded interval; attributed speaker when independently verified | Which still frame depicts that utterance; complete attendance; permission to republish |
| Photograph sequence | Visible people, objects, spatial relations, and sequence continuity | Interior states; institutional role; exact spoken words; full event meaning |
| Capture time | A retrieval window and possible temporal relation | Event identity or speaker identity |
| Apple Photos Person label | A private retrieval lead supplied by Jamie's maintained library | Public identification, consent, attendance, authorship, or speaker-to-frame alignment |
| Photo-filter export | A recoverable working set and filename bridge | Original asset identity when filenames collide; editorial approval |
| Nested `_keep` survival | Evidence of prior editorial attention | Objective merit, historical importance, factual support, or publication clearance |
| `_aside` and adjacent frames | Excluded context, alternatives, transitions, and possible corrections | Inferior value or a prohibition on later reconsideration |
| Oral history | A dated, perspective-bound recollection | Institutional confirmation or another participant's consent |

## Event Return Packet

The private packet may contain:

- a recording and transcript interval map;
- a broad event candidate manifest and verified preview index;
- a person-facet report using existing labels;
- a photo-select tree census with keep depth and decision-artifact coverage;
- a filename and asset-identity reconciliation report;
- local contact sheets and per-image observations;
- uncertain, contradicted, held, and not-recovered lists;
- rights, consent, credit, and collaborator-review tasks.

The public-safe return should contain only:

- the event and source records that are safe to name;
- aggregate retrieval method and access gaps;
- opaque IDs for protected materials;
- bounded observations and anti-claims;
- separately approved images, captions, credits, and source relationships.

## Cost-Aware Search Order

Start with high-information, low-cost signals: event date, recording duration,
public speaker order, known project, Photos album names, and exact exported
filenames. Then inspect person facets and likely selection roots. Only then
expand the time window or filesystem scope.

This ordering is a retrieval optimization, not a narrowing of the archive's
meaning. A deliberately broad adjacent-frame pass remains required before an
event return is considered editorially complete.

## Stop Conditions

Stop and record the gap when:

- audio, transcript, or time-zone alignment remains unresolved;
- a Person label conflicts with visible or documentary evidence;
- exported filenames cannot be reconciled to a unique Photos asset;
- the selection tree is incomplete or its generation history is unknown;
- rights, consent, photographer credit, or depicted-person safety is unresolved;
- the available images would turn participants into scenery for Jamie's story.

An unresolved return is still useful. It preserves what was searched, what was
found, what the traces can support, and what a future librarian or collaborator
can help recover.
