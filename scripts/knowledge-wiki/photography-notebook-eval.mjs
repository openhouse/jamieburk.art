import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|Library\/CloudStorage|supporting-materials|file:\/\/|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;
const photoAssetPattern =
  /\.(?:avif|bmp|cr2|dng|gif|heic|jpe?g|mov|mp4|nef|png|raw|tiff?|webp)$/i;

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/photography-notebook.json"),
      "utf8"
    )
  );
}

function listFiles(root, current = root) {
  if (!existsSync(current)) return [];
  return readdirSync(current, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(current, entry.name);
    if (entry.isDirectory()) return listFiles(root, absolute);
    return [path.relative(root, absolute)];
  });
}

export function evaluatePhotographyNotebook(options = {}) {
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

  const living = record(manifest.livingArchiveId);
  const visual = record(manifest.visualIndexId);
  const notebook = record(manifest.notebookId);
  const method = record(manifest.methodId);
  const opening = record(manifest.openingRunId);
  const evaluation = record(manifest.evaluationId);
  const notebookSource = normalized(manifest.notebookId);
  const methodSource = normalized(manifest.methodId);
  const openingSource = normalized(manifest.openingRunId);
  const evaluationSource = normalized(manifest.evaluationId);
  const workstreamSource = options.workstreamSourceOverride ?? readFileSync(
    path.join(repoRoot, manifest.workstreamPath),
    "utf8"
  );
  const normalizedWorkstreamSource = workstreamSource.replace(/\s+/g, " ");
  const workspaceFiles = options.workspaceFilesOverride ?? listFiles(
    path.join(repoRoot, manifest.workspaceRoot)
  );
  const mainEvaluatorSource = options.mainEvaluatorOverride ?? readFileSync(
    path.join(repoRoot, "scripts/knowledge-wiki/evaluate-wiki.mjs"),
    "utf8"
  );

  const requiredRecordsMaterialized = manifest.requiredRecords.every(
    ([id, expectedPath]) => {
      const item = record(id);
      return item?.path === expectedPath && item?.canonical_path === expectedPath;
    }
  );

  const livingTargets = living?.relations?.map((relation) => relation.target) ?? [];
  const visualTargets = visual?.relations?.map((relation) => relation.target) ?? [];
  const notebookTargets = notebook?.relations?.map((relation) => relation.target) ?? [];
  const navigationReachable =
    livingTargets.includes(manifest.notebookId) &&
    visualTargets.includes(manifest.notebookId) &&
    visualTargets.includes(manifest.methodId) &&
    [
      manifest.visualIndexId,
      manifest.methodId,
      manifest.openingRunId,
      manifest.evaluationId
    ].every((id) => notebookTargets.includes(id)) &&
    manifest.requiredRecords.every(([id]) => result.reachable.has(id));

  const provisionalFieldRemainsOpen =
    /provisional field of attention/i.test(notebookSource) &&
    /not a representative sample, final edit, complete census, or publication slate/i.test(
      notebookSource
    ) &&
    /planned, not completed/i.test(openingSource) &&
    /not statistically representative/i.test(openingSource);

  const playPrecedesFixedTaxonomy =
    /leave room for unexplained attraction/i.test(notebookSource) &&
    /prompts, not a mandatory taxonomy/i.test(notebookSource) &&
    /technically imperfect photographs/i.test(notebookSource) &&
    /preserve contradictions/i.test(notebookSource) &&
    /not precede them as rigid quotas/i.test(methodSource);

  const openingEncounterStateHonest =
    opening?.kind === "research-run" &&
    !opening?.source_encounter &&
    /no photographs from Jamie's private archive were inspected/i.test(openingSource) &&
    /does not claim a source encounter/i.test(openingSource) &&
    /not a claim that a 1,000-image field already exists/i.test(openingSource);

  const photographicSourceReturnDurable =
    /source archive remains read-only/i.test(methodSource) &&
    /stable route back to the exact source/i.test(methodSource) &&
    /duplicate, sequence, and burst relationships/i.test(methodSource) &&
    /inspect the image itself/i.test(methodSource) &&
    /reproducible return to the same source material/i.test(normalizedWorkstreamSource);

  const photoLifecycleStatesSeparate = [
    /discovery is not selection/i,
    /selection is not safety clearance/i,
    /safety clearance is not rights or represented-person consent/i,
    /rights and consent do not determine editorial usefulness/i,
    /editorial usefulness is not publication approval/i
  ].every((pattern) => pattern.test(methodSource));

  const visualInferenceBounded =
    /does not establish the full event, identity, role, date, or outcome/i.test(methodSource) &&
    /proximity does not establish relationship, participation, endorsement, authorship, or consent/i.test(
      methodSource
    ) &&
    /independent sources for identity, date, role, event, and outcome claims/i.test(
      methodSource
    );

  const publicBoundaryClean =
    manifest.requiredRecords.every(([id]) => record(id)?.visibility === "public-safe") &&
    !privatePattern.test(
      [notebookSource, methodSource, openingSource, evaluationSource, workstreamSource].join("\n")
    );

  const openingWorkspaceContainsNoPhotoAssets =
    workspaceFiles.length >= 1 &&
    workspaceFiles.every((file) => !photoAssetPattern.test(file));

  const projectionHeld = manifest.requiredRecords.every(([id]) => {
    const item = record(id);
    return (
      item?.projection_status === "hold" &&
      item?.projection?.status === "hold" &&
      item?.projection?.surfaces?.length === 0
    );
  });

  const humanAuthorityPreserved =
    /Jamie approves that exact version for that exact surface/i.test(methodSource) &&
    /may not clear a safety hold, infer consent, or grant publication permission/i.test(
      methodSource
    ) &&
    /does not approve an image, clear a human gate/i.test(evaluationSource);

  const notebookEntryContractComplete = manifest.notebookEntrySections.every(
    (section) => notebookSource.includes(`**${section}**`)
  );

  const photographyEvalWired =
    /import \{ evaluatePhotographyNotebook \} from "\.\/photography-notebook-eval\.mjs"/.test(
      mainEvaluatorSource
    ) &&
    /\.\.\.photographyNotebook\.checks/.test(mainEvaluatorSource) &&
    existsSync(
      path.join(repoRoot, "scripts/knowledge-wiki/photography-notebook-eval.test.mjs")
    ) &&
    /## Mutation coverage/i.test(evaluationSource);

  const checks = {
    photography_records_materialized: requiredRecordsMaterialized,
    photography_navigation_reachable: navigationReachable,
    provisional_field_remains_open: provisionalFieldRemainsOpen,
    play_precedes_fixed_taxonomy: playPrecedesFixedTaxonomy,
    opening_encounter_state_honest: openingEncounterStateHonest,
    photographic_source_return_durable: photographicSourceReturnDurable,
    photo_lifecycle_states_separate: photoLifecycleStatesSeparate,
    visual_inference_bounded: visualInferenceBounded,
    photography_public_boundary_clean: publicBoundaryClean,
    opening_workspace_contains_no_photo_assets: openingWorkspaceContainsNoPhotoAssets,
    photography_projection_held: projectionHeld,
    photography_human_authority_preserved: humanAuthorityPreserved,
    notebook_entry_contract_complete: notebookEntryContractComplete,
    photography_eval_wired: photographyEvalWired
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      requiredRecords: manifest.requiredRecords.length,
      notebookSections: manifest.notebookEntrySections.length,
      workspaceFiles: workspaceFiles.length,
      blockingCriteria: Object.keys(checks).length
    }
  };
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const evaluation = evaluatePhotographyNotebook();
  for (const [id, passed] of Object.entries(evaluation.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
  }
  if (!evaluation.passed) process.exit(1);
  console.log(
    `Photography notebook eval passed: ${evaluation.counts.blockingCriteria} blocking criteria, ${evaluation.counts.requiredRecords} governed records, and ${evaluation.counts.notebookSections} entry-contract sections.`
  );
}
