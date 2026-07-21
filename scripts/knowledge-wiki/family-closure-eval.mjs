#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

export const pinnedFrozenHeads = Object.freeze({
  "feature/knowledge-wiki-A": "920f9024d7e058700f282e3e1e76188fe1c5294e",
  "feature/knowledge-wiki-B": "268a92d794f5b604f4004fc9d6e5652f234fc61b",
  "feature/knowledge-wiki-C": "6a2af7396240381ce04aad9b9129ba402b83c134",
  "feature/knowledge-wiki-D": "e5a7ac607bfbd5a428bb18c2f7af5baad614132b",
  "feature/knowledge-wiki-E": "9f1bbfacec3edbfbc47a5200f777d4f498da0ec4"
});

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function objectMatches(actual, expected) {
  return (
    Object.keys(actual).length === Object.keys(expected).length &&
    Object.entries(expected).every(([key, value]) => actual[key] === value)
  );
}

export function evaluateFamilyClosure(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const result = options.result ?? compileWiki({ repoRoot });
  const contract =
    options.contract ?? readJson(repoRoot, "evals/knowledge-wiki/family-closure.json");
  const closure =
    options.closure ?? readJson(repoRoot, "docs/integration/knowledge-wiki-family-closure.json");
  const census =
    options.census ??
    readJson(
      repoRoot,
      "docs/knowledge-bank/data/knowledge-wiki-family-census-reconciliation.json"
    );
  const recordOverrides = options.recordOverrides ?? {};
  const sourceOverrides = options.sourceOverrides ?? {};
  const fileOverrides = options.fileOverrides ?? {};
  const pathExists = options.pathExists ?? ((relativePath) => existsSync(path.join(repoRoot, relativePath)));
  const routePaths = options.routePaths ?? contract.disallowedPublicRoutePaths;

  const fileSource = (relativePath) => {
    if (Object.hasOwn(fileOverrides, relativePath)) return fileOverrides[relativePath];
    return pathExists(relativePath) ? readFileSync(path.join(repoRoot, relativePath), "utf8") : "";
  };

  let changedSinceFoundation = options.changedSinceFoundation;
  if (!changedSinceFoundation) {
    const foundationSha = contract.expectedFrozenHeads[contract.canonicalArchitecture];
    try {
      const tracked = execFileSync("git", ["diff", "--name-only", foundationSha, "--"], {
        cwd: repoRoot,
        encoding: "utf8"
      })
        .trim()
        .split("\n")
        .filter(Boolean);
      const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard"], {
        cwd: repoRoot,
        encoding: "utf8"
      })
        .trim()
        .split("\n")
        .filter(Boolean);
      changedSinceFoundation = [...new Set([...tracked, ...untracked])];
    } catch {
      changedSinceFoundation = null;
    }
  }

  const record = (id) =>
    Object.hasOwn(recordOverrides, id) ? recordOverrides[id] : result.byId.get(id);
  const source = (id) => {
    if (Object.hasOwn(sourceOverrides, id)) return sourceOverrides[id];
    const item = record(id);
    return item ? readFileSync(path.join(repoRoot, item.path), "utf8") : "";
  };

  const donorHeads = Object.fromEntries(
    (closure.frozenDonors ?? []).map((donor) => [donor.branch, donor.sha])
  );
  const donorBranches = new Set((closure.frozenDonors ?? []).map((donor) => donor.branch));
  const allDestinations = (closure.frozenDonors ?? []).flatMap((donor) => donor.destinations ?? []);
  const expectedRecordIds = contract.requiredRecords.map(([id]) => id);
  const rootTargets = new Set(
    record("index.knowledge-wiki")?.relations?.map((relation) => relation.target) ?? []
  );
  const livingTargets = new Set(
    record("index.knowledge-wiki.living-archive")?.relations?.map(
      (relation) => relation.target
    ) ?? []
  );
  const decision = record("decision.knowledge-wiki.family-closure");
  const decisionTargets = new Set(decision?.relations?.map((relation) => relation.target) ?? []);
  const stakes = record("method.what-is-at-stake-for-me");
  const workflowSource = fileSource(contract.requiredWorkflowFile);
  const reviewSource = fileSource(contract.requiredReviewFile);
  const censusByBranch = Object.fromEntries(
    (census.observations ?? []).map((observation) => [observation.branch, observation.population])
  );
  const censusHeads = Object.fromEntries(
    (census.observations ?? []).map((observation) => [observation.branch, observation.sha])
  );

  const checks = {
    frozen_heads_exact:
      donorBranches.size === 5 &&
      objectMatches(contract.expectedFrozenHeads, pinnedFrozenHeads) &&
      objectMatches(donorHeads, contract.expectedFrozenHeads) &&
      objectMatches(censusHeads, contract.expectedFrozenHeads),
    base_target_exact:
      closure.base?.branch === contract.base.branch &&
      closure.base?.sha === contract.base.sha &&
      closure.target?.branch === contract.target.branch &&
      closure.target?.pullRequestBase === contract.target.pullRequestBase,
    one_canonical_architecture:
      closure.canonicalArchitecture === contract.canonicalArchitecture &&
      !pathExists("docs/knowledge-wiki") &&
      pathExists("docs/knowledge-bank") &&
      pathExists("scripts/knowledge-wiki/lib.mjs"),
    every_donor_has_materialized_destination:
      (closure.frozenDonors ?? []).every(
        (donor) =>
          ["adapted", "foundation"].includes(donor.disposition) &&
          typeof donor.strength === "string" &&
          donor.strength.length >= 40 &&
          donor.destinations?.length > 0 &&
          donor.destinations.every((destination) => pathExists(destination))
      ) && allDestinations.length >= 15,
    selected_records_materialized:
      contract.requiredRecords.every(([id, expectedPath]) => {
        const item = record(id);
        return item?.path === expectedPath && item?.canonical_path === expectedPath;
      }),
    selected_records_navigable:
      contract.rootTargets.every((id) => rootTargets.has(id)) &&
      contract.livingArchiveTargets.every((id) => livingTargets.has(id)) &&
      expectedRecordIds.every(
        (id) =>
          result.reachable.has(id) ||
          ["source", "asset", "correction"].includes(record(id)?.kind)
      ),
    closure_decision_links_outputs:
      decision?.projection?.status === "hold" &&
      decision?.projection?.surfaces?.length === 0 &&
      decision?.resulting_artifacts?.length >= 10 &&
      decision.resulting_artifacts.every((id) => decisionTargets.has(id)),
    census_conflict_preserved:
      census.universalMetricStatus === "disallowed" &&
      objectMatches(censusByBranch, contract.expectedCensus) &&
      new Set(Object.values(censusByBranch)).size >= 4 &&
      census.workingSnapshot?.branch === contract.canonicalArchitecture &&
      census.workingSnapshot?.population === contract.expectedCensus[contract.canonicalArchitecture] &&
      /run-specific/i.test(census.workingSnapshot?.boundary ?? "") &&
      /not a universal/i.test(census.workingSnapshot?.boundary ?? "") &&
      census.unresolved?.length >= 4 &&
      census.nextProtocol?.length >= 5,
    personal_stakes_remains_human_gated:
      stakes?.status === "draft" &&
      stakes?.human_review === "requested" &&
      stakes?.projection_status === "pending" &&
      stakes?.projection?.status === "hold" &&
      stakes?.projection?.surfaces?.length === 0 &&
      /Only Jamie may resolve/i.test(source("method.what-is-at-stake-for-me")),
    adoption_and_relation_boundaries_explicit:
      /Delivery is not adoption/i.test(source("method.outcomes-and-adoption")) &&
      /Typed proximity is not causality/i.test(
        source("index.knowledge-wiki.relational-infrastructure-atlas")
      ) &&
      /Evidence for one does not automatically establish the others/i.test(
        source("method.identity-systems-shared-infrastructure")
      ),
    visual_rights_sequence_complete:
      /## Promotion sequence/.test(source("index.knowledge-wiki.visual-evidence")) &&
      /rights, consent, caption accuracy/i.test(source("index.knowledge-wiki.visual-evidence")) &&
      /permanently held from public/i.test(source("index.knowledge-wiki.visual-evidence")),
    no_public_wiki_or_proofs_route:
      routePaths.every((routePath) => !pathExists(routePath)) &&
      expectedRecordIds.every(
        (id) => record(id)?.projection?.status !== "active" && record(id)?.projection_status !== "active"
      ),
    closure_public_surface_unchanged:
      Array.isArray(changedSinceFoundation) &&
      !changedSinceFoundation.some((relativePath) => relativePath.startsWith("apps/www/src/")),
    pull_request_ci_runs_complete_check:
      pathExists(contract.requiredWorkflowFile) &&
      /pull_request:/.test(workflowSource) &&
      /fetch-depth:\s*0/.test(workflowSource) &&
      /node-version-file:\s*\.nvmrc/.test(workflowSource) &&
      /run:\s*npm ci/.test(workflowSource) &&
      /run:\s*npm run check/.test(workflowSource),
    final_review_packet_complete:
      pathExists(contract.requiredReviewFile) &&
      [
        "## Decision",
        "## What enters develop",
        "## What does not enter develop",
        "## Review path",
        "## Machine acceptance",
        "## Human acceptance still open"
      ].every((heading) => reviewSource.includes(heading)) &&
      ["A's", "B's", "C's", "D's", "feature/knowledge-wiki-E"].every(
        (marker) => reviewSource.includes(marker)
      ) &&
      reviewSource.includes("no new public application source") &&
      reviewSource.includes("A universal NYC Artist Coalition shared-folder count") &&
      reviewSource.includes("npm run check"),
    human_authority_gates_open:
      result.health.humanGates.length >= 5 &&
      result.health.humanGates.every((gate) => !["completed", "resolved"].includes(gate.state))
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      donors: closure.frozenDonors?.length ?? 0,
      destinations: allDestinations.length,
      selectedRecords: expectedRecordIds.length,
      censusObservations: census.observations?.length ?? 0
    }
  };
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  const evaluation = evaluateFamilyClosure();
  if (!evaluation.passed) {
    console.error(`Knowledge Wiki family closure eval failed: ${evaluation.failures.join(", ")}`);
    process.exit(1);
  }
  console.log(
    `Knowledge Wiki family closure eval passed: ${Object.keys(evaluation.checks).length} blocking criteria, ${evaluation.counts.donors} frozen donors, ${evaluation.counts.selectedRecords} selected records; human gates remain open.`
  );
}
