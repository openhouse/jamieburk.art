#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  runLaunchEvals,
  writeLaunchEvalReports
} from "./lib/launch-readiness-evals.mjs";
import {
  loadCompositeContract,
  validateConsecutiveCertification
} from "./lib/composite-eval-integrity.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contract = loadCompositeContract(repoRoot);
const reports = [];

for (let run = 0; run < contract.certification.consecutivePassingRuns; run += 1) {
  reports.push(runLaunchEvals(repoRoot));
}

const failures = validateConsecutiveCertification(reports, contract);
const finalReport = reports.at(-1);
writeLaunchEvalReports(repoRoot, finalReport);

const certificate = {
  suite: finalReport.suite,
  generatedAt: new Date().toISOString(),
  status: failures.length ? "fail" : "pass",
  candidate: finalReport.identity,
  contract: finalReport.contract,
  consecutiveRuns: reports.map((report, index) => ({
    run: index + 1,
    generatedAt: report.generatedAt,
    candidateId: report.identity.candidateId,
    score: report.summary.score,
    hardGatesPass: report.summary.hardGatesPass,
    automatedReady: report.summary.automatedReady
  })),
  failures,
  independentHoldout: "manual-required",
  productionApproval: "manual-required",
  deploymentAuthorization: false
};

const reportDir = path.join(repoRoot, "reports/generated");
mkdirSync(reportDir, { recursive: true });
writeFileSync(
  path.join(reportDir, "launch-certification.json"),
  `${JSON.stringify(certificate, null, 2)}\n`
);

console.log(`Candidate: ${certificate.candidate.candidateId}`);
console.log(`Git SHA: ${certificate.candidate.gitSha}`);
console.log(`Contract: ${certificate.contract.version}`);
for (const run of certificate.consecutiveRuns) {
  console.log(
    `Run ${run.run}: ${run.automatedReady ? "PASS" : "FAIL"} ` +
      `${run.score}/100 hard-gates=${run.hardGatesPass ? "PASS" : "FAIL"}`
  );
}

if (failures.length) {
  console.error("Candidate certification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Automated repeat certification: PASS");
console.log("Independent holdout: MANUAL REQUIRED");
console.log("Production approval: MANUAL REQUIRED");
