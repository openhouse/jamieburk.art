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
summary: Bounded authenticated-browser observation of three OTI application labels and shared applicant-dashboard affordances, excluding private URLs, passcodes, correspondence, and applicant data.
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
    target: application.nyc-oti.senior-product-manager.782366
    href: ../applications/nyc-oti-senior-product-manager-782366.md
  - type: related_to
    target: source.application.nyc-oti.pit-crew-volume-update.2026-08-20
    href: nyc-oti-pit-crew-volume-update-2026-08-20.md
  - type: related_to
    target: method.private-application-status-loop
    href: ../methods/private-application-status-loop.md
human_review: completed
---

# NYC OTI private application status dashboard review - August 31, 2026

Jamie authorized authenticated-browser inspection of three City application
confirmations and their status actions. The in-app Browser accessed the
authorized mailbox. Each confirmation resolved to a City of New York
applicant-tracking surface on the SmartRecruiters
provider host and required a one-time passcode delivered to the application
mailbox. Passcodes, message identifiers, redirects, private action URLs,
applicant data, and precise message times were not retained.

After authentication, all three access routes converged on the same shared
applicant dashboard. The dashboard listed the Product Manager application,
reference 784450, and Operations Manager application, reference 789810, with the
literal provider status `New` on August 31, 2026. Their bounded graph
normalization is `received-awaiting-review`. The Senior Product Manager
application, reference 782366, carried the distinct literal provider status `In
Review`; its bounded normalization is `in-review`. That label does not establish
an interview, shortlist, eligibility determination, decision, or outcome.

The shared dashboard also exposed safe categories of affordance: a list of
applications, job details, preliminary questions, résumé and attachment areas,
personal-information review, and data-management controls. Those capabilities
were observed, not used. The monitor does not edit materials, change applicant
data, withdraw applications, or communicate with the employer.

This status observation, the earlier confirmation summary, and the bounded PIT
Crew volume update are related views of the same employer-controlled application
system, not independent evidence.
Future refreshes reacquire the surface through the authorized mailbox and
browser at runtime. An unavailable page, failed authentication, unchanged label,
or absence of new mail leaves the last verified graph state unchanged.
