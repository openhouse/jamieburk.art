import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluateResumePdfPortfolio } from "./evaluate-resume-pdf-portfolio.mjs";
import { repointListMarkersInQdf } from "./normalize-resume-list-markers.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/resumes/pdf-portfolio.json"), "utf8")
);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

test("all nine opportunity resumes and the lifecycle-selected public resume have current inspected PDF siblings", () => {
  const result = evaluateResumePdfPortfolio();
  assert.equal(result.overall, "pass", JSON.stringify(result, null, 2));
  assert.equal(result.summary.markdownPdfSiblingPairs, 10);
  assert.equal(result.summary.visuallyInspectedVersions, 10);
  assert.equal(result.summary.passingVersions, 10);

  const publicResume = result.versions.find(
    (version) => version.publicInstallPath === "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
  );
  assert.ok(publicResume, "The public resume must be part of the maintained PDF portfolio.");
  assert.equal(publicResume.publicInstallMatches, true);
});

test("a missing PDF fails closed", () => {
  const version = config.versions[0];
  const result = evaluateResumePdfPortfolio({
    fileOverrides: { [version.pdfPath]: null }
  });
  assert.equal(result.overall, "fail");
  assert.equal(result.versions[0].overall, "fail");
  assert.equal(
    result.versions[0].checks.find((check) => check.id === "pdf-sibling-exists").pass,
    false
  );
});

test("Markdown drift invalidates the bound PDF visual receipt", () => {
  const version = config.versions[1];
  const original = readFileSync(path.join(repoRoot, version.markdownPath), "utf8");
  const result = evaluateResumePdfPortfolio({
    fileOverrides: { [version.markdownPath]: `${original}\nUnexported change.\n` }
  });
  assert.equal(result.overall, "fail");
  assert.equal(
    result.versions[1].checks.find(
      (check) => check.id === "visual-receipt-bound-to-artifacts"
    ).pass,
    false
  );
});

test("PDF drift invalidates the bound visual receipt", () => {
  const version = config.versions[2];
  const original = readFileSync(path.join(repoRoot, version.pdfPath));
  const mutation = Buffer.concat([original, Buffer.from("\n% stale artifact mutation\n")]);
  const result = evaluateResumePdfPortfolio({
    fileOverrides: { [version.pdfPath]: mutation }
  });
  assert.equal(result.versions[2].pdfSha256, sha256(mutation));
  assert.notEqual(result.versions[2].pdfSha256, sha256(original));
  assert.equal(result.overall, "fail");
  assert.equal(
    result.versions[2].checks.find(
      (check) => check.id === "visual-receipt-bound-to-artifacts"
    ).pass,
    false
  );
});

test("the PDF transformer makes only the marker one point smaller", () => {
  const source = `/LI <</MCID 14 >>BDC
BT
/F6 14 Tf
0 -12 Td <0194> Tj
ET
BT
/F6 14 Tf
8 0 Td <0003> Tj
ET
BT
/F8 14 Tf
24 0 Td <0036> Tj
ET
Q
q`;
  const result = repointListMarkersInQdf(source, {
    pdfCoordinateScale: 0.75,
    markerPointsBelowItem: 1
  });
  assert.equal(result.changedMarkers, 1);
  assert.equal(result.inspectedMarkers, 1);
  assert.match(result.source, /\/F6 12\.666667 Tf\n0 -12 Td <0194> Tj/);
  assert.match(result.source, /\/F6 14 Tf\n8 0 Td <0003> Tj/);
  assert.match(result.source, /\/F8 14 Tf\n24 0 Td <0036> Tj/);

  const secondPass = repointListMarkersInQdf(result.source, {
    pdfCoordinateScale: 0.75,
    markerPointsBelowItem: 1
  });
  assert.equal(secondPass.changedMarkers, 0);
  assert.equal(secondPass.inspectedMarkers, 1);
  assert.equal(secondPass.source, result.source);
});

test("numbered list markers follow the same one-point hierarchy", () => {
  const source = `/LI <</MCID 21 >>BDC
BT
/F6 14 Tf
0 -12 Td <0014> Tj
ET
BT
/F8 14 Tf
24 0 Td <0036> Tj
ET
Q
q`;
  const result = repointListMarkersInQdf(source, {
    pdfCoordinateScale: 0.75,
    markerPointsBelowItem: 1
  });
  assert.equal(result.changedMarkers, 1);
  assert.equal(result.inspectedMarkers, 1);
  assert.match(result.source, /\/F6 12\.666667 Tf\n0 -12 Td <0014> Tj/);
  assert.match(result.source, /\/F8 14 Tf\n24 0 Td <0036> Tj/);
});

test("an uninspected page fails the hard gate", () => {
  const version = config.versions[3];
  const receipt = JSON.parse(
    readFileSync(path.join(repoRoot, version.visualRunPath), "utf8")
  );
  receipt.inspection.pages[1].pass = false;
  receipt.overall = "fail";
  const result = evaluateResumePdfPortfolio({
    fileOverrides: { [version.visualRunPath]: receipt }
  });
  assert.equal(result.overall, "fail");
  assert.equal(
    result.versions[3].checks.find((check) => check.id === "every-page-visually-passed").pass,
    false
  );
});

test("private Google document locators fail the repository boundary", () => {
  const unsafe = structuredClone(config);
  unsafe.sourceTemplate.privateLocatorCommitted = true;
  unsafe.sourceTemplate.privateExample =
    "https://docs.google.com/document/d/123456789012345678901234567890/edit";
  const result = evaluateResumePdfPortfolio({ config: unsafe });
  assert.equal(result.overall, "fail");
  assert.equal(
    result.portfolioChecks.find(
      (check) => check.id === "no-private-google-locator-in-config"
    ).pass,
    false
  );
});
