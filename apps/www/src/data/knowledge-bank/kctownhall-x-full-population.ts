import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated KC Town Hall archival review"
];

export const kcTownHallFullPopulationSources: SourceRecord[] = [
  {
    id: "SRC-KCTH-X-CORPUS-2026-07-15",
    title: "KC Town Hall complete profile-reported public timeline corpus",
    author: "Codex authenticated browser review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/KCTownHall/with_replies",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated item-level review of the Posts and Replies timelines for @KCTownHall, July 2026.",
    publicNote:
      "The Posts route yielded 170 primary records. The Replies route rendered 188 cards: 183 primary account records and five conversation-context cards by other accounts. The deduplicated primary union reconciles all 183 profile-reported records. The public fixture retains status metadata, classifications, posted-link metadata, and dated interaction counts while excluding post text, phone numbers, authentication identity, and private account state.",
    supportsGenerally: [
      "all 183 profile-reported records materialized and were reviewed",
      "142 original posts, 13 replies, and 28 reposts",
      "100 tire-related records and 12 survey-linked records",
      "133 external-link occurrences across 118 records",
      "bounded direct response from three sitting Council-member accounts",
      "dated visible-interaction observations"
    ],
    doesNotEstablish: [
      "individual authorship of every account post",
      "independently audited tire, savings, or participation totals",
      "reach, adoption, conversion, endorsement, or causal impact",
      "project completion or current property status",
      "deleted, private, liked, or platform-suppressed activity"
    ]
  },
  {
    id: "SRC-KCTH-X-ACQUISITION-LEDGER-2026-07-15",
    title: "KC Town Hall redacted authenticated-route acquisition ledger",
    author: "Codex authenticated browser review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15",
    accessedAt: reviewedAt,
    publicCitation:
      "Redacted acquisition ledger for the authenticated @KCTownHall Posts and Replies routes, July 2026.",
    publicNote:
      "Generated from a protected authenticated capture whose SHA-256 digest is retained in the ledger. It preserves 170 Posts-route primary IDs, 183 Replies-route primary IDs, five excluded conversation-context IDs, and the 183-post profile observation without retaining post text, phone numbers, precise addresses, link labels, authentication identity, cookies, or session state.",
    supportsGenerally: [
      "independent route-membership input for the curated corpus",
      "183-post profile observation",
      "170 Posts records, 188 Replies cards, and five context exclusions",
      "public-safe acquisition provenance"
    ],
    doesNotEstablish: [
      "deleted, private, liked, or platform-suppressed activity",
      "replay of the authenticated browser session from the public repository",
      "post meaning, individual authorship, or program outcomes"
    ]
  },
  {
    id: "SRC-KCTH-X-POSTED-URL-TRIAGE-2026-07-15",
    title: "KC Town Hall complete posted-URL disposition ledger",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15",
    accessedAt: reviewedAt,
    publicCitation:
      "Disposition ledger for all 31 distinct short URLs in the complete @KCTownHall corpus, July 2026.",
    publicNote:
      "Every observed short URL is assigned to a promoted public source, an operational link family, or a named research inquiry. This preserves unpromoted leads without treating every historical destination as accomplishment evidence.",
    supportsGenerally: [
      "complete 31-link triage",
      "ten promoted-source link records",
      "15 operational-link-family records",
      "six explicit research leads"
    ],
    doesNotEstablish: [
      "current availability of historical destinations",
      "project coverage, partnership, endorsement, use, or impact",
      "claim readiness for research-inquiry destinations"
    ]
  },
  {
    id: "SRC-KCTH-KANSAS-CITY-STAR-LEONS",
    title:
      "Leon's Thriftway may be the oldest black-owned grocery store in the country",
    organization: "The Kansas City Star",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.kansascity.com/news/business/article87241897.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "The Kansas City Star, 'Leon's Thriftway may be the oldest black-owned grocery store in the country.'",
    publicNote:
      "KC Town Hall circulated this reporting in a neighborhood food-access thread. It is field context, not coverage of KC Town Hall and not evidence the account preserved the store.",
    supportsGenerally: [
      "neighborhood food-access context",
      "a source circulated by the project account"
    ],
    doesNotEstablish: [
      "coverage of KC Town Hall",
      "KC Town Hall policy causality",
      "store preservation"
    ]
  },
  {
    id: "SRC-KCTH-NORTHEAST-NEWS-HOUSING-2018",
    title: "Affordable Housing Policy hits the docket in KCMO",
    organization: "Northeast News",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2018-09-19",
    accessedAt: reviewedAt,
    canonicalUrl:
      "http://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
    archiveUrl:
      "https://web.archive.org/web/20180920120704/http://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
    preferredPublicUrl: "archive",
    publicCitation:
      "Northeast News, 'Affordable Housing Policy hits the docket in KCMO,' September 19, 2018.",
    publicNote:
      "KC Town Hall circulated the article as local policy context. It is not coverage of the project or evidence that the account caused a policy result.",
    supportsGenerally: [
      "local affordable-housing policy context",
      "civic-source circulation"
    ],
    doesNotEstablish: [
      "coverage of KC Town Hall",
      "policy causality",
      "project completion"
    ]
  },
  {
    id: "SRC-KCTH-CURBED-RENTER-CREDIT-2018",
    title: "Tax credit for renters proposed by U.S. Senator Kamala Harris",
    organization: "Curbed",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2018-07-20",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.curbed.com/2018/7/20/17595698/rent-relief-act-tax-credit-kamala-harris",
    archiveUrl:
      "https://web.archive.org/web/20180720221744/https://www.curbed.com/2018/7/20/17595698/rent-relief-act-tax-credit-kamala-harris",
    preferredPublicUrl: "archive",
    publicCitation:
      "Curbed, 'Tax credit for renters proposed by U.S. Senator Kamala Harris,' July 20, 2018.",
    publicNote:
      "The article entered the KC Town Hall timeline through a repost. It is national housing-policy context, not project coverage or a formal policy partnership.",
    supportsGenerally: [
      "national renter-policy context",
      "housing-source circulation"
    ],
    doesNotEstablish: [
      "coverage of KC Town Hall",
      "formal policy partnership",
      "policy impact"
    ]
  },
  {
    id: "SRC-KCTH-KCUR-PRIMARY-GUIDE-2018",
    title: "A Cheat Sheet For Tuesday's Primary Election In Missouri",
    organization: "KCUR",
    author: "Erica Hunzinger",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-08-05",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.kcur.org/politics-elections-and-government/2018-08-05/a-cheat-sheet-for-tuesdays-primary-election-in-missouri",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Erica Hunzinger, 'A Cheat Sheet For Tuesday's Primary Election In Missouri,' KCUR, August 5, 2018.",
    publicNote:
      "KC Town Hall circulated this election guide with official voter information. Circulation does not establish turnout or electoral influence.",
    supportsGenerally: [
      "nonpartisan election information",
      "resident-facing civic-resource circulation"
    ],
    doesNotEstablish: [
      "voter turnout",
      "electoral impact",
      "partisan endorsement"
    ]
  },
  {
    id: "SRC-KCTH-RIDEKC-NEXT-2019",
    title: "RideKC Next System Redesign",
    organization: "Kansas City Area Transportation Authority",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: reviewedAt,
    canonicalUrl: "https://ridekc.org/planning/ridekc-next",
    archiveUrl:
      "https://web.archive.org/web/20190821135819/https://ridekc.org/planning/ridekc-next",
    preferredPublicUrl: "archive",
    publicCitation:
      "Kansas City Area Transportation Authority, archived RideKC Next system-redesign page.",
    publicNote:
      "The account redistributed official transit-planning information. A repost does not establish a formal project partnership, survey participation, or influence on the final plan.",
    supportsGenerally: [
      "public transit planning",
      "resident survey distribution"
    ],
    doesNotEstablish: [
      "formal partnership",
      "survey participation",
      "transit-plan causality"
    ]
  },
  {
    id: "SRC-KCTH-MISSOURI-VOTER-LOOKUP",
    title: "Check Your Voter Registration",
    organization: "Missouri Secretary of State",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://voteroutreach.sos.mo.gov/portal",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Missouri Secretary of State, 'Check Your Voter Registration.'",
    publicNote:
      "KC Town Hall circulated the official lookup as resident guidance. Historical circulation does not establish use or turnout and is not presented as current election advice.",
    supportsGenerally: [
      "official voter-information source",
      "resident guidance"
    ],
    doesNotEstablish: ["use", "turnout", "electoral impact"]
  },
  {
    id: "SRC-KCTH-KCATA-OZONE-ALERT",
    title: "Ozone Alert",
    organization: "Kansas City Area Transportation Authority",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "dead",
    accessedAt: reviewedAt,
    canonicalUrl: "http://kcata.org/about_kcata/entries/ozone_alert/",
    publicCitation:
      "Kansas City Area Transportation Authority, historical 'Ozone Alert' information page.",
    publicNote:
      "The historical destination is preserved as posted-link metadata. It supports a public-health and transit-information pattern, not current guidance or measured health outcomes.",
    supportsGenerally: [
      "historical public-health information",
      "historical transit guidance"
    ],
    doesNotEstablish: ["current guidance", "ridership", "health outcomes"]
  },
  {
    id: "SRC-KCTH-COVID-RESOURCE-QA-2020",
    title: "COVID-19 relief resource Q&A",
    organization: "KC Town Hall",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-20",
    accessedAt: reviewedAt,
    canonicalUrl: "https://youtu.be/onCKU-TuPhc",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Town Hall, public COVID-19 relief resource Q&A video, April 2020.",
    publicNote:
      "The account used a project video as a community-resource surface. The historical resource is not current guidance and does not establish service uptake.",
    supportsGenerally: [
      "community-resource distribution",
      "historical information operations"
    ],
    doesNotEstablish: ["current guidance", "service uptake", "outcomes"]
  },
  {
    id: "SRC-KCTH-PAINT-CLEANUP-VIDEO-2018",
    title: "Bad latex paint cleanup video and tool list",
    organization: "KC Town Hall",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-08-30",
    accessedAt: reviewedAt,
    canonicalUrl: "https://youtu.be/PmLjLyOpS9I",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Town Hall, public bad-latex-paint cleanup video and tool list, August 2018.",
    publicNote:
      "The project account linked process documentation from an early site cleanup. It does not establish complete remediation or later redevelopment completion.",
    supportsGenerally: [
      "site-cleanup documentation",
      "practical process communication"
    ],
    doesNotEstablish: [
      "complete remediation",
      "redevelopment completion",
      "individual post authorship"
    ]
  },
  {
    id: "SRC-KCTH-BRIDGING-GAP-DROPOFF-2019",
    title: "Bridging the Gap collaborator reports a KC Town Hall tire drop-off",
    author: "Public collaborator account (@trutheresme)",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-07-08",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/trutheresme/status/1148277187583389703",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public collaborator account, report of a KC Town Hall tire drop-off received by Bridging the Gap, July 8, 2019.",
    publicNote:
      "This independently corroborates one substantial tire drop-off. It does not independently audit the account's aggregate tire, participation, savings, or health-impact totals.",
    supportsGenerally: [
      "one externally corroborated tire drop-off",
      "environmental-program collaboration"
    ],
    doesNotEstablish: [
      "exact tire count",
      "complete program scale",
      "causal health impact"
    ]
  },
  {
    id: "SRC-KCTH-OAK-PARK-AMPLIFICATION-2019",
    title: "Community account amplifies an Oak Park cleanup notice",
    author: "Public community account (@JJones816)",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-10-10",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/JJones816/status/1182369340034707457",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public community-account amplification of an Oak Park free dumpster-day notice, October 10, 2019.",
    publicNote:
      "One public community account quote-amplified the notice. Amplification is observable distribution, not attendance, endorsement, or proof of service results.",
    supportsGenerally: [
      "community amplification",
      "neighborhood cleanup information distribution"
    ],
    doesNotEstablish: ["attendance", "endorsement", "service outcomes"]
  },
  {
    id: "SRC-KCTH-OAK-PARK-AMPLIFICATION-TRUTHERESME-2019",
    title: "A second community account amplifies an Oak Park cleanup notice",
    author: "Public community account (@trutheresme)",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-10-10",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/trutheresme/status/1182349413722836992",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public community-account amplification of an Oak Park free dumpster-day notice, October 10, 2019.",
    publicNote:
      "A second public community account quote-amplified the notice. The two records establish observable distribution by two accounts, not attendance, endorsement, or service results.",
    supportsGenerally: [
      "community amplification",
      "neighborhood cleanup information distribution"
    ],
    doesNotEstablish: ["attendance", "endorsement", "service outcomes"]
  }
];

export const kcTownHallFullPopulationClaims: ClaimRecord[] = [
  {
    id: "CLM-KCTH-X-CIVIC-SOURCE-CIRCULATION",
    project: "kc-town-hall",
    internalClaim:
      "The complete @KCTownHall population preserves a recurring civic-information practice spanning food access, housing, elections, transit, public health, emergency resources, and practical site documentation.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "KC Town Hall's public account circulated resident-facing sources on food access, housing, elections, transit, public health, emergency resources, and practical cleanup work.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Retain the complete source-curation pattern in the bank without turning a focused case study into a link inventory."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
        relationship: "direct-support",
        supports: ["complete posted-link inventory", "source categories"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCTH-X-POSTED-URL-TRIAGE-2026-07-15",
        relationship: "direct-support",
        supports: ["complete disposition of all 31 distinct short URLs"],
        confidence: "high",
        renderCitation: false
      },
      ...[
        "SRC-KCTH-KANSAS-CITY-STAR-LEONS",
        "SRC-KCTH-NORTHEAST-NEWS-HOUSING-2018",
        "SRC-KCTH-CURBED-RENTER-CREDIT-2018",
        "SRC-KCTH-KCUR-PRIMARY-GUIDE-2018",
        "SRC-KCTH-RIDEKC-NEXT-2019",
        "SRC-KCTH-MISSOURI-VOTER-LOOKUP",
        "SRC-KCTH-KCATA-OZONE-ALERT",
        "SRC-KCTH-COVID-RESOURCE-QA-2020",
        "SRC-KCTH-PAINT-CLEANUP-VIDEO-2018"
      ].map((sourceId) => ({
        sourceId,
        relationship: "context" as const,
        supports: ["one mission-relevant source circulated by the account"],
        confidence: "high" as const,
        renderCitation: false
      }))
    ],
    boundaries: [
      "A circulated source remains the work of its named author and publisher.",
      "Circulation does not mean the source covered, partnered with, or endorsed KC Town Hall.",
      "Historical civic-resource destinations are not current guidance."
    ],
    antiClaims: [
      "the linked articles covered KC Town Hall",
      "the linked institutions partnered with KC Town Hall",
      "source circulation proves policy or resident impact"
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-KCTH-X-DATED-VISIBLE-ENGAGEMENT",
    project: "kc-town-hall",
    internalClaim:
      "On the July 2026 capture date, 77 of 155 account-authored records showed at least one visible interaction, totaling 22 replies, 70 reposts, 174 likes, and one bookmark.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "A dated interface snapshot found visible interaction on 77 account-authored records.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Preserve the dated observation for comparative research while keeping volatile platform totals out of accomplishment messaging."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
        relationship: "direct-support",
        supports: [
          "77 account-authored records with visible interaction",
          "dated visible reply, repost, like, and bookmark totals"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Counts are a dated interface snapshot and can change.",
      "Interaction units are not unique people.",
      "Repost-source engagement is excluded from account-authored totals."
    ],
    antiClaims: [
      "267 people engaged",
      "the figures measure reach, adoption, conversion, participation, endorsement, or impact",
      "the figures are complete lifetime analytics"
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  }
];

export const kcTownHallFullPopulationInquiries: ResearchInquiry[] = [
  {
    id: "INQ-KCTH-X-TIRE-TOTALS-CORROBORATION",
    project: "kc-town-hall",
    question:
      "Which independently inspectable records can corroborate the account-published tire, recycling, and resident-savings totals?",
    methods: [
      "Separated recurring workflow evidence from self-published aggregate outcomes.",
      "Recovered one external collaborator report of a substantial tire drop-off.",
      "Retained exact aggregate outcome claims behind an independent-corroboration gate."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "One hundred corpus records are classified as tire-related and document a recurring workflow from 2019 through 2022.",
      "A Bridging the Gap collaborator independently reported receiving a substantial KC Town Hall tire drop-off.",
      "The account's exact cumulative tire and savings totals remain first-party claims."
    ],
    limitations: [
      "The external post corroborates one drop-off, not the complete program total.",
      "Social posts do not independently verify quantities, households served, savings, or health outcomes."
    ],
    sourceIds: [
      "SRC-KCTH-X-CORPUS-2026-07-15",
      "SRC-KCTH-BRIDGING-GAP-DROPOFF-2019"
    ],
    publicSummary:
      "The complete corpus proves a recurring tire-pickup workflow and one externally reported drop-off; exact cumulative totals still require independent corroboration."
  },
  {
    id: "INQ-KCTH-X-SURVEY-DECISION-TRAIL",
    project: "kc-town-hall",
    question:
      "Can public-safe survey records connect resident invitations to a response synthesis or documented decision trail?",
    methods: [
      "Counted survey-linked account records without reading or publishing responses.",
      "Separated the public invitation layer from protected response data and later planning claims.",
      "Cross-referenced the existing 2019 municipal-packet research."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Twelve corpus records link the project survey or resident-input process.",
      "The 2019 municipal packet says neighborhood input shaped the proposal.",
      "A public-safe response count, synthesis, and complete decision trail remain open."
    ],
    limitations: [
      "Raw responses and contact data remain private.",
      "The social corpus does not establish representativeness or adoption of every suggestion."
    ],
    sourceIds: [
      "SRC-KCTH-X-CORPUS-2026-07-15",
      "SRC-KCTH-SURVEY-2018",
      "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019"
    ],
    publicSummary:
      "The account preserves a recurring resident-input invitation and the municipal packet says input shaped the proposal; response volume and a complete decision trail remain open."
  },
  {
    id: "INQ-KCTH-X-POSTED-URL-TRIAGE",
    project: "kc-town-hall",
    question:
      "What additional public-safe claims or source records emerge from the six posted destinations not yet close-read or recovered?",
    methods: [
      "Dispositioned every one of the 31 distinct short URLs.",
      "Separated promoted sources and repeated operational routes from destinations that still require recovery and close reading.",
      "Retained six concrete leads: two project videos, a community fundraiser, the project COVID-19 page, a project event, and a temporary-electricity implementation page."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Ten short-URL records map to promoted public sources and 15 map to governed operational link families.",
      "Six destinations remain explicit research leads rather than being silently omitted.",
      "No untriaged short URL remains in the complete corpus."
    ],
    limitations: [
      "Several displayed destinations are truncated historical interface labels.",
      "Recovery, authorship, relationship context, archival status, and public-safety review must precede claim promotion."
    ],
    sourceIds: [
      "SRC-KCTH-X-CORPUS-2026-07-15",
      "SRC-KCTH-X-POSTED-URL-TRIAGE-2026-07-15"
    ],
    publicSummary:
      "All 31 posted short URLs are dispositioned; six concrete destinations remain in a named recovery and close-reading queue."
  }
];

export const kcTownHallFullPopulationIntake = [
  {
    id: "INT-KCTH-X-FULL-POPULATION-2026-07-15",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "public-safe",
    title: "KC Town Hall complete X population and source inventory",
    description:
      "A redacted acquisition ledger, public-safe 183-record fixture, and complete 31-link triage preserve route provenance, posted-link metadata, operating-pattern classifications, bounded stakeholder responses, and dated visible-interaction observations.",
    whyItMatters:
      "It turns a preliminary social-media finding into reproducible evidence of a resident-input, recurring-service, civic-information, and stakeholder-dialogue surface.",
    projectIds: ["kc-town-hall"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Promoted through the existing KC Town Hall public-operations claim; source-circulation and volatile-engagement claims remain held in the bank.",
    sourceIds: [
      "SRC-KCTH-X-CORPUS-2026-07-15",
      "SRC-KCTH-X-ACQUISITION-LEDGER-2026-07-15",
      "SRC-KCTH-X-POSTED-URL-TRIAGE-2026-07-15",
      "SRC-KCTH-KANSAS-CITY-STAR-LEONS",
      "SRC-KCTH-NORTHEAST-NEWS-HOUSING-2018",
      "SRC-KCTH-CURBED-RENTER-CREDIT-2018",
      "SRC-KCTH-KCUR-PRIMARY-GUIDE-2018",
      "SRC-KCTH-RIDEKC-NEXT-2019",
      "SRC-KCTH-MISSOURI-VOTER-LOOKUP",
      "SRC-KCTH-KCATA-OZONE-ALERT",
      "SRC-KCTH-COVID-RESOURCE-QA-2020",
      "SRC-KCTH-PAINT-CLEANUP-VIDEO-2018",
      "SRC-KCTH-BRIDGING-GAP-DROPOFF-2019",
      "SRC-KCTH-OAK-PARK-AMPLIFICATION-2019",
      "SRC-KCTH-OAK-PARK-AMPLIFICATION-TRUTHERESME-2019"
    ],
    claimIds: [
      "CLM-KCTH-SOCIAL-PUBLIC-OPERATIONS",
      "CLM-KCTH-X-CIVIC-SOURCE-CIRCULATION",
      "CLM-KCTH-X-DATED-VISIBLE-ENGAGEMENT"
    ],
    inquiryIds: [
      "INQ-KCTH-SOCIAL-ARCHIVE",
      "INQ-KCTH-X-TIRE-TOTALS-CORROBORATION",
      "INQ-KCTH-X-SURVEY-DECISION-TRAIL",
      "INQ-KCTH-X-POSTED-URL-TRIAGE"
    ],
    boundaries: [
      "Do not publish post text, historical phone numbers, or precise pickup addresses.",
      "Do not infer individual authorship, independently audited outcomes, endorsement, project completion, or causal government impact."
    ]
  }
] satisfies IntakeRecordInput[];
