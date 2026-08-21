import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(relativePath, root = repoRoot) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

const defaultConfig = readJson("evals/resumes/public-resume-selection.json");

const POSTING_STATES = new Set(["open", "closed", "expired"]);
const APPLICATION_STATES = new Set([
  "not-applied",
  "submitted",
  "interviewing",
  "offer",
  "withdrawn",
  "rejected"
]);
const OUTCOME_STATES = new Set(["none", "pending", "positive", "negative"]);
const ELIGIBILITY_STATES = new Set(["clear", "review-needed", "not-met", "unknown"]);
const ACTIVE_APPLICATION_STATES = new Set(["submitted", "interviewing", "offer"]);
const ELIGIBLE_STATES = new Set(["clear", "review-needed"]);

function validIsoDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function daysBetween(earlier, later) {
  return Math.floor((Date.parse(`${later}T00:00:00Z`) - Date.parse(`${earlier}T00:00:00Z`)) / 86_400_000);
}

function sameMembers(left, right) {
  return left.length === right.length && [...left].sort().every((value, index) => value === [...right].sort()[index]);
}

function artifact(root, relativePath, overrides) {
  if (!relativePath) return null;
  if (Object.prototype.hasOwnProperty.call(overrides, relativePath)) {
    return Buffer.isBuffer(overrides[relativePath]) ? overrides[relativePath] : Buffer.from(overrides[relativePath]);
  }
  const absolutePath = path.join(root, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath) : null;
}

function sha256(value) {
  return value === null ? null : createHash("sha256").update(value).digest("hex");
}

function opportunityErrors(opportunity, asOf, maxOpenVerificationAgeDays) {
  const errors = [];
  const prefix = opportunity.opportunityId || "opportunity-without-id";
  if (!opportunity.opportunityId) errors.push(`${prefix}:missing-id`);
  if (!POSTING_STATES.has(opportunity.postingState)) errors.push(`${prefix}:invalid-posting-state`);
  if (!APPLICATION_STATES.has(opportunity.applicationState)) errors.push(`${prefix}:invalid-application-state`);
  if (!OUTCOME_STATES.has(opportunity.outcomeState)) errors.push(`${prefix}:invalid-outcome-state`);
  if (!ELIGIBILITY_STATES.has(opportunity.eligibilityState)) errors.push(`${prefix}:invalid-eligibility-state`);
  if (!Number.isFinite(opportunity.fitScore)) errors.push(`${prefix}:missing-fit-score`);
  if (!validIsoDate(opportunity.lastVerifiedAt)) errors.push(`${prefix}:invalid-last-verified-at`);
  if (opportunity.closesOn !== null && !validIsoDate(opportunity.closesOn)) errors.push(`${prefix}:invalid-closes-on`);
  if (opportunity.eligibilityState === "unknown") errors.push(`${prefix}:unknown-eligibility`);

  if (ACTIVE_APPLICATION_STATES.has(opportunity.applicationState) && opportunity.outcomeState !== "pending") {
    errors.push(`${prefix}:active-application-without-pending-outcome`);
  }
  if (opportunity.applicationState === "not-applied" && opportunity.outcomeState !== "none") {
    errors.push(`${prefix}:unapplied-opportunity-has-outcome`);
  }

  if (opportunity.postingState === "open") {
    if (opportunity.closesOn && opportunity.closesOn < asOf) {
      errors.push(`${prefix}:open-state-past-deadline`);
    }
    if (!opportunity.closesOn && validIsoDate(opportunity.lastVerifiedAt)) {
      const age = daysBetween(opportunity.lastVerifiedAt, asOf);
      if (age < 0 || age > maxOpenVerificationAgeDays) errors.push(`${prefix}:stale-undated-open-verification`);
    }
  }
  return errors;
}

function isActiveApplication(opportunity) {
  return (
    opportunity.considered === true &&
    ACTIVE_APPLICATION_STATES.has(opportunity.applicationState) &&
    opportunity.outcomeState === "pending" &&
    ELIGIBLE_STATES.has(opportunity.eligibilityState)
  );
}

function isOpenUnapplied(opportunity, asOf, maxOpenVerificationAgeDays) {
  if (
    opportunity.considered !== true ||
    opportunity.postingState !== "open" ||
    opportunity.applicationState !== "not-applied" ||
    opportunity.outcomeState !== "none" ||
    !ELIGIBLE_STATES.has(opportunity.eligibilityState)
  ) return false;

  if (opportunity.closesOn) return opportunity.closesOn >= asOf;
  return validIsoDate(opportunity.lastVerifiedAt) && daysBetween(opportunity.lastVerifiedAt, asOf) <= maxOpenVerificationAgeDays;
}

function skippedReason(opportunity, tier, selectedIds, asOf) {
  if (selectedIds.has(opportunity.opportunityId)) return null;
  if (opportunity.eligibilityState === "not-met") return "hard-screen-not-met";
  if (opportunity.eligibilityState === "unknown") return "eligibility-unknown";
  if (tier === "submitted-active") return "active-application-tier-takes-precedence";
  if (opportunity.postingState !== "open") return `posting-${opportunity.postingState}`;
  if (opportunity.closesOn && opportunity.closesOn < asOf) return "deadline-passed";
  if (opportunity.applicationState !== "not-applied") return `application-${opportunity.applicationState}`;
  return "not-selected-by-tier";
}

export function selectPublicResume({
  root = repoRoot,
  config = defaultConfig,
  asOf = config.asOf,
  artifactOverrides = {},
  enforceExpected = true,
  skipArtifactChecks = false
} = {}) {
  const errors = [];
  if (!validIsoDate(asOf)) errors.push("config:invalid-as-of");
  if (!Array.isArray(config.opportunities) || config.opportunities.length === 0) errors.push("config:no-opportunities");

  const ids = config.opportunities.map((entry) => entry.opportunityId);
  if (new Set(ids).size !== ids.length) errors.push("config:duplicate-opportunity-id");

  for (const opportunity of config.opportunities) {
    errors.push(...opportunityErrors(opportunity, asOf, config.selectionPolicy.maxOpenVerificationAgeDays));
  }

  const submitted = config.opportunities.filter(isActiveApplication);
  const open = config.opportunities.filter((entry) =>
    isOpenUnapplied(entry, asOf, config.selectionPolicy.maxOpenVerificationAgeDays)
  );
  const historical = config.opportunities
    .filter((entry) => entry.considered === true && ELIGIBLE_STATES.has(entry.eligibilityState))
    .sort((left, right) => right.fitScore - left.fitScore || left.opportunityId.localeCompare(right.opportunityId));

  let tier;
  let selected;
  if (submitted.length > 0) {
    tier = "submitted-active";
    selected = submitted;
  } else if (open.length > 0) {
    tier = "open-unapplied";
    selected = open;
  } else {
    tier = "historical-top-quartile";
    const count = historical.length === 0 ? 0 : Math.ceil(historical.length * config.selectionPolicy.historicalFallbackFraction);
    selected = historical.slice(0, count);
  }

  const selectedOpportunityIds = selected.map((entry) => entry.opportunityId);
  const selectedIds = new Set(selectedOpportunityIds);
  const readerPairIds = selected.flatMap((entry) => entry.readerPairIds ?? []);
  const duplicateReaderPairs = readerPairIds.filter((pairId, index) => readerPairIds.indexOf(pairId) !== index);
  if (duplicateReaderPairs.length > 0) errors.push("selection:duplicate-reader-pair-id");
  if (selected.length === 0) errors.push("selection:no-eligible-opportunity");

  const publicArtifact = config.currentPublicArtifact;
  const publicMarkdown = skipArtifactChecks ? Buffer.from("skipped") : artifact(root, publicArtifact.markdownPath, artifactOverrides);
  const publicPdf = skipArtifactChecks ? Buffer.from("skipped") : artifact(root, publicArtifact.pdfPath, artifactOverrides);
  const installedPdf = skipArtifactChecks ? Buffer.from("skipped") : artifact(root, publicArtifact.publicInstallPath, artifactOverrides);
  const sourceMarkdown = skipArtifactChecks
    ? Buffer.from("skipped")
    : artifact(root, publicArtifact.singleOpportunitySource?.markdownPath, artifactOverrides);
  const sourcePdf = skipArtifactChecks
    ? Buffer.from("skipped")
    : artifact(root, publicArtifact.singleOpportunitySource?.pdfPath, artifactOverrides);

  const selectedResumeArtifactsPresent = selected.every((entry) => {
    if (!entry.resumeMarkdownPath || !entry.resumePdfPath) return false;
    if (skipArtifactChecks) return true;
    return artifact(root, entry.resumeMarkdownPath, artifactOverrides) !== null && artifact(root, entry.resumePdfPath, artifactOverrides) !== null;
  });
  const selectedModelContextPresent = selected.every((entry) => {
    if (!Array.isArray(entry.modelContextPaths) || entry.modelContextPaths.length === 0) return false;
    const pairPaths = (entry.readerPairIds ?? []).flatMap(
      (pairId) => entry.readerContextPaths?.[pairId] ?? []
    );
    const paths = [...new Set([...entry.modelContextPaths, ...pairPaths])];
    return paths.every(
      (relativePath) =>
        relativePath.startsWith("docs/knowledge-bank/") &&
        (skipArtifactChecks || artifact(root, relativePath, artifactOverrides) !== null)
    );
  });

  const checks = [
    {
      id: "opportunity-state-schema-valid",
      pass: errors.length === 0,
      detail: errors.length === 0 ? "All lifecycle, date, eligibility, and state combinations are valid." : errors.join(", ")
    },
    {
      id: "selected-opportunities-have-readers",
      pass: selected.every((entry) => Array.isArray(entry.readerPairIds) && entry.readerPairIds.length > 0) && duplicateReaderPairs.length === 0,
      detail: `${readerPairIds.length} unique reader/opportunity pairs cover ${selected.length} selected opportunities.`
    },
    {
      id: "selected-opportunities-have-role-artifacts",
      pass: selectedResumeArtifactsPresent,
      detail: selectedResumeArtifactsPresent ? "Every selected opportunity has Markdown and PDF resume artifacts." : "At least one selected opportunity lacks a bound Markdown or PDF resume."
    },
    {
      id: "selected-opportunities-have-public-model-context",
      pass: selectedModelContextPresent,
      detail: selectedModelContextPresent
        ? "Every selected reader call is bound to repository-held public-safe context."
        : "At least one selected reader call lacks public-safe model context."
    },
    {
      id: "public-artifact-coverage-is-exact",
      pass: sameMembers(publicArtifact.coveredOpportunityIds, selectedOpportunityIds),
      detail: `${publicArtifact.coveredOpportunityIds.length}/${selectedOpportunityIds.length} selected opportunities are declared by the public artifact.`
    },
    {
      id: "public-artifacts-exist",
      pass: publicMarkdown !== null && publicPdf !== null && installedPdf !== null,
      detail: "The maintained public Markdown, sibling PDF, and installed site PDF all exist."
    },
    {
      id: "public-pdf-install-is-exact",
      pass: publicPdf !== null && installedPdf !== null && sha256(publicPdf) === sha256(installedPdf),
      detail: "The maintained public PDF and installed site PDF are byte-identical."
    },
    {
      id: "single-opportunity-public-source-is-exact",
      pass:
        selected.length !== 1 ||
        (sourceMarkdown !== null &&
          sourcePdf !== null &&
          sha256(publicMarkdown) === sha256(sourceMarkdown) &&
          sha256(publicPdf) === sha256(sourcePdf)),
      detail: selected.length === 1
        ? "The public Markdown and PDF are exact copies of the selected opportunity-specific pair."
        : "Multiple selected opportunities require a separately composed exact-coverage artifact."
    }
  ];

  if (enforceExpected) {
    checks.push({
      id: "current-selection-matches-reviewed-expectation",
      pass:
        config.expectedCurrentSelection?.tier === tier &&
        sameMembers(config.expectedCurrentSelection?.opportunityIds ?? [], selectedOpportunityIds) &&
        sameMembers(config.expectedCurrentSelection?.readerPairIds ?? [], readerPairIds),
      detail: `${tier}: ${selectedOpportunityIds.join(", ")}`
    });
  }

  const deterministicPass = checks.every((check) => check.pass);
  const plannedCalls = deterministicPass ? readerPairIds.map((readerPairId) => {
    const opportunity = selected.find((entry) => entry.readerPairIds.includes(readerPairId));
    const contextPaths = [
      ...new Set([
        ...(opportunity.modelContextPaths ?? []),
        ...(opportunity.readerContextPaths?.[readerPairId] ?? [])
      ])
    ];
    const contextBundle = Buffer.concat(
      contextPaths.flatMap((relativePath) => [
        Buffer.from(`${relativePath}\n`),
        artifact(root, relativePath, artifactOverrides) ?? Buffer.alloc(0),
        Buffer.from("\n")
      ])
    );
    return {
      opportunityId: opportunity.opportunityId,
      readerPairId,
      resumeMarkdownPath: publicArtifact.markdownPath,
      resumeSha256: sha256(publicMarkdown),
      contextPaths,
      contextSha256: sha256(contextBundle),
      postingSourceReviewedAt: opportunity.lastVerifiedAt,
      promptVersion: config.modelGate.promptVersion
    };
  }) : [];

  const maxCallsPass = plannedCalls.length <= config.modelGate.maximumCallsPerRun;
  const llmEligible = deterministicPass && maxCallsPass;
  checks.push({
    id: "model-call-budget-respected",
    pass: maxCallsPass,
    detail: `${plannedCalls.length}/${config.modelGate.maximumCallsPerRun} maximum calls planned.`
  });

  return {
    schemaVersion: 1,
    evalId: config.id,
    evaluatedAt: config.evaluatedAt,
    asOf,
    overall: deterministicPass && maxCallsPass ? "pass" : "fail",
    selection: {
      tier,
      opportunityIds: selectedOpportunityIds,
      readerPairIds
    },
    deterministicChecks: checks,
    selectedOpportunities: selected.map((entry) => ({
      opportunityId: entry.opportunityId,
      title: entry.title,
      applicationState: entry.applicationState,
      outcomeState: entry.outcomeState,
      postingState: entry.postingState,
      closesOn: entry.closesOn,
      eligibilityState: entry.eligibilityState,
      readerPairIds: entry.readerPairIds
    })),
    skippedOpportunities: config.opportunities
      .map((entry) => ({
        opportunityId: entry.opportunityId,
        reason: skippedReason(entry, tier, selectedIds, asOf),
        skippedReaderPairIds: selectedIds.has(entry.opportunityId) ? [] : entry.readerPairIds ?? []
      }))
      .filter((entry) => entry.reason !== null),
    publicArtifact: {
      markdownPath: publicArtifact.markdownPath,
      markdownSha256: sha256(publicMarkdown),
      pdfPath: publicArtifact.pdfPath,
      pdfSha256: sha256(publicPdf),
      publicInstallPath: publicArtifact.publicInstallPath,
      publicInstallSha256: sha256(installedPdf)
    },
    llmPlan: {
      status: llmEligible ? "eligible" : "blocked",
      plannedCallCount: plannedCalls.length,
      skippedCallCount: config.opportunities.reduce((sum, entry) => sum + (selectedIds.has(entry.opportunityId) ? 0 : (entry.readerPairIds ?? []).length), 0),
      calls: plannedCalls,
      acceptanceQuestion: config.modelGate.acceptanceQuestion,
      actualPeopleParticipated: false,
      boundary: "This plan permits fictionalized public-source model evaluation only. It does not record actual participation, endorsement, an interview promise, or a hiring decision."
    }
  };
}

export function currentRunSnapshot(result) {
  return result;
}

function main() {
  const result = selectPublicResume();
  console.log(JSON.stringify(result, null, 2));
  if (!process.argv.includes("--no-current-run-check")) {
    const expected = readJson(defaultConfig.currentRunPath);
    assert.deepEqual(currentRunSnapshot(result), expected, "Committed public-resume selection run is stale");
  }
  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
