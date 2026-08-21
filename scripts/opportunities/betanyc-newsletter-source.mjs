import { pathToFileURL } from "node:url";

import { scorePosting } from "./nyc-jobs-loop.mjs";

function text(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function decodeHtml(value) {
  return String(value ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(value) {
  return text(decodeHtml(String(value ?? "").replace(/<[^>]*>/g, " ")));
}

function normalizePublicUrl(value) {
  try {
    const url = new URL(decodeHtml(value));
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_|mc_|fbclid|gclid)/i.test(key)) url.searchParams.delete(key);
    }
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}

function normalizeDeadline(value) {
  const match = text(value).toUpperCase().match(/^(\d{1,2})-([A-Z]{3})-(\d{4})$/);
  if (!match) return "";
  const months = new Map([
    ["JAN", "01"], ["FEB", "02"], ["MAR", "03"], ["APR", "04"],
    ["MAY", "05"], ["JUN", "06"], ["JUL", "07"], ["AUG", "08"],
    ["SEP", "09"], ["OCT", "10"], ["NOV", "11"], ["DEC", "12"]
  ]);
  const month = months.get(match[2]);
  return month ? `${match[3]}-${month}-${match[1].padStart(2, "0")}` : "";
}

function issueKey(issueDate) {
  return issueDate ? `betanyc-newsletter-${issueDate}` : "";
}

export function findLatestNewsletterIssue(indexHtml) {
  const matches = [...String(indexHtml ?? "").matchAll(
    /href=["'](https:\/\/(?:www\.)?beta\.nyc\/(\d{4})\/(\d{2})\/(\d{2})\/[^"']+)["'][^>]*>[\s\S]*?This week in NYC(?:&#8217;|’|'|&rsquo;)s #CivicTech[\s\S]*?<\/a>/gi
  )];
  const issues = matches.map((match) => {
    const issueDate = `${match[2]}-${match[3]}-${match[4]}`;
    return {
      issueDate,
      issueUrl: normalizePublicUrl(match[1]),
      issueKey: issueKey(issueDate)
    };
  }).sort((left, right) => right.issueDate.localeCompare(left.issueDate));
  if (!issues.length) throw new Error("No BetaNYC weekly newsletter issue was found in the official archive index.");
  return issues[0];
}

export function newsletterNeedsRefresh(currentIssue, committedState) {
  return text(currentIssue?.issueKey) !== text(committedState?.issueKey);
}

export function parseBetaNycJobsSection(issueHtml) {
  const html = String(issueHtml ?? "");
  const start = html.search(/<h[1-6][^>]*>\s*Jobs &amp; Opportunities\s*<\/h[1-6]>/i);
  if (start < 0) return [];
  const afterHeading = html.slice(start).replace(/^<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/i, "");
  const nextHeading = afterHeading.search(/<h[1-6][^>]*>/i);
  const section = nextHeading >= 0 ? afterHeading.slice(0, nextHeading) : afterHeading;
  const jobs = [];
  const seen = new Set();

  for (const match of section.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
    const listItemHtml = match[1];
    const link = listItemHtml.match(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
    if (!link) continue;
    const label = stripTags(link[2]);
    const separator = label.lastIndexOf(" — ");
    if (separator < 1) continue;
    const title = text(label.slice(0, separator));
    const employer = text(label.slice(separator + 3));
    const discoveryUrl = normalizePublicUrl(link[1]);
    const officialJobId = discoveryUrl.match(/cityjobs\.nyc\.gov\/job\/(\d+)/i)?.[1] ?? "";
    const deadlineLabel = stripTags(listItemHtml).match(/Deadline:\s*([^.;]+(?:-\d{4})?|Rolling basis)/i)?.[1]?.replace(/\.$/, "") ?? "";
    const identity = officialJobId || discoveryUrl || `${title}|${employer}`.toLowerCase();
    if (seen.has(identity)) continue;
    seen.add(identity);
    jobs.push({
      title,
      employer,
      deadline: normalizeDeadline(deadlineLabel),
      deadlineLabel: text(deadlineLabel),
      discoveryUrl,
      officialJobId
    });
  }
  return jobs;
}

function externalLead(lead) {
  return {
    title: lead.title,
    employer: lead.employer,
    deadline: lead.deadline,
    deadlineLabel: lead.deadlineLabel,
    discoveryUrl: lead.discoveryUrl,
    verificationState: "official-posting-verification-required",
    subjectiveReviewEligible: false
  };
}

export function prepareBetaNycRefresh({
  currentIssue,
  committedState,
  issueHtml,
  nycPostings = [],
  policy,
  now = new Date().toISOString().slice(0, 10),
  knownJobIds = [],
  forceRefresh = false
}) {
  const refreshRequired = forceRefresh || newsletterNeedsRefresh(currentIssue, committedState);
  if (!refreshRequired) {
    return {
      refreshRequired: false,
      leadsObserved: 0,
      officialPostingsVerified: 0,
      candidateMatches: [],
      unverifiedLeads: [],
      nextSourceState: committedState
    };
  }

  const leads = parseBetaNycJobsSection(issueHtml);
  const postingsByJobId = new Map();
  for (const posting of nycPostings) {
    const jobId = text(posting.job_id);
    if (!jobId) continue;
    const current = postingsByJobId.get(jobId);
    if (!current || text(posting.posting_type).toLowerCase() === "external") {
      postingsByJobId.set(jobId, posting);
    }
  }
  const known = new Set(knownJobIds.map(String));
  const verified = [];
  const unverifiedLeads = [];
  for (const lead of leads) {
    const posting = lead.officialJobId ? postingsByJobId.get(lead.officialJobId) : null;
    if (!posting) {
      unverifiedLeads.push(externalLead(lead));
      continue;
    }
    verified.push({
      ...scorePosting(posting, policy, { now }),
      discoveredVia: "source.betanyc.weekly-civictech-newsletter",
      discoveryIssueKey: currentIssue.issueKey,
      discoveryIssueUrl: currentIssue.issueUrl
    });
  }
  const candidateMatches = verified.filter(({ admitted, jobId }) => admitted && !known.has(jobId));

  return {
    refreshRequired: true,
    leadsObserved: leads.length,
    officialPostingsVerified: verified.length,
    candidateMatches,
    verifiedLeads: verified,
    unverifiedLeads,
    nextSourceState: {
      issueKey: currentIssue.issueKey,
      issueDate: currentIssue.issueDate,
      issueUrl: currentIssue.issueUrl,
      refreshCompletedAt: `${now}T12:00:00.000Z`
    }
  };
}

export function buildBetaNycDigest({ currentIssue, result }) {
  const lines = [
    "# BetaNYC opportunity source update",
    "",
    `Issue: ${currentIssue.issueDate}`,
    `Official archive: ${currentIssue.issueUrl}`,
    `Jobs observed: ${result.leadsObserved}`,
    "",
    "## Strong matches to verify",
    ""
  ];
  if (!result.candidateMatches.length) lines.push("No new NYC role cleared every deterministic gate.", "");
  for (const candidate of result.candidateMatches) {
    lines.push(
      `### ${candidate.title} — ${candidate.agency}`,
      "",
      `- Job ID: ${candidate.jobId}`,
      `- Fit: ${candidate.fitScore}/100; securability: ${candidate.securabilityScore}/100; combined: ${candidate.combinedScore}/100`,
      "- Next action: verify the individual official posting before adding application materials or commissioning hiring-reader evaluation.",
      `- Official posting search: ${candidate.actionUrl}`,
      ""
    );
  }
  lines.push("## Leads awaiting employer verification", "");
  if (!result.unverifiedLeads.length) lines.push("No unresolved external lead remains.", "");
  for (const lead of result.unverifiedLeads) {
    lines.push(
      `- ${lead.title} — ${lead.employer}: verify the current employer posting, compensation, deadline, and hard screens.`,
      `  ${lead.discoveryUrl}`
    );
  }
  return {
    subject: `BetaNYC opportunity update — ${currentIssue.issueDate}`,
    markdown: `${lines.join("\n").trim()}\n`
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.stderr.write("Use the governed BetaNYC opportunity-source CLI.\n");
  process.exitCode = 2;
}
