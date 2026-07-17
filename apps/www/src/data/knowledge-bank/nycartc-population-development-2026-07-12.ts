import type { KnowledgeBank } from "./schema.ts";

type NYCArtCPopulationDevelopment = Pick<
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
    id: "READ-NYCAC-SOCIAL-FAIR-RENT-2026",
    assertionId: "ASSERT-NYCAC-FAIR-RENT-CONTINUITY-2026",
    sourceId: "SRC-NYCAC-SOCIAL-FAIR-RENT-2026",
    statement:
      "The account continued Fair Rent NYC advocacy in May 2026.",
    themes: ["fair-rent", "public-identity-continuity"]
  },
  {
    id: "READ-NYCAC-SOCIAL-CREATE-IN-PLACE-2026",
    assertionId: "ASSERT-NYCAC-RESOURCE-ROUTING-2026",
    sourceId: "SRC-NYCAC-SOCIAL-CREATE-IN-PLACE-2026",
    statement:
      "The account routed creative small businesses and nonprofit arts organizations to a City capacity-building webinar series.",
    themes: ["artist-resources", "public-information"]
  },
  {
    id: "READ-NYCAC-SOCIAL-ARTIST-LABOR-2026",
    assertionId: "ASSERT-NYCAC-ARTIST-LABOR-2026",
    sourceId: "SRC-NYCAC-SOCIAL-ARTIST-LABOR-2026",
    statement:
      "The account distributed an artist-labor action focused on AI protections and fair pay.",
    themes: ["artist-labor", "public-action"]
  },
  {
    id: "READ-NYCAC-SOCIAL-NIGHTLIFE-ACCOUNTABILITY-2025",
    assertionId: "ASSERT-NYCAC-NIGHTLIFE-ACCOUNTABILITY-2025",
    sourceId: "SRC-NYCAC-SOCIAL-NIGHTLIFE-ACCOUNTABILITY-2025",
    statement:
      "The account connected a current nightlife-enforcement concern to the Talks Not Raids campaign record.",
    themes: ["nightlife-accountability", "campaign-continuity"]
  }
] as const;

export const nycartcPopulationDevelopmentRecords: NYCArtCPopulationDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-NYCAC-FULL-POPULATION",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary:
        "Perform an archival-production pass on 100 percent of the @NYCArtC post population.",
      sourceUrl: "https://x.com/NYCArtC",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition:
        "Accounted for all 5,124 profile slots, recovered 892 surviving public records, preserved 4,232 unresolved slots, promoted bounded population and continued-use claims, and withheld population-wide thematic proportions.",
      linkedRecordIds: [
        "SRC-NYCAC-LIVE-PROFILE-CONTROL-2026",
        "SRC-NYCAC-FULL-POPULATION-RUN-2026",
        "INQ-NYCAC-FULL-POPULATION-2026",
        "CND-NYCAC-POPULATION-ACCOUNTING",
        "CND-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE",
        "CND-NYCAC-POPULATION-THEME-PROPORTIONS"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-NYCAC-LIVE-PROFILE-CONTROL-2026",
      sourceId: "SRC-NYCAC-LIVE-PROFILE-CONTROL-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated profile review",
      assertions: [
        {
          id: "ASSERT-NYCAC-PROFILE-CONTROL-5124",
          statement:
            "The live @NYCArtC profile displayed 5,124 posts and a January 2017 join date.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-PROFILE-ACTIVE-2026",
          statement:
            "The live profile showed continued public activity in 2026.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The current profile counter cannot establish whether older records were deleted before capture."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["population-accounting", "public-identity-continuity"],
      candidateClaimIds: [
        "CND-NYCAC-POPULATION-ACCOUNTING",
        "CND-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE"
      ]
    },
    {
      id: "READ-NYCAC-FULL-POPULATION-RUN-2026",
      sourceId: "SRC-NYCAC-FULL-POPULATION-RUN-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated and public-archive reconciliation",
      assertions: [
        {
          id: "ASSERT-NYCAC-ACCOUNTING-CLOSE-5124",
          statement:
            "The ledger contains 5,124 rows: 892 recovered public records and 4,232 unresolved slots.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-RECOVERED-TYPES",
          statement:
            "Recovered types are 541 reposts, 103 authored standalone posts, 12 authored replies, and 236 archived account-authored records with unresolved post-versus-reply type.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-RECOVERED-DATE-RANGE",
          statement:
            "Recovered public records span March 31, 2017, through May 18, 2026.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Only 17.4 percent of profile-counted slots were recovered.",
        "The recovered corpus is not a statistically representative sample of unresolved records.",
        "Shared-account records do not identify individual authors."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["population-accounting", "public-identity-continuity"],
      candidateClaimIds: [
        "CND-NYCAC-POPULATION-ACCOUNTING",
        "CND-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE",
        "CND-NYCAC-POPULATION-THEME-PROPORTIONS"
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
        "The shared account does not identify the individual teammate who authored the post.",
        "The post documents public communication, not policy causality or audience reach."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: [...reading.themes],
      candidateClaimIds: ["CND-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE"]
    }))
  ],
  candidateClaims: [
    {
      id: "CND-NYCAC-POPULATION-ACCOUNTING",
      project: "nyc-artist-coalition",
      text:
        "All 5,124 live-profile slots are represented in the census: 892 recovered public records and 4,232 unresolved slots.",
      status: "promoted",
      sourceIds: [
        "SRC-NYCAC-LIVE-PROFILE-CONTROL-2026",
        "SRC-NYCAC-FULL-POPULATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-NYCAC-FULL-POPULATION-2026"],
      supportSummary:
        "The live profile establishes the control; deduplicated live, search, Wayback, and oEmbed records establish recovery; explicit placeholders close the accounting ledger.",
      missingEvidence: [],
      boundaries: [
        "Call this complete accounting, not complete recovery, and do not infer properties for unresolved slots."
      ],
      promotedClaimId: "CLM-NYCAC-POPULATION-ACCOUNTING",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE",
      project: "nyc-artist-coalition",
      text:
        "The shared @NYCArtC identity remained active through 2026 across campaign advocacy, artist resources, labor action, and nightlife accountability.",
      status: "promoted",
      sourceIds: postReadings.map((reading) => reading.sourceId),
      researchInquiryIds: ["INQ-NYCAC-FULL-POPULATION-2026"],
      supportSummary:
        "Four surviving public posts document distinct current uses of the shared identity and the population run establishes the broader continuity window.",
      missingEvidence: [],
      boundaries: [
        "Credit the collective account; do not infer individual authorship or Jamie's uninterrupted operation."
      ],
      promotedClaimId: "CLM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-POPULATION-THEME-PROPORTIONS",
      project: "nyc-artist-coalition",
      text:
        "The full @NYCArtC population is distributed across the same thematic proportions observed in the 892 recovered records.",
      status: "research-needed",
      sourceIds: ["SRC-NYCAC-FULL-POPULATION-RUN-2026"],
      researchInquiryIds: ["INQ-NYCAC-FULL-POPULATION-2026"],
      supportSummary:
        "The recovered corpus can be described directly, but 82.6 percent of profile-counted slots remain unresolved and the recovery mechanisms are selective.",
      missingEvidence: [
        "An official account export or another complete record set covering the 4,232 unresolved slots."
      ],
      boundaries: [
        "Do not extrapolate recovered theme counts or repost ratios to the full account."
      ],
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    {
      id: "PROM-NYCAC-POPULATION-ACCOUNTING-2026",
      candidateClaimId: "CND-NYCAC-POPULATION-ACCOUNTING",
      claimId: "CLM-NYCAC-POPULATION-ACCOUNTING",
      decision: "promoted",
      reason:
        "Every profile-counted slot has a recovered record or an explicit unresolved placeholder.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE-2026",
      candidateClaimId: "CND-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE",
      claimId: "CLM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE",
      decision: "promoted",
      reason:
        "Representative surviving posts make the continuing public uses specific while preserving shared-account authorship boundaries.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-NYCAC-POPULATION-THEME-PROPORTIONS-2026",
      candidateClaimId: "CND-NYCAC-POPULATION-THEME-PROPORTIONS",
      decision: "held",
      reason:
        "Selective recovery of 17.4 percent cannot support population-wide thematic proportions.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-NYCAC-SOCIAL-POPULATION-EDITORIAL-2026",
      audience: "Hiring managers and public-interest implementation collaborators",
      goal:
        "Translate the population pass into one credible continuity signal without making the portfolio read like social analytics.",
      argument:
        "Jamie established a collective public identity that remained useful across advocacy, resources, labor, and accountability through 2026.",
      selectedClaimIds: [
        "CLM-NYCAC-PUBLIC-IDENTITY-SYSTEM",
        "CLM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE"
      ],
      heldCandidateClaimIds: ["CND-NYCAC-POPULATION-THEME-PROPORTIONS"],
      rationale: [
        "Project continuity and modes of use because they clarify Jamie's system-building contribution.",
        "Keep the 5,124-slot accounting and recovered thematic census in the knowledge bank.",
        "Do not extrapolate from the selectively recovered 17.4 percent or assign shared-account posts to Jamie."
      ],
      createdAt: "2026-07-12"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-NYCAC-OFFICIAL-ACCOUNT-EXPORT-2026",
      kind: "archive-research",
      summary:
        "Seek an authorized @NYCArtC account export or equivalent complete archive to replace the 4,232 unresolved ledger slots and test recovered-corpus bias.",
      projectHints: ["nyc-artist-coalition"],
      sourceIds: [
        "SRC-NYCAC-LIVE-PROFILE-CONTROL-2026",
        "SRC-NYCAC-FULL-POPULATION-RUN-2026"
      ],
      candidateClaimIds: ["CND-NYCAC-POPULATION-THEME-PROPORTIONS"],
      rightsReviewRequired: false,
      status: "researching",
      createdAt: "2026-07-12"
    }
  ]
};
