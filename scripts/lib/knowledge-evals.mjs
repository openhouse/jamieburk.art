import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
  const entityById = new Map(knowledgeBank.entities.map((item) => [item.id, item]));
  const relationById = new Map(knowledgeBank.agencyRelations.map((item) => [item.id, item]));
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
  const secondExpansion = suite.pilot.secondSourceExpansion;
  const secondExpansionIntakes = secondExpansion.intakeIds.map((id) => intakeById.get(id));
  const secondExpansionSources = secondExpansion.sourceIds.map((id) => sourceById.get(id));
  const secondExpansionClaims = secondExpansion.claimIds.map((id) => claimById.get(id));
  const secondExpansionInquiries = secondExpansion.inquiryIds.map((id) => inquiryById.get(id));
  const secondExpansionObservations = secondExpansionIntakes.flatMap((item) =>
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
  const allEvaluatedObservations = [...pilotObservations, ...expansionObservations, ...secondExpansionObservations, ...pressObservations];
  const allEvaluatedClaims = [...pilotClaims, ...expansionClaims, ...secondExpansionClaims, pressClaim];
  const allEvaluatedInquiries = [...pilotInquiries, ...expansionInquiries, ...secondExpansionInquiries, pressInquiry];
  const allExpansionClaims = [...expansionClaims, ...secondExpansionClaims];
  const triangulatedExpansionClaims = allExpansionClaims.filter(
    (claim) => claim && new Set(claim.evidence.map((evidence) => evidence.sourceId)).size >= 2
  );
  const heldExpansionClaims = allExpansionClaims.filter((claim) =>
    claim?.projections.some((projection) => projection.status === "hold")
  );
  const selectedExpansionClaims = [...expansion.selectedClaimIds, ...secondExpansion.selectedClaimIds].map((id) => claimById.get(id));
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
  const agency = suite.pilot.agencyGraph;
  const agencyRelations = agency.relationIds.map((id) => relationById.get(id));
  const enactedRelations = knowledgeBank.agencyRelations.filter(
    (relation) => relation.action === "enacted"
  );
  const expectedEnactedIds = new Set(agency.enactedRelationIds);
  const openAgencyInquiries = agency.openInquiryIds.map((id) => inquiryById.get(id));
  const webImplementationClaim = claimById.get("CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION");
  const webAuthorshipInquiry = inquiryById.get("INQ-NYCAC-PUBLIC-WEB-AUTHORSHIP");
  const legacyWebProof = proofClaims.find(
    (claim) => claim.id === "nyc-artist-coalition-public-web-infrastructure"
  );
  const webAuthorshipAligned = Boolean(
    webImplementationClaim?.evidence.some(
      (evidence) => evidence.sourceId === "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE"
    ) &&
      webImplementationClaim.evidence.some(
        (evidence) => evidence.sourceId === "SRC-FAIRRENTNYC-GITHUB-REPOSITORY"
      ) &&
      webImplementationClaim.projections.some(
        (projection) => projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc")
      ) &&
      !webImplementationClaim.projections.some((projection) =>
        /sole(?:ly)?[^.]{0,40}(?:policy|copy|data|design)/i.test(projection.text)
      ) &&
      ["policy", "copy", "data", "design"].every((term) =>
        webImplementationClaim.antiClaims.some((antiClaim) =>
          antiClaim.toLowerCase().includes(term)
        )
      ) &&
      webAuthorshipInquiry?.sourceIds.includes("SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE") &&
      webAuthorshipInquiry.resultStatus === "partially-recovered" &&
      webAuthorshipInquiry.limitations.some((limitation) => /copy|data|design/i.test(limitation)) &&
      fairRentMdx.includes("CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION") &&
      !fairRentMdx.includes("Jamie co-founded NYC Artist Coalition and built public campaign websites") &&
      legacyWebProof?.sourceBasis.includes("retained Git histories")
  );
  const marchInquiry = inquiryById.get("INQ-NYCAC-MARCH-RAIDS");
  const marchPolicyClaim = claimById.get("CLM-NYCAC-TALKS-NOT-RAIDS-POLICY-ARC");
  const requiredMarchInquirySourceIds = [
    "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE",
    "SRC-NYCAC-CREATENYC-SUBMISSION-2017-03-17",
    "SRC-NYC-MARCH-REPORT-Q1-Q2-2020",
    "SRC-NYC-MARCH-LOCAL-LAW-220-2019",
    "SRC-NYC-ONL-REPORT-2022",
    "SRC-NYC-ONL-REPORT-2023-24"
  ];
  const requiredMarchClaimSourceIds = requiredMarchInquirySourceIds.filter(
    (sourceId) => sourceId !== "SRC-NYC-ONL-REPORT-2022"
  );
  const marchProjectionText = marchPolicyClaim?.projections
    .filter((projection) => projection.status === "active")
    .map((projection) => projection.text)
    .join(" ") ?? "";
  const marchResearchAligned = Boolean(
    marchInquiry?.resultStatus === "recovered" &&
      requiredMarchInquirySourceIds.every((sourceId) => marchInquiry.sourceIds.includes(sourceId)) &&
      requiredMarchClaimSourceIds.every((sourceId) =>
        marchPolicyClaim?.evidence.some((evidence) => evidence.sourceId === sourceId)
      ) &&
      marchPolicyClaim?.projections.some(
        (projection) => projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc")
      ) &&
      marchPolicyClaim.antiClaims.some((antiClaim) => /disbanded M\.A\.R\.C\.H\./i.test(antiClaim)) &&
      !marchPolicyClaim.projections.some((projection) =>
        /Jamie[^.]{0,50}(?:caused|disbanded|ended|replaced) M\.A\.R\.C\.H\./i.test(projection.text)
      ) &&
      /NYPD-led inspection program/.test(marchProjectionText) &&
      /criminal-investigation and serious health-or-safety exceptions/.test(marchProjectionText) &&
      !/notice-based alternatives/.test(marchProjectionText) &&
      fairRentMdx.includes("CLM-NYCAC-TALKS-NOT-RAIDS-POLICY-ARC")
  );
  const agencyGraphComplete = Boolean(
    knowledgeBank.entities.length === agency.expectedEntityCount &&
      new Set(knowledgeBank.entities.map((entity) => entity.id)).size === agency.expectedEntityCount &&
      knowledgeBank.agencyRelations.length === agency.expectedRelationCount &&
      new Set(knowledgeBank.agencyRelations.map((relation) => relation.id)).size === agency.expectedRelationCount &&
      agencyRelations.every(Boolean) &&
      agencyRelations.every((relation) =>
        relation.actorIds.every((actorId) => entityById.get(actorId)?.publicSafe) &&
        entityById.get(relation.objectId)?.publicSafe &&
        relation.claimIds.every((claimId) => claimById.has(claimId)) &&
        relation.sourceIds.every((sourceId) => sourceById.get(sourceId)?.visibility === "public") &&
        relation.sourceIds.every((sourceId) =>
          relation.claimIds.some((claimId) =>
            claimById.get(claimId)?.evidence.some((evidence) => evidence.sourceId === sourceId)
          )
        ) &&
        relation.purpose &&
        relation.result &&
        relation.boundaries.length &&
        relation.reviewedBy.length
      ) &&
      enactedRelations.length === agency.enactedRelationIds.length &&
      enactedRelations.every((relation) =>
        expectedEnactedIds.has(relation.id) &&
        relation.actorIds.length === 1 &&
        relation.actorIds[0] === "ENT-NYC-COUNCIL" &&
        relation.creditScope === "institutional" &&
        relation.sourceIds.every((sourceId) => sourceById.get(sourceId)?.kind === "government-record")
      ) &&
      !knowledgeBank.agencyRelations.some(
        (relation) => relation.actorIds.includes("ENT-JAMIE-BURKART") && relation.action === "enacted"
      ) &&
      ["individual", "shared", "collective", "institutional"].every((creditScope) =>
        knowledgeBank.agencyRelations.some((relation) => relation.creditScope === creditScope)
      ) &&
      marchResearchAligned &&
      openAgencyInquiries.every((inquiry) => inquiry?.resultStatus === "inconclusive") &&
      existsSync(path.join(repoRoot, "docs/knowledge-bank/agency-and-collective-credit.md"))
  );

  const criteria = [
    {
      criterionId: "KB-EVAL-INTAKE",
      score: score(
        pilotIntakes.every((item) => item && item.boundaries.length && (item.sourceIds.length || item.researchInquiryIds.length)) &&
        expansionIntakes.length === expansion.expectedSourceCount &&
        expansionIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length && item.sourceIds.length === 1 && item.observationIds.length) &&
        secondExpansionIntakes.length === secondExpansion.expectedSourceCount &&
        secondExpansionIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length && item.sourceIds.length === 1 && item.observationIds.length) &&
        pressIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length >= 2 && item.sourceIds.length === 1 && item.observationIds.length)
      ),
      evidence: [`${pilotIntakes.filter(Boolean).length} original pilot intakes, ${expansionIntakes.filter(Boolean).length}/${expansion.expectedSourceCount} first-expansion intakes, ${secondExpansionIntakes.filter(Boolean).length}/${secondExpansion.expectedSourceCount} second-expansion intakes, and ${pressIntakes.filter(Boolean).length}/${pressArchive.expectedIndexCount} press-index intakes retain dispositions, observations, and boundaries`]
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
        [...pilotSources, ...expansionSources, ...secondExpansionSources, ...pressIndexSources, ...pressArticleSources].every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
        expansionSources.length === expansion.expectedSourceCount &&
        secondExpansionSources.length === secondExpansion.expectedSourceCount &&
        !errors.some((error) => /does not establish|support a proposition/i.test(error))
      ),
      evidence: [`${expansionSources.filter(Boolean).length + secondExpansionSources.filter(Boolean).length}/${expansion.expectedSourceCount + secondExpansion.expectedSourceCount} source-expansion records and ${pressArticleSources.filter(Boolean).length}/${pressArchive.expectedUniqueArticleCount} distinct press articles have explicit support and doesNotEstablish boundaries`]
    },
    {
      criterionId: "KB-EVAL-MATURATION",
      score: score(
        allEvaluatedClaims.every((claim) => claim?.evidence.length && claim.boundaries.length && claim.antiClaims.length && claim.reviewedBy.length) &&
        allEvaluatedInquiries.every((inquiry) => inquiry?.limitations.length && inquiry.findings.length) &&
        expansionClaims.length === expansion.claimIds.length &&
        secondExpansionClaims.length === secondExpansion.claimIds.length,
        triangulatedExpansionClaims.length >= 8
      ),
      evidence: [`${allExpansionClaims.filter(Boolean).length} source-expansion claims and one repository-backed implementation claim matured; ${triangulatedExpansionClaims.length} source-expansion claims are supported by multiple source records; ${allEvaluatedInquiries.filter(Boolean).length} evaluated inquiries retain limitations`]
    },
    {
      criterionId: "KB-EVAL-PROJECTION",
      score: score(
        allEvaluatedClaims.every((claim) => claim?.projections.every((projection) => projection.status !== "hold" || projection.surfaces.length === 0)) &&
        selectedExpansionClaims.every((claim) => claim?.projections.some((projection) => projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc"))) &&
        webAuthorshipAligned &&
        marchResearchAligned &&
        Boolean(fairRentPage)
      ),
      evidence: [`Held claims have no public surface; ${selectedExpansionClaims.filter(Boolean).length} source-expansion claims and one repository-backed implementation claim have authorized FairRentNYC projections`]
    },
    {
      criterionId: "KB-EVAL-COVERAGE",
      score: score(
        Boolean(fairRentPage) &&
        fairRentMdx.includes("CLM-NYCAC-CABARET-SAFETY-ORGANIZING") &&
        fairRentMdx.includes("CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION") &&
        expansion.selectedClaimIds.every((id) => fairRentMdx.includes(id)) &&
        secondExpansion.selectedClaimIds.every((id) => fairRentMdx.includes(id)) &&
        fairRentPage.occurrences.length >= 6 &&
        knowledgeBank.proofCoverageTargets.length === proofClaims.length
      ),
      evidence: [`Six hiring-relevant NYCAC assertions now have canonical page citations; ${knowledgeBank.proofCoverageTargets.length}/${proofClaims.length} existing proof claims have evidence-coverage dispositions`]
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
      criterionId: "KB-EVAL-AGENCY",
      score: score(agencyGraphComplete),
      evidence: [agencyGraphComplete
        ? `${agencyRelations.length} source-linked relations distinguish individual, shared, collective, and institutional agency; enactment remains assigned only to the Council`
        : "The agency graph has a missing relation, broken reference, unbounded credit claim, or advocacy-to-enactment distortion"]
    },
    {
      criterionId: "KB-EVAL-PRESS-ARCHIVE",
      score: score(pressArchiveComplete),
      evidence: [pressArchiveComplete
        ? `${pressEntries.length} appearances across ${campaignPressInventory.length} campaign indexes resolve to ${uniquePressArticleSourceIds.length} distinct bounded article records; duplicate campaign selection is preserved`
        : "Campaign press inventory is missing an appearance, source, boundary, disposition, or exact count"]
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
