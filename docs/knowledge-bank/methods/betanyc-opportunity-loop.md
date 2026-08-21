---
id: method.betanyc-opportunity-loop
title: BetaNYC opportunity-source loop
kind: method
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-20
review_by: 2026-09-20
canonical_path: docs/knowledge-bank/methods/betanyc-opportunity-loop.md
summary: A weekly-issue-aware, authority-preserving loop from curated civic-tech discovery to verified application work.
relations:
  - type: uses_source
    target: source.betanyc.weekly-civictech-newsletter
    href: ../sources/betanyc-civictech-newsletter.md
  - type: related_to
    target: method.nyc-jobs-opportunity-loop
    href: ./nyc-jobs-opportunity-loop.md
---

# BetaNYC opportunity-source loop

The loop models the newsletter's editorial affordances without confusing them
with employer authority:

1. Check the official public archive daily for the newest distinct weekly
   issue. Compare its issue date and canonical URL with the last completed
   source state.
2. Treat duplicate deliveries and resends as one issue. Parse only Jobs &
   Opportunities, remove tracking parameters, and retain the civic-tech source
   context without retaining subscriber data.
3. Resolve every lead to the individual employer's current posting. For NYC
   roles, reconcile the newsletter lead with the current NYC Jobs Open Data row
   and then the individual official posting. An unresolved external lead stops
   before scoring or subjective review.
4. Apply deterministic availability, compensation, applicant-access, hard-
   screen, fit, and securability checks. A role must clear every configured
   threshold to enter the private candidate queue.
5. Verify each queued role against the individual posting and create a
   canonical opportunity only when its facts and remaining uncertainties are
   recorded.
6. Commission named hiring-reader evaluation only after those cheaper checks
   pass. A simulated reader result is an editorial test, never evidence that the
   real person participated or agrees.
7. Carry verified active opportunities and unresolved application actions into
   the daily digest. Jamie controls every application, public projection, and
   representation to an employer.

The scheduled workflow runs deterministic source tests before checking the
archive. A cache keyed to the issue edition prevents repeat scoring and repeat
email. Email delivery itself requires separately configured runtime secrets and
an explicit send gate.
