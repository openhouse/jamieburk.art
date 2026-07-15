const reviewedAt = "2026-07-14";
const reportRoot = "https://github.com/openhouse/jamieburk.art/blob/develop";

export const nycacFacebookEventPopulationAudit = {
  controlSlots: 34,
  recoveredRecords: 33,
  unresolvedSlots: 1,
  directHostCards: 24,
  alignedHostCards: 9,
  yearCounts: { 2017: 17, 2018: 3, 2019: 6, 2020: 6, 2021: 1 },
  eventLedgerPath: "docs/knowledge-bank/data/nycartc-public-facebook-event-ledger.json",
  linkLedgerPath: "docs/knowledge-bank/data/nycartc-public-facebook-event-link-ledger.json"
} as const;

export const nycacFacebookEventFindings = {
  recurringMeetingRecords: 12,
  distinctNamedPhysicalVenues: 10,
  virtualMeetingRecords: 2,
  responseDisplays: 32,
  minimumResponseDisplay: 9,
  maximumResponseDisplay: 1700,
  responseDisplaysAtLeast100: 19,
  responseDisplaysAtLeast400: 9,
  responseDisplaysAtLeast1000: 3,
  eventsWithOutboundLinks: 25,
  outboundLinkOccurrences: 61,
  normalizedLinkRows: 38,
  articleRoutes: 7,
  protectedLinkRows: 1,
  unresolvedLinkRows: 4,
  currentReplayHeaders: 33,
  currentReplayFullBodies: 22,
  currentReplayHeaderOnlyBodies: 11
} as const;

const selectedEvents = [
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-GENERAL-MEETING-2017",
    title: "DIY: NYC Artist Coalition - General Meeting",
    publishedAt: "2017-02-06",
    eventId: "406505576359490",
    note: "Open coalition meeting at Magick City for shared priority-setting, cultural-plan work, and participant-proposed action.",
    supports: ["an open coalition meeting at Magick City", "shared priority-setting", "a public event page used as an invitation and action surface"]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-MARCH-MEETING-2017",
    title: "NYC Artist Coalition - March General Meeting",
    publishedAt: "2017-03-06",
    eventId: "1833265643557435",
    note: "Recurring meeting at The Floasis joining fire-guard preparation, town-hall strategy, survey design, and participant-proposed working groups.",
    supports: ["a recurring meeting at The Floasis", "practical fire-safety preparation", "participant-proposed working groups"]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-CABARET-PANEL-2017",
    title: "Legalize Dance in NYC Panel - NYC Artist Coalition April Meeting",
    publishedAt: "2017-04-25",
    eventId: "212427345900529",
    note: "Recurring coalition meeting at Muchmore's with an expert panel and a public-action pathway around Cabaret Law repeal.",
    supports: ["a recurring meeting at Muchmore's", "a public panel", "a Cabaret Law repeal action pathway"]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-CABARET-HEARING-2017",
    title: "Cabaret Law Hearing: One Chance to Legalize Dance!",
    publishedAt: "2017-06-19",
    eventId: "472114119789400",
    note: "City Hall action page asking participants to attend and tell their stories during the Cabaret Law repeal campaign.",
    supports: ["a City Hall action pathway", "an invitation to attend and tell stories", "Cabaret Law repeal campaign context"]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-NIGHTLIFE-TOWN-HALL-2017",
    title: "Tell NYC's Night Mayor: Save NYC Spaces",
    publishedAt: "2017-10-11",
    eventId: "120802405289008",
    note: "Market Hotel town hall inviting cultural-space participants into public dialogue about the Office of Nightlife.",
    supports: ["a Market Hotel town hall", "an invitation to address public officials", "Office of Nightlife agenda-setting"]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-NOVEMBER-MEETING-2017",
    title: "NYC Artist Coalition - November Meeting",
    publishedAt: "2017-11-13",
    eventId: "144317939631393",
    note: "Recurring meeting at Chinatown Soup for collective review and priority-setting after Cabaret Law repeal and Office of Nightlife creation.",
    supports: ["a recurring meeting at Chinatown Soup", "collective review", "continued priority-setting"]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-NIGHT-MAYOR-PANEL-2018",
    title: "Night Mayor Panel - NAC March Meeting",
    publishedAt: "2018-03-26",
    eventId: "383292402137451",
    note: "Recurring meeting at Secret Project Robot connecting artists, residents, city officials, and cultural spaces.",
    supports: ["a recurring meeting at Secret Project Robot", "a public panel", "cultural and civic participants in one forum"]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-MARCH-HEARING-2019",
    title: "MARCH Raids in NYC - City Hall Hearing #TalksNotRaids",
    publishedAt: "2019-02-11",
    eventId: "790581997948463",
    note: "City Hall hearing action whose public description says 'Being there changes everything' and asks participants to tell their stories.",
    supports: ["a MARCH transparency hearing action", "Being there changes everything language", "an invitation to tell stories"]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-SUMMER-MEETING-2019",
    title: "NYC Artist Coalition: Summer of Change Meeting",
    publishedAt: "2019-08-07",
    eventId: "373845436658926",
    note: "Recurring meeting at Ode to Babel joining MARCH transparency, Commercial Rent Stabilization, and participant-proposed priorities.",
    supports: ["a recurring meeting at Ode to Babel", "cross-campaign strategy", "an open path for additional priorities"]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-COVID-RELIEF-2020",
    title: "Covid-19 Relief: Virtual Meeting - NYC Artist Coalition",
    publishedAt: "2020-03-16",
    eventId: "1371973329662017",
    note: "Virtual relief meeting adapting the coalition's gathering practice to pandemic-era resource coordination.",
    supports: ["a virtual relief meeting", "pandemic-era adaptation", "cross-sector resource coordination"]
  }
] as const;

const selectedEventSources = selectedEvents.map((event) => ({
  id: event.id,
  title: event.title,
  organization: "NYC Artist Coalition and event partners",
  kind: "institutional-web-page" as const,
  visibility: "public" as const,
  preservationStatus: "live" as const,
  publishedAt: event.publishedAt,
  accessedAt: reviewedAt,
  canonicalUrl: `https://www.facebook.com/events/${event.eventId}/`,
  preferredPublicUrl: "canonical" as const,
  publicCitation: `NYC Artist Coalition and event partners, '${event.title},' Facebook event, ${event.publishedAt}.`,
  publicNote: event.note,
  supportsGenerally: [...event.supports],
  doesNotEstablish: [
    "individual authorship or production responsibility",
    "physical attendance or unique reach",
    "participant consensus",
    "policy causality"
  ]
}));

const eventObservationIds = selectedEvents.map((event) =>
  `OBS-${event.id.slice(4)}`
);

const participationSourceIds = [
  "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026",
  "SRC-NYCAC-FACEBOOK-EVENT-GENERAL-MEETING-2017",
  "SRC-CALLSCRIPT-DCLA-EVENT-2017",
  "SRC-CALLSCRIPT-DCLA-DISCUSSION-2017",
  "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12",
  "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19"
] as const;

export const nycacFacebookEvents = {
  intakeItems: [{
    id: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
    kind: "public-artifact",
    title: "NYC Artist Coalition Facebook event population",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    projectIds: ["nyc-artist-coalition", "cabaret-law", "office-of-nightlife", "fair-rent-nyc"],
    reason: "Preserve every currently displayed event slot as a historical plot point, recover the coalition's participation-system pattern, and distinguish Jamie's contribution from collective event authorship and outcomes.",
    sourceUrl: "https://www.facebook.com/nycartc/events",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [
      "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-REPORT-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-LINK-LEDGER-2026",
      "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
      ...selectedEvents.map((event) => event.id),
      "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-BILL-2019-11-06",
      "SRC-NYCAC-NYPOST-FOOTLOOSE-CABARET-2017-04-08",
      "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12",
      "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19"
    ],
    observationIds: [
      "OBS-NYCAC-FACEBOOK-EVENT-POPULATION",
      "OBS-NYCAC-FACEBOOK-EVENT-CHRONOLOGY",
      "OBS-NYCAC-FACEBOOK-EVENT-HOST-RELATIONSHIPS",
      "OBS-NYCAC-FACEBOOK-RECURRING-MEETINGS",
      "OBS-NYCAC-FACEBOOK-EVENT-FORMATS",
      "OBS-NYCAC-FACEBOOK-RESPONSE-SIGNALS",
      "OBS-NYCAC-FACEBOOK-OUTBOUND-LINKS",
      "OBS-NYCAC-FACEBOOK-ARTICLE-ROUTES",
      "OBS-NYCAC-FACEBOOK-RETRIEVAL-DRIFT",
      "OBS-NYCAC-JAMIE-EVENT-PRACTICE",
      "OBS-NYCAC-BEDFORD-EVENT-CORROBORATION",
      "OBS-NYCAC-GOTHAMIST-EVENT-CORROBORATION",
      "OBS-NYCAC-GOTHAMIST-COMMERCIAL-RENT-ROUTE",
      "OBS-NYCAC-NYPOST-CABARET-ROUTE",
      ...eventObservationIds
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026", "INQ-NYCAC-EVENT-PRODUCTION-CREDIT"],
    boundaries: [
      "Thirty-four displayed control slots are dispositioned as 33 recovered event pages and one unresolved historical slot; this is not a native Meta export or proof of every event ever created.",
      "Facebook response displays remain mutable event-level signals and are never converted into attendance, unique people, reach, participation, endorsement, or impact.",
      "Guest identities, invite and friend context, comments, reactions, participant profiles, private administration, meeting credentials, and private working-document locators remain excluded.",
      "The recovered pages document a collective participation system; they do not assign Jamie individual authorship or sole production credit for every event."
    ]
  }],

  observations: [
    {
      id: "OBS-NYCAC-FACEBOOK-EVENT-POPULATION", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", project: "nyc-artist-coalition", kind: "source-fact",
      text: "The authenticated host-card control displayed 34 past events. Terminal index traversal recovered 33 distinct event IDs, leaving one metadata-free historical slot unresolved.", locator: "Event ledger accounting and 34th unresolved row", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026"], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["This is complete control-slot disposition, not complete historical content recovery or an official Meta export."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-EVENT-CHRONOLOGY", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", project: "nyc-artist-coalition", kind: "source-fact",
      text: "The 33 recovered events span 2017 through 2021: 17 in 2017, three in 2018, six in 2019, six in 2020, and one in 2021.", locator: "Event ledger yearCounts and recovered rows", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026"], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["The year distribution describes surviving recovered records, not all historical coalition activity."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-EVENT-HOST-RELATIONSHIPS", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", project: "nyc-artist-coalition", kind: "source-fact",
      text: "The recovered population contains 24 direct NYC Artist Coalition host-card relationships and nine aligned or co-hosted event relationships.", locator: "Event ledger relationship field", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026"], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["A host-card relationship does not establish individual production roles, agreement among every host, or attendance."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-RECURRING-MEETINGS", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", project: "nyc-artist-coalition", kind: "source-fact",
      text: "Twelve recurring-meeting records include ten meetings at ten distinct named physical cultural spaces and two virtual meetings.", locator: "Event ledger recurring-meeting records and venueOrMode values", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM", "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["This supports a rotating-venue practice, not a claim that meetings occurred every calendar month or that every event used a different venue."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-EVENT-FORMATS", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", project: "nyc-artist-coalition", kind: "context",
      text: "The event sequence includes meetings, panels, practical fire-safety and legal sessions, venue-support actions, rallies, hearings, small-business advocacy, mutual aid, and pandemic relief coordination.", locator: "Event ledger eventFormat and primaryProgram fields", status: "corroborated", publicSafe: true,
      claimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM", "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"], researchInquiryIds: ["INQ-NYCAC-EVENT-PRODUCTION-CREDIT"],
      limitations: ["Format classifications summarize public descriptions; they do not capture every activity, participant experience, or outcome."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-RESPONSE-SIGNALS", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", project: "nyc-artist-coalition", kind: "limitation",
      text: "Thirty-two recovered pages display mutable Facebook response totals from nine to 1.7K; 19 display at least 100, nine at least 400, and three at least 1K.", locator: "Event ledger accounting.responseSignals", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-RESPONSE-BOUNDARY"], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["The values must not be summed and do not represent unique people, attendance, participation, reach, endorsement, or impact."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-OUTBOUND-LINKS", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LINK-LEDGER-2026", project: "nyc-artist-coalition", kind: "source-fact",
      text: "Twenty-five event descriptions contain 61 outbound-link occurrences normalized into 38 public-safe rows: 33 public routes, one protected row, and four unresolved short-link rows.", locator: "Link ledger accounting and 38 normalized rows", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-LINK-NETWORK"], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["A posted link is a routing record, not evidence of readership, registration, endorsement, conversion, attendance, reach, or impact."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-ARTICLE-ROUTES", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LINK-LEDGER-2026", project: "nyc-artist-coalition", kind: "research-lead",
      text: "Seven normalized rows route to published articles; five match sources already in the campaign press bank and two add New York Post Cabaret Law and Gothamist commercial-rent reporting.", locator: "Link ledger source-article rows", status: "corroborated", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-LINK-NETWORK"], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["Article routing does not establish that the publisher endorsed the coalition or that the event page authored the reporting."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-RETRIEVAL-DRIFT", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026", project: "nyc-artist-coalition", kind: "limitation",
      text: "A fresh authenticated replay recovered all 33 event headers, 22 current full detail bodies, and 11 current header-only historical bodies; an earlier replay exposed 28 full modules, demonstrating mutable platform rendering.", locator: "Fresh July 14 replay and event ledger liveReplay", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026"], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["The earlier preservation capture, not current rendering alone, supplies the full 33-record detail inventory."]
    },
    {
      id: "OBS-NYCAC-JAMIE-EVENT-PRACTICE", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026", project: "nyc-artist-coalition", kind: "participant-memory",
      text: "Jamie identifies the coalition's public event and participation layer as a major contribution and connects its recurring cultural-space convenings to lessons from WOWList and legislative advocacy.", locator: "Jamie's July 14, 2026 first-person account", status: "captured", publicSafe: true,
      claimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM", "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"], researchInquiryIds: ["INQ-NYCAC-EVENT-PRODUCTION-CREDIT"],
      limitations: ["This is Jamie's first-person account, not a collaborator testimonial or event-by-event division-of-labor record."]
    },
    {
      id: "OBS-NYCAC-BEDFORD-EVENT-CORROBORATION", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12", project: "office-of-nightlife", kind: "source-fact",
      text: "Bedford + Bowery reported that NYC Artist Coalition spearheaded the Office of Nightlife town hall, named Jamie among coalition speakers, and documented cultural and civic participants in the same forum.", locator: "Opening town-hall paragraphs", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM"], researchInquiryIds: ["INQ-NYCAC-EVENT-PRODUCTION-CREDIT"],
      limitations: ["The article does not assign every production responsibility or establish Jamie as the sole producer."]
    },
    {
      id: "OBS-NYCAC-GOTHAMIST-EVENT-CORROBORATION", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19", project: "cabaret-law", kind: "source-fact",
      text: "Gothamist reported Jamie organizing fire-code study groups for DIY venues and rallying at City Hall with NYC Artist Coalition for Cabaret Law repeal.", locator: "Opening paragraphs", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM"], researchInquiryIds: ["INQ-NYCAC-EVENT-PRODUCTION-CREDIT"],
      limitations: ["The report establishes specific organizing activity, not the complete event system or sole causation of repeal."]
    },
    {
      id: "OBS-NYCAC-GOTHAMIST-COMMERCIAL-RENT-ROUTE", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-BILL-2019-11-06", project: "fair-rent-nyc", kind: "source-fact",
      text: "The Fair Rent NYC anti-displacement event routed readers to Gothamist reporting on a proposed Commercial Rent Stabilization bill, United for Small Business NYC input, and competing policy positions.", locator: "Article source row and article body", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-LINK-NETWORK"], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["The article does not establish Jamie's authorship, coalition control, bill passage, or policy impact."]
    },
    {
      id: "OBS-NYCAC-NYPOST-CABARET-ROUTE", intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026", sourceId: "SRC-NYCAC-NYPOST-FOOTLOOSE-CABARET-2017-04-08", project: "cabaret-law", kind: "source-fact",
      text: "A Cabaret Law event routed readers to New York Post reporting on Dance Liberation Network and NYC Artist Coalition advocacy and planned repeal legislation.", locator: "Article source row and archived article", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-LINK-NETWORK"], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["The article does not establish Jamie's individual role, final bill terms, legislative outcome, or sole causation."]
    },
    ...selectedEvents.map((event, index) => ({
      id: eventObservationIds[index],
      intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      sourceId: event.id,
      project: "nyc-artist-coalition",
      kind: "source-fact" as const,
      text: event.note,
      locator: "Public event header and preserved expanded description",
      status: "verified" as const,
      publicSafe: true,
      claimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM"],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      limitations: ["The public event page does not assign individual authorship, prove attendance, represent every participant, or establish policy causality."]
    }))
  ],

  sources: [
    {
      id: "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026", title: "NYC Artist Coalition Facebook events surface", organization: "NYC Artist Coalition", kind: "institutional-web-page", visibility: "public", preservationStatus: "live", accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/nycartc/events", preferredPublicUrl: "canonical", publicCitation: "NYC Artist Coalition Facebook past-events surface, authenticated review, July 14, 2026.",
      publicNote: "The current authenticated control displayed 34 past events. Terminal scrolling exposed 33 distinct event IDs, and a fresh replay recovered all 33 dated headers, 22 full bodies, and 11 header-only historical bodies.",
      supportsGenerally: ["a 34-event displayed control", "33 currently recovered event IDs", "current retrieval state"],
      doesNotEstablish: ["the identity of the unresolved slot", "a native Meta export", "all deleted historical events", "individual event authorship", "attendance"]
    },
    {
      id: "SRC-NYCAC-FACEBOOK-EVENT-REPORT-2026", title: "NYC Artist Coalition Facebook event archival production", organization: "Jamie Burkart portfolio research", kind: "project-archive", visibility: "public", preservationStatus: "live", publishedAt: reviewedAt, accessedAt: reviewedAt,
      canonicalUrl: `${reportRoot}/docs/knowledge-bank/projects/nycartc-facebook-events-2026-07-14.md`, preferredPublicUrl: "canonical", publicCitation: "Jamie Burkart portfolio research, 'NYC Artist Coalition Facebook Event Archival Production,' July 14, 2026.",
      publicNote: "Documents population reconciliation, event-system interpretation, platform drift, link routing, response boundaries, Jamie's first-person role, and collective-credit limits.",
      supportsGenerally: ["public-safe research method", "aggregate event findings", "interpretation and publication boundaries"],
      doesNotEstablish: ["a native Meta export", "individual authorship of every page", "attendance", "unique reach", "policy causality"]
    },
    {
      id: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", title: "Redacted NYC Artist Coalition Facebook event disposition ledger", organization: "Jamie Burkart portfolio research", kind: "project-archive", visibility: "public", preservationStatus: "live", publishedAt: reviewedAt, accessedAt: reviewedAt,
      canonicalUrl: `${reportRoot}/${nycacFacebookEventPopulationAudit.eventLedgerPath}`, preferredPublicUrl: "canonical", publicCitation: "Redacted row-level NYC Artist Coalition Facebook event disposition ledger, July 14, 2026.",
      publicNote: "Contains 34 ordered dispositions: 33 recovered public event records and one metadata-free unresolved control slot. Guest and account-private data are excluded.",
      supportsGenerally: ["34-slot accounting", "event chronology and classifications", "host-card relationships", "recurring-meeting and venue pattern", "bounded response displays"],
      doesNotEstablish: ["events absent from the current control", "guest identities", "attendance or unique response", "individual page authorship", "policy causality"]
    },
    {
      id: "SRC-NYCAC-FACEBOOK-EVENT-LINK-LEDGER-2026", title: "Redacted NYC Artist Coalition Facebook event outbound-link ledger", organization: "Jamie Burkart portfolio research", kind: "project-archive", visibility: "public", preservationStatus: "live", publishedAt: reviewedAt, accessedAt: reviewedAt,
      canonicalUrl: `${reportRoot}/${nycacFacebookEventPopulationAudit.linkLedgerPath}`, preferredPublicUrl: "canonical", publicCitation: "Redacted row-level NYC Artist Coalition Facebook event outbound-link ledger, July 14, 2026.",
      publicNote: "Routes 61 public outbound-link occurrences into 38 normalized records while withholding a working-document locator and unresolved short-link locators.",
      supportsGenerally: ["61 link occurrences", "25 linked events", "38 normalized routes", "seven article routes", "protected and unresolved dispositions"],
      doesNotEstablish: ["readership", "registration", "endorsement", "conversion", "attendance", "reach", "policy impact"]
    },
    {
      id: "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026", title: "Jamie Burkart first-person account of NYC Artist Coalition event practice", author: "Jamie Burkart", kind: "project-archive", visibility: "protected", preservationStatus: "private", capturedAt: reviewedAt,
      publicCitation: "Jamie Burkart first-person account of his contribution to NYC Artist Coalition's event and participation practice, July 2026.",
      publicNote: "Jamie identifies the public event layer as a major contribution and connects it to WOWList participation practice and legislative advocacy while preserving shared authorship.", protectedLocatorId: "CONFIRMATION-NYCAC-EVENT-PRACTICE-2026-001",
      supportsGenerally: ["Jamie's first-person contribution account", "the WOWList-to-advocacy connection"],
      doesNotEstablish: ["sole organization of every event", "individual authorship of every event page", "collaborator perspectives", "policy causality"]
    },
    ...selectedEventSources,
    {
      id: "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-BILL-2019-11-06", title: "Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization", organization: "Gothamist", author: "Elizabeth Kim", kind: "published-article", visibility: "public", preservationStatus: "live", publishedAt: "2019-11-06", accessedAt: reviewedAt,
      canonicalUrl: "https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization", preferredPublicUrl: "canonical", publicCitation: "Elizabeth Kim, 'Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization,' Gothamist, November 6, 2019.",
      publicNote: "One event page routed readers to this report on a proposed commercial-rent bill, United for Small Business NYC input, retail-vacancy context, and competing positions.",
      supportsGenerally: ["public reporting on the 2019 proposal", "United for Small Business NYC input", "policy context routed from an event page"],
      doesNotEstablish: ["Jamie's authorship", "coalition control", "bill passage", "policy impact"]
    },
    {
      id: "SRC-NYCAC-NYPOST-FOOTLOOSE-CABARET-2017-04-08", title: "These Footloose-inspired rebels are fighting NYC's dancing ban", organization: "New York Post", author: "Melkorka Licea", kind: "published-article", visibility: "public", preservationStatus: "live-and-archived", publishedAt: "2017-04-08", accessedAt: reviewedAt,
      canonicalUrl: "https://nypost.com/2017/04/08/these-footloose-inspired-rebels-are-fighting-nycs-dancing-ban/", archiveUrl: "https://web.archive.org/web/20170409234308/http://nypost.com/2017/04/08/these-footloose-inspired-rebels-are-fighting-nycs-dancing-ban/", preferredPublicUrl: "archive", publicCitation: "Melkorka Licea, 'These Footloose-inspired rebels are fighting NYC's dancing ban,' New York Post, April 8, 2017.",
      publicNote: "One Cabaret Law event page routed readers to this contemporaneous report on Dance Liberation Network and NYC Artist Coalition advocacy and planned repeal legislation.",
      supportsGenerally: ["contemporaneous Cabaret Law advocacy reporting", "NYC Artist Coalition participation", "planned repeal legislation"],
      doesNotEstablish: ["Jamie's individual role", "final legislation", "repeal outcome", "sole causation"]
    }
  ],

  claims: [
    {
      id: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026", project: "nyc-artist-coalition", internalClaim: "The current Facebook host-card control displayed 34 past events; 33 event records were recovered and one historical control slot remains unresolved.", status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The current 34-slot Facebook event control is fully dispositioned as 33 recovered records and one unresolved historical slot.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", relationship: "direct-support", supports: ["34-slot control accounting", "33 recovered rows", "one unresolved row"], confidence: "high", renderCitation: false }],
      boundaries: ["Full disposition is not full historical content recovery or a native Meta export.", "The unresolved slot receives no inferred title, date, host, or topic."],
      antiClaims: ["All historical Facebook events were recovered.", "The unresolved event was deleted.", "The current counter is a complete account export."], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-PARTICIPATION-SYSTEM", project: "nyc-artist-coalition", internalClaim: "Jamie describes his contribution as helping establish and produce NYC Artist Coalition's recurring participation system across public event pages, meetings rotated among cultural spaces, practical support sessions, public hearings, and campaign action.", status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "Jamie describes his contribution as helping establish and produce the coalition's recurring participation system. In one early example, a Call Script discussion gathered compliance, grant, insurance, legal, and meeting-access needs before a Department of Cultural Affairs session; the wider system used public event pages, meetings rotated among cultural spaces, practical support sessions, hearings, and campaigns to keep carrying concerns into civic action.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] }],
      evidence: [
        { sourceId: "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026", relationship: "private-support", supports: ["Jamie's first-person account of his event-system contribution and WOWList lineage"], confidence: "moderate", renderCitation: false },
        ...participationSourceIds.map((sourceId) => ({ sourceId, relationship: sourceId.includes("BEDFORD") || sourceId.includes("GOTHAMIST") ? "corroborating" as const : "direct-support" as const, supports: [sourceId === "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026" ? "the recurring event and venue pattern" : "one documented part of the participation system"], confidence: "high" as const, renderCitation: true }))
      ],
      boundaries: ["Attribute the broad role to Jamie's first-person account; the event pages, shared-account discussion, and outcomes are collective surfaces.", "The Call Script thread establishes pre-meeting listening, not individual post authorship, representative consensus, DCLA adoption, or policy impact.", "The rotating-venue pattern does not establish an uninterrupted monthly schedule or a different venue for every coalition event.", "Independent reporting corroborates specific Jamie organizing and speaking roles, not production responsibility for the entire event population."],
      antiClaims: ["Jamie alone organized every event.", "Jamie authored every event page.", "The event system alone caused legislative or agency outcomes."], researchInquiryIds: ["INQ-NYCAC-EVENT-PRODUCTION-CREDIT"], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-RESPONSE-BOUNDARY", project: "nyc-artist-coalition", internalClaim: "Thirty-two recovered event pages display mutable Facebook response totals from nine to 1.7K, which must remain event-level platform signals rather than attendance or unique-reach claims.", status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "Thirty-two event pages retain mutable platform response displays; they are preserved as event-level signals and never converted into attendance or unique reach.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", relationship: "direct-support", supports: ["32 response displays", "nine-to-1.7K range", "threshold counts"], confidence: "high", renderCitation: false }],
      boundaries: ["Do not sum event responses across pages.", "Use independent event-specific reporting for physical attendance."],
      antiClaims: ["Facebook responses equal attendance.", "The totals represent unique people or reach.", "Response counts prove endorsement or impact."], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-EVENT-LINK-NETWORK", project: "nyc-artist-coalition", internalClaim: "Twenty-five event descriptions contain 61 outbound-link occurrences normalized into 38 research routes, including seven published-article links.", status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The event descriptions retain a 38-route source and action network, including seven published-article routes and explicit protected and unresolved dispositions.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LINK-LEDGER-2026", relationship: "direct-support", supports: ["61 occurrences", "25 events", "38 routes", "seven article links", "protected and unresolved rows"], confidence: "high", renderCitation: false }],
      boundaries: ["A posted URL is a routing record or research lead, not automatic corroboration.", "Meeting access and working-document locators remain protected; unresolved short links remain unresolved."],
      antiClaims: ["Seven publishers endorsed NYC Artist Coalition.", "Posted URLs prove readership or action.", "Every short link destination was recovered."], researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE", project: "nyc-artist-coalition", internalClaim: "Jamie interprets the coalition's recurring events as a democratic listening and translation practice: believing artists, gathering in cultural spaces, sharing practical knowledge, and carrying concerns into civic forums.", status: "inference",
      projections: [{ key: "archive-note", text: "The recovered event sequence is consistent with Jamie's description of a democratic listening practice connecting cultural-space experience, practical support, collective priority-setting, and civic action.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026", relationship: "private-support", supports: ["Jamie's interpretation and WOWList lineage"], confidence: "moderate", renderCitation: false }, { sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", relationship: "corroborating", supports: ["the sequence of meetings, support sessions, hearings, campaigns, and relief coordination"], confidence: "high", renderCitation: false }],
      boundaries: ["Democracy lab, nervous system, believing artists, and events as art are Jamie's interpretive language, not neutral platform metadata.", "Keep this bank-only until a specific public composition benefits and collaborators have room to add perspective."],
      antiClaims: ["Every event followed one uniform theory of change.", "Every participant shared Jamie's interpretation.", "The archive proves where every campaign issue originated."], researchInquiryIds: ["INQ-NYCAC-EVENT-PRODUCTION-CREDIT"], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-NYCAC-FACEBOOK-EVENTS-2026", project: "nyc-artist-coalition", question: "Can every slot in the current NYC Artist Coalition Facebook past-events control be recovered or honestly dispositioned, and what public-safe operating patterns and source routes does the population support?",
      methods: ["Authenticated the NYC Artist Coalition Facebook events surface.", "Scrolled the past-events index until five consecutive no-growth passes.", "Deduplicated event IDs and reconciled them against the host-card control.", "Opened all 33 recovered event URLs and separately recorded current header and detail-body availability.", "Minimized the preservation capture into public-safe event and outbound-link ledgers while excluding people and private access data."],
      runAt: reviewedAt, resultStatus: "partially-recovered",
      findings: ["All 34 displayed control slots are dispositioned as 33 recovered event records and one unresolved historical slot.", "All 33 current pages rendered dated event headers; 22 exposed full bodies and 11 exposed header-only historical bodies in the fresh replay.", "Twelve recurring-meeting records span ten named physical venues and two virtual meetings.", "The event descriptions route 61 link occurrences into 38 normalized public-safe records, including seven article routes."],
      limitations: ["The authenticated interface is not an official Meta export and cannot reveal events absent from the current control.", "Current rendering is mutable; the earlier authenticated preservation capture supplies detail metadata that current pages may no longer expose.", "Response displays are not attendance, unique people, reach, endorsement, or impact.", "The unresolved slot cannot be assigned a title, date, host, or topic."],
      sourceIds: ["SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026", "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", "SRC-NYCAC-FACEBOOK-EVENT-LINK-LEDGER-2026"],
      publicSummary: "The 34-slot control is fully dispositioned through 33 recovered events and one unresolved historical slot; minimized ledgers preserve the event sequence, source routes, retrieval drift, and public-safety boundaries."
    },
    {
      id: "INQ-NYCAC-EVENT-PRODUCTION-CREDIT", project: "nyc-artist-coalition", question: "What precise event-system responsibilities did Jamie and collaborators hold across the coalition's recurring participation practice?",
      methods: ["Recorded Jamie's first-person account as participant memory rather than independent corroboration.", "Compared the complete event pattern with reporting that names Jamie's practical organizing and speaking roles.", "Preserved event pages as collective surfaces and kept individual page authorship open."],
      runAt: reviewedAt, resultStatus: "partially-recovered",
      findings: ["Jamie identifies the public event layer and its WOWList-to-advocacy lineage as a major contribution.", "Independent reporting names Jamie in practical fire-safety organizing and as a coalition speaker at a coalition-spearheaded Office of Nightlife town hall.", "The event population demonstrates a repeatable participation system across cultural spaces, practical sessions, hearings, campaigns, and relief coordination."],
      limitations: ["The sources do not provide a complete event-by-event production roster or individual authorship record.", "Until collaborator or event-level production evidence closes the gap, public wording attributes the broad helped-establish-and-produce role to Jamie's first-person account.", "No event archive alone can assign causal weight for legislation or agency outcomes."],
      sourceIds: ["SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026", "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026", "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12", "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19"],
      publicSummary: "Jamie describes helping establish and produce the recurring participation system; public event records and independent reports corroborate the system and specific organizing roles while collective authorship and policy causality remain bounded."
    }
  ]
} as const;
