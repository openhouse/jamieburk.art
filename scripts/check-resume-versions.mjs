import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, "..");

const expectedCriteria = [
  "versioned-path",
  "ats-structure",
  "role-language",
  "evidence-anchors",
  "collective-credit",
  "truth-boundaries",
  "public-safety"
];

export function evaluateResumeVersions(root = defaultRoot) {
  const failures = [];
  const fail = (criterion, message) => failures.push({ criterion, message });
  const evalPath = path.join(root, "evals/resume-versions/evals.json");

  if (!existsSync(evalPath)) {
    return {
      passed: false,
      failures: [{ criterion: "versioned-path", message: "Missing resume evaluation contract." }],
      criteriaCount: expectedCriteria.length
    };
  }

  const evaluation = JSON.parse(readFileSync(evalPath, "utf8"));
  const observedCriteria = evaluation.criteria?.map(({ id }) => id) ?? [];
  if (JSON.stringify(observedCriteria) !== JSON.stringify(expectedCriteria) ||
      evaluation.criteria.some(({ blocking }) => blocking !== true)) {
    fail("versioned-path", "The blocking resume criteria changed, lost order, or became optional.");
  }

  const targetResume = evaluation.targetResume;
  if (evaluation.targetJobId !== "782366" ||
      !/^resume-versions\/\d{4}-\d{2}-\d{2}\/nyc-oti-senior-product-manager-782366\/Jamie-Burkart-Resume\.md$/.test(targetResume ?? "")) {
    fail("versioned-path", "The target resume is not bound to the dated Job ID 782366 directory contract.");
  }

  const resumePath = path.join(root, targetResume ?? "");
  if (!targetResume || !existsSync(resumePath)) {
    fail("versioned-path", "The application-tailored resume file is missing.");
    return { passed: false, failures, criteriaCount: expectedCriteria.length };
  }

  const resume = readFileSync(resumePath, "utf8");
  const lower = resume.toLowerCase();

  const requiredSections = [
    "# Jamie Burkart",
    "## Professional Summary",
    "## Core Capabilities",
    "## Selected Product & Civic Impact",
    "## Professional Experience",
    "## Education & Professional Development",
    "## Additional"
  ];
  const wordCount = resume.trim().split(/\s+/).length;
  if (!requiredSections.every((heading) => resume.includes(heading)) ||
      /^\s*\|.+\|\s*$/m.test(resume) ||
      /!\[[^\]]*\]\(/.test(resume) ||
      /\b(?:I|me|my)\b/.test(resume) ||
      wordCount > 1050) {
    fail("ats-structure", `The resume lost a standard ATS section, introduced a table, image, or first-person pronoun, or exceeded 1,050 words (observed ${wordCount}).`);
  }

  const roleTerms = [
    "resident-facing",
    "end-to-end",
    "problem framing",
    "discovery",
    "prioritization",
    "scoping",
    "version one",
    "mvp",
    "pilot",
    "public launch",
    "cross-functional",
    "user research",
    "product briefs",
    "decision memos",
    "metrics",
    "instrumentation",
    "post-launch",
    "accessibility",
    "privacy"
  ];
  const missingRoleTerms = roleTerms.filter((term) => !lower.includes(term));
  if (missingRoleTerms.length) {
    fail("role-language", `Missing truthful target-role language: ${missingRoleTerms.join(", ")}.`);
  }

  const evidenceAnchors = [
    "CallNYC",
    "WOWList",
    "Richard Caceres",
    "35 city ecosystems",
    "Harry J. Epstein Company",
    "2x revenue growth",
    "30+ pages",
    "300+ gatherings",
    "20+ resident artists",
    "$490,539"
  ];
  const missingEvidence = evidenceAnchors.filter((anchor) => !resume.includes(anchor));
  if (missingEvidence.length) {
    fail("evidence-anchors", `Missing governed evidence anchors: ${missingEvidence.join(", ")}.`);
  }

  if (!/\bco-built\b/i.test(resume) || !resume.includes("Richard Caceres") ||
      /\b(?:solely|single-handedly|without help)\b/i.test(resume)) {
    fail("collective-credit", "Product and coalition work must preserve collaborator credit and reject sole-authorship language.");
  }

  const unsupportedClaims = [
    /(?:certified|certification|fully compliant).{0,30}(?:WCAG|Section 508)/i,
    /(?:WCAG|Section 508).{0,30}(?:certified|certification|fully compliant)/i,
    /formal user research program/i,
    /government product owner/i,
    /caused (?:the )?law/i
  ];
  if (unsupportedClaims.some((pattern) => pattern.test(resume)) ||
      !resume.includes("Familiarity with WCAG 2.1 AA and Section 508")) {
    fail("truth-boundaries", "The resume overclaims an unverified qualification or loses the bounded accessibility wording.");
  }

  if (/\/(?:Users|Volumes)\/|[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}|private correspondence|raw transcript|people tags|gpslatitude/i.test(resume)) {
    fail("public-safety", "The resume contains a protected locator or private-source fragment.");
  }

  return {
    passed: failures.length === 0,
    failures,
    criteriaCount: expectedCriteria.length,
    targetResume
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : defaultRoot;
  const result = evaluateResumeVersions(root);
  if (!result.passed) {
    for (const failure of result.failures) {
      console.error(`FAIL ${failure.criterion}: ${failure.message}`);
    }
    process.exit(1);
  }
  console.log(`Resume version eval passed: ${result.criteriaCount} blocking criteria; ${result.targetResume}.`);
}
