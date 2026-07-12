import type { KnowledgeBank } from "./schema.ts";

type KcTownHallCouncilDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const kcTownHallCouncilDevelopmentRecords: KcTownHallCouncilDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-KC-TOWN-HALL-COUNCIL-ALLOCATION",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary: "Locate and ingest the fact that the Kansas City Council acted on the CCED Board's KC Town Hall funding recommendation.",
      projectHints: ["kc-town-hall"],
      status: "processed",
      disposition: "Recovered Council adoption, companion appropriation, and the later clawback; promoted authorization while keeping receipt and disbursement explicitly unclaimed.",
      linkedRecordIds: [
        "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
        "SRC-KCMO-CCED-ORDINANCE-190642-2019",
        "SRC-KCMO-CCED-CLAWBACK-240317-2024",
        "INQ-KC-TOWN-HALL-COUNCIL-AUTHORIZATION-2026",
        "CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION",
        "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"
      ]
    },
    {
      id: "INT-2026-07-12-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "memory",
      visibility: "public-safe",
      summary: "Jamie confirms that he transitioned the KC Town Hall project to a mission-aligned organization.",
      projectHints: ["kc-town-hall"],
      status: "processed",
      disposition: "Promoted the professional continuity action while excluding the receiving organization's identity, transition terms, and reasons from the public record.",
      linkedRecordIds: [
        "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026",
        "INQ-KC-TOWN-HALL-COUNCIL-AUTHORIZATION-2026",
        "CND-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION",
        "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
      sourceId: "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "ASSERT-KCTH-COUNCIL-ADOPTED-190649", statement: "The Council adopted Resolution 190649 as substituted on September 26, 2019.", locator: "Legislative history", confidence: "high", publicSafe: true },
        { id: "ASSERT-KCTH-COUNCIL-ACCEPTED-ALLOCATION", statement: "The resolution accepted the CCED Board recommendation to fund KC Town Hall in the amount of $490,539.", locator: "Resolution title", confidence: "high", publicSafe: true },
        { id: "ASSERT-KCTH-COUNCIL-AUTHORIZED-NEGOTIATION", statement: "The resolution authorized the City Manager to negotiate a funding agreement.", locator: "Resolution title", confidence: "high", publicSafe: true }
      ],
      limitations: ["Adoption authorized the funding path; it does not establish an executed agreement, disbursement, or completed redevelopment."],
      entityIds: ["KC-Town-Hall", "KCMO-City-Council"],
      themeIds: ["municipal-review", "funding-authorization"],
      candidateClaimIds: ["CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION", "CND-KC-TOWN-HALL-FUNDING-AWARD"]
    },
    {
      id: "READ-KCMO-CCED-ORDINANCE-190642-2019",
      sourceId: "SRC-KCMO-CCED-ORDINANCE-190642-2019",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "ASSERT-KCTH-COUNCIL-PASSED-190642", statement: "The Council passed Ordinance 190642 as substituted on September 26, 2019.", locator: "Legislative history", confidence: "high", publicSafe: true },
        { id: "ASSERT-KCTH-ROUND-TWO-APPROPRIATION", statement: "The ordinance reappropriated $10,691,631 from the Central City Sales Tax Fund into designated Round Two project accounts.", locator: "Ordinance title", confidence: "high", publicSafe: true }
      ],
      limitations: ["The ordinance's public title establishes the Round Two appropriation mechanism; the later authenticated ordinance supplies the KC Town Hall-specific amount."],
      entityIds: ["KC-Town-Hall", "KCMO-City-Council"],
      themeIds: ["municipal-review", "public-appropriation"],
      candidateClaimIds: ["CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION", "CND-KC-TOWN-HALL-FUNDING-AWARD"]
    },
    {
      id: "READ-KCMO-CCED-CLAWBACK-240317-2024",
      sourceId: "SRC-KCMO-CCED-CLAWBACK-240317-2024",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "ASSERT-KCTH-190642-SPECIFIC-APPROPRIATION", statement: "The 2024 ordinance states that Ordinance 190642 appropriated $490,539 to the KC Town Hall project account.", locator: "First WHEREAS clause", confidence: "high", publicSafe: true },
        { id: "ASSERT-KCTH-PROJECT-WITHDREW", statement: "The ordinance states that KC Town Hall withdrew and would no longer proceed with the project.", locator: "Withdrawal WHEREAS clause", confidence: "high", publicSafe: true },
        { id: "ASSERT-KCTH-UNUSED-ALLOCATION-REAPPROPRIATED", statement: "The Council reduced the KC Town Hall project account by $490,539 and reappropriated the unused funds in 2024.", locator: "Sections 1 and 2", confidence: "high", publicSafe: true }
      ],
      limitations: ["The record establishes appropriation and later reclamation of the unused allocation, not receipt or expenditure by KC Town Hall; it does not explain why the project withdrew."],
      entityIds: ["KC-Town-Hall", "KCMO-City-Council"],
      themeIds: ["public-appropriation", "project-closeout", "funding-boundary"],
      candidateClaimIds: ["CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION", "CND-KC-TOWN-HALL-FUNDING-AWARD"]
    },
    {
      id: "READ-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026",
      sourceId: "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026",
      readAt: "2026-07-12",
      reader: "Codex public-safe review",
      assertions: [
        { id: "ASSERT-KCTH-MISSION-ALIGNED-TRANSITION", statement: "Jamie confirms that he transitioned the KC Town Hall project to a mission-aligned organization.", confidence: "high", publicSafe: true },
        { id: "ASSERT-KCTH-TRANSITION-CONTINUITY", statement: "The transition was an intentional project-continuity action as Jamie's direct involvement concluded.", confidence: "high", publicSafe: true }
      ],
      limitations: ["Do not publish the receiving organization's identity, transition terms, or reasons for the transition without a separate public-source and approval pass."],
      entityIds: ["Jamie-Burkart", "KC-Town-Hall"],
      themeIds: ["project-transition", "mission-aligned-continuity", "public-private-boundary"],
      candidateClaimIds: ["CND-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION",
      project: "kc-town-hall",
      text: "After the CCED Board recommendation, the Kansas City Council accepted and appropriated $490,539 for KC Town Hall while authorizing negotiation of a funding agreement; the unused allocation was later reappropriated after the project withdrew.",
      status: "promoted",
      sourceIds: [
        "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
        "SRC-KCMO-CCED-ORDINANCE-190642-2019",
        "SRC-KCMO-CCED-CLAWBACK-240317-2024"
      ],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-AUTHORIZATION-2026"],
      supportSummary: "Official Council histories and the later authenticated clawback ordinance establish adoption, appropriation, and the unused allocation's return.",
      missingEvidence: [],
      boundaries: ["Do not turn authorization or appropriation into receipt, expenditure, an executed agreement, or completed construction."],
      promotedClaimId: "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION",
      project: "kc-town-hall",
      text: "As his direct involvement concluded, Jamie transitioned the KC Town Hall project to a mission-aligned organization.",
      status: "promoted",
      sourceIds: ["SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-AUTHORIZATION-2026"],
      supportSummary: "Jamie directly confirms the transition and approves the bounded professional fact for public portfolio use.",
      missingEvidence: [],
      boundaries: ["Do not identify the receiving organization or publish the transition's reasons or terms."],
      promotedClaimId: "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD",
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    {
      id: "PROM-KC-TOWN-HALL-COUNCIL-AUTHORIZATION-2026",
      candidateClaimId: "CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION",
      claimId: "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD",
      decision: "promoted",
      reason: "Official records directly establish the Council milestone and later lifecycle, allowing stronger wording without implying payment or completion.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex public-source review"]
    },
    {
      id: "PROM-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION-2026",
      candidateClaimId: "CND-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION",
      claimId: "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD",
      decision: "promoted",
      reason: "The transition shows responsible project continuity and is public-safe when its private reasons and terms remain omitted.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex public-safe review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-KC-TOWN-HALL-COUNCIL-AUTHORIZATION-2026",
      audience: "Hiring managers, public-sector implementation teams, and referrers",
      goal: "Make the municipal implementation milestone visible while preserving the difference between authorization and payment.",
      argument: "Jamie helped carry an adaptive-reuse proposal from public-benefit framing and board review through Council authorization and appropriation, then transitioned the project to a mission-aligned organization as his direct involvement concluded.",
      selectedClaimIds: ["CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"],
      heldCandidateClaimIds: ["CND-KC-TOWN-HALL-FUNDING-AWARD"],
      rationale: ["Council adoption and appropriation are strong, independently verifiable milestones.", "The mission-aligned transition shows continuity and responsible handoff without disclosing private reasons or terms.", "The later withdrawal belongs in the same lifecycle so readers are not led to infer disbursement or construction."],
      createdAt: "2026-07-12"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-KC-TOWN-HALL-ALLOCATION-LIFECYCLE-2026",
      kind: "archive-research",
      summary: "The Council record closes the authorization question and redirects any future research toward the agreement negotiations, withdrawal context, and project afterlife without making those private details prerequisites for the bounded public claim.",
      projectHints: ["kc-town-hall"],
      sourceIds: ["SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019", "SRC-KCMO-CCED-ORDINANCE-190642-2019", "SRC-KCMO-CCED-CLAWBACK-240317-2024"],
      candidateClaimIds: ["CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION", "CND-KC-TOWN-HALL-FUNDING-AWARD"],
      rightsReviewRequired: false,
      status: "processed",
      createdAt: "2026-07-12"
    }
  ]
};
