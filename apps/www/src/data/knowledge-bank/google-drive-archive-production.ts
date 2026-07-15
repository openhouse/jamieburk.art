import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const googleDriveArchiveIntakes = [
  {
    id: "INT-2026-07-14-GDRIVE-196-ACCEPTANCE-WORKFLOW",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex Google Drive archival production",
    publicSafeDescription: "A private 196 Artists Residency acceptance template documenting Jamie's proposal review, artist onboarding, space-configuration planning, and access logistics.",
    projectIds: ["196-sunday-dinner"],
    entityIds: [],
    dateHints: ["2023-07", "2023-09"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-GDRIVE-196-ACCEPTANCE-WORKFLOW-2023"],
    claimIds: ["CLM-196-RESIDENCY-ONBOARDING-OPERATIONS"],
    inquiryIds: [],
    protectedLocatorId: "GDRIVE-196-ACCEPTANCE-WORKFLOW-2023-001"
  },
  {
    id: "INT-2026-07-14-GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex Google Drive archival production",
    publicSafeDescription: "A 2015 WOW List member-meeting video retained in the shared project drive.",
    projectIds: ["wowlist"],
    entityIds: [],
    dateHints: ["2015"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO-2015"],
    claimIds: [],
    inquiryIds: ["INQ-GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO"],
    protectedLocatorId: "GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO-2015-001"
  },
  {
    id: "INT-2026-07-14-GDRIVE-FAIR-RENT-EVENT-VISUALS",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex Google Drive archival production",
    publicSafeDescription: "A private Fair Rent NYC shared-drive folder containing 42 photographs and two launch-video files from a February 2026 event workflow.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["fair-rent-nyc-campaign"],
    dateHints: ["2026-02-17", "2026-02-18"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-GDRIVE-FAIR-RENT-EVENT-VISUALS-2026"],
    claimIds: ["CLM-FAIR-RENT-EVENT-VISUAL-ARCHIVE"],
    inquiryIds: ["INQ-GDRIVE-FAIR-RENT-VISUAL-RIGHTS"],
    protectedLocatorId: "GDRIVE-FAIR-RENT-EVENT-VISUALS-2026-001"
  },
  {
    id: "INT-2026-07-14-GDRIVE-SUNDAY-DINNER-ZOOM-ARCHIVE",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex Google Drive archival production",
    publicSafeDescription: "A private Sunday Dinner shared-drive folder containing 33 Zoom video, conversion, and split-archive assets.",
    projectIds: ["196-sunday-dinner"],
    entityIds: [],
    dateHints: ["2023-06-13"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-GDRIVE-SUNDAY-DINNER-ZOOM-ARCHIVE-2023"],
    claimIds: ["CLM-SUNDAY-DINNER-ZOOM-ARCHIVE-DEPTH"],
    inquiryIds: ["INQ-GDRIVE-SUNDAY-DINNER-ZOOM-RECONSTRUCTION"],
    protectedLocatorId: "GDRIVE-SUNDAY-DINNER-ZOOM-ARCHIVE-2023-001"
  },
  {
    id: "INT-2026-07-15-GDRIVE-NTER-CHNG-ANH-INSTALL-PLAN",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "A private April 2011 NTER CHNG working plan for staging the installation for America: Now and Here.",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2011-04", "2011-05"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-GDRIVE-NTER-CHNG-ANH-INSTALL-PLAN-2011"],
    claimIds: ["CLM-NTER-CHNG-ANH-RESTAGING-PLAN"],
    inquiryIds: ["INQ-GDRIVE-NTER-CHNG-WORKING-ARTIFACTS"],
    protectedLocatorId: "GDRIVE-NTER-CHNG-ANH-INSTALL-PLAN-2011-001"
  },
  {
    id: "INT-2026-07-15-GDRIVE-NTER-CHNG-WORKING-COMPILATION",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "A private 2010-2011 NTER CHNG working compilation containing exhibit-description language, project prompts, and response material.",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2010-01", "2011-04"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-GDRIVE-NTER-CHNG-WORKING-COMPILATION-2010-2011"],
    claimIds: ["CLM-NTER-CHNG-SOCIAL-INFORMATION-SPACE-FRAMING"],
    inquiryIds: ["INQ-GDRIVE-NTER-CHNG-WORKING-ARTIFACTS"],
    protectedLocatorId: "GDRIVE-NTER-CHNG-WORKING-COMPILATION-2010-2011-001"
  }
] satisfies IntakeItem[];

export const googleDriveArchiveSources = [
  {
    id: "SRC-GDRIVE-196-ACCEPTANCE-WORKFLOW-2023",
    title: "196 Artists Residency acceptance and onboarding template",
    organization: "196 Artists Residency",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Private 196 Artists Residency acceptance and onboarding record, reviewed July 14, 2026.",
    publicNote: "The record documents Jamie's proposal review, invitation, space-configuration planning, and access coordination.",
    locator: "Acceptance, check-in planning, space configuration, and access-logistics paragraphs.",
    projectIds: ["196-sunday-dinner"],
    intakeIds: ["INT-2026-07-14-GDRIVE-196-ACCEPTANCE-WORKFLOW"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Google Drive close reading"],
    supportsGenerally: ["Jamie's operational role", "proposal review", "artist onboarding", "space configuration", "access coordination"],
    doesNotEstablish: ["residency-wide participant totals", "outcomes of the accepted proposal", "permission to publish participant identity or access instructions"],
    protectedLocatorId: "GDRIVE-196-ACCEPTANCE-WORKFLOW-2023-001"
  },
  {
    id: "SRC-GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO-2015",
    title: "What is WOW List? member meeting video",
    organization: "WOW List",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Private WOW List member-meeting video metadata, reviewed July 14, 2026.",
    publicNote: "Shared-drive metadata identifies an approximately 19 MB video titled 'Members Meeting: What is wowlist.org? (2015).'",
    locator: "Shared-drive title, media type, file size, and project folder context.",
    projectIds: ["wowlist"],
    intakeIds: ["INT-2026-07-14-GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO"],
    reviewStatus: "blocked",
    reviewDepth: "metadata",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Google Drive metadata review"],
    supportsGenerally: ["existence of a 2015 member-meeting video", "member-orientation research lead"],
    doesNotEstablish: ["the meeting's statements", "attendance", "speaker identities", "permission to publish the video"],
    protectedLocatorId: "GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO-2015-001"
  },
  {
    id: "SRC-GDRIVE-FAIR-RENT-EVENT-VISUALS-2026",
    title: "Fair Rent NYC February 2026 event visual archive",
    organization: "Fair Rent NYC",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Protected Fair Rent NYC event-visual metadata, reviewed July 14, 2026.",
    publicNote: "Shared-drive metadata identifies 42 photographs and two launch-video files associated with a February 2026 event workflow.",
    locator: "Photo and Video child-folder metadata and file counts.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-GDRIVE-FAIR-RENT-EVENT-VISUALS"],
    reviewStatus: "reviewed",
    reviewDepth: "metadata",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Google Drive metadata review"],
    supportsGenerally: ["visual-archive existence", "42 photograph files", "two video files", "photo-editor research queue"],
    doesNotEstablish: ["who appears", "what occurred", "attendance", "photographer credit", "rights or consent for public use"],
    protectedLocatorId: "GDRIVE-FAIR-RENT-EVENT-VISUALS-2026-001",
    media: { mediaKind: "other", rightsStatus: "permission-needed", consentStatus: "review-needed", publicDisplayStatus: "hold" }
  },
  {
    id: "SRC-GDRIVE-SUNDAY-DINNER-ZOOM-ARCHIVE-2023",
    title: "Sunday Dinner Zoom archive metadata",
    organization: "Sunday Dinner",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Protected Sunday Dinner Zoom archive metadata, reviewed July 14, 2026.",
    publicNote: "Shared-drive metadata identifies 33 video, conversion, and split-archive assets grouped under Sunday Dinner Zoom.",
    locator: "Archive folder child list, media types, file sizes, and modification dates.",
    projectIds: ["196-sunday-dinner"],
    intakeIds: ["INT-2026-07-14-GDRIVE-SUNDAY-DINNER-ZOOM-ARCHIVE"],
    reviewStatus: "reviewed",
    reviewDepth: "metadata",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Google Drive metadata review"],
    supportsGenerally: ["a substantial audiovisual archive", "33 stored assets", "future reconstruction and photo-editor research"],
    doesNotEstablish: ["33 distinct events", "participant identities", "public-use permission", "content or outcomes of the recordings"],
    protectedLocatorId: "GDRIVE-SUNDAY-DINNER-ZOOM-ARCHIVE-2023-001",
    media: { mediaKind: "other", rightsStatus: "permission-needed", consentStatus: "review-needed", publicDisplayStatus: "hold" }
  },
  {
    id: "SRC-GDRIVE-NTER-CHNG-ANH-INSTALL-PLAN-2011",
    title: "NTER CHNG America: Now and Here staging plan",
    organization: "NTER CHNG",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation: "Protected NTER CHNG America: Now and Here staging plan, reviewed July 15, 2026.",
    publicNote: "The contemporaneous working plan documents preparation for a May 2011 restaging across software, computers, projection, networking, wall fabrication, gallery installation, fine-tuning, and teardown.",
    locator: "Pre-prep, workshop-prep, installation, gallery-experience, interview, and teardown sections; private source synopsis only.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-15-GDRIVE-NTER-CHNG-ANH-INSTALL-PLAN"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex Google Docs close reading"],
    supportsGenerally: [
      "a contemporaneous April 2011 America: Now and Here restaging plan",
      "planned software revision and server-side and wall-side work",
      "planned display-computer, projection, wiring, and networking work",
      "planned wall fabrication, installation, floor markings, gallery fine-tuning, and teardown",
      "collective three-creator interview planning"
    ],
    doesNotEstablish: [
      "completion of every planned task",
      "the individual responsible for each software, fabrication, transport, installation, or teardown task",
      "contractor, employee, or commissioned-artist status",
      "complete labor credit",
      "permission to publish the working document",
      "the final exhibition venue without separate corroboration"
    ],
    protectedLocatorId: "GDRIVE-NTER-CHNG-ANH-INSTALL-PLAN-2011-001"
  },
  {
    id: "SRC-GDRIVE-NTER-CHNG-WORKING-COMPILATION-2010-2011",
    title: "NTER CHNG working prompt and exhibit-description compilation",
    organization: "NTER CHNG",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation: "Protected NTER CHNG working compilation, reviewed July 15, 2026.",
    publicNote: "The working compilation preserves a 2010 exhibit description, joint creator credit, social-information-space framing, candidate prompts, and response material while requiring strict contact and message privacy.",
    locator: "Exhibit-information and prompt-response sections; phone numbers and message text excluded from the repository.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-15-GDRIVE-NTER-CHNG-WORKING-COMPILATION"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex Google Docs close reading"],
    supportsGenerally: [
      "joint creator credit for Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      "project language describing software and architectural installation",
      "project framing of private one-to-one texting becoming shared many-to-many dialogue",
      "project framing of NTER CHNG as a social information space",
      "existence of 2011 prompt and response development material"
    ],
    doesNotEstablish: [
      "sole authorship by Jamie",
      "the provenance or public publication status of every compiled paragraph",
      "the identity, consent, or public status of message contributors",
      "permission to publish phone numbers or message text",
      "that every candidate prompt or response appeared in the exhibition",
      "the division of technical labor among collaborators"
    ],
    protectedLocatorId: "GDRIVE-NTER-CHNG-WORKING-COMPILATION-2010-2011-001"
  }
] satisfies SourceRecord[];

export const googleDriveArchiveClaims = [
  {
    id: "CLM-196-RESIDENCY-ONBOARDING-OPERATIONS",
    project: "196-sunday-dinner",
    claimType: "role",
    internalClaim: "Jamie operated a 196 Artists Residency onboarding workflow that included proposal review, invitations, artist check-ins, space configuration, and access coordination.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [{ key: "archive-note", text: "Operated artist-residency onboarding across proposal review, invitations, check-ins, space configuration, and access coordination.", status: "hold", citationRequired: false, surfaces: [] }],
    evidence: [{ sourceId: "SRC-GDRIVE-196-ACCEPTANCE-WORKFLOW-2023", relationship: "private-support", supports: ["Jamie's role", "proposal review", "onboarding", "space and access logistics"], locator: "Acceptance and logistics paragraphs.", confidence: "high", renderCitation: false }],
    boundaries: ["The record demonstrates one operational workflow, not every residency or participant outcome; participant identity and access instructions remain private."],
    antiClaims: ["Jamie alone created every resident's work or the record proves a residency-wide participation total."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Google Drive close reading"]
  },
  {
    id: "CLM-FAIR-RENT-EVENT-VISUAL-ARCHIVE",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "The Fair Rent NYC shared drive preserves 42 photograph files and two launch-video files from a February 2026 event workflow for later rights-aware editorial review.",
    status: "confirmed-with-boundary",
    publicationStatus: "protected",
    editorialStatus: "candidate",
    projections: [],
    evidence: [{ sourceId: "SRC-GDRIVE-FAIR-RENT-EVENT-VISUALS-2026", relationship: "private-support", supports: ["visual archive", "file counts", "event-workflow context"], confidence: "high", renderCitation: false }],
    boundaries: ["Metadata does not establish image content, attendance, credit, consent, or public-use rights."],
    antiClaims: ["The files are approved portfolio images or document 42 distinct participants or events."],
    researchInquiryIds: ["INQ-GDRIVE-FAIR-RENT-VISUAL-RIGHTS"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Google Drive metadata review"]
  },
  {
    id: "CLM-SUNDAY-DINNER-ZOOM-ARCHIVE-DEPTH",
    project: "196-sunday-dinner",
    claimType: "activity",
    internalClaim: "The Sunday Dinner shared drive preserves 33 Zoom video, conversion, and split-archive assets as a substantial but not yet reconstructed audiovisual record.",
    status: "confirmed-with-boundary",
    publicationStatus: "protected",
    editorialStatus: "candidate",
    projections: [],
    evidence: [{ sourceId: "SRC-GDRIVE-SUNDAY-DINNER-ZOOM-ARCHIVE-2023", relationship: "private-support", supports: ["archive existence", "33-asset count", "media types"], confidence: "high", renderCitation: false }],
    boundaries: ["The asset count is not an event, attendance, participant, or outcome count; recordings require reconstruction and consent review."],
    antiClaims: ["Sunday Dinner held 33 Zoom events or every recording is safe to publish."],
    researchInquiryIds: ["INQ-GDRIVE-SUNDAY-DINNER-ZOOM-RECONSTRUCTION"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Google Drive metadata review"]
  },
  {
    id: "CLM-NTER-CHNG-ANH-RESTAGING-PLAN",
    project: "creative-technical-systems",
    claimType: "activity",
    internalClaim: "An April 2011 working document records NTER CHNG's planned America: Now and Here restaging as an integrated software, projection, networking, architectural-wall, gallery-installation, and teardown workflow.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [{
      sourceId: "SRC-GDRIVE-NTER-CHNG-ANH-INSTALL-PLAN-2011",
      relationship: "private-support",
      supports: ["restaging plan", "technical and physical workstreams", "collective interview planning", "installation and teardown workflow"],
      locator: "Pre-prep through teardown sections.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The document establishes contemporaneous planning, not completion of every task or the final allocation of work.",
      "It does not assign all software, fabrication, transport, installation, gallery, or teardown labor to Jamie."
    ],
    antiClaims: [
      "Jamie alone restaged NTER CHNG for America: Now and Here.",
      "Every checklist item was completed exactly as planned.",
      "The working plan is an exhibition contract, commission, or final production report."
    ],
    researchInquiryIds: ["INQ-GDRIVE-NTER-CHNG-WORKING-ARTIFACTS"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex Google Docs close reading"]
  },
  {
    id: "CLM-NTER-CHNG-SOCIAL-INFORMATION-SPACE-FRAMING",
    project: "creative-technical-systems",
    claimType: "activity",
    internalClaim: "A private NTER CHNG working compilation frames the installation as a social information space that makes a private one-to-one text exchange public and many-to-many, while preserving joint credit for Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
    status: "use-with-care",
    publicationStatus: "protected",
    editorialStatus: "candidate",
    projections: [],
    evidence: [{
      sourceId: "SRC-GDRIVE-NTER-CHNG-WORKING-COMPILATION-2010-2011",
      relationship: "private-support",
      supports: ["project design framing", "joint creator credit", "candidate prompt and response development"],
      locator: "Exhibit-information and prompt-response sections, with personal data excluded.",
      confidence: "moderate",
      renderCitation: false
    }],
    boundaries: [
      "The compilation may combine exhibit copy, collaborator language, prompts, and response material; it does not establish sole prose authorship or the public provenance of every passage.",
      "Phone numbers, message text, contributor identities, and consent status remain protected."
    ],
    antiClaims: [
      "Jamie solely authored the NTER CHNG exhibit description or every compiled message.",
      "Every response was publicly submitted, displayed, or approved for republication.",
      "Personal contact information or message text belongs in the public repository."
    ],
    researchInquiryIds: ["INQ-GDRIVE-NTER-CHNG-WORKING-ARTIFACTS"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex Google Docs close reading"]
  }
] satisfies ClaimRecord[];

export const googleDriveArchiveResearchInquiries = [
  {
    id: "INQ-GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO",
    project: "wowlist",
    intakeIds: ["INT-2026-07-14-GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO"],
    question: "What publicly defensible claims, speaker credits, and interface evidence can the 2015 WOW List member-meeting video support?",
    methods: ["Verified the shared-drive file title, media type, size, and project context.", "Deferred content claims until transcription and visual review."],
    runAt: "2026-07-14",
    resultStatus: "inconclusive",
    findings: ["A 2015 member-meeting video exists and is a high-value orientation source candidate."],
    limitations: ["The video was not transcribed in this pass.", "Speaker, participant, and image rights have not been reviewed.", "Metadata alone cannot support substantive meeting claims."],
    sourceIds: ["SRC-GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO-2015"],
    publicSummary: "A 2015 WOW List member-meeting video is queued for transcription and rights-aware review.",
    protectedLocatorId: "GDRIVE-WOWLIST-MEMBER-MEETING-VIDEO-2015-001"
  },
  {
    id: "INQ-GDRIVE-FAIR-RENT-VISUAL-RIGHTS",
    project: "nyc-artist-coalition",
    intakeIds: ["INT-2026-07-14-GDRIVE-FAIR-RENT-EVENT-VISUALS"],
    question: "Which February 2026 Fair Rent NYC event images and videos are accurate, credited, consented, and useful for the portfolio?",
    methods: ["Inventoried direct child metadata for the shared-drive Photo and Video folders.", "Recorded asset counts without exposing Drive identifiers.", "Deferred visual interpretation and publication."],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: ["The source folder contains 42 photograph files and two video files.", "The archive is large enough for a dedicated rights-aware photo-editor pass."],
    limitations: ["No image was selected or published in this pass.", "Photographer credit, subject consent, caption accuracy, and rights remain unresolved.", "Filename timestamps do not independently prove event chronology."],
    sourceIds: ["SRC-GDRIVE-FAIR-RENT-EVENT-VISUALS-2026"],
    publicSummary: "A 44-file visual set is available for rights-aware editorial review; no asset is approved yet.",
    protectedLocatorId: "GDRIVE-FAIR-RENT-EVENT-VISUALS-2026-001"
  },
  {
    id: "INQ-GDRIVE-SUNDAY-DINNER-ZOOM-RECONSTRUCTION",
    project: "196-sunday-dinner",
    intakeIds: ["INT-2026-07-14-GDRIVE-SUNDAY-DINNER-ZOOM-ARCHIVE"],
    question: "How many distinct Sunday Dinner sessions and public-safe project moments can be reconstructed from the 33 stored Zoom-related assets?",
    methods: ["Inventoried direct child metadata, media types, sizes, and dates.", "Separated split-archive parts and conversion files from distinct-event claims.", "Deferred content inspection and participant identification."],
    runAt: "2026-07-14",
    resultStatus: "inconclusive",
    findings: ["Thirty-three stored assets demonstrate substantial archival depth.", "The filenames include split ZIPs, converted videos, and a Zoom conversion artifact, so asset count cannot equal event count."],
    limitations: ["The archive has not been reconstructed.", "Participant consent and public-use status are unknown.", "Large on-demand files require a dedicated materialization and inspection pass."],
    sourceIds: ["SRC-GDRIVE-SUNDAY-DINNER-ZOOM-ARCHIVE-2023"],
    publicSummary: "The Zoom archive is substantial but not yet reconstructed into distinct events or approved public evidence.",
    protectedLocatorId: "GDRIVE-SUNDAY-DINNER-ZOOM-ARCHIVE-2023-001"
  },
  {
    id: "INQ-GDRIVE-NTER-CHNG-WORKING-ARTIFACTS",
    project: "creative-technical-systems",
    intakeIds: [
      "INT-2026-07-15-GDRIVE-NTER-CHNG-ANH-INSTALL-PLAN",
      "INT-2026-07-15-GDRIVE-NTER-CHNG-WORKING-COMPILATION"
    ],
    question: "What do the newly surfaced NTER CHNG working documents establish about the 2011 restaging workflow, project language, collaborator roles, and safe public use?",
    methods: [
      "Read both native Google Docs through the connected Google Docs API.",
      "Separated planned work from completed installation evidence and individual responsibility.",
      "Separated exhibit-description language from prompt and response material.",
      "Excluded Drive identifiers, phone numbers, message text, and personal contact details from the public repository."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The install plan documents a cross-disciplinary restaging workflow spanning software, hardware, networking, projection, wall construction, gallery installation, fine-tuning, and teardown.",
      "The working compilation preserves joint creator credit and a social-information-space framing of the installation.",
      "Existing public organizer evidence independently confirms NTER CHNG's inclusion and participant use at America: Now and Here, but the private plan alone does not prove every task was completed as written."
    ],
    limitations: [
      "Neither document assigns every workstream to an individual collaborator.",
      "The working compilation does not establish the provenance or public publication status of every paragraph.",
      "Prompt responses contain personal contact information and message content that remain protected.",
      "Collaborator confirmation and public production records would strengthen division-of-labor claims."
    ],
    sourceIds: [
      "SRC-GDRIVE-NTER-CHNG-ANH-INSTALL-PLAN-2011",
      "SRC-GDRIVE-NTER-CHNG-WORKING-COMPILATION-2010-2011"
    ],
    publicSummary: "Two protected NTER CHNG working documents deepen the production and design record while leaving individual labor, authorship, and response-publication questions open.",
    protectedLocatorId: "GDRIVE-NTER-CHNG-WORKING-ARTIFACTS-2010-2011-001"
  }
] satisfies ResearchInquiry[];
