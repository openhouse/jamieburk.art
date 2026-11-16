import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluateColophonPageOwners,
  loadColophonCandidate
} from "./evaluate.mjs";

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
