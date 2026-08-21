import assert from "node:assert/strict";
import test from "node:test";

import {
  buildOpportunityDigest,
  buildRefreshArtifacts,
  deliveryDecision,
  deliverDigest,
  mergeActionableOpportunities,
  qualifyJobs,
  sourceRefreshState
} from "./nyc-jobs-lib.mjs";

const asOf = "2026-08-20";

function productManager(overrides = {}) {
  return {
    job_id: "900001",
    agency: "TECHNOLOGY & INNOVATION",
    posting_type: "External",
    number_of_positions: "4",
    business_title: "Senior Product Manager",
    civil_service_title: "IT PROJECT SPECIALIST",
    salary_range_from: "100000",
    salary_range_to: "180000",
    salary_frequency: "Annual",
    work_location: "Brooklyn",
    division_work_unit: "Public Product Delivery",
    job_description:
      "Lead resident-facing digital products from discovery and user research through requirements, launch, measurement, and continuous improvement. Coordinate cross-functional agency stakeholders and technical delivery.",
    minimum_qual_requirements:
      "A baccalaureate degree and four years of project delivery experience, or a satisfactory equivalent combination of education and experience.",
    preferred_skills:
      "Product management, public-interest technology, facilitation, agile delivery, data-informed prioritization, documentation, and team operations.",
    residency_requirement: "New York City residency is generally required.",
    post_until: "16-OCT-2026",
    ...overrides
  };
}

test("row-data freshness changes only when the official rowsUpdatedAt advances", () => {
  assert.deepEqual(
    sourceRefreshState({
      lastSeenRowsUpdatedAt: "2026-08-18T19:01:20.000Z",
      observedRowsUpdatedAt: "2026-08-18T19:01:20.000Z"
    }),
    { stale: false, reason: "current" }
  );
  assert.deepEqual(
    sourceRefreshState({
      lastSeenRowsUpdatedAt: "2026-08-18T19:01:20.000Z",
      observedRowsUpdatedAt: "2026-08-19T12:00:00.000Z"
    }),
    { stale: true, reason: "row-data-updated" }
  );
  assert.deepEqual(
    sourceRefreshState({
      lastSeenRowsUpdatedAt: "2026-08-18T19:01:20.000Z",
      observedRowsUpdatedAt: "2026-08-17T12:00:00.000Z"
    }),
    { stale: true, reason: "source-clock-regressed" }
  );
});

test("deterministic screens run before scoring and exclude ineligible postings", () => {
  const licensedClinical = productManager({
    job_id: "900002",
    business_title: "Clinical Director",
    minimum_qual_requirements: "A current New York State physician license is required."
  });
  const internalOnly = productManager({ job_id: "900003", posting_type: "Internal" });
  const belowTarget = productManager({
    job_id: "900004",
    salary_range_from: "70000",
    salary_range_to: "95000"
  });
  const expired = productManager({ job_id: "900005", post_until: "19-AUG-2026" });

  const result = qualifyJobs(
    [licensedClinical, internalOnly, belowTarget, expired],
    { asOf, threshold: { fit: 75, securability: 60, combined: 78 } }
  );

  assert.equal(result.scoredCount, 0);
  assert.deepEqual(
    Object.fromEntries(result.excluded.map((item) => [item.jobId, item.reasons])),
    {
      "900002": ["specialized-hard-screen"],
      "900003": ["not-publicly-open"],
      "900004": ["compensation-below-target"],
      "900005": ["posting-expired"]
    }
  );
});

test("advanced-degree and construction requirements fail before matching", () => {
  const mastersRequired = productManager({
    job_id: "900008",
    business_title: "Special Projects Manager",
    minimum_qual_requirements:
      "All candidates must have at least a master's degree in an appropriate field of specialization."
  });
  const constructionRole = productManager({
    job_id: "900009",
    business_title: "Senior Project Manager",
    agency: "DEPT OF DESIGN & CONSTRUCTION",
    job_description:
      "Manage capital construction, engineering design, field inspections, and contractor performance."
  });

  const result = qualifyJobs(
    [mastersRequired, constructionRole],
    { asOf, threshold: { fit: 75, securability: 60, combined: 78 } }
  );

  assert.equal(result.scoredCount, 0);
  assert.deepEqual(
    result.excluded.map((item) => item.reasons),
    [["specialized-hard-screen"], ["specialized-hard-screen"]]
  );
});

test("qualification deduplicates internal copies and admits only strong transparent matches", () => {
  const internalCopy = productManager({ posting_type: "Internal" });
  const weakRole = productManager({
    job_id: "900006",
    business_title: "Administrative Supervisor",
    division_work_unit: "Fleet Records",
    job_description: "Supervise routine filing and vehicle inventory.",
    preferred_skills: "Spreadsheet data entry."
  });

  const result = qualifyJobs(
    [internalCopy, productManager(), weakRole],
    { asOf, threshold: { fit: 75, securability: 60, combined: 78 } }
  );

  assert.equal(result.uniqueJobCount, 2);
  assert.equal(result.scoredCount, 2);
  assert.deepEqual(result.admitted.map((item) => item.jobId), ["900001"]);
  assert.ok(result.admitted[0].fitScore >= 75);
  assert.ok(result.admitted[0].securabilityScore >= 60);
  assert.ok(result.admitted[0].combinedScore >= 78);
  assert.ok(result.admitted[0].matchedSignals.includes("product-delivery"));
  assert.ok(result.admitted[0].matchedSignals.includes("public-service"));
  assert.ok(result.rejected.some((item) => item.jobId === "900006"));
});

test("generic city boilerplate cannot admit a role without a relevant title family", () => {
  const unrelated = productManager({
    job_id: "900007",
    business_title: "Regional Manager",
    job_description:
      "Lead public service operations, product delivery, digital systems, cross-functional implementation, stakeholder engagement, data, documentation, facilitation, strategy, and continuous improvement.",
    preferred_skills:
      "Project management, product management, technology, communications, public policy, and operations."
  });

  const result = qualifyJobs(
    [unrelated],
    { asOf, threshold: { fit: 75, securability: 60, combined: 78 } }
  );

  assert.deepEqual(result.admitted, []);
  assert.equal(result.rejected[0].titleAlignmentScore, 0);
  assert.ok(result.rejected[0].admissionFailures.includes("title-alignment"));
});

test("participatory-governance delivery can clear the strong gate without title inflation", () => {
  const coGovernance = productManager({
    job_id: "900010",
    business_title: "Co-Governance Project Coordinator",
    salary_range_from: "90000",
    salary_range_to: "110000",
    number_of_positions: "1",
    job_description:
      "Launch participatory governance models, build digital deliberation infrastructure, coordinate public forums and community collaborations, design facilitation, and deliver complex organizing projects.",
    minimum_qual_requirements:
      "A bachelor's degree and three years of community organizing, or a satisfactory combination of education and experience equivalent to that requirement.",
    preferred_skills: "Coalition building, facilitation, public engagement, collaboration, and calm execution."
  });

  const result = qualifyJobs(
    [coGovernance],
    { asOf, threshold: { fit: 75, securability: 60, combined: 84 } }
  );

  assert.deepEqual(result.admitted.map((item) => item.jobId), ["900010"]);
  assert.ok(result.admitted[0].matchedSignals.includes("participatory-governance"));
});

test("tracked live opportunities remain actionable when the complementary dataset omits them", () => {
  const discovered = qualifyJobs(
    [productManager()],
    { asOf, threshold: { fit: 75, securability: 60, combined: 78 } }
  ).admitted;
  const tracked = [
    {
      opportunityId: "opportunity.nyc-oti.senior-product-manager.782366",
      jobId: "782366",
      title: "NYC OTI - PIT Crew Senior Product Manager",
      organization: "NYC OTI",
      canonicalUrl: "https://cityjobs.nyc.gov/job/example",
      status: "live",
      applicationStatus: "not-recorded",
      postedUntil: "2026-10-16",
      fitScore: 91,
      securabilityScore: 74,
      combinedScore: 99
    }
  ];

  const merged = mergeActionableOpportunities(discovered, tracked, { asOf });

  assert.deepEqual(merged.map((item) => item.jobId), ["782366", "900001"]);
  assert.equal(merged[0].source, "knowledge-wiki");
  assert.equal(merged[1].source, "nyc-open-data");
});

test("YAML date objects do not silently remove maintained live opportunities", () => {
  const tracked = [
    {
      opportunityId: "opportunity.nyc-oti.product-manager.784450",
      jobId: "784450",
      title: "NYC OTI - Product Manager 784450",
      organization: "NYC OTI",
      canonicalUrl: "https://cityjobs.nyc.gov/job/example",
      status: "live",
      applicationStatus: "not-recorded",
      postedUntil: new Date("2026-09-04T00:00:00.000Z"),
      fitScore: 89,
      securabilityScore: 74,
      combinedScore: 83
    }
  ];

  const merged = mergeActionableOpportunities([], tracked, { asOf });

  assert.deepEqual(merged.map((item) => item.jobId), ["784450"]);
  assert.equal(merged[0].postedUntil, "2026-09-04");
});

test("daily digest gives each active opportunity one concrete next action", () => {
  const opportunities = mergeActionableOpportunities(
    qualifyJobs(
      [productManager({ post_until: "23-AUG-2026" })],
      { asOf, threshold: { fit: 75, securability: 60, combined: 78 } }
    ).admitted,
    [],
    { asOf }
  );

  const digest = buildOpportunityDigest({
    asOf,
    sourceUpdatedAt: "2026-08-18T19:01:20.000Z",
    opportunities
  });

  assert.equal(digest.subject, "Jamie’s hiring actions — 1 active opportunity — 2026-08-20");
  assert.match(digest.markdown, /Apply now/);
  assert.match(digest.markdown, /Senior Product Manager/);
  assert.match(digest.markdown, /Dataset row data: 2026-08-18/);
  assert.doesNotMatch(digest.markdown, /jamie@ohai\.us/i);
});

test("refresh artifacts add admitted roles as governed review-gated opportunities", () => {
  const qualification = qualifyJobs(
    [productManager({ job_description: `${productManager().job_description} RAW DESCRIPTION SENTINEL` })],
    { asOf, threshold: { fit: 75, securability: 60, combined: 84 } }
  );
  const artifacts = buildRefreshArtifacts({
    asOf,
    metadata: {
      id: "pda4-rgn4",
      name: "NYC Jobs",
      description: "Current City job postings, including internal and external rows.",
      rowsUpdatedAt: 1_787_079_680,
      rowCount: 2760,
      updateFrequency: "Weekly",
      automation: "Yes"
    },
    qualification,
    trackedOpportunities: [],
    config: {
      schemaVersion: 1,
      datasetId: "pda4-rgn4",
      landingPage: "https://data.cityofnewyork.us/d/pda4-rgn4",
      metadataEndpoint: "https://data.cityofnewyork.us/api/views/pda4-rgn4",
      dataEndpoint: "https://data.cityofnewyork.us/resource/pda4-rgn4.json",
      strongMatchThreshold: { fit: 75, securability: 60, combined: 84 }
    }
  });

  assert.ok(artifacts.files["docs/knowledge-bank/sources/nyc-jobs-open-data.md"]);
  assert.ok(artifacts.files["docs/knowledge-bank/evaluations/nyc-jobs-opportunity-feed.md"]);
  const opportunity = artifacts.files["docs/knowledge-bank/opportunities/nyc-jobs-900001.md"];
  assert.match(opportunity, /^id: opportunity\.nyc-jobs\.900001$/m);
  assert.match(opportunity, /^human_review: requested$/m);
  assert.match(opportunity, /^application_materials_gate: required-before-application-material-generation$/m);
  assert.match(opportunity, /opportunity_status: live/);
  assert.match(opportunity, /salary, civil-service eligibility, and official posting status/);
  assert.doesNotMatch(opportunity, /RAW DESCRIPTION SENTINEL/);
  assert.equal(artifacts.report.admittedCount, 1);
  assert.equal(artifacts.actionable.length, 1);
});

test("the source record treats the open dataset as complementary rather than complete", () => {
  const qualification = qualifyJobs(
    [productManager()],
    { asOf, threshold: { fit: 75, securability: 60, combined: 84 } }
  );
  const artifacts = buildRefreshArtifacts({
    asOf,
    metadata: {
      id: "pda4-rgn4",
      name: "NYC Jobs",
      description: "Current City job postings.",
      rowsUpdatedAt: 1_787_079_680,
      rowCount: 2760,
      updateFrequency: "Weekly",
      automation: "Yes"
    },
    qualification,
    trackedOpportunities: [],
    config: {
      schemaVersion: 1,
      datasetId: "pda4-rgn4",
      landingPage: "https://data.cityofnewyork.us/d/pda4-rgn4",
      metadataEndpoint: "https://data.cityofnewyork.us/api/views/pda4-rgn4",
      dataEndpoint: "https://data.cityofnewyork.us/resource/pda4-rgn4.json",
      strongMatchThreshold: { fit: 75, securability: 60, combined: 84 }
    }
  });
  const source = artifacts.files["docs/knowledge-bank/sources/nyc-jobs-open-data.md"];

  assert.match(source, /Data last updated: August 18, 2026/);
  assert.match(source, /2,760 rows/);
  assert.match(source, /complementary discovery source/);
  assert.match(source, /does not replace direct checks/);
});

test("email delivery fails closed in staging and when required secrets are absent", () => {
  assert.deepEqual(
    deliveryDecision({ appEnv: "staging", delivery: "send", apiKey: "secret", from: "from@example.org", to: "to@example.org" }),
    { mode: "dry-run", reason: "non-production-environment" }
  );
  assert.deepEqual(
    deliveryDecision({ appEnv: "production", delivery: "send", apiKey: "", from: "", to: "" }),
    { mode: "blocked", reason: "email-configuration-incomplete" }
  );
  assert.deepEqual(
    deliveryDecision({ appEnv: "production", delivery: "dry-run", apiKey: "secret", from: "from@example.org", to: "to@example.org" }),
    { mode: "dry-run", reason: "delivery-disabled" }
  );
});

test("authorized production delivery sends the digest through the configured email API", async () => {
  const calls = [];
  const fakeFetch = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, status: 200, json: async () => ({ id: "email-123" }) };
  };
  const digest = { subject: "Subject", markdown: "Body" };

  const result = await deliverDigest({
    digest,
    appEnv: "production",
    delivery: "send",
    apiKey: "secret",
    from: "Opportunity Loop <opportunities@example.org>",
    to: "recipient@example.org",
    fetchImpl: fakeFetch
  });

  assert.deepEqual(result, { mode: "sent", providerId: "email-123" });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal(calls[0].options.method, "POST");
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    from: "Opportunity Loop <opportunities@example.org>",
    to: ["recipient@example.org"],
    subject: "Subject",
    text: "Body"
  });
});
