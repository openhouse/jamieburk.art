import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const intakeRecords = [
  {
    id: "INTAKE-2026-07-15-ICLOUD-TEAMS-DEEPENING",
    receivedAt: "2026-07-15",
    kind: "artifact",
    project: "portfolio-source-coverage",
    publicSummary:
      "A second selective pass across Jamie Projects History, CRS, and job-hunt converted three previously descriptive proof relationships into structured source records: a protected legislative provenance redline prepared by Jamie, a public Sunday Dinner hundredth-iteration trace, and a public-safe AI Evals course-completion certificate.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: [
      "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
      "SRC-SUNDAY-DINNER-HUNDREDTH-PROJECT-PAGE",
      "SRC-MAVEN-AI-EVALS-COMPLETION-CERTIFICATE"
    ],
    claimIds: [
      "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
      "CLM-SUNDAY-DINNER-HUNDREDTH-ITERATION-TRACE",
      "CLM-AI-EVALS-COURSE-COMPLETION"
    ],
    researchInquiryIds: ["INQ-ICLOUD-TEAMS-DEEPENING-2026-07-15"],
    projectionIntent: "candidate-for-public-surface",
    nextActions: [
      "Seek a separately publishable provenance-redline excerpt or collaborator review before rendering a public citation to the protected policy artifact.",
      "Use the Sunday Dinner page as a hundredth-iteration floor, not as proof of the 300-plus aggregate, attendance, or an exact event date.",
      "Use the certificate for completion and instructor attribution only; keep the 2026 date and curriculum detail tied to separately approved resume or course records."
    ],
    protectedLocatorId: "LOC-ICLOUD-TEAMS-DEEPENING-2026-07-15",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated iCloud archival review"]
  }
] satisfies IntakeRecord[];

const sources = [
  {
    id: "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
    title: "Commercial Rent Stabilization legislative provenance redline, 2019-2025",
    organization: "NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-05-16",
    accessedAt: "2026-07-15",
    publicCitation:
      "Jamie Burkart, Commercial Rent Stabilization legislative provenance redline, updated May 16, 2026. Protected archive; no public link.",
    publicNote:
      "The tracked-change document identifies Jamie as preparer and makes source layers visible from City Council Intro 93 through Fair Rent NYC recommendations, Small Business Survival Act lineage, and Albany Senate Bill S8319 revisions.",
    protectedLocatorId: "LOC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
    supportsGenerally: [
      "Jamie prepared the legislative provenance redline",
      "the redline begins with City Council Intro 93 and preserves successive source layers",
      "the source layers include Fair Rent NYC's 2022 recommendations, Small Business Survival Act lineage, and 2025 Albany revisions leading to Senate Bill S8319",
      "tracked changes are used to distinguish policy inheritance and revision paths"
    ],
    doesNotEstablish: [
      "official legislative history or official legal analysis",
      "Jamie's authorship of the underlying bill language or source texts",
      "legal advice, bill ownership, coalition-wide adoption, or government endorsement",
      "that every reviewer label identifies an individual drafting author",
      "passage, implementation, or a policy outcome"
    ]
  },
  {
    id: "SRC-SUNDAY-DINNER-HUNDREDTH-PROJECT-PAGE",
    title: "Sunday Dinner 100 by Julia Fredenburg",
    organization: "Sunday Dinner",
    kind: "personal-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://sundaydinnernyc.com/post/141014586691/sunday-dinner-100-by-julia-fredenburg",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Sunday Dinner, 'Sunday Dinner 100 by Julia Fredenburg,' public project page.",
    publicNote:
      "The live project page identifies a numbered hundredth Sunday Dinner and credits the displayed image to Julia Fredenburg.",
    supportsGenerally: [
      "a public project trace labeled Sunday Dinner 100",
      "Julia Fredenburg's visible image credit",
      "a minimum floor of one hundred numbered Sunday Dinner iterations"
    ],
    doesNotEstablish: [
      "the date or attendance of the hundredth gathering",
      "the later 300-plus aggregate",
      "Jamie's sole hosting, production, or authorship",
      "permission to republish the image"
    ]
  },
  {
    id: "SRC-MAVEN-AI-EVALS-COMPLETION-CERTIFICATE",
    title: "AI Evals for Engineers & PMs certificate of completion",
    organization: "Maven",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    accessedAt: "2026-07-15",
    publicCitation:
      "Maven, AI Evals for Engineers & PMs certificate of completion issued to James Burkart.",
    publicNote:
      "The public-safe certificate states that James Burkart completed AI Evals for Engineers & PMs, taught by Hamel Husain and Shreya Shankar. The certificate does not display a completion date.",
    protectedLocatorId: "LOC-MAVEN-AI-EVALS-CERTIFICATE",
    supportsGenerally: [
      "James Burkart completed AI Evals for Engineers & PMs",
      "the certificate identifies Hamel Husain and Shreya Shankar as instructors",
      "Maven issued the completion certificate"
    ],
    doesNotEstablish: [
      "the completion date",
      "the detailed curriculum, assignments, score, or proficiency level",
      "professional certification as an AI evaluator",
      "an employment, teaching, or institutional affiliation with Maven or the instructors"
    ]
  }
] satisfies SourceRecord[];

const claims = [
  {
    id: "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
    project: "commercial-rent-stabilization",
    internalClaim:
      "In 2026 Jamie prepared a tracked-change legislative provenance redline that begins with New York City Council Intro 93 and distinguishes successive source layers from Fair Rent NYC's 2022 recommendations, Small Business Survival Act lineage, and 2025 Albany revisions leading to Senate Bill S8319.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Jamie prepared a legislative provenance redline tracing Commercial Rent Stabilization language from City Council Intro 93 through Fair Rent NYC recommendations, Small Business Survival Act lineage, and Albany Senate Bill S8319 revisions.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "technical-operations",
        text: "Prepared a tracked-change legislative provenance redline that made source layers and revision paths visible across city, campaign, and state policy texts.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
        relationship: "private-support",
        supports: [
          "Jamie's preparer credit, the tracked-change method, and the named sequence of policy source layers"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe Jamie as the preparer of the provenance redline, not the author of the underlying legislation or source texts.",
      "Reviewer labels identify source layers and do not necessarily identify individual drafting authors.",
      "The document is an unofficial working artifact, not legal advice or an official legislative history.",
      "Do not expose protected strategy, correspondence, comments, or legal-review context."
    ],
    antiClaims: [
      "Jamie authored Commercial Rent Stabilization legislation",
      "Jamie produced official legislative history or legal advice",
      "The redline proves coalition adoption, government endorsement, passage, or implementation"
    ],
    proofClaimIds: ["fair-rent-source-map"],
    researchInquiryIds: ["INQ-ICLOUD-TEAMS-DEEPENING-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated iCloud archival review"]
  },
  {
    id: "CLM-SUNDAY-DINNER-HUNDREDTH-ITERATION-TRACE",
    project: "sunday-dinner",
    internalClaim:
      "Sunday Dinner's live project archive contains a page labeled Sunday Dinner 100 and credits its displayed image to Julia Fredenburg, establishing a public minimum floor of one hundred numbered iterations without establishing attendance, an exact event date, or the later 300-plus aggregate.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "A live Sunday Dinner project page preserves a numbered hundredth iteration and credits Julia Fredenburg's image; it does not establish attendance or the later aggregate scale.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-SUNDAY-DINNER-HUNDREDTH-PROJECT-PAGE",
        relationship: "direct-support",
        supports: [
          "the Sunday Dinner 100 label and Julia Fredenburg image credit"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use one hundred as a documented iteration floor, not as physical attendance or proof of the 300-plus aggregate.",
      "Credit Julia Fredenburg and do not infer Jamie's sole hosting, production, or authorship.",
      "Do not republish the image without a separate rights review."
    ],
    antiClaims: [
      "The page proves 300-plus Sunday Dinner gatherings",
      "One hundred people attended the documented gathering",
      "Jamie solely created or hosted every iteration"
    ],
    proofClaimIds: ["sunday-dinner-196-participation-infrastructure"],
    researchInquiryIds: ["INQ-ICLOUD-TEAMS-DEEPENING-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated iCloud archival review"]
  },
  {
    id: "CLM-AI-EVALS-COURSE-COMPLETION",
    project: "ai-evals-professional-development",
    internalClaim:
      "A Maven certificate of completion issued to James Burkart states that he completed AI Evals for Engineers & PMs, taught by Hamel Husain and Shreya Shankar; the certificate itself does not display a completion date or detailed curriculum.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "resume-html",
        text: "Completed AI Evals for Engineers & PMs with Hamel Husain and Shreya Shankar through Maven.",
        status: "active",
        citationRequired: false,
        surfaces: ["/resume"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-MAVEN-AI-EVALS-COMPLETION-CERTIFICATE",
        relationship: "direct-support",
        supports: ["course completion, course title, instructor names, and Maven issuance"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use the certificate for completion, course title, instructor names, and Maven issuance only.",
      "Keep the 2026 date and detailed curriculum tied to separately approved resume or course records.",
      "Describe this as professional development, not professional certification, employment, teaching, or institutional affiliation."
    ],
    antiClaims: [
      "Jamie is a certified AI evaluator",
      "Jamie taught or was employed by Maven",
      "The certificate proves a completion date, curriculum, score, or proficiency level"
    ],
    proofClaimIds: ["ai-evals-professional-development"],
    researchInquiryIds: ["INQ-ICLOUD-TEAMS-DEEPENING-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ClaimRecord[];

const researchInquiries = [
  {
    id: "INQ-ICLOUD-TEAMS-DEEPENING-2026-07-15",
    project: "portfolio-source-coverage",
    question:
      "Which additional public-safe source relationships can a second selective pass across Jamie Projects History, CRS, and job-hunt add without treating cloud custody, resume language, or private working material as proof?",
    methods: [
      "Verified the three target folders through the authenticated iCloud Drive interface and used the local synchronized archive for bounded close reading.",
      "Reviewed each archive's overview or orientation before opening selected project, policy, resume, and preparation artifacts.",
      "Revisited the source-coverage backlog and selected claims whose existing public wording could be connected to a stronger primary, project, or credential artifact.",
      "Compared the protected provenance redline with its public-safe overview conversion, verified the live Sunday Dinner project page, and visually inspected the Maven completion certificate.",
      "Kept private paths, cloud identifiers, contact details, correspondence, participant content, and raw working files outside the repository."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The prior Teams archive pass remains sound: Jamie Projects History is strongest for public project traces, CRS for protected operating and policy artifacts, and job-hunt for research routing rather than independent proof.",
      "The protected provenance redline directly identifies Jamie as preparer and makes a specific 2019-2025 policy-lineage method visible without establishing legal authorship or official status.",
      "The live Sunday Dinner page supplies a second public project trace for a numbered hundredth iteration and visibly credits Julia Fredenburg.",
      "The Maven certificate directly supports course completion, course title, instructor names, and issuer, while leaving the date and detailed curriculum to separate records.",
      "The job-hunt dossier accurately routes these claims but remains derivative; no resume sentence was promoted merely because it appeared in an approved resume."
    ],
    limitations: [
      "This was a targeted source-coverage pass, not a full-population read of every Teams record.",
      "Cloud and local directory listings may differ while files materialize; missing local content was not treated as nonexistence.",
      "The provenance redline is a protected project artifact, not independent reporting or official legal analysis.",
      "The Sunday Dinner page establishes an ordinal floor but not attendance, date, or total lifetime scale.",
      "The completion certificate displays no date or curriculum detail and does not establish professional certification."
    ],
    sourceIds: [
      "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
      "SRC-SUNDAY-DINNER-HUNDREDTH-PROJECT-PAGE",
      "SRC-MAVEN-AI-EVALS-COMPLETION-CERTIFICATE"
    ],
    publicSummary:
      "A second selective Teams pass connected three existing proof areas to stronger structured evidence while preserving protected policy context, image rights, credential limits, and the derivative status of job-search language.",
    protectedLocatorId: "LOC-ICLOUD-TEAMS-DEEPENING-2026-07-15"
  }
] satisfies ResearchInquiry[];

export const teamsArchiveDeepeningBatch = {
  intakeRecords,
  sources,
  claims,
  researchInquiries
};
