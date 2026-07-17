import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { buildPublicRegistry, loadPublicSurfaceFiles, validateProjectionConsistency } from "../lib/projection-consistency.mjs";

const registryText = `${JSON.stringify(buildPublicRegistry(knowledgeBank), null, 2)}\n`;
const publicFiles = loadPublicSurfaceFiles();

test("current canonical projections and public registry are consistent", () => {
  assert.deepEqual(validateProjectionConsistency({ bank: knowledgeBank, registryText, publicFiles }), []);
});

test("projection validation cannot pass without scanning public surfaces", () => {
  assert.match(validateProjectionConsistency({ bank: knowledgeBank, registryText, publicFiles: [] }).join("\n"), /scan cannot be empty/);
});

test("generated registry drift is rejected", () => {
  assert.match(validateProjectionConsistency({ bank: knowledgeBank, registryText: "{}\n", publicFiles }).join("\n"), /registry disagrees/);
});

test("a held projection leaked through a public surface is rejected", () => {
  const held = knowledgeBank.claims.flatMap((claim) => claim.projections.map((projection) => ({ claim, projection }))).find(({ projection }) => projection.status === "hold");
  assert.ok(held);
  const changedFiles = [...publicFiles, { file: "apps/www/src/app/leak.tsx", content: held.projection.text }];
  assert.match(validateProjectionConsistency({ bank: knowledgeBank, registryText, publicFiles: changedFiles }).join("\n"), new RegExp(`${held.claim.id}: held projection leaked`));
});

test("default-ignorable characters cannot conceal a held projection", () => {
  const held = knowledgeBank.claims.flatMap((claim) => claim.projections.map((projection) => ({ claim, projection }))).find(({ projection }) => projection.status === "hold");
  assert.ok(held);
  const evasion = held.projection.text.replace(/(.{3})/g, "$1\u200b");
  const changedFiles = [...publicFiles, { file: "apps/www/src/app/invisible-leak.tsx", content: evasion }];
  assert.match(validateProjectionConsistency({ bank: knowledgeBank, registryText, publicFiles: changedFiles }).join("\n"), /held projection leaked/);
});

test("held claim and protected source identifiers cannot enter public surfaces", () => {
  const held = knowledgeBank.claims.find((claim) => claim.projections.some((projection) => projection.status === "hold"));
  const protectedSource = knowledgeBank.sources.find((source) => source.visibility === "protected" && source.protectedLocatorId);
  assert.ok(held && protectedSource);
  const changedFiles = [{ file: "apps/www/src/app/id-leak.tsx", content: `${held.id}\n${protectedSource.id}\n${protectedSource.protectedLocatorId}` }];
  const errors = validateProjectionConsistency({ bank: knowledgeBank, registryText, publicFiles: changedFiles }).join("\n");
  assert.match(errors, /held claim identifier leaked/);
  assert.match(errors, /protected source identifier leaked/);
  assert.match(errors, /protected locator identifier leaked/);
});

test("an active projection without an authorized surface is rejected", () => {
  const changed = structuredClone(knowledgeBank);
  const claim = changed.claims.find((item) => item.projections.some((projection) => projection.status === "active"));
  claim.projections.find((projection) => projection.status === "active").surfaces = [];
  assert.match(validateProjectionConsistency({ bank: changed, registryText: `${JSON.stringify(buildPublicRegistry(changed), null, 2)}\n`, publicFiles }).join("\n"), /active projection has no authorized surface/);
});

test("an occurrence cannot exceed the projection's authorized surfaces", () => {
  const changed = structuredClone(knowledgeBank);
  const page = changed.pages[0];
  const occurrence = page.occurrences[0];
  const claim = changed.claims.find((item) => item.id === occurrence.claimId);
  claim.projections.find((projection) => projection.key === occurrence.projection && projection.status === "active").surfaces = ["/somewhere-else"];
  assert.match(validateProjectionConsistency({ bank: changed, registryText: `${JSON.stringify(buildPublicRegistry(changed), null, 2)}\n`, publicFiles }).join("\n"), /is not an authorized surface/);
});

test("a protected source cannot become a public citation", () => {
  const changed = structuredClone(knowledgeBank);
  const page = changed.pages[0];
  const occurrence = page.occurrences[0];
  const sourceId = occurrence.sourceIds?.[0] ?? changed.claims.find((item) => item.id === occurrence.claimId).evidence.find((item) => item.renderCitation).sourceId;
  changed.sources.find((source) => source.id === sourceId).visibility = "protected";
  assert.match(validateProjectionConsistency({ bank: changed, registryText: `${JSON.stringify(buildPublicRegistry(changed), null, 2)}\n`, publicFiles }).join("\n"), /protected source/);
});

test("Unicode dash normalization cannot hide superseded wording", () => {
  const correction = knowledgeBank.corrections.find((item) => item.affectedSurfaces.some((surface) => surface.startsWith("/")));
  assert.ok(correction);
  const evasion = correction.previousText.replaceAll("-", "\u2011");
  const changedFiles = [...publicFiles, { file: "apps/www/src/app/stale.tsx", content: evasion }];
  assert.match(validateProjectionConsistency({ bank: knowledgeBank, registryText, publicFiles: changedFiles }).join("\n"), /superseded wording remains/);
});
