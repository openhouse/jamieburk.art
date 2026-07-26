#!/usr/bin/env node

import { evaluatePhotoKnowledge } from "./lib.mjs";

if (process.argv.includes("--check")) {
  const evaluation = evaluatePhotoKnowledge();
  const required = [
    "photo_curatorial_authority_advisory",
    "photo_recollection_nonpublishing",
    "photo_protected_absence_first_class",
    "photo_human_gates_open"
  ];
  const failed = required.filter((criterion) => !evaluation.checks[criterion]);
  if (failed.length) {
    console.error(`Curatorial contract failed: ${failed.join(", ")}`);
    process.exit(1);
  }
  console.log(
    "Curatorial contract passed; the panel is advisory and cannot publish."
  );
  process.exit(0);
}

if (!process.argv.includes("--scaffold")) {
  console.error("Use --check or --scaffold.");
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      schemaVersion: 1,
      status: "proposal-only",
      commission: "Name the visitor problem and exact page occurrence.",
      blindPass: {
        observation: "",
        prohibited: "identity, authorship, emotion, impact, or event inference"
      },
      contextualPass: {
        interpretation: "",
        sourceIds: []
      },
      lead: "",
      alternative: "",
      dissentOrHold: "",
      exactOccurrence:
        "image + crop + typography + copy + caption + credit + sequence + viewport + action",
      authority:
        "Advisory only. Jamie, creators, represented people, and other named humans retain their gates.",
      projectionStatus: "hold"
    },
    null,
    2
  )
);
