import { evaluateCompositeIntegration } from "./lib/composite-integration-eval.mjs";

const result = evaluateCompositeIntegration();

for (const item of result.criteria) {
  const label = item.pass ? "PASS" : "FAIL";
  console.log(`${label} ${item.id}: ${item.evidence}`);
  for (const finding of item.findings) console.log(`  - ${finding}`);
}

if (!result.accepted) {
  console.error(`Composite integration eval failed: ${result.score}/${result.scoreMaximum}.`);
  process.exit(1);
}

console.log(
  `Composite integration eval passed: ${result.score}/${result.scoreMaximum}; ` +
  `rubric ${result.rubricSha256}; candidate ${result.candidateFingerprint}.`
);
