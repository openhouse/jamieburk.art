#!/usr/bin/env node

import assert from "node:assert/strict";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";
import {
  checkRepository,
  evaluateCorpus,
  read
} from "./check-nycac-facebook-posts-corpus.mjs";

const { corpus, result } = checkRepository();
const docsText = [
  read("docs/knowledge-bank/README.md"),
  read("docs/knowledge-bank/projects/nyc-artist-coalition.md"),
  read("docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md"),
  read("docs/knowledge-bank/runs/2026-07-15-nycac-facebook-posts-full-population.md")
]
  .join("\n")
  .replace(/\s+/g, " ");
const publicSurfaceText = [
  read("apps/www/src/content/work/fair-rent-nyc.mdx"),
  read("apps/www/src/data/work.ts"),
  read("apps/www/src/data/proofs.ts")
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
const intake = knowledgeBank.intake.find(
  (item) => item.id === "INT-NYCAC-FACEBOOK-POSTS-2026"
);
const operating = claimById.get(
  "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD"
);
const civicRelay = claimById.get("CLM-NYCAC-FACEBOOK-CIVIC-RELAY");
const metrics = claimById.get("CLM-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT");
const facebookClaims = [operating, civicRelay, metrics];

function claimLayerErrors(claims, surfaceText = publicSurfaceText) {
  const errors = [];
  const operatingCandidate = claims.find(
    (claim) => claim?.id === "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD"
  );
  const civicRelayCandidate = claims.find(
    (claim) => claim?.id === "CLM-NYCAC-FACEBOOK-CIVIC-RELAY"
  );
  const metricsCandidate = claims.find(
    (claim) => claim?.id === "CLM-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT"
  );
  if (
    claims.some(
      (claim) =>
        !claim ||
        claim.projections.length !== 1 ||
        claim.projections.some(
          (projection) =>
            projection.status !== "hold" || projection.surfaces.length !== 0
        )
    )
  ) {
    errors.push("NYCAC Facebook projections must remain held and surfaceless");
  }
  if (
    !operatingCandidate?.antiClaims.includes(
      "Jamie authored every NYC Artist Coalition Facebook post."
    )
  ) {
    errors.push("shared-account authorship anti-claim is required");
  }
  if (
    !civicRelayCandidate?.boundaries.some((value) =>
      /do not establish incoming engagement/i.test(value)
    )
  ) {
    errors.push("outgoing references must remain distinct from engagement");
  }
  if (
    !metricsCandidate?.antiClaims.some((value) =>
      /48,044 unique people/i.test(value)
    ) ||
    !metricsCandidate?.antiClaims.some((value) =>
      /Council members produced/i.test(value)
    )
  ) {
    errors.push("metric anti-inference boundaries are incomplete");
  }
  if (
    claims.some((claim) =>
      claim?.evidence.some((item) => !sourceById.has(item.sourceId))
    )
  ) {
    errors.push("claim evidence is not source-closed");
  }
  if (
    claims.some((claim) => surfaceText.includes(claim?.id ?? "")) ||
    surfaceText.includes("48,044") ||
    surfaceText.includes("3,436 unique") ||
    /I (?:authored|wrote|published) all 44[45]/i.test(surfaceText)
  ) {
    errors.push("held Facebook material entered a portfolio surface");
  }
  return errors;
}

const checks = [];
function score(id, title, points, passes) {
  checks.push({ id, title, points, passes: Boolean(passes) });
}

score(
  "FB-NYCAC-001",
  "Complete annual Published-export accounting",
  20,
  result.errors.length === 0 &&
    corpus.population.length === 445 &&
    corpus.ownerExportReconciliation.totalRows === 444 &&
    corpus.ownerExportReconciliation.uniquePostIds === 444 &&
    corpus.populationReconciliation.ownerExportCrosswalkStatus ===
      "surface-complete-row-level-crosswalk-not-asserted" &&
    docsText.includes("all 445 distinct feed identities") &&
    docsText.includes("all 444 owner-export rows") &&
    docsText.includes("no one-to-one row crosswalk") &&
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
    sourceById.has("SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-2018-03-26") &&
    sourceById.has("SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22") &&
    result.governed.every((route) => sourceById.has(route.sourceId)) &&
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
    inquiryById.get("INQ-NYCAC-FACEBOOK-STAKEHOLDER-ENGAGEMENT-2026")
      ?.resultStatus === "inconclusive" &&
    docsText.includes("incoming engagement by stakeholder group remains unmeasured")
);

score(
  "FB-NYCAC-004",
  "Native metrics remain bounded row values",
  15,
  metrics?.status === "use-with-care" &&
    corpus.ownerExportReconciliation.metricSnapshot.reactions === 2589 &&
    corpus.ownerExportReconciliation.metricSnapshot.comments === 295 &&
    corpus.ownerExportReconciliation.metricSnapshot.shares === 552 &&
    corpus.ownerExportReconciliation.metricSnapshot.summedPostReach === 48044 &&
    !publicSurfaceText.includes("48,044") &&
    !publicSurfaceText.includes("3,436 unique")
);

score(
  "FB-NYCAC-005",
  "Shared-account authorship and collective credit",
  15,
  corpus.population.every(
    (record) =>
      record.authorshipDisposition === "shared-account-human-author-unresolved"
  ) &&
    docsText.includes("Jamie remembers predominantly using the Page") &&
    docsText.includes("historical human author of each post") &&
    claimLayerErrors(facebookClaims).length === 0
);

score(
  "FB-NYCAC-006",
  "Knowledge lifecycle and selective projection",
  15,
  intake?.status === "matured" &&
    intake.claimIds.length === 3 &&
    intake.inquiryIds.length === 4 &&
    inquiryById.get("INQ-NYCAC-FACEBOOK-POST-POPULATION-2026")
      ?.resultStatus === "partially-recovered" &&
    docsText.includes("All three projections remain held from the website") &&
    docsText.includes("No website copy changes are warranted")
);

score(
  "FB-NYCAC-007",
  "Public safety and immutable provenance",
  5,
  sourceById
    .get("SRC-NYCAC-FACEBOOK-POST-CORPUS-2026")
    ?.canonicalUrl?.includes(
      "blob/e775e3f7e1f1866bdeb4dc568a6ca96ebef49cd8/"
    ) &&
    sourceById.get("SRC-NYCAC-FACEBOOK-POST-PROTECTED-RUN-2026")
      ?.visibility === "protected" &&
    corpus.publicationBoundary.rawBodiesStored === false &&
    corpus.publicationBoundary.nativeExportFilesStored === false &&
    corpus.publicationBoundary.nativePostIdsStored === false &&
    !docsText.includes("/Users/") &&
    !docsText.includes("/Volumes/")
);

const unsafeCorpusMutations = [
  ["drop-record", (candidate) => candidate.population.pop()],
  [
    "duplicate-reconciliation-hash",
    (candidate) => {
      candidate.population[1].reconciliationKeySha256 =
        candidate.population[0].reconciliationKeySha256;
    }
  ],
  [
    "change-record-classification",
    (candidate) => candidate.population[0].missionTags.push("covid-and-space-relief")
  ],
  [
    "change-record-route",
    (candidate) => candidate.population[0].postedRouteKeys.push("unsafe-route")
  ],
  [
    "weaken-completeness-boundary",
    (candidate) => {
      candidate.populationReconciliation.boundary =
        "This is every post the Page ever created.";
    }
  ],
  [
    "publish-owner-export",
    (candidate) => {
      candidate.ownerExportReconciliation.sourceFilesPublished = true;
    }
  ],
  [
    "assign-jamie-authorship",
    (candidate) => {
      candidate.population[0].authorshipDisposition = "Jamie Burkart";
    }
  ],
  [
    "convert-reference-to-engagement",
    (candidate) => {
      candidate.stakeholderSummary.boundary =
        "Every named official engaged with and endorsed the coalition.";
    }
  ],
  [
    "convert-reach-to-unique-people",
    (candidate) => {
      candidate.ownerExportReconciliation.boundary =
        "48,044 unique people saw the posts.";
    }
  ],
  [
    "combine-feed-and-owner-metrics",
    (candidate) => {
      candidate.displayedInteractionSummary.boundary =
        "Feed and owner-export metrics may be combined.";
    }
  ],
  [
    "publish-sensitive-route",
    (candidate) => {
      const route = candidate.postedUrlInventory.find((item) => item.url === null);
      route.url = "https://zoom.us/j/private-meeting";
    }
  ],
  [
    "inject-protected-field",
    (candidate) => {
      candidate.population[0].commenterIdentity = "Private Person";
    }
  ],
  [
    "swap-governed-source",
    (candidate) => {
      const route = candidate.postedUrlInventory.find((item) => item.sourceId);
      route.sourceId = "SRC-NOT-THE-RECOVERED-SOURCE";
    }
  ]
];

const rejectedUnsafeCorpusMutations = unsafeCorpusMutations.filter(([, mutate]) => {
  const candidate = structuredClone(corpus);
  mutate(candidate);
  return evaluateCorpus(candidate, JSON.stringify(candidate)).errors.length > 0;
});

const unsafeClaimMutations = [
  [
    "activate-held-projection",
    (claims) => {
      claims[0].projections[0].status = "active";
      claims[0].projections[0].surfaces = ["/work/fair-rent-nyc"];
    }
  ],
  [
    "erase-authorship-anti-claim",
    (claims) => {
      claims[0].antiClaims = [];
    }
  ],
  [
    "erase-engagement-boundary",
    (claims) => {
      claims[1].boundaries = ["Every official reference is engagement."];
    }
  ],
  [
    "erase-metric-boundaries",
    (claims) => {
      claims[2].antiClaims = [];
    }
  ],
  [
    "inject-ungoverned-source",
    (claims) => {
      claims[0].evidence[0].sourceId = "SRC-UNREGISTERED";
    }
  ]
];

const rejectedUnsafeClaimMutations = unsafeClaimMutations.filter(([, mutate]) => {
  const claims = structuredClone(facebookClaims);
  mutate(claims);
  return claimLayerErrors(claims).length > 0;
});

const safeCorpusMutations = [
  [
    "top-level-object-key-reordering",
    (candidate) => Object.fromEntries(Object.entries(candidate).reverse())
  ],
  [
    "record-object-key-reordering",
    (candidate) => {
      candidate.population = candidate.population.map((record) =>
        Object.fromEntries(Object.entries(record).reverse())
      );
      return candidate;
    }
  ],
  [
    "owner-summary-object-key-reordering",
    (candidate) => {
      candidate.ownerExportReconciliation = Object.fromEntries(
        Object.entries(candidate.ownerExportReconciliation).reverse()
      );
      return candidate;
    }
  ]
];

const acceptedSafeCorpusMutations = safeCorpusMutations.filter(([, mutate]) => {
  const candidate = mutate(structuredClone(corpus));
  return evaluateCorpus(candidate, JSON.stringify(candidate)).errors.length === 0;
});

assert.equal(rejectedUnsafeCorpusMutations.length, unsafeCorpusMutations.length);
assert.equal(rejectedUnsafeClaimMutations.length, unsafeClaimMutations.length);
assert.equal(acceptedSafeCorpusMutations.length, safeCorpusMutations.length);

const achieved = checks
  .filter((check) => check.passes)
  .reduce((total, check) => total + check.points, 0);
const possible = checks.reduce((total, check) => total + check.points, 0);
assert.equal(possible, 100);
assert.equal(achieved, 100);

console.log(
  JSON.stringify(
    {
      status: "pass",
      achieved,
      possible,
      checks,
      unsafeCorpusMutationsRejected: rejectedUnsafeCorpusMutations.length,
      unsafeClaimMutationsRejected: rejectedUnsafeClaimMutations.length,
      harmlessReorderingsAccepted: acceptedSafeCorpusMutations.length
    },
    null,
    2
  )
);
