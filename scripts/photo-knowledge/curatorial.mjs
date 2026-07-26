#!/usr/bin/env node

import {
  evaluatePhotoKnowledge,
  loadPhotoKnowledge
} from "./lib.mjs";

function argument(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

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

if (!process.argv.includes("--run")) {
  console.error("Use --check or --run.");
  process.exit(1);
}

const manifest = loadPhotoKnowledge();
const photoId = argument(
  "--photo",
  "photo.east-river-manhattan-bridge.2022"
);
const photo = manifest.photos.find((item) => item.id === photoId);
if (!photo) {
  console.error(`Unknown photo: ${photoId}`);
  process.exit(1);
}
const placementId = argument("--placement", photo.placements[0]?.id);
const placement = photo.placements.find((item) => item.id === placementId);
if (!placement) {
  console.error(`Unknown placement for ${photoId}: ${placementId}`);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      schemaVersion: 1,
      status: "proposal-only",
      proposalId: `curatorial.${photoId}.${placementId}`,
      commission:
        argument(
          "--commission",
          `Test whether ${photoId} helps a stranger understand ${placement.role} at ${placement.route}.`
        ),
      asset: {
        id: photo.id,
        derivativeId: photo.derivativeId,
        creatorState: photo.creatorState,
        permissionState: photo.permissionState,
        productionApproval: photo.productionApproval
      },
      occurrence: {
        id: placement.id,
        route: placement.route,
        component: placement.component,
        crop: placement.crop,
        role: placement.role,
        alt: photo.alt,
        caption: photo.caption,
        credit: photo.credit,
        sequence: manifest.edition.id,
        viewportQuestion:
          "Review the complete occurrence on mobile and desktop.",
        actionQuestion:
          "Name what the visitor can understand or do after encountering it."
      },
      blindPass: {
        observationPrompt:
          "Describe only visible people, place, material, action, framing, and legibility before reading context.",
        observation: "Human editor response required.",
        prohibited: "identity, authorship, emotion, impact, or event inference"
      },
      contextualPass: {
        interpretationPrompt:
          "After source review, state what the occurrence may responsibly help communicate and what remains unknown.",
        knownContext: {
          caption: photo.caption,
          credit: photo.credit,
          creatorState: photo.creatorState,
          permissionState: photo.permissionState
        },
        sourceIds: [photo.id]
      },
      lead: {
        proposal: "Retain the currently authored occurrence for comparison.",
        automaticSelection: false
      },
      alternative: {
        proposal:
          "Render the same page region without the photograph and compare reader understanding, dignity, rhythm, and action.",
        automaticSelection: false
      },
      dissentOrHold: {
        proposal:
          "Hold the occurrence if source, rights, consent, credit, crop, caption, dignity, or usefulness remains unresolved.",
        currentHumanGates: [
          "Jamie editorial selection",
          "creator and rights review",
          "represented-person consent where applicable",
          "exact credit and crop",
          "production publication and indexing"
        ]
      },
      exactOccurrence:
        "image + crop + typography + copy + caption + credit + sequence + viewport + action",
      authority:
        "Advisory only. Jamie, creators, represented people, and other named humans retain their gates.",
      projectionStatus: "hold",
      writesApplied: false
    },
    null,
    2
  )
);
