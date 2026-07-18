# CallNYC citational record

**Reviewed:** 2026-07-15

**Public surface:** `/work/callnyc`

The canonical machine-readable record is
`apps/www/src/data/knowledge-bank/records.ts`. This note explains the research
context and editorial boundaries; it is not a competing source of truth.

## Corrected chronology

- **2015:** Council 2.0 established policy context for open Council data,
  civic-technology collaboration, and user-centered experimentation.
- **January 30, 2016:** the New York City Council held a 1-3 p.m.
  constituent-services hackathon at Civic Hall.
- **Early March 2016:** the fuller CouncilStat constituent-services data became
  available.
- **March 2016:** Jamie independently developed CallNYC.org as a public-facing
  interpretation of those records.
- **March 14, 2016:** Politico New York published coverage of CallNYC and the
  CouncilStat release.

This portfolio presents CallNYC as historical evidence of Jamie's independently
developed prototype. It makes no claim of official Council status, a documented
formal submission, or a win. Historical categories, officeholders, statistics,
and contact details are not current guidance.

## Source inventory

- Civic Hall announcement and its archived embedded-social-feed context.
- New York City Council event-day CouncilStat post.
- New York City Council Hackathon promotional graphic.
- Politico New York coverage dated March 14, 2016.
- Public CallNYC GitHub repository.
- Authenticated item-level `@CallNYCapp` corpus and derivation manifest.
- Public Council-member repost, reply, quote-post, and authored-post records.
- Participant photograph metadata held outside the public projection.
- Documented Civic Hall Wayback/CDX research run held outside the app build.

The Wayback capture preserves embedded social posts. It is not a recovered
Civic Hall calendar listing or dedicated event-detail page.

## Full recoverable social population

The authenticated profile reported 110 posts. Repeated replies-inclusive
timeline passes recovered 107 distinct items: 92 authored posts and 15 reposts,
spanning March 5 through November 14, 2016. The corpus inventories 100% of
those 107 recoverable items. It does not relabel them as 100% of the
profile-reported 110.

The three-count difference remains unresolved. The authenticated from-account
search returned only a 47-post subset; the media surface and a bounded Wayback
status query added no missing status URL. Possible explanations include
unavailable authored posts, removed reposts, or platform-count residue. The
evidence does not choose among them.

The committed provenance chain includes:

- `docs/knowledge-bank/corpora/source-captures/callnyc-x-browser-extraction-2026-07-15-utc.json`;
- `docs/knowledge-bank/corpora/callnyc-x-full-population-2026-07-14.json`;
- `docs/knowledge-bank/corpora/callnyc-x-full-population-2026-07-14.manifest.json`;
- `scripts/derive-callnyc-x-corpus.mjs`.

The derivation script verifies the raw-capture digest, reproduces all 107 item
records, and recomputes the aggregate findings.

## Communication and response patterns

The recoverable population contains:

- 71 service-recognition posts naming 26 Council members;
- 82 authored posts mentioning `@NYCCouncil`;
- 87 of 92 authored posts carrying outgoing links;
- 85 CallNYC link occurrences resolving to 63 normalized destinations and 61
  issue pages;
- 75 authored posts with visible media.

That is the project's outbound communication system. A separate authenticated
response audit recovered attributable public interactions from at least 20
serving Council-member accounts: 19 identities in public repost lists plus
Ydanis Rodriguez's separate quote post. Eight members authored posts or replies
involving CallNYC. Twenty is a lower bound, not a lifetime denominator, and
engagement does not establish endorsement, adoption, or official City status.

## Product decisions and posted sources

Politico's contemporaneous reporting attributes several concrete decisions to
Jamie: limiting records to entries with a borough to reduce out-of-city queries
and spam; adding Council-member Twitter contacts after conversations showed
that some people were wary of calling; and designing for social sharing and
search discovery around resident issue queries. An April 20 account post also
documents a JSON interface for retrieving Council-member Twitter usernames.

Across the recoverable population, 98 outgoing-link occurrences used 84
distinct short URLs. Eighty-five occurrences pointed to CallNYC. The 13
external occurrences connected the project to:

- Politico's independent CallNYC coverage;
- Gizmodo reporting on the peer Renter Be Aware civic-data project;
- Gothamist transportation reporting;
- City Rent Freeze and homelessness-prevention resources;
- a SCRIE explainer;
- Civic Hall, BetaNYC, Council Labs, NYC Technology Working Group, and 311Buddy;
- adjacent WOW List and popular.vote organizing infrastructure.

These links document resource curation and the contemporaneous civic-technology
ecosystem. They do not transfer peer-project authorship or outcomes to Jamie,
and historical benefits or legal-services links are not current guidance.

## Dated visible traction

On July 14, 2026, 59 of 92 authored posts retained at least one visible reply,
repost, or like. Authored-post totals were eight replies, 74 reposts, and 111
likes. Reposted items and the original posts' metrics are excluded. These are
dated public labels, not complete lifetime analytics, resident outcomes, or
policy impact, so they remain in the deeper bank rather than headline copy.

## Account stewardship

A March 16, 2016 reply from `@CallNYCapp` identifies the speaker as Jamie
Burkart and calls CallNYC his first civic-technology project. This directly
supports Jamie's launch-period use and stewardship of the account. It does not
prove sole account creation or authorship of every later post.

## Bounded research finding

The deeper Civic Hall review examined:

- 4,630 deduplicated HTML captures;
- 1,240 original URLs;
- 296 distinct event-prefix URL keys;
- 215 successful event pages;
- 74 redirects;
- 7 captured 404s.

No CouncilStat, constituent-services, or NYC Council event slug was recovered.
No dedicated Civic Hall listing or event-detail page was recovered. This is not
proof that no page ever existed. Google Form contents, agenda, breakout roster,
registration contents, and a complete participant list were not recovered.

## Corrections

The correction registry preserves three active decisions:

- project chronology: `2014-2015` to `2016`;
- event superlative: `first civic-data hackathon` to
  `first CouncilStat hackathon`;
- event hours: a limited participant-photo timestamp inference to the direct
  Civic Hall announcement of `1-3 p.m.`

The approved resume wording is:

> Built CallNYC.org as an independent follow-on to the New York City Council's
> first CouncilStat hackathon, translating constituent-services data into
> resident-facing issue pages and next-step guidance; covered in Politico New
> York.

## Digital District photograph

The canonical registry stores a safe description and opaque locator only. The
image shows a placard reading "Digital District - Help improve City Council
District office operations." It supports that visible wording and a
collaborative breakout-table context. It does not establish the event title,
agenda, facilitator, event time, or the identity and consent status of everyone
depicted.

Rights require permission, consent requires review, and public display remains
on hold. The photograph is not committed or rendered.
