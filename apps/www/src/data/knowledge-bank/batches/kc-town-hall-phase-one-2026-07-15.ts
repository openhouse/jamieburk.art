import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = ["Jamie Burkart", "Codex public-safe archival review"];

export const kcTownHallPhaseOneBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
} = {
  intake: [
    {
      id: "INT-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
      kind: "artifact-lead",
      capturedAt: "2026-07-15",
      capturedFrom: "Jamie Burkart portfolio working session",
      publicSafeSummary:
        "A 24-page 2019 CCED proposal and support-letter packet documenting KC Town Hall's project team, neighborhood process, Phase One cold-shell scope, completed-work budget, and collective public-benefit framing.",
      projects: ["kc-town-hall"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: ["SRC-KCTH-CCED-PROPOSAL-2019"],
      claimIds: [
        "CLM-KCTH-PHASE-ONE-PROJECT-MANAGEMENT",
        "CLM-KCTH-NEIGHBORHOOD-SURVEY-PROCESS"
      ],
      researchTaskIds: [
        "TASK-KCTH-PHASE-ONE-GC-CORROBORATION",
        "TASK-KCTH-SURVEY-SYSTEM-AUTHORSHIP"
      ],
      notes: [
        "Only a redacted page-level appraisal enters the public repository. The source packet remains private because its appendices contain financial and contact information.",
        "The proposal directly names Jamie and Julia as founders and project managers; it does not use the title general contractor or assign every trade-management action to Jamie.",
        "The proposal distinguishes Phase One completion from proposed Phase Two work. Do not use it to claim completion of the full redevelopment."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "INT-KCTH-NEIGHBORHOOD-OPERATIONS-RECOLLECTION-2026",
      kind: "recollection",
      capturedAt: "2026-07-15",
      capturedFrom: "Jamie Burkart portfolio working session",
      publicSafeSummary:
        "Jamie's first-person account of Phase One general-contractor duties, survey-system design, Tired of Tires field operations and expansion, and Cleveland Avenue Unify to Beautify design support.",
      projects: ["kc-town-hall"],
      status: "decomposed",
      disposition: "research-queued",
      sourceIds: ["SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026"],
      claimIds: [
        "CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
        "CLM-KCTH-SURVEY-SYSTEM-DESIGN",
        "CLM-KCTH-TIRED-OF-TIRES-FIELD-OPERATIONS",
        "CLM-KCTH-CLEVELAND-UNIFY-DESIGN-SUPPORT"
      ],
      researchTaskIds: [
        "TASK-KCTH-PHASE-ONE-GC-CORROBORATION",
        "TASK-KCTH-SURVEY-SYSTEM-AUTHORSHIP",
        "TASK-KCTH-TIRE-PROGRAM-OPERATIONS-EXPANSION",
        "TASK-KCTH-CLEVELAND-UNIFY-ROLE"
      ],
      notes: [
        "The recollection is retained as an important lead, not treated as independent confirmation.",
        "Potential corroboration includes contracts, invoices, permits, drawings, photographs, disposal records, neighborhood-association minutes, public posts, printed artifacts, and bounded collaborator notes.",
        "Any future public claim must preserve Julia's co-leadership, contractor and neighborhood-partner credit, Pastor Lee's originating corridor vision, and the City's formal decision-making role."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-KCTH-CCED-PROPOSAL-2019",
      title: "KC Town Hall Central City Economic Development proposal and support letters",
      organization: "KC Town Hall LLC",
      author: "KC Town Hall LLC and supporting letter writers",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publishedAt: "2019-03-25",
      accessedAt: "2026-07-15",
      publicCitation:
        "KC Town Hall LLC, Central City Economic Development proposal and support letters, 24-page packet, March 2019; public-safe page-level appraisal.",
      publicNote:
        "The public repository retains source identity, page-level findings, and boundaries only. The underlying packet remains private because appended letters contain financial and contact information.",
      protectedLocatorId: "ARCHIVE-KCTH-CCED-PROPOSAL-2019-001",
      supportsGenerally: [
        "Jamie Burkart and Julia Fredenburg were named founders and project managers",
        "Phase One was a cold-shell scope spanning roof, structural masonry, and floor framing",
        "the Phase One budget records work completed across 2018 and 2019",
        "KC Town Hall used a neighborhood survey with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church",
        "the proposal states ongoing survey results directly shaped the proposal"
      ],
      doesNotEstablish: [
        "the general-contractor title for Jamie",
        "that Jamie alone hired or supervised every contractor",
        "individual authorship of the survey card or data system",
        "completion of Phase Two or the full redevelopment",
        "execution, receipt, or disbursement of later CCED funding",
        "current property or project status"
      ]
    },
    {
      id: "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
      title: "Jamie Burkart KC Town Hall Phase One and neighborhood-operations recollection",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-15",
      publicCitation:
        "Jamie Burkart, first-person KC Town Hall Phase One and neighborhood-operations recollection, July 15, 2026; underlying working note not published.",
      publicNote:
        "The source preserves Jamie's first-person account as a research lead. It does not independently confirm the recalled roles, frequencies, expansions, or policy influence.",
      protectedLocatorId: "ARCHIVE-KCTH-NEIGHBORHOOD-OPERATIONS-2026-001",
      supportsGenerally: [
        "Jamie's recollection that he served as Phase One general contractor and coordinated multiple trades",
        "Jamie's recollection that he designed the neighborhood survey handbill and backing data workflow",
        "Jamie's recollection that he designed, coordinated, and physically conducted monthly Tired of Tires pickups",
        "Jamie's recollection that Tired of Tires expanded from Oak Park to Indian Mound",
        "Jamie's recollection that he co-founded Cleveland Avenue Unify to Beautify and supplied identity, photography, social, mapping, meeting, and print support"
      ],
      doesNotEstablish: [
        "independent confirmation of any recalled role",
        "sole authorship or sole operation of collective neighborhood work",
        "verified pickup totals or service outcomes",
        "that Cleveland Avenue materials caused a particular funding decision",
        "the complete participant, contractor, neighborhood, or elected-official roster"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-KCTH-CCED-FOUNDERS-PROJECT-MANAGERS",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-2019",
      project: "kc-town-hall",
      assertion:
        "The proposal's project-team page identifies Julia Fredenburg and Jamie Burkart as founders and project managers alongside named masonry, architecture, roofing, concrete, electrical, and legal contributors.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-PHASE-ONE-PROJECT-MANAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-CCED-PHASE-ONE-COMPLETION",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-2019",
      project: "kc-town-hall",
      assertion:
        "The budget section labels Phase One's cold-shell work completed in 2019 and records completed 2018 and 2019 costs for roof, masonry, and floor-framing work.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-PHASE-ONE-PROJECT-MANAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-CCED-NEIGHBORHOOD-SURVEY",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-2019",
      project: "kc-town-hall",
      assertion:
        "The proposal documents a neighborhood survey conducted with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church and states that ongoing survey results directly shaped the proposal.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-NEIGHBORHOOD-SURVEY-PROCESS"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-CCED-LISTENING-PROCESS-CORROBORATION",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-2019",
      project: "kc-town-hall",
      assertion:
        "A support letter in the packet describes Jamie and Julia as invested in a listening-driven process intended to inform renovations and center surrounding-neighborhood assets and needs.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-NEIGHBORHOOD-SURVEY-PROCESS"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-CCED-GC-BOUNDARY",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-2019",
      project: "kc-town-hall",
      assertion:
        "The proposal supports Jamie's founder and project-manager role but does not use the title general contractor or assign every trade-coordination action to him.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-JAMIE-GC-RECOLLECTION",
      sourceId: "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
      project: "kc-town-hall",
      assertion:
        "Jamie recalls serving as Phase One general contractor, hiring and coordinating historic masonry, roofing, carpentry, welding, engineering, architecture, and plumbing work, and managing daily field sequencing from basement through roof and parapet.",
      relationship: "raises-question",
      confidence: "moderate",
      candidateClaimIds: ["CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-JAMIE-SURVEY-SYSTEM-RECOLLECTION",
      sourceId: "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
      project: "kc-town-hall",
      assertion:
        "Jamie recalls designing the 4-by-6-inch survey handbill and backing data-collection system and using the cards during on-site and neighborhood fieldwork.",
      relationship: "raises-question",
      confidence: "moderate",
      candidateClaimIds: ["CLM-KCTH-SURVEY-SYSTEM-DESIGN"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-JAMIE-TIRES-OPERATIONS-RECOLLECTION",
      sourceId: "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
      project: "kc-town-hall",
      assertion:
        "Jamie recalls designing and coordinating Tired of Tires with Oak Park Neighborhood Association, conducting monthly pickups and disposal runs, and later extending the service to Indian Mound.",
      relationship: "raises-question",
      confidence: "moderate",
      candidateClaimIds: ["CLM-KCTH-TIRED-OF-TIRES-FIELD-OPERATIONS"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-JAMIE-CLEVELAND-RECOLLECTION",
      sourceId: "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
      project: "kc-town-hall",
      assertion:
        "Jamie recalls co-founding Cleveland Avenue Unify to Beautify within the Historic East Neighborhoods Coalition and supporting Pastor Lee's corridor vision with identity, photography, social media, maps, listening-session materials, and print production.",
      relationship: "raises-question",
      confidence: "moderate",
      candidateClaimIds: ["CLM-KCTH-CLEVELAND-UNIFY-DESIGN-SUPPORT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-KCTH-PHASE-ONE-PROJECT-MANAGEMENT",
      project: "kc-town-hall",
      internalClaim:
        "The 2019 CCED proposal names Jamie Burkart and Julia Fredenburg as KC Town Hall founders and project managers and records Phase One cold-shell completion in 2019 across roof, structural masonry, and floor-framing work.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "A 2019 CCED proposal names Jamie and Julia as KC Town Hall's founders and project managers and records Phase One cold-shell restoration as completed in 2019, including roof, structural-masonry, and floor-framing work.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-CCED-PROPOSAL-2019",
          relationship: "direct-support",
          supports: [
            "Jamie and Julia founder and project-manager titles",
            "Phase One cold-shell scope",
            "2019 completion label",
            "roof, structural-masonry, and floor-framing work"
          ],
          locator: "Project Narrative page 1; Finance pages 10-11",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit Julia Fredenburg as co-founder and project manager and preserve the distinct work of the masonry, architecture, roofing, concrete, electrical, legal, and other project contributors.",
        "The proposal confirms Phase One cold-shell work, not completion of Phase Two or the entire redevelopment.",
        "Use project manager unless separate evidence corroborates Jamie's recalled general-contractor title."
      ],
      antiClaims: [
        "Jamie alone founded or managed KC Town Hall",
        "Jamie personally performed every construction trade",
        "Phase Two or the full redevelopment was completed in 2019",
        "The proposal proves the general-contractor title"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVE-PASS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-KCTH-NEIGHBORHOOD-SURVEY-PROCESS",
      project: "kc-town-hall",
      internalClaim:
        "KC Town Hall used a neighborhood survey with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church, and the 2019 proposal states that ongoing survey results directly shaped the proposal.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "The project paired physical restoration with a neighborhood survey conducted with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church; the proposal states that ongoing survey results directly shaped its plans.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-CCED-PROPOSAL-2019",
          relationship: "direct-support",
          supports: [
            "neighborhood survey",
            "Oak Park Neighborhood Association partnership",
            "New Horizon Missionary Baptist Church partnership",
            "survey results shaped the proposal"
          ],
          locator: "Project Narrative page 3; support letter pages 22-23",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit the neighborhood association, church, residents, Jamie, Julia, and other participants as a collective process.",
        "The proposal does not establish the survey response count, representativeness, individual authorship of the card or database, or completion of every proposed use."
      ],
      antiClaims: [
        "Jamie alone designed and conducted the documented survey",
        "The survey was statistically representative",
        "Every proposed use was completed",
        "Neighborhood participation removes the need to credit named partners"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVE-PASS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
      project: "kc-town-hall",
      internalClaim:
        "Jamie reports that he served as general contractor for Phase One, hiring and coordinating multiple restoration trades and managing daily field sequencing.",
      status: "inference",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie's recalled Phase One general-contractor role remains held pending contracts, permits, invoices, schedules, drawings, photographs, or collaborator confirmation.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
          relationship: "private-support",
          supports: ["Jamie's first-person account of the general-contractor and field-coordination role"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-CCED-PROPOSAL-2019",
          relationship: "context",
          supports: ["founder and project-manager role", "named multi-trade team", "Phase One scope and completion"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Present general contractor as Jamie's recollection until independent project records corroborate the title and scope.",
        "Credit Julia's project management and each professional and trade team's distinct work; coordination is not personal performance of every trade."
      ],
      antiClaims: [
        "The proposal independently proves Jamie was general contractor",
        "Jamie alone completed Phase One",
        "Jamie personally performed every professional and construction trade"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVE-PASS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-KCTH-SURVEY-SYSTEM-DESIGN",
      project: "kc-town-hall",
      internalClaim:
        "Jamie reports designing the 4-by-6-inch neighborhood survey handbill and its backing data-collection workflow and carrying the cards through construction-site and neighborhood fieldwork.",
      status: "inference",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie's recalled authorship of the survey handbill and data workflow remains held pending a dated artifact, file history, project record, or collaborator confirmation.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
          relationship: "private-support",
          supports: ["Jamie's first-person account of the handbill and data-workflow design"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-CCED-PROPOSAL-2019",
          relationship: "context",
          supports: ["the visible survey artifact", "the neighborhood survey process", "survey influence on the proposal"],
          locator: "Project Narrative page 3",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The visible survey artifact and process are confirmed; Jamie-specific design and data-system authorship remain attributed memory.",
        "Preserve collective participation and do not publish resident contact or response-level data."
      ],
      antiClaims: [
        "The proposal independently identifies Jamie as sole survey designer",
        "The survey database is public",
        "The survey was statistically representative"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVE-PASS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-KCTH-TIRED-OF-TIRES-FIELD-OPERATIONS",
      project: "kc-town-hall",
      internalClaim:
        "Jamie reports designing and coordinating Tired of Tires with Oak Park Neighborhood Association, physically conducting monthly pickup and disposal runs, integrating neighborhood information distribution, and later extending service to Indian Mound.",
      status: "inference",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie's recalled Tired of Tires field-operations role and Indian Mound expansion remain held pending disposal records, schedules, photographs, neighborhood records, or collaborator confirmation.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
          relationship: "private-support",
          supports: ["Jamie's first-person account of program design, monthly field operations, information distribution, and expansion"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-WAYBACK-TIRES-2020",
          relationship: "corroborating",
          supports: ["Julia and Jamie byline", "Oak Park partnership", "monthly free tire-pickup workflow"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
          relationship: "context",
          supports: ["sustained public coordination pattern", "survey links within tire-program posts", "East Kansas City service language"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Preserve Julia's co-authorship, Oak Park Neighborhood Association's partnership, City recycling staff and infrastructure, resident participation, and any later Indian Mound partners.",
        "Do not treat shared-account posts as proof that Jamie authored every post or performed every pickup."
      ],
      antiClaims: [
        "Jamie alone created or operated Tired of Tires",
        "The current evidence independently confirms Indian Mound expansion",
        "Shared-account figures are independently verified outcomes",
        "Council replies prove endorsement or program causation"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVE-PASS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-KCTH-CLEVELAND-UNIFY-DESIGN-SUPPORT",
      project: "kc-town-hall",
      internalClaim:
        "Jamie reports co-founding Cleveland Avenue Unify to Beautify within the Historic East Neighborhoods Coalition and supporting Pastor Lee's corridor concept through brand identity, photography, social media, maps, listening-session materials, resident reporting tools, and pro bono print production.",
      status: "inference",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie's recalled Cleveland Avenue Unify to Beautify co-founding and design-support role remains held pending public artifacts, coalition records, meeting materials, or collaborator confirmation.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
          relationship: "private-support",
          supports: ["Jamie's first-person account of co-founding and multi-format design and production support"],
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit Pastor Lee with the originating Cleveland Avenue corridor vision and preserve the roles of HENC, participating neighborhood associations, residents, elected officials, and City decision-makers.",
        "Treat any relationship to discretionary capital funding as an open causal question, not a confirmed outcome."
      ],
      antiClaims: [
        "Jamie originated Pastor Lee's corridor idea",
        "Jamie alone founded or operated Cleveland Avenue Unify to Beautify",
        "The program caused a particular capital-improvement allocation",
        "Elected-official participation proves endorsement of every proposal"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVE-PASS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-KCTH-PHASE-ONE-GC-CORROBORATION",
      project: "kc-town-hall",
      question:
        "What public-safe project records or bounded collaborator notes corroborate Jamie's Phase One general-contractor title and trade-coordination scope?",
      priority: "high",
      status: "queued",
      methodsPlanned: [
        "Review public-safe contracts, invoices, permits, schedules, drawings, correspondence, photographs, and file history",
        "Request bounded confirmation from Julia and relevant Phase One contractors or professional-team members",
        "Separate owner, founder, project-manager, general-contractor, trade-contractor, architect, and engineer responsibilities"
      ],
      successCriteria: [
        "Corroborate or correct the general-contractor title with dated evidence",
        "Identify the specific coordination responsibilities Jamie performed without attributing trade work to him",
        "Preserve Julia's co-leadership and named professional and trade credit"
      ],
      sourceIds: [
        "SRC-KCTH-CCED-PROPOSAL-2019",
        "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026"
      ],
      claimIds: ["CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE"],
      publicSummary:
        "Corroborate the recalled general-contractor role and distinguish coordination from the work of each trade and professional team.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-KCTH-SURVEY-SYSTEM-AUTHORSHIP",
      project: "kc-town-hall",
      question:
        "What dated artifacts establish authorship, implementation, and use of the KC Town Hall survey handbill and backing data workflow?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Recover the print source, design files, form or spreadsheet schema, and file metadata",
        "Review photographs, posts, meeting packets, and correspondence showing field use",
        "Request bounded collaborator confirmation while preserving resident data"
      ],
      successCriteria: [
        "Identify the artifact's designer and contributors",
        "Document the collection and follow-up workflow without publishing resident-level data",
        "Separate demonstrated use from survey reach or representativeness"
      ],
      sourceIds: [
        "SRC-KCTH-CCED-PROPOSAL-2019",
        "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026"
      ],
      claimIds: ["CLM-KCTH-SURVEY-SYSTEM-DESIGN"],
      publicSummary:
        "Recover the dated survey artifact and workflow evidence while keeping resident responses and contacts private.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-KCTH-TIRE-PROGRAM-OPERATIONS-EXPANSION",
      project: "kc-town-hall",
      question:
        "What records establish Jamie's Tired of Tires field role, the monthly operating workflow, and expansion from Oak Park to Indian Mound?",
      priority: "high",
      status: "queued",
      methodsPlanned: [
        "Review pickup schedules, disposal receipts, spreadsheets, photographs, printed packets, posts, and neighborhood-association records",
        "Request bounded confirmation from Oak Park, Indian Mound, Chestnut Street Resource Center, and City collaborators where appropriate",
        "Reconcile dates, service geography, partners, and operations without relying on volatile or self-reported outcome totals"
      ],
      successCriteria: [
        "Corroborate Jamie's specific design, coordination, pickup, and disposal responsibilities",
        "Establish whether and when Indian Mound became a program partner or service area",
        "Preserve collective and City-infrastructure credit and separate operations from outcome totals"
      ],
      sourceIds: [
        "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
        "SRC-KCTH-WAYBACK-TIRES-2020",
        "SRC-KCTH-X-CORPUS-2026-07-15"
      ],
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-FIELD-OPERATIONS"],
      publicSummary:
        "Corroborate the field workflow and later service geography without converting shared-account totals into verified outcomes.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-KCTH-CLEVELAND-UNIFY-ROLE",
      project: "kc-town-hall",
      question:
        "What public artifacts and collaborator records establish Cleveland Avenue Unify to Beautify's formation, Pastor Lee's originating vision, Jamie's role, and any relationship to corridor investment decisions?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Search HENC and neighborhood-association minutes, event listings, public posts, maps, logos, photographs, handbills, and meeting packets",
        "Review file metadata and request bounded confirmation from Pastor Lee and participating collaborators where appropriate",
        "Search City budget and capital-improvement records for independently documented corridor decisions"
      ],
      successCriteria: [
        "Establish program chronology, founding contributors, and Jamie's specific design and production work",
        "Credit Pastor Lee's corridor concept and participating neighborhoods",
        "Describe public-official participation and funding decisions without inferring causation"
      ],
      sourceIds: ["SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026"],
      claimIds: ["CLM-KCTH-CLEVELAND-UNIFY-DESIGN-SUPPORT"],
      publicSummary:
        "Recover the corridor program's formation and design record while preserving origin credit and institutional decision-making boundaries.",
      reviewedAt: "2026-07-15"
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KCTH-PHASE-ONE-ARCHIVE-PASS-2026",
      project: "kc-town-hall",
      question:
        "What does the 2019 CCED proposal establish about Phase One delivery, project roles, and the neighborhood process, and what remains recollection-led?",
      methods: [
        "Rendered and visually reviewed all 24 proposal pages.",
        "Extracted and close-read project-team, neighborhood-process, finance, budget-detail, and support-letter pages.",
        "Compared the packet with the governed KC Town Hall account corpus and Jamie's July 15, 2026 recollection.",
        "Excluded private financial and contact details from the repository."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "The proposal names Jamie and Julia as founders and project managers.",
        "The proposal's budget detail records Phase One cold-shell work completed across 2018 and 2019, including roof, masonry, and floor framing.",
        "The proposal documents a partner-based neighborhood survey and states its ongoing results shaped the proposal.",
        "The proposal does not use the general-contractor title or establish Jamie-specific authorship of the survey artifact and data workflow.",
        "The reviewed public account record corroborates a sustained Tired of Tires operating surface but does not independently establish Jamie's complete field role, Indian Mound expansion, or Cleveland Avenue work."
      ],
      limitations: [
        "The source packet contains private appendices and therefore is represented only through redacted metadata and source assertions.",
        "No complete contract, permit, invoice, schedule, disposal, neighborhood-association, HENC, or collaborator-confirmation set was recovered in this pass.",
        "First-person recollection identifies research leads but cannot independently confirm collective roles or causal influence."
      ],
      sourceIds: [
        "SRC-KCTH-CCED-PROPOSAL-2019",
        "SRC-KCTH-JAMIE-NEIGHBORHOOD-OPERATIONS-2026",
        "SRC-KCTH-WAYBACK-TIRES-2020",
        "SRC-KCTH-X-CORPUS-2026-07-15"
      ],
      publicSummary:
        "The proposal confirms Jamie and Julia's founder/project-manager roles, Phase One cold-shell completion, and a neighborhood-survey process; more specific general-contractor and neighborhood-program roles remain queued for corroboration.",
      protectedLocatorId: "RESEARCH-KCTH-PHASE-ONE-ARCHIVE-PASS-2026-001"
    }
  ]
};
