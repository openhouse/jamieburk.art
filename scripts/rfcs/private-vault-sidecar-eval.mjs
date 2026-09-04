#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

import { evaluateWorkspacePair } from "../workspace-pair.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const rfcPath = "rfcs/0011-private-vault-sidecar.md";
const contractPath = "rfcs/0011-private-vault-sidecar.contract.json";
const suitePath = "evals/knowledge-bank/private-vault-sidecar-rfc-evals.json";
const manifestPath = "config/paired-workspace.public.json";
const candidatePaths = [
  ".githooks/post-checkout",
  ".gitignore",
  "AGENTS.md",
  "docs/operations/paired-public-private-workspaces.md",
  suitePath,
  "package.json",
  manifestPath,
  "rfcs/README.md",
  rfcPath,
  contractPath,
  "scripts/check-rfcs.mjs",
  "scripts/workspace-pair.mjs",
  "scripts/rfcs/private-vault-sidecar-eval.mjs",
  "scripts/rfcs/private-vault-sidecar-eval.test.mjs",
  "scripts/rfcs/private-vault-sidecar-rfc.test.mjs"
];

function loadJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function candidateFingerprint(repoRoot) {
  const digest = createHash("sha256");
  for (const relativePath of [...candidatePaths].sort()) {
    digest.update(relativePath);
    digest.update("\0");
    digest.update(readFileSync(path.join(repoRoot, relativePath)));
    digest.update("\0");
  }
  return digest.digest("hex");
}

export function evaluatePrivateVaultSidecarRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const contract = options.contract ?? loadJson(repoRoot, contractPath);
  const suite = options.suite ?? loadJson(repoRoot, suitePath);
  const manifest = options.manifest ?? loadJson(repoRoot, manifestPath);
  const rfc = options.rfcSource ?? readFileSync(path.join(repoRoot, rfcPath), "utf8");
  const gitignore = readFileSync(path.join(repoRoot, ".gitignore"), "utf8")
    .split(/\r?\n/)
    .filter(Boolean);

  const scenarioResults = suite.cases.map((scenario) => {
    const actual = evaluateWorkspacePair(contract, scenario.state);
    return {
      id: scenario.id,
      passed: isDeepStrictEqual(actual, scenario.expected),
      actual,
      expected: scenario.expected
    };
  });

  const checks = {
    implementation_authorized:
      contract.rfc === 11 &&
      contract.stage === "implementing" &&
      contract.authority?.decision_owner === "Jamie Burkart" &&
      contract.authority?.implementation_authorized === true &&
      contract.authority?.private_repository_creation_authorized === true &&
      contract.authority?.private_content_publication_authorized === false &&
      /^stage:\s+implementing$/m.test(rfc) &&
      !/^implementation:\s+null$/m.test(rfc),
    exact_coordination_independent_history:
      contract.lockstep?.branch_name === "exact" &&
      contract.lockstep?.base_branch_name === "exact" &&
      contract.lockstep?.pull_request_title === "exact" &&
      contract.lockstep?.commit_identity === "independent" &&
      contract.pull_requests?.one_merge_does_not_authorize_other === true,
    public_opacity:
      contract.public_boundary?.private_locator === "operator-local-only" &&
      contract.public_boundary?.public_may_name_private_repository === false &&
      contract.public_boundary?.public_may_link_private_pull_request === false &&
      contract.public_boundary?.public_may_reveal_private_topology === false &&
      manifest.counterpart_locator === "operator-local-only" &&
      !contract.public_boundary.forbidden_fields.some((field) => Object.hasOwn(manifest, field)),
    public_runtime_independence:
      contract.public_boundary?.runtime_dependency_on_private === false &&
      manifest.public_runtime_dependency === false &&
      contract.authority?.public_deployment_authorized === false,
    private_is_governed_not_raw_vault:
      contract.private_boundary?.is_not_credential_store === true &&
      contract.private_boundary?.is_not_unrestricted_raw_archive === true &&
      contract.private_boundary?.raw_source_default === "governed-pointer" &&
      contract.private_boundary?.public_projection_requires_separate_packet === true,
    complete_private_call_record_accounting:
      contract.private_boundary?.bounded_complete_call_record_policy ===
        "explicit-authorization-and-access-review" &&
      contract.private_boundary?.every_captured_artifact_requires_disposition === true &&
      contract.private_boundary?.participant_restrictions_control_disclosure === true &&
      contract.private_boundary?.restricted_shareable_omission_is_not_private_deletion === true,
    one_way_reference_model:
      contract.reference_model?.direction === "private-to-public" &&
      contract.reference_model?.shared_join_key === "public_projection_id" &&
      contract.reference_model?.public_private_backlink === false &&
      contract.reference_model?.public_missing_edge_diagnostic === false,
    local_coordination_is_private:
      gitignore.includes(".workspace-pair.local.json") &&
      gitignore.includes(".source-access.local.json") &&
      existsSync(path.join(repoRoot, ".githooks/post-checkout")) &&
      existsSync(path.join(repoRoot, "scripts/workspace-pair.mjs")),
    scenario_coverage:
      scenarioResults.length >= 7 && scenarioResults.every((scenario) => scenario.passed)
  };

  const criterionWeight = 1 / Object.keys(checks).length;
  const rubric = Object.fromEntries(
    Object.keys(checks).map((id) => [id, { weight: criterionWeight, hard: true }])
  );
  const score = Object.entries(rubric).reduce(
    (total, [id, criterion]) => total + (checks[id] ? criterion.weight : 0),
    0
  );
  const hardFailures = Object.entries(rubric)
    .filter(([id, criterion]) => criterion.hard && !checks[id])
    .map(([id]) => id);

  return {
    schema_version: 1,
    rfc: 11,
    stage: contract.stage,
    candidate_files: candidatePaths,
    candidate_fingerprint: candidateFingerprint(repoRoot),
    score: Number(score.toFixed(3)),
    checks,
    hard_failures: hardFailures,
    scenarios: {
      total: scenarioResults.length,
      passed: scenarioResults.filter((scenario) => scenario.passed).length,
      failed: scenarioResults.filter((scenario) => !scenario.passed).length,
      results: scenarioResults
    },
    public_runtime_dependency: contract.public_boundary.runtime_dependency_on_private,
    implementation_authorized: contract.authority.implementation_authorized,
    publication_authorized: contract.authority.private_content_publication_authorized
  };
}

function main() {
  const evaluation = evaluatePrivateVaultSidecarRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length > 0 || evaluation.scenarios.failed > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
