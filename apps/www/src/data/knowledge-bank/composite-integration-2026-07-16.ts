import type {
  ClaimRecord,
  IntakeRecord,
  ProjectionDecision
} from "./schema.ts";

const reviewedAt = "2026-07-16";

export const compositeIntegrationIntake = [
  {
    id: "INTAKE-196-PUBLIC-RESUME-SCALE-2026",
    receivedAt: reviewedAt,
    kind: "public-url",
    publicSafeSummary:
      "Jamie's approved public resume distinguishes his 196 Artists Residency founder role and self-reported 20-plus resident-artist scale from the separate Sunday Dinner practice.",
    submittedBy: "Jamie Burkart and Codex composite integration review",
    sourceUrl:
      "https://jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
    entityIds: ["ENT-196-ARTISTS-RESIDENCY"],
    disposition: "source-created",
    sourceIds: ["SRC-HJE-PUBLIC-RESUME-2026-07-11"],
    claimIds: ["CLM-196-ARTISTS-RESIDENCY-FOUNDER-SCALE"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-FAIRRENT-CAMPAIGN-MEMORY-SCALE-2026",
    receivedAt: reviewedAt,
    kind: "public-url",
    publicSafeSummary:
      "Jamie's public resume reports his work building and stewarding more than 30 pages of shared Commercial Rent Stabilization campaign-memory and coordination infrastructure.",
    submittedBy: "Jamie Burkart and Codex composite integration review",
    sourceUrl:
      "https://jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-FAIR-RENT-NYC"],
    disposition: "source-created",
    sourceIds: ["SRC-HJE-PUBLIC-RESUME-2026-07-11"],
    claimIds: ["CLM-FAIRRENTNYC-CAMPAIGN-MEMORY-SCALE"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const compositeIntegrationClaims = [
  {
    id: "CLM-FAIRRENTNYC-CAMPAIGN-MEMORY-SCALE",
    project: "fair-rent-nyc",
    internalClaim:
      "Jamie's public resume reports that he built and stewarded more than 30 pages of shared Commercial Rent Stabilization campaign-memory and coordination infrastructure.",
    status: "confirmed-with-boundary",
    maturity: "projected",
    intakeIds: ["INTAKE-FAIRRENT-CAMPAIGN-MEMORY-SCALE-2026"],
    requiredSupportTags: ["fairrent-campaign-memory-scale"],
    composition: {
      action:
        "Built and stewarded more than 30 pages of shared campaign-memory and coordination infrastructure.",
      intendedEnd:
        "Help collaborators preserve meeting context, decisions, action items, policy questions, media assets, stakeholder next steps, and city and state strategy lanes.",
      usableResult:
        "A reusable body of shared memory and actionable workstreams for a Commercial Rent Stabilization collaboration.",
      audience:
        "Coalition collaborators and hiring readers evaluating civic delivery, documentation architecture, and product operations.",
      collectiveCredit:
        "Credit Jamie for the documented building and stewardship role while preserving collaborators' authorship, decisions, and campaign contributions.",
      causalBoundary:
        "The 30-plus-page aggregate is reported in Jamie's public resume rather than independently corroborated; it does not establish sole authorship, policy adoption, or policy causation."
    },
    projections: [
      {
        key: "case-study",
        text:
          "Jamie built and stewarded 30+ pages of shared Commercial Rent Stabilization campaign-memory and coordination infrastructure, turning meetings, decisions, action items, policy questions, media assets, stakeholder next steps, and city and state strategy lanes into shared memory and actionable workstreams.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-HJE-PUBLIC-RESUME-2026-07-11",
        relationship: "direct-support",
        supports: [
          "Jamie's published building and stewardship role",
          "Jamie's published 30-plus-page campaign-memory aggregate",
          "the documented categories synthesized into shared memory and workstreams"
        ],
        propositionIds: ["PROP-FAIRRENT-RESUME-CAMPAIGN-MEMORY-SCALE"],
        publicNote:
          "This is Jamie's first-person public resume account, not independent corroboration of the aggregate or sole authorship.",
        confidence: "moderate",
        renderCitation: true
      }
    ],
    boundaries: [
      "Attribute the 30-plus-page aggregate to Jamie's public resume rather than presenting it as independently audited.",
      "Keep private coalition notes, legal-review materials, stakeholder records, emails, raw strategy context, and unapproved quotations offline.",
      "Preserve collaborators' authorship and collective campaign outcomes."
    ],
    antiClaims: [
      "Jamie solely authored every campaign-memory page or campaign decision.",
      "The 30-plus-page aggregate independently proves campaign adoption, policy passage, or policy causation.",
      "The citation makes private coalition records publicly inspectable."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex source and projection review"]
  },
  {
    id: "CLM-196-ARTISTS-RESIDENCY-FOUNDER-SCALE",
    project: "196-artists-residency",
    internalClaim:
      "Jamie's approved public resume identifies him as founder of 196 Artists Residency and reports support for more than 20 resident artists; a protected Jamie-authored 2023 onboarding record separately documents his implementation method, not the aggregate.",
    status: "confirmed-with-boundary",
    maturity: "projected",
    intakeIds: ["INTAKE-196-PUBLIC-RESUME-SCALE-2026"],
    requiredSupportTags: [
      "196-residency-founder-scale",
      "196-operational-onboarding"
    ],
    composition: {
      action:
        "Founded 196 Artists Residency and built repeatable intake, onboarding, scheduling, hospitality, access, documentation, and continuity practices.",
      intendedEnd:
        "Give resident artists a workable structure for entering the space, preparing their work, operating independently, and continuing through a bounded residency period.",
      usableResult:
        "A repeatable participant-onboarding and self-service access workflow; Jamie's approved resume separately reports support for more than 20 resident artists.",
      audience:
        "Resident artists, collaborators, and hiring readers evaluating participation operations and implementation practice.",
      collectiveCredit:
        "Credit Jamie for the founder role and documented operating workflow while retaining resident artists' authorship of their own work and collaborators' contributions.",
      causalBoundary:
        "The 20-plus aggregate is Jamie-reported rather than independently corroborated; one protected onboarding record supports method, not scale, resident outcomes, or permission to identify participants."
    },
    projections: [
      {
        key: "case-study",
        text:
          "Jamie founded 196 Artists Residency and reports supporting 20+ resident artists through repeatable intake, onboarding, scheduling, hospitality, access, documentation, and continuity systems.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/196-sunday-dinner"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-HJE-PUBLIC-RESUME-2026-07-11",
        relationship: "direct-support",
        supports: [
          "Jamie's 196 Artists Residency founder role",
          "Jamie's self-reported 20-plus resident-artist aggregate"
        ],
        propositionIds: ["PROP-196-RESUME-FOUNDER-SCALE"],
        publicNote:
          "The scale is attributed to Jamie's approved public resume rather than presented as independently audited.",
        confidence: "moderate",
        renderCitation: true
      },
      {
        sourceId: "SRC-GDRIVE-196-ACCEPTANCE-2023",
        relationship: "private-support",
        supports: [
          "Jamie-authored proposal review and invitation",
          "space-configuration and self-service access onboarding"
        ],
        propositionIds: [
          "PROP-GDRIVE-196-JAMIE-AUTHOR",
          "PROP-GDRIVE-196-EVALUATION-INVITATION",
          "PROP-GDRIVE-196-OPERATIONAL-ONBOARDING"
        ],
        publicNote:
          "A protected participant record supports the operating workflow, not the 20-plus aggregate; participant identity and details remain offline.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Treat the 20-plus aggregate as Jamie-reported rather than independently corroborated.",
      "Keep 196 Artists Residency distinct from Sunday Dinner and its separate gathering record.",
      "Participant identities, contact details, access instructions, work, and images remain protected unless separately cleared."
    ],
    antiClaims: [
      "Sunday Dinner and 196 Artists Residency are one undifferentiated project.",
      "One participant-onboarding record independently establishes the 20-plus aggregate.",
      "Jamie authored resident artists' work or solely produced every residency.",
      "The records establish resident outcomes, satisfaction, adoption, or cultural impact."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex source and projection review"]
  }
] satisfies ClaimRecord[];

export const compositeIntegrationDecisions = [
  {
    id: "DEC-FAIRRENT-CAMPAIGN-MEMORY-SCALE-PUBLISH",
    claimId: "CLM-FAIRRENTNYC-CAMPAIGN-MEMORY-SCALE",
    surface: "/work/fair-rent-nyc",
    decision: "publish",
    rationale:
      "A bounded first-party citation makes the prominent scale claim inspectable without exposing private coalition records or implying independent corroboration.",
    decidedAt: reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex composite integration review"]
  },
  {
    id: "DEC-196-ARTISTS-RESIDENCY-FOUNDER-SCALE-PUBLISH",
    claimId: "CLM-196-ARTISTS-RESIDENCY-FOUNDER-SCALE",
    surface: "/work/196-sunday-dinner",
    decision: "publish",
    rationale:
      "Separating the residency claim from Sunday Dinner reduces metric migration, attributes the aggregate as Jamie-reported, and gives hiring readers a clearer implementation example.",
    decidedAt: reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex composite integration review"]
  }
] satisfies ProjectionDecision[];
