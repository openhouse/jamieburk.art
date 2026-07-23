import { readFileSync } from "node:fs";
import path from "node:path";

import {
  compileWiki,
  defaultRepoRoot,
  wikiRecordSchema
} from "./lib.mjs";

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|Library\/CloudStorage|\.photoslibrary\b|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/photo-notebook.json"),
      "utf8"
    )
  );
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

  const requiredIds = manifest.requiredRecords.map(([id]) => id);
  const notebook = record(manifest.notebookRootId);
  const field = record(manifest.fieldId);
  const vocabulary = normalized(manifest.vocabularyId);
  const sequences = normalized(manifest.sequenceId);
  const templates = normalized(manifest.templatesId);
  const proposal = normalized(manifest.proposalId);
  const notebookSource = normalized(manifest.notebookRootId);
  const fieldSource = normalized(manifest.fieldId);
  const publicRegistry =
    options.publicRegistryOverride ??
    readFileSync(path.join(repoRoot, manifest.publicRegistryPath), "utf8");

  const photographyNotebookRecordsMaterialized = manifest.requiredRecords.every(
    ([id, expectedPath]) => {
      const item = record(id);
      return item?.path === expectedPath && item?.canonical_path === expectedPath;
    }
  );

  const notebookTargets = notebook?.relations?.map((relation) => relation.target) ?? [];
  const photographyNotebookReachable =
    manifest.navigationParents.every((parentId) =>
      record(parentId)?.relations?.some(
        (relation) => relation.target === manifest.notebookRootId
      )
    ) &&
    requiredIds
      .filter((id) => id !== manifest.notebookRootId)
      .every((id) => notebookTargets.includes(id)) &&
    requiredIds.every((id) => result.reachable.has(id));

  const photographyNotebookContractBounded = requiredIds.every((id) => {
    const item = record(id);
    return (
      item?.kind === "notebook" &&
      item.notebook_state &&
      item.projection?.status === "hold" &&
      item.projection.surfaces.length === 0 &&
      wikiRecordSchema.safeParse(item).success
    );
  });

  const photographyPrivateFieldCompletionIsBounded =
    field?.notebook_state === "private-field-complete" &&
    field.field_version === manifest.fieldVersion &&
    field.target_population === manifest.targetPopulation &&
    field.current_population === 0 &&
    field.private_verified_population === manifest.privateVerifiedPopulation &&
    /rough editorial draft, not a ranked shortlist, representative sample, complete archive census/i.test(
      notebookSource
    ) &&
    /private `v02` field is complete at exactly 1,000 unique photographs/i.test(
      fieldSource
    ) &&
    /current committed public-safe notebook population remains zero/i.test(
      fieldSource
    ) &&
    /does not establish archive completeness, representativeness, editorial quality, rights, consent, credit, safety for a public destination, or publication readiness/i.test(
      fieldSource
    ) &&
    /editor-ready rough field, not a final edit/i.test(
      fieldSource
    );

  const photographyEpistemicLanesSeparate = [
    "What is visibly present",
    "What metadata reports",
    "What Jamie or a collaborator remembers",
    "Editorial interpretation",
    "Research leads",
    "Supported claim link"
  ].every((heading) => templates.includes(`## ${heading}`)) &&
    /Treat memory as attributed context and a research lead, not automatic proof/i.test(
      templates
    ) &&
    /Link only to a separately governed claim/i.test(templates);

  const photographySelectionPublicationRightsSeparate =
    /Selection is not publication/i.test(notebookSource) &&
    /Editorial interest, evidence value, rights, consent, safety, and public-surface approval are separate decisions/i.test(
      notebookSource
    ) &&
    /Approved public surface: none unless Jamie records a separate approval/i.test(
      templates
    );

  const photographyExperimentRemainsOpen =
    /not a deterministic scoring system/i.test(vocabulary) &&
    /Outliers remain available because contradiction and surprise are information, not failed scores/i.test(
      vocabulary
    ) &&
    /not narratives the photographs must illustrate/i.test(sequences) &&
    /Preserve versions that fail or contradict one another/i.test(sequences) &&
    !/^\s*(?:score|rank):/im.test(source(manifest.templatesId));

  const photographyPeopleRemainAgents =
    /People remain agents/i.test(notebookSource) &&
    /Do not use faces as shorthand for community/i.test(notebookSource) &&
    /make Jamie the default center of collective scenes/i.test(notebookSource) &&
    /without becoming the hero of every collective scene/i.test(sequences) &&
    /Protected absence is meaningful/i.test(notebookSource);

  const photographyDiscoveryDoesNotAutoPromoteClaims =
    /create an intake or inquiry, but it cannot automatically mature a memory or interpretation into a claim/i.test(
      notebookSource
    ) &&
    /A notebook entry can remain valuable even when it never becomes a public caption, claim, or image/i.test(
      templates
    );

  const photographyResidencyProposalPreservesPlay =
    /The proposal is an opening, not a contract/i.test(proposal) &&
    /will not be judged on the basis of doing what was promised here/i.test(
      proposal
    ) &&
    /free to change its question, method, scale, medium, pace, or destination/i.test(
      proposal
    ) &&
    /possible traces, not required deliverables/i.test(proposal) &&
    /not obligated to turn intimacy into output/i.test(proposal) &&
    /The proposal remains revisable\. The welcome remains/i.test(proposal);

  const photographyResidencyTouchstoneIsAttributedMemory =
    /Jamie often tells a story he remembers from an essay by Teju Cole/i.test(
      proposal
    ) &&
    /recorded as Jamie's remembered touchstone, not yet as a source-verified account/i.test(
      proposal
    );

  const photographyResidencyHospitalityIsBounded =
    /Private access instructions, household details, equipment custody, and precise residential coordinates remain in resident orientation/i.test(
      proposal
    ) &&
    /Hospitality is not permission to publish a private place/i.test(proposal) &&
    /Existing People names may guide private research/i.test(proposal) &&
    /unnamed faces will not be identified/i.test(proposal);

  const photographyProofOfLifeIsBounded =
    /operational canary and a threshold gesture, not a representative image, finished artwork, public selection, or proof of the archive's meaning/i.test(
      proposal
    ) &&
    /Completion confirms only that the bounded local workflow works/i.test(
      proposal
    ) &&
    /does not approve the selected photograph for publication or establish what the larger residency will become/i.test(
      proposal
    );

  const requiredSources = requiredIds.map(source);
  const photographyPrivateArchiveBoundary =
    requiredSources.every((text) => !privatePattern.test(text)) &&
    /original or preview image files unless separately approved/i.test(notebookSource) &&
    /people-tag exports, face embeddings/i.test(notebookSource) &&
    /private field manifest remains the authority/i.test(notebookSource) &&
    requiredSources.every((text) => !/!\[[^\]]*\]\([^)]*\)/.test(text));

  const photographyPublicProjectionSelective =
    requiredIds.every((id) => !publicRegistry.includes(id)) &&
    requiredIds.every((id) => record(id)?.projection?.status === "hold");

  const checks = {
    photography_notebook_records_materialized: photographyNotebookRecordsMaterialized,
    photography_notebook_reachable: photographyNotebookReachable,
    photography_notebook_contract_bounded: photographyNotebookContractBounded,
    photography_private_field_completion_is_bounded: photographyPrivateFieldCompletionIsBounded,
    photography_epistemic_lanes_separate: photographyEpistemicLanesSeparate,
    photography_selection_publication_rights_separate: photographySelectionPublicationRightsSeparate,
    photography_experiment_remains_open: photographyExperimentRemainsOpen,
    photography_people_remain_agents: photographyPeopleRemainAgents,
    photography_discovery_does_not_auto_promote_claims: photographyDiscoveryDoesNotAutoPromoteClaims,
    photography_residency_proposal_preserves_play: photographyResidencyProposalPreservesPlay,
    photography_residency_touchstone_is_attributed_memory: photographyResidencyTouchstoneIsAttributedMemory,
    photography_residency_hospitality_is_bounded: photographyResidencyHospitalityIsBounded,
    photography_proof_of_life_is_bounded: photographyProofOfLifeIsBounded,
    photography_private_archive_boundary: photographyPrivateArchiveBoundary,
    photography_public_projection_selective: photographyPublicProjectionSelective
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      requiredRecords: requiredIds.length,
      targetPopulation: field?.target_population ?? null,
      currentPopulation: field?.current_population ?? null,
      privateVerifiedPopulation: field?.private_verified_population ?? null
    }
  };
}
