import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const sharedDriveSourceRecords20260714 = [
  {
    id: "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026-07-14",
    title: "Google Drive Shared Drive inventory and selection record",
    author: "Codex archive review with Jamie Burkart",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation: "Governed inventory of Jamie Burkart's accessible Google Drive Shared Drives, July 14, 2026.",
    publicNote: "The inventory records scope and selection method without exposing private Drive names, identifiers, links, or contents.",
    supportsGenerally: [
      "110 Shared Drives were accessible in the dated inventory snapshot",
      "professionally relevant text-rich project drives were selected for close reading",
      "sensitive personal, family, legal, financial, and collaborator spaces were excluded from content ingestion"
    ],
    doesNotEstablish: [
      "that every accessible drive was close-read file by file",
      "that access grants publication permission",
      "that a drive title or file listing proves Jamie's role or a project outcome"
    ],
    protectedLocatorId: "RESEARCH-GDRIVE-SHARED-DRIVE-INVENTORY-2026"
  },
  {
    id: "SRC-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
    title: "Fair Rent NYC web launch notes",
    organization: "Fair Rent NYC / NYC Artist Coalition",
    author: "Jamie Burkart and Olympia Kazi",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2023-02-03",
    accessedAt: "2026-07-14",
    publicCitation: "Fair Rent NYC web launch notes co-maintained by Jamie Burkart and Olympia Kazi, January-February 2023.",
    publicNote: "Only a public-safe description of the launch workflow is retained; credentials, meeting links, and private operational detail remain excluded.",
    supportsGenerally: [
      "Jamie and Olympia co-maintained the campaign web launch record",
      "Jamie made revisions before and after the February 1 launch marker",
      "the runbook connected deployment and email restoration to join, letter, press-kit, social-action, and campaign-asset flows"
    ],
    doesNotEstablish: [
      "sole authorship of the campaign or website",
      "ownership of campaign strategy or outcomes",
      "permission to publish credentials, meeting links, or private administration details"
    ],
    protectedLocatorId: "ARCHIVE-GDRIVE-FAIR-RENT-WEB-NOTES-2023"
  },
  {
    id: "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026-02",
    title: "Fair Rent NYC and Commercial Rent Stabilization outreach and action tracker",
    organization: "Fair Rent NYC / NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    publishedAt: "2026-02-04",
    accessedAt: "2026-07-14",
    publicCitation: "Jamie Burkart, Fair Rent NYC and Commercial Rent Stabilization outreach and action tracker, February 2026.",
    publicNote: "The public record describes the workflow fields only. Names, contact details, relationship notes, quotes, and row-level records remain protected.",
    supportsGenerally: [
      "Jamie created and maintained the tracker",
      "the tracker connected stakeholder groupings and outreach lanes to primary asks, next actions, relationship ownership, action ownership, due dates, and status",
      "the tracker included consent-to-contact, public-quotation permission, and data-quality fields"
    ],
    doesNotEstablish: [
      "the accuracy or current status of every row",
      "permission to publish stakeholder identities, contact details, relationship notes, or quotations",
      "sole ownership of coalition outreach or relationships"
    ],
    protectedLocatorId: "ARCHIVE-GDRIVE-CRS-OUTREACH-TRACKER-2026"
  },
  {
    id: "SRC-GDRIVE-FAIR-RENT-ACTION-LAB-MINUTES-2026-02-25",
    title: "Fair Rent NYC and Action Lab alignment-call meeting minutes",
    organization: "Fair Rent NYC / Action Lab",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2026-02-25",
    accessedAt: "2026-07-14",
    publicCitation: "Jamie Burkart, Fair Rent NYC and Action Lab alignment-call meeting minutes, February 25, 2026.",
    publicNote: "The public-safe summary omits participants, private strategy, and raw discussion while preserving the meeting's operating structure.",
    supportsGenerally: [
      "Jamie facilitated and documented the alignment session",
      "the record converted discussion into action items, governance questions, and city and state coordination lanes",
      "the record included English, Spanish, Chinese, Bangla, Arabic, and Nepali sections",
      "the supporting reference-library rule limited inclusion to public-share-approved material"
    ],
    doesNotEstablish: [
      "that Jamie personally translated every language section",
      "consensus on every question or completion of every action item",
      "permission to publish participant identities, private strategy, or raw meeting notes"
    ],
    protectedLocatorId: "ARCHIVE-GDRIVE-FAIR-RENT-ACTION-LAB-MINUTES-2026"
  },
  {
    id: "SRC-GDRIVE-COMPTROLLER-DATA-BRIEF-2026-05",
    title: "Commercial Rent Stabilization: A Policy-Neutral Comptroller Data Opportunity",
    organization: "NYC Artist Coalition / Fair Rent NYC",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2026-05-18",
    accessedAt: "2026-07-14",
    publicCitation: "Jamie Burkart, Commercial Rent Stabilization: A Policy-Neutral Comptroller Data Opportunity, May 18, 2026.",
    publicNote: "The brief is an authored scoping proposal, not evidence of agency adoption, agreement, or implementation.",
    supportsGenerally: [
      "Jamie extended the commercial-data work into a policy-neutral scoping brief",
      "the brief defined a smallest serious pilot, privacy and publication safeguards, agency-coordination questions, and a staff-level next step",
      "the brief excluded raw filings, identifying information, individual leases, confidential microdata, and proprietary vendor data"
    ],
    doesNotEstablish: [
      "adoption by the Comptroller, Department of Finance, Office of Technology and Innovation, or another agency",
      "an agency meeting, commitment, released dataset, or implemented pilot",
      "official representation of any government office"
    ],
    protectedLocatorId: "ARCHIVE-GDRIVE-COMPTROLLER-DATA-BRIEF-2026"
  },
  {
    id: "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
    title: "196 Artists Residency acceptance and onboarding letter",
    organization: "196 Artists Residency",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    publishedAt: "2023-07-19",
    accessedAt: "2026-07-14",
    publicCitation: "Jamie Burkart, 196 Artists Residency acceptance and onboarding letter, July 19, 2023.",
    publicNote: "The record is summarized without identifying the resident artist or exposing contact and access details.",
    supportsGenerally: [
      "Jamie handled acceptance and pre-arrival coordination for one documented residency",
      "Jamie offered to configure the space around the artist's needs",
      "the workflow provided independent around-the-clock access for the artist and a collaborator"
    ],
    doesNotEstablish: [
      "an aggregate resident-artist count",
      "the complete residency history or every organizer's contribution",
      "permission to publish the artist's identity, contact details, dates, or access instructions"
    ],
    protectedLocatorId: "ARCHIVE-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023"
  },
  {
    id: "SRC-GDRIVE-SUNDAY-DINNER-OPERATIONS-2025-2026",
    title: "Sunday Dinner invitation and continuity workbook",
    organization: "Sunday Dinner NYC",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2025-02-28 through 2026-01-10",
    accessedAt: "2026-07-14",
    publicCitation: "Jamie Burkart, Sunday Dinner invitation and continuity workbook, revised 2025-2026.",
    publicNote: "Only the operating pattern is retained. Names, contact details, invitation histories, responses, and row-level records remain protected.",
    supportsGenerally: [
      "Jamie maintained the workbook throughout the documented revision window",
      "the workbook connected recurring event dates and themes to invitations, replies, attendance signals, and follow-up",
      "the system preserved continuity across repeated gatherings"
    ],
    doesNotEstablish: [
      "300 or more completed gatherings",
      "an uninterrupted weekly schedule",
      "permission to publish guest identities, contact details, attendance histories, or response records"
    ],
    protectedLocatorId: "ARCHIVE-GDRIVE-SUNDAY-DINNER-OPERATIONS-2025-2026"
  },
  {
    id: "SRC-GDRIVE-NYCAC-RESEARCH-DRAFT-2025",
    title: "NYC Artist Coalition public-source research draft",
    organization: "NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2025-12-20",
    accessedAt: "2026-07-14",
    publicCitation: "Jamie Burkart, NYC Artist Coalition public-source research draft, December 2025.",
    publicNote: "The draft is retained as a finding aid. Its cited public sources require individual close reading before they support claims.",
    supportsGenerally: [
      "a structured source map for coalition formation and campaign history",
      "a research queue spanning cultural-space safety, Cabaret Law repeal, nightlife governance, enforcement transparency, commercial rent, and pandemic relief"
    ],
    doesNotEstablish: [
      "independent corroboration of Jamie's role",
      "accuracy of every drafted statement or causal sequence",
      "permission to publish embedded private links or working notes"
    ],
    protectedLocatorId: "RESEARCH-GDRIVE-NYCAC-DRAFT-2025"
  },
  {
    id: "SRC-GDRIVE-VISUAL-ASSET-SAMPLE-2026-07-14",
    title: "Professionally relevant Shared Drive visual-asset sample",
    author: "Codex archive review with Jamie Burkart",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation: "Protected review of visual-only project material in Jamie Burkart's Shared Drives, July 2026.",
    publicNote: "The sample is retained as a rights-and-role research queue; no image is copied into the public repository.",
    supportsGenerally: [
      "professionally relevant drives contain photographs, video, and animation associated with prior projects",
      "visual holdings may help document public programming after rights, subject-consent, role, and caption review"
    ],
    doesNotEstablish: [
      "Jamie's role merely because an asset is stored in an accessible drive",
      "rights clearance or subject consent",
      "that a representative image directly documents a specific event or outcome"
    ],
    protectedLocatorId: "RESEARCH-GDRIVE-VISUAL-ASSET-SAMPLE-2026"
  }
] satisfies SourceRecord[];

export const sharedDriveClaimRecords20260714 = [
  {
    id: "CLM-FAIR-RENT-WEB-LAUNCH-RUNBOOK-2023",
    project: "fair-rent-nyc",
    internalClaim: "Jamie and Olympia Kazi co-maintained the Fair Rent NYC web launch record in January and February 2023, with Jamie making revisions before and after the February 1 launch marker.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Co-maintained a campaign web launch runbook connecting deployment and email restoration to join, letter, press-kit, social-action, and campaign-asset flows.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
      relationship: "private-support",
      supports: ["co-maintenance", "revision sequence", "launch workflow and dependencies"],
      locator: "revision history and January 20-February 3 launch checklist",
      publicNote: "Public-safe workflow summary only; the raw record contains protected operational details.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Credit the runbook jointly to Jamie and Olympia Kazi.",
      "Do not expose credentials, meeting links, or private administration details."
    ],
    antiClaims: [
      "Jamie alone created the Fair Rent NYC website.",
      "The runbook proves ownership of campaign strategy or outcomes."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex Google Shared Drive archive review"]
  },
  {
    id: "CLM-CRS-STAKEHOLDER-OPS-TRACKER-2026",
    project: "fair-rent-nyc",
    internalClaim: "Jamie created and maintained a privacy-aware stakeholder operations tracker for Fair Rent NYC and Commercial Rent Stabilization in February 2026.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "I created and maintained a stakeholder operations tracker connecting outreach lanes and asks to relationship ownership, action ownership, due dates, consent-to-contact, public-quotation permission, and data-quality flags.",
      status: "active",
      citationRequired: false,
      surfaces: ["/work/fair-rent-nyc"]
    }],
    evidence: [{
      sourceId: "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026-02",
      relationship: "private-support",
      supports: ["Jamie's authorship and maintenance", "workflow fields", "consent and data-quality boundaries"],
      locator: "sheet revision history and header schema",
      publicNote: "Only the workflow design is projected; row-level stakeholder data remains protected.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Do not publish names, contact details, relationship notes, quotes, row counts, or row-level records.",
      "Describe the operating system, not sole ownership of coalition relationships."
    ],
    antiClaims: [
      "Jamie owned every stakeholder relationship.",
      "Every tracker record was current or complete."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex Google Shared Drive archive review"]
  },
  {
    id: "CLM-CRS-ALIGNMENT-RECORD-2026",
    project: "fair-rent-nyc",
    internalClaim: "Jamie facilitated and documented a February 25, 2026, Fair Rent NYC and Action Lab alignment session and prepared a multilingual record with action items, governance questions, and a public-share-only reference boundary.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "I facilitated and documented a Fair Rent NYC / Action Lab alignment session, producing a multilingual record that turned discussion into action items, governance questions, and a public-share-only reference library.",
      status: "active",
      citationRequired: false,
      surfaces: ["/work/fair-rent-nyc"]
    }],
    evidence: [{
      sourceId: "SRC-GDRIVE-FAIR-RENT-ACTION-LAB-MINUTES-2026-02-25",
      relationship: "private-support",
      supports: ["facilitation", "documentation", "action and governance structure", "multilingual record", "public-share boundary"],
      locator: "title block, purpose, action items, reference-library rule, and language sections",
      publicNote: "The source is Jamie-authored meeting documentation; participant and strategy detail remains private.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Do not claim Jamie personally translated every language section.",
      "Do not treat self-authored minutes as proof of consensus or completed actions."
    ],
    antiClaims: [
      "Jamie made coalition decisions unilaterally.",
      "Every recorded action was completed."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex Google Shared Drive archive review"]
  },
  {
    id: "CLM-CRS-COMPTROLLER-SCOPING-BRIEF-2026",
    project: "fair-rent-nyc",
    internalClaim: "Jamie authored a policy-neutral scoping brief that extended the commercial-data proposal into a smallest-serious-pilot definition, privacy safeguards, agency coordination questions, and a staff-level next step.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Extended the commercial-data proposal into a policy-neutral implementation brief with a smallest-serious-pilot definition, privacy safeguards, agency-coordination questions, and a concrete next step.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-GDRIVE-COMPTROLLER-DATA-BRIEF-2026-05",
      relationship: "private-support",
      supports: ["authorship", "pilot scope", "privacy exclusions", "agency coordination questions", "proposed next step"],
      locator: "prepared-by block, smallest serious pilot, safeguards, pathways, and next-step sections",
      publicNote: "The source supports an authored proposal, not government adoption or implementation.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Keep the brief distinct from a meeting, agency commitment, adopted program, or released dataset.",
      "Do not imply official representation of a government office."
    ],
    antiClaims: [
      "The Comptroller adopted Jamie's proposal.",
      "A city agency agreed to or implemented the pilot."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex Google Shared Drive archive review"]
  },
  {
    id: "CLM-196-RESIDENCY-ONBOARDING-2023",
    project: "196-sunday-dinner",
    internalClaim: "For one documented 2023 residency, Jamie handled acceptance, pre-arrival coordination, space configuration, and independent access for the artist and a collaborator.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "For resident artists, I handled acceptance, pre-arrival coordination, space configuration, and independent access.",
      status: "active",
      citationRequired: false,
      surfaces: ["/work/196-sunday-dinner"]
    }],
    evidence: [{
      sourceId: "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
      relationship: "private-support",
      supports: ["acceptance", "pre-arrival coordination", "space configuration", "independent access"],
      locator: "acceptance, planning-call, space-configuration, and access sections",
      publicNote: "The public wording generalizes one documented workflow without identifying the resident artist.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The source documents one residency workflow, not the aggregate resident-artist count.",
      "Do not expose the artist's identity, contact details, dates, or access instructions."
    ],
    antiClaims: [
      "This source proves 20 or more resident artists.",
      "Jamie was the only person supporting the residency."
    ],
    researchInquiryIds: ["INQ-GDRIVE-QUANTIFIED-PARTICIPATION-CLAIMS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex Google Shared Drive archive review"]
  },
  {
    id: "CLM-SUNDAY-DINNER-CONTINUITY-SYSTEM-2025",
    project: "196-sunday-dinner",
    internalClaim: "Jamie maintained a Sunday Dinner invitation and continuity workbook from February 2025 through January 2026, connecting recurring event dates and themes to invitations, replies, attendance signals, and follow-up.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "For recurring dinners, I maintained an invitation and continuity system connecting event dates and themes to invitations, replies, attendance signals, and follow-up.",
      status: "active",
      citationRequired: false,
      surfaces: ["/work/196-sunday-dinner"]
    }],
    evidence: [{
      sourceId: "SRC-GDRIVE-SUNDAY-DINNER-OPERATIONS-2025-2026",
      relationship: "private-support",
      supports: ["Jamie's maintenance role", "event-by-event invitations", "response and attendance signals", "follow-up structure"],
      locator: "revision history, event columns, and invitation-response summary fields",
      publicNote: "Only the workflow design is projected; all guest and row-level data remains protected.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Do not expose names, contact details, invitation histories, attendance signals, or response records.",
      "The workbook does not independently verify 300 or more completed gatherings."
    ],
    antiClaims: [
      "The workbook is a public attendance database.",
      "The revision window proves uninterrupted weekly events."
    ],
    researchInquiryIds: ["INQ-GDRIVE-QUANTIFIED-PARTICIPATION-CLAIMS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex Google Shared Drive archive review"]
  }
] satisfies ClaimRecord[];

export const sharedDriveResearchInquiries20260714 = [
  {
    id: "INQ-GDRIVE-PROFESSIONAL-COVERAGE-2026",
    project: "knowledge-bank",
    question: "What professionally relevant, public-safe evidence can be recovered from Jamie's accessible Google Drive Shared Drives without treating access as permission or inventory as proof?",
    methods: [
      "Inventoried all accessible Shared Drives in the dated account snapshot.",
      "Selected professionally relevant project drives using project history, portfolio coverage, text richness, and likely evidentiary value.",
      "Close-read document text, spreadsheet schemas, and revision histories for selected records.",
      "Excluded sensitive personal, family, legal, financial, credential-bearing, and collaborator-private material from ingestion."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The snapshot contained 110 accessible Shared Drives.",
      "Close reading recovered direct operating evidence for campaign launch coordination, consent-aware stakeholder operations, multilingual meeting documentation, policy scoping, residency onboarding, and recurring-event continuity.",
      "Professionally relevant research drafts and visual-only holdings were preserved as future research queues rather than promoted to public claims."
    ],
    limitations: [
      "The pass did not close-read every file in every accessible drive.",
      "Drive access does not establish publication rights, authorship, consent, role, or project outcomes.",
      "The accessible drive count and contents are a dated snapshot and may change."
    ],
    sourceIds: [
      "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026-07-14",
      "SRC-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
      "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026-02",
      "SRC-GDRIVE-FAIR-RENT-ACTION-LAB-MINUTES-2026-02-25",
      "SRC-GDRIVE-COMPTROLLER-DATA-BRIEF-2026-05",
      "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
      "SRC-GDRIVE-SUNDAY-DINNER-OPERATIONS-2025-2026"
    ],
    publicSummary: "A governed inventory of 110 accessible Shared Drives led to selective close reading of professionally relevant records while sensitive and rights-unclear material remained protected.",
    protectedLocatorId: "RESEARCH-GDRIVE-PROFESSIONAL-COVERAGE-2026"
  },
  {
    id: "INQ-GDRIVE-NYCAC-SOURCE-DECOMPOSITION-2026",
    project: "nyc-artist-coalition",
    question: "Which public sources cited in the NYC Artist Coalition research draft can independently support atomic role, sequence, or outcome claims?",
    methods: [
      "Close-read the draft's structure and source map.",
      "Classified the draft as a finding aid rather than independent corroboration.",
      "Queued cited public sources for individual close reading and source normalization."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The draft organizes a substantial public-source research queue across coalition formation and several campaigns.",
      "The draft itself is not independent evidence of Jamie's role, causality, or campaign outcomes."
    ],
    limitations: [
      "Individual cited sources were not all decomposed during this pass.",
      "Draft prose and embedded links may include working context that is not approved for publication."
    ],
    sourceIds: ["SRC-GDRIVE-NYCAC-RESEARCH-DRAFT-2025"],
    publicSummary: "A private coalition-history draft was retained as a source-discovery map, not promoted as corroborating evidence.",
    protectedLocatorId: "RESEARCH-GDRIVE-NYCAC-SOURCE-DECOMPOSITION-2026"
  },
  {
    id: "INQ-GDRIVE-VISUAL-ASSET-RIGHTS-2026",
    project: "knowledge-bank",
    question: "Which Shared Drive photographs, videos, and animations can document Jamie's work after rights, consent, role, and caption review?",
    methods: [
      "Reviewed professionally relevant visual-only drive listings and representative metadata.",
      "Separated asset discovery from role evidence and publication clearance.",
      "Created a protected research queue without copying visual assets into the repository."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "Several project drives contain potentially useful photographs, video, and animation.",
      "No visual asset was selected for public projection during this pass."
    ],
    limitations: [
      "Storage in an accessible drive does not establish Jamie's role, image ownership, subject consent, or publication rights.",
      "Representative imagery cannot substitute for direct evidence of a specific event or outcome."
    ],
    sourceIds: ["SRC-GDRIVE-VISUAL-ASSET-SAMPLE-2026-07-14"],
    publicSummary: "Professionally relevant visual holdings remain in a protected rights-and-role review queue.",
    protectedLocatorId: "RESEARCH-GDRIVE-VISUAL-ASSET-RIGHTS-2026"
  },
  {
    id: "INQ-GDRIVE-QUANTIFIED-PARTICIPATION-CLAIMS-2026",
    project: "196-sunday-dinner",
    question: "Can primary records independently verify the portfolio's aggregate claims of 300 or more gatherings and 20 or more resident artists?",
    methods: [
      "Close-read one residency acceptance record and its revision history.",
      "Reviewed the structure and revision history of the Sunday Dinner invitation and continuity workbook.",
      "Separated direct workflow evidence from aggregate-count evidence."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The reviewed records directly support residency onboarding and recurring-event operations.",
      "The reviewed records do not independently establish the published aggregate counts."
    ],
    limitations: [
      "One residency letter cannot establish the complete residency count.",
      "A workbook structure and revision history cannot establish that every listed gathering occurred."
    ],
    sourceIds: [
      "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
      "SRC-GDRIVE-SUNDAY-DINNER-OPERATIONS-2025-2026"
    ],
    publicSummary: "Direct operating records support the participation workflows, while aggregate gathering and residency counts still require separate verification.",
    protectedLocatorId: "RESEARCH-GDRIVE-QUANTIFIED-PARTICIPATION-CLAIMS-2026"
  }
] satisfies ResearchInquiry[];

export const sharedDriveIntakeRecords20260714 = [
  {
    id: "INTAKE-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    capturedAt: "2026-07-14",
    capturedBy: "Jamie Burkart and Codex Google Shared Drive archive review",
    kind: "research-lead",
    title: "Google Drive Shared Drive inventory and selection record",
    publicSafeSummary: "A dated inventory found 110 accessible Shared Drives and selected professionally relevant text-rich records for bounded close reading.",
    whyItMatters: "Makes research coverage and exclusions explicit without confusing access, inventory, evidence, or publication permission.",
    projectHints: ["knowledge-bank"],
    maturity: "source-reviewed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "research-inquiry-created",
    sourceIds: ["SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026-07-14"],
    claimIds: [],
    inquiryIds: ["INQ-GDRIVE-PROFESSIONAL-COVERAGE-2026"],
    limitations: ["The inventory is a dated access snapshot, not a file-by-file review or publication grant."],
    nextActions: ["Revisit high-value drives selectively as portfolio questions and evidence gaps develop."]
  },
  {
    id: "INTAKE-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
    capturedAt: "2026-07-14",
    capturedBy: "Jamie Burkart and Codex Google Shared Drive archive review",
    kind: "artifact-lead",
    title: "Fair Rent NYC web launch notes",
    publicSafeSummary: "A co-maintained launch record connected web deployment and email restoration to campaign join, letter, press-kit, social-action, and asset flows.",
    whyItMatters: "Adds direct revision-backed evidence of Jamie's campaign web operations while preserving Olympia Kazi's contribution.",
    projectHints: ["fair-rent-nyc", "nyc-artist-coalition"],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-GDRIVE-FAIR-RENT-WEB-NOTES-2023"],
    claimIds: ["CLM-FAIR-RENT-WEB-LAUNCH-RUNBOOK-2023"],
    inquiryIds: [],
    limitations: ["Credentials, meeting links, and private operational detail were excluded from ingestion."],
    nextActions: ["Seek collaborator review before selecting a public projection of the co-maintained runbook."]
  },
  {
    id: "INTAKE-GDRIVE-CRS-OUTREACH-TRACKER-2026",
    capturedAt: "2026-07-14",
    capturedBy: "Jamie Burkart and Codex Google Shared Drive archive review",
    kind: "artifact-lead",
    title: "Commercial Rent Stabilization stakeholder operations tracker",
    publicSafeSummary: "A Jamie-maintained tracker connected outreach, asks, owners, due dates, consent, public-quotation permission, and data-quality flags.",
    whyItMatters: "Provides unusually concrete product-operations proof while keeping the stakeholder roster fully protected.",
    projectHints: ["fair-rent-nyc", "commercial-rent-stabilization"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "selected",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026-02"],
    claimIds: ["CLM-CRS-STAKEHOLDER-OPS-TRACKER-2026"],
    inquiryIds: [],
    limitations: ["No names, contact details, row counts, quotes, relationship notes, or row-level data may be projected."],
    nextActions: ["Keep the case-study sentence focused on the workflow design and privacy controls."]
  },
  {
    id: "INTAKE-GDRIVE-FAIR-RENT-ACTION-LAB-MINUTES-2026",
    capturedAt: "2026-07-14",
    capturedBy: "Jamie Burkart and Codex Google Shared Drive archive review",
    kind: "artifact-lead",
    title: "Fair Rent NYC and Action Lab multilingual alignment record",
    publicSafeSummary: "Jamie's meeting record connected facilitation and documentation to action items, governance questions, language access, and a public-share-only reference boundary.",
    whyItMatters: "Shows meeting facilitation becoming durable, accessible operating structure rather than disappearing into private notes.",
    projectHints: ["fair-rent-nyc", "commercial-rent-stabilization"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "selected",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-GDRIVE-FAIR-RENT-ACTION-LAB-MINUTES-2026-02-25"],
    claimIds: ["CLM-CRS-ALIGNMENT-RECORD-2026"],
    inquiryIds: [],
    limitations: ["Do not expose participants or strategy, imply consensus, or claim Jamie personally translated every section."],
    nextActions: ["Retain the concise operating-result sentence on the case study."]
  },
  {
    id: "INTAKE-GDRIVE-COMPTROLLER-DATA-BRIEF-2026",
    capturedAt: "2026-07-14",
    capturedBy: "Jamie Burkart and Codex Google Shared Drive archive review",
    kind: "artifact-lead",
    title: "Policy-neutral Comptroller data opportunity brief",
    publicSafeSummary: "Jamie's authored brief translated a broad open-data opportunity into a bounded pilot, safeguards, coordination questions, and a proposed next step.",
    whyItMatters: "Deepens evidence of policy-to-implementation translation while keeping an authored proposal distinct from agency adoption.",
    projectHints: ["fair-rent-nyc", "commercial-rent-stabilization", "open-data"],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-GDRIVE-COMPTROLLER-DATA-BRIEF-2026-05"],
    claimIds: ["CLM-CRS-COMPTROLLER-SCOPING-BRIEF-2026"],
    inquiryIds: [],
    limitations: ["The brief does not establish an agency meeting, agreement, adoption, implementation, or released dataset."],
    nextActions: ["Retain as portfolio depth unless a future application specifically benefits from the implementation-scoping detail."]
  },
  {
    id: "INTAKE-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
    capturedAt: "2026-07-14",
    capturedBy: "Jamie Burkart and Codex Google Shared Drive archive review",
    kind: "artifact-lead",
    title: "196 Artists Residency acceptance and onboarding workflow",
    publicSafeSummary: "A Jamie-authored acceptance letter documents pre-arrival coordination, space configuration, and independent access for one residency.",
    whyItMatters: "Turns a broad artist-support claim into concrete onboarding and operational work without identifying the artist.",
    projectHints: ["196-sunday-dinner", "artists-residency"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "selected",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023"],
    claimIds: ["CLM-196-RESIDENCY-ONBOARDING-2023"],
    inquiryIds: ["INQ-GDRIVE-QUANTIFIED-PARTICIPATION-CLAIMS-2026"],
    limitations: ["The source documents one workflow and does not establish an aggregate residency count."],
    nextActions: ["Preserve the public wording as a workflow claim and research aggregate counts separately."]
  },
  {
    id: "INTAKE-GDRIVE-SUNDAY-DINNER-OPERATIONS-2025",
    capturedAt: "2026-07-14",
    capturedBy: "Jamie Burkart and Codex Google Shared Drive archive review",
    kind: "artifact-lead",
    title: "Sunday Dinner invitation and continuity workbook",
    publicSafeSummary: "A Jamie-maintained workbook connected recurring event dates and themes to invitations, responses, attendance signals, and follow-up.",
    whyItMatters: "Makes the continuity work behind recurring gatherings legible while keeping every guest record protected.",
    projectHints: ["196-sunday-dinner", "sunday-dinner"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "selected",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-GDRIVE-SUNDAY-DINNER-OPERATIONS-2025-2026"],
    claimIds: ["CLM-SUNDAY-DINNER-CONTINUITY-SYSTEM-2025"],
    inquiryIds: ["INQ-GDRIVE-QUANTIFIED-PARTICIPATION-CLAIMS-2026"],
    limitations: ["No guest data or row-level records may be published; the workbook does not independently verify aggregate counts."],
    nextActions: ["Use the direct workflow claim publicly and keep the aggregate-count inquiry open."]
  },
  {
    id: "INTAKE-GDRIVE-NYCAC-RESEARCH-DRAFT-2025",
    capturedAt: "2026-07-14",
    capturedBy: "Jamie Burkart and Codex Google Shared Drive archive review",
    kind: "research-lead",
    title: "NYC Artist Coalition public-source research draft",
    publicSafeSummary: "A private draft organizes a substantial public-source research queue across coalition formation and campaign history.",
    whyItMatters: "Preserves future source-discovery value without allowing a self-authored synthesis to become independent proof.",
    projectHints: ["nyc-artist-coalition", "knowledge-bank"],
    maturity: "source-reviewed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "research-inquiry-created",
    sourceIds: ["SRC-GDRIVE-NYCAC-RESEARCH-DRAFT-2025"],
    claimIds: [],
    inquiryIds: ["INQ-GDRIVE-NYCAC-SOURCE-DECOMPOSITION-2026"],
    limitations: ["The draft is a finding aid, not independent corroboration of role, causality, or outcomes."],
    nextActions: ["Close-read and normalize cited public sources selectively against current portfolio evidence gaps."]
  },
  {
    id: "INTAKE-GDRIVE-VISUAL-ASSET-SAMPLE-2026",
    capturedAt: "2026-07-14",
    capturedBy: "Jamie Burkart and Codex Google Shared Drive archive review",
    kind: "artifact-lead",
    title: "Shared Drive visual-asset rights and role queue",
    publicSafeSummary: "Professionally relevant project drives contain visual material that may become useful after role, rights, consent, and caption review.",
    whyItMatters: "Keeps potentially valuable visual evidence in the process without treating storage access as role proof or publication permission.",
    projectHints: ["knowledge-bank", "photo-archive"],
    maturity: "source-reviewed",
    publicUse: "approval-required",
    editorialState: "unsurfaced",
    disposition: "held-protected",
    sourceIds: ["SRC-GDRIVE-VISUAL-ASSET-SAMPLE-2026-07-14"],
    claimIds: [],
    inquiryIds: ["INQ-GDRIVE-VISUAL-ASSET-RIGHTS-2026"],
    limitations: ["No image is cleared, copied, or projected by this intake record."],
    nextActions: ["Review promising assets individually for authorship, rights, consent, directness, caption, and public purpose."]
  }
] satisfies IntakeRecord[];
