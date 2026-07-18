#!/usr/bin/env node

import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";
import { validateOperatorGraph } from "./lib/knowledge-operator-validation.mjs";

const help = `Usage:
  npm run query:knowledge-lifecycle -- <bounded query>
  npm run query:knowledge-lifecycle -- --id <stable-id>
  npm run query:knowledge-lifecycle -- --project <project-id>
  npm run query:knowledge-lifecycle -- --status <status>
  npm run query:knowledge-lifecycle -- --source <source-id-or-text>
  npm run query:knowledge-lifecycle -- --inquiry <inquiry-id-or-text>
  npm run query:knowledge-lifecycle -- --projection <surface-or-status>
  npm run query:knowledge-lifecycle -- --evidence-class <class>
  npm run query:knowledge-lifecycle -- --view <held|research|proof-debt>

Read-only and public-safe. Output excludes protected locators, internal excerpts,
private URLs, and raw source material. Queries are capped at 120 characters and
100 result rows.
`;

const args = process.argv.slice(2);
if (!args.length || args.includes("--help") || args.includes("-h")) {
  console.log(help);
  process.exit(0);
}

const graphErrors = validateOperatorGraph();
if (graphErrors.length) {
  console.error(`Canonical knowledge graph is invalid:\n${graphErrors.join("\n")}`);
  process.exit(1);
}

const flags = new Set(["--id", "--project", "--status", "--source", "--inquiry", "--projection", "--evidence-class", "--view"]);
let mode = "text";
let query = args.join(" ").trim();
if (flags.has(args[0])) {
  if (args.length !== 2) {
    console.error(help);
    process.exit(1);
  }
  mode = args[0].slice(2);
  query = args[1].trim();
}
if (!query || query.length > 120) {
  console.error("Query must contain 1-120 characters.");
  process.exit(1);
}

const normalize = (value) => String(value ?? "").toLowerCase();
const includes = (value) => normalize(value).includes(normalize(query));
const publicSource = (source) => ({
  type: "source",
  id: source.id,
  title: source.title,
  kind: source.kind,
  visibility: source.visibility,
  preservationStatus: source.preservationStatus,
  citation: source.publicCitation
});
const publicClaim = (claim) => ({
  type: "claim",
  id: claim.id,
  project: claim.project,
  status: claim.status,
  claim: claim.internalClaim,
  projections: claim.projections.map(({ key, status, surfaces, rationale }) => ({ key, status, surfaces, rationale })),
  sourceIds: claim.evidence.map((item) => item.sourceId),
  inquiryIds: claim.researchInquiryIds,
  boundaries: claim.boundaries,
  antiClaims: claim.antiClaims
});
const publicInquiry = (inquiry) => ({
  type: "inquiry",
  id: inquiry.id,
  project: inquiry.project,
  resultStatus: inquiry.resultStatus,
  question: inquiry.question,
  findings: inquiry.findings,
  limitations: inquiry.limitations,
  sourceIds: inquiry.sourceIds
});
const publicProof = (proof) => ({
  type: "proof",
  id: proof.id,
  status: proof.status,
  supportLevel: proof.supportLevel,
  evidenceClass: proof.evidenceClass,
  wording: proof.publicWording,
  surfaces: proof.surfaces,
  canonicalClaimIds: proof.canonicalClaimIds ?? [],
  guardrail: proof.guardrail
});

let results = [];
if (mode === "id") {
  results = [
    ...knowledgeBank.intake.filter((item) => item.id === query).map((item) => ({ type: "intake", id: item.id, title: item.title, status: item.status, disposition: item.disposition, projectIds: item.projectIds, boundaries: item.boundaries })),
    ...knowledgeBank.sources.filter((item) => item.id === query).map(publicSource),
    ...knowledgeBank.claims.filter((item) => item.id === query).map(publicClaim),
    ...knowledgeBank.researchInquiries.filter((item) => item.id === query).map(publicInquiry),
    ...knowledgeBank.corrections.filter((item) => item.id === query).map((item) => ({ type: "correction", ...item })),
    ...proofClaims.filter((item) => item.id === query).map(publicProof)
  ];
} else if (mode === "project") {
  results = [
    ...knowledgeBank.claims.filter((item) => item.project === query).map(publicClaim),
    ...knowledgeBank.researchInquiries.filter((item) => item.project === query).map(publicInquiry),
    ...proofClaims.filter((item) => item.relatedProjects.includes(query)).map(publicProof)
  ];
} else if (mode === "status") {
  results = [
    ...knowledgeBank.claims.filter((item) => item.status === query).map(publicClaim),
    ...knowledgeBank.researchInquiries.filter((item) => item.resultStatus === query).map(publicInquiry),
    ...proofClaims.filter((item) => item.status === query || item.supportLevel === query).map(publicProof)
  ];
} else if (mode === "source") {
  const matchingIds = new Set(knowledgeBank.sources.filter((item) => item.id === query || includes(item.title) || includes(item.publicCitation)).map((item) => item.id));
  results = [
    ...knowledgeBank.sources.filter((item) => matchingIds.has(item.id)).map(publicSource),
    ...knowledgeBank.claims.filter((item) => item.evidence.some((evidence) => matchingIds.has(evidence.sourceId))).map(publicClaim),
    ...knowledgeBank.researchInquiries.filter((item) => item.sourceIds.some((id) => matchingIds.has(id))).map(publicInquiry)
  ];
} else if (mode === "inquiry") {
  results = knowledgeBank.researchInquiries.filter((item) => item.id === query || includes(item.question) || includes(item.resultStatus)).map(publicInquiry);
} else if (mode === "projection") {
  results = knowledgeBank.claims.filter((item) => item.projections.some((projection) => includes(projection.key) || includes(projection.status) || projection.surfaces.some(includes))).map(publicClaim);
} else if (mode === "evidence-class") {
  results = proofClaims.filter((item) => item.evidenceClass.includes(query)).map(publicProof);
} else if (mode === "view") {
  if (query === "held") {
    results = knowledgeBank.claims.filter((claim) => ["confirmed", "confirmed-with-boundary", "use-with-care"].includes(claim.status) && !claim.projections.some((projection) => projection.status === "active" && projection.surfaces.some((surface) => surface.startsWith("/")))).map(publicClaim);
  } else if (query === "research") {
    results = knowledgeBank.researchInquiries.filter((item) => ["open", "partially-recovered", "not-recovered", "inconclusive"].includes(item.resultStatus)).map(publicInquiry);
  } else if (query === "proof-debt") {
    results = proofClaims.filter((item) => !(item.canonicalClaimIds?.length)).map(publicProof);
  } else {
    console.error("--view must be held, research, or proof-debt.");
    process.exit(1);
  }
} else {
  const values = (item) => JSON.stringify(item);
  results = [
    ...knowledgeBank.sources.filter((item) => includes(values(publicSource(item)))).map(publicSource),
    ...knowledgeBank.claims.filter((item) => includes(values(publicClaim(item)))).map(publicClaim),
    ...knowledgeBank.researchInquiries.filter((item) => includes(values(publicInquiry(item)))).map(publicInquiry),
    ...proofClaims.filter((item) => includes(values(publicProof(item)))).map(publicProof)
  ];
}

const deduplicated = [...new Map(results.map((item) => [`${item.type}:${item.id}`, item])).values()].slice(0, 100);
console.log(JSON.stringify({ query: { mode, value: query }, count: deduplicated.length, truncated: results.length > 100, results: deduplicated }, null, 2));
