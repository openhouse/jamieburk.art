import { evaluateProfessorLenses } from "./lib/professor-lens-eval.mjs";

const result = evaluateProfessorLenses();

if (!result.pass) {
  console.error("Professor lens evals failed:");
  for (const item of result.criteria.filter((criterion) => !criterion.pass)) {
    console.error(`- ${item.id}: ${item.description} (${item.evidence})`);
  }
  process.exit(1);
}

console.log(`Professor lens evals passed: ${result.passed}/${result.total} criteria.`);
