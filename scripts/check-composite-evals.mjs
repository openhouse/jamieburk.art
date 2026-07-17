#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const manifestPath = ".agents/evals/composite-integration.json";
const expectedProfiles = new Set([
  "knowledge-development",
  "application-share",
  "production-launch",
  "blind-spot-stewardship"
]);
const expectedGraders = new Set(["deterministic", "browser", "independent-llm-holdout", "human"]);
const expectedSources = new Set("ABCDEFGHIJKLMN".split(""));
const allowedDecisions = new Set(["adopt", "adapt", "defer", "reject"]);

function thresholdsFor(suite, target) {
  const keys = {
    "claim-development": "claim_development_thresholds",
    "projection-candidate": "projection_candidate_thresholds",
    "application-share": "application_share_thresholds",
    "production-launch": "production_launch_thresholds",
    "development-readiness": "development_readiness_thresholds",
    "release-readiness": "release_readiness_thresholds"
  };
  return suite[keys[target]];
}

function duplicates(values) {
  const seen = new Set();
  return values.filter((value) => seen.has(value) || !seen.add(value));
}

export function validateCompositeManifest(manifest) {
  const errors = [];
  if (manifest.suite_id !== "feature-evals-composite-integration") errors.push("unexpected suite_id");
  if (!/^\d{4}-\d{2}-\d{2}\.\d+$/.test(manifest.contract_version ?? "")) errors.push("contract_version must be dated and versioned");

  const profileIds = manifest.profiles?.map(({ id }) => id) ?? [];
  for (const id of duplicates(profileIds)) errors.push(`duplicate profile: ${id}`);
  for (const id of expectedProfiles) if (!profileIds.includes(id)) errors.push(`missing profile: ${id}`);
  for (const profile of manifest.profiles ?? []) {
    if (!existsSync(profile.suite_path)) {
      errors.push(`${profile.id} references missing suite ${profile.suite_path}`);
      continue;
    }
    const suite = JSON.parse(readFileSync(profile.suite_path, "utf8"));
    if (!(suite.run_record_schema?.allowed_targets ?? []).includes(profile.target)) {
      errors.push(`${profile.id} uses unsupported target ${profile.target}`);
    }
    const thresholds = thresholdsFor(suite, profile.target);
    if (!thresholds) errors.push(`${profile.id} has no threshold contract`);
    else if (thresholds.weighted_score_minimum !== profile.weighted_score_minimum) {
      errors.push(`${profile.id} threshold drifts from ${profile.suite_path}`);
    }
    const weight = suite.evals.reduce((sum, entry) => sum + entry.weight, 0);
    if (weight !== 100) errors.push(`${profile.suite_path} weights total ${weight}, expected 100`);
    for (const field of manifest.run_binding.required_fields) {
      if (!(suite.run_record_schema?.required ?? []).includes(field)) {
        errors.push(`${profile.suite_path} run schema omits ${field}`);
      }
    }
  }

  const graderIds = manifest.grader_roles?.map(({ id }) => id) ?? [];
  for (const id of duplicates(graderIds)) errors.push(`duplicate grader role: ${id}`);
  for (const id of expectedGraders) if (!graderIds.includes(id)) errors.push(`missing grader role: ${id}`);
  const holdout = manifest.grader_roles?.find(({ id }) => id === "independent-llm-holdout");
  if (holdout?.must_not_author_candidate !== true || holdout?.must_be_blind_to_patch_intent !== true) {
    errors.push("independent holdout must be separated from candidate authorship and patch intent");
  }
  const human = manifest.grader_roles?.find(({ id }) => id === "human");
  if (human?.may_not_be_simulated !== true) errors.push("human evidence must not be simulated");

  const sources = manifest.source_dispositions?.map(({ source }) => source) ?? [];
  for (const id of duplicates(sources)) errors.push(`duplicate source disposition: ${id}`);
  for (const id of expectedSources) if (!sources.includes(id)) errors.push(`missing source disposition: ${id}`);
  for (const item of manifest.source_dispositions ?? []) {
    if (!allowedDecisions.has(item.decision)) errors.push(`${item.source} has invalid decision ${item.decision}`);
    if (!item.destination || !item.rationale) errors.push(`${item.source} lacks destination or rationale`);
  }

  if ((manifest.mutation_requirements ?? []).length < 15) errors.push("mutation coverage is incomplete");
  if (!manifest.run_binding?.invalidated_by?.includes("exact-route manifest change")) {
    errors.push("run binding must invalidate on exact-route manifest changes");
  }
  if (manifest.run_binding?.authored_candidate_may_not_certify_threshold !== true) {
    errors.push("candidate authors must not certify threshold attainment");
  }
  if (!(manifest.stop_conditions ?? []).some((value) => /human-only/i.test(value))) {
    errors.push("stop conditions must preserve human-blocked state");
  }
  return errors;
}

function runCli() {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const errors = validateCompositeManifest(manifest);
  if (errors.length) {
    console.error("Composite eval contract failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Composite eval contract passed: ${manifest.profiles.length} profiles, ${manifest.source_dispositions.length} source dispositions, ${manifest.mutation_requirements.length} mutation requirements.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) runCli();
