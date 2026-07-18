import type {
  ClaimRecord,
  IntakeRecord,
  KnowledgeBank,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

type PersonalWowlistFacebookEventsBatch = Pick<
  KnowledgeBank,
  "intakeRecords" | "sources" | "claims" | "researchInquiries"
>;

const selectedHostedEventSources = [
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006",
    title: "Musicians for a Semantic Web",
    publishedAt: "2006-12-02",
    canonicalUrl: "https://www.facebook.com/events/10153308288768593/",
    publicCitation:
      "'Musicians for a Semantic Web,' Facebook event page displaying 'Event by Jamie Burkart', December 2, 2006.",
    supportsGenerally: [
      "an early public event connecting music, networked culture, and collaborative discussion"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007",
    title: "Pirate Trolley-In!!",
    publishedAt: "2007-01-06",
    canonicalUrl: "https://www.facebook.com/events/10155459481930035/",
    publicCitation:
      "'Pirate Trolley-In!!,' Facebook event page displaying 'Event by Jamie Burkart', January 6, 2007.",
    supportsGenerally: [
      "a participatory public-history event centered on Kansas City's 8th Street Trolley Tunnel"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-MICROPOP-2007",
    title: "Micropop: Nation-Scenes",
    publishedAt: "2007-01-25",
    canonicalUrl: "https://www.facebook.com/events/10153329249353169/",
    publicCitation:
      "'Micropop: Nation-Scenes,' Facebook event page displaying 'Event by Jamie Burkart', January 25, 2007.",
    supportsGenerally: [
      "a networked-culture discussion routed toward Imagined Communities, a Last.fm fan graph, and KCDIY.org"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007",
    title: "Release Yourself onto the Water Until it Tastes of Salt",
    publishedAt: "2007-07-14",
    canonicalUrl: "https://www.facebook.com/events/10153218027900549/",
    publicCitation:
      "'Release Yourself onto the Water Until it Tastes of Salt,' Facebook event page displaying 'Event by Jamie Burkart', July 14, 2007.",
    supportsGenerally: [
      "an invitation into a found-material, bicycle-powered river expedition"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-2010",
    title: "The Night Walk with Jamie Burkart",
    publishedAt: "2010-04-17",
    canonicalUrl: "https://www.facebook.com/events/1090550714295009/",
    publicCitation:
      "'The Night Walk with Jamie Burkart,' Facebook event page displaying 'Event by Jamie Burkart', April 17, 2010.",
    supportsGenerally: [
      "a participatory journey using walking as a structure for shared attention to place"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
    title: "SUNDAY DINNER Turns 100!",
    publishedAt: "2014-03-09",
    canonicalUrl: "https://www.facebook.com/events/702417306475691/",
    publicCitation:
      "'SUNDAY DINNER Turns 100!,' Facebook event page displaying 'Event by Jamie Burkart', March 9, 2014.",
    supportsGenerally: [
      "the longevity of a recurring participatory hospitality format"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-2014",
    title: "Sunday Dinner NYC Week 5",
    publishedAt: "2014-11-23",
    canonicalUrl: "https://www.facebook.com/events/653082538122515/",
    publicCitation:
      "'Sunday Dinner NYC Week 5,' Facebook event page displaying 'Event by Jamie Burkart', November 23, 2014.",
    supportsGenerally: [
      "a recurring eight-week New York City dinner rotation with a changing host place"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017",
    title: "Why I March: Sunday Dinner Potluck, Sign Making, Costumes!",
    publishedAt: "2017-01-15",
    canonicalUrl: "https://www.facebook.com/events/1416424718368443/",
    publicCitation:
      "'Why I March: Sunday Dinner Potluck, Sign Making, Costumes!,' Facebook event page displaying 'Event by Jamie Burkart', January 15, 2017.",
    supportsGenerally: [
      "a civic-learning and public-making event joining hospitality, discussion, and sign making"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-2017",
    title: "Movie Club: HyperNormalisation BBC Doc / Brexit, Trump & Syria",
    publishedAt: "2017-02-01",
    canonicalUrl: "https://www.facebook.com/events/278687849214415/",
    publicCitation:
      "'Movie Club: HyperNormalisation BBC Doc / Brexit, Trump & Syria,' Facebook event page displaying 'Event by Jamie Burkart', February 1, 2017.",
    supportsGenerally: [
      "a public documentary screening and discussion format for collective civic learning"
    ]
  }
] as const;

const selectedHostedEventSourceIds = selectedHostedEventSources.map(
  (source) => source.id
);

const micropopPostedDestinationSources = [
  {
    id: "SRC-MICROPOP-POSTED-IMAGINED-COMMUNITIES",
    title: "Imagined Communities posted destination",
    organization: "Wikipedia",
    preservationStatus: "live",
    canonicalUrl: "https://en.wikipedia.org/wiki/Imagined_Communities",
    publicCitation:
      "Wikipedia, 'Imagined Communities,' a destination posted in the 2007 Micropop event description.",
    publicNote:
      "The destination was recovered from the public event description and remained live on July 14, 2026. Its contents do not independently establish the event's purpose, Jamie's authorship, or participant use.",
    supportsGenerally: [
      "a public research destination recovered from the Micropop event description"
    ]
  },
  {
    id: "SRC-MICROPOP-POSTED-LASTFM-FAN-GRAPH",
    title: "Soophie Nun Squad Last.fm fan-graph posted destination",
    organization: "Last.fm",
    preservationStatus: "dead",
    canonicalUrl: "http://www.last.fm/music/Soophie+Nun+Squad/+fans",
    publicCitation:
      "Last.fm Soophie Nun Squad fan-graph URL, a destination posted in the 2007 Micropop event description.",
    publicNote:
      "The exact posted URL redirected to a current 404 response on July 14, 2026. It is retained as a historical research route, not as recovered destination content.",
    supportsGenerally: [
      "a historical public research destination recovered from the Micropop event description"
    ]
  },
  {
    id: "SRC-MICROPOP-POSTED-KCDIY",
    title: "KCDIY.org posted destination",
    organization: "KCDIY.org",
    preservationStatus: "dead",
    canonicalUrl: "http://kcdiy.org/",
    publicCitation:
      "KCDIY.org, a destination posted in the 2007 Micropop event description.",
    publicNote:
      "The exact posted domain did not resolve during the July 14, 2026 review. It is retained as a historical research route, not as recovered destination content.",
    supportsGenerally: [
      "a historical public research destination recovered from the Micropop event description"
    ]
  }
] as const;

const micropopPostedDestinationSourceIds = micropopPostedDestinationSources.map(
  (source) => source.id
);

export const personalWowlistFacebookEventIntake = [
  {
    id: "INTAKE-2026-07-14-PERSONAL-WOWLIST-FACEBOOK-EVENTS",
    receivedAt: "2026-07-14",
    kind: "memory",
    project: "participatory-public-practice",
    publicSummary:
      "Jamie identifies public event-making, hospitality, place-based participation, cultural production, and civic learning as a recurring practice. This pass accounts for the complete currently visible event surfaces on his personal Facebook profile and WOW List Page while keeping platform association, displayed host attribution, participation, attendance, and impact distinct.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: [
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
      "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
      "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
      "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
      ...selectedHostedEventSourceIds,
      ...micropopPostedDestinationSourceIds
    ],
    claimIds: [
      "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
      "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
      "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
      "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      "CLM-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED-2026"
    ],
    researchInquiryIds: [
      "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026",
      "INQ-WOWLIST-FACEBOOK-EVENTS-2026"
    ],
    projectionIntent: "bank-only",
    nextActions: [
      "Seek a native Meta export or equivalent account record to test whether deleted, hidden, renamed, or otherwise unavailable event records extend beyond the current surfaces.",
      "Request collaborator confirmation before assigning event-level production credit beyond the displayed host labels and public event text.",
      "Continue source discovery from selected event descriptions without treating a posted destination as corroboration, readership, endorsement, attendance, or impact."
    ],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
  },
  {
    id: "INTAKE-2026-07-14-MICROPOP-POSTED-DESTINATIONS",
    receivedAt: "2026-07-14",
    kind: "source-url",
    project: "participatory-public-practice",
    publicSummary:
      "The 2007 Micropop event description posted three public destinations concerning imagined communities, a Last.fm fan graph, and KCDIY.org. They are retained as research routes with separate access states, not as automatic corroboration or proof of participant use.",
    privacy: "public",
    status: "triaged",
    sourceIds: micropopPostedDestinationSourceIds,
    claimIds: [],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    projectionIntent: "bank-only",
    nextActions: [
      "Use the live Wikipedia destination only for appropriately scoped intellectual context after source-quality review.",
      "Search archives for the dead Last.fm fan-graph and KCDIY.org destinations before making claims about their 2007 content.",
      "Do not infer participant readership, endorsement, attendance, conversion, reach, or impact from a posted destination."
    ],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies IntakeRecord[];

export const personalWowlistFacebookEventSources = [
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
    title: "Jamie Burkart Facebook events surface",
    kind: "personal-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/jburkart/events/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart Facebook events surface, authenticated terminal-scroll review conducted July 14, 2026.",
    publicNote:
      "Two terminal traversals exposed the same 502 distinct event IDs. Twenty cards displayed Jamie as host and 482 displayed another host.",
    supportsGenerally: [
      "502 distinct current event associations",
      "an exact 502-ID second-pass match",
      "20 cards displaying Jamie as host and 482 displaying another host"
    ],
    doesNotEstablish: [
      "attendance, endorsement, participation, production, authorship, or professional significance",
      "a complete history of every event ever associated with the account"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
    title: "Jamie Burkart Facebook event-association population run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata for a July 2026 full-scroll control pass over Jamie Burkart's current Facebook event associations.",
    publicNote:
      "The public repository retains aggregate accounting only. The 502 record-level associations, other host names, relationship context, and raw capture remain protected.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-EVENT-ASSOCIATIONS-2026-001",
    supportsGenerally: [
      "502 visible association records",
      "20 associations displaying Jamie as host and 482 displaying another host",
      "295 distinct displayed host labels including unresolved labels",
      "exact agreement between two authenticated traversals"
    ],
    doesNotEstablish: [
      "attendance, endorsement, participation, production, or authorship",
      "professional significance of any association",
      "a platform export or deleted historical events"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
    title: "Jamie Burkart Facebook hosted-event population accounting run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata for a July 2026 record-level accounting of Jamie Burkart's Facebook hosted-event control.",
    publicNote:
      "The repository retains aggregate accounting for both personal profile tabs. The Past events surface exposed 502 IDs; the separate hosted-events tab exposed 21 IDs, all recovered, with 18 overlaps and 505 distinct IDs across both tabs. Sixteen hosted-tab cards displayed Jamie as host and five displayed another host. Raw descriptions, addresses, guest and relationship context, and mutable unlabeled numeric displays remain protected.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001",
    supportsGenerally: [
      "all 21 current hosted-events-tab records recovered",
      "18 overlaps and 505 distinct IDs across the 502-record Past events surface and 21-record hosted-events tab",
      "16 hosted-tab cards displaying Jamie as host and five displaying another host",
      "a hosted-tab range from December 2006 through February 2019"
    ],
    doesNotEstablish: [
      "why Facebook places each record on the hosted-events tab",
      "sole production or authorship of every event",
      "attendance, reach, endorsement, causality, or impact"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
    title: "Jamie Burkart Facebook displayed-host practice accounting run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata for a July 2026 review of 20 Past events cards displaying 'Event by Jamie Burkart'.",
    publicNote:
      "The repository retains an aggregate 20-row census, selected public pages, and one primary practice-form classification per card. Event IDs, nonselected titles and descriptions, locations, guest context, and mutable numeric displays remain protected.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-2026-001",
    supportsGenerally: [
      "the complete 20-card displayed-host subset on the Past events surface",
      "the December 2006 through February 2017 range",
      "the aggregate five-form and year classifications",
      "the bounded data-quality observation for mutable unlabeled numeric displays"
    ],
    doesNotEstablish: [
      "authorship or sole production of every event",
      "attendance, reach, endorsement, causality, or impact",
      "that the five primary forms are exclusive or exhaustive truths about the work"
    ]
  },
  ...selectedHostedEventSources.map((source) => ({
    ...source,
    kind: "personal-web-page" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14" as const,
    preferredPublicUrl: "canonical" as const,
    supportsGenerally: [...source.supportsGenerally],
    doesNotEstablish: [
      "authorship by the person named in Facebook's displayed 'Event by' label",
      "sole production of the event",
      "physical attendance, audience reach, endorsement, or impact",
      "the truth of every proposition in a posted destination"
    ]
  })),
  ...micropopPostedDestinationSources.map((source) => ({
    ...source,
    kind: "institutional-web-page" as const,
    visibility: "public" as const,
    accessedAt: "2026-07-14" as const,
    preferredPublicUrl: "canonical" as const,
    supportsGenerally: [...source.supportsGenerally],
    doesNotEstablish: [
      "that the destination's contents were read, adopted, endorsed, or used by participants",
      "the purpose, authorship, attendance, reach, or impact of the Micropop event"
    ]
  })),
  {
    id: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    title: "WOW List Facebook events surface",
    organization: "WOW List",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist/events/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOW List Facebook events surface, authenticated Page-management review conducted July 14, 2026.",
    publicNote:
      "While acting as the WOW List Page, the current event surface displayed 'No events to show' and exposed no numeric event records.",
    supportsGenerally: [
      "zero records displayed on the current WOW List Facebook event surface"
    ],
    doesNotEstablish: [
      "that WOW List never created, hosted, co-hosted, promoted, or was associated with a Facebook event",
      "that historical records were not deleted, hidden, or hosted from another account"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
    title: "WOW List Facebook historical-event recovery run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 bounded recovery search of WOW List Facebook event records.",
    publicNote:
      "Authenticated current and search surfaces, the 502-record personal association control, and bounded Wayback queries recovered no historical WOW List Facebook event record.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001",
    supportsGenerally: [
      "a bounded negative recovery finding",
      "zero WOW List matches in the current personal association control",
      "zero numeric records in authenticated Facebook event search"
    ],
    doesNotEstablish: [
      "that no WOW List Facebook event ever existed",
      "that an event was never deleted, hidden, renamed, or hosted from another account"
    ]
  }
] satisfies SourceRecord[];

export const personalWowlistFacebookEventClaims = [
  {
    id: "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
    project: "career-proof-system",
    internalClaim:
      "Two authenticated terminal traversals of Jamie's current personal Past events surface returned the same 502 event IDs. The separate hosted-events tab returned 21 records, 18 of which overlapped, for 505 distinct current IDs across both personal profile tabs.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The current personal profile event controls are fully accounted for: 502 Past events IDs and 21 hosted-tab IDs, with 18 overlaps and 505 distinct IDs. Platform association is not attendance, endorsement, authorship, production, or professional relevance.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
        relationship: "direct-support",
        supports: ["the 502-ID current Past events control and exact second-pass match"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
        relationship: "direct-support",
        supports: ["record-level deduplication and aggregate accounting"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
        relationship: "direct-support",
        supports: ["the 21 hosted-tab records, 18-record overlap, and 505-record union"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Association does not establish attendance, endorsement, participation, production, authorship, or professional significance.",
      "The Facebook-hosted tab is a platform classification, not a reliable authorship or sole-host roster.",
      "The current interface is not an official Facebook export and cannot reveal deleted or hidden historical records.",
      "The public repository retains aggregate counts rather than a record-level map of Jamie's personal and relational life."
    ],
    antiClaims: [
      "Jamie attended or produced all 505 distinct current records",
      "The current surface is every event ever associated with Jamie",
      "Displayed host clusters measure stakeholder engagement with Jamie"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
    project: "participatory-public-practice",
    internalClaim:
      "The July 2026 hosted-events-tab census recovered all 21 current records. Sixteen cards displayed Jamie as host and five displayed another host; 18 records also appeared in the 502-record Past events surface.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The Facebook hosted-events tab contains 21 recovered current records: 16 display Jamie as host, five display another host, and 18 overlap the Past events surface.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
        relationship: "direct-support",
        supports: ["all 21 hosted-tab records and their reconciliation with the Past events surface"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete accounting of the current tab does not mean every historical event page was recovered.",
      "Placement on Facebook's hosted-events tab does not establish authorship, sole production, or Jamie's role in every record.",
      "Displayed host attribution does not establish sole production."
    ],
    antiClaims: [
      "All 21 events were solely produced by Jamie",
      "The current control represents every event Jamie ever hosted",
      "Jamie alone produced every recovered event"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
    project: "participatory-public-practice",
    internalClaim:
      "Twenty cards on Jamie's current Past events surface display 'Event by Jamie Burkart.' Their 2006-2017 titles, dates, and selected close-read pages document recurring structures for cultural production, hospitality and care, participatory place and water work, civic learning and making, and networked public culture.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Twenty current event cards from 2006 through 2017 display Jamie as host and document recurring structures for cultural production, hospitality, place-based participation, civic learning, and networked public culture.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"]
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
      ...selectedHostedEventSources.map((source) => ({
        sourceId: source.id,
        relationship: "direct-support" as const,
        supports: [...source.supportsGenerally],
        confidence: "high" as const,
        renderCitation: false
      })),
      {
        sourceId: "SRC-PITCH-HUCK-FINN-2007",
        relationship: "corroborating" as const,
        supports: ["the raft expedition's public participatory context"],
        confidence: "high" as const,
        renderCitation: false
      },
      {
        sourceId: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15",
        relationship: "corroborating" as const,
        supports: ["the 8th Street Tunnel public-history context"],
        confidence: "high" as const,
        renderCitation: false
      }
    ],
    boundaries: [
      "Facebook's displayed 'Event by Jamie Burkart' label supports only that bounded platform attribution. Event titles, descriptions, and independent sources provide the separate basis for interpreting a recurring public event-making practice.",
      "The five primary forms are an interpretive classification, not mutually exclusive truths about the work.",
      "Host attribution is not sole production.",
      "Do not convert mutable unlabeled numeric displays or page counts into attendance, reach, endorsement, causality, or impact."
    ],
    antiClaims: [
      "Jamie alone produced every recovered event",
      "All 502 associated events were Jamie's projects",
      "Facebook event-card numeric displays measure attendance or impact"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    project: "wowlist",
    internalClaim:
      "WOW List's current Facebook event surface displayed zero event records in July 2026.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The current WOW List Facebook event surface displayed zero records in the authenticated July 2026 control.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"]
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
      "Not recovered does not mean did not exist.",
      "This finding does not characterize WOW List's own platform, public posts, organizer use, or community activity."
    ],
    antiClaims: [
      "WOW List never had a Facebook event",
      "WOW List had no event community",
      "The Facebook control measures WOW List's platform activity"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED-2026",
    project: "wowlist",
    internalClaim:
      "No historical WOW List Facebook event record was recovered from the bounded July 2026 Facebook, personal-control, and Wayback search.",
    status: "not-recovered",
    projections: [
      {
        key: "archive-note",
        text:
          "A bounded historical search recovered no WOW List Facebook event record. This is a negative search result, not a historical conclusion.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
        relationship: "direct-support",
        supports: ["the bounded historical non-recovery"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "No record recovered in this bounded search does not establish that no event ever existed.",
      "Deleted, hidden, renamed, co-hosted, or other-account records may not appear in the tested surfaces.",
      "This finding does not characterize WOW List's own platform, public posts, organizer use, or community activity."
    ],
    antiClaims: [
      "WOW List never had a Facebook event",
      "WOW List had no event community",
      "The Facebook control measures WOW List's platform activity"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const personalWowlistFacebookEventInquiries = [
  {
    id: "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026",
    project: "participatory-public-practice",
    question:
      "What can the complete current personal Past events and hosted-events surfaces establish about Jamie's event-making practice without exposing personal relationships or converting platform association into attendance?",
    methods: [
      "Claimed Jamie's authenticated Facebook tab and terminal-scrolled the personal event surface to a stable state.",
      "Deduplicated every numeric event link and repeated the full traversal, obtaining the same 502-ID set with no additions or omissions.",
      "Separated 20 cards displaying Jamie as host from 482 cards displaying another host.",
      "Traversed the separate hosted-events tab to terminal state and recovered all 21 current records.",
      "Reconciled the two tabs: 18 overlapping IDs and 505 distinct IDs across the 502-record Past events surface and 21-record hosted-events tab.",
      "Separated 20 Past events cards displaying Jamie as host and close-read selected professionally relevant public pages while excluding guest identities, relationship context, comments, exact private locations, account administration, and authentication material.",
      "Classified the 20 displayed-host cards by year and one primary practice form while retaining the classification as interpretive.",
      "Recorded selected posted destinations as source routes rather than automatic corroboration.",
      "Compared mission-relevant event pages with existing independent reporting on the raft and 8th Street Tunnel work.",
      "Retained aggregate controls and selected public professional sources while keeping the raw personal association population protected."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "Two authenticated traversals returned the same 502 distinct event IDs.",
      "Twenty association cards displayed Jamie as host and 482 displayed another host; 295 distinct host labels appeared across the current surface.",
      "The separate hosted-events tab contains 21 recovered records: 16 display Jamie as host and five display another host.",
      "Eighteen hosted-tab records overlap the Past events surface, producing 505 distinct current IDs across both tabs.",
      "The 20 Past events cards displaying Jamie as host span December 2006 through February 2017.",
      "Primary-form classification yields seven cultural performance and production events, four recurring hospitality and care events, four participatory place, travel, and water events, three networked culture and public history events, and two civic learning and making events.",
      "Selected pages document event structures connecting networked music culture, public history, river travel, night walking, recurring dinners, sign making, and documentary discussion.",
      "Micropop routed participants toward Imagined Communities, a Last.fm fan graph, and KCDIY.org; these links are research routes, not automatic corroboration.",
      "Unlabeled numeric displays appeared inconsistently across authenticated renders and therefore remain non-summable data-quality context rather than traction or attendance evidence."
    ],
    limitations: [
      "The authenticated interface is not an official Facebook export.",
      "The current association surface cannot reveal deleted or hidden historical records.",
      "Facebook's hosted-events-tab membership does not explain authorship, co-hosting, administrative history, or production responsibility.",
      "Facebook association does not establish attendance, endorsement, participation, authorship, production, or professional significance.",
      "Facebook host attribution does not establish sole production or erase collaborators, performers, venues, and participants.",
      "The accessible event text did not consistently expose a label for the mutable numeric displays; they do not establish unique people, attendance, reach, endorsement, causality, or impact.",
      "Raw association rows, guest identities, relationship context, exact private locations, comments, and authentication data remain outside the public repository."
    ],
    sourceIds: [
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
      "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
      "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
      ...selectedHostedEventSourceIds,
      ...micropopPostedDestinationSourceIds,
      "SRC-PITCH-HUCK-FINN-2007",
      "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15"
    ],
    publicSummary:
      "The current personal event controls are fully accounted for at 502 Past events IDs and 21 hosted-tab IDs, with 18 overlaps and 505 distinct current records. Twenty Past events cards display 'Event by Jamie Burkart'; their titles, descriptions, selected pages, and independent context sources document a recurring event-making practice without converting personal associations or mutable platform displays into professional proof.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001"
  },
  {
    id: "INQ-WOWLIST-FACEBOOK-EVENTS-2026",
    project: "wowlist",
    question:
      "Can any current or historical WOW List Facebook event record be recovered without confusing non-recovery with nonexistence?",
    methods: [
      "Switched the authenticated Facebook identity into WOW List Page management and inspected the full current event surface.",
      "Confirmed that the current page displayed 'No events to show' and exposed zero numeric event records.",
      "Searched Facebook events for WOW List and checked the 502-record personal association control for WOW List title or host matches.",
      "Ran bounded Wayback CDX queries over current and legacy Page-event URL patterns.",
      "Recorded each zero or timeout disposition without inferring historical nonexistence."
    ],
    runAt: "2026-07-14",
    resultStatus: "not-recovered",
    findings: [
      "The authenticated current WOW List event surface displayed zero event records.",
      "Facebook event search exposed zero numeric event records for the exact project name.",
      "The current 502-record personal association control contained zero WOW List title or displayed-host matches.",
      "Three bounded Wayback patterns returned no captures and one legacy pattern timed out."
    ],
    limitations: [
      "Current zero display and bounded historical non-recovery do not establish that no WOW List Facebook event ever existed.",
      "Deleted, hidden, renamed, co-hosted, or other-account records may not appear in the tested surfaces.",
      "This control says nothing about WOW List's own platform events, public posts, organizer use, or community activity."
    ],
    sourceIds: [
      "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026"
    ],
    publicSummary:
      "The current WOW List Facebook event surface displayed zero records, and a bounded historical search recovered none. The result is non-recovery, not proof of nonexistence.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001"
  }
] satisfies ResearchInquiry[];

export const personalWowlistFacebookEventsBatch: PersonalWowlistFacebookEventsBatch = {
  intakeRecords: personalWowlistFacebookEventIntake,
  sources: personalWowlistFacebookEventSources,
  claims: personalWowlistFacebookEventClaims,
  researchInquiries: personalWowlistFacebookEventInquiries
};
