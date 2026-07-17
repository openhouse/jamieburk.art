import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  integrationCatalogFingerprint,
  readFeatureEvalArtifact,
  renderAccessionMigrationReport,
  verifyFeatureEvalHistory,
  verifyFeatureEvalSourceArtifacts
} from "./integration.mjs";
import {
  atlasRecordCollections,
  findAtlasRecord
} from "./records.mjs";
import { validatePortableAtlasSource } from "./portable.mjs";

const dateKeys = new Set([
  "accessedAt",
  "capturedAt",
  "decidedAt",
  "lastReviewed",
  "openedAt",
  "publishedAt",
  "readAt",
  "receivedAt",
  "reviewedAt",
  "runAt"
]);

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

export function loadAtlasEvalContracts(repoRoot) {
  const lineagePath = path.join(repoRoot, "evals/atlas/lineage.json");
  return {
    suite: readJson(repoRoot, "evals/atlas/suite.json"),
    tasks: readJson(repoRoot, "evals/atlas/tasks.json"),
    humanAssessment: readJson(repoRoot, "evals/atlas/human-assessment.latest.json"),
    ontology: readJson(repoRoot, "docs/atlas/ontology.json"),
    dispositions: readJson(repoRoot, "docs/atlas/record-dispositions.json"),
    variantPolicy: readJson(repoRoot, "docs/atlas/variant-policy.json"),
    migrationPolicy: readJson(repoRoot, "docs/atlas/accession-migration-policy.json"),
    lineage: existsSync(lineagePath) ? JSON.parse(readFileSync(lineagePath, "utf8")) : null
  };
}

export function atlasEvalContractFingerprint(repoRoot) {
  const files = [
    "docs/atlas/ontology.json",
    "docs/atlas/accession-migration-policy.json",
    "docs/atlas/record-dispositions.json",
    "docs/atlas/variant-policy.json",
    "evals/atlas/human-judge.md",
    "evals/atlas/suite.json",
    "evals/atlas/tasks.json"
  ];
  return hash(JSON.stringify(files.map((file) => [file, readFileSync(path.join(repoRoot, file), "utf8")])));
}

export function validateAtlasEvalContracts(contracts) {
  const errors = [];
  const { suite, humanAssessment, ontology, dispositions, variantPolicy, migrationPolicy, tasks } = contracts;
  if (suite.schemaVersion !== 1 || suite.id !== "atlas-situated-knowledge-universe") {
    errors.push("Atlas eval suite identity is invalid");
  }
  const ids = suite.evaluations.map(({ id }) => id);
  for (const id of ids.filter((id, index) => ids.indexOf(id) !== index)) {
    errors.push(`Duplicate Atlas eval ID ${id}`);
  }
  if (!suite.objectiveOrder?.length || suite.antiGaming?.length < 5) {
    errors.push("Atlas eval suite lacks its objective order or anti-gaming contract");
  }
  const humanIds = suite.evaluations.filter(({ kind }) => kind === "human-gate").map(({ id }) => id).sort();
  const assessmentIds = humanAssessment.criteria.map(({ id }) => id).sort();
  if (humanAssessment.suiteId !== suite.id || humanAssessment.suiteVersion !== suite.version) {
    errors.push("Atlas human assessment is not bound to the active suite");
  }
  if (JSON.stringify(humanIds) !== JSON.stringify(assessmentIds)) {
    errors.push("Atlas human assessment criteria do not match the suite");
  }
  if (ontology.schemaVersion !== 1 || !Object.keys(ontology.predicates ?? {}).length) {
    errors.push("Atlas ontology contract is invalid");
  }
  if (dispositions.schemaVersion !== 1 || variantPolicy.schemaVersion !== 1) {
    errors.push("Atlas disposition or variant policy is invalid");
  }
  if (migrationPolicy.schemaVersion !== 1 || migrationPolicy.id !== "atlas-accession-exit" || migrationPolicy.antiGaming?.length < 7) {
    errors.push("Atlas accession migration policy is invalid");
  }
  if (tasks.schemaVersion !== 1 || tasks.tasks?.length < 5) {
    errors.push("Atlas grounded task set is incomplete");
  }
  return errors;
}

function result(id, kind, errors, observed, evidence = []) {
  return {
    id,
    kind,
    passed: errors.length === 0,
    observed: errors.length ? `${errors.length} defect(s)` : observed,
    evidence: errors.length ? errors : evidence
  };
}

function temporalErrors(records) {
  const errors = [];
  function visit(value, location) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${location}[${index}]`));
      return;
    }
    if (!value || typeof value !== "object") return;
    for (const [key, nested] of Object.entries(value)) {
      const nestedLocation = `${location}.${key}`;
      if (dateKeys.has(key)) {
        if (typeof nested !== "string" || !/^\d{4}(?:-\d{2}(?:-\d{2}(?:T[^\s]+)?)?)?$/.test(nested) || Number.isNaN(Date.parse(nested))) {
          errors.push(`Invalid temporal value at ${nestedLocation}`);
        }
      }
      visit(nested, nestedLocation);
    }
  }
  visit(records, "records");
  return errors;
}

function recordDispositionErrors({ recordStore, dispositions, compiled }) {
  const errors = [];
  const declared = Object.keys(dispositions.collections ?? {}).sort();
  if (JSON.stringify(declared) !== JSON.stringify([...atlasRecordCollections].sort())) {
    errors.push("Record disposition policy does not cover every Atlas collection");
  }
  for (const collection of atlasRecordCollections) {
    const policy = dispositions.collections?.[collection];
    if (!policy || !dispositions.allowedDispositions.includes(policy.disposition)) continue;
    for (const record of recordStore.records[collection]) {
      const address = dispositions.addressTemplate
        .replace("{collection}", collection)
        .replace("{id}", record.id);
      if (!address.startsWith(`atlas://records/${collection}/`) || !findAtlasRecord(record.id, recordStore)) {
        errors.push(`Record is not addressable: ${collection}/${record.id}`);
      }
    }
    if (policy?.projectCoverageRequired && compiled.metrics.canonicalCoverage[collection] !== recordStore.counts[collection]) {
      errors.push(`Project coverage is incomplete for ${collection}`);
    }
  }
  return errors;
}

function variantErrors({ catalog, variantPolicy }) {
  const errors = [];
  const semanticIds = new Set(catalog.semanticRecords.map(({ id }) => id));
  for (const variant of catalog.recordVariants) {
    if (!/^[a-f0-9]{64}$/.test(variant.digest ?? "")) errors.push(`Variant ${variant.id} lacks a digest`);
    if (!variant.branches?.length || !variant.locations?.length) errors.push(`Variant ${variant.id} lacks provenance`);
    if (!semanticIds.has(variant.id)) errors.push(`Variant ${variant.id} lacks a semantic identity`);
  }
  if (variantPolicy.silentFieldMerge !== "prohibited" || !variantPolicy.defaultDisposition) {
    errors.push("Variant policy permits a silent or undispositioned merge");
  }
  return errors;
}

function correctionErrors(records) {
  const errors = [];
  const claims = new Map(records.claims.map((claim) => [claim.id, claim]));
  const activeProjectionText = records.claims
    .flatMap((claim) => claim.projections ?? [])
    .filter(({ status }) => status === "active")
    .map(({ text }) => text)
    .join("\n")
    .toLowerCase();
  for (const correction of records.corrections) {
    if (!claims.has(correction.claimId)) errors.push(`Correction ${correction.id} points to an unknown claim`);
    if (correction.status !== "active") errors.push(`Correction ${correction.id} is not active`);
    if (!correction.previousText || !correction.replacementText || correction.previousText === correction.replacementText) {
      errors.push(`Correction ${correction.id} lacks a meaningful replacement`);
    }
    if (activeProjectionText.includes(correction.previousText.toLowerCase())) {
      errors.push(`Retired correction wording remains projected: ${correction.id}`);
    }
  }
  return errors;
}

function epistemicErrors(records) {
  const errors = [];
  const requiredComposition = ["action", "intendedEnd", "usableResult", "audience", "collectiveCredit", "causalBoundary"];
  for (const claim of records.claims) {
    const active = (claim.projections ?? []).filter(({ status }) => status === "active");
    if (!active.length) continue;
    if (claim.maturity !== "projected") errors.push(`Active claim is not projected: ${claim.id}`);
    if (!claim.evidence?.length) errors.push(`Active claim lacks evidence: ${claim.id}`);
    for (const key of requiredComposition) {
      if (!claim.composition?.[key]) errors.push(`Active claim lacks ${key}: ${claim.id}`);
    }
    if (!claim.boundaries?.length && !claim.antiClaims?.length) {
      errors.push(`Active claim lacks an epistemic boundary: ${claim.id}`);
    }
  }
  for (const proof of records.proofClaims) {
    if (proof.status === "pending" && !proof.surfaces.includes("internal-only")) {
      errors.push(`Pending proof is exposed beyond internal-only: ${proof.id}`);
    }
    if (["careful", "pending"].includes(proof.status) && !proof.guardrail) {
      errors.push(`Bounded proof lacks a guardrail: ${proof.id}`);
    }
  }
  return errors;
}

function negativeKnowledgeErrors(records) {
  const errors = [];
  for (const inquiry of records.researchInquiries.filter(({ resultStatus }) => resultStatus === "not-recovered")) {
    const text = [...(inquiry.findings ?? []), ...(inquiry.limitations ?? [])].join(" ");
    if (/\b(?:did not|never) exist(?:ed)?\b/i.test(text)) {
      errors.push(`Non-recovery became a nonexistence claim: ${inquiry.id}`);
    }
    if (!/not proof|not establish|cannot|incomplete|without|unavailable|unrecovered/i.test((inquiry.limitations ?? []).join(" "))) {
      errors.push(`Non-recovery lacks an explicit scope limitation: ${inquiry.id}`);
    }
  }
  return errors;
}

function datasetErrors(catalog) {
  const errors = [];
  const expected = {
    artifactMappings: catalog.artifacts.length,
    fullFidelityArtifacts: catalog.artifacts.length,
    uniqueBlobs: new Set(catalog.artifacts.map(({ blob }) => blob)).size,
    semanticIds: new Set(catalog.semanticRecords.map(({ id }) => id)).size,
    recordVariants: catalog.recordVariants.length,
    documents: catalog.documents.length,
    publicUrls: catalog.sources.public.length,
    protectedLocators: catalog.sources.protected.length
  };
  for (const [key, count] of Object.entries(expected)) {
    if (catalog.totals[key] !== count) errors.push(`Catalog total ${key} is ${catalog.totals[key]}, expected ${count}`);
  }
  if (integrationCatalogFingerprint(catalog) !== catalog.catalogFingerprint) {
    errors.push("Catalog fingerprint does not reproduce");
  }
  return errors;
}

export function validateMediaManifest(manifest) {
  const errors = [];
  for (const asset of manifest.assets ?? []) {
    for (const key of ["path", "sourceUrl", "capturedAt", "caption", "rightsBasis", "rightsReviewStatus", "consentStatus"]) {
      if (!asset[key]) errors.push(`Displayed media lacks ${key}: ${asset.path ?? "unknown"}`);
    }
  }
  if (!/does not complete/i.test(manifest.rule ?? "")) {
    errors.push("Media provenance manifest could be mistaken for human rights approval");
  }
  return errors;
}

function mediaErrors(repoRoot) {
  return validateMediaManifest(readJson(repoRoot, "docs/knowledge-bank/media-provenance.json"));
}

function protectedKnowledgeErrors({ compiled, catalog }) {
  const errors = [];
  for (const entry of catalog.sources.protected) {
    if (!/^[a-f0-9]{64}$/.test(entry.locatorHash ?? "")) errors.push("Protected locator lacks a SHA-256 identity");
    if (["url", "locator", "raw", "value"].some((key) => key in entry)) {
      errors.push(`Protected locator ${entry.locatorHash ?? "unknown"} exposes its value`);
    }
  }
  const pageText = JSON.stringify(compiled.pages);
  for (const pattern of [/\/Users\//i, /\/Volumes\//i, /Mobile Documents\/com~apple~CloudDocs/i, /[?&](?:token|signature|sig|key)=/i]) {
    if (pattern.test(pageText)) errors.push(`Semantic page projection matches protected pattern ${pattern}`);
  }
  return errors;
}

function collectiveCreditErrors({ recordStore, compiled }) {
  const errors = [];
  for (const stakeholder of compiled.stakeholderCredits) {
    if (!stakeholder.credit || !stakeholder.boundary) errors.push(`Stakeholder lacks credit boundary: ${stakeholder.name}`);
  }
  for (const claim of recordStore.records.claims) {
    if ((claim.projections ?? []).some(({ status }) => status === "active")) {
      if (!claim.composition?.collectiveCredit) errors.push(`Projected claim lacks collective credit: ${claim.id}`);
      if (!claim.composition?.causalBoundary) errors.push(`Projected claim lacks a causal boundary: ${claim.id}`);
    }
  }
  return errors;
}

function ontologyErrors({ ontology, compiled }) {
  const errors = [];
  for (const [predicate, definition] of Object.entries(ontology.predicates ?? {})) {
    const inverse = ontology.predicates[definition.inverse];
    if (!inverse || inverse.inverse !== predicate) errors.push(`Ontology inverse is not reciprocal: ${predicate}`);
    if (definition.symmetric && definition.inverse !== predicate) errors.push(`Symmetric predicate has a distinct inverse: ${predicate}`);
  }
  for (const page of compiled.pages) {
    for (const relation of page.relations) {
      if (!ontology.predicates[relation.predicate]) errors.push(`Page uses unknown ontology predicate: ${relation.predicate}`);
    }
  }
  if (ontology.compatibility?.removedPredicates !== "migration-required") {
    errors.push("Ontology does not require migrations for removed predicates");
  }
  return errors;
}

function navigationErrors(compiled) {
  const errors = [];
  const incoming = new Map(compiled.pages.map(({ id }) => [id, 0]));
  const names = new Map();
  for (const page of compiled.pages) {
    for (const relation of page.relations) incoming.set(relation.target, (incoming.get(relation.target) ?? 0) + 1);
    for (const value of [page.slug, page.title, ...page.aliases]) {
      const key = value.toLowerCase();
      if (names.has(key) && names.get(key) !== page.id) errors.push(`Ambiguous Atlas name ${value}`);
      else names.set(key, page.id);
    }
  }
  for (const page of compiled.pages) {
    if (!page.relations.length) errors.push(`Atlas page has no outgoing neighborhood: ${page.id}`);
    if (!incoming.get(page.id)) errors.push(`Atlas page has no backlinks: ${page.id}`);
  }
  return errors;
}

function accessionMigrationErrors({ repoRoot, catalog, manifest, policy, tasks }) {
  const errors = {
    census: [],
    dispositions: [],
    exclusivity: [],
    forms: [],
    fields: [],
    propositions: [],
    variants: [],
    evaluations: [],
    procedures: [],
    datasets: [],
    narratives: [],
    credit: [],
    corrections: [],
    provenance: [],
    fixity: [],
    consumers: [],
    changeset: []
  };
  const artifactsByLocation = new Map(catalog.artifacts.map((artifact) => [`${artifact.branch}:${artifact.path}`, artifact]));
  const sourceObjects = new Map((catalog.sourceObjects ?? []).map((source) => [source.id, source]));
  const supportedExtensions = new Set(policy.supportedExtensions ?? []);
  const supportedClasses = new Set(policy.knowledgeClasses ?? []);
  const targetPrefixes = policy.nativeTargetPrefixes ?? [];
  const expectedBranches = new Set(manifest.branches.map(({ branch }) => branch));
  const observedBranches = new Set(catalog.artifacts.map(({ branch }) => branch));

  if (catalog.totals.artifactMappings !== catalog.artifacts.length) errors.census.push("Artifact association census drifted");
  errors.census.push(...verifyFeatureEvalSourceArtifacts({ repoRoot, catalog, manifest }));
  if (catalog.totals.nativeSourceObjects !== sourceObjects.size) errors.census.push("Native source-object census drifted");
  for (const branch of expectedBranches) if (!observedBranches.has(branch)) errors.census.push(`Accession branch is absent: ${branch}`);

  for (const artifact of catalog.artifacts) {
    const location = `${artifact.branch}:${artifact.path}`;
    const profileTarget = `atlas://source-profiles/sha256/${artifact.sha256}`;
    for (const field of policy.requiredArtifactFields ?? []) {
      if (artifact[field] === undefined || artifact[field] === null) errors.fields.push(`${location} lacks ${field}`);
    }
    for (const field of policy.requiredMigrationFields ?? []) {
      if (artifact.migration?.[field] === undefined || artifact.migration?.[field] === null) errors.fields.push(`${location} migration lacks ${field}`);
    }
    if (artifact.migration?.status !== "native" || artifact.migration?.residualKnowledge !== "none-known") {
      errors.dispositions.push(`${location} is not closed as native with no known residual`);
    }
    if (!artifact.migration?.nativeTargets?.includes(artifact.sourceObjectId) || !artifact.migration?.nativeTargets?.includes(profileTarget)) {
      errors.dispositions.push(`${location} lacks both native object and structural-profile targets`);
    }
    if (artifact.contentAddress !== artifact.sourceObjectId || /git-(?:blob|tree|commit):/.test(artifact.contentAddress ?? "")) {
      errors.exclusivity.push(`${location} still uses an accession association as its content address`);
    }
    const extension = path.extname(artifact.path).toLowerCase();
    if (!supportedExtensions.has(extension)) errors.forms.push(`${location} has unsupported format ${extension || "(none)"}`);
    if (!artifact.knowledgeClasses?.length) errors.forms.push(`${location} has no knowledge class`);
    for (const knowledgeClass of artifact.knowledgeClasses ?? []) {
      if (!supportedClasses.has(knowledgeClass)) errors.forms.push(`${location} has unsupported knowledge class ${knowledgeClass}`);
    }
    for (const target of artifact.migration?.nativeTargets ?? []) {
      if (!targetPrefixes.some((prefix) => target.startsWith(prefix))) errors.fields.push(`${location} has unsupported native target ${target}`);
    }
    if (artifact.kind === "evaluation" && !artifact.migration?.nativeTargets?.includes(`atlas://source-evaluations/sha256/${artifact.sha256}`)) {
      errors.evaluations.push(`${location} lacks a native situated-evaluation target`);
    }
    if (artifact.kind === "knowledge-tooling" && !artifact.migration?.nativeTargets?.includes(`atlas://procedures/sha256/${artifact.sha256}`)) {
      errors.procedures.push(`${location} lacks a native procedural target`);
    }
    if (artifact.kind === "source-corpus" && !artifact.migration?.nativeTargets?.includes(`atlas://datasets/sha256/${artifact.sha256}`)) {
      errors.datasets.push(`${location} lacks a native dataset target`);
    }
    if (artifact.kind === "knowledge-document" && !artifact.migration?.nativeTargets?.includes(`atlas://narratives/sha256/${artifact.sha256}`)) {
      errors.narratives.push(`${location} lacks a native narrative target`);
    }

    const sourceObject = sourceObjects.get(artifact.sourceObjectId);
    if (!sourceObject) errors.fixity.push(`${location} points to a missing native source object`);
    else {
      if (sourceObject.id !== `atlas://source-objects/sha256/${sourceObject.sha256}` || !/^[a-f0-9]{64}$/.test(sourceObject.sha256)) {
        errors.fixity.push(`${location} has an invalid native source-object identity`);
      }
      if (sourceObject.bytes !== artifact.bytes || sourceObject.sha256 !== artifact.sha256) errors.fixity.push(`${location} source-object fixity metadata drifted`);
      if (!sourceObject.profile?.extension || !sourceObject.profile?.mediaType || !Number.isInteger(sourceObject.profile?.lines)) {
        errors.forms.push(`${location} lacks a format-aware structural profile`);
      }
      if (!sourceObject.accessionLocations?.includes(location)) errors.provenance.push(`${location} is absent from source-object provenance`);
      if (!sourceObject.historicalGitBlobs?.includes(artifact.blob)) errors.provenance.push(`${location} omits historical Git-blob provenance`);
    }
  }

  const requireLocationTarget = (entries, targetFor, bucket) => {
    for (const entry of entries) {
      const target = targetFor(entry);
      if (entry.address !== target) bucket.push(`${entry.id ?? entry.title ?? "entry"} lacks its deterministic native address`);
      for (const location of entry.locations ?? []) {
        const artifact = artifactsByLocation.get(location);
        if (!artifact) bucket.push(`${location} does not resolve to an accession disposition for ${target}`);
      }
    }
  };
  requireLocationTarget(catalog.semanticRecords, ({ id }) => `atlas://semantic-records/${encodeURIComponent(id)}`, errors.propositions);
  requireLocationTarget(catalog.recordVariants, ({ id, digest }) => `atlas://record-variants/${encodeURIComponent(`${id}/${digest}`)}`, errors.variants);
  requireLocationTarget(catalog.stakeholders, ({ id, label }) => `atlas://stakeholders/${encodeURIComponent(`${id}/${label}`)}`, errors.credit);
  requireLocationTarget(
    catalog.semanticRecords.filter(({ id }) => /^(?:COR|DEC)-/.test(id)),
    ({ id }) => `atlas://semantic-records/${encodeURIComponent(id)}`,
    errors.corrections
  );

  for (const sourceObject of sourceObjects.values()) {
    if (!sourceObject.accessionLocations?.length || !sourceObject.nativeTargets?.includes(sourceObject.id)) {
      errors.provenance.push(`${sourceObject.id} lacks closed provenance or native self-address`);
    }
    for (const location of sourceObject.accessionLocations ?? []) {
      if (!artifactsByLocation.has(location)) errors.provenance.push(`${sourceObject.id} cites unknown accession location ${location}`);
    }
    const situatedArtifacts = (sourceObject.accessionLocations ?? []).map((location) => artifactsByLocation.get(location)).filter(Boolean);
    const expectedClasses = [...new Set(situatedArtifacts.flatMap(({ knowledgeClasses }) => knowledgeClasses))].sort();
    const expectedTargets = [...new Set(situatedArtifacts.flatMap(({ migration }) => migration.nativeTargets))].sort();
    if (JSON.stringify(sourceObject.knowledgeClasses) !== JSON.stringify(expectedClasses)) {
      errors.provenance.push(`${sourceObject.id} collapses a situated knowledge class`);
    }
    if (JSON.stringify(sourceObject.nativeTargets) !== JSON.stringify(expectedTargets)) {
      errors.provenance.push(`${sourceObject.id} collapses a situated native target`);
    }
  }
  if ((tasks.tasks ?? []).some(({ operation }) => operation === "artifact")) {
    errors.consumers.push("A grounded task still reads knowledge through a branch/path accession association");
  }
  if (!(tasks.tasks ?? []).some(({ operation }) => operation === "source-object")) {
    errors.consumers.push("No grounded task proves native source-object retrieval");
  }
  const reportPath = path.join(repoRoot, "docs/atlas/generated/accession-migration-report.md");
  if (!existsSync(reportPath)) errors.changeset.push("Human-readable accession migration report is missing");
  else if (readFileSync(reportPath, "utf8") !== renderAccessionMigrationReport(catalog)) {
    errors.changeset.push("Human-readable accession migration report is stale");
  }
  return errors;
}

export function evaluateGroundedTasks({ taskSet, compiled, recordStore, catalog, repoRoot }) {
  const failures = [];
  for (const task of taskSet.tasks) {
    try {
      if (task.operation === "record") {
        const found = findAtlasRecord(task.input.id, recordStore);
        if (!found || found.collection !== task.expect.collection) throw new Error("wrong or missing collection");
        if (!JSON.stringify(found.record).toLowerCase().includes(task.expect.contains.toLowerCase())) throw new Error("expected content missing");
      } else if (task.operation === "project") {
        const page = compiled.pages.find(({ canonical }) => canonical?.projectKey === task.input.projectKey);
        if (!page || page.id !== task.expect.pageId) throw new Error("project page missing");
        if (page.canonical.slice.counts.claims < task.expect.minimumClaims) throw new Error("project claim slice is too small");
      } else if (task.operation === "source-dossier") {
        const dossier = compiled.sourceDossiers.find(({ id }) => id === task.input.id);
        if (!dossier) throw new Error("source dossier missing");
        if (dossier.source.id !== task.expect.sourceId || dossier.artifact.id !== task.expect.artifactId) {
          throw new Error("source or artifact identity drifted");
        }
        if (dossier.observations.length < task.expect.minimumObservations || dossier.claims.length < task.expect.minimumClaims) {
          throw new Error("source dossier knowledge depth is incomplete");
        }
      } else if (task.operation === "artifact") {
        const content = readFeatureEvalArtifact({
          repoRoot,
          catalog,
          branch: task.input.branch,
          artifactPath: task.input.path,
          encoding: "utf8"
        });
        if (!content.includes(task.expect.contains)) throw new Error("artifact expectation failed");
      } else if (task.operation === "source-object") {
        const sourceObject = catalog.sourceObjects.find(({ id }) => id === task.input.id);
        if (!sourceObject) throw new Error("native source object missing");
        const artifact = catalog.artifacts.find(({ sourceObjectId }) => sourceObjectId === sourceObject.id);
        if (!artifact) throw new Error("source object lacks accession provenance for materialization");
        const content = readFeatureEvalArtifact({
          repoRoot,
          catalog,
          branch: artifact.branch,
          artifactPath: artifact.path,
          encoding: "utf8"
        });
        if (hash(content) !== sourceObject.sha256) throw new Error("native source-object fixity failed");
        if (!content.includes(task.expect.contains)) throw new Error("source-object expectation failed");
      } else {
        throw new Error(`unknown operation ${task.operation}`);
      }
    } catch (error) {
      failures.push(`${task.id}: ${error.message}`);
    }
  }
  return failures;
}

export function evaluateAdvancedAtlas({ repoRoot, compiled, recordStore, catalog, manifest, contracts }) {
  const portable = validatePortableAtlasSource({ repoRoot, compiled, catalog });
  const history = verifyFeatureEvalHistory({ repoRoot, catalog, manifest });
  const dispositions = recordDispositionErrors({ recordStore, dispositions: contracts.dispositions, compiled });
  const variants = variantErrors({ catalog, variantPolicy: contracts.variantPolicy });
  const temporal = temporalErrors(recordStore.records);
  const corrections = correctionErrors(recordStore.records);
  const epistemic = epistemicErrors(recordStore.records);
  const negative = negativeKnowledgeErrors(recordStore.records);
  const datasets = datasetErrors(catalog);
  const media = mediaErrors(repoRoot);
  const protectedErrors = protectedKnowledgeErrors({ compiled, catalog });
  const credit = collectiveCreditErrors({ recordStore, compiled });
  const ontology = ontologyErrors({ ontology: contracts.ontology, compiled });
  const navigation = navigationErrors(compiled);
  const tasks = evaluateGroundedTasks({ taskSet: contracts.tasks, compiled, recordStore, catalog, repoRoot });
  const migration = accessionMigrationErrors({
    repoRoot,
    catalog,
    manifest,
    policy: contracts.migrationPolicy,
    tasks: contracts.tasks
  });
  const contractErrors = validateAtlasEvalContracts(contracts);
  const latestRun = contracts.lineage?.runs?.at(-1);
  const lineageErrors = [...contractErrors];
  if (!latestRun) lineageErrors.push("Atlas eval lineage has no recorded run");
  else {
    if (latestRun.status !== "accepted") lineageErrors.push("Atlas eval lineage run is not accepted");
    if (latestRun.candidateFingerprint !== compiled.candidateFingerprint) lineageErrors.push("Atlas eval lineage is stale");
    if (latestRun.suiteVersion !== contracts.suite.version) lineageErrors.push("Atlas eval lineage suite version is stale");
    if (JSON.stringify(latestRun.inputs) !== JSON.stringify(compiled.inputs)) lineageErrors.push("Atlas eval lineage input binding is stale");
    if (!latestRun.mutations?.length) lineageErrors.push("Atlas eval lineage lacks mutation evidence");
  }
  const navigable = compiled.pages.length - navigation.filter((message) => /no outgoing|no backlinks/.test(message)).length;
  const results = [
    result("portable-export-closure", "hard-gate", portable.errors, `${portable.manifest?.totals.files ?? 0} files and ${portable.manifest?.totals.nativeSourceObjects ?? 0} native source objects close`),
    result("branch-independent-recovery", "hard-gate", history, `${manifest.branches.length} commits and ${catalog.totals.uniqueBlobs} blobs reachable`),
    result("record-disposition-completeness", "hard-gate", dispositions, `${Object.values(recordStore.counts).reduce((sum, count) => sum + count, 0)} records dispositioned`),
    result("variant-and-disagreement-ledger", "hard-gate", variants, `${catalog.recordVariants.length} variants retain explicit provenance`),
    result("temporal-integrity", "hard-gate", temporal, "All structured temporal values are valid"),
    result("correction-propagation", "hard-gate", corrections, `${recordStore.records.corrections.length} active corrections remain enforced`),
    result("epistemic-projection-integrity", "hard-gate", epistemic, "Projected claims retain evidence, composition, and boundaries"),
    result("negative-knowledge-integrity", "hard-gate", negative, "Non-recovery remains distinct from nonexistence"),
    result("dataset-reproducibility", "hard-gate", datasets, "Catalog totals and fingerprint reproduce"),
    result("attachment-fixity-and-rights", "hard-gate", media, "Displayed media has provenance and unresolved rights remain human-gated"),
    result("protected-knowledge-inference", "hard-gate", protectedErrors, `${catalog.sources.protected.length} protected locators remain value-free`),
    result("collective-credit-integrity", "hard-gate", credit, `${compiled.stakeholderCredits.length} stakeholder boundaries and projected collective credit retained`),
    result("ontology-backward-compatibility", "hard-gate", ontology, `${Object.keys(contracts.ontology.predicates).length} predicates have migration-safe inverses`),
    result("wiki-navigation-health", "hard-gate", navigation, `${navigable}/${compiled.pages.length} pages have navigable neighborhoods`),
    result("eval-lineage-completeness", "hard-gate", lineageErrors, "Current candidate, inputs, suite, and mutations are recorded"),
    result("clean-room-execution", "hard-gate", portable.errors, "Portable bundle is materializable without Git after export"),
    result("task-grounded-retrieval", "hard-gate", tasks, `${contracts.tasks.tasks.length}/${contracts.tasks.tasks.length} grounded tasks pass`),
    result("accession-source-census-parity", "hard-gate", migration.census, `${catalog.artifacts.length} accession associations reconcile exactly`),
    result("native-migration-disposition-completeness", "hard-gate", migration.dispositions, `${catalog.artifacts.length} artifact dispositions close with no known residual`),
    result("accession-source-exclusivity-zero", "hard-gate", migration.exclusivity, "Accession associations remain provenance only"),
    result("unsupported-knowledge-form-zero", "hard-gate", migration.forms, `${catalog.sourceObjects.length} source objects have supported format-aware profiles`),
    result("semantic-field-disposition-completeness", "hard-gate", migration.fields, "All required migration fields and target protocols are present"),
    result("proposition-evidence-parity", "hard-gate", migration.propositions, `${catalog.semanticRecords.length} semantic identities retain native targets`),
    result("heteroglossic-variant-preservation", "hard-gate", migration.variants, `${catalog.recordVariants.length} record variants remain independently addressed`),
    result("source-eval-knowledge-migration", "hard-gate", migration.evaluations, "Every source evaluation is retained as situated evaluative knowledge"),
    result("procedural-knowledge-operationalization", "hard-gate", migration.procedures, "Every knowledge tool has a native procedure target"),
    result("dataset-structural-parity", "hard-gate", migration.datasets, "Every source corpus has a native dataset target and structural profile"),
    result("dataset-query-equivalence", "hard-gate", [...migration.datasets, ...migration.consumers, ...tasks], "Native source-object retrieval preserves grounded dataset answers"),
    result("narrative-context-fidelity", "hard-gate", migration.narratives, "Every knowledge document has a native narrative target"),
    result("credit-authority-voice-parity", "hard-gate", migration.credit, `${catalog.stakeholders.length} source stakeholder identities retain native targets`),
    result("correction-rejection-lineage-parity", "hard-gate", migration.corrections, "Correction and decision identities retain native lineage"),
    result("migration-privacy-non-expansion", "hard-gate", protectedErrors, "Migration does not expand protected knowledge exposure"),
    result("native-provenance-closure", "hard-gate", migration.provenance, `${catalog.sourceObjects.length} native source objects close over accession provenance`),
    result("native-source-object-fixity", "hard-gate", migration.fixity, `${catalog.sourceObjects.length} SHA-256 source-object identities are internally fixed`),
    result("git-association-independent-execution", "hard-gate", [...portable.errors, ...migration.consumers], "Native source-object consumers and clean-room bundle do not require Git associations"),
    result("consumer-projection-continuity", "hard-gate", [...migration.consumers, ...tasks], `${contracts.tasks.tasks.length} consumers continue through Atlas-native protocols`),
    result("semantic-changeset-completeness", "hard-gate", migration.changeset, "Migration has a current human-readable semantic changeset"),
    result("record-addressability", "quality-target", dispositions, `${Object.values(recordStore.counts).reduce((sum, count) => sum + count, 0)} canonical records addressable`),
    result("variant-provenance-coverage", "quality-target", variants, `${catalog.recordVariants.length}/${catalog.recordVariants.length} variants carry provenance`),
    result("navigable-neighborhood-coverage", "quality-target", navigation, `${navigable}/${compiled.pages.length} pages have incoming and outgoing relations`),
    result("task-scenario-coverage", "quality-target", tasks, `${contracts.tasks.tasks.length - tasks.length}/${contracts.tasks.tasks.length} task scenarios pass`),
    result("migration-knowledge-class-coverage", "quality-target", [...migration.forms, ...migration.fields], `${contracts.migrationPolicy.knowledgeClasses.length} knowledge classes are governed`),
    result("native-target-coverage", "quality-target", migration.dispositions, `${catalog.artifacts.length}/${catalog.artifacts.length} artifacts have object, profile, and component targets`),
    result("accession-reviewability", "quality-target", migration.changeset, "JSON audit ledger and Markdown changeset are current")
  ];
  for (const criterion of contracts.humanAssessment.criteria) {
    results.push({
      id: criterion.id,
      kind: "human-gate",
      passed: criterion.status === "pass" && Boolean(criterion.reviewer),
      status: criterion.status,
      observed: criterion.status === "pending" ? "Pending named human review" : `${criterion.status} by ${criterion.reviewer}`,
      evidence: criterion.evidence
    });
  }
  return results;
}

export function validateAtlasEvalResultSet(suite, results) {
  const expected = suite.evaluations.map(({ id, kind }) => `${kind}:${id}`).sort();
  const observed = results.map(({ id, kind }) => `${kind}:${id}`).sort();
  return JSON.stringify(expected) === JSON.stringify(observed)
    ? []
    : ["Atlas evaluation results do not exactly implement the versioned suite contract"];
}
