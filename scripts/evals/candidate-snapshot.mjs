#!/usr/bin/env node

import {
  currentLifecycleCandidateSnapshot,
  loadSuite as loadLifecycleSuite
} from "./lib/knowledge-lifecycle.mjs";
import {
  currentLaunchCandidateSnapshot,
  loadSuite as loadLaunchSuite
} from "./lib/launch-readiness.mjs";

const requested = process.argv.includes("--knowledge") ? "knowledge" :
  process.argv.includes("--launch") ? "launch" : "all";

const output = {};
if (["all", "knowledge"].includes(requested)) {
  const suite = loadLifecycleSuite();
  output.knowledgeLifecycle = currentLifecycleCandidateSnapshot(suite);
}
if (["all", "launch"].includes(requested)) {
  const suite = loadLaunchSuite();
  output.launchReadiness = currentLaunchCandidateSnapshot(suite);
}
console.log(JSON.stringify(output, null, 2));

