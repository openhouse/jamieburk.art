#!/usr/bin/env node

import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

function countBy(items, key) {
  return Object.fromEntries(
    Object.entries(
      items.reduce((counts, item) => {
        counts[item[key]] = (counts[item[key]] ?? 0) + 1;
        return counts;
      }, {})
    ).sort(([left], [right]) => left.localeCompare(right))
  );
}

const activeWebsiteClaims = knowledgeBank.claims.filter((claim) =>
  claim.projections.some(
    (projection) =>
      projection.status === "active" &&
      projection.surfaces.some((surface) => surface.startsWith("/"))
  )
);

const report = {
  generatedAt: new Date().toISOString(),
  totals: {
    intakeItems: knowledgeBank.intakeItems.length,
    sources: knowledgeBank.sources.length,
    observations: knowledgeBank.observations.length,
    claims: knowledgeBank.claims.length,
    researchInquiries: knowledgeBank.researchInquiries.length,
    activeWebsiteClaims: activeWebsiteClaims.length
  },
  intake: {
    researchStatus: countBy(knowledgeBank.intakeItems, "researchStatus"),
    publicationStatus: countBy(knowledgeBank.intakeItems, "publicationStatus")
  },
  claims: {
    status: countBy(knowledgeBank.claims, "status"),
    activeWebsiteIds: activeWebsiteClaims.map((claim) => claim.id)
  },
  researchQueue: knowledgeBank.researchInquiries
    .filter((inquiry) =>
      ["queued", "partially-recovered", "inconclusive"].includes(
        inquiry.resultStatus
      )
    )
    .map((inquiry) => ({
      id: inquiry.id,
      project: inquiry.project,
      status: inquiry.resultStatus,
      question: inquiry.question
    }))
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("Knowledge lifecycle status");
  console.log(JSON.stringify(report, null, 2));
}
