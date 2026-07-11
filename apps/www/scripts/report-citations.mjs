#!/usr/bin/env node

import {
  claimRecordsById,
  correctionRecords,
  evidenceNoteRecordsById,
  pageCitationManifests,
  sourceRecordsById
} from "../src/data/knowledge-bank/index.ts";
import { buildCitationSet } from "../src/lib/citations.ts";

const lines = [
  "# Citation Report",
  "",
  "Generated deterministically from public-safe Knowledge Bank records. No URLs were fetched.",
  ""
];

for (const manifest of pageCitationManifests) {
  const built = buildCitationSet(manifest);
  lines.push(`## ${manifest.path}`, "");
  for (const builtNote of built.notes) {
    const note = evidenceNoteRecordsById[builtNote.noteId];
    const sources = note.sourceIds.map((id) => sourceRecordsById[id]);
    lines.push(
      `### [${builtNote.number}] ${note.title}`,
      "",
      `- Note ID: \`${note.id}\``,
      `- Claim IDs: ${note.claimIds.map((id) => `\`${id}\``).join(", ")}`,
      `- Source IDs: ${note.sourceIds.map((id) => `\`${id}\``).join(", ")}`,
      `- Source posture: ${sources.map((source) => `${source.visibility}/${source.availability}`).join(", ")}`,
      `- Render mode: ${note.renderMode}`,
      `- Occurrences: ${builtNote.referenceAnchorIds.length}`,
      `- Qualification: ${note.qualification ?? "None"}`,
      ""
    );
  }
}

lines.push("## Corrections", "");
for (const correction of correctionRecords) {
  lines.push(
    `- \`${correction.id}\` - ${correction.status}: ${correction.reason}`
  );
}

const oneSourceClaims = Object.values(claimRecordsById).filter(
  (claim) => claim.projectionSurfaces.length && claim.evidence.length === 1
);
lines.push(
  "",
  "## Warnings",
  "",
  ...oneSourceClaims.map((claim) => `- \`${claim.id}\` is a material public claim with one source.`),
  ...correctionRecords
    .filter((correction) => correction.status === "recorded")
    .map((correction) => `- \`${correction.id}\` is recorded but not reviewed.`),
  ""
);

console.log(lines.join("\n"));
