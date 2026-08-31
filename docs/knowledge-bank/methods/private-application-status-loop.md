---
id: method.private-application-status-loop
title: Private application status loop
kind: method
status: maintained
visibility: summary-only
sensitivity: moderate
last_reviewed: 2026-08-31
review_by: 2026-09-14
canonical_path: docs/knowledge-bank/methods/private-application-status-loop.md
summary: Reacquires private employer status surfaces at runtime, records bounded provider labels and normalized states, and keeps credentials and capability-bearing locators outside Git.
relations:
  - type: uses_source
    target: source.application.nyc-oti.status-dashboard.2026-08-31
    href: ../sources/nyc-oti-application-status-dashboard-2026-08-31.md
  - type: related_to
    target: method.civic-match-opportunity-loop
    href: civic-match-opportunity-loop.md
---

# Private application status loop

This method connects a governed application record to an employer's private
tracking surface without turning a capability-bearing URL, mailbox message,
passcode, or applicant profile into repository data. The graph stores the
provider, role, employer reference, literal provider label, bounded normalized
state, observation date, reacquisition method, and refresh result. The private
locator and credentials remain in the authorized browser and mailbox session.

## Read-only refresh sequence

1. Start from the maintained application node and employer reference.
2. In Jamie's authorized mailbox, locate the matching provider confirmation by
   provider, role, and reference. Do not copy its private action URL into Git,
   logs, pull-request text, or automation prompts.
3. Follow the employer-provided access action in an authenticated browser. If a
   one-time passcode is required, use it only in the browser session; never
   retain it.
4. Verify that the applicant dashboard maps the expected role and reference,
   then read the provider's literal status label and relevant safe affordances.
5. Compare the label with the last verified observation. Write a bounded graph
   update only when the provider label changes, preserving the previous
   observation and the normalization rule.
6. Run the deterministic status eval, graph health checks, and public-safety
   checks before committing a changed observation.

No new email or page change is not a status update. If mailbox access,
authentication, role matching, or the dashboard fails, leave the last verified
status unchanged and record the refresh as unavailable outside the public
graph. Do not infer review, rejection, withdrawal, interview, offer, or hiring
from silence, elapsed time, a job-posting change, or an inaccessible page.

## Affordance and authority boundary

The authenticated dashboard may expose job details, application materials,
preliminary questions, personal information, data-management controls, or a
withdrawal path alongside status. A refresh may observe and describe those
capabilities but remains read-only. Editing an application, changing personal
data, replacing an attachment, withdrawing, or sending a communication requires
separate Jamie authorization and must never be triggered by the monitor.

The provider's label remains literal. For two August 31 observations, `New`
normalizes only to `received-awaiting-review`: the City has those applications,
but the surface does not establish that substantive review has started. The
older Senior Product Manager application carries the distinct provider label
`In Review`, which normalizes to `in-review` without implying an interview,
shortlist, eligibility decision, or outcome. All three email access routes
converge on one shared authenticated applicant dashboard; they are not
independent evidence systems.

A general hiring-program message can provide process context without changing a
job-specific lifecycle state. Volume, delay, or generic review language remains
separate from the provider label attached to one employer reference.

The refresh contract is ready, but recurring activation remains a separate
human gate. A weekday heartbeat would repeatedly enter an authenticated mailbox
and private hiring dashboard and could export a changed status to a public pull
request. It must not become active until Jamie explicitly authorizes that exact
recurring private access and bounded public destination after reviewing the
risk.
