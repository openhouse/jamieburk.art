import type { KnowledgeBank } from "./schema.ts";

const projectId = "personal-public-record";
const reviewedAt = "2026-07-15";
const reportPath = "docs/knowledge-bank/projects/jamie-personal-facebook-posts.md";

export const jamiePersonalFacebookPostSourceIds = {
  profileSurface: "SRC-FB-JAMIE-PROFILE-MANAGE-POSTS-2026-07-15",
  protectedCensus: "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026-07-15",
  controls: "SRC-FB-JAMIE-POST-CONTROLS-2026-07-15",
  nterOpening: "SRC-FB-JAMIE-NTER-OPENING-2010",
  wowListNineCities: "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
  councilStatRoute: "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
  letNycDanceAction: "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
  kcTownHallStart: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
  talksNotRaidsAction: "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
  gothamistMomentum: "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31",
} as const;

export const jamiePersonalFacebookPostClaimIds = {
  population: "CLM-FB-JAMIE-OWNER-POST-POPULATION-2026",
  missionRouting: "CLM-FB-JAMIE-MISSION-ROUTING-2026",
  sourceQueue: "CLM-FB-JAMIE-POSTED-SOURCE-QUEUE-2026",
  stakeholderAddressing: "CLM-FB-JAMIE-STAKEHOLDER-ADDRESSING-2026",
  selectedSignals: "CLM-FB-JAMIE-SELECTED-PUBLIC-SIGNALS-2026",
  actionRouting: "CLM-FB-JAMIE-PARTICIPATION-ROUTING-PRACTICE",
  councilStatContext: "CLM-FB-JAMIE-COUNCILSTAT-CONTEXT-2016",
  kcTownHallCoInitiation: "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-2018",
} as const;

export const jamiePersonalFacebookPostReviewSummary = {
  recordsReviewed: 1243,
  recordsReviewedPercent: 100,
  cursorPages: 621,
  returnedNodes: 3728,
  terminalHasNextPage: false,
  missingDates: 0,
  ownerAbsentRecords: 0,
  recoveredStart: "2006-12-19",
  recoveredEnd: "2022-06-12",
  audienceLabelExposedRecords: 270,
  audienceLabelNotExposedRecords: 973,
  missionRoutedRecords: 181,
  urlBearingRecords: 430,
  normalizedExternalDestinations: 549,
  selectedPublicSources: 6,
} as const;

const publicPost = {
  organization: "Jamie Burkart",
  author: "Jamie Burkart",
  kind: "institutional-social-post" as const,
  visibility: "public" as const,
  preservationStatus: "live" as const,
  accessedAt: reviewedAt,
  preferredPublicUrl: "canonical" as const,
};

export const jamiePersonalFacebookPostSources = [
  {
    id: jamiePersonalFacebookPostSourceIds.profileSurface,
    title: "Jamie Burkart Facebook Manage Posts owner-filtered surface",
    organization: "Facebook",
    kind: "institutional-web-page",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: reviewedAt,
    publicCitation:
      "Authenticated review of Jamie Burkart's Facebook Manage Posts surface, July 15, 2026.",
    publicNote:
      "The review applied Manage Posts > Posted by: You and confirmed that the filtered current surface began in June 2022. Authentication state and non-evidence personal material remain outside Git.",
    protectedLocatorId: "LOC-FB-JAMIE-MANAGE-POSTS-2026-07-15",
    supportsGenerally: [
      "the continued availability of the Posted by: You filter",
      "the June 2022 current owner-filtered endpoint",
    ],
    doesNotEstablish: [
      "a native Meta export or deletion history",
      "that every returned historical record was public",
      "a complete interaction or responder-identity population",
    ],
  },
  {
    id: jamiePersonalFacebookPostSourceIds.protectedCensus,
    title: "Protected Jamie Burkart Facebook owner-post census",
    author: "Codex authenticated archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    accessedAt: reviewedAt,
    publicCitation:
      "Protected full-population review of Jamie Burkart's owner-filtered Facebook post surface, July 2026.",
    publicNote:
      "The cursor crawl returned 1,243 unique records across 621 pages and ended with has-next-page false. Raw records, comments, identities, media, unknown-audience material, and authenticated state remain outside Git.",
    protectedLocatorId: "LOC-FB-JAMIE-OWNER-POST-CENSUS-2026-07",
    supportsGenerally: [
      "the 1,243-record returned denominator",
      "621 cursor pages and terminal has-next-page false",
      "the December 2006 through June 2022 returned chronology",
      "aggregate mission, URL, and stakeholder-addressing research",
    ],
    doesNotEstablish: [
      "an immutable lifetime publication count",
      "public audience status for 973 records without exposed labels",
      "reach, endorsement, attendance, conversion, causality, or impact",
    ],
  },
  {
    id: jamiePersonalFacebookPostSourceIds.controls,
    title: "Jamie personal Facebook post public-safe controls",
    author: "Codex archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: reviewedAt,
    accessedAt: reviewedAt,
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe aggregate controls for Jamie Burkart's owner-filtered Facebook post census, July 2026.",
    publicNote:
      "The controls preserve population, chronology, form, mission-routing, source-routing, stakeholder-addressing, and selected-public-source totals without publishing the record-level corpus.",
    supportsGenerally: [
      "aggregate reconciliation of the returned population",
      "bounded research-routing counts",
      "the six-post public-source review control",
    ],
    doesNotEstablish: [
      "record-level contents, identities, or interactions",
      "a lifetime account archive or universal public audience",
      "stakeholder engagement, endorsement, reach, conversion, causality, or impact",
    ],
  },
  {
    id: jamiePersonalFacebookPostSourceIds.nterOpening,
    title: "Jamie Burkart public post about the NTER CHNG opening",
    ...publicPost,
    publishedAt: "2010-01-10",
    canonicalUrl: "https://www.facebook.com/jburkart/posts/226963042167",
    publicCitation:
      "Jamie Burkart, public Facebook post about the NTER CHNG opening, January 10, 2010.",
    publicNote:
      "The post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as creators of the interactive text-messaging experience and preserves a dated opening trace.",
    supportsGenerally: [
      "a dated first-person NTER CHNG opening trace",
      "the three creator credits",
    ],
    doesNotEstablish: [
      "the division of technical labor",
      "sole authorship by Jamie",
      "photo-republication rights",
    ],
  },
  {
    id: jamiePersonalFacebookPostSourceIds.wowListNineCities,
    title: "Jamie Burkart public post about WOW List calendars in nine cities",
    ...publicPost,
    publishedAt: "2015-10-05",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid02hjaUtK2swFUy1XeNkQjqUnZj4M6ecbYpPjGa365MFo2oWR57HwEqNdrhSDQjJjBMl",
    publicCitation:
      "Jamie Burkart, public Facebook post about WOW List community calendars in nine cities, October 5, 2015.",
    publicNote:
      "The post attributes calendars in nine cities to WOW List members, routes readers to join, and displayed 28 likes during the July 15 review.",
    supportsGenerally: [
      "Jamie's attributed nine-city statement",
      "a WOW List participation route",
      "a mutable July 15, 2026 display of 28 likes",
    ],
    doesNotEstablish: [
      "sustained activity in every city",
      "a lifetime city count, user total, reach metric, or attendance",
      "that Jamie locally organized every calendar",
    ],
  },
  {
    id: jamiePersonalFacebookPostSourceIds.councilStatRoute,
    title: "Jamie Burkart public post routing to a CouncilStat job posting",
    ...publicPost,
    publishedAt: "2016-05-18",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid023maJq9xB4QQYyFzJswPL5tbT2ToUbJxJ5MRnV9L51y94fPDVZVuHcVGsuBpmEnTSl",
    publicCitation:
      "Jamie Burkart, public Facebook post routing readers to a New York City Council CouncilStat job posting, May 18, 2016.",
    publicNote:
      "Jamie invited open-data practitioners to work with him and a City Council team while linking a CouncilStat job posting; the interface displayed seven likes and no comments during review.",
    supportsGenerally: [
      "Jamie's exact first-person invitation language",
      "a CouncilStat job-posting route",
      "a mutable July 15, 2026 display of seven likes and no comments",
    ],
    doesNotEstablish: [
      "Jamie's employment, title, contract, team membership, or hiring authority",
      "that Jamie authored the job posting",
      "endorsement, conversion, or impact",
    ],
  },
  {
    id: jamiePersonalFacebookPostSourceIds.letNycDanceAction,
    title: "Jamie Burkart public Cabaret Law press-and-action post",
    ...publicPost,
    publishedAt: "2017-09-20",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid021AY6ydWmHSAXQooc1KgivMWjY3jcuWSj958Z73MQ6fJick7jNaHHDwfKgZuo7cbal",
    publicCitation:
      "Jamie Burkart, public Facebook post pairing NPR Cabaret Law coverage with a Council action route, September 20, 2017.",
    publicNote:
      "The post pairs Jamie's NPR quotation with a Council-contact and campaign call-script route; it displayed 24 reactions during review.",
    supportsGenerally: [
      "Jamie's public pairing of press coverage and legislative action",
      "an NPR and call-script route",
      "a mutable July 15, 2026 display of 24 reactions",
    ],
    doesNotEstablish: [
      "sole authorship of the collective campaign",
      "that the post caused legislative action",
      "readership, calls placed, conversion, endorsement, or impact",
    ],
  },
  {
    id: jamiePersonalFacebookPostSourceIds.kcTownHallStart,
    title: "Jamie Burkart public KC Town Hall project announcement",
    ...publicPost,
    publishedAt: "2018-07-02",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid023rhzPSnUranjNyMCotufqMNS6uqLJatPp9R4e2m4s1ytZutdVSw2vKzEijbueVigl",
    publicCitation:
      "Jamie Burkart, public Facebook post announcing the KC Town Hall project, July 2, 2018.",
    publicNote:
      "Jamie wrote that he and Julia Fredenburg were starting the project and described its neighborhood-resource and cultural-center intention; the post displayed 106 reactions and 14 comments during review.",
    supportsGenerally: [
      "Jamie's attributed co-initiation statement with Julia Fredenburg",
      "the stated public-benefit intention",
      "a mutable July 15, 2026 display of 106 reactions and 14 comments",
    ],
    doesNotEstablish: [
      "sole founding, ownership, or authorship by Jamie",
      "later public funding, transition, project outcome, or impact",
    ],
  },
  {
    id: jamiePersonalFacebookPostSourceIds.talksNotRaidsAction,
    title: "Jamie Burkart public Talks Not Raids action-routing post",
    ...publicPost,
    publishedAt: "2019-02-11",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid033Wq5p6tEctq8Lc4R5WxYpCyTgUfeEpyTQGa6y7VsTwMjfk81CJb7C7RRoxmAAQWXl",
    publicCitation:
      "Jamie Burkart, public Facebook post routing readers to the Talks Not Raids City Hall action, February 11, 2019.",
    publicNote:
      "The post routes readers to a City Hall hearing, NYC Artist Coalition media, the Talks Not Raids campaign site, and Council action on Introduction 1156.",
    supportsGenerally: [
      "Jamie's routing among an in-person hearing, coalition media, campaign infrastructure, and legislation",
    ],
    doesNotEstablish: [
      "Jamie's sole authorship of shared coalition material",
      "attendance, bill outcome, sole campaign ownership, causality, or impact",
    ],
  },
  {
    id: jamiePersonalFacebookPostSourceIds.gothamistMomentum,
    title: "Movement For Repealing NYC's Archaic 'No Dancing' Law Gains Momentum",
    author: "Jake Offenhartz",
    organization: "Gothamist",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-31",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://gothamist.com/arts-entertainment/movement-for-repealing-nycs-archaic-no-dancing-law-gains-momentum",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jake Offenhartz, 'Movement For Repealing NYC's Archaic No Dancing Law Gains Momentum,' Gothamist, March 31, 2017.",
    publicNote:
      "The independently published article reports that hundreds gathered at Market Hotel for the repeal effort. It supplies campaign context, not Jamie's individual role or a precise attendance count.",
    supportsGenerally: [
      "independent reporting on the March 2017 Market Hotel gathering",
      "public Cabaret Law repeal advocacy and campaign momentum",
    ],
    doesNotEstablish: [
      "Jamie's individual role in that gathering",
      "a precise attendance count",
      "sole campaign authorship or legislative causality",
    ],
  },
] satisfies KnowledgeBank["sources"];

export const jamiePersonalFacebookPostClaims = [
  {
    id: jamiePersonalFacebookPostClaimIds.population,
    project: projectId,
    internalClaim:
      "The authenticated owner-filtered crawl traversed 621 cursor pages, deduplicated 3,728 returned nodes into 1,243 records, and terminated with has-next-page false; every returned unique record received a disposition.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The owner-filtered crawl accounted for all 1,243 unique records returned across 621 cursor pages and terminated with no next page.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: jamiePersonalFacebookPostSourceIds.protectedCensus,
        relationship: "private-support",
        supports: ["cursor traversal", "deduplication", "terminal control"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: jamiePersonalFacebookPostSourceIds.controls,
        relationship: "direct-support",
        supports: ["public-safe aggregate population control"],
        locator: "populationControl",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Complete means every record returned by Manage Posts after applying Posted by: You received a disposition.",
      "This is not a native Meta export, deletion history, or immutable lifetime population.",
      "Audience labels were not exposed for 973 records, so the record-level corpus remains protected.",
    ],
    antiClaims: [
      "Jamie published exactly 1,243 Facebook posts in his lifetime",
      "Every captured record was public",
      "No historical record is deleted, hidden, migrated, or otherwise unavailable",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated full-population archival review"],
  },
  {
    id: jamiePersonalFacebookPostClaimIds.missionRouting,
    project: projectId,
    internalClaim:
      "Deterministic overlapping research rules routed 181 of the 1,243 records into project or practice categories, led by WOW List, Sunday Dinner, NYC Artist Coalition, and Let NYC Dance.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "A deterministic research pass routed 181 records into overlapping mission-related categories; those categories are finding aids, not impact scores.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: jamiePersonalFacebookPostSourceIds.controls,
        relationship: "direct-support",
        supports: ["181-record mission-routing denominator", "project route counts"],
        locator: "missionRouting",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Categories overlap and are deterministic research routes, not exclusive semantic judgments.",
      "Frequency does not measure labor, importance, priority, audience, traction, or impact.",
    ],
    antiClaims: [
      "The category totals measure Jamie's professional effort",
      "The most frequent project was necessarily the most important",
      "Mission-routing counts prove public impact",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex classification-boundary review"],
  },
  {
    id: jamiePersonalFacebookPostClaimIds.sourceQueue,
    project: projectId,
    internalClaim:
      "The returned corpus contains 430 URL-bearing records and 549 unique normalized external destinations, creating a source-discovery queue for recovery and close reading.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The owner-filtered archive preserves 549 external source leads; each remains a lead until independently recovered, close-read, and decomposed.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: jamiePersonalFacebookPostSourceIds.controls,
        relationship: "direct-support",
        supports: ["430 URL-bearing records", "549 normalized destinations"],
        locator: "postedUrlInventory",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: jamiePersonalFacebookPostSourceIds.gothamistMomentum,
        relationship: "corroborating",
        supports: ["one recovered and close-read independent destination"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "A posted destination remains a source lead until recovered and reviewed.",
      "Posting does not establish truth, authorship, partnership, endorsement, readership, conversion, causality, or impact.",
    ],
    antiClaims: [
      "Every posted URL corroborates a portfolio claim",
      "Jamie authored or endorsed every linked source",
      "The link inventory measures readership or impact",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex source review"],
  },
  {
    id: jamiePersonalFacebookPostClaimIds.stakeholderAddressing,
    project: projectId,
    internalClaim:
      "Overlapping mention, tag, quotation, and link rules found recurring routes to civic and cultural stakeholders, including 20 New York City Council and 18 Rafael Espinal record occurrences.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "The corpus repeatedly addressed civic and cultural stakeholders, but these are Jamie's outbound references rather than evidence of inbound engagement.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: jamiePersonalFacebookPostSourceIds.controls,
        relationship: "direct-support",
        supports: ["bounded stakeholder string and route occurrences"],
        locator: "stakeholderRouting",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Counts are overlapping references in Jamie's records, not actions by the named stakeholders.",
      "They do not establish engagement, endorsement, attendance, partnership, response, policy influence, or impact.",
      "The full corpus did not expose a reliable historical interaction or responder-identity population.",
    ],
    antiClaims: [
      "Twenty New York City Council members engaged with Jamie",
      "Rafael Espinal endorsed 18 posts",
      "Mentions prove official participation or policy influence",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-STAKEHOLDER-ENGAGEMENT-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex engagement-boundary review"],
  },
  {
    id: jamiePersonalFacebookPostClaimIds.selectedSignals,
    project: projectId,
    internalClaim:
      "Four individually rechecked public project posts retained mutable July 15 display floors: WOW List 28 likes; CouncilStat route seven likes and no comments; Let NYC Dance 24 reactions; KC Town Hall 106 reactions and 14 comments.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Four selected public project posts retained dated visible-response floors; the counters are mutable interface observations, not reach or impact measures.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: jamiePersonalFacebookPostSourceIds.controls,
        relationship: "direct-support",
        supports: ["dated selected-post counter controls"],
        locator: "selectedPublicSourceControls",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Counters are mutable interface snapshots, not historical analytics.",
      "Do not sum them or convert them into unique people, reach, stakeholder engagement, endorsement, attendance, conversion, causality, or impact.",
    ],
    antiClaims: [
      "The selected posts reached 165 people",
      "The counters prove project impact",
      "Comments establish institutional endorsement",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-STAKEHOLDER-ENGAGEMENT-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated public-post review"],
  },
  {
    id: jamiePersonalFacebookPostClaimIds.actionRouting,
    project: projectId,
    internalClaim:
      "Selected public posts show Jamie repeatedly connecting project explanation to practical participation routes across WOW List, Let NYC Dance, KC Town Hall, and Talks Not Raids.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Selected public posts show Jamie connecting project explanation to practical participation routes across WOW List, Let NYC Dance, KC Town Hall, and Talks Not Raids.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: jamiePersonalFacebookPostSourceIds.wowListNineCities,
        relationship: "direct-support",
        supports: ["community-calendar join route"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: jamiePersonalFacebookPostSourceIds.letNycDanceAction,
        relationship: "direct-support",
        supports: ["press-to-Council-action route"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: jamiePersonalFacebookPostSourceIds.kcTownHallStart,
        relationship: "direct-support",
        supports: ["neighborhood-process invitation"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: jamiePersonalFacebookPostSourceIds.talksNotRaidsAction,
        relationship: "direct-support",
        supports: ["hearing, coalition-media, campaign-site, and bill-action route"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "This is a selected-post practice claim, not a claim about every record.",
      "Routing does not establish clicks, attendance, calls placed, conversion, adoption, endorsement, causality, or impact.",
      "Collective project, campaign, and source authorship remains intact.",
    ],
    antiClaims: [
      "Jamie's posts caused participation or legislation",
      "Jamie solely authored the campaigns and their materials",
      "The corpus proves audience conversion",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex source review", "Chad lens review"],
  },
  {
    id: jamiePersonalFacebookPostClaimIds.councilStatContext,
    project: "callnyc",
    internalClaim:
      "In a public May 2016 post, Jamie invited open-data practitioners to work with him and a City Council team through a linked CouncilStat job posting; the exact institutional relationship behind that wording remains unresolved.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "A 2016 public post preserves Jamie's CouncilStat job route and attributed team language; his exact Council relationship remains unresolved.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: jamiePersonalFacebookPostSourceIds.councilStatRoute,
        relationship: "direct-support",
        supports: ["Jamie's attributed invitation", "CouncilStat job route"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Infer no employment, title, contract, team membership, or hiring authority.",
      "Recover the historical job posting and corroborating role evidence before broader public use.",
    ],
    antiClaims: [
      "Jamie was employed by CouncilStat",
      "Jamie authored or controlled hiring for the job posting",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex attribution-boundary review"],
  },
  {
    id: jamiePersonalFacebookPostClaimIds.kcTownHallCoInitiation,
    project: "kc-town-hall",
    internalClaim:
      "Jamie's July 2018 public announcement states that he and Julia Fredenburg were starting KC Town Hall and describes their intended permanently affordable neighborhood-resource and cultural-center purpose.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "A contemporaneous public announcement states that Jamie and Julia Fredenburg were starting KC Town Hall as a permanently affordable neighborhood resource and cultural center.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: jamiePersonalFacebookPostSourceIds.kcTownHallStart,
        relationship: "direct-support",
        supports: ["co-initiation statement", "stated public-benefit intention"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Credit Julia Fredenburg and retain the wording as Jamie's contemporaneous first-person statement.",
      "The post does not establish sole founding, ownership, later public funding, project outcome, or causal impact.",
    ],
    antiClaims: [
      "Jamie solely founded KC Town Hall",
      "The announcement proves the project's later outcome or impact",
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex collaborator-credit review"],
  },
] satisfies KnowledgeBank["claims"];

export const jamiePersonalFacebookPostResearchInquiries = [
  {
    id: "INQ-FB-JAMIE-POST-CORPUS-2026",
    project: projectId,
    question:
      "What can the complete returned owner-filtered Facebook population establish without turning private life, mutable counters, or platform associations into public professional claims?",
    methods: [
      "Traversed 621 owner-filtered cursor pages until Facebook reported has-next-page false.",
      "Deduplicated 3,728 returned nodes into 1,243 unique records and checked date and owner controls.",
      "Rechecked Manage Posts and applied Posted by: You in the authenticated interface on July 15, 2026.",
      "Ran deterministic overlapping research routes across the protected population and individually reopened selected public sources before promotion.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The returned surface contained 1,243 unique records across 621 cursor pages and ended with no next page.",
      "The returned chronology runs from December 19, 2006 through June 12, 2022.",
      "A deterministic research pass routed 181 records into overlapping mission categories.",
      "Six selected posts were individually rechecked as public.",
    ],
    limitations: [
      "This is complete disposition of the returned owner-filtered surface, not a native Meta export, deletion history, or immutable lifetime population.",
      "Audience labels were not exposed for 973 records; the raw population remains protected.",
      "No complete responder-identity or historical engagement export was recovered.",
    ],
    sourceIds: [
      jamiePersonalFacebookPostSourceIds.profileSurface,
      jamiePersonalFacebookPostSourceIds.protectedCensus,
      jamiePersonalFacebookPostSourceIds.controls,
    ],
    publicSummary:
      "All 1,243 records returned by the owner-filtered surface received a disposition. Deleted, hidden, unknown-audience, and otherwise unavailable history remains outside the public claim.",
    protectedLocatorId: "LOC-FB-JAMIE-OWNER-POST-CENSUS-2026-07",
  },
  {
    id: "INQ-FB-JAMIE-POSTED-SOURCES-2026",
    project: projectId,
    question:
      "Which of the 549 external destinations can be recovered and promoted as independent, official, or project evidence?",
    methods: [
      "Normalized destinations and separated source leads from claim evidence.",
      "Compared recovered destinations against the existing knowledge bank before creating records.",
      "Close-read the Gothamist Market Hotel report and recognized existing NPR and Pitch sources already governed elsewhere.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The corpus contains 430 URL-bearing records and 549 unique normalized external destinations.",
      "The Gothamist Market Hotel article now supplies independently governed campaign context.",
      "Existing NPR Cabaret Law and Pitch waterways reporting remain governed elsewhere in the bank.",
      "The remaining destinations stay in the source-review queue.",
    ],
    limitations: [
      "A posted URL is not automatic corroboration.",
      "Dead links, redirects, changed pages, and snippets require source-specific recovery.",
      "Posting does not establish authorship, partnership, endorsement, readership, conversion, causality, or outcome.",
    ],
    sourceIds: [
      jamiePersonalFacebookPostSourceIds.controls,
      jamiePersonalFacebookPostSourceIds.gothamistMomentum,
    ],
    publicSummary:
      "The corpus yielded 549 external source leads; reviewed reporting strengthens context while the remaining routes stay queued.",
  },
  {
    id: "INQ-FB-JAMIE-STAKEHOLDER-ENGAGEMENT-2026",
    project: projectId,
    question:
      "What stakeholder engagement can the full owner-post population establish?",
    methods: [
      "Counted overlapping civic and cultural stakeholder references across the protected corpus.",
      "Separated Jamie's outbound mentions, tags, quotations, and links from inbound stakeholder actions.",
      "Rechecked visible counters only on six individually public posts.",
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "The corpus repeatedly routes to civic and cultural stakeholders, including New York City Council and Rafael Espinal.",
      "The Manage Posts corpus did not expose reliable historical reaction, comment, share, or responder-identity totals.",
      "Four selected public posts retain bounded mutable counter floors.",
    ],
    limitations: [
      "Outbound references are not inbound engagement.",
      "Selected visible counters cannot be summed into reach or generalized to the full population.",
      "No stakeholder-group engagement claim crossed the evidence threshold in this pass.",
    ],
    sourceIds: [
      jamiePersonalFacebookPostSourceIds.protectedCensus,
      jamiePersonalFacebookPostSourceIds.controls,
    ],
    publicSummary:
      "The owner-post corpus documents whom Jamie addressed, not a complete record of who engaged back. Stakeholder engagement remains unresolved.",
    protectedLocatorId: "LOC-FB-JAMIE-ENGAGEMENT-RESEARCH-2026-07",
  },
  {
    id: "INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026",
    project: "callnyc",
    question:
      "What exact relationship, if any, underlies Jamie's May 2016 CouncilStat invitation language?",
    methods: [
      "Rechecked the public post's first-person wording and CouncilStat job-card identity.",
      "Separated the observable language from employment, title, contract, team-membership, and hiring-authority interpretations.",
      "Retained recovery of the original Council job posting and corroborating records as open work.",
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "The post supports Jamie's attributed invitation language and the CouncilStat job route.",
      "It does not resolve Jamie's title, employment, contract, formal team membership, or hiring authority.",
    ],
    limitations: [
      "The historical job posting has not been recovered in this pass.",
      "Social wording cannot distinguish formal employment from adjacent or informal collaboration without corroboration.",
    ],
    sourceIds: [jamiePersonalFacebookPostSourceIds.councilStatRoute],
    publicSummary:
      "Jamie's public post preserves a CouncilStat route and attributed team language while his exact Council relationship remains unresolved.",
  },
] satisfies KnowledgeBank["researchInquiries"];

export const jamiePersonalFacebookPostIntakeItems = [
  {
    id: "INTAKE-FB-JAMIE-PERSONAL-POSTS-2026-07-15",
    title: "Jamie personal Facebook full-population archival production",
    project: projectId,
    kind: "claim-candidate",
    summary:
      "A public-safe disposition of every record returned by Jamie's owner-filtered Facebook Manage Posts surface, with protected raw evidence, aggregate controls, six public project specimens, source-discovery routing, and explicit engagement limits.",
    status: "integrated",
    sourceIds: Object.values(jamiePersonalFacebookPostSourceIds),
    relatedClaimIds: Object.values(jamiePersonalFacebookPostClaimIds),
    relatedProofIds: [],
    candidateClaims: [
      "Selected public posts show Jamie repeatedly connecting project explanation to practical participation routes across WOW List, Let NYC Dance, KC Town Hall, and Talks Not Raids.",
    ],
    propositions: [
      {
        id: "PROP-FB-JAMIE-OWNER-POST-POPULATION-2026",
        text: "All 1,243 unique records returned across 621 owner-filtered cursor pages received a disposition, and the traversal terminated with has-next-page false.",
        status: "supported-with-boundary",
        sourceIds: [
          jamiePersonalFacebookPostSourceIds.protectedCensus,
          jamiePersonalFacebookPostSourceIds.controls,
        ],
        sourceSupport: ["terminal cursor control", "deduplication", "aggregate census"],
        boundaries: [
          "This is complete returned-surface accounting, not a native Meta export or deletion history.",
        ],
        decisionUse:
          "Supplies a reproducible denominator for archival findings without claiming a complete lifetime platform archive.",
      },
      {
        id: "PROP-FB-JAMIE-SOURCE-QUEUE-2026",
        text: "The returned corpus contains 430 URL-bearing records and 549 unique normalized external destinations.",
        status: "supported-with-boundary",
        sourceIds: [jamiePersonalFacebookPostSourceIds.controls],
        sourceSupport: ["normalized aggregate URL inventory"],
        boundaries: [
          "Every destination remains a lead until recovered, close-read, and decomposed.",
        ],
        decisionUse:
          "Creates a durable research queue for future source-backed portfolio composition.",
      },
      {
        id: "PROP-FB-JAMIE-PARTICIPATION-ROUTING-2026",
        text: "Selected public posts show Jamie repeatedly connecting project explanation to practical participation routes across WOW List, Let NYC Dance, KC Town Hall, and Talks Not Raids.",
        status: "synthesis-with-boundary",
        sourceIds: [
          jamiePersonalFacebookPostSourceIds.wowListNineCities,
          jamiePersonalFacebookPostSourceIds.letNycDanceAction,
          jamiePersonalFacebookPostSourceIds.kcTownHallStart,
          jamiePersonalFacebookPostSourceIds.talksNotRaidsAction,
        ],
        sourceSupport: [
          "join route",
          "Council-contact route",
          "neighborhood-process route",
          "hearing and bill-action route",
        ],
        boundaries: [
          "Routing does not establish clicks, attendance, calls, conversion, endorsement, causality, or impact.",
          "Collective project and campaign credit remains intact.",
        ],
        decisionUse:
          "Strengthens the implementation and public-communication record beneath future audience-specific composition.",
      },
      {
        id: "PROP-FB-JAMIE-STAKEHOLDER-ENGAGEMENT-BOUNDARY-2026",
        text: "The corpus documents recurring outbound references to civic and cultural stakeholders but does not recover a complete inbound engagement population.",
        status: "supported-with-boundary",
        sourceIds: [
          jamiePersonalFacebookPostSourceIds.protectedCensus,
          jamiePersonalFacebookPostSourceIds.controls,
        ],
        sourceSupport: ["stakeholder-route counts", "interaction-availability control"],
        boundaries: [
          "Do not label mentions, tags, quotations, or links as stakeholder engagement.",
          "Do not infer endorsement, policy influence, response, or impact.",
        ],
        decisionUse:
          "Prevents social routing evidence from becoming noisy or misleading traction language.",
      },
      {
        id: "PROP-FB-JAMIE-KCTOWNHALL-COINITIATION-2018",
        text: "Jamie's July 2018 public post states that he and Julia Fredenburg were starting KC Town Hall and describes its intended public benefit.",
        status: "direct-support",
        sourceIds: [jamiePersonalFacebookPostSourceIds.kcTownHallStart],
        sourceSupport: ["attributed contemporaneous first-person statement"],
        boundaries: [
          "Credit Julia Fredenburg and do not infer sole founding, ownership, later outcomes, or causality.",
        ],
        decisionUse:
          "Adds a contemporaneous co-initiation trace to the stronger official, archival, and collaborator evidence already in the bank.",
      },
    ],
    tensions: [],
    researchQuestions: [
      "Which of the remaining 549 posted destinations can be recovered as independent, official, or project evidence?",
      "Can an authorized native Meta export add material archival value without exposing private-life records?",
      "Can individually public records or a native export establish bounded stakeholder-group engagement without conflating mentions with responses?",
      "What official or collaborator evidence resolves Jamie's exact CouncilStat relationship?",
      "Does any future portfolio argument need a social-record layer, or is this material stronger as reserve depth?",
    ],
    boundaries: [
      "Do not publish raw post text, unknown-audience material, ordinary-life content, comments, responder identities, contact details, media, authentication state, or record-level private metrics.",
      "Do not treat deterministic routing as effort, importance, semantic truth, engagement, or impact.",
      "Do not infer stakeholder response from Jamie's mentions, tags, quotations, or links.",
      "Keep collaborator and collective authorship visible in every project-specific use.",
      "Do not create a /proofs, /facebook, personal-timeline, or engagement-dashboard route from this intake.",
      "No website copy changes in this archival pass without a separate audience-and-purpose composition decision.",
    ],
    projectionStatus: "no-public-projection",
    receivedAt: reviewedAt,
    reviewedAt,
    reviewedBy: [
      "Jamie Burkart",
      "Codex authenticated full-population archival-production review",
    ],
  },
] satisfies KnowledgeBank["intakeItems"];

export const jamiePersonalFacebookPostReportPath = reportPath;
