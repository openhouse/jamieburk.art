---
id: evaluation.photography-residency-proposal.2026-07-22
title: Photography residency proposal evaluation
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-22
review_by: 2026-10-22
canonical_path: docs/knowledge-bank/evaluations/photography-residency-proposal.md
summary: Executable contract ensuring that the first-pass residency proposal creates protected time and permission to discover rather than a productivity contract, aesthetic rubric, or publication shortcut.
projection_status: hold
projection:
  status: hold
  surfaces: []
relations:
  - type: related_to
    target: research.photography-first-pass-residency-proposal.2026-07-22
    href: ../research-runs/photography-first-pass-residency-proposal-2026-07-22.md
  - type: related_to
    target: index.knowledge-wiki.photography-notebook
    href: ../indexes/photography-working-notebook.md
  - type: related_to
    target: project.sunday-dinner-196
    href: ../projects/sunday-dinner-196-orientation.md
---

# Photography residency proposal evaluation

This evaluation protects the residency as a place where intent can be serious
without becoming deterministic. It cannot grade photographs, measure artistic
productivity, require fidelity to the proposal, or decide whether the residency
was meaningful.

## Blocking contracts

- The proposal, its bounded inspiration sources, and this evaluation are
  governed records reachable from the photography notebook and 196 project.
- The proposal explicitly says it is not a contract and that residents are not
  judged by whether they do what they proposed.
- Approximately 1,000 photographs remains a starting gesture, not a quota,
  representative sample, completion promise, or publication slate.
- The work may change medium, scale, pace, method, question, or form.
- Deviation, incompletion, rest, refusal, and surprise remain legitimate.
- The stay is bounded as up to two weeks in a Brooklyn home practice near Fort
  Greene Park; no private address or access detail may enter the record.
- Hospitality cannot become a claim that every resident had the same
  experience or that hosting caused another person's outcomes.
- The Teju Cole source supports a change of artistic direction; it cannot become
  a claim that Cole authored, modeled, or endorsed the 196 practice.
- Proposal acceptance authorizes protected experimentation only. It cannot
  approve an image, interpretation, claim, caption, or public surface.
- Photography safety, authorship, rights, consent, collective-credit, and
  specific-use human approval remain intact.
- The evaluator protects conditions of play and may not encode aesthetic taste,
  required motifs, minimum outputs, or a preferred final medium.

## Mutation coverage

The test suite converts invitation into contract, turns the rough field into a
quota, requires final outputs, forbids deviation, removes rest and refusal,
injects a private address, claims uniform resident transformation, converts the
Cole reference into endorsement, treats acceptance as publication clearance,
substitutes AI authority, and makes the evaluator grade aesthetic success. Each
mutation must fail the boundary it attacks.

## Commands

```sh
node scripts/knowledge-wiki/photography-residency-proposal-eval.mjs
node --test scripts/knowledge-wiki/photography-residency-proposal-eval.test.mjs
```

The evaluator is integrated into `npm run wiki:eval`, and its mutation tests run
through `npm run wiki:test`.

A green result means the conditions for play remain available. It does not mean
the residency has occurred, that the rough field exists, that a photograph is
good, or that any result should be published.
