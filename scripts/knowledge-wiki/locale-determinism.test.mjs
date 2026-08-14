import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

import { defaultRepoRoot } from "./lib.mjs";

const probe = `
  import { createHash } from "node:crypto";
  import { buildGeneratedOutputs, compileWiki } from "./scripts/knowledge-wiki/lib.mjs";

  const outputs = buildGeneratedOutputs(compileWiki());
  const digest = createHash("sha256")
    .update(JSON.stringify(Object.entries(outputs)))
    .digest("hex");
  process.stdout.write(digest);
`;

function generatedDigest(locale) {
  return execFileSync(process.execPath, ["--input-type=module", "--eval", probe], {
    cwd: defaultRepoRoot,
    encoding: "utf8",
    env: { ...process.env, LANG: locale, LC_ALL: locale }
  });
}

test("generated outputs are invariant across process locales", () => {
  assert.equal(generatedDigest("C"), generatedDigest("en_US.UTF-8"));
});
