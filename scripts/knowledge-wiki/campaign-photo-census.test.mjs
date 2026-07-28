import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  classifyCampaignImage,
  validateCensus
} from "./campaign-photo-census.mjs";

const census = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/data/campaign-site-image-census-2026-07.json",
    "utf8"
  )
);

test("distinguishes photographs from interface and reference assets", () => {
  assert.equal(
    classifyCampaignImage("s/photos/coalition-meeting-1200.jpg").kind,
    "campaign-photograph"
  );
  assert.equal(
    classifyCampaignImage("city-council/images/headshots/256x256/espinal.jpg")
      .kind,
    "public-official-reference-portrait"
  );
  assert.equal(
    classifyCampaignImage("img/press/logos/web/new-yorker.png").photoLike,
    false
  );
});

test("committed census is internally complete and public-safe", () => {
  assert.deepEqual(validateCensus(census), []);
  assert.ok(census.summary.totalImageEntries > 100);
  assert.ok(census.summary.photoLikeEntries > 25);
  assert.ok(census.scope.siteCount >= 5);
});

test("every entry keeps portfolio reuse human-gated", () => {
  assert.ok(
    census.entries.every(
      (entry) => entry.portfolioReuse === "human-review-required"
    )
  );
});
