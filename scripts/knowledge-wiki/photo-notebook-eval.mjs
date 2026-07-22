import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|Library\/CloudStorage|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/photo-notebook.json"),
      "utf8"
    )
  );
}

function listFiles(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath, entry.name));
}

export function evaluatePhotoNotebook(options = {}) {
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
  const fieldNote = record(manifest.fieldNoteId);
  const questions = record(manifest.questionsId);
  const sketch = record(manifest.sketchId);
  const notebookRecords = manifest.requiredRecords.map(([id]) => record(id)).filter(Boolean);
  const notebookTargets = notebook?.relations?.map((relation) => relation.target) ?? [];
  const notebookFiles = options.notebookFilesOverride ?? listFiles(
    path.join(repoRoot, manifest.notebookRoot)
  );
  const publicRegistry = options.publicRegistryOverride ?? readFileSync(
    path.join(repoRoot, manifest.publicRegistryPath),
    "utf8"
  );

  const notebookSource = normalized(manifest.notebookId);
  const fieldNoteSource = normalized(manifest.fieldNoteId);
  const questionsSource = normalized(manifest.questionsId);
  const sketchSource = normalized(manifest.sketchId);
  const allNotebookSource = manifest.requiredRecords.map(([id]) => source(id)).join("\n");

  const recordsMaterialized = manifest.requiredRecords.every(([id, expectedPath]) => {
    const item = record(id);
    return item?.path === expectedPath && item?.canonical_path === expectedPath;
  });

  const navigationReachable =
    recordsMaterialized &&
    manifest.navigationIds.every((id) =>
      record(id)?.relations?.some((relation) => relation.target === manifest.notebookId)
    ) &&
    [manifest.fieldNoteId, manifest.questionsId, manifest.sketchId].every((id) =>
      notebookTargets.includes(id)
    ) &&
    manifest.requiredRecords.every(([id]) => result.reachable.has(id));

  const workingStatesRemainProvisional =
    notebook?.status === "governed-open" &&
    fieldNote?.status === "draft" &&
    questions?.status === "governed-open" &&
    sketch?.status === "draft" &&
    notebookRecords.every(
      (item) =>
        ["index", "method", "research-inquiry"].includes(item.kind) &&
        item.projection?.status === "hold" &&
        item.projection?.surfaces?.length === 0
    );

  const roughCohortNotPopulationClaim =
    /roughly 1,000 photographs as a first working field/i.test(notebookSource) &&
    /not an audited sample/i.test(notebookSource) &&
    /not a ranking of the best photographs/i.test(notebookSource) &&
    /not a complete account of the archive/i.test(notebookSource) &&
    /initial 1,000-photo working cohort remains outside public Git/i.test(notebookSource);

  const creativeLatitudePreserved =
    /playful, contradictory, incomplete, and revised/i.test(notebookSource) &&
    /No fixed taxonomy governs the first reading/i.test(notebookSource) &&
    /Categories may emerge, overlap, split, disappear, or contradict one another/i.test(
      notebookSource
    ) &&
    /mystery/i.test(notebookSource) &&
    /not understood yet/i.test(notebookSource) &&
    /revise the Wiki's structure when the photographic material warrants it/i.test(
      notebookSource
    );

  const observationAndInterpretationSeparated =
    /### Visible observation/i.test(fieldNoteSource) &&
    /### Felt response and interpretation/i.test(fieldNoteSource) &&
    /Mark it explicitly as a reading, not a fact carried by the pixels/i.test(
      fieldNoteSource
    ) &&
    /### Possible relations/i.test(fieldNoteSource) &&
    /A possible relation is a research lead, not evidence/i.test(fieldNoteSource);

  const counterReadingAndAbsencePreserved =
    /### Counter-reading/i.test(fieldNoteSource) &&
    /at least one materially different interpretation/i.test(fieldNoteSource) &&
    /### What the frame withholds/i.test(fieldNoteSource) &&
    /off-frame labor, missing voices/i.test(fieldNoteSource) &&
    /What can the photograph not tell us/i.test(questionsSource);

  const representedPeopleRemainAgents =
    /People are agents, not scenery around Jamie's work/i.test(notebookSource) &&
    /### People, dignity, and collective credit/i.test(fieldNoteSource) &&
    /turns anyone into scenery, evidence, endorsement, or a type/i.test(
      fieldNoteSource
    ) &&
    /represented person recognize as dignified and true enough to their own agency/i.test(
      questionsSource
    );

  const visualLeadsCannotPromoteThemselves =
    /Notebook language cannot automatically become a claim, source, asset record, caption, portfolio selection, or publication decision/i.test(
      notebookSource
    ) &&
    /Inclusion does not establish authorship, identity, chronology, consent, rights, evidence, factual support, or editorial selection/i.test(
      notebookSource
    ) &&
    /A notebook entry is not evidence, a caption, or publication approval/i.test(
      normalized("index.knowledge-wiki.visual-evidence")
    );

  const humanPublicationGatesRemainOpen =
    /Default: \*\*hold\*\*/i.test(fieldNoteSource) &&
    [
      "rights holder",
      "represented-person",
      "consent",
      "collective credit",
      "crop",
      "caption",
      "alt text",
      "named surface"
    ].every((phrase) => fieldNoteSource.includes(phrase)) &&
    /Jamie approval is required/i.test(fieldNoteSource) &&
    notebookRecords.every((item) => item.projection?.status === "hold");

  const sequenceSketchRemainsInterpretive =
    /working interpretation supplied by Jamie/i.test(sketchSource) &&
    /not a verified chronology, a fixed portfolio sequence/i.test(sketchSource) &&
    /Photography may test, complicate, or replace this structure/i.test(sketchSource) &&
    /This remains first-person interpretation requiring project-specific corroboration/i.test(
      sketchSource
    ) &&
    /No photograph is selected or cleared by this sketch/i.test(sketchSource) &&
    sketch?.projection?.status === "hold";

  const openQuestionsStayGenerative =
    /not a required taxonomy/i.test(questionsSource) &&
    /revised, contradicted, combined, or abandoned/i.test(questionsSource) &&
    (source(manifest.questionsId).match(/^- /gm)?.length ?? 0) >=
      manifest.minimumOpenQuestions;

  const notebookPublicSafetyPreserved =
    notebookFiles.every((file) => path.extname(file).toLowerCase() === ".md") &&
    !privatePattern.test(allNotebookSource) &&
    manifest.requiredRecords.every(([id]) => !publicRegistry.includes(id)) &&
    notebookRecords.every((item) => !["asset", "source", "claim", "projection"].includes(item.kind));

  const rfpBoundaryRetained =
    existsSync(path.join(repoRoot, manifest.rfpPath)) &&
    /Photography RFP/i.test(source(manifest.notebookId)) &&
    /private photo catalog/i.test(notebookSource) &&
    /Do not place photographs, contact sheets/i.test(notebookSource);

  const checks = {
    photo_notebook_records_materialized: recordsMaterialized,
    photo_notebook_navigation_reachable: navigationReachable,
    photo_working_states_remain_provisional: workingStatesRemainProvisional,
    photo_rough_cohort_not_population_claim: roughCohortNotPopulationClaim,
    photo_creative_latitude_preserved: creativeLatitudePreserved,
    photo_observation_interpretation_separated: observationAndInterpretationSeparated,
    photo_counter_reading_and_absence_preserved: counterReadingAndAbsencePreserved,
    photo_represented_people_remain_agents: representedPeopleRemainAgents,
    photo_visual_leads_cannot_self_promote: visualLeadsCannotPromoteThemselves,
    photo_human_publication_gates_remain_open: humanPublicationGatesRemainOpen,
    photo_sequence_sketch_remains_interpretive: sequenceSketchRemainsInterpretive,
    photo_open_questions_stay_generative: openQuestionsStayGenerative,
    photo_notebook_public_safety_preserved: notebookPublicSafetyPreserved,
    photo_rfp_boundary_retained: rfpBoundaryRetained
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      records: manifest.requiredRecords.length,
      openQuestions: source(manifest.questionsId).match(/^- /gm)?.length ?? 0,
      notebookFiles: notebookFiles.length
    }
  };
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const evaluation = evaluatePhotoNotebook();
  if (evaluation.passed) {
    console.log(
      `Photography notebook eval passed: ${Object.keys(evaluation.checks).length} criteria, ${evaluation.counts.records} records, ${evaluation.counts.openQuestions} open questions.`
    );
  } else {
    console.error(`Photography notebook eval failed: ${evaluation.failures.join(", ")}`);
    process.exit(1);
  }
}
