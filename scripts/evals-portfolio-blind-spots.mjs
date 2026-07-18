#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath, fallback) => {
  const absolutePath = path.join(repoRoot, relativePath);
  return existsSync(absolutePath)
    ? JSON.parse(readFileSync(absolutePath, "utf8"))
    : fallback;
};
const hasAll = (value, expected) => expected.every((item) => value.includes(item));

const rubric = readJson("evals/blind-spots/rubric.json", { criteria: [] });
const external = readJson("evals/blind-spots/external-evidence.json", {
  collaboratorConfirmations: [],
  humanAudienceSessions: [],
  clearedVisualProofs: []
});
const currentProofs = readJson("evals/blind-spots/current-proof-inventory.json", {
  proofs: []
});
const sourceMaturation = readJson(
  "evals/blind-spots/source-maturation-inventory.json",
  { sources: [] }
);
const outcomes = readJson("evals/blind-spots/outcome-inventory.json", {
  projects: []
});

const docs = {
  ledger: existsSync(path.join(repoRoot, "docs/knowledge-bank/blind-spots.md"))
    ? read("docs/knowledge-bank/blind-spots.md")
    : "",
  collaborator: existsSync(
    path.join(repoRoot, "docs/knowledge-bank/collaborator-proof-intake.md")
  )
    ? read("docs/knowledge-bank/collaborator-proof-intake.md")
    : "",
  audience: existsSync(
    path.join(repoRoot, "docs/knowledge-bank/audience-validation-protocol.md")
  )
    ? read("docs/knowledge-bank/audience-validation-protocol.md")
    : "",
  visual: existsSync(
    path.join(repoRoot, "docs/knowledge-bank/visual-proof-protocol.md")
  )
    ? read("docs/knowledge-bank/visual-proof-protocol.md")
    : "",
  outcome: existsSync(
    path.join(repoRoot, "docs/knowledge-bank/outcome-evidence-model.md")
  )
    ? read("docs/knowledge-bank/outcome-evidence-model.md")
    : "",
  compositions: existsSync(
    path.join(repoRoot, "docs/knowledge-bank/application-composition-briefs.md")
  )
    ? read("docs/knowledge-bank/application-composition-briefs.md")
    : ""
};

const taskById = new Map(
  knowledgeLifecycle.researchTasks.map((task) => [task.id, task])
);
const briefById = new Map(
  knowledgeLifecycle.editorialBriefs.map((brief) => [brief.id, brief])
);
const mediaById = new Map(
  knowledgeLifecycle.mediaLeads.map((media) => [media.id, media])
);

const governanceChecks = new Map();
const closureChecks = new Map();
const falseClosures = [];

const add = (id, governance, closure, detail) => {
  governanceChecks.set(id, { passes: Boolean(governance), detail });
  closureChecks.set(id, Boolean(closure));
};

const confirmations = external.collaboratorConfirmations ?? [];
const confirmationProjects = new Set(
  confirmations.flatMap((entry) => entry.projectIds ?? [])
);
const collaboratorClosed =
  confirmations.length >= 3 &&
  confirmationProjects.size >= 3 &&
  confirmations.every(
    (entry) =>
      entry.permissionStatus === "approved" &&
      entry.reuseBoundary?.length > 0 &&
      entry.evidencePath?.length > 0
  );
add(
  "collaborator-corroboration",
  taskById.has("TASK-PORTFOLIO-COLLABORATOR-CORROBORATION") &&
    hasAll(docs.collaborator, [
      "What Jamie did",
      "What became usable",
      "Collective context",
      "Permission and reuse"
    ]) &&
    Array.isArray(confirmations),
  collaboratorClosed,
  `${confirmations.length} qualifying confirmation record(s); target 3 across 3 projects.`
);

const contemporaryProofs = currentProofs.proofs ?? [];
const contemporaryClosed =
  contemporaryProofs.filter(
    (proof) =>
      proof.year >= 2022 &&
      proof.corroborationStatus === "corroborated" &&
      proof.outcomeStatus === "corroborated" &&
      proof.applicationApproval === "approved"
  ).length >= 3;
add(
  "contemporary-implementation",
  taskById.has("TASK-PORTFOLIO-CONTEMPORARY-IMPLEMENTATION") &&
    hasAll(docs.ledger, [
      "Contemporary implementation proof",
      "current-role proof inventory",
      "does not become stronger through repetition"
    ]) &&
    contemporaryProofs.length >= 4,
  contemporaryClosed,
  `${contemporaryProofs.filter((proof) => proof.year >= 2022).length} recent proof candidate(s); closure requires 3 corroborated outcomes approved for application use.`
);

const audienceSessions = external.humanAudienceSessions ?? [];
const readerGroups = new Set(audienceSessions.map((session) => session.readerGroup));
const audienceClosed =
  audienceSessions.length >= 5 &&
  readerGroups.size >= 2 &&
  audienceSessions.every(
    (session) =>
      session.unpromptedRoleComprehension === true &&
      session.strongestProofRecall === true &&
      session.nextActionFound === true
  );
add(
  "human-audience-validation",
  taskById.has("TASK-PORTFOLIO-HUMAN-AUDIENCE-VALIDATION") &&
    hasAll(docs.audience, [
      "Unfamiliar-reader rule",
      "Five-minute protocol",
      "Interview intent",
      "Do not coach"
    ]) &&
    Array.isArray(audienceSessions),
  audienceClosed,
  `${audienceSessions.length} unfamiliar-reader session(s) across ${readerGroups.size} reader group(s); target 5 across 2 groups.`
);

const clearedVisualProofs = external.clearedVisualProofs ?? [];
const visualProjects = new Set(
  clearedVisualProofs.flatMap((entry) => entry.projectIds ?? [])
);
const visualsClosed =
  clearedVisualProofs.length >= 3 &&
  visualProjects.size >= 3 &&
  clearedVisualProofs.every((entry) => {
    const media = mediaById.get(entry.mediaLeadId);
    return (
      media?.rightsStatus === "cleared" &&
      ["cleared", "not-applicable"].includes(media.consentStatus) &&
      entry.captionStatus === "approved" &&
      entry.destination?.startsWith("/")
    );
  });
add(
  "visual-proof-rights",
  taskById.has("TASK-PORTFOLIO-VISUAL-PROOF-CLEARANCE") &&
    hasAll(docs.visual, [
      "Rights are not evidence",
      "Consent is contextual",
      "Caption contract",
      "Display decision"
    ]) &&
    Array.isArray(clearedVisualProofs),
  visualsClosed,
  `${clearedVisualProofs.length} cleared visual proof(s) across ${visualProjects.size} project(s); target 3 across 3 projects.`
);

const prioritySources = sourceMaturation.sources ?? [];
const dispositionedSources = prioritySources.filter(
  (source) => source.disposition && source.nextAction
);
const matureSources = prioritySources.filter((source) =>
  ["close-read", "replaced-by-stronger-source"].includes(source.disposition)
);
const sourceMaturationRate = prioritySources.length
  ? matureSources.length / prioritySources.length
  : 0;
const sourceMaturationClosed =
  prioritySources.length >= 1 &&
  dispositionedSources.length === prioritySources.length &&
  sourceMaturationRate >= 0.8;
add(
  "source-maturation",
  taskById.has("TASK-PORTFOLIO-SOURCE-MATURATION") &&
    hasAll(docs.ledger, [
      "Claim-bearing source maturation",
      "front-door consequence",
      "close-read coverage"
    ]) &&
    prioritySources.length >= 1 &&
    dispositionedSources.length === prioritySources.length,
  sourceMaturationClosed,
  `${matureSources.length}/${prioritySources.length} priority source(s) mature (${Math.round(sourceMaturationRate * 100)}%); target 80%.`
);

const outcomeProjects = outcomes.projects ?? [];
const governedOutcomeProjects = outcomeProjects.filter(
  (project) =>
    project.output &&
    project.observedUse &&
    project.outcome &&
    project.causalContribution &&
    project.outcomeStatus
);
const corroboratedOutcomes = outcomeProjects.filter(
  (project) => project.outcomeStatus === "corroborated"
);
const outcomesClosed = corroboratedOutcomes.length >= 4;
add(
  "outcome-evidence",
  taskById.has("TASK-PORTFOLIO-OUTCOME-EVIDENCE") &&
    hasAll(docs.outcome, [
      "Output",
      "Observed use",
      "Outcome",
      "Causal contribution",
      "Do not promote use into outcome"
    ]) &&
    outcomeProjects.length >= 6 &&
    governedOutcomeProjects.length === outcomeProjects.length,
  outcomesClosed,
  `${corroboratedOutcomes.length}/${outcomeProjects.length} project outcome(s) corroborated; target 4.`
);

const compositionBriefIds = [
  "BRIEF-APPLICATION-OTI-2026",
  "BRIEF-APPLICATION-BUSINESS-IMPLEMENTATION-2026",
  "BRIEF-APPLICATION-SOURCE-BACKED-TEAM-MEMORY-2026",
  "BRIEF-APPLICATION-CIVIC-CULTURAL-2026"
];
const compositionBriefs = compositionBriefIds
  .map((id) => briefById.get(id))
  .filter(Boolean);
const compositionsClosed =
  compositionBriefs.length === 4 &&
  new Set(compositionBriefs.flatMap((brief) => brief.audienceTags)).size >= 4 &&
  compositionBriefs.every(
    (brief) =>
      brief.publicationIntent === "internal-brief" &&
      brief.targetSurfaces.length === 0 &&
      brief.selectionCriteria.length >= 3 &&
      brief.exclusions.length >= 2
  );
add(
  "audience-compositions",
  taskById.get("TASK-PORTFOLIO-AUDIENCE-COMPOSITIONS")?.status ===
    "completed" &&
    hasAll(docs.compositions, [
      "OTI and public-sector delivery",
      "Private-sector implementation",
      "Source-backed team memory",
      "Civic and cultural infrastructure"
    ]),
  compositionsClosed,
  `${compositionBriefs.length}/4 bounded internal application brief(s) present.`
);

for (const criterion of rubric.criteria) {
  const task = taskById.get(criterion.taskId);
  if (criterion.externalEvidenceRequired && task?.status === "completed") {
    const closed = closureChecks.get(criterion.id);
    if (!closed) {
      falseClosures.push(
        `${criterion.id}: external-evidence task is completed without satisfying its closure definition.`
      );
    }
  }
}

const governanceScore = rubric.criteria.reduce((sum, criterion) => {
  return sum + (governanceChecks.get(criterion.id)?.passes ? criterion.weight : 0);
}, 0);
const closureScore = rubric.criteria.reduce((sum, criterion) => {
  return sum + (closureChecks.get(criterion.id) ? criterion.weight : 0);
}, 0);

console.log(
  `Portfolio blind-spot governance: ${governanceScore}/100 (criterion: 100, no false closure)`
);
for (const criterion of rubric.criteria) {
  const governance = governanceChecks.get(criterion.id);
  const closed = closureChecks.get(criterion.id);
  console.log(
    `- ${criterion.name}: governance ${governance?.passes ? "PASS" : "FAIL"}; closure ${closed ? "MET" : "OPEN"}`
  );
  console.log(`  ${governance?.detail ?? "No evaluation detail."}`);
}
console.log(`Closure progress: ${closureScore}/100 (reported, not a release gate).`);

if (falseClosures.length) {
  console.error("False closure detected:");
  for (const failure of falseClosures) console.error(`- ${failure}`);
}

if (governanceScore !== 100 || falseClosures.length > 0) process.exit(1);
console.log("Blind-spot governance criterion met; unresolved external work remains explicit.");
