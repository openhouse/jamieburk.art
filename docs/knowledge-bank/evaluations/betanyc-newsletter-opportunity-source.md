---
id: evaluation.jobs.betanyc-newsletter.2026-08-21
title: BetaNYC newsletter opportunity-source evaluation
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-21
review_by: 2026-08-30
canonical_path: docs/knowledge-bank/evaluations/betanyc-newsletter-opportunity-source.md
target: source.jobs.betanyc-newsletter.current
summary: Deterministic-first evaluation of newsletter freshness, privacy-safe normalization, official-destination verification, deduplication, scoring, and governed admission.
human_review: governed-open
relations:
  - type: uses_source
    target: source.jobs.betanyc-newsletter.current
    href: ../sources/betanyc-newsletter.md
  - type: related_to
    target: evaluation.jobs.nyc-open-data.strong-match
    href: ./nyc-jobs-opportunity-feed.md
  - type: related_to
    target: opportunity.polimorphic.product-manager.123173
    href: ../opportunities/polimorphic-product-manager-123173.md
  - type: related_to
    target: opportunity.nyc-jobs.792925
    href: ../opportunities/nyc-jobs-792925.md
  - type: related_to
    target: opportunity.nyc-jobs.792692
    href: ../opportunities/nyc-jobs-792692.md
---

# BetaNYC newsletter opportunity-source evaluation

The August 20, 2026 edition contained twenty job or opportunity leads. After
deadline, compensation, qualification, specialist, score, and duplication
checks, three cleared the strong-match threshold:

- Associate Director of Policy Implementation at the NYC Campaign Finance Board;
- Policy Analyst for Budget, Finance, and Labor in the Mayor's Office;
- Product Manager, the first product hire at Polimorphic.

The first two already existed as NYC Jobs Open Data admissions. This evaluation
adds BetaNYC discovery provenance without creating duplicate opportunity nodes.
Polimorphic is the one new governed opportunity from this edition.

## Gate order

1. Verify the newest edition and reconcile the mailbox and public-archive clocks.
2. remove recipient data, tracking, unsubscribe controls, and raw message content;
3. resolve clean employer destinations and verify live postings;
4. exclude expired, under-target, ineligible, or specialist-mismatch leads;
5. apply fit, securability, and combined-score thresholds;
6. enrich existing nodes and create governed intake only for new survivors;
7. queue isolated public-context reader review only for newly admitted roles;
8. leave the application decision with Jamie.

## Current evaluation state

The deterministic gates pass. Two fictionalized Polimorphic public-context
reader tasks are queued but not represented as having run. They use only public
posting and portfolio context and cannot stand in for the real people's views or
an actual hiring decision.
