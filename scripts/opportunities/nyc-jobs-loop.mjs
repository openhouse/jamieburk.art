import { pathToFileURL } from "node:url";

const DAY_MS = 86_400_000;

function text(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalized(value) {
  return text(value).toLowerCase();
}

function numeric(value) {
  const parsed = Number.parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function annualSalary(posting) {
  const maximum = numeric(posting.salary_range_to);
  switch (normalized(posting.salary_frequency)) {
    case "hourly":
      return maximum * 2_080;
    case "daily":
      return maximum * 260;
    case "annual":
      return maximum;
    default:
      return 0;
  }
}

function postingDeadline(value) {
  const match = text(value).toUpperCase().match(/^(\d{1,2})-([A-Z]{3})-(\d{4})$/);
  if (!match) return "";
  const months = new Map([
    ["JAN", 0], ["FEB", 1], ["MAR", 2], ["APR", 3], ["MAY", 4], ["JUN", 5],
    ["JUL", 6], ["AUG", 7], ["SEP", 8], ["OCT", 9], ["NOV", 10], ["DEC", 11]
  ]);
  const month = months.get(match[2]);
  if (month === undefined) return "";
  return new Date(Date.UTC(Number(match[3]), month, Number(match[1]))).toISOString().slice(0, 10);
}

function includesAny(haystack, needles) {
  return needles.some((needle) => haystack.includes(needle));
}

function signalScore(corpus, signals) {
  return signals.reduce((score, signal) => score + (includesAny(corpus, signal.terms) ? signal.weight : 0), 0);
}

function exclusionReasons(posting, policy, now) {
  const reasons = [];
  const corpus = normalized([
    posting.business_title,
    posting.civil_service_title,
    posting.job_description,
    posting.minimum_qual_requirements,
    posting.preferred_skills,
    posting.additional_information
  ].join(" "));
  const specialistCorpus = normalized([
    posting.business_title,
    posting.civil_service_title,
    posting.minimum_qual_requirements,
    posting.preferred_skills
  ].join(" "));
  const deadline = postingDeadline(posting.post_until);

  if (normalized(posting.posting_type) !== "external") reasons.push("internal-only");
  if (deadline && deadline < now) reasons.push("expired");
  if (annualSalary(posting) < policy.salaryFloorAnnual) reasons.push("salary-below-floor");
  if (includesAny(corpus, [
    "current permanent city employee",
    "only permanent employees",
    "professional engineer license is required",
    "registered architect license is required",
    "licensed clinical social worker",
    "admission to the new york state bar is required",
    "certified public accountant license is required"
  ])) reasons.push("credential-hard-screen");
  if (includesAny(corpus, [
    "only candidates serving permanently",
    "only those currently serving as a permanent",
    "only permanent employees",
    "must be serving permanently in the title",
    "must be serving permanently in this title",
    "only candidates with permanent civil service status",
    "permanent civil service status in the",
    "reachable on the civil service list",
    "reachable on the open-competitive civil service list",
    "reachable on dot's promotional list"
  ])) reasons.push("civil-service-restricted");
  if (includesAny(specialistCorpus, [
    "construction project manager",
    "energy conservation specialist",
    "associate inspector (housing)",
    "bridge inspection",
    "structural engineering",
    "supervising a construction project",
    "engineering design, and/or construction",
    "experience in energy generation or conservation work",
    "field inspections requiring the gathering and reporting of data concerning the physical aspects of housing"
  ])) reasons.push("specialist-domain-hard-screen");

  return reasons;
}

export function datasetNeedsRefresh(remoteMetadata, committedState) {
  return numeric(remoteMetadata?.rowsUpdatedAt) > numeric(committedState?.rowsUpdatedAt);
}

export function scorePosting(posting, policy, { now = new Date().toISOString().slice(0, 10) } = {}) {
  const exclusion = exclusionReasons(posting, policy, now);
  const title = text(posting.business_title) || text(posting.civil_service_title) || "Untitled role";
  const corpus = normalized([
    posting.agency,
    posting.business_title,
    posting.civil_service_title,
    posting.division_work_unit,
    posting.job_description,
    posting.minimum_qual_requirements,
    posting.preferred_skills,
    posting.additional_information
  ].join(" "));

  const normalizedTitle = normalized(title);
  const titleRoleAdjacency = includesAny(normalizedTitle, [
    "product manager", "product operations", "project manager", "program manager",
    "operations manager", "implementation manager", "business analyst", "service designer",
    "user researcher"
  ]);
  const fitSignals = [
    { id: "digital-technical-systems", weight: 16, terms: ["digital", "technology", "software", "web application", "data platform", "information system", "computer system", "it project"] },
    { id: "implementation-and-operations", weight: 14, terms: ["implementation", "operations", "operational", "launch", "deployment", "service delivery"] },
    { id: "cross-functional-coordination", weight: 12, terms: ["cross-functional", "cross agency", "cross-agency", "interagency", "coordinate agency", "multi-disciplinary"] },
    { id: "research-requirements-roadmap", weight: 12, terms: ["user research", "qualitative research", "requirements", "roadmap", "service design", "user stories"] },
    { id: "resident-facing-public-service", weight: 10, terms: ["resident", "constituent", "community", "public service", "public-facing", "new yorkers"] },
    { id: "stakeholder-and-vendor-work", weight: 8, terms: ["stakeholder", "vendor", "external partners", "community-based organizations", "coalition"] },
    { id: "measurement-and-learning", weight: 8, terms: ["metric", "analytics", "kpi", "data-informed", "program evaluation"] },
    { id: "communication-and-facilitation", weight: 6, terms: ["plain language", "communication", "facilitat", "presentation", "briefing"] }
  ];
  const fitScore = Math.min(100, (titleRoleAdjacency ? 30 : 0) + signalScore(corpus, fitSignals));

  const titleAdjacent = includesAny(normalized(title), ["product", "project", "program", "operations", "implementation", "service design"]);
  const responsibilityAdjacent = includesAny(corpus, ["product delivery", "project management", "program management", "implementation", "cross-functional", "stakeholder"]);
  const flexibleQualifications = includesAny(corpus, [
    "satisfactory equivalent combination",
    "high school diploma",
    "baccalaureate degree",
    "education and experience"
  ]);
  const requiredYears = [...corpus.matchAll(/(?:minimum|at least)?\s*(\d{1,2})\s*(?:\([^)]*\)\s*)?years?/g)]
    .map((match) => Number(match[1]))
    .filter((value) => value > 0 && value < 50);
  const tenurePlausible = requiredYears.length === 0 || Math.min(...requiredYears) <= 14;
  const executiveSeniorityRisk = includesAny(normalizedTitle, [
    "commissioner", "chief ", "executive director"
  ]);
  const specialistDomainRisk = includesAny(normalized(`${title} ${posting.civil_service_title}`), [
    "clinical", "medical", "physician", "nurse", "engineer", "architect", "attorney",
    "human resources", "food safety", "health services manager"
  ]);
  const securabilityScore = Math.max(0, Math.min(100,
    (normalized(posting.posting_type) === "external" ? 10 : 0) +
    (annualSalary(posting) >= policy.salaryFloorAnnual ? 10 : 0) +
    (flexibleQualifications ? 20 : 8) +
    (tenurePlausible ? 20 : 0) +
    (titleAdjacent ? 25 : 0) +
    (responsibilityAdjacent ? 15 : 0) -
    (executiveSeniorityRisk ? 35 : 0) -
    (specialistDomainRisk ? 25 : 0)
  ));

  const combinedScore = Math.round(
    fitScore * policy.fitWeight + securabilityScore * policy.securabilityWeight
  );
  const eligible = exclusion.length === 0;
  const admitted = eligible &&
    fitScore >= policy.minimumFitScore &&
    securabilityScore >= policy.minimumSecurabilityScore &&
    combinedScore >= policy.strongMatchThreshold;
  const matchedSignals = [
    ...(titleRoleAdjacency ? ["title-role-adjacency"] : []),
    ...fitSignals.filter((signal) => includesAny(corpus, signal.terms)).map(({ id }) => id)
  ];
  const jobId = text(posting.job_id);

  return {
    jobId,
    title,
    agency: text(posting.agency),
    civilServiceTitle: text(posting.civil_service_title),
    postingType: text(posting.posting_type),
    deadline: postingDeadline(posting.post_until),
    annualSalaryMaximum: Math.round(annualSalary(posting)),
    fitScore,
    securabilityScore,
    combinedScore,
    matchedSignals,
    exclusionReasons: exclusion,
    eligible,
    admitted,
    subjectiveReviewEligible: admitted,
    verificationState: admitted ? "candidate-needs-official-posting-verification" : "not-admitted",
    actionUrl: `https://cityjobs.nyc.gov/jobs?q=${encodeURIComponent(jobId)}`,
    sourceDatasetId: "pda4-rgn4"
  };
}

export function rankStrongMatches(postings, policy, options = {}) {
  const byJobId = new Map();
  for (const posting of postings) {
    const jobId = text(posting.job_id);
    if (!jobId) continue;
    const current = byJobId.get(jobId);
    if (!current || normalized(posting.posting_type) === "external") byJobId.set(jobId, posting);
  }
  const all = [...byJobId.values()]
    .map((posting) => scorePosting(posting, policy, options))
    .sort((left, right) => right.combinedScore - left.combinedScore || left.jobId.localeCompare(right.jobId));
  return { all, admitted: all.filter(({ admitted }) => admitted) };
}

export function buildOpportunityDigest({
  generatedAt,
  datasetUpdatedAt,
  activeOpportunities = [],
  newStrongMatches = []
}) {
  const active = activeOpportunities.filter(({ verifiedActionable }) => verifiedActionable);
  const lines = [
    "# NYC opportunity action digest",
    "",
    `Generated: ${generatedAt}`,
    `NYC Jobs dataset revision: ${datasetUpdatedAt}`,
    "",
    "## Apply or advance now",
    ""
  ];
  if (!active.length) lines.push("No verified active application action is due today.", "");
  for (const opportunity of active) {
    lines.push(
      `### ${opportunity.title} — ${opportunity.agency}`,
      "",
      `- Job ID: ${opportunity.jobId}`,
      `- Next action: ${opportunity.nextAction}`,
      `- Official posting: ${opportunity.actionUrl}`,
      ""
    );
  }
  lines.push("## Strong matches to verify", "");
  if (!newStrongMatches.length) lines.push("No unresolved role currently clears the strong-match threshold.", "");
  for (const opportunity of newStrongMatches) {
    lines.push(
      `### ${opportunity.title} — ${opportunity.agency}`,
      "",
      `- Job ID: ${opportunity.jobId}`,
      `- Fit: ${opportunity.fitScore}/100; securability: ${opportunity.securabilityScore}/100; combined: ${opportunity.combinedScore}/100`,
      `- Signals: ${opportunity.matchedSignals.join(", ")}`,
      "- Next action: verify the individual official posting and hard screens before generating outward-facing materials.",
      `- NYC Jobs search: ${opportunity.actionUrl}`,
      ""
    );
  }
  return {
    subject: `NYC opportunity action digest — ${generatedAt.slice(0, 10)}`,
    markdown: `${lines.join("\n").trim()}\n`
  };
}

export function prepareOpportunityRefresh({
  metadata,
  committedState,
  postings,
  policy,
  now = new Date().toISOString().slice(0, 10),
  knownJobIds = [],
  activeOpportunities = [],
  carriedCandidates = [],
  forceRefresh = false
}) {
  const refreshRequired = forceRefresh || datasetNeedsRefresh(metadata, committedState);
  const ranked = refreshRequired
    ? rankStrongMatches(postings, policy, { now })
    : { all: [], admitted: [] };
  const known = new Set(knownJobIds.map(String));
  const newStrongMatches = ranked.admitted.filter(({ jobId }) => !known.has(jobId));
  const candidateMatches = refreshRequired
    ? newStrongMatches
    : carriedCandidates.filter((candidate) =>
        candidate?.admitted === true &&
        candidate?.verificationState === "candidate-needs-official-posting-verification" &&
        text(candidate?.jobId)
      );
  const rowsUpdatedAt = numeric(metadata?.rowsUpdatedAt);
  const datasetUpdatedAt = rowsUpdatedAt
    ? new Date(rowsUpdatedAt * 1_000).toISOString()
    : "unknown";
  const generatedAt = `${now}T12:00:00.000Z`;
  return {
    refreshRequired,
    scoringPerformed: refreshRequired,
    deterministicRowsEvaluated: ranked.all.length,
    strongMatchesObserved: ranked.admitted.length,
    newStrongMatches,
    candidateMatches,
    nextSourceState: refreshRequired
      ? { rowsUpdatedAt, rowsUpdatedAtIso: datasetUpdatedAt, refreshCompletedAt: generatedAt }
      : committedState,
    digest: buildOpportunityDigest({
      generatedAt,
      datasetUpdatedAt,
      activeOpportunities,
      newStrongMatches: candidateMatches
    })
  };
}

export async function sendDigestWithResend(digest, {
  sendEnabled = false,
  apiKey,
  from,
  to,
  fetchImpl = fetch
} = {}) {
  if (!sendEnabled) return { sent: false, reason: "delivery-disabled" };
  if (![apiKey, from, to].every((value) => text(value))) {
    throw new Error("Email delivery is enabled but a runtime-only Resend credential or address is missing.");
  }
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: digest.subject,
      text: digest.markdown
    })
  });
  if (!response?.ok) throw new Error(`Digest delivery failed with HTTP ${response?.status ?? "unknown"}.`);
  const payload = await response.json();
  return { sent: true, messageId: payload.id };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.stderr.write("Use the governed CLI entry point after configuring the opportunity-intake manifest.\n");
  process.exitCode = 2;
}
