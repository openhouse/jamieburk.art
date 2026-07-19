---
id: index.knowledge-wiki
title: Knowledge Wiki
kind: index
status: maintained
visibility: public-safe
sensitivity: low
projection_status: never-public
last_reviewed: "2026-07-19"
review_by: "2027-01-19"
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
- [Jamie at Work](methods/jamie-at-work.md): understand the recurring operating
  practice before choosing a project example.
- [What the Work Was Up Against](indexes/what-the-work-was-up-against.md): name
  the condition and pressure before describing a response.
- [Selected practice chronology](timelines/selected-practice-chronology.md):
  move across two decades of source-backed work without treating the selection
  as a complete life history.
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
- [Evidence debt and promotion queue](indexes/evidence-debt-and-promotion-queue.md):
  see what still needs a source return, collaborator correction, rights review,
  or editorial decision.
- [Canonical Story Bank](indexes/canonical-story-bank.md): preserve situation,
  Jamie's action, usable result, collective context, and honest limit together.
- [Operational Evidence Map](indexes/operational-evidence-map.md): distinguish
  responsibility, delivery, wider outcome, and boundary.
- [Decision Records](indexes/decision-records.md): inspect actors, constraints,
  observed choices, unknowns, and anti-claims.
- [Places where the work became real](indexes/places-where-work-became-real.md):
  retrieve situated work without treating places or people as scenery.
- [What is at stake for me](methods/what-is-at-stake-for-me.md): read an
  explicitly AI-assisted first-person draft awaiting Jamie's authorship review.
- [Retrieval tasks](evaluations/retrieval-tasks.md): test whether another person
  can find and trust an answer.
- [NYC Artist Coalition archive evaluation](evaluations/nycac-shared-folder-coverage.md):
  test population closure, public safety, collective credit, and application
  usefulness.
- [Missing pages and source return evaluation](evaluations/missing-pages-and-source-return.md):
  test whether wanted pages remain grounded in fresh source review and open
  human questions.
- [Editorial depth evaluation](evaluations/editorial-depth.md): test distinct
  attribution, evidence, consent, and authorship gates for four deeper pages.
- [Family closure evaluation](evaluations/family-closure.md): verify that the
  frozen A-E family resolves into one architecture and exact candidate.

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
npm run wiki:eval
npm run wiki:eval:source-return
npm run wiki:test:source-return
npm run wiki:eval:editorial-depth
npm run wiki:test:editorial-depth
npm run wiki:eval:family-closure
npm run wiki:test:family-closure
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
