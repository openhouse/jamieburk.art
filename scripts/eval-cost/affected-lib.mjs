const fastSafetyChecks = [
  "check:citations",
  "test:citations",
  "check:rfcs",
  "knowledge-bank",
  "public-safety"
];

const wikiChecks = [
  "wiki:graph",
  "wiki:check",
  "wiki:employment:check",
  "wiki:test",
  "wiki:eval"
];

const photoChecks = ["photos:check", "photos:test"];

const siteChecks = [
  "lint",
  "typecheck",
  "build",
  "check:routes",
  "evals:layout-B",
  "test:layout-B",
  "test:accessibility-contrast",
  "test:accessibility-evidence"
];

const fullGatePatterns = [
  /^package(?:-lock)?\.json$/,
  /^Dockerfile$/,
  /^next\.config\./,
  /^apps\/www\/next\.config\./,
  /^apps\/www\/package\.json$/,
  /^\.github\/workflows\//,
  /^scripts\/check-public-safety\.mjs$/,
  /^scripts\/check-routes\.mjs$/
];

const wikiPatterns = [
  /^docs\/knowledge-bank\//,
  /^scripts\/knowledge-wiki\//,
  /^scripts\/archive\//,
  /^evals\/knowledge-wiki\//,
  /^docs\/architecture\/ADR-knowledge-wiki/,
  /^docs\/qa\/cost-aware-evaluation-ladder\.md$/
];

const photoPatterns = [
  /^scripts\/photo-knowledge\//,
  /^evals\/photo-knowledge\//,
  /^docs\/knowledge-bank\/(?:assets|data\/photo-editions|indexes\/photography|methods\/photographic)/,
  /^apps\/www\/src\/data\/photography\.ts$/,
  /^apps\/www\/public\/images\/field-notes\//
];

const sitePatterns = [
  /^apps\/www\/src\//,
  /^apps\/www\/public\//,
  /^evals\/layout\//,
  /^scripts\/check-layout-B\.mjs$/,
  /^scripts\/tests\/(?:layout-B|accessibility-)/
];

const inertPatterns = [
  /^README\.md$/,
  /^AGENTS\.md$/,
  /^docs\/(?:design|qa)\//,
  /^rfcs\//,
  /^\.agents\//
];

function matchesAny(path, patterns) {
  return patterns.some((pattern) => pattern.test(path));
}

export function planAffectedChecks(inputPaths) {
  const paths = [...new Set(inputPaths.filter(Boolean))].sort();
  if (paths.length === 0) {
    return {
      mode: "none",
      paths,
      domains: [],
      commands: [],
      reasons: ["No changed paths were detected."]
    };
  }

  if (paths.some((path) => matchesAny(path, fullGatePatterns))) {
    return {
      mode: "full",
      paths,
      domains: ["release"],
      commands: ["check"],
      reasons: [
        "A dependency, deployment, workflow, route-gate, or public-safety-gate file changed."
      ]
    };
  }

  const domains = new Set();
  const unknown = [];
  for (const changedPath of paths) {
    let matched = false;
    if (matchesAny(changedPath, wikiPatterns)) {
      domains.add("knowledge-wiki");
      matched = true;
    }
    if (matchesAny(changedPath, photoPatterns)) {
      domains.add("photo-knowledge");
      domains.add("knowledge-wiki");
      matched = true;
    }
    if (matchesAny(changedPath, sitePatterns)) {
      domains.add("public-site");
      matched = true;
    }
    if (matchesAny(changedPath, inertPatterns)) matched = true;
    if (!matched) unknown.push(changedPath);
  }

  if (unknown.length) {
    return {
      mode: "full",
      paths,
      domains: ["release"],
      commands: ["check"],
      reasons: [
        `Conservative fallback for unclassified paths: ${unknown.join(", ")}`
      ]
    };
  }

  const commands = [...fastSafetyChecks];
  if (domains.has("knowledge-wiki")) commands.push(...wikiChecks);
  if (domains.has("photo-knowledge")) commands.push(...photoChecks);
  if (domains.has("public-site")) commands.push(...siteChecks);

  return {
    mode: "affected",
    paths,
    domains: [...domains].sort(),
    commands: [...new Set(commands)],
    reasons: [
      "Run deterministic safety checks plus the suites mapped to changed domains.",
      "The full release gate remains required once for the unchanged release candidate."
    ]
  };
}
