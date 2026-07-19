# ADR: Knowledge Wiki name and operating model

- **Status:** Accepted for the foundation pilot
- **Date:** 2026-07-18
- **Decision owner:** Jamie Burkart
- **Scope:** Internal portfolio knowledge system in this public repository

## Context

The repository already contains a mature public-safe evidence system under
`apps/www/src/data/knowledge-bank/`, a broader proof layer in
`apps/www/src/data/proofs.ts`, authored research and governance notes under
`docs/knowledge-bank/`, and selective public projections in `apps/www`.

The name **Knowledge Bank** accurately described custody and accumulated
evidence, but it no longer described the complete working experience. The
system is also navigable, relational, revisable, correctable, and maintained by
people following links among projects, sources, claims, corrections, methods,
and opportunities.

## Decision

The canonical current product name is **Knowledge Wiki**.

The Knowledge Wiki is a Markdown-first editorial and research system with a
compiled semantic graph and governed public projections. It is not a publicly
editable wiki.

We will use this operating model:

1. Authored Markdown is canonical for page identity, orientation, narrative,
   and purposeful human navigation.
2. Existing validated TypeScript records remain canonical for claims, sources,
   evidence relationships, citation occurrences, research inquiries,
   corrections, rights states, and publication boundaries.
3. `apps/www/src/data/proofs.ts` remains the canonical broader professional
   proof layer during this transition.
4. `apps/www/src/data/work.ts`, MDX, and application pages remain selective
   public projections. They are not generated automatically from every Wiki
   record.
5. The Wiki Graph is derived from governed Markdown pages and canonical
   references. Generated graph, backlink, index, and health artifacts are not
   edited as source.
6. Protected raw material remains outside this public repository. A visibility
   label is never treated as a privacy control.

## Current path

The current canonical human-facing root remains `docs/knowledge-bank/` for the
foundation pilot. Its title and current-facing documentation use **Knowledge
Wiki**, with **Knowledge Bank** retained as a historical and compatibility
alias.

We are deliberately not performing a global directory, package, command, or ID
rename. Stable page IDs are independent of paths, so a later link-aware path
migration can preserve conceptual identity.

## Authority registry

| Domain | Canonical authority | Wiki role |
|---|---|---|
| Page identity, orientation, narrative, authored links | Governed Markdown frontmatter and body | Canonical |
| Claims, sources, evidence, anti-claims | `apps/www/src/data/knowledge-bank/records.ts` and imported batch records | Explain and reference by stable ID |
| Citation occurrences and source order | Existing citation registry and page plans | Explain and link |
| Broader professional proof | `apps/www/src/data/proofs.ts` | Reference by proof ID |
| Rights, consent, visibility, publication state | Existing structured records; governed Markdown only where the page itself owns the state | Explain public-safe state |
| Corrections and supersession | Existing correction records | Make history navigable |
| Public portfolio copy | `apps/www/src/data/work.ts`, MDX, and page code governed by canonical claims | Selective projection |
| Generated graph, indexes, backlinks, and health reports | `npm run wiki:*` output | Derived; never hand-edit |
| Raw or sensitive source material | Source vault outside this repository | Public-safe summary only |

## Compatibility

- Existing stable claim, source, proof, and correction IDs do not change.
- Existing `knowledge-bank` and `knowledge:*` commands remain available during
  the transition.
- New graph and navigation commands use the `wiki:*` namespace.
- Historical documents are not rewritten merely to modernize terminology.

## Consequences

The portfolio can stay concise while the supporting system grows more
traversable. A teammate can navigate the pilot in VS Code, verify its semantic
relations, inspect correction history, and query the graph without needing a
custom application.

This decision also creates limits. The first release does not include a public
Wiki route, CMS, database, graph browser, editing UI, automatic publication, or
broad historical migration. A future Knowledge Wiki Explorer, if justified by
observed use, must be read-only first and consume the same generated graph.
