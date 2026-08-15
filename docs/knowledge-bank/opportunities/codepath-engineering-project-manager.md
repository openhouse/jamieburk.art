---
id: opportunity.codepath.engineering-project-manager.5160542007
title: CodePath - Engineering Project Manager
kind: opportunity
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-15
review_by: 2026-08-18
canonical_path: docs/knowledge-bank/opportunities/codepath-engineering-project-manager.md
summary: Public-safe requirement, reporting-context, and portfolio-coverage map for CodePath's live Engineering Project Manager role.
canonical_url: https://job-boards.greenhouse.io/codepath/jobs/5160542007
source_type: official-employer
opportunity_status: live
verified_at: 2026-08-15
reporting_context:
  direct_manager_title: Vice President of Engineering
  direct_manager_person: Zack Parker
  direct_manager_public_status: title-matched-on-official-team-page
  senior_vision_owner: Chris Coleman
  senior_vision_owner_title: Chief Product Officer
  senior_vision_basis: CodePath's official team page and CPO announcement identify Coleman as the leader of product engineering delivery and AI-enabled learning-product scale.
  verified_at: 2026-08-15
portfolio_routes:
  - /
  - /work/technical-operations
  - /work/harry-j-epstein
  - /work/wowlist
  - /lab/source-backed-team-memory
  - /resume
  - /about
discovery_terms:
  - engineering delivery coordination
  - hands-on quality assurance
  - bug pipeline ownership
  - test automation
  - lightweight team process
  - internal user alignment
confirmed_facts:
  - The role is full-time, remote, and pays US applicants $140,000 to $178,000.
  - The posting says the role reports to the Vice President of Engineering but does not name a person.
  - CodePath's official team page identifies Zack Parker as Vice President of Engineering and Chris Coleman as Chief Product Officer.
  - The posting requires the ability to reproduce bugs, read stack traces, and write test cases; Rails or Django and Capybara or RSpec are preferred.
inferences:
  - Zack Parker is the likely direct manager because he is the current official title-holder; the posting does not name him.
  - Chris Coleman is the nearest publicly named senior product leader whose product-engineering delivery vision the role would help implement.
unknowns:
  - The depth and recency of hands-on stack-trace, automated-test, and bug-pipeline evidence expected at interview.
  - The split among delivery, manual QA, automated testing, and project administration in a normal week.
  - The team's on-call, release, and after-hours expectations.
hard_screens:
  - id: screen.codepath-engineering-pm.technical-qa
    text: The candidate must demonstrate hands-on bug reproduction, stack-trace reading, and test-case writing.
    state: review-needed
    disposition: verify
  - id: screen.codepath-engineering-pm.remote-eligibility
    text: The candidate must be eligible to work in one of the listed regions without CodePath immigration support.
    state: likely-met
    disposition: verify
role_requirements:
  - id: requirement.codepath-engineering-pm.delivery
    importance: critical
    kind: capability
    text: Keep a small engineering team's work organized, visible, unblocked, and moving.
    wiki_evidence:
      - capability.technical-operations
      - project.harry-j-epstein
    public_evidence:
      - route: /work/technical-operations
        needle: Coordinate delivery across concurrent projects
      - route: /work/technical-operations
        needle: recurring blockers before they become patterns
    status: visible-proven
    gap_type: none
    next_action: Lead with one engineering-adjacent delivery story that names issue, triage, implementation, verification, and handoff.
  - id: requirement.codepath-engineering-pm.hands-on-qa
    importance: critical
    kind: capability
    text: Own hands-on quality assurance and confirm fixes across a bug pipeline.
    wiki_evidence:
      - capability.technical-operations
    public_evidence:
      - route: /
        needle: quality assurance, user acceptance testing
    status: visible-qualified
    gap_type: retrieval
    next_action: Prepare one specific QA and UAT trace with severity, reproduction steps, expected behavior, fix verification, and outcome.
  - id: requirement.codepath-engineering-pm.test-case-writing
    importance: critical
    kind: artifact
    text: Reproduce a bug, read a stack trace, and write a test case that helps prevent regression.
    wiki_evidence:
      - project.wowlist
    public_evidence: []
    status: source-needed
    gap_type: source
    next_action: Produce a small truthful repository example or acknowledge the gap; do not infer current test fluency from historical Django work.
  - id: requirement.codepath-engineering-pm.lightweight-process
    importance: critical
    kind: capability
    text: Add only the process and rituals whose coordination value exceeds their cost.
    wiki_evidence:
      - capability.technical-operations
    public_evidence:
      - route: /work/technical-operations
        needle: without overengineering
    status: visible-proven
    gap_type: none
    next_action: Describe one time Jamie intentionally reduced, replaced, or declined process.
  - id: requirement.codepath-engineering-pm.ai-automation
    importance: important
    kind: capability
    text: Use AI to automate repetitive project or QA work while preserving verification.
    wiki_evidence:
      - method.source-backed-team-memory
    public_evidence:
      - route: /lab/source-backed-team-memory
        needle: human-correctable AI workflows
    status: visible-qualified
    gap_type: wording
    next_action: Demonstrate one bounded AI-assisted check with failure modes and human review.
one_year_success_conditions:
  - Engineers, product partners, and internal users share a clear view of work, defects, priority, and release quality.
  - The bug and test system catches regressions without burying a small team in ceremony.
  - Jamie deepens practical engineering fluency while remaining a delivery and quality partner rather than a substitute engineer.
one_year_risk_conditions:
  - The role combines project management, manual QA, automated test engineering, and release ownership without enough time or authority.
  - Process restraint becomes underinvestment in reliability, documentation, or sustainable team practice.
interview_questions:
  - Will Zack Parker be the direct manager, and how does his team divide project management, QA, and test engineering?
  - What technical exercise demonstrates the expected stack-trace and test-case depth?
  - Which outcomes would Chris Coleman and the product team expect this role to change in the first six months?
relations:
  - type: uses_source
    target: source.jobs.codepath.engineering-project-manager.5160542007
    href: ../sources/jobs-codepath-engineering-project-manager-5160542007.md
  - type: uses_source
    target: source.codepath.leadership.2026-08-13
    href: ../sources/codepath-leadership-2026.md
  - type: related_to
    target: capability.technical-operations
    href: ../capabilities/technical-operations.md
  - type: related_to
    target: project.wowlist
    href: ../projects/wowlist-orientation.md
evidence:
  - target: source.jobs.codepath.engineering-project-manager.5160542007
    relationship: direct-support
    confidence: high
    supports:
      - live role facts, reporting title, compensation, technical expectations, and requirements
  - target: source.codepath.leadership.2026-08-13
    relationship: corroborating
    confidence: high
    supports:
      - current CodePath title-holders relevant to the reporting and vision chain
human_review: governed-open
---

# CodePath - Engineering Project Manager

This is the cleanest high-compensation technical-delivery role in the top three,
but it has a sharper technical screen than the title suggests. Jamie's delivery,
systems, QA, UAT, documentation, and Django history are relevant. They do not by
themselves prove current stack-trace reading or automated test-case fluency.

Zack Parker is a high-confidence public title match, not a posting-named
manager. Chris Coleman is the nearest public product-engineering vision owner.
