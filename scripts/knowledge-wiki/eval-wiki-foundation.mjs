#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import {
  REPO_ROOT,
  buildWikiGraph,
  loadWiki,
  readRetrievalTasks,
  validateWiki
} from "./lib.mjs";

const contractPath = resolve(REPO_ROOT, ".agents/evals/knowledge-wiki-foundation.json");
const contract = JSON.parse(readFileSync(contractPath, "utf8"));
const records = loadWiki();
const validation = validateWiki(records);
const graphA = buildWikiGraph(records);
const graphB = buildWikiGraph(records);
const byId = new Map(records.map((record) => [record.data.id, record]));
const packageJson = JSON.parse(readFileSync(resolve(REPO_ROOT, "package.json"), "utf8"));
const rootReadme = readFileSync(resolve(REPO_ROOT, "README.md"), "utf8");
const wikiReadme = readFileSync(resolve(REPO_ROOT, "docs/knowledge-wiki/README.md"), "utf8");
const testSource = readFileSync(resolve(REPO_ROOT, "scripts/tests/knowledge-wiki.test.mjs"), "utf8");
const changed = execFileSync("git", ["status", "--porcelain"], {
  cwd: REPO_ROOT,
  encoding: "utf8"
})
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => line.slice(3));

const hasErrors = (...codes) =>
  validation.errors.some((entry) => codes.includes(entry.code));
const hasRecord = (id) => byId.has(id);
const authorityCount = records.reduce(
  (sum, record) => sum + (record.data.authority_refs?.length ?? 0),
  0
);
const requiredScripts = [
  "wiki:build",
  "wiki:check",
  "wiki:test",
  "wiki:report",
  "wiki:graph",
  "wiki:tasks",
  "wiki:query",
  "wiki:eval"
];

const checks = {
  "KW-001": {
    passed:
      rootReadme.includes("## Knowledge Wiki") &&
      wikiReadme.includes("former name") &&
      existsSync(resolve(REPO_ROOT, "docs/architecture/knowledge-wiki-inventory.md")) &&
      existsSync(resolve(REPO_ROOT, "docs/architecture/ADR-knowledge-wiki-name-and-model.md")),
    evidence: "Canonical name, compatibility alias, inventory, and authority ADR are present."
  },
  "KW-002": {
    passed:
      existsSync(resolve(REPO_ROOT, ".vscode/settings.json")) &&
      wikiReadme.includes("## Start Here") &&
      wikiReadme.includes("authoring.md") &&
      validation.metrics.proseLinks >= 50,
    evidence: `${validation.metrics.proseLinks} prose links and strict editor settings support VS Code-first navigation.`
  },
  "KW-003": {
    passed:
      !hasErrors(
        "duplicate-id",
        "alias-collision",
        "unknown-relation-target",
        "incompatible-relation",
        "invalid-relation-type",
        "canonical-path-drift"
      ) &&
      graphA.nodes.length === new Set(graphA.nodes.map((node) => node.id)).size &&
      testSource.includes("file move preserves stable identity"),
    evidence: `${graphA.nodes.length} stable nodes and ${graphA.edges.length} typed edges pass identity and move checks.`
  },
  "KW-004": {
    passed:
      authorityCount >= 10 &&
      !hasErrors("missing-authority", "unknown-authority-ref", "claim-source-closure") &&
      hasRecord("claim.callnyc.independent-follow-on") &&
      hasRecord("anti-claim.callnyc.official-council-product"),
    evidence: `${authorityCount} references resolve to existing claim, source, correction, citation, and proof authorities.`
  },
  "KW-005": {
    passed:
      JSON.stringify(graphA) === JSON.stringify(graphB) &&
      /^[a-f0-9]{64}$/.test(graphA.semanticFingerprint) &&
      existsSync(resolve(REPO_ROOT, "scripts/knowledge-wiki/build-wiki-graph.mjs")) &&
      existsSync(resolve(REPO_ROOT, "scripts/knowledge-wiki/report-wiki-health.mjs")),
    evidence: `Graph fingerprint ${graphA.semanticFingerprint.slice(0, 12)} reproduces exactly.`
  },
  "KW-006": {
    passed:
      !hasErrors("broken-file-link", "broken-fragment-link", "unreachable-record") &&
      validation.metrics.rootReachable === validation.metrics.discoverable &&
      validation.metrics.deadEnds.length === 0 &&
      validation.metrics.wantedPages.length === 1,
    evidence: `${validation.metrics.rootReachable}/${validation.metrics.discoverable} records are reachable with zero dead ends and one explicit wanted record.`
  },
  "KW-007": {
    passed:
      !hasErrors("private-marker", "unsafe-projection", "rights-projection", "absence-overclaim") &&
      validation.metrics.rightsBacklog.includes("asset.photo.callnyc.digital-district.001") &&
      byId.get("asset.photo.callnyc.digital-district.001")?.data.projection_status === "protected" &&
      testSource.includes("non-recovery used as positive evidence"),
    evidence: "Private-path, pending-rights, and non-recovery mutations fail while the real media hold remains visible."
  },
  "KW-008": {
    passed:
      hasRecord("correction.callnyc.chronology.2026") &&
      hasRecord("projection.portfolio.callnyc") &&
      hasRecord("anti-claim.callnyc.official-council-product") &&
      !byId.get("projection.portfolio.callnyc")?.content.includes("2014-2015"),
    evidence: "Correction, anti-claim, and selective projection are linked without restoring superseded chronology."
  },
  "KW-009": {
    passed:
      requiredScripts.every((name) => packageJson.scripts[name]) &&
      readRetrievalTasks(records).length >= 9 &&
      testSource.match(/mutation rejects/g)?.length >= 10,
    evidence: `${requiredScripts.length} bounded commands, ${readRetrievalTasks(records).length} task prompts, and mutation coverage are present.`
  },
  "KW-010": {
    passed:
      changed.every((path) => !path.startsWith("apps/www/")) &&
      !existsSync(resolve(REPO_ROOT, "apps/www/src/app/knowledge-wiki")) &&
      !existsSync(resolve(REPO_ROOT, "docs/knowledge-wiki/explorer")),
    evidence: "No public route, Explorer, CMS, database, or application-surface file changed."
  }
};

const ids = contract.criteria.map((criterion) => criterion.id);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
const weightTotal = contract.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
if (duplicateIds.length || weightTotal !== contract.score_maximum) {
  console.error("Knowledge Wiki eval contract is invalid.");
  process.exit(2);
}

const results = contract.criteria.map((criterion) => ({
  id: criterion.id,
  title: criterion.title,
  weight: criterion.weight,
  passed: checks[criterion.id]?.passed === true,
  score: checks[criterion.id]?.passed === true ? criterion.weight : 0,
  evidence: checks[criterion.id]?.evidence ?? "No deterministic check is defined."
}));
const score = results.reduce((sum, result) => sum + result.score, 0);
const passed =
  score >= contract.score_threshold &&
  results.filter((result) => contract.criteria.find((item) => item.id === result.id)?.blocking).every((result) => result.passed);

for (const result of results) {
  console.log(`${result.passed ? "PASS" : "FAIL"} ${result.id} ${result.title} (${result.score}/${result.weight})`);
  console.log(`  ${result.evidence}`);
}
console.log(`Knowledge Wiki foundation eval: ${score}/${contract.score_maximum} (criterion: ${contract.score_threshold}).`);
console.log("Human evaluations remain not-requested and are not included in this score.");

if (!passed) process.exit(1);
