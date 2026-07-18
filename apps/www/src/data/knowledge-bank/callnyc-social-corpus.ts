const reviewedAt = "2026-07-14";

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
  repliesOnlyStatusId: "722837286476390401",
  dateSlicedSearchAuthoredStatusesRecovered: 47,
  ledgerPath: "docs/knowledge-bank/data/callnyc-public-post-ledger.json"
} as const;

export const callNycCorpusFindings = {
  accountAuthoredStatusesMentioningCouncil: 82,
  issueRecognitionPosts: 71,
  councilMemberHandlesNamedInRecognitions: 26,
  councilMemberHandlesNamedInRecognitionsList: [
    "@BenKallos", "@bradlander", "@ChaimDeutsch", "@cmenchaca",
    "@CMMathieuEugene", "@CMPeterKoo", "@CMReynoso34", "@CM_MargaretChin",
    "@CM_RubenWills", "@Dromm25", "@ElizCrowleyNYC", "@FCabreraNY",
    "@HelenRosenthal", "@IDaneekMiller", "@JimmyVanBramer", "@JulissaFerreras",
    "@MarkTreyger718", "@MMViverito", "@NYCGreenfield", "@RitchieTorres",
    "@RLEspinal", "@RosieMendez", "@StephenLevin33", "@StevenMatteo",
    "@Vanessalgibson", "@ydanis"
  ],
  uniqueIssuePagesLinkedFromRecognitions: 61,
  issueCategoriesLinkedFromRecognitions: 16,
  shortUrlOccurrences: 98,
  uniqueShortUrls: 84,
  uniqueResolvedDestinations: 76,
  uniqueCallNycDestinations: 63,
  externalDestinationUrls: 13,
  visualTokenRecords: 87,
  imageIndicatorRecords: 82,
  ambiguousVisualTokenRecords: 5
} as const;

export const callNycSocialCorpus = {
  intakeItems: [{
    id: "INTAKE-CALLNYC-FULL-POPULATION-CORPUS-2026",
    kind: "public-artifact",
    title: "Full-population archival production for @CallNYCApp",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    projectIds: ["callnyc"],
    reason: "Reconcile the complete observed profile count, preserve every recoverable public status and URL, and mature bounded findings about engagement architecture, stakeholder response, source circulation, and product announcements.",
    sourceUrl: "https://x.com/CallNYCapp",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [
      "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      "SRC-X-CALLNYC-JAMIE-ROLE-710150246781882369",
      "SRC-X-CALLNYC-DISTRICT-API-713537148000018432",
      "SRC-X-CALLNYC-JSON-API-722837286476390401",
      "SRC-X-CALLNYC-ISSUE-TWEET-BUTTONS-710154803054301184",
      "SRC-GIZMODO-RENTER-BE-AWARE-2016-03-10",
      "SRC-GOTHAMIST-PULASKI-BIKE-PATH-2016-04-28",
      "SRC-NYC-HRA-HOMELESSNESS-PREVENTION",
      "SRC-NYC-RENT-FREEZE",
      "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026"
    ],
    observationIds: [
      "OBS-CALLNYC-FULL-POPULATION-DISPOSITION",
      "OBS-CALLNYC-ENGAGEMENT-ARCHITECTURE",
      "OBS-CALLNYC-POSTED-URL-INVENTORY",
      "OBS-CALLNYC-OFFICIAL-SERVICE-ROUTING",
      "OBS-CALLNYC-CIVIC-TECH-SOURCE-CIRCULATION",
      "OBS-CALLNYC-FIRST-PERSON-ROLE",
      "OBS-CALLNYC-PUBLIC-API-ANNOUNCEMENTS",
      "OBS-CALLNYC-UNVERIFIED-HISTORICAL-METRICS"
    ],
    researchInquiryIds: [
      "INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026",
      "INQ-CALLNYC-UNVERIFIED-ACCOUNT-METRICS",
      "INQ-CALLNYC-API-IMPLEMENTATION"
    ],
    boundaries: [
      "The ledger provides 100 percent disposition coverage of the 110-item observed profile count, not a platform export.",
      "Three profile-count slots remain not recovered; no status IDs, dates, or content are inferred for them.",
      "A tagged office is an intended audience, not evidence of response, use, adoption, or endorsement.",
      "The shared project account does not establish the individual author of every post.",
      "Visual tokens preserve interface-level signals without assuming they are media: 82 records carry an Image indicator, while five carry only uninterpreted emoji-like tokens.",
      "No authentication, session, private-message, or account-analytics material enters the repository."
    ]
  }],

  observations: [
    {
      id: "OBS-CALLNYC-FULL-POPULATION-DISPOSITION",
      intakeId: "INTAKE-CALLNYC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      project: "callnyc",
      kind: "source-fact",
      text: "Fresh authenticated Posts and Replies passes reproduced the ledger's 107 unique status URLs exactly: 86 original account posts, 6 account replies, and 15 reposts. Three of the profile's 110 observed count slots remain explicitly not recovered.",
      locator: "Population audit and freshVerification fields",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE"],
      researchInquiryIds: ["INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026"],
      limitations: [
        "The recovery is not an X export, deletion history, withheld-status log, or historical analytics report.",
        "Date-sliced X search recovered only 47 of 92 authored statuses and is not a complete discovery channel.",
        "The ledger preserves interface-level visual tokens, not media URLs, assets, image descriptions, rights, or publication clearance; only the 82 records carrying an Image token are treated as media-recovery leads."
      ]
    },
    {
      id: "OBS-CALLNYC-ENGAGEMENT-ARCHITECTURE",
      intakeId: "INTAKE-CALLNYC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      project: "callnyc",
      kind: "source-fact",
      text: "The recoverable corpus contains 71 data-derived recognition posts connecting 61 issue pages across 16 constituent-service categories to 26 sitting Council-member accounts.",
      locator: "aggregateFindings and item-level status records",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE"],
      researchInquiryIds: ["INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026"],
      limitations: [
        "The account tags document intended institutional reach, not reciprocal engagement by 26 offices.",
        "Posts and issue pages are publication and information-architecture units, not people helped or service outcomes."
      ]
    },
    {
      id: "OBS-CALLNYC-POSTED-URL-INVENTORY",
      intakeId: "INTAKE-CALLNYC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      project: "callnyc",
      kind: "source-fact",
      text: "The ledger preserves 98 short-link occurrences, 84 unique short URLs, 76 resolved destinations, 63 unique CallNYC destinations, and 13 external destinations.",
      locator: "aggregateFindings.externalDestinationUrls and records[].outboundLinks",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CALLNYC-PUBLIC-SOURCE-CIRCULATION"],
      researchInquiryIds: ["INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026"],
      limitations: [
        "A current redirect or response status does not establish 2016 availability or historical continuity.",
        "A posted or reposted link does not by itself establish partnership, endorsement, adoption, or Jamie's authorship."
      ]
    },
    {
      id: "OBS-CALLNYC-OFFICIAL-SERVICE-ROUTING",
      intakeId: "INTAKE-CALLNYC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      project: "callnyc",
      kind: "context",
      text: "Recovered account posts routed readers to official NYC homelessness-prevention and Rent Freeze resources, including a reply explaining SCRIE and linking an official page and public how-to video.",
      locator: "Statuses 729757799647981570 and 733388862806982656",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CALLNYC-PUBLIC-SOURCE-CIRCULATION"],
      researchInquiryIds: [],
      limitations: [
        "The current official pages document present resource descriptions, not the exact content available in 2016.",
        "Historical CallNYC guidance is archived and must not be presented as current service advice."
      ]
    },
    {
      id: "OBS-CALLNYC-CIVIC-TECH-SOURCE-CIRCULATION",
      intakeId: "INTAKE-CALLNYC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      project: "callnyc",
      kind: "context",
      text: "Posted and reposted links connect the account record to Council Labs, NYC Transparency Working Group, BetaNYC, 311 tools, public-interest reporting, official service resources, and adjacent public projects.",
      locator: "aggregateFindings.externalDestinationUrls",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CALLNYC-PUBLIC-SOURCE-CIRCULATION"],
      researchInquiryIds: [],
      limitations: [
        "The link pattern documents public source circulation and ecosystem orientation, not formal partnerships.",
        "The Gizmodo and Gothamist articles concern adjacent civic-data and transportation subjects; they do not report on CallNYC."
      ]
    },
    {
      id: "OBS-CALLNYC-FIRST-PERSON-ROLE",
      intakeId: "INTAKE-CALLNYC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-CALLNYC-JAMIE-ROLE-710150246781882369",
      project: "callnyc",
      kind: "source-fact",
      text: "A contemporaneous first-person account reply identifies Jamie Burkart and describes CallNYC as his first civic-tech project.",
      locator: "Post text",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE"],
      researchInquiryIds: [],
      limitations: ["The reply does not establish Jamie's authorship of every account post or sole causality for all project outcomes."]
    },
    {
      id: "OBS-CALLNYC-PUBLIC-API-ANNOUNCEMENTS",
      intakeId: "INTAKE-CALLNYC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-CALLNYC-DISTRICT-API-713537148000018432",
      project: "callnyc",
      kind: "source-fact",
      text: "Three contemporaneous posts announced a District Profile API, a JSON endpoint for Council-member Twitter usernames, and issue-specific Council contact buttons.",
      locator: "Statuses 713537148000018432, 722837286476390401, and 710154803054301184",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENT"],
      researchInquiryIds: ["INQ-CALLNYC-API-IMPLEMENTATION"],
      limitations: ["The announcements do not establish historical implementation completeness, adoption, current availability, or official City ownership."]
    },
    {
      id: "OBS-CALLNYC-UNVERIFIED-HISTORICAL-METRICS",
      intakeId: "INTAKE-CALLNYC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      project: "callnyc",
      kind: "limitation",
      text: "The corpus preserves historical posts claiming 94 or 96 percent Council Twitter participation and 2,330 people helped, but not the calculations needed to verify those statements.",
      locator: "Statuses 707677287366467584, 710154803054301184, 712349795403374592, and 730838778772893696",
      status: "verified",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-CALLNYC-UNVERIFIED-ACCOUNT-METRICS"],
      limitations: ["Current dataset metadata says a row represents an issue and a case may contain multiple issues, so row totals cannot be restated as unique people helped."]
    }
  ],

  sources: [
    {
      id: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      title: "Authenticated @CallNYCApp full-population recovery and public-post ledger",
      organization: "CallNYC",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/data/callnyc-public-post-ledger.json",
      preferredPublicUrl: "canonical",
      publicCitation: "Authenticated review of the public @CallNYCApp Posts and Replies surfaces, with a 107-record ledger and three explicit unresolved count slots, July 2026.",
      publicNote: "The profile displayed 110 posts. Fresh cross-tab reconciliation reproduced 107 unique public items: 86 original account posts, 6 account replies, and 15 reposts. Three count slots remain unresolved. The corpus includes 71 issue-recognition posts connecting 61 issue pages across 16 categories to 26 Council-member accounts.",
      supportsGenerally: [
        "100 percent disposition coverage of the observed 110-item profile count",
        "107 unique item-level recoveries and three explicit unresolved slots",
        "86 original posts, six replies, and 15 reposts",
        "71 issue-recognition posts connecting 61 issue pages across 16 categories to 26 Council-member accounts",
        "complete recovered outbound-link inventory"
      ],
      doesNotEstablish: [
        "a complete X platform export",
        "that no deleted, withheld, or inaccessible status exists",
        "Jamie's authorship of every account post",
        "reciprocal engagement by every tagged office",
        "official NYC Council endorsement or adoption",
        "service quality, case resolution, unique residents helped, or policy causality",
        "contemporaneous or project-owned engagement analytics",
        "visual media asset preservation, description, rights, or publication clearance"
      ]
    },
    {
      id: "SRC-X-CALLNYC-JAMIE-ROLE-710150246781882369",
      title: "CallNYC first-person Jamie Burkart role post",
      organization: "CallNYC",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-03-16",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/CallNYCapp/status/710150246781882369",
      preferredPublicUrl: "canonical",
      publicCitation: "CallNYC public reply identifying Jamie Burkart and describing CallNYC as his first civic-tech project, March 16, 2016.",
      publicNote: "The contemporaneous account publicly connected Jamie to CallNYC in the first person.",
      supportsGenerally: ["Jamie's public connection to CallNYC", "first-person project framing"],
      doesNotEstablish: ["authorship of every account post", "sole project causality", "official Council affiliation"]
    },
    {
      id: "SRC-X-CALLNYC-DISTRICT-API-713537148000018432",
      title: "CallNYC District Profile API announcement",
      organization: "CallNYC",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-03-26",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/CallNYCapp/status/713537148000018432",
      preferredPublicUrl: "canonical",
      publicCitation: "CallNYC post announcing a District Profile API with name, phone, email, Twitter, and service fields, March 26, 2016.",
      publicNote: "The post documents a public product announcement; historical endpoint behavior was not independently recovered in this pass.",
      supportsGenerally: ["contemporaneous API announcement", "announced profile fields"],
      doesNotEstablish: ["current API availability", "endpoint adoption", "official City API status"]
    },
    {
      id: "SRC-X-CALLNYC-JSON-API-722837286476390401",
      title: "CallNYC JSON API reply",
      organization: "CallNYC",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-04-20",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/CallNYCapp/status/722837286476390401",
      preferredPublicUrl: "canonical",
      publicCitation: "CallNYC reply describing a JSON API for Council-member Twitter usernames, April 20, 2016.",
      publicNote: "This was the one account-authored status recovered from Replies but absent from the Posts-tab inventory.",
      supportsGenerally: ["contemporaneous JSON API announcement", "cross-tab recovery difference"],
      doesNotEstablish: ["current endpoint behavior", "API use by the recipients", "official Council ownership"]
    },
    {
      id: "SRC-X-CALLNYC-ISSUE-TWEET-BUTTONS-710154803054301184",
      title: "CallNYC issue-specific Council contact-button announcement",
      organization: "CallNYC",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-03-16",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/CallNYCapp/status/710154803054301184",
      preferredPublicUrl: "canonical",
      publicCitation: "CallNYC reply announcing buttons for tweeting Council members about specific issues, March 16, 2016.",
      publicNote: "The post documents an announced engagement feature; its historical interaction behavior was not independently recovered.",
      supportsGenerally: ["announcement of issue-specific Council contact buttons"],
      doesNotEstablish: ["current feature availability", "resident use", "Council response", "the post's separate 94 percent claim"]
    },
    {
      id: "SRC-GIZMODO-RENTER-BE-AWARE-2016-03-10",
      title: "Check the History of Any NYC Address Through Its 311 Complaint Record",
      author: "Alissa Walker",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-03-10",
      accessedAt: reviewedAt,
      canonicalUrl: "https://gizmodo.com/check-the-history-of-complaints-at-any-nyc-address-with-1764099069",
      preferredPublicUrl: "canonical",
      publicCitation: "Alissa Walker, 'Check the History of Any NYC Address Through Its 311 Complaint Record,' Gizmodo, March 10, 2016.",
      publicNote: "A CallNYC account post linked this adjacent example of translating NYC 311 data into a resident-facing tool.",
      supportsGenerally: ["the linked article's title, date, and 311-tool subject", "adjacent civic-data context circulated by the account"],
      doesNotEstablish: ["CallNYC coverage", "a partnership with CallNYC", "Jamie's role in the 311 tool"]
    },
    {
      id: "SRC-GOTHAMIST-PULASKI-BIKE-PATH-2016-04-28",
      title: "Long-Overdue Pulaski Bridge Bike Path Will Officially Open Friday",
      author: "Miranda Katz",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-04-28",
      accessedAt: reviewedAt,
      canonicalUrl: "https://gothamist.com/news/long-overdue-pulaski-bridge-bike-path-will-officially-open-friday",
      preferredPublicUrl: "canonical",
      publicCitation: "Miranda Katz, 'Long-Overdue Pulaski Bridge Bike Path Will Officially Open Friday,' Gothamist, April 28, 2016.",
      publicNote: "The CallNYC timeline reposted Gothamist's public transportation reporting.",
      supportsGenerally: ["the linked article's title, author, date, and transportation subject", "public-interest reporting circulated by the account"],
      doesNotEstablish: ["CallNYC coverage", "CallNYC involvement in the bike path", "a partnership with Gothamist"]
    },
    {
      id: "SRC-NYC-HRA-HOMELESSNESS-PREVENTION",
      title: "Homelessness Prevention",
      organization: "New York City Human Resources Administration",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.nyc.gov/site/hra/help/homelessness-prevention.page",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Human Resources Administration, 'Homelessness Prevention,' accessed July 14, 2026.",
      publicNote: "The current official page describes rental assistance, eviction prevention, legal assistance, and housing-stability services. A recovered CallNYC post linked the predecessor URL.",
      supportsGenerally: ["current official homelessness-prevention resource", "current housing and legal-assistance categories"],
      doesNotEstablish: ["the exact page content in May 2016", "CallNYC's historical guidance accuracy", "resident use through CallNYC"]
    },
    {
      id: "SRC-NYC-RENT-FREEZE",
      title: "Freeze Your Rent",
      organization: "City of New York",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.nyc.gov/site/rentfreeze/index.page",
      preferredPublicUrl: "canonical",
      publicCitation: "City of New York, 'Freeze Your Rent,' accessed July 14, 2026.",
      publicNote: "The current official page identifies SCRIE and DRIE as components of the NYC Rent Freeze Program. A recovered CallNYC reply linked the official rent-freeze route.",
      supportsGenerally: ["current official Rent Freeze description", "SCRIE and DRIE program relationship"],
      doesNotEstablish: ["the exact page content in May 2016", "historical eligibility", "resident use through CallNYC"]
    },
    {
      id: "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026",
      title: "City Council Constituent Services (2015 to 2025)",
      organization: "City of New York",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://catalog.data.gov/dataset/nyc-council-constituent-services",
      preferredPublicUrl: "canonical",
      publicCitation: "City of New York, 'City Council Constituent Services (2015 to 2025),' public dataset metadata, accessed July 14, 2026.",
      publicNote: "Current metadata says each row represents an issue and a single constituent interaction or case can contain multiple issues.",
      supportsGenerally: ["the issue-level grain of the current constituent-services dataset", "the distinction among rows, issues, cases, and people"],
      doesNotEstablish: ["the exact 2016 dataset schema or row count", "unique people helped", "case resolution or service quality", "comparability across offices or reporting practices"]
    }
  ],

  claims: [
    {
      id: "CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE",
      project: "callnyc",
      internalClaim: "The recoverable @CallNYCApp corpus documents a deliberate public-engagement layer around Jamie's independent prototype: 71 data-derived recognition posts connected 61 issue pages across 16 constituent-service categories to an intended institutional audience of 26 sitting Council-member accounts.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "case-study",
        text: "Jamie paired CallNYC's issue pathways with a public-engagement layer. The recoverable account corpus includes 71 data-derived posts connecting 61 issue pages across 16 service categories to an intended institutional audience of 26 sitting Council-member accounts.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/callnyc"]
      }],
      evidence: [
        { sourceId: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["item-level corpus", "population reconciliation", "71 recognition posts", "26 Council-member accounts", "61 issue pages", "16 categories"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-X-CALLNYC-JAMIE-ROLE-710150246781882369", relationship: "direct-support", supports: ["Jamie's first-person project role"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-X-CALLNYC-ISSUE-TWEET-BUTTONS-710154803054301184", relationship: "corroborating", supports: ["Jamie's first-person announcement of an issue-specific Council contact feature"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYC-OPEN-DATA-COUNCIL-MEMBERS-1999-2025", relationship: "corroborating", supports: ["2016 Council officeholding for the named member accounts"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026", relationship: "supports-boundary", supports: ["rows and issues must not be equated with cases or unique people"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "Named accounts were the intended institutional audience; the 26-account count does not mean all 26 offices saw, replied to, used, or endorsed CallNYC.",
        "The 71 posts and 61 linked pages document an engagement architecture, not service outcomes or independently validated guidance products.",
        "CouncilStat rows represent issues rather than unique cases or people, and office comparisons reflect participation and reporting practices.",
        "The corpus has 107 recovered items plus three unresolved profile-count slots; it is not a complete platform export.",
        "The project account does not establish Jamie's authorship of every post."
      ],
      antiClaims: [
        "Twenty-six Council members engaged with or endorsed CallNYC.",
        "CallNYC helped a verified number of unique residents.",
        "The account corpus proves service quality or case resolution.",
        "Every @CallNYCApp post was authored by Jamie.",
        "The ledger is a complete X platform export."
      ],
      researchInquiryIds: ["INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026", "INQ-CALLNYC-UNVERIFIED-ACCOUNT-METRICS"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENT",
      project: "callnyc",
      internalClaim: "In March and April 2016, @CallNYCApp announced a District Profile API, a JSON endpoint for Council-member Twitter usernames, and issue-specific Council contact buttons.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "Contemporaneous CallNYC posts announced a District Profile API, a JSON endpoint for Council-member Twitter usernames, and issue-specific Council contact buttons; historical implementation behavior remains to be independently recovered.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-CALLNYC-DISTRICT-API-713537148000018432", relationship: "direct-support", supports: ["District Profile API announcement and field list"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-X-CALLNYC-JSON-API-722837286476390401", relationship: "corroborating", supports: ["JSON API announcement for Council-member Twitter usernames"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-X-CALLNYC-ISSUE-TWEET-BUTTONS-710154803054301184", relationship: "direct-support", supports: ["issue-specific Council contact-button announcement"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["The posts establish public announcements, not current availability, historical implementation completeness, adoption, or official City ownership."],
      antiClaims: ["CallNYC currently provides a working public API.", "The API was an official NYC Council service.", "The account proves who used the API or contact buttons."],
      researchInquiryIds: ["INQ-CALLNYC-API-IMPLEMENTATION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-CALLNYC-PUBLIC-SOURCE-CIRCULATION",
      project: "callnyc",
      internalClaim: "The recovered account corpus contains 13 unique external destinations spanning official service resources, civic-tech and open-data infrastructure, adjacent tools, public-interest reporting, and Jamie's other public projects.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The CallNYC account circulated official service resources, civic-tech tools, public-interest reporting, and adjacent project links while developing its public engagement practice.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["13 external destinations", "item-level status and link inventory"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-GIZMODO-RENTER-BE-AWARE-2016-03-10", relationship: "context", supports: ["adjacent resident-facing civic-data tool context"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-GOTHAMIST-PULASKI-BIKE-PATH-2016-04-28", relationship: "context", supports: ["public-interest transportation reporting context"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYC-HRA-HOMELESSNESS-PREVENTION", relationship: "context", supports: ["current official housing-stability resource context"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYC-RENT-FREEZE", relationship: "context", supports: ["current official SCRIE and DRIE resource context"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "Posted or reposted links document source circulation, not partnership, endorsement, use, or Jamie's individual authorship.",
        "Current source pages do not establish their exact 2016 content or availability.",
        "The linked Gizmodo and Gothamist articles do not report on CallNYC."
      ],
      antiClaims: ["Every linked organization partnered with CallNYC.", "The linked press covered CallNYC.", "External links prove resident use or service outcomes."],
      researchInquiryIds: ["INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026",
      project: "callnyc",
      question: "Can every slot in the 110-item observed @CallNYCApp profile population be recovered and dispositioned without claiming a platform export?",
      methods: [
        "Scrolled the authenticated Posts surface to exhaustion and deduplicated canonical status URLs.",
        "Scrolled the authenticated Replies surface to exhaustion and reconciled its URL set against Posts and the preserved ledger.",
        "Ran monthly date-bounded authenticated searches as an independent but incomplete discovery channel.",
        "Preserved status IDs, dates, relationship classes, public text, mentions, hashtags, outbound-link destinations, interface-level visual tokens, and visible public metrics in a public ledger."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The profile displayed 110 posts.",
        "The fresh Posts pass yielded 106 unique status URLs.",
        "The fresh Replies pass yielded 107 and supplied one account reply absent from Posts.",
        "The fresh 107-URL union matched the preserved ledger exactly.",
        "The ledger contains 86 original posts, 6 account replies, and 15 reposts.",
        "Three profile-count slots remain explicitly not recovered, producing 100 percent disposition coverage of the observed count.",
        "Monthly X search recovered only 47 of 92 authored statuses and returned no additional IDs."
      ],
      limitations: [
        "X did not provide a complete export, deletion history, withheld-status log, or historical account analytics.",
        "The three unresolved slots have no recovered status IDs or content and must remain not recovered rather than inferred.",
        "Visible engagement metrics are a July 2026 public snapshot and may have changed since publication.",
        "Visual tokens are not archived media URLs or assets; 82 Image indicators remain visual-recovery leads, while five emoji-only token sets remain uninterpreted.",
        "A recovered project-account status does not identify its individual author."
      ],
      sourceIds: ["SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026"],
      publicSummary: "All 110 observed profile-count slots are dispositioned: 107 unique public items were recovered at item level and three remain explicitly unresolved. This is not a platform export."
    },
    {
      id: "INQ-CALLNYC-UNVERIFIED-ACCOUNT-METRICS",
      project: "callnyc",
      question: "What source data and method support the historical account claims that 94 or 96 percent of Council members used Twitter and that 2,330 people were helped in 365 days?",
      methods: [
        "Locate the contemporaneous roster and handle snapshot used for the 94 and 96 percent statements.",
        "Reconstruct the query and aggregation behind the 2,330 figure from the exact 2016 CouncilStat release.",
        "Apply row, issue, case, person, office-participation, and reporting-practice distinctions before public use."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: ["The public posts preserve the claims but not the calculation method; neither figure is approved for public projection."],
      limitations: [
        "Current dataset metadata says a row is an issue and a case may contain multiple issues, so row totals cannot be restated as unique people helped.",
        "The current dataset record must not be assumed to reproduce the exact 2016 schema or participating-office population.",
        "The platform's current profile and engagement counts do not reconstruct historical calculations."
      ],
      sourceIds: ["SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026", "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026"],
      publicSummary: "Historical account metrics remain research leads, not public claims."
    },
    {
      id: "INQ-CALLNYC-API-IMPLEMENTATION",
      project: "callnyc",
      question: "Can the announced CallNYC District Profile API, JSON endpoint, and issue-specific Council contact buttons be independently recovered and technically documented?",
      methods: [
        "Inspect surviving public source-code history for API routes, response examples, contact-button templates, and release chronology.",
        "Search archived captures for the historical API response and issue-page interaction controls.",
        "Seek independent documentation or use evidence before promoting beyond the announcement record."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: ["The contemporaneous account establishes public product announcements; historical endpoint behavior and adoption were not independently recovered in this pass."],
      limitations: [
        "The currently available source repository preserves only a bounded implementation snapshot.",
        "A current response from an archive fallback would not by itself establish historical JSON behavior.",
        "Announcement records do not establish use, adoption, or official City ownership."
      ],
      sourceIds: ["SRC-X-CALLNYC-DISTRICT-API-713537148000018432", "SRC-X-CALLNYC-JSON-API-722837286476390401", "SRC-X-CALLNYC-ISSUE-TWEET-BUTTONS-710154803054301184", "SRC-CALLNYC-GITHUB-REPOSITORY"],
      publicSummary: "The account announced API and contact features; implementation recovery remains open."
    }
  ]
} as const;
