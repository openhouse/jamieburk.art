#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

function valueFor(flag) {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

const protectedCapturePath = valueFor("--protected-capture");
const protectedCanonicalPath = valueFor("--protected-canonical");
const publicCorpusPath = valueFor("--public-corpus");
const outputPath = valueFor("--output");

if (!protectedCapturePath || !protectedCanonicalPath || !publicCorpusPath || !outputPath) {
  console.error(
    "Usage: node scripts/research/build-kcspacesfund-facebook-acquisition-control.mjs --protected-capture <path> --protected-canonical <path> --public-corpus <path> --output <path>"
  );
  process.exit(2);
}

const protectedCaptureText = readFileSync(protectedCapturePath, "utf8");
const protectedCanonicalText = readFileSync(protectedCanonicalPath, "utf8");
const publicCorpusText = readFileSync(publicCorpusPath, "utf8");
const protectedCapture = JSON.parse(protectedCaptureText);
const protectedCanonical = JSON.parse(protectedCanonicalText);
const publicCorpus = JSON.parse(publicCorpusText);

if (protectedCapture.records.length !== 41) throw new Error("Expected 41 protected render rows");
if (protectedCanonical.records.length !== 37) throw new Error("Expected 37 canonical protected records");
if (publicCorpus.rows.length !== 37) throw new Error("Expected 37 public corpus rows");

const opaqueRenderKey = (renderHash) =>
  sha256(`kcspacesfund-facebook-public-render-v1\0${renderHash}`);

const renderGroups = protectedCanonical.records.map((record, index) => ({
  canonicalRecordHash: publicCorpus.rows[index].recordHash,
  opaqueRenderKeys: record.renderHashes.map(opaqueRenderKey),
}));
const allRenderKeys = renderGroups.flatMap((group) => group.opaqueRenderKeys);
const duplicateGroups = renderGroups.filter((group) => group.opaqueRenderKeys.length > 1);

if (allRenderKeys.length !== 41 || new Set(allRenderKeys).size !== 41) {
  throw new Error("Opaque render keys do not reconcile to 41 unique rows");
}
if (duplicateGroups.length !== 4) throw new Error("Expected four duplicate or alternate render groups");
if (renderGroups.reduce((total, group) => total + group.opaqueRenderKeys.length - 1, 0) !== 4) {
  throw new Error("Expected four excluded duplicate or alternate render variants");
}

const traversalSteps = protectedCapture.segments.flat();
const terminalCheckpoints = traversalSteps.filter((step) => step.i >= 44 && step.i <= 51);
if (
  terminalCheckpoints.length !== 8 ||
  terminalCheckpoints.some(
    (step) =>
      step.total !== 41 ||
      step.height !== 22984 ||
      step.scrollY !== 22183 ||
      step.viewport !== 801 ||
      step.loading !== 0
  )
) {
  throw new Error("Terminal checkpoints do not reconcile to the eight-check stop condition");
}

const output = {
  schemaVersion: 1,
  generatedAt: "2026-07-16",
  derivationVersion: "kcspacesfund-facebook-acquisition-v1",
  protectedInputAttestations: {
    renderCaptureSha256: sha256(protectedCaptureText),
    canonicalCaptureSha256: sha256(protectedCanonicalText),
    protectedInputsPublished: false,
  },
  publicCorpusAttestation: {
    path: path.relative(process.cwd(), publicCorpusPath),
    sha256: sha256(publicCorpusText),
    canonicalRecords: publicCorpus.rows.length,
  },
  reconciliation: {
    renderRows: allRenderKeys.length,
    canonicalRecords: renderGroups.length,
    duplicateOrAlternateRenderVariantsExcluded: 4,
    duplicateOrAlternateGroups: duplicateGroups.length,
    renderGroups,
  },
  terminalControl: {
    scrollIncrementPixels: 500,
    consecutiveStableChecks: terminalCheckpoints.length,
    checkpoints: terminalCheckpoints.map((step) => ({
      step: step.i,
      renderRows: step.total,
      documentHeight: step.height,
      scrollY: step.scrollY,
      viewportHeight: step.viewport,
      loadingIndicators: step.loading,
    })),
  },
  privacy: {
    rawPostTextPublished: false,
    nativePlatformIdsPublished: false,
    mediaIdsPublished: false,
    postedUrlsPublished: false,
    commentTextPublished: false,
    engagerIdentitiesPublished: false,
    authenticationTokensPublished: false,
    sessionDataPublished: false,
    protectedPathsPublished: false,
    renderKeysAreOneWayDomainSeparatedHashes: true,
  },
};

writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(
  `Wrote ${output.reconciliation.renderRows} render keys in ${output.reconciliation.canonicalRecords} canonical groups to ${outputPath}`
);
