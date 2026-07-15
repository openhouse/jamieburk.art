const reviewedAt = "2026-07-15";
const reviewedBy = ["Jamie Burkart", "Codex authenticated public-safe archival review"];

const sourceIds = {
  personalSurface: "SRC-FACEBOOK-PERSONAL-EVENT-SURFACE-2026",
  wowListSurface: "SRC-FACEBOOK-WOWLIST-EVENT-SURFACE-2026",
  census: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026",
  protectedRun: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-PROTECTED-RUN-2026",
  sundayDinner100: "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
  sundayDinner200: "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
  raftLaunch: "SRC-FACEBOOK-RAFT-LAUNCH-2007",
  micropop: "SRC-FACEBOOK-MICROPOP-2007",
  semanticWeb: "SRC-FACEBOOK-SEMANTIC-WEB-2006"
} as const;

export const personalWowListFacebookEventSourceIds = sourceIds;

export const personalWowListFacebookEventClaimIds = {
  population: "CLM-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION",
  conveningPractice: "CLM-FACEBOOK-JAMIE-CONVENING-PRACTICE",
  sundayDinnerMilestones: "CLM-FACEBOOK-SUNDAY-DINNER-MILESTONES",
  wowListInPractice: "CLM-FACEBOOK-WOWLIST-IN-PRACTICE",
  earlyParticipatoryPractice: "CLM-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE"
} as const;

export const personalWowListFacebookEventReviewSummary = {
  personalDisplayedInstances: 511,
  personalUniqueParentEvents: 502,
  recurringParentEvents: 4,
  recurringInstances: 13,
  recoveredDetails: 475,
  noDetailRendered: 35,
  unavailableDetails: 1,
  publicDisplays: 437,
  privateDisplays: 33,
  privacyNotDisplayed: 41,
  selectedPublicJamieAttributedEvents: 21,
  nycacCensusOverlap: 23,
  externalUrlOccurrences: 77,
  uniqueExternalUrls: 77,
  missionRelevantSourceRoutes: 9,
  wowListCurrentOwnerVisibleEvents: 0,
  dispositionCounts: {
    heldProfileAssociationOnly: 398,
    withheldPrivate: 33,
    representedInNycacCensus: 23,
    researchGap: 36,
    selectedPublicOrganizerRecord: 21
  },
  recoveredYears: {
    2006: 1,
    2007: 4,
    2010: 1,
    2011: 3,
    2012: 2,
    2013: 2,
    2014: 3,
    2015: 50,
    2016: 52,
    2017: 239,
    2018: 105,
    2019: 40,
    2020: 6,
    2022: 1,
    2023: 2
  }
} as const;

export const personalWowListFacebookEventKnowledge = {
  intakeItems: [
    {
      id: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      kind: "analysis-note",
      title: "Personal and WOW List Facebook event full-population archival production",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated archival review",
      projectIds: [
        "sunday-dinner",
        "wowlist",
        "waterways-and-participatory-art",
        "nyc-artist-coalition"
      ],
      reason: "Account for every currently exposed event record across Jamie's personal Facebook Events surface and the WOW List page-owner Events surface, preserve selected public Jamie-attributed events and source routes, and prevent profile association or response labels from becoming inflated role or impact claims.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: Object.values(sourceIds),
      observationIds: [
        "OBS-FACEBOOK-PERSONAL-EVENT-POPULATION",
        "OBS-FACEBOOK-PERSONAL-EVENT-PRIVACY-ACCOUNTING",
        "OBS-FACEBOOK-PERSONAL-EVENT-ROLE-SUBSET",
        "OBS-FACEBOOK-PERSONAL-EVENT-CHRONOLOGY",
        "OBS-FACEBOOK-PERSONAL-NYCAC-OVERLAP",
        "OBS-FACEBOOK-PERSONAL-SOURCE-ROUTES",
        "OBS-FACEBOOK-SUNDAY-DINNER-MILESTONES",
        "OBS-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE",
        "OBS-FACEBOOK-WOWLIST-CURRENT-ZERO",
        "OBS-FACEBOOK-RESPONSE-LABEL-BOUNDARY"
      ],
      researchInquiryIds: [
        "INQ-FACEBOOK-PERSONAL-EVENT-OWNER-EXPORT",
        "INQ-FACEBOOK-WOWLIST-HISTORICAL-EVENT-EXPORT",
        "INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"
      ],
      boundaries: [
        "One hundred percent means every event-card instance exposed on the two live surfaces received a public-safe disposition; it does not mean a complete native Meta export or lifetime account history.",
        "A card on a personal profile does not establish organization, authorship, attendance, endorsement, contribution, or impact.",
        "The public ledger does not reproduce private titles, descriptions, addresses, contacts, guest identities, or social-graph data.",
        "Facebook response labels are not attendance, unique people, reach, endorsement, conversion, mandate, or impact.",
        "Zero current WOW List event cards is not evidence that no historical WOW List event activity existed."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-FACEBOOK-PERSONAL-EVENT-POPULATION",
      intakeId: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: [sourceIds.personalSurface, sourceIds.protectedRun],
      project: "sunday-dinner",
      kind: "source-fact",
      text: "Repeated authenticated lazy scrolling reached a stable population of 511 personal-profile event-card instances representing 502 unique parent events. Four recurring parent events account for 13 displayed instances.",
      locator: "surfaces.personal and populationLedger",
      status: "verified",
      publicSafe: true,
      claimIds: [personalWowListFacebookEventClaimIds.population],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-OWNER-EXPORT"],
      limitations: [
        "The population is complete for the capture-date live index, not a native owner export or lifetime Facebook history.",
        "A displayed card does not identify Jamie's relationship to the event."
      ]
    },
    {
      id: "OBS-FACEBOOK-PERSONAL-EVENT-PRIVACY-ACCOUNTING",
      intakeId: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: [sourceIds.protectedRun],
      project: "sunday-dinner",
      kind: "source-fact",
      text: "The 511-row public ledger assigns anonymous dispositions to 398 public profile-association-only rows, 33 withheld private rows, 23 records already represented in the NYC Artist Coalition event census, 36 detail-recovery gaps, and 21 selected public Jamie-attributed event records.",
      locator: "dispositionCounts and populationLedger",
      status: "verified",
      publicSafe: true,
      claimIds: [personalWowListFacebookEventClaimIds.population],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-OWNER-EXPORT"],
      limitations: [
        "Anonymous ordinals account for withheld rows without publishing private or merely personal records.",
        "A research-gap disposition means detail content did not render in this pass, not that the event did not exist."
      ]
    },
    {
      id: "OBS-FACEBOOK-PERSONAL-EVENT-ROLE-SUBSET",
      intakeId: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "sunday-dinner",
      kind: "source-fact",
      text: "Twenty-one public event detail pages spanning December 2006 through February 2019 display Jamie Burkart as organizer or co-organizer. The selected set includes participatory art, waterways, community meals, music and touring support, cultural-space safety, public discussion, and civic participation.",
      locator: "selectedPublicEvents",
      status: "verified",
      publicSafe: true,
      claimIds: [personalWowListFacebookEventClaimIds.conveningPractice],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"],
      limitations: [
        "Organizer display supports event-page attribution, not sole authorship, sole production, or every task behind an event.",
        "The set excludes public records that do not explicitly attribute Jamie and therefore is not a complete inventory of his participation."
      ]
    },
    {
      id: "OBS-FACEBOOK-PERSONAL-EVENT-CHRONOLOGY",
      intakeId: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "sunday-dinner",
      kind: "source-fact",
      text: "The exposed personal-profile population spans December 2006 through August 2023. Its highest-volume years are 2017 with 239 card instances, 2018 with 105, 2016 with 52, 2015 with 50, and 2019 with 40.",
      locator: "surfaces.personal.yearCounts",
      status: "verified",
      publicSafe: true,
      claimIds: [personalWowListFacebookEventClaimIds.population],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-OWNER-EXPORT"],
      limitations: [
        "Year volume reflects what Facebook currently exposes on the personal profile, not annual event production by Jamie.",
        "Recurring instances and changing platform retention can affect year counts."
      ]
    },
    {
      id: "OBS-FACEBOOK-PERSONAL-NYCAC-OVERLAP",
      intakeId: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: ["SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026"],
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "Twenty-three personal-profile event cards match event IDs in the separately governed NYC Artist Coalition Facebook census. Those records are referenced rather than duplicated so stakeholder and response analysis remains attached to the stronger page-level source.",
      locator: "surfaces.personal.nycacCensusOverlap and dispositionCounts",
      status: "verified",
      publicSafe: true,
      claimIds: [personalWowListFacebookEventClaimIds.population],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"],
      limitations: [
        "Overlap does not prove Jamie attended or individually produced those 23 events.",
        "The personal census does not reassign the coalition's collective event credit."
      ]
    },
    {
      id: "OBS-FACEBOOK-PERSONAL-SOURCE-ROUTES",
      intakeId: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "wowlist",
      kind: "source-fact",
      text: "Recovered detail bodies contain 77 external-URL occurrences. The public fixture preserves nine mission-relevant routes with relationship labels, including Talks Not Raids, Let NYC Dance, WOW List, River Marvel, Semantic Web and imagined-community references, a Kansas City DIY resource, and two profile-association-only research leads.",
      locator: "surfaces.personal.externalUrlOccurrences and missionRelevantSourceRoutes",
      status: "verified",
      publicSafe: true,
      claimIds: [personalWowListFacebookEventClaimIds.population, personalWowListFacebookEventClaimIds.wowListInPractice],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"],
      limitations: [
        "A posted link documents routing through an event page, not agreement with every linked statement.",
        "Two routes are explicitly held as research leads because profile association alone does not establish Jamie's relationship."
      ]
    },
    {
      id: "OBS-FACEBOOK-SUNDAY-DINNER-MILESTONES",
      intakeId: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      sourceId: sourceIds.sundayDinner100,
      comparisonSourceIds: [sourceIds.sundayDinner200, sourceIds.census],
      project: "sunday-dinner",
      kind: "source-fact",
      text: "Public Facebook event pages name Jamie as organizer for an event titled as the 100th Sunday Dinner on March 9, 2014 and name Julia Fredenburg and Jamie as co-organizers for an event titled as the 200th on June 26, 2016. The 200th invitation links directly to a WOW List event page.",
      locator: "selectedPublicEvents ordinals 497 and 425",
      status: "verified",
      publicSafe: true,
      claimIds: [personalWowListFacebookEventClaimIds.sundayDinnerMilestones, personalWowListFacebookEventClaimIds.wowListInPractice],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"],
      limitations: [
        "The numbered event titles are contemporaneous milestone records, not an independent audit of every gathering.",
        "The pages do not establish attendance, frequency between milestones, or sole production by Jamie."
      ]
    },
    {
      id: "OBS-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE",
      intakeId: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      sourceId: sourceIds.raftLaunch,
      comparisonSourceIds: [sourceIds.micropop, sourceIds.semanticWeb, sourceIds.census],
      project: "waterways-and-participatory-art",
      kind: "bounded-inference",
      text: "Selected Jamie-attributed public event pages document an early practice of creating occasions around place, movement, technology, and distributed community: a Semantic Web music-and-standards discussion in 2006; a trolley-tunnel screening, scene-theory gathering, raft design meal, and raft send-off in 2007; and a silent group night walk in 2010.",
      locator: "selectedPublicEvents ordinals 511, 510, 509, 508, 507, and 506",
      status: "verified",
      publicSafe: true,
      claimIds: [personalWowListFacebookEventClaimIds.earlyParticipatoryPractice, personalWowListFacebookEventClaimIds.conveningPractice],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"],
      limitations: [
        "Event pages establish invitations and organizer attribution, not attendance or full project outcomes.",
        "The cross-event throughline is an archival interpretation and should be tested against independent coverage and Jamie's project records."
      ]
    },
    {
      id: "OBS-FACEBOOK-WOWLIST-CURRENT-ZERO",
      intakeId: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      sourceId: sourceIds.wowListSurface,
      comparisonSourceIds: [sourceIds.census],
      project: "wowlist",
      kind: "limitation",
      text: "The current WOW List page-owner Events surface exposed zero event cards and displayed 'No events to show' across the alias and legacy-ID routes on the capture date.",
      locator: "surfaces.wowlist",
      status: "verified",
      publicSafe: true,
      claimIds: [personalWowListFacebookEventClaimIds.population],
      researchInquiryIds: ["INQ-FACEBOOK-WOWLIST-HISTORICAL-EVENT-EXPORT"],
      limitations: [
        "Zero is a current-surface result, not proof that WOW List never created, cohosted, shared, imported, or linked events.",
        "A native page export or archived event index is required for historical completeness."
      ]
    },
    {
      id: "OBS-FACEBOOK-RESPONSE-LABEL-BOUNDARY",
      intakeId: "INTAKE-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "sunday-dinner",
      kind: "limitation",
      text: "Historical response labels are retained only on the 21 selected public Jamie-attributed records. They remain event-level interface states and are not summed or converted into people, attendance, reach, endorsement, conversion, mandate, or impact.",
      locator: "selectedPublicEvents[].historicalResponseDisplay and responseInterpretation",
      status: "verified",
      publicSafe: true,
      claimIds: [personalWowListFacebookEventClaimIds.conveningPractice],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"],
      limitations: [
        "One person may have responded to multiple events, and platform labels can change over time.",
        "Physical attendance requires event-specific independent evidence."
      ]
    }
  ],
  sources: [
    {
      id: sourceIds.personalSurface,
      title: "Jamie Burkart personal Facebook Events surface",
      author: "Jamie Burkart",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/jburkart/events",
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart, Facebook Events surface, authenticated review July 15, 2026.",
      publicNote: "Repeated lazy scrolling reached a stable 511-card population. The public knowledge bank identifies only selected public Jamie-attributed records and otherwise uses anonymous dispositions.",
      supportsGenerally: ["511 capture-date personal-profile event-card instances", "502 unique parent events", "stable terminal population"],
      doesNotEstablish: ["a native Meta owner export", "Jamie's relationship to every displayed event", "attendance or unique people", "permission to publish private or personal records"]
    },
    {
      id: sourceIds.wowListSurface,
      title: "WOW List Facebook page-owner Events surface",
      organization: "WOW List",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/wowlist/events",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List, Facebook Events surface, authenticated page-owner review July 15, 2026.",
      publicNote: "The alias and legacy-ID owner views exposed zero current event cards and displayed 'No events to show.'",
      supportsGenerally: ["zero current owner-visible WOW List event cards", "capture-date empty Events surface"],
      doesNotEstablish: ["that WOW List never created events", "that WOW List never cohosted or shared events", "a complete historical page export", "individual authorship of page activity"]
    },
    {
      id: sourceIds.census,
      title: "Personal and WOW List Facebook event full-population public-safe census",
      organization: "Jamie Burkart portfolio knowledge bank",
      author: "Codex archival review",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      assetUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/personal-wowlist-facebook-events-full-population.json",
      preferredPublicUrl: "asset",
      publicCitation: "Public-safe census of the Facebook event surfaces exposed for Jamie Burkart's personal profile and the WOW List page on July 15, 2026.",
      publicNote: "Accounts for all 511 personal-profile event-card instances and the zero-card current WOW List owner surface while identifying only 21 selected public Jamie-attributed events.",
      supportsGenerally: ["511-row anonymous disposition ledger", "21 selected public Jamie-attributed event records", "23-event NYCAC census overlap", "77 external-URL occurrences", "nine mission-relevant source routes", "Sunday Dinner 100th and 200th event-page milestones", "direct WOW List route from the 200th Sunday Dinner page", "selected early participatory-program chronology"],
      doesNotEstablish: ["a complete native Meta export", "Jamie's role in profile-associated events without explicit attribution", "physical attendance or unique reach", "sole event authorship or production", "historical nonexistence from an empty current surface"]
    },
    {
      id: sourceIds.protectedRun,
      title: "Authenticated personal and WOW List Facebook event research captures",
      author: "Codex archival review",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation: "Authenticated archival-production review of the personal and WOW List Facebook event surfaces, July 15, 2026.",
      publicNote: "Protected captures preserve terminal-scroll reconciliation, event identifiers, detail bodies, private records, source routes, and authenticated provenance. Sensitive contents are not published.",
      protectedLocatorId: "LOC-FACEBOOK-PERSONAL-WOWLIST-EVENT-RESEARCH-2026",
      supportsGenerally: ["terminal-scroll reconciliation", "475 recovered detail bodies", "33 private-display records withheld", "public-safe disposition review"],
      doesNotEstablish: ["permission to publish protected contents", "a native Meta owner export", "attendance", "Jamie's relationship to every card", "historical WOW List event completeness"]
    },
    {
      id: sourceIds.sundayDinner100,
      title: "SUNDAY DINNER Turns 100! Facebook event",
      author: "Jamie Burkart",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2014-03-09",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/events/702417306475691/",
      preferredPublicUrl: "canonical",
      publicCitation: "'SUNDAY DINNER Turns 100!,' Facebook event, March 9, 2014.",
      publicNote: "The public event page names Jamie as organizer and presents the gathering as the 100th Sunday Dinner.",
      supportsGenerally: ["public 100th Sunday Dinner event-page milestone", "Jamie organizer display for the 100th event"],
      doesNotEstablish: ["an independent audit of 100 gatherings", "attendance", "sole production", "the complete Sunday Dinner history"]
    },
    {
      id: sourceIds.sundayDinner200,
      title: "200th Sunday Dinner! Facebook event",
      organization: "Sunday Dinner",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-06-26",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/events/551536301637994/",
      preferredPublicUrl: "canonical",
      publicCitation: "'200th Sunday Dinner! Special! Wow! Amazing! Interesting!,' Facebook event, June 26, 2016.",
      publicNote: "The public event page names Julia Fredenburg and Jamie Burkart as co-organizers, presents the event as the 200th Sunday Dinner, and links to a WOW List event page.",
      supportsGenerally: ["public 200th Sunday Dinner event-page milestone", "Julia Fredenburg and Jamie Burkart co-organizer display", "direct WOW List route from the 200th Sunday Dinner page"],
      doesNotEstablish: ["an independent audit of 200 gatherings", "attendance", "sole production by Jamie", "the complete Sunday Dinner history"]
    },
    {
      id: sourceIds.raftLaunch,
      title: "Release Yourself onto the Water Until it Tastes of Salt Facebook event",
      author: "Jamie Burkart",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2007-07-14",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/events/10153218027900549/",
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart, 'Release Yourself onto the Water Until it Tastes of Salt,' Facebook event, July 14, 2007.",
      publicNote: "The event page names Jamie as organizer and describes a public send-off for a found-material, bicycle-powered raft in Kansas City.",
      supportsGenerally: ["Jamie-attributed public raft send-off", "found-material raft and bicycle-powered paddle-wheel description"],
      doesNotEstablish: ["the voyage's full route or completion", "attendance", "sole project authorship", "permission to publish private construction records"]
    },
    {
      id: sourceIds.micropop,
      title: "Micropop: Nation-Scenes Facebook event",
      author: "Jamie Burkart",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2007-01-25",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/events/10153329249353169/",
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart, 'Micropop: Nation-Scenes,' Facebook event, January 25, 2007.",
      publicNote: "The public event page names Jamie as organizer and pairs a music event with a reflection on distributed scenes and imagined community.",
      supportsGenerally: ["Jamie-attributed scene-theory gathering", "public imagined-community and Kansas City DIY source routes"],
      doesNotEstablish: ["participant consensus with the reflection", "attendance", "a complete theory of WOW List", "sole authorship of every performance"]
    },
    {
      id: sourceIds.semanticWeb,
      title: "Musicians for a Semantic Web Facebook event",
      author: "Jamie Burkart",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2006-12-02",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/events/10153308288768593/",
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart, 'Musicians for a Semantic Web,' Facebook event, December 2, 2006.",
      publicNote: "The public event page names Jamie as organizer and explicitly calls for development and implementation of Semantic Web standards.",
      supportsGenerally: ["Jamie-attributed 2006 Semantic Web event", "public Semantic Web standards discussion"],
      doesNotEstablish: ["implementation of a Semantic Web standard", "attendance", "endorsement by every performer", "a complete technical project history"]
    }
  ],
  claims: [
    {
      id: personalWowListFacebookEventClaimIds.population,
      project: "sunday-dinner",
      internalClaim: "The capture-date personal-profile Facebook Events index contains 511 displayed instances representing 502 unique parent events, while the current WOW List page-owner Events surface contains zero event cards; every exposed row has a public-safe disposition.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The public-safe census accounts for all 511 personal-profile event-card instances and the empty current WOW List owner Events surface without publishing private or merely personal records.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/personal-wowlist-facebook-events"] }],
      evidence: [
        { sourceId: sourceIds.personalSurface, relationship: "corroborating", supports: ["511 capture-date personal-profile event-card instances", "502 unique parent events", "stable terminal population"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.wowListSurface, relationship: "corroborating", supports: ["zero current owner-visible WOW List event cards", "capture-date empty Events surface"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.census, relationship: "direct-support", supports: ["511-row anonymous disposition ledger", "21 selected public Jamie-attributed event records", "23-event NYCAC census overlap"], locator: "surfaces and populationLedger", confidence: "high", renderCitation: true }
      ],
      boundaries: ["Complete means complete capture-date surface accounting, not a complete lifetime or native owner archive.", "Profile association does not establish Jamie's relationship to an event.", "Zero current WOW List event cards does not establish historical nonexistence.", "Private and personal rows remain anonymous."],
      antiClaims: ["Jamie organized 511 events", "Jamie attended 511 events", "The personal profile is a complete lifetime archive", "WOW List never had Facebook events", "Every displayed event is a Jamie project"],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-OWNER-EXPORT", "INQ-FACEBOOK-WOWLIST-HISTORICAL-EVENT-EXPORT"],
      reviewedAt,
      reviewedBy
    },
    {
      id: personalWowListFacebookEventClaimIds.conveningPractice,
      project: "sunday-dinner",
      internalClaim: "Twenty-one public event pages from 2006 through 2019 name Jamie as organizer or co-organizer across participatory art, waterways, community meals, music networks, cultural-space safety, discussion, and civic participation.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "Twenty-one recovered public event pages spanning 2006-2019 explicitly name Jamie as organizer or co-organizer, preserving a long arc of participatory programs, community meals, music networks, waterways work, cultural-space safety, and civic participation.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/personal-wowlist-facebook-events"] }],
      evidence: [{ sourceId: sourceIds.census, relationship: "direct-support", supports: ["21 selected public Jamie-attributed event records", "selected early participatory-program chronology"], locator: "selectedPublicEvents", confidence: "high", renderCitation: true }],
      boundaries: ["Use event-page organizer or co-organizer attribution; do not convert it into sole authorship or sole production.", "Do not infer Jamie's role from the other 490 personal-profile cards.", "Do not treat response labels as attendance or reach.", "Use independent sources for project outcomes."],
      antiClaims: ["Jamie alone produced all 21 events", "Jamie organized every event on his profile", "The selected records prove attendance", "Facebook response labels prove impact", "The list is a complete account of Jamie's event work"],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"],
      reviewedAt,
      reviewedBy
    },
    {
      id: personalWowListFacebookEventClaimIds.sundayDinnerMilestones,
      project: "sunday-dinner",
      internalClaim: "Public event pages preserve contemporaneous 100th and 200th Sunday Dinner milestones in 2014 and 2016, naming Jamie as organizer of the 100th and Julia Fredenburg and Jamie as co-organizers of the 200th.",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "Public event pages preserve a 100th Sunday Dinner milestone in 2014, naming Jamie as organizer, and a 200th in 2016, naming Julia Fredenburg and Jamie as co-organizers. The numbered titles are contemporaneous records, not an independent audit of every gathering.", status: "active", citationRequired: true, surfaces: ["/work/196-sunday-dinner"] }],
      evidence: [
        { sourceId: sourceIds.sundayDinner100, relationship: "direct-support", supports: ["public 100th Sunday Dinner event-page milestone", "Jamie organizer display for the 100th event"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.sundayDinner200, relationship: "direct-support", supports: ["public 200th Sunday Dinner event-page milestone", "Julia Fredenburg and Jamie Burkart co-organizer display"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Treat 100th and 200th as contemporaneous event-page milestone titles, not independently audited totals.", "Preserve Julia Fredenburg's co-organizer credit on the 200th event.", "Do not infer attendance or continuous weekly frequency from the two pages.", "The pages do not independently verify the current 300-plus aggregate claim."],
      antiClaims: ["Facebook independently audited 200 Sunday Dinners", "Jamie solely produced both milestones", "The pages prove 300-plus gatherings", "The response labels are attendance", "Every Sunday Dinner had the same format"],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"],
      reviewedAt,
      reviewedBy
    },
    {
      id: personalWowListFacebookEventClaimIds.wowListInPractice,
      project: "wowlist",
      internalClaim: "The public 200th Sunday Dinner Facebook event page links directly to its WOW List event page, preserving one concrete route from recurring gathering practice into the community-calendar platform.",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "A public 2016 event page for the 200th Sunday Dinner links directly to its WOW List event page, preserving one concrete route from the recurring gathering into the community-calendar platform.", status: "active", citationRequired: true, surfaces: ["/work/wowlist"] }],
      evidence: [
        { sourceId: sourceIds.sundayDinner200, relationship: "direct-support", supports: ["direct WOW List route from the 200th Sunday Dinner page"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.census, relationship: "corroborating", supports: ["nine mission-relevant source routes", "direct WOW List route from the 200th Sunday Dinner page"], locator: "missionRelevantSourceRoutes", confidence: "high", renderCitation: true }
      ],
      boundaries: ["This is one documented route, not a complete adoption or traffic census.", "The historical WOW List page may no longer resolve.", "The event-page link does not establish who entered the event into WOW List.", "Keep platform and Sunday Dinner credit shared."],
      antiClaims: ["Every Sunday Dinner used WOW List", "The link proves platform-wide adoption", "Jamie alone created the event record", "The current WOW List Facebook page proves the product had no events", "The link establishes traffic or conversion"],
      researchInquiryIds: ["INQ-FACEBOOK-WOWLIST-HISTORICAL-EVENT-EXPORT", "INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"],
      reviewedAt,
      reviewedBy
    },
    {
      id: personalWowListFacebookEventClaimIds.earlyParticipatoryPractice,
      project: "waterways-and-participatory-art",
      internalClaim: "Selected public event pages document Jamie's early practice of composing participatory occasions around waterways, movement, site-specific media, technology standards, and distributed cultural scenes between 2006 and 2010.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "Public event pages from 2006-2010 preserve an early participatory-program arc: a Semantic Web music-and-standards discussion, a trolley-tunnel screening, reflection on distributed music scenes, collaborative raft design and send-off, and a silent group night walk.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/personal-wowlist-facebook-events"] }],
      evidence: [
        { sourceId: sourceIds.raftLaunch, relationship: "direct-support", supports: ["Jamie-attributed public raft send-off", "found-material raft and bicycle-powered paddle-wheel description"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.micropop, relationship: "direct-support", supports: ["Jamie-attributed scene-theory gathering", "public imagined-community and Kansas City DIY source routes"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.semanticWeb, relationship: "direct-support", supports: ["Jamie-attributed 2006 Semantic Web event", "public Semantic Web standards discussion"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.census, relationship: "corroborating", supports: ["selected early participatory-program chronology"], locator: "selectedPublicEvents", confidence: "high", renderCitation: true }
      ],
      boundaries: ["The cross-event arc is an archival synthesis grounded in public invitations.", "Event pages do not establish attendance, participant experience, full project outcomes, or sole authorship.", "Use independent reporting and project archives to mature individual event claims.", "Do not conflate conceptual source links with technical implementation."],
      antiClaims: ["Every invited event occurred exactly as described", "Jamie alone authored every project", "The raft page proves arrival at the Gulf of Mexico", "The Semantic Web event implemented a standard", "The event pages prove attendance or impact"],
      researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"],
      reviewedAt,
      reviewedBy
    }
  ],
  researchInquiries: [
    {
      id: "INQ-FACEBOOK-PERSONAL-EVENT-OWNER-EXPORT",
      project: "sunday-dinner",
      question: "Can a native Meta owner export reconcile events removed from the current personal index, preserve recurrence metadata, and clarify Jamie's event relationships without publishing private social data?",
      methods: ["Repeatedly lazy-scrolled the authenticated personal Events index to a stable 511-card population.", "Recovered 475 detail bodies and assigned every row a public-safe disposition.", "Separated organizer displays, privacy states, profile association, NYCAC overlap, and detail gaps."],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["The current index exposes 511 instances representing 502 unique parent events.", "Every exposed row has a disposition.", "Twenty-one public pages explicitly name Jamie as organizer or co-organizer.", "Thirty-six rows remain detail-recovery gaps."],
      limitations: ["No native Meta owner export was available in this pass.", "The current surface cannot reveal removed event records.", "Private records cannot be published merely because they are visible in an authenticated account.", "Profile association does not establish Jamie's event relationship."],
      sourceIds: [sourceIds.personalSurface, sourceIds.census, sourceIds.protectedRun],
      publicSummary: "The current personal Events surface is fully accounted for at 511 instances, with 21 selected public Jamie-attributed records and private or ambiguous rows held.",
      protectedLocatorId: "LOC-FACEBOOK-PERSONAL-WOWLIST-EVENT-RESEARCH-2026"
    },
    {
      id: "INQ-FACEBOOK-WOWLIST-HISTORICAL-EVENT-EXPORT",
      project: "wowlist",
      question: "What native export, archived event index, or historical page record can recover WOW List's Facebook event history beyond the zero-card current owner surface?",
      methods: ["Checked the current page alias Events route.", "Checked the legacy page-ID Events route.", "Verified the surface while acting as the WOW List page owner.", "Compared the empty current surface with public event pages linking into WOW List."],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: ["The current owner surface exposes zero event cards.", "The surface displays 'No events to show.'", "A 2016 Sunday Dinner event page independently preserves a direct WOW List event link."],
      limitations: ["No native WOW List page export was available.", "The current surface cannot establish historical nonexistence.", "Historical Facebook imports, shares, cohosts, and deleted events remain unrecovered.", "The direct WOW List route does not identify who entered the platform record."],
      sourceIds: [sourceIds.wowListSurface, sourceIds.sundayDinner200, sourceIds.census],
      publicSummary: "The current WOW List owner Events surface is empty, but a public 2016 Sunday Dinner page preserves one direct historical WOW List event route; historical Facebook completeness remains open."
    },
    {
      id: "INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION",
      project: "waterways-and-participatory-art",
      question: "Which independent publications, project archives, collaborator records, and preserved websites can mature the 21 selected public event-page records into stronger role, method, attendance, and outcome claims?",
      methods: ["Selected only public pages explicitly naming Jamie as organizer or co-organizer.", "Created event-level public summaries without addresses or raw social data.", "Preserved nine mission-relevant source routes with relationship labels.", "Referenced overlapping NYCAC events to the stronger coalition census rather than duplicating stakeholder claims."],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["The selected pages establish a 2006-2019 public organizer-attribution chronology.", "The 100th and 200th Sunday Dinner milestone pages strengthen chronology while preserving counting limits.", "The 200th page documents one direct WOW List route.", "Early event pages surface research leads for waterways, participatory art, public technology discussion, and distributed cultural scenes."],
      limitations: ["Event pages do not independently establish attendance or outcomes.", "Organizer display does not allocate every production task.", "Some historical project URLs may no longer resolve.", "Independent sources and collaborator consent remain necessary for stronger public projection."],
      sourceIds: [sourceIds.census, sourceIds.sundayDinner100, sourceIds.sundayDinner200, sourceIds.raftLaunch, sourceIds.micropop, sourceIds.semanticWeb],
      publicSummary: "The selected event pages provide a strong research index and bounded chronology; independent sources should now mature role, method, attendance, and outcome claims project by project."
    }
  ]
};
