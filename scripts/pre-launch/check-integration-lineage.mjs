import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const manifestPath = path.join(repoRoot, "evals/pre-launch/integration-C.json");

export const lockedSources = new Map([
  ["feature/pre-launch-A", ["7deec7be0499e3387bbe6acf52758e6c7e133904", "reviewed-lineage"]],
  ["feature/pre-launch-B", ["da7a2a290301e055ca99a316961f75f9fbeee4ed", "reviewed-lineage"]],
  ["feature/pre-launch-C", ["945cd984b0e2b40c745b95b18d87f9e8768db0bf", "product-base"]],
  ["feature/pre-launch-D", ["28178266175a4b94befa89b7c268a44d16658880", "reviewed-lineage"]],
  ["feature/pre-launch-E", ["3c36070db597a8b001aca404b0343d78d6f14b96", "reviewed-lineage"]],
  ["feature/knowledge-ecosystem-rfc-C", ["2af96c8044f1a0c70a610b8f81c4ba5b680df883", "substantive-merge"]],
  ["agent/jamie-knowledge-ecosystem-rfc", ["166fc2ac920a112d76114703b80a5cf00536e90b", "substantive-merge"]],
  ["feature/professional-record-C", ["c12a69476cb62f17baf1bcd10a5ffff6e8f84dcb", "substantive-merge"]]
]);

function gitAncestor(head) {
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", head, "HEAD"], {
      cwd: repoRoot,
      stdio: "ignore"
    });
    return true;
  } catch {
    return false;
  }
}

export function evaluateIntegration(manifest, options = {}) {
  const isAncestor = options.isAncestor ?? gitAncestor;
  const pathExists = options.pathExists ?? ((relativePath) => existsSync(path.join(repoRoot, relativePath)));
  const activeRfcNames = options.activeRfcNames ?? readdirSync(path.join(repoRoot, "rfcs"));
  const sources = new Map((manifest.sources ?? []).map((source) => [source.branch, source]));
  const exactSources =
    sources.size === lockedSources.size &&
    [...lockedSources].every(([branch, [head, mode]]) => {
      const source = sources.get(branch);
      return source?.head === head && source?.mode === mode;
    });
  const exactBase =
    manifest.productBase?.branch === "feature/pre-launch-C" &&
    manifest.productBase?.head === lockedSources.get("feature/pre-launch-C")[0] &&
    manifest.productBase?.mode === "product-base";
  const ancestry = exactSources && [...sources.values()].every((source) => isAncestor(source.head));
  const requiredPaths =
    Array.isArray(manifest.requiredPaths) &&
    manifest.requiredPaths.length >= 9 &&
    manifest.requiredPaths.every(pathExists);
  const canonicalRfc =
    activeRfcNames.filter((name) => /^0004-.*\.md$/.test(name)).length === 1 &&
    pathExists("rfcs/0004-jamie-burkart-sourcebook-and-knowledge-ecosystem.md") &&
    pathExists("rfcs/history/0004-initial-proposal-knowledge-ecosystem-and-public-source-editions.md") &&
    pathExists("rfcs/history/0004-professional-record-implementation-snapshot.md");
  const gates = manifest.humanGates ?? {};
  const humanAuthority =
    gates.productionApproval === "open" &&
    gates.productionDeployment === "not-performed" &&
    gates.productionIndexing === "not-authorized" &&
    gates.photoRightsAndConsent === "separate-human-review" &&
    gates.collaboratorCreditAndCorrection === "separate-human-review" &&
    gates.candidateBoundSemanticReview === "must-be-regenerated-after-candidate-change";
  const decision = manifest.publicSurfaceDecision ?? "";
  const boundedComposition =
    /Retain feature\/pre-launch-C/.test(decision) &&
    /Preserve A, B, D, and E as reviewed Git ancestry/.test(decision) &&
    /non-public knowledge infrastructure/.test(decision);

  const checks = {
    exact_source_population_and_heads: exactSources,
    feature_pre_launch_c_is_the_exact_product_base: exactBase,
    every_frozen_head_is_reachable_from_the_candidate: ancestry,
    integrated_capabilities_are_materialized: requiredPaths,
    one_canonical_rfc_preserves_both_historical_snapshots: canonicalRfc,
    public_composition_decision_is_bounded_and_explicit: boundedComposition,
    human_release_authority_remains_open: humanAuthority
  };
  return { passed: Object.values(checks).every(Boolean), checks };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const result = evaluateIntegration(manifest);
  for (const [name, passed] of Object.entries(result.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
  }
  if (!result.passed) process.exit(1);
}
