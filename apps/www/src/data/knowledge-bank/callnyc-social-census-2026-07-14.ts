import type {
  ClaimRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const callNycSocialCensus = {
  account: "@CallNYCapp",
  observedAt: "2026-07-14",
  observedProfileCount: 110,
  recoveredPublicStatuses: 107,
  unresolvedProfileCountSlots: 3,
  relationshipCounts: { accountPosts: 86, accountReplies: 6, reposts: 15 },
  accountAuthoredStatuses: 92,
  accountAuthoredStatusesMentioningNyccouncil: 82,
  issueRecognitionStatuses: 71,
  councilMemberHandlesNamedInIssueRecognition: 26,
  nonMemberInstitutionalHandlesExcludedFromCouncilMemberCount: ["@nyccouncil", "@nycha", "@nychousing"],
  uniqueIssueDestinations: 61,
  topLevelIssueCategories: 16,
  uniqueShortUrls: 84,
  uniqueResolvedDestinations: 76,
  uniqueCallNycDestinations: 63,
  uniqueExternalDestinations: 13,
  issueRecognitionVisibleReactionSnapshot: {
    statusesWithVisibleReaction: 46,
    replies: 4,
    reposts: 66,
    likes: 86
  },
  completenessStatement: "100% disposition coverage of the 110 slots represented by the authenticated profile count: 107 recoverable public status records and three unresolved slots. This is not an X data export or a claim that deleted, withheld, or otherwise unavailable content was recovered.",
  publicLedger: "docs/knowledge-bank/data/callnyc-public-post-ledger.json"
} as const;

export const callNycSocialCensusIntake = [
  {
    id: "INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary: "Authenticated full-population disposition review of @CallNYCapp, combining Posts and Replies routes, an item-level public ledger, posted-link review, and explicit unresolved slots.",
    submittedBy: "Codex authenticated social-archive review",
    sourceUrl: "https://x.com/CallNYCapp",
    entityIds: ["ENT-CALLNYC"],
    disposition: "source-created",
    sourceIds: [
      "SRC-X-CALLNYC-FULL-POPULATION-CENSUS-2026",
      "SRC-X-CALLNYC-LAUNCH-2016",
      "SRC-X-CALLNYC-DISTRICT-PROFILES-2016",
      "SRC-X-CALLNYC-COUNCIL-HANDLE-API-2016",
      "SRC-X-CALLNYC-CONTACT-CONTROLS-2016",
      "SRC-X-CALLNYC-SCRIE-GUIDANCE-2016",
      "SRC-X-CALLNYC-AGGREGATE-SERVICE-POST-2016",
      "SRC-CALLNYC-NYC-SCHOOL-OF-DATA-RECAP-2016",
      "SRC-CALLNYC-GIZMODO-311-CONTEXT-2016",
      "SRC-CALLNYC-GOTHAMIST-PULASKI-CONTEXT-2016"
    ],
    claimIds: [
      "CLM-CALLNYC-SOCIAL-ISSUE-CONTACT-LOOP",
      "CLM-CALLNYC-NYC-SCHOOL-OF-DATA-RECOGNITION",
      "CLM-CALLNYC-CURRENT-VISIBLE-REACTION-PATTERN",
      "CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENTS",
      "CLM-CALLNYC-AGGREGATE-SERVICE-OUTCOME-REJECTED"
    ],
    researchTaskIds: [
      "TASK-CALLNYC-UNRESOLVED-PROFILE-SLOTS",
      "TASK-CALLNYC-API-AND-CONTACT-CONTROLS"
    ],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const callNycSocialCensusSources = [
  {
    id: "SRC-X-CALLNYC-FULL-POPULATION-CENSUS-2026",
    title: "Authenticated CallNYC full-population social census",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation: "Authenticated, read-only census of the @CallNYCapp Posts and Replies routes, with a redacted item-level ledger, July 14, 2026.",
    publicNote: "The census assigns a disposition to all 110 slots represented by the observed profile count: 107 recoverable public status records and three unresolved slots. It does not claim access to an X data export, deleted content, or historical analytics.",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["full-population disposition method", "107 recoverable public statuses", "three unresolved profile-count slots", "account-authored and repost classification", "posted-link and current visible-metric inventories"],
    doesNotEstablish: ["a complete X data export", "the content or cause of the three unresolved slots", "2016 engagement snapshots", "unique people reached", "institutional adoption", "constituent-service outcomes", "authorship by Jamie of every post"]
  },
  {
    id: "SRC-X-CALLNYC-LAUNCH-2016",
    title: "CallNYC public launch post",
    organization: "CallNYC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-05",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/CallNYCapp/status/706208629360304128",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC public launch post, March 5, 2016.",
    publicNote: "The account introduced CallNYC as a way to use New York City Council open data to find help by issue and district.",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["public launch", "resident-facing issue and district framing", "New York City Council open-data context"],
    doesNotEstablish: ["Jamie's authorship of the post", "institutional adoption", "resident use", "service outcomes"]
  },
  {
    id: "SRC-X-CALLNYC-DISTRICT-PROFILES-2016",
    title: "CallNYC district-profile announcement",
    organization: "CallNYC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-25",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/CallNYCapp/status/713537148000018432",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC district-profile announcement, March 25, 2016.",
    publicNote: "The account announced search-friendly Council-member district profiles with constituent-service issue data.",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["announcement of district profiles", "search and sharing intent", "constituent-service issue framing"],
    doesNotEstablish: ["current feature availability", "measured search reach", "resident adoption", "Jamie's authorship of the post"]
  },
  {
    id: "SRC-X-CALLNYC-COUNCIL-HANDLE-API-2016",
    title: "CallNYC Council-handle API reply",
    organization: "CallNYC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-20",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/CallNYCapp/status/722837286476390401",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC public reply describing a JSON endpoint for Council-member X handles, April 20, 2016.",
    publicNote: "The reply announced a JSON endpoint intended to make Council-member social handles reusable by other civic applications.",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["public API announcement", "stated reuse intent"],
    doesNotEstablish: ["surviving endpoint behavior", "complete roster coverage", "external API adoption", "Jamie's authorship of the reply"]
  },
  {
    id: "SRC-X-CALLNYC-CONTACT-CONTROLS-2016",
    title: "CallNYC issue-contact controls announcement",
    organization: "CallNYC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-16",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/CallNYCapp/status/710154803054301184",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC public reply announcing issue-specific contact controls, March 16, 2016.",
    publicNote: "The reply announced issue-specific posting and contact controls intended to help residents act from an issue page.",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["issue-specific contact-control announcement", "resident action intent"],
    doesNotEstablish: ["current feature availability", "resident adoption", "completed contacts", "service outcomes", "Jamie's authorship of the reply"]
  },
  {
    id: "SRC-X-CALLNYC-SCRIE-GUIDANCE-2016",
    title: "CallNYC SCRIE guidance reply",
    organization: "CallNYC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-05-20",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/CallNYCapp/status/733388862806982656",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC public reply linking official rent-freeze guidance, May 20, 2016.",
    publicNote: "The reply directed a public conversation toward official City and instructional resources for the Senior Citizen Rent Increase Exemption program.",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["issue-specific service guidance", "links to official and instructional resources"],
    doesNotEstablish: ["eligibility advice", "completed enrollment", "service outcome", "Jamie's authorship of the reply"]
  },
  {
    id: "SRC-X-CALLNYC-AGGREGATE-SERVICE-POST-2016",
    title: "CallNYC aggregate service-count post",
    organization: "CallNYC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-22",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/CallNYCapp/status/712349795403374592",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC aggregate service-count post, March 22, 2016.",
    publicNote: "The account published a project-level interpretation of CouncilStat issue records using a people-helped framing.",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["the account published an aggregate service-count interpretation"],
    doesNotEstablish: ["unique residents", "verified successful resolutions", "CallNYC users", "causal service outcomes", "independently audited counts"]
  },
  {
    id: "SRC-CALLNYC-NYC-SCHOOL-OF-DATA-RECAP-2016",
    title: "A Brief Recap of NYC School of Data 2016",
    organization: "NYC School of Data",
    author: "Noel Hidalgo",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-08",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://schoolofdata.nyc/a-brief-recap-of-nyc-school-of-data-2016/",
    preferredPublicUrl: "canonical",
    publicCitation: "Noel Hidalgo, 'A Brief Recap of NYC School of Data 2016,' NYC School of Data, March 8, 2016.",
    publicNote: "The independent contemporaneous recap included CallNYC among its featured hacks and described it as profiling City Council constituent-service data.",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["independent contemporaneous recognition", "featured-hack classification", "constituent-service data description"],
    doesNotEstablish: ["an award", "a formal presentation", "a partnership", "endorsement", "institutional adoption", "Jamie's role by itself"]
  },
  {
    id: "SRC-CALLNYC-GIZMODO-311-CONTEXT-2016",
    title: "Check the History of Complaints at Any NYC Address With This Plugin",
    organization: "Gizmodo",
    author: "Alissa Walker",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-10",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://gizmodo.com/check-the-history-of-complaints-at-any-nyc-address-with-1764099069",
    preferredPublicUrl: "canonical",
    publicCitation: "Alissa Walker, 'Check the History of Complaints at Any NYC Address With This Plugin,' Gizmodo, March 10, 2016.",
    publicNote: "The article covers a separate project translating 311 complaint data into an address-level browser tool.",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["adjacent 311 open-data translation context"],
    doesNotEstablish: ["Jamie's participation in the project", "CallNYC authorship", "partnership", "shared implementation"]
  },
  {
    id: "SRC-CALLNYC-GOTHAMIST-PULASKI-CONTEXT-2016",
    title: "Long-Overdue Pulaski Bridge Bike Path Will Officially Open Friday",
    organization: "Gothamist",
    author: "Miranda Katz",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-28",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://gothamist.com/news/long-overdue-pulaski-bridge-bike-path-will-officially-open-friday",
    preferredPublicUrl: "canonical",
    publicCitation: "Miranda Katz, 'Long-Overdue Pulaski Bridge Bike Path Will Officially Open Friday,' Gothamist, April 28, 2016.",
    publicNote: "The article covers a city infrastructure opening.",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["city infrastructure context shared by the account"],
    doesNotEstablish: ["Jamie's role in the bridge project", "CallNYC impact", "partnership", "institutional adoption"]
  }
] satisfies SourceRecord[];

export const callNycSocialCensusReadings = [
  {
    id: "READ-X-CALLNYC-FULL-POPULATION-CENSUS-2026",
    sourceId: "SRC-X-CALLNYC-FULL-POPULATION-CENSUS-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      { id: "PROP-X-CALLNYC-FULL-POPULATION-DISPOSITION", text: "The authenticated Posts and Replies union recovered 107 unique public status records against an observed profile count of 110 and assigned an explicit unresolved disposition to each of the three remaining slots.", relationToJamie: "project-context", supportTags: ["callnyc-full-population-disposition"], confidence: "high", locator: "Population audit and item ledger" },
      { id: "PROP-X-CALLNYC-AUTHORED-AND-REPOST-CORPUS", text: "The 107 recovered records comprise 86 account posts, six account replies, and 15 reposts; 82 of the 92 account-authored statuses mention @NYCCouncil.", relationToJamie: "project-context", supportTags: ["callnyc-account-authored-corpus"], confidence: "high", locator: "Relationship and mention classification" },
      { id: "PROP-X-CALLNYC-ISSUE-RECOGNITION-PATTERN", text: "The corpus contains 71 issue-specific recognition posts naming 26 Council-member handles and linking 61 distinct issue pages across 16 top-level categories.", relationToJamie: "project-context", supportTags: ["callnyc-issue-recognition-pattern"], confidence: "high", locator: "Issue-recognition classification and destination inventory" },
      { id: "PROP-X-CALLNYC-CURRENT-VISIBLE-REACTION-SNAPSHOT", text: "In July 2026, 46 of the 71 issue-recognition statuses retained at least one visible reply, repost, or like; their visible interface counts totaled four replies, 66 reposts, and 86 likes.", relationToJamie: "outcome-context", supportTags: ["callnyc-current-visible-reaction-snapshot"], confidence: "high", locator: "Visible metrics observed July 14, 2026" },
      { id: "PROP-X-CALLNYC-LINK-DESTINATION-INVENTORY", text: "The recovered corpus contains 84 unique shortened links resolving in July 2026 to 76 unique destinations: 63 on CallNYC and 13 external destinations.", relationToJamie: "project-context", supportTags: ["callnyc-link-destination-inventory"], confidence: "high", locator: "Deduplicated outbound-link inventory" },
      { id: "PROP-X-CALLNYC-EXTERNAL-CIVIC-CONTEXT", text: "The 13 external destinations include independent coverage, civic-technology infrastructure, official or instructional service resources, city news, and adjacent Jamie projects.", relationToJamie: "project-context", supportTags: ["callnyc-external-civic-context"], confidence: "high", locator: "External destination classification" }
    ],
    limitations: ["The census is not a native X data export and cannot identify the content, date, or reason for the three unresolved slots.", "Current visible reaction counts are mutable interface observations, not 2016 snapshots, unique-person counts, complete engagement histories, or evidence of adoption or outcomes.", "Account-authored means published by the account; it does not establish that Jamie drafted or posted every item.", "Current URL resolution does not prove that each destination resolved the same way in 2016."],
    researchTaskIds: ["TASK-CALLNYC-UNRESOLVED-PROFILE-SLOTS"]
  },
  {
    id: "READ-X-CALLNYC-LAUNCH-2016", sourceId: "SRC-X-CALLNYC-LAUNCH-2016", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-X-CALLNYC-LAUNCH-ISSUE-DISTRICT-FRAMING", text: "The launch post presented CallNYC as a way to use Council open data to find help by issue and district.", relationToJamie: "project-context", supportTags: ["callnyc-launch-issue-district-framing"], confidence: "high", locator: "Public post" }],
    limitations: ["The post does not establish Jamie's authorship, institutional adoption, resident use, or service outcomes."], researchTaskIds: []
  },
  {
    id: "READ-X-CALLNYC-DISTRICT-PROFILES-2016", sourceId: "SRC-X-CALLNYC-DISTRICT-PROFILES-2016", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-X-CALLNYC-DISTRICT-PROFILES-ANNOUNCEMENT", text: "The account announced search-friendly Council-member district profiles organized around constituent-service issue data.", relationToJamie: "project-context", supportTags: ["callnyc-district-profile-announcement"], confidence: "high", locator: "Public post" }],
    limitations: ["The announcement does not establish measured search reach, current feature availability, or resident adoption."], researchTaskIds: []
  },
  {
    id: "READ-X-CALLNYC-COUNCIL-HANDLE-API-2016", sourceId: "SRC-X-CALLNYC-COUNCIL-HANDLE-API-2016", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-X-CALLNYC-PUBLIC-HANDLE-API-ANNOUNCEMENT", text: "The account announced a JSON endpoint intended to make Council-member social handles reusable by other civic applications.", relationToJamie: "project-context", supportTags: ["callnyc-public-handle-api-announcement"], confidence: "high", locator: "Public reply" }],
    limitations: ["The reply does not establish surviving endpoint behavior, complete roster coverage, external adoption, or Jamie's authorship."], researchTaskIds: ["TASK-CALLNYC-API-AND-CONTACT-CONTROLS"]
  },
  {
    id: "READ-X-CALLNYC-CONTACT-CONTROLS-2016", sourceId: "SRC-X-CALLNYC-CONTACT-CONTROLS-2016", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-X-CALLNYC-CONTACT-CONTROLS-ANNOUNCEMENT", text: "The account announced issue-specific posting and contact controls intended to help residents act from issue pages.", relationToJamie: "project-context", supportTags: ["callnyc-contact-controls-announcement"], confidence: "high", locator: "Public reply" }],
    limitations: ["The reply does not establish current feature availability, completed contacts, resident adoption, or service outcomes."], researchTaskIds: ["TASK-CALLNYC-API-AND-CONTACT-CONTROLS"]
  },
  {
    id: "READ-X-CALLNYC-SCRIE-GUIDANCE-2016", sourceId: "SRC-X-CALLNYC-SCRIE-GUIDANCE-2016", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-X-CALLNYC-SCRIE-OFFICIAL-RESOURCE-GUIDANCE", text: "The account directed a public conversation toward official City and instructional SCRIE resources.", relationToJamie: "project-context", supportTags: ["callnyc-scrie-resource-guidance"], confidence: "high", locator: "Public reply and posted destinations" }],
    limitations: ["The reply does not establish eligibility advice, enrollment, a completed service outcome, or Jamie's authorship."], researchTaskIds: []
  },
  {
    id: "READ-X-CALLNYC-AGGREGATE-SERVICE-POST-2016", sourceId: "SRC-X-CALLNYC-AGGREGATE-SERVICE-POST-2016", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-X-CALLNYC-AGGREGATE-SERVICE-FRAMING", text: "The account published a project-level people-helped interpretation of aggregate CouncilStat issue records.", relationToJamie: "project-context", supportTags: ["callnyc-aggregate-service-framing"], confidence: "high", locator: "Public post" }],
    limitations: ["The post alone does not establish unique residents, verified resolutions, CallNYC users, causal service outcomes, or an independently audited count."], researchTaskIds: []
  },
  {
    id: "READ-CALLNYC-NYC-SCHOOL-OF-DATA-RECAP-2016", sourceId: "SRC-CALLNYC-NYC-SCHOOL-OF-DATA-RECAP-2016", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-CALLNYC-NYC-SCHOOL-OF-DATA-FEATURED-HACK", text: "A contemporaneous NYC School of Data recap included CallNYC among its featured hacks and described it as profiling City Council constituent-service data.", relationToJamie: "outcome-context", supportTags: ["callnyc-school-of-data-featured-hack"], confidence: "high", locator: "Featured Hacks section" }],
    limitations: ["The source does not establish an award, formal presentation, partnership, endorsement, adoption, or Jamie's role by itself."], researchTaskIds: []
  },
  {
    id: "READ-CALLNYC-GIZMODO-311-CONTEXT-2016", sourceId: "SRC-CALLNYC-GIZMODO-311-CONTEXT-2016", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-CALLNYC-GIZMODO-ADJACENT-311-TRANSLATION", text: "Gizmodo covered a separate project translating 311 complaint data into an address-level browser tool.", relationToJamie: "project-context", supportTags: ["callnyc-adjacent-311-context"], confidence: "high", locator: "Article" }],
    limitations: ["The article does not establish Jamie's participation, CallNYC authorship, partnership, or shared implementation."], researchTaskIds: []
  },
  {
    id: "READ-CALLNYC-GOTHAMIST-PULASKI-CONTEXT-2016", sourceId: "SRC-CALLNYC-GOTHAMIST-PULASKI-CONTEXT-2016", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-CALLNYC-GOTHAMIST-CITY-INFRASTRUCTURE-CONTEXT", text: "Gothamist reported the Pulaski Bridge bike-path opening.", relationToJamie: "project-context", supportTags: ["callnyc-city-infrastructure-context"], confidence: "high", locator: "Article" }],
    limitations: ["The article does not establish Jamie's role in the bridge project, CallNYC impact, partnership, or adoption."], researchTaskIds: []
  }
] satisfies SourceReading[];

export const callNycSocialCensusClaims = [
  {
    id: "CLM-CALLNYC-SOCIAL-ISSUE-CONTACT-LOOP",
    project: "callnyc",
    internalClaim: "CallNYC paired an independently built, issue-oriented civic-data prototype with a repeatable public recognition and contact loop: 71 recovered issue-recognition statuses named 26 Council-member handles and linked 61 issue pages across 16 categories.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    requiredSupportTags: ["callnyc-independent-follow-on", "callnyc-issue-recognition-pattern"],
    composition: {
      action: "Independently built an issue-oriented civic-data prototype and paired its resident pathways with a repeatable public recognition and contact loop.",
      intendedEnd: "Help residents move from administrative CouncilStat records toward issue-specific information and visible Council-office contact pathways.",
      usableResult: "The recovered account corpus contains 71 issue-recognition statuses naming 26 Council-member handles and linking 61 issue pages across 16 categories.",
      audience: "Hiring readers evaluating Jamie's implementation, public-interest product thinking, and stakeholder communication practice.",
      collectiveCredit: "Council offices, residents, journalists, and other civic technologists own their own work and responses; account activity does not transfer their contributions to Jamie.",
      causalBoundary: "The evidence supports Jamie's independent build and the account's communication architecture separately; it does not establish that Jamie authored every post, institutional adoption, resident use, or measured service outcomes."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "direct-support", supports: ["Jamie's independent CallNYC development and issue-oriented translation"], propositionIds: ["PROP-CALLNYC-POLITICO-INDEPENDENT-FOLLOW-ON"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-FULL-POPULATION-CENSUS-2026", relationship: "direct-support", supports: ["the bounded issue-recognition and destination pattern"], propositionIds: ["PROP-X-CALLNYC-ISSUE-RECOGNITION-PATTERN"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-CONTACT-CONTROLS-2016", relationship: "corroborating", supports: ["the announced issue-specific contact-control intent"], propositionIds: ["PROP-X-CALLNYC-CONTACT-CONTROLS-ANNOUNCEMENT"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["The status and destination counts describe the 107-record recovered public corpus, not a native X export.", "Account activity does not identify the author of every post or establish completed resident contacts."],
    antiClaims: ["The 71 recognition posts equal 71 successful constituent-service outcomes.", "Naming 26 Council-member handles proves adoption or endorsement.", "Jamie authored every @CallNYCapp post."],
    researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-CALLNYC-NYC-SCHOOL-OF-DATA-RECOGNITION",
    project: "callnyc",
    internalClaim: "A contemporaneous NYC School of Data recap included the independently developed CallNYC among its featured hacks and described it as profiling City Council constituent-service data.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    requiredSupportTags: ["callnyc-independent-follow-on", "callnyc-school-of-data-featured-hack"],
    composition: {
      action: "Independently built CallNYC as a resident-facing translation of City Council constituent-service data.",
      intendedEnd: "Make administrative records more legible and useful outside their source system.",
      usableResult: "NYC School of Data's contemporaneous recap included CallNYC among its featured hacks and described its constituent-service data purpose.",
      audience: "Hiring readers evaluating Jamie's civic-data product work and independent execution.",
      collectiveCredit: "NYC School of Data owns its editorial classification; the recognition belongs to the broader civic-data community as context, not as transferred authorship or institutional sponsorship.",
      causalBoundary: "The source supports independent contemporaneous recognition, not an award, formal presentation, partnership, endorsement, or adoption."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "direct-support", supports: ["Jamie's independent CallNYC development"], propositionIds: ["PROP-CALLNYC-POLITICO-INDEPENDENT-FOLLOW-ON"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-CALLNYC-NYC-SCHOOL-OF-DATA-RECAP-2016", relationship: "direct-support", supports: ["featured-hack recognition and constituent-service data description"], propositionIds: ["PROP-CALLNYC-NYC-SCHOOL-OF-DATA-FEATURED-HACK"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Use 'included among featured hacks,' not 'won,' 'presented,' 'partnered,' or 'endorsed.'"],
    antiClaims: ["CallNYC won an NYC School of Data award.", "Jamie formally presented CallNYC at NYC School of Data.", "NYC School of Data adopted or endorsed CallNYC."],
    researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-CALLNYC-CURRENT-VISIBLE-REACTION-PATTERN",
    project: "callnyc",
    internalClaim: "In July 2026, 46 of 71 recovered issue-recognition statuses retained at least one visible reaction, with interface totals of four replies, 66 reposts, and 86 likes.",
    status: "use-with-care",
    maturity: "corroborated",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    requiredSupportTags: ["callnyc-current-visible-reaction-snapshot"],
    projections: [],
    evidence: [{ sourceId: "SRC-X-CALLNYC-FULL-POPULATION-CENSUS-2026", relationship: "direct-support", supports: ["current visible reaction snapshot"], propositionIds: ["PROP-X-CALLNYC-CURRENT-VISIBLE-REACTION-SNAPSHOT"], confidence: "high", renderCitation: false }],
    boundaries: ["Date every use as a July 2026 interface observation.", "Counts are mutable and may include repeat actors or account states that cannot be reconstructed."],
    antiClaims: ["These are 2016 engagement totals.", "The counts represent unique people.", "Visible reactions prove adoption, endorsement, constituent use, or service outcomes."],
    researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENTS",
    project: "callnyc",
    internalClaim: "The @CallNYCapp account announced a reusable Council-member handle API and issue-specific contact controls; surviving implementation and historical endpoint behavior still require code and archive verification.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    requiredSupportTags: ["callnyc-public-handle-api-announcement", "callnyc-contact-controls-announcement"],
    projections: [],
    evidence: [
      { sourceId: "SRC-X-CALLNYC-COUNCIL-HANDLE-API-2016", relationship: "direct-support", supports: ["public API announcement and reuse intent"], propositionIds: ["PROP-X-CALLNYC-PUBLIC-HANDLE-API-ANNOUNCEMENT"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-CONTACT-CONTROLS-2016", relationship: "direct-support", supports: ["issue-specific contact-controls announcement"], propositionIds: ["PROP-X-CALLNYC-CONTACT-CONTROLS-ANNOUNCEMENT"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Describe these as account announcements until code, archived output, and endpoint behavior are verified.", "Do not infer external adoption or successful resident contacts from the announcements."],
    antiClaims: ["The API remains live today.", "The API covered every Council member throughout its lifetime.", "Other civic applications adopted the API.", "Issue-contact controls produced completed constituent-service outcomes."],
    researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-CALLNYC-AGGREGATE-SERVICE-OUTCOME-REJECTED",
    project: "callnyc",
    internalClaim: "An aggregate people-helped statement published by @CallNYCapp can be treated as a verified count of unique residents served or outcomes caused by CallNYC.",
    status: "rejected",
    maturity: "rejected",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    requiredSupportTags: [], projections: [],
    evidence: [{ sourceId: "SRC-X-CALLNYC-AGGREGATE-SERVICE-POST-2016", relationship: "supports-boundary", supports: ["the existence of the account's aggregate framing and the need for a measurement boundary"], propositionIds: ["PROP-X-CALLNYC-AGGREGATE-SERVICE-FRAMING"], confidence: "high", renderCitation: false }],
    boundaries: ["The post can document what the account said, but not convert administrative issue rows into unique people, successful resolutions, CallNYC users, or caused outcomes."],
    antiClaims: ["CouncilStat issue totals are unique resident counts.", "Every issue row is a successful service outcome.", "CallNYC caused the underlying Council-office work."],
    disposition: { reason: "The public post is not an independently audited person-level or outcome dataset, and the underlying administrative records cannot support that conversion without additional methodology and evidence.", predecessorClaimIds: [], successorClaimIds: [], decidedAt: "2026-07-14" },
    researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Codex authenticated social-archive review"]
  }
] satisfies ClaimRecord[];

export const callNycSocialCensusResearchTasks = [
  {
    id: "TASK-CALLNYC-UNRESOLVED-PROFILE-SLOTS",
    project: "callnyc",
    question: "Can the three profile-count slots not represented in the authenticated 107-status Posts and Replies union be identified without inference?",
    status: "open",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    sourceIds: ["SRC-X-CALLNYC-FULL-POPULATION-CENSUS-2026"],
    claimIds: [],
    nextActions: ["Request and inspect a native X account archive if it becomes available.", "Search historical notification email and public web archives for missing status IDs without publishing private message content.", "Preserve each slot as unresolved unless a status ID and source record are directly recovered."]
  },
  {
    id: "TASK-CALLNYC-API-AND-CONTACT-CONTROLS",
    project: "callnyc",
    question: "What surviving code and archived outputs verify the announced Council-handle API and issue-specific contact controls?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: ["INTAKE-CALLNYC-FULL-POPULATION-X-CENSUS-2026"],
    sourceIds: ["SRC-X-CALLNYC-COUNCIL-HANDLE-API-2016", "SRC-X-CALLNYC-CONTACT-CONTROLS-2016"],
    claimIds: ["CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENTS"],
    nextActions: ["Inspect the public CallNYC repository for the endpoint, data-generation path, and issue-contact controls.", "Locate an archived endpoint response and representative issue page from 2016.", "Reconcile any roster-coverage statement against dated Council membership and handle records before public projection."]
  }
] satisfies ResearchTask[];

export const callNycSocialCensusDecisions = [
  {
    id: "DEC-DEFER-CALLNYC-SOCIAL-ISSUE-CONTACT-LOOP",
    claimId: "CLM-CALLNYC-SOCIAL-ISSUE-CONTACT-LOOP",
    surface: "/work/callnyc",
    decision: "defer",
    rationale: "Keep the evidence-backed communication architecture available in the knowledge bank while the case-study composition remains focused on the product and its source-data limits.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-CALLNYC-NYC-SCHOOL-OF-DATA-RECOGNITION",
    claimId: "CLM-CALLNYC-NYC-SCHOOL-OF-DATA-RECOGNITION",
    surface: "/work/callnyc",
    decision: "defer",
    rationale: "Retain the independent recognition for later composition without expanding the current case study before human editorial review.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  }
] satisfies ProjectionDecision[];
