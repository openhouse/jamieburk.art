import type {
  ClaimRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchInquiry,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const intakeId = "INTAKE-NYCARTC-FACEBOOK-EVENT-CENSUS-2026";
const inquiryId = "INQ-NYCARTC-FACEBOOK-EVENTS-2026";

const selectedEventSources = [
  {
    id: "SRC-FACEBOOK-NYCARTC-GENERAL-MEETING-2017-02",
    propositionId: "PROP-FACEBOOK-NYCARTC-GENERAL-MEETING-2017-02",
    supportTag: "nycartc-open-priority-setting-meeting",
    title: "DIY: NYC Artist Coalition - General Meeting",
    publishedAt: "2017-02-06",
    canonicalUrl: "https://www.facebook.com/events/406505576359490/",
    publicCitation: "NYC Artist Coalition, 'DIY: NYC Artist Coalition - General Meeting,' Facebook event, February 6, 2017.",
    proposition: "The public event record documents an open coalition meeting at Magick City organized around shared priorities, cultural-plan work, and participation pathways."
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-GENERAL-MEETING-2017-03",
    propositionId: "PROP-FACEBOOK-NYCARTC-GENERAL-MEETING-2017-03",
    supportTag: "nycartc-practical-support-and-listening",
    title: "NYC Artist Coalition - March General Meeting",
    publishedAt: "2017-03-06",
    canonicalUrl: "https://www.facebook.com/events/1833265643557435/",
    publicCitation: "NYC Artist Coalition, 'NYC Artist Coalition - March General Meeting,' Facebook event, March 6, 2017.",
    proposition: "The public event record documents a recurring meeting at The Floasis combining Fire Guard preparation, town-hall strategy, survey design, and participant-proposed working groups."
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-CABARET-PANEL-2017",
    propositionId: "PROP-FACEBOOK-NYCARTC-CABARET-PANEL-2017",
    supportTag: "nycartc-cultural-space-policy-panel",
    title: "Legalize Dance in NYC Panel - NYC Artist Coalition April Meeting",
    publishedAt: "2017-04-25",
    canonicalUrl: "https://www.facebook.com/events/212427345900529/",
    publicCitation: "NYC Artist Coalition, 'Legalize Dance in NYC Panel - NYC Artist Coalition April Meeting,' Facebook event, April 25, 2017.",
    proposition: "The public event record documents a coalition meeting at Muchmore's that joined an expert panel with a public-action path around Cabaret Law repeal."
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-CABARET-HEARING-2017",
    propositionId: "PROP-FACEBOOK-NYCARTC-CABARET-HEARING-2017",
    supportTag: "nycartc-public-hearing-pathway",
    title: "Cabaret Law Hearing: One Chance to Legalize Dance!",
    publishedAt: "2017-06-19",
    canonicalUrl: "https://www.facebook.com/events/472114119789400/",
    publicCitation: "NYC Artist Coalition and campaign partners, 'Cabaret Law Hearing: One Chance to Legalize Dance!,' Facebook event, June 19, 2017.",
    proposition: "The public event record documents a City Hall action path asking participants to attend a Cabaret Law hearing and tell their stories."
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-NIGHTLIFE-TOWN-HALL-2017",
    propositionId: "PROP-FACEBOOK-NYCARTC-NIGHTLIFE-TOWN-HALL-2017",
    supportTag: "nycartc-cultural-space-civic-interface",
    title: "Tell NYC's Night Mayor: Save NYC Spaces",
    publishedAt: "2017-10-11",
    canonicalUrl: "https://www.facebook.com/events/120802405289008/",
    publicCitation: "NYC Artist Coalition and campaign partners, 'Tell NYC's Night Mayor: Save NYC Spaces,' Facebook event, October 11, 2017.",
    proposition: "The public event record documents a Market Hotel town hall inviting cultural-space participants into dialogue with public officials about the Office of Nightlife."
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-NOVEMBER-MEETING-2017",
    propositionId: "PROP-FACEBOOK-NYCARTC-NOVEMBER-MEETING-2017",
    supportTag: "nycartc-return-and-revise-meeting",
    title: "NYC Artist Coalition - November Meeting",
    publishedAt: "2017-11-13",
    canonicalUrl: "https://www.facebook.com/events/144317939631393/",
    publicCitation: "NYC Artist Coalition, 'NYC Artist Coalition - November Meeting,' Facebook event, November 13, 2017.",
    proposition: "The public event record documents a meeting at Chinatown Soup for review and priority-setting after Cabaret Law repeal and Office of Nightlife creation."
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-NIGHT-MAYOR-PANEL-2018",
    propositionId: "PROP-FACEBOOK-NYCARTC-NIGHT-MAYOR-PANEL-2018",
    supportTag: "nycartc-multi-stakeholder-public-panel",
    title: "Night Mayor Panel - NAC March Meeting",
    publishedAt: "2018-03-26",
    canonicalUrl: "https://www.facebook.com/events/383292402137451/",
    publicCitation: "NYC Artist Coalition and campaign partners, 'Night Mayor Panel - NAC March Meeting,' Facebook event, March 26, 2018.",
    proposition: "The public event record documents a meeting at Secret Project Robot connecting artists, residents, cultural spaces, and public officials."
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-MARCH-HEARING-2019",
    propositionId: "PROP-FACEBOOK-NYCARTC-MARCH-HEARING-2019",
    supportTag: "nycartc-being-there-action-ethic",
    title: "MARCH Raids in NYC - City Hall Hearing #TalksNotRaids",
    publishedAt: "2019-02-11",
    canonicalUrl: "https://www.facebook.com/events/790581997948463/",
    publicCitation: "NYC Artist Coalition and campaign partners, 'MARCH Raids in NYC - City Hall Hearing #TalksNotRaids,' Facebook event, February 11, 2019.",
    proposition: "The public event record uses the phrase 'Being there changes everything' while inviting participants to a City Hall hearing and asking them to tell their stories."
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-SUMMER-MEETING-2019",
    propositionId: "PROP-FACEBOOK-NYCARTC-SUMMER-MEETING-2019",
    supportTag: "nycartc-cross-campaign-priority-setting",
    title: "NYC Artist Coalition: Summer of Change Meeting",
    publishedAt: "2019-08-07",
    canonicalUrl: "https://www.facebook.com/events/373845436658926/",
    publicCitation: "NYC Artist Coalition and Ode to Babel, 'NYC Artist Coalition: Summer of Change Meeting,' Facebook event, August 7, 2019.",
    proposition: "The public event record documents an Ode to Babel meeting connecting MARCH transparency, Commercial Rent Stabilization, and participant-proposed priorities."
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-COVID-RELIEF-2020",
    propositionId: "PROP-FACEBOOK-NYCARTC-COVID-RELIEF-2020",
    supportTag: "nycartc-virtual-relief-adaptation",
    title: "Covid-19 Relief: Virtual Meeting - NYC Artist Coalition",
    publishedAt: "2020-03-16",
    canonicalUrl: "https://www.facebook.com/events/1371973329662017/",
    publicCitation: "NYC Artist Coalition and campaign partners, 'Covid-19 Relief: Virtual Meeting - NYC Artist Coalition,' Facebook event, March 16, 2020.",
    proposition: "The public event record documents the coalition meeting practice adapting to a virtual relief and coordination format during COVID-19."
  }
] as const;

const selectedEventSourceIds = selectedEventSources.map((source) => source.id);

export const nycArtCFacebookEventCensus = {
  account: "@nycartc",
  surface: "Facebook past events",
  observedAt: "2026-07-14",
  controlSlots: 34,
  recoveredRecords: 33,
  unresolvedSlots: 1,
  dispositionTotal: 34,
  yearCounts: { 2017: 17, 2018: 3, 2019: 6, 2020: 6, 2021: 1 },
  hostBylines: { coalitionOnly: 17, sharedOrAssociated: 16 },
  pageRelationships: { directCardHost: 24, cohostedOrAssociated: 9 },
  recurringMeetings: { records: 12, namedPhysicalVenues: 10, virtualMeetings: 2 },
  responseSignals: { displayed: 32, missing: 1, minimum: 9, maximum: 1700, atLeast100: 19, atLeast400: 9, atLeast1000: 3 },
  postedLinks: { occurrences: 61, normalizedRows: 38, eventsWithLinks: 25, sourceArticles: 7, protectedRows: 1, researchNeededRows: 4 },
  completenessStatement: "Every slot in Facebook's current 34-event host-card control has a disposition: 33 recovered public event records and one unresolved slot. This is complete disposition coverage, not complete item recovery, a native Meta export, deletion history, or proof of every event ever created.",
  publicEventLedger: "docs/knowledge-bank/data/nycartc-facebook-event-ledger.json",
  publicLinkLedger: "docs/knowledge-bank/data/nycartc-facebook-event-link-ledger.json"
} as const;

const sourceIds = [
  "SRC-FACEBOOK-NYCARTC-EVENTS-CONTROL-2026",
  "SRC-FACEBOOK-NYCARTC-EVENT-POPULATION-2026",
  "SRC-FACEBOOK-NYCARTC-EVENT-LINKS-2026",
  "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-2026",
  "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
  "SRC-GOTHAMIST-COMMERCIAL-RENT-2019",
  ...selectedEventSourceIds
];

const facebookEventClaimIds = [
  "CLM-NYCARTC-FACEBOOK-EVENT-POPULATION",
  "CLM-NYCARTC-PARTICIPATION-SYSTEM",
  "CLM-NYCARTC-FACEBOOK-RESPONSE-SIGNALS",
  "CLM-NYCARTC-FACEBOOK-EVENT-LINK-ROUTING"
];

const claimIds = [
  ...facebookEventClaimIds,
  "CLM-NYCARTC-DCLA-RECIPROCAL-PUBLIC-INTERFACE-2017",
  "CLM-NYCARTC-COUNCIL-ESPINAL-POLICY-INTERFACE-2017-2018"
];

export const nycArtCFacebookEventIntake = [
  {
    id: intakeId,
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary: "Authenticated full-population archival-production pass over the NYC Artist Coalition Facebook event surface, including event chronology, participation patterns, posted-source routing, stakeholder interfaces, public-safety review, and bounded role evidence.",
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    sourceUrl: "https://www.facebook.com/nycartc/events",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-CABARET-LAW-REPEAL", "ENT-OFFICE-OF-NIGHTLIFE", "ENT-TALKS-NOT-RAIDS", "ENT-FAIR-RENT-NYC", "ENT-MARCH-OPERATIONS"],
    disposition: "source-created",
    sourceIds,
    claimIds,
    researchTaskIds: ["TASK-NYCARTC-FACEBOOK-EVENT-CENSUS", "TASK-NYCARTC-FACEBOOK-EVENT-EXPORT-AND-CREDIT"],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const nycArtCFacebookEventSources = [
  {
    id: "SRC-FACEBOOK-NYCARTC-EVENTS-CONTROL-2026",
    title: "NYC Artist Coalition Facebook events surface",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/nycartc/events",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition Facebook past-events surface, authenticated review, July 14, 2026.",
    publicNote: "Terminal scrolling exposed 33 distinct event IDs. Event host cards separately displayed '34 past events,' leaving one control slot unresolved.",
    intakeIds: [intakeId],
    supportsGenerally: ["a 34-event host-card control", "33 recovered page-listed event IDs", "the surviving January 2017 through January 2021 range"],
    doesNotEstablish: ["the identity or content of the unresolved slot", "events absent from the current control", "individual event-page authorship", "physical attendance"]
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-EVENT-POPULATION-2026",
    title: "NYC Artist Coalition Facebook event population accounting run",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Public-safe metadata from a record-level accounting of the NYC Artist Coalition Facebook event surface, July 2026.",
    publicNote: "The public repository retains a 34-slot ledger with 33 recovered event records and one unresolved control slot. Raw captures and participant-level context remain protected.",
    intakeIds: [intakeId],
    protectedLocatorId: "RESEARCH-NYCARTC-FACEBOOK-EVENTS-2026-001",
    supportsGenerally: ["34 control-slot dispositions", "year and event-format distributions", "12 recurring meeting records across ten named physical venues and two virtual meetings", "17 coalition-only and 16 shared or associated visible host bylines", "32 event-level Facebook response displays"],
    doesNotEstablish: ["the unresolved event's metadata", "unique people or physical attendance", "the meaning of every host relationship", "individual authorship", "policy causality"]
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-EVENT-LINKS-2026",
    title: "NYC Artist Coalition Facebook event outbound-link inventory",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Public-safe metadata from a review of outbound links in surviving NYC Artist Coalition Facebook event descriptions, July 2026.",
    publicNote: "The public repository retains a redacted 38-row routing ledger derived from 61 link occurrences on 25 events. Meeting-access paths, working documents, unresolved sensitive destinations, and raw descriptions remain protected.",
    intakeIds: [intakeId],
    protectedLocatorId: "RESEARCH-NYCARTC-FACEBOOK-EVENT-LINKS-2026-001",
    supportsGenerally: ["61 outbound-link occurrences", "38 normalized routing rows", "links on 25 recovered events", "seven published-article routes"],
    doesNotEstablish: ["the truth of every linked proposition", "authorship or endorsement of every destination", "readership, conversion, attendance, reach, causality, or impact"]
  },
  {
    id: "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-2026",
    title: "Jamie Burkart first-person account of NYC Artist Coalition event practice",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Jamie Burkart first-person account of his contribution to NYC Artist Coalition's public event and participation practice, July 2026.",
    publicNote: "Jamie describes a substantial role in creating the event layer and adapting lessons from WOWList to recurring cultural-space convenings and legislative advocacy.",
    intakeIds: [intakeId],
    protectedLocatorId: "CONFIRMATION-NYCARTC-EVENT-PRACTICE-2026-001",
    supportsGenerally: ["Jamie's account of his event-system contribution", "the connection Jamie draws between WOWList participation practice and coalition advocacy"],
    doesNotEstablish: ["sole organization of every event", "individual authorship of every event page", "collaborators' perspectives", "policy causality"]
  },
  {
    id: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
    title: "Awaiting the Night Mayor",
    organization: "The Village Voice",
    author: "Roshan Abraham",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-11-17",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.villagevoice.com/awaiting-the-night-mayor/",
    preferredPublicUrl: "canonical",
    publicCitation: "Roshan Abraham, 'Awaiting the Night Mayor,' The Village Voice, November 17, 2017.",
    publicNote: "Independent reporting describes about one hundred people gathering at Market Hotel for the coalition's Save NYC Spaces town hall with Council members and city-agency representatives.",
    intakeIds: [intakeId],
    supportsGenerally: ["approximately one hundred people physically attending the Market Hotel town hall", "Council-member and city-agency participation", "a cultural space used as a public town-hall setting"],
    doesNotEstablish: ["Jamie's individual production tasks", "Facebook response counts as attendance", "sole coalition credit", "policy causality"]
  },
  {
    id: "SRC-GOTHAMIST-COMMERCIAL-RENT-2019",
    title: "Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization",
    organization: "Gothamist",
    author: "Elizabeth Kim",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-11-06",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization",
    preferredPublicUrl: "canonical",
    publicCitation: "Elizabeth Kim, 'Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization,' Gothamist, November 6, 2019.",
    publicNote: "Contemporaneous reporting documents the proposed framework and wider small-business advocacy context surrounding the November 2019 Fair Rent event.",
    intakeIds: [intakeId],
    supportsGenerally: ["the public storefront-vacancy and policy context", "a proposed commercial-rent-stabilization framework", "the wider small-business advocacy coalition"],
    doesNotEstablish: ["enactment or implementation", "Jamie's individual authorship or causal role", "the accuracy of every event-page statement"]
  },
  ...selectedEventSources.map((source) => ({
    id: source.id,
    title: source.title,
    organization: "NYC Artist Coalition and event partners",
    kind: "institutional-web-page" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    publishedAt: source.publishedAt,
    accessedAt: "2026-07-14" as const,
    canonicalUrl: source.canonicalUrl,
    preferredPublicUrl: "canonical" as const,
    publicCitation: source.publicCitation,
    publicNote: source.proposition,
    intakeIds: [intakeId],
    supportsGenerally: [source.proposition],
    doesNotEstablish: ["individual authorship of the event page", "physical attendance from a Facebook response display", "unique responders across events", "sole organization or policy causality"]
  }))
] satisfies SourceRecord[];

export const nycArtCFacebookEventReadings = [
  {
    id: "READ-FACEBOOK-NYCARTC-EVENTS-CONTROL-2026",
    sourceId: "SRC-FACEBOOK-NYCARTC-EVENTS-CONTROL-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [{ id: "PROP-FACEBOOK-NYCARTC-EVENT-CONTROL", text: "The authenticated surface exposed 33 distinct event IDs while event host cards displayed a control of 34 past events.", relationToJamie: "project-context", supportTags: ["nycartc-facebook-event-control"], confidence: "high", locator: "Past-events index and event host cards" }],
    limitations: ["The control does not identify the unresolved slot or expose events absent from the current surface.", "The public surface does not assign individual page authorship or prove attendance."],
    researchTaskIds: ["TASK-NYCARTC-FACEBOOK-EVENT-CENSUS", "TASK-NYCARTC-FACEBOOK-EVENT-EXPORT-AND-CREDIT"]
  },
  {
    id: "READ-FACEBOOK-NYCARTC-EVENT-POPULATION-2026",
    sourceId: "SRC-FACEBOOK-NYCARTC-EVENT-POPULATION-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      { id: "PROP-FACEBOOK-NYCARTC-EVENT-POPULATION", text: "Every slot in the 34-event control has a disposition: 33 recovered event records and one unresolved slot.", relationToJamie: "project-context", supportTags: ["nycartc-facebook-event-population"], confidence: "high", locator: "Record-level population reconciliation" },
      { id: "PROP-FACEBOOK-NYCARTC-ROTATING-MEETINGS", text: "Twelve recurring-meeting records span ten distinct named physical cultural spaces and two virtual meetings.", relationToJamie: "project-context", supportTags: ["nycartc-rotating-meeting-practice"], confidence: "high", locator: "Event-format and venue classification" },
      { id: "PROP-FACEBOOK-NYCARTC-STAKEHOLDER-BYLINES", text: "Seventeen recovered pages show a coalition-only public host byline and sixteen visibly name one or more cohosts or associated organizations alongside the coalition.", relationToJamie: "collective-role", supportTags: ["nycartc-shared-event-identity"], confidence: "high", locator: "Public event host bylines" },
      { id: "PROP-FACEBOOK-NYCARTC-RESPONSE-DISTRIBUTION", text: "Thirty-two event pages display Facebook response totals ranging from nine to 1.7K; 19 display at least 100, nine at least 400, and three at least 1K.", relationToJamie: "project-context", supportTags: ["nycartc-facebook-response-signals"], confidence: "high", locator: "Event-level response displays" }
    ],
    limitations: ["Host bylines do not establish each organization's division of labor or formal partnership terms.", "Response displays are mutable event-level platform signals, not unique people, attendance, participation, reach, endorsement, or impact, and must not be summed."],
    researchTaskIds: ["TASK-NYCARTC-FACEBOOK-EVENT-CENSUS", "TASK-NYCARTC-FACEBOOK-EVENT-EXPORT-AND-CREDIT"]
  },
  {
    id: "READ-FACEBOOK-NYCARTC-EVENT-LINKS-2026",
    sourceId: "SRC-FACEBOOK-NYCARTC-EVENT-LINKS-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [{ id: "PROP-FACEBOOK-NYCARTC-EVENT-LINK-ROUTING", text: "The recovered event descriptions contain 61 outbound-link occurrences across 38 normalized routing rows on 25 events, including seven published-article routes.", relationToJamie: "project-context", supportTags: ["nycartc-facebook-event-link-routing"], confidence: "high", locator: "Redacted outbound-link inventory" }],
    limitations: ["Posted URLs are routing and research leads, not automatic corroboration, authorship, endorsement, readership, conversion, attendance, reach, or policy impact.", "Protected working-document and meeting-access paths remain outside the public repository."],
    researchTaskIds: ["TASK-NYCARTC-FACEBOOK-EVENT-EXPORT-AND-CREDIT"]
  },
  {
    id: "READ-NYCARTC-JAMIE-EVENT-PRACTICE-2026",
    sourceId: "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      { id: "PROP-NYCARTC-JAMIE-EVENT-SYSTEM-ROLE", text: "Jamie describes creating the coalition's public event layer as a substantial contribution, including recurring cultural-space convenings and pathways into legislative advocacy.", relationToJamie: "direct-role", supportTags: ["nycartc-jamie-event-system-role"], confidence: "moderate", locator: "First-person account, July 14, 2026" },
      { id: "PROP-NYCARTC-WOWLIST-TO-ADVOCACY-METHOD", text: "Jamie connects the coalition's event practice with participation lessons from WOWList and the premise that in-person presence can alter civic attention and collective agency.", relationToJamie: "direct-role", supportTags: ["nycartc-wowlist-to-advocacy-method"], confidence: "moderate", locator: "First-person account, July 14, 2026" }
    ],
    limitations: ["This is Jamie's first-person account, not independent attribution of every event-level task.", "Collaborator confirmation remains valuable for specific divisions of labor and shared credit."],
    researchTaskIds: ["TASK-NYCARTC-FACEBOOK-EVENT-EXPORT-AND-CREDIT"]
  },
  {
    id: "READ-VILLAGE-VOICE-NIGHT-MAYOR-2017",
    sourceId: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      { id: "PROP-VILLAGE-VOICE-MARKET-HOTEL-ATTENDANCE", text: "The Village Voice reports that about one hundred people attended the Market Hotel town hall with Council members and city-agency representatives.", relationToJamie: "project-context", supportTags: ["nycartc-town-hall-physical-attendance"], confidence: "high", locator: "Opening paragraphs" },
      { id: "PROP-VILLAGE-VOICE-NYCARTC-TOWN-HALL-PRACTICE", text: "The article describes NYC Artist Coalition as hosting town halls that invited city officials to hear concerns from the DIY arts community.", relationToJamie: "collective-role", supportTags: ["nycartc-town-hall-institutional-interface"], confidence: "high", locator: "Coalition history section" }
    ],
    limitations: ["The article does not assign Jamie's individual production tasks for this event.", "Its approximate physical-attendance report is event-specific and cannot validate Facebook response displays or aggregate turnout."],
    researchTaskIds: []
  },
  {
    id: "READ-GOTHAMIST-COMMERCIAL-RENT-2019",
    sourceId: "SRC-GOTHAMIST-COMMERCIAL-RENT-2019",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [{ id: "PROP-GOTHAMIST-COMMERCIAL-RENT-CONTEXT-2019", text: "Gothamist reported a proposed commercial-rent-stabilization framework and attributed input to a wider coalition of community and small-business advocates.", relationToJamie: "project-context", supportTags: ["nycartc-commercial-rent-policy-context"], confidence: "high", locator: "Proposal and coalition discussion" }],
    limitations: ["The article does not establish enactment, implementation, Jamie's individual role, or the accuracy of every event-page statement."],
    researchTaskIds: []
  },
  ...selectedEventSources.map((source) => ({
    id: `READ-${source.id.slice(4)}`,
    sourceId: source.id,
    status: "closely-read" as const,
    readAt: "2026-07-14" as const,
    propositions: [{ id: source.propositionId, text: source.proposition, relationToJamie: "project-context" as const, supportTags: [source.supportTag], confidence: "high" as const, locator: "Public event title, date, venue, host byline, and expanded description" }],
    limitations: ["The event page is a collective public project surface and does not establish Jamie's individual authorship or production share.", "A displayed Facebook response total is not physical attendance or a unique-person count."],
    researchTaskIds: []
  }))
] satisfies SourceReading[];

export const nycArtCFacebookEventClaims = [
  {
    id: "CLM-NYCARTC-FACEBOOK-EVENT-POPULATION",
    project: "nyc-artist-coalition",
    internalClaim: "The authenticated NYC Artist Coalition Facebook event census accounts for every slot in a 34-event host-card control with 33 recovered public event records and one unresolved slot.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["nycartc-facebook-event-control", "nycartc-facebook-event-population"],
    projections: [],
    evidence: [
      { sourceId: "SRC-FACEBOOK-NYCARTC-EVENTS-CONTROL-2026", relationship: "direct-support", supports: ["the separate 33-record index and 34-event host-card control"], propositionIds: ["PROP-FACEBOOK-NYCARTC-EVENT-CONTROL"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-FACEBOOK-NYCARTC-EVENT-POPULATION-2026", relationship: "corroborating", supports: ["record-level disposition accounting"], propositionIds: ["PROP-FACEBOOK-NYCARTC-EVENT-POPULATION"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Complete means 100 percent disposition coverage, not 100 percent item recovery.", "The unresolved slot receives no inferred date, title, host, topic, URL, or deletion reason.", "The current control cannot reveal events absent before capture."],
    antiClaims: ["All 34 event records were recovered.", "This is an official Meta export or deletion history.", "The current control represents every event ever associated with NYC Artist Coalition."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-PARTICIPATION-SYSTEM",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie helped establish and produce NYC Artist Coalition's recurring participation system across public event pages, cultural-space meetings, practical support, issue discovery, public hearings, and campaign action.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [intakeId],
    requiredSupportTags: ["nycartc-jamie-event-system-role", "nycartc-rotating-meeting-practice", "nycartc-practical-support-and-listening", "nycartc-cultural-space-civic-interface", "nycartc-town-hall-institutional-interface"],
    composition: {
      action: "Helped establish and produce a recurring participation system joining public event pages, cultural-space meetings, practical support, issue discovery, hearings, and campaign action.",
      intendedEnd: "Listen deeply to artists and cultural-space operators, make their experience collectively legible, and carry shared priorities into civic decision-making.",
      usableResult: "A repeatable path from open meetings and practical sessions to public testimony, campaign action, institutional dialogue, relief coordination, and return meetings.",
      audience: "Artists, cultural workers, small-space operators, advocates, public officials, city agencies, and neighborhood participants.",
      collectiveCredit: "The event pages, meetings, campaigns, and outcomes were collective work involving coalition organizers, venue hosts, cohosts, participants, advocates, public officials, and agency staff; Jamie's contribution does not assign him sole authorship of each event.",
      causalBoundary: "The record supports the existence of the participation system and Jamie's substantial contribution, not an uninterrupted monthly schedule, every event-level task, sole facilitation, or policy outcomes caused by the events alone."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-2026", relationship: "private-support", supports: ["Jamie's first-person account of his contribution and method"], propositionIds: ["PROP-NYCARTC-JAMIE-EVENT-SYSTEM-ROLE", "PROP-NYCARTC-WOWLIST-TO-ADVOCACY-METHOD"], confidence: "moderate", renderCitation: false },
      { sourceId: "SRC-FACEBOOK-NYCARTC-EVENT-POPULATION-2026", relationship: "direct-support", supports: ["the recurring rotating-venue pattern and shared event identity"], propositionIds: ["PROP-FACEBOOK-NYCARTC-ROTATING-MEETINGS", "PROP-FACEBOOK-NYCARTC-STAKEHOLDER-BYLINES"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-FACEBOOK-NYCARTC-GENERAL-MEETING-2017-03", relationship: "direct-support", supports: ["a meeting joining listening, practical support, survey design, and action planning"], propositionIds: ["PROP-FACEBOOK-NYCARTC-GENERAL-MEETING-2017-03"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-FACEBOOK-NYCARTC-NIGHTLIFE-TOWN-HALL-2017", relationship: "direct-support", supports: ["a cultural-space town hall connecting lived concerns with public officials"], propositionIds: ["PROP-FACEBOOK-NYCARTC-NIGHTLIFE-TOWN-HALL-2017"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017", relationship: "corroborating", supports: ["independent reporting on town-hall format, physical attendance, and city participants"], propositionIds: ["PROP-VILLAGE-VOICE-MARKET-HOTEL-ATTENDANCE", "PROP-VILLAGE-VOICE-NYCARTC-TOWN-HALL-PRACTICE"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017", relationship: "direct-support", supports: ["Jamie's named coalition role and practical fire-code study groups"], propositionIds: ["PROP-NYCARTC-FIRE-CODE-GROUPS", "PROP-NYCARTC-AFFILIATION"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017", relationship: "corroborating", supports: ["coalition production and Jamie's speaker role"], propositionIds: ["PROP-BEDFORD-TOWN-HALL-SPEARHEADED", "PROP-BEDFORD-JAMIE-SPEAKER"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Credit the event practice and outcomes collectively.", "Do not attribute every page, invitation, or facilitation decision to Jamie without event-level evidence.", "The record supports a recurring rotating-venue practice, not a meeting in every calendar month or a different venue for every event.", "Independent official records remain necessary for policy outcomes."],
    antiClaims: ["Jamie alone organized every NYC Artist Coalition event.", "Jamie authored every event page.", "Every meeting occurred monthly or at a different venue.", "The event system alone caused legislation or agency change."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-FACEBOOK-RESPONSE-SIGNALS",
    project: "nyc-artist-coalition",
    internalClaim: "Thirty-two recovered event pages display Facebook response totals ranging from nine to 1.7K, but those event-level platform signals are neither unique-person counts nor physical attendance.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["nycartc-facebook-response-signals", "nycartc-town-hall-physical-attendance"],
    projections: [],
    evidence: [
      { sourceId: "SRC-FACEBOOK-NYCARTC-EVENT-POPULATION-2026", relationship: "direct-support", supports: ["the 32 displayed response totals and their distribution"], propositionIds: ["PROP-FACEBOOK-NYCARTC-RESPONSE-DISTRIBUTION"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017", relationship: "supports-boundary", supports: ["one independently reported physical-attendance estimate that differs from its Facebook response display"], propositionIds: ["PROP-VILLAGE-VOICE-MARKET-HOTEL-ATTENDANCE"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Do not sum event-level displays across events.", "Responders may recur and a response does not establish arrival, duration, participation, or attendance.", "Use independently reported attendance only for the event the source covers."],
    antiClaims: ["The displayed totals are unique people reached.", "Facebook responses equal physical attendance.", "The displays prove endorsement, campaign effectiveness, or policy impact."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-FACEBOOK-EVENT-LINK-ROUTING",
    project: "nyc-artist-coalition",
    internalClaim: "The recovered event descriptions route 61 outbound-link occurrences across 38 normalized rows on 25 events, connecting participants to campaigns, registration and action paths, public resources, organizations, and reporting.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["nycartc-facebook-event-link-routing"],
    projections: [],
    evidence: [{ sourceId: "SRC-FACEBOOK-NYCARTC-EVENT-LINKS-2026", relationship: "direct-support", supports: ["the redacted outbound-link inventory and routing categories"], propositionIds: ["PROP-FACEBOOK-NYCARTC-EVENT-LINK-ROUTING"], confidence: "high", renderCitation: false }],
    boundaries: ["A posted URL documents routing and source discovery, not agreement with every proposition at the destination.", "Working-document, meeting-access, and unresolved sensitive locators remain withheld.", "Linked journalism keeps its own authorship and must be close-read before supporting another claim."],
    antiClaims: ["Every posted link is coalition-authored or independently verified.", "Posting a URL proves readership, conversion, attendance, reach, partnership, endorsement, or policy impact.", "Jamie selected or authored every posted destination."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const nycArtCFacebookEventResearchTasks = [
  {
    id: "TASK-NYCARTC-FACEBOOK-EVENT-CENSUS",
    project: "nyc-artist-coalition",
    question: "Can every slot in the current NYC Artist Coalition Facebook past-event control receive a public-safe disposition?",
    status: "resolved",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds,
    claimIds,
    nextActions: ["Preserve the public ledgers and rerun validation when Facebook exposes additional records."],
    resolutionSummary: "Yes. All 34 displayed control slots have dispositions: 33 recovered event records and one unresolved slot with no inferred metadata."
  },
  {
    id: "TASK-NYCARTC-FACEBOOK-EVENT-EXPORT-AND-CREDIT",
    project: "nyc-artist-coalition",
    question: "Can a native Meta export or collaborator record identify the unresolved slot and strengthen event-level production and authorship credit?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: ["SRC-FACEBOOK-NYCARTC-EVENTS-CONTROL-2026", "SRC-FACEBOOK-NYCARTC-EVENT-POPULATION-2026", "SRC-FACEBOOK-NYCARTC-EVENT-LINKS-2026", "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-2026"],
    claimIds: ["CLM-NYCARTC-FACEBOOK-EVENT-POPULATION", "CLM-NYCARTC-PARTICIPATION-SYSTEM"],
    nextActions: ["Request a native Meta event/account export and reconcile it without publishing private account data.", "Invite collaborator confirmation of Jamie's event-system role and event-level divisions of labor.", "Review event photographs and production records for rights-cleared evidence of facilitation, testimony, and cultural-space context.", "Resolve or preserve the four link-ledger research-debt rows without exposing protected destinations."]
  }
] satisfies ResearchTask[];

export const nycArtCFacebookEventInquiries = [
  {
    id: inquiryId,
    project: "nyc-artist-coalition",
    question: "What does the full currently exposed population of NYC Artist Coalition Facebook events establish about chronology, participation practice, stakeholder interface, posted sources, public response signals, and Jamie's bounded contribution?",
    methods: ["Used an authenticated read-only Facebook session and terminal scrolling to recover every distinct event ID exposed by the past-events index.", "Compared the 33 recovered IDs with Facebook's separate 34-past-events host-card control.", "Traversed all 33 recovered detail pages twice and reconciled normalized titles, dates, host bylines, venues, formats, descriptions, response displays, and outbound links.", "Redacted guest identities, friend and invite context, comments, reactions, participant profiles, contact details, meeting credentials, working documents, and account-administration material.", "Close-read selected event pages and independent journalism, then separated project context, Jamie's first-person role evidence, collective credit, engagement signals, and anti-claims."],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: ["Every one of the 34 control slots has a disposition: 33 recovered records and one unresolved slot.", "The 33 recovered events span January 2017 through January 2021 and include meetings, hearings, rallies, practical support, venue defense, small-business advocacy, and relief coordination.", "Twelve recurring meeting records span ten named physical cultural spaces and two virtual meetings.", "Sixteen visible event host bylines name one or more cohosts or associated organizations alongside the coalition; independent reporting documents Council-member and city-agency participation at the Market Hotel town hall.", "Thirty-two pages expose event-level response displays, and 25 events route participants through public links; both are bounded signals rather than attendance or impact measures.", "The record supports Jamie's substantial contribution to the recurring participation system while preserving collective event authorship and outcomes."],
    limitations: ["The unresolved slot's identity and content were not recovered.", "The current interface is not a native export or deletion history and cannot expose events already absent from its control.", "Event pages do not assign every event-level task or page author.", "Facebook response displays are not attendance, unique-person, reach, endorsement, or impact measures.", "First-person role evidence benefits from collaborator confirmation for finer-grained credit."],
    sourceIds,
    publicSummary: "A July 2026 authenticated review dispositions all 34 current control slots, recovers 33 public event records, and documents a recurring cultural-space participation system while preserving one unresolved slot, collective credit, privacy boundaries, and engagement limits.",
    protectedLocatorId: "RESEARCH-NYCARTC-FACEBOOK-EVENTS-2026-001"
  }
] satisfies ResearchInquiry[];

export const nycArtCFacebookEventDecisions = facebookEventClaimIds.map((claimId, index) => ({
  id: `DEC-DEFER-NYCARTC-FACEBOOK-EVENT-${index + 1}`,
  claimId,
  surface: "future-portfolio-composition",
  decision: "defer" as const,
  rationale: claimId === "CLM-NYCARTC-PARTICIPATION-SYSTEM"
    ? "The claim is public-ready and valuable, but this archival pass should strengthen the compositional palette without forcing a new website projection before audience and placement review."
    : "Retain the mature archival finding in the knowledge bank; do not turn census or platform-signal detail into prominent portfolio copy without a clear audience purpose.",
  decidedAt: "2026-07-14",
  reviewedBy: ["Jamie Burkart", "Codex archival review"]
})) satisfies ProjectionDecision[];
