---
id: evaluation.jobs.civic-match.profile-and-reader-gates
title: Civic Match profile and audience-correct modeled-reader gates
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-21
review_by: 2026-08-28
canonical_path: docs/knowledge-bank/evaluations/civic-match-opportunity-source.md
summary: Deterministic form, privacy, opportunity-selection, and audience gates that precede synthetic Civic Match and hiring-reader review.
relations:
  - type: uses_source
    target: source.jobs.civic-match.current
    href: ../sources/civic-match.md
  - type: uses_source
    target: source.google-doc.jamie-writers-voice
    href: ../sources/google-doc-jamie-writers-voice.md
  - type: related_to
    target: evaluation.jobs.nyc-open-data.strong-match
    href: nyc-jobs-opportunity-feed.md
human_review: governed-open
---

# Civic Match profile and audience-correct modeled-reader gates

The evaluation first checks the observed five-step form topology, essay word
limits, public/private visibility classes, protected-data exclusions, current
opportunity selection, exact resume binding, and named-reader relationships.
Only a passing deterministic result may release modeled-reader work.

The two audiences receive different packets:

- modeled Civic Match helpers receive the Work for America-only essays,
  employer-visible profile, and selected resume, then assess whether they would
  confidently surface Jamie to a government hiring partner;
- modeled opportunity hiring readers receive only the employer-visible profile,
  selected resume, and public portfolio, then assess whether they want to
  interview Jamie and see a credible path to hiring.

This separation follows the product's actual visibility rules. It prevents a
private intake answer from becoming fictional evidence available to a hiring
reader. Every named-person lens is synthetic public-context analysis, not that
person's participation, opinion, invitation, endorsement, or hiring decision.

The current modeled-reader run remains queued, not passed, until the isolated
tasks are actually executed. Jamie alone reviews protected answers, chooses
profile visibility, accepts terms, submits the profile, and applies to a role.
