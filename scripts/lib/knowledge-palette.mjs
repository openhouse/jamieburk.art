import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";

const proofById = new Map(proofClaims.map((proof) => [proof.id, proof]));

function evidenceRoleForCandidate(observation, candidateId) {
  return observation?.candidateRelationships?.find((item) => item.candidateClaimId === candidateId)?.evidenceRole
    ?? observation?.evidenceRole;
}

export function retrieveKnowledgePalette(filters = {}) {
  if (filters.publicationSafe && !filters.surface && !filters.proofSurface) {
    throw new Error("Publication-safe retrieval requires an exact surface");
  }
  const proofSurfaceManifest = filters.proofSurface
    ? knowledgeLifecycle.proofSurfaceManifests.find(({ route }) => route === filters.proofSurface)
    : undefined;
  if (filters.proofSurface && !proofSurfaceManifest) throw new Error(`Unknown proof route ${filters.proofSurface}`);
  const exactBrief = filters.briefId
    ? knowledgeLifecycle.editorialBriefs.find(({ id }) => id === filters.briefId)
    : undefined;
  if (filters.briefId && !exactBrief) throw new Error(`Unknown editorial brief ${filters.briefId}`);
  const candidateBriefs = exactBrief
    ? [exactBrief]
    : knowledgeLifecycle.editorialBriefs.filter((brief) =>
      filters.surface
        ? brief.targetSurfaces.includes(filters.surface)
        : (!filters.audienceTag || brief.audienceTags.includes(filters.audienceTag)) &&
          (!filters.purposeTag || brief.purposeTags.includes(filters.purposeTag)) &&
          Boolean(filters.audienceTag || filters.purposeTag)
    );
  const matchingBriefs = filters.publicationSafe && filters.surface
    ? candidateBriefs.filter((brief) => brief.status === "active" && brief.publicationIntent === "public-composition")
    : candidateBriefs;

  const selectedProjectIds = new Set([
    ...matchingBriefs.flatMap(({ projectIds }) => projectIds),
    ...knowledgeLifecycle.projects
      .filter(({ proofIds }) => proofSurfaceManifest?.proofIds.some((id) => proofIds.includes(id)))
      .map(({ id }) => id),
    ...(filters.projectId ? [filters.projectId] : [])
  ]);
  if (filters.projectId && !knowledgeLifecycle.projects.some(({ id }) => id === filters.projectId)) throw new Error(`Unknown project ${filters.projectId}`);
  if (filters.entityId && !knowledgeLifecycle.entities.some(({ id }) => id === filters.entityId)) throw new Error(`Unknown entity ${filters.entityId}`);
  let projects = knowledgeLifecycle.projects.filter((project) =>
    (!selectedProjectIds.size || selectedProjectIds.has(project.id)) &&
    (!filters.capability || project.capabilities.includes(filters.capability)) &&
    (!filters.entityId || project.entityIds.includes(filters.entityId)) &&
    (!filters.fromYear || project.endYear >= filters.fromYear) &&
    (!filters.toYear || project.startYear <= filters.toYear)
  );
  const projectIds = new Set(projects.map(({ id }) => id));
  const projectScopeRequested = Boolean(selectedProjectIds.size || filters.capability || filters.entityId || filters.fromYear || filters.toYear);
  const observationById = new Map(knowledgeLifecycle.observations.map((item) => [item.id, item]));
  const sourceById = new Map(knowledgeBank.sources.map((item) => [item.id, item]));
  const taskById = new Map(knowledgeLifecycle.researchTasks.map((item) => [item.id, item]));
  const decisionById = new Map(knowledgeLifecycle.promotionDecisions.map((item) => [item.id, item]));
  const supersededDecisionIds = new Set(knowledgeLifecycle.promotionDecisions.map(({ supersedesDecisionId }) => supersedesDecisionId).filter(Boolean));
  const activeDecisionsFor = (candidate) => candidate.promotionDecisionIds
    .map((id) => decisionById.get(id))
    .filter((decision) => decision && !supersededDecisionIds.has(decision.id));
  const authorizesSurface = (decision, surface) =>
    ["promote", "correct"].includes(decision.decision) &&
    decision.humanReviewStatus === "approved" &&
    decision.allowedSurfaces.includes(surface);

  let candidates = knowledgeLifecycle.candidateClaims.filter((candidate) =>
    (!projectScopeRequested || candidate.projectIds.some((id) => projectIds.has(id))) &&
    (!filters.maturity || candidate.maturity === filters.maturity) &&
    (!filters.confidence || candidate.confidence === filters.confidence) &&
    (!filters.evidenceRole || candidate.observationIds.some((id) => evidenceRoleForCandidate(observationById.get(id), candidate.id) === filters.evidenceRole)) &&
    (!filters.sourceKind || candidate.observationIds.some((id) => sourceById.get(observationById.get(id)?.sourceId)?.kind === filters.sourceKind)) &&
    (!filters.researchPriority || candidate.researchTaskIds.some((id) => taskById.get(id)?.priority === filters.researchPriority)) &&
    (!matchingBriefs.length || matchingBriefs.some((brief) => brief.candidateClaimIds.includes(candidate.id) || (candidate.targetCanonicalClaimId && brief.canonicalClaimIds.includes(candidate.targetCanonicalClaimId))))
  );
  if (filters.surface) candidates = candidates.filter((candidate) =>
    activeDecisionsFor(candidate).some((decision) =>
      filters.publicationSafe
        ? authorizesSurface(decision, filters.surface)
        : decision.allowedSurfaces.includes(filters.surface)
    )
  );
  if (filters.publicationSafe && filters.proofSurface) candidates = candidates.filter((candidate) =>
    candidate.targetCanonicalClaimId &&
    proofSurfaceManifest.canonicalClaimIds.includes(candidate.targetCanonicalClaimId) &&
    activeDecisionsFor(candidate).some((decision) => authorizesSurface(decision, filters.proofSurface))
  );

  if (filters.publicationSafe && filters.surface) {
    const authorizedProjectIds = new Set(candidates.flatMap(({ projectIds }) => projectIds));
    projects = projects.filter(({ id }) => authorizedProjectIds.has(id));
  }

  const manifestProofs = proofSurfaceManifest
    ? proofSurfaceManifest.proofIds.map((id) => proofById.get(id)).filter(Boolean)
    : [];
  const canonicalIds = new Set([
    ...(!filters.publicationSafe ? matchingBriefs.flatMap(({ canonicalClaimIds }) => canonicalClaimIds) : []),
    ...candidates.map(({ targetCanonicalClaimId }) => targetCanonicalClaimId).filter(Boolean),
    ...(filters.publicationSafe && proofSurfaceManifest
      ? proofSurfaceManifest.canonicalClaimIds
      : [])
  ]);
  const claimFiltersApplied = Boolean(filters.maturity || filters.confidence || filters.evidenceRole || filters.sourceKind || filters.researchPriority || filters.surface || filters.proofSurface);
  const canonicalClaims = filters.publicationSafe && proofSurfaceManifest
    ? proofSurfaceManifest.canonicalClaimIds.map((id) => knowledgeBank.claims.find((claim) => claim.id === id)).filter(Boolean)
    : knowledgeBank.claims.filter((claim) =>
      (canonicalIds.has(claim.id) || (!matchingBriefs.length && !claimFiltersApplied && projects.some(({ canonicalProjectKeys }) => canonicalProjectKeys.includes(claim.project)))) &&
      (!projectScopeRequested || projects.some(({ canonicalProjectKeys }) => canonicalProjectKeys.includes(claim.project)))
    );
  const selectedProofIds = new Set(proofSurfaceManifest?.proofIds ?? (
    filters.publicationSafe && filters.surface
      ? proofClaims
        .filter(({ canonicalClaimIds = [] }) => canonicalClaimIds.some((id) => canonicalIds.has(id)))
        .map(({ id }) => id)
      : projects.flatMap(({ proofIds }) => proofIds)
  ));
  const proofs = proofSurfaceManifest
    ? manifestProofs
    : proofClaims.filter(({ id }) => selectedProofIds.has(id));
  const candidateIds = new Set(candidates.map(({ id }) => id));
  const selectedObservations = filters.publicationSafe
    ? []
    : knowledgeLifecycle.observations.filter((observation) => candidates.some(({ observationIds }) => observationIds.includes(observation.id)));
  const selectedSourceIds = new Set([
    ...selectedObservations.map(({ sourceId }) => sourceId),
    ...canonicalClaims.flatMap(({ evidence }) => evidence.map(({ sourceId }) => sourceId))
  ]);
  const selectedEntityIds = new Set([
    ...projects.flatMap(({ entityIds }) => entityIds),
    ...selectedObservations.flatMap(({ entityIds }) => entityIds)
  ]);
  const mediaLeads = knowledgeLifecycle.mediaLeads.filter((item) =>
    (matchingBriefs.some(({ mediaLeadIds }) => mediaLeadIds.includes(item.id)) || (!matchingBriefs.length && item.projectIds.some((id) => projectIds.has(id)))) &&
    (!projectScopeRequested || item.projectIds.some((id) => projectIds.has(id))) &&
    (!filters.publicationSafe || (
      item.candidateClaimIds.some((id) => candidateIds.has(id)) &&
      item.rightsStatus === "cleared" &&
      ["cleared", "not-applicable"].includes(item.consentStatus) &&
      item.displayStatus === "candidate"
    ))
  );

  return {
    filters,
    brief: exactBrief ?? null,
    proofSurfaceManifest: proofSurfaceManifest ?? null,
    briefs: matchingBriefs,
    projects,
    candidates,
    publicationAuthorizations: filters.surface
      ? candidates.map((candidate) => ({
          candidateClaimId: candidate.id,
          surface: filters.surface,
          authorized: activeDecisionsFor(candidate).some((decision) => authorizesSurface(decision, filters.surface)),
          decisionIds: activeDecisionsFor(candidate)
            .filter((decision) => decision.allowedSurfaces.includes(filters.surface))
            .map(({ id }) => id)
        }))
      : [],
    canonicalClaims,
    observations: selectedObservations,
    sources: filters.publicationSafe ? [] : knowledgeBank.sources.filter(({ id }) => selectedSourceIds.has(id)),
    entities: filters.publicationSafe ? [] : knowledgeLifecycle.entities.filter(({ id }) => selectedEntityIds.has(id)),
    proofs,
    researchTasks: filters.publicationSafe
      ? []
      : knowledgeLifecycle.researchTasks.filter((task) => task.candidateClaimIds.some((id) => candidateIds.has(id))),
    mediaLeads: filters.publicationSafe ? [] : mediaLeads
  };
}
