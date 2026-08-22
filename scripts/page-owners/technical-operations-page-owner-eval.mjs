#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRepoRoot = path.resolve(scriptDir, "../..");
export const contractPath = "evals/page-owners/technical-operations.json";

const protectedPathPattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|Library\/CloudStorage|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;
const modeledOwnerPattern =
  /\b(?:Jennifer Pahlka|Marianne Bellotti|Abby Covert|Deborah Treisman)\b/i;

function allUnique(values) {
  return new Set(values).size === values.length;
}

export function evaluateTechnicalOperationsPageOwners({
  contract,
  pageSource,
  routeSource = pageSource,
  candidateSource = pageSource,
  modeledRun
}) {
  const owners = Array.isArray(contract?.owners) ? contract.owners : [];
  const ownerIds = owners.map(({ id }) => id);
  const ownerNames = owners.map(({ name }) => name);
  const responsibilities = owners.map(({ responsibility }) => responsibility);
  const modeledResults = Array.isArray(modeledRun?.results) ? modeledRun.results : [];
  const modeledOwnerIds = modeledResults.map(({ ownerId }) => ownerId);
  const candidateSourceSha256 = createHash("sha256")
    .update(candidateSource)
    .digest("hex");

  const checks = {
    contract_is_versioned_pilot:
      contract?.version === 1 && contract?.status === "pilot",
    four_distinct_technical_operations_owners:
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
    public_page_avoids_false_endorsement: !modeledOwnerPattern.test(routeSource),
    three_ranked_signature_situations:
      /project: "Harry J\. Epstein Company"[\s\S]*project: "FairRentNYC \/ Commercial Rent Stabilization"[\s\S]*project: "CallNYC"/.test(
        pageSource
      ) && /Three situations, one operating practice/.test(routeSource),
    signature_situations_have_weighted_editorial_hierarchy:
      /const \[primarySituation, \.\.\.supportingSituations\] = signatureSituations/.test(
        pageSource
      ) &&
      /Sustained implementation/.test(pageSource) &&
      /Complementary proof/.test(pageSource) &&
      /text-4xl/.test(pageSource) &&
      /supportingSituations\.map/.test(pageSource),
    supporting_cases_remain_compressed_evidence:
      /supportingSituations\.map[\s\S]*\{item\.situation\}[\s\S]*\{item\.responsibility\}[\s\S]*\{item\.resultSummary\}/.test(
        pageSource
      ) &&
      !/How it worked:/.test(routeSource) &&
      !/item\.results\.map/.test(routeSource),
    situation_responsibility_result_chain:
      /Situation/.test(pageSource) &&
      /My role/.test(pageSource) &&
      /Result/.test(pageSource),
    supporting_results_state_non_artifact_value:
      /Created and stewarded 30\+ pages of shared, reviewable working records for coordinating Commercial Rent Stabilization decisions and next steps/.test(
        candidateSource
      ) &&
      /Demonstrated how open constituent-services data could become resident-facing issue paths and next-step guidance[\s\S]*not current service guidance or evidence of adoption or resident outcomes/.test(
        candidateSource
      ) &&
      /technical-operations-result/.test(pageSource),
    opening_defers_to_one_method_sequence:
      /I create the operating structure complex teams need to move[\s\S]*public-facing technical work from ambiguity to launch/.test(
        pageSource
      ) &&
      !/I frame the work, make ownership visible/.test(pageSource) &&
      !/I clarify requirements, map workflows, coordinate delivery/.test(pageSource),
    supporting_proof_points_are_distinct_and_plain:
      /resultProofIds: \[\]/.test(pageSource) &&
      /assigned next steps made shared work reviewable/.test(pageSource) &&
      !/fair-rent-source-map/.test(routeSource) &&
      !/next-step lanes/.test(routeSource),
    foregrounded_results_state_evidence_maturity:
      /Status:/.test(pageSource) &&
      /CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015/.test(pageSource) &&
      /CLM-CRS-CAMPAIGN-MEMORY-SYSTEM-2026/.test(pageSource) &&
      /CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS/.test(pageSource),
    signature_situations_name_operating_mechanics:
      /Method/.test(pageSource) &&
      /Incremental releases connected public content/.test(pageSource) &&
      /Public sources and publishable summaries stayed distinct/.test(pageSource) &&
      /Public records became issue paths, district context, and possible next steps/.test(
        pageSource
      ),
    historical_hje_lifecycle_boundary_is_explicit:
      /getClaimProjection\(\s*"CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015"/.test(
        pageSource
      ),
    active_fair_rent_lifecycle_boundary_is_explicit:
      /getClaimProjection\(\s*"CLM-CRS-CAMPAIGN-MEMORY-SYSTEM-2026"/.test(
        pageSource
      ),
    archived_callnyc_lifecycle_and_preservation_are_explicit:
      /getClaimProjection\(\s*"CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS"/.test(
        pageSource
      ),
    five_part_operating_method:
      /term: "Frame the work"[\s\S]*term: "Make ownership visible"[\s\S]*term: "Create a delivery rhythm"[\s\S]*term: "Prepare for adoption"[\s\S]*term: "Leave a useful handoff"/.test(
        pageSource
      ),
    operating_method_routes_to_project_evidence:
      /evidence: "CallNYC"[\s\S]*evidence: "FairRentNYC"[\s\S]*evidence: "Harry J\. Epstein Company"[\s\S]*evidence: "the CallNYC prototype"[\s\S]*evidence: "FairRentNYC"/.test(
        pageSource
      ) && /Case evidence: \{item\.evidence\}/.test(pageSource),
    method_links_are_explicit_case_evidence:
      /Case evidence: \{item\.evidence\}/.test(pageSource) &&
      !/Seen in \{item\.evidence\}/.test(pageSource),
    supporting_status_is_concise_and_nonduplicative:
      /Active coordination record; Jamie maintains the working records while action ownership remains shared/.test(
        candidateSource
      ) &&
      /Archived independent prototype; not current service guidance or evidence of adoption or resident outcomes/.test(
        candidateSource
      ) &&
      /I independently framed the prototype and modeled issue paths and possible next steps from open records/.test(
        candidateSource
      ) &&
      !/kept its relationship to the Council and current service status explicit/.test(
        pageSource
      ),
    adoption_language_matches_available_evidence:
      /term: "Prepare for adoption"/.test(pageSource) &&
      /before broader use is established/.test(pageSource) &&
      !/term: "Support adoption"/.test(pageSource),
    method_is_the_only_evidence_route:
      !/Evidence by capability/.test(routeSource) &&
      !/technicalOperationsProofRows\.map/.test(routeSource) &&
      !/featuredCapabilityDestinations/.test(routeSource) &&
      !/KC Spaces Fund/.test(routeSource) &&
      !/team-memory method/.test(routeSource) &&
      !/destinationsFor\(row\.proofIds\)/.test(routeSource) &&
      !/JBCard/.test(routeSource),
    public_copy_uses_direct_operational_language:
      !/coalition memory/i.test(routeSource) &&
      !/shared memory/i.test(routeSource) &&
      !/actionable workstreams/i.test(routeSource) &&
      /I turned meetings, public sources, policy questions, decisions, and assigned next steps into reviewable working records/.test(
        candidateSource
      ) &&
      !/source lineage/i.test(routeSource) &&
      !/public-safe reconstruction/i.test(routeSource) &&
      !/contribution framing/i.test(routeSource) &&
      !/Operating mechanics/.test(routeSource),
    situation_fields_avoid_repeating_one_claim:
      /An established industrial retailer brought decades of product knowledge and a distinctive voice into a changing online sales environment/.test(
        candidateSource
      ) &&
      /coordinated day-to-day web and e-commerce work/.test(candidateSource) &&
      /The prototype began with open constituent-services records and a design question: how could raw issue data become clearer to residents/.test(
        candidateSource
      ) &&
      /independently framed the prototype/.test(candidateSource) &&
      /technical-operations-situation/.test(pageSource) &&
      /technical-operations-role/.test(pageSource) &&
      /proof\.publicWording/.test(pageSource),
    case_study_links_name_their_destinations:
      /Read the Harry J\. Epstein Company case study/.test(pageSource) &&
      /Read the FairRentNYC case study/.test(pageSource) &&
      /Read the CallNYC case study/.test(pageSource) &&
      !/>\s*Read case study\s*</.test(pageSource),
    resume_and_contact_actions_remain_present:
      /<ResumeCTA compact \/>/.test(pageSource) &&
      /<ContactCTA showResumeLink=\{false\} \/>/.test(pageSource) &&
      /Download resume PDF/.test(pageSource) &&
      /Email Jamie/.test(pageSource),
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
  const targetSources = contract.targetPaths.map((relativePath) => ({
    relativePath,
    source: readFileSync(path.join(repoRoot, relativePath), "utf8")
  }));
  const pageSource = targetSources
    .filter(({ relativePath }) => !relativePath.endsWith("public-registry.json"))
    .map(({ source }) => source)
    .join("\n");
  const routeSource = targetSources.find(
    ({ relativePath }) =>
      relativePath === "apps/www/src/app/work/technical-operations/page.tsx"
  )?.source;
  const candidateSource = targetSources.map(({ source }) => source).join("\n");
  const modeledRun = JSON.parse(
    readFileSync(path.join(repoRoot, contract.latestDevelopmentRunPath), "utf8")
  );
  return evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource,
    routeSource,
    candidateSource,
    modeledRun
  });
}

const isCli =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  const result = evaluateRepository();
  for (const [id, passed] of Object.entries(result.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
  }
  console.log(
    `Technical Operations page-owner preflight: ${result.deterministicVerdict}; ${result.modeledReviewStatus}.`
  );
  if (result.failures.length > 0) process.exit(1);
}
