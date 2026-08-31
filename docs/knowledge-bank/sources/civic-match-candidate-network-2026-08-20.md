---
id: source.civic-match.candidate-network
title: Civic Match candidate network and authenticated profile flow
kind: source
status: maintained
visibility: summary-only
sensitivity: moderate
last_reviewed: 2026-08-31
review_by: 2026-09-14
canonical_path: docs/knowledge-bank/sources/civic-match-candidate-network-2026-08-20.md
summary: Public program documentation plus a read-only field map of Jamie's existing five-step candidate profile, preserving account and submission privacy.
source_kind: mixed-public-program-and-authenticated-interface
url: https://www.workforamerica.org/job-seekers
retrieved_at: 2026-08-20
relations:
  - type: related_to
    target: method.civic-match-opportunity-loop
    href: ../methods/civic-match-opportunity-loop.md
  - type: related_to
    target: person.josh-gee
    href: ../people/josh-gee.md
  - type: related_to
    target: person.courtney-kishbaugh
    href: ../people/courtney-kishbaugh.md
  - type: related_to
    target: application.nyc-oti.product-manager.784450
    href: ../applications/nyc-oti-product-manager-784450.md
    context: Civic Match discovery context; the City application system was the formal submission destination.
  - type: related_to
    target: application.nyc-oti.speed-operations-manager.789810
    href: ../applications/nyc-oti-speed-operations-manager-789810.md
    context: Civic Match discovery context; the City application system was the formal submission destination.
---

# Civic Match candidate network and authenticated profile flow

Work for America describes Civic Match as a free talent network connecting
mission-driven candidates with state and local government roles. One profile
can support hiring-manager discovery, staff-assisted matching, employer
invitations, saved roles, application tracking, events, and coaching resources.
Candidates must still apply through each government's official process.

A read-only review of Jamie's existing account mapped five profile steps:
background and eligibility; contact information; professional experience;
desired roles and preferences; and review and submit. The repository keeps the
field schema and a public-safe copy guide, not account state, direct contact
details, private messages, protected-category answers, or submitted data.

The interface is an opportunity source with different signals from an official
bulk jobs dataset. Profile discovery and invitations can create new leads;
saved and applied states can improve workflow continuity; staff and live events
can add human context. None of those signals proves employer submission,
interview, endorsement, or selection.

Two OTI applications discovered through this context now have separate,
date-level City receipt milestones. That observation validates the source-aware
workflow—discover and preserve connection affordances here, apply through the
employer—but it does not establish that an introduction or personal referral
occurred. Connection activity, if any, remains a distinct governed event.
