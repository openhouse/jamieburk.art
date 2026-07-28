import { execFileSync } from "node:child_process";

import {
  defaultRepoRoot,
  evaluatePreLaunchSuite,
  hashChangedContents,
  loadSuite,
  planChangedPaths
} from "./lib.mjs";

function gitLines(args) {
  try {
    return execFileSync("git", args, {
      cwd: defaultRepoRoot,
      encoding: "utf8"
    })
      .split(/\r?\n/)
      .map((value) => value.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

const { suite, contractSha256 } = loadSuite();
const contractResult = evaluatePreLaunchSuite(suite);
if (contractResult.errors.length) {
  console.error("Pre-launch eval contract failed:");
  for (const error of contractResult.errors) console.error(`- ${error}`);
  process.exit(1);
}
const changedPaths = [
  ...new Set([
    ...gitLines(["diff", "--name-only", `${suite.baseRef}...HEAD`]),
    ...gitLines(["diff", "--name-only"]),
    ...gitLines(["diff", "--cached", "--name-only"]),
    ...gitLines(["ls-files", "--others", "--exclude-standard"])
  ])
].sort();
const plan = planChangedPaths(changedPaths, suite);
const result = {
  suiteId: suite.suiteId,
  version: suite.version,
  contractSha256,
  changedContentSha256: hashChangedContents(defaultRepoRoot, changedPaths),
  changedPathCount: changedPaths.length,
  ...plan,
  holdoutPolicy: suite.modelHoldouts,
  releaseObservation: suite.releaseObservation
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(
    `Pre-launch eval plan passed: ${changedPaths.length} changed path(s), ` +
      `${plan.domains.length} affected domain(s), full suite ` +
      `${plan.fullSuiteRequired ? "required" : "deferred until candidate lock"}.`
  );
  for (const command of plan.iterationCommands) console.log(`- ${command}`);
  for (const reason of plan.reasons) console.log(`- reason: ${reason}`);
}
