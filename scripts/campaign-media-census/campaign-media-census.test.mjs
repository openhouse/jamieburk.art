import assert from "node:assert/strict";
import test from "node:test";

import { readFileSync } from "node:fs";
import path from "node:path";

import {
  censusRelativePath,
  defaultRepoRoot,
  evaluateCampaignMediaCensus
} from "./lib.mjs";

const source = readFileSync(
  path.join(defaultRepoRoot, censusRelativePath),
  "utf8"
);

test("accepts the complete public-safe campaign-media census", () => {
  const result = evaluateCampaignMediaCensus({ source });
  assert.deepEqual(result.errors, []);
  assert.equal(result.data.works.length, 430);
  assert.equal(result.data.researchScope.photoEntries, 225);
});

test("rejects private archive coordinates", () => {
  const result = evaluateCampaignMediaCensus({
    source: source.replace(
      '"opaqueId": "photo-family.nightlife-town-hall.2017.001"',
      '"opaqueId": "/Users/example/Pictures/System.photoslibrary"'
    )
  });
  assert.match(result.errors.join("\n"), /private path or identifier/);
});

test("rejects stale population totals", () => {
  const data = JSON.parse(source);
  data.researchScope.totalDistinctWorks -= 1;
  const result = evaluateCampaignMediaCensus({
    source: JSON.stringify(data)
  });
  assert.match(result.errors.join("\n"), /totalDistinctWorks/);
});
