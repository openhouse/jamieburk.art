import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const rubricPath = path.join(
  repoRoot,
  ".agents/evals/oti-senior-product-application-readiness.json"
);
const resumeRubricPath = path.join(
  repoRoot,
  "evals/resumes/nyc-oti-senior-product-manager-782366.json"
);

function loadText(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

function relationTargets(data) {
  return new Set((data.relations ?? []).map((relation) => relation.target));
}

export function evaluateOtiApplicationMilestone({
  milestoneText,
  opportunityText,
  employmentIndexText,
  resumeRubric,
  rubric
}) {
  const parsed = milestoneText ? matter(milestoneText) : { data: {}, content: "" };
  const { data, content } = parsed;
  const targets = relationTargets(data);
  const hardGateIds = new Set((rubric.hardGates ?? []).map((gate) => gate.id));
  const privateArtifactPattern =
    /(?:codex-remote-attachments|application submitted[^\n]*(?:\.png|\.jpe?g|\.pdf)|smartrecruiters[^\n]*(?:candidate|applicant)[-_ ]?id|confirmation screenshot path)/i;

  const checks = [
    {
      id: "application-state-submitted",
      pass:
        data.kind === "application" &&
        data.application_state === "submitted" &&
        data.submitted_on === "2026-08-14" &&
        data.authorization_state === "human-completed",
      detail: "The application node records a date-level, human-authorized submission state."
    },
    {
      id: "pending-outcome-boundary",
      pass:
        data.outcome_state === "pending" &&
        /does not establish/i.test(content) &&
        /civil-service eligibility/i.test(content) &&
        /interview/i.test(content) &&
        /offer/i.test(content),
      detail: "Submission is separated from employer-controlled eligibility and outcomes."
    },
    {
      id: "private-confirmation-boundary",
      pass:
        data.confirmation_evidence_state === "reviewed-not-committed" &&
        !privateArtifactPattern.test(milestoneText),
      detail: "The confirmation is acknowledged without committing its capture or identifiers."
    },
    {
      id: "artifact-lineage",
      pass:
        targets.has("opportunity.nyc-oti.senior-product-manager.782366") &&
        targets.has("source.jobs.oti.senior-product-manager.782366") &&
        targets.has("application.wowlist.senior-product-manager-oti-782366") &&
        typeof data.resume_path === "string" &&
        data.resume_path === resumeRubric.resumePath,
      detail: "The milestone joins the role, official source, role-fit brief, and exact tailored resume."
    },
    {
      id: "post-submission-learning-loop",
      pass:
        /## Reusable workflow learning/i.test(content) &&
        /## Next-stage operating loop/i.test(content) &&
        /confirmation email/i.test(content) &&
        /civil-service/i.test(content) &&
        /interview/i.test(content) &&
        /follow-up/i.test(content) &&
        /outcome/i.test(content),
      detail: "The record converts the milestone into reusable workflow and next-stage actions."
    },
    {
      id: "opportunity-backlink",
      pass:
        /application\.nyc-oti\.senior-product-manager\.782366/.test(opportunityText) &&
        /applications\/nyc-oti-senior-product-manager-782366\.md/.test(opportunityText),
      detail: "The opportunity points to the submitted application milestone."
    },
    {
      id: "employment-index-boundary",
      pass:
        /Jamie-authorized public-safe milestone/i.test(employmentIndexText) &&
        /confirmation artifacts[\s\S]{0,160}remain private/i.test(employmentIndexText),
      detail: "The employment index records the narrow authorization exception and retained privacy boundary."
    },
    {
      id: "rubric-hard-gates",
      pass: [
        "submission-milestone-boundary",
        "pending-outcome-boundary",
        "post-submission-learning-loop"
      ].every((id) => hardGateIds.has(id)),
      detail: "The recursive rubric retains all three milestone hard gates."
    },
    {
      id: "resume-eval-lifecycle-link",
      pass:
        resumeRubric.applicationLifecycle?.milestonePath === rubric.applicationMilestonePath &&
        resumeRubric.applicationLifecycle?.state === "submitted" &&
        resumeRubric.applicationLifecycle?.outcomeState === "pending",
      detail: "The tailored-resume eval remains connected to the application lifecycle."
    }
  ];

  return {
    schemaVersion: 1,
    rubricId: rubric.id,
    milestonePath: rubric.applicationMilestonePath,
    passedChecks: checks.filter((check) => check.pass).length,
    totalChecks: checks.length,
    overall: checks.every((check) => check.pass) ? "pass" : "fail",
    checks
  };
}

export function evaluateRepository(root = repoRoot) {
  const rubric = JSON.parse(readFileSync(path.join(root, path.relative(repoRoot, rubricPath)), "utf8"));
  const resumeRubric = JSON.parse(
    readFileSync(path.join(root, path.relative(repoRoot, resumeRubricPath)), "utf8")
  );
  return evaluateOtiApplicationMilestone({
    milestoneText: loadText(rubric.applicationMilestonePath),
    opportunityText: loadText("docs/knowledge-bank/opportunities/oti-senior-product-manager-782366.md"),
    employmentIndexText: loadText("docs/knowledge-bank/indexes/employment-context.md"),
    resumeRubric,
    rubric
  });
}

function main() {
  const result = evaluateRepository();
  console.log(JSON.stringify(result, null, 2));
  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
