import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|Library\/CloudStorage|\.docx\b|\.xlsx\b|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/family-closure.json"),
      "utf8"
    )
  );
}

function sameSet(left, right) {
  return left.length === right.length && left.every((item) => right.includes(item));
}

const localeProbe = `
  import { createHash } from "node:crypto";
  import { buildGeneratedOutputs, compileWiki } from "./scripts/knowledge-wiki/lib.mjs";
  const outputs = buildGeneratedOutputs(compileWiki());
  process.stdout.write(
    createHash("sha256").update(JSON.stringify(Object.entries(outputs))).digest("hex")
  );
`;

function generatedDigest(repoRoot, locale) {
  return execFileSync(process.execPath, ["--input-type=module", "--eval", localeProbe], {
    cwd: repoRoot,
    encoding: "utf8",
    env: { ...process.env, LANG: locale, LC_ALL: locale }
  });
}

export function evaluateFamilyClosure(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const result = options.result ?? compileWiki({ repoRoot });
  const manifest = options.manifest ?? loadManifest(repoRoot);
  const recordOverrides = options.recordOverrides ?? {};
  const sourceOverrides = options.sourceOverrides ?? {};

  const record = (id) => {
    if (Object.hasOwn(recordOverrides, id)) return recordOverrides[id];
    return result.byId.get(id);
  };
  const source = (id) => {
    if (Object.hasOwn(sourceOverrides, id)) return sourceOverrides[id];
    const item = record(id);
    return item ? readFileSync(path.join(repoRoot, item.path), "utf8") : "";
  };
  const normalized = (id) => source(id).replace(/\s+/g, " ");

  const root = record("index.knowledge-wiki");
  const closure = record(manifest.closureIndexId);
  const run = record(manifest.sourceEncounterId);
  const encounter = run?.source_encounter;
  const donorTargets = manifest.donors.map((donor) => donor.sourceId);
  const encounteredTargets = encounter?.source_states?.map((item) => item.target) ?? [];
  const usedTargets = run?.relations
    ?.filter((relation) => relation.type === "uses_source")
    .map((relation) => relation.target) ?? [];
  const closureTargets = closure?.relations?.map((relation) => relation.target) ?? [];
  const publicRegistry = options.publicRegistryOverride ?? readFileSync(
    path.join(repoRoot, manifest.publicRegistryPath),
    "utf8"
  );
  const workflow = options.workflowOverride ?? readFileSync(
    path.join(repoRoot, manifest.ciWorkflowPath),
    "utf8"
  );
  const packageManifest = options.packageOverride ?? JSON.parse(
    readFileSync(path.join(repoRoot, "package.json"), "utf8")
  );

  const recordsMaterialized = manifest.requiredRecords.every(([id, expectedPath]) => {
    const item = record(id);
    return item?.path === expectedPath && item?.canonical_path === expectedPath;
  });

  const exactFrozenDonors = manifest.donors.every((donor) => {
    const item = record(donor.sourceId);
    const body = source(donor.sourceId);
    return (
      item?.kind === "source" &&
      item?.path === donor.sourcePath &&
      item?.canonical_url === `https://github.com/openhouse/jamieburk.art/tree/${donor.head}` &&
      body.includes(`\`${donor.branch}\``) &&
      body.includes(`\`${donor.head}\``)
    );
  });

  const donorProvenancePreserved = manifest.donors
    .filter((donor) => donor.integratedRecordIds.length > 0)
    .every((donor) =>
      donor.integratedRecordIds.every((id) =>
        record(id)?.relations?.some(
          (relation) => relation.type === "informed_by" && relation.target === donor.sourceId
        )
      )
    );

  const rootAndClosureNavigation =
    root?.relations?.some((relation) => relation.target === manifest.closureIndexId) &&
    closureTargets.includes(manifest.sourceEncounterId) &&
    manifest.integratedRecordIds.every((id) => closureTargets.includes(id)) &&
    manifest.requiredRecords.every(([id]) => result.reachable.has(id));

  const baselineArchitecturePreserved =
    !existsSync(path.join(repoRoot, manifest.parallelWikiRoot)) &&
    manifest.baselineRecords.every(([id, expectedPath]) => {
      const item = record(id);
      return item?.path === expectedPath && item?.canonical_path === expectedPath;
    });

  const sourceReturnCandidateSpecific =
    run?.kind === "research-run" &&
    run?.last_reviewed === manifest.encounterDate &&
    encounter?.encounter_date === manifest.encounterDate &&
    encounter?.publication_authority === "separate-human-review" &&
    encounter?.publication_decision === "public-safe-synthesis-only" &&
    sameSet(encounteredTargets, donorTargets) &&
    sameSet(encounteredTargets, usedTargets) &&
    encounter?.source_states?.every(
      (state) =>
        state.access_state === "reachable" &&
        state.materialization_state === "remote-materialized" &&
        record(state.target)?.kind === "source"
    ) &&
    encounter?.changed_interpretations?.length >= 5 &&
    encounter?.contradictions?.length >= 5 &&
    encounter?.limitations?.length >= 4 &&
    encounter?.librarian_requests?.length >= 4;

  const closureSource = normalized(manifest.closureIndexId);
  const editorialCompressionExplicit =
    manifest.integratedRecordIds.length === 14 &&
    /what it selected, what it consolidated, what it deferred/i.test(closureSource) &&
    /deliberately not merged/i.test(closureSource) &&
    manifest.donors.every((donor) => closureSource.includes(donor.branch.replace("feature/knowledge-wiki-", "")));

  const adoptionSource = normalized("capability.implementation-adoption-and-handoff");
  const adoptionStatesStayDistinct =
    ["Designed", "Launched", "Used", "Adopted", "Handed off", "Sustained"].every(
      (state) => adoptionSource.includes(state)
    ) && /one state does not prove the next/i.test(adoptionSource);

  const identitySource = normalized("method.identity-systems-as-shared-infrastructure");
  const identityAuthorshipBounded =
    /identity and account establishment/i.test(identitySource) &&
    /authorship of a particular post/i.test(identitySource) &&
    /ownership of a collective project/i.test(identitySource) &&
    /evidence for one does not establish the others/i.test(identitySource);

  const workSource = normalized("method.jamie-at-work");
  const emergingWorkNotDeficit =
    /work that is emerging/i.test(workSource) &&
    /not removing ambiguity as though uncertainty were a defect/i.test(workSource) &&
    /do not imply Jamie alone discovers/i.test(workSource);

  const participationSource = normalized("method.participation-and-relational-infrastructure");
  const participationKeepsPeopleAsAgents =
    /people remain speakers and contributors/i.test(participationSource) &&
    /participant's account from Jamie's interpretation/i.test(participationSource) &&
    /participation is not consent to become portfolio evidence/i.test(participationSource);

  const placesSource = normalized("index.knowledge-wiki.scenes-and-places-of-work");
  const scenesDoNotReplaceEvidence =
    /place is not background/i.test(placesSource) &&
    /scene is not proof by itself/i.test(placesSource) &&
    /vivid scene cannot replace evidence/i.test(placesSource);

  const outcomesSource = normalized("index.knowledge-wiki.outcomes-adoption-afterlives");
  const outcomesAdoptionAfterlivesSeparated =
    /artifact was delivered/i.test(outcomesSource) &&
    /team adopted it/i.test(outcomesSource) &&
    /institution acted/i.test(outcomesSource) &&
    /responsibility was handed off/i.test(outcomesSource) &&
    /archive is not proof of a current service/i.test(outcomesSource);

  const atlasSource = normalized("index.knowledge-wiki.relational-infrastructure-atlas");
  const relationsDoNotBecomeCausality =
    /typed proximity is not causality, attendance, authorship, endorsement, or measured impact/i.test(
      atlasSource
    ) && /backlink records a declared relationship, not a verdict/i.test(atlasSource);

  const decisionsSource = normalized(
    "index.knowledge-wiki.decisions-deliverables-operational-outcomes"
  );
  const decisionAndOutcomeLayersSeparated =
    /five layers separate/i.test(decisionsSource) &&
    /government action is not Jamie's action/i.test(decisionsSource) &&
    /responsibility, deliverable, outcome, adoption, and impact/i.test(decisionsSource);

  const roleSource = normalized("index.knowledge-wiki.role-authorship-protected-absence");
  const roleCreditAndAbsenceBounded =
    /full archive access does not settle authorship/i.test(roleSource) &&
    /protected absence is not missing work, a deficit/i.test(roleSource) &&
    /research access, repository inclusion, quotation, reproduction, identification, attribution, and portfolio selection are separate permissions/i.test(
      roleSource
    );

  const agendaSource = normalized("index.knowledge-wiki.research-agenda-and-held-claims");
  const researchAgendaKeepsMaturitySeparate =
    /claim maturity is not publication permission/i.test(agendaSource) &&
    /mature but unselected/i.test(agendaSource) &&
    /not-recovered material/i.test(agendaSource) &&
    /protected absence/i.test(agendaSource);

  const storiesSource = normalized("index.knowledge-wiki.canonical-story-bank");
  const storyContractBounded =
    /situation, Jamie's action, what became usable, collective context, and honest limit/i.test(
      storiesSource
    ) && /tailor the selection, not the facts/i.test(storiesSource);

  const learningSource = normalized("method.learning-through-making");
  const learningRetainsWritingAndLimits =
    /learning through making is not an excuse to avoid writing/i.test(learningSource) &&
    /does not establish production deployment/i.test(learningSource) &&
    /protected educational records remain summary-only/i.test(learningSource);

  const stakes = record("method.what-is-at-stake-for-me");
  const stakesSource = normalized("method.what-is-at-stake-for-me");
  const firstPersonAuthorshipHumanControlled =
    stakes?.status === "draft" &&
    stakes?.human_review === "requested" &&
    stakes?.projection_status === "pending" &&
    stakes?.projection?.status === "pending" &&
    stakes?.projection?.surfaces?.length === 0 &&
    /AI-assisted first-person draft/i.test(stakesSource) &&
    /Only Jamie may resolve this page's authorship review/i.test(stakesSource);

  const allNewIds = manifest.requiredRecords.map(([id]) => id);
  const publicProjectionStillSelective =
    allNewIds.every((id) => !publicRegistry.includes(id)) &&
    allNewIds.every((id) => record(id)?.projection?.status !== "active");

  const publicSafetyPreserved = allNewIds.every((id) => !privatePattern.test(source(id)));

  const mergeReadinessCiEnforced =
    /pull_request:/.test(workflow) &&
    /workflow_dispatch:/.test(workflow) &&
    !/pull_request_target:/.test(workflow) &&
    /ref:\s*\$\{\{\s*github\.event\.pull_request\.head\.sha\s*\|\|\s*github\.sha\s*\}\}/.test(
      workflow
    ) &&
    /git rev-parse HEAD/.test(workflow) &&
    /github\.event\.pull_request\.head\.sha/.test(workflow) &&
    /node-version-file:\s*\.nvmrc/.test(workflow) &&
    /run:\s*npm ci/.test(workflow) &&
    /git diff --check\s+"origin\/\$\{GITHUB_BASE_REF\}\.\.\.HEAD"/.test(workflow) &&
    /git diff --check\s+HEAD\^\.\.\.HEAD/.test(workflow) &&
    /run:\s*npm run check/.test(workflow);

  const rfcContractEnforced =
    packageManifest.scripts?.["check:rfcs"] === "node scripts/check-rfcs.mjs" &&
    packageManifest.scripts?.check?.includes("npm run check:rfcs");

  let generatedOutputsLocaleIndependent = options.localeDeterminismOverride;
  if (generatedOutputsLocaleIndependent === undefined) {
    try {
      generatedOutputsLocaleIndependent =
        generatedDigest(repoRoot, "C") === generatedDigest(repoRoot, "en_US.UTF-8");
    } catch {
      generatedOutputsLocaleIndependent = false;
    }
  }

  let diffHygieneClean = options.diffCheckOverride;
  if (diffHygieneClean === undefined) {
    try {
      execFileSync("git", ["diff", "--check", manifest.baseRef], {
        cwd: repoRoot,
        stdio: "pipe"
      });
      execFileSync("git", ["diff", "--check"], { cwd: repoRoot, stdio: "pipe" });
      execFileSync("git", ["diff", "--cached", "--check"], { cwd: repoRoot, stdio: "pipe" });
      diffHygieneClean = true;
    } catch {
      diffHygieneClean = false;
    }
  }

  const checks = {
    family_records_materialized: recordsMaterialized,
    exact_frozen_donors_recorded: exactFrozenDonors,
    donor_provenance_preserved: donorProvenancePreserved,
    root_and_closure_navigation: rootAndClosureNavigation,
    baseline_architecture_preserved: baselineArchitecturePreserved,
    source_return_candidate_specific: sourceReturnCandidateSpecific,
    editorial_compression_explicit: editorialCompressionExplicit,
    adoption_states_stay_distinct: adoptionStatesStayDistinct,
    identity_authorship_bounded: identityAuthorshipBounded,
    emerging_work_not_deficit: emergingWorkNotDeficit,
    participation_keeps_people_as_agents: participationKeepsPeopleAsAgents,
    scenes_do_not_replace_evidence: scenesDoNotReplaceEvidence,
    outcomes_adoption_afterlives_separated: outcomesAdoptionAfterlivesSeparated,
    relations_do_not_become_causality: relationsDoNotBecomeCausality,
    decision_and_outcome_layers_separated: decisionAndOutcomeLayersSeparated,
    role_credit_and_absence_bounded: roleCreditAndAbsenceBounded,
    research_agenda_keeps_maturity_separate: researchAgendaKeepsMaturitySeparate,
    story_contract_bounded: storyContractBounded,
    learning_retains_writing_and_limits: learningRetainsWritingAndLimits,
    first_person_authorship_human_controlled: firstPersonAuthorshipHumanControlled,
    family_public_projection_still_selective: publicProjectionStillSelective,
    family_public_safety_preserved: publicSafetyPreserved,
    merge_readiness_ci_enforced: mergeReadinessCiEnforced,
    rfc_contract_enforced: rfcContractEnforced,
    generated_outputs_locale_independent: generatedOutputsLocaleIndependent,
    diff_hygiene_clean: diffHygieneClean
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      donors: manifest.donors.length,
      requiredRecords: manifest.requiredRecords.length,
      integratedRecords: manifest.integratedRecordIds.length,
      blockingCriteria: Object.keys(checks).length
    }
  };
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const evaluation = evaluateFamilyClosure();
  for (const [id, passed] of Object.entries(evaluation.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
  }
  if (!evaluation.passed) process.exit(1);
  console.log(
    `Knowledge Wiki family closure passed: ${evaluation.counts.blockingCriteria} blocking criteria across ${evaluation.counts.donors} frozen donors and ${evaluation.counts.integratedRecords} composite records.`
  );
}
