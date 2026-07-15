import { evaluateIcloudTeamsArchive } from "./lib/icloud-teams-archive-eval.mjs";

const result = evaluateIcloudTeamsArchive();

for (const item of result.criteria) {
  console.log(`${item.pass ? "PASS" : "FAIL"} ${item.id}: ${item.description}`);
  console.log(`  ${item.evidence}`);
}

console.log(`\n${result.passed}/${result.total} iCloud Teams archive criteria passed.`);

if (!result.pass) process.exitCode = 1;
