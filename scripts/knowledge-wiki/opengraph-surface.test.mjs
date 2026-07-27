import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const source = readFileSync(
  path.join(repoRoot, "apps/www/src/app/opengraph-image.tsx"),
  "utf8"
);

test("the social-sharing image carries the current professional argument", () => {
  assert.match(
    source,
    /I create operating structure for complex public-facing teams\./
  );
  assert.doesNotMatch(source, /I turn ambiguous work into usable systems\./);
  assert.match(source, /background: "#ffffff"/);
  assert.match(source, /color: "#1a232b"/);
  assert.match(source, /background: "#c83b32"/);
  assert.match(source, /color: "#245b3e"/);
});
