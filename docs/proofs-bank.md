# Internal Proof Knowledge Graph

The public-safe proof knowledge graph lives at `apps/www/src/data/proofs.ts`.

Its job is to hold defensible, newspaper-safe claims about Jamie's professional
work inside the repo. The website is a composed projection of this knowledge:
each public page should select, sequence, and phrase claims for its audience and
purpose instead of exposing the graph as an archive, ledger, or route.

## What Goes In

Each claim needs:

- A concise public claim.
- Website-ready projections where a claim supports a specific page purpose.
- Source-basis notes that explain why the claim is defensible.
- Confidence and visibility labels.
- Public-use guidance.
- Guardrails that prevent overclaiming or overexposure.

## What Does Not Go In

Do not commit archival source files, detailed collaborator records, unapproved
quotes, identifying community records, source databases, deal materials,
protected communications, nonpublic analytics, access material, or consent-bound
media.

Use summaries, aggregate counts, public URLs, published resume claims, approved
artifacts, and careful collective-work language.

## Claim Standards

- Prefer precise role language over inflated ownership language.
- Use collective credit for coalition, campaign, community, and partner work.
- Separate what is known from what needs approval.
- Keep the proof graph repo-internal; do not add a public `/proofs` route
  without explicit approval.
- Describe active legal or policy questions as questions unless reviewed.
- Publish aggregate archive findings only when the underlying records remain
  protected.
- When uncertain in staging-facing public content, use
  `TODO: Jamie approval required.` Production checks intentionally fail on that
  marker.

## Current Website Projections

- Homepage proof strip imports `homepageProofs`.
- Resume page selected impact imports `resumeProofHighlights`.
- Technical Operations page imports `technicalOperationsProofRows`.
- Case studies remain rhetorically composed pages that draw on the same claims
  through edited summaries, evidence language, Known / Open / Protected notes,
  and public-safety limits.
