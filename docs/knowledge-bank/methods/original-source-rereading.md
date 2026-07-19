---
id: method.original-source-rereading
title: Original-source rereading
kind: method
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-19
review_by: 2026-10-19
relations:
  - type: informed_by
    target: method.source-backed-team-memory
  - type: related_to
    target: policy.knowledge-wiki-authoring
  - type: supports
    target: project.nyc-artist-coalition
  - type: supports
    target: project.wowlist
  - type: supports
    target: project.kc-town-hall
  - type: supports
    target: project.fair-rent-nyc
---

# Original-source rereading

The Knowledge Wiki should remember prior archival production without becoming
dependent on its summaries. Periodically returning to original source material
keeps interpretation situated in the present: we bring a current question,
notice what the earlier pass could not yet see, and allow the record to correct
the story we have learned to tell.

This is a practice of attention, not a mandate for total capture. A source may
remain protected, unavailable, unmaterialized, too sensitive to process, or
outside the present purpose.

## Source return protocol

1. Name the present question and the page it may change.
2. Resolve the canonical source ID to an appropriate access class. Keep local
   paths, cloud resource keys, authentication state, and private titles outside
   public Git.
3. Inspect the original artifact when access and rights permit. For a PDF or
   image-led document, include visual review rather than relying only on
   extracted text. For structured data, use a structured reader and preserve
   definitions and formulas.
4. Record the actual scope: complete population, selected pages, bounded sample,
   metadata-only review, or unsuccessful recovery attempt.
5. Compare the source against current claims, anti-claims, relationships,
   credit, rights, and publication state.
6. Update the canonical typed record if an exact claim, source, evidence,
   correction, or research task changes. Use Markdown for context and
   orientation, not a second evidence registry.
7. Record the next return. A useful rereading often produces a better question
   rather than immediate public copy.

## Access classes

| Class | Meaning | Public record |
| --- | --- | --- |
| Public original | Available without authenticated access | Public URL or canonical source ID may be used when approved. |
| Authenticated public surface | Public-facing material inspected through an authorized account | Record bounded method and public-safe IDs; never session state. |
| Protected collaborative source | Authorized working material with private context | Use opaque canonical IDs and public-safe findings only. |
| Local protected artifact | Authorized local original such as a database, workbook, PDF packet, or repository | Keep locators and raw contents outside Git; publish only approved metadata or aggregates. |
| Not materialized | Known cloud artifact has not become locally available | Record the wait or use another authorized access method. |
| Not recovered | A bounded search did not locate the artifact | Preserve negative knowledge; never rewrite it as `never existed`. |
| Deliberately not processed | Access would be disproportionate, harmful, or outside the present purpose | Record the hold without creating pressure to ingest. |

## Personal librarian request

When access fails or the source identity is unclear, the agent should ask Jamie
as personal librarian with a bounded request:

- the page and present question;
- the public-safe source ID or description;
- the access class attempted and observed state;
- the smallest artifact or decision that would unblock the work;
- the privacy, rights, and retention plan;
- what the request cannot establish by itself.

The request should not expose a private path in an issue, pull request, or
public document. Jamie's access authorization permits research; it does not
automatically permit quotation, publication, retention, or promotion.

## July 19 source-return set

This pass returned to four original-source groups for the new project overview
pages:

- an official City Council hearing transcript, read in extracted and rendered
  form, for [NYC Artist Coalition](../projects/nyc-artist-coalition.md);
- the protected historical database and longitudinal coordination workbook,
  read through structured metadata and a public-safe aggregate audit, for
  [WOW List](../projects/wowlist.md);
- the original 24-page CCED proposal packet, read in extracted and rendered
  form, for [KC Town Hall](../projects/kc-town-hall.md); and
- protected collaborative running minutes, reread around decisions, action
  ownership, consent, source lineage, and no-decision states, for
  [Fair Rent NYC](../projects/fair-rent-nyc.md).

No raw protected content, person-level row, private locator, or authenticated
state entered the repository. The project pages record scope, what changed,
what remained bounded, and the next return.

## What this practice cannot establish

- that accessible sources form a complete archive;
- that every source should be processed or retained;
- that a source custodian authored its contents;
- that a rereading author may speak for every collaborator or participant;
- that an agent's interpretation is independent corroboration;
- that access authorization grants public-use rights;
- that a passing eval means a page belongs on the portfolio site.
