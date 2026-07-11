import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  buildPageNumbers,
  citationAnchorIds,
  containsProhibitedWording,
  loadCitationData,
  publicSourceLinks,
  repoRoot,
  unsafePublicValue,
  validateCitationData
} from "./check-citations.mjs";

function fixture(overrides = {}) {
  return {
    sources: [],
    claims: [],
    inquiries: [],
    corrections: [],
    assets: [],
    citationSets: [],
    ...overrides
  };
}

const exampleSet = {
  id: "example-page",
  pagePath: "/work/example",
  entries: [
    { claimId: "claim-a", occurrences: 2 },
    { claimId: "claim-b", occurrences: 1 }
  ]
};

test("page-local numbering begins at 1 and follows first appearance", () => {
  const numbers = buildPageNumbers(exampleSet);
  assert.equal(numbers.get("claim-a"), 1);
  assert.equal(numbers.get("claim-b"), 2);
});

test("a repeated claim reuses its number", () => {
  assert.equal(citationAnchorIds(exampleSet, "claim-a", 1).number, 1);
  assert.equal(citationAnchorIds(exampleSet, "claim-a", 2).number, 1);
});

test("repeated occurrences receive unique deterministic IDs", () => {
  const first = citationAnchorIds(exampleSet, "claim-a", 1);
  const second = citationAnchorIds(exampleSet, "claim-a", 2);
  assert.notEqual(first.citationId, second.citationId);
  assert.equal(first.noteId, second.noteId);
});

test("backlink targets resolve to every occurrence", () => {
  assert.deepEqual(
    [1, 2].map((occurrence) => citationAnchorIds(exampleSet, "claim-a", occurrence).citationId),
    ["cite-ref-example-page-1-1", "cite-ref-example-page-1-2"]
  );
});

test("numbering resets on another page", () => {
  const secondSet = {
    id: "second-page",
    pagePath: "/work/second",
    entries: [{ claimId: "claim-b", occurrences: 1 }]
  };
  assert.equal(buildPageNumbers(secondSet).get("claim-b"), 1);
});

test("one claim can carry several sources in one note", () => {
  const data = loadCitationData();
  const claim = data.claims.find((item) => item.id === "callnyc-independent-follow-on");
  assert.ok(claim);
  assert.equal(claim.evidence.length, 2);
});

test("protected source renders citation text but no URL", () => {
  const source = loadCitationData().sources.find(
    (item) => item.id === "src-callnyc-digital-district-photo"
  );
  assert.ok(source?.fullCitation);
  assert.deepEqual(publicSourceLinks(source), []);
});

test("private source without safe citation text fails public validation", () => {
  const result = validateCitationData(
    fixture({
      sources: [{ id: "private-source", visibility: "private", status: "archived" }],
      claims: [
        {
          id: "public-claim",
          canonicalText: "Public claim",
          evidenceStatus: "archive_supported",
          evidence: [{ sourceId: "private-source", support: "direct" }],
          approvedSurfaces: ["/work/example"],
          publicApproved: true
        }
      ]
    }),
    { checkFiles: false }
  );
  assert.match(result.failures.join("\n"), /lacks safe citation text/);
});

test("negative search must retain its limitation", () => {
  const data = loadCitationData();
  const inquiry = data.inquiries[0];
  assert.match(inquiry.limitation, /does not prove/i);
  const claim = data.claims.find(
    (item) => item.id === "callnyc-no-dedicated-listing-recovered"
  );
  assert.ok(claim?.qualifier);
  assert.ok(claim?.limitations.length);
});

test("superseded claims cannot project", () => {
  const result = validateCitationData(
    fixture({
      claims: [
        {
          id: "old-claim",
          canonicalText: "Old wording",
          evidenceStatus: "unresolved",
          evidence: [],
          approvedSurfaces: ["/work/example"],
          publicApproved: true,
          recordStatus: "superseded"
        }
      ],
      citationSets: [
        {
          id: "example",
          pagePath: "/work/example",
          entries: [{ claimId: "old-claim", occurrences: 1 }]
        }
      ]
    }),
    { checkFiles: false }
  );
  assert.match(result.failures.join("\n"), /superseded/);
});

test("prohibited wording is detected", () => {
  const claim = { prohibitedWording: ["formal hackathon submission"] };
  assert.deepEqual(
    containsProhibitedWording("CallNYC was a formal hackathon submission.", claim),
    ["formal hackathon submission"]
  );
});

test("CallNYC year correction is enforced in public data", () => {
  const work = readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8");
  const callnyc = work.slice(work.indexOf('title: "CallNYC.org"'), work.indexOf('title: "WOWList.org"'));
  assert.match(callnyc, /years:\s*"2016"/);
  assert.doesNotMatch(callnyc, /2014[–-]2015/);
});

test("citation roles and accessible labels are present", () => {
  const cite = readFileSync(
    path.join(repoRoot, "apps/www/src/components/citations/Cite.tsx"),
    "utf8"
  );
  const references = readFileSync(
    path.join(repoRoot, "apps/www/src/components/citations/References.tsx"),
    "utf8"
  );
  assert.match(cite, /role="doc-noteref"/);
  assert.match(cite, /aria-label/);
  assert.match(references, /role="doc-endnotes"/);
  assert.match(references, /role="doc-footnote"/);
});

test("canonical citation data contains no private path", () => {
  assert.equal(unsafePublicValue(JSON.stringify(loadCitationData())), false);
});

test("source links remain in the same tab", () => {
  const sourceLinks = readFileSync(
    path.join(repoRoot, "apps/www/src/components/citations/SourceLinks.tsx"),
    "utf8"
  );
  assert.doesNotMatch(sourceLinks, /target="_blank"/);
});

test("the canonical CallNYC citation bundle validates", () => {
  const result = validateCitationData(loadCitationData(), { root: repoRoot, checkFiles: true });
  assert.deepEqual(result.failures, []);
});
