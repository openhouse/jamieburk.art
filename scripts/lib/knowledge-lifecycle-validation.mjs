import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  homepageProofs,
  proofClaims,
  resumeProofHighlights,
  technicalOperationsProofRows
} from "../../apps/www/src/data/proofs.ts";

const forbiddenPrivatePatterns = [
  /\/Users\//i,
  /\/Volumes\//i,
  /\/private\//i,
  /file:\/\//i,
  /Library\/Mobile Documents/i,
  /Library\/CloudStorage/i
];

function duplicateIds(items) {
  const seen = new Set();
  return items.map((item) => item.id).filter((id) => seen.has(id) || !seen.add(id));
}

function allStrings(value, strings = []) {
  if (typeof value === "string") strings.push(value);
  else if (Array.isArray(value)) value.forEach((item) => allStrings(item, strings));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => allStrings(item, strings));
  return strings;
}

function checkRefs(errors, owner, values, index, label) {
  for (const value of values) if (!index.has(value)) errors.push(`${owner} references unknown ${label} ${value}`);
}

export function validateKnowledgeLifecycle(input = knowledgeLifecycle) {
  const errors = [];
  const collections = [
    ["entity", input.entities], ["project", input.projects], ["lead", input.leads],
    ["observation", input.observations], ["candidate claim", input.candidateClaims],
    ["candidate event", input.candidateEvents],
    ["research task", input.researchTasks], ["promotion decision", input.promotionDecisions],
    ["editorial brief", input.editorialBriefs], ["proof surface manifest", input.proofSurfaceManifests],
    ["media lead", input.mediaLeads]
  ];
  for (const [label, items] of collections) for (const id of duplicateIds(items)) errors.push(`Duplicate ${label} ID: ${id}`);

  const entities = new Set(input.entities.map(({ id }) => id));
  const projects = new Set(input.projects.map(({ id }) => id));
  const leads = new Set(input.leads.map(({ id }) => id));
  const observations = new Set(input.observations.map(({ id }) => id));
  const candidates = new Map(input.candidateClaims.map((item) => [item.id, item]));
  const tasks = new Set(input.researchTasks.map(({ id }) => id));
  const decisions = new Map(input.promotionDecisions.map((item) => [item.id, item]));
  const media = new Set(input.mediaLeads.map(({ id }) => id));
  const sources = new Set(knowledgeBank.sources.map(({ id }) => id));
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const campaignPressArticleIds = new Set(
    knowledgeBank.sourceCollections.flatMap(({ itemSourceIds }) => itemSourceIds)
  );
  const canonicalClaims = new Set(knowledgeBank.claims.map(({ id }) => id));
  const canonicalClaimById = new Map(knowledgeBank.claims.map((item) => [item.id, item]));
  const proofIds = new Set(proofClaims.map(({ id }) => id));
  const proofById = new Map(proofClaims.map((item) => [item.id, item]));
  const supersededDecisionIds = new Set(
    input.promotionDecisions.map(({ supersedesDecisionId }) => supersedesDecisionId).filter(Boolean)
  );
  const activeDecisionsFor = (candidate) => candidate.promotionDecisionIds
    .map((id) => decisions.get(id))
    .filter((decision) => decision && !supersededDecisionIds.has(decision.id));
  const authorizesSurface = (decision, surface) =>
    ["promote", "correct"].includes(decision.decision) &&
    decision.humanReviewStatus === "approved" &&
    decision.allowedSurfaces.includes(surface);

  for (const project of input.projects) {
    if (project.startYear > project.endYear) errors.push(`Project ${project.id} starts after it ends`);
    checkRefs(errors, `Project ${project.id}`, project.entityIds, entities, "entity");
    checkRefs(errors, `Project ${project.id}`, project.proofIds, proofIds, "proof");
  }

  for (const collection of knowledgeBank.sourceCollections) {
    checkRefs(errors, `Source collection ${collection.id}`, collection.projectIds, projects, "project");
  }

  for (const lead of input.leads) {
    if (!lead.projectIds.length) errors.push(`Lead ${lead.id} has no project association`);
    if (lead.kind === "source-url" && !lead.sourceIds.length && !lead.publicUrl) errors.push(`Source URL lead ${lead.id} has neither a public URL nor canonical source`);
    if (lead.visibility === "private-reference" && !lead.protectedLocatorId) errors.push(`Private-reference lead ${lead.id} has no opaque locator`);
    if (lead.visibility === "private-reference" && lead.publicUrl) errors.push(`Private-reference lead ${lead.id} exposes a public URL`);
    if (lead.visibility !== "private-reference" && lead.protectedLocatorId) errors.push(`Lead ${lead.id} exposes a protected locator outside private-reference state`);
    if (lead.duplicateOfLeadId && !leads.has(lead.duplicateOfLeadId)) errors.push(`Lead ${lead.id} references unknown duplicate ${lead.duplicateOfLeadId}`);
    if (lead.duplicateOfLeadId === lead.id) errors.push(`Lead ${lead.id} cannot duplicate itself`);
    checkRefs(errors, `Lead ${lead.id}`, lead.projectIds, projects, "project");
    checkRefs(errors, `Lead ${lead.id}`, lead.entityIds, entities, "entity");
    checkRefs(errors, `Lead ${lead.id}`, lead.sourceIds, sources, "source");
    checkRefs(errors, `Lead ${lead.id}`, lead.candidateClaimIds, candidates, "candidate claim");
    checkRefs(errors, `Lead ${lead.id}`, lead.researchTaskIds, tasks, "research task");
  }

  for (const observation of input.observations) {
    if (!sources.has(observation.sourceId)) errors.push(`Observation ${observation.id} references unknown source ${observation.sourceId}`);
    const source = sourceById.get(observation.sourceId);
    if (source?.visibility === "public" && (!source.metadataVerifiedAt || !source.metadataVerifiedBy)) errors.push(`Observation ${observation.id} uses public source ${source.id} without metadata verification`);
    if (campaignPressArticleIds.has(observation.sourceId) && source?.reviewStatus !== "close-read") errors.push(`Observation ${observation.id} uses campaign-listed source ${observation.sourceId} before close reading`);
    if (!/(page|paragraph|section|opening|dated|caption|visible|metadata|passage|announcement|repository)/i.test(observation.locator)) errors.push(`Observation ${observation.id} has a non-reproducible locator: ${observation.locator}`);
    if (!observation.projectIds.length) errors.push(`Observation ${observation.id} has no project association`);
    checkRefs(errors, `Observation ${observation.id}`, observation.projectIds, projects, "project");
    checkRefs(errors, `Observation ${observation.id}`, observation.entityIds, entities, "entity");
    checkRefs(errors, `Observation ${observation.id}`, observation.candidateClaimIds, candidates, "candidate claim");
    for (const id of observation.candidateClaimIds) {
      const candidate = candidates.get(id);
      if (candidate && !candidate.observationIds.includes(observation.id)) errors.push(`Observation ${observation.id} is not linked back from candidate ${id}`);
      if (candidate && !observation.projectIds.some((projectId) => candidate.projectIds.includes(projectId))) errors.push(`Observation ${observation.id} has no project overlap with candidate ${id}`);
    }
  }

  for (const candidate of input.candidateClaims) {
    if (!candidate.observationIds.length && !candidate.researchTaskIds.length) errors.push(`Candidate ${candidate.id} has neither observations nor research work`);
    checkRefs(errors, `Candidate ${candidate.id}`, candidate.projectIds, projects, "project");
    checkRefs(errors, `Candidate ${candidate.id}`, candidate.observationIds, observations, "observation");
    checkRefs(errors, `Candidate ${candidate.id}`, candidate.researchTaskIds, tasks, "research task");
    checkRefs(errors, `Candidate ${candidate.id}`, candidate.promotionDecisionIds, decisions, "promotion decision");
    if (candidate.targetCanonicalClaimId && !canonicalClaims.has(candidate.targetCanonicalClaimId)) errors.push(`Candidate ${candidate.id} targets unknown canonical claim ${candidate.targetCanonicalClaimId}`);
    for (const id of candidate.observationIds) {
      const observation = input.observations.find((item) => item.id === id);
      if (observation && !observation.candidateClaimIds.includes(candidate.id)) errors.push(`Candidate ${candidate.id} is not linked back from observation ${id}`);
      if (observation && !observation.projectIds.some((projectId) => candidate.projectIds.includes(projectId))) errors.push(`Candidate ${candidate.id} has no project overlap with observation ${id}`);
    }
    if (candidate.targetCanonicalClaimId) {
      const canonicalProject = canonicalClaimById.get(candidate.targetCanonicalClaimId)?.project;
      const mapped = input.projects.filter(({ id }) => candidate.projectIds.includes(id)).some(({ canonicalProjectKeys }) => canonicalProjectKeys.includes(canonicalProject));
      if (!mapped) errors.push(`Candidate ${candidate.id} canonical target project is not mapped from its lifecycle project`);
    }
    if (candidate.maturity === "promoted") {
      if (!candidate.targetCanonicalClaimId) errors.push(`Promoted candidate ${candidate.id} has no canonical target`);
      const promoted = candidate.promotionDecisionIds.some((id) => decisions.get(id)?.decision === "promote");
      if (!promoted) errors.push(`Promoted candidate ${candidate.id} has no promote decision`);
      const canonicalSourceIds = new Set([
        ...(canonicalClaimById.get(candidate.targetCanonicalClaimId)?.evidence.map(({ sourceId }) => sourceId) ?? []),
        ...knowledgeBank.corrections
          .filter(({ claimId }) => claimId === candidate.targetCanonicalClaimId)
          .flatMap(({ sourceIds }) => sourceIds ?? [])
      ]);
      for (const observationId of candidate.observationIds) {
        const sourceId = input.observations.find(({ id }) => id === observationId)?.sourceId;
        if (sourceId && !canonicalSourceIds.has(sourceId)) errors.push(`Promoted candidate ${candidate.id} observation ${observationId} is not reconciled with canonical evidence or correction provenance`);
      }
    }
    if (candidate.publicEvidenceQualifier && candidate.targetCanonicalClaimId) {
      const qualifier = candidate.publicEvidenceQualifier;
      const isQualified = (text) => {
        const value = text.toLowerCase();
        const carriesMetric = qualifier.appliesTo.some((phrase) => value.includes(phrase.toLowerCase()));
        return !carriesMetric || qualifier.acceptedPhrases.some((phrase) => value.includes(phrase.toLowerCase()));
      };
      const claim = canonicalClaimById.get(candidate.targetCanonicalClaimId);
      for (const projection of claim?.projections.filter(({ status }) => status === "active") ?? []) {
        if (!isQualified(projection.text)) errors.push(`Active projection ${claim.id}/${projection.key} drops the ${qualifier.kind} evidence qualifier`);
      }
      const projectKeys = input.projects
        .filter(({ id }) => candidate.projectIds.includes(id))
        .flatMap(({ canonicalProjectKeys }) => canonicalProjectKeys);
      for (const proof of proofClaims.filter(({ relatedProjects }) => relatedProjects.some((key) => projectKeys.includes(key)))) {
        for (const field of ["publicWording", "shortWording", "detailedPublicWording", "guardrail"]) {
          if (!isQualified(proof[field])) errors.push(`Proof ${proof.id} ${field} drops the ${qualifier.kind} evidence qualifier`);
        }
      }
    }
    const history = input.candidateEvents.filter(({ candidateClaimId }) => candidateClaimId === candidate.id);
    if (!history.length) errors.push(`Candidate ${candidate.id} has no append-only maturity event`);
    let prior;
    for (const event of history) {
      if (prior && event.fromMaturity !== prior.toMaturity) errors.push(`Candidate ${candidate.id} has a broken maturity transition at ${event.id}`);
      prior = event;
    }
    if (prior && prior.toMaturity !== candidate.maturity) errors.push(`Candidate ${candidate.id} maturity differs from its latest event`);
  }

  for (const event of input.candidateEvents) {
    const candidate = candidates.get(event.candidateClaimId);
    if (!candidate) errors.push(`Candidate event ${event.id} references unknown candidate ${event.candidateClaimId}`);
    if (event.decisionId) {
      const decision = decisions.get(event.decisionId);
      if (!decision) errors.push(`Candidate event ${event.id} references unknown decision ${event.decisionId}`);
      if (decision && decision.candidateClaimId !== event.candidateClaimId) errors.push(`Candidate event ${event.id} references a decision for another candidate`);
    }
  }

  for (const task of input.researchTasks) {
    checkRefs(errors, `Research task ${task.id}`, task.candidateClaimIds, candidates, "candidate claim");
    checkRefs(errors, `Research task ${task.id}`, task.sourceIds, sources, "source");
    checkRefs(errors, `Research task ${task.id}`, task.observationIds, observations, "observation");
    for (const id of task.candidateClaimIds) if (!candidates.get(id)?.researchTaskIds.includes(task.id)) errors.push(`Research task ${task.id} is not linked back from candidate ${id}`);
    for (const observationId of task.observationIds) {
      const observation = input.observations.find(({ id }) => id === observationId);
      for (const candidateId of observation?.candidateClaimIds ?? []) if (!task.candidateClaimIds.includes(candidateId)) errors.push(`Research task ${task.id} observation ${observationId} implicates unlinked candidate ${candidateId}`);
    }
    if (task.status === "completed" && !task.completedAt) errors.push(`Completed research task ${task.id} has no completion date`);
    if (task.status === "completed" && !task.findings.length) errors.push(`Completed research task ${task.id} has no findings`);
    if (task.status !== "completed" && task.completedAt) errors.push(`Incomplete research task ${task.id} has a completion date`);
  }

  for (const decision of input.promotionDecisions) {
    const candidate = candidates.get(decision.candidateClaimId);
    if (!candidate) errors.push(`Decision ${decision.id} references unknown candidate ${decision.candidateClaimId}`);
    if (!candidate?.promotionDecisionIds.includes(decision.id)) errors.push(`Decision ${decision.id} is not linked back from candidate ${decision.candidateClaimId}`);
    if (decision.supersedesDecisionId && !decisions.has(decision.supersedesDecisionId)) errors.push(`Decision ${decision.id} supersedes unknown decision ${decision.supersedesDecisionId}`);
    if (decision.supersedesDecisionId === decision.id) errors.push(`Decision ${decision.id} cannot supersede itself`);
    if (decision.supersedesDecisionId && decisions.get(decision.supersedesDecisionId)?.candidateClaimId !== decision.candidateClaimId) errors.push(`Decision ${decision.id} supersedes a decision for another candidate`);
    if (decision.targetCanonicalClaimId && !canonicalClaims.has(decision.targetCanonicalClaimId)) errors.push(`Decision ${decision.id} targets unknown canonical claim ${decision.targetCanonicalClaimId}`);
    if (decision.targetCanonicalClaimId && candidate?.targetCanonicalClaimId && decision.targetCanonicalClaimId !== candidate.targetCanonicalClaimId) errors.push(`Decision ${decision.id} target differs from candidate target`);
    if (decision.humanReviewStatus === "approved" && !decision.humanReviewer) errors.push(`Approved decision ${decision.id} has no human reviewer`);
    if (decision.reviewAuthority === "jamie-approved" && decision.humanReviewStatus !== "approved") errors.push(`Jamie-approved decision ${decision.id} is not human-approved`);
    if (decision.decision === "promote") {
      if (!decision.targetCanonicalClaimId) errors.push(`Promote decision ${decision.id} has no canonical target`);
      if (decision.targetCanonicalClaimId && !canonicalClaims.has(decision.targetCanonicalClaimId)) errors.push(`Decision ${decision.id} targets unknown canonical claim ${decision.targetCanonicalClaimId}`);
      if (!decision.allowedSurfaces.length) errors.push(`Promote decision ${decision.id} has no allowed surfaces`);
      if (candidate?.maturity !== "promoted") errors.push(`Promote decision ${decision.id} belongs to non-promoted candidate`);
    }
  }

  for (const start of input.promotionDecisions) {
    const seen = new Set([start.id]);
    let current = start;
    while (current.supersedesDecisionId) {
      if (seen.has(current.supersedesDecisionId)) {
        errors.push(`Promotion decision supersession cycle begins at ${start.id}`);
        break;
      }
      seen.add(current.supersedesDecisionId);
      current = decisions.get(current.supersedesDecisionId);
      if (!current) break;
    }
  }

  for (const claim of knowledgeBank.claims) {
    const lifecycleCandidates = input.candidateClaims.filter(
      (candidate) => candidate.targetCanonicalClaimId === claim.id
    );
    for (const projection of claim.projections.filter(({ status }) => status === "active")) {
      for (const surface of projection.surfaces) {
        const authorized = lifecycleCandidates.some((candidate) =>
          candidate.maturity === "promoted" &&
          activeDecisionsFor(candidate).some((decision) => authorizesSurface(decision, surface))
        );
        if (!authorized) errors.push(`Active canonical projection ${claim.id} lacks current human approval for ${surface}`);
      }
    }
  }

  for (const correction of knowledgeBank.corrections) {
    const decision = correction.decisionId ? decisions.get(correction.decisionId) : undefined;
    const directlyApproved = Boolean(correction.approvedAt && correction.approvedBy?.length);
    const decisionApproved = Boolean(
      decision &&
      decision.humanReviewStatus === "approved" &&
      decision.humanReviewer &&
      decision.targetCanonicalClaimId === correction.claimId
    );
    if (!directlyApproved && !decisionApproved) errors.push(`Correction ${correction.id} lacks direct human approval or an approved linked decision`);
  }

  for (const brief of input.editorialBriefs) {
    checkRefs(errors, `Editorial brief ${brief.id}`, brief.projectIds, projects, "project");
    checkRefs(errors, `Editorial brief ${brief.id}`, brief.canonicalClaimIds, canonicalClaims, "canonical claim");
    checkRefs(errors, `Editorial brief ${brief.id}`, brief.candidateClaimIds, candidates, "candidate claim");
    checkRefs(errors, `Editorial brief ${brief.id}`, brief.mediaLeadIds, media, "media lead");
    if (brief.publicationIntent === "public-composition") {
      if (!brief.targetSurfaces.length) errors.push(`Public brief ${brief.id} has no target surface`);
      for (const id of brief.candidateClaimIds) {
        const candidate = candidates.get(id);
        if (candidate?.maturity !== "promoted") errors.push(`Public brief ${brief.id} requires unpromoted candidate ${id}`);
        const activeDecisions = candidate ? activeDecisionsFor(candidate) : [];
        for (const surface of brief.targetSurfaces) {
          const authorized = activeDecisions.some((decision) =>
            ["promote", "correct"].includes(decision.decision) &&
            decision.humanReviewStatus === "approved" &&
            decision.allowedSurfaces.includes(surface)
          );
          if (!authorized) errors.push(`Public brief ${brief.id} candidate ${id} lacks active human approval for ${surface}`);
        }
      }
      for (const claimId of brief.canonicalClaimIds) {
        const onTarget = knowledgeBank.pages.some((page) => brief.targetSurfaces.includes(page.surface) && page.occurrences.some((occurrence) => occurrence.claimId === claimId));
        if (!onTarget) errors.push(`Public brief ${brief.id} claim ${claimId} is not present on a target page`);
        const lifecycleCandidates = input.candidateClaims.filter((candidate) => candidate.targetCanonicalClaimId === claimId && brief.candidateClaimIds.includes(candidate.id));
        if (!lifecycleCandidates.length) errors.push(`Public brief ${brief.id} canonical claim ${claimId} bypasses lifecycle promotion`);
      }
      for (const surface of brief.targetSurfaces) {
        const page = knowledgeBank.pages.find((item) => item.surface === surface);
        const excluded = new Set(brief.pageClaimExclusions.map(({ claimId }) => claimId));
        for (const claimId of new Set(page?.occurrences.map(({ claimId }) => claimId) ?? [])) if (!brief.canonicalClaimIds.includes(claimId) && !excluded.has(claimId)) errors.push(`Public brief ${brief.id} neither selects nor explicitly excludes page claim ${claimId}`);
      }
    }
  }

  const manifestsByRoute = new Map();
  for (const manifest of input.proofSurfaceManifests) {
    if (manifestsByRoute.has(manifest.route)) errors.push(`Multiple proof surface manifests govern ${manifest.route}`);
    manifestsByRoute.set(manifest.route, manifest);
    if (manifest.reviewAuthority !== "jamie-approved" || manifest.humanReviewStatus !== "approved" || !manifest.humanReviewer) {
      errors.push(`Proof surface manifest ${manifest.id} lacks active human approval`);
    }
    checkRefs(errors, `Proof surface manifest ${manifest.id}`, manifest.proofIds, proofIds, "proof");
    for (const proofId of manifest.proofIds) {
      if (!proofById.get(proofId)?.surfaces.includes(manifest.surface)) {
        errors.push(`Proof surface manifest ${manifest.id} selects ${proofId} outside ${manifest.surface}`);
      }
    }
  }

  const renderedProofsByRoute = new Map([
    ["/", homepageProofs.map(({ id }) => id)],
    ["/resume", resumeProofHighlights.map(({ id }) => id)],
    ["/work/technical-operations", [...new Set(technicalOperationsProofRows.flatMap(({ proofIds }) => proofIds))]]
  ]);
  for (const [route, renderedProofIds] of renderedProofsByRoute) {
    const manifest = manifestsByRoute.get(route);
    if (!manifest) {
      errors.push(`Rendered proof route ${route} has no exact-route manifest`);
      continue;
    }
    for (const proofId of renderedProofIds) {
      if (!manifest.proofIds.includes(proofId)) errors.push(`Rendered proof ${proofId} is not human-approved for ${route}`);
    }
  }

  for (const proof of proofClaims.filter(({ status }) => ["ready", "careful"].includes(status))) {
    for (const surface of proof.surfaces.filter((value) => value !== "internal-only")) {
      const manifest = input.proofSurfaceManifests.find((item) => item.surface === surface && item.proofIds.includes(proof.id));
      if (!manifest) {
        errors.push(`Public proof ${proof.id} lacks exact-surface human approval for ${surface}`);
      }
    }
  }

  for (const item of input.mediaLeads) {
    checkRefs(errors, `Media lead ${item.id}`, item.projectIds, projects, "project");
    checkRefs(errors, `Media lead ${item.id}`, item.candidateClaimIds, candidates, "candidate claim");
    checkRefs(errors, `Media lead ${item.id}`, item.researchTaskIds, tasks, "research task");
    checkRefs(errors, `Media lead ${item.id}`, item.sourceIds, sources, "source");
    if (!item.protectedLocatorId && !item.sourceIds.length) errors.push(`Media lead ${item.id} has neither an opaque locator nor a canonical source`);
    if (item.displayStatus === "candidate" && (item.rightsStatus !== "cleared" || !["cleared", "not-applicable"].includes(item.consentStatus))) errors.push(`Display candidate ${item.id} lacks rights or consent clearance`);
  }

  for (const value of allStrings(input)) for (const pattern of forbiddenPrivatePatterns) if (pattern.test(value)) errors.push(`Lifecycle contains a private filesystem locator: ${value}`);
  return errors;
}

export function validateIntakeReceipts(receipts, input = knowledgeLifecycle, amendments = []) {
  const errors = [];
  const projects = new Set(input.projects.map(({ id }) => id));
  const entities = new Set(input.entities.map(({ id }) => id));
  const sources = new Set(knowledgeBank.sources.map(({ id }) => id));
  const receiptById = new Map(receipts.map((receipt) => [receipt.id, receipt]));
  const amendmentByReceiptField = new Map(
    amendments.map((amendment) => [`${amendment.receiptId}:${amendment.field}`, amendment])
  );
  for (const id of duplicateIds(receipts)) errors.push(`Duplicate intake receipt ID: ${id}`);
  for (const id of duplicateIds(amendments)) errors.push(`Duplicate intake amendment ID: ${id}`);
  for (const receipt of receipts) {
    checkRefs(errors, `Receipt ${receipt.id}`, receipt.initialProjectIds, projects, "project");
    checkRefs(errors, `Receipt ${receipt.id}`, receipt.initialEntityIds, entities, "entity");
    checkRefs(errors, `Receipt ${receipt.id}`, receipt.initialSourceIds, sources, "source");
    const incorporated = input.leads.find(({ id }) => id === receipt.id);
    if (incorporated) {
      for (const key of ["title", "kind", "capturedAt", "capturedBy", "visibility", "publicSummary", "publicUrl", "protectedLocatorId", "duplicateOfLeadId"]) {
        if (incorporated[key] === receipt[key]) continue;
        const amendment = amendmentByReceiptField.get(`${receipt.id}:${key}`);
        if (!amendment) {
          errors.push(`Receipt ${receipt.id} immutable field ${key} differs from incorporated lead without an amendment`);
          continue;
        }
        if (amendment.previousValue !== receipt[key]) errors.push(`Amendment ${amendment.id} previous value differs from receipt ${receipt.id}/${key}`);
        if (amendment.replacementValue !== incorporated[key]) errors.push(`Amendment ${amendment.id} replacement value differs from lead ${receipt.id}/${key}`);
      }
    }
  }
  for (const amendment of amendments) {
    if (!receiptById.has(amendment.receiptId)) errors.push(`Amendment ${amendment.id} references unknown receipt ${amendment.receiptId}`);
    checkRefs(errors, `Amendment ${amendment.id}`, amendment.sourceIds, sources, "source");
    const lead = input.leads.find(({ id }) => id === amendment.receiptId);
    if (!lead) errors.push(`Amendment ${amendment.id} references a receipt with no incorporated lead`);
    if (lead && lead[amendment.field] !== amendment.replacementValue) errors.push(`Amendment ${amendment.id} is not the effective current ${amendment.field}`);
  }
  const receiptIds = new Set(receipts.map(({ id }) => id));
  for (const lead of input.leads) if (!receiptIds.has(lead.id)) errors.push(`Lead ${lead.id} has no append-only intake receipt`);
  for (const value of allStrings(receipts)) for (const pattern of forbiddenPrivatePatterns) if (pattern.test(value)) errors.push(`Intake receipt contains a private filesystem locator: ${value}`);
  for (const value of allStrings(amendments)) for (const pattern of forbiddenPrivatePatterns) if (pattern.test(value)) errors.push(`Intake amendment contains a private filesystem locator: ${value}`);
  return errors;
}

export function knowledgeLifecycleReport(input = knowledgeLifecycle) {
  const by = (items, key) => Object.fromEntries(Object.entries(items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] ?? 0) + 1;
    return acc;
  }, {})).sort());
  return {
    entities: input.entities.length,
    projects: input.projects.length,
    leads: input.leads.length,
    leadStates: by(input.leads, "state"),
    observations: input.observations.length,
    candidates: input.candidateClaims.length,
    maturity: by(input.candidateClaims, "maturity"),
    researchTasks: input.researchTasks.length,
    researchStatus: by(input.researchTasks, "status"),
    decisions: input.promotionDecisions.length,
    decisionTypes: by(input.promotionDecisions, "decision"),
    editorialBriefs: input.editorialBriefs.length,
    proofSurfaceManifests: input.proofSurfaceManifests.length,
    mediaLeads: input.mediaLeads.length,
    sourceCollections: knowledgeBank.sourceCollections.length,
    campaignPressListings: knowledgeBank.sourceCollections.reduce((total, collection) => total + collection.itemSourceIds.length, 0)
  };
}
