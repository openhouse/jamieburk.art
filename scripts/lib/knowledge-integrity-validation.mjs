import { createHash } from "node:crypto";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function duplicateIds(items) {
  const seen = new Set();
  return items.map(({ id }) => id).filter((id) => seen.has(id) || !seen.add(id));
}

export const integrityArtifactPaths = [
  "docs/knowledge-bank/intake/receipts.jsonl",
  "docs/knowledge-bank/intake/amendments.jsonl",
  "docs/knowledge-bank/governance/retirements.jsonl",
  "docs/knowledge-bank/corpora/wowlist-facebook-posts-acquisition-manifest.json",
  "docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.manifest.json",
  "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-acquisition-control.json",
  "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.manifest.json",
  "docs/knowledge-bank/corpora/personal-facebook-posts-full-population.manifest.json",
];

export function validateIntegrityCheckpoints(checkpoints, artifactTexts) {
  const errors = [];
  for (const id of duplicateIds(checkpoints)) errors.push(`Duplicate knowledge-integrity checkpoint ID: ${id}`);
  checkpoints.forEach((checkpoint, index) => {
    const expectedPrevious = index === 0 ? null : sha256(JSON.stringify(checkpoints[index - 1]));
    if (checkpoint.previousCheckpointSha256 !== expectedPrevious) errors.push(`Knowledge-integrity checkpoint ${checkpoint.id} breaks the checkpoint chain`);
  });
  const latest = checkpoints.at(-1);
  if (!latest) return ["Knowledge-integrity checkpoint log is empty"];
  const expectedPaths = [...integrityArtifactPaths].sort();
  const actualPaths = Object.keys(latest.artifacts).sort();
  if (JSON.stringify(actualPaths) !== JSON.stringify(expectedPaths)) errors.push("Latest knowledge-integrity checkpoint does not bind every governed artifact");
  for (const path of integrityArtifactPaths) {
    if (!(path in artifactTexts)) {
      errors.push(`Knowledge-integrity check did not load ${path}`);
      continue;
    }
    if (latest.artifacts[path] !== sha256(artifactTexts[path])) errors.push(`Knowledge-integrity digest mismatch for ${path}`);
  }
  return errors;
}

export function validateRetirementLedger(retirements, lifecycle, knowledgeBank) {
  const errors = [];
  for (const id of duplicateIds(retirements)) errors.push(`Duplicate retirement event ID: ${id}`);
  const eventsByDecision = new Map(retirements.map((item) => [item.decisionId, item]));
  const decisions = new Map(lifecycle.promotionDecisions.map((item) => [item.id, item]));
  const supersededIds = new Set(lifecycle.promotionDecisions.map(({ supersedesDecisionId }) => supersedesDecisionId).filter(Boolean));
  const activeDecisionsFor = (candidate) => candidate.promotionDecisionIds
    .map((id) => decisions.get(id))
    .filter((decision) => decision && !supersededIds.has(decision.id));

  for (const decision of lifecycle.promotionDecisions.filter(({ decision }) => decision === "retire")) {
    if (!eventsByDecision.has(decision.id)) errors.push(`Retire decision ${decision.id} has no append-only retirement event`);
  }
  for (const event of retirements) {
    const decision = decisions.get(event.decisionId);
    const candidate = lifecycle.candidateClaims.find(({ id }) => id === event.candidateClaimId);
    const claim = knowledgeBank.claims.find(({ id }) => id === event.canonicalClaimId);
    if (!decision || decision.decision !== "retire") {
      errors.push(`Retirement event ${event.id} has no current retire decision`);
      continue;
    }
    if (!candidate?.promotionDecisionIds.includes(event.decisionId)) errors.push(`Retirement event ${event.id} is not retained by its candidate`);
    if (decision.candidateClaimId !== event.candidateClaimId || decision.targetCanonicalClaimId !== event.canonicalClaimId) errors.push(`Retirement event ${event.id} target drifted from its decision`);
    if (decision.supersedesDecisionId !== event.supersedesDecisionId) errors.push(`Retirement event ${event.id} supersession drifted from its decision`);
    if (JSON.stringify(decision.retiredSurfaces) !== JSON.stringify(event.retiredSurfaces)) errors.push(`Retirement event ${event.id} surface history drifted from its decision`);
    for (const surface of event.retiredSurfaces) {
      if (!claim?.projections.some((projection) => projection.status !== "active" && projection.surfaces.includes(surface))) errors.push(`Retirement event ${event.id} lost inactive canonical history for ${surface}`);
      if (candidate && activeDecisionsFor(candidate).some((item) => ["promote", "correct"].includes(item.decision) && item.allowedSurfaces.includes(surface))) errors.push(`Retirement event ${event.id} surface ${surface} was reauthorized without a new governed restoration event`);
    }
  }
  return errors;
}
