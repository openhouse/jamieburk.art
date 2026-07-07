#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const proofPath = path.join(root, "apps/www/src/data/proofs.ts");
const source = readFileSync(proofPath, "utf8");
const failures = [];

const requiredProofIds = [
  "hje-ecommerce-modernization",
  "fairrent-campaign-memory",
  "callnyc-open-data-guidance",
  "wowlist-community-platform",
  "sunday-dinner-participation-infrastructure",
  "kc-town-hall-public-benefit",
  "source-backed-team-memory-method",
  "technical-operations-role-fit-pattern"
];

const allowedSurfaces = new Set([
  "homepage-proof-strip",
  "resume-page",
  "technical-operations-page",
  "work-case-study",
  "lab-page",
  "contact-page",
  "not-projected"
]);

function fail(message) {
  failures.push(message);
}

function extractProofBlocks(text) {
  const start = text.indexOf("const proofBankInput = [");
  const end = text.indexOf("] satisfies z.input<typeof proofSchema>[]", start);

  if (start === -1 || end === -1) {
    fail("apps/www/src/data/proofs.ts: proofBankInput array was not found.");
    return [];
  }

  const body = text.slice(text.indexOf("[", start) + 1, end);
  const blocks = [];
  let depth = 0;
  let blockStart = -1;
  let inString = false;
  let stringQuote = "";
  let previous = "";

  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];

    if (inString) {
      if (char === stringQuote && previous !== "\\") {
        inString = false;
        stringQuote = "";
      }
      previous = char;
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      inString = true;
      stringQuote = char;
      previous = char;
      continue;
    }

    if (char === "{") {
      if (depth === 0) blockStart = index;
      depth += 1;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0 && blockStart !== -1) {
        blocks.push(body.slice(blockStart, index + 1));
        blockStart = -1;
      }
    }

    previous = char;
  }

  return blocks;
}

function stringField(block, field) {
  const match = new RegExp(`${field}:\\s*"([^"]+)"`).exec(block);
  return match?.[1];
}

function arrayField(block, field) {
  const match = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`).exec(block);
  if (!match) return [];
  return Array.from(match[1].matchAll(/"([^"]+)"/g)).map((item) => item[1]);
}

const blocks = extractProofBlocks(source);
const seenIds = new Set();

for (const block of blocks) {
  const id = stringField(block, "id");
  if (!id) {
    fail("A proof entry is missing an id.");
    continue;
  }

  if (seenIds.has(id)) {
    fail(`${id}: duplicate proof id.`);
  }
  seenIds.add(id);

  for (const field of [
    "publicClaim",
    "safeShortWording",
    "approvalStatus",
    "supportLevel",
    "sourceClass"
  ]) {
    if (!new RegExp(`${field}:`).test(block)) {
      fail(`${id}: missing ${field}.`);
    }
  }

  const roleFit = arrayField(block, "roleFit");
  const protectedBoundaries = arrayField(block, "protectedBoundaries");
  const projectedOn = arrayField(block, "projectedOn");
  const approvalStatus = stringField(block, "approvalStatus");
  const hasExactMetric = /exactMetric:/.test(block);

  if (roleFit.length === 0) {
    fail(`${id}: roleFit must include at least one capability.`);
  }

  if (protectedBoundaries.length === 0) {
    fail(`${id}: protectedBoundaries must include at least one boundary.`);
  }

  if (projectedOn.length === 0) {
    fail(`${id}: projectedOn must include at least one surface.`);
  }

  for (const surface of projectedOn) {
    if (!allowedSurfaces.has(surface)) {
      fail(`${id}: projectedOn contains unknown surface "${surface}".`);
    }
  }

  const publiclyProjected = projectedOn.some((surface) => surface !== "not-projected");

  if (approvalStatus === "private-do-not-publish" && publiclyProjected) {
    fail(`${id}: private-do-not-publish proof is projected publicly.`);
  }

  if (hasExactMetric && publiclyProjected && approvalStatus !== "approved-public") {
    fail(`${id}: exactMetric is projected without approved-public status.`);
  }
}

for (const id of requiredProofIds) {
  if (!seenIds.has(id)) {
    fail(`Missing required proof entry: ${id}.`);
  }
}

if (!/homepageProofs = getProofsForSurface\("homepage-proof-strip"\)/.test(source)) {
  fail("homepageProofs must project from the knowledge bank.");
}

if (!/resumePageProofs = getProofsForSurface\("resume-page"\)/.test(source)) {
  fail("resumePageProofs must project from the knowledge bank.");
}

if (failures.length > 0) {
  console.error("Knowledge-bank check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Knowledge-bank check passed for ${seenIds.size} proofs.`);
