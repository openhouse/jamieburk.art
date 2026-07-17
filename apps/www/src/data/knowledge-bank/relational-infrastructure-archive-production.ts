import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const relationalInfrastructureIntakes = [
  {
    id: "INT-2026-07-15-WOWLIST-DB-RELATIONAL-SNAPSHOT",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "A private July 2017 WOW List database snapshot used to inspect aggregate post, tag, follow, and source relationships without publishing user or event records.",
    projectIds: ["wowlist", "196-sunday-dinner", "nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2017-07-22"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-WOWLIST-DB-SNAPSHOT-2017-07"],
    claimIds: [
      "CLM-WOWLIST-DB-SNAPSHOT-SCALE-2017",
      "CLM-WOWLIST-RELATIONAL-TAG-OVERLAP-2017",
      "CLM-CALLSCRIPT-POPULAR-VOTE-NYCARTC-BRIDGE"
    ],
    inquiryIds: ["INQ-WOWLIST-CALLSCRIPT-NYCARTC-ROLE-ATTRIBUTION"],
    protectedLocatorId: "WOWLIST-DB-SNAPSHOT-2017-07-001"
  },
  {
    id: "INT-2026-07-15-SUNDAY-DINNER-ATTENDANCE-WORKBOOK",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "A protected Sunday Dinner working workbook used only for aggregate analysis of the gathering sequence and recorded participation marks.",
    projectIds: ["196-sunday-dinner"],
    entityIds: [],
    dateHints: ["2012-01-22", "2021-03-07"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2021"],
    claimIds: ["CLM-SUNDAY-DINNER-WORKBOOK-AGGREGATE"],
    inquiryIds: ["INQ-SUNDAY-DINNER-WORKBOOK-MARK-SEMANTICS"],
    protectedLocatorId: "SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2021-001"
  },
  {
    id: "INT-2026-07-15-FB-CALLSCRIPT-PAGE",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "The public Call Script Facebook page linking to popular.vote and preserving a March 2017 NYC Artist Coalition meeting invitation and agenda.",
    submittedUrl: "https://www.facebook.com/callscript",
    projectIds: ["wowlist", "nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2017-03-02", "2017-03-06"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-FB-CALLSCRIPT-PAGE-2017"],
    claimIds: ["CLM-CALLSCRIPT-POPULAR-VOTE-NYCARTC-BRIDGE"],
    inquiryIds: ["INQ-WOWLIST-CALLSCRIPT-NYCARTC-ROLE-ATTRIBUTION"]
  }
] satisfies IntakeItem[];

export const relationalInfrastructureSources = [
  {
    id: "SRC-WOWLIST-DB-SNAPSHOT-2017-07",
    title: "WOW List PostgreSQL database snapshot",
    organization: "WOW List",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation: "Private WOW List database snapshot dated July 22, 2017; aggregate review completed July 15, 2026.",
    publicNote: "The aggregate review preserves system scale and selected tag relationships while excluding users, post bodies, contact data, geolocation, and row-level records.",
    locator: "Post, post-tag, tag, follow-tag, and source table aggregates; private snapshot identifier only.",
    projectIds: ["wowlist", "196-sunday-dinner", "nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-15-WOWLIST-DB-RELATIONAL-SNAPSHOT"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex local database archival review"],
    supportsGenerally: [
      "16,142 post records, 45,562 post-tag relationships, 23,864 tags, 28,837 follow-tag records, and 35 source records in the snapshot",
      "aggregate relationships among the Sunday Dinner, Popular Vote, and NYC Artist Coalition tags",
      "the January 27, 2017 DCLA event record was tagged Sunday Dinner, Popular Vote, NYC Artist Coalition, and WOW a Day"
    ],
    doesNotEstablish: [
      "physical attendance, reach, impressions, conversion, or policy impact",
      "that every tagged record was authored, produced, or attended by Jamie",
      "that a follow-tag record represents a distinct current person or follower",
      "that database event dates are uniformly complete or error-free",
      "sole authorship, coalition founding, or the individual operator of a social account"
    ],
    protectedLocatorId: "WOWLIST-DB-SNAPSHOT-2017-07-001"
  },
  {
    id: "SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2021",
    title: "Sunday Dinner participation working workbook",
    organization: "Sunday Dinner",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation: "Protected Sunday Dinner operational workbook, aggregate review completed July 15, 2026.",
    publicNote: "Only aggregate structure and mark counts are retained in the public repository; participant rows and contact fields remain protected.",
    locator: "Main worksheet event headers and Y/N mark aggregates; no names, contact fields, notes, or row-level records retained.",
    projectIds: ["196-sunday-dinner"],
    intakeIds: ["INT-2026-07-15-SUNDAY-DINNER-ATTENDANCE-WORKBOOK"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected workbook aggregate review"],
    supportsGenerally: [
      "346 numbered gathering columns spanning headers from January 2012 through March 2021",
      "341 numbered columns with at least one recorded Y mark",
      "2,726 recorded Y marks across 411 participant rows",
      "duplicate sequence labels, missing sequence numbers, and three zero-mark columns requiring interpretive caution"
    ],
    doesNotEstablish: [
      "that every Y mark means physical attendance rather than invitation, intention, participation, or another working status",
      "an independently audited event count, attendance count, or unique-person count",
      "that every numbered gathering occurred",
      "permission to publish participant identities, contact details, notes, or row-level history"
    ],
    protectedLocatorId: "SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2021-001"
  },
  {
    id: "SRC-FB-CALLSCRIPT-PAGE-2017",
    title: "Call Script Facebook page and March 2017 NYC Artist Coalition meeting post",
    organization: "Call Script",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/callscript",
    preferredPublicUrl: "canonical",
    publicCitation: "Call Script, public Facebook page and March 2, 2017 NYC Artist Coalition meeting post, accessed July 15, 2026.",
    publicNote: "The page links Call Script to popular.vote and preserves a dated post routing readers to an NYC Artist Coalition general meeting at The Floasis.",
    locator: "Page link field; profile description; public post dated March 2, 2017 and attached March 6 general-meeting event.",
    projectIds: ["wowlist", "nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-15-FB-CALLSCRIPT-PAGE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated Facebook close reading"],
    supportsGenerally: [
      "Call Script's public page links to popular.vote",
      "Call Script's public description frames the project around calling representatives",
      "a March 2, 2017 Call Script post promoted the March 6 NYC Artist Coalition general meeting",
      "the promoted agenda joined fire-guard training, arts-space town-hall strategy, community-space survey design, and member-led group discussion"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship or management of the Call Script account",
      "the individual author of the March 2 post",
      "attendance, completion of every agenda item, or the meeting's outcomes",
      "that Call Script or popular.vote alone founded NYC Artist Coalition"
    ]
  }
] satisfies SourceRecord[];

export const relationalInfrastructureClaims = [
  {
    id: "CLM-WOWLIST-DB-SNAPSHOT-SCALE-2017",
    project: "wowlist",
    claimType: "metric",
    internalClaim: "The July 22, 2017 WOW List snapshot contains 16,142 post records, 45,562 post-tag relationships, 23,864 tag records, 28,837 follow-tag records, and 35 source records.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [{
      sourceId: "SRC-WOWLIST-DB-SNAPSHOT-2017-07",
      relationship: "private-support",
      supports: ["snapshot table counts"],
      locator: "Aggregate COPY-row counts for selected tables.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["These are database records and relationships, not audited people, attendance, reach, active-user, or impact counts."],
    antiClaims: ["WOW List had 28,837 users or followers.", "Every post record represents a distinct event that occurred."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex local database archival review"]
  },
  {
    id: "CLM-WOWLIST-RELATIONAL-TAG-OVERLAP-2017",
    project: "wowlist",
    claimType: "metric",
    internalClaim: "In the July 2017 WOW List snapshot, 67 post records carried both Popular Vote and Sunday Dinner tags, 34 carried Popular Vote and NYC Artist Coalition tags, 33 carried NYC Artist Coalition and Sunday Dinner tags, and 9 carried all three.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [{
      sourceId: "SRC-WOWLIST-DB-SNAPSHOT-2017-07",
      relationship: "private-support",
      supports: ["deduplicated post-tag intersections", "the January 27 DCLA event's four tag assignments"],
      locator: "Post-tag edges for Sunday Dinner, Popular Vote, NYC Artist Coalition, and WOW a Day.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Tag overlap documents cataloging and civic-cultural routing inside WOW List; it is not an attendance, authorship, reach, conversion, or causality measure.",
      "The tags can include externally sourced records and do not mean every listed event was produced by the tagged project."
    ],
    antiClaims: [
      "The 34 shared records prove Call Script created NYC Artist Coalition.",
      "The tag intersections count unique participants or attendees.",
      "Jamie authored or produced every intersecting record."
    ],
    researchInquiryIds: ["INQ-WOWLIST-CALLSCRIPT-NYCARTC-ROLE-ATTRIBUTION"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex local database archival review"]
  },
  {
    id: "CLM-SUNDAY-DINNER-WORKBOOK-AGGREGATE",
    project: "196-sunday-dinner",
    claimType: "metric",
    internalClaim: "The protected Sunday Dinner workbook contains 346 numbered gathering columns, including 341 with at least one recorded Y mark, and 2,726 Y marks across 411 participant rows; its headers span January 2012 through March 2021.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [{
      sourceId: "SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2021",
      relationship: "private-support",
      supports: ["numbered-column count", "Y-mark aggregates", "header date span", "sequence anomalies"],
      locator: "Main worksheet aggregate analysis only.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Y-mark semantics are not resolved well enough to call every mark physical attendance.",
      "Duplicate sequence labels, missing sequence numbers, and zero-mark columns prevent conversion into an exact completed-event count.",
      "Participant rows are protected working records, not a publishable or independently audited unique-person denominator."
    ],
    antiClaims: [
      "2,726 people attended Sunday Dinner.",
      "The workbook independently proves exactly 346 completed gatherings.",
      "The public repository may expose participant rows or contact details."
    ],
    researchInquiryIds: ["INQ-SUNDAY-DINNER-WORKBOOK-MARK-SEMANTICS"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected workbook aggregate review"]
  },
  {
    id: "CLM-CALLSCRIPT-POPULAR-VOTE-NYCARTC-BRIDGE",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "Contemporaneous public and private records document a practical bridge from WOW List's Popular Vote layer through Call Script into early NYC Artist Coalition participation: Call Script linked to popular.vote, co-presented the January 27 DCLA event, and promoted the March general meeting's safety, town-hall, survey, and member-group agenda; WOW List indexed the January event under Popular Vote, Sunday Dinner, NYC Artist Coalition, and WOW a Day.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [{
      key: "archive-note",
      text: "Call Script connected popular.vote's civic-action layer with early NYC Artist Coalition participation, routing people from a DCLA cultural-space meeting into practical safety, listening, survey, and town-hall work.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-FB-CALLSCRIPT-PAGE-2017",
        relationship: "direct-support",
        supports: ["popular.vote link", "representative-calling framing", "March 2017 coalition-meeting route and agenda"],
        locator: "Public Page fields and March 2 post.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-NYCARTC-EVENT-388137698233507",
        relationship: "direct-support",
        supports: ["January 27 DCLA meeting", "Call Script and NYC Artist Coalition event relationship", "public invitation to pack the room and discuss requests"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-DB-SNAPSHOT-2017-07",
        relationship: "private-support",
        supports: ["the January event's Popular Vote, Sunday Dinner, NYC Artist Coalition, and WOW a Day tag assignments"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The records establish a functional connection among project surfaces and organizing activity; they do not independently assign the design, facilitation, publishing, or founding work to Jamie.",
      "Call Script, WOW List, and NYC Artist Coalition were collective or multi-operator contexts; preserve collaborator credit.",
      "A tagged or promoted event is not proof of attendance, conversion, agenda completion, policy impact, or sole causality."
    ],
    antiClaims: [
      "Jamie alone created every project, account, post, event, or coalition practice in this chain.",
      "Call Script or popular.vote by itself founded NYC Artist Coalition.",
      "The January DCLA meeting or March agenda proves legislative outcomes."
    ],
    researchInquiryIds: ["INQ-WOWLIST-CALLSCRIPT-NYCARTC-ROLE-ATTRIBUTION"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated and local archival review"]
  }
] satisfies ClaimRecord[];

export const relationalInfrastructureResearchInquiries = [
  {
    id: "INQ-SUNDAY-DINNER-WORKBOOK-MARK-SEMANTICS",
    project: "196-sunday-dinner",
    intakeIds: ["INT-2026-07-15-SUNDAY-DINNER-ATTENDANCE-WORKBOOK"],
    question: "What do the Sunday Dinner workbook's Y and N marks mean across periods, and which numbered columns correspond to completed gatherings rather than invitations, plans, or administrative placeholders?",
    methods: [
      "Inspected workbook structure and formulas without retaining participant rows in the repository.",
      "Counted numbered columns, Y/N marks, rows with Y marks, sequence gaps, duplicate labels, and zero-mark columns.",
      "Compared the header span with the existing public-safe 300-plus-gatherings wording."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The main worksheet contains 346 numbered columns; 341 contain at least one Y mark.",
      "The sheet contains 2,726 Y marks across 411 participant rows.",
      "The sequence includes duplicate labels, missing numbers, and three zero-mark columns."
    ],
    limitations: [
      "The workbook uses working labels including yes count, invites count, and yesness; Y cannot be equated with physical attendance without further interpretation.",
      "The workbook is an operational record, not an independent audit.",
      "Participant identities, contact fields, notes, and row histories remain protected."
    ],
    sourceIds: ["SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2021"],
    publicSummary: "Protected operational records strongly support a long-running 300-plus gathering practice while leaving exact attendance semantics and completed-event totals open.",
    protectedLocatorId: "SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2021-001"
  },
  {
    id: "INQ-WOWLIST-CALLSCRIPT-NYCARTC-ROLE-ATTRIBUTION",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-15-WOWLIST-DB-RELATIONAL-SNAPSHOT",
      "INT-2026-07-15-FB-CALLSCRIPT-PAGE"
    ],
    question: "How did Jamie's WOW List, Popular Vote, and Call Script work contribute to the formation and participation practices of NYC Artist Coalition, and which parts can collaborators independently corroborate?",
    methods: [
      "Inspected aggregate WOW List post-tag relationships in the July 2017 database snapshot.",
      "Closely read the authenticated public Call Script page and its March 2, 2017 coalition-meeting post.",
      "Re-read the January 27, 2017 DCLA event description and Page relationships.",
      "Separated functional project linkage from individual authorship, facilitation, founding, attendance, and policy causality."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Call Script publicly links to popular.vote and frames itself around calling representatives.",
      "Call Script and NYC Artist Coalition are both publicly associated with the January 27 DCLA cultural-space meeting, whose description asked people to pack the room and discuss requests.",
      "A March 2 Call Script post routed readers to the coalition's March general meeting and named fire-guard training, arts-space town-hall strategy, community-space survey design, and member-led groups.",
      "WOW List's snapshot indexed the January event under Popular Vote, Sunday Dinner, NYC Artist Coalition, and WOW a Day."
    ],
    limitations: [
      "The records do not identify the individual author or operator behind each account action.",
      "The records do not independently establish Jamie's exact facilitation share or a single formal founding moment.",
      "Collaborator testimony and additional contemporaneous working records are still needed for person-level role allocation.",
      "Tags, posts, and response signals do not establish attendance, conversion, reach, or policy impact."
    ],
    sourceIds: [
      "SRC-WOWLIST-DB-SNAPSHOT-2017-07",
      "SRC-FB-CALLSCRIPT-PAGE-2017",
      "SRC-FB-NYCARTC-EVENT-388137698233507"
    ],
    publicSummary: "Contemporaneous records document a functional bridge from popular.vote and Call Script into early coalition participation, while Jamie's exact person-level contribution still requires collaborator corroboration."
  }
] satisfies ResearchInquiry[];
