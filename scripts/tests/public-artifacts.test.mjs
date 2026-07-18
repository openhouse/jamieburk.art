import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { approvedResumeArtifact, validateResumeSource, validateResumeText } from "../lib/public-artifacts.mjs";

const root = path.resolve(import.meta.dirname, "../..");
const approvedText = readFileSync(path.join(root, approvedResumeArtifact.textPath), "utf8");
const approvedSource = readFileSync(path.join(root, approvedResumeArtifact.htmlPath), "utf8");

test("approved resume source and extracted PDF text satisfy the public contract", () => {
  assert.deepEqual(validateResumeSource(approvedSource), []);
  assert.deepEqual(validateResumeText(approvedText), []);
});

test("resume contract rejects sole-causality and appropriation-as-receipt claims", () => {
  assert.match(validateResumeText(`${approvedText}\nKC Town Hall secured a $490,539 public funding recommendation.`).join("\n"), /sole-causality/);
  assert.match(validateResumeText(`${approvedText}\nKC Town Hall received the $490,539.`).join("\n"), /appropriation-as-receipt/);
});

test("resume contract requires the complete KC Town Hall disposition", () => {
  const missingDisposition = approvedText.replace("returned to the fund after the project withdrew", "remained under review");
  assert.match(validateResumeText(missingDisposition).join("\n"), /later disposition/);
});
