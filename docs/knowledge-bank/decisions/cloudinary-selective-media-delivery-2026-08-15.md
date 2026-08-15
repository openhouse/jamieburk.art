---
id: decision.portfolio.cloudinary-selective-media-delivery.2026-08-15
title: Selective Cloudinary delivery for governed portfolio derivatives
kind: decision
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-15
review_by: 2026-11-15
canonical_path: docs/knowledge-bank/decisions/cloudinary-selective-media-delivery-2026-08-15.md
summary: Bounded delivery decision to place two exact, already-public portfolio derivatives behind responsive Cloudinary transforms while retaining repository governance, same-origin fallbacks, and explicit exclusions.
decision_period: 2026-08-15
decision_state: documented-with-boundary
decision_question: How can the portfolio reduce responsive image transfer cost without turning a third-party media service into the source of truth or widening the publication boundary?
decision_actors:
  - Jamie Burkart as publication authority and Cloudinary account owner
  - Codex as implementation and verification support under Jamie's explicit two-asset authorization
constraints:
  - The repository remains canonical for public-safe derivative identity, caption, credit, rights boundary, and rollback.
  - Cloudinary receives only exact assets Jamie authorized for this destination.
  - Private photo masters, archive metadata, unapproved derivatives, fonts, the resume PDF, and the Open Graph image remain outside the pilot.
  - A missing or disabled Cloudinary configuration must fail to the same-origin repository asset.
options_considered:
  - option: Keep every asset same-origin behind Next Image.
    disposition: adapted
    evidence_state: documented
  - option: Move all public static assets to Cloudinary.
    disposition: not-chosen
    evidence_state: documented
  - option: Pilot direct Cloudinary delivery for two exact below-fold Fair Rent NYC derivatives with versioned bounded transforms.
    disposition: chosen
    evidence_state: documented
chosen_course: Deliver the Shoestring Press facilitation derivative and the Let NYC Dance public-surface derivative through versioned Cloudinary URLs, bounded responsive widths, format negotiation, and asset-specific quality policies. Keep all other assets local.
resulting_artifacts:
  - projection.photo.fair-rent-nyc.shoestring-facilitation
  - source.let-nyc-dance.public-surface.2026-08-13
outcome_boundary: This decision changes delivery for two exact derivatives only. It does not transfer archive custody, broaden publication permission, replace captions or credits, authorize new crops, or establish a general Cloudinary migration.
credit_scope: individual-and-collective
projection:
  status: hold
  surfaces: []
unknowns:
  - Real-user Core Web Vitals remain to be observed after sufficient production traffic exists.
  - A larger media migration would require a new asset-by-asset decision, cost model, and rights review.
anti_claims:
  - Faster delivery does not confer broader rights or consent.
  - Cloudinary account presence does not make an asset canonical.
  - A successful automated check does not replace Jamie's production authority.
relations:
  - type: related_to
    target: projection.photo.fair-rent-nyc.shoestring-facilitation
    href: ../projections/photography/fair-rent-nyc-shoestring-facilitation.md
  - type: uses_source
    target: source.let-nyc-dance.public-surface.2026-08-13
    href: ../sources/let-nyc-dance-public-surface-2026-08.md
  - type: related_to
    target: edition.launch.2026-08
    href: ../projections/photography/edition-launch-2026-08.md
---

# Selective Cloudinary delivery for governed portfolio derivatives

The pilot separates asset governance from asset delivery. The repository keeps
the approved WebP derivatives, dimensions, alternative text, captions, credits,
public-use boundaries, and rollback path. Cloudinary receives byte-matching
copies of two already-public derivatives and returns responsive formats at
allowlisted widths. The browser therefore downloads a right-sized image without
asking the application server to transform it again.

The pilot is deliberately asymmetric. The photograph uses `q_auto:good`; the
text-bearing campaign screenshot uses `q_auto:best` to protect interface
legibility. Both use `c_limit` so an asserted width cannot upscale the source.
Versioned public IDs make the deployed bytes inspectable and cache-stable.

The Open Graph image stays same-origin because its exact rendered bytes are an
approved social contract. The resume PDF and fonts stay local because they are
documents and identity assets, not candidates for this image experiment.
Disabling `NEXT_PUBLIC_CLOUDINARY_PILOT` and rebuilding restores local delivery
without changing page composition or removing the repository assets.
