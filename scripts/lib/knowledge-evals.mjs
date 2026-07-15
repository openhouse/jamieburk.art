import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { callNycCorpusFindings, callNycPopulationAudit, callNycSocialCorpus } from "../../apps/www/src/data/knowledge-bank/callnyc-social-corpus.ts";
import { googleDriveSharedDrivesProduction } from "../../apps/www/src/data/knowledge-bank/google-drive-shared-drives-production.ts";
import { kcTownHallFunding } from "../../apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts";
import { kcTownHallCorpusFindings, kcTownHallPopulationAudit, kcTownHallSocialCorpus } from "../../apps/www/src/data/knowledge-bank/kctownhall-social-corpus.ts";
import { nycacCorpusFindings, nycacPopulationAudit, nycacSocialCorpus } from "../../apps/www/src/data/knowledge-bank/nycac-social-corpus.ts";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { socialMediaArchiveProduction } from "../../apps/www/src/data/knowledge-bank/social-media-archive-production.ts";
import { teamsArchiveProduction } from "../../apps/www/src/data/knowledge-bank/teams-archive-production.ts";
import { urbanhermitCorpusFindings, urbanhermitPopulationAudit, urbanhermitSocialCorpus } from "../../apps/www/src/data/knowledge-bank/urbanhermit-social-corpus.ts";
import { wowlistCorpusFindings, wowlistPopulationAudit, wowlistSocialCorpus } from "../../apps/www/src/data/knowledge-bank/wowlist-social-corpus.ts";
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

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function evaluateKnowledgeBank(suite = loadKnowledgeEvalSuite(), fixtures = {}) {
  const intakeById = new Map(knowledgeBank.intakeItems.map((item) => [item.id, item]));
  const observationById = new Map(knowledgeBank.observations.map((item) => [item.id, item]));
  const sourceById = new Map(knowledgeBank.sources.map((item) => [item.id, item]));
  const claimById = new Map(knowledgeBank.claims.map((item) => [item.id, item]));
  const inquiryById = new Map(knowledgeBank.researchInquiries.map((item) => [item.id, item]));
  const fairRentPage = knowledgeBank.pages.find((page) => page.id === "fair-rent-nyc");
  const fairRentMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/fair-rent-nyc.mdx"), "utf8");
  const callnycMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/callnyc.mdx"), "utf8");
  const wowlistMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/wowlist.mdx"), "utf8");
  const kcTownHallMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"), "utf8");
  const sundayDinnerMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/196-sunday-dinner.mdx"), "utf8");
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
  const kcFundingOccurrences = kcFundingPage?.occurrences.filter((occurrence) =>
    kcFunding.claimIds.includes(occurrence.claimId)
  ) ?? [];
  const kcFundingPublicSourceIds = new Set(
    kcFundingOccurrences.flatMap((occurrence) => occurrence.sourceIds)
  );
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
      kcFunding.claimIds.every((id) =>
        kcFundingPage?.occurrences.some((occurrence) => occurrence.claimId === id)
      ) &&
      kcFundingOccurrences.length === kcFunding.claimIds.length &&
      kcFundingPublicSourceIds.size === kcFunding.expectedPublicSourceCount &&
      [...kcFundingPublicSourceIds].every((id) => kcFundingPage?.sourceOrder.includes(id)) &&
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
  const teamsArchive = suite.pilot.teamsArchiveProduction;
  const teamsIntakes = teamsArchive.intakeIds.map((id) => intakeById.get(id));
  const teamsSources = teamsArchive.sourceIds.map((id) => sourceById.get(id));
  const teamsObservations = teamsIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const teamsClaims = teamsArchive.claimIds.map((id) => claimById.get(id));
  const teamsInquiries = teamsArchive.inquiryIds.map((id) => inquiryById.get(id));
  const teamsPrivateSources = teamsArchive.privateSourceIds.map((id) => sourceById.get(id));
  const teamsActiveClaim = claimById.get(teamsArchive.activeClaimId);
  const callnycPage = knowledgeBank.pages.find((page) => page.id === "callnyc");
  const teamsCoverageTargets = teamsArchive.proofIds.map((id) =>
    knowledgeBank.proofCoverageTargets.find((target) => target.proofId === id)
  );
  const archiveInquiry = inquiryById.get("INQ-TEAMS-ARCHIVE-PRODUCTION-2026-07-14");
  const callnycOccurrence = callnycPage?.occurrences.find(
    (occurrence) => occurrence.id === teamsArchive.callnycOccurrenceId
  );
  const teamsArchiveGroupsComplete = Object.entries(
    teamsArchive.archiveGroupIntakeIds
  ).every(([group, intakeIds]) =>
    intakeIds.length === teamsArchive.archiveGroups[group] &&
    intakeIds.every((id) => teamsArchive.intakeIds.includes(id) && intakeById.has(id))
  );
  const teamsArchiveComplete = Boolean(
    teamsArchiveProduction.intakeItems.length === teamsArchive.expectedIntakeCount &&
      teamsArchiveProduction.sources.length === teamsArchive.expectedSourceCount &&
      teamsArchiveProduction.observations.length === teamsArchive.expectedObservationCount &&
      teamsArchiveProduction.claims.length === teamsArchive.expectedClaimCount &&
      teamsArchiveProduction.researchInquiries.length === teamsArchive.expectedInquiryCount &&
      teamsArchiveGroupsComplete &&
      teamsIntakes.length === teamsArchive.expectedIntakeCount &&
      teamsIntakes.every(
        (intake) => intake?.disposition === "integrated" &&
          intake.sourceIds.length === 1 &&
          intake.observationIds.length &&
          intake.researchInquiryIds.length &&
          intake.boundaries.length >= 2
      ) &&
      teamsSources.length === teamsArchive.expectedSourceCount &&
      teamsSources.every(
        (source) => source?.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      teamsPrivateSources.length === teamsArchive.privateSourceIds.length &&
      teamsPrivateSources.every(
        (source) => source &&
          source.visibility !== "public" &&
          source.preservationStatus === "private" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
      ) &&
      teamsObservations.length === teamsArchive.expectedObservationCount &&
      teamsObservations.every(
        (observation) => observation?.sourceId &&
          observation.locator &&
          observation.limitations.length &&
          observation.publicSafe &&
          (observation.claimIds.length || observation.researchInquiryIds.length)
      ) &&
      teamsClaims.length === teamsArchive.expectedClaimCount &&
      teamsClaims.every(
        (claim) => claim &&
          ["confirmed", "confirmed-with-boundary"].includes(claim.status) &&
          claim.evidence.length &&
          claim.boundaries.length >= 2 &&
          claim.antiClaims.length >= 2 &&
          claim.reviewedBy.length >= 2
      ) &&
      teamsClaims
        .filter((claim) => claim?.id !== teamsArchive.activeClaimId)
        .every((claim) =>
          claim?.projections.every(
            (projection) => projection.status === "hold" && projection.surfaces.length === 0
          )
        ) &&
      teamsPrivateSources.every((source) =>
        teamsClaims.every((claim) =>
          claim?.evidence
            .filter((evidence) => evidence.sourceId === source?.id)
            .every((evidence) => evidence.renderCitation === false)
        )
      ) &&
      teamsInquiries.length === teamsArchive.expectedInquiryCount &&
      teamsInquiries.every(
        (inquiry) => inquiry?.methods.length && inquiry.findings.length && inquiry.limitations.length && inquiry.sourceIds.length
      ) &&
      archiveInquiry?.limitations.some((limitation) => /iCloud-backed files/i.test(limitation)) &&
      archiveInquiry.limitations.some((limitation) => /does not prove/i.test(limitation)) &&
      teamsActiveClaim?.projections.some(
        (projection) => projection.status === "active" &&
          projection.citationRequired &&
          projection.surfaces.includes("/work/callnyc")
      ) &&
      teamsActiveClaim.evidence.some(
        (evidence) => evidence.sourceId === teamsArchive.callnycSourceId && evidence.renderCitation
      ) &&
      callnycOccurrence?.claimId === teamsArchive.activeClaimId &&
      callnycOccurrence.sourceIds?.includes(teamsArchive.callnycSourceId) &&
      callnycMdx.includes(teamsArchive.activeClaimId) &&
      callnycMdx.includes(teamsArchive.callnycOccurrenceId) &&
      callnycPage?.sourceOrder.includes(teamsArchive.callnycSourceId) &&
      teamsCoverageTargets.every((target) => target?.sourceIds.length) &&
      publicRegistryText.includes(teamsArchive.activeClaimId) &&
      publicRegistryText.includes(teamsArchive.callnycSourceId) &&
      teamsArchive.privateSourceIds.every((id) => !publicRegistryText.includes(id)) &&
      existsSync(path.join(repoRoot, "docs/knowledge-bank/projects/teams-archive-production-2026-07-14.md"))
  );
  const sharedDrives = suite.pilot.googleDriveSharedDrivesProduction;
  const sharedDriveIntakes = sharedDrives.intakeIds.map((id) => intakeById.get(id));
  const sharedDriveSources = sharedDrives.sourceIds.map((id) => sourceById.get(id));
  const sharedDrivePrivateSources = sharedDrives.privateSourceIds.map((id) => sourceById.get(id));
  const sharedDriveObservations = sharedDriveIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const sharedDriveClaims = sharedDrives.claimIds.map((id) => claimById.get(id));
  const sharedDriveInquiries = sharedDrives.inquiryIds.map((id) => inquiryById.get(id));
  const sharedDriveActiveClaim = claimById.get(sharedDrives.activeClaimId);
  const sharedDriveMainInquiry = inquiryById.get(
    "INQ-GDRIVE-SHARED-DRIVES-PRODUCTION-2026-07-14"
  );
  const sharedDriveScaleInquiry = inquiryById.get(
    "INQ-GDRIVE-SUNDAY-DINNER-AND-196-SCALE"
  );
  const sharedDriveCoverage = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === sharedDrives.proofId
  );
  const sharedDriveEmailSources = [
    sourceById.get("SRC-GDRIVE-OHAI-EMAIL-ONBOARDING-2020"),
    sourceById.get("SRC-GDRIVE-NYCAC-IOS-EMAIL-ONBOARDING-2020")
  ];
  const sharedDriveEmailClaim = claimById.get(
    "CLM-NYCAC-AND-OHAI-ROLE-BASED-COMMUNICATION-INFRASTRUCTURE"
  );
  const sharedDriveComplete = Boolean(
    googleDriveSharedDrivesProduction.intakeItems.length === sharedDrives.expectedIntakeCount &&
      googleDriveSharedDrivesProduction.sources.length === sharedDrives.expectedSourceCount &&
      googleDriveSharedDrivesProduction.observations.length === sharedDrives.expectedObservationCount &&
      googleDriveSharedDrivesProduction.claims.length === sharedDrives.expectedClaimCount &&
      googleDriveSharedDrivesProduction.researchInquiries.length === sharedDrives.expectedInquiryCount &&
      sharedDriveIntakes.length === sharedDrives.expectedIntakeCount &&
      sharedDriveIntakes.every(
        (intake) => intake?.disposition === "integrated" &&
          intake.sourceIds.length === 1 &&
          intake.observationIds.length &&
          intake.researchInquiryIds.length &&
          intake.boundaries.length >= 2
      ) &&
      sharedDriveSources.length === sharedDrives.expectedSourceCount &&
      sharedDriveSources.every(
        (source) => source?.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      sharedDrivePrivateSources.length === sharedDrives.privateSourceIds.length &&
      sharedDrivePrivateSources.every(
        (source) => source &&
          source.visibility !== "public" &&
          source.preservationStatus === "private" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
      ) &&
      sharedDriveObservations.length === sharedDrives.expectedObservationCount &&
      sharedDriveObservations.every(
        (observation) => observation?.sourceId &&
          observation.locator &&
          observation.limitations.length &&
          observation.publicSafe &&
          observation.claimIds.length &&
          observation.researchInquiryIds.length
      ) &&
      sharedDriveClaims.length === sharedDrives.expectedClaimCount &&
      sharedDriveClaims.every(
        (claim) => claim?.status === "confirmed-with-boundary" &&
          claim.evidence.length &&
          claim.boundaries.length >= 2 &&
          claim.antiClaims.length >= 3 &&
          claim.reviewedBy.length >= 2
      ) &&
      sharedDriveClaims
        .filter((claim) => claim?.id !== sharedDrives.activeClaimId)
        .every((claim) =>
          claim?.projections.every(
            (projection) => projection.status === "hold" && projection.surfaces.length === 0
          )
        ) &&
      sharedDriveClaims.every((claim) =>
        claim?.evidence.every((evidence) => evidence.renderCitation === false)
      ) &&
      sharedDriveInquiries.length === sharedDrives.expectedInquiryCount &&
      sharedDriveInquiries.every(
        (inquiry) => inquiry?.methods.length &&
          inquiry.findings.length &&
          inquiry.limitations.length >= 3 &&
          inquiry.sourceIds.length
      ) &&
      sharedDriveMainInquiry?.findings.some((finding) =>
        finding.includes(`${sharedDrives.expectedDriveCount} accessible Shared Drives`)
      ) &&
      sharedDriveMainInquiry.methods.some((method) =>
        method.includes(`${sharedDrives.expectedInspectedRootCount} portfolio-relevant drive roots`)
      ) &&
      sharedDriveMainInquiry.methods.some((method) =>
        method.includes(`${sharedDrives.expectedCloseReadArtifactCount} unique high-signal`)
      ) &&
      sharedDriveMainInquiry.limitations.some((limitation) => /not an exhaustive review/i.test(limitation)) &&
      sharedDriveMainInquiry.limitations.some(
        (limitation) => /does not prove ownership/i.test(limitation)
      ) &&
      sharedDriveScaleInquiry?.findings.some(
        (finding) => /20-plus resident-artist count.*not independently established/i.test(finding)
      ) &&
      sharedDriveActiveClaim?.projections.some(
        (projection) => projection.status === "active" &&
          !projection.citationRequired &&
          projection.surfaces.includes("/work/196-sunday-dinner") &&
          projection.text.includes("345 numbered gatherings") &&
          projection.text.includes("2,783 meals served")
      ) &&
      sharedDriveActiveClaim.evidence.some(
        (evidence) => evidence.sourceId === sharedDrives.sundayDinnerSourceId &&
          evidence.relationship === "private-support" &&
          evidence.renderCitation === false
      ) &&
      sharedDriveCoverage?.status === "protected-support" &&
      sharedDriveCoverage.sourceIds.includes(sharedDrives.sundayDinnerSourceId) &&
      sharedDriveCoverage.sourceIds.includes("SRC-GDRIVE-196-ACCEPTANCE-WORKFLOW-2023") &&
      sharedDriveCoverage.researchInquiryIds.includes("INQ-GDRIVE-SUNDAY-DINNER-AND-196-SCALE") &&
      sharedDriveEmailSources.every((source) => source?.author === "Julia Fredenburg") &&
      sharedDriveEmailClaim?.antiClaims.includes("Jamie authored these guides.") &&
      sundayDinnerMdx.includes("345 numbered gatherings") &&
      sundayDinnerMdx.includes("2,783 meals served") &&
      sundayDinnerMdx.includes("participant names, contact details, attendance history") &&
      workData.includes("345 numbered gatherings and 2,783 meals served") &&
      workData.includes("participant-level records remain intentionally omitted") &&
      sharedDrives.privateSourceIds.every((id) => !publicRegistryText.includes(id)) &&
      sharedDrivePrivateSources.every(
        (source) => source?.protectedLocatorId && !publicRegistryText.includes(source.protectedLocatorId)
      ) &&
      existsSync(path.join(repoRoot, "docs/knowledge-bank/projects/google-drive-shared-drives-production-2026-07-14.md"))
  );
  const social = suite.pilot.socialMediaArchiveProduction;
  const socialProfileSources = social.profileSourceIds.map((id) => sourceById.get(id));
  const socialAuditSources = social.auditSourceIds.map((id) => sourceById.get(id));
  const socialRosterSource = sourceById.get(social.officialRosterSourceId);
  const socialCallSources = social.callnycCouncilPostIds.map((id) => sourceById.get(id));
  const socialNycacSources = social.nycacCouncilPostIds.map((id) => sourceById.get(id));
  const socialClaims = [...social.activeClaimIds, ...social.heldClaimIds].map((id) => claimById.get(id));
  const socialActiveClaims = social.activeClaimIds.map((id) => claimById.get(id));
  const socialHeldClaims = social.heldClaimIds.map((id) => claimById.get(id));
  const socialInquiries = social.inquiryIds.map((id) => inquiryById.get(id));
  const socialCallClaim = claimById.get("CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT");
  const socialNycacClaim = claimById.get("CLM-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT");
  const socialEstablishmentClaim = claimById.get("CLM-PROJECT-SOCIAL-IDENTITY-ESTABLISHMENT");
  const socialOlympiaObservation = observationById.get("OBS-X-NYCAC-OLYMPIA-COLLABORATION");
  const socialMainInquiry = inquiryById.get("INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14");
  const socialCallInquiry = inquiryById.get("INQ-CALLNYC-COUNCIL-ENGAGEMENT");
  const socialNycacInquiry = inquiryById.get("INQ-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT");
  const socialCallPage = knowledgeBank.pages.find((page) => page.id === social.callnycPageId);
  const socialCallOccurrence = socialCallPage?.occurrences.find(
    (occurrence) => occurrence.id === social.callnycOccurrenceId
  );
  const socialDocumentation = existsSync(path.join(repoRoot, social.documentationPath))
    ? readFileSync(path.join(repoRoot, social.documentationPath), "utf8")
    : "";
  const accountSnapshotsMatch = Object.entries(social.accountSnapshots).every(
    ([handle, expected]) => {
      const account = socialMediaArchiveProduction.inventory.accounts.find(
        (item) => item.handle === handle
      );
      return account &&
        account.profilePosts === expected.profilePosts &&
        account.recoveredStatuses === expected.recoveredStatuses &&
        account.recoveredAuthoredPosts === expected.recoveredAuthoredPosts;
    }
  );
  const socialSourceBoundariesComplete = [
    ...socialProfileSources,
    ...socialAuditSources,
    socialRosterSource,
    ...socialCallSources,
    ...socialNycacSources
  ].every(
    (source) => source?.visibility === "public" &&
      source.supportsGenerally.length &&
      source.doesNotEstablish.length &&
      !source.protectedLocatorId
  );
  const socialArchiveComplete = Boolean(
    socialMediaArchiveProduction.inventory.accounts.length === social.expectedAccountCount &&
      socialMediaArchiveProduction.intakeItems.length === social.expectedIntakeCount &&
      socialMediaArchiveProduction.observations.length === social.expectedObservationCount &&
      socialMediaArchiveProduction.sources.length === social.expectedSourceCount &&
      socialMediaArchiveProduction.claims.length === social.expectedClaimCount &&
      socialMediaArchiveProduction.researchInquiries.length === social.expectedInquiryCount &&
      accountSnapshotsMatch &&
      socialProfileSources.length === social.expectedAccountCount &&
      socialProfileSources.every(
        (source) => source?.canonicalUrl?.startsWith("https://x.com/") &&
          source.publicNote &&
          source.doesNotEstablish.some((boundary) => /authorship|complete|stable|scale/i.test(boundary))
      ) &&
      socialAuditSources.length === 3 &&
      socialAuditSources.every(
        (source) => source?.kind === "research-run" &&
          source.canonicalUrl?.includes("docs/knowledge-bank/projects/social-media-archive-production-2026-07-14.md") &&
          source.publicNote &&
          source.doesNotEstablish.length >= 3
      ) &&
      socialRosterSource?.kind === "government-record" &&
      socialRosterSource.canonicalUrl?.includes("data.cityofnewyork.us") &&
      socialSourceBoundariesComplete &&
      new Set(social.callnycCouncilPostIds).size === social.callnycCouncilMemberCount &&
      new Set(social.nycacCouncilPostIds).size === social.nycacCouncilMemberFloor &&
      socialCallSources.every(
        (source) => source?.kind === "government-social-post" && source.canonicalUrl?.includes("/status/")
      ) &&
      socialNycacSources.every(
        (source) => source?.kind === "government-social-post" && source.canonicalUrl?.includes("/status/")
      ) &&
      socialMediaArchiveProduction.inventory.callnycCouncilMemberCount === social.callnycCouncilMemberCount &&
      socialMediaArchiveProduction.inventory.nycacCouncilMemberFloor === social.nycacCouncilMemberFloor &&
      socialCallClaim?.status === "confirmed-with-boundary" &&
      socialCallClaim.projections.some(
        (projection) => projection.status === "active" &&
          projection.citationRequired &&
          projection.surfaces.includes("/work/callnyc") &&
          /eight sitting New York City Council members/i.test(projection.text) &&
          /independent CallNYC prototype Jamie built/i.test(projection.text)
      ) &&
      socialCallClaim.boundaries.some((boundary) => /outreach tagging/i.test(boundary)) &&
      socialCallClaim.boundaries.some((boundary) => /Carlina Rivera.*predates her Council service/i.test(boundary)) &&
      socialCallClaim.antiClaims.some((antiClaim) => /adopted CallNYC/i.test(antiClaim)) &&
      socialNycacClaim?.status === "confirmed-with-boundary" &&
      socialNycacClaim.projections.some(
        (projection) => projection.status === "hold" &&
          !projection.citationRequired &&
          projection.surfaces.length === 0 &&
          /at least five sitting Council members/i.test(projection.text)
      ) &&
      socialNycacClaim.boundaries.some((boundary) => /candidate-era or former-member/i.test(boundary)) &&
      socialActiveClaims.every((claim) =>
        claim?.evidence.some((evidence) => evidence.renderCitation) &&
          claim.projections.every((projection) => projection.status === "active")
      ) &&
      socialHeldClaims.every((claim) =>
        claim?.projections.every(
          (projection) => projection.status === "hold" && projection.surfaces.length === 0
        )
      ) &&
      socialEstablishmentClaim?.status === "use-with-care" &&
      socialEstablishmentClaim.evidence.length === 0 &&
      socialEstablishmentClaim.boundaries.some((boundary) => /participant memory/i.test(boundary)) &&
      socialOlympiaObservation?.limitations.some((limitation) =>
        /do not establish.*authored posts|do not establish.*account access/i.test(limitation)
      ) &&
      socialInquiries.length === social.expectedInquiryCount &&
      socialInquiries.every(
        (inquiry) => inquiry?.methods.length >= 3 && inquiry.findings.length && inquiry.limitations.length >= 3
      ) &&
      socialMainInquiry?.limitations.some((limitation) => /deleted, private, search-suppressed/i.test(limitation)) &&
      socialCallInquiry?.findings.some((finding) => /Eight sitting members/i.test(finding)) &&
      socialCallInquiry?.findings.some((finding) => /tagging.*not counted/i.test(finding)) &&
      socialNycacInquiry?.resultStatus === "partially-recovered" &&
      socialMediaArchiveProduction.inventory.excludedHandles.length === social.excludedHandles.length &&
      social.excludedHandles.every((handle) =>
        socialMediaArchiveProduction.inventory.excludedHandles.includes(handle) &&
          socialDocumentation.includes(handle)
      ) &&
      socialCallOccurrence?.claimId === social.activeClaimIds[0] &&
      socialCallOccurrence.sourceIds.includes(social.auditSourceIds[1]) &&
      socialCallOccurrence.sourceIds.includes(social.officialRosterSourceId) &&
      socialCallPage?.sourceOrder.includes(social.auditSourceIds[1]) &&
      callnycMdx.includes(social.activeClaimIds[0]) &&
      callnycMdx.includes(social.callnycOccurrenceId) &&
      !fairRentMdx.includes("CLM-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT") &&
      socialDocumentation.includes("authenticated") &&
      socialDocumentation.includes("recovered floor") &&
      socialDocumentation.includes("collective") &&
      social.activeClaimIds.every((id) => publicRegistryText.includes(id)) &&
      social.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const callFull = suite.pilot.callNycFullPopulation;
  const callLedgerPath = path.join(repoRoot, callFull.ledgerPath);
  const callFullDocumentation = existsSync(path.join(repoRoot, callFull.documentationPath))
    ? readFileSync(path.join(repoRoot, callFull.documentationPath), "utf8")
    : "";
  const callLedger = existsSync(callLedgerPath)
    ? JSON.parse(readFileSync(callLedgerPath, "utf8"))
    : null;
  const callRecords = callLedger?.records ?? [];
  const callRecordIds = callRecords.map((record) => record.statusId);
  const callRecordUrls = callRecords.map((record) => record.statusUrl);
  const callRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(callRecords, (record) => record.relationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const callLinks = callRecords.flatMap((record) => record.outboundLinks ?? []);
  const callUniqueShortUrls = new Set(callLinks.map((link) => link.shortUrl));
  const callUniqueDestinations = new Set(callLinks.map((link) => link.destinationUrl));
  const callUniqueCallNycDestinations = new Set(
    [...callUniqueDestinations].filter((url) => /https?:\/\/(?:www\.)?callnyc\.org\//i.test(url))
  );
  const callExternalDestinations = new Set(
    [...callUniqueDestinations].filter((url) => !/https?:\/\/(?:www\.)?callnyc\.org\//i.test(url))
  );
  const callVisualTokenRecords = callRecords.filter((record) => record.visualTokens?.length > 0);
  const callImageIndicatorRecords = callRecords.filter((record) =>
    record.visualTokens?.includes("Image")
  );
  const callAmbiguousVisualTokenRecords = callVisualTokenRecords.filter((record) =>
    !record.visualTokens.includes("Image")
  );
  const issuePathPattern = /callnyc\.org\/(cultural-affairs|economy-jobs|environment|finance|general-welfare|governmental-operations|health|housing-and-buildings|immigration|land-use-and-zoning|legal-services|parks|quality-of-life|sanitation|transportation|utilities)\//i;
  const callRecognitionRecords = callRecords.filter(
    (record) => record.relationship === "account-post" &&
      record.outboundLinks?.some((link) => issuePathPattern.test(link.destinationUrl))
  );
  const callInstitutionalHandles = new Set(
    callFull.institutionalHandlesExcluded.map((handle) => handle.toLowerCase())
  );
  const callRecognitionMemberHandlesByRecord = callRecognitionRecords.map((record) =>
    record.mentionedHandles?.filter(
      (handle) => !callInstitutionalHandles.has(handle.toLowerCase())
    ) ?? []
  );
  const callRecognitionHandles = new Set(callRecognitionMemberHandlesByRecord.flat());
  const callRecognitionHandleList = [...callRecognitionHandles]
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const callLedgerRecognitionHandleList = [
    ...(callLedger?.aggregateFindings?.councilMemberHandlesNamedInRecognitionsList ?? [])
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const callCorpusRecognitionHandleList = [
    ...callNycCorpusFindings.councilMemberHandlesNamedInRecognitionsList
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const callRecognitionIssuePages = new Set(
    callRecognitionRecords.flatMap((record) =>
      record.outboundLinks
        .map((link) => link.destinationUrl)
        .filter((url) => issuePathPattern.test(url))
    )
  );
  const callRecognitionCategories = new Set(
    [...callRecognitionIssuePages].map((url) => url.match(issuePathPattern)?.[1]).filter(Boolean)
  );
  const callFullSources = callNycSocialCorpus.sources.map((source) => sourceById.get(source.id));
  const callFullClaims = callNycSocialCorpus.claims.map((claim) => claimById.get(claim.id));
  const callFullInquiries = callNycSocialCorpus.researchInquiries.map((inquiry) => inquiryById.get(inquiry.id));
  const callFullActiveClaim = claimById.get(callFull.activeClaimId);
  const callFullHeldClaims = callFull.heldClaimIds.map((id) => claimById.get(id));
  const callFullAuditSource = sourceById.get(callFull.auditSourceId);
  const callFullRoleSource = sourceById.get(callFull.roleSourceId);
  const callFullInquiry = inquiryById.get("INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026");
  const callFullProof = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === callFull.proofId
  );
  const callFullPage = knowledgeBank.pages.find((page) => page.id === "callnyc");
  const callFullOccurrence = callFullPage?.occurrences.find(
    (occurrence) => occurrence.id === "social-engagement-architecture"
  );
  const callLedgerText = callLedger ? JSON.stringify(callLedger) : "";
  const callFullPopulationComplete = Boolean(
    callLedger &&
      callLedger.reviewedAt === "2026-07-14" &&
      callLedger.sourceProfile === "https://x.com/CallNYCapp" &&
      callLedger.method?.authenticatedReadOnlyReview === true &&
      callLedger.method?.freshVerification?.ledgerUrlSetMatchedFreshUnion === true &&
      callLedger.method?.freshVerification?.postsTabUniqueStatusUrls === callFull.expectedPostsTabCount &&
      callLedger.method?.freshVerification?.repliesTabUniqueStatusUrls === callFull.expectedUniqueItems &&
      callLedger.method?.freshVerification?.dateSlicedSearchAuthoredStatusesRecovered === callNycPopulationAudit.dateSlicedSearchAuthoredStatusesRecovered &&
      callLedger.populationAudit.profileCountObserved === callFull.expectedProfileCount &&
      callLedger.populationAudit.postsTabItemsRecovered === callFull.expectedPostsTabCount &&
      callLedger.populationAudit.uniqueItemsRecovered === callFull.expectedUniqueItems &&
      callLedger.populationAudit.accountPostsRecovered === callFull.expectedAccountPosts &&
      callLedger.populationAudit.accountRepliesRecovered === callFull.expectedAccountReplies &&
      callLedger.populationAudit.accountAuthoredStatusesRecovered === callFull.expectedAuthoredStatuses &&
      callLedger.populationAudit.repostsRecovered === callFull.expectedReposts &&
      callLedger.populationAudit.unresolvedPopulationSlots === callFull.expectedUnresolvedSlots &&
      callLedger.populationAudit.dispositionTotal === callFull.expectedProfileCount &&
      callLedger.populationAudit.uniqueItemsRecovered + callLedger.populationAudit.unresolvedPopulationSlots === callLedger.populationAudit.profileCountObserved &&
      callRecords.length === callFull.expectedUniqueItems &&
      new Set(callRecordIds).size === callFull.expectedUniqueItems &&
      new Set(callRecordUrls).size === callFull.expectedUniqueItems &&
      callRecords.every((record) =>
        /^\d+$/.test(record.statusId) &&
          record.statusUrl.endsWith(`/status/${record.statusId}`) &&
          ["account-post", "account-reply", "repost"].includes(record.relationship) &&
          Array.isArray(record.recoveredFrom) && record.recoveredFrom.length &&
          typeof record.text === "string" && record.text.length &&
          Array.isArray(record.mentionedHandles) &&
          Array.isArray(record.hashtags) &&
          !("mediaUrls" in record) &&
          !("mediaIndicators" in record) &&
          Array.isArray(record.visualTokens) &&
          record.visualTokens.every((token) =>
            typeof token === "string" && token.length > 0
          ) &&
          Array.isArray(record.outboundLinks) &&
          record.outboundLinks.every((link) =>
            /^https:\/\/t\.co\//.test(link.shortUrl) && /^https?:\/\//.test(link.destinationUrl)
          )
      ) &&
      callRelationshipCounts["account-post"] === callFull.expectedAccountPosts &&
      callRelationshipCounts["account-reply"] === callFull.expectedAccountReplies &&
      callRelationshipCounts.repost === callFull.expectedReposts &&
      callLedger.unresolvedItems.length === callFull.expectedUnresolvedSlots &&
      new Set(callLedger.unresolvedItems.map((item) => item.slot)).size === callFull.expectedUnresolvedSlots &&
      callLedger.unresolvedItems.every((item) =>
        item.status === "not-recovered" && /no status ID or content was recovered/i.test(item.note)
      ) &&
      callRecognitionRecords.length === callFull.expectedIssueRecognitionPosts &&
      callRecognitionMemberHandlesByRecord.every((handles) => handles.length === 1) &&
      callRecognitionHandles.size === callFull.expectedCouncilMemberHandles &&
      JSON.stringify(callRecognitionHandleList) === JSON.stringify(callLedgerRecognitionHandleList) &&
      JSON.stringify(callRecognitionHandleList) === JSON.stringify(callCorpusRecognitionHandleList) &&
      callFull.institutionalHandlesExcluded.every(
        (handle) => !callRecognitionHandles.has(handle)
      ) &&
      callRecognitionIssuePages.size === callFull.expectedUniqueIssuePages &&
      callRecognitionCategories.size === callFull.expectedIssueCategories &&
      callLinks.length === callFull.expectedShortUrlOccurrences &&
      callUniqueShortUrls.size === callFull.expectedUniqueShortUrls &&
      callUniqueDestinations.size === callFull.expectedResolvedDestinations &&
      callUniqueCallNycDestinations.size === callFull.expectedCallNycDestinations &&
      callExternalDestinations.size === callFull.expectedExternalDestinations &&
      callVisualTokenRecords.length === callFull.expectedVisualTokenRecords &&
      callImageIndicatorRecords.length === callFull.expectedImageIndicatorRecords &&
      callAmbiguousVisualTokenRecords.length === callFull.expectedAmbiguousVisualTokenRecords &&
      callNycCorpusFindings.visualTokenRecords === callFull.expectedVisualTokenRecords &&
      callNycCorpusFindings.imageIndicatorRecords === callFull.expectedImageIndicatorRecords &&
      callNycCorpusFindings.ambiguousVisualTokenRecords === callFull.expectedAmbiguousVisualTokenRecords &&
      callNycCorpusFindings.issueRecognitionPosts === callFull.expectedIssueRecognitionPosts &&
      callNycCorpusFindings.councilMemberHandlesNamedInRecognitions === callFull.expectedCouncilMemberHandles &&
      callNycPopulationAudit.unresolvedPopulationSlots === callFull.expectedUnresolvedSlots &&
      callNycSocialCorpus.sources.length === callFull.expectedSourceCount &&
      callNycSocialCorpus.observations.length === callFull.expectedObservationCount &&
      callNycSocialCorpus.claims.length === callFull.expectedClaimCount &&
      callNycSocialCorpus.researchInquiries.length === callFull.expectedInquiryCount &&
      callFullSources.every((source) =>
        source?.visibility === "public" && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      callFullAuditSource?.kind === "research-run" &&
      callFullAuditSource.canonicalUrl?.includes(callFull.ledgerPath) &&
      callFullAuditSource.doesNotEstablish.some((boundary) => /platform export/i.test(boundary)) &&
      callFullAuditSource.doesNotEstablish.some((boundary) => /visual media asset preservation/i.test(boundary)) &&
      callFullRoleSource?.canonicalUrl?.endsWith("/status/710150246781882369") &&
      callFullActiveClaim?.status === "confirmed-with-boundary" &&
      callFullActiveClaim.projections.some((projection) =>
        projection.status === "active" &&
          projection.surfaces.includes("/work/callnyc") &&
          /Jamie paired CallNYC's issue pathways/i.test(projection.text) &&
          /71 data-derived posts/i.test(projection.text) &&
          /61 issue pages/i.test(projection.text) &&
          /26 sitting Council-member accounts/i.test(projection.text)
      ) &&
      callFullActiveClaim.boundaries.some((boundary) => /intended institutional audience/i.test(boundary)) &&
      callFullActiveClaim.antiClaims.some((antiClaim) => /Twenty-six Council members engaged/i.test(antiClaim)) &&
      callFullHeldClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      callFullInquiry?.resultStatus === "partially-recovered" &&
      callFullInquiry.findings.some((finding) => /47 of 92/i.test(finding)) &&
      callFullInquiry.limitations.some((limitation) => /not recovered rather than inferred/i.test(limitation)) &&
      callFullInquiry.limitations.some((limitation) => /Visual tokens are not archived media URLs or assets/i.test(limitation)) &&
      callFullProof?.status === "source-backed" &&
      callFullProof.sourceIds.includes(callFull.auditSourceId) &&
      callFullOccurrence?.claimId === callFull.activeClaimId &&
      callFullOccurrence.sourceIds.includes(callFull.auditSourceId) &&
      callFullPage?.sourceOrder.includes(callFull.auditSourceId) &&
      callnycMdx.includes(callFull.activeClaimId) &&
      callnycMdx.includes("social-engagement-architecture") &&
      callFullDocumentation.includes("107-URL union matched") &&
      callFullDocumentation.includes("not a platform export") &&
      /Media assets and their public locators were not\s+archived/.test(callFullDocumentation) &&
      /Eighty-two\s+records carry the literal token `Image`/.test(callFullDocumentation) &&
      callFullDocumentation.includes("not interpreted as proof of attached media") &&
      callFullDocumentation.includes("`@NYCHA` are not counted as Council members") &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(callLedgerText) &&
      publicRegistryText.includes(callFull.activeClaimId) &&
      callFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const wowFull = suite.pilot.wowlistFullPopulation;
  const wowLedgerPath = path.join(repoRoot, wowFull.ledgerPath);
  const wowDocumentation = existsSync(path.join(repoRoot, wowFull.documentationPath))
    ? readFileSync(path.join(repoRoot, wowFull.documentationPath), "utf8")
    : "";
  const wowLedger = fixtures.wowlistLedger ?? (existsSync(wowLedgerPath)
    ? JSON.parse(readFileSync(wowLedgerPath, "utf8"))
    : null);
  const wowRecords = wowLedger?.records ?? [];
  const wowRecordIds = wowRecords.map((record) => record.statusId);
  const wowRecordUrls = wowRecords.map((record) => record.statusUrl);
  const wowRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(wowRecords, (record) => record.relationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const wowAuthoredRecords = wowRecords.filter((record) => record.relationship !== "repost");
  const wowRepostRecords = wowRecords.filter((record) => record.relationship === "repost");
  const wowRepostSourceHandles = new Set(wowRepostRecords.map((record) => record.authorHandle));
  const wowExternalHandles = new Set(
    wowAuthoredRecords.flatMap((record) => record.mentionedHandles ?? [])
      .filter((handle) => handle.toLowerCase() !== "@wowlist")
  );
  const wowLinks = wowRecords.flatMap((record) => record.outboundLinks ?? []);
  const wowUniqueShortUrls = new Set(wowLinks.map((link) => link.shortUrl));
  const wowUniqueDestinations = new Set(wowLinks.map((link) => link.destinationUrl));
  const wowProjectHosts = new Set(["wowlist.org", "nycdiy.org", "sundaydinnernyc.com"]);
  const wowDestinationHost = (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "unresolved";
    }
  };
  const wowProjectDestinations = new Set(
    [...wowUniqueDestinations].filter((url) => wowProjectHosts.has(wowDestinationHost(url)))
  );
  const wowExternalDestinations = new Set(
    [...wowUniqueDestinations].filter((url) => !wowProjectHosts.has(wowDestinationHost(url)))
  );
  const wowAuthoredReactionSnapshot = wowAuthoredRecords.reduce(
    (aggregate, record) => {
      const metrics = record.visibleMetrics;
      aggregate.statuses += 1;
      aggregate.statusesWithVisibleReaction += metrics.replies + metrics.reposts + metrics.likes > 0 ? 1 : 0;
      aggregate.replies += metrics.replies;
      aggregate.reposts += metrics.reposts;
      aggregate.likes += metrics.likes;
      return aggregate;
    },
    { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );
  const wowThemeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(wowRecords, (record) => record.primaryTheme))
      .map(([theme, records]) => [theme, records.length])
  );
  const wowFullSources = wowlistSocialCorpus.sources.map((source) => sourceById.get(source.id));
  const wowFullClaims = wowlistSocialCorpus.claims.map((claim) => claimById.get(claim.id));
  const wowFullInquiries = wowlistSocialCorpus.researchInquiries.map((inquiry) => inquiryById.get(inquiry.id));
  const wowFullActiveClaim = claimById.get(wowFull.activeClaimId);
  const wowFullHeldClaims = wowFull.heldClaimIds.map((id) => claimById.get(id));
  const wowFullAuditSource = sourceById.get(wowFull.auditSourceId);
  const wowFullRepliesOnlySource = sourceById.get(wowFull.repliesOnlySourceId);
  const wowFullInquiry = inquiryById.get("INQ-WOWLIST-FULL-POPULATION-2026");
  const wowTractionInquiry = inquiryById.get("INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION");
  const wowFullProof = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === wowFull.proofId
  );
  const wowFullPage = knowledgeBank.pages.find((page) => page.id === "wowlist");
  const wowFullOccurrence = wowFullPage?.occurrences.find(
    (occurrence) => occurrence.id === "public-support-surface"
  );
  const wowLedgerText = wowLedger ? JSON.stringify(wowLedger) : "";
  const wowFullPopulationComplete = Boolean(
    wowLedger &&
      wowLedger.reviewedAt === "2026-07-14" &&
      wowLedger.sourceProfile === "https://x.com/wowlist" &&
      wowLedger.method?.authenticatedReadOnlyReview === true &&
      wowLedger.method?.freshVerification?.profileCountReconfirmed === wowFull.expectedProfileCount &&
      wowLedger.method?.freshVerification?.postsTabUniqueStatusUrls === wowFull.expectedPostsTabCount &&
      wowLedger.method?.freshVerification?.repliesTabUniqueStatusUrls === wowFull.expectedRepliesTabCount &&
      wowLedger.method?.freshVerification?.ledgerUrlSetMatchedAuthenticatedUnion === true &&
      wowLedger.method?.freshVerification?.repliesOnlyStatusDirectlyReconfirmed === true &&
      wowLedger.populationAudit.profileCountObserved === wowFull.expectedProfileCount &&
      wowLedger.populationAudit.postsTabItemsRecovered === wowFull.expectedPostsTabCount &&
      wowLedger.populationAudit.repliesTabItemsRecovered === wowFull.expectedRepliesTabCount &&
      wowLedger.populationAudit.uniqueItemsRecovered === wowFull.expectedUniqueItems &&
      wowLedger.populationAudit.accountPostsRecovered === wowFull.expectedAccountPosts &&
      wowLedger.populationAudit.accountRepliesRecovered === wowFull.expectedAccountReplies &&
      wowLedger.populationAudit.accountAuthoredStatusesRecovered === wowFull.expectedAuthoredStatuses &&
      wowLedger.populationAudit.repostsRecovered === wowFull.expectedReposts &&
      wowLedger.populationAudit.distinctRepostSourceAccounts === wowFull.expectedRepostSourceAccounts &&
      wowLedger.populationAudit.unresolvedPopulationSlots === wowFull.expectedUnresolvedSlots &&
      wowLedger.populationAudit.dispositionTotal === wowFull.expectedProfileCount &&
      wowRecords.length === wowFull.expectedUniqueItems &&
      new Set(wowRecordIds).size === wowFull.expectedUniqueItems &&
      new Set(wowRecordUrls).size === wowFull.expectedUniqueItems &&
      wowRecords.every((record) =>
        /^\d+$/.test(record.statusId) &&
          record.statusUrl.endsWith(`/status/${record.statusId}`) &&
          ["account-post", "account-reply", "repost"].includes(record.relationship) &&
          Array.isArray(record.recoveredFrom) && record.recoveredFrom.length &&
          typeof record.contentSummary === "string" && record.contentSummary.length &&
          typeof record.contentDigestSha256 === "string" && /^[a-f0-9]{64}$/.test(record.contentDigestSha256) &&
          !("text" in record) &&
          Array.isArray(record.mentionedHandles) &&
          Array.isArray(record.hashtags) &&
          Array.isArray(record.outboundLinks) &&
          record.outboundLinks.every((link) =>
            /^https?:\/\/t\.co\//.test(link.shortUrl) && /^https?:\/\//.test(link.destinationUrl)
          ) &&
          Number.isInteger(record.visibleMetrics?.replies) &&
          Number.isInteger(record.visibleMetrics?.reposts) &&
          Number.isInteger(record.visibleMetrics?.likes) &&
          record.metricOwner === (record.relationship === "repost" ? "source-status" : "wowlist-status")
      ) &&
      wowRelationshipCounts["account-post"] === wowFull.expectedAccountPosts &&
      wowRelationshipCounts["account-reply"] === wowFull.expectedAccountReplies &&
      wowRelationshipCounts.repost === wowFull.expectedReposts &&
      wowRepostSourceHandles.size === wowFull.expectedRepostSourceAccounts &&
      wowExternalHandles.size === wowFull.expectedExternalHandles &&
      wowLinks.length === wowFull.expectedShortUrlOccurrences &&
      wowUniqueShortUrls.size === wowFull.expectedUniqueShortUrls &&
      wowUniqueDestinations.size === wowFull.expectedResolvedDestinations &&
      wowProjectDestinations.size === wowFull.expectedProjectOrLineageDestinations &&
      wowExternalDestinations.size === wowFull.expectedExternalDestinations &&
      wowThemeCounts["product-support-and-onboarding"] === wowFull.expectedSupportReplies &&
      wowThemeCounts["event-distribution"] === wowFull.expectedEventDistributionPosts &&
      wowThemeCounts["scene-knowledge-and-connection"] === wowFull.expectedSceneKnowledgePosts &&
      wowThemeCounts["product-community-infrastructure"] === wowFull.expectedProductInfrastructurePosts &&
      wowThemeCounts["civic-mobilization-and-care"] === wowFull.expectedCivicCareAuthoredPosts &&
      wowThemeCounts["civic-care-amplification"] === wowFull.expectedCivicCareReposts &&
      wowThemeCounts["platform-use-and-event-amplification"] === wowFull.expectedPlatformUseReposts &&
      wowAuthoredReactionSnapshot.statusesWithVisibleReaction === wowFull.expectedAuthoredStatusesWithReaction &&
      wowAuthoredReactionSnapshot.replies === wowFull.expectedAuthoredVisibleReplies &&
      wowAuthoredReactionSnapshot.reposts === wowFull.expectedAuthoredVisibleReposts &&
      wowAuthoredReactionSnapshot.likes === wowFull.expectedAuthoredVisibleLikes &&
      wowlistPopulationAudit.uniqueItemsRecovered === wowFull.expectedUniqueItems &&
      wowlistPopulationAudit.unresolvedPopulationSlots === wowFull.expectedUnresolvedSlots &&
      wowlistCorpusFindings.directProductSupportReplies === wowFull.expectedSupportReplies &&
      wowlistCorpusFindings.uniqueResolvedDestinations === wowFull.expectedResolvedDestinations &&
      wowlistCorpusFindings.authoredStatusesWithVisibleReaction === wowFull.expectedAuthoredStatusesWithReaction &&
      wowlistSocialCorpus.sources.length === wowFull.expectedSourceCount &&
      wowlistSocialCorpus.observations.length === wowFull.expectedObservationCount &&
      wowlistSocialCorpus.claims.length === wowFull.expectedClaimCount &&
      wowlistSocialCorpus.researchInquiries.length === wowFull.expectedInquiryCount &&
      wowFullSources.every((source) =>
        source?.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      wowFullAuditSource?.kind === "research-run" &&
      wowFullAuditSource.canonicalUrl?.includes(wowFull.ledgerPath) &&
      wowFullAuditSource.doesNotEstablish.some((boundary) => /platform export/i.test(boundary)) &&
      wowFullRepliesOnlySource?.canonicalUrl?.endsWith(`/status/${wowlistPopulationAudit.repliesOnlyStatusId}`) &&
      wowFullActiveClaim?.status === "confirmed-with-boundary" &&
      wowFullActiveClaim.projections.some((projection) =>
        projection.status === "active" &&
          projection.surfaces.includes("/work/wowlist") &&
          /shared public account became a direct support surface/i.test(projection.text) &&
          /six surviving replies/i.test(projection.text)
      ) &&
      wowFullActiveClaim.boundaries.some((boundary) => /shared project infrastructure/i.test(boundary)) &&
      wowFullActiveClaim.antiClaims.some((antiClaim) => /personally wrote all six replies/i.test(antiClaim)) &&
      wowFullHeldClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      wowFullInquiry?.resultStatus === "recovered" &&
      wowFullInquiry.limitations.some((limitation) => /not prove that no record was deleted/i.test(limitation)) &&
      wowTractionInquiry?.resultStatus === "inconclusive" &&
      wowTractionInquiry.limitations.some((limitation) => /not equivalent to adoption or impact/i.test(limitation)) &&
      wowFullProof?.status === "source-backed" &&
      wowFullProof.sourceIds.includes(wowFull.auditSourceId) &&
      wowFullOccurrence?.claimId === wowFull.activeClaimId &&
      wowFullOccurrence.sourceIds.length === 7 &&
      wowFullPage?.sourceOrder.length === 7 &&
      wowlistMdx.includes(wowFull.activeClaimId) &&
      wowlistMdx.includes("public-support-surface") &&
      wowDocumentation.includes("all 38 unique items") &&
      wowDocumentation.includes("not a platform export") &&
      wowDocumentation.includes("Metrics on the 16 reposted source statuses are excluded") &&
      wowDocumentation.includes("not press coverage, reviews, or endorsements of WOW List") &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(wowLedgerText) &&
      publicRegistryText.includes(wowFull.activeClaimId) &&
      wowFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const kcthFull = suite.pilot.kcTownHallFullPopulation;
  const kcthLedgerPath = path.join(repoRoot, kcthFull.ledgerPath);
  const kcthDocumentation = existsSync(path.join(repoRoot, kcthFull.documentationPath))
    ? readFileSync(path.join(repoRoot, kcthFull.documentationPath), "utf8")
    : "";
  const kcthLedger = fixtures.kcTownHallLedger ?? (existsSync(kcthLedgerPath)
    ? JSON.parse(readFileSync(kcthLedgerPath, "utf8"))
    : null);
  const kcthRecords = kcthLedger?.records ?? [];
  const kcthRecordIds = kcthRecords.map((record) => record.statusId);
  const kcthRecordUrls = kcthRecords.map((record) => record.statusUrl);
  const kcthRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(kcthRecords, (record) => record.relationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const kcthAuthoredRecords = kcthRecords.filter((record) => record.relationship !== "repost");
  const kcthRepostRecords = kcthRecords.filter((record) => record.relationship === "repost");
  const kcthRepostSourceHandles = new Set(kcthRepostRecords.map((record) => record.statusOwner));
  const kcthExternalHandles = new Set(
    kcthAuthoredRecords.flatMap((record) => record.publicMentions ?? [])
      .filter((handle) => handle.toLowerCase() !== "@kctownhall")
  );
  const countKcthMention = (handle) => kcthAuthoredRecords.filter((record) =>
    record.publicMentions.some((mention) => mention.toLowerCase() === handle.toLowerCase())
  ).length;
  const kcthLinks = kcthRecords.flatMap((record) => record.postedUrls ?? []);
  const kcthUniqueShortUrls = new Set(kcthLinks.map((link) => link.shortUrl));
  const kcthUniqueDestinations = new Set(
    kcthLinks.map((link) => link.resolvedUrl).filter(Boolean)
  );
  const isKcthProjectDestination = (url) =>
    /kctownhall\.com|facebook\.com\/KCTownHall|youtube\.com\/watch\?v=(PmLjLyOpS9I|onCKU-TuPhc)/i.test(url);
  const kcthProjectDestinations = new Set(
    [...kcthUniqueDestinations].filter(isKcthProjectDestination)
  );
  const kcthExternalDestinations = new Set(
    [...kcthUniqueDestinations].filter((url) => !isKcthProjectDestination(url))
  );
  const kcthThemeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(kcthRecords, (record) => record.primaryTheme))
      .map(([theme, records]) => [theme, records.length])
  );
  const kcthTireRecords = kcthRecords.filter(
    (record) => record.primaryTheme === "resident-tire-intake-and-operations"
  );
  const kcthAuthoredReactionSnapshot = kcthAuthoredRecords.reduce(
    (aggregate, record) => {
      const metrics = record.currentVisibleMetrics;
      aggregate.statuses += 1;
      aggregate.statusesWithVisibleReaction += metrics.replies + metrics.reposts + metrics.likes > 0 ? 1 : 0;
      aggregate.replies += metrics.replies;
      aggregate.reposts += metrics.reposts;
      aggregate.likes += metrics.likes;
      return aggregate;
    },
    { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );
  const kcthRepostReactionSnapshot = kcthRepostRecords.reduce(
    (aggregate, record) => {
      const metrics = record.currentVisibleMetrics;
      aggregate.statuses += 1;
      aggregate.statusesWithVisibleReaction += metrics.replies + metrics.reposts + metrics.likes > 0 ? 1 : 0;
      aggregate.replies += metrics.replies;
      aggregate.reposts += metrics.reposts;
      aggregate.likes += metrics.likes;
      return aggregate;
    },
    { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );
  const kcthDirectResponseRecords = kcthRecords.filter((record) =>
    record.outsideAuthoredInteraction?.targetAccount?.toLowerCase() === "@kctownhall" &&
      ["quote-post", "reply"].includes(record.outsideAuthoredInteraction?.interactionType) &&
      record.outsideAuthoredInteraction?.stakeholderRole === "sitting-kansas-city-council-member" &&
      record.outsideAuthoredInteraction?.roleSourceId === "SRC-KCMO-COUNCIL-ROSTER-2018"
  );
  const kcthCityPoliticalHandles = new Set([
    "@QuintonLucasKC",
    "@Robinson4kc",
    "@joliejustus"
  ]);
  const kcthCityPoliticalReposts = kcthRepostRecords.filter((record) =>
    [...kcthCityPoliticalHandles].some(
      (handle) => handle.toLowerCase() === record.statusOwner.toLowerCase()
    )
  );
  const kcthStoredThemeCounts = Object.fromEntries(
    kcthLedger?.aggregateFindings?.primaryThemeCounts?.map(({ value, count }) => [value, count]) ?? []
  );
  const kcthStoredRepostSourceCounts = Object.fromEntries(
    kcthLedger?.aggregateFindings?.repostNetwork?.sourceAccounts?.map(({ value, count }) => [value.toLowerCase(), count]) ?? []
  );
  const kcthRepostSourceCounts = Object.fromEntries(
    Object.entries(Object.groupBy(kcthRepostRecords, (record) => record.statusOwner.toLowerCase()))
      .map(([handle, records]) => [handle, records.length])
  );
  const equalCountMaps = (left, right) => {
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    return [...keys].every((key) => left[key] === right[key]);
  };
  const equalStringSets = (left, right) =>
    left.size === right.size && [...left].every((value) => right.has(value));
  const kcthTireHashtagOccurrences = kcthTireRecords.reduce(
    (total, record) => total + record.hashtags.filter((hashtag) => hashtag.toLowerCase() === "#tiredoftires").length,
    0
  );
  const kcthTireHashtagBearingRecords = kcthTireRecords.filter((record) =>
    record.hashtags.some((hashtag) => hashtag.toLowerCase() === "#tiredoftires")
  ).length;
  const kcthAggregateFindingsRecompute = Boolean(
    kcthLedger &&
      equalCountMaps(kcthStoredThemeCounts, kcthThemeCounts) &&
      kcthLedger.aggregateFindings.tireWorkflow.classifiedRecords === kcthTireRecords.length &&
      kcthLedger.aggregateFindings.tireWorkflow.hashtagBearingRecords === kcthTireHashtagBearingRecords &&
      kcthLedger.aggregateFindings.tireWorkflow.hashtagOccurrences === kcthTireHashtagOccurrences &&
      kcthLedger.aggregateFindings.tireWorkflow.accountPosts === kcthTireRecords.filter((record) => record.relationship === "account-post").length &&
      kcthLedger.aggregateFindings.tireWorkflow.accountReplies === kcthTireRecords.filter((record) => record.relationship === "account-reply").length &&
      kcthLedger.aggregateFindings.tireWorkflow.reposts === kcthTireRecords.filter((record) => record.relationship === "repost").length &&
      kcthLedger.aggregateFindings.repostNetwork.statuses === kcthRepostRecords.length &&
      kcthLedger.aggregateFindings.repostNetwork.distinctSourceAccounts === kcthRepostSourceHandles.size &&
      equalCountMaps(kcthStoredRepostSourceCounts, kcthRepostSourceCounts) &&
      kcthLedger.aggregateFindings.repostNetwork.cityCouncilFigureSourceStatuses === kcthCityPoliticalReposts.length &&
      equalStringSets(
        new Set(kcthLedger.aggregateFindings.repostNetwork.cityCouncilFigureSourceAccounts.map((handle) => handle.toLowerCase())),
        new Set(kcthCityPoliticalReposts.map((record) => record.statusOwner.toLowerCase()))
      ) &&
      kcthLedger.aggregateFindings.postedLinks.occurrences === kcthLinks.length &&
      kcthLedger.aggregateFindings.postedLinks.uniqueShortUrls === kcthUniqueShortUrls.size &&
      kcthLedger.aggregateFindings.postedLinks.uniqueResolvedDestinations === kcthUniqueDestinations.size &&
      kcthLedger.aggregateFindings.postedLinks.uniqueProjectOrLineageDestinations === kcthProjectDestinations.size &&
      equalStringSets(
        new Set(kcthLedger.aggregateFindings.postedLinks.resolvedDestinations),
        kcthUniqueDestinations
      ) &&
      JSON.stringify(kcthLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot) === JSON.stringify(kcthAuthoredReactionSnapshot) &&
      JSON.stringify(kcthLedger.aggregateFindings.repostSourceVisibleReactionSnapshot) === JSON.stringify(kcthRepostReactionSnapshot) &&
      /Metrics on reposted statuses belong to their source statuses/i.test(kcthLedger.aggregateFindings.metricBoundary)
  );
  const kcthFullSources = kcTownHallSocialCorpus.sources.map((source) => sourceById.get(source.id));
  const kcthFullClaims = kcTownHallSocialCorpus.claims.map((claim) => claimById.get(claim.id));
  const kcthFullInquiries = kcTownHallSocialCorpus.researchInquiries.map((inquiry) => inquiryById.get(inquiry.id));
  const kcthActiveClaim = claimById.get(kcthFull.activeClaimId);
  const kcthHeldClaims = kcthFull.heldClaimIds.map((id) => claimById.get(id));
  const kcthAuditSource = sourceById.get(kcthFull.auditSourceId);
  const kcthFullInquiry = inquiryById.get("INQ-KCTH-FULL-POPULATION-2026");
  const kcthTractionInquiry = inquiryById.get("INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES");
  const kcthAuthorshipInquiry = inquiryById.get("INQ-KCTH-SHARED-ACCOUNT-AUTHORSHIP");
  const kcthCouncilResponseClaim = claimById.get("CLM-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR");
  const kcthProof = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === kcthFull.proofId
  );
  const kcthPage = knowledgeBank.pages.find((page) => page.id === "kc-town-hall");
  const kcthOccurrence = kcthPage?.occurrences.find(
    (occurrence) => occurrence.id === "public-service-interface"
  );
  const kcthLedgerText = kcthLedger ? JSON.stringify(kcthLedger) : "";
  const kcthFullPopulationComplete = Boolean(
    kcthLedger &&
      kcthLedger.account === "@KCTownHall" &&
      kcthLedger.observedAt === "2026-07-14" &&
      kcthLedger.population.displayedProfileCount === kcthFull.expectedProfileCount &&
      kcthLedger.population.postsRouteUnique === kcthFull.expectedPostsTabCount &&
      kcthLedger.population.attributableRecords === kcthFull.expectedRepliesTabCount &&
      kcthLedger.population.excludedConversationContextArticles === kcthFull.expectedExcludedContextItems &&
      kcthLedger.population.unresolvedProfileCountSlots === kcthFull.expectedUnresolvedSlots &&
      kcthLedger.population.relationshipCounts.accountPosts === kcthFull.expectedAccountPosts &&
      kcthLedger.population.relationshipCounts.accountReplies === kcthFull.expectedAccountReplies &&
      kcthLedger.population.relationshipCounts.reposts === kcthFull.expectedReposts &&
      /complete recovery of the surviving/i.test(kcthLedger.population.completenessStatement) &&
      /not a native X export/i.test(kcthLedger.population.completenessStatement) &&
      /No credential, cookie, direct message, private analytics/i.test(kcthLedger.method.authenticationBoundary) &&
      kcthRecords.length === kcthFull.expectedUniqueItems &&
      new Set(kcthRecordIds).size === kcthFull.expectedUniqueItems &&
      new Set(kcthRecordUrls).size === kcthFull.expectedUniqueItems &&
      kcthRecords.every((record) =>
        /^\d+$/.test(record.statusId) &&
          record.statusUrl.endsWith(`/status/${record.statusId}`) &&
          ["account-post", "account-reply", "repost"].includes(record.relationship) &&
          Array.isArray(record.recoveredRoutes) && record.recoveredRoutes.length &&
          typeof record.publicSummary === "string" && record.publicSummary.length &&
          typeof record.contentDigestSha256 === "string" && /^[a-f0-9]{64}$/.test(record.contentDigestSha256) &&
          !("text" in record) && !("phone" in record) && !("address" in record) &&
          Array.isArray(record.publicMentions) &&
          Array.isArray(record.hashtags) &&
          Array.isArray(record.postedUrls) &&
          record.postedUrls.every((link) =>
            /^https?:\/\/t\.co\//.test(link.shortUrl) &&
              (link.resolvedUrl === null || /^https?:\/\//.test(link.resolvedUrl))
          ) &&
          Number.isInteger(record.currentVisibleMetrics?.replies) &&
          Number.isInteger(record.currentVisibleMetrics?.reposts) &&
          Number.isInteger(record.currentVisibleMetrics?.likes) &&
          record.metricOwner === (record.relationship === "repost"
            ? "source-status-not-kctownhall-repost-action"
            : "account-authored-status") &&
          Number.isInteger(record.mediaSignals?.photoCount) &&
          typeof record.mediaSignals?.hasVideoOrGif === "boolean" &&
          (!record.outsideAuthoredInteraction || (
            record.relationship === "repost" &&
            record.outsideAuthoredInteraction.targetAccount === "@KCTownHall" &&
            ["quote-post", "reply"].includes(record.outsideAuthoredInteraction.interactionType) &&
            record.outsideAuthoredInteraction.stakeholderRole === "sitting-kansas-city-council-member" &&
            record.outsideAuthoredInteraction.roleSourceId === "SRC-KCMO-COUNCIL-ROSTER-2018"
          ))
      ) &&
      kcthDirectResponseRecords.every((record) =>
        record.relationship === "repost" &&
          record.metricOwner === "source-status-not-kctownhall-repost-action"
      ) &&
      kcthAggregateFindingsRecompute &&
      kcthRelationshipCounts["account-post"] === kcthFull.expectedAccountPosts &&
      kcthRelationshipCounts["account-reply"] === kcthFull.expectedAccountReplies &&
      kcthRelationshipCounts.repost === kcthFull.expectedReposts &&
      kcthRepostSourceHandles.size === kcthFull.expectedRepostSourceAccounts &&
      kcthExternalHandles.size === kcthFull.expectedExternalHandles &&
      countKcthMention("@QuintonLucasKC") === kcthFull.expectedQuintonLucasMentions &&
      countKcthMention("@Robinson4kc") === kcthFull.expectedMelissaRobinsonMentions &&
      kcthCityPoliticalReposts.length === kcthFull.expectedCityPoliticalFigureReposts &&
      kcthDirectResponseRecords.length === kcthFull.expectedDirectCouncilResponses &&
      new Set(kcthDirectResponseRecords.map((record) => record.statusOwner.toLowerCase())).size === kcthFull.expectedDirectCouncilAccounts &&
      kcthLinks.length === kcthFull.expectedShortUrlOccurrences &&
      kcthUniqueShortUrls.size === kcthFull.expectedUniqueShortUrls &&
      kcthUniqueDestinations.size === kcthFull.expectedResolvedDestinations &&
      kcthProjectDestinations.size === kcthFull.expectedProjectOrLineageDestinations &&
      kcthExternalDestinations.size === kcthFull.expectedExternalDestinations &&
      kcthThemeCounts["resident-tire-intake-and-operations"] === kcthFull.expectedTireWorkflowRecords &&
      kcthTireRecords.filter((record) => record.relationship === "account-post").length === kcthFull.expectedTireWorkflowPosts &&
      kcthTireRecords.filter((record) => record.relationship === "account-reply").length === kcthFull.expectedTireWorkflowReplies &&
      kcthTireRecords.filter((record) => record.relationship === "repost").length === kcthFull.expectedTireWorkflowReposts &&
      kcthThemeCounts["civic-information-and-service-routing"] === kcthFull.expectedCivicInformationRecords &&
      kcthThemeCounts["neighborhood-culture-and-community"] === kcthFull.expectedNeighborhoodCultureRecords &&
      kcthThemeCounts["town-hall-development-and-participation"] === kcthFull.expectedDevelopmentRecords &&
      kcthThemeCounts["racial-justice-documentation"] === kcthFull.expectedRacialJusticeRecords &&
      kcthThemeCounts["pandemic-resource-routing"] === kcthFull.expectedPandemicResourceRecords &&
      kcthAuthoredReactionSnapshot.statusesWithVisibleReaction === kcthFull.expectedAuthoredStatusesWithReaction &&
      kcthAuthoredReactionSnapshot.replies === kcthFull.expectedAuthoredVisibleReplies &&
      kcthAuthoredReactionSnapshot.reposts === kcthFull.expectedAuthoredVisibleReposts &&
      kcthAuthoredReactionSnapshot.likes === kcthFull.expectedAuthoredVisibleLikes &&
      kcTownHallPopulationAudit.uniqueItemsRecovered === kcthFull.expectedUniqueItems &&
      kcTownHallPopulationAudit.unresolvedPopulationSlots === kcthFull.expectedUnresolvedSlots &&
      kcTownHallCorpusFindings.tireWorkflowRecords === kcthFull.expectedTireWorkflowRecords &&
      kcTownHallCorpusFindings.directCouncilMemberResponseStatuses === kcthFull.expectedDirectCouncilResponses &&
      kcTownHallCorpusFindings.authoredVisibleLikes === kcthFull.expectedAuthoredVisibleLikes &&
      kcTownHallSocialCorpus.sources.length === kcthFull.expectedSourceCount &&
      kcTownHallSocialCorpus.observations.length === kcthFull.expectedObservationCount &&
      kcTownHallSocialCorpus.claims.length === kcthFull.expectedClaimCount &&
      kcTownHallSocialCorpus.researchInquiries.length === kcthFull.expectedInquiryCount &&
      kcthFullSources.every((source) =>
        source?.visibility === "public" && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      kcthAuditSource?.kind === "research-run" &&
      kcthAuditSource.canonicalUrl?.includes(kcthFull.ledgerPath) &&
      kcthAuditSource.doesNotEstablish.some((boundary) => /platform export/i.test(boundary)) &&
      kcthActiveClaim?.status === "confirmed-with-boundary" &&
      kcthActiveClaim.projections.some((projection) =>
        projection.status === "active" &&
          projection.surfaces.includes("/work/kc-town-hall") &&
          /shared public account as an operating surface/i.test(projection.text) &&
          /100 of 183 surviving records/i.test(projection.text)
      ) &&
      kcthActiveClaim.boundaries.some((boundary) => /shared project identity/i.test(boundary)) &&
      kcthActiveClaim.antiClaims.some((antiClaim) => /One hundred records equal/i.test(antiClaim)) &&
      kcthCouncilResponseClaim?.antiClaims.some((antiClaim) => /Nine Council members engaged/i.test(antiClaim)) &&
      kcthHeldClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      kcthFullInquiry?.resultStatus === "recovered" &&
      kcthFullInquiry.limitations.some((limitation) => /does not prove that no record was deleted/i.test(limitation)) &&
      kcthTractionInquiry?.resultStatus === "partially-recovered" &&
      kcthTractionInquiry.findings.some((finding) => /only two records meet the direct-response definition/i.test(finding)) &&
      kcthAuthorshipInquiry?.resultStatus === "inconclusive" &&
      kcthAuthorshipInquiry.limitations.some((limitation) => /cannot identify an author/i.test(limitation)) &&
      kcthProof?.status === "source-backed" &&
      kcthProof.sourceIds.includes(kcthFull.auditSourceId) &&
      kcthOccurrence?.claimId === kcthFull.activeClaimId &&
      kcthOccurrence.sourceIds.length === 5 &&
      kcthPage?.sourceOrder.includes(kcthFull.auditSourceId) &&
      kcTownHallMdx.includes(kcthFull.activeClaimId) &&
      kcTownHallMdx.includes("public-service-interface") &&
      kcthDocumentation.includes("all 183 unique surviving items") &&
      kcthDocumentation.includes("not a platform export") &&
      kcthDocumentation.includes("outreach counts, not responses") &&
      kcthDocumentation.includes("Metrics on the 28 reposted source statuses are excluded") &&
      kcthDocumentation.includes("not necessarily coverage of KC Town Hall") &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(kcthLedgerText) &&
      kcthRecords.every((record) =>
        !/(?:816[- .])\d{3}[- .]\d{4}/.test(record.publicSummary) &&
        !/\b\d{3,5}\s+(?:N\.?|S\.?|E\.?|W\.?)?\s*[A-Z][A-Za-z]+(?:\s+(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard))\b/i.test(record.publicSummary)
      ) &&
      publicRegistryText.includes(kcthFull.activeClaimId) &&
      kcthFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const nycacFull = suite.pilot.nycacPopulationDisposition;
  const nycacLedgerPath = path.join(repoRoot, nycacFull.ledgerPath);
  const nycacDocumentation = existsSync(path.join(repoRoot, nycacFull.documentationPath))
    ? readFileSync(path.join(repoRoot, nycacFull.documentationPath), "utf8")
    : "";
  const nycacLedger = fixtures.nycacLedger ?? (existsSync(nycacLedgerPath)
    ? JSON.parse(readFileSync(nycacLedgerPath, "utf8"))
    : null);
  const nycacRecords = nycacLedger?.records ?? [];
  const nycacRecordIds = nycacRecords.map((record) => record.statusId);
  const nycacRecordUrls = nycacRecords.map((record) => record.statusUrl);
  const nycacRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(nycacRecords, (record) => record.relationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const nycacAuthoredRecords = nycacRecords.filter((record) => record.relationship !== "native-repost-source");
  const nycacRepostSourceRecords = nycacRecords.filter((record) => record.relationship === "native-repost-source");
  const nycacRepostSourceAccounts = new Set(nycacRepostSourceRecords.map((record) => record.sourceAccount));
  const nycacDirectMentionRecords = nycacRepostSourceRecords.filter((record) => record.directMentionOfAccount);
  const nycacDirectMentionAccounts = new Set(nycacDirectMentionRecords.map((record) => record.sourceAccount));
  const nycacLinks = nycacRecords.flatMap((record) => record.postedUrls ?? []);
  const nycacUniqueShortUrls = new Set(nycacLinks.map((link) => link.shortUrl));
  const nycacResolvedShortUrls = new Set(
    nycacLinks.filter((link) => link.resolvedUrl).map((link) => link.shortUrl)
  );
  const nycacUnresolvedShortUrls = new Set(
    nycacLinks.filter((link) => !link.resolvedUrl).map((link) => link.shortUrl)
  );
  const nycacResolvedDestinations = new Set(
    nycacLinks.map((link) => link.resolvedUrl).filter(Boolean)
  );
  const countNycacCampaignSignal = (signal) => nycacRecords.filter(
    (record) => record.campaignSignals.includes(signal)
  ).length;
  const nycacAuthoredReactionSnapshot = nycacAuthoredRecords.reduce(
    (totals, record) => {
      const metrics = record.reactionSnapshot;
      totals.records += 1;
      totals.recordsWithVisibleReaction += metrics.replies + metrics.reposts + metrics.likes > 0 ? 1 : 0;
      totals.replies += metrics.replies;
      totals.reposts += metrics.reposts;
      totals.likes += metrics.likes;
      return totals;
    },
    { records: 0, recordsWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );
  const nycacFullSources = nycacSocialCorpus.sources.map((source) => sourceById.get(source.id));
  const nycacLinkedArticleSources = nycacSocialCorpus.intakeItems[0].sourceIds
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source) => source?.kind === "published-article");
  const nycacFullClaims = nycacSocialCorpus.claims.map((claim) => claimById.get(claim.id));
  const nycacHeldClaims = nycacFull.heldClaimIds.map((id) => claimById.get(id));
  const nycacFullInquiries = nycacSocialCorpus.researchInquiries.map((inquiry) => inquiryById.get(inquiry.id));
  const nycacAuditSource = sourceById.get(nycacFull.auditSourceId);
  const nycacFullInquiry = inquiryById.get("INQ-NYCAC-FULL-POPULATION-2026");
  const nycacCarrierInquiry = inquiryById.get("INQ-NYCAC-HISTORICAL-CARRIER-RECOVERY");
  const nycacContinuityInquiry = inquiryById.get("INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY");
  const nycacSharedIdentityClaim = claimById.get("CLM-NYCAC-SHARED-SOCIAL-IDENTITY");
  const nycacLedgerText = nycacLedger ? JSON.stringify(nycacLedger) : "";
  const nycacPopulationDispositionComplete = Boolean(
    nycacLedger &&
      nycacLedger.account === "@NYCArtC" &&
      nycacLedger.observedAt === "2026-07-14" &&
      nycacLedger.population.displayedProfileCount === nycacFull.expectedProfileCount &&
      nycacLedger.population.itemLevelRecordsRecovered === nycacFull.expectedUniqueItems &&
      nycacLedger.population.unresolvedProfileCountSlots === nycacFull.expectedUnresolvedSlots &&
      nycacLedger.population.dispositionTotal === nycacFull.expectedProfileCount &&
      nycacLedger.population.itemLevelRecordsRecovered + nycacLedger.population.unresolvedProfileCountSlots === nycacFull.expectedProfileCount &&
      nycacLedger.population.relationshipCounts["account-post"] === nycacFull.expectedAccountPosts &&
      nycacLedger.population.relationshipCounts["account-reply"] === nycacFull.expectedAccountReplies &&
      nycacLedger.population.relationshipCounts["native-repost-source"] === nycacFull.expectedRepostSourceStatuses &&
      nycacLedger.unresolvedItems.length === 1 &&
      nycacLedger.unresolvedItems[0].count === nycacFull.expectedUnresolvedSlots &&
      nycacLedger.unresolvedItems[0].doesNotProve.length >= 4 &&
      /100 percent population reconciliation, not 100 percent item-level recovery/i.test(nycacLedger.population.completenessStatement) &&
      /No credential, cookie, direct message, private analytics/i.test(nycacLedger.method.authenticationBoundary) &&
      nycacRecords.length === nycacFull.expectedUniqueItems &&
      new Set(nycacRecordIds).size === nycacFull.expectedUniqueItems &&
      new Set(nycacRecordUrls).size === nycacFull.expectedUniqueItems &&
      nycacRecords.every((record) =>
        /^\d+$/.test(record.statusId) &&
          record.statusUrl.endsWith(`/status/${record.statusId}`) &&
          ["account-post", "account-reply", "native-repost-source"].includes(record.relationship) &&
          typeof record.sourceAccount === "string" && record.sourceAccount.startsWith("@") &&
          typeof record.publicSummary === "string" && record.publicSummary.length &&
          typeof record.contentDigest === "string" && /^[a-f0-9]{64}$/.test(record.contentDigest) &&
          !("text" in record) &&
          Array.isArray(record.campaignSignals) &&
          Array.isArray(record.hashtags) &&
          Array.isArray(record.publicMentions) &&
          Array.isArray(record.postedUrls) &&
          record.postedUrls.every((link) =>
            /^https?:\/\/t\.co\//.test(link.shortUrl) &&
              (link.resolvedUrl === null || /^https?:\/\//.test(link.resolvedUrl)) &&
              ["resolved-currently", "not-resolved"].includes(link.resolutionStatus)
          ) &&
          Number.isInteger(record.mediaSignals?.imageCount) &&
          (record.relationship === "native-repost-source"
            ? record.reactionSnapshot === null && record.metricOwner === "source-status-excluded"
            : Number.isInteger(record.reactionSnapshot?.replies) &&
              Number.isInteger(record.reactionSnapshot?.reposts) &&
              Number.isInteger(record.reactionSnapshot?.likes) &&
              record.metricOwner === "nycartc-status")
      ) &&
      nycacRelationshipCounts["account-post"] === nycacFull.expectedAccountPosts &&
      nycacRelationshipCounts["account-reply"] === nycacFull.expectedAccountReplies &&
      nycacRelationshipCounts["native-repost-source"] === nycacFull.expectedRepostSourceStatuses &&
      nycacAuthoredRecords.length === nycacFull.expectedAuthoredStatuses &&
      nycacRepostSourceAccounts.size === nycacFull.expectedRepostSourceAccounts &&
      nycacDirectMentionRecords.length === nycacFull.expectedDirectMentionStatuses &&
      nycacDirectMentionAccounts.size === nycacFull.expectedDirectMentionAccounts &&
      countNycacCampaignSignal("fair-rent-nyc") === nycacFull.expectedFairRentSignals &&
      countNycacCampaignSignal("let-nyc-dance") === nycacFull.expectedLetDanceSignals &&
      countNycacCampaignSignal("save-nyc-spaces") === nycacFull.expectedSaveSpacesSignals &&
      countNycacCampaignSignal("talks-not-raids") === nycacFull.expectedTalksNotRaidsSignals &&
      nycacLinks.length === nycacFull.expectedShortUrlOccurrences &&
      nycacUniqueShortUrls.size === nycacFull.expectedUniqueShortUrls &&
      nycacResolvedShortUrls.size === nycacFull.expectedResolvedShortUrls &&
      nycacUnresolvedShortUrls.size === nycacFull.expectedUnresolvedShortUrls &&
      nycacResolvedDestinations.size === nycacFull.expectedResolvedDestinations &&
      nycacAuthoredReactionSnapshot.recordsWithVisibleReaction === nycacFull.expectedAuthoredStatusesWithReaction &&
      nycacAuthoredReactionSnapshot.replies === nycacFull.expectedAuthoredVisibleReplies &&
      nycacAuthoredReactionSnapshot.reposts === nycacFull.expectedAuthoredVisibleReposts &&
      nycacAuthoredReactionSnapshot.likes === nycacFull.expectedAuthoredVisibleLikes &&
      nycacLedger.aggregateFindings.postedLinks.shortUrlOccurrences === nycacLinks.length &&
      nycacLedger.aggregateFindings.postedLinks.uniqueShortUrls === nycacUniqueShortUrls.size &&
      nycacLedger.aggregateFindings.postedLinks.resolvedShortUrls === nycacResolvedShortUrls.size &&
      nycacLedger.aggregateFindings.postedLinks.unresolvedShortUrls === nycacUnresolvedShortUrls.size &&
      nycacLedger.aggregateFindings.postedLinks.uniqueResolvedDestinations === nycacResolvedDestinations.size &&
      nycacLedger.aggregateFindings.repostNetwork.statuses === nycacFull.expectedRepostSourceStatuses &&
      nycacLedger.aggregateFindings.repostNetwork.distinctSourceAccounts === nycacRepostSourceAccounts.size &&
      nycacLedger.aggregateFindings.repostNetwork.directMentionStatuses === nycacDirectMentionRecords.length &&
      nycacLedger.aggregateFindings.repostNetwork.directMentionAccounts === nycacDirectMentionAccounts.size &&
      nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.records === nycacAuthoredReactionSnapshot.records &&
      nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.recordsWithVisibleReaction === nycacAuthoredReactionSnapshot.recordsWithVisibleReaction &&
      nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.replies === nycacAuthoredReactionSnapshot.replies &&
      nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.reposts === nycacAuthoredReactionSnapshot.reposts &&
      nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.likes === nycacAuthoredReactionSnapshot.likes &&
      nycacPopulationAudit.profileCountObserved === nycacFull.expectedProfileCount &&
      nycacPopulationAudit.uniqueItemsRecovered === nycacFull.expectedUniqueItems &&
      nycacPopulationAudit.unresolvedPopulationSlots === nycacFull.expectedUnresolvedSlots &&
      nycacPopulationAudit.dispositionTotal === nycacFull.expectedProfileCount &&
      nycacCorpusFindings.uniqueShortUrls === nycacFull.expectedUniqueShortUrls &&
      nycacCorpusFindings.linkedSourcesCloselyRead === nycacFull.expectedLinkedArticleCount &&
      nycacSocialCorpus.sources.length === nycacFull.expectedSourceCount &&
      nycacLinkedArticleSources.length === nycacFull.expectedLinkedArticleCount &&
      nycacSocialCorpus.observations.length === nycacFull.expectedObservationCount &&
      nycacSocialCorpus.claims.length === nycacFull.expectedClaimCount &&
      nycacSocialCorpus.researchInquiries.length === nycacFull.expectedInquiryCount &&
      [...nycacFullSources, ...nycacLinkedArticleSources].every((source) =>
        source?.visibility === "public" && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      nycacAuditSource?.kind === "research-run" &&
      nycacAuditSource.canonicalUrl?.includes(nycacFull.ledgerPath) &&
      nycacAuditSource.doesNotEstablish.some((boundary) => /100 percent item-level recovery/i.test(boundary)) &&
      nycacHeldClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      nycacFullClaims.every((claim) => claim?.antiClaims.length >= 3 && claim.boundaries.length >= 2) &&
      nycacFullInquiry?.resultStatus === "partially-recovered" &&
      nycacFullInquiry.findings.some((finding) => /4,098 explicit unresolved slots/i.test(finding)) &&
      nycacCarrierInquiry?.resultStatus === "not-recovered" &&
      nycacCarrierInquiry.limitations.some((limitation) => /Not recovered does not mean no archive exists/i.test(limitation)) &&
      nycacContinuityInquiry?.resultStatus === "partially-recovered" &&
      nycacSharedIdentityClaim?.evidence.some((evidence) => evidence.sourceId === nycacFull.auditSourceId) &&
      nycacDocumentation.includes("1,026 + 4,098 = 5,124") &&
      nycacDocumentation.includes("population disposition") &&
      nycacDocumentation.includes("carrier gap, not a claim of inactivity") &&
      nycacDocumentation.includes("Most of these are mission context, not coverage of NYC Artist Coalition") &&
      nycacDocumentation.includes("Nothing from this pass is added automatically") &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(nycacLedgerText) &&
      nycacFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const urbanFull = suite.pilot.urbanhermitFullPopulation;
  const urbanLedgerPath = path.join(repoRoot, urbanFull.ledgerPath);
  const urbanDocumentation = fixtures.urbanhermitDocumentation ?? (existsSync(path.join(repoRoot, urbanFull.documentationPath))
    ? readFileSync(path.join(repoRoot, urbanFull.documentationPath), "utf8")
    : "");
  const urbanSourcesDocumentation = fixtures.urbanhermitSourcesDocumentation ?? readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/sources.md"),
    "utf8"
  );
  const urbanKnowledgeBankDocumentation = fixtures.urbanhermitKnowledgeBankDocumentation ?? readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/README.md"),
    "utf8"
  );
  const urbanSocialArchiveDocumentation = fixtures.urbanhermitSocialArchiveDocumentation ?? readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/projects/social-media-archive-production-2026-07-14.md"),
    "utf8"
  );
  const urbanCanonicalLedger = existsSync(urbanLedgerPath)
    ? JSON.parse(readFileSync(urbanLedgerPath, "utf8"))
    : null;
  const urbanLedger = fixtures.urbanhermitLedger ?? urbanCanonicalLedger;
  const urbanRecords = urbanLedger?.records ?? [];
  const urbanLinkedSourceEdges = urbanLedger?.linkedSourceEdges ?? [];
  const urbanRecordIds = new Set(urbanRecords.map((record) => record.statusId));
  const urbanWithheldDispositions = urbanLedger?.withheldPopulationDispositions ?? [];
  const urbanContextDisposition = urbanWithheldDispositions.find(
    (item) => item.disposition === "context-only"
  );
  const urbanProtectedDisposition = urbanWithheldDispositions.find(
    (item) => item.disposition === "protected-context"
  );
  const urbanPublicRecords = urbanRecords.filter((record) => record.disposition === "public-safe-evidence");
  const urbanAuthoredRecords = urbanRecords.filter((record) => record.relationship !== "native-repost-source-status");
  const urbanSourceRecords = urbanRecords.filter((record) => record.relationship === "native-repost-source-status");
  const urbanPublicRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(urbanRecords, (record) => record.relationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const urbanProjectCounts = Object.fromEntries(
    Object.entries(Object.groupBy(urbanPublicRecords.flatMap((record) => record.projectIds), (project) => project))
      .map(([project, values]) => [project, values.length])
  );
  const urbanThemeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(urbanPublicRecords.flatMap((record) => record.themes), (theme) => theme))
      .map(([theme, values]) => [theme, values.length])
  );
  const urbanMentionedHandles = new Set(
    urbanPublicRecords.flatMap((record) => record.mentionedHandles ?? [])
      .map((handle) => handle.toLowerCase())
  );
  const urbanPostedUrls = urbanPublicRecords.flatMap((record) => record.postedUrls ?? []);
  const urbanUniquePostedUrls = new Set(urbanPostedUrls);
  const urbanAuthoredReactionSnapshot = urbanAuthoredRecords.reduce(
    (totals, record) => {
      const metrics = record.currentVisibleMetrics;
      totals.statuses += 1;
      totals.statusesWithVisibleReaction += Object.values(metrics).some((value) => value > 0) ? 1 : 0;
      totals.replies += metrics.replies;
      totals.reposts += metrics.reposts;
      totals.likes += metrics.likes;
      return totals;
    },
    { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );
  const urbanFullSources = urbanhermitSocialCorpus.sources.map((source) => sourceById.get(source.id));
  const urbanFullIntake = intakeById.get("INTAKE-URBANHERMIT-FULL-POPULATION-CORPUS-2026");
  const urbanLinkedSources = urbanFullIntake?.sourceIds.map((id) => sourceById.get(id)) ?? [];
  const urbanFullObservations = urbanhermitSocialCorpus.observations.map(
    (observation) => observationById.get(observation.id)
  );
  const urbanFullClaims = urbanhermitSocialCorpus.claims.map((claim) => claimById.get(claim.id));
  const urbanHeldClaims = urbanFull.heldClaimIds.map((id) => claimById.get(id));
  const urbanFullInquiries = urbanhermitSocialCorpus.researchInquiries.map((inquiry) => inquiryById.get(inquiry.id));
  const urbanAuditSource = sourceById.get(urbanFull.auditSourceId);
  const urbanPopulationInquiry = inquiryById.get("INQ-URBANHERMIT-FULL-POPULATION-2026");
  const urbanOutsideInquiry = inquiryById.get("INQ-URBANHERMIT-OUTSIDE-ENGAGEMENT");
  const urbanPersonalInventory = socialMediaArchiveProduction.inventory.personalAccounts?.find(
    (account) => account.handle === "@urbanhermit"
  );
  const urbanLedgerText = urbanLedger ? JSON.stringify(urbanLedger) : "";
  const urbanhermitBearingLedgerSurface = (ledger) => {
    const { records = [], ...metadata } = ledger ?? {};
    const containsUrbanhermit = (value) => /urbanhermit/i.test(JSON.stringify(value));
    return {
      metadata: Object.fromEntries(
        Object.entries(metadata).filter(([, value]) => containsUrbanhermit(value))
      ),
      records: records.filter((record) => containsUrbanhermit(record))
    };
  };
  const urbanCrossLedgerContractHash = sha256(JSON.stringify({
    wowlist: urbanhermitBearingLedgerSurface(wowLedger),
    kcTownHall: urbanhermitBearingLedgerSurface(kcthLedger),
    nycArtistCoalition: urbanhermitBearingLedgerSurface(nycacLedger)
  }));
  const urbanLedgerContractHash = urbanLedger ? sha256(urbanLedgerText) : "";
  const urbanLedgerMetadataContract = urbanLedger ? structuredClone(urbanLedger) : null;
  if (urbanLedgerMetadataContract) urbanLedgerMetadataContract.records = [];
  const urbanLedgerMetadataContractHash = urbanLedgerMetadataContract
    ? sha256(JSON.stringify(urbanLedgerMetadataContract))
    : "";
  const urbanForbiddenRecordFields = [
    "recordKey",
    "contentDigestSha256",
    "normalizedTextCharacterCount",
    "publishedYear",
    "text",
    "rawText"
  ];
  const hasExactKeys = (value, allowed) =>
    value && Object.keys(value).length === allowed.size && Object.keys(value).every((key) => allowed.has(key));
  const equalUrbanCountMaps = (left, right) => {
    const keys = new Set([...Object.keys(left ?? {}), ...Object.keys(right ?? {})]);
    return [...keys].every((key) => left?.[key] === right?.[key]);
  };
  const urbanCanonicalRecordsById = new Map(
    (urbanCanonicalLedger?.records ?? []).map((record) => [record.statusId, record])
  );
  const urbanRecordMatchesCanonicalIdentity = (record) => {
    const canonical = urbanCanonicalRecordsById.get(record.statusId);
    if (!canonical) return false;

    return [
      "statusUrl", "publishedAt", "relationship", "authorHandle", "disposition",
      "contentSummary", "projectIds", "themes", "mentionedHandles", "hashtags",
      "postedUrls", "currentVisibleMetrics", "metricOwner"
    ].every((field) => JSON.stringify(record[field]) === JSON.stringify(canonical[field]));
  };
  const urbanStatusUrlMatchesAuthor = (record) => {
    try {
      const parsed = new URL(record.statusUrl);
      const parts = parsed.pathname.split("/").filter(Boolean);
      return parsed.protocol === "https:" &&
        parsed.hostname === "x.com" &&
        parts.length === 3 &&
        parts[0].toLowerCase() === record.authorHandle.slice(1).toLowerCase() &&
        parts[1] === "status" &&
        parts[2] === record.statusId;
    } catch {
      return false;
    }
  };
  const urbanPublishedAtMatchesSnowflake = (record) => {
    const id = BigInt(record.statusId);
    if (id < 100000000000000000n) return true;
    const snowflakeTime = Number((id >> 22n) + 1288834974657n);
    return Math.abs(Date.parse(record.publishedAt) - snowflakeTime) < 1000;
  };
  const urbanSemanticFieldsMatch = (actual, expected, fields) =>
    Boolean(actual && expected && fields.every(
      (field) => JSON.stringify(actual[field]) === JSON.stringify(expected[field])
    ));
  const urbanStringArray = (value) =>
    Array.isArray(value) && value.every((item) => typeof item === "string");
  const urbanAllowedTopLevelFields = new Set([
    "schemaVersion", "reviewedAt", "sourceProfile", "populationDefinition", "populationAudit",
    "method", "contentBoundary", "metricBoundary", "aggregateFindings", "unresolvedItems", "records",
    "withheldPopulationDispositions", "linkedSourceEdges"
  ]);
  const urbanAllowedPopulationAuditFields = new Set([
    "profileCountObserved", "profileAndBoundedSearchItemsRecovered", "unresolvedPopulationSlots",
    "dispositionTotal", "completenessStatement", "publicEvidenceItemRecordsPublished",
    "contextItemsWithheldFromPublicLedger", "protectedItemsWithheldFromPublicLedger"
  ]);
  const urbanAllowedMethodFields = new Set([
    "authenticatedReadOnlyReview", "surfaces", "freshVerification", "exclusions"
  ]);
  const urbanAllowedFreshVerificationFields = new Set([
    "verifiedAt", "profileCountReconfirmed", "uniqueItemRecords", "broadDateWindowsSearched",
    "annualWindowsSearched", "profileTraversalReachedOldestRecoveredStatus", "repliesSurfaceCarrierErrorObserved"
  ]);
  const urbanAllowedContentBoundaryFields = new Set([
    "rawTextCommitted", "nonEvidenceItemRecordsCommitted", "publicSafeEvidenceLinksCommitted",
    "publicRecordCrosswalkCommitted", "rationale"
  ]);
  const urbanAllowedMetricBoundaryFields = new Set([
    "accountAuthoredMetrics", "repostSourceMetrics", "doesNotEstablish"
  ]);
  const urbanAllowedAggregateFields = new Set([
    "dispositionCounts", "projectSignalCounts", "themeSignalCounts", "publicSafeEvidenceRecords",
    "contextOnlyRecords", "protectedContextRecords", "distinctPublicHandlesInEvidenceRecords",
    "postedPublicUrlOccurrencesInEvidenceRecords", "uniquePostedPublicUrlsInEvidenceRecords",
    "selectedMissionSourceStatusIds", "publicLedgerRelationshipCounts",
    "publicSafeAccountAuthoredVisibleReactionSnapshot", "sourceStatusMetricsExcluded"
  ]);
  const urbanAllowedRecordFields = new Set([
    "statusId", "statusUrl", "publishedAt", "relationship", "authorHandle", "disposition",
    "contentSummary", "projectIds", "themes", "mentionedHandles", "hashtags", "postedUrls",
    "currentVisibleMetrics", "metricOwner"
  ]);
  const urbanAllowedSourceStatusMetricFields = new Set([
    "publicEvidenceSourceStatuses", "metricsCommitted"
  ]);
  const urbanAllowedDispositionCountFields = new Set([
    "context-only", "protected-context", "public-safe-evidence"
  ]);
  const urbanAllowedProjectSignalFields = new Set([
    "callnyc", "harry-j-epstein", "kc-town-hall", "nyc-artist-coalition",
    "public-media-making", "sunday-dinner", "waterways-and-participatory-art", "wowlist"
  ]);
  const urbanAllowedThemeSignalFields = new Set([
    "civic-participation-and-public-service", "collective-campaign-circulation",
    "community-cultural-infrastructure", "participatory-waterways-practice",
    "public-media-making", "technical-making-and-media-archaeology"
  ]);
  const urbanAllowedRelationshipCountFields = new Set([
    "account-post", "account-reply", "native-repost-source-status"
  ]);
  const urbanAllowedReactionFields = new Set([
    "statuses", "statusesWithVisibleReaction", "replies", "reposts", "likes"
  ]);
  const urbanAllowedCurrentMetricFields = new Set(["replies", "reposts", "likes"]);
  const urbanAllowedLinkedSourceFields = new Set([
    "statusId", "shortUrl", "destinationSourceId", "resolutionStatus"
  ]);
  const urbanAllowedWithheldFields = new Set(["disposition", "count", "publicDetail"]);
  const urbanAllowedUnresolvedFields = new Set(["slot", "disposition", "reason"]);
  const urbanNonRecordMetadata = urbanLedger ? structuredClone(urbanLedger) : null;
  if (urbanNonRecordMetadata) {
    urbanNonRecordMetadata.records = [];
    urbanNonRecordMetadata.aggregateFindings.selectedMissionSourceStatusIds = [];
    urbanNonRecordMetadata.linkedSourceEdges = [];
  }
  const urbanNonRecordMetadataText = urbanNonRecordMetadata
    ? JSON.stringify(urbanNonRecordMetadata)
    : "";
  const urbanExpectedObservationSources = new Map([
    ["OBS-URBANHERMIT-POPULATION-DISPOSITION", urbanFull.auditSourceId],
    ["OBS-URBANHERMIT-PRACTICE-CONTINUITY", urbanFull.auditSourceId],
    ["OBS-URBANHERMIT-WATER-PRACTICE", "SRC-X-URBANHERMIT-RIVER-OFFICE-HOURS-2009"],
    ["OBS-URBANHERMIT-KCUR-WATER-QUOTE", "SRC-X-KCUR-CENTRAL-STANDARD-JAMIE-WATER-2015"],
    ["OBS-URBANHERMIT-UCP-VIDEO-SELF-REPORT", "SRC-X-URBANHERMIT-UCP-CURFEW-VIDEO-2012"],
    ["OBS-URBANHERMIT-UCP-VIMEO-AVAILABILITY", "SRC-VIMEO-URBANHERMIT-UCP-CURFEW-VIDEO-2012"],
    ["OBS-URBANHERMIT-HORSE-LORDS-SELF-REPORT", "SRC-X-URBANHERMIT-HORSE-LORDS-2016"],
    ["OBS-URBANHERMIT-HORSE-LORDS-OUTSIDE-CREDIT", "SRC-X-THRILL-JOCKEY-HORSE-LORDS-2016"],
    ["OBS-URBANHERMIT-HORSE-LORDS-NPR-PUBLICATION", "SRC-NPR-HORSE-LORDS-TRUTHERS-2016"],
    ["OBS-URBANHERMIT-CIVIC-CAMPAIGN-CIRCULATION", urbanFull.auditSourceId],
    ["OBS-URBANHERMIT-LETNYCDANCE-CIRCULATION", "SRC-X-URBANHERMIT-LETNYCDANCE-REPEAL-2017"],
    ["OBS-URBANHERMIT-TALKSNOTRAIDS-CIRCULATION", "SRC-X-URBANHERMIT-TALKSNOTRAIDS-2019"],
    ["OBS-URBANHERMIT-HJE-WEBSITE-SELF-REPORT", "SRC-X-URBANHERMIT-HJE-WEBSITE-2010"],
    ["OBS-URBANHERMIT-TECHNICAL-PRACTICE", "SRC-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020"],
    ["OBS-URBANHERMIT-OUTSIDE-RECOGNITION", "SRC-X-LETSGLITCHIT-JAMIE-CONNECTIONS-2023"],
    ["OBS-URBANHERMIT-GOOD-TIMES-ROUTING", "SRC-X-URBANHERMIT-GOOD-TIMES-ZINES-2-2015"],
    ["OBS-URBANHERMIT-GOOD-TIMES-ISSUE-CONTEXT", "SRC-GOOD-TIMES-ZINES-2-2015"],
    ["OBS-URBANHERMIT-MARKET-HOTEL-CONTEXT", "SRC-OBSERVER-MARKET-HOTEL-2016"],
    ["OBS-URBANHERMIT-VISIBLE-REACTION-SNAPSHOT", urbanFull.auditSourceId]
  ]);
  const urbanSemanticContractsHold = Boolean(
    urbanFullSources.every((source, index) => urbanSemanticFieldsMatch(
      source,
      urbanhermitSocialCorpus.sources[index],
      ["title", "organization", "author", "kind", "visibility", "preservationStatus",
        "publishedAt", "canonicalUrl", "publicCitation", "publicNote",
        "supportsGenerally", "doesNotEstablish"]
    )) &&
      urbanFullObservations.every((observation, index) => urbanSemanticFieldsMatch(
        observation,
        urbanhermitSocialCorpus.observations[index],
        ["sourceId", "project", "kind", "text", "locator", "status", "publicSafe",
          "claimIds", "researchInquiryIds", "limitations"]
      )) &&
      urbanFullClaims.every((claim, index) => urbanSemanticFieldsMatch(
        claim,
        urbanhermitSocialCorpus.claims[index],
        ["project", "internalClaim", "status", "projections", "evidence", "boundaries",
          "antiClaims", "researchInquiryIds"]
      )) &&
      urbanFullInquiries.every((inquiry, index) => urbanSemanticFieldsMatch(
        inquiry,
        urbanhermitSocialCorpus.researchInquiries[index],
        ["project", "question", "methods", "resultStatus", "findings", "limitations",
          "sourceIds", "publicSummary"]
      ))
  );
  const urbanObservationsAtomic = Boolean(
    urbanFullObservations.length === urbanExpectedObservationSources.size &&
      urbanFullObservations.every((observation) =>
        observation &&
          urbanExpectedObservationSources.get(observation.id) === observation.sourceId &&
          observation.locator &&
          observation.limitations.length &&
          (observation.claimIds.length || observation.researchInquiryIds.length) &&
          !/\b(?:proves?|solely|single-handedly|caused|impact)\b/i.test(observation.text)
      )
  );
  const urbanObservationContractsHold = Object.entries(urbanFull.observationContracts).every(
    ([observationId, contract]) => {
      const observation = observationById.get(observationId);
      return observation?.sourceId === contract.sourceId &&
        contract.requiredPhrases.every((phrase) => observation.text.includes(phrase));
    }
  );
  const urbanSourceContractsHold = Object.entries(urbanFull.sourceContracts).every(
    ([sourceId, [requiredSupport, requiredBoundary]]) => {
      const source = sourceById.get(sourceId);
      return source?.supportsGenerally.includes(requiredSupport) &&
        source.doesNotEstablish.includes(requiredBoundary);
    }
  );
  const urbanClaimContractsHold = Object.entries(urbanFull.claimContracts).every(
    ([claimId, [requiredClaimPhrase, requiredBoundaryPhrase]]) => {
      const claim = claimById.get(claimId);
      return claim?.internalClaim.includes(requiredClaimPhrase) &&
        claim.boundaries.some((boundary) => boundary.includes(requiredBoundaryPhrase));
    }
  );
  const urbanPositiveSemanticText = JSON.stringify({
    sourceSupports: urbanFullSources.map((source) => source?.supportsGenerally),
    observations: urbanFullObservations.map((observation) => observation?.text),
    claims: urbanFullClaims.map((claim) => ({
      internalClaim: claim?.internalClaim,
      projections: claim?.projections.map((projection) => projection.text)
    })),
    inquiries: urbanFullInquiries.map((inquiry) => ({
      findings: inquiry?.findings,
      publicSummary: inquiry?.publicSummary
    }))
  });
  const urbanPositiveSemanticsBounded =
    !/(?:single-handedly|solely led|caused (?:the )?(?:policy|outcome)|proves? (?:all|every)|every coalition campaign|definitively delivered|all of Jamie's professional impact)/i.test(
      urbanPositiveSemanticText
    );
  const urbanKnowledgeGraphContractHash = sha256(JSON.stringify({
    corpus: urbanhermitSocialCorpus,
    canonical: {
      intake: urbanFullIntake,
      sources: urbanLinkedSources,
      observations: urbanFullObservations,
      claims: urbanFullClaims,
      inquiries: urbanFullInquiries
    }
  }));
  const urbanPublicSurfaceContractHash = sha256(JSON.stringify({
    populationAudit: urbanhermitPopulationAudit,
    corpusFindings: urbanhermitCorpusFindings,
    personalInventory: urbanPersonalInventory,
    documentation: urbanDocumentation,
    sourcesDocumentation: urbanSourcesDocumentation,
    knowledgeBankDocumentation: urbanKnowledgeBankDocumentation,
    socialArchiveDocumentation: urbanSocialArchiveDocumentation
  }));
  const urbanSemanticContractHash = sha256(JSON.stringify({
    sources: urbanFullSources.map((source) => source && ({
      id: source.id,
      title: source.title,
      organization: source.organization,
      author: source.author,
      kind: source.kind,
      visibility: source.visibility,
      preservationStatus: source.preservationStatus,
      publishedAt: source.publishedAt,
      canonicalUrl: source.canonicalUrl,
      publicCitation: source.publicCitation,
      publicNote: source.publicNote,
      supportsGenerally: source.supportsGenerally,
      doesNotEstablish: source.doesNotEstablish
    })),
    observations: urbanFullObservations.map((observation) => observation && ({
      id: observation.id,
      sourceId: observation.sourceId,
      project: observation.project,
      kind: observation.kind,
      text: observation.text,
      locator: observation.locator,
      status: observation.status,
      publicSafe: observation.publicSafe,
      claimIds: observation.claimIds,
      researchInquiryIds: observation.researchInquiryIds,
      limitations: observation.limitations
    })),
    claims: urbanFullClaims.map((claim) => claim && ({
      id: claim.id,
      project: claim.project,
      internalClaim: claim.internalClaim,
      status: claim.status,
      projections: claim.projections,
      evidence: claim.evidence,
      boundaries: claim.boundaries,
      antiClaims: claim.antiClaims,
      researchInquiryIds: claim.researchInquiryIds
    })),
    inquiries: urbanFullInquiries.map((inquiry) => inquiry && ({
      id: inquiry.id,
      project: inquiry.project,
      question: inquiry.question,
      methods: inquiry.methods,
      resultStatus: inquiry.resultStatus,
      findings: inquiry.findings,
      limitations: inquiry.limitations,
      sourceIds: inquiry.sourceIds,
      publicSummary: inquiry.publicSummary
    }))
  }));
  const urbanMethodContractHolds = Boolean(
    urbanStringArray(urbanLedger?.method?.surfaces) &&
      JSON.stringify(urbanLedger.method.surfaces) === JSON.stringify(urbanFull.methodContract.surfaces) &&
      urbanStringArray(urbanLedger.method.exclusions) &&
      JSON.stringify(urbanLedger.method.exclusions) === JSON.stringify(urbanFull.methodContract.exclusions) &&
      urbanStringArray(urbanLedger.method.freshVerification.broadDateWindowsSearched) &&
      JSON.stringify(urbanLedger.method.freshVerification.broadDateWindowsSearched) ===
        JSON.stringify(urbanFull.methodContract.broadDateWindowsSearched) &&
      urbanLedger.method.freshVerification.annualWindowsSearched ===
        urbanFull.methodContract.annualWindowsSearched &&
      urbanLedger.method.freshVerification.verifiedAt === urbanLedger.reviewedAt &&
      urbanLedger.method.freshVerification.profileCountReconfirmed === urbanFull.expectedProfileCount &&
      urbanLedger.method.freshVerification.uniqueItemRecords === urbanFull.expectedUniqueItems &&
      urbanLedger.method.freshVerification.profileTraversalReachedOldestRecoveredStatus === true &&
      urbanLedger.method.freshVerification.repliesSurfaceCarrierErrorObserved === true
  );
  const urbanLinkedSourceContractsHold = Boolean(
    urbanLinkedSourceEdges.length === urbanFull.expectedLinkedSourceEdgeCount &&
      urbanLinkedSourceEdges.every((edge) =>
        hasExactKeys(edge, urbanAllowedLinkedSourceFields) &&
          edge.resolutionStatus === "verified-redirect" &&
          urbanRecordIds.has(edge.statusId) &&
          urbanRecords.find((record) => record.statusId === edge.statusId)?.postedUrls.includes(edge.shortUrl) &&
          urbanFullIntake?.sourceIds.includes(edge.destinationSourceId) &&
          sourceById.get(edge.destinationSourceId)?.visibility === "public"
      ) &&
      new Set(urbanLinkedSourceEdges.map((edge) => `${edge.statusId}|${edge.shortUrl}|${edge.destinationSourceId}`)).size ===
        urbanFull.expectedLinkedSourceEdgeCount &&
      JSON.stringify(urbanLinkedSourceEdges.map((edge) => [
        edge.statusId, edge.shortUrl, edge.destinationSourceId
      ])) === JSON.stringify(urbanFull.linkedSourceContracts)
  );
  const urbanIntakeSourceGraphComplete = Boolean(
    urbanFullIntake?.sourceIds.length === urbanFull.expectedLinkedSourceCount &&
      new Set(urbanFullIntake.sourceIds).size === urbanFull.expectedLinkedSourceCount &&
      urbanLinkedSources.every(Boolean) &&
      urbanFullIntake.sourceIds.every((sourceId) =>
        urbanFullObservations.some((observation) =>
          observation?.intakeId === urbanFullIntake.id && observation.sourceId === sourceId
        )
      )
  );
  const urbanFullPopulationComplete = Boolean(
    urbanLedger &&
      hasExactKeys(urbanLedger, urbanAllowedTopLevelFields) &&
      hasExactKeys(urbanLedger.populationAudit, urbanAllowedPopulationAuditFields) &&
      hasExactKeys(urbanLedger.method, urbanAllowedMethodFields) &&
      hasExactKeys(urbanLedger.method.freshVerification, urbanAllowedFreshVerificationFields) &&
      hasExactKeys(urbanLedger.contentBoundary, urbanAllowedContentBoundaryFields) &&
      hasExactKeys(urbanLedger.metricBoundary, urbanAllowedMetricBoundaryFields) &&
      hasExactKeys(urbanLedger.aggregateFindings, urbanAllowedAggregateFields) &&
      hasExactKeys(urbanLedger.aggregateFindings.dispositionCounts, urbanAllowedDispositionCountFields) &&
      hasExactKeys(urbanLedger.aggregateFindings.projectSignalCounts, urbanAllowedProjectSignalFields) &&
      hasExactKeys(urbanLedger.aggregateFindings.themeSignalCounts, urbanAllowedThemeSignalFields) &&
      hasExactKeys(urbanLedger.aggregateFindings.publicLedgerRelationshipCounts, urbanAllowedRelationshipCountFields) &&
      hasExactKeys(urbanLedger.aggregateFindings.publicSafeAccountAuthoredVisibleReactionSnapshot, urbanAllowedReactionFields) &&
      hasExactKeys(
        urbanLedger.aggregateFindings.sourceStatusMetricsExcluded,
        urbanAllowedSourceStatusMetricFields
      ) &&
      urbanLedger.sourceProfile === "https://x.com/urbanhermit" &&
      urbanLedger.reviewedAt === "2026-07-14" &&
      urbanLedgerContractHash === urbanFull.expectedLedgerSha256 &&
      urbanLedgerMetadataContractHash === urbanFull.expectedLedgerMetadataSha256 &&
      urbanKnowledgeGraphContractHash === urbanFull.expectedKnowledgeGraphSha256 &&
      urbanPublicSurfaceContractHash === urbanFull.expectedPublicSurfaceSha256 &&
      urbanCrossLedgerContractHash === urbanFull.expectedCrossLedgerSha256 &&
      urbanSemanticContractHash === urbanFull.expectedSemanticContractSha256 &&
      urbanLedger.populationAudit.profileCountObserved === urbanFull.expectedProfileCount &&
      urbanLedger.populationAudit.profileAndBoundedSearchItemsRecovered === urbanFull.expectedUniqueItems &&
      urbanLedger.populationAudit.unresolvedPopulationSlots === urbanFull.expectedUnresolvedSlots &&
      urbanLedger.populationAudit.dispositionTotal === urbanFull.expectedProfileCount &&
      urbanLedger.populationAudit.publicEvidenceItemRecordsPublished === urbanFull.expectedPublicSafeEvidenceRecords &&
      urbanLedger.populationAudit.contextItemsWithheldFromPublicLedger === urbanFull.expectedContextOnlyRecords &&
      urbanLedger.populationAudit.protectedItemsWithheldFromPublicLedger === urbanFull.expectedProtectedContextRecords &&
      urbanLedger.unresolvedItems.length === urbanFull.expectedUnresolvedSlots &&
      urbanLedger.unresolvedItems.every((item, index) =>
        hasExactKeys(item, urbanAllowedUnresolvedFields) &&
          item.slot === index + 1 &&
          item.disposition === "carrier-limited-not-recovered" &&
          item.reason === "The live profile count exceeded the deduplicated public statuses exposed by profile traversal and bounded searches."
      ) &&
      /population reconciliation, not a platform export/i.test(urbanLedger.populationAudit.completenessStatement) &&
      urbanLedger.method.authenticatedReadOnlyReview === true &&
      urbanMethodContractHolds &&
      urbanLedger.contentBoundary.rawTextCommitted === false &&
      urbanLedger.contentBoundary.nonEvidenceItemRecordsCommitted === false &&
      urbanLedger.contentBoundary.publicSafeEvidenceLinksCommitted === true &&
      urbanLedger.contentBoundary.publicRecordCrosswalkCommitted === false &&
      typeof urbanLedger.contentBoundary.rationale === "string" &&
      !/https?:\/\//i.test(urbanLedger.contentBoundary.rationale) &&
      typeof urbanLedger.metricBoundary.accountAuthoredMetrics === "string" &&
      typeof urbanLedger.metricBoundary.repostSourceMetrics === "string" &&
      urbanStringArray(urbanLedger.metricBoundary.doesNotEstablish) &&
      urbanRecords.length + urbanContextDisposition?.count + urbanProtectedDisposition?.count +
        urbanLedger.unresolvedItems.length === urbanFull.expectedProfileCount &&
      urbanRecords.length + urbanContextDisposition?.count + urbanProtectedDisposition?.count ===
        urbanFull.expectedUniqueItems &&
      urbanRecords.length === urbanFull.expectedPublicSafeEvidenceRecords &&
      new Set(urbanRecords.map((record) => record.statusId)).size === urbanRecords.length &&
      urbanRecords.every((record) =>
        record.disposition === "public-safe-evidence" &&
          hasExactKeys(record, urbanAllowedRecordFields) &&
          urbanForbiddenRecordFields.every((field) => !Object.hasOwn(record, field)) &&
          /^\d+$/.test(record.statusId) &&
          urbanStatusUrlMatchesAuthor(record) &&
          urbanPublishedAtMatchesSnowflake(record) &&
          urbanRecordMatchesCanonicalIdentity(record) &&
          /^@/.test(record.authorHandle) &&
          Array.isArray(record.mentionedHandles) &&
          Array.isArray(record.hashtags) &&
          Array.isArray(record.postedUrls) &&
          urbanStringArray(record.projectIds) &&
          urbanStringArray(record.themes) &&
          urbanStringArray(record.mentionedHandles) &&
          urbanStringArray(record.hashtags) &&
          urbanStringArray(record.postedUrls) &&
          record.postedUrls.every((url) => /^https?:\/\//.test(url)) &&
          (record.relationship === "native-repost-source-status"
            ? record.metricOwner === "source-status-excluded" &&
              record.currentVisibleMetrics === null &&
              record.authorHandle.toLowerCase() !== "@urbanhermit"
            : ["account-post", "account-reply"].includes(record.relationship) &&
              record.authorHandle.toLowerCase() === "@urbanhermit" &&
              record.metricOwner === "account-authored-status" &&
              hasExactKeys(record.currentVisibleMetrics, urbanAllowedCurrentMetricFields) &&
              Number.isInteger(record.currentVisibleMetrics?.replies) &&
              Number.isInteger(record.currentVisibleMetrics?.reposts) &&
              Number.isInteger(record.currentVisibleMetrics?.likes) &&
              Object.values(record.currentVisibleMetrics).every((value) => value >= 0))
      ) &&
      urbanWithheldDispositions.length === 2 &&
      urbanWithheldDispositions.every((item) =>
        hasExactKeys(item, urbanAllowedWithheldFields) &&
          Number.isInteger(item.count) &&
          item.count > 0 &&
          item.publicDetail === "Aggregate count only; no public item identifier, year, date, author, relationship, metric, length, digest, link, name, or text fingerprint is retained."
      ) &&
      urbanContextDisposition?.count === urbanFull.expectedContextOnlyRecords &&
      urbanProtectedDisposition?.count === urbanFull.expectedProtectedContextRecords &&
      urbanAuthoredRecords.length === urbanFull.expectedPublicAccountAuthoredEvidenceRecords &&
      urbanSourceRecords.length === urbanFull.expectedPublicSourceStatusEvidenceRecords &&
      urbanPublicRelationshipCounts["account-post"] + urbanPublicRelationshipCounts["account-reply"] ===
        urbanFull.expectedPublicAccountAuthoredEvidenceRecords &&
      urbanPublicRelationshipCounts["native-repost-source-status"] ===
        urbanFull.expectedPublicSourceStatusEvidenceRecords &&
      urbanPublicRecords.length === urbanFull.expectedPublicSafeEvidenceRecords &&
      urbanMentionedHandles.size === urbanFull.expectedDistinctPublicHandles &&
      urbanPostedUrls.length === urbanFull.expectedPostedUrlOccurrences &&
      urbanUniquePostedUrls.size === urbanFull.expectedUniquePostedUrls &&
      urbanProjectCounts["waterways-and-participatory-art"] === urbanFull.expectedWaterPracticeSignals &&
      urbanProjectCounts["sunday-dinner"] === urbanFull.expectedSundayDinnerSignals &&
      urbanProjectCounts.wowlist === urbanFull.expectedWowlistSignals &&
      urbanProjectCounts["nyc-artist-coalition"] === urbanFull.expectedNycArtistCoalitionSignals &&
      urbanAuthoredReactionSnapshot.statuses === urbanFull.expectedPublicAccountAuthoredEvidenceRecords &&
      urbanAuthoredReactionSnapshot.statusesWithVisibleReaction === urbanFull.expectedAuthoredStatusesWithReaction &&
      urbanAuthoredReactionSnapshot.replies === urbanFull.expectedAuthoredVisibleReplies &&
      urbanAuthoredReactionSnapshot.reposts === urbanFull.expectedAuthoredVisibleReposts &&
      urbanAuthoredReactionSnapshot.likes === urbanFull.expectedAuthoredVisibleLikes &&
      urbanLedger.aggregateFindings.dispositionCounts["public-safe-evidence"] === urbanPublicRecords.length &&
      urbanLedger.aggregateFindings.dispositionCounts["context-only"] === urbanContextDisposition.count &&
      urbanLedger.aggregateFindings.dispositionCounts["protected-context"] === urbanProtectedDisposition.count &&
      urbanLedger.aggregateFindings.distinctPublicHandlesInEvidenceRecords === urbanMentionedHandles.size &&
      urbanLedger.aggregateFindings.postedPublicUrlOccurrencesInEvidenceRecords === urbanPostedUrls.length &&
      urbanLedger.aggregateFindings.uniquePostedPublicUrlsInEvidenceRecords === urbanUniquePostedUrls.size &&
      JSON.stringify(urbanLedger.aggregateFindings.selectedMissionSourceStatusIds) ===
        JSON.stringify(urbanCanonicalLedger.aggregateFindings.selectedMissionSourceStatusIds) &&
      urbanLedger.aggregateFindings.selectedMissionSourceStatusIds.every((id) => urbanRecordIds.has(id)) &&
      equalUrbanCountMaps(urbanLedger.aggregateFindings.projectSignalCounts, urbanProjectCounts) &&
      equalUrbanCountMaps(urbanLedger.aggregateFindings.themeSignalCounts, urbanThemeCounts) &&
      equalUrbanCountMaps(
        urbanLedger.aggregateFindings.publicLedgerRelationshipCounts,
        urbanPublicRelationshipCounts
      ) &&
      equalUrbanCountMaps(
        urbanLedger.aggregateFindings.publicSafeAccountAuthoredVisibleReactionSnapshot,
        urbanAuthoredReactionSnapshot
      ) &&
      urbanLedger.aggregateFindings.sourceStatusMetricsExcluded.publicEvidenceSourceStatuses ===
        urbanFull.expectedPublicSourceStatusMetricsExcluded &&
      urbanLedger.aggregateFindings.sourceStatusMetricsExcluded.publicEvidenceSourceStatuses ===
        urbanSourceRecords.length &&
      urbanLedger.aggregateFindings.sourceStatusMetricsExcluded.metricsCommitted === false &&
      urbanhermitPopulationAudit.profileCountObserved === urbanFull.expectedProfileCount &&
      urbanhermitPopulationAudit.uniqueItemsRecovered === urbanFull.expectedUniqueItems &&
      urbanhermitPopulationAudit.unresolvedPopulationSlots === urbanFull.expectedUnresolvedSlots &&
      urbanhermitCorpusFindings.publicSafeEvidenceRecords === urbanFull.expectedPublicSafeEvidenceRecords &&
      urbanhermitCorpusFindings.publicSafeAccountAuthoredEvidenceRecords ===
        urbanFull.expectedPublicAccountAuthoredEvidenceRecords &&
      urbanhermitCorpusFindings.publicSafeSourceStatusEvidenceRecords ===
        urbanFull.expectedPublicSourceStatusEvidenceRecords &&
      urbanhermitCorpusFindings.contextOnlyRecords === urbanFull.expectedContextOnlyRecords &&
      urbanhermitCorpusFindings.protectedContextRecords === urbanFull.expectedProtectedContextRecords &&
      urbanhermitCorpusFindings.accountAuthoredStatusesWithVisibleReaction ===
        urbanFull.expectedAuthoredStatusesWithReaction &&
      urbanhermitCorpusFindings.accountAuthoredVisibleReplies === urbanFull.expectedAuthoredVisibleReplies &&
      urbanhermitCorpusFindings.accountAuthoredVisibleReposts === urbanFull.expectedAuthoredVisibleReposts &&
      urbanhermitCorpusFindings.accountAuthoredVisibleLikes === urbanFull.expectedAuthoredVisibleLikes &&
      urbanhermitCorpusFindings.publicEvidenceSourceStatusMetricsExcluded ===
        urbanFull.expectedPublicSourceStatusMetricsExcluded &&
      urbanhermitSocialCorpus.sources.length === urbanFull.expectedNewSourceCount &&
      urbanhermitSocialCorpus.observations.length === urbanFull.expectedObservationCount &&
      urbanhermitSocialCorpus.claims.length === urbanFull.expectedClaimCount &&
      urbanhermitSocialCorpus.researchInquiries.length === urbanFull.expectedInquiryCount &&
      urbanObservationsAtomic &&
      urbanObservationContractsHold &&
      urbanSourceContractsHold &&
      urbanClaimContractsHold &&
      urbanPositiveSemanticsBounded &&
      urbanLinkedSourceContractsHold &&
      urbanIntakeSourceGraphComplete &&
      urbanSemanticContractsHold &&
      urbanFullSources.every((source) =>
        source?.visibility === "public" && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      urbanAuditSource?.kind === "research-run" &&
      urbanAuditSource.canonicalUrl?.includes(urbanFull.ledgerPath) &&
      urbanAuditSource.doesNotEstablish.some((boundary) => /platform export/i.test(boundary)) &&
      urbanAuditSource.doesNotEstablish.some((boundary) => /personal-account material/i.test(boundary)) &&
      urbanHeldClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      urbanFullClaims.every((claim) => claim?.antiClaims.length >= 3 && claim.boundaries.length >= 1) &&
      urbanPopulationInquiry?.resultStatus === "partially-recovered" &&
      urbanPopulationInquiry.findings.some((finding) => /Nine slots remain carrier-limited and unresolved/i.test(finding)) &&
      urbanOutsideInquiry?.resultStatus === "partially-recovered" &&
      urbanOutsideInquiry.limitations.some((limitation) => /recoverable floor/i.test(limitation)) &&
      urbanPersonalInventory?.profilePosts === urbanFull.expectedProfileCount &&
      urbanPersonalInventory.recoveredStatuses === urbanFull.expectedUniqueItems &&
      /Personal-account evidence is governed separately/i.test(urbanPersonalInventory.boundary) &&
      urbanDocumentation.includes("425 + 9 = 434") &&
      urbanDocumentation.includes("personal account is not a project account") &&
      urbanDocumentation.includes("Nothing from this pass is added automatically") &&
      urbanDocumentation.includes("source-status metrics") &&
      urbanDocumentation.includes("aggregate-only") &&
      urbanDocumentation.includes("no public item-level crosswalk") &&
      !/(?:recordKey|contentDigestSha256|normalizedTextCharacterCount|publishedYear)/.test(urbanLedgerText) &&
      !/\b\d{15,}\b/.test(urbanNonRecordMetadataText) &&
      !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(urbanNonRecordMetadataText) &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(urbanLedgerText) &&
      !/(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b)/i.test(urbanLedgerText) &&
      urbanFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const allEvaluatedObservations = [...pilotObservations, ...expansionObservations, ...pressObservations, ...kcFundingObservations, kcTransitionObservation, ...teamsObservations, ...sharedDriveObservations, ...socialMediaArchiveProduction.observations, ...callNycSocialCorpus.observations, ...wowlistSocialCorpus.observations, ...kcTownHallSocialCorpus.observations, ...nycacSocialCorpus.observations, ...urbanhermitSocialCorpus.observations];
  const allEvaluatedClaims = [...pilotClaims, ...expansionClaims, pressClaim, ...kcFundingClaims, kcTransitionClaim, ...teamsClaims, ...sharedDriveClaims, ...socialClaims, ...callFullClaims, ...wowFullClaims, ...kcthFullClaims, ...nycacFullClaims, ...urbanFullClaims];
  const allEvaluatedInquiries = [...pilotInquiries, ...expansionInquiries, pressInquiry, kcFundingInquiry, kcTransitionInquiry, ...teamsInquiries, ...sharedDriveInquiries, ...socialInquiries, ...callFullInquiries, ...wowFullInquiries, ...kcthFullInquiries, ...nycacFullInquiries, ...urbanFullInquiries];
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
        allEvaluatedObservations.every((item) => item?.locator && item.limitations.length && (item.claimIds.length || item.researchInquiryIds.length)) &&
        urbanObservationsAtomic
      ),
      evidence: [`${allEvaluatedObservations.filter(Boolean).length} proposition-level observations have locators, limitations, and claim or inquiry links`]
    },
    {
      criterionId: "KB-EVAL-SCOPE",
      score: score(
        [...pilotSources, ...expansionSources, ...pressIndexSources, ...pressArticleSources, ...kcFundingSources, ...urbanFullSources].every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
        expansionSources.length === expansion.expectedSourceCount &&
        !errors.some((error) => /does not establish|support a proposition/i.test(error)) &&
        urbanObservationsAtomic
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
    },
    {
      criterionId: "KB-EVAL-TEAMS-ARCHIVE-PRODUCTION",
      score: score(teamsArchiveComplete),
      evidence: [teamsArchiveComplete
        ? `${teamsSources.length} bounded sources from three required Teams archive families produced ${teamsObservations.length} atomic observations and ${teamsClaims.length} mature claims; one independently supported CallNYC claim is public and the remaining depth stays held`
        : "Teams archive source counts, boundaries, hydration limits, held claims, proof coverage, CallNYC projection, documentation, or private-source redaction is incomplete"]
    },
    {
      criterionId: "KB-EVAL-GDRIVE-SHARED-DRIVES-PRODUCTION",
      score: score(sharedDriveComplete),
      evidence: [sharedDriveComplete
        ? `${sharedDriveSources.length} protected sources from a ${sharedDrives.expectedDriveCount}-drive inventory and ${sharedDrives.expectedInspectedRootCount}-root sample produced ${sharedDriveObservations.length} atomic observations and ${sharedDriveClaims.length} mature claims; the existing Sunday Dinner projection gained aggregate support while five claims remain held`
        : "Shared Drives counts, non-exhaustive method, deduplication, private-source redaction, collective credit, held claims, Sunday Dinner projection, proof coverage, or documentation is incomplete"]
    },
    {
      criterionId: "KB-EVAL-SOCIAL-MEDIA-ARCHIVE-PRODUCTION",
      score: score(socialArchiveComplete),
      evidence: [socialArchiveComplete
        ? `Five authenticated project-account inventories produced ${socialMediaArchiveProduction.sources.length} bounded sources, an eight-member CallNYC count, an at-least-five-member NYC Artist Coalition floor, ${social.activeClaimIds.length} inspectable public claims, and ${social.heldClaimIds.length} held claims with collective-authorship and completeness limits`
        : "Social-account identity, recovered counts, official-at-date verification, outreach distinction, collective authorship, excluded-handle boundaries, selected projections, held depth, public safety, or documentation is incomplete"]
    },
    {
      criterionId: "KB-EVAL-CALLNYC-FULL-POPULATION",
      score: score(callFullPopulationComplete),
      evidence: [callFullPopulationComplete
        ? `All ${callFull.expectedProfileCount} observed profile-count slots are dispositioned through ${callRecords.length} unique item records and ${callLedger.unresolvedItems.length} explicit unresolved slots; the ledger preserves ${callUniqueShortUrls.size} unique short URLs, ${callRecognitionRecords.length} recognition posts, ${callRecognitionIssuePages.size} issue pages, ${callRecognitionCategories.size} categories, and ${callRecognitionHandles.size} intended Council-member accounts without converting outreach into response`
        : "CallNYC ledger reconciliation, item uniqueness, relationship counts, URL inventory, stakeholder derivation, unresolved-slot boundaries, source maturation, held claims, public projection, proof coverage, or public safety is incomplete"]
    },
    {
      criterionId: "KB-EVAL-WOWLIST-FULL-POPULATION",
      score: score(wowFullPopulationComplete),
      evidence: [wowFullPopulationComplete
        ? `All ${wowFull.expectedProfileCount} surviving profile-count items are recovered through ${wowRecords.length} unique records; the ledger preserves ${wowUniqueShortUrls.size} posted short URLs, ${wowFull.expectedSupportReplies} direct support replies, ${wowExternalHandles.size} external account touchpoints, ${wowThemeCounts["civic-mobilization-and-care"] + wowThemeCounts["civic-care-amplification"]} civic-care records, and a separately bounded visible-reaction snapshot without assigning shared-account authorship or source-status metrics to Jamie`
        : "WOW List ledger reconciliation, item uniqueness, link inventory, support and stakeholder patterns, source-status metric exclusion, collective authorship, held depth, public projection, proof coverage, or public safety is incomplete"]
    },
    {
      criterionId: "KB-EVAL-KCTH-FULL-POPULATION",
      score: score(kcthFullPopulationComplete),
      evidence: [kcthFullPopulationComplete
        ? `All ${kcthFull.expectedProfileCount} surviving profile-count items are recovered through ${kcthRecords.length} unique records; the ledger preserves ${kcthUniqueShortUrls.size} posted short URLs, ${kcthFull.expectedTireWorkflowRecords} tire-workflow records, ${kcthExternalHandles.size} outside-account touchpoints, and a ${kcthFull.expectedDirectCouncilResponses}-member direct-response floor while keeping outreach, amplification, mutable reactions, collective authorship, and private service data bounded`
        : "KC Town Hall ledger reconciliation, item uniqueness, link and source inventory, tire-workflow classification, direct-response derivation, metric parsing, source-status metric exclusion, collective authorship, private-data exclusion, held depth, public projection, proof coverage, or public safety is incomplete"]
    },
    {
      criterionId: "KB-EVAL-NYCAC-POPULATION-DISPOSITION",
      score: score(nycacPopulationDispositionComplete),
      evidence: [nycacPopulationDispositionComplete
        ? `All ${nycacFull.expectedProfileCount} displayed profile-count slots are dispositioned through ${nycacRecords.length} unique item records and ${nycacFull.expectedUnresolvedSlots} explicit carrier-limited slots; the ledger preserves ${nycacUniqueShortUrls.size} posted short URLs, ${nycacResolvedDestinations.size} current destinations, ${nycacRepostSourceAccounts.size} source accounts, ${nycacDirectMentionAccounts.size} direct-mention accounts, ten closely read sources, collective authorship, and source-status metric ownership without overloading the public portfolio`
        : "NYC Artist Coalition population arithmetic, item uniqueness, unresolved carrier limits, campaign and source classifications, link inventory, direct-mention distinctions, source-status metric exclusion, collective authorship, held composition, or public safety is incomplete"]
    },
    {
      criterionId: "KB-EVAL-URBANHERMIT-FULL-POPULATION",
      score: score(urbanFullPopulationComplete),
      evidence: [urbanFullPopulationComplete
        ? `All ${urbanFull.expectedProfileCount} displayed personal-account slots are dispositioned through ${urbanRecords.length} public mission-relevant item records, ${urbanContextDisposition.count + urbanProtectedDisposition.count} aggregate-only withheld dispositions, and ${urbanFull.expectedUnresolvedSlots} carrier-limited slots; ${urbanUniquePostedUrls.size} distinct posted URLs are retained, source-status metrics are excluded, no public item-level crosswalk exists for withheld context, and all ${urbanHeldClaims.length} claims remain held for deliberate future composition`
        : "Personal-account population arithmetic, aggregate-only withholding, source-link inventory, metric ownership, source maturation, held composition, documentation, or public safety is incomplete"]
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
