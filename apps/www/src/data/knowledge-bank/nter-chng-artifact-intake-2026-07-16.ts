import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const nterChngArtifactSourceRecords20260716 = [
  {
    id: "SRC-NTERCHNG-ANH-INSTALLER-WORKING-DOC-2011",
    title: "NTER CHNG Installer",
    organization: "NTER CHNG",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-16",
    publicCitation: "NTER CHNG production working document, 2011 (protected project archive).",
    publicNote: "Google Drive metadata records the document's creation in April 2011. The close-read document is a production plan for staging NTER CHNG for America: Now and Here; its private link and underlying file identifier remain outside the repository.",
    supportsGenerally: [
      "a planned America: Now and Here staging at Leedy-Voulkos",
      "a planned April 22, 2011 installation start",
      "a production scope spanning organizer permissions, software reliability, hosting, display equipment, projection, fabrication, transport, wiring, and gallery-experience tuning"
    ],
    doesNotEstablish: [
      "that the installation occurred at Leedy-Voulkos exactly as planned",
      "that every listed task was completed",
      "the public opening or closing dates",
      "the individual division of labor among Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      "that the available document content is unchanged from its creation date; revision history was not available in the current review"
    ],
    protectedLocatorId: "PROTECTED-NTERCHNG-ANH-INSTALLER-WORKING-DOC"
  },
  {
    id: "SRC-NTERCHNG-EXHIBIT-INFORMATION-WORKING-DOC-2011",
    title: "NTER CHNG 2010/2011 exhibit working document",
    organization: "NTER CHNG",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-16",
    publicCitation: "NTER CHNG exhibit-information working document, 2010-2011 (protected project archive).",
    publicNote: "Google Drive metadata records the document's creation in April 2011. A section labeled January 2010 Exhibit Information records dates, collective credit, the interaction model, the team's combined production backgrounds, and a statement attributed to Jamie. Phone numbers and message-level material remain protected.",
    supportsGenerally: [
      "January 8-29, 2010 as the dates recorded in the first-party exhibit-information section",
      "collective credit to Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      "the real-time participatory text-messaging interaction model",
      "the team's combined scenic-design, computer-programming, motion-graphics, and experiential-production range",
      "the presence of a statement attributed to Jamie about inviting visitors beyond their existing contact lists"
    ],
    doesNotEstablish: [
      "independent verification of the January 2010 dates",
      "that the exhibit-information text was published as a press release",
      "which collaborator contributed each named production discipline",
      "the identity, consent, or visitor status of people associated with the message samples",
      "visitor counts, message counts, or measured impact",
      "that the available document content is unchanged from its creation date; revision history was not available in the current review"
    ],
    protectedLocatorId: "PROTECTED-NTERCHNG-EXHIBIT-INFORMATION-WORKING-DOC"
  }
] satisfies SourceRecord[];

export const nterChngArtifactClaimRecords20260716 = [
  {
    id: "CLM-NTERCHNG-ORIGINAL-RUN-DATES-2010",
    project: "nter-chng",
    internalClaim: "A protected first-party exhibit-information record identifies NTER CHNG's original exhibit run as January 8-29, 2010.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "A surviving first-party exhibit-information record dates the original NTER CHNG run to January 8-29, 2010.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-NTERCHNG-EXHIBIT-INFORMATION-WORKING-DOC-2011",
      relationship: "private-support",
      supports: ["January 8-29, 2010 recorded exhibit dates"],
      locator: "section labeled January 2010 Exhibit Information",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The dates come from a protected first-party working document, not independent institutional or press corroboration.",
      "The available revision history could not verify when the exhibit-information passage was first written."
    ],
    antiClaims: [
      "An independent public source confirms the January 8-29, 2010 run.",
      "The working document proves the exhibition opened and closed exactly on those dates.",
      "The exhibit-information passage is a recovered published press release."
    ],
    researchInquiryIds: ["INQ-NTERCHNG-WORKING-DOCUMENTS-2026"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex protected-archive review"]
  },
  {
    id: "CLM-NTERCHNG-ANH-PRODUCTION-PLAN-2011",
    project: "nter-chng",
    internalClaim: "An April 2011 working document planned an America: Now and Here staging of NTER CHNG at Leedy-Voulkos beginning April 22, with organizer, software, hosting, hardware, projection, fabrication, transport, wiring, and gallery-experience work.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "A surviving production plan shows the NTER CHNG team coordinating software, spatial fabrication, equipment, transport, installation, and public-experience details for an America: Now and Here staging.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-NTERCHNG-ANH-INSTALLER-WORKING-DOC-2011",
      relationship: "private-support",
      supports: [
        "planned America: Now and Here staging",
        "Leedy-Voulkos as the planned install site",
        "planned April 22 installation start",
        "cross-functional production scope"
      ],
      locator: "staging heading, pre-prep, prep, install, and remaining-tasks sections",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The source is a plan and task list, not a completion report or installation photograph.",
      "Treat the scope as collective team production; the document does not establish the individual task allocation among named collaborators.",
      "Leedy-Voulkos and April 22 are planned installation details, not independently observed presentation facts."
    ],
    antiClaims: [
      "NTER CHNG was definitively installed or opened at Leedy-Voulkos on April 22, 2011.",
      "Jamie personally completed every listed production task.",
      "Every software, equipment, fabrication, and installation element was delivered exactly as planned."
    ],
    researchInquiryIds: ["INQ-NTERCHNG-WORKING-DOCUMENTS-2026"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex protected-archive review"]
  },
  {
    id: "CLM-NTERCHNG-CROSS-DISCIPLINARY-PRODUCTION-2010",
    project: "nter-chng",
    internalClaim: "A protected exhibit-information record describes Drew Bolton, Jamie Burkart, and Garrett Fuselier as combining backgrounds in scenic design, computer programming, motion graphics, and experiential production to create NTER CHNG's social information space.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "The three-person team combined scenic, software, motion, and experiential production practices to build a participatory social information space.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-NTERCHNG-EXHIBIT-INFORMATION-WORKING-DOC-2011",
      relationship: "private-support",
      supports: ["the four named production disciplines", "collective interdisciplinary framing"],
      locator: "January 2010 Exhibit Information, collective production paragraph",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The source attributes the combined range to the trio collectively.",
      "Do not map any one discipline to a particular collaborator without another record or collaborator confirmation."
    ],
    antiClaims: [
      "Jamie alone provided the programming, scenic design, motion graphics, or experiential production.",
      "The working document establishes the collaborators' individual task split.",
      "The interdisciplinary description is independent external evaluation of the team's work."
    ],
    researchInquiryIds: ["INQ-NTERCHNG-WORKING-DOCUMENTS-2026"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex protected-archive review"]
  }
] satisfies ClaimRecord[];

export const nterChngArtifactResearchInquiries20260716 = [
  {
    id: "INQ-NTERCHNG-WORKING-DOCUMENTS-2026",
    project: "nter-chng",
    question: "What can two newly surfaced NTER CHNG Google Docs establish about the original exhibition and the 2011 America: Now and Here staging?",
    methods: [
      "Close-read both supplied documents through Jamie's authenticated Google Drive connection.",
      "Reviewed file metadata for titles and creation dates without copying private file identifiers into the repository.",
      "Checked the available Drive revision-history endpoint for both documents.",
      "Compared the working records with the previously recovered public NTER CHNG and America: Now and Here pages.",
      "Ran bounded exact-name public-web searches for the January 2010 dates and the Leedy-Voulkos staging.",
      "Attempted a dated Leedy-Voulkos Wayback/CDX query; the request timed out before returning an inventory.",
      "Separated project planning, first-party exhibit information, public corroboration, and protected message-level material."
    ],
    runAt: "2026-07-16",
    resultStatus: "partially-recovered",
    findings: [
      "One working document plans an America: Now and Here staging at Leedy-Voulkos beginning April 22, 2011.",
      "Its checklist spans organizer permissions, software reliability, hosting, display equipment, projection, fabrication, transport, wiring, and final gallery-experience tuning.",
      "The second document contains a section labeled January 2010 Exhibit Information that records an original January 8-29, 2010 run.",
      "That exhibit-information section credits Drew Bolton, Jamie Burkart, and Garrett Fuselier collectively and describes their combined scenic-design, computer-programming, motion-graphics, and experiential-production range.",
      "The document preserves a statement attributed to Jamie about inviting gallery visitors beyond their existing contact lists, but no recovered public publication currently establishes where that statement appeared.",
      "The bounded exact-name public-web search did not recover an independent January 2010 listing or a Leedy-Voulkos NTER CHNG page.",
      "The connector returned no available revision history for either document."
    ],
    limitations: [
      "The installation plan does not establish that every task was completed or that the presentation occurred exactly as planned.",
      "The exhibit-information record is first-party evidence; the January 2010 dates still need independent public corroboration before prominent projection.",
      "File creation metadata does not prove that every current passage has remained unchanged since 2011.",
      "The records do not assign individual production disciplines or tasks among the three collaborators.",
      "Phone numbers, message samples, private links, and underlying Google file identifiers remain protected.",
      "The Wayback/CDX request timed out, so the relevant gallery-domain archive was not fully enumerated in this pass.",
      "A publicly recoverable press release, exhibition checklist, installation photograph, or collaborator confirmation could resolve remaining presentation details."
    ],
    sourceIds: [
      "SRC-NTERCHNG-ANH-INSTALLER-WORKING-DOC-2011",
      "SRC-NTERCHNG-EXHIBIT-INFORMATION-WORKING-DOC-2011",
      "SRC-NTERCHNG-PROJECT-SITE-2011",
      "SRC-NTERCHNG-ANH-ARTIST-PAGE-2011"
    ],
    publicSummary: "Protected NTER CHNG working documents recover original exhibit dates and a detailed America: Now and Here production plan while leaving completion, individual task allocation, and public corroboration open.",
    protectedLocatorId: "RESEARCH-NTERCHNG-WORKING-DOCUMENTS-2026"
  }
] satisfies ResearchInquiry[];

export const nterChngArtifactIntakeRecords20260716 = [
  {
    id: "INTAKE-NTERCHNG-ANH-INSTALLER-WORKING-DOC-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Jamie Burkart and Codex protected-archive review",
    kind: "artifact-lead",
    title: "NTER CHNG America: Now and Here installer working document",
    publicSafeSummary: "A protected April 2011 working document plans an America: Now and Here staging of NTER CHNG and records a cross-functional production checklist.",
    whyItMatters: "Adds operational evidence for an early practice spanning software, spatial fabrication, equipment, logistics, installation sequencing, and the public experience without converting a plan into a completion claim.",
    projectHints: ["nter-chng", "america-now-and-here", "participatory-systems"],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-NTERCHNG-ANH-INSTALLER-WORKING-DOC-2011"],
    claimIds: ["CLM-NTERCHNG-ANH-PRODUCTION-PLAN-2011"],
    inquiryIds: ["INQ-NTERCHNG-WORKING-DOCUMENTS-2026"],
    limitations: ["The document is a production plan, not a completion report, and does not allocate every task to a named collaborator."],
    nextActions: ["Seek a public checklist, installation photograph, program record, or collaborator confirmation before projecting the planned venue and date as completed presentation facts."]
  },
  {
    id: "INTAKE-NTERCHNG-EXHIBIT-INFORMATION-WORKING-DOC-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Jamie Burkart and Codex protected-archive review",
    kind: "artifact-lead",
    title: "NTER CHNG 2010/2011 exhibit working document",
    publicSafeSummary: "A protected working document contains first-party January 2010 exhibit information, collective project credit, a cross-disciplinary production description, and a statement attributed to Jamie.",
    whyItMatters: "Recovers exact original-run dates and richer production context while keeping message samples, phone numbers, private links, and unverified publication history protected.",
    projectHints: ["nter-chng", "participatory-systems"],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-NTERCHNG-EXHIBIT-INFORMATION-WORKING-DOC-2011"],
    claimIds: [
      "CLM-NTERCHNG-ORIGINAL-RUN-DATES-2010",
      "CLM-NTERCHNG-CROSS-DISCIPLINARY-PRODUCTION-2010"
    ],
    inquiryIds: ["INQ-NTERCHNG-WORKING-DOCUMENTS-2026"],
    limitations: ["The first-party record does not independently corroborate the dates, assign the named disciplines to individual collaborators, or establish that its Jamie-attributed statement was publicly released."],
    nextActions: ["Recover a public press release, exhibition listing, catalog, or collaborator note before selecting the dates, quote, or individual contribution details for a public surface."]
  }
] satisfies IntakeRecord[];
