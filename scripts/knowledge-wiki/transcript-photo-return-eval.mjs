#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const paths = {
  suite: ".agents/evals/transcript-linked-photo-return.json",
  method:
    "docs/knowledge-bank/methods/transcript-linked-photographic-source-return.md",
  photoSelect:
    "docs/knowledge-bank/sources/tooling/photo-select-curatorial-cascade.md",
  photoFilter:
    "docs/knowledge-bank/sources/tooling/photo-filter-apple-photos-export.md",
  photography: "docs/knowledge-bank/indexes/photography.md",
  testimony: "docs/knowledge-bank/indexes/public-testimony.md"
};

function read(relativePath, overrides = {}) {
  return (
    overrides[relativePath] ??
    fs.readFileSync(path.join(root, relativePath), "utf8")
  );
}

function criterion(id, pass, detail) {
  return { id, pass, detail };
}

function prose(value) {
  return value.replace(/\s+/g, " ").trim();
}

export function evaluateTranscriptPhotoReturn(options = {}) {
  const overrides = options.sourceOverrides ?? {};
  const suite = JSON.parse(read(paths.suite, overrides));
  const method = read(paths.method, overrides);
  const photoSelect = read(paths.photoSelect, overrides);
  const photoFilter = read(paths.photoFilter, overrides);
  const photography = read(paths.photography, overrides);
  const testimony = read(paths.testimony, overrides);
  const methodProse = prose(method);
  const photoSelectProse = prose(photoSelect);
  const photoFilterProse = prose(photoFilter);
  const publicLayer = [
    method,
    photoSelect,
    photoFilter,
    photography,
    testimony
  ].join("\n");

  const privatePattern =
    /\/(?:Users|Volumes|private)\/|Mobile Documents|Library\/CloudStorage|(?:jamie(?:\.burkart)?@(?:gmail\.com|ohai\.us))|\b(?:IMG|DSC|PXL)[-_]?\d{3,}\.(?:jpe?g|heic|png)\b/i;

  const checks = [
    criterion(
      "TRANSCRIPT-PHOTO-001",
      /different sources with different authorities/i.test(methodProse) &&
        /transcript, recording, metadata row, People label, exported filename, select-tree position, and visible photograph/i.test(
          methodProse
        ) &&
        /metadata supports retrieval; it does not establish the event narrative/i.test(
          methodProse
        ) &&
        photoFilterProse.includes(
          "A private People label is a retrieval candidate"
        ),
      "Each trace retains its own evidence authority."
    ),
    criterion(
      "TRANSCRIPT-PHOTO-002",
      /candidate:[\s\S]*corroborated:[\s\S]*confirmed for research:[\s\S]*approved for public naming:/i.test(
        methodProse
      ) &&
        /Do not infer that a visible person is speaking merely because their label and a transcript turn occur near one another/i.test(
          methodProse
        ) &&
        /Exact synchronization, visible speaking evidence, an official record, or human confirmation is required/i.test(
          methodProse
        ),
      "Identity and speaker annotation require explicit evidence escalation."
    ),
    criterion(
      "TRANSCRIPT-PHOTO-003",
      /Deeper `_keep` membership means that a frame survived more rounds/i.test(
        methodProse
      ) &&
        /not an objective quality measure or a mandate for current use/i.test(
          methodProse
        ) &&
        /not an objective aesthetic score, a permanent ranking/i.test(
          photoSelectProse
        ) &&
        /prompt, context, curators, model, provider, and date/i.test(
          photoSelectProse
        ),
      "Keep depth remains contextual historical provenance."
    ),
    criterion(
      "TRANSCRIPT-PHOTO-004",
      /Preserve a broad sequence before selecting a hero/i.test(methodProse) &&
        /Never discard the `_aside` population from interpretation/i.test(
          methodProse
        ) &&
        /collective agency, a quieter form of work/i.test(methodProse) &&
        /_aside` siblings, level snapshots, notes/i.test(photoSelectProse),
      "Clusters and earlier asides remain available to future interpretation."
    ),
    criterion(
      "TRANSCRIPT-PHOTO-005",
      !privatePattern.test(publicLayer) &&
        /Keep raw People labels, exact timestamps, coordinates, private album names,\s+filenames, source identifiers, local paths, contact sheets, transcripts,\s+recordings, and unapproved pixels outside public Git/i.test(
          methodProse
        ) &&
        /No association or selection grants photographer rights, represented-person\s+consent, identity approval, factual caption clearance, creator credit, crop,\s+destination, production, or indexing approval/i.test(method) &&
        /ends with Jamie's review of the unchanged\s+candidate/i.test(method) &&
        photography.includes(
          "method.photography.transcript-linked-source-return"
        ) &&
        testimony.includes(
          "method.photography.transcript-linked-source-return"
        ),
      "Private metadata and every human publication gate remain explicit."
    )
  ];

  return {
    pass:
      suite.execution === "deterministic-local" &&
      suite.criteria.reduce((sum, item) => sum + item.weight, 0) === 100 &&
      checks.every((item) => item.pass),
    suite,
    checks,
    failures: checks.filter((item) => !item.pass).map((item) => item.id)
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateTranscriptPhotoReturn();
  console.log(
    `Transcript-photo source-return eval: ${result.pass ? "PASS" : "FAIL"} ` +
      `(${result.checks.filter((item) => item.pass).length}/${result.checks.length})`
  );
  for (const item of result.checks) {
    console.log(`- ${item.pass ? "PASS" : "FAIL"} ${item.id}: ${item.detail}`);
  }
  if (!result.pass) process.exitCode = 1;
}
