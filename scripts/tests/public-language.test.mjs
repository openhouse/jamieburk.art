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
  assert.equal(run.result.renderedPages, 15);
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

const editorialLeaks = [
  ["resume approval note", "Phone remains inside the approved resume artifact; email is available on the contact page."],
  ["editor command", "Use only public-safe claims and approved screenshots."],
  ["credit instruction", "Collective-work language is required: contributed to and supported."],
  ["status instruction", "This page must make the archived and unofficial status visible."],
  ["attribution instruction", "Keep public organizer credit with the campaign's named organizers."],
  ["placeholder approval", "TODO: Jamie approval required."],
  ["global footer", "Public-safe portfolio, civic notebook, and future living archive."],
  ["publication backlog", "Additional screenshots and archive links require separate review before publication."],
  ["consent backlog", "Additional named participants, photographs, and artifacts require consent and approval."],
  ["approval backlog", "Additional collaborators, meeting materials, internal artifacts, and screenshots require specific approval."]
];

for (const [label, text] of editorialLeaks) {
  test(`rendered visitor-copy gate rejects ${label} on any route`, () => {
    const findings = evaluateRenderedMarkup({ config, relativePath: "new-route.html", html: `<p>${text}</p>` });
    assert.ok(findings.some((finding) => finding.patternId?.startsWith("editorial-")), label);
  });
}

test("rendered phrase checks survive inline markup, comments, whitespace and entities", () => {
  for (const html of [
    "<p>approved <strong>resume</strong> artifact</p>",
    "<p>approved<!-- split --> resume\n artifact</p>",
    "<p>approved&nbsp;resume&#32;artifact</p>",
    "<p>appr&#111;ved resume artifact</p>",
    '<meta name="description" content="approved resume artifact">',
    "<img alt='approved resume artifact' src='/example.jpg'>",
    '<a aria-label="approved resume artifact">Download</a>',
    '<dl><dt>approved</dt><dd>resume artifact</dd></dl>',
    '<a aria-description="Use only public-safe claims">Details</a>',
    '<p>Use only public&#8209;safe claims.</p>'
  ]) {
    assert.ok(evaluateRenderedMarkup({ config, relativePath: "example.html", html }).length > 0, html);
  }
});

test("editorial-copy checks leave legitimate work, credits and visitor limits alone", () => {
  const html = `<main><p>The Board recommended approval of the funding request.</p>
    <p>Jamie created approval workflows. View project artifacts.</p>
    <p>Private participant records remain private. CallNYC is archived and unofficial.</p>
    <p>This reconstruction is not an original company document.</p>
    <p>The lab explores human review and source custody.</p></main>`;
  assert.deepEqual(evaluateRenderedMarkup({ config, relativePath: "example.html", html }), []);
});

test("non-reader markup cannot create an editorial-copy false positive", () => {
  const html = `<p data-internal="approved resume artifact">Download resume PDF</p>
    <!-- Use only public-safe claims -->
    <script>const note = "approved resume artifact";</script>
    <style>.test::before { content: "approved resume artifact"; }</style>`;
  assert.deepEqual(evaluateRenderedMarkup({ config, relativePath: "example.html", html }), []);
});

test("rendered gate enforces configured phrase rules as well as standalone terms", () => {
  const findings = evaluateRenderedMarkup({
    config, relativePath: "example.html", html: "<p>Reached 1,846 <em>users</em>.</p>"
  });
  assert.equal(findings[0]?.patternId, "wowlist-raw-user-count");
});
