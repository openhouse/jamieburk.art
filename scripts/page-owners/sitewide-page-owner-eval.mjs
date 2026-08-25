import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export const registryPath = "evals/page-owners/sitewide.json";

function readJson(relativePath) {
  return JSON.parse(readFileSync(relativePath, "utf8"));
}

function canonicalRoutes({ sitemapSource, workSource }) {
  const staticBlock = sitemapSource.match(/const staticRoutes = \[([\s\S]*?)\];/)?.[1] ?? "";
  const staticRoutes = [...staticBlock.matchAll(/"(\/[^"]*)"/g)].map((match) => match[1]);
  const workRoutes = [...workSource.matchAll(/\n\s*slug: "([^"]+)"/g)]
    .map((match) => `/work/${match[1]}`);
  return [...new Set([...staticRoutes, ...workRoutes])].sort();
}

function findOwner(registry, ownerId) {
  const reference = registry.ownerCatalog?.[ownerId];
  if (!reference || !existsSync(reference.contractPath)) return null;
  const contract = readJson(reference.contractPath);
  return contract.owners?.find((owner) => owner.id === reference.ownerId) ?? null;
}

function modeledReviewIsInspectable(page) {
  if (page.review?.status !== "advisory-pass") return true;
  if (!page.review.contractPath || !page.review.runPath) return false;
  if (!existsSync(page.review.contractPath) || !existsSync(page.review.runPath)) return false;
  const contract = readJson(page.review.contractPath);
  const run = readJson(page.review.runPath);
  const contractOwnerIds = new Set(contract.owners?.map((owner) => owner.id));
  const resultOwnerIds = new Set(run.results?.map((result) => result.ownerId));
  return contract.targetRoute === page.route &&
    run.targetRoute === page.route &&
    run.verdict === "pass" &&
    page.ownerIds.every((ownerId) => contractOwnerIds.has(ownerId) && resultOwnerIds.has(ownerId)) &&
    run.results.length === page.ownerIds.length &&
    run.results.every((result) => result.result === "pass" &&
      typeof result.critique === "string" && result.critique.trim().length > 0 &&
      typeof result.recommendedRevision === "string" && result.recommendedRevision.trim().length > 0);
}

function readPublicSurfaceText() {
  return ["apps/www/src/app", "apps/www/src/content/work"]
    .flatMap((root) => readdirSync(root, { recursive: true })
      .map((entry) => path.join(root, entry))
      .filter((entry) => /(?:page\.tsx|\.mdx)$/.test(entry)))
    .map((entry) => readFileSync(entry, "utf8"))
    .join("\n");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sha256(relativePath) {
  return createHash("sha256").update(readFileSync(relativePath)).digest("hex");
}

export function evaluateSitewidePageOwners({
  registry = readJson(registryPath),
  sitemapSource = readFileSync(registry.canonicalRouteSources.staticRoutesPath, "utf8"),
  workSource = readFileSync(registry.canonicalRouteSources.workItemsPath, "utf8"),
  publicSurfaceText = readPublicSurfaceText(),
  developmentRun = readJson(registry.latestDevelopmentRunPath)
} = {}) {
  const canonical = canonicalRoutes({ sitemapSource, workSource });
  const registered = registry.pages?.map((page) => page.route).sort() ?? [];
  const failures = [];
  const minimumOwners = registry.passPolicy?.minimumDistinctOwnersPerPage ?? 0;
  const allowedReviewStatuses = new Set(["queued", "advisory-pass"]);

  if (new Set(registered).size !== registered.length) failures.push("duplicate_page_routes");
  if (JSON.stringify(registered) !== JSON.stringify(canonical)) failures.push("canonical_page_inventory_coverage");
  if (registry.execution?.oneTaskPerOwnerPerPage !== true) failures.push("one_isolated_task_per_owner_per_page");
  if (registry.execution?.renderedPageOnly !== true || registry.execution?.repositoryAccess !== false || registry.execution?.privateSourceAccess !== false) {
    failures.push("rendered_public_surface_only");
  }
  if (registry.execution?.priorOwnerOutputVisible !== false || registry.execution?.tasksRunSequentially !== true) failures.push("owner_reviews_are_isolated");
  if (registry.execution?.realPeopleParticipated !== false || registry.calibration?.realWorldApprovalClaimed !== false) failures.push("no_false_real_world_participation_or_approval");
  if (JSON.stringify(registry.execution?.outputOrder) !== JSON.stringify(["critique", "recommendedRevision", "result"])) failures.push("critique_precedes_binary_verdict");
  if (registry.passPolicy?.allOwnersMustPass !== true || registry.passPolicy?.averagingAllowed !== false) failures.push("unanimous_acceptance_without_averaging");
  if (registry.passPolicy?.constructiveCritiqueRequired !== true) failures.push("constructive_critique_required");
  if (registry.passPolicy?.candidateChangeMakesAcceptanceStale !== true) failures.push("exact_candidate_acceptance_required");
  if (registry.calibration?.status !== "required" || registry.calibration?.releaseAuthority !== "advisory-until-calibrated") failures.push("uncalibrated_modeled_results_remain_advisory");
  if (registry.humanAuthority?.publicationOwner !== "Jamie Burkart" || registry.humanAuthority?.modeledPassAuthorizesDeployment !== false || registry.humanAuthority?.modeledPassAuthorizesIndexing !== false) failures.push("jamie_retains_release_authority");

  const expectedArtifactHashes = {
    registrySha256: sha256(registryPath),
    evaluatorSha256: sha256("scripts/page-owners/sitewide-page-owner-eval.mjs"),
    testsSha256: sha256("scripts/page-owners/sitewide-page-owner-eval.test.mjs"),
    instructionsSha256: sha256("docs/evals/page-owner-editorial-gates.md")
  };
  if (Object.entries(expectedArtifactHashes).some(([key, value]) => developmentRun.candidateArtifacts?.[key] !== value)) {
    failures.push("latest_governance_run_matches_artifacts");
  }

  const ownerNames = [...new Set(Object.keys(registry.ownerCatalog ?? {})
    .map((ownerId) => findOwner(registry, ownerId)?.name)
    .filter(Boolean))];
  const falseEndorsement = ownerNames.some((name) => new RegExp(
    `${escapeRegex(name)}.{0,40}(?:approved|endorsed|signed[ -]?off|owns? this page)`,
    "i"
  ).test(publicSurfaceText));
  if (falseEndorsement) failures.push("public_surface_avoids_false_endorsement");

  for (const page of registry.pages ?? []) {
    const distinctOwners = new Set(page.ownerIds ?? []);
    if (distinctOwners.size < minimumOwners) failures.push(`minimum_distinct_owners:${page.route}`);
    if ([...distinctOwners].some((ownerId) => !findOwner(registry, ownerId))) failures.push(`owner_contract_missing:${page.route}`);
    if (!page.readerJob?.trim()) failures.push(`reader_job_missing:${page.route}`);
    if (!allowedReviewStatuses.has(page.review?.status)) failures.push(`review_status_invalid:${page.route}`);
    if (!modeledReviewIsInspectable(page)) failures.push(`modeled_acceptance_not_inspectable:${page.route}`);
  }

  const acceptedPages = (registry.pages ?? []).filter((page) => page.review?.status === "advisory-pass");
  const queuedPages = (registry.pages ?? []).filter((page) => page.review?.status === "queued");
  return {
    pass: failures.length === 0,
    failures,
    canonicalPageCount: canonical.length,
    assignedPageCount: registered.filter((route) => canonical.includes(route)).length,
    acceptedPageCount: acceptedPages.length,
    queuedPageCount: queuedPages.length,
    sitewideAcceptance: failures.length === 0 && queuedPages.length === 0 ? "advisory-pass" : "incomplete",
    humanPublicationAuthority: registry.humanAuthority?.publicationOwner
  };
}

export function evaluateRepository() {
  return evaluateSitewidePageOwners();
}

if (process.argv[1]?.endsWith("sitewide-page-owner-eval.mjs")) {
  const result = evaluateRepository();
  const requireAllAccepted = process.argv.includes("--require-all-accepted");
  if (!result.pass) {
    console.error("Site-wide page-owner governance preflight failed:");
    for (const failure of result.failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  if (requireAllAccepted && result.sitewideAcceptance !== "advisory-pass") {
    console.error(`Site-wide modeled acceptance remains incomplete: ${result.acceptedPageCount}/${result.canonicalPageCount} pages accepted; ${result.queuedPageCount} queued.`);
    process.exit(1);
  }
  console.log(`Site-wide page-owner governance preflight passed: ${result.assignedPageCount}/${result.canonicalPageCount} canonical pages assigned; ${result.acceptedPageCount} modeled accepted; ${result.queuedPageCount} queued.`);
}
