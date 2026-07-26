#!/usr/bin/env node

import {
  buildWithdrawalPlan,
  loadPhotoKnowledge
} from "./lib.mjs";

const photoIndex = process.argv.indexOf("--photo");
const photoId =
  photoIndex >= 0
    ? process.argv[photoIndex + 1]
    : "photo.east-river-manhattan-bridge.2022";

try {
  const plan = buildWithdrawalPlan(loadPhotoKnowledge(), photoId);
  console.log(JSON.stringify(plan, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
