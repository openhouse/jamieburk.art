---
id: source.jobs.betanyc-newsletter.current
title: BetaNYC weekly civic-tech newsletter opportunity source
kind: source
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-21
review_by: 2026-08-30
canonical_path: docs/knowledge-bank/sources/betanyc-newsletter.md
canonical_url: https://www.beta.nyc/newsletter/
source_type: official-public-data
source_kind: recurring-editorial-opportunity-digest
publisher: BetaNYC
automated_update: false
verified_at: 2026-08-21
summary: Weekly civic-tech editorial source whose Jobs and Opportunities section can discover and contextualize roles before official-employer verification.
human_review: governed-open
relations:
  - type: supports
    target: opportunity.polimorphic.product-manager.123173
    href: ../opportunities/polimorphic-product-manager-123173.md
  - type: related_to
    target: source.jobs.nyc-open-data.current
    href: ./nyc-jobs-open-data.md
  - type: related_to
    target: source.jobs.civic-match.current
    href: ./civic-match.md
---

# BetaNYC weekly civic-tech newsletter opportunity source

BetaNYC publishes a recurring civic-tech newsletter with a curated Jobs and
Opportunities section. The authenticated mailbox contained an August 20, 2026
edition when the public newsletter archive still showed August 13 as its newest
edition. The source therefore has two clocks: the newest edition received and
the newest edition visible in the public archive.

The August 20 edition was reviewed and normalized into a public-safe snapshot.
The committed record retains titles, organizations, clean destinations,
deadlines, score inputs, dispositions, and discovery provenance. It excludes
the raw message, recipient data, mailbox identifiers, unsubscribe controls, and
recipient-specific tracking.

## Affordances

- weekly editorial discovery across city, state, nonprofit, and civic-tech work;
- community context that can explain why a role or organization matters now;
- role leads beyond the NYC Jobs Open Data table;
- corroborating provenance for roles already discovered elsewhere;
- event and relationship leads that may support a job search without becoming
  job opportunities themselves.

## Refresh and verification

The edition-age check runs before the opportunity evaluation. When the newest
recorded edition is older than ten days, modeled-reader work stops and the next
step is an authenticated mailbox review. Every job lead then resolves to a
clean destination and, when available, the employer's own posting. Employer
postings govern compensation, qualifications, status, and deadlines.

The repository records and checks this process, but does not claim an active
mailbox scheduler. Connecting a recurring authenticated ingestion job requires
separate operator authorization.

## Boundaries

- BetaNYC is discovery and editorial provenance, not the authority for role facts.
- One opportunity discovered by multiple sources remains one opportunity node.
- Deterministic exclusions and threshold failures receive no modeled-reader call.
- A score is a prioritization aid, not an eligibility or hiring probability.
- Jamie alone decides whether and when to apply.

## Public references

- [BetaNYC newsletter](https://www.beta.nyc/newsletter/)
- [BetaNYC newsletter archive](https://www.beta.nyc/category/newsletter/)
