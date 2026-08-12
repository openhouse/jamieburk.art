---
id: index.knowledge-wiki.jamie-sourcebook
title: Jamie Burkart Sourcebook pilot
kind: index
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-03
review_by: 2026-11-03
canonical_path: docs/knowledge-bank/indexes/jamie-sourcebook.md
summary: A public-safe adapter joining the Knowledge Wiki to a Git-native pilot of Jamie Burkart's already-public, self-authored Council testimony.
projection:
  status: hold
  surfaces: []
relations:
  - type: related_to
    target: index.public-testimony
    href: public-testimony.md
    context: The existing governed corpus supplies the three canonical statement bodies and its explicit recovery boundary.
  - type: related_to
    target: testimony.jamie-burkart.cabaret-law.2017-09-14
    href: ../testimony/2017-09-14-cabaret-law-repeal.md
  - type: related_to
    target: testimony.jamie-burkart.cultural-affairs-budget.2018-03-16
    href: ../testimony/2018-03-16-cultural-affairs-budget.md
  - type: related_to
    target: testimony.jamie-burkart.sbjsa.2018-10-22
    href: ../testimony/2018-10-22-small-business-job-survival-act.md
---

# Jamie Burkart Sourcebook pilot

This is the Knowledge Wiki side of the bounded Sourcebook implementation in
[RFC 0004](../../../rfcs/0004-jamie-burkart-sourcebook-and-knowledge-ecosystem.md).
The Sourcebook's [start page](../../../sourcebook/START-HERE.md) provides
ordinary GitHub and VS Code navigation by year, project, theme, and source type.

The pilot indexes the complete governed population of three recovered,
already-public statements delivered by Jamie in official New York City Council
hearings. The statement bodies remain stored once, at their existing testimony
paths. `sourcebook/catalog.json` is authoritative for the pilot's perspective
metadata, classification basis, body fingerprint, rights and consent state,
credit boundary, and Git-only projection decision.

## What the join establishes

- Jamie delivered the three statements in the bounded official contexts named
  by their controlling transcripts.
- Each Sourcebook record has one canonical body, one immutable body digest, a
  written stance basis, and explicit anti-claims.
- The generated public export is sufficient for Git-native discovery without a
  private build dependency.

## What the join does not establish

- The hearings, public officials, institutions, or other speakers endorsed
  Jamie or every assertion in the statements.
- Jamie alone caused the campaigns, policies, administrative actions, or
  legislative outcomes discussed in the testimony.
- Protected recommendation letters, correspondence, transcripts, photographs,
  or relationship records are cleared for public use.
- Inclusion in this pilot authorizes an About-page module, testimonial wall,
  archive browser, deployment, or production indexing.

The same-repository commit pins the Sourcebook export and this Knowledge Wiki
adapter together. Any future separate repository must replace that temporary
join with a repository, record ID, commit, and export fingerprint.
