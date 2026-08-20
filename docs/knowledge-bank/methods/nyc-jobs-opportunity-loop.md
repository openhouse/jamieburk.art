---
id: method.nyc-jobs-opportunity-loop
title: NYC Jobs opportunity action loop
kind: method
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-20
review_by: 2026-09-20
canonical_path: docs/knowledge-bank/methods/nyc-jobs-opportunity-loop.md
summary: A revision-aware, cost-staged loop from NYC Jobs discovery to verified action tasks.
relations:
  - type: uses_source
    target: source.nyc-jobs.open-data.pda4-rgn4
    href: ../sources/nyc-jobs-open-data-pda4-rgn4.md
---

# NYC Jobs opportunity action loop

The loop is intentionally staged:

1. Compare the source revision with the last completed refresh.
2. If it changed, reject internal-only, expired, under-floor, and explicit
   credential-blocked postings before any subjective evaluation.
3. Score the remaining roles for evidence-backed fit and plausible
   securability. Admit only candidates that clear all three governed score
   thresholds.
4. Verify each admitted candidate against its individual official posting
   before creating a canonical opportunity or outward-facing materials.
5. Run named hiring-reader evaluations only after those cheaper checks pass.
6. Produce a concise daily digest of verified active opportunities and
   unresolved admitted candidates, with one explicit next action for each.
   The revision marker carries the candidate queue forward on unchanged-source
   days so unfinished verification work does not disappear.

The scheduled workflow never submits an application. Email delivery requires a
separate runtime send gate and secret-held sender, recipient, and credential.
Jamie controls application submission, public projection, and representation to
an employer.
