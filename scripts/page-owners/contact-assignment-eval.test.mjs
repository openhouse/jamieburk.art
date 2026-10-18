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

// A controlled historical proposal fixture, not a current owner assignment or review.
function proposedCandidate() {
  const { registry } = evaluator().load();
  const page = {
    pageId: "contact-engagement-pathway",
    route: "/contact",
    status: "proposed",
    candidateState: "not-implemented-no-owner-acceptance",
    acceptanceRule: "Every fictionalized page-owner lens returns Pass; Jamie separately approves publication.",
    owners: ["katie-lane", "adrienne-r-fields", "blair-enns"].map((id, index) => ({
      id,
      focus: `Historical proposal criterion ${index + 1}`,
      publicProfileUrl: `https://example.test/${id}`,
      publicEvidenceState: "default-public-state",
      question: "Does this proposed pathway distinguish inquiry from paid work, preserve mutual authorization, and make its intended next step clear to a prospective visitor?",
      passDefinition: "Pass only when the proposed pathway preserves a separate decision before paid work starts, communicates boundaries clearly, and does not imply that fictionalized review supplies publication authority."
    }))
  };
  registry.pages = [page];
  return { registry, page };
}

test("the historical proposed Contact assignment remains queued without acceptance", () => {
  const { evaluate } = evaluator();
  const result = evaluate(proposedCandidate());
  assert.equal(result.pass, true, result.failures.join("\n"));
  assert.equal(result.acceptance_state, "queued-for-implementation-candidate");
  assert.equal(result.owner_count, 3);
});

test("the implemented Contact assignment uses its current contract without claiming acceptance", () => {
  const { evaluate, load } = evaluator();
  const result = evaluate(load());
  assert.equal(result.pass, true, result.failures.join("\n"));
  assert.equal(result.page_id, "contact");
  assert.equal(result.acceptance_state, "implementation-candidate-not-publication-approval");
  assert.equal(result.owner_count, 3);
  assert.equal(result.publication_authorized, false);
});

test("an absent Contact assignment fails explicitly instead of silently validating an empty desk", () => {
  const { evaluate, load } = evaluator();
  const candidate = load();
  candidate.page = null;
  candidate.registry.pages = [];
  const result = evaluate(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /Contact assignment is missing/);
  assert.equal(result.acceptance_state, "invalid");
});

test("an implementation cannot pass the assignment gate without its authorized contract", () => {
  const { evaluate, load } = evaluator();
  const candidate = load();
  assert.ok(candidate.implementationCandidate, "Load the implemented Contact contract for lifecycle validation");
  candidate.implementationCandidate.contract.policy.authority.implementation_authorized = false;
  const result = evaluate(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /authorize this bounded implementation/);
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
  const { evaluate } = evaluator();
  const candidate = proposedCandidate();
  candidate.page.owners.pop();
  const result = evaluate(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /exactly three/);
});

test("assignment cannot be mislabeled as implemented page acceptance", () => {
  const { evaluate } = evaluator();
  const candidate = proposedCandidate();
  candidate.page.status = "accepted";
  const result = evaluate(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /remain proposed/);
});
