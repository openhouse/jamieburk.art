import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex archival production and authenticated public-web review"
];

export const participationContinuitySourceIds = {
  controls: "SRC-PARTICIPATION-CONTINUITY-CONTROLS-2026",
  wowDatabase: "SRC-WOWLIST-PRODUCTION-DATABASE-2017-07-22",
  sundayDinnerMatrix: "SRC-SUNDAY-DINNER-ATTENDANCE-MATRIX-2012-2021",
  callScriptPage: "SRC-CALLSCRIPT-FACEBOOK-PAGE",
  dclaEventDiscussion: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017-01-27",
  jamieEventPost: "SRC-FB-JAMIE-DCLA-DIY-SPACES-EVENT-2017-01-25",
  jamieMemory: "SRC-JAMIE-CALLSCRIPT-NYCAC-PARTICIPANT-MEMORY-2026"
} as const;

export const participationContinuityClaimIds = {
  wowScale: "CLM-WOWLIST-PRODUCTION-SCALE-2017",
  sundayDinnerScale: "CLM-SUNDAY-DINNER-300-PLUS-CORROBORATION",
  callScriptContinuity: "CLM-CALLSCRIPT-WOWLIST-NYCAC-CONTINUITY-2017"
} as const;

const sourceIds = participationContinuitySourceIds;
const claimIds = participationContinuityClaimIds;

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-WOWLIST-PRODUCTION-DATABASE-AUDIT-2026",
    kind: "analysis-note",
    title: "Protected WOW List production-database aggregate audit",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex local archive review",
    projectIds: ["wowlist"],
    reason: "Reproduce public-safe historical product-scale and geography thresholds from the latest unique production snapshot without publishing confidential rows or raw dumps.",
    visibility: "protected",
    disposition: "integrated",
    sourceIds: [sourceIds.wowDatabase, sourceIds.controls],
    observationIds: [
      "OBS-WOWLIST-PRODUCTION-DATABASE-COUNTS-2017",
      "OBS-WOWLIST-PRODUCTION-GEOGRAPHY-2017",
      "OBS-WOWLIST-PRODUCTION-DATABASE-BOUNDARY"
    ],
    researchInquiryIds: ["INQ-WOWLIST-PRODUCTION-ARCHIVE-COMPLETENESS"],
    boundaries: [
      "Do not publish the database, raw rows, private locators, direct identifiers, authentication data, calendar identifiers, geolocation rows, or user media.",
      "Historical production counts are not current active-user, traffic, retention, or revenue measures.",
      "City-region-country thresholds are not official chapters or proof that Jamie organized each local scene."
    ]
  },
  {
    id: "INTAKE-SUNDAY-DINNER-ATTENDANCE-MATRIX-AUDIT-2026",
    kind: "analysis-note",
    title: "Protected Sunday Dinner attendance-matrix aggregate audit",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex private workbook review",
    projectIds: ["196-sunday-dinner"],
    reason: "Corroborate the existing 300-plus gathering claim from public-safe aggregate structure while retaining participant-level records outside the public repository.",
    visibility: "protected",
    disposition: "integrated",
    sourceIds: [sourceIds.sundayDinnerMatrix, sourceIds.controls],
    observationIds: [
      "OBS-SUNDAY-DINNER-MATRIX-EVENT-SCALE",
      "OBS-SUNDAY-DINNER-MATRIX-DATA-QUALITY",
      "OBS-SUNDAY-DINNER-MATRIX-PRIVACY-BOUNDARY"
    ],
    researchInquiryIds: ["INQ-SUNDAY-DINNER-PUBLIC-SCALE-CORROBORATION"],
    boundaries: [
      "No names, contact details, participant rows, free text, or individual attendance histories are copied into the repository.",
      "Affirmative marks are not unique people, invitation totals, guest totals, or independently verified attendance.",
      "The working matrix is not a complete lifetime census or participant consent to publication."
    ]
  },
  {
    id: "INTAKE-CALLSCRIPT-PARTICIPATION-CONTINUITY-2026",
    kind: "analysis-note",
    title: "Call Script, popular.vote, and early NYC Artist Coalition continuity",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated public-web review",
    projectIds: ["wowlist", "nyc-artist-coalition"],
    reason: "Preserve the public record connecting WOW List's popular.vote route, Jamie's DCLA-event mobilization, Call Script's participatory coalition-name poll, and the next NYC Artist Coalition meeting while keeping credit collective.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [
      sourceIds.controls,
      "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
      sourceIds.callScriptPage,
      sourceIds.dclaEventDiscussion,
      sourceIds.jamieEventPost,
      sourceIds.jamieMemory
    ],
    observationIds: [
      "OBS-WOWLIST-POPULAR-VOTE-ROUTE-2016",
      "OBS-CALLSCRIPT-PAGE-POPULAR-VOTE-LINK",
      "OBS-CALLSCRIPT-DCLA-EVENT-2017",
      "OBS-CALLSCRIPT-NYCAC-NAMING-POLL-2017",
      "OBS-CALLSCRIPT-DCLA-LETTER-ACTION-2017",
      "OBS-JAMIE-DCLA-EVENT-MOBILIZATION-2017",
      "OBS-CALLSCRIPT-NYCAC-NEXT-MEETING-2017",
      "OBS-JAMIE-CALLSCRIPT-NYCAC-PARTICIPANT-MEMORY",
      "OBS-CALLSCRIPT-PARTICIPATION-CONTINUITY"
    ],
    researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-FORMATION-CONTRIBUTION"],
    boundaries: [
      "The public record supports project continuity and a participatory naming process, not a sole-founder or sole-author claim.",
      "Current Page access and profile fields do not independently establish historical authorship.",
      "Facebook reach, response, going, reaction, comment, and share displays are mutable platform signals, not attendance, endorsement, mandate, conversion, or impact."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: "OBS-WOWLIST-PRODUCTION-DATABASE-COUNTS-2017",
    intakeId: "INTAKE-WOWLIST-PRODUCTION-DATABASE-AUDIT-2026",
    sourceId: sourceIds.wowDatabase,
    comparisonSourceIds: [sourceIds.controls],
    project: "wowlist",
    kind: "source-fact",
    text: "A fresh read-only parse of the July 22, 2017 production snapshot reproduces 1,846 users, 16,142 posts/events, 23,864 tags/lists, 28,837 list follows, 20,927 saved/starred events, 15,915 Google Calendar events, and 15,875 post-calendar links.",
    locator: "Protected aggregate parser output; selected COPY row counts only.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.wowScale],
    researchInquiryIds: ["INQ-WOWLIST-PRODUCTION-ARCHIVE-COMPLETENESS"],
    limitations: [
      "Counts describe one historical production snapshot, not current usage.",
      "They do not establish unique active users, retention, traffic, revenue, outcomes, or Jamie's sole authorship."
    ]
  },
  {
    id: "OBS-WOWLIST-PRODUCTION-GEOGRAPHY-2017",
    intakeId: "INTAKE-WOWLIST-PRODUCTION-DATABASE-AUDIT-2026",
    sourceId: sourceIds.wowDatabase,
    comparisonSourceIds: [sourceIds.controls],
    project: "wowlist",
    kind: "source-fact",
    text: "Joining post geolocation IDs to city, region, and country fields yields 35 city-region-country keys with at least 50 posts, 48 with at least 25, 79 with at least 10, 133 with at least five, and 709 with at least one.",
    locator: "Protected aggregate geography join; no place rows retained in the repository.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.wowScale],
    researchInquiryIds: [],
    limitations: [
      "Keys are database geography groupings rather than official chapters.",
      "A geocoded post does not establish a local organizer, sustained scene activity, attendance, or Jamie's ownership of local work."
    ]
  },
  {
    id: "OBS-WOWLIST-PRODUCTION-DATABASE-BOUNDARY",
    intakeId: "INTAKE-WOWLIST-PRODUCTION-DATABASE-AUDIT-2026",
    sourceId: sourceIds.wowDatabase,
    comparisonSourceIds: [],
    project: "wowlist",
    kind: "limitation",
    text: "The production dump contains sensitive user, authentication, calendar, location, and media references; only aggregate controls and bounded claims enter the public knowledge bank.",
    locator: "Protected schema and archive inventory.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.wowScale],
    researchInquiryIds: ["INQ-WOWLIST-PRODUCTION-ARCHIVE-COMPLETENESS"],
    limitations: ["The media archive is incomplete relative to the latest database.", "The repository intentionally omits raw schema rows and private locators."]
  },
  {
    id: "OBS-SUNDAY-DINNER-MATRIX-EVENT-SCALE",
    intakeId: "INTAKE-SUNDAY-DINNER-ATTENDANCE-MATRIX-AUDIT-2026",
    sourceId: sourceIds.sundayDinnerMatrix,
    comparisonSourceIds: [sourceIds.controls, "SRC-FACEBOOK-SUNDAY-DINNER-100-2014", "SRC-FACEBOOK-SUNDAY-DINNER-200-2016"],
    project: "196-sunday-dinner",
    kind: "source-fact",
    text: "The protected main matrix contains 346 event-labeled columns numbered through 345, and 342 columns contain at least one explicit affirmative mark. This independently supports the existing public-safe 300-plus gathering scale.",
    locator: "Protected workbook aggregate; main sheet header and affirmative-mark counts only.",
    status: "corroborated",
    publicSafe: true,
    claimIds: [claimIds.sundayDinnerScale],
    researchInquiryIds: ["INQ-SUNDAY-DINNER-PUBLIC-SCALE-CORROBORATION"],
    limitations: [
      "Event labels contain four missing sequence numbers and four duplicated numbers across nine columns.",
      "The matrix is a working record rather than an independently audited complete event census."
    ]
  },
  {
    id: "OBS-SUNDAY-DINNER-MATRIX-DATA-QUALITY",
    intakeId: "INTAKE-SUNDAY-DINNER-ATTENDANCE-MATRIX-AUDIT-2026",
    sourceId: sourceIds.sundayDinnerMatrix,
    comparisonSourceIds: [],
    project: "196-sunday-dinner",
    kind: "limitation",
    text: "The matrix preserves 2,780 explicit affirmative marks, but duplicate numbering, missing numbering, ambiguous marks, and unnormalized rows prevent conversion into a unique-person, RSVP, guest, or precise attendance claim.",
    locator: "Protected aggregate parser output; no participant rows emitted.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.sundayDinnerScale],
    researchInquiryIds: ["INQ-SUNDAY-DINNER-PUBLIC-SCALE-CORROBORATION"],
    limitations: ["The aggregate does not identify individuals.", "No identity normalization should be attempted without a specific, permissioned research need."]
  },
  {
    id: "OBS-SUNDAY-DINNER-MATRIX-PRIVACY-BOUNDARY",
    intakeId: "INTAKE-SUNDAY-DINNER-ATTENDANCE-MATRIX-AUDIT-2026",
    sourceId: sourceIds.sundayDinnerMatrix,
    comparisonSourceIds: [],
    project: "196-sunday-dinner",
    kind: "limitation",
    text: "Zero participant rows and zero direct identifiers from the workbook are stored in the repository; aggregate analysis is not treated as participant consent.",
    locator: "Public-safe control file and protected read-only analysis protocol.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.sundayDinnerScale],
    researchInquiryIds: [],
    limitations: ["Names, contact details, invitations, attendance histories, free text, and raw workbook contents remain private."]
  },
  {
    id: "OBS-WOWLIST-POPULAR-VOTE-ROUTE-2016",
    intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-CONTINUITY-2026",
    sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
    comparisonSourceIds: [sourceIds.controls, sourceIds.callScriptPage],
    project: "wowlist",
    kind: "source-fact",
    text: "WOW List's complete capture-date Facebook ledger records a November 14, 2016 Page post routing to popular.vote as a civic-mobilization resource; the review displayed two likes, zero comments, and six shares.",
    locator: "Public-safe ledger ordinal 21 and posted URL inventory.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.callScriptContinuity],
    researchInquiryIds: [],
    limitations: ["Displayed interactions are mutable and are not unique people, reach, endorsement, conversion, or impact.", "The ledger does not identify the human author of the Page post."]
  },
  {
    id: "OBS-CALLSCRIPT-PAGE-POPULAR-VOTE-LINK",
    intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-CONTINUITY-2026",
    sourceId: sourceIds.callScriptPage,
    comparisonSourceIds: [sourceIds.controls],
    project: "nyc-artist-coalition",
    kind: "source-fact",
    text: "The public Call Script Page describes its purpose as calling representatives to make change and exposes popular.vote as its project link.",
    locator: "Page profile tagline and Links section, accessed July 15, 2026.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.callScriptContinuity],
    researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-FORMATION-CONTRIBUTION"],
    limitations: ["Current profile fields do not establish when the link was added or who authored the historical Page."]
  },
  {
    id: "OBS-CALLSCRIPT-DCLA-EVENT-2017",
    intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-CONTINUITY-2026",
    sourceId: sourceIds.dclaEventDiscussion,
    comparisonSourceIds: [sourceIds.controls],
    project: "nyc-artist-coalition",
    kind: "source-fact",
    text: "A public January 27, 2017 DCLA event page displays NYC Artist Coalition and Call Script among the organizing identities, displays DCLA as a cohost, and showed 445 people responded during the July 2026 review.",
    locator: "Event header, organizer display, and response label.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.callScriptContinuity],
    researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-FORMATION-CONTRIBUTION"],
    limitations: ["Response is not attendance, endorsement, unique people, or policy impact.", "The organizer display does not allocate every task or contribution."]
  },
  {
    id: "OBS-CALLSCRIPT-NYCAC-NAMING-POLL-2017",
    intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-CONTINUITY-2026",
    sourceId: sourceIds.dclaEventDiscussion,
    comparisonSourceIds: [],
    project: "nyc-artist-coalition",
    kind: "source-fact",
    text: "In the event discussion, Call Script invited participants to choose a group name for ongoing creative-community advocacy. The displayed poll showed NYC Artist Coalition leading at 57 percent.",
    locator: "Call Script event-discussion poll dated January 27, 2017.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.callScriptContinuity],
    researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-FORMATION-CONTRIBUTION"],
    limitations: ["The visible surface does not expose a complete vote count.", "The poll documents participatory identity formation, not a legal founding act or sole founder."]
  },
  {
    id: "OBS-CALLSCRIPT-DCLA-LETTER-ACTION-2017",
    intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-CONTINUITY-2026",
    sourceId: sourceIds.dclaEventDiscussion,
    comparisonSourceIds: [],
    project: "nyc-artist-coalition",
    kind: "source-fact",
    text: "The same event discussion invited participants to read, edit, and sign a letter to the DCLA commissioner, connecting meeting attendance to a collaborative public-action artifact.",
    locator: "Call Script discussion post linking the Support DIY Spaces DCLA letter.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.callScriptContinuity],
    researchInquiryIds: [],
    limitations: ["The event page does not establish who drafted every line, the number of signers, delivery, response, or policy outcome."]
  },
  {
    id: "OBS-JAMIE-DCLA-EVENT-MOBILIZATION-2017",
    intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-CONTINUITY-2026",
    sourceId: sourceIds.jamieEventPost,
    comparisonSourceIds: [],
    project: "nyc-artist-coalition",
    kind: "source-fact",
    text: "Jamie's January 25, 2017 public post invited New Yorkers to pack the DCLA meeting in support of DIY spaces and improve-dont-evict responses.",
    locator: "Jamie-attributed public post linking the DCLA event.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.callScriptContinuity],
    researchInquiryIds: [],
    limitations: ["Promotion does not establish sole event production, attendance, agency endorsement, or policy outcome."]
  },
  {
    id: "OBS-CALLSCRIPT-NYCAC-NEXT-MEETING-2017",
    intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-CONTINUITY-2026",
    sourceId: sourceIds.callScriptPage,
    comparisonSourceIds: [],
    project: "nyc-artist-coalition",
    kind: "source-fact",
    text: "The Call Script Page later promoted the March 6, 2017 NYC Artist Coalition general meeting at The Floasis, preserving continuity from the January DCLA gathering into a recurring coalition meeting.",
    locator: "Call Script Page post linking the March general-meeting event.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimIds.callScriptContinuity],
    researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-FORMATION-CONTRIBUTION"],
    limitations: ["The post establishes public promotion, not authorship of the event, attendance, or ownership of the coalition."]
  },
  {
    id: "OBS-JAMIE-CALLSCRIPT-NYCAC-PARTICIPANT-MEMORY",
    intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-CONTINUITY-2026",
    sourceId: sourceIds.jamieMemory,
    comparisonSourceIds: [sourceIds.callScriptPage, sourceIds.dclaEventDiscussion, sourceIds.jamieEventPost],
    project: "nyc-artist-coalition",
    kind: "participant-memory",
    text: "Jamie remembers establishing Call Script and using its popular.vote connection as part of his facilitation of the early NYC Artist Coalition formation process.",
    locator: "Jamie's July 15, 2026 first-person archival context statement.",
    status: "corroborated",
    publicSafe: true,
    claimIds: [claimIds.callScriptContinuity],
    researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-FORMATION-CONTRIBUTION"],
    limitations: ["First-person memory is evidence of Jamie's account, not independent allocation of every collaborator's contribution.", "The public sources corroborate the sequence more strongly than the complete division of labor."]
  },
  {
    id: "OBS-CALLSCRIPT-PARTICIPATION-CONTINUITY",
    intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-CONTINUITY-2026",
    sourceId: sourceIds.controls,
    comparisonSourceIds: ["SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026", sourceIds.callScriptPage, sourceIds.dclaEventDiscussion, sourceIds.jamieEventPost, sourceIds.jamieMemory],
    project: "nyc-artist-coalition",
    kind: "bounded-inference",
    text: "Taken together, the sources support a bounded continuity claim: WOW List distributed popular.vote, Call Script publicly linked to it, Jamie mobilized for the DCLA gathering, the event discussion used participatory naming and collaborative letter-making, and Call Script then promoted the coalition's next meeting.",
    locator: "Cross-source chronology in the public-safe control file.",
    status: "corroborated",
    publicSafe: true,
    claimIds: [claimIds.callScriptContinuity],
    researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-FORMATION-CONTRIBUTION"],
    limitations: ["Continuity is not sole credit, legal founding, complete authorship, attendance, or policy causation."]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: sourceIds.controls,
    title: "WOW List, Sunday Dinner, and Call Script public-safe aggregate controls",
    organization: "Jamie Burkart portfolio research",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/data/wowlist-sunday-dinner-callscript-controls.json",
    preferredPublicUrl: "canonical",
    publicCitation: "Public-safe aggregate controls for the WOW List production snapshot, Sunday Dinner attendance matrix, and Call Script continuity review, July 2026.",
    publicNote: "The control file preserves reproducible aggregate facts and boundaries while excluding raw database rows, private workbook rows, identities, and authenticated-session data.",
    supportsGenerally: ["historical WOW List production counts", "bounded Sunday Dinner event-scale corroboration", "Call Script public-source chronology", "privacy and attribution boundaries"],
    doesNotEstablish: ["current product activity", "unique Sunday Dinner participants or precise attendance", "sole authorship or sole coalition founding", "endorsement, mandate, conversion, causality, or policy impact"]
  },
  {
    id: sourceIds.wowDatabase,
    title: "Protected WOW List July 2017 production database snapshot",
    organization: "WOW List",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Archive metadata: July 22, 2017 at 08:00 EDT; read-only aggregate recheck July 15, 2026",
    accessedAt: reviewedAt,
    publicCitation: "Protected July 2017 WOW List production-database aggregate audit.",
    publicNote: "Only selected row counts and geography thresholds are retained in the public repository; the raw dump and private locator remain protected.",
    protectedLocatorId: "ARCHIVE-WOWLIST-PRODUCTION-DATABASE-2017-001",
    supportsGenerally: ["historical production row counts", "database date and format", "city-region-country post thresholds", "confidential-data boundary"],
    doesNotEstablish: ["current active users or product availability", "traffic, retention, revenue, or impact", "official chapters", "sole authorship by Jamie", "a complete media archive"]
  },
  {
    id: sourceIds.sundayDinnerMatrix,
    title: "Protected Sunday Dinner attendance working matrix",
    organization: "196 Artists Residency / Sunday Dinner",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Working workbook reviewed read-only July 15, 2026",
    accessedAt: reviewedAt,
    publicCitation: "Protected Sunday Dinner working-matrix aggregate review.",
    publicNote: "Only event-column and explicit-mark aggregates are retained; no participant rows, identifiers, free text, or raw workbook contents enter the repository.",
    protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-ATTENDANCE-MATRIX-2026-001",
    supportsGenerally: ["346 event-labeled working columns", "numbering through 345", "342 columns with explicit affirmative marks", "2,780 explicit affirmative marks", "300-plus gathering-scale corroboration"],
    doesNotEstablish: ["unique people", "precise attendance or guest totals", "a complete lifetime census", "participant endorsement or publication consent", "20-plus resident artists"]
  },
  {
    id: sourceIds.callScriptPage,
    title: "Call Script public Facebook Page",
    organization: "Call Script",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/callscript",
    preferredPublicUrl: "canonical",
    publicCitation: "Call Script public Facebook Page, accessed July 15, 2026.",
    publicNote: "The current Page displays a representative-calling tagline, popular.vote as its project link, and a post promoting the March 2017 NYC Artist Coalition general meeting.",
    supportsGenerally: ["Call Script public identity", "current popular.vote profile link", "promotion of the March 6, 2017 NYC Artist Coalition meeting"],
    doesNotEstablish: ["who authored every historical post", "when the current profile link was added", "sole ownership of Call Script or NYC Artist Coalition", "attendance or outcome"]
  },
  {
    id: sourceIds.dclaEventDiscussion,
    title: "NYC DIY Spaces post-Ghost-Ship DCLA meeting event discussion",
    organization: "NYC Artist Coalition, Call Script, and event cohosts",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-27",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    preferredPublicUrl: "canonical",
    publicCitation: "Public Facebook event and discussion for the January 27, 2017 post-Ghost-Ship DCLA meeting on DIY and alternative spaces.",
    publicNote: "The page preserves organizer displays, a Call Script coalition-name poll, a collaborative DCLA-letter action, and mutable response and self-reported reach signals.",
    supportsGenerally: ["January 27, 2017 DCLA event", "NYC Artist Coalition and Call Script organizer display", "DCLA cohost display", "NYC Artist Coalition leading the naming poll at 57 percent", "collaborative DCLA-letter invitation"],
    doesNotEstablish: ["complete vote count", "attendance", "unique people", "sole founder or legal founding act", "authorship of every task or letter line", "endorsement, mandate, conversion, causality, or policy impact"]
  },
  {
    id: sourceIds.jamieEventPost,
    title: "Jamie Burkart public post mobilizing for the DCLA DIY-spaces meeting",
    organization: "Jamie Burkart",
    author: "Jamie Burkart",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-25",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/jburkart/posts/pfbid02DvDYiJLK8ceJFAdhQYsYsyAVU3WWuZpbEASr8MFCKqBTJMhnNWrBjYHGQirZwa6al",
    preferredPublicUrl: "canonical",
    publicCitation: "Jamie Burkart, public Facebook post mobilizing support for the January 27, 2017 DCLA DIY-spaces meeting.",
    publicNote: "Jamie invited New Yorkers to pack the meeting in support of DIY spaces and improve-dont-evict responses.",
    supportsGenerally: ["Jamie's public event mobilization", "support for DIY spaces", "improve-dont-evict framing", "direct event route"],
    doesNotEstablish: ["sole event production", "attendance", "agency endorsement", "policy outcome", "authorship of every Call Script or coalition post"]
  },
  {
    id: sourceIds.jamieMemory,
    title: "Jamie's first-person Call Script and coalition-formation context",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "First-person archival context supplied July 15, 2026",
    accessedAt: reviewedAt,
    publicCitation: "Protected first-person context from Jamie Burkart concerning Call Script and early NYC Artist Coalition formation.",
    publicNote: "The repository retains only the bounded proposition; the public project records independently support the sequence more strongly than complete task allocation.",
    protectedLocatorId: "MEMORY-JAMIE-CALLSCRIPT-NYCAC-2026-001",
    supportsGenerally: ["Jamie's memory of establishing Call Script", "Jamie's memory of connecting popular.vote to early coalition facilitation"],
    doesNotEstablish: ["sole founder", "sole authorship", "every collaborator's contribution", "legal founding", "attendance or policy causation"]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: claimIds.wowScale,
    project: "wowlist",
    internalClaim: "A read-only audit of WOW List's July 22, 2017 production snapshot reproduces substantial historical product scale: 1,846 users, 16,142 posts/events, 23,864 tags/lists, 28,837 list follows, 20,927 saved/starred events, and 35 city-region-country keys with at least 50 posts.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "A July 22, 2017 production snapshot supports the description active in 35+ city ecosystems. This is a bounded geographic activity signal, not official chapter status, current activity, readership, retention, or causal impact.",
      status: "active",
      citationRequired: true,
      surfaces: ["/work/wowlist"]
    }],
    evidence: [
      { sourceId: sourceIds.wowDatabase, relationship: "private-support", supports: ["July 22, 2017 snapshot date", "selected production row counts", "geography thresholds"], locator: "Protected aggregate parse of the production snapshot.", confidence: "high", renderCitation: false },
      { sourceId: sourceIds.controls, relationship: "corroborating", supports: ["public-safe selected counts", "historical-use boundary", "geography definition", "privacy boundary"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Use historical language and preserve the exact snapshot date.", "Keep credit shared with Richard Caceres, participating organizers, users, and other contributors.", "Do not publish user or event-post counts on public surfaces.", "Do not expose raw database rows or describe city keys as official chapters."],
    antiClaims: ["current active users", "current product availability", "official chapters in 35 cities", "Jamie alone built WOW List", "the database is a complete product archive", "the counts prove community impact"],
    researchInquiryIds: ["INQ-WOWLIST-PRODUCTION-ARCHIVE-COMPLETENESS"],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.sundayDinnerScale,
    project: "196-sunday-dinner",
    internalClaim: "A protected Sunday Dinner working matrix independently corroborates the existing 300-plus gathering scale through 346 event-labeled columns numbered through 345 and explicit affirmative marks in 342 columns, while retaining participant records outside the repository.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "A protected working record independently corroborates the 300+ gathering scale while keeping every participant row private. It is evidence of recurring operational continuity, not a unique-person or precise attendance census.",
      status: "active",
      citationRequired: true,
      surfaces: ["/work/196-sunday-dinner"]
    }],
    evidence: [
      { sourceId: sourceIds.sundayDinnerMatrix, relationship: "private-support", supports: ["346 event-labeled columns", "numbering through 345", "342 columns with explicit affirmative marks", "participant-data exclusion"], locator: "Protected main-sheet aggregate audit.", confidence: "high", renderCitation: false },
      { sourceId: sourceIds.controls, relationship: "corroborating", supports: ["public-safe aggregate controls", "numbering exceptions", "privacy and interpretation boundaries"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-100-2014", relationship: "corroborating", supports: ["contemporaneous 100th milestone"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-200-2016", relationship: "corroborating", supports: ["contemporaneous 200th milestone"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Do not publish participant rows, identities, contacts, invitation or attendance histories, or free text.", "Do not convert affirmative marks into unique people, precise attendance, guest counts, endorsement, or consent.", "Preserve duplicate and missing sequence numbers as data-quality limits."],
    antiClaims: ["a public attendance database", "342 independently audited gatherings", "2,780 unique attendees", "complete lifetime census", "participant endorsement", "the workbook proves 20-plus resident artists"],
    researchInquiryIds: ["INQ-SUNDAY-DINNER-PUBLIC-SCALE-CORROBORATION"],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.callScriptContinuity,
    project: "wowlist",
    internalClaim: "The combined public and first-person record supports Jamie's account that Call Script functioned as one bridge from WOW List's popular.vote civic calendar into early NYC Artist Coalition organizing through event mobilization, participatory naming, collaborative letter-making, and promotion of the next coalition meeting.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "The combined record supports Jamie's account that Call Script became one bridge from WOW List's popular.vote calendar into early NYC Artist Coalition organizing: Jamie publicly mobilized for the January 2017 DCLA meeting; its discussion ran a participatory naming poll in which ‘NYC Artist Coalition’ displayed 57%; and Call Script then promoted the coalition's next general meeting.",
      status: "active",
      citationRequired: true,
      surfaces: ["/work/wowlist"]
    }],
    evidence: [
      { sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026", relationship: "direct-support", supports: ["November 14, 2016 popular.vote route", "civic-mobilization classification", "bounded displayed interactions"], locator: "Public-safe ordinal 21 and posted URL inventory.", confidence: "high", renderCitation: false },
      { sourceId: sourceIds.callScriptPage, relationship: "direct-support", supports: ["Call Script public identity", "popular.vote profile link", "March 2017 NYC Artist Coalition meeting promotion"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds.dclaEventDiscussion, relationship: "direct-support", supports: ["January 27 DCLA event", "Call Script and NYC Artist Coalition organizer displays", "57-percent naming-poll display", "collaborative DCLA-letter action"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds.jamieEventPost, relationship: "direct-support", supports: ["Jamie's public mobilization for the DCLA meeting"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds.jamieMemory, relationship: "private-support", supports: ["Jamie's account of establishing Call Script", "Jamie's account of facilitation continuity"], confidence: "moderate", renderCitation: false },
      { sourceId: sourceIds.controls, relationship: "corroborating", supports: ["cross-source chronology", "traction semantics", "collective-credit boundary"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Describe Call Script as one bridge within collective coalition formation, not the sole cause or sole founder.", "Attribute the direct role claim to the combined first-person and contemporaneous record.", "Treat poll, response, reach, going, reaction, comment, and share displays as bounded platform signals rather than attendance or impact."],
    antiClaims: ["Jamie single-handedly founded NYC Artist Coalition", "Call Script alone created NYC Artist Coalition", "the poll is a legal founding vote", "445 people attended", "10,000 unique people endorsed the coalition", "Facebook metrics prove policy impact", "Jamie authored every Call Script or coalition post"],
    researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-FORMATION-CONTRIBUTION"],
    reviewedAt,
    reviewedBy
  }
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-WOWLIST-PRODUCTION-ARCHIVE-COMPLETENESS",
    project: "wowlist",
    question: "Which additional repository, deployment, and media records can complete the WOW List production history and allocate technical and operating contributions without exposing user data?",
    methods: ["Parsed the latest unique database snapshot read-only.", "Reproduced selected table counts and city-region-country thresholds.", "Compared database chronology with the partial media archive and existing public social records."],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: ["The July 22, 2017 production counts and conservative 35-key geography threshold reproduce.", "The database extends beyond the preserved media tree.", "Public social records support shared creation and organizer workflows."],
    limitations: ["Raw user and authentication data cannot enter the public repository.", "The media archive is incomplete.", "Database custody does not allocate every collaborator's technical contribution."],
    sourceIds: [sourceIds.wowDatabase, sourceIds.controls, "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026"],
    publicSummary: "The production-scale claim is verified at the July 2017 snapshot boundary; archive completeness and fine-grained contributor allocation remain open.",
    protectedLocatorId: "INQUIRY-WOWLIST-PRODUCTION-ARCHIVE-2026"
  },
  {
    id: "INQ-SUNDAY-DINNER-PUBLIC-SCALE-CORROBORATION",
    project: "196-sunday-dinner",
    question: "Which public event pages, dated invitations, photographs, and collaborator-approved records can corroborate Sunday Dinner's post-200 chronology without exposing participant histories?",
    methods: ["Reduced the protected working matrix to event-column and explicit-mark aggregates.", "Compared the numbering range with public 100th and 200th milestone pages.", "Recorded duplicate, missing, ambiguity, and privacy limits."],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: ["The matrix independently supports the existing 300-plus scale.", "Public Facebook pages independently preserve the 100th and 200th milestones.", "No participant-level publication is necessary to make the scale claim defensible."],
    limitations: ["The working matrix is not an independently audited complete census.", "Participant identity normalization is neither necessary nor appropriate without a specific permissioned need.", "The source does not establish the resident-artist count."],
    sourceIds: [sourceIds.sundayDinnerMatrix, sourceIds.controls, "SRC-FACEBOOK-SUNDAY-DINNER-100-2014", "SRC-FACEBOOK-SUNDAY-DINNER-200-2016"],
    publicSummary: "Protected aggregate structure now independently corroborates the 300-plus scale; future work should seek public chronology, not participant disclosure.",
    protectedLocatorId: "INQUIRY-SUNDAY-DINNER-PUBLIC-SCALE-2026"
  },
  {
    id: "INQ-CALLSCRIPT-NYCAC-FORMATION-CONTRIBUTION",
    project: "nyc-artist-coalition",
    question: "Which collaborator memories, native Page exports, event records, meeting notes, and DCLA records can further allocate Jamie's Call Script and early coalition-formation contribution while retaining collective credit?",
    methods: ["Reviewed the authenticated public Call Script Page and DCLA event discussion.", "Matched the public record to WOW List's popular.vote ledger and Jamie's contemporaneous event-mobilization post.", "Separated project continuity, platform signals, and Jamie's participant memory."],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: ["The public record preserves a direct popular.vote, DCLA-event, naming-poll, letter-action, and next-meeting sequence.", "Jamie's contemporaneous post documents his event mobilization.", "Jamie's first-person account identifies Call Script as a project he established and used in early coalition facilitation."],
    limitations: ["Current Page management access does not prove historical authorship.", "The event surface does not allocate every collaborator's task.", "Poll and response displays do not establish legal founding, attendance, endorsement, or impact."],
    sourceIds: [sourceIds.controls, "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026", sourceIds.callScriptPage, sourceIds.dclaEventDiscussion, sourceIds.jamieEventPost, sourceIds.jamieMemory],
    publicSummary: "Contemporaneous public records now support a bounded participation-infrastructure continuity claim; collaborator confirmation can further allocate individual and shared labor.",
    protectedLocatorId: "INQUIRY-CALLSCRIPT-NYCAC-FORMATION-2026"
  }
];

export const participationContinuityKnowledge = {
  intakeItems,
  observations,
  sources,
  claims,
  researchInquiries
};
