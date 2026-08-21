import assert from "node:assert/strict";
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  discoveryChecks,
  evaluatePublicHiring,
  loadHiringSuite,
  resolveHiringGaps
} from "./employment-lib.mjs";
import { compileWiki, defaultRepoRoot } from "./lib.mjs";

function candidateFixture() {
  const root = mkdtempSync(path.join(tmpdir(), "employment-eval-"));
  const suite = loadHiringSuite(defaultRepoRoot);
  const files = [
    "evals/knowledge-wiki/hiring-suites.json",
    suite.candidateContextPath,
    ...suite.opportunityPaths,
    ...suite.readerPaths,
    ...Object.values(suite.routeFiles).flat()
  ];
  for (const relativePath of new Set(files)) {
    const target = path.join(root, relativePath);
    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(path.join(defaultRepoRoot, relativePath), target);
  }
  return root;
}

test("candidate mobility context keeps Brooklyn continuity separate from EU work authorization", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);

  assert.equal(report.candidateContext.homeBase, "Brooklyn, New York");
  assert.equal(report.candidateContext.longTermHomeBase, true);
  assert.equal(report.candidateContext.permanentRelocation, "not-preferred");
  assert.equal(report.candidateContext.partYearInternationalWork, "open");
  assert.equal(report.candidateContext.attestationStatus, "user-attested");
  assert.equal(
    report.candidateContext.workAuthorization.austria.status,
    "generally-no-work-permit-required"
  );
  assert.equal(
    report.candidateContext.workAuthorization.austria.basis,
    "Irish citizenship under EU free-movement rules"
  );
  assert.deepEqual(
    report.candidateContext.crossBorderGates.map((gate) => gate.id),
    [
      "gate.employer-location-policy",
      "gate.residence-registration",
      "gate.tax-and-payroll",
      "gate.social-security",
      "gate.travel-and-time-zone"
    ]
  );
  assert.equal(report.publicSafety.exactResidentialAddressReceived, false);
  assert.doesNotMatch(
    JSON.stringify(report.candidateContext),
    /(?:\b\d{1,5}\s+[A-Z][\w.'-]+(?:\s+[A-Z][\w.'-]+){0,3}\s+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Place|Pl)\b|\b(?:Apt|Apartment|Unit)\s+[A-Z0-9-]+\b)/i
  );
});

test("candidate mobility changes invalidate the public hiring context", () => {
  const root = candidateFixture();
  const before = evaluatePublicHiring(root).report.candidateContextHash;
  const contextPath = path.join(root, loadHiringSuite(root).candidateContextPath);

  writeFileSync(
    contextPath,
    readFileSync(contextPath, "utf8").replace("home_base: Brooklyn, New York", "home_base: Vienna, Austria")
  );

  const after = evaluatePublicHiring(root).report.candidateContextHash;
  assert.notEqual(after, before);
});

test("private candidate mobility context fails the public hiring boundary", () => {
  const root = candidateFixture();
  const contextPath = path.join(root, loadHiringSuite(root).candidateContextPath);

  writeFileSync(contextPath, `${readFileSync(contextPath, "utf8")}\n/Users/example/private-passport-scan\n`);

  assert.equal(evaluatePublicHiring(root).report.publicSafety.privateMarkerCount, 1);
});

test("mobility claim remains held and preserves legal and privacy boundaries", () => {
  const result = compileWiki();
  const context = result.byId.get("claim.employment.mobility-and-location.2026-08-15");

  assert.equal(context.projection.status, "hold");
  assert.equal(context.attestation_status, "user-attested");
  assert.ok(context.protected_boundaries.includes("exact residential address"));
  assert.ok(context.anti_claims.includes("An Irish passport by itself makes every cross-border employment arrangement compliant."));
  assert.ok(context.anti_claims.includes("Jamie is willing to relocate permanently away from Brooklyn."));
});

test("public hiring evaluator receives no protected Wiki or communications", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);
  assert.equal(report.publicSafety.privateMarkerCount, 0);
  assert.equal(report.publicSafety.protectedWikiReceived, false);
  assert.equal(report.publicSafety.rawCommunicationsReceived, false);
  assert.equal(report.opportunities.length, 14);
  assert.ok(!JSON.stringify(report).includes("wikiRecords"));
  const protectedOpportunity = report.opportunities.find((item) => item.id.includes("protected.source-backed-memory"));
  assert.equal(protectedOpportunity.live, false);
  assert.equal(protectedOpportunity.decision, "not-live");
  assert.doesNotMatch(
    JSON.stringify(protectedOpportunity),
    /(?:message|email|transcript)_(?:body|excerpt)|(?:collaborator|company)_identity|private_path/i
  );
});

test("priority reporting contexts preserve named title matches and public unknowns", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);
  const aclu = report.opportunities.find((item) =>
    item.id.includes("senior-project-manager-national-campaigns")
  );
  const aiOps = report.opportunities.find((item) =>
    item.id.includes("senior-ai-operations-lead")
  );
  const engineering = report.opportunities.find((item) =>
    item.id.includes("engineering-project-manager")
  );
  const otiProduct = report.opportunities.find((item) =>
    item.id.includes("senior-product-manager.782366")
  );

  assert.equal(aclu.reportingContext.direct_manager_person, null);
  assert.equal(aclu.reportingContext.senior_vision_owner, "Deirdre Schifeling");
  assert.equal(aiOps.reportingContext.direct_manager_person, "Quinton Ma");
  assert.equal(aiOps.reportingContext.senior_vision_owner, "Brian Madigan");
  assert.equal(engineering.reportingContext.direct_manager_person, "Zack Parker");
  assert.equal(engineering.reportingContext.senior_vision_owner, "Chris Coleman");
  assert.equal(otiProduct.reportingContext.direct_manager_person, null);
  assert.equal(otiProduct.reportingContext.senior_vision_owner, "Lisa Gelobter");
});

test("expired OTI operations role remains a non-live watch pattern", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);
  const opportunity = report.opportunities.find((item) =>
    item.id === "opportunity.nyc-oti.technical-operations-manager.782369"
  );
  assert.equal(opportunity.live, false);
  assert.equal(opportunity.decision, "not-live");
});

test("named reader profiles retain simulation disclaimers", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);
  const named = report.readers.filter((reader) => reader.id !== "reader.generic-recruiter");
  assert.ok(named.length >= 5);
  assert.ok(named.every((reader) => /Simulated/.test(reader.disclaimer)));
  assert.ok(named.every((reader) => reader.prohibitedAssumptions.length >= 2));
});

test("shared navigation and field-system evidence changes invalidate the public hiring snapshot", () => {
  const root = candidateFixture();
  const before = evaluatePublicHiring(root).report.portfolioSnapshotHash;

  for (const relativePath of [
    "apps/www/src/components/SiteHeader.tsx",
    "apps/www/src/components/FieldSystemEvidence.tsx"
  ]) {
    const target = path.join(root, relativePath);
    writeFileSync(target, `${readFileSync(target, "utf8")}\n// evaluator freshness probe\n`);
  }

  const after = evaluatePublicHiring(root).report.portfolioSnapshotHash;
  assert.notEqual(after, before);
});

test("removing a declared public proof lowers observed requirement coverage", () => {
  const root = candidateFixture();
  const before = evaluatePublicHiring(root).report;
  const routePath = path.join(root, "apps/www/src/app/work/technical-operations/page.tsx");
  writeFileSync(
    routePath,
    readFileSync(routePath, "utf8").replaceAll("Coordinate delivery across concurrent projects", "")
  );
  const after = evaluatePublicHiring(root).report;
  const beforeOti = before.opportunities.find(
    (item) => item.id === "opportunity.nyc-oti.technical-operations-manager.782369"
  );
  const afterOti = after.opportunities.find(
    (item) => item.id === "opportunity.nyc-oti.technical-operations-manager.782369"
  );
  assert.ok(afterOti.criticalObserved < beforeOti.criticalObserved);
});

test("private path mutation is detected before hiring evaluation can pass", () => {
  const root = candidateFixture();
  const routePath = path.join(root, "apps/www/src/app/page.tsx");
  writeFileSync(routePath, `${readFileSync(routePath, "utf8")}\n/Users/example/private-source\n`);
  assert.equal(evaluatePublicHiring(root).report.publicSafety.privateMarkerCount, 1);
});

test("title-blind discovery retrieves expected roles and excludes hard screens", () => {
  const result = compileWiki();
  const discovery = discoveryChecks(result);
  assert.equal(discovery.passed, true);
  assert.ok(discovery.queries.every((item) => item.titleBlind && item.passed));
  assert.ok(discovery.negatives.every((item) => item.disposition === "exclude-hard-screen"));
});

test("gap resolver remains separate and cannot approve projection", () => {
  const result = compileWiki();
  const publicEvaluation = evaluatePublicHiring(defaultRepoRoot).report;
  const resolution = resolveHiringGaps(result, publicEvaluation).report;
  assert.equal(resolution.humanApprovalRequired, true);
  assert.ok(resolution.findings.every((finding) => finding.requiresHumanApproval));
  assert.ok(resolution.findings.some((finding) => finding.classification === "true-experience-gap"));
  assert.ok(resolution.findings.some((finding) => finding.classification === "visible-weak-evidence-gap"));
  assert.ok(!resolution.findings.some((finding) =>
    finding.currentStatus === "visible-weak" && finding.classification === "wiki-proven-not-projected"
  ));
});

test("closed opportunities cannot be ready for human review", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/oti-senior-product-manager.md");
  writeFileSync(
    opportunityPath,
    readFileSync(opportunityPath, "utf8").replace("opportunity_status: live", "opportunity_status: closed")
  );
  const oti = evaluatePublicHiring(root).report.opportunities.find(
    (item) => item.id === "opportunity.nyc-oti.senior-product-manager.782366"
  );
  assert.equal(oti.live, false);
  assert.equal(oti.decision, "not-live");
});

test("protected metadata opportunity cannot become a live job by status mutation", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/source-backed-team-memory.md");
  writeFileSync(
    opportunityPath,
    readFileSync(opportunityPath, "utf8").replace("opportunity_status: conditional", "opportunity_status: live")
  );
  const opportunity = evaluatePublicHiring(root).report.opportunities.find((item) =>
    item.id.includes("protected.source-backed-memory")
  );
  assert.equal(opportunity.live, false);
  assert.equal(opportunity.decision, "not-live");
});

test("protected opportunity cannot become live by mutating both source type and status", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/source-backed-team-memory.md");
  writeFileSync(
    opportunityPath,
    readFileSync(opportunityPath, "utf8")
      .replace("source_type: protected-metadata", "source_type: official-employer")
      .replace("opportunity_status: conditional", "opportunity_status: live")
  );
  const opportunity = evaluatePublicHiring(root).report.opportunities.find((item) =>
    item.id.includes("protected.source-backed-memory")
  );
  assert.equal(opportunity.live, false);
  assert.equal(opportunity.decision, "not-live");
});

test("exclusionary hard screens fail closed", () => {
  const root = candidateFixture();
  const opportunityPath = path.join(root, "docs/knowledge-bank/opportunities/aclu-senior-project-manager-national-campaigns.md");
  writeFileSync(
    opportunityPath,
    readFileSync(opportunityPath, "utf8").replace(
      "state: likely-met\n    disposition: proceed",
      "state: not-met\n    disposition: do-not-pursue"
    )
  );
  const aclu = evaluatePublicHiring(root).report.opportunities.find(
    (item) => item.id === "opportunity.aclu.senior-project-manager-national-campaigns.8631854002"
  );
  assert.equal(aclu.hardScreenBlocked, true);
  assert.equal(aclu.decision, "hard-screen-exclusion");
});
