import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { defaultSpec, evaluateResumePdf } from "./evaluate-tailored-resume-pdf.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const markdown = readFileSync(path.join(repoRoot, defaultSpec.sourceMarkdownPath));
const pdf = readFileSync(path.join(repoRoot, defaultSpec.pdfPath));

test("the exact OTI application PDF passes every structural and visual gate", () => {
  const result = evaluateResumePdf({ markdown, pdf });
  assert.equal(result.overall, "pass", JSON.stringify(result.checks, null, 2));
  assert.deepEqual(result.checks.map((check) => check.id), defaultSpec.hardGates);
});

test("the PDF evaluator rejects a source Markdown mismatch", () => {
  const result = evaluateResumePdf({ markdown: Buffer.concat([markdown, Buffer.from("\nchanged\n")]), pdf });
  assert.equal(result.checks.find((check) => check.id === "source-markdown-bound")?.pass, false);
  assert.equal(result.overall, "fail");
});

test("the PDF evaluator rejects a changed or truncated PDF", () => {
  const result = evaluateResumePdf({ markdown, pdf: pdf.subarray(0, pdf.length - 256) });
  assert.equal(result.checks.find((check) => check.id === "exact-pdf-bound")?.pass, false);
  assert.equal(result.checks.find((check) => check.id === "valid-pdf-envelope")?.pass, false);
  assert.equal(result.overall, "fail");
});

test("the visual record covers every page of the exact candidate", () => {
  const result = evaluateResumePdf({ markdown, pdf });
  assert.equal(result.pageCount, 2);
  assert.deepEqual(defaultSpec.visualInspection.pagesInspected, [1, 2]);
  assert.equal(result.checks.find((check) => check.id === "complete-visual-inspection")?.pass, true);
});
