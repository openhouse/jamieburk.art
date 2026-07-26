#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  checkGeneratedOutputs,
  compileWiki,
  defaultRepoRoot,
  queryWiki,
  semanticGraphFingerprint
} from "./lib.mjs";
import {
  buildEmploymentOutputs,
  discoveryChecks,
  evaluatePublicHiring,
  resolveHiringGaps
} from "./employment-lib.mjs";
import { validateResponsiveAccessibilityEvidence } from "./accessibility-evidence.mjs";
import { findDisclosedProtectedIdentityDirectives } from "./privacy-boundaries.mjs";
import { evaluateMissingPages } from "./missing-pages-eval.mjs";
import { evaluateInterpretiveLayer } from "./interpretive-layer-eval.mjs";
import { evaluateFamilyClosure } from "./family-closure-eval.mjs";
import { evaluatePhotographyNotebook } from "./photography-notebook-eval.mjs";
import { evaluatePhotographyResidencyProposal } from "./photography-residency-proposal-eval.mjs";
import { evaluatePhotographyStudioConnection } from "./photography-studio-connection-eval.mjs";
import { allLayoutBPhotoApprovalsOpen } from "./layout-b-projection-eval.mjs";
import { evaluatePhotoKnowledge } from "../photo-knowledge/lib.mjs";
import { publicPhotoManifest } from "../../apps/www/src/data/photography.ts";

const suite = JSON.parse(
  readFileSync(path.join(defaultRepoRoot, "evals/knowledge-wiki/evals.json"), "utf8")
);
const result = compileWiki();
const second = compileWiki({ sourceMetadata: result.metadata });
const generatedIssues = checkGeneratedOutputs(result);
const root = result.byId.get("index.knowledge-wiki");
const project = result.byId.get("project.callnyc");
const claim = result.byId.get("claim.callnyc.independent-follow-on");
const asset = result.byId.get("asset.photo.digital-district.001");
const correction = result.byId.get("correction.callnyc-years.2026");
const opportunityQuery = queryWiki(result, {
  opportunity: "opportunity.nyc-oti.technical-operations-manager.782369"
});
const opportunities = result.records.filter((record) => record.kind === "opportunity");
const liveOpportunities = opportunities.filter(
  (record) => record.opportunity_status === "live"
);
const publicHiring = evaluatePublicHiring(defaultRepoRoot);
const gapResolution = resolveHiringGaps(result, publicHiring.report);
const employmentOutputs = buildEmploymentOutputs(result, publicHiring, gapResolution);
const discovery = discoveryChecks(result);
const requirementIds = opportunities.flatMap((record) =>
  record.role_requirements.map((requirement) => requirement.id)
);
const privateVault = result.byId.get("source.vault.communication-history.metadata");
const accessibilityEvidence = validateResponsiveAccessibilityEvidence(defaultRepoRoot);
const disclosedProtectedIdentityDirectives = findDisclosedProtectedIdentityDirectives(defaultRepoRoot);
const missingPages = evaluateMissingPages({ result });
const interpretiveLayer = evaluateInterpretiveLayer({ result });
const familyClosure = evaluateFamilyClosure({ result });
const photographyNotebook = evaluatePhotographyNotebook({ result });
const photographyResidencyProposal = evaluatePhotographyResidencyProposal({ result });
const photographyStudioConnection = evaluatePhotographyStudioConnection({ result });
const photographicKnowledgeLoop = evaluatePhotoKnowledge({ wiki: result });

const adrPath = path.join(defaultRepoRoot, "docs/architecture/ADR-knowledge-wiki-canonicality.md");
const adr = existsSync(adrPath) ? readFileSync(adrPath, "utf8") : "";
const rootSource = readFileSync(path.join(defaultRepoRoot, "docs/knowledge-bank/README.md"), "utf8");
const projectSource = project ? readFileSync(path.join(defaultRepoRoot, project.path), "utf8") : "";
const assetSource = asset ? readFileSync(path.join(defaultRepoRoot, asset.path), "utf8") : "";
const normalizedProjectSource = projectSource.replace(/\s+/g, " ");

let changedPaths = [];
try {
  const tracked = execFileSync("git", ["diff", "--name-only", "origin/feature/knowledge-h"], {
    cwd: defaultRepoRoot,
    encoding: "utf8"
  })
    .trim()
    .split("\n")
    .filter(Boolean);
  const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard"], {
    cwd: defaultRepoRoot,
    encoding: "utf8"
  })
    .trim()
    .split("\n")
    .filter(Boolean);
  changedPaths = [...new Set([...tracked, ...untracked])];
} catch {
  // The remaining checks still run outside a Git checkout.
}

let layoutBChangedPaths = changedPaths;
try {
  layoutBChangedPaths = execFileSync(
    "git",
    ["diff", "--name-only", "origin/feature/photos-B"],
    { cwd: defaultRepoRoot, encoding: "utf8" }
  )
    .trim()
    .split("\n")
    .filter(Boolean);
} catch {
  // Use the canonical family comparison when the frozen photo ref is unavailable.
}

const publicProjectionPathPattern =
  /^(?:apps\/www\/src\/(?:app|components)|apps\/www\/src\/data\/(?:work|photography)\.ts|apps\/www\/public\/)/;
const publicUiChanged = changedPaths.some((file) => publicProjectionPathPattern.test(file));
const changedPublicUiPaths = changedPaths.filter((file) =>
  publicProjectionPathPattern.test(file)
);
const layoutBChangedPublicUiPaths = layoutBChangedPaths.filter((file) =>
  publicProjectionPathPattern.test(file)
);
const technicalOperationsPath = "apps/www/src/app/work/technical-operations/page.tsx";
const technicalOperationsSource = readFileSync(path.join(defaultRepoRoot, technicalOperationsPath), "utf8");
const legacyBoundedPublicUiPaths = [
  "apps/www/src/app/globals.css",
  "apps/www/src/app/lab/source-backed-team-memory/page.tsx",
  technicalOperationsPath,
  "apps/www/src/components/CaseStudyBlocks.tsx",
  "apps/www/src/components/TagList.tsx"
].sort();
const legacyBoundedPublicUiChange = JSON.stringify([...changedPublicUiPaths].sort()) ===
  JSON.stringify(legacyBoundedPublicUiPaths);
const layoutBManifestPath = "apps/www/src/data/photography.ts";
const layoutBDesignPath = "docs/design/layout-B-photography-integration.md";
const layoutBEvalPath = "evals/layout/layout-B.json";
const governedLayoutBPublicUiChange =
  layoutBChangedPaths.includes(layoutBDesignPath) &&
  layoutBChangedPaths.includes(layoutBEvalPath) &&
  layoutBChangedPaths.includes(layoutBManifestPath) &&
  layoutBChangedPublicUiPaths.every((file) =>
    /^(?:apps\/www\/src\/app\/|apps\/www\/src\/components\/|apps\/www\/src\/data\/(?:work|photography)\.ts$|apps\/www\/public\/images\/field-notes\/[^/]+\.webp$)/.test(file)
  ) &&
  !layoutBChangedPublicUiPaths.some((file) =>
    /apps\/www\/src\/app\/(?:proofs|knowledge-bank|public-claims)(?:\/|$)/.test(file)
  ) &&
  !layoutBChangedPaths.some((file) =>
    [
      "apps/www/src/data/proofs.ts",
      "apps/www/src/data/knowledge-bank/records.ts"
    ].includes(file)
  ) &&
  allLayoutBPhotoApprovalsOpen(publicPhotoManifest);
const boundedPublicUiChange =
  legacyBoundedPublicUiChange || governedLayoutBPublicUiChange;
const caseStudyBlocksSource = readFileSync(
  path.join(defaultRepoRoot, "apps/www/src/components/CaseStudyBlocks.tsx"),
  "utf8"
);
const tagListSource = readFileSync(
  path.join(defaultRepoRoot, "apps/www/src/components/TagList.tsx"),
  "utf8"
);
const labSource = readFileSync(
  path.join(defaultRepoRoot, "apps/www/src/app/lab/source-backed-team-memory/page.tsx"),
  "utf8"
);
const employmentOutputsCurrent = Object.entries(employmentOutputs).every(
  ([relativePath, content]) =>
    existsSync(path.join(defaultRepoRoot, relativePath)) &&
    readFileSync(path.join(defaultRepoRoot, relativePath), "utf8") === content
);

const checks = {
  canonical_product_name: root?.title === "Knowledge Wiki" && rootSource.includes("# Knowledge Wiki"),
  compatibility_alias: root?.aliases.includes("Knowledge Bank") && rootSource.includes("Former and compatibility name"),
  single_physical_root: !existsSync(path.join(defaultRepoRoot, "docs/knowledge-wiki")),
  canonicality_adr:
    adr.includes("## Authority registry") &&
    adr.includes("Authored, derived, and projected") &&
    adr.includes("Human authority"),
  existing_authorities_preserved:
    adr.includes("apps/www/src/data/knowledge-bank/records.ts") &&
    adr.includes("apps/www/src/data/work.ts") &&
    adr.includes("apps/www/src/data/proofs.ts"),
  bounded_public_projection_change:
    publicUiChanged &&
    boundedPublicUiChange &&
    (
      governedLayoutBPublicUiChange ||
      (
        technicalOperationsSource.includes("I create the operating backbone complex teams need to move") &&
        caseStudyBlocksSource.includes('tone="inverted"') &&
        !caseStudyBlocksSource.includes("text-jb-paper/70") &&
        !caseStudyBlocksSource.includes("text-jb-ink/64") &&
        tagListSource.includes("border-jb-paper/45 bg-jb-paper text-jb-blue") &&
        !labSource.includes("text-jb-ink/68")
      )
    ),
  branch_donor_synthesis:
    adr.includes("## Branch donor synthesis") &&
    ["**A:**", "**B:**", "**C:**", "**D:**", "**E:**"].every((marker) => adr.includes(marker)),
  no_explorer: !changedPaths.some((file) => /knowledge-(?:wiki-)?explorer/i.test(file)),

  task_oriented_root:
    rootSource.includes("## Start here") &&
    rootSource.includes("Pilot map") &&
    rootSource.includes("Wiki health report"),
  stable_unique_ids: !result.errors.some((issue) => issue.code === "DUPLICATE_ID"),
  aliases_unique: !result.errors.some((issue) => issue.code === "ALIAS_COLLISION"),
  relative_links_resolve: !result.errors.some((issue) => issue.code === "BROKEN_LINK"),
  heading_fragments_resolve: !result.errors.some((issue) => issue.code === "BROKEN_FRAGMENT"),
  typed_targets_and_hrefs_align: !result.errors.some((issue) =>
    ["UNKNOWN_RELATION_TARGET", "RELATION_HREF", "RELATION_HREF_MISMATCH", "RELATION_SHAPE"].includes(issue.code)
  ),
  pilot_reachable:
    result.graph.nodes.length >= 14 &&
    result.graph.nodes.every((node) => result.reachable.has(node.id) || ["source", "asset", "correction"].includes(node.kind)),
  type_aware_orphans:
    result.health.diagnostics.orphanCount === 0 &&
    !result.health.orphans.some((item) => ["source", "asset", "correction"].includes(item.kind)),

  jamie_visible_as_actor:
    projectSource.includes("Jamie independently developed") ||
    projectSource.includes("Jamie independently built"),
  purpose_and_usable_result_visible:
    project?.summary.includes("resident-facing issue pathways") &&
    normalizedProjectSource.includes("public-facing interpretation"),
  technical_operations_query:
    opportunityQuery.opportunity?.id === "opportunity.nyc-oti.technical-operations-manager.782369" &&
    opportunityQuery.connected.some((record) => record.id === "capability.technical-operations") &&
    opportunityQuery.connected.some((record) => record.id === "method.source-backed-team-memory"),
  public_projection_smaller_than_wiki:
    adr.includes("public portfolio remains a smaller") &&
    result.graph.nodes.filter((node) => node.kind === "projection").length < result.graph.nodes.length,

  source_identity_preserved:
    result.graph.nodes.some((node) => node.id === "source.politico.callnyc.2016-03-14") &&
    result.graph.nodes.some((node) => node.id === "source.civichall.hackathon-announcement.2016"),
  evidence_types_distinct:
    result.graph.edges.some((edge) => edge.type === "evidence:direct-support") &&
    result.graph.edges.some((edge) => edge.source === "frontmatter"),
  not_recovered_not_nonexistence:
    normalizedProjectSource.includes("This is not proof that no page ever existed") &&
    !result.errors.some((issue) => issue.code === "NON_RECOVERY_POSITIVE"),
  asset_evidence_not_rights:
    asset?.rights_state === "permission-needed" &&
    asset?.public_display_status === "hold" &&
    assetSource.includes("Evidentiary usefulness does not clear an asset"),

  claim_source_closure:
    claim?.evidence.length > 0 &&
    !result.errors.some((issue) => issue.code.startsWith("INVALID_EVIDENCE")),
  correction_traceable:
    correction?.registry_ids.includes("COR-CALLNYC-CHRONOLOGY-2026") &&
    correction?.relations.some((relation) => relation.type === "supersedes") &&
    correction?.affected_surfaces.includes("/resume"),
  private_paths_rejected: !result.errors.some((issue) => issue.code === "PRIVATE_PATH"),
  rights_pending_fails_closed:
    asset?.projection?.status === "hold" &&
    !result.errors.some((issue) => ["PRIVATE_PROJECTION", "RIGHTS_PROJECTION"].includes(issue.code)),
  anti_claims_preserved:
    claim?.anti_claims.length >= 3 &&
    claim.anti_claims.some((item) => item.includes("commissioned")),
  protected_identity_directives_generic: disclosedProtectedIdentityDirectives.length === 0,
  human_gates_open:
    result.health.humanGates.length >= 5 &&
    result.health.humanGates.every((gate) => !["completed", "resolved"].includes(gate.state)),

  graph_deterministic:
    semanticGraphFingerprint(result.graph) === semanticGraphFingerprint(second.graph),
  generated_outputs_current: generatedIssues.length === 0,
  employment_outputs_current: employmentOutputsCurrent,
  candidate_bound_accessibility_evidence: accessibilityEvidence.passed,
  mutation_suite:
    existsSync(path.join(defaultRepoRoot, "scripts/knowledge-wiki/wiki.test.mjs")) &&
    existsSync(path.join(defaultRepoRoot, "scripts/knowledge-wiki/employment.test.mjs")) &&
    existsSync(
      path.join(defaultRepoRoot, "scripts/knowledge-wiki/interpretive-layer-eval.test.mjs")
    ) &&
    existsSync(
      path.join(defaultRepoRoot, "scripts/knowledge-wiki/family-closure-eval.test.mjs")
    ) &&
    existsSync(
      path.join(defaultRepoRoot, "scripts/knowledge-wiki/photography-notebook-eval.test.mjs")
    ) &&
    existsSync(
      path.join(
        defaultRepoRoot,
        "scripts/knowledge-wiki/photography-residency-proposal-eval.test.mjs"
      )
    ) &&
    existsSync(
      path.join(
        defaultRepoRoot,
        "scripts/knowledge-wiki/photography-studio-connection-eval.test.mjs"
      )
    ),
  legacy_checks_preserved:
    readFileSync(path.join(defaultRepoRoot, "package.json"), "utf8").includes("npm run check:citations") &&
    existsSync(path.join(defaultRepoRoot, "scripts/check-knowledge-bank.mjs")),

  tier_one_official_source_records:
    opportunities.length === 6 &&
    opportunities.every((record) =>
      record.evidence.some((evidence) => {
        const source = result.byId.get(evidence.target);
        return source?.kind === "source" && source.source_kind === "official-job-posting";
      })
    ),
  opportunity_contract_complete:
    opportunities.every(
      (record) =>
        record.canonical_url &&
        record.source_type === "official-employer" &&
        ["live", "closed"].includes(record.opportunity_status) &&
        record.verified_at &&
        record.review_by &&
        record.portfolio_routes.length > 0 &&
        record.role_requirements.length > 0
    ),
  stable_requirement_ids:
    requirementIds.length >= 25 && new Set(requirementIds).size === requirementIds.length,
  operator_queries:
    liveOpportunities.length > 0 &&
    queryWiki(result, { liveOpportunities: true }).records.length === liveOpportunities.length &&
    queryWiki(result, { requirement: "requirement.oti.delivery-coordination" }).opportunity?.id ===
      "opportunity.nyc-oti.technical-operations-manager.782369",
  hard_screens_explicit: opportunities.every((record) => record.hard_screens.length > 0),
  confirmed_inferred_unknown_separate: opportunities.every(
    (record) =>
      Array.isArray(record.confirmed_facts) &&
      Array.isArray(record.inferences) &&
      Array.isArray(record.unknowns)
  ),
  one_year_fit_bounded: opportunities.every(
    (record) =>
      record.one_year_success_conditions.length > 0 &&
      record.one_year_risk_conditions.length > 0 &&
      record.interview_questions.length > 0
  ),
  protected_communications_metadata_only:
    privateVault?.visibility === "summary-only" &&
    privateVault?.opaque_locator === "vault.source.communication-history" &&
    privateVault?.public_use_status === "summary-only" &&
    !result.errors.some((issue) => issue.code === "PRIVATE_PATH"),

  public_evaluator_has_no_hidden_wiki:
    publicHiring.report.publicSafety.privateMarkerCount === 0 &&
    publicHiring.report.publicSafety.protectedWikiReceived === false &&
    publicHiring.report.publicSafety.rawCommunicationsReceived === false &&
    !JSON.stringify(publicHiring.report).includes("wikiRecords"),
  gap_resolver_separate:
    gapResolution.report.publicReportHash.length === 64 &&
    gapResolution.report.humanApprovalRequired === true &&
    gapResolution.report.findings.every((finding) => finding.requiresHumanApproval),
  reader_profiles_disclaimed:
    publicHiring.report.readers.length >= 6 &&
    publicHiring.report.readers
      .filter((reader) => reader.id !== "reader.generic-recruiter")
      .every(
        (reader) =>
          /Simulated/.test(reader.disclaimer) && reader.prohibitedAssumptions.length >= 2
      ),
  candidate_and_context_hashes_present:
    /^[0-9a-f]{40}$/.test(publicHiring.report.candidateSha) &&
    [
      publicHiring.report.portfolioSnapshotHash,
      publicHiring.report.roleContextHash,
      publicHiring.report.readerContextHash,
      publicHiring.report.promptHash
    ].every((value) => /^[0-9a-f]{64}$/.test(value)),
  role_contexts_fresh: publicHiring.report.opportunities.every(
    (item) => item.live ? item.fresh : item.decision === "not-live"
  ),
  external_outcomes_remain_open:
    result.health.humanGates.some(
      (gate) => gate.id === "hiring-outcomes" && !["completed", "resolved"].includes(gate.state)
    ),

  title_blind_recall_passes:
    discovery.passed && discovery.queries.every((item) => item.titleBlind && item.passed),
  negative_controls_excluded: discovery.negatives.every(
    (item) => item.passed && item.disposition === "exclude-hard-screen"
  ),
  real_gaps_remain_visible:
    gapResolution.report.findings.some((item) => item.classification === "true-experience-gap") &&
    gapResolution.report.findings.some((item) => item.classification === "source-needs-close-reading"),
  portfolio_projection_remains_selective:
    opportunities.every((record) => !record.projection || record.projection.status !== "active") &&
    boundedPublicUiChange,

  ...missingPages.checks,
  ...interpretiveLayer.checks,
  ...familyClosure.checks,
  ...photographyNotebook.checks,
  ...photographyResidencyProposal.checks,
  ...photographyStudioConnection.checks,
  ...photographicKnowledgeLoop.checks
};

let failed = 0;
for (const lens of suite.lenses) {
  const lensFailures = lens.criteria.filter((criterion) => checks[criterion] !== true);
  if (lensFailures.length) {
    failed += lensFailures.length;
    console.error(`FAIL ${lens.id}: ${lensFailures.join(", ")}`);
  } else {
    console.log(`PASS ${lens.id}: ${lens.criteria.length}/${lens.criteria.length}`);
  }
}

const undeclared = Object.keys(checks).filter(
  (criterion) => !suite.lenses.some((lens) => lens.criteria.includes(criterion))
);
if (undeclared.length) {
  console.error(`FAIL undeclared criteria: ${undeclared.join(", ")}`);
  failed += undeclared.length;
}

if (result.errors.length) {
  console.error(`FAIL hard gates: ${result.errors.length} compiler error(s)`);
  failed += result.errors.length;
}

if (failed) process.exit(1);

console.log(
  `Knowledge Wiki evals passed across ${suite.lenses.length} independent lenses; ${Object.keys(checks).length} blocking criteria; human authority gates remain open.`
);
