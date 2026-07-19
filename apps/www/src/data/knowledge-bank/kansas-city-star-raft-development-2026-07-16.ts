import type { KnowledgeBank } from "./schema.ts";

type KansasCityStarRaftDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const kansasCityStarRaftDevelopmentRecords: KansasCityStarRaftDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-16-KANSAS-CITY-STAR-RAFT-SCAN",
      receivedAt: "2026-07-16",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Two-page scan of a November 15, 2007, Kansas City Star front-page feature about the in-progress collaborative raft expedition.",
      projectHints: ["participatory-public-systems"],
      status: "processed",
      disposition:
        "Created public-safe source metadata, an atomic reading, a bounded bank-only claim, a renewed endpoint hold, a rights-aware visual lead, and a human-readable change report without committing the scan.",
      linkedRecordIds: [
        "SRC-KANSAS-CITY-STAR-RAFT-2007",
        "READ-KANSAS-CITY-STAR-RAFT-2007",
        "CND-RAFT-EXPEDITION-DESIGN-RESILIENCE",
        "CND-RIVER-RAFT-KC-GULF",
        "CLM-RAFT-EXPEDITION-DESIGN-RESILIENCE",
        "INQ-RIVER-RAFT-ROUTE-2026"
      ],
      protectedLocatorId: "INTAKE-KANSAS-CITY-STAR-RAFT-SCAN-2007-001"
    }
  ],
  sourceReadings: [
    {
      id: "READ-KANSAS-CITY-STAR-RAFT-2007",
      sourceId: "SRC-KANSAS-CITY-STAR-RAFT-2007",
      readAt: "2026-07-16",
      reader: "Codex visual and textual source review",
      assertions: [
        {
          id: "AST-KCSTAR-RAFT-FRONT-PAGE",
          statement:
            "The expedition received front-page treatment in The Kansas City Star on November 15, 2007, with the article continuing on page A4.",
          locator: "Front page and page A4",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "AST-KCSTAR-RAFT-ORIGIN-CREW",
          statement:
            "The article attributes the expedition idea to Jamie and identifies Jamie, Libby Hendon, and Laura Mattingly as the three-person core crew.",
          locator: "Front-page introduction and page A4 origin section",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "AST-KCSTAR-RAFT-DESIGN",
          statement:
            "The roughly 12-by-13-foot craft was built in three weeks from reclaimed materials and propelled by two bicycles linked to a paddlewheel.",
          locator: "Page A4, first column",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "AST-KCSTAR-RAFT-SCALE",
          statement:
            "By publication, the crew had passed more than 1,000 miles from its July 21 Kansas City departure and was traveling in Louisiana.",
          locator: "Front-page introduction and page A4 route sections",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "AST-KCSTAR-RAFT-PARTICIPATION",
          statement:
            "The expedition allowed friends to join for stretches, invited people encountered along the route onto the raft, and connected river travel to cultural relationships among river communities.",
          locator: "Page A4 participation and closing sections",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "AST-KCSTAR-RAFT-RESILIENCE",
          statement:
            "After a Coast Guard interruption in Vicksburg, the crew resumed following a 51-day delay that involved local legal help, community support, raft recovery, and technical modifications.",
          locator: "Page A4, Vicksburg and resumption sections",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "AST-KCSTAR-RAFT-ENDPOINT-BOUNDARY",
          statement:
            "At publication, the saltwater objective was still ahead, the endpoint was described as unknown, and the crew did not expect to see the Gulf from the raft.",
          locator: "Page A4, project-purpose and closing-route sections",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The article is a contemporaneous journalistic account, not a complete expedition log.",
        "It reports an in-progress journey and does not establish the later final landing point or completion date.",
        "The expedition was collective; the article does not allocate every design, operational, or relationship-building contribution.",
        "The scan and newspaper photography remain outside the public repository pending rights review."
      ],
      entityIds: [
        "Jamie-Burkart",
        "Libby-Hendon",
        "Laura-Mattingly",
        "Release-Yourself-Onto-the-Water-Until-It-Tastes-of-Salt"
      ],
      themeIds: [
        "participatory-systems",
        "waterways",
        "improvised-technology",
        "public-engagement",
        "operational-resilience"
      ],
      candidateClaimIds: [
        "CND-RAFT-EXPEDITION-DESIGN-RESILIENCE",
        "CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
        "CND-RIVER-RAFT-KC-GULF"
      ]
    }
  ],
  candidateClaims: [
    {
      id: "CND-RAFT-EXPEDITION-DESIGN-RESILIENCE",
      project: "participatory-public-systems",
      text:
        "Jamie originated and joined a three-person core crew on a collaborative art expedition that traveled more than 1,000 miles from Kansas City into Louisiana using a bicycle-powered raft built from reclaimed materials, invited public participation, and resumed after a 51-day interruption.",
      status: "promoted",
      sourceIds: [
        "SRC-KANSAS-CITY-STAR-RAFT-2007",
        "SRC-RAFT-SOUNDINGS-2007"
      ],
      researchInquiryIds: ["INQ-RIVER-RAFT-ROUTE-2026"],
      supportSummary:
        "Contemporaneous front-page reporting directly establishes Jamie's originating role, the three-person crew, design, scale, participatory model, and interruption; Soundings independently corroborates scale, construction, and invitation patterns.",
      missingEvidence: [
        "Exact final landing point and completion date",
        "Complete route chronology and participant roster",
        "Rights clearance for newspaper pages and photography"
      ],
      boundaries: [
        "Use collective credit for Libby Hendon, Laura Mattingly, and the wider support network.",
        "Do not convert an in-progress November 2007 article into proof of the final endpoint.",
        "Keep the promoted claim in the bank unless a future public composition needs the detail."
      ],
      promotedClaimId: "CLM-RAFT-EXPEDITION-DESIGN-RESILIENCE",
      reviewedAt: "2026-07-16"
    }
  ],
  promotions: [
    {
      id: "PROM-RAFT-EXPEDITION-DESIGN-RESILIENCE-2026",
      candidateClaimId: "CND-RAFT-EXPEDITION-DESIGN-RESILIENCE",
      claimId: "CLM-RAFT-EXPEDITION-DESIGN-RESILIENCE",
      decision: "promoted",
      reason:
        "The article and corroborating archive source support a specific, collective, hiring-relevant claim about origination, improvised technical design, participation, scale, and resilience while leaving the endpoint unresolved.",
      decidedAt: "2026-07-16",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-KANSAS-CITY-STAR-RAFT-2026-07-16",
      audience:
        "Future portfolio editors, hiring-material agents, photo editors, and source reviewers",
      goal:
        "Preserve strong evidence of Jamie's project origination, participatory systems practice, improvised technical design, and operational resilience without crowding the current portfolio.",
      argument:
        "The expedition is unusually vivid evidence that Jamie has long turned an emerging idea into a working social and technical structure people could inhabit together.",
      selectedClaimIds: ["CLM-RAFT-EXPEDITION-DESIGN-RESILIENCE"],
      heldCandidateClaimIds: ["CND-RIVER-RAFT-KC-GULF"],
      rationale: [
        "Keep the full-strength claim available in the bank for future role-specific composition.",
        "Do not add another public project route or expand the current About paragraph.",
        "Treat the article's photographs as a photo-editor lead requiring rights review, not as cleared portfolio assets.",
        "Continue researching the exact endpoint separately from the verified Kansas City-to-Louisiana scale."
      ],
      createdAt: "2026-07-16"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-KANSAS-CITY-STAR-RAFT-VISUALS-2026",
      kind: "photo-editor",
      summary:
        "The article contains front-page and interior photographs showing the bicycle-powered raft, the three-person crew, and the craft under Mississippi River bridges. Treat these as visual research leads; newspaper and photographer rights are not cleared.",
      projectHints: ["participatory-public-systems"],
      sourceIds: ["SRC-KANSAS-CITY-STAR-RAFT-2007"],
      candidateClaimIds: ["CND-RAFT-EXPEDITION-DESIGN-RESILIENCE"],
      rightsReviewRequired: true,
      status: "hold",
      createdAt: "2026-07-16"
    }
  ]
};
