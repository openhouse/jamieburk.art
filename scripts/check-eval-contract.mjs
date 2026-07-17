#!/usr/bin/env node
import {
  contractDigest,
  evaluateCompositeStopCondition,
  governedInputDigest,
  loadCompositeRunRecords,
  loadEvalContract,
  validateCompositeRunRecord,
  validateEvalContract
} from "./lib/eval-contract.mjs";

const contract = loadEvalContract();
const expected = {
  contractId: contract.id,
  contractVersion: contract.version,
  contractDigest: contractDigest(contract),
  governedInputDigest: governedInputDigest(contract)
};
const runs = loadCompositeRunRecords();
const errors = [...validateEvalContract(contract)];
for (const { file, record } of runs) {
  errors.push(...validateCompositeRunRecord(record, expected).map((error) => `${file}: ${error}`));
}
for (let index = 1; index < runs.length; index += 1) {
  if (runs[index].record.previousRunId !== runs[index - 1].record.id) {
    errors.push(`${runs[index].file}: previousRunId must name ${runs[index - 1].record.id}`);
  }
}
const stop = evaluateCompositeStopCondition(runs, contract);
if (runs.length === 0) errors.push("no composite run records exist");
if (!stop.acceptedForReview) errors.push(`composite stop condition not met: ${JSON.stringify(stop)}`);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`Composite eval contract ${contract.version} passes.`);
console.log(`Contract digest: ${expected.contractDigest}`);
console.log(`Governed input digest: ${expected.governedInputDigest}`);
console.log(`Stop condition: ${JSON.stringify(stop)}`);
