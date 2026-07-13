import type { KnowledgeBank } from "./schema.ts";

type CallNYCPopulationDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const callnycPopulationDevelopmentRecords: CallNYCPopulationDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-CALLNYC-FULL-POPULATION",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary:
        "Perform an archival-production pass on 100 percent of the @CallNYCapp post population.",
      sourceUrl: "https://x.com/CallNYCapp",
      projectHints: ["callnyc"],
      status: "processed",
      disposition:
        "Reconciled all 110 profile-counted slots: classified 107 recoverable records and retained three unresolved slots with an official-export requirement.",
      linkedRecordIds: [
        "SRC-CALLNYC-LIVE-PROFILE-CONTROL-2026",
        "SRC-CALLNYC-FULL-POPULATION-RUN-2026",
        "INQ-CALLNYC-FULL-POPULATION-2026",
        "CND-CALLNYC-SURVIVING-POPULATION",
        "CND-CALLNYC-SERVICE-RECOGNITION-PATTERN",
        "CND-CALLNYC-EXACT-EXPORT-COMPLETION"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-CALLNYC-LIVE-PROFILE-CONTROL-2026",
      sourceId: "SRC-CALLNYC-LIVE-PROFILE-CONTROL-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated profile review",
      assertions: [
        {
          id: "ASSERT-CALLNYC-PROFILE-CONTROL-110",
          statement: "The live @CallNYCapp profile displayed 110 posts.",
          locator: "Profile heading beside the account name",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The counter does not identify each underlying status or explain unavailable records."
      ],
      entityIds: ["CallNYC"],
      themeIds: ["population-accounting"],
      candidateClaimIds: [
        "CND-CALLNYC-SURVIVING-POPULATION",
        "CND-CALLNYC-EXACT-EXPORT-COMPLETION"
      ]
    },
    {
      id: "READ-CALLNYC-FULL-POPULATION-RUN-2026",
      sourceId: "SRC-CALLNYC-FULL-POPULATION-RUN-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-CALLNYC-RECOVERED-107",
          statement:
            "Status-ID reconciliation recovered 107 distinct surviving timeline records against the 110-post control total.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CALLNYC-AUTHORSHIP-TYPES",
          statement:
            "The recovered population contains 86 authored standalone posts, six authored replies, and 15 reposted records.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CALLNYC-SERVICE-RECOGNITIONS",
          statement:
            "Seventy-two authored records communicate service-recognition findings naming 26 distinct then-sitting Council members across 66 service-issue hashtag labels.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CALLNYC-TEMPORAL-BOUNDS",
          statement:
            "Recovered authored activity runs from March 5 through October 4, 2016; repost activity continues through November 14, 2016.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Three profile-counted records remain unavailable at record level.",
        "Outbound Council-member mentions are not direct engagement evidence.",
        "The classification does not independently audit CallNYC's underlying service calculations."
      ],
      entityIds: ["CallNYC", "New-York-City-Council"],
      themeIds: [
        "population-accounting",
        "resident-facing-service-pathways",
        "council-service-recognition",
        "civic-technology"
      ],
      candidateClaimIds: [
        "CND-CALLNYC-SURVIVING-POPULATION",
        "CND-CALLNYC-SERVICE-RECOGNITION-PATTERN",
        "CND-CALLNYC-EXACT-EXPORT-COMPLETION"
      ]
    }
  ],
  candidateClaims: [
    {
      id: "CND-CALLNYC-SURVIVING-POPULATION",
      project: "callnyc",
      text:
        "The complete recovered surviving @CallNYCapp timeline contains 107 distinct records: 92 authored by CallNYC and 15 reposted from other accounts, against a live 110-post profile control.",
      status: "promoted",
      sourceIds: [
        "SRC-CALLNYC-LIVE-PROFILE-CONTROL-2026",
        "SRC-CALLNYC-FULL-POPULATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-CALLNYC-FULL-POPULATION-2026"],
      supportSummary:
        "Small-step dual-timeline harvesting and cross-source status-ID reconciliation support the recovered-record and type counts.",
      missingEvidence: [],
      boundaries: [
        "Do not call 107 all 110 profile-counted records; retain the three-record unresolved gap."
      ],
      promotedClaimId: "CLM-CALLNYC-SURVIVING-POPULATION",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-CALLNYC-SERVICE-RECOGNITION-PATTERN",
      project: "callnyc",
      text:
        "72 of 92 recovered CallNYC-authored records translated constituent-service data into recognition messages naming 26 then-sitting Council members across 66 service-issue hashtag labels.",
      status: "promoted",
      sourceIds: ["SRC-CALLNYC-FULL-POPULATION-RUN-2026"],
      researchInquiryIds: ["INQ-CALLNYC-FULL-POPULATION-2026"],
      supportSummary:
        "Every recovered status was classified, and service-recognition, handle, and hashtag counts were calculated from the record-level census.",
      missingEvidence: [],
      boundaries: [
        "Outbound recognition is not direct Council engagement, and the posts are not an independent performance audit."
      ],
      promotedClaimId: "CLM-CALLNYC-SERVICE-RECOGNITION-PATTERN",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-CALLNYC-EXACT-EXPORT-COMPLETION",
      project: "callnyc",
      text:
        "All 110 profile-counted @CallNYCapp records can be recovered with status IDs, dates, authorship types, and content.",
      status: "research-needed",
      sourceIds: [
        "SRC-CALLNYC-LIVE-PROFILE-CONTROL-2026",
        "SRC-CALLNYC-FULL-POPULATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-CALLNYC-FULL-POPULATION-2026"],
      supportSummary:
        "The profile control is 110, but current public and authenticated surfaces recover only 107 distinct records.",
      missingEvidence: [
        "An official @CallNYCapp account export or equivalent record-level source for the three unresolved slots."
      ],
      boundaries: [
        "Do not assign deletion, authorship, dates, IDs, or content to the three unresolved records."
      ],
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    {
      id: "PROM-CALLNYC-SURVIVING-POPULATION-2026",
      candidateClaimId: "CND-CALLNYC-SURVIVING-POPULATION",
      claimId: "CLM-CALLNYC-SURVIVING-POPULATION",
      decision: "promoted",
      reason:
        "The 107-record surviving population and its authorship types are completely enumerated while the 110-post control gap remains explicit.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-CALLNYC-SERVICE-RECOGNITION-PATTERN-2026",
      candidateClaimId: "CND-CALLNYC-SERVICE-RECOGNITION-PATTERN",
      claimId: "CLM-CALLNYC-SERVICE-RECOGNITION-PATTERN",
      decision: "promoted",
      reason:
        "Record-level classification supports the bounded service-recognition pattern without converting outbound mentions into engagement.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-CALLNYC-EXACT-EXPORT-COMPLETION-2026",
      candidateClaimId: "CND-CALLNYC-EXACT-EXPORT-COMPLETION",
      decision: "held",
      reason:
        "Three profile-counted records lack IDs and content; exact 110-record recovery requires an official export or equivalent evidence.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-CALLNYC-POPULATION-EDITORIAL-2026",
      audience: "Hiring managers and public-interest technology collaborators",
      goal:
        "Use the full account record to clarify Jamie's product and implementation practice without turning the portfolio into a social archive.",
      argument:
        "CallNYC repeatedly converted open constituent-service data into specific resident pathways and public feedback loops rather than stopping at a one-time civic-data prototype.",
      selectedClaimIds: [
        "CLM-CALLNYC-SURVIVING-POPULATION",
        "CLM-CALLNYC-SERVICE-RECOGNITION-PATTERN"
      ],
      heldCandidateClaimIds: ["CND-CALLNYC-EXACT-EXPORT-COMPLETION"],
      rationale: [
        "The 72-post pattern shows repeated operationalization of data into public-facing service language.",
        "The Council handles and issue labels demonstrate breadth without implying direct engagement from outbound mentions.",
        "Keep the detailed counts in the knowledge bank until an opportunity-specific composition benefits from them.",
        "Retain the three-record gap visibly rather than converting a 97.3 percent recovery into a false completeness claim."
      ],
      createdAt: "2026-07-12"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-CALLNYC-OFFICIAL-EXPORT-GAP-2026",
      kind: "archive-research",
      summary:
        "Seek an official @CallNYCapp account export or equivalent record-level archive to identify the three records represented by the live profile counter but absent from every recovered timeline and search surface.",
      projectHints: ["callnyc"],
      sourceIds: [
        "SRC-CALLNYC-LIVE-PROFILE-CONTROL-2026",
        "SRC-CALLNYC-FULL-POPULATION-RUN-2026"
      ],
      candidateClaimIds: ["CND-CALLNYC-EXACT-EXPORT-COMPLETION"],
      rightsReviewRequired: false,
      status: "researching",
      createdAt: "2026-07-12"
    }
  ]
};
