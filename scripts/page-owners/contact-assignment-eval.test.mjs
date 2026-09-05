import assert from "node:assert/strict";
import test from "node:test";

let evaluateContactOwnerAssignment;
let loadContactOwnerAssignment;
try {
  ({ evaluateContactOwnerAssignment, loadContactOwnerAssignment } = await import(
    "./contact-assignment-eval.mjs"
  ));
} catch {
  // The first red run fails by assertion until the assignment evaluator exists.
}

function evaluator() {
  assert.equal(typeof evaluateContactOwnerAssignment, "function");
  assert.equal(typeof loadContactOwnerAssignment, "function");
  return {
    evaluate: evaluateContactOwnerAssignment,
    load: loadContactOwnerAssignment
  };
}

test("the Contact pathway has three valid fictionalized owners queued", () => {
  const { evaluate, load } = evaluator();
  const result = evaluate(load());
  assert.equal(result.pass, true, result.failures.join("\n"));
  assert.equal(result.acceptance_state, "queued-for-implementation-candidate");
  assert.equal(result.owner_count, 3);
});

test("the owner desk cannot claim real participation", () => {
  const { evaluate, load } = evaluator();
  const candidate = load();
  candidate.registry.publicBoundary.actualPeopleParticipated = true;
  const result = evaluate(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /real participation/);
});

test("a missing owner keeps the proposed page assignment held", () => {
  const { evaluate, load } = evaluator();
  const candidate = load();
  candidate.page.owners.pop();
  const result = evaluate(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /exactly three/);
});

test("assignment cannot be mislabeled as implemented page acceptance", () => {
  const { evaluate, load } = evaluator();
  const candidate = load();
  candidate.page.status = "accepted";
  const result = evaluate(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /remain proposed/);
});
