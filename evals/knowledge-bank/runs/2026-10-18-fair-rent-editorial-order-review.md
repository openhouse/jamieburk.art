# FairRentNYC editorial-order binding review — October 18, 2026

## Scope and authority

This supplementary machine review covers an editorial reorder against public
baseline `93bac7fd5e7dfecdf04ed8881417c97c25078086`. The existing **What I did**
section moves before **Documented organizing and testimony**. Its citation plan
now follows the authored claim order, so reference numbers follow first use.

The parent model independently inspected the implementation diff and existing
approval register after the editing agent completed the change. It confirmed
unchanged claims, collective credit, and outcome limits, and authorized only
the affected machine-binding updates. This is an independent model check of
the bounded edit, not a blind reader study, new human review, testimonial,
source verification, publication permission, or release approval.

The [earlier archive-boundary review](../../../docs/qa/evals-H/archive-production-boundary-2026-10-18.json)
remains historical evidence for its own edition. This note does not rewrite it.
Original source dates and historical review dates remain unchanged. No new
event, correspondent, outcome, or private-source detail enters the public case.

## Comparison evidence

- All five MDX sections are byte-identical individually; only their order changed.
- All 14 FairRentNYC claim occurrences retain their full original contents.
- All 25 cited source IDs remain present; only their first-use order changed.
- All 43 serialized public claims and 66 serialized public sources are unchanged.
- Every other citation page plan is unchanged.
- The canonical registry outside the FairRentNYC page-plan block is unchanged.
- The new regression test checks authored claim-to-plan identity, projection
  scope, source closure, and first-use order rather than requiring fixed prose.
  It failed with the old plan and passed after plan alignment and regeneration.

## Exact bindings

| Binding | Previous SHA-256 | Reviewed SHA-256 |
| --- | --- | --- |
| Archive-production content | `d18ee7b9ec62b3bc32e1d60e495ff0e18490fd528c15a36bf0d003a30858d041` | `4c3ca56df781a8ac4e3da781ac29a5f690d2e8f473f3ffc88a3413ae69d12505` |
| NYCAC Facebook-event governance bindings | `ab1e3d00c61159adc19e54a5241dea2b932c23f341f4ad8a70950d3ffcfb7114` | `d5a368dad97d4da9d963d7a31f7f174e0eba9a6afc48205ee961c0dae8decd96` |
| Case-study MDX, shared by Facebook-event and Facebook-post locks | `4c0e0e8b20c891e34f5bd87908d79681fd82415762f8b46be302d02ba5dfd727` | `9695bf996f231cc45c7cb7ae0cb5e56f9724456fa7bf34009f298bdf5f6663e9` |

Only these four digest fields were rebound. Corpus, source, population,
authorship, and privacy locks were not changed. Professor-lens and composite
candidate receipts were not rebound; those gates require their own fresh
candidate-specific review. The full release process remains separate.

## Focused verification after rebinding

- `npm run check:citations`: passed; generated registry is current and redacted.
- `npm run test:citations`: 12 passed, 0 failed.
- `npm run check:knowledge-evals`: passed, 5/5 across 32 criteria. Its existing
  knowledge holdout ledger remains inherited, not a newly performed reader review.
- `npm run test:knowledge-evals`: 245 passed, 0 failed.
- `npm run public-safety`: passed with 11 existing careful-claim warnings retained.
- `git diff --check`: passed.

These checks do not establish rendered-reader improvement, current source
freshness, hosted CI success, production approval, or deployment.
