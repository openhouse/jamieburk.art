---
id: source.wowlist.live-site.2026-08-14
title: WOW List restored public site
kind: source
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-14
review_by: 2026-09-13
canonical_path: docs/knowledge-bank/sources/wowlist-live-site-2026-08-14.md
summary: Bounded close reading and HTTP crawl of the WOW List relaunch preview.
source_kind: public-website
canonical_url: https://wowlist.org/
relations:
  - type: documents
    target: project.wowlist
    href: ../projects/wowlist-orientation.md
---

# WOW List restored public site

The bounded crawl reached the landing page and About page; both responded. It
checked 17 first-party assets without finding a failure. The signup form was
identified but not submitted.

The landing page makes the current proposition unusually legible: “Being there
changes everything,” followed by a simple invitation to find and share things
to do in real life. The About page connects the product to Sunday Dinner,
credits Richard Caceres and Jamie Burkart together, includes a captioned member
film, and ends with “Find life in the wild.”

The product insight is larger than an events database. A WOW List post is a
single collaboratively editable field: a natural-language social object around
which people, keywords, place, discovery, and shared maintenance can assemble.
That simplicity made the digital system support real-world participation
rather than turn participation into a complex form.

This public surface is a two-page relaunch invitation, not the historic
application, complete archive, user database, or proof of current adoption.
The site currently sends `X-Robots-Tag: noindex, nofollow`, and `robots.txt`
disallows crawling. That preserves a preview boundary while Jamie decides when
the project is ready for discovery.
