import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { atlasSourceDossierSchema } from "./schema.mjs";

export const defaultSourceDossierRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../docs/atlas/sources"
);

const deprecatedKeys = new Set([
  "branch",
  "branches",
  "sourceCommit",
  "commit",
  "ingestionRuns",
  "interpretationRuns",
  "lineage",
  "convergence",
  "divergence"
]);

const forbiddenPublicText = [
  /feature\/evals-[A-N]/i,
  /\bbranch provenance\b/i,
  /\bingestion runs?\b/i,
  /\binterpretation records?\b/i,
  /\bconvergence\b/i,
  /\bdivergence\b/i,
  /\/Users\//i,
  /\/Volumes\//i,
  /\/private\/tmp\//i,
  /Mobile Documents\/com~apple~CloudDocs/i
];

const requiredSynthesisHeadings = [
  "Canonical source",
  "Preservation artifact",
  "Atomic observations",
  "Claims",
  "Anti-claims",
  "Source limitations",
  "Independent corroborating sources",
  "Rights, consent, public use, and custody",
  "Projection decisions",
  "Evaluation status",
  "Open human gates"
];

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function duplicateIds(records) {
  const ids = records.map(({ id }) => id);
  return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
}

function deprecatedKeyErrors(value, location = "dossier") {
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => deprecatedKeyErrors(entry, `${location}[${index}]`));
  }
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, entry]) => [
    ...(deprecatedKeys.has(key) ? [`Deprecated source-lineage key ${location}.${key}`] : []),
    ...deprecatedKeyErrors(entry, `${location}.${key}`)
  ]);
}

export function sourceDossierFingerprint(dossier) {
  return hash(JSON.stringify(dossier));
}

export function loadAtlasSourceDossiers(root = defaultSourceDossierRoot) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => {
      const file = path.join(root, entry.name);
      const dossier = atlasSourceDossierSchema.parse(JSON.parse(readFileSync(file, "utf8")));
      return { ...dossier, file, fingerprint: sourceDossierFingerprint(dossier) };
    })
    .sort((left, right) => left.id.localeCompare(right.id));
}

export function validateAtlasSourceDossier(dossier, { repoRoot } = {}) {
  const errors = [];
  const sourceId = dossier.source.id;
  const observationIds = new Set(dossier.observations.map(({ id }) => id));
  const claimIds = new Set(dossier.claims.map(({ id }) => id));
  const corroboratingIds = new Set(dossier.corroboratingSources.map(({ id }) => id));

  for (const collection of [
    dossier.observations,
    dossier.claims,
    dossier.antiClaims,
    dossier.sourceLimitations,
    dossier.corroboratingSources,
    dossier.projectionDecisions,
    dossier.evaluation.independentCertifications,
    dossier.evaluation.humanGates,
    dossier.evaluation.mutations,
    dossier.evaluation.failuresAndRepairs
  ]) {
    for (const id of duplicateIds(collection)) errors.push(`Duplicate source-dossier identity ${id}`);
  }
  if (dossier.artifact.sourceId !== sourceId) errors.push("Artifact does not point to the canonical source");
  if (dossier.observations.some(({ sourceId: observed }) => observed !== sourceId)) {
    errors.push("An atomic observation points away from the canonical source");
  }
  for (const claim of dossier.claims) {
    for (const id of claim.supportObservationIds) {
      if (!observationIds.has(id)) errors.push(`Claim ${claim.id} cites unknown observation ${id}`);
    }
    for (const id of claim.corroboratingSourceIds) {
      if (!corroboratingIds.has(id)) errors.push(`Claim ${claim.id} cites unknown corroborating source ${id}`);
    }
    if ("antiClaims" in claim || "limitations" in claim) {
      errors.push(`Claim ${claim.id} collapses claims with anti-claims or source limitations`);
    }
  }
  for (const antiClaim of dossier.antiClaims) {
    for (const id of antiClaim.boundedByObservationIds) {
      if (!observationIds.has(id)) errors.push(`Anti-claim ${antiClaim.id} cites unknown observation ${id}`);
    }
  }
  for (const source of dossier.corroboratingSources) {
    if (source.id === sourceId) errors.push("Canonical source is duplicated as corroboration");
    for (const id of source.supportsObservationIds) {
      if (!observationIds.has(id)) errors.push(`Corroborating source ${source.id} cites unknown observation ${id}`);
    }
  }
  for (const decision of dossier.projectionDecisions) {
    for (const id of decision.claimIds) {
      if (!claimIds.has(id)) errors.push(`Projection decision ${decision.id} cites unknown claim ${id}`);
    }
  }
  const governedClaimIds = new Set(dossier.projectionDecisions.flatMap(({ claimIds: ids }) => ids));
  for (const id of claimIds) {
    if (!governedClaimIds.has(id)) errors.push(`Claim ${id} lacks a contextual projection decision`);
  }
  const { file: _file, fingerprint: _fingerprint, ...portableDossier } = dossier;
  errors.push(...deprecatedKeyErrors(portableDossier));
  const serialized = JSON.stringify(portableDossier);
  for (const pattern of forbiddenPublicText) {
    if (pattern.test(serialized)) errors.push(`Source dossier exposes deprecated or protected text matching ${pattern}`);
  }
  if (dossier.artifact.custody.repositoryCopy || dossier.artifact.custody.locatorExposed) {
    errors.push("Protected artifact custody exposes or republishes the PDF");
  }
  if (dossier.governance.custody.rawArtifactInRepository || dossier.governance.custody.privateLocatorInRepository) {
    errors.push("Source governance permits protected artifact or locator disclosure");
  }
  for (const certification of dossier.evaluation.independentCertifications) {
    if (certification.status === "pending" && certification.reviewer !== null) {
      errors.push(`Pending certification ${certification.id} names a reviewer prematurely`);
    }
    if (certification.status === "pass" && !certification.reviewer) {
      errors.push(`Passing certification ${certification.id} lacks an independent reviewer`);
    }
  }
  for (const gate of dossier.evaluation.humanGates) {
    if (gate.status === "pending" && gate.reviewer !== null) {
      errors.push(`Pending human gate ${gate.id} names a reviewer prematurely`);
    }
    if (gate.status === "pass" && !gate.reviewer) errors.push(`Passing human gate ${gate.id} lacks a reviewer`);
  }
  if (dossier.evaluation.machineRun.status !== "passed") errors.push("Source-dossier machine run is not passing");
  if (!dossier.evaluation.failuresAndRepairs.length) errors.push("Source-dossier failure and repair evidence is missing");
  if (!dossier.evaluation.independentCertifications.length) errors.push("Source-dossier independent certification protocol is missing");
  if (!dossier.evaluation.humanGates.length) errors.push("Source-dossier human gates are missing");
  if (dossier.evaluation.mutations.some(({ status }) => status !== "passed")) {
    errors.push("Source-dossier mutation evidence is incomplete");
  }
  const pendingHumanGates = dossier.evaluation.humanGates.some(({ status }) => status === "pending") ||
    dossier.evaluation.independentCertifications.some(({ status }) => status === "pending");
  if (dossier.evaluation.stoppingDecision.decision !== "stop-automated-climb") {
    errors.push("Source-dossier automated stopping decision is not recorded");
  }
  if (dossier.evaluation.stoppingDecision.humanGatesRemain !== pendingHumanGates) {
    errors.push("Source-dossier stopping decision misstates pending human or independent review");
  }

  if (repoRoot) {
    const synthesisFile = path.join(repoRoot, dossier.synthesisPage);
    if (!existsSync(synthesisFile)) errors.push(`Source-dossier synthesis page is missing: ${dossier.synthesisPage}`);
    else {
      const synthesis = readFileSync(synthesisFile, "utf8");
      for (const heading of requiredSynthesisHeadings) {
        if (!synthesis.includes(`## ${heading}`)) errors.push(`Synthesis page lacks heading: ${heading}`);
      }
      for (const required of [sourceId, dossier.artifact.sha256, `${dossier.observations.length} atomic observations`, `${dossier.claims.length} claims`]) {
        if (!synthesis.includes(required)) errors.push(`Synthesis page omits ${required}`);
      }
      for (const pattern of forbiddenPublicText) {
        if (pattern.test(synthesis)) errors.push(`Synthesis page exposes deprecated or protected text matching ${pattern}`);
      }
    }
  }
  return errors;
}

export function validateAtlasSourceDossiers(dossiers, options = {}) {
  const errors = [];
  for (const id of duplicateIds(dossiers)) errors.push(`Duplicate Atlas source dossier ${id}`);
  for (const sourceId of duplicateIds(dossiers.map(({ source }) => source))) {
    errors.push(`Canonical source appears in more than one dossier: ${sourceId}`);
  }
  for (const artifactId of duplicateIds(dossiers.map(({ artifact }) => artifact))) {
    errors.push(`Artifact appears in more than one dossier: ${artifactId}`);
  }
  for (const dossier of dossiers) errors.push(...validateAtlasSourceDossier(dossier, options));
  return errors;
}
