#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compile } from "@mdx-js/mdx";
import {
  buildCitationNote,
  createCitationPlan,
  isPublicClaim,
  loadKnowledgeBank,
  positiveEvidenceRelations,
  requirePublicClaim
} from "../apps/www/src/lib/knowledge-bank-runtime.mjs";
import rehypeCitationAccessibility from "../apps/www/src/lib/rehype-citation-accessibility.mjs";
import remarkKnowledgeBankCitations from "../apps/www/src/lib/remark-knowledge-bank-citations.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const warnings = [];
const privatePathPattern = /(?:\/private\/tmp\/|\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials)/i;

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function duplicates(records) {
  const ids = records.map((record) => record.id);
  return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
}

function isInstitutionalOverreach(claim, sources) {
  const positive = claim.evidence
    .filter((evidence) => positiveEvidenceRelations.has(evidence.relation))
    .map((evidence) => sources.get(evidence.sourceId))
    .filter(Boolean);
  if (!positive.length || positive.some((source) => source.kind !== "participant-photograph")) return false;
  const wording = [claim.canonicalStatement, ...Object.values(claim.publicProjections)].join(" ");
  return /official (?:title|event|project)|Council (?:hosted|announced|described)|event (?:began|started|was)|hackathon was/i.test(wording);
}

function preservesAttribution(wording, sourceCreators) {
  const sourceNamed = sourceCreators.some((creator) => creator && wording.toLowerCase().includes(creator.toLowerCase()));
  return sourceNamed || /\b(?:according to|described|reported|announced|attributed|the Council)\b/i.test(wording);
}

export function validateRecords(bank) {
  const errors = [];
  const sourceIds = new Set(bank.sources.map((source) => source.id));
  const sources = new Map(bank.sources.map((source) => [source.id, source]));

  const duplicateSources = duplicates(bank.sources);
  const duplicateClaims = duplicates(bank.claims);
  if (duplicateSources.length) errors.push(`Duplicate source IDs: ${duplicateSources.join(", ")}`);
  if (duplicateClaims.length) errors.push(`Duplicate claim IDs: ${duplicateClaims.join(", ")}`);

  for (const source of bank.sources) {
    if (!source.url && !source.archiveUrls.length && !source.mediaUrls.length && source.sourceStatus !== "not-publicly-linked") {
      errors.push(`${source.id} has no public link and no explicit not-publicly-linked status`);
    }
  }

  for (const claim of bank.claims) {
    const positiveEvidence = claim.evidence.filter((evidence) => positiveEvidenceRelations.has(evidence.relation));
    for (const evidence of claim.evidence) {
      if (!sourceIds.has(evidence.sourceId)) errors.push(`${claim.id} references unknown source: ${evidence.sourceId}`);
      if (evidence.relation === "does-not-support" && evidence.supports.some((item) => !/^does not\b/i.test(item))) {
        errors.push(`${claim.id} uses does-not-support as positive evidence`);
      }
    }

    if (claim.citationPolicy === "required" && (!isPublicClaim(claim) || !positiveEvidence.length)) {
      errors.push(`${claim.id} is citation-required without public positive evidence`);
    }

    if (claim.knowledgeStatus === "confirmed" && !positiveEvidence.some((evidence) =>
      ["directly-supports", "visual-evidence", "metadata-evidence"].includes(evidence.relation))) {
      errors.push(`${claim.id} is confirmed without direct, visual, or metadata evidence`);
    }

    if (claim.knowledgeStatus === "reconstructed" && claim.publicationStatus === "ready") {
      errors.push(`${claim.id} presents a reconstructed claim as unqualified ready content`);
    }

    if (claim.knowledgeStatus === "attributed") {
      const creators = positiveEvidence.map((evidence) => sources.get(evidence.sourceId)?.creator).filter(Boolean);
      for (const wording of [claim.canonicalStatement, ...Object.values(claim.publicProjections)]) {
        if (!preservesAttribution(wording, creators)) errors.push(`${claim.id} drops attribution in public wording`);
      }
    }

    if (isInstitutionalOverreach(claim, sources)) {
      errors.push(`${claim.id} uses a participant photograph as sole support for an institutional claim`);
    }

    const projectionText = Object.values(claim.publicProjections).join(" ").toLowerCase();
    for (const antiClaim of claim.antiClaims) {
      if (antiClaim.length > 18 && projectionText.includes(antiClaim.toLowerCase())) {
        errors.push(`${claim.id} projection conflicts with anti-claim: ${antiClaim}`);
      }
    }
  }

  const serialized = JSON.stringify(bank);
  if (privatePathPattern.test(serialized)) errors.push("Knowledge-bank data contains a literal private filesystem path");
  return errors;
}

async function runFixtures() {
  const source = {
    id: "official-source", kind: "official-primary", title: "Official source", creator: "Agency",
    accessedAt: "2026-07-11", url: "https://example.com/source", archiveUrls: ["https://example.com/archive"],
    mediaUrls: [], sourceStatus: "live-and-archived", publicDescription: "A public source.",
    evidentiaryScope: ["date"], doesNotEstablish: []
  };
  const claim = {
    id: "valid-claim", canonicalStatement: "Agency described the date.",
    publicProjections: { caseStudy: "Agency described the date." }, knowledgeStatus: "attributed",
    publicationStatus: "ready-with-attribution", citationPolicy: "required",
    evidence: [{ sourceId: source.id, relation: "directly-supports", supports: ["date"] }],
    publicCitationNote: "Agency published the date.", qualifications: [], antiClaims: [],
    allowedSurfaces: ["fixture"], lastReviewedAt: "2026-07-11", reviewedBy: []
  };
  const bank = { sources: [source], claims: [claim], researchRuns: [] };
  if (validateRecords(bank).length) throw new Error("Fixture failed: valid public claim");

  const maps = { claimsById: new Map([[claim.id, claim]]), sourcesById: new Map([[source.id, source]]) };
  const repeated = createCitationPlan([claim.id, claim.id], maps.claimsById);
  if (repeated.ids.length !== 1 || repeated.numberFor(claim.id) !== 1) throw new Error("Fixture failed: citation deduplication");
  const reset = createCitationPlan([claim.id], maps.claimsById);
  if (reset.numberFor(claim.id) !== 1) throw new Error("Fixture failed: page-local numbering reset");
  try { requirePublicClaim(maps.claimsById, "unknown"); throw new Error("Fixture failed: unknown claim"); } catch (error) {
    if (!String(error).includes("Unknown knowledge-bank claim")) throw error;
  }
  const protectedClaim = { ...claim, id: "protected-claim", publicationStatus: "protected" };
  try { requirePublicClaim(new Map([[protectedClaim.id, protectedClaim]]), protectedClaim.id); throw new Error("Fixture failed: protected claim"); } catch (error) {
    if (!String(error).includes("not public")) throw error;
  }
  if (!validateRecords({ ...bank, claims: [{ ...claim, evidence: [{ ...claim.evidence[0], sourceId: "missing" }] }] }).some((item) => item.includes("unknown source"))) {
    throw new Error("Fixture failed: unknown source");
  }
  const photo = { ...source, id: "photo", kind: "participant-photograph", url: undefined, archiveUrls: [], sourceStatus: "not-publicly-linked" };
  const overreach = { ...claim, canonicalStatement: "The Council hosted the official event.", publicProjections: { caseStudy: "The Council hosted the official event." }, evidence: [{ sourceId: photo.id, relation: "visual-evidence", supports: ["official event"] }] };
  if (!validateRecords({ sources: [photo], claims: [overreach], researchRuns: [] }).some((item) => item.includes("participant photograph"))) {
    throw new Error("Fixture failed: participant photograph boundary");
  }
  if (!preservesAttribution(claim.publicProjections.caseStudy, [source.creator])) throw new Error("Fixture failed: attributed wording");
  if (!privatePathPattern.test("/private/tmp/example")) throw new Error("Fixture failed: private path rejection");
  const note = buildCitationNote(claim, maps.sourcesById);
  if (note.links.length !== 2 || !note.links.some((link) => link.label === "Archived capture")) {
    throw new Error("Fixture failed: generated live and archive links");
  }

  const compiled = String(await compile(
    "The Council described the gathering.[^callnyc-first-councilstat-hackathon] The same source remains relevant.[^callnyc-first-councilstat-hackathon]",
    {
      remarkPlugins: [remarkKnowledgeBankCitations],
      rehypePlugins: [rehypeCitationAccessibility],
      remarkRehypeOptions: { footnoteLabel: "References", clobberPrefix: "citation-" }
    }
  ));
  for (const expected of [
    '"data-footnote-ref": true',
    'href: "#citation-fn-callnyc-first-councilstat-hackathon"',
    '"data-footnote-backref": ""',
    'children: "References"',
    '"aria-label": "Citation 1:'
  ]) {
    if (!compiled.includes(expected)) throw new Error(`Fixture failed: rendered citation smoke missing ${expected}`);
  }
  const noteIdOccurrences = compiled.split('id: "citation-fn-callnyc-first-councilstat-hackathon"').length - 1;
  const noteHrefOccurrences = compiled.split('href: "#citation-fn-callnyc-first-councilstat-hackathon"').length - 1;
  if (noteIdOccurrences !== 1 || noteHrefOccurrences !== 2) {
    throw new Error("Fixture failed: repeated MDX citation did not reuse one numbered note");
  }
}

await runFixtures();

let bank;
try {
  bank = loadKnowledgeBank();
} catch (error) {
  failures.push(`Invalid knowledge-bank schema: ${error instanceof Error ? error.message : String(error)}`);
}

if (bank) failures.push(...validateRecords(bank));

const contentRoot = path.join(repoRoot, "apps/www/src/content");
const publicCitations = new Map();
for (const file of walk(contentRoot).filter((item) => /\.mdx?$/.test(item))) {
  const content = readFileSync(file, "utf8");
  const relative = path.relative(repoRoot, file);
  const manualDefinitions = [...content.matchAll(/^\[\^([^\]]+)\]:/gm)].map((match) => match[1]);
  const references = [...content.matchAll(/\[\^([^\]]+)\](?!:)/g)].map((match) => match[1]);
  for (const id of manualDefinitions) {
    if (bank?.claimsById.has(id)) failures.push(`${relative} manually defines knowledge-bank citation: ${id}`);
  }
  for (const id of references) {
    publicCitations.set(id, [...(publicCitations.get(id) ?? []), relative]);
    const claim = bank?.claimsById.get(id);
    if (!claim) failures.push(`${relative} cites unknown claim: ${id}`);
    else if (!isPublicClaim(claim)) failures.push(`${relative} cites non-public claim: ${id}`);
  }
}

const declaredSurfaceFiles = new Map([
  ["callnyc-case-study", "apps/www/src/content/work/callnyc.mdx"]
]);
if (bank) {
  for (const claim of bank.claims.filter((item) => item.citationPolicy === "required")) {
    for (const surface of claim.allowedSurfaces) {
      const file = declaredSurfaceFiles.get(surface);
      if (!file) continue;
      const content = readFileSync(path.join(repoRoot, file), "utf8");
      if (!content.includes(`[^${claim.id}]`)) failures.push(`${file} uses required claim without citation: ${claim.id}`);
    }
  }
}

const tsxCitationSource = walk(path.join(repoRoot, "apps/www/src"))
  .filter((file) => /\.tsx$/.test(file))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");
if (!tsxCitationSource.includes('claimId={proof.id}')) warnings.push("No representative TSX citation use was detected");

if (warnings.length) {
  console.warn("Citation warnings:");
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}
if (failures.length) {
  console.error("Citation check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Citation check passed for ${bank.claims.length} claims and ${bank.sources.length} sources.`);
