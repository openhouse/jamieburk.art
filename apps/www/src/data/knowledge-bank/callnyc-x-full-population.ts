import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated CallNYC archival review"
];

const callNycPost = (
  id: string,
  title: string,
  publishedAt: string,
  canonicalUrl: string,
  publicCitation: string,
  supportsGenerally: string[],
  doesNotEstablish: string[] = []
): SourceRecord => ({
  id,
  title,
  author: "Call NYC (@CallNYCapp)",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: reviewedAt,
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote:
    "A public project-account post establishes what the account published. It identifies an individual author only when the post itself does so.",
  supportsGenerally,
  doesNotEstablish
});

export const callNycFullPopulationSources: SourceRecord[] = [
  {
    id: "SRC-CALLNYC-X-CORPUS-2026-07-14",
    title: "Authenticated CallNYC full recoverable timeline corpus",
    author: "Codex authenticated browser review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/CallNYCapp/with_replies",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated item-level review of the replies-inclusive @CallNYCapp timeline, July 14-15, 2026.",
    publicNote:
      "The profile reported 110 posts. Repeated complete timeline passes rendered 107 distinct items: 92 authored posts and 15 reposts. The public repository preserves every recoverable item and retains the three-count difference as unresolved.",
    supportsGenerally: [
      "the complete recoverable public timeline population on the capture date",
      "71 service-recognition posts naming 26 Council members",
      "61 distinct normalized CallNYC issue-page destinations",
      "dated visible engagement and outgoing-link patterns",
      "public account stewardship and civic-resource curation"
    ],
    doesNotEstablish: [
      "the identity of the three profile-counted items that did not render",
      "deleted, hidden, private, or otherwise unavailable activity",
      "complete lifetime engagement",
      "Jamie's authorship of every account post",
      "official City sponsorship or policy causation"
    ]
  },
  callNycPost(
    "SRC-CALLNYC-X-LAUNCH-2016",
    "CallNYC launch announcement",
    "2016-03-05",
    "https://x.com/CallNYCapp/status/706208629360304128",
    "Call NYC announced CallNYC.org on March 5, 2016 as a project using New York City Council constituent-services data.",
    [
      "public launch timing",
      "Council constituent-services data as the product input",
      "open-data framing"
    ],
    ["official Council sponsorship", "first-ever use of the data by any party"]
  ),
  callNycPost(
    "SRC-CALLNYC-X-JAMIE-IDENTITY-2016",
    "CallNYC launch-period first-person identification",
    "2016-03-16",
    "https://x.com/CallNYCapp/status/710150246781882369",
    "A March 16, 2016 @CallNYCapp reply identifies the speaker as Jamie Burkart and describes CallNYC as his first civic-technology project.",
    ["Jamie's public first-person use of the project account", "Jamie's relationship to CallNYC at launch"],
    ["sole account creation", "authorship of every later post", "exclusive project ownership"]
  ),
  callNycPost(
    "SRC-CALLNYC-X-API-2016",
    "CallNYC Council-member JSON API announcement",
    "2016-04-20",
    "https://x.com/CallNYCapp/status/722837286476390401",
    "Call NYC publicly described a JSON interface for retrieving New York City Council members' Twitter usernames on April 20, 2016.",
    ["a public technical interface supporting Council-contact data", "API-oriented implementation work"],
    ["current API availability", "official Council API status", "complete API documentation"]
  ),
  callNycPost(
    "SRC-CALLNYC-X-AWARDS-METHOD-2016",
    "CallNYC CouncilStat service-recognition method",
    "2016-05-04",
    "https://x.com/CallNYCapp/status/727878157076959232",
    "Call NYC stated that its Council-member service recognitions were based on CouncilStat constituent-services open data.",
    ["the stated data basis for the service-recognition posts", "a repeatable public communication pattern"],
    ["a formal Council award program", "comparable CouncilStat use across every district office", "service quality beyond the source data"]
  ),
  callNycPost(
    "SRC-CALLNYC-X-RENT-FREEZE-RESOURCE-2016",
    "CallNYC SCRIE and Rent Freeze resource post",
    "2016-05-19",
    "https://x.com/CallNYCapp/status/733388862806982656",
    "Call NYC linked residents to the City's Rent Freeze page and a SCRIE how-to video in a May 19, 2016 post.",
    ["mission-relevant linkage to official benefit information", "resource curation beyond project pages"],
    ["current eligibility guidance", "legal or benefits advice", "program enrollment caused by the post"]
  ),
  callNycPost(
    "SRC-CALLNYC-X-HOMELESSNESS-RESOURCE-2016",
    "CallNYC eviction-prevention legal-services resource post",
    "2016-05-09",
    "https://x.com/CallNYCapp/status/729757799647981570",
    "Call NYC amplified a City homelessness-prevention resource listing free anti-eviction legal services on May 9, 2016.",
    ["mission-relevant linkage to City and legal-services resources", "resource curation for housing concerns"],
    ["legal advice", "service availability today", "resident outcomes caused by the post"]
  ),
  {
    id: "SRC-CALLNYC-GIZMODO-RENTER-BE-AWARE-2016",
    title: "Check the History of Any NYC Address Through Its 311 Complaint Record",
    organization: "Gizmodo",
    author: "Alissa Walker",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-10",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://gizmodo.com/check-the-history-of-complaints-at-any-nyc-address-with-1764099069",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Alissa Walker, 'Check the History of Any NYC Address Through Its 311 Complaint Record,' Gizmodo, March 10, 2016.",
    publicNote:
      "CallNYC linked this peer civic-technology article on March 17, 2016. It provides ecosystem context, not evidence that Jamie built the project it covers.",
    supportsGenerally: [
      "the contemporaneous civic-technology context CallNYC publicly curated",
      "a peer pattern of translating 311 data into resident-facing information"
    ],
    doesNotEstablish: [
      "Jamie's authorship of Renter Be Aware",
      "a formal collaboration",
      "CallNYC usage or outcomes"
    ]
  }
];

export const callNycFullPopulationClaims: ClaimRecord[] = [
  {
    id: "CLM-CALLNYC-PRODUCT-ITERATION-DECISIONS",
    project: "callnyc",
    internalClaim:
      "Contemporaneous reporting and project-account records document Jamie making concrete data-quality, communication-channel, technical-interface, sharing, and search-discovery decisions while developing CallNYC.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "Jamie filtered records to reduce out-of-city and spam entries, added Council-member Twitter contacts after learning that some residents were wary of calling, exposed a small JSON interface, and designed issue pages for sharing and search discovery.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/callnyc"],
        rationale:
          "Show the product judgment beneath the interface with direct attribution and without inflating informal conversations into representative research."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
        relationship: "direct-support",
        supports: [
          "borough-based filtering",
          "resident communication preferences",
          "social sharing",
          "search discovery",
          "rapid implementation"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLNYC-X-API-2016",
        relationship: "corroborating",
        supports: ["public JSON interface for Council-member Twitter usernames"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The communication-preference evidence came from conversations with neighbors and friends, not a representative usability study.",
      "The API post establishes a public interface at the time, not current availability or complete documentation."
    ],
    antiClaims: [
      "CallNYC completed a representative usability study",
      "the filtering removed every bad record",
      "search optimization produced a measured conversion rate",
      "the API remains current"
    ],
    researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-CALLNYC-SOCIAL-TRACTION-OBSERVATION",
    project: "callnyc",
    internalClaim:
      "On July 14, 2026, 59 of 92 recoverable authored posts displayed at least one reply, repost, or like; visible totals were eight replies, 74 reposts, and 111 likes.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "A dated account observation found visible engagement on 59 of 92 recoverable authored posts; the totals remain in the archive because platform metrics are unstable and incomplete.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Retain a reproducible dated observation without turning volatile platform labels into a headline accomplishment."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-X-CORPUS-2026-07-14",
        relationship: "direct-support",
        supports: ["dated visible engagement labels", "authored-post denominator", "aggregate replies, reposts, and likes"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Metrics are a July 14, 2026 observation and may omit historical engagement that was deleted, hidden, private, or no longer rendered.",
      "Reposted items and their original-post engagement were excluded from CallNYC traction totals.",
      "The result measures visible platform interactions, not resident outcomes or policy impact."
    ],
    antiClaims: [
      "these are complete lifetime engagement totals",
      "every interaction came from a resident or decision-maker",
      "engagement proves service use or policy causation"
    ],
    researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-CALLNYC-ACCOUNT-STEWARDSHIP",
    project: "callnyc",
    internalClaim:
      "A launch-period @CallNYCapp reply identifies Jamie by name and calls CallNYC his first civic-technology project, directly supporting his first-person stewardship of the project account at launch.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "A launch-period post from the project account identifies Jamie by name and describes CallNYC as his first civic-technology project.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/callnyc"],
        rationale:
          "Preserve a directly attributable account-stewardship record in the deeper bank without assigning Jamie every account post."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-X-JAMIE-IDENTITY-2016",
        relationship: "direct-support",
        supports: ["first-person identification", "launch-period account use", "Jamie's relationship to CallNYC"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
        relationship: "corroborating",
        supports: ["Jamie's independent development of CallNYC"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The post supports launch-period account stewardship, not exclusive account creation or authorship of every post.",
      "Later account output remains attributed to the project account unless authorship is documented."
    ],
    antiClaims: [
      "Jamie alone authored every @CallNYCapp post",
      "the post proves sole account creation",
      "the post proves exclusive project ownership"
    ],
    researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  }
];

export const callNycFullPopulationInquiries: ResearchInquiry[] = [
  {
    id: "INQ-CALLNYC-X-FULL-POPULATION-2026",
    project: "callnyc",
    question:
      "What does the full recoverable @CallNYCapp population establish about product strategy, public documentation, mission-relevant sources, stakeholder engagement, and visible traction?",
    methods: [
      "Verified Jamie's authenticated @urbanhermit Chrome session and the 110-post profile baseline.",
      "Swept the replies-inclusive timeline in overlapping passes, deduplicated canonical status URLs, and continued until repeated bottom passes added no records.",
      "Cross-checked the authored-post search, media surface, bounded Wayback status results, and the item-level capture chain.",
      "Preserved every recoverable item with date, type, visible text, engagement label, mentions, outgoing links, and media presence.",
      "Separated authored posts from reposts, derived counts with a committed script, resolved mission-relevant links, and close-read contemporaneous Politico coverage.",
      "Reconciled project output separately from the authenticated Council-member response ledger."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "All 107 distinct items recoverable from the authenticated timeline were inventoried: 92 authored posts and 15 reposts spanning March 5-November 14, 2016.",
      "Seventy-one authored posts used a service-recognition pattern naming 26 Council members; 82 authored posts mentioned @NYCCouncil.",
      "Eighty-seven authored posts carried outgoing links; 85 internal link occurrences resolved to 63 normalized CallNYC destinations and 61 issue pages; 75 authored posts used visible media.",
      "The corpus contains 98 outgoing-link occurrences represented by 84 distinct short URLs, including 13 links outside CallNYC.",
      "Fifty-nine authored posts retained at least one visible interaction; dated totals were eight replies, 74 reposts, and 111 likes.",
      "The separate stakeholder-response audit recovered engagement from at least 20 serving Council-member accounts, including eight member-authored posts or replies.",
      "A launch-period post identifies Jamie by name and calls CallNYC his first civic-technology project.",
      "Politico documented borough-based filtering, communication-channel iteration, social sharing, search discovery, and rapid delivery."
    ],
    limitations: [
      "The profile reported 110 posts, leaving three unresolved items beyond the 107 distinct records the timeline rendered.",
      "X's from-account search returned only a 47-post subset; the media surface and bounded Wayback query added no missing status URL.",
      "Visible metrics are dated observations and may omit deleted, hidden, private, or platform-suppressed activity.",
      "The account corpus cannot identify the author of every post or prove resident outcomes, formal City sponsorship, endorsement, or policy causation."
    ],
    sourceIds: [
      "SRC-CALLNYC-X-CORPUS-2026-07-14",
      "SRC-CALLNYC-X-PROFILE-2026",
      "SRC-CALLNYC-X-LAUNCH-2016",
      "SRC-CALLNYC-X-JAMIE-IDENTITY-2016",
      "SRC-CALLNYC-X-API-2016",
      "SRC-CALLNYC-X-AWARDS-METHOD-2016",
      "SRC-CALLNYC-X-RENT-FREEZE-RESOURCE-2016",
      "SRC-CALLNYC-X-HOMELESSNESS-RESOURCE-2016",
      "SRC-CALLNYC-GIZMODO-RENTER-BE-AWARE-2016",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-SOCIAL-ARCHIVE-INVENTORY-2026"
    ],
    publicSummary:
      "A complete authenticated archival pass inventories every one of the 107 distinct CallNYC timeline items recoverable on July 14-15, 2026, derives bounded product and stakeholder patterns, and preserves a three-item profile-count discrepancy for further research."
  }
];

export const callNycFullPopulationIntake = [
  {
    id: "INT-CALLNYC-X-FULL-POPULATION-2026",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "public-safe",
    title: "CallNYC full recoverable X population",
    description:
      "Authenticated item-level corpus of all 107 distinct timeline items recoverable against a 110-post profile baseline, with authored posts, reposts, links, mentions, media, and visible engagement kept separate.",
    whyItMatters:
      "Turns a public timeline into reproducible evidence about Jamie's product decisions, account stewardship, civic-resource curation, communication system, and bounded stakeholder traction.",
    projectIds: ["callnyc"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Promoted product-decision and public-feedback claims; retained volatile traction as a held archive note and preserved the three-item discrepancy as an open limitation.",
    sourceIds: callNycFullPopulationSources.map((source) => source.id),
    claimIds: [
      "CLM-CALLNYC-SOCIAL-PUBLIC-FEEDBACK-LOOP",
      "CLM-CALLNYC-PRODUCT-ITERATION-DECISIONS",
      "CLM-CALLNYC-SOCIAL-TRACTION-OBSERVATION",
      "CLM-CALLNYC-ACCOUNT-STEWARDSHIP"
    ],
    inquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    artifactPaths: [
      "docs/knowledge-bank/corpora/callnyc-x-full-population-2026-07-14.json",
      "docs/knowledge-bank/corpora/callnyc-x-full-population-2026-07-14.manifest.json",
      "docs/knowledge-bank/corpora/source-captures/callnyc-x-browser-extraction-2026-07-15-utc.json",
      "scripts/derive-callnyc-x-corpus.mjs"
    ],
    boundaries: [
      "Do not describe 107 recovered items as all 110 profile-reported posts.",
      "Do not combine outbound recognition posts with incoming Council-member engagement.",
      "Do not treat visible platform metrics as complete lifetime analytics or policy impact.",
      "Do not assign every project-account post to Jamie."
    ]
  }
] satisfies IntakeRecordInput[];
