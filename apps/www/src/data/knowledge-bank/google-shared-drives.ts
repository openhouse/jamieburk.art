import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const handoffPracticeClaimId = "CLM-GDRIVE-PORTABLE-HANDOFF-PRACTICE";
const residencyHandoffClaimId = "CLM-196-RESIDENCY-ONBOARDING-HANDOFF";
const actionGuidanceClaimId = "CLM-NYCAC-MULTI-ACTION-GUIDANCE-DRAFT";
const archiveWorkflowClaimId = "CLM-GDRIVE-ARCHIVE-OVERVIEW-WORKFLOW";
const styleGuideSeedClaimId = "CLM-SBU-STYLE-GUIDE-HANDOFF-SEED";

export const googleSharedDriveReviewSummary = {
  accessibleDriveCount: 110,
  selectedDriveCount: 14,
  unreviewedDriveCount: 96,
  closeReadTextArtifactCount: 7,
  revisionHistoryCount: 4,
  selectedFamilies: [
    "commercial vacancy and public data",
    "Fair Rent NYC and Commercial Rent Stabilization",
    "NYC Artist Coalition",
    "196 Artists Residency and Sunday Dinner",
    "WOWList",
    "KC Town Hall",
    "participatory media and symposia",
    "foundation collaboration",
  ],
} as const;

export const googleSharedDriveCaptures = [
  {
    id: "CAP-GDRIVE-CORPUS-INVENTORY-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "A privacy-first inventory and professional-relevance sample of Jamie's accessible Google Drive Shared Drives.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["portfolio-system"],
    potentialClaimFamilies: [
      "portable project handoffs",
      "cross-device continuity",
      "collaborator workspaces",
    ],
    sourceIds: [
      "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
      "SRC-GDRIVE-JAMIE-HANDOFF-PRACTICE-2026",
    ],
    observationIds: [
      "OBS-GDRIVE-INVENTORY-ACCESSIBLE-COUNT",
      "OBS-GDRIVE-INVENTORY-BOUNDED-SAMPLE",
      "OBS-GDRIVE-JAMIE-HANDOFF-PRACTICE",
    ],
    researchTaskIds: ["RT-GDRIVE-REMAINING-CORPUS-TRIAGE"],
    disposition:
      "Recorded bounded counts, method, and selected professional families; kept Drive IDs, private URLs, member lists, personal drives, and raw file inventories outside Git.",
  },
  {
    id: "CAP-GDRIVE-CRS-RUNNING-MEMORY-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "A later Shared Drive revision of the Commercial Rent Stabilization running-memory system, reviewed with revision-level attribution.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["fair-rent-nyc"],
    potentialClaimFamilies: [
      "shared campaign memory",
      "consent-aware coordination",
      "owner and follow-up tracking",
    ],
    sourceIds: ["SRC-CRS-RUNNING-MINUTES-2026-05-15"],
    observationIds: [
      "OBS-GDRIVE-CRS-SHARED-PURPOSE",
      "OBS-GDRIVE-CRS-HANDOFF-FIELDS",
      "OBS-GDRIVE-CRS-REVISION-CREDIT",
    ],
    researchTaskIds: [],
    disposition:
      "Strengthened the existing source record with Shared Drive structure and revision history while omitting participants, strategy, vulnerable business details, and private action content.",
  },
  {
    id: "CAP-GDRIVE-196-ONBOARDING-TEMPLATE-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "A Jamie-attributed 196 Artists Residency acceptance and access-handoff template from 2023.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["196-sunday-dinner"],
    potentialClaimFamilies: [
      "artist onboarding",
      "space configuration",
      "independent access handoff",
    ],
    sourceIds: ["SRC-GDRIVE-196-ACCEPTANCE-TEMPLATE-2023"],
    observationIds: [
      "OBS-GDRIVE-196-REVISION-ATTRIBUTION",
      "OBS-GDRIVE-196-SCHEDULED-ACCEPTANCE",
      "OBS-GDRIVE-196-ORIENTATION-CONFIGURATION",
      "OBS-GDRIVE-196-INDEPENDENT-ACCESS",
    ],
    researchTaskIds: ["RT-GDRIVE-196-WORKFLOW-REUSE-CORROBORATION"],
    disposition:
      "Promoted the template-based onboarding and access workflow while omitting the resident's identity, contact details, address, and private message text.",
  },
  {
    id: "CAP-GDRIVE-NYCAC-ACTION-GUIDANCE-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "A revision-attributed NYC Artist Coalition draft that organized three live civic lanes into concrete audience actions.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["fair-rent-nyc"],
    potentialClaimFamilies: [
      "public guidance",
      "multi-campaign calls to action",
      "collaborative editorial workflow",
    ],
    sourceIds: ["SRC-GDRIVE-NYCAC-ACTION-GUIDANCE-2025"],
    observationIds: [
      "OBS-GDRIVE-NYCAC-REVISION-ATTRIBUTION",
      "OBS-GDRIVE-NYCAC-THREE-ACTION-STRUCTURE",
      "OBS-GDRIVE-NYCAC-ACTION-PATHWAYS",
    ],
    researchTaskIds: ["RT-GDRIVE-NYCAC-GUIDANCE-PUBLICATION-USE"],
    disposition:
      "Promoted Jamie's attributed draft structure, credited the later collaborator edit, and did not claim that the draft was sent, published, or caused participation.",
  },
  {
    id: "CAP-GDRIVE-VACANCY-OVERVIEW-WORKFLOW-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "A Jamie-attributed shell workflow for creating privacy-aware textual overviews of mixed-format project archives.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["fair-rent-nyc", "portfolio-system"],
    potentialClaimFamilies: [
      "archive tooling",
      "mixed-format extraction",
      "sensitive-output controls",
    ],
    sourceIds: ["SRC-GDRIVE-VACANCY-OVERVIEW-SCRIPT-2026"],
    observationIds: [
      "OBS-GDRIVE-VACANCY-SCRIPT-ATTRIBUTION",
      "OBS-GDRIVE-VACANCY-SCRIPT-FORMAT-HANDLING",
      "OBS-GDRIVE-VACANCY-SCRIPT-SAFETY-BOUNDARY",
    ],
    researchTaskIds: ["RT-GDRIVE-ARCHIVE-WORKFLOW-EXECUTION"],
    disposition:
      "Promoted the inspectable workflow and its explicit safety boundary, not claims about every execution, every supported format, or public-data analysis outcomes.",
  },
  {
    id: "CAP-GDRIVE-SBU-STYLE-GUIDE-SEED-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "An early brand-guidelines seed that credits a collaborator's identity system and proposes a reusable teammate style guide.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["fair-rent-nyc"],
    potentialClaimFamilies: [
      "collaborator-aware documentation",
      "brand handoff",
      "team consistency",
    ],
    sourceIds: ["SRC-GDRIVE-SBU-STYLE-GUIDE-SEED-2026"],
    observationIds: [
      "OBS-GDRIVE-SBU-REVISION-ATTRIBUTION",
      "OBS-GDRIVE-SBU-CREDITED-HANDOFF-INTENT",
    ],
    researchTaskIds: ["RT-GDRIVE-SBU-STYLE-GUIDE-COMPLETION"],
    disposition:
      "Retained as a candidate handoff pattern, not a completed deliverable; collaborator identity and underlying design assets remain protected.",
  },
  {
    id: "CAP-GDRIVE-SUNDAY-DINNER-PHOTO-SET-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "photo-lead",
    summary:
      "An eleven-image Sunday Dinner set awaiting photo-editor, rights, consent, identification, and public-value review.",
    status: "researching",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["196-sunday-dinner"],
    potentialClaimFamilies: [
      "recurring gathering rhythm",
      "hospitality infrastructure",
      "participant experience",
    ],
    sourceIds: [],
    observationIds: [],
    researchTaskIds: ["RT-GDRIVE-SUNDAY-DINNER-PHOTO-REVIEW"],
    disposition:
      "Preserved the visual lead without copying images, identifying participants, or treating unseen photographs as proof.",
  },
  {
    id: "CAP-GDRIVE-WOWLIST-HANDOFF-MATERIALS-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "A 2015 member-meeting video and later project-transition records awaiting separate content, privacy, and collaborator-credit review.",
    status: "researching",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["wowlist"],
    potentialClaimFamilies: [
      "member onboarding",
      "platform explanation",
      "project transition",
    ],
    sourceIds: [],
    observationIds: [],
    researchTaskIds: ["RT-GDRIVE-WOWLIST-MEETING-HANDOFF-REVIEW"],
    disposition:
      "Routed the video and transition materials to bounded review; no legal, ownership, collaborator, or testimonial proposition was inferred from filenames.",
  },
  {
    id: "CAP-GDRIVE-KCTH-TRANSITION-PRIVACY-BOUNDARY-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "Transition-related KC Town Hall materials encountered during Shared Drive review and excluded under Jamie's stated privacy boundary.",
    status: "closed",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["kc-town-hall"],
    potentialClaimFamilies: ["transition stewardship"],
    sourceIds: [],
    observationIds: [],
    researchTaskIds: [],
    disposition:
      "Did not ingest private transition records; the public bank continues to use official City records plus Jamie's approved statement that he transitioned the project to a mission-aligned organization.",
  },
] satisfies CaptureRecord[];

export const googleSharedDriveSources = [
  {
    id: "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    title: "Google Drive Shared Drive inventory and bounded professional sample",
    author: "Codex archival review with Jamie Burkart",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-07-14",
    publicCitation:
      "Public-safe summary of a July 14, 2026, Google Drive Shared Drive inventory and bounded professional-relevance sample.",
    publicNote:
      "The record preserves counts, selection method, and limitations only; Drive names, IDs, URLs, memberships, and raw inventories remain private.",
    protectedLocatorId: "RESEARCH-GDRIVE-PORTFOLIO-SAMPLE-2026-001",
    supportsGenerally: [
      "110 Shared Drives were accessible to the authenticated account at review time",
      "14 professionally relevant drives received top-level review",
      "seven text artifacts and four revision histories received closer review",
    ],
    doesNotEstablish: [
      "that Jamie owns or authored every accessible drive or file",
      "that every drive is professional or public",
      "that the 14-drive sample is exhaustive",
      "that inaccessible or unreviewed material does not exist",
    ],
  },
  {
    id: "SRC-GDRIVE-JAMIE-HANDOFF-PRACTICE-2026",
    title: "Jamie Burkart statement about Shared Drive handoff practice",
    author: "Jamie Burkart",
    kind: "firsthand-statement",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2026-07-14",
    publicCitation:
      "Jamie Burkart, approved first-hand statement about maintaining project Shared Drives for cross-device and collaborator handoff, July 14, 2026.",
    protectedLocatorId: "STATEMENT-GDRIVE-HANDOFF-PRACTICE-2026-001",
    supportsGenerally: [
      "Jamie keeps project-specific Shared Drives",
      "he uses them to move workflows between phone and laptop",
      "he uses them to support collaborator handoff",
    ],
    doesNotEstablish: [
      "authorship of every artifact in those drives",
      "permission to publish private contents",
      "uniform adoption by every collaborator",
      "the quality or completeness of every drive",
    ],
  },
  {
    id: "SRC-GDRIVE-196-ACCEPTANCE-TEMPLATE-2023",
    title: "196 Artists Residency acceptance and access handoff template",
    organization: "196 Artists Residency",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2023-07-19",
    publicCitation:
      "Jamie Burkart, public-safe summary of a 196 Artists Residency acceptance and access-handoff template, July 19, 2023.",
    publicNote:
      "Revision history attributes both recorded revisions to Jamie. The resident's identity, contact details, location, and message text remain private.",
    protectedLocatorId: "ARCHIVE-196-ACCEPTANCE-HANDOFF-2023-001",
    supportsGenerally: [
      "Jamie's authorship of the recorded template revisions",
      "scheduled residency acceptance",
      "pre-arrival orientation and space configuration",
      "self-service and independent collaborator access",
    ],
    doesNotEstablish: [
      "the total number of residencies",
      "that every resident received the same workflow",
      "participant outcomes or satisfaction",
      "permission to identify or quote the resident",
    ],
  },
  {
    id: "SRC-GDRIVE-NYCAC-ACTION-GUIDANCE-2025",
    title: "NYC Artist Coalition multi-action public-guidance draft",
    organization: "NYC Artist Coalition",
    author: "Jamie Burkart and collaborator",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2025-10-06",
    publicCitation:
      "Public-safe summary of a revision-attributed NYC Artist Coalition multi-action guidance draft, October 2025.",
    publicNote:
      "Revision history attributes the reviewed working revision to Jamie and a later revision to a collaborator; raw copy and collaborator identity remain private.",
    protectedLocatorId: "ARCHIVE-NYCAC-ACTION-GUIDANCE-2025-001",
    supportsGenerally: [
      "Jamie's authorship of the reviewed working revision",
      "three distinct audience action lanes",
      "grant, Commercial Rent Stabilization, and Talks Not Raids action pathways",
      "a later collaborative edit",
    ],
    doesNotEstablish: [
      "that the draft was sent or published",
      "sole authorship of the final revision",
      "accuracy of every underlying policy statement",
      "participation, funding, legislative, or enforcement outcomes",
    ],
  },
  {
    id: "SRC-GDRIVE-VACANCY-OVERVIEW-SCRIPT-2026",
    title: "Vacancy-data archive overview shell workflow",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2026-03-04",
    publicCitation:
      "Jamie Burkart, public-safe summary of a mixed-format archive overview shell workflow, March 4, 2026.",
    publicNote:
      "Google Drive records one stored revision attributed to Jamie. The script remains private because its output can expose archive contents.",
    protectedLocatorId: "ARCHIVE-VACANCY-OVERVIEW-SCRIPT-2026-001",
    supportsGenerally: [
      "Jamie's maintenance of the sole stored revision",
      "directory and mixed-format content overview generation",
      "PDF text extraction with OCR fallback",
      "tracked Word-document conversion and large CSV or JSON sampling",
      "explicit sensitive-output warnings and skip rules",
    ],
    doesNotEstablish: [
      "successful execution against every archive format",
      "a production service or deployed product",
      "authorship history outside the stored Drive revision",
      "analysis results from the underlying vacancy data",
    ],
  },
  {
    id: "SRC-GDRIVE-SBU-STYLE-GUIDE-SEED-2026",
    title: "Small Business United brand-guidelines seed",
    organization: "Small Business United",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2026-02-17",
    publicCitation:
      "Jamie Burkart, public-safe summary of an early Small Business United brand-guidelines seed, February 17, 2026.",
    publicNote:
      "The seed credits a collaborator's identity system and proposes teammate documentation; collaborator identity and design assets remain private here.",
    protectedLocatorId: "ARCHIVE-SBU-STYLE-GUIDE-SEED-2026-001",
    supportsGenerally: [
      "Jamie's authorship of both stored revisions",
      "explicit credit for a collaborator-designed identity system",
      "intent to document the system for cohesive teammate use",
    ],
    doesNotEstablish: [
      "a completed style guide",
      "Jamie's authorship of the identity system",
      "adoption by the team",
      "permission to publish the collaborator's design assets",
    ],
  },
] satisfies SourceRecord[];

export const googleSharedDriveObservations = [
  {
    id: "OBS-GDRIVE-INVENTORY-ACCESSIBLE-COUNT",
    sourceId: "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    project: "portfolio-system",
    statement:
      "The authenticated Google Drive account returned 110 accessible Shared Drives on July 14, 2026.",
    observationType: "metadata",
    locator: "Shared Drive list response count.",
    confidence: "high",
    limitations: [
      "Accessibility at one review time does not establish ownership, authorship, permanence, or publication permission.",
    ],
    supportsClaimIds: [handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-INVENTORY-BOUNDED-SAMPLE",
    sourceId: "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    project: "portfolio-system",
    statement:
      "Fourteen professionally relevant Shared Drives received top-level review; seven text artifacts and four revision histories received closer review across eight public-safe project families.",
    observationType: "metadata",
    locator: "Selection ledger and connector retrieval log.",
    confidence: "high",
    limitations: [
      "The relevance sample was intentionally selective; the remaining 96 drives were not close-read and may contain future professional evidence.",
    ],
    supportsClaimIds: [handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-JAMIE-HANDOFF-PRACTICE",
    sourceId: "SRC-GDRIVE-JAMIE-HANDOFF-PRACTICE-2026",
    project: "portfolio-system",
    statement:
      "Jamie says he keeps project Shared Drives so workflows can move between his phone and laptop and be handed off with collaborators.",
    observationType: "attributed",
    locator: "Jamie statement, July 14, 2026.",
    confidence: "high",
    limitations: [
      "This first-hand statement establishes Jamie's practice and intent, not authorship or collaborator adoption for every drive.",
    ],
    supportsClaimIds: [handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-CRS-SHARED-PURPOSE",
    sourceId: "SRC-CRS-RUNNING-MINUTES-2026-05-15",
    project: "fair-rent-nyc",
    statement:
      "The Shared Drive copy defines the running minutes as a readable record of meetings, decisions, open questions, action items, and useful campaign memory.",
    observationType: "explicit",
    locator: "Document header, purpose, and how-to sections through May 29, 2026.",
    confidence: "high",
    limitations: [
      "The stated purpose does not establish complete coverage of every meeting or decision.",
    ],
    supportsClaimIds: ["CLM-CRS-COALITION-OPERATING-SYSTEM", handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-CRS-HANDOFF-FIELDS",
    sourceId: "SRC-CRS-RUNNING-MINUTES-2026-05-15",
    project: "fair-rent-nyc",
    statement:
      "The document requires source, consent, owner, and follow-up clarity for contact and event handoffs and separates long background material from running notes.",
    observationType: "explicit",
    locator: "Data/signup, event follow-up, information-handling, and document-use sections.",
    confidence: "high",
    limitations: [
      "The protocol records an operating standard, not proof that every collaborator followed it in every instance.",
    ],
    supportsClaimIds: ["CLM-CRS-COALITION-OPERATING-SYSTEM", handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-CRS-REVISION-CREDIT",
    sourceId: "SRC-CRS-RUNNING-MINUTES-2026-05-15",
    project: "fair-rent-nyc",
    statement:
      "Revision history shows Jamie creating and repeatedly maintaining the record while collaborators also made distinct edits.",
    observationType: "metadata",
    locator: "Shared Drive revision list, April 29-May 29, 2026.",
    confidence: "high",
    limitations: [
      "Revision authorship does not assign authorship of every underlying action, decision, or quoted idea.",
    ],
    supportsClaimIds: ["CLM-CRS-COALITION-OPERATING-SYSTEM"],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-196-REVISION-ATTRIBUTION",
    sourceId: "SRC-GDRIVE-196-ACCEPTANCE-TEMPLATE-2023",
    project: "196-sunday-dinner",
    statement:
      "Both stored revisions of the 196 Artists Residency acceptance template are attributed to Jamie Burkart.",
    observationType: "metadata",
    locator: "Shared Drive revisions 1 and 706, July 19, 2023.",
    confidence: "high",
    limitations: [
      "The revision list does not establish use of the template beyond the reviewed acceptance.",
    ],
    supportsClaimIds: [residencyHandoffClaimId, handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-196-SCHEDULED-ACCEPTANCE",
    sourceId: "SRC-GDRIVE-196-ACCEPTANCE-TEMPLATE-2023",
    project: "196-sunday-dinner",
    statement:
      "The template formally accepts an exhibition-based residency and specifies its scheduled dates.",
    observationType: "explicit",
    locator: "Opening acceptance paragraph.",
    confidence: "high",
    limitations: [
      "The participant and exact dates are intentionally omitted from the public-safe observation.",
    ],
    supportsClaimIds: [residencyHandoffClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-196-ORIENTATION-CONFIGURATION",
    sourceId: "SRC-GDRIVE-196-ACCEPTANCE-TEMPLATE-2023",
    project: "196-sunday-dinner",
    statement:
      "The handoff schedules a pre-arrival video call for introductions and configuration of the space around the resident's needs.",
    observationType: "explicit",
    locator: "Pre-arrival coordination paragraph.",
    confidence: "high",
    limitations: [
      "The source records a planned onboarding step, not a participant evaluation of the experience.",
    ],
    supportsClaimIds: [residencyHandoffClaimId, handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-196-INDEPENDENT-ACCESS",
    sourceId: "SRC-GDRIVE-196-ACCEPTANCE-TEMPLATE-2023",
    project: "196-sunday-dinner",
    statement:
      "The handoff provides a self-service access path and separate keys so the resident and collaborator can enter independently.",
    observationType: "explicit",
    locator: "Access and key-coordination paragraph.",
    confidence: "high",
    limitations: [
      "Location, access instructions, phone information, and participant identity remain private.",
    ],
    supportsClaimIds: [residencyHandoffClaimId, handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-NYCAC-REVISION-ATTRIBUTION",
    sourceId: "SRC-GDRIVE-NYCAC-ACTION-GUIDANCE-2025",
    project: "fair-rent-nyc",
    statement:
      "Revision history attributes the reviewed working draft to Jamie and a later revision to a collaborator.",
    observationType: "metadata",
    locator: "Revisions 16 and 60, October 2025.",
    confidence: "high",
    limitations: [
      "This supports Jamie's draft contribution and later collaboration, not sole authorship of a final publication.",
    ],
    supportsClaimIds: [actionGuidanceClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-NYCAC-THREE-ACTION-STRUCTURE",
    sourceId: "SRC-GDRIVE-NYCAC-ACTION-GUIDANCE-2025",
    project: "fair-rent-nyc",
    statement:
      "Jamie's reviewed revision organizes a nightlife-capacity opportunity, Commercial Rent Stabilization advocacy, and Talks Not Raids oversight into three distinct audience actions.",
    observationType: "explicit",
    locator: "Revision 16, numbered sections 1-3.",
    confidence: "high",
    limitations: [
      "The source is a working draft and does not establish that the communication was sent or that each action remained current.",
    ],
    supportsClaimIds: [actionGuidanceClaimId, handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-NYCAC-ACTION-PATHWAYS",
    sourceId: "SRC-GDRIVE-NYCAC-ACTION-GUIDANCE-2025",
    project: "fair-rent-nyc",
    statement:
      "The draft pairs each issue with a bounded next step, including applying or requesting support, contacting legislators, reading and sharing reporting, requesting oversight, and reporting an incident.",
    observationType: "explicit",
    locator: "Revision 16, action-button placeholders and audience prompts.",
    confidence: "high",
    limitations: [
      "Button placeholders and calls to action are design evidence, not proof of publication, clicks, participation, or outcomes.",
    ],
    supportsClaimIds: [actionGuidanceClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-VACANCY-SCRIPT-ATTRIBUTION",
    sourceId: "SRC-GDRIVE-VACANCY-OVERVIEW-SCRIPT-2026",
    project: "portfolio-system",
    statement:
      "Google Drive records one stored revision of the archive-overview script and attributes it to Jamie Burkart.",
    observationType: "metadata",
    locator: "Sole stored revision, March 4, 2026.",
    confidence: "high",
    limitations: [
      "Drive revision metadata does not preserve any authorship history that may have existed before upload.",
    ],
    supportsClaimIds: [archiveWorkflowClaimId, handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-VACANCY-SCRIPT-FORMAT-HANDLING",
    sourceId: "SRC-GDRIVE-VACANCY-OVERVIEW-SCRIPT-2026",
    project: "portfolio-system",
    statement:
      "The shell workflow inventories directory structure, extracts PDF text with OCR fallback, converts tracked Word changes and comments when possible, and samples oversized CSV and JSON material.",
    observationType: "explicit",
    locator: "Header, format handlers, and large-file summarization functions.",
    confidence: "high",
    limitations: [
      "Code-path inspection does not establish successful execution against every file type or environment.",
    ],
    supportsClaimIds: [archiveWorkflowClaimId, handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-VACANCY-SCRIPT-SAFETY-BOUNDARY",
    sourceId: "SRC-GDRIVE-VACANCY-OVERVIEW-SCRIPT-2026",
    project: "portfolio-system",
    statement:
      "The script explicitly warns that generated overviews can expose sensitive data and excludes designated directories and secret-bearing files from its content pass.",
    observationType: "explicit",
    locator: "Safety warning and skip lists.",
    confidence: "high",
    limitations: [
      "A warning and skip list reduce risk but do not prove that every possible sensitive artifact is excluded.",
    ],
    supportsClaimIds: [archiveWorkflowClaimId, handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-SBU-REVISION-ATTRIBUTION",
    sourceId: "SRC-GDRIVE-SBU-STYLE-GUIDE-SEED-2026",
    project: "fair-rent-nyc",
    statement:
      "Both stored revisions of the early brand-guidelines seed are attributed to Jamie Burkart.",
    observationType: "metadata",
    locator: "Revisions 1 and 158, February 17, 2026.",
    confidence: "high",
    limitations: [
      "Revision attribution does not establish completion or team adoption.",
    ],
    supportsClaimIds: [styleGuideSeedClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-GDRIVE-SBU-CREDITED-HANDOFF-INTENT",
    sourceId: "SRC-GDRIVE-SBU-STYLE-GUIDE-SEED-2026",
    project: "fair-rent-nyc",
    statement:
      "The seed credits a collaborator for the visual identity and proposes documenting it so teammates can refine and apply the system cohesively.",
    observationType: "explicit",
    locator: "Two-paragraph document body.",
    confidence: "high",
    limitations: [
      "The source is an early seed, not a completed style guide or evidence of adoption.",
    ],
    supportsClaimIds: [styleGuideSeedClaimId, handoffPracticeClaimId],
    reviewedAt: "2026-07-14",
  },
] satisfies ObservationRecord[];

export const googleSharedDriveClaims = [
  {
    id: handoffPracticeClaimId,
    project: "portfolio-system",
    claimType: "method",
    internalClaim:
      "Jamie maintains project-specific Shared Drives as portable handoff surfaces across devices and collaborators, pairing them with structured templates, shared memory, public guidance, and privacy-aware archive tooling.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-GDRIVE-INVENTORY-BOUNDED-SAMPLE",
      "OBS-GDRIVE-JAMIE-HANDOFF-PRACTICE",
      "OBS-GDRIVE-CRS-SHARED-PURPOSE",
      "OBS-GDRIVE-CRS-HANDOFF-FIELDS",
      "OBS-GDRIVE-196-ORIENTATION-CONFIGURATION",
      "OBS-GDRIVE-196-INDEPENDENT-ACCESS",
      "OBS-GDRIVE-NYCAC-THREE-ACTION-STRUCTURE",
      "OBS-GDRIVE-VACANCY-SCRIPT-FORMAT-HANDLING",
      "OBS-GDRIVE-VACANCY-SCRIPT-SAFETY-BOUNDARY",
      "OBS-GDRIVE-SBU-CREDITED-HANDOFF-INTENT",
    ],
    projections: [
      {
        key: "technical-operations",
        text: "Jamie maintains project-specific Shared Drives as portable handoff surfaces across devices and collaborators. Reviewed examples pair structured onboarding templates, source-backed running memory, action-oriented guidance, and privacy-aware archive tooling so collaborators can orient, act, and continue without exposing protected material.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"],
      },
      {
        key: "archive-note",
        text: "A bounded July 2026 sample found reusable handoff patterns across Jamie's project Shared Drives while preserving private content and unreviewed drives as protected research state.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/google-shared-drives-production"],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
        relationship: "context",
        supports: ["the bounded cross-project review sample"],
        locator: "Selection ledger and retrieval log.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-GDRIVE-JAMIE-HANDOFF-PRACTICE-2026",
        relationship: "direct-support",
        supports: ["Jamie's cross-device and collaborator-handoff intent"],
        locator: "Jamie statement, July 14, 2026.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-CRS-RUNNING-MINUTES-2026-05-15",
        relationship: "corroborating",
        supports: ["shared memory and explicit handoff fields"],
        locator: "Purpose, information-handling, and follow-up sections.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-GDRIVE-196-ACCEPTANCE-TEMPLATE-2023",
        relationship: "corroborating",
        supports: ["template-based onboarding and access handoff"],
        locator: "Pre-arrival and access sections.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-GDRIVE-NYCAC-ACTION-GUIDANCE-2025",
        relationship: "corroborating",
        supports: ["action-oriented guidance structure"],
        locator: "Revision 16, numbered action sections.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-GDRIVE-VACANCY-OVERVIEW-SCRIPT-2026",
        relationship: "corroborating",
        supports: ["privacy-aware mixed-format archive tooling"],
        locator: "Header, format handlers, and safety warning.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-GDRIVE-SBU-STYLE-GUIDE-SEED-2026",
        relationship: "context",
        supports: ["a collaborator-aware documentation handoff pattern"],
        locator: "Document body and revision history.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "The 14-drive professional sample is not an exhaustive review of all 110 accessible Shared Drives.",
      "Access does not imply ownership, authorship, collaborator adoption, public status, or permission to publish.",
      "Use only the specific artifact affordances and attribution supported by source text and revision history.",
      "Keep Drive IDs, URLs, memberships, private excerpts, participant identities, and personal or legal material outside public Git.",
    ],
    antiClaims: [
      "Jamie authored every file in every Shared Drive",
      "Every collaborator used or approved every handoff system",
      "All 110 Shared Drives were close-read",
      "Private Shared Drive contents are public portfolio evidence",
    ],
    researchTaskIds: ["RT-GDRIVE-REMAINING-CORPUS-TRIAGE"],
    researchInquiryIds: ["INQ-GDRIVE-PORTFOLIO-SAMPLE-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: residencyHandoffClaimId,
    project: "196-sunday-dinner",
    claimType: "action",
    internalClaim:
      "Jamie created a template-based 2023 Artists Residency acceptance and access handoff that coordinated scheduling, pre-arrival orientation, space configuration, and independent access.",
    epistemicState: "sourced",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-GDRIVE-196-REVISION-ATTRIBUTION",
      "OBS-GDRIVE-196-SCHEDULED-ACCEPTANCE",
      "OBS-GDRIVE-196-ORIENTATION-CONFIGURATION",
      "OBS-GDRIVE-196-INDEPENDENT-ACCESS",
    ],
    projections: [
      {
        key: "case-study",
        text: "A 2023 template shows Jamie turning residency acceptance into an operational handoff: scheduled dates, a pre-arrival orientation, space configuration around the artist's needs, and independent access for collaborators.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/196-sunday-dinner"],
      },
      {
        key: "technical-operations",
        text: "Built a template-based 2023 residency onboarding and access handoff covering schedule, orientation, configuration, and independent collaborator access.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-GDRIVE-196-ACCEPTANCE-TEMPLATE-2023",
        relationship: "direct-support",
        supports: [
          "Jamie's recorded template authorship",
          "scheduled acceptance",
          "orientation and space configuration",
          "independent access handoff",
        ],
        locator: "Revision history and acceptance, orientation, and access paragraphs.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "This one template supports the workflow, not the separate 20-plus-resident scale claim.",
      "Do not identify the resident, collaborator, address, contact details, or access instructions.",
      "Do not infer participant satisfaction or completed outcomes from an acceptance message.",
    ],
    antiClaims: [
      "Every residency used this exact workflow",
      "The template proves 20-plus residencies",
      "The resident endorsed public use of the message",
      "Jamie's infrastructure created the artist's work",
    ],
    researchTaskIds: ["RT-GDRIVE-196-WORKFLOW-REUSE-CORROBORATION"],
    researchInquiryIds: ["INQ-GDRIVE-PORTFOLIO-SAMPLE-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: actionGuidanceClaimId,
    project: "fair-rent-nyc",
    claimType: "action",
    internalClaim:
      "Jamie drafted a NYC Artist Coalition communication that converted three active civic lanes into concrete audience actions and then received a distinct collaborator edit.",
    epistemicState: "sourced",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-GDRIVE-NYCAC-REVISION-ATTRIBUTION",
      "OBS-GDRIVE-NYCAC-THREE-ACTION-STRUCTURE",
      "OBS-GDRIVE-NYCAC-ACTION-PATHWAYS",
    ],
    projections: [
      {
        key: "case-study",
        text: "An October 2025 revision history attributes to Jamie a coalition draft that turned three concurrent civic lanes into clear next actions: apply or request support, contact legislators about Commercial Rent Stabilization, and use reporting and incident intake to support Talks Not Raids oversight. A collaborator later edited the draft.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-GDRIVE-NYCAC-ACTION-GUIDANCE-2025",
        relationship: "direct-support",
        supports: [
          "Jamie's reviewed working revision",
          "the three-action structure",
          "concrete audience pathways",
          "a later collaborator edit",
        ],
        locator: "Revision 16, later revision metadata, and numbered action sections.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Call it a draft and preserve the later collaborator edit as distinct work.",
      "Do not imply that the communication was sent, that every underlying statement remained current, or that any action occurred because of it.",
      "Keep raw copy, collaborator identity, internal links, and audience records private.",
    ],
    antiClaims: [
      "Jamie solely authored the final communication",
      "The draft was published or sent",
      "The draft generated applications, calls, reports, or policy outcomes",
      "Every campaign position in the draft was independently verified by this review",
    ],
    researchTaskIds: ["RT-GDRIVE-NYCAC-GUIDANCE-PUBLICATION-USE"],
    researchInquiryIds: ["INQ-GDRIVE-PORTFOLIO-SAMPLE-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: archiveWorkflowClaimId,
    project: "portfolio-system",
    claimType: "action",
    internalClaim:
      "Jamie maintained a reusable shell workflow for mixed-format project overviews with extraction, sampling, skip rules, and explicit sensitive-output warnings.",
    epistemicState: "sourced",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-GDRIVE-VACANCY-SCRIPT-ATTRIBUTION",
      "OBS-GDRIVE-VACANCY-SCRIPT-FORMAT-HANDLING",
      "OBS-GDRIVE-VACANCY-SCRIPT-SAFETY-BOUNDARY",
    ],
    projections: [
      {
        key: "technical-operations",
        text: "Maintained a reusable shell workflow that inventories mixed-format project archives, extracts PDF and tracked-document text, samples oversized CSV and JSON material, and warns when generated overviews could expose sensitive data.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"],
      },
      {
        key: "case-study",
        text: "A privacy-aware archive overview workflow supported mixed-format vacancy-data research and handoff.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-GDRIVE-VACANCY-OVERVIEW-SCRIPT-2026",
        relationship: "direct-support",
        supports: [
          "Jamie's maintenance of the stored revision",
          "mixed-format extraction and sampling behavior",
          "explicit safety warnings and skip rules",
        ],
        locator: "Drive revision metadata and script header, handlers, and safety controls.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Describe inspectable code behavior, not successful execution against every possible archive.",
      "Drive preserves one revision attributed to Jamie and no external Git authorship history.",
      "Do not publish the script, its paths, or generated archive output from this protected source.",
    ],
    antiClaims: [
      "The workflow is a production service",
      "The workflow safely handles every sensitive file",
      "The script proves analysis results from the vacancy corpus",
      "Every code path was executed during this review",
    ],
    researchTaskIds: ["RT-GDRIVE-ARCHIVE-WORKFLOW-EXECUTION"],
    researchInquiryIds: ["INQ-GDRIVE-PORTFOLIO-SAMPLE-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: styleGuideSeedClaimId,
    project: "fair-rent-nyc",
    claimType: "method",
    internalClaim:
      "Jamie initiated a teammate style-guide handoff around a collaborator-designed Small Business United identity system.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: [
      "OBS-GDRIVE-SBU-REVISION-ATTRIBUTION",
      "OBS-GDRIVE-SBU-CREDITED-HANDOFF-INTENT",
    ],
    projections: [
      {
        key: "archive-note",
        text: "Jamie opened a style-guide workflow that credited a collaborator's identity system and aimed to make cohesive teammate use possible.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-GDRIVE-SBU-STYLE-GUIDE-SEED-2026",
        relationship: "direct-support",
        supports: [
          "Jamie's seed-document authorship",
          "collaborator credit",
          "teammate documentation intent",
        ],
        locator: "Revision history and two-paragraph document body.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Keep the item dormant until a completed guide, adoption evidence, or collaborator confirmation is recovered.",
      "Credit the collaborator for the identity system and Jamie only for the documented handoff seed.",
    ],
    antiClaims: [
      "Jamie designed the Small Business United identity system",
      "Jamie completed the style guide",
      "The team adopted the guide",
      "The collaborator approved public use of the design assets",
    ],
    researchTaskIds: ["RT-GDRIVE-SBU-STYLE-GUIDE-COMPLETION"],
    researchInquiryIds: ["INQ-GDRIVE-PORTFOLIO-SAMPLE-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
] satisfies ClaimRecord[];

export const googleSharedDriveResearchTasks = [
  {
    id: "RT-GDRIVE-REMAINING-CORPUS-TRIAGE",
    project: "portfolio-system",
    question:
      "Which of the 96 accessible but unreviewed Shared Drives contain high-value professional evidence worth a bounded second-pass review?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-GDRIVE-CORPUS-INVENTORY-2026"],
    sourceIds: ["SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026"],
    claimIds: [handoffPracticeClaimId],
    successCriteria: [
      "Triage the remaining drives in privacy-first waves without placing names, IDs, URLs, memberships, or raw listings in Git.",
      "Prioritize direct role, implementation, scale, transition stewardship, collaborator credit, and public-source opportunities.",
      "Route every promoted artifact through source, observation, claim, and boundary review.",
    ],
    nextActions: [
      "Review public-facing project and organization drives before person-specific or legally sensitive spaces.",
      "Keep personal, legal, medical, family, and unrelated collaborator drives excluded unless Jamie gives a specific professional reason.",
      "Record not-reviewed separately from absent or unimportant.",
    ],
    publicNote:
      "The first pass sampled 14 of 110 accessible Shared Drives. The remaining 96 are a protected research queue, not evidence of absence.",
    owner: "Jamie Burkart / archival review",
    reviewedAt: "2026-07-14",
  },
  {
    id: "RT-GDRIVE-196-WORKFLOW-REUSE-CORROBORATION",
    project: "196-sunday-dinner",
    question:
      "Was the reviewed residency acceptance and access handoff reused beyond the one recovered 2023 instance?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-GDRIVE-196-ONBOARDING-TEMPLATE-2026"],
    sourceIds: ["SRC-GDRIVE-196-ACCEPTANCE-TEMPLATE-2023"],
    claimIds: [residencyHandoffClaimId],
    successCriteria: [
      "Recover a second dated use, version history, collaborator confirmation, or operating record showing reuse.",
      "Keep the separate 20-plus-resident scale claim on its existing evidence path.",
      "Preserve participant identity, location, contact, and access details.",
    ],
    nextActions: [
      "Search residency administration records for redacted template variants or version history.",
      "Ask a collaborator for a public-safe confirmation of reuse without requesting participant testimony.",
    ],
    publicNote:
      "One concrete handoff is established; repeated use remains an open corroboration task.",
    owner: "Jamie Burkart / archival review",
    reviewedAt: "2026-07-14",
  },
  {
    id: "RT-GDRIVE-NYCAC-GUIDANCE-PUBLICATION-USE",
    project: "fair-rent-nyc",
    question:
      "Did the October 2025 NYC Artist Coalition working draft become a sent or published communication, and is any bounded audience use recoverable?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-GDRIVE-NYCAC-ACTION-GUIDANCE-2026"],
    sourceIds: ["SRC-GDRIVE-NYCAC-ACTION-GUIDANCE-2025"],
    claimIds: [actionGuidanceClaimId],
    successCriteria: [
      "Recover a dated public or sent version and preserve the later collaborator edit.",
      "Confirm which action lanes remained in the distributed version.",
      "Treat audience response or policy effect as separate claims requiring separate evidence.",
    ],
    nextActions: [
      "Search public campaign surfaces and bounded campaign-send records for a matching version.",
      "Seek collaborator confirmation before attributing the final edit or distribution decision.",
    ],
    publicNote:
      "The working draft is established as process evidence; publication and audience use remain open.",
    owner: "Jamie Burkart / archival review",
    reviewedAt: "2026-07-14",
  },
  {
    id: "RT-GDRIVE-ARCHIVE-WORKFLOW-EXECUTION",
    project: "portfolio-system",
    question:
      "What bounded execution evidence can confirm the mixed-format archive workflow's behavior without exposing protected archive output?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-GDRIVE-VACANCY-OVERVIEW-WORKFLOW-2026"],
    sourceIds: ["SRC-GDRIVE-VACANCY-OVERVIEW-SCRIPT-2026"],
    claimIds: [archiveWorkflowClaimId],
    successCriteria: [
      "Run the workflow against a synthetic or publication-safe fixture covering representative formats.",
      "Record successes, failures, and skipped material without committing protected paths or output.",
      "Keep production-service, universal-format, and complete sensitive-data-safety claims excluded.",
    ],
    nextActions: [
      "Build a synthetic mixed-format fixture outside the protected archive.",
      "Capture a redacted execution report and add observations only for behavior actually exercised.",
    ],
    publicNote:
      "Code-path behavior is established; representative execution remains a bounded verification task.",
    owner: "Jamie Burkart / archival review",
    reviewedAt: "2026-07-14",
  },
  {
    id: "RT-GDRIVE-SUNDAY-DINNER-PHOTO-REVIEW",
    project: "196-sunday-dinner",
    question:
      "Can the eleven-image Sunday Dinner set support a public-safe visual sequence without violating participant rights, consent, privacy, or context?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-GDRIVE-SUNDAY-DINNER-PHOTO-SET-2026"],
    sourceIds: [],
    claimIds: [],
    successCriteria: [
      "A photo editor identifies a bounded visual story and records rights, consent, identification, and sensitivity status for every proposed image.",
      "Any visual inference returns to intake as a question and receives nonvisual corroboration before claim use.",
      "No address, private gathering detail, or unapproved participant identity is exposed.",
    ],
    nextActions: [
      "Prepare a claim-led editor brief from the approved 196 onboarding and continuity claims.",
      "Review images privately and request consent or omit people whose status is unclear.",
      "Create a public asset only after editorial and rights approval.",
    ],
    publicNote:
      "A protected photo set is queued for rights-aware editorial review; no image or visual proposition has been promoted.",
    owner: "Jamie Burkart / photo editor",
    reviewedAt: "2026-07-14",
  },
  {
    id: "RT-GDRIVE-WOWLIST-MEETING-HANDOFF-REVIEW",
    project: "wowlist",
    question:
      "What public-safe platform explanation, collaborator credit, and transition chronology can be recovered from the WOWList member-meeting video and later handoff records?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-GDRIVE-WOWLIST-HANDOFF-MATERIALS-2026"],
    sourceIds: [],
    claimIds: [],
    successCriteria: [
      "Transcribe and review the 2015 member meeting with speaker attribution and consent boundaries.",
      "Separate public platform history from private legal and ownership-transition records.",
      "Confirm any handoff or governance claim with collaborator-safe evidence before promotion.",
    ],
    nextActions: [
      "Privately transcribe the member-meeting video.",
      "Compare the explanation with the public code and database archive.",
      "Seek collaborator confirmation before publishing transition mechanics or testimony-like wording.",
    ],
    publicNote:
      "WOWList member-explanation and transition materials remain protected research leads, not current public proof.",
    owner: "Jamie Burkart / archival review",
    reviewedAt: "2026-07-14",
  },
  {
    id: "RT-GDRIVE-SBU-STYLE-GUIDE-COMPLETION",
    project: "fair-rent-nyc",
    question:
      "Did the collaborator-credited Small Business United style-guide seed become a completed or adopted handoff artifact?",
    priority: "low",
    status: "open",
    captureIds: ["CAP-GDRIVE-SBU-STYLE-GUIDE-SEED-2026"],
    sourceIds: ["SRC-GDRIVE-SBU-STYLE-GUIDE-SEED-2026"],
    claimIds: [styleGuideSeedClaimId],
    successCriteria: [
      "Recover a completed guide, implementation record, or collaborator confirmation.",
      "Preserve the identity designer's authorship and distinguish design from Jamie's documentation role.",
    ],
    nextActions: [
      "Search the relevant Shared Drive and public campaign surfaces for later guide versions.",
      "Ask the identity designer or project collaborators before naming or displaying design assets.",
    ],
    publicNote:
      "An early documentation seed is preserved as a candidate; completion and adoption are not yet established.",
    owner: "Jamie Burkart / archival review",
    reviewedAt: "2026-07-14",
  },
] satisfies ResearchTask[];

export const googleSharedDriveInquiries = [
  {
    id: "INQ-GDRIVE-PORTFOLIO-SAMPLE-2026",
    project: "portfolio-system",
    question:
      "What public-safe professional evidence can a bounded first-pass review of Jamie's Google Drive Shared Drives contribute to the knowledge bank?",
    methods: [
      "Listed Shared Drives through the authenticated Google Drive connector and recorded only the aggregate count.",
      "Selected 14 top-level drives for professional relevance across eight public-safe project families.",
      "Listed direct children and selected second-level anchors without retaining Drive IDs, private URLs, memberships, or raw inventories in Git.",
      "Fetched and close-read seven text artifacts and inspected four revision histories for source-level attribution.",
      "Decomposed promoted material into atomic observations and routed incomplete, visual, legal, and unreviewed material to bounded tasks or explicit exclusion.",
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The account exposed 110 accessible Shared Drives at review time; 14 received top-level review and 96 remain unreviewed.",
      "Reviewed artifacts include shared running memory, residency onboarding, multi-action public guidance, mixed-format archive tooling, a style-guide seed, public-data material, and protected visual or transition leads.",
      "Revision history directly strengthens Jamie's role in the 196 template, NYC Artist Coalition draft, archive-overview workflow, and style-guide seed while preserving later collaborator edits where present.",
      "The review earned three specific public-site additions and one broader handoff-practice projection; incomplete or sensitive material remains in the research queue.",
      "KC Town Hall transition files and personal, legal, family, or unrelated collaborator spaces were not ingested.",
    ],
    limitations: [
      "The 14-drive selection was a relevance sample, not an exhaustive review.",
      "Drive access does not establish ownership, authorship, collaborator adoption, or publication permission.",
      "Filename and folder structure alone were not promoted as proof.",
      "Video and photo contents were not interpreted without dedicated review.",
      "Not reviewed and not recovered do not mean absent.",
    ],
    sourceIds: [
      "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
      "SRC-GDRIVE-JAMIE-HANDOFF-PRACTICE-2026",
      "SRC-CRS-RUNNING-MINUTES-2026-05-15",
      "SRC-CRS-FULLER-PUBLIC-BASELINE-2026-03-27",
      "SRC-GDRIVE-196-ACCEPTANCE-TEMPLATE-2023",
      "SRC-GDRIVE-NYCAC-ACTION-GUIDANCE-2025",
      "SRC-GDRIVE-VACANCY-OVERVIEW-SCRIPT-2026",
      "SRC-GDRIVE-SBU-STYLE-GUIDE-SEED-2026",
    ],
    publicSummary:
      "A privacy-first July 2026 review sampled 14 of 110 accessible Shared Drives, close-read seven text artifacts and four revision histories, promoted bounded evidence, and preserved 96 unreviewed drives plus visual and transition material as protected research state.",
    protectedLocatorId: "RESEARCH-GDRIVE-PORTFOLIO-SAMPLE-2026-001",
  },
] satisfies ResearchInquiry[];
