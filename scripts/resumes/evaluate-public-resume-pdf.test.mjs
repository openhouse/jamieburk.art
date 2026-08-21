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
      "Harry J. Epstein Company",
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
    "https://nycartc.com/",
    "https://fairrentnyc.nycartc.com/",
    "https://wowlist.org/",
    "https://callnyc.org/",
    "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
    "https://kctownhall.com/"
  ],
  forbiddenLinks: ["https://www.harryepstein.com/"],
  hardGates: [
    "source-markdown-bound",
    "exact-pdf-bound",
    "valid-pdf-envelope",
    "two-page-letter-layout",
    "tagged-google-docs-export",
    "safe-static-pdf",
    "native-hyperlinks",
    "forbidden-hyperlinks-absent",
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

test("the resume gate rejects a PDF that links a deliberately plain-text client name", () => {
  const result = evaluateResumePdf({
    spec: {
      ...defaultSpec,
      forbiddenLinks: ["https://www.harryepstein.com/"]
    },
    markdown,
    pdf
  });
  assert.equal(
    result.checks.find((check) => check.id === "forbidden-hyperlinks-absent")?.pass,
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

test("the public gate rejects WOWList audience and post counts in favor of ecosystem scale", () => {
  const countFramedMarkdown = Buffer.from(
    publicMarkdown
      .toString("utf8")
      .replace(
        "active in 35+ city ecosystems",
        "at a snapshot of 1,846 users and 16,142 posts/events"
      )
  );
  const result = evaluateResumePdf({
    spec: {
      ...exactPublicSpec,
      contentContract: {
        ...exactPublicSpec.contentContract,
        requiredPhrases: ["active in 35+ city ecosystems"],
        prohibitedPhrases: ["1,846 users", "16,142 posts/events"]
      }
    },
    markdown: countFramedMarkdown,
    pdf: publicPdf
  });

  assert.equal(
    result.checks.find((check) => check.id === "public-positioning-and-chronology")?.pass,
    false
  );
});

test("the public gate rejects a methodology-heavy WOWList disclaimer", () => {
  const defensiveMarkdown = Buffer.from(
    publicMarkdown
      .toString("utf8")
      .replace(
        "active in 35+ city ecosystems",
        "active in 35+ city ecosystems; distinguish these activity counts from retention, resident outcomes, or causal impact"
      )
  );
  const result = evaluateResumePdf({
    spec: {
      ...exactPublicSpec,
      contentContract: {
        ...exactPublicSpec.contentContract,
        requiredPhrases: ["active in 35+ city ecosystems"],
        prohibitedPhrases: [
          "distinguish these activity counts from",
          "resident outcomes, or causal impact"
        ]
      }
    },
    markdown: defensiveMarkdown,
    pdf: publicPdf
  });

  assert.equal(
    result.checks.find((check) => check.id === "public-positioning-and-chronology")?.pass,
    false
  );
});

test("the public gate requires exact-candidate evidence that linked experience headings preserve their surrounding style", () => {
  const result = evaluateResumePdf({
    spec: {
      ...exactPublicSpec,
      experienceHeadingLinkStyleInspection: {
        status: "pass",
        pdfSha256: sha256(publicPdf),
        requiredLabels: [
          "NYC Artist Coalition / FairRentNYC",
          "WOWList.org",
          "CallNYC.org",
          "KC Town Hall LLC"
        ],
        inspectedLabels: [
          "NYC Artist Coalition / FairRentNYC",
          "WOWList.org",
          "CallNYC.org",
          "KC Town Hall LLC"
        ],
        linkedTextColor: "#333334",
        surroundingHeadingColor: "#333334",
        linkedTextBold: true,
        surroundingHeadingBold: true,
        linkedTextUnderlined: false
      },
      hardGates: [
        ...exactPublicSpec.hardGates.slice(0, -1),
        "experience-heading-link-style",
        exactPublicSpec.hardGates.at(-1)
      ]
    },
    markdown: publicMarkdown,
    pdf: publicPdf
  });

  assert.equal(
    result.checks.find((check) => check.id === "experience-heading-link-style")?.pass,
    true
  );
});

test("the resume gate rejects list markers that are not one point smaller than their item text", () => {
  const result = evaluateResumePdf({
    spec: {
      ...exactPublicSpec,
      listMarkerTypographyInspection: {
        status: "pass",
        pdfSha256: sha256(publicPdf),
        listParagraphCount: 18,
        itemTextSizePoints: 10,
        markerSizePoints: 10,
        requiredDeltaPoints: 1,
        allListParagraphsMatched: true
      },
      hardGates: [
        ...exactPublicSpec.hardGates.slice(0, -1),
        "list-marker-typography",
        exactPublicSpec.hardGates.at(-1)
      ]
    },
    markdown: publicMarkdown,
    pdf: publicPdf
  });

  assert.equal(
    result.checks.find((check) => check.id === "list-marker-typography")?.pass,
    false
  );
  assert.equal(result.overall, "fail");
});
