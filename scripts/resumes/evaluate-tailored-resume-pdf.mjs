import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const specPath = path.join(
  repoRoot,
  "evals/resumes/artifacts/nyc-oti-senior-product-manager-782366-pdf.json"
);

export const defaultSpec = JSON.parse(readFileSync(specPath, "utf8"));

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function evaluateResumePdf({
  spec = defaultSpec,
  markdown = readFileSync(path.join(repoRoot, spec.sourceMarkdownPath)),
  pdf = readFileSync(path.join(repoRoot, spec.pdfPath))
} = {}) {
  const pdfText = pdf.toString("latin1");
  const pageObjects = pdfText.match(/\/Type \/Page\b/g) ?? [];
  const letterMediaBoxes = pdfText.match(/\/MediaBox \[0 0 612 792\]/g) ?? [];
  const missingLinks = spec.requiredLinks.filter((url) => !pdfText.includes(`/URI (${url})`));
  const visualCriteria = Object.values(spec.visualInspection.criteria);

  const checks = [
    {
      id: "source-markdown-bound",
      pass: sha256(markdown) === spec.sourceMarkdownSha256,
      detail: "The PDF manifest is bound to the exact tailored Markdown candidate."
    },
    {
      id: "exact-pdf-bound",
      pass: sha256(pdf) === spec.pdfSha256 && pdf.length === spec.pdfSizeBytes,
      detail: "The evaluated PDF digest and byte size match the visually inspected artifact."
    },
    {
      id: "valid-pdf-envelope",
      pass: pdf.subarray(0, 5).toString("ascii") === "%PDF-" && pdfText.includes("%%EOF"),
      detail: "The artifact has a PDF header and end marker."
    },
    {
      id: "two-page-letter-layout",
      pass:
        pageObjects.length === spec.pageCount &&
        letterMediaBoxes.length === spec.pageCount &&
        spec.pageSizePoints[0] === 612 &&
        spec.pageSizePoints[1] === 792,
      detail: `${pageObjects.length} page objects and ${letterMediaBoxes.length} US Letter media boxes.`
    },
    {
      id: "tagged-google-docs-export",
      pass:
        pdfText.includes("/StructTreeRoot") &&
        pdfText.includes("/Producer (Skia/PDF m153 Google Docs Renderer)"),
      detail: "The PDF is a tagged Google Docs export from the copied native document."
    },
    {
      id: "safe-static-pdf",
      pass:
        !pdfText.includes("/Encrypt") &&
        !pdfText.includes("/JavaScript") &&
        !pdfText.includes("/JS (") &&
        !pdfText.includes("/AcroForm"),
      detail: "The artifact is unencrypted and contains no JavaScript or interactive form."
    },
    {
      id: "native-hyperlinks",
      pass: missingLinks.length === 0,
      detail: missingLinks.length === 0 ? "All required application and project links are native PDF annotations." : `Missing links: ${missingLinks.join(", ")}`
    },
    {
      id: "complete-visual-inspection",
      pass:
        spec.visualInspection.status === "pass" &&
        spec.visualInspection.pagesInspected.length === spec.pageCount &&
        spec.visualInspection.pagesInspected.every((page, index) => page === index + 1) &&
        visualCriteria.every(Boolean),
      detail: "Every page was rendered and inspected for clipping, hierarchy, typography, readability, and whitespace."
    }
  ];

  const passedChecks = checks.filter((check) => check.pass).length;
  return {
    schemaVersion: 1,
    evalId: spec.id,
    sourceMarkdownPath: spec.sourceMarkdownPath,
    pdfPath: spec.pdfPath,
    sourceMarkdownSha256: sha256(markdown),
    pdfSha256: sha256(pdf),
    pdfSizeBytes: pdf.length,
    pageCount: pageObjects.length,
    passedChecks,
    totalChecks: checks.length,
    overall: passedChecks === checks.length ? "pass" : "fail",
    checks,
    boundary: spec.boundary
  };
}

function main() {
  const result = evaluateResumePdf();
  console.log(JSON.stringify(result, null, 2));
  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
