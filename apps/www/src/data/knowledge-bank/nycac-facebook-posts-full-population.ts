import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

const ids = {
  corpus: "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026",
  protectedRun: "SRC-NYCAC-FACEBOOK-POST-PROTECTED-RUN-2026",
  ownerExports: "SRC-NYCAC-FACEBOOK-POST-OWNER-EXPORTS-2026",
  page: "SRC-NYCAC-FACEBOOK-PAGE-SNAPSHOT-2026",
  grubStreet: "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22",
  fox5: "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-2018-03-26",
  timeOut: "SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22",
  operatingRecord: "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
  civicRelay: "CLM-NYCAC-FACEBOOK-CIVIC-RELAY",
  metrics: "CLM-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
  populationInquiry: "INQ-NYCAC-FACEBOOK-POST-POPULATION-2026",
  authorshipInquiry: "INQ-NYCAC-FACEBOOK-HUMAN-AUTHORSHIP-2026",
  engagementInquiry: "INQ-NYCAC-FACEBOOK-STAKEHOLDER-ENGAGEMENT-2026",
  sourceInquiry: "INQ-NYCAC-FACEBOOK-SOURCE-PRESERVATION-2026"
} as const;

const existingGovernedSourceIds = [
  "SRC-PRESS-LND-NYT-2017-10-30",
  "SRC-PRESS-LND-NEW-YORKER-2017-07-03",
  "SRC-NYCAC-NPR-2017-09-20",
  "SRC-PRESS-TNR-GOTHAMIST-2019-02-12",
  "SRC-PRESS-TNR-BEDFORD-BOWERY-DISCO-DISCORD-2019",
  "SRC-PRESS-LND-WNYC-BUREAUCRATIC-DANCE"
] as const;

export const nycacFacebookPostSources: SourceRecord[] = [
  {
    id: ids.corpus,
    title: "NYC Artist Coalition Facebook posts full-population public-safe corpus",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/cf30662e4d4adbe35f97f6dcf26600b374477999/docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition Facebook posts full-population public-safe corpus, reconciled July 15-16, 2026.",
    publicNote:
      "A 445-row terminal-feed ledger of dates, one-way reconciliation hashes, source-route keys, overlapping mission and stakeholder-reference classifications, and bounded feed metrics, plus separate aggregate controls for all 444 owner-export rows. Raw bodies, post IDs, comments, identities, authenticated routes, and sensitive exact routes are excluded.",
    supportsGenerally: [
      "444 annual Published-export rows and 444 unique native post IDs",
      "a January 29, 2017, through September 15, 2021, chronology",
      "445 terminal-feed ledger rows with unique one-way reconciliation hashes",
      "67 distinct off-Facebook routes",
      "65 published exact routes and two withheld sensitive routes",
      "overlapping mission and stakeholder-reference patterns",
      "bounded capture-date owner-export and feed metric snapshots"
    ],
    doesNotEstablish: [
      "every post ever created or deleted-post recovery",
      "historical post-level human authorship",
      "incoming engagement by named stakeholder groups",
      "unique-person reach, attendance, endorsement, conversion, mandate, or policy impact",
      "that every linked source is coalition coverage or endorsed by the coalition"
    ]
  },
  {
    id: ids.protectedRun,
    title: "Authenticated NYC Artist Coalition Facebook feed reconciliation run",
    organization: "NYC Artist Coalition",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Protected authenticated archival-production pass over the NYC Artist Coalition Facebook Page feed, July 15-16, 2026.",
    publicNote:
      "The protected run retains the terminal feed traversal, private reconciliation identities, raw post bodies, links, media references, and capture logs. The public corpus preserves only one-way hashes, dates, classifications, public-safe routes, and explicit boundaries.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "598 encountered feed render rows",
      "seven stable terminal checks",
      "445 distinct feed identities after 153 duplicate or embedded render variants were excluded",
      "complete feed-to-public-ledger reconciliation independent of the owner-export denominator"
    ],
    doesNotEstablish: [
      "permission to publish protected captures",
      "deleted, hidden, private, unpublished, or no-longer-retained history",
      "the individual human publisher of each shared-account post"
    ]
  },
  {
    id: ids.ownerExports,
    title: "NYC Artist Coalition annual Meta Published-post owner exports",
    organization: "Meta / NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Protected annual Meta Business Suite Published-post exports for NYC Artist Coalition, reviewed July 15-16, 2026.",
    publicNote:
      "Five protected annual exports account for every surviving Published row in 2017-2021. They contain raw copy, permalinks, native IDs, and administrator metrics and therefore remain outside the public repository. Two Page IDs appear under the same Page name, retained as a bounded Meta identity or migration artifact.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-002",
    supportsGenerally: [
      "five annual export denominators",
      "444 rows and 444 unique post IDs",
      "185, 74, 111, 69, and 5 rows in 2017 through 2021",
      "capture-date aggregate reactions, comments, shares, reach, and click values",
      "the observed two-Page-ID export artifact"
    ],
    doesNotEstablish: [
      "permission to publish native exports or row-level administrator analytics",
      "historical human authorship",
      "unique-person reach or stakeholder identity",
      "attendance, endorsement, conversion, mandate, or policy impact"
    ]
  },
  {
    id: ids.page,
    title: "NYC Artist Coalition Facebook Page",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/nycartc",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition Facebook Page, accessed July 16, 2026.",
    publicNote:
      "The public Page remained available under the NYC Artist Coalition identity. Authenticated management controls are documented only in protected research records.",
    supportsGenerally: [
      "current public Page identity",
      "current public Page availability"
    ],
    doesNotEstablish: [
      "historical post-level human authorship",
      "complete deleted-post history",
      "the identity of historical readers or engagers"
    ]
  },
  {
    id: ids.grubStreet,
    title: "Gentrification Threatened Their Bar - Black Neighbors Refused to Let That Happen",
    organization: "Grub Street",
    author: "Nikita Richardson",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-05-22",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.grubstreet.com/2019/05/prospect-heights-ode-to-babel-gentrification.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Nikita Richardson, 'Gentrification Threatened Their Bar - Black Neighbors Refused to Let That Happen,' Grub Street, May 22, 2019.",
    publicNote:
      "Reporting on community support for Ode to Babel and the venue's M.A.R.C.H. raid history.",
    supportsGenerally: [
      "community support for Ode to Babel",
      "liquor-license renewal",
      "M.A.R.C.H. raid impact described by the owners",
      "NYC Artist Coalition and named officials protested M.A.R.C.H. raids and transparency gaps"
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "sole coalition causation",
      "the complete coalition division of labor"
    ]
  },
  {
    id: ids.fox5,
    title: "New York's nightlife mayor holds first event",
    organization: "FOX 5 New York",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-03-26",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.fox5ny.com/news/new-yorks-nightlife-mayor-holds-first-event",
    preferredPublicUrl: "canonical",
    publicCitation:
      "FOX 5 New York, 'New York's nightlife mayor holds first event,' March 26, 2018.",
    publicNote:
      "Reporting on the nightlife director's inaugural public event at Secret Project Robot.",
    supportsGenerally: [
      "the March 26, 2018, public event",
      "bar owners, artists, promoters, and performers in the room",
      "commercial-rent, noise-complaint, and city-bureaucracy concerns",
      "Rafael Espinal sponsored the Office of Nightlife law"
    ],
    doesNotEstablish: [
      "NYC Artist Coalition solely created the Office of Nightlife",
      "Jamie's sole production credit",
      "a verified attendance count"
    ]
  },
  {
    id: ids.timeOut,
    title: "It's still illegal to dance in some parts of New York",
    organization: "Time Out New York",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-22",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.timeout.com/newyork/blog/its-still-illegal-to-dance-in-some-parts-of-new-york-032217",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Time Out New York, 'It's still illegal to dance in some parts of New York,' March 22, 2017.",
    publicNote:
      "Contemporaneous Cabaret Law issue context distributed through the Page.",
    supportsGenerally: [
      "Cabaret Law restrictions remained in force in March 2017",
      "dance and venue-regulation issue context",
      "a mission-relevant source distributed through the Page"
    ],
    doesNotEstablish: [
      "Jamie's authorship of the shared post",
      "coalition endorsement of every statement",
      "causation of the later repeal"
    ]
  }
];

export const nycacFacebookPostClaims: ClaimRecord[] = [
  {
    id: ids.operatingRecord,
    project: "nyc-artist-coalition",
    internalClaim:
      "Five annual Published exports preserve 444 unique owner rows, while the terminal feed preserves 445 distinct surviving identities; together the independently complete surfaces document NYC Artist Coalition campaign continuity and source routing from 2017 through 2021.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "A complete owner-export pass preserves 444 surviving Published records from 2017-2021, while a separately complete terminal-feed pass preserves 445 public-safe ledger rows with source-routing and shared-account authorship boundaries.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Retain as knowledge-bank depth until historical human stewardship can be attributed without absorbing collective work into Jamie's individual record."
      }
    ],
    evidence: [
      {
        sourceId: ids.corpus,
        relationship: "direct-support",
        supports: [
          "444 exported rows and unique native post IDs",
          "445 terminal-feed public ledger rows",
          "2017-2021 chronology",
          "67 off-Facebook routes"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.ownerExports,
        relationship: "private-support",
        supports: ["annual export denominators and aggregate controls"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means every row Meta returned through annual Published exports and every distinct identity exposed by the terminal feed, measured independently; no one-to-one row crosswalk is asserted, and neither surface proves every post ever created.",
      "Do not attribute every shared-account post to Jamie or another individual.",
      "Keep raw bodies, post IDs, comments, identities, authenticated routes, and sensitive exact routes outside the public repository."
    ],
    antiClaims: [
      "445 posts are every Facebook post NYC Artist Coalition ever created.",
      "Jamie authored every NYC Artist Coalition Facebook post.",
      "Current Page access proves historical authorship.",
      "The Page record proves policy impact."
    ],
    researchInquiryIds: [ids.populationInquiry, ids.authorshipInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.civicRelay,
    project: "nyc-artist-coalition",
    internalClaim:
      "The recovered shared Page functioned as collective civic communications infrastructure, routing cultural-space experience, public meetings, campaign actions, government interfaces, sources, practical resources, and policy developments across several advocacy arcs.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Across overlapping campaign arcs, the shared Page connected cultural-space concerns with public meetings, source articles, government interfaces, practical resources, and civic action routes.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "The collective operating pattern belongs in the bank, while Jamie-specific portfolio copy should continue to use stronger independently attributable evidence."
      }
    ],
    evidence: [
      {
        sourceId: ids.corpus,
        relationship: "direct-support",
        supports: [
          "overlapping mission patterns",
          "stakeholder-reference patterns",
          "65 published exact routes and two withheld sensitive routes",
          "nine governed source routes"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.grubStreet,
        relationship: "corroborating",
        supports: [
          "community support for Ode to Babel",
          "coalition and named-official protest of M.A.R.C.H. raids and transparency gaps"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.fox5,
        relationship: "context",
        supports: [
          "the first nightlife-director public event",
          "commercial-rent, noise, and bureaucracy concerns"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.timeOut,
        relationship: "context",
        supports: ["Cabaret Law restrictions and dance-freedom context"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is collective communications infrastructure, not Jamie's individually authored feed.",
      "Stakeholder references and source distribution do not establish incoming engagement, endorsement, partnership, mandate, or policy causation.",
      "Mission tags overlap and are not mutually exclusive campaign totals."
    ],
    antiClaims: [
      "Every referenced official engaged with NYC Artist Coalition.",
      "Source distribution proves stakeholder endorsement.",
      "The Facebook Page caused Cabaret Law repeal, Office of Nightlife creation, M.A.R.C.H. reform, or commercial-rent legislation.",
      "All linked articles are coverage of NYC Artist Coalition."
    ],
    researchInquiryIds: [ids.engagementInquiry, ids.sourceInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.metrics,
    project: "nyc-artist-coalition",
    internalClaim:
      "On July 15, 2026, the five annual owner exports displayed 2,589 reactions, 295 comments, 552 shares, a 48,044 sum of post-level reach, and 2,190 clicks across 444 Published records.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "A dated owner-export metric snapshot is preserved in the corpus but held from accomplishment messaging because aggregate row values do not identify unique people, stakeholder groups, endorsement, or impact.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
        rationale:
          "Preserve the measurement state without turning volatile platform aggregates into a public accomplishment claim."
      }
    ],
    evidence: [
      {
        sourceId: ids.corpus,
        relationship: "direct-support",
        supports: [
          "444-record metric denominator",
          "2,589 reactions",
          "295 comments",
          "552 shares",
          "48,044 summed post reach",
          "2,190 clicks"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.ownerExports,
        relationship: "private-support",
        supports: ["native row-level metric controls"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The values are capture-date platform metrics, not historical values fixed at publication time.",
      "Summed post reach is not a unique-person audience total.",
      "Aggregate metrics do not identify stakeholder groups or establish attendance, conversion, endorsement, mandate, or impact."
    ],
    antiClaims: [
      "48,044 unique people saw NYC Artist Coalition posts.",
      "3,436 unique people engaged.",
      "Council members produced the aggregate reactions, comments, shares, or clicks.",
      "The metric snapshot proves attendance, adoption, endorsement, or policy impact."
    ],
    researchInquiryIds: [ids.engagementInquiry],
    reviewedAt,
    reviewedBy
  }
];

export const nycacFacebookPostInquiries: ResearchInquiry[] = [
  {
    id: ids.populationInquiry,
    project: "nyc-artist-coalition",
    question:
      "What does the full available NYC Artist Coalition Facebook post population establish about project operation, source circulation, mission patterns, civic interfaces, traction, and Jamie's role?",
    methods: [
      "Verified authenticated Page-management access and current Published-post export controls.",
      "Reconciled five annual Meta Business Suite Published exports covering every year in the surviving chronology.",
      "Confirmed 444 exported rows and 444 unique native post IDs across 2017-2021.",
      "Reconciled all 445 distinct terminal Page-feed identities to public records after 153 duplicate or embedded render variants were excluded.",
      "Published a metadata-only corpus with one-way hashes, bounded classifications, public routes, and aggregate controls while withholding native source files and social-graph data."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The annual owner exports contain 444 rows and 444 unique post IDs spanning January 29, 2017, through September 15, 2021.",
      "The terminal feed traversal contains 445 distinct identities after 153 duplicate or embedded render variants are excluded from 598 encountered render rows.",
      "The feed and owner-export populations are complete independently; no one-to-one row crosswalk is asserted because Meta exposes no reproducible shared row key across the two surfaces.",
      "The corpus preserves 67 off-Facebook routes: 65 exact public-safe routes, two withheld sensitive routes, nine governed sources, and 56 inventory-only research routes.",
      "The record shows sustained collective routing across cultural-space survival, Cabaret Law repeal, M.A.R.C.H. accountability, nightlife governance, commercial rent, relief, and civic participation.",
      "The owner exports preserve a complete capture-date metric snapshot for the 444-row denominator, but aggregate values do not identify unique people or stakeholder groups."
    ],
    limitations: [
      "The owner exports do not prove that deleted, hidden, private, unpublished, or no-longer-retained posts never existed.",
      "The Page and exports do not identify the individual historical human publisher of every row.",
      "Page references to stakeholders do not establish incoming engagement, endorsement, partnership, mandate, or policy impact.",
      "Aggregate metrics are capture-date row values, not unique-person reach, attendance, conversion, endorsement, or impact."
    ],
    sourceIds: [ids.corpus, ids.protectedRun, ids.ownerExports, ids.page],
    publicSummary:
      "A complete annual Published-export pass preserves 444 surviving records, while a separately complete terminal-feed pass preserves 445 public-safe records and a 67-route source inventory; lifetime-history, cross-surface, shared-authorship, stakeholder-engagement, and metric-to-impact boundaries remain explicit.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001"
  },
  {
    id: ids.authorshipInquiry,
    project: "nyc-artist-coalition",
    question:
      "What can collaborator testimony or native publisher metadata establish about account creation, identity design, and period-specific Page stewardship?",
    methods: [
      "Preserved Jamie's recollection that he predominantly used the shared Page while believing other collaborators used it too.",
      "Reviewed annual owner-export fields and the shared Page interface for historical human-publisher metadata.",
      "Kept account creation, project identity, post drafting, Page publishing, moderation, and campaign leadership distinct."
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "Jamie's predominant-use recollection is a relevant participant-memory lead.",
      "Neither the owner exports nor the shared Page identify each historical human publisher.",
      "Current authenticated management access establishes present custody only."
    ],
    limitations: [
      "Participant memory is not a post-level authorship ledger.",
      "Collaborators may remember different periods or divisions of labor.",
      "No shared-account post is assigned to Jamie without direct or corroborating evidence."
    ],
    sourceIds: [ids.protectedRun, ids.ownerExports, ids.page],
    publicSummary:
      "Jamie's predominant-use memory is preserved as a research lead; historical human authorship remains unresolved."
  },
  {
    id: ids.engagementInquiry,
    project: "nyc-artist-coalition",
    question:
      "Can lawful, identity-complete records establish incoming engagement by Council members, agencies, cultural spaces, press, or other mission-relevant stakeholder groups?",
    methods: [
      "Classified Page-authored stakeholder references separately from incoming reactions, comments, and shares.",
      "Reviewed the available aggregate owner-export metrics for identity coverage.",
      "Required a known identity denominator before reporting stakeholder-group engagement counts."
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "Sixty-six rows reference Council or elected-official subjects, but those are outgoing references or issue interfaces.",
      "The captures do not expose an identity-complete reactor, commenter, or sharer population.",
      "No incoming stakeholder-group engagement count is promoted."
    ],
    limitations: [
      "Aggregate platform values do not identify stakeholder groups.",
      "A mention, route, source author, or Page reference is not incoming engagement or endorsement.",
      "Current interface state may omit historical identities or interactions."
    ],
    sourceIds: [ids.corpus, ids.ownerExports],
    publicSummary:
      "The Page repeatedly referenced civic and cultural stakeholders; incoming stakeholder-group engagement remains unmeasured."
  },
  {
    id: ids.sourceInquiry,
    project: "nyc-artist-coalition",
    question:
      "Which of the 56 inventory-only routes can be recovered, preserved, and decomposed into stronger source-backed claims?",
    methods: [
      "Normalized all 67 distinct off-Facebook routes recovered from the full population.",
      "Withheld two sensitive meeting or working-document routes.",
      "Mapped nine routes to governed sources and retained 56 as an explicit close-reading queue."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Nine routes now resolve to governed source records.",
      "Three newly governed articles document Ode to Babel and M.A.R.C.H., the first nightlife-director public event, and Cabaret Law context.",
      "Fifty-six routes remain available for preservation and proposition-level close reading."
    ],
    limitations: [
      "A posted source documents distribution, not authorship, endorsement, adoption, or causation.",
      "Not rechecked is distinct from dead, live, or historically nonexistent.",
      "Sensitive exact routes remain withheld even when their host class and role are recorded."
    ],
    sourceIds: [
      ids.corpus,
      ids.grubStreet,
      ids.fox5,
      ids.timeOut,
      ...existingGovernedSourceIds
    ],
    publicSummary:
      "Nine posted routes are governed sources, 56 remain an explicit preservation queue, and two sensitive exact routes stay withheld."
  }
];

export const nycacFacebookPostIntake: IntakeRecordInput[] = [
  {
    id: "INT-NYCAC-FACEBOOK-POSTS-2026",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "public-safe",
    title: "NYC Artist Coalition Facebook posts full-population archival pass",
    description:
      "Authenticated archival production over all 444 rows in five annual Published-post owner exports and all 445 distinct identities in a terminal Page-feed traversal, preserved as independently bounded owner controls and a metadata-only public feed corpus.",
    whyItMatters:
      "The record establishes the coalition's durable public communications and civic-relay system while preserving Jamie's stewardship memory, collective credit, source depth, and unresolved engagement questions without inflating them into individual authorship or policy impact.",
    projectIds: [
      "nyc-artist-coalition",
      "let-nyc-dance",
      "talks-not-raids",
      "save-nyc-spaces",
      "fair-rent-nyc"
    ],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Created three governed knowledge-bank claims and four inquiries; all Facebook-specific projections remain held because the collective record is strong while historical human authorship and stakeholder engagement remain unresolved.",
    sourceIds: nycacFacebookPostSources.map((source) => source.id),
    claimIds: [ids.operatingRecord, ids.civicRelay, ids.metrics],
    inquiryIds: [
      ids.populationInquiry,
      ids.authorshipInquiry,
      ids.engagementInquiry,
      ids.sourceInquiry
    ],
    artifactPaths: [
      "docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.json",
      "docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.manifest.json",
      "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md",
      "docs/knowledge-bank/runs/2026-07-15-nycac-facebook-posts-full-population.md"
    ],
    boundaries: [
      "One hundred percent means every row in the annual Published exports across the surviving chronology, not every post ever created.",
      "The shared account does not identify every historical human publisher.",
      "Stakeholder references are not incoming engagement or endorsement.",
      "Raw bodies, post IDs, comments, identities, authenticated routes, sensitive exact routes, and native exports remain protected.",
      "Aggregate platform metrics are not unique people, attendance, conversion, mandate, or impact."
    ]
  }
];
