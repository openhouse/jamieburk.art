import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  evaluateInternalChampion,
  loadInternalChampionCandidate
} from "./team-memory-internal-champion-eval.mjs";
import { assertPublicSafeInternalChampionResult } from "./record-team-memory-internal-champion-run.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const evalScript = path.join(
  scriptDir,
  "team-memory-internal-champion-eval.mjs"
);

test("the current candidate clears deterministic checks before a hiring simulation", () => {
  const run = spawnSync(process.execPath, [evalScript, "--deterministic-only"], {
    encoding: "utf8"
  });

  assert.equal(run.status, 0, run.stderr || run.stdout);
  const result = JSON.parse(run.stdout);
  assert.equal(result.stage, "deterministic");
  assert.equal(result.passed, true, result.failures?.join("\n"));
});

test("the evaluator rejects a site packet missing an authorizable engagement signal", () => {
  const candidate = structuredClone(loadInternalChampionCandidate());
  const teamRoute = candidate.browserPacket.routes.find(
    (route) => route.routeLabel === "team-memory-start"
  );
  teamRoute.visibleText = teamRoute.visibleText.replace(
    "A two-week discovery and prototype sprint the team can authorize",
    "A possible future engagement"
  );

  const result = evaluateInternalChampion(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /two-week discovery/i);
});

test("the evaluator rejects an out-of-order public browser journey", () => {
  const candidate = structuredClone(loadInternalChampionCandidate());
  candidate.browserPacket.navigationSequence = [
    ...candidate.browserPacket.navigationSequence
  ].reverse();

  const result = evaluateInternalChampion(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /required public route sequence/i);
});

test("the evaluator rejects private locators from the isolated model input", () => {
  const candidate = structuredClone(loadInternalChampionCandidate());
  candidate.browserPacket.routes[0].visibleText +=
    " Source path: /Users/example/private-notes.md";

  const result = evaluateInternalChampion(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /private locator/i);
});

test("the evaluator rejects an expanded or missing human authorization boundary", () => {
  const candidate = structuredClone(loadInternalChampionCandidate());
  candidate.config.transmissionPolicy.prohibitedArtifacts =
    candidate.config.transmissionPolicy.prohibitedArtifacts.filter(
      (artifact) => artifact !== "raw transcripts"
    );

  const result = evaluateInternalChampion(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /human-authorized public-safe packet/i);
});

test("the evaluator rejects browser errors and an unserved resume", () => {
  const candidate = structuredClone(loadInternalChampionCandidate());
  candidate.browserPacket.browserErrors.push({
    level: "error",
    message: "Synthetic browser failure"
  });
  candidate.browserPacket.resumeArtifact.source = "unverified-copy";

  const result = evaluateInternalChampion(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /browser error/i);
  assert.match(result.failures.join("\n"), /exact public resume PDF/i);
});

test("the recorder rejects claims of actual participation or company authorization", () => {
  assert.throws(
    () =>
      assertPublicSafeInternalChampionResult({
        actualPeopleParticipated: true,
        actualCompanyDecision: false
      }),
    /misstates real-person participation/i
  );
  assert.throws(
    () =>
      assertPublicSafeInternalChampionResult({
        actualPeopleParticipated: false,
        actualCompanyDecision: true
      }),
    /company authorization/i
  );
});

test("the full gate stays closed until the exact simulation receipt passes", () => {
  const candidate = structuredClone(loadInternalChampionCandidate());
  candidate.run = {
    ...candidate.run,
    status: "not-run",
    result: null
  };

  const result = evaluateInternalChampion(candidate);
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /simulation receipt/i);
  assert.match(result.failures.join("\n"), /did not choose/i);
});
