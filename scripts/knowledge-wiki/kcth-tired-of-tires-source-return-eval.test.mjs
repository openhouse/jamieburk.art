import assert from "node:assert/strict";
import test from "node:test";

async function loadEvaluator() {
  return import("./kcth-tired-of-tires-source-return-eval.mjs");
}

test("the Tired of Tires source return passes its governed public-service gate", async () => {
  const evaluator = await loadEvaluator();
  assert.equal(
    typeof evaluator.loadCandidate,
    "function",
    "Tired of Tires source-return evaluator is missing"
  );
  assert.equal(
    typeof evaluator.evaluateKcthTireSourceReturn,
    "function",
    "Tired of Tires source-return evaluation function is missing"
  );

  const result = evaluator.evaluateKcthTireSourceReturn(evaluator.loadCandidate());
  assert.equal(result.pass, true, result.failures.join("\n"));
});

test("the gate rejects a metric projection that drops the project-maintained boundary", async () => {
  const evaluator = await loadEvaluator();
  assert.equal(typeof evaluator.loadCandidate, "function", "evaluator is missing");
  const candidate = evaluator.loadCandidate();
  const claim = candidate.knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-TIRED-OF-TIRES-MEASUREMENT"
  );
  assert.ok(claim, "measurement claim is missing");
  claim.projections[0].text = claim.projections[0].text.replace(
    "project-maintained tracker",
    "tracker"
  );

  const result = evaluator.evaluateKcthTireSourceReturn(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /project-maintained/i);
});

test("the gate rejects sole-credit service design language", async () => {
  const evaluator = await loadEvaluator();
  assert.equal(typeof evaluator.loadCandidate, "function", "evaluator is missing");
  const candidate = evaluator.loadCandidate();
  const claim = candidate.knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-TIRED-OF-TIRES-SERVICE-DESIGN"
  );
  assert.ok(claim, "service-design claim is missing");
  claim.projections[0].text = "Jamie alone designed and operated Tired of Tires.";

  const result = evaluator.evaluateKcthTireSourceReturn(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /collective credit|sole credit/i);
});

test("the gate rejects resident contact data on the public case study", async () => {
  const evaluator = await loadEvaluator();
  assert.equal(typeof evaluator.loadCandidate, "function", "evaluator is missing");
  const candidate = evaluator.loadCandidate();
  candidate.caseStudySource += "\nResident callback: 816-555-0199\n";

  const result = evaluator.evaluateKcthTireSourceReturn(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /contact data|phone/i);
});

test("the gate rejects a missing 4x6 service artifact", async () => {
  const evaluator = await loadEvaluator();
  assert.equal(typeof evaluator.loadCandidate, "function", "evaluator is missing");
  const candidate = evaluator.loadCandidate();
  candidate.workSource = candidate.workSource.replaceAll(
    "/images/artifacts/kc-town-hall-tired-of-tires-handbill-2021.webp",
    "/images/artifacts/missing-tire-handbill.webp"
  );

  const result = evaluator.evaluateKcthTireSourceReturn(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /Tired of Tires handbill/i);
});

test("the gate rejects a graphic without an exact cleared public-display disposition", async () => {
  const evaluator = await loadEvaluator();
  assert.equal(typeof evaluator.loadCandidate, "function", "evaluator is missing");
  const candidate = evaluator.loadCandidate();
  const source = candidate.knowledgeBank.sources.find(
    (item) => item.id === "SRC-KCTH-TIRES-DESIGN-ARCHIVE-2019-2021"
  );
  assert.ok(source?.media, "design-archive media disposition is missing");
  source.media.publicDisplayStatus = "hold";

  const result = evaluator.evaluateKcthTireSourceReturn(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /public-display|cleared/i);
});
