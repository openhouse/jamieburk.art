import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const governedSourceIds = [
  "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
  "SRC-NYCAC-ADVOCACY-OPERATING-GUIDE-2017",
  "SRC-NYCAC-NIGHTLIFE-TOWN-HALL-RUN-OF-SHOW-2017",
  "SRC-NYCAC-FAIRRENT-WEB-CHECKLIST-2019",
  "SRC-NYCAC-MEETING-GOVERNANCE-ARTIFACTS-2017-2019"
];

const governedClaimIds = [
  "CLM-NYCAC-SHARED-FOLDER-ARCHIVAL-COVERAGE-2026",
  "CLM-NYCAC-ADVOCACY-OPERATING-PLAYBOOK-2017"
];

const publicArtifactPaths = [
  "apps/www/src/data/knowledge-bank/nycac-shared-folder-production-2026-07.ts",
  "docs/knowledge-bank/data/nycac-shared-folder-census-2026-07-19.json",
  "docs/knowledge-bank/sources/nycac-protected-shared-folder-census-2026.md",
  "docs/knowledge-bank/research-runs/nycac-shared-folder-2026-07-19.md",
  "docs/knowledge-bank/claims/nycac-advocacy-operating-playbook.md",
  "docs/knowledge-bank/applications/nycac-civic-product-operations.md",
  "docs/knowledge-bank/evaluations/nycac-shared-folder-production-2026-07-19.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition-2017.md"
];

const structuralPrivatePattern = /(?:drive\.google\.com|docs\.google\.com|resourcekey|\/Users\/|\/Volumes\/|\/private\/tmp|priority-docs|private-recursive-manifest)/i;

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function includesAll(value, fragments) {
  return fragments.every((fragment) => value.includes(fragment));
}

export function evaluateNycacSharedFolder(overrides = {}) {
  const census = overrides.census ?? readJson(
    "docs/knowledge-bank/data/nycac-shared-folder-census-2026-07-19.json"
  );
  const sources = overrides.sources ?? knowledgeBank.sources;
  const claims = overrides.claims ?? knowledgeBank.claims;
  const proofsSource = overrides.proofsSource ?? read("apps/www/src/data/proofs.ts");
  const applicationBrief = overrides.applicationBrief ?? read(
    "docs/knowledge-bank/applications/nycac-civic-product-operations.md"
  );
  const evaluationRecord = overrides.evaluationRecord ?? read(
    "docs/knowledge-bank/evaluations/nycac-shared-folder-production-2026-07-19.md"
  );
  const normalizedEvaluationRecord = evaluationRecord.replace(/\s+/g, " ");
  const publicCorpus = overrides.publicCorpus ?? publicArtifactPaths
    .map((relativePath) => read(relativePath))
    .join("\n");
  const criteria = [];

  function check(id, description, points, pass, evidence) {
    criteria.push({ id, description, points, pass: Boolean(pass), evidence });
  }

  const population = census.populationReconciliation ?? {};
  check(
    "NYCAC-ROOT-RECONCILIATION",
    "The 61-item root census reconciles exactly",
    8,
    population.rootItems === 61 &&
      population.rootFolders === 47 &&
      population.rootFiles === 14 &&
      population.rootItems === population.rootFolders + population.rootFiles,
    "Root item, folder, and file totals are fixed independently of the disposition ledger."
  );

  check(
    "NYCAC-POPULATION-CLOSURE",
    "Inventory, classification, and disposition close on the same 2,405-item population",
    14,
    population.populationTotal === 2405 &&
      population.inventoriedTotal === population.populationTotal &&
      population.classifiedTotal === population.populationTotal &&
      population.dispositionedTotal === population.populationTotal,
    "The proposal's four-way population equality is required."
  );

  const dispositionSum = Object.values(census.primaryDispositionCounts ?? {})
    .reduce((sum, value) => sum + value, 0);
  check(
    "NYCAC-DISPOSITION-CLOSURE",
    "Exactly one public-safe primary disposition is accounted for per item",
    12,
    dispositionSum === population.populationTotal &&
      census.primaryDispositionCounts?.["priority-content-reviewed"] === 63 &&
      census.primaryDispositionCounts?.["visual-rights-review"] === 1472 &&
      census.primaryDispositionCounts?.["document-review-deferred"] === 338,
    `Disposition counts sum to ${dispositionSum}.`
  );

  check(
    "NYCAC-CAPTURE-COVERAGE",
    "All 257 captured folders are represented with no access error",
    8,
    population.capturedFolders === 257 && population.accessErrors === 0,
    "Captured-folder and access-error totals come from the recursive authenticated census."
  );

  check(
    "NYCAC-PRIORITY-REVIEW",
    "The bounded content-review cohort retains its exact public-safe totals",
    8,
    census.priorityReview?.documents === 63 &&
      census.priorityReview?.characters === 351532 &&
      census.priorityReview?.semanticClusters?.length === 8,
    "Content review remains smaller than population accounting and is not publication clearance."
  );

  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const governedSources = governedSourceIds.map((id) => sourceById.get(id));
  check(
    "NYCAC-PROTECTED-SOURCE-GOVERNANCE",
    "Protected archive sources expose only opaque locators and public-safe summaries",
    12,
    governedSources.every((source) =>
      source?.visibility === "protected" &&
      source?.preservationStatus === "private" &&
      !source?.canonicalUrl &&
      /^VAULT-NYCAC-[A-Z0-9-]+$/.test(source?.protectedLocatorId ?? "") &&
      Boolean(source?.publicCitation) &&
      (source?.doesNotEstablish?.length ?? 0) >= 3
    ),
    "Five governed source records remain private, bounded, and URL-free."
  );

  const publicationBoundary = census.publicationBoundary ?? {};
  const publicationFlags = [
    "exactDriveIdsStored",
    "exactPrivatePathsStored",
    "rawDocumentsStored",
    "rawExcerptsStored",
    "participantOrContactDataStored",
    "ownerOrEditorListsStored",
    "privateMediaStored",
    "rightsOrConsentInferred"
  ];
  const privatePatternDetected = structuralPrivatePattern.test(publicCorpus);
  check(
    "NYCAC-PUBLIC-LEAKAGE-GUARD",
    "Public artifacts contain no protected locator, authenticated URL, local path, or raw-content pattern",
    12,
    publicationFlags.every((key) => publicationBoundary[key] === false) &&
      /^[a-f0-9]{64}$/.test(publicationBoundary.privateManifestSha256 ?? "") &&
      !privatePatternDetected,
    `All publication flags are false; structural private pattern detected: ${privatePatternDetected}.`
  );

  const claimById = new Map(claims.map((claim) => [claim.id, claim]));
  const governedClaims = governedClaimIds.map((id) => claimById.get(id));
  const playbookClaim = claimById.get("CLM-NYCAC-ADVOCACY-OPERATING-PLAYBOOK-2017");
  check(
    "NYCAC-CREDIT-AND-BOUNDARIES",
    "Promoted propositions retain shared credit, evidence, boundaries, and anti-claims",
    8,
    governedClaims.every((claim) =>
      claim?.status === "confirmed-with-boundary" &&
      (claim?.evidence?.length ?? 0) > 0 &&
      (claim?.boundaries?.length ?? 0) >= 2 &&
      (claim?.antiClaims?.length ?? 0) >= 4
    ) &&
      playbookClaim?.internalClaim.includes("Julia Fredenburg") &&
      playbookClaim?.internalClaim.includes("co-authored"),
    "The shared guide remains jointly credited and all new claims carry explicit non-claims."
  );

  const activeGovernedProjections = governedClaims.flatMap((claim) =>
    (claim?.projections ?? []).filter((projection) => projection.status === "active")
  );
  check(
    "NYCAC-SELECTIVE-PROJECTION",
    "Archive coverage and playbook claims remain held from automatic website projection",
    6,
    activeGovernedProjections.length === 0 &&
      governedClaims.every((claim) => claim?.projections?.every((projection) =>
        projection.status === "hold" && projection.surfaces.length === 0
      )),
    "The Knowledge Wiki gains depth without forcing every mature proposition onto the site."
  );

  check(
    "NYCAC-PORTFOLIO-CLARITY",
    "The existing public role proof gains concrete operating artifacts without causal inflation",
    4,
    includesAll(proofsSource, [
      "recurring meetings and priority ballots",
      "run-of-show documents",
      "call scripts",
      "sustained follow-through",
      "Do not claim solo leadership"
    ]),
    "The website projection names work products and keeps the collective-outcome guardrail."
  );

  check(
    "NYCAC-APPLICATION-UTILITY",
    "The application brief translates the evidence for four relevant hiring contexts",
    4,
    includesAll(applicationBrief, [
      "Technical operations",
      "Product operations",
      "Implementation",
      "Stakeholder translation",
      "## Boundaries"
    ]),
    "The brief supports targeted application and interview composition without becoming an automatic claim feed."
  );

  check(
    "NYCAC-HUMAN-GATES",
    "Jamie, collaborator, rights, application, and production gates remain explicitly open",
    4,
    includesAll(normalizedEvaluationRecord, [
      "Jamie review",
      "collaborator attribution review",
      "rights and represented-person review",
      "application selection",
      "production approval",
      "remain open"
    ]),
    "Automated completion cannot stand in for governed human decisions."
  );

  const passedPoints = criteria
    .filter((criterion) => criterion.pass)
    .reduce((sum, criterion) => sum + criterion.points, 0);
  const totalPoints = criteria.reduce((sum, criterion) => sum + criterion.points, 0);

  return {
    pass: criteria.every((criterion) => criterion.pass),
    passedPoints,
    totalPoints,
    criteria
  };
}
