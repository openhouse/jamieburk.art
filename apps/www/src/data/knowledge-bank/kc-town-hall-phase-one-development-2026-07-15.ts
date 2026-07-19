import type { KnowledgeBank } from "./schema.ts";

type KcTownHallPhaseOneDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const kcTownHallPhaseOneDevelopmentRecords: KcTownHallPhaseOneDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-15-KCTH-PHASE-ONE-PROPOSAL",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Twenty-four-page KC Town Hall CCED proposal containing project roles, neighborhood process, construction progress, Phase One scope, budgets, and supporting letters.",
      projectHints: ["kc-town-hall"],
      status: "processed",
      disposition:
        "Retained as a protected source. Added only page-level public-safe assertions; did not ship the PDF or reproduce private financial, contact, property, or correspondence material.",
      linkedRecordIds: [
        "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
        "READ-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
        "INQ-KCTH-PHASE-ONE-DELIVERY-2026",
        "CND-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
        "CND-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
        "CND-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE"
      ],
      protectedLocatorId: "ARCHIVE-KCTH-PHASE-ONE-PROPOSAL-2019-001"
    },
    {
      id: "INT-2026-07-15-KCTH-JAMIE-PHASE-ONE-CONFIRMATION",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "memory",
      visibility: "public-safe",
      summary:
        "Jamie confirms his functional general-contractor and daily site-lead role, specialist-team coordination, survey-system authorship, and construction-site listening practice for KC Town Hall Phase One.",
      projectHints: ["kc-town-hall"],
      status: "processed",
      disposition:
        "Promoted the bounded functional role and survey claims; held formal licensure and measured neighborhood-appreciation claims for further evidence.",
      linkedRecordIds: [
        "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
        "READ-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
        "CND-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
        "CND-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
        "CND-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE",
        "CND-KCTH-LICENSED-GENERAL-CONTRACTOR-OF-RECORD",
        "CND-KCTH-NEIGHBORHOOD-APPRECIATION-OUTCOME"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
      sourceId: "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
      readAt: "2026-07-15",
      reader: "Codex public-safe PDF review",
      assertions: [
        {
          id: "ASSERT-KCTH-FOUNDERS-PROJECT-MANAGERS",
          statement:
            "The proposal identifies Julia Fredenburg and Jamie Burkart as founders and project managers.",
          locator: "Project Narrative page 1",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-NAMED-SPECIALIST-TEAM",
          statement:
            "The proposal's team page identifies historic masonry, architecture, roofing, concrete, and electrical collaborators.",
          locator: "Project Narrative page 1",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-SURVEY-SHAPED-PROPOSAL",
          statement:
            "The proposal describes an ongoing neighborhood survey conducted with neighborhood partners and says its results directly shaped the proposal.",
          locator: "Project Narrative page 3",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-SURVEY-INPUT-FIELDS",
          statement:
            "The survey handbill gathered desired uses, contact information, and offers of help.",
          locator: "Project Narrative page 3",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-LOCAL-TRADE-PRACTICE",
          statement:
            "The proposal describes local minority-owned contractor hiring and neighborhood masonry skill-building during 2018.",
          locator: "Project Narrative page 6",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-PHASE-ONE-COLD-SHELL",
          statement:
            "The proposal defines Phase One as cold-shell work involving the roof structure and membrane, structural masonry, property acquisition, and floor framing.",
          locator: "Finance page 10",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-PHASE-ONE-COMPLETED-2019",
          statement:
            "The Phase One budget page is labeled 'Cold Shell - Completed 2019.'",
          locator: "Finance page 11",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-PHASE-ONE-SCOPE",
          statement:
            "The completed Phase One schedule itemizes roof deck repair, insulation and TPO membrane, brickwork repair, structural floor framing, water service, secure staging, debris removal, restored egress, site safety, and air-quality control.",
          locator: "Finance page 11",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The proposal is project-authored rather than an independent construction audit.",
        "Its progress summary and completed-work budget reflect different as-of moments within the 2019 document set.",
        "The proposal does not identify a formal general contractor, contractor license, permit holder, or complete contractual division of labor.",
        "The PDF contains private banking, financial, contact, property, and correspondence material that is excluded from the public repository.",
        "The Phase One completion label does not establish completion of Phase Two or the full redevelopment."
      ],
      entityIds: ["jamie-burkart", "julia-fredenburg", "kc-town-hall"],
      themeIds: [
        "construction-delivery",
        "historic-preservation",
        "neighborhood-participation",
        "multidisciplinary-coordination"
      ],
      candidateClaimIds: [
        "CND-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
        "CND-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
        "CND-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE",
        "CND-KCTH-LICENSED-GENERAL-CONTRACTOR-OF-RECORD"
      ]
    },
    {
      id: "READ-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
      sourceId: "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
      readAt: "2026-07-15",
      reader: "Codex public review",
      assertions: [
        {
          id: "ASSERT-KCTH-JAMIE-FUNCTIONAL-GC-ROLE",
          statement:
            "Jamie confirms that he served in the functional general-contractor role for Phase One.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-JAMIE-DAILY-SITE-LEAD",
          statement:
            "Jamie confirms that he was the daily on-site construction lead, coordinating work from the basement through the scaffolding and roof deck.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-JAMIE-TRADE-COORDINATION",
          statement:
            "Jamie confirms that he hired and coordinated historic masonry, roofing, carpentry, welding, engineering, architecture, and plumbing teams.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-JAMIE-ROOF-SEQUENCING",
          statement:
            "Jamie confirms schedule-sensitive coordination of the TPO roof membrane, restored parapet, and historic ceramic parapet caps from measured drawings.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-JAMIE-SURVEY-AUTHORSHIP",
          statement:
            "Jamie confirms that he created the 4 x 6 neighborhood survey handbill and its backing contact-intake system.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-SITE-AS-LISTENING-SURFACE",
          statement:
            "Jamie describes daily site presence as a way neighborhood histories, stories, and ideas for the building accumulated alongside construction.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "This is Jamie's firsthand public review confirmation, not a contractor license, permit record, or independent collaborator testimonial.",
        "The source does not establish that Jamie personally performed each specialist trade.",
        "The source does not identify every collaborator's contribution or contractual relationship.",
        "Observed appreciation and recurring neighborhood conversations are qualitative memories, not measured outcomes.",
        "Private family context and later transition reasons remain outside the claim."
      ],
      entityIds: ["jamie-burkart", "kc-town-hall"],
      themeIds: [
        "construction-delivery",
        "on-site-coordination",
        "neighborhood-participation",
        "implementation-as-care"
      ],
      candidateClaimIds: [
        "CND-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
        "CND-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
        "CND-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE",
        "CND-KCTH-LICENSED-GENERAL-CONTRACTOR-OF-RECORD",
        "CND-KCTH-NEIGHBORHOOD-APPRECIATION-OUTCOME"
      ]
    }
  ],
  candidateClaims: [
    {
      id: "CND-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
      project: "kc-town-hall",
      text:
        "Jamie served as KC Town Hall Phase One's functional general contractor and daily on-site construction lead, hiring and coordinating specialist teams through completion of the cold shell in 2019.",
      status: "promoted",
      sourceIds: [
        "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
        "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
        "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-DELIVERY-2026"],
      supportSummary:
        "Jamie's firsthand confirmation establishes the functional role and trade coordination; the protected proposal independently establishes founder/project-manager credit, Phase One scope, named specialist collaborators, and the 2019 completion label.",
      missingEvidence: [],
      boundaries: [
        "Public copy uses 'on-site construction lead' to avoid implying unverified licensure or permit status.",
        "Phase One completion is distinct from full redevelopment completion."
      ],
      promotedClaimId: "CLM-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
      project: "kc-town-hall",
      text:
        "Jamie created a neighborhood survey handbill and backing contact-intake system whose ongoing results directly shaped the KC Town Hall plan.",
      status: "promoted",
      sourceIds: [
        "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
        "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-DELIVERY-2026"],
      supportSummary:
        "Jamie confirms authorship of the handbill and backing system; the proposal reproduces the survey and states that the ongoing results directly shaped the plan.",
      missingEvidence: [],
      boundaries: [
        "Do not expose raw responses or contacts.",
        "Do not describe the survey as statistically representative.",
        "Preserve neighborhood-partner credit for the broader process."
      ],
      promotedClaimId: "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE",
      project: "kc-town-hall",
      text:
        "Jamie's daily site presence connected construction implementation with ongoing neighborhood listening and participatory visioning.",
      status: "promoted",
      sourceIds: [
        "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
        "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-DELIVERY-2026"],
      supportSummary:
        "Jamie describes the site-level practice; the proposal independently documents a neighborhood process whose survey results shaped the plan.",
      missingEvidence: [],
      boundaries: [
        "Treat as a portfolio interpretation, not a measured community outcome.",
        "Do not imply unanimous neighborhood support or solo trust creation."
      ],
      promotedClaimId: "CLM-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-KCTH-LICENSED-GENERAL-CONTRACTOR-OF-RECORD",
      project: "kc-town-hall",
      text:
        "Jamie was the licensed general contractor or permit holder of record for KC Town Hall Phase One.",
      status: "research-needed",
      sourceIds: [
        "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
        "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-DELIVERY-2026"],
      supportSummary:
        "Jamie confirms the functional general-contractor role, but the reviewed records do not establish a license, permit-holder status, or formal legal classification.",
      missingEvidence: [
        "contractor-license record",
        "building-permit record",
        "construction contract or owner-builder record"
      ],
      boundaries: ["Do not project a formal licensing or permit claim without the record."],
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-KCTH-NEIGHBORHOOD-APPRECIATION-OUTCOME",
      project: "kc-town-hall",
      text:
        "The Phase One restoration produced broad neighborhood appreciation and trust.",
      status: "research-needed",
      sourceIds: ["SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-DELIVERY-2026"],
      supportSummary:
        "Jamie remembers many expressions of appreciation as the long-abandoned building received visible care, but this is not yet independently or systematically documented.",
      missingEvidence: [
        "public contemporaneous neighborhood statements",
        "consent-cleared collaborator or neighbor recollections",
        "bounded documentation of the observation method"
      ],
      boundaries: [
        "Preserve as a research lead rather than a quantified or representative public outcome."
      ],
      reviewedAt: "2026-07-15"
    }
  ],
  promotions: [
    {
      id: "PROM-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY-2026",
      candidateClaimId: "CND-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
      claimId: "CLM-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
      decision: "promoted",
      reason:
        "Firsthand role confirmation and proposal evidence jointly establish the functional role, multidisciplinary coordination, bounded Phase One scope, and 2019 completion label.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex public-safe PDF review"]
    },
    {
      id: "PROM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM-2026",
      candidateClaimId: "CND-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
      claimId: "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
      decision: "promoted",
      reason:
        "Jamie confirms authorship, and the proposal independently reproduces the survey and states that its results shaped the plan.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex public-safe PDF review"]
    },
    {
      id: "PROM-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE-2026",
      candidateClaimId: "CND-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE",
      claimId: "CLM-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE",
      decision: "promoted",
      reason:
        "The interpretation is useful and bounded: daily construction presence and a documented survey-to-plan process show implementation and neighborhood listening operating together.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex public-safe PDF review"]
    },
    {
      id: "PROM-KCTH-LICENSED-GENERAL-CONTRACTOR-OF-RECORD-2026",
      candidateClaimId: "CND-KCTH-LICENSED-GENERAL-CONTRACTOR-OF-RECORD",
      decision: "held",
      reason:
        "The functional role is confirmed, but licensure, permit-holder status, and legal contracting classification were not recovered.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex public-safe PDF review"]
    },
    {
      id: "PROM-KCTH-NEIGHBORHOOD-APPRECIATION-OUTCOME-2026",
      candidateClaimId: "CND-KCTH-NEIGHBORHOOD-APPRECIATION-OUTCOME",
      decision: "held",
      reason:
        "Jamie's memory is valuable as a research lead, but broad appreciation or trust should not be represented as a measured outcome without public contemporaneous evidence or consent-cleared testimony.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex public-safe PDF review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-KCTH-PHASE-ONE-EDITORIAL-2026",
      audience:
        "Hiring managers and public-interest teams seeking a technical project manager, implementation lead, or product-operations partner",
      goal:
        "Correct the portfolio's understatement of Jamie's direct construction-delivery role while preserving collective credit and the distinction between Phase One and the later project lifecycle.",
      argument:
        "KC Town Hall shows Jamie coordinating a multidisciplinary physical implementation from measured details through daily site delivery while building neighborhood input into the operating process.",
      selectedClaimIds: [
        "CLM-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
        "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
        "CLM-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE"
      ],
      heldCandidateClaimIds: [
        "CND-KCTH-LICENSED-GENERAL-CONTRACTOR-OF-RECORD",
        "CND-KCTH-NEIGHBORHOOD-APPRECIATION-OUTCOME"
      ],
      rationale: [
        "Lead with Phase One delivery because it is more specific and hiring-legible than generic planning-support language.",
        "Use 'on-site construction lead' publicly and preserve 'functional general-contractor role' in the knowledge bank until licensing or permit records are recovered.",
        "Show the survey as an operating system connecting desired uses, offers of help, contacts, and implementation.",
        "Keep the later Council funding, transition, withdrawal, and reappropriation lifecycle visible but separate from the completed Phase One work.",
        "Do not publish the raw proposal, private appendices, survey responses, contacts, or unapproved site photographs."
      ],
      createdAt: "2026-07-15"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-KCTH-PHASE-ONE-VISUAL-AND-PERMIT-RECORD-2026",
      kind: "photo-editor",
      summary:
        "Seek rights-cleared Phase One photographs showing Jamie coordinating from measured drawings, masonry and parapet restoration, TPO roof sequencing, the survey handbill in use, and the building as an active neighborhood conversation site. Separately seek permit or contract records that can resolve formal general-contractor and permit-holder classifications.",
      projectHints: ["kc-town-hall"],
      sourceIds: [
        "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
        "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026"
      ],
      candidateClaimIds: [
        "CND-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
        "CND-KCTH-LICENSED-GENERAL-CONTRACTOR-OF-RECORD"
      ],
      rightsReviewRequired: true,
      status: "captured",
      createdAt: "2026-07-15"
    }
  ]
};
