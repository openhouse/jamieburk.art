import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-22";
const intakeId = "INTAKE-TEAM-MEMORY-REAL-WORLD-RESPONSE-2026-08-22";
const sourceId = "SRC-TEAM-MEMORY-REAL-WORLD-RESPONSE-2026-08-22";

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "Protected response to a Knowledge Wiki progress update",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart",
    projectIds: ["source-backed-team-memory", "knowledge-wiki-graph"],
    reason:
      "Record the smallest useful state change from a real-world follow-up without publishing private correspondence, personal circumstances, or an inferred endorsement.",
    visibility: "protected",
    disposition: "integrated",
    sourceIds: [sourceId],
    observationIds: [
      "OBS-TEAM-MEMORY-WARM-REENGAGEMENT-2026-08-22",
      "OBS-TEAM-MEMORY-RESPONSE-LIMITS-2026-08-22"
    ],
    researchInquiryIds: [],
    boundaries: [
      "Retain no message text, personal circumstances, contact information, screenshots, or identifying private-source metadata in the Knowledge Wiki.",
      "A warm acknowledgment and invitation to speak again do not establish that a link was opened, a page was reviewed, a proposal was understood, an endorsement was given, a budget exists, or hiring interest is present.",
      "This occurrence cannot clear a page-owner, collaborator-review, hiring-reader, commercial-acceptance, or publication gate."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: "OBS-TEAM-MEMORY-WARM-REENGAGEMENT-2026-08-22",
    intakeId,
    sourceId,
    comparisonSourceIds: [],
    project: "source-backed-team-memory",
    kind: "source-fact",
    text:
      "A protected prospective sponsor responded warmly to Jamie's low-pressure Knowledge Wiki progress update and expressed interest in a future conversation.",
    locator: "Protected response-state summary; raw exchange withheld.",
    status: "verified",
    publicSafe: true,
    claimIds: [],
    researchInquiryIds: [],
    limitations: [
      "The response does not establish that either shared link was opened or that any public page was reviewed.",
      "The response does not establish proposal comprehension, endorsement, budget authority, hiring intent, acceptance, or a commercial engagement."
    ]
  },
  {
    id: "OBS-TEAM-MEMORY-RESPONSE-LIMITS-2026-08-22",
    intakeId,
    sourceId,
    comparisonSourceIds: [],
    project: "source-backed-team-memory",
    kind: "bounded-inference",
    text:
      "The useful next step is a human conversation when timing permits; further portfolio optimization is not a substitute for learning what the prospective sponsor actually needs now.",
    locator: "Governed interpretation of the protected response state.",
    status: "captured",
    publicSafe: true,
    claimIds: [],
    researchInquiryIds: [],
    limitations: [
      "This next-step recommendation is Jamie's operating interpretation, not a commitment or request from the prospective sponsor beyond interest in speaking again."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: sourceId,
    title: "Protected Knowledge Wiki follow-up response state",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-08-22",
    accessedAt: reviewedAt,
    publicCitation:
      "Governed August 22, 2026 response-state summary for a protected prospective consulting lead.",
    publicNote:
      "The summary records warm re-engagement and an invitation to speak again while withholding identity, message text, and personal circumstances.",
    supportsGenerally: [
      "warm re-engagement",
      "interest in a future conversation",
      "continued unresolved opportunity state"
    ],
    doesNotEstablish: [
      "link opening",
      "page review",
      "proposal comprehension",
      "endorsement",
      "budget authority",
      "hiring intent",
      "commercial acceptance"
    ],
    protectedLocatorId: "COMM-TEAM-MEMORY-RESPONSE-2026-08-22"
  }
];

export const teamMemoryResponseAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims: [] as KnowledgeBank["claims"],
  researchInquiries: [] as KnowledgeBank["researchInquiries"]
};
