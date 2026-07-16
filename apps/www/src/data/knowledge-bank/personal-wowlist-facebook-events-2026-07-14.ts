import type {
  ClaimRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchInquiry,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const intakeId = "INTAKE-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026";
const personalInquiryId = "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026";
const wowListInquiryId = "INQ-WOWLIST-FACEBOOK-EVENTS-2026";

const selectedHostedEventSources = [
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006",
    hostPropositionId: "PROP-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-HOST-2006",
    propositionId: "PROP-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006",
    supportTag: "event-networked-music-inquiry",
    title: "Musicians for a Semantic Web",
    publishedAt: "2006-12-02",
    canonicalUrl: "https://www.facebook.com/events/10153308288768593/",
    proposition: "The public event page documents a gathering connecting music, networked culture, and collaborative discussion."
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007",
    hostPropositionId: "PROP-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-HOST-2007",
    propositionId: "PROP-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007",
    supportTag: "event-participatory-public-history",
    title: "Pirate Trolley-In!!",
    publishedAt: "2007-01-06",
    canonicalUrl: "https://www.facebook.com/events/10155459481930035/",
    proposition: "The public event page documents a participatory public-history event centered on Kansas City's 8th Street Trolley Tunnel."
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-MICROPOP-2007",
    hostPropositionId: "PROP-JAMIE-FACEBOOK-EVENT-MICROPOP-HOST-2007",
    propositionId: "PROP-JAMIE-FACEBOOK-EVENT-MICROPOP-2007",
    supportTag: "event-networked-public-culture",
    title: "Micropop: Nation-Scenes",
    publishedAt: "2007-01-25",
    canonicalUrl: "https://www.facebook.com/events/10153329249353169/",
    proposition: "The public event page routes a networked-culture discussion through Imagined Communities, a Last.fm fan graph, and KCDIY.org."
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007",
    hostPropositionId: "PROP-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-HOST-2007",
    propositionId: "PROP-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007",
    supportTag: "event-participatory-river-expedition",
    title: "Release Yourself onto the Water Until it Tastes of Salt",
    publishedAt: "2007-07-14",
    canonicalUrl: "https://www.facebook.com/events/10153218027900549/",
    proposition: "The public event page invites participants into a found-material, bicycle-powered river expedition."
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-2010",
    hostPropositionId: "PROP-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-HOST-2010",
    propositionId: "PROP-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-2010",
    supportTag: "event-participatory-place-attention",
    title: "The Night Walk with Jamie Burkart",
    publishedAt: "2010-04-17",
    canonicalUrl: "https://www.facebook.com/events/1090550714295009/",
    proposition: "The public event page documents a participatory journey using walking as a structure for shared attention to place."
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
    hostPropositionId: "PROP-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-HOST-2014",
    propositionId: "PROP-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
    supportTag: "event-recurring-hospitality-longevity",
    title: "SUNDAY DINNER Turns 100!",
    publishedAt: "2014-03-09",
    canonicalUrl: "https://www.facebook.com/events/702417306475691/",
    proposition: "The public event page documents the hundredth iteration of a recurring participatory hospitality format."
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-2014",
    hostPropositionId: "PROP-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-HOST-2014",
    propositionId: "PROP-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-2014",
    supportTag: "event-rotating-hospitality-format",
    title: "Sunday Dinner: Mid-Manhattan / Roosevelt Island (NYC Week 5)",
    publishedAt: "2014-11-23",
    canonicalUrl: "https://www.facebook.com/events/653082538122515/",
    proposition: "The public event page documents one week of an eight-week New York City dinner rotation with a changing host place."
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017",
    hostPropositionId: "PROP-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-HOST-2017",
    propositionId: "PROP-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017",
    supportTag: "event-hospitality-civic-making",
    title: "Why I March: Sunday Dinner Potluck, Sign Making, Costumes!",
    publishedAt: "2017-01-15",
    canonicalUrl: "https://www.facebook.com/events/1416424718368443/",
    proposition: "The public event page documents a civic-learning and public-making event joining hospitality, discussion, and sign making."
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-2017",
    hostPropositionId: "PROP-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-HOST-2017",
    propositionId: "PROP-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-2017",
    supportTag: "event-collective-civic-learning",
    title: "Movie Club: HyperNormalisation BBC Doc / Brexit, Trump & Syria",
    publishedAt: "2017-02-01",
    canonicalUrl: "https://www.facebook.com/events/278687849214415/",
    proposition: "The public event page documents a public documentary screening and discussion format for collective civic learning."
  }
] as const;

const selectedHostedEventSourceIds = selectedHostedEventSources.map((source) => source.id);

export const personalWowListFacebookEventCensus = {
  observedAt: "2026-07-14",
  personalAssociationSurface: {
    currentRecords: 502,
    secondPassExactIdMatch: true,
    jamieHostCards: 20,
    otherHostCards: 482,
    distinctDisplayedHostLabelsIncludingUnresolved: 295
  },
  jamieHostedControl: {
    controlSlots: 21,
    recoveredPages: 20,
    unresolvedSlots: 1,
    recoveredRange: "2006-12 through 2017-02",
    primaryFormCounts: {
      culturalPerformanceAndProduction: 7,
      recurringHospitalityAndCare: 4,
      participatoryPlaceTravelAndWater: 4,
      networkedCultureAndPublicHistory: 3,
      civicLearningAndMaking: 2
    },
    postedDestinations: 3,
    eventsWithPostedDestinations: 1
  },
  wowListControl: {
    currentDisplayedRecords: 0,
    exactFacebookSearchRecords: 0,
    personalAssociationMatches: 0,
    waybackPatternsWithNoCapture: 3,
    waybackPatternsTimedOut: 1,
    historicalDisposition: "not-recovered"
  },
  completenessStatement: "Every record in the current 502-event personal association surface received an aggregate host disposition; every slot in the separate 21-event Jamie-hosted control received a recovered or unresolved disposition; and the active WOW List event surface exposed zero records. These are current-interface controls, not native Meta exports or deletion histories.",
  aggregateControl: "docs/knowledge-bank/data/personal-wowlist-facebook-event-controls.json",
  hostedEventCensus: "docs/knowledge-bank/data/jamie-facebook-hosted-event-census-2026-07-14.csv"
} as const;

const sourceIds = [
  "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
  "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
  "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
  "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
  "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
  ...selectedHostedEventSourceIds
];

const claimIds = [
  "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
  "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
  "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
  "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026"
];

export const personalWowListFacebookEventIntake = [
  {
    id: intakeId,
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary: "Authenticated full-population archival-production pass over Jamie Burkart's personal Facebook event surface, the narrower Jamie-hosted event control, and WOW List's Facebook event surface, with public-safety, source-routing, collective-credit, and traction boundaries.",
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    sourceUrl: "https://www.facebook.com/jburkart/events/",
    entityIds: ["ENT-PERSONAL-PUBLIC-ARCHIVE", "ENT-SUNDAY-DINNER", "ENT-WOWLIST", "ENT-RIVER-PUBLIC-ENGAGEMENT"],
    disposition: "source-created",
    sourceIds,
    claimIds,
    researchTaskIds: ["TASK-JAMIE-FACEBOOK-HOSTED-EVENT-CENSUS", "TASK-JAMIE-FACEBOOK-EVENT-EXPORT-AND-CREDIT", "TASK-WOWLIST-FACEBOOK-HISTORICAL-EVENT-RECOVERY"],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const personalWowListFacebookEventSources = [
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
    title: "Jamie Burkart Facebook events surface",
    author: "Jamie Burkart",
    kind: "personal-web-page",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/jburkart/events/",
    preferredPublicUrl: "canonical",
    publicCitation: "Jamie Burkart Facebook events surface, authenticated terminal-scroll review, July 14, 2026.",
    publicNote: "Two terminal traversals exposed the same 502 distinct event IDs. Twenty cards displayed Jamie as host and 482 displayed another host.",
    intakeIds: [intakeId],
    supportsGenerally: ["502 distinct current event associations", "an exact 502-ID second-pass match", "20 cards displaying Jamie as host and 482 displaying another host"],
    doesNotEstablish: ["attendance, endorsement, participation, production, authorship, or professional significance", "a complete history of every event ever associated with the account"]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
    title: "Jamie Burkart Facebook event-association population run",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Public-safe aggregate metadata from a July 2026 full-scroll control pass over Jamie Burkart's current Facebook event associations.",
    publicNote: "The public repository retains aggregate accounting only. Record-level associations, other host labels, relationship context, and raw captures remain protected.",
    intakeIds: [intakeId],
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-EVENT-ASSOCIATIONS-2026-001",
    supportsGenerally: ["502 visible association records", "20 associations displaying Jamie as host and 482 displaying another host", "295 distinct displayed host labels including unresolved labels", "exact agreement between two authenticated traversals"],
    doesNotEstablish: ["attendance, endorsement, participation, production, or authorship", "professional significance of any association", "a platform export or deleted historical events"]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
    title: "Jamie Burkart Facebook hosted-event population accounting run",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Public-safe aggregate metadata from a July 2026 record-level accounting of Jamie Burkart's Facebook hosted-event control.",
    publicNote: "The repository retains a 21-slot aggregate census with 20 recovered hosted-event pages and one unresolved historical slot. Raw descriptions, addresses, guest and relationship context, comments, and response displays remain protected.",
    intakeIds: [intakeId],
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001",
    supportsGenerally: ["all 21 current hosted-event control slots accounted for", "20 recovered hosted-event pages and one unresolved slot", "a recovered range from December 2006 through February 2017", "five recurring primary practice forms", "three posted public destinations on one event page"],
    doesNotEstablish: ["the identity or content of the unresolved slot", "sole production or authorship of every event", "attendance, reach, endorsement, causality, or impact"]
  },
  ...selectedHostedEventSources.map((source) => ({
    id: source.id,
    title: source.title,
    organization: "Jamie Burkart and event collaborators",
    kind: "personal-web-page" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    publishedAt: source.publishedAt,
    accessedAt: "2026-07-14" as const,
    canonicalUrl: source.canonicalUrl,
    preferredPublicUrl: "canonical" as const,
    publicCitation: `Jamie Burkart and event collaborators, '${source.title},' Facebook event, ${source.publishedAt}.`,
    publicNote: source.proposition,
    intakeIds: [intakeId],
    supportsGenerally: [source.proposition],
    doesNotEstablish: ["sole production of the event", "individual authorship of the event page", "physical attendance, audience reach, endorsement, or impact", "the truth of every proposition at a posted destination"]
  })),
  {
    id: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    title: "WOW List Facebook events surface",
    organization: "WOW List",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist/events/",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List Facebook events surface, authenticated Page-management review, July 14, 2026.",
    publicNote: "While acting as the WOW List Page, the current event surface displayed 'No events to show' and exposed no numeric event records.",
    intakeIds: [intakeId],
    supportsGenerally: ["zero records displayed on the current WOW List Facebook event surface"],
    doesNotEstablish: ["that WOW List never created, hosted, co-hosted, promoted, or was associated with a Facebook event", "that historical records were not deleted, hidden, renamed, or hosted from another account"]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
    title: "WOW List Facebook historical-event recovery run",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Public-safe metadata from a July 2026 bounded recovery search for WOW List Facebook event records.",
    publicNote: "Authenticated current and search surfaces, the 502-record personal association control, and bounded Wayback queries recovered no historical WOW List Facebook event record.",
    intakeIds: [intakeId],
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001",
    supportsGenerally: ["a bounded negative recovery finding", "zero WOW List matches in the current personal association control", "zero numeric records in authenticated Facebook event search"],
    doesNotEstablish: ["that no WOW List Facebook event ever existed", "that an event was never deleted, hidden, renamed, co-hosted, or created from another account"]
  }
] satisfies SourceRecord[];

export const personalWowListFacebookEventReadings = [
  {
    id: "READ-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
    sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      { id: "PROP-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL", text: "Two authenticated terminal traversals returned the same 502 event IDs: 20 cards displayed Jamie as host and 482 displayed another host.", relationToJamie: "project-context", supportTags: ["personal-facebook-event-association-control"], confidence: "high", locator: "Complete terminal-scroll event index" }
    ],
    limitations: ["Association is not attendance, endorsement, participation, production, authorship, or professional significance.", "The current interface is not a native Meta export or deletion history."],
    researchTaskIds: ["TASK-JAMIE-FACEBOOK-HOSTED-EVENT-CENSUS", "TASK-JAMIE-FACEBOOK-EVENT-EXPORT-AND-CREDIT"]
  },
  {
    id: "READ-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
    sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      { id: "PROP-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RECONCILIATION", text: "The aggregate reconciliation retains 502 current associations, 20 Jamie-host cards, 482 other-host cards, and 295 distinct displayed host labels including unresolved labels.", relationToJamie: "project-context", supportTags: ["personal-facebook-event-association-reconciliation"], confidence: "high", locator: "Protected record-level reconciliation" }
    ],
    limitations: ["The public repository retains aggregate controls rather than Jamie's record-level relationship graph.", "Displayed host clusters are source-discovery routes, not measures of stakeholder engagement with Jamie."],
    researchTaskIds: ["TASK-JAMIE-FACEBOOK-EVENT-EXPORT-AND-CREDIT"]
  },
  {
    id: "READ-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
    sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      { id: "PROP-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION", text: "Every slot in the 21-event hosted control has a disposition: 20 recovered public event pages and one unresolved historical slot.", relationToJamie: "direct-role", supportTags: ["jamie-facebook-hosted-event-population"], confidence: "high", locator: "Hosted-event control reconciliation" },
      { id: "PROP-JAMIE-FACEBOOK-HOSTED-EVENT-ATTRIBUTION", text: "All 20 recovered public event pages display Jamie as host and span December 2006 through February 2017.", relationToJamie: "direct-role", supportTags: ["jamie-hosted-event-attribution"], confidence: "high", locator: "Complete recovered hosted-event population: host bylines and dates" },
      { id: "PROP-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE", text: "The 20 recovered pages document recurring structures for cultural production, hospitality and care, participatory place and water work, civic learning and making, and networked public culture.", relationToJamie: "project-context", supportTags: ["jamie-hosted-event-practice-throughline"], confidence: "high", locator: "Complete recovered hosted-event population: titles and expanded descriptions" },
      { id: "PROP-JAMIE-FACEBOOK-HOSTED-EVENT-LINK-ROUTING", text: "One recovered page routed participants to three public destinations: an Imagined Communities article, a Last.fm fan graph, and KCDIY.org.", relationToJamie: "project-context", supportTags: ["jamie-hosted-event-link-routing"], confidence: "high", locator: "Expanded event descriptions and outbound links" },
      { id: "PROP-JAMIE-FACEBOOK-EVENT-RESPONSE-INSTABILITY", text: "Facebook response values appeared inconsistently across authenticated renders and therefore cannot support stable aggregate traction claims.", relationToJamie: "project-context", supportTags: ["facebook-event-response-instability"], confidence: "high", locator: "Repeated authenticated detail-page renders" }
    ],
    limitations: ["The unresolved slot receives no inferred title, date, host, format, or URL.", "Host attribution does not establish sole production or erase performers, venues, collaborators, and participants.", "Posted destinations are research routes, not automatic corroboration, endorsement, readership, conversion, or impact.", "Response displays are mutable and must not be summed or described as unique people, attendance, reach, endorsement, causality, or impact."],
    researchTaskIds: ["TASK-JAMIE-FACEBOOK-HOSTED-EVENT-CENSUS", "TASK-JAMIE-FACEBOOK-EVENT-EXPORT-AND-CREDIT"]
  },
  ...selectedHostedEventSources.map((source) => ({
    id: `READ-${source.id.slice(4)}`,
    sourceId: source.id,
    status: "closely-read" as const,
    readAt: "2026-07-14" as const,
    propositions: [
      { id: source.hostPropositionId, text: "The public event page displays Jamie as host.", relationToJamie: "direct-role" as const, supportTags: ["event-jamie-host-attribution"], confidence: "high" as const, locator: "Public event host byline" },
      { id: source.propositionId, text: source.proposition, relationToJamie: "project-context" as const, supportTags: [source.supportTag], confidence: "high" as const, locator: "Public event title, date, and expanded description" }
    ],
    limitations: ["The event page does not establish Jamie's sole production or individual authorship of the page.", "Guest identities, exact private locations, comments, and mutable response displays remain outside the public knowledge bank."],
    researchTaskIds: []
  })),
  {
    id: "READ-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [{ id: "PROP-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL", text: "While authenticated as the WOW List Page, the current event surface displayed 'No events to show' and exposed zero numeric event records.", relationToJamie: "project-context", supportTags: ["wowlist-facebook-current-zero-control"], confidence: "high", locator: "WOW List Page event surface" }],
    limitations: ["A current zero display does not establish that WOW List never created, hosted, promoted, or was associated with a Facebook event.", "The control says nothing about WOW List's own platform, public posts, organizer use, or community activity."],
    researchTaskIds: ["TASK-WOWLIST-FACEBOOK-HISTORICAL-EVENT-RECOVERY"]
  },
  {
    id: "READ-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
    sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [{ id: "PROP-WOWLIST-FACEBOOK-EVENT-BOUNDED-NONRECOVERY", text: "Authenticated Facebook search, the 502-record personal association control, and bounded Wayback queries recovered no historical WOW List Facebook event record.", relationToJamie: "project-context", supportTags: ["wowlist-facebook-event-bounded-nonrecovery"], confidence: "high", locator: "Authenticated search and bounded archive-recovery run" }],
    limitations: ["Not recovered does not mean did not exist.", "Deleted, hidden, renamed, co-hosted, and other-account records may not appear in the tested surfaces."],
    researchTaskIds: ["TASK-WOWLIST-FACEBOOK-HISTORICAL-EVENT-RECOVERY"]
  }
] satisfies SourceReading[];

export const personalWowListFacebookEventClaims = [
  {
    id: "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
    project: "personal-public-archive",
    internalClaim: "Two authenticated terminal traversals of Jamie's current personal Facebook event surface returned the same 502 event IDs: 20 cards displayed Jamie as host and 482 displayed another host.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["personal-facebook-event-association-control", "personal-facebook-event-association-reconciliation"],
    projections: [],
    evidence: [
      { sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026", relationship: "direct-support", supports: ["the 502-ID current control and exact second-pass match"], propositionIds: ["PROP-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026", relationship: "corroborating", supports: ["record-level deduplication and aggregate host accounting"], propositionIds: ["PROP-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RECONCILIATION"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Association does not establish attendance, endorsement, participation, production, authorship, or professional significance.", "The current interface is not an official Meta export and cannot reveal deleted or hidden historical records.", "The public repository retains aggregate counts rather than a record-level map of Jamie's personal and relational life."],
    antiClaims: ["Jamie attended or produced all 502 associated events.", "The current surface is every event ever associated with Jamie.", "Displayed host clusters measure stakeholder engagement with Jamie."],
    researchInquiryIds: [personalInquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
    project: "personal-public-archive",
    internalClaim: "The July 2026 Facebook hosted-event census accounts for a 21-slot control with 20 recovered public event pages and one unresolved historical slot.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["jamie-facebook-hosted-event-population"],
    projections: [],
    evidence: [{ sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026", relationship: "direct-support", supports: ["all 21 slot dispositions and the aggregate census"], propositionIds: ["PROP-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION"], confidence: "high", renderCitation: false }],
    boundaries: ["Complete accounting means every current control slot has a recovered or unresolved disposition; it does not mean every historical event page was recovered.", "The unresolved slot cannot acquire an inferred title, date, host, or format.", "Host attribution does not establish sole production."],
    antiClaims: ["All 21 event pages were recovered.", "The current control represents every event Jamie ever hosted.", "Jamie alone produced every recovered event."],
    researchInquiryIds: [personalInquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
    project: "personal-public-archive",
    internalClaim: "Twenty recovered Facebook event pages naming Jamie as host from 2006 through 2017 document recurring structures for cultural production, hospitality and care, participatory place and water work, civic learning and making, and networked public culture.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [intakeId],
    requiredSupportTags: ["jamie-hosted-event-attribution", "event-jamie-host-attribution", "jamie-hosted-event-practice-throughline", "event-participatory-public-history", "event-participatory-river-expedition", "event-recurring-hospitality-longevity", "event-hospitality-civic-making", "event-collective-civic-learning"],
    composition: {
      action: "Hosted public events that used discussion, performance, shared meals, public history, walking, travel, sign making, and film as participation structures.",
      intendedEnd: "Help people encounter one another, attend to place and history, share cultural work, and turn common questions into public learning or action.",
      usableResult: "A recurring event-making practice spanning networked music culture, public history, river travel, place-based participation, hospitality, civic making, and collective inquiry.",
      audience: "Artists, musicians, neighbors, cultural participants, civic learners, public-history participants, and future collaborators.",
      collectiveCredit: "The events depended on performers, venues, collaborators, hosts, and participants; Facebook's host byline supports Jamie's event-making role without assigning him sole production or authorship of each page.",
      causalBoundary: "The record supports recurring public formats and Jamie's host role, not sole production, stable attendance, measured reach, endorsement, policy causality, or downstream impact."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026", relationship: "direct-support", supports: ["Jamie host attribution across the recovered population and the five-form classification"], propositionIds: ["PROP-JAMIE-FACEBOOK-HOSTED-EVENT-ATTRIBUTION", "PROP-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE"], confidence: "high", renderCitation: false },
      ...selectedHostedEventSources.map((source) => ({ sourceId: source.id, relationship: "direct-support" as const, supports: ["Jamie host attribution", source.proposition], propositionIds: [source.hostPropositionId, source.propositionId], confidence: "high" as const, renderCitation: false })),
      { sourceId: "SRC-RIVER-PITCH-HUCK-FINN-2007", relationship: "corroborating" as const, supports: ["the river expedition's public and participatory context"], propositionIds: ["PROP-RIVER-PITCH-ORIGIN", "PROP-RIVER-PITCH-SCREENING"], confidence: "high" as const, renderCitation: false },
      { sourceId: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016", relationship: "corroborating" as const, supports: ["Jamie's participatory public-history work around the 8th Street Tunnel"], propositionIds: ["PROP-TUNNEL-SCREENING", "PROP-TUNNEL-SCAVENGER", "PROP-TUNNEL-PUBLIC-HERITAGE"], confidence: "high" as const, renderCitation: false }
    ],
    boundaries: ["Facebook host attribution supports Jamie's public event-making role; it does not establish sole production or erase collaborators, performers, venues, hosts, and participants.", "The five primary forms are an interpretive classification, not mutually exclusive truths about the work.", "Do not convert response displays or page counts into attendance, reach, endorsement, causality, or impact."],
    antiClaims: ["Jamie alone produced every recovered event.", "All 502 associated events were Jamie's projects.", "Facebook event responses measure attendance or impact."],
    researchInquiryIds: [personalInquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    project: "wowlist",
    internalClaim: "WOW List's current Facebook event surface displayed zero event records in July 2026; bounded historical recovery found none.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["wowlist-facebook-current-zero-control", "wowlist-facebook-event-bounded-nonrecovery"],
    projections: [],
    evidence: [
      { sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026", relationship: "direct-support", supports: ["the current zero-record display"], propositionIds: ["PROP-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026", relationship: "corroborating", supports: ["the bounded historical non-recovery"], propositionIds: ["PROP-WOWLIST-FACEBOOK-EVENT-BOUNDED-NONRECOVERY"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["A current zero display does not establish that WOW List never created or used Facebook events.", "Not recovered does not mean did not exist.", "This finding does not characterize WOW List's own platform, public posts, organizer use, or community activity."],
    antiClaims: ["WOW List never had a Facebook event.", "WOW List had no event community.", "The Facebook control measures WOW List's platform activity."],
    researchInquiryIds: [wowListInquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const personalWowListFacebookEventResearchTasks = [
  {
    id: "TASK-JAMIE-FACEBOOK-HOSTED-EVENT-CENSUS",
    project: "personal-public-archive",
    question: "Can every record in the current personal association surface and every slot in the narrower Jamie-hosted control receive a public-safe disposition?",
    status: "resolved",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: ["SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026", "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026", "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026", ...selectedHostedEventSourceIds],
    claimIds: claimIds.slice(0, 3),
    nextActions: ["Preserve the public aggregate controls and rerun validation if Facebook exposes additional records."],
    resolutionSummary: "Yes. The 502 association records are fully reconciled at aggregate host level, and all 21 hosted-event control slots have dispositions: 20 recovered pages and one unresolved slot."
  },
  {
    id: "TASK-JAMIE-FACEBOOK-EVENT-EXPORT-AND-CREDIT",
    project: "personal-public-archive",
    question: "Can a native Meta export or collaborator record identify the unresolved hosted slot and strengthen event-level production and collective-credit detail?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: ["SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026", "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026", "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026", ...selectedHostedEventSourceIds],
    claimIds: claimIds.slice(0, 3),
    nextActions: ["Request a native Meta event/account export and reconcile it without publishing personal association data.", "Invite collaborators to confirm event-level divisions of labor and shared credit.", "Review rights-cleared photographs and project records for stronger evidence of facilitation, hospitality, and participatory structure."]
  },
  {
    id: "TASK-WOWLIST-FACEBOOK-HISTORICAL-EVENT-RECOVERY",
    project: "wowlist",
    question: "Can a native Page export, collaborator archive, or newly recovered web capture establish whether WOW List used Facebook events historically?",
    status: "open",
    priority: "low",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: ["SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026", "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026"],
    claimIds: ["CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026"],
    nextActions: ["Check a native WOW List Page export if one becomes available.", "Ask collaborators whether event pages were created from personal accounts or another Page identity.", "Preserve the current finding as non-recovery rather than historical nonexistence."]
  }
] satisfies ResearchTask[];

export const personalWowListFacebookEventInquiries = [
  {
    id: personalInquiryId,
    project: "personal-public-archive",
    question: "What can the complete current personal event-association surface and separate Jamie-hosted control establish about Jamie's event-making practice without exposing personal relationships or converting association into attendance?",
    methods: ["Used an authenticated read-only Facebook session and terminal scrolling to recover every distinct event ID exposed by Jamie's personal event surface.", "Repeated the full traversal and reconciled the same 502-ID set with 20 Jamie-host cards and 482 other-host cards.", "Separated the 502-record association surface from the 21-slot Jamie-hosted control.", "Opened and close-read all 20 recovered hosted-event pages, expanded descriptions where available, and reviewed outbound links.", "Excluded guest identities, relationship context, comments, exact private locations, account administration, and authentication material.", "Classified each recovered hosted page by year and one primary practice form while retaining the classification as interpretive.", "Compared mission-relevant pages with existing independent reporting on the river expedition and 8th Street Tunnel work."],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: ["Two authenticated traversals returned the same 502 distinct event IDs.", "Twenty association cards displayed Jamie as host and 482 displayed another host; 295 distinct displayed host labels appeared across the current surface.", "All 21 hosted-event control slots are accounted for as 20 recovered pages and one unresolved slot.", "The recovered hosted pages span December 2006 through February 2017.", "Primary-form classification yields seven cultural performance and production events, four recurring hospitality and care events, four participatory place, travel, and water events, three networked culture and public-history events, and two civic-learning and making events.", "Micropop routed participants toward Imagined Communities, a Last.fm fan graph, and KCDIY.org; these links are research routes, not automatic corroboration.", "Facebook response values appeared inconsistently across authenticated renders and therefore cannot support stable traction or attendance claims."],
    limitations: ["The authenticated interface is not an official Facebook export and cannot reveal deleted or hidden historical records.", "One of 21 hosted-event control slots remains unresolved.", "Facebook association does not establish attendance, endorsement, participation, authorship, production, or professional significance.", "Facebook host attribution does not establish sole production or erase collaborators, performers, venues, hosts, and participants.", "Facebook response displays are unstable and do not establish unique people, attendance, reach, endorsement, causality, or impact.", "Raw association rows, guest identities, relationship context, exact private locations, comments, and authentication data remain outside the public repository."],
    sourceIds: ["SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026", "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026", "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026", ...selectedHostedEventSourceIds, "SRC-RIVER-PITCH-HUCK-FINN-2007", "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016"],
    publicSummary: "The current personal association surface is fully accounted for at 502 records, while the stronger 21-slot hosted-event control is dispositioned as 20 recovered pages and one unresolved slot. The recovered pages document a recurring event-making practice without converting personal associations or platform responses into professional proof.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001"
  },
  {
    id: wowListInquiryId,
    project: "wowlist",
    question: "Can any current or historical WOW List Facebook event record be recovered without confusing non-recovery with nonexistence?",
    methods: ["Switched the authenticated Facebook identity into WOW List Page management and inspected the full current event surface.", "Confirmed that the active Page surface displayed 'No events to show' and exposed zero numeric event records.", "Searched Facebook events for WOW List and checked the 502-record personal association control for WOW List title or displayed-host matches.", "Ran bounded Wayback queries over current and legacy Page-event URL patterns.", "Recorded each zero or timeout disposition without inferring historical nonexistence."],
    runAt: "2026-07-14",
    resultStatus: "not-recovered",
    findings: ["The authenticated current WOW List event surface displayed zero event records.", "Facebook event search exposed zero numeric event records for the exact project name.", "The current 502-record personal association control contained zero WOW List title or displayed-host matches.", "Three bounded Wayback patterns returned no captures and one legacy pattern timed out."],
    limitations: ["Current zero display and bounded historical non-recovery do not establish that no WOW List Facebook event ever existed.", "Deleted, hidden, renamed, co-hosted, or other-account records may not appear in the tested surfaces.", "This control says nothing about WOW List's own platform events, public posts, organizer use, or community activity."],
    sourceIds: ["SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026", "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026"],
    publicSummary: "The current WOW List Facebook event surface displayed zero records, and a bounded historical search recovered none. The result is non-recovery, not proof of nonexistence.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001"
  }
] satisfies ResearchInquiry[];

export const personalWowListFacebookEventDecisions = claimIds.map((claimId, index) => ({
  id: `DEC-DEFER-PERSONAL-WOWLIST-FACEBOOK-EVENT-${index + 1}`,
  claimId,
  surface: "future-portfolio-composition",
  decision: "defer" as const,
  rationale: claimId === "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017"
    ? "The throughline is strong reserve depth for facilitation, cultural-program, participatory-design, hospitality-system, public-history, and photo-editor contexts; it should not displace the current technical-operations composition without an audience-specific reason."
    : "Retain the archival control in the knowledge bank without turning personal association mechanics, an unresolved slot, or WOW List non-recovery into prominent public portfolio copy.",
  decidedAt: "2026-07-14",
  reviewedBy: ["Jamie Burkart", "Codex archival review"]
})) satisfies ProjectionDecision[];
