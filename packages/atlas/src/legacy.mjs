import { knowledgeBank as legacyKnowledgeBank } from "../../../apps/www/src/data/knowledge-bank/records.ts";
import { deprecatedProofClaims as legacyProofClaims } from "../../../apps/www/src/data/proofs.ts";
import { loadIntegrationManifest } from "./corpus.mjs";
import {
  atlasRecordFingerprint,
  createAtlasRecordStore,
  loadAtlasRecordStore
} from "./records.mjs";

export function buildLegacyMigrationStore() {
  const manifest = loadIntegrationManifest();
  return createAtlasRecordStore({ ...legacyKnowledgeBank, proofClaims: legacyProofClaims }, {
    sourceCutAt: manifest.sourceCutAt,
    sourceBranch: manifest.base.branch,
    sourceCommit: manifest.base.commit
  });
}

export function verifyLegacyParity(store = loadAtlasRecordStore()) {
  const errors = [];
  const legacyFingerprint = atlasRecordFingerprint({ ...legacyKnowledgeBank, proofClaims: legacyProofClaims });
  if (store.migratedFrom.legacyFingerprint !== legacyFingerprint) {
    errors.push(`Legacy migration fingerprint mismatch: Atlas ${store.migratedFrom.legacyFingerprint}, legacy ${legacyFingerprint}`);
  }
  for (const [collection, records] of Object.entries(legacyKnowledgeBank)) {
    const atlasById = new Map(store.records[collection].map((record) => [record.id, record]));
    for (const record of records) {
      const migrated = atlasById.get(record.id);
      if (!migrated) errors.push(`Legacy record missing from Atlas: ${collection}/${record.id}`);
      else if (JSON.stringify(migrated) !== JSON.stringify(record)) {
        errors.push(`Legacy record changed during Atlas migration: ${collection}/${record.id}`);
      }
    }
  }
  const atlasProofs = new Map(store.records.proofClaims.map((record) => [record.id, record]));
  for (const proof of legacyProofClaims) {
    const migrated = atlasProofs.get(proof.id);
    if (!migrated) errors.push(`Legacy proof claim missing from Atlas: ${proof.id}`);
    else if (JSON.stringify(migrated) !== JSON.stringify(proof)) {
      errors.push(`Legacy proof claim changed during Atlas migration: ${proof.id}`);
    }
  }
  return errors;
}
