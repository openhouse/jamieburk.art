import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|Library\/CloudStorage|supporting-materials|file:\/\/|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/photography-residency-proposal.json"),
      "utf8"
    )
  );
}

export function evaluatePhotographyResidencyProposal(options = {}) {
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

  const notebook = record(manifest.notebookId);
  const project = record(manifest.projectId);
  const method = record(manifest.methodId);
  const proposal = record(manifest.proposalId);
  const evaluation = record(manifest.evaluationId);
  const processSource = record(manifest.processSourceId);
  const catalogSource = record(manifest.catalogSourceId);
  const notebookSource = normalized(manifest.notebookId);
  const projectSource = normalized(manifest.projectId);
  const methodSource = normalized(manifest.methodId);
  const proposalSource = normalized(manifest.proposalId);
  const evaluationSource = normalized(manifest.evaluationId);
  const processSourceText = normalized(manifest.processSourceId);
  const catalogSourceText = normalized(manifest.catalogSourceId);
  const mainEvaluatorSource = options.mainEvaluatorOverride ?? readFileSync(
    path.join(repoRoot, "scripts/knowledge-wiki/evaluate-wiki.mjs"),
    "utf8"
  );

  const recordsMaterialized = manifest.requiredRecords.every(([id, expectedPath]) => {
    const item = record(id);
    return item?.path === expectedPath && item?.canonical_path === expectedPath;
  });

  const notebookTargets = notebook?.relations?.map((relation) => relation.target) ?? [];
  const projectTargets = project?.relations?.map((relation) => relation.target) ?? [];
  const proposalTargets = proposal?.relations?.map((relation) => relation.target) ?? [];
  const evaluationTargets = evaluation?.relations?.map((relation) => relation.target) ?? [];
  const navigationReachable =
    notebookTargets.includes(manifest.proposalId) &&
    projectTargets.includes(manifest.proposalId) &&
    [
      manifest.notebookId,
      manifest.projectId,
      manifest.methodId,
      manifest.evaluationId,
      manifest.processSourceId,
      manifest.catalogSourceId
    ].every((id) => proposalTargets.includes(id)) &&
    [manifest.proposalId, manifest.notebookId, manifest.projectId].every((id) =>
      evaluationTargets.includes(id)
    ) &&
    [manifest.proposalId, manifest.evaluationId].every((id) => result.reachable.has(id));

  const intentNotContract =
    /the proposal is not a contract/i.test(proposalSource) &&
    /no resident is judged by whether they do what they promised/i.test(proposalSource) &&
    /makes that promise inward/i.test(proposalSource);

  const roughFieldNotQuota =
    /approximately 1,000 photographs/i.test(proposalSource) &&
    /not a quota, a representative sample, a ranking, or a promise/i.test(proposalSource) &&
    /success is not fidelity to this proposal, a completed 1,000-image edit/i.test(
      proposalSource
    );

  const artisticFormMayChange =
    /smaller, larger, slower, stranger, or something other than a photo selection/i.test(
      proposalSource
    ) &&
    /photography might remain the medium\. it might become writing, conversation, mapping, performance, sound, hospitality/i.test(
      proposalSource
    ) &&
    /useful residency may end with fewer certainties and better attention/i.test(
      proposalSource
    );

  const deviationRestRefusalProtected =
    /deviation, incompletion, rest, refusal, and surprise remain available/i.test(
      proposalSource
    ) &&
    /stop when attention has become dull, coercive, extractive, or unsafe/i.test(
      proposalSource
    );

  const timePlaceBounded =
    /for up to two weeks/i.test(proposalSource) &&
    /home apartment in Brooklyn, near Fort Greene Park/i.test(proposalSource) &&
    /private street address, building access, archive storage, and presence of other people remain protected/i.test(
      proposalSource
    );

  const hospitalityOutcomesNotInferred =
    /hospitality is not an outcome claim/i.test(proposalSource) &&
    /does not claim that every 196 resident had the same experience/i.test(proposalSource) &&
    /hosting caused another person's outcomes/i.test(evaluationSource) &&
    /accepted experiment, not a historical resident outcome/i.test(projectSource);

  const tejuProcessSourceBounded =
    processSource?.canonical_url ===
      "https://niemanstoryboard.org/annotation-tuesday-teju-cole-on-far-away-from-here/" &&
    catalogSource?.canonical_url ===
      "https://openlibrary.org/works/OL17358774W/Known_and_strange_things" &&
    /six-month Zurich residency/i.test(processSourceText) &&
    /nonfiction manuscript about Lagos/i.test(processSourceText) &&
    /most of his time moved toward traveling around Switzerland/i.test(processSourceText) &&
    /does not state the 196 Artists Residency's philosophy/i.test(processSourceText) &&
    /lists \*Far Away From Here\*/i.test(catalogSourceText) &&
    /does not claim that Cole stated the 196 residency philosophy, modeled this program, or endorsed this project/i.test(
      proposalSource
    );

  const acceptanceNotPublication =
    /acceptance authorizes the experiment, not its interpretation or publication/i.test(
      proposalSource
    ) &&
    /no image enters the public portfolio through this proposal/i.test(proposalSource) &&
    /proposal acceptance authorizes protected experimentation only/i.test(evaluationSource);

  const photographyHumanGatesIntact =
    /authorship, rights, consent, safety, caption, crop, context, collective-credit, and surface-specific approval/i.test(
      proposalSource
    ) &&
    /Jamie approves that exact version for that exact surface/i.test(methodSource) &&
    /may not clear a safety hold, infer consent, or grant publication permission/i.test(
      methodSource
    );

  const proposalEvalNonprescriptive =
    /cannot grade photographs, measure artistic productivity, require fidelity to the proposal, or decide whether the residency was meaningful/i.test(
      evaluationSource
    ) &&
    /may not encode aesthetic taste, required motifs, minimum outputs, or a preferred final medium/i.test(
      evaluationSource
    ) &&
    /conditions for play remain available/i.test(evaluationSource);

  const projectionHeld = [proposal, evaluation].every(
    (item) =>
      item?.projection_status === "hold" &&
      item?.projection?.status === "hold" &&
      item?.projection?.surfaces?.length === 0
  );

  const publicBoundaryClean =
    manifest.requiredRecords.every(([id]) =>
      ["public", "public-safe"].includes(record(id)?.visibility)
    ) &&
    !privatePattern.test(
      [
        notebookSource,
        projectSource,
        methodSource,
        proposalSource,
        evaluationSource,
        processSourceText,
        catalogSourceText
      ].join("\n")
    );

  const proposalEvalWired =
    /import \{ evaluatePhotographyResidencyProposal \} from "\.\/photography-residency-proposal-eval\.mjs"/.test(
      mainEvaluatorSource
    ) &&
    /\.\.\.photographyResidencyProposal\.checks/.test(mainEvaluatorSource) &&
    existsSync(
      path.join(
        repoRoot,
        "scripts/knowledge-wiki/photography-residency-proposal-eval.test.mjs"
      )
    ) &&
    /## Mutation coverage/i.test(evaluationSource);

  const checks = {
    residency_proposal_records_materialized: recordsMaterialized,
    residency_proposal_navigation_reachable: navigationReachable,
    proposal_intent_not_contract: intentNotContract,
    rough_field_not_quota: roughFieldNotQuota,
    artistic_form_may_change: artisticFormMayChange,
    deviation_rest_refusal_protected: deviationRestRefusalProtected,
    residency_time_place_bounded: timePlaceBounded,
    hospitality_outcomes_not_inferred: hospitalityOutcomesNotInferred,
    teju_process_source_bounded: tejuProcessSourceBounded,
    proposal_acceptance_not_publication: acceptanceNotPublication,
    photography_human_gates_intact: photographyHumanGatesIntact,
    proposal_eval_nonprescriptive: proposalEvalNonprescriptive,
    residency_proposal_projection_held: projectionHeld,
    residency_proposal_public_boundary_clean: publicBoundaryClean,
    residency_proposal_eval_wired: proposalEvalWired
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      requiredRecords: manifest.requiredRecords.length,
      blockingCriteria: Object.keys(checks).length
    }
  };
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const evaluation = evaluatePhotographyResidencyProposal();
  for (const [id, passed] of Object.entries(evaluation.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
  }
  if (!evaluation.passed) process.exit(1);
  console.log(
    `Photography residency proposal eval passed: ${evaluation.counts.blockingCriteria} blocking criteria across ${evaluation.counts.requiredRecords} governed proposal records.`
  );
}
