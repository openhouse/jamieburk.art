# ADR: Knowledge Wiki name and authority model

- **Status:** accepted for bounded implementation
- **Date:** 2026-07-18
- **Decision owner:** Jamie Burkart
- **Primary brief:** M, with N and D used only for compatible detail

## Context

The repository already contains a mature public-safe Knowledge Bank, typed
records, citation tooling, projection controls, and portfolio surfaces. The new
product needs stronger human navigation and semantic relationships without
creating another source of truth or a public wiki application.

## Decision

The canonical product name is **Knowledge Wiki**: a Markdown-first semantic
wiki with a compiled knowledge graph and governed public projections.

The current `docs/knowledge-bank/` path remains the authored compatibility root
for the first release. Markdown owns page identity, context, relationships, and
navigation. Existing typed registries continue to own exact claims, sources,
evidence, rights, corrections, and citation plans. Generated reports are
derived and disposable. The application remains a selective projection.

## Consequences

- There is no second Markdown truth tree and no global path rename.
- The compiler adapts canonical typed records by ID without copying protected
  payloads.
- Existing pages can migrate incrementally through bounded frontmatter.
- No `/knowledge-wiki`, `/knowledge-bank`, or `/proofs` public route is added.
- Human approval, collaborator review, media rights, and release authority
  remain outside automated scoring.
- A future storage or UI migration must preserve stable IDs and the authority
  table in `docs/knowledge-bank/schema.md`.
