import type { KnowledgeBank } from "./schema.ts";

type WOWListPopulationDevelopment = Pick<
  KnowledgeBank,
  "intakeItems" | "sourceReadings" | "candidateClaims" | "promotions" | "editorialBriefs"
>;

const postReadings = [
  {
    id: "READ-WOWLIST-ORIGIN-SUNDAY-DINNER-2014",
    assertionId: "ASSERT-WOWLIST-ORIGIN-SUNDAY-DINNER",
    sourceId: "SRC-WOWLIST-ORIGIN-SUNDAY-DINNER-2014",
    statement:
      "The first recovered WOWList-authored post names Richard and Jamie and describes the project as based on calendars made at Sunday Dinner.",
    themes: ["product-lineage", "sunday-dinner", "collective-credit"]
  },
  {
    id: "READ-WOWLIST-SUPPORT-FEED-SCOPE-2015",
    assertionId: "ASSERT-WOWLIST-FEED-SCOPE-SUPPORT",
    sourceId: "SRC-WOWLIST-SUPPORT-FEED-SCOPE-2015",
    statement:
      "The WOWList account directly explained how followed local calendars populated a home feed and previewed a local/everywhere control.",
    themes: ["product-support", "feed-scope"]
  },
  {
    id: "READ-WOWLIST-SUPPORT-PROFILE-2015",
    assertionId: "ASSERT-WOWLIST-PROFILE-NAVIGATION-SUPPORT",
    sourceId: "SRC-WOWLIST-SUPPORT-PROFILE-2015",
    statement:
      "The WOWList account directly explained where a person could find all of their WOW Lists on their profile.",
    themes: ["product-support", "profile-navigation"]
  },
  {
    id: "READ-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
    assertionId: "ASSERT-WOWLIST-MULTI-LIST-SUBMISSION-SUPPORT",
    sourceId: "SRC-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
    statement:
      "The WOWList account directly explained how to add an event and assign it to additional WOW Lists.",
    themes: ["product-support", "event-submission"]
  },
  {
    id: "READ-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
    assertionId: "ASSERT-WOWLIST-NYCDIY-IDENTITY",
    sourceId: "SRC-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
    statement: "The WOWList account publicly identified NYCDIY.org as a calendar identity.",
    themes: ["product-support", "local-calendar-identity"]
  },
  {
    id: "READ-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
    assertionId: "ASSERT-WOWLIST-NYCDIY-JOIN",
    sourceId: "SRC-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
    statement:
      "The WOWList account explained that people could join NYCDIY to add shows and receive a weekly email.",
    themes: ["product-support", "onboarding", "event-submission", "weekly-digest"]
  },
  {
    id: "READ-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016",
    assertionId: "ASSERT-WOWLIST-NYCDIY-SUNDAY-DINNER-LINEAGE",
    sourceId: "SRC-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016",
    statement:
      "The WOWList account explained that NYCDIY ran on WOWList and connected the DIY community-calendar project to Sunday Dinner.",
    themes: ["product-support", "product-lineage", "sunday-dinner"]
  }
] as const;

export const wowlistPopulationDevelopmentRecords: WOWListPopulationDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-WOWLIST-FULL-POPULATION",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary: "Perform an archival-production pass on 100 percent of the @wowlist post population.",
      sourceUrl: "https://x.com/wowlist",
      projectHints: ["wowlist"],
      status: "processed",
      disposition:
        "Recovered and classified all 38 profile-counted records and promoted bounded population, support-surface, and civic-care claims.",
      linkedRecordIds: [
        "SRC-WOWLIST-LIVE-PROFILE-CONTROL-2026",
        "SRC-WOWLIST-FULL-POPULATION-RUN-2026",
        "INQ-WOWLIST-FULL-POPULATION-2026",
        "CND-WOWLIST-COMPLETE-SOCIAL-POPULATION",
        "CND-WOWLIST-PUBLIC-SUPPORT-SURFACE",
        "CND-WOWLIST-CIVIC-CARE-CONTINUITY"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-WOWLIST-LIVE-PROFILE-CONTROL-2026",
      sourceId: "SRC-WOWLIST-LIVE-PROFILE-CONTROL-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated profile review",
      assertions: [
        {
          id: "ASSERT-WOWLIST-PROFILE-CONTROL-38",
          statement: "The live @wowlist profile displayed 38 posts and a February 2014 join date.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The profile counter defines the current capture population and cannot establish whether older posts were deleted before capture."
      ],
      entityIds: ["WOWList"],
      themeIds: ["population-accounting"],
      candidateClaimIds: ["CND-WOWLIST-COMPLETE-SOCIAL-POPULATION"]
    },
    {
      id: "READ-WOWLIST-FULL-POPULATION-RUN-2026",
      sourceId: "SRC-WOWLIST-FULL-POPULATION-RUN-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-WOWLIST-FULL-RECOVERY-38",
          statement:
            "Posts and Replies reconciliation recovered 38 unique records against the 38-post profile control.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-AUTHORSHIP-TYPES",
          statement:
            "The population contains 16 authored standalone posts, six authored replies, and 16 reposts from 13 other accounts.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-SUPPORT-SURFACE",
          statement:
            "All six authored replies function as product support, onboarding, or local-calendar identity guidance.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-CIVIC-CARE",
          statement:
            "Five authored posts and five reposts carry civic-mobilization or care themes under the census classification.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Account-authored records do not identify which teammate wrote each post.",
        "The social population does not measure all platform users, events, cities, or support activity.",
        "The classification records communication themes rather than causal impact."
      ],
      entityIds: ["WOWList", "Sunday-Dinner", "NYCDIY"],
      themeIds: [
        "population-accounting",
        "product-support",
        "event-distribution",
        "civic-mobilization",
        "care"
      ],
      candidateClaimIds: [
        "CND-WOWLIST-COMPLETE-SOCIAL-POPULATION",
        "CND-WOWLIST-PUBLIC-SUPPORT-SURFACE",
        "CND-WOWLIST-CIVIC-CARE-CONTINUITY"
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
        "The shared account record does not identify the individual teammate who authored the post."
      ],
      entityIds: ["WOWList"],
      themeIds: [...reading.themes],
      candidateClaimIds: ["CND-WOWLIST-PUBLIC-SUPPORT-SURFACE"]
    }))
  ],
  candidateClaims: [
    {
      id: "CND-WOWLIST-COMPLETE-SOCIAL-POPULATION",
      project: "wowlist",
      text:
        "All 38 profile-counted @wowlist records were recovered: 16 authored standalone posts, six authored replies, and 16 reposts from 13 other accounts.",
      status: "promoted",
      sourceIds: [
        "SRC-WOWLIST-LIVE-PROFILE-CONTROL-2026",
        "SRC-WOWLIST-FULL-POPULATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
      supportSummary:
        "Fine-grained Posts and Replies harvesting closes exactly against the live 38-post control with 38 unique status IDs.",
      missingEvidence: [],
      boundaries: [
        "Current full-population recovery does not establish that no older record was deleted before capture or identify individual teammate authorship."
      ],
      promotedClaimId: "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-WOWLIST-PUBLIC-SUPPORT-SURFACE",
      project: "wowlist",
      text:
        "The public account Jamie established became a direct support surface, with six authored replies explaining product behavior, onboarding, and local-calendar identity.",
      status: "promoted",
      sourceIds: [
        "SRC-WOWLIST-FULL-POPULATION-RUN-2026",
        ...postReadings.map((reading) => reading.sourceId),
        "SRC-SOCIAL-JAMIE-IDENTITY-CONFIRMATION-2026"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
      supportSummary:
        "Six direct account replies and the project-origin post document support behavior, product lineage, and Jamie's confirmed identity-system contribution.",
      missingEvidence: [],
      boundaries: [
        "Do not infer that Jamie personally authored every reply or that Twitter was the only support channel."
      ],
      promotedClaimId: "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-WOWLIST-CIVIC-CARE-CONTINUITY",
      project: "wowlist",
      text:
        "The complete account record includes five authored civic-mobilization or care posts and five civic-care reposts.",
      status: "promoted",
      sourceIds: ["SRC-WOWLIST-FULL-POPULATION-RUN-2026"],
      researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
      supportSummary:
        "The complete census preserves gathering routes, mutual-aid links, vigils, calls to local government, and support for DIY spaces.",
      missingEvidence: [],
      boundaries: [
        "Amplification does not establish authorship, leadership, participation, or causality for every effort."
      ],
      promotedClaimId: "CLM-WOWLIST-CIVIC-CARE-CONTINUITY",
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    {
      id: "PROM-WOWLIST-COMPLETE-SOCIAL-POPULATION-2026",
      candidateClaimId: "CND-WOWLIST-COMPLETE-SOCIAL-POPULATION",
      claimId: "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION",
      decision: "promoted",
      reason: "The record-level census closes exactly against the live 38-post control.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-WOWLIST-PUBLIC-SUPPORT-SURFACE-2026",
      candidateClaimId: "CND-WOWLIST-PUBLIC-SUPPORT-SURFACE",
      claimId: "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
      decision: "promoted",
      reason:
        "The complete account population contains direct support behavior that makes Jamie's public-identity and product-operations contribution more concrete without assigning post authorship.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-WOWLIST-CIVIC-CARE-CONTINUITY-2026",
      candidateClaimId: "CND-WOWLIST-CIVIC-CARE-CONTINUITY",
      claimId: "CLM-WOWLIST-CIVIC-CARE-CONTINUITY",
      decision: "promoted",
      reason:
        "The complete census supports a bounded continuity claim from event distribution into civic mobilization and care.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-WOWLIST-SOCIAL-POPULATION-EDITORIAL-2026",
      audience: "Hiring managers and product, implementation, or community-technology collaborators",
      goal:
        "Use the complete social record to make WOWList's support and public-interface work concrete without turning the portfolio into a timeline.",
      argument:
        "Jamie co-built a community-calendar product whose public identity supported onboarding, event distribution, local-calendar federation, community connection, and care.",
      selectedClaimIds: [
        "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
        "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION",
        "CLM-WOWLIST-CIVIC-CARE-CONTINUITY"
      ],
      heldCandidateClaimIds: [],
      rationale: [
        "Project the support-surface claim because it reduces reader burden and makes Jamie's product-operations work specific.",
        "Keep the 38-record population count and civic-care classification in the knowledge bank rather than adding social metrics to the case study.",
        "Preserve shared-account authorship and collective-credit boundaries."
      ],
      createdAt: "2026-07-12"
    }
  ]
};
