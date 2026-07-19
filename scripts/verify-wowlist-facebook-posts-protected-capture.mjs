#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const requiredEnvironment = [
  "WOWLIST_FB_MANAGEMENT_CAPTURE",
  "WOWLIST_FB_DETAILS_CAPTURE",
  "WOWLIST_FB_PUBLISHER_AUDIT",
  "WOWLIST_FB_OWNER_EXPORT"
];

for (const name of requiredEnvironment) {
  assert.ok(process.env[name], `${name} must be set to an explicit protected input path`);
}

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const expectedProtectedDigests = {
  WOWLIST_FB_MANAGEMENT_CAPTURE: "8080cc686f60d1ea816693103903a03227fc2c4a234a7af5db8ba11184931130",
  WOWLIST_FB_DETAILS_CAPTURE: "c73b674810f3f88560cc76669b01431fc23a36aaeac3d071e4ba06eafd661596",
  WOWLIST_FB_PUBLISHER_AUDIT: "47fec1875af680ce4c813b9db48f1896438ff7244f0c557475f67cfc44cf035f",
  WOWLIST_FB_OWNER_EXPORT: "03c417f905f8fe6ab81df4e8fca7143424b5276e93ab2681a0f3f1599892ea13"
};

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
    .map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
};

const management = JSON.parse(readFileSync(process.env.WOWLIST_FB_MANAGEMENT_CAPTURE, "utf8"));
const details = JSON.parse(readFileSync(process.env.WOWLIST_FB_DETAILS_CAPTURE, "utf8"));
const audit = JSON.parse(readFileSync(process.env.WOWLIST_FB_PUBLISHER_AUDIT, "utf8"));
const ownerRows = parseCsv(readFileSync(process.env.WOWLIST_FB_OWNER_EXPORT, "utf8"));

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledger = JSON.parse(readFileSync(path.join(repoRoot, "docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population-2026-07-16.json"), "utf8"));

assert.equal(management.facebookPageId, "242582625948552");
assert.equal(management.records.length, 54);
assert.equal(details.records.length, 54);
assert.equal(details.records.filter((record) => record.publishedByJamie === true).length, 50);
assert.equal(details.records.filter((record) => record.publishedByJamie !== true).length, 4);
assert.deepEqual(
  details.records.map((record) => record.postId),
  management.records.map((record) => record.postId),
  "Legacy detail records must reconcile one-for-one to management IDs"
);
assert.deepEqual(
  details.records.map((record) => new Date(record.date).toISOString().slice(0, 10)),
  ledger.records.map((record) => record.publishedOn),
  "Legacy detail dates must reconcile to the public chronology"
);

assert.equal(audit.records.length, 57);
assert.equal(audit.records.filter((record) => record.liveDisposition === "available-post").length, 51);
assert.equal(audit.records.filter((record) => record.liveDisposition === "available-video-redirect").length, 3);
assert.equal(audit.records.filter((record) => record.liveDisposition === "unavailable").length, 3);
assert.equal(audit.records.filter((record) => record.publisherAttribution === "jamie-burkart").length, 51);

const canonicalAudit = audit.records.filter((record) => record.liveDisposition !== "unavailable");
assert.equal(canonicalAudit.length, 54);
assert.deepEqual(
  canonicalAudit.map((record) => record.postId),
  ledger.records.map((record) => record.postId),
  "Canonical publisher-audit order must reconcile to the public ledger"
);
assert.deepEqual(
  canonicalAudit.map((record) => ({
    postId: record.postId,
    detailRecovery: record.liveDisposition,
    publisherAttribution: record.publisherAttribution
  })),
  ledger.records.map((record) => ({
    postId: record.postId,
    detailRecovery: record.detailRecovery,
    publisherAttribution: record.publisherAttribution
  })),
  "Every canonical disposition and publisher attribution must reconcile to the public ledger"
);
assert.deepEqual(
  management.records.map((record) => record.postId),
  ledger.records.map((record) => record.managementContentId),
  "Legacy management IDs must reconcile to the public ledger"
);
assert.deepEqual(
  management.records.map((record) => new Date(record.date).toISOString().slice(0, 10)),
  ledger.records.map((record) => record.publishedOn),
  "Management dates must reconcile to the public chronology"
);

assert.equal(ownerRows.length, 29);
assert.ok(ownerRows.every((row) => row["Page name"] === "WOW List"));
assert.deepEqual(
  Object.fromEntries(
    [...new Set(ownerRows.map((row) => row["Page ID"]))]
      .sort()
      .map((pageId) => [pageId, ownerRows.filter((row) => row["Page ID"] === pageId).length])
  ),
  { "100079003246603": 7, "242582625948552": 22 },
  "The native export must retain the observed unresolved Page-ID split"
);
const ownerPostIds = ownerRows.map((row) => row["Post ID"]);
assert.deepEqual(
  ownerPostIds,
  ledger.records.slice(3, 32).map((record) => record.postId),
  "The recovered native owner export must exactly match canonical ordinals 4-32"
);
const ownerDateAgreement = ownerRows.map((row, index) => {
    const [month, day, year] = row["Publish time"].split(" ")[0].split("/");
    const ownerDate = `${year}-${month}-${day}`;
    const ledgerDate = ledger.records[index + 3].publishedOn;
    return {
      ordinal: index + 4,
      dayDifference: Math.round(
        (Date.parse(`${ledgerDate}T00:00:00Z`) - Date.parse(`${ownerDate}T00:00:00Z`)) /
          86_400_000
      )
    };
  });
assert.equal(ownerDateAgreement.filter((record) => record.dayDifference === 0).length, 27);
assert.deepEqual(
  ownerDateAgreement.filter((record) => record.dayDifference === 1).map((record) => record.ordinal),
  [12, 15],
  "Native owner-export date shifts must remain limited to the two known interface/timezone boundaries"
);
assert.ok(ownerDateAgreement.every((record) => record.dayDifference === 0 || record.dayDifference === 1));
const ownerPermalinks = ownerRows.map((row) => row.Permalink);
assert.ok(ownerPermalinks.every((url) => /^https:\/\/www\.facebook\.com\//.test(url)));
assert.equal(ownerPermalinks.filter((url) => /\/wowlist\/posts\/\d+$/.test(url)).length, 22);
assert.equal(ownerPermalinks.filter((url) => /\/photo\.php\?fbid=\d+/.test(url)).length, 1);
assert.equal(ownerPermalinks.filter((url) => /\/wowlist\/posts\/pfbid/.test(url)).length, 6);

const serializedLedger = JSON.stringify(ledger);
for (const key of [
  "Title",
  "Description",
  "Reach",
  "Reactions, Comments and Shares",
  "Reactions",
  "Comments",
  "Shares",
  "Total clicks",
  "Other Clicks",
  "Link Clicks"
]) {
  assert.ok(!serializedLedger.includes(`\"${key}\"`), `Protected owner-export field leaked: ${key}`);
}

console.log("Protected WOW List Facebook captures verified: 54 management records, 54 detail audits, 54 canonical public objects, 51 Page-publisher bylines, 3 video redirects, one exact 29-row native owner-export segment, its bounded two-Page-ID artifact, and 27/2 creation-date reconciliation.");
