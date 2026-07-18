const reviewedAt = "2026-07-15";
const reportPath =
  "docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14.md";

const selectedEvents = [
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006",
    title: "Musicians for a Semantic Web",
    publishedAt: "2006-12-02",
    eventId: "10153308288768593",
    form: "networked culture and collaborative discussion"
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007",
    title: "Pirate Trolley-In!!",
    publishedAt: "2007-01-06",
    eventId: "10155459481930035",
    form: "participatory public history around Kansas City's 8th Street Tunnel"
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-MICROPOP-2007",
    title: "Micropop: Nation-Scenes",
    publishedAt: "2007-01-25",
    eventId: "10153329249353169",
    form: "a networked-culture discussion with public research routes"
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007",
    title: "Release Yourself onto the Water Until it Tastes of Salt",
    publishedAt: "2007-07-14",
    eventId: "10153218027900549",
    form: "a participatory found-material, bicycle-powered river journey"
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-2010",
    title: "The Night Walk with Jamie Burkart",
    publishedAt: "2010-04-17",
    eventId: "1090550714295009",
    form: "walking as a structure for shared attention to place"
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
    title: "SUNDAY DINNER Turns 100!",
    publishedAt: "2014-03-09",
    eventId: "702417306475691",
    form: "the longevity of a recurring participatory hospitality format"
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-2014",
    title: "Sunday Dinner: Mid-Manhattan / Roosevelt Island (NYC Week 5)",
    publishedAt: "2014-11-23",
    eventId: "653082538122515",
    form: "an eight-week city rotation with a changing host place"
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017",
    title: "Why I March: Sunday Dinner Potluck, Sign Making, Costumes!",
    publishedAt: "2017-01-15",
    eventId: "1416424718368443",
    form: "hospitality joined to civic discussion and public sign making"
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-2017",
    title: "Movie Club: HyperNormalisation BBC Doc / Brexit, Trump & Syria",
    publishedAt: "2017-02-01",
    eventId: "278687849214415",
    form: "a documentary screening structured for collective civic learning"
  }
] as const;

const selectedEventSourceIds = selectedEvents.map((event) => event.id);
const selectedEventObservationIds = selectedEvents.map((event) =>
  `OBS-${event.id.slice(4)}`
);

const selectedEventSources = selectedEvents.map((event) => ({
  id: event.id,
  title: event.title,
  kind: "public-social-post" as const,
  visibility: "public" as const,
  preservationStatus: "live" as const,
  publishedAt: event.publishedAt,
  accessedAt: reviewedAt,
  canonicalUrl: `https://www.facebook.com/events/${event.eventId}/`,
  preferredPublicUrl: "canonical" as const,
  publicCitation: `'${event.title},' Facebook event page displaying the label 'Event by Jamie Burkart' (${event.publishedAt}).`,
  publicNote: `The public event page preserves ${event.form}. The displayed host label is a bounded platform attribution, not sole-production metadata.`,
  supportsGenerally: [
    event.form,
    "the literal displayed Event by Jamie Burkart label"
  ],
  doesNotEstablish: [
    "sole authorship or production responsibility",
    "attendance, unique reach, endorsement, causality, or impact",
    "the complete collaborator, performer, venue, or participant roster"
  ]
}));

const routeSourceIds = [
  "SRC-MICROPOP-POSTED-IMAGINED-COMMUNITIES",
  "SRC-MICROPOP-POSTED-LASTFM-FAN-GRAPH",
  "SRC-MICROPOP-POSTED-KCDIY"
] as const;

const baseObservationIds = [
  "OBS-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION",
  "OBS-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION",
  "OBS-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE",
  "OBS-JAMIE-FACEBOOK-EVENT-NUMERIC-DISPLAY-QUALITY",
  "OBS-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL",
  "OBS-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED",
  "OBS-KCUR-EIGHTH-STREET-TUNNEL-PUBLIC-HISTORY"
] as const;

export const personalWowlistFacebookEventAudit = {
  personalPastEventIds: 502,
  independentExactSetMatches: 2,
  personalHostedEventIds: 21,
  overlap: 18,
  distinctIdsAcrossBothTabs: 505,
  displayedJamieHostCards: 20,
  displayedOtherHostCards: 482,
  wowlistCurrentDisplayedEvents: 0,
  selectedPublicEventSources: selectedEvents.length
} as const;

export const personalWowlistFacebookEvents = {
  intakeItems: [
    {
      id: "INTAKE-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026",
      kind: "public-artifact",
      title: "Personal and WOW List Facebook event populations",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated archival review",
      projectIds: ["participatory-public-practice", "wowlist"],
      reason:
        "Account for every current event slot, preserve professionally relevant public event records as historical plot points, and keep association, displayed host attribution, attendance, authorship, and impact distinct.",
      sourceUrl: "https://www.facebook.com/jburkart/events/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
        "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
        "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
        "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
        "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15",
        ...selectedEventSourceIds,
        ...routeSourceIds
      ],
      observationIds: [...baseObservationIds, ...selectedEventObservationIds],
      researchInquiryIds: [
        "INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026",
        "INQ-WOWLIST-FACEBOOK-EVENTS-2026"
      ],
      boundaries: [
        "The 502-record profile surface is an association graph, not a claim of attendance, endorsement, production, or professional relevance.",
        "Facebook's hosted-events tab and displayed host labels are platform classifications, not sole-authorship metadata.",
        "The repository retains aggregate accounting and selected public professional sources, not the personal association ledger, guest context, exact private locations, raw descriptions, comments, or browser state.",
        "A current zero display and bounded historical non-recovery for WOW List do not establish historical nonexistence."
      ]
    },
    {
      id: "INTAKE-MICROPOP-POSTED-DESTINATIONS-2026",
      kind: "public-url",
      title: "Micropop event source routes",
      submittedAt: reviewedAt,
      submittedBy: "Codex close reading of Jamie's public Facebook event",
      projectIds: ["participatory-public-practice"],
      reason:
        "Preserve three public destinations from the 2007 event description as research routes with separate access states and support boundaries.",
      sourceUrl: "https://www.facebook.com/events/10153329249353169/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [...routeSourceIds],
      observationIds: ["OBS-MICROPOP-POSTED-DESTINATIONS"],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      boundaries: [
        "A posted destination establishes routing, not authorship, endorsement, readership, attendance, conversion, reach, or impact.",
        "Dead or unresolved destinations remain historical leads until archived content is recovered and close-read."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION",
      intakeId: "INTAKE-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
      project: "participatory-public-practice",
      kind: "source-fact",
      text:
        "Three authenticated terminal traversals across July 14-15 resolved the same 502 event IDs on Jamie's personal Past events surface; 20 cards displayed Jamie as host and 482 displayed another host.",
      locator: "Authenticated Past events terminal-scroll control and exact ID-set comparison",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026"],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      limitations: [
        "Association does not establish attendance, endorsement, participation, production, authorship, or professional significance.",
        "The current interface is not a native Meta export and cannot expose deleted or hidden historical records."
      ]
    },
    {
      id: "OBS-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION",
      intakeId: "INTAKE-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
      project: "participatory-public-practice",
      kind: "source-fact",
      text:
        "The separate hosted-events control again recovered all 21 records on July 15; 18 overlap the 502-record profile surface, producing 505 distinct current IDs across the two tabs.",
      locator: "Your hosted events, Past tab, terminal-scroll reconciliation",
      status: "verified",
      publicSafe: true,
      claimIds: [
        "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
        "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      limitations: [
        "Hosted-tab membership does not explain authorship, co-hosting, administration, or production responsibility.",
        "Five of the 21 cards display another host."
      ]
    },
    {
      id: "OBS-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE",
      intakeId: "INTAKE-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
      project: "participatory-public-practice",
      kind: "context",
      text:
        "Twenty cards from 2006 through 2017 display 'Event by Jamie Burkart' and form a recurring practice across cultural production, hospitality and care, participatory place and water work, civic learning and making, and networked public culture.",
      locator: "Aggregate 20-row displayed-host census and selected public event pages",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017"],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      limitations: [
        "The five forms are interpretive classifications rather than mutually exclusive truths.",
        "Displayed host attribution does not erase collaborators, performers, venues, or participants."
      ]
    },
    {
      id: "OBS-JAMIE-FACEBOOK-EVENT-NUMERIC-DISPLAY-QUALITY",
      intakeId: "INTAKE-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
      project: "participatory-public-practice",
      kind: "limitation",
      text:
        "Mutable numeric event-page displays appeared inconsistently across authenticated renders and did not consistently expose a semantic label in accessible text.",
      locator: "Two authenticated event-page detail runs",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017"],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      limitations: [
        "The values must not be summed or described as unique people, attendance, reach, endorsement, causality, or impact."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL",
      intakeId: "INTAKE-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      project: "wowlist",
      kind: "source-fact",
      text:
        "While authenticated and acting as the WOW List Page on July 15, 2026, the events surface displayed 'No events to show' and exposed zero numeric event records.",
      locator: "WOW List Page, Events tab",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENTS-2026"],
      limitations: [
        "A current zero display does not establish that WOW List never created, co-hosted, shared, or used a Facebook event."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED",
      intakeId: "INTAKE-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
      project: "wowlist",
      kind: "limitation",
      text:
        "A bounded Facebook, personal-control, and Wayback search recovered no historical WOW List Facebook event record.",
      locator: "Documented bounded recovery run",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED-2026"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENTS-2026"],
      limitations: [
        "Not recovered does not mean did not exist.",
        "Deleted, hidden, renamed, co-hosted, or other-account records may not appear in the tested surfaces."
      ]
    },
    {
      id: "OBS-MICROPOP-POSTED-DESTINATIONS",
      intakeId: "INTAKE-MICROPOP-POSTED-DESTINATIONS-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-EVENT-MICROPOP-2007",
      project: "participatory-public-practice",
      kind: "research-lead",
      text:
        "The Micropop event description routed readers toward Imagined Communities, a Last.fm fan graph, and KCDIY.org.",
      locator: "Public event description, posted destinations",
      status: "verified",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      limitations: [
        "The posted links do not establish authorship, endorsement, readership, attendance, conversion, reach, or impact."
      ]
    },
    {
      id: "OBS-KCUR-EIGHTH-STREET-TUNNEL-PUBLIC-HISTORY",
      intakeId: "INTAKE-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026",
      sourceId: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15",
      project: "participatory-public-practice",
      kind: "source-fact",
      text:
        "KCUR independently reported Jamie's 2006 scavenger-hunt-led film screening in Kansas City's 8th Street Tunnel and his argument for future educational access.",
      locator: "Article body",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017"],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      limitations: [
        "The retrospective does not establish official authorization, current access conditions, or a complete participant roster."
      ]
    },
    ...selectedEvents.map((event) => ({
      id: `OBS-${event.id.slice(4)}`,
      intakeId: "INTAKE-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026",
      sourceId: event.id,
      project: "participatory-public-practice",
      kind: "source-fact" as const,
      text: `The public '${event.title}' page preserves ${event.form}.`,
      locator: "Public event title, date, displayed host label, and description",
      status: "verified" as const,
      publicSafe: true,
      claimIds: ["CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017"],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      limitations: [
        "The displayed host label does not establish sole authorship or production.",
        "The page does not establish attendance, unique reach, endorsement, causality, or impact."
      ]
    }))
  ],
  sources: [
    {
      id: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
      title: "Jamie Burkart Facebook Past events surface",
      organization: "Facebook",
      kind: "public-social-post",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/jburkart/events/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Jamie Burkart Facebook Past events surface, authenticated terminal-scroll review, July 14-15, 2026.",
      publicNote:
        "Three terminal traversals resolved the same 502 event IDs. Twenty cards displayed Jamie as host and 482 displayed another host.",
      supportsGenerally: [
        "502 distinct current profile event associations",
        "two independent exact ID-set matches",
        "20 displayed Jamie-host cards and 482 displayed other-host cards"
      ],
      doesNotEstablish: [
        "attendance, endorsement, participation, production, authorship, or professional significance",
        "a native Meta export or complete deleted-event history"
      ]
    },
    {
      id: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
      title: "Jamie Burkart Facebook event-association population run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-15",
      accessedAt: reviewedAt,
      publicCitation:
        "Public-safe aggregate metadata for three authenticated full-scroll controls over Jamie Burkart's current Facebook event associations.",
      publicNote:
        "The repository retains aggregate accounting only; the 502 record-level associations and personal relationship context remain protected.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-EVENT-ASSOCIATIONS-2026-001",
      supportsGenerally: [
        "502 current IDs and exact agreement across three traversals",
        "aggregate host-label and year accounting"
      ],
      doesNotEstablish: [
        "attendance, endorsement, participation, production, or authorship",
        "professional significance of every association",
        "a native platform export or deletion history"
      ]
    },
    {
      id: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
      title: "Jamie Burkart Facebook hosted-events population run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-15",
      accessedAt: reviewedAt,
      publicCitation:
        "Public-safe aggregate metadata for authenticated terminal traversals of Jamie Burkart's Facebook hosted-events control.",
      publicNote:
        "All 21 hosted-tab records were recovered on July 14 and independently reverified on July 15; 18 overlap the profile surface, yielding 505 distinct current IDs.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001",
      supportsGenerally: [
        "21 hosted-tab records",
        "18 overlaps and a 505-ID union",
        "16 displayed Jamie-host cards and five displayed other-host cards"
      ],
      doesNotEstablish: [
        "why Facebook classified each record as hosted",
        "sole production, authorship, attendance, reach, causality, or impact"
      ]
    },
    {
      id: "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
      title: "Jamie Burkart Facebook displayed-host practice accounting run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14",
      accessedAt: reviewedAt,
      publicCitation:
        "Public-safe aggregate metadata for a review of 20 Past events cards displaying 'Event by Jamie Burkart'.",
      publicNote:
        "The repository retains an anonymous 20-row census, selected public event pages, and five bounded interpretive practice forms.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-2026-001",
      supportsGenerally: [
        "20 displayed-host cards spanning 2006 through 2017",
        "five primary practice-form counts",
        "selected professionally relevant event pages"
      ],
      doesNotEstablish: [
        "sole authorship or production of every event",
        "attendance, unique reach, endorsement, causality, or impact",
        "a complete collaborator, participant, or venue history"
      ]
    },
    {
      id: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      title: "WOW List Facebook events surface",
      organization: "WOW List",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/wowlist/events",
      preferredPublicUrl: "canonical",
      publicCitation:
        "WOW List Facebook events surface, authenticated Page-context review, July 15, 2026.",
      publicNote:
        "While acting as WOW List, the current surface displayed 'No events to show' and exposed zero numeric event records.",
      supportsGenerally: ["the current zero-record display"],
      doesNotEstablish: [
        "that WOW List never created, co-hosted, shared, or used a Facebook event",
        "the activity or impact of WOW List's own event-sharing platform"
      ]
    },
    {
      id: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
      title: "WOW List Facebook historical-event recovery run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14",
      accessedAt: reviewedAt,
      publicCitation:
        "Public-safe method summary for a bounded Facebook, personal-control, and Wayback search for historical WOW List Facebook events.",
      publicNote:
        "No historical record was recovered. The result is non-recovery, not proof of nonexistence.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001",
      supportsGenerally: ["a bounded historical non-recovery"],
      doesNotEstablish: [
        "that no WOW List Facebook event ever existed",
        "that deleted, hidden, renamed, co-hosted, or other-account records were absent"
      ]
    },
    {
      id: "SRC-MICROPOP-POSTED-IMAGINED-COMMUNITIES",
      title: "Imagined Communities posted destination",
      organization: "Wikipedia",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://en.wikipedia.org/wiki/Imagined_Communities",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Wikipedia, 'Imagined Communities,' a destination posted in the 2007 Micropop event description.",
      publicNote:
        "The destination remained live during review. Its contents are not independent evidence of the event's purpose or participant use.",
      supportsGenerally: ["a public research destination posted by the Micropop event"],
      doesNotEstablish: [
        "Jamie's authorship of the destination",
        "participant readership, endorsement, attendance, conversion, reach, or impact"
      ]
    },
    {
      id: "SRC-MICROPOP-POSTED-LASTFM-FAN-GRAPH",
      title: "Soophie Nun Squad Last.fm fan-graph posted destination",
      organization: "Last.fm",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "dead",
      accessedAt: reviewedAt,
      canonicalUrl: "http://www.last.fm/music/Soophie+Nun+Squad/+fans",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Last.fm Soophie Nun Squad fan-graph URL posted in the 2007 Micropop event description.",
      publicNote:
        "The exact route returned a current 404 and is retained as a historical research lead, not recovered destination content.",
      supportsGenerally: ["a historical public route posted by the Micropop event"],
      doesNotEstablish: [
        "the route's 2007 content",
        "participant readership, endorsement, attendance, conversion, reach, or impact"
      ]
    },
    {
      id: "SRC-MICROPOP-POSTED-KCDIY",
      title: "KCDIY.org posted destination",
      organization: "KCDIY.org",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "dead",
      accessedAt: reviewedAt,
      canonicalUrl: "http://kcdiy.org/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "KCDIY.org, a destination posted in the 2007 Micropop event description.",
      publicNote:
        "The exact domain did not resolve during review and is retained as a historical research lead, not recovered destination content.",
      supportsGenerally: ["a historical public route posted by the Micropop event"],
      doesNotEstablish: [
        "the domain's 2007 content",
        "participant readership, endorsement, attendance, conversion, reach, or impact"
      ]
    },
    {
      id: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15",
      title:
        "The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In",
      organization: "KCUR 89.3",
      author: "Cody Newill",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-09-15",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
      publicNote:
        "The independent retrospective documents Jamie's 2006 public-history program and his stated interest in future educational access to the tunnel.",
      supportsGenerally: [
        "Jamie led participants through a downtown scavenger-hunt format",
        "Jamie hosted a three-film screening in the tunnel in 2006",
        "the program connected art, transit history, and shared-space advocacy"
      ],
      doesNotEstablish: [
        "official authorization for the event",
        "ownership or control of the tunnel",
        "current safety or access conditions",
        "a complete participant roster"
      ]
    },
    ...selectedEventSources
  ],
  claims: [
    {
      id: "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
      project: "participatory-public-practice",
      internalClaim:
        "Three authenticated traversals returned the same 502 IDs on Jamie's personal Past events surface; the hosted-events tab returned 21 records, 18 overlapping, for 505 distinct current IDs across both tabs.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The current personal event controls are fully accounted for: 502 Past events IDs and 21 hosted-tab IDs, with 18 overlaps and 505 distinct IDs. Platform association is not attendance, endorsement, authorship, production, or professional relevance.",
          status: "active",
          citationRequired: false,
          surfaces: [reportPath]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
          relationship: "direct-support",
          supports: ["the 502-ID current control and exact repeated set matches"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
          relationship: "direct-support",
          supports: ["the 21 hosted-tab records, 18 overlaps, and 505-ID union"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Association does not establish attendance, endorsement, participation, production, authorship, or professional significance.",
        "The current interface is not a native Meta export and cannot expose deleted or hidden historical records."
      ],
      antiClaims: [
        "Jamie attended or produced all 505 events",
        "The current controls are every event ever associated with Jamie",
        "Displayed host clusters measure stakeholder engagement with Jamie"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
      project: "participatory-public-practice",
      internalClaim:
        "The hosted-events census recovered all 21 current records: 16 display Jamie as host, five display another host, and 18 overlap the profile surface.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Facebook's hosted-events tab contains 21 recovered current records: 16 display Jamie as host, five display another host, and 18 overlap the profile surface.",
          status: "active",
          citationRequired: false,
          surfaces: [reportPath]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
          relationship: "direct-support",
          supports: ["all 21 records and their reconciliation with the profile surface"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Hosted-tab membership and displayed host labels do not establish sole authorship or production.",
        "Complete current accounting does not mean every historical event page was recovered."
      ],
      antiClaims: [
        "All 21 events were solely produced by Jamie",
        "The hosted tab is a native authorship ledger",
        "The current control represents every event Jamie ever hosted"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
      project: "participatory-public-practice",
      internalClaim:
        "Twenty current event cards from 2006 through 2017 display 'Event by Jamie Burkart' and document recurring structures for cultural production, hospitality and care, participatory place and water work, civic learning and making, and networked public culture.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Twenty current event cards from 2006 through 2017 display Jamie as host and preserve a recurring event-making practice across cultural production, hospitality, place-based participation, civic learning, and networked public culture.",
          status: "active",
          citationRequired: false,
          surfaces: [reportPath]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
          relationship: "direct-support",
          supports: ["the complete displayed-host population and five-form classification"],
          confidence: "high",
          renderCitation: false
        },
        ...selectedEvents.map((event) => ({
          sourceId: event.id,
          relationship: "direct-support" as const,
          supports: [event.form],
          confidence: "high" as const,
          renderCitation: false
        })),
        {
          sourceId: "SRC-WATERWAYS-PITCH-2007-08-09",
          relationship: "corroborating",
          supports: ["the raft expedition's participatory context"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15",
          relationship: "corroborating",
          supports: ["the 8th Street Tunnel public-history program"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Displayed host attribution is bounded platform metadata, not sole-production credit.",
        "The five forms are interpretive classifications and do not erase collaborators, performers, venues, or participants.",
        "Mutable numeric displays are not attendance, unique reach, endorsement, causality, or impact."
      ],
      antiClaims: [
        "Jamie alone produced every recovered event",
        "All 502 associated events were Jamie's projects",
        "Facebook event-page values measure attendance or impact"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      project: "wowlist",
      internalClaim:
        "WOW List's current Facebook event surface displayed zero event records on July 15, 2026.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The current WOW List Facebook event surface displayed zero records in the authenticated July 2026 control.",
          status: "active",
          citationRequired: false,
          surfaces: [reportPath]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
          relationship: "direct-support",
          supports: ["the current zero-record display"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "A current zero display does not establish that WOW List never created or used Facebook events.",
        "The finding does not characterize WOW List's own platform, public posts, organizer use, or community activity."
      ],
      antiClaims: [
        "WOW List never had a Facebook event",
        "WOW List had no event community",
        "The Facebook control measures WOW List's own platform activity"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENTS-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED-2026",
      project: "wowlist",
      internalClaim:
        "No historical WOW List Facebook event record was recovered from the bounded July 2026 search.",
      status: "not-recovered",
      projections: [
        {
          key: "archive-note",
          text:
            "A bounded historical search recovered no WOW List Facebook event record. This is a negative search result, not a historical conclusion.",
          status: "active",
          citationRequired: false,
          surfaces: [reportPath]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
          relationship: "supports-boundary",
          supports: ["the bounded historical non-recovery"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "No record recovered does not establish that no event ever existed.",
        "Deleted, hidden, renamed, co-hosted, or other-account records may not appear in the tested surfaces."
      ],
      antiClaims: [
        "WOW List never had a Facebook event",
        "WOW List had no event community",
        "The bounded search is a complete platform export"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENTS-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-JAMIE-FACEBOOK-EVENT-PRACTICE-2026",
      project: "participatory-public-practice",
      question:
        "What can the complete current personal event controls establish about Jamie's event-making practice without exposing personal relationships or converting platform association into attendance?",
      methods: [
        "Terminal-scrolled Jamie's authenticated Past events surface to 12 stable passes and deduplicated every numeric event ID.",
        "Compared the July 15 set against two independent July 14 traversals and obtained the same 502-ID set with no additions or omissions.",
        "Terminal-scrolled the separate hosted-events Past tab and reverified all 21 prior control records.",
        "Reconciled 18 overlaps and 505 distinct IDs across both tabs.",
        "Separated aggregate host labels, close-read the complete 20-card displayed-Jamie subset, selected professionally relevant public pages, and kept the wider personal association graph protected.",
        "Routed posted URLs and independent source articles into separate governed source records."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Three traversals returned the same 502 distinct profile-event IDs.",
        "Twenty profile cards display Jamie as host and 482 display another host; the separate hosted tab contains 21 recovered records.",
        "Eighteen hosted-tab records overlap the profile surface, producing 505 distinct current IDs.",
        "The 20 displayed-Jamie cards span 2006 through 2017 and support five bounded practice-form classifications.",
        "Nine selected event pages preserve mission-relevant historical plot points; Micropop adds three posted research routes; KCUR independently corroborates the tunnel public-history program."
      ],
      limitations: [
        "The authenticated interface is not a native Meta export.",
        "Current controls cannot reveal deleted or hidden historical records.",
        "Platform association and displayed host labels do not establish attendance, sole authorship, sole production, or impact.",
        "Raw association rows, guest identities, relationship context, exact private locations, comments, and browser state remain outside the public repository."
      ],
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
        "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
        "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
        "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
        "SRC-WATERWAYS-PITCH-2007-08-09",
        "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15",
        ...selectedEventSourceIds,
        ...routeSourceIds
      ],
      publicSummary:
        "The current personal event controls are fully accounted for at 502 profile IDs and 21 hosted-tab IDs, with 18 overlaps and 505 distinct records. Twenty profile cards display Jamie as host and preserve a recurring public event-making practice, without converting the wider association graph or mutable platform displays into professional proof.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001"
    },
    {
      id: "INQ-WOWLIST-FACEBOOK-EVENTS-2026",
      project: "wowlist",
      question:
        "Can any current or historical WOW List Facebook event record be recovered without confusing non-recovery with nonexistence?",
      methods: [
        "Switched the authenticated Facebook identity into WOW List Page context and inspected the complete current event surface.",
        "Confirmed 'No events to show' and zero numeric event records on July 15, 2026.",
        "Checked Facebook search, the 502-record personal control, and bounded Wayback URL patterns.",
        "Recorded zero and timeout dispositions without inferring historical nonexistence."
      ],
      runAt: reviewedAt,
      resultStatus: "not-recovered",
      findings: [
        "The current WOW List Page event surface displayed zero records.",
        "The personal event control exposed zero WOW List title or displayed-host matches.",
        "The bounded historical recovery pass returned no event record."
      ],
      limitations: [
        "Current zero display and bounded historical non-recovery do not establish that no WOW List Facebook event ever existed.",
        "Deleted, hidden, renamed, co-hosted, or other-account records may not appear in the tested surfaces.",
        "The control says nothing about WOW List's own platform events, public posts, organizer use, or community activity."
      ],
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026"
      ],
      publicSummary:
        "The current WOW List Facebook event surface displayed zero records, and a bounded historical search recovered none. The result is non-recovery, not proof of nonexistence.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001"
    }
  ]
};
