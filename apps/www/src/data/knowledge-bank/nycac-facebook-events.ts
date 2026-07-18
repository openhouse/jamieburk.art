import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

export const nycacFacebookEventArticleSourceIds = [
  "SRC-NYCAC-NYPOST-FOOTLOOSE-2017-04-08",
  "SRC-NYCA-PRESS-WNYC-2017-06-19-THE-BUREAUCRATIC-DANCE-TO-END",
  "SRC-NYCA-PRESS-METRO-2017-05-31-ARTS-ADVOCATES-RENEW-CALL-TO",
  "SRC-NYCA-PRESS-NEW-YORKER-2017-07-03-DANCE-OUTLAWS-FIGHT-FOR-THE",
  "SRC-NYCA-PRESS-BAFFLER-2018-02-12-CUT-THE-MUSIC-LIZ-PELLY",
  "SRC-NYCA-PRESS-CURBED-2019-11-08-COULD-COMMERCIAL-RENT-STABILIZATION-SOLVE",
  "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-2019-11-06"
] as const;

export const nycacFacebookEventReviewSummary = {
  displayedControlSlots: 34,
  recoveredEvents: 33,
  unresolvedControlSlots: 1,
  currentReplayEventIdSha256:
    "b9e63a508958e7b7ed71236803aef60bc597123b1ff5c497550df90c80fe09fc",
  directNycacOrganizerCards: 24,
  alliedOrCohostedCards: 9,
  recoveredYears: { 2017: 17, 2018: 3, 2019: 6, 2020: 6, 2021: 1 },
  recurringMeetings: 12,
  namedPhysicalMeetingVenues: 10,
  virtualMeetings: 2,
  participatoryConvenings: 29,
  governmentInterfaceEvents: 15,
  culturalOrCommunitySpaceEvents: 15,
  governmentVenueEvents: 9,
  eventsWithDisplayedResponses: 32,
  responseDisplaysAtLeast100: 19,
  responseDisplaysAtLeast500: 7,
  responseDisplaysAtLeast1000: 3,
  postedSourceArticles: 7,
  protectedOutboundLinkOccurrences: 13
} as const;

export const nycacFacebookEventIntakeItems = [
  {
    id: "INTAKE-2026-07-15-NYCAC-FACEBOOK-EVENT-FULL-POPULATION",
    receivedAt: reviewedAt,
    inputKind: "metric",
    summary:
      "Authenticated public-safe archival production across every NYC Artist Coalition Facebook Past Events record exposed after terminal scrolling, with one unresolved historical control slot kept explicit.",
    projectIds: ["nyc-artist-coalition"],
    researchStatus: "researched",
    publicationStatus: "projected",
    sourceIds: [
      "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
      ...nycacFacebookEventArticleSourceIds
    ],
    observationIds: [
      "OBS-NYCAC-FACEBOOK-EVENT-POPULATION",
      "OBS-NYCAC-FACEBOOK-EVENT-CHRONOLOGY",
      "OBS-NYCAC-FACEBOOK-ROTATING-MEETINGS",
      "OBS-NYCAC-FACEBOOK-CIVIC-CULTURAL-INTERFACES",
      "OBS-NYCAC-FACEBOOK-RESPONSE-SIGNALS",
      "OBS-NYCAC-FACEBOOK-POSTED-SOURCE-ROUTES",
      "OBS-NYCAC-FACEBOOK-DETAIL-AVAILABILITY"
    ],
    claimIds: [
      "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
      "CLM-NYCAC-PARTICIPATION-SYSTEM",
      "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS"
    ],
    researchInquiryIds: [
      "INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT",
      "INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"
    ],
    nextActions: [
      "Request a native Meta owner export to identify the unresolved control slot and events removed before capture.",
      "Crosswalk programs, task artifacts, and collaborator accounts to event-level production credit.",
      "Use independent reporting rather than Facebook response labels for physical attendance."
    ]
  },
  {
    id: "INTAKE-2026-07-15-NYCAC-EVENT-PRACTICE-MEMORY",
    receivedAt: reviewedAt,
    inputKind: "memory",
    summary:
      "Jamie's first-person account of connecting WOW List's participation ethos with recurring cultural-space meetings, practical support, legislative advocacy, and collective civic action through NYC Artist Coalition.",
    projectIds: ["nyc-artist-coalition", "wowlist"],
    researchStatus: "researched",
    publicationStatus: "projected",
    sourceIds: [
      "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCA-GOTHAMIST-CABARET-2017",
      "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017"
    ],
    observationIds: [
      "OBS-NYCAC-FACEBOOK-JAMIE-ROLE-MEMORY",
      "OBS-NYCAC-FACEBOOK-DEMOCRACY-LAB-INTERPRETATION"
    ],
    claimIds: [
      "CLM-NYCAC-PARTICIPATION-SYSTEM",
      "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    nextActions: [
      "Invite collaborators and participants to corroborate, complicate, or correct the event-practice account.",
      "Keep democracy-lab and city-nervous-system language attributed to Jamie rather than presenting it as measured impact."
    ]
  }
];

export const nycacFacebookEventSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
    title: "NYC Artist Coalition Facebook Past Events surface",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/nycartc/events",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, Facebook Past Events surface, authenticated review July 15, 2026.",
    publicNote:
      "Repeated authenticated scrolling reached a stable set of 33 event IDs. An earlier authenticated host control displayed 34 past-event slots.",
    supportsGenerally: [
      "33 currently exposed event identities",
      "event chronology and public metadata",
      "34-past-events host control in an earlier authenticated capture"
    ],
    doesNotEstablish: [
      "a complete native Meta owner export",
      "the identity of the unresolved control slot",
      "individual authorship or production",
      "attendance, reach, endorsement, or policy impact"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
    title: "NYC Artist Coalition Facebook event full-population public-safe census",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex authenticated archival-production review",
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe census of the full NYC Artist Coalition Facebook Past Events population exposed July 15, 2026.",
    publicNote:
      "The metadata-only fixture retains 33 recovered event identities and a disposition for all 34 displayed control slots while excluding raw descriptions and personal or authenticated-session data.",
    supportsGenerally: [
      "33 recovered event records plus one unresolved control slot",
      "24 direct organizer cards and nine allied or cohosted cards",
      "12 recurring meetings including ten named physical cultural spaces",
      "bounded response thresholds",
      "seven posted source-article routes",
      "13 protected outbound-link occurrences withheld by category"
    ],
    doesNotEstablish: [
      "the unresolved event identity",
      "every historical coalition event",
      "individual event authorship or production",
      "physical attendance or unique people",
      "policy causality"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
    title: "Authenticated NYC Artist Coalition Facebook event research captures",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Authenticated archival-production review of the NYC Artist Coalition Facebook event population, July 15, 2026.",
    publicNote:
      "Protected captures preserve traversal, detail-page, host-control, and source-route provenance. Raw bodies, personal data, meeting access details, and authenticated state are not published.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026",
    supportsGenerally: [
      "terminal-scroll reconciliation",
      "33 event IDs across authenticated replays",
      "detail-page availability changes",
      "public-safety review"
    ],
    doesNotEstablish: [
      "permission to publish protected capture data",
      "a complete native owner export",
      "physical attendance",
      "individual event authorship",
      "policy causality"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
    title: "Jamie Burkart first-hand account of NYC Artist Coalition event practice",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart, first-hand account of his contribution to NYC Artist Coalition's event and participation practice, July 15, 2026.",
    publicNote:
      "Jamie identifies the recurring event system as a major coalition contribution and relates it to WOW List, cultural-space listening, artist trust, legislative advocacy, and collective civic action.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-2026",
    supportsGenerally: [
      "Jamie's first-hand role account",
      "the intended relationship between WOW List and coalition convening",
      "the democracy-lab interpretation as Jamie's perspective"
    ],
    doesNotEstablish: [
      "independent corroboration of every task",
      "sole authorship or production of every event",
      "participant consensus",
      "physical attendance",
      "policy causality"
    ]
  },
  {
    id: "SRC-NYCAC-NYPOST-FOOTLOOSE-2017-04-08",
    title: "These Footloose-inspired rebels are fighting NYC's dancing ban",
    organization: "New York Post",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-04-08",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://nypost.com/2017/04/08/these-footloose-inspired-rebels-are-fighting-nycs-dancing-ban/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York Post, 'These Footloose-inspired rebels are fighting NYC's dancing ban,' April 8, 2017.",
    publicNote:
      "The June 2017 Cabaret Law hearing event routed participants to this article as public context.",
    supportsGenerally: ["a Cabaret Law article circulated through the event system"],
    doesNotEstablish: [
      "Jamie's individual role",
      "coalition endorsement of every article statement",
      "event attendance",
      "policy causality"
    ]
  },
  {
    id: "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-2019-11-06",
    title:
      "Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization",
    organization: "Gothamist",
    author: "Elizabeth Kim",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-11-06",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Elizabeth Kim, 'Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization,' Gothamist, November 6, 2019.",
    publicNote:
      "The November 2019 Fair Rent NYC rally event routed participants to this article as public context.",
    supportsGenerally: [
      "a Commercial Rent Stabilization article circulated through the event system"
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "coalition endorsement of every article statement",
      "event attendance",
      "policy adoption or causality"
    ]
  }
];

export const nycacFacebookEventObservations = [
  {
    id: "OBS-NYCAC-FACEBOOK-EVENT-POPULATION",
    sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
    project: "nyc-artist-coalition",
    text: "An earlier Facebook host control displayed 34 past-event slots while repeated authenticated scrolling exposed 33 unique event IDs. All 33 exposed records were reviewed, and the remaining slot is preserved as unresolved.",
    locator: "populationReconciliation",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-NYCAC-FACEBOOK-EVENT-CHRONOLOGY",
    sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
    project: "nyc-artist-coalition",
    text: "The 33 recovered records span January 2017 through January 2021: 17 in 2017, three in 2018, six in 2019, six in 2020, and one in 2021. Twenty-four index cards display NYC Artist Coalition as organizer and nine are allied or cohosted listings.",
    locator: "aggregateSnapshot and events[].date",
    status: "verified",
    confidence: "high",
    claimIds: [
      "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
      "CLM-NYCAC-PARTICIPATION-SYSTEM"
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-NYCAC-FACEBOOK-ROTATING-MEETINGS",
    sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
    project: "nyc-artist-coalition",
    text: "Twelve records are recurring coalition meetings. Ten physical meetings name ten different cultural spaces - Magick City, The Floasis, Muchmore's, The City Reliquary, Shoestring Press, Chinatown Soup, Secret Project Robot, Friends and Lovers, Flowers for all Occasions, and Ode to Babel - while two later meetings were virtual.",
    locator: "events[].topics, venue, and date",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-NYCAC-FACEBOOK-CIVIC-CULTURAL-INTERFACES",
    sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
    project: "nyc-artist-coalition",
    text: "The recovered sequence includes coalition meetings, fire-safety study sessions, legal and architectural questions, venue-support actions, panels, City Hall hearings, a DCLA meeting, nightlife town halls, small-business advocacy, mutual aid, and pandemic relief. Public displays connect cultural spaces and artist groups with advocates, agencies, elected officials, and civic institutions.",
    locator: "events[].venueCategory, topics, title, and organizer displays",
    status: "verified",
    confidence: "high",
    claimIds: [
      "CLM-NYCAC-PARTICIPATION-SYSTEM",
      "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-NYCAC-FACEBOOK-RESPONSE-SIGNALS",
    sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
    project: "nyc-artist-coalition",
    text: "Thirty-two recovered pages display historical Facebook response counts. Nineteen display at least 100 responses, seven at least 500, and three at least 1,000.",
    locator: "aggregateSnapshot and events[].responseSnapshot",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-NYCAC-FACEBOOK-POSTED-SOURCE-ROUTES",
    sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
    project: "nyc-artist-coalition",
    text: "Recovered event descriptions routed participants to seven articles from New York Post, WNYC, Metro, The New Yorker, The Baffler, Curbed, and Gothamist across Cabaret Law, M.A.R.C.H., and Commercial Rent Stabilization contexts.",
    locator: "postedSourceArticles",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-NYCAC-FACEBOOK-DETAIL-AVAILABILITY",
    sourceId: "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
    project: "nyc-artist-coalition",
    text: "Authenticated captures recovered all 33 exposed detail records. A later replay recovered the same 33 event IDs but only 28 detail bodies; five routes returned an unavailable state. The public census retains earlier public metadata and records the later volatility.",
    locator: "Protected capture reconciliation and fixture detailAvailabilityRecheck",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-NYCAC-FACEBOOK-JAMIE-ROLE-MEMORY",
    sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
    project: "nyc-artist-coalition",
    text: "Jamie identifies the recurring event and participation layer as a substantial coalition contribution: connecting lessons from WOW List with legislative advocacy, helping create public event identities, moving meetings among small cultural spaces, listening to artists, and carrying lived concerns toward civic action.",
    locator: "Participant-memory intake supplied July 15, 2026",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-NYCAC-FACEBOOK-DEMOCRACY-LAB-INTERPRETATION",
    sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
    project: "nyc-artist-coalition",
    text: "Jamie describes the event practice as a kind of democracy lab: believing artists, treating events as an art form, and translating between cultural and civic codes so people can build collective agency together.",
    locator: "Participant-memory intake supplied July 15, 2026",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  }
];

export const nycacFacebookEventClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
    project: "nyc-artist-coalition",
    internalClaim:
      "The complete displayed NYC Artist Coalition Facebook Past Events control has 34 slots: 33 public event records were recovered and reviewed, while one historical slot remains unmaterialized and unidentified.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Facebook displayed 34 NYC Artist Coalition past-event slots. The knowledge bank recovered all 33 event identities exposed by the live index and preserves the remaining slot as unresolved.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
        relationship: "corroborating",
        supports: ["33 exposed event identities", "34-slot earlier host control"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "direct-support",
        supports: ["34-of-34 control-slot disposition", "33 recovered records"],
        locator: "populationReconciliation and events",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
        relationship: "private-support",
        supports: ["terminal-scroll reconciliation", "detail availability replay"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is complete displayed-control accounting, not complete historical recovery or a native Meta owner export.",
      "The unresolved slot receives no inferred title, date, host, campaign, or deletion state.",
      "A later unavailable route does not mean an earlier recovered event did not exist."
    ],
    antiClaims: [
      "All 34 event pages were recovered.",
      "NYC Artist Coalition created exactly 34 events in its history.",
      "The unresolved event never existed.",
      "Facebook is a complete owner archive."
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-PARTICIPATION-SYSTEM",
    project: "nyc-artist-coalition",
    internalClaim:
      "Beginning in 2017, Jamie helped establish and produce NYC Artist Coalition's recurring participation system. Public records preserve an early operating sequence from WOW List's popular.vote civic event-sharing surface through a Call Script-cohosted DCLA meeting, issue gathering, collaborative letter drafting, collective naming, and a February follow-up meeting, followed by rotating meetings, practical sessions, town halls, hearings, campaign actions, and relief convenings.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Beginning in 2017, Jamie helped establish and produce NYC Artist Coalition's recurring participation system. He used Call Script and WOW List's civic event-sharing adaptation to help move an emerging group from a DCLA meeting through issue gathering, collaborative drafting, collective naming, and a follow-up meeting, then into a wider cadence of cultural-space meetings and civic action.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "archive-note",
        text: "Jamie describes the recurring event and participation layer as a major part of his NYC Artist Coalition contribution. The surviving population corroborates the collective system's public form while leaving event-level authorship open.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
        relationship: "direct-support",
        supports: ["Jamie's role account", "WOW List method relationship"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "corroborating",
        supports: [
          "33-event collective participation system",
          "12 recurring meetings across ten physical cultural spaces"
        ],
        locator: "events, topics, venues, and organizer displays",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCA-GOTHAMIST-CABARET-2017",
        relationship: "corroborating",
        supports: [
          "Jamie organized fire-code study groups",
          "Jamie participated in City Hall advocacy"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017",
        relationship: "corroborating",
        supports: [
          "Jamie's NYC Artist Coalition participation",
          "a nightlife town hall invitation"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
        relationship: "context",
        supports: [
          "WOW List's civic event-sharing adaptation",
          "a public surface for marches, meetings, and in-person connection"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026-07-16",
        relationship: "corroborating",
        supports: [
          "Call Script project identity",
          "the surviving public link to popular.vote"
        ],
        confidence: "moderate",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
        relationship: "direct-support",
        supports: [
          "Call Script's DCLA-meeting cohost role",
          "issue gathering and collaborative letter drafting",
          "collective naming and follow-up meeting coordination"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-PRODUCTION-ARCHIVE-NYCAC-SEQUENCE-2017",
        relationship: "private-support",
        supports: [
          "the adjacent January-to-February 2017 event sequence",
          "continuity of event-sharing infrastructure"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use helped establish and produce; do not assign Jamie authorship or sole production of every event.",
      "The current Call Script link to popular.vote does not establish when the link was added, and page authorship does not establish that Jamie wrote every post or comment.",
      "The naming poll displays NYC Artist Coalition as the leading option at 57% but does not display a vote denominator.",
      "Preserve partners, venue hosts, artists, advocates, officials, and coalition collaborators as part of the work.",
      "The rotating pattern covers ten physical meeting spaces and two virtual meetings, not one meeting every calendar month.",
      "The event sequence does not establish that any gathering caused a policy outcome."
    ],
    antiClaims: [
      "Jamie solely created or produced every NYC Artist Coalition event.",
      "Jamie alone led the coalition.",
      "Call Script or popular.vote alone caused NYC Artist Coalition to form.",
      "The naming poll establishes a vote total, representative mandate, or complete founding roster.",
      "Every event used a different venue.",
      "The coalition held a meeting every calendar month.",
      "The event program alone caused Cabaret Law repeal or another policy outcome."
    ],
    researchInquiryIds: [
      "INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE",
      "INQ-CALLSCRIPT-WOWLIST-NYCAC-BRIDGE-2026"
    ],
    reviewedAt: "2026-07-16",
    reviewedBy: [...reviewedBy, "Codex Call Script bridge review"]
  },
  {
    id: "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
    project: "nyc-artist-coalition",
    internalClaim:
      "Thirty-two of the 33 recovered event pages display historical Facebook response counts; 19 display at least 100 responses, seven at least 500, and three at least 1,000.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Thirty-two recovered event pages display Facebook response counts; 19 show at least 100 responses, seven at least 500, and three at least 1,000. The figures remain event-level platform signals only.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "direct-support",
        supports: ["response-threshold arithmetic"],
        locator: "aggregateSnapshot and events[].responseSnapshot",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Facebook response labels are not verified attendance, unique people, reach, participation, endorsement, conversion, mandate, or impact.",
      "People may respond to multiple events, and three values are rounded in thousands.",
      "Do not sum event-level values into a people-reached claim.",
      "Use independent reporting for physical attendance when available."
    ],
    antiClaims: [
      "9,989 unique people engaged.",
      "Facebook responses equal event attendance.",
      "Every responder participated in advocacy.",
      "Response counts prove endorsement or policy impact."
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE",
    project: "nyc-artist-coalition",
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
          "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
        relationship: "context",
        supports: ["the democracy-lab interpretation as Jamie's perspective"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "corroborating",
        supports: ["recurring meetings across cultural and civic spaces"],
        confidence: "moderate",
        renderCitation: true
      }
    ],
    boundaries: [
      "Keep democracy lab, city nervous system, events as art, and believing artists language attributed to Jamie.",
      "Do not present the metaphor as a measured outcome, participant consensus, or external evaluation."
    ],
    antiClaims: [
      "The events empirically proved a democracy-lab outcome.",
      "Every participant shared Jamie's interpretation.",
      "The event system represented all NYC artists.",
      "Facebook response counts measure democratic participation."
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  }
];

export const nycacFacebookEventResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT",
    project: "nyc-artist-coalition",
    question:
      "Can a native Meta owner export identify the unresolved control slot and events removed before the current live index?",
    methods: [
      "Exhausted the authenticated Past Events surface through repeated no-growth scrolling.",
      "Reconciled 33 stable event IDs against an earlier 34-past-events host control.",
      "Repeated the event-ID and detail-page traversal and preserved availability changes."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Thirty-three event IDs materialized consistently.",
      "All 33 detail records were recovered across authenticated captures.",
      "One host-control slot remains unidentified.",
      "A later replay retained all 33 IDs while five detail routes became unavailable."
    ],
    limitations: [
      "No native Meta owner export was available in this pass.",
      "The live surface cannot reveal events removed before capture.",
      "The unresolved slot cannot be assigned metadata or a deletion state."
    ],
    sourceIds: [
      "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026"
    ],
    publicSummary:
      "The displayed control is reconciled as 33 recovered records plus one unresolved historical slot; a native owner export is the remaining route to literal account-history completeness.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026"
  },
  {
    id: "INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE",
    project: "nyc-artist-coalition",
    question:
      "Which records can further specify Jamie's event-level production work, the transfer of WOW List methods, and independently reported attendance without absorbing collective credit?",
    methods: [
      "Captured Jamie's first-hand account as participant memory.",
      "Compared the account with the complete exposed event census.",
      "Connected selected role propositions to contemporaneous Gothamist and Greene Hill records.",
      "Kept Facebook response labels separate from physical attendance."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The event population corroborates a recurring collective participation system across cultural and civic spaces.",
      "Independent sources connect Jamie to coalition work, fire-code study groups, City Hall advocacy, and a nightlife town hall invitation.",
      "Jamie's first-hand account supports a bounded helped-establish-and-produce claim.",
      "Event-level authorship, exact division of labor, WOW List method transfer, and physical attendance remain open for further corroboration."
    ],
    limitations: [
      "Shared event pages do not identify the human author or producer of each event.",
      "Response labels do not establish physical attendance or unique people.",
      "Collaborator and participant accounts may add, complicate, or correct Jamie's interpretation.",
      "Event chronology does not establish policy causality."
    ],
    sourceIds: [
      "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCA-GOTHAMIST-CABARET-2017",
      "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017"
    ],
    publicSummary:
      "The combined record supports Jamie's bounded contribution to a recurring participation system while preserving collective credit and leaving event-level production and actual attendance open for corroboration.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-2026"
  }
];
