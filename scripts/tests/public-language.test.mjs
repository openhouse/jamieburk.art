import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  defaultConfigPath,
  evaluatePublicLanguage,
  evaluatePublicText,
  repositoryRoot
} from "../check-public-language.mjs";
import {
  evaluateRenderedMarkup,
  evaluateRenderedPublicLanguage,
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

  // Historical receipts describe their own candidates, not today's census.
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

test("publication process notes are rejected even when prose wraps across source lines", () => {
  const findings = evaluatePublicText({
    config,
    relativePath: "apps/www/src/app/resume/page.tsx",
    text: "Current public resume PDF. Phone remains inside the approved resume\nartifact; email is available on the contact page."
  });
  assert.deepEqual(findings.map((finding) => finding.patternId), [
    "publication-status-resume-label",
    "resume-publication-artifact"
  ]);
});

test("publication instructions are not allowed as visitor-facing project descriptions", () => {
  const findings = evaluatePublicText({
    config,
    relativePath: "apps/www/src/data/work.ts",
    text: 'description: "TODO: Jamie approval required. Use only public-safe claims and approved screenshots."'
  });
  assert.deepEqual(findings.map((finding) => finding.patternId), [
    "publication-approval-placeholder",
    "publisher-only-claims-instruction"
  ]);
});

test("rendered phrase checks survive inline markup, comments, entities, and line wrapping", () => {
  const findings = evaluateRenderedMarkup({
    config,
    relativePath: "resume.html",
    html: '<p>Current public r&#233;sum&#233; PDF.</p><p>Phone remains inside the <strong>approved</strong>&nbsp;resume\n<!-- break -->artifact.</p>'
  });
  assert.deepEqual(findings.map((finding) => finding.patternId), [
    "publication-status-resume-label",
    "resume-publication-artifact"
  ]);
});

test("rendered configured patterns are applied to metadata and accessible labels", () => {
  const findings = evaluateRenderedMarkup({
    config,
    relativePath: "example.html",
    html: '<meta name="description" content="Current public resume PDF"><button aria-label="Approved resume artifact">Download</button><img alt="1,846 users" src="/example.jpg">'
  });
  assert.deepEqual(findings.map((finding) => finding.patternId), [
    "publication-status-resume-label",
    "resume-publication-artifact",
    "wowlist-raw-user-count"
  ]);
});

test("legitimate source limits, privacy, contact copy, and project workflows remain allowed", () => {
  const html = '<main><p>Download resume PDF. Contact Jamie for details.</p><p>Private participant records remain private. This prototype is not a current City service.</p><p>Start from approved material. I help teams maintain decision trails and publication workflows.</p><p>Public sources document collective work. View the project artifact.</p></main>';
  assert.deepEqual(evaluateRenderedMarkup({ config, html, relativePath: "work.html" }), []);
});

test("non-reader markup and separate elements cannot invent a prohibited phrase", () => {
  const html = '<p class="bounded">Approved</p><p>resume artifact</p><a href="/bounded">Download</a><script>"Current public resume PDF"</script><style>.hinge { display: block }</style><!-- TODO: Jamie approval required -->';
  assert.deepEqual(evaluateRenderedMarkup({ config, html, relativePath: "work.html" }), []);
});

test("known publisher-only work fields stay internal without exempting neighboring prose", () => {
  const text = 'const item = { publicSafety: { note: "Use only public-safe claims." }, description: "Use only public-safe claims." };';
  const findings = evaluatePublicText({ config, text, relativePath: "apps/www/src/data/work.ts" });
  assert.equal(findings.length, 1);
  assert.equal(findings[0].patternId, "publisher-only-claims-instruction");
  // The field's internal status does not follow it onto an HTML page.
  assert.equal(evaluateRenderedMarkup({ config, html: '<p>Use only public-safe claims.</p>', relativePath: "work/example.html" }).length, 1);
});

test("all known internal work-note forms are blocked if a component renders them", () => {
  for (const html of [
    '<p>Use only public-safe claims and approved screenshots.</p>',
    '<p>Collective-work language is required: contributed to and supported.</p>',
    '<p>This page must make the archived and unofficial status visible wherever the project is summarized.</p>',
    '<p>Keep public organizer credit with the campaign\'s named organizers.</p>'
  ]) {
    assert.equal(evaluateRenderedMarkup({ config, html, relativePath: "work/example.html" }).length, 1, html);
  }
});

test("a known workflow-state exemption cannot conceal prose later on the same line", () => {
  const findings = evaluatePublicText({
    config,
    relativePath: "apps/www/src/data/photography.ts",
    text: 'knowledgeStatus: "bound", caption: "Current public resume PDF"'
  });
  assert.equal(findings.length, 1);
  assert.equal(findings[0].patternId, "publication-status-resume-label");
});

test("new top-level data surfaces enter source scanning automatically", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "public-language-data-"));
  try {
    for (const surface of config.surfaces) {
      const target = path.join(root, surface.root);
      await mkdir(path.extname(target) ? path.dirname(target) : target, { recursive: true });
      if (path.extname(target)) await writeFile(target, "");
    }
    await writeFile(path.join(root, "apps/www/src/data/future-card.ts"), 'export const card = { description: "Current public resume PDF" };');
    const result = await evaluatePublicLanguage({ root, configPath: defaultConfigPath });
    assert.deepEqual(result.findings.map(({ path: file, patternId }) => ({ file, patternId })), [{
      file: "apps/www/src/data/future-card.ts", patternId: "publication-status-resume-label"
    }]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("an empty rendered build fails closed instead of reporting a clean corpus", async () => {
  const buildRoot = await mkdtemp(path.join(os.tmpdir(), "public-language-build-"));
  try {
    await assert.rejects(evaluateRenderedPublicLanguage({ buildRoot }), /No built HTML pages/);
  } finally {
    await rm(buildRoot, { recursive: true, force: true });
  }
});

test("rendered scan finds newly added nested routes without a page allowlist", async () => {
  const buildRoot = await mkdtemp(path.join(os.tmpdir(), "public-language-route-"));
  try {
    await mkdir(path.join(buildRoot, "work", "future"), { recursive: true });
    await writeFile(path.join(buildRoot, "work/future/new.html"), '<p>Current public resume PDF.</p>');
    const result = await evaluateRenderedPublicLanguage({ buildRoot });
    assert.equal(result.renderedPages, 1);
    assert.equal(result.findings.length, 1);
    assert.equal(result.findings[0].path, "work/future/new.html");
  } finally {
    await rm(buildRoot, { recursive: true, force: true });
  }
});

test("quoted angle brackets in attributes do not swallow following visitor prose", () => {
  const html = '<p data-comment="a > b" title="A source > a summary">Phone remains inside the <a href="/resume" title="PDF > HTML">approved</a>&#x20;resume&ensp;artifact.</p>';
  const findings = evaluateRenderedMarkup({ config, html, relativePath: "resume.html" });
  assert.deepEqual(findings.map((finding) => finding.patternId), ["resume-publication-artifact"]);
  assert.equal(findings[0].excerpt, "Phone remains inside the approved resume artifact.");
});

test("angle brackets in non-reader attributes do not turn attribute values into prose", () => {
  const html = '<p title="Download" data-comment="a > Current public resume PDF">Contact Jamie</p>';
  assert.deepEqual(evaluateRenderedMarkup({ config, html, relativePath: "resume.html" }), []);
});

test("a visual line break cannot bypass phrase checks within the same paragraph", () => {
  for (const html of [
    "<p>Current public<br/>resume PDF.</p>",
    "<p>Use only public-safe<br>claims.</p>"
  ]) {
    assert.equal(evaluateRenderedMarkup({ config, html, relativePath: "resume.html" }).length, 1, html);
  }
});

test("input button values are visitor copy but user-input and hidden values are not", () => {
  const html = '<input type="submit" value="Current public resume PDF"><input type="button" value="Approved resume artifact"><input type="reset" value="Use only public-safe claims"><input type="hidden" value="Current public resume PDF"><input type="text" value="Current public resume PDF"><input value="Current public resume PDF">';
  const findings = evaluateRenderedMarkup({ config, html, relativePath: "contact.html" });
  assert.deepEqual(findings.map((finding) => finding.patternId), [
    "publication-status-resume-label", "resume-publication-artifact", "publisher-only-claims-instruction"
  ]);
  assert.ok(findings.every((finding) => finding.surface === "attribute:value"));
});
