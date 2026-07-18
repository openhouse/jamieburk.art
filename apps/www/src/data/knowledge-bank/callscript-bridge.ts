import type { ResearchInquiry, SourceRecord } from "./schema.ts";

export const callscriptBridgeSources: SourceRecord[] = [
  {
    id: "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026-07-16",
    title: "Call Script Facebook page",
    organization: "Call Script",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-16",
    metadataVerifiedAt: "2026-07-16",
    metadataVerifiedBy: "Codex authenticated public-page review",
    reviewStatus: "close-read",
    contentReviewedAt: "2026-07-16",
    contentReviewedBy: "Codex authenticated public-page review",
    canonicalUrl: "https://www.facebook.com/callscript",
    preferredPublicUrl: "canonical",
    publicCitation: "Call Script Facebook page, accessed July 16, 2026.",
    publicNote:
      "The surviving page identifies Call Script as a representative-calling project and links to popular.vote. The current link is contextual evidence, not proof that the page displayed the link in 2017.",
    supportsGenerally: [
      "Call Script project identity",
      "a public link from Call Script to popular.vote",
      "continuity between civic-calling and event-sharing surfaces"
    ],
    doesNotEstablish: [
      "when the popular.vote link was added",
      "that Jamie authored every page post",
      "sole ownership of either project",
      "participation, attendance, reach, or policy impact"
    ]
  },
  {
    id: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
    title: "NYC DIY Spaces post Ghost Ship: Department of Cultural Affairs meeting and discussion",
    organization: "NYC Artist Coalition, Call Script, and cohosts",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-27",
    accessedAt: "2026-07-16",
    metadataVerifiedAt: "2026-07-16",
    metadataVerifiedBy: "Codex authenticated public-event review",
    reviewStatus: "close-read",
    contentReviewedAt: "2026-07-16",
    contentReviewedBy: "Codex authenticated public-event review",
    canonicalUrl: "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, Call Script, and cohosts, 'NYC DIY Spaces post Ghost Ship: Dept of Cultural Affairs Meeting,' event and discussion, January 27, 2017.",
    publicNote:
      "The public event record preserves a DCLA meeting, issue gathering, collaborative letter drafting, a group-naming poll in which NYC Artist Coalition was the leading displayed option at 57%, and routing into a February 6 follow-up meeting. No poll denominator is displayed.",
    supportsGenerally: [
      "Call Script as a cohost of the January 27, 2017 DCLA meeting",
      "public issue gathering before the meeting",
      "collaborative letter drafting",
      "a public group-naming poll",
      "a follow-up meeting and open agenda-setting sequence"
    ],
    doesNotEstablish: [
      "the poll denominator",
      "verified attendance or unique reach",
      "that Jamie authored every post or comment",
      "a complete founding roster",
      "sole production or policy causality"
    ]
  },
  {
    id: "SRC-WOWLIST-PRODUCTION-ARCHIVE-NYCAC-SEQUENCE-2017",
    title: "WOW List production archive event sequence around NYC Artist Coalition's emergence",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2017-07-22",
    accessedAt: "2026-07-16",
    reviewStatus: "close-read",
    contentReviewedAt: "2026-07-16",
    contentReviewedBy: "Codex read-only production-database review",
    publicCitation:
      "Public-safe aggregate review of a July 2017 WOW List production-database snapshot.",
    publicNote:
      "The protected snapshot preserves a public-event sequence from January Sunday Dinner civic gatherings to the January 27 DCLA meeting, February coalition meetings, and subsequent campaign activity. No user or participant record is published.",
    protectedLocatorId: "ARCHIVE-WOWLIST-PRODUCTION-NYCAC-SEQUENCE-2017-001",
    supportsGenerally: [
      "event-system continuity across Sunday Dinner, the DCLA meeting, and early coalition activity",
      "the January-to-February 2017 sequence",
      "use of the same event-sharing infrastructure across adjacent civic and cultural work"
    ],
    doesNotEstablish: [
      "that database sequence alone proves causality",
      "individual authorship of event copy",
      "attendance, reach, or conversion",
      "a complete coalition founding history",
      "permission to publish raw database records"
    ]
  },
  {
    id: "SRC-SUNDAY-DINNER-WORKING-LEDGER-2012-2021",
    title: "Sunday Dinner working participation ledger",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-06-06",
    accessedAt: "2026-07-16",
    reviewStatus: "close-read",
    contentReviewedAt: "2026-07-16",
    contentReviewedBy: "Codex protected-workbook review",
    publicCitation:
      "Public-safe structural review of a protected Sunday Dinner working ledger, July 2026.",
    publicNote:
      "The protected workbook preserves numbered gathering columns through 345, including a contemporaneous 300th record, and event-level response workflows spanning 2012 through 2021. Names, contact information, row-level markers, and formulas remain private.",
    protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-WORKING-LEDGER-2012-2021-001",
    supportsGenerally: [
      "numbered Sunday Dinner operating history through 345",
      "a contemporaneous 300th gathering record",
      "long-running participation and follow-up operations",
      "the bounded 300-plus project-history claim"
    ],
    doesNotEstablish: [
      "verified attendance at any gathering",
      "unique participant totals",
      "a clean or independently audited attendance census",
      "participant consent for publication",
      "permission to expose names, contact information, or row-level records"
    ]
  }
];

export const callscriptBridgeResearchInquiries: ResearchInquiry[] = [
  {
    id: "INQ-CALLSCRIPT-WOWLIST-NYCAC-BRIDGE-2026",
    project: "nyc-artist-coalition",
    question:
      "What public-safe evidence connects WOW List's civic event-sharing adaptation, Call Script, and Jamie's facilitation of NYC Artist Coalition's early operating structure?",
    methods: [
      "Close-read the authenticated public Call Script page and January 27, 2017 Facebook event discussion",
      "Reconciled public event metadata with the archived popular.vote surface",
      "Queried a read-only July 2017 WOW List production-database snapshot for the January-to-February event sequence",
      "Separated public records, protected corroboration, Jamie's first-hand role account, and unsupported causal inference"
    ],
    runAt: "2026-07-16",
    resultStatus: "partially-recovered",
    findings: [
      "Call Script currently links to popular.vote, the archived WOW List adaptation for civic events and meetings.",
      "Call Script cohosted the January 27 DCLA meeting and the public discussion preserved issue gathering, collaborative letter drafting, group naming, and follow-up meeting coordination.",
      "NYC Artist Coalition was the leading displayed naming-poll option at 57%; the page does not display a denominator.",
      "The protected WOW List snapshot independently preserves the adjacent January-to-February event sequence across Sunday Dinner, the DCLA meeting, and early coalition work."
    ],
    limitations: [
      "The current Call Script link does not establish when it was added.",
      "Page authorship does not establish Jamie's authorship of every post or comment.",
      "The event response display and contemporaneous reach language are not attendance, unique reach, or impact measures.",
      "The reviewed records do not provide a complete coalition founding roster or prove that one tool caused the coalition to form."
    ],
    sourceIds: [
      "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
      "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026-07-16",
      "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
      "SRC-WOWLIST-PRODUCTION-ARCHIVE-NYCAC-SEQUENCE-2017",
      "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026"
    ],
    publicSummary:
      "Public and protected records support a bounded account of Jamie using event-sharing, public discussion, collaborative drafting, collective naming, and follow-up convening to help emerging coalition work acquire usable structure.",
    protectedLocatorId: "RESEARCH-CALLSCRIPT-WOWLIST-NYCAC-BRIDGE-2026-001"
  },
  {
    id: "INQ-SUNDAY-DINNER-WORKING-LEDGER-2026",
    project: "196-sunday-dinner",
    question:
      "What can the protected Sunday Dinner working ledger defensibly establish about project continuity and the existing 300-plus claim?",
    methods: [
      "Reviewed workbook structure without copying participant rows into the repository",
      "Profiled sheet dimensions, numbered event headers, marker vocabulary, and formula coverage",
      "Checked milestone and date continuity while treating duplicated or missing labels as data-quality limitations",
      "Separated numbered operating history from attendance and unique-participant claims"
    ],
    runAt: "2026-07-16",
    resultStatus: "recovered",
    findings: [
      "The working ledger preserves numbered gathering columns through 345, including a contemporaneous 300th record.",
      "The event columns span 2012 through 2021 and retain recurring response and follow-up markers.",
      "The ledger strengthens the existing 300-plus project-history claim as protected project-record support."
    ],
    limitations: [
      "The ledger contains duplicate and missing numeric labels and is not a clean independent attendance audit.",
      "Markers do not establish verified attendance or unique participant totals.",
      "Names, contact information, row-level records, and formulas remain protected."
    ],
    sourceIds: [
      "SRC-SUNDAY-DINNER-WORKING-LEDGER-2012-2021",
      "SRC-JAMIE-APPROVED-RESUME-2026-07-13",
      "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
      "SRC-FACEBOOK-SUNDAY-DINNER-200-2016"
    ],
    publicSummary:
      "A protected working ledger supports Sunday Dinner's numbered history beyond 300 while remaining unsuitable for attendance or unique-participant claims.",
    protectedLocatorId: "RESEARCH-SUNDAY-DINNER-WORKING-LEDGER-2026-001"
  }
];
