---
id: source.callnyc.live-site.2026-08-14
title: CallNYC restored public site
kind: source
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-14
review_by: 2026-09-13
canonical_path: docs/knowledge-bank/sources/callnyc-live-site-2026-08-14.md
summary: Bounded rendered close reading and HTTP crawl of the restored archived CallNYC prototype.
source_kind: public-website
canonical_url: https://callnyc.org/
relations:
  - type: documents
    target: project.callnyc
    href: ../projects/callnyc.md
---

# CallNYC restored public site

The bounded crawl reached 30 same-origin HTML pages and all 30 responded. It
found 103 unique first-party assets and checked a bounded sample of 80 without
finding a failure. No resident-service action or external archive link was
activated.

CallNYC demonstrates product translation at system scale. It turns a large,
unfamiliar CouncilStat constituent-services dataset into issue categories,
issue pathways, Council-district cards, ranked service patterns, telephone
actions, source links, and repeatable resident-facing guidance. The breadth of
the information architecture is itself evidence: the product does not merely
visualize a dataset; it gives residents a way through it.

## Rendered browser observation

At 1280 × 720, both the home page and an issue page rendered without observed
horizontal overflow or console warnings/errors. The archive notice—“Archived
project demo (snapshot). Not official, not current.”—now appears at the very
top, before the coral action panel, and repeats in the footer. This is an
important correction to the earlier HTML-only reading: the status boundary is
visually first, not merely late-page disclosure.

The eviction issue page demonstrates the product system particularly clearly:
an issue-specific heading, ranked top-ten results, repeatable Council-member
cards, related-service tags, and telephone actions all inherit the same
information architecture. One bounded 390 × 844 home-page check kept the
archive notice first and showed no observed horizontal overflow. This is useful
narrow-layout evidence for the observed page, not a complete responsive,
keyboard, screen-reader, assistive-technology, or transaction audit.

Other parts of the surface still say “free personal assistance,” describe the
data as “up-to-today,” and show 2016-era Council names, counts, and operative
`tel:` links. Portfolio and resume links must therefore continue to label
CallNYC as an archived, unofficial prototype and must not present it as current
civic guidance.

The site retains older external scripts and analytics references, and
`/robots.txt` returns the application HTML rather than a robots policy. These
are a maintenance queue, not a vulnerability claim. A future archive pass
should remove or neutralize obsolete actions, make historical data dates more
prominent throughout the interface, and establish an explicit robots policy.
