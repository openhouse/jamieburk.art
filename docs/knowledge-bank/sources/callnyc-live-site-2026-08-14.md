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
summary: Bounded close reading and HTTP crawl of the restored archived CallNYC prototype.
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

The footer correctly says “Archived project demo (snapshot). Not official, not
current.” Other parts of the surface still say “free assistance,” describe the
data as “up-to-today,” and show 2016-era Council names and phone numbers. The
archive disclaimer therefore arrives later than the most consequential
current-sounding language. Portfolio and resume links must label CallNYC as an
archived prototype and must not present it as current civic guidance.

The site retains older external scripts and analytics references, and
`/robots.txt` returns the application HTML rather than a robots policy. These
are a maintenance queue, not a vulnerability claim. A future archive pass
should put the status boundary before action-oriented content, remove or
neutralize obsolete actions, and establish an explicit robots policy.
