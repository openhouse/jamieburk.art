#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { evaluateMinimumViableFederationRFC } from "./rfcs/minimum-viable-federation-eval.mjs";
import { evaluatePrivateVaultSidecarRFC } from "./rfcs/private-vault-sidecar-eval.mjs";
import { evaluatePublicEngagementPathwayRFC } from "./rfcs/public-engagement-pathway-eval.mjs";
import { evaluateAudioKnowledgeWorkflowRFC } from "./rfcs/audio-to-knowledge-workflow-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rfcRoot = path.join(repoRoot, "rfcs");
const indexPath = path.join(rfcRoot, "README.md");
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
  "rfc",
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

if (!existsSync(rfcRoot)) {
  console.error("RFC check failed:\n- rfcs/ is missing");
  process.exit(1);
}

if (!existsSync(indexPath)) {
  fail(indexPath, "RFC index is missing");
}

const index = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : "";
const proposalFiles = readdirSync(rfcRoot)
  .filter((name) => /^\d{4}-.+\.md$/.test(name) && !name.startsWith("0000-"))
  .sort();
const seenNumbers = new Set();

if (!proposalFiles.length) {
  fail(indexPath, "at least one numbered proposal is required");
}

for (const name of proposalFiles) {
  const file = path.join(rfcRoot, name);
  const source = readFileSync(file, "utf8");
  const { data, content } = matter(source);
  const filenameNumber = Number(name.slice(0, 4));

  for (const field of requiredMetadata) {
    if (!Object.hasOwn(data, field)) fail(file, `missing front-matter field: ${field}`);
  }

  if (!Number.isInteger(data.rfc) || data.rfc <= 0) {
    fail(file, "rfc must be a positive integer");
  } else {
    if (data.rfc !== filenameNumber) fail(file, "front-matter rfc does not match filename");
    if (seenNumbers.has(data.rfc)) fail(file, `duplicate RFC number: ${data.rfc}`);
    seenNumbers.add(data.rfc);
  }

  if (!allowedStages.has(data.stage)) fail(file, `unknown stage: ${data.stage}`);
  if (!Array.isArray(data.authors) || data.authors.length === 0) fail(file, "authors must be a non-empty list");
  if (!Array.isArray(data.review_areas) || data.review_areas.length === 0) {
    fail(file, "review_areas must be a non-empty list");
  }
  if (!Array.isArray(data.supersedes)) fail(file, "supersedes must be a list");
  if (data.stage === "superseded" && !data.superseded_by) {
    fail(file, "superseded RFCs must name superseded_by");
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

try {
  const federationEvaluation = evaluateMinimumViableFederationRFC({ repoRoot });
  for (const criterion of federationEvaluation.hard_failures) {
    fail(
      path.join(rfcRoot, "0010-minimum-viable-federation-canary.md"),
      `minimum viable federation hard criterion failed: ${criterion}`
    );
  }
  for (const scenario of federationEvaluation.scenarios.results.filter((item) => !item.passed)) {
    fail(
      path.join(rfcRoot, "0010-minimum-viable-federation-canary.md"),
      `minimum viable federation scenario failed: ${scenario.id}`
    );
  }
} catch (error) {
  fail(
    path.join(rfcRoot, "0010-minimum-viable-federation-canary.md"),
    `minimum viable federation evaluation could not run: ${error.message}`
  );
}

try {
  const sidecarEvaluation = evaluatePrivateVaultSidecarRFC({ repoRoot });
  for (const criterion of sidecarEvaluation.hard_failures) {
    fail(
      path.join(rfcRoot, "0011-private-vault-sidecar.md"),
      `private vault sidecar hard criterion failed: ${criterion}`
    );
  }
  for (const scenario of sidecarEvaluation.scenarios.results.filter((item) => !item.passed)) {
    fail(
      path.join(rfcRoot, "0011-private-vault-sidecar.md"),
      `private vault sidecar scenario failed: ${scenario.id}`
    );
  }
} catch (error) {
  fail(
    path.join(rfcRoot, "0011-private-vault-sidecar.md"),
    `private vault sidecar evaluation could not run: ${error.message}`
  );
}

try {
  const pathwayEvaluation = evaluatePublicEngagementPathwayRFC({ repoRoot });
  for (const criterion of pathwayEvaluation.hard_failures) {
    fail(
      path.join(rfcRoot, "0012-public-engagement-pathway.md"),
      `public engagement pathway hard criterion failed: ${criterion}`
    );
  }
  for (const scenario of pathwayEvaluation.scenarios.results.filter((item) => !item.passed)) {
    fail(
      path.join(rfcRoot, "0012-public-engagement-pathway.md"),
      `public engagement pathway scenario failed: ${scenario.id}`
    );
  }
} catch (error) {
  fail(
    path.join(rfcRoot, "0012-public-engagement-pathway.md"),
    `public engagement pathway evaluation could not run: ${error.message}`
  );
}

try {
  const audioWorkflowEvaluation = evaluateAudioKnowledgeWorkflowRFC({ repoRoot });
  for (const criterion of audioWorkflowEvaluation.hard_failures) {
    fail(
      path.join(rfcRoot, "0013-governed-audio-to-knowledge-workflow.md"),
      `audio-to-knowledge workflow hard criterion failed: ${criterion}`
    );
  }
  for (const scenario of audioWorkflowEvaluation.scenarios.results.filter((item) => !item.passed)) {
    fail(
      path.join(rfcRoot, "0013-governed-audio-to-knowledge-workflow.md"),
      `audio-to-knowledge workflow scenario failed: ${scenario.id}`
    );
  }
} catch (error) {
  fail(
    path.join(rfcRoot, "0013-governed-audio-to-knowledge-workflow.md"),
    `audio-to-knowledge workflow evaluation could not run: ${error.message}`
  );
}

if (failures.length) {
  console.error("RFC check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `RFC check passed: ${proposalFiles.length} numbered proposal(s), all indexed, structurally valid, and behaviorally checked.`
);
