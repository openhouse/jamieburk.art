import assert from "node:assert/strict";
import test from "node:test";
import {
  canonicalizeSourceUrl,
  containsPrivatePath,
  createIntakeReceipt,
  knowledgeReport,
  projectionMap,
  queryKnowledge
} from "../lib/knowledge-tools.mjs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const base = { title: "A useful source", project: "callnyc", kind: "public-url", reason: "Test a bounded lead", url: "https://example.com/source" };

test("intake creates a stable validated receipt without promoting a claim", () => {
  const receipt = createIntakeReceipt(base, new Date("2026-07-16T00:00:00Z"));
  assert.match(receipt.id, /^INTAKE-LEAD-/);
  assert.equal(receipt.disposition, "captured");
  assert.match(receipt.boundaries[0], /not a validated claim/);
});

test("duplicate source leads are preserved and labeled", () => {
  const receipt = createIntakeReceipt({ ...base, url: "https://X.COM/CivicHall/status/693124020917522433/" }, new Date("2026-07-16T00:00:00Z"));
  assert.equal(receipt.disposition, "duplicate");
  assert.match(receipt.boundaries.join(" "), /Potential duplicate/);
});

test("private paths cannot enter an intake receipt", () => {
  assert.throws(() => createIntakeReceipt({ ...base, reason: "See /Users/jamie/private.txt" }), /private filesystem paths/);
  assert.equal(containsPrivatePath({ note: "/Volumes/Archive/private.pdf" }), true);
  assert.equal(containsPrivatePath({ note: "／Ｕｓｅｒｓ／jamie/private.txt" }), true);
  assert.equal(containsPrivatePath({ note: "/Us\u200bers/jamie/private.txt" }), true);
  assert.equal(containsPrivatePath({ note: "/private/var/folders/private.txt" }), true);
  assert.equal(containsPrivatePath({ note: "/tmp/private.txt" }), true);
  assert.equal(containsPrivatePath({ note: "~/private.txt" }), true);
  assert.equal(containsPrivatePath({ note: "file%3A%2F%2F%2FUsers%2Fjamie%2Fprivate.txt" }), true);
});

test("source URLs have one comparison form", () => {
  assert.equal(canonicalizeSourceUrl("HTTPS://Example.COM:443/a/#fragment"), "https://example.com/a");
});

test("duplicate title comparison normalizes trailing and repeated whitespace", () => {
  const existing = knowledgeBank.intakeItems[0];
  const receipt = createIntakeReceipt({ title: `  ${existing.title}   `, project: existing.projectIds[0], kind: existing.kind, reason: "Duplicate normalization test" }, new Date("2026-07-16T00:00:00Z"));
  assert.equal(receipt.disposition, "duplicate");
});

test("query distinguishes record classes and filters projects", () => {
  const results = queryKnowledge({ type: "claim", project: "callnyc" });
  assert.ok(results.length > 0);
  assert.ok(results.every((item) => item.type === "claim" && item.record.project === "callnyc"));
});

test("active query excludes claims with only held projections", () => {
  const results = queryKnowledge({ type: "claim", active: true });
  assert.ok(results.length > 0);
  assert.ok(results.every((item) => item.record.projections.some((projection) => projection.status === "active")));
});

test("reports keep active and held knowledge visibly distinct", () => {
  assert.match(knowledgeReport(), /Active projected claims/);
  assert.match(knowledgeReport(), /held depth/i);
  assert.match(projectionMap(), /Projection map/);
  assert.match(projectionMap(), /hold:/);
});
