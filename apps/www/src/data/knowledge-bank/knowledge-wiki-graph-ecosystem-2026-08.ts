import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-21";
const reviewedBy = ["Jamie Burkart", "Codex architecture review"];
const intakeId = "INTAKE-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026";
const claimId = "CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026";
const rfcFiveSourceId = "SRC-KNOWLEDGE-WIKI-RFC-0005-2026";
const rfcSixSourceId = "SRC-KNOWLEDGE-WIKI-RFC-0006-2026";

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "Knowledge Wiki Graph ecosystem portfolio representation",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex architecture review",
    projectIds: ["knowledge-wiki-graph", "source-backed-team-memory"],
    reason:
      "Generalize the current cross-repository research architecture into a concise public explanation without exposing protected repository topology or presenting an evolving method as a completed product.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [rfcFiveSourceId, rfcSixSourceId],
    observationIds: [
      "OBS-KNOWLEDGE-WIKI-THREE-GRAPHS",
      "OBS-KNOWLEDGE-WIKI-FEDERATED-AUTHORITY"
    ],
    researchInquiryIds: [],
    boundaries: [
      "Repository roles and graph responsibilities are related but not interchangeable.",
      "The public portfolio explains the operating method without publishing a private repository inventory, source locators, or protected records.",
      "An audience-specific projection is a selected output, not another source of truth or permission to publish."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: "OBS-KNOWLEDGE-WIKI-THREE-GRAPHS",
    intakeId,
    sourceId: rfcFiveSourceId,
    comparisonSourceIds: [],
    project: "knowledge-wiki-graph",
    kind: "source-fact",
    text:
      "RFC 0005 distinguishes a semantic graph of meaning, an evidence graph of support and complication, and a source-custody layer for authoritative bytes and access conditions; it treats audience-specific projections as a fourth output.",
    locator: "RFC 0005, Summary and Terminology",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [],
    limitations: [
      "RFC 0005 remains an exploring design record and does not by itself authorize migration, source access, publication, deployment, or indexing."
    ]
  },
  {
    id: "OBS-KNOWLEDGE-WIKI-FEDERATED-AUTHORITY",
    intakeId,
    sourceId: rfcSixSourceId,
    comparisonSourceIds: [rfcFiveSourceId],
    project: "knowledge-wiki-graph",
    kind: "source-fact",
    text:
      "RFC 0006 defines a federated exchange in which repositories retain local authority, packets transport selected context without becoming canonical truth, and release remains a separate human decision.",
    locator: "RFC 0006, Summary, Repository roles, and Context packets",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [],
    limitations: [
      "RFC 0006 remains proposed; it records a protocol for review rather than proof of organization-wide adoption or a completed client system."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: rfcFiveSourceId,
    title: "RFC 0005: Three-Layer Knowledge Graph and Governed Source Materialization",
    organization: "openhouse / jamieburk.art",
    author: "Jamie Burkart and Codex, AI-assisted draft",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-08-10",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/0bb9c74de8d774dd2be85f9b16c5e22e56096bfc/rfcs/0005-three-layer-knowledge-graph.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart and Codex, RFC 0005: Three-Layer Knowledge Graph and Governed Source Materialization, exploring design record, August 10, 2026.",
    publicNote:
      "The RFC documents the three graph responsibilities and projection boundary; its exploring status is part of the evidence.",
    supportsGenerally: [
      "semantic, evidence, and source-custody separation",
      "audience-specific projection as an output",
      "human authority over publication"
    ],
    doesNotEstablish: [
      "a completed migration",
      "a finished product",
      "client adoption",
      "permission to access or publish protected material"
    ]
  },
  {
    id: rfcSixSourceId,
    title: "RFC 0006: Federated Knowledge Exchange and Release Receipts",
    organization: "openhouse / jamieburk.art",
    author: "Jamie Burkart and Codex, AI-assisted draft",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-08-11",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/0bb9c74de8d774dd2be85f9b16c5e22e56096bfc/rfcs/0006-federated-knowledge-exchange-and-release-receipts.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart and Codex, RFC 0006: Federated Knowledge Exchange and Release Receipts, proposed design record, August 11, 2026.",
    publicNote:
      "The RFC documents federation, local repository authority, transport boundaries, and human release control; its proposed status is part of the evidence.",
    supportsGenerally: [
      "federated repository authority",
      "context packets as transport rather than truth",
      "release as a separate human decision"
    ],
    doesNotEstablish: [
      "a universal repository topology",
      "automatic publication authority",
      "a completed production deployment",
      "client adoption"
    ]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: claimId,
    project: "knowledge-wiki-graph",
    internalClaim:
      "Jamie is developing a federated Knowledge Wiki Graph practice that keeps semantic meaning, evidentiary support, and source custody distinct across project-specific repositories, then uses human review to compose audience-specific projections.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "I am developing a federated Knowledge Wiki Graph practice that keeps meaning, evidence, and source custody distinct, then composes audience-specific outputs through human review.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "/lab/source-backed-team-memory",
          "/colophon",
          "/work",
          "/about"
        ]
      }
    ],
    evidence: [
      {
        sourceId: rfcFiveSourceId,
        relationship: "direct-support",
        supports: [
          "three separate graph responsibilities",
          "projection as a fourth output",
          "human publication authority"
        ],
        locator: "Summary and Terminology",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: rfcSixSourceId,
        relationship: "corroborating",
        supports: [
          "federated repository authority",
          "transport distinct from truth",
          "separate release decision"
        ],
        locator: "Summary, Repository roles, and Context packets",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Present this as current research and an operating method in development.",
      "Repository roles do not map one-to-one onto graph responsibilities.",
      "Do not expose protected repository topology, source locators, or private records.",
      "Do not imply a completed client deployment, production platform, market validation, or automatic trust."
    ],
    antiClaims: [
      "Every ecosystem repository corresponds to exactly one graph.",
      "The Knowledge Wiki Graph is a finished production platform.",
      "A client has adopted the system.",
      "Source access, evidence, interpretation, and publication permission are interchangeable.",
      "A context packet or successful eval authorizes release."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  }
];

export const knowledgeWikiGraphEcosystemAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims
};
