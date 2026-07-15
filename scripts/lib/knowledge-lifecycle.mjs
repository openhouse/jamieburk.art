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

  if (suite.requiredKcNeighborhoodStewardship) {
    const required = suite.requiredKcNeighborhoodStewardship;
    const claim = (id) => bank.claims.find((item) => item.id === id);
    const source = (id) => bank.sources.find((item) => item.id === id);

    for (const projectId of required.projectIds) {
      if (!projectIds.has(projectId)) add("project_context", "missing-kc-neighborhood-project", `Missing ${projectId}`);
    }
    for (const intakeId of required.intakeIds) {
      if (!intakeIds.has(intakeId)) add("capture_integrity", "missing-kc-neighborhood-intake", `Missing ${intakeId}`);
    }
    for (const sourceId of required.sourceIds) {
      if (!sourceIds.has(sourceId)) add("source_decomposition", "missing-kc-neighborhood-source", `Missing ${sourceId}`);
    }
    for (const claimId of required.claimIds) {
      if (!claimIds.has(claimId)) add("provenance_closure", "missing-kc-neighborhood-claim", `Missing ${claimId}`);
    }
    for (const inquiryId of required.inquiryIds) {
      if (!inquiryIds.has(inquiryId)) add("research_honesty", "missing-kc-neighborhood-inquiry", `Missing ${inquiryId}`);
    }

    for (const sourceId of [required.packetSourceId, required.memorySourceId, required.calculatorSourceId]) {
      const protectedSource = source(sourceId);
      if (
        protectedSource &&
        (protectedSource.visibility !== "protected" ||
          protectedSource.preservationStatus !== "private" ||
          !protectedSource.protectedLocatorId ||
          protectedSource.canonicalUrl ||
          protectedSource.archiveUrls?.length)
      ) {
        add("projection_restraint", "kc-neighborhood-protected-source", `${sourceId} does not preserve its protected-source boundary`);
      }
    }

    const packet = source(required.packetSourceId);
    if (
      packet &&
      (!packet.supportsGenerally.some((item) => item.includes(`$${required.phaseOneBudget.toLocaleString("en-US")}`)) ||
        !packet.doesNotEstablish.some((item) => /general.contractor role|general contractor of record/i.test(item)) ||
        !packet.doesNotEstablish.some((item) => /audit|closeout/i.test(item)))
    ) {
      add("source_decomposition", "kc-phase-one-packet-scope", `${required.packetSourceId} loses scope or non-support boundaries`);
    }

    const scopeClaim = claim(required.scopeClaimId);
    const completionClaim = claim(required.completionClaimId);
    const generalContractorClaim = claim(required.generalContractorClaimId);
    if (
      scopeClaim &&
      (scopeClaim.status !== "confirmed-with-boundary" ||
        scopeClaim.publicationStatus !== "internal-only" ||
        scopeClaim.projections.length > 0 ||
        !scopeClaim.evidence.some((edge) => edge.sourceId === required.packetSourceId && edge.relationship === "direct-support"))
    ) {
      add("status_separation", "kc-phase-one-scope-boundary", `${required.scopeClaimId} is not a bounded internal scope claim`);
    }
    if (
      completionClaim &&
      (completionClaim.status !== "use-with-care" ||
        completionClaim.publicationStatus !== "internal-only" ||
        completionClaim.projections.length > 0 ||
        !completionClaim.boundaries.some((item) => /66 percent complete|timing requires care/i.test(item)) ||
        !completionClaim.antiClaims.some((item) => /certified.*closeout|formally certified/i.test(item)))
    ) {
      add("research_honesty", "kc-phase-one-completion-tension", `${required.completionClaimId} erases the packet's timing tension or closeout boundary`);
    }
    if (
      generalContractorClaim &&
      (generalContractorClaim.status !== "use-with-care" ||
        generalContractorClaim.publicationStatus !== "internal-only" ||
        generalContractorClaim.projections.length > 0 ||
        !generalContractorClaim.evidence.some((edge) => edge.sourceId === required.memorySourceId && edge.relationship === "private-support") ||
        !generalContractorClaim.evidence.some((edge) => edge.sourceId === required.packetSourceId && edge.relationship === "context") ||
        generalContractorClaim.evidence.some((edge) => edge.sourceId === required.packetSourceId && edge.relationship === "direct-support") ||
        !generalContractorClaim.boundaries.some((item) => /first-person|does not name the general contractor/i.test(item)) ||
        !generalContractorClaim.antiClaims.some((item) => /personally performed|solely.*constructed/i.test(item)))
    ) {
      add("provenance_closure", "kc-general-contractor-attribution", `${required.generalContractorClaimId} overstates or loses its first-person evidence relationship`);
    }

    const surveyClaim = claim(required.surveyClaimId);
    const surveyRoleClaim = claim(required.surveyRoleClaimId);
    if (
      surveyClaim &&
      !surveyClaim.evidence.some((edge) => edge.sourceId === required.packetSourceId && edge.relationship === "direct-support")
    ) {
      add("provenance_closure", "kc-survey-artifact-evidence", `${required.surveyClaimId} lacks direct packet support`);
    }
    if (
      surveyRoleClaim &&
      (surveyRoleClaim.status !== "use-with-care" ||
        surveyRoleClaim.publicationStatus !== "internal-only" ||
        surveyRoleClaim.projections.length > 0 ||
        !surveyRoleClaim.evidence.some((edge) => edge.sourceId === required.memorySourceId && edge.relationship === "private-support") ||
        !surveyRoleClaim.evidence.some((edge) => edge.sourceId === required.packetSourceId && edge.relationship === "corroborating") ||
        !surveyRoleClaim.boundaries.some((item) => /Resident stories|contact records|raw responses.*protected/i.test(item)))
    ) {
      add("projection_restraint", "kc-survey-role-and-privacy", `${required.surveyRoleClaimId} loses attribution, artifact separation, or resident privacy`);
    }

    const tireProgramClaim = claim(required.tireProgramClaimId);
    const tireMetricClaim = claim(required.tireMetricClaimId);
    const tireRoleClaim = claim(required.tireRoleClaimId);
    const indianMoundClaim = claim(required.indianMoundClaimId);
    if (
      tireProgramClaim &&
      (tireProgramClaim.status !== "confirmed-with-boundary" ||
        tireProgramClaim.publicationStatus !== "qualified" ||
        tireProgramClaim.editorialStatus !== "unused" ||
        tireProgramClaim.projections.length > 0 ||
        !tireProgramClaim.boundaries.some((item) => /does not assign.*Jamie|not every pickup/i.test(item)))
    ) {
      add("status_separation", "tired-of-tires-program-boundary", `${required.tireProgramClaimId} conflates program existence with individual authorship or complete operations`);
    }
    const metricText = tireMetricClaim ? JSON.stringify(tireMetricClaim) : "";
    if (
      tireMetricClaim &&
      (tireMetricClaim.status !== "use-with-care" ||
        tireMetricClaim.publicationStatus !== "internal-only" ||
        tireMetricClaim.projections.length > 0 ||
        !metricText.includes(required.tireTotal.toLocaleString("en-US")) ||
        !metricText.includes(`${required.tireNonzeroMonths} nonzero`) ||
        !metricText.includes(`${required.tireMonthlyColumns} monthly`) ||
        !tireMetricClaim.boundaries.some((item) => /not an independent audit|not.*audit/i.test(item)) ||
        !tireMetricClaim.antiClaims.some((item) => /unique tires|unique households/i.test(item)))
    ) {
      add("research_honesty", "tired-of-tires-metric-boundary", `${required.tireMetricClaimId} promotes or misstates the private operating aggregate`);
    }
    if (
      tireRoleClaim &&
      (tireRoleClaim.status !== "use-with-care" ||
        tireRoleClaim.publicationStatus !== "internal-only" ||
        tireRoleClaim.projections.length > 0 ||
        !tireRoleClaim.evidence.some((edge) => edge.sourceId === required.memorySourceId && edge.relationship === "private-support") ||
        !tireRoleClaim.boundaries.some((item) => /Oak Park Neighborhood Association.*city staff.*residents.*volunteers/i.test(item)) ||
        !tireRoleClaim.antiClaims.some((item) => /alone created, operated, or delivered/i.test(item)))
    ) {
      add("projection_restraint", "tired-of-tires-role-credit", `${required.tireRoleClaimId} loses first-person or collective-credit boundaries`);
    }
    if (
      indianMoundClaim &&
      (indianMoundClaim.status !== "use-with-care" ||
        indianMoundClaim.publicationStatus !== "internal-only" ||
        indianMoundClaim.projections.length > 0 ||
        indianMoundClaim.evidence.length !== 1 ||
        indianMoundClaim.evidence[0].sourceId !== required.memorySourceId ||
        !indianMoundClaim.boundaries.some((item) => /No dated public post|confirmation has yet been linked/i.test(item)))
    ) {
      add("research_honesty", "tired-of-tires-indian-mound", `${required.indianMoundClaimId} overstates the remembered expansion`);
    }

    const clevelandRoleClaim = claim(required.clevelandRoleClaimId);
    if (
      clevelandRoleClaim &&
      (clevelandRoleClaim.status !== "use-with-care" ||
        clevelandRoleClaim.publicationStatus !== "internal-only" ||
        clevelandRoleClaim.projections.length > 0 ||
        !clevelandRoleClaim.internalClaim.includes("Pastor Lee") ||
        !clevelandRoleClaim.evidence.some((edge) => edge.sourceId === required.memorySourceId && edge.relationship === "private-support") ||
        !clevelandRoleClaim.evidence.some((edge) => edge.sourceId === required.hencSourceId && edge.relationship === "context") ||
        clevelandRoleClaim.evidence.some((edge) => edge.sourceId === required.hencSourceId && edge.relationship === "direct-support") ||
        !clevelandRoleClaim.boundaries.some((item) => /not Cleveland Ave program details or Jamie's role/i.test(item)) ||
        !clevelandRoleClaim.antiClaims.some((item) => /solely founded|originated Pastor Lee/i.test(item)) ||
        !clevelandRoleClaim.antiClaims.some((item) => /caused a specific.*funding|capital-improvement/i.test(item)))
    ) {
      add("provenance_closure", "cleveland-ave-role-credit", `${required.clevelandRoleClaimId} loses Pastor Lee, HENC-context, collective-credit, or causality boundaries`);
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
        !collectiveCreditClaim.evidence.some((item) => item.sourceId === "SRC-NTER-CHNG-VIMEO-2011") ||
        !collectiveCreditClaim.evidence.some((item) => item.sourceId === "SRC-NTER-CHNG-PROJECT-SITE-2011"))
    ) {
      add("research_honesty", "icloud-collective-credit", `${required.collectiveCreditClaimId} loses collaborator credit or source triangulation`);
    }

    const nterChngExhibitionClaim = bank.claims.find(
      (item) => item.id === required.nterChngExhibitionClaimId
    );
    const nterChngDirectEvidence = nterChngExhibitionClaim?.evidence.find(
      (item) => item.sourceId === "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011"
    );
    const nermanContext = nterChngExhibitionClaim?.evidence.find(
      (item) => item.sourceId === "SRC-NERMAN-AMERICA-NOW-HERE-KC-2011"
    );
    if (
      !nterChngExhibitionClaim ||
      nterChngDirectEvidence?.relationship !== "direct-support" ||
      nermanContext?.relationship !== "context" ||
      !nterChngExhibitionClaim.boundaries.some((item) => /does not name NTER CHNG|does not name.*NTER/i.test(item)) ||
      !nterChngExhibitionClaim.antiClaims.some((item) => /commissioned or acquired/i.test(item)) ||
      !nterChngExhibitionClaim.antiClaims.some((item) => /Nerman Museum/i.test(item)) ||
      !nterChngExhibitionClaim.antiClaims.some((item) => /visitor counts|audience impact/i.test(item))
    ) {
      add("research_honesty", "nter-chng-exhibition-boundary", `${required.nterChngExhibitionClaimId} does not distinguish direct inclusion evidence from exhibition context`);
    }

    const nterChngWaybackInquiry = bank.researchInquiries.find(
      (item) => item.id === required.nterChngWaybackInquiryId
    );
    if (
      !nterChngWaybackInquiry ||
      nterChngWaybackInquiry.resultStatus !== "recovered" ||
      !nterChngWaybackInquiry.methods.some((item) => /4,645 CDX records/.test(item)) ||
      !nterChngWaybackInquiry.sourceIds.includes("SRC-AMERICA-NOW-HERE-NTER-CHNG-2011") ||
      !nterChngWaybackInquiry.limitations.some((item) => /commissioned or acquired/i.test(item))
    ) {
      add("research_honesty", "nter-chng-wayback-inquiry", `${required.nterChngWaybackInquiryId} does not preserve the recovered organizer-site chain and its limits`);
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

    const timeIsLongClaim = bank.claims.find((item) => item.id === required.timeIsLongClaimId);
    if (
      !timeIsLongClaim ||
      !/VHS/i.test(timeIsLongClaim.internalClaim) ||
      !/twenty minutes|20 minutes/i.test(timeIsLongClaim.internalClaim) ||
      !timeIsLongClaim.evidence.some((edge) => edge.sourceId === "SRC-COOL-HUNTING-TIME-IS-LONG-2006" && edge.relationship === "direct-support") ||
      !timeIsLongClaim.antiClaims.some((item) => /engaged all|attendance|commission|acquisition/i.test(item))
    ) {
      add("research_honesty", "time-is-long-boundary", `${required.timeIsLongClaimId} loses the VHS behavior, approximate delay, or audience and commissioning limits`);
    }

    const claudetteClaim = bank.claims.find((item) => item.id === required.claudetteClaimId);
    if (
      !claudetteClaim ||
      !/Michael Rees/.test(claudetteClaim.internalClaim) ||
      !/Anne Dufy Burkart/.test(claudetteClaim.internalClaim) ||
      !/Julia Fredenburg/.test(claudetteClaim.internalClaim) ||
      !/with Claudette/.test(claudetteClaim.internalClaim) ||
      !claudetteClaim.evidence.some((edge) => edge.sourceId === required.claudettePublicSourceId && edge.relationship === "direct-support") ||
      !claudetteClaim.evidence.some((edge) => edge.sourceId === required.claudettePrivateSourceId && edge.relationship === "private-support" && !edge.renderCitation) ||
      !claudetteClaim.antiClaims.some((item) => /solely|sole/i.test(item))
    ) {
      add("research_honesty", "claudette-collective-credit", `${required.claudetteClaimId} loses collaborator credit or the public-private evidence boundary`);
    }

    const wikipediaClaim = bank.claims.find((item) => item.id === required.wikipediaClaimId);
    const wikipediaInquiry = bank.researchInquiries.find((item) => item.id === required.wikipediaInquiryId);
    if (
      !wikipediaClaim ||
      !/Hexatekin/.test(wikipediaClaim.internalClaim) ||
      !wikipediaClaim.antiClaims.some((item) => /alone|sole/i.test(item)) ||
      !wikipediaClaim.antiClaims.some((item) => /endorsed|validate/i.test(item)) ||
      !wikipediaInquiry ||
      wikipediaInquiry.resultStatus !== "recovered" ||
      !wikipediaInquiry.limitations.some((item) => /does not support sole authorship/i.test(item)) ||
      !wikipediaInquiry.limitations.some((item) => /does not independently validate/i.test(item))
    ) {
      add("research_honesty", "wikipedia-collaboration-boundary", `${required.wikipediaClaimId} turns a collaborative revision history into sole authorship or independent validation`);
    }

    const crsDeliveryClaim = bank.claims.find((item) => item.id === required.crsDeliveryClaimId);
    if (
      !crsDeliveryClaim ||
      !crsDeliveryClaim.evidence.some((edge) => edge.sourceId === required.crsEventSourceId && edge.relationship === "context") ||
      crsDeliveryClaim.evidence.some((edge) => edge.sourceId === required.crsEventSourceId && edge.relationship === "direct-support") ||
      !crsDeliveryClaim.evidence.some((edge) => edge.sourceId === required.crsDeliverySourceId && edge.relationship === "private-support") ||
      !crsDeliveryClaim.boundaries.some((item) => /not.*endorsement|not.*adoption/i.test(item)) ||
      !crsDeliveryClaim.antiClaims.some((item) => /adopted|endorsed|commissioned|implemented/i.test(item))
    ) {
      add("research_honesty", "crs-delivery-not-adoption", `${required.crsDeliveryClaimId} turns event context and a handoff into Council adoption`);
    }

    const chadClaim = bank.claims.find((item) => item.id === required.chadClaimId);
    if (
      !chadClaim ||
      chadClaim.publicationStatus !== "internal-only" ||
      chadClaim.projections.length !== 0 ||
      !/agency verbs/i.test(chadClaim.internalClaim) ||
      !/acronyms/i.test(chadClaim.internalClaim) ||
      !/tailored framing/i.test(chadClaim.internalClaim) ||
      !chadClaim.evidence.some((edge) => edge.sourceId === required.chadSourceId && edge.relationship === "private-support" && !edge.renderCitation) ||
      !chadClaim.boundaries.some((item) => /not independent verification/i.test(item))
    ) {
      add("research_honesty", "chad-guidance-attribution", `${required.chadClaimId} loses its attributed editorial role or becomes factual verification`);
    }

    const courseCompletionClaim = bank.claims.find((item) => item.id === required.courseCompletionClaimId);
    const courseSource = sourceById.get(required.courseSourceId);
    const certificateSource = sourceById.get(required.certificateSourceId);
    const aiEvalsInquiry = bank.researchInquiries.find((item) => item.id === required.aiEvalsInquiryId);
    if (
      !courseCompletionClaim ||
      !courseCompletionClaim.evidence.some((edge) => edge.sourceId === required.certificateSourceId && edge.relationship === "private-support" && edge.supports.includes("completion")) ||
      !courseCompletionClaim.evidence.some((edge) => edge.sourceId === required.courseSourceId && edge.relationship === "private-support" && edge.supports.includes("enrollment")) ||
      !courseSource?.doesNotEstablish.some((item) => /course completion/i.test(item)) ||
      !certificateSource?.supportsGenerally.some((item) => /completion/i.test(item)) ||
      !courseCompletionClaim.boundaries.some((item) => /does not state a date|does not.*date/i.test(item)) ||
      !courseCompletionClaim.antiClaims.some((item) => /course page alone proves completion/i.test(item)) ||
      !aiEvalsInquiry ||
      aiEvalsInquiry.resultStatus !== "recovered"
    ) {
      add("provenance_closure", "course-enrollment-vs-completion", `${required.courseCompletionClaimId} does not separate course access from certificate-backed completion`);
    }
  }

  if (suite.requiredCallNycAttributionBoundary) {
    const required = suite.requiredCallNycAttributionBoundary;
    const attributedClaim = bank.claims.find(
      (item) => item.id === required.attributedClaimId
    );
    const independentClaim = bank.claims.find(
      (item) => item.id === required.independentClaimId
    );
    const councilSource = sourceById.get(required.councilSourceId);
    const attributedProjectionText = attributedClaim?.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text)
      .join(" ") ?? "";
    const independentProjectionText = independentClaim?.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text)
      .join(" ") ?? "";

    if (
      !attributedClaim ||
      attributedClaim.publicationStatus !== "qualified" ||
      !/Council described/i.test(attributedProjectionText) ||
      !/first CouncilStat hackathon/i.test(attributedProjectionText) ||
      !attributedClaim.projections.every(
        (projection) => projection.status !== "active" || projection.citationRequired
      ) ||
      !attributedClaim.evidence.some(
        (edge) =>
          edge.sourceId === required.councilSourceId &&
          edge.relationship === "direct-support" &&
          edge.renderCitation
      ) ||
      !councilSource
    ) {
      add(
        "provenance_closure",
        "callnyc-attributed-superlative",
        `${required.attributedClaimId} must preserve Council attribution and direct cited support`
      );
    }

    if (
      !independentClaim ||
      /(?:New York City )?Council['’]s first CouncilStat hackathon/i.test(
        independentProjectionText
      )
    ) {
      add(
        "projection_restraint",
        "callnyc-attribution-leak",
        `${required.independentClaimId} borrows the Council's attributed superlative`
      );
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

  if (suite.requiredWowlistFacebookPosts) {
    const required = suite.requiredWowlistFacebookPosts;
    for (const intakeId of required.intakeIds) {
      if (!intakeIds.has(intakeId)) {
        add("capture_integrity", "missing-wowlist-facebook-post-intake", `Missing ${intakeId}`);
      }
    }
    for (const sourceId of required.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        add("source_decomposition", "missing-wowlist-facebook-post-source", `Missing ${sourceId}`);
      }
    }
    for (const claimId of required.claimIds) {
      if (!claimIds.has(claimId)) {
        add("provenance_closure", "missing-wowlist-facebook-post-claim", `Missing ${claimId}`);
      }
    }
    for (const inquiryId of required.inquiryIds) {
      if (!inquiryIds.has(inquiryId)) {
        add("research_honesty", "missing-wowlist-facebook-post-inquiry", `Missing ${inquiryId}`);
      }
    }

    const corpusIntake = bank.intakeItems.find(
      (item) => item.id === required.corpusIntakeId
    );
    const memoryIntake = bank.intakeItems.find(
      (item) => item.id === required.memoryIntakeId
    );
    if (
      !corpusIntake ||
      corpusIntake.sensitivity === "public-safe" ||
      corpusIntake.availability !== "local-private" ||
      !corpusIntake.protectedLocatorId ||
      corpusIntake.submittedUrl
    ) {
      add(
        "projection_restraint",
        "wowlist-facebook-post-intake-boundary",
        `${required.corpusIntakeId} exposes the record-level post census`
      );
    }
    if (
      !memoryIntake ||
      memoryIntake.status !== "promoted" ||
      !memoryIntake.sourceIds.includes(required.memorySourceId) ||
      !memoryIntake.claimIds.includes(required.managementClaimId) ||
      !memoryIntake.inquiryIds.includes(required.managementInquiryId)
    ) {
      add(
        "provenance_closure",
        "wowlist-facebook-management-memory-intake",
        `${required.memoryIntakeId} is not linked to its attributed source, claim, and inquiry`
      );
    }

    const corpusSource = sourceById.get(required.corpusSourceId);
    const contentLibrarySource = sourceById.get(required.contentLibrarySourceId);
    const urlInventorySource = sourceById.get(required.urlInventorySourceId);
    const memorySource = sourceById.get(required.memorySourceId);
    const nineCitiesSource = sourceById.get(required.nineCitiesSourceId);
    const corpusText = JSON.stringify(corpusSource ?? {}).replaceAll(",", "");
    if (
      !corpusSource ||
      corpusSource.visibility !== "private" ||
      corpusSource.preservationStatus !== "private" ||
      !corpusSource.protectedLocatorId ||
      ![required.currentPostCount, required.renderVariantCount, required.publisherCount].every(
        (count) => corpusText.includes(String(count))
      ) ||
      !corpusSource.locator?.match(/two exact terminal-scroll traversals/i) ||
      !corpusSource.doesNotEstablish.some((item) => /deleted before capture/i.test(item)) ||
      !corpusSource.doesNotEstablish.some((item) => /sole account administration/i.test(item))
    ) {
      add(
        "capture_integrity",
        "wowlist-facebook-post-population-source",
        `${required.corpusSourceId} loses its exact population, rerun control, or historical boundary`
      );
    }
    if (
      !contentLibrarySource ||
      contentLibrarySource.visibility !== "protected" ||
      !contentLibrarySource.protectedLocatorId ||
      !JSON.stringify(contentLibrarySource).includes(String(required.contentLibraryCount)) ||
      !contentLibrarySource.doesNotEstablish.some((item) => /five-post historical Page population/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-content-library-boundary",
        "The five-row Meta Content Library is being treated as the historical Page population"
      );
    }
    if (
      !urlInventorySource ||
      urlInventorySource.visibility !== "private" ||
      !urlInventorySource.protectedLocatorId ||
      ![required.resolvedUrlOccurrences, required.distinctResolvedUrls, required.wowlistOrgOccurrences].every(
        (count) => JSON.stringify(urlInventorySource).includes(String(count))
      ) ||
      !urlInventorySource.doesNotEstablish.some((item) => /truth of linked content/i.test(item)) ||
      !urlInventorySource.doesNotEstablish.some((item) => /endorsement/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-posted-url-source",
        "The posted-URL inventory loses its exact counts or source-routing boundary"
      );
    }
    if (
      !memorySource ||
      memorySource.visibility !== "private" ||
      !memorySource.protectedLocatorId ||
      !memorySource.publicNote?.match(/recalls|believes/i) ||
      !memorySource.doesNotEstablish.some((item) => /sole account administration/i.test(item)) ||
      !memorySource.doesNotEstablish.some((item) => /Richard Album/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-management-memory-source",
        "The first-person social-management source loses attribution or collective-credit boundaries"
      );
    }
    if (
      !nineCitiesSource ||
      nineCitiesSource.reviewDepth !== "close-reading" ||
      !nineCitiesSource.supportsGenerally.some((item) => /attributed nine-city/i.test(item)) ||
      !nineCitiesSource.doesNotEstablish.some((item) => /independently verified/i.test(item))
    ) {
      add(
        "source_decomposition",
        "wowlist-facebook-selected-post-source",
        "The selected nine-city post loses attribution or independent-verification limits"
      );
    }

    const populationClaim = bank.claims.find(
      (claim) => claim.id === required.populationClaimId
    );
    const publisherClaim = bank.claims.find(
      (claim) => claim.id === required.publisherClaimId
    );
    const managementClaim = bank.claims.find(
      (claim) => claim.id === required.managementClaimId
    );
    const communityClaim = bank.claims.find(
      (claim) => claim.id === required.communityClaimId
    );
    const civicClaim = bank.claims.find(
      (claim) => claim.id === required.civicClaimId
    );
    const engagementClaim = bank.claims.find(
      (claim) => claim.id === required.engagementClaimId
    );
    const urlClaim = bank.claims.find(
      (claim) => claim.id === required.urlClaimId
    );
    const postClaims = [
      populationClaim,
      publisherClaim,
      managementClaim,
      communityClaim,
      civicClaim,
      engagementClaim,
      urlClaim
    ];
    if (
      postClaims.some(
        (claim) =>
          !claim ||
          claim.publicationStatus !== "internal-only" ||
          claim.projections.some((projection) => projection.status === "active")
      )
    ) {
      add(
        "projection_restraint",
        "wowlist-facebook-post-projection-boundary",
        "WOW List Facebook post research is projected publicly instead of retained as reserve depth"
      );
    }
    if (
      !populationClaim ||
      !populationClaim.internalClaim.includes(String(required.currentPostCount)) ||
      !populationClaim.internalClaim.includes(String(required.renderVariantCount)) ||
      !populationClaim.evidence.some((item) => item.sourceId === required.corpusSourceId) ||
      !populationClaim.evidence.some((item) => item.sourceId === required.contentLibrarySourceId) ||
      !populationClaim.boundaries.some((item) => /Deleted, unpublished, pre-migration-omitted/i.test(item)) ||
      !populationClaim.antiClaims.some((item) => /exactly 54.*history/i.test(item)) ||
      !populationClaim.antiClaims.some((item) => /only five posts/i.test(item))
    ) {
      add(
        "capture_integrity",
        "wowlist-facebook-post-population-claim",
        `${required.populationClaimId} overstates the current observable population`
      );
    }
    if (
      !publisherClaim ||
      !publisherClaim.internalClaim.includes(String(required.publisherCount)) ||
      !publisherClaim.boundaries.some((item) => /not sole Page administration|not sole.*administration/i.test(item)) ||
      !publisherClaim.boundaries.some((item) => /original authorship|Quoted, shared, and linked material/i.test(item)) ||
      !publisherClaim.boundaries.some((item) => /Richard Album/i.test(item)) ||
      !publisherClaim.antiClaims.some((item) => /sole WOW List administrator/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-publisher-boundary",
        `${required.publisherClaimId} converts publisher metadata into sole administration or authorship`
      );
    }
    if (
      !managementClaim ||
      managementClaim.status !== "use-with-care" ||
      !managementClaim.internalClaim.match(/recalls/i) ||
      !managementClaim.evidence.some((item) => item.sourceId === required.memorySourceId) ||
      !managementClaim.evidence.some((item) => item.sourceId === required.corpusSourceId) ||
      !managementClaim.boundaries.some((item) => /first-person attribution/i.test(item)) ||
      !managementClaim.boundaries.some((item) => /Richard Album/i.test(item)) ||
      !managementClaim.antiClaims.some((item) => /definitively and exclusively/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-management-role-boundary",
        `${required.managementClaimId} loses attribution, evidence separation, or joint-project credit`
      );
    }
    if (
      !communityClaim ||
      !communityClaim.boundaries.some((item) => /do not independently establish site-wide adoption/i.test(item)) ||
      !communityClaim.antiClaims.some((item) => /replaced Facebook for all/i.test(item)) ||
      !civicClaim ||
      !civicClaim.boundaries.some((item) => /does not establish authorship, partnership, endorsement, attendance, or causality/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-routing-boundary",
        "Community or civic routing is being strengthened into adoption, partnership, or impact"
      );
    }
    if (
      !engagementClaim ||
      ![required.postsWithVisibleReactions, required.visibleReactionCount].every((count) =>
        engagementClaim.internalClaim.includes(String(count))
      ) ||
      !engagementClaim.boundaries.some((item) => /mutable.*platform displays.*not historic/i.test(item)) ||
      !engagementClaim.boundaries.some((item) => /not attendance or impact/i.test(item)) ||
      !engagementClaim.antiClaims.some((item) => /303 people attended/i.test(item))
    ) {
      add(
        "projection_restraint",
        "wowlist-facebook-engagement-boundary",
        `${required.engagementClaimId} converts mutable engagement into reach, attendance, or impact`
      );
    }
    if (
      !urlClaim ||
      ![required.resolvedUrlOccurrences, required.distinctResolvedUrls, required.wowlistOrgOccurrences].every(
        (count) => urlClaim.internalClaim.includes(String(count))
      ) ||
      !urlClaim.boundaries.some((item) => /research route, not evidence/i.test(item)) ||
      !urlClaim.antiClaims.some((item) => /linked organization endorsed/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-posted-url-boundary",
        `${required.urlClaimId} converts posted routes into proof, endorsement, or outcomes`
      );
    }

    const populationInquiry = bank.researchInquiries.find(
      (inquiry) => inquiry.id === required.populationInquiryId
    );
    const managementInquiry = bank.researchInquiries.find(
      (inquiry) => inquiry.id === required.managementInquiryId
    );
    const inquiryText = JSON.stringify(populationInquiry ?? {});
    if (
      !populationInquiry ||
      populationInquiry.resultStatus !== "partially-recovered" ||
      ![required.currentPostCount, required.renderVariantCount, required.contentLibraryCount].every(
        (count) => inquiryText.includes(String(count))
      ) ||
      !populationInquiry.limitations.some((item) => /not an official Meta export/i.test(item)) ||
      !populationInquiry.limitations.some((item) => /Deleted, unpublished, pre-migration-omitted/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-post-population-inquiry",
        `${required.populationInquiryId} loses the current-population or unavailable-history boundary`
      );
    }
    if (
      !managementInquiry ||
      managementInquiry.resultStatus !== "partially-recovered" ||
      !managementInquiry.findings.some((item) => /All 54.*publisher field/i.test(item)) ||
      !managementInquiry.limitations.some((item) => /not a complete account-administration log/i.test(item)) ||
      !managementInquiry.limitations.some((item) => /Richard Album/i.test(item))
    ) {
      add(
        "research_honesty",
        "wowlist-facebook-management-inquiry",
        `${required.managementInquiryId} loses its partial result or collective-credit boundary`
      );
    }
  }

  if (suite.requiredNycArtcFacebookPosts) {
    const required = suite.requiredNycArtcFacebookPosts;
    for (const id of required.intakeIds) {
      if (!intakeIds.has(id)) add("capture_integrity", "missing-nycartc-facebook-post-intake", `Missing ${id}`);
    }
    for (const id of required.sourceIds) {
      if (!sourceIds.has(id)) add("source_decomposition", "missing-nycartc-facebook-post-source", `Missing ${id}`);
    }
    for (const id of required.claimIds) {
      if (!claimIds.has(id)) add("provenance_closure", "missing-nycartc-facebook-post-claim", `Missing ${id}`);
    }
    for (const id of required.inquiryIds) {
      if (!inquiryIds.has(id)) add("research_honesty", "missing-nycartc-facebook-post-inquiry", `Missing ${id}`);
    }

    const corpusIntake = bank.intakeItems.find((item) => item.id === required.corpusIntakeId);
    const memoryIntake = bank.intakeItems.find((item) => item.id === required.memoryIntakeId);
    if (
      !corpusIntake ||
      corpusIntake.sensitivity === "public-safe" ||
      corpusIntake.availability !== "local-private" ||
      !corpusIntake.protectedLocatorId ||
      corpusIntake.submittedUrl
    ) {
      add("projection_restraint", "nycartc-facebook-post-intake-boundary", `${required.corpusIntakeId} exposes the record-level post census`);
    }
    if (
      !memoryIntake ||
      !memoryIntake.sourceIds.includes(required.memorySourceId) ||
      !memoryIntake.sourceIds.includes(required.managementControlSourceId) ||
      !memoryIntake.claimIds.includes(required.roleClaimId) ||
      !memoryIntake.inquiryIds.includes(required.roleInquiryId)
    ) {
      add("provenance_closure", "nycartc-facebook-role-memory-intake", `${required.memoryIntakeId} is not linked to distinct memory, management, role, and inquiry records`);
    }

    const corpusSource = sourceById.get(required.corpusSourceId);
    const contentControl = sourceById.get(required.contentControlSourceId);
    const managementControl = sourceById.get(required.managementControlSourceId);
    const urlInventory = sourceById.get(required.urlInventorySourceId);
    const memorySource = sourceById.get(required.memorySourceId);
    const corpusText = JSON.stringify(corpusSource ?? {}).replaceAll(",", "");
    if (
      !corpusSource ||
      corpusSource.visibility !== "private" ||
      !corpusSource.protectedLocatorId ||
      !corpusText.includes(String(required.currentPostCount)) ||
      !corpusSource.locator?.includes("matching non-identifying SHA-256 fingerprints") ||
      !corpusSource.locator?.includes("exact UTF-8 keys sorted under LC_ALL=C with LF delimiters and a final LF") ||
      !corpusSource.locator?.match(/two exact 444-ID traversals/i) ||
      !corpusSource.doesNotEstablish.some((item) => /deleted before capture.*lifetime historical population/i.test(item)) ||
      !corpusSource.doesNotEstablish.some((item) => /human publisher or author/i.test(item))
    ) {
      add("capture_integrity", "nycartc-facebook-post-population-source", `${required.corpusSourceId} loses its rerun, current-population, or authorship boundary`);
    }
    if (
      !contentControl ||
      contentControl.visibility !== "protected" ||
      !contentControl.protectedLocatorId ||
      !contentControl.doesNotEstablish.some((item) => /2017-2021 post denominator/i.test(item)) ||
      !contentControl.doesNotEstablish.some((item) => /individual authorship/i.test(item))
    ) {
      add("research_honesty", "nycartc-facebook-content-control-boundary", "The modern Meta content control is being used as historical population or authorship evidence");
    }
    if (
      !managementControl ||
      managementControl.visibility !== "protected" ||
      !managementControl.protectedLocatorId ||
      !managementControl.supportsGenerally.some((item) => /current Page-management relationship/i.test(item)) ||
      !managementControl.doesNotEstablish.some((item) => /historic exclusive administration/i.test(item))
    ) {
      add("research_honesty", "nycartc-facebook-management-control-boundary", "Current task access is being converted into historical exclusivity");
    }
    if (
      !memorySource ||
      memorySource.visibility !== "private" ||
      !memorySource.publicNote?.match(/remembers.*predominantly.*other coalition participants/i) ||
      !memorySource.doesNotEstablish.some((item) => /quantitative share/i.test(item)) ||
      !memorySource.doesNotEstablish.some((item) => /sole administration/i.test(item))
    ) {
      add("research_honesty", "nycartc-facebook-role-memory-boundary", "The first-person role memory loses attribution or shared-use limits");
    }
    if (
      !urlInventory ||
      urlInventory.visibility !== "private" ||
      ![required.outboundLinkOccurrences, required.uniqueOutboundUrls].every((count) => JSON.stringify(urlInventory).includes(String(count))) ||
      !urlInventory.doesNotEstablish.some((item) => /truth of linked content/i.test(item)) ||
      !urlInventory.doesNotEstablish.some((item) => /endorsement, clicks, conversion/i.test(item))
    ) {
      add("research_honesty", "nycartc-facebook-posted-url-source", "The posted URL inventory loses exact counts or routing limits");
    }

    const population = bank.claims.find((item) => item.id === required.populationClaimId);
    const practice = bank.claims.find((item) => item.id === required.practiceClaimId);
    const stakeholder = bank.claims.find((item) => item.id === required.stakeholderClaimId);
    const engagement = bank.claims.find((item) => item.id === required.engagementClaimId);
    const urlClaim = bank.claims.find((item) => item.id === required.urlClaimId);
    const role = bank.claims.find((item) => item.id === required.roleClaimId);
    const allClaims = [population, practice, stakeholder, engagement, urlClaim, role];
    if (allClaims.some((claim) => !claim || claim.publicationStatus !== "internal-only" || claim.projections.some((projection) => projection.status === "active"))) {
      add("projection_restraint", "nycartc-facebook-post-projection-boundary", "NYC Artist Coalition Facebook post research is projected publicly instead of retained as reserve depth");
    }
    if (
      !population ||
      !population.internalClaim.replaceAll(",", "").includes(String(required.currentPostCount)) ||
      !population.internalClaim.match(/Two independent terminal traversals/i) ||
      !population.boundaries.some((item) => /Deleted, unpublished, pre-migration-omitted/i.test(item)) ||
      !population.antiClaims.some((item) => /exactly 444.*history/i.test(item))
    ) {
      add("capture_integrity", "nycartc-facebook-post-population-claim", `${required.populationClaimId} overstates the currently observable population`);
    }
    if (
      !practice ||
      !practice.internalClaim.match(/sustained collective publishing and participation system/i) ||
      !practice.boundaries.some((item) => /not an assignment of every post.*to Jamie/i.test(item)) ||
      !practice.boundaries.some((item) => /not readership, conversion, adoption, or impact/i.test(item))
    ) {
      add("research_honesty", "nycartc-facebook-practice-boundary", `${required.practiceClaimId} loses collective credit or routing limits`);
    }
    if (
      !stakeholder ||
      !stakeholder.internalClaim.includes(String(required.councilRouteOccurrences)) ||
      !stakeholder.boundaries.some((item) => /not unique people/i.test(item)) ||
      !stakeholder.boundaries.some((item) => /not verified engagement/i.test(item)) ||
      !stakeholder.antiClaims.some((item) => /Eighty-eight NYC Council members engaged/i.test(item))
    ) {
      add("research_honesty", "nycartc-facebook-stakeholder-boundary", `${required.stakeholderClaimId} converts outgoing routing into stakeholder engagement`);
    }
    if (
      !engagement ||
      ![required.postsWithVisibleSignals, required.visibleReactions, required.visibleComments, required.visibleShares].every((count) => engagement.internalClaim.replaceAll(",", "").includes(String(count))) ||
      !engagement.boundaries.some((item) => /not unique people.*historical reach.*attendance.*endorsement.*impact/i.test(item))
    ) {
      add("projection_restraint", "nycartc-facebook-engagement-boundary", `${required.engagementClaimId} converts mutable counters into reach or impact`);
    }
    if (
      !urlClaim ||
      ![required.outboundLinkOccurrences, required.uniqueOutboundUrls].every((count) => urlClaim.internalClaim.includes(String(count))) ||
      !urlClaim.boundaries.some((item) => /source-discovery and action-routing leads/i.test(item)) ||
      !urlClaim.antiClaims.some((item) => /Every linked organization endorsed/i.test(item))
    ) {
      add("research_honesty", "nycartc-facebook-posted-url-boundary", `${required.urlClaimId} converts routes into proof, endorsement, or outcomes`);
    }
    if (
      !role ||
      role.status !== "use-with-care" ||
      !role.internalClaim.match(/recalls.*predominantly.*other coalition participants/i) ||
      !role.evidence.some((item) => item.sourceId === required.memorySourceId) ||
      !role.evidence.some((item) => item.sourceId === required.managementControlSourceId) ||
      !role.evidence.some((item) => item.sourceId === required.contentControlSourceId) ||
      !role.boundaries.some((item) => /first-person attribution/i.test(item)) ||
      !role.boundaries.some((item) => /Do not assign any specific post/i.test(item)) ||
      !role.antiClaims.some((item) => /sole Page administrator/i.test(item))
    ) {
      add("research_honesty", "nycartc-facebook-role-boundary", `${required.roleClaimId} loses attribution, evidence separation, or shared credit`);
    }

    const populationInquiry = bank.researchInquiries.find((item) => item.id === required.populationInquiryId);
    const roleInquiry = bank.researchInquiries.find((item) => item.id === required.roleInquiryId);
    const sourceInquiry = bank.researchInquiries.find((item) => item.id === required.sourceInquiryId);
    if (
      !populationInquiry ||
      populationInquiry.resultStatus !== "partially-recovered" ||
      !populationInquiry.findings.some((item) => /Both independent traversals.*444/i.test(item)) ||
      !populationInquiry.limitations.some((item) => /100 percent coverage.*not a native export/i.test(item))
    ) {
      add("research_honesty", "nycartc-facebook-population-inquiry", `${required.populationInquiryId} loses rerun or current-surface boundaries`);
    }
    if (
      !roleInquiry ||
      roleInquiry.resultStatus !== "partially-recovered" ||
      !roleInquiry.findings.some((item) => /predominant Page use.*others/i.test(item)) ||
      !roleInquiry.limitations.some((item) => /Current task access does not establish historical exclusivity/i.test(item))
    ) {
      add("research_honesty", "nycartc-facebook-role-inquiry", `${required.roleInquiryId} loses its partial result or shared-use boundary`);
    }
    if (
      !sourceInquiry ||
      !sourceInquiry.limitations.some((item) => /not automatic corroboration/i.test(item)) ||
      !sourceInquiry.findings.some((item) => /metadata-only comparative-relief lead/i.test(item))
    ) {
      add("source_decomposition", "nycartc-facebook-source-inquiry", `${required.sourceInquiryId} promotes routes without source review`);
    }
  }

  if (suite.requiredKcSpacesFundFacebookPosts) {
    const required = suite.requiredKcSpacesFundFacebookPosts;
    if (!projectIds.has(required.projectId)) {
      add("project_context", "missing-kcspaces-project", `Missing ${required.projectId}`);
    }
    for (const id of required.intakeIds) {
      if (!intakeIds.has(id)) add("capture_integrity", "missing-kcspaces-facebook-intake", `Missing ${id}`);
    }
    for (const id of required.sourceIds) {
      if (!sourceIds.has(id)) add("source_decomposition", "missing-kcspaces-facebook-source", `Missing ${id}`);
    }
    for (const id of required.claimIds) {
      if (!claimIds.has(id)) add("provenance_closure", "missing-kcspaces-facebook-claim", `Missing ${id}`);
    }
    for (const id of required.inquiryIds) {
      if (!inquiryIds.has(id)) add("research_honesty", "missing-kcspaces-facebook-inquiry", `Missing ${id}`);
    }

    const corpusIntake = bank.intakeItems.find((item) => item.id === required.corpusIntakeId);
    const operationsIntake = bank.intakeItems.find((item) => item.id === required.digitalOperationsIntakeId);
    const memoryIntake = bank.intakeItems.find((item) => item.id === required.namingMemoryIntakeId);
    const nonPosterMemoryIntake = bank.intakeItems.find((item) => item.id === required.nonPosterMemoryIntakeId);
    for (const intake of [corpusIntake, operationsIntake, memoryIntake, nonPosterMemoryIntake]) {
      if (
        !intake ||
        intake.sensitivity === "public-safe" ||
        intake.availability !== "local-private" ||
        !intake.protectedLocatorId ||
        intake.submittedUrl
      ) {
        add("projection_restraint", "kcspaces-private-intake-boundary", `${intake?.id ?? "missing intake"} exposes protected role or corpus evidence`);
      }
    }

    const corpusSource = sourceById.get(required.corpusSourceId);
    const urlInventory = sourceById.get(required.urlInventorySourceId);
    const operationsSource = sourceById.get(required.digitalOperationsSourceId);
    const namingSource = sourceById.get(required.namingMemorySourceId);
    const nonPosterSource = sourceById.get(required.nonPosterMemorySourceId);
    if (
      !corpusSource ||
      corpusSource.visibility !== "private" ||
      !corpusSource.protectedLocatorId ||
      !corpusSource.locator?.match(/two exact 37-record classification-set matches/i) ||
      !corpusSource.locator?.match(/22 and 20 terminal no-addition/i) ||
      !corpusSource.doesNotEstablish.some((item) => /deleted before capture.*lifetime historical population/i.test(item)) ||
      !corpusSource.doesNotEstablish.some((item) => /human publisher or author/i.test(item))
    ) {
      add("capture_integrity", "kcspaces-facebook-population-source", `${required.corpusSourceId} loses its rerun, current-population, or authorship boundary`);
    }
    if (
      !urlInventory ||
      urlInventory.visibility !== "private" ||
      ![required.uniqueRouteStrings, required.routeDomainCount].every((count) => JSON.stringify(urlInventory).includes(String(count))) ||
      !urlInventory.doesNotEstablish.some((item) => /truth of linked content/i.test(item)) ||
      !urlInventory.doesNotEstablish.some((item) => /endorsement, clicks, donation conversion/i.test(item))
    ) {
      add("research_honesty", "kcspaces-facebook-posted-url-source", `${required.urlInventorySourceId} loses exact counts or routing limits`);
    }
    if (
      !operationsSource ||
      operationsSource.visibility !== "private" ||
      !operationsSource.protectedLocatorId ||
      !operationsSource.locator?.match(/73 Jamie-authored commits.*10 Jamie-authored commits.*34 Jamie-authored/i) ||
      !operationsSource.doesNotEstablish.some((item) => /public organizer status/i.test(item)) ||
      !operationsSource.doesNotEstablish.some((item) => /sole authorship of campaign strategy.*public voice/i.test(item))
    ) {
      add("research_honesty", "kcspaces-digital-operations-source-boundary", `${required.digitalOperationsSourceId} loses implementation proof or collective-credit limits`);
    }
    if (
      !namingSource ||
      namingSource.visibility !== "private" ||
      !namingSource.protectedLocatorId ||
      !namingSource.publicNote?.match(/remembers supporting selection/i) ||
      !namingSource.doesNotEstablish.some((item) => /Jamie alone selected or approved/i.test(item)) ||
      !namingSource.doesNotEstablish.some((item) => /uniform public identifiers prove/i.test(item))
    ) {
      add("research_honesty", "kcspaces-naming-memory-boundary", `${required.namingMemorySourceId} loses attribution or decision limits`);
    }
    if (
      !nonPosterSource ||
      nonPosterSource.visibility !== "private" ||
      !nonPosterSource.protectedLocatorId ||
      !nonPosterSource.publicNote?.match(/Jamie states.*not the stakeholder or owner posting/i) ||
      !nonPosterSource.doesNotEstablish.some((item) => /identity of every human publisher/i.test(item)) ||
      !nonPosterSource.doesNotEstablish.some((item) => /complete account-administration chronology/i.test(item))
    ) {
      add("research_honesty", "kcspaces-non-poster-memory-boundary", `${required.nonPosterMemorySourceId} loses first-person attribution or publisher-ledger limits`);
    }

    const population = bank.claims.find((item) => item.id === required.populationClaimId);
    const practice = bank.claims.find((item) => item.id === required.practiceClaimId);
    const grantee = bank.claims.find((item) => item.id === required.granteeClaimId);
    const engagement = bank.claims.find((item) => item.id === required.engagementClaimId);
    const stakeholder = bank.claims.find((item) => item.id === required.stakeholderClaimId);
    const urlClaim = bank.claims.find((item) => item.id === required.urlClaimId);
    const fundraiser = bank.claims.find((item) => item.id === required.fundraiserClaimId);
    const operationsRole = bank.claims.find((item) => item.id === required.digitalOperationsClaimId);
    const naming = bank.claims.find((item) => item.id === required.namingClaimId);
    const allClaims = [population, practice, grantee, engagement, stakeholder, urlClaim, fundraiser, operationsRole, naming];
    if (allClaims.some((claim) => !claim || claim.publicationStatus !== "internal-only" || claim.projections.some((projection) => projection.status === "active"))) {
      add("projection_restraint", "kcspaces-facebook-projection-boundary", "KC Spaces Fund Facebook and naming research is projected publicly instead of retained as reserve depth");
    }
    if (
      !population ||
      !population.internalClaim.replaceAll(",", "").includes(String(required.currentPostCount)) ||
      !population.internalClaim.match(/Two independently paced authenticated traversals/i) ||
      !population.boundaries.some((item) => /Deleted, unpublished, pre-migration-omitted/i.test(item)) ||
      !population.antiClaims.some((item) => /exactly 37.*history/i.test(item))
    ) {
      add("capture_integrity", "kcspaces-facebook-population-claim", `${required.populationClaimId} overstates the currently observable population`);
    }
    if (
      !practice ||
      !practice.internalClaim.match(/collective mutual-aid operating practice/i) ||
      !practice.boundaries.some((item) => /not an assignment of Page authorship.*to Jamie/i.test(item)) ||
      !practice.boundaries.some((item) => /not readership, donations, conversion, partnership, or impact/i.test(item))
    ) {
      add("research_honesty", "kcspaces-facebook-practice-boundary", `${required.practiceClaimId} loses collective credit or routing limits`);
    }
    if (
      !grantee ||
      !grantee.internalClaim.includes(String(required.granteeAnnouncementCount)) ||
      !grantee.boundaries.some((item) => /not a complete grant ledger/i.test(item)) ||
      !grantee.antiClaims.some((item) => /Jamie selected or paid/i.test(item))
    ) {
      add("research_honesty", "kcspaces-facebook-grantee-boundary", `${required.granteeClaimId} converts announcements into a grantmaking or Jamie-role claim`);
    }
    if (
      !engagement ||
      ![required.postsWithVisibleReactions, required.visibleReactions, required.visibleLikes, required.visibleLoves].every((count) => engagement.internalClaim.includes(String(count))) ||
      !engagement.boundaries.some((item) => /not unique people, reach, donor conversion, endorsement, causality, or impact/i.test(item))
    ) {
      add("projection_restraint", "kcspaces-facebook-engagement-boundary", `${required.engagementClaimId} converts mutable counters into reach or impact`);
    }
    if (
      !stakeholder ||
      !stakeholder.internalClaim.match(/one direct public grantee thank-you comment/i) ||
      !stakeholder.boundaries.some((item) => /limited to one currently visible post/i.test(item)) ||
      !stakeholder.antiClaims.some((item) => /campaign-wide stakeholder engagement/i.test(item))
    ) {
      add("research_honesty", "kcspaces-facebook-stakeholder-boundary", `${required.stakeholderClaimId} converts a one-post response into campaign-wide endorsement`);
    }
    if (
      !urlClaim ||
      ![required.uniqueRouteStrings, required.routeDomainCount].every((count) => urlClaim.internalClaim.includes(String(count))) ||
      !urlClaim.boundaries.some((item) => /source-discovery and action-routing leads/i.test(item)) ||
      !urlClaim.antiClaims.some((item) => /Every linked organization endorsed/i.test(item))
    ) {
      add("research_honesty", "kcspaces-facebook-posted-url-boundary", `${required.urlClaimId} converts routes into proof, endorsement, or outcomes`);
    }
    if (
      !fundraiser ||
      !fundraiser.internalClaim.match(/\$9,590.*\$9,500.*107 donations/i) ||
      !fundraiser.boundaries.some((item) => /Do not attribute fundraising ownership.*to Jamie/i.test(item)) ||
      !fundraiser.antiClaims.some((item) => /Facebook activity caused 107 donations/i.test(item))
    ) {
      add("research_honesty", "kcspaces-fundraiser-boundary", `${required.fundraiserClaimId} converts a campaign result into Jamie ownership or Facebook causality`);
    }
    if (
      !operationsRole ||
      !operationsRole.internalClaim.match(/behind-the-scenes digital infrastructure/i) ||
      !operationsRole.evidence.some((item) => item.sourceId === required.digitalOperationsSourceId) ||
      !operationsRole.evidence.some((item) => item.sourceId === required.nonPosterMemorySourceId) ||
      !operationsRole.boundaries.some((item) => /Public organizer credit remains/i.test(item)) ||
      !operationsRole.antiClaims.some((item) => /Jamie authored.*Facebook posts/i.test(item))
    ) {
      add("research_honesty", "kcspaces-digital-role-boundary", `${required.digitalOperationsClaimId} loses technical scope or organizer and Page-voice limits`);
    }
    if (
      !naming ||
      naming.status !== "use-with-care" ||
      !naming.internalClaim.match(/recalls supporting selection/i) ||
      !naming.internalClaim.match(/corroborates the uniform identity outcome, not the decision-maker/i) ||
      !naming.evidence.some((item) => item.sourceId === required.namingMemorySourceId) ||
      !naming.evidence.some((item) => item.sourceId === required.siteSourceId) ||
      !naming.boundaries.some((item) => /Preserve first-person attribution/i.test(item)) ||
      !naming.antiClaims.some((item) => /Jamie alone named/i.test(item))
    ) {
      add("research_honesty", "kcspaces-naming-role-boundary", `${required.namingClaimId} converts attributed support into sole naming authority`);
    }

    const populationInquiry = bank.researchInquiries.find((item) => item.id === required.populationInquiryId);
    const sourceInquiry = bank.researchInquiries.find((item) => item.id === required.sourceInquiryId);
    const roleInquiry = bank.researchInquiries.find((item) => item.id === required.roleInquiryId);
    if (
      !populationInquiry ||
      !populationInquiry.findings.some((item) => /same 37 Page-level records.*22 and 20/i.test(item)) ||
      !populationInquiry.limitations.some((item) => /100 percent coverage.*not a native export/i.test(item))
    ) {
      add("research_honesty", "kcspaces-facebook-population-inquiry", `${required.populationInquiryId} loses rerun or current-surface boundaries`);
    }
    if (
      !sourceInquiry ||
      !sourceInquiry.limitations.some((item) => /not automatic corroboration/i.test(item)) ||
      !sourceInquiry.findings.some((item) => /Do816.*unresolved destination lead/i.test(item))
    ) {
      add("source_decomposition", "kcspaces-facebook-source-inquiry", `${required.sourceInquiryId} promotes routes without source review`);
    }
    if (
      !roleInquiry ||
      !roleInquiry.findings.some((item) => /strongly supports Jamie's behind-the-scenes/i.test(item)) ||
      !roleInquiry.findings.some((item) => /naming contribution remains an attributed recollection/i.test(item)) ||
      !roleInquiry.limitations.some((item) => /do(?:es)? not make Jamie a public organizer.*author of the campaign's Facebook voice/i.test(item))
    ) {
      add("research_honesty", "kcspaces-role-inquiry", `${required.roleInquiryId} loses implementation strength or naming and public-voice limits`);
    }
  }

  if (suite.requiredPersonalFacebookPosts) {
    const required = suite.requiredPersonalFacebookPosts;
    for (const id of required.intakeIds) {
      if (!intakeIds.has(id)) add("capture_integrity", "missing-personal-facebook-intake", `Missing ${id}`);
    }
    for (const id of required.sourceIds) {
      if (!sourceIds.has(id)) add("source_decomposition", "missing-personal-facebook-source", `Missing ${id}`);
    }
    for (const id of required.claimIds) {
      if (!claimIds.has(id)) add("provenance_closure", "missing-personal-facebook-claim", `Missing ${id}`);
    }
    for (const id of required.inquiryIds) {
      if (!inquiryIds.has(id)) add("research_honesty", "missing-personal-facebook-inquiry", `Missing ${id}`);
    }

    const corpusIntake = bank.intakeItems.find((item) => item.id === required.corpusIntakeId);
    const personalPublicRecordProject = bank.projects.find(
      (item) => item.id === "personal-public-record"
    );
    if (
      !personalPublicRecordProject ||
      Number(personalPublicRecordProject.period.start) > required.recoveredStartYear
    ) {
      add(
        "project_context",
        "personal-facebook-project-period",
        "The personal-public-record project period begins after the recovered Facebook chronology"
      );
    }
    if (
      !corpusIntake ||
      corpusIntake.sensitivity === "public-safe" ||
      corpusIntake.availability !== "local-private" ||
      !corpusIntake.protectedLocatorId ||
      corpusIntake.submittedUrl
    ) {
      add(
        "projection_restraint",
        "personal-facebook-intake-boundary",
        `${required.corpusIntakeId} exposes the record-level personal post corpus`
      );
    }

    const corpusSource = sourceById.get(required.corpusSourceId);
    const urlInventorySource = sourceById.get(required.urlInventorySourceId);
    const corpusText = JSON.stringify(corpusSource ?? {}).replaceAll(",", "");
    if (
      !corpusSource ||
      corpusSource.visibility !== "private" ||
      corpusSource.preservationStatus !== "private" ||
      !corpusSource.protectedLocatorId ||
      ![
        required.currentPostCount,
        required.cursorPageCount,
        required.returnedNodeCount
      ].every((count) => corpusText.includes(String(count))) ||
      !corpusSource.locator?.match(/has-next-page false/i) ||
      !corpusSource.doesNotEstablish.some((item) => /native Meta export.*deletion history.*lifetime/i.test(item)) ||
      !corpusSource.doesNotEstablish.some((item) => /audience visibility was public/i.test(item))
    ) {
      add(
        "capture_integrity",
        "personal-facebook-population-source",
        `${required.corpusSourceId} loses its current-surface denominator, terminal control, or audience boundary`
      );
    }
    if (
      !urlInventorySource ||
      urlInventorySource.visibility !== "private" ||
      !urlInventorySource.protectedLocatorId ||
      ![required.urlBearingRecordCount, required.uniqueExternalUrlCount].every((count) =>
        JSON.stringify(urlInventorySource).includes(String(count))
      ) ||
      !urlInventorySource.doesNotEstablish.some((item) => /truth.*authorship.*availability/i.test(item)) ||
      !urlInventorySource.doesNotEstablish.some((item) => /partnership.*endorsement/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-posted-url-source",
        `${required.urlInventorySourceId} loses exact counts or source-routing limits`
      );
    }

    const wowlistSource = sourceById.get(required.wowlistSourceId);
    const callNycSource = sourceById.get(required.callNycSourceId);
    const kcTownHallSource = sourceById.get(required.kcTownHallSourceId);
    const pitchSource = sourceById.get(required.pitchSourceId);
    if (
      !wowlistSource ||
      wowlistSource.visibility !== "public" ||
      wowlistSource.reviewDepth !== "close-reading" ||
      !wowlistSource.supportsGenerally.some((item) => /attributed nine-city/i.test(item)) ||
      !wowlistSource.doesNotEstablish.some((item) => /sustained activity.*every city/i.test(item)) ||
      !wowlistSource.doesNotEstablish.some((item) => /lifetime city count.*reach/i.test(item))
    ) {
      add(
        "source_decomposition",
        "personal-facebook-wowlist-source-boundary",
        `${required.wowlistSourceId} loses attribution, city, or metric limits`
      );
    }
    const wowlistPopulation = bank.claims.find(
      (item) => item.id === suite.requiredWowlistFacebookPosts.populationClaimId
    );
    const wowlistCommunity = bank.claims.find(
      (item) => item.id === suite.requiredWowlistFacebookPosts.communityClaimId
    );
    if (
      wowlistPopulation?.evidence.some((item) => item.sourceId === required.wowlistSourceId) ||
      !wowlistCommunity?.evidence.some((item) => item.sourceId === required.wowlistSourceId)
    ) {
      add(
        "provenance_closure",
        "personal-facebook-wowlist-evidence-edge",
        `${required.wowlistSourceId} must support community routing, not the Page-population denominator`
      );
    }
    if (
      !callNycSource ||
      !callNycSource.doesNotEstablish.some((item) => /employment.*title.*contract.*team membership/i.test(item)) ||
      !callNycSource.doesNotEstablish.some((item) => /hiring authority/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-callnyc-source-boundary",
        `${required.callNycSourceId} converts social wording into a Council role`
      );
    }
    if (
      !kcTownHallSource ||
      !kcTownHallSource.supportsGenerally.some((item) => /attributed co-initiation/i.test(item)) ||
      !kcTownHallSource.doesNotEstablish.some((item) => /sole founding.*ownership/i.test(item)) ||
      !kcTownHallSource.doesNotEstablish.some((item) => /later Board recommendation.*Council appropriation/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-kctownhall-source-boundary",
        `${required.kcTownHallSourceId} loses co-initiation attribution or later-outcome limits`
      );
    }
    if (
      !pitchSource ||
      pitchSource.kind !== "published-article" ||
      pitchSource.reviewDepth !== "close-reading" ||
      !pitchSource.supportsGenerally.some((item) => /collective arrival.*Gulf/i.test(item)) ||
      !pitchSource.doesNotEstablish.some((item) => /solo completion/i.test(item))
    ) {
      add(
        "source_decomposition",
        "personal-facebook-promoted-article",
        `${required.pitchSourceId} loses independent completion support or collective credit`
      );
    }

    const population = bank.claims.find((item) => item.id === required.populationClaimId);
    const mission = bank.claims.find((item) => item.id === required.missionClaimId);
    const urlClaim = bank.claims.find((item) => item.id === required.urlClaimId);
    const stakeholder = bank.claims.find((item) => item.id === required.stakeholderClaimId);
    const engagement = bank.claims.find((item) => item.id === required.engagementClaimId);
    const action = bank.claims.find((item) => item.id === required.actionClaimId);
    const callNyc = bank.claims.find((item) => item.id === required.callNycClaimId);
    const waterCompletion = bank.claims.find((item) => item.id === required.waterCompletionClaimId);
    const reserveClaims = [population, mission, urlClaim, stakeholder, engagement, action, callNyc];
    if (
      reserveClaims.some(
        (claim) =>
          !claim ||
          claim.publicationStatus !== "internal-only" ||
          claim.projections.some((projection) => projection.status === "active")
      )
    ) {
      add(
        "projection_restraint",
        "personal-facebook-projection-boundary",
        "Personal Facebook census, routing, role, and engagement research is projected publicly instead of retained as reserve depth"
      );
    }
    if (
      !population ||
      !population.internalClaim.replaceAll(",", "").includes(String(required.currentPostCount)) ||
      !population.internalClaim.includes(String(required.cursorPageCount)) ||
      !population.evidence.some((item) => item.sourceId === required.corpusSourceId) ||
      !population.boundaries.some((item) => /Manage Posts.*Posted by You.*current/i.test(item)) ||
      !population.boundaries.some((item) => /not a native Meta export.*deletion history.*lifetime/i.test(item)) ||
      !population.antiClaims.some((item) => /exactly 1,243.*lifetime/i.test(item)) ||
      !population.antiClaims.some((item) => /Every retained record is public/i.test(item))
    ) {
      add(
        "capture_integrity",
        "personal-facebook-population-claim",
        `${required.populationClaimId} overstates the currently observable owner-filtered population`
      );
    }
    if (
      !mission ||
      !mission.internalClaim.includes(String(required.missionRecordCount)) ||
      !mission.boundaries.some((item) => /categories overlap.*research routes/i.test(item)) ||
      !mission.boundaries.some((item) => /do not establish.*acted.*attended.*endorsed/i.test(item)) ||
      !mission.antiClaims.some((item) => /181 separate professional projects/i.test(item)) ||
      !mission.antiClaims.some((item) => /authored every linked.*shared.*quoted/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-mission-boundary",
        `${required.missionClaimId} converts research routes into projects, authorship, or impact`
      );
    }
    if (
      !urlClaim ||
      !urlClaim.internalClaim.includes(String(required.urlBearingRecordCount)) ||
      !urlClaim.internalClaim.includes(String(required.uniqueExternalUrlCount)) ||
      !urlClaim.boundaries.some((item) => /source lead.*independently recovered.*close-read/i.test(item)) ||
      !urlClaim.boundaries.some((item) => /does not establish.*truth.*authorship.*partnership.*endorsement/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-posted-url-boundary",
        `${required.urlClaimId} converts posted routes into proof or endorsement`
      );
    }
    if (
      !stakeholder ||
      !stakeholder.boundaries.some((item) => /not actions by the named stakeholders/i.test(item)) ||
      !stakeholder.boundaries.some((item) => /not engagement.*attendance.*endorsement.*partnership.*impact/i.test(item)) ||
      !stakeholder.antiClaims.some((item) => /Twenty New York City Council members engaged/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-stakeholder-boundary",
        `${required.stakeholderClaimId} converts outgoing mentions into stakeholder engagement`
      );
    }
    if (
      !engagement ||
      !engagement.internalClaim.match(/106 reactions.*14 comments.*three shares/i) ||
      !engagement.boundaries.some((item) => /mutable current interface observations/i.test(item)) ||
      !engagement.boundaries.some((item) => /Do not sum.*reach.*unique people.*stakeholder engagement/i.test(item)) ||
      !engagement.antiClaims.some((item) => /reached 165 people/i.test(item))
    ) {
      add(
        "projection_restraint",
        "personal-facebook-engagement-boundary",
        `${required.engagementClaimId} converts selected mutable counters into reach or impact`
      );
    }
    if (
      !action ||
      !action.boundaries.some((item) => /not sole ownership or authorship.*collective campaigns/i.test(item)) ||
      !action.boundaries.some((item) => /do not prove attendance.*legislative causality/i.test(item)) ||
      !action.antiClaims.some((item) => /single-handedly organized/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-action-routing-boundary",
        `${required.actionClaimId} converts personal routing into sole campaign credit or causality`
      );
    }
    if (
      !callNyc ||
      callNyc.status !== "use-with-care" ||
      !callNyc.boundaries.some((item) => /Preserve attribution.*do not infer employment.*title.*contract.*hiring authority/i.test(item)) ||
      !callNyc.antiClaims.some((item) => /employed by.*Council.*CouncilStat/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-callnyc-role-boundary",
        `${required.callNycClaimId} converts attributed social wording into an institutional role`
      );
    }
    if (
      !waterCompletion ||
      waterCompletion.publicationStatus !== "qualified" ||
      waterCompletion.editorialStatus !== "unused" ||
      !waterCompletion.evidence.some((item) => item.sourceId === required.pitchSourceId) ||
      !waterCompletion.internalClaim.match(/Jamie and his fellow artists.*Gulf of Mexico.*four months/i) ||
      !waterCompletion.boundaries.some((item) => /Credit the journey collectively/i.test(item)) ||
      !waterCompletion.antiClaims.some((item) => /Jamie alone completed/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-water-completion-boundary",
        `${required.waterCompletionClaimId} loses independent support, collective credit, or editorial restraint`
      );
    }

    const populationInquiry = bank.researchInquiries.find((item) => item.id === required.populationInquiryId);
    const sourceInquiry = bank.researchInquiries.find((item) => item.id === required.sourceInquiryId);
    const callNycInquiry = bank.researchInquiries.find((item) => item.id === required.callNycInquiryId);
    if (
      !populationInquiry ||
      !populationInquiry.methods.some((item) => /621 cursor pages.*has-next-page was false/i.test(item)) ||
      !populationInquiry.limitations.some((item) => /100 percent coverage.*not a native Meta export.*deletion history/i.test(item)) ||
      !populationInquiry.limitations.some((item) => /Audience labels were not exposed.*raw population remains private/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-population-inquiry",
        `${required.populationInquiryId} loses terminal, completeness, or audience controls`
      );
    }
    if (
      !sourceInquiry ||
      !sourceInquiry.findings.some((item) => /549 unique normalized external URLs/i.test(item)) ||
      !sourceInquiry.limitations.some((item) => /not automatic corroboration/i.test(item)) ||
      !sourceInquiry.findings.some((item) => /Pitch.*independently reports collective Gulf completion/i.test(item))
    ) {
      add(
        "source_decomposition",
        "personal-facebook-source-inquiry",
        `${required.sourceInquiryId} promotes routes without independent review`
      );
    }
    if (
      !callNycInquiry ||
      callNycInquiry.resultStatus !== "inconclusive" ||
      !callNycInquiry.findings.some((item) => /does not.*resolve.*title.*employment.*contract.*team membership.*hiring authority/i.test(item)) ||
      !callNycInquiry.limitations.some((item) => /job PDF is currently unavailable/i.test(item))
    ) {
      add(
        "research_honesty",
        "personal-facebook-callnyc-inquiry",
        `${required.callNycInquiryId} resolves an institutional role without corroboration`
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

    const installPlanSource = sourceById.get(required.nterChngInstallPlanSourceId);
    const workingCompilationSource = sourceById.get(required.nterChngWorkingCompilationSourceId);
    if (
      !installPlanSource ||
      !installPlanSource.supportsGenerally.some((item) => /software.*server-side.*wall-side|projection.*wiring.*networking/i.test(item)) ||
      !installPlanSource.doesNotEstablish.some((item) => /completion of every planned task/i.test(item)) ||
      !installPlanSource.doesNotEstablish.some((item) => /individual responsible|complete labor credit/i.test(item))
    ) {
      add("source_decomposition", "drive-nter-install-plan-scope", `${required.nterChngInstallPlanSourceId} loses planned-work or labor-attribution boundaries`);
    }
    if (
      !workingCompilationSource ||
      !workingCompilationSource.supportsGenerally.some((item) => /one-to-one.*many-to-many|social information space/i.test(item)) ||
      !workingCompilationSource.doesNotEstablish.some((item) => /provenance or public publication status/i.test(item)) ||
      !workingCompilationSource.doesNotEstablish.some((item) => /phone numbers or message text/i.test(item))
    ) {
      add("source_decomposition", "drive-nter-working-compilation-scope", `${required.nterChngWorkingCompilationSourceId} loses provenance, consent, or contact-data boundaries`);
    }

    const restaging = bank.claims.find((item) => item.id === required.nterChngRestagingClaimId);
    if (
      !restaging ||
      restaging.status !== "confirmed-with-boundary" ||
      restaging.publicationStatus !== "internal-only" ||
      restaging.projections.length > 0 ||
      !/planned.*workflow/i.test(restaging.internalClaim) ||
      !restaging.boundaries.some((item) => /planning, not completion|not completion of every task/i.test(item)) ||
      !restaging.boundaries.some((item) => /does not assign all.*labor to Jamie/i.test(item)) ||
      !restaging.antiClaims.some((item) => /Jamie alone restaged/i.test(item)) ||
      !restaging.antiClaims.some((item) => /Every checklist item was completed/i.test(item))
    ) {
      add("research_honesty", "drive-nter-restaging-boundary", `${required.nterChngRestagingClaimId} converts a working plan into completion or sole labor`);
    }

    const framing = bank.claims.find((item) => item.id === required.nterChngFramingClaimId);
    if (
      !framing ||
      framing.status !== "use-with-care" ||
      framing.publicationStatus !== "protected" ||
      framing.projections.length > 0 ||
      !/Drew Bolton.*Jamie Burkart.*Garrett Fuselier/i.test(framing.internalClaim) ||
      !/one-to-one.*many-to-many/i.test(framing.internalClaim) ||
      !framing.boundaries.some((item) => /Phone numbers, message text.*remain protected/i.test(item)) ||
      !framing.boundaries.some((item) => /does not establish sole prose authorship|public provenance/i.test(item)) ||
      !framing.antiClaims.some((item) => /Jamie solely authored/i.test(item)) ||
      !framing.antiClaims.some((item) => /Personal contact information or message text/i.test(item))
    ) {
      add("projection_restraint", "drive-nter-framing-privacy", `${required.nterChngFramingClaimId} loses collective credit, provenance, or message privacy`);
    }

    const nterInquiry = bank.researchInquiries.find((item) => item.id === required.nterChngInquiryId);
    if (
      !nterInquiry ||
      nterInquiry.resultStatus !== "partially-recovered" ||
      !required.sourceIds.filter((id) => id.includes("NTER-CHNG")).every((id) => nterInquiry.sourceIds.includes(id)) ||
      !nterInquiry.limitations.some((item) => /assigns every workstream.*individual/i.test(item)) ||
      !nterInquiry.limitations.some((item) => /personal contact information.*remain protected/i.test(item))
    ) {
      add("research_honesty", "drive-nter-inquiry-boundary", `${required.nterChngInquiryId} over-resolves labor, authorship, or privacy questions`);
    }
  }

  if (suite.requiredNycArtcInstitutionalValue) {
    const required = suite.requiredNycArtcInstitutionalValue;
    for (const entityId of required.entityIds) {
      if (!entityIds.has(entityId)) {
        add("project_context", "missing-nycartc-institutional-entity", `Missing ${entityId}`);
      }
    }
    for (const intakeId of required.intakeIds) {
      const intake = bank.intakeItems.find((item) => item.id === intakeId);
      if (!intake) {
        add("capture_integrity", "missing-nycartc-institutional-intake", `Missing ${intakeId}`);
      } else if (
        intake.status !== "promoted" ||
        intake.sensitivity !== "public-safe" ||
        intake.availability !== "live" ||
        !intake.sourceIds.length ||
        !intake.inquiryIds.includes(required.inquiryId)
      ) {
        add("capture_integrity", "nycartc-institutional-intake-disposition", `${intakeId} is not fully dispositioned`);
      }
    }
    for (const sourceId of required.sourceIds) {
      const source = sourceById.get(sourceId);
      if (!source) {
        add("source_decomposition", "missing-nycartc-institutional-source", `Missing ${sourceId}`);
      } else if (
        source.kind !== "government-record" ||
        source.visibility !== "public" ||
        source.reviewStatus !== "reviewed" ||
        source.reviewDepth !== "close-reading" ||
        !source.locator ||
        !source.supportsGenerally.length ||
        !source.doesNotEstablish.some((item) => /private motive|private reasons/i.test(item)) ||
        !source.doesNotEstablish.some((item) => /Jamie|individual role/i.test(item))
      ) {
        add("source_decomposition", "nycartc-institutional-source-boundary", `${sourceId} loses close-reading scope or motive and role boundaries`);
      }
    }

    const transcript = sourceById.get(required.budgetTranscriptSourceId);
    if (
      !transcript ||
      !transcript.supportsGenerally.some((item) => /close reciprocal relationship/i.test(item)) ||
      !transcript.supportsGenerally.some((item) => /direct public feedback/i.test(item)) ||
      !transcript.supportsGenerally.some((item) => /common cause/i.test(item)) ||
      !transcript.supportsGenerally.some((item) => /NYC Artist Coalition/i.test(item)) ||
      !transcript.doesNotEstablish.some((item) => /could not act without/i.test(item))
    ) {
      add("source_decomposition", "finkelpearl-testimony-scope", `${required.budgetTranscriptSourceId} loses the exact public rationale or necessity boundary`);
    }

    const testimonyClaim = bank.claims.find((item) => item.id === required.testimonyClaimId);
    if (
      !testimonyClaim ||
      testimonyClaim.status !== "confirmed-with-boundary" ||
      testimonyClaim.publicationStatus !== "qualified" ||
      testimonyClaim.editorialStatus !== "unused" ||
      testimonyClaim.projections.some((projection) => projection.status === "active") ||
      testimonyClaim.evidence.length !== 1 ||
      testimonyClaim.evidence[0].sourceId !== required.budgetTranscriptSourceId ||
      testimonyClaim.evidence[0].relationship !== "direct-support" ||
      !testimonyClaim.boundaries.some((item) => /private motive|personal dependence/i.test(item))
    ) {
      add("provenance_closure", "finkelpearl-testimony-attribution", `${required.testimonyClaimId} loses direct attribution or its motive boundary`);
    }

    const espinalSponsorship = bank.claims.find((item) => item.id === required.espinalSponsorshipClaimId);
    if (
      !espinalSponsorship ||
      espinalSponsorship.status !== "confirmed-with-boundary" ||
      espinalSponsorship.publicationStatus !== "qualified" ||
      espinalSponsorship.editorialStatus !== "unused" ||
      espinalSponsorship.projections.length > 0 ||
      espinalSponsorship.evidence.length !== 2 ||
      espinalSponsorship.evidence.some((item) => item.relationship !== "direct-support") ||
      !espinalSponsorship.boundaries.some((item) => /formal legislative role.*not.*private motive|not.*coalition authorship/i.test(item))
    ) {
      add("provenance_closure", "espinal-sponsorship-atomicity", `${required.espinalSponsorshipClaimId} loses its direct sponsorship scope`);
    }

    const espinalTownHall = bank.claims.find((item) => item.id === required.espinalTownHallClaimId);
    if (
      !espinalTownHall ||
      espinalTownHall.status !== "confirmed-with-boundary" ||
      espinalTownHall.publicationStatus !== "qualified" ||
      espinalTownHall.editorialStatus !== "unused" ||
      espinalTownHall.projections.length > 0 ||
      espinalTownHall.evidence.length !== 1 ||
      espinalTownHall.evidence[0].relationship !== "direct-support" ||
      !espinalTownHall.boundaries.some((item) => /one documented appearance.*not establish.*recurring relationship/i.test(item)) ||
      !espinalTownHall.antiClaims.some((item) => /endorsement.*cultural-sector legitimacy/i.test(item))
    ) {
      add("provenance_closure", "espinal-town-hall-atomicity", `${required.espinalTownHallClaimId} becomes recurring engagement, endorsement, or legitimacy`);
    }

    for (const claimId of required.inferenceClaimIds) {
      const claim = bank.claims.find((item) => item.id === claimId);
      if (!claim) {
        add("provenance_closure", "missing-nycartc-institutional-claim", `Missing ${claimId}`);
      } else if (
        claim.status !== "inference" ||
        claim.publicationStatus !== "internal-only" ||
        claim.editorialStatus !== "unused" ||
        claim.projections.length > 0 ||
        claim.evidence.length < 2 ||
        !claim.boundaries.some((item) => /interpretation|inference|supported civic function|reciprocal-capacity/i.test(item)) ||
        !claim.boundaries.some((item) => /private motive|depend|individual|collective/i.test(item)) ||
        !claim.antiClaims.some((item) => /could not act without|needed .* in order|alone created|solely caused/i.test(item))
      ) {
        add("projection_restraint", "nycartc-institutional-inference-boundary", `${claimId} becomes motive, necessity, sole credit, or public composition`);
      }
    }

    const jamieClaim = bank.claims.find((item) => item.id === required.jamieClaimId);
    if (
      !jamieClaim ||
      !jamieClaim.evidence.some((item) => item.relationship === "private-support") ||
      !jamieClaim.evidence.some((item) => item.relationship === "context" && item.confidence === "high") ||
      !jamieClaim.boundaries.some((item) => /sole designer|sole.*producer|collective/i.test(item))
    ) {
      add("research_honesty", "nycartc-jamie-role-boundary", `${required.jamieClaimId} loses mixed provenance or collective credit`);
    }

    const espinalInference = bank.claims.find((item) => item.id === required.espinalClaimId);
    if (
      !espinalInference ||
      /recurring constituency|public accountability relationship|cultural-sector legitimacy/i.test(espinalInference.internalClaim) ||
      !espinalInference.boundaries.some((item) => /does not establish.*recurring.*responsiveness.*accountability.*endorsement.*cultural-sector legitimacy/i.test(item))
    ) {
      add("research_honesty", "espinal-relational-overreach", `${required.espinalClaimId} overstates one forum as recurring accountability, endorsement, or legitimacy`);
    }

    const inquiry = bank.researchInquiries.find((item) => item.id === required.inquiryId);
    if (
      !inquiry ||
      inquiry.resultStatus !== "partially-recovered" ||
      !required.sourceIds.every((id) => inquiry.sourceIds.includes(id)) ||
      !inquiry.limitations.some((item) => /private motives|personal dependence/i.test(item)) ||
      !inquiry.limitations.some((item) => /Jamie's individual share/i.test(item)) ||
      !inquiry.limitations.some((item) => /sole coalition or individual causality/i.test(item))
    ) {
      add("research_honesty", "nycartc-institutional-inquiry-boundary", `${required.inquiryId} over-resolves motive, role, or causality`);
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
