import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const googleDriveArchiveEntities = [
  {
    id: "ENT-196-ARTISTS-RESIDENCY",
    kind: "program",
    label: "196 Artists Residency",
    publicSafeSummary: "An artist-residency program in Brooklyn that paired invited creative work with practical, self-service access and participant support.",
    aliases: ["196 Artists"],
    projectKey: "196-artists-residency",
    relatedEntityIds: ["ENT-SUNDAY-DINNER"],
    status: "historical"
  },
  {
    id: "ENT-COMMERCIAL-VACANCY-DATA",
    kind: "project",
    label: "Commercial vacancy data",
    publicSafeSummary: "Jamie's public-interest research and implementation design for more useful, privacy-preserving commercial vacancy and lease-cost indicators in New York City.",
    aliases: ["NYC Vacancy Data"],
    projectKey: "commercial-vacancy-data",
    relatedEntityIds: ["ENT-FAIR-RENT-NYC"],
    status: "active"
  }
] satisfies EntityRecord[];

export const googleDriveArchiveIntake = [
  {
    id: "INTAKE-GDRIVE-HANDOFF-PRACTICE-2026",
    receivedAt: "2026-07-13",
    kind: "public-memory",
    publicSafeSummary: "Jamie reports using project-specific Shared Drives to move work among devices and collaborators while preserving handoff context.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "claim-seed-created",
    sourceIds: [],
    claimIds: ["CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE-2023-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Authenticated inventory of accessible Shared Drives, followed by a bounded review of central portfolio-relevant project workspaces.",
    submittedBy: "Codex Google Drive archival review",
    entityIds: ["ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "source-created",
    sourceIds: ["SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026"],
    claimIds: ["CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE-2023-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-GDRIVE-196-ACCEPTANCE-2023",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private 196 Artists Residency acceptance and onboarding letter authored by Jamie in July 2023.",
    submittedBy: "Codex Google Drive archival review",
    entityIds: ["ENT-196-ARTISTS-RESIDENCY"],
    disposition: "source-created",
    sourceIds: ["SRC-GDRIVE-196-ACCEPTANCE-2023"],
    claimIds: ["CLM-196-PARTICIPANT-ONBOARDING-2023", "CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE-2023-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private January-February 2023 FairRentNYC web-operations notes documenting launch work, campaign actions, and follow-up items.",
    submittedBy: "Codex Google Drive archival review",
    entityIds: ["ENT-FAIR-RENT-NYC", "ENT-NYC-ARTIST-COALITION"],
    disposition: "source-created",
    sourceIds: ["SRC-GDRIVE-FAIR-RENT-WEB-NOTES-2023"],
    claimIds: ["CLM-FAIR-RENT-WEB-RELAUNCH-SYSTEM-2023", "CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE-2023-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private FairRentNYC website-input worksheet co-edited in January 2023 and structured around campaign content and deployable assets.",
    submittedBy: "Codex Google Drive archival review",
    entityIds: ["ENT-FAIR-RENT-NYC", "ENT-NYC-ARTIST-COALITION"],
    disposition: "source-created",
    sourceIds: ["SRC-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023"],
    claimIds: ["CLM-FAIR-RENT-WEB-RELAUNCH-SYSTEM-2023", "CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE-2023-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-GDRIVE-CRS-VERSION-HISTORY-2026",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private version-history review of the Commercial Rent Stabilization collaboration running minutes.",
    submittedBy: "Codex Google Drive archival review",
    entityIds: ["ENT-FAIR-RENT-NYC", "ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "source-created",
    sourceIds: ["SRC-GDRIVE-CRS-VERSION-HISTORY-2026"],
    claimIds: ["CLM-CRS-SHARED-OPERATING-MEMORY-2026", "CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE-2023-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-GDRIVE-COMMERCIAL-VACANCY-PILOT-2026",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Jamie-authored March 2026 proposal for a privacy-preserving commercial vacancy and lease-cost open-data pilot.",
    submittedBy: "Codex Google Drive archival review",
    entityIds: ["ENT-COMMERCIAL-VACANCY-DATA", "ENT-FAIR-RENT-NYC"],
    disposition: "source-created",
    sourceIds: ["SRC-GDRIVE-COMMERCIAL-VACANCY-PILOT-2026"],
    claimIds: ["CLM-COMMERCIAL-VACANCY-PUBLIC-DATA-PILOT-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-GDRIVE-VACANCY-CORPUS-2026",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private workspace inventory showing a periodized commercial-vacancy source corpus with scripts, census material, and web-output areas.",
    submittedBy: "Codex Google Drive archival review",
    entityIds: ["ENT-COMMERCIAL-VACANCY-DATA"],
    disposition: "source-created",
    sourceIds: ["SRC-GDRIVE-VACANCY-CORPUS-2026"],
    claimIds: ["CLM-COMMERCIAL-VACANCY-PUBLIC-DATA-PILOT-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-GDRIVE-SUNDAY-DINNER-RECORDINGS-2023",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private Sunday Dinner recording archive identified for later consent-aware review.",
    submittedBy: "Codex Google Drive archival review",
    entityIds: ["ENT-SUNDAY-DINNER"],
    disposition: "research-open",
    sourceIds: ["SRC-GDRIVE-SUNDAY-DINNER-RECORDINGS-2023"],
    claimIds: [],
    researchTaskIds: ["TASK-GDRIVE-SUNDAY-DINNER-RECORDINGS"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-GDRIVE-WOWLIST-MEMBER-MEETING-2015",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private recording labeled as a 2015 WOWList members meeting, queued for transcription and comparison with existing sources.",
    submittedBy: "Codex Google Drive archival review",
    entityIds: ["ENT-WOWLIST"],
    disposition: "research-open",
    sourceIds: ["SRC-GDRIVE-WOWLIST-MEMBER-MEETING-2015"],
    claimIds: [],
    researchTaskIds: ["TASK-GDRIVE-WOWLIST-MEMBER-MEETING"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-GDRIVE-NYCARTC-PHOTOSET-2026",
    receivedAt: "2026-07-13",
    kind: "private-archive-pointer",
    publicSafeSummary: "Private 2026 NYC Artist Coalition campaign photo set identified for visual, rights, and consent review before claim or image use.",
    submittedBy: "Codex Google Drive archival review",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-FAIR-RENT-NYC"],
    disposition: "research-open",
    sourceIds: [],
    claimIds: [],
    researchTaskIds: ["TASK-GDRIVE-NYCARTC-PHOTOSET"],
    rawMaterialPolicy: "protected-outside-repo"
  }
] satisfies IntakeRecord[];

export const googleDriveArchiveSources = [
  {
    id: "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    title: "Authenticated Shared Drive inventory and bounded project review",
    organization: "Jamie Burkart",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    publicCitation: "Private authenticated inventory of Jamie Burkart's accessible Google Drive Shared Drives, July 2026.",
    publicNote: "The review inventoried 110 accessible Shared Drives and then examined selected central workspaces for public-safe portfolio evidence.",
    intakeIds: ["INTAKE-GDRIVE-SHARED-DRIVE-INVENTORY-2026"],
    supportsGenerally: ["110 accessible Shared Drives at review time", "multiple portfolio-relevant project workspaces", "bounded selection method"],
    doesNotEstablish: ["Jamie's ownership or active maintenance of every accessible drive", "a complete close reading of all files", "the truth of claims implied by folder names", "cross-device usage frequency"],
    protectedLocatorId: "GDRIVE-INVENTORY-2026-001"
  },
  {
    id: "SRC-GDRIVE-196-ACCEPTANCE-2023",
    title: "196 Artists Residency participant acceptance and onboarding letter",
    author: "Jamie Burkart",
    organization: "196 Artists Residency",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2023-07-19",
    publicCitation: "Jamie Burkart, private 196 Artists Residency acceptance and onboarding letter, July 2023.",
    publicNote: "The letter is signed by Jamie, and its version history identifies him as the editor. Participant identity and contact details remain outside the repository.",
    intakeIds: ["INTAKE-GDRIVE-196-ACCEPTANCE-2023"],
    supportsGenerally: ["Jamie's participant evaluation and acceptance communication", "residency dates and purpose", "space-configuration follow-up", "self-service access planning"],
    doesNotEstablish: ["the participant's permission for public quotation", "the full residency program", "outcomes of the residency", "sole credit for the participant's work"],
    protectedLocatorId: "GDRIVE-196-ACCEPTANCE-2023-001"
  },
  {
    id: "SRC-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
    title: "FairRentNYC web-operations notes",
    organization: "FairRentNYC",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2023-02-03",
    publicCitation: "Private FairRentNYC web-operations notes, January-February 2023.",
    publicNote: "The notes and version history document collaborative campaign operations with Jamie among the editors; private administrative links and working details remain outside the repository.",
    intakeIds: ["INTAKE-GDRIVE-FAIR-RENT-WEB-NOTES-2023"],
    supportsGenerally: ["a February 2023 website relaunch", "campaign action and content requirements", "email-service restoration", "join, letter, press, testimony, sponsor, and rally pathways"],
    doesNotEstablish: ["Jamie's sole authorship of the campaign", "completion of every checklist item", "policy outcomes", "website adoption or conversion"],
    protectedLocatorId: "GDRIVE-FAIR-RENT-WEB-NOTES-2023-001"
  },
  {
    id: "SRC-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023",
    title: "FairRentNYC website-input worksheet",
    organization: "FairRentNYC",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2023-01-20",
    publicCitation: "Private FairRentNYC website-input worksheet, January 2023.",
    publicNote: "The worksheet and version history document a co-edited handoff structure for campaign identity, web copy, source assets, signup, contact, and action materials.",
    intakeIds: ["INTAKE-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023"],
    supportsGenerally: ["structured campaign-content intake", "character and asset requirements", "web and social reuse", "signup and campaign-document inputs"],
    doesNotEstablish: ["Jamie's sole authorship", "public launch by itself", "completion of every input", "campaign outcomes"],
    protectedLocatorId: "GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023-001"
  },
  {
    id: "SRC-GDRIVE-CRS-VERSION-HISTORY-2026",
    title: "Commercial Rent Stabilization running-minutes version-history review",
    organization: "Commercial Rent Stabilization collaboration",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    publicCitation: "Private Google Drive version-history review of Commercial Rent Stabilization collaboration running minutes, July 2026.",
    publicNote: "The history records 20 revisions between April 29 and May 29, 2026, with Jamie and a collaborator identified as editors.",
    intakeIds: ["INTAKE-GDRIVE-CRS-VERSION-HISTORY-2026"],
    supportsGenerally: ["an actively revised shared record", "Jamie's editing and maintenance role", "collaborative editing", "April-May 2026 continuity"],
    doesNotEstablish: ["authorship of every contribution", "universal coalition adoption", "completeness of the meeting record", "policy outcomes"],
    protectedLocatorId: "GDRIVE-CRS-VERSION-HISTORY-2026-001"
  },
  {
    id: "SRC-GDRIVE-COMMERCIAL-VACANCY-PILOT-2026",
    title: "Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-03-27",
    publicCitation: "Jamie Burkart, private proposal for a fuller public baseline for commercial vacancy and lease cost in New York City, March 2026.",
    publicNote: "The proposal defines a privacy-preserving pilot and explicitly asks for aggregate indicators rather than confidential filing, tenant, parcel, or lease records.",
    intakeIds: ["INTAKE-GDRIVE-COMMERCIAL-VACANCY-PILOT-2026"],
    supportsGenerally: ["privacy-preserving pilot design", "complementary storefront and filing-derived indicators", "coverage and suppression requirements", "minimum useful fields and implementation questions"],
    doesNotEstablish: ["agency acceptance", "a released dataset", "validated indicator quality", "policy adoption", "access to confidential filings"],
    protectedLocatorId: "GDRIVE-COMMERCIAL-VACANCY-PILOT-2026-001"
  },
  {
    id: "SRC-GDRIVE-VACANCY-CORPUS-2026",
    title: "Commercial-vacancy research workspace inventory",
    organization: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-03-04",
    publicCitation: "Private inventory of Jamie Burkart's commercial-vacancy research workspace, March 2026.",
    publicNote: "The workspace separates source periods spanning 2005-2025 and includes census, scripts, and web-output areas; underlying data remains outside the repository.",
    intakeIds: ["INTAKE-GDRIVE-VACANCY-CORPUS-2026"],
    supportsGenerally: ["periodized source organization", "2005-2025 source ranges", "census and script areas", "web-output area"],
    doesNotEstablish: ["source completeness", "data validity", "authorship of every underlying dataset", "a production data pipeline", "published results"],
    protectedLocatorId: "GDRIVE-VACANCY-CORPUS-2026-001"
  },
  {
    id: "SRC-GDRIVE-SUNDAY-DINNER-RECORDINGS-2023",
    title: "Sunday Dinner recording archive",
    organization: "Sunday Dinner",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2023-06-13",
    publicCitation: "Private Sunday Dinner recording archive identified in Google Drive.",
    publicNote: "The archive contains multiple recording segments and packages. Content, participant consent, and publication rights have not yet been reviewed.",
    intakeIds: ["INTAKE-GDRIVE-SUNDAY-DINNER-RECORDINGS-2023"],
    supportsGenerally: ["the existence of a preserved recording archive"],
    doesNotEstablish: ["attendance", "participant identity", "the content of the recordings", "permission to publish", "program outcomes"],
    protectedLocatorId: "GDRIVE-SUNDAY-DINNER-RECORDINGS-2023-001"
  },
  {
    id: "SRC-GDRIVE-WOWLIST-MEMBER-MEETING-2015",
    title: "WOWList members-meeting recording",
    organization: "WOWList",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2015",
    publicCitation: "Private recording labeled as a 2015 WOWList members meeting.",
    publicNote: "The label is an archival lead. The recording has not yet been transcribed, closely read, or cleared for public use.",
    intakeIds: ["INTAKE-GDRIVE-WOWLIST-MEMBER-MEETING-2015"],
    supportsGenerally: ["the existence of a preserved recording labeled as a WOWList members meeting"],
    doesNotEstablish: ["who participated", "the claims made in the recording", "adoption metrics", "permission to quote or publish"],
    protectedLocatorId: "GDRIVE-WOWLIST-MEMBER-MEETING-2015-001"
  }
] satisfies SourceRecord[];

export const googleDriveArchiveReadings = [
  {
    id: "READ-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    sourceId: "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-GDRIVE-INVENTORY-ACCESSIBLE-ROOTS", text: "The authenticated account exposed 110 accessible Shared Drives at review time.", relationToJamie: "project-context", supportTags: ["gdrive-accessible-root-inventory"], confidence: "high", locator: "Shared Drive inventory count" },
      { id: "PROP-GDRIVE-INVENTORY-CROSS-PROJECT", text: "Central Shared Drives were recovered for multiple portfolio-relevant projects, including artist residency, cultural programming, coalition advocacy, civic development, and software work.", relationToJamie: "project-context", supportTags: ["gdrive-cross-project-workspaces"], confidence: "high", locator: "Filtered project-root inventory" }
    ],
    limitations: ["Accessible does not mean owned, created, actively maintained, or comprehensively read by Jamie.", "Drive and folder names were used for routing only, not as proof of the claims inside them."],
    researchTaskIds: []
  },
  {
    id: "READ-GDRIVE-196-ACCEPTANCE-2023",
    sourceId: "SRC-GDRIVE-196-ACCEPTANCE-2023",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-GDRIVE-196-JAMIE-AUTHOR", text: "The letter is signed by Jamie, and both recorded revisions identify him as the editor.", relationToJamie: "direct-role", supportTags: ["196-acceptance-authored-by-jamie"], confidence: "high", locator: "Signature and version history" },
      { id: "PROP-GDRIVE-196-EVALUATION-INVITATION", text: "Jamie evaluated the participant's proposal and extended a dated invitation to use the residency for an exhibition-based creative process.", relationToJamie: "direct-role", supportTags: ["196-participant-evaluation-and-invitation"], confidence: "high", locator: "Opening acceptance paragraphs" },
      { id: "PROP-GDRIVE-196-OPERATIONAL-ONBOARDING", text: "Jamie proposed a video check-in to configure the space and described a self-service key workflow supporting independent participant access.", relationToJamie: "direct-role", supportTags: ["196-operational-onboarding"], confidence: "high", locator: "Space configuration and access paragraphs" }
    ],
    limitations: ["The participant's identity, contact information, and quoted praise are not approved for publication.", "One acceptance letter does not establish the complete residency program, participant outcomes, or the artist's work as Jamie's accomplishment."],
    researchTaskIds: []
  },
  {
    id: "READ-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
    sourceId: "SRC-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-GDRIVE-FAIR-RENT-WEBSITE-LIVE", text: "The notes record a new FairRentNYC website as live on February 1, 2023.", relationToJamie: "collective-role", supportTags: ["fair-rent-2023-website-relaunch"], confidence: "high", locator: "February 1 update" },
      { id: "PROP-GDRIVE-FAIR-RENT-ACTION-PATHWAYS", text: "The working list joins website, email, signup, letter, press, testimony, sponsor, rally, and social-action requirements in one operational record.", relationToJamie: "collective-role", supportTags: ["fair-rent-campaign-action-pathways"], confidence: "high", locator: "January-February task and reference sections" },
      { id: "PROP-GDRIVE-FAIR-RENT-COLLABORATIVE-EDITING", text: "The version history records Jamie and a campaign collaborator as editors across the notes' January-February 2023 working period.", relationToJamie: "collective-role", supportTags: ["fair-rent-web-notes-collaborative-editing"], confidence: "high", locator: "Document version history" }
    ],
    limitations: ["The notes are collaborative and do not assign every checklist item or wording decision to Jamie.", "A live-site note does not establish completion of every task, campaign adoption, policy outcomes, or measured website performance."],
    researchTaskIds: []
  },
  {
    id: "READ-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023",
    sourceId: "SRC-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-GDRIVE-FAIR-RENT-STRUCTURED-INTAKE", text: "The worksheet structures campaign inputs for domain, identity, descriptions, social profiles, signup, source assets, campaign documents, contact, and payment pathways.", relationToJamie: "collective-role", supportTags: ["fair-rent-structured-web-intake"], confidence: "high", locator: "Worksheet rows and criteria columns" },
      { id: "PROP-GDRIVE-FAIR-RENT-REUSE-CONSTRAINTS", text: "The worksheet defines character, format, and image requirements so inputs can be reused across website and social surfaces.", relationToJamie: "collective-role", supportTags: ["fair-rent-deployable-content-constraints"], confidence: "high", locator: "Length, criteria, and appears-on columns" },
      { id: "PROP-GDRIVE-FAIR-RENT-TEMPLATE-COLLABORATIVE", text: "The version history identifies Jamie and a campaign collaborator as editors during January 2023.", relationToJamie: "collective-role", supportTags: ["fair-rent-website-template-collaborative-editing"], confidence: "high", locator: "Worksheet version history" }
    ],
    limitations: ["The worksheet is a shared artifact and does not establish sole authorship by Jamie.", "Structured inputs do not by themselves prove deployment, completion, audience response, or policy impact."],
    researchTaskIds: []
  },
  {
    id: "READ-GDRIVE-CRS-VERSION-HISTORY-2026",
    sourceId: "SRC-GDRIVE-CRS-VERSION-HISTORY-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-GDRIVE-CRS-RUNNING-MINUTES-VERSION-HISTORY", text: "The running-minutes history contains 20 recorded revisions between April 29 and May 29, 2026, with Jamie and a collaborator identified as editors.", relationToJamie: "collective-role", supportTags: ["crs-running-minutes-collaborative-version-history"], confidence: "high", locator: "Google Drive revision list" }
    ],
    limitations: ["Version metadata does not attribute individual passages or meeting contributions.", "Revision count does not measure quality, adoption, campaign impact, or completeness."],
    researchTaskIds: []
  },
  {
    id: "READ-GDRIVE-COMMERCIAL-VACANCY-PILOT-2026",
    sourceId: "SRC-GDRIVE-COMMERCIAL-VACANCY-PILOT-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-GDRIVE-VACANCY-PILOT-AUTHORED", text: "The March 2026 proposal identifies Jamie as its author and frames the work as a practical open-data scoping request.", relationToJamie: "direct-role", supportTags: ["vacancy-pilot-authored-by-jamie"], confidence: "high", locator: "Title, plain ask, and signature" },
      { id: "PROP-GDRIVE-VACANCY-PILOT-COMPLEMENTARY-LENSES", text: "The proposal distinguishes storefront reporting from aggregate filing-derived indicators and asks that the two public lenses be used together rather than treating either as a replacement.", relationToJamie: "direct-role", supportTags: ["vacancy-pilot-complementary-data-lenses"], confidence: "high", locator: "Two public lenses and why add the filing-derived lens" },
      { id: "PROP-GDRIVE-VACANCY-PILOT-PRIVACY", text: "The pilot specifies aggregate geography, coverage, suppression, methods, and minimum-field requirements while explicitly rejecting raw confidential filing, tenant, parcel, and lease records.", relationToJamie: "direct-role", supportTags: ["vacancy-pilot-privacy-and-implementation-design"], confidence: "high", locator: "Smallest serious pilot, minimum useful fields, and what this is not" }
    ],
    limitations: ["The proposal documents Jamie's research and implementation design, not agency acceptance, a released dataset, or validated indicator quality.", "The proposed filing-derived indicators remain subject to agency access, legal, statistical, coverage, and suppression review."],
    researchTaskIds: []
  },
  {
    id: "READ-GDRIVE-VACANCY-CORPUS-2026",
    sourceId: "SRC-GDRIVE-VACANCY-CORPUS-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-GDRIVE-VACANCY-PERIODIZED-CORPUS", text: "The workspace inventory separates source areas spanning 2005-2012, 2012-2023, and 2024-2025 and also includes census, script, and web-output areas.", relationToJamie: "direct-role", supportTags: ["vacancy-periodized-research-corpus"], confidence: "high", locator: "Direct workspace inventory" }
    ],
    limitations: ["Directory organization does not establish source completeness, data quality, or authorship of underlying public datasets.", "The inventory does not establish that the scripts or web area form a production pipeline."],
    researchTaskIds: []
  },
  {
    id: "READ-GDRIVE-SUNDAY-DINNER-RECORDINGS-2023",
    sourceId: "SRC-GDRIVE-SUNDAY-DINNER-RECORDINGS-2023",
    status: "queued",
    propositions: [],
    limitations: ["Recording content, participant identity, consent, and publication rights have not been reviewed."],
    researchTaskIds: ["TASK-GDRIVE-SUNDAY-DINNER-RECORDINGS"]
  },
  {
    id: "READ-GDRIVE-WOWLIST-MEMBER-MEETING-2015",
    sourceId: "SRC-GDRIVE-WOWLIST-MEMBER-MEETING-2015",
    status: "queued",
    propositions: [],
    limitations: ["The title is metadata only; content and rights remain unreviewed."],
    researchTaskIds: ["TASK-GDRIVE-WOWLIST-MEMBER-MEETING"]
  }
] satisfies SourceReading[];

export const googleDriveArchiveClaims = [
  {
    id: "CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE-2023-2026",
    project: "source-backed-knowledge-practice",
    internalClaim: "Across 196 Artists Residency, FairRentNYC, and Commercial Rent Stabilization work from 2023-2026, Jamie used Shared Drives to create and maintain participant communication, structured campaign inputs, and collaborative operating memory.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-GDRIVE-HANDOFF-PRACTICE-2026", "INTAKE-GDRIVE-SHARED-DRIVE-INVENTORY-2026", "INTAKE-GDRIVE-196-ACCEPTANCE-2023", "INTAKE-GDRIVE-FAIR-RENT-WEB-NOTES-2023", "INTAKE-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023", "INTAKE-GDRIVE-CRS-VERSION-HISTORY-2026"],
    requiredSupportTags: ["196-acceptance-authored-by-jamie", "fair-rent-structured-web-intake", "crs-running-minutes-collaborative-version-history"],
    composition: {
      action: "Built and maintained project-specific Shared Drive artifacts across participant, campaign, and coalition workflows.",
      intendedEnd: "Make active work easier to continue across devices and hand off among collaborators without losing operational context.",
      usableResult: "A documented set of reusable participant communications, structured campaign inputs, and collaboratively edited operating memory across three projects.",
      audience: "Artists, campaign collaborators, and coalition partners entering or continuing shared work.",
      collectiveCredit: "The drives preserve collective work; Jamie's documented contribution is the artifacts he authored or edited, not sole ownership of every workspace or contribution.",
      causalBoundary: "The evidence establishes concrete use across three projects, not ownership of every accessible drive, device-use frequency, or universal adoption by collaborators."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-GDRIVE-196-ACCEPTANCE-2023", relationship: "direct-support", supports: ["Jamie-authored participant communication", "operational onboarding"], propositionIds: ["PROP-GDRIVE-196-JAMIE-AUTHOR", "PROP-GDRIVE-196-OPERATIONAL-ONBOARDING"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023", relationship: "direct-support", supports: ["structured campaign inputs", "collaborative editing"], propositionIds: ["PROP-GDRIVE-FAIR-RENT-STRUCTURED-INTAKE", "PROP-GDRIVE-FAIR-RENT-TEMPLATE-COLLABORATIVE"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-GDRIVE-CRS-VERSION-HISTORY-2026", relationship: "corroborating", supports: ["collaboratively revised operating memory", "Jamie's editing role"], propositionIds: ["PROP-GDRIVE-CRS-RUNNING-MINUTES-VERSION-HISTORY"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Name the three evidenced projects rather than generalizing to every accessible Shared Drive.", "Treat cross-device purpose as Jamie's first-party account rather than measured usage telemetry."],
    antiClaims: ["Jamie owned, created, or maintained every accessible Shared Drive.", "Folder presence proves Jamie's role or the claims inside it.", "Every collaborator adopted the artifacts or workflow.", "Shared Drive activity measures project outcomes."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart memory intake", "Codex Google Drive archival review"]
  },
  {
    id: "CLM-196-PARTICIPANT-ONBOARDING-2023",
    project: "196-artists-residency",
    internalClaim: "In July 2023, Jamie evaluated and accepted an exhibition-based residency proposal, then defined a practical onboarding path covering space configuration and independent self-service access.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-GDRIVE-196-ACCEPTANCE-2023"],
    requiredSupportTags: ["196-acceptance-authored-by-jamie", "196-participant-evaluation-and-invitation", "196-operational-onboarding"],
    composition: {
      action: "Evaluated a residency proposal, extended the invitation, and designed the participant onboarding path.",
      intendedEnd: "Give an artist and collaborator a clear, welcoming route into an exhibition-based residency with independent access.",
      usableResult: "A dated invitation, planned space-configuration check-in, and self-service key workflow supporting independent access.",
      audience: "An invited 196 Artists Residency participant and collaborator.",
      collectiveCredit: "The resident's proposal and creative work remain theirs; Jamie's documented role is selection, invitation, space preparation, and access logistics.",
      causalBoundary: "One acceptance letter establishes this onboarding workflow, not the full residency program, artistic outcomes, or participant endorsement."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-GDRIVE-196-ACCEPTANCE-2023", relationship: "private-support", supports: ["Jamie authorship", "proposal evaluation and invitation", "space and access onboarding"], propositionIds: ["PROP-GDRIVE-196-JAMIE-AUTHOR", "PROP-GDRIVE-196-EVALUATION-INVITATION", "PROP-GDRIVE-196-OPERATIONAL-ONBOARDING"], confidence: "high", renderCitation: false }],
    boundaries: ["Do not identify or quote the participant without permission.", "Credit the artist's proposal and creative work to the artist."],
    antiClaims: ["Jamie created the participant's artwork or proposal.", "This letter proves the residency's artistic or career outcomes.", "The participant approved public quotation or testimonial use."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex Google Drive archival review"]
  },
  {
    id: "CLM-FAIR-RENT-WEB-RELAUNCH-SYSTEM-2023",
    project: "fair-rent-nyc",
    internalClaim: "In January-February 2023, Jamie co-edited FairRentNYC's campaign web inputs and operations record as the team relaunched the website and connected it to signup, letter, press, testimony, sponsor, rally, email, and social-action pathways.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-GDRIVE-FAIR-RENT-WEB-NOTES-2023", "INTAKE-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023"],
    requiredSupportTags: ["fair-rent-2023-website-relaunch", "fair-rent-campaign-action-pathways", "fair-rent-structured-web-intake", "fair-rent-deployable-content-constraints"],
    composition: {
      action: "Co-edited the structured campaign inputs and operating record supporting a FairRentNYC website relaunch.",
      intendedEnd: "Turn coalition language, assets, and campaign actions into a usable public web surface and repeatable handoff.",
      usableResult: "A live February 2023 campaign site supported by structured inputs and pathways for signup, letters, press, testimony, sponsors, rally materials, email, and social action.",
      audience: "FairRentNYC collaborators, supporters, small businesses, nonprofits, and public officials receiving the campaign's call to action.",
      collectiveCredit: "The records are collaboratively edited campaign artifacts; they document Jamie's participation without assigning him every task, wording decision, or coalition contribution.",
      causalBoundary: "The sources establish the relaunch workflow and public launch note, not completion of every checklist item, measured web performance, or policy outcomes."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-GDRIVE-FAIR-RENT-WEB-NOTES-2023", relationship: "direct-support", supports: ["February 2023 relaunch", "campaign action pathways", "collaborative editing"], propositionIds: ["PROP-GDRIVE-FAIR-RENT-WEBSITE-LIVE", "PROP-GDRIVE-FAIR-RENT-ACTION-PATHWAYS", "PROP-GDRIVE-FAIR-RENT-COLLABORATIVE-EDITING"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023", relationship: "direct-support", supports: ["structured web intake", "deployable content constraints", "collaborative editing"], propositionIds: ["PROP-GDRIVE-FAIR-RENT-STRUCTURED-INTAKE", "PROP-GDRIVE-FAIR-RENT-REUSE-CONSTRAINTS", "PROP-GDRIVE-FAIR-RENT-TEMPLATE-COLLABORATIVE"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Use co-edited or supported, not sole author or sole builder, unless additional source attribution is added.", "Keep private administrative links, contact details, and collaborator-specific working notes outside the repository."],
    antiClaims: ["Jamie alone created or led FairRentNYC.", "Every checklist item was completed.", "The relaunch produced a policy outcome or measured conversion result.", "The private working records are approved for public release."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex Google Drive archival review"]
  },
  {
    id: "CLM-COMMERCIAL-VACANCY-PUBLIC-DATA-PILOT-2026",
    project: "commercial-vacancy-data",
    internalClaim: "In March 2026, Jamie designed a privacy-preserving open-data pilot that would complement storefront reporting with geography-aggregated commercial vacancy and lease-cost indicators, coverage and suppression tables, and a plain-language methods note.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-GDRIVE-COMMERCIAL-VACANCY-PILOT-2026", "INTAKE-GDRIVE-VACANCY-CORPUS-2026"],
    requiredSupportTags: ["vacancy-pilot-authored-by-jamie", "vacancy-pilot-complementary-data-lenses", "vacancy-pilot-privacy-and-implementation-design", "vacancy-periodized-research-corpus"],
    composition: {
      action: "Designed a bounded, privacy-preserving pilot for more useful commercial vacancy and lease-cost indicators.",
      intendedEnd: "Give public agencies, Council staff, researchers, and communities a fuller baseline without exposing confidential filings or tenant records.",
      usableResult: "A smallest-serious-pilot specification covering geography-aggregated indicators, coverage and suppression, methods, minimum fields, and an implementation decision path, backed by a periodized research corpus.",
      audience: "Open-data practitioners, public agencies, Council oversight staff, small-business researchers, and policy collaborators.",
      collectiveCredit: "The proposal builds on existing city storefront reporting and public administrative data; Jamie's role is the complementary pilot design and source organization.",
      causalBoundary: "The artifact is a proposal and research corpus, not an accepted agency plan, released dataset, validated analysis, or policy outcome."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-GDRIVE-COMMERCIAL-VACANCY-PILOT-2026", relationship: "private-support", supports: ["Jamie authorship", "complementary data model", "privacy and implementation design"], propositionIds: ["PROP-GDRIVE-VACANCY-PILOT-AUTHORED", "PROP-GDRIVE-VACANCY-PILOT-COMPLEMENTARY-LENSES", "PROP-GDRIVE-VACANCY-PILOT-PRIVACY"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-GDRIVE-VACANCY-CORPUS-2026", relationship: "corroborating", supports: ["periodized source corpus", "supporting research structure"], propositionIds: ["PROP-GDRIVE-VACANCY-PERIODIZED-CORPUS"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Describe the work as a pilot design or proposal, not an agency release.", "Retain the explicit privacy, suppression, coverage, and methods requirements."],
    antiClaims: ["The pilot was accepted, funded, or implemented by an agency.", "Jamie had access to raw confidential filings.", "The proposed indicators have been validated or released.", "The workspace inventory proves complete or production-ready data engineering."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex Google Drive archival review"]
  }
] satisfies ClaimRecord[];

export const googleDriveArchiveResearchTasks = [
  {
    id: "TASK-GDRIVE-SUNDAY-DINNER-RECORDINGS",
    project: "sunday-dinner",
    question: "What public-safe program evidence, if any, can be recovered from the Sunday Dinner recordings after participant consent and rights are reviewed?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-13",
    intakeIds: ["INTAKE-GDRIVE-SUNDAY-DINNER-RECORDINGS-2023"],
    sourceIds: ["SRC-GDRIVE-SUNDAY-DINNER-RECORDINGS-2023"],
    claimIds: [],
    nextActions: ["Inventory recording dates without naming participants.", "Establish consent and publication boundaries before transcription or quotation.", "Compare any approved findings with existing Sunday Dinner public sources."]
  },
  {
    id: "TASK-GDRIVE-WOWLIST-MEMBER-MEETING",
    project: "wowlist",
    question: "Does the preserved WOWList members-meeting recording support new product, adoption, or community-practice claims beyond the existing transcript and public sources?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-13",
    intakeIds: ["INTAKE-GDRIVE-WOWLIST-MEMBER-MEETING-2015"],
    sourceIds: ["SRC-GDRIVE-WOWLIST-MEMBER-MEETING-2015"],
    claimIds: [],
    nextActions: ["Prepare a protected, attributed content review.", "Reconcile the recording with the existing approved source summary and public application record.", "Promote only claims with clear speaker attribution and defensible boundaries."]
  },
  {
    id: "TASK-GDRIVE-NYCARTC-PHOTOSET",
    project: "nyc-artist-coalition",
    question: "What public-safe campaign context or research leads can the 2026 NYC Artist Coalition photo set support after visual, rights, and consent review?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-13",
    intakeIds: ["INTAKE-GDRIVE-NYCARTC-PHOTOSET-2026"],
    sourceIds: [],
    claimIds: [],
    nextActions: ["Review a bounded contact sheet for visible actions, signs, dates, and locations.", "Identify photographer, rights, and depicted-person consent before any public image use.", "Route visual observations into source discovery rather than treating photographs as self-interpreting claims."]
  }
] satisfies ResearchTask[];

export const googleDriveArchiveDecisions = googleDriveArchiveClaims.map((claim) => ({
  id: `DEC-${claim.id.replace(/^CLM-/, "")}-DEFER`,
  claimId: claim.id,
  surface: "future-portfolio-composition",
  decision: "defer" as const,
  rationale: "The claim is public-safe and source-backed but remains available for later composition; this private Google Drive pass does not automatically change the live portfolio argument.",
  decidedAt: "2026-07-13",
  reviewedBy: ["Codex Google Drive archival-production review"]
})) satisfies ProjectionDecision[];
