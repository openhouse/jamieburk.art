import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";

export function retrieveKnowledgePalette(filters = {}) {
  if (filters.publicationSafe && !filters.surface) throw new Error("Publication-safe retrieval requires an exact surface");
  const exactBrief = filters.briefId
    ? knowledgeLifecycle.editorialBriefs.find(({ id }) => id === filters.briefId)
    : undefined;
  if (filters.briefId && !exactBrief) throw new Error(`Unknown editorial brief ${filters.briefId}`);
  const matchingBriefs = exactBrief
    ? [exactBrief]
    : knowledgeLifecycle.editorialBriefs.filter((brief) =>
      (!filters.audienceTag || brief.audienceTags.includes(filters.audienceTag)) &&
      (!filters.purposeTag || brief.purposeTags.includes(filters.purposeTag)) &&
      Boolean(filters.audienceTag || filters.purposeTag)
    );

  const selectedProjectIds = new Set([
    ...matchingBriefs.flatMap(({ projectIds }) => projectIds),
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
    (!filters.evidenceRole || candidate.observationIds.some((id) => observationById.get(id)?.evidenceRole === filters.evidenceRole)) &&
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

  const canonicalIds = new Set([
    ...matchingBriefs.flatMap(({ canonicalClaimIds }) => canonicalClaimIds),
    ...candidates.map(({ targetCanonicalClaimId }) => targetCanonicalClaimId).filter(Boolean)
  ]);
  const claimFiltersApplied = Boolean(filters.maturity || filters.confidence || filters.evidenceRole || filters.sourceKind || filters.researchPriority || filters.surface);
  const canonicalClaims = knowledgeBank.claims.filter((claim) =>
    (canonicalIds.has(claim.id) || (!matchingBriefs.length && !claimFiltersApplied && projects.some(({ canonicalProjectKeys }) => canonicalProjectKeys.includes(claim.project)))) &&
    (!projectScopeRequested || projects.some(({ canonicalProjectKeys }) => canonicalProjectKeys.includes(claim.project)))
  );
  const selectedProofIds = new Set(projects.flatMap(({ proofIds }) => proofIds));
  const proofs = proofClaims.filter(({ id }) => selectedProofIds.has(id));

  return {
    filters,
    brief: exactBrief ?? null,
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
    proofs,
    researchTasks: knowledgeLifecycle.researchTasks.filter((task) => task.candidateClaimIds.some((id) => candidates.some((candidate) => candidate.id === id))),
    mediaLeads: knowledgeLifecycle.mediaLeads.filter((item) =>
      (matchingBriefs.some(({ mediaLeadIds }) => mediaLeadIds.includes(item.id)) || (!matchingBriefs.length && item.projectIds.some((id) => projectIds.has(id)))) &&
      (!projectScopeRequested || item.projectIds.some((id) => projectIds.has(id)))
    )
  };
}
