import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const protectedLocatorPattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|Library\/CloudStorage|\.photoslibrary\b|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;
const embeddedMediaPattern =
  /(?:data:image\/[a-z+.-]+;base64|!\[[^\]]*\]\((?:file:|data:)|<img\b[^>]*\bsrc=["'](?:file:|data:))/i;
const sourceIdentifierPattern =
  /(?:\b(?:IMG|DSC|PXL|SAM|DCIM)[-_]?\d{3,}\.(?:jpe?g|png|heic|tiff?)\b|\b(?:source|asset|photo|image)\s+(?:identifier|id|uuid)\s*[:=]\s*\S+)/i;
const gpsPayloadPattern =
  /(?:\bGPS(?: coordinates?)?\s*[:=]\s*)?[-+]?\d{1,2}\.\d{4,}\s*,\s*[-+]?\d{1,3}\.\d{4,}/i;
const derivedPrivatePayloadPattern =
  /(?:\b(?:face|people|person)\s+label\s*[:=]\s*["']?[A-Z][^\n,;]{1,80}|\bOCR(?: text)?\s*[:=]\s*["']?[^\n]{4,160}|\bpreview(?: path| locator| URL| URI)?\s*[:=]\s*\S+)/i;
const automatedAuthorityPattern =
  /(?:\b(?:model|AI|algorithm|classifier|confidence|score)\b.{0,100}\b(?:automatically\s+)?(?:clears?|closes?|approves?|authorizes?|waives?|overrides?|releases?|publishes?)\b|\b(?:clears?|closes?|approves?|authorizes?|waives?|overrides?|releases?|publishes?)\b.{0,100}\b(?:by|from|using)\b.{0,40}\b(?:model|AI|algorithm|classifier|confidence|score)\b)/i;
const unsupportedClaimPromotionPattern =
  /(?:\b(?:visible observation|photograph|photo|image)\b.{0,120}\b(?:directly|automatically|alone|without corroboration)\b.{0,80}\b(?:verified factual claim|claim|proves?|confirms?|establishes?)\b|\b(?:promotes?|converts?)\b.{0,100}\b(?:visible observation|photograph|photo|image)\b.{0,100}\b(?:verified factual claim|claim|proof)\b)/i;
const forcedCoveragePattern =
  /(?:\bevery\s+(?:project|period|person|place)\b.{0,100}\b(?:equal|quota|coverage|represented)|\bevery\s+(?:photograph|photo|image)\b.{0,80}\b(?:must|shall|required)\b.{0,40}\bclassif)/i;
const falseCompletionPattern =
  /\b(?:private field|field corpus 001|corpus)\b.{0,40}\b(?:is|has been|was)\s+(?:now\s+)?(?:frozen|ingested|assembled|complete|finalized)\b/i;

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

  const root = record("index.knowledge-wiki");
  const notebook = record(manifest.notebookId);
  const field = record(manifest.fieldId);
  const visualIndex = record(manifest.visualIndexId);
  const notebookSource = source(manifest.notebookId);
  const fieldSource = source(manifest.fieldId);
  const combinedSource = `${notebookSource}\n${fieldSource}`;
  const rfpSource = readFileSync(path.join(repoRoot, manifest.rfpPath), "utf8");

  const notebookAreaMaterialized =
    notebook?.kind === "index" &&
    notebook?.status === "governed-open" &&
    notebook?.canonical_path === manifest.notebookPath &&
    field?.kind === "research-inquiry" &&
    field?.status === "draft" &&
    field?.canonical_path === manifest.fieldPath;

  const notebookReachable =
    Boolean(notebook) &&
    Boolean(field) &&
    root?.relations?.some((relation) => relation.target === manifest.notebookId) &&
    visualIndex?.relations?.some((relation) => relation.target === manifest.notebookId) &&
    notebook?.relations?.some((relation) => relation.target === manifest.fieldId) &&
    result.reachable.has(manifest.notebookId) &&
    result.reachable.has(manifest.fieldId);

  const fieldCorpusStateTruthful =
    /planned rough-draft selection of approximately\s+1,000 photographs/i.test(fieldSource) &&
    /private field has not yet been frozen or ingested/i.test(fieldSource) &&
    /Neither number is an independently frozen source count/i.test(fieldSource) &&
    !/1,000 photographs (?:were|have been|are now) (?:selected|ingested|frozen)/i.test(fieldSource) &&
    !falseCompletionPattern.test(fieldSource);

  const attentionNotPublication =
    /select for attention, not publication/i.test(notebookSource) &&
    /selected for attention, not publication/i.test(fieldSource) &&
    /not a\s+representative sample, completeness claim, evidence set, shortlist/i.test(fieldSource);

  const fourLayersRemainDistinct = [
    "Lifetime source archive",
    "Private field corpus",
    "Public-safe notebook",
    "Selective public projection"
  ].every((label) => notebookSource.includes(label)) &&
    /Movement between layers is never automatic/i.test(notebookSource);

  const experimentalSpacePreserved =
    /creative, intuitive, experimental, and revisable/i.test(fieldSource) &&
    /sequences and near-duplicates/i.test(fieldSource) &&
    /Unclassified material is a\s+valid and useful state/i.test(fieldSource) &&
    /No coverage quota is required/i.test(fieldSource) &&
    /complicate,\s+contradict, or replace them/i.test(fieldSource) &&
    !forcedCoveragePattern.test(fieldSource);

  const observationsRemainQuestions =
    /visible observations, memories, interpretations, and supported facts\s+as different things/i.test(notebookSource) &&
    /Route factual propositions to a research inquiry/i.test(notebookSource) &&
    /photograph alone cannot establish identity, consent, authorship,\s+causation, endorsement/i.test(fieldSource) &&
    /seek corroborating sources and\s+collaborator knowledge/i.test(fieldSource) &&
    !unsupportedClaimPromotionPattern.test(fieldSource);

  const collectiveAgencyAndAbsencePreserved =
    /participants remain individual agents/i.test(fieldSource) &&
    /people or forms of labor made peripheral by the camera/i.test(fieldSource) &&
    /Absence from this bounded field does not establish absence/i.test(fieldSource) &&
    /scenes in which Jamie is not visible/i.test(fieldSource);

  const publicNotebookContainsNoPrivatePayload =
    !protectedLocatorPattern.test(combinedSource) &&
    !embeddedMediaPattern.test(combinedSource) &&
    !sourceIdentifierPattern.test(combinedSource) &&
    !gpsPayloadPattern.test(combinedSource) &&
    !derivedPrivatePayloadPattern.test(combinedSource) &&
    /Keep exact source identifiers, filenames, paths, previews, contact sheets/i.test(notebookSource) &&
    /No photographs, source\s+identifiers, image-level metadata, or private encounter notes are recorded/i.test(fieldSource);

  const encounterHistoryIsAdditive =
    /Revise additively and date each encounter/i.test(notebookSource) &&
    /## Encounter log/i.test(fieldSource) &&
    /Future entries should be additive and dated/i.test(fieldSource) &&
    /prior reading changed/i.test(notebookSource);

  const publicationGatesRemainHuman =
    notebook?.projection?.status === "hold" &&
    notebook?.projection?.surfaces?.length === 0 &&
    field?.projection?.status === "hold" &&
    field?.projection?.surfaces?.length === 0 &&
    manifest.humanGates.every((gate) =>
      fieldSource.toLowerCase().includes(gate.toLowerCase())
    ) &&
    (fieldSource.match(/- \[ \]/g) ?? []).length === manifest.humanGates.length &&
    /cannot close these gates/i.test(fieldSource) &&
    !automatedAuthorityPattern.test(combinedSource);

  const noPublicPhotoRoute =
    !existsSync(path.join(repoRoot, "apps/www/src/app/photos")) &&
    !existsSync(path.join(repoRoot, "apps/www/src/app/photography")) &&
    notebook?.projection?.status !== "active" &&
    field?.projection?.status !== "active";

  const rfpBoundaryPreserved =
    /^stage: proposed$/m.test(rfpSource) &&
    /RFP remains proposed/i.test(notebookSource) &&
    /does not authorize archive access,\s+private-workspace implementation, image ingestion, or publication/i.test(notebookSource);

  const nextPassDoesNotMutateSource =
    /without mutating the source archive/i.test(fieldSource) &&
    /authoritative originals, edits, metadata, and existing organization/i.test(notebookSource) &&
    /Private, unchanged, and outside this repository/i.test(notebookSource);

  const checks = {
    photography_notebook_materialized: notebookAreaMaterialized,
    photography_notebook_reachable: notebookReachable,
    field_corpus_state_truthful: fieldCorpusStateTruthful,
    attention_not_publication: attentionNotPublication,
    four_photo_layers_distinct: fourLayersRemainDistinct,
    experimental_space_preserved: experimentalSpacePreserved,
    photo_observations_remain_questions: observationsRemainQuestions,
    collective_agency_and_absence_preserved: collectiveAgencyAndAbsencePreserved,
    public_notebook_has_no_private_payload: publicNotebookContainsNoPrivatePayload,
    photo_encounters_are_additive: encounterHistoryIsAdditive,
    photo_publication_gates_human: publicationGatesRemainHuman,
    no_public_photo_route: noPublicPhotoRoute,
    photo_rfp_boundary_preserved: rfpBoundaryPreserved,
    photo_source_non_mutation_preserved: nextPassDoesNotMutateSource
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      blockingCriteria: Object.keys(checks).length,
      humanGates: manifest.humanGates.length,
      governedRecords: 2
    }
  };
}
