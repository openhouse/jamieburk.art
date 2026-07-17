const LOCAL_PATH_PATTERN = /(?:\/private\/tmp\/|\/Users\/|\/Volumes\/|Mobile Documents)/i;

function countBy(records, field) {
  return Object.fromEntries(
    [...records.reduce((counts, record) => {
      const key = record[field] ?? "unspecified";
      counts.set(key, (counts.get(key) ?? 0) + 1);
      return counts;
    }, new Map()).entries()].sort(([a], [b]) => a.localeCompare(b))
  );
}

function uniqueIds(records, collectionName, errors) {
  const ids = new Set();
  for (const record of records) {
    if (ids.has(record.id)) errors.push(`${collectionName} contains duplicate ID ${record.id}`);
    ids.add(record.id);
  }
  return ids;
}

export function buildProjectionMap(knowledgeBank) {
  const projections = knowledgeBank.claims.flatMap((claim) =>
    claim.projections.map((projection) => ({
      claimId: claim.id,
      project: claim.project,
      claimStatus: claim.status,
      key: projection.key,
      status: projection.status,
      citationRequired: projection.citationRequired,
      surfaces: projection.surfaces
    }))
  );

  return {
    generatedFrom: "apps/www/src/data/knowledge-bank/records.ts",
    countsByStatus: countBy(projections, "status"),
    countsBySurface: Object.fromEntries(
      [...projections.reduce((counts, projection) => {
        for (const surface of projection.surfaces) {
          counts.set(surface, (counts.get(surface) ?? 0) + 1);
        }
        return counts;
      }, new Map()).entries()].sort(([a], [b]) => a.localeCompare(b))
    ),
    active: projections
      .filter((projection) => projection.status === "active")
      .sort((a, b) => `${a.project}:${a.claimId}:${a.key}`.localeCompare(`${b.project}:${b.claimId}:${b.key}`))
  };
}

export function buildKnowledgeReport(knowledgeBank) {
  const projectionMap = buildProjectionMap(knowledgeBank);
  return {
    canonicalStore: "apps/www/src/data/knowledge-bank/records.ts",
    counts: Object.fromEntries(
      Object.entries(knowledgeBank).map(([key, value]) => [key, Array.isArray(value) ? value.length : 0])
    ),
    intakeMaturity: countBy(knowledgeBank.intakes, "maturity"),
    intakePublicUse: countBy(knowledgeBank.intakes, "publicUse"),
    intakeEditorialState: countBy(knowledgeBank.intakes, "editorialState"),
    claimStatus: countBy(knowledgeBank.claims, "status"),
    sourceVisibility: countBy(knowledgeBank.sources, "visibility"),
    projectionStatus: projectionMap.countsByStatus,
    activeProjectionCount: projectionMap.active.length,
    openInquiryCount: knowledgeBank.researchInquiries.filter((item) =>
      ["open", "inconclusive", "partially-recovered", "not-recovered"].includes(item.resultStatus)
    ).length
  };
}

export function queryKnowledgeBank(knowledgeBank, query) {
  const needle = String(query ?? "").trim().toLowerCase();
  if (!needle) return [];

  const collections = [
    ["intake", knowledgeBank.intakes, (record) => ({
      id: record.id,
      type: "intake",
      project: record.projectHints.join(", "),
      summary: record.publicSafeSummary,
      state: `${record.maturity}/${record.publicUse}/${record.editorialState}`
    })],
    ["source", knowledgeBank.sources, (record) => ({
      id: record.id,
      type: "source",
      project: "",
      summary: record.publicCitation,
      state: `${record.visibility}/${record.preservationStatus}`
    })],
    ["claim", knowledgeBank.claims, (record) => ({
      id: record.id,
      type: "claim",
      project: record.project,
      summary: record.projections.find((item) => item.status === "active")?.text ?? record.internalClaim,
      state: record.status
    })],
    ["inquiry", knowledgeBank.researchInquiries, (record) => ({
      id: record.id,
      type: "inquiry",
      project: record.project,
      summary: record.publicSummary ?? record.question,
      state: record.resultStatus
    })]
  ];

  return collections.flatMap(([, records, project]) =>
    records
      .map(project)
      .filter((record) => Object.values(record).join(" ").toLowerCase().includes(needle))
  ).sort((a, b) => `${a.type}:${a.id}`.localeCompare(`${b.type}:${b.id}`));
}

export function validateKnowledgeOperations(knowledgeBank) {
  const errors = [];
  const intakeIds = uniqueIds(knowledgeBank.intakes, "intakes", errors);
  const sourceIds = uniqueIds(knowledgeBank.sources, "sources", errors);
  const claimIds = uniqueIds(knowledgeBank.claims, "claims", errors);
  const inquiryIds = uniqueIds(knowledgeBank.researchInquiries, "research inquiries", errors);
  uniqueIds(knowledgeBank.corrections, "corrections", errors);
  uniqueIds(knowledgeBank.pages, "pages", errors);

  for (const intake of knowledgeBank.intakes) {
    for (const sourceId of intake.sourceIds) {
      if (!sourceIds.has(sourceId)) errors.push(`${intake.id} references unknown source ${sourceId}`);
    }
    for (const claimId of intake.claimIds) {
      if (!claimIds.has(claimId)) errors.push(`${intake.id} references unknown claim ${claimId}`);
    }
    for (const inquiryId of intake.inquiryIds) {
      if (!inquiryIds.has(inquiryId)) errors.push(`${intake.id} references unknown inquiry ${inquiryId}`);
    }
    if (intake.duplicateOf && !intakeIds.has(intake.duplicateOf)) {
      errors.push(`${intake.id} references unknown duplicate intake ${intake.duplicateOf}`);
    }
  }

  for (const claim of knowledgeBank.claims) {
    for (const evidence of claim.evidence) {
      if (!sourceIds.has(evidence.sourceId)) errors.push(`${claim.id} references unknown source ${evidence.sourceId}`);
    }
    for (const inquiryId of claim.researchInquiryIds) {
      if (!inquiryIds.has(inquiryId)) errors.push(`${claim.id} references unknown inquiry ${inquiryId}`);
    }
    for (const projection of claim.projections.filter((item) => item.status === "active")) {
      const boundedNegativeResearchNote =
        claim.status === "not-recovered" &&
        projection.key === "archive-note" &&
        projection.surfaces.every((surface) => surface.startsWith("docs/knowledge-bank/"));
      if (!["confirmed", "confirmed-with-boundary"].includes(claim.status) && !boundedNegativeResearchNote) {
        errors.push(`${claim.id} has an active projection while status is ${claim.status}`);
      }
      if (!projection.surfaces.length) errors.push(`${claim.id}/${projection.key} is active without a surface`);
    }
  }

  for (const page of knowledgeBank.pages) {
    for (const sourceId of page.sourceOrder) {
      if (!sourceIds.has(sourceId)) errors.push(`${page.id} references unknown source ${sourceId}`);
    }
    for (const occurrence of page.occurrences) {
      if (!claimIds.has(occurrence.claimId)) errors.push(`${page.id} references unknown claim ${occurrence.claimId}`);
      for (const sourceId of occurrence.sourceIds ?? []) {
        if (!sourceIds.has(sourceId)) errors.push(`${page.id}/${occurrence.id} references unknown source ${sourceId}`);
      }
    }
  }

  const report = buildKnowledgeReport(knowledgeBank);
  const projectionMap = buildProjectionMap(knowledgeBank);
  const publicSafeOutput = JSON.stringify({ report, projectionMap });
  if (LOCAL_PATH_PATTERN.test(publicSafeOutput)) {
    errors.push("Knowledge operations output contains a machine-local path");
  }

  return {
    passed: errors.length === 0,
    errors,
    report,
    projectionMap,
    evidence: errors.length
      ? "Knowledge operations validation failed."
      : `${report.counts.intakes} intakes, ${report.counts.sources} sources, ${report.counts.claims} claims, ${report.counts.researchInquiries} inquiries, and ${report.activeProjectionCount} active projections are queryable from one canonical store.`
  };
}
