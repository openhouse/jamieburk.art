import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
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
  "submission-pdf",
  "public-safety"
];

function digest(content) {
  return createHash("sha256").update(content).digest("hex");
}

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
    "## Core Skills",
    "## Professional Experience",
    "## Education & Professional Development",
    "## Additional Leadership",
    "## Additional Information"
  ];
  const sectionOrder = [
    resume.indexOf("## Professional Summary"),
    resume.indexOf("## Core Skills"),
    resume.indexOf("## Professional Experience"),
    resume.indexOf("## Additional Leadership"),
    resume.indexOf("## Education & Professional Development"),
    resume.indexOf("## Additional Information")
  ];
  const wordCount = resume.trim().split(/\s+/).length;
  if (!requiredSections.every((heading) => resume.includes(heading)) ||
      !sectionOrder.every((index, position) => index >= 0 && (position === 0 || index > sectionOrder[position - 1])) ||
      /^\s*\|.+\|\s*$/m.test(resume) ||
      /!\[[^\]]*\]\(/.test(resume) ||
      /\b(?:I|me|my)\b/.test(resume) ||
      wordCount < 450 || wordCount > 850) {
    fail("ats-structure", `The resume lost a standard ATS section, introduced a table, image, or first-person pronoun, or fell outside 450-850 words (observed ${wordCount}).`);
  }

  const roleTerms = [
    "resident-facing",
    "end-to-end",
    "problem framing",
    "discovery",
    "prioritization",
    "scoping",
    "version-one",
    "mvp",
    "public launch",
    "cross-functional",
    "user research",
    "product briefs",
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
    "35 city-region keys",
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
      !resume.includes("Accessibility-aware implementation") ||
      !resume.includes("privacy-conscious data practice")) {
    fail("truth-boundaries", "The resume overclaims an unverified qualification or loses the bounded accessibility wording.");
  }

  const targetPdf = evaluation.targetPdf;
  const targetArtifactManifest = evaluation.targetArtifactManifest;
  const expectedDirectory = "resume-versions/2026-08-14/nyc-oti-senior-product-manager-782366";
  if (targetPdf !== `${expectedDirectory}/Jamie-Burkart-Resume-NYC-OTI-Senior-Product-Manager-782366.pdf` ||
      targetArtifactManifest !== `${expectedDirectory}/artifact.json`) {
    fail("submission-pdf", "The submission PDF and artifact manifest are not bound to the exact dated Job ID 782366 directory.");
  } else {
    const pdfPath = path.join(root, targetPdf);
    const artifactPath = path.join(root, targetArtifactManifest);
    if (!existsSync(pdfPath) || !existsSync(artifactPath)) {
      fail("submission-pdf", "The application PDF or its artifact manifest is missing.");
    } else {
      const pdf = readFileSync(pdfPath);
      const pdfText = pdf.toString("latin1");
      const artifact = JSON.parse(readFileSync(artifactPath, "utf8"));
      const pageObjects = pdfText.match(/\/Type\s*\/Page\b/g)?.length ?? 0;
      const requiredFonts = ["PalatinoLinotype", "Oswald", "Karla"];
      const checks = artifact?.visualInspection?.checks ?? [];
      if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-")) ||
          pageObjects !== 2 ||
          !pdfText.includes("/Count 2") ||
          (pdfText.match(/\/MediaBox\s*\[\s*0\s+0\s+612\s+792\s*\]/g)?.length ?? 0) !== 2 ||
          !pdfText.includes("/Marked true") ||
          !pdfText.includes("/StructTreeRoot") ||
          !pdfText.includes("/DisplayDocTitle true") ||
          !requiredFonts.every((font) => pdfText.includes(font)) ||
          artifact.schemaVersion !== 2 ||
          artifact.opportunityId !== "opportunity.nyc-oti.senior-product-manager.782366" ||
          artifact.sourceMarkdown !== "Jamie-Burkart-Resume.md" ||
          artifact.sourceMarkdownSha256 !== digest(resume) ||
          artifact?.pdf?.file !== path.basename(targetPdf) ||
          artifact?.pdf?.mediaType !== "application/pdf" ||
          artifact?.pdf?.sha256 !== digest(pdf) ||
          artifact?.pdf?.bytes !== statSync(pdfPath).size ||
          artifact?.pdf?.pages !== 2 ||
          artifact?.pdf?.pageSize !== "US Letter" ||
          artifact?.pdf?.tagged !== true ||
          artifact?.layout?.source !== "native-google-doc-copy" ||
          artifact?.layout?.styleReference !== "please-read-only resume style source example" ||
          JSON.stringify(artifact?.layout?.typography) !== JSON.stringify(["Palatino Linotype", "Oswald", "Karla"]) ||
          artifact?.layout?.sourceStylesPreserved !== true ||
          artifact?.googleWorkspace?.sourceWasTreatedReadOnly !== true ||
          artifact?.googleWorkspace?.sourceUnchangedAfterCopy !== true ||
          artifact?.googleWorkspace?.nativeCopyCreated !== true ||
          artifact?.googleWorkspace?.connectorReadbackVerified !== true ||
          artifact?.googleWorkspace?.sourceLocatorCommitted !== false ||
          artifact?.googleWorkspace?.copyLocatorCommitted !== false ||
          artifact?.visualInspection?.status !== "pass" ||
          JSON.stringify(artifact?.visualInspection?.pagesInspected) !== "[1,2]" ||
          !Array.isArray(checks) || checks.length < 4 ||
          /docs\.google\.com\/document\/d\//i.test(JSON.stringify(artifact))) {
        fail("submission-pdf", "The submission PDF is stale, malformed, not two-page/tagged, missing the approved typography, not visually inspected, or exposes a protected Google Doc locator.");
      }
    }
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
