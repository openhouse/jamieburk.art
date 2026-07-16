import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../../apps/www/src/data/knowledge-bank/records.ts";
import {
  compileAtlas,
  defaultRepoRoot,
  loadAtlasPages,
  loadIntegrationManifest,
  selectProjectSlice,
  validateAtlas
} from "../src/corpus.mjs";
import { createAtlasService } from "../src/service.mjs";

const manifest = loadIntegrationManifest();
const pages = loadAtlasPages();

function clonePages() {
  return structuredClone(pages);
}

test("real Atlas corpus compiles as a private semantic graph", () => {
  const compiled = compileAtlas();
  assert.deepEqual(compiled.validation.errors, []);
  assert.equal(compiled.metrics.projectPages, 6);
  assert.equal(compiled.metrics.pages, 10);
  assert.ok(compiled.metrics.relations >= 48);
  assert.match(compiled.candidateFingerprint, /^[a-f0-9]{64}$/);
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

test("complete project slices retain every claim and every linked evidence source", () => {
  for (const page of pages.filter(({ kind }) => kind === "project")) {
    const slice = selectProjectSlice(knowledgeBank, page.canonical);
    const expectedClaims = knowledgeBank.claims.filter(({ project }) => project === page.canonical.projectKey);
    assert.deepEqual(slice.recordIds.claims, expectedClaims.map(({ id }) => id).sort());
    const expectedSources = new Set(expectedClaims.flatMap((claim) => claim.evidence.map(({ sourceId }) => sourceId)));
    for (const sourceId of expectedSources) assert.ok(slice.recordIds.sources.includes(sourceId));
  }
});

test("all fourteen eval branches are explicitly integrated", () => {
  assert.deepEqual(
    manifest.branches.map(({ branch }) => branch).sort(),
    "ABCDEFGHIJKLMN".split("").map((letter) => `feature/evals-${letter}`)
  );
  assert.equal(manifest.base.branch, "feature/evals-E");
});
