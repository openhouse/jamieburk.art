import assert from "node:assert/strict";
import test from "node:test";
import {
  buildPageNumbers,
  citationAnchorIds,
  loadCitationData,
  validateCitationData
} from "./check-citations.mjs";

test("page numbers follow first appearance", () => {
  const page = {
    pageId: "example",
    citationOrder: [
      { claimId: "CLAIM-A", occurrences: ["a"] },
      { claimId: "CLAIM-B", occurrences: ["b"] }
    ]
  };

  assert.equal(buildPageNumbers(page).get("CLAIM-A"), 1);
  assert.equal(buildPageNumbers(page).get("CLAIM-B"), 2);
});

test("same claim reuses one number on the same page", () => {
  const page = {
    pageId: "example",
    citationOrder: [{ claimId: "CLAIM-A", occurrences: ["a", "a-repeat"] }]
  };

  assert.deepEqual(citationAnchorIds(page, "CLAIM-A", "a"), {
    number: 1,
    noteId: "ref-example-1",
    citationId: "cite-example-1-a"
  });
  assert.deepEqual(citationAnchorIds(page, "CLAIM-A", "a-repeat"), {
    number: 1,
    noteId: "ref-example-1",
    citationId: "cite-example-1-a-repeat"
  });
});

test("numbers reset on a new page", () => {
  const firstPage = {
    pageId: "first",
    citationOrder: [
      { claimId: "CLAIM-A", occurrences: ["a"] },
      { claimId: "CLAIM-B", occurrences: ["b"] }
    ]
  };
  const secondPage = {
    pageId: "second",
    citationOrder: [{ claimId: "CLAIM-B", occurrences: ["b"] }]
  };

  assert.equal(buildPageNumbers(firstPage).get("CLAIM-B"), 2);
  assert.equal(buildPageNumbers(secondPage).get("CLAIM-B"), 1);
});

test("private sources cannot project publicly", () => {
  const result = validateCitationData(
    {
      sources: [
        {
          id: "SRC-PRIVATE",
          type: "participant-archive",
          status: "pending-rights",
          publicCitation: false,
          caveat: "Internal only",
          publicNote: "Internal only"
        }
      ],
      claims: [
        {
          id: "CLAIM-PRIVATE",
          status: "Ready",
          citationRequired: true,
          supports: [{ sourceId: "SRC-PRIVATE" }],
          allowedPages: ["example"],
          guardrail: "Do not publish."
        }
      ],
      pages: [
        {
          pageId: "example",
          includeArchiveLinks: true,
          citationOrder: [{ claimId: "CLAIM-PRIVATE", occurrences: ["x"] }]
        }
      ],
      findings: [],
      raw: {}
    },
    { checkCallNYCPublicCopy: false }
  );

  assert.match(result.failures.join("\n"), /publicCitation=false/);
  assert.match(result.failures.join("\n"), /pending-rights/);
});

test("backlink IDs are deterministic", () => {
  const page = {
    pageId: "work-callnyc",
    citationOrder: [{ claimId: "CALLNYC-EVENT-001", occurrences: ["context-date-time"] }]
  };

  assert.equal(
    citationAnchorIds(page, "CALLNYC-EVENT-001", "context-date-time").citationId,
    "cite-work-callnyc-1-context-date-time"
  );
});

test("CallNYC page order resolves to 1-5", () => {
  const { pages } = loadCitationData();
  const page = pages.find((item) => item.pageId === "work-callnyc");

  assert.ok(page);
  assert.deepEqual([...buildPageNumbers(page).values()], [1, 2, 3, 4, 5]);
});
