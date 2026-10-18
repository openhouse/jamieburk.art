import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateMethodEvidence, publishMethodEvidence } from "./capture-professor-method-evidence.mjs";
import { computePublicSurfaceFingerprint } from "./accessibility-evidence.mjs";

const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const surface = { fingerprint: "a".repeat(64), fileCount: 157, policy: "v2-runtime-build-inputs" };
function fixture() {
  const buffers = new Map();
  const rows = [375, 1280].flatMap((width) => ["practical-sequence", "harry-j-epstein", "fair-rent-nyc", "sunday-dinner"].map((targetId) => {
    const screenshot = `professor-method-test/${targetId}-${width}.png`;
    const bytes = Buffer.from(`synthetic test bytes for ${screenshot}`);
    buffers.set(screenshot, bytes);
    return { targetId, viewport: { width, height: 900 }, screenshot, sha256: hash(bytes), byteLength: bytes.length,
      selector: targetId === "practical-sequence" ? 'main p:has-text("The practical sequence is recursive:")' :
        `main article:has(h3 a[href="/work/${targetId === "sunday-dinner" ? "196-sunday-dinner" : targetId}"])`,
      text: "Observed test section text.", textSha256: hash("Observed test section text."),
      httpStatus: 200, documentMatchesBuild: true, completeTextInsideBounds: true,
      clippingAncestorCount: 0, horizontalOverflow: false, visible: true, headerOverlap: false, failedRequests: [], pageErrors: [],
      image: { width: width - 48, height: 300 }, capturedAt: "2026-10-18T20:00:00.000Z" };
  }));
  const manifest = { reportVersion: 1, route: "/about", capturedAt: "2026-10-18T20:00:00.000Z",
    publicSurfaceFingerprint: surface.fingerprint, publicSurfaceFileCount: 157, publicSurfaceFingerprintPolicy: surface.policy,
    buildAboutHtmlSha256: "b".repeat(64), responsiveMatrixSha256: "c".repeat(64),
    rows };
  return { manifest, buffers };
}
const validate = (manifest, buffers, current = surface) => validateMethodEvidence(manifest, current, (relative) => {
  if (!buffers.has(relative)) throw new Error("Missing image");
  return buffers.get(relative);
});

test("complete method section evidence passes only for its observed public surface", () => {
  const { manifest, buffers } = fixture();
  assert.equal(validate(manifest, buffers).passed, true);
  assert.equal(validate(manifest, buffers, { ...surface, fingerprint: "d".repeat(64) }).passed, false);
});

test("missing, repeated, or wrong-width sections cannot stand in for all eight observations", () => {
  const { manifest, buffers } = fixture();
  assert.equal(validate({ ...manifest, rows: manifest.rows.slice(0, 7) }, buffers).passed, false);
  assert.equal(validate({ ...manifest, rows: [...manifest.rows.slice(0, 7), manifest.rows[0]] }, buffers).passed, false);
  const wrongWidth = structuredClone(manifest);
  wrongWidth.rows[0].viewport.width = 360;
  assert.equal(validate(wrongWidth, buffers).passed, false);
});

test("absent or changed screenshot bytes and clipped or mismatched sections fail closed", () => {
  const { manifest, buffers } = fixture();
  const missing = new Map(buffers);
  missing.delete(manifest.rows[0].screenshot);
  assert.equal(validate(manifest, missing).passed, false);
  const changed = new Map(buffers);
  changed.set(manifest.rows[0].screenshot, Buffer.from("different bytes"));
  assert.equal(validate(manifest, changed).passed, false);
  for (const patch of [{ completeTextInsideBounds: false }, { documentMatchesBuild: false }, { clippingAncestorCount: 1 },
    { selector: "main h1" }, { text: "" }, { horizontalOverflow: true }, { headerOverlap: true },
    { failedRequests: ["failed-font"] }, { pageErrors: ["uncaught exception"] }, { screenshot: "../../private.png" }]) {
    const invalid = structuredClone(manifest);
    Object.assign(invalid.rows[0], patch);
    assert.equal(validate(invalid, buffers).passed, false, JSON.stringify(patch));
  }
});

test("unobserved header and browser failures cannot be interpreted as zero failures", () => {
  const { manifest, buffers } = fixture();
  for (const field of ["headerOverlap", "failedRequests", "pageErrors"]) {
    const incomplete = structuredClone(manifest);
    delete incomplete.rows[0][field];
    assert.equal(validate(incomplete, buffers).passed, false, `${field} must be observed explicitly`);
  }
});

test("partial publication leaves previous canonical manifest and images unchanged", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "professor-method-publication-"));
  try {
    const previous = path.join(directory, "professor-method-manifest.json");
    writeFileSync(previous, "previous manifest\n");
    const { manifest, buffers } = fixture();
    assert.throws(() => publishMethodEvidence(directory, { ...manifest, rows: manifest.rows.slice(0, 7) }, surface, buffers), /incomplete|invalid/i);
    assert.equal(readFileSync(previous, "utf8"), "previous manifest\n");
    publishMethodEvidence(directory, manifest, surface, buffers);
    assert.deepEqual(JSON.parse(readFileSync(previous, "utf8")), manifest);
    assert.deepEqual(readFileSync(path.join(directory, manifest.rows[0].screenshot)), buffers.get(manifest.rows[0].screenshot));
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

test("unsafe screenshot locators are rejected before the reader is invoked", () => {
  const { manifest } = fixture();
  manifest.rows[0].screenshot = "../../protected.png";
  const reads = [];
  const result = validateMethodEvidence(manifest, surface, (relative) => {
    reads.push(relative);
    throw new Error("No file access in this probe");
  });
  assert.equal(result.passed, false);
  assert.equal(reads.includes("../../protected.png"), false);
});

test("checked-in method screenshots remain complete and bound to the actual current public surface", () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const output = path.join(root, "docs/qa/evals-H");
  const manifest = JSON.parse(readFileSync(path.join(output, "professor-method-manifest.json"), "utf8"));
  const result = validateMethodEvidence(manifest, computePublicSurfaceFingerprint(root), (file) => readFileSync(path.join(output, file)));
  assert.equal(result.passed, true, result.errors.join("; "));
});
