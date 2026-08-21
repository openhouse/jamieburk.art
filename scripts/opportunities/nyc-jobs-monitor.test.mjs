import assert from "node:assert/strict";
import test from "node:test";

import {
  buildDigest,
  buildOpportunitySnapshot,
  deliverDigest,
  extractNycJobIds,
  extractLifecycleActions,
  inspectFreshness,
  renderSnapshotMarkdown,
  requireEmailDeliveryConfig,
  scorePosting,
  screenPosting
} from "./nyc-jobs-monitor.mjs";

const requiredFields = [
  "job_id",
  "agency",
  "posting_type",
  "business_title",
  "salary_range_from",
  "salary_range_to",
  "salary_frequency",
  "job_description",
  "minimum_qual_requirements",
  "preferred_skills",
  "post_until"
];

const strongProductRole = {
  job_id: "900001",
  agency: "TECHNOLOGY & INNOVATION",
  posting_type: "External",
  business_title: "Product Operations and Implementation Manager",
  civil_service_title: "IT PROJECT SPECIALIST",
  salary_range_from: "110000",
  salary_range_to: "145000",
  salary_frequency: "Annual",
  work_location: "Brooklyn, NY",
  division_work_unit: "Product",
  job_description:
    "Lead a resident-facing digital service from discovery through implementation and continuous improvement. Coordinate a cross-functional team and agency stakeholders.",
  minimum_qual_requirements:
    "A baccalaureate degree and four years of project management experience, or a satisfactory equivalent combination of education and experience.",
  preferred_skills:
    "Product operations, user research, accessibility, roadmaps, metrics, procurement, implementation, and public service.",
  additional_information: "Full-time role serving New Yorkers.",
  post_until: "30-SEP-2026"
};

test("freshness marks a newer source timestamp stale and an equal timestamp current", () => {
  const config = {
    datasetId: "pda4-rgn4",
    rowsUpdatedAt: 1787079680,
    requiredFields
  };
  const columns = requiredFields.map((fieldName) => ({ fieldName }));

  assert.deepEqual(inspectFreshness({ id: "pda4-rgn4", rowsUpdatedAt: 1787079681, columns }, config), {
    state: "stale",
    reason: "source-updated",
    remoteRowsUpdatedAt: 1787079681,
    storedRowsUpdatedAt: 1787079680
  });
  assert.equal(inspectFreshness({ id: "pda4-rgn4", rowsUpdatedAt: 1787079680, columns }, config).state, "current");
});

test("freshness fails closed when the dataset identity or required schema changes", () => {
  const config = {
    datasetId: "pda4-rgn4",
    rowsUpdatedAt: 1787079680,
    requiredFields
  };
  const columns = requiredFields.slice(0, -1).map((fieldName) => ({ fieldName }));

  assert.equal(inspectFreshness({ id: "wrong-id", rowsUpdatedAt: 1787079681, columns }, config).state, "blocked");
  assert.deepEqual(inspectFreshness({ id: "pda4-rgn4", rowsUpdatedAt: 1787079681, columns }, config).missingFields, [
    "post_until"
  ]);
});

test("screening excludes internal, expired, low-ceiling, and credential-locked postings", () => {
  assert.equal(screenPosting({ ...strongProductRole, posting_type: "Internal" }, { asOf: "2026-08-20" }).eligible, false);
  assert.equal(screenPosting({ ...strongProductRole, post_until: "19-AUG-2026" }, { asOf: "2026-08-20" }).eligible, false);
  assert.equal(
    screenPosting({ ...strongProductRole, salary_range_to: "99999" }, { asOf: "2026-08-20" }).eligible,
    false
  );
  const licensed = screenPosting(
    {
      ...strongProductRole,
      minimum_qual_requirements: "A current New York State license to practice medicine is required."
    },
    { asOf: "2026-08-20" }
  );
  assert.equal(licensed.eligible, false);
  assert.ok(licensed.reasons.includes("credential-hard-screen"));
  const cityEmployeeOnly = screenPosting(
    {
      ...strongProductRole,
      job_description:
        "This position is open only to current City of New York employees serving in a permanent civil service title."
    },
    { asOf: "2026-08-20" }
  );
  assert.equal(cityEmployeeOnly.eligible, false);
  assert.ok(cityEmployeeOnly.reasons.includes("current-city-employee-only"));
});

test("scoring admits a strong public-service product role and preserves separate fit and secure estimates", () => {
  const result = scorePosting(strongProductRole, {
    asOf: "2026-08-20",
    threshold: { composite: 78, fit: 75, secure: 65 }
  });

  assert.equal(result.admitted, true);
  assert.ok(result.fitScore >= 75);
  assert.ok(result.secureScore >= 65);
  assert.equal(result.compositeScore, Number((result.fitScore * 0.55 + result.secureScore * 0.45).toFixed(2)));
  assert.equal(result.qualificationReview, "human-review-required");
});

test("scoring recognizes policy implementation as a product-operations-adjacent leadership signal", () => {
  const result = scorePosting(
    {
      ...strongProductRole,
      job_id: "792925",
      agency: "CAMPAIGN FINANCE BOARD",
      business_title: "Associate Director of Policy Implementation",
      salary_range_from: "125000",
      salary_range_to: "135000",
      job_description:
        "Own an agency-wide policy implementation process, coordinate cross-divisional stakeholders, document decisions, translate policy into plain-language operating guidance, and manage delivery.",
      minimum_qual_requirements:
        "A baccalaureate degree and five years of related experience, including three years supervising staff, or a satisfactory equivalent combination of education and experience.",
      preferred_skills:
        "Project management, process improvement, stakeholder coordination, implementation, public service, and clear documentation."
    },
    { asOf: "2026-08-20", threshold: { composite: 78, fit: 75, secure: 65 } }
  );

  assert.equal(result.admitted, true);
  assert.equal(result.qualificationReview, "human-review-required");
});

test("screening rejects an explicitly mandatory master's degree before scoring", () => {
  const screened = screenPosting(
    {
      ...strongProductRole,
      minimum_qual_requirements:
        "All candidates must have at least a master's degree from an accredited college in sociology, public policy, or a related field."
    },
    { asOf: "2026-08-20" }
  );

  assert.equal(screened.eligible, false);
  assert.ok(screened.reasons.includes("credential-hard-screen"));
});

test("snapshot deduplicates job IDs, omits known opportunities from new intake, and ranks deterministically", () => {
  const secondRole = {
    ...strongProductRole,
    job_id: "900002",
    business_title: "Technical Project Manager",
    salary_range_from: "100000",
    salary_range_to: "130000"
  };
  const snapshot = buildOpportunitySnapshot({
    rows: [secondRole, strongProductRole, { ...strongProductRole, posting_type: "Internal" }],
    metadata: { id: "pda4-rgn4", rowsUpdatedAt: 1787079680 },
    config: {
      datasetId: "pda4-rgn4",
      strongMatchThreshold: { composite: 78, fit: 75, secure: 65 },
      knownJobIds: ["900001", "900003"]
    },
    asOf: "2026-08-20"
  });

  assert.equal(snapshot.census.sourceRows, 3);
  assert.equal(snapshot.census.uniqueJobIds, 2);
  assert.deepEqual(snapshot.newStrongMatches.map((entry) => entry.jobId), ["900002"]);
  assert.equal(snapshot.knownStrongMatches.some((entry) => entry.jobId === "900001"), true);
  assert.deepEqual(snapshot.knownJobIdsAbsentFromDataset, ["900003"]);
});

test("daily digest prioritizes deadlines and distinguishes applications from new review candidates", () => {
  const digest = buildDigest({
    asOf: "2026-08-20",
    activeApplications: [
      { jobId: "782366", title: "Senior Product Manager", applicationState: "submitted", deadline: "2026-10-16" }
    ],
    openOpportunities: [
      { jobId: "784450", title: "Product Manager", deadline: "2026-09-04", compositeScore: 84.25 }
    ],
    newStrongMatches: [
      { jobId: "900001", title: "Product Operations and Implementation Manager", deadline: "2026-09-30", compositeScore: 90 },
      { jobId: "899999", title: "Expired Match", deadline: "2026-08-19", compositeScore: 99 }
    ]
  });

  assert.match(digest.subject, /3 hiring actions/);
  assert.deepEqual(digest.actions.map((entry) => entry.kind), ["apply", "review-new-match", "prepare-active-candidacy"]);
  assert.match(digest.markdown, /Jamie retains application authority/);
});

test("lifecycle extraction includes pending candidacies and actionable open roles only", () => {
  const actions = extractLifecycleActions(
    {
      opportunities: [
        {
          opportunityId: "opportunity.active",
          title: "Active Product Role",
          applicationState: "submitted",
          outcomeState: "pending",
          postingState: "open",
          closesOn: "2026-10-16",
          fitScore: 97,
          considered: true,
          eligibilityState: "review-needed"
        },
        {
          opportunityId: "opportunity.open",
          title: "Open Operations Role",
          applicationState: "not-applied",
          outcomeState: "none",
          postingState: "open",
          closesOn: "2026-09-04",
          fitScore: 91,
          considered: true,
          eligibilityState: "clear"
        },
        {
          opportunityId: "opportunity.expired",
          title: "Expired Role",
          applicationState: "not-applied",
          outcomeState: "none",
          postingState: "expired",
          closesOn: "2026-08-01",
          fitScore: 99,
          considered: true,
          eligibilityState: "clear"
        }
      ]
    },
    "2026-08-20"
  );

  assert.deepEqual(actions.activeApplications.map((entry) => entry.title), ["Active Product Role"]);
  assert.deepEqual(actions.openOpportunities.map((entry) => entry.title), ["Open Operations Role"]);
});

test("NYC job ID extraction ignores opportunities from other employers", () => {
  assert.deepEqual(
    extractNycJobIds({
      opportunities: [
        {
          opportunityId: "opportunity.nyc-oti.senior-product-manager.782366",
          officialSource: "https://cityjobs.nyc.gov/job/senior-product-manager-in-brooklyn-jid-44507"
        },
        {
          opportunityId: "opportunity.codepath.engineering-project-manager.5160542007",
          officialSource: "https://job-boards.greenhouse.io/codepath/jobs/5160542007"
        }
      ]
    }),
    ["782366"]
  );
});

test("snapshot report makes provisional status and feed absence limits explicit", () => {
  const markdown = renderSnapshotMarkdown({
    dataset: { id: "pda4-rgn4", rowsUpdatedAtIso: "2026-08-18T19:01:20.000Z" },
    census: { sourceRows: 2760, uniqueJobIds: 1426, deterministicallyEligible: 395, strongMatches: 1 },
    policy: {
      salaryTarget: 100000,
      strongMatchThreshold: { composite: 78, fit: 75, secure: 65 },
      automaticDisposition: "provisional-intake-only"
    },
    newStrongMatches: [
      {
        jobId: "900001",
        title: "Product Manager",
        agency: "TECHNOLOGY & INNOVATION",
        salaryFrom: 110000,
        salaryTo: 145000,
        deadline: "2026-09-30",
        fitScore: 95,
        secureScore: 85,
        compositeScore: 90.5,
        officialUrl: "https://cityjobs.nyc.gov/jobs?q=900001"
      }
    ],
    knownStrongMatches: [],
    knownJobIdsAbsentFromDataset: ["782366"]
  });

  assert.match(markdown, /provisional intake/i);
  assert.match(markdown, /absence from this feed does not close/i);
  assert.match(markdown, /900001/);
});

test("email delivery config permits only the governed recipient and requires credentials", () => {
  assert.throws(
    () => requireEmailDeliveryConfig({ JOB_DIGEST_TO: "jamie@ohai.us" }),
    /RESEND_API_KEY/
  );
  assert.throws(
    () =>
      requireEmailDeliveryConfig({
        JOB_DIGEST_TO: "someone@example.com",
        JOB_DIGEST_FROM: "Jobs <jobs@example.com>",
        RESEND_API_KEY: "secret"
      }),
    /jamie@ohai\.us/
  );
  assert.deepEqual(
    requireEmailDeliveryConfig({
      JOB_DIGEST_TO: "jamie@ohai.us",
      JOB_DIGEST_FROM: "Jamie hiring loop <jobs@example.com>",
      RESEND_API_KEY: "secret"
    }),
    {
      apiKey: "secret",
      from: "Jamie hiring loop <jobs@example.com>",
      to: "jamie@ohai.us"
    }
  );
});

test("email delivery posts a governed digest to the provider boundary", async () => {
  let request;
  const fetchImpl = async (url, options) => {
    request = { url, options };
    return {
      ok: true,
      async json() {
        return { id: "email-123" };
      }
    };
  };
  const result = await deliverDigest(
    { subject: "2 hiring actions", markdown: "# Digest\n" },
    {
      fetchImpl,
      env: {
        JOB_DIGEST_TO: "jamie@ohai.us",
        JOB_DIGEST_FROM: "Jamie hiring loop <jobs@example.com>",
        RESEND_API_KEY: "secret"
      }
    }
  );

  assert.deepEqual(result, { provider: "resend", messageId: "email-123", recipient: "jamie@ohai.us" });
  assert.equal(request.url, "https://api.resend.com/emails");
  const payload = JSON.parse(request.options.body);
  assert.equal(payload.to[0], "jamie@ohai.us");
  assert.equal(payload.subject, "2 hiring actions");
});
