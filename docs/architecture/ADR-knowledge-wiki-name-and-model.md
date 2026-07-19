# ADR: Knowledge Wiki Name, Authority, and First Model

**Status:** accepted for the bounded foundation  
**Date:** 2026-07-18  
**Decision owner:** Jamie Burkart  
**Implementation branch:** `feature/knowledge-wiki-B`

## Context

The earlier name, **Knowledge Bank**, accurately described preservation and
evidence custody. The working system now also supports navigation, revision,
typed relationship, correction, retrieval, and selective projection. Its
current implementation already separates typed claims and sources from public
site composition.

## Decision

The canonical product name is **Knowledge Wiki**.

The Knowledge Wiki is a Markdown-first semantic wiki with a compiled Wiki
Graph and governed public projections. It is internal in purpose but stored in
a public repository; every committed record must therefore be public-safe.

The durable model is:

```text
Authored Markdown records
  -> ordinary links and stable Wiki-page identities
  -> typed relations and references to existing authorities
  -> deterministic Wiki Graph and health reports
  -> selective portfolio, resume, application, citation, and caption projections
```

The former term **Knowledge Bank** remains a compatibility and historical
alias. No global directory, package, command, import, or ID rename occurs in
this foundation.

## Authority by Domain

- Markdown owns Wiki-page identity, orientation, narrative, and authored
  navigation.
- Existing typed records own sources, claims, evidence, inquiries,
  corrections, citation occurrences, rights, consent, and publication state.
- `work.ts`, governed claim projections, and composition manifests own the
  current public portfolio projection during migration.
- Generated graphs, backlinks, indexes, and health reports are derived and
  never edited as canonical records.
- Raw and protected evidence remains in the Source Vault / private archive
  outside the repository.

Every duplicated value requires an explicit authority reference and a drift
check. The bounded pilot uses `authority_refs` rather than copying complete
typed records into frontmatter.

## Four Graphs

1. **Document graph:** Markdown files, prose links, and heading fragments.
2. **Semantic graph:** stable Wiki IDs and controlled typed relations.
3. **Evidence graph:** existing claim-to-source relationships and their limits.
4. **Governance graph:** visibility, rights, consent, correction, approval, and
   projection state.

The compiler checks alignment without collapsing these graphs into one kind of
edge.

## First Foundation

The first foundation is report-first and bounded to a public-safe CallNYC,
Technical Operations, Source-Backed Team Memory, media, correction, and
opportunity pilot. It adds no public route and no editing interface.

Stable IDs survive path changes. Relative links remain the human navigation
language. Typed relations remain small and governed. Missing future records
use explicit `wanted` entries; `not recovered` never becomes `did not exist`.

## Generated Artifacts

The canonical compiler emits deterministic artifacts under
`.artifacts/knowledge-wiki/`. They include a source commit, source-tree
fingerprint, semantic fingerprint, and generated-at value derived from the
source commit rather than wall-clock time. The directory is ignored by Git.

The future Knowledge Explorer, if built, must begin read-only and consume this
same graph. It may not become a second parser or source of truth.

## Consequences

- Teammates gain a task-oriented Markdown reading surface in VS Code.
- Existing source-backed claim machinery remains authoritative and intact.
- The public portfolio stays smaller than the Wiki.
- Protected material cannot be made safe by frontmatter or `noindex`.
- Physical renames and broad content migration require a later reviewed ADR.
- Automated success does not confer rights, consent, editorial approval,
  hiring-reader comprehension, or production approval.

## Non-Goals

- public wiki or graph browser;
- CMS, database, or custom editor;
- global Knowledge Bank rename;
- full corpus migration;
- automatic publication;
- public social graph;
- private archive import;
- public site redesign.
