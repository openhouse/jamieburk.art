import type {
  ClaimRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const intakeId = "INTAKE-NYCARTC-FULL-POPULATION-X-CENSUS-2026";

export const nycArtCSocialCensus = {
  account: "@NYCArtC",
  observedAt: "2026-07-14",
  observedProfileCount: 5124,
  recoveredPublicStatuses: 3367,
  unresolvedProfileCountSlots: 1757,
  dispositionTotal: 5124,
  itemRecoveryRate: 0.6571,
  relationshipCounts: { accountStatuses: 715, reposts: 2652 },
  recoveredDateRange: ["2017-02-03", "2026-05-18"],
  authoredCampaignHashtagFloors: {
    fairRentNYC: 191,
    saveNYCSpaces: 110,
    letNYCDance: 90,
    talksNotRaids: 56
  },
  repostNetwork: {
    olympiaKazi: 192,
    unitedForSmallBusinessNYC: 112,
    futureOfMusicCoalition: 109,
    streetVendorProject: 91,
    musicWorkersAlliance: 89
  },
  postedLinks: {
    occurrences: 1772,
    uniqueShortUrls: 1241,
    destinationLabelsVisible: 1204,
    shortUrlsResolved: 125,
    uniqueResolvedDestinations: 108
  },
  inboundSearch: {
    renderedRecords: 501,
    explicitAccountMentions: 347,
    searchOrThreadContextRecords: 154,
    explicitMentionAccounts: 107,
    explicitPartnerMentions: 205,
    explicitPartnerAccounts: 15,
    explicitCouncilMentions: 15,
    explicitCouncilAccounts: 3,
    explicitCityAgencyMentions: 2,
    explicitCityAgencyAccounts: 2
  },
  completenessStatement:
    "Every slot in the authenticated 5,124-item profile control has a public-safe disposition: 3,367 recovered records and 1,757 unresolved slots. This is complete accounting, not complete item recovery, a native X export, deletion history, or a representative sample of the unresolved population.",
  publicPostLedger: "docs/knowledge-bank/data/nycartc-public-post-ledger.json",
  publicEngagementLedger:
    "docs/knowledge-bank/data/nycartc-public-engagement-ledger.json"
} as const;

export const nycArtCSocialCensusIntake = [
  {
    id: intakeId,
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Authenticated archival-production pass on the full 5,124-slot @NYCArtC profile control, with redacted post and engagement ledgers, posted-link inventory, source close reading, campaign continuity, and bounded stakeholder analysis.",
    submittedBy: "Codex authenticated social-archive review",
    sourceUrl: "https://x.com/NYCArtC",
    entityIds: [
      "ENT-NYC-ARTIST-COALITION",
      "ENT-CABARET-LAW-REPEAL",
      "ENT-TALKS-NOT-RAIDS",
      "ENT-FAIR-RENT-NYC"
    ],
    disposition: "source-created",
    sourceIds: [
      "SRC-X-NYCARTC-FULL-POPULATION-CENSUS-2026",
      "SRC-X-NYCARTC-EXPLICIT-MENTION-SEARCH-2026",
      "SRC-GOTHAMIST-BOOK-CULTURE-RENT-2020",
      "SRC-GOTHAMIST-50A-REPEAL-2020",
      "SRC-GOTHAMIST-EXCLUDED-WORKERS-FUND-2021"
    ],
    claimIds: [
      "CLM-NYCARTC-SOCIAL-IDENTITY-CONTINUITY",
      "CLM-NYCARTC-FULL-SOCIAL-POPULATION-DISPOSITION",
      "CLM-NYCARTC-RECOVERED-AMPLIFICATION-NETWORK",
      "CLM-NYCARTC-POSTED-SOURCE-ROUTING",
      "CLM-NYCARTC-EXPLICIT-INBOUND-PATTERN"
    ],
    researchTaskIds: [
      "TASK-NYCARTC-FULL-POPULATION-DISPOSITION",
      "TASK-NYCARTC-UNRESOLVED-SLOT-RECOVERY"
    ],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const nycArtCSocialCensusSources = [
  {
    id: "SRC-X-NYCARTC-FULL-POPULATION-CENSUS-2026",
    title: "Authenticated NYC Artist Coalition full-population social census",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/NYCArtC",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated, read-only reconciliation of the @NYCArtC profile, Posts and Replies surfaces, and a bounded authored-status search, July 14, 2026.",
    publicNote:
      "The 5,124-slot ledger recovers 3,367 public records and retains 1,757 unresolved slots without inferred IDs, dates, types, text, themes, authors, or deletion reasons.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "complete disposition of the 5,124-slot profile control",
      "715 recovered account statuses and 2,652 recovered reposts",
      "recovered authored-status floors for four campaign hashtags",
      "bounded repost-source, theme, and posted-link findings"
    ],
    doesNotEstablish: [
      "complete item-level recovery or a native X export",
      "the identity or characteristics of 1,757 unresolved slots",
      "that the recovered 65.7 percent represents the unresolved population",
      "Jamie's authorship of any individual shared-account post",
      "audience reach, adoption, endorsement, policy causation, or impact"
    ]
  },
  {
    id: "SRC-X-NYCARTC-EXPLICIT-MENTION-SEARCH-2026",
    title: "Authenticated NYC Artist Coalition explicit-mention inventory",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://x.com/search?q=%40NYCArtC%20-from%3ANYCArtC&src=typed_query&f=live",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated, read-only Latest-search review for @NYCArtC excluding posts from the account, July 14, 2026.",
    publicNote:
      "Of 501 rendered records, 347 explicitly named @NYCArtC and came from 107 public accounts. The other 154 records were retained as search or thread context and excluded from explicit-mention counts.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "347 explicit account mentions from 107 public accounts",
      "205 explicit mentions from 15 named coalition, civic, or cultural partner accounts",
      "15 explicit mentions from three then-serving Council-member accounts",
      "two explicit mentions from two New York City agency accounts"
    ],
    doesNotEstablish: [
      "a complete lifetime mention or engagement history",
      "that search or thread-context records are direct interactions",
      "the individual author of a shared-account post",
      "partnership, endorsement, adoption, audience reach, or policy impact"
    ]
  },
  {
    id: "SRC-GOTHAMIST-BOOK-CULTURE-RENT-2020",
    title: "UWS Book Culture Seized By City Marshal Over Unpaid Rent",
    organization: "Gothamist",
    author: "Ben Yakas",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-01-08",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://gothamist.com/arts-entertainment/uws-book-culture-seized-city-marshal-over-unpaid-rent",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Ben Yakas, 'UWS Book Culture Seized By City Marshal Over Unpaid Rent,' Gothamist, January 8, 2020.",
    publicNote:
      "The coalition account routed this reporting while advocating commercial-tenancy stability. The article documents the reported closure and rent dispute; it is not coverage of NYC Artist Coalition or FairRentNYC.",
    intakeIds: [intakeId],
    supportsGenerally: ["public context for a commercial-rent source routed by @NYCArtC"],
    doesNotEstablish: [
      "press coverage or endorsement of NYC Artist Coalition or FairRentNYC",
      "a causal connection between coalition advocacy and the reported dispute",
      "Jamie's authorship of the account post"
    ]
  },
  {
    id: "SRC-GOTHAMIST-50A-REPEAL-2020",
    title:
      "New York State Legislature Votes To Repeal Law 50-A That Shields Police From Scrutiny",
    organization: "Gothamist",
    author: "Christopher Robbins",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-06-09",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://gothamist.com/news/new-york-state-legislature-votes-repeal-law-50-shields-police-scrunity",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Christopher Robbins, 'New York State Legislature Votes To Repeal Law 50-A That Shields Police From Scrutiny,' Gothamist, June 9, 2020.",
    publicNote:
      "The coalition account routed this reporting in a Talks Not Raids transparency context. The article documents the state legislative vote; it does not establish a MARCH-program outcome or coalition causation.",
    intakeIds: [intakeId],
    supportsGenerally: ["public context for a police-transparency source routed by @NYCArtC"],
    doesNotEstablish: [
      "that 50-A repeal ended or changed MARCH operations",
      "that NYC Artist Coalition caused the state legislative outcome",
      "Jamie's authorship of the account post"
    ]
  },
  {
    id: "SRC-GOTHAMIST-EXCLUDED-WORKERS-FUND-2021",
    title:
      "New York's Excluded Workers Fund Running Dry As State Stops Taking New Applications",
    organization: "Gothamist",
    author: "Sophia Chang",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2021-10-09",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://gothamist.com/news/new-yorks-excluded-workers-fund-running-dry-as-state-stops-taking-new-applications",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Sophia Chang, 'New York's Excluded Workers Fund Running Dry As State Stops Taking New Applications,' Gothamist, October 9, 2021.",
    publicNote:
      "The coalition account routed this reporting as a worker-resource and equity issue. The article documents reported fund demand and access constraints; it is not coverage of NYC Artist Coalition.",
    intakeIds: [intakeId],
    supportsGenerally: ["public context for an excluded-worker resource routed by @NYCArtC"],
    doesNotEstablish: [
      "press coverage or endorsement of NYC Artist Coalition",
      "that the account caused applications, benefits, or policy change",
      "Jamie's authorship of the account post"
    ]
  }
] satisfies SourceRecord[];

export const nycArtCSocialCensusReadings = [
  {
    id: "READ-X-NYCARTC-FULL-POPULATION-CENSUS-2026",
    sourceId: "SRC-X-NYCARTC-FULL-POPULATION-CENSUS-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-X-NYCARTC-FULL-POPULATION-DISPOSITION",
        text:
          "Every slot in the authenticated 5,124-item profile control has a disposition: 3,367 recovered public records and 1,757 unresolved slots.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-full-population-disposition"],
        confidence: "high",
        locator: "Population reconciliation"
      },
      {
        id: "PROP-X-NYCARTC-FOUR-CAMPAIGN-AUTHORED-FLOORS",
        text:
          "The recovered account-authored set includes at least 191 #FairRentNYC, 110 #SaveNYCSpaces, 90 #LetNYCDance, and 56 #TalksNotRaids statuses.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-four-social-campaign-streams"],
        confidence: "high",
        locator: "Recovered authored-status hashtag floors"
      },
      {
        id: "PROP-X-NYCARTC-RECOVERED-AMPLIFICATION-NETWORK",
        text:
          "The recovered corpus contains 2,652 reposts, including 192 from Olympia Kazi, 112 from United for Small Business NYC, 109 from Future of Music Coalition, 91 from Street Vendor Project, and 89 from Music Workers Alliance.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-recovered-amplification-network"],
        confidence: "high",
        locator: "Recovered repost-source inventory"
      },
      {
        id: "PROP-X-NYCARTC-POSTED-LINK-INVENTORY",
        text:
          "The recovered corpus contains 1,772 outbound-link occurrences across 1,241 unique shortened URLs; 1,204 expose destination labels, and 125 were resolved to 108 current destinations.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-posted-source-routing"],
        confidence: "high",
        locator: "Deduplicated posted-link inventory"
      }
    ],
    limitations: [
      "The recovered 65.7 percent is not assumed to represent the unresolved 34.3 percent.",
      "Repost-source counts document recovered amplification, not individual authorship, endorsement, partnership, audience reach, or impact.",
      "A posted link documents routing; it does not transfer the source's authorship or claims to the coalition."
    ],
    researchTaskIds: [
      "TASK-NYCARTC-FULL-POPULATION-DISPOSITION",
      "TASK-NYCARTC-UNRESOLVED-SLOT-RECOVERY"
    ]
  },
  {
    id: "READ-X-NYCARTC-EXPLICIT-MENTION-SEARCH-2026",
    sourceId: "SRC-X-NYCARTC-EXPLICIT-MENTION-SEARCH-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-X-NYCARTC-EXPLICIT-MENTION-FLOOR",
        text:
          "A recoverable Latest-search set contains 347 records from 107 public accounts that explicitly name @NYCArtC; 154 other rendered records are retained only as search or thread context.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-explicit-inbound-pattern"],
        confidence: "high",
        locator: "Explicit-mention versus context disposition"
      },
      {
        id: "PROP-X-NYCARTC-PARTNER-MENTION-FLOOR",
        text:
          "Within the explicit set, 205 records came from 15 named coalition, civic, or cultural partner accounts, including 84 from Olympia Kazi and 41 from Indie Theater Fund.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-explicit-partner-mention-floor"],
        confidence: "high",
        locator: "Explicit-mention stakeholder classification"
      },
      {
        id: "PROP-X-NYCARTC-EXPLICIT-OFFICIAL-MENTION-FLOOR",
        text:
          "The explicit set includes 15 records from three then-serving Council-member accounts and two records from two New York City agency accounts.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-explicit-official-mention-floor"],
        confidence: "high",
        locator: "Explicit-mention stakeholder classification"
      }
    ],
    limitations: [
      "The search result is a recoverable floor, not a complete lifetime engagement census.",
      "Search or thread-context records are not counted as explicit interactions.",
      "The separate roster-driven Council review remains the canonical minimum for direct Council-account engagement."
    ],
    researchTaskIds: []
  },
  ...[
    [
      "READ-GOTHAMIST-BOOK-CULTURE-RENT-2020",
      "SRC-GOTHAMIST-BOOK-CULTURE-RENT-2020",
      "PROP-GOTHAMIST-BOOK-CULTURE-CONTEXT",
      "Gothamist reported that Book Culture's Upper West Side location was seized by a city marshal amid a rent dispute.",
      "commercial-rent-source-context"
    ],
    [
      "READ-GOTHAMIST-50A-REPEAL-2020",
      "SRC-GOTHAMIST-50A-REPEAL-2020",
      "PROP-GOTHAMIST-50A-REPEAL-CONTEXT",
      "Gothamist reported that both houses of the New York State Legislature voted to repeal Civil Rights Law section 50-A.",
      "police-transparency-source-context"
    ],
    [
      "READ-GOTHAMIST-EXCLUDED-WORKERS-FUND-2021",
      "SRC-GOTHAMIST-EXCLUDED-WORKERS-FUND-2021",
      "PROP-GOTHAMIST-EXCLUDED-WORKERS-CONTEXT",
      "Gothamist reported strong demand and access constraints as New York's Excluded Workers Fund stopped accepting new applications.",
      "worker-resource-source-context"
    ]
  ].map(([id, sourceId, propositionId, text, supportTag]) => ({
    id,
    sourceId,
    status: "closely-read" as const,
    readAt: "2026-07-14",
    propositions: [
      {
        id: propositionId,
        text,
        relationToJamie: "project-context" as const,
        supportTags: [supportTag],
        confidence: "high" as const,
        locator: "Article"
      }
    ],
    limitations: [
      "The article supplies context for a source routed by @NYCArtC; it is not coverage or endorsement of the coalition and does not establish Jamie's authorship or causal role."
    ],
    researchTaskIds: []
  }))
] satisfies SourceReading[];

export const nycArtCSocialCensusClaims = [
  {
    id: "CLM-NYCARTC-FULL-SOCIAL-POPULATION-DISPOSITION",
    project: "nyc-artist-coalition",
    internalClaim:
      "The authenticated @NYCArtC archival pass gives all 5,124 profile-counted slots a disposition: 3,367 recovered public records and 1,757 unresolved slots retained without invented metadata.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["nycartc-full-population-disposition"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-FULL-POPULATION-CENSUS-2026",
        relationship: "direct-support",
        supports: ["complete disposition of the 5,124-slot profile control"],
        propositionIds: ["PROP-X-NYCARTC-FULL-POPULATION-DISPOSITION"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means 100 percent disposition coverage, not 100 percent item recovery.",
      "The 3,367 recovered records span 2017 through 2026; the 1,757 unresolved slots receive no inferred attributes."
    ],
    antiClaims: [
      "The ledger is a complete X export or deletion history.",
      "All 5,124 historical items were recovered.",
      "The recovered corpus is representative of the unresolved slots."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-NYCARTC-RECOVERED-AMPLIFICATION-NETWORK",
    project: "nyc-artist-coalition",
    internalClaim:
      "Within the recovered corpus, @NYCArtC amplified a durable network of organizers, cultural workers, tenant and small-business advocates, labor groups, and public institutions through 2,652 reposts.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["nycartc-recovered-amplification-network"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-FULL-POPULATION-CENSUS-2026",
        relationship: "direct-support",
        supports: ["bounded recovered repost-source network"],
        propositionIds: ["PROP-X-NYCARTC-RECOVERED-AMPLIFICATION-NETWORK"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The finding describes the recovered corpus only and is not extrapolated to unresolved slots.",
      "Reposts preserve the source account's voice and authorship."
    ],
    antiClaims: [
      "Every amplified account endorsed NYC Artist Coalition.",
      "Jamie authored the reposted material or selected every repost.",
      "Repost counts prove partnership, audience reach, adoption, or impact."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-NYCARTC-POSTED-SOURCE-ROUTING",
    project: "nyc-artist-coalition",
    internalClaim:
      "The recovered @NYCArtC corpus routes 1,772 outbound-link occurrences across 1,241 unique shortened URLs, connecting campaign communication with reporting, official resources, events, actions, and coalition-owned project surfaces.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: [
      "nycartc-posted-source-routing",
      "commercial-rent-source-context",
      "police-transparency-source-context",
      "worker-resource-source-context"
    ],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-FULL-POPULATION-CENSUS-2026",
        relationship: "direct-support",
        supports: ["bounded posted-link inventory"],
        propositionIds: ["PROP-X-NYCARTC-POSTED-LINK-INVENTORY"],
        confidence: "high",
        renderCitation: false
      },
      ...[
        ["SRC-GOTHAMIST-BOOK-CULTURE-RENT-2020", "PROP-GOTHAMIST-BOOK-CULTURE-CONTEXT"],
        ["SRC-GOTHAMIST-50A-REPEAL-2020", "PROP-GOTHAMIST-50A-REPEAL-CONTEXT"],
        ["SRC-GOTHAMIST-EXCLUDED-WORKERS-FUND-2021", "PROP-GOTHAMIST-EXCLUDED-WORKERS-CONTEXT"]
      ].map(([sourceId, propositionId]) => ({
        sourceId,
        relationship: "context" as const,
        supports: ["one mission-relevant source routed by the account"],
        propositionIds: [propositionId],
        confidence: "high" as const,
        renderCitation: false
      }))
    ],
    boundaries: [
      "Link inventory records what the recovered account routed, not whether a reader opened or acted on a link.",
      "The linked authors and organizations retain authorship; routing is not endorsement or coverage of the coalition."
    ],
    antiClaims: [
      "NYC Artist Coalition authored the linked journalism or official resources.",
      "Every linked source endorsed the coalition.",
      "Posted URLs prove click-through, conversion, adoption, or policy impact."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex source review"]
  },
  {
    id: "CLM-NYCARTC-EXPLICIT-INBOUND-PATTERN",
    project: "nyc-artist-coalition",
    internalClaim:
      "A bounded authenticated Latest-search set recovered 347 explicit @NYCArtC mentions from 107 public accounts, including sustained use by coalition, cultural, labor, tenant, small-business, Council, and city-agency accounts.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: [
      "nycartc-explicit-inbound-pattern",
      "nycartc-explicit-partner-mention-floor",
      "nycartc-explicit-official-mention-floor"
    ],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-EXPLICIT-MENTION-SEARCH-2026",
        relationship: "direct-support",
        supports: ["bounded explicit-mention and stakeholder-account floors"],
        propositionIds: [
          "PROP-X-NYCARTC-EXPLICIT-MENTION-FLOOR",
          "PROP-X-NYCARTC-PARTNER-MENTION-FLOOR",
          "PROP-X-NYCARTC-EXPLICIT-OFFICIAL-MENTION-FLOOR"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The result is a recoverable search floor, not a complete lifetime engagement census.",
      "Only records explicitly naming @NYCArtC enter the counts; 154 search or thread-context records remain excluded."
    ],
    antiClaims: [
      "All 501 rendered records are direct interactions.",
      "Explicit mentions prove endorsement, partnership, adoption, or policy impact.",
      "The account's current search index is a complete historical analytics record."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  }
] satisfies ClaimRecord[];

export const nycArtCSocialCensusResearchTasks = [
  {
    id: "TASK-NYCARTC-FULL-POPULATION-DISPOSITION",
    project: "nyc-artist-coalition",
    question:
      "Can every slot in the current @NYCArtC profile control receive an explicit, public-safe archival disposition without overstating recovery, authorship, engagement, or impact?",
    status: "resolved",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: [
      "SRC-X-NYCARTC-FULL-POPULATION-CENSUS-2026",
      "SRC-X-NYCARTC-EXPLICIT-MENTION-SEARCH-2026"
    ],
    claimIds: [
      "CLM-NYCARTC-FULL-SOCIAL-POPULATION-DISPOSITION",
      "CLM-NYCARTC-RECOVERED-AMPLIFICATION-NETWORK",
      "CLM-NYCARTC-POSTED-SOURCE-ROUTING",
      "CLM-NYCARTC-EXPLICIT-INBOUND-PATTERN"
    ],
    nextActions: [
      "Re-run and diff the redacted ledgers if the displayed profile count or recovered routes change.",
      "Keep all public composition deferred until a separate Chad-lens review selects a claim for a specific audience and purpose."
    ],
    resolutionSummary:
      "Created 5,124 public-safe profile dispositions, recovered 3,367 records, preserved 1,757 unresolved slots without inference, separated explicit inbound mentions from context, inventoried posted links, and integrated bounded lifecycle claims."
  },
  {
    id: "TASK-NYCARTC-UNRESOLVED-SLOT-RECOVERY",
    project: "nyc-artist-coalition",
    question:
      "Can an authorized account export or equivalent complete archive replace the 1,757 unresolved profile-count slots and test recovery bias?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: ["SRC-X-NYCARTC-FULL-POPULATION-CENSUS-2026"],
    claimIds: ["CLM-NYCARTC-FULL-SOCIAL-POPULATION-DISPOSITION"],
    nextActions: [
      "Request or generate an authorized X account export if available.",
      "Reconcile export status IDs against content digests and unresolved ledger positions without committing protected export contents."
    ]
  }
] satisfies ResearchTask[];

export const nycArtCSocialCensusDecisions = [
  {
    id: "DEC-DEFER-NYCARTC-FULL-SOCIAL-POPULATION",
    claimId: "CLM-NYCARTC-FULL-SOCIAL-POPULATION-DISPOSITION",
    surface: "/work/fair-rent-nyc",
    decision: "defer",
    rationale:
      "Keep population-accounting evidence in the knowledge bank; it is methodological proof rather than the clearest hiring-facing account of Jamie's role or an audience outcome.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-NYCARTC-AMPLIFICATION-NETWORK",
    claimId: "CLM-NYCARTC-RECOVERED-AMPLIFICATION-NETWORK",
    surface: "/work/fair-rent-nyc",
    decision: "defer",
    rationale:
      "Preserve the network pattern for future composition without crowding the current case study or converting collective amplification into individual credit.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-NYCARTC-POSTED-SOURCE-ROUTING",
    claimId: "CLM-NYCARTC-POSTED-SOURCE-ROUTING",
    surface: "/work/fair-rent-nyc",
    decision: "defer",
    rationale:
      "The source-routing inventory deepens the knowledge bank, but the live case study should use only selected sources attached to a direct role, usable result, and audience need.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-NYCARTC-EXPLICIT-INBOUND-PATTERN",
    claimId: "CLM-NYCARTC-EXPLICIT-INBOUND-PATTERN",
    surface: "/work/fair-rent-nyc",
    decision: "defer",
    rationale:
      "Retain the bounded stakeholder pattern as reserve evidence while the existing five-member Council claim remains the more specific and manually reviewed public-ready interaction claim.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  }
] satisfies ProjectionDecision[];
