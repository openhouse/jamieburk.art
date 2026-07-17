#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  candidateContentHash,
  checkerVersion,
  currentCommit,
  evidenceSnapshotHash,
  evaluateSemanticGuards,
  isAncestor,
  rubricHashes,
  semanticGuardFixture
} from "./lib/eval-integrity.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const controlPlane = JSON.parse(
  readFileSync(path.join(repoRoot, "docs/qa/eval-control-plane-M.json"), "utf8")
);
const hashes = {
  candidateCommit: currentCommit(repoRoot),
  candidateContentHash: candidateContentHash(
    repoRoot,
    controlPlane.contentHashExcludes
  ),
  evidenceSnapshotHash: evidenceSnapshotHash(repoRoot),
  rubricHashes: rubricHashes(repoRoot, controlPlane.rubricPaths),
  policyHashes: rubricHashes(repoRoot, controlPlane.policyPaths)
};

if (process.argv.includes("--print-hashes")) {
  console.log(JSON.stringify(hashes, null, 2));
  process.exit(0);
}

const semanticResults = evaluateSemanticGuards(semanticGuardFixture());
const mutationIdsMatch =
  semanticResults.length === controlPlane.mutationAttacks.length &&
  semanticResults.every((result) =>
    controlPlane.mutationAttacks.includes(result.id)
  );
const receiptPath = path.join(repoRoot, controlPlane.receiptPath);
const receipt = existsSync(receiptPath)
  ? JSON.parse(readFileSync(receiptPath, "utf8"))
  : null;
const receiptChecks = [
  {
    id: "INT-001-control-plane",
    pass:
      controlPlane.canonicalRoot === "docs/qa" &&
      !existsSync(path.join(repoRoot, ".agents/evals")) &&
      !existsSync(path.join(repoRoot, "evals")) &&
      !existsSync(path.join(repoRoot, "docs/evals")) &&
      controlPlane.rubricPaths.every((relativePath) =>
        existsSync(path.join(repoRoot, relativePath))
      ) &&
      controlPlane.policyPaths.every((relativePath) =>
        existsSync(path.join(repoRoot, relativePath))
      ) &&
      controlPlane.humanProtocolPaths.every((relativePath) =>
        existsSync(path.join(repoRoot, relativePath))
      )
  },
  {
    id: "INT-002-semantic-guards",
    pass: mutationIdsMatch && semanticResults.every((result) => result.pass)
  },
  {
    id: "INT-003-exact-candidate-receipt",
    pass: Boolean(
      receipt &&
        /^\d{4}-\d{2}-\d{2}T/.test(receipt.timestamp) &&
        receipt.checkerVersion === checkerVersion &&
        receipt.command === "npm run check" &&
        receipt.result === "pass" &&
        receipt.reviewerClass === "deterministic-checker" &&
        receipt.candidateContentHash === hashes.candidateContentHash &&
        receipt.evidenceSnapshotHash === hashes.evidenceSnapshotHash &&
        JSON.stringify(receipt.rubricHashes) ===
          JSON.stringify(hashes.rubricHashes) &&
        JSON.stringify(receipt.policyHashes) ===
          JSON.stringify(hashes.policyHashes) &&
        isAncestor(repoRoot, receipt.candidateCommit) &&
        controlPlane.decisionStates.includes(receipt.decision)
    )
  },
  {
    id: "INT-004-authority-boundaries",
    pass: Boolean(
      receipt &&
        receipt.humanOutcomeState === "pending-human-review" &&
        receipt.productionApproval === "not-granted" &&
        receipt.modelJudgments?.length === 0
    )
  }
];

console.log(
  `Eval integrity: ${receiptChecks.filter((item) => item.pass).length}/${receiptChecks.length}`
);
for (const check of receiptChecks) {
  console.log(`${check.pass ? "PASS" : "FAIL"} ${check.id}`);
}

if (receiptChecks.some((check) => !check.pass)) {
  console.error(
    "Eval integrity failed. Refresh the exact-candidate receipt only after every deterministic gate passes."
  );
  process.exit(1);
}

console.log("Eval integrity criterion met.");
