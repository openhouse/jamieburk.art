# ADR: Knowledge Wiki Name, Authority, And Compiled Model

**Status:** Accepted for the foundation pilot
**Date:** 2026-07-18
**Decision owner:** Jamie Burkart

## Context

The repository already contains a public-safe Knowledge Bank, a canonical
citation registry, structured proof data, append-only lifecycle history, and a
composed portfolio. The new product direction emphasizes navigation,
correction, typed relations, and shared maintenance without weakening the
existing evidence and publication boundaries.

Creating a second claim registry or moving the whole archive would make the
system less trustworthy. The first implementation therefore adds identity and
navigation around the current authorities.

## Decision

The canonical current product name is **Knowledge Wiki**. **Knowledge Bank** is
a historical and compatibility alias.

The Knowledge Wiki is a Markdown-first, Git-reviewed semantic wiki with a
compiled Wiki Graph. It is not publicly editable. The current filesystem root
remains `docs/knowledge-bank/` for this migration cycle.

Stable record IDs survive path and title changes. Ordinary Markdown links serve
human navigation. Typed frontmatter relations carry machine-readable meaning.
The compiler derives graph, backlinks, index, health, and delta artifacts. It
does not write facts back into authored records.

The portfolio remains a smaller, selective, audience-specific projection.

## Authority By Domain

| Domain | Canonical authority now | Derived or projected layer | Migration posture |
|---|---|---|---|
| Wiki context and relations | Governed Markdown under `docs/knowledge-bank/` | Wiki Graph and reports | Pilot only; no mass migration |
| Claims | `apps/www/src/data/knowledge-bank/records.ts` | Wiki claim pages reference canonical IDs | Keep canonical during transition |
| Sources and evidence | `records.ts` source and evidence records | Wiki source receipts provide context and navigation | Do not duplicate URLs or locators |
| Citation notes and page plans | `records.ts`, generated public registry, citation components | Rendered page-local references | Preserve current system |
| Structured professional proofs | `apps/www/src/data/proofs.ts` | Homepage, work, résumé, and role-fit copy | Preserve current system |
| Public project projection | `apps/www/src/data/work.ts` and MDX/TSX pages | Deployed portfolio | Transitional until a reviewed selector exists |
| Corrections | `records.ts` plus append-only lifecycle history | Wiki correction pages explain propagation | Never silently overwrite material history |
| Lifecycle events | `docs/knowledge-bank/lifecycle/history.jsonl` | Redacted lifecycle queries and eval reports | Append only |
| Media rights and consent | Canonical media fields in `records.ts`; human decisions outside automation | Public-safe Wiki asset receipt | No asset publication without clearance |
| Protected evidence | Source Vault / private archive outside this repository | Opaque IDs and public-safe summaries only | Never compile private paths |
| Generated Wiki artifacts | None; always derived | `reports/knowledge-wiki/generated/` | Rebuild and review; do not hand-edit |

## Four Graphs

1. The **document graph** is ordinary Markdown prose and relative links.
2. The **semantic graph** is stable IDs and typed relations.
3. The **evidence graph** remains governed by canonical claims, sources, and
   support relationships.
4. The **publication graph** governs visibility, rights, correction, approval,
   and allowed surfaces.

The compiler tests alignment among these layers. A valid link does not make a
claim true. A supported claim is not automatically selected or publishable.

## Naming And Moves

Paths are addresses, not identity. During a move:

1. preserve the stable ID;
2. update `canonical_path`;
3. update relative links with link-aware tooling;
4. retain meaningful aliases;
5. run `npm run wiki:check` and `npm run wiki:test`;
6. inspect the graph delta and public projections.

The directory may be renamed only after a clean migration cycle proves that
links, IDs, citations, corrections, and projections survive.

## Consequences

- VS Code and GitHub remain sufficient reading interfaces.
- The existing citation architecture is extended, not replaced.
- Generated artifacts can support a future read-only Knowledge Explorer.
- Human comprehension, consent, rights, editorial approval, and production
  observation remain manual authority gates.
- No public Wiki route, CMS, database, or editor is introduced.

## Future Decision

After real daily use and a documented friction log, decide whether to rename the
directory and whether a private, read-only Knowledge Explorer would solve a
demonstrated problem. Markdown and Git remain authoritative either way.
