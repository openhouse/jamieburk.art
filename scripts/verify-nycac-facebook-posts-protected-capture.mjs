#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const requiredEnvironment = [
  "NYCAC_FB_PRIVATE_CAPTURE",
  "NYCAC_FB_EXPORT_2017",
  "NYCAC_FB_EXPORT_2018",
  "NYCAC_FB_EXPORT_2019",
  "NYCAC_FB_EXPORT_2020",
  "NYCAC_FB_EXPORT_2021"
];

for (const name of requiredEnvironment) {
  assert.ok(process.env[name], `${name} must be set to an explicit protected input path`);
}

const expectedProtectedDigests = {
  NYCAC_FB_PRIVATE_CAPTURE:
    "fb71e342f8bf0bfa7f892d33d8e6706b375442e10bfb0c127a610b66c0620270",
  NYCAC_FB_EXPORT_2017:
    "48cef8c389a34e204f39df4c903daef7685d3906fbb54ba69690ee8c897f9687",
  NYCAC_FB_EXPORT_2018:
    "5fd55fb2b26b6ebcb6cb666626e9c3ed618689c02c02289e9daf7aa17f03ddfc",
  NYCAC_FB_EXPORT_2019:
    "fc7f675f281b4c49d8fe846f0e3de4c263473d0067e45a5b374d9750cd9f98fd",
  NYCAC_FB_EXPORT_2020:
    "a3cabaf7593197b6af7f877f90c5490e33a427ed1c40aa2a88a64617eb0d9300",
  NYCAC_FB_EXPORT_2021:
    "fa3f3f3e60b4463ea018ae4df8406408b88cc1b6cf8196c63b8fad5e0554b32d"
};

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

for (const [name, expected] of Object.entries(expectedProtectedDigests)) {
  assert.equal(sha256(readFileSync(process.env[name])), expected, `${name} digest changed`);
}

const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  const headers = rows.shift().map((header) => header.replace(/^\uFEFF/, ""));
  return rows
    .filter((values) => values.some(Boolean))
    .map((values) =>
      Object.fromEntries(
        headers.map((header, index) => [header, values[index] ?? ""])
      )
    );
};

const number = (value) => Number(value || 0);
const sum = (rows, key) => rows.reduce((total, row) => total + number(row[key]), 0);
const digestSet = (values) => sha256(`${[...values].sort().join("\n")}\n`);

const exportsByYear = Object.fromEntries(
  [2017, 2018, 2019, 2020, 2021].map((year) => [
    year,
    parseCsv(readFileSync(process.env[`NYCAC_FB_EXPORT_${year}`], "utf8"))
  ])
);
const ownerRows = Object.values(exportsByYear).flat();

assert.deepEqual(
  Object.fromEntries(
    Object.entries(exportsByYear).map(([year, rows]) => [year, rows.length])
  ),
  { 2017: 185, 2018: 74, 2019: 111, 2020: 69, 2021: 5 }
);
assert.equal(ownerRows.length, 444);
assert.equal(new Set(ownerRows.map((row) => row["Post ID"])).size, 444);
assert.ok(ownerRows.every((row) => row["Page name"] === "NYC Artist Coalition"));
assert.equal(
  digestSet(ownerRows.map((row) => row["Post ID"])),
  "9b5c1fc6243f4ad497beea21ef12e74e8fe92e4d23f127df5413bc064217e5b2"
);
assert.deepEqual(
  [...Object.values(Object.groupBy(ownerRows, (row) => row["Page ID"]))]
    .map((rows) => rows.length)
    .sort((a, b) => a - b),
  [90, 354],
  "The two-Page-ID export artifact changed"
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(exportsByYear).map(([year, rows]) => [
      year,
      rows.every(
        (row) => row["Publish time"].split("/")[2]?.split(" ")[0] === year
      )
    ])
  ),
  { 2017: true, 2018: true, 2019: true, 2020: true, 2021: true },
  "Annual export year boundaries changed"
);

assert.deepEqual(
  {
    reactions: sum(ownerRows, "Reactions"),
    comments: sum(ownerRows, "Comments"),
    shares: sum(ownerRows, "Shares"),
    reach: sum(ownerRows, "Reach"),
    totalClicks: sum(ownerRows, "Total clicks"),
    otherClicks: sum(ownerRows, "Other Clicks"),
    linkClicks: sum(ownerRows, "Link Clicks")
  },
  {
    reactions: 2589,
    comments: 295,
    shares: 552,
    reach: 48044,
    totalClicks: 2190,
    otherClicks: 1411,
    linkClicks: 204
  }
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(Object.groupBy(ownerRows, (row) => row["Post type"].toLowerCase()))
      .map(([type, rows]) => [type, rows.length])
      .sort(([a], [b]) => a.localeCompare(b))
  ),
  { links: 131, photos: 116, text: 172, videos: 25 }
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(Object.groupBy(ownerRows, (row) => row["Is share"]))
      .map(([state, rows]) => [state, rows.length])
      .sort(([a], [b]) => a.localeCompare(b))
  ),
  { 0: 303, 1: 141 }
);

const protectedCapture = JSON.parse(
  readFileSync(process.env.NYCAC_FB_PRIVATE_CAPTURE, "utf8")
);
assert.equal(protectedCapture.posts.length, 598);
assert.equal(protectedCapture.terminalStableTurns, 7);
assert.equal(protectedCapture.crawlLog.length, 166);

const captureIdentity = (record) => {
  for (const link of record.links ?? []) {
    try {
      const identity = new URL(link.href).searchParams.get("__cft__[0]");
      if (identity) return identity;
    } catch {}
  }
  throw new Error("Protected feed row is missing its reconciliation identity");
};

const uniqueCaptureIdentities = new Set(
  protectedCapture.posts.map(captureIdentity)
);
assert.equal(uniqueCaptureIdentities.size, 445);
const protectedCaptureHashes = [...uniqueCaptureIdentities].map((identity) =>
  sha256(`nycac-facebook-post-reconciliation-v1:\0${identity}`)
);
assert.equal(protectedCaptureHashes.length, 445);

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpus = JSON.parse(
  readFileSync(
    path.join(
      repoRoot,
      "docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.json"
    ),
    "utf8"
  )
);
const publicHashes = corpus.population.map(
  (record) => record.reconciliationKeySha256
);
assert.deepEqual(
  [...protectedCaptureHashes].sort(),
  [...publicHashes].sort(),
  "Protected feed identities must reconcile exactly to all 445 public rows"
);
assert.equal(
  digestSet(publicHashes),
  "79add9a8e36d93d41c0b30ddf233c39c3fe59fe4014db0b96f769ec98cf1ce5c"
);

const serializedCorpus = JSON.stringify(corpus);
for (const protectedField of [
  "Title",
  "Description",
  "Post ID",
  "Page ID",
  "Permalink",
  "commenterIdentity",
  "reactionIdentity",
  "authenticatedUrl"
]) {
  assert.ok(
    !serializedCorpus.includes(`\"${protectedField}\"`),
    `Protected field leaked into public corpus: ${protectedField}`
  );
}

console.log(
  "Protected NYC Artist Coalition Facebook captures verified: five annual exports with 444 unique owner rows, 598 feed render rows, all 445 private feed identities represented by exact public reconciliation hashes, aggregate owner metrics, and the two-Page-ID export artifact. The surfaces are complete independently; no row-level crosswalk is asserted."
);
