import { scorePosting } from "./nyc-jobs-monitor.mjs";

const MONTHS = new Map(
  ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map(
    (month, index) => [month, index + 1]
  )
);

function decodeHtml(value = "") {
  return String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&rsquo;/gi, "’")
    .replace(/&lsquo;/gi, "‘");
}

function stripTags(value = "") {
  return decodeHtml(String(value).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function normalize(value = "") {
  return stripTags(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseDeadline(value = "") {
  const match = stripTags(value).match(/Deadline:\s*(\d{1,2})-([A-Z]{3})-(\d{4})/i);
  if (!match) return null;
  const month = MONTHS.get(match[2].toUpperCase());
  if (!month) return null;
  return `${match[3]}-${String(month).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

function splitLabel(value) {
  const parts = stripTags(value)
    .split(/\s+[—–]\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length < 2) return { title: parts[0] ?? "Untitled opportunity", organization: "Unspecified" };
  return { title: parts.slice(0, -1).join(" — "), organization: parts.at(-1) };
}

export function extractNewsletterOpportunities(html) {
  const start = html.search(/<h[1-6][^>]*>[^<]*(?:Jobs\s*&(?:amp;)?\s*Opportunities|Jobs\s+and\s+Opportunities)/i);
  if (start < 0) return [];
  const afterHeading = html.slice(start).replace(/^<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/i, "");
  const nextHeading = afterHeading.search(/<h[1-6][^>]*>/i);
  const section = nextHeading >= 0 ? afterHeading.slice(0, nextHeading) : afterHeading;
  const leads = [];
  const itemPattern = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  for (const itemMatch of section.matchAll(itemPattern)) {
    const anchor = itemMatch[1].match(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
    if (!anchor) continue;
    const sourceUrl = decodeHtml(anchor[1]).trim();
    const { title, organization } = splitLabel(anchor[2]);
    const explicitCityId = sourceUrl.match(/cityjobs\.nyc\.gov\/job\/(\d+)(?:\b|\/|\?)/i)?.[1] ?? null;
    leads.push({
      title,
      organization,
      sourceUrl,
      deadline: parseDeadline(itemMatch[1]),
      cityJobId: explicitCityId
    });
  }
  return leads;
}

export function inspectNewsletterFreshness(post, config, asOf) {
  const title = stripTags(post?.title?.rendered ?? post?.title ?? "");
  const pattern = new RegExp(config.titlePattern, "i");
  if (!pattern.test(title)) return { state: "blocked", reason: "unexpected-latest-post", title };
  const publishedAt = new Date(`${String(post?.date ?? "").replace(/Z$/, "")}Z`);
  const evaluatedAt = new Date(`${asOf}T23:59:59.999Z`);
  if (!Number.isFinite(publishedAt.getTime())) {
    return { state: "blocked", reason: "invalid-publication-date", title };
  }
  const ageDays = Math.floor((evaluatedAt.getTime() - publishedAt.getTime()) / 86_400_000);
  if (ageDays < -1) return { state: "blocked", reason: "future-publication-date", title, ageDays };
  if (ageDays > config.maximumAgeDays) return { state: "stale", reason: "latest-issue-too-old", title, ageDays };
  return { state: "current", reason: "weekly-issue-current", title, ageDays };
}

function findCityRow(lead, cityRows) {
  if (lead.cityJobId) return cityRows.find((row) => String(row.job_id) === String(lead.cityJobId)) ?? null;
  const leadTitle = normalize(lead.title);
  const leadOrg = normalize(lead.organization);
  return (
    cityRows.find((row) => {
      const sameTitle = normalize(row.business_title) === leadTitle;
      const agency = normalize(row.agency);
      return sameTitle && (agency.includes(leadOrg) || leadOrg.includes(agency));
    }) ?? null
  );
}

function cityDisposition(lead, row, config, asOf) {
  if (!row) {
    return {
      ...lead,
      disposition: "official-verification-required",
      dispositionReason: "city-dataset-row-not-found"
    };
  }
  const score = scorePosting(row, { asOf, threshold: config.strongMatchThreshold });
  const base = {
    ...lead,
    jobId: String(row.job_id),
    cityJobId: String(row.job_id),
    officialUrl: lead.sourceUrl,
    fitScore: score.fitScore,
    secureScore: score.secureScore,
    compositeScore: score.compositeScore,
    qualificationReview: score.qualificationReview,
    deterministicScreen: score.screen
  };
  if (score.admitted) {
    return {
      ...base,
      disposition: "provisional-strong-match",
      dispositionReason: "clears-deterministic-thresholds",
      automaticDisposition: "provisional-intake-only"
    };
  }
  return {
    ...base,
    disposition: "not-promoted",
    dispositionReason: score.screen.eligible ? "below-strong-match-threshold" : score.screen.reasons.join(",")
  };
}

function externalDisposition(lead, config, officialPages, asOf) {
  const rule = (config.externalReviews ?? []).find((entry) => entry.sourceUrl === lead.sourceUrl);
  if (!rule) {
    return {
      ...lead,
      disposition: "official-verification-required",
      dispositionReason: "external-employer-adapter-required"
    };
  }
  const verificationUrl = rule.verificationUrl ?? rule.sourceUrl;
  const page = officialPages?.[verificationUrl] ?? "";
  const reviewIsCurrent =
    rule.verificationMode === "dated-official-review" &&
    Boolean(rule.reviewExpiresAt) &&
    asOf <= rule.reviewExpiresAt;
  const liveSignalIsCurrent =
    rule.verificationMode !== "dated-official-review" &&
    Boolean(page) &&
    new RegExp(rule.expectedContentPattern, "is").test(page);
  if (!reviewIsCurrent && !liveSignalIsCurrent) {
    return {
      ...lead,
      disposition: "official-verification-required",
      dispositionReason: "official-page-signal-missing"
    };
  }
  const base = {
    ...lead,
    jobId: rule.jobId ?? lead.sourceUrl.match(/\/jobs\/(\d+)-/i)?.[1] ?? null,
    officialUrl: verificationUrl,
    salaryFrom: rule.salaryFrom ?? null,
    salaryTo: rule.salaryTo ?? null,
    fitScore: rule.fitScore ?? null,
    secureScore: rule.secureScore ?? null,
    compositeScore:
      Number.isFinite(rule.fitScore) && Number.isFinite(rule.secureScore)
        ? Number((rule.fitScore * 0.55 + rule.secureScore * 0.45).toFixed(2))
        : null,
    qualificationReview: "human-review-required",
    officialPageReviewedAt: rule.reviewedAt,
    officialPageReviewExpiresAt: rule.reviewExpiresAt ?? null
  };
  if (rule.exclusionReason) {
    return { ...base, disposition: "not-promoted", dispositionReason: rule.exclusionReason };
  }
  const threshold = config.strongMatchThreshold;
  const admitted =
    base.salaryTo >= 100_000 &&
    base.fitScore >= threshold.fit &&
    base.secureScore >= threshold.secure &&
    base.compositeScore >= threshold.composite;
  if (!admitted) {
    return {
      ...base,
      disposition: "not-promoted",
      dispositionReason: base.salaryTo < 100_000 ? "salary-ceiling-below-target" : "below-strong-match-threshold"
    };
  }
  return {
    ...base,
    disposition: "provisional-strong-match",
    dispositionReason: "clears-reviewed-external-thresholds",
    automaticDisposition: "provisional-intake-only"
  };
}

export function buildBetaNycSnapshot({ post, leads, cityRows, officialPages = {}, asOf, config }) {
  const evaluatedLeads = leads.map((lead) => {
    if (/cityjobs\.nyc\.gov/i.test(lead.sourceUrl)) {
      return cityDisposition(lead, findCityRow(lead, cityRows), config, asOf);
    }
    return externalDisposition(lead, config, officialPages, asOf);
  });
  const provisionalStrongMatches = evaluatedLeads
    .filter((lead) => lead.disposition === "provisional-strong-match")
    .map((lead) => ({
      jobId: lead.jobId,
      title: lead.title,
      organization: lead.organization,
      officialUrl: lead.officialUrl,
      deadline: lead.deadline,
      fitScore: lead.fitScore,
      secureScore: lead.secureScore,
      compositeScore: lead.compositeScore,
      qualificationReview: lead.qualificationReview,
      automaticDisposition: lead.automaticDisposition
    }))
    .sort((left, right) => right.compositeScore - left.compositeScore || left.title.localeCompare(right.title));
  return {
    schemaVersion: 1,
    source: {
      id: "source.betanyc.civic-tech-newsletter",
      publicIssueId: String(post.id),
      title: stripTags(post.title?.rendered ?? post.title),
      publishedAt: `${String(post.date).replace(/Z$/, "")}Z`,
      issueUrl: post.link
    },
    evaluatedAt: `${asOf}T00:00:00.000Z`,
    policy: {
      strongMatchThreshold: config.strongMatchThreshold,
      automaticDisposition: "provisional-intake-only",
      officialPostingControls: true,
      applicationAuthority: "Jamie Burkart"
    },
    census: {
      discoveredLeads: evaluatedLeads.length,
      cityDatasetMatches: evaluatedLeads.filter((lead) => lead.cityJobId).length,
      provisionalStrongMatches: provisionalStrongMatches.length,
      officialVerificationRequired: evaluatedLeads.filter(
        (lead) => lead.disposition === "official-verification-required"
      ).length,
      notPromoted: evaluatedLeads.filter((lead) => lead.disposition === "not-promoted").length
    },
    provisionalStrongMatches,
    leads: evaluatedLeads
  };
}

export function renderBetaNycSnapshotMarkdown(snapshot) {
  const ranked = snapshot.leads
    .filter((lead) => Number.isFinite(lead.compositeScore))
    .sort((left, right) => right.compositeScore - left.compositeScore || left.title.localeCompare(right.title));
  const unresolved = snapshot.leads
    .filter((lead) => !Number.isFinite(lead.compositeScore))
    .sort((left, right) => left.title.localeCompare(right.title));
  const rows = [...ranked, ...unresolved]
    .map((lead, index) => {
      const rank = Number.isFinite(lead.compositeScore) ? index + 1 : "—";
      return `| ${rank} | ${lead.title} | ${lead.organization} | ${lead.fitScore ?? "—"} | ${lead.secureScore ?? "—"} | ${lead.compositeScore ?? "—"} | ${lead.disposition} |`;
    })
    .join("\n");
  return `# BetaNYC opportunity review — ${snapshot.evaluatedAt.slice(0, 10)}\n\n` +
    `Source: [${snapshot.source.title}](${snapshot.source.issueUrl})\n\n` +
    `The issue surfaced ${snapshot.census.discoveredLeads} leads. ${snapshot.census.provisionalStrongMatches} cleared the maintained strong-match gate. Promotion is provisional only; official-posting, named-reader, and human review remain required.\n\n` +
    `| Rank | Role | Organization | Fit | Secure | Composite | Disposition |\n| ---: | --- | --- | ---: | ---: | ---: | --- |\n${rows}\n`;
}
