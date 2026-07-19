#!/usr/bin/env node

import assert from "node:assert/strict";

import {
  checkRepository,
  evaluateCensus,
  evaluatePublicFileSemantics,
  evaluatePublicSemantics
} from "./check-nycac-shared-folder-census.mjs";

const baseline = checkRepository();
const checks = [];

function score(id, title, points, passes) {
  checks.push({ id, title, points, passes: Boolean(passes) });
}

const population = baseline.census.population;
const coverage = baseline.census.coverage;

score(
  "NYCAC-ARCHIVE-001",
  "Full-population and folder closure",
  20,
  baseline.errors.length === 0 &&
    population.uniqueItems === 2408 &&
    population.foldersClosed === 258 &&
    population.queuedFolders === 0 &&
    population.unresolvedFolders === 0 &&
    coverage.inventoriedTotal === coverage.populationTotal &&
    coverage.classifiedTotal === coverage.populationTotal &&
    coverage.dispositionedTotal === coverage.populationTotal
);

score(
  "NYCAC-ARCHIVE-002",
  "One disposition and reconciled aggregate classes",
  15,
  Object.values(baseline.census.primaryDispositions).reduce(
    (sum, value) => sum + value,
    0
  ) === 2408 &&
    Object.values(baseline.census.sourceClasses).reduce(
      (sum, value) => sum + value,
      0
    ) === 2408 &&
    Object.values(baseline.census.formats).reduce(
      (sum, value) => sum + value,
      0
    ) === 2408
);

score(
  "NYCAC-ARCHIVE-003",
  "Public-private separation and protected custody",
  20,
  baseline.census.custody.exactManifestStoredOutsidePublicRepository === true &&
    baseline.census.custody.rawContentInRepository === false &&
    baseline.census.custody.exactPrivateLocatorsInRepository === false &&
    coverage.protectedTotal === 2408 &&
    coverage.rightsReviewedTotal === 0
);

score(
  "NYCAC-ARCHIVE-004",
  "Claim discipline and collective credit",
  15,
  /not authorship/i.test(baseline.publicText) &&
    /collective|coalition and policy outcomes belong/i.test(baseline.publicText) &&
    /Jamie's authorship of every item/i.test(baseline.publicText) &&
    /anti-claims/i.test(baseline.publicText)
);

score(
  "NYCAC-ARCHIVE-005",
  "Chad lens and application usefulness",
  15,
  /Jamie builds operating structure for ambiguous public-facing work/i.test(
    baseline.publicText
  ) &&
    /Lead with Jamie as the actor/i.test(baseline.publicText) &&
    /what became usable/i.test(baseline.publicText) &&
    /role they would refer Jamie for/i.test(baseline.publicText)
);

score(
  "NYCAC-ARCHIVE-006",
  "Knowledge Wiki retrieval and human gates",
  10,
  /project\.nyc-artist-coalition/.test(baseline.publicText) &&
    /application\.nycac\.civic-operations-evidence/.test(baseline.publicText) &&
    /research-run\.nycac\.shared-folder\.2026/.test(baseline.publicText) &&
    /Automated closure does not approve/i.test(baseline.publicText) &&
    /human gates/i.test(baseline.publicText)
);

const corpusMutations = [
  ["drop-population-item", (candidate) => candidate.population.uniqueItems--],
  [
    "break-disposition-total",
    (candidate) =>
      candidate.primaryDispositions.pendingRightsConsentAttributionOrJamieReview--
  ],
  ["approve-rights", (candidate) => (candidate.coverage.rightsReviewedTotal = 2408)],
  [
    "publish-private-locators",
    (candidate) => (candidate.custody.exactPrivateLocatorsInRepository = true)
  ],
  ["remove-anti-claims", (candidate) => (candidate.antiClaims = [])]
];

const corpusMutationPasses = corpusMutations.every(([, mutate]) => {
  const candidate = structuredClone(baseline.census);
  mutate(candidate);
  return evaluateCensus(candidate, JSON.stringify(candidate)).length > 0;
});

const textMutations = [
  baseline.publicText.replace(
    /Folder access is not publication permission/gi,
    "Folder access grants publication permission"
  ),
  baseline.publicText.replace(/not authorship/gi, "authorship"),
  `${baseline.publicText}\nresourcekey=unsafe`,
  baseline.publicText.replace(/human gates/gi, "automatic approvals"),
  baseline.publicText.replace(
    /Jamie builds operating structure for ambiguous public-facing work/gi,
    "The coalition did work"
  )
];

const fileTextMutations = [
  [
    "docs/knowledge-bank/runs/2026-07-19-nycac-shared-folder-full-population.md",
    (text) => text.replace(
      /Folder access is not publication permission/gi,
      "Folder access grants publication permission"
    )
  ],
  [
    "docs/knowledge-bank/projects/nyc-artist-coalition-shared-folder.md",
    (text) => text.replace(/collective and institutional credit/gi, "project credit")
  ],
  [
    "docs/knowledge-bank/briefs/nycac-civic-operations-application-brief.md",
    (text) => text.replace(
      /Jamie builds operating structure for ambiguous public-facing work/gi,
      "The coalition did work"
    )
  ],
  [
    "docs/knowledge-wiki/evaluations/nycac-shared-folder-coverage.md",
    (text) => text.replace(/human gates/gi, "automatic approvals")
  ],
  [
    "apps/www/src/content/work/nyc-artist-coalition.mdx",
    (text) => text.replace(
      /exact\s+records\s+remain protected/gi,
      "exact records are public"
    )
  ]
];

const fileTextMutationPasses = fileTextMutations.every(([relativePath, mutate]) => {
  const candidate = { ...baseline.publicTexts };
  candidate[relativePath] = mutate(candidate[relativePath]);
  return evaluatePublicFileSemantics(candidate).length > 0;
});

score(
  "NYCAC-ARCHIVE-007",
  "Recursive mutation resistance",
  5,
  corpusMutationPasses &&
    fileTextMutationPasses &&
    textMutations.every(
      (candidate) => evaluatePublicSemantics(candidate).length > 0
    )
);

const earned = checks
  .filter((check) => check.passes)
  .reduce((sum, check) => sum + check.points, 0);
const possible = checks.reduce((sum, check) => sum + check.points, 0);

for (const check of checks) {
  console.log(
    `${check.passes ? "PASS" : "FAIL"} ${check.id} (${check.points}) ${check.title}`
  );
}
console.log(`NYCAC shared-folder eval score: ${earned}/${possible}`);

assert.equal(earned, possible, "NYCAC shared-folder eval criteria are not met");
