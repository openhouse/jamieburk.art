import type { KnowledgeBank } from "./schema.ts";

type KCTownHallPopulationDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

const postReadings = [
  {
    id: "READ-KCTH-SOCIAL-LAUNCH-2018",
    assertionId: "ASSERT-KCTH-SOCIAL-LAUNCH",
    sourceId: "SRC-KCTH-SOCIAL-LAUNCH-2018",
    statement:
      "The KC Town Hall account launched with an invitation to follow and participate in creating a permanent neighborhood resource and cultural center.",
    themes: ["public-identity", "participation", "adaptive-reuse"]
  },
  {
    id: "READ-KCTH-SOCIAL-NEIGHBORHOOD-PROCESS-2018",
    assertionId: "ASSERT-KCTH-NEIGHBORHOOD-PROCESS",
    sourceId: "SRC-KCTH-SOCIAL-NEIGHBORHOOD-PROCESS-2018",
    statement:
      "The account publicly invited neighbors to propose uses for the site and described the project as committed to a neighborhood process.",
    themes: ["neighborhood-process", "participation", "requirements-discovery"]
  },
  {
    id: "READ-KCTH-SOCIAL-TIRES-LAUNCH-2019",
    assertionId: "ASSERT-KCTH-TIRES-LAUNCH-WORKFLOW",
    sourceId: "SRC-KCTH-SOCIAL-TIRES-LAUNCH-2019",
    statement:
      "The account launched a public pathway for Oak Park residents to submit home tire-pickup locations under a defined home-only eligibility rule.",
    themes: ["resident-service", "intake", "eligibility"]
  },
  {
    id: "READ-KCTH-SOCIAL-TIRES-FIRST-MONTH-2019",
    assertionId: "ASSERT-KCTH-TIRES-FIRST-MONTH-FOLLOWTHROUGH",
    sourceId: "SRC-KCTH-SOCIAL-TIRES-FIRST-MONTH-2019",
    statement:
      "The account reported a completed pickup cycle, invited additional locations, and credited Oak Park Neighborhood and named collaborators.",
    themes: ["resident-service", "results-reporting", "collective-credit"]
  },
  {
    id: "READ-KCTH-SOCIAL-TIRES-2019-RECAP",
    assertionId: "ASSERT-KCTH-TIRES-2019-ACCOUNT-REPORTED",
    sourceId: "SRC-KCTH-SOCIAL-TIRES-2019-RECAP",
    statement:
      "The account reported 599 tires collected during 2019, $13,235 in avoided disposal fees, and a planned 2020 return.",
    themes: ["resident-service", "self-reported-metrics", "continuity"]
  },
  {
    id: "READ-KCTH-SOCIAL-TIRES-FOLLOWTHROUGH-2020",
    assertionId: "ASSERT-KCTH-TIRES-REPLY-FOLLOWTHROUGH",
    sourceId: "SRC-KCTH-SOCIAL-TIRES-FOLLOWTHROUGH-2020",
    statement:
      "A KC Town Hall reply documented an after-update and invited people to submit additional pickup locations.",
    themes: ["resident-service", "feedback-loop", "follow-through"]
  },
  {
    id: "READ-KCTH-SOCIAL-TIRES-2021-RECAP",
    assertionId: "ASSERT-KCTH-TIRES-2021-ACCOUNT-REPORTED",
    sourceId: "SRC-KCTH-SOCIAL-TIRES-2021-RECAP",
    statement:
      "The account reported 112 tires collected that month, more than $32,000 in avoided fees, and a planned 2022 return.",
    themes: ["resident-service", "self-reported-metrics", "continuity"]
  }
] as const;

export const kctownhallPopulationDevelopmentRecords: KCTownHallPopulationDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-KCTH-FULL-POPULATION",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary:
        "Perform an archival-production pass on 100 percent of the @KCTownHall post population.",
      sourceUrl: "https://x.com/KCTownHall",
      projectHints: ["kc-town-hall"],
      status: "processed",
      disposition:
        "Recovered and classified all 183 profile-counted records, added the archived Julia-and-Jamie service workflow, promoted bounded population and resident-service claims, and held uncorroborated outcome totals.",
      linkedRecordIds: [
        "SRC-KCTH-LIVE-PROFILE-CONTROL-2026",
        "SRC-KCTH-FULL-POPULATION-RUN-2026",
        "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
        "INQ-KCTH-FULL-POPULATION-2026",
        "CND-KCTH-COMPLETE-SOCIAL-POPULATION",
        "CND-KCTH-RESIDENT-SERVICE-WORKFLOW",
        "CND-KCTH-TIRES-OUTCOME-TOTALS"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-KCTH-LIVE-PROFILE-CONTROL-2026",
      sourceId: "SRC-KCTH-LIVE-PROFILE-CONTROL-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated profile review",
      assertions: [
        {
          id: "ASSERT-KCTH-PROFILE-CONTROL-183",
          statement:
            "The live @KCTownHall profile displayed 183 posts and a March 2018 join date.",
          locator: "Profile heading and account metadata",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The current profile counter cannot establish whether older records were deleted before capture."
      ],
      entityIds: ["KC-Town-Hall"],
      themeIds: ["population-accounting"],
      candidateClaimIds: ["CND-KCTH-COMPLETE-SOCIAL-POPULATION"]
    },
    {
      id: "READ-KCTH-FULL-POPULATION-RUN-2026",
      sourceId: "SRC-KCTH-FULL-POPULATION-RUN-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-KCTH-FULL-RECOVERY-183",
          statement:
            "Posts and Replies reconciliation recovered all 183 unique records represented by the live profile control.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-AUTHORSHIP-TYPES",
          statement:
            "The population contains 142 authored standalone posts, 13 authored replies, and 28 reposts from 16 other accounts.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-TIRES-RECORD-COUNT",
          statement:
            "One hundred records concern resident tire pickup or program follow-through; 98 explicitly carry the Tired of Tires hashtag.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-TEMPORAL-BOUNDS",
          statement:
            "Recovered activity runs from July 2, 2018, through September 24, 2022.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Account authorship does not identify which teammate wrote each record.",
        "The census does not independently validate project-reported outcome totals.",
        "The account's continuation after Jamie's transition does not establish his continuing responsibility."
      ],
      entityIds: ["KC-Town-Hall", "Oak-Park-Neighborhood-Association"],
      themeIds: [
        "population-accounting",
        "resident-service",
        "environmental-action",
        "public-documentation"
      ],
      candidateClaimIds: [
        "CND-KCTH-COMPLETE-SOCIAL-POPULATION",
        "CND-KCTH-RESIDENT-SERVICE-WORKFLOW",
        "CND-KCTH-TIRES-OUTCOME-TOTALS"
      ]
    },
    {
      id: "READ-KCTH-TIRES-ARCHIVED-PAGE-2021",
      sourceId: "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
      readAt: "2026-07-12",
      reader: "Codex Wayback close reading",
      assertions: [
        {
          id: "ASSERT-KCTH-TIRES-JULIA-JAMIE-AUTHORS",
          statement:
            "The archived Tired of Tires page identifies its authors as Julia and Jamie.",
          locator: "Article metadata and author card",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-TIRES-COLLECTIVE-CREDIT",
          statement:
            "The page credits KC Town Hall and Oak Park Neighborhood Association with the monthly free tire-pickup service.",
          locator: "Opening paragraph and metadata description",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-TIRES-WORKFLOW",
          statement:
            "The page provides request and volunteer forms, home-only eligibility, recurring dates, and a public contact pathway.",
          locator: "Request Free Tire Pickup and 2021 Pickup Dates sections",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-KCTH-TIRES-PAGE-REPORTED-SAVINGS",
          statement:
            "The archived 2021 revision reports $20,023 in avoided tire-disposal fees.",
          locator: "Opening service description",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The page is project-authored and does not independently audit its savings figure.",
        "The page supports Julia and Jamie's public authorship, not solo operation of the program."
      ],
      entityIds: ["KC-Town-Hall", "Oak-Park-Neighborhood-Association"],
      themeIds: ["resident-service", "workflow", "collective-credit"],
      candidateClaimIds: [
        "CND-KCTH-RESIDENT-SERVICE-WORKFLOW",
        "CND-KCTH-TIRES-OUTCOME-TOTALS"
      ]
    },
    ...postReadings.map((reading) => ({
      id: reading.id,
      sourceId: reading.sourceId,
      readAt: "2026-07-12" as const,
      reader: "Codex public-post review",
      assertions: [
        {
          id: reading.assertionId,
          statement: reading.statement,
          confidence: "high" as const,
          publicSafe: true
        }
      ],
      limitations: [
        "The shared account record does not identify the individual teammate who authored the post.",
        "Any quantitative outcome in the post is project-reported rather than independently audited."
      ],
      entityIds: ["KC-Town-Hall"],
      themeIds: [...reading.themes],
      candidateClaimIds: [
        "CND-KCTH-RESIDENT-SERVICE-WORKFLOW",
        ...(([...reading.themes] as readonly string[]).includes("self-reported-metrics")
          ? ["CND-KCTH-TIRES-OUTCOME-TOTALS"]
          : [])
      ]
    }))
  ],
  candidateClaims: [
    {
      id: "CND-KCTH-COMPLETE-SOCIAL-POPULATION",
      project: "kc-town-hall",
      text:
        "All 183 profile-counted @KCTownHall records were recovered: 142 authored standalone posts, 13 authored replies, and 28 reposts from 16 other accounts.",
      status: "promoted",
      sourceIds: [
        "SRC-KCTH-LIVE-PROFILE-CONTROL-2026",
        "SRC-KCTH-FULL-POPULATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      supportSummary:
        "The 170-record Posts surface plus 13 additional KC Town Hall-authored replies closes exactly against the 183-post live control.",
      missingEvidence: [],
      boundaries: [
        "Current full-population recovery does not establish that no older record was deleted or identify individual teammate authorship."
      ],
      promotedClaimId: "CLM-KCTH-COMPLETE-SOCIAL-POPULATION",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-KCTH-RESIDENT-SERVICE-WORKFLOW",
      project: "kc-town-hall",
      text:
        "Julia and Jamie published a recurring resident-service workflow for Tired of Tires, credited collectively to KC Town Hall and Oak Park Neighborhood Association and supported by account-level pickup and follow-through updates.",
      status: "promoted",
      sourceIds: [
        "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
        "SRC-KCTH-SOCIAL-TIRES-LAUNCH-2019",
        "SRC-KCTH-SOCIAL-TIRES-FIRST-MONTH-2019",
        "SRC-KCTH-SOCIAL-TIRES-FOLLOWTHROUGH-2020",
        "SRC-KCTH-SOCIAL-TIRES-2021-RECAP"
      ],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      supportSummary:
        "The archived page supplies direct Julia-and-Jamie authorship and collective program credit; the social record documents intake, schedules, pickup updates, and recurring follow-through.",
      missingEvidence: [],
      boundaries: [
        "Credit Julia and Jamie for the page and KC Town Hall with Oak Park Neighborhood Association for the service; do not assign every post or operation to Jamie."
      ],
      promotedClaimId: "CLM-KCTH-RESIDENT-SERVICE-WORKFLOW",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-KCTH-TIRES-OUTCOME-TOTALS",
      project: "kc-town-hall",
      text:
        "Tired of Tires collected the account-reported tire totals and produced the account-reported avoided-disposal savings published from 2019 through 2021.",
      status: "research-needed",
      sourceIds: [
        "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
        "SRC-KCTH-SOCIAL-TIRES-2019-RECAP",
        "SRC-KCTH-SOCIAL-TIRES-2021-RECAP"
      ],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      supportSummary:
        "The project page and account repeatedly report cumulative outcomes, but this pass did not recover an independent audit or partner record validating the totals.",
      missingEvidence: [
        "Independent recycling-center, disposal, municipal, partner, or contemporaneous reporting that corroborates the totals and calculation method."
      ],
      boundaries: [
        "Retain the figures as project-reported archival assertions until independently corroborated."
      ],
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    {
      id: "PROM-KCTH-COMPLETE-SOCIAL-POPULATION-2026",
      candidateClaimId: "CND-KCTH-COMPLETE-SOCIAL-POPULATION",
      claimId: "CLM-KCTH-COMPLETE-SOCIAL-POPULATION",
      decision: "promoted",
      reason: "The record-level census closes exactly against the live 183-post control.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-KCTH-RESIDENT-SERVICE-WORKFLOW-2026",
      candidateClaimId: "CND-KCTH-RESIDENT-SERVICE-WORKFLOW",
      claimId: "CLM-KCTH-RESIDENT-SERVICE-WORKFLOW",
      decision: "promoted",
      reason:
        "The archived Julia-and-Jamie page and complete social record make the resident-service workflow concrete while preserving collective credit.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-KCTH-TIRES-OUTCOME-TOTALS-2026",
      candidateClaimId: "CND-KCTH-TIRES-OUTCOME-TOTALS",
      decision: "held",
      reason:
        "The totals are useful project-reported evidence but should not become unqualified portfolio metrics without independent corroboration.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-KCTH-SOCIAL-POPULATION-EDITORIAL-2026",
      audience: "Hiring managers and public-interest implementation collaborators",
      goal:
        "Use the complete social record to show how neighborhood participation became an operating service without turning the case study into a social timeline.",
      argument:
        "Jamie worked at the boundary between long-horizon redevelopment and immediate resident usefulness, co-authoring a service workflow that translated neighborhood reports into recurring action and visible follow-through.",
      selectedClaimIds: [
        "CLM-KCTH-RESIDENT-SERVICE-WORKFLOW",
        "CLM-KCTH-COMPLETE-SOCIAL-POPULATION"
      ],
      heldCandidateClaimIds: ["CND-KCTH-TIRES-OUTCOME-TOTALS"],
      rationale: [
        "Project the workflow because it makes Jamie's implementation practice specific and gives collaborators fair credit.",
        "Keep the 183-record population and thematic taxonomy in the knowledge bank.",
        "Hold account-reported tire and savings totals until independent corroboration is recovered."
      ],
      createdAt: "2026-07-12"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-KCTH-TIRES-INDEPENDENT-CORROBORATION-2026",
      kind: "archive-research",
      summary:
        "Seek recycling-center, municipal, Oak Park Neighborhood Association, disposal, or contemporaneous reporting records that can independently corroborate Tired of Tires pickup and avoided-fee totals.",
      projectHints: ["kc-town-hall"],
      sourceIds: [
        "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
        "SRC-KCTH-SOCIAL-TIRES-2019-RECAP",
        "SRC-KCTH-SOCIAL-TIRES-2021-RECAP"
      ],
      candidateClaimIds: ["CND-KCTH-TIRES-OUTCOME-TOTALS"],
      rightsReviewRequired: false,
      status: "researching",
      createdAt: "2026-07-12"
    }
  ]
};
