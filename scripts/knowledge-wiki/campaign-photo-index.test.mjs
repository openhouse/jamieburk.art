import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  campaignPhotoSource,
  checkCampaignPhotoRecords,
  compileCampaignPhotoRecords
} from "./campaign-photo-index.mjs";

test("campaign photo census is public-safe, complete, and generated", () => {
  const result = compileCampaignPhotoRecords();
  assert.equal(result.summary.pages, 82);
  assert.equal(result.summary.occurrences, 529);
  assert.equal(result.summary.uniqueImages, 413);
  assert.equal(result.summary.photoEntries, 181);
  assert.equal(result.summary.matchedEntries, 29);
  assert.equal(result.summary.matchedLocalCandidates, 57);
  assert.equal(result.records.size, 181);

  for (const content of result.records.values()) {
    assert.doesNotMatch(content, /\/Users\/|\/Volumes\//);
    assert.match(content, /public_display_status: hold/);
    assert.match(content, /consent_state: review-needed/);
    assert.match(content, /rights_state: permission-needed/);
    assert.doesNotMatch(content, /rights_state: cleared/);
    assert.match(content, /network_upload: false/);
  }
  assert.equal(
    campaignPhotoSource.path,
    "docs/knowledge-bank/sources/nycac-campaign-site-media-census-2026-07.md"
  );
});

test("public campaign photo data excludes private Apple Photos capture times", () => {
  const source = readFileSync(
    "docs/knowledge-bank/data/campaign-site-photo-index.json",
    "utf8"
  );
  const data = JSON.parse(source);
  assert.equal(data.private_capture_timestamps_included, false);
  assert.doesNotMatch(source, /"date_range"/);
  for (const item of data.items) {
    assert.deepEqual(Object.keys(item.apple_photos).sort(), [
      "match_count",
      "match_state"
    ]);
  }
});

test("committed campaign photo records match the source data", () => {
  assert.equal(checkCampaignPhotoRecords().pass, true);
});
