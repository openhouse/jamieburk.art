import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  computeCandidateIdentity,
  findSensitiveValues,
  loadCompositeContract,
  scanGovernedPublicText,
  validateCandidateIdentity,
  validateCompositeContract,
  validateConsecutiveCertification,
  validateKnowledgeFrontier,
  validateSelectiveProjection
} from "../lib/composite-eval-integrity.mjs";

const repoRoot = process.cwd();
const contract = loadCompositeContract(repoRoot);

function passingResult(criterion) {
  return {
    id: criterion.id,
    label: `Passing ${criterion.id}`,
    weight: criterion.weight,
    hardGate: criterion.hardGate,
    evidence: ["Synthetic evaluator evidence"],
    failures: [],
    status: "pass"
  };
}

function contractedResults() {
  return [
    ...contract.legacyCriteriaManifest,
    ...contract.compositeCriteria
  ].map(passingResult);
}

test("the composite contract freezes the complete result manifest", () => {
  assert.deepEqual(validateCompositeContract(contract, contractedResults()), []);
});

test("the composite contract rejects a missing criterion", () => {
  const results = contractedResults().filter(
    (item) => item.id !== "blind-spot-agency-without-inflation"
  );
  assert.match(
    validateCompositeContract(contract, results).join("\n"),
    /missing contracted criteria: blind-spot-agency-without-inflation/
  );
});

test("every required family must retain known criterion coverage", () => {
  const candidate = structuredClone(contract);
  delete candidate.familyCoverage["portfolio-mosaic"];
  candidate.familyCoverage["privacy-and-rights"] = ["not-a-real-criterion"];
  const failures = validateCompositeContract(candidate, contractedResults()).join("\n");
  assert.match(failures, /family portfolio-mosaic has no criterion coverage/);
  assert.match(failures, /family privacy-and-rights references unknown criterion/);
});

test("the composite contract rejects weight and hard-gate drift", () => {
  const results = contractedResults();
  results[0].weight += 1;
  results[1].hardGate = false;
  const failures = validateCompositeContract(contract, results).join("\n");
  assert.match(failures, /weight drifted/);
  assert.match(failures, /hard-gate status drifted/);
});

test("the composite contract rejects hard-coded results without evidence", () => {
  const results = contractedResults();
  results[0].evidence = [];
  results[1].failures = undefined;
  const failures = validateCompositeContract(contract, results).join("\n");
  assert.match(failures, /missing evaluator evidence/);
  assert.match(failures, /missing a failure list/);
});

test("candidate identity binds Git, contract, inputs, evaluator, and public registry", () => {
  const identity = computeCandidateIdentity(repoRoot, contract);
  assert.deepEqual(validateCandidateIdentity(identity), []);
  for (const field of [
    "candidateId",
    "contractDigest",
    "materialDigest",
    "evaluatorDigest",
    "publicRegistryDigest"
  ]) {
    assert.match(identity[field], /^[a-f0-9]{64}$/);
  }
});

test("candidate identity rejects a stale or malformed fingerprint", () => {
  const identity = computeCandidateIdentity(repoRoot, contract);
  identity.materialDigest = "copied-from-another-candidate";
  assert.match(validateCandidateIdentity(identity).join("\n"), /invalid materialDigest/);
});

test("the canonical knowledge frontier is closed", () => {
  assert.deepEqual(validateKnowledgeFrontier(knowledgeBank), []);
});

test("the frontier rejects a dangling source edge", () => {
  const candidate = structuredClone(knowledgeBank);
  candidate.claims[0].evidence[0].sourceId = "SRC-SYNTHETIC-MISSING";
  assert.match(validateKnowledgeFrontier(candidate).join("\n"), /missing source/);
});

test("the frontier rejects a private-support citation", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find((item) =>
    item.evidence.some((evidence) => evidence.relationship === "private-support")
  );
  claim.evidence.find(
    (evidence) => evidence.relationship === "private-support"
  ).renderCitation = true;
  assert.match(
    validateKnowledgeFrontier(candidate).join("\n"),
    /renders a private-support relationship/
  );
});

test("the frontier rejects a silently dropped public occurrence", () => {
  const candidate = structuredClone(knowledgeBank);
  const page = candidate.pages.find((item) => item.id === "callnyc");
  page.occurrences = page.occurrences.filter(
    (item) => item.claimId !== "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION"
  );
  assert.match(
    validateKnowledgeFrontier(candidate).join("\n"),
    /requires a citation.*no occurrence is registered/
  );
});

test("the frontier rejects citation sources outside canonical evidence", () => {
  const candidate = structuredClone(knowledgeBank);
  const page = candidate.pages.find((item) => item.id === "callnyc");
  const occurrence = page.occurrences[0];
  const unrelated = candidate.sources.find(
    (source) => !candidate.claims
      .find((claim) => claim.id === occurrence.claimId)
      .evidence.some((evidence) => evidence.sourceId === source.id)
  );
  occurrence.sourceIds.push(unrelated.id);
  page.sourceOrder.push(unrelated.id);
  assert.match(
    validateKnowledgeFrontier(candidate).join("\n"),
    /outside the canonical claim evidence/
  );
});

test("selective projection keeps reserve evidence off public routes", () => {
  assert.deepEqual(validateSelectiveProjection(knowledgeBank), []);
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (item) => item.id === "CLM-CALLNYC-DIGITAL-DISTRICT"
  );
  claim.projections[0].status = "active";
  claim.projections[0].surfaces = ["/work/callnyc"];
  assert.match(
    validateSelectiveProjection(candidate).join("\n"),
    /is hold but has an active public route/
  );
});

test("normalized safety catches encoded path, token, key, and phone bypasses", () => {
  const fixtures = [
    "/Users/example/private/source.txt",
    "\\u002fUsers\\u002fexample\\u002fprivate.txt",
    "/Us\u200bers/example/private.txt",
    "&#x2f;Volumes&#x2f;Example&#x2f;private.txt",
    `ghp_${"A".repeat(30)}`,
    ["-----BEGIN ", "PRIVATE", " KEY-----"].join(""),
    `${["bear", "er"].join("")} synthetic_token_value_1234567890`,
    "212-555-0199"
  ];
  for (const fixture of fixtures) {
    assert.ok(findSensitiveValues(fixture).length > 0, fixture);
  }
});

test("governed public text passes normalized safety inspection", () => {
  assert.deepEqual(scanGovernedPublicText(repoRoot, contract), []);
});

test("two clean unchanged passing runs satisfy automated certification", () => {
  const identity = {
    ...computeCandidateIdentity(repoRoot, contract),
    treeState: "clean"
  };
  const report = { summary: { automatedReady: true }, identity };
  assert.deepEqual(
    validateConsecutiveCertification(
      [structuredClone(report), structuredClone(report)],
      contract
    ),
    []
  );
});

test("certification rejects dirty, stale, and changed candidates", () => {
  const identity = computeCandidateIdentity(repoRoot, contract);
  const first = {
    summary: { automatedReady: true },
    identity: { ...identity, treeState: "dirty" }
  };
  const second = structuredClone(first);
  second.identity.materialDigest = "0".repeat(64);
  const failures = validateConsecutiveCertification([first, second], contract).join("\n");
  assert.match(failures, /dirty candidate/);
  assert.match(failures, /do not share the same materialDigest/);
});
