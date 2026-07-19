---
id: opportunity.aclu.product-manager-ii-discovery.8482872002
title: ACLU Product Manager II, Discovery opportunity
kind: opportunity
status: governed-open
visibility: public-safe
sensitivity: low
projection_status: never-public
last_reviewed: "2026-07-18"
review_by: "2026-07-21"
human_review_state: not-requested
aliases: [ACLU Product Discovery role]
canonical_path: docs/knowledge-wiki/opportunities/aclu-product-discovery.md
summary: Public-safe requirement and evidence map for ACLU product discovery work.
authority_refs: []
relations:
  - type: related_to
    target: capability.technical-operations
    context: Connects discovery requirements to bounded public-facing delivery and knowledge-system evidence.
organization: American Civil Liberties Union
role_title: Product Manager II, Discovery
tier: 1
canonical_url: https://job-boards.greenhouse.io/aclu/jobs/8482872002
source_type: official-employer
official_source: {url: https://job-boards.greenhouse.io/aclu/jobs/8482872002, retrieved_at: "2026-07-18", supports: [role_title, opportunity_status, deadline, compensation, location, reporting_line, role_requirements, confirmed_facts]}
opportunity_status: live
verified_at: "2026-07-18"
reverify_by: "2026-07-21"
deadline: null
job_id: "8482872002"
compensation: {currency: USD, minimum: 142694, maximum: 142694, basis: annual-base, certainty: fixed-nyc-salary}
location: {city: New York, work_model: hybrid-two-days-week-or-eight-days-month, office: unspecified}
reporting_line: {text: Head of Product, certainty: confirmed-title-name-unknown}
named_personnel: []
hard_requirements:
  - requirement.aclu.launched-product-brief
  - requirement.aclu.product-management-experience
preferred_requirements: []
known_incompatible_hard_screens: []
discovery_signals: [ambiguous-work, requirements, workflow-mapping, documentation, risk-and-dependencies, stakeholder-translation, responsible-ai]
role_requirements:
  - {id: requirement.aclu.launched-product-brief, importance: critical, kind: hard-screen, text: "Submit a redacted PRD or product brief for a launched product.", proof_refs: [callnyc-civic-data-guidance], wiki_records: [project.callnyc], public_routes: [/work/callnyc], coverage_status: hard-screen, gap_type: application-artifact-required, next_action: "Produce a retrospective source-backed CallNYC product brief before submission."}
  - {id: requirement.aclu.product-management-experience, importance: critical, kind: hard-screen, text: "Demonstrate product management experience with software teams or vendors.", proof_refs: [wowlist-community-platform, callnyc-civic-data-guidance, hje-modernization-stewardship], wiki_records: [project.callnyc, capability.technical-operations], public_routes: [/work/callnyc, /work/technical-operations], coverage_status: visible-qualified, gap_type: title-and-context-translation, next_action: "Use concrete product decisions and collaborators rather than claiming an unsupported formal title."}
  - {id: requirement.aclu.structured-discovery, importance: critical, kind: capability, text: "Lead interviews, listening tours, workshops, and stakeholder discovery.", proof_refs: [fair-rent-campaign-memory, nyc-artist-coalition-participation-system], wiki_records: [capability.technical-operations], public_routes: [/work/fair-rent-nyc, /work/technical-operations], coverage_status: visible-qualified, gap_type: discovery-language-gap, next_action: "Develop the product brief from existing public-safe discovery evidence."}
  - {id: requirement.aclu.problem-framing, importance: critical, kind: capability, text: "Translate needs, constraints, risks, and success criteria into actionable briefs.", proof_refs: [callnyc-civic-data-guidance, fair-rent-campaign-memory, source-backed-team-memory-method], wiki_records: [project.callnyc, method.source-backed-team-memory], public_routes: [/work/callnyc, /work/fair-rent-nyc, /lab/source-backed-team-memory], coverage_status: visible-proven, gap_type: none, next_action: "Keep the strongest problem-to-artifact examples visible."}
  - {id: requirement.aclu.privacy-and-governance, importance: critical, kind: judgment, text: "Balance innovation with privacy, security, counsel, and traceable governance.", proof_refs: [source-backed-team-memory-method, ai-evals-professional-development], wiki_records: [method.source-backed-team-memory], public_routes: [/lab/source-backed-team-memory, /about], coverage_status: visible-qualified, gap_type: organizational-scale-gap, next_action: "Present the traceable human-review method without claiming ownership of enterprise privacy, security, or counsel governance."}
  - {id: requirement.aclu.build-buy-do-not-build, importance: critical, kind: judgment, text: "Recommend build, buy, pilot, or do not pursue.", proof_refs: [source-backed-team-memory-method, fair-rent-source-map], wiki_records: [method.source-backed-team-memory, capability.technical-operations], public_routes: [/lab/source-backed-team-memory, /work/fair-rent-nyc], coverage_status: wiki-proven-not-projected, gap_type: decision-artifact-gap, next_action: "Put the decision logic in the required product brief rather than adding broad website prose."}
  - {id: requirement.aclu.facilitation-without-authority, importance: critical, kind: capability, text: "Build alignment across competing technical and nontechnical perspectives without direct authority.", proof_refs: [nyc-artist-coalition-civic-systems, sunday-dinner-196-participation-infrastructure], wiki_records: [capability.technical-operations], public_routes: [/work/fair-rent-nyc, /work/technical-operations], coverage_status: visible-proven, gap_type: none, next_action: "Preserve collective credit while naming Jamie's facilitation role."}
  - {id: requirement.aclu.genai-governance, importance: critical, kind: capability, text: "Support traceable GenAI governance, low-risk pilots, and evaluation.", proof_refs: [source-backed-team-memory-method, ai-evals-professional-development], wiki_records: [method.source-backed-team-memory], public_routes: [/lab/source-backed-team-memory, /about], coverage_status: visible-qualified, gap_type: organizational-scale-gap, next_action: "Present the working method as proof of practice, not enterprise governance ownership."}
organizational_context:
  - The role is a three-year term in the national Technology Department and does not own a dedicated delivery team.
confirmed_facts:
  - The role reports to the Head of Product and is represented by ACLU Staff United.
  - New York compensation is fixed at $142,694.
  - A redacted PRD or product brief from a launched product is required.
inferences: []
unknowns: [actual Head of Product, interview sequence, portfolio artifact evaluation criteria]
portfolio_routes: [/, /work/callnyc, /work/fair-rent-nyc, /lab/source-backed-team-memory, /work/technical-operations, /resume, /about]
one_year_success_conditions:
  - Stakeholders trust a repeatable discovery practice and can trace consequential technology decisions.
one_year_risk_conditions:
  - Discovery becomes recommendation without authority, follow-through, or feedback from implementation.
interview_questions:
  - How are discovery recommendations accepted, rejected, funded, and handed to delivery teams?
  - What authority does the role have in the GenAI Governance Steering Committee?
---

# ACLU Product Manager II, Discovery Opportunity

The highest-value artifact is not more site copy. It is a candid,
source-backed retrospective product brief for [CallNYC](../projects/callnyc.md)
that shows discovery, constraints, decisions, launch, learning, and present-day
limits. The [Source-Backed Team Memory method](../methods/source-backed-team-memory.md)
supports the governance argument without implying enterprise ownership.
