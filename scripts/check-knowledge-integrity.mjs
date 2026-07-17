#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import {
  homepageProofs,
  proofClaims,
  resumeProofHighlights,
  technicalOperationsProofRows
} from "../apps/www/src/data/proofs.ts";
import { featuredWork, workItems } from "../apps/www/src/data/work.ts";

const governancePaths = {
  credit: "docs/knowledge-bank/governance/collective-credit-policy.json",
  bindings: "docs/knowledge-bank/governance/projection-surface-bindings.json",
  composition: "docs/knowledge-bank/governance/composition-manifest.json",
  mosaic: "docs/knowledge-bank/governance/mosaic-privacy-review.json"
};

const expectedProjectClasses = {
  "196-sunday-dinner": "mixed",
  callnyc: "mixed",
  "creative-technology-practice": "mixed",
  "fair-rent-nyc": "collective",
  "harry-j-epstein": "mixed",
  "kc-town-hall": "mixed",
  "source-backed-team-memory": "mixed",
  wowlist: "mixed"
};

const expectedProofClasses = {
  "ai-evals-professional-development": "individual",
  "callnyc-civic-data-guidance": "mixed",
  "career-operating-structure-14-years": "individual-synthesis",
  "creative-technology-embodied-systems": "mixed",
  "fair-rent-campaign-memory": "collective",
  "fair-rent-source-map": "collective",
  "hje-modernization-stewardship": "mixed",
  "hje-revenue-growth-contribution": "mixed",
  "kc-spaces-fund-digital-infrastructure": "collective",
  "kc-town-hall-public-benefit-documentation": "mixed",
  "nyc-artist-coalition-civic-systems": "collective",
  "nyc-artist-coalition-participation-system": "collective",
  "nyc-artist-coalition-public-web-infrastructure": "collective",
  "source-backed-team-memory-method": "mixed",
  "sunday-dinner-196-participation-infrastructure": "mixed",
  "technical-operations-operating-backbone": "individual-synthesis",
  "wowlist-community-platform": "mixed"
};

const privatePatterns = [/\/Users\//i, /\/Volumes\//i, /file:\/\//i, /Library\/Mobile Documents/i];

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function sortedUnique(values) {
  return [...new Set(values)].sort();
}

function sameSet(left, right) {
  return JSON.stringify(sortedUnique(left)) === JSON.stringify(sortedUnique(right));
}

function duplicates(values) {
  const seen = new Set();
  return values.filter((value) => seen.has(value) || !seen.add(value));
}

export function renderedProofInventory() {
  const unique = (values) => [...new Set(values)];
  const routes = {
    "/": unique([
      ...homepageProofs.map(({ id }) => id),
      ...featuredWork.flatMap(({ proofBankIds }) => proofBankIds),
      "technical-operations-operating-backbone"
    ]),
    "/resume": resumeProofHighlights.map(({ id }) => id),
    "/work": unique(workItems.flatMap(({ proofBankIds }) => proofBankIds)),
    "/work/technical-operations": unique(
      technicalOperationsProofRows.flatMap(({ proofIds }) => proofIds)
    ),
    "/lab/source-backed-team-memory": ["source-backed-team-memory-method"],
    "/about": ["creative-technology-embodied-systems"],
    "/contact": [],
    "/colophon": []
  };
  for (const item of workItems) routes[`/work/${item.slug}`] = item.proofBankIds;
  return routes;
}

export function validateKnowledgeIntegrity(input = {}) {
  const credit = input.credit ?? readJson(governancePaths.credit);
  const bindings = input.bindings ?? readJson(governancePaths.bindings);
  const composition = input.composition ?? readJson(governancePaths.composition);
  const mosaic = input.mosaic ?? readJson(governancePaths.mosaic);
  const errors = [];

  const publicProofIds = proofClaims
    .filter(({ status, surfaces }) => ["ready", "careful"].includes(status) && surfaces.some((surface) => surface !== "internal-only"))
    .map(({ id }) => id);
  const policyProjectIds = credit.project_classes.map(({ project }) => project);
  const policyProofIds = credit.proof_attribution.map(({ proof_id }) => proof_id);
  const actualProjectIds = sortedUnique(proofClaims.flatMap(({ relatedProjects }) => relatedProjects));
  if (!sameSet(policyProjectIds, actualProjectIds)) errors.push("collective-credit project coverage is not an exact set");
  if (!sameSet(policyProofIds, publicProofIds)) errors.push("collective-credit proof coverage is not an exact set");
  for (const id of duplicates(policyProjectIds)) errors.push(`duplicate project credit policy: ${id}`);
  for (const id of duplicates(policyProofIds)) errors.push(`duplicate proof attribution policy: ${id}`);
  for (const [project, expectedClass] of Object.entries(expectedProjectClasses)) {
    const actual = credit.project_classes.find((item) => item.project === project);
    if (actual?.class !== expectedClass) errors.push(`${project} must remain classified ${expectedClass}`);
    if (!actual?.boundary) errors.push(`${project} lacks a collective-credit boundary`);
  }
  for (const [proofId, expectedClass] of Object.entries(expectedProofClasses)) {
    const actual = credit.proof_attribution.find((item) => item.proof_id === proofId);
    if (actual?.class !== expectedClass) errors.push(`${proofId} must remain classified ${expectedClass}`);
    if (!actual?.required_boundary) errors.push(`${proofId} lacks an attribution boundary`);
  }

  const rendered = renderedProofInventory();
  const compositionRoutes = new Map(composition.routes.map((route) => [route.route, route]));
  if (!sameSet([...compositionRoutes.keys()], Object.keys(rendered))) errors.push("composition routes are not an exact set of rendered proof routes");
  for (const [route, proofIds] of Object.entries(rendered)) {
    const manifest = compositionRoutes.get(route);
    if (!manifest) continue;
    if (!sameSet(manifest.proof_ids, proofIds)) errors.push(`${route} proof inventory drifts from its composition manifest`);
    if (manifest.claim_budget !== manifest.proof_ids.length) errors.push(`${route} claim budget must equal its selected proof count`);
    if (!manifest.audience || !manifest.action || !(manifest.exclusions?.length > 0)) errors.push(`${route} lacks audience, action, or exclusions`);
  }

  const bindingRoutes = bindings.route_bindings.map(({ route }) => route);
  if (!sameSet(bindingRoutes, Object.keys(rendered))) errors.push("projection bindings are not an exact set of public composition routes");
  for (const id of duplicates(bindingRoutes)) errors.push(`duplicate route binding: ${id}`);
  const governedFiles = [
    ...bindings.shared_projection_sources,
    ...bindings.route_bindings.flatMap(({ source_files }) => source_files),
    ...bindings.non_route_surfaces.flatMap(({ source_files }) => source_files)
  ];
  for (const file of governedFiles) if (!existsSync(file)) errors.push(`projection source is missing: ${file}`);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(mosaic.reviewed_at ?? "")) errors.push("mosaic review requires a review date");
  if ((mosaic.risks ?? []).length < 5) errors.push("mosaic review must cover at least five cross-record risks");
  for (const risk of mosaic.risks ?? []) {
    if (!(risk.combination?.length >= 2) || !risk.risk || !risk.control || !risk.trigger) {
      errors.push(`${risk.id ?? "mosaic risk"} lacks combination, risk, control, or trigger`);
    }
  }

  for (const value of JSON.stringify({ credit, bindings, composition, mosaic }).split(/\s+/)) {
    for (const pattern of privatePatterns) if (pattern.test(value)) errors.push("governance contains a private filesystem locator");
  }
  return errors;
}

export function governanceFingerprints() {
  return Object.fromEntries(
    Object.entries(governancePaths).map(([name, path]) => [
      name,
      `sha256:${createHash("sha256").update(readFileSync(path)).digest("hex")}`
    ])
  );
}

function runCli() {
  const errors = validateKnowledgeIntegrity();
  if (errors.length) {
    console.error("Knowledge integrity check failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("Knowledge integrity check passed.");
  console.log(JSON.stringify({ fingerprints: governanceFingerprints() }, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) runCli();
