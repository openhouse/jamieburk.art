import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";

function article(
  id: string,
  title: string,
  organization: string,
  author: string,
  publishedAt: string,
  canonicalUrl: string,
  publicNote: string,
  supportsGenerally: string[]
): SourceRecord {
  return {
    id,
    title,
    organization,
    author,
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt,
    accessedAt: reviewedAt,
    canonicalUrl,
    preferredPublicUrl: "canonical",
    publicCitation: `${author}, '${title},' ${organization}, ${publishedAt}.`,
    publicNote,
    supportsGenerally,
    doesNotEstablish: [
      "NYC Artist Coalition or Jamie Burkart's authorship of the reporting",
      "agreement with every statement in the article",
      "the identity of the teammate who posted or reposted the link",
      "campaign causality, endorsement, audience reach, or policy impact"
    ]
  };
}

export const nycArtCXArchivalSourceRecords20260715 = [
  {
    id: "SRC-X-NYCARTC-FULL-POPULATION-LEDGER-2026",
    title: "Public-safe NYC Artist Coalition X population ledger",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/NYCArtC",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated read-only review of the public @NYCArtC Posts, Replies, and bounded search surfaces, July 14-15, 2026.",
    publicNote:
      "The public-safe ledger dispositions all 5,124 live-profile count slots: 3,367 surviving public items were recovered at item level and 1,757 historical slots remain explicitly unresolved. Raw post text and authenticated-session material are excluded.",
    supportsGenerally: [
      "a 5,124-slot dated profile control",
      "3,367 item-level public recoveries and 1,757 unresolved slots",
      "715 account-authored statuses and 2,652 reposts",
      "1,772 posted-link occurrences across 1,241 unique public URLs",
      "campaign, source-network, and publication-pattern analysis of every recovered item"
    ],
    doesNotEstablish: [
      "100 percent item-level recovery",
      "a first-party platform export or deletion history",
      "the identity or content of unresolved slots",
      "Jamie's authorship of every shared-account post",
      "unique people, readership, endorsement, reach, or policy impact"
    ]
  },
  {
    id: "SRC-X-NYCARTC-INBOUND-ENGAGEMENT-LEDGER-2026",
    title: "Public-safe NYC Artist Coalition inbound-engagement ledger",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://x.com/search?q=%40NYCArtC%20-from%3ANYCArtC&src=typed_query&f=live",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated read-only recovery of 501 public records around @NYCArtC from 178 accounts, July 14-15, 2026.",
    publicNote:
      "The recoverable public-search floor contains 347 explicit account mentions and 154 separately marked search or thread-context records. It includes bounded floors for Council-member, city-agency, and coalition, civic, or cultural-partner accounts.",
    supportsGenerally: [
      "501 recovered public-search records from 178 accounts",
      "347 explicit account mentions and 154 search or thread-context records",
      "24 records from at least seven contemporaneous Council-member accounts",
      "16 records from two city-agency accounts",
      "235 records from 15 identified coalition, civic, or cultural-partner accounts"
    ],
    doesNotEstablish: [
      "an absolute historical engagement census",
      "official Council or agency endorsement",
      "likes, impressions, unique people, private analytics, or audience reach",
      "policy causality or Jamie's authorship of shared-account posts"
    ]
  },
  article(
    "SRC-HELL-GATE-WHO-LEADS-NIGHTCLUB-RAIDS-2023",
    "Who Is Leading Raids on NYC Nightclubs?",
    "Hell Gate",
    "Adlan Jackson",
    "2023-06-09",
    "https://hellgatenyc.com/who-is-leading-raids-on-nyc-nightclubs/",
    "The article examines uncertainty about agencies and processes behind renewed nightlife inspections. The recovered @NYCArtC population links the article on its publication date.",
    ["renewed nightlife-enforcement questions", "MARCH accountability context"]
  ),
  article(
    "SRC-NYT-COMMERCIAL-RENTS-SURGING-2023",
    "They Helped New York Bounce Back. Now Their Rents Are Surging.",
    "The New York Times",
    "Stefanos Chen",
    "2023-05-08",
    "https://www.nytimes.com/2023/05/08/nyregion/small-businesses-rent-hikes-nyc.html",
    "The reporting examines storefront rent pressure and neighborhood disparities using public data. A source post carrying the article appears in the recovered @NYCArtC repost population.",
    ["commercial-rent pressure", "neighborhood-displacement context", "public storefront-data use"]
  ),
  article(
    "SRC-HELL-GATE-LUCYS-EVICTION-2024",
    "Lucy's Is Being Evicted. Do the Landlords Care?",
    "Hell Gate",
    "Christopher Robbins",
    "2024-02-08",
    "https://hellgatenyc.com/lucys-east-village-evicted-do-the-landlords-care/",
    "The article reports on the threatened eviction of a longstanding East Village bar. @NYCArtC linked it two days after publication.",
    ["venue eviction", "cultural-space displacement context"]
  ),
  article(
    "SRC-HELL-GATE-SAINT-VITUS-RAID-2024",
    "Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?",
    "Hell Gate",
    "Adlan Jackson",
    "2024-02-22",
    "https://hellgatenyc.com/saint-vitus-dob-nypd-nightlife-raid-shutdown/",
    "The article examines the Saint Vitus shutdown against the administration's announced move from surprise raids toward collaborative compliance. @NYCArtC linked it the following day.",
    ["nightlife-enforcement accountability", "the announced CURE transition"]
  ),
  article(
    "SRC-HELL-GATE-NIGHTCLUB-RAIDS-2025",
    "Nightclub Raids Are on the Rise in 2025, Report Says",
    "Hell Gate",
    "Adlan Jackson",
    "2025-10-03",
    "https://hellgatenyc.com/cure-march-raids-2025-report/",
    "The article reports on later multi-agency nightlife inspections using an Office of Nightlife report. A source post carrying it appears in the recovered @NYCArtC repost population.",
    ["later nightlife-inspection reporting", "CURE and MARCH accountability context"]
  ),
  article(
    "SRC-CITY-STATE-COMMERCIAL-RENT-2026",
    "Socialists take aim at commercial rent",
    "City & State New York",
    "Rebecca C. Lewis",
    "2026-02-20",
    "https://www.cityandstateny.com/policy/2026/02/socialists-take-aim-commercial-rent/411572/",
    "The article reports on a proposed Small Business Rent Stabilization Act and situates it within a longer commercial-tenant policy lineage. A source post carrying it appears in the recovered @NYCArtC repost population.",
    ["state-level commercial-rent legislation", "commercial-tenant policy lineage"]
  ),
  article(
    "SRC-GOTHAMIST-SMALL-BUSINESS-RENT-CONTROL-2026",
    "New York lawmakers seek rent control to protect small businesses",
    "Gothamist",
    "Walter Wuthmann",
    "2026-02-22",
    "https://gothamist.com/news/new-york-lawmakers-seek-rent-control-to-protect-small-businesses",
    "The article reports on proposed commercial-rent guidelines, lease terms, and stakeholder positions. A source post carrying it appears in the recovered @NYCArtC repost population.",
    ["state commercial-rent proposal", "competing stakeholder positions"]
  ),
  article(
    "SRC-BUSHWICK-DAILY-LEASE-RENEWALS-2026",
    "New Bill Seeks to Guarantee Lease Renewals for NYC Small Businesses",
    "Bushwick Daily",
    "Alec Meeker",
    "2026-02-21",
    "https://bushwickdaily.com/news/new-bill-seeks-to-guarantee-lease-renewals-for-nyc-small-bus/",
    "The article reports on commercial-lease legislation and quotes Olympia Kazi about displacement of small businesses, nonprofits, and cultural institutions. A source post carrying it appears in the recovered @NYCArtC repost population.",
    ["commercial-lease legislation", "Olympia Kazi's continuing cultural-space advocacy"]
  )
] satisfies SourceRecord[];

export const nycArtCXArchivalClaimRecords20260715 = [
  {
    id: "CLM-NYCARTC-FULL-PROFILE-DISPOSITION",
    project: "nyc-artist-coalition",
    internalClaim:
      "The July 2026 archival pass dispositioned all 5,124 slots in the live @NYCArtC profile control as 3,367 recovered public items and 1,757 explicit unresolved historical slots.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The dated profile control is fully dispositioned: 3,367 public items were recovered and 1,757 historical slots remain explicitly unresolved.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-FULL-POPULATION-LEDGER-2026",
        relationship: "direct-support",
        supports: ["5,124-slot disposition", "3,367 recovered items", "1,757 unresolved slots"],
        locator: "populationAudit and 5,124 disposition records",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is 100 percent disposition of a dated live-profile count, not 100 percent item-level tweet recovery.",
      "It is not a first-party export, deletion history, or proof that no earlier item disappeared before capture.",
      "The shared account does not identify the teammate who authored or selected each item."
    ],
    antiClaims: [
      "All 5,124 posts were recovered at item level",
      "The ledger is a complete platform export",
      "Jamie authored every @NYCArtC post"
    ],
    researchInquiryIds: ["INQ-NYCARTC-OWNER-ARCHIVE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-SOURCE-ROUTING-CONTINUITY",
    project: "nyc-artist-coalition",
    internalClaim:
      "The recovered @NYCArtC population contains 1,772 posted-link occurrences across 1,241 unique public URLs and preserves source-routing continuity across nightlife enforcement, cultural-space displacement, and commercial-tenancy concerns.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The recovered shared-account population preserves 1,772 posted-link occurrences across 1,241 unique URLs; selected close reads trace continuing attention to nightlife enforcement, cultural-space displacement, and commercial tenancy.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-FULL-POPULATION-LEDGER-2026",
        relationship: "direct-support",
        supports: ["posted-link occurrence count", "unique-URL count", "dated source-routing record"],
        locator: "aggregateFindings and recovered-item outboundLinks",
        confidence: "high",
        renderCitation: false
      },
      ...[
        "SRC-HELL-GATE-WHO-LEADS-NIGHTCLUB-RAIDS-2023",
        "SRC-NYT-COMMERCIAL-RENTS-SURGING-2023",
        "SRC-HELL-GATE-LUCYS-EVICTION-2024",
        "SRC-HELL-GATE-SAINT-VITUS-RAID-2024",
        "SRC-HELL-GATE-NIGHTCLUB-RAIDS-2025",
        "SRC-CITY-STATE-COMMERCIAL-RENT-2026",
        "SRC-GOTHAMIST-SMALL-BUSINESS-RENT-CONTROL-2026",
        "SRC-BUSHWICK-DAILY-LEASE-RENEWALS-2026"
      ].map((sourceId) => ({
        sourceId,
        relationship: "context" as const,
        supports: ["a close-read mission-relevant source routed through the recovered account population"],
        locator: "article title, date, and linked source-status metadata",
        confidence: "high" as const,
        renderCitation: false
      }))
    ],
    boundaries: [
      "A posted or reposted URL is evidence of public routing, not authorship, endorsement, or agreement with every statement.",
      "Link counts are not unique people, reading, conversion, reach, or impact.",
      "Only selected articles have been close-read; other destinations remain source leads."
    ],
    antiClaims: [
      "NYC Artist Coalition authored the linked reporting",
      "Every linked source corroborates a portfolio claim",
      "1,241 URLs prove audience reach or policy impact"
    ],
    researchInquiryIds: ["INQ-NYCARTC-OWNER-ARCHIVE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-NYCARTC-STAKEHOLDER-EXCHANGE-FLOOR",
    project: "nyc-artist-coalition",
    internalClaim:
      "A bounded public-search recovery retained 501 records from 178 accounts around @NYCArtC, including interaction floors for Council-member, city-agency, and coalition, civic, or cultural-partner accounts.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The bounded inbound recovery retained 501 public records from 178 accounts, including direct or contextual exchange with Council members, city cultural agencies, and coalition, civic, or cultural partners.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-INBOUND-ENGAGEMENT-LEDGER-2026",
        relationship: "direct-support",
        supports: [
          "501 recovered records from 178 accounts",
          "24 Council-member-account records across at least seven accounts",
          "16 city-agency-account records across two accounts",
          "235 coalition, civic, or cultural-partner records across 15 identified accounts"
        ],
        locator: "aggregateFindings and 501 disposition records",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The result is a recoverable public-search floor, not an absolute historical engagement census.",
      "Thread-context records remain distinct from explicit handle mentions.",
      "Account activity does not establish endorsement, reach, causality, or Jamie-only authorship."
    ],
    antiClaims: [
      "The New York City Council or a city agency officially endorsed NYC Artist Coalition",
      "The stakeholder counts represent unique people or complete historical participation",
      "Social interaction caused a policy outcome"
    ],
    researchInquiryIds: ["INQ-NYCARTC-OWNER-ARCHIVE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const nycArtCXArchivalResearchInquiries20260715 = [
  {
    id: "INQ-NYCARTC-OWNER-ARCHIVE-2026",
    project: "nyc-artist-coalition",
    question:
      "Can the 1,757 unresolved live-profile count slots be reconciled through a first-party @NYCArtC account archive without exposing private account or collaborator data?",
    methods: [
      "Search Jamie's accessible local, connected-drive, and email archive for an existing first-party account export.",
      "If an owner export is obtained, transform it privately into public status IDs, dates, types, links, classifications, and aggregate counts.",
      "Exclude direct messages, contacts, credentials, cookies, advertising data, account settings, and raw nonpublic fields.",
      "Keep not recovered distinct from deleted, did not exist, and recovered."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Every slot in the dated 5,124-profile control has a durable recovered or unresolved disposition.",
      "The public interfaces yielded 3,367 unique item-level recoveries.",
      "No first-party @NYCArtC account archive was recovered in the current accessible archive pass."
    ],
    limitations: [
      "The X profile and search interfaces are not complete exports or deletion histories.",
      "The identity and content of unresolved slots remain unknown.",
      "A future owner export requires a new private-to-public safety review before any repository update."
    ],
    sourceIds: [
      "SRC-X-NYCARTC-FULL-POPULATION-LEDGER-2026",
      "SRC-X-NYCARTC-INBOUND-ENGAGEMENT-LEDGER-2026"
    ],
    publicSummary:
      "The dated 5,124-slot profile control is fully dispositioned, but literal item-level completion remains blocked on a privacy-safe first-party owner archive."
  }
] satisfies ResearchInquiry[];

export const nycArtCXArchivalIntakeRecords20260715 = [
  {
    id: "INTAKE-NYCARTC-X-FULL-POPULATION-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "engagement-lead",
    title: "NYC Artist Coalition full-population X archival production",
    publicSafeSummary:
      "Public-safe ledgers for every slot in the dated @NYCArtC profile control, every recovered public item, a bounded incoming-engagement corpus, selected mission-relevant sources, and explicit unresolved debt.",
    whyItMatters:
      "Preserves a deep, queryable public record of coalition communication infrastructure and issue continuity while separating recovered evidence from missing history, team authorship, endorsement, reach, and causality.",
    projectHints: [
      "nyc-artist-coalition",
      "let-nyc-dance",
      "talks-not-raids",
      "save-nyc-spaces",
      "fair-rent-nyc",
      "career-proof-system"
    ],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://x.com/NYCArtC",
    sourceIds: nycArtCXArchivalSourceRecords20260715.map(({ id }) => id),
    claimIds: nycArtCXArchivalClaimRecords20260715.map(({ id }) => id),
    inquiryIds: nycArtCXArchivalResearchInquiries20260715.map(({ id }) => id),
    limitations: [
      "The ledger is a complete disposition of the dated profile count, not a complete item-level export.",
      "The shared account does not identify the teammate behind every post.",
      "Visible counts are dated interface observations and are not unique people, reach, endorsement, or impact."
    ],
    nextActions: [
      "Obtain and privately reconcile a first-party account archive if the account owner authorizes access.",
      "Close-read additional linked sources only when they can mature a specific claim or boundary.",
      "Keep ledger depth in the knowledge bank and project only reader-useful claims to the portfolio."
    ]
  }
] satisfies IntakeRecord[];
