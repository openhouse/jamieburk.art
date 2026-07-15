import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { nycacPressReadings } from "../../apps/www/src/data/knowledge-bank/nycac-press-readings.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { projectSocialAccounts, socialEngagementEvents, socialMediaProductionJuly2026 } from "../../apps/www/src/data/knowledge-bank/social-media-production-2026-07.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { validateKnowledgeBank } from "./citation-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const suitePath = path.join(repoRoot, "evals/knowledge-bank/evals.json");
const holdoutRunsPath = path.join(repoRoot, "evals/knowledge-bank/holdout-runs.json");
const publicRegistryPath = path.join(repoRoot, "apps/www/src/data/knowledge-bank/public-registry.json");

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
  const kcTownHallSocialSourceIds = [
    "SRC-KCTH-PINNED-2018",
    "SRC-KCTH-SOCIAL-MELISSA-ROBINSON-2020",
    "SRC-KCTH-SOCIAL-COMMUNITY-PARTNER-2019",
    "SRC-KCTH-SOCIAL-JOLIE-JUSTUS-2019"
  ];
  const kcTownHallPageSourceIds = [...kcTownHallProofSourceIds, ...kcTownHallSocialSourceIds];
  const kcTownHallMdx = overrides.kcTownHallMdx ?? readFileSync(
    path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"),
    "utf8"
  );
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
      sameOrderedValues(kcTownHallProofCoverage.sourceIds, kcTownHallProofSourceIds) &&
      sameOrderedValues(kcTownHallProofCoverage.researchInquiryIds, [kcTownHall.inquiryId]) &&
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
        occurrence.id === "social-neighborhood-stewardship" &&
          occurrence.claimId === "CLM-KCTH-SOCIAL-NEIGHBORHOOD-STEWARDSHIP" &&
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
      socialCallNycInquiry.publicSummary?.includes("at least 18") &&
      socialPageProjectionComplete &&
      existsSync(socialProjectNotePath) &&
      socialProjectNote.includes("not a complete lifetime corpus") &&
      socialProjectNote.includes("individual `@NYCArtC` posts") &&
      antiClaimsText.includes("Account identity") &&
      antiClaimsText.includes("Do not convert “account not recovered” into “no account existed.”") &&
      !/\/Users\/|\/Volumes\/|\/private\/tmp|cookie|auth token|session token/i.test(socialArchiveText)
  );
  const allEvaluatedObservations = [...pilotObservations, ...expansionObservations, ...secondExpansionObservations, ...institutionalObservations, ...pressObservations, ...kcTownHallObservations, kcTownHallContributionObservation, kcTownHallTransitionObservation, ...archiveObservations, ...googleDriveObservations, ...socialObservations];
  const allEvaluatedClaims = [...pilotClaims, ...expansionClaims, ...secondExpansionClaims, institutionalClaim, pressClaim, kcTownHallClaim, kcTownHallContributionClaim, ...archiveClaims, ...googleDriveClaims, ...socialClaims];
  const allEvaluatedInquiries = [...pilotInquiries, ...expansionInquiries, ...secondExpansionInquiries, institutionalInquiry, pressInquiry, kcTownHallInquiry, kcTownHallTransitionInquiry, ...archiveInquiries, ...googleDriveInquiries, ...socialInquiries];
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
        socialMediaComplete,
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
        knowledgeBank.proofCoverageTargets.length === proofClaims.length
      ),
      evidence: [`Hiring-relevant NYCAC assertions, one complete KC Town Hall funding lifecycle, two CRS records, two protected participation-workflow claims, one bounded method claim, and one certificate-backed completion claim have governed projections; ${knowledgeBank.proofCoverageTargets.length}/${proofClaims.length} existing proof claims have evidence-coverage dispositions`]
    },
    {
      criterionId: "KB-EVAL-SAFETY",
      score: score(errors.length === 0 && institutionalCapacityComplete && kcTownHallComplete && archiveProductionComplete && googleDriveComplete && socialMediaComplete && knowledgeBank.intakeItems.every((item) => !item.sourceUrl || /^https:\/\//.test(item.sourceUrl))),
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
        socialMediaComplete
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
