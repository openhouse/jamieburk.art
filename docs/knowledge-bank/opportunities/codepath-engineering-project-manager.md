---
id: opportunity.codepath.engineering-project-manager.5160542007
title: CodePath - Engineering Project Manager
kind: opportunity
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-13
review_by: 2026-08-16
canonical_path: docs/knowledge-bank/opportunities/codepath-engineering-project-manager.md
summary: Public-safe requirement, leadership-context, and portfolio-coverage map for CodePath's live Engineering Project Manager role.
canonical_url: https://job-boards.greenhouse.io/codepath/jobs/5160542007
source_type: official-employer
opportunity_status: live
verified_at: 2026-08-13
portfolio_routes:
  - /
  - /work/technical-operations
  - /lab/source-backed-team-memory
  - /work/harry-j-epstein
  - /resume
  - /contact
discovery_terms:
  - engineering delivery
  - bug pipeline
  - quality assurance
  - small team
  - process judgment
  - AI automation
confirmed_facts:
  - The role is remote, full-time, and reports to the VP of Engineering.
  - The posted US salary range is $140,000 to $178,000.
  - The official CodePath leadership page identifies Zack Parker as Vice President, Engineering.
inferences:
  - Pairing the job posting with the current leadership page makes Zack Parker the nearest publicly identified reporting person, but the posting itself does not name him.
unknowns:
  - The interview weighting of delivery management, manual QA, automated testing, and Ruby-specific test work.
  - The exact decision boundary between this role, Engineering, and Product.
hard_screens:
  - id: screen.codepath.engineering-delivery-tenure
    text: The posting asks for four or more years in project management, delivery, or QA, ideally on a small engineering team.
    state: likely-met
    disposition: verify
  - id: screen.codepath.hands-on-qa
    text: The posting requires hands-on QA, issue reproduction, test cases, and ownership of a bug pipeline.
    state: review-needed
    disposition: verify
role_requirements:
  - id: requirement.codepath.engineering-delivery
    importance: critical
    kind: capability
    text: Keep engineering work organized, moving, and visible across blockers and next steps.
    wiki_evidence:
      - capability.technical-operations
    public_evidence:
      - route: /work/technical-operations
        needle: Coordinate delivery across concurrent projects
      - route: /work/technical-operations
        needle: Track status, surface risks early
    status: visible-proven
    gap_type: none
    next_action: Prepare a concise engineering-delivery example with an inspectable plan of record.
  - id: requirement.codepath.qa-and-bug-pipeline
    importance: critical
    kind: capability
    text: Reproduce issues, own testing and triage, prioritize bugs, and confirm fixes.
    wiki_evidence:
      - capability.technical-operations
    public_evidence: []
    status: visible-weak
    gap_type: public-projection
    next_action: Inventory real QA and issue-triage work; do not substitute general project coordination.
  - id: requirement.codepath.technical-test-fluency
    importance: critical
    kind: capability
    text: Read stack traces and write useful automated test cases, with Capybara or comparable tooling as a plus.
    wiki_evidence: []
    public_evidence: []
    status: source-needed
    gap_type: source
    next_action: Verify current hands-on evidence and prepare a bounded technical demonstration if supportable.
  - id: requirement.codepath.proportionate-process
    importance: critical
    kind: capability
    text: Add process only when its benefit exceeds its cost and friction.
    wiki_evidence:
      - capability.technical-operations
    public_evidence:
      - route: /work/technical-operations
        needle: Improve working systems over time without overengineering
    status: visible-proven
    gap_type: none
    next_action: Explain one instance of intentionally removing or declining process.
  - id: requirement.codepath.ai-automation
    importance: important
    kind: capability
    text: Use AI tools to automate repetitive work while preserving verification and judgment.
    wiki_evidence:
      - method.source-backed-team-memory
    public_evidence:
      - route: /lab/source-backed-team-memory
        needle: human-correctable AI workflows
    status: visible-qualified
    gap_type: wording
    next_action: Demonstrate one measured automation loop tied to delivery or QA.
one_year_success_conditions:
  - Engineers, Product, and internal users share an accurate view of work, quality, blockers, and fixes without carrying unnecessary ceremony.
one_year_risk_conditions:
  - The job expects a depth of hands-on automated QA that the hiring process does not test or support honestly.
  - A small team turns coordination and quality ownership into an always-on single-person bottleneck.
interview_questions:
  - What percentage of a typical week is delivery coordination, manual QA, automated test writing, and bug triage?
  - Which product and quality decisions can this role make directly?
public_reporting_context:
  role: Vice President, Engineering
  person: person.zack-parker
  identification: role-identity-matched
  source: source.codepath.leadership.2026
  boundary: The posting names only the role; the current official leadership page supplies the person match.
public_vision_context:
  role: Chief Product Officer
  person: person.chris-coleman
  identification: role-identity-matched
  source: source.codepath.leadership.2026
  boundary: Official pages identify product-engineering remit, not a complete reporting chain or hiring role.
relations:
  - type: uses_source
    target: source.jobs.codepath.engineering-project-manager.5160542007
    href: ../sources/jobs-codepath-engineering-project-manager-5160542007.md
  - type: uses_source
    target: source.codepath.leadership.2026
    href: ../sources/codepath-leadership-2026.md
  - type: related_to
    target: person.zack-parker
    href: ../people/zack-parker.md
    context: Current official VP Engineering role match; confirm the actual reporting line.
  - type: related_to
    target: person.chris-coleman
    href: ../people/chris-coleman.md
    context: Nearest published product-engineering vision context.
  - type: related_to
    target: capability.technical-operations
    href: ../capabilities/technical-operations.md
  - type: uses_method
    target: method.source-backed-team-memory
    href: ../methods/source-backed-team-memory.md
evidence:
  - target: source.jobs.codepath.engineering-project-manager.5160542007
    relationship: direct-support
    confidence: high
    supports:
      - official role facts, requirements, and reporting-role language rechecked August 13, 2026
  - target: source.codepath.leadership.2026
    relationship: context
    confidence: high
    supports:
      - current public identities of the VP Engineering and Chief Product Officer
human_review: governed-open
---

# CodePath - Engineering Project Manager

The delivery, ambiguity, communication, proportionate-process, and responsible-
AI pattern is strong. The decisive diligence area is hands-on quality ownership:
the application should show real bug reproduction and testing evidence or name
the gap plainly rather than recasting general operations as QA engineering.

The reporting person is a two-source public role match, not a person named in
the posting. The bounded people records are [Zack Parker](../people/zack-parker.md)
and [Chris Coleman](../people/chris-coleman.md). Recheck both
[role](../sources/jobs-codepath-engineering-project-manager-5160542007.md) and
[leadership](../sources/codepath-leadership-2026.md) before outward use.
