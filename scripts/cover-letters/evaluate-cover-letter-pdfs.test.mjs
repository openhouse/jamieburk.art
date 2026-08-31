import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { evaluateCoverLetterPdfs, pdfTargets } from "./evaluate-cover-letter-pdfs.mjs";

const hash = value => createHash("sha256").update(value).digest("hex");
const portfolio = { versions: [{ opportunityId: "example.role", status: "live-priority", coverLetterPath: "resumes/example/Letter.md" }] };
const policy = {
  schemaVersion: 1,
  specimen: { signatureImageFound: true, accessMode: 'read-only', privateLocatorCommitted: false, sourceContentCopiedIntoRepository: false },
  style: { bodyFont: "Karla", bodySizePt: 10 },
  signature: { status: "available", approvedForCoverLetters: true, imageSha256: "a".repeat(64) },
};
// Structural fixture only, not an application PDF or a visual-review receipt.
const pdf = Buffer.from("%PDF-1.7\n1 0 obj <</Type /Page /MediaBox [0 0 612 792]>> endobj\n2 0 obj <</Subtype /Image>> endobj\n%%EOF");
const markdown = "# Jamie Burkart\n\nDear Hiring Team,\n\nA specific example.\n\nWarmly,\nJamie Burkart\n";
function fixture() {
  const receipt = {
    schemaVersion: 1, opportunityId: "example.role",
    markdownSha256: hash(markdown), pdfSha256: hash(pdf),
    styleSha256: hash(JSON.stringify(policy.style)), signatureImageSha256: policy.signature.imageSha256,
    export: { engine: "google-docs-native", specimenUnchanged: true, privateLocatorsOmitted: true },
    inspection: {
      reviewedAt: "2026-08-31T12:00:00Z", allPagesRasterized: true, actualNamedPeopleParticipated: false,
      textMatchesMarkdown: true, linksChecked: true, noSpecimenContent: true,
      pages: [{ page: 1, layout: "pass", typography: "pass", signatureMatchesApprovedImage: true }],
    },
  };
  const files = { "resumes/example/Letter.md": Buffer.from(markdown), "resumes/example/Letter.pdf": pdf };
  return {
    receipt, files,
    run(overrides = {}) {
      files["resumes/example/Letter.pdf.review.json"] = Buffer.from(JSON.stringify(receipt));
      return evaluateCoverLetterPdfs({ portfolio, policy, readArtifact: name => files[name] ?? null, ...overrides });
    },
  };
}

test("every maintained letter derives its PDF and review siblings without a duplicate registry", () => {
  assert.deepEqual(pdfTargets(portfolio), [{ opportunityId: "example.role", status: "live-priority", markdownPath: "resumes/example/Letter.md", pdfPath: "resumes/example/Letter.pdf", reviewPath: "resumes/example/Letter.pdf.review.json" }]);
});
test("current exact-artifact native export and complete visual receipt are ready", () => {
  const result = fixture().run();
  assert.equal(result.pass, true);
  assert.equal(result.versions[0].pdfReady, true);
  assert.equal(result.versions[0].submissionAuthorized, false);
});
test("missing signature fails even with a PDF and a claimed visual pass", () => {
  const result = fixture().run({ policy: { ...policy, signature: { status: "missing", approvedForCoverLetters: false, imageSha256: null } } });
  assert.equal(result.pass, false);
  assert.ok(result.versions[0].failures.includes("signature-not-ready"));
});
test("a signature-ready assertion cannot override an unverified or exposed specimen", () => {
  for (const change of [{ signatureImageFound: false }, { privateLocatorCommitted: true }, { sourceContentCopiedIntoRepository: true }, { accessMode: 'modified' }]) {
    const result = fixture().run({ policy: { ...policy, specimen: { ...policy.specimen, ...change } } });
    assert.ok(result.versions[0].failures.includes('specimen-not-verified'));
  }
});
test("missing PDF cannot pass on a receipt alone", () => {
  const f = fixture(); delete f.files["resumes/example/Letter.pdf"];
  assert.ok(f.run().versions[0].failures.includes("pdf-missing-or-invalid"));
});
for (const artifact of ["markdown", "pdf", "style", "signature"]) {
  test(`${artifact} changes invalidate the exact-candidate review`, () => {
    const f = fixture();
    let changedPolicy = structuredClone(policy);
    if (artifact === "markdown") f.files["resumes/example/Letter.md"] = Buffer.from(markdown + "A new claim.");
    if (artifact === "pdf") f.files["resumes/example/Letter.pdf"] = Buffer.concat([pdf, Buffer.from("\n%changed")]);
    if (artifact === "style") changedPolicy.style.bodySizePt = 11;
    if (artifact === "signature") changedPolicy.signature.imageSha256 = "b".repeat(64);
    assert.ok(f.run({ policy: changedPolicy }).versions[0].failures.includes("stale-or-missing-review"));
  });
}
test("text-only native PDF with a claimed signature fails the image preflight", () => {
  const f = fixture(); const unsigned = Buffer.from(pdf.toString().replace("/Subtype /Image", "/Type /Catalog"));
  f.files["resumes/example/Letter.pdf"] = unsigned; f.receipt.pdfSha256 = hash(unsigned);
  assert.ok(f.run().versions[0].failures.includes("signature-image-resource-missing"));
});
for (const field of ["textMatchesMarkdown", "linksChecked", "noSpecimenContent", "allPagesRasterized"]) {
  test(`visual inspection must affirm ${field}`, () => {
    const f = fixture(); f.receipt.inspection[field] = false;
    assert.ok(f.run().versions[0].failures.includes("visual-review-incomplete"));
  });
}
test("signature must be visually compared with the approved image", () => {
  const f = fixture(); f.receipt.inspection.pages[0].signatureMatchesApprovedImage = false;
  assert.equal(f.run().pass, false);
});
test("a second page needs its own inspection and exceeds the one-page letter contract", () => {
  const f = fixture(); const twoPages = Buffer.concat([pdf, Buffer.from("\n3 0 obj <</Type /Page>> endobj")]);
  f.files["resumes/example/Letter.pdf"] = twoPages; f.receipt.pdfSha256 = hash(twoPages);
  assert.ok(f.run().versions[0].failures.includes("pdf-not-one-letter-page"));
});
test("non-native export and a modified specimen are rejected", () => {
  const f = fixture(); f.receipt.export.engine = "local-html";
  assert.equal(f.run().pass, false);
  f.receipt.export.engine = "google-docs-native"; f.receipt.export.specimenUnchanged = false;
  assert.equal(f.run().pass, false);
});
test("private locators and unexpected receipt fields are rejected", () => {
  const f = fixture(); f.receipt.export.documentUrl = "https://docs.google.com/document/d/private";
  assert.ok(f.run().versions[0].failures.includes("review-schema-or-privacy"));
});
test("expired benchmark remains do-not-submit even with a ready PDF", () => {
  const f = fixture(); f.files["resumes/example/Letter.md"] = Buffer.from(markdown + "\nHistorical benchmark — do not submit\n");
  f.receipt.markdownSha256 = hash(f.files["resumes/example/Letter.md"]);
  const result = f.run({ portfolio: { versions: [{ ...portfolio.versions[0], status: "expired-benchmark" }] } });
  assert.equal(result.pass, true);
  assert.equal(result.versions[0].disposition, "historical-do-not-submit");
  assert.equal(result.versions[0].submissionAuthorized, false);
});
test("missing benchmark warning blocks the PDF", () => {
  assert.ok(fixture().run({ portfolio: { versions: [{ ...portfolio.versions[0], status: "expired-benchmark" }] } }).versions[0].failures.includes("benchmark-warning-missing"));
});
test("a new maintained opportunity is checked immediately", () => {
  const f = fixture();
  const result = f.run({ portfolio: { versions: [...portfolio.versions, { opportunityId: "another.role", status: "live-priority", coverLetterPath: "resumes/another/Letter.md" }] } });
  assert.equal(result.versions.length, 2); assert.equal(result.pass, false);
});
test("empty, duplicate or unsafe portfolios fail closed", () => {
  for (const versions of [[], [portfolio.versions[0], portfolio.versions[0]], [{ ...portfolio.versions[0], coverLetterPath: "../private.md" }]]) {
    assert.equal(fixture().run({ portfolio: { versions } }).pass, false);
  }
});
test("repository targets cover every maintained opportunity, including the expired benchmark", () => {
  const actual = JSON.parse(readFileSync(new URL("../../evals/cover-letters/hiring-reader-portfolio.json", import.meta.url)));
  const targets = pdfTargets(actual);
  assert.equal(targets.length, actual.versions.length);
  assert.ok(targets.length > 0);
  assert.ok(targets.some(x => x.opportunityId.endsWith("782369")));
});
test("normal cover-letter checks run the PDF gate before model review", () => {
  const { scripts } = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url)));
  const command = scripts["evals:cover-letters"];
  assert.ok(command.includes("&& npm run evals:cover-letter-pdfs &&"));
  assert.ok(command.indexOf("evals:cover-letter-pdfs") < command.indexOf("evaluate-hiring-reader-llm.mjs"));
  assert.equal(scripts["evals:cover-letter-pdfs"], "node scripts/cover-letters/evaluate-cover-letter-pdfs.mjs");
});
