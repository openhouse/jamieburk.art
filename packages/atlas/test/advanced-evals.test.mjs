import assert from "node:assert/strict";
import { after, test } from "node:test";
import {
  appendFileSync,
  mkdtempSync,
  readFileSync,
  rmSync
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  evaluateAdvancedAtlas,
  loadAtlasEvalContracts,
  validateAtlasEvalContracts,
  validateAtlasEvalResultSet,
  validateMediaManifest
} from "../src/advanced-evals.mjs";
import {
  compileAtlas,
  defaultRepoRoot,
  evaluateAtlas,
  loadIntegrationManifest
} from "../src/corpus.mjs";
import { loadFeatureEvalKnowledge } from "../src/integration.mjs";
import {
  materializePortableAtlasBundle,
  readPortableAtlasSourceObject,
  verifyPortableAtlasBundle
} from "../src/portable.mjs";
import { atlasRecordStore } from "../src/records.mjs";

const manifest = loadIntegrationManifest();
const catalog = loadFeatureEvalKnowledge(defaultRepoRoot);
const compiled = compileAtlas();
const contracts = loadAtlasEvalContracts(defaultRepoRoot);
const temporaryBundles = [];

after(() => {
  for (const directory of temporaryBundles) rmSync(directory, { recursive: true, force: true });
});

function runAdvanced({
  candidate = compiled,
  records = atlasRecordStore,
  knowledge = catalog,
  contract = contracts
} = {}) {
  return evaluateAdvancedAtlas({
    repoRoot: defaultRepoRoot,
    compiled: candidate,
    recordStore: records,
    catalog: knowledge,
    manifest,
    contracts: contract
  });
}

function evaluation(results, id) {
  return results.find((entry) => entry.id === id);
}

test("Atlas 6.0 implements its complete versioned eval contract", () => {
  assert.deepEqual(validateAtlasEvalContracts(contracts), []);
  const report = evaluateAtlas(compiled);
  assert.deepEqual(validateAtlasEvalResultSet(contracts.suite, report.results), []);
  assert.equal(report.summary.hardGateTotal, 50);
  assert.equal(report.summary.qualityTargetTotal, 12);
  assert.equal(report.summary.humanGateTotal, 6);
});

test("record disposition mutation cannot silently strand a collection", () => {
  const mutated = structuredClone(contracts);
  delete mutated.dispositions.collections.corrections;
  assert.equal(evaluation(runAdvanced({ contract: mutated }), "record-disposition-completeness").passed, false);
});

test("variant provenance mutation cannot orphan a structured identity", () => {
  const mutated = structuredClone(catalog);
  mutated.recordVariants[0].locations = [];
  assert.equal(evaluation(runAdvanced({ knowledge: mutated }), "variant-and-disagreement-ledger").passed, false);
});

test("temporal mutation rejects an unparseable date without inventing precision", () => {
  const mutated = structuredClone(atlasRecordStore);
  mutated.records.intake[0].receivedAt = "sometime later";
  assert.equal(evaluation(runAdvanced({ records: mutated }), "temporal-integrity").passed, false);
});

test("correction mutation cannot revive retired wording", () => {
  const mutated = structuredClone(atlasRecordStore);
  const correction = mutated.records.corrections[0];
  const claim = mutated.records.claims.find(({ id }) => id === correction.claimId);
  const projection = claim.projections.find(({ status }) => status === "active");
  projection.text += ` ${correction.previousText}`;
  assert.equal(evaluation(runAdvanced({ records: mutated }), "correction-propagation").passed, false);
});

test("epistemic mutation cannot project a claim after its evidence is removed", () => {
  const mutated = structuredClone(atlasRecordStore);
  const claim = mutated.records.claims.find(({ projections }) => projections?.some(({ status }) => status === "active"));
  claim.evidence = [];
  assert.equal(evaluation(runAdvanced({ records: mutated }), "epistemic-projection-integrity").passed, false);
});

test("negative-knowledge mutation cannot convert non-recovery into nonexistence", () => {
  const mutated = structuredClone(atlasRecordStore);
  const inquiry = mutated.records.researchInquiries.find(({ resultStatus }) => resultStatus === "not-recovered");
  inquiry.findings.push("The page did not exist.");
  assert.equal(evaluation(runAdvanced({ records: mutated }), "negative-knowledge-integrity").passed, false);
});

test("dataset mutation rejects aggregate and fingerprint drift", () => {
  const mutated = structuredClone(catalog);
  mutated.totals.semanticIds -= 1;
  assert.equal(evaluation(runAdvanced({ knowledge: mutated }), "dataset-reproducibility").passed, false);
});

test("media mutation cannot treat documentation as rights approval", () => {
  const media = JSON.parse(readFileSync(path.join(defaultRepoRoot, "docs/knowledge-bank/media-provenance.json"), "utf8"));
  media.rule = "All media is approved.";
  delete media.assets[0].rightsBasis;
  assert.ok(validateMediaManifest(media).length >= 2);
});

test("protected locator mutation cannot expose a recoverable value", () => {
  const mutated = structuredClone(catalog);
  mutated.sources.protected[0].url = "https://private.example.test/source";
  assert.equal(evaluation(runAdvanced({ knowledge: mutated }), "protected-knowledge-inference").passed, false);
  assert.equal(evaluation(runAdvanced({ knowledge: mutated }), "migration-privacy-non-expansion").passed, false);
});

test("collective-credit mutation cannot erase a stakeholder boundary", () => {
  const mutated = structuredClone(compiled);
  mutated.stakeholderCredits[0].boundary = "";
  assert.equal(evaluation(runAdvanced({ candidate: mutated }), "collective-credit-integrity").passed, false);
});

test("ontology mutation cannot break inverse compatibility", () => {
  const mutated = structuredClone(contracts);
  mutated.ontology.predicates["uses-method"].inverse = "related-to";
  assert.equal(evaluation(runAdvanced({ contract: mutated }), "ontology-backward-compatibility").passed, false);
});

test("navigation mutation cannot create an outbound dead end", () => {
  const mutated = structuredClone(compiled);
  mutated.pages[0].relations = [];
  assert.equal(evaluation(runAdvanced({ candidate: mutated }), "wiki-navigation-health").passed, false);
});

test("eval lineage mutation cannot point at a different candidate", () => {
  const mutated = structuredClone(contracts);
  mutated.lineage.runs.at(-1).candidateFingerprint = "0".repeat(64);
  assert.equal(evaluation(runAdvanced({ contract: mutated }), "eval-lineage-completeness").passed, false);
});

test("grounded task mutation cannot accept the wrong record collection", () => {
  const mutated = structuredClone(contracts);
  mutated.tasks.tasks[0].expect.collection = "entities";
  assert.equal(evaluation(runAdvanced({ contract: mutated }), "task-grounded-retrieval").passed, false);
});

test("an agent cannot self-certify a human gate without a named reviewer", () => {
  const mutated = structuredClone(contracts);
  mutated.humanAssessment.criteria[0].status = "pass";
  mutated.humanAssessment.criteria[0].reviewer = null;
  assert.equal(evaluation(runAdvanced({ contract: mutated }), "social-mechanism-fidelity").passed, false);
});

test("result-set mutation cannot silently drop a declared evaluation", () => {
  const report = evaluateAtlas(compiled);
  const mutated = report.results.slice(1);
  assert.ok(validateAtlasEvalResultSet(contracts.suite, mutated).length > 0);
});

test("portable bundle verifies without Git and detects blob corruption", () => {
  const bundleRoot = mkdtempSync(path.join(tmpdir(), "atlas-portable-eval-"));
  temporaryBundles.push(bundleRoot);
  const bundleManifest = materializePortableAtlasBundle({
    repoRoot: defaultRepoRoot,
    bundleRoot,
    compiled,
    catalog
  });
  assert.deepEqual(verifyPortableAtlasBundle(bundleRoot), []);
  const source = bundleManifest.sourceObjects.find(({ id }) => id === contracts.tasks.tasks.find(({ operation }) => operation === "source-object").input.id);
  assert.match(readPortableAtlasSourceObject(bundleRoot, source.id, "utf8"), /survivingPublicRecords:\s*40/);
  appendFileSync(path.join(bundleRoot, "objects", "sha256", source.sha256), "corruption");
  assert.ok(verifyPortableAtlasBundle(bundleRoot).some((message) => /failed fixity/.test(message)));
  assert.throws(() => readPortableAtlasSourceObject(bundleRoot, source.id), /failed fixity/);
});

test("every accession-exit gate rejects its named mutation", () => {
  const cases = [
    ["accession-source-census-parity", (value) => value.artifacts.shift()],
    ["native-migration-disposition-completeness", (value) => { value.artifacts[0].migration.residualKnowledge = "undispositioned"; }],
    ["accession-source-exclusivity-zero", (value) => { value.artifacts[0].contentAddress = `git-blob:${value.artifacts[0].blob}`; }],
    ["unsupported-knowledge-form-zero", (value) => { value.sourceObjects[0].profile.mediaType = ""; }],
    ["semantic-field-disposition-completeness", (value) => { delete value.artifacts[0].migration.reviewability; }],
    ["proposition-evidence-parity", (value) => {
      const record = value.semanticRecords.find(({ locations }) => locations.length);
      record.address = "atlas://semantic-records/WRONG";
    }],
    ["heteroglossic-variant-preservation", (value) => {
      const record = value.recordVariants.find(({ locations }) => locations.length);
      record.address = "atlas://record-variants/WRONG";
    }],
    ["source-eval-knowledge-migration", (value) => {
      const artifact = value.artifacts.find(({ kind }) => kind === "evaluation");
      artifact.migration.nativeTargets = artifact.migration.nativeTargets.filter((target) => !target.startsWith("atlas://source-evaluations/"));
    }],
    ["procedural-knowledge-operationalization", (value) => {
      const artifact = value.artifacts.find(({ kind }) => kind === "knowledge-tooling");
      artifact.migration.nativeTargets = artifact.migration.nativeTargets.filter((target) => !target.startsWith("atlas://procedures/"));
    }],
    ["dataset-structural-parity", (value) => {
      const artifact = value.artifacts.find(({ kind }) => kind === "source-corpus");
      artifact.migration.nativeTargets = artifact.migration.nativeTargets.filter((target) => !target.startsWith("atlas://datasets/"));
    }],
    ["narrative-context-fidelity", (value) => {
      const artifact = value.artifacts.find(({ kind }) => kind === "knowledge-document");
      artifact.migration.nativeTargets = artifact.migration.nativeTargets.filter((target) => !target.startsWith("atlas://narratives/"));
    }],
    ["credit-authority-voice-parity", (value) => {
      const record = value.stakeholders.find(({ locations }) => locations.length);
      record.address = "atlas://stakeholders/WRONG";
    }],
    ["correction-rejection-lineage-parity", (value) => {
      const record = value.semanticRecords.find(({ id, locations }) => /^(?:COR|DEC)-/.test(id) && locations.length);
      record.address = "atlas://semantic-records/WRONG";
    }],
    ["native-provenance-closure", (value) => { value.sourceObjects[0].knowledgeClasses = []; }],
    ["native-source-object-fixity", (value) => { value.sourceObjects[0].sha256 = "0".repeat(64); }],
    ["dataset-query-equivalence", (_value, contract) => { contract.tasks.tasks.find(({ operation }) => operation === "source-object").operation = "artifact"; }],
    ["git-association-independent-execution", (_value, contract) => { contract.tasks.tasks.find(({ operation }) => operation === "source-object").operation = "artifact"; }],
    ["consumer-projection-continuity", (_value, contract) => { contract.tasks.tasks.find(({ operation }) => operation === "source-object").operation = "artifact"; }],
    ["semantic-changeset-completeness", (value) => { value.artifacts[0].knowledgeClasses.push("knowledge-artifact"); }]
  ];
  for (const [id, mutate] of cases) {
    const knowledge = structuredClone(catalog);
    const contract = structuredClone(contracts);
    mutate(knowledge, contract);
    assert.equal(evaluation(runAdvanced({ knowledge, contract }), id).passed, false, `${id} accepted its named mutation`);
  }
});
