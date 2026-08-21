#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function read(root, relativePath) {
  const absolute = path.join(root, relativePath);
  return existsSync(absolute) ? readFileSync(absolute, "utf8") : null;
}

function readJson(root, relativePath) {
  const source = read(root, relativePath);
  return source === null ? null : JSON.parse(source);
}

function check(id, pass, detail) {
  return { id, pass: Boolean(pass), detail };
}

export function evaluateOpportunitySystem({ root = repoRoot } = {}) {
  const config = readJson(root, "config/opportunities/nyc-jobs.json");
  const rubric = readJson(root, "evals/opportunities/nyc-jobs.json");
  const report = readJson(root, "reports/opportunities/nyc-jobs-qualified.json");
  const digest = read(root, "reports/opportunities/nyc-jobs-digest.md");
  const source = read(root, "docs/knowledge-bank/sources/nyc-jobs-open-data.md");
  const evaluation = read(root, "docs/knowledge-bank/evaluations/nyc-jobs-opportunity-feed.md");
  const rfc = read(root, "rfcs/0007-nyc-jobs-opportunity-action-loop.md");
  const environmentExample = read(root, ".env.example");
  if (![config, rubric, report, digest, source, evaluation, rfc, environmentExample].every(Boolean)) {
    return {
      overall: "fail",
      admittedCount: report?.admittedCount ?? 0,
      actionableCount: report?.actionableCount ?? 0,
      checks: [check("required-artifacts", false, "One or more opportunity-loop artifacts are missing.")]
    };
  }

  const thresholds = report.admitted.every(
    (item) =>
      item.fitScore >= report.threshold.fit &&
      item.securabilityScore >= report.threshold.securability &&
      item.combinedScore >= report.threshold.combined
  );
  const generated = report.admitted.map((item) => ({
    jobId: item.jobId,
    source: read(root, `docs/knowledge-bank/opportunities/nyc-jobs-${item.jobId}.md`)
  }));
  const generatedClosure =
    generated.length === report.admittedCount &&
    generated.every(
      (item) =>
        item.source !== null &&
        item.source.includes(`id: opportunity.nyc-jobs.${item.jobId}`) &&
        item.source.includes("human_review: requested") &&
        item.source.includes("application_materials_gate: required-before-application-material-generation") &&
        item.source.includes("disposition: verify")
    );
  const evaluationLinkClosure = report.admitted.every((item) =>
    evaluation.includes(`../opportunities/nyc-jobs-${item.jobId}.md`)
  );
  const publicConfig = JSON.stringify(config);
  const rawBoundary =
    !JSON.stringify(report).match(/"(?:description|minimumQualifications|preferredSkills|rawRow|rawRows)"\s*:/) &&
    generated.every((item) => !item.source?.match(/job_description|minimum_qual_requirements|preferred_skills/i));
  const actionLines = digest.match(/\*\*Next action:\*\*/g)?.length ?? 0;
  const checks = [
    check(
      "rubric-config-agreement",
      JSON.stringify(rubric.thresholds) === JSON.stringify(config.strongMatchThreshold) &&
        rubric.gate_order[0].includes("rowsUpdatedAt") &&
        rubric.gate_order.at(-1) === "Jamie application decision",
      "The authored rubric and executable configuration agree on thresholds and gate order."
    ),
    check(
      "official-source-binding",
      config.datasetId === "pda4-rgn4" &&
        source.includes("id: source.jobs.nyc-open-data.current") &&
        source.includes(config.landingPage),
      "Configuration and source record bind the official pda4-rgn4 dataset."
    ),
    check(
      "row-data-freshness",
      config.lastSeenRowsUpdatedAt === report.datasetRowsUpdatedAt &&
        source.includes(`rows_updated_at: ${report.datasetRowsUpdatedAt}`),
      "Configuration, report, and source record agree on rowsUpdatedAt."
    ),
    check(
      "strong-admission-threshold",
      report.admittedCount > 0 && thresholds,
      "Every admitted opportunity clears fit, securability, and combined thresholds."
    ),
    check(
      "generated-opportunity-closure",
      generatedClosure && evaluationLinkClosure,
      "Every admission has a review-gated governed opportunity record reachable from the evaluation."
    ),
    check(
      "action-digest-closure",
      report.actionableCount >= report.admittedCount && actionLines === report.actionableCount,
      "The digest gives every active actionable opportunity exactly one next action."
    ),
    check(
      "raw-description-boundary",
      rawBoundary,
      "Generated reports and opportunity records omit raw job descriptions and qualification text."
    ),
    check(
      "email-secret-boundary",
      !publicConfig.includes("@") &&
        config.delivery.recipientEnv === "OPPORTUNITY_DIGEST_TO" &&
        config.delivery.senderEnv === "OPPORTUNITY_DIGEST_FROM" &&
        config.delivery.apiKeyEnv === "RESEND_API_KEY",
      "Recipient, sender, and provider credential values enter only through environment secrets."
    ),
    check(
      "delivery-activation-gate",
      config.delivery.defaultMode === "dry-run" &&
        environmentExample.includes("OPPORTUNITY_DIGEST_DELIVERY=dry-run") &&
        rfc.includes("requires separate operator activation") &&
        rfc.includes("Staging deployment does not enable email"),
      "Recurring delivery remains dry-run until its external authority surface receives separate operator activation."
    ),
    check(
      "complementary-source-boundary",
      source.includes("complementary discovery source") &&
        source.includes("does not replace direct checks") &&
        evaluation.includes("Jamie alone decides whether and when to apply"),
      "The source does not displace direct posting review or Jamie's application decision."
    )
  ];
  return {
    schemaVersion: 1,
    overall: checks.every((item) => item.pass) ? "pass" : "fail",
    datasetId: config.datasetId,
    datasetRowsUpdatedAt: report.datasetRowsUpdatedAt,
    admittedCount: report.admittedCount,
    actionableCount: report.actionableCount,
    checks,
    boundary: "Deterministic admission and synthetic review can prioritize action; neither establishes actual eligibility, interview, offer, or hire."
  };
}

function main() {
  const result = evaluateOpportunitySystem();
  console.log(JSON.stringify(result, null, 2));
  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
