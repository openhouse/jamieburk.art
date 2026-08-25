#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRepoRoot = path.resolve(scriptDir, "../..");
export const contractPath = "evals/page-owners/home.json";

const protectedPathPattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|Library\/CloudStorage|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;
const modeledOwnerPattern =
  /\b(?:Cyd Harrell|Abby Covert|Michael Bierut|Deborah Treisman)\b/i;

function allUnique(values) {
  return new Set(values).size === values.length;
}

export function evaluateHomePageOwners({ contract, pageSource, modeledRun }) {
  const owners = Array.isArray(contract?.owners) ? contract.owners : [];
  const ownerIds = owners.map(({ id }) => id);
  const ownerNames = owners.map(({ name }) => name);
  const responsibilities = owners.map(({ responsibility }) => responsibility);
  const modeledResults = Array.isArray(modeledRun?.results) ? modeledRun.results : [];
  const modeledOwnerIds = modeledResults.map(({ ownerId }) => ownerId);
  const candidateSourceSha256 = createHash("sha256").update(pageSource).digest("hex");

  const checks = {
    contract_is_versioned_pilot:
      contract?.version === 1 && contract?.status === "pilot",
    four_distinct_homepage_owners:
      owners.length === 4 &&
      allUnique(ownerIds) &&
      allUnique(ownerNames) &&
      allUnique(responsibilities),
    one_subjective_criterion_per_owner: owners.every(
      (owner) =>
        typeof owner.task === "string" &&
        owner.task.startsWith("Evaluate only whether") &&
        typeof owner.criterion === "string" &&
        typeof owner.definitions?.pass === "string" &&
        typeof owner.definitions?.fail === "string"
    ),
    public_sources_define_each_lens: owners.every(
      (owner) =>
        Array.isArray(owner.publicSources) &&
        owner.publicSources.length > 0 &&
        owner.publicSources.every((source) => /^https:\/\//.test(source))
    ),
    clear_pass_fail_and_borderline_examples: owners.every((owner) => {
      const examples = Array.isArray(owner.developmentExamples)
        ? owner.developmentExamples
        : [];
      return (
        examples.length === 3 &&
        examples.some(({ label, expectedResult }) => label === "clear-pass" && expectedResult === "pass") &&
        examples.some(({ label, expectedResult }) => label === "clear-fail" && expectedResult === "fail") &&
        examples.some(({ label, expectedResult }) => label === "borderline-fail" && expectedResult === "fail")
      );
    }),
    critique_precedes_binary_verdict:
      contract?.outputOrder?.[0] === "critique" &&
      contract?.outputOrder?.at(-1) === "result" &&
      contract?.outputSchema?.result === "pass or fail",
    all_owners_must_pass_without_averaging:
      contract?.passPolicy?.allOwnersMustPass === true &&
      contract?.passPolicy?.averagingAllowed === false &&
      contract?.passPolicy?.constructiveCritiqueRequired === true,
    rendered_page_only_input_boundary:
      contract?.execution?.renderedPageOnly === true &&
      contract?.execution?.repositoryAccess === false &&
      contract?.execution?.prohibitedInputs?.includes("repository source"),
    owner_reviews_are_isolated:
      contract?.execution?.oneTaskPerOwner === true &&
      contract?.execution?.tasksRunSequentially === true &&
      contract?.execution?.priorOwnerOutputVisible === false &&
      contract?.execution?.prohibitedInputs?.includes("prior owner output"),
    responsive_review_is_required:
      contract?.execution?.requiredViewports?.includes("desktop") &&
      contract?.execution?.requiredViewports?.includes("mobile"),
    simulation_boundary_is_explicit:
      contract?.execution?.realPeopleParticipated === false &&
      /Fictionalized analytical lenses/.test(contract?.execution?.disclaimer ?? "") &&
      /not quotations, participation claims, approvals, endorsements, or predictions/i.test(
        contract?.execution?.disclaimer ?? ""
      ),
    public_page_avoids_false_endorsement: !modeledOwnerPattern.test(pageSource),
    one_three_route_orientation_point:
      /const startHereLinks = \[[\s\S]*?\];/.test(pageSource) &&
      [...pageSource.matchAll(/href: "\/(?:work\/technical-operations|work|resume)"/g)].length === 3 &&
      !/See role-fit evidence|View resume/.test(pageSource),
    hero_states_the_promise_once:
      /\{site\.heroTagline\}/.test(pageSource) &&
      !/I clarify requirements, coordinate implementation/.test(pageSource) &&
      !/I work with public-facing teams to clarify requirements/.test(pageSource),
    selected_work_leads_directly_to_evidence:
      /Proof across operating, civic, and community systems/.test(pageSource) &&
      !/Three different settings, one operating practice/.test(pageSource),
    ranked_three_project_sequence:
      /"harry-j-epstein",\s*"kc-town-hall",\s*"196-sunday-dinner"/m.test(pageSource) &&
      /2x revenue growth/.test(pageSource) &&
      /\$490,539/.test(pageSource) &&
      /300\+ gatherings and 20\+ resident artists/.test(pageSource),
    fair_rent_appears_once_in_home_composition:
      (pageSource.match(/<FieldSystemEvidence variant="home" \/>/g) ?? []).length === 1,
    protected_paths_stay_out_of_public_page: !protectedPathPattern.test(pageSource),
    uncalibrated_gate_remains_advisory:
      contract?.calibration?.status === "required" &&
      contract?.calibration?.minimumHumanLabeledPassExamplesPerOwner >= 20 &&
      contract?.calibration?.minimumHumanLabeledFailExamplesPerOwner >= 20 &&
      contract?.calibration?.releaseAuthority === "advisory-until-calibrated" &&
      contract?.calibration?.realWorldApprovalClaimed === false,
    human_publication_authority_remains_explicit:
      contract?.humanAuthority?.publicationOwner === "Jamie Burkart" &&
      contract?.humanAuthority?.rightsConsentCreditRemainSeparate === true &&
      contract?.humanAuthority?.modeledPassAuthorizesDeployment === false &&
      contract?.humanAuthority?.modeledPassAuthorizesIndexing === false,
    latest_modeled_run_matches_candidate:
      modeledRun?.candidateSourceSha256 === candidateSourceSha256,
    latest_modeled_run_covers_all_owners:
      modeledRun?.verdict === "pass" &&
      modeledResults.length === owners.length &&
      allUnique(modeledOwnerIds) &&
      ownerIds.every((ownerId) => modeledOwnerIds.includes(ownerId)) &&
      modeledResults.every(({ result }) => result === "pass"),
    latest_modeled_run_preserves_boundary:
      modeledRun?.kind === "fictionalized-development-simulation" &&
      modeledRun?.realPeopleParticipated === false &&
      modeledRun?.inputBoundary?.renderedPageOnly === true &&
      modeledRun?.inputBoundary?.repositoryAccess === false &&
      modeledRun?.inputBoundary?.priorOwnerOutputVisible === false &&
      modeledRun?.releaseAuthority === "advisory-until-calibrated" &&
      modeledRun?.modeledPassAuthorizesDeployment === false &&
      modeledRun?.humanPublicationOwner === "Jamie Burkart"
  };

  const failures = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([id]) => id);
  const modeledRunCheckIds = [
    "latest_modeled_run_matches_candidate",
    "latest_modeled_run_covers_all_owners",
    "latest_modeled_run_preserves_boundary"
  ];
  const structuralFailures = failures.filter((id) => !modeledRunCheckIds.includes(id));
  const modeledReviewStatus =
    structuralFailures.length > 0
      ? "preflight-blocked"
      : failures.length > 0
        ? "stale-modeled-review"
        : "advisory-pass";

  return {
    checks,
    failures,
    deterministicVerdict: failures.length === 0 ? "pass" : "fail",
    modeledReviewStatus,
    candidateSourceSha256,
    humanPublicationAuthority: contract?.humanAuthority?.publicationOwner ?? "unassigned"
  };
}

export function evaluateRepository(repoRoot = defaultRepoRoot) {
  const contract = JSON.parse(readFileSync(path.join(repoRoot, contractPath), "utf8"));
  const pageSource = contract.targetPaths
    .map((relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8"))
    .join("\n");
  const modeledRun = JSON.parse(
    readFileSync(path.join(repoRoot, contract.latestDevelopmentRunPath), "utf8")
  );
  return evaluateHomePageOwners({ contract, pageSource, modeledRun });
}

const isCli =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  const result = evaluateRepository();
  for (const [id, passed] of Object.entries(result.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
  }
  console.log(
    `Home page-owner preflight: ${result.deterministicVerdict}; ${result.modeledReviewStatus}.`
  );
  if (result.failures.length > 0) process.exit(1);
}
