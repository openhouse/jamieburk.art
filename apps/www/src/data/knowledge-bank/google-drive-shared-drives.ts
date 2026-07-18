import type { KnowledgeBank } from "./schema.ts";

export const googleDriveIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-2026-07-15-GOOGLE-DRIVE-HANDOFF-PRACTICE",
    receivedAt: "2026-07-15",
    inputKind: "document",
    summary: "A privacy-first review of Jamie's project Shared Drives corroborated his cross-device and collaborator handoff practice without exposing workspace or artifact metadata.",
    projectIds: ["collaborative-operations"],
    researchStatus: "researched",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [
      "SRC-JAMIE-SHARED-DRIVE-PRACTICE-2026-07-15",
      "SRC-GDRIVE-PORTFOLIO-ARCHIVE-REVIEW-2026-07-15"
    ],
    observationIds: [
      "OBS-GDRIVE-JAMIE-HANDOFF-PRACTICE",
      "OBS-GDRIVE-ARCHIVE-CROSS-PROJECT-PATTERN"
    ],
    claimIds: ["CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE"],
    researchInquiryIds: ["INQ-GDRIVE-COLLABORATOR-MEDIA-REVIEW-2026"],
    nextActions: [
      "Request collaborator confirmation before turning archive structure into claims about shared adoption, authorship, or outcomes.",
      "Review visual or audiovisual artifacts only when a specific portfolio need justifies a source-by-source rights and consent check.",
      "Keep Drive names, file names, IDs, URLs, collaborators, private folder structures, access details, contact data, strategy, participant media, and raw records outside the public repository."
    ]
  },
  {
    id: "INTAKE-2026-07-15-GOOGLE-DRIVE-PORTFOLIO-PROJECTIONS",
    receivedAt: "2026-07-15",
    inputKind: "document",
    summary: "Close reading of protected project records strengthened FairRentNYC implementation and 196 Artists Residency onboarding claims for selective website projection.",
    projectIds: ["196-sunday-dinner", "fair-rent-nyc", "nyc-artist-coalition"],
    researchStatus: "researched",
    publicationStatus: "projected",
    sourceIds: [
      "SRC-GDRIVE-FAIR-RENT-IMPLEMENTATION-2023",
      "SRC-GDRIVE-196-ONBOARDING-2023"
    ],
    observationIds: [
      "OBS-GDRIVE-FAIR-RENT-DELIVERY-STATE",
      "OBS-GDRIVE-196-ONBOARDING-WORKFLOW"
    ],
    claimIds: [
      "CLM-FAIR-RENT-WEB-IMPLEMENTATION-2023",
      "CLM-196-ARTIST-RESIDENCY-ONBOARDING-2023"
    ],
    researchInquiryIds: [],
    nextActions: [
      "Keep FairRentNYC administration details and raw working records protected.",
      "Do not describe work recorded as open as completed.",
      "Keep 196 participant identity, contact information, access details, and private materials protected."
    ]
  }
];

export const googleDriveSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-JAMIE-SHARED-DRIVE-PRACTICE-2026-07-15",
    title: "Jamie Burkart account of Shared Drive handoff practice",
    organization: "Jamie Burkart",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Received 2026-07-15",
    publicCitation: "Jamie Burkart, description of his Shared Drive handoff practice, July 15, 2026.",
    publicNote: "First-person description of using project and collaborator workspaces to support cross-device continuity and handoffs.",
    supportsGenerally: [
      "Jamie's stated cross-device and collaborator handoff practice",
      "the intended operational purpose of separate project workspaces"
    ],
    doesNotEstablish: [
      "that Jamie created or owns every accessible workspace",
      "collaborator adoption or satisfaction",
      "authorship of every artifact",
      "permission to publish underlying records"
    ],
    protectedLocatorId: "LOC-JAMIE-GDRIVE-PRACTICE-2026-07-15"
  },
  {
    id: "SRC-GDRIVE-PORTFOLIO-ARCHIVE-REVIEW-2026-07-15",
    title: "Protected Shared Drive portfolio-archive review",
    organization: "Jamie Burkart project archive",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Reviewed 2026-07-15",
    publicCitation: "Jamie Burkart project archive, privacy-first Shared Drive review, July 15, 2026.",
    publicNote: "Cross-project review confirmed a recurring pattern of separate project and collaborator workspaces while deliberately withholding account and file metadata.",
    supportsGenerally: [
      "project-specific and collaborator-specific workspace patterns",
      "cross-project handoff and archival continuity"
    ],
    doesNotEstablish: [
      "Jamie's creation or ownership of every workspace",
      "authorship, rights, or consent for underlying artifacts",
      "completeness or current activity of every project",
      "permission to expose private archive structure"
    ],
    protectedLocatorId: "LOC-GDRIVE-PORTFOLIO-ARCHIVE-REVIEW-2026-07-15"
  },
  {
    id: "SRC-GDRIVE-FAIR-RENT-IMPLEMENTATION-2023",
    title: "Protected FairRentNYC implementation record",
    organization: "Fair Rent NYC / NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2023 record reviewed 2026-07-15",
    publicCitation: "Fair Rent NYC, protected web implementation record, 2023; reviewed July 15, 2026.",
    publicNote: "Dated working record documenting a site-live state, an administrative handoff, restored campaign email service, and a clear distinction between completed and open work.",
    supportsGenerally: [
      "a FairRentNYC site-live state in 2023",
      "an administrative handoff",
      "restored campaign email service",
      "completed and open work recorded separately"
    ],
    doesNotEstablish: [
      "completion of items still recorded as open",
      "sole authorship of campaign policy, copy, visual assets, or organizing",
      "current administration or system details",
      "independent audit of the project-produced record"
    ],
    protectedLocatorId: "LOC-GDRIVE-FAIR-RENT-IMPLEMENTATION-2023"
  },
  {
    id: "SRC-GDRIVE-196-ONBOARDING-2023",
    title: "Protected 196 Artists Residency onboarding record",
    organization: "196 Artists Residency",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2023 record reviewed 2026-07-15",
    publicCitation: "Jamie Burkart, protected 196 Artists Residency onboarding record, 2023; reviewed July 15, 2026.",
    publicNote: "Signed record documenting invitation, pre-arrival space planning, and independent access arrangements for one accepted residency.",
    supportsGenerally: [
      "Jamie issued an artist-residency acceptance in 196's name",
      "Jamie planned the space around the accepted project's needs",
      "the onboarding process included independent access arrangements"
    ],
    doesNotEstablish: [
      "the total number of resident artists",
      "the complete selection process",
      "the outcome of the accepted residency",
      "permission to identify the participant or expose private access information"
    ],
    protectedLocatorId: "LOC-GDRIVE-196-ONBOARDING-2023"
  }
];

export const googleDriveObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-GDRIVE-JAMIE-HANDOFF-PRACTICE",
    sourceId: "SRC-JAMIE-SHARED-DRIVE-PRACTICE-2026-07-15",
    project: "collaborative-operations",
    text: "Jamie describes using separate project and collaborator workspaces so work can move among devices and can be handed off without depending on one machine.",
    locator: "First-person account of Shared Drive practice",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "OBS-GDRIVE-ARCHIVE-CROSS-PROJECT-PATTERN",
    sourceId: "SRC-GDRIVE-PORTFOLIO-ARCHIVE-REVIEW-2026-07-15",
    project: "collaborative-operations",
    text: "A privacy-first cross-project review corroborated a recurring pattern of separate project and collaborator workspaces used for working artifacts, handoffs, and documentation continuity.",
    locator: "Account-level classification and selected project review",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE"],
    researchInquiryIds: ["INQ-GDRIVE-COLLABORATOR-MEDIA-REVIEW-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex Google Drive connector review"]
  },
  {
    id: "OBS-GDRIVE-FAIR-RENT-DELIVERY-STATE",
    sourceId: "SRC-GDRIVE-FAIR-RENT-IMPLEMENTATION-2023",
    project: "fair-rent-nyc",
    text: "A dated 2023 working record documents a FairRentNYC site-live state, an administrative handoff, restored campaign email service, and a distinction between completed and still-open work.",
    locator: "Dated implementation entries and checklist",
    status: "verified",
    confidence: "high",
    claimIds: [
      "CLM-FAIR-RENT-WEB-IMPLEMENTATION-2023",
      "CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP"
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-GDRIVE-196-ONBOARDING-WORKFLOW",
    sourceId: "SRC-GDRIVE-196-ONBOARDING-2023",
    project: "196-sunday-dinner",
    text: "A 2023 record signed by Jamie in 196 Artists Residency's name documents one accepted residency's invitation, pre-arrival space planning, and independent access arrangements.",
    locator: "Acceptance and onboarding paragraphs",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-196-ARTIST-RESIDENCY-ONBOARDING-2023"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  }
];

export const googleDriveClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE",
    project: "collaborative-operations",
    internalClaim: "Jamie uses separate project and collaborator Shared Drives as a cross-device handoff, working-artifact, and archival-continuity layer across his work.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Jamie maintains separate project and collaborator workspaces as a cross-device handoff and archival-continuity layer.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/intake/2026-07-15-google-drive-shared-drives"]
    }],
    evidence: [
      {
        sourceId: "SRC-JAMIE-SHARED-DRIVE-PRACTICE-2026-07-15",
        relationship: "direct-support",
        supports: ["Jamie's intended cross-device and collaborator handoff practice"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-GDRIVE-PORTFOLIO-ARCHIVE-REVIEW-2026-07-15",
        relationship: "corroborating",
        supports: ["separate project workspaces", "separate collaborator workspaces", "cross-project archival continuity"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The review establishes accessible structure, not Jamie's creation or ownership of every workspace.",
      "Do not infer authorship, collaborator adoption, quality, or outcomes from workspace membership or artifact presence alone.",
      "Private and collaborator-sensitive records remain outside the public repository."
    ],
    antiClaims: [
      "Jamie created or owns every accessible Shared Drive.",
      "Jamie authored every artifact in the reviewed workspaces.",
      "The Shared Drives are publicly browsable.",
      "Every collaborator approved public use of underlying records."
    ],
    researchInquiryIds: ["INQ-GDRIVE-COLLABORATOR-MEDIA-REVIEW-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex Google Drive connector review"]
  },
  {
    id: "CLM-FAIR-RENT-WEB-IMPLEMENTATION-2023",
    project: "fair-rent-nyc",
    internalClaim: "Jamie built the FairRentNYC campaign site, and a dated 2023 working record documents a site-live state, an administrative handoff, restored campaign email service, and still-open work.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "A dated 2023 implementation record documents a FairRentNYC site-live state, an administrative handoff, and restored campaign email service, while clearly separating completed work from open tasks.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "archive-note",
        text: "A protected 2023 implementation record corroborates Jamie's FairRentNYC site authorship with a dated delivery state and an explicit open-work boundary.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCA-JAMIE-CAMPAIGN-SITE-AUTHORSHIP-2026-07-13",
        relationship: "direct-support",
        supports: ["Jamie's FairRentNYC website authorship"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-GDRIVE-FAIR-RENT-IMPLEMENTATION-2023",
        relationship: "direct-support",
        supports: ["dated site-live state", "administrative handoff", "restored email service", "open-work boundary"],
        locator: "Dated implementation entries and checklist",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The source is a protected project-produced working record, not an independent implementation audit.",
      "Work still recorded as open must not be described as completed.",
      "Do not publish administration details or raw working records.",
      "Website authorship remains distinct from sole authorship of campaign policy, copy, design assets, or collective outcomes."
    ],
    antiClaims: [
      "Jamie completed every item in the Fair Rent web record.",
      "Jamie solely led Fair Rent NYC.",
      "The protected implementation record is public.",
      "Historical administration details are current."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex protected-document review"]
  },
  {
    id: "CLM-196-ARTIST-RESIDENCY-ONBOARDING-2023",
    project: "196-sunday-dinner",
    internalClaim: "A 2023 record signed by Jamie documents 196 Artists Residency onboarding through invitation, pre-arrival space planning, and independent access arrangements for one accepted residency.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "A 2023 record signed by Jamie documents artist onboarding through invitation, pre-arrival space planning, and independent access arrangements.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/196-sunday-dinner"]
      },
      {
        key: "archive-note",
        text: "A protected 2023 record signed by Jamie confirms one 196 Artists Residency onboarding workflow: invitation, needs-based space planning, and independent access.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/196-sunday-dinner"]
      }
    ],
    evidence: [{
      sourceId: "SRC-GDRIVE-196-ONBOARDING-2023",
      relationship: "direct-support",
      supports: ["Jamie signature", "residency invitation", "pre-arrival space planning", "independent access arrangements"],
      locator: "Acceptance and onboarding paragraphs",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The record establishes one documented onboarding, not the complete residency history or aggregate resident-artist count.",
      "Participant identity, contact information, access details, collaborator media, rights, and consent remain protected."
    ],
    antiClaims: [
      "The record verifies every 196 residency.",
      "The record proves the portfolio's aggregate resident-artist total.",
      "Private access information or participant material is public."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex protected-document review"]
  }
];

export const googleDriveResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-GDRIVE-COLLABORATOR-MEDIA-REVIEW-2026",
    project: "collaborative-operations",
    question: "Which protected collaborator and media records can safely support future role, artifact, or outcome claims after source-specific authorship, rights, consent, and collaborator review?",
    methods: [
      "Begin from a specific portfolio claim rather than broadly exposing archive contents.",
      "Seek credits, provenance, collaborator confirmation, rights ownership, participant consent, and public-display approval for each selected artifact.",
      "Keep workspace access, artifact presence, authorship, rights, consent, and outcomes as separate propositions."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The privacy-first review located additional project and collaborator documentation candidates.",
      "Workspace structure can corroborate continuity and handoff practice but cannot establish artifact authorship, rights, consent, or project outcomes by itself.",
      "No collaborator-private media or low-signal archive metadata was ingested into the public repository."
    ],
    limitations: [
      "No new media-authorship, collaborator-attribution, audience, or outcome claim was promoted in this pass.",
      "Underlying workspace names, artifact metadata, collaborators, contents, and locations remain protected.",
      "Future review must be source-specific and purpose-limited."
    ],
    sourceIds: ["SRC-GDRIVE-PORTFOLIO-ARCHIVE-REVIEW-2026-07-15"],
    publicSummary: "The review located further research candidates but promoted no collaborator-media claim without source-specific authorship, rights, consent, and outcome evidence.",
    protectedLocatorId: "RESEARCH-GDRIVE-COLLABORATOR-MEDIA-REVIEW-2026"
  }
];
