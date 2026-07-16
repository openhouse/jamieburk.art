import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const knowledgeBankCollections = Object.freeze([
  "entities",
  "intake",
  "sources",
  "sourceReadings",
  "claims",
  "researchTasks",
  "researchInquiries",
  "projectionDecisions",
  "corrections",
  "pages"
]);
export const atlasRecordCollections = Object.freeze([
  ...knowledgeBankCollections,
  "proofClaims"
]);

export const defaultRecordStorePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../docs/atlas/records/canonical.json"
);

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function atlasRecordFingerprint(records) {
  return hash(JSON.stringify(records));
}

export function createAtlasRecordStore(records, { sourceCutAt, sourceBranch, sourceCommit } = {}) {
  const counts = Object.fromEntries(
    atlasRecordCollections.map((collection) => [collection, records[collection]?.length ?? 0])
  );
  return {
    schemaVersion: 1,
    authority: "atlas-canonical-records",
    deprecationPolicy: {
      legacyKnowledgeBanks: "frozen-reference-only",
      writes: "atlas-only",
      compatibility: "generated-and-parity-checked"
    },
    migratedFrom: {
      sourceCutAt,
      sourceBranch,
      sourceCommit,
      legacyFingerprint: atlasRecordFingerprint(records)
    },
    counts,
    fingerprint: atlasRecordFingerprint(records),
    records
  };
}

export function validateAtlasRecordStore(store) {
  const errors = [];
  if (store?.schemaVersion !== 1) errors.push("Atlas record store requires schemaVersion 1");
  if (store?.authority !== "atlas-canonical-records") errors.push("Atlas record store must declare canonical authority");
  if (store?.deprecationPolicy?.legacyKnowledgeBanks !== "frozen-reference-only") {
    errors.push("Legacy knowledge banks must be frozen reference sources");
  }
  if (!/^[a-f0-9]{64}$/.test(store?.migratedFrom?.legacyFingerprint ?? "")) {
    errors.push("Atlas record store lacks its legacy migration fingerprint");
  }
  for (const collection of atlasRecordCollections) {
    const records = store?.records?.[collection];
    if (!Array.isArray(records)) {
      errors.push(`Atlas record collection ${collection} is missing`);
      continue;
    }
    if (store.counts?.[collection] !== records.length) {
      errors.push(`Atlas record count drift for ${collection}`);
    }
    const ids = records.map(({ id }) => id);
    const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    for (const id of duplicates) errors.push(`Duplicate Atlas record ${collection}/${id}`);
    if (records.some(({ id }) => typeof id !== "string" || !id)) {
      errors.push(`Atlas record collection ${collection} contains a missing identity`);
    }
  }
  const expectedFingerprint = store?.records ? atlasRecordFingerprint(store.records) : null;
  if (store?.fingerprint !== expectedFingerprint) errors.push("Atlas record fingerprint is invalid");
  return errors;
}

export function loadAtlasRecordStore(file = defaultRecordStorePath) {
  const store = JSON.parse(readFileSync(file, "utf8"));
  const errors = validateAtlasRecordStore(store);
  if (errors.length) throw new Error(errors.join("\n"));
  return store;
}

export const atlasRecordStore = existsSync(defaultRecordStorePath)
  ? JSON.parse(readFileSync(defaultRecordStorePath, "utf8"))
  : null;
export const knowledgeBank = atlasRecordStore
  ? Object.fromEntries(knowledgeBankCollections.map((collection) => [collection, atlasRecordStore.records[collection]]))
  : null;

export function findAtlasRecord(id, store = atlasRecordStore) {
  for (const collection of atlasRecordCollections) {
    const record = store.records[collection].find((candidate) => candidate.id === id);
    if (record) return { collection, record };
  }
  return null;
}
