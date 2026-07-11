import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  evidenceRecordSchema,
  sourceRecordSchema
} from "../../apps/www/src/data/knowledge-bank/schema.ts";
import {
  loadCitationBundle,
  repoRoot,
  resolveCitationPage,
  validateCitationBundle
} from "../lib/citation-model.mjs";

const original = loadCitationBundle();
const clone = () => structuredClone(original);

test("page numbering starts at one", () => {
  assert.deepEqual(resolveCitationPage("callnyc", original).map((item) => item.number), [1, 2, 3]);
});

test("numbers reset on a second page", () => {
  const bundle = clone();
  bundle.pages.push({
    id: "fixture",
    path: "/fixture",
    occurrences: [{ id: "follow-on", noteId: "callnyc-independent-follow-on" }]
  });
  const claim = bundle.claims.find((item) => item.id === "callnyc-independent-follow-on-project");
  claim.allowedSurfaces.push("/fixture");
  assert.equal(resolveCitationPage("fixture", bundle)[0].number, 1);
});

test("the same note reuses its number and receives unique backlinks", () => {
  const bundle = clone();
  bundle.pages[0].occurrences.push({ id: "event-context-again", noteId: "callnyc-event-context" });
  const resolved = resolveCitationPage("callnyc", bundle);
  assert.deepEqual(resolved.map((item) => item.number), [1, 2, 3]);
  assert.deepEqual(resolved[0].backlinks, ["cite-callnyc-event-context", "cite-callnyc-event-context-again"]);
  assert.equal(new Set(resolved[0].backlinks).size, 2);
});

test("duplicate IDs fail", () => {
  const bundle = clone();
  bundle.sources.push(structuredClone(bundle.sources[0]));
  assert.match(validateCitationBundle(bundle).failures.join("\n"), /Duplicate sources IDs/);
});

test("unknown relationships fail schema validation", () => {
  const record = { ...original.evidence[0], relation: "invented" };
  assert.equal(evidenceRecordSchema.safeParse(record).success, false);
});

test("malformed URLs fail schema validation", () => {
  const source = { ...original.sources[0], url: "not a URL" };
  assert.equal(sourceRecordSchema.safeParse(source).success, false);
});

test("a not-public source cannot render", () => {
  const bundle = clone();
  bundle.sources[0].publicationMode = "not-public";
  bundle.sources[0].url = undefined;
  assert.match(validateCitationBundle(bundle).failures.join("\n"), /not-public source/);
});

test("a withheld note cannot render", () => {
  const bundle = clone();
  bundle.pages[0].occurrences[0].noteId = "callnyc-digital-district-breakout";
  assert.match(validateCitationBundle(bundle).failures.join("\n"), /withheld note/);
  assert.throws(() => resolveCitationPage("callnyc", bundle), /withheld note/);
});

test("a protected claim cannot render", () => {
  const bundle = clone();
  bundle.claims.find((item) => item.id === "callnyc-event-date-time-purpose").state = "protected";
  assert.match(validateCitationBundle(bundle).failures.join("\n"), /protected claim/);
});

test("negative-search wording cannot claim nonexistence", () => {
  const bundle = clone();
  const evidence = bundle.evidence.find((item) => item.relation === "negative-search");
  evidence.supportNote = "This proves no event page ever existed.";
  assert.match(validateCitationBundle(bundle).failures.join("\n"), /proof of nonexistence/);
});

test("an archival carrier cannot be called the event listing", () => {
  const bundle = clone();
  const evidence = bundle.evidence.find((item) => item.relation === "archival-carrier");
  evidence.supportNote = "This is the original event listing.";
  assert.match(validateCitationBundle(bundle).failures.join("\n"), /original event listing/);
});

test("CallNYC source order is deterministic", () => {
  assert.deepEqual(
    resolveCitationPage("callnyc", original).map((item) => item.sources.map((source) => source.id)),
    [
      [
        "source-civic-hall-hackathon-post-2016-01",
        "source-nyc-council-councilstat-post-2016-01-30",
        "source-civic-hall-wayback-feed-2016-01-31"
      ],
      ["source-civic-hall-promotional-graphic-2016-01"],
      [
        "source-politico-callnyc-2016-03-14",
        "source-callnyc-archived-site",
        "source-callnyc-github-repository"
      ]
    ]
  );
});

test("components include accessible roles and labels", () => {
  const source = [
    "apps/www/src/components/citations/Cite.tsx",
    "apps/www/src/components/citations/References.tsx"
  ].map((file) => readFileSync(path.join(repoRoot, file), "utf8")).join("\n");
  assert.match(source, /role="doc-noteref"/);
  assert.match(source, /role="doc-endnotes"/);
  assert.match(source, /role="doc-backlink"/);
  assert.match(source, /aria-label=/);
  assert.match(source, /<ol/);
});
