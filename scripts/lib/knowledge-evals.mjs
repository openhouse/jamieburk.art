import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { kcTownHallFunding } from "../../apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
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
  const kcTownHallMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"), "utf8");
  const workData = readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8");
  const proofData = readFileSync(path.join(repoRoot, "apps/www/src/data/proofs.ts"), "utf8");
  const publicRegistryText = readFileSync(publicRegistryPath, "utf8");
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
  const pressArchive = suite.pilot.pressArchive;
  const pressIntakes = pressArchive.intakeIds.map((id) => intakeById.get(id));
  const pressIndexSources = pressArchive.indexSourceIds.map((id) => sourceById.get(id));
  const pressClaim = claimById.get(pressArchive.claimId);
  const pressInquiry = inquiryById.get(pressArchive.inquiryId);
  const pressEntries = campaignPressInventory.flatMap((campaign) => campaign.entries);
  const uniquePressArticleSourceIds = [...new Set(pressEntries.map((entry) => entry.sourceId))];
  const pressArticleSources = uniquePressArticleSourceIds.map((id) => sourceById.get(id));
  const pressObservations = pressIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const pressCounts = Object.fromEntries(
    campaignPressInventory.map((campaign) => [campaign.id, campaign.entries.length])
  );
  const duplicateAppearanceCount = pressEntries.filter(
    (entry) => entry.sourceId === pressArchive.duplicateSourceId
  ).length;
  const pressArchiveComplete = Boolean(
    campaignPressInventory.length === pressArchive.expectedIndexCount &&
      pressEntries.length === pressArchive.expectedAppearanceCount &&
      uniquePressArticleSourceIds.length === pressArchive.expectedUniqueArticleCount &&
      nycacPressArchive.sources.length === pressArchive.expectedNewSourceCount &&
      nycacPressArchive.sources.filter((source) => source.kind === "published-article").length === pressArchive.expectedNewArticleSourceCount &&
      Object.entries(pressArchive.campaignEntryCounts).every(
        ([campaignId, expected]) => pressCounts[campaignId] === expected
      ) &&
      duplicateAppearanceCount === 2 &&
      pressIntakes.length === pressArchive.expectedIndexCount &&
      pressIntakes.every(
        (intake) => intake?.disposition === "integrated" && intake.sourceIds.length === 1 && intake.boundaries.length >= 2
      ) &&
      pressIndexSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
      pressArticleSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
      pressObservations.length === pressArchive.expectedAppearanceCount &&
      pressObservations.every(
        (observation) => observation?.locator && observation.limitations.length && observation.claimIds.includes(pressArchive.claimId) && observation.researchInquiryIds.includes(pressArchive.inquiryId)
      ) &&
      pressClaim?.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      pressClaim.evidence.length === pressArchive.expectedIndexCount &&
      pressInquiry?.sourceIds.length === pressArchive.expectedIndexCount + pressArchive.expectedUniqueArticleCount &&
      pressInquiry.limitations.length >= 4
  );
  const kcFunding = suite.pilot.kcTownHallFunding;
  const kcFundingIntake = intakeById.get(kcFunding.intakeId);
  const kcFundingSources = kcFunding.sourceIds.map((id) => sourceById.get(id));
  const kcFundingObservations = kcFundingIntake?.observationIds.map((id) => observationById.get(id)) ?? [];
  const kcFundingClaims = kcFunding.claimIds.map((id) => claimById.get(id));
  const kcFundingInquiry = inquiryById.get(kcFunding.inquiryId);
  const kcTransitionIntake = intakeById.get(kcFunding.transitionIntakeId);
  const kcTransitionObservation = observationById.get(kcFunding.transitionObservationId);
  const kcTransitionClaim = claimById.get(kcFunding.transitionClaimId);
  const kcTransitionInquiry = inquiryById.get(kcFunding.transitionInquiryId);
  const kcFundingCorrection = knowledgeBank.corrections.find((item) => item.id === kcFunding.correctionId);
  const kcFundingCoverage = knowledgeBank.proofCoverageTargets.find((item) => item.proofId === kcFunding.proofId);
  const kcFundingPage = knowledgeBank.pages.find((item) => item.id === kcFunding.pageId);
  const kcProjectionText = kcFundingClaims.flatMap((claim) => claim?.projections.map((projection) => projection.text) ?? []).join(" ");
  const kcFundingComplete = Boolean(
    kcTownHallFunding.sources.length === kcFunding.expectedSourceCount &&
      kcFundingIntake?.disposition === "integrated" &&
      kcFundingIntake.sourceIds.length === kcFunding.expectedSourceCount &&
      kcFundingIntake.observationIds.length === kcFunding.expectedObservationCount &&
      kcFundingIntake.researchInquiryIds.includes(kcFunding.inquiryId) &&
      kcFundingIntake.boundaries.length >= 3 &&
      kcFundingSources.every(
        (source) => source?.kind === "government-record" && source.visibility === "public" && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      kcFundingObservations.length === kcFunding.expectedObservationCount &&
      kcFundingObservations.every(
        (observation) => observation?.status === "verified" && observation.locator && observation.limitations.length && observation.claimIds.length && observation.researchInquiryIds.includes(kcFunding.inquiryId)
      ) &&
      kcFundingClaims.every(
        (claim) => claim?.status === "confirmed-with-boundary" && claim.evidence.length >= 2 && claim.boundaries.length >= 2 && claim.antiClaims.length >= 3 && claim.reviewedBy.length >= 2 && claim.projections.every((projection) => projection.status === "active" && projection.citationRequired && projection.surfaces.includes("/work/kc-town-hall"))
      ) &&
      kcFundingInquiry?.resultStatus === "recovered" &&
      kcFundingInquiry.sourceIds.length === kcFunding.expectedSourceCount &&
      kcFundingInquiry.findings.length === kcFunding.expectedObservationCount &&
      kcFundingInquiry.limitations.length >= 4 &&
      kcFundingCorrection?.status === "active" &&
      kcFundingCorrection.replacementText.includes("not disbursed") &&
      kcFundingCoverage?.status === "source-backed" &&
      kcFundingCoverage.sourceIds.length === kcFunding.expectedSourceCount &&
      kcFundingCoverage.researchInquiryIds.includes(kcFunding.inquiryId) &&
      kcFundingPage?.occurrences.length === kcFunding.claimIds.length &&
      kcFundingPage.sourceOrder.length === kcFunding.expectedPublicSourceCount &&
      kcFunding.claimIds.every((id) => kcTownHallMdx.includes(id)) &&
      kcTownHallMdx.includes("do not establish that Jamie alone caused the Council action") &&
      workData.includes("funds were not ultimately disbursed") &&
      proofData.includes("funds were not ultimately disbursed") &&
      !/KC Town Hall received (?:or spent )?(?:the )?\$490,539/i.test(kcProjectionText) &&
      !kcTownHallMdx.includes("recommendation unless final funding details") &&
      kcTransitionIntake?.kind === "memory-lead" &&
      kcTransitionIntake.disposition === "captured" &&
      kcTransitionIntake.visibility === "public-safe" &&
      kcTransitionIntake.sourceIds.length === 0 &&
      kcTransitionIntake.observationIds.includes(kcFunding.transitionObservationId) &&
      kcTransitionIntake.researchInquiryIds.includes(kcFunding.transitionInquiryId) &&
      kcTransitionIntake.boundaries.length >= 3 &&
      kcTransitionObservation?.kind === "participant-memory" &&
      kcTransitionObservation.status === "captured" &&
      !kcTransitionObservation.sourceId &&
      kcTransitionObservation.claimIds.includes(kcFunding.transitionClaimId) &&
      kcTransitionObservation.researchInquiryIds.includes(kcFunding.transitionInquiryId) &&
      kcTransitionClaim?.status === "use-with-care" &&
      kcTransitionClaim.evidence.length === 0 &&
      kcTransitionClaim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      kcTransitionClaim.boundaries.length >= 3 &&
      kcTransitionClaim.antiClaims.includes("Jamie abandoned the project.") &&
      kcTransitionInquiry?.resultStatus === "inconclusive" &&
      kcTransitionInquiry.sourceIds.length === 0 &&
      kcTransitionInquiry.limitations.length >= 3 &&
      !publicRegistryText.includes(kcFunding.transitionClaimId)
  );
  const allEvaluatedObservations = [...pilotObservations, ...expansionObservations, ...pressObservations, ...kcFundingObservations, kcTransitionObservation];
  const allEvaluatedClaims = [...pilotClaims, ...expansionClaims, pressClaim, ...kcFundingClaims, kcTransitionClaim];
  const allEvaluatedInquiries = [...pilotInquiries, ...expansionInquiries, pressInquiry, kcFundingInquiry, kcTransitionInquiry];
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
        expansionIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length && item.sourceIds.length === 1 && item.observationIds.length) &&
        pressIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length >= 2 && item.sourceIds.length === 1 && item.observationIds.length) &&
        kcFundingIntake?.disposition === "integrated" && kcFundingIntake.boundaries.length >= 3
      ),
      evidence: [`${pilotIntakes.filter(Boolean).length} original pilot intakes, ${expansionIntakes.filter(Boolean).length}/${expansion.expectedSourceCount} source-expansion intakes, and ${pressIntakes.filter(Boolean).length}/${pressArchive.expectedIndexCount} press-index intakes retain dispositions, observations, and boundaries`]
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
        [...pilotSources, ...expansionSources, ...pressIndexSources, ...pressArticleSources, ...kcFundingSources].every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
        expansionSources.length === expansion.expectedSourceCount &&
        !errors.some((error) => /does not establish|support a proposition/i.test(error))
      ),
      evidence: [`${expansionSources.filter(Boolean).length}/${expansion.expectedSourceCount} source-expansion records and ${pressArticleSources.filter(Boolean).length}/${pressArchive.expectedUniqueArticleCount} distinct press articles have explicit support and doesNotEstablish boundaries`]
    },
    {
      criterionId: "KB-EVAL-MATURATION",
      score: score(
        allEvaluatedClaims.every((claim) =>
          claim?.boundaries.length &&
          claim.antiClaims.length &&
          claim.reviewedBy.length &&
          (
            claim.evidence.length ||
            (
              claim.status === "use-with-care" &&
              claim.researchInquiryIds.length &&
              claim.projections.every(
                (projection) => projection.status === "hold" && projection.surfaces.length === 0
              )
            )
          )
        ) &&
        allEvaluatedInquiries.every((inquiry) => inquiry?.limitations.length && inquiry.findings.length) &&
        expansionClaims.length === expansion.claimIds.length,
        triangulatedExpansionClaims.length >= 4
      ),
      evidence: [`${expansionClaims.filter(Boolean).length} new claims matured; ${triangulatedExpansionClaims.length} are supported by multiple source records; held participant-memory claims remain inquiry-linked; ${allEvaluatedInquiries.filter(Boolean).length} evaluated inquiries retain limitations`]
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
        kcFundingComplete &&
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
        photoChainComplete &&
        pressClaim?.projections.every((projection) => projection.status === "hold") &&
        pressInquiry?.resultStatus === "partially-recovered"
      ),
      evidence: [photoChainComplete
        ? `${heldExpansionClaims.length} newly mature claims and the complete press-archive claim remain held beside open inquiries, memory leads, and the protected photo feedback chain`
        : "The canonical photo-feedback chain is incomplete"]
    },
    {
      criterionId: "KB-EVAL-PRESS-ARCHIVE",
      score: score(pressArchiveComplete),
      evidence: [pressArchiveComplete
        ? `${pressEntries.length} appearances across ${campaignPressInventory.length} campaign indexes resolve to ${uniquePressArticleSourceIds.length} distinct bounded article records; duplicate campaign selection is preserved`
        : "Campaign press inventory is missing an appearance, source, boundary, disposition, or exact count"]
    },
    {
      criterionId: "KB-EVAL-KCTH-FUNDING-LIFECYCLE",
      score: score(kcFundingComplete),
      evidence: [kcFundingComplete
        ? "Five official records preserve the CCED recommendation, Council acceptance and appropriation, zero disbursement, withdrawal, and 2024 return; Jamie's stewardship-transition account remains a separate held memory lead; four nonredundant notes support the two-claim public projection"
        : "KC Town Hall funding lifecycle, held stewardship-transition lead, source scope, observations, claims, boundaries, proof coverage, correction, or public citation plan is incomplete"]
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
