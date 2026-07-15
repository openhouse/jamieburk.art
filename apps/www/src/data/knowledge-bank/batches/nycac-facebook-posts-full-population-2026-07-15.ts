import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated Facebook archival review"
];

const ids = {
  corpus: "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15",
  protectedRun: "SRC-NYCAC-FACEBOOK-POST-OWNER-RESEARCH-2026-07-15",
  page: "SRC-NYCAC-FACEBOOK-PAGE-2026-07-15",
  grubStreet: "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22",
  fox5: "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26",
  timeOut: "SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22",
  operatingRecord: "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
  civicRelay: "CLM-NYCAC-FACEBOOK-CIVIC-RELAY",
  metrics: "CLM-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
  inquiry: "INQ-NYCAC-FACEBOOK-POST-POPULATION-2026"
} as const;

const existingGovernedSourceIds = [
  "SRC-NAC-PRESS-GOTHAMIST-90461705",
  "SRC-NAC-PRESS-BEDFORD-BOWERY-54B05663",
  "SRC-NAC-PRESS-NEW-YORK-TIMES-FB34B44C",
  "SRC-NAC-NPR-NIGHTLIFE-2017",
  "SRC-NAC-PRESS-THE-NEW-YORKER-1F1F4EF1",
  "SRC-NAC-PRESS-WNYC-11FD1556"
] as const;

export const nycacFacebookPostsFullPopulationBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
} = {
  intake: [
    {
      id: "INT-NYCAC-FACEBOOK-POST-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: reviewedAt,
      capturedFrom:
        "Authenticated NYC Artist Coalition Page, annual Meta Business Suite Published exports, and protected archival captures",
      publicSafeSummary:
        "A public-safe 444-row inventory of every record in the Page's annual Published exports for 2017-2021, reconciled against the terminal surviving feed and developed into bounded source, mission, civic-interface, and traction findings.",
      projects: [
        "nyc-artist-coalition",
        "let-nyc-dance",
        "save-nyc-spaces",
        "talks-not-raids",
        "fair-rent-nyc"
      ],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        ids.corpus,
        ids.protectedRun,
        ids.page,
        ids.grubStreet,
        ids.fox5,
        ids.timeOut,
        ...existingGovernedSourceIds
      ],
      claimIds: [ids.operatingRecord, ids.civicRelay, ids.metrics],
      researchTaskIds: [
        "TASK-NYCAC-FACEBOOK-HUMAN-AUTHORSHIP",
        "TASK-NYCAC-FACEBOOK-STAKEHOLDER-ENGAGEMENT",
        "TASK-NYCAC-FACEBOOK-SOURCE-PRESERVATION",
        "TASK-NYCAC-FACEBOOK-EXPORT-VERSIONING"
      ],
      notes: [
        "The annual owner exports contain 444 rows and 444 unique post IDs across every year in the surviving 2017-2021 chronology.",
        "One hundred percent means every row Meta returned through those annual Published exports, not every post ever created or deleted-post recovery.",
        "The terminal feed traversal independently reconciled to 444 posts after 154 duplicate or embedded render variants were excluded from 598 encountered rows.",
        "The shared Page does not identify the historical human publisher of each row; Jamie's predominant-use memory remains a research lead, not settled attribution.",
        "Raw exports, post bodies, post IDs, comments, social-graph identities, authenticated routes, and sensitive exact routes remain outside the public repository."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  sources: [
    {
      id: ids.corpus,
      title: "NYC Artist Coalition Facebook posts full-population public-safe corpus",
      organization: "Jamie Burkart portfolio knowledge bank",
      author: "Codex authenticated archival review",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://github.com/openhouse/jamieburk.art/blob/998d25b5fc64e4b781da52590cf54a142ddf4274/docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.json",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition Facebook posts full-population public-safe corpus, July 15, 2026.",
      publicNote:
        "A 444-row ledger of dates, one-way reconciliation hashes, source-route keys, overlapping mission and stakeholder-reference classifications, and bounded feed metrics, plus aggregate owner-export controls. Raw bodies, post IDs, comments, identities, authenticated routes, and sensitive exact routes are excluded.",
      supportsGenerally: [
        "444 annual Published-export rows and 444 unique post IDs",
        "a 2017-01-29 through 2021-09-15 chronology",
        "444 public ledger rows with unique one-way reconciliation hashes",
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
      title:
        "Authenticated NYC Artist Coalition Facebook owner-export and feed research run",
      author: "Codex authenticated archival review",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation:
        "Authenticated archival-production pass over the NYC Artist Coalition Facebook Page and annual Published exports, July 15, 2026.",
      publicNote:
        "Protected materials retain five annual CSV exports, raw post bodies, post and Page IDs, permalinks, metrics, and traversal evidence for verification; those fields are not published.",
      protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001",
      supportsGenerally: [
        "five annual owner-export denominators",
        "444 unique exported post IDs",
        "terminal Page-feed traversal",
        "cross-surface reconciliation",
        "source extraction and thematic close reading"
      ],
      doesNotEstablish: [
        "permission to publish protected exports or captures",
        "deleted, hidden, private, unpublished, or no-longer-retained history",
        "the individual human publisher of each shared-account post",
        "stakeholder identity behind aggregate metrics"
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
        "NYC Artist Coalition Facebook Page, accessed July 15, 2026.",
      publicNote:
        "The authenticated view confirmed current Page-management access, the Page identity, and the capture-date feed and export surfaces.",
      supportsGenerally: [
        "public Page identity",
        "current authenticated management access",
        "capture-date Page and management surfaces"
      ],
      doesNotEstablish: [
        "historical post-level human authorship",
        "complete deleted-post history",
        "the identity of historical readers or engagers",
        "historical audience size from a current follower display"
      ]
    },
    {
      id: ids.grubStreet,
      title:
        "Gentrification Threatened Their Bar - Black Neighbors Refused to Let That Happen",
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
        "the complete coalition division of labor",
        "a general attendance or impact total"
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
        "the March 26, 2018 public event",
        "Secret Project Robot as venue",
        "bar owners, artists, promoters, and performers in the room",
        "commercial-rent, noise-complaint, and city-bureaucracy concerns",
        "Rafael Espinal sponsored the Office of Nightlife law"
      ],
      doesNotEstablish: [
        "NYC Artist Coalition solely created the Office of Nightlife",
        "Jamie's sole production credit",
        "a verified attendance count",
        "resolution of every concern raised"
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
        "coverage of Jamie",
        "Jamie's authorship of the Facebook post",
        "sole coalition causation",
        "the later repeal outcome"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-NYCAC-FACEBOOK-OWNER-EXPORT-POPULATION-2026",
      sourceId: ids.corpus,
      project: "nyc-artist-coalition",
      assertion:
        "Five annual Meta Business Suite Published exports contain 444 rows and 444 unique post IDs across every year in the surviving 2017-2021 chronology.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.operatingRecord],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-POPULATION-BOUNDARY-2026",
      sourceId: ids.protectedRun,
      project: "nyc-artist-coalition",
      assertion:
        "Complete means every row returned by the annual Published exports and reconciled against the terminal surviving feed; deleted, hidden, private, unpublished, or no-longer-retained posts may remain outside both surfaces.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.operatingRecord],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-MISSION-CONTINUITY-2026",
      sourceId: ids.corpus,
      project: "nyc-artist-coalition",
      assertion:
        "Overlapping record-level classifications preserve 191 cultural-space survival rows, 76 Cabaret Law rows, 65 M.A.R.C.H. accountability rows, 48 commercial-rent rows, 30 relief rows, 29 nightlife-governance rows, and 18 cultural-policy rows.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.operatingRecord, ids.civicRelay],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-STAKEHOLDER-INTERFACES-2026",
      sourceId: ids.corpus,
      project: "nyc-artist-coalition",
      assertion:
        "Overlapping post classifications connect 256 rows to artists, spaces, or organizers; 66 to Council or elected-official subjects; 66 to regulatory agencies; 35 to published media; 33 to nightlife-governance subjects; and 15 to cultural-policy agencies.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.civicRelay],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-STAKEHOLDER-BOUNDARY-2026",
      sourceId: ids.protectedRun,
      project: "nyc-artist-coalition",
      assertion:
        "Stakeholder tags and named-account counts describe Page-authored references, tags, routes, and issue interfaces, not incoming engagement, endorsement, formal partnership, mandate, or policy impact.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.civicRelay, ids.metrics],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-POSTED-URL-INVENTORY-2026",
      sourceId: ids.corpus,
      project: "nyc-artist-coalition",
      assertion:
        "The corpus preserves 67 distinct cleaned off-Facebook routes: 65 exact public-safe routes, two withheld sensitive routes, nine governed source routes, and 56 inventory-only research routes.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.operatingRecord, ids.civicRelay],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-NATIVE-METRICS-2026",
      sourceId: ids.corpus,
      project: "nyc-artist-coalition",
      assertion:
        "The owner exports display 2,589 reactions, 295 comments, 552 shares, a 48,044 sum of row-level reach, and 2,190 clicks across 444 posts on July 15, 2026.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.metrics],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-NATIVE-METRIC-BOUNDARY-2026",
      sourceId: ids.protectedRun,
      project: "nyc-artist-coalition",
      assertion:
        "Summed post reach is not unique people, and aggregate metrics do not establish attendance, stakeholder identity, conversion, endorsement, mandate, or impact.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.metrics],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-AUTHORSHIP-BOUNDARY-2026",
      sourceId: ids.protectedRun,
      project: "nyc-artist-coalition",
      assertion:
        "Jamie remembers predominantly using the shared Page while believing others also used it; neither current custody nor the exports identify the individual historical publisher of every post.",
      relationship: "raises-question",
      confidence: "moderate",
      candidateClaimIds: [ids.operatingRecord, ids.civicRelay],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019",
      sourceId: ids.grubStreet,
      project: "talks-not-raids",
      assertion:
        "Grub Street reported community support for Ode to Babel and identified NYC Artist Coalition and named Council members among those protesting M.A.R.C.H. raids and transparency gaps.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: [ids.civicRelay],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-2018",
      sourceId: ids.fox5,
      project: "save-nyc-spaces",
      assertion:
        "FOX 5 reported that the nightlife director's first public event convened cultural and nightlife stakeholders at Secret Project Robot around rent, noise, and bureaucracy concerns.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [ids.civicRelay],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017",
      sourceId: ids.timeOut,
      project: "let-nyc-dance",
      assertion:
        "Time Out documented continuing Cabaret Law restrictions in March 2017; Page circulation establishes issue routing, not Jamie's authorship or the later repeal outcome.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [ids.civicRelay],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    }
  ],
  claims: [
    {
      id: ids.operatingRecord,
      project: "nyc-artist-coalition",
      internalClaim:
        "The annual Published exports and terminal feed preserve a 444-post public operating record of NYC Artist Coalition's campaign continuity and source routing from 2017 through 2021.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "A complete owner-export pass preserves 444 surviving Published records from 2017-2021, reconciled against the Page feed with public-safe source routing and shared-account authorship boundaries.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: ids.corpus,
          relationship: "direct-support",
          supports: [
            "444 exported rows and unique post IDs",
            "444 public ledger rows",
            "2017-2021 chronology",
            "67 off-Facebook routes"
          ],
          locator:
            "populationReconciliation; ownerExportReconciliation; population; postedUrlInventory",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: ids.protectedRun,
          relationship: "supports-boundary",
          supports: [
            "authenticated export method",
            "feed reconciliation",
            "population and privacy boundaries"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete means every row Meta returned through annual Published exports across the surviving chronology, not every post ever created.",
        "Do not attribute every shared-account post to Jamie or another individual.",
        "Keep raw bodies, post IDs, comments, identities, authenticated routes, and sensitive exact routes outside the public repository."
      ],
      antiClaims: [
        "444 posts are every Facebook post NYC Artist Coalition ever created",
        "Jamie authored every NYC Artist Coalition Facebook post",
        "current Page access proves historical authorship",
        "the Page record proves policy impact"
      ],
      researchInquiryIds: [ids.inquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.civicRelay,
      project: "nyc-artist-coalition",
      internalClaim:
        "The recovered Page functioned as collective civic communications infrastructure, repeatedly routing cultural-space experience, campaign actions, government interfaces, public meetings, source articles, practical resources, and policy developments across multiple advocacy arcs.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Across overlapping campaign arcs, the shared Page connected cultural-space concerns with public meetings, source articles, government interfaces, practical resources, and civic action routes.",
          status: "hold",
          citationRequired: true,
          surfaces: []
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
          locator: "missionSummary; stakeholderSummary; postedUrlSummary",
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
        }
      ],
      boundaries: [
        "This is collective communications infrastructure, not Jamie's individually authored feed.",
        "Stakeholder references and source distribution do not establish incoming engagement, endorsement, partnership, mandate, or policy causation.",
        "Mission tags overlap and are not mutually exclusive campaign totals."
      ],
      antiClaims: [
        "every referenced official engaged with NYC Artist Coalition",
        "source distribution proves stakeholder endorsement",
        "the Facebook Page caused Cabaret Law repeal, Office of Nightlife creation, M.A.R.C.H. reform, or commercial-rent legislation",
        "all linked articles are coverage of NYC Artist Coalition"
      ],
      researchInquiryIds: [ids.inquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.metrics,
      project: "nyc-artist-coalition",
      internalClaim:
        "On July 15, 2026, Meta's annual owner exports displayed 2,589 reactions, 295 comments, 552 shares, a 48,044 sum of post-level reach, and 2,190 clicks across 444 Published records.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "A dated owner-export metric snapshot is preserved in the corpus but held from accomplishment messaging because aggregate row values do not identify unique people, stakeholder groups, endorsement, or impact.",
          status: "hold",
          citationRequired: true,
          surfaces: []
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
          locator: "ownerExportReconciliation.metricSnapshot",
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
        "48,044 unique people saw NYC Artist Coalition posts",
        "3,436 unique people engaged",
        "Council members produced the aggregate reactions, comments, shares, or clicks",
        "the metric snapshot proves attendance, adoption, endorsement, or policy impact"
      ],
      researchInquiryIds: [ids.inquiry],
      reviewedAt,
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-NYCAC-FACEBOOK-HUMAN-AUTHORSHIP",
      project: "nyc-artist-coalition",
      question:
        "What can collaborator testimony or native publisher metadata establish about account creation, identity design, and period-specific Page stewardship?",
      priority: "high",
      status: "in-progress",
      methodsPlanned: [
        "Invite Olympia Kazi and other collaborators to confirm, refine, or contest Jamie's predominant-use memory",
        "Search owner data for human-publisher metadata without publishing private identities",
        "Keep account creation, project identity, post drafting, Page publishing, and campaign leadership distinct"
      ],
      successCriteria: [
        "Name only roles supported by at least one direct or corroborating source",
        "Preserve collaborator and coalition credit",
        "Do not assign every shared-account post to Jamie"
      ],
      sourceIds: [ids.protectedRun, ids.page],
      claimIds: [ids.operatingRecord, ids.civicRelay],
      publicSummary:
        "Jamie's predominant-use memory is preserved as a research lead; historical human authorship remains unresolved.",
      reviewedAt
    },
    {
      id: "TASK-NYCAC-FACEBOOK-STAKEHOLDER-ENGAGEMENT",
      project: "nyc-artist-coalition",
      question:
        "Can lawful, identity-complete records establish incoming engagement by Council members, agencies, cultural spaces, press, or other mission-relevant stakeholder groups?",
      priority: "high",
      status: "queued",
      methodsPlanned: [
        "Acquire an owner-authorized reaction, comment, and share export if Meta exposes one",
        "Define a complete identity denominator and classification protocol before reporting group counts",
        "Keep Page references, account tags, reactions, comments, shares, formal participation, endorsement, and policy action distinct"
      ],
      successCriteria: [
        "Report stakeholder engagement only from a denominator with known coverage",
        "Keep personal identities and comment text outside the public repository",
        "Publish no endorsement or causation inference from a platform interaction"
      ],
      sourceIds: [ids.corpus, ids.protectedRun],
      claimIds: [ids.civicRelay, ids.metrics],
      publicSummary:
        "The Page repeatedly referenced civic and cultural stakeholders; incoming stakeholder-group engagement remains unmeasured.",
      reviewedAt
    },
    {
      id: "TASK-NYCAC-FACEBOOK-SOURCE-PRESERVATION",
      project: "nyc-artist-coalition",
      question:
        "Which of the 56 inventory-only routes can be recovered, preserved, and decomposed into stronger source-backed claims?",
      priority: "high",
      status: "in-progress",
      methodsPlanned: [
        "Resolve each route or a stable archive",
        "Record author, organization, date, source type, evidence role, and preservation state",
        "Promote only propositions the linked source itself establishes"
      ],
      successCriteria: [
        "Disposition every inventory-only route",
        "Keep distribution separate from authorship, endorsement, and coverage",
        "Preserve not recovered as distinct from did not exist"
      ],
      sourceIds: [ids.corpus, ids.grubStreet, ids.fox5, ids.timeOut],
      claimIds: [ids.operatingRecord, ids.civicRelay],
      publicSummary:
        "Nine posted routes are governed sources, 56 remain an explicit preservation queue, and two sensitive exact routes stay withheld.",
      reviewedAt
    },
    {
      id: "TASK-NYCAC-FACEBOOK-EXPORT-VERSIONING",
      project: "nyc-artist-coalition",
      question:
        "How does the available Published population and its metric state change across future owner-export snapshots?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Repeat the annual Published export on a dated cadence",
        "Compare hashed post-ID sets, annual counts, visibility states, and aggregate metrics",
        "Record platform-retention or deletion changes as versioned corrections"
      ],
      successCriteria: [
        "Detect denominator or metric drift without silently overwriting the July 2026 snapshot",
        "Keep raw exports protected",
        "Document corrections through the knowledge-bank lifecycle"
      ],
      sourceIds: [ids.corpus, ids.protectedRun],
      claimIds: [ids.operatingRecord, ids.metrics],
      publicSummary:
        "The July 2026 owner exports form a versioned control for future platform and metric drift.",
      reviewedAt
    }
  ],
  researchInquiries: [
    {
      id: ids.inquiry,
      project: "nyc-artist-coalition",
      question:
        "What does the full available NYC Artist Coalition Facebook post population establish about project operation, source circulation, mission patterns, civic interfaces, traction, and Jamie's role?",
      methods: [
        "Verified authenticated Page-management access.",
        "Generated annual Meta Business Suite Published exports for every year in the surviving chronology using Lifetime data view, Post content level, and Creation date filter.",
        "Confirmed 444 exported rows and 444 unique post IDs across 2017-2021.",
        "Repeatedly traversed the public Page feed to a stable terminal endpoint and reconciled duplicate or embedded render variants.",
        "Published a metadata-only corpus with one-way hashes, bounded classifications, public routes, and aggregate metrics while withholding raw exports and social-graph data.",
        "Separated stakeholder references from incoming engagement and shared-account custody from human authorship.",
        "Close-read three newly governed articles and retained 56 posted routes as an explicit research queue."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The annual owner exports contain 444 rows and 444 unique post IDs spanning January 29, 2017 through September 15, 2021.",
        "The terminal Page-feed traversal reconciles to the same 444-row denominator after duplicate and embedded render variants are excluded.",
        "The public-safe corpus preserves 67 distinct off-Facebook routes, including nine governed sources and 56 inventory-only research routes; two sensitive exact routes remain withheld.",
        "The record shows sustained collective routing across cultural-space survival, Cabaret Law repeal, M.A.R.C.H. accountability, nightlife governance, commercial rent, relief, and civic participation.",
        "The owner exports preserve a complete capture-date metric snapshot for the 444-row denominator, but aggregate values do not identify unique people or stakeholder groups.",
        "Jamie remembers predominantly using the Page while believing others also used it; post-level human authorship remains unresolved."
      ],
      limitations: [
        "The owner exports do not prove that deleted, hidden, private, unpublished, or no-longer-retained posts never existed.",
        "The Page and exports do not identify the individual historical human publisher of every row.",
        "Page references to stakeholders do not establish incoming engagement, endorsement, partnership, mandate, or policy impact.",
        "Aggregate metrics are capture-date row values, not unique-person reach, attendance, conversion, endorsement, or impact.",
        "Fifty-six public routes still require close reading and preservation."
      ],
      sourceIds: [
        ids.corpus,
        ids.protectedRun,
        ids.page,
        ids.grubStreet,
        ids.fox5,
        ids.timeOut,
        ...existingGovernedSourceIds
      ],
      publicSummary:
        "A complete annual Published-export pass preserves 444 surviving records and a 67-route source inventory while keeping lifetime-history, shared authorship, stakeholder engagement, and metric-to-impact boundaries explicit.",
      protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001"
    }
  ]
};
