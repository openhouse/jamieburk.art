import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sha256 = value => createHash("sha256").update(value).digest("hex");
const digest = value => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
const sameKeys = (value, keys) => value && !Array.isArray(value) && typeof value === "object" &&
  Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));

function readArtifact(relativePath) {
  try {
    const resolved = realpathSync(path.join(root, relativePath));
    if (!resolved.startsWith(`${realpathSync(root)}${path.sep}`)) return null;
    return readFileSync(resolved);
  } catch {
    return null;
  }
}

export function pdfTargets(portfolio) {
  if (!Array.isArray(portfolio?.versions) || portfolio.versions.length === 0) throw new Error("invalid-portfolio");
  const ids = new Set();
  const paths = new Set();
  return portfolio.versions.map(version => {
    const markdownPath = version.coverLetterPath;
    if (typeof markdownPath !== "string" || !/^resumes\/[A-Za-z0-9_./-]+\.md$/.test(markdownPath) ||
        markdownPath.split("/").some(part => part === ".." || part === "." || !part) ||
        typeof version.opportunityId !== "string" || !/^[a-z0-9.-]+$/.test(version.opportunityId) ||
        typeof version.status !== "string" || ids.has(version.opportunityId) || paths.has(markdownPath)) {
      throw new Error("invalid-portfolio");
    }
    ids.add(version.opportunityId); paths.add(markdownPath);
    const pdfPath = markdownPath.replace(/\.md$/, ".pdf");
    return { opportunityId: version.opportunityId, status: version.status, markdownPath, pdfPath, reviewPath: `${pdfPath}.review.json` };
  });
}

function validReceipt(receipt) {
  // No arbitrary prose, source-document IDs, URLs, private paths or signature bytes.
  return sameKeys(receipt, ["schemaVersion", "opportunityId", "markdownSha256", "pdfSha256", "styleSha256", "signatureImageSha256", "export", "inspection"]) &&
    receipt.schemaVersion === 1 && typeof receipt.opportunityId === "string" &&
    [receipt.markdownSha256, receipt.pdfSha256, receipt.styleSha256, receipt.signatureImageSha256].every(digest) &&
    sameKeys(receipt.export, ["engine", "specimenUnchanged", "privateLocatorsOmitted"]) &&
    receipt.export.engine === "google-docs-native" && receipt.export.specimenUnchanged === true && receipt.export.privateLocatorsOmitted === true &&
    sameKeys(receipt.inspection, ["reviewedAt", "allPagesRasterized", "actualNamedPeopleParticipated", "textMatchesMarkdown", "linksChecked", "noSpecimenContent", "pages"]) &&
    typeof receipt.inspection.reviewedAt === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(receipt.inspection.reviewedAt) &&
    Number.isFinite(Date.parse(receipt.inspection.reviewedAt)) &&
    ["allPagesRasterized", "actualNamedPeopleParticipated", "textMatchesMarkdown", "linksChecked", "noSpecimenContent"].every(key => typeof receipt.inspection[key] === "boolean") &&
    Array.isArray(receipt.inspection.pages) && receipt.inspection.pages.every(page =>
      sameKeys(page, ["page", "layout", "typography", "signatureMatchesApprovedImage"]) && Number.isInteger(page.page) &&
      ["pass", "fail"].includes(page.layout) && ["pass", "fail"].includes(page.typography) && typeof page.signatureMatchesApprovedImage === "boolean");
}

export function evaluateCoverLetterPdfs({ portfolio, policy, readArtifact: read = readArtifact } = {}) {
  let targets;
  try { targets = pdfTargets(portfolio); } catch { return { pass: false, failures: ["invalid-portfolio"], versions: [] }; }
  const policyReady = policy?.schemaVersion === 1 && policy.style && typeof policy.style === "object" && !Array.isArray(policy.style);
  const signatureReady = policyReady && policy.signature?.status === "available" &&
    policy.signature.approvedForCoverLetters === true && digest(policy.signature.imageSha256);
  const styleHash = policyReady ? sha256(JSON.stringify(policy.style)) : null;
  const versions = targets.map(target => {
    const failures = [];
    const failUnless = (condition, code) => { if (!condition) failures.push(code); };
    const md = read(target.markdownPath);
    const pdf = read(target.pdfPath);
    let receipt;
    try { receipt = JSON.parse(read(target.reviewPath)?.toString() ?? "null"); } catch { receipt = null; }
    const receiptValid = validReceipt(receipt);
    // Structural preflight for native Google Docs exports, not a signature verifier
    // or general PDF parser. An image resource can only be identified by visual QA.
    const pdfText = Buffer.isBuffer(pdf) ? pdf.toString("latin1") : "";
    const pdfValid = Buffer.isBuffer(pdf) && pdf.length <= 10_000_000 && pdfText.startsWith("%PDF-") && pdfText.includes("%%EOF");
    const pages = [...pdfText.matchAll(/\/Type\s*\/Page\b/g)].length;
    const letterPage = /\/MediaBox\s*\[\s*0(?:\.0+)?\s+0(?:\.0+)?\s+612(?:\.0+)?\s+792(?:\.0+)?\s*\]/.test(pdfText);
    const historical = /expired|historical|benchmark/.test(target.status);
    failUnless(policyReady, "invalid-policy");
    failUnless(signatureReady, "signature-not-ready");
    failUnless(md?.length > 0, "markdown-missing");
    failUnless(pdfValid, "pdf-missing-or-invalid");
    failUnless(pdfValid && pages === 1 && letterPage, "pdf-not-one-letter-page");
    failUnless(pdfValid && /\/Subtype\s*\/Image\b/.test(pdfText), "signature-image-resource-missing");
    failUnless(receiptValid, "review-schema-or-privacy");
    failUnless(receiptValid && md && pdf && receipt.opportunityId === target.opportunityId &&
      receipt.markdownSha256 === sha256(md) && receipt.pdfSha256 === sha256(pdf) &&
      receipt.styleSha256 === styleHash && receipt.signatureImageSha256 === policy?.signature?.imageSha256,
    "stale-or-missing-review");
    failUnless(receiptValid && receipt.inspection.allPagesRasterized && receipt.inspection.actualNamedPeopleParticipated === false &&
      receipt.inspection.textMatchesMarkdown && receipt.inspection.linksChecked && receipt.inspection.noSpecimenContent &&
      receipt.inspection.pages.length === pages && pages > 0 && receipt.inspection.pages.every((page, index) =>
        page.page === index + 1 && page.layout === "pass" && page.typography === "pass" && page.signatureMatchesApprovedImage),
    "visual-review-incomplete");
    if (historical) failUnless(/Historical benchmark\s*[—-]\s*do not submit/i.test(md?.toString() ?? ""), "benchmark-warning-missing");
    return { ...target, pdfReady: failures.length === 0, disposition: historical ? "historical-do-not-submit" : "requires-current-opportunity-and-reader-gates", submissionAuthorized: false, failures };
  });
  return { pass: versions.every(version => version.pdfReady), failures: [], versions };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const portfolio = JSON.parse(readArtifact("evals/cover-letters/hiring-reader-portfolio.json"));
  const policy = JSON.parse(readArtifact("evals/cover-letters/pdf-policy.json"));
  const result = evaluateCoverLetterPdfs({ portfolio, policy });
  if (process.argv.includes("--json")) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`Cover-letter PDFs: ${result.versions.filter(version => version.pdfReady).length}/${result.versions.length} ready`);
    for (const version of result.versions) console.log(`${version.pdfReady ? "PASS" : "PENDING"} ${version.opportunityId}: ${version.failures.join(", ") || version.disposition}`);
    console.log("PDF readiness is not submission authorization or a hiring-reader decision.");
  }
  process.exitCode = result.pass ? 0 : 1;
}
