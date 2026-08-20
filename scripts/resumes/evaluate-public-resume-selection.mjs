import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const defaultConfig = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/resumes/public-resume-selection.json"), "utf8")
);

function frontmatterValue(markdown, key) {
  const raw = markdown.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? null;
  if (raw === "null") return null;
  return raw;
}

function sameMembers(left, right) {
  const a = [...left].sort();
  const b = [...right].sort();
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function resumeSetFor(config, opportunityIds) {
  return config.resumeSets.find((entry) => sameMembers(entry.opportunityIds, opportunityIds)) ?? null;
}

export function evaluatePublicResumeSelection({
  root = repoRoot,
  config = defaultConfig,
  opportunityOverrides = {}
} = {}) {
  const asOfDate = config.asOf.slice(0, 10);
  const activeStatuses = new Set(config.policy.activeApplicationStatuses);
  const candidates = config.candidates.map((candidate) => {
    const absolute = path.join(root, candidate.opportunityPath);
    const markdown = Object.prototype.hasOwnProperty.call(opportunityOverrides, candidate.opportunityPath)
      ? opportunityOverrides[candidate.opportunityPath]
      : existsSync(absolute)
        ? readFileSync(absolute, "utf8")
        : "";
    const opportunityId = frontmatterValue(markdown, "id");
    const opportunityStatus = frontmatterValue(markdown, "opportunity_status");
    const applicationStatus = frontmatterValue(markdown, "application_status") ?? "not-recorded";
    const postedUntil = frontmatterValue(markdown, "posted_until");
    const reviewBy = frontmatterValue(markdown, "review_by");
    const hardBlocked = /^\s*disposition:\s*do-not-pursue\s*$/im.test(markdown);
    const idPass = opportunityId === candidate.opportunityId;
    const reviewFresh = reviewBy !== null && reviewBy >= asOfDate;
    const postingOpen =
      opportunityStatus === config.policy.openOpportunityStatus &&
      postedUntil !== null &&
      postedUntil >= asOfDate;
    const salaryCompatible =
      candidate.salaryMaximum !== null &&
      candidate.salaryMaximum >= config.policy.minimumAcceptableSalary;
    const eligibilityPass = candidate.externalApplicantEligible === true && !hardBlocked;
    const activeApplication = activeStatuses.has(applicationStatus) && eligibilityPass && reviewFresh;
    const openOpportunity =
      postingOpen &&
      reviewFresh &&
      eligibilityPass &&
      salaryCompatible;
    return {
      ...candidate,
      opportunityIdFound: opportunityId,
      opportunityStatus,
      applicationStatus,
      postedUntil,
      reviewBy,
      checks: { idPass, reviewFresh, postingOpen, salaryCompatible, eligibilityPass },
      activeApplication,
      openOpportunity
    };
  });

  const active = candidates.filter((candidate) => candidate.activeApplication);
  const open = candidates.filter((candidate) => candidate.openOpportunity);
  const historicalCount = Math.ceil(
    candidates.length * config.policy.historicalFallbackFraction
  );
  const historical = [...candidates]
    .sort((left, right) => left.historicalFitRank - right.historicalFitRank)
    .slice(0, historicalCount);
  const selectedTier = active.length > 0
    ? "active-applications"
    : open.length > 0
      ? "open-opportunities"
      : "historical-top-quarter";
  const selected = selectedTier === "active-applications"
    ? active
    : selectedTier === "open-opportunities"
      ? open
      : historical;
  const selectedOpportunityIds = selected.map((candidate) => candidate.opportunityId).sort();
  const resumeSet = resumeSetFor(config, selectedOpportunityIds);
  const artifactSpecPath = path.join(root, config.siteArtifact.artifactSpecPath);
  const artifactSpec = existsSync(artifactSpecPath)
    ? JSON.parse(readFileSync(artifactSpecPath, "utf8"))
    : null;
  const resumeSetBound =
    resumeSet !== null &&
    existsSync(path.join(root, resumeSet.resumePath)) &&
    artifactSpec?.sourceMarkdownPath === resumeSet.resumePath;
  const candidateIdsUnique =
    new Set(config.candidates.map((candidate) => candidate.opportunityId)).size === config.candidates.length;
  const historicalRanksComplete =
    new Set(config.candidates.map((candidate) => candidate.historicalFitRank)).size === config.candidates.length &&
    Math.min(...config.candidates.map((candidate) => candidate.historicalFitRank)) === 1 &&
    Math.max(...config.candidates.map((candidate) => candidate.historicalFitRank)) === config.candidates.length;
  const selectedCandidatesValid = selected.every((candidate) => candidate.checks.idPass);
  const deterministicPass =
    candidateIdsUnique &&
    historicalRanksComplete &&
    selected.length > 0 &&
    selectedCandidatesValid &&
    resumeSetBound;
  const llmJudgeQueue = deterministicPass
    ? selected.flatMap((candidate) =>
        candidate.readerGateIds.map((gateId) => ({ gateId, opportunityId: candidate.opportunityId }))
      )
    : [];
  const allReaderGateCount = candidates.reduce(
    (total, candidate) => total + candidate.readerGateIds.length,
    0
  );

  return {
    id: config.id,
    asOf: config.asOf,
    selectedTier,
    selectedOpportunityIds,
    selectedResumePath: resumeSet?.resumePath ?? null,
    selectedScope: resumeSet?.scope ?? null,
    deterministicChecks: {
      candidateIdsUnique,
      historicalRanksComplete,
      selectedCandidatesValid,
      resumeSetBound
    },
    candidateResults: candidates,
    llmGate: {
      allowed: deterministicPass,
      queue: llmJudgeQueue,
      queuedCalls: llmJudgeQueue.length,
      avoidedCalls: Math.max(0, allReaderGateCount - llmJudgeQueue.length),
      reason: deterministicPass
        ? "Only readers bound to the selected, deterministic-eligible opportunity set may run."
        : "Role-play judging is blocked until dates, eligibility, ranking, and exact résumé-set binding pass."
    },
    overall: deterministicPass ? "pass" : "fail",
    boundary: "Selection state is deterministic. Modeled readers may evaluate only the resulting public artifact and cannot establish an actual person's opinion, civil-service qualification, interview, offer, or hire."
  };
}

function main() {
  const result = evaluatePublicResumeSelection();
  console.log(JSON.stringify(result, null, 2));
  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
