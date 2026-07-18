---
id: glossary.knowledge-wiki.schema
title: Knowledge Wiki schema and vocabulary
kind: glossary
status: maintained
visibility: public-safe
sensitivity: low
projection_status: never-public
last_reviewed: "2026-07-18"
review_by: "2027-01-18"
human_review_state: not-requested
aliases:
  - Wiki record contract
canonical_path: docs/knowledge-wiki/schema.md
summary: Minimal governed contract for Wiki-page identity and typed relations.
authority_refs: []
relations: []
---

# Schema And Vocabulary

The Markdown contract stays deliberately small. Existing typed application
records remain authoritative for claims, sources, evidence, corrections,
citations, rights, and public projections.

## Shared Fields

Every governed Wiki record has:

```yaml
id: project.callnyc
title: CallNYC
kind: project
status: maintained
visibility: public-safe
sensitivity: low
projection_status: careful
last_reviewed: "2026-07-18"
review_by: "2027-01-18"
human_review_state: not-requested
aliases: []
canonical_path: docs/knowledge-wiki/projects/callnyc.md
summary: A public-safe orientation sentence.
authority_refs: []
relations: []
```

Paths and titles may change. Stable IDs do not.

## Record Kinds

The first governed vocabulary is:

```text
project, person, organization, event, place, source, asset, claim,
research-run, research-inquiry, decision, correction, method, timeline,
application, evaluation, index, glossary, anti-claim, capability,
opportunity, projection
```

Add a kind only when it has a distinct validation or retrieval need.

## Lifecycle

Statuses:

```text
inbox, draft, maintained, governed-open, superseded, archived, retired
```

Projection states:

```text
ready, careful, pending, protected, never-public
```

Human-review states:

```text
not-requested, requested, scheduled, completed, human-blocked, resolved
```

Automated success never changes a human-review state.

## Relations

Use:

```text
part_of, informed_by, resulted_in, supports, contradicts, supersedes,
documents, mentions, participated_in, organized_by, collaborated_with,
uses_source, uses_method, has_asset, located_at, projected_to, related_to
```

Use `related_to` only when the context explains why a more precise edge does
not apply. Typed relations support retrieval; ordinary prose links support
understanding. Keep both.

## Authority References

`authority_refs` point to existing canonical typed records:

```yaml
authority_refs:
  - domain: claim
    id: CLM-CALLNYC-INDEPENDENT-FOLLOW-ON
```

Recognized domains are `source`, `claim`, `inquiry`, `correction`,
`citation-page`, and `proof`. A reference must resolve. It does not copy the
full canonical record into Markdown.

## Wanted Records

Use `wanted` for deliberate future work:

```yaml
wanted:
  - id: event.betanyc.school-of-data.2016
    proposed_title: BetaNYC School of Data presentation
    reason: Needed to complete the public-launch chronology.
```

A wanted record is not a broken link. `not recovered` is not `never existed`.

Return to the [Knowledge Wiki start page](README.md) or continue with the
[authoring workflow](authoring.md).
