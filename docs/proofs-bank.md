# Proofs Bank

The proofs bank is the repo-internal, public-safe source of truth for Jamie
Burkart's professional claims. It is public because the repo is public. Nothing
belongs here that would be unsafe, unkind, or hard to defend if printed in a
newspaper.

The website projects from this bank. It should not expose the bank as a public
browser, private archive, transcript viewer, or claims database.

Canonical structured data lives in `apps/www/src/data/proofs.ts`.

## Claim Rhythm

Every durable claim needs:

- claim: what can be said
- public use: where it can be used
- support level: how strong the support is
- source basis: what kind of source supports it
- approval status: whether publication is approved, summary-only, or blocked
- projection: how it should be translated into website copy
- non-public boundary: what must not be published

## Status Vocabulary

- approved: approved for the stated public use
- approval-required: potentially useful but not ready to publish
- summary-only: the aggregate claim may be public, but underlying records stay
  private
- protected: intentionally omitted because privacy, consent, law, safety,
  client trust, or community trust requires it

## Source Support

- strong-public: public source or approved artifact supports the claim directly
- public-safe-summary: source-backed but summarized to protect sensitive context
- internal-source: supported by private or offline materials that should not be
  published
- needs-review: not ready for public use

## Current Claim Set

The initial claim set is encoded as:

- PB-001: 14+ years creating operating structure
- PB-HJE-001: Harry J. Epstein web, e-commerce, marketing, analytics, content,
  and operations improvements
- PB-HJE-002: contribution language for 2x revenue growth
- PB-CRS-001: Commercial Rent Stabilization campaign memory, source maps,
  decision/action records, policy questions, and public-data framing
- PB-WOW-001: WOWList adoption across roughly 35 city ecosystems
- PB-196-001: 300+ gatherings and 20+ resident artists
- PB-KC-001: KC Town Hall public-funding recommendation language
- PB-SBTM-001: bounded source-backed team-memory practice
- PB-AI-EVALS-001: AI Evals for Engineers & PMs completion

## Projection Rule

Homepage copy should use only the most legible, safest proof. Case studies can
carry more nuance. The technical operations page should translate claims into
role fit: planning, decision-making, documentation, onboarding, reporting, risk,
handoffs, and implementation support.

Work pages should answer:

- What was unclear?
- Toward what end?
- What became usable?
- What did Jamie do?
- What does this prove for technical operations / implementation?
- What is known?
- What is open?
- What is protected?

## Claims To Avoid

- Jamie alone passed laws, secured funding, owned a movement, or caused a
  collective outcome.
- Source-Backed Team Memory is a production SaaS, autonomous AI knowledge base,
  or client-adopted system at scale.
- WOWList had official chapters, is active today, or had millions of users.
- CallNYC is current official civic guidance.
- Harry J. Epstein revenue detail, dashboards, customer data, or vendor terms
  are publishable.
- Sunday Dinner / 196 participant records, addresses, photos, or names are
  publishable without approval.
