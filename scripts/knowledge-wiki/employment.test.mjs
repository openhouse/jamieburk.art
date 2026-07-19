import assert from "node:assert/strict";
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  discoveryChecks,
  evaluatePublicHiring,
  loadHiringSuite,
  resolveHiringGaps
} from "./employment-lib.mjs";
import { compileWiki, defaultRepoRoot } from "./lib.mjs";

function candidateFixture() {
  const root = mkdtempSync(path.join(tmpdir(), "employment-eval-"));
  const suite = loadHiringSuite(defaultRepoRoot);
  const files = [
    "evals/knowledge-wiki/hiring-suites.json",
    ...suite.opportunityPaths,
    ...suite.readerPaths,
    ...Object.values(suite.routeFiles).flat()
  ];
  for (const relativePath of new Set(files)) {
    const target = path.join(root, relativePath);
    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(path.join(defaultRepoRoot, relativePath), target);
  }
  return root;
}

test("public hiring evaluator receives no protected Wiki or communications", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);
  assert.equal(report.publicSafety.privateMarkerCount, 0);
  assert.equal(report.publicSafety.protectedWikiReceived, false);
  assert.equal(report.publicSafety.rawCommunicationsReceived, false);
  assert.equal(report.opportunities.length, 6);
  assert.ok(!JSON.stringify(report).includes("wikiRecords"));
});

test("named reader profiles retain simulation disclaimers", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);
  const named = report.readers.filter((reader) => reader.id !== "reader.generic-recruiter");
  assert.ok(named.length >= 5);
  assert.ok(named.every((reader) => /Simulated/.test(reader.disclaimer)));
  assert.ok(named.every((reader) => reader.prohibitedAssumptions.length >= 2));
});

test("removing a declared public proof lowers observed requirement coverage", () => {
  const root = candidateFixture();
  const before = evaluatePublicHiring(root).report;
  const routePath = path.join(root, "apps/www/src/app/work/technical-operations/page.tsx");
  writeFileSync(
    routePath,
    readFileSync(routePath, "utf8").replaceAll("Coordinate delivery across concurrent projects", "")
  );
  const after = evaluatePublicHiring(root).report;
  const beforeOti = before.opportunities.find((item) => item.id.includes("nyc-oti"));
  const afterOti = after.opportunities.find((item) => item.id.includes("nyc-oti"));
  assert.ok(afterOti.criticalObserved < beforeOti.criticalObserved);
});

test("private path mutation is detected before hiring evaluation can pass", () => {
  const root = candidateFixture();
  const routePath = path.join(root, "apps/www/src/app/page.tsx");
  writeFileSync(routePath, `${readFileSync(routePath, "utf8")}\n/Users/example/private-source\n`);
  assert.equal(evaluatePublicHiring(root).report.publicSafety.privateMarkerCount, 1);
});

test("title-blind discovery retrieves expected roles and excludes hard screens", () => {
  const result = compileWiki();
  const discovery = discoveryChecks(result);
  assert.equal(discovery.passed, true);
  assert.ok(discovery.queries.every((item) => item.titleBlind && item.passed));
  assert.ok(discovery.negatives.every((item) => item.disposition === "exclude-hard-screen"));
});

test("gap resolver remains separate and cannot approve projection", () => {
  const result = compileWiki();
  const publicEvaluation = evaluatePublicHiring(defaultRepoRoot).report;
  const resolution = resolveHiringGaps(result, publicEvaluation).report;
  assert.equal(resolution.humanApprovalRequired, true);
  assert.ok(resolution.findings.every((finding) => finding.requiresHumanApproval));
  assert.ok(resolution.findings.some((finding) => finding.classification === "true-experience-gap"));
  assert.ok(resolution.findings.some((finding) => finding.classification === "visible-weak-evidence-gap"));
  assert.ok(!resolution.findings.some((finding) =>
    finding.currentStatus === "visible-weak" && finding.classification === "wiki-proven-not-projected"
  ));
});

test("closed opportunities cannot be ready for human review", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/oti-technical-operations.md");
  writeFileSync(
    opportunityPath,
    readFileSync(opportunityPath, "utf8").replace("opportunity_status: live", "opportunity_status: closed")
  );
  const oti = evaluatePublicHiring(root).report.opportunities.find((item) => item.id.includes("nyc-oti"));
  assert.equal(oti.live, false);
  assert.equal(oti.decision, "not-live");
});

test("exclusionary hard screens fail closed", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/oti-technical-operations.md");
  writeFileSync(
    opportunityPath,
    readFileSync(opportunityPath, "utf8").replace(
      "state: review-needed\n    disposition: verify",
      "state: not-met\n    disposition: do-not-pursue"
    )
  );
  const oti = evaluatePublicHiring(root).report.opportunities.find((item) => item.id.includes("nyc-oti"));
  assert.equal(oti.hardScreenBlocked, true);
  assert.equal(oti.decision, "hard-screen-exclusion");
});
