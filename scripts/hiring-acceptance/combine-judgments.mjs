#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { validateJudgments } from "./lib.mjs";

const argument = (name) => { const index = process.argv.indexOf(name); return index >= 0 ? process.argv[index + 1] : undefined; };
const contextPath = argument("--context");
const outputPath = argument("--output");
const inputPaths = (argument("--inputs") ?? "").split(",").filter(Boolean);
if (!contextPath || !outputPath || inputPaths.length < 1) throw new Error("Usage: combine-judgments.mjs --context <context> --inputs <a,b> --output <file>");
const context = JSON.parse(readFileSync(contextPath, "utf8"));
const inputs = inputPaths.map((file) => JSON.parse(readFileSync(file, "utf8")));
const bindingFields = ["suiteId", "candidateSha", "portfolioSnapshotHash", "roleContextHash", "readerContextHash", "promptHash"];
for (const payload of inputs) for (const field of bindingFields) if (payload[field] !== context[field]) throw new Error(`${field} mismatch in judgment input`);
const combined = {
  ...Object.fromEntries(bindingFields.map((field) => [field, context[field]])),
  independentFromOptimizer: inputs.every((item) => item.independentFromOptimizer === true),
  judgeId: [...new Set(inputs.map((item) => item.judgeId))].join("+"),
  model: [...new Set(inputs.map((item) => item.model))].join("+"),
  reviews: inputs.flatMap((item) => item.reviews),
};
const errors = validateJudgments(combined, context);
if (errors.length) throw new Error(errors.join("; "));
writeFileSync(outputPath, `${JSON.stringify(combined, null, 2)}\n`);
console.log(`Combined ${combined.reviews.length} exact-context reviews.`);
