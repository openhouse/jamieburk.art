#!/usr/bin/env node
import {
  contractDigest,
  evaluateCompositeStopCondition,
  governedInputDigest,
  loadCompositeRunRecords,
  loadContractVersion,
  loadEvalContract,
  validateCompositeRunRecord,
  validateEvalContract,
  validateRunSequence
} from "./lib/eval-contract.mjs";

const contract = loadEvalContract();
const current = {
  contractId: contract.id,
  contractVersion: contract.version,
  contractDigest: contractDigest(contract),
  governedInputDigest: governedInputDigest(contract),
  contract
};
const runs = loadCompositeRunRecords();
const errors = [...validateEvalContract(contract), ...validateRunSequence(runs)];
for (const { file, record } of runs) {
  const runContract = loadContractVersion(record.contract?.version);
  const isCurrent = record.contract?.version === contract.version;
  const expected = isCurrent ? current : { contractId: contract.id, contract: runContract };
  errors.push(...validateCompositeRunRecord(record, expected).map((error) => `${file}: ${error}`));
}
const stop = evaluateCompositeStopCondition(runs, contract);
if (runs.length === 0) errors.push("no composite run records exist");
if (!stop.acceptedForReview) errors.push(`composite stop condition not met: ${JSON.stringify(stop)}`);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`Composite eval contract ${contract.version} passes.`);
console.log(`Contract digest: ${current.contractDigest}`);
console.log(`Governed input digest: ${current.governedInputDigest}`);
console.log(`Stop condition: ${JSON.stringify(stop)}`);
