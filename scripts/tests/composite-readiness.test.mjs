import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  sha256,
  validateDonorBehaviors,
  validateDonorInventory,
  validateHumanStatus,
  validateIntegrationLedger,
  validatePackageContract,
  validatePlanningMaps,
  validateRubricLock,
  validateWorkflow
} from "../lib/composite-readiness.mjs";
import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));
const clone = (value) => structuredClone(value);

const inventory = readJson("evals/composite-readiness/donor-inventory.json");
const donorBehaviors = readJson("evals/composite-readiness/donor-behaviors.json");
const humanStatus = readJson("evals/composite-readiness/human-status.json");
const rubricText = read("evals/composite-readiness/rubric.json");
const lock = readJson("evals/composite-readiness/rubric-lock.json");
const ledger = read("docs/qa/feature-knowledge-k/composite-integration-ledger.md");
const packageJson = readJson("package.json");
const workflow = read(".github/workflows/portfolio-readiness.yml");
const maps = {
  recentCapability: read("docs/evals/recent-capability-map.md"),
  outcomeTransfer: read("docs/evals/outcome-transfer-matrix.md"),
  artisticContinuity: read("docs/evals/artistic-continuity-map.md"),
  releaseStatus: read("docs/evals/release-status.md")
};
const behaviorAdapters = {
  readCurrentEvidence: read,
  resolveDonorBlob: (revision, donorPath) => execFileSync(
    "git",
    ["rev-parse", `${revision}:${donorPath}`],
    { cwd: repoRoot, encoding: "utf8" }
  ).trim()
};
const projectIds = new Set(knowledgeLifecycle.projects.map(({ id }) => id));

test("the committed composite contract is internally valid", () => {
  assert.deepEqual(validateDonorInventory(inventory), []);
  assert.deepEqual(validateDonorBehaviors(donorBehaviors, inventory, behaviorAdapters), []);
  assert.deepEqual(validateHumanStatus(humanStatus), []);
  assert.deepEqual(validateIntegrationLedger(ledger, inventory), []);
  assert.deepEqual(validatePackageContract(packageJson), []);
  assert.deepEqual(validateWorkflow(workflow), []);
  assert.deepEqual(validateRubricLock(lock, rubricText), []);
  assert.deepEqual(validatePlanningMaps(maps, projectIds), []);
});

test("a frozen donor artifact cannot be replaced by an unverified filename", () => {
  const value = clone(donorBehaviors);
  value.behaviors[0].donorArtifact.blobSha1 = "0".repeat(40);
  assert.match(validateDonorBehaviors(value, inventory, behaviorAdapters).join("\n"), /frozen artifact hash/);
});

test("a current behavior needs content assertions, not path similarity", () => {
  const value = clone(donorBehaviors);
  value.behaviors[1].currentEvidence[0].includes[0] = "not-present-in-the-candidate";
  assert.match(validateDonorBehaviors(value, inventory, behaviorAdapters).join("\n"), /current evidence/);
});

test("a missing donor cannot disappear from the composite", () => {
  const value = clone(inventory);
  value.donors = value.donors.filter((donor) => donor.letter !== "I");
  assert.match(validateDonorInventory(value).join("\n"), /Donor I is missing/);
});

test("a pending donor cannot satisfy final coverage", () => {
  const value = clone(inventory);
  value.donors[0].disposition = "pending";
  assert.match(validateDonorInventory(value).join("\n"), /nonfinal disposition pending/);
});

test("filename similarity cannot replace integration evidence", () => {
  const value = clone(inventory);
  value.donors[1].integrationEvidence = ["one-file.md"];
  assert.match(validateDonorInventory(value).join("\n"), /at least two integration evidence/);
});

test("donor review remains bound to a full revision", () => {
  const value = clone(inventory);
  value.donors[2].revision = "short-sha";
  assert.match(validateDonorInventory(value).join("\n"), /full reviewed revision SHA/);
});

test("a human gate cannot be falsely closed", () => {
  const value = clone(humanStatus);
  value.gates[0].status = "closed";
  assert.match(validateHumanStatus(value).join("\n"), /falsely closed/);
});

test("a human gate cannot be silently removed", () => {
  const value = clone(humanStatus);
  value.gates = value.gates.filter((gate) => gate.id !== "production-cutover");
  assert.match(validateHumanStatus(value).join("\n"), /production-cutover is missing/);
});

test("the integration ledger must retain every donor's exact review", () => {
  assert.match(
    validateIntegrationLedger(ledger.replace(inventory.donors[3].revision, "removed"), inventory).join("\n"),
    /Ledger omits D revision/
  );
});

test("the root check cannot omit composite mutation tests", () => {
  const value = clone(packageJson);
  value.scripts.check = value.scripts.check.replace("npm run test:composite-readiness", "");
  assert.match(validatePackageContract(value).join("\n"), /Root check does not include test:composite-readiness/);
});

test("CI must run on Node 26", () => {
  assert.match(validateWorkflow(workflow.replace("node-version: 26", "node-version: 24")).join("\n"), /node-version: 26/);
});

test("CI cannot upload generated evidence", () => {
  assert.match(validateWorkflow(`${workflow}\n- uses: actions/upload-artifact@v4`).join("\n"), /must not upload/);
});

test("the active rubric cannot drift from its lock", () => {
  assert.equal(lock.sha256, sha256(rubricText));
  assert.match(validateRubricLock(lock, `${rubricText}\n`).join("\n"), /digest does not match/);
});

test("planning maps must preserve their decision boundaries", () => {
  const value = { ...maps, outcomeTransfer: maps.outcomeTransfer.replaceAll("Causal boundary", "Impact") };
  assert.match(validatePlanningMaps(value, projectIds).join("\n"), /outcomeTransfer map is missing Causal boundary/);
});

test("planning maps cannot point to an unknown lifecycle project", () => {
  const value = { ...maps, recentCapability: maps.recentCapability.replace("PRJ-HARRY-J-EPSTEIN", "PRJ-NOT-REAL") };
  assert.match(validatePlanningMaps(value, projectIds).join("\n"), /unknown lifecycle project PRJ-NOT-REAL/);
});
