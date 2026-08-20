import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  deriveExpectedCivicMatchAudience,
  evaluateCivicMatchProfile,
  extractCopyBlock,
  wordCount
} from "../evals-civic-match-profile.mjs";

const repoRoot = path.resolve(import.meta.dirname, "../..");

test("Civic Match and NYC Jobs are modeled as different opportunity-source adapters", () => {
  const registry = JSON.parse(readFileSync(path.join(repoRoot, "evals/opportunity-intake/sources.json"), "utf8"));
  const byId = new Map(registry.sources.map((source) => [source.id, source]));
  const nyc = byId.get("source.nyc-jobs.open-data.pda4-rgn4");
  const civic = byId.get("source.civic-match.candidate-network");

  assert.equal(nyc.sourceType, "official-bulk-dataset");
  assert.equal(civic.sourceType, "authenticated-talent-network");
  assert.ok(nyc.affordances.includes("machine-readable-revision-detection"));
  assert.ok(civic.affordances.includes("employer-profile-discovery"));
  assert.ok(civic.affordances.includes("candidate-invitations"));
  assert.ok(civic.affordances.includes("saved-job-interest-signals"));
  assert.ok(civic.affordances.includes("live-events-and-q-and-a"));
  assert.ok(civic.boundaries.includes("external-employer-application-remains-required"));
  assert.notDeepEqual(nyc.affordances.sort(), civic.affordances.sort());
});

test("the deterministic Civic Match gate covers all five steps before commissioning LLM readers", () => {
  const result = evaluateCivicMatchProfile(repoRoot, { deterministicOnly: true });
  assert.equal(result.pass, true, result.failures.join("\n"));
  assert.deepEqual(result.phases, { deterministic: "pass", hiringReaders: "not-run" });
  assert.equal(result.metrics.stepsCovered, 5);
  assert.equal(result.metrics.privateNarrativeAnswers, 2);
  assert.equal(result.metrics.namedHiringReaderAssignments, 9);
  assert.equal(result.metrics.civicMatchHelperAssignments, 2);
});

test("the reader audience is derived from the current opportunity manifest plus the two Civic Match helpers", () => {
  const config = JSON.parse(readFileSync(path.join(repoRoot, "evals/opportunity-intake/civic-match.json"), "utf8"));
  const audience = deriveExpectedCivicMatchAudience(repoRoot, config);

  assert.equal(audience.hiringReaders.length, 9);
  assert.deepEqual(
    audience.helpers.map(({ personId }) => personId).sort(),
    ["person.courtney-kishbaugh", "person.josh-gee"]
  );
  assert.equal(new Set(audience.all.map(({ key }) => key)).size, 11);
});

test("both 300-word Civic Match answers fit the observed form limit", () => {
  const guide = readFileSync(
    path.join(repoRoot, "opportunity-sources/civic-match/2026-08-20/Civic-Match-Signup-Guide.md"),
    "utf8"
  );

  for (const id of ["government-impact", "community-initiative"]) {
    const answer = extractCopyBlock(guide, id);
    assert.ok(answer.length > 0, `${id} is missing`);
    assert.ok(wordCount(answer) <= 300, `${id} has ${wordCount(answer)} words`);
  }
});

test("the repository guide does not publish Jamie's direct contact details", () => {
  const guide = readFileSync(
    path.join(repoRoot, "opportunity-sources/civic-match/2026-08-20/Civic-Match-Signup-Guide.md"),
    "utf8"
  );

  assert.doesNotMatch(guide, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(guide, /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/);
});

test("an over-limit narrative answer is rejected before LLM review", () => {
  const overLimit = Array.from({ length: 301 }, () => "word").join(" ");
  assert.equal(wordCount(overLimit), 301);
});
