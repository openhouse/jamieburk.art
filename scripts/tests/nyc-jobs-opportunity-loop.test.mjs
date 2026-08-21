import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildOpportunityDigest,
  datasetNeedsRefresh,
  prepareOpportunityRefresh,
  rankStrongMatches,
  scorePosting,
  sendDigestWithResend
} from "../opportunities/nyc-jobs-loop.mjs";

const policy = {
  salaryFloorAnnual: 100_000,
  strongMatchThreshold: 76,
  minimumFitScore: 72,
  minimumSecurabilityScore: 65,
  fitWeight: 0.62,
  securabilityWeight: 0.38
};

function posting(overrides = {}) {
  return {
    job_id: "900001",
    agency: "OFFICE OF TECHNOLOGY AND INNOVATION",
    posting_type: "External",
    business_title: "Product Operations Manager",
    civil_service_title: "IT PROJECT SPECIALIST",
    salary_range_from: "105000",
    salary_range_to: "145000",
    salary_frequency: "Annual",
    job_description: "Lead cross-functional product delivery, implementation, stakeholder engagement, requirements, service design, metrics, and vendor coordination for resident-facing digital services.",
    minimum_qual_requirements: "A four-year high school diploma plus four years of project coordination experience; or a satisfactory equivalent combination of education and experience.",
    preferred_skills: "Product management, project management, user research, roadmap, analytics, public service, and plain-language communication.",
    additional_information: "Coordinate agency partners and improve resident experience.",
    post_until: "30-SEP-2026",
    ...overrides
  };
}

test("a newer rowsUpdatedAt marks the committed NYC Jobs snapshot stale", () => {
  assert.equal(datasetNeedsRefresh({ rowsUpdatedAt: 1787079681 }, { rowsUpdatedAt: 1787079680 }), true);
  assert.equal(datasetNeedsRefresh({ rowsUpdatedAt: 1787079680 }, { rowsUpdatedAt: 1787079680 }), false);
  assert.equal(datasetNeedsRefresh({ rowsUpdatedAt: 1787079679 }, { rowsUpdatedAt: 1787079680 }), false);
});

test("an external annual role above the salary floor can clear the strong-match gate", () => {
  const result = scorePosting(posting(), policy, { now: "2026-08-20" });
  assert.equal(result.eligible, true);
  assert.equal(result.admitted, true);
  assert.ok(result.fitScore >= 72);
  assert.ok(result.securabilityScore >= 65);
  assert.ok(result.combinedScore >= 76);
  assert.match(result.actionUrl, /^https:\/\/cityjobs\.nyc\.gov\/jobs\?/);
});

test("deterministic screens reject internal, expired, under-floor, and credential-blocked roles before scoring", () => {
  const cases = [
    [posting({ posting_type: "Internal" }), "internal-only"],
    [posting({ post_until: "19-AUG-2026" }), "expired"],
    [posting({ salary_range_to: "99999" }), "salary-below-floor"],
    [posting({ minimum_qual_requirements: "A current New York State Professional Engineer license is required." }), "credential-hard-screen"]
  ];

  for (const [candidate, expectedReason] of cases) {
    const result = scorePosting(candidate, policy, { now: "2026-08-20" });
    assert.equal(result.eligible, false);
    assert.ok(result.exclusionReasons.includes(expectedReason));
    assert.equal(result.admitted, false);
    assert.equal(result.subjectiveReviewEligible, false);
  }
});

test("a nominally external row cannot bypass an explicit civil-service-only restriction", () => {
  const result = scorePosting(posting({
    posting_type: "External",
    job_description: "Only candidates serving permanently in this civil service title or reachable on the civil service list will be considered."
  }), policy, { now: "2026-08-20" });

  assert.equal(result.eligible, false);
  assert.ok(result.exclusionReasons.includes("civil-service-restricted"));
  assert.equal(result.admitted, false);
});

test("construction and engineering specialists do not enter the transferable digital-project queue", () => {
  const result = scorePosting(posting({
    business_title: "Construction Project Manager",
    civil_service_title: "ASSOCIATE PROJECT MANAGER",
    minimum_qual_requirements: "Five years managing construction projects worth at least $300,000, or an engineering degree and equivalent construction experience.",
    preferred_skills: "Bridge inspection, structural engineering, building codes, and construction management."
  }), policy, { now: "2026-08-20" });

  assert.equal(result.eligible, false);
  assert.ok(result.exclusionReasons.includes("specialist-domain-hard-screen"));
  assert.equal(result.admitted, false);
});

test("ranking deduplicates internal and external copies and admits only threshold-clearing roles", () => {
  const weak = posting({
    job_id: "900002",
    business_title: "Payroll Clerk",
    job_description: "Process payroll forms.",
    preferred_skills: "Data entry."
  });
  const ranked = rankStrongMatches([
    posting({ posting_type: "Internal" }),
    posting(),
    weak
  ], policy, { now: "2026-08-20" });

  assert.equal(ranked.all.length, 2);
  assert.deepEqual(ranked.admitted.map(({ jobId }) => jobId), ["900001"]);
  assert.ok(ranked.all[0].combinedScore >= ranked.all[1].combinedScore);
});

test("generic executive and specialist language cannot overwhelm title and domain mismatch", () => {
  const genericExecutive = scorePosting(posting({
    job_id: "900003",
    business_title: "Deputy Commissioner, Clinical Operations",
    civil_service_title: "HEALTH SERVICES MANAGER",
    job_description: "Lead cross-functional operations, implementation, requirements, stakeholder engagement, metrics, analytics, vendor coordination, community services, and program management.",
    preferred_skills: "Clinical operations leadership and health-system administration."
  }), policy, { now: "2026-08-20" });

  assert.equal(genericExecutive.eligible, true);
  assert.equal(genericExecutive.admitted, false);
  assert.ok(genericExecutive.securabilityScore < 65);
});

test("direct digital project delivery remains eligible after seniority and domain safeguards", () => {
  const digitalProject = scorePosting(posting({
    job_id: "900004",
    business_title: "Senior Digital Project Manager",
    civil_service_title: "IT PROJECT SPECIALIST",
    job_description: "Lead public-facing digital service delivery, requirements, implementation, cross-functional agency coordination, stakeholder research, metrics, and vendor work.",
    preferred_skills: "Digital product delivery, project management, analytics, and resident-centered service design."
  }), policy, { now: "2026-08-20" });

  assert.equal(digitalProject.eligible, true);
  assert.equal(digitalProject.admitted, true);
  assert.ok(digitalProject.matchedSignals.includes("title-role-adjacency"));
  assert.ok(digitalProject.matchedSignals.includes("digital-technical-systems"));
});

test("policy implementation leadership is treated as delivery-role adjacency", () => {
  const result = scorePosting(posting({
    job_id: "792925",
    agency: "CAMPAIGN FINANCE BOARD",
    business_title: "Associate Director of Policy Implementation",
    civil_service_title: "EXECUTIVE PROGRAM MANAGER",
    salary_range_from: "125000",
    salary_range_to: "135000",
    job_description: "Lead policy implementation, governance, documentation, implementation planning, cross-divisional coordination, stakeholder engagement, program evaluation, and continuous improvement for public-facing election services.",
    minimum_qual_requirements: "A bachelor's degree and one year of experience; or a four-year high school diploma and five years of experience; or an equivalent combination of education and experience.",
    preferred_skills: "Project management, facilitation, plain language, evidence-based recommendations, and operational change."
  }), {
    ...policy,
    strongMatchThreshold: 84,
    minimumFitScore: 78,
    minimumSecurabilityScore: 70
  }, { now: "2026-08-20" });

  assert.equal(result.admitted, true);
  assert.ok(result.matchedSignals.includes("title-role-adjacency"));
});

test("the daily digest includes only verified actionable roles and new strong matches", () => {
  const digest = buildOpportunityDigest({
    generatedAt: "2026-08-20T12:00:00.000Z",
    datasetUpdatedAt: "2026-08-18T19:01:20.000Z",
    activeOpportunities: [
      { jobId: "784450", title: "Product Manager", agency: "NYC OTI", actionUrl: "https://cityjobs.nyc.gov/job/product-manager-in-brooklyn-jid-45056", verifiedActionable: true, nextAction: "Submit the prepared application." },
      { jobId: "000000", title: "Unverified", agency: "Example", actionUrl: "https://example.com", verifiedActionable: false, nextAction: "Do not send." }
    ],
    newStrongMatches: [scorePosting(posting(), policy, { now: "2026-08-20" })]
  });

  assert.match(digest.subject, /NYC opportunity action digest/);
  assert.match(digest.markdown, /Product Manager/);
  assert.match(digest.markdown, /Product Operations Manager/);
  assert.doesNotMatch(digest.markdown, /Unverified/);
  assert.match(digest.markdown, /Submit the prepared application/);
});

test("unchanged dataset metadata skips rescoring while preserving the active-opportunity digest", () => {
  const result = prepareOpportunityRefresh({
    metadata: { rowsUpdatedAt: 1787079680 },
    committedState: { rowsUpdatedAt: 1787079680 },
    postings: [posting()],
    policy,
    now: "2026-08-20",
    activeOpportunities: [
      { jobId: "784450", title: "Product Manager", agency: "NYC OTI", actionUrl: "https://cityjobs.nyc.gov/job/example", verifiedActionable: true, nextAction: "Apply today." }
    ]
  });

  assert.equal(result.refreshRequired, false);
  assert.equal(result.scoringPerformed, false);
  assert.deepEqual(result.newStrongMatches, []);
  assert.match(result.digest.markdown, /Apply today/);
});

test("an unchanged revision keeps unresolved strong matches in the daily action digest", () => {
  const carriedCandidate = scorePosting(posting(), policy, { now: "2026-08-20" });
  const result = prepareOpportunityRefresh({
    metadata: { rowsUpdatedAt: 1787079680 },
    committedState: { rowsUpdatedAt: 1787079680 },
    postings: [],
    policy,
    now: "2026-08-21",
    carriedCandidates: [carriedCandidate]
  });

  assert.equal(result.scoringPerformed, false);
  assert.deepEqual(result.newStrongMatches, []);
  assert.deepEqual(result.candidateMatches.map(({ jobId }) => jobId), ["900001"]);
  assert.match(result.digest.markdown, /Product Operations Manager/);
  assert.match(result.digest.markdown, /verify the individual official posting/i);
});

test("a newer dataset revision scores once and omits already-known job IDs from the new queue", () => {
  const result = prepareOpportunityRefresh({
    metadata: { rowsUpdatedAt: 1787079681 },
    committedState: { rowsUpdatedAt: 1787079680 },
    postings: [posting(), posting({ job_id: "900005", business_title: "Senior Digital Project Manager" })],
    policy,
    now: "2026-08-20",
    knownJobIds: ["900001"]
  });

  assert.equal(result.refreshRequired, true);
  assert.equal(result.scoringPerformed, true);
  assert.deepEqual(result.newStrongMatches.map(({ jobId }) => jobId), ["900005"]);
  assert.equal(result.nextSourceState.rowsUpdatedAt, 1787079681);
});

test("email delivery is disabled without an explicit runtime send gate", async () => {
  let requests = 0;
  const result = await sendDigestWithResend(
    { subject: "Digest", markdown: "Action list" },
    {
      sendEnabled: false,
      apiKey: "unused",
      from: "digest@example.invalid",
      to: "reader@example.invalid",
      fetchImpl: async () => { requests += 1; }
    }
  );
  assert.deepEqual(result, { sent: false, reason: "delivery-disabled" });
  assert.equal(requests, 0);
});

test("authorized email delivery uses runtime-only addresses and a deterministic payload", async () => {
  let request;
  const result = await sendDigestWithResend(
    { subject: "NYC opportunity action digest", markdown: "# Today\n\nApply." },
    {
      sendEnabled: true,
      apiKey: "test-secret",
      from: "digest@example.invalid",
      to: "reader@example.invalid",
      fetchImpl: async (url, options) => {
        request = { url, options };
        return { ok: true, json: async () => ({ id: "message-1" }) };
      }
    }
  );
  assert.equal(result.sent, true);
  assert.equal(result.messageId, "message-1");
  assert.equal(request.url, "https://api.resend.com/emails");
  assert.deepEqual(JSON.parse(request.options.body), {
    from: "digest@example.invalid",
    to: ["reader@example.invalid"],
    subject: "NYC opportunity action digest",
    text: "# Today\n\nApply."
  });
});

test("the CLI materializes a public-safe queue, digest, and updated source state", () => {
  const root = mkdtempSync(path.join(tmpdir(), "nyc-jobs-loop-"));
  const metadataPath = path.join(root, "metadata.json");
  const postingsPath = path.join(root, "postings.json");
  const configPath = path.join(root, "config.json");
  writeFileSync(metadataPath, JSON.stringify({ rowsUpdatedAt: 1787079681 }));
  writeFileSync(postingsPath, JSON.stringify([posting()]));
  writeFileSync(configPath, JSON.stringify({
    schemaVersion: 1,
    source: { datasetId: "pda4-rgn4" },
    state: { rowsUpdatedAt: 1787079680 },
    policy,
    knownJobIds: [],
    activeOpportunities: []
  }));

  execFileSync(process.execPath, [
    "scripts/opportunities/run-nyc-jobs-loop.mjs",
    "--metadata", metadataPath,
    "--postings", postingsPath,
    "--config", configPath,
    "--output-dir", root,
    "--now", "2026-08-20"
  ], { cwd: new URL("../../", import.meta.url), stdio: "pipe" });

  const queue = JSON.parse(readFileSync(path.join(root, "nyc-jobs-candidate-queue.json"), "utf8"));
  const state = JSON.parse(readFileSync(path.join(root, "nyc-jobs-source-state.json"), "utf8"));
  const digest = readFileSync(path.join(root, "nyc-jobs-action-digest.md"), "utf8");
  assert.deepEqual(queue.candidates.map(({ jobId }) => jobId), ["900001"]);
  assert.equal(queue.candidates[0].verificationState, "candidate-needs-official-posting-verification");
  assert.doesNotMatch(JSON.stringify(queue), /minimum_qual_requirements|recruitment_contact|job_description/);
  assert.equal(state.rowsUpdatedAt, 1787079681);
  assert.match(digest, /Product Operations Manager/);
});

test("the CLI active-digest-only mode never rescans an already processed revision", () => {
  const root = mkdtempSync(path.join(tmpdir(), "nyc-jobs-digest-only-"));
  const metadataPath = path.join(root, "metadata.json");
  const postingsPath = path.join(root, "postings.json");
  const configPath = path.join(root, "config.json");
  const candidatePath = path.join(root, "candidate-queue.json");
  writeFileSync(metadataPath, JSON.stringify({ rowsUpdatedAt: 1787079681 }));
  writeFileSync(postingsPath, "[]");
  writeFileSync(configPath, JSON.stringify({
    schemaVersion: 1,
    source: { datasetId: "pda4-rgn4" },
    state: { rowsUpdatedAt: 1787079680 },
    policy,
    knownJobIds: [],
    activeOpportunities: []
  }));
  writeFileSync(candidatePath, JSON.stringify({ candidates: [scorePosting(posting(), policy, { now: "2026-08-20" })] }));

  execFileSync(process.execPath, [
    "scripts/opportunities/run-nyc-jobs-loop.mjs",
    "--metadata", metadataPath,
    "--postings", postingsPath,
    "--config", configPath,
    "--output-dir", root,
    "--now", "2026-08-20",
    "--candidate-queue", candidatePath,
    "--active-digest-only"
  ], { cwd: new URL("../../", import.meta.url), stdio: "pipe" });

  const queue = JSON.parse(readFileSync(path.join(root, "nyc-jobs-candidate-queue.json"), "utf8"));
  assert.equal(queue.refreshRequired, false);
  assert.equal(queue.scoringPerformed, false);
  assert.deepEqual(queue.candidates.map(({ jobId }) => jobId), ["900001"]);
  assert.match(readFileSync(path.join(root, "nyc-jobs-action-digest.md"), "utf8"), /Product Operations Manager/);
});
