#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  compileAtlas,
  defaultRepoRoot,
  evaluateAtlas
} from "../src/corpus.mjs";
import { createAtlasService } from "../src/service.mjs";

const [command = "check", ...args] = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};
const generatedPath = path.join(defaultRepoRoot, "docs/atlas/generated/atlas.graph.json");

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function printEvaluation(evaluation) {
  for (const result of evaluation.results) {
    console.log(`${result.passed ? "PASS" : result.kind === "hard-gate" ? "FAIL" : "GAP "} ${result.id}: ${result.observed}`);
  }
  console.log(`Summary: ${evaluation.summary.hardGateFailures}/${evaluation.summary.hardGateTotal} hard gates failing; ${evaluation.summary.qualityTargetGaps}/${evaluation.summary.qualityTargetTotal} quality targets open.`);
  console.log(`Candidate: ${evaluation.candidateFingerprint}`);
}

try {
  const compiled = compileAtlas();
  const evaluation = evaluateAtlas(compiled);
  if (command === "generate") {
    mkdirSync(path.dirname(generatedPath), { recursive: true });
    writeFileSync(generatedPath, stableJson(compiled));
    console.log(`Wrote ${path.relative(defaultRepoRoot, generatedPath)}`);
  } else if (command === "compile") {
    console.log(stableJson(compiled));
  } else if (command === "eval") {
    const output = valueFor("--output");
    if (output) {
      const absolute = path.resolve(output);
      mkdirSync(path.dirname(absolute), { recursive: true });
      writeFileSync(absolute, stableJson(evaluation));
    }
    if (args.includes("--json")) console.log(stableJson(evaluation));
    else printEvaluation(evaluation);
  } else if (command === "query") {
    const service = createAtlasService(compiled);
    const result = service.query({
      text: valueFor("--text"),
      kind: valueFor("--kind"),
      tag: valueFor("--tag"),
      projectKey: valueFor("--project")
    });
    console.log(stableJson({ candidateFingerprint: compiled.candidateFingerprint, pages: result }));
  } else if (command === "explain") {
    const projectKey = valueFor("--project");
    if (!projectKey) throw new Error("Use --project <project-key>");
    console.log(stableJson(createAtlasService(compiled).explainProject(projectKey)));
  } else if (command === "check") {
    if (evaluation.summary.hardGateFailures || evaluation.summary.qualityTargetGaps) {
      printEvaluation(evaluation);
      process.exit(1);
    }
    const expected = stableJson(compiled);
    const current = readFileSync(generatedPath, "utf8");
    if (current !== expected) {
      console.error("Generated Atlas graph is stale. Run npm run atlas:generate.");
      process.exit(1);
    }
    printEvaluation(evaluation);
    console.log("Generated Atlas graph is current.");
  } else {
    throw new Error(`Unknown Atlas command: ${command}`);
  }
} catch (error) {
  console.error(`Atlas ${command} failed: ${error.message}`);
  process.exit(1);
}
