---
id: policy.knowledge-wiki-authoring
title: Knowledge Wiki authoring and review
kind: policy
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-18
review_by: 2026-10-18
relations:
  - type: governs
    target: index.knowledge-wiki
  - type: related_to
    target: policy.knowledge-wiki-schema
---

# Knowledge Wiki authoring and review

The wiki remembers expansively, publishes selectively, and protects context.
Structure grows from the material under review.

## Add or revise a page

1. Decide whether the information belongs in Markdown or in an existing typed
   registry. Exact claims, sources, evidence, rights, and corrections go to the
   typed registry.
2. Give an authored page one stable ID and the required frontmatter from the
   [schema contract](schema.md#required-frontmatter).
3. Use relative Markdown links for human navigation and typed ID relations for
   semantic navigation.
4. Link `canonical_refs` only to records that already exist. Do not reproduce a
   protected locator, excerpt, identity, or access path.
5. Record absences honestly. Use `wanted` for a deliberate missing page and the
   canonical claim/task system for negative research and follow-up work.
6. Run `npm run wiki:check`, `npm run wiki:test`, `npm run wiki:report`, and the
   query that serves the intended reader.
7. Treat a passing check as structural evidence, not publication permission.

## Promote to the portfolio

A wiki page is not a public-page approval. Promotion still requires an
approved, selected claim; permitted evidence; collective-credit review; a
purposeful projection; and Jamie's human decision. The application remains the
projection surface. There is no `/proofs`, `/knowledge-bank`, or
`/knowledge-wiki` route.

## Correct the record

Do not silently rewrite history. Update the canonical correction register,
retire superseded public wording, revise the contextual page, and regenerate
the wiki reports. A `not-recovered` result must never be rewritten as proof that
an artifact never existed.

## Human task protocols

Reader studies, collaborator review, rights and consent decisions, and release
approval remain human work. `npm run wiki:tasks` prints protocols and expected
artifacts; it does not fabricate participant results.
