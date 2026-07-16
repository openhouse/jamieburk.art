import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const wowlistPopulationAudit = {
  profileCountObserved: 38,
  postsTabItemsRecovered: 37,
  repliesTabItemsRecovered: 38,
  accountPostsRecovered: 16,
  accountRepliesRecovered: 6,
  accountAuthoredStatusesRecovered: 22,
  repostsRecovered: 16,
  distinctRepostSourceAccounts: 13,
  uniqueItemsRecovered: 38,
  unresolvedPopulationSlots: 0,
  dispositionTotal: 38,
  ledgerPath: "docs/knowledge-bank/data/wowlist-public-post-ledger.json"
} as const;

export const wowlistCorpusFindings = {
  directProductSupportReplies: 6,
  eventDistributionPosts: 5,
  sceneKnowledgePosts: 3,
  productCommunityInfrastructurePosts: 3,
  civicCareAuthoredPosts: 5,
  civicCareReposts: 5,
  platformUseAndEventAmplificationReposts: 5,
  communitySceneContextRecords: 6,
  shortUrlOccurrences: 35,
  uniqueResolvedDestinations: 34
} as const;

const supportPost = (
  id: string,
  title: string,
  statusId: string,
  publishedAt: string,
  publicCitation: string,
  supportsGenerally: string[]
): SourceRecord => ({
  id,
  title,
  organization: "WOWList",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-14",
  canonicalUrl: `https://x.com/wowlist/status/${statusId}`,
  preferredPublicUrl: "canonical",
  publicCitation,
  supportsGenerally,
  doesNotEstablish: [
    "the individual teammate who authored the shared-account post",
    "the platform's total support workload",
    "platform-wide adoption, audience reach, satisfaction, or impact"
  ]
});

export const wowlistSocialCorpusIntake = [
  {
    id: "LEAD-WOWLIST-FULL-POPULATION-CORPUS-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for @wowlist",
    summary:
      "Recover and disposition every item in the 38-post live-profile control, resolve its public outbound URLs, and mature bounded claims about product support, event distribution, scene knowledge, public care, and account stewardship.",
    sourceUrl: "https://x.com/wowlist",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["wowlist", "career-proof-system"],
    sourceIds: [
      "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      "SRC-X-WOWLIST-SUPPORT-FEED-SCOPE-2015",
      "SRC-X-WOWLIST-SUPPORT-PROFILE-2015",
      "SRC-X-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
      "SRC-X-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
      "SRC-X-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
      "SRC-X-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016",
      "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
      "SRC-GOOD-TIMES-ZINES-2-2015",
      "SRC-KQED-GHOST-SHIP-VIGIL-2016",
      "SRC-MEOW-WOLF-DIY-FUND-2016"
    ],
    claimIds: [
      "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION",
      "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
      "CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
      "CLM-WOWLIST-CIVIC-CARE-CONTINUITY"
    ],
    inquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    notes: [
      "All 38 items in the July 14, 2026 live-profile control were recovered at item level: 16 account posts, six account replies, and 16 reposts from 13 public accounts.",
      "This is complete recovery of the surviving profile population, not a platform export or proof that no older item was deleted before capture.",
      "The public ledger stores summaries and metadata rather than reproducing full third-party repost text.",
      "Visible reaction counts are mutable July 2026 observations, not historical analytics, unique people, adoption, service outcomes, or impact.",
      "No authentication, session, private-message, or account-analytics material entered the repository."
    ]
  }
] satisfies IntakeRecord[];

export const wowlistSocialCorpusSources = [
  {
    id: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
    title: "Authenticated @wowlist full-population recovery and public-post ledger",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/wowlist",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated read-only review of the public @wowlist Posts and Replies surfaces, with a 38-record public ledger, July 14, 2026.",
    publicNote:
      "The profile displayed 38 posts. Cross-tab reconciliation recovered all 38 unique public items: 16 account posts, six account replies, and 16 reposts from 13 other public accounts. All six replies functioned as product support, onboarding, or local-calendar identity guidance.",
    supportsGenerally: [
      "100 percent item-level recovery of the 38-item live-profile control",
      "16 account posts, six account replies, and 16 reposts",
      "16 reposts from 13 other public accounts",
      "six product-support, onboarding, or calendar-identity replies",
      "35 posted short URLs resolving to 34 unique public destinations",
      "bounded patterns in event distribution, scene knowledge, civic mobilization, and care"
    ],
    doesNotEstablish: [
      "a complete platform export or deletion history",
      "that no older status was deleted before capture",
      "Jamie's authorship of every shared-account post",
      "the platform's total support workload, audience, adoption, or impact",
      "WOWList's organization of activities it reposted or linked",
      "historical or project-owned engagement analytics"
    ]
  },
  supportPost(
    "SRC-X-WOWLIST-SUPPORT-FEED-SCOPE-2015",
    "WOWList reply explaining followed-calendar feed scope",
    "591664757473673216",
    "2015-04-24",
    "WOWList public reply explaining followed-calendar feed scope and a planned local/everywhere control, April 24, 2015.",
    ["direct public product support", "feed-scope explanation"]
  ),
  supportPost(
    "SRC-X-WOWLIST-SUPPORT-PROFILE-2015",
    "WOWList reply explaining profile navigation",
    "591666366215811073",
    "2015-04-24",
    "WOWList public reply explaining where a person could find their WOW Lists on their profile, April 24, 2015.",
    ["direct public product support", "profile-navigation explanation"]
  ),
  supportPost(
    "SRC-X-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
    "WOWList reply explaining multi-list event submission",
    "591668857670148096",
    "2015-04-24",
    "WOWList public reply explaining how to add an event and place it on multiple WOW Lists, April 24, 2015.",
    ["direct public product support", "multi-list event submission"]
  ),
  supportPost(
    "SRC-X-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
    "WOWList reply identifying NYCDIY",
    "771412862191407104",
    "2016-09-01",
    "WOWList public reply identifying NYCDIY.org as a local calendar identity, September 1, 2016.",
    ["NYCDIY as a public calendar identity connected to WOWList"]
  ),
  supportPost(
    "SRC-X-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
    "WOWList reply explaining how to join NYCDIY",
    "771455571501416448",
    "2016-09-01",
    "WOWList public reply explaining how people could join NYCDIY, add shows, and receive a weekly email, September 1, 2016.",
    ["direct public onboarding", "event submission", "weekly email"]
  ),
  supportPost(
    "SRC-X-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016",
    "WOWList reply connecting NYCDIY, WOWList, and Sunday Dinner",
    "771457416298921985",
    "2016-09-01",
    "WOWList public reply explaining that NYCDIY ran on WOWList and connecting the project to the Sunday Dinner potluck, September 1, 2016.",
    ["NYCDIY ran on WOWList", "WOWList's Sunday Dinner lineage"]
  ),
  {
    id: "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
    title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
    organization: "Grasstronaut",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-01-29",
    accessedAt: "2026-07-14",
    canonicalUrl: "http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    archiveUrl: "https://web.archive.org/web/20150406041311/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    preferredPublicUrl: "archive",
    publicCitation:
      "Grasstronaut, 'HOMEWORK: In Every Town - An All-Ages Music Manualfesto,' January 29, 2015, archived April 6, 2015.",
    publicNote:
      "WOWList linked this external guide as scene knowledge. It discusses community building, conflict resolution, legal and organizational knowledge, and documenting all-ages cultural spaces; it is not press coverage of WOWList.",
    supportsGenerally: [
      "the mission context of a scene-knowledge link shared by WOWList",
      "grassroots cultural-infrastructure knowledge as a subject of the account's public routing"
    ],
    doesNotEstablish: [
      "press coverage or endorsement of WOWList",
      "WOWList authorship of the article",
      "Jamie or WOWList's authorship of the referenced manual"
    ]
  },
  {
    id: "SRC-GOOD-TIMES-ZINES-2-2015",
    title: "Zines 2.0",
    organization: "Good Times",
    author: "Elise Granata",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-05-06",
    accessedAt: "2026-07-14",
    canonicalUrl: "http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    archiveUrl: "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    preferredPublicUrl: "archive",
    publicCitation:
      "Elise Granata, 'Zines 2.0,' Good Times, May 6, 2015, archived September 7, 2015.",
    publicNote:
      "WOWList linked this reporting about Grasstronaut's effort to document and connect grassroots arts spaces. The article supplies mission context for the shared link; it is not reporting about WOWList.",
    supportsGenerally: [
      "the mission context of a scene-documentation article shared by WOWList",
      "the account's routing of knowledge about disconnected but related DIY cultural spaces"
    ],
    doesNotEstablish: [
      "press coverage or endorsement of WOWList",
      "WOWList authorship of the article",
      "platform adoption or impact"
    ]
  },
  {
    id: "SRC-KQED-GHOST-SHIP-VIGIL-2016",
    title: "Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire",
    organization: "KQED",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-12-06",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.kqed.org/news/11207317/video-mourners-gather-at-candlelight-vigil-to-honor-victims-of-oakland-fire",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KQED, 'Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire,' December 6, 2016.",
    publicNote:
      "WOWList shared KQED's public documentation of the Lake Merritt memorial vigil after the Ghost Ship fire. This supports the linked event's context, not WOWList's organization of the vigil.",
    supportsGenerally: ["the public context of a Ghost Ship memorial resource shared by WOWList"],
    doesNotEstablish: ["WOWList organization of the vigil", "Jamie attendance", "causality or impact from sharing the link"]
  },
  {
    id: "SRC-MEOW-WOLF-DIY-FUND-2016",
    title: "Meow Wolf's DIY Fund",
    organization: "Meow Wolf",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-12-11",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://meowwolf.com/blob/meow-wolfs-diy-fund",
    preferredPublicUrl: "canonical",
    publicCitation: "Meow Wolf, 'Meow Wolf's DIY Fund,' December 11, 2016.",
    publicNote:
      "WOWList reposted the fund announcement. The source documents Meow Wolf's support for DIY arts and music spaces after Ghost Ship; it does not make WOWList a fund organizer or grantee.",
    supportsGenerally: ["the public context of a DIY-space support resource amplified by WOWList"],
    doesNotEstablish: ["WOWList organization of the fund", "a grant to WOWList", "causality or impact from the repost"]
  }
] satisfies SourceRecord[];

const supportSourceIds = [
  "SRC-X-WOWLIST-SUPPORT-FEED-SCOPE-2015",
  "SRC-X-WOWLIST-SUPPORT-PROFILE-2015",
  "SRC-X-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
  "SRC-X-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
  "SRC-X-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
  "SRC-X-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016"
];

export const wowlistSocialCorpusClaims = [
  {
    id: "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION",
    project: "wowlist",
    internalClaim:
      "The complete surviving @wowlist profile population contains 38 unique records matching the live 38-post control: 16 account posts, six account replies, and 16 reposts from 13 other public accounts.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "All 38 profile-counted WOWList records were recovered: 22 account-authored records and 16 reposts from 13 other public accounts.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
        relationship: "direct-support",
        supports: ["38-record population reconciliation", "account-post, reply, and repost counts"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means the current 38-item profile control is fully reconciled; it does not establish that no status was deleted before capture.",
      "Account authorship does not identify the individual teammate who composed a post."
    ],
    antiClaims: [
      "The ledger is a complete X platform export",
      "Jamie authored every @wowlist post",
      "Thirty-eight posts measure WOWList adoption or impact"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
    project: "wowlist",
    internalClaim:
      "All six account replies in the complete surviving corpus explain feed scope, profile navigation, multi-list event submission, local-calendar joining, or the relationship among NYCDIY, WOWList, and Sunday Dinner.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text: "The public account Jamie established became a direct support surface: its six surviving replies explained feed scope, profile navigation, multi-list event submission, joining local calendars, and how NYCDIY ran on WOWList from the Sunday Dinner potluck.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"]
      },
      {
        key: "technical-operations",
        text: "Established a shared public identity that supported people through product navigation, event submission, local-calendar onboarding, and community lineage.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      }
    ],
    evidence: [
      ...supportSourceIds.map((sourceId) => ({
        sourceId,
        relationship: "direct-support" as const,
        supports: ["public product support, onboarding, or calendar-identity guidance"],
        confidence: "high" as const,
        renderCitation: true
      })),
      {
        sourceId: "SRC-JAMIE-SOCIAL-IDENTITY-ESTABLISHMENT-2026",
        relationship: "context",
        supports: ["Jamie's confirmation that he established the project account"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Credit Jamie with establishing the account and co-building the product; do not assign individual post authorship without direct evidence.",
      "The account record demonstrates public support behavior, not the full support workload, adoption, satisfaction, audience, or impact."
    ],
    antiClaims: [
      "Jamie personally wrote all six replies",
      "X was WOWList's only support channel",
      "The social record alone proves adoption scale or impact"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
    project: "wowlist",
    internalClaim:
      "Three account posts routed scene knowledge about grassroots all-ages infrastructure, disconnected but similar arts spaces, and documentation as cultural continuity.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "The account did more than distribute events: it routed practical and historical knowledge among DIY cultural scenes.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
        relationship: "direct-support",
        supports: ["three scene-knowledge records and their outbound destinations"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
        relationship: "context",
        supports: ["grassroots cultural-infrastructure context for one linked guide"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-GOOD-TIMES-ZINES-2-2015",
        relationship: "context",
        supports: ["scene-documentation and connection context for one linked article"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The linked articles supply mission context; they are not press coverage or endorsements of WOWList.",
      "Routing a resource does not establish authorship, adoption, or outcome."
    ],
    antiClaims: [
      "Grasstronaut or Good Times reviewed WOWList",
      "WOWList authored the linked articles",
      "Three links prove nationwide scene impact"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-WOWLIST-CIVIC-CARE-CONTINUITY",
    project: "wowlist",
    internalClaim:
      "The complete account corpus contains five account posts and five reposts centered on civic mobilization or care, including public gathering, mutual-aid resources, mourning, DIY-space safety, and cultural-space support.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "The account's public record extends from event distribution into gathering, mutual aid, mourning, and support for the conditions that let cultural spaces survive.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
        relationship: "direct-support",
        supports: ["five account civic-care posts and five civic-care reposts"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-KQED-GHOST-SHIP-VIGIL-2016",
        relationship: "context",
        supports: ["public context for a memorial resource shared by the account"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-MEOW-WOLF-DIY-FUND-2016",
        relationship: "context",
        supports: ["public context for a DIY-space support resource reposted by the account"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Amplifying a gathering or resource does not establish WOWList or Jamie as its organizer, author, participant, beneficiary, or cause.",
      "The account corpus documents public routing and care themes; it does not measure resulting action or impact."
    ],
    antiClaims: [
      "WOWList organized every amplified mobilization",
      "Jamie authored every shared resource",
      "Social posts alone demonstrate civic impact"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const wowlistSocialCorpusInquiries = [
  {
    id: "INQ-WOWLIST-FULL-POPULATION-2026",
    project: "wowlist",
    question:
      "Can the full surviving population of @wowlist posts be recovered, classified, linked, and integrated without overstating completeness, authorship, adoption, or impact?",
    methods: [
      "Used the authenticated live profile's displayed 38-post count as the control total.",
      "Harvested the Posts and Replies surfaces separately in 650-pixel increments and deduplicated every rendered item by canonical status ID.",
      "Reconciled 37 Posts-tab records with one additional reply recovered from the Replies tab.",
      "Resolved all 35 posted t.co URLs, then classified every record by account relationship, primary theme, mentions, hashtags, and public destination.",
      "Closely read mission-relevant public destinations while distinguishing source context from coverage of WOWList."
    ],
    runAt: "2026-07-14",
    resultStatus: "recovered",
    findings: [
      "All 38 items in the live-profile control were recovered with unique status IDs.",
      "The population contains 16 account posts, six account replies, and 16 reposts from 13 other public accounts.",
      "All six account replies function as product support, onboarding, or local-calendar identity guidance.",
      "Five account posts distribute events; three route scene knowledge; three explain product or community infrastructure.",
      "Five account posts and five reposts center civic mobilization or care.",
      "The 35 posted short URLs resolved to 34 unique public destinations."
    ],
    limitations: [
      "A complete current profile population does not prove that no record was deleted before July 2026.",
      "The shared account does not identify the individual teammate who composed each post.",
      "Social records do not measure the platform's full user population, city reach, event volume, support workload, impressions, adoption, or impact.",
      "A repost or outbound link does not make WOWList the author or organizer of the underlying work.",
      "Visible reaction totals are mutable snapshots and are not used as historical reach measures."
    ],
    sourceIds: [
      "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      ...supportSourceIds,
      "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
      "SRC-GOOD-TIMES-ZINES-2-2015",
      "SRC-KQED-GHOST-SHIP-VIGIL-2016",
      "SRC-MEOW-WOLF-DIY-FUND-2016"
    ],
    publicSummary:
      "All 38 profile-counted WOWList records were recovered and classified, showing a shared public identity used for event distribution, product support, community connection, civic mobilization, and care."
  }
] satisfies ResearchInquiry[];

export const wowlistSocialCorpusPublicationDecisions = [
  {
    id: "PUB-WOWLIST-PUBLIC-SUPPORT-SURFACE",
    claimId: "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
    decision: "selected",
    audiences: ["hiring managers", "product-operations leaders", "public-interest technology peers"],
    surfaces: ["/work/wowlist", "/work/technical-operations"],
    rationale:
      "Makes the operational use of the shared identity concrete while keeping individual authorship and adoption claims bounded.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-WOWLIST-COMPLETE-SOCIAL-POPULATION",
    claimId: "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION",
    decision: "reserve",
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-full-population-social-corpus"],
    rationale:
      "The complete census strengthens provenance and future composition, but the population count is process evidence rather than the portfolio's main argument.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
    claimId: "CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
    decision: "reserve",
    audiences: ["future editors", "cultural-infrastructure peers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-full-population-social-corpus"],
    rationale:
      "Retains a meaningful mission pattern without presenting external scene articles as press coverage of WOWList.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-WOWLIST-CIVIC-CARE-CONTINUITY",
    claimId: "CLM-WOWLIST-CIVIC-CARE-CONTINUITY",
    decision: "reserve",
    audiences: ["future editors", "cultural-infrastructure peers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-full-population-social-corpus"],
    rationale:
      "Preserves the account's care pattern while preventing amplified work from being recast as WOWList's organizing or impact.",
    decidedAt: "2026-07-14"
  }
] satisfies PublicationDecision[];

export const wowlistSocialCorpusProofCoverage = [
  {
    proofId: "wowlist-public-support-surface",
    status: "source-backed",
    sourceIds: ["SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026", ...supportSourceIds],
    inquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026", "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP"],
    note:
      "Six account replies directly support the product-support pattern; Jamie's account-establishment role is separately sourced, while individual post authorship remains unassigned.",
    reviewedAt: "2026-07-14"
  }
] satisfies ProofCoverage[];
