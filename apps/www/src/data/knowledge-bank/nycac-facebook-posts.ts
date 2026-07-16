import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-07-16";
const project = "nyc-artist-coalition";

export const nycacFacebookPostSourceIds = {
  corpus: "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15",
  protectedRun: "SRC-NYCAC-FACEBOOK-POST-OWNER-RESEARCH-2026-07-15",
  page: "SRC-NYCAC-FACEBOOK-PAGE-2026-07-16",
  grubStreet: "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22",
  fox5: "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26",
  timeOut: "SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22",
} as const;

export const nycacFacebookPostClaimIds = {
  operatingRecord: "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
  civicRelay: "CLM-NYCAC-FACEBOOK-CIVIC-RELAY",
  metrics: "CLM-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
} as const;

export const nycacFacebookPostReviewSummary = {
  exportRows: 444,
  uniqueExportedPostIds: 444,
  publicLedgerRows: 444,
  dateRange: { earliest: "2017-01-29", latest: "2021-09-15" },
  annualRows: { 2017: 185, 2018: 74, 2019: 111, 2020: 69, 2021: 5 },
  postTypes: { text: 172, links: 131, photos: 116, videos: 25 },
  originalOrUnmarked: 303,
  markedAsShare: 141,
  distinctExternalRoutes: 67,
  publishedExactRoutes: 65,
  withheldSensitiveRoutes: 2,
  governedSourceRoutes: 9,
  inventoryOnlyRoutes: 56,
  rowsWithInteractions: 375,
  rowsWithReach: 364,
  reactions: 2589,
  comments: 295,
  shares: 552,
  totalClicks: 2190,
  summedPostReach: 48044,
  currentRoundedFollowers: "1.5K",
} as const;

export const nycacFacebookPostSources: KnowledgeBank["sources"] = [
  {
    id: nycacFacebookPostSourceIds.corpus,
    title: "NYC Artist Coalition Facebook posts full-population public-safe corpus",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex owner-export, corpus-integrity, and source-registry review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex public-safe corpus review",
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "NYC Artist Coalition Facebook posts full-population public-safe corpus, July 15, 2026.",
    publicNote:
      "The corpus assigns every row in five annual Published exports a public-safe disposition using dates, one-way reconciliation hashes, source-route keys, overlapping classifications, and aggregate controls. Raw posts, platform IDs, comments, identities, authenticated routes, and two sensitive exact routes remain excluded.",
    supportsGenerally: [
      "444 annual Published-export rows and 444 unique post IDs",
      "a January 29, 2017 through September 15, 2021 chronology",
      "444 public ledger rows with unique one-way reconciliation hashes",
      "67 distinct off-Facebook routes",
      "overlapping mission and stakeholder-reference patterns",
      "bounded capture-date owner-export metrics",
    ],
    doesNotEstablish: [
      "every post ever created or deleted-post recovery",
      "historical post-level human authorship",
      "incoming engagement by named stakeholder groups",
      "unique-person reach, attendance, endorsement, conversion, mandate, or policy impact",
      "that every linked source is coalition coverage or endorsement",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.protectedRun,
    title: "Authenticated NYC Artist Coalition Facebook owner-export and feed research run",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    accessedAt: reviewedAt,
    publicCitation:
      "Authenticated archival-production pass over the NYC Artist Coalition Facebook Page and annual Published exports, July 15-16, 2026.",
    publicNote:
      "Protected materials retain five annual CSV exports, raw post bodies, platform IDs, permalinks, metrics, and traversal evidence. The July 16 authenticated owner surface reconfirmed the Page identity, management access, completed annual exports, and the current Content interface.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "five annual owner-export denominators",
      "444 unique exported post IDs",
      "terminal Page-feed traversal",
      "cross-surface reconciliation",
      "current authenticated Page-management access",
      "source extraction and thematic close reading",
    ],
    doesNotEstablish: [
      "permission to publish protected exports or captures",
      "deleted, hidden, private, unpublished, or no-longer-retained history",
      "the individual historical publisher of each shared-account post",
      "stakeholder identity behind aggregate metrics",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.page,
    title: "NYC Artist Coalition Facebook Page",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex authenticated live Page review",
    canonicalUrl: "https://www.facebook.com/nycartc/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition Facebook Page, authenticated review July 16, 2026.",
    publicNote:
      "The live Page confirmed the public coalition identity and displayed a rounded current count of 1.5K followers. Authenticated management controls establish current custody only and remain outside the public repository.",
    supportsGenerally: [
      "the public NYC Artist Coalition Facebook identity",
      "a rounded current display of 1.5K followers on July 16, 2026",
      "current Page-management access",
    ],
    doesNotEstablish: [
      "historical post-level human authorship",
      "a historical follower count for 2017-2021",
      "complete deleted-post history",
      "the identity of historical readers or engagers",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.grubStreet,
    title: "Gentrification Threatened Their Bar - Black Neighbors Refused to Let That Happen",
    organization: "Grub Street",
    author: "Nikita Richardson",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-05-22",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex live-source review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex public-source review",
    canonicalUrl:
      "https://www.grubstreet.com/2019/05/prospect-heights-ode-to-babel-gentrification.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Nikita Richardson, 'Gentrification Threatened Their Bar - Black Neighbors Refused to Let That Happen,' Grub Street, May 22, 2019.",
    publicNote:
      "Reporting documents community support for Ode to Babel, the venue's M.A.R.C.H. experience, and public protest of raid and transparency practices by NYC Artist Coalition, Hell's Kitchen Democrats, Stephen Levin, and Rafael Espinal.",
    supportsGenerally: [
      "community support for Ode to Babel",
      "M.A.R.C.H. raid impact described by the owners",
      "NYC Artist Coalition and named officials protested M.A.R.C.H. raids and transparency gaps",
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "sole coalition causation",
      "the complete coalition division of labor",
      "a general attendance or impact total",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.fox5,
    title: "New York's 'nightlife mayor' holds first event",
    organization: "FOX 5 New York",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-03-26",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex live-source review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex public-source review",
    canonicalUrl:
      "https://www.fox5ny.com/news/new-yorks-nightlife-mayor-holds-first-event",
    preferredPublicUrl: "canonical",
    publicCitation:
      "FOX 5 New York, 'New York's nightlife mayor holds first event,' March 26, 2018.",
    publicNote:
      "Reporting on the nightlife director's inaugural public event at Secret Project Robot records a room of bar owners, artists, promoters, and performers raising rent, noise, and bureaucracy concerns.",
    supportsGenerally: [
      "the March 26, 2018 public event",
      "Secret Project Robot as venue",
      "commercial-rent, noise-complaint, and city-bureaucracy concerns",
      "Rafael Espinal sponsored the Office of Nightlife law",
    ],
    doesNotEstablish: [
      "NYC Artist Coalition solely created the Office of Nightlife",
      "Jamie's sole production credit",
      "a verified attendance count",
      "resolution of every concern raised",
    ],
  },
  {
    id: nycacFacebookPostSourceIds.timeOut,
    title: "It's still illegal to dance in some parts of New York",
    organization: "Time Out New York",
    author: "Will Gleason",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-22",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex live-source review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex public-source review",
    canonicalUrl:
      "https://www.timeout.com/newyork/blog/its-still-illegal-to-dance-in-some-parts-of-new-york-032217",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Will Gleason, 'It's still illegal to dance in some parts of New York,' Time Out New York, March 22, 2017.",
    publicNote:
      "The article records the Cabaret Law's continuing restrictions and identifies Dance Liberation Network and NYC Artist Coalition as partners on the March 30 Let NYC Dance event and repeal call.",
    supportsGenerally: [
      "Cabaret Law restrictions remained in force in March 2017",
      "Dance Liberation Network and NYC Artist Coalition partnered on Let NYC Dance",
      "the March 30, 2017 Market Hotel event called for repeal",
    ],
    doesNotEstablish: [
      "Jamie's individual event role",
      "Jamie's authorship of the Facebook post",
      "sole coalition causation",
      "the later repeal outcome",
    ],
  },
];

export const nycacFacebookPostClaims: KnowledgeBank["claims"] = [
  {
    id: nycacFacebookPostClaimIds.operatingRecord,
    project,
    internalClaim:
      "Five annual Published exports and the terminal Page feed preserve a 444-post public operating record of NYC Artist Coalition's campaign continuity and source routing from 2017 through 2021.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "A complete owner-export pass preserves 444 surviving Published records from 2017-2021, reconciled against the Page feed with public-safe source routing and shared-account authorship boundaries.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookPostSourceIds.corpus,
        relationship: "direct-support",
        supports: [
          "444 exported rows and unique post IDs",
          "444 public ledger rows",
          "2017-2021 chronology",
          "67 off-Facebook routes",
        ],
        locator:
          "populationReconciliation; ownerExportReconciliation; population; postedUrlInventory",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: nycacFacebookPostSourceIds.protectedRun,
        relationship: "supports-boundary",
        supports: [
          "authenticated export method",
          "feed reconciliation",
          "population and privacy boundaries",
        ],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Complete means every row Meta returned through annual Published exports across the surviving chronology, not every post ever created.",
      "Do not attribute every shared-account post to Jamie or another individual.",
      "Keep raw bodies, platform IDs, comments, identities, authenticated routes, and sensitive exact routes outside the public repository.",
    ],
    antiClaims: [
      "NYC Artist Coalition made exactly 444 Facebook posts in its lifetime",
      "Jamie authored every NYC Artist Coalition Facebook post",
      "current Page access proves historical authorship",
      "the Page record proves policy impact",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
  },
  {
    id: nycacFacebookPostClaimIds.civicRelay,
    project,
    internalClaim:
      "The recovered Page functioned as collective civic communications infrastructure, repeatedly routing cultural-space experience, campaign actions, public meetings, government interfaces, source articles, practical resources, and policy developments across several advocacy arcs.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Across overlapping campaign arcs, the shared Page connected cultural-space concerns with public meetings, source articles, government interfaces, practical resources, and civic action routes.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookPostSourceIds.corpus,
        relationship: "direct-support",
        supports: [
          "overlapping mission patterns",
          "stakeholder-reference patterns",
          "65 published exact routes and two withheld sensitive routes",
          "nine governed source routes",
        ],
        locator: "missionSummary; stakeholderSummary; postedUrlSummary",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: nycacFacebookPostSourceIds.grubStreet,
        relationship: "corroborating",
        supports: [
          "community support for Ode to Babel",
          "coalition and named-official protest of M.A.R.C.H. raids and transparency gaps",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: nycacFacebookPostSourceIds.timeOut,
        relationship: "context",
        supports: [
          "the Let NYC Dance event partnership",
          "Cabaret Law repeal advocacy context",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: nycacFacebookPostSourceIds.protectedRun,
        relationship: "supports-boundary",
        supports: [
          "shared-account human authorship remains unresolved",
          "current Page custody does not establish historical exclusivity",
        ],
        confidence: "moderate",
        renderCitation: false,
      },
    ],
    boundaries: [
      "This is collective communications infrastructure, not Jamie's individually authored feed.",
      "Stakeholder references and source distribution do not establish incoming engagement, endorsement, partnership, mandate, or policy causation.",
      "Mission tags overlap and are not mutually exclusive campaign totals.",
    ],
    antiClaims: [
      "every referenced official engaged with NYC Artist Coalition",
      "source distribution proves stakeholder endorsement",
      "the Facebook Page caused Cabaret Law repeal, Office of Nightlife creation, M.A.R.C.H. reform, or commercial-rent legislation",
      "all linked articles are coverage of NYC Artist Coalition",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
  },
  {
    id: nycacFacebookPostClaimIds.metrics,
    project,
    internalClaim:
      "On July 15, 2026, Meta's annual owner exports displayed 2,589 reactions, 295 comments, 552 shares, a 48,044 sum of post-level reach, and 2,190 clicks across 444 Published records.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "A dated owner-export metric snapshot is preserved in the corpus but held from accomplishment messaging because aggregate row values do not identify unique people, stakeholder groups, endorsement, or impact.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: nycacFacebookPostSourceIds.corpus,
        relationship: "direct-support",
        supports: [
          "444-record metric denominator",
          "2,589 reactions",
          "295 comments",
          "552 shares",
          "48,044 summed post reach",
          "2,190 clicks",
        ],
        locator: "ownerExportReconciliation.metricSnapshot",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "The values are capture-date platform metrics, not historical values fixed at publication time.",
      "Summed post reach is not a unique-person audience total.",
      "Aggregate metrics do not identify stakeholder groups or establish attendance, conversion, endorsement, mandate, or impact.",
      "The separate current 1.5K follower display is rounded and must not be combined with the export metrics.",
    ],
    antiClaims: [
      "48,044 unique people saw NYC Artist Coalition posts",
      "3,436 unique people engaged",
      "Council members produced the aggregate reactions, comments, shares, or clicks",
      "the metric snapshot proves attendance, adoption, endorsement, or policy impact",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
  },
];

export const nycacFacebookPostResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-NYCAC-FACEBOOK-POST-POPULATION-2026",
    project,
    question:
      "What does the full available NYC Artist Coalition Facebook post population establish about project operation, source circulation, mission patterns, civic interfaces, traction, and Jamie's role?",
    methods: [
      "Verified the authenticated Page-management surface and public Page identity.",
      "Reconciled annual Meta Business Suite Published exports for every nonempty year in the surviving chronology.",
      "Confirmed 444 exported rows and 444 unique post IDs across 2017-2021.",
      "Reconciled the native denominator against a terminal Page-feed traversal after removing duplicate and embedded render variants.",
      "Published a metadata-only corpus with one-way hashes, bounded classifications, public routes, and aggregate metrics while withholding raw posts and social-graph data.",
      "Separated stakeholder references from incoming engagement and shared-account custody from human authorship.",
      "Close-read three newly governed articles and retained 56 posted routes as an explicit research queue.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The annual owner exports contain 444 rows and 444 unique post IDs spanning January 29, 2017 through September 15, 2021.",
      "The terminal Page-feed traversal reconciles to the same 444-row denominator after duplicate and embedded render variants are excluded.",
      "The public-safe corpus preserves 67 distinct off-Facebook routes, including nine governed sources and 56 inventory-only research routes; two sensitive exact routes remain withheld.",
      "The record shows sustained collective routing across cultural-space survival, Cabaret Law repeal, M.A.R.C.H. accountability, nightlife governance, commercial rent, relief, and civic participation.",
      "The owner exports preserve a complete capture-date metric snapshot for the 444-row denominator, but aggregate values do not identify unique people or stakeholder groups.",
      "Jamie remembers predominantly using the Page while believing others also used it; post-level human authorship remains unresolved.",
    ],
    limitations: [
      "The owner exports do not prove that deleted, hidden, private, unpublished, or no-longer-retained posts never existed.",
      "The Page and exports do not identify the individual historical human publisher of every row.",
      "Page references to stakeholders do not establish incoming engagement, endorsement, partnership, mandate, or policy impact.",
      "Aggregate metrics are capture-date row values, not unique-person reach, attendance, conversion, endorsement, or impact.",
      "Fifty-six public routes still require close reading and preservation.",
    ],
    sourceIds: [
      nycacFacebookPostSourceIds.corpus,
      nycacFacebookPostSourceIds.protectedRun,
      nycacFacebookPostSourceIds.page,
      nycacFacebookPostSourceIds.grubStreet,
      nycacFacebookPostSourceIds.fox5,
      nycacFacebookPostSourceIds.timeOut,
      "SRC-PRESS-TNR-GOTHAMIST-MARCH-2019",
      "SRC-PRESS-TNR-BEDFORD-DISCO-DISCORD-2019",
      "SRC-PRESS-LND-NYT-BOOGIE-2017",
      "SRC-NYCA-NPR-CABARET-CONTEXT-2017",
      "SRC-PRESS-LND-NEW-YORKER-DANCE-OUTLAWS-2017",
      "SRC-PRESS-LND-WNYC-BUREAUCRATIC-DANCE-2017",
    ],
    publicSummary:
      "A complete annual Published-export pass preserves 444 surviving records and a 67-route source inventory while keeping lifetime-history, shared-authorship, stakeholder-engagement, and metric-to-impact boundaries explicit.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001",
  },
];
