import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const PRIVATE_PATTERN = /\/Users\/|\/Volumes\/|\/private\/tmp\/|Mobile Documents|supporting-materials/i;

function weightedScore(rubrics, scores) {
  return Number(
    (
      rubrics.reduce(
        (total, rubric) => total + rubric.weight * (scores[rubric.id] ?? 0),
        0
      ) / 4
    ).toFixed(2)
  );
}

function duplicateIds(records) {
  const seen = new Set();
  return records.map((record) => record.id).filter((id) => seen.has(id) || !seen.add(id));
}

export function validateKnowledgeLifecycle(bank, suite) {
  const findings = [];
  const add = (category, code, message) => findings.push({ category, code, message });
  const projectIds = new Set(bank.projects.map((item) => item.id));
  const entityIds = new Set(bank.entities.map((item) => item.id));
  const intakeIds = new Set(bank.intakeItems.map((item) => item.id));
  const sourceIds = new Set(bank.sources.map((item) => item.id));
  const sourceById = new Map(bank.sources.map((item) => [item.id, item]));
  const claimIds = new Set(bank.claims.map((item) => item.id));
  const inquiryIds = new Set(bank.researchInquiries.map((item) => item.id));
  const correctionIds = new Set(bank.corrections.map((item) => item.id));
  const pageIds = new Set(bank.pages.map((item) => item.id));

  for (const [label, records] of [
    ["intake", bank.intakeItems],
    ["entity", bank.entities],
    ["project", bank.projects],
    ["source", bank.sources],
    ["claim", bank.claims],
    ["inquiry", bank.researchInquiries],
    ["correction", bank.corrections],
    ["citation page", bank.pages],
    ["press collection", bank.pressCollections]
  ]) {
    for (const id of duplicateIds(records)) {
      add("referential_integrity", "duplicate-id", `Duplicate ${label} ID ${id}`);
    }
  }

  if (PRIVATE_PATTERN.test(JSON.stringify(bank))) {
    add("projection_restraint", "private-path", "Knowledge bank contains a private filesystem path");
  }

  const capturedUrls = new Set(
    bank.intakeItems.map((item) => item.submittedUrl).filter(Boolean)
  );
  for (const url of suite.requiredIntakeUrls) {
    if (!capturedUrls.has(url)) {
      add("capture_integrity", "missing-required-intake", `Missing intake for ${url}`);
    }
  }

  for (const item of bank.intakeItems) {
    for (const projectId of item.projectIds) {
      if (!projectIds.has(projectId)) add("project_context", "unknown-project", `${item.id} references ${projectId}`);
    }
    for (const entityId of item.entityIds) {
      if (!entityIds.has(entityId)) add("project_context", "unknown-entity", `${item.id} references ${entityId}`);
    }
    for (const sourceId of item.sourceIds) {
      if (!sourceIds.has(sourceId)) add("referential_integrity", "unknown-source", `${item.id} references ${sourceId}`);
      const source = bank.sources.find((record) => record.id === sourceId);
      if (source && !source.intakeIds.includes(item.id)) {
        add("referential_integrity", "intake-source-mismatch", `${item.id} is absent from ${sourceId}`);
      }
    }
    for (const claimId of item.claimIds) {
      if (!claimIds.has(claimId)) add("referential_integrity", "unknown-claim", `${item.id} references ${claimId}`);
    }
    for (const inquiryId of item.inquiryIds) {
      if (!inquiryIds.has(inquiryId)) add("referential_integrity", "unknown-inquiry", `${item.id} references ${inquiryId}`);
    }
    if (["captured", "triaged"].includes(item.status)) {
      add("capture_integrity", "unfinished-intake", `${item.id} remains ${item.status}`);
    }
  }

  for (const source of bank.sources) {
    for (const projectId of source.projectIds) {
      if (!projectIds.has(projectId)) add("project_context", "unknown-project", `${source.id} references ${projectId}`);
    }
    for (const intakeId of source.intakeIds) {
      if (!intakeIds.has(intakeId)) add("referential_integrity", "unknown-intake", `${source.id} references ${intakeId}`);
      const intake = bank.intakeItems.find((record) => record.id === intakeId);
      if (intake && !intake.sourceIds.includes(source.id)) {
        add("referential_integrity", "source-intake-mismatch", `${source.id} is absent from ${intakeId}`);
      }
    }
    if (source.reviewStatus === "reviewed") {
      if (!source.supportsGenerally.length) add("source_decomposition", "missing-support", `${source.id} has no support scope`);
      if (!source.doesNotEstablish.length) add("source_decomposition", "missing-boundary", `${source.id} has no non-support boundary`);
      if (source.intakeIds.some((id) => id.startsWith("INT-2026-07-13")) && !source.locator) {
        add("source_decomposition", "missing-locator", `${source.id} has no public audit locator`);
      }
    }
    if (source.reviewStatus === "candidate") {
      add("source_decomposition", "unreviewed-source", `${source.id} remains a candidate`);
    }
    if (source.reviewStatus === "blocked") {
      const linkedInquiry = bank.researchInquiries.some(
        (inquiry) => inquiry.sourceIds.includes(source.id) || source.intakeIds.some((id) => inquiry.intakeIds.includes(id))
      );
      if (!linkedInquiry) add("research_honesty", "blocked-without-inquiry", `${source.id} is blocked without a research inquiry`);
    }
  }

  for (const collection of bank.pressCollections) {
    if (!projectIds.has(collection.project)) {
      add("project_context", "unknown-project", `${collection.id} references ${collection.project}`);
    }
    if (!entityIds.has(collection.campaignEntityId)) {
      add("project_context", "unknown-entity", `${collection.id} references ${collection.campaignEntityId}`);
    }
    if (!sourceIds.has(collection.indexSourceId)) {
      add("referential_integrity", "unknown-press-index", `${collection.id} references ${collection.indexSourceId}`);
    } else if (!sourceById.get(collection.indexSourceId)?.reviewDepth) {
      add("source_decomposition", "press-index-missing-review-depth", `${collection.indexSourceId} has no explicit review depth`);
    }
    if (collection.articles.length !== collection.expectedArticleCount) {
      add("capture_integrity", "press-count-mismatch", `${collection.id} expected ${collection.expectedArticleCount} article placements but has ${collection.articles.length}`);
    }
    const positions = collection.articles.map((article) => article.position);
    const expectedPositions = collection.articles.map((_, index) => index + 1);
    if (positions.join(",") !== expectedPositions.join(",")) {
      add("capture_integrity", "press-order-gap", `${collection.id} does not preserve consecutive campaign order`);
    }
    for (const article of collection.articles) {
      if (!sourceIds.has(article.sourceId)) {
        add("referential_integrity", "unknown-press-source", `${collection.id} references ${article.sourceId}`);
      } else if (!sourceById.get(article.sourceId)?.reviewDepth) {
        add("source_decomposition", "press-source-missing-review-depth", `${article.sourceId} has no explicit review depth`);
      }
    }
  }

  for (const required of suite.requiredPressCollections ?? []) {
    const collection = bank.pressCollections.find((item) => item.id === required.id);
    if (!collection) {
      add("capture_integrity", "missing-press-collection", `Missing press collection ${required.id}`);
      continue;
    }
    if (collection.expectedArticleCount !== required.articleCount) {
      add("capture_integrity", "press-contract-mismatch", `${required.id} must contain ${required.articleCount} placements`);
    }
  }
  if (suite.requiredPressSummary) {
    const placements = bank.pressCollections.flatMap((collection) => collection.articles);
    const uniqueSources = new Set(placements.map((article) => article.sourceId));
    if (bank.pressCollections.length !== suite.requiredPressSummary.collectionCount) {
      add("capture_integrity", "press-collection-total", `Expected ${suite.requiredPressSummary.collectionCount} press collections`);
    }
    if (placements.length !== suite.requiredPressSummary.placementCount) {
      add("capture_integrity", "press-placement-total", `Expected ${suite.requiredPressSummary.placementCount} press placements`);
    }
    if (uniqueSources.size !== suite.requiredPressSummary.uniqueArticleCount) {
      add("capture_integrity", "press-unique-total", `Expected ${suite.requiredPressSummary.uniqueArticleCount} unique press sources`);
    }
  }

  if (suite.requiredKcTownHallSequence) {
    const required = suite.requiredKcTownHallSequence;
    if (!projectIds.has(required.projectId)) {
      add("project_context", "missing-kc-town-hall-project", `Missing ${required.projectId}`);
    }
    for (const sourceId of required.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        add("source_decomposition", "missing-kc-town-hall-source", `Missing ${sourceId}`);
      }
    }
    for (const claimId of required.claimIds) {
      if (!claimIds.has(claimId)) {
        add("provenance_closure", "missing-kc-town-hall-claim", `Missing ${claimId}`);
      }
    }
    if (!correctionIds.has(required.correctionId)) {
      add("status_separation", "missing-kc-town-hall-correction", `Missing ${required.correctionId}`);
    }
    if (!pageIds.has(required.pageId)) {
      add("projection_restraint", "missing-kc-town-hall-page", `Missing citation page ${required.pageId}`);
    }

    const presenterClaim = bank.claims.find(
      (claim) => claim.id === "CLM-KC-TOWN-HALL-PRESENTER-ROLE"
    );
    const boardClaim = bank.claims.find(
      (claim) => claim.id === "CLM-KC-TOWN-HALL-BOARD-RECOMMENDATION"
    );
    const acceptanceClaim = bank.claims.find(
      (claim) => claim.id === "CLM-KC-TOWN-HALL-COUNCIL-ACCEPTANCE"
    );
    const roleClaim = bank.claims.find((claim) => claim.id === required.roleClaimId);
    const councilClaim = bank.claims.find(
      (claim) => claim.id === "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"
    );
    const unusedClaim = bank.claims.find(
      (claim) => claim.id === "CLM-KC-TOWN-HALL-UNUSED-ALLOCATION"
    );
    const transitionIntake = bank.intakeItems.find(
      (item) => item.id === required.transitionIntakeId
    );
    const transitionInquiry = bank.researchInquiries.find(
      (item) => item.id === required.transitionInquiryId
    );
    const councilSequenceInquiry = bank.researchInquiries.find(
      (item) => item.id === "INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"
    );
    const page = bank.pages.find((item) => item.id === required.pageId);

    if (!transitionIntake) {
      add("capture_integrity", "kc-transition-intake", `Missing ${required.transitionIntakeId}`);
    } else if (
      transitionIntake.kind !== "memory" ||
      transitionIntake.status !== "deferred" ||
      transitionIntake.sensitivity !== "public-safe" ||
      !transitionIntake.publicSafeDescription.includes("mission-aligned organization") ||
      transitionIntake.inquiryIds.length !== 1 ||
      transitionIntake.inquiryIds[0] !== required.transitionInquiryId
    ) {
      add("capture_integrity", "kc-transition-intake", `${required.transitionIntakeId} does not preserve the public-safe deferred memory posture`);
    }
    if (!transitionInquiry) {
      add("research_honesty", "kc-transition-inquiry", `Missing ${required.transitionInquiryId}`);
    } else if (
      transitionInquiry.resultStatus !== "inconclusive" ||
      transitionInquiry.sourceIds.length > 0 ||
      !transitionInquiry.limitations.some((item) => /corroborating public source|recipient confirmation/i.test(item))
    ) {
      add("research_honesty", "kc-transition-inquiry", `${required.transitionInquiryId} overstates the uncorroborated transition memory`);
    }
    if (councilSequenceInquiry?.intakeIds.includes(required.transitionIntakeId)) {
      add("provenance_closure", "kc-transition-inquiry-crosslink", `${required.transitionIntakeId} is incorrectly attached to the recovered Council-sequence inquiry`);
    }

    if (
      roleClaim &&
      !roleClaim.evidence.some(
        (evidence) =>
          evidence.sourceId === required.roleSourceId &&
          evidence.relationship === "direct-support"
      )
    ) {
      add("provenance_closure", "kc-role-evidence", `${roleClaim.id} lacks direct support from ${required.roleSourceId}`);
    }
    if (roleClaim) {
      const publicText = roleClaim.projections.map((projection) => projection.text).join(" ");
      if (/\b(solely|single-handedly|independently verified)\b/i.test(publicText)) {
        add("projection_restraint", "kc-role-overclaim", `${roleClaim.id} strengthens an attributed role into an unsupported exclusive or independently verified claim`);
      }
      if (!roleClaim.boundaries.some((boundary) => /approved public account|not independent/i.test(boundary))) {
        add("research_honesty", "kc-role-attribution-boundary", `${roleClaim.id} does not identify the approved resume as a first-party account`);
      }
      if (
        roleClaim.projections.some(
          (projection) =>
            projection.status === "active" &&
            !/approved public resume|resume describes|according to/i.test(projection.text)
        )
      ) {
        add("projection_restraint", "kc-role-attribution-loss", `${roleClaim.id} drops first-party attribution from an active public projection`);
      }
    }

    if (
      presenterClaim &&
      !presenterClaim.evidence.some(
        (evidence) =>
          evidence.sourceId === "SRC-KC-TOWN-HALL-CCED-BOARD-PACKET-2019" &&
          evidence.relationship === "direct-support"
      )
    ) {
      add("provenance_closure", "kc-presenter-evidence", "KC Town Hall presenter claim lacks direct Board-packet support");
    }
    if (
      boardClaim &&
      !boardClaim.evidence.some(
        (evidence) =>
          evidence.sourceId === "SRC-KC-TOWN-HALL-CCED-BOARD-PACKET-2019" &&
          evidence.relationship === "direct-support"
      )
    ) {
      add("provenance_closure", "kc-board-recommendation-evidence", "KC Town Hall Board recommendation claim lacks direct Board-packet support");
    }
    if (boardClaim && !boardClaim.boundaries.some((boundary) => /Board, not.*City Council|belong to the CCED Board/i.test(boundary))) {
      add("research_honesty", "kc-board-council-actor-boundary", `${boardClaim.id} does not separate the Board vote from the Council action`);
    }

    if (acceptanceClaim) {
      const evidenceIds = new Set(
        acceptanceClaim.evidence
          .filter((evidence) => evidence.relationship === "direct-support")
          .map((evidence) => evidence.sourceId)
      );
      for (const sourceId of required.requiredAcceptanceEvidenceIds) {
        if (!evidenceIds.has(sourceId)) {
          add("provenance_closure", "kc-council-acceptance-evidence", `${acceptanceClaim.id} lacks direct support from ${sourceId}`);
        }
      }
    }

    if (councilClaim) {
      const evidenceIds = new Set(councilClaim.evidence.map((evidence) => evidence.sourceId));
      for (const sourceId of required.requiredAppropriationEvidenceIds) {
        if (!evidenceIds.has(sourceId)) {
          add("provenance_closure", "kc-council-evidence", `${councilClaim.id} lacks direct support from ${sourceId}`);
        }
      }
      if (!councilClaim.evidence.some(
        (evidence) =>
          evidence.sourceId === "SRC-KC-TOWN-HALL-ORDINANCE-190642" &&
          evidence.relationship === "direct-support"
      )) {
        add("provenance_closure", "kc-appropriation-ordinance-evidence", `${councilClaim.id} lacks direct ordinance support for appropriation`);
      }
      if (!councilClaim.boundaries.some((boundary) => /disbursement|receipt/i.test(boundary))) {
        add("status_separation", "kc-appropriation-boundary", `${councilClaim.id} does not separate appropriation from disbursement or receipt`);
      }
      if (!councilClaim.antiClaims.some((antiClaim) => /unanimous/i.test(antiClaim))) {
        add("research_honesty", "kc-council-vote-boundary", `${councilClaim.id} does not block an unsupported Council unanimity claim`);
      }
      const publicText = councilClaim.projections.map((projection) => projection.text).join(" ");
      if (/\b(received|disbursed|spent|completed|unanimous)\b/i.test(publicText)) {
        add("projection_restraint", "kc-funding-overclaim", `${councilClaim.id} strengthens appropriation into an unsupported downstream claim`);
      }
    }

    if (
      unusedClaim &&
      !unusedClaim.evidence.some(
        (evidence) =>
          evidence.sourceId === "SRC-KC-TOWN-HALL-ORDINANCE-240317" &&
          evidence.relationship === "direct-support"
      )
    ) {
      add("provenance_closure", "kc-unused-allocation-evidence", `${unusedClaim.id} lacks direct Ordinance 240317 support`);
    }
    if (unusedClaim && !unusedClaim.boundaries.some((boundary) => /responsibility|why/i.test(boundary))) {
      add("research_honesty", "kc-withdrawal-causality", `${unusedClaim.id} does not preserve the withdrawal-causality boundary`);
    }
    if (
      unusedClaim &&
      (unusedClaim.editorialStatus !== "unused" ||
        unusedClaim.projections.some((projection) => projection.status === "active"))
    ) {
      add("projection_restraint", "kc-disposition-public-conclusion", `${unusedClaim.id} should remain mature but editorially unused`);
    }

    if (page) {
      const occurrenceClaimIds = new Set(page.occurrences.map((occurrence) => occurrence.claimId));
      for (const claimId of required.publicClaimIds) {
        if (!occurrenceClaimIds.has(claimId)) {
          add("projection_restraint", "kc-missing-citation", `${required.pageId} does not cite ${claimId}`);
        }
      }
      if (
        occurrenceClaimIds.has("CLM-KC-TOWN-HALL-UNUSED-ALLOCATION") ||
        page.sourceOrder.includes("SRC-KC-TOWN-HALL-ORDINANCE-240317")
      ) {
        add("projection_restraint", "kc-disposition-public-conclusion", `${required.pageId} composes the later administrative disposition as its public conclusion`);
      }
    }
  }

  if (suite.requiredIcloudArchiveProduction) {
    const required = suite.requiredIcloudArchiveProduction;
    const requiredIntakes = required.intakeIds
      .map((id) => bank.intakeItems.find((item) => item.id === id))
      .filter(Boolean);
    const requiredSources = required.sourceIds
      .map((id) => bank.sources.find((item) => item.id === id))
      .filter(Boolean);
    const requiredClaims = required.claimIds
      .map((id) => bank.claims.find((item) => item.id === id))
      .filter(Boolean);

    for (const projectId of required.projectIds) {
      if (!projectIds.has(projectId)) {
        add("project_context", "missing-icloud-project", `Missing ${projectId}`);
      }
    }
    for (const intakeId of required.intakeIds) {
      if (!intakeIds.has(intakeId)) {
        add("capture_integrity", "missing-icloud-intake", `Missing ${intakeId}`);
      }
    }
    for (const sourceId of required.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        add("source_decomposition", "missing-icloud-source", `Missing ${sourceId}`);
      }
    }
    for (const claimId of required.claimIds) {
      if (!claimIds.has(claimId)) {
        add("provenance_closure", "missing-icloud-claim", `Missing ${claimId}`);
      }
    }

    for (const url of required.publicIntakeUrls) {
      const intake = bank.intakeItems.find((item) => item.submittedUrl === url);
      if (!intake || intake.status !== "promoted" || intake.sensitivity !== "public-safe") {
        add("capture_integrity", "icloud-public-intake", `Public archive lead is not promoted safely: ${url}`);
      }
    }

    for (const intakeId of required.privateIntakeIds) {
      const intake = bank.intakeItems.find((item) => item.id === intakeId);
      if (!intake) continue;
      if (
        intake.sensitivity === "public-safe" ||
        intake.availability !== "local-private" ||
        !intake.protectedLocatorId ||
        intake.submittedUrl
      ) {
        add("projection_restraint", "icloud-private-intake-boundary", `${intakeId} does not preserve the private archive boundary`);
      }
    }

    for (const source of requiredSources) {
      if (
        source.reviewStatus !== "reviewed" ||
        source.reviewDepth !== "close-reading" ||
        !source.locator ||
        !source.supportsGenerally.length ||
        !source.doesNotEstablish.length
      ) {
        add("source_decomposition", "icloud-source-close-reading", `${source.id} lacks a complete close-reading record`);
      }
      if (source.visibility !== "public") {
        if (
          !source.protectedLocatorId ||
          source.canonicalUrl ||
          source.archiveUrl ||
          source.assetUrl ||
          source.preservationStatus !== "private"
        ) {
          add("projection_restraint", "icloud-private-source-boundary", `${source.id} exposes or misclassifies a private archive source`);
        }
      }
    }

    for (const claim of requiredClaims) {
      if (!claim.evidence.length || !claim.boundaries.length || !claim.antiClaims.length) {
        add("provenance_closure", "icloud-claim-boundary", `${claim.id} lacks evidence, boundaries, or anti-claims`);
      }
      if (claim.projections.some((projection) => projection.status === "active")) {
        add("projection_restraint", "icloud-premature-projection", `${claim.id} was selected for public composition during an archival-production pass`);
      }
      for (const evidence of claim.evidence) {
        const source = sourceById.get(evidence.sourceId);
        if (source?.visibility !== "public" && (evidence.relationship !== "private-support" || evidence.renderCitation)) {
          add("projection_restraint", "icloud-private-evidence-projection", `${claim.id} does not keep ${evidence.sourceId} private`);
        }
      }
    }

    for (const claimId of required.internalOnlyClaimIds) {
      const claim = bank.claims.find((item) => item.id === claimId);
      if (claim && claim.publicationStatus !== "internal-only") {
        add("status_separation", "icloud-live-work-publication", `${claimId} must remain internal-only`);
      }
    }

    const collectiveCreditClaim = bank.claims.find(
      (item) => item.id === required.collectiveCreditClaimId
    );
    if (
      collectiveCreditClaim &&
      (!/Drew Bolton/.test(collectiveCreditClaim.internalClaim) ||
        !/Garrett Fuselier/.test(collectiveCreditClaim.internalClaim) ||
        !/Mary Nichols/.test(collectiveCreditClaim.internalClaim) ||
        !collectiveCreditClaim.evidence.some((item) => item.sourceId === "SRC-NTER-CHNG-PITCH-2010") ||
        !collectiveCreditClaim.evidence.some((item) => item.sourceId === "SRC-NTER-CHNG-VIMEO-2011"))
    ) {
      add("research_honesty", "icloud-collective-credit", `${required.collectiveCreditClaimId} loses collaborator credit or source triangulation`);
    }

    const collectivePolicyClaim = bank.claims.find(
      (item) => item.id === required.collectivePolicyClaimId
    );
    if (
      collectivePolicyClaim &&
      (!/collective/i.test(collectivePolicyClaim.internalClaim) ||
        !collectivePolicyClaim.antiClaims.some((item) => /alone|sole/i.test(item)))
    ) {
      add("research_honesty", "icloud-collective-policy-credit", `${required.collectivePolicyClaimId} converts a collective record into individual authorship`);
    }

    const proposalClaim = bank.claims.find((item) => item.id === required.proposalClaimId);
    if (
      proposalClaim &&
      (!proposalClaim.boundaries.some((item) => /not completion|not.*completed|not.*client adoption/i.test(item)) ||
        !proposalClaim.antiClaims.some((item) => /production AI memory platform/i.test(item)))
    ) {
      add("research_honesty", "icloud-proposal-outcome-boundary", `${required.proposalClaimId} turns an engagement design into a delivered outcome`);
    }

    const verificationInquiry = bank.researchInquiries.find(
      (item) => item.id === required.verificationInquiryId
    );
    if (
      !verificationInquiry ||
      verificationInquiry.resultStatus !== "partially-recovered" ||
      !verificationInquiry.limitations.some((item) => /not independent verification/i.test(item))
    ) {
      add("research_honesty", "icloud-job-hunt-orientation", `${required.verificationInquiryId} does not keep the job-hunt outline in its research-orientation role`);
    }
  }

  if (suite.requiredSocialArchiveProduction) {
    const required = suite.requiredSocialArchiveProduction;
    for (const projectId of required.projectIds) {
      if (!projectIds.has(projectId)) add("project_context", "missing-social-project", `Missing ${projectId}`);
    }
    for (const intakeId of required.intakeIds) {
      if (!intakeIds.has(intakeId)) add("capture_integrity", "missing-social-intake", `Missing ${intakeId}`);
    }
    for (const sourceId of required.sourceIds) {
      const source = sourceById.get(sourceId);
      if (!source) {
        add("source_decomposition", "missing-social-source", `Missing ${sourceId}`);
      } else if (
        !source.locator ||
        !source.supportsGenerally.length ||
        !source.doesNotEstablish.length ||
        !["reviewed", "blocked"].includes(source.reviewStatus)
      ) {
        add("source_decomposition", "social-source-boundary", `${sourceId} lacks review scope or non-support boundaries`);
      }
    }
    for (const claimId of required.claimIds) {
      if (!claimIds.has(claimId)) add("provenance_closure", "missing-social-claim", `Missing ${claimId}`);
    }
    for (const inquiryId of required.inquiryIds) {
      if (!inquiryIds.has(inquiryId)) add("research_honesty", "missing-social-inquiry", `Missing ${inquiryId}`);
    }

    for (const population of required.completePopulations) {
      const claim = bank.claims.find((item) => item.id === population.claimId);
      const profile = sourceById.get(population.profileSourceId);
      const corpus = sourceById.get(population.corpusSourceId);
      const expected = String(population.count);
      if (
        !claim ||
        !profile ||
        !corpus ||
        !claim.internalClaim.includes(expected) ||
        !profile.publicNote.includes(expected) ||
        !corpus.publicNote.includes(expected) ||
        !claim.evidence.some((item) => item.sourceId === population.profileSourceId) ||
        !claim.evidence.some((item) => item.sourceId === population.corpusSourceId)
      ) {
        add("capture_integrity", "social-population-reconciliation", `${population.claimId} does not reconcile its complete current population`);
      }
      if (
        claim &&
        (claim.publicationStatus !== "internal-only" || claim.projections.some((projection) => projection.status === "active"))
      ) {
        add("projection_restraint", "social-population-as-impact", `${population.claimId} turns a current-account inventory into public impact copy`);
      }
      if (
        corpus &&
        (corpus.visibility === "public" ||
          corpus.preservationStatus !== "private" ||
          !corpus.protectedLocatorId ||
          corpus.canonicalUrl ||
          corpus.archiveUrl ||
          corpus.assetUrl)
      ) {
        add("projection_restraint", "social-corpus-boundary", `${population.corpusSourceId} exposes the private research corpus`);
      }
    }

    const callRequired = required.callNyc;
    const callInquiry = bank.researchInquiries.find((item) => item.id === callRequired.inquiryId);
    const callClaim = bank.claims.find((item) => item.id === callRequired.amplificationClaimId);
    const callCorpus = sourceById.get("SRC-X-CALLNYC-CORPUS-2026");
    const callNumbers = [callRequired.profileCount, callRequired.recoveredCount]
      .map((value) => String(value));
    if (
      !callInquiry ||
      callInquiry.resultStatus !== "partially-recovered" ||
      !callNumbers.every((value) => JSON.stringify(callInquiry).includes(value)) ||
      !callInquiry.limitations.some((item) => /gap|unavailable|100-percent/i.test(item))
    ) {
      add("research_honesty", "callnyc-population-gap", `${callRequired.inquiryId} does not preserve the 107-of-110 retrieval boundary`);
    }
    if (
      callCorpus &&
      (callCorpus.visibility === "public" || !callCorpus.protectedLocatorId || !callCorpus.doesNotEstablish.some((item) => /three unavailable posts/i.test(item)))
    ) {
      add("projection_restraint", "callnyc-corpus-boundary", "CallNYC corpus must remain private and explicitly incomplete");
    }
    const callEvidenceIds = new Set(callClaim?.evidence.map((item) => item.sourceId) ?? []);
    if (
      !callClaim ||
      !/^At least four\b/.test(callClaim.internalClaim) ||
      ![...callRequired.postSourceIds, ...callRequired.personSourceIds].every((id) => callEvidenceIds.has(id)) ||
      !callClaim.boundaries.some((item) => /likes|complete engagement roster|private analytics/i.test(item)) ||
      !callClaim.antiClaims.some((item) => /formally endorsed|official product|adopted/i.test(item))
    ) {
      add("research_honesty", "callnyc-amplification-boundary", `${callRequired.amplificationClaimId} overstates or under-sources Council-member amplification`);
    }

    const nycRequired = required.nycArtC;
    const nycClaim = bank.claims.find((item) => item.id === nycRequired.negativeClaimId);
    const nycInquiry = bank.researchInquiries.find((item) => item.id === nycRequired.inquiryId);
    const nycMemory = bank.intakeItems.find((item) => item.id === nycRequired.memoryIntakeId);
    const nycRoleInquiry = bank.researchInquiries.find((item) => item.id === nycRequired.roleInquiryId);
    const nycText = JSON.stringify([nycClaim, nycInquiry]).replaceAll(",", "");
    if (
      !nycClaim ||
      nycClaim.status !== "not-recovered" ||
      nycClaim.publicationStatus !== "internal-only" ||
      nycClaim.projections.some((projection) => projection.status === "active") ||
      ![nycRequired.profileCount, nycRequired.recoveredCount, nycRequired.gap].every((value) => nycText.includes(String(value))) ||
      !nycClaim.antiClaims.some((item) => /full.*population|population-wide/i.test(item))
    ) {
      add("research_honesty", "nycartc-population-boundary", `${nycRequired.negativeClaimId} does not preserve the incomplete 748-of-5124 recovery`);
    }
    if (
      !nycInquiry ||
      nycInquiry.resultStatus !== "partially-recovered" ||
      !nycInquiry.limitations.some((item) => /official account archive|API export/i.test(item))
    ) {
      add("research_honesty", "nycartc-recovery-method", `${nycRequired.inquiryId} lacks the official-export next step`);
    }
    if (
      !nycMemory ||
      nycMemory.status !== "deferred" ||
      nycMemory.claimIds.length ||
      !nycRoleInquiry ||
      !nycRoleInquiry.limitations.some((item) => /Olympia Kazi|account contributors|multi-author/i.test(item))
    ) {
      add("research_honesty", "nycartc-account-credit", "NYCArtC account-establishment memory must remain deferred and preserve multi-author credit");
    }

    const kcCorpus = sourceById.get("SRC-X-KC-TOWN-HALL-CORPUS-2026");
    if (!kcCorpus?.doesNotEstablish.some((item) => /mentions were replies or endorsements/i.test(item))) {
      add("research_honesty", "social-mention-engagement", "Project-account mentions must not be counted as stakeholder engagement");
    }
  }

  if (suite.requiredFacebookEventsArchiveProduction) {
    const required = suite.requiredFacebookEventsArchiveProduction;
    const intake = bank.intakeItems.find((item) => item.id === required.intakeId);
    const memoryIntake = bank.intakeItems.find((item) => item.id === required.memoryIntakeId);
    const control = sourceById.get(required.controlSourceId);
    const corpus = sourceById.get(required.corpusSourceId);
    const linkSource = sourceById.get(required.linkSourceId);
    const roleSource = sourceById.get(required.roleSourceId);
    const attendanceSource = sourceById.get(required.independentAttendanceSourceId);
    const inquiry = bank.researchInquiries.find((item) => item.id === required.inquiryId);
    const populationClaim = bank.claims.find((item) => item.id === required.populationClaimId);
    const participationClaim = bank.claims.find((item) => item.id === required.participationClaimId);
    const responseClaim = bank.claims.find((item) => item.id === required.responseClaimId);
    const routingClaim = bank.claims.find((item) => item.id === required.sourceRoutingClaimId);
    const officialClaim = bank.claims.find((item) => item.id === required.officialProgramClaimId);
    const eventSources = required.eventIds
      .map((eventId) => sourceById.get(`SRC-FB-NYCARTC-EVENT-${eventId}`))
      .filter(Boolean);
    const eventEntities = required.eventIds
      .map((eventId) => bank.entities.find((item) => item.id === `facebook-nycartc-event-${eventId}`))
      .filter(Boolean);

    if (!intake || intake.status !== "promoted" || !intake.protectedLocatorId) {
      add("capture_integrity", "facebook-event-intake", `${required.intakeId} is missing or not safely promoted`);
    }
    if (eventSources.length !== required.recoveredCount || eventEntities.length !== required.recoveredCount) {
      add("capture_integrity", "facebook-event-population", `Expected ${required.recoveredCount} event sources and entities`);
    }
    for (const eventId of required.eventIds) {
      const source = sourceById.get(`SRC-FB-NYCARTC-EVENT-${eventId}`);
      const detailAvailability = source?.locator?.split(";")[0];
      const reviewMatchesAvailability =
        (detailAvailability === "substantive-current-body" && source?.visibility === "public" && source?.preservationStatus === "live" && source?.reviewDepth === "close-reading") ||
        (detailAvailability === "bounded-permalink-facts-only" && source?.visibility === "public" && source?.preservationStatus === "live" && source?.reviewDepth === "metadata") ||
        (detailAvailability === "list-record-only" && source?.visibility === "public" && source?.preservationStatus === "dead" && source?.reviewDepth === "metadata");
      if (
        !source ||
        source.reviewStatus !== "reviewed" ||
        !reviewMatchesAvailability ||
        source.canonicalUrl !== `https://www.facebook.com/events/${eventId}/` ||
        !source.supportsGenerally.length ||
        /people responded/i.test(source.publicNote ?? "") ||
        !source.doesNotEstablish.some((item) => /attendance|unique people/i.test(item)) ||
        !source.doesNotEstablish.some((item) => /Jamie.*authorship|individual event page/i.test(item))
      ) {
        add("source_decomposition", "facebook-event-source", `Event ${eventId} lacks an availability-matched review depth, public source, or response/authorship boundary`);
      }
    }

    const directSources = eventSources.filter((source) => /direct-card-host/.test(source.locator ?? ""));
    const associatedSources = eventSources.filter((source) => /page-associated/.test(source.locator ?? ""));
    const recurringSources = eventSources.filter((source) => source.supportsGenerally.includes("recurring coalition meeting"));
    if (directSources.length !== required.directHostCount || associatedSources.length !== required.associatedCount) {
      add("project_context", "facebook-event-relationship-count", `Expected ${required.directHostCount} direct and ${required.associatedCount} associated event records`);
    }
    if (recurringSources.length !== required.recurringMeetingCount) {
      add("project_context", "facebook-event-recurring-count", `Expected ${required.recurringMeetingCount} recurring meeting records`);
    }
    for (const eventId of required.associatedEventIds) {
      const source = sourceById.get(`SRC-FB-NYCARTC-EVENT-${eventId}`);
      if (!source?.doesNotEstablish.some((item) => /association alone.*hosted|association alone.*co-hosted/i.test(item))) {
        add("research_honesty", "facebook-event-host-boundary", `${eventId} turns Page association into coalition hosting`);
      }
    }
    for (const eventId of required.stakeholderEventIds) {
      const source = sourceById.get(`SRC-FB-NYCARTC-EVENT-${eventId}`);
      if (
        !source?.supportsGenerally.some((item) => /scheduled public stakeholders/i.test(item)) ||
        !source.doesNotEstablish.some((item) => /named or scheduled stakeholder attended/i.test(item))
      ) {
        add("research_honesty", "facebook-event-stakeholder-boundary", `${eventId} does not separate scheduled stakeholders from attendance`);
      }
    }

    if (
      !control ||
      control.visibility !== "public" ||
      !control.publicNote?.includes(String(required.recoveredCount)) ||
      !control.publicNote?.includes(String(required.hostCardCount))
    ) {
      add("source_decomposition", "facebook-event-control", `${required.controlSourceId} does not preserve the 33-of-34 control`);
    }
    if (
      !corpus ||
      corpus.visibility === "public" ||
      corpus.preservationStatus !== "private" ||
      !corpus.protectedLocatorId ||
      corpus.canonicalUrl ||
      corpus.archiveUrl ||
      corpus.assetUrl
    ) {
      add("projection_restraint", "facebook-event-corpus", `${required.corpusSourceId} exposes the private research corpus`);
    }
    if (
      !linkSource ||
      linkSource.visibility === "public" ||
      !linkSource.protectedLocatorId ||
      !linkSource.doesNotEstablish.some((item) => /truth of every linked proposition/i.test(item))
    ) {
      add("projection_restraint", "facebook-event-links", `${required.linkSourceId} treats posted links as public proof or exposes the raw inventory`);
    }
    if (
      !roleSource ||
      roleSource.visibility !== "protected" ||
      roleSource.preservationStatus !== "private" ||
      !roleSource.protectedLocatorId ||
      !roleSource.doesNotEstablish.some((item) => /sole organization|individual authorship/i.test(item))
    ) {
      add("projection_restraint", "facebook-event-role-source", `${required.roleSourceId} loses its first-party or collective-credit boundary`);
    }
    if (
      !memoryIntake ||
      memoryIntake.status !== "promoted" ||
      !memoryIntake.sourceIds.includes(required.roleSourceId) ||
      !memoryIntake.claimIds.includes(required.participationClaimId)
    ) {
      add("provenance_closure", "facebook-event-role-intake", `${required.memoryIntakeId} is not linked to the bounded role source and claim`);
    }

    if (
      !populationClaim ||
      populationClaim.publicationStatus !== "internal-only" ||
      populationClaim.projections.some((projection) => projection.status === "active") ||
      ![required.hostCardCount, required.recoveredCount, required.unresolvedCount].every((count) => JSON.stringify(populationClaim).includes(String(count))) ||
      !populationClaim.antiClaims.some((item) => /All 34 event records|every event ever/i.test(item))
    ) {
      add("research_honesty", "facebook-event-population-claim", `${required.populationClaimId} overstates the recovered population`);
    }
    if (
      !participationClaim ||
      participationClaim.claimType !== "attributed-description" ||
      participationClaim.status !== "confirmed-with-boundary" ||
      participationClaim.publicationStatus !== "qualified" ||
      participationClaim.editorialStatus !== "active" ||
      !participationClaim.projections.some((projection) => projection.status === "active" && /Jamie describes.*help(?:ed|ing) establish and produce/i.test(projection.text)) ||
      !participationClaim.boundaries.some((item) => /first-person.*not.*exact production/i.test(item)) ||
      !participationClaim.boundaries.some((item) => /collectively|not sole|not.*authorship/i.test(item)) ||
      !participationClaim.antiClaims.some((item) => /Jamie alone|every event page|caused legislation/i.test(item)) ||
      !participationClaim.evidence.some((item) => item.sourceId === required.roleSourceId && item.relationship === "private-support") ||
      !participationClaim.evidence.some((item) => item.sourceId === required.independentAttendanceSourceId && item.relationship === "corroborating")
    ) {
      add("projection_restraint", "facebook-event-participation-claim", `${required.participationClaimId} loses the bounded contribution or collective-credit posture`);
    }
    if (
      !attendanceSource ||
      !attendanceSource.supportsGenerally.some((item) => /approximately one hundred/i.test(item)) ||
      !attendanceSource.doesNotEstablish.some((item) => /Facebook response totals as attendance/i.test(item))
    ) {
      add("provenance_closure", "facebook-event-attendance-source", `${required.independentAttendanceSourceId} does not support the bounded attendance report`);
    }
    if (
      !responseClaim ||
      responseClaim.publicationStatus !== "internal-only" ||
      responseClaim.projections.some((projection) => projection.status === "active") ||
      !responseClaim.boundaries.some((item) => /do not establish.*attendance|not.*attendance|Do not sum/i.test(item)) ||
      !responseClaim.antiClaims.some((item) => /1.7K people attended|sum of all Facebook responses/i.test(item))
    ) {
      add("projection_restraint", "facebook-event-response-boundary", `${required.responseClaimId} converts response signals into attendance or impact`);
    }
    if (
      !routingClaim ||
      routingClaim.publicationStatus !== "internal-only" ||
      !routingClaim.boundaries.some((item) => /not automatic corroboration|research lead/i.test(item)) ||
      !routingClaim.evidence.some((item) => item.sourceId === required.linkSourceId && item.relationship === "private-support")
    ) {
      add("research_honesty", "facebook-event-source-routing", `${required.sourceRoutingClaimId} treats posted URLs as claim proof`);
    }
    if (
      !officialClaim ||
      !officialClaim.boundaries.some((item) => /does not prove attendance/i.test(item)) ||
      !officialClaim.antiClaims.some((item) => /Every named official attended/i.test(item))
    ) {
      add("research_honesty", "facebook-event-official-boundary", `${required.officialProgramClaimId} converts scheduled officials into attendance or endorsement`);
    }

    const inquiryText = JSON.stringify(inquiry ?? {});
    if (
      !inquiry ||
      inquiry.resultStatus !== "partially-recovered" ||
      ![required.hostCardCount, required.recoveredCount, required.unresolvedCount, required.directHostCount, required.associatedCount, required.recurringMeetingCount, required.physicalVenueCount, required.virtualMeetingCount].every((count) => inquiryText.includes(String(count))) ||
      !inquiry.limitations.some((item) => /official Meta.*export/i.test(item)) ||
      !inquiry.limitations.some((item) => /response.*not.*attendance|response displays are not/i.test(item))
    ) {
      add("research_honesty", "facebook-event-inquiry", `${required.inquiryId} does not preserve the complete accounting and unresolved boundary`);
    }
    const fairRentPage = bank.pages.find((page) => page.id === "fair-rent-nyc");
    if (!fairRentPage?.occurrences.some((occurrence) => occurrence.claimId === required.participationClaimId)) {
      add("provenance_closure", "facebook-event-projection", `${required.participationClaimId} is active without a page citation plan`);
    }
  }

  if (suite.requiredPersonalWowlistFacebookEvents) {
    const required = suite.requiredPersonalWowlistFacebookEvents;
    for (const intakeId of required.intakeIds) {
      if (!intakeIds.has(intakeId)) {
        add("capture_integrity", "missing-personal-facebook-event-intake", `Missing ${intakeId}`);
      }
    }
    for (const sourceId of required.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        add("source_decomposition", "missing-personal-facebook-event-source", `Missing ${sourceId}`);
      }
    }
    for (const claimId of required.claimIds) {
      if (!claimIds.has(claimId)) {
        add("provenance_closure", "missing-personal-facebook-event-claim", `Missing ${claimId}`);
      }
    }
    for (const inquiryId of required.inquiryIds) {
      if (!inquiryIds.has(inquiryId)) {
        add("research_honesty", "missing-personal-facebook-event-inquiry", `Missing ${inquiryId}`);
      }
    }

    const primaryIntake = bank.intakeItems.find(
      (item) => item.id === required.intakeIds[0]
    );
    if (
      !primaryIntake ||
      primaryIntake.sensitivity !== "protected-reference" ||
      primaryIntake.availability !== "local-private" ||
      !primaryIntake.protectedLocatorId ||
      primaryIntake.submittedUrl
    ) {
      add(
        "projection_restraint",
        "personal-facebook-event-intake-boundary",
        `${required.intakeIds[0]} exposes the protected personal event corpus`
      );
    }

    const associationSource = sourceById.get(
      "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026"
    );
    const hostedSource = sourceById.get(
      "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026"
    );
    const practiceSource = sourceById.get(
      "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026"
    );
    if (
      !associationSource ||
      associationSource.visibility !== "protected" ||
      associationSource.preservationStatus !== "private" ||
      !associationSource.protectedLocatorId ||
      !associationSource.supportsGenerally.some((item) => item.includes(String(required.pastCount))) ||
      !associationSource.supportsGenerally.some((item) => item.includes(String(required.pastJamieDisplayedHostCount)) && item.includes(String(required.pastOtherDisplayedHostCount))) ||
      !associationSource.supportsGenerally.some((item) => item.includes(String(required.distinctPastHostLabels))) ||
      !associationSource.doesNotEstablish.some((item) => /attendance.*endorsement.*participation.*production.*authorship/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-association-boundary",
        "Personal Past event accounting loses its exact population or association boundary"
      );
    }
    if (
      !hostedSource ||
      hostedSource.visibility !== "protected" ||
      hostedSource.preservationStatus !== "private" ||
      !hostedSource.protectedLocatorId ||
      !hostedSource.supportsGenerally.some((item) => item.includes(String(required.hostedCount))) ||
      !hostedSource.supportsGenerally.some((item) => item.includes(String(required.overlapCount)) && item.includes(String(required.distinctUnionCount))) ||
      !hostedSource.supportsGenerally.some((item) => item.includes(String(required.hostedJamieDisplayedHostCount)) && item.includes(String(required.hostedOtherDisplayedHostCount))) ||
      !hostedSource.doesNotEstablish.some((item) => /sole production or authorship/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-hosted-boundary",
        "Hosted-tab accounting loses its exact reconciliation or platform-classification boundary"
      );
    }
    if (
      !practiceSource ||
      practiceSource.visibility !== "protected" ||
      practiceSource.preservationStatus !== "private" ||
      !practiceSource.protectedLocatorId ||
      !practiceSource.supportsGenerally.some((item) => item.includes(String(required.pastJamieDisplayedHostCount))) ||
      !practiceSource.doesNotEstablish.some((item) => /attendance.*reach.*endorsement.*causality.*impact/i.test(item))
    ) {
      add(
        "projection_restraint",
        "personal-facebook-practice-source",
        "Displayed-host practice source loses its protected aggregate or mutable-metric boundary"
      );
    }

    const selectedSources = required.displayedHostSourceIds.map((sourceId) =>
      sourceById.get(sourceId)
    );
    if (
      selectedSources.some(
        (source) =>
          !source ||
          source.visibility !== "public" ||
          source.reviewDepth !== "close-reading" ||
          source.author ||
          !source.publicNote?.includes("bounded platform attribution") ||
          !source.doesNotEstablish.some((item) => /sole production/i.test(item))
      )
    ) {
      add(
        "source_decomposition",
        "personal-facebook-selected-event-source",
        "Selected event sources lose close-reading, literal platform-label, or collective-credit boundaries"
      );
    }

    const destinationSources = required.postedDestinationSourceIds.map(
      (sourceId) => sourceById.get(sourceId)
    );
    const destinationEvidence = bank.claims.flatMap((claim) =>
      claim.evidence.filter((evidence) =>
        required.postedDestinationSourceIds.includes(evidence.sourceId)
      )
    );
    if (
      destinationSources.some(
        (source) =>
          !source ||
          source.reviewDepth !== "metadata" ||
          !source.doesNotEstablish.some((item) => /read|adopt|endorse|participant/i.test(item))
      ) ||
      destinationEvidence.length
    ) {
      add(
        "research_honesty",
        "personal-facebook-posted-url-boundary",
        "Posted destinations are being treated as corroboration or participant-use evidence"
      );
    }

    const associationClaim = bank.claims.find(
      (claim) => claim.id === required.associationClaimId
    );
    const hostedClaim = bank.claims.find(
      (claim) => claim.id === required.hostedClaimId
    );
    const practiceClaim = bank.claims.find(
      (claim) => claim.id === required.practiceClaimId
    );
    const wowlistLiveClaim = bank.claims.find(
      (claim) => claim.id === required.wowlistLiveClaimId
    );
    const wowlistNegativeClaim = bank.claims.find(
      (claim) => claim.id === required.wowlistNegativeClaimId
    );
    const eventClaims = [
      associationClaim,
      hostedClaim,
      practiceClaim,
      wowlistLiveClaim,
      wowlistNegativeClaim
    ];
    if (
      eventClaims.some(
        (claim) =>
          !claim ||
          claim.publicationStatus !== "internal-only" ||
          claim.editorialStatus !== "unused" ||
          claim.projections.some((projection) => projection.status === "active")
      )
    ) {
      add(
        "projection_restraint",
        "personal-facebook-projection-boundary",
        "Personal or WOW List Facebook event research is projected publicly instead of retained as reserve depth"
      );
    }
    if (
      !associationClaim?.boundaries.some((item) => /Association does not establish attendance/i.test(item)) ||
      !associationClaim?.antiClaims.some((item) => /attended or produced all 502/i.test(item)) ||
      !hostedClaim?.boundaries.some((item) => /platform classification/i.test(item)) ||
      !hostedClaim?.antiClaims.some((item) => /solely produced/i.test(item))
    ) {
      add(
        "projection_restraint",
        "personal-facebook-credit-boundary",
        "Association or Hosted-tab claims overstate attendance, authorship, or sole production"
      );
    }
    if (
      !practiceClaim ||
      !required.displayedHostSourceIds.every((sourceId) =>
        practiceClaim.evidence.some((evidence) => evidence.sourceId === sourceId)
      ) ||
      !practiceClaim.boundaries.some((item) => /interpretive classifications/i.test(item)) ||
      !practiceClaim.boundaries.some((item) => /Host attribution is not sole production/i.test(item)) ||
      !practiceClaim.antiClaims.some((item) => /numeric displays measure attendance or impact/i.test(item))
    ) {
      add(
        "provenance_closure",
        "personal-facebook-practice-claim",
        `${required.practiceClaimId} loses selected sources or its interpretive and traction boundaries`
      );
    }
    if (
      wowlistNegativeClaim?.status !== "not-recovered" ||
      !wowlistLiveClaim?.boundaries.some((item) => /does not establish.*never/i.test(item)) ||
      !wowlistNegativeClaim?.boundaries.some((item) => /does not establish.*ever existed/i.test(item)) ||
      !wowlistNegativeClaim?.antiClaims.some((item) => /never had a Facebook event/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-nonrecovery-boundary",
        "WOW List Facebook non-recovery is being converted into historical nonexistence"
      );
    }

    const personalInquiry = bank.researchInquiries.find(
      (inquiry) => inquiry.id === required.personalInquiryId
    );
    const personalInquiryText = JSON.stringify(personalInquiry ?? {});
    if (
      !personalInquiry ||
      personalInquiry.resultStatus !== "partially-recovered" ||
      ![required.pastCount, required.hostedCount, required.overlapCount, required.distinctUnionCount, required.pastJamieDisplayedHostCount, required.pastOtherDisplayedHostCount, required.hostedJamieDisplayedHostCount, required.hostedOtherDisplayedHostCount].every((count) => personalInquiryText.includes(String(count))) ||
      !personalInquiry.limitations.some((item) => /not an official Facebook export/i.test(item)) ||
      !personalInquiry.limitations.some((item) => /response displays are not unique people, attendance, reach/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-inquiry",
        `${required.personalInquiryId} does not preserve the complete accounting and source limits`
      );
    }
    const wowlistInquiry = bank.researchInquiries.find(
      (inquiry) => inquiry.id === required.wowlistInquiryId
    );
    if (
      !wowlistInquiry ||
      wowlistInquiry.resultStatus !== "not-recovered" ||
      !wowlistInquiry.findings.some((item) => /three bounded Wayback patterns.*one legacy pattern timed out/i.test(item)) ||
      !wowlistInquiry.limitations.some((item) => /do not establish.*ever existed/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-inquiry",
        `${required.wowlistInquiryId} does not preserve bounded non-recovery`
      );
    }
  }

  if (suite.requiredGoogleDriveArchiveProduction) {
    const required = suite.requiredGoogleDriveArchiveProduction;
    for (const intakeId of required.intakeIds) {
      const intake = bank.intakeItems.find((item) => item.id === intakeId);
      if (!intake) {
        add("capture_integrity", "missing-drive-intake", `Missing ${intakeId}`);
      } else if (
        intake.sensitivity === "public-safe" ||
        intake.availability !== "local-private" ||
        !intake.protectedLocatorId ||
        intake.submittedUrl
      ) {
        add("projection_restraint", "drive-private-intake-boundary", `${intakeId} exposes private Shared Drive context`);
      }
    }
    for (const sourceId of required.sourceIds) {
      const source = sourceById.get(sourceId);
      if (!source) {
        add("source_decomposition", "missing-drive-source", `Missing ${sourceId}`);
      } else if (
        source.visibility === "public" ||
        source.preservationStatus !== "private" ||
        !source.protectedLocatorId ||
        source.canonicalUrl ||
        source.archiveUrl ||
        source.assetUrl
      ) {
        add("projection_restraint", "drive-private-source-boundary", `${sourceId} exposes a Drive identifier, URL, or private artifact`);
      }
    }
    for (const claimId of required.claimIds) {
      const claim = bank.claims.find((item) => item.id === claimId);
      if (!claim) {
        add("provenance_closure", "missing-drive-claim", `Missing ${claimId}`);
      } else if (
        !claim.evidence.length ||
        claim.evidence.some((item) => item.relationship !== "private-support" || item.renderCitation) ||
        claim.projections.some((projection) => projection.status === "active")
      ) {
        add("projection_restraint", "drive-claim-projection", `${claimId} does not keep private evidence out of public composition`);
      }
    }
    for (const inquiryId of required.inquiryIds) {
      if (!inquiryIds.has(inquiryId)) add("research_honesty", "missing-drive-inquiry", `Missing ${inquiryId}`);
    }

    const residency = bank.claims.find((item) => item.id === required.residencyClaimId);
    if (
      !residency ||
      !/proposal review/.test(residency.internalClaim) ||
      !/space configuration/.test(residency.internalClaim) ||
      !residency.boundaries.some((item) => /participant identity|access instructions/i.test(item))
    ) {
      add("research_honesty", "drive-residency-boundary", `${required.residencyClaimId} loses operational scope or privacy limits`);
    }
    const wowlistVideo = sourceById.get(required.wowlistVideoSourceId);
    if (wowlistVideo && wowlistVideo.reviewStatus !== "blocked") {
      add("source_decomposition", "drive-unreviewed-video", `${required.wowlistVideoSourceId} must remain blocked pending transcription and visual review`);
    }
    const fairRentMedia = sourceById.get(required.fairRentMediaSourceId);
    if (
      !fairRentMedia?.media ||
      fairRentMedia.media.rightsStatus !== "permission-needed" ||
      fairRentMedia.media.consentStatus !== "review-needed" ||
      fairRentMedia.media.publicDisplayStatus !== "hold"
    ) {
      add("projection_restraint", "drive-media-rights", `${required.fairRentMediaSourceId} lost its rights, consent, or display hold`);
    }
    const sundayDinner = bank.claims.find((item) => item.id === required.sundayDinnerClaimId);
    if (
      !sundayDinner ||
      !sundayDinner.internalClaim.includes("33") ||
      !sundayDinner.boundaries.some((item) => /not an event|event.*count/i.test(item)) ||
      !sundayDinner.antiClaims.some((item) => /33 Zoom events/i.test(item))
    ) {
      add("research_honesty", "drive-asset-event-boundary", `${required.sundayDinnerClaimId} converts stored assets into event counts`);
    }
  }

  for (const claim of bank.claims) {
    if (!projectIds.has(claim.project)) add("project_context", "unknown-project", `${claim.id} references ${claim.project}`);
    if (!claim.evidence.length && !["not-recovered", "disallowed"].includes(claim.status)) {
      add("provenance_closure", "claim-without-evidence", `${claim.id} has no evidence`);
    }
    for (const evidence of claim.evidence) {
      if (!sourceIds.has(evidence.sourceId)) add("provenance_closure", "unknown-evidence-source", `${claim.id} references ${evidence.sourceId}`);
      const source = bank.sources.find((record) => record.id === evidence.sourceId);
      if (source && !source.projectIds.includes(claim.project)) {
        add("provenance_closure", "cross-project-evidence", `${claim.id} uses ${evidence.sourceId} without shared project context`);
      }
      if (
        source?.reviewDepth === "metadata" &&
        ["direct-support", "corroborating"].includes(evidence.relationship)
      ) {
        add("provenance_closure", "metadata-as-positive-evidence", `${claim.id} uses metadata-only ${evidence.sourceId} as positive evidence`);
      }
      if (claim.reviewedAt === "2026-07-13" && source?.intakeIds.some((id) => id.startsWith("INT-2026-07-13")) && !evidence.locator) {
        add("provenance_closure", "missing-evidence-locator", `${claim.id} does not locate its support within ${evidence.sourceId}`);
      }
    }
    for (const inquiryId of claim.researchInquiryIds) {
      if (!inquiryIds.has(inquiryId)) add("provenance_closure", "unknown-claim-inquiry", `${claim.id} references ${inquiryId}`);
    }
    const activePublicProjection = claim.projections.some(
      (projection) => projection.status === "active" && projection.surfaces.some((surface) => surface.startsWith("/"))
    );
    if (activePublicProjection && !["public", "qualified"].includes(claim.publicationStatus)) {
      add("projection_restraint", "nonpublic-active", `${claim.id} projects ${claim.publicationStatus} material publicly`);
    }
    if (activePublicProjection && !["confirmed", "confirmed-with-boundary"].includes(claim.status)) {
      add("projection_restraint", "immature-active", `${claim.id} projects ${claim.status} material publicly`);
    }
    if (activePublicProjection && claim.editorialStatus !== "active") {
      add("status_separation", "selection-mismatch", `${claim.id} is public but editorially ${claim.editorialStatus}`);
    }
    if (claim.editorialStatus === "unused" && claim.projections.some((projection) => projection.status === "active")) {
      add("status_separation", "unused-active-projection", `${claim.id} is unused but retains an active projection`);
    }
    if (claim.publicationStatus === "qualified" && !claim.boundaries.length) {
      add("status_separation", "qualified-without-boundary", `${claim.id} is qualified without a boundary`);
    }
    if (claim.internalClaim.trim().split(/[.!?](?:\s|$)/).filter(Boolean).length > 1) {
      add("claim_atomicity", "compound-claim", `${claim.id} contains multiple sentences`);
    }
  }

  for (const inquiry of bank.researchInquiries) {
    if (!projectIds.has(inquiry.project)) add("project_context", "unknown-project", `${inquiry.id} references ${inquiry.project}`);
    for (const intakeId of inquiry.intakeIds) {
      if (!intakeIds.has(intakeId)) add("referential_integrity", "unknown-intake", `${inquiry.id} references ${intakeId}`);
    }
    for (const sourceId of inquiry.sourceIds) {
      if (!sourceIds.has(sourceId)) add("referential_integrity", "unknown-source", `${inquiry.id} references ${sourceId}`);
    }
    if (!inquiry.methods.length || !inquiry.limitations.length) {
      add("research_honesty", "unbounded-inquiry", `${inquiry.id} lacks method or limitations`);
    }
  }

  for (const correction of bank.corrections) {
    if (!claimIds.has(correction.claimId)) {
      add("referential_integrity", "unknown-correction-claim", `${correction.id} references ${correction.claimId}`);
    }
  }

  for (const page of bank.pages) {
    for (const sourceId of page.sourceOrder) {
      if (!sourceIds.has(sourceId)) {
        add("referential_integrity", "unknown-page-source", `${page.id} references ${sourceId}`);
      }
    }
    for (const occurrence of page.occurrences) {
      if (!claimIds.has(occurrence.claimId)) {
        add("referential_integrity", "unknown-page-claim", `${page.id}/${occurrence.id} references ${occurrence.claimId}`);
      }
      for (const sourceId of occurrence.sourceIds ?? []) {
        if (!sourceIds.has(sourceId)) {
          add("referential_integrity", "unknown-occurrence-source", `${page.id}/${occurrence.id} references ${sourceId}`);
        }
      }
    }
  }

  for (const project of bank.projects) {
    for (const entityId of project.entityIds) {
      if (!entityIds.has(entityId)) add("project_context", "unknown-entity", `${project.id} references ${entityId}`);
    }
    if (!project.photoResearchPrompts.length) {
      add("project_context", "missing-photo-prompt", `${project.id} has no photo research prompt`);
    }
  }

  const categories = new Map();
  for (const finding of findings) {
    categories.set(finding.category, (categories.get(finding.category) ?? 0) + 1);
  }
  const noFindings = (category) => (categories.get(category) ?? 0) === 0;
  const requiredCaptured = suite.requiredIntakeUrls.length - findings.filter((item) => item.code === "missing-required-intake").length;
  const scores = {
    capture_integrity: noFindings("capture_integrity") ? 4 : requiredCaptured ? 2 : 0,
    source_decomposition: noFindings("source_decomposition") ? 4 : 2,
    claim_atomicity: noFindings("claim_atomicity") ? 4 : 2,
    provenance_closure: noFindings("provenance_closure") ? 4 : 1,
    status_separation: noFindings("status_separation") ? 4 : 1,
    project_context: noFindings("project_context") ? 4 : 1,
    research_honesty: noFindings("research_honesty") ? 4 : 2,
    projection_restraint: noFindings("projection_restraint") ? 4 : 0
  };

  return { findings, scores, score: weightedScore(suite.rubrics, scores) };
}

export function fingerprintFiles(root, files) {
  const hash = createHash("sha256");
  for (const file of [...files].sort()) {
    hash.update(`${file}\0${readFileSync(new URL(file, root), "utf8")}\0`);
  }
  return `sha256:${hash.digest("hex")}`;
}

export function validLifecycleJudgments({ judgments, candidate, contract, suite }) {
  const rubricIds = suite.rubrics.map((rubric) => rubric.id);
  return judgments.filter((judgment) =>
    judgment.candidate === candidate &&
    judgment.contract === contract &&
    judgment.passes === true &&
    Array.isArray(judgment.regressions) &&
    judgment.regressions.length === 0 &&
    rubricIds.every((id) => judgment.scores?.[id] >= suite.profile.minimumRubricScore)
  );
}

export { weightedScore };
