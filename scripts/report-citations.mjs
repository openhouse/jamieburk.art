#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadCitationModel, resolveProjection } from "./lib/citation-model.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const model = loadCitationModel(repoRoot);

function countBy(records, field) {
  return records.reduce((counts, record) => {
    const key = record[field] ?? "unknown";
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function line(label, value) {
  console.log(`${label}: ${value}`);
}

console.log("# Citational Care Report");
console.log("");
line("Sources", model.sources.length);
line("Claims", model.claims.length);
line("Evidence relationships", model.evidence.length);
line("Research runs", model.researchRuns.length);
line("Assets/media records", model.assets.length);
line("Corrections", model.corrections.length);
line("Page projections", model.projections.length);

console.log("");
console.log("## Source Access");
for (const [status, count] of Object.entries(countBy(model.sources, "accessStatus"))) {
  line(status, count);
}

console.log("");
console.log("## Projection Surfaces");
for (const projection of model.projections) {
  const resolved = resolveProjection(projection, model);
  line(
    `${projection.path}`,
    `${projection.surface}, ${Object.keys(resolved.occurrences).length} occurrences, ${resolved.references.length} page-local references`
  );
}

console.log("");
console.log("## Corrections");
for (const correction of model.corrections) {
  line(
    correction.id,
    `${correction.surface} ${correction.field}: ${correction.previousValue} -> ${correction.correctedValue} (${correction.status})`
  );
}

console.log("");
console.log("## Protected Or Review-Required Assets");
const protectedAssets = model.assets.filter(
  (asset) =>
    asset.rightsStatus !== "cleared" ||
    (asset.consentStatus !== "cleared" && asset.consentStatus !== "not_applicable") ||
    asset.publicationStatus !== "public"
);

if (!protectedAssets.length) {
  console.log("None.");
} else {
  for (const asset of protectedAssets) {
    line(
      asset.id,
      `rights=${asset.rightsStatus}, consent=${asset.consentStatus}, publication=${asset.publicationStatus}`
    );
  }
}

console.log("");
console.log("## Reviewer Notes");
console.log("- Page-local numbers are generated at render time and reset per projection.");
console.log("- Public links point to original or archived public sources where available.");
console.log("- Summary-only private evidence is represented without publishing media, identities, paths, or raw metadata.");
console.log("- No public /proofs, /knowledge-bank, or /public-claims route is created by this system.");
