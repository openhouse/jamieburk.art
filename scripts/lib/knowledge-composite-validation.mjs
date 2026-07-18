import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  proofClaims,
  publicCompositionCaseStudySelections,
  publicCompositionClaimProjectionSelections,
  publicCompositionProofSelections
} from "../../apps/www/src/data/proofs.ts";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const readJson = (relativePath) =>
  JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
const sorted = (values) => [...values].sort();
const sameSet = (left, right) =>
  JSON.stringify(sorted(new Set(left))) === JSON.stringify(sorted(new Set(right)));
const duplicates = (values) => values.filter((value, index) => values.indexOf(value) !== index);
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

export const expectedPostCandidatePaths = [
  "docs/evals/knowledge-composite-integration-state.json",
  "docs/evals/runs/2026-07-17-knowledge-composite-integration.md",
  "docs/evals/runs/2026-07-17-knowledge-composite-holdout-1.json",
  "docs/evals/runs/2026-07-17-knowledge-composite-holdout-2.json"
];

const expectedHoldoutReceiptPaths = expectedPostCandidatePaths.filter((relativePath) =>
  /knowledge-composite-holdout-[12]\.json$/.test(relativePath)
);

const expectedSurvivorshipPopulationIds = [
  "SURV-CALLNYC-CIVIC-HALL-EVENT-PAGE",
  "SURV-NYCARTC-X-OWNER-ARCHIVE",
  "SURV-NYCAC-FACEBOOK-EVENTS",
  "SURV-WOWLIST-FACEBOOK-EVENTS",
  "SURV-WOWLIST-DATABASE-BACKUPS",
  "SURV-KC-TOWN-HALL-MUNICIPAL-PACKET",
  "SURV-NTER-CHNG-PROJECT-SITE",
  "SURV-PROTECTED-SOCIAL-CAPTURES"
];

const compositionSourceBindingSpecs = [
  { surface: "home", path: "apps/www/src/components/ProofStrip.tsx", tokens: ["homepageProofs"] },
  { surface: "home", path: "apps/www/src/app/page.tsx", tokens: ["featuredWork"] },
  { surface: "work-index", path: "apps/www/src/app/work/page.tsx", tokens: ["workItems", "requireReadyOrCarefulProof", "source-backed-team-memory-method"] },
  { surface: "case-study-template", path: "apps/www/src/app/work/[slug]/page.tsx", tokens: ["workItems"] },
  { surface: "case-study-template", path: "apps/www/src/data/work.ts", tokens: ["getClaimProjection"] },
  { surface: "technical-operations", path: "apps/www/src/app/work/technical-operations/page.tsx", tokens: ["technicalOperationsProofRows", "technicalOperationsClaimProjectionRefs", "requireTechnicalOperationsProof"] },
  { surface: "resume", path: "apps/www/src/app/resume/page.tsx", tokens: ["resumeProofHighlights"] },
  { surface: "about", path: "apps/www/src/app/about/page.tsx", tokens: ["getClaimProjection", "requireReadyOrCarefulProof"] },
  { surface: "source-backed-team-memory-lab", path: "apps/www/src/app/lab/source-backed-team-memory/page.tsx", tokens: ["requireReadyOrCarefulProof", "source-backed-team-memory-method"] }
];

const collectPublicCopyPaths = (relativeDirectory) => {
  const absoluteDirectory = path.join(repoRoot, relativeDirectory);
  return readdirSync(absoluteDirectory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) return collectPublicCopyPaths(relativePath);
    return /\.(?:tsx|mdx)$/.test(entry.name) ? [relativePath] : [];
  });
};

export const publicAgencySurfacePaths = [
  ...collectPublicCopyPaths("apps/www/src/app"),
  ...collectPublicCopyPaths("apps/www/src/components"),
  ...collectPublicCopyPaths("apps/www/src/content"),
  "apps/www/src/data/work.ts"
];

export function contractFingerprint(suite = readJson(".agents/evals/knowledge-composite-integration.json")) {
  return sha256(`${JSON.stringify(suite)}\n`);
}

function fingerprintCandidateContents(suite, readContent) {
  const hash = createHash("sha256");
  for (const relativePath of sorted(suite.candidate_fingerprint_scope)) {
    let content = readContent(relativePath);
    if (relativePath === "docs/evals/mosaic-privacy-review.json") {
      const normalized = JSON.parse(content);
      normalized.candidateFingerprint = "<normalized-candidate-fingerprint>";
      content = `${JSON.stringify(normalized, null, 2)}\n`;
    }
    hash.update(relativePath);
    hash.update("\0");
    hash.update(content);
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function candidateFingerprint(suite = readJson(".agents/evals/knowledge-composite-integration.json")) {
  return fingerprintCandidateContents(
    suite,
    (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8")
  );
}

export function candidateFingerprintAtCommit(suite, candidateSha) {
  return fingerprintCandidateContents(
    suite,
    (relativePath) => execFileSync("git", ["show", `${candidateSha}:${relativePath}`], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    })
  );
}

export function validateSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const expectedIds = Array.from({ length: 9 }, (_, index) => `CI-${String(index + 1).padStart(3, "0")}`);
  const allowedGraders = new Set(["deterministic", "hybrid"]);

  requireValue(suite.version === 3, "Composite suite version must be 3");
  requireValue(suite.suite_id === "knowledge-composite-integration", "Composite suite ID is incorrect");
  requireValue(suite.baseline?.commit === "10d20ecd5d8d9f3b94b403fbecf483fef92b5dfe", "Baseline commit is not pinned");
  requireValue(suite.baseline?.record === "docs/evals/runs/2026-07-17-knowledge-composite-v3-baseline.md", "Version-three baseline record is not pinned");
  requireValue(suite.baseline?.wholesale_merges_or_cherry_picks === false, "Wholesale donor integration must remain false");
  requireValue(sameSet((suite.donors_inspected ?? []).map((item) => item.id), "ABCDEFGHIJKLMN".split("")), "Donor inventory must cover A-N exactly");
  for (const donor of suite.donors_inspected ?? []) {
    requireValue(Number.isInteger(donor.pr), `Donor ${donor.id} needs a PR number`);
    requireValue(typeof donor.accepted === "string" && donor.accepted.length > 0, `Donor ${donor.id} needs an accepted decision`);
    requireValue(typeof donor.rejected === "string" && donor.rejected.length > 0, `Donor ${donor.id} needs a rejected decision`);
  }
  requireValue(sameSet((suite.evals ?? []).map((item) => item.id), expectedIds), "Composite eval IDs must be exactly CI-001 through CI-009");
  requireValue(!duplicates((suite.evals ?? []).map((item) => item.id)).length, "Composite eval IDs must be unique");
  requireValue((suite.evals ?? []).reduce((sum, item) => sum + item.weight, 0) === 100, "Composite eval weights must total 100");

  for (const entry of suite.evals ?? []) {
    const prefix = entry.id ?? "unknown-eval";
    requireValue(allowedGraders.has(entry.grader), `${prefix} has an invalid grader`);
    requireValue(entry.blocking === true, `${prefix} must remain blocking`);
    requireValue(Number.isInteger(entry.weight) && entry.weight > 0, `${prefix} needs a positive integer weight`);
    for (const key of ["inputs", "procedure", "pass_criteria", "evidence_required"]) {
      requireValue(Array.isArray(entry[key]) && entry[key].length > 0, `${prefix}.${key} must be non-empty`);
    }
    requireValue(typeof entry.remediation_hint === "string" && entry.remediation_hint.length > 0, `${prefix} needs a remediation hint`);
  }

  const profile = suite.profiles?.implementation_review;
  requireValue(profile?.weighted_score_minimum === 0.9, "Implementation weighted threshold must be 0.90");
  requireValue(profile?.all_scores_minimum === 3, "Every composite eval must score at least 3");
  requireValue(sameSet(profile?.required_score_4_ids ?? [], ["CI-002", "CI-003", "CI-007"]), "Required score-4 IDs are incorrect");
  requireValue(profile?.two_independent_unchanged_candidate_holdouts_required === true, "Two unchanged-candidate holdouts must be required");
  requireValue(profile?.ci007_aggregate_score_rule === "derive-4-only-after-two-valid-independent-receipts-each-scoring-at-least-3", "CI-007 aggregate score rule is incorrect");
  requireValue(suite.optimization?.rubric_is_frozen_during_run === true, "The composite rubric must be frozen during a run");
  requireValue(suite.optimization?.optimizer_may_not_grade_own_patch === true, "Optimizer self-grading must be rejected");
  requireValue(suite.optimization?.holdout_judges_must_be_read_only === true, "Holdout judges must be read-only");
  requireValue(suite.optimization?.individual_holdouts_grade_the_instrument_and_their_own_receipt_not_aggregate_completion === true, "Individual and aggregate holdout responsibilities must remain separate");
  requireValue(suite.profiles?.application_share?.human_reader_approval_required === true, "Application sharing must retain human reader approval");
  requireValue(suite.profiles?.production_launch?.exact_candidate_production_approval_required === true, "Production must retain exact-candidate approval");
  requireValue(Array.isArray(suite.candidate_fingerprint_scope) && suite.candidate_fingerprint_scope.length >= 8, "Candidate fingerprint scope is too narrow");
  requireValue(!duplicates(suite.candidate_fingerprint_scope ?? []).length, "Candidate fingerprint scope contains duplicates");
  for (const binding of compositionSourceBindingSpecs) {
    requireValue(
      suite.candidate_fingerprint_scope.includes(binding.path),
      `Candidate fingerprint scope must include ${binding.path}`
    );
  }
  requireValue(
    suite.candidate_fingerprint_scope.includes(
      "scripts/evals-kcspacesfund-facebook-posts.mjs"
    ),
    "Candidate fingerprint scope must include the KC Spaces Fund role eval"
  );
  return errors;
}

export function validateAgency(agency, proofs = proofClaims, bank = knowledgeBank) {
  const errors = [];
  const relations = agency.relations ?? [];
  const proofById = new Map(proofs.map((proof) => [proof.id, proof]));
  const claimIds = new Set(bank.claims.map((claim) => claim.id));
  const allowedTypes = new Set(["implementation", "stewardship", "contribution", "advocacy", "testimony", "publishing", "coalition-action", "inferred-causality", "qualification"]);

  if (!sameSet(relations.map((item) => item.proofId), proofs.map((item) => item.id))) {
    errors.push("Agency relations must classify the proof bank as an exact set");
  }
  for (const id of duplicates(relations.map((item) => item.id))) errors.push(`Duplicate agency relation ID: ${id}`);
  for (const proofId of duplicates(relations.map((item) => item.proofId))) errors.push(`Duplicate agency proof classification: ${proofId}`);

  for (const relation of relations) {
    const proof = proofById.get(relation.proofId);
    if (!proof) {
      errors.push(`Agency relation ${relation.id} references unknown proof ${relation.proofId}`);
      continue;
    }
    for (const key of ["actor", "boundedAction", "object", "purpose", "usableResult", "creditScope"]) {
      if (typeof relation[key] !== "string" || !relation[key].trim()) errors.push(`${relation.id}.${key} is required`);
    }
    if (relation.actor !== "Jamie Burkart") errors.push(`${relation.id} must name Jamie Burkart as the bounded actor`);
    if (!allowedTypes.has(relation.relationshipType)) errors.push(`${relation.id} has invalid relationshipType`);
    if (!["high", "moderate", "limited"].includes(relation.confidence)) errors.push(`${relation.id} has invalid confidence`);
    if (!Array.isArray(relation.antiClaims) || !relation.antiClaims.length) errors.push(`${relation.id} must retain at least one anti-claim`);
    if (!sameSet(relation.supportClaimIds ?? [], proof.canonicalClaimIds ?? [])) errors.push(`${relation.id} supportClaimIds must exactly match ${proof.id}.canonicalClaimIds`);
    const expectedEvidenceState = proof.canonicalClaimIds?.length ? "canonical-linked" : "proof-debt";
    if (relation.evidenceState !== expectedEvidenceState) errors.push(`${relation.id} must use evidenceState=${expectedEvidenceState}`);
    for (const claimId of relation.supportClaimIds ?? []) {
      if (!claimIds.has(claimId)) errors.push(`${relation.id} references unknown canonical claim ${claimId}`);
    }
    const asserted = `${relation.boundedAction} ${relation.usableResult}`;
    if (/\b(?:single-handedly|solely|alone caused|official city representative|executive director|chief executive officer)\b/i.test(asserted)) {
      errors.push(`${relation.id} contains sole-causality or unsupported-title drift`);
    }
    if (/\bofficial(?:ly)? endorsed by\b|\bcity-endorsed\b/i.test(asserted)) {
      errors.push(`${relation.id} contains institutional-endorsement drift`);
    }
    const publicWording = [
      proof.publicWording,
      proof.shortWording,
      proof.detailedPublicWording
    ].filter(Boolean).join(" ");
    if (/\b(?:single-handedly|solely|alone caused|official city representative|executive director|chief executive officer)\b/i.test(publicWording)) {
      errors.push(`${proof.id} public wording contains sole-causality or unsupported-title drift`);
    }
    if (/\bofficial(?:ly)? endorsed by\b|\bcity-endorsed\b/i.test(publicWording)) {
      errors.push(`${proof.id} public wording contains institutional-endorsement drift`);
    }
    if (proof.status === "careful" && !/(collective|shared|coalition|institution|government|neighborhood|participant|business|legislative|community|producer|organizer|sponsor|human judgment|human review)/i.test(`${relation.creditScope} ${relation.antiClaims.join(" ")}`)) {
      errors.push(`${relation.id} erases the collective or institutional boundary of a careful proof`);
    }
  }
  return errors;
}

export function validateComposition(manifest, agency, proofs = proofClaims) {
  const errors = [];
  const proofIds = new Set(proofs.map((proof) => proof.id));
  const agencyProofIds = new Set((agency.relations ?? []).map((relation) => relation.proofId));
  const expectedSurfaceIds = ["home", "work-index", "technical-operations", "resume", "about", "contact", "colophon", "source-backed-team-memory-lab", "case-study-template"];
  const expectedCaseSlugs = ["harry-j-epstein", "nyc-artist-coalition", "fair-rent-nyc", "callnyc", "wowlist", "196-sunday-dinner", "kc-town-hall"];

  if (!sameSet((manifest.surfaces ?? []).map((surface) => surface.id), expectedSurfaceIds)) errors.push("Composition manifest must cover every public route or route template exactly");
  for (const id of duplicates((manifest.surfaces ?? []).map((surface) => surface.id))) errors.push(`Duplicate composition surface: ${id}`);

  const selected = new Set();
  for (const surface of manifest.surfaces ?? []) {
    for (const key of ["audience", "argument", "intendedAction", "omissionRationale"]) {
      if (typeof surface[key] !== "string" || !surface[key].trim()) errors.push(`${surface.id}.${key} is required`);
    }
    if (!Number.isInteger(surface.claimBudget) || surface.claimBudget < 0) errors.push(`${surface.id} has invalid claimBudget`);
    if (!sameSet(surface.selectedProofIds ?? [], publicCompositionProofSelections[surface.id] ?? [])) {
      errors.push(`${surface.id} proof selection must match the public composition registry exactly`);
    }
    if (!sameSet(surface.selectedClaimProjectionKeys ?? [], publicCompositionClaimProjectionSelections[surface.id] ?? [])) {
      errors.push(`${surface.id} direct claim projections must match the public composition registry exactly`);
    }
    for (const proofId of surface.selectedProofIds ?? []) {
      selected.add(proofId);
      if (!proofIds.has(proofId)) errors.push(`${surface.id} selects unknown proof ${proofId}`);
      if (!agencyProofIds.has(proofId)) errors.push(`${surface.id} selects proof ${proofId} without agency classification`);
    }
    const selectedClaimCount =
      (surface.selectedProofIds ?? []).length +
      (surface.selectedClaimProjectionKeys ?? []).length;
    if (!surface.routeTemplate && selectedClaimCount > surface.claimBudget) {
      errors.push(`${surface.id} exceeds its claim budget`);
    }
  }

  const caseTemplate = manifest.surfaces?.find((surface) => surface.id === "case-study-template");
  if (!sameSet(caseTemplate?.instances ?? [], expectedCaseSlugs)) errors.push("Case-study composition must cover the exact canonical work-slug set");
  for (const slug of expectedCaseSlugs) {
    const ids = caseTemplate?.selectedProofIdsByInstance?.[slug];
    if (!Array.isArray(ids)) errors.push(`Case-study composition is missing ${slug}`);
    else if (ids.length > caseTemplate.claimBudget) errors.push(`Case study ${slug} exceeds its claim budget`);
    else if (!sameSet(ids, publicCompositionCaseStudySelections[slug] ?? [])) errors.push(`Case study ${slug} must match the public composition registry exactly`);
  }
  const caseUnion = new Set(Object.values(caseTemplate?.selectedProofIdsByInstance ?? {}).flat());
  if (!sameSet(caseUnion, caseTemplate?.selectedProofIds ?? [])) errors.push("Case-study selectedProofIds must equal the union of its instances");

  const unselected = manifest.unselectedProofDecisions ?? [];
  for (const decision of unselected) {
    if (!proofIds.has(decision.proofId)) errors.push(`Unselected decision references unknown proof ${decision.proofId}`);
    if (!decision.decision || !decision.rationale) errors.push(`Unselected proof ${decision.proofId} needs a decision and rationale`);
  }
  if (!sameSet([...selected, ...unselected.map((item) => item.proofId)], [...proofIds])) errors.push("Selected and explicitly unselected proofs must account for the proof bank exactly");
  if ([...selected].some((id) => unselected.some((item) => item.proofId === id))) errors.push("A proof cannot be both selected and unselected");
  for (const surface of manifest.surfaces ?? []) {
    for (const compositeKey of surface.selectedClaimProjectionKeys ?? []) {
      const splitAt = compositeKey.lastIndexOf("/");
      const claimId = compositeKey.slice(0, splitAt);
      const projectionKey = compositeKey.slice(splitAt + 1);
      const claim = knowledgeBank.claims.find((item) => item.id === claimId);
      const projection = claim?.projections.find((item) => item.key === projectionKey);
      if (!claim || !projection) errors.push(`${surface.id} references unknown direct claim projection ${compositeKey}`);
      else if (projection.status !== "active" || (surface.route && !projection.surfaces.includes(surface.route))) {
        errors.push(`${surface.id} direct claim projection ${compositeKey} is not active on its route`);
      }
    }
  }
  return errors;
}

export function validateCompositionSourceBindings(
  readSource = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8")
) {
  const errors = [];
  for (const binding of compositionSourceBindingSpecs) {
    let source = "";
    try {
      source = readSource(binding.path);
    } catch {
      errors.push(`${binding.surface} composition source is missing: ${binding.path}`);
      continue;
    }
    for (const token of binding.tokens) {
      if (!source.includes(token)) {
        errors.push(`${binding.surface} render path is not bound to ${token} in ${binding.path}`);
      }
    }
  }
  return errors;
}

export function validatePublicAgencySurfaceWording(
  readSource = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8")
) {
  const errors = [];
  const soleOrTitlePattern =
    /\b(?:single-handedly|solely caused|alone caused|official city representative|served as (?:the )?executive director|chief executive officer)\b/i;
  const endorsementPattern = /\bofficial(?:ly)? endorsed by\b|\bcity-endorsed\b/i;
  for (const relativePath of publicAgencySurfacePaths) {
    const source = readSource(relativePath);
    if (soleOrTitlePattern.test(source)) {
      errors.push(`${relativePath} contains public sole-causality or unsupported-title drift`);
    }
    if (endorsementPattern.test(source)) {
      errors.push(`${relativePath} contains public institutional-endorsement drift`);
    }
  }
  return errors;
}

export function validateSurvivorship(register, bank = knowledgeBank, proofs = proofClaims) {
  const errors = [];
  const expectedStatuses = ["recovered", "partially-recovered", "not-recovered", "known-through-another-source"];
  if (!sameSet(register.allowedStatuses ?? [], expectedStatuses)) errors.push("Survivorship statuses must use the canonical exact set");
  if (!sameSet((register.populations ?? []).map((item) => item.id), expectedSurvivorshipPopulationIds)) {
    errors.push("Survivorship populations must match the reviewed exact set");
  }
  for (const id of duplicates((register.populations ?? []).map((item) => item.id))) errors.push(`Duplicate survivorship population: ${id}`);
  if (!sameSet((register.populations ?? []).map((item) => item.status), expectedStatuses)) {
    errors.push("Survivorship populations must represent every canonical status");
  }
  const knownProjects = new Set([
    ...bank.intake.flatMap((item) => item.projectIds),
    ...bank.claims.map((item) => item.project),
    ...bank.researchInquiries.map((item) => item.project),
    ...proofs.flatMap((item) => item.relatedProjects)
  ]);
  const knownInquiryIds = new Set(bank.researchInquiries.map((item) => item.id));
  for (const population of register.populations ?? []) {
    if (!expectedStatuses.includes(population.status)) errors.push(`${population.id} has invalid survivorship status`);
    if (!population.finding || !population.boundary) errors.push(`${population.id} needs a finding and boundary`);
    if (!knownProjects.has(population.project)) errors.push(`${population.id} references unknown project ${population.project}`);
    if (population.inquiryId && !knownInquiryIds.has(population.inquiryId)) errors.push(`${population.id} references unknown inquiry ${population.inquiryId}`);
    if (population.status === "not-recovered" && !/(does not|not prove|not establish)/i.test(population.boundary)) errors.push(`${population.id} must state that non-recovery is not proof of nonexistence`);
  }
  const expectedRights = ["factual-support", "quotation-permission", "artifact-rights", "image-permission", "participant-consent", "public-display-approval"];
  if (!sameSet(register.rightsDimensions ?? [], expectedRights)) errors.push("Rights dimensions must remain separate and complete");
  if (!/cannot become a claim or public projection automatically/i.test(register.reentryRule ?? "")) errors.push("Re-entry rule must block automatic claim promotion");
  return errors;
}

export function validateMosaic(
  mosaic,
  { expectedCandidateFingerprint, requireBinding = false } = {}
) {
  const errors = [];
  if (mosaic.version !== 1) errors.push("Mosaic review version must be 1");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(mosaic.reviewedAt ?? "")) errors.push("Mosaic review needs a date");
  if (mosaic.isLegalReview !== false) errors.push("Mosaic review must not claim legal review");
  if (mosaic.isParticipantApproval !== false) errors.push("Mosaic review must not claim participant approval");
  if (mosaic.result !== "pass-with-continuing-holds") errors.push("Mosaic result must retain continuing holds");
  const findings = mosaic.findings ?? [];
  if (findings.length < 6) errors.push("Mosaic review must retain at least six combination-risk findings");
  for (const id of duplicates(findings.map((finding) => finding.id))) errors.push(`Duplicate mosaic finding: ${id}`);
  for (const finding of findings) {
    if (!Array.isArray(finding.combination) || finding.combination.length < 2) errors.push(`${finding.id} must evaluate a combination of at least two fragments`);
    if (!finding.risk || !finding.decision) errors.push(`${finding.id} needs a risk and decision`);
    if (!Array.isArray(finding.appliesTo) || !finding.appliesTo.length) errors.push(`${finding.id} needs an appliesTo scope`);
  }
  const limitations = (mosaic.limitations ?? []).join(" ");
  if (!/not legal advice/i.test(limitations)) errors.push("Mosaic review must disclaim legal advice");
  if (!/(does not grant|not grant).*(rights|permission|consent|approval)/i.test(limitations)) errors.push("Mosaic review must not grant rights, consent, or approval");
  if (!/rerun/i.test(limitations)) errors.push("Mosaic review must identify when it needs to be rerun");
  if (requireBinding && mosaic.candidateFingerprint !== expectedCandidateFingerprint) errors.push("Mosaic review is not bound to the candidate fingerprint");
  return errors;
}

export function validateHumanState(state, blindStatus) {
  const errors = [];
  const automatedApproval = /automated|ai-approved|machine-approved/i;
  for (const id of ["PR-019", "PR-025"]) {
    const expected = blindStatus.evals?.[id]?.status;
    if (state.humanGates?.[id] !== expected) errors.push(`${id} composite status must match the canonical human-status registry`);
    if (automatedApproval.test(state.humanGates?.[id] ?? "")) errors.push(`${id} cannot use automated approval`);
  }
  if (!/pending/i.test(state.humanGates?.productionApproval ?? "")) errors.push("Production approval must remain pending until a human approves the exact candidate");
  if (!/pending/i.test(state.humanGates?.rights ?? "")) errors.push("Artifact rights holds must remain visible");
  if (!/pending/i.test(state.humanGates?.collaboratorConsent ?? "")) errors.push("Collaborator consent holds must remain visible");
  return errors;
}

export function validatePackageScripts(packageJson) {
  const errors = [];
  const required = {
    "check:knowledge-composite-evals": "node scripts/check-knowledge-composite-evals.mjs",
    "test:knowledge-composite-evals": "node --test scripts/tests/knowledge-composite-evals.test.mjs",
    "knowledge:intake": "node scripts/knowledge-intake.mjs",
    "query:knowledge-lifecycle": "node scripts/query-knowledge-lifecycle.mjs",
    "check:compiled-lifecycle-leaks": "node scripts/check-compiled-lifecycle-leaks.mjs"
  };
  for (const [name, command] of Object.entries(required)) {
    if (packageJson.scripts?.[name] !== command) errors.push(`package.json script ${name} is missing or incorrect`);
  }
  const check = packageJson.scripts?.check ?? "";
  const sequence = ["test:knowledge-lifecycle", "check:knowledge-composite-evals", "test:knowledge-composite-evals", "check:compiled-lifecycle-leaks", "check:nycartc-corpus"];
  let last = -1;
  for (const command of sequence) {
    const index = check.indexOf(`npm run ${command}`);
    if (index < 0) errors.push(`npm run check does not include ${command}`);
    if (index >= 0 && index <= last) errors.push(`npm run check has ${command} in the wrong order`);
    last = Math.max(last, index);
  }
  return errors;
}

export function validateHoldouts({ suite, state, receipts, receiptPaths = state.holdoutReceiptPaths ?? [], expectedContractFingerprint, expectedCandidateFingerprint, evidencePathExists = () => true }) {
  const errors = [];
  const expectedIds = suite.evals.map((item) => item.id);
  const expectedReceiptKeys = [
    "version", "judgeIdentity", "judgeRole", "authoredPatch",
    "sawOptimizationHistory", "candidateSha", "contractFingerprint",
    "candidateFingerprint", "evaluatedAt", "scores",
    "criticalRegressions", "instrumentDefects", "decision"
  ];
  const expectedScoreKeys = ["id", "score", "rationale", "evidencePaths"];
  if (!sameSet(receiptPaths, expectedHoldoutReceiptPaths) || duplicates(receiptPaths).length) {
    errors.push("Holdout receipt paths must match the evaluator-owned exact set");
  }
  for (const receiptPath of receiptPaths) {
    if (path.isAbsolute(receiptPath) || receiptPath.split("/").includes("..")) {
      errors.push(`Holdout receipt path escapes the repository: ${receiptPath}`);
    }
  }
  if (receipts.length !== 2) errors.push("Exactly two independent holdout receipts are required");
  const judgeIds = receipts.map((receipt) => receipt.judgeIdentity);
  if (new Set(judgeIds).size !== receipts.length) errors.push("Holdout judge identities must be unique");

  for (const receipt of receipts) {
    if (!sameSet(Object.keys(receipt), expectedReceiptKeys) || duplicates(Object.keys(receipt)).length) {
      errors.push(`${receipt.judgeIdentity ?? "unknown judge"} receipt must use the exact schema`);
    }
    if (receipt.version !== 1) errors.push(`${receipt.judgeIdentity ?? "unknown judge"} receipt version must be 1`);
    if (receipt.judgeIdentity === state.optimizerIdentity) errors.push("Optimizer may not grade the patch");
    if (receipt.judgeRole !== "read-only-independent") errors.push(`${receipt.judgeIdentity} must be read-only-independent`);
    if (receipt.authoredPatch !== false) errors.push(`${receipt.judgeIdentity} must not have authored the patch`);
    if (receipt.sawOptimizationHistory !== false) errors.push(`${receipt.judgeIdentity} must be blind to optimization history`);
    if (receipt.candidateSha !== state.candidateSha) errors.push(`${receipt.judgeIdentity} reviewed a different candidate SHA`);
    if (receipt.contractFingerprint !== expectedContractFingerprint) errors.push(`${receipt.judgeIdentity} reviewed a different contract fingerprint`);
    if (receipt.candidateFingerprint !== expectedCandidateFingerprint) errors.push(`${receipt.judgeIdentity} reviewed a different candidate fingerprint`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(receipt.evaluatedAt ?? "")) errors.push(`${receipt.judgeIdentity} needs an ISO evaluation date`);
    const scoreIds = (receipt.scores ?? []).map((score) => score.id);
    if (!sameSet(scoreIds, expectedIds)) errors.push(`${receipt.judgeIdentity} must score the exact eval set`);
    if (duplicates(scoreIds).length) errors.push(`${receipt.judgeIdentity} must score each eval exactly once`);
    for (const score of receipt.scores ?? []) {
      if (!sameSet(Object.keys(score), expectedScoreKeys) || duplicates(Object.keys(score)).length) {
        errors.push(`${receipt.judgeIdentity}/${score.id ?? "unknown"} score must use the exact schema`);
      }
      if (!Number.isInteger(score.score) || score.score < 0 || score.score > 4) errors.push(`${receipt.judgeIdentity}/${score.id} has invalid score`);
      if (!score.rationale || !Array.isArray(score.evidencePaths) || !score.evidencePaths.length) errors.push(`${receipt.judgeIdentity}/${score.id} needs rationale and evidence paths`);
      for (const evidencePath of score.evidencePaths ?? []) {
        if (path.isAbsolute(evidencePath) || evidencePath.split("/").includes("..") || !evidencePathExists(evidencePath)) {
          errors.push(`${receipt.judgeIdentity}/${score.id} cites evidence outside the candidate commit: ${evidencePath}`);
        }
      }
    }
    if (!Array.isArray(receipt.criticalRegressions)) errors.push(`${receipt.judgeIdentity} criticalRegressions must be an array`);
    else if (receipt.criticalRegressions.length) errors.push(`${receipt.judgeIdentity} found a critical regression`);
    if (!Array.isArray(receipt.instrumentDefects)) errors.push(`${receipt.judgeIdentity} instrumentDefects must be an array`);
    else if (receipt.instrumentDefects.length) errors.push(`${receipt.judgeIdentity} found an unresolved evaluator defect`);
    if (receipt.decision !== "pass_for_code_review") errors.push(`${receipt.judgeIdentity} did not pass the candidate for code review`);
  }
  const conservativeScores = Object.fromEntries(
    expectedIds.map((id) => {
      const values = receipts.map(
        (receipt) => receipt.scores?.find((score) => score.id === id)?.score ?? 0
      );
      return [id, values.length ? Math.min(...values) : 0];
    })
  );
  const aggregateTrustEligible =
    receipts.length === 2 &&
    errors.length === 0 &&
    conservativeScores["CI-007"] >= 3;
  if (aggregateTrustEligible) conservativeScores["CI-007"] = 4;
  const weights = new Map(suite.evals.map((item) => [item.id, item.weight]));
  const weightedScore = expectedIds.reduce((sum, id) => sum + conservativeScores[id] * weights.get(id), 0) / 400;
  const profile = suite.profiles.implementation_review;
  if (weightedScore < profile.weighted_score_minimum) errors.push(`Conservative weighted score ${weightedScore.toFixed(3)} is below ${profile.weighted_score_minimum}`);
  for (const id of expectedIds) if (conservativeScores[id] < profile.all_scores_minimum) errors.push(`${id} conservative score is below ${profile.all_scores_minimum}`);
  for (const id of profile.required_score_4_ids) if (conservativeScores[id] !== 4) errors.push(`${id} conservative score must be 4`);
  return { errors, conservativeScores, weightedScore };
}

export function readGitCandidateBinding(suite, candidateSha) {
  const runGit = (args) => execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
  const binding = {
    headSha: "",
    commitExists: false,
    candidateIsAncestor: false,
    changedPaths: [],
    historyChangedPaths: [],
    mergeCommits: [],
    candidateChangedPaths: [],
    candidateFingerprint: "",
    error: ""
  };
  try {
    binding.headSha = runGit(["rev-parse", "HEAD"]);
    runGit(["cat-file", "-e", `${candidateSha}^{commit}`]);
    binding.commitExists = true;
    const candidateChanged = runGit([
      "diff-tree", "--root", "--no-commit-id", "--name-only", "-r", candidateSha
    ]);
    binding.candidateChangedPaths = candidateChanged ? candidateChanged.split("\n") : [];
    binding.candidateFingerprint = candidateFingerprintAtCommit(suite, candidateSha);
    try {
      runGit(["merge-base", "--is-ancestor", candidateSha, binding.headSha]);
      binding.candidateIsAncestor = true;
    } catch {
      binding.candidateIsAncestor = false;
    }
    if (binding.candidateIsAncestor) {
      const changed = runGit(["diff", "--name-only", `${candidateSha}..${binding.headSha}`]);
      binding.changedPaths = changed ? changed.split("\n") : [];
      const postCandidateCommits = runGit(["rev-list", "--reverse", `${candidateSha}..${binding.headSha}`]);
      const historicalPaths = new Set();
      for (const commit of postCandidateCommits ? postCandidateCommits.split("\n") : []) {
        const commitPaths = runGit(["diff-tree", "--root", "--no-commit-id", "--name-only", "-r", commit]);
        for (const relativePath of commitPaths ? commitPaths.split("\n") : []) {
          if (relativePath) historicalPaths.add(relativePath);
        }
      }
      binding.historyChangedPaths = [...historicalPaths];
      const mergeCommits = runGit(["rev-list", "--merges", `${suite.baseline.commit}..${binding.headSha}`]);
      binding.mergeCommits = mergeCommits ? mergeCommits.split("\n") : [];
    }
  } catch (error) {
    binding.error = error instanceof Error ? error.message : String(error);
  }
  return binding;
}

export function candidatePathExistsAtCommit(candidateSha, relativePath) {
  try {
    execFileSync("git", ["cat-file", "-e", `${candidateSha}:${relativePath}`], {
      cwd: repoRoot,
      stdio: "ignore"
    });
    return true;
  } catch {
    return false;
  }
}

export function validateCandidateGitBinding(state, binding, expectedCandidateFingerprint) {
  const errors = [];
  if (!/^[a-f0-9]{40}$/.test(state.candidateSha ?? "")) {
    errors.push("State candidateSha must be a full implementation commit SHA");
    return errors;
  }
  if (!sameSet(state.allowedPostCandidatePaths ?? [], expectedPostCandidatePaths) || duplicates(state.allowedPostCandidatePaths ?? []).length) {
    errors.push("Post-candidate path allowlist must match the evaluator-owned exact set");
  }
  if (binding.error) errors.push(`Unable to inspect candidate Git binding: ${binding.error}`);
  if (!binding.commitExists) errors.push("State candidateSha does not resolve to a Git commit");
  if (!binding.candidateIsAncestor) errors.push("State candidateSha must be an ancestor of the checked-out HEAD");
  if (!(binding.candidateChangedPaths ?? []).some((relativePath) => !expectedPostCandidatePaths.includes(relativePath))) {
    errors.push("State candidateSha must be the implementation-changing commit, not an evidence-only commit");
  }
  if (binding.candidateFingerprint !== expectedCandidateFingerprint) {
    errors.push("Candidate fingerprint must reproduce from the named Git commit tree");
  }
  if ((binding.mergeCommits ?? []).length) {
    errors.push("Composite history must not contain wholesale donor merge commits");
  }
  const unauthorized = (binding.historyChangedPaths ?? binding.changedPaths ?? []).filter(
    (relativePath) => !expectedPostCandidatePaths.includes(relativePath)
  );
  if (unauthorized.length) {
    errors.push(`Post-candidate Git changes exceed the evidence-only allowlist: ${unauthorized.join(", ")}`);
  }
  return errors;
}

export function readCompositeArtifacts() {
  const suite = readJson(".agents/evals/knowledge-composite-integration.json");
  const state = readJson("docs/evals/knowledge-composite-integration-state.json");
  return {
    suite,
    state,
    agency: readJson("apps/www/src/data/knowledge-bank/agency-relations.json"),
    composition: readJson("docs/evals/composition-manifest.json"),
    mosaic: readJson("docs/evals/mosaic-privacy-review.json"),
    survivorship: readJson("docs/knowledge-bank/archival-survivorship-register.json"),
    blindStatus: readJson("docs/evals/blind-spot-human-status.json"),
    packageJson: readJson("package.json"),
    receipts: (state.holdoutReceiptPaths ?? [])
      .filter((receiptPath) =>
        expectedHoldoutReceiptPaths.includes(receiptPath) &&
        existsSync(path.join(repoRoot, receiptPath))
      )
      .map(readJson)
  };
}

export function validateCompositeArtifacts(artifacts, { requireHoldouts = true } = {}) {
  const { suite, state, agency, composition, mosaic, survivorship, blindStatus, packageJson, receipts } = artifacts;
  const errors = [
    ...validateSuite(suite),
    ...validateAgency(agency),
    ...validatePublicAgencySurfaceWording(),
    ...validateComposition(composition, agency),
    ...validateCompositionSourceBindings(),
    ...validateSurvivorship(survivorship),
    ...validateMosaic(mosaic),
    ...validateHumanState(state, blindStatus),
    ...validatePackageScripts(packageJson)
  ];
  for (const artifactPath of suite.required_artifacts ?? []) {
    if (!existsSync(path.join(repoRoot, artifactPath))) errors.push(`Required composite artifact is missing: ${artifactPath}`);
  }
  for (const fingerprintPath of suite.candidate_fingerprint_scope ?? []) {
    if (!existsSync(path.join(repoRoot, fingerprintPath))) errors.push(`Candidate fingerprint input is missing: ${fingerprintPath}`);
  }

  const expectedContractFingerprint = contractFingerprint(suite);
  const expectedCandidateFingerprint = candidateFingerprint(suite);
  let holdoutResult = { errors: [], conservativeScores: {}, weightedScore: 0 };
  if (requireHoldouts) {
    if (state.contractFingerprint !== expectedContractFingerprint) errors.push("State contract fingerprint is stale");
    if (state.candidateFingerprint !== expectedCandidateFingerprint) errors.push("State candidate fingerprint is stale");
    errors.push(...validateMosaic(mosaic, { expectedCandidateFingerprint, requireBinding: true }));
    const gitBinding = readGitCandidateBinding(suite, state.candidateSha);
    errors.push(...validateCandidateGitBinding(state, gitBinding, expectedCandidateFingerprint));
    if (state.decision !== "pass_for_code_review") errors.push("Composite state decision must be pass_for_code_review");
    if ((state.holdoutReceiptPaths ?? []).length !== 2) errors.push("State must list exactly two holdout receipts");
    holdoutResult = validateHoldouts({
      suite,
      state,
      receipts,
      receiptPaths: state.holdoutReceiptPaths ?? [],
      expectedContractFingerprint,
      expectedCandidateFingerprint,
      evidencePathExists: (relativePath) => candidatePathExistsAtCommit(state.candidateSha, relativePath)
    });
    errors.push(...holdoutResult.errors);
  }
  return {
    ...holdoutResult,
    errors,
    expectedContractFingerprint,
    expectedCandidateFingerprint
  };
}
