import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const assignments = [
  {
    file: "aclu-lps-terence.json",
    opportunityId: "opportunity.aclu.senior-project-manager-lps.8620968002",
    personId: "person.terence-dougherty",
    name: "Terence Dougherty",
    relationship: "senior-vision"
  },
  {
    file: "aclu-campaigns-james.json",
    opportunityId: "opportunity.aclu.senior-project-manager-national-campaigns.8631854002",
    personId: "person.james-williams-aclu",
    name: "James Williams",
    relationship: "likely-direct-report"
  },
  {
    file: "aclu-campaigns-deirdre.json",
    opportunityId: "opportunity.aclu.senior-project-manager-national-campaigns.8631854002",
    personId: "person.deirdre-schifeling",
    name: "Deirdre Schifeling",
    relationship: "senior-vision"
  },
  {
    file: "asana-jenn.json",
    opportunityId: "opportunity.asana.ai-implementation.8027437",
    personId: "person.jenn-wei",
    name: "Jenn Wei",
    relationship: "senior-vision"
  },
  {
    file: "oti-product-lisa.json",
    opportunityId: "opportunity.nyc-oti.product-manager.784450",
    personId: "person.lisa-gelobter",
    name: "Lisa Gelobter",
    relationship: "senior-vision"
  },
  {
    file: "oti-pit-luke.json",
    opportunityId: "opportunity.nyc-oti.senior-product-manager.782366",
    personId: "person.luke-farrell",
    name: "Luke Farrell",
    relationship: "likely-direct-report"
  },
  {
    file: "oti-pit-lisa.json",
    opportunityId: "opportunity.nyc-oti.senior-product-manager.782366",
    personId: "person.lisa-gelobter",
    name: "Lisa Gelobter",
    relationship: "senior-vision"
  },
  {
    file: "oti-operations-lisa.json",
    opportunityId: "opportunity.nyc-oti.operations-manager.789810",
    personId: "person.lisa-gelobter",
    name: "Lisa Gelobter",
    relationship: "senior-vision"
  },
  {
    file: "oti-cyber-kelly.json",
    opportunityId: "opportunity.nyc-oti.cybersecurity-senior-project-manager.791074",
    personId: "person.kelly-moan",
    name: "Kelly Moan",
    relationship: "senior-vision"
  }
];

function option(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
}

const inputDirectory = option("input-dir");
const runId = option("run-id");
const resumeSha256 = option("resume-sha256");
const prefix = option("prefix");
const evaluatedAt = option("evaluated-at", new Date().toISOString().slice(0, 10));
const updateCurrent = process.argv.includes("--update-current");

if (!inputDirectory || !runId || !/^[a-f0-9]{64}$/.test(resumeSha256)) {
  throw new Error("Required: --input-dir, --run-id, and a 64-character --resume-sha256");
}

const root = path.resolve(import.meta.dirname, "..");
const outputDirectory = path.join(root, "evals/public-resume/runs", evaluatedAt, runId);
mkdirSync(outputDirectory, { recursive: true });

const assessments = [];
for (const assignment of assignments) {
  const inputPath = path.join(inputDirectory, `${prefix}${assignment.file}`);
  let raw;
  try {
    raw = JSON.parse(readFileSync(inputPath, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") continue;
    throw error;
  }
  if (!Array.isArray(raw.strengths) || !Array.isArray(raw.risks) ||
      !Array.isArray(raw.interviewEvidenceNeeded) ||
      !["pass", "fail"].includes(raw.decision) ||
      raw.wouldHire !== (raw.decision === "pass")) {
    throw new Error(`Malformed reader result: ${inputPath}`);
  }
  const assessment = {
    ...assignment,
    resumeSha256,
    acceptanceQuestion: "I would hire this person for this job.",
    decision: raw.decision,
    wouldHire: raw.wouldHire,
    simulatedPublicFigureLens: true,
    nonEndorsementBoundary: "This fictionalized public-context lens is not participation, quotation, endorsement, or a hiring decision by the named person.",
    access: {
      scope: "public-resume-and-public-job-context-only",
      repositoryAccess: false,
      privateSourceAccess: false
    },
    strengths: raw.strengths,
    risks: raw.risks,
    interviewEvidenceNeeded: raw.interviewEvidenceNeeded,
    rationale: raw.rationale,
    model: "gpt-5.6-sol",
    evaluatedAt
  };
  const outputFile = assignment.file;
  writeFileSync(path.join(outputDirectory, outputFile), `${JSON.stringify(assessment, null, 2)}\n`);
  assessments.push({ ...assessment, runArtifact: `evals/public-resume/runs/${evaluatedAt}/${runId}/${outputFile}` });
}

const failed = assessments.filter(({ decision }) => decision === "fail");
const complete = assessments.length === assignments.length;
const index = {
  schemaVersion: 1,
  runId,
  evaluatedAt,
  resumeSha256,
  model: "gpt-5.6-sol",
  acceptanceQuestion: "I would hire this person for this job.",
  accessScope: "public-resume-and-public-job-context-only",
  passPolicy: "unanimous-named-readers-for-every-selected-opportunity",
  expectedReaderCount: assignments.length,
  attemptedReaderCount: assessments.length,
  passingReaderCount: assessments.length - failed.length,
  failingReaderCount: failed.length,
  complete,
  decision: complete && failed.length === 0 ? "pass" : "fail",
  stopReason: complete ? null : failed.length
    ? "short-circuited-after-first-failure-because-unanimous-pass-was-no-longer-possible"
    : "incomplete-reader-run",
  nonEndorsementBoundary: "These fictionalized public-context lenses are not participation, quotation, endorsement, or hiring decisions by the named people.",
  artifacts: assessments.map(({ runArtifact, name, opportunityId, decision }) => ({
    path: runArtifact,
    name,
    opportunityId,
    decision
  }))
};
writeFileSync(path.join(outputDirectory, "index.json"), `${JSON.stringify(index, null, 2)}\n`);

if (updateCurrent) {
  const manifestPath = path.join(root, "evals/public-resume/current.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  manifest.readerEvaluationRun = {
    path: `evals/public-resume/runs/${evaluatedAt}/${runId}/index.json`,
    resumeSha256,
    decision: index.decision,
    complete: index.complete,
    stopReason: index.stopReason
  };
  manifest.readerAssessments = assessments;
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

console.log(JSON.stringify(index));
