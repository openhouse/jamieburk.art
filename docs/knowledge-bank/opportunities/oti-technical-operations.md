---
id: opportunity.nyc-oti.technical-operations-manager.782369
title: NYC OTI - Technical Operations Manager 782369
kind: opportunity
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-26
review_by: 2026-07-29
canonical_path: docs/knowledge-bank/opportunities/oti-technical-operations.md
summary: Public-safe, source-backed requirement and portfolio-coverage map for NYC OTI's live Technical Operations Manager role, rechecked July 26, 2026.
canonical_url: https://cityjobs.nyc.gov/job/technical-operations-manager-in-brooklyn-jid-44321
source_type: official-employer
opportunity_status: live
verified_at: 2026-07-26
portfolio_routes:
  - /
  - /work/technical-operations
  - /work/callnyc
  - /work/fair-rent-nyc
  - /work/harry-j-epstein
  - /lab/source-backed-team-memory
  - /resume
  - /contact
discovery_terms:
  - delivery coordination
  - team operating systems
  - onboarding documentation
  - risk surfacing
  - public launch
  - government technology
confirmed_facts:
  - Job ID 782369 is a full-time role in OTI's Commissioner's Office at 15 MetroTech.
  - The posted salary range is $75,000 to $160,000.
  - The official posting lists August 7, 2026 as the deadline.
  - The role owns hiring, planning, delivery tracking, onboarding, reporting, decision systems, and operating documentation.
inferences:
  - The timing and operating language make a connection to OTI's Public Interest Technology Crews plausible, not confirmed.
unknowns:
  - Direct reporting line and exact team assignment.
  - Salary hiring target, work model, union status, and budget or procurement authority.
  - Frequency of nights, evenings, or weekend shifts in practice.
hard_screens:
  - id: screen.oti.minimum-qualification
    text: Civil-service education and experience qualification must be confirmed by OTI.
    state: review-needed
    disposition: verify
  - id: screen.oti.shift-availability
    text: The posting says nights, evenings, or weekends may be required in a 24/7 operation.
    state: unknown
    disposition: verify
role_requirements:
  - id: requirement.oti.delivery-coordination
    importance: critical
    kind: capability
    text: Coordinate concurrent work from concept through public launch.
    wiki_evidence:
      - capability.technical-operations
    public_evidence:
      - route: /work/technical-operations
        needle: Coordinate delivery across concurrent projects
    status: visible-proven
    gap_type: none
    next_action: Lead with one concrete delivery example in the application.
  - id: requirement.oti.risk-and-dependencies
    importance: critical
    kind: capability
    text: Surface risk early and coordinate cross-functional dependencies.
    wiki_evidence:
      - capability.technical-operations
      - project.callnyc
    public_evidence:
      - route: /work/technical-operations
        needle: Track status, surface risks early
      - route: /work/technical-operations
        needle: Coordinate dependencies across product, engineering, security, legal
    status: visible-proven
    gap_type: none
    next_action: Keep the public wording concise; add detail in interview.
  - id: requirement.oti.onboarding-and-runbooks
    importance: critical
    kind: artifact
    text: Create onboarding guides, handbooks, runbooks, and operating documentation people use.
    wiki_evidence:
      - method.source-backed-team-memory
    public_evidence:
      - route: /work/technical-operations
        needle: Onboard collaborators with handbooks, runbooks
    status: visible-proven
    gap_type: none
    next_action: Prepare one inspectable redacted artifact for interview.
  - id: requirement.oti.reporting-and-metrics
    importance: critical
    kind: capability
    text: Report team health, delivery status, and operational metrics honestly.
    wiki_evidence:
      - capability.technical-operations
    public_evidence:
      - route: /work/technical-operations
        needle: Report team health, project status, and operational metrics
    status: visible-qualified
    gap_type: wording
    next_action: Prepare a compact example of a weekly status and risk report.
  - id: requirement.oti.continuous-improvement
    importance: important
    kind: capability
    text: Improve operating systems through retrospectives without overengineering.
    wiki_evidence:
      - capability.technical-operations
    public_evidence:
      - route: /work/technical-operations
        needle: Improve working systems over time without overengineering
    status: visible-proven
    gap_type: none
    next_action: Preserve the current direct phrasing.
  - id: requirement.oti.government-hiring-and-procurement
    importance: important
    kind: capability
    text: Navigate government hiring, civil service, contracting, budget, or procurement contexts.
    wiki_evidence:
      - project.callnyc
    public_evidence:
      - route: /work/callnyc
        needle: New York City Council
    status: visible-weak
    gap_type: public-projection
    next_action: Do not imply procurement authority; clarify adjacent government-process experience in the application.
one_year_success_conditions:
  - The team has a trusted operating cadence and one accurate view of delivery, risk, and dependencies.
  - New hires can contribute quickly because onboarding and runbooks are maintained and used.
  - Leadership receives concise, candid status and teams can change the system after retrospectives.
one_year_risk_conditions:
  - Responsibility exceeds authority across hiring, contracts, and cross-agency dependencies.
  - A 24/7 operating context produces chronic nights or weekends rather than bounded exceptions.
interview_questions:
  - Which team or PIT Crew would this role support, and who is the direct manager?
  - What decisions can the role make directly, and which require escalation?
  - How often have nights or weekends been required in comparable roles?
relations:
  - type: uses_source
    target: source.jobs.oti.technical-operations.782369
    href: ../sources/jobs-oti-technical-operations-782369.md
  - type: related_to
    target: capability.technical-operations
    href: ../capabilities/technical-operations.md
  - type: related_to
    target: project.callnyc
    href: ../projects/callnyc.md
  - type: uses_method
    target: method.source-backed-team-memory
    href: ../methods/source-backed-team-memory.md
  - type: projected_to
    target: portfolio.work.technical-operations
    href: ../projections/work-technical-operations.md
evidence:
  - target: source.jobs.oti.technical-operations.782369
    relationship: direct-support
    confidence: high
    supports:
      - official role facts and requirements as rechecked on July 18, 2026
human_review: governed-open
---

# NYC OTI - Technical Operations Manager 782369

The role asks one person to own a team's operating backbone: how it hires,
plans, tracks delivery, onboards, reports, decides, documents, and improves.
Jamie's public portfolio already shows the central operating pattern. The
application still needs concrete artifacts and honest answers about civil-
service qualification, authority, and the 24/7 shift language.

## Requirement coverage

The frontmatter is the canonical requirement matrix. Generated reports must
preserve visible proof, real gaps, and next actions without turning adjacency
into experience.

## Public projection

Use [/work/technical-operations](../../../apps/www/src/app/work/technical-operations/page.tsx)
as the role-fit surface. Do not turn it into an OTI-branded application page.

## Freshness

Recheck the [official posting](../sources/jobs-oti-technical-operations-782369.md)
every 48 to 72 hours while the role is live.
