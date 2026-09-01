import { createHash } from "node:crypto";

const DAY_MONTH_YEAR = /^(\d{1,2})-([A-Z]{3})-(\d{4})$/i;
const MONTHS = new Map(
  ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map((month, index) => [
    month,
    index + 1
  ])
);

const TITLE_SIGNALS = [
  [/product operations/i, 32],
  [/product manager/i, 30],
  [/technical project manager/i, 28],
  [/chief strategy officer/i, 28],
  [/policy implementation/i, 42],
  [/implementation manager/i, 24],
  [/project manager/i, 24],
  [/program manager/i, 20],
  [/operations manager/i, 20],
  [/service delivery/i, 20],
  [/business analyst/i, 18],
  [/product design/i, 18],
  [/special projects/i, 15],
  [/digital strategy/i, 15],
  [/community engagement/i, 13],
  [/webmaster/i, 13]
];

const TEXT_SIGNALS = [
  [/(resident-facing|user-centered|human-centered|needs of (?:new yorkers|residents)|serve(?:s|d)? new yorkers)/i, 12],
  [/(discovery|roadmap|product lifecycle|user research|user stories|continuous[- ]improvement)/i, 12],
  [/(cross-functional|stakeholder|interagency|agency (?:partners|stakeholders))/i, 10],
  [/(implementation|delivery|launch|project management|process improvement)/i, 10],
  [/(person-to-person outreach|outreach campaigns?|outreach strategy|public engagement unit)/i, 16],
  [/(synthesi[sz]e[^.]{0,80}data|data-informed|outcome data|analy[sz]e data)/i, 10],
  [/(digital service|web|technology|technical|data system|software)/i, 8],
  [/(accessibility|equity|public service|inclusive)/i, 8],
  [/(metrics|kpi|measurement|program evaluation|outcomes)/i, 6],
  [/(procurement|budget|operations|vendor)/i, 6],
  [/(community engagement|coalition|convening|participatory)/i, 6]
];

const TITLE_PENALTIES = [
  [/(deputy commissioner|executive director|chief of|chief\b)/i, 28],
  [/(attorney|counsel|physician|medical director|clinical director|nurse|accountant|auditor)/i, 40],
  [/(construction|estimator|inspector|civil engineer|mechanical engineer|electrical engineer)/i, 35],
  [/(solutions architect|systems engineer|devops engineer|software engineer|developer)/i, 20],
  [/\bassociate director\b/i, 8],
  [/(?<!associate )\bdirector\b/i, 15]
];

const CREDENTIAL_HARD_SCREENS = [
  /new york state[^.]{0,100}license[^.]{0,60}(?:required|must)/i,
  /license to practice (?:medicine|law|nursing)/i,
  /admission to (?:the )?new york state bar/i,
  /registered architect/i,
  /professional engineer(?:ing)?[^.]{0,80}license/i,
  /clinical laboratory[^.]{0,100}license/i,
  /(?:all candidates|applicants|candidates) must have at least (?:an? )?master['’]s degree/i
];

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function normalizedText(row) {
  return [
    row.business_title,
    row.civil_service_title,
    row.division_work_unit,
    row.job_description,
    row.minimum_qual_requirements,
    row.preferred_skills,
    row.additional_information
  ]
    .filter(Boolean)
    .join(" ");
}

export function parseCityDate(value) {
  if (!value) return null;
  const match = String(value).trim().match(DAY_MONTH_YEAR);
  if (!match) return null;
  const month = MONTHS.get(match[2].toUpperCase());
  if (!month) return null;
  return `${match[3]}-${String(month).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

export function inspectFreshness(metadata, config) {
  const base = {
    remoteRowsUpdatedAt: metadata?.rowsUpdatedAt ?? null,
    storedRowsUpdatedAt: config?.rowsUpdatedAt ?? null
  };
  if (metadata?.id !== config?.datasetId) {
    return { state: "blocked", reason: "dataset-identity-changed", ...base };
  }
  const remoteFields = new Set((metadata?.columns ?? []).map((column) => column.fieldName));
  const missingFields = (config?.requiredFields ?? []).filter((field) => !remoteFields.has(field));
  if (missingFields.length > 0) {
    return { state: "blocked", reason: "schema-drift", missingFields, ...base };
  }
  if (!Number.isFinite(metadata?.rowsUpdatedAt) || !Number.isFinite(config?.rowsUpdatedAt)) {
    return { state: "blocked", reason: "invalid-update-timestamp", ...base };
  }
  if (metadata.rowsUpdatedAt < config.rowsUpdatedAt) {
    return { state: "blocked", reason: "source-timestamp-regressed", ...base };
  }
  if (metadata.rowsUpdatedAt > config.rowsUpdatedAt) {
    return { state: "stale", reason: "source-updated", ...base };
  }
  return { state: "current", reason: "timestamps-match", ...base };
}

export function screenPosting(row, { asOf, salaryFloor = 100_000 } = {}) {
  const reasons = [];
  const salaryTo = Number(row.salary_range_to);
  const deadline = parseCityDate(row.post_until);
  const minimumQualifications = row.minimum_qual_requirements ?? "";
  const eligibilityText = `${row.job_description ?? ""} ${row.additional_information ?? ""}`;

  if (!row.job_id) reasons.push("missing-job-id");
  if (row.posting_type !== "External") reasons.push("not-external");
  if (row.salary_frequency !== "Annual") reasons.push("not-annual-salary");
  if (!Number.isFinite(salaryTo) || salaryTo < salaryFloor) reasons.push("salary-ceiling-below-target");
  if (deadline && asOf && deadline < asOf) reasons.push("deadline-passed");
  if (CREDENTIAL_HARD_SCREENS.some((pattern) => pattern.test(minimumQualifications))) {
    reasons.push("credential-hard-screen");
  }
  if (
    /(?:open only to (?:the )?current city of new york employees|only permanent employees|candidates must be permanent in (?:the )?[^.]{0,100}civil service title)/i.test(
      eligibilityText
    )
  ) {
    reasons.push("current-city-employee-only");
  }

  return {
    eligible: reasons.length === 0,
    reasons,
    deadline,
    salaryFrom: Number(row.salary_range_from),
    salaryTo
  };
}

export function scorePosting(row, { asOf, threshold = { composite: 78, fit: 75, secure: 65 } } = {}) {
  const screen = screenPosting(row, { asOf });
  const title = row.business_title ?? "";
  const text = normalizedText(row);
  let fit = 15;
  let secure = 30;

  for (const [pattern, points] of TITLE_SIGNALS) {
    if (pattern.test(title)) fit += points;
  }
  for (const [pattern, points] of TEXT_SIGNALS) {
    if (pattern.test(text)) fit += points;
  }
  for (const [pattern, points] of TITLE_PENALTIES) {
    if (pattern.test(title)) fit -= points;
  }

  if (Number(row.salary_range_from) >= 100_000) secure += 15;
  else if (Number(row.salary_range_to) >= 100_000) secure += 8;
  if (TITLE_SIGNALS.some(([pattern]) => pattern.test(title))) secure += 20;
  if (/satisfactory equivalent combination|high school diploma|baccalaureate degree/i.test(row.minimum_qual_requirements ?? "")) {
    secure += 15;
  }
  const requestedYears = [...text.matchAll(/(?:minimum|min\.?|at least)?\s*(\d{1,2})\s*(?:\+\s*)?years?/gi)]
    .map((match) => Number(match[1]))
    .filter((value) => value > 0 && value < 40);
  const writtenYearValues = new Map([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
    ["ten", 10],
    ["eleven", 11],
    ["twelve", 12]
  ]);
  for (const match of text.matchAll(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve) years?\b/gi)) {
    requestedYears.push(writtenYearValues.get(match[1].toLowerCase()));
  }
  const highestYears = requestedYears.length > 0 ? Math.max(...requestedYears) : null;
  if (highestYears !== null && highestYears <= 6) secure += 10;
  else if (highestYears !== null && highestYears <= 10) secure += 5;
  else if (highestYears !== null && highestYears >= 12) secure -= 10;
  if (/TECHNOLOGY & INNOVATION|CONSUMER AND WORKER PROTECTION|CAMPAIGN FINANCE BOARD|OFFICE OF THE MAYOR/i.test(row.agency ?? "")) {
    secure += 5;
  }
  if (/(deputy commissioner|executive director|chief of|chief\b)/i.test(title)) secure -= 25;
  else if (/\bassociate director\b/i.test(title)) secure -= 8;
  else if (/\bdirector\b/i.test(title)) secure -= 15;
  if (TITLE_PENALTIES.slice(1, 4).some(([pattern]) => pattern.test(title))) secure -= 30;
  if (!row.minimum_qual_requirements) secure -= 5;

  const fitScore = clamp(fit);
  const secureScore = clamp(secure);
  const compositeScore = Number((fitScore * 0.55 + secureScore * 0.45).toFixed(2));
  const admitted =
    screen.eligible &&
    fitScore >= threshold.fit &&
    secureScore >= threshold.secure &&
    compositeScore >= threshold.composite;

  return {
    admitted,
    fitScore,
    secureScore,
    compositeScore,
    qualificationReview: "human-review-required",
    screen,
    signals: {
      highestRequestedYears: highestYears
    }
  };
}

function canonicalRow(rows) {
  return [...rows].sort((left, right) => {
    if (left.posting_type === right.posting_type) return 0;
    return left.posting_type === "External" ? -1 : 1;
  })[0];
}

function rowToMatch(row, score) {
  return {
    jobId: row.job_id,
    title: row.business_title,
    agency: row.agency,
    salaryFrom: score.screen.salaryFrom,
    salaryTo: score.screen.salaryTo,
    deadline: score.screen.deadline,
    fitScore: score.fitScore,
    secureScore: score.secureScore,
    compositeScore: score.compositeScore,
    qualificationReview: score.qualificationReview,
    officialUrl: `https://cityjobs.nyc.gov/jobs?options=&page=1&q=${encodeURIComponent(row.job_id)}`
  };
}

export function buildOpportunitySnapshot({ rows, metadata, config, asOf }) {
  const grouped = new Map();
  for (const row of rows) {
    const key = row.job_id || `missing-${grouped.size}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  }
  const knownJobIds = new Set((config.knownJobIds ?? []).map(String));
  const evaluated = [...grouped.values()].map(canonicalRow).map((row) => ({
    row,
    score: scorePosting(row, { asOf, threshold: config.strongMatchThreshold })
  }));
  const strongMatches = evaluated
    .filter(({ score }) => score.admitted)
    .map(({ row, score }) => rowToMatch(row, score))
    .sort((left, right) => right.compositeScore - left.compositeScore || left.jobId.localeCompare(right.jobId));

  return {
    schemaVersion: 1,
    dataset: {
      id: metadata.id,
      rowsUpdatedAt: metadata.rowsUpdatedAt,
      rowsUpdatedAtIso: new Date(metadata.rowsUpdatedAt * 1000).toISOString()
    },
    evaluatedAt: `${asOf}T00:00:00.000Z`,
    policy: {
      salaryTarget: 100000,
      strongMatchThreshold: config.strongMatchThreshold,
      automaticDisposition: "provisional-intake-only"
    },
    census: {
      sourceRows: rows.length,
      uniqueJobIds: grouped.size,
      deterministicallyEligible: evaluated.filter(({ score }) => score.screen.eligible).length,
      strongMatches: strongMatches.length
    },
    knownStrongMatches: strongMatches.filter((entry) => knownJobIds.has(entry.jobId)),
    newStrongMatches: strongMatches.filter((entry) => !knownJobIds.has(entry.jobId)),
    knownJobIdsAbsentFromDataset: [...knownJobIds].filter((jobId) => !grouped.has(jobId)).sort(),
    snapshotSha256: createHash("sha256")
      .update(JSON.stringify([...grouped.values()].map(canonicalRow).sort((a, b) => String(a.job_id).localeCompare(String(b.job_id)))))
      .digest("hex")
  };
}

export function buildDigest({ asOf, activeApplications = [], openOpportunities = [], newStrongMatches = [] }) {
  const actions = [
    ...openOpportunities.map((entry) => ({ kind: "apply", ...entry })),
    ...newStrongMatches
      .filter((entry) => !entry.deadline || entry.deadline >= asOf)
      .map((entry) => ({ kind: "review-new-match", ...entry })),
    ...activeApplications.map((entry) => ({ kind: "prepare-active-candidacy", ...entry }))
  ].sort((left, right) => {
    const kindOrder = { apply: 1, "review-new-match": 2, "prepare-active-candidacy": 3 };
    return kindOrder[left.kind] - kindOrder[right.kind] || String(left.deadline ?? "9999").localeCompare(String(right.deadline ?? "9999"));
  });
  const lines = [
    `# Hiring action digest — ${asOf}`,
    "",
    `${actions.length} active, strategically targeted action${actions.length === 1 ? "" : "s"}.`,
    ""
  ];
  for (const action of actions) {
    const verb = action.kind === "apply" ? "Apply" : action.kind === "review-new-match" ? "Review new strong match" : "Prepare active candidacy";
    lines.push(`- **${verb}:** ${action.title} (Job ID ${action.jobId})${action.deadline ? ` — deadline ${action.deadline}` : ""}`);
  }
  lines.push("", "Jamie retains application authority; this digest never submits an application.", "");
  return {
    asOf,
    subject: `${actions.length} hiring actions for Jamie — ${asOf}`,
    actions,
    markdown: lines.join("\n")
  };
}

export function extractLifecycleActions(config, asOf) {
  const entries = Array.isArray(config?.opportunities) ? config.opportunities : [];
  const mapEntry = (entry) => ({
    jobId: entry.opportunityId?.split(".").at(-1) ?? "unknown",
    title: entry.title,
    deadline: entry.closesOn,
    compositeScore: entry.fitScore,
    applicationState: entry.applicationState,
    officialUrl: entry.officialSource
  });
  const activeApplications = entries
    .filter(
      (entry) =>
        entry.considered === true &&
        ["submitted", "interviewing", "offer"].includes(entry.applicationState) &&
        entry.outcomeState === "pending" &&
        ["clear", "review-needed"].includes(entry.eligibilityState)
    )
    .map(mapEntry);
  const openOpportunities = entries
    .filter(
      (entry) =>
        entry.considered === true &&
        entry.postingState === "open" &&
        entry.applicationState === "not-applied" &&
        entry.outcomeState === "none" &&
        ["clear", "review-needed"].includes(entry.eligibilityState) &&
        (!entry.closesOn || entry.closesOn >= asOf)
    )
    .map(mapEntry);
  return { activeApplications, openOpportunities };
}

export function extractNycJobIds(config) {
  return (Array.isArray(config?.opportunities) ? config.opportunities : [])
    .filter((entry) => {
      try {
        return new URL(entry.officialSource).hostname === "cityjobs.nyc.gov";
      } catch {
        return false;
      }
    })
    .map((entry) => entry.opportunityId?.split(".").at(-1))
    .filter((value) => /^\d+$/.test(value ?? ""))
    .sort();
}

function money(value) {
  return Number.isFinite(value) ? `$${Math.round(value).toLocaleString("en-US")}` : "not stated";
}

export function renderSnapshotMarkdown(snapshot) {
  const threshold = snapshot.policy.strongMatchThreshold;
  const lines = [
    "# NYC Jobs opportunity monitor",
    "",
    `Source dataset: \`${snapshot.dataset.id}\`, updated ${snapshot.dataset.rowsUpdatedAtIso}.`,
    "",
    `This run evaluated ${snapshot.census.sourceRows.toLocaleString("en-US")} rows representing ${snapshot.census.uniqueJobIds.toLocaleString("en-US")} unique job IDs. ${snapshot.census.deterministicallyEligible.toLocaleString("en-US")} passed the inexpensive eligibility screen and ${snapshot.census.strongMatches.toLocaleString("en-US")} passed the strong-match gate.`,
    "",
    `The automatic disposition is **provisional intake only**. The gate requires composite ≥ ${threshold.composite}, fit ≥ ${threshold.fit}, and estimated hiring likelihood ≥ ${threshold.secure}. A named hiring-reader review and factual qualification review are still required before canonical opportunity promotion or public-material changes.`,
    "",
    "## New strong-match intake",
    ""
  ];
  if (snapshot.newStrongMatches.length === 0) lines.push("No new posting cleared the gate in this snapshot.");
  for (const match of snapshot.newStrongMatches) {
    lines.push(
      `- [${match.title} — ${match.agency} (Job ID ${match.jobId})](${match.officialUrl}): ${money(match.salaryFrom)}-${money(match.salaryTo)}; deadline ${match.deadline ?? "not stated"}; fit ${match.fitScore}; estimated hiring likelihood ${match.secureScore}; composite ${match.compositeScore}.`
    );
  }
  lines.push("", "## Coverage warning", "");
  lines.push(
    "Absence from this feed does not close, expire, or reject an already governed opportunity. Official posting pages and application state remain authoritative for those lifecycle decisions."
  );
  if (snapshot.knownJobIdsAbsentFromDataset.length > 0) {
    lines.push("", `Known job IDs absent from this snapshot: ${snapshot.knownJobIdsAbsentFromDataset.join(", ")}.`);
  }
  lines.push("");
  return lines.join("\n");
}

export function requireEmailDeliveryConfig(env = process.env) {
  if (!env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is required for email delivery.");
  if (!env.JOB_DIGEST_FROM) throw new Error("JOB_DIGEST_FROM is required for email delivery.");
  if (env.JOB_DIGEST_TO !== "jamie@ohai.us") throw new Error("JOB_DIGEST_TO must be jamie@ohai.us.");
  return {
    apiKey: env.RESEND_API_KEY,
    from: env.JOB_DIGEST_FROM,
    to: env.JOB_DIGEST_TO
  };
}

export async function deliverDigest(digest, { fetchImpl = fetch, env = process.env } = {}) {
  const delivery = requireEmailDeliveryConfig(env);
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${delivery.apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: delivery.from,
      to: [delivery.to],
      subject: digest.subject,
      text: digest.markdown
    })
  });
  const body = await response.json();
  if (!response.ok || !body?.id) {
    throw new Error(`Email provider rejected the digest: ${body?.message ?? response.status ?? "unknown error"}`);
  }
  return { provider: "resend", messageId: body.id, recipient: delivery.to };
}
