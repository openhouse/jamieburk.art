import type {
  CitationPage,
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated social-media archival review"
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
  author: "Call NYC",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-14",
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote:
    "A public project-account post is evidence of what the account published. It does not identify the author of every post unless the text does so.",
  supportsGenerally,
  doesNotEstablish
});

export const callNycXFullPopulationBatch20260714: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
  pages: CitationPage[];
} = {
  intake: [
    {
      id: "INT-CALLNYC-X-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "Authenticated replies-inclusive @CallNYCapp timeline",
      publicSafeSummary:
        "A governed item-level inventory of every distinct CallNYC timeline item recoverable through the authenticated profile on July 14, 2026, with authored posts, reposts, outgoing links, mentions, media, and visible engagement kept separate.",
      projects: ["callnyc"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        "SRC-CALLNYC-X-CORPUS-2026-07-14",
        "SRC-CALLNYC-X-LAUNCH-2016",
        "SRC-CALLNYC-X-JAMIE-IDENTITY-2016",
        "SRC-CALLNYC-X-API-2016",
        "SRC-CALLNYC-X-AWARDS-METHOD-2016",
        "SRC-CALLNYC-X-RENT-FREEZE-RESOURCE-2016",
        "SRC-CALLNYC-X-HOMELESSNESS-RESOURCE-2016",
        "SRC-CALLNYC-GIZMODO-RENTER-BE-AWARE-2016"
      ],
      claimIds: [
        "CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM",
        "CLM-CALLNYC-PRODUCT-ITERATION-DECISIONS",
        "CLM-CALLNYC-SOCIAL-TRACTION-OBSERVATION",
        "CLM-CALLNYC-ACCOUNT-STEWARDSHIP"
      ],
      researchTaskIds: [
        "TASK-CALLNYC-X-COUNT-RECONCILIATION",
        "TASK-CALLNYC-X-LINK-PRESERVATION"
      ],
      notes: [
        "The profile reported 110 posts. Repeated bottom-of-timeline passes recovered 107 distinct items: 92 authored posts and 15 reposts.",
        "The item-level corpus accounts for 100% of the 107 recoverable items. The remaining three-count discrepancy is explicit and research-queued.",
        "No private messages, account settings, follower exports, or non-public analytics were inspected."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "INT-CALLNYC-POLITICO-CLOSE-READ-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "Local archived Politico New York article and posted short URL",
      publicSafeSummary:
        "A close reading of contemporaneous Politico coverage recovered concrete product and implementation decisions behind CallNYC.",
      projects: ["callnyc"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"],
      claimIds: ["CLM-CALLNYC-PRODUCT-ITERATION-DECISIONS"],
      researchTaskIds: [],
      notes: [
        "The article is independent reporting and directly attributes the filtering, communication-channel, sharing, and search-discovery decisions to Jamie.",
        "The article does not establish a formal usability study, conversion rate, or official Council commission."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-CALLNYC-X-CORPUS-2026-07-14",
      title: "Authenticated CallNYC full recoverable timeline corpus",
      author: "Codex authenticated browser review",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "2026-07-14",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://x.com/CallNYCapp/with_replies",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Authenticated item-level review of the replies-inclusive @CallNYCapp timeline, July 14, 2026.",
      publicNote:
        "The profile reported 110 posts. Repeated complete timeline passes rendered 107 distinct items: 92 authored posts and 15 reposts. The public repository preserves all 107 recoverable items and retains the three-count discrepancy as unresolved.",
      supportsGenerally: [
        "the complete recoverable public timeline population on the capture date",
        "seventy-one service-recognition posts naming twenty-six Council members",
        "sixty-five distinct linked CallNYC service destinations",
        "dated visible engagement and outgoing-link patterns",
        "public account stewardship and civic-resource curation"
      ],
      doesNotEstablish: [
        "the identity of the missing three profile-count items",
        "deleted, hidden, private, or otherwise unavailable activity",
        "historical engagement that is no longer visible",
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
      ["public launch timing", "Council constituent-services data as the product input", "open-data framing"],
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
      "Call NYC publicly described a JSON API for retrieving New York City Council members' Twitter usernames on April 20, 2016.",
      ["a public technical interface supporting Council-contact data", "API-oriented implementation work"],
      ["current API availability", "official Council API status", "complete API documentation"]
    ),
    callNycPost(
      "SRC-CALLNYC-X-AWARDS-METHOD-2016",
      "CallNYC CouncilStat service-recognition method",
      "2016-05-04",
      "https://x.com/CallNYCapp/status/727878157076959232",
      "Call NYC stated that its Council-member service awards were based on CouncilStat constituent-services open data.",
      ["the stated data basis for service-recognition posts", "a repeatable public-communication pattern"],
      ["a formal Council award program", "comparability across every district office", "service quality beyond what the source data recorded"]
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
      accessedAt: "2026-07-14",
      canonicalUrl:
        "https://gizmodo.com/check-the-history-of-complaints-at-any-nyc-address-with-1764099069",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Alissa Walker, 'Check the History of Any NYC Address Through Its 311 Complaint Record,' Gizmodo, March 10, 2016.",
      publicNote:
        "CallNYC linked this peer civic-technology article on March 17, 2016. It is context for the open-data ecosystem, not evidence that Jamie built the featured extension.",
      supportsGenerally: [
        "the contemporaneous civic-technology context CallNYC publicly curated",
        "a peer pattern of translating 311 data into resident-facing information"
      ],
      doesNotEstablish: [
        "Jamie's authorship of Renter Be Aware",
        "a formal collaboration between CallNYC and the article's subjects",
        "CallNYC usage or outcomes"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-CALLNYC-X-LAUNCH-2016",
      sourceId: "SRC-CALLNYC-X-LAUNCH-2016",
      project: "callnyc",
      assertion:
        "The account publicly launched CallNYC.org on March 5, 2016 and described New York City Council constituent-services data as the project's input.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-AWARDS-METHOD-2016",
      sourceId: "SRC-CALLNYC-X-AWARDS-METHOD-2016",
      project: "callnyc",
      assertion:
        "The account said its Council-member service recognitions were based on CouncilStat constituent-services open data.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-RENT-FREEZE-RESOURCE-2016",
      sourceId: "SRC-CALLNYC-X-RENT-FREEZE-RESOURCE-2016",
      project: "callnyc",
      assertion:
        "The account linked a City Rent Freeze destination and a SCRIE how-to video while explaining that SCRIE is a rent-freeze program for seniors.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-HOMELESSNESS-RESOURCE-2016",
      sourceId: "SRC-CALLNYC-X-HOMELESSNESS-RESOURCE-2016",
      project: "callnyc",
      assertion:
        "The account linked a City homelessness-prevention destination while amplifying free anti-eviction legal-services information.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-POPULATION-2026",
      sourceId: "SRC-CALLNYC-X-CORPUS-2026-07-14",
      project: "callnyc",
      assertion:
        "The profile reported 110 posts; repeated replies-inclusive timeline passes recovered 107 distinct items, comprising 92 authored posts and 15 reposts.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-POPULATION-GAP-2026",
      sourceId: "SRC-CALLNYC-X-CORPUS-2026-07-14",
      project: "callnyc",
      assertion:
        "Three items implied by the profile count were not identifiable in the rendered timeline, X's from-account search, or the bounded Wayback status query.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM", "CLM-CALLNYC-SOCIAL-TRACTION-OBSERVATION"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-RECOGNITION-SYSTEM-2026",
      sourceId: "SRC-CALLNYC-X-CORPUS-2026-07-14",
      project: "callnyc",
      assertion:
        "Seventy-one authored posts used the service-recognition pattern and named twenty-six distinct Council-member accounts across resident issue categories.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-ISSUE-DESTINATIONS-2026",
      sourceId: "SRC-CALLNYC-X-CORPUS-2026-07-14",
      project: "callnyc",
      assertion:
        "Eighty-seven of ninety-two authored posts carried outgoing links; eighty-five link occurrences pointed to sixty-five distinct displayed CallNYC destinations.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-VISUAL-SYSTEM-2026",
      sourceId: "SRC-CALLNYC-X-CORPUS-2026-07-14",
      project: "callnyc",
      assertion:
        "Seventy-five of ninety-two authored posts contained visible media links, consistent with a repeated visual recognition and issue-pathway system.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-TRACTION-2026",
      sourceId: "SRC-CALLNYC-X-CORPUS-2026-07-14",
      project: "callnyc",
      assertion:
        "Fifty-nine of ninety-two authored posts displayed at least one reply, repost, or like on July 14, 2026; visible totals were eight replies, seventy-four reposts, and 111 likes.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-SOCIAL-TRACTION-OBSERVATION"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-EXTERNAL-SOURCES-2026",
      sourceId: "SRC-CALLNYC-X-CORPUS-2026-07-14",
      project: "callnyc",
      assertion:
        "Thirteen external link occurrences connected the account to City benefit and legal-services resources, peer civic-technology projects, open-data infrastructure, transportation reporting, and CallNYC press coverage.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-JAMIE-STEWARDSHIP-2016",
      sourceId: "SRC-CALLNYC-X-JAMIE-IDENTITY-2016",
      project: "callnyc",
      assertion:
        "A launch-period reply from @CallNYCapp identifies the speaker as Jamie Burkart and describes CallNYC as his first civic-technology project.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-ACCOUNT-STEWARDSHIP"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-X-API-2016",
      sourceId: "SRC-CALLNYC-X-API-2016",
      project: "callnyc",
      assertion:
        "The account announced a JSON API for Council-member Twitter usernames, documenting a technical interface beneath the public contact pathway.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-PRODUCT-ITERATION-DECISIONS"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-POLITICO-FILTERING-2016",
      sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
      project: "callnyc",
      assertion:
        "Politico reported that Jamie limited records to entries with a borough to reduce out-of-city queries and spam.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-PRODUCT-ITERATION-DECISIONS"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-POLITICO-CONTACT-ITERATION-2016",
      sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
      project: "callnyc",
      assertion:
        "Politico reported that conversations with neighbors and friends led Jamie to add Council-member Twitter contacts for people wary of making phone calls.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-PRODUCT-ITERATION-DECISIONS"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-POLITICO-DISCOVERY-2016",
      sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
      project: "callnyc",
      assertion:
        "Politico reported that Jamie designed for social sharing and search discovery so issue queries such as eviction help could reach the site.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-PRODUCT-ITERATION-DECISIONS"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-GIZMODO-PEER-CONTEXT-2016",
      sourceId: "SRC-CALLNYC-GIZMODO-RENTER-BE-AWARE-2016",
      project: "callnyc",
      assertion:
        "The account linked contemporaneous reporting on a peer project that translated 311 complaint data into renter-facing address information.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM",
      project: "callnyc",
      internalClaim:
        "CallNYC operationalized constituent-services data through a repeatable public communication system: seventy-one service-recognition posts named twenty-six Council members, and outgoing links reached sixty-five distinct displayed CallNYC issue destinations.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: false,
      projections: [
        {
          key: "case-study",
          text:
            "The public account turned the prototype into a repeatable engagement system: the recoverable corpus contains 71 service-recognition posts naming 26 Council members and links to 65 distinct CallNYC issue destinations.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/callnyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CALLNYC-X-CORPUS-2026-07-14",
          relationship: "direct-support",
          supports: ["complete recoverable item inventory", "service-recognition count", "Council-member count", "linked issue-destination count"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CALLNYC-X-AWARDS-METHOD-2016",
          relationship: "corroborating",
          supports: ["stated CouncilStat basis for the recognition pattern"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The account reported 110 posts; this claim describes all 107 distinct items recoverable from the authenticated replies-inclusive timeline and explicitly retains a three-count gap.",
        "The twenty-six members were named by CallNYC; this is not a claim that all twenty-six engaged back.",
        "The account's data reflected different office adoption and usage patterns and should not be read as a complete service-quality ranking."
      ],
      antiClaims: [
        "All 110 profile-reported items were individually recovered",
        "Twenty-six Council members engaged with CallNYC",
        "The recognition posts were formal City awards",
        "Jamie authored every account post",
        "CallNYC was an official City service"
      ],
      researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-CALLNYC-PRODUCT-ITERATION-DECISIONS",
      project: "callnyc",
      internalClaim:
        "Contemporaneous reporting documents Jamie making concrete data-quality, communication-channel, technical-interface, sharing, and search-discovery decisions while developing CallNYC.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: false,
      projections: [
        {
          key: "case-study",
          text:
            "Jamie filtered records to reduce out-of-city and spam entries, added Council Twitter contacts after hearing that some residents preferred written contact, exposed a small JSON interface, and designed issue pages for sharing and search discovery.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/callnyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
          relationship: "direct-support",
          supports: ["borough-based filtering", "resident communication preferences", "social sharing", "search discovery", "fast-turnaround implementation"],
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
        "The resident-preference evidence came from conversations with neighbors and friends, not a documented representative usability study.",
        "The API post establishes a public interface at the time, not current availability or complete documentation."
      ],
      antiClaims: [
        "CallNYC completed a representative usability study",
        "The filtering removed every bad record",
        "Search optimization produced a measured conversion rate",
        "The API remains current"
      ],
      researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-CALLNYC-SOCIAL-TRACTION-OBSERVATION",
      project: "callnyc",
      internalClaim:
        "On July 14, 2026, fifty-nine of ninety-two recoverable authored posts displayed at least one reply, repost, or like; visible totals were eight replies, seventy-four reposts, and 111 likes.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: [
        {
          key: "archive-note",
          text:
            "A dated account observation found visible engagement on 59 of 92 recoverable authored posts; the totals remain in the archive because platform metrics are unstable and incomplete.",
          status: "hold",
          citationRequired: true,
          surfaces: []
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
        "These are complete lifetime engagement totals",
        "Every interaction came from a resident or decision-maker",
        "Engagement proves service use or policy causation"
      ],
      researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-CALLNYC-ACCOUNT-STEWARDSHIP",
      project: "callnyc",
      internalClaim:
        "A launch-period @CallNYCapp reply identifies Jamie by name and calls CallNYC his first civic-technology project, directly supporting his first-person stewardship of the project account at launch.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: false,
      projections: [
        {
          key: "archive-note",
          text:
            "A launch-period post from the project account identifies Jamie by name and describes CallNYC as his first civic-technology project.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/callnyc"]
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
        "Later account output must still be attributed to the project account unless authorship is documented."
      ],
      antiClaims: [
        "Jamie alone authored every @CallNYCapp post",
        "The post proves sole account creation",
        "The post proves exclusive project ownership"
      ],
      researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-CALLNYC-X-COUNT-RECONCILIATION",
      project: "callnyc",
      question:
        "What accounts for the three-item difference between the profile-reported 110 posts and the 107 distinct items recoverable from the authenticated replies-inclusive timeline?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Request or locate a lawful complete account export if account administration permits",
        "Search local project archives for historical tweet indexes or exports",
        "Run bounded Wayback and public-web searches for status URLs not present in the live corpus"
      ],
      successCriteria: [
        "Identify the three records with canonical URLs and dates or document why they are unavailable",
        "Keep removed reposts, authored posts, and platform-count residue distinct",
        "Never convert an unrecovered item into a claim that it did not exist"
      ],
      sourceIds: ["SRC-CALLNYC-X-CORPUS-2026-07-14"],
      claimIds: ["CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM"],
      publicSummary:
        "Reconcile the three-count gap without weakening the complete 107-item recoverable corpus.",
      reviewedAt: "2026-07-14"
    },
    {
      id: "TASK-CALLNYC-X-LINK-PRESERVATION",
      project: "callnyc",
      question:
        "Which historically posted external resources require archived replacements or preservation notes?",
      priority: "low",
      status: "queued",
      methodsPlanned: [
        "Check bounded Wayback captures for 311Buddy, NYC Technology Working Group, Council Labs, BetaNYC Talk, WOW List, and popular.vote",
        "Prefer authoritative archived destinations over broken short links",
        "Preserve source authorship and do not turn peer projects into Jamie accomplishments"
      ],
      successCriteria: [
        "Classify all thirteen external link occurrences as live, archived, redirected, or dead",
        "Attach archived URLs where public-safe captures exist",
        "Keep contextual sources separate from direct evidence of Jamie's work"
      ],
      sourceIds: [
        "SRC-CALLNYC-X-CORPUS-2026-07-14",
        "SRC-CALLNYC-GIZMODO-RENTER-BE-AWARE-2016"
      ],
      claimIds: [],
      publicSummary:
        "Preserve the account's linked civic-resource ecosystem without overstating what those sources establish.",
      reviewedAt: "2026-07-14"
    }
  ],
  researchInquiries: [
    {
      id: "INQ-CALLNYC-X-FULL-POPULATION-2026",
      project: "callnyc",
      question:
        "What does the full recoverable @CallNYCapp post population establish about product strategy, public documentation, mission-relevant sources, stakeholder engagement, and visible traction?",
      methods: [
        "Verified the authenticated @urbanhermit browser session and opened the replies-inclusive @CallNYCapp profile.",
        "Scrolled through the complete rendered timeline in overlapping increments, deduplicated canonical status URLs, and continued after repeated bottom-of-timeline passes produced no new items.",
        "Cross-checked authored posts against X's from-account search and media surface, then ran a bounded Wayback status query.",
        "Preserved every recoverable item in a public-safe JSON corpus with date, type, visible text, engagement label, mentions, outgoing links, and media presence.",
        "Separated authored posts from reposts, parsed visible engagement only for authored posts, resolved mission-relevant short links, and close-read the archived Politico article.",
        "Decomposed the corpus into atomic assertions, bounded claims, anti-claims, research tasks, and selective public projection."
      ],
      runAt: "2026-07-14",
      resultStatus: "partially-recovered",
      findings: [
        "All 107 distinct items recoverable from the authenticated timeline were inventoried: 92 authored posts and 15 reposts spanning March 5-November 14, 2016.",
        "Seventy-one authored posts used a service-recognition pattern naming twenty-six Council members; eighty-two authored posts mentioned @NYCCouncil.",
        "Eighty-seven authored posts carried outgoing links; eighty-five internal link occurrences represented sixty-five distinct displayed CallNYC destinations, and seventy-five authored posts used visible media.",
        "Fifty-nine authored posts retained at least one visible interaction; dated totals were eight replies, seventy-four reposts, and 111 likes.",
        "Thirteen external link occurrences connected CallNYC to official benefits and legal-services resources, peer civic-technology projects, open-data infrastructure, transportation reporting, and the project's Politico coverage.",
        "A launch-period post identifies Jamie by name and calls CallNYC his first civic-technology project; the post supports account stewardship at launch without proving authorship of every post.",
        "Politico documented concrete implementation choices: borough-based filtering, communication-channel iteration, social sharing, search discovery, and rapid delivery."
      ],
      limitations: [
        "The profile reported 110 posts, leaving three unreconciled items beyond the 107 distinct records the timeline rendered.",
        "X's from-account search returned only a forty-seven-post subset and added no new status URLs.",
        "The bounded Wayback query recovered two known authored statuses and one media URL, not the missing three records.",
        "Visible metrics are current observations and may omit historical, deleted, hidden, private, or suppressed engagement.",
        "The account corpus cannot identify the author of each post or prove resident outcomes, formal City sponsorship, or policy causation."
      ],
      sourceIds: [
        "SRC-CALLNYC-X-CORPUS-2026-07-14",
        "SRC-CALLNYC-X-LAUNCH-2016",
        "SRC-CALLNYC-X-JAMIE-IDENTITY-2016",
        "SRC-CALLNYC-X-API-2016",
        "SRC-CALLNYC-X-AWARDS-METHOD-2016",
        "SRC-CALLNYC-X-RENT-FREEZE-RESOURCE-2016",
        "SRC-CALLNYC-X-HOMELESSNESS-RESOURCE-2016",
        "SRC-CALLNYC-GIZMODO-RENTER-BE-AWARE-2016",
        "SRC-CALLNYC-POLITICO-2016-03-14"
      ],
      publicSummary:
        "A full authenticated archival-production pass inventories every one of the 107 distinct CallNYC timeline items recoverable on July 14, 2026, derives bounded product and stakeholder patterns, and preserves a three-item profile-count discrepancy for further research."
    }
  ],
  pages: []
};
