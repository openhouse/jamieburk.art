#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  fingerprintFiles,
  validLifecycleJudgments,
  validateKnowledgeLifecycle
} from "./lib/knowledge-lifecycle.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const suite = JSON.parse(readFileSync(path.join(repoRoot, "evals/knowledge-lifecycle/suite.json"), "utf8"));
const baseline = JSON.parse(readFileSync(path.join(repoRoot, suite.baseline.record), "utf8"));
const noReport = process.argv.includes("--no-report");
const jsonOnly = process.argv.includes("--json");

const candidatePaths = [
  "apps/www/src/content/work/kc-town-hall.mdx",
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/data/knowledge-bank/kc-town-hall-council-action.ts",
  "apps/www/src/data/knowledge-bank/google-drive-archive-production.ts",
  "apps/www/src/data/knowledge-bank/icloud-archive-production.ts",
  "apps/www/src/data/knowledge-bank/social-archive-production.ts",
  "apps/www/src/data/knowledge-bank/facebook-events-archive-production.ts",
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "apps/www/src/data/knowledge-bank/lifecycle-records.ts",
  "apps/www/src/data/knowledge-bank/press-catalog.ts",
  "apps/www/src/data/knowledge-bank/records.ts",
  "apps/www/src/data/knowledge-bank/schema.ts",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/work.ts",
  "docs/knowledge-bank/README.md",
  "docs/knowledge-bank/anti-claims.md",
  "docs/knowledge-bank/approval-register.md",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/lifecycle.md",
  "docs/knowledge-bank/proofs.md",
  "docs/knowledge-bank/research/kc-town-hall-council-funding-2019-2024.md",
  "docs/knowledge-bank/research/google-drive-shared-drives-archival-production-2026-07.md",
  "docs/knowledge-bank/research/icloud-teams-archival-production-2026-07.md",
  "docs/knowledge-bank/research/social-media-archival-production-2026-07.md",
  "docs/knowledge-bank/research/nycartc-facebook-events-archival-production-2026-07.md",
  "docs/knowledge-bank/sources.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition.md",
  "docs/knowledge-bank/projects/open-house.md",
  "docs/knowledge-bank/projects/water-publics.md"
];
const contractPaths = [
  "evals/knowledge-lifecycle/model-judge.md",
  "evals/knowledge-lifecycle/suite.json",
  "scripts/lib/knowledge-lifecycle.mjs",
  "scripts/run-knowledge-lifecycle-evals.mjs",
  "scripts/tests/knowledge-lifecycle.test.mjs"
];

function fingerprintAtCommit(commit, files) {
  const hash = createHash("sha256");
  for (const file of [...files].sort()) {
    let content;
    try {
      content = execFileSync("git", ["show", `${commit}:${file}`], {
        cwd: repoRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      });
    } catch {
      content = "<missing>";
    }
    hash.update(`${file}\0${content}\0`);
  }
  return `sha256:${hash.digest("hex")}`;
}

const repoUrl = new URL("../", import.meta.url);
const candidate = fingerprintFiles(repoUrl, candidatePaths);
const contract = fingerprintFiles(repoUrl, contractPaths);
const baselineFingerprint = fingerprintAtCommit(suite.baseline.commit, candidatePaths);
const validation = validateKnowledgeLifecycle(knowledgeBank, suite);
const judgmentDir = path.join(repoRoot, "evals/knowledge-lifecycle/judgments");
const judgments = existsSync(judgmentDir)
  ? readdirSync(judgmentDir)
      .filter((file) => file.endsWith(".json"))
      .map((file) => JSON.parse(readFileSync(path.join(judgmentDir, file), "utf8")))
  : [];
const validJudgments = validLifecycleJudgments({ judgments, candidate, contract, suite });
const uniqueJudges = new Set(validJudgments.map((item) => item.judgeId));
const uniqueLenses = new Set(validJudgments.map((item) => item.lens));
const baselineMatches = baseline.fingerprint === baselineFingerprint;
const baselineImproves =
  baselineMatches &&
  validation.score > baseline.score &&
  suite.rubrics.every((rubric) => validation.scores[rubric.id] >= baseline.scores[rubric.id]);
const categories = new Set(validation.findings.map((item) => item.category));
const hardGates = {
  repository_integrity: { status: baselineMatches ? "pass" : "fail", evidence: `Baseline ${baselineFingerprint}` },
  baseline_improvement: { status: baselineImproves ? "pass" : "fail", evidence: `${baseline.score} -> ${validation.score}` },
  intake_coverage: { status: categories.has("capture_integrity") ? "fail" : "pass", evidence: `${knowledgeBank.intakeItems.length} intake records` },
  referential_integrity: { status: categories.has("referential_integrity") ? "fail" : "pass", evidence: "All lifecycle references resolve" },
  lifecycle_completion: {
    status: ["source_decomposition", "claim_atomicity", "provenance_closure", "status_separation", "project_context", "research_honesty"].some((id) => categories.has(id)) ? "fail" : "pass",
    evidence: `${validation.findings.length} deterministic finding(s)`
  },
  projection_boundary: { status: categories.has("projection_restraint") ? "fail" : "pass", evidence: "Public projections respect maturity and safety" },
  model_judgment: {
    status: uniqueJudges.size >= suite.profile.requiredJudgments && uniqueLenses.size >= suite.profile.requiredJudgments ? "pass" : "fail",
    evidence: `${validJudgments.length} valid judgments from ${uniqueJudges.size} judges and ${uniqueLenses.size} lenses`
  }
};
const failedHardGates = suite.profile.requiredHardGates.filter((id) => hardGates[id]?.status !== "pass");
const failedRubrics = suite.rubrics
  .filter((rubric) => validation.scores[rubric.id] < suite.profile.minimumRubricScore)
  .map((rubric) => rubric.id);
const passed = validation.score >= suite.profile.threshold && !failedHardGates.length && !failedRubrics.length;
const result = {
  profile: suite.profile.id,
  candidate,
  contract,
  baselineFingerprint,
  score: validation.score,
  threshold: suite.profile.threshold,
  passed,
  scores: validation.scores,
  hardGates,
  failedHardGates,
  failedRubrics,
  findings: validation.findings,
  nextAction: passed
    ? "Stop this lifecycle cycle and preserve the unused mature claims for future composition."
    : validation.findings[0]?.message ?? "Obtain candidate-bound independent judgments."
};

if (!noReport) {
  const reportDir = path.join(repoRoot, "reports/generated");
  mkdirSync(reportDir, { recursive: true });
  writeFileSync(path.join(reportDir, "knowledge-lifecycle.json"), `${JSON.stringify(result, null, 2)}\n`);
}

if (jsonOnly) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`Knowledge lifecycle eval: ${result.profile}`);
  console.log(`Score: ${result.score} / 100 (threshold ${result.threshold})`);
  console.log(`Result: ${result.passed ? "PASS" : "FAIL"}`);
  for (const [id, gate] of Object.entries(hardGates)) console.log(`- ${id}: ${gate.status}`);
  for (const finding of validation.findings.slice(0, 12)) console.log(`- ${finding.category}/${finding.code}: ${finding.message}`);
  if (validation.findings.length > 12) console.log(`- ... ${validation.findings.length - 12} more finding(s)`);
  console.log(`Candidate: ${candidate}`);
  console.log(`Contract: ${contract}`);
  console.log(`Next action: ${result.nextAction}`);
}

if (!passed) process.exit(1);
