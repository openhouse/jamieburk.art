import aggregateAudit from "./fixtures/wowlist-sunday-dinner-callscript-aggregate.json" with { type: "json" };
import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const auditSourceId = "SRC-WOWLIST-SUNDAY-CALLSCRIPT-AGGREGATE-AUDIT-2026-07-15";
const wowListArchiveSourceId = "SRC-WOWLIST-DATABASE-SNAPSHOT-2017-07-22";
const sundayDinnerWorkbookSourceId = "SRC-196-ATTENDANCE-WORKBOOK-2026-07-15";
const callScriptPageSourceId = "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026-07-15";
const callScriptEventSourceId = "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017-01-27";
const jamieCallScriptSourceId = "SRC-CALLSCRIPT-JAMIE-FIRSTHAND-2026-07-15";

const wowListScaleClaimId = "CLM-WOWLIST-DATABASE-SNAPSHOT-SCALE";
const sundayDinnerScaleClaimId = "CLM-196-ATTENDANCE-WORKBOOK-SCALE";
const callScriptBridgeClaimId = "CLM-CALLSCRIPT-CIVIC-FACILITATION-BRIDGE";
const callScriptRoleClaimId = "CLM-CALLSCRIPT-JAMIE-ESTABLISHMENT-ROLE";

export { aggregateAudit as wowListSundayDinnerCallScriptAggregateAudit };

export const wowListSundayDinnerCallScriptCaptures = [
  {
    id: "CAP-WOWLIST-DATABASE-SNAPSHOT-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "Historical WOW List database archives offered for aggregate product-scale research without publishing user-level records.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["wowlist"],
    potentialClaimFamilies: [
      "historical product scale",
      "community adoption",
      "city-scene distribution",
    ],
    sourceIds: [wowListArchiveSourceId, auditSourceId],
    observationIds: [
      "OBS-WOWLIST-DATABASE-SNAPSHOT-COUNTS",
      "OBS-WOWLIST-DATABASE-ACTIVE-CITY-SCENES",
      "OBS-WOWLIST-SUNDAY-CALLSCRIPT-AUDIT-METHOD",
    ],
    researchTaskIds: [],
    disposition:
      "Reconstructed logical database rows, retained only aggregate counts and a source digest, and excluded users, contacts, credentials, geolocation rows, and raw archive contents from Git.",
  },
  {
    id: "CAP-196-ATTENDANCE-WORKBOOK-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "Longitudinal Sunday Dinner coordination workbook offered for aggregate chronology and meals-served research.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["196-sunday-dinner"],
    potentialClaimFamilies: [
      "recurring gathering chronology",
      "meals served",
      "longitudinal coordination system",
    ],
    sourceIds: [sundayDinnerWorkbookSourceId, auditSourceId],
    observationIds: [
      "OBS-196-WORKBOOK-NUMBERED-ENTRIES-AND-MEALS",
      "OBS-WOWLIST-SUNDAY-CALLSCRIPT-AUDIT-METHOD",
    ],
    researchTaskIds: ["RT-196-WORKBOOK-DEFINITION-CORROBORATION"],
    disposition:
      "Inspected the workbook read-only and published only aggregate chronology, formula-backed total, source digest, method, and limitations. No person-level row entered the repository.",
  },
  {
    id: "CAP-CALLSCRIPT-POPULAR-VOTE-NYCAC-BRIDGE-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart",
    kind: "url",
    summary:
      "Call Script page and January 2017 DCLA event discussion offered as evidence connecting WOW List's popular.vote adaptation to participatory NYC Artist Coalition facilitation.",
    sourceUrl:
      "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    status: "integrated",
    publicSafety: "public-safe",
    potentialProjectIds: ["wowlist", "nyc-artist-coalition"],
    potentialClaimFamilies: [
      "civic product continuity",
      "participatory coalition formation",
      "public letter drafting",
      "meeting documentation",
    ],
    sourceIds: [
      callScriptPageSourceId,
      callScriptEventSourceId,
      jamieCallScriptSourceId,
      "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016-12-11",
    ],
    observationIds: [
      "OBS-CALLSCRIPT-PAGE-POPULAR-VOTE-LINK",
      "OBS-CALLSCRIPT-DCLA-EVENT-CONTEXT",
      "OBS-CALLSCRIPT-NYCAC-NAMING-POLL",
      "OBS-CALLSCRIPT-LETTER-AND-NOTES-WORKFLOW",
      "OBS-CALLSCRIPT-JAMIE-FIRSTHAND-ROLE",
      "OBS-WOWLIST-SUNDAY-CALLSCRIPT-AUDIT-METHOD",
    ],
    researchTaskIds: ["RT-CALLSCRIPT-ROLE-AND-FORMATION-CORROBORATION"],
    disposition:
      "Close-read the public page and event discussion, promoted the source-backed civic-facilitation sequence, and held Jamie's individual establishment role for dated or collaborator corroboration.",
  },
] satisfies CaptureRecord[];

export const wowListSundayDinnerCallScriptSources = [
  {
    id: auditSourceId,
    title: "WOW List, Sunday Dinner, and Call Script aggregate archival audit",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/wowlist-sunday-dinner-callscript.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Aggregate-only archival audit of WOW List, Sunday Dinner, and Call Script, reviewed July 15, 2026.",
    publicNote:
      "The public audit retains reproducible aggregates, source digests, methods, and limitations while excluding raw database rows, person-level attendance records, contacts, private messages, and authenticated state.",
    supportsGenerally: [
      "the July 2017 WOW List database snapshot aggregates",
      "the Sunday Dinner workbook chronology and formula-backed meals-served total",
      "the public Call Script page and event-discussion observations",
    ],
    doesNotEstablish: [
      "unique active users or event attendance",
      "complete Sunday Dinner attendance or unique diners",
      "sole authorship of Call Script or NYC Artist Coalition",
      "that popular.vote alone caused coalition formation",
    ],
  },
  {
    id: wowListArchiveSourceId,
    title: "WOW List historical database snapshot",
    organization: "WOW List",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2017-07-22T08:00:01-04:00",
    publicCitation:
      "Protected July 22, 2017 WOW List database snapshot, reviewed in aggregate July 15, 2026.",
    publicNote:
      "Only aggregate logical-row counts and a SHA-256 source digest are public. The underlying archive contains private user and system data and remains outside Git.",
    supportsGenerally: [
      "historical platform table counts",
      "historical geocoded city-scene distribution",
    ],
    doesNotEstablish: [
      "current product use",
      "unique active users",
      "event attendance",
      "revenue or causal community impact",
    ],
    protectedLocatorId: "PTR-WOWLIST-DATABASE-SNAPSHOT-2017-07-22",
  },
  {
    id: sundayDinnerWorkbookSourceId,
    title: "Sunday Dinner longitudinal coordination workbook",
    organization: "196 Artists Residency / Sunday Dinner",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: reviewedAt,
    publicCitation:
      "Protected Sunday Dinner longitudinal coordination workbook, reviewed in aggregate July 15, 2026.",
    publicNote:
      "Only a numbered chronology, formula-backed meals-served total, source digest, method, and limitations are public. Person-level rows remain outside Git.",
    supportsGenerally: [
      "345 numbered entries from January 2012 through March 2021",
      "a formula-backed displayed total of 2,783 meals served",
    ],
    doesNotEstablish: [
      "a unique-attendee count",
      "complete event-by-event attendance",
      "that every numbered entry was an in-person dinner",
      "individual participant outcomes",
    ],
    protectedLocatorId: "PTR-196-ATTENDANCE-WORKBOOK-2026-07-15",
  },
  {
    id: callScriptPageSourceId,
    title: "Call Script Facebook Page",
    organization: "Call Script",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/callscript",
    preferredPublicUrl: "canonical",
    publicCitation: "Call Script Facebook Page, accessed July 15, 2026.",
    publicNote:
      "The public Page describes Call Script as a representative-calling project and links directly to popular.vote.",
    supportsGenerally: [
      "Call Script's public identity",
      "the Page's direct link to popular.vote",
      "product continuity between the two named surfaces",
    ],
    doesNotEstablish: [
      "the complete project team",
      "historic page-management permissions",
      "participation totals",
      "causal impact",
    ],
  },
  {
    id: callScriptEventSourceId,
    title: "NYC DIY Spaces post Ghost Ship: Dept of Cultural Affairs Meeting discussion",
    organization: "NYC Artist Coalition, Call Script, and cohosts",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-27",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Call Script and NYC Artist Coalition, discussion for 'NYC DIY Spaces post Ghost Ship: Dept of Cultural Affairs Meeting,' January 27, 2017.",
    publicNote:
      "The discussion preserves a public naming poll, collaborative letter invitation, and participant note-sharing offer around the DCLA meeting.",
    supportsGenerally: [
      "a January 27, 2017 DCLA meeting",
      "a public naming poll in which NYC Artist Coalition received 57% of the displayed share",
      "an invitation to review, edit, and sign a letter to the Commissioner",
      "an offer to take and share meeting notes",
    ],
    doesNotEstablish: [
      "the poll's vote denominator",
      "historical attendance",
      "the complete coalition-formation sequence",
      "sole authorship or individual causality",
    ],
  },
  {
    id: jamieCallScriptSourceId,
    title: "Jamie Burkart first-hand Call Script role statement",
    author: "Jamie Burkart",
    kind: "firsthand-statement",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart first-hand statement about establishing Call Script and facilitating the NYC Artist Coalition naming process, July 15, 2026.",
    publicNote:
      "The attributed statement is retained as a research lead. The individual role is held from website projection pending dated or collaborator corroboration.",
    supportsGenerally: [
      "Jamie's account of establishing Call Script",
      "Jamie's account of facilitating the public process around NYC Artist Coalition's formation",
    ],
    doesNotEstablish: [
      "sole creation of NYC Artist Coalition",
      "the complete division of work",
      "independent corroboration",
      "individual causality for later policy outcomes",
    ],
    protectedLocatorId: "PTR-CALLSCRIPT-JAMIE-FIRSTHAND-2026-07-15",
  },
] satisfies SourceRecord[];

export const wowListSundayDinnerCallScriptObservations = [
  {
    id: "OBS-WOWLIST-SUNDAY-CALLSCRIPT-AUDIT-METHOD",
    sourceId: auditSourceId,
    project: "portfolio-system",
    statement:
      "The public audit records aggregate measures, source digests, methods, and exclusions while withholding raw database records, person-level workbook rows, private messages, credentials, authenticated state, and local archive locations.",
    observationType: "metadata",
    locator: "Public aggregate fixture and project audit sections on method and public safety.",
    confidence: "high",
    limitations: [
      "The audit is a reproducible derivative research record, not an independent source for the underlying project activity.",
      "The source digests permit identity checks but do not make protected source contents public.",
    ],
    supportsClaimIds: [
      wowListScaleClaimId,
      sundayDinnerScaleClaimId,
      callScriptBridgeClaimId,
    ],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-DATABASE-SNAPSHOT-COUNTS",
    sourceId: wowListArchiveSourceId,
    project: "wowlist",
    statement:
      "Logical-row reconstruction of the July 22, 2017 snapshot yielded 1,846 users, 16,142 posts or events, 23,864 tags or lists, 28,837 list follows, 20,927 stars or saves, 2,965 going marks, and 15,915 distinct calendar events.",
    observationType: "metadata",
    locator: "Aggregate table-count audit and source digest in the public fixture.",
    confidence: "high",
    limitations: [
      "These are historical database rows, not unique active users, attendance, current use, revenue, or impact.",
      "Multiline records required logical-row reconstruction rather than physical-line counting.",
    ],
    supportsClaimIds: [wowListScaleClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-DATABASE-ACTIVE-CITY-SCENES",
    sourceId: wowListArchiveSourceId,
    project: "wowlist",
    statement:
      "The snapshot contained at least 35 city or regional scenes with 50 or more geocoded posts or events under the retained threshold definition.",
    observationType: "metadata",
    locator: "Aggregate geolocation audit and threshold definition in the public fixture.",
    confidence: "high",
    limitations: [
      "The threshold is an analytical definition, not a product-authored category or proof of complete local adoption.",
      "Geocoded posts may not represent distinct organizers, users, venues, or attended events.",
    ],
    supportsClaimIds: [wowListScaleClaimId],
    reviewedAt,
  },
  {
    id: "OBS-196-WORKBOOK-NUMBERED-ENTRIES-AND-MEALS",
    sourceId: sundayDinnerWorkbookSourceId,
    project: "196-sunday-dinner",
    statement:
      "The workbook contains 345 numbered entries from January 22, 2012, through March 7, 2021, and displays a formula-backed total of 2,783 meals served.",
    observationType: "metadata",
    locator: "Numbered event-header chronology and displayed meals-served formula in the aggregate audit.",
    confidence: "high",
    limitations: [
      "Numbered entries are not asserted as a complete event census or as exclusively in-person dinners.",
      "The total is the workbook's formula-backed project measure, not a unique-person or independently audited attendance count.",
    ],
    supportsClaimIds: [sundayDinnerScaleClaimId],
    reviewedAt,
  },
  {
    id: "OBS-CALLSCRIPT-PAGE-POPULAR-VOTE-LINK",
    sourceId: callScriptPageSourceId,
    project: "nyc-artist-coalition",
    statement:
      "The Call Script Page describes a representative-calling project and links directly to popular.vote, the archived WOW List event-sharing and civic-coordination surface.",
    observationType: "explicit",
    locator: "Page description and Links section.",
    confidence: "high",
    limitations: [
      "The current Page does not establish the complete project team, historical permissions, participation totals, or causal impact.",
    ],
    supportsClaimIds: [callScriptBridgeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-CALLSCRIPT-DCLA-EVENT-CONTEXT",
    sourceId: callScriptEventSourceId,
    project: "nyc-artist-coalition",
    statement:
      "The public event record identifies a January 27, 2017 meeting at the NYC Department of Cultural Affairs about DIY and alternative art spaces following the Ghost Ship fire, displayed as cohosted by NYC Artist Coalition, Call Script, and two others.",
    observationType: "explicit",
    locator: "Event title, date, location, host display, and About text.",
    confidence: "high",
    limitations: [
      "The current interface is not a historical attendance record and the abbreviated host display does not identify every cohost in the observation.",
    ],
    supportsClaimIds: [callScriptBridgeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-CALLSCRIPT-NYCAC-NAMING-POLL",
    sourceId: callScriptEventSourceId,
    project: "nyc-artist-coalition",
    statement:
      "Before the meeting, Call Script invited participants to help choose a group name; NYC Artist Coalition received 57% of the displayed poll share, ahead of six alternatives.",
    observationType: "explicit",
    locator: "January 27, 2017 Call Script discussion post and displayed poll results.",
    confidence: "high",
    limitations: [
      "The visible poll does not expose a vote denominator, voter identities, representativeness, or the complete organizational naming process.",
    ],
    supportsClaimIds: [callScriptBridgeClaimId, callScriptRoleClaimId],
    reviewedAt,
  },
  {
    id: "OBS-CALLSCRIPT-LETTER-AND-NOTES-WORKFLOW",
    sourceId: callScriptEventSourceId,
    project: "nyc-artist-coalition",
    statement:
      "The discussion invited participants to review, edit, and sign a letter to the Commissioner, and a participant offered to take and share meeting notes.",
    observationType: "explicit",
    locator: "Discussion posts connected to the January 27, 2017 event.",
    confidence: "high",
    limitations: [
      "The visible discussion does not establish who drafted every line, the final signatory set, delivery, agency response, or later policy causality.",
    ],
    supportsClaimIds: [callScriptBridgeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-CALLSCRIPT-JAMIE-FIRSTHAND-ROLE",
    sourceId: jamieCallScriptSourceId,
    project: "nyc-artist-coalition",
    statement:
      "Jamie states that he established Call Script and used its public event discussion to help facilitate the naming process through which NYC Artist Coalition emerged.",
    observationType: "attributed",
    locator: "Jamie's July 15, 2026 first-hand statement in the archival-production request.",
    confidence: "moderate",
    limitations: [
      "This is first-hand memory, not independent corroboration or a complete account of collaborators and organizational formation.",
    ],
    supportsClaimIds: [callScriptRoleClaimId],
    reviewedAt,
  },
] satisfies ObservationRecord[];

export const wowListSundayDinnerCallScriptClaims = [
  {
    id: wowListScaleClaimId,
    project: "wowlist",
    claimType: "scale",
    internalClaim:
      "The July 22, 2017 WOW List archive snapshot records substantial product and community-system scale across users, posts or events, followable lists, saves, calendar records, and at least 35 active city scenes under a defined threshold.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-WOWLIST-SUNDAY-CALLSCRIPT-AUDIT-METHOD",
      "OBS-WOWLIST-DATABASE-SNAPSHOT-COUNTS",
      "OBS-WOWLIST-DATABASE-ACTIVE-CITY-SCENES",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "A July 2017 archive snapshot records 1,846 users, 16,142 posts or events, 23,864 tags or lists, 28,837 list follows, 20,927 saves, and 15,915 calendar events across at least 35 active city scenes.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
      },
    ],
    evidence: [
      {
        sourceId: auditSourceId,
        relationship: "direct-support",
        supports: ["the public aggregate counts, method, threshold, and limitations"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: wowListArchiveSourceId,
        relationship: "private-support",
        supports: ["the underlying historical database records and source digest"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Call these historical archive rows, not unique active users, attendance, current use, revenue, or impact.",
      "Define an active city scene as at least 50 geocoded posts or events in a city or region.",
      "Keep raw database records and private user or system data outside Git.",
    ],
    antiClaims: [
      "WOW List had 16,142 attended events",
      "35 cities adopted WOW List citywide",
      "the snapshot proves current use or business performance",
      "Jamie alone authored the platform or community activity",
    ],
    researchInquiryIds: ["INQ-WOWLIST-SUNDAY-CALLSCRIPT-AGGREGATES-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex archival review", "Jamie Burkart publication authorization"],
  },
  {
    id: sundayDinnerScaleClaimId,
    project: "196-sunday-dinner",
    claimType: "scale",
    internalClaim:
      "The Sunday Dinner coordination workbook records 345 numbered entries from January 2012 through March 2021 and a formula-backed project total of 2,783 meals served.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-WOWLIST-SUNDAY-CALLSCRIPT-AUDIT-METHOD",
      "OBS-196-WORKBOOK-NUMBERED-ENTRIES-AND-MEALS",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "A longitudinal coordination workbook records 345 numbered entries from January 2012 through March 2021 and a formula-backed project total of 2,783 meals served.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/196-sunday-dinner"],
      },
    ],
    evidence: [
      {
        sourceId: auditSourceId,
        relationship: "direct-support",
        supports: ["the public aggregate chronology, total, formula, method, and limitations"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: sundayDinnerWorkbookSourceId,
        relationship: "private-support",
        supports: ["the numbered chronology, formula-backed total, and source digest"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Describe 345 as numbered workbook entries, not a complete independently verified event count.",
      "Describe 2,783 as the workbook's formula-backed project total, not unique diners or independently audited attendance.",
      "Do not publish names, contacts, invitation notes, or person-level participation rows.",
    ],
    antiClaims: [
      "2,783 unique people attended Sunday Dinner",
      "the workbook proves complete attendance at every gathering",
      "all 345 entries were in-person dinners",
      "Jamie alone produced every gathering or meal",
    ],
    researchTaskIds: ["RT-196-WORKBOOK-DEFINITION-CORROBORATION"],
    researchInquiryIds: ["INQ-WOWLIST-SUNDAY-CALLSCRIPT-AGGREGATES-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex spreadsheet audit", "Jamie Burkart publication authorization"],
  },
  {
    id: callScriptBridgeClaimId,
    project: "nyc-artist-coalition",
    claimType: "method",
    internalClaim:
      "Call Script carried the event-sharing logic of WOW List's popular.vote adaptation into a participatory civic workflow around the January 2017 DCLA meeting: a public naming poll, collaborative Commissioner letter, and shared meeting documentation.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-WOWLIST-SUNDAY-CALLSCRIPT-AUDIT-METHOD",
      "OBS-CALLSCRIPT-PAGE-POPULAR-VOTE-LINK",
      "OBS-CALLSCRIPT-DCLA-EVENT-CONTEXT",
      "OBS-CALLSCRIPT-NYCAC-NAMING-POLL",
      "OBS-CALLSCRIPT-LETTER-AND-NOTES-WORKFLOW",
      "OBS-WOWLIST-POPULAR-VOTE-ARCHIVE",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "Call Script linked directly to WOW List's popular.vote event-sharing surface. Around the January 2017 DCLA meeting, its public discussion turned that coordination practice into a naming poll, a collaborative letter to the Commissioner, and shared meeting notes; NYC Artist Coalition received 57% of the displayed naming-poll share.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
      },
    ],
    evidence: [
      {
        sourceId: auditSourceId,
        relationship: "context",
        supports: ["the public audit method, aggregate fixture, and exclusion boundary"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: callScriptPageSourceId,
        relationship: "direct-support",
        supports: ["Call Script's public identity and direct popular.vote link"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016-12-11",
        relationship: "context",
        supports: ["popular.vote's archived WOW List event-sharing and community-building identity"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: callScriptEventSourceId,
        relationship: "direct-support",
        supports: [
          "the DCLA meeting context",
          "the displayed naming poll",
          "the collaborative letter invitation",
          "the shared-note workflow",
        ],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Describe this as product and facilitation continuity, not proof that popular.vote alone caused NYC Artist Coalition to form.",
      "The displayed poll has percentage shares but no vote denominator or representativeness measure.",
      "Credit NYC Artist Coalition, Call Script, cohosts, and participants; do not absorb collective work into Jamie's individual authorship.",
      "The current Facebook response counter is not historical attendance evidence.",
    ],
    antiClaims: [
      "popular.vote created NYC Artist Coalition",
      "Jamie alone named or founded NYC Artist Coalition",
      "57% means a known number or representative share of all coalition members",
      "the event discussion proves government adoption or later policy causality",
    ],
    researchTaskIds: ["RT-CALLSCRIPT-ROLE-AND-FORMATION-CORROBORATION"],
    researchInquiryIds: ["INQ-WOWLIST-SUNDAY-CALLSCRIPT-AGGREGATES-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex authenticated public-source review", "Jamie Burkart"],
  },
  {
    id: callScriptRoleClaimId,
    project: "nyc-artist-coalition",
    claimType: "role",
    internalClaim:
      "Jamie states that he established Call Script and used it to help facilitate the public process through which NYC Artist Coalition was named and organized.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "use-with-care",
    observationIds: [
      "OBS-CALLSCRIPT-JAMIE-FIRSTHAND-ROLE",
      "OBS-CALLSCRIPT-NYCAC-NAMING-POLL",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie states that he established Call Script and used it to help facilitate the participatory naming process around NYC Artist Coalition's formation.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: jamieCallScriptSourceId,
        relationship: "direct-support",
        supports: ["Jamie's attributed first-hand account of his role"],
        confidence: "moderate",
        renderCitation: false,
      },
      {
        sourceId: callScriptEventSourceId,
        relationship: "corroborating",
        supports: ["the visible Call Script naming-poll and facilitation actions"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Keep the individual role claim attributed to Jamie until dated account records, task artifacts, or collaborator confirmation establish it independently.",
      "Preserve every cofounder, cohost, participant, and coalition contributor's credit.",
    ],
    antiClaims: [
      "Jamie solely founded NYC Artist Coalition",
      "Jamie authored every Call Script or coalition action",
      "the poll alone proves Jamie's individual role",
      "Jamie's role caused later government action",
    ],
    researchTaskIds: ["RT-CALLSCRIPT-ROLE-AND-FORMATION-CORROBORATION"],
    researchInquiryIds: ["INQ-WOWLIST-SUNDAY-CALLSCRIPT-AGGREGATES-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart first-hand account", "Codex archival review"],
  },
] satisfies ClaimRecord[];

export const wowListSundayDinnerCallScriptResearchTasks = [
  {
    id: "RT-196-WORKBOOK-DEFINITION-CORROBORATION",
    project: "196-sunday-dinner",
    question:
      "How did collaborators define numbered entries and meals served in the Sunday Dinner workbook, and can the aggregate total be corroborated without exposing person-level records?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-196-ATTENDANCE-WORKBOOK-2026"],
    sourceIds: [sundayDinnerWorkbookSourceId, auditSourceId],
    claimIds: [sundayDinnerScaleClaimId],
    successCriteria: [
      "Recover a dated first-party legend, project summary, or collaborator statement defining numbered entries and meals served.",
      "Reconcile the formula-backed total to a public-safe aggregate without retaining or publishing row-level people data.",
    ],
    nextActions: [
      "Review public project summaries and milestone posts for contemporaneous aggregate language.",
      "Invite Richard Album or another project collaborator to confirm the measure definitions and chronology.",
    ],
    publicNote:
      "The current projection accurately attributes the total to the workbook and keeps unique-person and complete-attendance interpretations disallowed.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-CALLSCRIPT-ROLE-AND-FORMATION-CORROBORATION",
    project: "nyc-artist-coalition",
    question:
      "What dated records and collaborator accounts can establish Jamie's individual Call Script role and the broader NYC Artist Coalition formation sequence without erasing collective authorship?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-CALLSCRIPT-POPULAR-VOTE-NYCAC-BRIDGE-2026"],
    sourceIds: [callScriptPageSourceId, callScriptEventSourceId, jamieCallScriptSourceId],
    claimIds: [callScriptBridgeClaimId, callScriptRoleClaimId],
    successCriteria: [
      "Recover dated Page-role, design, domain, source-code, event-production, or correspondence records that distinguish Jamie's work from current account access.",
      "Invite cohosts and early coalition participants to correct the formation chronology and division of work.",
      "Retain the full cofounder and participant context around any strengthened individual role claim.",
    ],
    nextActions: [
      "Review Call Script project archives and public source history for dated authorship and operations records.",
      "Request short proof notes from early cohosts and coalition collaborators.",
      "Keep the individual role claim held until corroboration is sufficient for selection.",
    ],
    publicNote:
      "The public sources already establish the participatory facilitation sequence; Jamie's individual establishment role remains an attributed candidate pending corroboration.",
    owner: "Jamie Burkart / early coalition collaborators",
    reviewedAt,
  },
] satisfies ResearchTask[];

export const wowListSundayDinnerCallScriptInquiries = [
  {
    id: "INQ-WOWLIST-SUNDAY-CALLSCRIPT-AGGREGATES-2026-07-15",
    project: "portfolio-system",
    question:
      "What public-safe product-scale, participation-continuity, and civic-facilitation claims can be developed from the WOW List archive, Sunday Dinner workbook, Call Script Page, and January 2017 event discussion?",
    methods: [
      "Reconstruct logical database rows and reconcile distinct identifiers before counting aggregate WOW List records.",
      "Inspect the linked attendance workbook read-only and reconcile numbered headers, cached summary cells, and the meals-served formula without exporting person-level rows.",
      "Close-read the authenticated public Call Script Page and event discussion without retaining session state, participant quotations, or private data.",
      "Compare the Call Script Page's direct popular.vote link with the previously recovered December 2016 popular.vote archive.",
      "Separate public project actions from Jamie's attributed first-hand role and route the latter to corroboration.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The July 2017 WOW List snapshot supports exact historical aggregate counts and at least 35 active city scenes under a defined 50-record threshold.",
      "The Sunday Dinner workbook supports a 345-entry numbered chronology from January 2012 through March 2021 and a formula-backed total of 2,783 meals served.",
      "The Call Script Page links directly to popular.vote, connecting the named public surfaces.",
      "The January 2017 event discussion preserves a public naming poll, collaborative Commissioner-letter workflow, and shared-note practice around a DCLA meeting.",
      "NYC Artist Coalition received 57% of the displayed naming-poll share, but the interface exposes no vote denominator.",
    ],
    limitations: [
      "The protected archives contain private data and are represented publicly only by aggregate findings, source digests, and methods.",
      "Database rows do not measure current use, unique active users, attendance, revenue, or causal impact.",
      "The workbook total is not a unique-person or independently audited attendance measure.",
      "The public Facebook sources do not establish historical account permissions, complete formation history, sole authorship, or policy causality.",
      "Jamie's individual Call Script role remains an attributed candidate pending dated or collaborator corroboration.",
    ],
    sourceIds: [
      auditSourceId,
      wowListArchiveSourceId,
      sundayDinnerWorkbookSourceId,
      callScriptPageSourceId,
      callScriptEventSourceId,
      jamieCallScriptSourceId,
      "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016-12-11",
    ],
    publicSummary:
      "Aggregate and public-source review strengthens the portfolio with exact historical WOW List scale, a longitudinal Sunday Dinner participation record, and a documented bridge from popular.vote event sharing to Call Script's participatory civic facilitation. Private rows and uncorroborated individual-role claims remain protected or held.",
    protectedLocatorId: "RESEARCH-WOWLIST-SUNDAY-CALLSCRIPT-2026-07-15",
  },
] satisfies ResearchInquiry[];
