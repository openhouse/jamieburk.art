#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  compileAtlas,
  defaultRepoRoot,
  evaluateAtlas,
  loadIntegrationManifest
} from "../src/corpus.mjs";
import {
  buildFeatureEvalKnowledge,
  loadFeatureEvalKnowledge,
  readFeatureEvalArtifact,
  verifyFeatureEvalHistory,
  verifyFeatureEvalSourceArtifacts
} from "../src/integration.mjs";
import { createAtlasService } from "../src/service.mjs";
import { findDeprecatedKnowledgeBankImports } from "../src/deprecation.mjs";
import {
  findAtlasRecord,
  loadAtlasRecordStore
} from "../src/records.mjs";

const [command = "check", ...args] = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};
const generatedPath = path.join(defaultRepoRoot, "docs/atlas/generated/atlas.graph.json");
const sourceCatalogPath = path.join(defaultRepoRoot, "docs/atlas/generated/feature-evals-knowledge.json");
const recordStorePath = path.join(defaultRepoRoot, "docs/atlas/records/canonical.json");

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function printEvaluation(evaluation) {
  for (const result of evaluation.results) {
    console.log(`${result.passed ? "PASS" : result.kind === "hard-gate" ? "FAIL" : "GAP "} ${result.id}: ${result.observed}`);
  }
  console.log(`Summary: ${evaluation.summary.hardGateFailures}/${evaluation.summary.hardGateTotal} hard gates failing; ${evaluation.summary.qualityTargetGaps}/${evaluation.summary.qualityTargetTotal} quality targets open.`);
  console.log(`Candidate: ${evaluation.candidateFingerprint}`);
}

try {
  if (command === "migrate-legacy") {
    const { buildLegacyMigrationStore } = await import("../src/legacy.mjs");
    const store = buildLegacyMigrationStore();
    mkdirSync(path.dirname(recordStorePath), { recursive: true });
    writeFileSync(recordStorePath, stableJson(store));
    console.log(`Wrote ${path.relative(defaultRepoRoot, recordStorePath)}`);
    console.log(`Migrated ${Object.values(store.counts).reduce((sum, count) => sum + count, 0)} complete canonical records into Atlas.`);
    process.exit(0);
  }
  if (command === "verify-legacy") {
    const { verifyLegacyParity } = await import("../src/legacy.mjs");
    const errors = verifyLegacyParity(loadAtlasRecordStore(recordStorePath));
    if (errors.length) throw new Error(errors.join("\n"));
    console.log("Atlas canonical records round-trip exactly to the deprecated legacy stores.");
    process.exit(0);
  }
  if (command === "verify-deprecation") {
    const errors = findDeprecatedKnowledgeBankImports(defaultRepoRoot);
    if (errors.length) throw new Error(`Direct deprecated knowledge-bank imports:\n${errors.join("\n")}`);
    console.log("No consumer imports the deprecated legacy knowledge bank directly.");
    process.exit(0);
  }
  if (command === "refresh-sources") {
    const manifest = loadIntegrationManifest();
    const catalog = buildFeatureEvalKnowledge({ repoRoot: defaultRepoRoot, manifest });
    mkdirSync(path.dirname(sourceCatalogPath), { recursive: true });
    writeFileSync(sourceCatalogPath, stableJson(catalog));
    console.log(`Wrote ${path.relative(defaultRepoRoot, sourceCatalogPath)}`);
    console.log(`Integrated ${catalog.totals.semanticIds} semantic IDs, ${catalog.totals.recordVariants} record variants, ${catalog.totals.documents} documents, and ${catalog.totals.publicUrls} public source locators from ${catalog.totals.branches} branches.`);
    process.exit(0);
  }
  if (command === "verify-sources") {
    const manifest = loadIntegrationManifest();
    const catalog = loadFeatureEvalKnowledge(defaultRepoRoot);
    const errors = verifyFeatureEvalSourceArtifacts({ repoRoot: defaultRepoRoot, catalog, manifest });
    if (errors.length) throw new Error(errors.join("\n"));
    console.log(`Verified ${catalog.totals.artifactMappings} source artifact mappings across ${catalog.totals.branches} immutable branch heads.`);
    process.exit(0);
  }
  if (command === "verify-history") {
    const manifest = loadIntegrationManifest();
    const catalog = loadFeatureEvalKnowledge(defaultRepoRoot);
    const errors = verifyFeatureEvalHistory({ repoRoot: defaultRepoRoot, catalog, manifest });
    if (errors.length) throw new Error(errors.join("\n"));
    console.log(`Verified all ${manifest.branches.length} frozen source commits and ${catalog.totals.uniqueBlobs} full-fidelity blobs are reachable from Atlas.`);
    process.exit(0);
  }
  if (command === "records") {
    const store = loadAtlasRecordStore(recordStorePath);
    const id = valueFor("--id");
    const collection = valueFor("--collection");
    const output = id
      ? findAtlasRecord(id, store)
      : collection
        ? store.records[collection]
        : { counts: store.counts, fingerprint: store.fingerprint };
    if (output === null || output === undefined) throw new Error("Atlas record not found");
    console.log(stableJson(output));
    process.exit(0);
  }
  if (command === "artifact") {
    const branch = valueFor("--branch");
    const artifactPath = valueFor("--path");
    if (!branch || !artifactPath) throw new Error("Use --branch <feature/evals-X> --path <repository-path>");
    const catalog = loadFeatureEvalKnowledge(defaultRepoRoot);
    const artifact = catalog.artifacts.find((entry) => entry.branch === branch && entry.path === artifactPath);
    if (!artifact) throw new Error("Atlas source artifact not found");
    if (args.includes("--content")) {
      process.stdout.write(readFeatureEvalArtifact({ repoRoot: defaultRepoRoot, catalog, branch, artifactPath }));
    } else {
      console.log(stableJson(artifact));
    }
    process.exit(0);
  }
  const compiled = compileAtlas();
  const evaluation = evaluateAtlas(compiled);
  if (command === "generate") {
    mkdirSync(path.dirname(generatedPath), { recursive: true });
    writeFileSync(generatedPath, stableJson(compiled));
    console.log(`Wrote ${path.relative(defaultRepoRoot, generatedPath)}`);
  } else if (command === "compile") {
    console.log(stableJson(compiled));
  } else if (command === "eval") {
    const output = valueFor("--output");
    if (output) {
      const absolute = path.resolve(output);
      mkdirSync(path.dirname(absolute), { recursive: true });
      writeFileSync(absolute, stableJson(evaluation));
    }
    if (args.includes("--json")) console.log(stableJson(evaluation));
    else printEvaluation(evaluation);
  } else if (command === "query") {
    const service = createAtlasService(compiled);
    const result = service.query({
      text: valueFor("--text"),
      kind: valueFor("--kind"),
      tag: valueFor("--tag"),
      projectKey: valueFor("--project")
    });
    console.log(stableJson({ candidateFingerprint: compiled.candidateFingerprint, pages: result }));
  } else if (command === "knowledge") {
    const service = createAtlasService(compiled);
    const result = service.queryKnowledge({
      text: valueFor("--text"),
      id: valueFor("--id"),
      kind: valueFor("--kind"),
      branch: valueFor("--branch")
    });
    console.log(stableJson({ candidateFingerprint: compiled.candidateFingerprint, knowledge: result }));
  } else if (command === "explain") {
    const projectKey = valueFor("--project");
    if (!projectKey) throw new Error("Use --project <project-key>");
    console.log(stableJson(createAtlasService(compiled).explainProject(projectKey)));
  } else if (command === "check") {
    if (evaluation.summary.hardGateFailures || evaluation.summary.qualityTargetGaps) {
      printEvaluation(evaluation);
      process.exit(1);
    }
    const expected = stableJson(compiled);
    const current = readFileSync(generatedPath, "utf8");
    if (current !== expected) {
      console.error("Generated Atlas graph is stale. Run npm run atlas:generate.");
      process.exit(1);
    }
    printEvaluation(evaluation);
    console.log("Generated Atlas graph is current.");
  } else {
    throw new Error(`Unknown Atlas command: ${command}`);
  }
} catch (error) {
  console.error(`Atlas ${command} failed: ${error.message}`);
  process.exit(1);
}
