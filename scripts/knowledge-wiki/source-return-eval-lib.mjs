import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import matter from "gray-matter";
import { authorityRegistry, REPO_ROOT } from "./lib.mjs";

export const REQUIRED_SOURCE_RETURN_PAGES = [
  ["docs/knowledge-wiki/projects/wowlist.md", "project.wowlist"],
  ["docs/knowledge-wiki/projects/kc-town-hall.md", "project.kc-town-hall"],
  ["docs/knowledge-wiki/projects/fair-rent-nyc.md", "project.fair-rent-nyc"],
  ["docs/knowledge-wiki/projects/participatory-public-practice.md", "project.participatory-public-practice"],
  ["docs/knowledge-wiki/timelines/participation-infrastructure-lineage.md", "timeline.participation-infrastructure-lineage"],
  ["docs/knowledge-wiki/methods/being-there-to-operating-structure.md", "method.being-there-to-operating-structure"],
  ["docs/knowledge-wiki/capabilities/civic-interface.md", "capability.civic-interface"],
  ["docs/knowledge-wiki/capabilities/handoff-adoption-continuity.md", "capability.handoff-adoption-continuity"],
  ["docs/knowledge-wiki/indexes/evidence-debt-and-promotion-queue.md", "index.evidence-debt-promotion-queue"],
  ["docs/knowledge-wiki/timelines/selected-practice-chronology.md", "timeline.selected-practice-chronology"]
];

const INDEX_PATHS = [
  "docs/knowledge-wiki/README.md",
  "docs/knowledge-wiki/indexes/projects.md",
  "docs/knowledge-wiki/indexes/capabilities-and-opportunities.md",
  "docs/knowledge-wiki/indexes/open-questions.md"
];

const REQUIRED_SECTIONS = [
  "## Orientation",
  "## Present Reading",
  "## Source Return",
  "## Known / Open / Protected",
  "## Next Research"
];

const SOURCE_CLASS_MARKERS = [
  "WOW List production dump",
  "Sunday Dinner workbook",
  "KC Town Hall municipal proposal packet",
  "Commercial Rent Stabilization running minutes",
  "Commercial Rent Stabilization provenance redline",
  "New York City Council transcript",
  "Open House article",
  "Kansas City Star raft feature",
  "NTER CHNG archived site"
];

const PRIVATE_PATTERNS = [
  /\/Users\//i,
  /\/Volumes\//i,
  /Mobile Documents/i,
  /supporting-materials/i,
  /file:\/\//i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /AKIA[0-9A-Z]{16}/
];

const read = (root, path) => readFileSync(resolve(root, path), "utf8");

function hasValidCanonicalAuthorities(refs, authorities) {
  return (
    Array.isArray(refs) &&
    refs.length > 0 &&
    refs.every(
      (ref) =>
        typeof ref?.domain === "string" &&
        typeof ref?.id === "string" &&
        authorities.get(ref.domain)?.has(ref.id)
    )
  );
}

export function evaluateSourceReturn({ repoRoot = REPO_ROOT } = {}) {
  const authorities = authorityRegistry();
  const pageResults = REQUIRED_SOURCE_RETURN_PAGES.map(([path, id]) => {
    const absolute = resolve(repoRoot, path);
    if (!existsSync(absolute)) return { path, id, exists: false, text: "", data: {} };
    const text = read(repoRoot, path);
    const parsed = matter(text);
    return { path, id, exists: true, text, data: parsed.data };
  });
  const pageText = pageResults.map((page) => page.text).join("\n");
  const indexText = INDEX_PATHS.filter((path) => existsSync(resolve(repoRoot, path)))
    .map((path) => read(repoRoot, path))
    .join("\n");
  const runPath = "docs/knowledge-wiki/research-runs/missing-pages-return-to-source-2026.md";
  const evaluationPath = "docs/knowledge-wiki/evaluations/missing-pages-and-source-return.md";
  const queuePath = "docs/knowledge-wiki/indexes/evidence-debt-and-promotion-queue.md";
  const testPath = "scripts/tests/knowledge-wiki-source-return.test.mjs";
  const run = existsSync(resolve(repoRoot, runPath)) ? read(repoRoot, runPath) : "";
  const runData = run ? matter(run).data : {};
  const evaluation = existsSync(resolve(repoRoot, evaluationPath)) ? read(repoRoot, evaluationPath) : "";
  const queue = existsSync(resolve(repoRoot, queuePath)) ? read(repoRoot, queuePath) : "";
  const testSource = existsSync(resolve(repoRoot, testPath)) ? read(repoRoot, testPath) : "";
  const sourceRows = run.split("\n").filter((line) => /^\| [^|-].* \|$/.test(line)).length;
  const combined = [pageText, run, evaluation, queue].join("\n");

  const checks = {
    "SR-001": {
      passed:
        pageResults.length === 10 &&
        pageResults.every((page) => page.exists && page.data.id === page.id),
      evidence: `${pageResults.filter((page) => page.exists && page.data.id === page.id).length}/10 approved pages exist with stable IDs.`
    },
    "SR-002": {
      passed: pageResults.every(
        (page) =>
          REQUIRED_SECTIONS.every((section) => page.text.includes(section)) &&
          hasValidCanonicalAuthorities(page.data.authority_refs, authorities) &&
          page.text.includes("**Establishes:**") &&
          page.text.includes("**Does not establish:**") &&
          page.text.includes("missing-pages-return-to-source-2026.md")
      ),
      evidence: "Each page carries valid canonical authority, reader orientation, present reading, source return, support and non-support, protected boundaries, and next research."
    },
    "SR-003": {
      passed: pageResults.every((page) => indexText.includes(page.path.split("/").at(-1))),
      evidence: "Every approved page is linked from the Wiki start page or an edited task-oriented index."
    },
    "SR-004": {
      passed:
        run.includes("## Coverage Declaration") &&
        run.includes("## Present-Tense Reading") &&
        run.includes("## What Changed") &&
        run.includes("## What The Sources Do Not Establish") &&
        run.includes("## Librarian Questions") &&
        hasValidCanonicalAuthorities(runData.authority_refs, authorities) &&
        sourceRows >= 9 &&
        SOURCE_CLASS_MARKERS.every((marker) => run.includes(marker)),
      evidence: `${sourceRows} source-class rows and valid canonical authorities declare access position, fresh finding, and carried boundary.`
    },
    "SR-005": {
      passed:
        PRIVATE_PATTERNS.every((pattern) => !pattern.test(combined)) &&
        run.includes("No person-level row") &&
        /does\s+not\s+by\s+itself\s+make\s+a\s+source\s+public-safe/.test(run) &&
        pageResults.every((page) => page.text.includes("- **Protected:**")),
      evidence: "No private locator pattern is present; aggregate-only, rights, consent, and protected-record boundaries are explicit."
    },
    "SR-006": {
      passed:
        matter(evaluation).data.human_review_state === "not-requested" &&
        evaluation.includes("A passing machine score must not change that state") &&
        run.includes("## Librarian Questions") &&
        run.includes("What source does Jamie remember"),
      evidence: "The machine score leaves librarian, collaborator, rights, consent, and editorial judgment open."
    },
    "SR-007": {
      passed:
        queue.includes("### Priority 1: Role And Handoff Corroboration") &&
        queue.includes("### Priority 4: Chronology And Counterevidence") &&
        queue.includes("## Promotion Rule") &&
        run.includes("## Re-Entry Rule") &&
        run.includes("source, claim, inquiry, correction") &&
        pageResults.every((page) => page.text.includes("## Next Research")),
      evidence: "Unresolved work stays visible and must re-enter through the governed lifecycle."
    },
    "SR-008": {
      passed:
        testSource.includes("baseline source-return candidate passes") &&
        (testSource.match(/mutation rejects/g) ?? []).length >= 9,
      evidence: `${(testSource.match(/mutation rejects/g) ?? []).length} adversarial mutation cases are present.`
    }
  };

  return { checks, pageResults, sourceRows };
}
