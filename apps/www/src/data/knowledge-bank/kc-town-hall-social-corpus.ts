import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const kcTownHallPopulationAudit = {
  profileCountObserved: 183,
  postsTabItemsRecovered: 121,
  repliesTabPrimaryItemsRecovered: 181,
  accountAuthoredStatusesRecovered: 155,
  repostsRecovered: 26,
  distinctRepostSourceAccounts: 16,
  uniqueItemsRecovered: 181,
  contextualConversationRecordsExcluded: 7,
  unresolvedPopulationSlots: 2,
  dispositionTotal: 183,
  ledgerPath: "docs/knowledge-bank/data/kc-town-hall-public-post-ledger.json"
} as const;

export const kcTownHallCorpusFindings = {
  tiredOfTiresAuthoredStatuses: 99,
  placeRestorationAndResidentInputStatuses: 18,
  civicInformationAndParticipationStatuses: 6,
  neighborhoodMutualSupportStatuses: 5,
  authoredPostsWithMedia: 127,
  authoredShortUrlOccurrences: 130,
  authoredUniqueShortUrls: 28,
  allShortUrlOccurrences: 133,
  allUniqueShortUrls: 31,
  allUniqueResolvedDestinations: 20,
  visibleReplies: 22,
  visibleReposts: 70,
  visibleLikes: 174,
  directElectedOrCityServiceAccountFloor: 4
} as const;

const socialPost = (
  id: string,
  title: string,
  statusUrl: string,
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
  canonicalUrl: statusUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote,
  supportsGenerally,
  doesNotEstablish: [
    "the individual teammate who authored the shared-account post",
    "official endorsement, funding support, causality, or independently audited impact",
    ...doesNotEstablish
  ]
});

export const kcTownHallSocialCorpusIntake = [
  {
    id: "LEAD-KC-TOWN-HALL-FULL-POPULATION-CORPUS-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for @KCTownHall",
    summary:
      "Disposition the complete 183-slot live-profile control, classify every recoverable public item, preserve linked source leads, and mature bounded claims about durable public identity, resident participation, neighborhood operations, and civic exchange.",
    sourceUrl: "https://x.com/KCTownHall",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["kc-town-hall", "career-proof-system"],
    sourceIds: [
      "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026",
      "SRC-X-KC-TOWN-HALL-LAUNCH-2018",
      "SRC-X-KC-TOWN-HALL-RESIDENT-INPUT-2018",
      "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-LAUNCH-2019",
      "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-SAVINGS-2020",
      "SRC-X-KC-TOWN-HALL-CANDIDATE-FORUM-2019",
      "SRC-X-KC-TOWN-HALL-COVID-RESOURCES-2020",
      "SRC-X-KC-TOWN-HALL-ROBINSON-REPLY-2020",
      "SRC-X-KC-TOWN-HALL-JUSTUS-REPLY-2019",
      "SRC-X-KC-TOWN-HALL-LUCAS-REPLY-2019",
      "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
      "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018"
    ],
    claimIds: [
      "CLM-KC-TOWN-HALL-COMPLETE-SOCIAL-POPULATION",
      "CLM-KC-TOWN-HALL-DURABLE-PUBLIC-IDENTITY",
      "CLM-KC-TOWN-HALL-TIRED-OF-TIRES-RECORD",
      "CLM-KC-TOWN-HALL-CIVIC-EXCHANGE"
    ],
    inquiryIds: ["INQ-KC-TOWN-HALL-FULL-POPULATION-2026"],
    notes: [
      "All 183 live-profile count slots were dispositioned: 181 surviving public timeline items were recovered and two slots remain explicit unresolved count debt.",
      "The 181 item-level records comprise 155 account-authored statuses and 26 reposts from 16 public accounts; seven conversation-context statuses were excluded from the account population.",
      "This is a complete disposition of the current profile control, not a platform export or proof that no older status was deleted before capture.",
      "The account was shared and stewardship continued after Jamie's historical involvement ended; no later post or program operation is assigned to Jamie without direct evidence.",
      "No authentication, session, private-message, private-analytics, or personal-transition material entered the repository."
    ]
  }
] satisfies IntakeRecord[];

export const kcTownHallSocialCorpusSources = [
  {
    id: "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026",
    title: "Authenticated @KCTownHall full-population recovery and public-post ledger",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/KCTownHall",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated read-only review of the public @KCTownHall Posts and Replies surfaces, with a 181-record public ledger and two explicit unresolved profile-count slots, July 14, 2026.",
    publicNote:
      "The profile displayed 183 posts. Fine-grained cross-tab reconciliation recovered 181 surviving public timeline items: 155 account-authored statuses and 26 reposts from 16 public accounts. Seven contextual conversation statuses were excluded from the population, and two profile-count slots remain unresolved.",
    supportsGenerally: [
      "complete disposition of the 183-slot live-profile control",
      "181 item-level recoveries and two explicit unresolved slots",
      "155 account-authored statuses and 26 reposts from 16 public accounts",
      "99 account-authored Tired of Tires records",
      "resident-input, public-service, mutual-support, and civic-exchange patterns",
      "133 posted short-link occurrences resolving to 20 unique public destinations"
    ],
    doesNotEstablish: [
      "a complete platform export or deletion history",
      "the identity of two unresolved profile-count slots",
      "Jamie's authorship of every shared-account status",
      "Jamie's operation of later programs after stewardship transitioned",
      "historical impressions, unique people, endorsement, funding support, or independently audited impact"
    ]
  },
  socialPost(
    "SRC-X-KC-TOWN-HALL-LAUNCH-2018",
    "KC Town Hall public identity launch post",
    "https://x.com/KCTownHall/status/1013893135695601665",
    "2018-07-02",
    "KC Town Hall public post inviting participation in building a neighborhood resource and cultural center, July 2, 2018.",
    "The pinned launch record frames the account as a participation surface around a permanent neighborhood resource and cultural center on Indiana Avenue.",
    ["the launch framing of the KC Town Hall public identity", "an invitation to follow and participate"]
  ),
  socialPost(
    "SRC-X-KC-TOWN-HALL-RESIDENT-INPUT-2018",
    "KC Town Hall post thanking Quinton Lucas for project ideas",
    "https://x.com/KCTownHall/status/1024739337282441218",
    "2018-08-01",
    "KC Town Hall public post thanking Quinton Lucas for sharing ideas about affordable housing and small-business opportunities on Indiana Avenue, August 1, 2018.",
    "The record documents a public exchange about affordable housing and small-business possibilities connected to the site.",
    ["public stakeholder exchange", "affordable-housing and small-business project context"],
    ["adoption of any idea", "an official municipal commitment"]
  ),
  socialPost(
    "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-LAUNCH-2019",
    "KC Town Hall Tired of Tires launch post",
    "https://x.com/KCTownHall/status/1124416898064580608",
    "2019-05-03",
    "KC Town Hall public post announcing a free residential tire-pickup program with the Oak Park neighborhood, May 3, 2019.",
    "The record establishes the account's public routing of the recurring Tired of Tires neighborhood program.",
    ["a free residential tire-pickup program", "Oak Park neighborhood collaboration"],
    ["individual operational credit", "the complete number of pickups or participants"]
  ),
  socialPost(
    "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-SAVINGS-2020",
    "KC Town Hall Tired of Tires cumulative savings post",
    "https://x.com/KCTownHall/status/1312530339051393024",
    "2020-10-03",
    "KC Town Hall public post reporting that the Tired of Tires program had saved East Kansas City residents $20,023 in tire-disposal fees, October 3, 2020.",
    "This is a project-reported cumulative outcome in the shared account record, retained with an independent-audit boundary.",
    ["the project's October 2020 reported cumulative disposal-fee savings"],
    ["independent audit of the figure", "Jamie's individual operation of every pickup"]
  ),
  socialPost(
    "SRC-X-KC-TOWN-HALL-CANDIDATE-FORUM-2019",
    "KC Town Hall district candidate-forum post",
    "https://x.com/KCTownHall/status/1102627427992375296",
    "2019-03-04",
    "KC Town Hall public post routing a District 3 and District 4 City Council candidate forum at the Kansas City Public Library, March 4, 2019.",
    "The record shows the project identity used to route neighborhood civic-participation information.",
    ["district candidate-forum routing", "civic-participation use of the account"]
  ),
  socialPost(
    "SRC-X-KC-TOWN-HALL-COVID-RESOURCES-2020",
    "KC Town Hall COVID-19 resource Q&A post",
    "https://x.com/KCTownHall/status/1252344939867824132",
    "2020-04-20",
    "KC Town Hall public post routing a COVID-19 resource Q&A with Pastor Lee and Melissa Robinson, April 20, 2020.",
    "The record shows the project identity used for practical public-health, unemployment, housing, and utility information.",
    ["public-health and relief-resource routing", "community Q&A documentation"],
    ["medical advice", "the authorship of the underlying public guidance"]
  ),
  socialPost(
    "SRC-X-KC-TOWN-HALL-ROBINSON-REPLY-2020",
    "Melissa Robinson reply to KC Town Hall",
    "https://x.com/Robinson4kc/status/1289714535251742726",
    "2020-08-01",
    "Melissa Robinson public reply thanking KC Town Hall for heavy lifting to improve community conditions, August 1, 2020.",
    "A sitting Council member directly replied to the project account in a Tired of Tires result thread.",
    ["direct Council-member account engagement", "public acknowledgment of neighborhood work"],
    ["official Council endorsement", "funding support", "Jamie's individual authorship or sole operational credit"]
  ),
  socialPost(
    "SRC-X-KC-TOWN-HALL-JUSTUS-REPLY-2019",
    "Jolie Justus reply to KC Town Hall",
    "https://x.com/joliejustus/status/1122883010582466560",
    "2019-04-29",
    "Jolie Justus public reply to KC Town Hall about work with the Economic Development Corporation and community support for Leon's Thriftway, April 29, 2019.",
    "A sitting Council member directly replied to a project-account thread about a neighborhood grocery closure.",
    ["direct Council-member account engagement", "public economic-development and community context"],
    ["a saved grocery store", "an official project commitment"]
  ),
  socialPost(
    "SRC-X-KC-TOWN-HALL-LUCAS-REPLY-2019",
    "Quinton Lucas reply in KC Town Hall Leon's Thriftway thread",
    "https://x.com/QuintonLucasKC/status/1122866432130334720",
    "2019-04-29",
    "Quinton Lucas public reply in a KC Town Hall thread about Leon's Thriftway and East Kansas City food access, April 29, 2019.",
    "A sitting Council member directly engaged the project account's neighborhood-grocery thread.",
    ["direct Council-member account engagement", "public food-access context"],
    ["a saved grocery store", "an official project commitment"]
  ),
  {
    id: "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
    title: "Affordable Housing Policy hits the docket in KCMO",
    organization: "Northeast News",
    author: "Paul Thompson",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-09-19",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Paul Thompson, 'Affordable Housing Policy hits the docket in KCMO,' Northeast News, September 19, 2018.",
    publicNote:
      "KC Town Hall linked this reporting about proposed citywide affordable-housing policy. It supplies mission context for the account's civic-information routing; it is not coverage or endorsement of KC Town Hall.",
    supportsGenerally: ["the affordable-housing policy context of one link routed by @KCTownHall"],
    doesNotEstablish: ["press coverage or endorsement of KC Town Hall", "Jamie or KC Town Hall authorship of the article"]
  },
  {
    id: "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018",
    title: "A Cheat Sheet For Tuesday's Primary Election In Missouri",
    organization: "KCUR",
    author: "Erica Hunzinger",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-08-05",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.kcur.org/politics-elections-and-government/2018-08-05/a-cheat-sheet-for-tuesdays-primary-election-in-missouri",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Erica Hunzinger, 'A Cheat Sheet For Tuesday's Primary Election In Missouri,' KCUR, August 5, 2018.",
    publicNote:
      "KC Town Hall linked this election guide and the state polling-place tool on Election Day. It documents civic-information routing, not press coverage or endorsement of KC Town Hall.",
    supportsGenerally: ["the election-information context of one link routed by @KCTownHall"],
    doesNotEstablish: ["press coverage or endorsement of KC Town Hall", "Jamie or KC Town Hall authorship of the guide"]
  }
] satisfies SourceRecord[];

export const kcTownHallSocialCorpusClaims = [
  {
    id: "CLM-KC-TOWN-HALL-COMPLETE-SOCIAL-POPULATION",
    project: "kc-town-hall",
    internalClaim:
      "The complete 183-slot live-profile control is dispositioned as 181 item-level public recoveries and two explicit unresolved slots; the recovered population contains 155 account-authored statuses and 26 reposts from 16 public accounts.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "All 183 profile-count slots were dispositioned: 181 surviving public timeline items were recovered, with two slots retained as unresolved count debt.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-kc-town-hall-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026",
        relationship: "direct-support",
        supports: ["183-slot disposition", "181 item records", "two unresolved slots", "account-status and repost counts"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means every slot in the current profile count has a durable disposition; two slots were not silently converted into recovered items.",
      "This is not a platform export or proof that no older record was deleted before capture."
    ],
    antiClaims: [
      "The ledger is a complete X platform export",
      "All 183 slots were recovered at item level",
      "Jamie authored every shared-account status"
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-DURABLE-PUBLIC-IDENTITY",
    project: "kc-town-hall",
    internalClaim:
      "Jamie established KC Town Hall's public-facing identity and participation surface; the surviving shared-account record shows that identity carrying resident input, neighborhood operations, civic information, and public exchange from July 2018 through September 2022.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text: "Jamie established a public project identity and participation surface that collaborators could carry forward across resident input, neighborhood operations, civic information, and public exchange.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      },
      {
        key: "technical-operations",
        text: "Established a durable public identity and participation system that remained useful across changing programs and stewardship.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-SOCIAL-IDENTITY-ESTABLISHMENT-2026",
        relationship: "private-support",
        supports: ["Jamie's account-establishment role"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KC-TOWN-HALL-LAUNCH-2018",
        relationship: "direct-support",
        supports: ["public launch framing and participation invitation"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026",
        relationship: "corroborating",
        supports: ["public continuity across resident input, neighborhood operations, civic routing, and exchange"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The public record corroborates the identity's use and continuity, while Jamie's setup action is a firsthand source.",
      "The account was shared and later stewardship continued after Jamie's involvement ended; individual posts and later program operations are not assigned to him without direct evidence."
    ],
    antiClaims: [
      "Jamie personally authored every @KCTownHall status",
      "Jamie personally operated every later neighborhood program",
      "Account activity alone proves endorsement, funding support, audience scale, or impact"
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-TIRED-OF-TIRES-RECORD",
    project: "kc-town-hall",
    internalClaim:
      "The surviving corpus contains 99 account-authored Tired of Tires records from May 2019 through September 2022, including recurring free residential pickup notices, pickup results, and a project-reported cumulative $20,023 in resident tire-disposal-fee savings by October 2020.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "The shared account documents a recurring free residential tire-pickup program through 99 surviving account-authored records from 2019 to 2022.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-kc-town-hall-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026",
        relationship: "direct-support",
        supports: ["99 Tired of Tires account records", "2019-2022 date range"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-LAUNCH-2019",
        relationship: "direct-support",
        supports: ["public program launch and free residential pickup"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-SAVINGS-2020",
        relationship: "direct-support",
        supports: ["project-reported $20,023 cumulative disposal-fee savings"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Ninety-nine is a count of account records, not pickups, households, people, tires, or unique program events.",
      "The $20,023 figure is project-reported in the shared account and was not independently audited in this pass.",
      "The social record does not assign individual authorship or later operations to Jamie."
    ],
    antiClaims: [
      "Jamie personally ran all 99 Tired of Tires activities",
      "The program held 99 pickups",
      "The $20,023 figure was independently audited"
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-CIVIC-EXCHANGE",
    project: "kc-town-hall",
    internalClaim:
      "Recoverable public thread context includes direct exchange with at least four elected or city-service accounts: Quinton Lucas, Jolie Justus, Melissa Robinson, and KCMO 311; the account also replied in KCMO Health Department context.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "The account's surviving public threads include direct exchange with at least four elected or city-service accounts.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-kc-town-hall-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-KC-TOWN-HALL-ROBINSON-REPLY-2020",
        relationship: "direct-support",
        supports: ["direct Melissa Robinson engagement"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KC-TOWN-HALL-JUSTUS-REPLY-2019",
        relationship: "direct-support",
        supports: ["direct Jolie Justus engagement"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KC-TOWN-HALL-LUCAS-REPLY-2019",
        relationship: "direct-support",
        supports: ["direct Quinton Lucas engagement"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026",
        relationship: "corroborating",
        supports: ["KCMO 311 and KCMO Health Department conversation context"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The count combines recoverable public thread relationships; it is not a complete reactor census.",
      "Direct account exchange does not establish endorsement, funding support, policy adoption, or Jamie's authorship of the underlying shared-account posts."
    ],
    antiClaims: [
      "Four city actors endorsed KC Town Hall",
      "Social interaction caused the Council allocation",
      "Jamie personally authored every side of the project-account exchanges"
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const kcTownHallSocialCorpusInquiries = [
  {
    id: "INQ-KC-TOWN-HALL-FULL-POPULATION-2026",
    project: "kc-town-hall",
    question:
      "Can the complete @KCTownHall live-profile control be dispositioned and integrated without erasing unresolved slots, collective authorship, later stewardship, source boundaries, or the difference between social exchange and endorsement?",
    methods: [
      "Used the authenticated live profile's displayed 183-post count as the control total.",
      "Harvested the Posts and Replies surfaces separately, repeated the Replies traversal in 420-pixel increments, and deduplicated rendered items by canonical status ID.",
      "Separated 181 primary account-timeline items from seven conversation-context records that appeared only to make reply threads intelligible.",
      "Classified all 181 recovered items by account relationship, theme, mentions, hashtags, visible metrics, media, and posted destination.",
      "Cross-checked reply and stakeholder context through authenticated X search and direct status pages.",
      "Closely read mission-relevant public destinations while distinguishing source context from coverage of KC Town Hall."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "All 183 control slots are dispositioned as 181 item-level recoveries and two explicit unresolved slots.",
      "The recovered account population contains 155 account-authored statuses and 26 reposts from 16 public accounts.",
      "Ninety-nine account-authored statuses concern Tired of Tires operations; 18 concern restoration or resident input; six route civic information; and five route neighborhood mutual support.",
      "The account-authored records contain 130 short-link occurrences across 28 unique short URLs.",
      "Visible July 2026 reactions on account-authored statuses total 22 replies, 70 reposts, and 174 likes; these are mutable status-level observations, not historical analytics or unique people.",
      "Recoverable thread context establishes a floor of four elected or city-service accounts in direct public exchange."
    ],
    limitations: [
      "Two profile-count slots were not recovered and remain unresolved rather than being inferred or silently dropped.",
      "A complete current-profile disposition does not prove that no older item was deleted before July 2026.",
      "The shared account does not identify the individual teammate who composed each status.",
      "Later stewardship continued after Jamie's involvement ended; the social record does not assign later program operations to him.",
      "Visible reaction totals are mutable snapshots and do not expose all reactor identities, impressions, historical reach, endorsement, funding support, or impact.",
      "Outbound articles supply mission context unless they explicitly report on KC Town Hall."
    ],
    sourceIds: [
      "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026",
      "SRC-X-KC-TOWN-HALL-LAUNCH-2018",
      "SRC-X-KC-TOWN-HALL-RESIDENT-INPUT-2018",
      "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-LAUNCH-2019",
      "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-SAVINGS-2020",
      "SRC-X-KC-TOWN-HALL-CANDIDATE-FORUM-2019",
      "SRC-X-KC-TOWN-HALL-COVID-RESOURCES-2020",
      "SRC-X-KC-TOWN-HALL-ROBINSON-REPLY-2020",
      "SRC-X-KC-TOWN-HALL-JUSTUS-REPLY-2019",
      "SRC-X-KC-TOWN-HALL-LUCAS-REPLY-2019",
      "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
      "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018"
    ],
    publicSummary:
      "All 183 live-profile count slots were dispositioned: 181 surviving public timeline items were recovered and two remain explicit unresolved count debt. The public record shows a durable shared identity used for resident input, recurring neighborhood operations, civic information, and public exchange."
  }
] satisfies ResearchInquiry[];

export const kcTownHallSocialCorpusPublicationDecisions = [
  {
    id: "PUB-KC-TOWN-HALL-DURABLE-PUBLIC-IDENTITY",
    claimId: "CLM-KC-TOWN-HALL-DURABLE-PUBLIC-IDENTITY",
    decision: "selected",
    audiences: ["hiring managers", "product-operations leaders", "public-interest technology peers"],
    surfaces: ["/work/kc-town-hall", "/work/technical-operations"],
    rationale:
      "Makes Jamie's systems contribution legible as a durable public identity and participation surface while preserving collective authorship and later-stewardship boundaries.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-KC-TOWN-HALL-COMPLETE-SOCIAL-POPULATION",
    claimId: "CLM-KC-TOWN-HALL-COMPLETE-SOCIAL-POPULATION",
    decision: "reserve",
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-kc-town-hall-full-population-social-corpus"],
    rationale:
      "The population audit strengthens provenance and future composition, but the census is supporting evidence rather than the case study's main argument.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-KC-TOWN-HALL-TIRED-OF-TIRES-RECORD",
    claimId: "CLM-KC-TOWN-HALL-TIRED-OF-TIRES-RECORD",
    decision: "reserve",
    audiences: ["future editors", "community-operations peers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-kc-town-hall-full-population-social-corpus"],
    rationale:
      "Preserves a substantial recurring-program record without assigning later operations to Jamie or promoting a project-reported savings figure as independently audited impact.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-KC-TOWN-HALL-CIVIC-EXCHANGE",
    claimId: "CLM-KC-TOWN-HALL-CIVIC-EXCHANGE",
    decision: "reserve",
    audiences: ["future editors", "civic-technology peers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-kc-town-hall-full-population-social-corpus"],
    rationale:
      "Retains useful stakeholder evidence while keeping direct account exchange distinct from endorsement, funding support, and Council-allocation causality.",
    decidedAt: "2026-07-14"
  }
] satisfies PublicationDecision[];

export const kcTownHallSocialCorpusProofCoverage = [
  {
    proofId: "kc-town-hall-public-identity-infrastructure",
    status: "source-backed",
    sourceIds: [
      "SRC-JAMIE-SOCIAL-IDENTITY-ESTABLISHMENT-2026",
      "SRC-X-KC-TOWN-HALL-LAUNCH-2018",
      "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026"
    ],
    inquiryIds: ["INQ-KC-TOWN-HALL-FULL-POPULATION-2026", "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP"],
    note:
      "Jamie confirms establishing the account; the public launch and full surviving corpus support its participation function and continuity, while shared authorship and later stewardship remain explicit.",
    reviewedAt: "2026-07-14"
  }
] satisfies ProofCoverage[];
