import { knowledgeLifecycleSchema } from "./lifecycle-schema.ts";

const knowledgeLifecycleInput = {
  entities: [
    {
      id: "ENT-JAMIE-BURKART",
      type: "person",
      name: "Jamie Burkart",
      aliases: ["James Burkart"],
      publicSummary:
        "Technical project manager, product operations and implementation lead, and civic-cultural practitioner.",
      sameAs: ["https://jamieburk.art/"]
    },
    {
      id: "ENT-CALLNYC",
      type: "platform",
      name: "CallNYC",
      aliases: ["CallNYC.org"],
      publicSummary:
        "Jamie's archived independent civic-data prototype for interpreting CouncilStat constituent-services records.",
      sameAs: ["https://github.com/openhouse/CallNYC"]
    },
    {
      id: "ENT-NYC-COUNCIL",
      type: "organization",
      name: "New York City Council",
      aliases: ["NYC Council"],
      publicSummary: "The legislative body of New York City.",
      sameAs: ["https://council.nyc.gov/"]
    }
  ],
  projects: [
    {
      id: "PRJ-CALLNYC",
      title: "CallNYC",
      aliases: ["CallNYC.org"],
      summary:
        "An independent resident-facing interpretation of New York City Council constituent-services data.",
      dateRange: "2016",
      startYear: 2016,
      endYear: 2016,
      domains: ["civic technology", "public information"],
      capabilities: ["data interpretation", "product development", "public-interest UX"],
      canonicalProjectKeys: ["callnyc"],
      proofIds: ["callnyc-civic-data-guidance"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-CALLNYC", "ENT-NYC-COUNCIL"],
      status: "historical"
    }
  ],
  leads: [
    {
      id: "LEAD-CALLNYC-CIVIC-HALL-EVENT",
      title: "Civic Hall CouncilStat event announcement",
      kind: "source-url",
      capturedAt: "2026-07-11",
      capturedBy: "Jamie Burkart and Codex archival review",
      state: "extracted",
      visibility: "public",
      publicSummary:
        "A dated public announcement establishes the CouncilStat event date, time, purpose, and venue context.",
      publicUrl: "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
      projectAssociationStatus: "assigned",
      projectIds: ["PRJ-CALLNYC"],
      entityIds: ["ENT-NYC-COUNCIL"],
      sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433"],
      candidateClaimIds: ["CND-CALLNYC-EVENT-TIME"],
      researchTaskIds: [],
      nextAction: "Retain the direct announcement as the schedule authority."
    },
    {
      id: "LEAD-CALLNYC-POLITICO",
      title: "Politico New York CallNYC coverage",
      kind: "source-url",
      capturedAt: "2026-07-11",
      capturedBy: "Jamie Burkart and Codex archival review",
      state: "extracted",
      visibility: "public",
      publicSummary:
        "Independent reporting connects Jamie to the event, fuller data release, and subsequent development of CallNYC.",
      publicUrl:
        "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
      projectAssociationStatus: "assigned",
      projectIds: ["PRJ-CALLNYC"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-CALLNYC", "ENT-NYC-COUNCIL"],
      sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"],
      candidateClaimIds: ["CND-CALLNYC-INDEPENDENT-FOLLOW-ON"],
      researchTaskIds: [],
      nextAction: "Keep the independent follow-on and unofficial-status boundaries attached."
    },
    {
      id: "LEAD-STRUCTURE-GROWS-FROM-MATERIAL",
      title: "Structure grows from the material",
      kind: "memory",
      capturedAt: "2026-07-16",
      capturedBy: "Jamie Burkart",
      state: "triaged",
      visibility: "public-safe",
      publicSummary:
        "Jamie describes a recurring practice of surfacing nascent structure and giving it resilient form through care, participation, and useful handoff.",
      projectAssociationStatus: "unassigned",
      projectIds: [],
      entityIds: ["ENT-JAMIE-BURKART"],
      sourceIds: [],
      candidateClaimIds: ["CND-STRUCTURE-GROWS-FROM-MATERIAL"],
      researchTaskIds: ["TASK-STRUCTURE-GROWS-CROSS-PROJECT"],
      nextAction:
        "Test the pattern across independently sourced project records before treating it as a public professional claim."
    }
  ],
  observations: [
    {
      id: "OBS-CALLNYC-EVENT-TIME",
      sourceId: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      projectIds: ["PRJ-CALLNYC"],
      entityIds: ["ENT-NYC-COUNCIL"],
      statement:
        "The dated Civic Hall announcement gives January 30, 2016, 1-3 p.m., and a constituent-services focus.",
      locator: "Archived announcement, embedded dated social post",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["a recovered event-detail page", "a complete agenda"],
      candidateClaimIds: ["CND-CALLNYC-EVENT-TIME"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-CALLNYC-EVENT-TIME",
          evidenceRole: "direct-support",
          supports: "The source directly establishes the bounded public event schedule.",
          limitations: ["It does not establish every event detail or participant."]
        }
      ],
      reviewedAt: "2026-07-11"
    },
    {
      id: "OBS-CALLNYC-POLITICO-INDEPENDENT-FOLLOW-ON",
      sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
      projectIds: ["PRJ-CALLNYC"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-CALLNYC", "ENT-NYC-COUNCIL"],
      statement:
        "Politico New York reported that Jamie continued working after the event and developed CallNYC after the fuller CouncilStat data release.",
      locator: "Archived article, opening and Jamie-attributed passages",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["an official Council commission", "a winning hackathon submission"],
      candidateClaimIds: ["CND-CALLNYC-INDEPENDENT-FOLLOW-ON"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-CALLNYC-INDEPENDENT-FOLLOW-ON",
          evidenceRole: "direct-support",
          supports: "Independent reporting directly supports Jamie's development role and chronology.",
          limitations: ["It does not establish official ownership, commission, or winner status."]
        }
      ],
      reviewedAt: "2026-07-11"
    },
    {
      id: "OBS-CALLNYC-GITHUB-IMPLEMENTATION",
      sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY",
      projectIds: ["PRJ-CALLNYC"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-CALLNYC"],
      statement: "The public repository preserves the surviving CallNYC implementation.",
      locator: "Public repository, source tree and repository metadata",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: ["current operation", "official Council ownership"],
      candidateClaimIds: ["CND-CALLNYC-INDEPENDENT-FOLLOW-ON"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-CALLNYC-INDEPENDENT-FOLLOW-ON",
          evidenceRole: "corroborating",
          supports: "The implementation corroborates that the described public-facing prototype existed.",
          limitations: ["Repository survival does not establish current service status or institutional ownership."]
        }
      ],
      reviewedAt: "2026-07-11"
    }
  ],
  candidateClaims: [
    {
      id: "CND-CALLNYC-EVENT-TIME",
      projectIds: ["PRJ-CALLNYC"],
      proposition:
        "The CouncilStat event took place at Civic Hall on January 30, 2016, from 1-3 p.m.",
      maturity: "promoted",
      confidence: "high",
      observationIds: ["OBS-CALLNYC-EVENT-TIME"],
      requiredEvidence: ["a direct dated event announcement"],
      boundaries: ["Do not call the archived feed a recovered event-detail page."],
      antiClaims: ["The participant-photo timestamp establishes the event schedule."],
      counterevidencePosture: "Replace the schedule only if a more direct official record conflicts.",
      sourceIndependenceNote: "The announcement is direct schedule evidence, not impact evidence.",
      researchTaskIds: [],
      promotionDecisionIds: ["DEC-CALLNYC-EVENT-TIME-PROMOTE"],
      targetCanonicalClaimId: "CLM-CALLNYC-HACKATHON-DATE-TIME",
      updatedAt: "2026-07-11"
    },
    {
      id: "CND-CALLNYC-INDEPENDENT-FOLLOW-ON",
      projectIds: ["PRJ-CALLNYC"],
      proposition:
        "After the fuller CouncilStat data release, Jamie independently developed CallNYC as a public-facing interpretation of constituent-services records.",
      maturity: "promoted",
      confidence: "high",
      observationIds: [
        "OBS-CALLNYC-POLITICO-INDEPENDENT-FOLLOW-ON",
        "OBS-CALLNYC-GITHUB-IMPLEMENTATION"
      ],
      requiredEvidence: ["independent reporting", "surviving implementation"],
      boundaries: ["CallNYC was unofficial and independent."],
      antiClaims: ["CallNYC was commissioned by the Council.", "CallNYC was a documented winner."],
      counterevidencePosture:
        "Correct or retire the claim if institutional records contradict the independent follow-on framing.",
      sourceIndependenceNote:
        "Independent reporting supports role and chronology; the repository corroborates implementation.",
      researchTaskIds: [],
      promotionDecisionIds: ["DEC-CALLNYC-INDEPENDENT-FOLLOW-ON-PROMOTE"],
      targetCanonicalClaimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      updatedAt: "2026-07-11"
    },
    {
      id: "CND-STRUCTURE-GROWS-FROM-MATERIAL",
      projectIds: [],
      proposition:
        "Jamie repeatedly surfaces nascent structure already present in people, systems, places, or materials and gives it resilient, usable form.",
      maturity: "researching",
      confidence: "limited",
      observationIds: [],
      requiredEvidence: [
        "cross-project examples with role evidence",
        "at least one independent or collaborator source",
        "counterexamples that test whether the pattern is selective"
      ],
      boundaries: ["Treat Jamie's formulation as a research lead, not independent proof."],
      antiClaims: ["Every project began without structure.", "Jamie imposed a universal method."],
      counterevidencePosture:
        "Narrow or reject the pattern if project evidence shows materially different operating methods.",
      sourceIndependenceNote: "This is Jamie's own synthesis and requires cross-project testing.",
      researchTaskIds: ["TASK-STRUCTURE-GROWS-CROSS-PROJECT"],
      promotionDecisionIds: ["DEC-STRUCTURE-GROWS-RESEARCH"],
      updatedAt: "2026-07-16"
    }
  ],
  candidateEvents: [
    {
      id: "EVT-CALLNYC-EVENT-TIME-PROMOTED",
      candidateClaimId: "CND-CALLNYC-EVENT-TIME",
      toMaturity: "promoted",
      occurredAt: "2026-07-11",
      actor: "Jamie Burkart and Codex archival review",
      reason: "Direct dated event evidence replaced a weaker photograph-timestamp inference.",
      decisionId: "DEC-CALLNYC-EVENT-TIME-PROMOTE"
    },
    {
      id: "EVT-CALLNYC-INDEPENDENT-FOLLOW-ON-PROMOTED",
      candidateClaimId: "CND-CALLNYC-INDEPENDENT-FOLLOW-ON",
      toMaturity: "promoted",
      occurredAt: "2026-07-11",
      actor: "Jamie Burkart and Codex archival review",
      reason: "Independent reporting and public implementation support the bounded role claim.",
      decisionId: "DEC-CALLNYC-INDEPENDENT-FOLLOW-ON-PROMOTE"
    },
    {
      id: "EVT-STRUCTURE-GROWS-RESEARCHING",
      candidateClaimId: "CND-STRUCTURE-GROWS-FROM-MATERIAL",
      toMaturity: "researching",
      occurredAt: "2026-07-16",
      actor: "Jamie Burkart and Codex research review",
      reason: "The formulation is valuable but still needs cross-project testing.",
      decisionId: "DEC-STRUCTURE-GROWS-RESEARCH"
    }
  ],
  researchTasks: [
    {
      id: "TASK-STRUCTURE-GROWS-CROSS-PROJECT",
      candidateClaimIds: ["CND-STRUCTURE-GROWS-FROM-MATERIAL"],
      question:
        "Across which independently documented projects does Jamie surface existing relationships or structure and give them usable form?",
      status: "open",
      priority: "medium",
      methods: ["cross-project claim comparison", "independent-source review", "counterexample search"],
      sourceIds: [],
      observationIds: [],
      findings: [],
      limitations: ["The seed formulation is first-person and may overfit remembered successes."],
      nextActions: [
        "Compare CallNYC, WOW List, NYC Artist Coalition, KC Town Hall, and technical-operations evidence.",
        "Retain unlike methods and counterexamples rather than forcing a single pattern."
      ],
      openedAt: "2026-07-16"
    }
  ],
  promotionDecisions: [
    {
      id: "DEC-CALLNYC-EVENT-TIME-PROMOTE",
      candidateClaimId: "CND-CALLNYC-EVENT-TIME",
      decision: "promote",
      rationale: "Direct schedule evidence and Jamie review support the bounded wording.",
      evidenceThreshold: "Direct dated announcement and explicit archival boundary.",
      decidedAt: "2026-07-11",
      decidedBy: ["Jamie Burkart", "Codex archival review"],
      reviewAuthority: "jamie-approved",
      humanReviewStatus: "approved",
      humanReviewer: "Jamie Burkart",
      targetCanonicalClaimId: "CLM-CALLNYC-HACKATHON-DATE-TIME",
      allowedSurfaces: ["knowledge-bank", "/work/callnyc"],
      guardrails: ["Do not treat photograph metadata as event hours."]
    },
    {
      id: "DEC-CALLNYC-INDEPENDENT-FOLLOW-ON-PROMOTE",
      candidateClaimId: "CND-CALLNYC-INDEPENDENT-FOLLOW-ON",
      decision: "promote",
      rationale:
        "Independent reporting and the surviving implementation support Jamie's bounded development role.",
      evidenceThreshold: "Independent contemporaneous reporting, implementation evidence, and Jamie review.",
      decidedAt: "2026-07-11",
      decidedBy: ["Jamie Burkart", "Codex archival review"],
      reviewAuthority: "jamie-approved",
      humanReviewStatus: "approved",
      humanReviewer: "Jamie Burkart",
      targetCanonicalClaimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      allowedSurfaces: ["knowledge-bank", "/work/callnyc", "/work", "/resume"],
      guardrails: [
        "Keep independent and unofficial language.",
        "Do not imply commission, winner status, or causation of the data release."
      ]
    },
    {
      id: "DEC-STRUCTURE-GROWS-RESEARCH",
      candidateClaimId: "CND-STRUCTURE-GROWS-FROM-MATERIAL",
      decision: "research",
      rationale:
        "The formulation is meaningful first-person evidence but not yet an independently defensible public claim.",
      evidenceThreshold: "Cross-project evidence, counterexamples, and independent or collaborator corroboration.",
      decidedAt: "2026-07-16",
      decidedBy: ["Codex research review"],
      reviewAuthority: "research-review",
      humanReviewStatus: "not-required",
      allowedSurfaces: ["research-brief"],
      guardrails: ["Do not project this candidate to the public website."]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-CALLNYC-APPLICATION",
      title: "CallNYC application composition",
      audience: "Public-sector and mission-driven hiring managers",
      audienceTags: ["hiring-manager", "public-sector"],
      goal:
        "Show Jamie independently translating public records into a resident-facing civic-data prototype.",
      purposeTags: ["job-application", "technical-operations"],
      status: "active",
      publicationIntent: "public-composition",
      targetSurfaces: ["/work/callnyc"],
      selectionCriteria: [
        "Direct role evidence",
        "Useful result",
        "Low reader burden",
        "Explicit unofficial-status boundary"
      ],
      projectIds: ["PRJ-CALLNYC"],
      canonicalClaimIds: [
        "CLM-CALLNYC-HACKATHON-DATE-TIME",
        "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"
      ],
      candidateClaimIds: [
        "CND-CALLNYC-EVENT-TIME",
        "CND-CALLNYC-INDEPENDENT-FOLLOW-ON"
      ],
      exclusions: [
        "Official-product or winner framing",
        "Unrecovered event-detail claims",
        "Social engagement as endorsement"
      ],
      citationPosture:
        "Keep citations quiet and complete; retain source boundaries in the knowledge layer.",
      chadLensQuestion:
        "Can a hiring reader see what Jamie built, why it was useful, and where the institutional boundary lies?",
      mediaLeadIds: [],
      pageClaimExclusions: [
        {
          claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON",
          reason: "Useful context, but not part of the primary role-and-result argument."
        },
        {
          claimId: "CLM-CALLNYC-EVENT-BRANDING",
          reason: "Supporting event context, not a primary hiring proof."
        },
        {
          claimId: "CLM-CALLNYC-PUBLIC-ISSUE-PATHWAY-CENSUS",
          reason: "A valuable scale proof retained on the page but outside this compact seed brief."
        },
        {
          claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
          reason: "Required historical boundary, not a primary accomplishment claim."
        }
      ]
    }
  ],
  mediaLeads: []
};

export const knowledgeLifecycle = knowledgeLifecycleSchema.parse(knowledgeLifecycleInput);
