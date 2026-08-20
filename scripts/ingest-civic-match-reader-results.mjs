import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { deriveExpectedCivicMatchAudience, evaluateCivicMatchProfile } from "./evals-civic-match-profile.mjs";

function option(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? "" : process.argv[index + 1];
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const root = path.resolve(import.meta.dirname, "..");
const inputRoot = option("input-dir");
const evaluatedAt = option("evaluated-at") || new Date().toISOString().slice(0, 10);
const allowPartial = process.argv.includes("--allow-partial");
if (!inputRoot) throw new Error("Required: --input-dir <temporary-directory>");

const deterministic = evaluateCivicMatchProfile(root, { deterministicOnly: true });
if (!deterministic.pass) throw new Error(`Deterministic gate failed:\n${deterministic.failures.join("\n")}`);
const configPath = path.join(root, "evals/opportunity-intake/civic-match.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));
const audience = deriveExpectedCivicMatchAudience(root, config);
const assessments = [];

for (const assignment of audience.all) {
  const resultPath = path.join(inputRoot, slug(assignment.key), "result.json");
  if (!existsSync(resultPath)) {
    if (allowPartial) continue;
    throw new Error(`Missing reader result: ${resultPath}`);
  }
  const raw = JSON.parse(readFileSync(resultPath, "utf8"));
  if (raw.guideSha256 !== config.guideSha256 ||
      raw.decision !== (raw.acceptance ? "pass" : "fail") ||
      !Array.isArray(raw.strengths) || raw.strengths.length < 2 ||
      !Array.isArray(raw.risks) || raw.risks.length < 1 ||
      !Array.isArray(raw.followUpEvidence) || raw.followUpEvidence.length < 1) {
    throw new Error(`Malformed or internally inconsistent reader result: ${resultPath}`);
  }
  assessments.push({
    key: assignment.key,
    role: assignment.role,
    opportunityId: assignment.opportunityId,
    personId: assignment.personId,
    name: assignment.name,
    relationship: assignment.relationship,
    guideSha256: config.guideSha256,
    acceptanceQuestion: assignment.acceptanceQuestion,
    decision: raw.decision,
    ...(assignment.role === "hiring-reader" ? { wouldHire: raw.acceptance } : { wouldActivelyMatch: raw.acceptance }),
    simulatedPublicFigureLens: true,
    nonEndorsementBoundary: "This fictionalized public-context lens is not participation, quotation, endorsement, recommendation, or a hiring decision by the named person.",
    access: {
      scope: "guide-current-public-resume-and-public-opportunity-context-only",
      repositoryAccess: false,
      privateSourceAccess: false
    },
    strengths: raw.strengths,
    risks: raw.risks,
    followUpEvidence: raw.followUpEvidence,
    rationale: raw.rationale,
    model: "gpt-5.6-sol",
    evaluatedAt
  });
}

config.readerAssessments = assessments;
config.readerEvaluationState = {
  evaluatedAt,
  status: assessments.length === audience.all.length ? "complete" : "stopped-on-first-failure",
  expectedAssessments: audience.all.length,
  completedAssessments: assessments.length,
  firstFailureKey: assessments.find(({ decision }) => decision === "fail")?.key ?? null,
  guideSha256: config.guideSha256
};
writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
console.log(JSON.stringify({ assessments: assessments.length, passing: assessments.filter(({ decision }) => decision === "pass").length }));
