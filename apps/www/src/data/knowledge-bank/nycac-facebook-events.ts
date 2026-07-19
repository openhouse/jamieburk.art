import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const projectId = "nyc-artist-coalition";
const reviewedAt = "2026-07-15";

const fixtureSourceId = "SRC-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15";
const researchSourceId = "SRC-NYCAC-FACEBOOK-EVENTS-RESEARCH-2026-07-15";
const jamieAccountSourceId = "SRC-NYCAC-JAMIE-EVENT-SYSTEM-ACCOUNT-2026-07-15";
const gothamistRentSourceId = "SRC-NYCAC-EVENT-LINK-GOTHAMIST-FAIR-RENT-2019-11-06";

const eventInfrastructureClaimId = "CLM-NYCAC-RECURRING-EVENT-INFRASTRUCTURE";
const eventResponseClaimId = "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SNAPSHOT";
const jamieEventRoleClaimId = "CLM-NYCAC-JAMIE-EVENT-SYSTEM-ROLE";
const democracyLabClaimId = "CLM-NYCAC-EVENTS-DEMOCRACY-LAB-INTERPRETATION";

const eventSourceSeeds = [
  {
    id: "SRC-NYCAC-FB-EVENT-DCLA-DIY-SPACES-2017-01-27",
    title: "NYC DIY Spaces post Ghost Ship: Dept of Cultural Affairs Meeting",
    date: "2017-01-27",
    eventId: "388137698233507",
    organization: "NYC Artist Coalition, Call Script, and cohosts",
    supports: [
      "an early public meeting with the Department of Cultural Affairs",
      "the coalition's DIY-space safety and cultural-policy context",
      "a displayed historical response count of 445",
    ],
  },
  {
    id: "SRC-NYCAC-FB-EVENT-MAGICK-GENERAL-MEETING-2017-02-06",
    title: "DIY: NYC Artist Coalition - General Meeting",
    date: "2017-02-06",
    eventId: "406505576359490",
    organization: "NYC Artist Coalition",
    supports: [
      "a coalition general meeting at Magick City",
      "an invitation to cultural-space participants to direct collective work",
      "a displayed historical response count of 150",
    ],
  },
  {
    id: "SRC-NYCAC-FB-EVENT-MARKET-HOTEL-TOWN-HALL-2017-03-30",
    title: "Market Hotel - Show NYC We Support Spaces",
    date: "2017-03-30",
    eventId: "1907948219437421",
    organization: "Commend and NYC Artist Coalition",
    supports: [
      "a cultural-space town hall at Market Hotel",
      "public interface with cultural officials and elected representatives",
      "a displayed historical response count of 633",
    ],
  },
  {
    id: "SRC-NYCAC-FB-EVENT-CABARET-HEARING-2017-06-19",
    title: "Cabaret Law Hearing: One Chance to Legalize Dance!",
    date: "2017-06-19",
    eventId: "472114119789400",
    organization: "Dance Liberation Network, House Coalition, and cohosts",
    supports: [
      "a City Hall Cabaret Law hearing call to action",
      "links to campaign resources and four source articles",
      "a rounded displayed historical response count of 1.7K",
    ],
  },
  {
    id: "SRC-NYCAC-FB-EVENT-NIGHT-MAYOR-TOWN-HALL-2017-10-11",
    title: "Tell NYC's Night Mayor: Save NYC Spaces",
    date: "2017-10-11",
    eventId: "120802405289008",
    organization: "House of YES, Dance Liberation Network, and cohosts",
    supports: [
      "a town hall at Market Hotel connected to the Office of Nightlife",
      "small-cultural-space priorities and public dialogue",
      "a rounded displayed historical response count of 1.2K",
    ],
  },
  {
    id: "SRC-NYCAC-FB-EVENT-NIGHT-MAYOR-PANEL-2018-03-26",
    title: "Night Mayor Panel - NAC March Meeting",
    date: "2018-03-26",
    eventId: "383292402137451",
    organization: "House of YES, Educated Little Monsters, and cohosts",
    supports: [
      "a coalition meeting and Night Mayor panel at Secret Project Robot",
      "continued community interface with nightlife governance",
      "a displayed historical response count of 612",
    ],
  },
  {
    id: "SRC-NYCAC-FB-EVENT-MARCH-FAIR-RENT-2018-11-01",
    title: "MARCH Raids & Fair Rent: NYC Artist Coalition Meeting",
    date: "2018-11-01",
    eventId: "468698540318956",
    organization: "League of Independent Theater, Educated Little Monsters, and cohosts",
    supports: [
      "a coalition meeting at Friends and Lovers",
      "the connection of MARCH enforcement and commercial-rent concerns",
      "a displayed historical response count of 205",
    ],
  },
  {
    id: "SRC-NYCAC-FB-EVENT-MARCH-HEARING-2019-02-11",
    title: "MARCH Raids in NYC - City Hall Hearing #TalksNotRaids",
    date: "2019-02-11",
    eventId: "790581997948463",
    organization: "Elsewhere, League of Independent Theater, and cohosts",
    supports: [
      "a City Hall hearing call to action around MARCH transparency",
      "a posted Talks Not Raids campaign link and Baffler source article",
      "a displayed historical response count of 299",
    ],
  },
  {
    id: "SRC-NYCAC-FB-EVENT-COVID-RELIEF-2020-03-16",
    title: "Covid-19 Relief: Virtual Meeting - NYC Artist Coalition",
    date: "2020-03-16",
    eventId: "1371973329662017",
    organization: "House Coalition, NYC Artist Coalition, and cohosts",
    supports: [
      "a rapid transition from physical convening to a virtual relief meeting",
      "collective cultural-sector response during the early COVID-19 crisis",
      "a displayed historical response count of 309",
    ],
  },
] as const;

const eventSourceIds = eventSourceSeeds.map((source) => source.id);

export const nycacFacebookEventCaptures = [
  {
    id: "CAP-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart / Codex authenticated archival review",
    kind: "artifact",
    summary:
      "Authenticated full-population pass over the NYC Artist Coalition Facebook page's Past Events surface, including every materialized event card and detail page, a sanitized public fixture, event-to-source associations, and bounded event-system claims.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: [projectId],
    potentialClaimFamilies: [
      "recurring participatory convenings",
      "rotating cultural-space meetings",
      "civic and cultural translation",
      "historical Facebook response snapshots",
      "event-linked source record",
      "Jamie's event-system role",
    ],
    sourceIds: [
      fixtureSourceId,
      researchSourceId,
      jamieAccountSourceId,
      gothamistRentSourceId,
      ...eventSourceIds,
    ],
    observationIds: [
      "OBS-NYCAC-FB-EVENT-POPULATION-RECONCILIATION",
      "OBS-NYCAC-FB-EVENT-ORGANIZER-RELATION",
      "OBS-NYCAC-FB-ROTATING-CULTURAL-SPACES",
      "OBS-NYCAC-FB-CIVIC-CULTURAL-SEQUENCE",
      "OBS-NYCAC-FB-CAMPAIGN-EVOLUTION",
      "OBS-NYCAC-FB-EVENT-RESPONSE-SNAPSHOT",
      "OBS-NYCAC-FB-EVENT-POSTED-SOURCES",
      "OBS-NYCAC-FB-PROTECTED-RESEARCH-METHOD",
      "OBS-NYCAC-JAMIE-EVENT-SYSTEM-ACCOUNT",
      "OBS-NYCAC-FB-GOTHAMIST-FAIR-RENT-CONTEXT",
      ...eventSourceSeeds.map(
        (source) => `OBS-NYCAC-FB-EVENT-DETAIL-${source.eventId}`,
      ),
    ],
    researchTaskIds: [
      "RT-NYCAC-FB-RECONCILE-UNMATERIALIZED-EVENT",
      "RT-NYCAC-FB-JAMIE-EVENT-ROLE-CORROBORATION",
      "RT-NYCAC-FB-ATTENDANCE-AND-OUTCOME-CORROBORATION",
      "RT-NYCAC-FB-OUT-OF-INDEX-EVENT-CROSSWALK",
    ],
    disposition:
      "Integrated the 33 exposed event records, preserved the page's unresolved 34-versus-33 denominator, promoted the collective recurring-event method and bounded response snapshot, retained Jamie's first-hand role account as a corroboration task, and excluded raw descriptions and historical access details from the public repository.",
  },
] satisfies CaptureRecord[];

export const nycacFacebookEventSources = [
  {
    id: fixtureSourceId,
    title: "NYC Artist Coalition Facebook Past Events full-population inventory",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/500fec4753e2540c6c0ad964f23ce3838a26a0cb/apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe inventory of every event card exposed by the NYC Artist Coalition Facebook page's Past Events surface on July 15, 2026.",
    publicNote:
      "Facebook displayed 34 past events but materialized 33 unique cards. All 33 exposed detail pages were recovered. The fixture publishes metadata and selected mission links, not raw event descriptions, contacts, meeting credentials, or attendee identities.",
    supportsGenerally: [
      "33 exposed event records from January 2017 through January 2021",
      "24 index cards displaying NYC Artist Coalition as an organizer and nine allied or cohosted listings",
      "recurring cultural-space meetings, government hearings, public panels, rallies, and virtual relief events",
      "32 event-level response snapshots and seven event-posted source articles",
    ],
    doesNotEstablish: [
      "the identity of the one event included in Facebook's displayed count but not materialized",
      "attendance, unique people, reach, impressions, conversion, or policy impact",
      "Jamie's authorship or production of every event",
      "a complete owner export or a record of deleted events",
    ],
  },
  {
    id: researchSourceId,
    title: "Authenticated NYC Artist Coalition Facebook event research run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Authenticated July 15, 2026 archival-production pass over NYC Artist Coalition Facebook events.",
    publicNote:
      "The protected capture preserves full public event descriptions and traversal provenance for future audit while withholding historical contacts, access credentials, working-document links, and authenticated-session state.",
    protectedLocatorId: "PTR-NYCAC-FACEBOOK-EVENTS-CAPTURE-2026-07-15",
    supportsGenerally: [
      "repeated-scroll terminal-state method",
      "detail-page recovery and event-to-link extraction",
      "private source-body close reading used to assign topics",
    ],
    doesNotEstablish: [
      "permission to publish raw historical event descriptions",
      "a complete owner export",
      "attendance, private engagement, or off-platform outcomes",
    ],
  },
  {
    id: jamieAccountSourceId,
    title: "Jamie Burkart first-hand account of NYC Artist Coalition event practice",
    author: "Jamie Burkart",
    kind: "firsthand-statement",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart, first-hand account of his contribution to NYC Artist Coalition's recurring event practice, July 15, 2026.",
    publicNote:
      "Jamie describes connecting lessons from WOW List to legislative advocacy, helping establish a recurring event practice, and treating events as listening, relationship, and public-power infrastructure. This account is retained for collaborator corroboration rather than used as sole public proof of individual production credit.",
    protectedLocatorId: "PTR-NYCAC-JAMIE-EVENT-SYSTEM-ACCOUNT-2026-07-15",
    supportsGenerally: [
      "Jamie's stated event-system role",
      "the relationship Jamie draws between WOW List and coalition convening",
      "his stated intention to use rotating meetings for listening and collective agency",
    ],
    doesNotEstablish: [
      "sole authorship or production of the event system",
      "the task split for any individual event",
      "attendance, policy causality, or every collaborator's view",
    ],
  },
  {
    id: gothamistRentSourceId,
    title:
      "Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization",
    organization: "Gothamist",
    author: "Elizabeth Kim",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live-and-archived",
    publishedAt: "2019-11-06",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization",
    archiveUrl:
      "https://web.archive.org/web/20191107031823/https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Elizabeth Kim, 'Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization,' Gothamist, November 6, 2019.",
    publicNote:
      "The Fair Rent NYC anti-displacement rally event description linked this contemporaneous report. It provides public policy context; it is not evidence that Jamie wrote the bill or produced the event alone.",
    supportsGenerally: [
      "contemporaneous commercial-rent-stabilization policy context",
      "the planned Council introduction described in the article",
      "the event archive's circulation of mission-relevant reporting",
    ],
    doesNotEstablish: [
      "Jamie's authorship of the policy proposal",
      "Jamie's individual event-production role",
      "adoption or effects of the proposed policy",
    ],
  },
  ...eventSourceSeeds.map(
    (source): SourceRecord => ({
      id: source.id,
      title: source.title,
      organization: source.organization,
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: source.date,
      accessedAt: reviewedAt,
      canonicalUrl: `https://www.facebook.com/events/${source.eventId}/`,
      preferredPublicUrl: "canonical",
      publicCitation: `${source.organization}, '${source.title},' Facebook event, ${source.date}.`,
      publicNote:
        "Historical public event page captured in the full-population pass. Displayed response counts are RSVP actions, not attendance or unique people.",
      supportsGenerally: [...source.supports],
      doesNotEstablish: [
        "verified attendance or unique participants",
        "Jamie's authorship or production role",
        "sole coalition ownership or policy causality",
      ],
    }),
  ),
] satisfies SourceRecord[];

export const nycacFacebookEventObservations = [
  {
    id: "OBS-NYCAC-FB-EVENT-POPULATION-RECONCILIATION",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "On July 15, 2026, Facebook's NYC Artist Coalition page displayed 34 past events while repeated scrolling exposed 33 unique event cards; all 33 exposed detail pages were recovered after nine scroll rounds and four stable no-growth rounds.",
    observationType: "metadata",
    locator: "Population reconciliation and terminal-state manifest.",
    confidence: "high",
    limitations: [
      "The unidentified remainder is unmaterialized, not proven absent or deleted; the pass is complete for the live Past Events surface, not an owner export.",
    ],
    supportsClaimIds: [eventInfrastructureClaimId, eventResponseClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-EVENT-ORGANIZER-RELATION",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "Twenty-four of the 33 exposed index cards displayed NYC Artist Coalition as an organizer; nine appeared as allied or cohosted listings whose detail organizer lines often collapsed multiple partners as 'and others.'",
    observationType: "metadata",
    locator: "Event-level index organizer displays and page-relation classification.",
    confidence: "high",
    limitations: [
      "The collapsed organizer display does not recover every cohost or define each partner's role; allied listings are not treated as coalition-owned events.",
    ],
    supportsClaimIds: [eventInfrastructureClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-ROTATING-CULTURAL-SPACES",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "The exposed record shows recurring meetings and public programs rotating through cultural and community spaces including Magick City, The Floasis, Market Hotel, Muchmore's, The City Reliquary, Shoestring Press, Chinatown Soup, Secret Project Robot, Friends and Lovers, Flowers for all Occasions, and Ode to Babel, alongside government and virtual venues.",
    observationType: "metadata",
    locator: "Chronological event inventory, venue names, and venue categories.",
    confidence: "high",
    limitations: [
      "The pattern is rotating, not always different; Market Hotel and other locations recur, and venue names do not by themselves establish attendance or the full program produced on site.",
    ],
    supportsClaimIds: [eventInfrastructureClaimId, democracyLabClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-CIVIC-CULTURAL-SEQUENCE",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "The 2017 event sequence moves between coalition meetings in cultural spaces, safety and legal study sessions, Department of Cultural Affairs engagement, City Hall Cabaret Law hearings, a Night Mayor town hall at Market Hotel, and the Council repeal event.",
    observationType: "metadata",
    locator: "Chronological inventory from January 27 through October 31, 2017.",
    confidence: "high",
    limitations: [
      "Sequence establishes a documented advocacy pathway, not sole coalition control or individual causality for the Council vote.",
    ],
    supportsClaimIds: [eventInfrastructureClaimId, democracyLabClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-CAMPAIGN-EVOLUTION",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "Across 2017-2021, event topics develop from DIY-space safety and Cabaret Law repeal through cultural planning, Office of Nightlife accountability, MARCH transparency, commercial-rent and anti-displacement advocacy, and COVID-era relief and mutual aid.",
    observationType: "metadata",
    locator: "Event dates, titles, topic classifications, campaign links, and selected detail-page review.",
    confidence: "high",
    limitations: [
      "Topic classification describes the exposed Facebook record and does not establish the coalition's complete agenda, every off-platform activity, or policy outcomes.",
    ],
    supportsClaimIds: [eventInfrastructureClaimId, democracyLabClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-EVENT-RESPONSE-SNAPSHOT",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "Thirty-two recovered events retain displayed Facebook response counts: 19 show at least 100 responses, seven at least 500, and three at least 1,000; summing displayed values as point estimates yields 9,989 response actions, with three event counts rounded in thousands.",
    observationType: "metadata",
    locator: "Aggregate response snapshot and event-level response fields.",
    confidence: "high",
    limitations: [
      "Response actions are not unique people, verified attendance, reach, impressions, conversion, or impact; the 9,989 sum is approximate because three displayed counts use rounded K notation.",
    ],
    supportsClaimIds: [eventResponseClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-EVENT-POSTED-SOURCES",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "Event descriptions posted seven identified source articles across New York Post, WNYC, Metro, The New Yorker, The Baffler, Curbed, and Gothamist, associating reporting with Cabaret Law, MARCH, and commercial-rent advocacy moments.",
    observationType: "metadata",
    locator: "Posted-source-article manifest and event associations.",
    confidence: "high",
    limitations: [
      "A posted link shows source circulation, not endorsement of every article statement, proof of readership, or coverage of Jamie individually.",
    ],
    supportsClaimIds: [eventInfrastructureClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-PROTECTED-RESEARCH-METHOD",
    sourceId: researchSourceId,
    project: projectId,
    statement:
      "The protected research capture retains the full public descriptions, extracted links, authenticated traversal, and detail-recovery provenance from which the sanitized fixture and topic associations were produced.",
    observationType: "metadata",
    locator: "Protected capture manifest and event-detail research log.",
    confidence: "high",
    limitations: [
      "The protected capture is not permission to publish historical contacts, meeting credentials, private working-document links, or raw authenticated-session material.",
    ],
    supportsClaimIds: [eventInfrastructureClaimId, eventResponseClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-JAMIE-EVENT-SYSTEM-ACCOUNT",
    sourceId: jamieAccountSourceId,
    project: projectId,
    statement:
      "Jamie describes the coalition's recurring events as a major area of his contribution, connecting insights from WOW List to legislative advocacy and treating changing cultural-space meetings as a practice of listening, relationship-building, and collective agency.",
    observationType: "attributed",
    locator: "Jamie's July 15, 2026 first-hand account supplied for archival production.",
    confidence: "high",
    limitations: [
      "This is Jamie's first-hand account, not independent collaborator attribution; it does not assign every event task or establish sole authorship.",
    ],
    supportsClaimIds: [jamieEventRoleClaimId, democracyLabClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-GOTHAMIST-FAIR-RENT-CONTEXT",
    sourceId: gothamistRentSourceId,
    project: projectId,
    statement:
      "Gothamist reported on the planned introduction of a New York City commercial-rent-stabilization proposal and described small-business and retail-vacancy context; the coalition's November 2019 anti-displacement rally event circulated the article.",
    observationType: "explicit",
    locator: "Article headline, publication metadata, policy description, and event-posted URL association.",
    confidence: "high",
    limitations: [
      "The article provides policy context and source circulation, not Jamie's authorship of the proposal, individual event production, adoption, or measured effects.",
    ],
    supportsClaimIds: [eventInfrastructureClaimId],
    reviewedAt,
  },
  ...eventSourceSeeds.map(
    (source): ObservationRecord => ({
      id: `OBS-NYCAC-FB-EVENT-DETAIL-${source.eventId}`,
      sourceId: source.id,
      project: projectId,
      statement: `The public Facebook event page identifies '${source.title}' on ${source.date} and supports the bounded event facts recorded for this representative point in the coalition chronology.`,
      observationType: "metadata",
      locator: "Event title, date, organizer display, venue or event form, and displayed response snapshot.",
      confidence: "high",
      limitations: [
        "The event page does not establish verified attendance, Jamie's individual production role, sole coalition ownership, or policy causality.",
      ],
      supportsClaimIds: [eventInfrastructureClaimId, eventResponseClaimId],
      reviewedAt,
    }),
  ),
] satisfies ObservationRecord[];

export const nycacFacebookEventClaims = [
  {
    id: eventInfrastructureClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "NYC Artist Coalition used recurring events as participatory advocacy infrastructure: meetings rotated through cultural spaces, connected artist and venue concerns to public agencies and City Hall, and sustained campaign work across safety, Cabaret Law repeal, nightlife governance, MARCH transparency, commercial rent, and relief.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-NYCAC-FB-EVENT-POPULATION-RECONCILIATION",
      "OBS-NYCAC-FB-EVENT-ORGANIZER-RELATION",
      "OBS-NYCAC-FB-ROTATING-CULTURAL-SPACES",
      "OBS-NYCAC-FB-CIVIC-CULTURAL-SEQUENCE",
      "OBS-NYCAC-FB-CAMPAIGN-EVOLUTION",
      "OBS-NYCAC-FB-EVENT-POSTED-SOURCES",
      "OBS-NYCAC-FB-PROTECTED-RESEARCH-METHOD",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "NYC Artist Coalition used recurring events as participatory advocacy infrastructure: meetings rotated through small cultural spaces, connected artist and venue concerns to public agencies and City Hall, and sustained work from safety and Cabaret Law repeal through nightlife accountability, commercial rent, and relief.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
      },
      {
        key: "archive-note",
        text:
          "The current Facebook archive exposes 33 coalition-listed past events from 2017-2021, documenting a recurring practice across cultural venues, government hearings, public panels, rallies, and virtual relief meetings.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
      },
    ],
    evidence: [
      {
        sourceId: fixtureSourceId,
        relationship: "direct-support",
        supports: [
          "the 33-event exposed population and chronology",
          "rotating cultural-space and government venues",
          "organizer-relation and topic patterns",
          "event-posted mission resources and source articles",
        ],
        locator: "Population manifest, event inventory, topics, venues, and posted-source associations.",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-NYCAC-CREATENYC-APPENDIX-2017",
        relationship: "corroborating",
        supports: [
          "a March 2017 Market Hotel town hall",
          "named city and Council participants",
          "the coalition's multi-issue cultural-space agenda",
        ],
        locator: "City-hosted appendix and event agenda.",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-NYCAC-FB-EVENT-MARKET-HOTEL-TOWN-HALL-2017-03-30",
        relationship: "corroborating",
        supports: [
          "the March 2017 Market Hotel event identity and response snapshot",
          "a cultural-space meeting connected to city and Council participants",
        ],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-NYCAC-FB-EVENT-NIGHT-MAYOR-TOWN-HALL-2017-10-11",
        relationship: "corroborating",
        supports: [
          "a high-response town hall at Market Hotel",
          "the interface between small cultural spaces and nightlife governance",
        ],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-NYCAC-FB-EVENT-MARCH-FAIR-RENT-2018-11-01",
        relationship: "corroborating",
        supports: ["continuity from MARCH enforcement concerns into commercial-rent advocacy"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: researchSourceId,
        relationship: "private-support",
        supports: ["authenticated traversal and private description-level close reading"],
        publicNote: "Protected capture; only sanitized metadata is public.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "This is a collective NYC Artist Coalition method claim; it does not assign every event to Jamie or erase cohosts, venue operators, artists, officials, and participants.",
      "The archive is complete for the 33 events exposed by the live Past Events surface; Facebook displayed 34, leaving one unmaterialized event unresolved.",
      "The venues rotated but were not always different; Market Hotel and other locations recur.",
      "Event sequence and public response do not establish sole policy causality.",
    ],
    antiClaims: [
      "Jamie alone created or produced every NYC Artist Coalition event",
      "NYC Artist Coalition acted without cohosts or partner organizations",
      "The 33 events are a complete owner export",
      "Recurring events alone caused the cited legislative or administrative outcomes",
    ],
    researchTaskIds: [
      "RT-NYCAC-FB-RECONCILE-UNMATERIALIZED-EVENT",
      "RT-NYCAC-FB-OUT-OF-INDEX-EVENT-CROSSWALK",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex authenticated archival-production review"],
  },
  {
    id: eventResponseClaimId,
    project: projectId,
    claimType: "scale",
    internalClaim:
      "Thirty-two of the 33 exposed NYC Artist Coalition Facebook event records retain response totals: 19 display at least 100 responses, seven at least 500, and three at least 1,000. The displayed point estimates sum to approximately 9,989 response actions.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-NYCAC-FB-EVENT-POPULATION-RECONCILIATION",
      "OBS-NYCAC-FB-EVENT-RESPONSE-SNAPSHOT",
      "OBS-NYCAC-FB-PROTECTED-RESEARCH-METHOD",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "Facebook's current archive exposes 33 coalition-listed past events. Thirty-two retain response totals; 19 show at least 100 responses, seven at least 500, and three at least 1,000. These are historical RSVP actions, not unique people or verified attendance.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
      },
      {
        key: "archive-note",
        text:
          "The 32 displayed event-response totals yield a point estimate of 9,989 RSVP actions; three source values are rounded in thousands, and none should be treated as attendance or unique people.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
      },
    ],
    evidence: [
      {
        sourceId: fixtureSourceId,
        relationship: "direct-support",
        supports: [
          "32 events with displayed response totals",
          "the 19, seven, and three response-threshold counts",
          "the approximate 9,989 response-action point estimate",
          "the three rounded K-formatted source values",
        ],
        locator: "Aggregate response snapshot and event-level response fields.",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: researchSourceId,
        relationship: "private-support",
        supports: ["authenticated detail-page capture provenance"],
        publicNote: "Protected capture; the aggregate values are preserved in the public fixture.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Facebook response totals are RSVP actions, not unique people, attendance, reach, impressions, conversion, or impact.",
      "The 9,989 total is an approximate point estimate because three displayed values are rounded in thousands.",
      "Counts are point-in-time values observed on July 15, 2026 and may change or disappear.",
      "One of the 33 exposed events did not display a response total.",
    ],
    antiClaims: [
      "9,989 people attended NYC Artist Coalition events",
      "9,989 unique people engaged with the coalition",
      "Facebook responses establish policy impact or conversion",
      "Every event drew at least 100 responses",
    ],
    researchTaskIds: ["RT-NYCAC-FB-ATTENDANCE-AND-OUTCOME-CORROBORATION"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex authenticated archival-production review"],
  },
  {
    id: jamieEventRoleClaimId,
    project: projectId,
    claimType: "role",
    internalClaim:
      "Jamie describes a major contribution to NYC Artist Coalition as helping establish and operate its recurring event system, carrying lessons from WOW List into legislative advocacy and using meetings in cultural spaces as listening, relationship, and civic-interface infrastructure.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: ["OBS-NYCAC-JAMIE-EVENT-SYSTEM-ACCOUNT"],
    projections: [
      {
        key: "case-study",
        text:
          "Jamie describes helping establish NYC Artist Coalition's recurring event system, bringing lessons from WOW List into cultural-space listening and legislative advocacy.",
        status: "hold",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
      },
      {
        key: "archive-note",
        text:
          "Jamie's first-hand account identifies recurring events as a major area of his contribution and a bridge from WOW List's event practice into coalition advocacy; collaborator and artifact corroboration remain open.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
      },
    ],
    evidence: [
      {
        sourceId: jamieAccountSourceId,
        relationship: "direct-support",
        supports: [
          "Jamie's stated contribution to the event system",
          "his stated connection between WOW List and coalition advocacy",
          "his stated listening and collective-agency intent",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: fixtureSourceId,
        relationship: "context",
        supports: ["the existence, continuity, and form of the recurring event system"],
        publicNote:
          "The Facebook archive corroborates the system's public form, not Jamie's individual task ownership.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "The first-hand account is public-safe but not yet independently corroborated at the task level.",
      "The Facebook archive corroborates the event system, not the author or producer of every record.",
      "Any public promotion should preserve collective and cohost credit and avoid assigning every event to Jamie.",
    ],
    antiClaims: [
      "Jamie single-handedly invented or ran NYC Artist Coalition's events",
      "Jamie authored every event description or campaign action",
      "WOW List alone produced the coalition's advocacy method",
      "The event archive proves Jamie's precise task split",
    ],
    researchTaskIds: ["RT-NYCAC-FB-JAMIE-EVENT-ROLE-CORROBORATION"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart first-hand account", "Codex archival-production review"],
  },
  {
    id: democracyLabClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "The coalition's recurring event practice can be interpreted as a democracy lab: believing cultural participants, gathering situated knowledge in the places affected, translating between cultural and civic practices, and carrying concerns toward public decision-making.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "inference",
    observationIds: [
      "OBS-NYCAC-FB-ROTATING-CULTURAL-SPACES",
      "OBS-NYCAC-FB-CIVIC-CULTURAL-SEQUENCE",
      "OBS-NYCAC-FB-CAMPAIGN-EVOLUTION",
      "OBS-NYCAC-JAMIE-EVENT-SYSTEM-ACCOUNT",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie interprets the recurring event practice as a democracy lab: believing cultural participants, gathering situated knowledge in the places affected, and translating concerns toward civic decision-making.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
      },
    ],
    evidence: [
      {
        sourceId: jamieAccountSourceId,
        relationship: "direct-support",
        supports: ["Jamie's stated interpretation and values"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: fixtureSourceId,
        relationship: "context",
        supports: ["the recurring venue, issue, and civic-interface patterns underlying the interpretation"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "This is Jamie's interpretation of the practice, not a neutral empirical outcome or a quotation attributable to every coalition member.",
      "Use as reflective context only when the audience and composition benefit from it.",
    ],
    antiClaims: [
      "Every participant described the coalition as a democracy lab",
      "The event record quantitatively proves democratic impact",
      "The interpretation replaces concrete event, policy, and collaborator evidence",
    ],
    researchTaskIds: ["RT-NYCAC-FB-JAMIE-EVENT-ROLE-CORROBORATION"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart first-hand account", "Codex archival-production review"],
  },
] satisfies ClaimRecord[];

export const nycacFacebookEventResearchTasks = [
  {
    id: "RT-NYCAC-FB-RECONCILE-UNMATERIALIZED-EVENT",
    project: projectId,
    question:
      "Which event accounts for the gap between Facebook's displayed 34 past events and the 33 unique event cards materialized by the live Past Events surface?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026"],
    sourceIds: [fixtureSourceId, researchSourceId],
    claimIds: [eventInfrastructureClaimId, eventResponseClaimId],
    successCriteria: [
      "Acquire a page-owner event export, historical Meta archive, or other stable first-party enumeration.",
      "Reconcile event identities against the 33-row public fixture without renumbering recovered records.",
      "Classify the remainder as recovered, deleted, duplicate, hidden, or still unresolved only when evidence supports that state.",
    ],
    nextActions: [
      "Request the available Meta page-owner data export.",
      "Compare export identities with the live event fixture and @NYCArtC event-link candidates.",
      "Preserve any private or deleted record as a protected pointer until it passes public-safety review.",
    ],
    publicNote:
      "The live surface is fully reviewed as exposed. One event represented by Facebook's aggregate count did not materialize and remains unresolved.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-NYCAC-FB-JAMIE-EVENT-ROLE-CORROBORATION",
    project: projectId,
    question:
      "What collaborator testimony and dated artifacts establish Jamie's exact role in designing, producing, and sustaining NYC Artist Coalition's recurring event system?",
    priority: "high",
    status: "in-progress",
    captureIds: ["CAP-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026"],
    sourceIds: [fixtureSourceId, jamieAccountSourceId],
    claimIds: [jamieEventRoleClaimId, democracyLabClaimId],
    successCriteria: [
      "Recover dated planning documents, venue correspondence, run-of-show files, design artifacts, calendar records, or post-level authorship evidence for representative events.",
      "Invite Olympia Kazi and other collaborators to confirm, refine, or contest Jamie's event-system account.",
      "Separate event-system design, production, communications, facilitation, documentation, and partner roles.",
      "Promote a public role claim only after collective credit and representative task evidence are explicit.",
    ],
    nextActions: [
      "Search project Drive, iCloud, email, code, and design archives by the 33 event IDs, titles, and dates.",
      "Prepare a concise collaborator proof-note request with the current chronology and boundaries.",
      "Associate each recovered artifact with the relevant event and task type.",
    ],
    publicNote:
      "Jamie identifies events as a major contribution. The public event system is established; individual role granularity remains under corroboration.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-NYCAC-FB-ATTENDANCE-AND-OUTCOME-CORROBORATION",
    project: projectId,
    question:
      "Which events have independent evidence of attendance, participant composition, public-official participation, testimony gathered, follow-up actions, or policy use?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026"],
    sourceIds: [
      fixtureSourceId,
      "SRC-NYCAC-CREATENYC-APPENDIX-2017",
      "SRC-NYCAC-FB-EVENT-NIGHT-MAYOR-TOWN-HALL-2017-10-11",
      "SRC-NYCAC-FB-EVENT-MARCH-HEARING-2019-02-11",
    ],
    claimIds: [eventInfrastructureClaimId, eventResponseClaimId],
    successCriteria: [
      "Distinguish Facebook RSVP actions from documented attendance and participation.",
      "Recover public-safe photographs, sign-in totals, press accounts, hearing records, venue records, or collaborator testimony for priority events.",
      "Connect event inputs to later outputs only where dated records establish the relationship.",
      "Record photo rights, consent, and caption provenance before public use.",
    ],
    nextActions: [
      "Prioritize the March 2017 Market Hotel gathering, Cabaret hearings, October 2017 Night Mayor town hall, March 2018 panel, and February 2019 MARCH hearing.",
      "Search Jamie's photo archive using event dates, venues, and collaborator names.",
      "Compare event records with Council transcripts, agency records, campaign follow-ups, and press coverage.",
    ],
    publicNote:
      "Facebook response totals are retained as platform snapshots only. Attendance and outcomes require independent event-level evidence.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-NYCAC-FB-OUT-OF-INDEX-EVENT-CROSSWALK",
    project: projectId,
    question:
      "How should event URLs promoted by @NYCArtC on X but absent from the current Facebook Past Events index be classified?",
    priority: "medium",
    status: "in-progress",
    captureIds: ["CAP-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026"],
    sourceIds: [
      fixtureSourceId,
      "SRC-SOCIAL-NYCAC-RETRIEVABLE-POPULATION-2026-07-14",
    ],
    claimIds: [eventInfrastructureClaimId],
    successCriteria: [
      "Review every Facebook event URL authored or promoted in the @NYCArtC retrievable X fixture.",
      "Distinguish coalition-owned or cohosted events from allied events the account merely amplified.",
      "Record content-unavailable and not-recovered states without adding them to the 33-event live-index denominator.",
      "Reconcile any confirmed missing page-owned event with the 34-versus-33 Facebook count.",
    ],
    nextActions: [
      "Close-read the remaining unresolved Facebook event candidates from the X link inventory.",
      "Use Wayback and owner-archive sources for unavailable event pages.",
      "Maintain a separate promoted-event crosswalk rather than inflating the live Facebook index population.",
    ],
    publicNote:
      "Several allied event pages were promoted by @NYCArtC on X but are not members of the current 33-card Facebook Past Events population. They remain a separate research set.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
] satisfies ResearchTask[];

export const nycacFacebookEventInquiries = [
  {
    id: "INQ-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15",
    project: projectId,
    question:
      "Can every event exposed by NYC Artist Coalition's live Facebook Past Events surface be safely preserved and translated into defensible claims about recurring convening, source circulation, and public response without treating RSVPs as attendance or assigning collective work to Jamie alone?",
    methods: [
      "Use Jamie's authenticated Facebook session and navigate directly to the NYC Artist Coalition Events surface.",
      "Select Past Events and scroll until repeated no-growth passes establish a stable terminal state.",
      "Deduplicate event identities, then open and recover every exposed detail page.",
      "Extract dates, titles, venues, displayed organizer relations, durations, aggregate response strings, and outbound links.",
      "Close-read descriptions privately to classify mission topics and distinguish source articles from campaign resources and dated logistics.",
      "Exclude raw descriptions, attendee identities, historical contacts, meeting credentials, and private working-document links from the public fixture.",
      "Cross-check event links already preserved in the @NYCArtC X fixture without adding allied or unavailable events to the Facebook index denominator.",
      "Separate collective method claims, platform response snapshots, Jamie's first-hand role account, and interpretive language into distinct claim records.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Facebook displayed 34 past events but materialized 33 unique cards; all 33 exposed detail pages were recovered.",
      "Twenty-four index cards displayed NYC Artist Coalition as an organizer and nine were allied or cohosted listings.",
      "The event record spans January 2017 through January 2021 and rotates among cultural spaces, government settings, public actions, and virtual relief programs.",
      "The chronology connects safety and cultural-planning concerns with Cabaret Law repeal, nightlife governance, MARCH transparency, commercial-rent advocacy, and COVID-era relief.",
      "Thirty-two events retain response totals; 19 display at least 100 responses, seven at least 500, and three at least 1,000.",
      "The displayed point estimates sum to approximately 9,989 response actions, with three K-formatted counts rounded in thousands.",
      "Seven identified source articles were posted across Cabaret Law, MARCH, and commercial-rent event descriptions.",
      "Jamie identifies the event system as a major contribution, but collaborator and task-level corroboration remain open.",
    ],
    limitations: [
      "One event represented in Facebook's displayed count did not materialize and remains unidentified.",
      "The pass covers the live Past Events surface, not a page-owner export or deleted-event history.",
      "Facebook response actions are not unique people, verified attendance, reach, conversion, or impact.",
      "Event pages and topic patterns do not identify the author or producer of every event.",
      "Raw descriptions and historical access details remain protected and are not public citations.",
    ],
    sourceIds: [
      fixtureSourceId,
      researchSourceId,
      jamieAccountSourceId,
      gothamistRentSourceId,
      ...eventSourceIds,
      "SRC-NYCAC-CREATENYC-APPENDIX-2017",
      "SRC-SOCIAL-NYCAC-RETRIEVABLE-POPULATION-2026-07-14",
    ],
    publicSummary:
      "The live Past Events surface is fully reviewed as exposed: 33 event records recovered against a displayed count of 34, with collective event-infrastructure and bounded response-snapshot claims promoted and one unresolved denominator retained.",
    protectedLocatorId: "PTR-NYCAC-FACEBOOK-EVENTS-CAPTURE-2026-07-15",
  },
] satisfies ResearchInquiry[];
