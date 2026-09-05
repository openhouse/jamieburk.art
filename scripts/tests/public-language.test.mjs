import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  defaultConfigPath,
  evaluatePublicLanguage,
  evaluatePublicText,
  repositoryRoot
} from "../check-public-language.mjs";
import {
  evaluateRenderedMarkup,
  inspectablePublicMarkup
} from "../check-rendered-public-language.mjs";

const config = (await evaluatePublicLanguage()).config;

test("the maintained public corpus contains no prohibited standalone terms", async () => {
  const result = await evaluatePublicLanguage({
    configPath: defaultConfigPath,
    root: repositoryRoot
  });
  assert.equal(result.findings.length, 0);
  assert.ok(result.scannedFiles > 0);

  const run = JSON.parse(
    await readFile(new URL("../../evals/public-language/runs/2026-08-20-public-surface-terminology-hillclimb.json", import.meta.url), "utf8")
  );
  assert.equal(run.result.scannedFiles, result.scannedFiles);
  assert.equal(run.result.prohibitedOccurrences, result.findings.length);
  assert.equal(run.result.renderedPages, 16);
  assert.equal(run.result.deterministicTestsPassing, 7);
  assert.equal(run.decision, "keep-change");
});

test("the evaluator fails closed when prohibited wording enters public prose", () => {
  const findings = evaluatePublicText({
    config,
    relativePath: "apps/www/src/app/example/page.tsx",
    text: 'export default function Example() { return <p>A bounded offer has a lower bound.</p>; }'
  });

  assert.deepEqual(
    findings.map((finding) => finding.term.toLowerCase()),
    ["bounded", "bound"]
  );
});

test("the evaluator rejects hinge metaphors and their common forms", () => {
  const findings = evaluatePublicText({
    config,
    relativePath: "resumes/2026-08-20/example/Jamie-Burkart-Cover-Letter-Example.md",
    text: "The hinge hinged the plan; two hinges are now hinging."
  });

  assert.deepEqual(
    findings.map((finding) => finding.term.toLowerCase()),
    ["hinge", "hinged", "hinges", "hinging"]
  );
});

test("the evaluator keeps WOW List raw scale counts and defensive clauses off public surfaces", () => {
  const findings = evaluatePublicText({
    config: {
      ...config,
      forbiddenPatterns: [
        {
          id: "wowlist-raw-user-count",
          pattern: "1,846\\s+users"
        },
        {
          id: "wowlist-raw-post-count",
          pattern: "16,142\\s+posts(?:/events)?"
        },
        {
          id: "wowlist-defensive-activity-clause",
          pattern: "distinguish\\s+these\\s+activity\\s+counts"
        },
        {
          id: "wowlist-database-key-language",
          pattern: "city-region\\s+keys"
        }
      ]
    },
    relativePath: "resumes/2026-08-20/example/Jamie-Burkart-Resume-Example.md",
    text: "Reached 1,846 users and 16,142 posts/events across 35 city-region keys; distinguish these activity counts from impact."
  });

  assert.deepEqual(
    findings.map((finding) => finding.term),
    [
      "1,846 users",
      "16,142 posts/events",
      "city-region keys",
      "distinguish these activity counts"
    ]
  );
});

test("the evaluator distinguishes internal state and longer unrelated words", () => {
  const internal = evaluatePublicText({
    config,
    relativePath: "apps/www/src/data/photography.ts",
    text: 'knowledgeStatus: "bound";\nconst outbound = true;\nconst boundary = "clear";'
  });

  assert.deepEqual(internal, []);
});

test("the evaluator can inspect public projection files for forbidden patterns without policing internal governance terms", () => {
  const projectionConfig = {
    ...config,
    standaloneTermExemptPaths: [
      "apps/www/src/data/knowledge-bank/public-registry.json"
    ],
    forbiddenPatterns: [
      {
        id: "wowlist-raw-user-count",
        pattern: "1,846\\s+users"
      }
    ]
  };
  const findings = evaluatePublicText({
    config: projectionConfig,
    relativePath: "apps/www/src/data/knowledge-bank/public-registry.json",
    text: '"guardrail": "bounded evidence",\n"text": "1,846 users"'
  });

  assert.deepEqual(
    findings.map((finding) => finding.term),
    ["1,846 users"]
  );
});

test("the rendered gate checks visible copy and metadata but ignores application scripts", () => {
  const rendered = evaluateRenderedMarkup({
    config,
    relativePath: "example.html",
    html: '<html><head><meta name="description" content="A bounded method"></head><body><p>One lower bound.</p><script>const internal = "bounded";</script></body></html>'
  });
  assert.deepEqual(
    rendered.map((finding) => finding.term.toLowerCase()),
    ["bounded", "bound"]
  );
  assert.doesNotMatch(inspectablePublicMarkup("<script>bounded</script>"), /bounded/);
});
