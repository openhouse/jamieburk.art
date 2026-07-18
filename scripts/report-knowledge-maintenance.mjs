#!/usr/bin/env node

import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";

export const reviewedAt = "2026-07-15";
export const reviewAgePolicyDays = 90;

function duplicateIds(records) {
  const seen = new Set();
  const duplicates = new Set();
  for (const record of records) {
    if (seen.has(record.id)) duplicates.add(record.id);
    seen.add(record.id);
  }
  return [...duplicates].sort();
}

function ageInDays(date) {
  return Math.floor(
    (Date.parse(`${reviewedAt}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) /
      86_400_000
  );
}

function unique(values) {
  return [...new Set(values)].sort();
}

export function buildKnowledgeMaintenanceReport() {
  const sourceIds = new Set(knowledgeBank.sources.map(({ id }) => id));
  const assertionSourceIds = new Set(
    knowledgeBank.sourceAssertions.map(({ sourceId }) => sourceId)
  );
  const linkedSourceIds = new Set([
    ...assertionSourceIds,
    ...knowledgeBank.intake.flatMap(({ sourceIds: ids }) => ids),
    ...knowledgeBank.claims.flatMap(({ evidence }) =>
      evidence.map(({ sourceId }) => sourceId)
    ),
    ...knowledgeBank.researchTasks.flatMap(({ sourceIds: ids }) => ids),
    ...knowledgeBank.researchInquiries.flatMap(({ sourceIds: ids }) => ids),
    ...knowledgeBank.pages.flatMap(({ sourceOrder, occurrences }) => [
      ...sourceOrder,
      ...occurrences.flatMap(({ sourceIds: ids = [] }) => ids)
    ])
  ]);
  const referencedSourceIds = unique(linkedSourceIds);
  const unresolvedSourceIds = referencedSourceIds.filter((id) => !sourceIds.has(id));
  const intakeLinkedSourceIds = unique(
    knowledgeBank.intake.flatMap(({ sourceIds: ids }) => ids)
  );
  const intakeSourcesWithoutAssertion = intakeLinkedSourceIds.filter(
    (id) => !assertionSourceIds.has(id)
  );

  const staleClaims = knowledgeBank.claims
    .filter(({ reviewedAt: date }) => ageInDays(date) > reviewAgePolicyDays)
    .map(({ id, reviewedAt: date }) => ({ id, reviewedAt: date }));
  const staleProofs = proofClaims
    .filter(({ lastReviewed }) => ageInDays(lastReviewed) > reviewAgePolicyDays)
    .map(({ id, lastReviewed }) => ({ id, lastReviewed }));

  const targetRoleCoverage = {
    technicalProjectManagement: proofClaims
      .filter(({ relatedCapabilities }) =>
        relatedCapabilities.includes("technical-project-management")
      )
      .map(({ id }) => id),
    productOperations: proofClaims
      .filter(({ relatedCapabilities }) =>
        relatedCapabilities.includes("product-operations")
      )
      .map(({ id }) => id),
    implementation: proofClaims
      .filter(({ relatedCapabilities }) =>
        relatedCapabilities.includes("implementation")
      )
      .map(({ id }) => id),
    dataOrKnowledgeSystems: proofClaims
      .filter(({ relatedCapabilities }) =>
        relatedCapabilities.some((capability) =>
          [
            "data-operations",
            "data-product-scoping",
            "documentation-architecture",
            "knowledge-systems",
            "source-backed-memory"
          ].includes(capability)
        )
      )
      .map(({ id }) => id),
    aiEvaluation: proofClaims
      .filter(({ id, relatedCapabilities }) =>
        id === "ai-evals-professional-development" ||
        relatedCapabilities.some((capability) => capability.includes("eval"))
      )
      .map(({ id }) => id)
  };

  const report = {
    version: 1,
    reviewedAt,
    reviewAgePolicyDays,
    inventory: {
      intake: knowledgeBank.intake.length,
      sources: knowledgeBank.sources.length,
      sourceAssertions: knowledgeBank.sourceAssertions.length,
      claims: knowledgeBank.claims.length,
      proofRecords: proofClaims.length,
      researchTasks: knowledgeBank.researchTasks.length,
      researchInquiries: knowledgeBank.researchInquiries.length,
      citationPages: knowledgeBank.pages.length
    },
    lifecycle: {
      heldClaims: knowledgeBank.claims
        .filter(({ projectionEligibility }) => projectionEligibility === "hold")
        .map(({ id }) => id),
      notRecoveredClaims: knowledgeBank.claims
        .filter(({ status }) => status === "not-recovered")
        .map(({ id }) => id),
      inferenceClaims: knowledgeBank.claims
        .filter(({ status }) => status === "inference")
        .map(({ id }) => id),
      contradictoryAssertions: knowledgeBank.sourceAssertions
        .filter(({ relationship }) => relationship === "contradicts")
        .map(({ id }) => id),
      queuedResearchTasks: knowledgeBank.researchTasks
        .filter(({ status }) => status === "queued")
        .map(({ id }) => id),
      inProgressResearchTasks: knowledgeBank.researchTasks
        .filter(({ status }) => status === "in-progress")
        .map(({ id }) => id)
    },
    reviewAge: {
      staleClaims,
      staleProofs
    },
    integrity: {
      unresolvedSourceIds,
      intakeSourcesWithoutAssertion,
      unlinkedSourceIds: knowledgeBank.sources
        .filter(({ id }) => !linkedSourceIds.has(id))
        .map(({ id }) => id),
      duplicateIds: {
        intake: duplicateIds(knowledgeBank.intake),
        sources: duplicateIds(knowledgeBank.sources),
        sourceAssertions: duplicateIds(knowledgeBank.sourceAssertions),
        claims: duplicateIds(knowledgeBank.claims),
        proofRecords: duplicateIds(proofClaims),
        researchTasks: duplicateIds(knowledgeBank.researchTasks),
        researchInquiries: duplicateIds(knowledgeBank.researchInquiries)
      }
    },
    targetRoleCoverage,
    boundaries: [
      "Held, inference, use-with-care, and not-recovered records remain visible maintenance work; this report does not promote them.",
      "Contradictions are review signals, not errors to delete automatically.",
      "The report contains public-safe identifiers and aggregates only; no private source locators or underlying records are emitted."
    ]
  };

  return {
    ...report,
    fingerprint: createHash("sha256")
      .update(JSON.stringify(report))
      .digest("hex")
  };
}

function run() {
  console.log(JSON.stringify(buildKnowledgeMaintenanceReport(), null, 2));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
