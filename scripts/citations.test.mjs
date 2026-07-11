import assert from "node:assert/strict";
import test from "node:test";
import {
  buildPageNumbers,
  citationAnchorIds,
  loadCitationData,
  validateCitationData
} from "./check-citations.mjs";

test("page numbers follow first note appearance", () => {
  const page = {
    pageId: "example",
    citationOrder: [
      { noteId: "NOTE-A", occurrences: ["a"] },
      { noteId: "NOTE-B", occurrences: ["b"] }
    ]
  };

  assert.equal(buildPageNumbers(page).get("NOTE-A"), 1);
  assert.equal(buildPageNumbers(page).get("NOTE-B"), 2);
});

test("same note reuses one number on the same page", () => {
  const page = {
    pageId: "example",
    citationOrder: [{ noteId: "NOTE-A", occurrences: ["a", "a-repeat"] }]
  };

  assert.deepEqual(citationAnchorIds(page, "NOTE-A", "a"), {
    number: 1,
    noteId: "ref-example-1",
    citationId: "cite-example-1-a"
  });
  assert.deepEqual(citationAnchorIds(page, "NOTE-A", "a-repeat"), {
    number: 1,
    noteId: "ref-example-1",
    citationId: "cite-example-1-a-repeat"
  });
});

test("numbers reset on a new page", () => {
  const firstPage = {
    pageId: "first",
    citationOrder: [
      { noteId: "NOTE-A", occurrences: ["a"] },
      { noteId: "NOTE-B", occurrences: ["b"] }
    ]
  };
  const secondPage = {
    pageId: "second",
    citationOrder: [{ noteId: "NOTE-B", occurrences: ["b"] }]
  };

  assert.equal(buildPageNumbers(firstPage).get("NOTE-B"), 2);
  assert.equal(buildPageNumbers(secondPage).get("NOTE-B"), 1);
});

test("backlink IDs are deterministic for multiple occurrences", () => {
  const page = {
    pageId: "work-callnyc",
    citationOrder: [{ noteId: "NOTE-CALLNYC-EVENT-DATE", occurrences: ["context-date-time"] }]
  };

  assert.equal(
    citationAnchorIds(page, "NOTE-CALLNYC-EVENT-DATE", "context-date-time").citationId,
    "cite-work-callnyc-1-context-date-time"
  );
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
      notes: [
        {
          id: "NOTE-PRIVATE",
          claimId: "CLAIM-PRIVATE",
          sourceIds: ["SRC-PRIVATE"],
          includeOriginalLinks: false,
          includeArchiveLinks: false
        }
      ],
      pages: [
        {
          pageId: "example",
          citationOrder: [{ noteId: "NOTE-PRIVATE", occurrences: ["x"] }]
        }
      ],
      findings: [],
      media: [],
      corrections: [],
      raw: {}
    },
    { checkPublicCopy: false }
  );

  assert.match(result.failures.join("\n"), /publicCitation=false/);
  assert.match(result.failures.join("\n"), /pending-rights/);
});

test("pending-rights media cannot project publicly", () => {
  const result = validateCitationData(
    {
      sources: [],
      claims: [],
      notes: [],
      pages: [],
      findings: [],
      media: [
        {
          id: "MEDIA-PENDING",
          rightsStatus: "pending",
          consentStatus: "pending",
          publicCitation: true,
          relatedClaimIds: []
        }
      ],
      corrections: [],
      raw: {}
    },
    { checkPublicCopy: false }
  );

  assert.match(result.failures.join("\n"), /publicly projected without approved/);
  assert.match(result.failures.join("\n"), /consent is pending/);
});

test("not-recovered findings cannot be used as positive support", () => {
  const result = validateCitationData(
    {
      sources: [],
      claims: [
        {
          id: "CLAIM-BAD",
          status: "Ready",
          citationRequired: true,
          supports: [{ sourceId: "FINDING-NOT-RECOVERED" }],
          allowedPages: [],
          guardrail: "Do not do this."
        }
      ],
      notes: [],
      pages: [],
      findings: [
        {
          id: "FINDING-NOT-RECOVERED",
          status: "not-recovered",
          conclusion: "No record was recovered."
        }
      ],
      media: [],
      corrections: [],
      raw: {}
    },
    { checkPublicCopy: false }
  );

  assert.match(result.failures.join("\n"), /research finding as positive evidence/);
});

test("source origin and archive carrier must remain distinct", () => {
  const result = validateCitationData(
    {
      sources: [
        {
          id: "SRC-SAME",
          status: "archived",
          publicCitation: true,
          originalUrl: "https://example.com/item",
          archiveUrl: "https://example.com/item",
          caveat: "Same URL should fail.",
          publicNote: "Same URL should fail."
        }
      ],
      claims: [],
      notes: [],
      pages: [],
      findings: [],
      media: [],
      corrections: [],
      raw: {}
    },
    { checkPublicCopy: false }
  );

  assert.match(result.failures.join("\n"), /identical originalUrl and archiveUrl/);
});

test("CallNYC page order resolves to 1-5", () => {
  const { pages } = loadCitationData();
  const page = pages.find((item) => item.pageId === "work-callnyc");

  assert.ok(page);
  assert.deepEqual([...buildPageNumbers(page).values()], [1, 2, 3, 4, 5]);
});

test("Technical Operations citation numbering starts at 1", () => {
  const { pages } = loadCitationData();
  const page = pages.find((item) => item.pageId === "technical-operations");

  assert.ok(page);
  assert.deepEqual([...buildPageNumbers(page).values()], [1]);
});

test("correction records point to valid claims", () => {
  const data = loadCitationData();
  const result = validateCitationData(data, { checkPublicCopy: false });

  assert.doesNotMatch(result.failures.join("\n"), /CORRECTION-.*references nonexistent claim/);
});
