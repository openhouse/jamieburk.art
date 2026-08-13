---
id: opportunity.codepath.senior-ai-operations-lead.5175813007
title: CodePath - Senior AI Operations Lead
kind: opportunity
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-13
review_by: 2026-08-16
canonical_path: docs/knowledge-bank/opportunities/codepath-senior-ai-operations-lead.md
summary: Public-safe requirement, reporting-context, and portfolio-coverage map for CodePath's live Senior AI Operations Lead role.
canonical_url: https://job-boards.greenhouse.io/codepath/jobs/5175813007
source_type: official-employer
opportunity_status: live
verified_at: 2026-08-13
reporting_context:
  direct_manager_title: Director of Business Operations
  direct_manager_person: Quinton Ma
  direct_manager_public_status: title-matched-on-official-team-page
  senior_vision_owner: Brian Madigan
  senior_vision_owner_title: Chief Operating Officer
  senior_vision_basis: CodePath's official team page and COO announcement identify Madigan as the leader responsible for business operations and organizational scalability.
  verified_at: 2026-08-13
portfolio_routes:
  - /
  - /work/technical-operations
  - /work/harry-j-epstein
  - /work/fair-rent-nyc
  - /lab/source-backed-team-memory
  - /resume
  - /about
discovery_terms:
  - embedded AI enablement
  - human-in-the-loop workflows
  - operational automation
  - reusable agent assets
  - quality rubrics and evals
  - change management
confirmed_facts:
  - The role is full-time, remote in the United States, and pays $110,000 to $150,000.
  - The posting says the role reports to the Director of Business Operations but does not name a person.
  - CodePath's official team page identifies Quinton Ma as Director of Business Operations and Brian Madigan as Chief Operating Officer.
  - The application requires a description of a personally built and shipped LLM workflow and a measured operational change.
inferences:
  - Quinton Ma is the likely direct manager because he is the current official title-holder; the posting does not name him, so this remains a title match rather than a confirmed hiring relationship.
  - Brian Madigan is the nearest publicly named senior leader whose business-operations and scalability vision the role would implement.
unknowns:
  - Whether recent Knowledge Wiki and agent work satisfies CodePath's requirement for recent professional LLM or agent work.
  - The first embedded function, production access model, security review, and expected portfolio of agents.
  - The degree of after-hours urgency implied by moving at the speed of AI.
hard_screens:
  - id: screen.codepath-ai-ops.professional-agent-work
    text: The posting requires five or more years in automation or operations tooling, including recent professional LLM or agent work.
    state: review-needed
    disposition: verify
  - id: screen.codepath-ai-ops.shipped-workflow
    text: The application requires a personally built and shipped LLM workflow with tools, APIs, and user change.
    state: review-needed
    disposition: verify
role_requirements:
  - id: requirement.codepath-ai-ops.workflow-audit
    importance: critical
    kind: capability
    text: Embed with nontechnical functions, map real workflows, and select high-leverage automation opportunities.
    wiki_evidence:
      - capability.technical-operations
      - project.harry-j-epstein
    public_evidence:
      - route: /work/technical-operations
        needle: requirements, delivery rhythms, decision records
      - route: /work/harry-j-epstein
        needle: operations workflow improvements
    status: visible-qualified
    gap_type: none
    next_action: Prepare one end-to-end before-and-after workflow with the human work, not the tool, at the center.
  - id: requirement.codepath-ai-ops.agent-delivery
    importance: critical
    kind: artifact
    text: Build, ship, productionize, and hand off reliable LLM agents or automations.
    wiki_evidence:
      - method.source-backed-team-memory
    public_evidence:
      - route: /lab/source-backed-team-memory
        needle: human-correctable AI workflows
    status: wiki-proven-not-projected
    gap_type: experience
    next_action: Select one genuinely used workflow and document users, tools, review gates, measured change, and production boundary; do not call the lab production SaaS.
  - id: requirement.codepath-ai-ops.quality-gates
    importance: critical
    kind: capability
    text: Establish rubrics, evals, review steps, and drift controls that keep AI output trustworthy.
    wiki_evidence:
      - method.source-backed-team-memory
    public_evidence:
      - route: /lab/source-backed-team-memory
        needle: error analysis, annotation, traces, retrieval quality
    status: visible-qualified
    gap_type: none
    next_action: Demonstrate deterministic checks, adversarial mutations, and human holdouts as a bounded quality system.
  - id: requirement.codepath-ai-ops.reusable-assets
    importance: critical
    kind: artifact
    text: Create reusable skills, plugins, templates, documentation, and clean handoffs.
    wiki_evidence:
      - method.source-backed-team-memory
      - capability.technical-operations
    public_evidence:
      - route: /work/technical-operations
        needle: handbooks, runbooks, operating documentation
      - route: /work/technical-operations
        needle: durable handoffs
    status: visible-proven
    gap_type: none
    next_action: Show one reusable asset and the evidence that another person could operate it.
  - id: requirement.codepath-ai-ops.outcome-measurement
    importance: important
    kind: capability
    text: Measure time saved and quality gained rather than platform activity.
    wiki_evidence:
      - capability.technical-operations
      - method.source-backed-team-memory
    public_evidence:
      - route: /work/technical-operations
        needle: operational metrics with honesty
    status: visible-qualified
    gap_type: source
    next_action: Recover one defensible adoption, time, quality, or error-rate baseline for a real workflow.
one_year_success_conditions:
  - Several functions own durable AI-assisted workflows with documented evals, review gates, and measurable value.
  - Teammates become more capable and less dependent on the enablement lead after each engagement.
  - Jamie deepens production AI operations without replacing care, judgment, or team agency with automation theater.
one_year_risk_conditions:
  - The role is evaluated on agent volume or executive excitement rather than adoption, quality, and team capability.
  - One embedded lead becomes the maintenance owner for every fragile automation across the organization.
interview_questions:
  - Will Quinton Ma be the hiring manager, and how do Business Operations and the COO divide prioritization?
  - What production, privacy, security, and model-risk gates must an embedded workflow pass?
  - What evidence shows the company-wide Claude rollout has changed behavior rather than only increased account activity?
relations:
  - type: uses_source
    target: source.jobs.codepath.senior-ai-operations-lead.5175813007
    href: ../sources/jobs-codepath-senior-ai-operations-lead-5175813007.md
  - type: uses_source
    target: source.codepath.leadership.2026-08-13
    href: ../sources/codepath-leadership-2026.md
  - type: related_to
    target: method.source-backed-team-memory
    href: ../methods/source-backed-team-memory.md
  - type: related_to
    target: capability.technical-operations
    href: ../capabilities/technical-operations.md
evidence:
  - target: source.jobs.codepath.senior-ai-operations-lead.5175813007
    relationship: direct-support
    confidence: high
    supports:
      - live role facts, reporting title, compensation, requirements, and application screens
  - target: source.codepath.leadership.2026-08-13
    relationship: corroborating
    confidence: high
    supports:
      - current CodePath title-holders relevant to the reporting and vision chain
human_review: governed-open
---

# CodePath - Senior AI Operations Lead

This role is the highest-growth learning opportunity and the least safe fit of
the top three. Jamie has strong systems, documentation, facilitation, eval, and
human-gate evidence. The application still asks for a recent professional,
personally shipped LLM workflow with demonstrated user change. That screen must
be answered with one real traceable deployment, not the existence of this repo.

Quinton Ma is a high-confidence public title match, not a posting-named manager.
Brian Madigan is the nearest public senior operations vision owner.
