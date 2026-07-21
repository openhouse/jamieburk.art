#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rfpRoot = path.join(repoRoot, "rfps");
const indexPath = path.join(rfpRoot, "README.md");
const failures = [];

const allowedStages = new Set([
  "proposed",
  "exploring",
  "accepted",
  "implementing",
  "operational",
  "recommended",
  "closed",
  "superseded"
]);

const requiredMetadata = [
  "rfp",
  "title",
  "stage",
  "start_date",
  "authors",
  "champion",
  "decision_owner",
  "review_areas",
  "implementation",
  "supersedes",
  "superseded_by"
];

const requiredSections = [
  "Summary",
  "Motivation",
  "Goals",
  "Non-goals",
  "Terminology",
  "Detailed design",
  "Security and privacy",
  "Publication workflow",
  "Rollout plan",
  "Decision gates",
  "Drawbacks",
  "Alternatives",
  "Unresolved questions"
];

function fail(file, message) {
  failures.push(`${path.relative(repoRoot, file)} - ${message}`);
}

if (!existsSync(rfpRoot)) {
  console.error("RFP check failed:\n- rfps/ is missing");
  process.exit(1);
}

if (!existsSync(indexPath)) {
  fail(indexPath, "RFP index is missing");
}

const index = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : "";
const proposalFiles = readdirSync(rfpRoot)
  .filter((name) => /^\d{4}-.+\.md$/.test(name) && !name.startsWith("0000-"))
  .sort();
const seenNumbers = new Set();

if (!proposalFiles.length) {
  fail(indexPath, "at least one numbered proposal is required");
}

for (const name of proposalFiles) {
  const file = path.join(rfpRoot, name);
  const source = readFileSync(file, "utf8");
  const { data, content } = matter(source);
  const filenameNumber = Number(name.slice(0, 4));

  for (const field of requiredMetadata) {
    if (!Object.hasOwn(data, field)) fail(file, `missing front-matter field: ${field}`);
  }

  if (!Number.isInteger(data.rfp) || data.rfp <= 0) {
    fail(file, "rfp must be a positive integer");
  } else {
    if (data.rfp !== filenameNumber) fail(file, "front-matter rfp does not match filename");
    if (seenNumbers.has(data.rfp)) fail(file, `duplicate RFP number: ${data.rfp}`);
    seenNumbers.add(data.rfp);
  }

  if (!allowedStages.has(data.stage)) fail(file, `unknown stage: ${data.stage}`);
  if (!Array.isArray(data.authors) || data.authors.length === 0) fail(file, "authors must be a non-empty list");
  if (!Array.isArray(data.review_areas) || data.review_areas.length === 0) {
    fail(file, "review_areas must be a non-empty list");
  }
  if (!Array.isArray(data.supersedes)) fail(file, "supersedes must be a list");
  if (data.stage === "superseded" && !data.superseded_by) {
    fail(file, "superseded RFPs must name superseded_by");
  }

  for (const section of requiredSections) {
    const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (!new RegExp(`^## ${escaped}$`, "m").test(content)) {
      fail(file, `missing required section: ${section}`);
    }
  }

  if (!index.includes(`./${name}`)) fail(indexPath, `index is missing ${name}`);

  const unsafePatterns = [
    [/\/(?:Users|Volumes)\//, "absolute local filesystem path"],
    [/-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/, "private key material"],
    [/\b(?:sk-proj-|ghp_|AKIA)[A-Za-z0-9_-]{12,}\b/, "credential-like token"]
  ];

  for (const [pattern, label] of unsafePatterns) {
    if (pattern.test(source)) fail(file, `contains ${label}`);
  }
}

if (failures.length) {
  console.error("RFP check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`RFP check passed: ${proposalFiles.length} numbered proposal(s), all indexed and structurally valid.`);
