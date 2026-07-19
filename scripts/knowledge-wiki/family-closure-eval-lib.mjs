import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import matter from "gray-matter";
import { REPO_ROOT } from "./lib.mjs";

export const FAMILY_HEADS = {
  A: "920f9024d7e058700f282e3e1e76188fe1c5294e",
  B: "268a92d794f5b604f4004fc9d6e5652f234fc61b",
  C: "6a2af7396240381ce04aad9b9129ba402b83c134",
  D: "e5a7ac607bfbd5a428bb18c2f7af5baad614132b",
  E: "9f1bbfacec3edbfbc47a5200f777d4f498da0ec4"
};

export const REQUIRED_READER_PAGES = [
  ["docs/knowledge-wiki/methods/jamie-at-work.md", "method.jamie-at-work"],
  ["docs/knowledge-wiki/indexes/canonical-story-bank.md", "index.canonical-story-bank"],
  ["docs/knowledge-wiki/indexes/operational-evidence-map.md", "index.operational-evidence-map"],
  ["docs/knowledge-wiki/indexes/what-the-work-was-up-against.md", "index.what-the-work-was-up-against"],
  ["docs/knowledge-wiki/capabilities/civic-cultural-technical-translation.md", "capability.civic-cultural-technical-translation"],
  ["docs/knowledge-wiki/projects/let-nyc-dance.md", "project.let-nyc-dance"],
  ["docs/knowledge-wiki/projects/talks-not-raids.md", "project.talks-not-raids"],
  ["docs/knowledge-wiki/indexes/decision-records.md", "index.decision-records"]
];

export const REQUIRED_DECISIONS = [
  "docs/knowledge-wiki/decisions/callnyc-issue-pathways.md",
  "docs/knowledge-wiki/decisions/kc-town-hall-listening-fieldwork.md",
  "docs/knowledge-wiki/decisions/knowledge-wiki-selective-projection.md"
];

const PRIVATE_PATTERNS = [
  /\/Users\//i,
  /\/Volumes\//i,
  /Mobile Documents/i,
  /supporting-materials/i,
  /file:\/\//i,
  /resourcekey=/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /AKIA[0-9A-Z]{16}/
];

const CANDIDATE_FILES = [
  ".agents/evals/knowledge-wiki-family-closure.json",
  "docs/architecture/ADR-knowledge-wiki-family-closure.md",
  "docs/knowledge-wiki",
  "package.json",
  "scripts/knowledge-wiki/eval-family-closure.mjs",
  "scripts/knowledge-wiki/family-closure-eval-lib.mjs",
  "scripts/tests/knowledge-wiki-family-closure.test.mjs"
];

function toPosix(value) {
  return value.split(sep).join("/");
}

function listFiles(root, path) {
  const absolute = resolve(root, path);
  if (!existsSync(absolute)) return [];
  if (statSync(absolute).isFile()) return [path];
  const files = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const child = resolve(directory, entry.name);
      if (entry.isDirectory()) visit(child);
      else if (entry.isFile()) files.push(toPosix(relative(root, child)));
    }
  };
  visit(absolute);
  return files;
}

function read(root, path) {
  return existsSync(resolve(root, path)) ? readFileSync(resolve(root, path), "utf8") : "";
}

export function familyClosureFingerprint({ repoRoot = REPO_ROOT } = {}) {
  const files = CANDIDATE_FILES.flatMap((path) => listFiles(repoRoot, path)).sort();
  const hash = createHash("sha256");
  for (const path of files) {
    hash.update(path);
    hash.update("\0");
    hash.update(read(repoRoot, path));
    hash.update("\0");
  }
  return { algorithm: "sha256", digest: hash.digest("hex"), files };
}

function page(root, path, id) {
  const text = read(root, path);
  const data = text ? matter(text).data : {};
  return { path, id, text, data, exists: Boolean(text) };
}

export function evaluateFamilyClosure({ repoRoot = REPO_ROOT } = {}) {
  const adrPath = "docs/architecture/ADR-knowledge-wiki-family-closure.md";
  const runPath = "docs/knowledge-wiki/research-runs/knowledge-wiki-family-closure-2026.md";
  const evalPath = "docs/knowledge-wiki/evaluations/family-closure.md";
  const statePath = "docs/evals/knowledge-wiki-family-closure-state.json";
  const testPath = "scripts/tests/knowledge-wiki-family-closure.test.mjs";
  const adr = read(repoRoot, adrPath);
  const run = read(repoRoot, runPath);
  const evaluation = read(repoRoot, evalPath);
  const rootIndex = read(repoRoot, "docs/knowledge-wiki/README.md");
  const projectIndex = read(repoRoot, "docs/knowledge-wiki/indexes/projects.md");
  const capabilityIndex = read(repoRoot, "docs/knowledge-wiki/indexes/capabilities-and-opportunities.md");
  const handoff = read(repoRoot, "docs/knowledge-wiki/capabilities/handoff-adoption-continuity.md");
  const pages = REQUIRED_READER_PAGES.map(([path, id]) => page(repoRoot, path, id));
  const byId = new Map(pages.map((item) => [item.id, item]));
  const letNycDance = (byId.get("project.let-nyc-dance")?.text ?? "").replace(/\s+/g, " ");
  const talksNotRaids = (byId.get("project.talks-not-raids")?.text ?? "").replace(/\s+/g, " ");
  const decisions = REQUIRED_DECISIONS.map((path) => page(repoRoot, path));
  const allRequiredText = [adr, run, evaluation, handoff, ...pages.map((item) => item.text), ...decisions.map((item) => item.text)].join("\n");
  const normalizedRun = run.toLowerCase();
  const normalizedHandoff = handoff.toLowerCase();
  const tests = read(repoRoot, testPath);
  const stateText = read(repoRoot, statePath);
  const state = stateText ? JSON.parse(stateText) : {};
  const fingerprint = familyClosureFingerprint({ repoRoot });
  const decisionFields = [
    "decision_question",
    "decision_actors",
    "constraints",
    "options_considered",
    "chosen_course",
    "outcome_boundary",
    "unknowns",
    "anti_claims"
  ];

  const checks = {
    "FC-001": {
      passed:
        adr.includes("docs/knowledge-wiki/") &&
        adr.includes("docs/knowledge-bank/") &&
        adr.includes("Do not merge or cherry-pick donor branches wholesale") &&
        Object.entries(FAMILY_HEADS).every(([name, sha]) => adr.includes(`feature/knowledge-wiki-${name}`) && adr.includes(sha)),
      evidence: "The accepted B authority split and all five frozen heads are recorded with selective donor dispositions."
    },
    "FC-002": {
      passed:
        ["2,365", "2,408", "2,078", "2,192", "2,405"].every((count) => run.includes(count)) &&
        normalizedRun.includes("not directly comparable") &&
        normalizedRun.includes("current canonical operational receipt") &&
        run.includes("2,408") &&
        normalizedRun.includes("does not establish that every file body was read"),
      evidence: "All five observations remain visible; the 2,408-item B receipt is selected for current operations with explicit scope limits."
    },
    "FC-003": {
      passed:
        pages.every((item) => item.exists && item.data.id === item.id) &&
        pages.every((item) => [rootIndex, projectIndex, capabilityIndex].some((index) => index.includes(item.path.split("/").at(-1)))),
      evidence: `${pages.filter((item) => item.exists && item.data.id === item.id).length}/${pages.length} reader-path pages exist and are indexed.`
    },
    "FC-004": {
      passed:
        byId.get("method.jamie-at-work")?.text.includes("## The Recurring Action") &&
        byId.get("index.canonical-story-bank")?.text.includes("Jamie's action") &&
        byId.get("index.operational-evidence-map")?.text.includes("Jamie's supported responsibility") &&
        allRequiredText.includes("collective") &&
        allRequiredText.includes("does not establish sole") &&
        !/Jamie (?:alone|single-handedly) (?:repealed|caused|created the coalition)/i.test(allRequiredText),
      evidence: "Actor, action, usable result, collective context, and honest limit remain attached."
    },
    "FC-005": {
      passed:
        ["Designed", "Launched", "Used", "Adopted", "Handed off", "Sustained"].every((stage) => handoff.includes(`**${stage}:**`)) &&
        normalizedHandoff.includes("does not prove the next") &&
        normalizedHandoff.includes("failed, abandoned, or burdensome handoffs"),
      evidence: "Six continuity states are defined without converting an earlier state into a later one."
    },
    "FC-006": {
      passed:
        letNycDance.includes("Council repealed") &&
        /do(?:es)? not establish sole legislative causality/i.test(letNycDance) &&
        talksNotRaids.includes("Local Law 220 of 2019") &&
        /do(?:es)? not establish sole legislative causality/i.test(talksNotRaids) &&
        talksNotRaids.includes("does not establish that every form of multi-agency nightlife enforcement ended"),
      evidence: "Campaign pages name supported participation and institutional outcomes without assigning individual causality."
    },
    "FC-007": {
      passed:
        decisions.every((item) => item.exists && item.data.kind === "decision") &&
        decisions.every((item) => decisionFields.every((field) => item.data[field] != null)) &&
        decisions.every((item) => item.data.projection_status === "never-public" && item.data.human_review_state === "not-requested"),
      evidence: `${decisions.filter((item) => item.exists).length}/${decisions.length} bounded decision records preserve the required fields and remain unprojected.`
    },
    "FC-008": {
      passed:
        PRIVATE_PATTERNS.every((pattern) => !pattern.test(allRequiredText)) &&
        adr.includes("No public Knowledge Wiki route") &&
        evaluation.includes("Automated success cannot approve") &&
        evaluation.includes("selective projection"),
      evidence: "Closure records contain no protected locators and retain the no-route, public-safe, selective-projection boundary."
    },
    "FC-009": {
      passed:
        (tests.match(/mutation rejects/g) ?? []).length >= 10 &&
        adr.includes("Review packet 1") &&
        adr.includes("Review packet 2") &&
        adr.includes("Review packet 3"),
      evidence: `${(tests.match(/mutation rejects/g) ?? []).length} adversarial mutations and three bounded review packets are defined.`
    },
    "FC-010": {
      passed:
        state.contract === "knowledge-wiki-family-closure-v1" &&
        state.candidateFingerprint === `sha256:${fingerprint.digest}` &&
        state.automatedDecision === "pass" &&
        Object.values(state.humanGates ?? {}).every((value) => value === "open"),
      evidence: state.candidateFingerprint
        ? `Bound state ${state.candidateFingerprint}; current candidate sha256:${fingerprint.digest}.`
        : `No bound state; current candidate sha256:${fingerprint.digest}.`
    }
  };

  return { checks, fingerprint, pages, decisions };
}
