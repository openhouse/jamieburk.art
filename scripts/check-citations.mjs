import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getClaimProjection,
  resolveCitationOccurrence
} from "../apps/www/src/data/knowledge-bank/public.ts";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";
import {
  findNycaOverclaims,
  nycaResearchClaimText
} from "./lib/nyca-claim-guard.mjs";
import { validateKnowledgeBank } from "./lib/citation-validation.mjs";

execFileSync(process.execPath, ["scripts/generate-public-citations.mjs", "--check"], { stdio: "inherit" });
const errors = validateKnowledgeBank();

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workContentRoot = path.join(repoRoot, "apps/www/src/content/work");
const attributePattern = /(claimId|projection|surface|pageId|occurrenceId)="([^"]+)"/g;

const nycaClaimIds = [
  "CLM-NYCA-SHARED-SOCIAL-IDENTITY",
  "CLM-NYCA-COUNCIL-MEMBER-ACCOUNT-ENGAGEMENT",
  "CLM-NYCA-SHARED-PUBLISHING-SYSTEM-RANGE"
];
const nycaClaims = new Map(
  knowledgeBank.claims
    .filter((claim) => nycaClaimIds.includes(claim.id))
    .map((claim) => [claim.id, claim])
);

for (const claimId of nycaClaimIds) {
  if (!nycaClaims.has(claimId)) errors.push(`Missing governed NYC Artist Coalition claim ${claimId}`);
}

const nycaProofText = proofClaims
  .filter((claim) => claim.structuredClaimIds?.some((claimId) => nycaClaimIds.includes(claimId)))
  .flatMap((claim) => [claim.publicWording, claim.shortWording, claim.detailedPublicWording])
  .filter(Boolean);
const nycaLiveText = [
  ...nycaClaims.values().flatMap((claim) => [
    claim.internalClaim,
    ...claim.projections.filter((projection) => projection.status === "active").map((projection) => projection.text)
  ]),
  ...nycaProofText,
  readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8"),
  readFileSync(path.join(repoRoot, "apps/www/src/content/work/fair-rent-nyc.mdx"), "utf8")
].join("\n");
const nycaArchiveClaimText = [
  nycaResearchClaimText(
    readFileSync(
      path.join(repoRoot, "docs/knowledge-bank/projects/nycartc-x-population-2026-07-14.md"),
      "utf8"
    )
  ),
  readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/data/nycartc-public-post-ledger.json"),
    "utf8"
  ),
  readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/data/nycartc-public-engagement-ledger.json"),
    "utf8"
  )
].join("\n");

for (const { label } of findNycaOverclaims(`${nycaLiveText}\n${nycaArchiveClaimText}`)) {
  errors.push(`NYC Artist Coalition public evidence crosses the ${label} boundary`);
}

const nycaSharedIdentity = nycaClaims.get("CLM-NYCA-SHARED-SOCIAL-IDENTITY");
const nycaCouncilEngagement = nycaClaims.get("CLM-NYCA-COUNCIL-MEMBER-ACCOUNT-ENGAGEMENT");
const nycaPopulationRange = nycaClaims.get("CLM-NYCA-SHARED-PUBLISHING-SYSTEM-RANGE");
const activeText = (claim) =>
  claim?.projections.filter((projection) => projection.status === "active").map((projection) => projection.text).join("\n") ?? "";

if (!/Teammates also published.*not attributed to Jamie/is.test(activeText(nycaSharedIdentity))) {
  errors.push("NYC Artist Coalition shared-identity projection must preserve the shared-authorship boundary");
}
if (!/account-level evidence.*not formal endorsement.*personal authorship/is.test(activeText(nycaCouncilEngagement))) {
  errors.push("NYC Artist Coalition Council-engagement projection must preserve account, endorsement, and authorship boundaries");
}
if (nycaPopulationRange?.projections.some((projection) => projection.status === "active" || projection.surfaces.length > 0)) {
  errors.push("NYC Artist Coalition full-population projection must remain held and bank-only until editorial promotion");
}
if (!nycaPopulationRange?.boundaries.some((boundary) => /complete disposition is not complete item recovery/i.test(boundary))) {
  errors.push("NYC Artist Coalition population claim is missing its complete-accounting recovery boundary");
}

const repoBlobPattern =
  /^https:\/\/github\.com\/openhouse\/jamieburk\.art\/blob\/([^/]+)\/([^#?]+)(?:[#?].*)?$/i;
for (const source of knowledgeBank.sources) {
  const match = source.canonicalUrl?.match(repoBlobPattern);
  if (!match) continue;

  const [, revision, sourcePath] = match;
  if (!/^[0-9a-f]{40}$/i.test(revision)) {
    errors.push(`Repo-local source ${source.id} must use a full immutable commit SHA, not ${revision}`);
    continue;
  }

  try {
    execFileSync("git", ["cat-file", "-e", `${revision}:${decodeURIComponent(sourcePath)}`], {
      cwd: repoRoot,
      stdio: "ignore"
    });
  } catch {
    errors.push(`Repo-local source ${source.id} does not exist at ${revision}:${sourcePath}`);
  }
}

for (const filename of readdirSync(workContentRoot).filter((item) => item.endsWith(".mdx"))) {
  const relativePath = path.join("apps/www/src/content/work", filename);
  const source = readFileSync(path.join(repoRoot, relativePath), "utf8");

  for (const match of source.matchAll(/<Claim\b([\s\S]*?)\/>/g)) {
    const attributes = Object.fromEntries(
      [...match[1].matchAll(attributePattern)].map((item) => [item[1], item[2]])
    );

    for (const required of ["claimId", "projection", "surface"]) {
      if (!attributes[required]) errors.push(`${relativePath} has a Claim without ${required}`);
    }
    if (!attributes.claimId || !attributes.projection || !attributes.surface) continue;

    let projection;
    try {
      projection = getClaimProjection(
        attributes.claimId,
        attributes.projection,
        attributes.surface
      );
    } catch (error) {
      errors.push(`${relativePath} cannot resolve ${attributes.claimId}: ${error.message}`);
      continue;
    }

    if (!projection.citationRequired) continue;
    if (!attributes.pageId || !attributes.occurrenceId) {
      errors.push(`${relativePath} must cite ${attributes.claimId} with pageId and occurrenceId`);
      continue;
    }

    try {
      const resolved = resolveCitationOccurrence(attributes.pageId, attributes.occurrenceId);
      if (resolved.occurrence.claimId !== attributes.claimId) {
        errors.push(
          `${relativePath} maps ${attributes.pageId}/${attributes.occurrenceId} to ` +
            `${resolved.occurrence.claimId}, not ${attributes.claimId}`
        );
      }
    } catch (error) {
      errors.push(
        `${relativePath} cannot resolve ${attributes.pageId}/${attributes.occurrenceId}: ` +
          error.message
      );
    }
  }
}

if (errors.length) {
  console.error("Citation validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Citation check passed: canonical records, public projection, boundaries, and page plans are consistent.");
