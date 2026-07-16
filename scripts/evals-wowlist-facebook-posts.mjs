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
} from "./check-wowlist-facebook-posts-corpus.mjs";

const { corpus, result } = checkRepository();
const batchText = read(
  "apps/www/src/data/knowledge-bank/batches/wowlist-facebook-posts-full-population-2026-07-15.ts"
);
const pageText = read("apps/www/src/content/work/wowlist.mdx");
const docsText = [
  read("docs/knowledge-bank/projects/wowlist-facebook-posts.md"),
  read("docs/knowledge-bank/projects/wowlist.md"),
  read(
    "docs/knowledge-bank/runs/2026-07-15-wowlist-facebook-posts-full-population.md"
  )
].join("\n");

const source = knowledgeBank.sources.find(
  (item) => item.id === "SRC-WOWLIST-FACEBOOK-POST-CORPUS-2026-07-15"
);
const stewardship = knowledgeBank.claims.find(
  (item) => item.id === "CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP"
);
const distribution = knowledgeBank.claims.find(
  (item) => item.id === "CLM-WOWLIST-FACEBOOK-MISSION-DISTRIBUTION"
);
const metrics = knowledgeBank.claims.find(
  (item) => item.id === "CLM-WOWLIST-FACEBOOK-DASHBOARD-SNAPSHOT"
);
const migration = knowledgeBank.claims.find(
  (item) => item.id === "CLM-WOWLIST-FACEBOOK-MIGRATION-BOUNDARY"
);
const inquiry = knowledgeBank.researchInquiries.find(
  (item) => item.id === "INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"
);

const checks = [];
function score(id, title, points, passes) {
  checks.push({ id, title, points, passes: Boolean(passes) });
}

score(
  "FB-WOW-001",
  "Complete-as-materialized population",
  20,
  result.errors.length === 0 &&
    corpus.records.length === 54 &&
    corpus.populationReconciliation.detailRecoveredCount === 50 &&
    corpus.populationReconciliation.tableOnlyCount === 4 &&
    docsText.includes("100% of the surviving records") &&
    docsText.includes("not a Meta owner export")
);

score(
  "FB-WOW-002",
  "Publisher evidence with collective-credit boundary",
  20,
  stewardship?.status === "confirmed-with-boundary" &&
    stewardship.maturity === "confirmed-with-boundary" &&
    stewardship.collectiveWork === true &&
    stewardship.projectionEligibility === "eligible" &&
    stewardship.boundaries.length >= 3 &&
    stewardship.antiClaims.length >= 4 &&
    stewardship.evidence.some(
      (item) => item.sourceId === source?.id && item.renderCitation
    ) &&
    /not sole authorship/i.test(corpus.publishingAttribution.boundary) &&
    /shared project/i.test(batchText)
);

score(
  "FB-WOW-003",
  "Mission and source decomposition",
  15,
  result.links.length === 42 &&
    Object.keys(result.derivedThemes).length === 7 &&
    distribution?.status === "confirmed-with-boundary" &&
    distribution.projectionEligibility === "hold" &&
    knowledgeBank.sourceAssertions.filter(
      (item) =>
        item.id.startsWith("AST-WOWLIST-FACEBOOK-") &&
        item.id !== "AST-WOWLIST-FACEBOOK-EVENT-SURFACE-2026"
    ).length === 9 &&
    docsText.includes("The other destinations remain in the research lifecycle")
);

score(
  "FB-WOW-004",
  "Traction and stakeholder restraint",
  15,
  metrics?.status === "use-with-care" &&
    metrics.projectionEligibility === "hold" &&
    metrics.antiClaims.some((value) => /impact/i.test(value)) &&
    docsText.includes("does not report engagement by artists") &&
    !pageText.includes("108 interactions") &&
    !pageText.includes("512 impressions") &&
    !pageText.includes("185 followers")
);

score(
  "FB-WOW-005",
  "Knowledge lifecycle completion",
  15,
  source?.visibility === "public" &&
    inquiry?.resultStatus === "partially-recovered" &&
    knowledgeBank.intake.some(
      (item) => item.id === "INT-WOWLIST-FACEBOOK-POST-FULL-POPULATION-2026"
    ) &&
    knowledgeBank.researchTasks.filter((item) =>
      item.id.startsWith("TASK-WOWLIST-FACEBOOK-")
    ).length === 4 &&
    migration?.maturity === "research-needed" &&
    docsText.includes("## Open research")
);

score(
  "FB-WOW-006",
  "Selective Chad-lens projection",
  10,
  stewardship?.projections.length === 1 &&
    stewardship.projections[0].status === "active" &&
    stewardship.projections[0].surfaces.includes("/work/wowlist") &&
    stewardship.projections[0].text.startsWith("As one of WOW List's co-builders") &&
    stewardship.projections[0].text.includes("all 50 recoverable post details") &&
    stewardship.projections[0].text.includes("not sole authorship") &&
    pageText.match(/CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP/g)
      ?.length === 1 &&
    distribution?.projections.every((projection) => projection.status === "hold")
);

score(
  "FB-WOW-007",
  "Public safety and immutable provenance",
  5,
  source?.canonicalUrl?.includes(
    "blob/a55fa4be1a16325c614d2a689de957df9e1f1594/"
  ) &&
    corpus.publicSafety.rawPostTextPublished === false &&
    corpus.publicSafety.commenterIdentitiesPublished === false &&
    corpus.publicSafety.authenticatedSessionDataPublished === false &&
    !docsText.includes("/Users/") &&
    !docsText.includes("/Volumes/")
);

const mutationCases = [
  {
    id: "drop-record",
    mutate(candidate) {
      candidate.records.pop();
    }
  },
  {
    id: "duplicate-post-id",
    mutate(candidate) {
      candidate.records[1].postId = candidate.records[0].postId;
    }
  },
  {
    id: "invent-table-only-publisher",
    mutate(candidate) {
      candidate.records.find(
        (record) => record.detailRecovery === "table-only"
      ).publisherAttribution = "Jamie Burkart";
    }
  },
  {
    id: "erase-owner-export-boundary",
    mutate(candidate) {
      candidate.populationReconciliation.boundary =
        "This is the complete lifetime history.";
    }
  },
  {
    id: "inflate-theme-count",
    mutate(candidate) {
      candidate.missionPatterns.recordCounts["civic-mobilization"] = 54;
    }
  },
  {
    id: "convert-metrics-to-impact",
    mutate(candidate) {
      candidate.adminMetricSnapshot.boundary =
        "These figures prove audience impact.";
    }
  },
  {
    id: "invent-stakeholder-count",
    mutate(candidate) {
      candidate.missionPatterns.stakeholderEngagementBoundary =
        "Artists and policymakers engaged with every record.";
    }
  },
  {
    id: "leak-raw-post-text",
    mutate(candidate) {
      candidate.records[0].rawPostText = "protected payload";
    }
  },
  {
    id: "leak-private-path",
    mutate(candidate) {
      candidate.privateLocator = "/Users/example/private-capture.json";
    }
  }
];

for (const testCase of mutationCases) {
  const candidate = structuredClone(corpus);
  testCase.mutate(candidate);
  const text = JSON.stringify(candidate);
  const mutationResult = evaluateCorpus(candidate, text);
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
      stewardship?.internalClaim ?? "",
      distribution?.internalClaim ?? "",
      metrics?.internalClaim ?? "",
      migration?.internalClaim ?? "",
      pageText,
      docsText
    ].join("\n")
  )
  .digest("hex");

console.log(
  JSON.stringify(
    {
      suite: "wowlist-facebook-posts-full-population",
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
