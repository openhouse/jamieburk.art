---
id: method.betanyc-opportunity-loop
title: BetaNYC newsletter opportunity loop
kind: method
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-21
review_by: 2026-09-20
canonical_path: docs/knowledge-bank/methods/betanyc-opportunity-loop.md
summary: Cost-aware daily review of a curated civic-technology newsletter, with official-posting checks before provisional intake.
relations:
  - type: uses_source
    target: source.betanyc.civic-tech-newsletter
    href: ../sources/betanyc-civic-tech-newsletter-2026-08-20.md
  - type: related_to
    target: source.nyc-open-data.jobs.pda4-rgn4
    href: ../sources/nyc-open-data-jobs-pda4-rgn4.md
  - type: related_to
    target: method.civic-match-opportunity-loop
    href: civic-match-opportunity-loop.md
---

# BetaNYC newsletter opportunity loop

BetaNYC's newsletter is a curated discovery and civic-context source. The NYC
Jobs dataset is a structured City-government source. Civic Match is an
authenticated talent network. The system models each according to what it can
reliably provide rather than forcing them into one ingestion shape.

## Daily sequence

1. Check the latest public issue identity and publication date.
2. Extract the Jobs and Opportunities section and preserve its source links.
3. Resolve each lead to the official employer posting and deduplicate by stable
   job ID where one exists.
4. Join City roles to the official machine-readable dataset. For other
   employers, use a maintained official-page adapter or a dated review that
   expires back into verification.
5. Exclude closed, expired, internal-only, under-target, and credential-mismatch
   roles before semantic work.
6. Compute separate fit and likely-screen-survival heuristics.
7. Admit only roles clearing all three maintained thresholds into provisional
   intake.
8. Run cached named-reader model review only for newly verified strong matches.
9. Require Jamie's review before canonical promotion, public-material changes,
   or application.

The scheduled workflow is read-only: it creates a temporary review artifact and
does not push, merge, email, publish, or apply. Mailbox delivery confirms that
the newsletter recurs, but committed data comes from the public archive and
excludes private account state.
