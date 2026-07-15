import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const defaultRawPath =
  "docs/knowledge-bank/corpora/source-captures/callnyc-x-browser-extraction-2026-07-15-utc.json";
const defaultCorpusPath =
  "docs/knowledge-bank/corpora/callnyc-x-full-population-2026-07-14.json";

const recognitionPattern = /(provides|provided|gives) the most/i;
const ignoredRecipientHandles = new Set([
  "callnycapp",
  "nyccouncil",
  "nychousing"
]);

function parseEngagement(label) {
  const count = (pattern) => Number(label.match(pattern)?.[1] ?? 0);

  return {
    replies: count(/(\d+) repl(?:y|ies)/i),
    reposts: count(/(\d+) reposts?/i),
    likes: count(/(\d+) likes?/i)
  };
}

function unique(values) {
  return [...new Set(values)];
}

export function deriveCorpusItems(rawCapture) {
  return [...rawCapture.items]
    .sort((left, right) => left.datetime.localeCompare(right.datetime))
    .map((item, index) => ({
      index: index + 1,
      canonicalUrl: new URL(item.statusUrl, "https://x.com").toString(),
      publishedAt: item.datetime,
      type: item.text.startsWith("Call NYC reposted\n")
        ? "reposted"
        : "authored",
      visibleText: item.text,
      engagement: parseEngagement(item.engagementLabel),
      engagementLabel: item.engagementLabel,
      mentions: unique(
        item.links.map((link) => link.text).filter((text) => text.startsWith("@"))
      ),
      outgoingLinks: item.links
        .filter((link) => link.href.startsWith("https://t.co/"))
        .map((link) => ({
          shortUrl: link.href,
          displayedDestination: link.text
        })),
      hasVisibleMedia: item.links.some((link) =>
        /\/status\/\d+\/(?:photo|video)\/\d+/.test(link.href)
      )
    }));
}

function cleanDisplayedDestination(value) {
  return value.replace(/\s+/g, "").replace(/…$/, "");
}

function isCallNycDestination(value) {
  try {
    return new URL(cleanDisplayedDestination(value)).hostname.toLowerCase() ===
      "callnyc.org";
  } catch {
    return false;
  }
}

export function normalizeCallNycDestination(value) {
  const url = new URL(cleanDisplayedDestination(value));
  url.protocol = "https:";
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
  url.search = "";
  url.hash = "";
  url.pathname = url.pathname.replace(/\/$/, "") || "/";
  return url.toString();
}

export function deriveCallNycCorpusMetrics(corpus) {
  const authored = corpus.items.filter((item) => item.type === "authored");
  const reposted = corpus.items.filter((item) => item.type === "reposted");
  const recognitionPosts = authored.filter(
    (item) =>
      item.mentions.includes("@NYCCouncil") &&
      recognitionPattern.test(item.visibleText)
  );
  const recognitionRecipients = recognitionPosts
    .map((item) =>
      [...item.visibleText.matchAll(/@([A-Za-z0-9_]+)/g)]
        .map((match) => match[1])
        .find((handle) => !ignoredRecipientHandles.has(handle.toLowerCase()))
    )
    .filter(Boolean);
  const allLinks = corpus.items.flatMap((item) => item.outgoingLinks);
  const internalLinks = allLinks.filter((link) =>
    isCallNycDestination(link.displayedDestination)
  );
  const displayedInternalDestinations = unique(
    internalLinks.map((link) =>
      cleanDisplayedDestination(link.displayedDestination).replace(
        /^https?:\/\//i,
        ""
      )
    )
  );
  const normalizedInternalDestinations = unique(
    internalLinks.map((link) =>
      normalizeCallNycDestination(link.displayedDestination)
    )
  );
  const normalizedIssuePageDestinations = normalizedInternalDestinations.filter(
    (destination) => {
      const pathname = new URL(destination).pathname;
      return pathname !== "/" && pathname !== "/api";
    }
  );
  const engagedAuthored = authored.filter(
    (item) =>
      item.engagement.replies +
        item.engagement.reposts +
        item.engagement.likes >
      0
  );
  const engagementTotals = authored.reduce(
    (totals, item) => ({
      replies: totals.replies + item.engagement.replies,
      reposts: totals.reposts + item.engagement.reposts,
      likes: totals.likes + item.engagement.likes
    }),
    { replies: 0, reposts: 0, likes: 0 }
  );

  return {
    profileReported: corpus.population.profileReported,
    renderedDistinct: corpus.items.length,
    authored: authored.length,
    reposted: reposted.length,
    unresolvedCountDifference:
      corpus.population.profileReported - corpus.items.length,
    recognitionPosts: recognitionPosts.length,
    recognitionPostUrls: recognitionPosts.map((item) => item.canonicalUrl),
    recognitionRecipients: unique(recognitionRecipients).sort(),
    nycCouncilMentionPosts: authored.filter((item) =>
      item.mentions.includes("@NYCCouncil")
    ).length,
    authoredPostsWithOutgoingLinks: authored.filter(
      (item) => item.outgoingLinks.length > 0
    ).length,
    outgoingLinkOccurrences: allLinks.length,
    internalLinkOccurrences: internalLinks.length,
    externalLinkOccurrences: allLinks.length - internalLinks.length,
    distinctDisplayedInternalDestinations:
      displayedInternalDestinations.length,
    distinctNormalizedInternalDestinations:
      normalizedInternalDestinations.length,
    distinctNormalizedIssuePageDestinations:
      normalizedIssuePageDestinations.length,
    normalizedIssuePageDestinations,
    authoredPostsWithVisibleMedia: authored.filter(
      (item) => item.hasVisibleMedia
    ).length,
    authoredPostsWithVisibleEngagement: engagedAuthored.length,
    authoredEngagementTotals: engagementTotals
  };
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function validateCommittedCorpus(rawCaptureText, corpus) {
  const rawCapture = JSON.parse(rawCaptureText);
  assert.equal(sha256(rawCaptureText), corpus.rawCaptureSha256);
  assert.deepEqual(deriveCorpusItems(rawCapture), corpus.items);
  assert.equal(rawCapture.profileReportedPosts, corpus.population.profileReported);
  return deriveCallNycCorpusMetrics(corpus);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const rawPath = process.argv[2] ?? defaultRawPath;
  const corpusPath = process.argv[3] ?? defaultCorpusPath;
  const rawCaptureText = readFileSync(rawPath, "utf8");
  const corpus = JSON.parse(readFileSync(corpusPath, "utf8"));
  const metrics = validateCommittedCorpus(rawCaptureText, corpus);
  process.stdout.write(`${JSON.stringify(metrics, null, 2)}\n`);
}
