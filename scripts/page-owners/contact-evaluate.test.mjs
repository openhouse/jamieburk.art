import assert from "node:assert/strict";
import test from "node:test";

test("the implemented Contact candidate clears its deterministic page-owner desk", async () => {
  const {
    evaluateContactPageOwners,
    loadContactCandidate
  } = await import("./contact-evaluate.mjs");
  const result = evaluateContactPageOwners(loadContactCandidate(), {
    deterministicOnly: true
  });

  assert.equal(result.pass, true, result.failures.join("\n"));
  assert.deepEqual(result.ownerIds, [
    "katie-lane",
    "jonathan-stark",
    "beverly-wenger-trayner"
  ]);
  assert.equal(result.implementationAuthorized, true);
  assert.equal(result.publicationAuthorized, false);
});

test("page-owner simulation remains held until exact-candidate assessments exist", async () => {
  const {
    evaluateContactPageOwners,
    loadContactCandidate
  } = await import("./contact-evaluate.mjs");
  const candidate = loadContactCandidate();
  candidate.run = null;

  const result = evaluateContactPageOwners(candidate);

  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /missing or incomplete/);
});

test("a modeled page owner cannot be converted into real participation", async () => {
  const {
    evaluateContactPageOwners,
    loadContactCandidate
  } = await import("./contact-evaluate.mjs");
  const candidate = loadContactCandidate();
  candidate.registry.publicBoundary.actualPeopleParticipated = true;

  const result = evaluateContactPageOwners(candidate, {
    deterministicOnly: true
  });

  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /must not imply real participation/);
});

test("removing separate-agreement language fails the public engagement boundary", async () => {
  const {
    evaluateContactPageOwners,
    loadContactCandidate
  } = await import("./contact-evaluate.mjs");
  const candidate = loadContactCandidate();
  candidate.engagement.engagements[1].boundary = "Work continues as needed.";

  const result = evaluateContactPageOwners(candidate, {
    deterministicOnly: true
  });

  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /separate agreement/);
});

test("publishing a fee before its human gate fails closed", async () => {
  const {
    evaluateContactPageOwners,
    loadContactCandidate
  } = await import("./contact-evaluate.mjs");
  const candidate = loadContactCandidate();
  candidate.engagement.pricing.publicState = "published";
  candidate.engagement.pricing.display = "$250 per hour";

  const result = evaluateContactPageOwners(candidate, {
    deterministicOnly: true
  });

  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /exact public pricing/);
});
