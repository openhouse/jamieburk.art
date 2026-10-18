import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import * as colophon from "./evaluate.mjs";

import {
  evaluateColophonPageOwners,
  loadColophonCandidate
} from "./evaluate.mjs";

function historicalMigrationCandidate() {
  const candidate = loadColophonCandidate();
  candidate.registry = structuredClone(candidate.registryBindingMigration.registrySnapshot);
  candidate.registryBindingMigration = null;
  return candidate;
}

test("a legacy full-registry receipt can be migrated without rewriting its review", () => {
  const candidate = historicalMigrationCandidate();
  const originalRun = structuredClone(candidate.run);
  assert.equal(typeof colophon.createColophonRegistryBindingMigration, "function");
  candidate.registryBindingMigration = colophon.createColophonRegistryBindingMigration(candidate);
  assert.deepEqual(candidate.run, originalRun);
  assert.equal(candidate.registryBindingMigration.newReviewExecuted, false);
  assert.equal(candidate.registryBindingMigration.publicationAuthorized, false);
  assert.equal(evaluateColophonPageOwners(candidate).pass, true);
});

test("a migration refuses a legacy receipt whose full registry no longer matches", () => {
  const candidate = historicalMigrationCandidate();
  candidate.registry.pages.push({ pageId: "not-in-reviewed-registry" });
  assert.equal(typeof colophon.createColophonRegistryBindingMigration, "function");
  assert.throws(() => colophon.createColophonRegistryBindingMigration(candidate), /full registry/);
});

test("a migration refuses changed reviewed source rather than rebinding it", () => {
  const candidate = historicalMigrationCandidate();
  candidate.pageSource += "\n// changed candidate\n";
  assert.equal(typeof colophon.createColophonRegistryBindingMigration, "function");
  assert.throws(() => colophon.createColophonRegistryBindingMigration(candidate), /reviewed candidate/);
});

test("altering the historical assessment invalidates its migration", () => {
  const candidate = loadColophonCandidate();
  candidate.run.assessments[0].critique += " A different assessment.";
  assert.equal(evaluateColophonPageOwners(candidate).pass, false);
});

test("a migration cannot conceal a changed authority boundary in its frozen snapshot", () => {
  const candidate = loadColophonCandidate();
  candidate.registryBindingMigration.registrySnapshot.publicBoundary.humanFinalApprovalRequired = false;
  assert.equal(evaluateColophonPageOwners(candidate).pass, false);
});

test("a migration record cannot expose a protected source locator", () => {
  const candidate = loadColophonCandidate();
  candidate.registryBindingMigration.note += " /Users/example/private-source";
  const result = evaluateColophonPageOwners(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /private locator/);
});

test("a missing migration keeps a legacy receipt held", () => {
  const candidate = loadColophonCandidate();
  candidate.registryBindingMigration = null;
  assert.equal(evaluateColophonPageOwners(candidate).pass, false);
});

test("a retained migration cannot rebind changed reviewed screenshots", () => {
  const candidate = loadColophonCandidate();
  candidate.desktopScreenshot = Buffer.concat([candidate.desktopScreenshot, Buffer.from("changed")]);
  assert.equal(evaluateColophonPageOwners(candidate).pass, false);
});

test("native scoped receipts still require their exact page binding without a migration", () => {
  const candidate = loadColophonCandidate();
  candidate.registryBindingMigration = null;
  candidate.run.registryBinding = "page-and-public-boundary-v1";
  candidate.run.pageRegistrySha256 = colophon.sha256(JSON.stringify(
    colophon.pageRegistryBinding(candidate.registry, candidate.config.pageId)
  ));
  assert.equal(evaluateColophonPageOwners(candidate).pass, true);
  candidate.registry.publicBoundary.publicLanguage += " Changed boundary.";
  assert.equal(evaluateColophonPageOwners(candidate).pass, false);
});

test("the colophon clears deterministic checks before owner simulation", () => {
  const result = evaluateColophonPageOwners(loadColophonCandidate(), {
    deterministicOnly: true
  });
  assert.equal(result.pass, true, result.failures.join("\n"));
});

test("the current colophon clears all three fictionalized page-owner gates", () => {
  const result = evaluateColophonPageOwners(loadColophonCandidate());
  assert.equal(result.pass, true, result.failures.join("\n"));
});

test("a single failed owner prevents aggregate acceptance", () => {
  const candidate = loadColophonCandidate();
  candidate.run.assessments[0].verdict = "Fail";
  const result = evaluateColophonPageOwners(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /did not return Pass/);
});

test("modeled review cannot claim actual participation", () => {
  const candidate = loadColophonCandidate();
  candidate.registry.publicBoundary.actualPeopleParticipated = true;
  const result = evaluateColophonPageOwners(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /must not imply real participation/);
});

test("an owner cannot be silently moved to another public interaction state", () => {
  const candidate = loadColophonCandidate();
  candidate.registry.pages[0].owners[2].publicEvidenceState =
    "expanded-public-interaction";
  const result = evaluateColophonPageOwners(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /public interaction state/);
});

test("the colophon cannot reuse a photograph without an authorized occurrence", () => {
  const candidate = loadColophonCandidate();
  candidate.publicAssetRecord = candidate.publicAssetRecord.replace(
    '      "projection.photo.colophon.east-river"\n',
    ""
  );
  const result = evaluateColophonPageOwners(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /approved occurrence/);
});

test("the response schema keeps Pass and Fail explicit", () => {
  const schema = JSON.parse(
    readFileSync(
      new URL(
        "../../evals/page-owners/colophon-response.schema.json",
        import.meta.url
      ),
      "utf8"
    )
  );
  assert.deepEqual(schema.properties.verdict.enum, ["Pass", "Fail"]);
  assert.equal(schema.properties.actualPersonParticipated.const, false);
});

test("an unrelated proposed page assignment does not stale the Colophon run", () => {
  const candidate = loadColophonCandidate();
  candidate.registry.pages.push({
    pageId: "unrelated-proposal",
    route: "/unrelated",
    status: "proposed",
    owners: []
  });

  const result = evaluateColophonPageOwners(candidate);
  assert.equal(result.pass, true, result.failures.join("\n"));
});

test("a change to the governed Colophon assignment does stale its run", () => {
  const candidate = loadColophonCandidate();
  const colophon = candidate.registry.pages.find(
    (page) => page.pageId === "colophon"
  );
  colophon.owners[0].focus = "Changed focus";

  const result = evaluateColophonPageOwners(candidate);
  assert.equal(result.pass, false);
  assert.match(result.failures.join("\n"), /editorial run is stale/);
});
