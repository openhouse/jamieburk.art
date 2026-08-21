const reviewedAt = "2026-07-15";
const reviewedBy = ["Jamie Burkart", "Codex authenticated public-safe archival review"];

const sourceIds = {
  surface: "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
  census: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
  protectedRun: "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
  firsthandRole: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
  nyPostFootloose: "SRC-NYCAC-NYPOST-FOOTLOOSE-2017-04-08",
  gothamistCommercialRent: "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-2019-11-06"
} as const;

const existingArticleSourceIds = [
  "SRC-NYCAC-WNYC-CABARET-2017",
  "SRC-NYCAC-METRO-CABARET-2017",
  "SRC-NYCAC-NEW-YORKER-DANCE-OUTLAWS-2017-07-10",
  "SRC-NYCAC-BAFFLER-MARCH",
  "SRC-NYCAC-CURBED-COMMERCIAL-RENT-2019-11-08"
] as const;

export const nycacFacebookEventSourceIds = sourceIds;
export const nycacFacebookEventArticleSourceIds = [
  sourceIds.nyPostFootloose,
  ...existingArticleSourceIds,
  sourceIds.gothamistCommercialRent
] as const;

export const nycacFacebookEventClaimIds = {
  population: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
  participationSystem: "CLM-NYCAC-PARTICIPATION-SYSTEM",
  responseSignals: "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
  democraticPractice: "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
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
  recurringMeetingEventIds: [
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
    "772824526895291"
  ],
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
  detailRecheckRecovered: 28,
  detailRecheckUnavailable: 5
} as const;

export const nycacFacebookEventKnowledge = {
  intakeItems: [
    {
      id: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      kind: "analysis-note",
      title: "NYC Artist Coalition Facebook event full-population archival production",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated archival review",
      projectIds: [
        "nyc-artist-coalition",
        "let-nyc-dance",
        "save-nyc-spaces",
        "talks-not-raids",
        "fair-rent-nyc"
      ],
      reason: "Preserve every currently exposed Facebook Past Events record as a public-safe civic plot point, reconcile the platform counter, inventory source routes and stakeholder interfaces, and keep response labels distinct from attendance.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        sourceIds.surface,
        sourceIds.census,
        sourceIds.protectedRun,
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
      researchInquiryIds: [
        "INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT",
        "INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"
      ],
      boundaries: [
        "One hundred percent means every one of the 34 displayed control slots has a disposition: 33 recovered records and one unresolved slot; it does not mean a complete native Meta owner export.",
        "Facebook response labels are not verified attendance, unique people, reach, participation, endorsement, conversion, mandate, or impact.",
        "Shared event pages and cohost displays do not identify the individual author or producer of each event.",
        "Raw descriptions, attendee identities, comments, contact details, meeting credentials, private working links, and authenticated-session data remain outside the public repository."
      ]
    },
    {
      id: "INTAKE-NYCAC-FACEBOOK-EVENT-PRACTICE-MEMORY-2026",
      kind: "memory-lead",
      title: "Jamie Burkart account of NYC Artist Coalition's event and participation practice",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["nyc-artist-coalition", "wowlist"],
      reason: "Preserve Jamie's account of connecting WOW List's participation ethos with legislative advocacy, rotating meetings among cultural spaces, believing artists, and treating events as relational civic infrastructure.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [sourceIds.firsthandRole, sourceIds.census],
      observationIds: [
        "OBS-NYCAC-FACEBOOK-JAMIE-ROLE-MEMORY",
        "OBS-NYCAC-FACEBOOK-DEMOCRACY-LAB-INTERPRETATION"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      boundaries: [
        "Jamie's first-hand account supports his contribution and interpretation; it does not assign him sole authorship or production of every event.",
        "The recurring event record corroborates the collective system's form, not the exact division of labor behind each event.",
        "Democracy lab, city nervous system, believing artists, and events as art remain attributed interpretations rather than measured outcomes or participant consensus."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-NYCAC-FACEBOOK-EVENT-POPULATION",
      intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: [sourceIds.surface, sourceIds.protectedRun],
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "Facebook displayed a 34-past-events host control while repeated authenticated scrolling exposed 33 unique event IDs. All 33 exposed event records were reviewed, and the remaining control slot is preserved as unresolved.",
      locator: "populationReconciliation",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookEventClaimIds.population],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT"],
      limitations: [
        "The unresolved slot has no recovered title, date, host, or campaign assignment.",
        "The live surface cannot reveal events removed before capture or guarantee owner-export completeness."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-EVENT-CHRONOLOGY",
      intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "The 33 recovered records span January 2017 through January 2021: 17 in 2017, three in 2018, six in 2019, six in 2020, and one in 2021. Twenty-four index cards display NYC Artist Coalition as organizer and nine are allied or cohosted listings.",
      locator: "aggregateSnapshot and events[].date",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookEventClaimIds.population, nycacFacebookEventClaimIds.participationSystem],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      limitations: [
        "An organizer display records the event-page relationship, not individual human authorship.",
        "The chronology is complete for the exposed control, not necessarily every event ever created by the coalition."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-ROTATING-MEETINGS",
      intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "nyc-artist-coalition",
      kind: "bounded-inference",
      text: "Twelve records are recurring coalition meetings. Ten physical meetings name ten different cultural spaces - Magick City, The Floasis, Muchmore's, The City Reliquary, Shoestring Press, Chinatown Soup, Secret Project Robot, Friends and Lovers, Flowers for all Occasions, and Ode to Babel - while two later meetings were virtual.",
      locator: "events[].topics, venue, and date",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookEventClaimIds.participationSystem],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      limitations: [
        "The record supports a recurring rotating-venue practice, not an uninterrupted meeting in every calendar month.",
        "A named venue does not establish attendance, facilitation quality, or the experience of every participant."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-CIVIC-CULTURAL-INTERFACES",
      intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: [sourceIds.protectedRun],
      project: "nyc-artist-coalition",
      kind: "bounded-inference",
      text: "The recovered sequence includes coalition meetings, fire-safety study sessions, legal and architectural questions, venue-support actions, panels, City Hall hearings, a DCLA meeting, nightlife town halls, small-business advocacy, mutual aid, and pandemic relief. Public event displays connect cultural spaces and artist groups with advocates, agencies, elected officials, and civic institutions.",
      locator: "events[].venueCategory, topics, title, and organizer displays",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookEventClaimIds.participationSystem, nycacFacebookEventClaimIds.democraticPractice],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      limitations: [
        "A cohost, speaker, official, venue, or agency appearance does not establish endorsement of Jamie or every coalition position.",
        "Event chronology alone does not establish that a gathering caused a legislative, agency, or enforcement outcome."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-RESPONSE-SIGNALS",
      intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "Thirty-two recovered pages display historical Facebook response counts. Nineteen display at least 100 responses, seven at least 500, and three at least 1,000.",
      locator: "aggregateSnapshot and events[].responseSnapshot",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookEventClaimIds.responseSignals],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      limitations: [
        "Response labels are event-level interface states, not verified attendance, unique people, reach, participation, endorsement, conversion, mandate, or impact.",
        "People may respond to multiple events, and three values are rounded in thousands, so the values are not summed into a people-reached claim."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-POSTED-SOURCE-ROUTES",
      intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: [...nycacFacebookEventArticleSourceIds],
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "Recovered event descriptions routed participants to seven source articles from New York Post, WNYC, Metro, The New Yorker, The Baffler, Curbed, and Gothamist across Cabaret Law, M.A.R.C.H., and Commercial Rent Stabilization contexts.",
      locator: "postedSourceArticles",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookEventClaimIds.population],
      researchInquiryIds: [],
      limitations: [
        "A posted link establishes circulation through an event page, not adoption of every statement by every host or participant.",
        "Article-level claims remain governed by the separate campaign press close readings."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-DETAIL-AVAILABILITY",
      intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      sourceId: sourceIds.protectedRun,
      comparisonSourceIds: [sourceIds.census],
      project: "nyc-artist-coalition",
      kind: "limitation",
      text: "An earlier authenticated capture recovered all 33 exposed detail records. A later replay recovered the same 33 event IDs but only 28 detail bodies; five routes returned an unavailable state. The public census retains the earlier recovered public metadata and records the later volatility.",
      locator: "Protected capture reconciliation and public fixture detailAvailabilityRecheck",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookEventClaimIds.population],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT"],
      limitations: [
        "A later unavailable state does not mean the event never existed or that its earlier public metadata is invalid.",
        "Platform availability can change and does not substitute for a native owner export."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-JAMIE-ROLE-MEMORY",
      intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-PRACTICE-MEMORY-2026",
      sourceId: sourceIds.firsthandRole,
      comparisonSourceIds: [sourceIds.census, "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19", "SRC-NYCAC-GREENE-HILL-QA-2017-12-19"],
      project: "nyc-artist-coalition",
      kind: "participant-memory",
      text: "Jamie identifies the recurring event and participation layer as a substantial coalition contribution: connecting lessons from WOW List with legislative advocacy, helping create public event identities, moving meetings among small cultural spaces, listening to artists, and carrying lived concerns toward civic action.",
      locator: "Participant-memory intake supplied July 15, 2026",
      status: "corroborated",
      publicSafe: true,
      claimIds: [nycacFacebookEventClaimIds.participationSystem],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      limitations: [
        "The census corroborates the collective system's public form but does not identify who authored or produced each event.",
        "Independent reporting corroborates selected fire-safety, City Hall, and coalition work, not every event-level production task."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-DEMOCRACY-LAB-INTERPRETATION",
      intakeId: "INTAKE-NYCAC-FACEBOOK-EVENT-PRACTICE-MEMORY-2026",
      sourceId: sourceIds.firsthandRole,
      comparisonSourceIds: [sourceIds.census],
      project: "nyc-artist-coalition",
      kind: "participant-memory",
      text: "Jamie describes the event practice as a kind of democracy lab: believing artists, treating events as an art form, and translating between cultural and civic codes so people can build collective agency together.",
      locator: "Participant-memory intake supplied July 15, 2026",
      status: "captured",
      publicSafe: true,
      claimIds: [nycacFacebookEventClaimIds.democraticPractice],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      limitations: [
        "This is Jamie's attributed interpretation, not a measured outcome or external evaluation.",
        "The record does not establish that every participant or collaborator shared the metaphor."
      ]
    }
  ],
  sources: [
    {
      id: sourceIds.surface,
      title: "NYC Artist Coalition Facebook Past Events surface",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/nycartc/events",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition, Facebook Past Events surface, authenticated review July 15, 2026.",
      publicNote: "Repeated authenticated scrolling exposed 33 unique event IDs; a separate event-host control displayed 34 past events.",
      supportsGenerally: ["33 currently exposed event identities", "event chronology and public metadata", "34-past-events host control"],
      doesNotEstablish: ["a complete native Meta owner export", "the identity of the unresolved control slot", "individual authorship or production", "attendance, reach, endorsement, or impact"]
    },
    {
      id: sourceIds.census,
      title: "NYC Artist Coalition Facebook event full-population public-safe census",
      organization: "Jamie Burkart portfolio knowledge bank",
      author: "Codex archival review",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      assetUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json",
      preferredPublicUrl: "asset",
      publicCitation: "Public-safe census of the full NYC Artist Coalition Facebook Past Events population exposed July 15, 2026.",
      publicNote: "Retains 33 event identities, dates, venues, organizer displays, dated response snapshots, topics, source routes, and public-safety dispositions without raw descriptions or participant and access data.",
      supportsGenerally: ["34-of-34 displayed-control disposition", "33 recovered event records", "24 direct organizer cards and nine allied or cohosted cards", "12 recurring-meeting records across ten named physical cultural spaces", "response-threshold arithmetic", "seven posted source-article routes", "13 protected outbound-link occurrences withheld by category"],
      doesNotEstablish: ["the unresolved event identity", "every historical coalition event", "individual event authorship or production", "physical attendance or unique people", "policy causality", "permission to publish attendee identities, comments, contacts, or credentials"]
    },
    {
      id: sourceIds.protectedRun,
      title: "Authenticated NYC Artist Coalition Facebook event research captures",
      author: "Codex archival review",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation: "Authenticated archival-production review of the NYC Artist Coalition Facebook event population, July 15, 2026.",
      publicNote: "Protected captures preserve traversal, detail-page, host, and source-route provenance. Raw bodies, personal data, meeting access details, authenticated state, and private links are not published.",
      protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026",
      supportsGenerally: ["terminal-scroll reconciliation", "33 recovered detail records across authenticated captures", "later 28-recovered and five-unavailable replay", "public-safety and source-route review"],
      doesNotEstablish: ["permission to publish protected capture data", "a complete native owner export", "physical attendance", "individual event authorship", "policy causality"]
    },
    {
      id: sourceIds.firsthandRole,
      title: "Jamie Burkart first-hand account of NYC Artist Coalition event practice",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation: "Jamie Burkart, first-hand account of his contribution to NYC Artist Coalition's event and participation practice, July 15, 2026.",
      publicNote: "Jamie identifies the recurring event system as a major coalition contribution and describes its intended relationship to WOW List, cultural-space listening, artist trust, legislative advocacy, and collective civic action.",
      protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-2026",
      supportsGenerally: ["Jamie's first-hand role account", "the intended relationship between WOW List and coalition convening", "the democracy-lab interpretation as Jamie's perspective"],
      doesNotEstablish: ["independent corroboration of every task", "sole authorship or production of every event", "consensus among collaborators or participants", "physical attendance", "policy causality"]
    },
    {
      id: sourceIds.nyPostFootloose,
      title: "These Footloose-inspired rebels are fighting NYC's dancing ban",
      organization: "New York Post",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-04-08",
      accessedAt: reviewedAt,
      canonicalUrl: "https://nypost.com/2017/04/08/these-footloose-inspired-rebels-are-fighting-nycs-dancing-ban/",
      preferredPublicUrl: "canonical",
      publicCitation: "New York Post, 'These Footloose-inspired rebels are fighting NYC's dancing ban,' April 8, 2017.",
      publicNote: "The June 2017 Cabaret Law hearing event circulated this article as public context.",
      supportsGenerally: ["a Cabaret Law source article circulated through the event system"],
      doesNotEstablish: ["Jamie's individual role", "coalition endorsement of every article statement", "event attendance", "policy causality"]
    },
    {
      id: sourceIds.gothamistCommercialRent,
      title: "Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization",
      organization: "Gothamist",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-11-06",
      accessedAt: reviewedAt,
      canonicalUrl: "https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization",
      preferredPublicUrl: "canonical",
      publicCitation: "Gothamist, 'Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization,' November 6, 2019.",
      publicNote: "The November 2019 Fair Rent NYC rally event circulated this article as public context.",
      supportsGenerally: ["a Commercial Rent Stabilization source article circulated through the event system"],
      doesNotEstablish: ["Jamie's individual role", "coalition endorsement of every article statement", "event attendance", "policy adoption or causality"]
    }
  ],
  claims: [
    {
      id: nycacFacebookEventClaimIds.population,
      project: "nyc-artist-coalition",
      internalClaim: "The complete currently exposed NYC Artist Coalition Facebook Past Events control has 34 displayed slots: 33 public event records were recovered and reviewed, while one historical slot remains unmaterialized and unidentified.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "Facebook displayed 34 NYC Artist Coalition past-event slots. The knowledge bank recovered all 33 event identities exposed by the live index and preserves the remaining slot as unresolved.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"] }],
      evidence: [
        { sourceId: sourceIds.surface, relationship: "corroborating", supports: ["33 currently exposed event identities", "34-past-events host control"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.census, relationship: "direct-support", supports: ["34-of-34 displayed-control disposition", "33 recovered event records"], locator: "populationReconciliation and events", confidence: "high", renderCitation: true },
        { sourceId: sourceIds.protectedRun, relationship: "private-support", supports: ["terminal-scroll reconciliation", "33 recovered detail records across authenticated captures", "later 28-recovered and five-unavailable replay"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["This is complete displayed-control accounting, not complete historical recovery or a native Meta owner export.", "The unresolved slot receives no inferred title, date, host, campaign, or deletion state.", "A later unavailable route does not mean an earlier recovered event did not exist."],
      antiClaims: ["All 34 event pages were recovered", "NYC Artist Coalition created exactly 34 events in its history", "The unresolved event never existed", "Facebook is a complete owner archive"],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT"],
      reviewedAt,
      reviewedBy
    },
    {
      id: nycacFacebookEventClaimIds.participationSystem,
      project: "nyc-artist-coalition",
      internalClaim: "Beginning in 2017, Jamie helped establish and produce NYC Artist Coalition's recurring participation system: listening meetings, priority ballots, public event pages, rotating gatherings in small cultural spaces, practical safety and legal sessions, town halls, hearings, campaign actions, and later relief convenings connecting artists' lived experience with civic pathways.",
      status: "confirmed-with-boundary",
      projections: [
        { key: "case-study", text: "Beginning in 2017, Jamie helped establish and produce NYC Artist Coalition's recurring participation system. Listening meetings and priority ballots became run-of-show documents, call scripts, public event pages, practical safety and legal sessions, town halls, hearings, campaign actions, and sustained follow-through across small cultural spaces and City Hall.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] },
        { key: "archive-note", text: "Jamie describes the recurring event and participation layer as a major part of his NYC Artist Coalition contribution. The surviving event population corroborates the collective system's public form while leaving event-level authorship and production credit open.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"] }
      ],
      evidence: [
        { sourceId: sourceIds.firsthandRole, relationship: "direct-support", supports: ["Jamie's first-hand role account", "the intended relationship between WOW List and coalition convening"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYCAC-ADVOCACY-OPERATING-GUIDE-2017", relationship: "private-support", supports: ["shared Julia Fredenburg and Jamie Burkart authorship", "repeatable listening-to-action method"], locator: "Protected authorship and method sections", confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYCAC-MEETING-GOVERNANCE-ARTIFACTS-2017-2019", relationship: "private-support", supports: ["agendas and issue framing", "ballots and priority voting", "next-step assignments", "campaign follow-through"], locator: "Protected aggregate meeting-artifact review", confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYCAC-NIGHTLIFE-TOWN-HALL-RUN-OF-SHOW-2017", relationship: "private-support", supports: ["Jamie and Olympia Kazi in the coalition opening sequence", "Jamie's presentation and documentation tasks", "multi-role shared event production"], locator: "Protected opening sequence and production notes", confidence: "high", renderCitation: false },
        { sourceId: sourceIds.census, relationship: "corroborating", supports: ["33 recovered event records", "12 recurring-meeting records across ten named physical cultural spaces"], locator: "events, topics, venues, and organizer displays", confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19", relationship: "corroborating", supports: ["Jamie organized fire-code study groups", "Jamie rallied for Cabaret Law repeal"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYCAC-GREENE-HILL-QA-2017-12-19", relationship: "corroborating", supports: ["NYC Artist Coalition participation", "September 28 town hall invitation"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Use helped establish and produce; do not assign Jamie authorship or sole production of every event or artifact.", "The protected guide is shared work by Julia Fredenburg and Jamie, and the meeting records preserve a collective operating pattern.", "Preserve event partners, venue hosts, artists, advocates, officials, and coalition collaborators as part of the work.", "The rotating-venue finding covers 12 recurring-meeting records, including ten named physical cultural spaces and two virtual meetings; it is not a claim of one meeting every calendar month.", "The event sequence does not establish that any gathering caused a legislative, agency, or enforcement outcome."],
      antiClaims: ["Jamie solely created or produced every NYC Artist Coalition event", "Jamie alone led the coalition", "Every event used a different venue", "The coalition held a meeting every calendar month", "The event program alone caused Cabaret Law repeal or another policy outcome"],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      reviewedAt,
      reviewedBy
    },
    {
      id: nycacFacebookEventClaimIds.responseSignals,
      project: "nyc-artist-coalition",
      internalClaim: "Thirty-two of the 33 recovered event pages display historical Facebook response counts; 19 display at least 100 responses, seven at least 500, and three at least 1,000.",
      status: "confirmed-with-boundary",
      projections: [
        { key: "case-study", text: "The public event layer also carried visible platform traction: 19 recovered event pages display at least 100 Facebook responses, seven at least 500, and three at least 1,000. These are historical response labels, not verified attendance or unique reach.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] },
        { key: "archive-note", text: "Thirty-two recovered event pages display Facebook response counts; 19 show at least 100 responses, seven at least 500, and three at least 1,000. The figures remain event-level platform signals only.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"] }
      ],
      evidence: [{ sourceId: sourceIds.census, relationship: "direct-support", supports: ["response-threshold arithmetic"], locator: "aggregateSnapshot and events[].responseSnapshot", confidence: "high", renderCitation: true }],
      boundaries: ["Facebook response labels are not verified attendance, unique people, reach, participation, endorsement, conversion, mandate, or impact.", "People may respond to multiple events, and three displayed values are rounded in thousands.", "Do not sum the event-level values into a people-reached claim.", "Use independent reporting for physical attendance at a particular event when available."],
      antiClaims: ["9,989 unique people engaged", "Facebook responses equal event attendance", "Every responder participated in advocacy", "Response counts prove endorsement or policy impact", "The three largest events each drew more than 1,000 people in person"],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      reviewedAt,
      reviewedBy
    },
    {
      id: nycacFacebookEventClaimIds.democraticPractice,
      project: "nyc-artist-coalition",
      internalClaim: "Jamie understands NYC Artist Coalition's recurring event practice as a democracy lab: believing artists, moving through small cultural spaces, translating between cultural and civic codes, and creating occasions where people could build collective agency together.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "Jamie describes the event practice as a kind of democracy lab: listening in small cultural spaces, believing artists, and translating lived experience into collective civic pathways.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"] }],
      evidence: [
        { sourceId: sourceIds.firsthandRole, relationship: "context", supports: ["the democracy-lab interpretation as Jamie's perspective"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.census, relationship: "corroborating", supports: ["12 recurring-meeting records across ten named physical cultural spaces", "33 recovered event records"], confidence: "moderate", renderCitation: true }
      ],
      boundaries: ["Keep democracy lab, city nervous system, events as art, and believing artists language attributed to Jamie.", "Do not present the metaphor as a measured outcome, participant consensus, or external evaluation.", "Do not infer that every participant experienced the events in the same way."],
      antiClaims: ["The events empirically proved a democracy-lab outcome", "Every participant shared Jamie's interpretation", "The event system represented all NYC artists", "Facebook response counts measure democratic participation"],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      reviewedAt,
      reviewedBy
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT",
      project: "nyc-artist-coalition",
      question: "Can a native Meta owner export identify the unresolved 34th control slot and any events removed before the current live index?",
      methods: ["Exhausted the authenticated Past Events surface through repeated no-growth scrolling.", "Reconciled 33 stable event IDs against the separate 34-past-events host control.", "Repeated the event-ID and detail-page traversal and preserved transient availability changes."],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["Thirty-three event IDs materialized consistently.", "All 33 detail records were recovered across authenticated captures.", "One host-control slot remains unidentified.", "A later replay retained all 33 IDs while five detail routes became unavailable."],
      limitations: ["No native Meta owner export was available in this pass.", "The live surface cannot reveal events removed before capture.", "The unresolved slot cannot be assigned metadata or a deletion state."],
      sourceIds: [sourceIds.surface, sourceIds.census, sourceIds.protectedRun],
      publicSummary: "The full displayed control is reconciled as 33 recovered records plus one unresolved historical slot; a native owner export is the remaining route to literal account-history completeness.",
      protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026"
    },
    {
      id: "INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE",
      project: "nyc-artist-coalition",
      question: "Which records can further specify Jamie's event-level production work, the transfer of WOW List methods, and independently reported physical attendance without absorbing collective credit?",
      methods: ["Captured Jamie's first-hand account as participant memory.", "Compared the account with the complete exposed event census.", "Connected selected role propositions to contemporaneous Gothamist and Greene Hill Food Co-op records.", "Kept Facebook response labels separate from physical attendance."],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["The event population corroborates a recurring collective participation system across cultural and civic spaces.", "Independent sources connect Jamie to coalition work, fire-code study groups, City Hall advocacy, and a nightlife town hall invitation.", "Jamie's first-hand account supports a bounded helped-establish-and-produce claim.", "Event-level authorship, exact division of labor, WOW List method transfer, and physical attendance remain open for further corroboration."],
      limitations: ["Shared event pages do not identify the human author or producer of each event.", "Response labels do not establish physical attendance or unique people.", "Collaborator and participant accounts require consent and may add, complicate, or correct Jamie's interpretation.", "Event chronology does not establish policy causality."],
      sourceIds: [sourceIds.firsthandRole, sourceIds.census, "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19", "SRC-NYCAC-GREENE-HILL-QA-2017-12-19"],
      publicSummary: "The combined record supports Jamie's bounded contribution to a recurring participation system while preserving collective credit and leaving event-level production and actual attendance open for corroboration.",
      protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-2026"
    }
  ]
};
