import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|Library\/CloudStorage|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|\/L0\/0\d{2})/i;

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
  const proposal = record(manifest.proposalId);
  const canary = record(manifest.canaryId);
  const residencyProject = record(manifest.residencyProjectId);
  const referenceInquiry = record(manifest.referenceInquiryId);
  const notebookRecords = manifest.requiredRecords.map(([id]) => record(id)).filter(Boolean);
  const notebookTargets = notebook?.relations?.map((relation) => relation.target) ?? [];
  const residencyProjectTargets =
    residencyProject?.relations?.map((relation) => relation.target) ?? [];
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
  const proposalSource = normalized(manifest.proposalId);
  const canarySource = normalized(manifest.canaryId);
  const referenceInquirySource = normalized(manifest.referenceInquiryId);
  const allNotebookSource = manifest.requiredRecords.map(([id]) => source(id)).join("\n");

  const recordsMaterialized = manifest.requiredRecords.every(([id, expectedPath]) => {
    const item = record(id);
    return item?.path === expectedPath && item?.canonical_path === expectedPath;
  });

  const referenceRecordsMaterialized =
    referenceInquiry?.path === manifest.referenceInquiryPath &&
    referenceInquiry?.canonical_path === manifest.referenceInquiryPath &&
    manifest.referenceSources.every(([id, expectedPath]) => {
      const item = record(id);
      return item?.path === expectedPath && item?.canonical_path === expectedPath;
    });

  const navigationReachable =
    recordsMaterialized &&
    manifest.navigationIds.every((id) =>
      record(id)?.relations?.some((relation) => relation.target === manifest.notebookId)
    ) &&
    [
      manifest.fieldNoteId,
      manifest.questionsId,
      manifest.sketchId,
      manifest.proposalId,
      manifest.canaryId
    ].every((id) =>
      notebookTargets.includes(id)
    ) &&
    residencyProjectTargets.includes(manifest.proposalId) &&
    manifest.requiredRecords.every(([id]) => result.reachable.has(id));

  const workingStatesRemainProvisional =
    notebook?.status === "governed-open" &&
    fieldNote?.status === "draft" &&
    questions?.status === "governed-open" &&
    sketch?.status === "draft" &&
    proposal?.status === "draft" &&
    canary?.status === "maintained" &&
    notebookRecords.every(
      (item) =>
        ["index", "method", "research-inquiry", "evaluation"].includes(item.kind) &&
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

  const rfcBoundaryRetained =
    existsSync(path.join(repoRoot, manifest.rfcPath)) &&
    /Photography RFC/i.test(source(manifest.notebookId)) &&
    /private photo catalog/i.test(notebookSource) &&
    /Do not place photographs, contact sheets/i.test(notebookSource);

  const proposalAcceptedAsPermission =
    /The residency begins when the proposal is written/i.test(proposalSource) &&
    /Writing it is a promise to myself/i.test(proposalSource) &&
    /the voice asking for this time matters/i.test(proposalSource) &&
    /deserves time and space to be nourished/i.test(proposalSource) &&
    /196 Artists Residency receives and accepts this proposal/i.test(proposalSource) &&
    /It does not bind the work to its forecast/i.test(proposalSource);

  const proposalDepartureProtected =
    /This proposal is not a contract/i.test(proposalSource) &&
    /I will not be judged against the work forecast here/i.test(proposalSource) &&
    /may change medium, method, question, scale, pace, or direction/i.test(
      proposalSource
    ) &&
    /Departure is evidence of attention, not failure/i.test(proposalSource) &&
    /I retain the right to stop/i.test(proposalSource);

  const proposalOutputsNotRequired =
    /invitations, not required deliverables/i.test(proposalSource) &&
    /no public artifact at all/i.test(proposalSource) &&
    /Success is not counted in images processed/i.test(proposalSource) &&
    !/(?:must deliver|required output|minimum \d+ images)/i.test(proposalSource);

  const proposalSiteAndDurationBounded =
    /For up to two weeks/i.test(proposalSource) &&
    /home-based hosting practice in Brooklyn, near Fort Greene Park/i.test(
      proposalSource
    ) &&
    /Its exact address remains private/i.test(proposalSource) &&
    proposal?.relations?.some(
      (relation) =>
        relation.type === "part_of" && relation.target === manifest.residencyProjectId
    ) &&
    residencyProjectTargets.includes(manifest.proposalId);

  const proposalFirstPassStaysOpen =
    /not proposing to find the best thousand photographs/i.test(proposalSource) &&
    /encounter a field large enough that the photographs can begin speaking back/i.test(
      proposalSource
    ) &&
    /The structure grows from the material/i.test(proposalSource) &&
    /No photograph is selected, cleared, captioned, or published by this proposal/i.test(
      proposalSource
    ) &&
    /go where the work needs to go/i.test(proposalSource);

  const proposalReferenceSourcePositionHonest =
    referenceRecordsMaterialized &&
    manifest.referenceSources.every(([id]) =>
      proposal?.relations?.some(
        (relation) => relation.type === "uses_source" && relation.target === id
      )
    ) &&
    proposal?.relations?.some(
      (relation) =>
        relation.type === "informed_by" &&
        relation.target === manifest.referenceInquiryId
    ) &&
    manifest.referenceSources.every(([id]) =>
      referenceInquiry?.relations?.some(
        (relation) => relation.type === "uses_source" && relation.target === id
      )
    ) &&
    /Jamie remembers an essay/i.test(proposalSource) &&
    /exact essay, book, and wording Jamie remembers have not yet been recovered/i.test(
      proposalSource
    ) &&
    /artistic permission, not as a verified quotation/i.test(proposalSource) &&
    /Do not quote or upgrade the remembered account into verified biography/i.test(
      referenceInquirySource
    );

  const proposalCareBoundariesExplicit =
    /working cohort, contact sheets, filenames, identifiers, locations, and image-level notes remain private/i.test(
      proposalSource
    ) &&
    [
      "authorship",
      "rights",
      "consent",
      "represented-person agency",
      "collective credit",
      "caption",
      "alt text",
      "named surface"
    ].every((phrase) => proposalSource.includes(phrase)) &&
    /Looking is not ownership, and discovery is not permission/i.test(proposalSource) &&
    proposal?.projection?.status === "hold" &&
    proposal?.projection?.surfaces?.length === 0;

  const proposalAuthorshipPositionHonest =
    /This page began as an AI-assisted draft composed from Jamie's statements/i.test(
      proposalSource
    ) &&
    /Jamie explicitly accepted the proposal and remains its author and final editor/i.test(
      proposalSource
    ) &&
    /held from portfolio projection/i.test(proposalSource);

  const proposalHumanAcceptanceRecorded =
    proposal?.proposal_state === "accepted" &&
    proposal?.accepted_on === "2026-07-22" &&
    proposal?.accepted_by === "Jamie Burkart" &&
    proposal?.accepting_program === "196 Artists Residency" &&
    proposal?.acceptance_authority === "human-confirmed" &&
    /Your proposal is accepted\. Welcome\./i.test(proposalSource) &&
    /human acceptance recorded from Jamie's direct instruction/i.test(
      proposalSource
    ) &&
    /It was not inferred or granted by an evaluator or AI agent/i.test(
      proposalSource
    ) &&
    /Acceptance authorizes the residency to begin/i.test(proposalSource) &&
    /The record remains `status: draft` so its language can evolve with the residency/i.test(
      proposalSource
    ) &&
    /`proposal_state: accepted` preserves the decision to begin/i.test(
      proposalSource
    );

  const canaryRelationAndRecordClosed =
    notebookTargets.includes(manifest.canaryId) &&
    proposal?.relations?.some(
      (relation) => relation.type === "related_to" && relation.target === manifest.canaryId
    ) &&
    canary?.relations?.some(
      (relation) => relation.target === manifest.notebookId
    ) &&
    canary?.relations?.some(
      (relation) => relation.target === manifest.proposalId
    ) &&
    canary?.relations?.some(
      (relation) => relation.target === manifest.fieldNoteId
    );

  const canarySkillAndLocalAccessVerified =
    /installed `curate-apple-photos` skill was verified against the current checked-out `openhouse\/photo-fieldwork` `origin\/main`/i.test(
      canarySource
    ) &&
    /fresh, zero-image authorization check confirmed local PhotoKit access/i.test(
      canarySource
    ) &&
    /network access disabled/i.test(canarySource);

  const canarySelectionAndWriteBounded =
    /Four candidates were retrieved through Jamie's existing People association/i.test(
      canarySource
    ) &&
    /all four belonged to the frozen source/i.test(canarySource) &&
    /All four generated previews were decoded and inspected locally/i.test(canarySource) &&
    /Three were held because background privacy or represented-person and collective-credit questions/i.test(
      canarySource
    ) &&
    /created one private studio album and added one existing photograph by membership only/i.test(
      canarySource
    );

  const canaryReceiptsAndVerificationComplete =
    /two fresh production executions with distinct nonces and the same one-member result/i.test(
      canarySource
    ) &&
    /independent read-only verifier confirmed the exact folder parent chain/i.test(
      canarySource
    ) &&
    /zero missing or unexpected members/i.test(canarySource) &&
    /zero members outside the frozen source/i.test(canarySource) &&
    /zero safety-HOLD overlap/i.test(canarySource) &&
    /unchanged source count and identifier digest/i.test(canarySource);

  const canaryNoUploadOrCollateralMutation =
    /No network access or external upload occurred/i.test(canarySource) &&
    /did not change originals, edits, metadata, dates, locations, faces, People associations, favorites, source albums/i.test(
      canarySource
    ) &&
    /or anything outside the owner-authorized private workspace/i.test(canarySource);

  const canaryFrictionAndRepairPreserved =
    /differed by five source items/i.test(canarySource) &&
    /The cause was not inferred/i.test(canarySource) &&
    /Three initially exported preview copies retained source-bearing EXIF and failed the privacy verifier/i.test(
      canarySource
    ) &&
    /Only the generated local copies were sanitized; Apple Photos originals were not touched/i.test(
      canarySource
    ) &&
    /interrupted without a completion receipt/i.test(canarySource) &&
    /It was not counted as a pass/i.test(canarySource) &&
    /new nonce-bound execution completed/i.test(canarySource) &&
    /independently checked for idempotence/i.test(canarySource);

  const canaryPrivateMaterialAbsent =
    !privatePattern.test(source(manifest.canaryId)) &&
    /contains no photograph, preview, contact sheet, asset identifier, filename, local path, private folder or album title/i.test(
      canarySource
    ) &&
    /face record, coordinate, image-level metadata, or scene description/i.test(
      canarySource
    );

  const canaryPublicationGateRemainsHuman =
    /does not select or clear a photograph for the portfolio or publication/i.test(
      canarySource
    ) &&
    /Any later use still requires Jamie's explicit approval for a named image, derivative, and surface/i.test(
      canarySource
    ) &&
    /rights-holder or represented-person authority/i.test(canarySource) &&
    canary?.projection?.status === "hold" &&
    canary?.projection?.surfaces?.length === 0;

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
    photo_rfc_boundary_retained: rfcBoundaryRetained,
    photo_proposal_accepted_as_permission: proposalAcceptedAsPermission,
    photo_proposal_departure_protected: proposalDepartureProtected,
    photo_proposal_outputs_not_required: proposalOutputsNotRequired,
    photo_proposal_site_duration_bounded: proposalSiteAndDurationBounded,
    photo_proposal_first_pass_stays_open: proposalFirstPassStaysOpen,
    photo_proposal_reference_source_position_honest:
      proposalReferenceSourcePositionHonest,
    photo_proposal_care_boundaries_explicit: proposalCareBoundariesExplicit,
    photo_proposal_authorship_position_honest: proposalAuthorshipPositionHonest,
    photo_proposal_human_acceptance_recorded: proposalHumanAcceptanceRecorded,
    photo_canary_relation_and_record_closed: canaryRelationAndRecordClosed,
    photo_canary_skill_and_local_access_verified: canarySkillAndLocalAccessVerified,
    photo_canary_selection_and_write_bounded: canarySelectionAndWriteBounded,
    photo_canary_receipts_and_verification_complete:
      canaryReceiptsAndVerificationComplete,
    photo_canary_no_upload_or_collateral_mutation: canaryNoUploadOrCollateralMutation,
    photo_canary_friction_and_repair_preserved: canaryFrictionAndRepairPreserved,
    photo_canary_private_material_absent: canaryPrivateMaterialAbsent,
    photo_canary_publication_gate_remains_human: canaryPublicationGateRemainsHuman
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
