import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import matter from "gray-matter";
import { authorityRegistry, REPO_ROOT } from "./lib.mjs";

export const REQUIRED_EDITORIAL_DEPTH_PAGES = [
  ["docs/knowledge-wiki/methods/identity-systems-as-shared-infrastructure.md", "method.identity-systems-as-shared-infrastructure"],
  ["docs/knowledge-wiki/methods/learning-through-making.md", "method.learning-through-making"],
  ["docs/knowledge-wiki/indexes/places-where-work-became-real.md", "index.places-where-work-became-real"],
  ["docs/knowledge-wiki/methods/what-is-at-stake-for-me.md", "method.what-is-at-stake-for-me"]
];

const REQUIRED_INDEX_LINKS = [
  ["docs/knowledge-wiki/indexes/capabilities-and-opportunities.md", "identity-systems-as-shared-infrastructure.md"],
  ["docs/knowledge-wiki/indexes/capabilities-and-opportunities.md", "learning-through-making.md"],
  ["docs/knowledge-wiki/indexes/projects.md", "places-where-work-became-real.md"],
  ["docs/knowledge-wiki/indexes/capabilities-and-opportunities.md", "what-is-at-stake-for-me.md"]
];

const REQUIRED_SECTIONS = [
  "## Orientation",
  "## Source Return",
  "## Known / Open / Protected",
  "## Next Research"
];

const PRIVATE_PATTERNS = [
  /\/Users\//i,
  /\/Volumes\//i,
  /Mobile Documents/i,
  /supporting-materials/i,
  /file:\/\//i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /AKIA[0-9A-Z]{16}/,
  /\b0120470\b/
];

const read = (root, path) => readFileSync(resolve(root, path), "utf8");
const normalize = (value) => value.replace(/\s+/g, " ");

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

export function evaluateEditorialDepth({ repoRoot = REPO_ROOT } = {}) {
  const authorities = authorityRegistry();
  const pageResults = REQUIRED_EDITORIAL_DEPTH_PAGES.map(([path, id]) => {
    const absolute = resolve(repoRoot, path);
    if (!existsSync(absolute)) return { path, id, exists: false, text: "", data: {} };
    const text = read(repoRoot, path);
    const parsed = matter(text);
    return { path, id, exists: true, text, data: parsed.data };
  });
  const byId = new Map(pageResults.map((page) => [page.id, page]));
  const identity = byId.get("method.identity-systems-as-shared-infrastructure");
  const learning = byId.get("method.learning-through-making");
  const places = byId.get("index.places-where-work-became-real");
  const stakes = byId.get("method.what-is-at-stake-for-me");
  const identityText = normalize(identity?.text ?? "");
  const learningText = normalize(learning?.text ?? "");
  const placesText = normalize(places?.text ?? "");
  const stakesText = normalize(stakes?.text ?? "");
  const runPath = "docs/knowledge-wiki/research-runs/editorial-depth-source-return-2026.md";
  const evaluationPath = "docs/knowledge-wiki/evaluations/editorial-depth.md";
  const testPath = "scripts/tests/knowledge-wiki-editorial-depth.test.mjs";
  const run = existsSync(resolve(repoRoot, runPath)) ? read(repoRoot, runPath) : "";
  const runData = run ? matter(run).data : {};
  const evaluation = existsSync(resolve(repoRoot, evaluationPath)) ? read(repoRoot, evaluationPath) : "";
  const testSource = existsSync(resolve(repoRoot, testPath)) ? read(repoRoot, testPath) : "";
  const combined = [pageResults.map((page) => page.text).join("\n"), run, evaluation].join("\n");

  const checks = {
    "ED-001": {
      passed: pageResults.length === 4 && pageResults.every((page) => page.exists && page.data.id === page.id),
      evidence: `${pageResults.filter((page) => page.exists && page.data.id === page.id).length}/4 editorial-depth pages exist with stable IDs.`
    },
    "ED-002": {
      passed: pageResults.every(
        (page) =>
          REQUIRED_SECTIONS.every((section) => page.text.includes(section)) &&
          hasValidCanonicalAuthorities(page.data.authority_refs, authorities) &&
          page.text.includes("**Establishes:**") &&
          page.text.includes("**Does not establish:**") &&
          page.text.includes("editorial-depth-source-return-2026.md")
      ),
      evidence: "Each page carries valid canonical authority, source return, support and non-support, protected boundaries, and next research."
    },
    "ED-003": {
      passed:
        identityText.includes("Keep the contribution types separate:") &&
        identityText.includes("identity and account establishment") &&
        identityText.includes("authorship of a particular post or artifact") &&
        identityText.includes("ownership of the collective project or its outcomes") &&
        identityText.includes("## Media And Typeface Boundary") &&
        identityText.includes("Publication requires separate authorship, license") &&
        identityText.includes("Proprietary or private font files remain outside the repository"),
      evidence: "Identity establishment, artifact authorship, collective ownership, media rights, and private-font handling remain distinct."
    },
    "ED-004": {
      passed:
        learningText.includes("strong analytical writing") &&
        learningText.includes("embodied projects outpaced the assigned essay form") &&
        learningText.includes("Learning through making is not an excuse to avoid writing") &&
        learningText.includes("**Protected:** grades, student identifiers, raw narrative evaluations") &&
        learningText.includes("**Does not establish:** production deployment of classroom prototypes") &&
        PRIVATE_PATTERNS.every((pattern) => !pattern.test(learningText)),
      evidence: "The page preserves the making/writing tension while excluding raw academic records, identifiers, and deployment inflation."
    },
    "ED-005": {
      passed:
        [
          "### Galleries And Shared Domestic Space",
          "### Waterways And Moving Public Space",
          "### Kitchens And Recurring Tables",
          "### Small Cultural Spaces",
          "### Streets And Neighborhood Routes",
          "### Construction Sites"
        ].every((section) => placesText.includes(section)) &&
        placesText.includes("does not turn neighborhood testimony into Jamie's property") &&
        placesText.includes("**Does not establish:** present-day access or safety") &&
        placesText.includes("## Place And Person Boundary") &&
        placesText.includes("No person becomes evidentiary texture"),
      evidence: "Six situated contexts remain distinct, with explicit access, safety, testimony, privacy, and consent boundaries."
    },
    "ED-006": {
      passed:
        stakes?.data.status === "draft" &&
        stakes.data.projection_status === "pending" &&
        stakes.data.human_review_state === "requested" &&
        stakesText.includes("**Authorship status:** This is an AI-assisted first-person draft") &&
        stakesText.includes("It awaits Jamie's line-by-line review") &&
        stakesText.includes("Only Jamie may resolve this page's authorship review") &&
        stakesText.includes("it may not approve the voice, emotional truth, or public projection"),
      evidence: "The first-person draft remains visibly AI-assisted, pending, and resolvable only by Jamie."
    },
    "ED-007": {
      passed:
        REQUIRED_INDEX_LINKS.every(
          ([path, filename]) =>
            existsSync(resolve(repoRoot, path)) && read(repoRoot, path).includes(filename)
        ) &&
        run.includes("## Coverage Declaration") &&
        run.includes("## Present-Tense Reading") &&
        run.includes("## What Changed") &&
        run.includes("## What The Sources Do Not Establish") &&
        run.includes("## Protected Handling") &&
        run.includes("## Librarian Questions") &&
        run.includes("## Re-Entry Rule") &&
        run.includes("no machine command may resolve that gate") &&
        hasValidCanonicalAuthorities(runData.authority_refs, authorities) &&
        PRIVATE_PATTERNS.every((pattern) => !pattern.test(combined)),
      evidence: "All pages are indexed; the fresh source-return receipt preserves protection, librarian questions, re-entry, and valid authority."
    },
    "ED-008": {
      passed:
        testSource.includes("baseline editorial-depth candidate passes") &&
        (testSource.match(/mutation rejects/g) ?? []).length >= 12,
      evidence: `${(testSource.match(/mutation rejects/g) ?? []).length} adversarial mutation cases are present.`
    }
  };

  return { checks, pageResults };
}
