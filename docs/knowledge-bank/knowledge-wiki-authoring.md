# Knowledge Wiki Authoring Guide

The Knowledge Wiki is useful today in VS Code, GitHub, and any plain Markdown
reader. No proprietary wikilink syntax or custom editor is required.

## Daily Workflow

1. Open [Knowledge Wiki](README.md).
2. Open Markdown Preview to the side.
3. Follow purposeful relative links.
4. Search the stable ID before creating a record.
5. Use Find File References or the generated backlink report.
6. Use link-aware rename for headings and files.
7. Run `npm run wiki:check` before committing.
8. Run `npm run wiki:report` after changing governed records.
9. Inspect `wiki-delta.json` and public projection changes.

## Authored And Generated Files

Markdown with `wiki_record: true` is authored. Files under
`reports/knowledge-wiki/generated/` are deterministic outputs and say “do not
edit directly.” Change the source record, then regenerate.

## Minimal Record

```yaml
---
wiki_record: true
id: project.example
title: Example project
kind: project
status: draft
visibility: public-safe
sensitivity: low
projection_status: pending
discoverable: true
last_reviewed: 2026-07-18
review_by: 2026-10-18
review_state: requested
owner: Jamie Burkart
canonical_path: docs/knowledge-bank/projects/example.md
relations: []
---
```

Add `canonical_refs` only for IDs that exist in the canonical citation registry.
Do not copy a source URL, protected locator, or evidence inventory into Markdown
merely to make the page look complete.

## Links And Relations

Use an ordinary relative link when following it helps the reader's current
task. Use a typed relation when a connection must be validated, queried, or
reused.

```yaml
relations:
  - type: uses_source
    target: source.example
    href: ../sources/example.md
    context: Supports the bounded date claim.
```

The relation target and `href` must resolve to the same governed record.
`related_to` is a last resort. Collaboration never implies endorsement,
exclusive authorship, or approval of the current narrative.

## Moves And Heading Changes

When moving a page, preserve `id`, update `canonical_path`, use VS Code's
link-aware move, regenerate, and inspect backlinks. A title or path change must
not create a new conceptual identity.

When renaming a heading, update inbound fragments. The checker validates
cross-file and same-file fragments.

## Uncertainty And Absence

Distinguish:

- wanted;
- accidentally broken;
- not recovered;
- not public;
- protected;
- retired;
- did not occur;
- unknown.

“Not recovered” is a scoped research result. It is not proof that something
never existed.

## Corrections

Material corrections identify previous and corrected claim records, reason,
affected surfaces, date, and review state. Do not silently overwrite
consequential history. Use append-only lifecycle events when the change also
alters intake, promotion, amendment, or retirement state.

## Media

A media record can state what an image visibly supports and what it does not
establish. Rights, consent, credit, and evidentiary value are separate. Never
commit the full photo archive, private paths, face-recognition data, raw EXIF,
participant lists, or unapproved images.

## Commands

```bash
npm run wiki:graph
npm run wiki:report
npm run wiki:check
npm run wiki:test
npm run wiki:tasks
npm run wiki:query -- --project callnyc
npm run wiki:query -- --backlinks project.callnyc
npm run wiki:query -- --surface /work/callnyc
npm run evals:wiki
```

`wiki:tasks` prints human retrieval protocols; it does not fabricate human
results. Existing `knowledge-bank` and `query:knowledge` commands remain
compatibility interfaces for their current canonical layers.
