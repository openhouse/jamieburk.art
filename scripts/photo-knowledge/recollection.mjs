#!/usr/bin/env node

import { loadPhotoKnowledge } from "./lib.mjs";

function argument(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
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
const responseType = argument("--type", "recollection");
if (!["recollection", "correction", "no-action"].includes(responseType)) {
  console.error("Use --type recollection, correction, or no-action.");
  process.exit(1);
}

console.log(`---
id: source.${responseType}.todo
title: Dated ${responseType}
kind: source
status: draft
visibility: permission-required
sensitivity: moderate
last_reviewed: YYYY-MM-DD
canonical_path: TODO
summary: Human-authored ${responseType} awaiting review.
source_kind: ${responseType}
speaker: TODO
recorded: YYYY-MM-DD
asset_id: ${photoId}
occurrence_id: ${placementId}
route: ${placement.route}
projection:
  status: hold
  surfaces: []
relations: []
---

# Dated ${responseType}

## Response

TODO: preserve the speaker's account, correction, or considered no-action
response in their own voice.

## Boundary

This response concerns \`${photoId}\` at \`${placementId}\`. It is a research
and review input. It does not automatically alter a public page, establish a
count, speak for another person, or approve publication.`);
