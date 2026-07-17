import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluateBlindSpotControls,
  readJson,
  resultsAreGreen
} from "../lib/composite-evals.mjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const rubric = readJson(repoRoot, "docs/qa/blind-spot-readiness-M.json");
const controlPlane = readJson(repoRoot, "docs/qa/eval-control-plane-M.json");
const protocolTexts = Object.fromEntries(
  controlPlane.humanProtocolPaths.map((relativePath) => [
    relativePath,
    readFileSync(path.join(repoRoot, relativePath), "utf8")
  ])
);

test("all blind-spot controls pass without completing human outcomes", () => {
  const results = evaluateBlindSpotControls({
    rubric,
    controlPlane,
    protocolTexts
  });
  assert.equal(
    resultsAreGreen(results),
    true,
    results.filter((result) => !result.pass).map((result) => result.id).join(", ")
  );
  assert.ok(
    rubric.criteria.some((criterion) =>
      criterion.outcomeState.startsWith("pending")
    )
  );
});

test("an authoring agent cannot be represented as independent", () => {
  const changed = Object.fromEntries(
    Object.entries(protocolTexts).map(([key, value]) => [
      key,
      value.replace(/An authoring agent is not an independent reviewer\./gi, "")
    ])
  );
  const result = evaluateBlindSpotControls({
    rubric,
    controlPlane,
    protocolTexts: changed
  }).find((item) => item.id === "BS-005");
  assert.equal(result.pass, false);
});
