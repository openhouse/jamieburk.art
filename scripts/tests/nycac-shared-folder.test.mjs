import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateNycacSharedFolder,
  nycacSharedFolderFixture
} from "../lib/nycac-shared-folder-eval.mjs";

const mutations = [
  ["NYCAC-001-population-accounting", { dispositionedTotal: 2364 }],
  ["NYCAC-002-file-folder-closure", { fileTotal: 2106 }],
  ["NYCAC-003-type-closure", { typeTotal: 2364 }],
  ["NYCAC-004-disposition-closure", { dispositionSum: 2366 }],
  ["NYCAC-005-method-boundary", { interpretationScope: "complete-interpretation" }],
  ["NYCAC-006-authorship-boundary", { authorshipScope: "all-items" }],
  ["NYCAC-007-traversal-quality", { traversalErrorTotal: 1 }],
  ["NYCAC-008-rights-boundary", { rightsClearedTotal: 1 }],
  ["NYCAC-009-private-locator-redaction", { privateLocatorExposed: true }],
  ["NYCAC-010-no-public-archive-route", { publicRouteExposed: true }],
  ["NYCAC-011-held-metric-containment", { heldMetricProjected: true }],
  ["NYCAC-012-purpose-built-projection", { portfolioGuardrailPresent: false }]
];

test("the governed NYC Artist Coalition archive fixture passes every criterion", () => {
  assert.ok(
    evaluateNycacSharedFolder(nycacSharedFolderFixture()).every(
      (result) => result.pass
    )
  );
});

for (const [id, mutation] of mutations) {
  test(`${id} rejects its unsafe mutation`, () => {
    const candidate = { ...nycacSharedFolderFixture(), ...mutation };
    const result = evaluateNycacSharedFolder(candidate).find(
      (item) => item.id === id
    );
    assert.equal(result?.pass, false);
  });
}
