#!/usr/bin/env node
import { validateProjectionConsistency } from "./lib/projection-consistency.mjs";

const errors = validateProjectionConsistency();
if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log("Projection consistency passes across canonical records, public surfaces, citations, and the generated registry.");
