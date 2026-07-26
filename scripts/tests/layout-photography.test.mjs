import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

test("layout photography evaluator reaches its blocking threshold", () => {
  const result = spawnSync(process.execPath, ["scripts/check-layout-photography.mjs"], {
    cwd: root,
    encoding: "utf8"
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Layout photography eval: 10\/10 passing\./);
});

test("all selected archive images are referenced by the typed manifest", () => {
  const directory = path.join(root, "apps/www/public/images/photo-fieldwork");
  const imageNames = fs.readdirSync(directory).filter((name) => name.endsWith(".jpg")).sort();
  const manifest = read("apps/www/src/data/photography.ts");

  assert.equal(imageNames.length, 8);
  for (const imageName of imageNames) {
    assert.match(manifest, new RegExp(`/images/photo-fieldwork/${imageName.replaceAll(".", "\\.")}`));
  }
});

test("public layout source does not expose private archive coordinates", () => {
  const sourcePaths = [
    "apps/www/src/data/photography.ts",
    "apps/www/src/app/page.tsx",
    "apps/www/src/app/about/page.tsx",
    "apps/www/src/components/CaseStudyLayout.tsx",
    "docs/design/layout-E-photo-integration.md"
  ];
  const text = sourcePaths.map(read).join("\n");

  assert.doesNotMatch(text, /\/Volumes\/|\/Users\/|IMG_1923/);
  assert.doesNotMatch(text, /[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}/i);
});
