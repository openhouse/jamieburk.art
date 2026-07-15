import type { KnowledgeBank } from "./schema.ts";

type KcTownHallPhaseOneBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries" | "pages"
>;

export const kcTownHallPhaseOneBatchRecords: KcTownHallPhaseOneBatch = {
  sources: [
    {
      id: "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
      title: "KC Town Hall Central City Economic Development grant proposal",
      organization: "KC Town Hall LLC",
      author: "Jamie Burkart and Julia Fredenburg",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      capturedAt: "PDF metadata dated March 25, 2019",
      accessedAt: "2026-07-15",
      publicCitation:
        "KC Town Hall LLC, Central City Economic Development grant proposal, 2019; public-safe page-level archival summary.",
      publicNote:
        "The public-safe review uses the proposal's project-role, neighborhood-process, construction-progress, and Phase One scope pages. The underlying PDF is not shipped because its appendices contain private financial, contact, property, and correspondence material.",
      supportsGenerally: [
        "the proposal identifies Jamie Burkart and Julia Fredenburg as founders and project managers",
        "the proposal documents an ongoing neighborhood survey whose results directly shaped the plan",
        "the proposal describes Phase One as a cold-shell restoration and labels it completed in 2019",
        "the Phase One scope includes roof deck repair, insulation and TPO membrane, brick masonry repair, structural floor framing, water service, egress, staging, debris removal, site safety, and air-quality control",
        "the proposal identifies architecture, masonry, roofing, concrete, and electrical collaborators"
      ],
      doesNotEstablish: [
        "Jamie's formal contractor-license status or permit-holder status",
        "the contractual division of work among every trade",
        "that Jamie personally performed each construction trade",
        "completion of Phase Two or the full redevelopment",
        "current ownership, building condition, or project status"
      ],
      protectedLocatorId: "ARCHIVE-KCTH-PHASE-ONE-PROPOSAL-2019-001"
    },
    {
      id: "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
      title: "Jamie Burkart public review confirmation of KC Town Hall Phase One role",
      organization: "Jamie Burkart",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      publicCitation:
        "Jamie Burkart, public portfolio review confirmation of his KC Town Hall Phase One role, July 15, 2026.",
      publicNote:
        "Jamie confirms that he served in the project's functional general-contractor role for Phase One, acting as the daily on-site construction lead; hired and coordinated specialist teams; and created the neighborhood survey handbill and its backing contact-intake system.",
      supportsGenerally: [
        "Jamie served as Phase One's functional general contractor and daily on-site construction lead",
        "Jamie hired and coordinated historic brick masonry, roofing, carpentry, welding, engineering, architecture, and plumbing teams",
        "Jamie coordinated from measured drawings and managed schedule-sensitive roof, parapet, and TPO membrane sequencing",
        "Jamie designed a 4 x 6 neighborhood survey handbill and backing contact-intake system",
        "Jamie's daily site presence created an ongoing surface for neighborhood histories, ideas, and future-use conversations"
      ],
      doesNotEstablish: [
        "a municipal contractor license, permit-holder status, or a particular legal contracting classification",
        "that Jamie personally performed every specialist trade",
        "that no collaborators shared project-management or construction responsibilities",
        "independently measured neighborhood sentiment or impact",
        "completion of the full redevelopment or Phase Two"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
      project: "kc-town-hall",
      internalClaim:
        "Jamie served in the functional general-contractor role and as daily on-site construction lead for KC Town Hall Phase One, hiring and coordinating specialist teams through completion of the cold-shell restoration in 2019.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Jamie served as Phase One's on-site construction lead, hiring and coordinating historic masonry, roofing, carpentry, welding, engineering, architecture, and plumbing teams through completion of the building's cold shell in 2019. Working from measured drawings, he coordinated from basement to roof deck, including the sequence tying the TPO membrane to restored parapets and historic ceramic caps.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
          relationship: "direct-support",
          supports: [
            "Jamie's functional general-contractor role",
            "daily on-site construction leadership",
            "hiring and coordination of specialist teams"
          ],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
          relationship: "private-support",
          supports: [
            "founder and project-manager role",
            "Phase One cold-shell scope",
            "2019 completion label",
            "named specialist collaborators"
          ],
          locator: "Project Narrative pages 1, 6, 10, and 11",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
          relationship: "corroborating",
          supports: ["Jamie's public developer and presenter role"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Use 'on-site construction lead' in hiring-facing copy and retain 'functional general-contractor role' in the evidence record.",
        "Do not infer contractor licensure, permit-holder status, or a specific legal classification without municipal or contractual records.",
        "Coordination of specialist teams does not mean Jamie personally performed every trade.",
        "Phase One cold-shell completion does not establish completion of Phase Two or the full redevelopment."
      ],
      antiClaims: [
        "Jamie was the licensed general contractor of record",
        "Jamie personally completed every construction trade",
        "Jamie completed the entire KC Town Hall redevelopment",
        "Phase Two was completed during Jamie's direct involvement"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-DELIVERY-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex public-safe PDF review"]
    },
    {
      id: "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
      project: "kc-town-hall",
      internalClaim:
        "Jamie created a 4 x 6 neighborhood survey handbill and backing contact-intake system to gather desired uses, participation offers, and contact information; the proposal states that the ongoing survey directly shaped the plan.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Jamie also designed a neighborhood survey handbill and backing contact-intake system so desired uses, offers of help, and ongoing neighborhood conversations could directly shape the plan.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
          relationship: "direct-support",
          supports: ["Jamie's authorship of the handbill and backing data-collection system"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
          relationship: "private-support",
          supports: [
            "the survey's visible use and contact fields",
            "the neighborhood-partner context",
            "the proposal's statement that survey results directly shaped the plan"
          ],
          locator: "Project Narrative page 3",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe the survey as an input and contact workflow, not a statistically representative study.",
        "Do not publish survey responses, contact fields, respondent identities, or raw data.",
        "Credit neighborhood partners when describing the wider survey process."
      ],
      antiClaims: [
        "the survey was statistically representative",
        "Jamie alone conducted every neighborhood conversation",
        "survey responses or resident contact data are public portfolio artifacts"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-DELIVERY-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex public-safe PDF review"]
    },
    {
      id: "CLM-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE",
      project: "kc-town-hall",
      internalClaim:
        "Jamie's sustained on-site construction presence made implementation and neighborhood listening mutually reinforcing as histories, stories, and ideas for the building accumulated around the active restoration site.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Daily site presence kept neighborhood knowledge close to implementation: histories, stories, and ideas for the building could accumulate alongside the restoration work rather than remain separate from it.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
          relationship: "direct-support",
          supports: ["daily site presence and recurring neighborhood conversations"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
          relationship: "private-support",
          supports: ["the documented neighborhood process and survey-to-plan pathway"],
          locator: "Project Narrative page 3",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is a portfolio-level interpretation of Jamie's practice, not language used by every collaborator or neighbor.",
        "Do not convert observed appreciation or recurring conversation into a measured community-impact claim.",
        "Preserve the collective nature of the neighborhood-led vision."
      ],
      antiClaims: [
        "Jamie's presence alone created community trust",
        "all neighbors supported the project",
        "the site conversations constitute a representative public-opinion result"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-DELIVERY-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex public-safe PDF review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KCTH-PHASE-ONE-DELIVERY-2026",
      project: "kc-town-hall",
      question:
        "What can Jamie's firsthand account and the 2019 CCED proposal establish about his Phase One construction role, the completed scope, and the neighborhood-input system?",
      methods: [
        "Rendered and visually reviewed all 24 pages of the proposal PDF.",
        "Close-read the project-role, neighborhood-process, construction-progress, budget-summary, and Phase One scope pages.",
        "Separated Jamie's firsthand role confirmation from proposal-authored documentary support.",
        "Excluded private financial, banking, personal-contact, property, and correspondence details from the public repository.",
        "Compared the new evidence with the existing official board, Council, appropriation, withdrawal, and social-account records."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "Jamie confirms that he served in the functional general-contractor role and as daily on-site construction lead for Phase One.",
        "The proposal independently identifies Jamie and Julia as founders and project managers.",
        "The proposal labels Phase One's cold-shell work completed in 2019 and itemizes roof, masonry, floor-framing, water, egress, staging, debris-removal, safety, and air-quality work.",
        "Jamie confirms that he hired and coordinated historic masonry, roofing, carpentry, welding, engineering, architecture, and plumbing teams.",
        "The proposal documents an ongoing neighborhood survey and says its results directly shaped the plan; Jamie confirms he designed the handbill and backing contact-intake system."
      ],
      limitations: [
        "The reviewed sources do not establish a municipal contractor license, permit-holder status, or exact legal contracting classification.",
        "The proposal is project-authored and contains private appendices; only a bounded public-safe summary is retained.",
        "The available record does not establish the contractual division of every trade or collaborator's complete contribution.",
        "Observed appreciation and site conversations are not independently measured outcomes.",
        "Phase One completion does not establish completion of Phase Two or the full redevelopment."
      ],
      sourceIds: [
        "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
        "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
        "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019"
      ],
      publicSummary:
        "Jamie served as KC Town Hall Phase One's daily on-site construction lead, coordinating specialist teams through completion of the cold shell in 2019 while building a neighborhood survey and contact workflow into the project's planning process.",
      protectedLocatorId: "RESEARCH-KCTH-PHASE-ONE-2026-001"
    }
  ],
  pages: []
};
