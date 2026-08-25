import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

import { evaluateSitewidePageOwners } from "./sitewide-page-owner-eval.mjs";

test("every canonical public page has an explicit page-owner assignment", () => {
  const run = spawnSync(
    process.execPath,
    ["scripts/page-owners/sitewide-page-owner-eval.mjs"],
    { cwd: process.cwd(), encoding: "utf8" }
  );

  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.match(run.stdout, /Site-wide page-owner governance preflight passed/);
  assert.match(run.stdout, /15\/15 canonical pages assigned/);
});

test("a public page cannot present a modeled owner as a real approver", () => {
  const registry = JSON.parse(readFileSync("evals/page-owners/sitewide.json", "utf8"));
  const result = evaluateSitewidePageOwners({
    registry,
    publicSurfaceText: "Cyd Harrell approved this page."
  });

  assert.ok(result.failures.includes("public_surface_avoids_false_endorsement"));
});

test("strict acceptance fails while any assigned page is still queued", () => {
  const run = spawnSync(
    process.execPath,
    ["scripts/page-owners/sitewide-page-owner-eval.mjs", "--require-all-accepted"],
    { cwd: process.cwd(), encoding: "utf8" }
  );

  assert.equal(run.status, 1);
  assert.match(run.stderr, /3\/15 pages accepted; 12 queued/);
});

test("a new canonical route fails until it receives a masthead", () => {
  const registry = JSON.parse(readFileSync("evals/page-owners/sitewide.json", "utf8"));
  const sitemapSource = readFileSync(registry.canonicalRouteSources.staticRoutesPath, "utf8")
    .replace('    "/work",', '    "/work",\n    "/new-public-page",');
  const result = evaluateSitewidePageOwners({ registry, sitemapSource });

  assert.ok(result.failures.includes("canonical_page_inventory_coverage"));
});

test("a page with fewer than three distinct owners cannot enter the review queue", () => {
  const registry = JSON.parse(readFileSync("evals/page-owners/sitewide.json", "utf8"));
  registry.pages.find((page) => page.route === "/contact").ownerIds = [
    "cyd-harrell-public-service-usefulness",
    "cyd-harrell-public-service-usefulness"
  ];
  const result = evaluateSitewidePageOwners({ registry });

  assert.ok(result.failures.includes("minimum_distinct_owners:/contact"));
});

test("an advisory pass without an inspectable unanimous run is rejected", () => {
  const registry = JSON.parse(readFileSync("evals/page-owners/sitewide.json", "utf8"));
  registry.pages.find((page) => page.route === "/contact").review = {
    status: "advisory-pass"
  };
  const result = evaluateSitewidePageOwners({ registry });

  assert.ok(result.failures.includes("modeled_acceptance_not_inspectable:/contact"));
});

test("the governance hill-climb receipt must match the exact evaluator artifacts", () => {
  const registry = JSON.parse(readFileSync("evals/page-owners/sitewide.json", "utf8"));
  const developmentRun = JSON.parse(readFileSync(registry.latestDevelopmentRunPath, "utf8"));
  developmentRun.candidateArtifacts.registrySha256 = "0".repeat(64);
  const result = evaluateSitewidePageOwners({ registry, developmentRun });

  assert.ok(result.failures.includes("latest_governance_run_matches_artifacts"));
});
