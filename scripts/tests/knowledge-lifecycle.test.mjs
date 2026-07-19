import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  evaluateKnowledgeContracts,
  readJson,
  resultsAreGreen
} from "../lib/composite-evals.mjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const rubric = readJson(repoRoot, "docs/qa/knowledge-lifecycle-M.json");
const operatorLedger = readJson(
  repoRoot,
  "docs/knowledge-bank/operator-intake-M.json"
);

test("all composite knowledge lifecycle contracts pass", () => {
  const results = evaluateKnowledgeContracts({
    knowledgeBank,
    rubric,
    operatorLedger,
    repoRoot
  });
  assert.equal(
    resultsAreGreen(results),
    true,
    results.filter((result) => !result.pass).map((result) => result.id).join(", ")
  );
});

test("protected operator intake rejects a public URL", () => {
  const unsafeLedger = {
    ...operatorLedger,
    items: [
      ...operatorLedger.items,
      {
        id: "INT-TEST-PROTECTED-URL",
        receivedAt: "2026-07-17",
        submittedBy: "Eval fixture",
        kind: "artifact",
        visibility: "protected",
        summary: "Mutation fixture",
        sourceUrl: "https://example.com/private",
        projectHints: [],
        status: "captured",
        disposition: "Awaiting triage.",
        linkedRecordIds: []
      }
    ]
  };
  const result = evaluateKnowledgeContracts({
    knowledgeBank,
    rubric,
    operatorLedger: unsafeLedger,
    repoRoot
  }).find((item) => item.id === "KB-001");
  assert.equal(result.pass, false);
});
