import assert from "node:assert/strict";
import test from "node:test";
import {
  closureFixture,
  evaluateWikiFamilyClosure
} from "../lib/wiki-family-closure.mjs";

const resultFor = (candidate, id) =>
  evaluateWikiFamilyClosure(candidate).find((result) => result.id === id);

test("the complete closure fixture passes", () => {
  assert.ok(evaluateWikiFamilyClosure(closureFixture()).every((item) => item.pass));
});

test("a substituted frozen head fails", () => {
  const candidate = closureFixture();
  candidate.frozenBranches[2].head = "0".repeat(40);
  assert.equal(resultFor(candidate, "FAMILY-001").pass, false);
});

test("a parallel Wiki root fails", () => {
  const candidate = closureFixture();
  candidate.forbiddenRootPresent = true;
  assert.equal(resultFor(candidate, "FAMILY-002").pass, false);
});

test("choosing one census total fails", () => {
  const candidate = closureFixture();
  candidate.canonicalCensusTotal = 2408;
  candidate.censusProjection = "active";
  assert.equal(resultFor(candidate, "FAMILY-003").pass, false);
});

test("an unreachable selected page fails", () => {
  const candidate = closureFixture();
  candidate.rootRelationTargets.clear();
  assert.equal(resultFor(candidate, "FAMILY-004").pass, false);
});

test("duplicate or unassigned review paths fail", () => {
  const candidate = closureFixture();
  candidate.reviewUnits[0].paths.push("docs/example.md");
  assert.equal(resultFor(candidate, "FAMILY-005").pass, false);
});

test("a review unit above the addition threshold fails", () => {
  const candidate = closureFixture();
  candidate.reviewUnits[0].addedLines = 10001;
  assert.equal(resultFor(candidate, "FAMILY-005").pass, false);
});

test("CI that skips closure mutation tests fails", () => {
  const candidate = closureFixture();
  candidate.repositoryCheckRunsMutationTests = false;
  assert.equal(resultFor(candidate, "FAMILY-006").pass, false);
});

test("machine evaluation cannot grant human approval", () => {
  const candidate = closureFixture();
  candidate.humanGates.contentApproval = "approved";
  assert.equal(resultFor(candidate, "FAMILY-007").pass, false);
});

test("remote feature-ref dependencies fail", () => {
  const candidate = closureFixture();
  candidate.requiredRemoteFeatureRefs.push("origin/feature/evals-A");
  assert.equal(resultFor(candidate, "FAMILY-008").pass, false);
});
