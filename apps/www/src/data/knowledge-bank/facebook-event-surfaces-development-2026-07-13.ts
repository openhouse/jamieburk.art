import type { KnowledgeBank } from "./schema.ts";

type FacebookEventSurfacesDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

const selectedPersonalEventReadings = [
  {
    suffix: "SEMANTIC-WEB-2006",
    sourceId: "SRC-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006",
    statement:
      "The event used public discussion to connect music-making with an emerging networked-culture concept.",
    themes: ["networked-culture", "public-learning"]
  },
  {
    suffix: "PIRATE-TROLLEY-2007",
    sourceId: "SRC-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007",
    statement:
      "The event invited participants into a public-history encounter centered on Kansas City's 8th Street Trolley Tunnel.",
    themes: ["public-history", "participatory-place"]
  },
  {
    suffix: "RIVER-RAFT-2007",
    sourceId: "SRC-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007",
    statement:
      "The event invited participation in a found-material, bicycle-powered river expedition.",
    themes: ["waterways", "participatory-place"]
  },
  {
    suffix: "NIGHT-WALK-2010",
    sourceId: "SRC-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-2010",
    statement:
      "The event used a shared night walk as a structure for collective attention to place.",
    themes: ["walking", "participatory-place"]
  },
  {
    suffix: "SUNDAY-DINNER-100-2014",
    sourceId: "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
    statement:
      "The event identifies the hundredth iteration of a recurring hospitality and cultural-programming form.",
    themes: ["hospitality", "continuity"]
  },
  {
    suffix: "WHY-I-MARCH-2017",
    sourceId: "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017",
    statement:
      "The event joined a potluck, discussion, sign making, and public-action preparation in one participatory format.",
    themes: ["civic-learning", "public-making"]
  },
  {
    suffix: "HYPERNORMALISATION-2017",
    sourceId: "SRC-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-2017",
    statement:
      "The event used documentary screening and discussion as a collective civic-learning structure.",
    themes: ["civic-learning", "public-discussion"]
  }
] as const;

export const facebookEventSurfacesDevelopmentRecords: FacebookEventSurfacesDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-13-FACEBOOK-PERSONAL-WOWLIST-EVENTS",
      receivedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary:
        "Perform an archival-production pass on 100 percent of both Jamie Burkart's personal-account and WOW List's Facebook event populations.",
      sourceUrl: "https://www.facebook.com/jburkart/events/",
      projectHints: ["professional-archive", "participatory-public-systems", "wowlist"],
      status: "processed",
      disposition:
        "Separated Jamie's 502-record association surface from the 21-slot hosted-event control; accounted for all hosted-event slots with 20 recovered pages and one unresolved slot; verified WOW List's current zero-record display while preserving historical non-recovery; created public-safe aggregate controls; promoted bounded archive claims; held association-as-participation and never-existed claims; and made no immediate website projection.",
      linkedRecordIds: [
        "SRC-JAMIE-FACEBOOK-HOST-CONTROL-2026",
        "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
        "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
        "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026",
        "INQ-WOWLIST-FACEBOOK-EVENTS-2026",
        "CND-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION",
        "CND-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE",
        "CND-JAMIE-FACEBOOK-ASSOCIATION-EQUALS-PARTICIPATION",
        "CND-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL",
        "CND-WOWLIST-NEVER-HOSTED-FACEBOOK-EVENTS"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-JAMIE-FACEBOOK-HOST-CONTROL-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-HOST-CONTROL-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated Facebook review",
      assertions: [
        {
          id: "ASSERT-JAMIE-FACEBOOK-ASSOCIATIONS-502",
          statement:
            "A terminal scroll exposed 502 distinct event associations on the current personal events surface.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-FACEBOOK-HOST-CONTROL-21",
          statement: "Event detail host cards displayed 21 past events hosted by Jamie.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The association index and host-card counter are different controls and the interface is not an official export."
      ],
      entityIds: ["Jamie-Burkart"],
      themeIds: ["population-accounting", "public-events", "privacy"],
      candidateClaimIds: [
        "CND-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION",
        "CND-JAMIE-FACEBOOK-ASSOCIATION-EQUALS-PARTICIPATION"
      ]
    },
    {
      id: "READ-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated population reconciliation",
      assertions: [
        {
          id: "ASSERT-JAMIE-FACEBOOK-HOST-SLOTS-ACCOUNTED",
          statement:
            "All 21 host-control slots have a recovered or unresolved disposition: 20 recovered pages and one unresolved slot.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-FACEBOOK-HOSTED-PRACTICE-FORMS",
          statement:
            "The recovered pages classify into seven cultural-production, four hospitality-and-care, four participatory-place, three networked-culture-and-public-history, and two civic-learning forms.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The unresolved slot remains unidentified and the five forms are interpretive classifications.",
        "Host attribution does not establish sole production, attendance, reach, or impact."
      ],
      entityIds: ["Jamie-Burkart"],
      themeIds: ["archival-production", "participation", "privacy", "public-events"],
      candidateClaimIds: [
        "CND-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION",
        "CND-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE"
      ]
    },
    {
      id: "READ-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated association-control review",
      assertions: [
        {
          id: "ASSERT-JAMIE-FACEBOOK-ASSOCIATION-HOST-SPLIT",
          statement:
            "The 502-card surface contains 20 Jamie-hosted associations and 482 associations displaying another host.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Association does not establish attendance, endorsement, authorship, production, or professional significance."
      ],
      entityIds: ["Jamie-Burkart"],
      themeIds: ["population-accounting", "privacy"],
      candidateClaimIds: ["CND-JAMIE-FACEBOOK-ASSOCIATION-EQUALS-PARTICIPATION"]
    },
    ...selectedPersonalEventReadings.map((reading) => ({
      id: `READ-JAMIE-FACEBOOK-EVENT-${reading.suffix}`,
      sourceId: reading.sourceId,
      readAt: "2026-07-13" as const,
      reader: "Codex public event-page review",
      assertions: [
        {
          id: `ASSERT-JAMIE-FACEBOOK-EVENT-${reading.suffix}`,
          statement: reading.statement,
          confidence: "high" as const,
          publicSafe: true
        }
      ],
      limitations: [
        "The event page supports a bounded instance of Jamie's hosted-event practice, not sole production, attendance, reach, or impact."
      ],
      entityIds: ["Jamie-Burkart"],
      themeIds: [...reading.themes],
      candidateClaimIds: ["CND-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE"]
    })),
    {
      id: "READ-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated Facebook page review",
      assertions: [
        {
          id: "ASSERT-WOWLIST-FACEBOOK-LIVE-EVENTS-ZERO",
          statement:
            "The current authenticated WOW List Facebook event surface displayed 'No events to show' and zero numeric event links.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The current empty display does not establish that no historical event ever existed."
      ],
      entityIds: ["WOWList"],
      themeIds: ["population-accounting", "public-events", "negative-findings"],
      candidateClaimIds: [
        "CND-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL",
        "CND-WOWLIST-NEVER-HOSTED-FACEBOOK-EVENTS"
      ]
    },
    {
      id: "READ-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
      readAt: "2026-07-13",
      reader: "Codex bounded archival recovery review",
      assertions: [
        {
          id: "ASSERT-WOWLIST-FACEBOOK-HISTORICAL-EVENT-NOT-RECOVERED",
          statement:
            "Current and legacy routes, Facebook event search, the personal association control, and bounded Wayback queries recovered no historical WOW List Facebook event record.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Negative recovery is not proof of nonexistence.",
        "Deleted, hidden, transferred, or alternate-host pages may be absent from the searched surfaces."
      ],
      entityIds: ["WOWList"],
      themeIds: ["archival-production", "negative-findings", "public-events"],
      candidateClaimIds: [
        "CND-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL",
        "CND-WOWLIST-NEVER-HOSTED-FACEBOOK-EVENTS"
      ]
    }
  ],
  candidateClaims: [
    {
      id: "CND-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION",
      project: "professional-archive",
      text:
        "All 21 slots in Jamie's current Facebook hosted-event control are accounted for with 20 recovered pages and one unresolved slot.",
      status: "promoted",
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-HOST-CONTROL-2026",
        "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
      supportSummary:
        "The detail-page host control supplies 21 slots; 20 distinct hosted pages were recovered and close-read; one slot remains unresolved in the public census.",
      missingEvidence: [],
      boundaries: [
        "Say complete accounting of the current control, not complete recovery or every event Jamie ever hosted."
      ],
      promotedClaimId: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE",
      project: "participatory-public-systems",
      text:
        "Twenty recovered Jamie-hosted event pages from 2006 through 2017 document recurring structures across cultural production, hospitality, participatory place, civic learning, and networked public culture.",
      status: "promoted",
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
        ...selectedPersonalEventReadings.map((reading) => reading.sourceId)
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
      supportSummary:
        "Every recovered hosted page was close-read and assigned one primary public-safe practice form; seven selected public pages preserve representative instances.",
      missingEvidence: [],
      boundaries: [
        "Credit collaborators and do not convert host attribution into sole production, attendance, reach, or impact."
      ],
      promotedClaimId: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-JAMIE-FACEBOOK-ASSOCIATION-EQUALS-PARTICIPATION",
      project: "professional-archive",
      text:
        "All 502 events displayed on Jamie's personal Facebook event surface were Jamie's projects, attended or endorsed by Jamie, or professionally significant.",
      status: "research-needed",
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-HOST-CONTROL-2026",
        "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
      supportSummary:
        "The interface presents public event associations, but 482 cards display another host and the association mechanism does not establish participation, endorsement, production, authorship, or professional relevance.",
      missingEvidence: [
        "Event-level evidence of Jamie's relationship to each associated page and a public-interest reason to retain it."
      ],
      boundaries: [
        "Keep the 502-record association control protected and use only event-level evidence for future claims."
      ],
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL",
      project: "wowlist",
      text:
        "WOW List's current Facebook event surface displays zero event records, and bounded searches recovered no historical event record.",
      status: "promoted",
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENTS-2026"],
      supportSummary:
        "The authenticated live surface supplies a zero-record current control; bounded current, legacy, event-search, association, and Wayback checks recovered no historical record.",
      missingEvidence: [],
      boundaries: [
        "Preserve current zero and historical non-recovery as separate findings; negative recovery is not proof of nonexistence."
      ],
      promotedClaimId: "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-WOWLIST-NEVER-HOSTED-FACEBOOK-EVENTS",
      project: "wowlist",
      text: "WOW List never created, hosted, co-hosted, or promoted a Facebook event.",
      status: "research-needed",
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENTS-2026"],
      supportSummary:
        "The current surface is empty and bounded searches recovered no historical record, but neither finding can establish a universal historical negative.",
      missingEvidence: [
        "An authoritative page export or complete historical record demonstrating no event creation or association."
      ],
      boundaries: ["Say not recovered, not did not exist."],
      reviewedAt: "2026-07-13"
    }
  ],
  promotions: [
    {
      id: "PROM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
      candidateClaimId: "CND-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION",
      claimId: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
      decision: "promoted",
      reason:
        "The recovered and unresolved dispositions close exactly against the 21-slot host-card control.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2026",
      candidateClaimId: "CND-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE",
      claimId: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
      decision: "promoted",
      reason:
        "The full recovered hosted population and selected public event pages support a bounded long-running practice description.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-JAMIE-FACEBOOK-ASSOCIATION-EQUALS-PARTICIPATION-2026",
      candidateClaimId: "CND-JAMIE-FACEBOOK-ASSOCIATION-EQUALS-PARTICIPATION",
      decision: "held",
      reason:
        "Facebook association does not establish authorship, production, attendance, endorsement, or professional relevance, and publishing it would create unnecessary relational exposure.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      candidateClaimId: "CND-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL",
      claimId: "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      decision: "promoted",
      reason:
        "The current zero-record control and bounded negative recovery finding are reproducible when their different scopes remain explicit.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-WOWLIST-NEVER-HOSTED-FACEBOOK-EVENTS-2026",
      candidateClaimId: "CND-WOWLIST-NEVER-HOSTED-FACEBOOK-EVENTS",
      decision: "held",
      reason:
        "The absence of current and recovered records cannot prove that no historical event ever existed.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-FACEBOOK-PERSONAL-WOWLIST-EVENTS-EDITORIAL-2026",
      audience: "Hiring managers and future portfolio editors",
      goal:
        "Preserve the event-design throughline and archival controls without adding social-media inventory or absence claims to the current portfolio composition.",
      argument:
        "Jamie's hosted-event record documents a long practice of designing conditions for gathering, making, learning, hospitality, and place-based participation; WOW List's current Facebook event surface contributes only a bounded zero-record control.",
      selectedClaimIds: [
        "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
        "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
        "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026"
      ],
      heldCandidateClaimIds: [
        "CND-JAMIE-FACEBOOK-ASSOCIATION-EQUALS-PARTICIPATION",
        "CND-WOWLIST-NEVER-HOSTED-FACEBOOK-EVENTS"
      ],
      rationale: [
        "Keep the 21-slot hosted-event census aggregate-only and the 502-card association control protected.",
        "Retain the hosted-event practice for future role-specific compositions that need evidence of facilitation, public programming, hospitality systems, or participatory design.",
        "Make no immediate website change because the current hiring argument already carries the participatory-systems throughline clearly.",
        "Do not use WOW List's current Facebook absence to characterize the product's wider community activity or historical event practice."
      ],
      createdAt: "2026-07-13"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-JAMIE-FACEBOOK-OFFICIAL-EVENT-EXPORT-2026",
      kind: "archive-research",
      summary:
        "Seek Jamie's authorized Facebook account export to test the 21-slot hosted-event control, identify the unresolved slot, and preserve event-level production evidence without relying on interface state.",
      projectHints: ["professional-archive", "participatory-public-systems"],
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-HOST-CONTROL-2026",
        "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026"
      ],
      candidateClaimIds: ["CND-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION"],
      rightsReviewRequired: true,
      status: "researching",
      createdAt: "2026-07-13"
    },
    {
      id: "DISC-WOWLIST-FACEBOOK-HISTORICAL-EVENT-EVIDENCE-2026",
      kind: "archive-research",
      summary:
        "Seek an authorized WOW List Facebook page export, collaborator records, or historical event URLs before making any claim about whether the project ever used Facebook events.",
      projectHints: ["wowlist"],
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026"
      ],
      candidateClaimIds: ["CND-WOWLIST-NEVER-HOSTED-FACEBOOK-EVENTS"],
      rightsReviewRequired: true,
      status: "researching",
      createdAt: "2026-07-13"
    }
  ]
};
