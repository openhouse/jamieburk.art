#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  candidateFingerprint,
  checkGeneratedArtifacts,
  graphFingerprint,
  loadKnowledgeWiki,
  queryWiki,
  repoRoot
} from "./lib/knowledge-wiki.mjs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const suitePath = "evals/knowledge-wiki/suite.json";
const fixturePath = "evals/knowledge-wiki/fixtures/mutations.json";
const suite = JSON.parse(readFileSync(suitePath, "utf8"));

const candidatePaths = [
  ".vscode/settings.json",
  "AGENTS.md",
  "README.md",
  "package.json",
  "docs/architecture",
  "docs/knowledge-bank",
  "scripts/lib/knowledge-wiki.mjs",
  "scripts/check-knowledge-wiki.mjs",
  "scripts/generate-knowledge-wiki.mjs",
  "scripts/query-knowledge-wiki.mjs",
  "scripts/run-knowledge-wiki-tasks.mjs",
  "scripts/run-knowledge-wiki-evals.mjs",
  "scripts/tests/knowledge-wiki.test.mjs",
  "apps/www/src/data/knowledge-bank/nycartc-shared-folder-archive-production.ts",
  "apps/www/src/data/knowledge-bank/facebook-events-archive-production.ts",
  "apps/www/src/data/knowledge-bank/lifecycle-records.ts",
  "apps/www/src/data/knowledge-bank/records.ts",
  suitePath,
  fixturePath
];

const candidate = candidateFingerprint(candidatePaths);
const contract = candidateFingerprint([suitePath, fixturePath]);
const wiki = loadKnowledgeWiki();
const gates = new Map();

function normalizedText(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function gate(id, pass, detail) {
  gates.set(id, { id, status: pass ? "pass" : "fail", detail });
}

const authorityFiles = [
  "docs/architecture/ADR-knowledge-wiki-name-and-model.md",
  "docs/architecture/knowledge-wiki-inventory.md",
  "docs/knowledge-bank/knowledge-wiki-authoring.md"
];
const authorityText = normalizedText(readFileSync(path.join(repoRoot, "docs/architecture/ADR-knowledge-wiki-name-and-model.md"), "utf8"));
const authorityReady = authorityFiles.every((file) => existsSync(path.join(repoRoot, file))) &&
  ["knowledge bank", "markdown", "wiki graph", "selective", "projection", "source vault"].every((term) => authorityText.includes(term));
gate("authority_documented", authorityReady, authorityReady ? "Naming, authority, compatibility, and projection decisions are explicit" : "Required authority documentation is incomplete");

gate("wiki_integrity", wiki.inspection.errors.length === 0, wiki.inspection.errors.length ? wiki.inspection.errors.join("; ") : `${wiki.graph.nodes.length} governed records pass schema, link, fragment, relation, and path checks`);

const canonicalReferences = wiki.records.flatMap((record) => record.canonicalRefs);
gate("canonical_reference_integrity", canonicalReferences.length >= 8 && !wiki.inspection.errors.some((error) => error.includes("canonical_refs")), `${canonicalReferences.length} references connect Wiki context to current canonical records`);

const generatedErrors = checkGeneratedArtifacts(wiki);
gate("generated_artifacts_current", generatedErrors.length === 0, generatedErrors.length ? generatedErrors.join("; ") : "Graph, index, backlinks, health, and delta artifacts match authored records");

const secondGraph = loadKnowledgeWiki().graph;
gate("graph_determinism", graphFingerprint(wiki.graph) === graphFingerprint(secondGraph), `Graph semantic fingerprint ${graphFingerprint(wiki.graph)}`);

const discoverable = wiki.records.filter((record) => record.discoverable);
const reachable = discoverable.filter((record) => wiki.inspection.distances.has(record.id));
gate("discoverability", discoverable.length === reachable.length && wiki.health.diagnostics.maximumRootDistance <= 3, `${reachable.length}/${discoverable.length} discoverable records reachable; maximum path ${wiki.health.diagnostics.maximumRootDistance}`);

const queryFailures = [];
for (const benchmark of suite.queryBenchmarks) {
  const actual = queryWiki(wiki, benchmark.query).nodes.map((node) => node.id).sort();
  const expected = [...benchmark.expectedRecordIds].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) queryFailures.push(`${benchmark.id}: expected ${expected.join(", ")}; received ${actual.join(", ")}`);
  const expectedBodies = normalizedText(expected.map((id) => wiki.records.find((item) => item.id === id)?.body ?? "").join("\n"));
  if (!expectedBodies.includes(normalizedText(benchmark.requiredBoundary))) queryFailures.push(`${benchmark.id}: required boundary is absent from the bounded result`);
}
gate("query_benchmark", queryFailures.length === 0, queryFailures.length ? queryFailures.join("; ") : `${suite.queryBenchmarks.length} bounded retrieval benchmarks return the expected records and limitations`);

let mutationPass = true;
let mutationDetail = "Knowledge Wiki mutation suite passed";
try {
  execFileSync(process.execPath, ["--test", "scripts/tests/knowledge-wiki.test.mjs"], { cwd: repoRoot, stdio: "pipe" });
} catch (error) {
  mutationPass = false;
  mutationDetail = String(error.stdout || error.message).trim();
}
gate("mutation_rejection", mutationPass, mutationDetail);

const archiveClaimIds = [
  "CLM-NYCARTC-SHARED-FOLDER-CENSUS-2026",
  "CLM-NYCARTC-PUBLIC-MEETING-OPERATING-SYSTEM",
  "CLM-NYCARTC-TESTIMONY-PARTICIPATION-DESIGN",
  "CLM-NYCARTC-NIGHTLIFE-RECOMMENDATION-CONTINUITY",
  "CLM-NYCARTC-NIGHTLIFE-SPEECH-SCRIPT",
  "CLM-NYCARTC-MARCH-CROSS-CHANNEL-IMPLEMENTATION",
  "CLM-NYCARTC-MARCH-DATA-DESIGN-LEAD"
];
const archiveSourceIds = [
  "SRC-NYCARTC-SHARED-FOLDER-CENSUS-2026",
  "SRC-NYCARTC-ARCHIVE-PUBLIC-MEETING-PLAYBOOK-2018",
  "SRC-NYCARTC-ARCHIVE-TESTIMONY-GUIDE-2017",
  "SRC-NYCARTC-ARCHIVE-JAMIE-CABARET-TESTIMONY-2017",
  "SRC-NYCARTC-ARCHIVE-NIGHTLIFE-RECOMMENDATION-SEQUENCE-2017-2019",
  "SRC-NYCARTC-ARCHIVE-JAMIE-NIGHTLIFE-SPEECH-2017",
  "SRC-NYCARTC-ARCHIVE-MARCH-CAMPAIGN-GUIDES-2018-2019",
  "SRC-NYCARTC-ARCHIVE-MARCH-DATA-DESIGN-NOTES-2019"
];
const archiveClaims = archiveClaimIds.map((id) => knowledgeBank.claims.find((claim) => claim.id === id)).filter(Boolean);
const archiveSources = archiveSourceIds.map((id) => knowledgeBank.sources.find((source) => source.id === id)).filter(Boolean);
const archiveReportPath = path.join(repoRoot, "docs/knowledge-bank/research/nycartc-shared-folder-archival-production-2026-07.md");
const archiveReport = existsSync(archiveReportPath) ? normalizedText(readFileSync(archiveReportPath, "utf8")) : "";

const populationTerms = [
  "population total 2 192",
  "inventoried total 2 192",
  "classified total 2 192",
  "dispositioned total 2 192",
  "nested folders 257",
  "files 1 935",
  "unresolved traversal errors 0"
];
const archivePopulationClosed = archiveClaims.some((claim) => claim.id === "CLM-NYCARTC-SHARED-FOLDER-CENSUS-2026") &&
  archiveSources.some((source) => source.id === "SRC-NYCARTC-SHARED-FOLDER-CENSUS-2026") &&
  populationTerms.every((term) => archiveReport.includes(term));
gate("archive_population_closure", archivePopulationClosed, archivePopulationClosed
  ? "The named snapshot accounts for all 2,192 descendants, including 257 nested folders and 1,935 files, with no unresolved traversal errors"
  : "Archive population closure, reconciliation counts, or canonical census records are incomplete");

const dispositionTerms = [
  "pending rights consent attribution or jamie review 1 413",
  "protected metadata only 484",
  "public source candidate requiring close reading 201",
  "unreadable or format specific review required 88",
  "metadata visible but item body unavailable 6",
  "the 201 source candidates are a review queue not 201 public sources",
  "content reviewed total 18",
  "rights reviewed total 0",
  "projection selected total 0"
];
const archiveDispositionGoverned = dispositionTerms.every((term) => archiveReport.includes(term));
gate("archive_disposition_governance", archiveDispositionGoverned, archiveDispositionGoverned
  ? "Every descendant has one protected disposition; close reading, source candidacy, rights review, and projection remain distinct"
  : "Archive dispositions or maturity distinctions are missing from the governed report");

const archivePublicFiles = [
  "apps/www/src/data/knowledge-bank/nycartc-shared-folder-archive-production.ts",
  "docs/knowledge-bank/research/nycartc-shared-folder-archival-production-2026-07.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition.md",
  "docs/knowledge-bank/sources/nycartc-shared-folder-census-2026.md",
  "docs/knowledge-bank/sources/nycartc-public-meeting-playbook-2018.md",
  "docs/knowledge-bank/sources/nycartc-testimony-guide-2017.md",
  "docs/knowledge-bank/sources/nycartc-nightlife-recommendation-sequence-2017-2019.md",
  "docs/knowledge-bank/sources/nycartc-march-data-design-notes-2019.md",
  "docs/knowledge-bank/claims/nycartc-public-meeting-operating-system.md",
  "docs/knowledge-bank/claims/nycartc-nightlife-recommendation-continuity.md",
  "docs/knowledge-bank/claims/nycartc-march-data-design-lead.md",
  "docs/knowledge-bank/indexes/missing-pages.md",
  "docs/knowledge-bank/methods/source-re-encounter.md",
  "docs/knowledge-bank/methods/nycartc-public-meeting-and-testimony-participation.md",
  "docs/knowledge-bank/timelines/nycartc-nightlife-recommendations-2017-2019.md",
  "docs/knowledge-bank/inquiries/nycartc-march-data-design-attribution.md"
];
const archivePublicCorpus = archivePublicFiles
  .filter((file) => existsSync(path.join(repoRoot, file)))
  .map((file) => readFileSync(path.join(repoRoot, file), "utf8"))
  .join("\n");
const forbiddenArchiveMarkers = [
  "drive.google.com/drive/folders/",
  "resourcekey=",
  "/Users/",
  "/private/tmp/",
  "private/nyc-artist-coalition-shared-folder/"
];
const leakedArchiveMarkers = forbiddenArchiveMarkers.filter((marker) => archivePublicCorpus.includes(marker));
const archiveSourcesBounded = archiveSources.length === archiveSourceIds.length && archiveSources.every((source) =>
  ["private", "protected"].includes(source.visibility) &&
  source.reviewStatus === "reviewed" &&
  source.doesNotEstablish.length > 0
);
const archivePublicSafe = leakedArchiveMarkers.length === 0 && archiveSourcesBounded;
gate("archive_public_safety", archivePublicSafe, archivePublicSafe
  ? "Public records expose only aggregate counts, opaque locators, bounded synopses, and no Drive coordinates or private paths"
  : `Archive public-safety failure: ${leakedArchiveMarkers.join(", ") || "source visibility or non-support fields are incomplete"}`);

const archiveCollectiveCredit = archiveClaims.length === archiveClaimIds.length && archiveClaims.every((claim) =>
  claim.boundaries.length > 0 && claim.antiClaims.length > 0
) && archiveClaims.find((claim) => claim.id === "CLM-NYCARTC-MARCH-DATA-DESIGN-LEAD")?.status === "inference";
gate("archive_collective_credit", archiveCollectiveCredit, archiveCollectiveCredit
  ? "Every archive claim carries boundaries and anti-claims; the unresolved MARCH data-design attribution remains an inference"
  : "Archive claims are missing collective-credit boundaries, anti-claims, or attribution restraint");

const capabilityPath = path.join(repoRoot, "docs/knowledge-bank/capabilities/technical-operations.md");
const capabilityText = normalizedText(readFileSync(capabilityPath, "utf8"));
const applicationTerms = [
  "timed public meeting workflows",
  "participant testimony support",
  "cross channel campaigns",
  "agency facing requirements",
  "without retroactively assigning him a formal title"
];
const archiveApplicationValue = applicationTerms.every((term) => capabilityText.includes(term)) &&
  ["technical and product operations", "public interest implementation", "participation systems", "knowledge and handoff"].every((term) => archiveReport.includes(term));
gate("archive_application_value", archiveApplicationValue, archiveApplicationValue
  ? "The Wiki exposes bounded Technical Operations, implementation, participation, and handoff evidence without changing Jamie's formal titles"
  : "Archive evidence is not yet legible through the application capability path");

const archiveProjectionRestrained = archiveClaims.every((claim) =>
  claim.publicationStatus === "internal-only" ||
  claim.projections.length === 0 ||
  claim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
) && archiveReport.includes("no protected only claim is promoted to the site in this cycle");
gate("archive_projection_restraint", archiveProjectionRestrained, archiveProjectionRestrained
  ? "Protected close reading matured internal knowledge while all new public projections remain held or absent"
  : "A protected archive claim has escaped its editorial or surface boundary");

const requiredMissingPageIds = [
  "index.knowledge-wiki-missing-pages",
  "method.source-re-encounter",
  "source.nycartc.testimony-guide.2017",
  "method.nycartc.public-meeting-and-testimony-participation",
  "timeline.nycartc.nightlife-recommendations.2017-2019",
  "inquiry.nycartc.march-data-design-attribution"
];
const requiredMissingPageRecords = requiredMissingPageIds
  .map((id) => wiki.records.find((record) => record.id === id))
  .filter(Boolean);
const missingPageIndex = wiki.records.find((record) => record.id === "index.knowledge-wiki-missing-pages");
const missingPageIndexText = normalizedText(missingPageIndex?.body ?? "");
const missingPageRelations = new Set((missingPageIndex?.relations ?? []).map((relation) => relation.target));
const missingPageGoverned = requiredMissingPageRecords.length === requiredMissingPageIds.length &&
  requiredMissingPageIds.slice(1).every((id) => missingPageRelations.has(id)) &&
  [
    "created deferred protected or declined",
    "second priority page family created",
    "private artifact level authorship ledger protected",
    "contributed oral histories deferred",
    "public visual specimen",
    "rights blocked",
    "librarian handoff",
    "full access authorization makes research possible it does not make protected material public"
  ].every((term) => missingPageIndexText.includes(term));
gate("missing_page_governance", missingPageGoverned, missingPageGoverned
  ? "The first source-reencounter pages and second eight-page family remain linked from one governed index while narrower oral-history, private-authorship, rights, and unresolved-event work stays open"
  : "The wanted-pages index, required pages, dispositions, or librarian handoff is incomplete");

const sourceReencounter = wiki.records.find((record) => record.id === "method.source-re-encounter");
const sourceReencounterText = normalizedText(sourceReencounter?.body ?? "");
const sourceReencounterTargets = new Set((sourceReencounter?.relations ?? []).map((relation) => relation.target));
const sourceReencounterReady = sourceReencounter?.kind === "method" &&
  sourceReencounter?.lastReviewed === "2026-07-19" &&
  sourceReencounterTargets.has("research-run.nycartc.shared-folder.2026-07") &&
  sourceReencounterTargets.has("method.source-backed-team-memory") &&
  [
    "periodically returning to original material",
    "record the date account or custody context and representation inspected",
    "located and read must remain separate states",
    "librarian handoff",
    "full research authorization does not imply publication permission"
  ].every((term) => sourceReencounterText.includes(term));
gate("source_reencounter_practice", sourceReencounterReady, sourceReencounterReady
  ? "The Wiki now requires dated return to original representations, changed-or-unchanged interpretation, explicit access gaps, and a librarian handoff without changing publication authority"
  : "Source re-encounter is missing its method, present encounter, access-state distinction, or publication boundary");

const sourceGroundedSpecs = [
  {
    id: "method.nycartc.public-meeting-and-testimony-participation",
    sources: ["source.nycartc.public-meeting-playbook.2018", "source.nycartc.testimony-guide.2017"]
  },
  {
    id: "timeline.nycartc.nightlife-recommendations.2017-2019",
    sources: ["source.nycartc.nightlife-recommendation-sequence.2017-2019"]
  },
  {
    id: "inquiry.nycartc.march-data-design-attribution",
    sources: ["source.nycartc.march-data-design-notes.2019"]
  }
];
const sourceGroundingFailures = [];
for (const spec of sourceGroundedSpecs) {
  const record = wiki.records.find((item) => item.id === spec.id);
  const sourceTargets = new Set((record?.relations ?? []).filter((relation) => relation.type === "uses_source").map((relation) => relation.target));
  const methodTargets = new Set((record?.relations ?? []).filter((relation) => relation.type === "uses_method").map((relation) => relation.target));
  if (!record || record.lastReviewed !== "2026-07-19") sourceGroundingFailures.push(`${spec.id}: missing current reviewed record`);
  if (!spec.sources.every((id) => sourceTargets.has(id))) sourceGroundingFailures.push(`${spec.id}: missing required original-source relation`);
  if (!methodTargets.has("method.source-re-encounter")) sourceGroundingFailures.push(`${spec.id}: missing source-reencounter method relation`);
  if (!normalizedText(record?.body ?? "").includes("july 19 2026")) sourceGroundingFailures.push(`${spec.id}: missing dated present encounter`);
}
gate("source_grounded_page_creation", sourceGroundingFailures.length === 0, sourceGroundingFailures.length
  ? sourceGroundingFailures.join("; ")
  : "Each new substantive page names its original-source relationships, present encounter date, source-reencounter method, and evidentiary boundary");

const marchInquiry = wiki.records.find((record) => record.id === "inquiry.nycartc.march-data-design-attribution");
const marchInquiryText = normalizedText(marchInquiry?.body ?? "");
const marchCanonicalClaim = knowledgeBank.claims.find((claim) => claim.id === "CLM-NYCARTC-MARCH-DATA-DESIGN-LEAD");
const marchInquiryIntegrity = marchInquiry?.kind === "research-inquiry" &&
  marchInquiry?.status === "governed-open" &&
  marchInquiry?.projectionStatus === "protected" &&
  marchCanonicalClaim?.status === "inference" &&
  marchCanonicalClaim?.publicationStatus === "internal-only" &&
  marchCanonicalClaim?.projections.length === 0 &&
  [
    "direct support for a narrow contribution",
    "complete authorship cannot yet be allocated",
    "does not establish complete authorship implementation validation safety adoption or causal impact"
  ].every((term) => marchInquiryText.includes(term));
gate("inquiry_integrity", marchInquiryIntegrity, marchInquiryIntegrity
  ? "The visible Jamie-attributed FOIL/reporting suggestion narrows one inquiry while the canonical claim remains an unprojected inference and implementation remains unresolved"
  : "The MARCH source encounter has been promoted beyond its narrow attribution or no longer preserves inquiry and implementation boundaries");

const priorityPageIds = [
  "timeline.nycartc.events-and-venues.2017-2021",
  "timeline.participation-infrastructure.2012-2026",
  "index.project-afterlives-and-handoffs",
  "index.role-and-collective-authorship",
  "index.scenes-of-work",
  "timeline.art-life-waterways-media-archaeology.2003-2011",
  "index.people-places-and-community-testimony",
  "index.absences-protections-and-permissions"
];
const priorityPages = priorityPageIds
  .map((id) => wiki.records.find((record) => record.id === id))
  .filter(Boolean);
const priorityIndexTargets = new Set((missingPageIndex?.relations ?? []).map((relation) => relation.target));
const priorityPageFamilyComplete = priorityPages.length === priorityPageIds.length &&
  priorityPageIds.every((id) => priorityIndexTargets.has(id)) &&
  priorityPages.every((record) => record.discoverable && record.lastReviewed === "2026-07-19") &&
  missingPageIndexText.includes("second priority page family created") &&
  missingPageIndexText.includes("private artifact level authorship ledger protected") &&
  missingPageIndexText.includes("contributed oral histories deferred");
gate("priority_page_family_complete", priorityPageFamilyComplete, priorityPageFamilyComplete
  ? "All eight requested pages exist as current governed records, are linked from the wanted-pages index, and leave narrower private, oral-history, rights, and unresolved-event work visibly open"
  : "The requested page family, index relationships, present review dates, or remaining wanted-page dispositions are incomplete");

const presentSourcePageIds = [
  "timeline.nycartc.events-and-venues.2017-2021",
  "timeline.participation-infrastructure.2012-2026",
  "index.scenes-of-work",
  "timeline.art-life-waterways-media-archaeology.2003-2011"
];
const prioritySourceFailures = [];
for (const id of presentSourcePageIds) {
  const record = wiki.records.find((item) => item.id === id);
  const methodTargets = new Set((record?.relations ?? []).filter((relation) => relation.type === "uses_method").map((relation) => relation.target));
  const text = normalizedText(record?.body ?? "");
  if (!record || record.canonicalRefs.length < 3) prioritySourceFailures.push(`${id}: missing canonical claim relationships`);
  if (!methodTargets.has("method.source-re-encounter")) prioritySourceFailures.push(`${id}: missing source-reencounter method`);
  if (!text.includes("present source encounter") || !text.includes("july 19 2026")) prioritySourceFailures.push(`${id}: missing dated present-source receipt`);
}
const eventChronologyText = normalizedText(wiki.records.find((record) => record.id === "timeline.nycartc.events-and-venues.2017-2021")?.body ?? "");
const artisticLineageText = normalizedText(wiki.records.find((record) => record.id === "timeline.art-life-waterways-media-archaeology.2003-2011")?.body ?? "");
if (!["33 recovered records", "one slot", "availability and representation check not a new population recount"].every((term) => eventChronologyText.includes(term))) {
  prioritySourceFailures.push("event chronology: population and fresh-encounter distinction is incomplete");
}
if (!["good times open house feature", "the pitch s 2007 raft report", "charlotte street s great accommodations", "did not return usable text"].every((term) => artisticLineageText.includes(term))) {
  prioritySourceFailures.push("artistic lineage: public-source return or access gap is incomplete");
}
gate("priority_page_source_grounding", prioritySourceFailures.length === 0, prioritySourceFailures.length
  ? prioritySourceFailures.join("; ")
  : "Four synthesis pages bind to canonical claims, the source-reencounter method, dated present representations, and an explicit access or recount boundary");

const participationLineageText = normalizedText(wiki.records.find((record) => record.id === "timeline.participation-infrastructure.2012-2026")?.body ?? "");
const scenesText = normalizedText(wiki.records.find((record) => record.id === "index.scenes-of-work")?.body ?? "");
const lineageCausalRestraint = [
  "not a claim that one project single handedly caused the next",
  "cross project resonances",
  "do not yet allocate the complete design publishing facilitation or founding work"
].every((term) => participationLineageText.includes(term)) && [
  "does not claim that each project caused the next",
  "editorial synthesis",
  "collaborator credit rights and consent"
].every((term) => artisticLineageText.includes(term)) && scenesText.includes("a vivid first person memory does not become independently corroborated because it is specific");
gate("lineage_causal_restraint", lineageCausalRestraint, lineageCausalRestraint
  ? "Project lineage is framed as documented relationship and recurring method, not causal inevitability, sole authorship, or evidence inflation from vivid memory"
  : "A lineage or scene page no longer preserves non-causality, evidence labels, or collaborator boundaries");

const roleMap = wiki.records.find((record) => record.id === "index.role-and-collective-authorship");
const roleMapText = normalizedText(roleMap?.body ?? "");
const collectiveAuthorshipMapIntegrity = roleMap?.kind === "index" &&
  roleMap?.reviewState === "human-blocked" &&
  roleMap?.projectionStatus === "not-applicable" &&
  roleMap?.allowedSurfaces.length === 0 &&
  roleMap?.canonicalRefs.length >= 7 &&
  [
    "not the protected artifact by artifact authorship ledger",
    "revision histories private messages contracts contact details and collaborator testimony remain outside this repository",
    "full archive access does not settle authorship by itself",
    "collaborator review remains a human gate"
  ].every((term) => roleMapText.includes(term));
gate("collective_authorship_map_integrity", collectiveAuthorshipMapIntegrity, collectiveAuthorshipMapIntegrity
  ? "The public-safe role map distinguishes independent, originated, jointly credited, collective, supported, attributed, and unresolved states while artifact-level allocation remains human-blocked"
  : "The role map has weakened its collective-credit vocabulary, protected provenance boundary, or human gate");

const afterlives = wiki.records.find((record) => record.id === "index.project-afterlives-and-handoffs");
const afterlivesText = normalizedText(afterlives?.body ?? "");
const projectAfterlifeIntegrity = afterlives?.kind === "index" &&
  afterlives?.projectionStatus === "not-applicable" &&
  afterlives?.allowedSurfaces.length === 0 &&
  [
    "projects do not all end in the same way",
    "the municipal action and organizational transition are not the same event",
    "private family circumstances are intentionally outside this account",
    "an archive is not proof of a current service",
    "recipient timing and scope are supported at the level used publicly"
  ].every((term) => afterlivesText.includes(term));
gate("project_afterlife_integrity", projectAfterlifeIntegrity, projectAfterlifeIntegrity
  ? "Afterlives distinguish archival survival, continued activity, social transition, administrative action, later reuse, and intentionally absent private context"
  : "The afterlife index conflates project states, public service status, organizational handoff, administrative action, or private context");

const absences = wiki.records.find((record) => record.id === "index.absences-protections-and-permissions");
const absencesText = normalizedText(absences?.body ?? "");
const peoplePlaces = wiki.records.find((record) => record.id === "index.people-places-and-community-testimony");
const peoplePlacesText = normalizedText(peoplePlaces?.body ?? "");
const protectedAbsenceIntegrity = absences?.reviewState === "human-blocked" &&
  absences?.projectionStatus === "not-applicable" &&
  absences?.allowedSurfaces.length === 0 &&
  [
    "personal context intentionally absent",
    "family circumstances near the conclusion of kc town hall work",
    "jamie s authorization allows agents to research it does not manufacture third party consent",
    "do not hill climb by erasing an absence",
    "private locator source body or relationship graph"
  ].every((term) => absencesText.includes(term)) &&
  [
    "without publishing a social graph of private people",
    "being named or scheduled does not prove attendance endorsement agreement or influence",
    "do not belong in this public repository",
    "consented collaborator and participant memory"
  ].every((term) => peoplePlacesText.includes(term));
gate("protected_absence_integrity", protectedAbsenceIntegrity, protectedAbsenceIntegrity
  ? "The Wiki distinguishes missing, unread, protected, rights-blocked, unresolved, intentionally absent, and unselected knowledge while forbidding private social-graph publication"
  : "Protected absence, permission separation, private-context restraint, or people-and-testimony safety has regressed");

const photo = wiki.records.find((record) => record.id === "asset.photo.digital-district.001");
const noPublicWikiRoute = !existsSync(path.join(repoRoot, "apps/www/src/app/knowledge-wiki")) && !existsSync(path.join(repoRoot, "apps/www/src/app/knowledge-bank"));
const projectionSafe = photo?.allowedSurfaces.length === 0 && photo?.rightsState === "private-review" && noPublicWikiRoute;
gate("projection_restraint", projectionSafe, projectionSafe ? "Protected photo remains unprojected and no public Wiki route exists" : "Projection or route boundary failed");

const judgmentDir = path.join(repoRoot, "evals/knowledge-wiki/judgments");
const judgmentErrors = [];
for (const requiredId of suite.stopRule.requireIndependentJudgments) {
  const file = path.join(judgmentDir, `${requiredId}.json`);
  if (!existsSync(file)) {
    judgmentErrors.push(`missing ${requiredId}`);
    continue;
  }
  const judgment = JSON.parse(readFileSync(file, "utf8"));
  if (judgment.id !== requiredId) judgmentErrors.push(`${requiredId} has wrong ID`);
  if (judgment.candidateFingerprint !== candidate) judgmentErrors.push(`${requiredId} is bound to a stale candidate`);
  if (judgment.contractFingerprint !== contract) judgmentErrors.push(`${requiredId} is bound to a stale contract`);
  if (judgment.verdict !== "pass") judgmentErrors.push(`${requiredId} did not pass`);
  if (!Array.isArray(judgment.criteria) || judgment.criteria.some((criterion) => criterion.status !== "pass")) judgmentErrors.push(`${requiredId} has a failing criterion`);
}
gate("candidate_binding", judgmentErrors.length === 0, judgmentErrors.length ? judgmentErrors.join("; ") : `${suite.stopRule.requireIndependentJudgments.length} independent judgments match the exact candidate and contract`);

const missingGates = suite.hardGates.filter((id) => !gates.has(id));
if (missingGates.length) throw new Error(`Eval runner does not implement gates: ${missingGates.join(", ")}`);
const ordered = suite.hardGates.map((id) => gates.get(id));
const passed = ordered.every((item) => item.status === "pass");

console.log(`Knowledge Wiki eval: ${suite.profile}`);
console.log(`Result: ${passed ? "PASS" : "FAIL"}`);
for (const result of ordered) console.log(`- ${result.id}: ${result.status} - ${result.detail}`);
console.log(`Candidate: ${candidate}`);
console.log(`Contract: ${contract}`);
console.log("Diagnostics:");
console.log(`- records: ${wiki.health.diagnostics.records}`);
console.log(`- typed relations: ${wiki.health.diagnostics.typedRelations}`);
console.log(`- prose links: ${wiki.health.diagnostics.proseLinks}`);
console.log(`- rights backlog: ${wiki.health.diagnostics.rightsBacklog.length}`);
console.log("Manual authority gates:");
for (const [id, status] of Object.entries(wiki.health.manualAuthorityGates)) console.log(`- ${id}: ${status}`);
console.log(passed ? `Next action: repeat unchanged until ${suite.stopRule.consecutivePasses} consecutive passes agree, then stop for human review.` : "Next action: fix the highest-value failing gate without weakening the contract.");

if (!passed) process.exit(1);
