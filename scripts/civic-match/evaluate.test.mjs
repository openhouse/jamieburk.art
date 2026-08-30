import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  deriveExpectedAudience,
  evaluateCivicMatch,
  extractCopyBlock,
  wordCount
} from "./evaluate.mjs";

const repoRoot = path.resolve(import.meta.dirname, "../..");

test("Civic Match and NYC Jobs retain distinct source affordances", () => {
  const registry = JSON.parse(readFileSync(path.join(repoRoot, "evals/opportunity-intake/sources.json"), "utf8"));
  const byId = new Map(registry.sources.map((source) => [source.id, source]));
  const nyc = byId.get("source.nyc-open-data.jobs.pda4-rgn4");
  const civic = byId.get("source.civic-match.candidate-network");

  assert.equal(nyc.sourceType, "official-bulk-dataset");
  assert.equal(civic.sourceType, "authenticated-talent-network");
  assert.ok(nyc.affordances.includes("machine-readable-revision-detection"));
  assert.ok(civic.affordances.includes("candidate-profile-discovery"));
  assert.ok(civic.affordances.includes("candidate-invitations"));
  assert.ok(civic.affordances.includes("staff-assisted-matching"));
  assert.ok(civic.boundaries.includes("external-employer-application-remains-required"));
  assert.notDeepEqual(nyc.affordances, civic.affordances);
});

test("deterministic gates pass before any fictionalized reader call", () => {
  const result = evaluateCivicMatch(repoRoot, { deterministicOnly: true });
  assert.equal(result.pass, true, result.failures.join("\n"));
  assert.deepEqual(result.phases, { deterministic: "pass", readers: "not-run" });
  assert.equal(result.metrics.stepsCovered, 5);
  assert.ok(result.metrics.fieldsMapped >= 36);
  assert.equal(result.metrics.hiringReaders, 2);
  assert.equal(result.metrics.civicMatchHelpers, 2);
});

test("reader audience follows the lifecycle-selected application and two Civic Match helpers", () => {
  const config = JSON.parse(readFileSync(path.join(repoRoot, "evals/opportunity-intake/civic-match.json"), "utf8"));
  const audience = deriveExpectedAudience(repoRoot, config);

  assert.deepEqual(
    audience.hiringReaders.map(({ pairId }) => pairId).sort(),
    ["oti-product-lisa-gelobter", "oti-product-luke-farrell"]
  );
  assert.deepEqual(
    audience.helpers.map(({ personId }) => personId).sort(),
    ["person.courtney-kishbaugh", "person.josh-gee"]
  );
});

test("copy-ready narrative answers stay within observed limits", () => {
  const guide = readFileSync(
    path.join(repoRoot, "opportunity-sources/civic-match/2026-08-20/Civic-Match-Signup-Guide.md"),
    "utf8"
  );
  for (const id of ["government-impact", "community-initiative"]) {
    const answer = extractCopyBlock(guide, id);
    assert.ok(answer.length > 0, `${id} is missing`);
    assert.ok(wordCount(answer) <= 300, `${id} has ${wordCount(answer)} words`);
  }
  assert.ok(wordCount(extractCopyBlock(guide, "profile-summary")) <= 250);
});

test("guide excludes contact details, discouraged public wording, and final-submit automation", () => {
  const guide = readFileSync(
    path.join(repoRoot, "opportunity-sources/civic-match/2026-08-20/Civic-Match-Signup-Guide.md"),
    "utf8"
  );
  assert.doesNotMatch(guide, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(guide, /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/);
  assert.doesNotMatch(guide, /\b(?:bound|bounded|hinge)\b/i);
  assert.match(guide, /Jamie alone clicks `Submit`/);
});

test("over-limit answers fail locally without consuming a reader call", () => {
  assert.equal(wordCount(Array.from({ length: 301 }, () => "word").join(" ")), 301);
});
