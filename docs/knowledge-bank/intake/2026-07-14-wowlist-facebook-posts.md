# WOW List Facebook Post Archival Production

Run date: 2026-07-14

## Answer First

An authenticated owner-timeline pass recovered **57 unique WOW List Facebook
records** and reached Facebook's terminal cursor after 19 three-record pages.
The [public-safe census](../data/wowlist-facebook-post-census-2026-07-14.csv)
accounts for every recovered post ID:

- 35 standalone posts and 22 reshared stories;
- 22 records in 2015, 27 in 2016, seven in 2017, and one in 2018; and
- a recovered range from April 25, 2015, through March 23, 2018.

This is 100 percent of the currently surviving owner-timeline population
returned by the terminal cursor. It is not an official Meta export or proof
that no earlier record was deleted or hidden.

## Jamie's Role And Collective Credit

Jamie describes WOW List as his shared project with Richard and recalls
managing its social presence. The authenticated Page-management surface now
provides direct, bounded evidence for the Facebook portion of that memory.

Every canonical post ID received a separate publisher-attribution disposition.
Attribution was counted only when the rendered record identity matched the
requested post identity:

| Publisher disposition | Records |
| --- | ---: |
| Jamie Burkart | 51 |
| Another publisher | 0 |
| Unavailable or redirected; unresolved | 6 |
| **Total** | **57** |

The clean claim is therefore **at least 51 of the 57 surviving Facebook posts**,
not all 57 and not every social channel. “Published by” identifies the Page
publisher; it does not establish that Jamie drafted every word, originated
reshared material, or acted without collaborators. Richard's shared-project
credit remains intact.

Per-record publisher attribution and Page-management context remain protected.
The public repository retains only this aggregate.

## Distributed Use

Three records make the platform's operating model concrete:

- A [2015 members-meeting video](https://www.facebook.com/watch/?v=439926419547504)
  announced that members had introduced WOW List calendars in nine cities and
  invited people to join a nearby calendar. These were member-led city
  calendars, not official chapters.
- A [Los Angeles post](https://www.facebook.com/wowlist/posts/450622238477922)
  credited Joe Gutierrez with adding 41 upcoming DIY events to the LADIY
  calendar and connected contribution to joining the calendar and receiving a
  weekly list. This is project-account documentation, not an independent audit
  of the product database.
- A [2018 Phoenix organizer post](https://www.facebook.com/wowlist/posts/pfbid02Ao38e5ECy89isroMuqjhh62gBdutGNTkgmfYJAzPErEZi3SQ5uD2tRtv2GG8wRZWl)
  described continued WOW List use while updating PHXDIY.com. This external
  organizer context supports continuity without establishing platform-wide
  adoption.

The selected portfolio sentence uses these examples to show community
contribution and local stewardship in practice. It does not use them to prove
the separate archive-backed totals for users, events, or city ecosystems.

## Civic Routing And Care

The complete population also extends from arts-event distribution into public
gathering routes and cultural-space care. Records route people toward Women's
March and Standing Rock gatherings, post-election organizing, Ghost Ship
mutual aid and memorials, DIY-space safety resources, repair and relocation
funds, and NYC cultural-space advocacy.

One selected [Women's March record](https://www.facebook.com/wowlist/posts/616983925175085)
shows WOW List infrastructure routing people to gatherings in Washington,
D.C., and other cities. These records document distribution and amplification;
they do not make WOW List the organizer of every referenced effort or establish
attendance, endorsement, policy causality, or impact.

## Interaction Signals

Forty-seven of the 57 records retain at least one visible interaction. At
capture, record-level displays summed to 94 reactions, 16 comments, and 49
shares. The nine-city record carried the strongest individual signal: 13
reactions, three comments, and 29 shares in the population capture.

These are overlapping, mutable platform signals. They are not unique people,
reach, impressions, attendance, endorsement, adoption, or impact. They remain
knowledge-bank context rather than portfolio headline evidence.

## Method And Privacy Boundary

1. Used the authenticated owner-timeline query and followed its server cursor
   until `has_next_page: false`.
2. Deduplicated every record by numeric post ID and checked for repeated
   cursors.
3. Repeated the first query without a date ceiling; it returned the same March
   2018 newest record.
4. Classified all 57 records by year, form, primary theme, and current
   interaction signals.
5. Closely read mission-relevant posts and posted destinations while keeping
   project statements, external-organizer context, and independent reporting
   distinct.
6. Requested all 57 post identities in an authenticated Page-management view,
   counted attribution only when record identity matched, and retried blank,
   unavailable, or redirected pages in a fresh tab. Records whose identity did
   not match remained unresolved rather than inheriting attribution.
7. Retained raw responses, authentication state, full post text, comments,
   Page administration, and per-record manager attribution outside the public
   repository.

## Editorial Disposition

Selected for `/work/wowlist`:

- the distributed-use pattern across nine member-led city calendars, a
  41-event Los Angeles contribution, and later Phoenix organizer continuity;
- Jamie's publisher attribution on at least 51 surviving Facebook records,
  bounded by six unresolved records and shared-project credit.

Retained in reserve:

- the 57-record population mechanics;
- civic-routing and cultural-space-care detail; and
- mutable interaction totals.

No public Facebook archive route or public knowledge-bank route is added.

## Durable Artifacts

- Canonical model:
  `apps/www/src/data/knowledge-bank/wowlist-facebook-posts-batch-2026-07-14.ts`
- Public-safe census:
  `docs/knowledge-bank/data/wowlist-facebook-post-census-2026-07-14.csv`
- Portfolio projection: `apps/www/src/content/work/wowlist.mdx`
- Recursive hard gate: `wowlist-facebook-post-archive`
