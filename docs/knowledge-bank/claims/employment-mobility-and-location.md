---
id: claim.employment.mobility-and-location.2026-08-15
title: Employment mobility and Brooklyn home-base preference
kind: claim
status: maintained
visibility: public-safe
sensitivity: moderate
created: 2026-08-15
last_reviewed: 2026-08-15
review_by: 2026-11-15
canonical_path: docs/knowledge-bank/claims/employment-mobility-and-location.md
summary: User-attested US and Irish nationality, a long-term Brooklyn home-base preference, and bounded EU opportunity-screening guidance.
claim_status: use-with-care
attestation_status: user-attested
home_base: Brooklyn, New York
long_term_home_base: true
permanent_relocation: not-preferred
part_year_international_work: open
work_authorization:
  united_states:
    status: user-attested-work-authorization
    basis: United States citizenship
  european_union:
    status: generally-no-work-permit-required
    basis: Irish citizenship under EU free-movement rules
  austria:
    status: generally-no-work-permit-required
    basis: Irish citizenship under EU free-movement rules
cross_border_gates:
  - id: gate.employer-location-policy
    status: verify-per-opportunity
    question: Can the employer hire Jamie in the proposed location and employment structure?
  - id: gate.residence-registration
    status: verify-before-stay
    question: What Austrian address-registration and EU residence-registration duties would the length and nature of the stay trigger?
  - id: gate.tax-and-payroll
    status: qualified-review-required
    question: Which jurisdictions may tax the work, and what payroll or employer obligations follow?
  - id: gate.social-security
    status: qualified-review-required
    question: Which country's social-security system applies to the actual work pattern?
  - id: gate.travel-and-time-zone
    status: verify-per-opportunity
    question: Can the role's working hours, travel, security, and on-site expectations coexist with a Brooklyn home base and any part-year overseas work?
protected_boundaries:
  - exact residential address
  - passport numbers and identity-document images
  - tax identifiers, filings, and individualized legal advice
projection:
  status: hold
  surfaces: []
anti_claims:
  - An Irish passport by itself makes every cross-border employment arrangement compliant.
  - Jamie is willing to relocate permanently away from Brooklyn.
  - A remote role necessarily permits work from another country.
  - Work-permit eligibility resolves residence, tax, payroll, social-security, security, or employer-policy questions.
human_review: governed-open
relations:
  - type: uses_source
    target: source.jamie.employment-mobility-attestation.2026-08-15
    href: ../sources/jamie-employment-mobility-attestation-2026.md
  - type: uses_source
    target: source.eu.work-permits.2026-08-15
    href: ../sources/eu-work-permits-2026.md
  - type: uses_source
    target: source.austria.eu-mobility.2026-08-15
    href: ../sources/austria-eu-mobility-2026.md
  - type: uses_source
    target: source.eu.income-tax-abroad.2026-08-15
    href: ../sources/eu-income-tax-abroad-2026.md
  - type: uses_source
    target: source.eu.social-security-country-coverage.2026-08-15
    href: ../sources/eu-social-security-country-coverage-2026.md
evidence:
  - target: source.jamie.employment-mobility-attestation.2026-08-15
    relationship: direct-support
    confidence: high
    supports:
      - dual-nationality attestation
      - Brooklyn home-base preference
      - openness to part-year overseas work
  - target: source.eu.work-permits.2026-08-15
    relationship: context
    confidence: high
    supports:
      - general EU work-permit rule for EU nationals
  - target: source.austria.eu-mobility.2026-08-15
    relationship: context
    confidence: high
    supports:
      - Austrian labour-market access and residence-registration context for EU and EEA citizens
  - target: source.eu.income-tax-abroad.2026-08-15
    relationship: supports-boundary
    confidence: high
    supports:
      - tax residence and double-taxation caveats
  - target: source.eu.social-security-country-coverage.2026-08-15
    relationship: supports-boundary
    confidence: high
    supports:
      - social-security coordination caveats for work in more than one country
---

# Employment mobility and Brooklyn home-base preference

Jamie attested on August 15, 2026 that he is a United States and Irish dual
national, intends to keep Brooklyn as his long-term home base, is not seeking a
permanent relocation away from Brooklyn, and is open to spending part of a year
working overseas when the role and employment structure support it. The exact
residential address supplied in that conversation is deliberately not retained
in this public-safe repository.

Official EU guidance says EU nationals generally do not need a work permit to
work elsewhere in the EU. Austrian government guidance says EEA and Swiss
citizens may take employment in Austria under the same labour-market-access
conditions as Austrian citizens. On the stated facts, Austria and other EU
member states are therefore valid opportunity-search geographies rather than
automatic immigration exclusions.

That inference is conditional on the nationality attestation and does not make
every arrangement workable. Austrian registration duties can arise after
taking accommodation and for stays longer than three months. Tax, payroll,
social-security, security, employer-entity, travel, and time-zone questions
depend on the real arrangement. A US-remote posting must not be treated as
internationally remote unless the employer confirms it.

## Opportunity-discovery rule

Include New York City, Brooklyn-compatible hybrid, United States remote, and
EU opportunities that could preserve a Brooklyn home base. For each overseas
or cross-border role, keep work-permit eligibility separate from employer
location policy, residence registration, tax and payroll, social security,
travel, time-zone, compensation, language, and duration. Do not infer permanent
relocation willingness from openness to part-year work abroad.

This is employment-search context, not individualized legal or tax advice.
