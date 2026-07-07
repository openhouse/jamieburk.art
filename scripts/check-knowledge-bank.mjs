import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const errors = [];

const requiredFiles = [
  "docs/knowledge-bank/README.md",
  "docs/knowledge-bank/claims.json",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/approval-register.md",
  "docs/knowledge-bank/source-classes.md",
  "docs/knowledge-bank/public-safety.md",
  "docs/knowledge-bank/chad-lens.md",
  "docs/knowledge-bank/projection-map.md",
  "docs/knowledge-bank/launch-blockers.md",
  "docs/knowledge-bank/anti-claims.md"
];

const allowedStatuses = new Set([
  "approved",
  "known",
  "use-with-care",
  "softened-for-production",
  "pending-approval",
  "internal-only",
  "protected",
  "retired"
]);

function fail(message) {
  errors.push(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(repoRoot, file))) {
    fail(`${file} is missing`);
  }
}

let claims = [];
if (!errors.some((error) => error.includes("claims.json is missing"))) {
  try {
    const parsed = JSON.parse(readText("docs/knowledge-bank/claims.json"));
    claims = Array.isArray(parsed) ? parsed : parsed.claims;
    if (!Array.isArray(claims)) {
      fail("docs/knowledge-bank/claims.json must contain a top-level claims array");
      claims = [];
    }
  } catch (error) {
    fail(`docs/knowledge-bank/claims.json is invalid JSON: ${error.message}`);
  }
}

const ids = new Set();
for (const [index, claim] of claims.entries()) {
  const label = claim?.id ? `claim ${claim.id}` : `claim at index ${index}`;

  if (!claim || typeof claim !== "object" || Array.isArray(claim)) {
    fail(`${label} must be an object`);
    continue;
  }

  if (!claim.id || typeof claim.id !== "string") {
    fail(`${label} is missing string id`);
  } else if (ids.has(claim.id)) {
    fail(`${label} is duplicated`);
  } else {
    ids.add(claim.id);
  }

  if (!claim.status || typeof claim.status !== "string") {
    fail(`${label} is missing status`);
  } else if (!allowedStatuses.has(claim.status)) {
    fail(`${label} has unsupported status ${claim.status}`);
  }

  if (!claim.supportLevel || typeof claim.supportLevel !== "string") {
    fail(`${label} is missing supportLevel`);
  }

  if (!claim.recommendedPublicWording || typeof claim.recommendedPublicWording !== "string") {
    fail(`${label} is missing recommendedPublicWording`);
  }

  if (!Array.isArray(claim.allowedSurfaces) || claim.allowedSurfaces.length === 0) {
    fail(`${label} is missing allowedSurfaces`);
  }

  const sourceClasses = Array.isArray(claim.sourceClasses)
    ? claim.sourceClasses
    : claim.sourceClass
      ? [claim.sourceClass]
      : [];

  if (sourceClasses.length === 0) {
    fail(`${label} is missing sourceClass or sourceClasses`);
  }

  if (!claim.guardrail || typeof claim.guardrail !== "string") {
    fail(`${label} is missing guardrail`);
  }
}

if (fs.existsSync(path.join(repoRoot, "apps/www/src/data/claims.ts"))) {
  const appClaims = readText("apps/www/src/data/claims.ts");
  const homepageIds = [];
  const claimBlocks = appClaims.matchAll(
    /id:\s*"([^"]+)"[\s\S]*?allowedSurfaces:\s*\[([\s\S]*?)\]/g
  );

  for (const match of claimBlocks) {
    if (match[2].includes("homepage-proof-strip")) {
      homepageIds.push(match[1]);
    }
  }

  if (homepageIds.length === 0) {
    fail("apps/www/src/data/claims.ts does not expose homepage proof-strip claims");
  }

  for (const id of homepageIds) {
    if (!ids.has(id)) {
      fail(`homepage proof-strip claim ${id} is missing from docs/knowledge-bank/claims.json`);
    }
  }
}

const projectionText = fs.existsSync(path.join(repoRoot, "docs/knowledge-bank/projection-map.md"))
  ? readText("docs/knowledge-bank/projection-map.md")
  : "";

for (const requiredId of [
  "technical-operations-operating-backbone",
  "career-operating-structure",
  "hje-growth-supported",
  "crs-campaign-memory",
  "callnyc",
  "wowlist-multicity",
  "source-backed-team-memory"
]) {
  if (!ids.has(requiredId)) {
    fail(`${requiredId} is missing from claims.json`);
  }

  if (projectionText && !projectionText.includes(requiredId)) {
    fail(`${requiredId} is missing from projection-map.md`);
  }
}

if (errors.length) {
  console.error("Knowledge-bank check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Knowledge-bank check passed for ${claims.length} claims.`);
