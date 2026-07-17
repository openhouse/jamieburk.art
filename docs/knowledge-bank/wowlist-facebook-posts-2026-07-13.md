# WOW List Facebook Post Archival Production

Date: 2026-07-13

## Result

An authenticated owner-timeline review recovered 57 unique WOW List Facebook
records. Facebook's own pagination reached `has_next_page: false` after 19
three-record pages, with no repeated cursor or duplicate post ID.

The population contains:

- 35 standalone posts;
- 22 reshared stories;
- 22 records from 2015;
- 27 records from 2016;
- seven records from 2017; and
- one record from 2018.

The recovered range runs from April 25, 2015, through March 23, 2018. A second
query with no date ceiling returned the same March 2018 newest record. This
closes the current post-2018 surface as well as the backward cursor chain.

See the [57-row public-safe census](wowlist-facebook-post-census-2026-07-13.csv).

## Population Method

The ordinary interfaces were incomplete in different ways:

- the authenticated public Page initially displayed featured material and a
  small current feed window;
- the logged-out Page exposed one current public record behind a login prompt;
- Meta Business Suite's `Lifetime` content range began March 31, 2019, and
  displayed no activity; and
- the Page's year filter exposed older owner-timeline records.

The final control used the authenticated Page's
`ProfileCometTimelineFeedRefetchQuery`. The first filtered request supplied a
server cursor. Each response supplied the next cursor and a
`has_next_page` flag. The run followed that chain until Facebook returned
`false`, deduplicated by numeric post ID, checked for a repeated cursor, and
then repeated the first query without a date ceiling.

Raw responses, account tokens, full post text, comments, and administration
context remain outside the public repository in protected research storage.

## What The Full Population Adds

The archive makes the product's distributed operating model visible.

### Member-led city calendars

A [2015 announcement](https://www.facebook.com/wowlist/posts/439926419547504)
said members in nine cities had introduced WOW List community calendars and
invited people to join one near them. This is evidence of member-led city
calendars, not nine official chapters.

### Community contribution

A [Los Angeles post](https://www.facebook.com/wowlist/posts/450622238477922)
credited Joe Gutierrez with adding 41 upcoming DIY events to the LADIY
calendar. The account connected event contribution with joining the local
calendar and receiving a weekly list. The post documents a contribution
workflow and public credit; it is not an independent audit of the full event
database.

### Community-first product values

A [member reflection](https://www.facebook.com/wowlist/posts/515811585292320)
named Jamie and described sharing, community, and making it easier for people
to gather as central to the product's structure. It helps explain why the
platform used open contribution and followable community surfaces. It does not
make Jamie the sole designer, operator, or author of the shared Page.

### External continuity

The newest recovered record is a
[2018 Phoenix organizer post](https://www.facebook.com/wowlist/posts/pfbid02Ao38e5ECy89isroMuqjhh62gBdutGNTkgmfYJAzPErEZi3SQ5uD2tRtv2GG8wRZWl)
describing WOW List use while updating PHXDIY.com. This is useful external
corroboration that the community-calendar route remained in use beyond the
first launch period.

## Civic Routing And Care

The account also shows the event-distribution model extending into civic
gathering routes and cultural-space care. Recovered records link to:

- Women's March gatherings in Washington, D.C., and cities across the country;
- Standing Rock actions and `WaterIsLife` events;
- popular-vote and post-election organizing calendars;
- Ghost Ship victim funds, vigils, and safer-space resources;
- DIY-space repair, relocation, and support funds; and
- NYC cultural-space advocacy through the emerging NYC Artist Coalition.

These records show routing and amplification. They do not establish that WOW
List organized every referenced effort, that Jamie authored each post, or that
publication caused attendance or policy outcomes.

## Interaction Signals

Forty-seven of the 57 records retain at least one currently visible reaction,
comment, or share. Across the recovered records, the current display contains:

- 94 reactions;
- 16 comments; and
- 49 shares.

The nine-city calendar announcement carries the strongest individual signal:
13 reactions, three comments, and 29 shares.

These are overlapping, mutable platform signals. They may be summarized as
record-level interactions, but never as unique people, reach, impressions,
attendance, endorsement, adoption, or impact.

## Jamie's Role And Collective Credit

Jamie confirms that WOW List was a shared project with Richard and recalls
managing the project's social presence. The Facebook corpus records the Page
identity as WOW List; it does not expose the individual administrator who
wrote or published each record.

The knowledge bank therefore retains two different statements:

- **Ready:** Jamie co-built WOW List and established its public account and
  identity; the Page became a distribution, support, and documentation
  surface for the project.
- **Research needed:** Jamie managed all of WOW List's social presence.

The stronger individual-management attribution should wait for collaborator
confirmation or account-level authorship records. That hold protects Richard's
shared project credit without minimizing Jamie's established contribution.

## Public-Safety Boundary

The public repository includes one metadata row for each organizational Page
record because the source surface is public and professional. It excludes:

- raw authenticated responses and request tokens;
- full post and reshared-story text;
- comment identities and comment text;
- account-administration and Page-role context;
- private analytics and audience data;
- media not separately reviewed for rights and context; and
- any inference about the person who pressed `Post`.

## Editorial Disposition

The case study gains one sentence about distributed use: nine member-led city
calendars, a 41-event Los Angeles contribution, and later Phoenix organizer
continuity. The full population count, civic-routing analysis, interaction
signals, and sole-management research hold remain in the knowledge bank.

There is no public Facebook archive route and no public knowledge-bank route.

## Next Research

1. Ask Richard to confirm or refine Jamie's social-presence role and the
   division of labor.
2. Request a Meta Page export if it can recover deleted, hidden, or
   administrator-attributed records absent from the current timeline.
3. Preserve selected post screenshots only after an image-rights and comment-
   identity review.
4. Use the city, organizer, and route records as leads for independent public
   corroboration rather than treating the Page as the last word.
