#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { compileKnowledgeWiki, repoRoot, serializeBacklinks, serializeGraph, serializeHealthJson, serializeHealthMarkdown } from "./lib.mjs";
import { suitePath, validateWikiEvalSuite } from "./check-wiki-evals.mjs";

const suite = JSON.parse(readFileSync(suitePath, "utf8"));
const suiteValidation = validateWikiEvalSuite(suite);
if (suiteValidation.errors.length) throw new Error(suiteValidation.errors.join("; "));

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function walk(root) {
  if (!existsSync(root)) return [];
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function relative(file) { return path.relative(repoRoot, file).split(path.sep).join("/"); }

export function selectedCandidateFiles() {
  const roots = [
    ".agents/evals",
    ".vscode",
    "apps/www/src",
    "docs/architecture",
    "docs/knowledge-bank",
    "reports",
    "scripts/knowledge-wiki",
    "scripts/tests/knowledge-wiki.test.mjs",
    "scripts/tests/knowledge-wiki-evals.test.mjs",
  ];
  const files = roots.flatMap((root) => {
    const absolute = path.join(repoRoot, root);
    return existsSync(absolute) && statSync(absolute).isFile() ? [absolute] : walk(absolute);
  });
  for (const file of ["package.json", "package-lock.json"]) {
    const absolute = path.join(repoRoot, file);
    if (existsSync(absolute)) files.push(absolute);
  }
  return [...new Set(files)].filter((file) => !relative(file).startsWith("docs/qa/")).sort((left, right) => relative(left).localeCompare(relative(right)));
}

export function hashFiles(files) {
  const hash = createHash("sha256");
  for (const file of files) { hash.update(relative(file)); hash.update("\0"); hash.update(readFileSync(file)); hash.update("\0"); }
  return hash.digest("hex");
}

function hashFile(file) { return createHash("sha256").update(readFileSync(file)).digest("hex"); }

function command(args) {
  const result = spawnSync(process.execPath, args, { cwd: repoRoot, encoding: "utf8" });
  return { pass: result.status === 0, output: `${result.stdout ?? ""}${result.stderr ?? ""}`.trim() };
}

function result(entry, score, evidence, findings = []) {
  const threshold = entry.blocking ? suite.thresholds.blocking_score_minimum : 2;
  return { eval_id: entry.id, title: entry.title, grader: entry.grader, external_judgment_required: entry.external_judgment_required === true, blocking: entry.blocking, weight: entry.weight, score, pass: score >= threshold, evidence, findings, recommended_next_move: entry.remediation_hint };
}

export function validateJudgmentPayload(payload, candidateFingerprint, rubricFingerprint) {
  const errors = [];
  if (!payload) return { errors: ["No judgment payload supplied"], judgments: new Map() };
  if (payload.suite_id !== suite.suite_id) errors.push("Judgment suite_id does not match");
  if (payload.candidate_fingerprint !== candidateFingerprint) errors.push("Judgment candidate fingerprint is stale or missing");
  if (payload.rubric_fingerprint !== rubricFingerprint) errors.push("Judgment rubric fingerprint is stale or missing");
  if (payload.independent_from_optimizer !== true) errors.push("Judgment must be independent from the optimizer");
  if (!payload.judge_id || typeof payload.judge_id !== "string") errors.push("Judgment judge_id is required");
  const judgments = new Map();
  for (const item of payload.judgments ?? []) {
    if (!/^KW-\d{3}$/.test(item.eval_id ?? "")) errors.push(`Invalid judgment eval_id: ${item.eval_id}`);
    if (!Number.isInteger(item.score) || item.score < 0 || item.score > 4) errors.push(`Invalid score for ${item.eval_id}`);
    if (!Array.isArray(item.evidence) || !item.evidence.length) errors.push(`Evidence is required for ${item.eval_id}`);
    if (!Array.isArray(item.findings)) errors.push(`Findings must be an array for ${item.eval_id}`);
    judgments.set(item.eval_id, item);
  }
  return { errors, judgments };
}

export const sourceReturnLabels = [
  "Question brought to the source",
  "Original material reopened",
  "Scope and completeness",
  "What changed in this reading",
  "What did not change",
  "Access boundary",
  "Next return",
];

export const foundationOverviewPageSpecs = [
  {
    id: "project.nyc-artist-coalition",
    path: "docs/knowledge-bank/projects/nyc-artist-coalition.md",
    canonicalRefs: ["CLM-NYCAC-POLICY-DATA-COMMUNICATIONS", "SRC-NYCAC-COUNCIL-SMALL-BUSINESS-HEARING-2019-03-18"],
    requiredHeadings: ["## Jamie's role", "## What the coalition accomplished", "## Boundaries"],
  },
  {
    id: "project.wowlist",
    path: "docs/knowledge-bank/projects/wowlist.md",
    canonicalRefs: ["CLM-WOWLIST-DATABASE-SNAPSHOT-SCALE", "SRC-WOWLIST-SUNDAY-CALLSCRIPT-AGGREGATE-AUDIT-2026-07-15"],
    requiredHeadings: ["## Jamie's role", "## Product and community practice", "## Boundaries"],
  },
  {
    id: "project.kc-town-hall",
    path: "docs/knowledge-bank/projects/kc-town-hall.md",
    canonicalRefs: ["CLM-KCTH-PHASE-ONE-COLD-SHELL-COMPLETION", "CLM-KCTH-SURVEY-DESIGN-AND-DECISION-INPUT", "SRC-KCTH-CCED-PHASE-ONE-PACKET-2019"],
    requiredHeadings: ["## Phase One restoration", "## Neighborhood process", "## Boundaries"],
  },
  {
    id: "project.fair-rent-nyc",
    path: "docs/knowledge-bank/projects/fair-rent-nyc.md",
    canonicalRefs: ["CLM-CRS-COALITION-OPERATING-SYSTEM", "CLM-CRS-OPEN-DATA-IMPLEMENTATION-DESIGN", "SRC-CRS-RUNNING-MINUTES-2026-05-15"],
    requiredHeadings: ["## Operating structure", "## Policy provenance and public data", "## Boundaries"],
  },
  {
    id: "method.transition-and-handoff",
    path: "docs/knowledge-bank/methods/transition-and-handoff.md",
    canonicalRefs: ["CLM-GDRIVE-PORTABLE-HANDOFF-PRACTICE", "CLM-KCTH-MISSION-ALIGNED-TRANSITION"],
    requiredHeadings: ["## Observable pattern", "## Care is an operating requirement", "## Boundaries"],
  },
];

export const campaignNarrativePageSpecs = [
  {
    id: "project.let-nyc-dance",
    path: "docs/knowledge-bank/projects/let-nyc-dance.md",
    canonicalRefs: ["CLM-NYCAC-CABARET-REPEAL-CONTRIBUTION-CANDIDATE", "SRC-NYCAC-LETNYCDANCE-FACTSHEET-2017", "SRC-NYCAC-LET-NYC-DANCE-PRESS-INDEX-2026-05-11"],
    requiredHeadings: ["## Jamie's role", "## Outcome and attribution", "## Boundaries"],
    requiredPhrases: ["multi-group campaign", "does not measure his causal share", "policy.people-and-collective-credit"],
  },
  {
    id: "project.talks-not-raids",
    path: "docs/knowledge-bank/projects/talks-not-raids.md",
    canonicalRefs: ["CLM-NYCAC-TALKS-NOT-RAIDS-TESTIMONY", "CLM-NYCAC-MARCH-TRANSPARENCY-LAW", "CLM-NYCAC-MARCH-REPLACED-BY-CURE", "SRC-NYCAC-TALKS-NOT-RAIDS-CAMPAIGN", "SRC-NYCAC-COUNCIL-MARCH-HEARING-2019-02-11"],
    requiredHeadings: ["## Jamie's role", "## Outcomes and chronology", "## Boundaries"],
    requiredPhrases: ["does not establish that Jamie", "not a full enforcement history", "policy.people-and-collective-credit"],
  },
  {
    id: "event.nycac.office-of-nightlife-town-hall-2017",
    path: "docs/knowledge-bank/events/office-of-nightlife-town-hall-2017.md",
    canonicalRefs: ["CLM-NYCAC-OFFICE-NIGHTLIFE-TOWN-HALL", "CLM-NYCAC-TOWN-HALL-PRODUCTION-ROLE-CANDIDATE", "SRC-NYCAC-FB-EVENT-NIGHT-MAYOR-TOWN-HALL-2017-10-11", "SRC-NYCAC-ARCHIVE-NIGHTLIFE-TOWN-HALL-2017"],
    requiredHeadings: ["## Jamie's role", "## Why the event mattered", "## Boundaries"],
    requiredPhrases: ["Jamie and Olympia Kazi", "not verified attendance", "policy.people-and-collective-credit"],
  },
  {
    id: "project.harry-j-epstein",
    path: "docs/knowledge-bank/projects/harry-j-epstein.md",
    canonicalRefs: ["hje-modernization-stewardship", "hje-revenue-growth-contribution", "career-operating-structure-14-years"],
    requiredHeadings: ["## Jamie's role", "## Business evidence", "## Boundaries"],
    requiredPhrases: ["Harry J. Epstein Company team", "Contributed", "private business records remain protected"],
  },
];

export const practicePageSpecs = [
  {
    id: "method.jamie-at-work",
    path: "docs/knowledge-bank/methods/jamie-at-work.md",
    canonicalRefs: ["career-operating-structure-14-years", "technical-operations-operating-backbone", "CLM-NYCAC-PARTICIPATION-TO-ACTION-SYSTEM", "CLM-GDRIVE-PORTABLE-HANDOFF-PRACTICE", "hje-modernization-stewardship"],
    requiredHeadings: ["## The recurring action", "## Professional value", "## Boundaries"],
    requiredPhrases: ["emerging work", "actor, action, artifact, and usable result"],
  },
  {
    id: "method.participation-and-relational-infrastructure",
    path: "docs/knowledge-bank/methods/participation-and-relational-infrastructure.md",
    canonicalRefs: ["sunday-dinner-196-participation-infrastructure", "CLM-WATERWAYS-PARTICIPATORY-RIVER-METHOD", "CLM-OPEN-HOUSE-PARTICIPATORY-DESIGN", "CLM-NYCAC-PARTICIPATION-TO-ACTION-SYSTEM", "CLM-NYCAC-RECURRING-EVENT-INFRASTRUCTURE"],
    requiredHeadings: ["## Recurring components", "## Lineage", "## Boundaries"],
    requiredPhrases: ["invitation, orientation, presence, exchange, shared action, memory, and", "Do not infer impact"],
  },
  {
    id: "place.small-cultural-spaces",
    path: "docs/knowledge-bank/places/small-cultural-spaces.md",
    canonicalRefs: ["CLM-NYCAC-RECURRING-EVENT-INFRASTRUCTURE", "CLM-NYCAC-CIVIC-INTERMEDIARY-VALUE", "CLM-NYCAC-PARTICIPATION-TO-ACTION-SYSTEM"],
    requiredHeadings: ["## Places in the record", "## Public value without extraction", "## Boundaries"],
    requiredPhrases: ["not interchangeable containers", "Preserve the places as contributors"],
  },
];

export const governancePageSpecs = [
  {
    id: "policy.people-and-collective-credit",
    path: "docs/knowledge-bank/people-and-collective-credit.md",
    canonicalRefs: [],
    requiredHeadings: ["## Credit record", "## Protected absence", "## Collective outcomes", "## Eval contract"],
    requiredPhrases: ["Access authorization is not permission", "unknown authorship", "collaborator may correct role"],
  },
  {
    id: "method.outcomes-and-adoption",
    path: "docs/knowledge-bank/outcomes-and-adoption.md",
    canonicalRefs: ["CLM-NYCAC-CABARET-REPEAL-CONTRIBUTION-CANDIDATE", "CLM-NYCAC-MARCH-TRANSPARENCY-LAW", "CLM-NYCAC-MARCH-REPLACED-BY-CURE", "CLM-KCTH-PHASE-ONE-COLD-SHELL-COMPLETION", "CLM-KCTH-CCED-COUNCIL-FUNDING-CHAIN", "CLM-CRS-OPEN-DATA-IMPLEMENTATION-DESIGN", "hje-revenue-growth-contribution"],
    requiredHeadings: ["## Four-part test", "## Selected project distinctions", "## Evidence states", "## Anti-inflation rules", "## Advancement record"],
    requiredPhrases: ["Jamie delivered", "Collaborators used", "Institution adopted", "Conditions changed", "A plan is not delivery"],
  },
  {
    id: "index.claim-maturity-dashboard",
    path: "docs/knowledge-bank/claim-maturity-dashboard.md",
    canonicalRefs: ["hje-modernization-stewardship", "CLM-NYCAC-CABARET-REPEAL-CONTRIBUTION-CANDIDATE", "CLM-NYCAC-TOWN-HALL-PRODUCTION-ROLE-CANDIDATE", "CLM-NYCAC-FAIRRENT-WEB-IMPLEMENTATION-CANDIDATE", "CLM-NYCAC-FIREGUARD-PASS-RATE-ATTESTED", "CLM-NTERCHNG-INSTALLATION-OPERATIONS", "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED"],
    requiredHeadings: ["## Selected and bounded", "## Corroboration queue", "## Rights and completion hold", "## Negative knowledge", "## Required fields for every lane", "## Operating rules"],
    requiredPhrases: ["Advancement test", "not a second claim registry", "never existed", "does not mutate the canonical record"],
  },
];

export const sourceReturnPageSpecs = [
  ...foundationOverviewPageSpecs,
  ...campaignNarrativePageSpecs,
  ...practicePageSpecs,
];

const privateLocatorPattern = /(?:file:\/\/|\/(?:Users|Volumes|private)\/|drive\.google\.com\/drive\/folders|resourcekey=|icloud\.com\/iclouddrive)/i;

export function validateSourceReturnText(text) {
  const errors = [];
  if (!/^## Present-tense source return$/m.test(text)) errors.push("Present-tense source return heading is required");
  for (const label of sourceReturnLabels) {
    if (!new RegExp(`^- \\*\\*${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\*\\*`, "m").test(text)) errors.push(`Missing source-return field: ${label}`);
  }
  if (privateLocatorPattern.test(text)) errors.push("Private locator or authenticated resource key is prohibited");
  return { errors };
}

export function validatePageSpecText(text, spec, { requireSourceReturn = true } = {}) {
  const errors = requireSourceReturn ? [...validateSourceReturnText(text).errors] : [];
  if (!new RegExp(`^id: ${spec.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m").test(text)) errors.push(`Stable page ID is missing: ${spec.id}`);
  for (const reference of spec.canonicalRefs) if (!text.includes(`  - ${reference}`)) errors.push(`Canonical reference is missing: ${reference}`);
  for (const heading of spec.requiredHeadings) if (!text.includes(heading)) errors.push(`Required heading is missing: ${heading}`);
  for (const phrase of spec.requiredPhrases ?? []) if (!text.includes(phrase)) errors.push(`Required phrase is missing: ${phrase}`);
  return { errors };
}

function deterministicResults(compiled) {
  const byId = new Map(suite.evals.map((entry) => [entry.id, entry]));
  const results = [];
  const architecture = readFileSync(path.join(repoRoot, "docs/architecture/knowledge-wiki-inventory.md"), "utf8");
  const schema = readFileSync(path.join(repoRoot, "docs/knowledge-bank/schema.md"), "utf8");
  const noSecondTree = !existsSync(path.join(repoRoot, "docs/knowledge-wiki"));
  const derivedMarked = ["wiki-graph.json", "wiki-backlinks.json", "wiki-health.json"].every((name) => JSON.parse(readFileSync(path.join(repoRoot, "reports", name), "utf8")).generated === true) && readFileSync(path.join(repoRoot, "reports/wiki-health.md"), "utf8").startsWith("<!-- GENERATED FILE");
  const authorityPass = noSecondTree
    && /Exact source-backed claims, sources, observations, evidence/.test(schema)
    && /proofs\.ts/.test(schema)
    && /proof-claim/.test(schema)
    && /work\.ts/.test(architecture)
    && derivedMarked;
  results.push(result(byId.get("KW-001"), authorityPass ? 4 : 0, [`single compatibility root: ${noSecondTree}`, `generated artifacts marked: ${derivedMarked}`, "authority table assigns source-backed and professional proof claims to their existing typed registries", "referenced proof claims serialize as minimal canonical adapter nodes"], authorityPass ? [] : ["Authority map, compatibility root, proof adapter, or generated marker is incomplete"]));

  const repeat = compileKnowledgeWiki();
  const structurePass = compiled.health.errors.length === 0 && compiled.health.counts.orphans === 0 && compiled.health.counts.unreachable === 0 && repeat.graph.fingerprint === compiled.graph.fingerprint;
  results.push(result(byId.get("KW-002"), structurePass ? 4 : 0, [`graph fingerprint: ${compiled.graph.fingerprint}`, `nodes: ${compiled.graph.nodes.length}`, `edges: ${compiled.graph.edges.length}`, `errors: ${compiled.health.errors.length}`, `orphans: ${compiled.health.counts.orphans}`, `unreachable: ${compiled.health.counts.unreachable}`], structurePass ? [] : ["Identity, link, reachability, or determinism failure remains"]));

  const photo = compiled.graph.nodes.find((node) => node.id === "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO");
  const serialized = JSON.stringify({ graph: compiled.graph, backlinks: compiled.backlinks, health: compiled.health });
  const protectedPass = photo?.title === "[protected source]" && photo?.sensitivity === "protected" && photo?.governance?.public_display_status === "hold" && !/(?:file:\/\/|\/Users\/|\/Volumes\/)/.test(serialized);
  results.push(result(byId.get("KW-003"), protectedPass ? 4 : 0, [`protected photo label: ${photo?.title}`, `display state: ${photo?.governance?.public_display_status}`, "serialized graph contains no absolute private locator"], protectedPass ? [] : ["Protected-source representation is too revealing or governance is missing"]));

  const correctionIds = new Set(["COR-CALLNYC-CHRONOLOGY-2026", "COR-CALLNYC-SUPERLATIVE-2026", "COR-CALLNYC-EVENT-TIME-2026"]);
  const correctionEdges = compiled.graph.edges.filter((edge) => edge.type === "corrected_by" && correctionIds.has(edge.to));
  const representedCorrections = new Set(correctionEdges.map((edge) => edge.to));
  const negativePass = [...correctionIds].every((id) => representedCorrections.has(id)) && compiled.health.wanted_pages.some((item) => item.id === "wanted.callnyc.civic-hall-event-page" && item.status === "not-recovered") && compiled.graph.nodes.some((node) => node.id === "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED");
  results.push(result(byId.get("KW-004"), negativePass ? 4 : 0, [`canonical CallNYC corrections represented: ${representedCorrections.size}`, `authored correction paths: ${correctionEdges.length}`, `wanted pages: ${compiled.health.wanted_pages.length}`, "not-recovered canonical claim retained"], negativePass ? [] : ["Correction or negative-knowledge path is incomplete"]));

  const queryCapability = command(["scripts/knowledge-wiki/wiki-query.mjs", "--id", "capability.technical-operations"]);
  const queryTime = command(["scripts/knowledge-wiki/wiki-query.mjs", "--id", "CLM-CALLNYC-HACKATHON-DATE-TIME"]);
  const queryPhoto = command(["scripts/knowledge-wiki/wiki-query.mjs", "--id", "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO"]);
  const queryCorrection = command(["scripts/knowledge-wiki/wiki-query.mjs", "--id", "COR-CALLNYC-EVENT-TIME-2026"]);
  const queryPath = command(["scripts/knowledge-wiki/wiki-query.mjs", "--from", "event.nycc.councilstat-hackathon-2016", "--to", "method.source-backed-team-memory"]);
  const queryUnknown = command(["scripts/knowledge-wiki/wiki-query.mjs", "--unknown", "value"]);
  const queryPass = [queryCapability, queryTime, queryPhoto, queryCorrection, queryPath].every((item) => item.pass) && !queryUnknown.pass && /project\.callnyc/.test(queryCapability.output) && /SRC-CALLNYC-CIVIC-HALL-POST/.test(queryTime.output) && /\[protected source\]/.test(queryPhoto.output) && /developed_through/.test(queryPath.output);
  results.push(result(byId.get("KW-005"), queryPass ? 4 : 0, ["capability traversal resolves project, method, and opportunity", "time claim resolves direct source", "protected photo query stays redacted and exposes approved safe context", "event-to-method multi-hop path resolves", "unknown option fails closed"], queryPass ? [] : ["One or more benchmark queries failed"]));

  const root = readFileSync(path.join(repoRoot, "docs/knowledge-bank/README.md"), "utf8");
  const authoring = readFileSync(path.join(repoRoot, "docs/knowledge-bank/authoring.md"), "utf8");
  const settings = JSON.parse(readFileSync(path.join(repoRoot, ".vscode/settings.json"), "utf8"));
  const tasks = command(["scripts/knowledge-wiki/wiki-tasks.mjs"]);
  const readerPass = /## Start Here/.test(root) && /Exact claims, sources, evidence/.test(authoring) && settings["markdown.validate.enabled"] === true && tasks.pass && /"result_claims": false/.test(tasks.output);
  results.push(result(byId.get("KW-006"), readerPass ? 4 : 0, ["root Start Here present", "VS Code Markdown validation enabled", "authoring routes exact records to typed registry", "human task output declares no result claims"], readerPass ? [] : ["Reader or author experience is incomplete"]));

  const safety = command(["scripts/check-public-safety.mjs"]);
  const projection = command(["scripts/check-projection-integrity.mjs"]);
  const routes = command(["scripts/check-routes.mjs"]);
  const prohibited = walk(path.join(repoRoot, "apps/www/src/app")).filter((file) => /\/(?:proofs|knowledge-bank|knowledge-wiki|public-claims)\//.test(file.split(path.sep).join("/")));
  const projectionPass = safety.pass && projection.pass && routes.pass && prohibited.length === 0 && /There is no `\/proofs`/.test(authoring);
  results.push(result(byId.get("KW-007"), projectionPass ? 4 : 0, ["public-safety check passes", "projection-integrity check passes", "route check passes", `prohibited route files: ${prohibited.length}`], projectionPass ? [] : ["Projection or prohibited-route guard failed"]));

  for (const id of ["KW-008", "KW-009", "KW-010", "KW-011"]) results.push(result(byId.get(id), 0, ["Independent exact-candidate judgment required"], ["No valid external judgment supplied"]));
  results.push(result(byId.get("KW-012"), 0, ["Human task protocol is present; no approval is inferred"], ["Exact-candidate Jamie approval and any applicable rights or collaborator decisions remain open"]));

  const nodeIds = new Set(compiled.graph.nodes.map((node) => node.id));
  const checkPageSpec = (spec, requireSourceReturn = true) => {
    if (!existsSync(path.join(repoRoot, spec.path))) return { spec, errors: ["Page is missing"] };
    const text = readFileSync(path.join(repoRoot, spec.path), "utf8");
    const errors = [...validatePageSpecText(text, spec, { requireSourceReturn }).errors];
    for (const reference of spec.canonicalRefs) {
      if (!nodeIds.has(reference)) errors.push(`Canonical reference does not resolve: ${reference}`);
    }
    return { spec, text, errors };
  };
  const sourceReturnChecks = sourceReturnPageSpecs.map((spec) => checkPageSpec(spec));
  const foundationChecks = foundationOverviewPageSpecs.map((spec) => checkPageSpec(spec));
  const priorityIds = foundationOverviewPageSpecs.map((spec) => spec.id);
  const rootTargets = new Set(compiled.graph.edges.filter((edge) => edge.from === "index.knowledge-wiki" && edge.type === "indexes").map((edge) => edge.to));
  const directoryTargets = new Set(compiled.graph.edges.filter((edge) => edge.from === "index.knowledge-wiki-project-dossiers" && edge.type === "indexes").map((edge) => edge.to));
  const overviewPass = foundationChecks.every((check) => check.errors.length === 0)
    && priorityIds.every((id) => nodeIds.has(id))
    && priorityIds.filter((id) => id.startsWith("project.")).every((id) => rootTargets.has(id) && directoryTargets.has(id))
    && rootTargets.has("method.transition-and-handoff");
  results.push(result(byId.get("KW-013"), overviewPass ? 4 : 0, [
    `priority overview and method nodes: ${priorityIds.filter((id) => nodeIds.has(id)).length}/${priorityIds.length}`,
    `root-indexed project overviews: ${priorityIds.filter((id) => id.startsWith("project.") && rootTargets.has(id)).length}/4`,
    `directory-indexed project overviews: ${priorityIds.filter((id) => id.startsWith("project.") && directoryTargets.has(id)).length}/4`,
    `canonical/source-return page checks passing: ${foundationChecks.filter((check) => check.errors.length === 0).length}/${foundationChecks.length}`,
  ], overviewPass ? [] : foundationChecks.flatMap((check) => check.errors.map((error) => `${check.spec.id}: ${error}`))));

  const rereading = readFileSync(path.join(repoRoot, "docs/knowledge-bank/methods/original-source-rereading.md"), "utf8");
  const taskProtocolPass = tasks.pass && /TASK-WIKI-SOURCE-ACCESS/.test(tasks.output) && /"result_claims": false/.test(tasks.output);
  const authoringLabelsPass = sourceReturnLabels.every((label) => authoring.includes(label));
  const accessStatesPass = ["Not materialized", "Not recovered", "Deliberately not processed"].every((state) => rereading.includes(state));
  const permissionBoundaryPass = /does not\s+automatically permit quotation, publication, retention, or promotion/i.test(rereading);
  const rereadingPass = sourceReturnChecks.every((check) => check.errors.length === 0)
    && /^## Source return protocol$/m.test(rereading)
    && /^## Access classes$/m.test(rereading)
    && /^## Personal librarian request$/m.test(rereading)
    && accessStatesPass
    && permissionBoundaryPass
    && authoringLabelsPass
    && taskProtocolPass
    && !privateLocatorPattern.test(rereading);
  results.push(result(byId.get("KW-014"), rereadingPass ? 4 : 0, [
    `priority source-return sections passing: ${sourceReturnChecks.filter((check) => check.errors.length === 0).length}/${sourceReturnChecks.length}`,
    `authoring fields present: ${authoringLabelsPass}`,
    `explicit unavailable-source states present: ${accessStatesPass}`,
    `access/publication boundary present: ${permissionBoundaryPass}`,
    `bounded librarian task protocol present: ${taskProtocolPass}`,
  ], rereadingPass ? [] : [
    ...sourceReturnChecks.flatMap((check) => check.errors.map((error) => `${check.spec.id}: ${error}`)),
    ...(!authoringLabelsPass ? ["Authoring guide is missing one or more source-return fields"] : []),
    ...(!accessStatesPass ? ["Source access states are incomplete"] : []),
    ...(!permissionBoundaryPass ? ["Access is not clearly separated from publication permission"] : []),
    ...(!taskProtocolPass ? ["Bounded personal-librarian task protocol is missing"] : []),
  ]));

  const campaignChecks = campaignNarrativePageSpecs.map((spec) => checkPageSpec(spec));
  const campaignIds = campaignNarrativePageSpecs.map((spec) => spec.id);
  const proofNode = compiled.graph.nodes.find((node) => node.id === "hje-modernization-stewardship");
  const campaignPass = campaignChecks.every((check) => check.errors.length === 0)
    && campaignIds.every((id) => nodeIds.has(id) && rootTargets.has(id) && directoryTargets.has(id))
    && proofNode?.kind === "proof-claim"
    && !campaignChecks.some((check) => privateLocatorPattern.test(check.text));
  results.push(result(byId.get("KW-015"), campaignPass ? 4 : 0, [
    `campaign and ownership pages passing: ${campaignChecks.filter((check) => check.errors.length === 0).length}/${campaignChecks.length}`,
    `root-indexed narratives: ${campaignIds.filter((id) => rootTargets.has(id)).length}/${campaignIds.length}`,
    `project-directory narratives: ${campaignIds.filter((id) => directoryTargets.has(id)).length}/${campaignIds.length}`,
    `structured proof claim adapted canonically: ${proofNode?.kind === "proof-claim"}`,
    "role, usable result, collective or team credit, outcome, and boundary are page requirements",
  ], campaignPass ? [] : campaignChecks.flatMap((check) => check.errors.map((error) => `${check.spec.id}: ${error}`))));

  const practiceChecks = practicePageSpecs.map((spec) => checkPageSpec(spec));
  const creditCheck = checkPageSpec(governancePageSpecs[0], false);
  const practiceIds = [...practicePageSpecs.map((spec) => spec.id), governancePageSpecs[0].id];
  const jamieProjectEdges = compiled.graph.edges.filter((edge) => edge.from === "method.jamie-at-work" && edge.type === "informed_by" && edge.to.startsWith("project."));
  const participationProjectEdges = compiled.graph.edges.filter((edge) => edge.from === "method.participation-and-relational-infrastructure" && edge.type === "developed_through");
  const placeEventEdge = compiled.graph.edges.some((edge) => edge.from === "place.small-cultural-spaces" && edge.to === "event.nycac.office-of-nightlife-town-hall-2017");
  const creditGovernanceEdges = compiled.graph.edges.filter((edge) => edge.from === "policy.people-and-collective-credit" && edge.type === "governs");
  const practicePass = practiceChecks.every((check) => check.errors.length === 0)
    && creditCheck.errors.length === 0
    && practiceIds.every((id) => nodeIds.has(id) && rootTargets.has(id))
    && jamieProjectEdges.length >= 4
    && participationProjectEdges.length >= 3
    && placeEventEdge
    && creditGovernanceEdges.length >= 4;
  results.push(result(byId.get("KW-016"), practicePass ? 4 : 0, [
    `practice and place source-return pages passing: ${practiceChecks.filter((check) => check.errors.length === 0).length}/${practiceChecks.length}`,
    `people and collective-credit policy passing: ${creditCheck.errors.length === 0}`,
    `Jamie-at-work project relations: ${jamieProjectEdges.length}`,
    `participation developed-through relations: ${participationProjectEdges.length}`,
    `place-to-event relation present: ${placeEventEdge}`,
    `credit governance relations: ${creditGovernanceEdges.length}`,
  ], practicePass ? [] : [
    ...practiceChecks.flatMap((check) => check.errors.map((error) => `${check.spec.id}: ${error}`)),
    ...creditCheck.errors.map((error) => `${creditCheck.spec.id}: ${error}`),
  ]));

  const outcomeChecks = governancePageSpecs.slice(1).map((spec) => checkPageSpec(spec, false));
  const outcomeIds = governancePageSpecs.slice(1).map((spec) => spec.id);
  const dashboardText = outcomeChecks.find((check) => check.spec.id === "index.claim-maturity-dashboard")?.text ?? "";
  const negativeKnowledgePreserved = compiled.health.wanted_pages.some((item) => item.id === "wanted.callnyc.civic-hall-event-page" && item.status === "not-recovered")
    && /not recovered/i.test(dashboardText)
    && /never existed/i.test(dashboardText);
  const outcomePass = outcomeChecks.every((check) => check.errors.length === 0)
    && outcomeIds.every((id) => nodeIds.has(id) && rootTargets.has(id))
    && negativeKnowledgePreserved
    && !privateLocatorPattern.test(dashboardText);
  results.push(result(byId.get("KW-017"), outcomePass ? 4 : 0, [
    `outcome and maturity pages passing: ${outcomeChecks.filter((check) => check.errors.length === 0).length}/${outcomeChecks.length}`,
    `root-indexed operational pages: ${outcomeIds.filter((id) => rootTargets.has(id)).length}/${outcomeIds.length}`,
    `negative knowledge preserved: ${negativeKnowledgePreserved}`,
    "dashboard rows require a canonical ID, current hold or use, and advancement test",
  ], outcomePass ? [] : outcomeChecks.flatMap((check) => check.errors.map((error) => `${check.spec.id}: ${error}`))));
  return results;
}

function main() {
  const candidateFingerprint = hashFiles(selectedCandidateFiles());
  const rubricFingerprint = hashFile(suitePath);
  const compiled = compileKnowledgeWiki();
  const generatedCurrent = readFileSync(path.join(repoRoot, "reports/wiki-graph.json"), "utf8") === serializeGraph(compiled)
    && readFileSync(path.join(repoRoot, "reports/wiki-backlinks.json"), "utf8") === serializeBacklinks(compiled)
    && readFileSync(path.join(repoRoot, "reports/wiki-health.json"), "utf8") === serializeHealthJson(compiled)
    && readFileSync(path.join(repoRoot, "reports/wiki-health.md"), "utf8") === serializeHealthMarkdown(compiled);
  const results = deterministicResults(compiled);
  const judgmentPath = argument("--judgments");
  const judgmentPayload = judgmentPath ? JSON.parse(readFileSync(path.resolve(judgmentPath), "utf8")) : null;
  const loaded = validateJudgmentPayload(judgmentPayload, candidateFingerprint, rubricFingerprint);
  const externalIds = new Set(["KW-008", "KW-009", "KW-010", "KW-011"]);
  for (const entry of results) {
    if (!externalIds.has(entry.eval_id)) continue;
    const judgment = loaded.judgments.get(entry.eval_id);
    if (!judgment || loaded.errors.length) continue;
    entry.score = judgment.score;
    entry.pass = judgment.score >= (entry.blocking ? suite.thresholds.blocking_score_minimum : 2);
    entry.evidence = judgment.evidence;
    entry.findings = judgment.findings;
  }
  const implementationResults = results.filter((entry) => entry.eval_id !== "KW-012");
  const implementationWeight = implementationResults.reduce((sum, entry) => sum + entry.weight, 0);
  const weightedScore = implementationResults.reduce((sum, entry) => sum + entry.weight * entry.score / 4, 0) / implementationWeight;
  const missingJudgments = [...externalIds].filter((id) => !loaded.judgments.has(id));
  const blockingFailures = implementationResults.filter((entry) => entry.blocking && !entry.pass).map((entry) => entry.eval_id);
  const implementationBeforeRepeat = generatedCurrent && compiled.health.errors.length === 0 && loaded.errors.length === 0 && missingJudgments.length === 0 && blockingFailures.length === 0 && weightedScore >= suite.thresholds.implementation_weighted_score_minimum;
  const previousPath = argument("--previous");
  const previous = previousPath && existsSync(previousPath) ? JSON.parse(readFileSync(previousPath, "utf8")) : null;
  const consecutivePass = previous?.candidate_fingerprint === candidateFingerprint && previous?.implementation_before_repeat === true && implementationBeforeRepeat;
  const implementationCriteriaMet = implementationBeforeRepeat && consecutivePass;
  const humanApproval = loaded.judgments.get("KW-012");
  const releaseCriteriaMet = implementationCriteriaMet && humanApproval?.score === 4;
  const output = {
    suite_id: suite.suite_id,
    suite_version: suite.version,
    label: argument("--label") ?? "knowledge-wiki-eval-run",
    candidate_fingerprint: candidateFingerprint,
    rubric_fingerprint: rubricFingerprint,
    graph_fingerprint: compiled.graph.fingerprint,
    generated_reports_current: generatedCurrent,
    implementation_weighted_score: Number(weightedScore.toFixed(4)),
    implementation_before_repeat: implementationBeforeRepeat,
    consecutive_unchanged_pass: consecutivePass,
    implementation_criteria_met: implementationCriteriaMet,
    release_criteria_met: releaseCriteriaMet,
    decision: releaseCriteriaMet ? "release_approved" : implementationCriteriaMet ? "implementation_ready_human_held" : missingJudgments.length ? "external_judgment_required" : "continue_hill_climb",
    blocking_failures: blockingFailures,
    missing_judgments: missingJudgments,
    judgment_errors: loaded.errors,
    human_open_items: releaseCriteriaMet ? [] : ["Jamie exact-candidate release decision", "Any applicable collaborator-credit review", "Any applicable media rights and consent decision"],
    evals: results,
  };
  const outputPath = argument("--output");
  if (outputPath) { mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true }); writeFileSync(path.resolve(outputPath), `${JSON.stringify(output, null, 2)}\n`); }
  console.log(JSON.stringify(output, null, 2));
  if (process.argv.includes("--require-implementation-pass") && !implementationCriteriaMet) process.exitCode = 1;
}

if (process.argv[1]?.endsWith("run-wiki-evals.mjs")) main();
