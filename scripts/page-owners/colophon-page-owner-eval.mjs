#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRepoRoot = path.resolve(scriptDir, "../..");
export const contractPath = "evals/page-owners/colophon.json";

const protectedPathPattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|Library\/CloudStorage|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;
const modeledOwnerPattern = /\b(?:Deborah Treisman|Maggie Appleton|Ellen Lupton)\b/i;

function allUnique(values) {
  return new Set(values).size === values.length;
}

export function evaluateColophonPageOwners({ contract, pageSource, modeledRun }) {
  const owners = Array.isArray(contract?.owners) ? contract.owners : [];
  const ownerIds = owners.map(({ id }) => id);
  const ownerNames = owners.map(({ name }) => name);
  const responsibilities = owners.map(({ responsibility }) => responsibility);
  const candidateSourceSha256 = createHash("sha256")
    .update(pageSource)
    .digest("hex");
  const modeledResults = Array.isArray(modeledRun?.results)
    ? modeledRun.results
    : [];
  const modeledOwnerIds = modeledResults.map(({ ownerId }) => ownerId);
  const checks = {
    contract_is_versioned_pilot:
      contract?.version === 1 && contract?.status === "pilot",
    three_distinct_editorial_owners:
      owners.length === 3 &&
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
        examples.some(
          ({ label, expectedResult }) =>
            label === "clear-pass" && expectedResult === "pass"
        ) &&
        examples.some(
          ({ label, expectedResult }) =>
            label === "clear-fail" && expectedResult === "fail"
        ) &&
        examples.some(
          ({ label, expectedResult }) =>
            label === "borderline-fail" && expectedResult === "fail"
        )
      );
    }),
    critique_precedes_binary_verdict: owners.every(
      (owner) =>
        owner.outputOrder?.[0] === "critique" &&
        owner.outputOrder?.at(-1) === "result" &&
        owner.outputSchema?.result === "pass or fail"
    ),
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
    simulation_boundary_is_explicit:
      contract?.execution?.realPeopleParticipated === false &&
      /Fictionalized analytical lenses/.test(contract?.execution?.disclaimer ?? "") &&
      /not quotations, participation claims, approvals, endorsements, or predictions/i.test(
        contract?.execution?.disclaimer ?? ""
      ),
    public_page_avoids_false_endorsement: !modeledOwnerPattern.test(pageSource),
    public_page_explains_the_projection: [
      /selective public rendering/i,
      /Source graph/,
      /Evidence graph/,
      /Semantic graph/,
      /audience-specific projection/i
    ].every((pattern) => pattern.test(pageSource)),
    public_page_explains_editorial_ownership: [
      /magazine-like page-ownership practice/i,
      /binary result/i,
      /cannot be averaged/i,
      /fictionalized simulations/i,
      /publication authority/i
    ].every((pattern) => pattern.test(pageSource)),
    public_page_names_material_choices: [
      /Next\.js/,
      /MDX/,
      /Palatino/,
      /Karla/,
      /Oswald/,
      /metadata-stripped/i,
      /Dokku/,
      /No invasive tracking/i
    ].every((pattern) => pattern.test(pageSource)),
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
  const structuralFailures = failures.filter(
    (id) => !modeledRunCheckIds.includes(id)
  );
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
    humanPublicationAuthority:
      contract?.humanAuthority?.publicationOwner ?? "unassigned"
  };
}

export function evaluateRepository(repoRoot = defaultRepoRoot) {
  const contract = JSON.parse(
    readFileSync(path.join(repoRoot, contractPath), "utf8")
  );
  const pageSource = [contract.targetPath, contract.supportingPublicDataPath]
    .map((relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8"))
    .join("\n");
  const modeledRun = JSON.parse(
    readFileSync(path.join(repoRoot, contract.latestDevelopmentRunPath), "utf8")
  );
  return evaluateColophonPageOwners({ contract, pageSource, modeledRun });
}

const isCli =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  const result = evaluateRepository();
  for (const [id, passed] of Object.entries(result.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
  }
  console.log(
    `Colophon page-owner preflight: ${result.deterministicVerdict}; ${result.modeledReviewStatus}.`
  );
  if (result.failures.length > 0) process.exit(1);
}
