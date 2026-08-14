import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluateProjectWebsites } from "./project-websites-eval.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(readFileSync(path.join(root, "evals/knowledge-wiki/project-websites.json"), "utf8"));

function cloneConfig() {
  return structuredClone(config);
}

function text(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

test("the current project-website inventory passes", () => {
  assert.equal(evaluateProjectWebsites().passed, true);
});

test("the expected site cannot disappear from the governed count", () => {
  const candidate = cloneConfig();
  candidate.sites.pop();
  const result = evaluateProjectWebsites({ config: candidate });
  assert.equal(result.checks.find((check) => check.id === "exact-governed-count").pass, false);
});

test("a stale live check cannot remain current", () => {
  const candidate = cloneConfig();
  candidate.verifiedAt = "2026-06-01";
  const result = evaluateProjectWebsites({ config: candidate });
  assert.equal(result.checks.find((check) => check.id === "freshness-window").pass, false);
});

test("a non-200 site cannot count as responding", () => {
  const candidate = cloneConfig();
  candidate.sites[0].httpStatus = 503;
  const result = evaluateProjectWebsites({ config: candidate });
  assert.equal(result.checks.find((check) => check.id === "http-and-content-evidence").pass, false);
});

test("a site cannot count without its governed project record", () => {
  const site = config.sites[0];
  const result = evaluateProjectWebsites({ fileOverrides: { [site.projectRecordPath]: "" } });
  assert.equal(result.checks.find((check) => check.id === "project-record-binding").pass, false);
});

test("a represented project name cannot lose its portfolio link", () => {
  const original = text("apps/www/src/data/work.ts");
  const result = evaluateProjectWebsites({
    fileOverrides: { "apps/www/src/data/work.ts": original.replace("https://wowlist.org/", "") }
  });
  assert.equal(result.checks.find((check) => check.id === "portfolio-direct-links").pass, false);
});

test("a resume project mention cannot lose its direct evidence link", () => {
  const resumePath = config.resumeRegistryPath;
  const registry = JSON.parse(text(resumePath));
  const candidatePath = registry.versions[0].resumePath;
  const original = text(candidatePath);
  const result = evaluateProjectWebsites({
    fileOverrides: { [candidatePath]: original.replace("](https://wowlist.org/)", "]") }
  });
  assert.equal(result.checks.find((check) => check.id === "resume-project-links").pass, false);
});

test("responding cannot be silently promoted to current service", () => {
  const original = text(config.inventoryPath);
  const result = evaluateProjectWebsites({
    fileOverrides: {
      [config.inventoryPath]: original.replace(
        /“Responding” never means\s+“current service\.”/,
        "Responding means current service."
      )
    }
  });
  assert.equal(
    result.checks.find((check) => check.id === "current-service-and-credit-boundary").pass,
    false
  );
});

test("a rendered close reading cannot silently fall back to HTTP-only evidence", () => {
  const site = config.sites.find((candidate) => candidate.projectId === "project.wowlist");
  const original = text(site.closeReadSourcePath);
  const result = evaluateProjectWebsites({
    fileOverrides: {
      [site.closeReadSourcePath]: original.replace("## Rendered browser observation", "## HTML observation")
    }
  });
  assert.equal(
    result.checks.find((check) => check.id === "rendered-observation-coverage").pass,
    false
  );
});

test("CallNYC must preserve both the first archive notice and remaining action risk", () => {
  const site = config.sites.find((candidate) => candidate.projectId === "project.callnyc");
  const original = text(site.closeReadSourcePath);
  const result = evaluateProjectWebsites({
    fileOverrides: {
      [site.closeReadSourcePath]: original.replace("operative\n`tel:` links", "disabled telephone links")
    }
  });
  assert.equal(
    result.checks.find((check) => check.id === "callnyc-archive-boundary-corrected").pass,
    false
  );
});
