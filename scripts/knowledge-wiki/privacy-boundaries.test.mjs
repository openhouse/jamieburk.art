import assert from "node:assert/strict";
import { test } from "node:test";

import { defaultRepoRoot } from "./lib.mjs";
import {
  disclosesProtectedIdentity,
  findDisclosedProtectedIdentityDirectives
} from "./privacy-boundaries.mjs";

test("public Wiki privacy directives do not disclose the protected identity", () => {
  assert.deepEqual(findDisclosedProtectedIdentityDirectives(defaultRepoRoot), []);
});

test("a privacy directive containing a proper name fails closed", () => {
  assert.equal(disclosesProtectedIdentity("Do not name Example Person."), true);
});

test("a generic protected-collaborator boundary remains allowed", () => {
  assert.equal(disclosesProtectedIdentity("Do not identify the protected collaborator."), false);
});
