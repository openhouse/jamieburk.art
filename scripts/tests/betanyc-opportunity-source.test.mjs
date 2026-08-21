import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  findLatestNewsletterIssue,
  newsletterNeedsRefresh,
  parseBetaNycJobsSection,
  prepareBetaNycRefresh
} from "../opportunities/betanyc-newsletter-source.mjs";

const root = new URL("../../", import.meta.url);

function read(relativePath) {
  return readFileSync(new URL(relativePath, root), "utf8");
}

const indexHtml = `
  <a href="https://www.beta.nyc/2026/08/20/this-week-in-nycs-civictech-august-20-2026/">
    This week in NYC’s #CivicTech – August 20, 2026
  </a>
  <a href="https://www.beta.nyc/2026/08/13/this-week-in-nycs-civictech-august-13-2026/">
    This week in NYC’s #CivicTech – August 13, 2026
  </a>`;

const issueHtml = `
  <h3>Jobs &amp; Opportunities</h3>
  <ul>
    <li><strong><a href="https://cityjobs.nyc.gov/job/792925">Associate Director of Policy Implementation — Campaign Finance Board</a></strong> — Deadline: 13-OCT-2026.</li>
    <li><strong><a href="https://example.org/jobs/product-manager?utm_source=betanyc">Product Manager — Example Civic Company</a></strong> — Deadline: Rolling basis.</li>
  </ul>
  <h3>Media to Watch, Listen, or Read</h3>
  <ul><li><a href="https://example.org/not-a-job">Not a job</a></li></ul>`;

const policy = {
  salaryFloorAnnual: 100_000,
  strongMatchThreshold: 84,
  minimumFitScore: 78,
  minimumSecurabilityScore: 70,
  fitWeight: 0.62,
  securabilityWeight: 0.38
};

const cfbPosting = {
  job_id: "792925",
  agency: "CAMPAIGN FINANCE BOARD",
  posting_type: "External",
  business_title: "Associate Director of Policy Implementation",
  civil_service_title: "EXECUTIVE PROGRAM MANAGER",
  salary_range_from: "125000",
  salary_range_to: "135000",
  salary_frequency: "Annual",
  post_until: "13-OCT-2026",
  job_description: "Lead policy implementation, governance, documentation, implementation planning, cross-divisional coordination, stakeholder engagement, program evaluation, and continuous improvement for public-facing election services.",
  minimum_qual_requirements: "A bachelor's degree and one year of experience; or a four-year high school diploma and five years of experience; or an equivalent combination of education and experience.",
  preferred_skills: "Project management, facilitation, plain language, evidence-based recommendations, and operational change.",
  additional_information: "Serve New Yorkers through an independent city agency."
};

test("the public archive exposes the newest distinct weekly issue", () => {
  assert.deepEqual(findLatestNewsletterIssue(indexHtml), {
    issueDate: "2026-08-20",
    issueUrl: "https://www.beta.nyc/2026/08/20/this-week-in-nycs-civictech-august-20-2026/",
    issueKey: "betanyc-newsletter-2026-08-20"
  });
  assert.equal(newsletterNeedsRefresh({ issueKey: "betanyc-newsletter-2026-08-20" }, { issueKey: "betanyc-newsletter-2026-08-13" }), true);
  assert.equal(newsletterNeedsRefresh({ issueKey: "betanyc-newsletter-2026-08-20" }, { issueKey: "betanyc-newsletter-2026-08-20" }), false);
});

test("only Jobs & Opportunities entries are parsed and tracking parameters are removed", () => {
  const jobs = parseBetaNycJobsSection(issueHtml);
  assert.equal(jobs.length, 2);
  assert.deepEqual(jobs[0], {
    title: "Associate Director of Policy Implementation",
    employer: "Campaign Finance Board",
    deadline: "2026-10-13",
    deadlineLabel: "13-OCT-2026",
    discoveryUrl: "https://cityjobs.nyc.gov/job/792925",
    officialJobId: "792925"
  });
  assert.equal(jobs[1].discoveryUrl, "https://example.org/jobs/product-manager");
  assert.equal(jobs[1].deadline, "");
  assert.doesNotMatch(JSON.stringify(jobs), /not-a-job|utm_source/);
});

test("official NYC rows control eligibility and only strong verified matches reach subjective review", () => {
  const result = prepareBetaNycRefresh({
    currentIssue: findLatestNewsletterIssue(indexHtml),
    committedState: { issueKey: "betanyc-newsletter-2026-08-13" },
    issueHtml,
    nycPostings: [cfbPosting],
    policy,
    now: "2026-08-20"
  });

  assert.equal(result.refreshRequired, true);
  assert.equal(result.leadsObserved, 2);
  assert.equal(result.officialPostingsVerified, 1);
  assert.deepEqual(result.candidateMatches.map(({ jobId }) => jobId), ["792925"]);
  assert.equal(result.candidateMatches[0].admitted, true);
  assert.equal(result.candidateMatches[0].subjectiveReviewEligible, true);
  assert.equal(result.unverifiedLeads[0].verificationState, "official-posting-verification-required");
  assert.equal(result.unverifiedLeads[0].subjectiveReviewEligible, false);
});

test("the committed source model records BetaNYC's unique affordances and privacy boundary", () => {
  const registry = JSON.parse(read("evals/opportunity-intake/sources.json"));
  const source = registry.sources.find(({ id }) => id === "source.betanyc.weekly-civictech-newsletter");
  assert.ok(source);
  assert.equal(source.sourceType, "curated-recurring-email-and-public-archive");
  assert.ok(source.affordances.includes("cross-sector-opportunity-discovery"));
  assert.ok(source.affordances.includes("community-context-and-events"));
  assert.ok(source.freshnessSignals.includes("latest-distinct-public-issue"));
  assert.ok(source.boundaries.includes("newsletter-is-discovery-not-employer-authority"));
  assert.ok(source.boundaries.includes("private-mailbox-identifiers-are-not-committed"));
});

test("the scheduled loop checks BetaNYC daily after deterministic tests", () => {
  const workflow = read(".github/workflows/nyc-jobs-opportunity-digest.yml");
  assert.match(workflow, /opportunities:betanyc:eval/);
  assert.match(workflow, /opportunities:betanyc:daily/);
  assert.ok(workflow.indexOf("opportunities:betanyc:eval") < workflow.indexOf("opportunities:betanyc:daily"));
  assert.doesNotMatch(workflow, /noel@beta\.nyc|jamie@ohai\.us/i);
});

test("the August 20 source snapshot is public-safe and records the promoted match", () => {
  const snapshot = JSON.parse(read("reports/opportunities/betanyc-2026-08-20.json"));
  assert.equal(snapshot.issueKey, "betanyc-newsletter-2026-08-20");
  assert.equal(snapshot.jobsObserved, 19);
  assert.deepEqual(snapshot.promotedCandidateJobIds, ["792925"]);
  assert.doesNotMatch(JSON.stringify(snapshot), /messageId|recipient|tracking|us6\.list-manage/);
});
