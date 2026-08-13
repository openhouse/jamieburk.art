import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-13";
const reviewedBy = ["Jamie Burkart", "Codex governed ecosystem review"];
const intakeId = "INTAKE-FEDERATED-KNOWLEDGE-GRAPH-ECOSYSTEM-2026";
const claimId = "CLM-FEDERATED-KNOWLEDGE-GRAPH-OPERATING-MODEL";
const inquiryId = "INQ-FEDERATED-KNOWLEDGE-GRAPH-HANDOFFS";

const sourceIds = [
  "SRC-FEDERATED-ECOSYSTEM-JAMIEBURK-ART-DEVELOP-2026",
  "SRC-FEDERATED-ECOSYSTEM-PUBLIC-RECORD-2026",
  "SRC-FEDERATED-ECOSYSTEM-ISSUE-EDITION-2026",
  "SRC-FEDERATED-ECOSYSTEM-RESEARCH-PRODUCTION-2026",
  "SRC-FEDERATED-ECOSYSTEM-PACKET-MATERIALIZER-2026",
  "SRC-FEDERATED-ECOSYSTEM-SUBJECT-KNOWLEDGE-2026",
  "SRC-FEDERATED-ECOSYSTEM-PROJECT-THRESHOLD-2026"
] as const;

const observationIds = [
  "OBS-FEDERATED-ECOSYSTEM-PORTFOLIO-PROJECTION",
  "OBS-FEDERATED-ECOSYSTEM-PUBLIC-RECORD",
  "OBS-FEDERATED-ECOSYSTEM-ISSUE-EDITION",
  "OBS-FEDERATED-ECOSYSTEM-RESEARCH-PRODUCTION",
  "OBS-FEDERATED-ECOSYSTEM-PACKET-MATERIALIZER",
  "OBS-FEDERATED-ECOSYSTEM-SUBJECT-KNOWLEDGE",
  "OBS-FEDERATED-ECOSYSTEM-PROJECT-THRESHOLD"
] as const;

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "Federated Knowledge Wiki graph ecosystem close reading",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex governed ecosystem review",
    projectIds: ["knowledge-wiki-ecosystem"],
    reason: "Record the current division of authority across source custody, evidence, semantic synthesis, packet materialization, public source editions, project implementation, and selective portfolio projection without creating a live cross-repository dependency.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [...sourceIds],
    observationIds: [...observationIds],
    researchInquiryIds: [inquiryId],
    boundaries: [
      "Protected repository locators, clone instructions, paths, source bodies, account data, and credentials remain outside the public-safe record.",
      "Open change lines are observations of current development, not merged adoption, publication permission, deployment approval, or production truth.",
      "RFC 0005 remains exploring; this snapshot supplies bounded evidence and does not advance its stage or authorize implementation."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: observationIds[0],
    intakeId,
    sourceId: sourceIds[0],
    comparisonSourceIds: [],
    project: "knowledge-wiki-ecosystem",
    kind: "source-fact",
    text: "The current portfolio develop line contains governed canonical claims, a read-only three-layer graph prototype, bounded packet planning, and exact-candidate release gates while keeping public projection selective.",
    locator: "Public repository develop snapshot at the recorded source cutoff",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "A deterministic prototype and passing checks do not authorize RFC stage advancement, deployment, indexing, or public projection."
    ]
  },
  {
    id: observationIds[1],
    intakeId,
    sourceId: sourceIds[1],
    comparisonSourceIds: [],
    project: "knowledge-wiki-ecosystem",
    kind: "source-fact",
    text: "The public-record edition added public-safe WOW List product-leadership, social-practice, and recomposable-system records while preserving explicit source gaps, corrections, and collective-credit boundaries.",
    locator: "Public repository source edition reviewed at the source cutoff",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "A public record can orient readers to sources; it does not select portfolio copy or establish endorsement, recommendation, causation, or sole credit."
    ]
  },
  {
    id: observationIds[2],
    intakeId,
    sourceId: sourceIds[2],
    comparisonSourceIds: [],
    project: "knowledge-wiki-ecosystem",
    kind: "source-fact",
    text: "The issue-specific public edition remains the canonical home for complete public statement, policy-source, speaker, and source-gap records instead of duplicating canonical bodies into each audience projection.",
    locator: "Public issue-source edition reviewed at the source cutoff",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "Issue-source completeness is population- and cutoff-specific and does not establish portfolio relevance, current roles, or cross-project outcomes."
    ]
  },
  {
    id: observationIds[3],
    intakeId,
    sourceId: sourceIds[3],
    comparisonSourceIds: [],
    project: "knowledge-wiki-ecosystem",
    kind: "bounded-inference",
    text: "Recent governed research packages join source coverage, claims, artifacts, checksums, privacy review, propagation notes, and human gates into repeatable archival and distributed-team-memory returns.",
    locator: "Summary-only review; protected repository locator withheld",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "A package can preserve research state and handoff obligations; it does not authorize disclosure, synchronization, or another repository's editorial decision."
    ]
  },
  {
    id: observationIds[4],
    intakeId,
    sourceId: sourceIds[4],
    comparisonSourceIds: [],
    project: "knowledge-wiki-ecosystem",
    kind: "bounded-inference",
    text: "The packet layer now compiles bounded semantic-radius selections with lazy evidence attachment, count-and-digest hub summaries, compact overviews, attributed lenses, and typed knowledge-handoff states.",
    locator: "Summary-only review; protected repository locator withheld",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "Packet compilation establishes neither source authority nor factual truth, recipient usefulness, editorial adequacy, consent, rights, or publication permission."
    ]
  },
  {
    id: observationIds[5],
    intakeId,
    sourceId: sourceIds[5],
    comparisonSourceIds: [],
    project: "knowledge-wiki-ecosystem",
    kind: "bounded-inference",
    text: "The protected subject edition now distinguishes frozen population receipts, typed artifact and repository lineage, verified preservation, security holds, collective credit, and unresolved access gaps.",
    locator: "Summary-only review; protected repository locator withheld",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "Private preservation is not credential remediation, collaborator authorization, present-day software safety, rights clearance, or publication approval."
    ]
  },
  {
    id: observationIds[6],
    intakeId,
    sourceId: sourceIds[6],
    comparisonSourceIds: [],
    project: "knowledge-wiki-ecosystem",
    kind: "bounded-inference",
    text: "The current project threshold combines historical-tense source return, original public artifacts, shared credit, a source-backed writer's-voice method, and a human-reviewed copy register without announcing a full service relaunch.",
    locator: "Summary-only review of current candidate lines; protected repository locator withheld",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "Open candidate work does not authorize a merge, member contact, historic introduction publication, deployment, indexing, or a relaunch claim."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: sourceIds[0],
    title: "jamieburk.art develop ecosystem snapshot",
    organization: "openhouse",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "origin/develop 780d2b898de899445b11e922c4a34fddd40bbd3c",
    accessedAt: reviewedAt,
    canonicalUrl: "https://github.com/openhouse/jamieburk.art/tree/780d2b898de899445b11e922c4a34fddd40bbd3c",
    preferredPublicUrl: "canonical",
    publicCitation: "Public jamieburk.art develop snapshot containing the governed Knowledge Wiki and RFC 0005 evaluation prototype.",
    supportsGenerally: [
      "current portfolio Knowledge Wiki structure",
      "three-layer graph evaluation prototype",
      "selective projection and exact-candidate boundaries"
    ],
    doesNotEstablish: [
      "RFC acceptance",
      "implementation authorization",
      "deployment or indexing approval"
    ]
  },
  {
    id: sourceIds[1],
    title: "Jamie Burkart public-record edition",
    organization: "openhouse",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://github.com/openhouse/jamie-burkart-public-record",
    preferredPublicUrl: "canonical",
    publicCitation: "Public-source edition organized around Jamie Burkart's projects, practices, encounters, public statements, corrections, and coverage gaps.",
    supportsGenerally: [
      "public-source orientation role",
      "recent WOW List product and social-practice records",
      "correction and source-gap controls"
    ],
    doesNotEstablish: [
      "private-source publication permission",
      "portfolio selection",
      "endorsement or recommendation"
    ]
  },
  {
    id: sourceIds[2],
    title: "Commercial Rent Stabilization public-support edition",
    organization: "openhouse",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://github.com/openhouse/commercial-rent-stabilization-public-support",
    preferredPublicUrl: "canonical",
    publicCitation: "Issue-specific public-source edition preserving complete public statements, policy sources, speaker records, and explicit source gaps.",
    supportsGenerally: [
      "issue-edition canonicality",
      "complete public statement bodies",
      "speaker, legislation, and source-gap indexes"
    ],
    doesNotEstablish: [
      "portfolio selection",
      "current public roles",
      "cross-project causation"
    ]
  },
  {
    id: sourceIds[3],
    title: "Governed research-production repository review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Read-only summary review completed 2026-08-13",
    accessedAt: reviewedAt,
    publicCitation: "Summary-only review of governed archival-research and distributed team-memory production patterns.",
    publicNote: "The public-safe record exposes roles, boundaries, and handoff patterns only; repository locators, source bodies, paths, and protected project details remain withheld.",
    protectedLocatorId: "FEDERATION-RESEARCH-PRODUCTION-2026",
    supportsGenerally: [
      "manifest- and ledger-backed research returns",
      "privacy and checksum controls",
      "distributed team-memory handoff practice"
    ],
    doesNotEstablish: [
      "publication authority",
      "live synchronization",
      "another system's editorial decision"
    ]
  },
  {
    id: sourceIds[4],
    title: "Protected packet-materialization repository review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Read-only summary review completed 2026-08-13",
    accessedAt: reviewedAt,
    publicCitation: "Summary-only review of the bounded graph-radius packet compiler and typed team-knowledge practice.",
    publicNote: "No repository locator, source packet, private graph, seed, recipient contract, or protected acquisition path is exposed.",
    protectedLocatorId: "FEDERATION-PACKET-MATERIALIZER-2026",
    supportsGenerally: [
      "semantic-radius packet planning",
      "lazy evidence attachment and artifact budgets",
      "attributed lenses and typed handoff states"
    ],
    doesNotEstablish: [
      "source access",
      "factual truth",
      "recipient usefulness, editorial adequacy, or publication permission"
    ]
  },
  {
    id: sourceIds[5],
    title: "Protected subject-knowledge repository review",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Read-only summary review completed 2026-08-13",
    accessedAt: reviewedAt,
    publicCitation: "Summary-only review of bounded subject knowledge, population receipts, artifact lineage, preservation state, and security holds.",
    publicNote: "The record withholds repository locators, credential-bearing history, private sources, identities, correspondence, and artifact inventories.",
    protectedLocatorId: "FEDERATION-SUBJECT-KNOWLEDGE-2026",
    supportsGenerally: [
      "bounded population receipts",
      "typed artifact and repository lineage",
      "separate preservation and security states"
    ],
    doesNotEstablish: [
      "credential remediation",
      "collaborator access",
      "public wording or publication"
    ]
  },
  {
    id: sourceIds[6],
    title: "Protected project-threshold candidate review",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Read-only summary review of open candidate lines completed 2026-08-13",
    accessedAt: reviewedAt,
    publicCitation: "Summary-only review of a bounded source-return project threshold and its candidate-bound copy and interface gates.",
    publicNote: "The record withholds repository locators and unpublished candidate artifacts; it records only public-safe compositional and release boundaries.",
    protectedLocatorId: "FEDERATION-PROJECT-THRESHOLD-2026",
    supportsGenerally: [
      "historical-tense source-return composition",
      "source-backed writer's-voice method",
      "human-reviewed candidate copy register"
    ],
    doesNotEstablish: [
      "full service relaunch",
      "historic member contact or archive publication",
      "deployment or indexing approval"
    ]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: claimId,
    project: "knowledge-wiki-ecosystem",
    internalClaim: "As of August 13, 2026, the Knowledge Wiki graph ecosystem's leading edge is an operational federation: distinct systems own custody, evidence, semantic synthesis, bounded packet materialization, public source editions, project-specific implementation, and selective portfolio projection, with explicit non-automatic handoffs and separate human authority gates.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The current Knowledge Wiki graph ecosystem separates source custody, evidence, semantic synthesis, bounded packets, source editions, project implementation, and selective portfolio projection through governed handoffs.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: sourceIds[0],
        relationship: "direct-support",
        supports: ["portfolio projection role", "three-layer graph prototype", "exact-candidate release boundaries"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: sourceIds[1],
        relationship: "corroborating",
        supports: ["public-record source-edition role", "correction and gap controls"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: sourceIds[2],
        relationship: "corroborating",
        supports: ["issue-specific canonical source bodies", "non-duplicative source-edition pattern"],
        confidence: "high",
        renderCitation: true
      },
      ...sourceIds.slice(3).map((sourceId) => ({
        sourceId,
        relationship: "private-support" as const,
        supports: ["summary-only adjacent-system role and boundary review"],
        confidence: "moderate" as const,
        renderCitation: false
      }))
    ],
    boundaries: [
      "The snapshot is time-bound and distinguishes merged public records from open candidate developments.",
      "Each repository remains canonical only for its named role; this claim creates no shared database or live runtime dependency.",
      "Protected support is summary-only and cannot be rendered as a public citation or used to expose a repository locator.",
      "RFC 0005 remains exploring and Jamie Burkart retains stage, editorial, release, deployment, and indexing authority."
    ],
    antiClaims: [
      "One repository is canonical for the entire ecosystem.",
      "All repositories are synchronized or mutually consistent.",
      "A graph relation establishes factual truth, causation, consent, rights, or sole credit.",
      "A packet is a publication or an automated score is editorial approval.",
      "Private visibility is credential remediation or collaborator authorization.",
      "An open project threshold is a full service relaunch, production deployment, or indexing approval."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt,
    reviewedBy
  }
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: inquiryId,
    project: "knowledge-wiki-ecosystem",
    question: "Which content-addressed receipts, correction contracts, and human holdouts are needed for useful cross-repository handoffs without creating live synchronization or leaking protected locators?",
    methods: [
      "Refreshed the public portfolio develop ref and reviewed its recent merge, RFC, Knowledge Wiki, and evaluation lineage.",
      "Reviewed current public source editions and summary-only protected repository roles at a fixed August 13, 2026 cutoff.",
      "Compared canonical authority, input and output boundaries, correction paths, release gates, and current open development rather than treating repository recency as adoption."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Seven distinguishable operating roles are now visible across the ecosystem.",
      "The strongest recent development is typed specialization and governed handoff, not consolidation into one graph database.",
      "Count-and-digest packet budgets, attributed lenses, source-edition canonicality, research-package manifests, and human-reviewed project copy are compatible interfaces when their authority boundaries remain separate."
    ],
    limitations: [
      "Protected repository evidence is retained as summary-only support and cannot be independently reproduced from this public repository.",
      "Open candidate lines may change or close and are not merged adoption.",
      "No independent recipient usefulness holdout or cross-repository correction propagation drill was completed in this review.",
      "No source access, publication, merge, staging, production deployment, or indexing decision follows from this inquiry."
    ],
    sourceIds: [...sourceIds],
    publicSummary: "A bounded August 13 review found seven specialized graph-ecosystem roles and a common direction toward typed, non-automatic handoffs with content, privacy, credit, and release authority kept separate.",
    protectedLocatorId: "RESEARCH-FEDERATED-KNOWLEDGE-GRAPH-2026"
  }
];

export const federatedEcosystemAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims,
  researchInquiries
};
