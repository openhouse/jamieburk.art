import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("the layered graph CLI emits a deterministic read-only packet plan for a real Wiki seed", () => {
  const output = execFileSync(
    process.execPath,
    [
      "scripts/knowledge-wiki/layered-graph.mjs",
      "plan",
      "--seeds",
      "opportunity.nyc-oti.technical-operations-manager.782369",
      "--max-degree",
      "1"
    ],
    { cwd: repoRoot, encoding: "utf8" }
  );
  const result = JSON.parse(output);

  assert.equal(result.command, "plan");
  assert.equal(result.readOnly, true);
  assert.equal(result.sourceFingerprint.length, 64);
  assert.deepEqual(result.plan.seedIds, [
    "opportunity.nyc-oti.technical-operations-manager.782369"
  ]);
  assert.deepEqual(
    result.plan.packetFamilies.map((family) => family.id),
    [
      "per-seed:opportunity.nyc-oti.technical-operations-manager.782369",
      "union"
    ]
  );
  assert.equal(result.plan.evidenceExpansion.decision, "defer");
});
