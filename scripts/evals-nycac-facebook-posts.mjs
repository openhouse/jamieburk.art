#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";
import {
  checkRepository,
  evaluateCorpus,
  expectedCorpusSha256,
  read
} from "./check-nycac-facebook-posts-corpus.mjs";

const { corpus, result } = checkRepository();
const batchText = read(
  "apps/www/src/data/knowledge-bank/batches/nycac-facebook-posts-full-population-2026-07-15.ts"
);
const publicSurfaces = [
  read("apps/www/src/content/work/fair-rent-nyc.mdx"),
  read("apps/www/src/app/work/technical-operations/page.tsx")
].join("\n");
const docsText = [
  read("docs/knowledge-bank/README.md"),
  read("docs/knowledge-bank/projects/nyc-artist-coalition.md"),
  read("docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md"),
  read(
    "docs/knowledge-bank/runs/2026-07-15-nycac-facebook-posts-full-population.md"
  )
]
  .join("\n")
  .replace(/\s+/g, " ");

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const taskById = new Map(
  knowledgeBank.researchTasks.map((task) => [task.id, task])
);
const inquiry = knowledgeBank.researchInquiries.find(
  (item) => item.id === "INQ-NYCAC-FACEBOOK-POST-POPULATION-2026"
);
const intake = knowledgeBank.intake.find(
  (item) => item.id === "INT-NYCAC-FACEBOOK-POST-FULL-POPULATION-2026"
);
const operating = claimById.get(
  "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD"
);
const civicRelay = claimById.get("CLM-NYCAC-FACEBOOK-CIVIC-RELAY");
const metrics = claimById.get("CLM-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT");

const checks = [];
function score(id, title, points, passes) {
  checks.push({ id, title, points, passes: Boolean(passes) });
}

score(
  "FB-NYCAC-001",
  "Complete annual Published-export accounting",
  20,
  result.errors.length === 0 &&
    corpus.population.length === 444 &&
    corpus.ownerExportReconciliation.totalRows === 444 &&
    corpus.ownerExportReconciliation.uniquePostIds === 444 &&
    corpus.populationReconciliation.ledgerRows === 444 &&
    docsText.includes("all 444 rows") &&
    docsText.includes("not proof of every post ever created") &&
    docsText.includes("Deleted, hidden, private, unpublished, or no-longer-retained")
);

score(
  "FB-NYCAC-002",
  "Mission continuity and source decomposition",
  15,
  result.inventory.length === 67 &&
    result.governed.length === 9 &&
    corpus.postedUrlSummary.publishedExactRoutes === 65 &&
    corpus.postedUrlSummary.withheldSensitiveRoutes === 2 &&
    corpus.postedUrlSummary.inventoryOnlyRoutes === 56 &&
    Object.keys(result.missionCounts).length === 10 &&
    sourceById.has("SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22") &&
    sourceById.has(
      "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26"
    ) &&
    sourceById.has("SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22") &&
    docsText.includes("56 remain a preservation and close-reading queue")
);

score(
  "FB-NYCAC-003",
  "Stakeholder references remain distinct from engagement",
  15,
  result.stakeholderCounts["nyc-council-and-elected-officials"] === 66 &&
    corpus.stakeholderSummary.accountReferenceRows.rafaelEspinal === 23 &&
    corpus.stakeholderSummary.accountReferenceRows.nycCouncil === 25 &&
    corpus.stakeholderSummary.accountReferenceRows.stephenLevin === 8 &&
    civicRelay?.boundaries.some((value) =>
      /do not establish incoming engagement/i.test(value)
    ) &&
    taskById.get("TASK-NYCAC-FACEBOOK-STAKEHOLDER-ENGAGEMENT")?.status ===
      "queued" &&
    docsText.includes("incoming engagement by stakeholder group remains unmeasured")
);

score(
  "FB-NYCAC-004",
  "Native metrics remain bounded row values",
  15,
  metrics?.status === "use-with-care" &&
    metrics.maturity === "partially-supported" &&
    metrics.projectionEligibility === "hold" &&
    corpus.ownerExportReconciliation.metricSnapshot.reactions === 2589 &&
    corpus.ownerExportReconciliation.metricSnapshot.comments === 295 &&
    corpus.ownerExportReconciliation.metricSnapshot.shares === 552 &&
    corpus.ownerExportReconciliation.metricSnapshot.summedPostReach === 48044 &&
    metrics.antiClaims.some((value) => /48,044 unique people/i.test(value)) &&
    metrics.antiClaims.some((value) => /Council members/i.test(value)) &&
    !publicSurfaces.includes("48,044") &&
    !publicSurfaces.includes("3,436 unique")
);

score(
  "FB-NYCAC-005",
  "Shared-account authorship and collective credit",
  15,
  operating?.collectiveWork === true &&
    civicRelay?.collectiveWork === true &&
    metrics?.collectiveWork === true &&
    operating?.antiClaims.includes(
      "Jamie authored every NYC Artist Coalition Facebook post"
    ) &&
    civicRelay?.boundaries.some((value) =>
      /not Jamie's individually authored feed/i.test(value)
    ) &&
    corpus.population.every(
      (record) =>
        record.authorshipDisposition ===
        "shared-account-human-author-unresolved"
    ) &&
    docsText.includes("Jamie remembers predominantly using the Page") &&
    (docsText.includes("historical human author of each post") ||
      docsText.includes("individual historical publisher of each post"))
);

score(
  "FB-NYCAC-006",
  "Knowledge lifecycle and selective projection",
  15,
  intake?.status === "integrated" &&
    intake.claimIds.length === 3 &&
    intake.researchTaskIds.length === 4 &&
    inquiry?.resultStatus === "partially-recovered" &&
    [operating, civicRelay, metrics].every(
      (claim) =>
        claim?.projectionEligibility === "hold" &&
        claim.projections.every(
          (projection) =>
            projection.status === "hold" && projection.surfaces.length === 0
        )
    ) &&
    !publicSurfaces.includes("CLM-NYCAC-FACEBOOK-") &&
    docsText.includes("All three projections remain held from the website")
);

score(
  "FB-NYCAC-007",
  "Public safety and immutable provenance",
  5,
  sourceById
    .get("SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15")
    ?.canonicalUrl?.includes(
      "blob/998d25b5fc64e4b781da52590cf54a142ddf4274/"
    ) &&
    sourceById.get("SRC-NYCAC-FACEBOOK-POST-OWNER-RESEARCH-2026-07-15")
      ?.visibility === "protected" &&
    corpus.publicationBoundary.rawBodiesStored === false &&
    corpus.publicationBoundary.nativeExportFilesStored === false &&
    corpus.publicationBoundary.nativePostIdsStored === false &&
    !docsText.includes("/Users/") &&
    !docsText.includes("/Volumes/")
);

const mutationCases = [
  {
    id: "drop-record",
    mutate(candidate) {
      candidate.population.pop();
    }
  },
  {
    id: "duplicate-reconciliation-hash",
    mutate(candidate) {
      candidate.population[1].reconciliationKeySha256 =
        candidate.population[0].reconciliationKeySha256;
    }
  },
  {
    id: "change-annual-denominator",
    mutate(candidate) {
      candidate.population[0].publishedAt = "2020-09-15";
    }
  },
  {
    id: "erase-lifetime-boundary",
    mutate(candidate) {
      candidate.populationReconciliation.boundary =
        "This is every post the Page ever created.";
    }
  },
  {
    id: "publish-owner-export",
    mutate(candidate) {
      candidate.ownerExportReconciliation.sourceFilesPublished = true;
    }
  },
  {
    id: "assign-jamie-authorship",
    mutate(candidate) {
      candidate.population[0].authorshipDisposition = "Jamie Burkart";
    }
  },
  {
    id: "convert-reference-to-engagement",
    mutate(candidate) {
      candidate.stakeholderSummary.boundary =
        "Every named official engaged with and endorsed the coalition.";
    }
  },
  {
    id: "convert-summed-reach-to-people",
    mutate(candidate) {
      candidate.ownerExportReconciliation.boundary =
        "48,044 unique people were reached and the metrics prove impact.";
    }
  },
  {
    id: "combine-feed-and-export-metrics",
    mutate(candidate) {
      candidate.displayedInteractionSummary.boundary =
        "Add these values to the owner-export totals.";
    }
  },
  {
    id: "publish-sensitive-route",
    mutate(candidate) {
      const withheld = candidate.postedUrlInventory.find(
        (route) =>
          route.preservationDisposition === "withheld-sensitive-route"
      );
      withheld.url = "https://zoom.us/j/123456789";
    }
  },
  {
    id: "orphan-governed-source",
    mutate(candidate) {
      const governed = candidate.postedUrlInventory.find(
        (route) => route.sourceId
      );
      governed.preservationDisposition = "route-inventory-only";
    }
  },
  {
    id: "leak-raw-body",
    mutate(candidate) {
      candidate.population[0].rawPostText = "protected payload";
    }
  },
  {
    id: "leak-post-id",
    mutate(candidate) {
      candidate.population[0].postId = "123456789";
    }
  },
  {
    id: "leak-private-path",
    mutate(candidate) {
      candidate.privateLocator = "/Users/example/private-export.csv";
    }
  },
  {
    id: "inflate-metric-total",
    mutate(candidate) {
      candidate.ownerExportReconciliation.metricSnapshot.reactions = 999999;
    }
  }
];

for (const testCase of mutationCases) {
  const candidate = structuredClone(corpus);
  testCase.mutate(candidate);
  const mutationResult = evaluateCorpus(candidate, JSON.stringify(candidate));
  assert.ok(
    mutationResult.errors.length > 0,
    `${testCase.id} must fail the corpus gate`
  );
}

const earned = checks
  .filter((check) => check.passes)
  .reduce((sum, check) => sum + check.points, 0);
const possible = checks.reduce((sum, check) => sum + check.points, 0);
assert.equal(possible, 100);
assert.equal(earned, 100, JSON.stringify(checks, null, 2));

const candidateFingerprint = createHash("sha256")
  .update(
    [
      expectedCorpusSha256,
      operating?.internalClaim ?? "",
      civicRelay?.internalClaim ?? "",
      metrics?.internalClaim ?? "",
      batchText,
      docsText
    ].join("\n")
  )
  .digest("hex");

console.log(
  JSON.stringify(
    {
      suite: "nycac-facebook-posts-full-population",
      status: "criteria_met",
      score: earned,
      possible,
      candidateFingerprint,
      checks,
      mutationTests: mutationCases.map((item) => ({
        id: item.id,
        rejected: true
      }))
    },
    null,
    2
  )
);
