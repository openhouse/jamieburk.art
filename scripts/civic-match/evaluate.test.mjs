import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  deriveExpectedAudience,
  evaluateCivicMatch,
  extractCopyBlock,
  wordCount
} from "./evaluate.mjs";

const repoRoot = path.resolve(import.meta.dirname, "../..");

function guideFixture(t, { answerId = "government-impact", words, omitLimit = false, malformedRun = false }) {
  const root = mkdtempSync(path.join(tmpdir(), "civic-match-word-limit-test-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const configPath = "evals/opportunity-intake/civic-match.json";
  const config = JSON.parse(readFileSync(path.join(repoRoot, configPath), "utf8"));
  const audience = deriveExpectedAudience(repoRoot, config);
  const write = (relativePath, contents) => {
    const destination = path.join(root, relativePath);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, contents);
  };
  for (const relativePath of [
    config.sourceRegistryPath, config.selectionConfigPath, config.hiringReaderConfigPath,
    config.resume.markdownPath,
    ...[...audience.hiringReaders, ...audience.helpers].map(
      ({ personId }) => `docs/knowledge-bank/people/${personId.replace(/^person\./u, "")}.md`
    )
  ]) write(relativePath, readFileSync(path.join(repoRoot, relativePath)));
  const guide = readFileSync(path.join(repoRoot, config.guidePath), "utf8");
  const replacement = Array.from({ length: words }, () => "word").join(" ");
  const candidate = guide.replace(extractCopyBlock(guide, answerId), replacement);
  config.guideSha256 = createHash("sha256").update(candidate).digest("hex");
  if (omitLimit && config.copyBlockLimits) delete config.copyBlockLimits[answerId];
  write(configPath, JSON.stringify(config));
  write(config.guidePath, candidate);
  write(config.currentRunPath, malformedRun ? "not valid JSON; readers must not be read" : readFileSync(path.join(repoRoot, config.currentRunPath)));
  return root;
}

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
    assert.ok(wordCount(answer) <= 150, `${id} has ${wordCount(answer)} words; the live form allows 150`);
  }
  assert.ok(wordCount(extractCopyBlock(guide, "profile-summary")) <= 250);
  assert.equal((guide.match(/\(150 words maximum\)/g) ?? []).length, 2);
  assert.doesNotMatch(guide, /300 words/);
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

for (const answerId of ["government-impact", "community-initiative"]) {
  test(`${answerId}: exactly 150 words pass deterministic validation`, (t) => {
    const root = guideFixture(t, { answerId, words: 150 });
    const result = evaluateCivicMatch(root, { deterministicOnly: true });
    assert.equal(result.pass, true, result.failures.join("\n"));
  });

  for (const words of [151, 240, 258]) {
    test(`${answerId}: ${words} words block reader evaluation`, (t) => {
      const root = guideFixture(t, { answerId, words, malformedRun: true });
      const result = evaluateCivicMatch(root);
      assert.equal(result.pass, false);
      assert.ok(result.failures.some((failure) => failure.includes(`${answerId} exceeds`) && failure.includes("150")), result.failures.join("\n"));
      assert.deepEqual(result.phases, { deterministic: "fail", readers: "blocked" });
    });
  }

  test(`${answerId}: an unknown field limit fails closed before readers`, (t) => {
    const root = guideFixture(t, { answerId, words: 140, omitLimit: true, malformedRun: true });
    const result = evaluateCivicMatch(root);
    assert.equal(result.pass, false);
    assert.ok(result.failures.some((failure) => failure.includes(`${answerId} is missing a valid word limit`)), result.failures.join("\n"));
    assert.equal(result.phases.readers, "blocked");
  });
}

test("profile summary retains its separate 250-word editorial ceiling", (t) => {
  const root = guideFixture(t, { answerId: "profile-summary", words: 250 });
  const result = evaluateCivicMatch(root, { deterministicOnly: true });
  assert.equal(result.pass, true, result.failures.join("\n"));
});

test("profile summary over its separate editorial ceiling blocks readers", (t) => {
  const root = guideFixture(t, { answerId: "profile-summary", words: 251, malformedRun: true });
  const result = evaluateCivicMatch(root);
  assert.equal(result.pass, false);
  assert.ok(result.failures.includes("profile-summary exceeds its 250-word limit."));
  assert.equal(result.phases.readers, "blocked");
});

test("an old reader receipt cannot pass a changed, valid-length guide", (t) => {
  const root = guideFixture(t, { words: 140 });
  const result = evaluateCivicMatch(root);
  assert.equal(result.pass, false);
  assert.ok(result.failures.includes("The named-reader run targets a different guide fingerprint."));
  assert.deepEqual(result.phases, { deterministic: "pass", readers: "fail" });
});

test("word counting handles pasted paragraph breaks and extra whitespace", () => {
  assert.equal(wordCount("  one\n\ntwo\tthree\u00a0four  "), 4);
  assert.equal(wordCount("   "), 0);
});
