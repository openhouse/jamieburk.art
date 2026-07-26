import { evaluateLayoutPhotography } from "./lib/layout-photography-eval.mjs";

const evaluation = evaluateLayoutPhotography();

console.log("Layout and photography eval");
for (const [id, passed] of Object.entries(evaluation.checks)) {
  console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
}
console.log(
  `Photo assets: ${evaluation.counts.projectedPhotoAssets}/` +
    `${evaluation.counts.requiredPhotoAssets} deliberately projected.`
);

if (!evaluation.passed) {
  console.error(`Failed: ${evaluation.failures.join(", ")}`);
  process.exit(1);
}

console.log("Layout and photography eval passed.");
