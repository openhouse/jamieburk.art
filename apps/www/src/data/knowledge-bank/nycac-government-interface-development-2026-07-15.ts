import type { KnowledgeBank } from "./schema.ts";

type NycacGovernmentInterfaceDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const nycacGovernmentInterfaceDevelopmentRecords: NycacGovernmentInterfaceDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-15-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary:
        "Research request asking whether DCLA Commissioner Tom Finkelpearl referred to NYC Artist Coalition in Council testimony and why the coalition's work mattered to DCLA, the Council, and Rafael Espinal.",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition:
        "Recovered one direct Finkelpearl reference, promoted a bounded institutional-interface claim, and held psychological or dependency language that the official record does not establish.",
      linkedRecordIds: [
        "INQ-NYCAC-FINKELPEARL-COUNCIL-REFERENCE-2026",
        "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017",
        "CND-NYCAC-GOVERNMENT-INTERFACE-2017-2019",
        "CND-NYCAC-OFFICIALS-NEEDED-COALITION",
        "CLM-NYCAC-GOVERNMENT-INTERFACE-2017-2019"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017",
      sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017",
      readAt: "2026-07-15",
      reader: "Codex official-record review",
      assertions: [
        {
          id: "ASSERT-FINKELPEARL-NYCAC-COUNCIL-REFERENCE",
          statement:
            "Tom Finkelpearl referred to NYC Artist Coalition in sworn formal testimony to a joint City Council budget hearing.",
          locator: "Transcript page 92, lines 12-16",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-FINKELPEARL-NYCAC-FORMATION-CONTEXT",
          statement:
            "Finkelpearl stated that NYC Artist Coalition formed after DCLA hosted a January meeting for the DIY arts community.",
          locator: "Transcript page 92, lines 14-16",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-FINKELPEARL-PUBLIC-FEEDBACK-FRAME",
          statement:
            "He placed the reference inside a discussion of reciprocal public relationships, expanded direct feedback, and the power of convening around a common cause.",
          locator: "Transcript pages 91-92",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The transcript does not state Finkelpearl's private motives or say that he, DCLA, the Council, or Espinal depended on Jamie or NYC Artist Coalition."
      ],
      entityIds: [
        "Tom-Finkelpearl",
        "NYC-Department-Cultural-Affairs",
        "NYC-Artist-Coalition",
        "NYC-Council"
      ],
      themeIds: [
        "public-engagement",
        "institutional-interface",
        "coalition-formation",
        "cultural-planning"
      ],
      candidateClaimIds: [
        "CND-NYCAC-GOVERNMENT-INTERFACE-2017-2019",
        "CND-NYCAC-OFFICIALS-NEEDED-COALITION"
      ]
    }
  ],
  candidateClaims: [
    {
      id: "CND-NYCAC-GOVERNMENT-INTERFACE-2017-2019",
      project: "nyc-artist-coalition",
      text:
        "Official Council records show NYC Artist Coalition functioning as a durable interface between cultural spaces and city government: DCLA cited its formation as evidence of public-engagement value, and the Council used its FOIL research in agency oversight.",
      status: "promoted",
      sourceIds: [
        "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017",
        "SRC-NYC-COUNCIL-MARCH-HEARING-2019",
        "SRC-CREATENYC-NYCAC-APPENDIX-2017"
      ],
      researchInquiryIds: ["INQ-NYCAC-FINKELPEARL-COUNCIL-REFERENCE-2026"],
      supportSummary:
        "Finkelpearl's 2017 testimony directly frames coalition formation as an outcome of reciprocal public engagement; the 2019 MARCH transcript directly shows Council use of coalition evidence in questioning and follow-up design.",
      missingEvidence: [],
      boundaries: [
        "Describe observed institutional use rather than private motives, personal need, endorsement of every recommendation, or sole policy causality.",
        "Preserve collective credit for coalition research and advocacy."
      ],
      promotedClaimId: "CLM-NYCAC-GOVERNMENT-INTERFACE-2017-2019",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-NYCAC-OFFICIALS-NEEDED-COALITION",
      project: "nyc-artist-coalition",
      text:
        "Finkelpearl, DCLA, the City Council, and Rafael Espinal needed Jamie or NYC Artist Coalition to accomplish their institutional goals.",
      status: "hold",
      sourceIds: [
        "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017",
        "SRC-NYC-COUNCIL-MARCH-HEARING-2019",
        "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017",
        "SRC-NYC-COUNCIL-CABARET-REPEAL-2017"
      ],
      researchInquiryIds: ["INQ-NYCAC-FINKELPEARL-COUNCIL-REFERENCE-2026"],
      supportSummary:
        "The records show that officials used and publicly valued coalition participation, recommendations, testimony, and research, but they do not establish private motive or institutional dependency.",
      missingEvidence: [
        "A direct statement from Finkelpearl, Espinal, or another responsible official explaining why they considered NYC Artist Coalition necessary",
        "Contemporaneous internal or public records allocating specific institutional dependence"
      ],
      boundaries: [
        "Use benefited from, relied on in a specific proceeding, cited, solicited, or used when the record supports those verbs.",
        "Do not convert institutional usefulness into psychological mind-reading or sole-cause claims."
      ],
      reviewedAt: "2026-07-15"
    }
  ],
  promotions: [
    {
      id: "PROM-NYCAC-GOVERNMENT-INTERFACE-2017-2019",
      candidateClaimId: "CND-NYCAC-GOVERNMENT-INTERFACE-2017-2019",
      claimId: "CLM-NYCAC-GOVERNMENT-INTERFACE-2017-2019",
      decision: "promoted",
      reason:
        "Two official transcripts directly establish complementary public uses: DCLA used coalition formation to explain engagement value, and the Council used coalition research for oversight.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex official-record review"]
    },
    {
      id: "PROM-NYCAC-OFFICIALS-NEEDED-COALITION-HOLD",
      candidateClaimId: "CND-NYCAC-OFFICIALS-NEEDED-COALITION",
      decision: "held",
      reason:
        "The usefulness is observable, but no recovered official statement supports private-motive or institutional-dependency wording.",
      decidedAt: "2026-07-15",
      decidedBy: ["Codex official-record review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-NYCAC-GOVERNMENT-INTERFACE-2026",
      audience:
        "Hiring managers and public-interest product or implementation leaders evaluating Jamie's civic operating work",
      goal:
        "Make the institutional usefulness of Jamie's coalition infrastructure legible without claiming access, motive, or policy causality the sources do not establish.",
      argument:
        "Jamie helped build durable public identity, participation, web, and documentation systems for a coalition whose knowledge became usable in agency engagement and legislative oversight.",
      selectedClaimIds: ["CLM-NYCAC-GOVERNMENT-INTERFACE-2017-2019"],
      heldCandidateClaimIds: ["CND-NYCAC-OFFICIALS-NEEDED-COALITION"],
      rationale: [
        "The Finkelpearl testimony is direct official recognition of coalition formation as a public-engagement outcome.",
        "The MARCH hearing shows coalition research becoming operative inside Council oversight rather than merely appearing in advocacy copy.",
        "The composed page should name the usable institutional result once and leave the deeper motive analysis in the bank."
      ],
      createdAt: "2026-07-15"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-NYCAC-GOVERNMENT-INTERFACE-TIMELINE-2026",
      kind: "archive-research",
      summary:
        "A future representative artifact could diagram the public-evidence path from DCLA convening to coalition formation, CreateNYC recommendations, public testimony, FOIL analysis, Council questioning, and follow-up, without exposing private coalition records.",
      projectHints: ["nyc-artist-coalition"],
      sourceIds: [
        "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017",
        "SRC-CREATENYC-NYCAC-APPENDIX-2017",
        "SRC-NYC-COUNCIL-MARCH-HEARING-2019"
      ],
      candidateClaimIds: ["CND-NYCAC-GOVERNMENT-INTERFACE-2017-2019"],
      rightsReviewRequired: false,
      status: "captured",
      createdAt: "2026-07-15"
    }
  ]
};
