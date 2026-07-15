import type {
  ClaimRecord,
  IntakeRecord,
  KnowledgeBank,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

type KcTownHallPhaseOneBatch = Pick<
  KnowledgeBank,
  "intakeRecords" | "sources" | "claims" | "researchInquiries"
>;

const intakeRecords = [
  {
    id: "INTAKE-2026-07-15-KCTOWNHALL-PHASE-ONE-PROPOSAL",
    receivedAt: "2026-07-15",
    kind: "artifact",
    project: "kc-town-hall",
    publicSummary:
      "A protected 2019 CCED proposal packet records KC Town Hall's Phase One cold-shell work as completed in 2019, itemizes roof, masonry, framing, water, access, safety, and related work, and documents a neighborhood survey process that shaped the proposal.",
    privacy: "protected",
    status: "claim-linked",
    sourceIds: ["SRC-KCTOWNHALL-CCED-PROPOSAL-2019"],
    claimIds: [
      "CLM-KCTOWNHALL-PHASE-ONE-COLD-SHELL-COMPLETION-2019",
      "CLM-KCTOWNHALL-PARTICIPATORY-SURVEY-SYSTEM-2019"
    ],
    researchInquiryIds: [
      "INQ-KCTOWNHALL-PHASE-ONE-ROLE-AND-COMPLETION-2019"
    ],
    projectionIntent: "candidate-for-public-surface",
    nextActions: [
      "Seek public permit, inspection, contract, invoice, drawing, or collaborator records that independently corroborate the Phase One completion state and Jamie's role.",
      "Reconcile the packet's conflicting Phase One totals before publishing any total-cost figure.",
      "Keep the full packet, contact details, financing records, signatures, participant information, and unreviewed photographs outside the public repository."
    ],
    protectedLocatorId: "LOC-KCTOWNHALL-CCED-PROPOSAL-2019",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "INTAKE-2026-07-15-KCTOWNHALL-PHASE-ONE-ROLE",
    receivedAt: "2026-07-15",
    kind: "memory",
    project: "kc-town-hall",
    publicSummary:
      "Jamie states that he served as Phase One's general contractor, coordinated multiple building trades from daily site work, created the neighborhood survey handbill and response system, and used his continuing site presence to listen to neighborhood histories and ideas.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: [
      "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ACCOUNT-2026",
      "SRC-KCTOWNHALL-CCED-PROPOSAL-2019"
    ],
    claimIds: [
      "CLM-KCTOWNHALL-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
      "CLM-KCTOWNHALL-PARTICIPATORY-SURVEY-SYSTEM-2019",
      "CLM-KCTOWNHALL-SITE-BASED-NEIGHBORHOOD-LISTENING"
    ],
    researchInquiryIds: [
      "INQ-KCTOWNHALL-PHASE-ONE-ROLE-AND-COMPLETION-2019"
    ],
    projectionIntent: "candidate-for-public-surface",
    nextActions: [
      "Seek contractor, architect, engineer, trade-partner, or collaborator confirmation for Jamie's general-contractor and field-coordination role.",
      "Recover a public-safe survey specimen or system diagram without participant responses or contact information.",
      "Treat neighborhood appreciation and story-sharing as Jamie's situated account unless independently attributable public records are recovered."
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex intake review"]
  }
] satisfies IntakeRecord[];

const sources = [
  {
    id: "SRC-KCTOWNHALL-CCED-PROPOSAL-2019",
    title: "KC Town Hall 2019 CCED proposal and support-letter packet",
    organization: "KC Town Hall LLC",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2019-03-25",
    accessedAt: "2026-07-15",
    publicCitation:
      "KC Town Hall, 2019 CCED proposal and support-letter packet, public-safe archival summary.",
    publicNote:
      "The packet's project narrative and budget detail record Phase One as a completed cold shell and document its neighborhood-survey and local-trade framing. The underlying file remains offline because it also contains contact, financing, signature, property, and participant information.",
    protectedLocatorId: "LOC-KCTOWNHALL-CCED-PROPOSAL-2019",
    supportsGenerally: [
      "the packet's statement that Phase One cold-shell work was completed in 2019",
      "Phase One work categories including roof deck repair, insulation and TPO membrane, masonry repair, floor framing, water service, basement egress, site safety, air-quality control, and debris removal",
      "a 2018-2019 timeline marking roof and facade work complete",
      "the project's stated use of local minority-owned contractors and masonry skills training",
      "a neighborhood survey conducted with the Oak Park Neighborhood Association and New Horizon Missionary Baptist Church",
      "the packet's statement that survey results shaped the proposal and proposed retail uses"
    ],
    doesNotEstablish: [
      "Jamie's title or responsibilities as Phase One general contractor",
      "Jamie's individual authorship of the survey handbill or backing data system",
      "an independent audit, permit closeout, or final inspection of Phase One",
      "completion of the full KC Town Hall redevelopment",
      "every trade or vendor involved in Phase One",
      "one reliable Phase One total, because the narrative and detail pages display different totals",
      "a representative survey sample, response count, consensus, or participant outcomes"
    ]
  },
  {
    id: "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ACCOUNT-2026",
    title: "Jamie Burkart first-person account of KC Town Hall Phase One",
    author: "Jamie Burkart",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    publicCitation:
      "Jamie Burkart, first-person account of KC Town Hall Phase One responsibilities, recorded July 15, 2026.",
    publicNote:
      "The account supplies Jamie's role and operating method. It is preserved as first-person evidence and paired with the 2019 project packet without being presented as independent corroboration.",
    protectedLocatorId: "LOC-KCTOWNHALL-PHASE-ONE-FIRSTPERSON-2026",
    supportsGenerally: [
      "Jamie's account that he served as Phase One general contractor in addition to other project duties",
      "Jamie's account of hiring and coordinating historic brick masonry, roofing, carpentry, welding, engineering, architecture, plumbing, and related teams",
      "Jamie's account of daily field coordination from the basement through scaffolding and roof work",
      "Jamie's account of using measured drawings and sequencing roof membrane work with restored parapet and ceramic cap work",
      "Jamie's account that he created a four-by-six-inch neighborhood survey handbill and backing data-collection system",
      "Jamie's account that sustained site presence created opportunities for neighbors to share histories, appreciation, and ideas for the building's future"
    ],
    doesNotEstablish: [
      "independent corroboration of Jamie's title, duties, or time on site",
      "a contractor-license classification or legal conclusion",
      "sole authorship of the project or sole physical performance of trade work",
      "a complete contractor or collaborator roster",
      "representative neighborhood sentiment, measured appreciation, or community consensus"
    ]
  }
] satisfies SourceRecord[];

const claims = [
  {
    id: "CLM-KCTOWNHALL-PHASE-ONE-COLD-SHELL-COMPLETION-2019",
    project: "kc-town-hall",
    internalClaim:
      "KC Town Hall's project-prepared CCED packet records Phase One cold-shell work as completed in 2019, including roof deck repair, insulation and TPO membrane, masonry repair, structural floor framing, water service, basement egress, site safety, air-quality control, and debris removal.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "KC Town Hall's 2019 CCED proposal packet records Phase One cold-shell work as completed, including roof, masonry, framing, water, egress, safety, and related site work.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KCTOWNHALL-CCED-PROPOSAL-2019",
        relationship: "direct-support",
        locator:
          "Finance 10-11: Summary of Budget and Financing; Phase One: Cold Shell, Completed 2019.",
        supports: [
          "the project-prepared Phase One completion statement",
          "the listed cold-shell work categories and 2018-2019 expenditure breakdown"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Attribute completion to the project-prepared 2019 packet unless an independent closeout record is recovered.",
      "Phase One cold-shell completion is not completion of the full redevelopment or later CCED-funded Phase Two proposal.",
      "Do not publish a Phase One total until the packet's differing narrative and detail totals are reconciled."
    ],
    antiClaims: [
      "The full KC Town Hall redevelopment was completed in 2019",
      "The CCED award funded Phase One",
      "An independent inspection or audit confirmed Phase One completion",
      "The packet contains one unambiguous Phase One total"
    ],
    proofClaimIds: ["kc-town-hall-phase-one-restoration-operations"],
    researchInquiryIds: [
      "INQ-KCTOWNHALL-PHASE-ONE-ROLE-AND-COMPLETION-2019"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-KCTOWNHALL-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
    project: "kc-town-hall",
    internalClaim:
      "Jamie states that, in addition to other KC Town Hall duties, he served as Phase One's general contractor and coordinated historic masonry, roofing, carpentry, welding, engineering, architecture, plumbing, and related work through daily field presence from basement to roof.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Jamie states that he served as general contractor for KC Town Hall's completed Phase One cold-shell work, coordinating multiple building trades and day-to-day field sequencing.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ACCOUNT-2026",
        relationship: "direct-support",
        supports: [
          "Jamie's general-contractor role account",
          "the trade categories, daily site presence, measured-drawing practice, and roof-parapet sequencing account"
        ],
        confidence: "moderate",
        roleBasis: "first-person",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCTOWNHALL-CCED-PROPOSAL-2019",
        relationship: "corroborating",
        locator:
          "CCED Priorities 6 and Finance 10-11: local contracting, roof and facade timeline, and completed Phase One scope.",
        supports: [
          "the multidisciplinary construction scope and 2018-2019 field-work context",
          "the project-prepared Phase One completion state"
        ],
        publicNote:
          "The packet corroborates the work and scope, not Jamie's individual title or responsibility map.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCMO-CCED-KC-TOWN-HALL-2019-06",
        relationship: "context",
        supports: [
          "Jamie's documented presentation of the later mixed-use proposal",
          "the public municipal-review context"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Present the general-contractor role as Jamie's first-person account until an independent role record or collaborator confirmation is recovered.",
      "Do not infer a contractor-license status or legal classification from the functional role description.",
      "Credit the tradespeople, professional teams, Julia Fredenburg, neighborhood partners, and other collaborators as collective contributors.",
      "Coordination does not mean Jamie personally performed every trade."
    ],
    antiClaims: [
      "The proposal independently identifies Jamie as general contractor",
      "Jamie personally performed all Phase One construction",
      "Jamie was the sole creator or decision-maker for KC Town Hall",
      "The record establishes a contractor-license classification",
      "The full redevelopment was completed"
    ],
    proofClaimIds: ["kc-town-hall-phase-one-restoration-operations"],
    researchInquiryIds: [
      "INQ-KCTOWNHALL-PHASE-ONE-ROLE-AND-COMPLETION-2019"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-KCTOWNHALL-PARTICIPATORY-SURVEY-SYSTEM-2019",
    project: "kc-town-hall",
    internalClaim:
      "Jamie states that he designed a four-by-six-inch neighborhood survey handbill and backing data-collection system. The 2019 proposal reproduces the survey, names Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as process partners, and says results directly shaped the proposal; a Council support letter says the survey influenced proposed retail uses.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Jamie states that he designed KC Town Hall's neighborhood survey handbill and response workflow. Project materials document a survey conducted with neighborhood partners and say its results shaped proposed uses for the building.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ACCOUNT-2026",
        relationship: "direct-support",
        supports: [
          "Jamie's authorship account for the handbill and backing data-collection system"
        ],
        confidence: "moderate",
        roleBasis: "first-person",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCTOWNHALL-CCED-PROPOSAL-2019",
        relationship: "direct-support",
        locator:
          "Project Narrative 3 and Scott Taylor support letter dated January 23, 2019.",
        supports: [
          "the survey artifact and its preference and contact workflow",
          "Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as named process partners",
          "the project's statement that survey results shaped the proposal",
          "a Council support letter's statement that the survey influenced proposed retail uses"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Attribute handbill and data-system authorship to Jamie's first-person account.",
      "Credit Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as named process partners.",
      "Do not publish participant responses, names, contact information, or raw survey data.",
      "Do not describe the survey as statistically representative or as proof of neighborhood consensus without sample and method records."
    ],
    antiClaims: [
      "Jamie alone conducted the neighborhood process",
      "The survey represented every neighborhood resident",
      "The survey proved neighborhood consensus",
      "The proposal independently identifies Jamie as the handbill or database author",
      "Participant contact data is cleared for publication"
    ],
    proofClaimIds: ["kc-town-hall-phase-one-restoration-operations"],
    researchInquiryIds: [
      "INQ-KCTOWNHALL-PHASE-ONE-ROLE-AND-COMPLETION-2019"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-KCTOWNHALL-SITE-BASED-NEIGHBORHOOD-LISTENING",
    project: "kc-town-hall",
    internalClaim:
      "Jamie describes his daily Phase One site presence as a situated listening practice: as work resumed on a long-abandoned building, neighbors shared histories, appreciation, and ideas for what the place could become, adding qualitative context to the formal survey process.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Jamie describes daily construction-site presence as an informal listening practice through which neighborhood histories and ideas accumulated alongside the restoration work.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ACCOUNT-2026",
        relationship: "direct-support",
        supports: [
          "Jamie's situated account of daily neighborhood conversations and appreciation around the active restoration site"
        ],
        confidence: "moderate",
        roleBasis: "first-person",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCTOWNHALL-CCED-PROPOSAL-2019",
        relationship: "corroborating",
        locator:
          "Project Narrative 3, CCED Priorities 6, and included neighborhood support letters.",
        supports: [
          "the project's neighborhood-process framing",
          "the active restoration and local-trade context",
          "documented neighborhood and civic appreciation for the restoration effort"
        ],
        publicNote:
          "The packet corroborates the setting and process, not a complete record of the conversations Jamie recalls.",
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Present the conversations and appreciation as Jamie's situated first-person account.",
      "Do not identify speakers or publish reconstructed quotations without consent and source review.",
      "Do not convert informal encounters into a representative research sample or consensus claim.",
      "Keep this qualitative practice distinct from the formal survey system."
    ],
    antiClaims: [
      "Jamie conducted a representative ethnographic study",
      "Every neighbor supported the project",
      "The site conversations established community consensus",
      "The archive contains consent to publish participant identities or quotations"
    ],
    proofClaimIds: ["kc-town-hall-phase-one-restoration-operations"],
    researchInquiryIds: [
      "INQ-KCTOWNHALL-PHASE-ONE-ROLE-AND-COMPLETION-2019"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ClaimRecord[];

const researchInquiries = [
  {
    id: "INQ-KCTOWNHALL-PHASE-ONE-ROLE-AND-COMPLETION-2019",
    project: "kc-town-hall",
    question:
      "What public-safe records can independently establish KC Town Hall Phase One completion, Jamie's general-contractor role and trade coordination, the survey-system authorship and method, and the site's neighborhood-listening function?",
    methods: [
      "Extracted and close-read the complete 24-page 2019 CCED proposal and support-letter packet.",
      "Visually inspected the neighborhood-process, local-industry, finance summary, Phase One detail, and support-letter pages to preserve layout-dependent evidence.",
      "Compared the packet with existing Kansas City CCED Board, Council, press, and stewardship-lifecycle records already in the Knowledge Bank.",
      "Separated project-prepared completion statements, third-party support letters, Jamie's first-person role account, and unresolved independent corroboration.",
      "Excluded contact details, signatures, financing and banking information, participant data, private property detail, and unreviewed photographs from the repository."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The project packet records Phase One cold-shell work as completed in 2019 and itemizes roof, masonry, framing, water, access, safety, air-quality, debris, and related work.",
      "The packet documents an active 2018-2019 roof and facade timeline, local minority-owned contracting, and masonry skills training.",
      "The packet reproduces the neighborhood survey, names Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as process partners, and states that survey results shaped the proposal.",
      "A Council support letter in the packet says the neighborhood survey influenced proposed retail uses.",
      "Jamie's first-person account supplies his Phase One general-contractor role, daily field-coordination method, handbill and data-system authorship, and site-based listening practice."
    ],
    limitations: [
      "The proposal does not identify Jamie as general contractor or assign individual trade-coordination responsibilities.",
      "No contracts, invoices, permits, inspection closeouts, measured drawings, schedules, or collaborator confirmations were reviewed in this pass.",
      "The packet's work categories corroborate a multidisciplinary scope but do not independently establish every trade named in Jamie's account.",
      "The finance narrative gives a Phase One total of $189,629 while the detail page totals $180,629; no total should be projected until reconciled.",
      "The survey sample, response count, raw records, and representativeness were not established and remain protected.",
      "The packet's Phase One completion statement is project-prepared rather than an independent audit or final inspection record."
    ],
    sourceIds: [
      "SRC-KCTOWNHALL-CCED-PROPOSAL-2019",
      "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ACCOUNT-2026",
      "SRC-KCMO-CCED-KC-TOWN-HALL-2019-06"
    ],
    publicSummary:
      "A protected 2019 project packet records Phase One cold-shell work as completed and documents its survey and local-trade context. Jamie's first-person account supplies his general-contractor, field-coordination, survey-authorship, and situated-listening roles; independent role corroboration remains open.",
    protectedLocatorId: "LOC-KCTOWNHALL-PHASE-ONE-RESEARCH-2026"
  }
] satisfies ResearchInquiry[];

export const kcTownHallPhaseOneBatchRecords = {
  intakeRecords,
  sources,
  claims,
  researchInquiries
} satisfies KcTownHallPhaseOneBatch;
