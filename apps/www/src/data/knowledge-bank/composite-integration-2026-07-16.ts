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
  }
] satisfies IntakeRecord[];

export const compositeIntegrationClaims = [
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
