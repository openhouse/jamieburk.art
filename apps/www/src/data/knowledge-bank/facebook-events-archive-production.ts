import type {
  ClaimRecord,
  EntityRecord,
  IntakeItem,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

type EventRelationship = "direct-card-host" | "page-associated";
type DetailAvailability =
  | "substantive-current-body"
  | "bounded-permalink-facts-only"
  | "list-record-only";

export type NycArtcFacebookEventRecord = {
  eventId: string;
  date: string;
  title: string;
  relationship: EventRelationship;
  listedHost: string;
  venueOrMode: string;
  eventFormat: string;
  primaryProgram: string;
  responseDisplay?: string;
  recurringMeeting?: boolean;
  currentDetailAvailability: DetailAvailability;
  namedPublicStakeholders?: string[];
  postedUrls?: string[];
  linkedKnowledgeSourceIds?: string[];
};

export const nycArtcFacebookEvents: readonly NycArtcFacebookEventRecord[] = [
  { eventId: "388137698233507", date: "2017-01-27", title: "NYC DIY Spaces post Ghost Ship: Dept of Cultural Affairs Meeting", relationship: "page-associated", listedHost: "Call Script", venueOrMode: "NYC Department of Cultural Affairs", eventFormat: "agency-public-meeting", primaryProgram: "cultural-space-safety", responseDisplay: "445 people responded", currentDetailAvailability: "substantive-current-body" },
  { eventId: "406505576359490", date: "2017-02-06", title: "DIY: NYC Artist Coalition - General Meeting", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Magick City", eventFormat: "coalition-formation-meeting", primaryProgram: "coalition-formation-and-CreateNYC", responseDisplay: "150 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body" },
  { eventId: "1833265643557435", date: "2017-03-06", title: "NYC Artist Coalition - March General Meeting", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "The Floasis", eventFormat: "recurring-meeting", primaryProgram: "safety-town-halls-and-survey-design", responseDisplay: "61 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body", postedUrls: ["http://www.thefloasis.com/"] },
  { eventId: "629158950604663", date: "2017-03-20", title: "Become a Fire Guard: Group Test & Study", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "FDNY Public Certification Unit", eventFormat: "training", primaryProgram: "fire-safety-capacity", responseDisplay: "13 people responded", currentDetailAvailability: "substantive-current-body", postedUrls: ["http://www1.nyc.gov/assets/fdny/downloads/pdf/business/cof-f04-noe-study-materials.pdf"] },
  { eventId: "330648000670969", date: "2017-03-24", title: "Become a Fire Guard: Group Test & Study", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "FDNY Public Certification Unit", eventFormat: "training", primaryProgram: "fire-safety-capacity", responseDisplay: "17 people responded", currentDetailAvailability: "substantive-current-body", postedUrls: ["http://www1.nyc.gov/assets/fdny/downloads/pdf/business/cof-f04-noe-study-materials.pdf"] },
  { eventId: "1907948219437421", date: "2017-03-30", title: "Market Hotel - Show NYC We Support Spaces", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Market Hotel", eventFormat: "venue-support-action", primaryProgram: "cultural-space-safety", responseDisplay: "633 people responded", currentDetailAvailability: "substantive-current-body" },
  { eventId: "212427345900529", date: "2017-04-25", title: "Legalize Dance in NYC Panel - NYC Artist Coalition April Meeting", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Muchmore's", eventFormat: "panel-and-recurring-meeting", primaryProgram: "Let-NYC-Dance", responseDisplay: "458 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body" },
  { eventId: "835861356564686", date: "2017-05-15", title: "Cultural Plan VOTE + Cabaret Law Protest Prep - NAC May Meeting", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "The City Reliquary", eventFormat: "recurring-meeting", primaryProgram: "CreateNYC-and-Let-NYC-Dance", responseDisplay: "71 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body", postedUrls: ["https://www.peoplesculturalplan.org/"] },
  { eventId: "173887729801951", date: "2017-05-19", title: "LEGAL Q&A + Advocacy", relationship: "page-associated", listedHost: "NYC Loft Tenants", venueOrMode: "St. Paul Church Williamsburg", eventFormat: "legal-Q-and-A", primaryProgram: "Loft-Law-and-live-work-spaces", responseDisplay: "26 people responded", currentDetailAvailability: "substantive-current-body", postedUrls: ["http://nyclofttenants.org/"] },
  { eventId: "1677962702508970", date: "2017-05-20", title: "Protest the Cabaret Law w/ NAC + Dance Parade", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Broadway and East 22nd Street", eventFormat: "parade-and-protest", primaryProgram: "Let-NYC-Dance", responseDisplay: "137 people responded", currentDetailAvailability: "substantive-current-body", namedPublicStakeholders: ["Rafael Espinal"] },
  { eventId: "1472395276154065", date: "2017-06-02", title: "Architectural Q&A + Advocacy", relationship: "page-associated", listedHost: "NYC Loft Tenants", venueOrMode: "St. Paul Church Williamsburg", eventFormat: "architectural-Q-and-A", primaryProgram: "Loft-Law-and-live-work-spaces", responseDisplay: "9 people responded", currentDetailAvailability: "substantive-current-body", postedUrls: ["http://nyclofttenants.org/"] },
  { eventId: "472114119789400", date: "2017-06-19", title: "Cabaret Law Hearing: One Chance to Legalize Dance!", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "New York City Hall", eventFormat: "public-hearing", primaryProgram: "Let-NYC-Dance", responseDisplay: "1.7K people responded", currentDetailAvailability: "bounded-permalink-facts-only" },
  { eventId: "107158013279474", date: "2017-07-24", title: "NAC July Meeting: Legalize Dance, Repairs Fund, CreateNYC", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Shoestring Press", eventFormat: "recurring-meeting", primaryProgram: "Let-NYC-Dance-safety-and-CreateNYC", responseDisplay: "99 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body", postedUrls: ["https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", "https://www.peoplesculturalplan.org/", "http://www1.nyc.gov/assets/fdny/downloads/pdf/business/cof-f04-noe-study-materials.pdf"], linkedKnowledgeSourceIds: ["SRC-PRESS-LET-NEW-YORKER-DANCE-OUTLAWS-2017"] },
  { eventId: "113308576029782", date: "2017-09-14", title: "Repeal the Cabaret Law Now: City Hall Hearing", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "New York City Hall", eventFormat: "public-hearing", primaryProgram: "Let-NYC-Dance", responseDisplay: "1.1K people responded", currentDetailAvailability: "bounded-permalink-facts-only" },
  { eventId: "120802405289008", date: "2017-10-11", title: "Tell NYC's Night Mayor: Save NYC Spaces", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Market Hotel", eventFormat: "public-town-hall", primaryProgram: "Office-of-Nightlife-and-Save-NYC-Spaces", responseDisplay: "1.2K people responded", currentDetailAvailability: "substantive-current-body", namedPublicStakeholders: ["Rafael Espinal", "Antonio Reynoso", "Stephen Levin", "Tom Finkelpearl", "Julie Menin"], postedUrls: ["https://www.eventbrite.com/e/tell-nycs-night-mayor-save-nyc-spaces-tickets-38503111844"] },
  { eventId: "133554860735306", date: "2017-10-31", title: "NYC Repeals Cabaret Law: City Hall", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "New York City Hall", eventFormat: "celebration-and-action", primaryProgram: "Let-NYC-Dance", responseDisplay: "885 people responded", currentDetailAvailability: "bounded-permalink-facts-only" },
  { eventId: "144317939631393", date: "2017-11-13", title: "NYC Artist Coalition - November Meeting", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Chinatown Soup", eventFormat: "recurring-meeting", primaryProgram: "coalition-review-and-priorities", responseDisplay: "123 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body" },
  { eventId: "383292402137451", date: "2018-03-26", title: "Night Mayor Panel - NAC March Meeting", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Secret Project Robot", eventFormat: "panel-and-recurring-meeting", primaryProgram: "Office-of-Nightlife", responseDisplay: "612 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body", namedPublicStakeholders: ["Ariel Palitz", "Rafael Espinal", "Antonio Reynoso"] },
  { eventId: "1916200875140739", date: "2018-10-22", title: "City Hall Hearing: Lease Protections for Spaces #PassSBJSA", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "New York City Hall", eventFormat: "public-hearing", primaryProgram: "commercial-lease-protections", responseDisplay: "527 people responded", currentDetailAvailability: "substantive-current-body", postedUrls: ["http://PassSBJSA.com/"] },
  { eventId: "468698540318956", date: "2018-11-01", title: "MARCH Raids & Fair Rent: NYC Artist Coalition Meeting", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Friends and Lovers", eventFormat: "recurring-meeting", primaryProgram: "Talks-Not-Raids-and-Fair-Rent", responseDisplay: "205 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body", namedPublicStakeholders: ["Stephen Levin", "Rafael Espinal"], postedUrls: ["https://TalksNotRaids.com/", "http://FairRentNYC.com/"] },
  { eventId: "790581997948463", date: "2019-02-11", title: "MARCH Raids in NYC - City Hall Hearing #TalksNotRaids", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "New York City Hall", eventFormat: "public-hearing", primaryProgram: "Talks-Not-Raids", responseDisplay: "299 people responded", currentDetailAvailability: "substantive-current-body", postedUrls: ["http://TalksNotRaids.com/", "https://thebaffler.com/latest/cut-the-music-pelly"], linkedKnowledgeSourceIds: ["SRC-PRESS-TALKS-BAFFLER-MARCH-2019"] },
  { eventId: "149896349250651", date: "2019-02-18", title: "NYC Artist Coalition - February Meeting", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Flowers for all Occasions", eventFormat: "recurring-meeting", primaryProgram: "Talks-Not-Raids-Fair-Rent-and-space-support", responseDisplay: "173 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body", namedPublicStakeholders: ["Rafael Espinal"], postedUrls: ["https://TalksNotRaids.com/", "http://FairRentNYC.com/", "http://NYCArtC.com/"] },
  { eventId: "2347093582223366", date: "2019-05-06", title: "Save Ode To Babel", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Ode to Babel", eventFormat: "venue-support-action", primaryProgram: "Save-NYC-Spaces-and-Talks-Not-Raids", responseDisplay: "143 people responded", currentDetailAvailability: "substantive-current-body", postedUrls: ["http://TalksNotRaids.com/"] },
  { eventId: "2998476473711342", date: "2019-06-22", title: "PN Mobile Workshop: In Defense of Grassroots Cultural Spaces", relationship: "page-associated", listedHost: "Planners Network NYC", venueOrMode: "Pratt Institute", eventFormat: "workshop", primaryProgram: "cultural-space-advocacy", responseDisplay: "28 people responded", currentDetailAvailability: "substantive-current-body" },
  { eventId: "373845436658926", date: "2019-08-07", title: "NYC Artist Coalition: Summer of Change Meeting", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Ode to Babel", eventFormat: "recurring-meeting", primaryProgram: "Talks-Not-Raids-and-Fair-Rent", responseDisplay: "157 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body", postedUrls: ["https://TalksNotRaids.com/", "http://FairRentNYC.com/", "http://NYCArtC.com/"] },
  { eventId: "1014934072187610", date: "2019-11-14", title: "Fair Rent NYC: Anti-Displacement Rally", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "New York City Hall", eventFormat: "rally", primaryProgram: "Fair-Rent-NYC", responseDisplay: "149 people responded", currentDetailAvailability: "list-record-only", linkedKnowledgeSourceIds: ["SRC-NYCARTC-GOTHAMIST-COMMERCIAL-RENT-2019"] },
  { eventId: "1371973329662017", date: "2020-03-16", title: "Covid-19 Relief: Virtual Meeting - NYC Artist Coalition", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Virtual", eventFormat: "relief-meeting", primaryProgram: "COVID-19-relief", responseDisplay: "309 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body" },
  { eventId: "2616087105332260", date: "2020-04-13", title: "Coronavirus resources and actions for artists and freelancers", relationship: "page-associated", listedHost: "APAP - Association of Performing Arts Professionals", venueOrMode: "Online", eventFormat: "resource-webinar", primaryProgram: "COVID-19-artist-relief", currentDetailAvailability: "substantive-current-body" },
  { eventId: "533594734223350", date: "2020-04-30", title: "Commercial Tenant Town Call with USBnyc", relationship: "page-associated", listedHost: "ANHD", venueOrMode: "Online", eventFormat: "commercial-tenant-call", primaryProgram: "small-business-and-commercial-tenancy", responseDisplay: "58 people responded", currentDetailAvailability: "bounded-permalink-facts-only" },
  { eventId: "208435106806073", date: "2020-06-18", title: "We Will Rise: Recovery and Resiliency for Small Business", relationship: "page-associated", listedHost: "Office of the NYC Public Advocate", venueOrMode: "Online", eventFormat: "public-panel", primaryProgram: "small-business-recovery", responseDisplay: "66 people responded", currentDetailAvailability: "list-record-only" },
  { eventId: "1451617855032658", date: "2020-08-20", title: "Small Business Speakout", relationship: "page-associated", listedHost: "ANHD", venueOrMode: "Online", eventFormat: "public-speakout", primaryProgram: "small-business-recovery", responseDisplay: "19 people responded", currentDetailAvailability: "bounded-permalink-facts-only" },
  { eventId: "772824526895291", date: "2020-10-06", title: "October Relief Meeting - NYC Artist Coalition", relationship: "direct-card-host", listedHost: "NYC Artist Coalition", venueOrMode: "Virtual", eventFormat: "recurring-meeting", primaryProgram: "COVID-19-relief-and-rent-support", responseDisplay: "90 people responded", recurringMeeting: true, currentDetailAvailability: "substantive-current-body" },
  { eventId: "109513027694163", date: "2021-01-29", title: "Among Us Benefit Stream", relationship: "page-associated", listedHost: "Wonderville", venueOrMode: "Online", eventFormat: "benefit-stream", primaryProgram: "cultural-space-relief", responseDisplay: "27 people responded", currentDetailAvailability: "substantive-current-body" }
];

const eventSourceId = (eventId: string) => `SRC-FB-NYCARTC-EVENT-${eventId}`;
const eventEntityId = (eventId: string) => `facebook-nycartc-event-${eventId}`;

export const nycArtcFacebookEventEntities = nycArtcFacebookEvents.map((event) => ({
  id: eventEntityId(event.eventId),
  kind: "event" as const,
  name: event.title,
  aliases: [],
  publicDescription: `${event.date}: ${event.title}, a ${event.eventFormat} at ${event.venueOrMode} focused on ${event.primaryProgram}.`
})) satisfies EntityRecord[];

const eventSourceIds = nycArtcFacebookEvents.map((event) => eventSourceId(event.eventId));
const eventEntityIds = nycArtcFacebookEvents.map((event) => eventEntityId(event.eventId));

export const nycArtcFacebookEventIntakes = [
  {
    id: "INT-2026-07-14-FB-NYCARTC-EVENT-POPULATION",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription: "A 34-slot accounting of the NYC Artist Coalition Facebook event control: 33 recovered current-visible event records and one unresolved slot.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: eventEntityIds,
    dateHints: ["2017-01-27", "2021-01-29"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: [
      "SRC-FB-NYCARTC-EVENTS-CONTROL-2026",
      "SRC-FB-NYCARTC-EVENTS-CORPUS-2026",
      "SRC-FB-NYCARTC-EVENT-LINK-INVENTORY-2026",
      "SRC-NYCARTC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      "SRC-NYCARTC-GOTHAMIST-COMMERCIAL-RENT-2019",
      ...eventSourceIds
    ],
    claimIds: [
      "CLM-FB-NYCARTC-EVENT-POPULATION",
      "CLM-FB-NYCARTC-PARTICIPATION-SYSTEM",
      "CLM-FB-NYCARTC-RESPONSE-BOUNDARY",
      "CLM-FB-NYCARTC-SOURCE-ROUTING",
      "CLM-FB-NYCARTC-PUBLIC-OFFICIAL-PROGRAMS"
    ],
    inquiryIds: ["INQ-FB-NYCARTC-EVENT-POPULATION"],
    protectedLocatorId: "SOCIAL-FB-NYCARTC-EVENT-CORPUS-2026-001"
  }
] satisfies IntakeItem[];

const corpusSources = [
  {
    id: "SRC-FB-NYCARTC-EVENTS-CONTROL-2026",
    title: "NYC Artist Coalition Facebook past-events surface",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/nycartc/events",
    preferredPublicUrl: "canonical" as const,
    publicCitation: "NYC Artist Coalition Facebook past-events surface, authenticated July 2026 capture.",
    publicNote: "Terminal scrolling recovered 33 distinct current-visible event IDs; event host cards displayed a separate control of 34 past events.",
    locator: "Past tab, exhausted through five consecutive no-growth scroll passes; event host-card count checked inside surviving detail pages.",
    supportsGenerally: ["33 current-visible event records", "a separate 34-event host-card control", "January 2017 through January 2021 surviving chronology"],
    doesNotEstablish: ["the identity of the unresolved control slot", "events deleted before capture", "individual event-page authorship", "physical attendance"]
  },
  {
    id: "SRC-FB-NYCARTC-EVENTS-CORPUS-2026",
    title: "Authenticated NYC Artist Coalition Facebook event research corpus",
    organization: "Codex archival production",
    kind: "research-run" as const,
    visibility: "private" as const,
    preservationStatus: "private" as const,
    capturedAt: "2026-07-14",
    publicCitation: "Authenticated archival review of NYC Artist Coalition's surviving Facebook event surface, July 2026.",
    publicNote: "All 34 displayed control slots received a disposition: 33 recovered event records and one unresolved slot. A fresh pass re-observed the same 33 IDs, read all 33 permalinks, recovered 26 substantive current bodies, five bounded permalink records, and two list-only records.",
    locator: "Authenticated event index and every recovered permalink, deduplicated by numeric event ID; raw captures retained outside the repository.",
    supportsGenerally: ["34-slot accounting", "33 recovered events", "24 direct-card-host records and nine page-associated records", "12 recurring meetings across ten named physical venues and two virtual meetings", "event format, program, venue, source-link, and response-signal classification"],
    doesNotEstablish: ["the unresolved event's identity", "unique people across response signals", "attendance", "Jamie's authorship of individual event pages", "policy causality"],
    protectedLocatorId: "SOCIAL-FB-NYCARTC-EVENT-CORPUS-2026-001"
  },
  {
    id: "SRC-FB-NYCARTC-EVENT-LINK-INVENTORY-2026",
    title: "NYC Artist Coalition Facebook event outbound-link inventory",
    organization: "Codex archival production",
    kind: "research-run" as const,
    visibility: "private" as const,
    preservationStatus: "private" as const,
    capturedAt: "2026-07-14",
    publicCitation: "Public-safe metadata from a July 2026 review of links posted in surviving NYC Artist Coalition Facebook event descriptions.",
    publicNote: "A prior authenticated capture routed 61 outbound-link occurrences into 38 normalized rows across 25 events, including seven published-article destinations. A fresh recheck recovered campaign, civic-action, safety-resource, planning, registration, and reporting links while withholding access credentials and unresolved working documents.",
    locator: "Expanded public event descriptions; raw access links, credentials, and unresolved sensitive destinations retained outside the repository.",
    supportsGenerally: ["source and action routing through event descriptions", "posted reporting about Cabaret Law, M.A.R.C.H., and commercial rent", "campaign and public-resource links"],
    doesNotEstablish: ["the truth of every linked proposition", "Jamie's authorship or selection of every link", "readership, conversion, attendance, reach, or policy impact"],
    protectedLocatorId: "SOCIAL-FB-NYCARTC-EVENT-LINKS-2026-001"
  }
];

const independentSources = [
  {
    id: "SRC-NYCARTC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
    title: "Awaiting the Night Mayor",
    organization: "The Village Voice",
    author: "Roshan Abraham",
    publishedAt: "2017-11-17",
    canonicalUrl: "https://www.villagevoice.com/awaiting-the-night-mayor/",
    publicCitation: "Roshan Abraham, 'Awaiting the Night Mayor,' The Village Voice, November 17, 2017.",
    publicNote: "Independent reporting described about one hundred people gathering at Market Hotel for the NYC Artist Coalition's Save NYC Spaces town hall with Council members and city-agency representatives.",
    supportsGenerally: ["approximately one hundred people at the October 2017 Market Hotel town hall", "Council and city-agency participation", "coalition town halls as a recurring public practice"],
    doesNotEstablish: ["Jamie's individual production tasks", "Facebook response totals as attendance", "sole coalition credit or policy causality"]
  },
  {
    id: "SRC-NYCARTC-GOTHAMIST-COMMERCIAL-RENT-2019",
    title: "Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization",
    organization: "Gothamist",
    author: "Elizabeth Kim",
    publishedAt: "2019-11-06",
    canonicalUrl: "https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization",
    publicCitation: "Elizabeth Kim, 'Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization,' Gothamist, November 6, 2019.",
    publicNote: "Contemporaneous reporting described Council consideration of a commercial-rent-stabilization framework, storefront-vacancy context, and a wider small-business advocacy coalition.",
    supportsGenerally: ["public policy context for the November 2019 Fair Rent NYC rally", "commercial-rent-stabilization proposal", "wider small-business coalition context"],
    doesNotEstablish: ["enactment or implementation", "Jamie's individual authorship or causal role", "independent verification of every event-page statement"]
  }
];

const eventSources = nycArtcFacebookEvents.map((event) => ({
  id: eventSourceId(event.eventId),
  title: event.title,
  organization: event.relationship === "direct-card-host" ? "NYC Artist Coalition and event partners" : event.listedHost,
  kind: "institutional-web-page" as const,
  visibility: "public" as const,
  preservationStatus: event.currentDetailAvailability === "list-record-only" ? "dead" as const : "live" as const,
  publishedAt: event.date,
  accessedAt: "2026-07-14",
  canonicalUrl: `https://www.facebook.com/events/${event.eventId}/`,
  preferredPublicUrl: "canonical" as const,
  publicCitation: `${event.listedHost}, '${event.title},' Facebook event for ${event.date}.`,
  publicNote: `The event archive records a ${event.eventFormat} at ${event.venueOrMode} focused on ${event.primaryProgram}.`,
  locator: `${event.currentDetailAvailability}; Page relationship: ${event.relationship}; listed host: ${event.listedHost}.`,
  projectIds: ["nyc-artist-coalition"],
  intakeIds: ["INT-2026-07-14-FB-NYCARTC-EVENT-POPULATION"],
  reviewStatus: "reviewed" as const,
  reviewDepth: event.currentDetailAvailability === "substantive-current-body" ? "close-reading" as const : "metadata" as const,
  reviewedAt: "2026-07-14",
  reviewedBy: ["Codex authenticated archival review"],
  supportsGenerally: [
    "event title and date",
    `${event.relationship} relationship`,
    `${event.venueOrMode} venue or mode`,
    `${event.eventFormat} format and ${event.primaryProgram} program`,
    ...(event.recurringMeeting ? ["recurring coalition meeting"] : []),
    ...(event.responseDisplay ? [`captured event-level platform response signal: ${event.responseDisplay}`] : []),
    ...(event.namedPublicStakeholders?.length ? [`event description named scheduled public stakeholders: ${event.namedPublicStakeholders.join(", ")}`] : []),
    ...(event.postedUrls?.length ? ["public source or action links posted in the event description"] : [])
  ],
  doesNotEstablish: [
    "physical attendance or unique people from Facebook response signals",
    "Jamie's authorship or production of the individual event page",
    "policy causality",
    ...(event.relationship === "page-associated" ? ["that Page association alone means NYC Artist Coalition hosted or co-hosted the event"] : []),
    ...(event.namedPublicStakeholders?.length ? ["that every named or scheduled stakeholder attended"] : [])
  ]
}));

export const nycArtcFacebookEventSources = [
  ...corpusSources.map((source) => ({
    ...source,
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-FB-NYCARTC-EVENT-POPULATION"],
    reviewStatus: "reviewed" as const,
    reviewDepth: "close-reading" as const,
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  })),
  ...independentSources.map((source) => ({
    ...source,
    kind: "published-article" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14",
    preferredPublicUrl: "canonical" as const,
    locator: "Article headline, body, event description, and attributed reporting.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-FB-NYCARTC-EVENT-POPULATION"],
    reviewStatus: "reviewed" as const,
    reviewDepth: "close-reading" as const,
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-source review"]
  })),
  {
    id: "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
    title: "Jamie Burkart first-person account of NYC Artist Coalition event practice",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Jamie Burkart first-person account of his contribution to NYC Artist Coalition's event and participation practice, July 2026.",
    publicNote: "Jamie describes a substantial role in creating the coalition's public event layer and applying lessons from WOW List to recurring cultural-space convenings and legislative advocacy.",
    locator: "First-person portfolio research conversation, retained outside the public repository.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-MEMORY-NYCARTC-TOWN-HALLS"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
    supportsGenerally: ["Jamie's first-person account of his event-system contribution", "the continuity Jamie draws between WOW List participation and coalition advocacy"],
    doesNotEstablish: ["sole organization of every event", "individual authorship of every event page", "collaborators' perspectives", "policy causality"],
    protectedLocatorId: "SOCIAL-FB-NYCARTC-EVENT-ROLE-2026-001"
  },
  ...eventSources
] satisfies SourceRecord[];

export const nycArtcFacebookEventClaims = [
  {
    id: "CLM-FB-NYCARTC-EVENT-POPULATION",
    project: "nyc-artist-coalition",
    claimType: "metric",
    internalClaim: "The July 2026 Facebook event census accounts for 34 displayed control slots with 33 recovered current-visible event records and one unresolved slot.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      { sourceId: "SRC-FB-NYCARTC-EVENTS-CONTROL-2026", relationship: "direct-support", supports: ["33 event IDs and 34-event host-card control"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-FB-NYCARTC-EVENTS-CORPUS-2026", relationship: "private-support", supports: ["deduplication, full control-slot accounting, and record classification"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Complete accounting means every displayed control slot has a recovered or unresolved disposition; it is not complete historical content recovery.", "The current interface cannot reveal events deleted before capture and absent from the displayed control."],
    antiClaims: ["All 34 event records were recovered.", "The current Page represents every event ever associated with NYC Artist Coalition."],
    researchInquiryIds: ["INQ-FB-NYCARTC-EVENT-POPULATION"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-NYCARTC-PARTICIPATION-SYSTEM",
    project: "nyc-artist-coalition",
    claimType: "attributed-description",
    internalClaim: "Jamie describes his contribution as helping establish and produce NYC Artist Coalition's recurring participation system across public event pages, rotating cultural-space meetings, practical support, issue discovery, public hearings, and campaign action.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "Jamie describes helping establish and produce a recurring coalition practice that brought artists together in cultural spaces, connected practical support and listening to public action, and enabled collaborators to turn concerns into campaigns; the work was shared across the coalition.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      { sourceId: "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026", relationship: "private-support", supports: ["Jamie's first-person account of his event-system contribution"], confidence: "moderate", renderCitation: false },
      { sourceId: "SRC-FB-NYCARTC-EVENT-1833265643557435", relationship: "direct-support", supports: ["recurring meeting format combining safety, listening, survey, and town-hall work"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-FB-NYCARTC-EVENT-212427345900529", relationship: "direct-support", supports: ["cultural-space meeting and policy-to-action format"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-FB-NYCARTC-EVENT-120802405289008", relationship: "direct-support", supports: ["cultural-space town hall connecting lived concerns with public officials"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-FB-NYCARTC-EVENT-790581997948463", relationship: "direct-support", supports: ["public-hearing pathway using 'Being there changes everything' and asking participants to tell their stories"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYCARTC-VILLAGE-VOICE-NIGHT-MAYOR-2017", relationship: "corroborating", supports: ["independent reporting on the Market Hotel town hall and broader town-hall practice"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017", relationship: "corroborating", supports: ["Jamie's named coalition advocacy and practical fire-safety study groups"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYCARTC-BNB-DIY-SPACES-2017", relationship: "corroborating", supports: ["Jamie's early organizer role and coalition meeting context"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["The public role wording is attributed to Jamie's first-person account; the event and reporting sources establish the collective practice and context, not his exact production share.", "Credit the event practice and outcomes collectively; Jamie's first-person account supports contribution, not sole organization or authorship.", "Do not attribute every event page, invitation, or facilitation decision to Jamie without event-level production evidence or collaborator confirmation.", "The event record supports a recurring rotating-venue practice, not an uninterrupted monthly schedule in every year.", "Policy outcomes require independent official evidence and collective-work language."],
    antiClaims: ["The cited event pages independently establish Jamie's exact production responsibilities.", "Jamie alone organized every NYC Artist Coalition event.", "Jamie authored every event page.", "Every meeting occurred monthly or at a different venue.", "The event system alone caused legislation or agency change."],
    researchInquiryIds: ["INQ-FB-NYCARTC-EVENT-POPULATION", "INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-FB-NYCARTC-RESPONSE-BOUNDARY",
    project: "nyc-artist-coalition",
    claimType: "metric",
    internalClaim: "Thirty-two archived event records displayed Facebook response totals ranging from nine to 1.7K; a fresh recheck re-observed 25 before seven detail surfaces became unavailable.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      { sourceId: "SRC-FB-NYCARTC-EVENTS-CORPUS-2026", relationship: "private-support", supports: ["event-level response-signal accounting and fresh availability recheck"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCARTC-VILLAGE-VOICE-NIGHT-MAYOR-2017", relationship: "supports-boundary", supports: ["about one hundred physically attended one town hall whose Facebook response total was 1.2K"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Responders may overlap across events.", "Facebook responses combine interest and intention; they do not establish arrival, participation, demographic reach, or attendance.", "Do not sum response displays into a people-reached metric."],
    antiClaims: ["The events drew the sum of all Facebook responses.", "1.7K people attended the Cabaret Law hearing.", "Facebook responses prove policy impact."],
    researchInquiryIds: ["INQ-FB-NYCARTC-EVENT-POPULATION"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-NYCARTC-SOURCE-ROUTING",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "The recovered event descriptions functioned as a source and action-routing layer across campaigns, registration, civic actions, safety resources, planning resources, and published reporting.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      { sourceId: "SRC-FB-NYCARTC-EVENT-LINK-INVENTORY-2026", relationship: "private-support", supports: ["61 outbound-link occurrences across 38 normalized rows on 25 events", "seven published-article destinations"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-PRESS-LET-NEW-YORKER-DANCE-OUTLAWS-2017", relationship: "context", supports: ["Cabaret Law reporting routed from a recurring meeting"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-PRESS-TALKS-BAFFLER-MARCH-2019", relationship: "context", supports: ["M.A.R.C.H. reporting routed from a hearing event"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCARTC-GOTHAMIST-COMMERCIAL-RENT-2019", relationship: "context", supports: ["commercial-rent-policy context routed from the event archive"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["A posted URL is a routing record and research lead, not automatic corroboration, authorship, endorsement, readership, conversion, attendance, reach, or policy impact."],
    antiClaims: ["Every posted URL corroborates the event description.", "Jamie authored or selected every link.", "Link volume proves reach or policy impact."],
    researchInquiryIds: ["INQ-FB-NYCARTC-EVENT-POPULATION"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex source-routing review"]
  },
  {
    id: "CLM-FB-NYCARTC-PUBLIC-OFFICIAL-PROGRAMS",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "Surviving event descriptions named Council members, commissioners, and the first nightlife director in scheduled programs connecting cultural-space concerns with public institutions.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      { sourceId: "SRC-FB-NYCARTC-EVENT-120802405289008", relationship: "direct-support", supports: ["scheduled Council members and commissioners in the October 2017 town-hall description"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-FB-NYCARTC-EVENT-383292402137451", relationship: "direct-support", supports: ["scheduled first nightlife director and Council members in the March 2018 panel description"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-FB-NYCARTC-EVENT-468698540318956", relationship: "direct-support", supports: ["scheduled Council members in the November 2018 meeting description"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCARTC-VILLAGE-VOICE-NIGHT-MAYOR-2017", relationship: "corroborating", supports: ["Council and city-agency representatives at the October 2017 town hall"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Being named or scheduled on an event page does not prove attendance; independent reporting supports institutional participation at the October 2017 town hall only."],
    antiClaims: ["Every named official attended every event.", "Official participation proves endorsement or policy adoption."],
    researchInquiryIds: ["INQ-FB-NYCARTC-EVENT-POPULATION"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const nycArtcFacebookEventResearchInquiries = [
  {
    id: "INQ-FB-NYCARTC-EVENT-POPULATION",
    project: "nyc-artist-coalition",
    intakeIds: ["INT-2026-07-14-FB-NYCARTC-EVENT-POPULATION"],
    question: "Can the complete displayed NYC Artist Coalition Facebook event control be accounted for without exposing participants or converting platform responses into attendance, personal authorship, or policy causality?",
    methods: [
      "Claimed Jamie's authenticated Facebook session and opened the NYC Artist Coalition Past events surface.",
      "Scrolled to a stable terminal state, requiring five consecutive no-growth passes, and deduplicated every event by numeric ID.",
      "Compared the 33-record index with the separate 34-past-events host-card control.",
      "Opened all 33 recovered permalinks, expanded descriptions where available, and captured only public institutional metadata.",
      "Reconciled the fresh 33-ID result with prior authenticated branch-family event accounting and source-routing artifacts.",
      "Classified each event by date, Page relationship, host, venue or mode, format, program, response signal, current detail availability, public stakeholder language, and source links.",
      "Excluded guest identities, invite context, comments, participant profiles, contact details, meeting credentials, private administration, and raw captures from the repository."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "All 34 displayed control slots have a disposition: 33 recovered event records and one unresolved slot.",
      "The surviving chronology spans January 27, 2017, through January 29, 2021: 17 events in 2017, three in 2018, six in 2019, six in 2020, and one in 2021.",
      "Twenty-four records list NYC Artist Coalition directly; nine surface events listed under aligned organizations.",
      "12 recurring-meeting records span 10 named physical venues and 2 virtual meetings.",
      "The wider population includes public hearings, rallies, panels, safety training, legal and architectural Q&A, venue-support actions, small-business advocacy, and pandemic relief coordination.",
      "The descriptions repeatedly link cultural-space concerns to Cabaret Law repeal, CreateNYC, Office of Nightlife accountability, M.A.R.C.H. transparency, commercial lease protections, Fair Rent NYC, and relief coordination.",
      "One hearing event uses the action language 'Being there changes everything' and asks participants to tell their stories."
    ],
    limitations: [
      "The authenticated interface is not an official Meta export.",
      "The 34-event host-card control and 33-record Past index leave one unresolved historical slot.",
      "Seven detail pages were unavailable or limited during the fresh recheck; prior authenticated accounting preserves bounded metadata without filling missing bodies by inference.",
      "Facebook response displays are not unique-person, attendance, demographic, reach, impression, or impact measures.",
      "A posted URL is a source-routing trace, not automatic corroboration, authorship, endorsement, conversion, or impact.",
      "Public event pages identify collective hosts and outputs, not the individual author or producer of every page.",
      "An official Meta event/account export is required to identify the unresolved slot and test for older deleted or hidden events."
    ],
    sourceIds: [
      "SRC-FB-NYCARTC-EVENTS-CONTROL-2026",
      "SRC-FB-NYCARTC-EVENTS-CORPUS-2026",
      "SRC-FB-NYCARTC-EVENT-LINK-INVENTORY-2026",
      "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
      "SRC-NYCARTC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      "SRC-NYCARTC-GOTHAMIST-COMMERCIAL-RENT-2019",
      ...eventSourceIds
    ],
    publicSummary: "The 34-slot Facebook event control is fully accounted for with 33 recovered records and one unresolved slot; the surviving record documents a recurring participation practice while preserving collective credit and response-versus-attendance boundaries.",
    protectedLocatorId: "SOCIAL-FB-NYCARTC-EVENT-CORPUS-2026-001"
  }
] satisfies ResearchInquiry[];
