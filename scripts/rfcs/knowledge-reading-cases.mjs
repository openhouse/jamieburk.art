import { readFileSync } from "node:fs";
export const corpus = JSON.parse(readFileSync(new URL("../../evals/knowledge-reading/cases.json", import.meta.url), "utf8"));
export function materialize(testCase) {
  const packet = structuredClone(corpus.base);
  for (const change of testCase.changes) {
    const parent = change.path.slice(0, -1).reduce((value, key) => value[key], packet);
    parent[change.path.at(-1)] = structuredClone(change.value);
  }
  return packet;
}
