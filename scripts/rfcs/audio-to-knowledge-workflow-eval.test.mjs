import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const suite = JSON.parse(
  readFileSync(
    path.join(repoRoot, "evals/knowledge-bank/audio-to-knowledge-workflow-rfc-evals.json"),
    "utf8"
  )
);

function mergeState(base, patch) {
  if (Array.isArray(base) || Array.isArray(patch)) return patch;
  if (!base || typeof base !== "object" || !patch || typeof patch !== "object") return patch;

  const result = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    result[key] =
      value && typeof value === "object" && !Array.isArray(value)
        ? mergeState(base[key] ?? {}, value)
        : value;
  }
  return result;
}

async function loadEvaluator() {
  try {
    return await import("./audio-to-knowledge-workflow-eval.mjs");
  } catch (error) {
    assert.fail(`audio workflow evaluator must be implemented: ${error.message}`);
  }
}

for (const scenario of suite.cases) {
  test(scenario.id, async () => {
    const { evaluateAudioKnowledgeWorkflow } = await loadEvaluator();
    const state = mergeState(suite.baseline, scenario.patch);

    assert.deepEqual(evaluateAudioKnowledgeWorkflow(state), scenario.expected);
  });
}
