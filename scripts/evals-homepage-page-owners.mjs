import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configRelativePath = "evals/page-owners/homepage.json";

function read(root, relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

export function homepagePageOwnerSurfaceDigest(root = defaultRoot, config) {
  const candidate = config ?? JSON.parse(read(root, configRelativePath));
  const hash = createHash("sha256");
  hash.update("homepage-public-surface-v1\0");
  for (const relativePath of [...candidate.target.files].sort()) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(read(root, relativePath).replace(/\r\n/g, "\n"));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function evaluateHomepagePageOwners(
  root = defaultRoot,
  { deterministicOnly = false } = {}
) {
  const failures = [];
  const config = JSON.parse(read(root, configRelativePath));
  const pageSource = read(root, "apps/www/src/app/page.tsx");
  const heroSource = read(root, "apps/www/src/components/Hero.tsx");
  const workCardSource = read(root, "apps/www/src/components/WorkCard.tsx");
  const digest = homepagePageOwnerSurfaceDigest(root, config);
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };

  check(config.schemaVersion === 1, "schemaVersion must be 1");
  check(config.target.route === "/", "target route changed");
  check(config.policy.deterministicChecksBeforeLlm === true, "deterministic checks must precede advisory simulations");
  check(config.policy.stopOnDeterministicFailure === true, "advisory simulations must stop after deterministic failure");
  check(config.policy.allOwnersMustAccept === true, "all configured owners must accept the page");
  check(config.policy.exactSurfaceDigestRequired === true, "advisory results must bind to the exact rendered surface");
  check(config.policy.calibrationStatus === "uncalibrated-advisory-simulation", "calibration boundary changed");
  check(config.policy.humanPublicationAuthorityRequired === true, "human publication authority must remain explicit");
  check(config.homepageComposition?.allFeaturedProjectsVisible === true, "all featured projects must remain on the homepage");
  check(config.homepageComposition?.selectedWorkBeforeCapabilities === true, "selected work must precede the capability taxonomy");
  check(config.homepageComposition?.compactHomepageWorkCards === true, "homepage work cards must use the compact presentation");
  check(config.homepageComposition?.oneHeroSupportParagraph === true, "the hero must have one support paragraph");
  check(config.homepageComposition?.directCaseStudyLinks === true, "compact cards must retain direct case-study links");
  check(config.publicPageBoundary?.publicPageOnly === true, "owners may inspect only the public page");
  check(config.publicPageBoundary?.repositoryAccess === false, "owners cannot inspect the repository");
  check(config.publicPageBoundary?.privateSources === false, "owners cannot inspect private sources");
  check(config.publicPageBoundary?.namedOwnersVisibleOnPublicPage === false, "owner names must not imply public participation");
  check(/not .*participation.*sign-off/i.test(config.nonEndorsementBoundary ?? ""), "non-endorsement boundary is required");
  check(config.captureContract?.desktopViewport?.width === 1440, "desktop capture width must remain 1440");
  check(config.captureContract?.mobileViewport?.width === 390, "mobile capture width must remain 390");
  check(config.captureContract?.fullPage === true, "owners must receive the full homepage");
  check(config.captureContract?.publicTextRequired === true, "owners must receive extracted public text");
  check(config.captureContract?.repositoryAccessDuringJudging === false, "repository access during judging is forbidden");
  check(config.owners.length === 4, "the homepage requires exactly four page-owner lenses");
  check(
    pageSource.indexOf("<WorkCard") < pageSource.indexOf("<CapabilityGrid"),
    "selected work must appear before the capability taxonomy"
  );
  check(
    /<WorkCard\s+compact\s+item=/.test(pageSource),
    "the homepage must request compact work cards"
  );
  check(
    !heroSource.includes("jb-hero-summary-mobile") && !heroSource.includes("jb-hero-summary-wide"),
    "the hero must not carry duplicate responsive support paragraphs"
  );
  check(
    /compact\??:\s*boolean/.test(workCardSource) && /Read the \$\{item\.title\} case study/.test(workCardSource),
    "compact work cards must retain project-specific case-study links"
  );

  const ownerIds = config.owners.map((owner) => owner.id);
  check(new Set(ownerIds).size === config.owners.length, "owner ids must be unique");
  check(new Set(config.owners.map((owner) => owner.criterion)).size === config.owners.length, "owner criteria must be distinct");
  check(new Set(config.owners.map((owner) => owner.ownedFailureMode)).size === config.owners.length, "owner failure modes must be distinct");
  for (const relativePath of config.target.files) {
    check(existsSync(path.join(root, relativePath)), `target file does not exist: ${relativePath}`);
  }
  for (const owner of config.owners) {
    check(typeof owner.name === "string" && owner.name.trim(), `${owner.id}: owner name is required`);
    check(typeof owner.ownedFailureMode === "string" && owner.ownedFailureMode.trim(), `${owner.id}: owned failure mode is required`);
    check(typeof owner.criterion === "string" && owner.criterion.trim(), `${owner.id}: criterion is required`);
    check(typeof owner.acceptanceQuestion === "string" && owner.acceptanceQuestion.trim(), `${owner.id}: acceptance question is required`);
    check(Array.isArray(owner.publicContextUrls) && owner.publicContextUrls.length > 0, `${owner.id}: public context URL is required`);
    check(owner.publicContextUrls.every((url) => /^https:\/\//.test(url)), `${owner.id}: public context must use HTTPS`);
    check(typeof owner.resultPath === "string" && owner.resultPath.endsWith(".json"), `${owner.id}: result path is required`);
  }
  for (const forbidden of config.forbiddenPublicStrings) {
    check(!pageSource.includes(forbidden), `named advisory owner appears on the public page: ${forbidden}`);
  }

  const deterministicPassed = failures.length === 0;
  if (deterministicOnly || !deterministicPassed) {
    return {
      passed: deterministicPassed,
      deterministicPassed,
      allOwnersAccepted: deterministicOnly ? null : false,
      surfaceDigest: digest,
      ownerIds,
      failures
    };
  }

  for (const owner of config.owners) {
    const resultPath = path.join(root, owner.resultPath);
    if (!existsSync(resultPath)) {
      failures.push(`${owner.id}: advisory result is missing`);
      continue;
    }
    const result = JSON.parse(read(root, owner.resultPath));
    check(result.schemaVersion === 1, `${owner.id}: result schemaVersion must be 1`);
    check(result.ownerId === owner.id, `${owner.id}: result owner binding changed`);
    check(result.ownerName === owner.name, `${owner.id}: result owner name changed`);
    check(result.surfaceDigest === digest, `${owner.id}: result does not bind to the exact public surface`);
    check(result.acceptanceQuestion === owner.acceptanceQuestion, `${owner.id}: acceptance question changed`);
    check(result.simulatedPublicFigureLens === true, `${owner.id}: simulation disclosure is required`);
    check(result.calibrationStatus === "uncalibrated-advisory-simulation", `${owner.id}: calibration boundary changed`);
    check(result.inputScope?.publicPageOnly === true, `${owner.id}: only the public page may be inspected`);
    check(result.inputScope?.repositoryAccess === false, `${owner.id}: repository access is forbidden`);
    check(result.inputScope?.privateSources === false, `${owner.id}: private-source access is forbidden`);
    check(/not .*participation.*sign-off/i.test(result.nonEndorsementBoundary ?? ""), `${owner.id}: non-endorsement boundary is missing`);
    check(typeof result.critique === "string" && result.critique.trim(), `${owner.id}: critique is required`);
    check(Array.isArray(result.strengths) && result.strengths.length > 0, `${owner.id}: strengths are required`);
    check(Array.isArray(result.constructiveCriticism), `${owner.id}: constructive criticism must be an array`);
    check(result.result === "pass" && result.accepted === true, `${owner.id}: advisory owner did not accept the page`);
  }

  const allOwnersAccepted = failures.length === 0;
  return {
    passed: deterministicPassed && allOwnersAccepted,
    deterministicPassed,
    allOwnersAccepted,
    surfaceDigest: digest,
    ownerIds,
    failures
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const deterministicOnly = process.argv.includes("--deterministic-only");
    const report = evaluateHomepagePageOwners(defaultRoot, { deterministicOnly });
    process.stdout.write(`${JSON.stringify(report)}\n`);
    if (!report.passed) process.exitCode = 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
