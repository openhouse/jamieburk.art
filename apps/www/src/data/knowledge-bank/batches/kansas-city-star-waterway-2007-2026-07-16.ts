import type {
  CitationPage,
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = ["Jamie Burkart", "Codex PDF close reading"];

export const kansasCityStarWaterwayBatch20260716: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
  pages: CitationPage[];
} = {
  intake: [
    {
      id: "INT-WATER-KCSTAR-GO-WITH-FLOW-2007",
      kind: "artifact-lead",
      capturedAt: reviewedAt,
      capturedFrom: "Jamie Burkart portfolio working session",
      publicSafeSummary:
        "Close-read a two-page Kansas City Star report on the collective 2007 river expedition, its found-material raft, interim route, participatory method, and Jamie's stated civic interpretation.",
      projects: ["waterway-participation"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: ["SRC-WATER-KCSTAR-GO-WITH-FLOW-2007"],
      claimIds: [
        "CLM-WATER-RAFT-CONCEPT",
        "CLM-WATER-GULF-ROUTE",
        "CLM-WATER-PARTICIPATORY-THROUGHLINE"
      ],
      researchTaskIds: ["TASK-WATER-GULF-ROUTE"],
      notes: [
        "The article scan is not republished; the public repository retains citation metadata, a file fingerprint, bounded paraphrases, and rights constraints.",
        "The article establishes a July 21 departure and an interim position south of Baton Rouge, not the expedition's later Gulf terminus.",
        "Artifact SHA-256: 8e9821ddccffc062983e3cf38f5a6080a1a5d1ee0cf1d0ff2b38b5ff40b17cd3."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-WATER-KCSTAR-GO-WITH-FLOW-2007",
      title: "In the name of art, go with the flow",
      organization: "The Kansas City Star",
      author: "Darryl Levings",
      kind: "published-article",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publishedAt: "2007-11-15",
      accessedAt: reviewedAt,
      publicCitation:
        "Darryl Levings, 'In the name of art, go with the flow,' The Kansas City Star, November 15, 2007, pp. A1, A4; user-provided scan reviewed July 16, 2026.",
      publicNote:
        "Front-page and continuation reporting on the collective river expedition, its found-material bicycle-powered raft, interim route through Louisiana, participatory method, operational disruption, and Jamie's interpretation of the river as civic and cultural space.",
      protectedLocatorId: "ARCHIVE-WATER-KCSTAR-GO-WITH-FLOW-2007",
      media: {
        mediaKind: "document",
        rightsStatus: "permission-needed",
        consentStatus: "not-applicable",
        publicDisplayStatus: "metadata-only"
      },
      supportsGenerally: [
        "the article's date, byline, front-page placement, and continuation",
        "Jamie's origination of the expedition idea",
        "the named three-person crew and broader participant involvement",
        "the found-material raft's approximate dimensions and bicycle-powered paddlewheel",
        "the July 21 Kansas City departure and interim location south of Baton Rouge",
        "public participation through stops, invitations aboard, and relationship-building",
        "Jamie's stated interpretation of the river as civic, infrastructural, and cultural space"
      ],
      doesNotEstablish: [
        "that Jamie alone designed, built, or operated the raft",
        "the later Gulf of Mexico terminus",
        "every participant, stop, or route segment",
        "measured cultural, community, or policy outcomes",
        "ownership or permission to republish the scanned pages or photographs"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-WATER-KCSTAR-PUBLICATION",
      sourceId: "SRC-WATER-KCSTAR-GO-WITH-FLOW-2007",
      project: "waterway-participation",
      assertion:
        "The Kansas City Star published Darryl Levings's river-expedition report on its November 15, 2007 front page and continued it on page A4.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WATER-RAFT-CONCEPT"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WATER-KCSTAR-CONCEPT-ORIGIN",
      sourceId: "SRC-WATER-KCSTAR-GO-WITH-FLOW-2007",
      project: "waterway-participation",
      assertion:
        "The article reports that the expedition began with an idea originated by Jamie.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-WATER-RAFT-CONCEPT",
        "CLM-WATER-PARTICIPATORY-THROUGHLINE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WATER-KCSTAR-COLLECTIVE-CREW",
      sourceId: "SRC-WATER-KCSTAR-GO-WITH-FLOW-2007",
      project: "waterway-participation",
      assertion:
        "The report names Libby Hendon, Jamie Burkart, and Laura Mattingly as the crew then traveling south and notes that friends joined the raft for portions of the journey.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [
        "CLM-WATER-RAFT-CONCEPT",
        "CLM-WATER-GULF-ROUTE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WATER-KCSTAR-RAFT-SYSTEM",
      sourceId: "SRC-WATER-KCSTAR-GO-WITH-FLOW-2007",
      project: "waterway-participation",
      assertion:
        "The article describes an approximately 12-by-13-foot raft built in three weeks from discarded building materials, civic refuse, and plastic syrup drums, with two bicycles linked to a paddlewheel.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WATER-RAFT-CONCEPT"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WATER-KCSTAR-PARTICIPATORY-METHOD",
      sourceId: "SRC-WATER-KCSTAR-GO-WITH-FLOW-2007",
      project: "waterway-participation",
      assertion:
        "The report frames the project as a lived river experience involving encounters with people along the route, stops for supplies and conversation, friends joining for segments, and invitations for people to come aboard.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WATER-PARTICIPATORY-THROUGHLINE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WATER-KCSTAR-INTERIM-ROUTE",
      sourceId: "SRC-WATER-KCSTAR-GO-WITH-FLOW-2007",
      project: "waterway-participation",
      assertion:
        "The article reports a July 21 departure from Kansas City's West Bottoms and places the crew south of Baton Rouge by November 15, 2007, still traveling toward salt water.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WATER-GULF-ROUTE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WATER-KCSTAR-OPERATIONAL-DISRUPTION",
      sourceId: "SRC-WATER-KCSTAR-GO-WITH-FLOW-2007",
      project: "waterway-participation",
      assertion:
        "The report describes a Coast Guard intervention, a 51-day interruption near Vicksburg, legal assistance, repairs, and material support from local residents before the crew resumed the journey.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [
        "CLM-WATER-GULF-ROUTE",
        "CLM-WATER-PARTICIPATORY-THROUGHLINE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WATER-KCSTAR-CIVIC-INTERPRETATION",
      sourceId: "SRC-WATER-KCSTAR-GO-WITH-FLOW-2007",
      project: "waterway-participation",
      assertion:
        "Jamie described Kansas City's river as commonly perceived as invisible, dangerous, divisive, historical, or industrial and proposed that the journey might awaken cultural connection between the West Bottoms and Delta communities.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-WATER-RAFT-CONCEPT",
        "CLM-WATER-PARTICIPATORY-THROUGHLINE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WATER-KCSTAR-GULF-BOUNDARY",
      sourceId: "SRC-WATER-KCSTAR-GO-WITH-FLOW-2007",
      project: "waterway-participation",
      assertion:
        "At publication, the crew expected to test for salt below New Orleans; the article does not report that the raft expedition had already reached the Gulf of Mexico.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-WATER-GULF-ROUTE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    }
  ],
  claims: [],
  researchTasks: [],
  researchInquiries: [
    {
      id: "INQ-WATER-KCSTAR-CLOSE-READ-2026",
      project: "waterway-participation",
      question:
        "What does the recovered Kansas City Star article establish about the expedition's concept, collective crew, material system, route, participation method, and civic purpose?",
      methods: [
        "Inspected PDF metadata and calculated an artifact fingerprint.",
        "Rendered both pages at high resolution and visually reviewed the front page, continuation, photographs, captions, byline, date, and article structure.",
        "Compared layout-aware text extraction with the rendered pages.",
        "Decomposed factual reporting, participant statements, contextual reporting, and endpoint limitations into atomic assertions.",
        "Compared the article against the existing Pitch, Facebook-event, and waterway claim records."
      ],
      runAt: reviewedAt,
      resultStatus: "recovered",
      findings: [
        "The source independently corroborates Jamie's origination of the expedition idea while documenting collective execution.",
        "It supplies a detailed found-material and bicycle-powered raft description.",
        "It establishes a July 21 West Bottoms departure and an interim position south of Baton Rouge by November 15, 2007.",
        "It documents participation through encounters, visitors joining the raft, invitations aboard, and local support during disruption.",
        "It records Jamie's interpretation of the river as civic, infrastructural, and cultural space."
      ],
      limitations: [
        "The article predates the later Gulf terminus and cannot establish completion.",
        "It does not allocate individual authorship for raft construction or every operational decision.",
        "It does not identify every participant, stop, route segment, or later phase.",
        "The copyrighted scan and photographs remain outside the public repository pending rights review."
      ],
      sourceIds: ["SRC-WATER-KCSTAR-GO-WITH-FLOW-2007"],
      publicSummary:
        "The recovered November 2007 front-page report strengthens the collective waterway record with independently reported concept origin, raft-system details, interim geography, participatory method, disruption history, and civic framing while stopping before the later Gulf terminus.",
      protectedLocatorId: "RESEARCH-WATER-KCSTAR-CLOSE-READ-2026"
    }
  ],
  pages: []
};
