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

  for (const [label, records] of [
    ["intake", bank.intakeItems],
    ["entity", bank.entities],
    ["project", bank.projects],
    ["source", bank.sources],
    ["claim", bank.claims],
    ["inquiry", bank.researchInquiries],
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
