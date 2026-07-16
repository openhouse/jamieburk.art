import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = [
  "Jamie Burkart",
  "Codex archival-production review"
];

export const participationLineageSourceRecords20260716 = [
  {
    id: "SRC-WOWLIST-PRODUCTION-DB-SNAPSHOT-2017-07-22",
    title: "WOW List production database snapshot",
    organization: "WOW List",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2017-07-22",
    accessedAt: reviewedAt,
    publicCitation:
      "Protected WOW List production database snapshot created July 22, 2017; public-safe aggregate review completed July 16, 2026.",
    publicNote:
      "Only reproducible aggregate counts are retained in the public repository. User, organizer, event, geolocation, authentication, and contact records remain protected.",
    captureFingerprint:
      "sha256:6987cc78a4b307487150642f17be66e7779999d308a2080abe5fedf9a7122695",
    protectedLocatorId: "ARCHIVE-WOWLIST-PRODUCTION-DB-2017-07-22",
    supportsGenerally: [
      "1,846 user rows in the dated snapshot",
      "16,142 post and event rows in the dated snapshot",
      "35 city-region pairs with at least 50 geocoded posts in a reproducible aggregate join",
      "historical product structures for tags, follows, stars, attendance signals, activity, calendars, and geolocation"
    ],
    doesNotEstablish: [
      "current users, current activity, or a current operating service",
      "unique active people or verified event attendance",
      "official chapters in 35 cities",
      "independent adoption, reach, impact, or a complete project history",
      "permission to publish row-level records"
    ]
  },
  {
    id: "SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021",
    title: "Sunday Dinner historical attendance-signals workbook",
    organization: "Sunday Dinner",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2012-01-22 through 2021-03-07",
    accessedAt: reviewedAt,
    publicCitation:
      "Protected Sunday Dinner operational workbook spanning January 2012 through March 2021; public-safe aggregate review completed July 16, 2026.",
    publicNote:
      "Only structural and aggregate findings are retained. Names, contact fields, row-level histories, annotations, and the underlying workbook remain protected.",
    captureFingerprint:
      "sha256:8d04b588d731191f82e08430c4f314d3cb8ae2985714bef4c3b16cbd7c4f13f7",
    protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021",
    supportsGenerally: [
      "349 event columns spanning January 2012 through March 2021",
      "344 event columns with at least one canonical affirmative attendance signal",
      "2,767 canonical affirmative marks across 409 named rows",
      "a recurring operational record connecting gatherings and participation signals over time"
    ],
    doesNotEstablish: [
      "an audited all-time event census",
      "physical attendance at every listed gathering",
      "409 unique people or 2,767 unique attendances",
      "an uninterrupted weekly schedule",
      "the complete stewardship history or individual authorship of every entry",
      "permission to publish names, contact details, annotations, or row-level histories"
    ]
  },
  {
    id: "SRC-FACEBOOK-CALLSCRIPT-PAGE-2026",
    title: "Call Script Facebook Page profile",
    organization: "Call Script",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/callscript",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Call Script, Facebook Page profile linking the project to popular.vote, reviewed July 16, 2026.",
    publicNote:
      "The current Page profile documents project identity and a popular.vote destination. It does not identify who authored every post or whether every profile field is unchanged since 2017.",
    supportsGenerally: [
      "Call Script project identity",
      "the Page description 'Call your representatives. simply make change'",
      "a displayed link from Call Script to popular.vote"
    ],
    doesNotEstablish: [
      "Jamie's authorship of every Call Script post or profile field",
      "sole ownership of Call Script or popular.vote",
      "participation totals, adoption, reach, or policy impact",
      "the exact date on which the displayed profile link was added"
    ]
  },
  {
    id: "SRC-FACEBOOK-CALLSCRIPT-DCA-EVENT-DISCUSSION-2017",
    title: "NYC DIY Spaces post-Ghost Ship DCA meeting and discussion",
    organization: "NYC Artist Coalition, Call Script, and collaborators",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-27",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public Facebook event and discussion for the January 27, 2017, post-Ghost Ship meeting at the New York City Department of Cultural Affairs.",
    publicNote:
      "The surviving interface displays Call Script and NYC Artist Coalition among the hosts and preserves dated follow-up posts. Current host labels may reflect later edits; response labels are not attendance.",
    supportsGenerally: [
      "a January 27, 2017, public gathering at the New York City Department of Cultural Affairs focused on DIY and alternative art spaces after Ghost Ship",
      "a January 28 Call Script recap proposing a united voice and a group email",
      "a January 31 NYC Artist Coalition follow-up poll inviting participants to select a date and later set the agenda"
    ],
    doesNotEstablish: [
      "physical attendance or unique reach",
      "that Jamie authored the event description, recap, poll, or every Call Script post",
      "that the current host display is identical to its original 2017 state",
      "independent verification of an attributed commissioner statement about turnout",
      "sole causality for the coalition's formation or later policy outcomes"
    ]
  },
  {
    id: "SRC-FACEBOOK-NYCAC-FIRST-GENERAL-MEETING-2017",
    title: "DIY: NYC Artist Coalition - General Meeting Facebook event",
    organization: "NYC Artist Coalition and Magick City",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-02-06",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/406505576359490/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition and Magick City, public Facebook event for the February 6, 2017, general meeting.",
    publicNote:
      "The event description documents collective formation and participant-direction language. Facebook response labels are not attendance, and the page does not assign Jamie individual authorship or facilitation credit.",
    supportsGenerally: [
      "a February 6, 2017, general meeting at Magick City",
      "an invitation to create a coalition and direct its work",
      "a stated network of mutual support and advocacy",
      "a commitment to develop recommendations together for New York City's cultural plan"
    ],
    doesNotEstablish: [
      "physical attendance, unique people, reach, endorsement, or impact",
      "Jamie's authorship of the description or sole facilitation of the meeting",
      "the complete founding group or division of labor",
      "that every recommendation was adopted by government"
    ]
  }
] satisfies SourceRecord[];

export const participationLineageClaimRecords20260716 = [
  {
    id: "CLM-WOWLIST-DB-SCALE-SNAPSHOT-2017",
    project: "wowlist",
    internalClaim:
      "A reproducible July 2017 WOW List production database snapshot contains 1,846 user rows and 16,142 post and event rows; a public-safe geographic join yields 35 city-region pairs with at least 50 geocoded posts.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "A dated production snapshot independently reproduces the portfolio's rounded historical scale: 1,800+ users, 16,000+ posts/events, and activity across roughly 35 city ecosystems.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-PRODUCTION-DB-SNAPSHOT-2017-07-22",
        relationship: "private-support",
        supports: [
          "the dated user and post/event row counts",
          "the 35-pair geographic threshold"
        ],
        locator:
          "table data sections and a city-region aggregate join restricted to geocoded posts",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The counts describe one dated production snapshot, not current activity or an all-time immutable census.",
      "Rows are database records and do not automatically equal active people, attended events, or independently verified impact.",
      "The 35 city-region pairs are an aggregate activity threshold, not official chapters."
    ],
    antiClaims: [
      "WOW List currently has 1,846 active users.",
      "WOW List operated official chapters in 35 cities.",
      "The database proves adoption, reach, attendance, or impact."
    ],
    researchInquiryIds: ["INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-SUNDAY-DINNER-HISTORICAL-OPERATIONS-2012-2021",
    project: "196-sunday-dinner",
    internalClaim:
      "A protected Sunday Dinner operations workbook records 349 event columns from January 2012 through March 2021; 344 columns contain at least one canonical affirmative mark, with 2,767 affirmative marks across 409 named rows.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "A protected operational workbook documents 300+ recurring Sunday Dinner event columns across 2012-2021.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021",
        relationship: "private-support",
        supports: [
          "the event-column count and date span",
          "the canonical affirmative-mark aggregates"
        ],
        locator:
          "main sheet, event columns 15 through 363; canonical Y and N values only",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "A named row may represent more than one person and names were not independently deduplicated.",
      "Only canonical Y and N values were counted; blanks and other annotations were excluded.",
      "The workbook is a living operational record, not an audited attendance census or immutable all-time archive.",
      "Duplicate numbered headers, numbering gaps, and unnumbered event slots remain explicit data-quality limits.",
      "No row-level data, names, contact fields, or attendance histories may be published."
    ],
    antiClaims: [
      "409 rows equal 409 unique people.",
      "2,767 marks equal 2,767 unique attendees or verified physical attendances.",
      "Every listed event occurred exactly as recorded.",
      "The workbook establishes the complete Sunday Dinner stewardship history."
    ],
    researchInquiryIds: ["INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-CALLSCRIPT-POPULAR-VOTE-LINK",
    project: "callscript",
    internalClaim:
      "The current Call Script Facebook Page displays popular.vote as its project link, while the recovered popular.vote archive identifies the destination as a WOW List event-sharing surface.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Call Script's public Page links to popular.vote, a recovered WOW List civic event-sharing surface.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-CALLSCRIPT-PAGE-2026",
        relationship: "direct-support",
        supports: ["the displayed popular.vote destination"],
        locator: "Page profile link section",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
        relationship: "corroborating",
        supports: ["the archived WOW List event-sharing identity of popular.vote"],
        locator: "archived home page capture",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The current Page profile does not establish when the link was added or that every profile field is unchanged since 2017.",
      "The link does not by itself establish Jamie's individual authorship, sole ownership, adoption, participation, or impact."
    ],
    antiClaims: [
      "Jamie alone created or operated Call Script and popular.vote.",
      "The Page link proves that every Call Script practice came from WOW List.",
      "The Page establishes reach or policy impact."
    ],
    researchInquiryIds: [
      "INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026",
      "INQ-CALLSCRIPT-NYCAC-JAMIE-ROLE-ATTRIBUTION-2026"
    ],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-CALLSCRIPT-DCA-UNITED-VOICE-FOLLOWUP-2017",
    project: "callscript",
    internalClaim:
      "A January 28, 2017, Call Script post in the DCA event discussion asked participants to share records, proposed organizing a united voice, and promised a group email.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "After the DCA gathering, Call Script publicly proposed organizing a united voice and a group email.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-CALLSCRIPT-DCA-EVENT-DISCUSSION-2017",
        relationship: "direct-support",
        supports: ["the dated Call Script follow-up and its stated next steps"],
        locator: "January 28, 2017, Call Script discussion post",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The account post does not identify its individual author.",
      "An attributed statement about commissioner turnout is not independently verified and is not part of this claim."
    ],
    antiClaims: [
      "Jamie personally authored the post.",
      "The post proves physical attendance, unique reach, government endorsement, or policy causality."
    ],
    researchInquiryIds: [
      "INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026",
      "INQ-CALLSCRIPT-NYCAC-JAMIE-ROLE-ATTRIBUTION-2026"
    ],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-PARTICIPANT-AGENDA-POLL-2017",
    project: "nyc-artist-coalition",
    internalClaim:
      "A January 31, 2017, NYC Artist Coalition follow-up poll invited participants to choose the meeting date and stated that the subsequent event page would let participants set the agenda.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The early coalition used a public date poll and invited participants to set the follow-up meeting agenda.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-CALLSCRIPT-DCA-EVENT-DISCUSSION-2017",
        relationship: "direct-support",
        supports: ["the date-selection poll and participant agenda invitation"],
        locator: "January 31, 2017, NYC Artist Coalition discussion post",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The poll documents an invitation and interface response distribution, not physical participation or a complete decision record.",
      "The post does not identify its individual author."
    ],
    antiClaims: [
      "The poll proves every participant shaped the agenda.",
      "Facebook response percentages equal unique people, attendance, or a democratic mandate.",
      "Jamie personally authored the poll."
    ],
    researchInquiryIds: [
      "INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026",
      "INQ-CALLSCRIPT-NYCAC-JAMIE-ROLE-ATTRIBUTION-2026"
    ],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-FIRST-GENERAL-MEETING-FORMATION-2017",
    project: "nyc-artist-coalition",
    internalClaim:
      "The February 6, 2017, NYC Artist Coalition general-meeting description invited people to create a coalition, direct its work, build a network of mutual support and advocacy, and develop cultural-plan recommendations together.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The first recovered general-meeting description invited participants to create a coalition, direct its work, and develop recommendations together.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-NYCAC-FIRST-GENERAL-MEETING-2017",
        relationship: "direct-support",
        supports: [
          "the coalition-formation invitation",
          "participant-direction language",
          "mutual-support and joint-recommendation framing"
        ],
        locator: "event description",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The event page establishes collective formation language, not the complete founding group, individual authorship, or division of labor.",
      "The response labels do not establish attendance, reach, endorsement, or impact."
    ],
    antiClaims: [
      "Jamie solely founded NYC Artist Coalition.",
      "Jamie authored or facilitated every part of the meeting.",
      "The meeting description proves government adoption of coalition recommendations."
    ],
    researchInquiryIds: [
      "INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026",
      "INQ-CALLSCRIPT-NYCAC-JAMIE-ROLE-ATTRIBUTION-2026"
    ],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-CALLSCRIPT-NYCAC-ORGANIZING-SEQUENCE-2017",
    project: "nyc-artist-coalition",
    internalClaim:
      "Public records document a sequence from Call Script's popular.vote-linked civic-participation surface through a January 2017 DCA gathering and follow-up into an early NYC Artist Coalition meeting designed around collective formation, participant direction, mutual support, and joint recommendations.",
    status: "inference",
    projections: [
      {
        key: "archive-note",
        text: "Public records document a transition from Call Script's popular.vote-linked coordination practice into early participatory NYC Artist Coalition organizing.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-CALLSCRIPT-PAGE-2026",
        relationship: "context",
        supports: ["the visible Call Script to popular.vote connection"],
        locator: "Page profile link section",
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-CALLSCRIPT-DCA-EVENT-DISCUSSION-2017",
        relationship: "direct-support",
        supports: ["the DCA gathering, united-voice follow-up, and participatory poll"],
        locator: "event details and January 28-31 discussion sequence",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-NYCAC-FIRST-GENERAL-MEETING-2017",
        relationship: "direct-support",
        supports: ["the coalition-formation and participant-direction language"],
        locator: "event description",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is a source-backed historical synthesis, not proof that one project mechanically caused the other.",
      "The records establish collective organizing language and project-account activity, not Jamie's individual authorship of every artifact or sole founding credit.",
      "Current Facebook host displays may reflect later edits, and platform response labels are not attendance or reach."
    ],
    antiClaims: [
      "WOW List or Call Script alone created NYC Artist Coalition.",
      "Jamie alone founded NYC Artist Coalition.",
      "The sequence proves sole authorship, attendance, reach, endorsement, or policy causality."
    ],
    researchInquiryIds: [
      "INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026",
      "INQ-CALLSCRIPT-NYCAC-JAMIE-ROLE-ATTRIBUTION-2026"
    ],
    reviewedAt,
    reviewedBy
  }
] satisfies ClaimRecord[];

export const participationLineageResearchInquiries20260716 = [
  {
    id: "INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026",
    project: "knowledge-bank",
    question:
      "What can the WOW List database, Sunday Dinner attendance-signals workbook, and public Call Script and NYC Artist Coalition records establish about scale, recurring participation infrastructure, and the transition into coalition organizing?",
    methods: [
      "Parsed the latest unique PostgreSQL custom-format WOW List snapshot and reproduced table counts without publishing row-level data.",
      "Joined geolocation, city, region, and post records to test explicit aggregate geographic thresholds.",
      "Read the Sunday Dinner workbook positionally, counted only canonical Y and N values, and separated rows, marks, event columns, and unique-person claims.",
      "Reviewed the authenticated public Call Script Page, the January 27 event discussion, the January 28 recap, the January 31 poll, and the February 6 general-meeting description.",
      "Separated project-account records from individual authorship and collective formation from sole-founder claims."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The protected WOW List snapshot independently reproduces the rounded public scale claim for users, posts/events, and roughly 35 city ecosystems.",
      "The protected Sunday Dinner workbook documents more than 300 recurring event columns and a long-running participation-tracking practice, while row identity and attendance remain bounded.",
      "The Call Script Page visibly links to popular.vote, which surviving archive evidence identifies as a WOW List civic event-sharing surface.",
      "The January-February 2017 public sequence moves from a DCA gathering and a Call Script call for a united voice into participant date selection, agenda-setting, and an NYC Artist Coalition meeting explicitly inviting people to create and direct the coalition.",
      "The source sequence supports participatory organizational formation but does not, by itself, assign Jamie individual authorship or sole founding credit."
    ],
    limitations: [
      "The database and workbook are protected operational sources, not publication-ready datasets.",
      "Database rows, workbook rows, affirmative marks, and Facebook response labels are not interchangeable with unique people, verified attendance, reach, adoption, or impact.",
      "The Facebook interface may reflect later edits to host displays or profile fields.",
      "Project accounts do not identify the individual author of every post.",
      "Collaborator review and additional role-bearing evidence remain necessary before projecting a more specific personal founding or facilitation claim."
    ],
    sourceIds: [
      "SRC-WOWLIST-PRODUCTION-DB-SNAPSHOT-2017-07-22",
      "SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021",
      "SRC-FACEBOOK-CALLSCRIPT-PAGE-2026",
      "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
      "SRC-FACEBOOK-CALLSCRIPT-DCA-EVENT-DISCUSSION-2017",
      "SRC-FACEBOOK-NYCAC-FIRST-GENERAL-MEETING-2017"
    ],
    publicSummary:
      "A protected aggregate analysis and public-record review strengthens WOW List scale, Sunday Dinner continuity, and the participatory Call Script-to-NYC Artist Coalition organizing sequence while preserving privacy, collective credit, and role-attribution limits.",
    protectedLocatorId: "RESEARCH-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026"
  },
  {
    id: "INQ-CALLSCRIPT-NYCAC-JAMIE-ROLE-ATTRIBUTION-2026",
    project: "nyc-artist-coalition",
    question:
      "Which dated records or collaborator testimony can establish Jamie's specific authorship, facilitation, and infrastructure role across Call Script, the January 2017 DCA follow-up, and NYC Artist Coalition's early formation?",
    methods: [
      "Separated account-authored posts from individually attributed authorship.",
      "Compared the visible project and event sequence with existing public reporting that identifies Jamie as a founding member.",
      "Recorded the specific role gaps that require collaborator review or additional archival evidence."
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "The public sequence strongly documents collective formation and participatory operating design.",
      "Existing public reporting identifies Jamie as a founding member, but the Facebook sources reviewed here do not identify the author or facilitator of each artifact and meeting.",
      "A stronger personal-role formulation requires a dated role-bearing artifact, page-administration history that is safe to use, or collaborator confirmation."
    ],
    limitations: [
      "Jamie's first-person memory is a research lead, not independent corroboration.",
      "A project Page, cohost display, or event description does not establish post-level authorship or sole facilitation.",
      "Collective credit must remain visible even if Jamie's role is later more precisely established."
    ],
    sourceIds: [
      "SRC-FACEBOOK-CALLSCRIPT-PAGE-2026",
      "SRC-FACEBOOK-CALLSCRIPT-DCA-EVENT-DISCUSSION-2017",
      "SRC-FACEBOOK-NYCAC-FIRST-GENERAL-MEETING-2017"
    ],
    publicSummary:
      "The collective formation sequence is well documented; Jamie's artifact-by-artifact authorship and facilitation role remains a bounded research question.",
    protectedLocatorId: "RESEARCH-CALLSCRIPT-NYCAC-JAMIE-ROLE-2026"
  }
] satisfies ResearchInquiry[];

export const participationLineageIntakeRecords20260716 = [
  {
    id: "INTAKE-WOWLIST-DB-SNAPSHOT-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex archival-production review",
    kind: "artifact-lead",
    title: "WOW List historical production database snapshot",
    publicSafeSummary:
      "A protected July 2017 production snapshot independently reproduces the rounded historical user, post/event, and city-ecosystem scale already used by the portfolio.",
    whyItMatters:
      "Replaces circular reliance on approved summary language with a reproducible protected source while keeping row-level community data out of the repository.",
    projectHints: ["wowlist", "community-platforms"],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "held-protected",
    sourceIds: ["SRC-WOWLIST-PRODUCTION-DB-SNAPSHOT-2017-07-22"],
    claimIds: ["CLM-WOWLIST-DB-SCALE-SNAPSHOT-2017"],
    inquiryIds: ["INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026"],
    limitations: [
      "Only aggregate counts and a content fingerprint may enter the repository; row-level records remain protected."
    ],
    nextActions: [
      "Retain the rounded public sentence and use the protected snapshot as non-rendered support."
    ]
  },
  {
    id: "INTAKE-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex archival-production review",
    kind: "artifact-lead",
    title: "Sunday Dinner historical attendance-signals workbook",
    publicSafeSummary:
      "A protected operational workbook documents 349 event columns spanning January 2012 through March 2021 and supports a bounded 300-plus-gathering record.",
    whyItMatters:
      "Adds direct longitudinal evidence for the recurring participation system without publishing guest identities or mislabeling operational marks as audited attendance.",
    projectHints: ["196-sunday-dinner", "participation-infrastructure"],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "held-protected",
    sourceIds: ["SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021"],
    claimIds: ["CLM-SUNDAY-DINNER-HISTORICAL-OPERATIONS-2012-2021"],
    inquiryIds: ["INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026"],
    limitations: [
      "The workbook is a living operational record, not an audited census, and every row-level field remains protected."
    ],
    nextActions: [
      "Use the aggregate only with denominator and data-quality boundaries; continue separate research on the resident-artist count."
    ]
  },
  {
    id: "INTAKE-CALLSCRIPT-PAGE-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated public review",
    kind: "public-url",
    title: "Call Script Facebook Page and popular.vote connection",
    publicSafeSummary:
      "The Call Script Page currently links to popular.vote, a recovered WOW List civic event-sharing surface.",
    whyItMatters:
      "Provides a public connective edge between Jamie's event-distribution practice and a later civic-participation project without assigning unsupported individual authorship.",
    projectHints: ["callscript", "wowlist", "popular-vote"],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://www.facebook.com/callscript",
    sourceIds: [
      "SRC-FACEBOOK-CALLSCRIPT-PAGE-2026",
      "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016"
    ],
    claimIds: ["CLM-CALLSCRIPT-POPULAR-VOTE-LINK"],
    inquiryIds: [
      "INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026",
      "INQ-CALLSCRIPT-NYCAC-JAMIE-ROLE-ATTRIBUTION-2026"
    ],
    limitations: [
      "The current Page profile does not prove the link's original date, individual authorship, ownership, participation, or impact."
    ],
    nextActions: [
      "Seek a dated Call Script or collaborator record before projecting Jamie's individual operating role."
    ]
  },
  {
    id: "INTAKE-CALLSCRIPT-DCA-EVENT-DISCUSSION-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated public review",
    kind: "public-url",
    title: "Call Script, DCA gathering, and early NYC Artist Coalition sequence",
    publicSafeSummary:
      "Public event and discussion records document a January-February 2017 sequence from a DCA gathering and a Call Script call for a united voice into participant date selection, agenda-setting, and a coalition-forming general meeting.",
    whyItMatters:
      "Makes a previously implicit civic-to-cultural organizing lineage researchable as atomic claims while preserving collective formation and open personal-role attribution.",
    projectHints: ["callscript", "nyc-artist-coalition", "participatory-organizing"],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    canonicalUrl:
      "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    sourceIds: [
      "SRC-FACEBOOK-CALLSCRIPT-DCA-EVENT-DISCUSSION-2017",
      "SRC-FACEBOOK-NYCAC-FIRST-GENERAL-MEETING-2017"
    ],
    claimIds: [
      "CLM-CALLSCRIPT-DCA-UNITED-VOICE-FOLLOWUP-2017",
      "CLM-NYCAC-PARTICIPANT-AGENDA-POLL-2017",
      "CLM-NYCAC-FIRST-GENERAL-MEETING-FORMATION-2017",
      "CLM-CALLSCRIPT-NYCAC-ORGANIZING-SEQUENCE-2017"
    ],
    inquiryIds: [
      "INQ-PARTICIPATION-LINEAGE-ARCHIVE-PASS-2026",
      "INQ-CALLSCRIPT-NYCAC-JAMIE-ROLE-ATTRIBUTION-2026"
    ],
    limitations: [
      "Current host displays may reflect later edits; response labels are not attendance; project-account records do not establish individual authorship or sole founding credit."
    ],
    nextActions: [
      "Seek dated role-bearing artifacts and collaborator review before selecting a personal facilitation claim for the public site."
    ]
  }
] satisfies IntakeRecord[];
