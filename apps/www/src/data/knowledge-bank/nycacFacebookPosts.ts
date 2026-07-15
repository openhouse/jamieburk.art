import type { KnowledgeBank } from "./schema.ts";

const projectId = "nyc-artist-coalition";
const reportPath =
  "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md";

export const nycacFacebookPostSourceIds = {
  pageSurface: "SRC-NYCAC-FACEBOOK-PAGE-SURFACE-2026-07-14",
  census: "SRC-NYCAC-FACEBOOK-POST-CENSUS-2026-07-14",
  protectedCapture: "SRC-NYCAC-FACEBOOK-PROTECTED-CAPTURE-2026-07-14",
  routeLedger: "SRC-NYCAC-FACEBOOK-ROUTE-LEDGER-2026-07-14",
  managerExports: "SRC-NYCAC-FACEBOOK-MANAGER-EXPORTS-2019-2021",
  firsthandMemory: "SRC-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026-07-15",
  cabaretPost: "SRC-NYCAC-FACEBOOK-CABARET-SAFETY-POST",
  talksNotRaidsPost: "SRC-NYCAC-FACEBOOK-TALKS-NOT-RAIDS-POST",
  covidVideo: "SRC-NYCAC-FACEBOOK-COVID-RIGHTS-VIDEO",
  cityStateAgentOfChange: "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
  seattleArtsRelief: "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020",
} as const;

export const nycacFacebookPostClaimIds = {
  population: "CLM-NYCAC-FACEBOOK-SURVIVING-POST-POPULATION",
  operatingSurface: "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-SURFACE",
  stakeholderRouting: "CLM-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING",
  sourceRouting: "CLM-NYCAC-FACEBOOK-SOURCE-ROUTING",
  visibleSignals: "CLM-NYCAC-FACEBOOK-VISIBLE-INTERACTION-SIGNALS",
  publishingMemory: "CLM-NYCAC-FACEBOOK-PUBLISHING-MEMORY",
} as const;

export const nycacFacebookPostReviewSummary = {
  recoveredPostCount: 444,
  recordsReviewedPercent: 100,
  recoveredRange: "2017-01-29 through 2021-09-15",
  terminalTraversals: 2,
  scrollOperations: 824,
  terminalScrollsWithoutAddition: [42, 41],
  exactIdentitySetMatch: true,
  protectedIdentitySetSha256:
    "f1f00d902415ebad0aa37043d7f64070d754c17449c396ac61aa34dec7733955",
  publicDispositionSetSha256:
    "425b7d99a59ac348f6192b034545de12986b8db16f242e65bd6521c0443e5a1b",
  forms: {
    "event-route": 150,
    "standalone-post": 138,
    "original-media-post": 78,
    "reshared-story": 52,
    "source-or-resource-route": 26,
  },
  primaryThemes: {
    "nightlife-enforcement-and-governance": 157,
    "general-coalition-communication": 95,
    "commercial-rent-and-tenancy": 71,
    "cultural-space-care": 47,
    "public-meetings-and-participation": 25,
    "funding-and-operational-resources": 21,
    "event-and-cultural-distribution": 15,
    "press-and-public-knowledge": 11,
    "equity-solidarity-and-mutual-aid": 2,
  },
  stakeholderRouting: {
    "NYC Council members and Council": 88,
    "NYC cultural and nightlife agencies": 40,
    "Cultural and advocacy partners": 39,
    "NYC business and enforcement agencies": 13,
    "Press and public-information organizations": 12,
  },
  recordsWithVisibleInteraction: 389,
  visibleInteractionFloor: { reactions: 2374, comments: 212, shares: 611 },
  outboundLinkOccurrences: 64,
  normalizedPublicSafeRoutes: 33,
  protectedRoutes: 2,
  managerExportRows: 185,
  managerExportRange: "2019-02-06 through 2021-09-15",
} as const;

export const nycacFacebookPostSources = [
  {
    id: nycacFacebookPostSourceIds.pageSurface,
    title: "NYC Artist Coalition Facebook Page",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/nycartc/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition Facebook Page, authenticated full-population review July 14, 2026.",
    publicNote:
      "The live Page supplied the surviving post surface. Two independent terminal traversals recovered the same 444 identities.",
    supportsGenerally: [
      "the current coalition Page identity",
      "currently surviving post wrappers",
      "a January 2017 through September 2021 public chronology",
    ],
    doesNotEstablish: [
      "a native lifetime export or deletion history",
      "the human publisher of each post",
      "historical peak reach or unique audience",
      "permission to publish comments, identities, or account administration",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.census,
    title: "NYC Artist Coalition Facebook public-safe post census",
    author: "Codex archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-15",
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/data/nycartc-public-facebook-post-ledger.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe census of 444 surviving NYC Artist Coalition Facebook post identities, July 14, 2026.",
    publicNote:
      "The ledger gives every recovered identity an anonymous form, theme, stakeholder-routing, URL-count, and visible-signal disposition while withholding post bodies, names, post URLs, and per-record metrics.",
    supportsGenerally: [
      "444-of-444 current-surface disposition",
      "form and theme arithmetic",
      "stakeholder-routing classifications",
      "an unlinkable visible-response floor",
      "a reproducible public disposition digest",
    ],
    doesNotEstablish: [
      "a lifetime publication total",
      "the absence of deleted or unavailable posts",
      "individual publisher identity",
      "stakeholder response, endorsement, or attendance",
      "reach, conversion, policy influence, or impact",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.protectedCapture,
    title: "Protected NYC Artist Coalition Facebook terminal captures",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Protected exact-set Facebook Page captures supporting the 444-record public-safe census, July 14, 2026.",
    publicNote:
      "Two traversals used distinct scroll cadences, matched exactly, and remained stable through 42 and 41 additional terminal scrolls. Raw messages, names, links, metrics, media, and authenticated state remain outside Git.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-POST-CAPTURES-2026-07-14",
    supportsGenerally: [
      "824 combined scroll operations",
      "two exact matching 444-record identity sets",
      "terminal no-addition controls",
      "protected source-to-disposition review",
    ],
    doesNotEstablish: [
      "permission to publish protected capture contents",
      "a native Meta export",
      "human-level publisher identity",
      "that no historical record is missing",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.routeLedger,
    title: "NYC Artist Coalition Facebook posted-route inventory",
    author: "Codex archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-15",
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/data/nycartc-public-facebook-post-route-ledger.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe inventory of 64 outbound-link occurrences consolidated into 33 routes from the NYC Artist Coalition Facebook corpus, July 14, 2026.",
    publicNote:
      "The inventory preserves campaign, civic-information, cultural-program, press, and resource routes. Two historical action destinations remain represented without URLs.",
    supportsGenerally: [
      "64 outbound-link occurrences",
      "33 normalized routes",
      "31 public routes and two protected historical-action routes",
      "repeated routing to coalition campaign sites and public information",
    ],
    doesNotEstablish: [
      "article-level corroboration without close reading",
      "authorship, readership, click-through, conversion, partnership, or impact",
      "current validity of historical action guidance",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.managerExports,
    title: "Protected Meta Business Suite content exports, 2019-2021",
    organization: "Meta / NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Protected first-party managed-content exports for NYC Artist Coalition Facebook posts published in 2019, 2020, and 2021.",
    publicNote:
      "Structured CSV review found 185 unique rows: 111 in 2019, 69 in 2020, and five in 2021. The exports corroborate managed-content chronology and bounded metric fields but omit 2017-2018 and do not expose a human publisher field.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-MANAGER-EXPORTS-2019-2021",
    supportsGenerally: [
      "185 unique first-party managed-content rows",
      "2019-02-06 through 2021-09-15 chronology",
      "post type and share-status fields",
      "bounded reach, reaction, comment, share, and click columns",
    ],
    doesNotEstablish: [
      "the denominator for the 2017-2021 surviving Page surface",
      "coverage of 2017 or 2018",
      "human publisher attribution",
      "unique lifetime reach or causal impact",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.firsthandMemory,
    title: "Jamie Burkart first-person NYC Artist Coalition Facebook recollection",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Jamie Burkart first-person recollection about NYC Artist Coalition Facebook publishing, received July 15, 2026.",
    publicNote:
      "Jamie remembers being the predominant person using the Page while also remembering that other coalition participants used it. The surviving interface and available exports do not resolve record-level human publishers.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026-07-15",
    supportsGenerally: [
      "Jamie's bounded first-person recollection",
      "a lead for administrator chronology and collaborator proof notes",
    ],
    doesNotEstablish: [
      "individual authorship of any post",
      "sole administration or sole control",
      "the proportion of posts published by Jamie",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.cabaretPost,
    title: "Cabaret Law repeal, venue safety, and city trust post",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.facebook.com/photo/?fbid=1945640715690307&set=a.544849644343446",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, Cabaret Law repeal, venue safety, and city trust post, Facebook.",
    publicNote:
      "The post tags Jamie Burkart and Council Member Rafael Espinal while connecting repeal, venue safety, and trust between cultural spaces and city government.",
    supportsGenerally: [
      "a public link among Jamie, the coalition, and Cabaret Law advocacy",
      "venue-safety and city-trust framing",
    ],
    doesNotEstablish: [
      "the human publisher or drafter",
      "Council endorsement or response",
      "policy causality or unique reach",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.talksNotRaidsPost,
    title: "Talks Not Raids safety and transparency post",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.facebook.com/photo/?fbid=2225985110989198&set=a.544849644343446",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, Talks Not Raids safety and transparency post, Facebook.",
    publicNote:
      "The post preserves Olympia Kazi's attributed safety-and-transparency framing and routes readers to Talks Not Raids. Olympia retains credit for her words.",
    supportsGenerally: [
      "Talks Not Raids public routing",
      "Olympia Kazi's attributed safety-and-transparency framing",
    ],
    doesNotEstablish: [
      "Jamie's individual drafting or publishing tasks",
      "MARCH disbandment or policy causality",
      "audience response or conversion",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.covidVideo,
    title: "COVID-19 know-your-rights video route",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/nycartc/videos/632085217644541/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, COVID-19 know-your-rights video route, Facebook.",
    publicNote:
      "The historical video routed cultural-space participants toward practical rent, tenant, and small-business legal information.",
    supportsGenerally: [
      "resource distribution through the coalition Page",
      "a connection between cultural-space care and practical information",
    ],
    doesNotEstablish: [
      "current legal guidance",
      "service outcomes or audience use",
      "the human publisher",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.cityStateAgentOfChange,
    title: "A compromise for nightlife venues and their neighbors",
    author: "Rafael Espinal, Jr.",
    organization: "City & State New York",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-09-26",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://www.cityandstateny.com/opinion/2018/09/a-compromise-for-nightlife-venues-and-their-neighbors/178085/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Rafael Espinal, Jr., 'A compromise for nightlife venues and their neighbors,' City & State New York, September 26, 2018.",
    publicNote:
      "Espinal describes a proposed Agent of Change approach assigning soundproofing responsibility around new residential and nightlife construction. The coalition Page circulated the article as policy context.",
    supportsGenerally: [
      "a mission-relevant article in the Page link trail",
      "Agent of Change proposal context",
      "nightlife, residential, and cultural-space policy framing",
    ],
    doesNotEstablish: [
      "enactment of the proposal",
      "Jamie's authorship or individual role",
      "coalition influence or endorsement",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.seattleArtsRelief,
    title:
      "City announces $1.1 million and rent relief to support arts organizations in the coronavirus economic crisis",
    organization: "The Seattle Times",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://www.seattletimes.com/entertainment/city-announces-1-1-million-and-rent-relief-to-support-arts-organizations-in-the-coronavirus-economic-crisis/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "The Seattle Times, 'City announces $1.1 million and rent relief to support arts organizations in the coronavirus economic crisis.'",
    publicNote:
      "The coalition Page circulated this as comparative arts-relief context. The article was not available for close reading in the current research environment, so it remains a source lead rather than proposition-level support.",
    supportsGenerally: [
      "a comparative arts-relief source route in the Facebook corpus",
      "a queued lead for future close reading",
    ],
    doesNotEstablish: [
      "the article's detailed propositions without close reading",
      "NYCAC involvement in Seattle relief",
      "Jamie as author or organizer",
    ],
  },
] satisfies KnowledgeBank["sources"];

export const nycacFacebookPostClaims = [
  {
    id: nycacFacebookPostClaimIds.population,
    project: projectId,
    internalClaim:
      "Two browser traversals using distinct scroll cadences recovered the same 444 surviving NYC Artist Coalition Facebook post identities dated January 29, 2017 through September 15, 2021; every identity received a public-safe disposition.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Two independent terminal traversals recovered the same 444 surviving NYC Artist Coalition Facebook post identities from January 2017 through September 2021. Every recovered record received a public-safe disposition.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookPostSourceIds.protectedCapture,
        relationship: "private-support",
        supports: ["exact identity-set match", "terminal controls", "date range"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: nycacFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: ["444-row public disposition", "reproducible public digest"],
        locator: "population and records",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "This is complete disposition of the surviving July 2026 Page surface, not a native Meta lifetime export or deletion history.",
      "Do not infer that no historical post was deleted, withheld, or omitted before capture.",
    ],
    antiClaims: [
      "NYC Artist Coalition published exactly 444 Facebook posts in its lifetime",
      "No historical Facebook post is missing",
      "The public ledger is a native Meta export",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival-production review"],
  },
  {
    id: nycacFacebookPostClaimIds.operatingSurface,
    project: projectId,
    internalClaim:
      "The 444-record corpus documents a collective public operating surface connecting recurring meetings, hearings, campaign sites, press, practical resources, relief information, partner activity, and coalition-created media across four major advocacy lanes.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Across 444 surviving post records, NYC Artist Coalition used Facebook as a collective operating surface: routing among meetings, hearings, Let NYC Dance, Save NYC Spaces, Talks Not Raids, FairRentNYC, press, practical resources, and relief information.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: ["form distribution", "theme chronology", "campaign continuity"],
        locator: "forms, primaryThemes, themeOccurrences, and records",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: nycacFacebookPostSourceIds.routeLedger,
        relationship: "corroborating",
        supports: ["campaign, civic, press, cultural, and resource routing"],
        locator: "rows",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "This is a collective Page-level practice and does not assign every post, campaign, event, quotation, or design decision to Jamie.",
      "Theme labels are analytical classifications and may overlap; they are not native Facebook categories.",
      "The corpus does not by itself establish policy causality or project impact.",
    ],
    antiClaims: [
      "Jamie authored every coalition Facebook post",
      "The Page record proves Jamie solely ran every campaign",
      "Facebook publishing caused the coalition's policy outcomes",
    ],
    researchInquiryIds: [
      "INQ-NYCAC-FACEBOOK-POST-POPULATION-2026",
      "INQ-NYCAC-FACEBOOK-SOURCE-NETWORK-2026",
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex full-population archival-production review"],
  },
  {
    id: nycacFacebookPostClaimIds.stakeholderRouting,
    project: projectId,
    internalClaim:
      "Rule-matched public-addressing classifications appear on 88 records for NYC Council members or Council, 40 for cultural and nightlife agencies, 39 for cultural and advocacy partners, 13 for business and enforcement agencies, and 12 for press or public-information organizations.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The Page repeatedly addressed and routed public work among Council, cultural and nightlife agencies, advocacy partners, business and enforcement agencies, and public-information organizations. These are routing signals, not verified inbound engagement.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: ["five stakeholder-routing category counts"],
        locator: "stakeholderRouting and records",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Categories overlap and count posts, not unique people or organizations.",
      "A tag, mention, quotation, link, or reshare does not establish that a stakeholder saw, authored, endorsed, replied to, partnered with, attended, or acted on a post.",
      "The 88-record Council category does not mean 88 Council members engaged.",
    ],
    antiClaims: [
      "Eighty-eight Council members engaged with NYC Artist Coalition",
      "Agency tags prove official endorsement",
      "Partner links prove formal collaboration",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-SOURCE-NETWORK-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex stakeholder-routing review"],
  },
  {
    id: nycacFacebookPostClaimIds.sourceRouting,
    project: projectId,
    internalClaim:
      "The rendered corpus contains 64 outbound-link occurrences consolidated into 33 normalized public-safe routes, including coalition campaigns, civic information, cultural programs, press, practical resources, fundraising, and relief information; two historical action routes remain protected.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The Facebook corpus routes through 33 normalized destinations spanning coalition campaigns, Council information, cultural programs, press, practical resources, fundraising, and relief information; two historical action links remain protected.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookPostSourceIds.routeLedger,
        relationship: "direct-support",
        supports: ["64 link occurrences", "33 normalized routes", "two protected routes"],
        locator: "accounting and rows",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: nycacFacebookPostSourceIds.cityStateAgentOfChange,
        relationship: "context",
        supports: ["Agent of Change policy context"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "A posted URL establishes routing, not automatic corroboration, authorship, readership, conversion, partnership, endorsement, or impact.",
      "Historical action destinations must not be presented as current guidance without separate review.",
      "The Seattle Times route remains a lead because its article body was not available for close reading in this environment.",
    ],
    antiClaims: [
      "Every linked source corroborates a coalition claim",
      "Every linked organization partnered with NYC Artist Coalition",
      "Posted routes prove readership or action",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-SOURCE-NETWORK-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex route-inventory review"],
  },
  {
    id: nycacFacebookPostClaimIds.visibleSignals,
    project: projectId,
    internalClaim:
      "On July 14, 2026, 389 of 444 surviving records displayed at least one reaction, comment, or share; unlinkable current counters summed to floors of 2,374 reactions, 212 comments, and 611 shares.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "On July 14, 2026, 389 of 444 surviving records retained at least one visible response signal. Current unlinkable counters sum to floors of 2,374 reactions, 212 comments, and 611 shares.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: ["389 signal-bearing records", "three unlinkable value-frequency tables"],
        locator: "visibleInteractionSnapshot",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: nycacFacebookPostSourceIds.managerExports,
        relationship: "corroborating",
        supports: ["first-party 2019-2021 metric fields"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "These are mutable current-interface observations, not lifetime analytics.",
      "Counters may include attention to reshared material and do not identify unique people.",
      "Do not convert these floors into reach, attendance, conversion, stakeholder endorsement, policy influence, causality, or impact.",
      "The 2019-2021 manager-export reach values are post-level fields whose sum is not unique audience reach.",
    ],
    antiClaims: [
      "NYC Artist Coalition reached 2,374 people",
      "Six hundred eleven shares caused policy change",
      "Visible responses equal attendance or unique engagement",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-SOURCE-NETWORK-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex bounded-metrics review"],
  },
  {
    id: nycacFacebookPostClaimIds.publishingMemory,
    project: projectId,
    internalClaim:
      "Jamie remembers being the predominant person using NYC Artist Coalition's Facebook Page while also remembering that other coalition participants used it; no recovered record currently assigns human publishers at post level.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Jamie remembers handling much of the coalition's Facebook publishing while also remembering that others used the Page. Human-level publisher attribution has not been recovered, so this remains a research lead rather than a public role claim.",
        status: "hold",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookPostSourceIds.firsthandMemory,
        relationship: "private-support",
        supports: ["bounded first-person recollection", "shared-use recollection"],
        confidence: "moderate",
        renderCitation: false,
      },
      {
        sourceId: nycacFacebookPostSourceIds.managerExports,
        relationship: "supports-boundary",
        supports: ["absence of a human publisher field in recovered exports"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Keep the recollection attributed to Jamie and use shared, not exclusive, language.",
      "Do not infer individual publisher identity from Page-level action controls, account access, tone, chronology, or project role.",
      "A native administrator chronology or collaborator proof notes are needed before quantifying Jamie's publishing share.",
    ],
    antiClaims: [
      "Jamie authored or published all 444 records",
      "Jamie was the sole Page administrator",
      "The archive verifies that Jamie was the predominant publisher",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-PUBLISHER-ATTRIBUTION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex evidence-boundary review"],
  },
] satisfies KnowledgeBank["claims"];

export const nycacFacebookPostResearchInquiries = [
  {
    id: "INQ-NYCAC-FACEBOOK-POST-POPULATION-2026",
    project: projectId,
    question:
      "Can every currently surviving NYC Artist Coalition Facebook Page-post identity receive a public-safe disposition under an auditable completeness control?",
    methods: [
      "Ran two authenticated Page traversals with distinct scroll cadences.",
      "Continued each traversal through 42 and 41 no-addition terminal scrolls.",
      "Compared protected identity sets for exact equality.",
      "Generated a public-safe anonymous record ledger and reproducible disposition digest.",
      "Kept raw post bodies, names, URLs, per-record metrics, media, and authenticated state outside Git.",
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Both traversals recovered the same 444 identities dated January 29, 2017 through September 15, 2021.",
      "All 444 recovered records received a public-safe disposition.",
      "The form counts and one-primary-theme counts each reconcile to 444.",
      "The committed disposition digest regenerates exactly from the 444 anonymous record IDs.",
    ],
    limitations: [
      "The surviving Page surface is not a native lifetime export or deletion history.",
      "The method cannot prove that no post was deleted, withheld, or omitted before capture.",
      "The public ledger intentionally cannot be joined back to raw post bodies or per-record metrics.",
    ],
    sourceIds: [
      nycacFacebookPostSourceIds.pageSurface,
      nycacFacebookPostSourceIds.protectedCapture,
      nycacFacebookPostSourceIds.census,
    ],
    publicSummary:
      "Two terminal traversals recovered the same 444 surviving Page-post identities, and all 444 received a public-safe disposition. This is complete current-surface accounting, not a lifetime Meta export.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-POPULATION-RESEARCH-2026-07-14",
  },
  {
    id: "INQ-NYCAC-FACEBOOK-SOURCE-NETWORK-2026",
    project: projectId,
    question:
      "What mission, source, stakeholder-routing, and visible-response patterns appear across the complete surviving post population?",
    methods: [
      "Classified all 444 records by form, one primary theme, overlapping themes, and broad stakeholder-routing groups.",
      "Normalized 64 outbound-link occurrences into a public-safe 33-route ledger and protected two historical action routes.",
      "Close-read selected posts and source articles while reusing existing governed campaign-press records.",
      "Parsed 2019-2021 Meta Business Suite CSV exports with a structured CSV reader as a separate first-party crosscheck.",
      "Separated public addressing from verified inbound engagement and mutable counters from impact.",
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The population includes 150 event routes, 138 standalone posts, 78 original-media posts, 52 reshared stories, and 26 source-or-resource routes.",
      "The largest primary lanes are nightlife enforcement and governance (157), general coalition communication (95), commercial rent and tenancy (71), and cultural-space care (47).",
      "Council-related routing appears on 88 records, but this does not establish engagement by 88 members or offices.",
      "The route ledger preserves 64 link occurrences across 33 normalized destinations, including campaign, civic, press, cultural, practical-resource, fundraising, and relief routes.",
      "Current unlinkable response counters are preserved as dated floors, not reach or impact.",
      "The protected manager exports contain 185 unique 2019-2021 rows and no historic human-level publisher field.",
    ],
    limitations: [
      "Theme and stakeholder labels are analytical and overlapping, not native platform categories.",
      "Tags, mentions, links, quotations, and reshares do not establish stakeholder response, endorsement, partnership, attendance, or action.",
      "Current counters do not identify unique people and are not lifetime analytics.",
      "The 2019-2021 manager exports omit 2017-2018 and are not the timeline denominator.",
      "The Seattle Times source route remains un-close-read in this research environment.",
    ],
    sourceIds: [
      nycacFacebookPostSourceIds.census,
      nycacFacebookPostSourceIds.routeLedger,
      nycacFacebookPostSourceIds.managerExports,
      nycacFacebookPostSourceIds.cabaretPost,
      nycacFacebookPostSourceIds.talksNotRaidsPost,
      nycacFacebookPostSourceIds.covidVideo,
      nycacFacebookPostSourceIds.cityStateAgentOfChange,
      nycacFacebookPostSourceIds.seattleArtsRelief,
      "SRC-NYT-CABARET-REPEAL-2017-10-30",
      "SRC-WNYC-CABARET-LAW-2017",
    ],
    publicSummary:
      "The surviving Page record documents a collective publishing system spanning meetings, four advocacy campaigns, public institutions, press, practical resources, and relief information. Routing and current response signals remain explicitly distinct from verified engagement or impact.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-SOURCE-NETWORK-2026-07-14",
  },
  {
    id: "INQ-NYCAC-FACEBOOK-PUBLISHER-ATTRIBUTION-2026",
    project: projectId,
    question:
      "Can Jamie's memory of predominant but shared Page use be corroborated at the human-publisher level?",
    methods: [
      "Accessioned Jamie's first-person recollection with shared-use language.",
      "Inspected the surviving Page and first-party 2019-2021 managed-content export fields for human-level publisher metadata.",
      "Kept account access and Page-level action controls separate from historical role proof.",
    ],
    runAt: "2026-07-15",
    resultStatus: "not-recovered",
    findings: [
      "Jamie remembers being the predominant Page user and remembers that others used it.",
      "Neither the surviving post surface nor the recovered CSV exports identifies the human publisher for each historic post.",
      "The memory remains a valuable research lead but is not promoted as a public accomplishment claim.",
    ],
    limitations: [
      "No native administrator chronology or record-level publisher export was recovered.",
      "No collaborator proof note about division of publishing labor was reviewed in this pass.",
      "Page access, tone, chronology, or campaign role cannot substitute for publisher metadata.",
    ],
    sourceIds: [
      nycacFacebookPostSourceIds.firsthandMemory,
      nycacFacebookPostSourceIds.managerExports,
      nycacFacebookPostSourceIds.pageSurface,
    ],
    publicSummary:
      "Jamie's memory of predominant but shared Page use remains research-stage because human-level publisher attribution was not recovered.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-PUBLISHER-RESEARCH-2026-07-15",
  },
] satisfies KnowledgeBank["researchInquiries"];

export const nycacFacebookPostIntakeItems = [
  {
    id: "INTAKE-NYCAC-FACEBOOK-POSTS-2026-07-15",
    title: "NYC Artist Coalition Facebook full-population archival production",
    project: projectId,
    kind: "claim-candidate",
    summary:
      "A 444-record current-surface pass reconciled the coalition Page's surviving post population, public operating pattern, posted routes, stakeholder addressing, visible response signals, first-party export crosscheck, authorship boundary, and public-safety disposition.",
    status: "integrated",
    sourceIds: [
      ...Object.values(nycacFacebookPostSourceIds),
      "SRC-NYT-CABARET-REPEAL-2017-10-30",
      "SRC-WNYC-CABARET-LAW-2017",
      "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
      "SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19",
    ],
    relatedClaimIds: Object.values(nycacFacebookPostClaimIds),
    relatedProofIds: [
      "nyc-artist-coalition-public-web-infrastructure",
      "nyc-artist-coalition-civic-systems",
      "nyc-artist-coalition-participation-system",
    ],
    candidateClaims: [
      "Jamie's independently documented NYC Artist Coalition systems work belongs within a collective Facebook operating surface spanning meetings, hearings, campaigns, press, public information, practical resources, and relief routes.",
    ],
    propositions: [
      {
        id: "PROP-NYCAC-FACEBOOK-CURRENT-POPULATION-2026",
        text: "Two independent terminal traversals recovered the same 444 surviving Page-post identities, and all 444 received a public-safe disposition.",
        status: "direct-support",
        sourceIds: [
          nycacFacebookPostSourceIds.protectedCapture,
          nycacFacebookPostSourceIds.census,
        ],
        sourceSupport: [
          "two exact matching protected identity sets",
          "terminal no-addition controls",
          "444-row public-safe ledger",
        ],
        boundaries: [
          "Complete current-surface disposition is not a native Meta lifetime export or proof that no historical post is missing.",
        ],
        decisionUse: "Defines the denominator for all post-population findings.",
      },
      {
        id: "PROP-NYCAC-FACEBOOK-OPERATING-SURFACE-2026",
        text: "Jamie's independently documented NYC Artist Coalition systems work belongs within a collective Facebook operating surface spanning meetings, hearings, campaigns, press, public information, practical resources, and relief routes.",
        status: "synthesis-with-boundary",
        sourceIds: [
          nycacFacebookPostSourceIds.census,
          nycacFacebookPostSourceIds.routeLedger,
          "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
          "SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19",
        ],
        sourceSupport: [
          "form and theme distributions",
          "33-route public inventory",
          "independent reporting identifying Jamie's coalition safety and advocacy work",
          "a contemporaneous interview connecting Jamie to NYC Artist Coalition",
        ],
        boundaries: [
          "The collective Page pattern contextualizes independently documented work; it does not assign Jamie individual post authorship or establish policy causality.",
        ],
        decisionUse:
          "Makes the civic product-operations practice legible beyond the generic category of social media.",
      },
      {
        id: "PROP-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING-2026",
        text: "Rule-matched stakeholder categories document repeated public addressing of Council, agencies, partners, and press across the Page record.",
        status: "supported-with-boundary",
        sourceIds: [nycacFacebookPostSourceIds.census],
        sourceSupport: ["five stakeholder-routing category counts"],
        boundaries: [
          "Routing does not establish inbound engagement, endorsement, partnership, attendance, or action.",
        ],
        decisionUse:
          "Preserves mission-relevant stakeholder architecture without manufacturing an engagement statistic.",
      },
      {
        id: "PROP-NYCAC-FACEBOOK-VISIBLE-SIGNALS-2026",
        text: "Current unlinkable counters preserve a dated response floor across the surviving surface.",
        status: "supported-with-boundary",
        sourceIds: [
          nycacFacebookPostSourceIds.census,
          nycacFacebookPostSourceIds.managerExports,
        ],
        sourceSupport: [
          "389 records with at least one current visible signal",
          "unlinkable current counter frequencies",
          "first-party 2019-2021 metric-field crosscheck",
        ],
        boundaries: [
          "These mutable counters are not unique people, lifetime analytics, reach, attendance, conversion, endorsement, causality, or impact.",
        ],
        decisionUse:
          "Keeps traction evidence available for future composition without inflating it into outcomes.",
      },
      {
        id: "PROP-NYCAC-FACEBOOK-PUBLISHER-UNRESOLVED-2026",
        text: "Jamie remembers predominant but shared Page use, but no recovered record supplies human-level publisher attribution for the 444 posts.",
        status: "memory-lead",
        sourceIds: [
          nycacFacebookPostSourceIds.firsthandMemory,
          nycacFacebookPostSourceIds.managerExports,
        ],
        sourceSupport: [
          "Jamie's bounded recollection",
          "absence of a human publisher field in the recovered exports",
        ],
        boundaries: [
          "Do not promote predominant use, sole administration, authorship, or a numerical publishing share without corroboration.",
        ],
        decisionUse: "Preserves an attribution research lead without using it publicly.",
        nextStep:
          "Recover a native administrator chronology, publisher-attribution export, or collaborator proof notes before promoting an individual Page-publishing claim.",
      },
    ],
    tensions: [],
    researchQuestions: [
      "Can a native Meta download recover deleted-post accounting and human-level publisher attribution?",
      "Which collaborators can describe the division of Facebook publishing labor?",
      "Which tagged Council or agency accounts supplied verifiable inbound replies, reshares, or other actions distinct from Page-authored routing?",
      "Which linked press and public-resource routes merit article-level close reading and governed source records?",
      "Which of the collective operating-surface findings improves a future hiring argument enough to merit website projection?",
    ],
    boundaries: [
      "Do not publish raw post text, comments, names, per-record metrics, raw post URLs, media, account IDs, administrator state, local paths, credentials, cookies, or session context.",
      "Do not infer human authorship or publishing responsibility from Page identity, account access, tone, chronology, or project role.",
      "Do not convert stakeholder routing into engagement or current counters into reach, attendance, conversion, policy influence, causality, or impact.",
      "Retain collective credit and explicit attribution for Olympia Kazi and other named source authors.",
      "Keep this archival layer out of the public website until a separate audience-and-purpose composition decision is made.",
    ],
    projectionStatus: "no-public-projection",
    receivedAt: "2026-07-15",
    reviewedAt: "2026-07-15",
    reviewedBy: [
      "Jamie Burkart",
      "Codex full-population authenticated archival-production review",
    ],
  },
] satisfies KnowledgeBank["intakeItems"];

export const nycacFacebookPostReportPath = reportPath;
