import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { corpus, materialize } from "./knowledge-reading-cases.mjs";
import { reviewReturn } from "./knowledge-reading.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const receiptPath = "evals/knowledge-reading/receipt.json";
const boundFiles = [
  "rfcs/0017-situated-knowledge-reading-and-reader-returns.md",
  "rfcs/README.md", "package.json", "scripts/check-rfcs.mjs",
  "evals/knowledge-reading/README.md", "evals/knowledge-reading/cases.json",
  "scripts/rfcs/knowledge-reading.mjs", "scripts/rfcs/knowledge-reading-cases.mjs",
  "scripts/rfcs/knowledge-reading.test.mjs", "scripts/rfcs/knowledge-reading-eval.mjs"
];
export function bindings(root = repoRoot) {
  return Object.fromEntries(boundFiles.map(file => [file, createHash("sha256").update(readFileSync(path.join(root, file))).digest("hex")]));
}
export function evaluateKnowledgeReading() {
  const results = corpus.cases.map(fixture => {
    const actual = reviewReturn(materialize(fixture), corpus.inventory);
    const passed = actual.decision === fixture.expected_decision && (!fixture.expected_reason || actual.reasons.includes(fixture.expected_reason)) && (actual.decision !== "hold" || actual.card === null);
    return { id: fixture.id, expected: fixture.expected_decision, actual: actual.decision, passed };
  });
  const valid = results.filter(row => row.expected === "review-candidate");
  const invalid = results.filter(row => row.expected === "hold");
  return {
    label_provenance: corpus.label_provenance,
    safe_acceptance: { accepted: valid.filter(row => row.passed).length, total: valid.length },
    unsafe_rejection: { held: invalid.filter(row => row.passed).length, total: invalid.length },
    allow_all_baseline: { correct: valid.length, total: results.length, scope: "explicit empty-policy baseline, not the prior production system" },
    results, passed: results.every(row => row.passed), human_semantic_accuracy: null,
    participant_pilot_completed: false, production_adoption: false
  };
}
export function verifyKnowledgeReadingReceipt(root = repoRoot) {
  const receipt = JSON.parse(readFileSync(path.join(root, receiptPath), "utf8"));
  if (JSON.stringify(receipt.bindings) !== JSON.stringify(bindings(root))) throw new Error("knowledge-reading receipt is stale; rerun evals:knowledge-reading:record");
  const evaluation = evaluateKnowledgeReading();
  if (!evaluation.passed || JSON.stringify(receipt.evaluation) !== JSON.stringify(evaluation)) throw new Error("knowledge-reading behavioral evaluation changed or failed");
  if (receipt.tests?.failed !== 0 || receipt.tests?.passed !== receipt.tests?.total || receipt.tests?.total < corpus.cases.length) throw new Error("knowledge-reading test receipt is incomplete");
  return receipt;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  if (process.argv.includes("--record")) {
    const test = spawnSync(process.execPath, ["--test", "--test-reporter=tap", "scripts/rfcs/knowledge-reading.test.mjs"], { cwd: repoRoot, encoding: "utf8" });
    if (test.status !== 0) { process.stderr.write(test.stdout + test.stderr); process.exit(1); }
    const count = label => Number(test.stdout.match(new RegExp(`^# ${label} (\\d+)$`, "m"))?.[1] ?? NaN);
    const evaluation = evaluateKnowledgeReading();
    if (!evaluation.passed) throw new Error("behavioral evaluation failed");
    const receipt = {
      schema_version: 1, scope: "synthetic RFC prototype; content-bound, not a release receipt",
      bindings: bindings(), evaluation,
      tests: { total: count("tests"), passed: count("pass"), failed: count("fail") },
      hill_climb: [
        { step: "empty prototype, original test specification", tests: 34, passed: 8, failed: 26 },
        { step: "initial guards and reader projection", tests: 34, passed: 34, failed: 0 },
        { step: "adversarial omission and source-identity refinement, before fix", tests: 39, passed: 34, failed: 5 },
        { step: "independent prior-inventory comparison and synthetic-reference guards", tests: 39, passed: 39, failed: 0 }
      ],
      history_note: "Observed local test-first runs on 2026-09-12; historical counts are observations, not rerun by this command. Current evaluation and complete file bindings are regenerated."
    };
    writeFileSync(path.join(repoRoot, receiptPath), JSON.stringify(receipt, null, 2) + "\n");
  }
  const receipt = verifyKnowledgeReadingReceipt();
  console.log(`Knowledge reading: ${receipt.evaluation.safe_acceptance.accepted}/${receipt.evaluation.safe_acceptance.total} valid accepted; ${receipt.evaluation.unsafe_rejection.held}/${receipt.evaluation.unsafe_rejection.total} invalid held; receipt current. Human pilot: not run.`);
}
