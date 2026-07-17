import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { defaultRepoRoot } from "../src/corpus.mjs";
import { atlasSourceDossierSchema } from "../src/schema.mjs";
import {
  loadAtlasSourceDossiers,
  validateAtlasSourceDossier,
  validateAtlasSourceDossiers
} from "../src/source-dossiers.mjs";

const dossierPath = path.join(
  defaultRepoRoot,
  "docs/atlas/sources/kansas-city-star-go-with-the-flow-2007.json"
);
const synthesisPath = path.join(
  defaultRepoRoot,
  "docs/atlas/sources/kansas-city-star-go-with-the-flow-2007.md"
);

test("the Kansas City Star PDF has one Atlas-native source dossier", () => {
  assert.ok(existsSync(dossierPath), "canonical source dossier is missing");
});

test("the Kansas City Star source dossier has a human-readable synthesis page", () => {
  assert.ok(existsSync(synthesisPath), "human-readable synthesis page is missing");
});

const rawDossier = JSON.parse(readFileSync(dossierPath, "utf8"));
const dossiers = loadAtlasSourceDossiers();
const dossier = dossiers.find(({ id }) => id === "ATLAS-SOURCE-KCSTAR-GO-WITH-FLOW-2007");

test("the source dossier is schema-valid, complete, and source-centered", () => {
  assert.equal(atlasSourceDossierSchema.safeParse(rawDossier).success, true);
  assert.ok(dossier);
  assert.deepEqual(validateAtlasSourceDossiers(dossiers, { repoRoot: defaultRepoRoot }), []);
  assert.equal(dossier.source.id, "SRC-WATERWAYS-KC-STAR-2007-11-15");
  assert.equal(dossier.artifact.sourceId, dossier.source.id);
  assert.equal(dossier.artifact.sha256, "8e9821ddccffc062983e3cf38f5a6080a1a5d1ee0cf1d0ff2b38b5ff40b17cd3");
  assert.equal(dossier.artifact.bytes, 2_379_685);
  assert.equal(dossier.observations.length, 50);
  assert.equal(dossier.claims.length, 3);
  assert.equal(dossier.antiClaims.length, 9);
  assert.equal(dossier.sourceLimitations.length, 9);
  assert.equal(dossier.corroboratingSources.length, 3);
});

test("claims, anti-claims, and source limitations remain distinct", () => {
  assert.ok(dossier.claims.every((claim) => !("antiClaims" in claim) && !("limitations" in claim)));
  assert.ok(dossier.antiClaims.every(({ boundedByObservationIds }) => boundedByObservationIds.length));
  assert.ok(dossier.sourceLimitations.every(({ consequence }) => consequence));
});

test("source-dossier mutations fail their intended controls", () => {
  const cases = [
    ["duplicate source", (value) => validateAtlasSourceDossiers([value, structuredClone(value)], { repoRoot: defaultRepoRoot })],
    ["observation loss", (value) => {
      value.observations = value.observations.filter(({ id }) => id !== value.claims[0].supportObservationIds[0]);
      return validateAtlasSourceDossier(value, { repoRoot: defaultRepoRoot });
    }],
    ["claim collapse", (value) => {
      value.claims[0].antiClaims = ["collapsed boundary"];
      return validateAtlasSourceDossier(value, { repoRoot: defaultRepoRoot });
    }],
    ["corroborator alias", (value) => {
      value.corroboratingSources[0].id = value.source.id;
      return validateAtlasSourceDossier(value, { repoRoot: defaultRepoRoot });
    }],
    ["custody exposure", (value) => {
      value.artifact.custody.repositoryCopy = true;
      return validateAtlasSourceDossier(value, { repoRoot: defaultRepoRoot });
    }],
    ["projection bypass", (value) => {
      value.projectionDecisions = [];
      return validateAtlasSourceDossier(value, { repoRoot: defaultRepoRoot });
    }],
    ["self certification", (value) => {
      value.evaluation.independentCertifications[0].status = "pass";
      return validateAtlasSourceDossier(value, { repoRoot: defaultRepoRoot });
    }],
    ["eval evidence loss", (value) => {
      value.evaluation.failuresAndRepairs = [];
      return validateAtlasSourceDossier(value, { repoRoot: defaultRepoRoot });
    }],
    ["deprecated source history", (value) => {
      value.source.branch = "deprecated-source-history";
      return validateAtlasSourceDossier(value, { repoRoot: defaultRepoRoot });
    }],
    ["opaque synthesis", (value) => {
      value.synthesisPage = "docs/atlas/sources/missing.md";
      return validateAtlasSourceDossier(value, { repoRoot: defaultRepoRoot });
    }]
  ];
  for (const [name, mutate] of cases) {
    const errors = mutate(structuredClone(dossier));
    assert.ok(errors.length > 0, `${name} mutation passed`);
  }
  const fixityMutation = structuredClone(dossier);
  fixityMutation.artifact.sha256 = "0".repeat(64);
  assert.notEqual(fixityMutation.artifact.sha256, rawDossier.artifact.sha256);
});

test("the public synthesis contains no deprecated source-history representation", () => {
  const synthesis = readFileSync(synthesisPath, "utf8");
  assert.doesNotMatch(synthesis, /feature\/evals-[A-N]/i);
  assert.doesNotMatch(synthesis, /\b(?:convergence|divergence|branch provenance|ingestion runs?|interpretation records?)\b/i);
});
