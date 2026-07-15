import type { KnowledgeBank } from "./schema.ts";

const projectId = "nyc-artist-coalition";
const reportUrl =
  "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md";

export const nycacFacebookEventSourceIds = {
  surface: "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026-07-15",
  census: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026-07-15",
  protectedResearch: "SRC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026-07-15",
  firsthandRole: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026-07-15",
  nyPostFootloose: "SRC-NYCAC-NYPOST-FOOTLOOSE-2017-04-08",
  gothamistCommercialRent:
    "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-2019-11-06",
} as const;

export const nycacFacebookEventClaimIds = {
  population: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
  participationSystem: "CLM-NYCAC-PARTICIPATION-SYSTEM",
  responseSignals: "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
  democraticPractice: "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE",
} as const;

export const nycacFacebookEventReviewSummary = {
  displayedControlSlots: 34,
  recoveredIndexEvents: 33,
  recoveredDetailEvents: 33,
  unresolvedControlSlots: 1,
  directNycacOrganizerCards: 24,
  alliedOrCohostedCards: 9,
  recoveredYears: { 2017: 17, 2018: 3, 2019: 6, 2020: 6, 2021: 1 },
  recurringMeetingRecords: 12,
  namedPhysicalMeetingVenues: 10,
  virtualMeetingRecords: 2,
  culturalOrCommunitySpaceEvents: 15,
  governmentVenueEvents: 9,
  participatoryConveningEvents: 29,
  governmentInterfaceEvents: 15,
  eventsWithDisplayedResponses: 32,
  responseDisplaysAtLeast100: 19,
  responseDisplaysAtLeast500: 7,
  responseDisplaysAtLeast1000: 3,
  postedSourceArticles: 7,
  protectedOutboundLinkOccurrences: 13,
} as const;

export const nycacRecurringMeetingEventIds = [
  "406505576359490",
  "1833265643557435",
  "212427345900529",
  "835861356564686",
  "107158013279474",
  "144317939631393",
  "383292402137451",
  "468698540318956",
  "149896349250651",
  "373845436658926",
  "1371973329662017",
  "772824526895291",
] as const;

export const nycacPhysicalMeetingVenues = [
  "Magick City",
  "The Floasis",
  "Muchmore's",
  "The City Reliquary",
  "Shoestring Press",
  "Chinatown Soup",
  "Secret Project Robot",
  "Friends and Lovers",
  "Flowers for all Occasions",
  "Ode to Babel",
] as const;

export const nycacFacebookEventArticleSourceIds = [
  nycacFacebookEventSourceIds.nyPostFootloose,
  "SRC-WNYC-CABARET-LAW-2017",
  "SRC-METRO-CABARET-LAW-2017",
  "SRC-NEW-YORKER-DANCE-OUTLAWS-2017-07-03",
  "SRC-BAFFLER-MARCH-2018-02-12",
  "SRC-CURBED-COMMERCIAL-RENT-2019-11-08",
  nycacFacebookEventSourceIds.gothamistCommercialRent,
] as const;

export const nycacFacebookEventSources = [
  {
    id: nycacFacebookEventSourceIds.surface,
    title: "NYC Artist Coalition Facebook Past Events surface",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/nycartc/events",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, Facebook Past Events surface, authenticated review July 15, 2026.",
    publicNote:
      "Repeated authenticated scrolling reached a stable terminal population of 33 unique event cards. A separate host-card control displayed 34 past events.",
    supportsGenerally: [
      "33 currently exposed event identities",
      "the event chronology from 2017 through 2021",
      "public event titles, dates, venues, and organizer displays",
      "a 34-past-events host-card control",
    ],
    doesNotEstablish: [
      "a complete owner export",
      "the identity of the one unmaterialized historical event",
      "that no event was previously deleted or withheld",
      "individual authorship or production responsibility",
      "physical attendance, unique reach, endorsement, or impact",
    ],
  },
  {
    id: nycacFacebookEventSourceIds.census,
    title: "NYC Artist Coalition Facebook event full-population census",
    author: "Codex archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe census of the full NYC Artist Coalition Facebook Past Events population exposed July 15, 2026.",
    publicNote:
      "The fixture retains 33 public event identities, dates, venues, organizer displays, bounded response snapshots, topic classifications, and selected mission-relevant links while excluding raw descriptions and personal or access data.",
    supportsGenerally: [
      "34-of-34 control-slot accounting",
      "33 recovered public event records",
      "24 direct organizer cards and nine allied or cohosted cards",
      "event, venue, topic, response, and posted-source counts",
      "13 protected outbound-link occurrences withheld by category",
    ],
    doesNotEstablish: [
      "the missing event identity",
      "every historical coalition event",
      "individual event authorship",
      "physical attendance or unique people",
      "policy causality",
      "permission to publish attendee identities, comments, contacts, or access credentials",
    ],
  },
  {
    id: nycacFacebookEventSourceIds.protectedResearch,
    title: "Authenticated NYC Artist Coalition Facebook event research run",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Authenticated archival-production review of the NYC Artist Coalition Facebook event population, July 15, 2026.",
    publicNote:
      "The protected research record preserves traversal and detail-page provenance without publishing raw event bodies, attendee identities, comments, authenticated-session state, meeting credentials, or private working links.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026-07-15",
    supportsGenerally: [
      "terminal-scroll reconciliation",
      "33 detail-page reviews",
      "source-route extraction",
      "public-safety classification",
    ],
    doesNotEstablish: [
      "permission to publish protected capture data",
      "a complete Meta owner export",
      "physical attendance",
      "policy causality",
    ],
  },
  {
    id: nycacFacebookEventSourceIds.firsthandRole,
    title: "Jamie Burkart first-hand account of the NYC Artist Coalition event practice",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    assetUrl: reportUrl,
    preferredPublicUrl: "asset",
    publicCitation:
      "Jamie Burkart, first-hand account of his contribution to NYC Artist Coalition's event and participation practice, July 15, 2026.",
    publicNote:
      "Jamie identifies the recurring event system as a major part of his coalition contribution: combining lessons from WOW List with legislative advocacy, rotating meetings through small cultural spaces, listening to artists, and creating public paths from lived experience to collective civic action.",
    supportsGenerally: [
      "Jamie's first-hand role account",
      "the intention behind the rotating-venue meeting practice",
      "events as relational and civic infrastructure",
      "the democracy-lab interpretation as Jamie's perspective",
    ],
    doesNotEstablish: [
      "independent corroboration of every task",
      "Jamie's authorship or sole production of every event",
      "consensus among all coalition members",
      "physical attendance",
      "causality for legislative or agency outcomes",
    ],
  },
  {
    id: nycacFacebookEventSourceIds.nyPostFootloose,
    title: "These 'Footloose'-inspired rebels are fighting NYC's dancing ban",
    organization: "New York Post",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-04-08",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://nypost.com/2017/04/08/these-footloose-inspired-rebels-are-fighting-nycs-dancing-ban/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York Post, 'These Footloose-inspired rebels are fighting NYC's dancing ban,' April 8, 2017.",
    publicNote:
      "The June 2017 Cabaret Law hearing event linked this article as public context. This record preserves the posted source route; article-level claims require separate close reading.",
    supportsGenerally: [
      "a source article circulated through the event system",
      "Cabaret Law public-context routing",
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "coalition endorsement of every statement in the article",
      "event attendance",
      "policy causality",
    ],
  },
  {
    id: nycacFacebookEventSourceIds.gothamistCommercialRent,
    title:
      "Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization",
    organization: "Gothamist",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-11-06",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Gothamist, 'Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization,' November 6, 2019.",
    publicNote:
      "The November 2019 Fair Rent NYC rally event linked this article as public context. This record preserves the posted source route; article-level claims require separate close reading.",
    supportsGenerally: [
      "a source article circulated through the event system",
      "Commercial Rent Stabilization public-context routing",
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "coalition endorsement of every statement in the article",
      "event attendance",
      "policy adoption or causality",
    ],
  },
] satisfies KnowledgeBank["sources"];

export const nycacFacebookEventClaims = [
  {
    id: nycacFacebookEventClaimIds.population,
    project: projectId,
    internalClaim:
      "The complete currently exposed NYC Artist Coalition Facebook Past Events control contains 34 displayed slots: 33 public event records were recovered and close-read, while one historical slot remains unmaterialized and unidentified.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Facebook displayed 34 NYC Artist Coalition past-event slots. The knowledge bank recovered all 33 event identities exposed by the live index and records the remaining slot as unresolved.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md",
        ],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookEventSourceIds.surface,
        relationship: "corroborating",
        supports: ["33-event terminal index population", "34-event host-card control"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: nycacFacebookEventSourceIds.census,
        relationship: "direct-support",
        supports: [
          "34-of-34 control-slot disposition",
          "33 recovered detail records",
          "event identities and chronology",
        ],
        locator: "populationReconciliation and events",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: nycacFacebookEventSourceIds.protectedResearch,
        relationship: "private-support",
        supports: ["authenticated traversal provenance", "detail-page review"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "This is complete control-slot accounting, not complete historical content recovery or a native Meta export.",
      "The unresolved slot is not described as deleted, absent, or belonging to any inferred date, host, or campaign.",
      "The census cannot establish that no older event was removed before capture.",
    ],
    antiClaims: [
      "All 34 event pages were recovered",
      "The coalition created exactly 34 events in its history",
      "The unresolved event never existed",
      "Facebook is a complete owner archive",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: [
      "Jamie Burkart",
      "Codex authenticated archival-production review",
    ],
  },
  {
    id: nycacFacebookEventClaimIds.participationSystem,
    project: projectId,
    internalClaim:
      "Beginning in 2017, Jamie helped establish and produce NYC Artist Coalition's recurring participation system: public event pages, rotating meetings in small cultural spaces, practical safety and legal sessions, town halls, hearings, campaign actions, and later relief convenings that connected cultural experience with civic pathways.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Beginning in 2017, Jamie helped establish and produce NYC Artist Coalition's recurring participation system: public event pages, meetings rotating through small cultural spaces, practical safety and legal sessions, town halls, hearings, campaign actions, and relief convenings that connected artists' lived experience with civic pathways.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
      },
      {
        key: "archive-note",
        text: "Jamie describes the recurring event and participation layer as a major part of his NYC Artist Coalition contribution. The surviving event population corroborates the collective system's public form while leaving event-level authorship and production credit open.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md",
        ],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookEventSourceIds.firsthandRole,
        relationship: "direct-support",
        supports: [
          "Jamie's first-hand role account",
          "event-system intention",
          "connection between cultural listening and civic action",
        ],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: nycacFacebookEventSourceIds.census,
        relationship: "corroborating",
        supports: [
          "recurring meetings across cultural spaces",
          "practical sessions, hearings, campaigns, and relief formats",
          "cultural and government venue pattern",
        ],
        locator: "events, topics, venueCategory, and relationToPage",
        publicNote:
          "The event record proves the collective system existed; it does not identify the producer of every event.",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
        relationship: "corroborating",
        supports: [
          "Jamie's coalition affiliation",
          "fire-code study groups organized by Jamie",
          "Jamie's City Hall advocacy",
        ],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19",
        relationship: "corroborating",
        supports: [
          "Jamie's coalition participation",
          "contemporaneous cultural-space and Cabaret Law context",
        ],
        confidence: "moderate",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Use helped establish and produce; do not assign Jamie authorship or sole production of every event.",
      "Preserve event partners, venue hosts, organizers, artists, advocates, public officials, and coalition collaborators as part of the work.",
      "The rotating-venue finding is supported by 12 recurring-meeting records, including ten distinct named physical cultural spaces and two virtual meetings; it is not a claim that a meeting occurred every calendar month.",
      "The event record does not establish that any one gathering caused a legislative, agency, or enforcement outcome.",
    ],
    antiClaims: [
      "Jamie solely created or produced every NYC Artist Coalition event",
      "Jamie alone led the coalition",
      "Every event used a different venue",
      "The coalition held a meeting in every calendar month",
      "The event program alone caused Cabaret Law repeal or another policy outcome",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: [
      "Jamie Burkart",
      "Codex authenticated archival-production review",
    ],
  },
  {
    id: nycacFacebookEventClaimIds.responseSignals,
    project: projectId,
    internalClaim:
      "Thirty-two of the 33 recovered event pages display historical Facebook response counts. Nineteen display at least 100 responses, seven at least 500, and three at least 1,000.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "The public event layer generated visible platform traction: 19 recovered event pages display at least 100 Facebook responses, seven at least 500, and three at least 1,000. These are historical response labels, not verified attendance or unique reach.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
      },
      {
        key: "archive-note",
        text: "Thirty-two recovered event pages display Facebook response counts; 19 show at least 100 responses, seven at least 500, and three at least 1,000. The figures remain event-level platform signals only.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md",
        ],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookEventSourceIds.census,
        relationship: "direct-support",
        supports: [
          "32 response displays",
          "19 at or above 100",
          "seven at or above 500",
          "three at or above 1,000",
        ],
        locator: "aggregateSnapshot and events[].responseSnapshot",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Facebook response labels are not verified attendance, unique people, reach, participation, endorsement, conversion, mandate, or impact.",
      "People may respond to multiple events, and three displayed figures are rounded in thousands.",
      "Do not sum the event-level figures into a people-reached claim.",
      "Use independent reporting for physical attendance at a particular event when available.",
    ],
    antiClaims: [
      "9,989 unique people engaged",
      "Facebook responses equal event attendance",
      "Every responder participated in advocacy",
      "Response counts prove endorsement or policy impact",
      "The three largest events each drew more than 1,000 people in person",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: [
      "Jamie Burkart",
      "Codex authenticated archival-production review",
    ],
  },
  {
    id: nycacFacebookEventClaimIds.democraticPractice,
    project: projectId,
    internalClaim:
      "Jamie understands NYC Artist Coalition's recurring event practice as a democracy lab: believing artists, moving through small cultural spaces, translating between cultural and civic codes, and creating occasions where people could build collective agency together.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Jamie describes the event practice as a kind of democracy lab: listening in small cultural spaces, believing artists, and translating lived experience into collective civic pathways.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md",
        ],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookEventSourceIds.firsthandRole,
        relationship: "context",
        supports: ["Jamie's attributed interpretation", "practice intention"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: nycacFacebookEventSourceIds.census,
        relationship: "corroborating",
        supports: [
          "repeated participatory convenings",
          "cultural-space and government-interface pattern",
          "public paths from meetings to hearings and actions",
        ],
        confidence: "moderate",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Keep democracy lab, city nervous system, events as art, and believing artists language attributed to Jamie as interpretation.",
      "Do not present the metaphor as a measured outcome, participant consensus, or external evaluation.",
      "Do not infer that every participant experienced the events in the same way.",
    ],
    antiClaims: [
      "The events empirically proved a democracy-lab outcome",
      "Every participant shared Jamie's interpretation",
      "The event system represented all NYC artists",
      "Facebook response counts measure democratic participation",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex editorial review"],
  },
] satisfies KnowledgeBank["claims"];

export const nycacFacebookEventResearchInquiries = [
  {
    id: "INQ-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
    project: projectId,
    question:
      "Can the complete currently exposed NYC Artist Coalition Facebook event population be reconciled and developed into public-safe evidence of a participation system without converting platform responses into attendance or collective outcomes into individual credit?",
    methods: [
      "Repeated authenticated scrolling of the Facebook Past Events index until unique event IDs and page height remained stable.",
      "Reconciled the 33 materialized event IDs against the separate 34-past-events host-card control.",
      "Reviewed all 33 exposed event detail pages and retained public event metadata, organizer displays, response labels, mission topics, and selected outbound source routes.",
      "Excluded raw event descriptions, attendee identities, comments, reactions, historical contacts, meeting credentials, private working links, and authenticated-session state.",
      "Replayed the authenticated index on July 15, 2026; the same 33 IDs materialized after repeated terminal scrolling.",
      "Separated the event record's evidence of a collective participation system from Jamie's first-hand account of his individual contribution.",
      "Resolved source articles against the existing campaign-press bank when available and retained two additional event-posted article routes with explicit close-reading boundaries.",
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "All 34 displayed control slots are accounted: 33 event identities and detail pages recovered, one historical slot unresolved.",
      "The recovered chronology spans January 2017 through January 2021.",
      "Twelve recurring-meeting records include ten distinct named physical cultural spaces and two virtual meetings.",
      "The broader sequence includes practical fire-safety and legal sessions, panels, venue-support actions, hearings, town halls, rallies, small-business advocacy, mutual aid, and pandemic relief.",
      "Twenty-four index cards display NYC Artist Coalition as organizer; nine are allied or cohosted listings.",
      "Thirty-two pages display response counts; 19 are at least 100, seven at least 500, and three at least 1,000.",
      "Seven source articles were posted through event descriptions across Cabaret Law, MARCH, and Commercial Rent Stabilization contexts.",
      "Jamie's first-hand account identifies the recurring event and participation layer as a substantial coalition contribution; event-level authorship remains unresolved.",
    ],
    limitations: [
      "The remaining host-card slot did not materialize and cannot be assigned a title, date, host, or campaign.",
      "The live index is not a native Meta owner export and cannot establish that no event was deleted or withheld before capture.",
      "Facebook response labels do not establish attendance, unique people, reach, participation, endorsement, conversion, mandate, or impact.",
      "Event pages do not identify the individual human author or producer of each page or program.",
      "Posted source routes do not mean every article statement was adopted by all event hosts or participants.",
      "Legislative, agency, and enforcement outcomes require their own official and independent evidence chains.",
    ],
    sourceIds: [
      ...Object.values(nycacFacebookEventSourceIds),
      ...nycacFacebookEventArticleSourceIds,
      "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
      "SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19",
    ],
    publicSummary:
      "The full currently exposed Facebook control is reconciled as 33 recovered event records plus one unresolved historical slot. The record supports a recurring cultural-space participation system and bounded platform traction while preserving collective credit and keeping attendance, causality, and private participant data out of scope.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026-07-15",
  },
] satisfies KnowledgeBank["researchInquiries"];

export const nycacFacebookEventIntakeItems = [
  {
    id: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026-07-15",
    title: "NYC Artist Coalition Facebook event archival production",
    project: projectId,
    kind: "source-link",
    summary:
      "A full-population authenticated review accounts for every displayed NYC Artist Coalition Facebook event slot, preserves 33 public-safe event plot points and seven posted source-article routes, and develops bounded claims about Jamie's participation-system contribution and the collective event layer's visible platform traction.",
    status: "integrated",
    sourceIds: [
      ...Object.values(nycacFacebookEventSourceIds),
      ...nycacFacebookEventArticleSourceIds,
      "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
      "SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19",
    ],
    relatedClaimIds: Object.values(nycacFacebookEventClaimIds),
    relatedProofIds: ["nyc-artist-coalition-participation-system"],
    candidateClaims: [],
    propositions: [
      {
        id: "PROP-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
        text: "Facebook displayed 34 NYC Artist Coalition past-event slots; 33 event identities and detail pages were recovered, and one metadata-free historical slot remains unresolved.",
        status: "supported-with-boundary",
        sourceIds: [
          nycacFacebookEventSourceIds.surface,
          nycacFacebookEventSourceIds.census,
          nycacFacebookEventSourceIds.protectedResearch,
        ],
        sourceSupport: [
          "34-past-events control",
          "33-event stable terminal index",
          "33 reviewed detail pages",
          "reconciled public fixture",
        ],
        boundaries: [
          "This is 100 percent control-slot accounting, not 100 percent historical content recovery or a native Meta export.",
          "The unresolved slot receives no inferred metadata.",
        ],
        decisionUse:
          "Provides an exact denominator and preserves the unresolved remainder instead of erasing it.",
      },
      {
        id: "PROP-NYCAC-PARTICIPATION-SYSTEM-2026",
        text: "Beginning in 2017, Jamie helped establish and produce a recurring NYC Artist Coalition participation system spanning public event pages, meetings in small cultural spaces, practical sessions, hearings, town halls, campaign actions, and relief convenings.",
        status: "supported-with-boundary",
        sourceIds: [
          nycacFacebookEventSourceIds.firsthandRole,
          nycacFacebookEventSourceIds.census,
          "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
          "SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19",
        ],
        sourceSupport: [
          "Jamie's first-hand role account",
          "33-event public system",
          "12 recurring-meeting classifications",
          "ten distinct named physical meeting venues",
          "independent reporting of Jamie's fire-code study groups and City Hall advocacy",
          "contemporaneous interview connecting Jamie to coalition work",
        ],
        boundaries: [
          "Use helped establish and produce, not sole authorship or production of every event.",
          "Preserve collective and cohost credit and do not infer event-to-policy causality.",
        ],
        decisionUse:
          "Makes Jamie's relational civic-production work legible to hiring readers without absorbing the coalition into an individual claim.",
      },
      {
        id: "PROP-NYCAC-FACEBOOK-RESPONSE-SIGNALS-2026",
        text: "Nineteen recovered event pages display at least 100 Facebook responses, seven at least 500, and three at least 1,000.",
        status: "supported-with-boundary",
        sourceIds: [nycacFacebookEventSourceIds.census],
        sourceSupport: [
          "32 response-bearing event records",
          "threshold arithmetic preserved in the fixture",
        ],
        boundaries: [
          "These are event-level platform labels, not verified attendance, unique people, reach, participation, endorsement, conversion, mandate, or impact.",
          "Do not sum response labels into a people-reached claim.",
        ],
        decisionUse:
          "Supplies visible public traction while protecting the difference between an interface action and a person in a room.",
      },
      {
        id: "PROP-NYCAC-EVENT-POSTED-SOURCE-ROUTES-2026",
        text: "Seven source articles across New York Post, WNYC, Metro, The New Yorker, The Baffler, Curbed, and Gothamist were posted through recovered event descriptions.",
        status: "direct-support",
        sourceIds: [
          nycacFacebookEventSourceIds.census,
          ...nycacFacebookEventArticleSourceIds,
        ],
        sourceSupport: [
          "event-to-source route inventory",
          "seven article titles, publishers, event associations, and URLs",
        ],
        boundaries: [
          "A posted source route does not mean every article claim was adopted by all event hosts or participants.",
          "Article-level claims require separate close reading and source-specific boundaries.",
        ],
        decisionUse:
          "Connects event plot points to the wider public record and creates a research queue for later claim development.",
      },
      {
        id: "PROP-NYCAC-DEMOCRACY-LAB-INTERPRETATION-2026",
        text: "Jamie describes the recurring event practice as a kind of democracy lab: believing artists, listening in small cultural spaces, and translating lived experience into collective civic pathways.",
        status: "context-only",
        sourceIds: [
          nycacFacebookEventSourceIds.firsthandRole,
          nycacFacebookEventSourceIds.census,
        ],
        sourceSupport: [
          "Jamie's attributed interpretation",
          "29 participatory-convening classifications",
          "15 government-interface classifications",
          "cultural-space and government-venue pattern",
        ],
        boundaries: [
          "Keep the language attributed to Jamie and do not present it as a measured outcome, participant consensus, or external evaluation.",
          "Do not use Facebook response counts as a measure of democratic participation.",
        ],
        decisionUse:
          "Preserves the ethical and poetic intention behind the system without forcing it into the hiring site's primary proof layer.",
        nextStep:
          "Seek collaborator and participant accounts that can add, complicate, or correct Jamie's interpretation while preserving consent.",
      },
    ],
    tensions: [],
    researchQuestions: [
      "Can an official Meta owner export identify the unresolved 34th event and any events deleted before the live index capture?",
      "Which collaborator records, page-admin histories, task artifacts, or event programs can specify Jamie's event-level production responsibilities?",
      "Which events have independently reported physical attendance or participant accounts?",
      "Which public records connect event testimony or demands to later legislative, agency, or enforcement decisions without overstating causality?",
      "Which event-linked articles should be close-read next for role, context, and outcome claims?",
    ],
    boundaries: [
      "Do not publish attendee or guest identities, comments, reactions, invite context, contact details, meeting credentials, private working links, authenticated-session state, or raw event bodies.",
      "Do not convert response labels into attendance, unique people, reach, endorsement, conversion, mandate, or impact.",
      "Do not infer individual authorship or production from a shared event page.",
      "Do not infer policy causality from event chronology alone.",
      "Do not create /proofs, /events, /knowledge-bank, or another public archive route from this intake.",
    ],
    projectionStatus: "no-public-projection",
    receivedAt: "2026-07-15",
    reviewedAt: "2026-07-15",
    reviewedBy: [
      "Jamie Burkart",
      "Codex authenticated archival-production review",
    ],
  },
] satisfies KnowledgeBank["intakeItems"];
