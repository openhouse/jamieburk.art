import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { callNycCorpusFindings, callNycPopulationAudit, callNycSocialCorpus } from "../../apps/www/src/data/knowledge-bank/callnyc-social-corpus.ts";
import { googleDriveSharedDrivesProduction } from "../../apps/www/src/data/knowledge-bank/google-drive-shared-drives-production.ts";
import { kcTownHallFunding } from "../../apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { socialMediaArchiveProduction } from "../../apps/www/src/data/knowledge-bank/social-media-archive-production.ts";
import { teamsArchiveProduction } from "../../apps/www/src/data/knowledge-bank/teams-archive-production.ts";
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

export function evaluateKnowledgeBank(suite = loadKnowledgeEvalSuite()) {
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
  const wowLedger = existsSync(wowLedgerPath)
    ? JSON.parse(readFileSync(wowLedgerPath, "utf8"))
    : null;
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
  const allEvaluatedObservations = [...pilotObservations, ...expansionObservations, ...pressObservations, ...kcFundingObservations, kcTransitionObservation, ...teamsObservations, ...sharedDriveObservations, ...socialMediaArchiveProduction.observations, ...callNycSocialCorpus.observations, ...wowlistSocialCorpus.observations];
  const allEvaluatedClaims = [...pilotClaims, ...expansionClaims, pressClaim, ...kcFundingClaims, kcTransitionClaim, ...teamsClaims, ...sharedDriveClaims, ...socialClaims, ...callFullClaims, ...wowFullClaims];
  const allEvaluatedInquiries = [...pilotInquiries, ...expansionInquiries, pressInquiry, kcFundingInquiry, kcTransitionInquiry, ...teamsInquiries, ...sharedDriveInquiries, ...socialInquiries, ...callFullInquiries, ...wowFullInquiries];
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
        ? `Five authenticated project-account inventories produced ${socialMediaArchiveProduction.sources.length} bounded sources, an eight-member CallNYC count, an at-least-five-member NYC Artist Coalition floor, one inspectable public claim, and six held claims with collective-authorship and completeness limits`
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
