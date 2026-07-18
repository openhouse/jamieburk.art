import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = ["Jamie Burkart", "Codex Google Drive archival review"];

export const googleDriveProductionBatch20260714: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
} = {
  intake: [
    {
      id: "INT-GDRIVE-SHARED-DRIVES-APPRAISAL-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "Google Drive Shared Drives archival-production pass",
      publicSafeSummary:
        "Appraise a large Shared Drive collection for project evidence, collaborator handoff systems, public-safe claims, research leads, and records that require protection.",
      projects: ["portfolio-archive"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: ["SRC-GDRIVE-SHARED-DRIVES-APPRAISAL-2026"],
      claimIds: [],
      researchTaskIds: [],
      notes: [
        "The appraisal inventories records at fonds level, close-reads selected project records, and excludes personal, family, legal, recovery, account-access, and unconsented participant material from the public repository."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "INT-GDRIVE-FAIRRENT-WEB-RELAUNCH-2023",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "FairRentNYC Shared Drive implementation record",
      publicSafeSummary:
        "Recover Jamie's bounded implementation role in a 2023 FairRentNYC website relaunch while preserving collaborator credit and private operating details.",
      projects: ["fair-rent-nyc"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: ["SRC-GDRIVE-FAIRRENT-WEB-RELAUNCH-2023"],
      claimIds: ["CLM-FAIRRENT-WEB-RELAUNCH-2023"],
      researchTaskIds: [],
      notes: [
        "Account-access details, contact details, meeting access, private campaign operations, and raw revision contents remain outside the repository."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "INT-GDRIVE-196-RESIDENCY-WORKFLOW-2023-2025",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "196 Artists Residency Shared Drive records",
      publicSafeSummary:
        "Document a repeatable artist-residency acceptance, onboarding, access, and collaborator-handoff workflow without publishing resident-specific records.",
      projects: ["196-sunday-dinner"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-GDRIVE-196-ACCEPTANCE-ONBOARDING-2023",
        "SRC-GDRIVE-196-COLLABORATION-ARCHITECTURE-2023-2025"
      ],
      claimIds: ["CLM-196-RESIDENCY-ONBOARDING-WORKFLOW"],
      researchTaskIds: ["TASK-GDRIVE-196-COLLABORATOR-PERMISSIONS"],
      notes: [
        "Resident names, proposals, contact information, access instructions, scans, images, and videos remain protected pending consent and rights review."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "INT-GDRIVE-VACANCY-CORPUS-2005-2025",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "Vacancy Data Shared Drive inventory",
      publicSafeSummary:
        "Count and date a structured research corpus of quarterly public business-vacancy snapshots while preserving government data provenance.",
      projects: ["commercial-rent-data"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: ["SRC-GDRIVE-VACANCY-CORPUS-2005-2025"],
      claimIds: ["CLM-VACANCY-QUARTERLY-CORPUS"],
      researchTaskIds: [],
      notes: [
        "The inventory establishes corpus assembly and date coverage, not data authorship, cleaning, analysis, publication, or City adoption."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "INT-GDRIVE-OPEN-DATA-WEEK-CONTEXT-2026",
      kind: "claim-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "NYC Open Data Week Shared Drive and public-web research",
      publicSafeSummary:
        "Research the public presentation context for Jamie's commercial-vacancy and lease-cost pilot brief without converting a private distribution note into an event credit.",
      projects: ["commercial-rent-data"],
      status: "decomposed",
      disposition: "research-queued",
      sourceIds: ["SRC-GDRIVE-OPEN-DATA-WEEK-CONTEXT-2026"],
      claimIds: ["CLM-OPEN-DATA-WEEK-PRESENTATION-CONTEXT"],
      researchTaskIds: ["TASK-OPEN-DATA-WEEK-PUBLIC-LISTING"],
      notes: [
        "The brief supports preparation and intended sharing in a School of Data context; an authoritative public event listing or organizer confirmation was not recovered."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "INT-GDRIVE-SUNDAY-DINNER-GUEST-OPERATIONS-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "Sunday Dinner Shared Drive appraisal",
      publicSafeSummary:
        "Recognize a structured invitation, response, and attendance workflow without ingesting a private guest roster or contact history.",
      projects: ["sunday-dinner"],
      status: "held",
      disposition: "no-action",
      sourceIds: [],
      claimIds: [],
      researchTaskIds: [],
      notes: [
        "The sheet contains names, phone numbers, email addresses, social handles, invitations, responses, and attendance history. No rows, counts, locators, or participant facts enter the public repository."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "INT-GDRIVE-CALLNYC-EDITORIAL-DRAFT-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "CallNYC Shared Drive editorial draft",
      publicSafeSummary:
        "Reconcile a self-authored LinkedIn project draft with the existing public-source-backed CallNYC record.",
      projects: ["callnyc"],
      status: "integrated",
      disposition: "duplicate",
      sourceIds: [],
      claimIds: ["CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"],
      researchTaskIds: [],
      notes: [
        "The draft is useful editorial synthesis but not independent evidence; existing public sources remain canonical."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-GDRIVE-SHARED-DRIVES-APPRAISAL-2026",
      title: "Google Drive Shared Drives fonds-level appraisal",
      author: "Jamie Burkart with Codex archival review",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14",
      publicCitation:
        "Public-safe appraisal of 110 Google Drive Shared Drives accessible to Jamie Burkart, reviewed July 14, 2026; underlying drives, names, and locators not published.",
      publicNote:
        "The drive count describes the appraised records environment, not 110 professional projects or claims. High-signal project records were sampled selectively; personal and sensitive classes were excluded.",
      supportsGenerally: [
        "a large versioned collaboration and project-record environment",
        "project, collaborator-handoff, research, media, administrative, and recovery record classes",
        "selective archival appraisal rather than wholesale ingestion"
      ],
      doesNotEstablish: [
        "110 completed projects",
        "Jamie's authorship of every file",
        "permission to publish participant or collaborator records",
        "completeness of every drive"
      ],
      protectedLocatorId: "GDRIVE-FONDS-APPRAISAL-2026-001"
    },
    {
      id: "SRC-GDRIVE-FAIRRENT-WEB-RELAUNCH-2023",
      title: "FairRentNYC web relaunch implementation record",
      author: "Jamie Burkart and campaign collaborator",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2023-02-03",
      publicCitation:
        "Public-safe aggregate review of a versioned FairRentNYC website implementation record from January-February 2023; private operating details not published.",
      publicNote:
        "The record preserves shared work and names a February 1, 2023, site-live milestone. It does not establish sole authorship or expose campaign administration.",
      supportsGenerally: [
        "a versioned website relaunch checklist",
        "Jamie's sustained revision and implementation activity",
        "a February 1, 2023, site-live milestone",
        "coordination across website, campaign-call, join, press, action, form, and document work"
      ],
      doesNotEstablish: [
        "sole authorship of the website or campaign",
        "a complete contributor roster",
        "ownership of campaign strategy",
        "permission to publish account-access details, meeting access, contacts, or private notes"
      ],
      protectedLocatorId: "GDRIVE-FAIRRENT-WEB-RELAUNCH-2023-001"
    },
    {
      id: "SRC-GDRIVE-196-ACCEPTANCE-ONBOARDING-2023",
      title: "196 Artists Residency acceptance and onboarding template",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2023-07-19",
      publicCitation:
        "Public-safe aggregate review of a Jamie-authored 196 Artists Residency acceptance and onboarding record, July 2023; resident-specific content not published.",
      publicNote:
        "Revision history attributes both reviewed revisions to Jamie. The record supports workflow design, not ownership of a resident's proposal, practice, or personal history.",
      supportsGenerally: [
        "Jamie evaluated a portfolio and proposal",
        "acceptance communication",
        "video orientation",
        "space configuration",
        "independent-access and key handoff planning"
      ],
      doesNotEstablish: [
        "ownership of resident work",
        "a complete residency history",
        "permission to identify the resident",
        "permission to publish access instructions or contact details"
      ],
      protectedLocatorId: "GDRIVE-196-ACCEPTANCE-ONBOARDING-2023-001"
    },
    {
      id: "SRC-GDRIVE-196-COLLABORATION-ARCHITECTURE-2023-2025",
      title: "196 Artists Residency collaborator-workspace architecture",
      author: "Jamie Burkart and participating artists",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14",
      publicCitation:
        "Public-safe structural appraisal of 196 Artists Residency Shared Drive workspaces spanning 2023-2025; collaborator names and contents not published.",
      publicNote:
        "At least eight dedicated collaborator workspaces preserve dated project folders and media handoffs. Folder structure supports repeatability, not Jamie's authorship of collaborator work.",
      supportsGenerally: [
        "at least eight dedicated resident or collaborator workspaces",
        "dated project folders spanning 2023-2025",
        "separate scans, photographs, video, film, and select workflows",
        "a reusable collaboration and handoff pattern"
      ],
      doesNotEstablish: [
        "Jamie's authorship of artist work",
        "a complete resident roster",
        "permission to name collaborators",
        "rights or consent to publish media"
      ],
      protectedLocatorId: "GDRIVE-196-COLLABORATION-ARCHITECTURE-2026-001"
    },
    {
      id: "SRC-GDRIVE-VACANCY-CORPUS-2005-2025",
      title: "Quarterly HUD-USPS business-vacancy research corpus",
      author: "Jamie Burkart, corpus assembly; HUD and USPS, source data",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14",
      publicCitation:
        "Public-safe inventory of Jamie Burkart's structured HUD-USPS business-vacancy research corpus: 81 unique quarterly snapshots from Q4 2005 through Q4 2025; underlying working files not published.",
      publicNote:
        "HUD and USPS are the government data originators. The inventory supports corpus assembly, organization, and coverage only.",
      supportsGenerally: [
        "81 unique quarterly snapshots",
        "continuous quarter labels from Q4 2005 through Q4 2025",
        "organization into three dated collection bands",
        "a 20-year longitudinal working corpus"
      ],
      doesNotEstablish: [
        "Jamie's creation of the government data",
        "data cleaning or validation",
        "completed analysis",
        "a production data pipeline",
        "City adoption or publication"
      ],
      protectedLocatorId: "GDRIVE-VACANCY-CORPUS-2026-001"
    },
    {
      id: "SRC-GDRIVE-OPEN-DATA-WEEK-CONTEXT-2026",
      title: "Commercial vacancy pilot brief distribution context",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-03-27",
      publicCitation:
        "Public-safe review of Jamie Burkart's March 2026 commercial-vacancy pilot brief and its School of Data distribution note; underlying Shared Drive record not published.",
      publicNote:
        "The brief establishes authorship, proposal content, and intended sharing context. It does not establish a formal Open Data Week speaking slot or completed presentation.",
      supportsGenerally: [
        "Jamie authored the commercial-vacancy and lease-cost pilot brief",
        "the brief was prepared for sharing in a School of Data context",
        "a companion visual-media collection exists for editorial review"
      ],
      doesNotEstablish: [
        "a formal Open Data Week presentation",
        "an organizer-confirmed event listing",
        "audience size",
        "agency endorsement",
        "permission to publish event photographs"
      ],
      protectedLocatorId: "GDRIVE-OPEN-DATA-WEEK-CONTEXT-2026-001"
    }
  ],
  sourceAssertions: [
    {
      id: "AST-GDRIVE-FONDS-SELECTIVE-APPRAISAL",
      sourceId: "SRC-GDRIVE-SHARED-DRIVES-APPRAISAL-2026",
      project: "portfolio-archive",
      assertion:
        "The review inventoried 110 accessible Shared Drives, then close-read selected civic, cultural, research, and collaborator-handoff records while excluding personal and sensitive classes from ingestion.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-GDRIVE-FAIRRENT-RELAUNCH-MILESTONE",
      sourceId: "SRC-GDRIVE-FAIRRENT-WEB-RELAUNCH-2023",
      project: "fair-rent-nyc",
      assertion:
        "A 16-revision shared implementation record documents Jamie's sustained work with a campaign collaborator and marks the FairRentNYC website live on February 1, 2023.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-FAIRRENT-WEB-RELAUNCH-2023"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-GDRIVE-FAIRRENT-RELAUNCH-SCOPE",
      sourceId: "SRC-GDRIVE-FAIRRENT-WEB-RELAUNCH-2023",
      project: "fair-rent-nyc",
      assertion:
        "The relaunch checklist connects website implementation with campaign calls, join and action forms, press materials, public documents, and follow-through work.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-FAIRRENT-WEB-RELAUNCH-2023"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-GDRIVE-196-ACCEPTANCE-ONBOARDING",
      sourceId: "SRC-GDRIVE-196-ACCEPTANCE-ONBOARDING-2023",
      project: "196-sunday-dinner",
      assertion:
        "A Jamie-authored acceptance record makes the residency handoff explicit through proposal review, orientation, space configuration, and independent-access planning.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-196-RESIDENCY-ONBOARDING-WORKFLOW"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-GDRIVE-196-DEDICATED-WORKSPACES",
      sourceId: "SRC-GDRIVE-196-COLLABORATION-ARCHITECTURE-2023-2025",
      project: "196-sunday-dinner",
      assertion:
        "At least eight dedicated resident or collaborator workspaces preserve a repeatable 2023-2025 structure for dated project folders and media handoffs.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-196-RESIDENCY-ONBOARDING-WORKFLOW"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-GDRIVE-VACANCY-CORPUS-81-QUARTERS",
      sourceId: "SRC-GDRIVE-VACANCY-CORPUS-2005-2025",
      project: "commercial-rent-data",
      assertion:
        "The inventory contains 81 unique quarterly HUD-USPS business-vacancy snapshots from Q4 2005 through Q4 2025 after removing the four-quarter 2012 overlap between collection bands.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-VACANCY-QUARTERLY-CORPUS"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-GDRIVE-VACANCY-CORPUS-PROVENANCE-BOUNDARY",
      sourceId: "SRC-GDRIVE-VACANCY-CORPUS-2005-2025",
      project: "commercial-rent-data",
      assertion:
        "HUD and USPS originated the government data; the reviewed Shared Drive establishes Jamie's corpus assembly and organization, not authorship of the source records or a completed production pipeline.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-VACANCY-QUARTERLY-CORPUS"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-GDRIVE-OPEN-DATA-WEEK-CONTEXT",
      sourceId: "SRC-GDRIVE-OPEN-DATA-WEEK-CONTEXT-2026",
      project: "commercial-rent-data",
      assertion:
        "Jamie's brief says it was being shared in a School of Data context, but the reviewed record does not establish a formal Open Data Week event credit.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-OPEN-DATA-WEEK-PRESENTATION-CONTEXT"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-FAIRRENT-WEB-RELAUNCH-2023",
      project: "fair-rent-nyc",
      internalClaim:
        "Jamie helped coordinate and implement a February 2023 FairRentNYC website relaunch through a versioned shared checklist spanning web updates, public action tools, campaign calls, press materials, forms, documents, and follow-through.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "Jamie helped coordinate and implement FairRentNYC's February 2023 website relaunch through a versioned shared checklist connecting web updates, public action tools, campaign calls, press materials, forms, and follow-through.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "technical-operations",
          text:
            "Helped coordinate and implement a campaign-site relaunch through a versioned checklist spanning web, calls, forms, press materials, public documents, and follow-through.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/technical-operations"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-GDRIVE-FAIRRENT-WEB-RELAUNCH-2023",
          relationship: "direct-support",
          supports: [
            "Jamie's sustained revision activity",
            "shared implementation scope",
            "February 1, 2023, site-live milestone"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The record documents shared implementation with a campaign collaborator and does not establish sole authorship, the full contributor roster, or ownership of campaign strategy."
      ],
      antiClaims: [
        "Jamie alone relaunched FairRentNYC",
        "Jamie authored every campaign asset",
        "The private implementation record may be published",
        "A website relaunch proves a policy outcome"
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-196-RESIDENCY-ONBOARDING-WORKFLOW",
      project: "196-sunday-dinner",
      internalClaim:
        "Jamie authored and used a repeatable artist-residency acceptance and onboarding workflow covering proposal review, orientation, space configuration, independent access, and dedicated collaborator workspaces.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "Jamie made artist-residency handoffs repeatable through a documented acceptance and onboarding workflow for proposal review, orientation, space configuration, independent access, and dedicated collaboration workspaces.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/196-sunday-dinner"]
        },
        {
          key: "technical-operations",
          text:
            "Built a repeatable residency acceptance and onboarding workflow, with dedicated collaboration workspaces supporting project and media handoffs.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/technical-operations"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-GDRIVE-196-ACCEPTANCE-ONBOARDING-2023",
          relationship: "direct-support",
          supports: [
            "Jamie's authorship",
            "proposal review",
            "orientation",
            "space configuration",
            "access handoff"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-GDRIVE-196-COLLABORATION-ARCHITECTURE-2023-2025",
          relationship: "corroborating",
          supports: [
            "dedicated collaboration workspaces",
            "dated project structures",
            "media handoff patterns"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Resident names, proposals, images, access details, and private communications remain protected; the workflow does not make Jamie the author or owner of resident work."
      ],
      antiClaims: [
        "Jamie owns resident work",
        "The collaborator archive is public",
        "Every residency followed an identical process",
        "Participant names or media are approved for publication"
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-VACANCY-QUARTERLY-CORPUS",
      project: "commercial-rent-data",
      internalClaim:
        "Jamie assembled and organized a structured working corpus of 81 unique quarterly HUD-USPS business-vacancy snapshots spanning Q4 2005 through Q4 2025.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "Jamie assembled a 20-year working corpus of 81 quarterly HUD-USPS business-vacancy snapshots, organized from Q4 2005 through Q4 2025 for longitudinal research.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "technical-operations",
          text:
            "Assembled and organized 81 quarterly HUD-USPS business-vacancy snapshots into a 20-year longitudinal research corpus.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/technical-operations"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-GDRIVE-VACANCY-CORPUS-2005-2025",
          relationship: "direct-support",
          supports: [
            "81 unique quarter labels",
            "Q4 2005 through Q4 2025 coverage",
            "structured corpus organization"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "HUD and USPS originated the government data. The archive establishes corpus assembly and organization, not data authorship, completed validation or analysis, a production pipeline, or agency adoption."
      ],
      antiClaims: [
        "Jamie created the HUD-USPS data",
        "The corpus is a validated production dataset",
        "The archive proves completed analysis",
        "The City adopted or published Jamie's corpus"
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-OPEN-DATA-WEEK-PRESENTATION-CONTEXT",
      project: "commercial-rent-data",
      internalClaim:
        "Jamie's March 2026 commercial-vacancy brief identifies a School of Data sharing context, but an authoritative public listing or organizer confirmation for a formal Open Data Week presentation was not recovered.",
      status: "not-recovered",
      maturity: "research-needed",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The formal public-event context for Jamie's March 2026 commercial-vacancy brief remains a research question.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-GDRIVE-OPEN-DATA-WEEK-CONTEXT-2026",
          relationship: "private-support",
          supports: ["Jamie's authorship", "intended School of Data sharing context"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "A private distribution note and related media do not independently establish a formal event slot, presentation completion, audience, or institutional endorsement."
      ],
      antiClaims: [
        "Jamie formally presented at NYC Open Data Week",
        "An organizer confirmed Jamie's event role",
        "The event endorsed the proposal",
        "The related photographs are cleared for publication"
      ],
      researchInquiryIds: ["INQ-OPEN-DATA-WEEK-PUBLIC-LISTING-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-OPEN-DATA-WEEK-PUBLIC-LISTING",
      project: "commercial-rent-data",
      question:
        "What authoritative public event record or organizer confirmation establishes Jamie's role in the March 2026 School of Data / NYC Open Data Week context?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Search official organizer and event archives by date, title, and participant name",
        "Review preserved program materials and event correspondence without publishing private messages",
        "Seek organizer confirmation if no public listing survives",
        "Separate brief preparation, informal sharing, and formal presentation credit"
      ],
      successCriteria: [
        "Recover an authoritative dated listing or attributable organizer confirmation",
        "Identify the exact event format and Jamie's role",
        "Preserve institutional and collaborator credit",
        "Keep the claim held if formal event status remains unconfirmed"
      ],
      sourceIds: ["SRC-GDRIVE-OPEN-DATA-WEEK-CONTEXT-2026"],
      claimIds: ["CLM-OPEN-DATA-WEEK-PRESENTATION-CONTEXT"],
      publicSummary:
        "Recover authoritative event context before projecting a formal Open Data Week presentation credit.",
      reviewedAt: "2026-07-14"
    },
    {
      id: "TASK-GDRIVE-196-COLLABORATOR-PERMISSIONS",
      project: "196-sunday-dinner",
      question:
        "Which 196 Artists Residency collaborators wish to approve a named project example, artifact, or image for the public portfolio?",
      priority: "low",
      status: "queued",
      methodsPlanned: [
        "Prepare a bounded consent request with the exact proposed wording and media",
        "Confirm creator, rights-holder, subject, and public-display permission",
        "Offer unnamed or no-publication options",
        "Record approvals without publishing private correspondence"
      ],
      successCriteria: [
        "Each proposed example has explicit wording and media approval",
        "Creator and collaborator credit is complete",
        "Rights and consent status are recorded",
        "Non-response is not treated as permission"
      ],
      sourceIds: [
        "SRC-GDRIVE-196-ACCEPTANCE-ONBOARDING-2023",
        "SRC-GDRIVE-196-COLLABORATION-ARCHITECTURE-2023-2025"
      ],
      claimIds: ["CLM-196-RESIDENCY-ONBOARDING-WORKFLOW"],
      publicSummary:
        "Seek collaborator-specific approval before adding named 196 residency examples or media to the public portfolio.",
      reviewedAt: "2026-07-14"
    }
  ],
  researchInquiries: [
    {
      id: "INQ-OPEN-DATA-WEEK-PUBLIC-LISTING-2026",
      project: "commercial-rent-data",
      question:
        "Was an authoritative public event listing for Jamie's March 2026 School of Data / NYC Open Data Week role recovered in this archival-production pass?",
      methods: [
        "Close-read the Shared Drive brief and related project/media folders.",
        "Searched the public web for Jamie Burkart, the brief title, commercial vacancy, School of Data, and NYC Open Data Week combinations.",
        "Distinguished Jamie-authored profile material from organizer or institutional records."
      ],
      runAt: "2026-07-14",
      resultStatus: "not-recovered",
      findings: [
        "The brief establishes Jamie's authorship and says it was being shared in a School of Data context.",
        "Related event-week media exists in the Shared Drive.",
        "No authoritative organizer listing or independent event-role confirmation was recovered in this pass."
      ],
      limitations: [
        "Negative search does not prove that no listing or presentation existed.",
        "Self-authored profile material is not independent event confirmation.",
        "Private correspondence was not treated as public proof."
      ],
      sourceIds: ["SRC-GDRIVE-OPEN-DATA-WEEK-CONTEXT-2026"],
      publicSummary:
        "The brief and media establish preparation and sharing context, but no authoritative public record of a formal event role was recovered.",
      protectedLocatorId: "RESEARCH-OPEN-DATA-WEEK-PUBLIC-LISTING-2026-001"
    }
  ]
};
