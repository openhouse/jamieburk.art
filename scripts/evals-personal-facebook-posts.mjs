#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { evaluatePersonalFacebookCorpus } from "./check-personal-facebook-posts-corpus.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");
const corpusText = read(
  "docs/knowledge-bank/corpora/jamie-personal-facebook-posts-full-population-2026-07-16.json"
);
const report = read("docs/knowledge-bank/projects/jamie-personal-facebook-posts.md");
const moduleText = read(
  "apps/www/src/data/knowledge-bank/personal-facebook-posts-2026-07.ts"
);
const corpus = JSON.parse(corpusText);

const criteria = [
  {
    name: "population-accounting",
    points: 15,
    met:
      evaluatePersonalFacebookCorpus(corpus, corpusText).length === 0 &&
      corpus.population.ownerFilteredRecords === 1243 &&
      corpus.population.terminalHasNextPage === false
  },
  {
    name: "lifetime-boundary",
    points: 10,
    met:
      /not claim a native Meta export/i.test(report) &&
      /immutable lifetime/i.test(report)
  },
  {
    name: "audience-reconciliation",
    points: 15,
    met:
      corpus.audienceReconciliation.visualCapture.Public === 671 &&
      /Unlabeled never means public/i.test(report)
  },
  {
    name: "source-routing",
    points: 10,
    met:
      corpus.structuralRouteInventory.uniqueNormalizedExternalUrls === 549 &&
      corpus.reviewedPublicDestinations.length === 6 &&
      /research queue/i.test(report)
  },
  {
    name: "mission-classification-boundary",
    points: 10,
    met:
      corpus.missionRouting.recordsWithAtLeastOneStructuralRoute === 181 &&
      /not exclusive semantic judgments/i.test(
        corpus.missionRouting.interpretation
      )
  },
  {
    name: "public-source-promotion",
    points: 10,
    met:
      corpus.selectedPublicPosts.length === 6 &&
      /individually reopened.*confirmed Public/is.test(report)
  },
  {
    name: "engagement-boundary",
    points: 10,
    met:
      /not unique people/i.test(corpus.engagementBoundary) &&
      /outgoing references/i.test(report) &&
      /not\s+incoming actions/i.test(report)
  },
  {
    name: "knowledge-graph-lifecycle",
    points: 10,
    met:
      /personalFacebookPostSources/.test(moduleText) &&
      /personalFacebookPostClaims/.test(moduleText) &&
      /personalFacebookPostInquiries/.test(moduleText) &&
      /personalFacebookPostIntake/.test(moduleText)
  },
  {
    name: "selective-projection",
    points: 5,
    met:
      /No new personal-Facebook metric goes onto the portfolio site or resume/i.test(
        report
      ) && /status: "hold"/.test(moduleText)
  },
  {
    name: "privacy-minimization",
    points: 5,
    met:
      corpus.privacy.omitted.length >= 8 &&
      !/(?:access_token|cookie|session_id|fb_dtsg|lsd=)/i.test(corpusText) &&
      !/\/(?:Users|Volumes|private\/tmp)\//.test(corpusText)
  }
];

const score = criteria.reduce(
  (total, criterion) => total + (criterion.met ? criterion.points : 0),
  0
);
const failures = criteria.filter((criterion) => !criterion.met);

for (const criterion of criteria) {
  console.log(
    `${criterion.met ? "PASS" : "FAIL"} ${criterion.name} (${criterion.points})`
  );
}
console.log(`Personal Facebook archival-production eval score: ${score}/100`);

assert.deepEqual(
  failures.map((criterion) => criterion.name),
  [],
  `Unmet criteria: ${failures.map((criterion) => criterion.name).join(", ")}`
);
assert.equal(score, 100, "Personal Facebook archival-production criteria were not met.");
