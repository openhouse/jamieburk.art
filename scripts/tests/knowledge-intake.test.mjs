import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  queryKnowledgeBank,
  validateIntakeEnvelope,
  validateIntakeQueue
} from "../lib/knowledge-intake-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const specimen = {
  version: 1,
  title: "Public source lead",
  publicUrl: "https://example.com/source",
  record: {
    id: "INTAKE-2026-07-16-PUBLIC-SOURCE-LEAD",
    receivedAt: "2026-07-16",
    kind: "source-url",
    publicSummary: "A public source needs close reading before claim promotion.",
    privacy: "public-safe-summary",
    status: "received",
    sourceIds: [],
    claimIds: [],
    researchInquiryIds: [],
    projectionIntent: "undecided",
    nextActions: ["Close-read the source and record support boundaries."],
    reviewedAt: "2026-07-16",
    reviewedBy: ["test"]
  }
};

test("public-safe intake envelope validates", function () {
  assert.deepEqual(validateIntakeEnvelope(specimen), []);
});

test("private paths are rejected from intake", function () {
  const unsafe = structuredClone(specimen);
  unsafe.record.publicSummary = "Stored under /Volumes/example/private";
  assert(validateIntakeEnvelope(unsafe).some(function (failure) { return failure.includes("prohibited"); }));
});

test("protected intake cannot expose a URL", function () {
  const protectedLead = structuredClone(specimen);
  protectedLead.record.privacy = "protected";
  protectedLead.record.protectedLocatorId = "OPAQUE-LEAD-ONE";
  assert(validateIntakeEnvelope(protectedLead).some(function (failure) { return failure.includes("Protected intake"); }));
});

test("repository intake queue is valid", function () {
  assert.deepEqual(validateIntakeQueue(repoRoot).failures, []);
});

test("publication palette requires an exact surface", function () {
  assert.throws(function () {
    queryKnowledgeBank({ publicationSafe: true }, []);
  }, /requires --surface/);
});

test("publication palette emits active exact-surface projections only", function () {
  const result = queryKnowledgeBank({ publicationSafe: true, surface: "/work/callnyc" }, []);
  assert.equal(result.mode, "publication-palette");
  assert(result.claims.length > 0);
  assert(result.claims.every(function (claim) {
    return claim.projections.every(function (projection) {
      return projection.status === "active" && projection.surfaces.includes("/work/callnyc");
    });
  }));
});

