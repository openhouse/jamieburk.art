import assert from "node:assert/strict";
import test from "node:test";

import { publicPhotoManifest } from "../../apps/www/src/data/photography.ts";
import { allLayoutBPhotoApprovalsOpen } from "./layout-b-projection-eval.mjs";

test("all six Layout B photo approvals remain open", () => {
  assert.equal(allLayoutBPhotoApprovalsOpen(publicPhotoManifest), true);
});

for (const [index, photo] of publicPhotoManifest.entries()) {
  test(`closing ${photo.id} fails the Layout B projection gate`, () => {
    const mutated = publicPhotoManifest.map((item, itemIndex) =>
      itemIndex === index
        ? { ...item, productionApproval: "approved" }
        : item
    );
    assert.equal(allLayoutBPhotoApprovalsOpen(mutated), false);
  });
}

test("the Layout B projection gate requires exactly six photo records", () => {
  assert.equal(allLayoutBPhotoApprovalsOpen(publicPhotoManifest.slice(0, 5)), false);
  assert.equal(
    allLayoutBPhotoApprovalsOpen([...publicPhotoManifest, publicPhotoManifest[0]]),
    false
  );
});
