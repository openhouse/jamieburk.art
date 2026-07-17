import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  governanceFingerprints,
  renderedProofInventory,
  validateKnowledgeIntegrity
} from "../check-knowledge-integrity.mjs";

const read = (name) => JSON.parse(readFileSync(`docs/knowledge-bank/governance/${name}.json`, "utf8"));
const canonical = () => ({
  credit: read("collective-credit-policy"),
  bindings: read("projection-surface-bindings"),
  composition: read("composition-manifest"),
  mosaic: read("mosaic-privacy-review")
});

test("canonical knowledge integrity controls pass", () => {
  assert.deepEqual(validateKnowledgeIntegrity(), []);
  assert.equal(Object.keys(renderedProofInventory()).length, 14);
});

test("silent proof deletion fails exact-set composition", () => {
  const input = canonical();
  input.composition.routes.find(({ route }) => route === "/").proof_ids.pop();
  assert.match(validateKnowledgeIntegrity(input).join("\n"), /proof inventory drifts/);
});

test("claim budgets cannot be raised to hide ungoverned composition", () => {
  const input = canonical();
  input.composition.routes.find(({ route }) => route === "/resume").claim_budget += 10;
  assert.match(validateKnowledgeIntegrity(input).join("\n"), /claim budget/);
});

test("collective work cannot be reclassified as individual attribution", () => {
  const input = canonical();
  input.credit.project_classes.find(({ project }) => project === "fair-rent-nyc").class = "individual";
  input.credit.proof_attribution.find(({ proof_id }) => proof_id === "nyc-artist-coalition-civic-systems").class = "individual";
  input.credit.policy_fingerprint = "updated-together";
  const errors = validateKnowledgeIntegrity(input).join("\n");
  assert.match(errors, /fair-rent-nyc must remain classified collective/);
  assert.match(errors, /nyc-artist-coalition-civic-systems must remain classified collective/);
});

test("new or hidden render paths cannot bypass route bindings", () => {
  const input = canonical();
  input.bindings.route_bindings = input.bindings.route_bindings.filter(({ route }) => route !== "/about");
  assert.match(validateKnowledgeIntegrity(input).join("\n"), /projection bindings are not an exact set/);
});

test("all governed renderer and asset paths must exist", () => {
  const input = canonical();
  input.bindings.shared_projection_sources.push("apps/www/src/data/not-a-real-renderer.ts");
  assert.match(validateKnowledgeIntegrity(input).join("\n"), /projection source is missing/);
});

test("mosaic privacy is a dated, multi-record review", () => {
  const input = canonical();
  input.mosaic.risks = input.mosaic.risks.slice(0, 1);
  assert.match(validateKnowledgeIntegrity(input).join("\n"), /at least five/);
});

test("fingerprint reporting is read-only and deterministic", () => {
  const first = governanceFingerprints();
  const second = governanceFingerprints();
  assert.deepEqual(first, second);
  assert.ok(Object.values(first).every((value) => /^sha256:[a-f0-9]{64}$/.test(value)));
});
