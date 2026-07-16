#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const capturePath =
  process.env.KCSPACESFUND_FACEBOOK_PROTECTED_CAPTURE ??
  "/private/tmp/kcspacesfund-facebook-posts-protected-capture-2026-07-16.json";
const expectedSha256 =
  "f591af30365fbad37b094c84f92cb49a7a0bdcd7653ee63926f5a9ebde072a03";

const buffer = readFileSync(capturePath);
const capture = JSON.parse(buffer.toString("utf8"));
const digest = createHash("sha256").update(buffer).digest("hex");

assert.equal(digest, expectedSha256, "protected capture digest drift");
assert.equal(capture.records?.length, 40, "protected capture population drift");

console.log(
  "KC Spaces Fund protected capture verified: 40 records; raw capture remains outside the public repository."
);
