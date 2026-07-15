import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { nycacPressReadings } from "../../apps/www/src/data/knowledge-bank/nycac-press-readings.ts";
import { callNycSocialPopulationJuly2026 } from "../../apps/www/src/data/knowledge-bank/callnyc-social-population-2026-07.ts";
import { kcTownHallFieldPractice } from "../../apps/www/src/data/knowledge-bank/kctownhall-field-practice.ts";
import { kcTownHallCorpusFindings, kcTownHallPopulationAudit, kcTownHallSocialCorpus } from "../../apps/www/src/data/knowledge-bank/kctownhall-social-corpus.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { projectSocialAccounts, socialEngagementEvents, socialMediaProductionJuly2026 } from "../../apps/www/src/data/knowledge-bank/social-media-production-2026-07.ts";
import { wowListSocialPopulationJuly2026 } from "../../apps/www/src/data/knowledge-bank/wowlist-social-population-2026-07.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { validateKnowledgeBank } from "./citation-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const suitePath = path.join(repoRoot, "evals/knowledge-bank/evals.json");
const holdoutRunsPath = path.join(repoRoot, "evals/knowledge-bank/holdout-runs.json");
const publicRegistryPath = path.join(repoRoot, "apps/www/src/data/knowledge-bank/public-registry.json");
const KCTH_FIELD_PRACTICE_REVIEW_LOCKS = Object.freeze({
  corpusSha256: "7344b91556feaffebbcf4394b0b6cca9ac005c8d94d3b325dce97c557fc1cdc1",
  canonicalRecordsSha256: "00d2c80af90f0584311a5557e2ad02a8b67d63e7b1c5719a2418d82f692d4865",
  governedKnowledgeSha256: "1b01cfff6bbffaf40430c3a1870ce8a1b0b5e8a6cffed47bddc3aec3f089de21",
  proofProjectionSha256: "f8af10efe6b6c073197cc8f0f53189b04933dc66a4059807d727454724e9a07d",
  caseStudyMdxSha256: "859205fe5cd3d7aa538a4706d52ff2476657565336a8157b1bffc8a4fb502bce",
  sharedPublicSurfacesSha256: "07b3176335c16ebfe407fcf6f20180d9831169f4256a79e7ccc7aa0b8977f783",
  publicReviewReportSha256: "94814964151def3aa2a285e85644a8dfad7879736cf125c5906359e2f02e2696"
});

export function loadKnowledgeEvalSuite() {
  return JSON.parse(readFileSync(suitePath, "utf8"));
}

function score(passed, strong = true) {
  return passed ? (strong ? 5 : 4) : 1;
}

function sameOrderedValues(actual, expected) {
  return actual?.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

export function evaluateKnowledgeBank(suite = loadKnowledgeEvalSuite(), overrides = {}) {
  const holdoutLedger = JSON.parse(readFileSync(holdoutRunsPath, "utf8"));
  let consecutivePassingRuns = 0;
  for (const run of holdoutLedger.runs.toReversed()) {
    const passed = run.accepted === true &&
      run.weightedScore === 5 &&
      run.blockers.length === 0 &&
      run.criterionScores.length === suite.criteria.length &&
      run.criterionScores.every((criterionScore) => criterionScore === 5);
    if (!passed) break;
    consecutivePassingRuns += 1;
  }
  const holdoutEvidenceComplete = consecutivePassingRuns >= suite.targets.consecutivePassingRuns;
  const intakeById = new Map(knowledgeBank.intakeItems.map((item) => [item.id, item]));
  const observationById = new Map(knowledgeBank.observations.map((item) => [item.id, item]));
  const sourceById = new Map(knowledgeBank.sources.map((item) => [item.id, item]));
  const claimById = new Map(knowledgeBank.claims.map((item) => [item.id, item]));
  const entityById = new Map(knowledgeBank.entities.map((item) => [item.id, item]));
  const relationById = new Map(knowledgeBank.agencyRelations.map((item) => [item.id, item]));
  const inquiryById = new Map(knowledgeBank.researchInquiries.map((item) => [item.id, item]));
  const correctionById = new Map(knowledgeBank.corrections.map((item) => [item.id, item]));
  const fairRentPage = knowledgeBank.pages.find((page) => page.id === "fair-rent-nyc");
  const fairRentMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/fair-rent-nyc.mdx"), "utf8");
  const errors = validateKnowledgeBank();
  const publicRegistryText = readFileSync(publicRegistryPath, "utf8");

  const kcTownHall = suite.pilot.kcTownHallCouncilFunding;
  const kcTownHallIntake = intakeById.get(kcTownHall.intakeId);
  const kcTownHallContributionIntake = intakeById.get(kcTownHall.contributionIntakeId);
  const kcTownHallTransitionIntake = intakeById.get(kcTownHall.transitionIntakeId);
  const kcTownHallSources = kcTownHall.sourceIds.map((id) => sourceById.get(id));
  const kcTownHallContributionSource = sourceById.get(kcTownHall.contributionSourceId);
  const kcTownHallObservations = kcTownHall.observationIds.map((id) => observationById.get(id));
  const kcTownHallContributionObservation = observationById.get(kcTownHall.contributionObservationId);
  const kcTownHallTransitionObservation = observationById.get(kcTownHall.transitionObservationId);
  const kcTownHallClaim = claimById.get(kcTownHall.claimId);
  const kcTownHallContributionClaim = claimById.get(kcTownHall.contributionClaimId);
  const kcTownHallInquiry = inquiryById.get(kcTownHall.inquiryId);
  const kcTownHallTransitionInquiry = inquiryById.get(kcTownHall.transitionInquiryId);
  const kcTownHallRelations = kcTownHall.relationIds.map((id) => relationById.get(id));
  const kcTownHallProofCoverage = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === kcTownHall.proofId
  );
  const kcTownHallProof = proofClaims.find((proof) => proof.id === kcTownHall.proofId);
  const kcTownHallPage = knowledgeBank.pages.find((page) => page.id === kcTownHall.pageId);
  const kcTownHallProofSourceIds = [...kcTownHall.sourceIds, kcTownHall.contributionSourceId];
  const kcTownHallProofCoverageSourceIds = [
    ...kcTownHallProofSourceIds,
    "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
    "SRC-KCTH-FIELD-PRACTICE-REVIEW-2026"
  ];
  const kcTownHallProofCoverageInquiryIds = [
    kcTownHall.inquiryId,
    "INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION",
    "INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE"
  ];
  const kcTownHallSocialSourceIds = [
    "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
    "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29",
    "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29",
    "SRC-KCMO-COUNCIL-ROSTER-2018",
    "SRC-KCMO-COUNCIL-BUSINESS-SESSION-TERMS"
  ];
  const kcTownHallPageSourceIds = [...kcTownHallProofSourceIds, ...kcTownHallSocialSourceIds];
  const kcTownHallMdx = overrides.kcTownHallMdx ?? readFileSync(
    path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"),
    "utf8"
  );
  const kcTownHallAdditionalPublicSurfaceText = overrides.kcTownHallAdditionalPublicSurfaceText ?? [
    readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8"),
    readFileSync(path.join(repoRoot, "apps/www/src/app/work/technical-operations/page.tsx"), "utf8")
  ].join("\n");
  const kcTownHallMdxSha256 = createHash("sha256")
    .update(kcTownHallMdx)
    .digest("hex");
  const kcTownHallMdxProse = kcTownHallMdx.replace(/<Claim[\s\S]*?\/>/g, "");
  const workSource = readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8");
  const kcTownHallWorkStart = workSource.indexOf('title: "KC Town Hall LLC"');
  const kcTownHallWorkEnd = workSource.indexOf("\n  {\n    title:", kcTownHallWorkStart + 1);
  const kcTownHallWorkText = workSource.slice(
    kcTownHallWorkStart,
    kcTownHallWorkEnd === -1 ? workSource.length : kcTownHallWorkEnd
  );
  const kcTownHallWorkSummary = kcTownHallWorkText.match(
    /summary:\s*\n\s*"([^"]+)"/
  )?.[1];
  const kcTownHallProjectNote = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/projects/kc-town-hall.md"),
    "utf8"
  );
  const expectedKcTownHallObservationSources = new Map([
    ["OBS-KC-TOWN-HALL-BOARD-RECOMMENDATION-190649", "SRC-KC-TOWN-HALL-RESOLUTION-190649"],
    ["OBS-KC-TOWN-HALL-COUNCIL-ACCEPTANCE-190649", "SRC-KC-TOWN-HALL-RESOLUTION-190649"],
    ["OBS-KC-TOWN-HALL-COUNCIL-APPROPRIATION-190642", "SRC-KC-TOWN-HALL-ORDINANCE-190642"],
    ["OBS-KC-TOWN-HALL-NO-DISBURSEMENT-2022", "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17"],
    ["OBS-KC-TOWN-HALL-WITHDRAWAL-240317", "SRC-KC-TOWN-HALL-ORDINANCE-240317"]
  ]);
  const expectedKcTownHallRelations = new Map([
    ["REL-KC-CCED-BOARD-RECOMMENDED-TOWN-HALL", {
      actorId: "ENT-KC-CCED-BOARD",
      action: "recommended-for-funding",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      creditScope: "institutional"
    }],
    ["REL-JAMIE-COLED-KC-TOWN-HALL-PLANNING", {
      actorId: "ENT-JAMIE-BURKART",
      action: "co-led",
      objectId: "ENT-KC-TOWN-HALL-LLC",
      creditScope: "shared"
    }],
    ["REL-KC-COUNCIL-ACCEPTED-TOWN-HALL-RECOMMENDATION", {
      actorId: "ENT-KC-COUNCIL",
      action: "accepted-recommendation",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      creditScope: "institutional"
    }],
    ["REL-KC-COUNCIL-APPROPRIATED-TOWN-HALL-FUNDS", {
      actorId: "ENT-KC-COUNCIL",
      action: "appropriated",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      creditScope: "institutional"
    }],
    ["REL-KC-TOWN-HALL-WITHDREW-CCED-PROJECT", {
      actorId: "ENT-KC-TOWN-HALL-LLC",
      action: "withdrew-from",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      creditScope: "institutional"
    }],
    ["REL-KC-COUNCIL-RECLAIMED-TOWN-HALL-APPROPRIATION", {
      actorId: "ENT-KC-COUNCIL",
      action: "reclaimed-unused-appropriation",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      creditScope: "institutional"
    }]
  ]);
  const kcTownHallCaseStudyProjection = kcTownHallClaim?.projections.find(
    (projection) => projection.key === "case-study"
  );
  const kcTownHallContentSha256 = createHash("sha256").update(JSON.stringify({
    intakes: [kcTownHallIntake, kcTownHallContributionIntake, kcTownHallTransitionIntake],
    sources: [...kcTownHallSources, kcTownHallContributionSource],
    observations: [...kcTownHallObservations, kcTownHallContributionObservation, kcTownHallTransitionObservation],
    claims: [kcTownHallClaim, kcTownHallContributionClaim],
    inquiries: [kcTownHallInquiry, kcTownHallTransitionInquiry],
    relations: kcTownHallRelations,
    proof: kcTownHallProof,
    proofCoverage: kcTownHallProofCoverage,
    page: kcTownHallPage,
    work: kcTownHallWorkText,
    projectNote: kcTownHallProjectNote
  })).digest("hex");
  const hasKcTownHallLifecycle = (value) => Boolean(
    value &&
      /recommend/i.test(value) &&
      /accept(?:ed|ance)/i.test(value) &&
      /appropriat/i.test(value) &&
      /(?:no disbursement|no funds disbursed|absence of reported disbursement)/i.test(value) &&
      /(?:withdrew|withdrawal)/i.test(value) &&
      /unused/i.test(value)
  );
  const hasKcTownHallNegotiationBoundary = (value) => Boolean(
    value && /negotiat/i.test(value)
  );
  const hasKcTownHallOutcomeBoundary = (value) => Boolean(
    value &&
      /(?:no disbursement|no funds disbursed|reported no disbursement)/i.test(value) &&
      /(?:withdrew|withdrawal)/i.test(value) &&
      /unused/i.test(value)
  );
  const kcTownHallPublicText = [
    ...(kcTownHallClaim?.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text) ?? []),
    kcTownHallProof?.publicWording,
    kcTownHallProof?.shortWording,
    kcTownHallProof?.detailedPublicWording,
    kcTownHallWorkText,
    kcTownHallMdx
  ].filter(Boolean).join("\n");
  const kcTownHallForbiddenPatterns = [
    /KC Town Hall (?:received|spent|was paid) \$?490,?539/i,
    /KC Town Hall (?:secured|obtained|got|won|was granted|was awarded)[^.]{0,80}\$?490,?539/i,
    /(?:City|Council) (?:granted|gave|paid|funded|awarded) KC Town Hall[^.]{0,80}\$?490,?539/i,
    /funding agreement was executed/i,
    /Jamie[^.]{0,120}(?:secured|caused|won|obtained|persuaded|convinced|drove|delivered)[^.]{0,120}(?:Board|Council|recommendation|appropriation|funding)/i,
    /Jamie(?:'s|’s)?[^.]{0,120}(?:brought in|earned|got)[^.]{0,120}(?:\$?490,?539|City (?:funding|money|award))/i,
    /Jamie[^.]{0,120}(?:made|got)[^.]{0,80}(?:Board|Council|City)[^.]{0,80}(?:recommend|approve|fund|appropriate)/i,
    /Jamie[^.]{0,120}(?:responsible for|resulted in|led to)[^.]{0,120}(?:Board|Council|recommendation|appropriation)/i,
    /(?:Board|Council)[^.]{0,120}(?:because of|due to|as a result of)[^.]{0,80}Jamie/i,
    /City funded (?:construction|project completion)/i
  ];
  const kcTownHallMdxForbiddenPatterns = [
    /\$490,?539/i,
    ...kcTownHallForbiddenPatterns
  ];
  const kcTownHallEvidenceClosed = Boolean(
    kcTownHallClaim?.evidence.length === kcTownHall.sourceIds.length &&
      sameOrderedValues(kcTownHallClaim.evidence.map((evidence) => evidence.sourceId), kcTownHall.sourceIds) &&
      kcTownHallClaim.evidence.every((evidence) =>
        evidence.supports.length > 0 && evidence.supports.every((support) =>
          sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
        )
      )
  );
  const kcTownHallContributionEvidenceClosed = Boolean(
    kcTownHallContributionClaim?.evidence.length === 1 &&
      kcTownHallContributionClaim.evidence[0].sourceId === kcTownHall.contributionSourceId &&
      kcTownHallContributionClaim.evidence[0].supports.length > 0 &&
      kcTownHallContributionClaim.evidence[0].supports.every((support) =>
        kcTownHallContributionSource?.supportsGenerally.includes(support)
      )
  );
  const kcTownHallComplete = Boolean(
    kcTownHallIntake?.kind === "public-artifact" &&
      kcTownHallIntake.visibility === "public-safe" &&
      kcTownHallIntake.disposition === "integrated" &&
      sameOrderedValues(kcTownHallIntake.sourceIds, kcTownHall.sourceIds) &&
      sameOrderedValues(kcTownHallIntake.observationIds, kcTownHall.observationIds) &&
      kcTownHallIntake.researchInquiryIds.includes(kcTownHall.inquiryId) &&
      kcTownHallIntake.boundaries.length >= 3 &&
      kcTownHallContributionIntake?.kind === "public-artifact" &&
      kcTownHallContributionIntake.visibility === "public-safe" &&
      kcTownHallContributionIntake.disposition === "integrated" &&
      sameOrderedValues(kcTownHallContributionIntake.sourceIds, [kcTownHall.contributionSourceId]) &&
      sameOrderedValues(kcTownHallContributionIntake.observationIds, [kcTownHall.contributionObservationId]) &&
      kcTownHallContributionIntake.boundaries.length >= 3 &&
      kcTownHallTransitionIntake?.kind === "memory-lead" &&
      kcTownHallTransitionIntake.visibility === "public-safe" &&
      kcTownHallTransitionIntake.disposition === "researching" &&
      sameOrderedValues(kcTownHallTransitionIntake.sourceIds, []) &&
      sameOrderedValues(kcTownHallTransitionIntake.observationIds, [kcTownHall.transitionObservationId]) &&
      sameOrderedValues(kcTownHallTransitionIntake.researchInquiryIds, [kcTownHall.transitionInquiryId]) &&
      kcTownHallTransitionIntake.boundaries.length >= 3 &&
      kcTownHallSources.every((source) =>
        source?.kind === "government-record" &&
          source.visibility === "public" &&
          source.supportsGenerally.length > 0 &&
          source.doesNotEstablish.length >= 3
      ) &&
      kcTownHallContributionSource?.kind === "project-archive" &&
      kcTownHallContributionSource.visibility === "public" &&
      kcTownHallContributionSource.supportsGenerally.length >= 2 &&
      kcTownHallContributionSource.doesNotEstablish.length >= 4 &&
      kcTownHallObservations.every((observation) =>
        observation?.kind === "source-fact" &&
          observation.status === "verified" &&
          observation.publicSafe === true &&
          observation.sourceId === expectedKcTownHallObservationSources.get(observation.id) &&
          observation.locator &&
          observation.limitations.length >= 2 &&
          observation.claimIds.includes(kcTownHall.claimId) &&
          observation.researchInquiryIds.includes(kcTownHall.inquiryId)
      ) &&
      kcTownHallContributionObservation?.kind === "source-fact" &&
      kcTownHallContributionObservation.status === "verified" &&
      kcTownHallContributionObservation.publicSafe === true &&
      kcTownHallContributionObservation.sourceId === kcTownHall.contributionSourceId &&
      kcTownHallContributionObservation.locator &&
      kcTownHallContributionObservation.limitations.length >= 2 &&
      kcTownHallContributionObservation.claimIds.includes(kcTownHall.contributionClaimId) &&
      kcTownHallTransitionObservation?.kind === "participant-memory" &&
      kcTownHallTransitionObservation.status === "captured" &&
      kcTownHallTransitionObservation.publicSafe === true &&
      !kcTownHallTransitionObservation.sourceId &&
      kcTownHallTransitionObservation.locator &&
      kcTownHallTransitionObservation.limitations.length >= 3 &&
      sameOrderedValues(kcTownHallTransitionObservation.claimIds, []) &&
      sameOrderedValues(kcTownHallTransitionObservation.researchInquiryIds, [kcTownHall.transitionInquiryId]) &&
      kcTownHallClaim?.status === "confirmed-with-boundary" &&
      kcTownHallClaim.boundaries.length >= 3 &&
      kcTownHallClaim.antiClaims.length >= 6 &&
      kcTownHallClaim.researchInquiryIds.includes(kcTownHall.inquiryId) &&
      kcTownHallCaseStudyProjection?.status === "active" &&
      kcTownHallCaseStudyProjection.citationRequired === true &&
      sameOrderedValues(kcTownHallCaseStudyProjection.surfaces, ["/work/kc-town-hall"]) &&
      kcTownHallClaim.projections.some((projection) =>
        projection.key === "archive-note" &&
          projection.status === "active" &&
          projection.citationRequired === true &&
          sameOrderedValues(projection.surfaces, ["docs/knowledge-bank/projects/kc-town-hall"])
      ) &&
      kcTownHallEvidenceClosed &&
      kcTownHallContributionClaim?.status === "confirmed-with-boundary" &&
      kcTownHallContributionClaim.boundaries.length >= 3 &&
      kcTownHallContributionClaim.antiClaims.length >= 4 &&
      kcTownHallContributionClaim.projections.some((projection) =>
        projection.key === "case-study" &&
          projection.status === "active" &&
          projection.citationRequired === true &&
          sameOrderedValues(projection.surfaces, ["/work/kc-town-hall"])
      ) &&
      kcTownHallContributionEvidenceClosed &&
      kcTownHallInquiry?.resultStatus === "recovered" &&
      sameOrderedValues(kcTownHallInquiry.sourceIds, kcTownHall.sourceIds) &&
      kcTownHallInquiry.findings.length >= 4 &&
      kcTownHallInquiry.limitations.length >= 3 &&
      kcTownHallTransitionInquiry?.resultStatus === "inconclusive" &&
      sameOrderedValues(kcTownHallTransitionInquiry.sourceIds, []) &&
      kcTownHallTransitionInquiry.findings.length >= 1 &&
      kcTownHallTransitionInquiry.limitations.length >= 3 &&
      kcTownHallProofCoverage?.status === "partially-source-backed" &&
      sameOrderedValues(kcTownHallProofCoverage.sourceIds, kcTownHallProofCoverageSourceIds) &&
      sameOrderedValues(kcTownHallProofCoverage.researchInquiryIds, kcTownHallProofCoverageInquiryIds) &&
      /Resolution 190649/.test(kcTownHallProof?.sourceBasis ?? "") &&
      /Ordinance 190642/.test(kcTownHallProof?.sourceBasis ?? "") &&
      /May 17, 2022/.test(kcTownHallProof?.sourceBasis ?? "") &&
      /Ordinance 240317/.test(kcTownHallProof?.sourceBasis ?? "") &&
      /approved resume/i.test(kcTownHallProof?.sourceBasis ?? "") &&
      /municipal records[^.]*do not establish Jamie/i.test(kcTownHallProof?.sourceBasis ?? "") &&
      sameOrderedValues(kcTownHallPage?.sourceOrder, kcTownHallPageSourceIds) &&
      kcTownHallPage?.occurrences.length === 3 &&
      kcTownHallPage.occurrences.some((occurrence) =>
        occurrence.id === "council-appropriation-lifecycle" &&
          occurrence.claimId === kcTownHall.claimId &&
          occurrence.projection === "case-study" &&
          sameOrderedValues(occurrence.sourceIds, kcTownHall.sourceIds)
      ) &&
      kcTownHallPage.occurrences.some((occurrence) =>
        occurrence.id === "jamie-planning-contribution" &&
          occurrence.claimId === kcTownHall.contributionClaimId &&
          occurrence.projection === "case-study" &&
          sameOrderedValues(occurrence.sourceIds, [kcTownHall.contributionSourceId])
      ) &&
      kcTownHallPage.occurrences.some((occurrence) =>
        occurrence.id === "public-service-interface" &&
          occurrence.claimId === "CLM-KCTH-SOCIAL-SERVICE-REPORTING" &&
          occurrence.projection === "case-study" &&
          sameOrderedValues(occurrence.sourceIds, kcTownHallSocialSourceIds)
      ) &&
      kcTownHallRelations.length === expectedKcTownHallRelations.size &&
      kcTownHallRelations.every((relation) => {
        const expected = relation && expectedKcTownHallRelations.get(relation.id);
        return Boolean(expected &&
          sameOrderedValues(relation.actorIds, [expected.actorId]) &&
          relation.action === expected.action &&
          relation.objectId === expected.objectId &&
          relation.creditScope === expected.creditScope &&
          relation.status === "confirmed-with-boundary" &&
          relation.claimIds.includes(
            relation.id === "REL-JAMIE-COLED-KC-TOWN-HALL-PLANNING"
              ? kcTownHall.contributionClaimId
              : kcTownHall.claimId
          ) &&
          relation.sourceSupportKeys.length > 0 &&
          relation.sourceSupportKeys.every((supportKey) => relation.sourceIds.some(
            (sourceId) => sourceById.get(sourceId)?.supportsGenerally.includes(supportKey)
          )) &&
          relation.boundaries.length > 0);
      }) &&
      kcTownHallMdx.includes(`claimId="${kcTownHall.claimId}"`) &&
      kcTownHallMdx.includes('occurrenceId="council-appropriation-lifecycle"') &&
      kcTownHallMdx.includes(`claimId="${kcTownHall.contributionClaimId}"`) &&
      kcTownHallMdx.includes('occurrenceId="jamie-planning-contribution"') &&
      kcTownHallMdxSha256 === kcTownHall.approvedMdxSha256 &&
      kcTownHallContentSha256 === kcTownHall.approvedContentSha256 &&
      hasKcTownHallLifecycle(kcTownHallCaseStudyProjection.text) &&
      hasKcTownHallNegotiationBoundary(kcTownHallCaseStudyProjection.text) &&
      hasKcTownHallLifecycle(kcTownHallProof?.publicWording) &&
      hasKcTownHallNegotiationBoundary(kcTownHallProof?.publicWording) &&
      hasKcTownHallLifecycle(kcTownHallProof?.detailedPublicWording) &&
      hasKcTownHallNegotiationBoundary(kcTownHallProof?.detailedPublicWording) &&
      hasKcTownHallLifecycle(kcTownHallWorkSummary) &&
      hasKcTownHallNegotiationBoundary(kcTownHallWorkSummary) &&
      hasKcTownHallOutcomeBoundary(kcTownHallProof?.shortWording) &&
      kcTownHallForbiddenPatterns.every((pattern) => !pattern.test(kcTownHallPublicText)) &&
      kcTownHallMdxForbiddenPatterns.every((pattern) => !pattern.test(kcTownHallMdxProse))
  );

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
  const institutional = suite.pilot.institutionalCapacity;
  const institutionalIntake = intakeById.get(institutional.intakeId);
  const institutionalClaim = claimById.get(institutional.claimId);
  const institutionalInquiry = inquiryById.get(institutional.inquiryId);
  const institutionalSource = sourceById.get(institutional.correctedSourceId);
  const institutionalCorrection = correctionById.get(institutional.correctionId);
  const institutionalObservations = institutional.observationIds.map((id) => observationById.get(id));
  const institutionalRelations = institutional.relationIds.map((id) => relationById.get(id));
  const institutionalAffirmativeText = [
    institutionalClaim?.internalClaim,
    ...(institutionalClaim?.projections.map((projection) => projection.text) ?? []),
    ...(institutionalClaim?.evidence.flatMap((evidence) => evidence.supports) ?? []),
    ...institutionalObservations.map((observation) => observation?.text),
    ...institutionalRelations.flatMap((relation) => [relation?.purpose, relation?.result]),
    ...(institutionalInquiry?.findings ?? []),
    institutionalInquiry?.publicSummary
  ].filter(Boolean).join("\n");
  const institutionalPublicText = [
    fairRentMdx,
    ...knowledgeBank.claims.flatMap((claim) =>
      claim.projections.filter((projection) => projection.status === "active").map((projection) => projection.text)
    )
  ].join("\n");
  const institutionalRelevantProjects = new Set([
    "nyc-artist-coalition",
    "createnyc",
    "cabaret-law",
    "office-of-nightlife",
    "talks-not-raids"
  ]);
  const institutionalRelevantClaimText = knowledgeBank.claims
    .filter((claim) => institutionalRelevantProjects.has(claim.project))
    .flatMap((claim) => [claim.internalClaim, ...claim.projections.map((projection) => projection.text)])
    .join("\n");
  const agencyAffirmativeText = knowledgeBank.agencyRelations
    .flatMap((relation) => [relation.purpose, relation.result])
    .join("\n");
  const institutionalRelatedClaimsSha256 = createHash("sha256").update(JSON.stringify(
    knowledgeBank.claims
      .filter((claim) => institutionalRelevantProjects.has(claim.project))
      .map((claim) => ({
        id: claim.id,
        project: claim.project,
        internalClaim: claim.internalClaim,
        status: claim.status,
        projections: claim.projections.map(({ key, text, status, surfaces }) => ({ key, text, status, surfaces })),
        boundaries: claim.boundaries,
        antiClaims: claim.antiClaims
      }))
  )).digest("hex");
  const institutionalRelatedClaimsApproved =
    institutionalRelatedClaimsSha256 === institutional.approvedRelatedClaimsSha256;
  const institutionalContentSha256 = createHash("sha256").update(JSON.stringify({
    claim: institutionalClaim && {
      internalClaim: institutionalClaim.internalClaim,
      projections: institutionalClaim.projections.map(({ key, text, status, surfaces }) => ({ key, text, status, surfaces })),
      evidence: institutionalClaim.evidence.map(({ sourceId, relationship, supports, locator }) => ({ sourceId, relationship, supports, locator }))
    },
    observations: institutionalObservations.map((observation) => observation && ({
      id: observation.id,
      text: observation.text,
      limitations: observation.limitations
    })),
    relations: institutionalRelations.map((relation) => relation && ({
      id: relation.id,
      actorIds: relation.actorIds,
      action: relation.action,
      objectId: relation.objectId,
      purpose: relation.purpose,
      result: relation.result,
      creditScope: relation.creditScope,
      sourceIds: relation.sourceIds,
      sourceSupportKeys: relation.sourceSupportKeys,
      boundaries: relation.boundaries
    })),
    inquiry: institutionalInquiry && {
      findings: institutionalInquiry.findings,
      limitations: institutionalInquiry.limitations,
      publicSummary: institutionalInquiry.publicSummary
    }
  })).digest("hex");
  const institutionalContentApproved = institutionalContentSha256 === institutional.approvedContentSha256;
  const institutionalOverclaimPatterns = [
    /\b(?:depend(?:ed|ent|ence|ency|s|ing)?|indispensable|essential|necessary|vital|only validation|no alternative|could not act|unable to act|relied(?: entirely)? on|required (?:NYC Artist Coalition|the coalition))\b/i,
    /\b(?:Finkelpearl|(?:Rafael )?Espinal|DCLA|(?:the )?(?:New York )?City Council)\b[^.]{0,120}\b(?:needed|wanted|required|relied(?: entirely)? on|depended(?: entirely)? on|could not act without|political cover)\b/i,
    /\bprivate motive (?:is|was) known\b/i,
    /\b(?:Jamie|NYC Artist Coalition|Finkelpearl|(?:Rafael )?Espinal)\b[^.]{0,100}\b(?:authored|wrote|drafted|enacted|passed|created|secured|delivered)\b[^.]{0,80}\b(?:law|local law|repeal|office|reform)\b/i,
    /\b(?:Jamie|NYC Artist Coalition)\b[^.]{0,100}\b(?:caused|made possible)\b[^.]{0,80}\b(?:law|repeal|office|reform)\b/i,
    /\b(?:NYC Artist Coalition|the coalition)\b[^.]{0,100}\b(?:was |were )?(?:indispensable|essential|necessary)\b[^.]{0,80}\b(?:Council|DCLA|Finkelpearl|Espinal)\b/i,
    /\b(?:Finkelpearl|(?:Rafael )?Espinal|DCLA|(?:the )?(?:New York )?City Council)\b[^.]{0,120}\b(?:indispensable|essential|necessary|only because|unstated reason|decisive evidence)\b/i,
    /\b(?:enabled\b[^.]{0,100}\benact|decisive reason|(?:would have been|was) unable\b[^.]{0,100}\bwithout|privately sought\b[^.]{0,100}\bvalidation|guaranteed passage|owed the success of)\b/i,
    /\b(?:only because|unstated reason|decisive evidence|resulted from|verbatim)\b/i,
    /\bin response to\b[^.]{0,120}\b(?:NYC Artist Coalition|coalition) testimony\b/i,
    /\b(?:furnished|supplied|gave)\b[^.]{0,120}\b(?:Council|repeal|enacted policy)\b[^.]{0,80}\b(?:rationale|basis|policy)\b/i,
    /\b(?:Finkelpearl|DCLA)\b[^.]{0,100}\bused\b[^.]{0,100}\b(?:rescue|legitimacy)\b/i,
    /\b(?:Council|Espinal)\b[^.]{0,100}\b(?:followed|adopted)\b[^.]{0,80}\b(?:coalition|NYC Artist Coalition)\b[^.]{0,40}\b(?:blueprint|agenda)\b/i,
    /\b(?:NYC Artist Coalition|coalition) testimony\b[^.]{0,80}\bmoved\b[^.]{0,40}\bEspinal\b/i,
    /\bpolicy alignment proves\b/i
  ];
  const institutionalOverclaimFree = institutionalOverclaimPatterns.every(
    (pattern) => !pattern.test(institutionalAffirmativeText) &&
      !pattern.test(institutionalRelevantClaimText) &&
      !pattern.test(institutionalPublicText) &&
      !pattern.test(agencyAffirmativeText)
  );
  const staleCabaretHearingDateFree = !(
    /\bJune 19, 2017\b[^.]{0,100}\b(?:Council|Cabaret|hearing)\b/i.test(institutionalRelevantClaimText) ||
    /\b(?:Council|Cabaret|hearing)\b[^.]{0,100}\bJune 19, 2017\b/i.test(institutionalRelevantClaimText)
  );
  const institutionalEvidenceClosed = Boolean(
    institutionalClaim?.evidence.length === institutionalIntake?.sourceIds.length &&
    institutionalClaim.evidence.every((evidence) =>
      evidence.supports.length && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const cabaretAlignment = observationById.get("OBS-NYCAC-CABARET-POLICY-ALIGNMENT");
  const officeAlignment = observationById.get("OBS-NYCAC-OFFICE-POLICY-ALIGNMENT");
  const hearingEvidence = institutionalClaim?.evidence.find(
    (evidence) => evidence.sourceId === institutional.correctedSourceId
  );
  const expectedInstitutionalRelations = new Map([
    ["REL-DCLA-CONVENED-DIY-MEETING", { actorId: "ENT-NYC-DCLA", action: "convened", objectId: "ENT-DCLA-DIY-MEETING-2017", creditScope: "institutional" }],
    ["REL-FINKELPEARL-CITED-NYCAC-PUBLIC-PROCESS-OUTCOME", { actorId: "ENT-TOM-FINKELPEARL", action: "cited-as-public-process-outcome", objectId: "ENT-NYC-ARTIST-COALITION", creditScope: "individual" }],
    ["REL-ESPINAL-CHAIRED-CABARET-REFORM-HEARING", { actorId: "ENT-RAFAEL-ESPINAL", action: "chaired-hearing-for", objectId: "ENT-CABARET-REFORM-HEARING-2017", creditScope: "individual" }],
    ["REL-COUNCIL-CONVENED-CABARET-REFORM-HEARING", { actorId: "ENT-NYC-COUNCIL", action: "convened", objectId: "ENT-CABARET-REFORM-HEARING-2017", creditScope: "institutional" }]
  ]);
  const institutionalCapacityComplete = Boolean(
    institutionalIntake?.kind === "analysis-note" &&
      institutionalIntake.disposition === "integrated" &&
      institutionalIntake.visibility === "public-safe" &&
      institutionalIntake.sourceIds.length >= 7 &&
      institutionalIntake.boundaries.some((boundary) => /private motive/i.test(boundary)) &&
      institutionalIntake.boundaries.some((boundary) => /dependency|sole causation/i.test(boundary)) &&
      institutionalObservations.every(
        (observation) => observation?.kind === "bounded-inference" &&
          (observation.comparisonSourceIds.length
            ? observation.status === "corroborated"
            : observation.status === "extracted") &&
          observation.locator &&
          observation.limitations.length &&
          observation.claimIds.includes(institutional.claimId) &&
          observation.researchInquiryIds.includes(institutional.inquiryId) &&
          observation.comparisonSourceIds.every((sourceId) => institutionalIntake.sourceIds.includes(sourceId))
      ) &&
      cabaretAlignment?.comparisonSourceIds.includes(institutional.correctedSourceId) &&
      officeAlignment?.comparisonSourceIds.includes("SRC-NYCAC-CREATENYC-SUBMISSION-2017-03-17") &&
      officeAlignment.comparisonSourceIds.includes("SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12") &&
      institutionalClaim?.status === "inference" &&
      institutionalClaim.projections.length > 0 &&
      institutionalClaim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      institutionalClaim.evidence.some(
        (evidence) => evidence.sourceId === "SRC-NYCAC-DCLA-BUDGET-HEARING-2017-05-19"
      ) &&
      institutionalClaim.evidence.some(
        (evidence) => evidence.sourceId === institutional.correctedSourceId
      ) &&
      hearingEvidence?.supports.some((supported) => /request for stakeholder testimony/i.test(supported)) &&
      !hearingEvidence?.supports.some((supported) => /stated need/i.test(supported)) &&
      institutionalClaim.boundaries.some((boundary) => /private|privately/i.test(boundary)) &&
      institutionalClaim.boundaries.some((boundary) => /caus|agency|enactment/i.test(boundary)) &&
      institutionalClaim.antiClaims.some((antiClaim) => /depended|could not act/i.test(antiClaim)) &&
      institutionalClaim.antiClaims.some((antiClaim) => /private motive/i.test(antiClaim)) &&
      institutionalClaim.antiClaims.some((antiClaim) => /authored or enacted|caused/i.test(antiClaim)) &&
      institutionalInquiry?.resultStatus === "partially-recovered" &&
      institutionalInquiry.sourceIds.length >= 7 &&
      institutionalInquiry.limitations.some((limitation) => /private communications|personal motive/i.test(limitation)) &&
      institutionalInquiry.limitations.some((limitation) => /causal|causation/i.test(limitation)) &&
      institutionalSource?.publishedAt === "2017-09-14" &&
      /September 14, 2017/.test(institutionalSource.publicCitation) &&
      institutionalSource.doesNotEstablish.some((boundary) => /private motive/i.test(boundary)) &&
      sourceById.get("SRC-NYCAC-DCLA-BUDGET-HEARING-2017-05-19")?.doesNotEstablish.some(
        (boundary) => /private motive/i.test(boundary)
      ) &&
      sourceById.get("SRC-NYCAC-DCLA-BUDGET-HEARING-2017-05-19")?.doesNotEstablish.some(
        (boundary) => /dependency/i.test(boundary)
      ) &&
      institutionalCorrection?.status === "active" &&
      institutionalCorrection.claimId === "CLM-NYCAC-CABARET-TESTIMONY-2017" &&
      institutionalCorrection.previousText === "June 19, 2017" &&
      institutionalCorrection.replacementText === "September 14, 2017" &&
      /official transcript title page/i.test(institutionalCorrection.reason) &&
      /September 14, 2017/.test(institutionalCorrection.reason) &&
      ["/work/fair-rent-nyc", "knowledge-bank", "public-citation-registry"].every(
        (surface) => institutionalCorrection.affectedSurfaces.includes(surface)
      ) &&
      institutionalCorrection.affectedSurfaces.length === 3 &&
      institutionalContentApproved &&
      institutionalRelatedClaimsApproved &&
      institutionalOverclaimFree &&
      staleCabaretHearingDateFree &&
      institutionalEvidenceClosed &&
      institutionalRelations.length === expectedInstitutionalRelations.size &&
      institutionalRelations.every(
        (relation) => {
          const expected = relation && expectedInstitutionalRelations.get(relation.id);
          return Boolean(expected && relation.actorIds.length === 1 &&
          relation.actorIds[0] === expected.actorId &&
          relation.action === expected.action &&
          relation.objectId === expected.objectId &&
          relation.creditScope === expected.creditScope &&
          relation.status === "confirmed-with-boundary" &&
          relation.claimIds.includes(institutional.claimId) &&
          relation.boundaries.length &&
          relation.sourceSupportKeys.length &&
          relation.sourceSupportKeys.every((supportKey) => relation.sourceIds.some(
            (sourceId) => sourceById.get(sourceId)?.supportsGenerally.includes(supportKey)
          )));
        }
      ) &&
      institutionalRelations.some((relation) => relation?.creditScope === "individual") &&
      institutionalRelations.some((relation) => relation?.creditScope === "institutional")
  );
  const pressArchive = suite.pilot.pressArchive;
  const pressIntakes = pressArchive.intakeIds.map((id) => intakeById.get(id));
  const pressIndexSources = pressArchive.indexSourceIds.map((id) => sourceById.get(id));
  const pressClaim = claimById.get(pressArchive.claimId);
  const pressInquiry = inquiryById.get(pressArchive.inquiryId);
  const pressEntries = campaignPressInventory.flatMap((campaign) => campaign.entries);
  const uniquePressArticleSourceIds = [...new Set(pressEntries.map((entry) => entry.sourceId))];
  const pressArticleSources = uniquePressArticleSourceIds.map((id) => sourceById.get(id));
  const pressObservations = nycacPressArchive.observations;
  const placementObservationIds = new Set(
    pressEntries.map((entry) => `OBS-NYCAC-PRESS-${entry.id}`)
  );
  const pressPlacementObservations = pressObservations.filter((observation) =>
    placementObservationIds.has(observation.id)
  );
  const pressReadingObservations = pressObservations.filter((observation) =>
    observation.id.startsWith("OBS-NYCAC-PRESS-READING-")
  );
  const pressAttributionObservations = pressObservations.filter((observation) =>
    observation.id.startsWith("OBS-NYCAC-PRESS-ATTRIBUTION-")
  );
  const pressObservationIds = new Set(pressObservations.map((observation) => observation.id));
  const referencedPressObservationIds = new Set(
    pressIntakes.flatMap((intake) => intake?.observationIds ?? [])
  );
  const pressReadingSourceIds = new Set(nycacPressReadings.map((reading) => reading.sourceId));
  const pressWaybackRouteSourceIds = new Set(
    pressEntries.filter((entry) => entry.archiveUrl?.includes("web.archive.org/web/")).map((entry) => entry.sourceId)
  );
  const partialReadings = nycacPressReadings.filter((reading) => reading.reviewExtent === "headline-and-deck");
  const cityLabReading = nycacPressReadings.find(
    (reading) => reading.sourceId === pressArchive.redirectTrapSourceId
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
      nycacPressReadings.length === pressArchive.expectedReadingCount &&
      pressReadingSourceIds.size === pressArchive.expectedUniqueArticleCount &&
      uniquePressArticleSourceIds.every((sourceId) => pressReadingSourceIds.has(sourceId)) &&
      nycacPressReadings.filter((reading) => reading.reviewExtent === "recovered-body").length === pressArchive.expectedRecoveredBodyCount &&
      partialReadings.length === pressArchive.expectedPartialReadingCount &&
      partialReadings[0]?.sourceId === pressArchive.partialSourceId &&
      nycacPressReadings.filter((reading) => reading.recoveryMode === "publisher-body").length === pressArchive.expectedPublisherReadingCount &&
      nycacPressReadings.filter((reading) => reading.recoveryMode === "wayback-body").length === pressArchive.expectedWaybackReadingCount &&
      pressWaybackRouteSourceIds.size === pressArchive.expectedWaybackRouteCount &&
      uniquePressArticleSourceIds.every((sourceId) => pressWaybackRouteSourceIds.has(sourceId)) &&
      pressArticleSources.every((source) =>
        source?.archiveUrl?.includes("web.archive.org/web/") &&
        source.preservationStatus !== "live"
      ) &&
      nycacPressReadings.filter((reading) => reading.mentionsJamie).length === pressArchive.expectedJamieNamedCount &&
      nycacPressReadings.filter((reading) => reading.mentionsCoalition).length === pressArchive.expectedCoalitionNamedCount &&
      nycacPressReadings.reduce((total, reading) => total + reading.directAttributions.length, 0) === pressArchive.expectedDirectAttributionCount &&
      nycacPressReadings.every((reading) =>
        /^[a-f0-9]{64}$/.test(reading.contentSha256) &&
        reading.reviewedCharacterCount >= 2000 &&
        reading.summary.length >= 40 &&
        reading.locator.length >= 20 &&
        reading.supportsGenerally.length >= 1 &&
        reading.doesNotEstablish.length >= 2 &&
        reading.reviewedAt === "2026-07-14"
      ) &&
      cityLabReading?.recoveryMode === "wayback-body" &&
      cityLabReading.retrievalUrl.includes("web.archive.org/web/") &&
      !cityLabReading.retrievalUrl.endsWith("/citylab") &&
      Object.entries(pressArchive.campaignEntryCounts).every(
        ([campaignId, expected]) => pressCounts[campaignId] === expected
      ) &&
      duplicateAppearanceCount === 2 &&
      pressIntakes.length === pressArchive.expectedIndexCount &&
      pressIntakes.every(
        (intake) => intake?.disposition === "integrated" && intake.sourceIds.length > 1 && intake.boundaries.length >= 3 && intake.observationIds.length
      ) &&
      referencedPressObservationIds.size === pressObservationIds.size &&
      [...pressObservationIds].every((observationId) => referencedPressObservationIds.has(observationId)) &&
      pressIndexSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
      pressArticleSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
      pressPlacementObservations.length === pressArchive.expectedAppearanceCount &&
      pressPlacementObservations.every(
        (observation) => observation?.locator && observation.limitations.length && observation.claimIds.includes(pressArchive.claimId) && observation.researchInquiryIds.includes(pressArchive.inquiryId)
      ) &&
      pressReadingObservations.length === pressArchive.expectedReadingCount &&
      pressReadingObservations.every(
        (observation) => observation?.sourceId && pressReadingSourceIds.has(observation.sourceId) && observation.locator && observation.limitations.length >= 2 && observation.researchInquiryIds.includes(pressArchive.inquiryId)
      ) &&
      pressAttributionObservations.length === pressArchive.expectedDirectAttributionCount &&
      pressAttributionObservations.every(
        (observation) => observation?.sourceId && pressReadingSourceIds.has(observation.sourceId) && observation.locator && observation.limitations.length >= 2 && observation.researchInquiryIds.includes(pressArchive.inquiryId)
      ) &&
      pressClaim?.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      pressClaim.evidence.length === pressArchive.expectedIndexCount &&
      pressInquiry?.sourceIds.length === pressArchive.expectedIndexCount + pressArchive.expectedUniqueArticleCount &&
      pressInquiry.resultStatus === "partially-recovered" &&
      pressInquiry.limitations.length >= 6
  );
  const archive = suite.pilot.archiveProduction;
  const archiveIntakes = archive.intakeIds.map((id) => intakeById.get(id));
  const archiveObservations = archive.observationIds.map((id) => observationById.get(id));
  const archiveSources = archive.sourceIds.map((id) => sourceById.get(id));
  const archivePublicSources = archive.publicSourceIds.map((id) => sourceById.get(id));
  const archivePrivateSources = archive.privateSourceIds.map((id) => sourceById.get(id));
  const archiveClaims = archive.claimIds.map((id) => claimById.get(id));
  const archiveHeldClaims = archive.heldClaimIds.map((id) => claimById.get(id));
  const archiveActiveClaims = archive.activeClaimIds.map((id) => claimById.get(id));
  const archiveInquiries = archive.inquiryIds.map((id) => inquiryById.get(id));
  const archiveFairRentPage = knowledgeBank.pages.find((page) => page.id === archive.fairRentPageId);
  const archiveLabPage = knowledgeBank.pages.find((page) => page.id === archive.labPageId);
  const archiveLabSource = readFileSync(
    path.join(repoRoot, "apps/www/src/app/lab/source-backed-team-memory/page.tsx"),
    "utf8"
  );
  const archiveProjectNote = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/projects/archive-production-2026-07-14.md"),
    "utf8"
  );
  const archiveProofIds = [
    "fair-rent-campaign-memory",
    "fair-rent-source-map",
    "source-backed-team-memory-method",
    "ai-evals-professional-development"
  ];
  const archiveProofCoverage = archiveProofIds.map((proofId) =>
    knowledgeBank.proofCoverageTargets.find((target) => target.proofId === proofId)
  );
  const archiveContentSha256 = createHash("sha256").update(JSON.stringify({
    intakes: archiveIntakes,
    observations: archiveObservations,
    sources: archiveSources,
    claims: archiveClaims,
    inquiries: archiveInquiries,
    fairRentPage: archiveFairRentPage,
    labPage: archiveLabPage,
    proofCoverage: archiveProofCoverage,
    fairRentMdx,
    labSource: archiveLabSource,
    projectNote: archiveProjectNote
  })).digest("hex");
  const archivePublicUrlsAreHttps = archivePublicSources.every((source) => {
    const url = source?.canonicalUrl ?? source?.archiveUrl ?? source?.assetUrl;
    return Boolean(url && /^https:\/\//.test(url));
  });
  const archiveEvidenceClosed = archiveClaims.every((claim) =>
    claim?.evidence.length && claim.evidence.every((evidence) =>
      evidence.supports.length && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const archivePrivateIds = new Set([
    ...archive.privateSourceIds,
    ...archivePrivateSources.map((source) => source?.protectedLocatorId).filter(Boolean)
  ]);
  const archivePublicBundleSafe = [...archivePrivateIds].every(
    (privateId) => !publicRegistryText.includes(privateId)
  ) && ![
    "/Users/",
    "Mobile Documents",
    "CloudDocs",
    "Jonathan Marmor",
    "$2,500"
  ].some((privateText) => publicRegistryText.includes(privateText));
  const archiveProofCoverageComplete = Boolean(
    archiveProofCoverage.every(Boolean) &&
      archiveProofCoverage[0].status === "protected-support" &&
      sameOrderedValues(archiveProofCoverage[0].sourceIds, [
        "SRC-CRS-RUNNING-MEMORY-2026",
        "SRC-JAMIE-APPROVED-RESUME-2026-06-11"
      ]) &&
      archiveProofCoverage[0].researchInquiryIds.includes(archive.crsInquiryId) &&
      archiveProofCoverage[1].status === "protected-support" &&
      archiveProofCoverage[1].sourceIds.includes("SRC-CRS-PROVENANCE-REDLINE-2026") &&
      archiveProofCoverage[1].sourceIds.includes("SRC-JAMIE-APPROVED-RESUME-2026-06-11") &&
      archiveProofCoverage[1].researchInquiryIds.includes(archive.crsInquiryId) &&
      archiveProofCoverage[2].status === "protected-support" &&
      sameOrderedValues(archiveProofCoverage[2].sourceIds, ["SRC-SOURCE-BACKED-MEMORY-PROPOSAL-2026"]) &&
      archiveProofCoverage[2].researchInquiryIds.includes(archive.methodInquiryId) &&
      archiveProofCoverage[3].status === "source-backed" &&
      sameOrderedValues(archiveProofCoverage[3].sourceIds, [archive.certificateSourceId]) &&
      archiveProofCoverage[3].researchInquiryIds.length === 0
  );
  const sourceBackedMethodClaim = claimById.get("CLM-SOURCE-BACKED-MEMORY-METHOD-2026");
  const sourceBackedMethodText = [
    sourceBackedMethodClaim?.internalClaim,
    ...(sourceBackedMethodClaim?.projections.map((projection) => projection.text) ?? [])
  ].filter(Boolean).join("\n");
  const sourceBackedMethodStatusBounded = !/(?:completed|deployed|launched|adopted)[^.]{0,80}(?:client|production|pilot|product|platform)|market validation/i.test(
    sourceBackedMethodText
  );
  const nterClaim = claimById.get(archive.nterClaimId);
  const nterClaimText = [
    nterClaim?.internalClaim,
    ...(nterClaim?.projections.map((projection) => projection.text) ?? [])
  ].filter(Boolean).join("\n");
  const nterAttributionSafe = ![
    /Jamie(?: Burkart)? (?:alone )?(?:created|built|designed|programmed|developed) NTER CHNG/i,
    /Jamie(?: Burkart)? (?:wrote|built|developed) the (?:NTER CHNG )?software/i,
    /Jamie(?: Burkart)? designed the (?:installation )?architecture/i,
    /NTER CHNG[^.]{0,100}(?:displayed|shown|installed)[^.]{0,60}Nerman/i,
    /Nerman[^.]{0,100}NTER CHNG/i
  ].some((pattern) => pattern.test(nterClaimText));
  const archiveProductionComplete = Boolean(
    archiveIntakes.length === archive.expectedIntakeCount &&
      archiveObservations.length === archive.expectedObservationCount &&
      archiveSources.length === archive.expectedSourceCount &&
      archiveClaims.length === archive.expectedClaimCount &&
      archiveInquiries.length === archive.expectedInquiryCount &&
      archiveIntakes.every((intake) =>
        intake?.boundaries.length >= 2 &&
          intake.sourceIds.length &&
          intake.observationIds.length &&
          ["integrated", "protected", "researching"].includes(intake.disposition)
      ) &&
      archiveSources.every((source) =>
        source?.supportsGenerally.length && source.doesNotEstablish.length >= 2
      ) &&
      archivePublicUrlsAreHttps &&
      archivePrivateSources.every((source) =>
        ["private", "protected"].includes(source?.visibility) &&
          source.preservationStatus === "private" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
      ) &&
      archiveObservations.every((observation) =>
        observation?.locator &&
          observation.limitations.length >= 2 &&
          (observation.claimIds.length || observation.researchInquiryIds.length)
      ) &&
      archiveEvidenceClosed &&
      archiveClaims.every((claim) =>
        claim?.boundaries.length >= 3 &&
          claim.antiClaims.length >= 3 &&
          claim.reviewedBy.length &&
          claim.reviewedAt === archive.reviewedAt
      ) &&
      archiveHeldClaims.every((claim) =>
        claim?.projections.length && claim.projections.every((projection) =>
          projection.status === "hold" && projection.surfaces.length === 0
        )
      ) &&
      archiveActiveClaims.every((claim) =>
        claim?.projections.some((projection) =>
          projection.status === "active" && projection.surfaces.length === 1
        )
      ) &&
      archiveActiveClaims
        .filter((claim) => claim?.id !== archive.certificateClaimId)
        .every((claim) => claim?.evidence.every((evidence) => evidence.renderCitation === false)) &&
      claimById.get(archive.certificateClaimId)?.evidence.every((evidence) =>
        evidence.sourceId === archive.certificateSourceId && evidence.renderCitation === true
      ) &&
      archiveInquiries.every((inquiry) =>
        (inquiry?.id === archive.nterInquiryId
          ? inquiry.resultStatus === "recovered"
          : inquiry?.resultStatus === "partially-recovered") &&
          inquiry.findings.length >= 2 &&
          inquiry.limitations.length >= 2 &&
          inquiry.sourceIds.length
      ) &&
      inquiryById.get(archive.nterInquiryId)?.resultStatus === "recovered" &&
      sameOrderedValues(
        inquiryById.get(archive.nterInquiryId)?.sourceIds,
        archive.nterSourceIds
      ) &&
      claimById.get(archive.nterClaimId)?.status === "confirmed-with-boundary" &&
      claimById.get(archive.nterClaimId)?.projections.every((projection) =>
        projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      sameOrderedValues(
        claimById.get(archive.nterClaimId)?.evidence.map((evidence) => evidence.sourceId),
        archive.nterSourceIds
      ) &&
      claimById.get(archive.nterClaimId)?.antiClaims.some((antiClaim) =>
        /alone created|sole authorship/i.test(antiClaim)
      ) &&
      nterAttributionSafe &&
      inquiryById.get(archive.baplabInquiryId)?.limitations.some((limitation) =>
        /title|medium|collaborator/i.test(limitation)
      ) &&
      sameOrderedValues(
        archiveFairRentPage?.occurrences
          .filter((occurrence) => archive.fairRentOccurrenceIds.includes(occurrence.id))
          .map((occurrence) => occurrence.id),
        archive.fairRentOccurrenceIds
      ) &&
      archive.fairRentOccurrenceIds.every((occurrenceId) => {
        const occurrence = archiveFairRentPage?.occurrences.find((item) => item.id === occurrenceId);
        return occurrence && (occurrence.sourceIds ?? []).length === 0;
      }) &&
      sameOrderedValues(
        archiveLabPage?.occurrences.map((occurrence) => occurrence.id),
        archive.labOccurrenceIds
      ) &&
      archiveLabPage?.sourceOrder.length === 1 &&
      archiveLabPage.sourceOrder[0] === archive.certificateSourceId &&
      fairRentMdx.includes('claimId="CLM-CRS-CAMPAIGN-MEMORY-SYSTEM-2026"') &&
      fairRentMdx.includes('claimId="CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"') &&
      archiveLabSource.includes('claimId="CLM-SOURCE-BACKED-MEMORY-METHOD-2026"') &&
      archiveLabSource.includes(`claimId="${archive.certificateClaimId}"`) &&
      archiveLabSource.includes('<References pageId="source-backed-team-memory" />') &&
      archiveProjectNote.includes("Archive production is cumulative; site composition is selective.") &&
      sourceBackedMethodStatusBounded &&
      archiveProofCoverageComplete &&
      archivePublicBundleSafe &&
      archiveContentSha256 === archive.approvedContentSha256
  );
  const googleDrive = suite.pilot.googleDriveProduction;
  const googleDriveIntakes = googleDrive.intakeIds.map((id) => intakeById.get(id));
  const googleDriveObservations = googleDrive.observationIds.map((id) => observationById.get(id));
  const googleDriveSources = googleDrive.sourceIds.map((id) => sourceById.get(id));
  const googleDriveWorkflowSources = googleDrive.workflowSourceIds.map((id) => sourceById.get(id));
  const googleDriveMediaSources = googleDrive.heldMediaSourceIds.map((id) => sourceById.get(id));
  const googleDriveClaims = googleDrive.claimIds.map((id) => claimById.get(id));
  const googleDriveInquiries = googleDrive.inquiryIds.map((id) => inquiryById.get(id));
  const googleDrivePage = knowledgeBank.pages.find((page) => page.id === googleDrive.pageId);
  const googleDriveProofCoverage = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === googleDrive.proofId
  );
  const googleDriveMdx = readFileSync(
    path.join(repoRoot, "apps/www/src/content/work/196-sunday-dinner.mdx"),
    "utf8"
  );
  const googleDriveProjectNote = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/projects/google-drive-production-2026-07-14.md"),
    "utf8"
  );
  const googleDriveContentSha256 = createHash("sha256").update(JSON.stringify({
    intakes: googleDriveIntakes,
    observations: googleDriveObservations,
    sources: googleDriveSources,
    claims: googleDriveClaims,
    inquiries: googleDriveInquiries,
    page: googleDrivePage,
    proofCoverage: googleDriveProofCoverage,
    mdx: googleDriveMdx,
    projectNote: googleDriveProjectNote
  })).digest("hex");
  const googleDriveEvidenceClosed = googleDriveClaims.every((claim) =>
    claim?.evidence.length && claim.evidence.every((evidence) =>
      evidence.supports.length && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const googleDrivePublicSafeText = JSON.stringify({
    intakes: googleDriveIntakes,
    observations: googleDriveObservations,
    sources: googleDriveSources,
    claims: googleDriveClaims,
    inquiries: googleDriveInquiries,
    mdx: googleDriveMdx,
    projectNote: googleDriveProjectNote
  });
  const googleDrivePrivacySafe = ![
    /drive\.google\.com/i,
    /\/Users\//,
    /CloudStorage|CloudDocs|Mobile Documents/,
    /(?:phone|email|instagram)\s*[:=]\s*[^,}\]]+/i,
    /@[a-z0-9._%+-]+\.[a-z]{2,}/i
  ].some((pattern) => pattern.test(googleDrivePublicSafeText));
  const googleDriveMetricAndOutcomeSafe = googleDriveClaims.every((claim) => {
    const text = [claim?.internalClaim, ...(claim?.projections.map((projection) => projection.text) ?? [])].join("\n");
    return !/300\+|20\+|300 or more|20 or more|artist outcome|participant satisfaction|community impact/i.test(text);
  });
  const googleDriveHeldMediaSourceIds = new Set(googleDrive.heldMediaSourceIds);
  const googleDriveVisualAttributionSafe = !knowledgeBank.claims.some((claim) =>
    claim.evidence.some((evidence) => googleDriveHeldMediaSourceIds.has(evidence.sourceId)) &&
      claim.projections.some((projection) => projection.status === "active" || projection.surfaces.length > 0)
  );
  const googleDriveComplete = Boolean(
    googleDriveIntakes.length === googleDrive.expectedIntakeCount &&
      googleDriveObservations.length === googleDrive.expectedObservationCount &&
      googleDriveSources.length === googleDrive.expectedSourceCount &&
      googleDriveClaims.length === googleDrive.expectedClaimCount &&
      googleDriveInquiries.length === googleDrive.expectedInquiryCount &&
      googleDriveIntakes.every((intake) =>
        intake?.visibility === "protected" &&
          ["integrated", "researching"].includes(intake.disposition) &&
          intake.sourceIds.length === 1 &&
          intake.observationIds.length &&
          intake.boundaries.length >= 3
      ) &&
      googleDriveSources.every((source) =>
        source?.preservationStatus === "private" &&
          ["protected", "public-metadata-only"].includes(source.visibility) &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl &&
          source.supportsGenerally.length >= 2 &&
          source.doesNotEstablish.length >= 4
      ) &&
      googleDriveWorkflowSources.every((source) => source?.visibility === "protected") &&
      googleDriveMediaSources.every((source) =>
        source?.kind === "photo-metadata" &&
          source.media?.rightsStatus === "unknown" &&
          source.media.consentStatus === "review-needed" &&
          source.media.publicDisplayStatus === "hold"
      ) &&
      googleDriveObservations.every((observation) =>
        observation?.locator &&
          observation.limitations.length >= 2 &&
          (observation.claimIds.length || observation.researchInquiryIds.length)
      ) &&
      googleDriveEvidenceClosed &&
      googleDriveClaims.every((claim) =>
        claim?.status === "confirmed-with-boundary" &&
          claim.boundaries.length >= 3 &&
          claim.antiClaims.length >= 4 &&
          claim.reviewedAt === googleDrive.reviewedAt &&
          claim.reviewedBy.length >= 2 &&
          claim.projections.length === 1 &&
          claim.projections[0].status === "active" &&
          claim.projections[0].citationRequired === false &&
          sameOrderedValues(claim.projections[0].surfaces, ["/work/196-sunday-dinner"]) &&
          claim.evidence.every((evidence) => evidence.relationship === "private-support" && evidence.renderCitation === false)
      ) &&
      googleDriveInquiries.every((inquiry) =>
        ["partially-recovered", "inconclusive"].includes(inquiry?.resultStatus) &&
          inquiry.findings.length >= 2 &&
          inquiry.limitations.length >= 2 &&
          inquiry.sourceIds.length === 1
      ) &&
      googleDrivePage?.surface === "/work/196-sunday-dinner" &&
      googleDrivePage.sourceOrder.length === 0 &&
      sameOrderedValues(
        googleDrivePage.occurrences.map((occurrence) => occurrence.claimId),
        googleDrive.claimIds
      ) &&
      googleDrivePage.occurrences.every((occurrence) => !occurrence.sourceIds) &&
      googleDrive.claimIds.every((claimId) => googleDriveMdx.includes(`claimId="${claimId}"`)) &&
      !/300\+|20\+/.test(googleDriveMdx) &&
      googleDriveProofCoverage?.status === "protected-support" &&
      googleDrive.workflowSourceIds.every((sourceId) => googleDriveProofCoverage.sourceIds.includes(sourceId)) &&
      googleDrivePrivacySafe &&
      googleDriveMetricAndOutcomeSafe &&
      googleDriveVisualAttributionSafe &&
      googleDriveContentSha256 === googleDrive.approvedContentSha256
  );
  const social = suite.pilot.socialMediaProduction;
  const socialIntakes = socialMediaProductionJuly2026.intakeItems.map((item) => intakeById.get(item.id));
  const socialObservations = socialMediaProductionJuly2026.observations.map((item) => observationById.get(item.id));
  const socialSources = socialMediaProductionJuly2026.sources.map((item) => sourceById.get(item.id));
  const socialClaims = socialMediaProductionJuly2026.claims.map((item) => claimById.get(item.id));
  const socialInquiries = socialMediaProductionJuly2026.researchInquiries.map((item) => inquiryById.get(item.id));
  const socialActiveClaims = social.activeClaimIds.map((id) => claimById.get(id));
  const socialHeldClaim = claimById.get(social.heldClaimId);
  const socialCallNycInquiry = inquiryById.get(social.callNycInquiryId);
  const callNycCouncilActors = new Set(
    socialEngagementEvents
      .filter((event) => event.projectId === "callnyc" && event.servingPublicOfficial)
      .map((event) => event.actor)
  );
  const nycacCouncilActors = new Set(
    socialEngagementEvents
      .filter((event) => event.projectId === "nyc-artist-coalition" && event.servingPublicOfficial)
      .map((event) => event.actor)
  );
  const socialProjectNotePath = path.join(repoRoot, "docs/knowledge-bank/projects/social-media-archive-production.md");
  const socialProjectNote = readFileSync(socialProjectNotePath, "utf8");
  const antiClaimsText = readFileSync(path.join(repoRoot, "docs/knowledge-bank/anti-claims.md"), "utf8");
  const socialMdxByPage = new Map([
    ["callnyc", readFileSync(path.join(repoRoot, "apps/www/src/content/work/callnyc.mdx"), "utf8")],
    ["fair-rent-nyc", fairRentMdx],
    ["wowlist", readFileSync(path.join(repoRoot, "apps/www/src/content/work/wowlist.mdx"), "utf8")],
    ["kc-town-hall", kcTownHallMdx]
  ]);
  const socialPageProjectionComplete = social.pageClaimPairs.every(([pageId, claimId]) => {
    const page = knowledgeBank.pages.find((item) => item.id === pageId);
    return page?.occurrences.some((occurrence) => occurrence.claimId === claimId) &&
      socialMdxByPage.get(pageId)?.includes(`claimId="${claimId}"`);
  });
  const socialArchiveText = JSON.stringify({
    accounts: projectSocialAccounts,
    events: socialEngagementEvents,
    intakes: socialIntakes,
    observations: socialObservations,
    sources: socialSources,
    claims: socialClaims,
    inquiries: socialInquiries
  });
  const socialMediaComplete = Boolean(
    projectSocialAccounts.length === social.expectedAccountCount &&
      projectSocialAccounts.filter((account) => account.status === "open-inquiry").length === social.expectedNotRecoveredCount &&
      socialEngagementEvents.length === social.expectedEngagementEventCount &&
      socialIntakes.length === social.expectedIntakeCount &&
      socialObservations.length === social.expectedObservationCount &&
      socialSources.length === social.expectedSourceCount &&
      socialClaims.length === social.expectedClaimCount &&
      socialInquiries.length === social.expectedInquiryCount &&
      social.requiredAccountHandles.every((handle) =>
        projectSocialAccounts.some((account) => account.handle === handle && account.status === "recovered" && account.accountUrl?.startsWith("https://x.com/"))
      ) &&
      projectSocialAccounts.every((account) =>
        account.status === "recovered" ? account.accountUrl?.startsWith("https://x.com/") : account.relationship === "not-recovered"
      ) &&
      socialIntakes.every((intake) =>
        intake?.disposition === "integrated" && intake.visibility === "public-safe" && intake.sourceIds.length && intake.observationIds.length && intake.boundaries.length >= 2
      ) &&
      socialObservations.every((observation) =>
        observation?.locator && observation.limitations.length && (observation.claimIds.length || observation.researchInquiryIds.length)
      ) &&
      socialSources.every((source) =>
        source?.visibility === "public" && source.canonicalUrl?.startsWith("https://") && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      socialClaims.every((claim) =>
        claim?.evidence.length && claim.boundaries.length >= 2 && claim.antiClaims.length >= 4 && claim.reviewedAt === social.reviewedAt && claim.reviewedBy.length >= 2
      ) &&
      socialActiveClaims.every((claim) =>
        claim?.projections.some((projection) => projection.status === "active" && projection.citationRequired === true && projection.surfaces.length === 1)
      ) &&
      socialHeldClaim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
      socialInquiries.every((inquiry) =>
        ["partially-recovered", "inconclusive"].includes(inquiry?.resultStatus) && inquiry.findings.length >= 2 && inquiry.limitations.length >= 2 && inquiry.sourceIds.length
      ) &&
      socialEngagementEvents.every((event) =>
        event.publicUrl.startsWith("https://x.com/") && sourceById.has(event.sourceId)
      ) &&
      callNycCouncilActors.size === social.callNycDistinctCouncilMemberLowerBound &&
      nycacCouncilActors.size === social.nycacDistinctCouncilMemberLowerBound &&
      socialCallNycInquiry?.resultStatus === "partially-recovered" &&
      socialCallNycInquiry.publicSummary?.includes("at least 19") &&
      socialPageProjectionComplete &&
      existsSync(socialProjectNotePath) &&
      socialProjectNote.includes("not a complete lifetime corpus") &&
      socialProjectNote.includes("individual `@NYCArtC` posts") &&
      antiClaimsText.includes("Account identity") &&
      antiClaimsText.includes("Do not convert “account not recovered” into “no account existed.”") &&
      !/\/Users\/|\/Volumes\/|\/private\/tmp|cookie|auth token|session token/i.test(socialArchiveText)
  );
  const callNycFull = suite.pilot.callNycFullPopulation;
  const callNycFullIntakes = callNycSocialPopulationJuly2026.intakeItems.map((item) => intakeById.get(item.id));
  const callNycFullObservations = callNycSocialPopulationJuly2026.observations.map((item) => observationById.get(item.id));
  const callNycFullSources = callNycSocialPopulationJuly2026.sources.map((item) => sourceById.get(item.id));
  const callNycFullClaims = callNycSocialPopulationJuly2026.claims.map((item) => claimById.get(item.id));
  const callNycFullInquiries = callNycSocialPopulationJuly2026.researchInquiries.map((item) => inquiryById.get(item.id));
  const callNycManifestPath = path.join(repoRoot, callNycFull.manifestPath);
  const callNycReportPath = path.join(repoRoot, callNycFull.reportPath);
  const callNycManifestText = readFileSync(callNycManifestPath, "utf8");
  const callNycManifest = overrides.callNycPopulation ?? JSON.parse(callNycManifestText);
  const callNycReport = overrides.callNycPopulationReport ?? readFileSync(callNycReportPath, "utf8");
  const callNycRecoveredRows = callNycManifest.population.filter((row) => row.populationDisposition === "recovered");
  const callNycNotRecoveredRows = callNycManifest.population.filter((row) => row.populationDisposition === "not-recovered");
  const callNycRecoveredIds = new Set(callNycRecoveredRows.map((row) => row.statusId));
  const callNycRelationshipCounts = callNycRecoveredRows.reduce((counts, row) => {
    counts[row.relationship] = (counts[row.relationship] ?? 0) + 1;
    return counts;
  }, {});
  const callNycShortUrls = new Set(callNycManifest.postedUrlInventory.map((item) => item.shortUrl));
  const callNycCouncilNames = new Set(callNycManifest.councilMemberReposters.map((item) => item.name));
  const callNycCouncilHandles = new Set(callNycManifest.councilMemberReposters.map((item) => item.handle.toLowerCase()));
  const callNycAuthoredIds = new Set(callNycManifest.councilMemberAuthoredInteractions.map((item) => item.statusId));
  const callNycSourceRoles = new Map(callNycManifest.sourceReadings.map((item) => [item.sourceId, item.role]));
  const callNycPopulationClaim = claimById.get(callNycFull.claimId);
  const callNycPopulationInquiry = inquiryById.get(callNycFull.inquiryId);
  const callNycPublicClaim = claimById.get(callNycFull.publicClaimId);
  const callNycFullArchiveText = JSON.stringify({
    intakes: callNycFullIntakes,
    observations: callNycFullObservations,
    sources: callNycFullSources,
    claims: callNycFullClaims,
    inquiries: callNycFullInquiries,
    manifest: callNycManifest
  });
  const callNycFullPopulationComplete = Boolean(
    existsSync(callNycManifestPath) &&
      existsSync(callNycReportPath) &&
      callNycManifest.reviewedAt === callNycFull.reviewedAt &&
      callNycManifest.account === "@CallNYCapp" &&
      callNycManifest.population.length === callNycFull.expectedPopulationCount &&
      callNycManifest.populationSummary.profileDisplayedPostCount === callNycFull.expectedPopulationCount &&
      callNycManifest.populationSummary.populationDispositionCount === callNycFull.expectedPopulationCount &&
      callNycRecoveredRows.length === callNycFull.expectedRecoveredCount &&
      callNycNotRecoveredRows.length === callNycFull.expectedNotRecoveredCount &&
      callNycRecoveredIds.size === callNycFull.expectedRecoveredCount &&
      callNycNotRecoveredRows.every((row) =>
        /^UNRECOVERED-0[1-3]$/.test(row.populationSlot) && !row.statusId && !row.statusUrl && /not exposed|not recovered/i.test(row.reason)
      ) &&
      Object.entries(callNycFull.expectedRelationshipCounts).every(([relationship, count]) =>
        callNycRelationshipCounts[relationship] === count && callNycManifest.populationSummary.relationshipCounts[relationship] === count
      ) &&
      callNycManifest.populationSummary.boundary.includes("by disposition, not by recovered content") &&
      callNycManifest.contentSystemSummary.recognitionPostCount === callNycFull.expectedRecognitionPostCount &&
      callNycManifest.contentSystemSummary.recognitionTargetHandleCount === callNycFull.expectedRecognitionTargetHandleCount &&
      callNycManifest.contentSystemSummary.recognitionDistinctIssuePageCount === callNycFull.expectedRecognitionIssuePageCount &&
      callNycManifest.contentSystemSummary.uniquePostedShortUrlCount === callNycFull.expectedPostedUrlCount &&
      callNycManifest.postedUrlInventory.length === callNycFull.expectedPostedUrlCount &&
      callNycShortUrls.size === callNycFull.expectedPostedUrlCount &&
      callNycManifest.postedUrlInventory.every((item) =>
        item.shortUrl.startsWith("https://t.co/") && callNycRecoveredIds.has(item.statusUrl.split("/").at(-1))
      ) &&
      callNycManifest.engagementSummary.callNycAuthoredOrReplyPostsWithDisplayedReposts === callNycFull.expectedRepostBearingPostCount &&
      callNycManifest.engagementSummary.displayedReposts === callNycFull.expectedDisplayedRepostCount &&
      callNycManifest.engagementSummary.currentlyPublicReposterAppearances === callNycFull.expectedPublicReposterAppearanceCount &&
      callNycManifest.engagementSummary.distinctCurrentlyPublicReposterAccounts === callNycFull.expectedDistinctPublicReposterCount &&
      callNycManifest.engagementSummary.displayedRepostsWithoutPublicAccountIdentity === callNycFull.expectedUnassignedRepostCount &&
      callNycManifest.engagementSummary.boundaries.some((boundary) => /external posts.*original authors/i.test(boundary)) &&
      callNycManifest.councilMemberReposters.length === callNycFull.expectedCouncilMemberReposterCount &&
      callNycCouncilNames.size === callNycFull.expectedCouncilMemberReposterCount &&
      callNycCouncilHandles.size === callNycFull.expectedCouncilMemberReposterCount &&
      callNycManifest.councilMemberReposters.every((item) =>
        item.sourceStatusIds.length > 0 && item.sourceStatusIds.every((statusId) => callNycRecoveredIds.has(statusId))
      ) &&
      callNycManifest.councilMemberAuthoredInteractions.length === callNycFull.expectedCouncilMemberAuthoredInteractionCount &&
      callNycAuthoredIds.size === callNycFull.expectedCouncilMemberAuthoredInteractionCount &&
      callNycManifest.councilMemberAuthoredInteractions.every((item) =>
        callNycCouncilNames.has(item.name) && item.statusUrl === `https://x.com/${item.handle.slice(1)}/status/${item.statusId}`
      ) &&
      callNycSourceRoles.get(callNycFull.directCoverageSourceId) === "direct-project-coverage" &&
      callNycFull.contextualSourceIds.every((sourceId) =>
        callNycSourceRoles.has(sourceId) && callNycSourceRoles.get(sourceId) !== "direct-project-coverage"
      ) &&
      callNycFullIntakes.length === callNycFull.expectedIntakeCount &&
      callNycFullObservations.length === callNycFull.expectedObservationCount &&
      callNycFullSources.length === callNycFull.expectedSourceCount &&
      callNycFullClaims.length === callNycFull.expectedClaimCount &&
      callNycFullInquiries.length === callNycFull.expectedInquiryCount &&
      callNycFullIntakes.every((intake) => intake?.disposition === "integrated" && intake.visibility === "public-safe" && intake.boundaries.length >= 2) &&
      callNycFullObservations.every((observation) => observation?.locator && observation.limitations.length >= 2 && observation.publicSafe === true) &&
      callNycFullSources.every((source) => source?.visibility === "public" && source.canonicalUrl.startsWith("https://") && source.doesNotEstablish.length >= 4) &&
      callNycPopulationClaim?.status === "confirmed-with-boundary" &&
      callNycPopulationClaim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
      callNycPopulationClaim.boundaries.length >= 4 &&
      callNycPopulationClaim.antiClaims.length >= 6 &&
      callNycPopulationInquiry?.resultStatus === "not-recovered" &&
      callNycPopulationInquiry.findings.length >= 3 &&
      callNycPopulationInquiry.limitations.length >= 2 &&
      callNycPublicClaim?.projections.some((projection) =>
        projection.status === "active" && /61 resident-facing issue pages/.test(projection.text) && /26 Council accounts/.test(projection.text) && /at least 19/.test(projection.text) && /six member-authored/.test(projection.text)
      ) &&
      /100 percent population disposition coverage/.test(callNycReport) &&
      /107-of-110 content recovery/.test(callNycReport) &&
      /Original-author metrics on reposted external posts are not CallNYC traction/.test(callNycReport) &&
      antiClaimsText.includes("107 content objects") &&
      antiClaimsText.includes("external posts reposted by") &&
      antiClaimsText.includes("contextual source articles") &&
      callNycManifest.publicSafety.containsRawTweetBodies === false &&
      callNycManifest.publicSafety.containsPrivateSessionData === false &&
      !/\/Users\/|\/Volumes\/|\/private\/tmp|cookie|auth token|session token/i.test(callNycFullArchiveText)
  );
  const wowListFull = suite.pilot.wowListFullPopulation;
  const wowListFullIntakes = wowListSocialPopulationJuly2026.intakeItems.map((item) => intakeById.get(item.id));
  const wowListFullObservations = wowListSocialPopulationJuly2026.observations.map((item) => observationById.get(item.id));
  const wowListFullSources = wowListSocialPopulationJuly2026.sources.map((item) => sourceById.get(item.id));
  const wowListFullClaims = wowListSocialPopulationJuly2026.claims.map((item) => claimById.get(item.id));
  const wowListFullInquiries = wowListSocialPopulationJuly2026.researchInquiries.map((item) => inquiryById.get(item.id));
  const wowListManifestPath = path.join(repoRoot, wowListFull.manifestPath);
  const wowListReportPath = path.join(repoRoot, wowListFull.reportPath);
  const wowListManifest = overrides.wowListPopulation ?? JSON.parse(readFileSync(wowListManifestPath, "utf8"));
  const wowListReport = overrides.wowListPopulationReport ?? readFileSync(wowListReportPath, "utf8");
  const wowListRecoveredRows = wowListManifest.population.filter((row) => row.populationDisposition === "recovered");
  const wowListNotRecoveredRows = wowListManifest.population.filter((row) => row.populationDisposition === "not-recovered");
  const wowListRecoveredIds = new Set(wowListRecoveredRows.map((row) => row.statusId));
  const wowListRelationshipCounts = wowListRecoveredRows.reduce((counts, row) => {
    counts[row.relationship] = (counts[row.relationship] ?? 0) + 1;
    return counts;
  }, {});
  const wowListShortUrls = new Set(wowListManifest.postedUrlInventory.map((item) => item.shortUrl));
  const wowListPublicReposterHandles = wowListManifest.publicReposterAudit.flatMap((item) => item.publicReposterHandles);
  const wowListDistinctPublicReposters = new Set(wowListPublicReposterHandles.map((handle) => handle.toLowerCase()));
  const wowListExternalAdoptionIds = new Set(wowListManifest.externalAdoptionEvidence.map((item) => item.statusId));
  const wowListSourceRoles = new Map(wowListManifest.sourceReadings.map((item) => [item.sourceId, item.role]));
  const wowListPopulationClaim = claimById.get(wowListFull.claimId);
  const wowListPopulationInquiry = inquiryById.get(wowListFull.inquiryId);
  const wowListPublicClaim = claimById.get(wowListFull.publicClaimId);
  const wowListFullArchiveText = JSON.stringify({
    intakes: wowListFullIntakes,
    observations: wowListFullObservations,
    sources: wowListFullSources,
    claims: wowListFullClaims,
    inquiries: wowListFullInquiries,
    manifest: wowListManifest
  });
  const wowListFullPopulationComplete = Boolean(
    existsSync(wowListManifestPath) &&
      existsSync(wowListReportPath) &&
      wowListManifest.reviewedAt === wowListFull.reviewedAt &&
      wowListManifest.account === "@wowlist" &&
      wowListManifest.population.length === wowListFull.expectedPopulationCount &&
      wowListManifest.populationSummary.profileDisplayedPostCount === wowListFull.expectedPopulationCount &&
      wowListManifest.populationSummary.populationDispositionCount === wowListFull.expectedPopulationCount &&
      wowListRecoveredRows.length === wowListFull.expectedRecoveredCount &&
      wowListNotRecoveredRows.length === wowListFull.expectedNotRecoveredCount &&
      wowListRecoveredIds.size === wowListFull.expectedRecoveredCount &&
      Object.entries(wowListFull.expectedRelationshipCounts).every(([relationship, count]) =>
        wowListRelationshipCounts[relationship] === count && wowListManifest.populationSummary.relationshipCounts[relationship] === count
      ) &&
      wowListManifest.populationSummary.contentRecoveryRate === 1 &&
      /complete profile-population snapshot/i.test(wowListManifest.populationSummary.boundary) &&
      wowListRecoveredRows.every((row) =>
        row.statusUrl.endsWith(`/status/${row.statusId}`) &&
        row.missionTags.length > 0 &&
        row.workflowTags.length > 0 &&
        row.stakeholderGroups.length > 0 &&
        !Object.hasOwn(row, "text")
      ) &&
      wowListManifest.contentSystemSummary.wowListAuthoredOrReplyPostCount === wowListFull.expectedAuthoredOrReplyCount &&
      wowListManifest.contentSystemSummary.uniquePostedShortUrlCount === wowListFull.expectedPostedUrlCount &&
      wowListManifest.contentSystemSummary.resolvedDestinationCount === wowListFull.expectedPostedUrlCount &&
      wowListManifest.postedUrlInventory.length === wowListFull.expectedPostedUrlCount &&
      wowListShortUrls.size === wowListFull.expectedPostedUrlCount &&
      wowListManifest.postedUrlInventory.every((item) =>
        item.shortUrl.startsWith("https://t.co/") && item.resolvedUrl.startsWith("https://") && wowListRecoveredIds.has(item.statusId)
      ) &&
      wowListManifest.engagementSummary.wowListAuthoredOrReplyPostCount === wowListFull.expectedAuthoredOrReplyCount &&
      wowListManifest.engagementSummary.wowListAuthoredOrReplyPostsWithDisplayedReposts === wowListFull.expectedRepostBearingPostCount &&
      wowListManifest.engagementSummary.displayedAccountOwnedEngagement.replies === wowListFull.expectedDisplayedReplyCount &&
      wowListManifest.engagementSummary.displayedAccountOwnedEngagement.reposts === wowListFull.expectedDisplayedRepostCount &&
      wowListManifest.engagementSummary.displayedAccountOwnedEngagement.likes === wowListFull.expectedDisplayedLikeCount &&
      wowListManifest.engagementSummary.currentlyPublicReposterAppearances === wowListFull.expectedPublicReposterAppearanceCount &&
      wowListManifest.engagementSummary.distinctCurrentlyPublicReposterAccounts === wowListFull.expectedDistinctPublicReposterCount &&
      wowListManifest.engagementSummary.displayedRepostsWithoutPublicAccountIdentity === wowListFull.expectedUnassignedRepostCount &&
      wowListManifest.engagementSummary.boundedExternalAdoptionPostCount === wowListFull.expectedExternalAdoptionPostCount &&
      wowListManifest.engagementSummary.boundaries.some((boundary) => /external posts reposted by WOW List belong to their original authors/i.test(boundary)) &&
      wowListManifest.engagementSummary.boundaries.some((boundary) => /Like identities were not audited/i.test(boundary)) &&
      wowListManifest.publicReposterAudit.length === wowListFull.expectedRepostBearingPostCount &&
      wowListManifest.publicReposterAudit.every((item) =>
        wowListRecoveredIds.has(item.statusId) && item.displayedReposts === item.publicReposterHandles.length + item.publicIdentityRemainder
      ) &&
      wowListPublicReposterHandles.length === wowListFull.expectedPublicReposterAppearanceCount &&
      wowListDistinctPublicReposters.size === wowListFull.expectedDistinctPublicReposterCount &&
      wowListManifest.externalAdoptionEvidence.length === wowListFull.expectedExternalAdoptionPostCount &&
      wowListExternalAdoptionIds.size === wowListFull.expectedExternalAdoptionPostCount &&
      wowListManifest.externalAdoptionEvidence.every((item) =>
        item.statusUrl.endsWith(`/status/${item.statusId}`) && item.handle.startsWith("@") && item.signal.length > 20
      ) &&
      wowListFull.independentUseSourceIds.every((sourceId) =>
        ["independent-product-tutorial", "external-organizer-adoption"].includes(wowListSourceRoles.get(sourceId))
      ) &&
      wowListFull.missionContextSourceIds.every((sourceId) => wowListSourceRoles.get(sourceId) === "mission-context") &&
      wowListSourceRoles.get(wowListFull.conveningContextSourceId) === "convening-context" &&
      wowListSourceRoles.get(wowListFull.historicalProductScopeSourceId) === "historical-product-scope" &&
      wowListFullIntakes.length === wowListFull.expectedIntakeCount &&
      wowListFullObservations.length === wowListFull.expectedObservationCount &&
      wowListFullSources.length === wowListFull.expectedSourceCount &&
      wowListFullClaims.length === wowListFull.expectedClaimCount &&
      wowListFullInquiries.length === wowListFull.expectedInquiryCount &&
      wowListFullIntakes.every((intake) => intake?.disposition === "integrated" && intake.visibility === "public-safe" && intake.boundaries.length >= 2) &&
      wowListFullObservations.every((observation) => observation?.locator && observation.limitations.length >= 2 && observation.publicSafe === true) &&
      wowListFullSources.every((source) => source?.visibility === "public" && source.canonicalUrl.startsWith("https://") && source.doesNotEstablish.length >= 4) &&
      wowListPopulationClaim?.status === "confirmed-with-boundary" &&
      wowListPopulationClaim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
      wowListPopulationClaim.boundaries.length >= 4 &&
      wowListPopulationClaim.antiClaims.length >= 7 &&
      wowListPopulationInquiry?.resultStatus === "partially-recovered" &&
      wowListPopulationInquiry.findings.length >= 3 &&
      wowListPopulationInquiry.limitations.length >= 2 &&
      wowListPublicClaim?.projections.some((projection) =>
        projection.status === "active" &&
        /complete recovered public-account population/.test(projection.text) &&
        /weekly email/.test(projection.text) &&
        /independent organizers/.test(projection.text)
      ) &&
      /100 percent profile-population recovery/.test(wowListReport) &&
      /Original-author metrics on reposted external posts are not WOW List[\n ]+traction/.test(wowListReport) &&
      /not a complete adoption census/.test(wowListReport) &&
      antiClaimsText.includes("38-object profile census") &&
      antiClaimsText.includes("16 external posts reposted by") &&
      antiClaimsText.includes("eight externally authored posts") &&
      wowListManifest.publicSafety.containsRawTweetBodies === false &&
      wowListManifest.publicSafety.containsPrivateSessionData === false &&
      !/\/Users\/|\/Volumes\/|\/private\/tmp|cookie|auth token|session token/i.test(wowListFullArchiveText)
  );
  const kcthFull = suite.pilot.kcTownHallFullPopulation;
  const kcthLedgerPath = path.join(repoRoot, kcthFull.ledgerPath);
  const kcthDocumentationPath = path.join(repoRoot, kcthFull.documentationPath);
  const kcthDocumentation = existsSync(kcthDocumentationPath)
    ? readFileSync(kcthDocumentationPath, "utf8")
    : "";
  const kcthLedger = overrides.kcTownHallLedger ?? (existsSync(kcthLedgerPath)
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
  const kcthRepostSourceHandles = new Set(kcthRepostRecords.map((record) => record.statusOwner.toLowerCase()));
  const kcthExternalHandles = new Set(
    kcthAuthoredRecords.flatMap((record) => record.publicMentions ?? [])
      .filter((handle) => handle.toLowerCase() !== "@kctownhall")
      .map((handle) => handle.toLowerCase())
  );
  const countKcthMention = (handle) => kcthAuthoredRecords.filter((record) =>
    record.publicMentions.some((mention) => mention.toLowerCase() === handle.toLowerCase())
  ).length;
  const kcthLinks = kcthRecords.flatMap((record) => record.postedUrls ?? []);
  const kcthUniqueShortUrls = new Set(kcthLinks.map((link) => link.shortUrl));
  const kcthUniqueDestinations = new Set(kcthLinks.map((link) => link.resolvedUrl).filter(Boolean));
  const isKcthProjectDestination = (url) =>
    /kctownhall\.com|facebook\.com\/KCTownHall|youtube\.com\/watch\?v=(PmLjLyOpS9I|onCKU-TuPhc)/i.test(url);
  const kcthProjectDestinations = new Set([...kcthUniqueDestinations].filter(isKcthProjectDestination));
  const kcthExternalDestinations = new Set([...kcthUniqueDestinations].filter((url) => !isKcthProjectDestination(url)));
  const kcthThemeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(kcthRecords, (record) => record.primaryTheme))
      .map(([theme, records]) => [theme, records.length])
  );
  const kcthTireRecords = kcthRecords.filter(
    (record) => record.primaryTheme === "resident-tire-intake-and-operations"
  );
  const sumKcthMetrics = (records) => records.reduce(
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
  const kcthAuthoredReactionSnapshot = sumKcthMetrics(kcthAuthoredRecords);
  const kcthRepostReactionSnapshot = sumKcthMetrics(kcthRepostRecords);
  const kcthDirectResponseRecords = kcthRecords.filter((record) =>
    record.outsideAuthoredInteraction?.targetAccount?.toLowerCase() === "@kctownhall" &&
      ["quote-post", "reply"].includes(record.outsideAuthoredInteraction?.interactionType) &&
      record.outsideAuthoredInteraction?.stakeholderRole === "sitting-kansas-city-council-member" &&
      record.outsideAuthoredInteraction?.roleSourceId === "SRC-KCMO-COUNCIL-ROSTER-2018"
  );
  const kcthCityPoliticalHandles = new Set(["@quintonlucaskc", "@robinson4kc", "@joliejustus"]);
  const kcthCityPoliticalReposts = kcthRepostRecords.filter((record) =>
    kcthCityPoliticalHandles.has(record.statusOwner.toLowerCase())
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
  const kcthReposterRows = kcthLedger?.publicReposterAudit ?? [];
  const kcthPublicReposterHandles = kcthReposterRows.flatMap((item) => item.publicReposterHandles);
  const kcthDistinctPublicReposters = new Set(kcthPublicReposterHandles.map((handle) => handle.toLowerCase()));
  const kcthCouncilReposterAppearances = kcthLedger?.councilMemberPublicReposterAppearances ?? [];
  const kcthDistinctCouncilReposters = new Set(kcthCouncilReposterAppearances.map((item) => item.handle.toLowerCase()));
  const kcthCouncilRoleSourceByHandle = new Map([
    ["@quintonlucaskc", "SRC-KCMO-COUNCIL-ROSTER-2018"],
    ["@joliejustus", "SRC-KCMO-COUNCIL-ROSTER-2018"],
    ["@robinson4kc", "SRC-KCMO-COUNCIL-BUSINESS-SESSION-TERMS"]
  ]);
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
      equalStringSets(new Set(kcthLedger.aggregateFindings.postedLinks.resolvedDestinations), kcthUniqueDestinations) &&
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
  const kcthIndependentCoverageSource = sourceById.get(kcthFull.independentCoverageSourceId);
  const kcthFullInquiry = inquiryById.get("INQ-KCTH-FULL-POPULATION-2026");
  const kcthTractionInquiry = inquiryById.get("INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES");
  const kcthAuthorshipInquiry = inquiryById.get("INQ-KCTH-SHARED-ACCOUNT-AUTHORSHIP");
  const kcthCouncilResponseClaim = claimById.get("CLM-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR");
  const kcthProof = knowledgeBank.proofCoverageTargets.find((target) => target.proofId === kcthFull.proofId);
  const kcthPage = knowledgeBank.pages.find((page) => page.id === "kc-town-hall");
  const kcthOccurrence = kcthPage?.occurrences.find((occurrence) => occurrence.id === "public-service-interface");
  const kcthLedgerText = kcthLedger ? JSON.stringify(kcthLedger) : "";
  const kcthFullPopulationComplete = Boolean(
    kcthLedger &&
      kcthLedger.schemaVersion === 2 &&
      kcthLedger.account === "@KCTownHall" &&
      kcthLedger.observedAt === "2026-07-14" &&
      kcthLedger.population.displayedProfileCount === kcthFull.expectedProfileCount &&
      kcthLedger.population.postsRouteUnique === kcthFull.expectedPostsTabCount &&
      kcthLedger.population.repliesRouteArticles === kcthFull.expectedRepliesRouteArticles &&
      kcthLedger.population.attributableRecords === kcthFull.expectedRepliesTabCount &&
      kcthLedger.population.excludedConversationContextArticles === kcthFull.expectedExcludedContextItems &&
      kcthLedger.population.unresolvedProfileCountSlots === kcthFull.expectedUnresolvedSlots &&
      kcthLedger.population.relationshipCounts.accountPosts === kcthFull.expectedAccountPosts &&
      kcthLedger.population.relationshipCounts.accountReplies === kcthFull.expectedAccountReplies &&
      kcthLedger.population.relationshipCounts.reposts === kcthFull.expectedReposts &&
      /complete recovery of the surviving/i.test(kcthLedger.population.completenessStatement) &&
      /not a native X export/i.test(kcthLedger.population.completenessStatement) &&
      /No credential, cookie, direct message, private analytics/i.test(kcthLedger.method.authenticationBoundary) &&
      kcthLedger.method.freshVerification.verifiedAt === kcthFull.reviewedAt &&
      kcthLedger.method.freshVerification.profileCountReconfirmed === kcthFull.expectedProfileCount &&
      kcthLedger.method.freshVerification.postsRouteUnique === kcthFull.expectedPostsTabCount &&
      kcthLedger.method.freshVerification.repliesRouteArticles === kcthFull.expectedRepliesRouteArticles &&
      kcthLedger.method.freshVerification.attributableRecords === kcthFull.expectedUniqueItems &&
      kcthLedger.method.freshVerification.replyOnlyAccountRecords === kcthFull.expectedAccountReplies &&
      kcthLedger.method.freshVerification.excludedConversationContextArticles === kcthFull.expectedExcludedContextItems &&
      kcthLedger.method.freshVerification.exactStatusIdMatchToJuly14Ledger === true &&
      kcthLedger.method.freshVerification.missingStatusIds.length === 0 &&
      kcthLedger.method.freshVerification.newStatusIds.length === 0 &&
      kcthLedger.method.freshVerification.uniqueShortUrlSetMatch === true &&
      kcthLedger.method.freshVerification.accountOwnedMetricSnapshotMatch === true &&
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
      kcthAggregateFindingsRecompute &&
      kcthRelationshipCounts["account-post"] === kcthFull.expectedAccountPosts &&
      kcthRelationshipCounts["account-reply"] === kcthFull.expectedAccountReplies &&
      kcthRelationshipCounts.repost === kcthFull.expectedReposts &&
      kcthAuthoredRecords.length === kcthFull.expectedAuthoredStatuses &&
      kcthRepostSourceHandles.size === kcthFull.expectedRepostSourceAccounts &&
      kcthExternalHandles.size === kcthFull.expectedExternalHandles &&
      countKcthMention("@QuintonLucasKC") === kcthFull.expectedQuintonLucasMentions &&
      countKcthMention("@Robinson4kc") === kcthFull.expectedMelissaRobinsonMentions &&
      kcthCityPoliticalReposts.length === kcthFull.expectedCityPoliticalFigureReposts &&
      kcthDirectResponseRecords.length === kcthFull.expectedDirectCouncilResponses &&
      new Set(kcthDirectResponseRecords.map((record) => record.statusOwner.toLowerCase())).size === kcthFull.expectedDirectCouncilAccounts &&
      kcthDirectResponseRecords.every((record) => record.metricOwner === "source-status-not-kctownhall-repost-action") &&
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
      kcthReposterRows.length === kcthFull.expectedRepostBearingStatuses &&
      kcthReposterRows.every((item) =>
        kcthAuthoredRecords.some((record) => record.statusId === item.statusId) &&
          item.statusUrl.endsWith(`/status/${item.statusId}`) &&
          item.displayedReposts === item.publicReposterHandles.length + item.unassignedDisplayedReposts
      ) &&
      kcthReposterRows.reduce((sum, item) => sum + item.displayedReposts, 0) === kcthFull.expectedDisplayedReposts &&
      kcthPublicReposterHandles.length === kcthFull.expectedPublicReposterAppearances &&
      kcthDistinctPublicReposters.size === kcthFull.expectedDistinctPublicReposters &&
      kcthReposterRows.reduce((sum, item) => sum + item.unassignedDisplayedReposts, 0) === kcthFull.expectedUnassignedReposts &&
      kcthCouncilReposterAppearances.length === kcthFull.expectedCouncilReposterAppearances &&
      kcthDistinctCouncilReposters.size === kcthFull.expectedCouncilReposterAccounts &&
      kcthCouncilReposterAppearances.every((item) =>
        kcthReposterRows.some((row) => row.statusId === item.statusId && row.publicReposterHandles.includes(item.handle)) &&
          item.statusUrl.endsWith(`/status/${item.statusId}`) &&
          item.roleSourceId === kcthCouncilRoleSourceByHandle.get(item.handle.toLowerCase())
      ) &&
      kcthLedger.aggregateFindings.publicReposterAudit.auditedAccountAuthoredStatuses === kcthFull.expectedRepostBearingStatuses &&
      kcthLedger.aggregateFindings.publicReposterAudit.displayedReposts === kcthFull.expectedDisplayedReposts &&
      kcthLedger.aggregateFindings.publicReposterAudit.publicIdentityAppearances === kcthFull.expectedPublicReposterAppearances &&
      kcthLedger.aggregateFindings.publicReposterAudit.distinctPublicHandles === kcthFull.expectedDistinctPublicReposters &&
      kcthLedger.aggregateFindings.publicReposterAudit.unassignedDisplayedReposts === kcthFull.expectedUnassignedReposts &&
      kcthLedger.aggregateFindings.publicReposterAudit.councilMemberPublicAppearances === kcthFull.expectedCouncilReposterAppearances &&
      kcthLedger.aggregateFindings.publicReposterAudit.distinctCouncilMemberAccounts === kcthFull.expectedCouncilReposterAccounts &&
      /dated lower-bound identity surface/i.test(kcthLedger.aggregateFindings.publicReposterAudit.boundary) &&
      kcTownHallPopulationAudit.uniqueItemsRecovered === kcthFull.expectedUniqueItems &&
      kcTownHallPopulationAudit.repliesTabArticlesRecovered === kcthFull.expectedRepliesRouteArticles &&
      kcTownHallPopulationAudit.freshVerificationExactStatusIdMatch === true &&
      kcTownHallCorpusFindings.tireWorkflowRecords === kcthFull.expectedTireWorkflowRecords &&
      kcTownHallCorpusFindings.directCouncilMemberResponseStatuses === kcthFull.expectedDirectCouncilResponses &&
      kcTownHallCorpusFindings.publicReposterAppearances === kcthFull.expectedPublicReposterAppearances &&
      kcTownHallCorpusFindings.authoredVisibleLikes === kcthFull.expectedAuthoredVisibleLikes &&
      kcTownHallSocialCorpus.sources.length === kcthFull.expectedSourceCount &&
      kcTownHallSocialCorpus.observations.length === kcthFull.expectedObservationCount &&
      kcTownHallSocialCorpus.claims.length === kcthFull.expectedClaimCount &&
      kcTownHallSocialCorpus.researchInquiries.length === kcthFull.expectedInquiryCount &&
      kcthFullSources.every((source) =>
        source?.visibility === "public" && source.canonicalUrl?.startsWith("https://") && source.supportsGenerally.length && source.doesNotEstablish.length >= 4
      ) &&
      kcthFull.officialRoleSourceIds.every((sourceId) => sourceById.get(sourceId)?.kind === "government-record") &&
      kcthIndependentCoverageSource?.kind === "published-article" &&
      kcthIndependentCoverageSource.doesNotEstablish.some((boundary) => /withdrawal reason/i.test(boundary)) &&
      kcthAuditSource?.kind === "research-run" &&
      kcthAuditSource.canonicalUrl?.includes(kcthFull.ledgerPath) &&
      kcthActiveClaim?.status === "confirmed-with-boundary" &&
      kcthActiveClaim.projections.some((projection) =>
        projection.status === "active" &&
          projection.surfaces.includes("/work/kc-town-hall") &&
          /shared public account as an operating surface/i.test(projection.text) &&
          /100 of 183 surviving records/i.test(projection.text) &&
          /seven appearances by three then-sitting Council-member accounts/i.test(projection.text) &&
          /two sitting members authored direct responses/i.test(projection.text) &&
          !/100 completed pickups|100 households served|endorsed KC Town Hall/i.test(projection.text)
      ) &&
      kcthActiveClaim.boundaries.some((boundary) => /shared project identity/i.test(boundary)) &&
      kcthActiveClaim.antiClaims.some((antiClaim) => /One hundred records equal/i.test(antiClaim)) &&
      kcthActiveClaim.antiClaims.some((antiClaim) => /endorsed KC Town Hall/i.test(antiClaim)) &&
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
      /all 40 repost-bearing/i.test(kcthDocumentation) &&
      /seven public repost-list appearances/i.test(kcthDocumentation) &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(kcthLedgerText) &&
      kcthRecords.every((record) =>
        !/(?:816[- .])\d{3}[- .]\d{4}/.test(record.publicSummary) &&
        !/\b\d{3,5}\s+(?:N\.?|S\.?|E\.?|W\.?)?\s*[A-Z][A-Za-z]+(?:\s+(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard))\b/i.test(record.publicSummary)
      ) &&
      publicRegistryText.includes(kcthFull.activeClaimId) &&
      kcthFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const fieldPractice = suite.pilot.kcTownHallFieldPractice;
  const fieldPracticeIntakes = fieldPractice.intakeIds.map((id) => intakeById.get(id));
  const fieldPracticeObservations = kcTownHallFieldPractice.observations.map((item) => observationById.get(item.id));
  const fieldPracticeSources = fieldPractice.sourceIds.map((id) => sourceById.get(id));
  const fieldPracticeProtectedSources = fieldPractice.protectedSourceIds.map((id) => sourceById.get(id));
  const fieldPracticeClaims = fieldPractice.claimIds.map((id) => claimById.get(id));
  const fieldPracticeInquiries = fieldPractice.inquiryIds.map((id) => inquiryById.get(id));
  const fieldDeliveryClaim = claimById.get(fieldPractice.fieldDeliveryClaimId);
  const tireRoleClaim = claimById.get(fieldPractice.tireRoleClaimId);
  const fieldPracticeReviewSource = sourceById.get(fieldPractice.reviewSourceId);
  const fieldPracticeProofCoverage = fieldPractice.proofIds.map((proofId) =>
    knowledgeBank.proofCoverageTargets.find((target) => target.proofId === proofId)
  );
  const fieldPracticeReport = overrides.kcTownHallFieldPracticeReport ?? readFileSync(
    path.join(repoRoot, fieldPractice.documentationPath),
    "utf8"
  );
  const fieldPracticeContentSha256 = createHash("sha256").update(JSON.stringify({
    intakes: kcTownHallFieldPractice.intakeItems,
    observations: kcTownHallFieldPractice.observations,
    sources: kcTownHallFieldPractice.sources,
    claims: kcTownHallFieldPractice.claims,
    inquiries: kcTownHallFieldPractice.researchInquiries
  })).digest("hex");
  const fieldPracticeCanonicalRecordsSha256 = createHash("sha256").update(JSON.stringify({
    intakes: fieldPracticeIntakes,
    observations: fieldPracticeObservations,
    sources: fieldPracticeSources,
    claims: fieldPracticeClaims,
    inquiries: fieldPracticeInquiries
  })).digest("hex");
  const fieldPracticeProofProjectionSha256 = createHash("sha256").update(JSON.stringify({
    publicWording: kcTownHallProof?.publicWording,
    shortWording: kcTownHallProof?.shortWording,
    detailedPublicWording: kcTownHallProof?.detailedPublicWording
  })).digest("hex");
  const fieldPracticeSharedPublicSurfacesSha256 = createHash("sha256")
    .update(kcTownHallAdditionalPublicSurfaceText)
    .digest("hex");
  const fieldPracticePublicReviewReportSha256 = createHash("sha256")
    .update(fieldPracticeReport)
    .digest("hex");
  const fieldPracticeReviewLocksMatch =
    fieldPracticeContentSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.corpusSha256 &&
    fieldPracticeCanonicalRecordsSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.canonicalRecordsSha256 &&
    kcTownHallContentSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.governedKnowledgeSha256 &&
    fieldPracticeProofProjectionSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.proofProjectionSha256 &&
    kcTownHallMdxSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.caseStudyMdxSha256 &&
    fieldPracticeSharedPublicSurfacesSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.sharedPublicSurfacesSha256 &&
    fieldPracticePublicReviewReportSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.publicReviewReportSha256;
  const fieldPracticePrivatePathFree = !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(
    JSON.stringify(kcTownHallFieldPractice) + fieldPracticeReport
  );
  const fieldPracticeEvidenceClosed = fieldPracticeClaims.every((claim) =>
    claim?.evidence.every((evidence) =>
      evidence.supports.length && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const fieldPracticeAffirmativeText = fieldPracticeClaims.flatMap((claim) => [
    claim?.internalClaim,
    ...(claim?.projections.map((projection) => projection.text) ?? []),
    ...(claim?.evidence.flatMap((evidence) => [
      evidence.publicNote,
      evidence.internalExcerpt,
      ...evidence.supports
    ]) ?? [])
  ]).filter(Boolean).join("\n");
  const fieldPracticeAffirmativeSentences = fieldPracticeAffirmativeText
    .split(/[.!?\n]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const fieldPracticeSensitiveConcept = /(?:Phase One|first[- ]stage|general contractor|field coordinat|construction|restoration|rehabilitation|renovation|roof(?:ing)?|masonry|parapet|survey|questionnaire|handbill|respondent|resident[- ]feedback|neighborhood engagement|data(?:base| system)|site[- ]based listening|community mandate|Tired of Tires|tire (?:collection|pickup|service)|monthly (?:collection|pickup)|hauling|disposal|Indian Mound|Cleveland Avenue|Unify to Beautify|Pastor Lee|capital allocation|municipal investment)/i;
  const fieldPracticeEpistemicFrame = /(?:Jamie (?:reports?|reported)|Jamie's reported|participant[- ]memory|memory (?:account|lead)|first[- ]person|remain(?:s|ed)? (?:held|open|uncorroborated|under research)|pending (?:corroboration|independent)|not (?:independently )?(?:established|verified|corroborated)|requires? independent|needs? (?:independent|a dated)|under research)/i;
  const fieldPracticeEpistemicallyBounded = fieldPracticeAffirmativeSentences.every((sentence) =>
    !/(?:Jamie|Jamie's)/i.test(sentence) ||
      !fieldPracticeSensitiveConcept.test(sentence) ||
      fieldPracticeEpistemicFrame.test(sentence)
  );
  const fieldPracticeOutcomeInflationFree = fieldPracticeAffirmativeSentences.every((sentence) => {
    const attributesOutcome = /(?:Jamie|Jamie's|his (?:campaign|program)|the (?:campaign|program))[^.]{0,180}(?:yield(?:ed|ing)?|caus(?:ed|ing)|brought|secured|produced|established|resulted in)[^.]{0,120}(?:community mandate|capital|allocation|funding|municipal investment)/i.test(sentence);
    return !attributesOutcome || fieldPracticeEpistemicFrame.test(sentence) || /(?:do not|does not|did not|cannot|without|require|needs?|pending|unverified|uncorroborated)/i.test(sentence);
  });
  const fieldPracticeOverclaimPatterns = [
    /Jamie[^.]{0,120}(?:alone|sole(?:ly)?)[^.]{0,120}(?:survey|handbill|data system)/i,
    /(?:proposal|archive|archives)[^.]{0,120}(?:prove|proves|establish|establishes)[^.]{0,120}Jamie[^.]{0,120}(?:designed|authored)[^.]{0,100}(?:survey|handbill|data system)/i,
    /(?:survey|site conversations?)[^.]{0,100}(?:statistically representative|audited (?:community )?mandate)/i,
    /(?:public archive|public archives|Ghost|social (?:archive|records?))[^.]{0,120}(?:prove|proves|establish|establishes)[^.]{0,120}Jamie[^.]{0,160}(?:individual(?:ly)?|alone|sole(?:ly)?|designed|coordinated|drove|unloaded|logged|operated)/i,
    /Jamie[^.]{0,120}(?:alone|sole(?:ly)?)[^.]{0,120}(?:created|founded|co-founded|Cleveland Avenue|Unify to Beautify)/i,
    /Jamie[^.]{0,100}originated[^.]{0,80}Pastor Lee/i,
    /Jamie[^.]{0,120}(?:caused|secured|drove|resulted in)[^.]{0,120}(?:capital|allocation|funding)/i,
    /(?:verified|confirmed)[^.]*(?:Jamie[^.]{0,100}(?:alone|sole(?:ly)?|caused)|general contractor|Phase One[^.]{0,40}completed in 2019)/i
  ];
  const fieldPracticeOverclaimFree = fieldPracticeOverclaimPatterns.every(
    (pattern) => !pattern.test(fieldPracticeAffirmativeText)
  );
  const kcTownHallRenderedProofText = [
    kcTownHallProof?.publicWording,
    kcTownHallProof?.shortWording,
    kcTownHallProof?.detailedPublicWording,
    kcTownHallAdditionalPublicSurfaceText
  ].filter(Boolean).join("\n");
  const fieldPracticeHeldFromRenderedProof = kcTownHallRenderedProofText
    .split(/[.!?\n]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .every((sentence) => {
      const constructionResult = /(?:Phase One|first[- ]stage|construction|restoration|rehabilitation|renovation|roof(?:ing)?|masonry|parapet)/i.test(sentence) &&
        /(?:deliver(?:ed|y)|complet(?:e|ed|ion)|finish(?:ed)?|built|restor(?:e|ed)|rehabilitat(?:e|ed)|renovat(?:e|ed)|manage(?:d)?|coordinat(?:e|ed)|direct(?:ed)?|oversee|oversaw|led|lead|spearhead(?:ed)?|supervis(?:e|ed)|execut(?:e|ed)|administ(?:er|ered)|orchestrat(?:e|ed)|carr(?:y|ied) out)/i.test(sentence);
      const surveyAuthorship = /(?:resident[- ]feedback|neighborhood (?:feedback|engagement)|survey|questionnaire|handbill|respondent|data(?:base| system)|community mandate|site[- ]based listening)/i.test(sentence) &&
        /(?:built|creat(?:e|ed)|design(?:ed)?|author(?:ed)?|implement(?:ed)?|produc(?:e|ed)|establish(?:ed)?|develop(?:ed)?|fashion(?:ed)?|assembl(?:e|ed)|invent(?:ed)?|devis(?:e|ed)|engineer(?:ed)?|launch(?:ed)?|formulat(?:e|ed)|orchestrat(?:e|ed)|\bmade\b)/i.test(sentence);
      const heldProgram = /(?:Tired of Tires|tire (?:collection|pickup|service)|Indian Mound|Cleveland Avenue|Unify to Beautify|Pastor Lee)/i.test(sentence);
      return !/general contractor|\bGC\b/i.test(sentence) &&
        !/Phase One[^.]{0,60}(?:completed|complete) in 2019/i.test(sentence) &&
        !constructionResult &&
        !surveyAuthorship &&
        !heldProgram;
    });
  const fieldPracticeComplete = Boolean(
    kcTownHallFieldPractice.intakeItems.length === fieldPractice.expectedIntakeCount &&
      kcTownHallFieldPractice.observations.length === fieldPractice.expectedObservationCount &&
      kcTownHallFieldPractice.sources.length === fieldPractice.expectedSourceCount &&
      kcTownHallFieldPractice.claims.length === fieldPractice.expectedClaimCount &&
      kcTownHallFieldPractice.researchInquiries.length === fieldPractice.expectedInquiryCount &&
      fieldPracticeContentSha256 === fieldPractice.approvedContentSha256 &&
      fieldPracticeReviewLocksMatch &&
      fieldPracticeIntakes.every((intake) =>
        intake?.boundaries.length >= 3 && intake.sourceIds.length && intake.observationIds.length && intake.researchInquiryIds.length
      ) &&
      fieldPracticeObservations.every((observation) =>
        observation?.locator && observation.limitations.length >= 2 && observation.claimIds.length && observation.researchInquiryIds.length
      ) &&
      fieldPracticeObservations.filter((observation) => observation?.kind === "participant-memory").length === 7 &&
      fieldPracticeObservations.filter((observation) => observation?.kind === "participant-memory").every(
        (observation) => observation?.status === "captured"
      ) &&
      fieldPracticeSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length >= 3) &&
      fieldPracticeProtectedSources.every((source) =>
        source?.visibility === "protected" &&
          source.preservationStatus === "private" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
      ) &&
      fieldPracticeReviewSource?.visibility === "public" &&
      fieldPracticeReviewSource.kind === "research-run" &&
      fieldPracticeReviewSource.canonicalUrl?.endsWith(fieldPractice.documentationPath) &&
      fieldPracticeReviewSource.doesNotEstablish.some((boundary) => /independently verified/i.test(boundary)) &&
      fieldPracticeClaims.every((claim) =>
        claim?.status === "use-with-care" &&
          claim.boundaries.length >= 3 &&
          claim.antiClaims.length >= 4 &&
          claim.projections.length > 0 &&
          claim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      fieldPracticeOverclaimFree &&
      fieldPracticeEpistemicallyBounded &&
      fieldPracticeOutcomeInflationFree &&
      fieldPracticeHeldFromRenderedProof &&
      fieldPracticeEvidenceClosed &&
      fieldDeliveryClaim?.boundaries.some((boundary) =>
        /does not independently establish general-contractor title or actual Phase One completion/i.test(boundary)
      ) &&
      fieldDeliveryClaim.antiClaims.some((antiClaim) => /proposal proves Jamie was general contractor/i.test(antiClaim)) &&
      fieldDeliveryClaim.antiClaims.some((antiClaim) => /proposal proves Phase One was completed in 2019/i.test(antiClaim)) &&
      tireRoleClaim?.boundaries.some((boundary) => /Indian Mound expansion needs/i.test(boundary)) &&
      tireRoleClaim.boundaries.some((boundary) => /not completed service units/i.test(boundary)) &&
      fieldPracticeInquiries.every((inquiry) =>
        inquiry?.findings.length >= 2 && inquiry.limitations.length >= 3 && inquiry.sourceIds.length >= 2
      ) &&
      fieldPracticeInquiries.some((inquiry) => inquiry?.resultStatus === "inconclusive") &&
      fieldPracticeInquiries.some((inquiry) => inquiry?.resultStatus === "partially-recovered") &&
      fieldPracticeProofCoverage.every((coverage) =>
        coverage &&
          fieldPractice.sourceIds.some((sourceId) => coverage.sourceIds.includes(sourceId)) &&
          fieldPractice.inquiryIds.some((inquiryId) => coverage.researchInquiryIds.includes(inquiryId))
      ) &&
      /does not use[\s\S]{0,50}general contractor/i.test(fieldPracticeReport) &&
      /not later independent proof of completion/i.test(fieldPracticeReport) &&
      /source body did not materialize/i.test(fieldPracticeReport) &&
      /website remains\s+unchanged/i.test(fieldPracticeReport) &&
      fieldPracticePrivatePathFree &&
      fieldPractice.claimIds.every((id) => !publicRegistryText.includes(id)) &&
      !/general contractor|Phase One was completed in 2019/i.test(kcTownHallMdx)
  );
  const allEvaluatedObservations = [...pilotObservations, ...expansionObservations, ...secondExpansionObservations, ...institutionalObservations, ...pressObservations, ...kcTownHallObservations, kcTownHallContributionObservation, kcTownHallTransitionObservation, ...archiveObservations, ...googleDriveObservations, ...socialObservations, ...callNycFullObservations, ...wowListFullObservations, ...kcTownHallSocialCorpus.observations, ...fieldPracticeObservations];
  const allEvaluatedClaims = [...pilotClaims, ...expansionClaims, ...secondExpansionClaims, institutionalClaim, pressClaim, kcTownHallClaim, kcTownHallContributionClaim, ...archiveClaims, ...googleDriveClaims, ...socialClaims, ...callNycFullClaims, ...wowListFullClaims, ...kcthFullClaims, ...fieldPracticeClaims];
  const allEvaluatedInquiries = [...pilotInquiries, ...expansionInquiries, ...secondExpansionInquiries, institutionalInquiry, pressInquiry, kcTownHallInquiry, kcTownHallTransitionInquiry, ...archiveInquiries, ...googleDriveInquiries, ...socialInquiries, ...callNycFullInquiries, ...wowListFullInquiries, ...kcthFullInquiries, ...fieldPracticeInquiries];
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
  const agencyGraphSha256 = createHash("sha256").update(JSON.stringify(
    knowledgeBank.agencyRelations.map((relation) => ({
      id: relation.id,
      actorIds: relation.actorIds,
      action: relation.action,
      objectId: relation.objectId,
      purpose: relation.purpose,
      result: relation.result,
      creditScope: relation.creditScope,
      status: relation.status,
      claimIds: relation.claimIds,
      sourceIds: relation.sourceIds,
      sourceSupportKeys: relation.sourceSupportKeys,
      boundaries: relation.boundaries
    }))
  )).digest("hex");
  const agencyGraphApproved = agencyGraphSha256 === agency.approvedGraphSha256;
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
      agencyGraphApproved &&
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
        relation.sourceSupportKeys.length > 0 &&
        relation.sourceSupportKeys.every((supportKey) => relation.sourceIds.some(
          (sourceId) => sourceById.get(sourceId)?.supportsGenerally.includes(supportKey)
        )) &&
        relation.sourceIds.every((sourceId) => relation.sourceSupportKeys.some(
          (supportKey) => sourceById.get(sourceId)?.supportsGenerally.includes(supportKey)
        )) &&
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
      kcTownHallComplete &&
      marchResearchAligned &&
      institutionalCapacityComplete &&
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
        institutionalCapacityComplete &&
        kcTownHallComplete &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        fieldPracticeComplete &&
        pressIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length >= 3 && item.sourceIds.length > 1 && item.observationIds.length)
      ),
      evidence: [`${pilotIntakes.filter(Boolean).length} original pilot intakes, ${expansionIntakes.filter(Boolean).length}/${expansion.expectedSourceCount} first-expansion intakes, ${secondExpansionIntakes.filter(Boolean).length}/${secondExpansion.expectedSourceCount} second-expansion intakes, one institutional-capacity analysis, one bounded KC Town Hall funding lifecycle, ${archiveIntakes.filter(Boolean).length}/${archive.expectedIntakeCount} working-archive intakes, ${googleDriveIntakes.filter(Boolean).length}/${googleDrive.expectedIntakeCount} Shared Drive intakes, and ${pressIntakes.filter(Boolean).length}/${pressArchive.expectedIndexCount} press-index intakes retain dispositions, observations, and boundaries`]
    },
    {
      criterionId: "KB-EVAL-ATOMICITY",
      score: score(
        allEvaluatedObservations.length >= 30 &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        fieldPracticeComplete &&
        allEvaluatedObservations.every((item) => item?.locator && item.limitations.length && (item.claimIds.length || item.researchInquiryIds.length))
      ),
      evidence: [`${allEvaluatedObservations.filter(Boolean).length} proposition-level observations have locators, limitations, and claim or inquiry links`]
    },
    {
      criterionId: "KB-EVAL-SCOPE",
      score: score(
        [...pilotSources, ...expansionSources, ...secondExpansionSources, ...pressIndexSources, ...pressArticleSources, ...kcTownHallSources, kcTownHallContributionSource].every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
        expansionSources.length === expansion.expectedSourceCount &&
        secondExpansionSources.length === secondExpansion.expectedSourceCount &&
        institutionalCapacityComplete &&
        kcTownHallComplete &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        fieldPracticeComplete &&
        !errors.some((error) => /does not establish|support a proposition/i.test(error))
      ),
      evidence: [`${expansionSources.filter(Boolean).length + secondExpansionSources.filter(Boolean).length}/${expansion.expectedSourceCount + secondExpansion.expectedSourceCount} source-expansion records, ${pressArticleSources.filter(Boolean).length}/${pressArchive.expectedUniqueArticleCount} distinct press articles, four KC Town Hall government records, ${archiveSources.filter(Boolean).length}/${archive.expectedSourceCount} working-archive sources, and ${googleDriveSources.filter(Boolean).length}/${googleDrive.expectedSourceCount} Shared Drive sources have explicit support and doesNotEstablish boundaries`]
    },
    {
      criterionId: "KB-EVAL-MATURATION",
      score: score(
        allEvaluatedClaims.every((claim) => claim?.evidence.length && claim.boundaries.length && claim.antiClaims.length && claim.reviewedBy.length) &&
        allEvaluatedInquiries.every((inquiry) => inquiry?.limitations.length && inquiry.findings.length) &&
        expansionClaims.length === expansion.claimIds.length &&
        secondExpansionClaims.length === secondExpansion.claimIds.length &&
        institutionalCapacityComplete &&
        kcTownHallComplete &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        fieldPracticeComplete,
        triangulatedExpansionClaims.length >= 8
      ),
      evidence: [`${allExpansionClaims.filter(Boolean).length} source-expansion claims, one repository-backed implementation claim, and the KC Town Hall appropriation lifecycle matured; ${triangulatedExpansionClaims.length} source-expansion claims are supported by multiple source records; ${allEvaluatedInquiries.filter(Boolean).length} evaluated inquiries retain limitations`]
    },
    {
      criterionId: "KB-EVAL-PROJECTION",
      score: score(
        allEvaluatedClaims.every((claim) => claim?.projections.every((projection) => projection.status !== "hold" || projection.surfaces.length === 0)) &&
        selectedExpansionClaims.every((claim) => claim?.projections.some((projection) => projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc"))) &&
        webAuthorshipAligned &&
        marchResearchAligned &&
        institutionalCapacityComplete &&
        kcTownHallComplete &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        fieldPracticeComplete &&
        Boolean(fairRentPage)
      ),
      evidence: [`Held claims have no public surface; ${selectedExpansionClaims.filter(Boolean).length} source-expansion claims and one repository-backed implementation claim have authorized FairRentNYC projections; the KC Town Hall page retains the complete bounded funding lifecycle; four mature creative-technology claims remain held while four archive-supported claims have selected projections`]
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
        kcTownHallComplete &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        fieldPracticeComplete &&
        knowledgeBank.proofCoverageTargets.length === proofClaims.length
      ),
      evidence: [`Hiring-relevant NYCAC assertions, one complete KC Town Hall funding lifecycle, two CRS records, two protected participation-workflow claims, one bounded method claim, and one certificate-backed completion claim have governed projections; ${knowledgeBank.proofCoverageTargets.length}/${proofClaims.length} existing proof claims have evidence-coverage dispositions`]
    },
    {
      criterionId: "KB-EVAL-SAFETY",
      score: score(errors.length === 0 && institutionalCapacityComplete && kcTownHallComplete && archiveProductionComplete && googleDriveComplete && socialMediaComplete && fieldPracticeComplete && knowledgeBank.intakeItems.every((item) => !item.sourceUrl || /^https:\/\//.test(item.sourceUrl))),
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
        institutionalClaim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
        pressClaim?.projections.every((projection) => projection.status === "hold") &&
        pressInquiry?.resultStatus === "partially-recovered" &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        fieldPracticeComplete
      ),
      evidence: [photoChainComplete
        ? `${heldExpansionClaims.length} newly mature claims, four working-archive claims, and the complete press-archive claim remain held beside open inquiries, memory leads, and the protected photo feedback chain`
        : "The canonical photo-feedback chain is incomplete"]
    },
    {
      criterionId: "KB-EVAL-AGENCY",
      score: score(agencyGraphComplete),
      evidence: [agencyGraphComplete
        ? `${agencyRelations.length} source-linked relations distinguish individual, shared, collective, and institutional agency; the KC Board recommendation and Council acceptance and appropriation remain separate institutional actions`
        : "The agency graph has a missing relation, broken reference, unbounded credit claim, or advocacy-to-enactment distortion"]
    },
    {
      criterionId: "KB-EVAL-PRESS-ARCHIVE",
      score: score(pressArchiveComplete),
      evidence: [pressArchiveComplete
        ? `${pressEntries.length} appearances across ${campaignPressInventory.length} campaign indexes resolve to ${uniquePressArticleSourceIds.length} distinct source-specific readings, including ${pressReadingObservations.length} bounded summaries and ${pressAttributionObservations.length} direct-attribution observations; duplicate campaign selection is preserved`
        : "Campaign press inventory is missing an appearance, source, close reading, attribution, boundary, disposition, redirect defense, or exact count"]
    },
    {
      criterionId: "KB-EVAL-SOCIAL-ARCHIVE",
      score: score(socialMediaComplete),
      evidence: [socialMediaComplete
        ? `${projectSocialAccounts.length} project-account relationships, ${socialEngagementEvents.length} named public interaction edges, a CallNYC lower bound of ${callNycCouncilActors.size} serving Council members, and an NYC Artist Coalition lower bound of ${nycacCouncilActors.size} pass account, source, role, authorship, safety, and projection checks`
        : "Social archive is missing an account disposition, named public edge, role check, lower-bound method, collective-authorship boundary, source scope, or governed projection"]
    },
    {
      criterionId: "KB-EVAL-CALLNYC-FULL-POPULATION",
      score: score(callNycFullPopulationComplete),
      evidence: [callNycFullPopulationComplete
        ? `${callNycManifest.population.length} population dispositions preserve ${callNycRecoveredRows.length} recovered objects and ${callNycNotRecoveredRows.length} unresolved records; ${callNycManifest.postedUrlInventory.length} posted URLs, ${callNycManifest.contentSystemSummary.recognitionPostCount} recognition posts, ${callNycManifest.contentSystemSummary.recognitionDistinctIssuePageCount} issue pages, ${callNycCouncilNames.size} Council-member reposters, and ${callNycAuthoredIds.size} member-authored interactions pass completeness, role, attribution, and projection checks`
        : "CallNYC full-population production is missing a disposition, recovered-object boundary, URL, source role, repost attribution limit, Council identity, governed lifecycle record, or selective projection"]
    },
    {
      criterionId: "KB-EVAL-WOWLIST-FULL-POPULATION",
      score: score(wowListFullPopulationComplete),
      evidence: [wowListFullPopulationComplete
        ? `${wowListManifest.population.length} recovered profile objects, ${wowListManifest.postedUrlInventory.length} resolved posted URLs, ${wowListManifest.publicReposterAudit.length} account-owned repost audits, ${wowListDistinctPublicReposters.size} named public reposter accounts, and ${wowListExternalAdoptionIds.size} bounded external-use examples pass completeness, source-role, authorship, traction, and projection checks`
        : "WOW List full-population production is missing a profile object, resolved URL, workflow classification, source role, account-owned engagement boundary, external-use example, governed lifecycle record, or selective projection"]
    },
    {
      criterionId: "KB-EVAL-KCTH-FULL-POPULATION",
      score: score(kcthFullPopulationComplete),
      evidence: [kcthFullPopulationComplete
        ? `All ${kcthFull.expectedProfileCount} surviving profile-count items are recovered through ${kcthRecords.length} unique records; the ledger preserves ${kcthUniqueShortUrls.size} posted short URLs, ${kcthFull.expectedTireWorkflowRecords} tire-workflow records, all ${kcthReposterRows.length} repost-bearing account statuses, ${kcthFull.expectedCouncilReposterAppearances} public appearances by ${kcthDistinctCouncilReposters.size} then-sitting Council-member accounts, and a ${kcthFull.expectedDirectCouncilResponses}-member direct-response floor while keeping outreach, amplification, endorsement, mutable reactions, collective authorship, and private service data bounded`
        : "KC Town Hall full-population production is missing a population object, fresh reconciliation, URL, source role, tire-workflow classification, complete repost audit, official-at-date check, direct-response derivation, metric-owner boundary, collective-authorship limit, private-data exclusion, held depth, or selective projection"]
    },
    {
      criterionId: "KB-EVAL-KCTH-FIELD-PRACTICE",
      score: score(fieldPracticeComplete),
      evidence: [fieldPracticeComplete
        ? `${fieldPracticeObservations.length} atomic observations preserve verified project facts and seven participant-memory propositions across ${fieldPracticeSources.length} bounded sources; all four individual-role claims remain held with protected-source, completion, authorship, service-unit, and collective-credit boundaries`
        : "KC Town Hall field-practice production is missing a proposition, protected-source boundary, evidence relationship, held projection, completion distinction, individual-role limit, privacy check, research inquiry, or proof-coverage link"]
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
    holdout: {
      requiredConsecutivePassingRuns: suite.targets.consecutivePassingRuns,
      consecutivePassingRuns,
      complete: holdoutEvidenceComplete,
      judgeIds: consecutivePassingRuns > 0
        ? holdoutLedger.runs.slice(-consecutivePassingRuns).map((run) => run.judgeId)
        : []
    },
    contentApprovals: {
      kcTownHall: {
        actualSha256: kcTownHallContentSha256,
        approvedSha256: kcTownHall.approvedContentSha256,
        matches: kcTownHallContentSha256 === kcTownHall.approvedContentSha256
      },
      kcTownHallFieldPractice: {
        actualSha256: fieldPracticeContentSha256,
        approvedSha256: fieldPractice.approvedContentSha256,
        matches: fieldPracticeContentSha256 === fieldPractice.approvedContentSha256,
        reviewLocksMatch: fieldPracticeReviewLocksMatch
      },
      archiveProduction: {
        actualSha256: archiveContentSha256,
        approvedSha256: archive.approvedContentSha256,
        matches: archiveContentSha256 === archive.approvedContentSha256
      },
      googleDriveProduction: {
        actualSha256: googleDriveContentSha256,
        approvedSha256: googleDrive.approvedContentSha256,
        matches: googleDriveContentSha256 === googleDrive.approvedContentSha256
      }
    },
    accepted: errors.length === 0 &&
      belowMinimum.length === 0 &&
      weightedScore >= suite.targets.weightedScoreAtLeast &&
      holdoutEvidenceComplete
  };
}
