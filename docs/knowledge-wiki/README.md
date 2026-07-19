---
id: index.knowledge-wiki
title: Knowledge Wiki
kind: index
status: maintained
visibility: public-safe
sensitivity: low
projection_status: never-public
last_reviewed: "2026-07-18"
review_by: "2027-01-18"
human_review_state: not-requested
aliases:
  - Knowledge Bank start page
canonical_path: docs/knowledge-wiki/README.md
summary: Task-oriented entrance to the public-safe Knowledge Wiki.
authority_refs: []
relations: []
---

# Knowledge Wiki

The Knowledge Wiki is Jamie Burkart's internal, Git-reviewed, Markdown-first
system for source-backed operating memory. It is not a public or anonymously
editable wiki. Because this repository is public, every committed record must
be safe for public discovery.

The former name, **Knowledge Bank**, remains a compatibility and historical
alias. Existing typed records and research notes have not been copied or
globally renamed.

## Start Here

- [Projects](indexes/projects.md): begin with a body of work.
- [Sources](indexes/sources.md): inspect what an artifact establishes and what
  it does not.
- [Claims and corrections](indexes/claims-and-corrections.md): follow approved
  propositions, anti-claims, and consequential revisions.
- [Capabilities and opportunities](indexes/capabilities-and-opportunities.md):
  assemble role-specific professional evidence.
- [Photo and media review](indexes/media-review.md): inspect evidence, rights,
  consent, and display as separate questions.
- [Open questions](indexes/open-questions.md): distinguish wanted records from
  broken links and non-recovery from nonexistence.
- [Retrieval tasks](evaluations/retrieval-tasks.md): test whether another person
  can find and trust an answer.

## Work Safely

- Read the [schema and relation vocabulary](schema.md).
- Follow the [authoring, move, and correction workflow](authoring.md).
- Review the [architecture inventory](../architecture/knowledge-wiki-inventory.md)
  and [authority decision](../architecture/ADR-knowledge-wiki-name-and-model.md).
- Use the deeper [Knowledge Bank compatibility layer](../knowledge-bank/README.md)
  when a record needs the existing research and governance context.

## Commands

```bash
npm run wiki:check
npm run wiki:test
npm run wiki:graph
npm run wiki:report
npm run wiki:tasks
npm run wiki:query -- --help
npm run wiki:opportunities
npm run wiki:coverage
npm run wiki:discovery
npm run eval:portfolio:acceptance
```

Generated graph and health artifacts live under
`.artifacts/knowledge-wiki/`. They are derived, ignored by Git, and must never
be edited as canonical records.

## What Is Not Here

Raw transcripts, private correspondence, participant lists, private contact
details, legal-review material, credentials, unpublished photographs, private
analytics, and sensitive community records remain outside this repository.
`noindex`, staging, an obscure URL, and `visibility` frontmatter are not privacy
controls.

## Durable Rule

Markdown is the record. The Wiki Graph is compiled from the record. Existing
typed authorities govern evidence and publication. The portfolio is a smaller,
audience-specific projection.
