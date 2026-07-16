import type { KnowledgeLifecycle } from "./lifecycle-schema.ts";
import { dclaCouncilBridgeSourceIds } from "./dcla-council-bridge.ts";

const reviewedAt = "2026-07-16";
const candidateClaimId = "CND-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017";
const researchTaskId = "TASK-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017";
const decisionId = "DEC-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-PROMOTE-2017";
const projectIds = ["PRJ-NYC-ARTIST-COALITION"];
const entityIds = [
  "ENT-JAMIE-BURKART",
  "ENT-NYC-ARTIST-COALITION",
  "ENT-NYC-DCLA",
  "ENT-NYC-COUNCIL",
  "ENT-TOM-FINKELPEARL",
  "ENT-RAFAEL-ESPINAL",
  "ENT-CABARET-LAW"
];

export const dclaCouncilBridgeLifecycle = {
  entities: [
    {
      id: "ENT-NYC-DCLA",
      type: "organization",
      name: "New York City Department of Cultural Affairs",
      aliases: ["DCLA", "NYC Cultural Affairs"],
      publicSummary:
        "The city agency responsible for supporting New York City's cultural community and municipal cultural policy.",
      sameAs: ["https://www.nyc.gov/site/dcla/index.page"]
    },
    {
      id: "ENT-TOM-FINKELPEARL",
      type: "person",
      name: "Tom Finkelpearl",
      aliases: ["Commissioner Finkelpearl"],
      publicSummary:
        "Commissioner of the New York City Department of Cultural Affairs during the 2017 CreateNYC process.",
      sameAs: []
    },
    {
      id: "ENT-RAFAEL-ESPINAL",
      type: "person",
      name: "Rafael Espinal",
      aliases: ["Rafael L. Espinal Jr.", "Council Member Espinal"],
      publicSummary:
        "New York City Council Member and prime sponsor of the 2017 Cabaret Law repeal legislation.",
      sameAs: []
    }
  ] satisfies KnowledgeLifecycle["entities"],

  observations: [
    {
      id: "OBS-NYCAC-FINKELPEARL-NAMED-BUDGET-REFERENCE-2017",
      sourceId: dclaCouncilBridgeSourceIds.finkelpearlBudget,
      projectIds,
      entityIds,
      statement:
        "In sworn May 2017 budget testimony, Finkelpearl named NYC Artist Coalition and presented its formation after DCLA's January DIY arts meeting as evidence that the cultural-planning process could support a reciprocal relationship with the public beyond regular nonprofit grantee channels.",
      locator: "Transcript pages 91-93",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: [
        "DCLA ownership or control of the coalition",
        "Jamie's sole responsibility for coalition formation",
        "policy causality"
      ],
      candidateClaimIds: [candidateClaimId],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-FINKELPEARL-RECOMMENDATIONS-AND-CONTINUITY-2017",
      sourceId: dclaCouncilBridgeSourceIds.finkelpearlNextSteps,
      projectIds,
      entityIds,
      statement:
        "Finkelpearl testified that DIY-community members submitted formal recommendations to him, continued organizing independently, and created an ongoing relationship DCLA wanted to continue.",
      locator: "Transcript pages 17-18",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: [
        "use of the formal coalition name in this passage",
        "DCLA direction of the group",
        "Jamie's authorship of each recommendation"
      ],
      candidateClaimIds: [candidateClaimId],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-FINKELPEARL-GROUP-ACTIVATION-AND-LISTENING-2017",
      sourceId: dclaCouncilBridgeSourceIds.finkelpearlCulturalPlan,
      projectIds,
      entityIds,
      statement:
        "At the September cultural-plan hearing, Finkelpearl described DIY arts spaces as a group activated around the plan, said the process gave DCLA an opportunity to listen, and connected public recommendations to Cabaret Law review and a nightlife office.",
      locator: "Transcript pages 14-15 and 29-30",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: [
        "use of the formal coalition name in his relevant statement",
        "that the coalition alone originated the policies",
        "adoption of every recommendation"
      ],
      candidateClaimIds: [candidateClaimId],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-DCLA-CREATENYC-INSTITUTIONAL-ACCOUNT-2017",
      sourceId: dclaCouncilBridgeSourceIds.createNycArtists,
      projectIds,
      entityIds,
      statement:
        "DCLA's official CreateNYC page says the January meeting spurred NYC Artist Coalition's establishment and credits the coalition with recommendations and sustained dialogue about preserving artist-led spaces.",
      locator: "NYC Artists section, artist-led community spaces paragraphs",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: [
        "DCLA creation or control of the coalition",
        "a complete founding roster",
        "Jamie's sole authorship or leadership"
      ],
      candidateClaimIds: [candidateClaimId],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-ESPINAL-ON-THE-GROUND-CREDIT-2017",
      sourceId: dclaCouncilBridgeSourceIds.espinalStatedMeeting,
      projectIds,
      entityIds,
      statement:
        "Espinal credited NYC Artist Coalition and Dance Liberation Network for on-the-ground work bringing attention to Intro 1652, then urged Council colleagues to sign on.",
      locator: "Transcript pages 119-121",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: [
        "the coalition as the only advocacy group",
        "Jamie's personal authorship of every credited action",
        "sole causation of sponsorship or passage"
      ],
      candidateClaimIds: [candidateClaimId],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-COUNCIL-TESTIMONY-INTERFACE-2017",
      sourceId: dclaCouncilBridgeSourceIds.cabaretHearing,
      projectIds,
      entityIds,
      statement:
        "The September hearing transcript records multiple NYC Artist Coalition voices, including Jamie, entering safety, equity, and repeal arguments into the formal Council record.",
      locator: "Appearance list and testimony pages 34-35, 71-72, and 104-105",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: [
        "Jamie's authorship of every coalition statement",
        "a complete coalition roster",
        "that testimony alone caused repeal"
      ],
      candidateClaimIds: [candidateClaimId],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-INT-1652-LEGISLATIVE-ENDPOINT-2017",
      sourceId: dclaCouncilBridgeSourceIds.cabaretLegislation,
      projectIds,
      entityIds,
      statement:
        "The official legislative record identifies Espinal as prime sponsor, lists 25 Council sponsors, and records enactment as Local Law 214 of 2017.",
      locator: "Legislation detail page, sponsors, status, and enactment sections",
      evidenceRole: "context",
      certainty: "high",
      doesNotEstablish: [
        "why each member sponsored or voted for the bill",
        "the coalition's precise causal share",
        "Jamie's individual causal contribution"
      ],
      candidateClaimIds: [candidateClaimId],
      candidateRelationships: [],
      reviewedAt
    }
  ] satisfies KnowledgeLifecycle["observations"],

  candidateClaims: [
    {
      id: candidateClaimId,
      projectIds,
      proposition:
        "NYC Artist Coalition's participation system made emerging cultural-space concerns usable to DCLA and the Council through independent organization, formal recommendations, recurring dialogue, public testimony, and legislative attention; Jamie helped build and steward that operating layer with collaborators.",
      maturity: "promoted",
      confidence: "high",
      observationIds: [
        "OBS-NYCAC-FINKELPEARL-NAMED-BUDGET-REFERENCE-2017",
        "OBS-NYCAC-FINKELPEARL-RECOMMENDATIONS-AND-CONTINUITY-2017",
        "OBS-NYCAC-FINKELPEARL-GROUP-ACTIVATION-AND-LISTENING-2017",
        "OBS-NYCAC-DCLA-CREATENYC-INSTITUTIONAL-ACCOUNT-2017",
        "OBS-NYCAC-ESPINAL-ON-THE-GROUND-CREDIT-2017",
        "OBS-NYCAC-COUNCIL-TESTIMONY-INTERFACE-2017",
        "OBS-NYCAC-INT-1652-LEGISLATIVE-ENDPOINT-2017"
      ],
      requiredEvidence: [
        "Finkelpearl's exact named reference",
        "DCLA's official institutional account",
        "Council testimony",
        "Espinal's direct attribution",
        "legislative record",
        "explicit inference and causality boundaries"
      ],
      boundaries: [
        "Treat institutional usefulness as an evidence-based interpretation, not private motive.",
        "Distinguish Finkelpearl's exact May name from his functional descriptions in other hearings.",
        "Preserve coalition, movement, agency, Council, venue, witness, and collaborator credit.",
        "Use helped build and steward for Jamie."
      ],
      antiClaims: [
        "DCLA created or controlled NYC Artist Coalition",
        "The Council needed Jamie personally",
        "Espinal could not advance Intro 1652 without Jamie",
        "Jamie or the coalition alone caused repeal"
      ],
      counterevidencePosture:
        "Add collaborator, agency, Council, or movement records that refine the division of labor or institutional interpretation without erasing the direct public attributions.",
      sourceIndependenceNote:
        "The claim uses first-party government records to establish what DCLA and Council actors said and did; those records support institutional relevance but not a measured causal share for Jamie or the coalition.",
      researchTaskIds: [researchTaskId],
      promotionDecisionIds: [decisionId],
      targetCanonicalClaimId:
        "CLM-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017",
      updatedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["candidateClaims"],

  candidateEvents: [
    {
      id: "EVT-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-PROMOTED-2017",
      candidateClaimId,
      toMaturity: "promoted",
      occurredAt: reviewedAt,
      actor: "Jamie Burkart",
      reason:
        "Official DCLA and Council records directly establish the coalition's institutional visibility, recommendations, testimony, and legislative usefulness while the claim retains collective-credit and causal boundaries.",
      decisionId
    }
  ] satisfies KnowledgeLifecycle["candidateEvents"],

  researchTasks: [
    {
      id: researchTaskId,
      candidateClaimIds: [candidateClaimId],
      question:
        "What do Finkelpearl's Council testimony and related official records establish about NYC Artist Coalition's value to DCLA, the Council, and Espinal?",
      status: "completed",
      priority: "high",
      methods: [
        "Searched official Council transcript indexes for Finkelpearl and exact coalition-name variants",
        "Close-read directly implicated 2017 Council hearings and stated-meeting remarks",
        "Compared Council records with DCLA's official CreateNYC account",
        "Decomposed direct statements, institutional interpretation, and unsupported motive or causality"
      ],
      actions: [
        "public-source-research",
        "source-close-read",
        "claim-decomposition",
        "corroboration"
      ],
      sourceIds: Object.values(dclaCouncilBridgeSourceIds),
      observationIds: [
        "OBS-NYCAC-FINKELPEARL-NAMED-BUDGET-REFERENCE-2017",
        "OBS-NYCAC-FINKELPEARL-RECOMMENDATIONS-AND-CONTINUITY-2017",
        "OBS-NYCAC-FINKELPEARL-GROUP-ACTIVATION-AND-LISTENING-2017",
        "OBS-NYCAC-DCLA-CREATENYC-INSTITUTIONAL-ACCOUNT-2017",
        "OBS-NYCAC-ESPINAL-ON-THE-GROUND-CREDIT-2017",
        "OBS-NYCAC-COUNCIL-TESTIMONY-INTERFACE-2017",
        "OBS-NYCAC-INT-1652-LEGISLATIVE-ENDPOINT-2017"
      ],
      findings: [
        "Finkelpearl used the exact coalition name in the May 19 budget hearing as an example of reciprocal public engagement.",
        "His February and September testimony describes the operating value: recommendations, continued independent organizing, group activation, and a stronger listening channel.",
        "DCLA's official page explicitly links the January meeting to coalition establishment and recommendations.",
        "Espinal directly credited the coalition's on-the-ground work with bringing attention to Intro 1652 while seeking sponsors.",
        "The Council hearing record shows coalition voices, including Jamie, entering arguments into formal deliberation."
      ],
      limitations: [
        "The search was bounded to exact-name indexing and the directly implicated 2017 Council record set.",
        "Public statements do not reveal private motive or quantify causal contribution.",
        "The records do not allocate every coalition action to Jamie."
      ],
      nextActions: [
        "Invite collaborator and policymaker corrections or proof notes",
        "Retain the direct statement versus interpretation distinction",
        "Use the claim on the Fair Rent case study only with public citations and collective credit"
      ],
      openedAt: reviewedAt,
      completedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["researchTasks"],

  promotionDecisions: [
    {
      id: decisionId,
      candidateClaimId,
      decision: "promote",
      rationale:
        "Finkelpearl's exact reference, DCLA's official account, Espinal's direct attribution, coalition testimony, and the legislative record make the institutional-bridge claim useful and defensible when motive, authorship, and causality limits remain explicit.",
      evidenceThreshold:
        "Direct agency and Council statements, formal public participation, legislative context, exact-name audit, collective-credit language, and explicit inference boundaries.",
      decidedAt: reviewedAt,
      decidedBy: ["Jamie Burkart", "Codex official-record review"],
      reviewAuthority: "jamie-approved",
      humanReviewStatus: "approved",
      humanReviewer: "Jamie Burkart",
      targetCanonicalClaimId:
        "CLM-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017",
      allowedSurfaces: ["knowledge-bank", "/work/fair-rent-nyc"],
      guardrails: [
        "Say Finkelpearl named the coalition in the May 19 hearing, not every hearing.",
        "Treat why DCLA and Council benefited as evidence-based institutional interpretation.",
        "Do not claim DCLA ownership, personal necessity, or sole policy causality.",
        "Credit Jamie alongside coalition collaborators and movement partners."
      ]
    }
  ] satisfies KnowledgeLifecycle["promotionDecisions"]
};
