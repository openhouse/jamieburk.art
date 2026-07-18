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

const publicUiChanged = changedPaths.some((file) =>
  /^(?:apps\/www\/src\/(?:app|components)|apps\/www\/src\/data\/work\.ts|apps\/www\/public\/)/.test(file)
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
  no_public_ui_change: !publicUiChanged,
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
  human_gates_open:
    result.health.humanGates.length >= 5 &&
    result.health.humanGates.every((gate) => !["completed", "resolved"].includes(gate.state)),

  graph_deterministic:
    semanticGraphFingerprint(result.graph) === semanticGraphFingerprint(second.graph),
  generated_outputs_current: generatedIssues.length === 0,
  mutation_suite: existsSync(path.join(defaultRepoRoot, "scripts/knowledge-wiki/wiki.test.mjs")),
  legacy_checks_preserved:
    readFileSync(path.join(defaultRepoRoot, "package.json"), "utf8").includes("npm run check:citations") &&
    existsSync(path.join(defaultRepoRoot, "scripts/check-knowledge-bank.mjs"))
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
