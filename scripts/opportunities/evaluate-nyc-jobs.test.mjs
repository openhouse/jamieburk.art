import assert from "node:assert/strict";
import { mkdtempSync, cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { evaluateOpportunitySystem } from "./evaluate-nyc-jobs.mjs";

const repoRoot = path.resolve(import.meta.dirname, "../..");

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "nyc-jobs-eval-"));
  for (const relative of [
    "config/opportunities/nyc-jobs.json",
    "evals/opportunities/nyc-jobs.json",
    "reports/opportunities/nyc-jobs-qualified.json",
    "reports/opportunities/nyc-jobs-digest.md",
    "docs/knowledge-bank/sources/nyc-jobs-open-data.md",
    "docs/knowledge-bank/evaluations/nyc-jobs-opportunity-feed.md",
    "rfcs/0007-nyc-jobs-opportunity-action-loop.md",
    ".env.example"
  ]) {
    const target = path.join(root, relative);
    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(path.join(repoRoot, relative), target);
  }
  const report = JSON.parse(
    readFileSync(path.join(root, "reports/opportunities/nyc-jobs-qualified.json"), "utf8")
  );
  for (const opportunity of report.admitted) {
    const relative = `docs/knowledge-bank/opportunities/nyc-jobs-${opportunity.jobId}.md`;
    const target = path.join(root, relative);
    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(path.join(repoRoot, relative), target);
  }
  return root;
}

test("the committed NYC Jobs opportunity loop clears every deterministic gate", () => {
  const result = evaluateOpportunitySystem({ root: repoRoot });

  assert.equal(result.overall, "pass");
  assert.ok(result.checks.every((check) => check.pass));
  assert.ok(result.admittedCount > 0);
  assert.ok(result.actionableCount >= result.admittedCount);
});

test("a below-threshold admitted record fails the strong-match gate", () => {
  const root = fixture();
  const reportPath = path.join(root, "reports/opportunities/nyc-jobs-qualified.json");
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  report.admitted[0].combinedScore = report.threshold.combined - 0.1;
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  const result = evaluateOpportunitySystem({ root });

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "strong-admission-threshold").pass, false);
});

test("a literal digest recipient in public configuration fails the credential boundary", () => {
  const root = fixture();
  const configPath = path.join(root, "config/opportunities/nyc-jobs.json");
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  config.delivery.recipient = "person@example.org";
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);

  const result = evaluateOpportunitySystem({ root });

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "email-secret-boundary").pass, false);
});
