import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = ["Jamie Burkart", "Codex public-safe archival review"];

export const participationLineageSources: SourceRecord[] = [
  {
    id: "SRC-WOWLIST-CIVIC-LINEAGE-AGGREGATES-2017",
    title: "WOW List civic-participation lineage aggregate review",
    organization: "WOW List",
    author: "Codex archive review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2017-07-22",
    accessedAt: reviewedAt,
    publicCitation:
      "Public-safe aggregate review of civic and participatory records in the July 22, 2017, WOW List production database snapshot.",
    publicNote:
      "The snapshot contains first-class followable tags named Popular Vote and NYC Artist Coalition. The Popular Vote tag is associated with 933 post/event records and 880 calendar-mapping rows; NYC Artist Coalition is associated with 82 post/event records and 99 calendar-mapping rows. These are historical database associations, not unique events, people, attendance, endorsement, or impact.",
    protectedLocatorId: "ARCHIVE-WOWLIST-DATABASE-SNAPSHOT-2017",
    supportsGenerally: [
      "Popular Vote and NYC Artist Coalition existed as followable keyword communities in the production data model",
      "933 Popular Vote post/event associations and 880 calendar-mapping rows",
      "82 NYC Artist Coalition post/event associations and 99 calendar-mapping rows",
      "civic organizing was represented inside WOW List's event-distribution system"
    ],
    doesNotEstablish: [
      "unique events or completed gatherings",
      "unique people, followers, attendees, endorsers, or beneficiaries",
      "that every calendar-mapping row represents a distinct public export",
      "Jamie's authorship of every record",
      "that WOW List alone created popular.vote or NYC Artist Coalition",
      "policy causality or current activity"
    ]
  },
  {
    id: "SRC-CALLSCRIPT-FACEBOOK-PAGE-2017",
    title: "Call Script Facebook Page",
    organization: "Call Script",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/callscript",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Call Script public Facebook Page, reviewed July 16, 2026.",
    publicNote:
      "The Page identifies Call Script with the invitation 'Call your representatives. simply make change' and links to popular.vote.",
    supportsGenerally: [
      "Call Script's public identity",
      "a public connection from Call Script to popular.vote",
      "a resident-facing civic-action purpose"
    ],
    doesNotEstablish: [
      "the Page's complete publishing history",
      "who authored every Page post",
      "Jamie's sole ownership or production",
      "measured participation or policy impact"
    ]
  },
  {
    id: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
    title:
      "NYC DIY Spaces post Ghost Ship: Department of Cultural Affairs meeting discussion",
    organization: "NYC Artist Coalition / Call Script",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-27",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public Facebook event and discussion for 'NYC DIY Spaces post Ghost Ship: Dept of Cultural Affairs Meeting,' January 27, 2017.",
    publicNote:
      "The public event names NYC Artist Coalition and Call Script among its presenters. In the discussion, Call Script invited participants to brainstorm asks, shared peer-coalition learning, and later NYC Artist Coalition directed participants to a February 6 general meeting at Magick City.",
    supportsGenerally: [
      "a January 27, 2017, Department of Cultural Affairs convening about DIY and alternative art spaces after the Ghost Ship fire",
      "NYC Artist Coalition and Call Script were displayed among the event presenters",
      "the discussion solicited public input about practical support and compliance",
      "the discussion circulated peer-coalition learning",
      "a coalition follow-up routed participants to a February 6 general meeting"
    ],
    doesNotEstablish: [
      "that every responder attended",
      "that a current Facebook response label is historical attendance or unique reach",
      "who authored every Page post or comment",
      "that Jamie alone created or produced the event, Call Script, or NYC Artist Coalition",
      "that the event caused coalition formation or a policy outcome",
      "permission to republish sensitive participant stories"
    ]
  },
  {
    id: "SRC-CALLSCRIPT-DCLA-DISCUSSION-PROTECTED-RUN-2026",
    title: "Authenticated public-safe Call Script and DCLA event discussion review",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Authenticated public-safe review of the Call Script Page and January 2017 DCLA event discussion, July 16, 2026.",
    publicNote:
      "The review separated public event chronology and institutional posts from mutable response labels, incomplete text expansion, shared Page authorship, participant identities, and a sensitive personal account that is not reproduced.",
    protectedLocatorId: "LOC-CALLSCRIPT-DCLA-DISCUSSION-REVIEW-2026",
    supportsGenerally: [
      "authenticated access to the public discussion surface",
      "chronology from the January 27 DCLA meeting to the February 6 general meeting",
      "public-safety and authorship-boundary review"
    ],
    doesNotEstablish: [
      "a native Meta owner export",
      "complete recovery of every historical comment or edit",
      "individual authorship of shared Page posts",
      "attendance, endorsement, reach, or policy causality",
      "permission to publish participant identities or sensitive stories"
    ]
  }
];

export const participationLineageClaims: ClaimRecord[] = [
  {
    id: "CLM-SUNDAY-DINNER-ATTENDANCE-LEDGER-STRUCTURE",
    project: "196-sunday-dinner",
    internalClaim:
      "A full structural pass over the protected Sunday Dinner workbook found 345 event columns carrying numeric prefixes, 2,714 affirmative attendance marks within those columns, and 273 columns with at least five marks.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The protected workbook contains 345 prefixed event columns; its aggregate attendance structure supports a sustained recurring practice without exposing person-level records.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"],
        rationale:
          "Keep the stronger quantitative structure in the bank while the public site uses the simpler approved 300-plus gathering scale."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-SUNDAY-DINNER-OPERATIONS-LEDGER-2012-2021",
        relationship: "private-support",
        supports: [
          "345 prefixed event columns",
          "2,714 affirmative attendance marks",
          "273 columns with at least five marks",
          "January 2012 through March 2021 chronology"
        ],
        locator: "Aggregate workbook structure only; person-level rows excluded",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Attendance marks are ledger entries, not verified door counts, unique people, or externally audited attendance.",
      "Repeated numeric prefixes and additional unnumbered event-like columns prevent treating the sequence labels as 345 unique serial numbers.",
      "Do not publish names, contact fields, invitation status, notes, or person-level attendance.",
      "The separate workbook inscription 'Meals Served' has not been independently defined or reconciled and is not an approved metric."
    ],
    antiClaims: [
      "Sunday Dinner had 2,714 unique attendees.",
      "The workbook proves 2,714 meals were served.",
      "Every event column independently proves a completed gathering.",
      "The 345 prefixed columns represent 345 distinct sequence numbers."
    ],
    researchInquiryIds: ["INQ-SUNDAY-DINNER-ATTENDANCE-PROVENANCE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-CIVIC-PARTICIPATION-LINEAGE",
    project: "wowlist",
    internalClaim:
      "The reviewed record documents a bounded participation-system lineage from Sunday Dinner's recurring calendar practice through WOW List, popular.vote, Call Script's public-input use around a January 2017 DCLA convening, and a follow-up route into NYC Artist Coalition's recurring meetings.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "The platform's participation model also moved into civic use: popular.vote organized post-election events, Call Script gathered public asks around a January 2017 cultural-agency meeting, and a coalition follow-up routed people into NYC Artist Coalition's recurring meetings.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
        rationale:
          "Show how a community-calendar operating model became civic participation infrastructure without claiming sole authorship or linear policy causality."
      },
      {
        key: "archive-note",
        text:
          "The archive documents a bounded lineage from Sunday Dinner to WOW List, popular.vote, Call Script, and recurring NYC Artist Coalition participation.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/wowlist",
          "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"
        ],
        rationale:
          "Preserve the cross-project relationship as a queryable claim with its causal and authorship boundaries attached."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19",
        relationship: "corroborating",
        supports: ["Sunday Dinner lineage", "WOW List's community-calendar role"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-POPULAR-VOTE-2016",
        relationship: "direct-support",
        supports: ["popular.vote civic-calendar reuse"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-CIVIC-LINEAGE-AGGREGATES-2017",
        relationship: "private-support",
        supports: [
          "Popular Vote and NYC Artist Coalition as followable communities",
          "historical event and calendar associations"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CALLSCRIPT-FACEBOOK-PAGE-2017",
        relationship: "direct-support",
        supports: ["Call Script's public link to popular.vote"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
        relationship: "direct-support",
        supports: [
          "public-input solicitation",
          "peer-coalition learning",
          "the February 6 coalition-meeting follow-up"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "corroborating",
        supports: ["the recurring NYC Artist Coalition meeting system"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "This is a documented lineage of operating models and public chronology, not proof that one project alone caused the next.",
      "Do not assign every WOW List record, Call Script post, event, or coalition action to Jamie.",
      "Keep popular.vote, Call Script, and NYC Artist Coalition collaborator credit intact.",
      "Facebook response labels are not attendance, unique people, reach, endorsement, or impact.",
      "The lineage does not establish sole founding credit or policy causality."
    ],
    antiClaims: [
      "WOW List alone created NYC Artist Coalition.",
      "Jamie solely founded or produced NYC Artist Coalition.",
      "The January 2017 event response label proves 445 people attended.",
      "Database follows, stars, event rows, or calendar mappings equal unique participants or endorsements.",
      "The January 2017 meeting alone caused later policy outcomes."
    ],
    researchInquiryIds: ["INQ-CALLSCRIPT-AUTHORSHIP-AND-LINEAGE"],
    reviewedAt,
    reviewedBy
  }
];

export const participationLineageInquiries: ResearchInquiry[] = [
  {
    id: "INQ-SUNDAY-DINNER-ATTENDANCE-PROVENANCE",
    project: "196-sunday-dinner",
    question:
      "How should the Sunday Dinner workbook's attendance marks, duplicate sequence prefixes, unnumbered event-like columns, and 'Meals Served' inscription be defined and reconciled?",
    methods: [
      "Read the exact Drive-hosted workbook rather than a derived transcription.",
      "Enumerated every sheet and every event-like column in the main ledger.",
      "Counted numeric prefixes, distinct prefixes, affirmative attendance marks, and per-column summary distributions without exporting person-level rows."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The main ledger contains 345 prefixed event columns and four additional unnumbered event-like columns.",
      "The prefixed columns use 340 distinct numeric prefixes because five prefixes repeat or conflict.",
      "The prefixed columns contain 2,714 affirmative attendance marks; 273 have at least five marks and 93 have at least ten.",
      "The ledger spans January 22, 2012, through March 7, 2021."
    ],
    limitations: [
      "Ledger marks are not independently audited door counts or unique-person measures.",
      "The meaning and provenance of the 'Meals Served' inscription remain unresolved.",
      "Person-level rows remain protected and were not exported to the repository."
    ],
    sourceIds: ["SRC-SUNDAY-DINNER-OPERATIONS-LEDGER-2012-2021"],
    publicSummary:
      "The complete workbook structure supports a sustained 300-plus gathering practice; person-level attendance and the unresolved meals inscription remain outside public claims.",
    protectedLocatorId: "RESEARCH-SUNDAY-DINNER-ATTENDANCE-2026"
  },
  {
    id: "INQ-CALLSCRIPT-AUTHORSHIP-AND-LINEAGE",
    project: "nyc-artist-coalition",
    question:
      "Which collaborators created, administered, and authored Call Script and its event discussion posts, and what additional records can distinguish infrastructure continuity from coalition-formation causality?",
    methods: [
      "Reviewed the authenticated Call Script Page and the complete currently exposed discussion for the January 27, 2017, DCLA event.",
      "Separated Page identity from individual post authorship.",
      "Cross-read the discussion chronology against the existing popular.vote source, WOW List database aggregates, and NYC Artist Coalition event census."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Call Script publicly linked to popular.vote.",
      "The DCLA event displayed NYC Artist Coalition and Call Script among its presenters.",
      "The discussion solicited practical public asks and shared peer-coalition learning.",
      "A later NYC Artist Coalition post in the discussion routed participants to the February 6 general meeting."
    ],
    limitations: [
      "A native Page export and collaborator-authored production history were not recovered.",
      "Shared Page identity does not establish individual post authorship.",
      "The chronology does not establish that a single event or tool caused coalition formation or policy outcomes.",
      "Sensitive participant stories and mutable response labels remain excluded from public claims."
    ],
    sourceIds: [
      "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19",
      "SRC-WOWLIST-CIVIC-LINEAGE-AGGREGATES-2017",
      "SRC-WOWLIST-POPULAR-VOTE-2016",
      "SRC-CALLSCRIPT-FACEBOOK-PAGE-2017",
      "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
      "SRC-CALLSCRIPT-DCLA-DISCUSSION-PROTECTED-RUN-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026"
    ],
    publicSummary:
      "The public chronology establishes an operating bridge from popular.vote and Call Script into recurring coalition participation; individual authorship and formation causality remain open.",
    protectedLocatorId: "LOC-CALLSCRIPT-DCLA-DISCUSSION-REVIEW-2026"
  }
];

export const participationLineageIntake: IntakeRecordInput[] = [
  {
    id: "INT-WOWLIST-CIVIC-LINEAGE-DATABASE-2026-07-16",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "WOW List civic-participation database lineage",
    description:
      "A read-only aggregate pass found Popular Vote and NYC Artist Coalition represented as first-class followable communities in the July 2017 WOW List production snapshot.",
    whyItMatters:
      "It makes civic adaptation of the platform's community-calendar model inspectable without publishing users, contacts, locations, or raw records.",
    projectIds: ["wowlist", "nyc-artist-coalition"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Created a bounded cross-project lineage claim; database row counts remain archival context rather than impact metrics.",
    sourceIds: ["SRC-WOWLIST-CIVIC-LINEAGE-AGGREGATES-2017"],
    claimIds: ["CLM-WOWLIST-CIVIC-PARTICIPATION-LINEAGE"],
    inquiryIds: ["INQ-CALLSCRIPT-AUTHORSHIP-AND-LINEAGE"],
    boundaries: [
      "Do not publish person-level database rows, contact data, coordinates, follows, stars, or raw records.",
      "Do not convert database associations into unique events, people, attendance, endorsement, or impact."
    ]
  },
  {
    id: "INT-SUNDAY-DINNER-ATTENDANCE-STRUCTURE-2026-07-16",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Sunday Dinner attendance-ledger structural review",
    description:
      "A full workbook pass reconciled event-column structure and aggregate attendance marks while keeping every person-level row private.",
    whyItMatters:
      "It strengthens the evidence behind a sustained recurring participation practice and corrects the earlier shorthand that treated every prefixed column as a unique serial number.",
    projectIds: ["196-sunday-dinner"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Created a bounded aggregate claim and retained the meals inscription and unique-person interpretation as open research.",
    sourceIds: ["SRC-SUNDAY-DINNER-OPERATIONS-LEDGER-2012-2021"],
    claimIds: [
      "CLM-SUNDAY-DINNER-RESIDENCY-OPERATING-RECORDS",
      "CLM-SUNDAY-DINNER-ATTENDANCE-LEDGER-STRUCTURE"
    ],
    inquiryIds: ["INQ-SUNDAY-DINNER-ATTENDANCE-PROVENANCE"],
    correctionIds: ["COR-SUNDAY-DINNER-PREFIXED-COLUMNS-2026"],
    boundaries: [
      "Do not publish person-level attendance, names, contacts, notes, or invitation status.",
      "Do not equate marks with unique people, verified door counts, or meals served.",
      "Do not treat every prefixed column as a distinct serial number."
    ]
  },
  {
    id: "INT-CALLSCRIPT-DCLA-LINEAGE-2026-07-16",
    receivedAt: reviewedAt,
    kind: "public-url",
    visibility: "public-safe",
    title: "Call Script and January 2017 DCLA event discussion",
    description:
      "Authenticated public-safe review of the Call Script Page and the currently exposed discussion for a January 2017 DCLA meeting about DIY and alternative art spaces.",
    whyItMatters:
      "The chronology documents public-input gathering, peer learning, and a concrete route from a cultural-agency convening into recurring NYC Artist Coalition participation.",
    projectIds: ["wowlist", "nyc-artist-coalition"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Created a bounded civic-participation lineage claim; individual Page authorship, attendance, sensitive stories, and causal claims remain excluded.",
    sourceIds: [
      "SRC-CALLSCRIPT-FACEBOOK-PAGE-2017",
      "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
      "SRC-CALLSCRIPT-DCLA-DISCUSSION-PROTECTED-RUN-2026"
    ],
    claimIds: ["CLM-WOWLIST-CIVIC-PARTICIPATION-LINEAGE"],
    inquiryIds: ["INQ-CALLSCRIPT-AUTHORSHIP-AND-LINEAGE"],
    boundaries: [
      "Do not treat a Facebook response label as attendance, unique people, reach, endorsement, or impact.",
      "Do not assign shared Page posts or collective events to Jamie without source-specific attribution.",
      "Do not reproduce sensitive participant stories or incomplete comments."
    ]
  }
];
