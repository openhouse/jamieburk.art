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
