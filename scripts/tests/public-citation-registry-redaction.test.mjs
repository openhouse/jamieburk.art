import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const registry = JSON.parse(
  readFileSync(
    new URL(
      "../../apps/www/src/data/knowledge-bank/public-registry.json",
      import.meta.url
    ),
    "utf8"
  )
);

test("the generated citation registry excludes non-public source records and references", () => {
  const nonPublicSources = registry.sources.filter(
    (source) => source.visibility !== "public"
  );
  assert.deepEqual(
    nonPublicSources,
    [],
    "private, protected, and metadata-only sources must not enter the public registry"
  );

  const publicSourceIds = new Set(registry.sources.map((source) => source.id));

  for (const page of registry.pages) {
    for (const sourceId of page.sourceOrder) {
      assert.equal(
        publicSourceIds.has(sourceId),
        true,
        `${page.id} sourceOrder exposes non-public source ${sourceId}`
      );
    }

    for (const occurrence of page.occurrences) {
      for (const sourceId of occurrence.sourceIds ?? []) {
        assert.equal(
          publicSourceIds.has(sourceId),
          true,
          `${page.id}/${occurrence.id} exposes non-public source ${sourceId}`
        );
      }
    }
  }
});
