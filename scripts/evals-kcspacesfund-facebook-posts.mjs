#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath = "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.json";
const acquisitionControlPath = "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-acquisition-control.json";
const manifestPath = "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.manifest.json";
const reportPath = "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

function count(values) {
  return Object.fromEntries(
    [...values.reduce((result, value) => result.set(value, (result.get(value) ?? 0) + 1), new Map())]
      .sort(([left], [right]) => String(left).localeCompare(String(right)))
  );
}

function collectKeys(value, output = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectKeys(item, output);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      output.push(key);
      collectKeys(item, output);
    }
  }
  return output;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function acquisitionControlErrors(value, expectedCorpusSha, expectedCorpusHashes) {
  const errors = [];
  const groups = value?.reconciliation?.renderGroups ?? [];
  const renderKeys = groups.flatMap((group) => group.opaqueRenderKeys ?? []);
  const duplicateGroups = groups.filter((group) => (group.opaqueRenderKeys?.length ?? 0) > 1);
  const canonicalHashes = groups.map((group) => group.canonicalRecordHash).sort();
  const checkpoints = value?.terminalControl?.checkpoints ?? [];

  if (value?.schemaVersion !== 1 || value?.derivationVersion !== "kcspacesfund-facebook-acquisition-v1") errors.push("schema");
  if (value?.protectedInputAttestations?.protectedInputsPublished !== false) errors.push("protected-input-publication");
  if (![value?.protectedInputAttestations?.renderCaptureSha256, value?.protectedInputAttestations?.canonicalCaptureSha256].every((item) => /^[a-f0-9]{64}$/.test(item ?? ""))) errors.push("protected-input-attestation");
  if (value?.publicCorpusAttestation?.path !== corpusPath || value?.publicCorpusAttestation?.sha256 !== expectedCorpusSha || value?.publicCorpusAttestation?.canonicalRecords !== 37) errors.push("public-corpus-attestation");
  if (value?.reconciliation?.renderRows !== 41 || value?.reconciliation?.canonicalRecords !== 37 || value?.reconciliation?.duplicateOrAlternateRenderVariantsExcluded !== 4 || value?.reconciliation?.duplicateOrAlternateGroups !== 4) errors.push("population");
  if (groups.length !== 37 || JSON.stringify(canonicalHashes) !== JSON.stringify([...expectedCorpusHashes].sort())) errors.push("canonical-groups");
  if (renderKeys.length !== 41 || new Set(renderKeys).size !== 41 || !renderKeys.every((item) => /^[a-f0-9]{64}$/.test(item))) errors.push("render-keys");
  if (duplicateGroups.length !== 4 || groups.some((group) => ![1, 2].includes(group.opaqueRenderKeys?.length ?? 0)) || groups.reduce((sum, group) => sum + group.opaqueRenderKeys.length - 1, 0) !== 4) errors.push("duplicate-groups");
  if (
    value?.terminalControl?.consecutiveStableChecks !== 8 ||
    checkpoints.length !== 8 ||
    checkpoints.some((item, index) => item.step !== 44 + index || item.renderRows !== 41 || item.documentHeight !== 22984 || item.scrollY !== 22183 || item.viewportHeight !== 801 || item.loadingIndicators !== 0)
  ) errors.push("terminal-control");
  if (!value?.privacy?.renderKeysAreOneWayDomainSeparatedHashes || Object.entries(value?.privacy ?? {}).some(([key, item]) => key !== "renderKeysAreOneWayDomainSeparatedHashes" && item !== false)) errors.push("privacy");
  return errors;
}

const corpusText = read(corpusPath);
const corpus = JSON.parse(corpusText);
const acquisitionControlText = read(acquisitionControlPath);
const acquisitionControl = JSON.parse(acquisitionControlText);
const manifest = JSON.parse(read(manifestPath));
const report = read(reportPath).replace(/\s+/g, " ");
const readme = read("docs/knowledge-bank/README.md").replace(/\s+/g, " ");
const approvalRegister = read("docs/knowledge-bank/approval-register.md").replace(/\s+/g, " ");
const receipts = read("docs/knowledge-bank/intake/receipts.jsonl");
const packageJson = JSON.parse(read("package.json"));
const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

const rows = corpus.rows;
const hashes = rows.map((row) => row.recordHash);
const themeCounts = count(rows.flatMap((row) => row.themes));
const contentStates = count(rows.map((row) => row.contentState));
const corpusSha = sha256(corpusText);
const corpusBytes = Buffer.byteLength(corpusText);
const acquisitionControlSha = sha256(acquisitionControlText);
const acquisitionControlBytes = Buffer.byteLength(acquisitionControlText);

check(
  "Population accounting",
  "Every distinct record in the terminal surviving feed has one public-safe disposition",
  12,
  corpus.completeness.scope === "complete surviving authenticated public Page feed control" &&
    corpus.completeness.ownerExportUsed === false &&
    corpus.completeness.renderRowsEncountered === 41 &&
    corpus.completeness.duplicateOrAlternateRenderVariantsExcluded === 4 &&
    corpus.completeness.distinctRecords === 37 &&
    corpus.completeness.terminalChecks === 8 &&
    corpus.completeness.dateRange.start === "2020-04-07" &&
    corpus.completeness.dateRange.end === "2020-07-09" &&
    rows.length === 37 &&
    new Set(hashes).size === 37 &&
    hashes.every((value) => /^[a-f0-9]{64}$/.test(value)) &&
    includesAll(report, [
      "complete surviving authenticated public Page feed",
      "not an owner export",
      "Deleted, hidden, private, or no-longer-retained posts",
    ])
);

const acquisitionErrors = acquisitionControlErrors(acquisitionControl, corpusSha, hashes);
const denominatorMutation = structuredClone(acquisitionControl);
denominatorMutation.reconciliation.renderRows = 40;
const duplicateMutation = structuredClone(acquisitionControl);
duplicateMutation.reconciliation.renderGroups.find((group) => group.opaqueRenderKeys.length === 2).opaqueRenderKeys.pop();
const terminalMutation = structuredClone(acquisitionControl);
terminalMutation.terminalControl.checkpoints[0].loadingIndicators = 1;
check(
  "Population accounting",
  "The public-safe acquisition control independently binds 41 renders to 37 records and rejects denominator, duplicate, and endpoint drift",
  8,
  acquisitionErrors.length === 0 &&
    acquisitionControlErrors(denominatorMutation, corpusSha, hashes).length > 0 &&
    acquisitionControlErrors(duplicateMutation, corpusSha, hashes).length > 0 &&
    acquisitionControlErrors(terminalMutation, corpusSha, hashes).length > 0 &&
    includesAll(report, ["public-safe acquisition control", "Mutation checks fail"])
);

check(
  "Content dispositions",
  "Readable, shared-shell, and unavailable records reconcile without silent loss",
  10,
  contentStates.readable === 28 &&
    contentStates["shared-source-shell"] === 5 &&
    contentStates["source-unavailable"] === 4 &&
    corpus.contentStates.photoRecords === 20 &&
    includesAll(report, ["28 / 5 / 4", "shared-source shell / source unavailable"])
);

check(
  "Mission patterns",
  "Overlapping classifications reproduce the mutual-aid operating record",
  12,
  themeCounts["cultural-space survival and public value"] === 25 &&
    themeCounts["mutual-aid print collaboration"] === 17 &&
    themeCounts["fundraising and donation routing"] === 15 &&
    themeCounts["grant-recipient or funded-space updates"] === 12 &&
    themeCounts["application and deadline routing"] === 10 &&
    themeCounts["priority-community or equity framing"] === 10 &&
    themeCounts["program operations and eligibility"] === 8 &&
    themeCounts["Lawrence geographic expansion"] === 4
);

const exactRoutes = Object.keys(corpus.sourceRoutes);
check(
  "Source routing",
  "The complete exact-route inventory and unresolved Do816 lead stay distinct",
  8,
  exactRoutes.length === 5 &&
    exactRoutes.includes("https://kcspacesfund.com/") &&
    exactRoutes.includes("https://www.gofundme.com/f/kcspacesfund") &&
    exactRoutes.includes("https://twocc.us/donate") &&
    corpus.sourceLeads.length === 1 &&
    corpus.sourceLeads[0].id === "LEAD-KCSF-DO816-DAILY-DOGOOD" &&
    includesAll(report, ["exact article URL was not recovered", "source lead rather than a governed claim source"])
);

const forbiddenKeys = new Set([
  "postId",
  "pageId",
  "permalink",
  "rawBody",
  "rawCaption",
  "commentText",
  "commenterIdentity",
  "reactionIdentities",
  "followerIdentities",
  "cookie",
  "session",
  "credential",
]);
const serializedCorpus = JSON.stringify(corpus);
check(
  "Public safety",
  "The public corpus excludes raw speech, platform identities, people, private paths, and auth state",
  12,
  !collectKeys(corpus).some((key) => forbiddenKeys.has(key)) &&
    !serializedCorpus.includes("/Users/") &&
    !serializedCorpus.includes("/Volumes/") &&
    !serializedCorpus.includes("fbclid") &&
    !serializedCorpus.includes("@gmail") &&
    !serializedCorpus.includes("facebook.com/profile.php") &&
    corpus.roleBoundary.accountVoice.includes("Collective campaign account") &&
    report.includes("Raw post bodies, native post IDs, comments, people, authenticated URLs, session state")
);

check(
  "Mutable traction",
  "Capture-date counters reproduce while historical, unique-person, sharing, and impact inferences remain blocked",
  10,
  corpus.mutableSnapshot.followers === 108 &&
    corpus.mutableSnapshot.reactionTotal === 119 &&
    corpus.mutableSnapshot.recordsWithReactions === 28 &&
    corpus.mutableSnapshot.recordsWithVisibleComments === 4 &&
    corpus.mutableSnapshot.visibleCulturalSpaceCommentAccounts === 3 &&
    corpus.mutableSnapshot.visibleIndividualCommentAccounts === 1 &&
    includesAll(report, [
      "not historical 2020 analytics",
      "not proof of zero historical sharing",
      "No incoming engagement by elected officials was established",
      "not incoming engagement from that official",
    ])
);

check(
  "Manifest integrity",
  "The append-only manifest binds the exact public corpus and the acquisition control self-attests to that corpus",
  6,
    manifest.corpus === corpusPath &&
    manifest.corpusSha256 === corpusSha &&
    manifest.corpusBytes === corpusBytes &&
    acquisitionControlSha === "8f92d1cf5b69548b5605395f106bde6ce6296228e2bd9d32ba9a926af68103bf" &&
    acquisitionControlBytes === 11755 &&
    manifest.population.renderRowsEncountered === 41 &&
    manifest.population.distinctSurvivingPosts === 37 &&
    manifest.population.ownerExportUsed === false &&
    manifest.privacy.rawPostTextPublished === false &&
    manifest.privacy.platformIdsPublished === false &&
    manifest.privacy.engagerIdentitiesPublished === false
);

const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry]));
const lead = knowledgeLifecycle.leads.find((item) => item.id === "LEAD-KCSF-FACEBOOK-POST-FULL-POPULATION");
const kcsfObservationIds = [
  "OBS-KCSF-FACEBOOK-SURVIVING-POPULATION",
  "OBS-KCSF-FACEBOOK-TERMINAL-CONTROL",
  "OBS-KCSF-FACEBOOK-OPERATING-PATTERNS",
  "OBS-KCSF-FACEBOOK-PUBLIC-SOURCE-ROUTES",
  "OBS-KCSF-KANSAS-CITY-STAR-LISTING",
  "OBS-KCSF-CAMPAIGN-SITE-PROGRAM",
  "OBS-KCSF-ODDITIES-PRINT-FUNDRAISING",
  "OBS-KCSF-DIGITAL-OPERATIONS-IMPLEMENTATION",
  "OBS-KCSF-PUBLIC-IDENTITY-NAMING-MEMORY",
  "OBS-KCSF-FACEBOOK-COLLECTIVE-AUTHORSHIP-BOUNDARY",
  "OBS-KCSF-FACEBOOK-MUTABLE-METRICS",
];
const observations = knowledgeLifecycle.observations.filter((item) => kcsfObservationIds.includes(item.id));
const observationById = new Map(observations.map((item) => [item.id, item]));
const candidates = knowledgeLifecycle.candidateClaims.filter((item) => item.id.startsWith("CND-KCSF-FACEBOOK-") || item.id === "CND-KCSF-DIGITAL-INFRASTRUCTURE-AND-IDENTITY");
const events = knowledgeLifecycle.candidateEvents.filter((item) => item.id.startsWith("EVT-KCSF-FACEBOOK-") || item.id === "EVT-KCSF-DIGITAL-INFRASTRUCTURE-PROMOTED");
const tasks = knowledgeLifecycle.researchTasks.filter((item) => item.id.startsWith("TASK-KCSF-FACEBOOK-"));
const decisions = knowledgeLifecycle.promotionDecisions.filter((item) => item.id.startsWith("DEC-KCSF-FACEBOOK-") || item.id === "DEC-KCSF-DIGITAL-INFRASTRUCTURE-PROMOTE");
const mediaLead = knowledgeLifecycle.mediaLeads.find((item) => item.id === "MEDIA-KCSF-FACEBOOK-PHOTO-COLLECTION");
const editorialBrief = knowledgeLifecycle.editorialBriefs.find((item) => item.id === "BRIEF-KCSF-FACEBOOK-RESERVE");

check(
  "Lifecycle integration",
  "The pass reaches receipt, lead, observations, candidates, tasks, decisions, canonical claims, and inquiry",
  12,
  receipts.includes('"id":"LEAD-KCSF-FACEBOOK-POST-FULL-POPULATION"') &&
    [
      "LEAD-KCSF-DO816-DAILY-DOGOOD",
      "LEAD-KCSF-FACEBOOK-OWNER-EXPORT-GAP",
      "LEAD-KCSF-NAMING-ROLE-MEMORY",
      "LEAD-KCSF-FACEBOOK-PHOTO-POPULATION",
    ].every((id) => receipts.includes(`"id":"${id}"`)) &&
    lead?.sourceIds.length === 8 &&
    lead?.candidateClaimIds.length === 4 &&
    observations.length === 11 &&
    candidates.length === 4 &&
    events.length === 4 &&
    tasks.length === 5 &&
    decisions.length === 4 &&
    mediaLead?.contentReviewStatus === "not-authorized" &&
    mediaLead?.displayStatus === "hold" &&
    editorialBrief?.publicationIntent === "internal-brief" &&
    candidates.filter((candidate) => candidate.maturity === "promoted").length === 3 &&
    candidates.filter((candidate) => candidate.maturity === "held").length === 1 &&
    decisions.filter((decision) => decision.decision === "promote").length === 3 &&
    decisions.filter((decision) => decision.decision === "hold").length === 1 &&
    [
      "SRC-KCSF-FACEBOOK-POST-CORPUS-2026-07-16",
      "SRC-KCSF-FACEBOOK-PAGE-2026-07-16",
      "SRC-KCSF-CAMPAIGN-SITE-2026-07-16",
      "SRC-KCSF-KANSAS-CITY-STAR-2020-04-07",
      "SRC-KCSF-ODDITIES-PRINTS-MAPE-2020",
      "SRC-KCSF-DIGITAL-OPERATIONS-ARCHIVE-2026-07-09",
      "SRC-KCSF-NAMING-ROLE-MEMORY-2026-07-16",
    ].every((id) => sourceIds.has(id)) &&
    claimById.get("CLM-KCSF-FACEBOOK-SURVIVING-POST-POPULATION")?.status === "confirmed-with-boundary" &&
    claimById.get("CLM-KCSF-FACEBOOK-MUTUAL-AID-OPERATING-SURFACE")?.status === "confirmed-with-boundary" &&
    claimById.get("CLM-KCSF-DIGITAL-INFRASTRUCTURE-AND-IDENTITY")?.status === "confirmed-with-boundary" &&
    claimById.get("CLM-KCSF-FACEBOOK-MUTABLE-METRIC-SNAPSHOT")?.status === "use-with-care" &&
    inquiryById.get("INQ-KCSF-FACEBOOK-POST-POPULATION-2026")?.resultStatus === "partially-recovered"
);

check(
  "Source decomposition",
  "Independent publications, campaign evidence, implementation records, and naming memory remain atomic observations",
  6,
  observationById.get("OBS-KCSF-KANSAS-CITY-STAR-LISTING")?.sourceId === "SRC-KCSF-KANSAS-CITY-STAR-2020-04-07" &&
    observationById.get("OBS-KCSF-CAMPAIGN-SITE-PROGRAM")?.sourceId === "SRC-KCSF-CAMPAIGN-SITE-2026-07-16" &&
    observationById.get("OBS-KCSF-ODDITIES-PRINT-FUNDRAISING")?.sourceId === "SRC-KCSF-ODDITIES-PRINTS-MAPE-2020" &&
    observationById.get("OBS-KCSF-DIGITAL-OPERATIONS-IMPLEMENTATION")?.sourceId === "SRC-KCSF-DIGITAL-OPERATIONS-ARCHIVE-2026-07-09" &&
    observationById.get("OBS-KCSF-PUBLIC-IDENTITY-NAMING-MEMORY")?.sourceId === "SRC-KCSF-NAMING-ROLE-MEMORY-2026-07-16" &&
    !knowledgeLifecycle.observations.some((item) => ["OBS-KCSF-PUBLISHED-AND-PARTNER-CONTEXT", "OBS-KCSF-DIGITAL-OPERATIONS-ROLE"].includes(item.id))
);

check(
  "Media feedback",
  "Every photo record has a governed collection lead, authorization gate, research task, and internal editorial disposition",
  6,
  corpus.contentStates.photoRecords === 20 &&
    mediaLead?.researchTaskIds.includes("TASK-KCSF-FACEBOOK-VISUAL-DISPOSITION") &&
    knowledgeLifecycle.researchTasks.some((item) => item.id === "TASK-KCSF-FACEBOOK-VISUAL-DISPOSITION" && item.requiresContentReviewAuthorization === true) &&
    editorialBrief?.mediaLeadIds.includes("MEDIA-KCSF-FACEBOOK-PHOTO-COLLECTION") &&
    approvalRegister.includes("20-photo collection is metadata-only and held from content review and display")
);

const websiteCorpus = [
  read("apps/www/src/data/proofs.ts"),
  read("apps/www/src/app/work/technical-operations/page.tsx"),
  read("apps/www/src/data/work.ts"),
].join("\n");
check(
  "Chad lens and composition",
  "The bank gains depth while campaign output and mutable counters stay off the current portfolio",
  7,
  websiteCorpus.includes("behind-the-scenes digital infrastructure") &&
    !websiteCorpus.includes("37 distinct surviving") &&
    !websiteCorpus.includes("119 reactions") &&
    !websiteCorpus.includes("108 current followers") &&
    claimById.get("CLM-KCSF-FACEBOOK-MUTABLE-METRIC-SNAPSHOT")?.projections.every((projection) => projection.status === "hold") &&
    includesAll(report, ["No website copy changes are warranted", "not the stakeholder or owner posting", "Public organizer credit remains"]) &&
    readme.includes("no website copy changes were made from this pass")
);

check(
  "Recursive execution",
  "The dedicated eval is part of the repository-wide recursive check",
  3,
  packageJson.scripts["evals:kcspacesfund-facebook-posts"] === "node scripts/evals-kcspacesfund-facebook-posts.mjs" &&
    packageJson.scripts.check.includes("npm run evals:kcspacesfund-facebook-posts")
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 100;

console.log(`KC Spaces Fund Facebook posts eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`);
for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0);
  const possible = dimensionChecks.reduce((sum, item) => sum + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("KC Spaces Fund Facebook posts gaps:");
  for (const item of failures) console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
}

if (score < threshold || hardFailures.length) process.exit(1);
console.log("KC Spaces Fund Facebook posts criterion met.");
