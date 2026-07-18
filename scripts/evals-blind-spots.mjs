#!/usr/bin/env node
import {
  blindSpotIds,
  runBlindSpotEval
} from "./lib/blind-spot-evals.mjs";

let passes = true;
for (const id of blindSpotIds) {
  if (!runBlindSpotEval(id)) passes = false;
  console.log("");
}

if (!passes) process.exit(1);
console.log("All seven blind-spot criteria met with truthful state semantics.");
