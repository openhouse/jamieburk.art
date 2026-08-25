import assert from "node:assert/strict";
import test from "node:test";

let productContextModule = null;
try {
  productContextModule = await import("../check-product-context.mjs");
} catch (error) {
  if (error?.code !== "ERR_MODULE_NOT_FOUND") {
    throw error;
  }
}

test("the portfolio product record is current and complete", () => {
  assert.ok(productContextModule, "product context evaluator must exist");
  const result = productContextModule.evaluateProductContext(process.cwd());
  assert.equal(result.passed, true, JSON.stringify(result.failures, null, 2));
});

test("a legacy register without durable product context fails closed", () => {
  assert.ok(productContextModule, "product context evaluator must exist");
  const result = productContextModule.evaluateProductContext(process.cwd(), {
    productText: `# Product

## Register

brand

## Users

Hiring managers.

## Product Purpose

A portfolio.
`
  });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(({ criterion }) => criterion === "impeccable-schema")
  );
  assert(
    result.failures.some(({ criterion }) => criterion === "durable-product-truth")
  );
});
