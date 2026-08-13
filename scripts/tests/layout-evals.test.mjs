import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { evaluateLayout } from "../check-layout-evals.mjs";

test("current photographic layout passes every hard gate", () => {
  const result = evaluateLayout();
  assert.equal(result.passed, true, JSON.stringify(result.failures, null, 2));
});

test("a private archive identifier fails closed", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = `// 12345678-1234-1234-1234-123456789ABC\n${readFileSync(path, "utf8")}`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "metadata-and-locator-safety"));
});

test("a missing caption fails the manifest contract", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'caption:\n      "A collaborative planning field: needs, offers, questions, and possible actions made visible together.",',
    ""
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "manifest-bound-publication"));
});

test("a decorative gradient fails the material-system contract", () => {
  const path = "apps/www/src/app/globals.css";
  const source = `${readFileSync(path, "utf8")}\n.test { background: linear-gradient(red, blue); }\n`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "public-service-folio-material-system"));
});

test("a production authorization regression fails closed", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'production: "approved",',
    'production: "open",'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "manifest-bound-publication"));
});

test("a FORM seed mismatch fails the persisted direction contract", () => {
  const path = "apps/www/src/app/layout.tsx";
  const source = readFileSync(path, "utf8").replace('seed: "603b707c"', 'seed: "drifted"');
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "direction-contract-persisted"));
});
