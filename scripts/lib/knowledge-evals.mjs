import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { validateKnowledgeBank } from "./citation-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const suitePath = path.join(repoRoot, "evals/knowledge-bank/evals.json");
const publicRegistryPath = path.join(repoRoot, "apps/www/src/data/knowledge-bank/public-registry.json");

export function loadKnowledgeEvalSuite() {
  return JSON.parse(readFileSync(suitePath, "utf8"));
}

function score(passed, strong = true) {
  return passed ? (strong ? 5 : 4) : 1;
}

export function evaluateKnowledgeBank(suite = loadKnowledgeEvalSuite()) {
  const intakeById = new Map(knowledgeBank.intakeItems.map((item) => [item.id, item]));
  const observationById = new Map(knowledgeBank.observations.map((item) => [item.id, item]));
  const sourceById = new Map(knowledgeBank.sources.map((item) => [item.id, item]));
  const claimById = new Map(knowledgeBank.claims.map((item) => [item.id, item]));
  const inquiryById = new Map(knowledgeBank.researchInquiries.map((item) => [item.id, item]));
  const fairRentPage = knowledgeBank.pages.find((page) => page.id === "fair-rent-nyc");
  const fairRentMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/fair-rent-nyc.mdx"), "utf8");
  const errors = validateKnowledgeBank();

  const pilotIntakes = suite.pilot.intakeIds.map((id) => intakeById.get(id));
  const pilotSources = suite.pilot.sourceIds.map((id) => sourceById.get(id));
  const pilotClaims = suite.pilot.claimIds.map((id) => claimById.get(id));
  const pilotInquiries = suite.pilot.inquiryIds.map((id) => inquiryById.get(id));
  const pilotObservations = pilotIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const expansion = suite.pilot.sourceExpansion;
  const expansionIntakes = expansion.intakeIds.map((id) => intakeById.get(id));
  const expansionSources = expansion.sourceIds.map((id) => sourceById.get(id));
  const expansionClaims = expansion.claimIds.map((id) => claimById.get(id));
  const expansionInquiries = expansion.inquiryIds.map((id) => inquiryById.get(id));
  const expansionObservations = expansionIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const allEvaluatedObservations = [...pilotObservations, ...expansionObservations];
  const allEvaluatedClaims = [...pilotClaims, ...expansionClaims];
  const allEvaluatedInquiries = [...pilotInquiries, ...expansionInquiries];
  const triangulatedExpansionClaims = expansionClaims.filter(
    (claim) => claim && new Set(claim.evidence.map((evidence) => evidence.sourceId)).size >= 2
  );
  const heldExpansionClaims = expansionClaims.filter((claim) =>
    claim?.projections.some((projection) => projection.status === "hold")
  );
  const selectedExpansionClaims = expansion.selectedClaimIds.map((id) => claimById.get(id));
  const photoFeedback = suite.pilot.photoFeedbackChain;
  const photoIntake = intakeById.get(photoFeedback.intakeId);
  const photoObservation = observationById.get(photoFeedback.observationId);
  const photoSource = sourceById.get(photoFeedback.sourceId);
  const photoClaim = claimById.get(photoFeedback.claimId);
  const photoInquiry = inquiryById.get(photoFeedback.inquiryId);
  const publicRegistryText = readFileSync(publicRegistryPath, "utf8");
  const privatePhotoEvidence = photoClaim?.evidence.find(
    (evidence) => evidence.sourceId === photoFeedback.sourceId
  );
  const photoChainComplete = Boolean(
    photoIntake?.kind === "photo-lead" &&
      photoIntake.visibility === "protected" &&
      photoIntake.sourceIds.includes(photoFeedback.sourceId) &&
      photoIntake.observationIds.includes(photoFeedback.observationId) &&
      photoIntake.researchInquiryIds.includes(photoFeedback.inquiryId) &&
      photoObservation?.kind === "visual-observation" &&
      photoObservation.sourceId === photoFeedback.sourceId &&
      photoObservation.claimIds.includes(photoFeedback.claimId) &&
      photoObservation.researchInquiryIds.includes(photoFeedback.inquiryId) &&
      photoSource?.visibility === "public-metadata-only" &&
      photoSource.media?.rightsStatus === "permission-needed" &&
      photoSource.media?.consentStatus === "review-needed" &&
      photoSource.media?.publicDisplayStatus === "hold" &&
      privatePhotoEvidence?.relationship === "private-support" &&
      privatePhotoEvidence.renderCitation === false &&
      photoClaim?.researchInquiryIds.includes(photoFeedback.inquiryId) &&
      photoClaim.projections.length > 0 &&
      photoClaim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      photoInquiry?.sourceIds.includes(photoFeedback.sourceId) &&
      photoInquiry.limitations.length &&
      !publicRegistryText.includes(photoFeedback.intakeId) &&
      !publicRegistryText.includes(photoFeedback.observationId) &&
      !publicRegistryText.includes(photoFeedback.sourceId) &&
      !publicRegistryText.includes(photoFeedback.claimId) &&
      !publicRegistryText.includes(photoFeedback.inquiryId) &&
      Boolean(photoSource.protectedLocatorId) &&
      !publicRegistryText.includes(photoSource.protectedLocatorId)
  );

  const criteria = [
    {
      criterionId: "KB-EVAL-INTAKE",
      score: score(
        pilotIntakes.every((item) => item && item.boundaries.length && (item.sourceIds.length || item.researchInquiryIds.length)) &&
        expansionIntakes.length === expansion.expectedSourceCount &&
        expansionIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length && item.sourceIds.length === 1 && item.observationIds.length)
      ),
      evidence: [`${pilotIntakes.filter(Boolean).length} original pilot intakes plus ${expansionIntakes.filter(Boolean).length}/${expansion.expectedSourceCount} source-expansion intakes retained with dispositions, observations, and boundaries`]
    },
    {
      criterionId: "KB-EVAL-ATOMICITY",
      score: score(
        allEvaluatedObservations.length >= 30 &&
        allEvaluatedObservations.every((item) => item?.locator && item.limitations.length && (item.claimIds.length || item.researchInquiryIds.length))
      ),
      evidence: [`${allEvaluatedObservations.filter(Boolean).length} proposition-level observations have locators, limitations, and claim or inquiry links`]
    },
    {
      criterionId: "KB-EVAL-SCOPE",
      score: score(
        [...pilotSources, ...expansionSources].every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
        expansionSources.length === expansion.expectedSourceCount &&
        !errors.some((error) => /does not establish|support a proposition/i.test(error))
      ),
      evidence: [`${expansionSources.filter(Boolean).length}/${expansion.expectedSourceCount} new sources and all original pilot sources have explicit support and doesNotEstablish boundaries`]
    },
    {
      criterionId: "KB-EVAL-MATURATION",
      score: score(
        allEvaluatedClaims.every((claim) => claim?.evidence.length && claim.boundaries.length && claim.antiClaims.length && claim.reviewedBy.length) &&
        allEvaluatedInquiries.every((inquiry) => inquiry?.limitations.length && inquiry.findings.length) &&
        expansionClaims.length === expansion.claimIds.length,
        triangulatedExpansionClaims.length >= 4
      ),
      evidence: [`${expansionClaims.filter(Boolean).length} new claims matured; ${triangulatedExpansionClaims.length} are supported by multiple source records; ${allEvaluatedInquiries.filter(Boolean).length} evaluated inquiries retain limitations`]
    },
    {
      criterionId: "KB-EVAL-PROJECTION",
      score: score(
        allEvaluatedClaims.every((claim) => claim?.projections.every((projection) => projection.status !== "hold" || projection.surfaces.length === 0)) &&
        selectedExpansionClaims.every((claim) => claim?.projections.some((projection) => projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc"))) &&
        Boolean(fairRentPage)
      ),
      evidence: [`Held claims have no public surface; ${selectedExpansionClaims.filter(Boolean).length} source-expansion claims have authorized FairRentNYC projections`]
    },
    {
      criterionId: "KB-EVAL-COVERAGE",
      score: score(
        Boolean(fairRentPage) &&
        fairRentMdx.includes("CLM-NYCAC-CABARET-SAFETY-ORGANIZING") &&
        expansion.selectedClaimIds.every((id) => fairRentMdx.includes(id)) &&
        fairRentPage.occurrences.length >= 4 &&
        knowledgeBank.proofCoverageTargets.length === proofClaims.length
      ),
      evidence: [`Four hiring-relevant NYCAC assertions now have canonical page citations; ${knowledgeBank.proofCoverageTargets.length}/${proofClaims.length} existing proof claims have evidence-coverage dispositions`]
    },
    {
      criterionId: "KB-EVAL-SAFETY",
      score: score(errors.length === 0 && knowledgeBank.intakeItems.every((item) => !item.sourceUrl || /^https:\/\//.test(item.sourceUrl))),
      evidence: [errors.length ? `${errors.length} canonical validation errors` : "Canonical validation passes with no private-path or protected-locator leak"]
    },
    {
      criterionId: "KB-EVAL-RECOMPOSITION",
      score: score(
        pilotClaims.some((claim) => claim?.projections.some((projection) => projection.status === "hold")) &&
        heldExpansionClaims.length >= 3 &&
        expansionInquiries.some((inquiry) => inquiry?.id === "INQ-NYCAC-PUBLIC-WEB-AUTHORSHIP") &&
        knowledgeBank.intakeItems.some((item) => item.kind === "memory-lead") &&
        existsSync(path.join(repoRoot, "docs/knowledge-bank/intake-and-maturation.md")) &&
        photoChainComplete
      ),
      evidence: [photoChainComplete
        ? `${heldExpansionClaims.length} newly mature claims remain held beside open inquiries, memory leads, and the protected photo feedback chain`
        : "The canonical photo-feedback chain is incomplete"]
    }
  ];

  const byId = new Map(suite.criteria.map((criterion) => [criterion.id, criterion]));
  let weightedScore = 0;
  const belowMinimum = [];
  for (const result of criteria) {
    const definition = byId.get(result.criterionId);
    weightedScore += result.score * definition.weight;
    if (result.score < definition.minimumScore) belowMinimum.push(result.criterionId);
  }
  weightedScore = Math.round(weightedScore * 1000) / 1000;

  return {
    criteria,
    weightedScore,
    belowMinimum,
    errors,
    accepted: errors.length === 0 && belowMinimum.length === 0 && weightedScore >= suite.targets.weightedScoreAtLeast
  };
}
