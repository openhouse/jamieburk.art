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
  corpus: "SRC-WOWLIST-FACEBOOK-POST-CORPUS-2026-07-15",
  protectedRun: "SRC-WOWLIST-FACEBOOK-POST-RESEARCH-2026-07-15",
  page: "SRC-WOWLIST-FACEBOOK-PAGE-2026-07-15",
  westword: "SRC-WOWLIST-FACEBOOK-WESTWORD-DIY-FUND-2017",
  stewardship: "CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP",
  distribution: "CLM-WOWLIST-FACEBOOK-MISSION-DISTRIBUTION",
  metrics: "CLM-WOWLIST-FACEBOOK-DASHBOARD-SNAPSHOT",
  migration: "CLM-WOWLIST-FACEBOOK-MIGRATION-BOUNDARY",
  inquiry: "INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"
} as const;

export const wowListFacebookPostsFullPopulationBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
} = {
  intake: [
    {
      id: "INT-WOWLIST-FACEBOOK-POST-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: reviewedAt,
      capturedFrom:
        "Authenticated WOW List Page management view and protected archival captures",
      publicSafeSummary:
        "A complete-as-materialized inventory of 54 surviving WOW List Facebook Page records, their publisher-attribution states, public links, mission patterns, and bounded dashboard signals.",
      projects: ["wowlist"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [ids.corpus, ids.protectedRun, ids.page, ids.westword],
      claimIds: [
        ids.stewardship,
        ids.distribution,
        ids.metrics,
        ids.migration
      ],
      researchTaskIds: [
        "TASK-WOWLIST-FACEBOOK-OWNER-EXPORT",
        "TASK-WOWLIST-FACEBOOK-DETAIL-RECOVERY",
        "TASK-WOWLIST-FACEBOOK-LINK-CLOSE-READ",
        "TASK-WOWLIST-FACEBOOK-ROLE-AND-ENGAGEMENT"
      ],
      notes: [
        "Fifty-four unique records materialized after the Lifetime table reached a terminal no-growth state; this is not a Meta owner export or deletion history.",
        "All 50 detail pages that still rendered displayed Facebook's admin-only Published by Jamie Burkart attribution; four records remained table-only.",
        "A Page-publisher byline supports publishing stewardship, not sole authorship of quoted or shared material, sole project ownership, or exclusive management of every project account.",
        "Raw post bodies, engager identities, private profile links, comments, and authenticated-session state remain outside the public repository."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  sources: [
    {
      id: ids.corpus,
      title: "WOW List Facebook posts full-population public-safe corpus",
      organization: "Jamie Burkart portfolio knowledge bank",
      author: "Codex authenticated archival review",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://github.com/openhouse/jamieburk.art/blob/a55fa4be1a16325c614d2a689de957df9e1f1594/docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population.json",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Public-safe inventory of the surviving WOW List Facebook Page post population, July 15, 2026.",
      publicNote:
        "The committed 54-record corpus preserves stable post IDs, dates, recovery states, publisher-attribution states, normalized public links, overlapping mission classifications, and bounded current admin metrics. It excludes post bodies and personal engagement data.",
      supportsGenerally: [
        "54 records exposed by the authenticated Lifetime table",
        "50 recovered detail pages and four table-only records",
        "50 of 50 recovered details attributed by Facebook to Jamie Burkart as publisher",
        "a 2015-04-25 through 2018-03-22 chronology",
        "42 normalized public destinations",
        "overlapping calendar, event, cultural-space, care, civic, funding, and product-feedback patterns",
        "bounded July 15, 2026 dashboard values"
      ],
      doesNotEstablish: [
        "a complete Meta owner export or deleted-post history",
        "Jamie's sole ownership of WOW List or sole authorship of quoted and shared material",
        "exclusive management of every WOW List platform or account",
        "historical reach, unique people, attendance, endorsement, conversion, or impact",
        "stakeholder-group engagement counts"
      ]
    },
    {
      id: ids.protectedRun,
      title: "Authenticated WOW List Facebook post archival-production run",
      author: "Codex authenticated archival review",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation:
        "Authenticated archival-production pass over the WOW List Facebook Page's surviving published-post surface, July 15, 2026.",
      publicNote:
        "Protected captures retain full text and traversal provenance for verification while withholding engager identities, private profile links, access details, and authenticated state.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001",
      supportsGenerally: [
        "terminal no-growth traversal",
        "post-detail review",
        "publisher-byline recovery",
        "link extraction and thematic close reading",
        "legacy and modern management-surface reconciliation"
      ],
      doesNotEstablish: [
        "permission to publish protected captures",
        "a complete Meta owner export",
        "deleted-post recovery",
        "off-platform outcomes"
      ]
    },
    {
      id: ids.page,
      title: "WOW List Facebook Page",
      organization: "WOW List",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/wowlist",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List Facebook Page, reviewed July 15, 2026.",
      publicNote:
        "The Page describes WOW List as an event-sharing and community-building project and displayed 185 followers and two accounts followed on the review date.",
      supportsGenerally: [
        "current Page identity",
        "event-sharing and community-building framing",
        "a dated current profile-count snapshot"
      ],
      doesNotEstablish: [
        "historical audience size",
        "the identity of past readers or engagers",
        "complete lifetime publishing history"
      ]
    },
    {
      id: ids.westword,
      title: "City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund",
      organization: "Denver Westword",
      author: "Patricia Calhoun",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-03-09",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Patricia Calhoun, 'City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund,' Denver Westword, March 9, 2017.",
      publicNote:
        "WOW List circulated this reporting on its publication date. The article is mission context, not coverage of WOW List.",
      supportsGenerally: [
        "Denver Arts & Venues' $20,000 contribution",
        "Meow Wolf's administration of the DIY-space fund",
        "a mission-relevant source circulated by WOW List"
      ],
      doesNotEstablish: [
        "coverage of WOW List",
        "that WOW List created or administered the fund",
        "Jamie's authorship of the Page post",
        "causal impact from circulation"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: ids.corpus,
      project: "wowlist",
      assertion:
        "The authenticated Lifetime table materialized 54 unique records spanning April 25, 2015 through March 22, 2018, with 50 recovered details and four table-only records.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.stewardship, ids.distribution, ids.migration],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-FACEBOOK-PUBLISHER-ATTRIBUTION-2026",
      sourceId: ids.corpus,
      project: "wowlist",
      assertion:
        "Every one of the 50 recovered detail pages displayed Facebook's admin attribution Published by Jamie Burkart; the four table-only records have no recovered publisher attribution.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.stewardship],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-FACEBOOK-PUBLISHER-BOUNDARY-2026",
      sourceId: ids.protectedRun,
      project: "wowlist",
      assertion:
        "The admin byline identifies Page publishing responsibility; it does not identify the drafter or originator of every quoted, shared, or collaborative item and does not establish sole project ownership.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.stewardship],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-FACEBOOK-LINK-INVENTORY-2026",
      sourceId: ids.corpus,
      project: "wowlist",
      assertion:
        "The 54 records preserve 42 normalized public destinations after Facebook and campaign tracking parameters were removed.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.distribution],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-FACEBOOK-MISSION-PATTERNS-2026",
      sourceId: ids.corpus,
      project: "wowlist",
      assertion:
        "Overlapping record-level classifications preserve community-calendar onboarding, event and artist distribution, cultural-space support, civic mobilization, community governance and feedback, care and remembrance, and cultural-space funding.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.distribution],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-FACEBOOK-DASHBOARD-SNAPSHOT-2026",
      sourceId: ids.corpus,
      project: "wowlist",
      assertion:
        "On July 15, 2026, the legacy rows displayed 108 interactions, 512 impressions, and 11 comments in aggregate; these migration-sensitive values are not historical lifetime reach, unique people, attendance, endorsement, or impact.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.metrics],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-FACEBOOK-MIGRATION-BOUNDARY-2026",
      sourceId: ids.protectedRun,
      project: "wowlist",
      assertion:
        "Meta Business Suite's available Lifetime range began after the recovered chronology and displayed no activity, while the legacy Professional Dashboard exposed the 54 earlier records.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.migration],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-FACEBOOK-PAGE-IDENTITY-2026",
      sourceId: ids.page,
      project: "wowlist",
      assertion:
        "The current Page identifies WOW List as an event-sharing and community-building project; its July 15, 2026 profile counts are a dated snapshot, not historical audience evidence.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [ids.stewardship, ids.distribution, ids.metrics],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-FACEBOOK-WESTWORD-CONTEXT-2017",
      sourceId: ids.westword,
      project: "wowlist",
      assertion:
        "Westword reported a Denver Arts & Venues contribution to a Meow Wolf-administered DIY-space fund; WOW List's circulation of the article documents source curation, not creation or administration of the fund.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [ids.distribution],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    }
  ],
  claims: [
    {
      id: ids.stewardship,
      project: "wowlist",
      internalClaim:
        "Jamie Burkart stewarded WOW List's Facebook publishing across the surviving 2015-2018 Page record: Facebook attributes all 50 recoverable details to him as publisher, while four additional records remain table-only.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "As one of WOW List's co-builders, I stewarded its Facebook publishing across the surviving 2015-2018 record. Facebook attributes all 50 recoverable post details to me as publisher; four more records remain table-only. That byline documents publishing responsibility, not sole authorship of shared or quoted material.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/wowlist"]
        }
      ],
      evidence: [
        {
          sourceId: ids.corpus,
          relationship: "direct-support",
          supports: [
            "54-record denominator",
            "50 recovered publisher bylines",
            "four table-only records",
            "2015-2018 chronology"
          ],
          locator:
            "populationReconciliation; publishingAttribution; records",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: ids.protectedRun,
          relationship: "supports-boundary",
          supports: [
            "authenticated traversal method",
            "publisher-byline interpretation boundary"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete means every record materialized by the authenticated Lifetime table on July 15, 2026; it does not mean every post ever published.",
        "Published by identifies the Page publisher, not necessarily the drafter or originator of every quoted or shared item.",
        "WOW List was a shared project; Facebook publishing responsibility does not become sole product ownership or exclusive management of every project platform."
      ],
      antiClaims: [
        "Jamie authored every word in all 54 records",
        "Jamie solely owned or operated WOW List",
        "Jamie managed every WOW List social account",
        "The 54-record surface is a complete Meta owner export"
      ],
      researchInquiryIds: [ids.inquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.distribution,
      project: "wowlist",
      internalClaim:
        "The complete-as-materialized Facebook record shows WOW List's publishing surface connecting community-calendar onboarding and event distribution with cultural-space support, mutual aid, civic mobilization, care, funding, and participatory product feedback.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The Facebook record preserves a public distribution system spanning organizer onboarding, events, cultural-space support, mutual aid, civic action, care, funding, and participatory product feedback.",
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
            "42 normalized destinations",
            "seven overlapping mission patterns",
            "record-level thematic dispositions"
          ],
          locator: "linkInventory; missionPatterns; records",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: ids.westword,
          relationship: "context",
          supports: ["one close-read cultural-space funding source"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The classifications overlap and must not be summed into unique records.",
        "Circulating another person's article, fundraiser, or event does not transfer authorship, ownership, endorsement, or outcome credit to WOW List or Jamie.",
        "The remaining public destinations require close reading before they support article-level or outcome claims."
      ],
      antiClaims: [
        "WOW List organized every circulated event or campaign",
        "Every linked organization formally partnered with WOW List",
        "Circulation proves audience use, adoption, endorsement, or impact"
      ],
      researchInquiryIds: [ids.inquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.metrics,
      project: "wowlist",
      internalClaim:
        "Facebook's legacy table displayed 108 interactions, 512 impressions, and 11 comments across the 54 records on July 15, 2026.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "A dated legacy-dashboard snapshot is preserved in the corpus but held from accomplishment messaging because the values are migration-sensitive and not impact measures.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: ids.corpus,
          relationship: "direct-support",
          supports: ["dated row-level and aggregate displayed values"],
          locator: "adminMetricSnapshot; records",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "These are July 15, 2026 displays beside migrated legacy records, not verified historical lifetime analytics.",
        "The values do not identify unique people or stakeholder groups."
      ],
      antiClaims: [
        "The displayed impressions are complete historical reach",
        "Every interaction came from an organizer, artist, venue, or policymaker",
        "The dashboard snapshot proves attendance, adoption, endorsement, or impact"
      ],
      researchInquiryIds: [ids.inquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.migration,
      project: "wowlist",
      internalClaim:
        "The modern Meta Business Suite range began after the recovered WOW List publishing chronology and displayed no activity, while the legacy Professional Dashboard retained 54 earlier records.",
      status: "not-recovered",
      maturity: "research-needed",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The modern management view cannot serve as the historical denominator; its available range begins after the recovered Page chronology.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: ids.protectedRun,
          relationship: "supports-boundary",
          supports: ["two-surface management-interface reconciliation"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: ids.corpus,
          relationship: "supports-boundary",
          supports: ["legacy chronology and 54-record denominator"],
          locator: "migrationBoundary; populationReconciliation",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Use no activity displayed in the available modern range, not no historical activity.",
        "A migrated-interface zero cannot establish that earlier records never existed."
      ],
      antiClaims: [
        "WOW List had no Facebook posts",
        "The modern empty view proves historical inactivity",
        "The legacy table recovers deleted or removed posts"
      ],
      researchInquiryIds: [ids.inquiry],
      reviewedAt,
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-WOWLIST-FACEBOOK-OWNER-EXPORT",
      project: "wowlist",
      question:
        "Can a Meta Page owner export reconcile deleted, removed, or otherwise unexposed records with the 54-record surviving surface?",
      priority: "high",
      status: "queued",
      methodsPlanned: [
        "Request an owner-authorized export with stable post identities and dates",
        "Crosswalk export-only, surface-only, unavailable, and deleted states",
        "Version any denominator correction rather than overwriting the current result"
      ],
      successCriteria: [
        "Reconcile every exported record with the public-safe corpus",
        "Preserve uncertainty where platform states remain ambiguous",
        "Exclude private engagement identities and message data from the public repository"
      ],
      sourceIds: [ids.corpus, ids.protectedRun],
      claimIds: [ids.stewardship, ids.migration],
      publicSummary:
        "The authenticated surface is complete as materialized; owner-export completeness remains open.",
      reviewedAt
    },
    {
      id: "TASK-WOWLIST-FACEBOOK-DETAIL-RECOVERY",
      project: "wowlist",
      question:
        "Can the four table-only post details be recovered through owner data, stable archives, or project records?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Search an owner export by the four stable post IDs",
        "Search bounded public archives and local project records by date and route",
        "Retain unavailable states when recovery fails"
      ],
      successCriteria: [
        "Recover publisher state and public attachment context where possible",
        "Associate recovered records with explicit provenance",
        "Do not invent content for unavailable details"
      ],
      sourceIds: [ids.corpus, ids.protectedRun],
      claimIds: [ids.stewardship, ids.distribution],
      publicSummary:
        "Four surviving records remain table-only and retain explicit unresolved status.",
      reviewedAt
    },
    {
      id: "TASK-WOWLIST-FACEBOOK-LINK-CLOSE-READ",
      project: "wowlist",
      question:
        "What additional source-backed claims can responsibly develop from the 42 normalized destinations circulated through the Page?",
      priority: "high",
      status: "in-progress",
      methodsPlanned: [
        "Check each destination or a stable archive",
        "Record author, organization, date, source type, and preservation state",
        "Decompose article-level claims only after close reading"
      ],
      successCriteria: [
        "Disposition all 42 destinations",
        "Keep circulation separate from authorship and endorsement",
        "Promote only sources that materially strengthen a defensible project claim"
      ],
      sourceIds: [ids.corpus, ids.westword],
      claimIds: [ids.distribution],
      publicSummary:
        "The complete link inventory is preserved; one article is close-read and the remaining routes stay in the research lifecycle.",
      reviewedAt
    },
    {
      id: "TASK-WOWLIST-FACEBOOK-ROLE-AND-ENGAGEMENT",
      project: "wowlist",
      question:
        "How should collaborator evidence and identity-complete owner data refine Jamie's publishing role and mission-relevant stakeholder engagement?",
      priority: "high",
      status: "in-progress",
      methodsPlanned: [
        "Invite relevant collaborators to confirm, refine, or contest the publishing-role language",
        "Inspect an owner-authorized reactions and comments export if available",
        "Separate Page publishing, source authorship, project ownership, community voice, and platform administration"
      ],
      successCriteria: [
        "Preserve shared project credit while naming Jamie's supported publishing responsibility",
        "Establish a complete engager-identity denominator before reporting stakeholder-group counts",
        "Keep private identities and comments outside the public repository"
      ],
      sourceIds: [ids.corpus, ids.protectedRun, ids.page],
      claimIds: [ids.stewardship, ids.metrics],
      publicSummary:
        "The Page byline is strong publishing-role evidence; collaborator review and identity-complete owner data can add social context without displacing collective credit.",
      reviewedAt
    }
  ],
  researchInquiries: [
    {
      id: ids.inquiry,
      project: "wowlist",
      question:
        "What does the full surviving WOW List Facebook post surface establish about Jamie's role, project operation, source circulation, mission patterns, and public traction?",
      methods: [
        "Verified authenticated management access to the WOW List Page.",
        "Reviewed Professional Dashboard > Content Library > Published > Lifetime and scrolled the virtualized table to a terminal no-growth state.",
        "Preserved all 54 materialized post identities and opened every detail route.",
        "Recorded 50 recovered publisher bylines and retained four unavailable details as table-only.",
        "Normalized public destination URLs, removed Facebook and campaign tracking parameters, and classified every record through protected close reading.",
        "Separated dated dashboard values from reach, attendance, endorsement, adoption, and impact.",
        "Reconciled the legacy dashboard with the later modern-management range without converting its zero display into historical absence.",
        "Published only metadata, hashes, public URLs, bounded counts, and aggregate findings."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The authenticated Lifetime table materialized 54 unique records from April 25, 2015 through March 22, 2018.",
        "Fifty details rendered and all 50 displayed Facebook's Published by Jamie Burkart attribution; four records remained table-only.",
        "The corpus preserves 42 normalized public destinations and seven overlapping mission-pattern classifications.",
        "The publishing surface connected calendar onboarding and event distribution with cultural-space support, mutual aid, civic mobilization, community care, funding, and participatory product feedback.",
        "Current legacy rows displayed 108 interactions, 512 impressions, and 11 comments, but no complete engager-identity denominator was recovered.",
        "One posted Westword article was close-read as cultural-space funding context; the other destinations remain in the research lifecycle."
      ],
      limitations: [
        "The surface is not a Meta owner export and cannot establish deleted-post history.",
        "Four details remain unavailable.",
        "A publisher byline does not establish sole authorship, sole ownership, or exclusive management of every platform.",
        "Current dashboard values may be incomplete or non-comparable and are not historical reach or impact.",
        "A complete engager-identity population was not recovered, so stakeholder-group counts remain open.",
        "Most linked destinations still require close reading and preservation."
      ],
      sourceIds: [ids.corpus, ids.protectedRun, ids.page, ids.westword],
      publicSummary:
        "A complete-as-materialized archival pass preserves 54 surviving records, 50 recovered publisher bylines attributed to Jamie, four table-only records, 42 public destinations, and bounded mission and traction findings without converting shared publishing into sole authorship.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001"
    }
  ]
};
