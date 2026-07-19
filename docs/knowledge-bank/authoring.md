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
6. When a page is created or materially revised through archival research,
   return to original source material where access and rights permit. Add a
   `Present-tense source return` section using the protocol below. If the source
   is unavailable, record the attempted access class and route a librarian
   request rather than substituting a prior summary.
7. Run `npm run wiki:check`, `npm run wiki:test`, `npm run wiki:report`, and the
   query that serves the intended reader.
8. Treat a passing check as structural evidence, not publication permission.

## Write a project or campaign narrative

A canonical narrative should answer five questions without collapsing them:

1. What did Jamie directly do?
2. What artifact, workflow, event, or operating surface became usable?
3. Who else contributed, hosted, participated, or held distinct authorship?
4. Which owner, institution, legislature, agency, or team made the formal
   decision?
5. What later change is documented, and what causal interpretation remains
   unsupported?

Use [Outcomes and Adoption](outcomes-and-adoption.md) for the evidence states
and [People, Collective Credit, and Protected Absences](people-and-collective-credit.md)
for credit and consent requirements. A page should not become clearer by
making its collaborators or places disappear.

## Orient claim maturity

An operational dashboard may point to canonical claim IDs, current holds, and
the smallest advancement test. It may not restate exact claim wording as a
second authority, change a typed status, infer rights, or promote a claim. See
the [Claim Maturity Dashboard](claim-maturity-dashboard.md).

## Present-tense source return

Archival production is recursive. A prior observation can orient a return, but
it cannot replace seeing the source again from the question we have now.

Use these labels in every source-return section:

- **Question brought to the source:** why this return matters now.
- **Original material reopened:** public-safe source IDs and source classes,
  without private locators or unapproved titles.
- **Scope and completeness:** what was actually inspected and what was not.
- **What changed in this reading:** a correction, stronger distinction, new
  relationship, or explicit statement that nothing changed.
- **What did not change:** the claims, anti-claims, or holds that remain.
- **Access boundary:** public, authenticated, protected, not materialized, or
  not recovered; authorization to access is not publication permission.
- **Next return:** the next source, question, collaborator, or librarian request.

Do not paste raw excerpts from protected sources. Exact claims, evidence,
rights, and corrections remain in the typed canonical registry. See
[original-source rereading](methods/original-source-rereading.md).

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
