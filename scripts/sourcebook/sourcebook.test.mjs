import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  buildSourcebookOutputs,
  checkSourcebookOutputs,
  compileSourcebook,
  defaultRepoRoot,
  readSourcebookInputs,
  sourcebookExportFingerprint,
  validateSourcebook
} from "./lib.mjs";

function inputs() {
  return structuredClone(readSourcebookInputs(defaultRepoRoot));
}

function validate(mutator) {
  const candidate = inputs();
  mutator(candidate);
  return validateSourcebook({ repoRoot: defaultRepoRoot, ...candidate });
}

function assertIssue(result, code) {
  assert.ok(
    result.issues.some((failure) => failure.code === code),
    `expected ${code}; received ${result.issues.map((failure) => failure.code).join(", ")}`
  );
}

test("current Sourcebook candidate passes and generated outputs are fresh", () => {
  const result = compileSourcebook({ repoRoot: defaultRepoRoot });
  assert.deepEqual(result.issues, []);
  assert.deepEqual(checkSourcebookOutputs(defaultRepoRoot, result.outputs), []);
  assert.equal(result.catalog.records.length, 3);
  assert.equal(result.catalog.pilot.includedCount, 3);
});

test("export generation and fingerprinting are deterministic", () => {
  const { catalog, packet } = inputs();
  const first = buildSourcebookOutputs({ catalog, packet });
  const second = buildSourcebookOutputs({ catalog, packet });
  assert.deepEqual(first, second);
  assert.equal(
    JSON.parse(first["sourcebook/public-export.json"]).exportFingerprint,
    sourcebookExportFingerprint(catalog, packet)
  );
});

test("population counts must close", () => {
  assertIssue(validate(({ catalog }) => (catalog.pilot.includedCount = 2)), "POPULATION_CLOSURE");
});

test("stable IDs are unique", () => {
  assertIssue(
    validate(({ catalog }) => (catalog.records[1].id = catalog.records[0].id)),
    "DUPLICATE_ID"
  );
});

test("one canonical body cannot be assigned to two perspectives", () => {
  assertIssue(
    validate(({ catalog }) => (catalog.records[1].bodyPath = catalog.records[0].bodyPath)),
    "DUPLICATE_BODY"
  );
});

test("body fingerprint drift fails closed", () => {
  assertIssue(
    validate(({ catalog }) => (catalog.records[0].bodySha256 = "0".repeat(64))),
    "STALE_BODY_HASH"
  );
});

test("stance classification requires a written basis", () => {
  assertIssue(
    validate(({ catalog }) => (catalog.records[0].stance.basis = "too short")),
    "CATALOG_SCHEMA"
  );
});

test("support and recommendation require direct evidence", () => {
  assertIssue(
    validate(({ catalog }) => {
      catalog.records[0].stance.value = "support";
      catalog.records[0].stance.directEvidence = [];
    }),
    "CATALOG_SCHEMA"
  );
});

test("endorsement cannot be smuggled in as a stance", () => {
  assertIssue(
    validate(({ catalog }) => (catalog.records[0].stance.value = "endorsement")),
    "CATALOG_SCHEMA"
  );
});

test("scheduled, remembered, or unsupported encounters cannot become documented occurrence", () => {
  assertIssue(
    validate(({ catalog }) => {
      catalog.records[0].context.occurrenceState = "documented";
      catalog.records[0].context.corroboration = [];
    }),
    "CATALOG_SCHEMA"
  );
});

test("a readable or repaired transcript cannot mutate into audio certification", () => {
  assertIssue(
    validate(({ catalog }) => (catalog.records[0].text.certification = "audio-certified")),
    "CATALOG_SCHEMA"
  );
});

test("active projection requires reviewed rights and consent", () => {
  assertIssue(
    validate(({ catalog }) => (catalog.records[0].consent.publicProjection = "pending")),
    "CATALOG_SCHEMA"
  );
  assertIssue(
    validate(({ catalog }) => (catalog.records[0].rights.quoteUse = "pending")),
    "CATALOG_SCHEMA"
  );
});

test("the active pilot cannot silently become a portfolio route", () => {
  assertIssue(
    validate(({ catalog }) => (catalog.records[0].projection.surfaces = ["/about"])),
    "CATALOG_SCHEMA"
  );
});

test("withdrawal invalidates an active record and its publication packet", () => {
  const result = validate(({ catalog }) => {
    catalog.records[0].withdrawalState = "withdrawn";
    catalog.records[0].status = "withdrawn";
  });
  assertIssue(result, "CATALOG_SCHEMA");
});

test("publication packet rejects protected locators and every unallowlisted field", () => {
  assertIssue(
    validate(({ packet }) => {
      packet.protectedLocator = "vault://synthetic-record";
    }),
    "PACKET_SCHEMA"
  );
});

test("publication packet body hashes must match the catalog", () => {
  assertIssue(
    validate(({ packet }) => (packet.records[0].bodySha256 = "f".repeat(64))),
    "PACKET_HASH_MISMATCH"
  );
});

test("public export contains no local locator, private dependency, or portfolio surface", () => {
  const { catalog, packet } = inputs();
  const output = buildSourcebookOutputs({ catalog, packet })["sourcebook/public-export.json"];
  assert.doesNotMatch(output, /\/(?:Users|Volumes|private\/tmp)\//);
  assert.doesNotMatch(output, /vault:\/\//i);
  assert.doesNotMatch(output, /\/about|\/work\//);
  assert.doesNotMatch(output, /recommendation|direct message|correspondence/i);
});

test("the eval manifest names every enforced high-risk boundary", () => {
  const suite = JSON.parse(
    readFileSync(path.join(defaultRepoRoot, "evals/sourcebook/evals.json"), "utf8")
  );
  assert.equal(suite.requiredPassRate, 1);
  assert.equal(suite.criteria.length, 16);
  assert.ok(suite.humanGates.includes("production indexing"));
  assert.ok(suite.humanGates.includes("third-party rights and consent"));
});

test("repository public safety independently invokes the Sourcebook boundary", () => {
  const source = readFileSync(
    path.join(defaultRepoRoot, "scripts/check-public-safety.mjs"),
    "utf8"
  );
  assert.match(source, /scripts\/sourcebook\/check\.mjs/);
  assert.doesNotThrow(() =>
    execFileSync(process.execPath, [path.join(defaultRepoRoot, "scripts/check-public-safety.mjs")], {
      cwd: defaultRepoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    })
  );
});
