---
id: source.tooling.photo-select.curatorial-cascade
title: photo-select curatorial cascade
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-07-28
review_by: 2027-01-28
canonical_path: docs/knowledge-bank/sources/tooling/photo-select-curatorial-cascade.md
summary: >
  Public source repository for Jamie's recursive photographic selection tool,
  including its nested keep/aside tree, level snapshots, decision notes, and
  resumable curation records.
source_kind: public-source-repository
canonical_url: https://github.com/openhouse/photo-select/tree/feature/repair-large-context
reviewed_revision: 9ba66a0aa2606d55d8fca7c5a71b231f3ad9521e
relations:
  - type: documents
    target: method.photography.transcript-linked-source-return
    href: ../../methods/transcript-linked-photographic-source-return.md
    context: The recursive tree can help recover Jamie's earlier editorial attention.
  - type: related_to
    target: method.photography.artist-led-curatorial-loop
    href: ../../methods/artist-led-photographic-curation.md
    context: One historical implementation of iterative photographic selection.
---

# photo-select curatorial cascade

At the reviewed public revision, `photo-select` presents small batches of
images for a structured curatorial discussion, moves decided images into
`_keep` and `_aside`, and recursively repeats the process inside `_keep`.
Every level also receives a `_level-XXX` snapshot of the images originally
present, plus durable minutes, decisions, notes, and resumable state.

This creates a recoverable tree of prior editorial attention. A frame found
through several nested `_keep` directories survived several particular
selection rounds. That depth is useful provenance about a historical process,
not an objective aesthetic score, a permanent ranking, or proof that Jamie
personally made every intermediate decision. The result depends on the images
present, prompt, context, curators, model, provider, and date of the run.

The tree must be read with its `_aside` siblings, level snapshots, notes, and
available run context. Reusing an image still requires exact source binding,
creator and represented-person review, factual captioning, crop and credit
decisions, destination review, and Jamie's approval.
