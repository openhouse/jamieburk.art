import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|Library\/CloudStorage|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;
const privateMediaPattern =
  /(?:!\[[^\]]*\]\([^)]*\)|<img\b|data:image|\b(?:IMG|DSC|PXL)[-_]?\d{3,}\.(?:jpe?g|heic|png)\b)/i;

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/photography-notebook.json"),
      "utf8"
    )
  );
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

  const root = record("index.knowledge-wiki");
  const visual = record(manifest.visualEvidenceId);
  const notebook = record(manifest.notebookId);
  const field = record("research-inquiry.photography.field-set-001");
  const grammar = record("method.photography.invitation-container-emergence");
  const entry = record("method.photography.notebook-entry");
  const proposal = record("project.photography.field-set-001-residency");
  const tejuSource = record("source.teju-cole.far-away-from-here.2015");
  const notebookIds = manifest.requiredRecords.map((item) => item.id);
  const notebookTargets = notebook?.relations?.map((relation) => relation.target) ?? [];
  const notebookSources = notebookIds.map(source);
  const allNotebookSource = notebookSources.join("\n").replace(/\s+/g, " ");
  const fieldSource = normalized("research-inquiry.photography.field-set-001");
  const grammarSource = normalized("method.photography.invitation-container-emergence");
  const entrySource = source("method.photography.notebook-entry");
  const proposalSource = normalized("project.photography.field-set-001-residency");
  const tejuSourceText = normalized("source.teju-cole.far-away-from-here.2015");
  const publicRegistry =
    options.publicRegistryOverride ??
    readFileSync(path.join(repoRoot, manifest.publicRegistryPath), "utf8");

  const recordsMaterialized = manifest.requiredRecords.every((expected) => {
    const item = record(expected.id);
    return (
      item?.path === expected.path &&
      item?.canonical_path === expected.path &&
      item?.kind === expected.kind &&
      (expected.status
        ? item.status === expected.status
        : ["governed-open", "draft"].includes(item.status))
    );
  });

  const navigationReachable =
    root?.relations?.some((relation) => relation.target === manifest.notebookId) &&
    visual?.relations?.some((relation) => relation.target === manifest.notebookId) &&
    notebookIds
      .filter((id) => id !== manifest.notebookId)
      .every((id) => notebookTargets.includes(id)) &&
    notebookIds.every((id) => result.reachable.has(id));

  const publicPrivateBoundary =
    manifest.requiredRecords.every((expected) => {
      const item = record(expected.id);
      const text = source(expected.id);
      return (
        item?.visibility === "public-safe" &&
        !privatePattern.test(text) &&
        !privateMediaPattern.test(text)
      );
    }) &&
    /private and remains outside this repository/i.test(allNotebookSource) &&
    /public-safe aggregate/i.test(allNotebookSource);

  const fieldSetProvisional =
    field?.kind === "research-inquiry" &&
    field?.status === "governed-open" &&
    field?.projection?.status === "hold" &&
    field.projection.surfaces.length === 0 &&
    /approximately 1,000 photographs/i.test(fieldSource) &&
    /not yet been received, counted, audited/i.test(fieldSource) &&
    /not a publication set/i.test(fieldSource) &&
    field.anti_claims?.some((item) => /not an exact population claim/i.test(item));

  const exactIdentityAndNonmutation =
    /read-only against the source/i.test(fieldSource) &&
    /exact private membership rather than relying on a matching count/i.test(fieldSource) &&
    /changed membership creates a new version/i.test(fieldSource) &&
    /preserve original identifiers and metadata/i.test(fieldSource);

  const observationInterpretationSeparated =
    /^## What is visible$/m.test(entrySource) &&
    /^## Interpretations and hypotheses$/m.test(entrySource) &&
    /^## What this does not establish$/m.test(entrySource) &&
    /Describe before interpreting/i.test(allNotebookSource) &&
    /does not by itself establish identity, authorship, attendance/i.test(fieldSource);

  const selectionAndPublicationSeparated =
    /Selection into the field is not rights or consent clearance/i.test(fieldSource) &&
    /without separate provenance, factual, authorship, rights, consent, caption, crop, context, audience, and Jamie-approval decisions/i.test(
      fieldSource
    ) &&
    /Notebook inclusion is not factual verification, aesthetic approval, or publication selection/i.test(
      notebook?.anti_claims?.join(" ") ?? ""
    );

  const humanHoldsCannotBeAgentCleared =
    /Agents may detect missing information and enforce gates; they may not clear safety, provenance, rights, consent, attribution, or publication holds/i.test(
      allNotebookSource
    ) &&
    /Agents may identify missing review but cannot grant rights, consent, attribution, factual clearance, or publication permission/i.test(
      allNotebookSource
    ) &&
    [notebook, field, grammar, entry].every(
      (item) => item?.human_review === "governed-open"
    );

  const creativeSequenceGrammarPreserved =
    /Release yourself \/ onto the water \/ until it tastes of salt/i.test(grammarSource) &&
    /Release yourself: invitation/i.test(grammarSource) &&
    /Onto the water: container/i.test(grammarSource) &&
    /Until it tastes of salt: emergence/i.test(grammarSource) &&
    ["Threshold", "Apparatus", "Reciprocity", "Emergence", "Afterlife"].every(
      (term) => grammarSource.includes(`**${term}:**`)
    ) &&
    /## Stranger test/i.test(source(grammar.id));

  const playCounterreadingAndEmptyOutcomeAllowed =
    /Play before convergence/i.test(allNotebookSource) &&
    /Counter-reading/i.test(fieldSource) &&
    /no publication candidates/i.test(allNotebookSource) &&
    /grammar should change when the photographs resist it/i.test(grammarSource);

  const notebookEntryContractComplete = manifest.requiredEntryHeadings.every(
    (heading) => entrySource.includes(`## ${heading}`)
  ) &&
    /Choose one provisional action: revisit, compare, research, request human review, hold, defer, or close/i.test(
      normalized("method.photography.notebook-entry")
    );

  const residencyProposalIsGovernedEntryway =
    proposal?.kind === "project" &&
    proposal?.status === "draft" &&
    proposal?.human_review === "requested" &&
    proposal?.relations?.some(
      (relation) => relation.target === "project.sunday-dinner-196"
    ) &&
    proposal?.relations?.some(
      (relation) => relation.target === "research-inquiry.photography.field-set-001"
    ) &&
    proposal?.relations?.some(
      (relation) => relation.target === "source.teju-cole.far-away-from-here.2015"
    ) &&
    /AI-assisted first-person draft/i.test(proposalSource) &&
    /up to two weeks/i.test(proposalSource) &&
    /begins now, with the writing of this proposal/i.test(proposalSource) &&
    /I receive and accept this proposal/i.test(proposalSource);

  const residencyProposalIsNotContract =
    /instrument of attention, not a contract/i.test(proposalSource) &&
    /will not be judged by whether the work resembles what I could imagine before entering it/i.test(
      proposalSource
    ) &&
    /No finished work is owed/i.test(proposalSource) &&
    proposal?.anti_claims?.some((item) =>
      /not a contract, production schedule, or promise of a finished work/i.test(item)
    );

  const residencyPermissionToDepartPreserved =
    /permission to go where it needs to go/i.test(proposalSource) &&
    /Changing course is evidence that attention is operating, not a failure/i.test(
      proposalSource
    ) &&
    /permission to wander, change course, rest, return/i.test(proposalSource) &&
    /grammar should change when the photographs resist it/i.test(grammarSource);

  const residencySuccessNotOutputOrPublication =
    /Success does not require a finished artifact, a fixed number of selects, or a public result/i.test(
      proposalSource
    ) &&
    /no public-facing work at all/i.test(proposalSource) &&
    /no publication candidates remained acceptable/i.test(proposalSource) &&
    proposal?.projection?.status === "hold" &&
    proposal.projection.surfaces.length === 0;

  const residencyFreedomRemainsEthicallyBounded =
    /artistic freedom inside the practice, not freedom from responsibility/i.test(
      proposalSource
    ) &&
    /Play does not override privacy, provenance, attribution, rights, consent, factual review, or Jamie's approval/i.test(
      proposalSource
    ) &&
    /A private image can transform the artist's understanding without ever becoming public/i.test(
      proposalSource
    );

  const tejuColeReferenceIsSourceHonest =
    tejuSource?.kind === "source" &&
    tejuSource?.status === "maintained" &&
    tejuSource?.canonical_url ===
      "https://www.nytimes.com/2015/09/27/magazine/far-away-from-here.html" &&
    /June through November 2014/i.test(tejuSourceText) &&
    /nonfiction manuscript about Lagos/i.test(tejuSourceText) &&
    /he did some Lagos and other writing/i.test(tejuSourceText) &&
    /majority of his time went into traveling around Switzerland and making photographs/i.test(
      tejuSourceText
    ) &&
    /developed across 2014-2019 into \*Fernweh\*/i.test(tejuSourceText) &&
    /Do not sharpen the story into "Cole went to write and wrote nothing\."/i.test(
      tejuSourceText
    );

  const projectionRemainsHold =
    manifest.requiredRecords.every((expected) => {
      const item = record(expected.id);
      return item?.projection?.status === "hold" && item.projection.surfaces.length === 0;
    }) &&
    notebookIds.every((id) => !publicRegistry.includes(id));

  const checks = {
    photography_notebook_records_materialized: recordsMaterialized,
    photography_notebook_reachable: navigationReachable,
    photography_notebook_public_private_boundary: publicPrivateBoundary,
    field_set_provisional_not_population_claim: fieldSetProvisional,
    field_set_exact_identity_and_nonmutation: exactIdentityAndNonmutation,
    observation_interpretation_claim_separated: observationInterpretationSeparated,
    selection_rights_consent_publication_separated: selectionAndPublicationSeparated,
    human_holds_cannot_be_agent_cleared: humanHoldsCannotBeAgentCleared,
    creative_sequence_grammar_preserved: creativeSequenceGrammarPreserved,
    play_counterreading_and_empty_outcome_allowed: playCounterreadingAndEmptyOutcomeAllowed,
    notebook_entry_contract_complete: notebookEntryContractComplete,
    residency_proposal_is_governed_entryway: residencyProposalIsGovernedEntryway,
    residency_proposal_is_not_contract: residencyProposalIsNotContract,
    residency_permission_to_depart_preserved: residencyPermissionToDepartPreserved,
    residency_success_not_output_or_publication: residencySuccessNotOutputOrPublication,
    residency_freedom_remains_ethically_bounded: residencyFreedomRemainsEthicallyBounded,
    teju_cole_reference_is_source_honest: tejuColeReferenceIsSourceHonest,
    photography_projection_remains_hold: projectionRemainsHold
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      records: manifest.requiredRecords.length,
      entryHeadings: manifest.requiredEntryHeadings.length,
      blockingCriteria: manifest.criteria.length
    }
  };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const evaluation = evaluatePhotographyNotebook();
  for (const [id, passed] of Object.entries(evaluation.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
  }
  if (!evaluation.passed) process.exit(1);
  console.log(
    `Photography notebook eval passed: ${evaluation.counts.blockingCriteria}/${evaluation.counts.blockingCriteria} blocking criteria.`
  );
}
