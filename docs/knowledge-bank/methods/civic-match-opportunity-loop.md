---
id: method.civic-match-opportunity-loop
title: Civic Match opportunity loop
kind: method
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-30
review_by: 2026-09-06
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
6. Connect a submitted application to the employer's governed, read-only
   [private status loop](private-application-status-loop.md) when an authorized
   tracking surface exists.
7. Feed real outcomes, communications, and interview learning back into future
   materials without publishing private records.

Deterministic checks validate source identity, field coverage, word limits,
resume lineage, privacy, and human gates before any model-reader evaluation.
Only readers tied to the lifecycle-selected opportunity set are eligible for
model calls. Jamie alone controls protected answers, visibility, consent, and
final submission.

The named program-leadership lenses for this source are [Josh
Gee](../people/josh-gee.md) and [Courtney
Kishbaugh](../people/courtney-kishbaugh.md). Their records support explicitly
fictionalized, public-source evaluation only—not participation, quotation,
endorsement, recommendation, or a hiring decision.

## Source-aware guides and deduplication

Keep one opportunity per employer Job ID. Attach each discovery source's dated
observation and useful route to that record; never merge by title alone.
Civic Match can add a connection or invitation route while the official
employer remains the application authority. Membership is not a guaranteed
introduction, preference, interview, or offer.

The [August 30 review](../../../opportunity-sources/civic-match/2026-08-30/Opportunity-Discovery-Review.md)
records two provisional OTI card matches, an unresolved closing-date
discrepancy, and role-specific guides alongside existing tailored résumés.
Its authenticated-board coverage is explicitly partial. Private account state,
correspondence, and screenshots are not retained.

Before further model review, use the deterministic source evaluator to check
identity, duplicate records, coverage, deadlines, salary, location, and
qualification state. Unknowns do not pass. A source integrity pass is not a
completed inventory or a hiring pass. Unchanged historical editorial scores
must not be reported as newly measured chances of hire.

Refresh through authorized rendered source access when preparing applications
or when new alerts, invitations, or changed postings arrive. Record coverage
and uncertainty rather than claiming an unattended authenticated sync exists.
After the external employer confirms submission, Jamie may update Civic Match
and the canonical opportunity state; discovery events alone never do that.

Employer tracking is a separate situated source. Its authenticated dashboard
can add a literal application label and useful account affordances, while the
mailbox action URL, passcode, applicant data, and correspondence remain outside
Git. When separately authorized, a status heartbeat can reacquire that surface
at runtime and write only a verified provider-label change; silence and failed
access are not lifecycle events. Recurring private access and any public pull-
request update remain an explicit human activation gate.
