import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { defaultSpec, evaluateResumePdf } from "./evaluate-tailored-resume-pdf.mjs";
import { evaluatePublicResumePdf, publicResumeSpec } from "./evaluate-public-resume-pdf.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const markdown = readFileSync(path.join(repoRoot, defaultSpec.sourceMarkdownPath));
const pdf = readFileSync(path.join(repoRoot, defaultSpec.pdfPath));
const publicMarkdownPath =
  "resumes/2026-08-15/technical-project-manager-product-operations-implementation/Jamie-Burkart-Resume-Technical-Project-Manager.md";
const publicPdfPath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
const publicMarkdown = readFileSync(path.join(repoRoot, publicMarkdownPath));
const publicPdf = readFileSync(path.join(repoRoot, publicPdfPath));

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

const publicContractSpec = {
  ...defaultSpec,
  id: "public-technical-project-manager-resume-contract-test",
  sourceMarkdownSha256: sha256(markdown),
  pdfSha256: sha256(pdf),
  pdfSizeBytes: pdf.length,
  contentContract: {
    requiredHeadline: "Technical Project Manager | Product Operations & Implementation",
    prohibitedHeadline: "Senior Product Manager | Civic Technology, Product Operations & Implementation",
    requiredChronologyPhrases: [
      "Client work since 2009",
      "Thick Arts LLC formed 2012",
      "2009–2015"
    ],
    prohibitedChronologyPatterns: [
      "THICK ARTS LLC — Founder, Product & Technical Project Manager / Web Systems Lead\\nNew York, NY / Remote | 2009–Present"
    ]
  }
};

const exactPublicSpec = {
  ...publicContractSpec,
  id: "resume-artifact.public.technical-project-manager.pdf",
  sourceMarkdownPath: publicMarkdownPath,
  sourceMarkdownSha256: sha256(publicMarkdown),
  pdfPath: publicPdfPath,
  pdfSha256: sha256(publicPdf),
  pdfSizeBytes: publicPdf.length,
  requiredLinks: [
    "mailto:jamie.burkart@gmail.com",
    "https://jamieburk.art/",
    "https://www.linkedin.com/in/jamie-burkart/",
    "https://github.com/openhouse",
    "https://www.harryepstein.com/",
    "https://nycartc.com/",
    "https://fairrentnyc.nycartc.com/",
    "https://wowlist.org/",
    "https://callnyc.org/",
    "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
    "https://kctownhall.com/"
  ],
  hardGates: [
    "source-markdown-bound",
    "exact-pdf-bound",
    "valid-pdf-envelope",
    "two-page-letter-layout",
    "tagged-google-docs-export",
    "safe-static-pdf",
    "native-hyperlinks",
    "public-positioning-and-chronology",
    "complete-visual-inspection"
  ]
};

test("the public-resume contract rejects OTI-specific positioning and collapsed LLC chronology", () => {
  const result = evaluateResumePdf({ spec: publicContractSpec, markdown, pdf });
  assert.equal(
    result.checks.find((check) => check.id === "public-positioning-and-chronology")?.pass,
    false
  );
});

test("the exact public Technical Project Manager resume passes every gate", () => {
  const result = evaluatePublicResumePdf();
  assert.equal(result.overall, "pass", JSON.stringify(result.checks, null, 2));
  assert.deepEqual(result.checks.map((check) => check.id), publicResumeSpec.hardGates);
});

test("the public resume preserves the selected Palatino, Oswald, and Karla font system", () => {
  const result = evaluatePublicResumePdf();
  assert.equal(result.checks.find((check) => check.id === "font-system")?.pass, true);
});

test("the public gate rejects chronology drift even when the PDF bytes are unchanged", () => {
  const changedMarkdown = Buffer.from(
    publicMarkdown.toString("utf8").replace("Thick Arts LLC formed 2012", "Thick Arts LLC formed 2011")
  );
  const result = evaluateResumePdf({
    spec: exactPublicSpec,
    markdown: changedMarkdown,
    pdf: publicPdf
  });
  assert.equal(result.checks.find((check) => check.id === "source-markdown-bound")?.pass, false);
  assert.equal(
    result.checks.find((check) => check.id === "public-positioning-and-chronology")?.pass,
    false
  );
  assert.equal(result.overall, "fail");
});
