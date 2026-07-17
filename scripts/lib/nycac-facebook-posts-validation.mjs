import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from
  "../../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

const corpusPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.json";
const manifestPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.manifest.json";

const read = (relativePath) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");

const corpusText = read(corpusPath);
const corpus = JSON.parse(corpusText);
const manifest = JSON.parse(read(manifestPath));
const report = read(
  "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md"
).replace(/\s+/g, " ");
const readme = read("docs/knowledge-bank/README.md").replace(/\s+/g, " ");
const publicSite = [
  read("apps/www/src/data/proofs.ts"),
  read("apps/www/src/data/work.ts"),
  read("apps/www/src/content/work/fair-rent-nyc.mdx"),
].join("\n");

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intakeById = new Map(
  knowledgeBank.intakes.map((intake) => [intake.id, intake])
);

function makeCheck(evidence) {
  const errors = [];
  return {
    errors,
    evidence,
    require(condition, message) {
      if (!condition) errors.push(message);
    },
    finish() {
      return { passed: errors.length === 0, errors, evidence };
    },
  };
}

function count(values) {
  return Object.fromEntries(
    [...values.reduce(
      (result, value) => result.set(value, (result.get(value) ?? 0) + 1),
      new Map()
    )].sort(([left], [right]) => String(left).localeCompare(String(right)))
  );
}

function collectKeys(value, output = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectKeys(item, output);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      output.push(key);
      collectKeys(item, output);
    }
  }
  return output;
}

export function validateNYCACFacebookPosts() {
  const checks = {};
  const population = corpus.population;
  const reconciliation = corpus.populationReconciliation;
  const exportControl = corpus.ownerExportReconciliation;

  const populationCheck = makeCheck(
    "Five annual Published exports reconcile to 444 rows, 444 unique post identities, and one public-safe disposition per row."
  );
  const identityHashes = population.map(
    (record) => record.reconciliationKeySha256
  );
  const yearCounts = count(
    population.map((record) => record.publishedAt.slice(0, 4))
  );
  populationCheck.require(population.length === 444, "Expected 444 ledger rows");
  populationCheck.require(
    reconciliation.annualOwnerExportRows === 444 &&
      reconciliation.annualOwnerExportUniquePostIds === 444 &&
      reconciliation.ledgerRows === 444 &&
      reconciliation.notRecovered === 0,
    "Owner-export and ledger denominators do not reconcile"
  );
  populationCheck.require(
    new Set(identityHashes).size === 444 &&
      identityHashes.every((value) => /^[a-f0-9]{64}$/.test(value)),
    "Public reconciliation hashes are missing, duplicated, or malformed"
  );
  populationCheck.require(
    JSON.stringify(yearCounts) ===
      JSON.stringify({ 2017: 185, 2018: 74, 2019: 111, 2020: 69, 2021: 5 }),
    "Annual owner-export counts changed"
  );
  populationCheck.require(
    population.at(0)?.publishedAt === "2021-09-15" &&
      population.at(-1)?.publishedAt === "2017-01-29",
    "Population date boundaries changed"
  );
  populationCheck.require(
    report.includes("100% accounting for the annual Published-export population") &&
      report.includes("not proof of every post ever created"),
    "The report does not preserve the surviving-population boundary"
  );
  checks.population = populationCheck.finish();

  const integrity = makeCheck(
    "The manifest binds the exact public corpus, annual totals, and one-way identity set."
  );
  const corpusSha = createHash("sha256").update(corpusText).digest("hex");
  integrity.require(manifest.corpus === corpusPath, "Manifest corpus path changed");
  integrity.require(
    manifest.corpusSha256 === corpusSha &&
      manifest.corpusBytes === Buffer.byteLength(corpusText),
    "Manifest hash or byte count does not bind the corpus"
  );
  integrity.require(
    manifest.population.ownerExportRows === 444 &&
      manifest.population.ownerExportUniquePostIds === 444 &&
      manifest.population.publicLedgerRows === 444,
    "Manifest population controls changed"
  );
  integrity.require(
    manifest.publicReconciliationHashSet.count === 444 &&
      manifest.publicReconciliationHashSet.sha256 ===
        "076807dd4b7950ab3d22db38c9e2d1cf0dec2c13c3bca1e6ddf3a0e284251097",
    "Population hash-set control changed"
  );
  checks.integrity = integrity.finish();

  const minimization = makeCheck(
    "The public ledger excludes raw posts, native IDs, people, authenticated routes, sensitive routes, and local paths."
  );
  const serialized = JSON.stringify(corpus);
  const forbiddenKeys = new Set([
    "postId",
    "pageId",
    "permalink",
    "rawBody",
    "rawCaption",
    "commentText",
    "interactionIdentities",
    "followerIdentities",
    "cookie",
    "session",
    "credential",
  ]);
  minimization.require(
    collectKeys(corpus).every((key) => !forbiddenKeys.has(key)),
    "Corpus exposes a forbidden raw-data key"
  );
  minimization.require(
    population.every(
      (record) =>
        record.bodyStored === false &&
        record.authorshipDisposition === "shared-account-human-author-unresolved"
    ),
    "Every row must exclude its body and preserve unresolved human authorship"
  );
  minimization.require(
    !["/Users/", "/Volumes/", "/private/tmp/", "file://"].some((marker) =>
      serialized.includes(marker)
    ),
    "Corpus exposes a machine-local path"
  );
  minimization.require(
    corpus.postedUrlInventory.filter((route) => route.url === null).length === 2 &&
      corpus.publicationBoundary.sensitiveExactRoutesStored === false,
    "Two sensitive routes must remain counted and withheld"
  );
  minimization.require(
    manifest.privacy.rawOwnerExportsPublished === false &&
      manifest.privacy.postIdsPublished === false &&
      manifest.privacy.engagerIdentitiesPublished === false,
    "Manifest privacy declarations changed"
  );
  checks.minimization = minimization.finish();

  const sourceRouting = makeCheck(
    "The corpus preserves 67 distinct routes, nine governed source edges, three new close reads, and a 56-route queue."
  );
  const routeSourceIds = corpus.postedUrlInventory
    .map((route) => route.sourceId)
    .filter(Boolean);
  const newSourceIds = [
    "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22",
    "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26",
    "SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22",
  ];
  sourceRouting.require(
    corpus.postedUrlSummary.distinctExternalRoutes === 67 &&
      corpus.postedUrlSummary.publishedExactRoutes === 65 &&
      corpus.postedUrlSummary.withheldSensitiveRoutes === 2 &&
      corpus.postedUrlSummary.governedSourceRoutes === 9 &&
      corpus.postedUrlSummary.inventoryOnlyRoutes === 56,
    "Source-routing totals changed"
  );
  sourceRouting.require(
    routeSourceIds.length === 9 &&
      new Set(routeSourceIds).size === 9 &&
      routeSourceIds.every((sourceId) => sourceById.has(sourceId)),
    "A governed route lacks a canonical source record"
  );
  for (const sourceId of newSourceIds) {
    const source = sourceById.get(sourceId);
    sourceRouting.require(Boolean(source), `Missing source ${sourceId}`);
    sourceRouting.require(
      Boolean(source?.supportsGenerally.length) &&
        Boolean(source?.doesNotEstablish.length) &&
        claimById.get("CLM-NYCAC-FACEBOOK-CIVIC-RELAY")?.evidence.some(
          (edge) => edge.sourceId === sourceId && edge.locator
        ),
      `${sourceId} lacks a located claim edge or explicit support boundaries`
    );
  }
  checks.sourceRouting = sourceRouting.finish();

  const mission = makeCheck(
    "Overlapping mission and stakeholder-reference patterns remain reproducible and explicitly non-causal."
  );
  mission.require(
    corpus.missionSummary.tagCounts["cultural-space-survival-and-network"] === 191 &&
      corpus.missionSummary.tagCounts["cabaret-law-and-dance-freedom"] === 76 &&
      corpus.missionSummary.tagCounts["march-transparency-and-accountability"] === 65 &&
      corpus.missionSummary.tagCounts["commercial-rent-and-anti-displacement"] === 48,
    "Priority mission classifications changed"
  );
  mission.require(
    corpus.stakeholderSummary.tagCounts["artists-cultural-spaces-and-organizers"] === 256 &&
      corpus.stakeholderSummary.tagCounts["nyc-council-and-elected-officials"] === 66 &&
      corpus.stakeholderSummary.tagCounts["enforcement-and-regulatory-agencies"] === 66,
    "Priority stakeholder-reference classifications changed"
  );
  mission.require(
    corpus.stakeholderSummary.accountReferenceRows.rafaelEspinal === 23 &&
      corpus.stakeholderSummary.accountReferenceRows.nycCouncil === 25 &&
      corpus.stakeholderSummary.accountReferenceRows.stephenLevin === 8,
    "Named account-reference controls changed"
  );
  mission.require(
    /do not establish that every named stakeholder engaged with, endorsed, or formally partnered/i.test(
      corpus.stakeholderSummary.boundary
    ) &&
      report.includes("incoming engagement by stakeholder group remains unmeasured"),
    "Stakeholder references are not sufficiently separated from incoming engagement"
  );
  checks.mission = mission.finish();

  const traction = makeCheck(
    "Capture-date owner metrics reproduce while rejecting unique-person, stakeholder, endorsement, and impact interpretations."
  );
  traction.require(
    exportControl.metricSnapshot.rowsWithNonzeroInteractions === 375 &&
      exportControl.metricSnapshot.rowsWithNonzeroReach === 364 &&
      exportControl.metricSnapshot.reactions === 2589 &&
      exportControl.metricSnapshot.comments === 295 &&
      exportControl.metricSnapshot.shares === 552 &&
      exportControl.metricSnapshot.reactionCommentShareTotal === 3436 &&
      exportControl.metricSnapshot.summedPostReach === 48044 &&
      exportControl.metricSnapshot.totalClicks === 2190,
    "Native metric snapshot changed"
  );
  traction.require(
    report.includes("not 48,044 unique people") &&
      report.includes("None of the values identifies the stakeholder groups") &&
      report.includes("not a historical audience count"),
    "Metric limits are missing from the report"
  );
  traction.require(
    claimById.get("CLM-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT")
      ?.projections.every((projection) => projection.status === "hold"),
    "Volatile aggregate metrics must remain held from public projection"
  );
  checks.traction = traction.finish();

  const lifecycle = makeCheck(
    "Two stable intakes route the corpus and stewardship memory to bounded claims and open research."
  );
  const corpusIntake = intakeById.get(
    "INTAKE-NYCAC-FACEBOOK-POSTS-FULL-POPULATION-2026"
  );
  const memoryIntake = intakeById.get(
    "INTAKE-NYCAC-FACEBOOK-STEWARDSHIP-MEMORY-2026"
  );
  lifecycle.require(
    corpusIntake?.maturity === "decomposed" &&
      corpusIntake?.editorialState === "unsurfaced",
    "Corpus intake must be decomposed and unsurfaced"
  );
  lifecycle.require(
    memoryIntake?.maturity === "captured" &&
      memoryIntake?.publicUse === "protected" &&
      memoryIntake?.editorialState === "unsurfaced",
    "Stewardship memory must remain captured, protected, and unsurfaced"
  );
  lifecycle.require(
    claimById.get("CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD")?.status ===
      "confirmed-with-boundary" &&
      claimById.get("CLM-NYCAC-FACEBOOK-CIVIC-RELAY")?.status ===
        "confirmed-with-boundary" &&
      claimById.get("CLM-NYCAC-FACEBOOK-STEWARDSHIP-MEMORY-2026")?.status ===
        "use-with-care",
    "Canonical claim statuses changed"
  );
  lifecycle.require(
    inquiryById.get("INQ-NYCAC-FACEBOOK-POST-POPULATION-2026")?.resultStatus ===
      "partially-recovered" &&
      inquiryById.get("INQ-NYCAC-FACEBOOK-STEWARDSHIP-2026")?.resultStatus ===
        "partially-recovered",
    "Population or stewardship inquiry is missing"
  );
  lifecycle.require(
    report.includes("INTAKE-NYCAC-FACEBOOK-POSTS-FULL-POPULATION-2026") &&
      report.includes("INTAKE-NYCAC-FACEBOOK-STEWARDSHIP-MEMORY-2026"),
    "Project note does not report both intake dispositions"
  );
  checks.lifecycle = lifecycle.finish();

  const composition = makeCheck(
    "Archive depth increases without placing fragile counts or unresolved authorship on the hiring-facing site."
  );
  composition.require(
    !["48,044", "3,436", "444 Facebook", "1.5K followers"].some((value) =>
      publicSite.includes(value)
    ),
    "A fragile archive count leaked into public portfolio copy"
  );
  composition.require(
    report.includes("No website copy changes are warranted") &&
      report.includes("collective civic communications infrastructure") &&
      report.includes("does not support saying Jamie authored every post"),
    "The Chad-lens projection decision is missing or weakened"
  );
  composition.require(
    readme.includes("Shared-account authorship") &&
      readme.includes("no website copy changes were made"),
    "Knowledge-bank index does not state the projection boundary"
  );
  checks.composition = composition.finish();

  const passed = Object.values(checks).every((check) => check.passed);
  return {
    passed,
    checks,
    evidence:
      "Five annual owner exports reconcile to a minimized 444-row ledger, 67-route source field, bounded metrics, collective authorship, and explicit non-projection.",
    errors: Object.entries(checks).flatMap(([name, check]) =>
      check.errors.map((error) => `${name}: ${error}`)
    ),
  };
}
