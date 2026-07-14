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
import {
  findUrbanHermitOverclaims,
  urbanHermitPublicClaimText,
  urbanHermitResearchClaimText
} from "./lib/urbanhermit-claim-guard.mjs";
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

const urbanHermitClaimIds = [
  "CLM-URBANHERMIT-CURRENT-POPULATION-ACCOUNTING",
  "CLM-URBANHERMIT-SOURCE-ROUTING",
  "CLM-URBANHERMIT-INBOUND-ENGAGEMENT-FLOOR",
  "CLM-URBANHERMIT-PRACTICE-THREADS",
  "CLM-KC-EIGHTH-STREET-TUNNEL-PUBLIC-PROGRAM",
  "CLM-HORSE-LORDS-TRUTHERS-VIDEO",
  "CLM-MUSIC-HACKATHON-WOWLIST-ROLE"
];
const urbanHermitClaims = new Map(
  knowledgeBank.claims
    .filter((claim) => urbanHermitClaimIds.includes(claim.id))
    .map((claim) => [claim.id, claim])
);

for (const claimId of urbanHermitClaimIds) {
  if (!urbanHermitClaims.has(claimId)) errors.push(`Missing governed @urbanhermit claim ${claimId}`);
}

const urbanHermitProofText = proofClaims
  .filter((claim) => claim.structuredClaimIds?.some((claimId) => urbanHermitClaimIds.includes(claimId)))
  .flatMap((claim) => [claim.publicWording, claim.shortWording, claim.detailedPublicWording])
  .filter(Boolean);
const urbanHermitReportText = readFileSync(
  path.join(repoRoot, "docs/knowledge-bank/projects/urbanhermit-x-population-2026-07-14.md"),
  "utf8"
);
const urbanHermitPostLedgerText = readFileSync(
  path.join(repoRoot, "docs/knowledge-bank/data/urbanhermit-public-post-ledger.json"),
  "utf8"
);
const urbanHermitEngagementLedgerText = readFileSync(
  path.join(repoRoot, "docs/knowledge-bank/data/urbanhermit-public-engagement-ledger.json"),
  "utf8"
);
const urbanHermitHumanText = [
  "README.md",
  "claims.md",
  "proofs.md",
  "sources.md",
  "projection-map.md"
]
  .map((filename) =>
    urbanHermitPublicClaimText(
      readFileSync(path.join(repoRoot, "docs/knowledge-bank", filename), "utf8")
    )
  )
  .join("\n");
const urbanHermitClaimText = [
  ...urbanHermitClaims.values().flatMap((claim) => [
    claim.internalClaim,
    ...claim.projections.filter((projection) => projection.status === "active").map((projection) => projection.text)
  ]),
  ...urbanHermitProofText,
  urbanHermitResearchClaimText(urbanHermitReportText),
  urbanHermitHumanText,
  urbanHermitPostLedgerText,
  urbanHermitEngagementLedgerText
].join("\n");

for (const { label } of findUrbanHermitOverclaims(urbanHermitClaimText)) {
  errors.push(`@urbanhermit public evidence crosses the ${label} boundary`);
}

const urbanPopulation = urbanHermitClaims.get("CLM-URBANHERMIT-CURRENT-POPULATION-ACCOUNTING");
const urbanSourceRouting = urbanHermitClaims.get("CLM-URBANHERMIT-SOURCE-ROUTING");
const urbanInbound = urbanHermitClaims.get("CLM-URBANHERMIT-INBOUND-ENGAGEMENT-FLOOR");
const urbanPractice = urbanHermitClaims.get("CLM-URBANHERMIT-PRACTICE-THREADS");
const horseLords = urbanHermitClaims.get("CLM-HORSE-LORDS-TRUTHERS-VIDEO");
const musicHackathon = urbanHermitClaims.get("CLM-MUSIC-HACKATHON-WOWLIST-ROLE");
const urbanPopulationAudit = knowledgeBank.sources.find(
  (source) => source.id === "SRC-X-URBANHERMIT-FULL-POPULATION-AUDIT-2026"
);
const urbanPostLedger = JSON.parse(urbanHermitPostLedgerText);
const urbanEngagementLedger = JSON.parse(urbanHermitEngagementLedgerText);
const countBy = (records, key) =>
  Object.fromEntries(
    [...records.reduce((counts, record) => {
      counts.set(record[key], (counts.get(record[key]) ?? 0) + 1);
      return counts;
    }, new Map())].sort(([left], [right]) => String(left).localeCompare(String(right)))
  );
const sortedObject = (value) =>
  Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right)));

if (!/431.*three repost-source records/is.test(activeText(urbanPopulation))) {
  errors.push("@urbanhermit population projection must preserve direct-reverification and prior-capture counts");
}
if (!urbanPopulation?.boundaries.some((boundary) => /not every post Jamie ever made or a platform export/i.test(boundary))) {
  errors.push("@urbanhermit population claim is missing its current-profile versus lifetime boundary");
}
if (!/61 resolved.*260 remain/is.test(activeText(urbanSourceRouting))) {
  errors.push("@urbanhermit source-routing projection must preserve resolved and unresolved-link counts");
}
if (!/floor.*26 records from 17 accounts/is.test(activeText(urbanInbound))) {
  errors.push("@urbanhermit inbound projection must remain a bounded 26-record, 17-account floor");
}
if (!urbanInbound?.boundaries.some((boundary) => /not automatically endorsement.*reach.*impact/i.test(boundary))) {
  errors.push("@urbanhermit inbound claim is missing its non-endorsement and non-impact boundary");
}
if (urbanPractice?.projections.some((projection) => projection.status === "active" || projection.surfaces.length > 0)) {
  errors.push("@urbanhermit personal practice-thread projection must remain held and bank-only");
}
if (!/Jamie Burkart and M\.C\. Schmidt made/is.test(`${horseLords?.internalClaim}\n${activeText(horseLords)}`)) {
  errors.push("Horse Lords claim must preserve joint credit to Jamie Burkart and M.C. Schmidt");
}
if (!/co-organizer/i.test(`${musicHackathon?.internalClaim}\n${activeText(musicHackathon)}`)) {
  errors.push("Music Hackathon claim must preserve the bounded co-organizer role");
}
if (!musicHackathon?.boundaries.some((boundary) => /sole authorship/i.test(boundary))) {
  errors.push("Music Hackathon claim is missing its WOW List sole-authorship boundary");
}
if (!urbanPopulationAudit?.doesNotEstablish.some((boundary) => /historic analytics.*professional impact/i.test(boundary))) {
  errors.push("@urbanhermit population source is missing the mutable-reaction historical-analytics boundary");
}
if (!/mutable present-interface floors, not historic analytics/is.test(urbanHermitReportText)) {
  errors.push("@urbanhermit report must describe authored reactions as mutable current-interface floors, not historical analytics");
}
if (!/redacted row-level.*residual reconstruction risk/is.test(urbanHermitClaimText)) {
  errors.push("@urbanhermit public records must disclose redacted row-level structure and residual reconstruction risk");
}
if (urbanPostLedger.items.length !== 434) errors.push("@urbanhermit post ledger must contain 434 dispositions");
if (urbanPostLedger.populationAudit.directlyReverifiedRecords !== 431) errors.push("@urbanhermit post ledger must retain 431 direct re-verifications");
if (urbanPostLedger.populationAudit.priorAuthenticatedCaptureOnlyRecords !== 3) errors.push("@urbanhermit post ledger must retain three prior-capture-only records");
if (urbanPostLedger.items.some((item) => item.publicDetailStatus !== "redacted-row-level-disposition")) {
  errors.push("@urbanhermit post ledger rows must declare redacted-row-level-disposition");
}
if (JSON.stringify(countBy(urbanPostLedger.items, "year")) !== JSON.stringify(sortedObject(urbanPostLedger.aggregateFindings.byYear))) {
  errors.push("@urbanhermit post ledger year aggregate does not reconcile");
}
if (JSON.stringify(countBy(urbanPostLedger.items, "relationship")) !== JSON.stringify(sortedObject(urbanPostLedger.aggregateFindings.byRelationship))) {
  errors.push("@urbanhermit post ledger relationship aggregate does not reconcile");
}
if (JSON.stringify(countBy(urbanPostLedger.items, "primaryTheme")) !== JSON.stringify(sortedObject(urbanPostLedger.aggregateFindings.byPrimaryTheme))) {
  errors.push("@urbanhermit post ledger theme aggregate does not reconcile");
}
if (urbanPostLedger.items.reduce((sum, item) => sum + item.externalLinkCount, 0) !== urbanPostLedger.aggregateFindings.externalLinkOccurrences) {
  errors.push("@urbanhermit post ledger external-link aggregate does not reconcile");
}
if (urbanEngagementLedger.records.length !== 26 || urbanEngagementLedger.searchAudit.distinctPublicAccounts !== 17) {
  errors.push("@urbanhermit engagement ledger must preserve the 26-record, 17-account floor");
}
if (urbanEngagementLedger.records.some((item) => item.publicDetailStatus !== "redacted-row-level-disposition")) {
  errors.push("@urbanhermit engagement rows must declare redacted-row-level-disposition");
}
for (const [key, aggregateKey] of [
  ["stakeholderGroup", "byStakeholderGroup"],
  ["primaryTheme", "byPrimaryTheme"],
  ["interactionContext", "byInteractionContext"]
]) {
  if (JSON.stringify(countBy(urbanEngagementLedger.records, key)) !== JSON.stringify(sortedObject(urbanEngagementLedger.aggregateFindings[aggregateKey]))) {
    errors.push(`@urbanhermit engagement ledger ${aggregateKey} aggregate does not reconcile`);
  }
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
