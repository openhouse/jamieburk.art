#!/usr/bin/env node

import {
  assets,
  citationNotes,
  claims,
  corrections,
  pageProjections,
  researchRuns,
  sources
} from "../apps/www/src/data/knowledge-bank/index.ts";

const citedClaimIds = new Set(pageProjections.flatMap((page) => page.occurrences.map((item) => item.claimId)));
const citedNoteIds = new Set(pageProjections.flatMap((page) => page.occurrences.map((item) => item.noteId)));
const citedSourceIds = new Set(
  citationNotes
    .filter((note) => citedNoteIds.has(note.id))
    .flatMap((note) => note.sourceIds)
);
const protectedSources = sources.filter((source) => source.publicUseStatus === "protected");
const unusedClaims = claims.filter((claim) => !citedClaimIds.has(claim.id));

console.log("Citational care report");
console.log(`Pages with governed citations: ${pageProjections.length}`);
console.log(`Claims used: ${citedClaimIds.size}/${claims.length}`);
console.log(`Notes used: ${citedNoteIds.size}/${citationNotes.length}`);
console.log(`Sources used: ${citedSourceIds.size}/${sources.length}`);
console.log(`Protected sources: ${protectedSources.length}`);
console.log(`Protected assets: ${assets.filter((asset) => asset.publicUseStatus === "protected").length}`);
console.log(`Research runs: ${researchRuns.length}`);
console.log(`Correction records: ${corrections.length}`);
console.log(`Unused structured claims: ${unusedClaims.length ? unusedClaims.map((claim) => claim.id).join(", ") : "none"}`);
console.log("Warnings: high-value claims outside CallNYC and homepage metrics remain in the follow-up queue; the resume PDF requires regeneration for CallNYC wording consistency.");
