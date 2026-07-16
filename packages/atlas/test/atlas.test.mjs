import assert from "node:assert/strict";
import test from "node:test";
import {
  atlasRecordStore,
  knowledgeBank,
  validateAtlasRecordStore
} from "../src/records.mjs";
import {
  compileAtlas,
  defaultRepoRoot,
  loadAtlasPages,
  loadIntegrationManifest,
  selectProjectSlice,
  validateAtlas
} from "../src/corpus.mjs";
import { createAtlasService } from "../src/service.mjs";
import {
  integrationCatalogFingerprint,
  loadFeatureEvalKnowledge,
  readFeatureEvalArtifact,
  validateFeatureEvalKnowledge,
  verifyFeatureEvalHistory,
  verifyFeatureEvalSourceArtifacts
} from "../src/integration.mjs";
import { findDeprecatedKnowledgeBankImports } from "../src/deprecation.mjs";
import { verifyLegacyParity } from "../src/legacy.mjs";

const manifest = loadIntegrationManifest();
const pages = loadAtlasPages();
const sourceKnowledge = loadFeatureEvalKnowledge(defaultRepoRoot);

function clonePages() {
  return structuredClone(pages);
}

test("real Atlas corpus compiles as a private semantic graph", () => {
  const compiled = compileAtlas();
  assert.deepEqual(compiled.validation.errors, []);
  assert.equal(compiled.metrics.projectPages, 21);
  assert.equal(compiled.metrics.pages, 25);
  assert.ok(compiled.metrics.relations >= 108);
  assert.match(compiled.candidateFingerprint, /^[a-f0-9]{64}$/);
});

test("Atlas owns every complete canonical lifecycle record", () => {
  assert.deepEqual(validateAtlasRecordStore(atlasRecordStore), []);
  assert.equal(atlasRecordStore.authority, "atlas-canonical-records");
  assert.equal(atlasRecordStore.deprecationPolicy.legacyKnowledgeBanks, "frozen-reference-only");
  assert.equal(Object.values(atlasRecordStore.counts).reduce((sum, count) => sum + count, 0), 1044);
  assert.deepEqual(verifyLegacyParity(atlasRecordStore), []);
});

test("canonical record mutation is detected", () => {
  const mutated = structuredClone(atlasRecordStore);
  mutated.records.claims.pop();
  assert.ok(validateAtlasRecordStore(mutated).some((message) => /count drift|fingerprint/i.test(message)));
});

test("future consumers use Atlas rather than the deprecated bank", () => {
  assert.deepEqual(findDeprecatedKnowledgeBankImports(defaultRepoRoot), []);
  const service = createAtlasService(compileAtlas());
  assert.ok(service.recordCollections().includes("claims"));
  assert.equal(service.getRecord("CLM-CALLNYC-INDEPENDENT-FOLLOW-ON").collection, "claims");
  assert.ok(service.queryRecords({ project: "callnyc", collection: "claims" }).length > 0);
});

test("ordinary YAML dates normalize to portable ISO date strings", () => {
  assert.ok(pages.every(({ review }) => /^\d{4}-\d{2}-\d{2}$/.test(review.lastReviewed)));
});

test("query service retrieves and explains the exact CallNYC project slice", () => {
  const compiled = compileAtlas();
  const service = createAtlasService(compiled);
  const result = service.query({ projectKey: "callnyc" });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "ATLAS-PROJECT-CALLNYC");
  const explanation = service.explainProject("callnyc");
  assert.equal(explanation.page.id, "ATLAS-PROJECT-CALLNYC");
  assert.ok(explanation.canonical.slice.counts.claims > 0);
  assert.equal(explanation.candidateFingerprint, compiled.candidateFingerprint);
});

test("candidate fingerprint changes when semantic Markdown changes", () => {
  const baseline = compileAtlas();
  const mutated = clonePages();
  mutated[0].body += "\n\nA controlled semantic mutation.";
  mutated[0].raw += "\nA controlled semantic mutation.\n";
  const candidate = compileAtlas({ pages: mutated });
  assert.notEqual(candidate.candidateFingerprint, baseline.candidateFingerprint);
  assert.equal(candidate.inputs.bankFingerprint, baseline.inputs.bankFingerprint);
  assert.equal(candidate.inputs.implementationFingerprint, baseline.inputs.implementationFingerprint);
});

test("duplicate stable identity is rejected", () => {
  const mutated = clonePages();
  mutated[1].id = mutated[0].id;
  const { errors } = validateAtlas({ pages: mutated, bank: knowledgeBank, manifest, repoRoot: defaultRepoRoot });
  assert.ok(errors.some(({ code, message }) => code === "identity" && message.includes("Duplicate page ID")));
});

test("unknown and non-reciprocal semantic relations are rejected", () => {
  const unknown = clonePages();
  unknown[0].relations[0].target = "ATLAS-MISSING-PAGE";
  assert.ok(validateAtlas({ pages: unknown, bank: knowledgeBank, manifest, repoRoot: defaultRepoRoot }).errors
    .some(({ code }) => code === "relation"));

  const nonReciprocal = clonePages();
  const source = nonReciprocal.find(({ id }) => id === "ATLAS-PROJECT-CALLNYC");
  const target = nonReciprocal.find(({ id }) => id === "ATLAS-METHOD-KNOWLEDGE-LIFECYCLE");
  target.relations = target.relations.filter(({ target: id }) => id !== source.id);
  assert.ok(validateAtlas({ pages: nonReciprocal, bank: knowledgeBank, manifest, repoRoot: defaultRepoRoot }).errors
    .some(({ code, message }) => code === "relation" && message.includes("reciprocal")));
});

test("canonical entity and project mismatches are rejected", () => {
  const mutated = clonePages();
  const callnyc = mutated.find(({ id }) => id === "ATLAS-PROJECT-CALLNYC");
  callnyc.canonical.entityId = "ENT-WOWLIST";
  const { errors } = validateAtlas({ pages: mutated, bank: knowledgeBank, manifest, repoRoot: defaultRepoRoot });
  assert.ok(errors.some(({ code, message }) => code === "canonical" && message.includes("does not own project key")));
});

test("public-safe Markdown rejects local private paths", () => {
  const mutated = clonePages();
  const privatePath = ["", "Users", "example", "private-source"].join("/");
  mutated[0].raw += `\n${privatePath}\n`;
  const { errors } = validateAtlas({ pages: mutated, bank: knowledgeBank, manifest, repoRoot: defaultRepoRoot });
  assert.ok(errors.some(({ code }) => code === "safety"));
});

test("named stakeholder credit cannot disappear from its project page", () => {
  const mutated = clonePages();
  const page = mutated.find(({ id }) => id === "ATLAS-PROJECT-NYC-ARTIST-COALITION");
  page.raw = page.raw.replaceAll("Olympia Kazi", "a coalition participant");
  const { errors } = validateAtlas({ pages: mutated, bank: knowledgeBank, manifest, repoRoot: defaultRepoRoot });
  assert.ok(errors.some(({ code, message }) => code === "stakeholder" && message.includes("Olympia Kazi")));
});

test("complete project slices retain every claim and every linked evidence source", () => {
  for (const page of pages.filter(({ kind }) => kind === "project")) {
    const slice = selectProjectSlice(knowledgeBank, page.canonical);
    const expectedClaims = knowledgeBank.claims.filter(({ project }) => project === page.canonical.projectKey);
    assert.deepEqual(slice.recordIds.claims, expectedClaims.map(({ id }) => id).sort());
    const expectedSources = new Set(expectedClaims.flatMap((claim) => claim.evidence.map(({ sourceId }) => sourceId)));
    for (const sourceId of expectedSources) assert.ok(slice.recordIds.sources.includes(sourceId));
  }
});

test("the authored project universe covers every canonical record collection", () => {
  const compiled = compileAtlas();
  for (const [collection, records] of Object.entries(knowledgeBank).filter(([, value]) => Array.isArray(value))) {
    assert.equal(compiled.metrics.canonicalCoverage[collection], records.length, collection);
  }
});

test("all fourteen eval branches are explicitly integrated", () => {
  assert.deepEqual(
    manifest.branches.map(({ branch }) => branch).sort(),
    "ABCDEFGHIJKLMN".split("").map((letter) => `feature/evals-${letter}`)
  );
  assert.equal(manifest.base.branch, "feature/evals-E");
});

test("the federated catalog binds every branch to its exact source commit", () => {
  assert.deepEqual(validateFeatureEvalKnowledge({ catalog: sourceKnowledge, manifest }), []);
  assert.equal(sourceKnowledge.totals.branches, 14);
  assert.ok(sourceKnowledge.totals.semanticIds >= 5_000);
  assert.ok(sourceKnowledge.totals.recordVariants >= 5_000);
  assert.ok(sourceKnowledge.totals.documents >= 800);
  assert.ok(sourceKnowledge.totals.publicUrls >= 10_000);
  for (const source of manifest.branches) {
    const catalogBranch = sourceKnowledge.branches.find(({ branch }) => branch === source.branch);
    assert.equal(catalogBranch.commit, source.sourceCommit);
    assert.ok(catalogBranch.artifacts > 0);
  }
});

test("catalog omissions and fingerprint drift are rejected", () => {
  const missingBranch = structuredClone(sourceKnowledge);
  missingBranch.branches = missingBranch.branches.filter(({ branch }) => branch !== "feature/evals-N");
  missingBranch.totals.branches -= 1;
  missingBranch.catalogFingerprint = integrationCatalogFingerprint(missingBranch);
  assert.ok(validateFeatureEvalKnowledge({ catalog: missingBranch, manifest })
    .some((message) => message.includes("feature/evals-N")));

  const drifted = structuredClone(sourceKnowledge);
  drifted.semanticRecords.pop();
  assert.ok(validateFeatureEvalKnowledge({ catalog: drifted, manifest })
    .some((message) => message.includes("fingerprint")));
});

test("the committed artifact inventory matches every frozen source tree", () => {
  assert.deepEqual(verifyFeatureEvalSourceArtifacts({
    repoRoot: defaultRepoRoot,
    catalog: sourceKnowledge,
    manifest
  }), []);

  const omitted = structuredClone(sourceKnowledge);
  omitted.artifacts.shift();
  assert.ok(verifyFeatureEvalSourceArtifacts({
    repoRoot: defaultRepoRoot,
    catalog: omitted,
    manifest
  }).some((message) => message.includes("Missing source artifact")));
});

test("full-fidelity source knowledge is reachable without branch refs", () => {
  assert.deepEqual(verifyFeatureEvalHistory({ repoRoot: defaultRepoRoot, catalog: sourceKnowledge, manifest }), []);
  const kPath = "apps/www/src/data/knowledge-bank/dcla-council-bridge.ts";
  const nPath = "apps/www/src/data/knowledge-bank/kcspacesfund-facebook-posts-2026-07.ts";
  assert.match(readFeatureEvalArtifact({ repoRoot: defaultRepoRoot, catalog: sourceKnowledge, branch: "feature/evals-K", artifactPath: kPath, encoding: "utf8" }), /Finkelpearl/);
  assert.match(readFeatureEvalArtifact({ repoRoot: defaultRepoRoot, catalog: sourceKnowledge, branch: "feature/evals-N", artifactPath: nPath, encoding: "utf8" }), /survivingPublicRecords:\s*40/);
});

test("federated knowledge is queryable with provenance and protected locators stay hashed", () => {
  const service = createAtlasService(compileAtlas(), sourceKnowledge);
  const records = service.queryKnowledge({ id: "CLM-WATERWAYS-RAFT-EXPEDITION" });
  assert.ok(records.length > 0);
  assert.ok(records.some(({ branches }) => branches.includes("feature/evals-A")));
  const lineage = service.sourceLineage("CLM-WATERWAYS-RAFT-EXPEDITION");
  assert.ok(lineage.locations.some((location) => location.startsWith("feature/evals-A:")));
  assert.ok(sourceKnowledge.sources.protected.every((entry) =>
    /^[a-f0-9]{64}$/.test(entry.locatorHash) && !("url" in entry)
  ));
  const stakeholderNames = service.stakeholders().map(({ name }) => name);
  assert.ok(stakeholderNames.includes("Rafael Espinal"));
  assert.ok(stakeholderNames.includes("Tom Finkelpearl"));
  assert.ok(stakeholderNames.includes("Olympia Kazi"));
  assert.ok(stakeholderNames.includes("Drew Bolton"));
  assert.ok(stakeholderNames.includes("Julia Fredenburg"));
});
