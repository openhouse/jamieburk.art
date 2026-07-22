import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|Library\/Photos|Photos\.sqlite|supporting-materials|file:\/\/|[0-9a-f]{8}-[0-9a-f-]{27}\/L0\/[0-9]{3}|\b[0-9]{6,}\b|\b[0-9a-f]{32}\b)/i;
const imagePattern = /(?:!\[[^\]]*\]\(|data:image\/|\.(?:jpe?g|png|heic|tiff?|gif|webp|avif)\b)/i;

function containsProtectedFingerprintSource(source) {
  return source.split("\n").some((line) => {
    const digestLiteral = /\b[0-9a-f]{32}\b/i.test(line);
    const segmentedCountMatcher = /\b[0-9]{3}\[[^\]\n]{0,8}\]\??[0-9]{3}\b/.test(line);
    const sensitiveContext = /(?:private|protected|archive|source|membership|identifier|count|digest)/i.test(
      line
    );
    const countLiteral =
      /\b[0-9]{6,}\b/.test(line) ||
      /\b[0-9]{1,3}(?:[ ,][0-9]{3})+\b/.test(line);
    return digestLiteral || segmentedCountMatcher || (sensitiveContext && countLiteral);
  });
}

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/photography-studio-connection.json"),
      "utf8"
    )
  );
}

function trackedFiles(repoRoot) {
  try {
    return execFileSync("git", ["ls-files"], { cwd: repoRoot, encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
}

function evaluatorHistorySources(repoRoot) {
  const evaluatorPath = "scripts/knowledge-wiki/photography-studio-connection-eval.mjs";
  try {
    const mergeBase = execFileSync(
      "git",
      ["merge-base", "HEAD", "refs/remotes/origin/develop"],
      { cwd: repoRoot, encoding: "utf8" }
    ).trim();
    const commits = execFileSync(
      "git",
      ["rev-list", `${mergeBase}..HEAD`, "--", evaluatorPath],
      { cwd: repoRoot, encoding: "utf8" }
    )
      .trim()
      .split("\n")
      .filter(Boolean);
    return commits.map((commit) =>
      execFileSync("git", ["show", `${commit}:${evaluatorPath}`], {
        cwd: repoRoot,
        encoding: "utf8"
      })
    );
  } catch {
    return null;
  }
}

export function evaluatePhotographyStudioConnection(options = {}) {
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
  const method = record(manifest.methodId);
  const run = record(manifest.runId);
  const evaluation = record(manifest.evaluationId);
  const softwareSource = record(manifest.sourceId);
  const notebookSource = normalized(manifest.notebookId);
  const methodSource = normalized(manifest.methodId);
  const runSource = normalized(manifest.runId);
  const evaluationSource = normalized(manifest.evaluationId);
  const softwareSourceText = normalized(manifest.sourceId);
  const allPublicSource = [
    notebookSource,
    methodSource,
    runSource,
    evaluationSource,
    softwareSourceText
  ].join("\n");
  const files = options.trackedFilesOverride ?? trackedFiles(repoRoot);
  const mainEvaluatorSource = options.mainEvaluatorOverride ?? readFileSync(
    path.join(repoRoot, "scripts/knowledge-wiki/evaluate-wiki.mjs"),
    "utf8"
  );
  const selfEvaluatorSource = options.selfEvaluatorOverride ?? readFileSync(
    fileURLToPath(import.meta.url),
    "utf8"
  );
  const historyEvaluatorSources = options.historyEvaluatorSourcesOverride ??
    evaluatorHistorySources(repoRoot);

  const recordsMaterialized = manifest.requiredRecords.every(([id, expectedPath]) => {
    const item = record(id);
    return item?.path === expectedPath && item?.canonical_path === expectedPath;
  });

  const notebookTargets = notebook?.relations?.map((relation) => relation.target) ?? [];
  const methodTargets = method?.relations?.map((relation) => relation.target) ?? [];
  const runTargets = run?.relations?.map((relation) => relation.target) ?? [];
  const evaluationTargets = evaluation?.relations?.map((relation) => relation.target) ?? [];
  const navigationReachable =
    notebookTargets.includes(manifest.runId) &&
    methodTargets.includes(manifest.runId) &&
    [
      manifest.notebookId,
      manifest.methodId,
      manifest.proposalId,
      manifest.evaluationId,
      manifest.sourceId
    ].every((id) => runTargets.includes(id)) &&
    [manifest.runId, manifest.notebookId, manifest.methodId].every((id) =>
      evaluationTargets.includes(id)
    ) &&
    [manifest.runId, manifest.evaluationId].every((id) =>
      result.reachable.has(id)
    );

  const skillUpstreamAndSourceFrozen =
    softwareSource?.canonical_url === "https://github.com/openhouse/photo-fieldwork/" &&
    /\b[0-9a-f]{40}\b/.test(softwareSource?.version_note ?? "") &&
    /installed `curate-apple-photos` skill resolved to this checked-out repository/i.test(
      softwareSourceText
    ) &&
    /local `main` matched `origin\/main`/i.test(softwareSourceText) &&
    /installed curation skill matched its public upstream repository before the run/i.test(
      runSource
    ) &&
    /zero-image live authorization check passed/i.test(runSource) &&
    /source was frozen by exact membership count and identifier digest/i.test(runSource) &&
    /public record intentionally omits both values/i.test(runSource);

  const capabilityGapExplicit =
    /bounded one-record probe of the deeper metadata provider timed out/i.test(runSource) &&
    /provider remains \*\*unverified\*\*/i.test(runSource) &&
    /does not claim that every archive capability is available/i.test(runSource) &&
    !/all archive capabilities (?:are|were) available/i.test(runSource);

  const workspaceWriteBounded =
    /designated one private workspace as the only place where this residency may create or change folders and albums/i.test(
      runSource
    ) &&
    /plan allowed only creation of one album beneath that workspace and addition of one existing asset/i.test(
      runSource
    ) &&
    /allowed no deletion, source edit, metadata edit, favorite change, face or People change, date change, location change, or external transfer/i.test(
      runSource
    ) &&
    /specific Apple Photos workspace/i.test(methodSource) &&
    /membership only within that workspace/i.test(methodSource);

  const peopleTagsPrivateNotInference =
    /People names he has manually assigned over time/i.test(runSource) &&
    /guide private source return/i.test(runSource) &&
    /not identity inference, public evidence, consent, or publication permission/i.test(runSource) &&
    /did not attempt.+search across named people/i.test(runSource);

  const inspectionLocalOnly =
    /local PhotoKit image retrieval, private preview generation, decoding, and local visual inspection were available/i.test(
      runSource
    ) &&
    /No image or metadata was uploaded/i.test(runSource) &&
    /sanitized private previews were inspected/i.test(runSource);

  const holdsExcluded =
    /automated safety holds remained excluded/i.test(runSource) &&
    /AI assisted private discovery and evaluation; it did not clear a hold/i.test(runSource) &&
    /Every automatic HOLD remains outside the selected membership/i.test(evaluationSource);

  const releaseGatesPassed =
    /exact one-image proposal passed full-coverage delegated evaluation and structural validation before any catalog write/i.test(
      runSource
    ) &&
    /proposal must pass exact-candidate evaluation and validation before any write plan executes/i.test(
      evaluationSource
    ) &&
    /not human clearance or aesthetic authority/i.test(runSource);

  const receiptlessLaunchFailsClosed =
    /first launch.+exited before a receipt/i.test(runSource) &&
    /read-only catalog check confirmed that no album had been created/i.test(runSource) &&
    /receipt-less or crashed helper launch is failure/i.test(evaluationSource) &&
    /optimistic log line is not completion evidence/i.test(evaluationSource);

  const membershipIdempotentlyVerified =
    /fresh app receipt for one album with one member/i.test(runSource) &&
    /exact production plan was run and rerun with distinct nonces/i.test(runSource) &&
    /receipt comparator and an independent WAL-aware, read-only catalog verifier both passed/i.test(
      runSource
    ) &&
    /fresh app receipt, a nonce-distinct rerun, receipt comparison, and independent WAL-aware read-only verification/i.test(
      evaluationSource
    );

  const sourceAndPriorStructureUnchanged =
    /source membership and prior hierarchy remained unchanged; only the authorized private album membership was added/i.test(
      runSource
    ) &&
    /source library remains read-only at the database layer/i.test(methodSource) &&
    /may not delete assets, move prior collections, change originals or metadata/i.test(
      methodSource
    );

  const oneImageNotArchiveScaleEvidence =
    /one-image proof is not the proposed rough-draft field/i.test(runSource) &&
    /cannot establish the archive's range, themes, completeness, or quality/i.test(runSource) &&
    /domestic still life is not by itself evidence of professional accomplishment, project impact, hosting outcomes, or another person's experience/i.test(
      runSource
    ) &&
    /may not be converted into archive-scale, project-impact, professional-evidence, aesthetic-quality, or representative-sample claims/i.test(
      evaluationSource
    );

  const knowledgeBankRasterFiles = files.filter(
    (file) => file.startsWith("docs/knowledge-bank/") && /\.(?:jpe?g|png|heic|tiff?|gif|webp|avif)$/i.test(file)
  );
  const publicBoundaryClean =
    manifest.requiredRecords.every(([id]) =>
      ["public", "public-safe"].includes(record(id)?.visibility)
    ) &&
    !privatePattern.test(allPublicSource) &&
    !containsProtectedFingerprintSource(selfEvaluatorSource) &&
    !imagePattern.test(runSource) &&
    knowledgeBankRasterFiles.length === 0 &&
    /image, source and album identifiers, exact source count and digest.+remain outside public Git/i.test(
      runSource
    );
  const branchHistoryBoundaryClean =
    Array.isArray(historyEvaluatorSources) &&
    historyEvaluatorSources.every(
      (historicalSource) => !containsProtectedFingerprintSource(historicalSource)
    );

  const selectionNotPublication =
    /selected asset remains `publication-review-required`/i.test(runSource) &&
    /No person, rights holder, author, caption, crop, claim, or destination has been cleared/i.test(
      runSource
    ) &&
    /Successful catalog membership does not clear the image, caption, interpretation, crop, or any public destination/i.test(
      runSource
    ) &&
    /AI system.+may not clear a safety hold, infer consent, or grant publication permission/i.test(
      methodSource
    );

  const projectionHeld = [run, evaluation].every(
    (item) =>
      item?.projection_status === "hold" &&
      item?.projection?.status === "hold" &&
      item?.projection?.surfaces?.length === 0
  );

  const evalNonAuthoritative =
    /cannot grade the photograph, decide its meaning, clear rights or consent, or promote it to the portfolio/i.test(
      evaluationSource
    ) &&
    /green result.+does not mean the photograph is good, important, public-safe, rights-cleared, or ready for any portfolio surface/i.test(
      evaluationSource
    );

  const evalWired =
    /import \{ evaluatePhotographyStudioConnection \} from "\.\/photography-studio-connection-eval\.mjs"/.test(
      mainEvaluatorSource
    ) &&
    /\.\.\.photographyStudioConnection\.checks/.test(mainEvaluatorSource) &&
    existsSync(
      path.join(
        repoRoot,
        "scripts/knowledge-wiki/photography-studio-connection-eval.test.mjs"
      )
    ) &&
    /## Mutation coverage/i.test(evaluationSource);

  const checks = {
    studio_connection_records_materialized: recordsMaterialized,
    studio_connection_navigation_reachable: navigationReachable,
    photo_skill_upstream_and_source_frozen: skillUpstreamAndSourceFrozen,
    photo_capability_gap_explicit: capabilityGapExplicit,
    photo_workspace_write_bounded: workspaceWriteBounded,
    people_tags_private_not_inference: peopleTagsPrivateNotInference,
    photo_inspection_local_only: inspectionLocalOnly,
    photo_holds_excluded: holdsExcluded,
    photo_release_gates_passed: releaseGatesPassed,
    receiptless_launch_fails_closed: receiptlessLaunchFailsClosed,
    photo_membership_idempotently_verified: membershipIdempotentlyVerified,
    photo_source_and_prior_structure_unchanged: sourceAndPriorStructureUnchanged,
    one_image_not_archive_scale_evidence: oneImageNotArchiveScaleEvidence,
    studio_connection_public_boundary_clean: publicBoundaryClean,
    studio_connection_branch_history_boundary_clean: branchHistoryBoundaryClean,
    studio_connection_selection_not_publication: selectionNotPublication,
    studio_connection_projection_held: projectionHeld,
    studio_connection_eval_non_authoritative: evalNonAuthoritative,
    studio_connection_eval_wired: evalWired
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
  const evaluation = evaluatePhotographyStudioConnection();
  for (const [id, passed] of Object.entries(evaluation.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
  }
  if (!evaluation.passed) process.exit(1);
  console.log(
    `Photography studio connection eval passed: ${evaluation.counts.blockingCriteria} blocking criteria across ${evaluation.counts.requiredRecords} governed records.`
  );
}
