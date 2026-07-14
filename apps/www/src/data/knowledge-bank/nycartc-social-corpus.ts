import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const nycArtCPopulationAudit = {
  profileCountObserved: 5124,
  repliesTabPopulationRecovered: 3007,
  historicalAuthoredSearchRecovered: 358,
  postsTabCrosscheckRecovered: 764,
  postsTabNewItems: 2,
  accountAuthoredStatusesRecovered: 715,
  repostsRecovered: 2652,
  uniqueItemsRecovered: 3367,
  contextualConversationRecordsExcluded: 22,
  unresolvedPopulationSlots: 1757,
  dispositionTotal: 5124,
  firstRecoveredAt: "2017-02-03T20:03:00.000Z",
  lastRecoveredAt: "2026-05-18T17:40:13.000Z",
  ledgerPath: "docs/knowledge-bank/data/nycartc-public-post-ledger.json"
} as const;

export const nycArtCEngagementFindings = {
  recoveredInboundSearchRecords: 501,
  explicitAccountMentionRecords: 347,
  searchOrThreadContextRecords: 154,
  distinctPublicAccounts: 178,
  councilMemberAccounts: 7,
  councilMemberInteractions: 24,
  cityAgencyAccounts: 2,
  cityAgencyInteractions: 16,
  coalitionCivicAndCulturalPartnerAccounts: 15,
  coalitionCivicAndCulturalPartnerInteractions: 235,
  outboundLinkOccurrences: 1772,
  uniqueOutboundUrls: 1241,
  engagementLedgerPath: "docs/knowledge-bank/data/nycartc-public-engagement-ledger.json"
} as const;

const xPost = (
  id: string,
  title: string,
  url: string,
  publishedAt: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[] = []
): SourceRecord => ({
  id,
  title,
  organization: "X (formerly Twitter)",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-14",
  canonicalUrl: url,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote,
  supportsGenerally,
  doesNotEstablish: [
    "the individual teammate who authored or selected the shared-account post",
    "official endorsement, policy causality, audience reach, or independently audited impact",
    ...doesNotEstablish
  ]
});

const article = (
  id: string,
  title: string,
  organization: string,
  author: string,
  publishedAt: string,
  canonicalUrl: string,
  publicNote: string,
  supportsGenerally: string[]
): SourceRecord => ({
  id,
  title,
  organization,
  author,
  kind: "published-article",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-14",
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation: `${author}, '${title},' ${organization}, ${publishedAt}.`,
  publicNote,
  supportsGenerally,
  doesNotEstablish: [
    "Jamie or NYC Artist Coalition's authorship of the article",
    "the identity of the teammate who posted or reposted it",
    "agreement with every statement in the article",
    "campaign causality, endorsement, or policy outcome by itself"
  ]
});

export const nycArtCSocialCorpusIntake = [
  {
    id: "LEAD-NYCARTC-FULL-POPULATION-CORPUS-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for @NYCArtC",
    summary:
      "Disposition the complete 5,124-slot live-profile control, classify every recoverable public item, inventory the account's public engagement and outbound-source record, and mature bounded claims about shared campaign identity and stakeholder traction.",
    sourceUrl: "https://x.com/NYCArtC",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["nyc-artist-coalition", "career-proof-system"],
    sourceIds: [
      "SRC-X-NYCARTC-FULL-POPULATION-AUDIT-2026",
      "SRC-X-NYCARTC-INBOUND-ENGAGEMENT-AUDIT-2026",
      "SRC-X-NYCARTC-BRAD-LANDER-FAIR-RENT-2021",
      "SRC-HELL-GATE-WHO-LEADS-NIGHTCLUB-RAIDS-2023",
      "SRC-NYT-COMMERCIAL-RENTS-SURGING-2023",
      "SRC-HELL-GATE-LUCYS-EVICTION-2024",
      "SRC-HELL-GATE-SAINT-VITUS-RAID-2024",
      "SRC-HELL-GATE-NIGHTCLUB-RAIDS-2025",
      "SRC-CITY-STATE-COMMERCIAL-RENT-2026",
      "SRC-GOTHAMIST-SMALL-BUSINESS-RENT-CONTROL-2026",
      "SRC-BUSHWICK-DAILY-LEASE-RENEWALS-2026"
    ],
    claimIds: [
      "CLM-NYCARTC-COMPLETE-SOCIAL-POPULATION",
      "CLM-NYCARTC-SOURCE-ROUTING-CONTINUITY",
      "CLM-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT"
    ],
    inquiryIds: ["INQ-NYCARTC-FULL-POPULATION-2026"],
    notes: [
      "All 5,124 live-profile count slots received a durable disposition: 3,367 surviving public items were recovered at item level and 1,757 slots remain explicit unresolved historical profile-count debt.",
      "The recovered population contains 715 account-authored statuses and 2,652 reposts spanning February 2017 through May 2026; 22 third-party conversation-context records were excluded.",
      "A separate full inbound-search pass recovered 501 rendered public records from 178 accounts. Of those, 347 explicitly name @NYCArtC and 154 are separately marked as search or thread context; the set includes 24 reviewable posts from at least seven contemporaneous Council-member accounts.",
      "The account is shared. Jamie confirms establishing its identity system, but no individual post is assigned to Jamie or another teammate without post-level evidence.",
      "No authentication, session, private-message, private-analytics, raw full-post-text, or local private-path material entered the repository."
    ]
  }
] satisfies IntakeRecord[];

export const nycArtCSocialCorpusSources = [
  {
    id: "SRC-X-NYCARTC-FULL-POPULATION-AUDIT-2026",
    title: "Authenticated @NYCArtC full-population recovery and public-post ledger",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/NYCArtC",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated read-only review of the public @NYCArtC Posts, Replies, and bounded search surfaces, with a 3,367-record public ledger and 1,757 explicit unresolved profile-count slots, July 14, 2026.",
    publicNote:
      "The profile displayed 5,124 posts. Reconciliation recovered 3,367 unique surviving public items: 715 account-authored statuses and 2,652 reposts. Another 1,757 profile-count slots remain explicit unresolved historical debt, so this is 100 percent slot disposition rather than 100 percent item-level recovery.",
    supportsGenerally: [
      "complete disposition of the 5,124-slot live-profile control",
      "3,367 item-level recoveries and 1,757 explicit unresolved slots",
      "715 account-authored statuses and 2,652 reposts",
      "a surviving public record spanning February 2017 through May 2026",
      "1,772 posted link occurrences across 1,241 unique public URLs",
      "four named coalition campaign identities"
    ],
    doesNotEstablish: [
      "a complete platform export or deletion history",
      "the identities or contents of 1,757 unresolved profile-count slots",
      "Jamie's authorship of every shared-account status",
      "audience reach, unique people, endorsement, policy causality, or independently audited impact"
    ]
  },
  {
    id: "SRC-X-NYCARTC-INBOUND-ENGAGEMENT-AUDIT-2026",
    title: "Authenticated @NYCArtC public inbound-engagement recovery",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/search?q=%40NYCArtC%20-from%3ANYCArtC&src=typed_query&f=live",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated read-only recovery of 501 public inbound-search records from 178 accounts around @NYCArtC, July 14, 2026.",
    publicNote:
      "The recoverable Latest-search floor spans February 2017 through March 2025. Of 501 rendered records, 347 explicitly name @NYCArtC and 154 are marked as search or thread context. The set includes 24 reviewable Council-member-account posts across at least seven accounts, 16 city-agency-account posts across two accounts, and 235 coalition, civic, or cultural partner posts across 15 identified accounts.",
    supportsGenerally: [
      "501 recovered inbound-search records from 178 accounts",
      "347 records explicitly naming @NYCArtC and 154 search or thread-context records",
      "24 recovered posts from at least seven contemporaneous Council-member accounts",
      "16 recovered posts from two city-agency accounts",
      "235 recovered posts from 15 identified coalition, civic, or cultural partner accounts",
      "long-running collaborator stewardship and public identity use"
    ],
    doesNotEstablish: [
      "an absolute historical engagement census or platform export",
      "likes, impressions, unique people, private analytics, or audience reach",
      "official Council or agency endorsement",
      "policy causality or Jamie's authorship of the shared-account posts"
    ]
  },
  xPost(
    "SRC-X-NYCARTC-BRAD-LANDER-FAIR-RENT-2021",
    "Brad Lander public FairRentNYC committee post",
    "https://x.com/bradlander/status/1354840336330330116",
    "2021-01-28",
    "Brad Lander public post stating that he spoke for Commercial Rent Stabilization in committee and directly addressing @NYCArtC, January 28, 2021.",
    "The full inbound-account search recovered this direct handle interaction, adding a seventh contemporaneous Council-member account to the bounded floor.",
    ["direct Council-member engagement with @NYCArtC", "Commercial Rent Stabilization committee context"],
    ["bill passage", "official Council endorsement", "Jamie's authorship of the account interaction"]
  ),
  xPost(
    "SRC-X-NYCARTC-WHO-LEADS-RAIDS-LINK-2023",
    "NYC Artist Coalition post linking Hell Gate nightlife-raids reporting",
    "https://x.com/NYCArtC/status/1667318348571463680",
    "2023-06-09",
    "NYC Artist Coalition public post linking Hell Gate's reporting on who was leading nightclub raids, June 9, 2023.",
    "The shared account routed contemporaneous reporting about renewed nightlife-enforcement ambiguity.",
    ["public routing of nightlife-enforcement reporting", "Talks Not Raids issue continuity"]
  ),
  article(
    "SRC-HELL-GATE-WHO-LEADS-NIGHTCLUB-RAIDS-2023",
    "Who Is Leading Raids on NYC Nightclubs?",
    "Hell Gate",
    "Adlan Jackson",
    "2023-06-09",
    "https://hellgatenyc.com/who-is-leading-raids-on-nyc-nightclubs/",
    "The article examines uncertainty about agencies and processes behind renewed nightlife inspections. @NYCArtC linked it the day it was published.",
    ["renewed nightlife-enforcement and MARCH accountability context"]
  ),
  xPost(
    "SRC-X-NYCARTC-NYT-RENT-SURGE-LINK-2023",
    "NYC Artist Coalition repost of New York Times commercial-rent reporting",
    "https://x.com/ninarobertsnyc/status/1655626357957701653",
    "2023-05-08",
    "A public post recovered in the @NYCArtC repost population linking New York Times reporting on surging outer-borough commercial rents, May 8, 2023.",
    "The account amplified reporting that connected storefront-rent pressure with cultural and neighborhood loss.",
    ["public routing of commercial-rent reporting", "FairRentNYC issue continuity"]
  ),
  article(
    "SRC-NYT-COMMERCIAL-RENTS-SURGING-2023",
    "They Helped New York Bounce Back. Now Their Rents Are Surging.",
    "The New York Times",
    "Stefanos Chen",
    "2023-05-08",
    "https://www.nytimes.com/2023/05/08/nyregion/small-businesses-rent-hikes-nyc.html",
    "The reporting uses storefront-registry data to examine disproportionate rent increases affecting businesses in predominantly Black, Latino, and Asian neighborhoods. The article was amplified in the recovered @NYCArtC population.",
    ["commercial-rent pressure and neighborhood-displacement context", "public-data use in storefront-rent reporting"]
  ),
  xPost(
    "SRC-X-NYCARTC-LUCYS-EVICTION-LINK-2024",
    "NYC Artist Coalition post linking Hell Gate reporting on Lucy's",
    "https://x.com/NYCArtC/status/1756333226929336825",
    "2024-02-10",
    "NYC Artist Coalition public post linking Hell Gate reporting on the threatened eviction of Lucy's, February 10, 2024.",
    "The account used a beloved venue's threatened displacement to keep cultural-space and commercial-tenancy concerns visible.",
    ["public routing of venue-displacement reporting", "Save NYC Spaces and FairRentNYC issue continuity"]
  ),
  article(
    "SRC-HELL-GATE-LUCYS-EVICTION-2024",
    "Lucy's Is Being Evicted. Do the Landlords Care?",
    "Hell Gate",
    "Christopher Robbins",
    "2024-02-08",
    "https://hellgatenyc.com/lucys-east-village-evicted-do-the-landlords-care/",
    "The article reports on the threatened eviction of a longstanding East Village bar. @NYCArtC linked it two days later.",
    ["venue eviction and cultural-space displacement context"]
  ),
  xPost(
    "SRC-X-NYCARTC-SAINT-VITUS-LINK-2024",
    "NYC Artist Coalition post linking Hell Gate reporting on Saint Vitus",
    "https://x.com/NYCArtC/status/1761049558526706129",
    "2024-02-23",
    "NYC Artist Coalition public post linking Hell Gate reporting on the Saint Vitus shutdown, February 23, 2024.",
    "The post connected the shutdown with the promised transition from surprise raids to collaborative compliance.",
    ["public routing of nightlife-enforcement reporting", "Talks Not Raids issue continuity"]
  ),
  article(
    "SRC-HELL-GATE-SAINT-VITUS-RAID-2024",
    "Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?",
    "Hell Gate",
    "Adlan Jackson",
    "2024-02-22",
    "https://hellgatenyc.com/saint-vitus-dob-nypd-nightlife-raid-shutdown/",
    "The article examines the Saint Vitus shutdown against the administration's stated move away from surprise nightlife raids. @NYCArtC linked it the following day.",
    ["nightlife-enforcement accountability after the announced CURE transition"]
  ),
  xPost(
    "SRC-X-NYCARTC-NIGHTCLUB-RAIDS-LINK-2025",
    "NYC Artist Coalition repost of Hell Gate's 2025 nightlife-raids report",
    "https://x.com/HellGateNY/status/1974165463149301764",
    "2025-10-03",
    "A Hell Gate public post recovered in the @NYCArtC repost population linking its report on increased 2025 nightlife raids, October 3, 2025.",
    "The account amplified later reporting that tested whether the promised enforcement-process reform held over time.",
    ["public routing of 2025 nightlife-enforcement reporting", "Talks Not Raids issue continuity"]
  ),
  article(
    "SRC-HELL-GATE-NIGHTCLUB-RAIDS-2025",
    "Nightclub Raids Are on the Rise in 2025, Report Says",
    "Hell Gate",
    "Adlan Jackson",
    "2025-10-03",
    "https://hellgatenyc.com/cure-march-raids-2025-report/",
    "The article reports nine multi-agency nightlife inspections in the first half of 2025 after two in all of 2024, based on an Office of Nightlife report. It was amplified in the recovered @NYCArtC population.",
    ["reported change in multi-agency nightlife inspections", "CURE and MARCH accountability context"]
  ),
  xPost(
    "SRC-X-NYCARTC-CITY-STATE-RENT-LINK-2026",
    "NYC Artist Coalition repost of City & State commercial-rent reporting",
    "https://x.com/EmilyAssembly/status/2024963751196135470",
    "2026-02-20",
    "An Emily Gallagher public post recovered in the @NYCArtC repost population linking City & State reporting on state commercial-rent legislation, February 20, 2026.",
    "The account amplified reporting on a state-level Small Business Rent Stabilization Act.",
    ["public routing of state commercial-rent legislation reporting", "FairRentNYC issue continuity"]
  ),
  article(
    "SRC-CITY-STATE-COMMERCIAL-RENT-2026",
    "Socialists take aim at commercial rent",
    "City & State New York",
    "Rebecca C. Lewis",
    "2026-02-20",
    "https://www.cityandstateny.com/policy/2026/02/socialists-take-aim-commercial-rent/411572/",
    "The article reports on the Small Business Rent Stabilization Act and situates it within the longer history of commercial-tenant protections. It was amplified in the recovered @NYCArtC population.",
    ["state-level commercial-rent legislation and longer policy lineage"]
  ),
  xPost(
    "SRC-X-NYCARTC-GOTHAMIST-RENT-LINK-2026",
    "NYC Artist Coalition repost of Gothamist small-business rent reporting",
    "https://x.com/SalazarSenate/status/2026026218496336009",
    "2026-02-23",
    "A Julia Salazar public post recovered in the @NYCArtC repost population linking Gothamist reporting on small-business rent control, February 23, 2026.",
    "The account amplified reporting on lease stability, capped increases, and commercial-tenant rights.",
    ["public routing of state commercial-rent legislation reporting", "FairRentNYC issue continuity"]
  ),
  article(
    "SRC-GOTHAMIST-SMALL-BUSINESS-RENT-CONTROL-2026",
    "New York lawmakers seek rent control to protect small businesses",
    "Gothamist",
    "Walter Wuthmann",
    "2026-02-22",
    "https://gothamist.com/news/new-york-lawmakers-seek-rent-control-to-protect-small-businesses",
    "The article reports on a proposed commercial rent-guidelines board, ten-year lease terms, and written-lease rights. It was amplified in the recovered @NYCArtC population.",
    ["state commercial-rent proposal and competing stakeholder positions"]
  ),
  xPost(
    "SRC-X-NYCARTC-BUSHWICK-DAILY-RENT-LINK-2026",
    "NYC Artist Coalition repost of Bushwick Daily lease-renewal reporting",
    "https://x.com/SalazarSenate/status/2026428534822998131",
    "2026-02-24",
    "A Julia Salazar public post recovered in the @NYCArtC repost population linking Bushwick Daily reporting on lease-renewal legislation, February 24, 2026.",
    "The account amplified local reporting that quoted Olympia Kazi on the legislation's cultural-infrastructure stakes.",
    ["public routing of commercial-lease legislation reporting", "collaborator continuity in public advocacy"]
  ),
  article(
    "SRC-BUSHWICK-DAILY-LEASE-RENEWALS-2026",
    "New Bill Seeks to Guarantee Lease Renewals for NYC Small Businesses",
    "Bushwick Daily",
    "Alec Meeker",
    "2026-02-21",
    "https://bushwickdaily.com/news/new-bill-seeks-to-guarantee-lease-renewals-for-nyc-small-bus/",
    "The article reports on the Small Business Rent Stabilization Act and quotes Olympia Kazi about the long fight against displacement of small businesses, nonprofits, and cultural institutions. It was amplified in the recovered @NYCArtC population.",
    ["state commercial-rent legislation", "public continuation of Olympia Kazi's cultural-space advocacy"]
  )
] satisfies SourceRecord[];

export const nycArtCSocialCorpusClaims = [
  {
    id: "CLM-NYCARTC-COMPLETE-SOCIAL-POPULATION",
    project: "nyc-artist-coalition",
    internalClaim:
      "The July 2026 archival pass dispositioned all 5,124 slots in the live @NYCArtC profile control as 3,367 item-level public recoveries and 1,757 explicit unresolved historical profile-count slots.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "A full live-profile disposition recovered 3,367 public items and retained 1,757 profile-count slots as unresolved historical debt; this is 100 percent slot disposition, not a complete platform export.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-nycartc-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-FULL-POPULATION-AUDIT-2026",
        relationship: "direct-support",
        supports: ["5,124-slot disposition", "3,367 item-level recoveries", "1,757 unresolved slots"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "This is 100 percent disposition of the current live-profile count, not 100 percent item-level recovery.",
      "It is not a platform export, deletion history, or proof that no older item disappeared before capture.",
      "Shared-account records do not identify the teammate who authored or selected each item."
    ],
    antiClaims: [
      "All 5,124 posts were recovered at item level",
      "The ledger is a complete platform export",
      "Jamie authored every @NYCArtC post"
    ],
    researchInquiryIds: ["INQ-NYCARTC-FULL-POPULATION-2026", "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-SOURCE-ROUTING-CONTINUITY",
    project: "nyc-artist-coalition",
    internalClaim:
      "The recovered shared-account population contains 1,772 posted link occurrences across 1,241 unique URLs and preserves a multi-year public source trail across the coalition's four campaign concerns.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "The recovered shared-account population preserves 1,772 posted link occurrences across 1,241 unique URLs; selected close reads show continuity across nightlife enforcement, cultural-space displacement, and commercial-tenancy concerns.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-nycartc-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-FULL-POPULATION-AUDIT-2026",
        relationship: "direct-support",
        supports: ["link occurrence and unique-URL counts"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-HELL-GATE-WHO-LEADS-NIGHTCLUB-RAIDS-2023",
        relationship: "context",
        supports: ["nightlife-enforcement source continuity"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYT-COMMERCIAL-RENTS-SURGING-2023",
        relationship: "context",
        supports: ["commercial-tenancy source continuity"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-BUSHWICK-DAILY-LEASE-RENEWALS-2026",
        relationship: "context",
        supports: ["later state-policy and collaborator continuity"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "A posted or reposted URL is evidence of public routing, not authorship, endorsement, or agreement with every statement.",
      "Link counts are not unique people, reading, conversion, reach, or impact.",
      "Only selected sources have been close-read; the remaining URLs stay as source leads in the ledger."
    ],
    antiClaims: [
      "NYC Artist Coalition authored the linked reporting",
      "Every linked source corroborates a portfolio claim",
      "1,241 URLs prove audience reach or policy impact"
    ],
    researchInquiryIds: ["INQ-NYCARTC-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const nycArtCSocialCorpusInquiries = [
  {
    id: "INQ-NYCARTC-FULL-POPULATION-2026",
    project: "nyc-artist-coalition",
    question:
      "Can the 1,757 unresolved profile-count slots and historical engagement gaps be narrowed through a first-party export or other public archives without exposing private account or collaborator data?",
    methods: [
      "Seek a first-party account export only if it can be reviewed through a private-to-public transformation that excludes credentials, private messages, deleted-post contents, and personal account data.",
      "Compare surviving status IDs with campaign sites, the Internet Archive, public article embeds, and collaborator records.",
      "Preserve not recovered separately from did not exist, and do not infer missing IDs, post types, dates, or contents."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "Every current live-profile count slot has a durable disposition.",
      "The visible public surfaces recovered 3,367 unique items and left 1,757 slots unresolved.",
      "Historical repost recovery appears to be the largest remaining interface limitation."
    ],
    limitations: [
      "X's profile and search interfaces do not function as a complete export or deletion history.",
      "Profile counts and visible reaction metrics are mutable.",
      "No private messages, account analytics, cookies, credentials, or session stores were inspected."
    ],
    sourceIds: ["SRC-X-NYCARTC-FULL-POPULATION-AUDIT-2026", "SRC-X-NYCARTC-INBOUND-ENGAGEMENT-AUDIT-2026"],
    publicSummary:
      "All 5,124 current profile-count slots are dispositioned, with 3,367 item-level recoveries and 1,757 explicit unresolved slots; first-party export recovery remains open."
  }
] satisfies ResearchInquiry[];

export const nycArtCSocialCorpusPublicationDecisions = [
  {
    id: "PUB-NYCARTC-COMPLETE-SOCIAL-POPULATION",
    claimId: "CLM-NYCARTC-COMPLETE-SOCIAL-POPULATION",
    decision: "reserve",
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-nycartc-full-population-social-corpus"],
    rationale:
      "The disposition is important provenance and machine-checkable evidence, but the portfolio should lead with reader-useful role and traction claims.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-NYCARTC-SOURCE-ROUTING-CONTINUITY",
    claimId: "CLM-NYCARTC-SOURCE-ROUTING-CONTINUITY",
    decision: "reserve",
    audiences: ["future editors", "public-interest technology peers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-nycartc-full-population-social-corpus"],
    rationale:
      "The link corpus gives future compositions depth and source-discovery value without turning a large count into a reader-facing impact claim.",
    decidedAt: "2026-07-14"
  }
] satisfies PublicationDecision[];

export const nycArtCSocialCorpusProofCoverage = [] satisfies ProofCoverage[];
