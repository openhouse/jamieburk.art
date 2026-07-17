import type { KnowledgeBank } from "./schema.ts";

type UrbanHermitPopulationDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

const selectedPostReadings = [
  {
    id: "READ-URBANHERMIT-RIVER-SOFTWARE-OFFICE-HOURS-2009",
    assertionId: "ASSERT-URBANHERMIT-RIVER-SOFTWARE-THREAD-2009",
    sourceId: "SRC-URBANHERMIT-RIVER-SOFTWARE-OFFICE-HOURS-2009",
    statement:
      "Jamie publicly connected river projects, handicrafts, and software design in an open office-hours invitation.",
    themes: ["participatory-place-work", "software-practice"]
  },
  {
    id: "READ-URBANHERMIT-HJE-WEB-PRACTICE-2010",
    assertionId: "ASSERT-URBANHERMIT-HJE-WEB-PRACTICE-2010",
    sourceId: "SRC-URBANHERMIT-HJE-WEB-PRACTICE-2010",
    statement:
      "Jamie publicly described making a forward-looking hand-tool website for Harry J. Epstein Co.",
    themes: ["web-practice", "legacy-business"]
  },
  {
    id: "READ-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
    assertionId: "ASSERT-URBANHERMIT-SUNDAY-DINNER-DOCUMENTATION-2013",
    sourceId: "SRC-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
    statement:
      "Jamie published a video documenting a Sunday Dinner program.",
    themes: ["community-documentation", "hospitality"]
  },
  {
    id: "READ-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
    assertionId: "ASSERT-URBANHERMIT-CIVIC-PARTICIPATION-PATHWAY-2015",
    sourceId: "SRC-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
    statement:
      "Jamie routed readers to an NYC Council public-hearing question pathway and hearing calendar.",
    themes: ["civic-participation", "public-pathways"]
  },
  {
    id: "READ-URBANHERMIT-HORSE-LORDS-NPR-2016",
    assertionId: "ASSERT-URBANHERMIT-HORSE-LORDS-CONTEMPORANEOUS-2016",
    sourceId: "SRC-URBANHERMIT-HORSE-LORDS-NPR-2016",
    statement:
      "Jamie contemporaneously identified himself and M.C. Schmidt as makers of a Horse Lords video featured by NPR.",
    themes: ["creative-technology", "video"]
  },
  {
    id: "READ-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
    assertionId: "ASSERT-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
    sourceId: "SRC-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
    statement:
      "Jamie framed the criminalization and closure of cultural spaces as a safety concern that could push communities into unsafe underground conditions.",
    themes: ["cultural-advocacy", "public-safety"]
  },
  {
    id: "READ-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
    assertionId: "ASSERT-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
    sourceId: "SRC-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
    statement:
      "Jamie described a dual-boot workflow for preserving access to older software used in media-archaeology work.",
    themes: ["media-preservation", "technical-workflow"]
  }
] as const;

export const urbanhermitPopulationDevelopmentRecords: UrbanHermitPopulationDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-13-URBANHERMIT-FULL-POPULATION",
      receivedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary:
        "Perform an archival-production pass on 100 percent of Jamie's personal @urbanhermit post population.",
      sourceUrl: "https://x.com/urbanhermit",
      projectHints: ["professional-archive"],
      status: "processed",
      disposition:
        "Recovered and accounted for all 434 live-profile records, created a redacted aggregate-only census, promoted bounded population and practice-thread claims, independently corroborated the Horse Lords video credit, and withheld the raw personal timeline and frequency-as-impact interpretation.",
      linkedRecordIds: [
        "SRC-URBANHERMIT-LIVE-PROFILE-CONTROL-2026",
        "SRC-URBANHERMIT-FULL-POPULATION-RUN-2026",
        "INQ-URBANHERMIT-FULL-POPULATION-2026",
        "CND-URBANHERMIT-POPULATION-ACCOUNTING",
        "CND-HORSE-LORDS-TRUTHERS-VIDEO-2016",
        "CND-URBANHERMIT-PRACTICE-THREADS",
        "CND-URBANHERMIT-FREQUENCY-EQUALS-IMPACT"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-URBANHERMIT-LIVE-PROFILE-CONTROL-2026",
      sourceId: "SRC-URBANHERMIT-LIVE-PROFILE-CONTROL-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated profile review",
      assertions: [
        {
          id: "ASSERT-URBANHERMIT-PROFILE-CONTROL-434",
          statement:
            "The live @urbanhermit profile displayed 434 posts and an October 2008 join date.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The current profile counter cannot reveal records deleted before capture."
      ],
      entityIds: ["Jamie-Burkart"],
      themeIds: ["population-accounting"],
      candidateClaimIds: ["CND-URBANHERMIT-POPULATION-ACCOUNTING"]
    },
    {
      id: "READ-URBANHERMIT-FULL-POPULATION-RUN-2026",
      sourceId: "SRC-URBANHERMIT-FULL-POPULATION-RUN-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated population reconciliation",
      assertions: [
        {
          id: "ASSERT-URBANHERMIT-ACCOUNTING-CLOSE-434",
          statement:
            "The Posts and Replies union contains 434 unique records, exactly matching the live-profile control.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-URBANHERMIT-RECOVERED-TYPES",
          statement:
            "The recovered population contains 338 authored standalone posts, 15 authored replies, and 81 reposts.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-URBANHERMIT-RECOVERED-DATE-RANGE",
          statement:
            "The surviving profile record spans October 4, 2008, through April 17, 2023.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-URBANHERMIT-PRIVACY-DISPOSITION",
          statement:
            "Every recovered record received an aggregate-only public disposition; selected professional records were reviewed separately before source promotion.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The full-text research artifact contains personal and historical contact material and remains protected.",
        "Theme labels are interpretive and do not measure effort, importance, reach, or impact.",
        "Reposts preserve their displayed source account and are not Jamie-authored text."
      ],
      entityIds: ["Jamie-Burkart"],
      themeIds: ["population-accounting", "privacy", "archival-production"],
      candidateClaimIds: [
        "CND-URBANHERMIT-POPULATION-ACCOUNTING",
        "CND-URBANHERMIT-PRACTICE-THREADS",
        "CND-URBANHERMIT-FREQUENCY-EQUALS-IMPACT"
      ]
    },
    ...selectedPostReadings.map((reading) => ({
      id: reading.id,
      sourceId: reading.sourceId,
      readAt: "2026-07-13" as const,
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
        "A personal social post documents Jamie's contemporaneous public account; it does not independently prove every project outcome.",
        "The post does not establish audience reach or sole causality."
      ],
      entityIds: ["Jamie-Burkart"],
      themeIds: [...reading.themes],
      candidateClaimIds:
        reading.sourceId === "SRC-URBANHERMIT-HORSE-LORDS-NPR-2016"
          ? ["CND-HORSE-LORDS-TRUTHERS-VIDEO-2016"]
          : ["CND-URBANHERMIT-PRACTICE-THREADS"]
    })),
    {
      id: "READ-HORSE-LORDS-TRUTHERS-NPR-2016",
      sourceId: "SRC-HORSE-LORDS-TRUTHERS-NPR-2016",
      readAt: "2026-07-13",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-HORSE-LORDS-TRUTHERS-CREATORS",
          statement:
            "NPR identifies M.C. Schmidt and Jamie Burkart as makers of Horse Lords' official 'Truthers' video.",
          locator: "Article body following the embedded video",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-HORSE-LORDS-TRUTHERS-VISUAL-METHOD",
          statement:
            "NPR quotes Horse Lords saxophonist Andrew Bernstein describing the video's use of simple materials, complex forms, repetition, subtle variation, black and white, color, and text as a mirror of the band's music.",
          locator: "Andrew Bernstein quotation",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The article credits Jamie and M.C. Schmidt jointly and does not specify their division of labor.",
        "The feature does not establish commissioning, commercial results, or audience reach."
      ],
      entityIds: ["Jamie-Burkart", "MC-Schmidt", "Horse-Lords"],
      themeIds: ["creative-technology", "video", "visual-systems"],
      candidateClaimIds: ["CND-HORSE-LORDS-TRUTHERS-VIDEO-2016"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-URBANHERMIT-POPULATION-ACCOUNTING",
      project: "professional-archive",
      text:
        "All 434 records displayed by the live @urbanhermit profile were recovered and represented in the redacted census.",
      status: "promoted",
      sourceIds: [
        "SRC-URBANHERMIT-LIVE-PROFILE-CONTROL-2026",
        "SRC-URBANHERMIT-FULL-POPULATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
      supportSummary:
        "The live profile supplies the control; the deduplicated Posts and Replies union closes exactly at 434; the public ledger contains one aggregate-only row per record.",
      missingEvidence: [],
      boundaries: [
        "Describe this as complete recovery of the current surviving profile population, not every record ever posted."
      ],
      promotedClaimId: "CLM-URBANHERMIT-POPULATION-ACCOUNTING",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-HORSE-LORDS-TRUTHERS-VIDEO-2016",
      project: "creative-technology",
      text:
        "Jamie Burkart and M.C. Schmidt made Horse Lords' official 2016 'Truthers' video featured by NPR Music.",
      status: "promoted",
      sourceIds: [
        "SRC-HORSE-LORDS-TRUTHERS-NPR-2016",
        "SRC-URBANHERMIT-HORSE-LORDS-NPR-2016"
      ],
      researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
      supportSummary:
        "NPR independently names both makers and quotes the band on the video's visual method; Jamie's contemporaneous post corroborates the collaboration.",
      missingEvidence: [],
      boundaries: [
        "Use joint credit and do not infer the division of labor, commissioning relationship, reach, or commercial outcome."
      ],
      promotedClaimId: "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-URBANHERMIT-PRACTICE-THREADS",
      project: "professional-archive",
      text:
        "Selected public-safe personal-account records document recurring threads across participatory place work, software and web practice, community documentation, civic participation, cultural advocacy, and media preservation.",
      status: "promoted",
      sourceIds: selectedPostReadings
        .filter(
          (reading) =>
            reading.sourceId !== "SRC-URBANHERMIT-HORSE-LORDS-NPR-2016"
        )
        .map((reading) => reading.sourceId),
      researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
      supportSummary:
        "Six dated public posts provide direct, bounded instances across the practice threads without converting the full personal timeline into professional evidence.",
      missingEvidence: [],
      boundaries: [
        "Describe selected public records, not independently verified outcomes or a complete career chronology."
      ],
      promotedClaimId: "CLM-URBANHERMIT-PRACTICE-THREADS",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-URBANHERMIT-FREQUENCY-EQUALS-IMPACT",
      project: "professional-archive",
      text:
        "The frequency of themes and mentions in @urbanhermit records measures the effort, importance, reach, and impact of Jamie's professional work.",
      status: "research-needed",
      sourceIds: ["SRC-URBANHERMIT-FULL-POPULATION-RUN-2026"],
      researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
      supportSummary:
        "The census can count classified records, but the account mixes authored posts, replies, reposts, personal life, quoted material, and media-only records.",
      missingEvidence: [
        "A valid measurement model connecting post frequency to work effort, professional importance, audience reach, and outcomes."
      ],
      boundaries: [
        "Use theme counts only to describe the recovered record and never as an impact or labor metric."
      ],
      reviewedAt: "2026-07-13"
    }
  ],
  promotions: [
    {
      id: "PROM-URBANHERMIT-POPULATION-ACCOUNTING-2026",
      candidateClaimId: "CND-URBANHERMIT-POPULATION-ACCOUNTING",
      claimId: "CLM-URBANHERMIT-POPULATION-ACCOUNTING",
      decision: "promoted",
      reason:
        "The deduplicated union closes exactly against the 434-record live-profile control and the public ledger preserves one row per record.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-HORSE-LORDS-TRUTHERS-VIDEO-2016",
      candidateClaimId: "CND-HORSE-LORDS-TRUTHERS-VIDEO-2016",
      claimId: "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016",
      decision: "promoted",
      reason:
        "NPR provides direct third-party joint credit and the contemporaneous personal post corroborates it.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "PROM-URBANHERMIT-PRACTICE-THREADS-2026",
      candidateClaimId: "CND-URBANHERMIT-PRACTICE-THREADS",
      claimId: "CLM-URBANHERMIT-PRACTICE-THREADS",
      decision: "promoted",
      reason:
        "Dated public-safe records support a bounded archive description while preserving the distinction between documentation and independently verified outcomes.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-URBANHERMIT-FREQUENCY-EQUALS-IMPACT-2026",
      candidateClaimId: "CND-URBANHERMIT-FREQUENCY-EQUALS-IMPACT",
      decision: "held",
      reason:
        "A mixed personal timeline's record frequencies do not measure labor, professional importance, reach, or outcomes.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-URBANHERMIT-POPULATION-EDITORIAL-2026",
      audience: "Hiring managers and future portfolio editors",
      goal:
        "Retain newly defensible range without turning a personal timeline into a reader-facing chronology or social-analytics display.",
      argument:
        "The archive shows a long-running practice of making structures across media, place, community, technology, and civic participation; the independently credited Horse Lords video is a strong future-use example.",
      selectedClaimIds: [
        "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016",
        "CLM-URBANHERMIT-PRACTICE-THREADS"
      ],
      heldCandidateClaimIds: ["CND-URBANHERMIT-FREQUENCY-EQUALS-IMPACT"],
      rationale: [
        "Keep the full 434-record accounting, classification, and privacy decisions in the knowledge bank.",
        "Retain the NPR-backed Horse Lords credit for a future creative-technology, biography, or range composition.",
        "Make no immediate website change: the current hiring argument does not need another project example.",
        "Do not publish raw personal records or treat post frequency as professional significance."
      ],
      createdAt: "2026-07-13"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-URBANHERMIT-OFFICIAL-ACCOUNT-EXPORT-2026",
      kind: "archive-research",
      summary:
        "Seek Jamie's authorized official X account export to preserve original media metadata and test whether deleted or interface-hidden records exist beyond the current 434-record profile control.",
      projectHints: ["professional-archive"],
      sourceIds: [
        "SRC-URBANHERMIT-LIVE-PROFILE-CONTROL-2026",
        "SRC-URBANHERMIT-FULL-POPULATION-RUN-2026"
      ],
      candidateClaimIds: ["CND-URBANHERMIT-POPULATION-ACCOUNTING"],
      rightsReviewRequired: true,
      status: "researching",
      createdAt: "2026-07-13"
    }
  ]
};
