#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  candidateFingerprint,
  checkGeneratedArtifacts,
  graphFingerprint,
  loadKnowledgeWiki,
  queryWiki,
  repoRoot
} from "./lib/knowledge-wiki.mjs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const suitePath = "evals/knowledge-wiki/suite.json";
const fixturePath = "evals/knowledge-wiki/fixtures/mutations.json";
const suite = JSON.parse(readFileSync(suitePath, "utf8"));

const candidatePaths = [
  ".vscode/settings.json",
  "AGENTS.md",
  "README.md",
  "package.json",
  "docs/architecture",
  "docs/knowledge-bank",
  "scripts/lib/knowledge-wiki.mjs",
  "scripts/check-knowledge-wiki.mjs",
  "scripts/generate-knowledge-wiki.mjs",
  "scripts/query-knowledge-wiki.mjs",
  "scripts/run-knowledge-wiki-tasks.mjs",
  "scripts/run-knowledge-wiki-evals.mjs",
  "scripts/tests/knowledge-wiki.test.mjs",
  "apps/www/src/data/knowledge-bank/nycartc-shared-folder-archive-production.ts",
  "apps/www/src/data/knowledge-bank/facebook-events-archive-production.ts",
  "apps/www/src/data/knowledge-bank/lifecycle-records.ts",
  "apps/www/src/data/knowledge-bank/records.ts",
  suitePath,
  fixturePath
];

const candidate = candidateFingerprint(candidatePaths);
const contract = candidateFingerprint([suitePath, fixturePath]);
const wiki = loadKnowledgeWiki();
const gates = new Map();

function normalizedText(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function gate(id, pass, detail) {
  gates.set(id, { id, status: pass ? "pass" : "fail", detail });
}

const authorityFiles = [
  "docs/architecture/ADR-knowledge-wiki-name-and-model.md",
  "docs/architecture/knowledge-wiki-inventory.md",
  "docs/knowledge-bank/knowledge-wiki-authoring.md"
];
const authorityText = normalizedText(readFileSync(path.join(repoRoot, "docs/architecture/ADR-knowledge-wiki-name-and-model.md"), "utf8"));
const authorityReady = authorityFiles.every((file) => existsSync(path.join(repoRoot, file))) &&
  ["knowledge bank", "markdown", "wiki graph", "selective", "projection", "source vault"].every((term) => authorityText.includes(term));
gate("authority_documented", authorityReady, authorityReady ? "Naming, authority, compatibility, and projection decisions are explicit" : "Required authority documentation is incomplete");

gate("wiki_integrity", wiki.inspection.errors.length === 0, wiki.inspection.errors.length ? wiki.inspection.errors.join("; ") : `${wiki.graph.nodes.length} governed records pass schema, link, fragment, relation, and path checks`);

const canonicalReferences = wiki.records.flatMap((record) => record.canonicalRefs);
gate("canonical_reference_integrity", canonicalReferences.length >= 8 && !wiki.inspection.errors.some((error) => error.includes("canonical_refs")), `${canonicalReferences.length} references connect Wiki context to current canonical records`);

const generatedErrors = checkGeneratedArtifacts(wiki);
gate("generated_artifacts_current", generatedErrors.length === 0, generatedErrors.length ? generatedErrors.join("; ") : "Graph, index, backlinks, health, and delta artifacts match authored records");

const secondGraph = loadKnowledgeWiki().graph;
gate("graph_determinism", graphFingerprint(wiki.graph) === graphFingerprint(secondGraph), `Graph semantic fingerprint ${graphFingerprint(wiki.graph)}`);

const discoverable = wiki.records.filter((record) => record.discoverable);
const reachable = discoverable.filter((record) => wiki.inspection.distances.has(record.id));
gate("discoverability", discoverable.length === reachable.length && wiki.health.diagnostics.maximumRootDistance <= 3, `${reachable.length}/${discoverable.length} discoverable records reachable; maximum path ${wiki.health.diagnostics.maximumRootDistance}`);

const queryFailures = [];
for (const benchmark of suite.queryBenchmarks) {
  const actual = queryWiki(wiki, benchmark.query).nodes.map((node) => node.id).sort();
  const expected = [...benchmark.expectedRecordIds].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) queryFailures.push(`${benchmark.id}: expected ${expected.join(", ")}; received ${actual.join(", ")}`);
  const expectedBodies = normalizedText(expected.map((id) => wiki.records.find((item) => item.id === id)?.body ?? "").join("\n"));
  if (!expectedBodies.includes(normalizedText(benchmark.requiredBoundary))) queryFailures.push(`${benchmark.id}: required boundary is absent from the bounded result`);
}
gate("query_benchmark", queryFailures.length === 0, queryFailures.length ? queryFailures.join("; ") : `${suite.queryBenchmarks.length} bounded retrieval benchmarks return the expected records and limitations`);

let mutationPass = true;
let mutationDetail = "Knowledge Wiki mutation suite passed";
try {
  execFileSync(process.execPath, ["--test", "scripts/tests/knowledge-wiki.test.mjs"], { cwd: repoRoot, stdio: "pipe" });
} catch (error) {
  mutationPass = false;
  mutationDetail = String(error.stdout || error.message).trim();
}
gate("mutation_rejection", mutationPass, mutationDetail);

const archiveClaimIds = [
  "CLM-NYCARTC-SHARED-FOLDER-CENSUS-2026",
  "CLM-NYCARTC-PUBLIC-MEETING-OPERATING-SYSTEM",
  "CLM-NYCARTC-TESTIMONY-PARTICIPATION-DESIGN",
  "CLM-NYCARTC-NIGHTLIFE-RECOMMENDATION-CONTINUITY",
  "CLM-NYCARTC-NIGHTLIFE-SPEECH-SCRIPT",
  "CLM-NYCARTC-MARCH-CROSS-CHANNEL-IMPLEMENTATION",
  "CLM-NYCARTC-MARCH-DATA-DESIGN-LEAD"
];
const archiveSourceIds = [
  "SRC-NYCARTC-SHARED-FOLDER-CENSUS-2026",
  "SRC-NYCARTC-ARCHIVE-PUBLIC-MEETING-PLAYBOOK-2018",
  "SRC-NYCARTC-ARCHIVE-TESTIMONY-GUIDE-2017",
  "SRC-NYCARTC-ARCHIVE-JAMIE-CABARET-TESTIMONY-2017",
  "SRC-NYCARTC-ARCHIVE-NIGHTLIFE-RECOMMENDATION-SEQUENCE-2017-2019",
  "SRC-NYCARTC-ARCHIVE-JAMIE-NIGHTLIFE-SPEECH-2017",
  "SRC-NYCARTC-ARCHIVE-MARCH-CAMPAIGN-GUIDES-2018-2019",
  "SRC-NYCARTC-ARCHIVE-MARCH-DATA-DESIGN-NOTES-2019"
];
const archiveClaims = archiveClaimIds.map((id) => knowledgeBank.claims.find((claim) => claim.id === id)).filter(Boolean);
const archiveSources = archiveSourceIds.map((id) => knowledgeBank.sources.find((source) => source.id === id)).filter(Boolean);
const archiveReportPath = path.join(repoRoot, "docs/knowledge-bank/research/nycartc-shared-folder-archival-production-2026-07.md");
const archiveReport = existsSync(archiveReportPath) ? normalizedText(readFileSync(archiveReportPath, "utf8")) : "";

const populationTerms = [
  "population total 2 192",
  "inventoried total 2 192",
  "classified total 2 192",
  "dispositioned total 2 192",
  "nested folders 257",
  "files 1 935",
  "unresolved traversal errors 0"
];
const archivePopulationClosed = archiveClaims.some((claim) => claim.id === "CLM-NYCARTC-SHARED-FOLDER-CENSUS-2026") &&
  archiveSources.some((source) => source.id === "SRC-NYCARTC-SHARED-FOLDER-CENSUS-2026") &&
  populationTerms.every((term) => archiveReport.includes(term));
gate("archive_population_closure", archivePopulationClosed, archivePopulationClosed
  ? "The named snapshot accounts for all 2,192 descendants, including 257 nested folders and 1,935 files, with no unresolved traversal errors"
  : "Archive population closure, reconciliation counts, or canonical census records are incomplete");

const dispositionTerms = [
  "pending rights consent attribution or jamie review 1 413",
  "protected metadata only 484",
  "public source candidate requiring close reading 201",
  "unreadable or format specific review required 88",
  "metadata visible but item body unavailable 6",
  "the 201 source candidates are a review queue not 201 public sources",
  "content reviewed total 18",
  "rights reviewed total 0",
  "projection selected total 0"
];
const archiveDispositionGoverned = dispositionTerms.every((term) => archiveReport.includes(term));
gate("archive_disposition_governance", archiveDispositionGoverned, archiveDispositionGoverned
  ? "Every descendant has one protected disposition; close reading, source candidacy, rights review, and projection remain distinct"
  : "Archive dispositions or maturity distinctions are missing from the governed report");

const archivePublicFiles = [
  "apps/www/src/data/knowledge-bank/nycartc-shared-folder-archive-production.ts",
  "docs/knowledge-bank/research/nycartc-shared-folder-archival-production-2026-07.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition.md",
  "docs/knowledge-bank/sources/nycartc-shared-folder-census-2026.md",
  "docs/knowledge-bank/sources/nycartc-public-meeting-playbook-2018.md",
  "docs/knowledge-bank/sources/nycartc-nightlife-recommendation-sequence-2017-2019.md",
  "docs/knowledge-bank/sources/nycartc-march-data-design-notes-2019.md",
  "docs/knowledge-bank/claims/nycartc-public-meeting-operating-system.md",
  "docs/knowledge-bank/claims/nycartc-nightlife-recommendation-continuity.md",
  "docs/knowledge-bank/claims/nycartc-march-data-design-lead.md"
];
const archivePublicCorpus = archivePublicFiles
  .filter((file) => existsSync(path.join(repoRoot, file)))
  .map((file) => readFileSync(path.join(repoRoot, file), "utf8"))
  .join("\n");
const forbiddenArchiveMarkers = [
  "drive.google.com/drive/folders/",
  "resourcekey=",
  "/Users/",
  "/private/tmp/",
  "private/nyc-artist-coalition-shared-folder/"
];
const leakedArchiveMarkers = forbiddenArchiveMarkers.filter((marker) => archivePublicCorpus.includes(marker));
const archiveSourcesBounded = archiveSources.length === archiveSourceIds.length && archiveSources.every((source) =>
  ["private", "protected"].includes(source.visibility) &&
  source.reviewStatus === "reviewed" &&
  source.doesNotEstablish.length > 0
);
const archivePublicSafe = leakedArchiveMarkers.length === 0 && archiveSourcesBounded;
gate("archive_public_safety", archivePublicSafe, archivePublicSafe
  ? "Public records expose only aggregate counts, opaque locators, bounded synopses, and no Drive coordinates or private paths"
  : `Archive public-safety failure: ${leakedArchiveMarkers.join(", ") || "source visibility or non-support fields are incomplete"}`);

const archiveCollectiveCredit = archiveClaims.length === archiveClaimIds.length && archiveClaims.every((claim) =>
  claim.boundaries.length > 0 && claim.antiClaims.length > 0
) && archiveClaims.find((claim) => claim.id === "CLM-NYCARTC-MARCH-DATA-DESIGN-LEAD")?.status === "inference";
gate("archive_collective_credit", archiveCollectiveCredit, archiveCollectiveCredit
  ? "Every archive claim carries boundaries and anti-claims; the unresolved MARCH data-design attribution remains an inference"
  : "Archive claims are missing collective-credit boundaries, anti-claims, or attribution restraint");

const capabilityPath = path.join(repoRoot, "docs/knowledge-bank/capabilities/technical-operations.md");
const capabilityText = normalizedText(readFileSync(capabilityPath, "utf8"));
const applicationTerms = [
  "timed public meeting workflows",
  "participant testimony support",
  "cross channel campaigns",
  "agency facing requirements",
  "without retroactively assigning him a formal title"
];
const archiveApplicationValue = applicationTerms.every((term) => capabilityText.includes(term)) &&
  ["technical and product operations", "public interest implementation", "participation systems", "knowledge and handoff"].every((term) => archiveReport.includes(term));
gate("archive_application_value", archiveApplicationValue, archiveApplicationValue
  ? "The Wiki exposes bounded Technical Operations, implementation, participation, and handoff evidence without changing Jamie's formal titles"
  : "Archive evidence is not yet legible through the application capability path");

const archiveProjectionRestrained = archiveClaims.every((claim) =>
  claim.publicationStatus === "internal-only" ||
  claim.projections.length === 0 ||
  claim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
) && archiveReport.includes("no protected only claim is promoted to the site in this cycle");
gate("archive_projection_restraint", archiveProjectionRestrained, archiveProjectionRestrained
  ? "Protected close reading matured internal knowledge while all new public projections remain held or absent"
  : "A protected archive claim has escaped its editorial or surface boundary");

const photo = wiki.records.find((record) => record.id === "asset.photo.digital-district.001");
const noPublicWikiRoute = !existsSync(path.join(repoRoot, "apps/www/src/app/knowledge-wiki")) && !existsSync(path.join(repoRoot, "apps/www/src/app/knowledge-bank"));
const projectionSafe = photo?.allowedSurfaces.length === 0 && photo?.rightsState === "private-review" && noPublicWikiRoute;
gate("projection_restraint", projectionSafe, projectionSafe ? "Protected photo remains unprojected and no public Wiki route exists" : "Projection or route boundary failed");

const judgmentDir = path.join(repoRoot, "evals/knowledge-wiki/judgments");
const judgmentErrors = [];
for (const requiredId of suite.stopRule.requireIndependentJudgments) {
  const file = path.join(judgmentDir, `${requiredId}.json`);
  if (!existsSync(file)) {
    judgmentErrors.push(`missing ${requiredId}`);
    continue;
  }
  const judgment = JSON.parse(readFileSync(file, "utf8"));
  if (judgment.id !== requiredId) judgmentErrors.push(`${requiredId} has wrong ID`);
  if (judgment.candidateFingerprint !== candidate) judgmentErrors.push(`${requiredId} is bound to a stale candidate`);
  if (judgment.contractFingerprint !== contract) judgmentErrors.push(`${requiredId} is bound to a stale contract`);
  if (judgment.verdict !== "pass") judgmentErrors.push(`${requiredId} did not pass`);
  if (!Array.isArray(judgment.criteria) || judgment.criteria.some((criterion) => criterion.status !== "pass")) judgmentErrors.push(`${requiredId} has a failing criterion`);
}
gate("candidate_binding", judgmentErrors.length === 0, judgmentErrors.length ? judgmentErrors.join("; ") : `${suite.stopRule.requireIndependentJudgments.length} independent judgments match the exact candidate and contract`);

const missingGates = suite.hardGates.filter((id) => !gates.has(id));
if (missingGates.length) throw new Error(`Eval runner does not implement gates: ${missingGates.join(", ")}`);
const ordered = suite.hardGates.map((id) => gates.get(id));
const passed = ordered.every((item) => item.status === "pass");

console.log(`Knowledge Wiki eval: ${suite.profile}`);
console.log(`Result: ${passed ? "PASS" : "FAIL"}`);
for (const result of ordered) console.log(`- ${result.id}: ${result.status} - ${result.detail}`);
console.log(`Candidate: ${candidate}`);
console.log(`Contract: ${contract}`);
console.log("Diagnostics:");
console.log(`- records: ${wiki.health.diagnostics.records}`);
console.log(`- typed relations: ${wiki.health.diagnostics.typedRelations}`);
console.log(`- prose links: ${wiki.health.diagnostics.proseLinks}`);
console.log(`- rights backlog: ${wiki.health.diagnostics.rightsBacklog.length}`);
console.log("Manual authority gates:");
for (const [id, status] of Object.entries(wiki.health.manualAuthorityGates)) console.log(`- ${id}: ${status}`);
console.log(passed ? `Next action: repeat unchanged until ${suite.stopRule.consecutivePasses} consecutive passes agree, then stop for human review.` : "Next action: fix the highest-value failing gate without weakening the contract.");

if (!passed) process.exit(1);
