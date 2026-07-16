import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const callNycPopulationAudit = {
  profileCountObserved: 110,
  postsTabItemsRecovered: 106,
  accountPostsRecovered: 86,
  accountRepliesRecovered: 6,
  accountAuthoredStatusesRecovered: 92,
  repostsRecovered: 15,
  uniqueItemsRecovered: 107,
  unresolvedPopulationSlots: 3,
  dispositionTotal: 110,
  ledgerPath: "docs/knowledge-bank/data/callnyc-public-post-ledger.json"
} as const;

export const callNycCorpusFindings = {
  accountAuthoredStatusesMentioningCouncil: 82,
  issueRecognitionPosts: 71,
  councilMemberHandlesNamedInRecognitions: 26,
  uniqueIssuePagesLinkedFromRecognitions: 61,
  issueCategoriesLinkedFromRecognitions: 16,
  shortUrlOccurrences: 98,
  uniqueShortUrls: 84,
  uniqueResolvedDestinations: 76,
  uniqueCallNycDestinations: 63,
  externalDestinationUrls: 13
} as const;

export const callNycSocialCorpusIntake = [
  {
    id: "LEAD-CALLNYC-FULL-POPULATION-CORPUS-2026",
    receivedAt: "2026-07-13",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for @CallNYCApp",
    summary:
      "Reconcile every slot in the 110-item observed profile population, preserve every recoverable public status and outbound URL, and mature bounded findings about civic engagement architecture, independent recognition, product announcements, and unresolved claims.",
    sourceUrl: "https://x.com/CallNYCapp",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["callnyc", "career-proof-system"],
    sourceIds: [
      "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      "SRC-NYC-SCHOOL-OF-DATA-CALLNYC-2016",
      "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026",
      "SRC-X-CALLNYC-JAMIE-ROLE-710150246781882369",
      "SRC-X-CALLNYC-DISTRICT-API-713537148000018432",
      "SRC-X-CALLNYC-JSON-API-722837286476390401",
      "SRC-X-CALLNYC-ISSUE-TWEET-BUTTONS-710154803054301184"
    ],
    claimIds: [
      "CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE",
      "CLM-CALLNYC-SCHOOL-OF-DATA-RECOGNITION",
      "CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENT"
    ],
    inquiryIds: [
      "INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026",
      "INQ-CALLNYC-UNVERIFIED-ACCOUNT-METRICS",
      "INQ-CALLNYC-API-IMPLEMENTATION"
    ],
    notes: [
      "The public ledger contains 107 recovered item-level records and three explicit not-recovered slots, accounting for the full 110-item profile count observed on July 13, 2026.",
      "This is 100 percent disposition coverage of the observed population, not a platform export or a claim that deleted, withheld, or inaccessible statuses cannot exist.",
      "Visible reply, repost, and like counts are a July 2026 public snapshot; they are not contemporaneous analytics, unique people, service outcomes, or project-owned engagement totals.",
      "No authentication, session, private-message, or account-analytics material entered the repository."
    ]
  }
] satisfies IntakeRecord[];

const xPostSource = (
  id: string,
  title: string,
  url: string,
  publishedAt: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[]
): SourceRecord => ({
  id,
  title,
  organization: "CallNYC",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-13",
  canonicalUrl: url,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote,
  supportsGenerally,
  doesNotEstablish
});

export const callNycSocialCorpusSources = [
  {
    id: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
    title: "Authenticated @CallNYCApp full-population recovery and public-post ledger",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-13",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://x.com/CallNYCapp",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated read-only review of the public @CallNYCApp Posts and Replies surfaces, with a 107-record public ledger and three explicit unresolved count slots, July 13, 2026.",
    publicNote:
      "The profile displayed 110 posts. Cross-tab reconciliation recovered 107 unique public items: 86 original account posts, 6 account replies, and 15 reposts. Three profile-count slots remain unresolved. The recovered corpus contains 71 issue-recognition posts naming 26 Council-member handles and linking to 61 issue pages across 16 categories.",
    supportsGenerally: [
      "100 percent disposition coverage of the 110-item observed profile count",
      "107 unique item-level recoveries and three explicit unresolved slots",
      "86 original posts, six replies, and 15 reposts",
      "71 issue-recognition posts naming 26 Council-member handles",
      "61 linked issue pages across 16 constituent-service categories",
      "outbound URL and stakeholder-pattern inventory"
    ],
    doesNotEstablish: [
      "a complete platform export",
      "that no deleted, withheld, or inaccessible status exists",
      "Jamie's authorship of every account post",
      "that every tagged office saw or responded to a post",
      "official NYC Council endorsement",
      "service quality, case resolution, unique residents helped, or policy causality",
      "contemporaneous or project-owned engagement analytics"
    ]
  },
  {
    id: "SRC-NYC-SCHOOL-OF-DATA-CALLNYC-2016",
    title: "A brief recap of NYC School of Data 2016",
    organization: "NYC School of Data / BetaNYC",
    author: "Noel Hidalgo",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-08",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://schoolofdata.nyc/a-brief-recap-of-nyc-school-of-data-2016/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Noel Hidalgo, 'A brief recap of NYC School of Data 2016,' NYC School of Data, March 8, 2016.",
    publicNote:
      "The event recap featured CallNYC among the civic hacks and described it as profiling the City Council's constituent-service data.",
    supportsGenerally: [
      "contemporaneous independent recognition of CallNYC",
      "CallNYC's use of City Council constituent-service data",
      "placement within New York City's open-data and civic-tech ecosystem"
    ],
    doesNotEstablish: [
      "an award",
      "an official NYC School of Data endorsement",
      "Jamie's presentation or attendance",
      "CallNYC as an official Council product"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026",
    title: "City Council Constituent Services (2015 to 2025)",
    organization: "City of New York",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2024-01-09",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://catalog.data.gov/dataset/nyc-council-constituent-services",
    preferredPublicUrl: "canonical",
    publicCitation:
      "City of New York, 'City Council Constituent Services (2015 to 2025),' public dataset metadata, updated January 20, 2026.",
    publicNote:
      "The current public metadata states that each row represents an issue, while a single constituent interaction or case can contain multiple issues.",
    supportsGenerally: [
      "the issue-level grain of the current constituent-services dataset",
      "the distinction among rows, issues, cases, and people"
    ],
    doesNotEstablish: [
      "the exact 2016 dataset schema or row count",
      "unique people helped",
      "case resolution or service quality",
      "comparability across offices or reporting practices"
    ]
  },
  xPostSource(
    "SRC-X-CALLNYC-JAMIE-ROLE-710150246781882369",
    "CallNYC first-person Jamie Burkart role post",
    "https://x.com/CallNYCapp/status/710150246781882369",
    "2016-03-16",
    "CallNYC public reply identifying Jamie Burkart and describing CallNYC as his first civic-tech project, March 16, 2016.",
    "The contemporaneous account publicly connected Jamie to CallNYC in the first person.",
    ["Jamie's public connection to CallNYC", "first-person project framing"],
    ["authorship of every account post", "sole project causality", "official Council affiliation"]
  ),
  xPostSource(
    "SRC-X-CALLNYC-DISTRICT-API-713537148000018432",
    "CallNYC District Profile API announcement",
    "https://x.com/CallNYCapp/status/713537148000018432",
    "2016-03-26",
    "CallNYC public post announcing a District Profile API with name, phone, email, Twitter, and service fields, March 26, 2016.",
    "This post documents the public product announcement; the historical endpoint behavior was not independently recovered in this pass.",
    ["contemporaneous API announcement", "announced profile fields"],
    ["current API availability", "endpoint adoption", "official City API status"]
  ),
  xPostSource(
    "SRC-X-CALLNYC-JSON-API-722837286476390401",
    "CallNYC JSON API reply",
    "https://x.com/CallNYCapp/status/722837286476390401",
    "2016-04-20",
    "CallNYC public reply describing a JSON API for Council-member Twitter usernames, April 20, 2016.",
    "This reply was the one account-authored status recovered from the Replies tab but absent from the Posts-tab inventory.",
    ["contemporaneous JSON API announcement", "the cross-tab recovery difference"],
    ["current endpoint behavior", "API use by the reply recipients", "official Council ownership"]
  ),
  xPostSource(
    "SRC-X-CALLNYC-ISSUE-TWEET-BUTTONS-710154803054301184",
    "CallNYC issue-specific Council tweet-button announcement",
    "https://x.com/CallNYCapp/status/710154803054301184",
    "2016-03-16",
    "CallNYC public reply announcing buttons for tweeting Council members about specific issues, March 16, 2016.",
    "The post documents an announced engagement feature; this pass did not independently recover its historical interaction behavior.",
    ["contemporaneous announcement of issue-specific Council contact buttons"],
    ["current feature availability", "resident use", "Council response", "the post's separate 94 percent claim"]
  )
] satisfies SourceRecord[];

export const callNycSocialCorpusClaims = [
  {
    id: "CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE",
    project: "callnyc",
    internalClaim:
      "The recoverable 2016 @CallNYCApp corpus contains 71 data-derived issue-recognition posts naming 26 Council-member handles and linking to 61 CallNYC issue pages across 16 constituent-service categories.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text: "The recoverable 2016 public-account corpus includes 71 data-derived recognition posts naming 26 sitting Council-member accounts and linking to 61 issue pages across 16 constituent-service categories.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/callnyc"]
      },
      {
        key: "technical-operations",
        text: "Built a public-engagement layer spanning 61 issue pathways and 26 Council-member accounts, with source and outcome boundaries kept explicit.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
        relationship: "direct-support",
        supports: [
          "item-level corpus and population reconciliation",
          "71 recognition posts",
          "26 named Council-member handles",
          "61 issue pages across 16 categories"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLNYC-COUNCIL-MINUTES-2016-09-28",
        relationship: "corroborating",
        supports: ["2016 Council officeholding for the people represented by the 26 handles"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026",
        relationship: "supports-boundary",
        supports: ["rows and issues must not be equated with cases or unique people"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Named or tagged accounts are the intended institutional audience; this count does not mean all 26 offices saw, replied to, reposted, or endorsed CallNYC.",
      "The 71 posts and 61 linked issue pages document an engagement architecture, not 71 service outcomes or 61 independently validated guidance products.",
      "CouncilStat rows represent issues rather than unique cases or people, and office comparisons reflect participation and reporting practices.",
      "The corpus has 107 recovered items plus three unresolved profile-count slots; it is not a complete platform export.",
      "The project account does not establish Jamie's authorship of every post."
    ],
    antiClaims: [
      "Twenty-six Council members engaged with or endorsed CallNYC",
      "CallNYC helped a verified number of unique residents",
      "The account corpus proves service quality or case resolution",
      "Every @CallNYCApp post was authored by Jamie",
      "The ledger is a complete X platform export"
    ],
    researchInquiryIds: [
      "INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026",
      "INQ-CALLNYC-UNVERIFIED-ACCOUNT-METRICS"
    ],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-CALLNYC-SCHOOL-OF-DATA-RECOGNITION",
    project: "callnyc",
    internalClaim:
      "NYC School of Data's March 2016 event recap featured CallNYC among the civic hacks and described it as profiling City Council constituent-service data.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text: "NYC School of Data's March 2016 recap featured CallNYC among civic hacks using New York City open data.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/callnyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYC-SCHOOL-OF-DATA-CALLNYC-2016",
        relationship: "direct-support",
        supports: ["contemporaneous independent recognition", "civic-hack placement", "constituent-service data description"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The recap featured CallNYC; it does not document an award, official endorsement, presentation, or Jamie's attendance."
    ],
    antiClaims: [
      "CallNYC won NYC School of Data",
      "NYC School of Data officially endorsed CallNYC",
      "Jamie presented CallNYC at the event"
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENT",
    project: "callnyc",
    internalClaim:
      "In March and April 2016, @CallNYCApp publicly announced a District Profile API, a JSON endpoint for Council-member Twitter usernames, and issue-specific buttons for tweeting Council members.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "Contemporaneous CallNYC posts announced a District Profile API, a JSON endpoint for Council-member Twitter usernames, and issue-specific Council contact buttons; historical endpoint behavior remains to be independently recovered.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/callnyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-CALLNYC-DISTRICT-API-713537148000018432",
        relationship: "direct-support",
        supports: ["District Profile API announcement and field list"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-CALLNYC-JSON-API-722837286476390401",
        relationship: "corroborating",
        supports: ["JSON API announcement for Council-member Twitter usernames"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-CALLNYC-ISSUE-TWEET-BUTTONS-710154803054301184",
        relationship: "direct-support",
        supports: ["issue-specific Council contact-button announcement"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The posts directly establish public announcements, not current availability, historical implementation completeness, adoption, or official City ownership."
    ],
    antiClaims: [
      "CallNYC currently provides a working public API",
      "The API was an official NYC Council service",
      "The account proves who used the API or contact buttons"
    ],
    researchInquiryIds: ["INQ-CALLNYC-API-IMPLEMENTATION"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const callNycSocialCorpusInquiries = [
  {
    id: "INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026",
    project: "callnyc",
    question:
      "Can every slot in the 110-item observed @CallNYCApp profile population be recovered and dispositioned without claiming a platform export?",
    methods: [
      "Scrolled the authenticated Posts surface to exhaustion twice and deduplicated canonical status URLs.",
      "Scrolled the authenticated Replies surface to exhaustion and reconciled account-authored statuses against the Posts-tab result.",
      "Ran date-bounded authenticated search, direct status checks, public search, and Wayback/CDX recovery for remaining IDs.",
      "Resolved every recovered t.co URL and preserved item-level status, mention, hashtag, link, media, and visible-metric metadata in a public ledger."
    ],
    runAt: "2026-07-13",
    resultStatus: "partially-recovered",
    findings: [
      "The profile displayed 110 posts.",
      "The Posts tab yielded 106 unique visible items.",
      "The Replies tab recovered one additional account reply absent from the Posts-tab result.",
      "The combined ledger contains 107 unique items: 86 original posts, 6 account replies, and 15 reposts.",
      "Three profile-count slots remain explicitly unresolved, producing 100 percent disposition coverage of the observed count."
    ],
    limitations: [
      "X did not provide a complete export, deletion history, withheld-status log, or historical account analytics.",
      "The three count slots have no recovered status IDs or content and must remain not recovered rather than inferred.",
      "Visible engagement metrics are a July 2026 public snapshot and may have changed since publication.",
      "A recovered project-account status does not identify its individual author."
    ],
    sourceIds: ["SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026"],
    publicSummary:
      "All 110 observed profile-count slots are dispositioned: 107 unique public items were recovered at item level and three remain explicitly unresolved. This is not a platform export."
  },
  {
    id: "INQ-CALLNYC-UNVERIFIED-ACCOUNT-METRICS",
    project: "callnyc",
    question:
      "What source data and method support the historical account claims that 94 or 96 percent of Council members used Twitter and that 2,330 people were helped in 365 days?",
    methods: [
      "Locate the contemporaneous roster and handle snapshot used for the 94 and 96 percent statements.",
      "Reconstruct the query and aggregation behind the 2,330 figure from the exact 2016 CouncilStat release.",
      "Apply the dataset's row, issue, case, person, office-participation, and reporting-practice distinctions before public use."
    ],
    resultStatus: "open",
    findings: [],
    limitations: [
      "The public posts preserve the claims but not the calculation method.",
      "Current dataset metadata says a row is an issue and a case may contain multiple issues, so row totals cannot be restated as unique people helped.",
      "The current dataset record must not be assumed to reproduce the exact 2016 schema or participating-office population."
    ],
    sourceIds: [
      "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026"
    ]
  },
  {
    id: "INQ-CALLNYC-API-IMPLEMENTATION",
    project: "callnyc",
    question:
      "Can the announced CallNYC District Profile API, JSON endpoint, and issue-specific Council contact buttons be independently recovered and technically documented?",
    methods: [
      "Inspect surviving public source-code history and deployment archives for API routes, response examples, contact-button templates, and release chronology.",
      "Search Wayback captures for the historical /api/ response and issue-page interaction controls.",
      "Seek independent documentation or use evidence before promoting beyond the announcement record."
    ],
    resultStatus: "open",
    findings: [],
    limitations: [
      "The contemporaneous posts establish announcements, while the currently available source repository preserves only a bounded implementation snapshot.",
      "A current 200 response from an archived snapshot fallback does not establish historical JSON behavior."
    ],
    sourceIds: [
      "SRC-X-CALLNYC-DISTRICT-API-713537148000018432",
      "SRC-X-CALLNYC-JSON-API-722837286476390401",
      "SRC-X-CALLNYC-ISSUE-TWEET-BUTTONS-710154803054301184",
      "SRC-CALLNYC-GITHUB-REPOSITORY"
    ]
  }
] satisfies ResearchInquiry[];

export const callNycSocialCorpusPublicationDecisions = [
  {
    id: "PUB-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE",
    claimId: "CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE",
    decision: "selected",
    audiences: ["hiring managers", "public-interest technology peers", "future editors"],
    surfaces: ["/work/callnyc", "/work/technical-operations"],
    rationale:
      "A full-corpus aggregate makes the product's public-engagement design and stakeholder reach concrete while preserving response and outcome boundaries.",
    decidedAt: "2026-07-13"
  },
  {
    id: "PUB-CALLNYC-SCHOOL-OF-DATA-RECOGNITION",
    claimId: "CLM-CALLNYC-SCHOOL-OF-DATA-RECOGNITION",
    decision: "selected",
    audiences: ["hiring managers", "public-interest technology peers", "future editors"],
    surfaces: ["/work/callnyc"],
    rationale:
      "Independent contemporaneous recognition strengthens the case study without adding an unsupported award or endorsement claim.",
    decidedAt: "2026-07-13"
  },
  {
    id: "PUB-CALLNYC-PUBLIC-API-ANNOUNCEMENT",
    claimId: "CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENT",
    decision: "reserve",
    audiences: ["future editors", "technical interviewers"],
    surfaces: ["docs/knowledge-bank/projects/callnyc"],
    rationale:
      "The announcements are valuable product depth, but historical implementation behavior should be recovered before primary portfolio projection.",
    decidedAt: "2026-07-13"
  }
] satisfies PublicationDecision[];

export const callNycSocialCorpusProofCoverage = [
  {
    proofId: "callnyc-public-engagement-architecture",
    status: "source-backed",
    sourceIds: [
      "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      "SRC-CALLNYC-COUNCIL-MINUTES-2016-09-28",
      "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026"
    ],
    inquiryIds: [
      "INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026",
      "INQ-CALLNYC-UNVERIFIED-ACCOUNT-METRICS"
    ],
    note:
      "The public ledger supports the post, handle, issue-page, and category counts; Council minutes corroborate officeholding; dataset metadata prevents row, case, person, and outcome inflation.",
    reviewedAt: "2026-07-13"
  }
] satisfies ProofCoverage[];
