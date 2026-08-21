const DAY_MS = 86_400_000;

const monthNumbers = {
  JAN: "01",
  FEB: "02",
  MAR: "03",
  APR: "04",
  MAY: "05",
  JUN: "06",
  JUL: "07",
  AUG: "08",
  SEP: "09",
  OCT: "10",
  NOV: "11",
  DEC: "12"
};

const fitSignals = [
  {
    id: "product-delivery",
    weight: 15,
    pattern: /product manager|product management|product delivery|product lifecycle|roadmap|user research|user stor|requirements|continuous improvement/i
  },
  {
    id: "project-implementation",
    weight: 13,
    pattern: /project manager|program manager|project delivery|program delivery|implementation|cross-functional|launch|delivery/i
  },
  {
    id: "public-service",
    weight: 10,
    pattern: /resident|public service|public-interest|public interest|city agenc|government|community|stakeholder|policy|advocacy|civic/i
  },
  {
    id: "technical-systems",
    weight: 7,
    pattern: /digital|technology|technical|data|software|systems|automation|\bweb\b/i
  },
  {
    id: "operations",
    weight: 7,
    pattern: /operations|operating|process improvement|vendor|budget|procurement|workflow|quality assurance|documentation/i
  },
  {
    id: "facilitation-communications",
    weight: 4,
    pattern: /facilitation|facilitate|presentation|public speaking|communications|engagement|listening session/i
  },
  {
    id: "leadership-strategy",
    weight: 4,
    pattern: /\blead\b|leading|manage|coordinate|strategy|strategic|prioritization/i
  },
  {
    id: "participatory-governance",
    weight: 9,
    pattern: /co-governance|participatory|community organizing|coalition|advocates|public forums|community collaboration|community-based organization/i
  }
];

const titleAlignments = [
  { score: 45, pattern: /co-governance project coordinator/i },
  { score: 40, pattern: /product manager|technical project manager/i },
  { score: 38, pattern: /efficiency program manager|policy implementation|community services delivery|outreach and engagement manager/i },
  { score: 36, pattern: /senior project manager|business analyst\s*\/\s*project manager|community engagement/i },
  { score: 35, pattern: /program manager|project manager|operations manager|special projects manager|program delivery manager/i },
  { score: 34, pattern: /director of operations/i },
  { score: 32, pattern: /policy advisor|policy manager|policy analyst|strategic projects|strategic initiatives/i },
  { score: 30, pattern: /chief of staff/i }
];

const specializedTitlePattern =
  /clinical|medical|physician|nurse|attorney|counsel|engineer|architect|construction|accountant|auditor|scientist|programmer|developer|database administrator|mechanic|electrician/i;
const requiredCredentialPattern =
  /(?:current|valid|active).{0,45}(?:license|licensure|registration).{0,35}required|(?:license|licensure|registration).{0,35}required|admission to (?:the )?(?:new york state )?bar|required.{0,40}(?:professional engineer|registered architect|registered nurse|medical degree|law degree)|all candidates must have at least a master'?s degree|master'?s degree.{0,20}required/i;

function numeric(value) {
  const parsed = Number.parseFloat(String(value ?? "").replaceAll(",", ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function parsePostUntil(value) {
  const raw = String(value ?? "").trim();
  const match = raw.match(/^(\d{1,2})-([A-Z]{3})-(\d{4})$/i);
  if (match && monthNumbers[match[2].toUpperCase()]) {
    return `${match[3]}-${monthNumbers[match[2].toUpperCase()]}-${match[1].padStart(2, "0")}`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  return null;
}

function daysFrom(asOf, date) {
  if (!date) return null;
  return Math.floor(
    (Date.parse(`${date}T12:00:00Z`) - Date.parse(`${asOf}T12:00:00Z`)) / DAY_MS
  );
}

function postingCorpus(job) {
  return [
    job.title,
    job.civilServiceTitle,
    job.division,
    job.description,
    job.minimumQualifications,
    job.preferredSkills
  ].join("\n");
}

function normalizeJob(row) {
  const jobId = String(row.job_id ?? "").trim();
  const salaryFrom = numeric(row.salary_range_from);
  const salaryTo = numeric(row.salary_range_to);
  return {
    jobId,
    opportunityId: `opportunity.nyc-jobs.${jobId}`,
    title: String(row.business_title ?? "Untitled role").trim(),
    organization: String(row.agency ?? "City of New York").trim(),
    postingType: String(row.posting_type ?? "").trim(),
    positions: Math.max(1, Number.parseInt(row.number_of_positions ?? "1", 10) || 1),
    civilServiceTitle: String(row.civil_service_title ?? "").trim(),
    salaryFrom,
    salaryTo,
    salaryFrequency: String(row.salary_frequency ?? "").trim(),
    workLocation: String(row.work_location ?? row.work_location_1 ?? "").trim(),
    division: String(row.division_work_unit ?? "").trim(),
    description: String(row.job_description ?? "").trim(),
    minimumQualifications: String(row.minimum_qual_requirements ?? "").trim(),
    preferredSkills: String(row.preferred_skills ?? "").trim(),
    residencyRequirement: String(row.residency_requirement ?? "").trim(),
    postUntil: parsePostUntil(row.post_until),
    canonicalUrl: `https://cityjobs.nyc.gov/jobs?options=&page=1&q=${encodeURIComponent(jobId)}`,
    source: "nyc-open-data"
  };
}

function deduplicateRows(rows) {
  const groups = new Map();
  for (const row of rows) {
    const id = String(row.job_id ?? "").trim();
    if (!id) continue;
    const candidates = groups.get(id) ?? [];
    candidates.push(row);
    groups.set(id, candidates);
  }
  return [...groups.values()].map(
    (candidates) => candidates.find((row) => row.posting_type === "External") ?? candidates[0]
  );
}

function hardScreen(job) {
  const constructionProject =
    /project manager|program manager|project executive/i.test(job.title) &&
    /design\s*&\s*construction|capital construction|engineering design|field inspections?|construction project/i.test(
      `${job.organization}\n${job.description}`
    );
  return (
    specializedTitlePattern.test(job.title) ||
    requiredCredentialPattern.test(job.minimumQualifications) ||
    constructionProject
  );
}

function preflight(job, asOf) {
  const reasons = [];
  if (job.postingType !== "External") reasons.push("not-publicly-open");
  if (
    job.salaryFrequency.toLowerCase() !== "annual" ||
    job.salaryTo === null ||
    job.salaryTo < 100_000
  ) {
    reasons.push("compensation-below-target");
  }
  if (job.postUntil && job.postUntil < asOf) reasons.push("posting-expired");
  if (hardScreen(job)) reasons.push("specialized-hard-screen");
  return reasons;
}

function yearsRequested(job) {
  const corpus = `${job.minimumQualifications}\n${job.preferredSkills}`;
  const values = [...corpus.matchAll(/\b(\d{1,2})\)?\+?\s+years?\b/gi)].map((match) => Number(match[1]));
  return values.length ? Math.max(...values) : null;
}

function score(job, asOf) {
  const corpus = postingCorpus(job);
  const titleAlignmentScore =
    titleAlignments.find((alignment) => alignment.pattern.test(job.title))?.score ?? 0;
  const matchedSignals = fitSignals
    .filter((signal) => signal.pattern.test(corpus))
    .map((signal) => signal.id);
  const contentFitScore = fitSignals
    .filter((signal) => matchedSignals.includes(signal.id))
    .reduce((total, signal) => total + signal.weight, 0);
  const fitScore = Math.min(100, titleAlignmentScore + contentFitScore);
  const deadlineDays = daysFrom(asOf, job.postUntil);
  const experienceYears = yearsRequested(job);
  let securabilityScore = 45;
  securabilityScore += 10;
  securabilityScore += job.salaryFrom !== null && job.salaryFrom >= 100_000 ? 10 : 3;
  if (job.positions >= 2) securabilityScore += 5;
  if (deadlineDays === null) securabilityScore -= 5;
  else if (deadlineDays >= 14) securabilityScore += 5;
  else if (deadlineDays <= 3) securabilityScore -= 5;
  if (/satisfactory (?:equivalent )?combination|equivalent combination of education and experience/i.test(job.minimumQualifications)) {
    securabilityScore += 10;
  }
  if (experienceYears !== null) {
    if (experienceYears <= 5) securabilityScore += 5;
    else if (experienceYears >= 10) securabilityScore -= 10;
    else if (experienceYears >= 8) securabilityScore -= 5;
  }
  securabilityScore = Math.max(0, Math.min(100, securabilityScore));
  const combinedScore = Number((fitScore * 0.62 + securabilityScore * 0.38).toFixed(1));
  return {
    ...job,
    titleAlignmentScore,
    contentFitScore,
    fitScore,
    securabilityScore,
    combinedScore,
    matchedSignals,
    deadlineDays,
    experienceYears
  };
}

export function sourceRefreshState({ lastSeenRowsUpdatedAt, observedRowsUpdatedAt }) {
  const last = Date.parse(lastSeenRowsUpdatedAt);
  const observed = Date.parse(observedRowsUpdatedAt);
  if (!Number.isFinite(last) || !Number.isFinite(observed)) {
    return { stale: true, reason: "invalid-source-clock" };
  }
  if (observed > last) return { stale: true, reason: "row-data-updated" };
  if (observed < last) return { stale: true, reason: "source-clock-regressed" };
  return { stale: false, reason: "current" };
}

export function qualifyJobs(rows, { asOf, threshold }) {
  const uniqueRows = deduplicateRows(rows);
  const excluded = [];
  const scored = [];
  for (const row of uniqueRows) {
    const job = normalizeJob(row);
    const reasons = preflight(job, asOf);
    if (reasons.length) excluded.push({ jobId: job.jobId, title: job.title, reasons });
    else scored.push(score(job, asOf));
  }
  const admitted = scored
    .map((job) => ({
      ...job,
      admissionFailures: [
        ...(job.titleAlignmentScore === 0 ? ["title-alignment"] : []),
        ...(job.fitScore < threshold.fit ? ["fit-threshold"] : []),
        ...(job.securabilityScore < threshold.securability ? ["securability-threshold"] : []),
        ...(job.combinedScore < threshold.combined ? ["combined-threshold"] : [])
      ]
    }))
    .filter((job) => job.admissionFailures.length === 0)
    .sort((left, right) => right.combinedScore - left.combinedScore || left.jobId.localeCompare(right.jobId));
  const admittedIds = new Set(admitted.map((job) => job.jobId));
  const rejected = scored
    .map((job) => ({
      ...job,
      admissionFailures: [
        ...(job.titleAlignmentScore === 0 ? ["title-alignment"] : []),
        ...(job.fitScore < threshold.fit ? ["fit-threshold"] : []),
        ...(job.securabilityScore < threshold.securability ? ["securability-threshold"] : []),
        ...(job.combinedScore < threshold.combined ? ["combined-threshold"] : [])
      ]
    }))
    .filter((job) => !admittedIds.has(job.jobId))
    .sort((left, right) => right.combinedScore - left.combinedScore || left.jobId.localeCompare(right.jobId));
  return {
    rowCount: rows.length,
    uniqueJobCount: uniqueRows.length,
    scoredCount: scored.length,
    excluded,
    admitted,
    rejected
  };
}

function normalizeTracked(opportunity) {
  const postedUntil = opportunity.postedUntil instanceof Date
    ? opportunity.postedUntil.toISOString().slice(0, 10)
    : opportunity.postedUntil;
  return {
    ...opportunity,
    postedUntil,
    source: "knowledge-wiki",
    postingType: "External",
    matchedSignals: opportunity.matchedSignals ?? [],
    salaryFrom: opportunity.salaryFrom ?? null,
    salaryTo: opportunity.salaryTo ?? null,
    positions: opportunity.positions ?? 1
  };
}

export function mergeActionableOpportunities(discovered, tracked, { asOf }) {
  const byJobId = new Map();
  for (const opportunity of discovered) {
    if (!opportunity.postUntil || opportunity.postUntil >= asOf) {
      byJobId.set(opportunity.jobId, opportunity);
    }
  }
  for (const opportunity of tracked) {
    const normalized = normalizeTracked(opportunity);
    if (
      normalized.status === "live" &&
      (!normalized.postedUntil || normalized.postedUntil >= asOf)
    ) {
      byJobId.set(normalized.jobId, normalized);
    }
  }
  return [...byJobId.values()].sort(
    (left, right) =>
      (right.combinedScore ?? 0) - (left.combinedScore ?? 0) ||
      left.title.localeCompare(right.title)
  );
}

function money(value) {
  return value === null || value === undefined
    ? "not recorded"
    : `$${Math.round(value).toLocaleString("en-US")}`;
}

function nextAction(opportunity, asOf) {
  const deadline = opportunity.postUntil ?? opportunity.postedUntil ?? null;
  const remaining = daysFrom(asOf, deadline);
  if (["submitted", "screening", "interview", "final-review", "offer-pending"].includes(opportunity.applicationStatus)) {
    return "Advance the recorded application stage and prepare the next conversation."
  }
  if (remaining !== null && remaining <= 7) return "Apply now: verify the official posting, tailor the packet, and submit before the deadline."
  return "Review the official posting, tailor the application packet, and apply if the hard screens remain clear."
}

export function buildOpportunityDigest({ asOf, sourceUpdatedAt, opportunities }) {
  const count = opportunities.length;
  const noun = count === 1 ? "opportunity" : "opportunities";
  const lines = [
    `# Hiring actions for ${asOf}`,
    "",
    `Dataset row data: ${sourceUpdatedAt.slice(0, 10)} (NYC Open Data)`,
    "",
    `## ${count} active ${noun}`,
    ""
  ];
  if (count === 0) lines.push("No opportunity currently clears the strong-match admission gate.", "");
  for (const [index, opportunity] of opportunities.entries()) {
    const deadline = opportunity.postUntil ?? opportunity.postedUntil ?? "confirm on official posting";
    lines.push(
      `### ${index + 1}. ${opportunity.title}`,
      "",
      `- Organization: ${opportunity.organization}`,
      `- Compensation: ${money(opportunity.salaryFrom)}–${money(opportunity.salaryTo)}`,
      `- Deadline: ${deadline}`,
      `- Match: fit ${opportunity.fitScore ?? "review"}; securability ${opportunity.securabilityScore ?? "review"}; combined ${opportunity.combinedScore ?? "review"}`,
      `- Source: ${opportunity.source}`,
      `- Official posting: ${opportunity.canonicalUrl}`,
      `- **Next action:** ${nextAction(opportunity, asOf)}`,
      ""
    );
  }
  lines.push(
    "The scores prioritize action; they are not a hiring prediction. Recheck civil-service requirements, eligibility, salary, deadline, and team context before applying.",
    ""
  );
  return {
    subject: `Jamie’s hiring actions — ${count} active ${noun} — ${asOf}`,
    markdown: lines.join("\n")
  };
}

function sourceUpdatedAt(metadata) {
  if (typeof metadata.rowsUpdatedAt === "number") {
    return new Date(metadata.rowsUpdatedAt * 1000).toISOString();
  }
  return new Date(metadata.rowsUpdatedAt).toISOString();
}

function addDays(date, days) {
  return new Date(Date.parse(`${date}T12:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
}

function humanDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(iso));
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function generatedOpportunityRecord(job, { asOf, sourceId, evaluationId }) {
  const reviewBy = addDays(asOf, 7);
  const minimumSalaryConcern = job.salaryFrom !== null && job.salaryFrom < 100_000;
  const wikiEvidence = job.matchedSignals.includes("participatory-governance")
    ? ["capability.technical-operations", "project.nyc-artist-coalition"]
    : ["capability.technical-operations"];
  const discoveryTerms = job.matchedSignals.slice(0, 3);
  while (discoveryTerms.length < 3) discoveryTerms.push(`role-signal-${discoveryTerms.length + 1}`);
  const lines = [
    "---",
    `id: ${job.opportunityId}`,
    `title: ${yamlString(`${job.organization} - ${job.title}`)}`,
    "kind: opportunity",
    "status: maintained",
    "visibility: public-safe",
    "sensitivity: low",
    `last_reviewed: ${asOf}`,
    `review_by: ${reviewBy}`,
    `canonical_path: docs/knowledge-bank/opportunities/nyc-jobs-${job.jobId}.md`,
    `summary: ${yamlString(`Strong-match NYC Jobs discovery candidate: ${job.title} at ${job.organization}.`)}`,
    `canonical_url: ${job.canonicalUrl}`,
    "source_type: official-employer",
    "opportunity_status: live",
    "application_status: not-recorded",
    `posted_until: ${job.postUntil ?? reviewBy}`,
    `verified_at: ${asOf}`,
    `job_id: ${yamlString(job.jobId)}`,
    `salary_minimum: ${job.salaryFrom ?? "null"}`,
    `salary_maximum: ${job.salaryTo ?? "null"}`,
    `positions: ${job.positions}`,
    `fit_score: ${job.fitScore}`,
    `securability_score: ${job.securabilityScore}`,
    `combined_score: ${job.combinedScore}`,
    "admission_method: deterministic-strong-match",
    "human_review: requested",
    "application_materials_gate: required-before-application-material-generation",
    "portfolio_routes:",
    "  - /work/technical-operations",
    "  - /resume",
    "discovery_terms:",
    ...discoveryTerms.map((term) => `  - ${term}`),
    "hard_screens:",
    `  - id: screen.nyc-jobs.${job.jobId}.civil-service-and-posting`,
    "    text: The official detail page must confirm civil-service eligibility, external availability, compensation, and the deadline before application.",
    "    state: review-needed",
    "    disposition: verify",
    ...(minimumSalaryConcern
      ? [
          `  - id: screen.nyc-jobs.${job.jobId}.salary-floor`,
          "    text: The posted range crosses $100,000 but does not start there; Jamie must confirm compensation compatibility before applying.",
          "    state: review-needed",
          "    disposition: conditional"
        ]
      : []),
    "role_requirements:",
    `  - id: requirement.nyc-jobs.${job.jobId}.delivery`,
    "    importance: critical",
    "    kind: capability",
    "    text: Coordinate complex work across stakeholders and move it through implementation.",
    "    wiki_evidence:",
    ...wikiEvidence.map((id) => `      - ${id}`),
    "    public_evidence:",
    "      - route: /work/technical-operations",
    "        needle: Coordinate delivery across concurrent projects",
    "    status: visible-proven",
    "    gap_type: none",
    "    next_action: Close-read the official detail page and bind each critical requirement to specific public and Wiki evidence.",
    "confirmed_facts:",
    "  - The NYC Jobs dataset marks this posting External.",
    `  - The recorded annual salary range is ${money(job.salaryFrom)} to ${money(job.salaryTo)}.`,
    `  - The dataset records ${job.positions} position${job.positions === 1 ? "" : "s"} and a ${job.postUntil ?? "not-recorded"} deadline.`,
    "inferences:",
    `  - The deterministic model found ${job.matchedSignals.length} Jamie-relevant signal families and admitted the role above the strong-match threshold.`,
    "unknowns:",
    "  - The dataset alone does not establish Jamie's civil-service eligibility, the hiring team, applicant competition, exact salary offer, or present availability.",
    "  - The official detail page and application surface have not yet received the full role-specific close reading required for application materials.",
    "one_year_success_conditions:",
    "  - Jamie has helped the team move consequential work from ambiguity through implementation while making priorities, decisions, and ownership easier to see.",
    "  - The role has supported sustainable growth, public value, trusted collaboration, and a healthy operating rhythm for Jamie and the team.",
    "one_year_risk_conditions:",
    "  - The actual work centers on a specialized domain or civil-service requirement that the intake screen did not capture.",
    "  - Decision authority, compensation, staffing, or workload makes durable success unhealthy or unrealistic.",
    "interview_questions:",
    "  - What outcomes would make you say this hire had an excellent first year, and what would they need to make true in the first ninety days?",
    "  - Who owns priority and scope decisions, and how does this role work with that person when needs conflict?",
    "  - What compensation within the posted range is budgeted for a candidate with this experience?",
    "relations:",
    "  - type: uses_source",
    `    target: ${sourceId}`,
    "    href: ../sources/nyc-jobs-open-data.md",
    "  - type: related_to",
    `    target: ${evaluationId}`,
    "    href: ../evaluations/nyc-jobs-opportunity-feed.md",
    "---",
    "",
    `# ${job.title}`,
    "",
    `This automatically admitted intake opportunity comes from the official NYC Jobs open-data feed. Its fit score (${job.fitScore}), securability score (${job.securabilityScore}), and combined score (${job.combinedScore}) clear the configured strong-match gate.`,
    "",
    "It is ready for close reading, not automatic submission. Before generating or approving application materials, recheck the official detail page, salary, civil-service eligibility, and official posting status; then identify the nearest public hiring-reader contexts and map every critical requirement to truthful evidence.",
    ""
  ];
  return lines.join("\n");
}

function sourceRecord({ asOf, metadata, config, updatedAt }) {
  const reviewBy = addDays(asOf, 7);
  return [
    "---",
    "id: source.jobs.nyc-open-data.current",
    "title: NYC Jobs official open-data feed",
    "kind: source",
    "status: maintained",
    "visibility: public-safe",
    "sensitivity: low",
    `last_reviewed: ${asOf}`,
    `review_by: ${reviewBy}`,
    "canonical_path: docs/knowledge-bank/sources/nyc-jobs-open-data.md",
    `canonical_url: ${config.landingPage}`,
    "source_type: official-public-data",
    "source_kind: official-job-dataset",
    "publisher: City of New York",
    "provider: Department of Citywide Administrative Services (DCAS)",
    `dataset_id: ${config.datasetId}`,
    `data_last_updated: ${updatedAt.slice(0, 10)}`,
    `rows_updated_at: ${updatedAt}`,
    `row_count: ${metadata.rowCount}`,
    `update_frequency: ${yamlString(metadata.updateFrequency)}`,
    `automated_update: ${String(metadata.automation).toLowerCase() === "yes"}`,
    `verified_at: ${asOf}`,
    "summary: Machine-readable official source for current City job discovery, freshness checks, deterministic screening, and review-gated opportunity intake.",
    "human_review: governed-open",
    "---",
    "",
    "# NYC Jobs official open-data feed",
    "",
    `Data last updated: ${humanDate(updatedAt)}. The verified snapshot contains ${Number(metadata.rowCount).toLocaleString("en-US")} rows. NYC Open Data identifies the feed as automated and updated weekly. It contains both internal and external postings, so external-applicant status is a mandatory deterministic screen.`,
    "",
    "This is a complementary discovery source. It does not replace direct checks of CityJobs search results and official detail pages. In the August 18 snapshot, several current OTI product and SPEED postings already tracked in the Wiki were absent, so the daily digest merges qualified feed discoveries with maintained opportunities rather than treating this dataset as a complete inventory.",
    "",
    "A newer `rowsUpdatedAt` value marks the local opportunity snapshot stale and releases a refresh. A metadata-page edit by itself does not. A source-clock regression fails closed for review.",
    "",
    "## Boundaries",
    "",
    "- A row is evidence that the source listed a posting at the observation time, not that the role remains open or that Jamie qualifies.",
    "- Scores are prioritization aids, not probabilities, endorsements, or hiring predictions.",
    "- Raw descriptions are processed transiently and are not copied into the generated opportunity records.",
    "- Every admitted record remains review-gated before application-material generation or submission.",
    ""
  ].join("\n");
}

function evaluationRecord({ asOf, updatedAt, qualification, config }) {
  const rows = qualification.admitted.map(
    (job, index) =>
      `| ${index + 1} | ${job.jobId} | [${job.title}](../opportunities/nyc-jobs-${job.jobId}.md) | ${job.organization} | ${job.fitScore} | ${job.securabilityScore} | ${job.combinedScore} | ${money(job.salaryFrom)}–${money(job.salaryTo)} | ${job.postUntil ?? "verify"} |`
  );
  return [
    "---",
    "id: evaluation.jobs.nyc-open-data.strong-match",
    "title: NYC Jobs deterministic strong-match opportunity feed",
    "kind: evaluation",
    "status: maintained",
    "visibility: public-safe",
    "sensitivity: low",
    `last_reviewed: ${asOf}`,
    `review_by: ${addDays(asOf, 7)}`,
    "canonical_path: docs/knowledge-bank/evaluations/nyc-jobs-opportunity-feed.md",
    "summary: Cost-conscious deterministic screening and transparent Jamie-specific ranking of the official NYC Jobs open-data feed.",
    "relations:",
    "  - type: uses_source",
    "    target: source.jobs.nyc-open-data.current",
    "    href: ../sources/nyc-jobs-open-data.md",
    "human_review: governed-open",
    "---",
    "",
    "# NYC Jobs deterministic strong-match opportunity feed",
    "",
    `This run evaluated the ${humanDate(updatedAt)} row-data edition. It deduplicated ${qualification.rowCount.toLocaleString("en-US")} source rows into ${qualification.uniqueJobCount.toLocaleString("en-US")} jobs, deterministically excluded ${qualification.excluded.length.toLocaleString("en-US")} ineligible or specialized rows before scoring, scored ${qualification.scoredCount.toLocaleString("en-US")}, and admitted ${qualification.admitted.length} above the strong gate.`,
    "",
    `Admission requires fit at least ${config.strongMatchThreshold.fit}, securability at least ${config.strongMatchThreshold.securability}, and combined score at least ${config.strongMatchThreshold.combined}. Combined score weights fit at 62% and securability at 38%. The scores are relative evidence scores, not probabilities.`,
    "",
    "| Rank | Job ID | Role | Agency | Fit | Securability | Combined | Salary | Deadline |",
    "| ---: | --- | --- | --- | ---: | ---: | ---: | --- | --- |",
    ...rows,
    "",
    "## Gate order",
    "",
    "1. Deduplicate internal and external copies by Job ID, preferring the external row.",
    "2. Exclude internal-only, expired, sub-$100,000 maximum, licensed-specialist, advanced-degree-required, and construction-specialist postings.",
    "3. Require a Jamie-relevant title family before broad City boilerplate can count.",
    "4. Score functional fit, participatory-governance relevance, salary, vacancy count, deadline, qualification flexibility, and requested experience.",
    "5. Materialize only strong survivors as review-gated opportunity nodes.",
    "6. Merge them with maintained live opportunities for the daily action digest.",
    "",
    "## Human and model gates",
    "",
    "Direct official-posting review remains required. Only after deterministic admission and role-specific evidence mapping may a tailored resume, cover letter, or named synthetic hiring-reader evaluation run. Jamie alone decides whether and when to apply.",
    ""
  ].join("\n");
}

function compactOpportunity(job) {
  return {
    opportunityId: job.opportunityId,
    jobId: job.jobId,
    title: job.title,
    organization: job.organization,
    canonicalUrl: job.canonicalUrl,
    source: job.source,
    positions: job.positions,
    salaryFrom: job.salaryFrom,
    salaryTo: job.salaryTo,
    postUntil: job.postUntil,
    titleAlignmentScore: job.titleAlignmentScore,
    fitScore: job.fitScore,
    securabilityScore: job.securabilityScore,
    combinedScore: job.combinedScore,
    matchedSignals: job.matchedSignals,
    admissionFailures: job.admissionFailures ?? []
  };
}

export function buildRefreshArtifacts({
  asOf,
  metadata,
  qualification,
  trackedOpportunities,
  config
}) {
  const updatedAt = sourceUpdatedAt(metadata);
  const actionable = mergeActionableOpportunities(
    qualification.admitted,
    trackedOpportunities,
    { asOf }
  );
  const digest = buildOpportunityDigest({ asOf, sourceUpdatedAt: updatedAt, opportunities: actionable });
  const exclusionReasons = {};
  for (const item of qualification.excluded) {
    for (const reason of item.reasons) exclusionReasons[reason] = (exclusionReasons[reason] ?? 0) + 1;
  }
  const report = {
    schemaVersion: 1,
    datasetId: config.datasetId,
    datasetRowsUpdatedAt: updatedAt,
    generatedAt: `${asOf}T12:00:00.000Z`,
    threshold: config.strongMatchThreshold,
    rowCount: qualification.rowCount,
    uniqueJobCount: qualification.uniqueJobCount,
    deterministicExcludedCount: qualification.excluded.length,
    exclusionReasons,
    scoredCount: qualification.scoredCount,
    admittedCount: qualification.admitted.length,
    admitted: qualification.admitted.map(compactOpportunity),
    topRejected: qualification.rejected.slice(0, 25).map(compactOpportunity),
    actionableCount: actionable.length,
    actionable: actionable.map((item) => ({
      opportunityId: item.opportunityId,
      jobId: item.jobId,
      title: item.title,
      organization: item.organization,
      canonicalUrl: item.canonicalUrl,
      source: item.source,
      postedUntil: item.postUntil ?? item.postedUntil ?? null,
      applicationStatus: item.applicationStatus ?? "not-recorded",
      salaryFrom: item.salaryFrom ?? null,
      salaryTo: item.salaryTo ?? null,
      positions: item.positions ?? 1,
      fitScore: item.fitScore,
      securabilityScore: item.securabilityScore,
      combinedScore: item.combinedScore
    })),
    boundaries: [
      "Scores are prioritization aids, not hiring probabilities.",
      "Direct official-posting review is required before application materials or submission.",
      "Raw job descriptions are not retained in generated records."
    ]
  };
  const nextConfig = {
    ...config,
    lastSeenRowsUpdatedAt: updatedAt,
    lastSeenRowCount: Number(metadata.rowCount),
    lastRefreshDate: asOf
  };
  const sourceId = "source.jobs.nyc-open-data.current";
  const evaluationId = "evaluation.jobs.nyc-open-data.strong-match";
  const files = {
    "config/opportunities/nyc-jobs.json": `${JSON.stringify(nextConfig, null, 2)}\n`,
    "reports/opportunities/nyc-jobs-qualified.json": `${JSON.stringify(report, null, 2)}\n`,
    "reports/opportunities/nyc-jobs-digest.md": digest.markdown,
    "docs/knowledge-bank/sources/nyc-jobs-open-data.md": sourceRecord({ asOf, metadata, config, updatedAt }),
    "docs/knowledge-bank/evaluations/nyc-jobs-opportunity-feed.md": evaluationRecord({ asOf, updatedAt, qualification, config })
  };
  for (const job of qualification.admitted) {
    files[`docs/knowledge-bank/opportunities/nyc-jobs-${job.jobId}.md`] = generatedOpportunityRecord(job, {
      asOf,
      sourceId,
      evaluationId
    });
  }
  return { files, report, actionable, digest };
}

export function deliveryDecision({ appEnv, delivery, apiKey, from, to }) {
  if (appEnv !== "production") return { mode: "dry-run", reason: "non-production-environment" };
  if (delivery !== "send") return { mode: "dry-run", reason: "delivery-disabled" };
  if (![apiKey, from, to].every((value) => typeof value === "string" && value.trim())) {
    return { mode: "blocked", reason: "email-configuration-incomplete" };
  }
  return { mode: "send", reason: "authorized-and-configured" };
}

export async function deliverDigest({
  digest,
  appEnv,
  delivery,
  apiKey,
  from,
  to,
  fetchImpl = fetch
}) {
  const decision = deliveryDecision({ appEnv, delivery, apiKey, from, to });
  if (decision.mode !== "send") return decision;
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({ from, to: [to], subject: digest.subject, text: digest.markdown })
  });
  if (!response.ok) {
    throw new Error(`Opportunity digest email failed with HTTP ${response.status}`);
  }
  const body = await response.json();
  return { mode: "sent", providerId: body.id };
}
