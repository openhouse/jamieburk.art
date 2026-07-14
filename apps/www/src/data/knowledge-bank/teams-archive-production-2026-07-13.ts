import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const teamsArchiveEntities = [
  {
    id: "ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE",
    kind: "program",
    label: "Source-backed knowledge practice",
    publicSafeSummary: "Jamie's practice of preserving project sources, decisions, open questions, and operating context in reviewable, human-correctable knowledge systems.",
    aliases: ["Source-Backed Team Memory", "Noting.us"],
    projectKey: "source-backed-knowledge-practice",
    relatedEntityIds: ["ENT-FAIR-RENT-NYC"],
    status: "active"
  }
] satisfies EntityRecord[];

export const teamsArchiveIntake = [
  {
    id: "INTAKE-TEAMS-ICLOUD-HANDOFF-PRACTICE-2026",
    receivedAt: "2026-07-13",
    kind: "public-memory",
    publicSafeSummary: "Jamie reports keeping active project folders in iCloud so work can move with him between phone and laptop; archive inspection can establish structure but not device-use frequency.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "claim-seed-created",
    sourceIds: [],
    claimIds: ["CLM-CROSS-PROJECT-ARCHIVE-PRACTICE-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-TEAMS-PROJECT-HISTORY-OVERVIEW-2026",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private project-history overview documenting a generated directory tree and content representation across 15 named project collections.",
    submittedBy: "Codex private-archive review",
    entityIds: ["ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "source-created",
    sourceIds: ["SRC-TEAMS-PROJECT-HISTORY-OVERVIEW-2026"],
    claimIds: ["CLM-CROSS-PROJECT-ARCHIVE-PRACTICE-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-TEAMS-CRS-ACTION-PLAN-2026",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private April 2026 action plan defining a bounded operating role and shared public goods for Commercial Rent Stabilization collaboration.",
    submittedBy: "Codex private-archive review",
    entityIds: ["ENT-FAIR-RENT-NYC", "ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "source-created",
    sourceIds: ["SRC-TEAMS-CRS-ACTION-PLAN-2026"],
    claimIds: ["CLM-CRS-SHARED-OPERATING-MEMORY-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-TEAMS-CRS-RUNNING-MINUTES-2026",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private April 2026 running minutes documenting an active shared-memory system for decisions, actions, open questions, campaign language, and consent-aware information stewardship.",
    submittedBy: "Codex private-archive review",
    entityIds: ["ENT-FAIR-RENT-NYC", "ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "source-created",
    sourceIds: ["SRC-TEAMS-CRS-RUNNING-MINUTES-2026"],
    claimIds: ["CLM-CRS-SHARED-OPERATING-MEMORY-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-TEAMS-CRS-PROVENANCE-REDLINE-2026",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private May 2026 legislative provenance redline prepared by Jamie to make multiple Commercial Rent Stabilization source layers inspectable.",
    submittedBy: "Codex private-archive review",
    entityIds: ["ENT-FAIR-RENT-NYC", "ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "source-created",
    sourceIds: ["SRC-TEAMS-CRS-PROVENANCE-REDLINE-2026"],
    claimIds: ["CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private June 2026 proposal translating Jamie's source-backed memory method into a bounded discovery and prototype sprint with explicit privacy and human-review limits.",
    submittedBy: "Codex private-archive review",
    entityIds: ["ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "source-created",
    sourceIds: ["SRC-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026"],
    claimIds: ["CLM-SOURCE-BACKED-MEMORY-PILOT-DESIGN-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  }
] satisfies IntakeRecord[];

export const teamsArchiveSources = [
  {
    id: "SRC-TEAMS-PROJECT-HISTORY-OVERVIEW-2026",
    title: "Generated project-history archive overview",
    organization: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-02-01",
    publicCitation: "Private generated overview of Jamie Burkart's project-history archive, February 2026.",
    publicNote: "The overview documents a structured archive snapshot without exposing the underlying private files.",
    intakeIds: ["INTAKE-TEAMS-PROJECT-HISTORY-OVERVIEW-2026"],
    supportsGenerally: ["a generated archive overview", "15 named project collections", "directory-tree and content-representation layers"],
    doesNotEstablish: ["the truth of every underlying project claim", "Jamie's sole ownership of collective work", "archive completeness after the snapshot date", "how often work moved between devices"],
    protectedLocatorId: "ARCHIVE-TEAMS-PROJECT-HISTORY-OVERVIEW-2026-001"
  },
  {
    id: "SRC-TEAMS-CRS-ACTION-PLAN-2026",
    title: "Commercial Rent Stabilization 90-day action plan",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-04-06",
    publicCitation: "Jamie Burkart, private Commercial Rent Stabilization action plan, April 2026.",
    publicNote: "The plan defines a bounded operational role and a sequence of shared infrastructure deliverables; it records intent rather than completion.",
    intakeIds: ["INTAKE-TEAMS-CRS-ACTION-PLAN-2026"],
    supportsGenerally: ["Jamie's operating-model design", "six shared public goods", "explicit collective-role boundaries", "implementation sequencing"],
    doesNotEstablish: ["collective adoption of every proposal", "completion of every planned deliverable", "sole campaign leadership", "policy outcomes"],
    protectedLocatorId: "ARCHIVE-TEAMS-CRS-ACTION-PLAN-2026-001"
  },
  {
    id: "SRC-TEAMS-CRS-RUNNING-MINUTES-2026",
    title: "Commercial Rent Stabilization collaboration running minutes",
    organization: "Commercial Rent Stabilization collaboration",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-04-29",
    publicCitation: "Private Commercial Rent Stabilization collaboration running minutes, April 2026.",
    publicNote: "The source records the system as started and in use, with Jamie responsible for keeping the shared record current and lightweight.",
    intakeIds: ["INTAKE-TEAMS-CRS-RUNNING-MINUTES-2026"],
    supportsGenerally: ["an active shared-memory system", "Jamie's maintenance responsibility", "decision and action tracking", "privacy and consent guardrails"],
    doesNotEstablish: ["Jamie's authorship of every meeting contribution", "sole ownership of coalition decisions", "universal adoption beyond the documented collaboration", "measured campaign outcomes"],
    protectedLocatorId: "ARCHIVE-TEAMS-CRS-RUNNING-MINUTES-2026-001"
  },
  {
    id: "SRC-TEAMS-CRS-PROVENANCE-REDLINE-2026",
    title: "Commercial Rent Stabilization legislative provenance redline",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-05-16",
    publicCitation: "Jamie Burkart, private Commercial Rent Stabilization legislative provenance redline, May 2026.",
    publicNote: "The redline uses tracked source layers to make legislative inheritance inspectable while separating provenance labels from individual drafting credit.",
    intakeIds: ["INTAKE-TEAMS-CRS-PROVENANCE-REDLINE-2026"],
    supportsGenerally: ["Jamie prepared the provenance redline", "multiple legislative source layers", "tracked-change provenance method", "explicit authorship boundary"],
    doesNotEstablish: ["Jamie's authorship of the underlying legislative language", "legal review or endorsement", "policy adoption", "a complete account of every contributor"],
    protectedLocatorId: "ARCHIVE-TEAMS-CRS-PROVENANCE-REDLINE-2026-001"
  },
  {
    id: "SRC-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026",
    title: "Source-backed team-memory pilot proposal",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-06-26",
    publicCitation: "Jamie Burkart, private source-backed team-memory pilot proposal, June 2026.",
    publicNote: "The source documents a bounded service and prototype design without identifying the prospective client or disclosing private commercial terms.",
    intakeIds: ["INTAKE-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026"],
    supportsGenerally: ["a bounded discovery and prototype sprint", "source mapping and prototype deliverables", "human review", "privacy, access, and retention boundaries"],
    doesNotEstablish: ["acceptance of the proposal", "delivery of a client engagement", "a production software product", "customer outcomes"],
    protectedLocatorId: "ARCHIVE-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026-001"
  }
] satisfies SourceRecord[];

export const teamsArchiveReadings = [
  {
    id: "READ-TEAMS-PROJECT-HISTORY-OVERVIEW-2026",
    sourceId: "SRC-TEAMS-PROJECT-HISTORY-OVERVIEW-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-TEAMS-ARCHIVE-FIFTEEN-COLLECTIONS", text: "The February 2026 archive snapshot organizes 15 named project collections under a dedicated project-history structure.", relationToJamie: "direct-role", supportTags: ["cross-project-archive-structure"], confidence: "high", locator: "Directory structure and project-collection list" },
      { id: "PROP-TEAMS-ARCHIVE-GENERATED-OVERVIEW", text: "The generated overview combines a directory tree with a file-by-file content representation intended to make the archive inspectable.", relationToJamie: "direct-role", supportTags: ["cross-project-archive-generated-overview"], confidence: "high", locator: "Overview introduction and content-dump headings" }
    ],
    limitations: ["Folder presence does not prove Jamie's role, authorship, or impact within every project.", "The snapshot does not independently establish cross-device use or archive completeness after February 2026."],
    researchTaskIds: []
  },
  {
    id: "READ-TEAMS-CRS-ACTION-PLAN-2026",
    sourceId: "SRC-TEAMS-CRS-ACTION-PLAN-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-TEAMS-CRS-OPERATING-MODEL", text: "Jamie defined his role around creating a small set of shared public goods rather than acting as the whole movement or sole organizer.", relationToJamie: "direct-role", supportTags: ["crs-operating-model-design", "crs-collective-role-boundary"], confidence: "high", locator: "Core role" },
      { id: "PROP-TEAMS-CRS-SHARED-PUBLIC-GOODS", text: "The plan specifies a clear front door, recurring room, shared public line, stewarded story bank, implementation-readiness packet, and durable source-of-truth spine.", relationToJamie: "direct-role", supportTags: ["crs-shared-public-goods-design"], confidence: "high", locator: "Core role and non-negotiable deliverables" },
      { id: "PROP-TEAMS-CRS-IMPLEMENTATION-SEQUENCE", text: "The plan sequences concrete deliverables across immediate, 30-day, and later phases and defines a success condition for each major workstream.", relationToJamie: "direct-role", supportTags: ["crs-implementation-sequencing"], confidence: "high", locator: "Priority order and phased plan" }
    ],
    limitations: ["A self-authored plan demonstrates Jamie's analysis and intended implementation, not collective approval or completed delivery.", "The source does not establish policy impact, campaign growth, or completion of every workstream."],
    researchTaskIds: []
  },
  {
    id: "READ-TEAMS-CRS-RUNNING-MINUTES-2026",
    sourceId: "SRC-TEAMS-CRS-RUNNING-MINUTES-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-TEAMS-CRS-RUNNING-MINUTES-PURPOSE", text: "The running minutes define a shared, readable system for meetings, decisions, open questions, actions, and campaign memory.", relationToJamie: "collective-role", supportTags: ["crs-shared-memory-purpose"], confidence: "high", locator: "Purpose and table of contents" },
      { id: "PROP-TEAMS-CRS-RUNNING-MINUTES-ACTIVE", text: "The live action list assigns Jamie to keep the running minutes current and marks the system as started and in use.", relationToJamie: "direct-role", supportTags: ["crs-running-minutes-active-use"], confidence: "high", locator: "Live action list" },
      { id: "PROP-TEAMS-CRS-MEMORY-GUARDRAILS", text: "The system instructs collaborators to keep sensitive details out, mark story-consent levels, and retain detailed source material outside the running record.", relationToJamie: "direct-role", supportTags: ["crs-memory-privacy-guardrails"], confidence: "high", locator: "How to use this document" },
      { id: "PROP-TEAMS-CRS-OPERATING-CATEGORIES", text: "The record separates shared language, actions, open questions, city and state lanes, coalition structure, signup stewardship, story leads, and meeting notes.", relationToJamie: "direct-role", supportTags: ["crs-operating-information-architecture"], confidence: "high", locator: "Table of contents and current sections" }
    ],
    limitations: ["The source preserves collective discussions and must not turn every contribution into Jamie's individual authorship.", "Started and in use does not establish universal adoption, long-term maintenance, or measured campaign outcomes."],
    researchTaskIds: []
  },
  {
    id: "READ-TEAMS-CRS-PROVENANCE-REDLINE-2026",
    sourceId: "SRC-TEAMS-CRS-PROVENANCE-REDLINE-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-TEAMS-CRS-PROVENANCE-PREPARED", text: "The document identifies Jamie as the preparer of the legislative provenance redline and dates the reviewed version to May 16, 2026.", relationToJamie: "direct-role", supportTags: ["crs-legislative-provenance-prepared-by-jamie"], confidence: "high", locator: "Title and preparation line" },
      { id: "PROP-TEAMS-CRS-PROVENANCE-LAYERS", text: "The redline preserves source layers from a City Council bill, 2022 campaign recommendations, a 2019 legislative lineage, and 2025 Albany revisions.", relationToJamie: "direct-role", supportTags: ["crs-legislative-source-layering"], confidence: "high", locator: "How to read this document" },
      { id: "PROP-TEAMS-CRS-PROVENANCE-METHOD", text: "Tracked changes are used to make policy inheritance visible, and accepting all changes produces the reviewed Albany bill text.", relationToJamie: "direct-role", supportTags: ["crs-legislative-provenance-method"], confidence: "high", locator: "How to read this document" },
      { id: "PROP-TEAMS-CRS-PROVENANCE-AUTHORSHIP-BOUNDARY", text: "The document states that reviewer names identify source layers rather than individual drafting authorship.", relationToJamie: "limitation", supportTags: ["crs-legislative-attribution-boundary"], confidence: "high", locator: "How to read this document" }
    ],
    limitations: ["The redline is an archival and analytical artifact, not a legal opinion or an official legislative history.", "Preparing the redline does not make Jamie the author of language attributed to campaign counsel, prior bills, or legislative staff."],
    researchTaskIds: []
  },
  {
    id: "READ-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026",
    sourceId: "SRC-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-TEAMS-PILOT-BOUNDED-LOOP", text: "Jamie designed a bounded source-to-memory pilot beginning with one use case and one approved non-sensitive or synthetic source bundle.", relationToJamie: "direct-role", supportTags: ["source-backed-pilot-bounded-loop"], confidence: "high", locator: "Proposed first engagement" },
      { id: "PROP-TEAMS-PILOT-DELIVERABLES", text: "The proposed workflow includes a working session and source map, a small memory prototype, reusable templates, onboarding context, privacy notes, and a continue-revise-stop recommendation.", relationToJamie: "direct-role", supportTags: ["source-backed-pilot-deliverable-design"], confidence: "high", locator: "What we would do and likely deliverables" },
      { id: "PROP-TEAMS-PILOT-HUMAN-REVIEW", text: "The design keeps AI in a drafting role while humans review and the shared record remains inspectable and correctable.", relationToJamie: "direct-role", supportTags: ["source-backed-pilot-human-review"], confidence: "high", locator: "Bounded source-to-memory loop" },
      { id: "PROP-TEAMS-PILOT-PRIVACY-BOUNDARY", text: "The proposal rejects broad ingestion before access, confidentiality, intellectual-property, privacy, and retention conditions are agreed.", relationToJamie: "direct-role", supportTags: ["source-backed-pilot-privacy-boundary"], confidence: "high", locator: "Boundaries and next step" },
      { id: "PROP-TEAMS-PILOT-EARLY-PROTOTYPE", text: "The proposal describes the related software prototype as early and local-first rather than production software.", relationToJamie: "limitation", supportTags: ["source-backed-pilot-product-maturity-boundary"], confidence: "high", locator: "Prototype description" }
    ],
    limitations: ["A proposal establishes service design, not prospective-client acceptance, completed delivery, or customer outcomes.", "The source does not establish a production software product or autonomous AI authority."],
    researchTaskIds: []
  }
] satisfies SourceReading[];

export const teamsArchiveClaims = [
  {
    id: "CLM-CROSS-PROJECT-ARCHIVE-PRACTICE-2026",
    project: "source-backed-knowledge-practice",
    internalClaim: "By February 2026, Jamie maintained a structured archive of 15 named project collections and a generated overview combining a directory tree with file-by-file content representation.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-TEAMS-ICLOUD-HANDOFF-PRACTICE-2026", "INTAKE-TEAMS-PROJECT-HISTORY-OVERVIEW-2026"],
    requiredSupportTags: ["cross-project-archive-structure", "cross-project-archive-generated-overview"],
    composition: {
      action: "Maintained a structured cross-project archive and generated an inspectable project-history overview.",
      intendedEnd: "Preserve project evidence and make long-running work easier to review, resume, and hand off.",
      usableResult: "A February 2026 snapshot organizing 15 named project collections through directory and file-content layers.",
      audience: "Jamie and future collaborators reviewing or resuming project history.",
      collectiveCredit: "The archive preserves records of collective projects; organizing those records does not convert collaborators' work into Jamie's sole credit.",
      causalBoundary: "The source establishes archive structure and overview generation, not every underlying accomplishment or the frequency of cross-device use."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-TEAMS-PROJECT-HISTORY-OVERVIEW-2026", relationship: "private-support", supports: ["15 project collections", "generated directory and content overview"], propositionIds: ["PROP-TEAMS-ARCHIVE-FIFTEEN-COLLECTIONS", "PROP-TEAMS-ARCHIVE-GENERATED-OVERVIEW"], confidence: "high", renderCitation: false }],
    boundaries: ["Use the February 2026 date with the collection count.", "Treat cross-device purpose as Jamie's first-party account rather than an independently measured workflow."],
    antiClaims: ["Every archived project claim has been verified.", "Jamie solely created every project represented in the archive.", "The snapshot proves current archive completeness or device-use frequency."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart memory intake", "Codex private-archive review"]
  },
  {
    id: "CLM-CRS-SHARED-OPERATING-MEMORY-2026",
    project: "fair-rent-nyc",
    internalClaim: "In April 2026, Jamie designed a bounded operating model for Commercial Rent Stabilization collaboration and implemented an active shared-memory structure for decisions, actions, open questions, campaign language, and consent-aware information stewardship.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-TEAMS-CRS-ACTION-PLAN-2026", "INTAKE-TEAMS-CRS-RUNNING-MINUTES-2026"],
    requiredSupportTags: ["crs-operating-model-design", "crs-running-minutes-active-use", "crs-memory-privacy-guardrails"],
    composition: {
      action: "Designed a coalition operating model and implemented a lightweight shared-memory system.",
      intendedEnd: "Reduce fragmentation while preserving decisions, responsibilities, policy context, consent, and follow-up across collaborating groups.",
      usableResult: "An active running record organizing shared language, action ownership, open questions, city and state lanes, signup stewardship, story consent, and source boundaries.",
      audience: "Commercial Rent Stabilization collaborators working across organizing, policy, data, and cultural-space constituencies.",
      collectiveCredit: "The system supported a multi-organization collaboration; Jamie created and maintained infrastructure but did not individually author the coalition's decisions or every contribution.",
      causalBoundary: "The action plan records intended work, while the running minutes establish one implemented system as started and in use; neither proves every planned deliverable or policy outcome."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-TEAMS-CRS-ACTION-PLAN-2026", relationship: "direct-support", supports: ["Jamie's bounded operating-model design", "shared public goods", "collective-role limits"], propositionIds: ["PROP-TEAMS-CRS-OPERATING-MODEL", "PROP-TEAMS-CRS-SHARED-PUBLIC-GOODS", "PROP-TEAMS-CRS-IMPLEMENTATION-SEQUENCE"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-TEAMS-CRS-RUNNING-MINUTES-2026", relationship: "direct-support", supports: ["active running-minutes system", "Jamie's maintenance responsibility", "privacy and consent guardrails"], propositionIds: ["PROP-TEAMS-CRS-RUNNING-MINUTES-PURPOSE", "PROP-TEAMS-CRS-RUNNING-MINUTES-ACTIVE", "PROP-TEAMS-CRS-MEMORY-GUARDRAILS", "PROP-TEAMS-CRS-OPERATING-CATEGORIES"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Distinguish the designed 90-day plan from the one documented system already in use.", "Preserve shared authorship of coalition decisions and do not expose sensitive business or tenant information."],
    antiClaims: ["Jamie was the whole movement or sole organizer.", "Every proposed deliverable was completed or collectively adopted.", "The running minutes produced a legislative or campaign outcome.", "Jamie individually authored every decision or contribution in the shared record."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex private-archive review"]
  },
  {
    id: "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
    project: "fair-rent-nyc",
    internalClaim: "In May 2026, Jamie prepared a legislative provenance redline that used tracked source layers to make Commercial Rent Stabilization policy inheritance across 2019-2025 inspectable.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-TEAMS-CRS-PROVENANCE-REDLINE-2026"],
    requiredSupportTags: ["crs-legislative-provenance-prepared-by-jamie", "crs-legislative-source-layering", "crs-legislative-attribution-boundary"],
    composition: {
      action: "Prepared a tracked legislative-provenance redline across multiple policy source layers.",
      intendedEnd: "Give collaborators an inspectable account of how Commercial Rent Stabilization language changed and where major provisions came from.",
      usableResult: "A redline that distinguishes City Council, campaign-counsel, prior-bill, and Albany revision layers while preserving an authorship boundary.",
      audience: "Campaign collaborators, policy reviewers, legislative staff, and researchers comparing Commercial Rent Stabilization proposals.",
      collectiveCredit: "The artifact preserves source-layer credit to campaign counsel, prior legislation, and legislative staff; Jamie's documented role is preparing the provenance redline.",
      causalBoundary: "Preparing an analytical redline is not authorship of the underlying legislation, official legislative history, legal approval, or policy adoption."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-TEAMS-CRS-PROVENANCE-REDLINE-2026", relationship: "direct-support", supports: ["Jamie prepared the redline", "multiple source layers", "tracked provenance method", "authorship boundary"], propositionIds: ["PROP-TEAMS-CRS-PROVENANCE-PREPARED", "PROP-TEAMS-CRS-PROVENANCE-LAYERS", "PROP-TEAMS-CRS-PROVENANCE-METHOD", "PROP-TEAMS-CRS-PROVENANCE-AUTHORSHIP-BOUNDARY"], confidence: "high", renderCitation: false }],
    boundaries: ["Describe the artifact as a provenance redline, not an official legislative history or legal opinion.", "Retain the source-layer attribution that the artifact was designed to preserve."],
    antiClaims: ["Jamie authored the underlying legislative language.", "The redline is an official legislative history or legal opinion.", "The artifact proves passage, implementation, or policy impact.", "The source layers identify every individual contributor."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex private-archive review"]
  },
  {
    id: "CLM-SOURCE-BACKED-MEMORY-PILOT-DESIGN-2026",
    project: "source-backed-knowledge-practice",
    internalClaim: "By June 2026, Jamie had translated his source-backed memory method into a bounded pilot design combining source mapping, a small reviewable prototype, reusable templates, onboarding context, privacy notes, and a continue-revise-stop decision.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026"],
    requiredSupportTags: ["source-backed-pilot-bounded-loop", "source-backed-pilot-deliverable-design", "source-backed-pilot-human-review", "source-backed-pilot-privacy-boundary", "source-backed-pilot-product-maturity-boundary"],
    composition: {
      action: "Translated a source-backed knowledge method into a bounded discovery and prototype sprint.",
      intendedEnd: "Test whether a team could reduce context loss without creating a heavy parallel bureaucracy or treating AI as authority.",
      usableResult: "A service design covering source mapping, a small inspectable prototype, reusable memory templates, onboarding context, privacy and retention notes, and a continue-revise-stop recommendation.",
      audience: "Knowledge-heavy teams evaluating safer operating-memory and onboarding practices.",
      collectiveCredit: "The design depends on permissioned team sources and human reviewers; it does not treat Jamie or AI as the sole holder of organizational knowledge.",
      causalBoundary: "The proposal establishes a bounded service design, not acceptance, completed client delivery, production software, or customer outcomes."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026", relationship: "private-support", supports: ["bounded source-to-memory loop", "deliverable design", "human review", "privacy boundaries", "early prototype status"], propositionIds: ["PROP-TEAMS-PILOT-BOUNDED-LOOP", "PROP-TEAMS-PILOT-DELIVERABLES", "PROP-TEAMS-PILOT-HUMAN-REVIEW", "PROP-TEAMS-PILOT-PRIVACY-BOUNDARY", "PROP-TEAMS-PILOT-EARLY-PROTOTYPE"], confidence: "high", renderCitation: false }],
    boundaries: ["Keep prospective-client identity, commercial terms, and private source context out of the public repository.", "Use designed or proposed, not delivered, adopted, or deployed."],
    antiClaims: ["A prospective client accepted the proposal.", "Jamie delivered the proposed engagement.", "Source-Backed Team Memory is production SaaS.", "The workflow replaces human review or permits broad unapproved ingestion.", "The proposal establishes customer outcomes."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex private-archive review"]
  }
] satisfies ClaimRecord[];

export const teamsArchiveDecisions = teamsArchiveClaims.map((claim) => ({
  id: `DEC-${claim.id.replace(/^CLM-/, "")}-DEFER`,
  claimId: claim.id,
  surface: "future-portfolio-composition",
  decision: "defer" as const,
  rationale: "The claim is public-safe and source-backed but remains available for later composition; this private-archive pass does not automatically change the live portfolio argument.",
  decidedAt: "2026-07-13",
  reviewedBy: ["Codex archival-production review"]
})) satisfies ProjectionDecision[];
