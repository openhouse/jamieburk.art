---
id: evaluation.missing-pages-and-source-return
title: Missing Pages and Source Return Evaluation
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: low
projection_status: never-public
last_reviewed: "2026-07-19"
review_by: "2026-10-19"
human_review_state: not-requested
aliases:
  - Source-return practice evaluation
canonical_path: docs/knowledge-wiki/evaluations/missing-pages-and-source-return.md
summary: Deterministic and human evaluation contract for building wanted pages from fresh source review without overstating coverage or publication permission.
authority_refs: []
relations:
  - type: uses_method
    target: method.source-backed-team-memory
    context: The evaluation preserves the separation among source access, claim support, publication permission, and human judgment.
  - type: related_to
    target: research-run.missing-pages-return-to-source.2026
    context: The research run is the evidence receipt for the first missing-pages pass.
  - type: related_to
    target: index.evidence-debt-promotion-queue
    context: Unmet source and human questions return to a visible queue instead of being hidden.
---

# Missing Pages And Source Return Evaluation

## Purpose

This evaluation formalizes two questions as recurring practice:

1. What missing pages would most strengthen the Wiki now?
2. Do we know how to reopen the original source material and read it with the
   concerns of the present?

## Deterministic Criteria

The machine evaluation must fail when:

- one of the ten approved missing pages is absent or unindexed;
- a page or the source-return receipt lacks a valid canonical source, claim, or
  inquiry authority;
- a page lacks Orientation, Present Reading, Source Return, Known / Open /
  Protected, or Next Research;
- a page does not say both what its sources establish and do not establish;
- the source-return run lacks a coverage declaration, multiple source classes,
  a present-tense reading, explicit non-support, or librarian questions;
- private filesystem locators or other protected markers enter the public repo;
- the human librarian gate is presented as complete; or
- mutation tests cannot demonstrate that those failures are detected.

The score measures structural compliance only. It does not grade the truth,
quality, rights status, consent status, or public usefulness of the prose.

## Human Evaluation

Jamie or a trusted reviewer should answer:

- Are these actually the missing pages we most need now?
- Did the source return change, complicate, or sharpen the account?
- Are collaborators and participants credited fairly?
- Does anything feel private, overstated, flattened, or absent?
- What should the librarian help uncover next?

These questions remain **not requested** until Jamie asks a human reviewer to
perform them. A passing machine score must not change that state.

## Hill-Climb Rule

Run the deterministic evaluation and mutation suite, repair failures on the
same candidate, then run the complete repository check. Any content change
invalidates the prior result and requires a fresh run. Human judgment, rights,
consent, production approval, and indexing remain separate gates.

## Evidence

See the [source-return run](../research-runs/missing-pages-return-to-source-2026.md),
the [evidence debt queue](../indexes/evidence-debt-and-promotion-queue.md), and
the [retrieval tasks](retrieval-tasks.md).
