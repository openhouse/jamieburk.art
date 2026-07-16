import { createHash } from "node:crypto";

const finalInquiryStatuses = new Set(["recovered", "not-recovered"]);
const matureClaimStatuses = new Set(["confirmed", "confirmed-with-boundary"]);

export function validateBlindSpotSuite(suite) {
  const findings = [];
  const evaluationIds = suite?.evaluations?.map((item) => item.id) ?? [];
  const profileIds = Object.keys(suite?.profiles ?? {});

  if (suite?.version !== 1) findings.push("suite version must be 1");
  if (evaluationIds.length !== 8) findings.push("suite must define exactly eight blind-spot evaluations");
  if (new Set(evaluationIds).size !== evaluationIds.length) findings.push("evaluation IDs must be unique");
  if (!profileIds.includes("diagnostic") || !profileIds.includes("closure")) {
    findings.push("diagnostic and closure profiles are required");
  }
  if (!Array.isArray(suite?.statuses) || !suite.statuses.includes("invalid")) {
    findings.push("suite statuses must include invalid");
  }

  for (const evaluation of suite?.evaluations ?? []) {
    for (const key of ["id", "title", "blindSpot", "criterion", "closureEvidence"]) {
      if (typeof evaluation[key] !== "string" || !evaluation[key].trim()) {
        findings.push(`${evaluation.id ?? "unknown"} is missing ${key}`);
      }
    }
  }

  return findings;
}

function disposition(id, status, summary, evidence = [], findings = []) {
  return { id, status, summary, evidence, findings };
}

export function evaluateVisualEvidence({ suite, evidence, candidate, fileExists = () => false }) {
  const id = "visual-evidence-coverage";
  if (!evidence) {
    return disposition(
      id,
      "blocked",
      "No candidate-bound visual-rights review is present.",
      [],
      [suite.evidencePaths.visual]
    );
  }

  const projects = Array.isArray(evidence.projects) ? evidence.projects : [];
  const artifacts = projects.flatMap((project) => project.artifacts ?? []);
  const projectIds = new Set(projects.map((project) => project.projectId));
  const missingProjects = suite.targets.visualProjects.filter((projectId) => !projectIds.has(projectId));
  const invalidArtifacts = artifacts.filter(
    (artifact) =>
      artifact.rightsStatus !== "approved" ||
      artifact.safetyStatus !== "approved" ||
      !artifact.context?.trim() ||
      !artifact.alt?.trim() ||
      !Array.isArray(artifact.claimIds) ||
      artifact.claimIds.length === 0 ||
      !artifact.publicPath ||
      !fileExists(artifact.publicPath)
  );
  const findings = [];
  if (evidence.candidate !== candidate) findings.push("visual evidence is bound to a different candidate");
  if (missingProjects.length) findings.push(`missing projects: ${missingProjects.join(", ")}`);
  if (artifacts.length < suite.thresholds.minimumVisualArtifacts) {
    findings.push(`requires ${suite.thresholds.minimumVisualArtifacts} artifacts; received ${artifacts.length}`);
  }
  if (invalidArtifacts.length) findings.push(`${invalidArtifacts.length} artifact record(s) lack approval, context, claims, alt text, or a public file`);

  return disposition(
    id,
    findings.length ? "fail" : "pass",
    findings.length ? "Visual evidence does not yet meet the closure contract." : "Visual evidence covers every priority project with approved contextual artifacts.",
    [`${projects.length} project record(s)`, `${artifacts.length} artifact record(s)`],
    findings
  );
}

export function evaluateDecisiveNarrative({ portfolioReport }) {
  const id = "decisive-narrative";
  if (!portfolioReport) return disposition(id, "blocked", "No current application-readiness report is available.");

  const requiredScores = {
    role_clarity: 4,
    role_fit: 4,
    reader_effort: 3,
    chad_lens: 3
  };
  const findings = Object.entries(requiredScores)
    .filter(([rubric, minimum]) => (portfolioReport.scores?.[rubric] ?? 0) < minimum)
    .map(([rubric, minimum]) => `${rubric} must score at least ${minimum}`);
  for (const gate of ["application_path", "model_judgment", "chad_lens_review"]) {
    if (portfolioReport.hardGates?.[gate]?.status !== "pass") findings.push(`${gate} must pass`);
  }

  return disposition(
    id,
    findings.length ? "partial" : "pass",
    findings.length ? "The hiring narrative remains mechanically incomplete." : "The current candidate passes the decisive narrative contract.",
    [`candidate ${portfolioReport.candidate ?? "unknown"}`, `application score ${portfolioReport.weightedScore ?? "unknown"}`],
    findings
  );
}

export function evaluateRoleAttribution({ suite, knowledgeBank }) {
  const id = "individual-role-attribution";
  const inquiries = new Map((knowledgeBank?.researchInquiries ?? []).map((item) => [item.id, item]));
  const missing = suite.targets.roleInquiries.filter((inquiryId) => !inquiries.has(inquiryId));
  const open = suite.targets.roleInquiries
    .map((inquiryId) => inquiries.get(inquiryId))
    .filter(Boolean)
    .filter((inquiry) => !finalInquiryStatuses.has(inquiry.resultStatus));
  const leaked = (knowledgeBank?.claims ?? []).filter(
    (claim) =>
      claim.researchInquiryIds?.some((inquiryId) => open.some((inquiry) => inquiry.id === inquiryId)) &&
      claim.projections?.some((projection) => projection.status === "active") &&
      ["inference", "use-with-care", "not-recovered"].includes(claim.status)
  );
  const findings = [
    ...missing.map((inquiryId) => `missing inquiry ${inquiryId}`),
    ...open.map((inquiry) => `${inquiry.id} remains ${inquiry.resultStatus}`),
    ...leaked.map((claim) => `${claim.id} projects an unresolved role inference`)
  ];

  return disposition(
    id,
    missing.length || leaked.length ? "fail" : open.length ? "partial" : "pass",
    open.length ? `${open.length} high-value role ${open.length === 1 ? "inquiry remains" : "inquiries remain"} open without projection leakage.` : "All targeted role inquiries have final dispositions.",
    suite.targets.roleInquiries.map((inquiryId) => `${inquiryId}: ${inquiries.get(inquiryId)?.resultStatus ?? "missing"}`),
    findings
  );
}

export function evaluateArchiveDenominators({ suite, knowledgeBank }) {
  const id = "archive-denominator-integrity";
  const sources = new Map((knowledgeBank?.sources ?? []).map((source) => [source.id, source]));
  const findings = [];

  for (const sourceId of suite.targets.socialCorpusSources) {
    const source = sources.get(sourceId);
    if (!source) {
      findings.push(`missing corpus source ${sourceId}`);
      continue;
    }
    const support = (source.supportsGenerally ?? []).join(" ");
    const limits = (source.doesNotEstablish ?? []).join(" ");
    if (!/(?:population|corpus|reconciliation|record|slot)/i.test(support)) {
      findings.push(`${sourceId} lacks a recoverable-population statement`);
    }
    if (!/(?:deleted|removed|historic|historical|lifetime|unavailable|partial|attendance|authorship|impact|endorsement|audience)/i.test(limits)) {
      findings.push(`${sourceId} lacks a material gap or non-support boundary`);
    }
    if (source.reviewStatus !== "reviewed") findings.push(`${sourceId} is not reviewed`);
  }

  return disposition(
    id,
    findings.length ? "fail" : "pass",
    findings.length ? "One or more social corpora can be mistaken for a complete historical population." : "Every declared social corpus carries population and gap boundaries.",
    [`${suite.targets.socialCorpusSources.length} corpus source(s) checked`],
    findings
  );
}

export function evaluateHumanReaderValidation({ suite, evidence, candidate }) {
  const id = "human-reader-validation";
  if (!evidence) {
    return disposition(id, "blocked", "No anonymized candidate-bound human-reader study is present.", [], [suite.evidencePaths.humanReaders]);
  }

  const sessions = Array.isArray(evidence.sessions) ? evidence.sessions : [];
  const findings = [];
  if (evidence.candidate !== candidate) findings.push("human-reader evidence is bound to a different candidate");
  if (sessions.length < suite.thresholds.minimumHumanReaders) {
    findings.push(`requires ${suite.thresholds.minimumHumanReaders} readers; received ${sessions.length}`);
  }
  if (sessions.some((session) => !session.roleFamily || !session.tasks?.role || !session.tasks?.work || !session.tasks?.outcome || typeof session.interviewInterest !== "boolean")) {
    findings.push("every session must record role family, the three comprehension tasks, and interview interest");
  }
  if (JSON.stringify(evidence).match(/(?:email|phone|fullName|participantName)/i)) {
    findings.push("human-reader evidence must remain aggregate and anonymous");
  }

  return disposition(
    id,
    findings.length ? "fail" : "pass",
    findings.length ? "Human-reader validation does not meet the closure contract." : "Five or more target readers completed the candidate-bound comprehension study.",
    [`${sessions.length} reader session(s)`],
    findings
  );
}

export function evaluateReviewability({ suite, stats, evidence, headSha }) {
  const id = "change-reviewability";
  const thresholds = suite.thresholds;
  const withinThreshold =
    stats.changedFiles <= thresholds.maximumChangedFiles &&
    stats.addedLines <= thresholds.maximumAddedLines &&
    stats.maximumSingleFileAddedLines <= thresholds.maximumSingleFileAddedLines;
  const reviewUnits = Array.isArray(evidence?.reviewUnits) ? evidence.reviewUnits : [];
  const coveredPaths = new Set(reviewUnits.flatMap((unit) => unit.paths ?? []));
  const changedPaths = new Set(stats.paths ?? []);
  const unitsWithinThreshold = reviewUnits.every(
    (unit) =>
      unit.title &&
      Array.isArray(unit.paths) &&
      unit.paths.length > 0 &&
      unit.changedFiles === unit.paths.length &&
      unit.changedFiles <= thresholds.maximumChangedFiles &&
      unit.addedLines <= thresholds.maximumAddedLines &&
      unit.maximumSingleFileAddedLines <= thresholds.maximumSingleFileAddedLines
  );
  const coversExactDiff =
    coveredPaths.size === changedPaths.size &&
    [...changedPaths].every((changedPath) => coveredPaths.has(changedPath));
  const approvedException = Boolean(
    evidence?.headSha === headSha &&
    evidence?.approved === true &&
    reviewUnits.length > 1 &&
    unitsWithinThreshold &&
    coversExactDiff
  );
  const findings = [];
  if (!withinThreshold && !approvedException) {
    if (stats.changedFiles > thresholds.maximumChangedFiles) findings.push(`${stats.changedFiles} changed files exceed ${thresholds.maximumChangedFiles}`);
    if (stats.addedLines > thresholds.maximumAddedLines) findings.push(`${stats.addedLines} added lines exceed ${thresholds.maximumAddedLines}`);
    if (stats.maximumSingleFileAddedLines > thresholds.maximumSingleFileAddedLines) {
      findings.push(`${stats.maximumSingleFileAddedLines} lines in the largest added file exceed ${thresholds.maximumSingleFileAddedLines}`);
    }
  }

  return disposition(
    id,
    findings.length ? "fail" : "pass",
    findings.length ? "The branch exceeds the human-review thresholds without an approved decomposition." : approvedException ? "A candidate-bound decomposition has explicit human approval." : "The branch stays within review thresholds.",
    [`${stats.changedFiles} changed file(s)`, `${stats.addedLines} added line(s)`, `largest file ${stats.maximumSingleFileAddedLines} added line(s)`],
    findings
  );
}

export function evaluateProductionRelease({ env, headSha }) {
  const id = "production-release-evidence";
  const required = {
    EVAL_EXPECTED_SHA: headSha,
    EVAL_DEPLOYED_SHA: headSha,
    EVAL_PRODUCTION_SMOKE: "pass",
    EVAL_ROLLBACK_READY: "true",
    EVAL_PRODUCTION_INDEXING: "pass",
    EVAL_STAGING_NOINDEX: "pass",
    EVAL_HUMAN_APPROVAL: "approved"
  };
  const findings = Object.entries(required)
    .filter(([key, value]) => env[key] !== value)
    .map(([key]) => `${key} is missing or does not match the exact candidate`);

  return disposition(
    id,
    findings.length ? "blocked" : "pass",
    findings.length ? "Production release evidence remains incomplete." : "Production release evidence and human approval match the exact commit.",
    [`head ${headSha}`],
    findings
  );
}

export function matureUnusedClaims(knowledgeBank) {
  return (knowledgeBank?.claims ?? []).filter(
    (claim) =>
      matureClaimStatuses.has(claim.status) &&
      claim.editorialStatus === "unused" &&
      ["public", "qualified"].includes(claim.publicationStatus)
  );
}

export function promotionCandidateFingerprint(claims) {
  const content = claims
    .map((claim) => `${claim.id}\0${claim.status}\0${claim.publicationStatus}\0${claim.editorialStatus}`)
    .sort()
    .join("\0");
  return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}

export function evaluatePromotionDiscipline({ suite, knowledgeBank, evidence, now = new Date() }) {
  const id = "promotion-discipline";
  const claims = matureUnusedClaims(knowledgeBank);
  const candidate = promotionCandidateFingerprint(claims);
  if (!evidence) {
    return disposition(
      id,
      claims.length ? "partial" : "pass",
      claims.length ? `${claims.length} mature unused claims await an explicit editorial decision inventory.` : "No mature unused claims currently require a promotion decision.",
      [`candidate ${candidate}`],
      claims.map((claim) => claim.id)
    );
  }

  const decisions = new Map((evidence.decisions ?? []).map((decision) => [decision.claimId, decision]));
  const findings = [];
  if (evidence.candidate !== candidate) findings.push("promotion decisions are bound to a different mature-unused claim set");
  for (const claim of claims) {
    const decision = decisions.get(claim.id);
    if (!decision) {
      findings.push(`${claim.id} has no editorial decision`);
      continue;
    }
    if (!["promote", "defer", "not-for-current-purpose"].includes(decision.decision) || !decision.rationale?.trim()) {
      findings.push(`${claim.id} has an invalid or unexplained decision`);
    }
    const reviewedAt = new Date(decision.reviewedAt);
    const ageDays = (now.getTime() - reviewedAt.getTime()) / 86_400_000;
    if (!Number.isFinite(ageDays) || ageDays < 0 || ageDays > suite.thresholds.promotionReviewMaxAgeDays) {
      findings.push(`${claim.id} lacks a current review date`);
    }
  }

  return disposition(
    id,
    findings.length ? "partial" : "pass",
    findings.length ? "Mature unused claims do not yet have complete current editorial decisions." : "Every mature unused claim has a current explicit editorial decision.",
    [`${claims.length} mature unused claim(s)`, `candidate ${candidate}`],
    findings
  );
}

export function profileBlindSpotResults({ suite, profileId, results }) {
  const profile = suite.profiles[profileId];
  if (!profile) throw new Error(`Unknown blind-spot profile: ${profileId}`);
  const expected = new Set(suite.evaluations.map((item) => item.id));
  const actual = new Map(results.map((item) => [item.id, item]));
  const missing = [...expected].filter((id) => !actual.has(id));
  const invalid = results.filter(
    (item) => !expected.has(item.id) || !suite.statuses.includes(item.status) || !item.summary?.trim() || item.status === "invalid"
  );
  const closureFailures = profile.requireStatus
    ? results.filter((item) => item.status !== profile.requireStatus).map((item) => item.id)
    : [];
  const passed = missing.length === 0 && invalid.length === 0 && closureFailures.length === 0;

  return {
    profile: profileId,
    passed,
    closurePassed: missing.length === 0 && invalid.length === 0 && results.every((item) => item.status === "pass"),
    missing,
    invalid: invalid.map((item) => item.id),
    closureFailures,
    counts: Object.fromEntries(suite.statuses.map((status) => [status, results.filter((item) => item.status === status).length]))
  };
}
