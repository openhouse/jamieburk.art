import assert from "node:assert/strict";
import test from "node:test";

import {
  buildBetaNycSnapshot,
  extractNewsletterOpportunities,
  inspectNewsletterFreshness,
  renderBetaNycSnapshotMarkdown
} from "./betanyc-newsletter-monitor.mjs";

const newsletterHtml = `
  <h3 class="wp-block-heading">Jobs &amp; Opportunities 💼</h3>
  <ul class="wp-block-list">
    <li><a href="https://cityjobs.nyc.gov/job/associate-director-of-policy-implementation-in-manhattan-jid-46508">Associate Director of Policy Implementation — Campaign Finance Board</a> — Deadline: 13-OCT-2026.</li>
    <li><a href="https://app.trinethire.com/companies/381666-polimorphic/jobs">Product Manager (First Product Hire) — Polimorphic</a></li>
  </ul>
  <h3 class="wp-block-heading">Media to Watch, Listen, or Read 🎥</h3>
`;

const cfbRow = {
  job_id: "792925",
  agency: "CAMPAIGN FINANCE BOARD",
  posting_type: "External",
  business_title: "Associate Director of Policy Implementation",
  civil_service_title: "ADMINISTRATIVE STAFF ANALYST",
  salary_range_from: "125000",
  salary_range_to: "135000",
  salary_frequency: "Annual",
  division_work_unit: "Policy and Research",
  job_description:
    "Lead an agency-wide policy implementation process, coordinate cross-divisional stakeholders, document decisions, translate policy into plain-language operating guidance, and manage project delivery.",
  minimum_qual_requirements:
    "A baccalaureate degree and five years of related experience, including three years supervising staff, or a satisfactory equivalent combination of education and experience.",
  preferred_skills:
    "Project management, process improvement, stakeholder coordination, implementation, public service, and clear documentation.",
  additional_information: "External posting serving New Yorkers.",
  post_until: "13-OCT-2026"
};

test("extracts only the Jobs and Opportunities section and retains canonical URLs", () => {
  const leads = extractNewsletterOpportunities(newsletterHtml);

  assert.equal(leads.length, 2);
  assert.deepEqual(leads[0], {
    title: "Associate Director of Policy Implementation",
    organization: "Campaign Finance Board",
    sourceUrl:
      "https://cityjobs.nyc.gov/job/associate-director-of-policy-implementation-in-manhattan-jid-46508",
    deadline: "2026-10-13",
    cityJobId: null
  });
  assert.equal(leads[1].organization, "Polimorphic");
});

test("newsletter freshness accepts the current weekly issue and rejects stale or unexpected posts", () => {
  const config = { maximumAgeDays: 9, titlePattern: "^This week in NYC" };

  assert.equal(
    inspectNewsletterFreshness(
      { date: "2026-08-20T18:39:02", title: { rendered: "This week in NYC’s #CivicTech! – August 20, 2026" } },
      config,
      "2026-08-20"
    ).state,
    "current"
  );
  assert.equal(
    inspectNewsletterFreshness(
      { date: "2026-08-01T18:39:02", title: { rendered: "This week in NYC’s #CivicTech!" } },
      config,
      "2026-08-20"
    ).state,
    "stale"
  );
  assert.equal(
    inspectNewsletterFreshness(
      { date: "2026-08-20T18:39:02", title: { rendered: "CityCamp announcement" } },
      config,
      "2026-08-20"
    ).state,
    "blocked"
  );
});

test("promotes verified City matches provisionally and quarantines external leads for official review", () => {
  const leads = extractNewsletterOpportunities(newsletterHtml);
  const snapshot = buildBetaNycSnapshot({
    post: {
      id: 123,
      date: "2026-08-20T18:39:02",
      link: "https://www.beta.nyc/2026/08/20/this-week-in-nycs-civictech-august-20-2026/",
      title: { rendered: "This week in NYC’s #CivicTech! – August 20, 2026" }
    },
    leads,
    cityRows: [cfbRow],
    asOf: "2026-08-20",
    config: { strongMatchThreshold: { composite: 78, fit: 75, secure: 65 } }
  });

  assert.equal(snapshot.census.discoveredLeads, 2);
  assert.equal(snapshot.census.provisionalStrongMatches, 1);
  assert.equal(snapshot.provisionalStrongMatches[0].jobId, "792925");
  assert.equal(snapshot.provisionalStrongMatches[0].automaticDisposition, "provisional-intake-only");
  assert.equal(snapshot.leads.find((lead) => lead.organization === "Polimorphic").disposition, "official-verification-required");
});

test("verified external-employer rules can promote an open strong match while retaining human review", () => {
  const leads = extractNewsletterOpportunities(newsletterHtml);
  const polimorphicUrl = "https://app.trinethire.com/companies/381666-polimorphic/jobs";
  const snapshot = buildBetaNycSnapshot({
    post: {
      id: 123,
      date: "2026-08-20T18:39:02",
      link: "https://www.beta.nyc/example",
      title: { rendered: "This week in NYC’s #CivicTech!" }
    },
    leads,
    cityRows: [cfbRow],
    officialPages: { [polimorphicUrl]: "Product Manager First Product Hire Apply for this job $165,000 - $195,000" },
    asOf: "2026-08-20",
    config: {
      strongMatchThreshold: { composite: 78, fit: 75, secure: 65 },
      externalReviews: [
        {
          sourceUrl: polimorphicUrl,
          expectedContentPattern: "Product Manager.*Apply for this job",
          fitScore: 92,
          secureScore: 70,
          salaryFrom: 165000,
          salaryTo: 195000,
          reviewedAt: "2026-08-20"
        }
      ]
    }
  });

  const match = snapshot.provisionalStrongMatches.find((entry) => entry.organization === "Polimorphic");
  assert.equal(match.automaticDisposition, "provisional-intake-only");
  assert.equal(match.qualificationReview, "human-review-required");
});

test("a dated external-employer review expires back into official verification", () => {
  const leads = extractNewsletterOpportunities(newsletterHtml);
  const polimorphicUrl = "https://app.trinethire.com/companies/381666-polimorphic/jobs";
  const snapshot = buildBetaNycSnapshot({
    post: {
      id: 123,
      date: "2026-08-20T18:39:02",
      link: "https://www.beta.nyc/example",
      title: { rendered: "This week in NYC’s #CivicTech!" }
    },
    leads,
    cityRows: [cfbRow],
    asOf: "2026-08-21",
    config: {
      strongMatchThreshold: { composite: 78, fit: 75, secure: 65 },
      externalReviews: [
        {
          sourceUrl: polimorphicUrl,
          verificationMode: "dated-official-review",
          reviewedAt: "2026-08-13",
          reviewExpiresAt: "2026-08-20",
          fitScore: 92,
          secureScore: 70,
          salaryFrom: 165000,
          salaryTo: 195000
        }
      ]
    }
  });

  assert.equal(
    snapshot.leads.find((entry) => entry.organization === "Polimorphic").disposition,
    "official-verification-required"
  );
});

test("rendered report ranks verified scores and places unresolved leads after scored roles", () => {
  const report = renderBetaNycSnapshotMarkdown({
    evaluatedAt: "2026-08-20T00:00:00.000Z",
    source: { title: "Issue", issueUrl: "https://www.beta.nyc/example" },
    census: { discoveredLeads: 3, provisionalStrongMatches: 1 },
    leads: [
      { title: "Low", organization: "A", compositeScore: 40, fitScore: 40, secureScore: 40, disposition: "not-promoted" },
      { title: "Unresolved", organization: "B", disposition: "official-verification-required" },
      { title: "High", organization: "C", compositeScore: 90, fitScore: 90, secureScore: 90, disposition: "provisional-strong-match" }
    ]
  });

  assert.ok(report.indexOf("| 1 | High") < report.indexOf("| 2 | Low"));
  assert.match(report, /\| — \| Unresolved/);
});
