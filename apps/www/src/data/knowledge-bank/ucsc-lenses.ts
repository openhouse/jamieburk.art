import type { ClaimRecord, ResearchInquiry, SourceRecord } from "./schema.ts";

export const ucscLensSources = [
  {
    id: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
    title: "UCSC narrative evaluations for Jamie Burkart",
    organization: "University of California, Santa Cruz",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2025-01-16",
    accessedAt: "2026-07-16",
    metadataVerifiedAt: "2026-07-16",
    metadataVerifiedBy: "Jamie Burkart and Codex protected-record review",
    reviewStatus: "close-read",
    contentReviewedAt: "2026-07-16",
    contentReviewedBy: "Codex local artifact review",
    publicCitation: "Unofficial UCSC narrative-evaluation copy covering Jamie Burkart's 2004 and 2006 Film and Digital Media coursework.",
    publicNote: "The protected copy preserves instructor evaluations by Warren Sack and Margaret Morse. It is used as source-positioned educational evidence, not as an official transcript or a public testimonial.",
    supportsGenerally: [
      "source-backed digital-media analysis and classroom contribution",
      "recursive social-software analysis, interactive prototyping, and collective installation design",
      "media archaeology, embodied conceptual inquiry, and the Time is Long installation"
    ],
    doesNotEstablish: [
      "authentication as an official transcript",
      "permission to reproduce the evaluations in full",
      "current professional performance",
      "public adoption or impact of the student projects"
    ],
    protectedLocatorId: "ARCHIVE-UCSC-NARRATIVE-EVALUATIONS-2004-2006-001"
  },
  {
    id: "SRC-MARGARET-MORSE-LINKEDIN-RECOMMENDATION-2014",
    title: "Margaret Morse LinkedIn recommendation for Jamie Burkart",
    author: "Margaret Morse",
    kind: "individual-social-post",
    visibility: "public-metadata-only",
    preservationStatus: "live",
    publishedAt: "2014-09-04",
    capturedAt: "2026-07-15",
    accessedAt: "2026-07-16",
    metadataVerifiedAt: "2026-07-16",
    metadataVerifiedBy: "Codex user-provided screenshot review",
    reviewStatus: "close-read",
    contentReviewedAt: "2026-07-16",
    contentReviewedBy: "Codex local artifact review",
    publicCitation: "Margaret Morse, LinkedIn recommendation for Jamie Burkart, September 4, 2014.",
    publicNote: "A user-provided screenshot preserves a public-facing recommendation describing Jamie as a former student and advisee on an ambitious installation project. The canonical post URL was not recovered in this pass.",
    supportsGenerally: [
      "Margaret Morse taught Jamie in Film and Digital Media",
      "Morse advised Jamie on an ambitious installation project",
      "Morse remembered the installation's insight and Jamie's dedication"
    ],
    doesNotEstablish: [
      "the installation's title or date",
      "a complete project history",
      "independent outcome verification",
      "permission to republish the screenshot"
    ]
  }
] satisfies SourceRecord[];

export const ucscLensClaims = [
  {
    id: "CLM-UCSC-EMBODIED-ART-SYSTEMS-METHOD-2006",
    project: "ucsc-media-systems-practice",
    internalClaim: "Protected instructor evaluations and contemporaneous public reporting document an early Jamie practice of embodying concepts through installations and participatory situations, attending to media history and documentation, and treating hospitality and shared responsibility as part of how a system works.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie's early media practice joined embodied inquiry, participatory situations, media history, hospitality, and shared responsibility.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
        relationship: "private-support",
        supports: ["media archaeology", "embodied conceptual inquiry", "Time is Long as a realized installation"],
        locator: "Margaret Morse evaluations, Spring 2006",
        publicNote: "Protected educational record; paraphrase only.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
        relationship: "direct-support",
        supports: ["participatory art/life practice", "public hospitality", "collective responsibility", "multi-perspective documentation"],
        locator: "Shop Shows; UCSC staff review; A Tradition of Experiment",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-MARGARET-MORSE-LINKEDIN-RECOMMENDATION-2014",
        relationship: "corroborating",
        supports: ["Morse's continuing recognition of Jamie's installation practice"],
        publicNote: "Public-facing recommendation artifact; no canonical URL recovered.",
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Treat installations and participatory situations as collaborative where the sources describe collaborators.",
      "Do not republish the protected evaluations, private correspondence, or recommendation screenshot without separate approval.",
      "Do not convert instructor praise into proof of later professional outcomes."
    ],
    antiClaims: [
      "Jamie was the sole author of Open House or the Shop Shows",
      "Every later operating system is an artwork",
      "The student record is an official transcript",
      "Praise establishes adoption or impact"
    ],
    researchInquiryIds: ["RQ-UCSC-MORSE-SACK-LENSES-2026"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex local artifact review"]
  },
  {
    id: "CLM-UCSC-RECURSIVE-SYSTEMS-METHOD-2004-2006",
    project: "ucsc-media-systems-practice",
    internalClaim: "A protected Warren Sack evaluation documents Jamie moving from recursive observations about social-group membership to an image-search prototype and interactive interface, alongside source-backed analysis and collective installation architecture.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie's UCSC work connected recursive social observation, source-backed analysis, prototypes, interfaces, and collective installation design.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
        relationship: "private-support",
        supports: [
          "recursive analysis of shared group memberships",
          "a similar-image prototype combining social and image analysis",
          "an interactive Max/MSP Jitter interface",
          "source-backed writing and collective installation design"
        ],
        locator: "Warren Sack evaluations, Spring 2004 and Winter 2006",
        publicNote: "Protected educational record; paraphrase only.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Treat the described work as student research and prototyping, not as evidence of production adoption.",
      "Credit the final installation architecture as group work.",
      "Keep the instructor's structural-equivalence comparison in protected context rather than using it as a public genius claim."
    ],
    antiClaims: [
      "Jamie originated structural equivalence as a field concept",
      "The prototype became a deployed search product",
      "Jamie alone designed the collective final project",
      "The unofficial copy is an official transcript"
    ],
    researchInquiryIds: ["RQ-UCSC-MORSE-SACK-LENSES-2026"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex local artifact review"]
  }
] satisfies ClaimRecord[];

export const ucscLensResearchInquiries = [
  {
    id: "RQ-UCSC-MORSE-SACK-LENSES-2026",
    project: "ucsc-media-systems-practice",
    question: "What defensible method principles do the Morse and Sack evaluations support, and how can the portfolio preserve them without publishing protected student records or turning praise into outcome evidence?",
    methods: [
      "Close-read the protected unofficial narrative-evaluation copy",
      "Close-read the public Good Times Open House article and user-provided LinkedIn screenshot",
      "Decompose observations about embodied inquiry, recursive systems reasoning, prototyping, participation, and collaboration",
      "Separate current first-person method framing from historical outcome claims"
    ],
    runAt: "2026-07-16",
    resultStatus: "recovered",
    findings: [
      "Morse's evaluations support a bounded early practice of media archaeology and embodying concepts through installations and performance.",
      "The public Open House profile independently documents art/life experimentation, hospitality, communal responsibility, attention, and multi-perspective documentation.",
      "Sack's evaluations support a bounded chain from source-backed analysis and recursive social observation to prototype, interface, demonstration, and collective installation architecture.",
      "The portfolio can state Jamie's current method in first person while keeping historical detail and instructor praise in the source layer."
    ],
    limitations: [
      "The narrative-evaluation file is an unofficial protected copy.",
      "The LinkedIn screenshot does not preserve a canonical post URL.",
      "Educational evaluations do not establish current performance, adoption, or professional outcomes.",
      "Continuity into later projects is an editorial interpretation that must remain open to correction."
    ],
    sourceIds: [
      "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
      "SRC-MARGARET-MORSE-LINKEDIN-RECOMMENDATION-2014"
    ],
    publicSummary: "A protected and public-source review recovered two complementary method lineages: embodied, participatory media inquiry and recursive, source-backed systems prototyping.",
    protectedLocatorId: "ARCHIVE-UCSC-NARRATIVE-EVALUATIONS-2004-2006-001"
  }
] satisfies ResearchInquiry[];
