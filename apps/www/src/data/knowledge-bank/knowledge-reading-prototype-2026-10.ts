import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-10-18";
const intakeId = "INTAKE-KNOWLEDGE-READER-RETURN-PROTOTYPE-2026";
const claimId = "CLM-KNOWLEDGE-READER-RETURN-PROTOTYPE-2026";
const codeId = "SRC-KNOWLEDGE-READER-RETURN-CODE-2026";
const testsId = "SRC-KNOWLEDGE-READER-RETURN-TESTS-2026";
const prefix = "https://github.com/openhouse/jamieburk.art/blob/6118a99b49bbe2b771ed6c8a48b938d7035e5b15/";

const sources: KnowledgeBank["sources"] = [
  {
    id: codeId,
    title: "Synthetic reader-return reference implementation",
    organization: "openhouse / jamieburk.art",
    author: "Jamie Burkart's portfolio project, AI-assisted implementation",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: prefix + "scripts/rfcs/knowledge-reading.mjs",
    preferredPublicUrl: "canonical",
    publicCitation: "Synthetic reader-return reference implementation, revision 6118a99, reviewed October 18, 2026.",
    publicNote: "Public code accepts synthetic packets only and returns a candidate for review, not an authorized action.",
    supportsGenerally: ["edition-specific source references", "retained disagreement", "reference and next-action distinction"],
    doesNotEstablish: ["live source integration", "human semantic accuracy", "participant pilot", "client deployment", "publication permission"]
  },
  {
    id: testsId,
    title: "Reader-return prototype regression cases",
    organization: "openhouse / jamieburk.art",
    author: "Jamie Burkart's portfolio project, AI-assisted tests",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: prefix + "scripts/rfcs/knowledge-reading.test.mjs",
    preferredPublicUrl: "canonical",
    publicCitation: "Reader-return prototype regression tests, revision 6118a99, reviewed October 18, 2026.",
    publicNote: "Author-built synthetic controls test the specified behavior; they are not independent human validation.",
    supportsGenerally: ["executable development controls", "disagreement conservation", "automated scaffolds remain distinct from interpretation"],
    doesNotEstablish: ["measured usefulness for a real team", "external validation", "adoption", "release approval"]
  }
];

const intakeItems: KnowledgeBank["intakeItems"] = [{
  id: intakeId,
  kind: "analysis-note",
  title: "Represent the implemented reader-return prototype without promoting the broader proposal",
  submittedAt: reviewedAt,
  submittedBy: "AI-assisted GitHub source review requested by Jamie Burkart",
  projectIds: ["knowledge-wiki-graph", "source-backed-team-memory"],
  reason: "Bring the public account beyond an architecture proposal while retaining the synthetic-only implementation and unrun human-pilot boundaries.",
  visibility: "public-safe",
  disposition: "integrated",
  sourceIds: [codeId, testsId],
  observationIds: ["OBS-KNOWLEDGE-READER-RETURN-PROTOTYPE"],
  researchInquiryIds: ["INQ-KNOWLEDGE-WIKI-SHARED-MEMORY-PILOT"],
  boundaries: ["This intake concerns public implementation, not underlying private source material.", "A functioning reference prototype does not resolve the broader shared-memory pilot inquiry."]
}];

const observations: KnowledgeBank["observations"] = [{
  id: "OBS-KNOWLEDGE-READER-RETURN-PROTOTYPE",
  intakeId,
  sourceId: codeId,
  comparisonSourceIds: [testsId],
  project: "knowledge-wiki-graph",
  kind: "source-fact",
  text: "The synthetic-only reviewReturn implementation validates repository, exact revision, path and semantic identity, preserves prior disagreement, and rejects an action attached to a reference-only fragment.",
  locator: "reviewReturn reference validation, prior disagreement loop, disposition guard, and candidate return",
  status: "verified",
  publicSafe: true,
  claimIds: [claimId],
  researchInquiryIds: ["INQ-KNOWLEDGE-WIKI-SHARED-MEMORY-PILOT"],
  limitations: ["Source inspection establishes implemented behavior and test coverage, not human comprehension, actual collaboration, or production adoption."]
}];

const claims: KnowledgeBank["claims"] = [{
  id: claimId,
  project: "knowledge-wiki-graph",
  internalClaim: "Jamie's AI-assisted portfolio project includes a synthetic reader-return reference prototype with executable controls for exact source editions, retained disagreements, and separation of references from actions.",
  status: "confirmed-with-boundary",
  projections: [{
    key: "case-study",
    text: "I have built a synthetic reader-return prototype that keeps disagreements visible, ties corrections to exact source editions, and distinguishes a reference from a next action.",
    status: "active",
    citationRequired: true,
    surfaces: ["/lab/source-backed-team-memory"]
  }],
  evidence: [
    { sourceId: codeId, relationship: "direct-support", supports: ["implemented reference prototype", "source edition and disagreement controls", "reference is not an action"], locator: "reviewReturn", confidence: "high", renderCitation: true },
    { sourceId: testsId, relationship: "corroborating", supports: ["executable synthetic behavior checks"], locator: "fixture and conservation tests", confidence: "high", renderCitation: true }
  ],
  boundaries: ["AI-assisted development; synthetic examples only.", "Not a participant pilot or a client deployment.", "The broader shared-memory proposal remains under investigation; no human outcome or publication authority follows from a passing test."],
  antiClaims: ["The prototype establishes human semantic accuracy.", "A client has adopted the system.", "A technical pass authorizes publication, outreach or deployment."],
  researchInquiryIds: ["INQ-KNOWLEDGE-WIKI-SHARED-MEMORY-PILOT"],
  reviewedAt,
  reviewedBy: ["AI-assisted source review; Jamie editorial review remains separate"]
}];

export const knowledgeReadingPrototypeOctober2026 = { intakeItems, observations, sources, claims };
