import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validateNamedReaderAcceptance } from "./named-reader-acceptance-lib.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/knowledge-wiki/named-reader-acceptance.json"), "utf8")
);
const run = JSON.parse(readFileSync(path.join(repoRoot, config.currentRunPath), "utf8"));

test("historical named-reader receipt is coherent and honestly failing", () => {
  const result = validateNamedReaderAcceptance(repoRoot, { config, run });
  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.overall, "fail");
  assert.equal(result.summary.passedPairCount, 0);
});

test("named-reader receipt rejects false participation and missing coverage", () => {
  const mutated = structuredClone(run);
  mutated.actualPeopleParticipated = true;
  mutated.results = mutated.results.slice(1);
  const result = validateNamedReaderAcceptance(repoRoot, { config, run: mutated });
  assert.ok(result.issues.some((issue) => issue.includes("did not participate")));
  assert.ok(result.issues.some((issue) => issue.includes("Missing result")));
});

test("named-reader receipt rejects a false overall pass", () => {
  const mutated = structuredClone(run);
  mutated.overall = "pass";
  const result = validateNamedReaderAcceptance(repoRoot, { config, run: mutated });
  assert.ok(result.issues.some((issue) => issue.includes("Overall gate result")));
});

const syntheticOrigin = "https://staging-c.example.test";

function syntheticPassingReceipt(candidateCommit) {
  return {
    config: {
      publicOrigin: syntheticOrigin,
      currentRunPath: "evals/knowledge-wiki/synthetic-reader-receipt.json",
      contract: { publicOnly: true, actualPeopleParticipated: false },
      readerOpportunityPairs: [{
        id: "synthetic-reader-role",
        readerId: "synthetic-reader",
        opportunityId: "synthetic-role",
        required: true
      }]
    },
    run: {
      candidateCommit,
      publicOrigin: syntheticOrigin,
      actualPeopleParticipated: false,
      accessBoundary: "public-web-only",
      results: [{
        pairId: "synthetic-reader-role",
        readerId: "synthetic-reader",
        opportunityId: "synthetic-role",
        modeledVerdict: "pass",
        acceptanceStatement: "Under this fictionalized public-source lens, I would hire this person for this job.",
        pagesInspected: [`${syntheticOrigin}/`]
      }],
      availability: { gate: "pass" },
      requiredPairCount: 1,
      passedPairCount: 1,
      overall: "pass"
    }
  };
}

function currentHead(root = repoRoot) {
  return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
}

function cliFixture(t, { stale = false } = {}) {
  const root = mkdtempSync(path.join(tmpdir(), "named-reader-cli-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  execFileSync("git", ["clone", "--quiet", "--shared", "--no-checkout", repoRoot, root]);
  execFileSync("git", ["checkout", "HEAD", "--", "apps/www", "package.json", "package-lock.json", ".gitignore"], { cwd: root });
  const fixture = syntheticPassingReceipt(stale ? "0".repeat(40) : currentHead(root));
  mkdirSync(path.join(root, "scripts/knowledge-wiki"), { recursive: true });
  mkdirSync(path.join(root, "evals/knowledge-wiki"), { recursive: true });
  for (const file of ["named-reader-acceptance-lib.mjs", "check-named-reader-acceptance.mjs"]) {
    copyFileSync(path.join(repoRoot, "scripts/knowledge-wiki", file), path.join(root, "scripts/knowledge-wiki", file));
  }
  writeFileSync(path.join(root, "evals/knowledge-wiki/named-reader-acceptance.json"), JSON.stringify(fixture.config));
  writeFileSync(path.join(root, fixture.config.currentRunPath), JSON.stringify(fixture.run));
  const invoke = (...args) => spawnSync(process.execPath, [path.join(root, "scripts/knowledge-wiki/check-named-reader-acceptance.mjs"), ...args], { encoding: "utf8" });
  invoke.root = root;
  return invoke;
}

test("an all-pass historical receipt cannot pass the current candidate gate", () => {
  const fixture = syntheticPassingReceipt("0".repeat(40));
  const result = validateNamedReaderAcceptance(repoRoot, fixture);
  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.overall, "pass");
  assert.equal(result.summary.gatePassed, false);
  assert.equal(result.currentness.status, "historical");
  assert.equal(result.currentness.candidateMatches, false);
  assert.equal(result.currentness.currentCommit, currentHead());
});

test("an all-pass current receipt cannot pass for a different expected origin", (t) => {
  const invoke = cliFixture(t);
  const fixture = syntheticPassingReceipt(currentHead(invoke.root));
  const result = validateNamedReaderAcceptance(invoke.root, {
    ...fixture,
    expectedOrigin: "https://another-staging.example.test"
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.overall, "pass");
  assert.equal(result.summary.gatePassed, false);
  assert.equal(result.currentness.candidateMatches, true);
  assert.equal(result.currentness.originMatches, false);
});

test("an all-pass receipt for actual HEAD and the expected HTTPS origin passes", (t) => {
  const invoke = cliFixture(t);
  const fixture = syntheticPassingReceipt(currentHead(invoke.root));
  const result = validateNamedReaderAcceptance(invoke.root, { ...fixture, expectedOrigin: syntheticOrigin });
  assert.deepEqual(result.issues, []);
  assert.equal(result.currentness.status, "current");
  assert.equal(result.currentness.candidateMatches, true);
  assert.equal(result.currentness.originMatches, true);
  assert.equal(result.summary.gatePassed, true);
});

test("an expected origin must be HTTPS and contain no credentials or source path", () => {
  const fixture = syntheticPassingReceipt(currentHead());
  for (const expectedOrigin of ["http://staging.example.test", "https://user:secret@staging.example.test", "https://staging.example.test/private/path", "https://staging.example.test/?token=private"]) {
    const result = validateNamedReaderAcceptance(repoRoot, { ...fixture, expectedOrigin });
    assert.ok(result.issues.some((issue) => issue.includes("Expected origin must be an HTTPS origin")));
    assert.equal(result.summary.gatePassed, false);
  }
});

test("default CLI inspection labels an all-pass historical receipt without promoting it", (t) => {
  const invoke = cliFixture(t, { stale: true });
  const result = invoke();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /HISTORICAL/);
  assert.match(result.stdout, /current-candidate gate FAIL/);
});

test("CLI require-pass refuses an all-pass stale candidate", (t) => {
  const invoke = cliFixture(t, { stale: true });
  const result = invoke("--require-pass");
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stdout, /HISTORICAL/);
});

test("CLI require-pass refuses an all-pass receipt for the wrong expected origin", (t) => {
  const invoke = cliFixture(t);
  const result = invoke("--require-pass", "--expected-origin", "https://another-staging.example.test");
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stdout, /origin does not match/);
});

test("CLI require-pass accepts a current synthetic receipt for the expected HTTPS origin", (t) => {
  const invoke = cliFixture(t);
  const result = invoke("--require-pass", "--expected-origin", syntheticOrigin);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /CURRENT/);
  assert.match(result.stdout, /current-candidate gate PASS/);
});

for (const [label, relativePath, stage] of [
  ["an unstaged app source change", "apps/www/src/app/page.tsx", false],
  ["a staged app source change", "apps/www/src/app/page.tsx", true],
  ["an app dependency change", "apps/www/package.json", false],
  ["a root dependency change", "package.json", false],
  ["a root lockfile change", "package-lock.json", false]
]) {
  test(`matching HEAD cannot pass after ${label}`, (t) => {
    const invoke = cliFixture(t);
    const file = path.join(invoke.root, relativePath);
    writeFileSync(file, readFileSync(file, "utf8") + "\n");
    if (stage) execFileSync("git", ["add", "--", relativePath], { cwd: invoke.root });
    const result = invoke("--require-pass", "--expected-origin", syntheticOrigin);
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stdout, /runtime inputs differ from HEAD/);
    assert.match(result.stdout, /current-candidate gate FAIL/);
  });
}

test("matching HEAD cannot pass with an untracked app runtime file", (t) => {
  const invoke = cliFixture(t);
  writeFileSync(path.join(invoke.root, "apps/www/src/app/synthetic-candidate.ts"), "export const candidate = 'changed';\n");
  const result = invoke("--require-pass", "--expected-origin", syntheticOrigin);
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stdout, /runtime inputs differ from HEAD/);
});

test("matching HEAD cannot pass after a tracked app runtime file is deleted", (t) => {
  const invoke = cliFixture(t);
  rmSync(path.join(invoke.root, "apps/www/src/app/page.tsx"));
  const result = invoke("--require-pass", "--expected-origin", syntheticOrigin);
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stdout, /runtime inputs differ from HEAD/);
});

test("ignored build outputs and stored review receipts do not change the runtime candidate", (t) => {
  const invoke = cliFixture(t);
  for (const relativePath of ["apps/www/.next/server/generated.js", "apps/www/node_modules/synthetic/index.js", "evals/knowledge-wiki/runs/synthetic-review.json"]) {
    const file = path.join(invoke.root, relativePath);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, "{}\n");
  }
  const result = invoke("--require-pass", "--expected-origin", syntheticOrigin);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /CURRENT/);
  assert.match(result.stdout, /current-candidate gate PASS/);
});

test("default inspection reports a modified runtime candidate without promoting it", (t) => {
  const invoke = cliFixture(t);
  writeFileSync(path.join(invoke.root, "apps/www/src/app/synthetic-candidate.ts"), "export const candidate = 'changed';\n");
  const result = invoke();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /MODIFIED/);
  assert.match(result.stdout, /current-candidate gate FAIL/);
});

test("CLI rejects a missing or non-HTTPS expected origin", (t) => {
  const invoke = cliFixture(t);
  for (const args of [["--expected-origin"], ["--expected-origin", "http://staging.example.test"]]) {
    const result = invoke(...args);
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, /expected-origin|Expected origin/);
  }
});
