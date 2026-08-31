---
id: source.application.nyc-oti.status-dashboard.2026-08-31
title: NYC OTI private application status dashboard review - August 31, 2026
kind: source
status: maintained
visibility: summary-only
sensitivity: high
last_reviewed: 2026-08-31
review_by: 2026-09-14
canonical_path: docs/knowledge-bank/sources/nyc-oti-application-status-dashboard-2026-08-31.md
summary: Bounded authenticated-browser observation of two OTI application labels and shared applicant-dashboard affordances, excluding private URLs, passcodes, correspondence, and applicant data.
source_kind: private-authenticated-application-status-summary
custody: external-to-repository
public_use: provider-role-reference-status-and-safe-affordance-summary-only
relations:
  - type: related_to
    target: application.nyc-oti.product-manager.784450
    href: ../applications/nyc-oti-product-manager-784450.md
  - type: related_to
    target: application.nyc-oti.speed-operations-manager.789810
    href: ../applications/nyc-oti-speed-operations-manager-789810.md
  - type: related_to
    target: method.private-application-status-loop
    href: ../methods/private-application-status-loop.md
human_review: completed
---

# NYC OTI private application status dashboard review - August 31, 2026

Jamie authorized Browser and Chrome inspection of the two City application
confirmations and their status actions. The in-app Browser could access the
authorized mailbox; Chrome was not connected in this run. Each confirmation
resolved to a City of New York applicant-tracking surface on the SmartRecruiters
provider host and required a one-time passcode delivered to the application
mailbox. Passcodes, message identifiers, redirects, private action URLs,
applicant data, and precise message times were not retained.

After authentication, both access routes converged on the same shared applicant
dashboard. The dashboard listed the Product Manager application, reference
784450, and Operations Manager application, reference 789810, with the literal
provider status `New` on August 31, 2026. The bounded graph normalization is
`received-awaiting-review`. The surface does not establish that substantive
review has begun, despite the confirmation messages explaining that hiring-team
review is the next possible step.

The shared dashboard also exposed safe categories of affordance: a list of
applications, job details, preliminary questions, résumé and attachment areas,
personal-information review, and data-management controls. Those capabilities
were observed, not used. The monitor does not edit materials, change applicant
data, withdraw applications, or communicate with the employer.

This status observation and the earlier confirmation summary are related views
of the same employer-controlled application system, not independent evidence.
Future refreshes reacquire the surface through the authorized mailbox and
browser at runtime. An unavailable page, failed authentication, unchanged label,
or absence of new mail leaves the last verified graph state unchanged.
