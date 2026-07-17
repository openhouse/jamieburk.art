import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const primaryIntakeId = "INT-2026-07-14-FB-PERSONAL-WOWLIST-EVENTS";
const postedUrlsIntakeId = "INT-2026-07-14-FB-MICROPOP-POSTED-URLS";

const selectedDisplayedHostEvents = [
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006",
    title: "Musicians for a Semantic Web",
    publishedAt: "2006-12-02",
    canonicalUrl: "https://www.facebook.com/events/10153308288768593/",
    projectIds: ["personal-public-record"],
    supportsGenerally: [
      "an early public event connecting music, networked culture, and collaborative discussion"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007",
    title: "Pirate Trolley-In!!",
    publishedAt: "2007-01-06",
    canonicalUrl: "https://www.facebook.com/events/10155459481930035/",
    projectIds: ["personal-public-record"],
    supportsGenerally: [
      "a participatory public-history event centered on Kansas City's 8th Street Trolley Tunnel"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-MICROPOP-2007",
    title: "Micropop: Nation-Scenes",
    publishedAt: "2007-01-25",
    canonicalUrl: "https://www.facebook.com/events/10153329249353169/",
    projectIds: ["personal-public-record"],
    supportsGenerally: [
      "a networked-culture discussion routed toward Imagined Communities, a Last.fm fan graph, and KCDIY.org"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007",
    title: "Release Yourself onto the Water Until it Tastes of Salt",
    publishedAt: "2007-07-14",
    canonicalUrl: "https://www.facebook.com/events/10153218027900549/",
    projectIds: ["personal-public-record", "water-publics"],
    supportsGenerally: [
      "an invitation into a found-material, bicycle-powered river expedition"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-2010",
    title: "The Night Walk with Jamie Burkart",
    publishedAt: "2010-04-17",
    canonicalUrl: "https://www.facebook.com/events/1090550714295009/",
    projectIds: ["personal-public-record"],
    supportsGenerally: [
      "a participatory journey using walking as a structure for shared attention to place"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
    title: "SUNDAY DINNER Turns 100!",
    publishedAt: "2014-03-09",
    canonicalUrl: "https://www.facebook.com/events/702417306475691/",
    projectIds: ["personal-public-record", "196-sunday-dinner"],
    supportsGenerally: [
      "the longevity of a recurring participatory hospitality format"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-2014",
    title: "Sunday Dinner NYC Week 5",
    publishedAt: "2014-11-23",
    canonicalUrl: "https://www.facebook.com/events/653082538122515/",
    projectIds: ["personal-public-record", "196-sunday-dinner"],
    supportsGenerally: [
      "a recurring eight-week New York City dinner rotation with a changing host place"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017",
    title: "Why I March: Sunday Dinner Potluck, Sign Making, Costumes!",
    publishedAt: "2017-01-15",
    canonicalUrl: "https://www.facebook.com/events/1416424718368443/",
    projectIds: ["personal-public-record", "196-sunday-dinner"],
    supportsGenerally: [
      "a civic-learning and public-making event joining hospitality, discussion, and sign making"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-2017",
    title: "Movie Club: HyperNormalisation BBC Doc / Brexit, Trump and Syria",
    publishedAt: "2017-02-01",
    canonicalUrl: "https://www.facebook.com/events/278687849214415/",
    projectIds: ["personal-public-record", "196-sunday-dinner"],
    supportsGenerally: [
      "a public documentary screening and discussion format for collective civic learning"
    ]
  }
] as const;

const selectedDisplayedHostSourceIds = selectedDisplayedHostEvents.map(
  (source) => source.id
);

const controlSourceIds = [
  "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
  "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
  "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
  "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
  "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
  "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026"
] as const;

const postedDestinationSourceIds = [
  "SRC-MICROPOP-POSTED-IMAGINED-COMMUNITIES",
  "SRC-MICROPOP-POSTED-LASTFM-FAN-GRAPH",
  "SRC-MICROPOP-POSTED-KCDIY"
] as const;

const claimIds = [
  "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
  "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
  "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
  "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
  "CLM-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED-2026"
] as const;

export const personalWowlistFacebookEventIntakes = [
  {
    id: primaryIntakeId,
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription:
      "Complete current-surface accounting for Jamie Burkart's personal Facebook Past and Hosted event controls, plus a bounded current and historical recovery pass for WOW List events.",
    projectIds: [
      "personal-public-record",
      "wowlist",
      "196-sunday-dinner",
      "water-publics"
    ],
    entityIds: [],
    dateHints: ["2006-12", "2019-02", "2026-07-14"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: [
      ...controlSourceIds,
      ...selectedDisplayedHostSourceIds
    ],
    claimIds: [...claimIds],
    inquiryIds: [
      "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026",
      "INQ-WOWLIST-FACEBOOK-EVENTS-2026"
    ],
    protectedLocatorId: "RESEARCH-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026-001"
  },
  {
    id: postedUrlsIntakeId,
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription:
      "Three public destinations posted in the 2007 Micropop event description, retained as research routes rather than corroboration or evidence of participant use.",
    submittedUrl: "https://en.wikipedia.org/wiki/Imagined_Communities",
    projectIds: ["personal-public-record"],
    entityIds: [],
    dateHints: ["2007-01-25", "2026-07-14"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: [...postedDestinationSourceIds],
    claimIds: [],
    inquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"]
  }
] satisfies IntakeItem[];

const selectedDisplayedHostSources = selectedDisplayedHostEvents.map(
  (source) => ({
    ...source,
    projectIds: [...source.projectIds],
    organization: "Facebook",
    kind: "institutional-social-post" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14" as const,
    preferredPublicUrl: "canonical" as const,
    publicCitation: `${source.title}, Facebook event page displaying "Event by Jamie Burkart," ${source.publishedAt}.`,
    publicNote:
      "Facebook's displayed host label is a bounded platform attribution, not author metadata or proof of sole production.",
    intakeIds: [primaryIntakeId],
    reviewStatus: "reviewed" as const,
    reviewDepth: "close-reading" as const,
    reviewedAt: "2026-07-14" as const,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
    supportsGenerally: [...source.supportsGenerally],
    doesNotEstablish: [
      "authorship by the person named in Facebook's displayed host label",
      "sole production of the event",
      "physical attendance, audience reach, endorsement, or impact",
      "the truth of every proposition in a posted destination"
    ]
  })
);

export const personalWowlistFacebookEventSources = [
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
    title: "Jamie Burkart Facebook Past events surface",
    organization: "Facebook",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/jburkart/events/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart Facebook Past events surface, authenticated terminal-scroll review conducted July 14, 2026.",
    publicNote:
      "Two terminal traversals exposed the same 502 distinct event IDs; 20 cards displayed Jamie as host and 482 displayed another host.",
    locator: "Current authenticated Past events control; aggregate repository record only",
    projectIds: ["personal-public-record"],
    intakeIds: [primaryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
    supportsGenerally: [
      "502 distinct current Past events associations",
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
    title: "Jamie Burkart Facebook Past event population run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata for a July 2026 full-scroll control pass over Jamie Burkart's current Facebook Past event associations.",
    publicNote:
      "The 502 record-level associations, other host names, relationship context, and raw capture remain protected.",
    locator: "Protected record-level population run; public-safe aggregate in docs/knowledge-bank/data",
    projectIds: ["personal-public-record"],
    intakeIds: [primaryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
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
    ],
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-EVENT-ASSOCIATIONS-2026-001"
  },
  {
    id: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
    title: "Jamie Burkart Facebook Hosted event population run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata for a July 2026 accounting of Jamie Burkart's Facebook Hosted event control.",
    publicNote:
      "The Hosted tab exposed 21 records, with 18 overlaps and 505 distinct IDs across both personal tabs; 16 Hosted cards displayed Jamie as host and five displayed another host.",
    locator: "Protected Hosted-tab population run; public-safe aggregate in docs/knowledge-bank/data",
    projectIds: ["personal-public-record"],
    intakeIds: [primaryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
    supportsGenerally: [
      "all 21 current Hosted-tab records recovered",
      "18 overlaps and 505 distinct IDs across the 502-record Past surface and 21-record Hosted tab",
      "16 Hosted-tab cards displaying Jamie as host and 5 displaying another host",
      "a Hosted-tab range from December 2006 through February 2019"
    ],
    doesNotEstablish: [
      "why Facebook places each record on the Hosted tab",
      "sole production or authorship of every event",
      "attendance, reach, endorsement, causality, or impact"
    ],
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001"
  },
  {
    id: "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
    title: "Jamie Burkart Facebook displayed-host event practice run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata for a July 2026 review of 20 Past event cards displaying Jamie as host.",
    publicNote:
      "The repository retains an anonymous 20-row census, selected public pages, and one interpretive primary-form classification per card.",
    locator: "Protected displayed-host corpus; anonymous aggregate census in docs/knowledge-bank",
    projectIds: ["personal-public-record"],
    intakeIds: [primaryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
    supportsGenerally: [
      "the complete 20-card displayed-host subset on the Past events surface",
      "the December 2006 through February 2017 range",
      "the aggregate five-form and year classifications",
      "a bounded data-quality observation for mutable unlabeled numeric displays"
    ],
    doesNotEstablish: [
      "authorship or sole production of every event",
      "attendance, reach, endorsement, causality, or impact",
      "that the five primary forms are exclusive or exhaustive truths about the work"
    ],
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-2026-001"
  },
  ...selectedDisplayedHostSources,
  {
    id: "SRC-MICROPOP-POSTED-IMAGINED-COMMUNITIES",
    title: "Imagined Communities posted destination",
    organization: "Wikipedia",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://en.wikipedia.org/wiki/Imagined_Communities",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Wikipedia, Imagined Communities, a destination posted in the 2007 Micropop event description.",
    publicNote:
      "The destination remained live on July 14, 2026; its content does not independently establish the event's purpose or participant use.",
    locator: "URL recovered from the close-read Micropop event description",
    projectIds: ["personal-public-record"],
    intakeIds: [postedUrlsIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "metadata",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival review"],
    supportsGenerally: [
      "a live public research destination recovered from the Micropop event description"
    ],
    doesNotEstablish: [
      "that participants read, adopted, endorsed, or used the destination",
      "the event's authorship, attendance, reach, or impact"
    ]
  },
  {
    id: "SRC-MICROPOP-POSTED-LASTFM-FAN-GRAPH",
    title: "Soophie Nun Squad Last.fm fan-graph posted destination",
    organization: "Last.fm",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "dead",
    accessedAt: "2026-07-14",
    canonicalUrl: "http://www.last.fm/music/Soophie+Nun+Squad/+fans",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Last.fm Soophie Nun Squad fan-graph URL, a destination posted in the 2007 Micropop event description.",
    publicNote:
      "The exact posted URL returned HTTP 404 on July 14, 2026 and is retained as a historical research route.",
    locator: "URL recovered from the close-read Micropop event description",
    projectIds: ["personal-public-record"],
    intakeIds: [postedUrlsIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "metadata",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival review"],
    supportsGenerally: [
      "a dead historical research destination recovered from the Micropop event description"
    ],
    doesNotEstablish: [
      "the historical contents of the unavailable destination",
      "participant readership, endorsement, attendance, reach, or impact"
    ]
  },
  {
    id: "SRC-MICROPOP-POSTED-KCDIY",
    title: "KCDIY.org posted destination",
    organization: "KCDIY.org",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "dead",
    accessedAt: "2026-07-14",
    canonicalUrl: "http://kcdiy.org/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KCDIY.org, a destination posted in the 2007 Micropop event description.",
    publicNote:
      "The exact posted domain did not resolve on July 14, 2026 and is retained as a historical research route.",
    locator: "URL recovered from the close-read Micropop event description",
    projectIds: ["personal-public-record"],
    intakeIds: [postedUrlsIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "metadata",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival review"],
    supportsGenerally: [
      "a dead historical research destination recovered from the Micropop event description"
    ],
    doesNotEstablish: [
      "the historical contents of the unavailable destination",
      "participant readership, endorsement, attendance, reach, or impact"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    title: "WOW List Facebook event surfaces",
    organization: "WOW List",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist/events/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOW List Facebook event surfaces, authenticated Page-management review conducted July 14, 2026.",
    publicNote:
      "The public events route displayed no records, and the Page's authenticated Hosted/Past control also displayed none.",
    locator: "Current public events route and authenticated Page-management Hosted/Past control",
    projectIds: ["wowlist"],
    intakeIds: [primaryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
    supportsGenerally: [
      "zero records displayed on the current WOW List Facebook event surfaces"
    ],
    doesNotEstablish: [
      "that WOW List never created, hosted, co-hosted, promoted, or was associated with a Facebook event",
      "that historical records were not deleted, hidden, renamed, or hosted from another account"
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
      "Current and search surfaces, the 502-record personal control, and bounded Wayback queries recovered no historical WOW List Facebook event record.",
    locator: "Protected bounded recovery run; public-safe findings in research note",
    projectIds: ["wowlist"],
    intakeIds: [primaryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
    supportsGenerally: [
      "a bounded negative recovery finding",
      "zero WOW List matches in the current personal Past event control",
      "zero numeric records in authenticated Facebook event search"
    ],
    doesNotEstablish: [
      "that no WOW List Facebook event ever existed",
      "that an event was never deleted, hidden, renamed, or hosted from another account"
    ],
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001"
  }
] satisfies SourceRecord[];

export const personalWowlistFacebookEventClaims = [
  {
    id: "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
    project: "personal-public-record",
    claimType: "metric",
    internalClaim:
      "Two authenticated terminal traversals of Jamie's current personal Past events surface returned the same 502 event IDs.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "The current personal Past events control is fully accounted for at 502 IDs, with an exact second-pass match.",
        status: "hold",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/research/personal-wowlist-facebook-events-archival-production-2026-07"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
        relationship: "direct-support",
        supports: ["the 502-ID current Past events control"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
        relationship: "private-support",
        supports: ["record-level deduplication and exact second-pass agreement"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Association does not establish attendance, endorsement, participation, production, authorship, or professional significance.",
      "The current interface is not an official Facebook export and cannot reveal deleted or hidden historical records."
    ],
    antiClaims: [
      "Jamie attended or produced all 502 current associations",
      "The current surface contains every event ever associated with Jamie",
      "Displayed host clusters measure stakeholder engagement with Jamie"
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
    project: "personal-public-record",
    claimType: "metric",
    internalClaim:
      "Facebook's current Hosted tab exposed 21 records, including 18 overlaps with the Past surface, for 505 distinct IDs across both personal controls.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "The Hosted tab contains 21 recovered records; 18 overlap the Past surface, producing 505 distinct IDs across both controls.",
        status: "hold",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/research/personal-wowlist-facebook-events-archival-production-2026-07"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
        relationship: "private-support",
        supports: ["all 21 Hosted-tab records and their reconciliation with the Past surface"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The Hosted tab is a platform classification, not a reliable authorship or sole-host roster.",
      "Sixteen Hosted cards displayed Jamie as host and five displayed another host."
    ],
    antiClaims: [
      "All 21 Hosted-tab events were solely produced by Jamie",
      "The current controls represent every event Jamie ever hosted",
      "Placement on the Hosted tab proves authorship"
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
    project: "personal-public-record",
    claimType: "activity",
    internalClaim:
      "Twenty current Past event cards displaying Jamie as host document a 2006-2017 practice spanning cultural production, hospitality, place-based participation, networked public culture, and civic learning.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "Twenty current event cards from 2006 through 2017 display Jamie as host and document recurring structures for cultural production, hospitality, place-based participation, civic learning, and networked public culture.",
        status: "hold",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/research/personal-wowlist-facebook-events-archival-production-2026-07"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
        relationship: "private-support",
        supports: ["the complete displayed-host subset and five-form classification"],
        confidence: "high",
        renderCitation: false
      },
      ...selectedDisplayedHostSourceIds.map((sourceId) => ({
        sourceId,
        relationship: "direct-support" as const,
        supports: ["a selected public event plot point within the recurring practice"],
        confidence: "high" as const,
        renderCitation: false
      })),
    ],
    boundaries: [
      "Facebook's displayed host label supports only that bounded platform attribution; event descriptions and independent sources provide the separate basis for interpreting a recurring practice.",
      "The five primary forms are interpretive classifications, not exclusive or exhaustive truths.",
      "Host attribution is not sole production, and mutable response displays are not attendance, reach, endorsement, causality, or impact."
    ],
    antiClaims: [
      "Jamie alone produced every recovered event",
      "All 502 associated events were Jamie's projects",
      "Facebook event-card numeric displays measure attendance or impact"
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    project: "wowlist",
    claimType: "negative-research-finding",
    internalClaim:
      "WOW List's current public and authenticated Page-management Facebook event surfaces displayed zero records on July 14, 2026.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "The current WOW List Facebook event surfaces displayed zero records in the authenticated July 2026 control.",
        status: "hold",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/research/personal-wowlist-facebook-events-archival-production-2026-07"]
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
      "This finding does not characterize WOW List's own platform, posts, organizer use, or community activity."
    ],
    antiClaims: [
      "WOW List never had a Facebook event",
      "WOW List had no event community",
      "The Facebook control measures WOW List's platform activity"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED-2026",
    project: "wowlist",
    claimType: "negative-research-finding",
    internalClaim:
      "No historical WOW List Facebook event record was recovered from the bounded July 2026 Facebook, personal-control, and Wayback search.",
    status: "not-recovered",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "A bounded historical search recovered no WOW List Facebook event record.",
        status: "hold",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/research/personal-wowlist-facebook-events-archival-production-2026-07"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
        relationship: "private-support",
        supports: ["the bounded historical non-recovery"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "No record recovered in this bounded search does not establish that no event ever existed.",
      "Deleted, hidden, renamed, co-hosted, or other-account records may not appear in the tested surfaces."
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

export const personalWowlistFacebookEventResearchInquiries = [
  {
    id: "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026",
    project: "personal-public-record",
    intakeIds: [primaryIntakeId, postedUrlsIntakeId],
    question:
      "What can the complete current personal Past and Hosted event surfaces establish about Jamie's event-making practice without exposing personal relationships or converting platform association into attendance?",
    methods: [
      "Terminal-scrolled the authenticated Past events surface to stability and deduplicated every numeric event link.",
      "Repeated the full Past traversal and obtained the same 502-ID set with no additions or omissions.",
      "Separated 20 cards displaying Jamie as host from 482 cards displaying another host.",
      "Traversed the separate Hosted tab to terminal state and recovered all 21 current records.",
      "Reconciled the controls at 18 overlapping IDs and 505 distinct IDs across both tabs.",
      "Close-read the complete 20-card displayed-Jamie-host subset and selected nine professionally relevant public pages for source nodes.",
      "Classified all 20 displayed-host cards by year and one primary practice form while retaining the classification as interpretive.",
      "Recorded posted destinations as source routes rather than automatic corroboration."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "Two authenticated Past traversals returned the same 502 distinct event IDs.",
      "Twenty Past cards displayed Jamie as host and 482 displayed another host, with 295 distinct displayed host labels including unresolved labels.",
      "The Hosted tab contains 21 recovered records: 16 display Jamie as host and 5 display another host.",
      "Eighteen Hosted records overlap the Past surface, producing 505 distinct current IDs across both tabs.",
      "The complete 20-card displayed-Jamie-host subset spans December 2006 through February 2017.",
      "Primary-form classification yields seven cultural production events, four hospitality and care events, four place, travel, and water events, three networked culture and public history events, and two civic learning and making events.",
      "Selected pages document networked music culture, public history, river travel, night walking, recurring dinners, sign making, and documentary discussion.",
      "Micropop routed participants toward Imagined Communities, a Last.fm fan graph, and KCDIY.org as research routes rather than automatic corroboration."
    ],
    limitations: [
      "The authenticated interface is not an official Facebook export and cannot reveal deleted or hidden records.",
      "Facebook association does not establish attendance, endorsement, participation, authorship, production, or professional significance.",
      "Hosted-tab membership and displayed host labels do not establish authorship, co-hosting history, sole production, or impact.",
      "Mutable event-card response displays are not unique people, attendance, reach, endorsement, causality, or impact.",
      "Raw association rows, guest identities, relationship context, exact private locations, comments, and authentication data remain outside the public repository."
    ],
    sourceIds: [
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
      "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
      "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026",
      ...selectedDisplayedHostSourceIds,
      ...postedDestinationSourceIds,
      "SRC-WATER-PITCH-HUCK-FINN-2007"
    ],
    publicSummary:
      "The current personal controls are fully accounted for at 502 Past IDs and 21 Hosted IDs, with 18 overlaps and 505 distinct records; the complete 20-card subset displaying Jamie as host documents a recurring event-making practice without converting associations or mutable platform displays into professional proof.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001"
  },
  {
    id: "INQ-WOWLIST-FACEBOOK-EVENTS-2026",
    project: "wowlist",
    intakeIds: [primaryIntakeId],
    question:
      "Can any current or historical WOW List Facebook event record be recovered without confusing non-recovery with nonexistence?",
    methods: [
      "Inspected the public WOW List event route and switched the authenticated identity into WOW List Page management.",
      "Confirmed that the Page's Hosted/Past event control displayed zero records.",
      "Searched Facebook events for the exact project name and checked the 502-record personal control for WOW List title or displayed-host matches.",
      "Ran bounded Wayback queries over current and legacy Page-event URL patterns.",
      "Recorded every zero or timeout disposition without inferring historical nonexistence."
    ],
    runAt: "2026-07-14",
    resultStatus: "not-recovered",
    findings: [
      "The current public and Page-management WOW List event surfaces displayed zero records.",
      "Exact Facebook event search exposed zero numeric event records for WOW List.",
      "The current 502-record personal Past control contained zero WOW List title or displayed-host matches.",
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
      "The current WOW List Facebook event surfaces displayed zero records, and a bounded historical search recovered none; the result is non-recovery, not proof of nonexistence.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001"
  }
] satisfies ResearchInquiry[];
