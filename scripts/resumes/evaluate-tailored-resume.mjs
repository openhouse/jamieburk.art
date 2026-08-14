import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const rubricPath = path.join(
  repoRoot,
  "evals/resumes/nyc-oti-senior-product-manager-782366.json"
);
const rubric = JSON.parse(readFileSync(rubricPath, "utf8"));
const politicoArticleUrl =
  "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf";

export function evaluateResume(resumeText, sourcePath = rubric.resumePath) {
  const normalized = resumeText.replace(/\r\n/g, "\n");
  const plainText = normalized
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_>`~|]/g, " ");
  const words = plainText.match(/[A-Za-z0-9$][A-Za-z0-9+./'’$–—-]*/g) ?? [];
  const firstThird = plainText.slice(0, Math.ceil(plainText.length / 3));
  const numericSignals = new Set(
    (plainText.match(/(?:\$?\d[\d,]*(?:\.\d+)?(?:\+|x|%|\s*sq\.\s*ft\.)?)/gi) ?? [])
      .map((value) => value.toLowerCase())
  );

  const keywordGroups = {
    framing: /problem framing|problem definition/i,
    discovery: /discovery|user research|public research/i,
    scoping: /MVP|version-one|scoping|scope/i,
    prioritization: /prioritization|priorities|tradeoffs/i,
    launch: /public launch|public release|launch plans?/i,
    measurement: /metrics|measurement|instrumentation|analytics/i,
    learning: /post-launch learning|retrospectives?|durable handoffs?/i
  };

  const checks = [
    {
      id: "exact-target-title",
      pass: /Senior Product Manager/i.test(firstThird),
      detail: "Exact target title appears near the top."
    },
    {
      id: "standard-sections",
      pass: [
        /## Professional Summary/i,
        /## Core Skills/i,
        /## Professional Experience/i,
        /## Education/i
      ].every((pattern) => pattern.test(normalized)),
      detail: "Uses standard ATS-readable section headings."
    },
    {
      id: "ats-safe-markdown",
      pass:
        !/!\[[^\]]*\]\([^)]+\)/.test(normalized) &&
        !/^\s*\|.+\|\s*$/m.test(normalized) &&
        !/<(?:table|div|img|header|footer)\b/i.test(normalized) &&
        !/```/.test(normalized),
      detail: "Avoids images, tables, HTML layout, and code blocks."
    },
    {
      id: "complete-contact-block",
      pass: [
        /jamie\.burkart@gmail\.com/i,
        /\(816\)\s*728-8685/,
        /jamieburk\.art/i,
        /linkedin\.com\/in\/jamie-burkart/i,
        /github\.com\/openhouse/i
      ].every((pattern) => pattern.test(normalized)),
      detail: "Includes email, phone, portfolio, LinkedIn, and GitHub."
    },
    {
      id: "word-count",
      pass: words.length >= rubric.wordCount.minimum && words.length <= rubric.wordCount.maximum,
      detail: `${words.length} words; required ${rubric.wordCount.minimum}-${rubric.wordCount.maximum}.`
    },
    {
      id: "role-language-in-first-third",
      pass: [
        /resident-facing|public-facing/i,
        /product/i,
        /discovery/i,
        /public launch|launch/i,
        /stakeholder/i
      ].every((pattern) => pattern.test(firstThird)),
      detail: "The first third establishes product, public-service, discovery, launch, and stakeholder fit."
    },
    {
      id: "end-to-end-product-language",
      pass: Object.values(keywordGroups).every((pattern) => pattern.test(plainText)),
      detail: `Lifecycle groups present: ${Object.entries(keywordGroups)
        .filter(([, pattern]) => pattern.test(plainText))
        .map(([id]) => id)
        .join(", ")}.`
    },
    {
      id: "cross-functional-public-delivery",
      pass: [
        /cross-functional/i,
        /designers?|design/i,
        /engineers?|engineering/i,
        /agency/i,
        /policy/i,
        /senior (?:stakeholder|decision-maker)/i
      ].every((pattern) => pattern.test(plainText)),
      detail: "Shows cross-functional delivery and public-sector stakeholder translation."
    },
    {
      id: "resident-service-delivery",
      pass:
        /Tired of Tires/i.test(plainText) &&
        /household eligibility/i.test(plainText) &&
        /field collection/i.test(plainText) &&
        /City recycling coordination/i.test(plainText) &&
        /public records document Jamie's participation/i.test(plainText),
      detail: "Includes a bounded, evidence-backed resident service spanning access, fulfillment, municipal handoff, and Jamie's documented participation."
    },
    {
      id: "responsible-technology-language",
      pass: [
        /accessibility/i,
        /privacy/i,
        /public-safety|responsible/i,
        /evidence boundaries|source governance/i
      ].every((pattern) => pattern.test(plainText)),
      detail: "Names accessibility, privacy, public safety, and evidence boundaries without claiming certification."
    },
    {
      id: "quantified-evidence",
      pass: numericSignals.size >= 8,
      detail: `${numericSignals.size} distinct numeric signals; required at least 8.`
    },
    {
      id: "civil-service-screen-evidence",
      pass: [
        /14\+ years/i,
        /B\.A\./i,
        /systems architecture/i,
        /infrastructure/i
      ].every((pattern) => pattern.test(plainText)),
      detail: "Surfaces education, tenure, systems architecture, and infrastructure experience for employer review."
    },
    {
      id: "direct-source-link-and-concise-transition",
      pass:
        normalized.includes(`[Politico New York](${politicoArticleUrl})`) &&
        /later transitioned the project to a mission-aligned organization/i.test(plainText) &&
        !/The award was not disbursed to the project\./i.test(plainText),
      detail: "Links the contemporaneous Politico article directly and keeps the KC Town Hall transition concise."
    },
    {
      id: "collective-credit-and-claim-safety",
      pass:
        /Richard Caceres/i.test(plainText) &&
        /collective credit/i.test(plainText) &&
        /later transitioned the project to a mission-aligned organization/i.test(plainText) &&
        /distinguish these activity counts/i.test(plainText) &&
        !/(?:guaranteed|solely created|single-handedly|caused 2x|WCAG compliant|Section 508 compliant)/i.test(plainText),
      detail: "Preserves co-builder credit, metric boundaries, the project transition, and anti-overclaim language."
    }
  ];

  const passed = checks.filter((check) => check.pass).length;
  return {
    schemaVersion: 1,
    rubricId: rubric.id,
    sourcePath,
    evaluatedAt: new Date().toISOString(),
    wordCount: words.length,
    numericSignalCount: numericSignals.size,
    passedChecks: passed,
    totalChecks: checks.length,
    score: Math.round((passed / checks.length) * 100),
    overall: passed === checks.length ? "pass" : "fail",
    checks
  };
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

export function evaluateDocumentArtifact(root = repoRoot) {
  const config = rubric.documentArtifact;
  const pdfPath = path.join(root, config.pdfPath);
  const publicPdfPath = path.join(root, config.publicPdfPath);
  const inspectionPath = path.join(root, config.visualInspectionRunPath);
  const pdf = existsSync(pdfPath) ? readFileSync(pdfPath) : null;
  const publicPdf = existsSync(publicPdfPath) ? readFileSync(publicPdfPath) : null;
  const inspection = existsSync(inspectionPath)
    ? JSON.parse(readFileSync(inspectionPath, "utf8"))
    : null;
  const pdfText = pdf?.toString("latin1") ?? "";
  const pdfHash = pdf ? sha256(pdf) : null;
  const pageCount = (pdfText.match(/\/Type\s*\/Page\b/g) ?? []).length;

  const checks = [
    {
      id: "tailored-pdf-exists",
      pass: pdf !== null,
      detail: config.pdfPath
    },
    {
      id: "pdf-signature-and-application-size",
      pass:
        pdf !== null &&
        pdf.subarray(0, 5).toString("ascii") === "%PDF-" &&
        pdf.length >= config.minimumBytes &&
        pdf.length <= config.maximumBytes,
      detail: pdf
        ? `${pdf.length} bytes; required ${config.minimumBytes}-${config.maximumBytes}.`
        : "PDF is missing."
    },
    {
      id: "expected-page-count",
      pass: pageCount === config.expectedPages,
      detail: `${pageCount} pages; expected ${config.expectedPages}.`
    },
    {
      id: "required-link-annotations",
      pass: config.requiredLinkTargets.every((target) => pdfText.includes(target)),
      detail: `${config.requiredLinkTargets.filter((target) => pdfText.includes(target)).length}/${config.requiredLinkTargets.length} required links embedded.`
    },
    {
      id: "visible-politico-link-affordance",
      pass:
        inspection?.inspection?.checks?.politicoSourceLinkVisibleBlueAndUnderlined === true,
      detail:
        "The current hash-bound visual inspection confirms that Politico New York is blue and underlined."
    },
    {
      id: "public-download-matches-tailored-pdf",
      pass: pdf !== null && publicPdf !== null && pdf.equals(publicPdf),
      detail: "The portfolio download is byte-identical to the application-tailored PDF."
    },
    {
      id: "visual-inspection-current",
      pass:
        inspection !== null &&
        inspection.overall === "pass" &&
        inspection.inspection.actualNamedPeopleParticipated === false &&
        inspection.pdf.sha256 === pdfHash &&
        inspection.pdf.bytes === pdf?.length &&
        inspection.pdf.pages === pageCount &&
        inspection.inspection.pages.length === pageCount &&
        inspection.inspection.pages.every((page) => page.pass),
      detail: inspection
        ? `Inspection binds ${inspection.pdf.sha256} across ${inspection.inspection.pages.length} rendered pages.`
        : "Visual inspection record is missing."
    },
    {
      id: "read-only-template-copy-boundary",
      pass:
        inspection !== null &&
        inspection.sourceTemplate.revisionUnchangedAfterExport === true &&
        /read-only source/i.test(inspection.sourceTemplate.access) &&
        /new private copy/i.test(inspection.sourceTemplate.access),
      detail: "The recorded workflow kept the source unchanged and edited only a new private copy."
    }
  ];

  return {
    schemaVersion: 1,
    rubricId: `${rubric.id}.document-artifact`,
    pdfPath: config.pdfPath,
    publicPdfPath: config.publicPdfPath,
    sha256: pdfHash,
    passedChecks: checks.filter((check) => check.pass).length,
    totalChecks: checks.length,
    overall: checks.every((check) => check.pass) ? "pass" : "fail",
    checks
  };
}

function main() {
  const argPath = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
  const sourcePath = argPath ?? rubric.resumePath;
  const absolutePath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.join(repoRoot, sourcePath);
  const resume = evaluateResume(readFileSync(absolutePath, "utf8"), sourcePath);
  const documentArtifact = evaluateDocumentArtifact();
  const result = {
    schemaVersion: 1,
    overall:
      resume.overall === "pass" && documentArtifact.overall === "pass" ? "pass" : "fail",
    resume,
    documentArtifact
  };
  console.log(JSON.stringify(result, null, 2));
  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
