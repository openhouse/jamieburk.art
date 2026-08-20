---
id: method.civic-match-opportunity-loop
title: Civic Match opportunity loop
kind: method
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-20
review_by: 2026-09-20
canonical_path: docs/knowledge-bank/methods/civic-match-opportunity-loop.md
summary: Models Civic Match as an authenticated talent-network source with candidate discovery, invitations, tracking, events, and staff-assisted matching.
relations:
  - type: uses_source
    target: source.civic-match.candidate-network
    href: ../sources/civic-match-candidate-network-2026-08-20.md
  - type: related_to
    target: source.nyc-open-data.jobs.pda4-rgn4
    href: ../sources/nyc-open-data-jobs-pda4-rgn4.md
---

# Civic Match opportunity loop

Civic Match and NYC Jobs Open Data are complementary opportunity sources.
The NYC dataset is a public, machine-readable freshness and discovery surface.
Civic Match is an authenticated talent network whose profile, invitations,
saved roles, staff support, and live events can create additional paths into
state and local government hiring.

## Operating sequence

1. Keep one accurate, lifecycle-selected candidate profile and resume.
2. Review invitations and newly surfaced roles against hard screens first.
3. Save only work Jamie would seriously consider.
4. Apply through the employer's official application system.
5. Record the external submission in Civic Match and in the governed
   opportunity system.
6. Feed real outcomes, communications, and interview learning back into future
   materials without publishing private records.

Deterministic checks validate source identity, field coverage, word limits,
resume lineage, privacy, and human gates before any model-reader evaluation.
Only readers tied to the lifecycle-selected opportunity set are eligible for
model calls. Jamie alone controls protected answers, visibility, consent, and
final submission.
