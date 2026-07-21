import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync
} from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  loadKnowledgeWiki,
  repoRoot,
  roleCoverageStatuses
} from "./knowledge-wiki.mjs";

export { repoRoot };

export const readerRoot = path.join(repoRoot, "docs/qa/hiring-acceptance/readers");
export const suitePath = path.join(repoRoot, "evals/hiring-acceptance/suite.json");
export const mutationPath = path.join(repoRoot, "evals/hiring-acceptance/fixtures/mutations.json");

export const publicRouteFiles = {
  "/": ["apps/www/src/components/Hero.tsx", "apps/www/src/app/page.tsx"],
  "/work": ["apps/www/src/app/work/page.tsx", "apps/www/src/data/work.ts"],
  "/work/technical-operations": ["apps/www/src/app/work/technical-operations/page.tsx"],
  "/work/callnyc": ["apps/www/src/content/work/callnyc.mdx"],
  "/work/harry-j-epstein": ["apps/www/src/content/work/harry-j-epstein.mdx"],
  "/work/fair-rent-nyc": ["apps/www/src/content/work/fair-rent-nyc.mdx"],
  "/work/196-sunday-dinner": ["apps/www/src/content/work/196-sunday-dinner.mdx"],
  "/work/kc-town-hall": ["apps/www/src/content/work/kc-town-hall.mdx"],
  "/work/wowlist": ["apps/www/src/content/work/wowlist.mdx"],
  "/lab/source-backed-team-memory": ["apps/www/src/content/lab/source-backed-team-memory.mdx"],
  "/resume": ["apps/www/src/app/resume/page.tsx", "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"],
  "/about": ["apps/www/src/app/about/page.tsx"],
  "/contact": ["apps/www/src/app/contact/page.tsx"]
};

const forbiddenPublicKeys = [
  "wikiEvidence",
  "gapType",
  "nextAction",
  "protectedLocator",
  "privateArtifactId"
];
const privatePatterns = [
  /\/(?:Users|Volumes|private|tmp)\//i,
  /file:\/\//i,
  /(?:x-amz-signature|x-goog-signature)=/i
];
const disclaimerPattern = /not actual participation, endorsement, opinion, or hiring decision|not an actual .* hiring decision/i;
const stopwords = new Set(["a", "an", "and", "as", "at", "be", "build", "for", "from", "in", "into", "of", "or", "the", "to", "with"]);

function listFiles(directory, suffix = "") {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(target, suffix) : entry.isFile() && entry.name.endsWith(suffix) ? [target] : [];
    })
    .sort();
}

function normalizedArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function hashParts(parts) {
  const hash = createHash("sha256");
  for (const part of parts) hash.update(part).update("\0");
  return `sha256:${hash.digest("hex")}`;
}

export function fingerprintPaths(paths) {
  const parts = [];
  for (const relative of [...paths].sort()) {
    const absolute = path.join(repoRoot, relative);
    if (!existsSync(absolute)) continue;
    if (statSync(absolute).isDirectory()) {
      for (const file of listFiles(absolute)) {
        parts.push(path.relative(repoRoot, file));
        parts.push(readFileSync(file));
      }
    } else {
      parts.push(relative);
      parts.push(readFileSync(absolute));
    }
  }
  return hashParts(parts);
}

export function candidateCommit(paths) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%H", "--", ...paths], {
      cwd: repoRoot,
      encoding: "utf8"
    }).trim();
  } catch {
    return "unknown";
  }
}

export function loadReaders() {
  return listFiles(readerRoot, ".md").map((file) => {
    const parsed = matter(readFileSync(file, "utf8"));
    const data = parsed.data;
    return {
      id: data.id,
      displayName: data.display_name,
      mode: data.mode,
      category: data.category,
      publicSources: normalizedArray(data.public_sources),
      relevance: normalizedArray(data.relevance),
      priorities: normalizedArray(data.priorities),
      likelyQuestions: normalizedArray(data.likely_questions),
      prohibitedAssumptions: normalizedArray(data.prohibited_assumptions),
      disclaimer: data.disclaimer,
      body: parsed.content,
      path: path.relative(repoRoot, file).split(path.sep).join("/"),
      raw: readFileSync(file, "utf8")
    };
  });
}

export function inspectReaders(readers, suite) {
  const errors = [];
  const ids = new Set();
  for (const reader of readers) {
    if (!reader.id || ids.has(reader.id)) errors.push(`duplicate or missing reader ID ${reader.id ?? "(missing)"}`);
    ids.add(reader.id);
    for (const field of ["displayName", "mode", "category", "disclaimer"]) {
      if (!reader[field]) errors.push(`${reader.path}: missing ${field}`);
    }
    if (!disclaimerPattern.test(reader.disclaimer ?? "")) errors.push(`${reader.path}: disclaimer does not reject actual participation or hiring authority`);
    if (!reader.priorities.length || !reader.likelyQuestions.length || !reader.prohibitedAssumptions.length) {
      errors.push(`${reader.path}: incomplete reader priorities, questions, or prohibited assumptions`);
    }
    if (reader.mode.startsWith("named-") && !reader.publicSources.length) errors.push(`${reader.path}: named reader requires a public source`);
    for (const source of reader.publicSources) {
      try {
        if (new URL(source).protocol !== "https:") errors.push(`${reader.path}: reader source must use HTTPS`);
      } catch {
        errors.push(`${reader.path}: invalid reader source ${source}`);
      }
    }
  }
  for (const id of suite.readerIds) if (!ids.has(id)) errors.push(`suite references unknown reader ${id}`);
  const overlap = suite.developmentReaderIds.filter((id) => suite.holdoutReaderIds.includes(id));
  if (overlap.length) errors.push(`development and holdout readers overlap: ${overlap.join(", ")}`);
  return errors;
}

export function publicPortfolioSnapshot(routes) {
  return Object.fromEntries(
    routes.map((route) => [
      route,
      (publicRouteFiles[route] ?? [])
        .map((relative) => {
          const absolute = path.join(repoRoot, relative);
          if (!existsSync(absolute)) return `[missing ${relative}]`;
          if (relative.endsWith(".pdf")) return `[public resume artifact sha ${fingerprintPaths([relative])}]`;
          return readFileSync(absolute, "utf8");
        })
        .join("\n")
    ])
  );
}

export function publicRoleContext(opportunity) {
  return {
    id: opportunity.id,
    title: opportunity.title,
    canonicalUrl: opportunity.canonicalUrl,
    status: opportunity.opportunityStatus,
    verifiedAt: opportunity.verifiedAt,
    reverifyBy: opportunity.reverifyBy,
    deadline: opportunity.deadline,
    compensation: opportunity.compensation,
    location: opportunity.location,
    reportingLine: opportunity.reportingLine,
    confirmedFacts: opportunity.confirmedFacts,
    inferences: opportunity.inferences,
    unknowns: opportunity.unknowns,
    roleRequirements: opportunity.roleRequirements.map((requirement) => ({
      id: requirement.id,
      label: requirement.label,
      priority: requirement.priority
    })),
    portfolioRoutes: opportunity.portfolioRoutes,
    oneYearSuccessConditions: opportunity.oneYearSuccessConditions,
    oneYearRiskConditions: opportunity.oneYearRiskConditions,
    interviewQuestions: opportunity.interviewQuestions
  };
}

export function publicReaderContext(reader) {
  return {
    id: reader.id,
    displayName: reader.displayName,
    mode: reader.mode,
    category: reader.category,
    publicSources: reader.publicSources,
    relevance: reader.relevance,
    priorities: reader.priorities,
    likelyQuestions: reader.likelyQuestions,
    prohibitedAssumptions: reader.prohibitedAssumptions,
    disclaimer: reader.disclaimer
  };
}

export function buildHiringEvaluatorInput({ opportunity, reader, routes }) {
  return {
    boundary: "Use only supplied public portfolio, resume, role context, and reader context. Simulate the lens; do not impersonate a person or infer private beliefs.",
    portfolio: publicPortfolioSnapshot(routes),
    role: publicRoleContext(opportunity),
    reader: publicReaderContext(reader),
    outputContract: {
      decision: ["advance", "hold", "decline", "insufficient-public-evidence"],
      required: [
        "firstTenSeconds",
        "positiveSignals",
        "criticalRequirementCoverage",
        "missingPositiveEvidence",
        "falseNegativeRisk",
        "underclaimingRisk",
        "overclaimingRisk",
        "collectiveCreditFindings",
        "voiceFindings",
        "oneYearSuccessConditions",
        "oneYearRiskConditions",
        "referralSentence",
        "recommendedPortfolioChanges",
        "disclaimer"
      ]
    }
  };
}

export function buildGapResolverInput({ hiringReport, opportunity, wiki = loadKnowledgeWiki() }) {
  return {
    boundary: "Resolve public-evidence gaps after the hiring review. Do not rewrite protected evidence as public or treat access as permission.",
    hiringReport,
    roleRequirements: opportunity.roleRequirements,
    publicSafeWiki: wiki.records
      .filter((record) => ["public", "public-safe"].includes(record.visibility))
      .map((record) => ({
        id: record.id,
        kind: record.kind,
        title: record.title,
        projectionStatus: record.projectionStatus,
        canonicalRefs: record.canonicalRefs,
        allowedSurfaces: record.allowedSurfaces
      })),
    gapTypes: [
      "already-public-but-unclear",
      "wiki-proven-not-projected",
      "source-exists-not-developed",
      "source-review",
      "corroboration",
      "rights",
      "experience-gap",
      "hard-screen",
      "role-uncertainty",
      "stale-or-closed"
    ]
  };
}

export function publicInputLeaks(input) {
  const serialized = JSON.stringify(input);
  const findings = [];
  for (const key of forbiddenPublicKeys) if (serialized.includes(`\"${key}\"`)) findings.push(`forbidden key ${key}`);
  for (const pattern of privatePatterns) if (pattern.test(serialized)) findings.push(`private locator pattern ${pattern}`);
  return findings;
}

function terms(value) {
  return new Set(
    value
      .join(" ")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((token) => token.length > 2 && !stopwords.has(token))
  );
}

export function discoveryRanking(opportunities, suite) {
  const query = terms(suite.titleBlindCapabilityQuery);
  const candidates = [
    ...opportunities.map((opportunity) => ({
      id: opportunity.id,
      title: opportunity.title,
      candidateType: "target",
      terms: opportunity.discoveryTerms,
      hardScreen: opportunity.roleRequirements.find((requirement) => requirement.priority === "hard")?.label
    })),
    ...suite.negativeControls.map((control) => ({ ...control, candidateType: "negative" }))
  ];
  return candidates
    .map((candidate) => {
      const candidateTerms = terms(candidate.terms);
      const overlap = [...candidateTerms].filter((term) => query.has(term));
      return { ...candidate, overlap, score: overlap.length };
    })
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}

function cloneState(state) {
  return structuredClone(state);
}

export function baseMutationState({ wiki, suite }) {
  const oti = wiki.records.find((record) => record.id === "opportunity.nyc-oti.technical-operations-manager.782369");
  const snapshot = publicPortfolioSnapshot(suite.routes);
  return {
    snapshot,
    availableRoutes: [...suite.routes],
    oti: structuredClone(oti),
    citationsHealthy: true,
    resumeCategory: "Technical Project Manager - Product Operations & Implementation",
    heroCategory: "Technical Project Manager - Product Operations & Implementation"
  };
}

export function applyMutation(original, id) {
  const state = cloneState(original);
  if (id === "remove-strongest-proof") {
    state.oti.roleRequirements = state.oti.roleRequirements.filter((requirement) => requirement.coverageStatus !== "visible-proven");
  } else if (id === "hide-jamie-role") {
    state.snapshot["/"] = state.snapshot["/"].replace(/I (?:create|help|turn)[\s\S]{0,300}?(?:\.|;)/g, "Complex work becomes usable.");
  } else if (id === "replace-specificity-with-vague-language") {
    state.snapshot["/work/technical-operations"] = "Jamie helps teams do good work and make an impact.";
  } else if (id === "inflate-sole-credit") {
    state.snapshot["/work/technical-operations"] += " Jamie single-handedly delivered every collective outcome.";
  } else if (id === "add-unsupported-metric") {
    state.snapshot["/work/technical-operations"] += " Jamie improved team output by 999%.";
  } else if (id === "hide-resume-contact") {
    state.availableRoutes = state.availableRoutes.filter((route) => !["/resume", "/contact"].includes(route));
  } else if (id === "densify-first-screen") {
    state.snapshot["/"] = `${state.snapshot["/"]}\n`.repeat(8);
  } else if (id === "stale-opportunity") {
    state.oti.reverifyBy = "2026-07-01";
  } else if (id === "drop-hard-screen") {
    state.oti.roleRequirements = state.oti.roleRequirements.filter((requirement) => requirement.priority !== "hard");
  } else if (id === "leak-protected-path") {
    state.snapshot["/"] += " /Users/example/private-source";
  } else if (id === "remove-case-study") {
    state.availableRoutes = state.availableRoutes.filter((route) => route !== "/work/callnyc");
  } else if (id === "break-citation") {
    state.citationsHealthy = false;
  } else if (id === "contradict-resume-category") {
    state.resumeCategory = "Senior Software Engineer";
  }
  return state;
}

export function mutationFindings(state, today = "2026-07-18") {
  const findings = new Set();
  const home = state.snapshot["/"] ?? "";
  const operations = state.snapshot["/work/technical-operations"] ?? "";
  if (!state.oti.roleRequirements.some((requirement) => requirement.priority === "critical" && requirement.coverageStatus === "visible-proven")) findings.add("remove-strongest-proof");
  if (!/\bI (?:create|help|turn|build|coordinate|clarify)\b/.test(home)) findings.add("hide-jamie-role");
  if (!["risk", "onboarding", "handoff", "decision", "launch", "workflow"].filter((term) => operations.toLowerCase().includes(term)).length) findings.add("replace-specificity-with-vague-language");
  if (/single-handedly|solely responsible/i.test(operations)) findings.add("inflate-sole-credit");
  if (/999%|guaranteed (?:growth|impact)/i.test(operations)) findings.add("add-unsupported-metric");
  if (!["/resume", "/contact"].every((route) => state.availableRoutes.includes(route))) findings.add("hide-resume-contact");
  if (home.split(/\s+/).length > 1200) findings.add("densify-first-screen");
  if (state.oti.opportunityStatus === "live" && state.oti.reverifyBy < today) findings.add("stale-opportunity");
  if (!state.oti.roleRequirements.some((requirement) => requirement.priority === "hard")) findings.add("drop-hard-screen");
  if (privatePatterns.some((pattern) => pattern.test(JSON.stringify(state.snapshot)))) findings.add("leak-protected-path");
  if (!state.availableRoutes.includes("/work/callnyc")) findings.add("remove-case-study");
  if (!state.citationsHealthy) findings.add("break-citation");
  if (state.resumeCategory !== state.heroCategory) findings.add("contradict-resume-category");
  return findings;
}

export function runMutationFixtures({ wiki, suite, fixtures }) {
  const base = baseMutationState({ wiki, suite });
  return fixtures.map((fixture) => {
    const findings = mutationFindings(applyMutation(base, fixture.id));
    return { id: fixture.id, detected: findings.has(fixture.id), findings: [...findings].sort() };
  });
}

export function loadHiringAcceptance() {
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const fixtures = JSON.parse(readFileSync(mutationPath, "utf8"));
  const wiki = loadKnowledgeWiki();
  const readers = loadReaders();
  const opportunities = wiki.records.filter((record) => suite.targetOpportunityIds.includes(record.id));
  return { suite, fixtures, wiki, readers, opportunities };
}

export function inspectHiringAcceptance(bundle, { today = new Date().toISOString().slice(0, 10) } = {}) {
  const { suite, fixtures, wiki, readers, opportunities } = bundle;
  const gates = [];
  const gate = (id, pass, detail) => gates.push({ id, status: pass ? "pass" : "fail", detail });

  gate("wiki-integrity", wiki.inspection.errors.length === 0, wiki.inspection.errors.length ? wiki.inspection.errors.join("; ") : "Knowledge Wiki hard gates pass");
  const foundIds = new Set(opportunities.map((opportunity) => opportunity.id));
  const missingOpportunities = suite.targetOpportunityIds.filter((id) => !foundIds.has(id));
  gate("tier-one-records", missingOpportunities.length === 0 && opportunities.length === 6, missingOpportunities.length ? `Missing ${missingOpportunities.join(", ")}` : "Six governed Tier 1 opportunity records are present");

  const stale = opportunities.filter((opportunity) => opportunity.opportunityStatus !== "live" || opportunity.reverifyBy < today);
  gate("opportunity-freshness", stale.length === 0, stale.length ? `Not currently live and fresh: ${stale.map((item) => item.id).join(", ")}` : "All Tier 1 records are live within their recorded verification windows");

  const requirementErrors = opportunities.flatMap((opportunity) => {
    const errors = [];
    if (opportunity.roleRequirements.length < 5) errors.push(`${opportunity.id}: fewer than five requirements`);
    if (!opportunity.roleRequirements.some((requirement) => requirement.priority === "hard")) errors.push(`${opportunity.id}: no hard requirement`);
    for (const requirement of opportunity.roleRequirements) {
      if (!roleCoverageStatuses.has(requirement.coverageStatus)) errors.push(`${opportunity.id}: invalid coverage ${requirement.coverageStatus}`);
      if (!requirement.sourceStatus || !requirement.nextAction) errors.push(`${opportunity.id}: incomplete requirement ${requirement.id}`);
    }
    return errors;
  });
  gate("requirement-coverage", requirementErrors.length === 0, requirementErrors.length ? requirementErrors.join("; ") : `${opportunities.reduce((total, item) => total + item.roleRequirements.length, 0)} stable requirements preserve evidence, status, gap, and next action`);

  const readerErrors = inspectReaders(readers, suite);
  gate("reader-contracts", readerErrors.length === 0, readerErrors.length ? readerErrors.join("; ") : `${readers.length} reader profiles preserve category, public basis, prohibited assumptions, and disclaimers`);

  const sampleReader = readers.find((reader) => reader.id === "reader.lisa-gelobter") ?? readers[0];
  const publicLeaks = opportunities.flatMap((opportunity) => publicInputLeaks(buildHiringEvaluatorInput({ opportunity, reader: sampleReader, routes: suite.routes })).map((finding) => `${opportunity.id}: ${finding}`));
  const resolverHasWiki = opportunities.every((opportunity) => buildGapResolverInput({ hiringReport: {}, opportunity, wiki }).publicSafeWiki.length > 0);
  gate("public-only-separation", publicLeaks.length === 0 && resolverHasWiki, publicLeaks.length ? publicLeaks.join("; ") : "Hiring inputs exclude Wiki gap fields; the separate resolver receives public-safe Wiki metadata afterward");

  const ranking = discoveryRanking(opportunities, suite);
  const targetScores = ranking.filter((item) => item.candidateType === "target").map((item) => item.score);
  const negativeScores = ranking.filter((item) => item.candidateType === "negative").map((item) => item.score);
  const discoveryPass = targetScores.length === 6 && Math.min(...targetScores) > Math.max(...negativeScores);
  gate("title-blind-discovery", discoveryPass, `Target scores ${targetScores.join(", ")}; negative-control scores ${negativeScores.join(", ")}`);
  gate("negative-controls", negativeScores.every((score) => score === 0) && suite.negativeControls.every((control) => control.hardScreen), "License, coding-depth, and quota-carrying controls remain explicit non-matches");

  const mutations = runMutationFixtures({ wiki, suite, fixtures });
  const missedMutations = mutations.filter((item) => !item.detected);
  gate("mutation-detection", missedMutations.length === 0, missedMutations.length ? `Missed ${missedMutations.map((item) => item.id).join(", ")}` : `${mutations.length}/${mutations.length} adversarial mutations detected`);

  const operationsSource = readFileSync(path.join(repoRoot, "apps/www/src/app/work/technical-operations/page.tsx"), "utf8");
  const boundedClimb = operationsSource.includes("I turn loosely defined work into operating systems teams can use") &&
    operationsSource.includes("visible risks") &&
    operationsSource.includes("handoffs that let the work continue") &&
    !operationsSource.includes("Across civic, cultural, small-business, and public-facing technical environments");
  gate("bounded-oti-climb", boundedClimb, boundedClimb ? "The Technical Operations introduction shortens the runway and preserves source-backed operating specifics" : "The bounded OTI public-language climb is not yet present");

  return { gates, ranking, mutations, readerErrors, publicLeaks };
}

export function evaluationFingerprints(bundle) {
  const portfolioPaths = [...new Set(Object.values(publicRouteFiles).flat())];
  const opportunityPaths = bundle.opportunities.map((record) => record.path);
  const readerPaths = bundle.readers.map((reader) => reader.path);
  const contractPaths = [
    "evals/hiring-acceptance/suite.json",
    "evals/hiring-acceptance/fixtures/mutations.json",
    "scripts/lib/hiring-acceptance.mjs",
    "scripts/run-hiring-acceptance-evals.mjs",
    "scripts/tests/hiring-acceptance.test.mjs"
  ];
  return {
    candidateSha: candidateCommit(portfolioPaths),
    portfolioSnapshotHash: fingerprintPaths(portfolioPaths),
    roleContextHash: fingerprintPaths(opportunityPaths),
    readerContextHash: fingerprintPaths(readerPaths),
    promptHash: fingerprintPaths(["docs/qa/hiring-acceptance/README.md", "evals/hiring-acceptance/suite.json"]),
    contractFingerprint: fingerprintPaths(contractPaths)
  };
}

export function validateJudgments(judgments, fingerprints) {
  const requiredIds = new Set(["public-hiring-editorial", "wiki-gap-resolution"]);
  const valid = judgments.filter((judgment) =>
    requiredIds.has(judgment.id) &&
    judgment.candidateSha === fingerprints.candidateSha &&
    judgment.portfolioSnapshotHash === fingerprints.portfolioSnapshotHash &&
    judgment.roleContextHash === fingerprints.roleContextHash &&
    judgment.readerContextHash === fingerprints.readerContextHash &&
    judgment.contractFingerprint === fingerprints.contractFingerprint &&
    judgment.verdict === "pass" &&
    Array.isArray(judgment.findings) &&
    judgment.findings.length > 0 &&
    judgment.disclaimer
  );
  return [...new Set(valid.map((judgment) => judgment.id))];
}
