# Page-owner editorial gates

## The magazine model

Every canonical public page has a small modeled editorial masthead. Each owner
has one responsibility and reviews one exact rendered page in an isolated task.
The owner returns constructive criticism, the smallest useful revision, and a
binary `pass` or `fail`. A page passes only when every assigned owner passes;
scores are never averaged.

These are fictionalized analytical lenses informed by public work. The named
people did not participate. A modeled result is not a quotation, endorsement,
prediction, employment decision, or real-world sign-off.

## Control surfaces

- `evals/page-owners/sitewide.json` is the canonical route-to-masthead registry.
- The sitemap and `workItems` data define the public page inventory. A new or
  removed canonical page makes the registry preflight fail until the masthead
  is reconciled.
- Existing page-specific contracts retain the complete task, criterion,
  pass/fail definitions, public sources, and clear-pass, clear-fail, and
  borderline examples for every reusable owner lens.
- A page marked `advisory-pass` must point to an inspectable contract and run in
  which every assigned owner returned critique, a recommendation, and `pass`.
- A page marked `queued` has owners but has not passed its modeled editorial
  gate.

## Review packet boundary

Each modeled owner may receive only:

1. the exact rendered public page at desktop and mobile widths;
2. public pages reached through that page's links;
3. the page's reader job; and
4. the owner's declared public sources and one-dimensional criterion.

Repository source, private archives, private communications, patch intent, and
another owner's output stay out of the task. Owners run sequentially, one task
at a time, so one result cannot anchor the next.

## Acceptance and hill climbing

Run the deterministic registry and the three existing page pilots:

```sh
npm run evals:page-owners
npm run test:page-owners
```

Run the strict editorial acceptance gate:

```sh
npm run evals:page-owners:strict
```

Strict mode is expected to fail while any canonical page remains queued or an
exact-candidate modeled receipt is stale. For a failed owner, make one small
revision aimed at that owner's highest-priority critique, rerender both
viewports, and rerun every owner assigned to the changed page. Retain the change
only if it improves acceptance without weakening truth, consent, collective
credit, accessibility, or reader comprehension.

## Human authority

Modeled acceptance never authorizes deployment, production publication, or
indexing. Jamie remains the publication owner. Rights, consent, attribution,
collective credit, and public use remain separate human gates even when every
modeled owner passes.
