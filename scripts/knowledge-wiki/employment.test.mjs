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
  assert.equal(report.opportunities.length, 7);
  assert.ok(!JSON.stringify(report).includes("wikiRecords"));
  const protectedOpportunity = report.opportunities.find((item) => item.id.includes("protected.source-backed-memory"));
  assert.equal(protectedOpportunity.live, false);
  assert.equal(protectedOpportunity.decision, "not-live");
  assert.doesNotMatch(
    JSON.stringify(protectedOpportunity),
    /(?:message|email|transcript)_(?:body|excerpt)|(?:collaborator|company)_identity|private_path/i
  );
});

test("the open Studio3 postdoc remains discoverable but fails closed on its architecture degrees", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);
  const studio3 = report.opportunities.find(
    (item) => item.id === "opportunity.uibk.studio3.postdoc.arch-15927"
  );

  assert.ok(studio3, "The researched opportunity must remain in the knowledge graph.");
  assert.equal(studio3.live, true);
  assert.equal(studio3.hardScreenBlocked, true);
  assert.equal(studio3.decision, "hard-screen-exclusion");
});

test("named reader profiles retain simulation disclaimers", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);
  const named = report.readers.filter((reader) => reader.id !== "reader.generic-recruiter");
  assert.ok(named.length >= 5);
  assert.ok(named.every((reader) => /Simulated/.test(reader.disclaimer)));
  assert.ok(named.every((reader) => reader.prohibitedAssumptions.length >= 2));
});

test("priority opportunities preserve public leadership confidence boundaries", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);
  const byId = new Map(report.opportunities.map((item) => [item.id, item]));
  assert.equal(
    byId.get("opportunity.codepath.engineering-project-manager.5160542007")
      ?.publicReportingContext?.identification,
    "role-identity-matched"
  );
  assert.equal(
    byId.get("opportunity.aclu.senior-project-manager.8620968002")
      ?.publicReportingContext?.identification,
    "role-only"
  );
  assert.equal(
    byId.get("opportunity.aclu.senior-project-manager.8620968002")
      ?.publicReportingContext?.person,
    undefined
  );
  assert.equal(
    byId.get("opportunity.benepass.product-operations.7f963a7a")
      ?.publicReportingContext?.identification,
    "named-in-posting"
  );
  assert.equal(
    byId.get("opportunity.nyc-oti.senior-product-manager.782366")
      ?.publicReportingContext?.identification,
    "nearest-public-operational-lead"
  );
  assert.equal(
    byId.get("opportunity.nyc-oti.technical-operations-manager.782369")
      ?.publicReportingContext?.identification,
    "role-only"
  );
  assert.equal(
    byId.get("opportunity.nyc-oti.technical-operations-manager.782369")
      ?.publicReportingContext?.person,
    undefined
  );
  assert.equal(
    byId.get("opportunity.nyc-oti.technical-operations-manager.782369")
      ?.publicVisionContext?.identification,
    "official-agency-leader"
  );
  assert.ok(
    [...byId.values()]
      .filter((item) => !item.id.includes("protected.source-backed-memory"))
      .every((item) => item.publicVisionContext?.person && item.publicVisionContext?.boundary)
  );
});

test("removing a declared public proof lowers observed requirement coverage", () => {
  const root = candidateFixture();
  const before = evaluatePublicHiring(root).report;
  const routePath = path.join(root, "apps/www/src/app/work/technical-operations/page.tsx");
  const proofPath = path.join(root, "apps/www/src/data/proofs.ts");
  writeFileSync(
    routePath,
    readFileSync(routePath, "utf8").replaceAll("Coordinate delivery across concurrent projects", "")
  );
  writeFileSync(
    proofPath,
    readFileSync(proofPath, "utf8").replaceAll(
      "move public-facing technical work from ambiguity to launch",
      ""
    )
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

test("closed priority opportunities cannot be ready for human review", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/oti-senior-product-manager-782366.md");
  writeFileSync(
    opportunityPath,
    readFileSync(opportunityPath, "utf8").replace("opportunity_status: live", "opportunity_status: closed")
  );
  const oti = evaluatePublicHiring(root).report.opportunities.find((item) => item.id.includes("nyc-oti"));
  assert.equal(oti.live, false);
  assert.equal(oti.decision, "not-live");
});

test("expired OTI operations role remains a benchmark even after a live-status mutation", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/oti-technical-operations.md");
  const before = evaluatePublicHiring(root).report.opportunities.find(
    (item) => item.id === "opportunity.nyc-oti.technical-operations-manager.782369"
  );
  assert.equal(before.benchmark, true);
  assert.equal(before.live, false);
  assert.equal(before.decision, "historical-benchmark");
  writeFileSync(
    opportunityPath,
    readFileSync(opportunityPath, "utf8").replace(
      "opportunity_status: historical-benchmark",
      "opportunity_status: live"
    )
  );
  const after = evaluatePublicHiring(root).report.opportunities.find(
    (item) => item.id === "opportunity.nyc-oti.technical-operations-manager.782369"
  );
  assert.equal(after.benchmark, true);
  assert.equal(after.live, false);
  assert.equal(after.decision, "historical-benchmark");
});

test("protected metadata opportunity cannot become a live job by status mutation", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/source-backed-team-memory.md");
  writeFileSync(
    opportunityPath,
    readFileSync(opportunityPath, "utf8").replace("opportunity_status: conditional", "opportunity_status: live")
  );
  const opportunity = evaluatePublicHiring(root).report.opportunities.find((item) =>
    item.id.includes("protected.source-backed-memory")
  );
  assert.equal(opportunity.live, false);
  assert.equal(opportunity.decision, "not-live");
});

test("protected opportunity cannot become live by mutating both source type and status", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/source-backed-team-memory.md");
  writeFileSync(
    opportunityPath,
    readFileSync(opportunityPath, "utf8")
      .replace("source_type: protected-metadata", "source_type: official-employer")
      .replace("opportunity_status: conditional", "opportunity_status: live")
  );
  const opportunity = evaluatePublicHiring(root).report.opportunities.find((item) =>
    item.id.includes("protected.source-backed-memory")
  );
  assert.equal(opportunity.live, false);
  assert.equal(opportunity.decision, "not-live");
});

test("exclusionary hard screens fail closed", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/oti-senior-product-manager-782366.md");
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
