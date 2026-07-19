---
id: method.knowledge-wiki.authoring
title: Knowledge Wiki authoring and move workflow
kind: method
status: maintained
visibility: public-safe
sensitivity: low
projection_status: never-public
last_reviewed: "2026-07-18"
review_by: "2027-01-18"
human_review_state: not-requested
aliases:
  - Wiki authoring workflow
canonical_path: docs/knowledge-wiki/authoring.md
summary: Safe procedure for adding, moving, correcting, and projecting records.
authority_refs: []
relations:
  - type: uses_method
    target: method.source-backed-team-memory
    context: New evidence returns through source-backed review before projection.
---

# Authoring And Move Workflow

## Add A Record

1. Begin from the [root index](README.md) and identify the reader task.
2. Confirm that no existing record or typed authority already owns the concept.
3. Add one stable ID, a public-safe summary, ordinary prose links, and only the
   typed relations needed for retrieval.
4. Use `authority_refs` instead of duplicating canonical source or claim data.
5. Keep protected evidence outside Git.
6. Run `npm run wiki:check` and `npm run wiki:test`.

## Move A Record

1. Preserve `id`.
2. Move the file with VS Code link updates enabled.
3. Update `canonical_path`.
4. Update inbound prose links or preserve an explicit compatibility page.
5. Run the Wiki checks and inspect graph delta.

The rename fixture proves that path changes do not change conceptual identity.

## Correct A Consequential Claim

Use the existing canonical correction registry. The Wiki page should link the
claim, correction, evidence, and affected projection without silently
overwriting history. A correction requires a human decision; a passing script
cannot supply one.

## Project Publicly

Evidence maturity, publication safety, reader usefulness, rights, consent, and
current approval are separate questions. Public projection must fail closed.
The existence of a Wiki relation never authorizes publication.

## Daily VS Code Practice

- open Preview to the side;
- follow ordinary relative links;
- search a stable ID;
- use Find All References;
- inspect `.artifacts/knowledge-wiki/backlinks/` after generating a report;
- run a bounded query;
- read the Git diff before committing.
