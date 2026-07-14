import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const selectedHostedEventSources = [
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006",
    title: "Musicians for a Semantic Web",
    publishedAt: "2006-12-02",
    canonicalUrl: "https://www.facebook.com/events/10153308288768593/",
    publicCitation:
      "Jamie Burkart, 'Musicians for a Semantic Web,' Facebook event, December 2, 2006.",
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
      "Jamie Burkart, 'Pirate Trolley-In!!,' Facebook event, January 6, 2007.",
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
      "Jamie Burkart, 'Micropop: Nation-Scenes,' Facebook event, January 25, 2007.",
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
      "Jamie Burkart, 'Release Yourself onto the Water Until it Tastes of Salt,' Facebook event, July 14, 2007.",
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
      "Jamie Burkart, 'The Night Walk with Jamie Burkart,' Facebook event, April 17, 2010.",
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
      "Jamie Burkart, 'SUNDAY DINNER Turns 100!,' Facebook event, March 9, 2014.",
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
      "Jamie Burkart, 'Sunday Dinner NYC Week 5,' Facebook event, November 23, 2014.",
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
      "Jamie Burkart, 'Why I March: Sunday Dinner Potluck, Sign Making, Costumes!,' Facebook event, January 15, 2017.",
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
      "Jamie Burkart, 'Movie Club: HyperNormalisation BBC Doc / Brexit, Trump & Syria,' Facebook event, February 1, 2017.",
    supportsGenerally: [
      "a public documentary screening and discussion format for collective civic learning"
    ]
  }
] as const;

const selectedHostedEventSourceIds = selectedHostedEventSources.map(
  (source) => source.id
);

export const personalWowlistFacebookEventIntake = [
  {
    id: "LEAD-PERSONAL-WOWLIST-FACEBOOK-EVENT-FULL-POPULATION-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for Jamie and WOW List Facebook events",
    summary:
      "Account for the complete currently visible personal event-association surface, the separate Jamie-hosted control, and WOW List's current event surface while preserving privacy and keeping association, host attribution, response signals, attendance, and impact distinct.",
    sourceUrl: "https://www.facebook.com/jburkart/events/",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: [
      "career-proof-system",
      "participatory-public-practice",
      "sunday-dinner-196",
      "great-accommodations",
      "wowlist"
    ],
    sourceIds: [
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
      "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
      "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
      ...selectedHostedEventSourceIds
    ],
    claimIds: [
      "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
      "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
      "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
      "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026"
    ],
    inquiryIds: [
      "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026",
      "INQ-WOWLIST-FACEBOOK-EVENTS-2026"
    ],
    notes: [
      "Two authenticated terminal traversals returned the same 502 personal event IDs: 20 cards displayed Jamie as host and 482 displayed another host.",
      "A separate 21-slot hosted-event control is fully dispositioned as 20 recovered pages and one unresolved historical slot.",
      "The current WOW List Page event surface displayed zero event records; bounded historical recovery found none. Not recovered does not mean did not exist.",
      "Raw association rows, guest identities, relationship context, exact private locations, comments, responses, account administration, and browser authentication remain outside the repository."
    ]
  }
] satisfies IntakeRecord[];

export const personalWowlistFacebookEventSources = [
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
    title: "Jamie Burkart Facebook events surface",
    author: "Jamie Burkart",
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
      "The repository retains a 21-slot aggregate census with 20 recovered hosted-event pages and one unresolved historical slot. Raw descriptions, addresses, guest and relationship context, and response displays remain protected.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001",
    supportsGenerally: [
      "all 21 current hosted-event control slots accounted for",
      "20 recovered hosted-event pages and one unresolved slot",
      "a recovered range from December 2006 through February 2017",
      "five recurring primary practice forms across the recovered pages"
    ],
    doesNotEstablish: [
      "the identity or content of the unresolved slot",
      "sole production or authorship of every event",
      "attendance, reach, endorsement, causality, or impact"
    ]
  },
  ...selectedHostedEventSources.map((source) => ({
    ...source,
    author: "Jamie Burkart",
    kind: "personal-web-page" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14" as const,
    preferredPublicUrl: "canonical" as const,
    supportsGenerally: [...source.supportsGenerally],
    doesNotEstablish: [
      "sole production of the event",
      "physical attendance, audience reach, endorsement, or impact",
      "the truth of every proposition in a posted destination"
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
      "Two authenticated terminal traversals of Jamie's current personal Facebook event surface returned the same 502 event IDs: 20 cards displayed Jamie as host and 482 displayed another host.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "The current 502-record association surface is fully accounted for, but association is not attendance, endorsement, authorship, production, or professional relevance.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
        relationship: "direct-support",
        supports: ["the 502-ID current control and exact second-pass match"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
        relationship: "direct-support",
        supports: ["record-level deduplication and aggregate accounting"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Association does not establish attendance, endorsement, participation, production, authorship, or professional significance.",
      "The current interface is not an official Facebook export and cannot reveal deleted or hidden historical records.",
      "The public repository retains aggregate counts rather than a record-level map of Jamie's personal and relational life."
    ],
    antiClaims: [
      "Jamie attended or produced all 502 associated events",
      "The current surface is every event ever associated with Jamie",
      "Displayed host clusters measure stakeholder engagement with Jamie"
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
    project: "participatory-public-practice",
    internalClaim:
      "The July 2026 hosted-event census accounts for a 21-slot control with 20 recovered event pages and one unresolved historical slot.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "The 21-slot Facebook hosted-event census contains 20 recovered pages and one unresolved historical slot.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
        relationship: "direct-support",
        supports: ["all 21 slot dispositions and the aggregate census"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete accounting means every current control slot has a recovered or unresolved disposition; it does not mean every historical event page was recovered.",
      "The unresolved slot cannot acquire an inferred title, date, host, or format.",
      "Host attribution does not establish sole production."
    ],
    antiClaims: [
      "All 21 event pages were recovered",
      "The current control represents every event Jamie ever hosted",
      "Jamie alone produced every recovered event"
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
    project: "participatory-public-practice",
    internalClaim:
      "Twenty recovered Facebook event pages hosted by Jamie from 2006 through 2017 document recurring structures for cultural production, hospitality and care, participatory place and water work, civic learning and making, and networked public culture.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "Twenty recovered hosted-event pages from 2006 through 2017 document recurring structures for cultural production, hospitality, place-based participation, civic learning, and networked public culture.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
        relationship: "direct-support",
        supports: ["the complete recovered population and five-form classification"],
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
        sourceId: "SRC-RAFT-PITCH-2007",
        relationship: "corroborating" as const,
        supports: ["the raft expedition's public participatory context"],
        confidence: "high" as const,
        renderCitation: false
      },
      {
        sourceId: "SRC-KCUR-8TH-STREET-TUNNEL-2016",
        relationship: "corroborating" as const,
        supports: ["the 8th Street Tunnel public-history context"],
        confidence: "high" as const,
        renderCitation: false
      }
    ],
    boundaries: [
      "Facebook host attribution supports Jamie's public event-making role; it does not establish sole production or erase collaborators, performers, venues, or participants.",
      "The five primary forms are an interpretive classification, not mutually exclusive truths about the work.",
      "Host attribution is not sole production.",
      "Do not convert response displays or page counts into attendance, reach, endorsement, causality, or impact."
    ],
    antiClaims: [
      "Jamie alone produced every recovered event",
      "All 502 associated events were Jamie's projects",
      "Facebook event responses measure attendance or impact"
    ],
    researchInquiryIds: [
      "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026",
      "INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL"
    ],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    project: "wowlist",
    internalClaim:
      "WOW List's current Facebook event surface displayed zero event records in July 2026; bounded historical recovery found none.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "The current WOW List Facebook event surface displayed zero records; bounded historical recovery found none. Not recovered is not did not exist.",
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
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
        relationship: "direct-support",
        supports: ["the bounded historical non-recovery"],
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
      "What can the complete current personal event-association surface and separate Jamie-hosted control establish about Jamie's event-making practice without exposing personal relationships or converting association into attendance?",
    methods: [
      "Claimed Jamie's authenticated Facebook tab and terminal-scrolled the personal event surface to a stable state.",
      "Deduplicated every numeric event link and repeated the full traversal, obtaining the same 502-ID set with no additions or omissions.",
      "Separated 20 cards displaying Jamie as host from 482 cards displaying another host.",
      "Used the separate 21-slot hosted-event control and assigned every slot a recovered or unresolved disposition.",
      "Opened and close-read all 20 recovered hosted-event pages while excluding guest identities, relationship context, comments, exact private locations, account administration, and authentication material.",
      "Classified the recovered pages by year and one primary practice form while retaining the classification as interpretive.",
      "Recorded selected posted destinations as source routes rather than automatic corroboration.",
      "Compared mission-relevant event pages with existing independent reporting on the raft and 8th Street Tunnel work.",
      "Retained aggregate controls and selected public professional sources while keeping the raw personal association population protected."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "Two authenticated traversals returned the same 502 distinct event IDs.",
      "Twenty association cards displayed Jamie as host and 482 displayed another host; 295 distinct host labels appeared across the current surface.",
      "All 21 hosted-event control slots are accounted for as 20 recovered pages and one unresolved slot.",
      "The recovered hosted pages span December 2006 through February 2017.",
      "Primary-form classification yields seven cultural performance and production events, four recurring hospitality and care events, four participatory place, travel, and water events, three networked culture and public history events, and two civic learning and making events.",
      "Selected pages document event structures connecting networked music culture, public history, river travel, night walking, recurring dinners, sign making, and documentary discussion.",
      "Micropop routed participants toward Imagined Communities, a Last.fm fan graph, and KCDIY.org; these links are research routes, not automatic corroboration.",
      "Response values appeared inconsistently across authenticated renders and therefore remain non-summable data-quality context rather than traction or attendance evidence."
    ],
    limitations: [
      "The authenticated interface is not an official Facebook export.",
      "The current association surface cannot reveal deleted or hidden historical records.",
      "One of 21 hosted-event control slots remains unresolved.",
      "Facebook association does not establish attendance, endorsement, participation, authorship, production, or professional significance.",
      "Facebook host attribution does not establish sole production or erase collaborators, performers, venues, and participants.",
      "Facebook response displays are unstable and do not establish unique people, attendance, reach, endorsement, causality, or impact.",
      "Raw association rows, guest identities, relationship context, exact private locations, comments, and authentication data remain outside the public repository."
    ],
    sourceIds: [
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
      "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
      ...selectedHostedEventSourceIds,
      "SRC-RAFT-PITCH-2007",
      "SRC-KCUR-8TH-STREET-TUNNEL-2016"
    ],
    publicSummary:
      "The current personal association surface is fully accounted for at 502 records, while the stronger 21-slot hosted-event control is dispositioned as 20 recovered pages and one unresolved slot. The recovered pages document a recurring event-making practice without converting personal associations or platform responses into professional proof.",
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

export const personalWowlistFacebookEventPublicationDecisions = [
  {
    id: "PUB-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
    claimId: "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
    decision: "reserve",
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"],
    rationale:
      "The denominator and semantic boundary are essential provenance, while a public hiring site should not foreground Jamie's personal association graph.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
    claimId: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
    decision: "reserve",
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"],
    rationale:
      "The population accounting is durable provenance, but census mechanics are not the clearest current hiring argument.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
    claimId: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
    decision: "reserve",
    audiences: [
      "future editors",
      "cultural-program collaborators",
      "participatory-design teams",
      "photo editors"
    ],
    surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"],
    rationale:
      "The event-making throughline is strong reserve depth for roles that value facilitation, hospitality systems, cultural production, civic learning, and place-based participation; it should not displace the current technical-operations composition without an audience-specific reason.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    claimId: "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    decision: "reserve",
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14"],
    rationale:
      "The negative control prevents future agents from inventing a Facebook event corpus; it is not a reader-facing accomplishment.",
    decidedAt: "2026-07-14"
  }
] satisfies PublicationDecision[];

export const personalWowlistFacebookEventProofCoverage = [] satisfies ProofCoverage[];
